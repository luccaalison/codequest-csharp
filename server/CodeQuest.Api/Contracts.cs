namespace CodeQuest.Api;

/// <summary>How the actual program output is compared against the expected output.</summary>
public enum OutputComparison
{
    /// <summary>Compares line by line after trimming trailing whitespace and blank edges.</summary>
    Trimmed,
    /// <summary>Byte-for-byte equality after normalizing line endings only.</summary>
    Exact,
    /// <summary>Like <see cref="Trimmed"/> but case-insensitive.</summary>
    IgnoreCase,
    /// <summary>Collapses every run of whitespace into a single space before comparing.</summary>
    Tokens,
    /// <summary>Like <see cref="Trimmed"/> but compares the lines as a multiset, ignoring their order.</summary>
    Unordered,
}

/// <summary>How strictly the compiler enforces nullable reference types.</summary>
public enum NullableMode
{
    /// <summary>`string?` is legal syntax, but the flow analysis stays quiet. The default.</summary>
    Annotations,
    /// <summary>Full flow analysis: dereferencing a maybe-null value produces CS8602 and friends.</summary>
    Enabled,
}

public sealed record TestCaseRequest(
    string Name,
    string? Stdin = null,
    string ExpectedStdout = "",
    OutputComparison Comparison = OutputComparison.Trimmed,
    bool Hidden = false);

public sealed record ExecuteRequest(
    string Code,
    IReadOnlyList<TestCaseRequest>? Tests = null,
    string? Stdin = null,
    int? TimeoutMs = null,
    bool ImplicitUsings = true,
    IReadOnlyList<string>? Capabilities = null,
    NullableMode Nullable = NullableMode.Annotations);

public sealed record DiagnosticDto(
    string Id,
    string Severity,
    string Message,
    int Line,
    int Column,
    int EndLine,
    int EndColumn);

public sealed record TestResultDto(
    string Name,
    bool Passed,
    bool Hidden,
    string? Stdin,
    string Expected,
    string Actual,
    string Stderr,
    int ExitCode,
    bool TimedOut,
    bool Truncated,
    long DurationMs);

public sealed record ExecuteResponse(
    bool Success,
    bool Compiled,
    string? RejectionReason,
    IReadOnlyList<DiagnosticDto> Diagnostics,
    IReadOnlyList<TestResultDto> Results,
    int PassedCount,
    int TotalCount,
    long CompileMs,
    long TotalMs)
{
    public static ExecuteResponse Rejected(string reason) => new(
        false, false, reason, [], [], 0, 0, 0, 0);
}
