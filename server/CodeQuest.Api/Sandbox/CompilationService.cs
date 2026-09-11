using System.Collections.Concurrent;
using System.Security.Cryptography;
using System.Text;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Emit;
using Microsoft.CodeAnalysis.Text;

namespace CodeQuest.Api.Sandbox;

public sealed record CompilationResult(
    bool Success,
    string? AssemblyPath,
    IReadOnlyList<DiagnosticDto> Diagnostics,
    long ElapsedMs);

/// <summary>
/// Compiles learner submissions into self-contained console assemblies on disk so they can be
/// launched by <see cref="ProgramRunner"/>. Results are cached by source hash, which makes the
/// common case (running the same submission against several test cases) a single compilation.
/// </summary>
public sealed class CompilationService
{
    private const string UserFileName = "Program.cs";

    private static readonly string[] ImplicitUsingLines =
    [
        "global using System;",
        "global using System.Collections;",
        "global using System.Collections.Generic;",
        "global using System.Globalization;",
        "global using System.Linq;",
        "global using System.Text;",
        "global using System.Threading;",
        "global using System.Threading.Tasks;",
    ];

    // DEBUG keeps Debug.Assert and `#if DEBUG` alive, which the debugging chapter of section 6
    // teaches. Without the symbol Roslyn compiles those calls away and the lessons cannot work.
    private static readonly CSharpParseOptions ParseOptions =
        new CSharpParseOptions(LanguageVersion.Preview, DocumentationMode.None, SourceCodeKind.Regular)
            .WithPreprocessorSymbols("DEBUG");

    // Annotations (not Warnings) lets learners write `string?` without being buried in warnings.
    // The nullability chapter of section 8 opts into Warnings per lesson, because teaching the
    // compiler's flow analysis is impossible while that analysis is switched off.
    private static CSharpCompilationOptions OptionsFor(NullableMode nullable) => new(
        OutputKind.ConsoleApplication,
        optimizationLevel: OptimizationLevel.Debug,
        allowUnsafe: false,
        // Enable, not Warnings: `Warnings` turns the warnings on but the annotations OFF, so every
        // reference type becomes oblivious and the flow analysis has nothing to reason about.
        // Measured — under `Warnings` a plain `return null;` from a `string` method is silent.
        nullableContextOptions: nullable == NullableMode.Enabled
            ? NullableContextOptions.Enable
            : NullableContextOptions.Annotations,
        concurrentBuild: true);

    private static readonly Lazy<MetadataReference[]> ReferenceAssemblies = new(LoadReferences);

    private readonly ConcurrentDictionary<string, CompilationResult> _cache = new(StringComparer.Ordinal);
    private readonly ILogger<CompilationService> _logger;
    private readonly string _cacheRoot;

    public CompilationService(ILogger<CompilationService> logger)
    {
        _logger = logger;
        _cacheRoot = Path.Combine(Path.GetTempPath(), "codequest-build-cache");
        Directory.CreateDirectory(_cacheRoot);
    }

    public CompilationResult Compile(string code, bool implicitUsings, NullableMode nullable = NullableMode.Annotations)
    {
        var key = Hash(code, implicitUsings, nullable);
        // A cached failure stays valid forever; a cached success is only reusable while the
        // emitted assembly is still on disk (the temp folder can be cleaned by the OS).
        if (_cache.TryGetValue(key, out var cached) &&
            (cached.AssemblyPath is null || File.Exists(cached.AssemblyPath)))
        {
            return cached;
        }

        var result = CompileCore(code, implicitUsings, nullable, key);
        _cache[key] = result;
        return result;
    }

