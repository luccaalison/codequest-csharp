using System.Diagnostics;
using System.Text.RegularExpressions;

namespace CodeQuest.Api.Sandbox;

/// <summary>
/// Turns a learner submission plus a set of test cases into a graded result: guard, compile once,
/// then run the emitted assembly once per test case.
/// </summary>
public sealed partial class SubmissionEvaluator
{
    private const int DefaultTimeoutMs = 5_000;
    private const int MaxTimeoutMs = 15_000;
    private const int MaxTests = 25;
    private const int MaxCodeLength = 40_000;

    private readonly SecurityGuard _guard;
    private readonly CompilationService _compiler;
    private readonly ProgramRunner _runner;

    public SubmissionEvaluator(SecurityGuard guard, CompilationService compiler, ProgramRunner runner)
    {
        _guard = guard;
        _compiler = compiler;
        _runner = runner;
    }

    public async Task<ExecuteResponse> EvaluateAsync(ExecuteRequest request, CancellationToken cancellationToken)
    {
        var stopwatch = Stopwatch.StartNew();

        if (string.IsNullOrWhiteSpace(request.Code))
            return ExecuteResponse.Rejected("Envie algum código para executar.");

        if (request.Code.Length > MaxCodeLength)
            return ExecuteResponse.Rejected($"O código excede o limite de {MaxCodeLength:N0} caracteres.");

        if (_guard.Inspect(request.Code, request.Capabilities) is { } rejection)
            return ExecuteResponse.Rejected(rejection);

        var compilation = _compiler.Compile(request.Code, request.ImplicitUsings, request.Nullable);
        if (!compilation.Success || compilation.AssemblyPath is null)
        {
            return new ExecuteResponse(
                Success: false,
                Compiled: false,
                RejectionReason: null,
                Diagnostics: compilation.Diagnostics,
                Results: [],
                PassedCount: 0,
                TotalCount: request.Tests?.Count ?? 0,
                CompileMs: compilation.ElapsedMs,
                TotalMs: stopwatch.ElapsedMilliseconds);
        }

        var timeout = TimeSpan.FromMilliseconds(
            Math.Clamp(request.TimeoutMs ?? DefaultTimeoutMs, 500, MaxTimeoutMs));

        // No test cases means "just run it once and show me the output" (the Run button).
        var tests = request.Tests is { Count: > 0 }
            ? request.Tests.Take(MaxTests).ToArray()
            : [new TestCaseRequest("Execução", request.Stdin, string.Empty, OutputComparison.Trimmed)];

        var isFreeRun = request.Tests is null || request.Tests.Count == 0;
        var results = new TestResultDto[tests.Length];
        var assemblyPath = compilation.AssemblyPath;

        // Each case gets its own process, so they are independent and can overlap. Results are
        // written by index to keep the order the lesson author chose.
        await Parallel.ForAsync(0, tests.Length, new ParallelOptions
        {
            MaxDegreeOfParallelism = Math.Min(4, Environment.ProcessorCount),
            CancellationToken = cancellationToken,
        }, async (index, token) =>
        {
            var test = tests[index];
            var outcome = await _runner.RunAsync(assemblyPath, test.Stdin, timeout, token);
            var passed = !outcome.TimedOut
                && outcome.ExitCode == 0
                && (isFreeRun || Matches(outcome.Stdout, test.ExpectedStdout, test.Comparison));

            results[index] = new TestResultDto(
                test.Name,
                passed,
                test.Hidden,
                test.Stdin,
                test.ExpectedStdout,
                outcome.Stdout,
                outcome.Stderr,
                outcome.ExitCode,
                outcome.TimedOut,
                outcome.Truncated,
                outcome.DurationMs);
        });

        var passedCount = results.Count(r => r.Passed);
        return new ExecuteResponse(
            Success: passedCount == results.Length,
            Compiled: true,
            RejectionReason: null,
            Diagnostics: compilation.Diagnostics,
            Results: results,
            PassedCount: passedCount,
            TotalCount: results.Length,
            CompileMs: compilation.ElapsedMs,
            TotalMs: stopwatch.ElapsedMilliseconds);
    }

    internal static bool Matches(string actual, string expected, OutputComparison comparison) => comparison switch
    {
        OutputComparison.Exact => NormalizeNewlines(actual) == NormalizeNewlines(expected),
        OutputComparison.IgnoreCase => string.Equals(Normalize(actual), Normalize(expected), StringComparison.OrdinalIgnoreCase),
        OutputComparison.Tokens => Tokenize(actual) == Tokenize(expected),
        OutputComparison.Unordered => SortLines(actual) == SortLines(expected),
        _ => Normalize(actual) == Normalize(expected),
    };

    private static string NormalizeNewlines(string value) =>
        value.Replace("\r\n", "\n", StringComparison.Ordinal).Replace('\r', '\n');

    /// <summary>Trailing spaces and a trailing newline are never the point of an exercise.</summary>
    private static string Normalize(string value) =>
        string.Join('\n', NormalizeNewlines(value).Split('\n').Select(line => line.TrimEnd())).Trim('\n');

    private static string Tokenize(string value) => WhitespaceRuns().Replace(value, " ").Trim();

    /// <summary>
    /// For collections whose enumeration order is not contractual (Dictionary, HashSet) and for
    /// parallel output: the set of lines is the answer, the order they came out in is not.
    /// </summary>
    private static string SortLines(string value)
    {
        var lines = Normalize(value).Split('\n');
        Array.Sort(lines, StringComparer.Ordinal);
        return string.Join('\n', lines);
    }

    [GeneratedRegex(@"\s+")]
    private static partial Regex WhitespaceRuns();
}
