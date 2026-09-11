using System.Globalization;
using System.Reflection;
using System.Text;

namespace CodeQuest.Runner;

/// <summary>
/// Hosts a single learner submission. The submission is compiled by the API into a console
/// assembly, but instead of letting the shared host activate it directly we load it here and call
/// its entry point inside a try/catch.
///
/// Two reasons for the indirection:
///  - An unhandled exception in a directly activated program hits the Windows postmortem debugger
///    path, which costs several seconds per crash on developer machines.
///  - It lets us translate runtime failures into teaching-oriented messages instead of a raw
///    .NET stack dump.
/// </summary>
internal static class RunnerProgram
{
    private const int ExitLearnerFault = 1;
    private const int ExitRunnerFault = 70;

    private static int Main(string[] args)
    {
        Console.OutputEncoding = Encoding.UTF8;
        Console.InputEncoding = Encoding.UTF8;

        // Learner output must not depend on the host machine's regional settings, otherwise a
        // decimal separator would flip expected results between developers.
        CultureInfo.DefaultThreadCurrentCulture = CultureInfo.InvariantCulture;
        CultureInfo.DefaultThreadCurrentUICulture = CultureInfo.InvariantCulture;

        if (args.Length == 0)
        {
            Console.Error.WriteLine("Uso: CodeQuest.Runner <caminho-do-assembly> [argumentos...]");
            return ExitRunnerFault;
        }

        var assemblyPath = args[0];
        if (!File.Exists(assemblyPath))
        {
            Console.Error.WriteLine($"Assembly não encontrado: {assemblyPath}");
            return ExitRunnerFault;
        }

        MethodInfo entryPoint;
        try
        {
            var assembly = Assembly.LoadFrom(assemblyPath);
            if (assembly.EntryPoint is null)
            {
                Console.Error.WriteLine(
                    "Não encontrei um ponto de entrada. Seu código precisa de um método 'Main' " +
                    "(ou instruções de nível superior).");
                return ExitRunnerFault;
            }

            entryPoint = assembly.EntryPoint;
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Falha ao carregar o programa: {ex.Message}");
            return ExitRunnerFault;
        }

        AppDomain.CurrentDomain.UnhandledException += (_, e) =>
        {
            if (e.ExceptionObject is Exception background) ReportLearnerException(background);
            Console.Out.Flush();
            Environment.Exit(ExitLearnerFault);
        };

        try
        {
            var invocationArgs = entryPoint.GetParameters().Length == 0
                ? null
                : new object?[] { args.Skip(1).ToArray() };

            var result = entryPoint.Invoke(null, invocationArgs);

            // `async Main` compiles to a synchronous wrapper, but a hand-written
            // `static Task Main()` reached through reflection still hands us the task.
            if (result is Task task)
            {
                task.GetAwaiter().GetResult();
                result = task.GetType().IsGenericType
                    ? task.GetType().GetProperty("Result")?.GetValue(task)
                    : null;
            }

            Console.Out.Flush();
            return result is int exitCode ? exitCode : 0;
        }
        catch (TargetInvocationException ex) when (ex.InnerException is not null)
        {
            ReportLearnerException(ex.InnerException);
            return ExitLearnerFault;
        }
        catch (Exception ex)
        {
            ReportLearnerException(ex);
            return ExitLearnerFault;
        }
    }

    private static void ReportLearnerException(Exception exception)
    {
        Console.Out.Flush();
        var name = exception.GetType().Name;
        Console.Error.WriteLine($"[erro em tempo de execução] {name}: {exception.Message}");

        if (Explain(exception) is { } hint) Console.Error.WriteLine($"Dica: {hint}");

        if (exception.InnerException is { } inner)
            Console.Error.WriteLine($"Causa interna: {inner.GetType().Name}: {inner.Message}");
    }

    /// <summary>Maps the failures learners hit most often onto an actionable next step.</summary>
    private static string? Explain(Exception exception) => exception switch
    {
        IndexOutOfRangeException => "você acessou uma posição que não existe. Índices válidos vão de 0 até Length - 1.",
        ArgumentOutOfRangeException => "um argumento saiu da faixa permitida. Confira limites de índices e tamanhos.",
        NullReferenceException => "você usou uma variável que vale null. Verifique se ela foi inicializada antes do uso.",
        DivideByZeroException => "divisão inteira por zero. Teste se o divisor é diferente de 0 antes de dividir.",
        FormatException => "a conversão de texto falhou. Use int.TryParse para lidar com entradas inválidas.",
        OverflowException => "o valor não cabe no tipo escolhido. Considere long ou decimal.",
        KeyNotFoundException => "a chave não existe no dicionário. Use TryGetValue ou ContainsKey antes de acessar.",
        InvalidOperationException => "a operação não é válida no estado atual da coleção ou do objeto.",
        StackOverflowException => "recursão sem caso base. Garanta que cada chamada se aproxime da condição de parada.",
        OutOfMemoryException => "consumo de memória excessivo. Revise laços que crescem sem limite.",
        _ => null,
    };
}
