using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Text;

namespace CodeQuest.Api.Sandbox;

public sealed record RunOutcome(
    string Stdout,
    string Stderr,
    int ExitCode,
    bool TimedOut,
    bool Truncated,
    long DurationMs);

/// <summary>
/// Launches a compiled learner assembly inside a short-lived CodeQuest.Runner child process.
/// Isolation comes from three things: a fresh working directory, a hard wall-clock timeout that
/// kills the whole process tree, and a cap on how much output we are willing to buffer.
/// </summary>
public sealed class ProgramRunner
{
    private const int OutputCapBytes = 64 * 1024;

    private static readonly Lazy<(string Executable, string? DllArgument)> Host = new(ResolveRunnerHost);

    private readonly ILogger<ProgramRunner> _logger;

    public ProgramRunner(ILogger<ProgramRunner> logger) => _logger = logger;

    public async Task<RunOutcome> RunAsync(
        string assemblyPath,
        string? stdin,
        TimeSpan timeout,
        CancellationToken cancellationToken)
    {
        var workDir = Path.Combine(Path.GetTempPath(), "codequest-run", Guid.NewGuid().ToString("n"));
        Directory.CreateDirectory(workDir);

        var (executable, dllArgument) = Host.Value;
        var startInfo = new ProcessStartInfo(executable)
        {
            RedirectStandardInput = true,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true,
            WorkingDirectory = workDir,
            StandardOutputEncoding = Encoding.UTF8,
            StandardErrorEncoding = Encoding.UTF8,
        };
        if (dllArgument is not null) startInfo.ArgumentList.Add(dllArgument);
        startInfo.ArgumentList.Add(assemblyPath);
        startInfo.Environment["DOTNET_CLI_TELEMETRY_OPTOUT"] = "1";
        startInfo.Environment["DOTNET_NOLOGO"] = "1";

        var stopwatch = Stopwatch.StartNew();
        using var timeoutSource = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        timeoutSource.CancelAfter(timeout);

        Process? process = null;
        try
        {
            process = Process.Start(startInfo)
                ?? throw new InvalidOperationException("Não foi possível iniciar o processo de execução.");

            var stdoutTask = ReadCappedAsync(process.StandardOutput, OutputCapBytes, timeoutSource.Token);
            var stderrTask = ReadCappedAsync(process.StandardError, OutputCapBytes, timeoutSource.Token);

            if (!string.IsNullOrEmpty(stdin))
            {
                var payload = stdin.EndsWith('\n') ? stdin : stdin + "\n";
                try
                {
                    await process.StandardInput.WriteAsync(payload.AsMemory(), timeoutSource.Token);
                }
                catch (IOException)
                {
                    // The program exited before reading its input; that is a valid (if failing) run.
                }
            }

            try { process.StandardInput.Close(); } catch (IOException) { }

            var timedOut = false;
            try
            {
                await process.WaitForExitAsync(timeoutSource.Token);
            }
            catch (OperationCanceledException)
            {
                timedOut = true;
                KillTree(process);
            }

            var (stdout, stdoutTruncated) = await stdoutTask;
            var (stderr, stderrTruncated) = await stderrTask;

            if (stdoutTruncated || stderrTruncated) KillTree(process);

            var exitCode = timedOut ? -1 : SafeExitCode(process);
            var message = timedOut
                ? AppendLine(stderr, $"[execução interrompida: excedeu {timeout.TotalSeconds:0.#}s — possível laço infinito]")
                : stderr;

            return new RunOutcome(
                stdout,
                message,
                exitCode,
                timedOut,
                stdoutTruncated || stderrTruncated,
                stopwatch.ElapsedMilliseconds);
        }
        finally
        {
            if (process is not null)
            {
                if (!process.HasExited) KillTree(process);
                process.Dispose();
            }

            try { Directory.Delete(workDir, recursive: true); } catch (IOException) { } catch (UnauthorizedAccessException) { }
        }
    }

    private static async Task<(string Text, bool Truncated)> ReadCappedAsync(
        StreamReader reader,
        int cap,
        CancellationToken cancellationToken)
    {
        var builder = new StringBuilder();
        var buffer = new char[4096];

        while (true)
        {
            int read;
            try
            {
                read = await reader.ReadAsync(buffer.AsMemory(), cancellationToken);
            }
            catch (OperationCanceledException)
            {
                break;
            }
            catch (IOException)
            {
                break;
            }

            if (read == 0) break;

            var remaining = cap - builder.Length;
            if (read >= remaining)
            {
                builder.Append(buffer, 0, Math.Max(0, remaining));
                return (builder.ToString(), true);
            }

            builder.Append(buffer, 0, read);
        }

        return (builder.ToString(), false);
    }

    private void KillTree(Process process)
    {
        try
        {
            if (!process.HasExited) process.Kill(entireProcessTree: true);
        }
        catch (Exception ex) when (ex is InvalidOperationException or NotSupportedException or SystemException)
        {
            _logger.LogDebug(ex, "Falha ao encerrar o processo do aluno");
        }
    }

    private static int SafeExitCode(Process process)
    {
        try { return process.ExitCode; } catch (InvalidOperationException) { return -1; }
    }

    private static string AppendLine(string existing, string line) =>
        string.IsNullOrEmpty(existing) ? line : existing.TrimEnd() + Environment.NewLine + line;

    /// <summary>
    /// Locates the runner. A project reference puts both its apphost and its managed dll next to
    /// the API, so we prefer the apphost and fall back to activating the dll through `dotnet`.
    /// </summary>
    private static (string Executable, string? DllArgument) ResolveRunnerHost()
    {
        var baseDirectory = AppContext.BaseDirectory;
        var isWindows = RuntimeInformation.IsOSPlatform(OSPlatform.Windows);

        var appHost = Path.Combine(baseDirectory, isWindows ? "CodeQuest.Runner.exe" : "CodeQuest.Runner");
        if (File.Exists(appHost)) return (appHost, null);

        var runnerDll = Path.Combine(baseDirectory, "CodeQuest.Runner.dll");
        if (!File.Exists(runnerDll))
        {
            throw new FileNotFoundException(
                "CodeQuest.Runner não foi encontrado ao lado da API. Rode 'dotnet build' na solução.",
                runnerDll);
        }

        var fromEnvironment = Environment.GetEnvironmentVariable("DOTNET_HOST_PATH");
        if (!string.IsNullOrEmpty(fromEnvironment) && File.Exists(fromEnvironment))
            return (fromEnvironment, runnerDll);

        var executableName = isWindows ? "dotnet.exe" : "dotnet";
        // typeof(object).Assembly lives in shared/Microsoft.NETCore.App/<version>/, three levels
        // below the dotnet root where the host executable sits.
        var runtimeDirectory = Path.GetDirectoryName(typeof(object).Assembly.Location);
        if (!string.IsNullOrEmpty(runtimeDirectory))
        {
            var candidate = Path.GetFullPath(Path.Combine(runtimeDirectory, "..", "..", "..", executableName));
            if (File.Exists(candidate)) return (candidate, runnerDll);
        }

        return (executableName, runnerDll);
    }
}
