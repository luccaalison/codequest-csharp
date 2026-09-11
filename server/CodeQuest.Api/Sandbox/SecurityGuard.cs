using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace CodeQuest.Api.Sandbox;

/// <summary>
/// Syntax-level guard rail applied before a learner's submission is compiled.
/// This is a speed bump for accidents and obvious abuse, not a jail: real isolation comes from
/// running the compiled assembly in a short-lived child process with a hard timeout.
/// </summary>
public sealed class SecurityGuard
{
    /// <summary>Types and members that are never allowed, regardless of requested capabilities.</summary>
    private static readonly HashSet<string> AlwaysBlockedNames = new(StringComparer.Ordinal)
    {
        "Process", "ProcessStartInfo", "Registry", "RegistryKey", "Marshal", "NativeLibrary",
        "AppDomain", "AssemblyBuilder", "ILGenerator", "DynamicMethod", "GCHandle",
    };

    private static readonly HashSet<string> NetworkNames = new(StringComparer.Ordinal)
    {
        "HttpClient", "WebClient", "Socket", "TcpClient", "TcpListener", "UdpClient",
        "HttpListener", "Dns", "WebRequest", "HttpWebRequest", "ClientWebSocket",
    };

    private static readonly HashSet<string> FileSystemNames = new(StringComparer.Ordinal)
    {
        "File", "FileInfo", "Directory", "DirectoryInfo", "FileStream", "StreamWriter",
        "StreamReader", "DriveInfo", "FileSystemWatcher",
    };

    private static readonly HashSet<string> ReflectionNames = new(StringComparer.Ordinal)
    {
        "Assembly", "Activator", "AssemblyLoadContext",
    };

    private static readonly HashSet<string> BlockedAttributes = new(StringComparer.Ordinal)
    {
        "DllImport", "DllImportAttribute", "LibraryImport", "LibraryImportAttribute",
        "UnmanagedCallersOnly", "UnmanagedCallersOnlyAttribute",
    };

    private static readonly HashSet<string> BlockedNamespacePrefixes = new(StringComparer.Ordinal)
    {
        "System.Reflection.Emit", "System.Runtime.InteropServices", "Microsoft.Win32",
        "System.Runtime.Loader", "System.Diagnostics.Process",
    };

    /// <summary>
    /// Returns a human readable rejection reason, or <c>null</c> when the source is acceptable.
    /// </summary>
    /// <param name="capabilities">
    /// Opt-in escape hatches used by advanced lessons: <c>network</c>, <c>fileSystem</c>, <c>reflection</c>.
    /// </param>
    public string? Inspect(string code, IReadOnlyList<string>? capabilities)
    {
        var granted = new HashSet<string>(capabilities ?? [], StringComparer.OrdinalIgnoreCase);
        var blocked = new HashSet<string>(AlwaysBlockedNames, StringComparer.Ordinal);
        if (!granted.Contains("network")) blocked.UnionWith(NetworkNames);
        if (!granted.Contains("fileSystem")) blocked.UnionWith(FileSystemNames);
        if (!granted.Contains("reflection")) blocked.UnionWith(ReflectionNames);

        var tree = CSharpSyntaxTree.ParseText(code, new CSharpParseOptions(LanguageVersion.Preview));
        var root = tree.GetRoot();

        foreach (var node in root.DescendantNodes())
        {
            switch (node)
            {
                case UsingDirectiveSyntax { Name: not null } usingDirective:
                {
                    var ns = usingDirective.Name.ToString();
                    if (BlockedNamespacePrefixes.Any(p => ns == p || ns.StartsWith(p + ".", StringComparison.Ordinal)))
                        return $"O namespace '{ns}' não é permitido neste exercício.";
                    break;
                }

                case AttributeSyntax attribute
                    when BlockedAttributes.Contains(attribute.Name.ToString().Split('.')[^1]):
                    return $"O atributo '{attribute.Name}' não é permitido (interoperabilidade nativa está desativada).";

                case PointerTypeSyntax:
                case FunctionPointerTypeSyntax:
                    return "Ponteiros e código unsafe estão desativados neste ambiente.";

                case StackAllocArrayCreationExpressionSyntax:
                case ImplicitStackAllocArrayCreationExpressionSyntax:
                    return "stackalloc está desativado neste ambiente.";

                case IdentifierNameSyntax identifier when blocked.Contains(identifier.Identifier.ValueText):
                {
                    // Only flag the type-ish usages: `File.ReadAllText(...)`, `new Process()`, `Process.Start(...)`.
                    if (IsTypeUsage(identifier))
                        return $"O tipo '{identifier.Identifier.ValueText}' não está disponível neste exercício.";
                    break;
                }
            }
        }

        foreach (var token in root.DescendantTokens())
        {
            if (token.IsKind(SyntaxKind.UnsafeKeyword))
                return "A palavra-chave 'unsafe' está desativada neste ambiente.";
        }

        return null;
    }

    /// <summary>
    /// True when the identifier is being used as a type reference (member access target, object
    /// creation, declared type) rather than as a local variable or parameter name.
    /// </summary>
    private static bool IsTypeUsage(IdentifierNameSyntax identifier) => identifier.Parent switch
    {
        MemberAccessExpressionSyntax access => access.Expression == identifier,
        ObjectCreationExpressionSyntax creation => creation.Type == identifier,
        QualifiedNameSyntax => true,
        VariableDeclarationSyntax declaration => declaration.Type == identifier,
        ParameterSyntax parameter => parameter.Type == identifier,
        _ => false,
    };
}