    private CompilationResult CompileCore(string code, bool implicitUsings, NullableMode nullable, string key)
    {
        var started = System.Diagnostics.Stopwatch.StartNew();

        var trees = new List<SyntaxTree>
        {
            CSharpSyntaxTree.ParseText(SourceText.From(code, Encoding.UTF8), ParseOptions, path: UserFileName),
        };

        if (implicitUsings)
        {
            trees.Add(CSharpSyntaxTree.ParseText(
                string.Join('\n', ImplicitUsingLines),
                ParseOptions,
                path: "ImplicitUsings.g.cs"));
        }

        var assemblyName = "learner_" + key[..16];
        var compilation = CSharpCompilation.Create(
            assemblyName,
            trees,
            ReferenceAssemblies.Value,
            OptionsFor(nullable));

        var outputDir = Path.Combine(_cacheRoot, key[..16]);
        Directory.CreateDirectory(outputDir);
        var assemblyPath = Path.Combine(outputDir, assemblyName + ".dll");

        EmitResult emit;
        using (var stream = File.Create(assemblyPath))
        {
            emit = compilation.Emit(stream);
        }

        var diagnostics = compilation.GetDiagnostics()
            .Where(d => d.Severity is DiagnosticSeverity.Error or DiagnosticSeverity.Warning)
            .Where(d => d.Location.SourceTree?.FilePath != "ImplicitUsings.g.cs")
            .Select(ToDto)
            .OrderByDescending(d => d.Severity == "Error")
            .ThenBy(d => d.Line)
            .Take(25)
            .ToArray();

        if (!emit.Success)
        {
            TryDelete(assemblyPath);
            _logger.LogDebug("Compilation failed with {Count} diagnostics", diagnostics.Length);
            return new CompilationResult(false, null, diagnostics, started.ElapsedMilliseconds);
        }

        // No runtimeconfig is emitted on purpose: CodeQuest.Runner loads this assembly into its own
        // already-initialized runtime instead of activating it through the shared host.
        return new CompilationResult(true, assemblyPath, diagnostics, started.ElapsedMilliseconds);
    }

    private static DiagnosticDto ToDto(Diagnostic diagnostic)
    {
        var span = diagnostic.Location.GetLineSpan();
        return new DiagnosticDto(
            diagnostic.Id,
            diagnostic.Severity == DiagnosticSeverity.Error ? "Error" : "Warning",
            diagnostic.GetMessage(System.Globalization.CultureInfo.InvariantCulture),
            span.StartLinePosition.Line + 1,
            span.StartLinePosition.Character + 1,
            span.EndLinePosition.Line + 1,
            span.EndLinePosition.Character + 1);
    }

    private static MetadataReference[] LoadReferences()
    {
        var trusted = (string?)AppContext.GetData("TRUSTED_PLATFORM_ASSEMBLIES") ?? string.Empty;
        var seen = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        var references = new List<MetadataReference>();

        foreach (var path in trusted.Split(Path.PathSeparator, StringSplitOptions.RemoveEmptyEntries))
        {
            var fileName = Path.GetFileName(path);
            if (!fileName.EndsWith(".dll", StringComparison.OrdinalIgnoreCase)) continue;
            // Keep the compiler itself (and our own app) out of the learner's reference set.
            if (fileName.StartsWith("Microsoft.CodeAnalysis", StringComparison.OrdinalIgnoreCase)) continue;
            if (fileName.StartsWith("CodeQuest.", StringComparison.OrdinalIgnoreCase)) continue;
            if (!seen.Add(fileName)) continue;

            try
            {
                references.Add(MetadataReference.CreateFromFile(path));
            }
            catch (IOException)
            {
                // A missing or locked assembly in the TPA list is not fatal for learner code.
            }
        }

        return [.. references];
    }

    // The nullable mode is part of the key: the same source compiled under Warnings produces a
    // different diagnostic set, and a cache hit across modes would hide exactly what S08C04 teaches.
    private static string Hash(string code, bool implicitUsings, NullableMode nullable)
    {
        var payload = Encoding.UTF8.GetBytes((implicitUsings ? "1|" : "0|") + (int)nullable + "|" + code);
        return Convert.ToHexStringLower(SHA256.HashData(payload));
    }

    private static void TryDelete(string path)
    {
        try { File.Delete(path); } catch (IOException) { } catch (UnauthorizedAccessException) { }
    }

    /// <summary>Drops build artifacts that have not been touched recently.</summary>
    public void PruneCache(TimeSpan maxAge)
    {
        var cutoff = DateTime.UtcNow - maxAge;
        foreach (var dir in Directory.EnumerateDirectories(_cacheRoot))
        {
            try
            {
                if (Directory.GetLastWriteTimeUtc(dir) < cutoff) Directory.Delete(dir, recursive: true);
            }
            catch (IOException) { }
            catch (UnauthorizedAccessException) { }
        }
    }
}
