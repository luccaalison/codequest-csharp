import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's09c01l01',
    title: 'Bloqueante contra assíncrono',
    objective: 'Entender o problema que o código assíncrono resolve, e o que ele não resolve.',
    concept: [
      {
        kind: 'text',
        body:
          'Quase todo programa passa a maior parte do tempo **esperando**: uma resposta de rede, uma leitura de disco, uma consulta a banco. Durante essa espera, uma thread bloqueada não faz nada — e não fica livre para outra coisa.',
      },
      {
        kind: 'table',
        headers: ['', 'Bloqueante', 'Assíncrono'],
        rows: [
          ['durante a espera', 'a thread fica parada', 'a thread volta ao pool'],
          ['duas esperas de 1 s', '2 s no total', 'pode ser 1 s'],
          ['custo por operação pendente', 'uma thread (~1 MB)', 'um objeto pequeno'],
          ['ganha em', 'nada', 'espera de E/S'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`async` **não deixa o código mais rápido**. Ele libera a thread durante a espera. Um cálculo que consome CPU por 3 segundos continua consumindo 3 segundos — para isso existe paralelismo, que é o capítulo 3.',
      },
      {
        kind: 'text',
        body:
          'A diferença aparece na **ordem em que as coisas acontecem**. Com `await` em sequência, a segunda operação só começa depois da primeira terminar.',
      },
      {
        kind: 'code',
        code: `int a = await TarefaAsync("A", 100);
int b = await TarefaAsync("B", 50);`,
      },
      {
        kind: 'output',
        code: `inicio A > fim A > inicio B > fim B`,
        caption: 'Sequencial: cada `await` espera o fim antes de seguir. Duração total: 150 ms.',
      },
      {
        kind: 'text',
        body:
          'Iniciando as duas **antes** de esperar, elas correm juntas — e a que termina primeiro é a mais curta, não a primeira que você escreveu.',
      },
      {
        kind: 'code',
        code: `var t1 = TarefaAsync("A", 100);
var t2 = TarefaAsync("B", 50);

int[] r = await Task.WhenAll(t1, t2);`,
      },
      {
        kind: 'output',
        code: `inicio A > inicio B > fim B > fim A`,
        caption: 'Simultâneo: as duas começam antes de qualquer espera. Duração total: ~100 ms.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A diferença entre os dois trechos é **onde o `await` está**, não o quê. Chamar o método já inicia a operação; o `await` apenas decide o momento de esperar pelo resultado.',
      },
      {
        kind: 'compare',
        good: `var t1 = BuscarAsync(1);
var t2 = BuscarAsync(2);

var r1 = await t1;
var r2 = await t2;`,
        bad: `var r1 = await BuscarAsync(1);
var r2 = await BuscarAsync(2);`,
        goodLabel: 'Inicia as duas, depois espera',
        badLabel: 'Espera uma, depois inicia a outra',
      },
      {
        kind: 'text',
        body:
          'Nem sempre a versão simultânea é a certa. Quando a segunda operação **depende** do resultado da primeira, sequencial é a única forma correta — e mais legível.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A pergunta que decide: **uma operação precisa do resultado da outra?** Se sim, sequencial. Se não, inicie as duas e espere junto. É a decisão mais comum de todo código assíncrono.',
      },
    ],
    quiz: [
      {
        id: 's09c01l01q1',
        type: 'single',
        prompt: '`async` torna o código mais rápido?',
        options: [
          { id: 'a', text: 'Não: ele libera a thread durante a espera de E/S', correct: true },
          { id: 'b', text: 'Sim: o compilador otimiza o método' },
          { id: 'c', text: 'Sim: cada `await` roda numa thread nova' },
          { id: 'd', text: 'Sim, mas apenas para cálculos de CPU' },
        ],
        explanation:
          'Um cálculo de 3 segundos continua levando 3 segundos. O ganho de `async` é não desperdiçar uma thread esperando algo externo.',
      },
      {
        id: 's09c01l01q2',
        type: 'single',
        prompt: 'Qual a diferença entre os dois trechos?',
        code: `// A
var r1 = await Buscar(1);
var r2 = await Buscar(2);

// B
var t1 = Buscar(1);
var t2 = Buscar(2);
var r1 = await t1;
var r2 = await t2;`,
        options: [
          { id: 'a', text: 'Em A as buscas são sequenciais; em B elas correm ao mesmo tempo', correct: true },
          { id: 'b', text: 'Nenhuma: os dois são equivalentes' },
          { id: 'c', text: 'B usa duas threads e A usa uma' },
          { id: 'd', text: 'A é mais rápido porque tem menos variáveis' },
        ],
        explanation:
          'Chamar o método já inicia a operação. Em A, a segunda chamada só acontece depois do primeiro `await` retornar.',
      },
      {
        id: 's09c01l01q3',
        type: 'single',
        prompt: 'Quando **não** iniciar as operações simultaneamente?',
        options: [
          { id: 'a', text: 'Quando a segunda depende do resultado da primeira', correct: true },
          { id: 'b', text: 'Quando há mais de duas operações' },
          { id: 'c', text: 'Quando as durações são diferentes' },
          { id: 'd', text: 'Nunca: simultâneo é sempre melhor' },
        ],
        explanation:
          'Se você precisa do id devolvido pela primeira chamada para fazer a segunda, não há o que paralelizar. Aí o sequencial é correto e mais claro.',
      },
    ],
    challenge: {
      brief:
        'Demonstre a diferença entre execução sequencial e simultânea registrando a ordem dos eventos, e mostre que a soma dos resultados é a mesma nos dois casos.',
      requirements: [
        '`TarefaAsync` registra `inicio <nome>` antes do delay e `fim <nome>` depois.',
        'O registro é feito sob `lock`, porque várias tarefas escrevem na mesma lista.',
        'A versão sequencial usa `await` em cada chamada; a simultânea inicia todas antes de esperar.',
        'Os delays devem ser diferentes, para que a ordem de término seja determinística.',
        'A soma dos resultados precisa ser idêntica nas duas versões.',
        'Nenhuma asserção sobre tempo decorrido — apenas sobre a **ordem** dos eventos.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class Program
{
    static readonly List<string> eventos = new();
    static readonly object trava = new();

    static void Registrar(string evento)
    {
        // TODO: adicione a lista sob lock
    }

    // TODO: registra "inicio <nome>", espera <ms>, registra "fim <nome>", devolve <valor>
    static async Task<int> TarefaAsync(string nome, int ms, int valor)
    {
        return 0;
    }

    // TODO: awaits em sequencia
    static async Task<int> SequencialAsync()
    {
        return 0;
    }

    // TODO: inicia as duas antes de esperar
    static async Task<int> SimultaneoAsync()
    {
        return 0;
    }

    // TODO: tres tarefas simultaneas com duracoes 150, 50 e 100
    static async Task<int> TresAsync()
    {
        return 0;
    }

    static string Linha()
    {
        return string.Join(" > ", eventos);
    }

    static async Task Main()
    {
        eventos.Clear();
        int somaSequencial = await SequencialAsync();
        string ordemSequencial = Linha();

        Console.WriteLine($"sequencial: {ordemSequencial}");
        Console.WriteLine($"soma: {somaSequencial}");

        eventos.Clear();
        int somaSimultanea = await SimultaneoAsync();
        string ordemSimultanea = Linha();

        Console.WriteLine($"simultaneo: {ordemSimultanea}");
        Console.WriteLine($"soma: {somaSimultanea}");

        Console.WriteLine($"somas iguais: {somaSequencial == somaSimultanea}");
        Console.WriteLine($"ordens diferentes: {ordemSequencial != ordemSimultanea}");

        eventos.Clear();
        int somaTres = await TresAsync();
        Console.WriteLine($"tres: {Linha()}");
        Console.WriteLine($"soma tres: {somaTres}");

        eventos.Clear();
        var repeticoes = new List<string>();

        for (int i = 0; i < 3; i++)
        {
            eventos.Clear();
            await SimultaneoAsync();
            repeticoes.Add(Linha());
        }

        Console.WriteLine($"ordem estavel: {repeticoes.Distinct().Count() == 1}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class Program
{
    static readonly List<string> eventos = new();
    static readonly object trava = new();

    static void Registrar(string evento)
    {
        lock (trava)
        {
            eventos.Add(evento);
        }
    }

    static async Task<int> TarefaAsync(string nome, int ms, int valor)
    {
        Registrar($"inicio {nome}");
        await Task.Delay(ms);
        Registrar($"fim {nome}");
        return valor;
    }

    static async Task<int> SequencialAsync()
    {
        int a = await TarefaAsync("A", 100, 1);
        int b = await TarefaAsync("B", 50, 2);
        return a + b;
    }

    static async Task<int> SimultaneoAsync()
    {
        Task<int> a = TarefaAsync("A", 100, 1);
        Task<int> b = TarefaAsync("B", 50, 2);

        int[] resultados = await Task.WhenAll(a, b);
        return resultados.Sum();
    }

    static async Task<int> TresAsync()
    {
        Task<int> x = TarefaAsync("X", 150, 1);
        Task<int> y = TarefaAsync("Y", 50, 2);
        Task<int> z = TarefaAsync("Z", 100, 3);

        int[] resultados = await Task.WhenAll(x, y, z);
        return resultados.Sum();
    }

    static string Linha()
    {
        return string.Join(" > ", eventos);
    }

    static async Task Main()
    {
        eventos.Clear();
        int somaSequencial = await SequencialAsync();
        string ordemSequencial = Linha();

        Console.WriteLine($"sequencial: {ordemSequencial}");
        Console.WriteLine($"soma: {somaSequencial}");

        eventos.Clear();
        int somaSimultanea = await SimultaneoAsync();
        string ordemSimultanea = Linha();

        Console.WriteLine($"simultaneo: {ordemSimultanea}");
        Console.WriteLine($"soma: {somaSimultanea}");

        Console.WriteLine($"somas iguais: {somaSequencial == somaSimultanea}");
        Console.WriteLine($"ordens diferentes: {ordemSequencial != ordemSimultanea}");

        eventos.Clear();
        int somaTres = await TresAsync();
        Console.WriteLine($"tres: {Linha()}");
        Console.WriteLine($"soma tres: {somaTres}");

        eventos.Clear();
        var repeticoes = new List<string>();

        for (int i = 0; i < 3; i++)
        {
            eventos.Clear();
            await SimultaneoAsync();
            repeticoes.Add(Linha());
        }

        Console.WriteLine($"ordem estavel: {repeticoes.Distinct().Count() == 1}");
    }
}`,
      hints: [
        'Chamar `TarefaAsync(...)` sem `await` já dispara a operação e devolve a `Task`. Guardar essa `Task` numa variável é o que permite iniciar várias antes de esperar.',
        'O `lock` na lista é necessário porque, na versão simultânea, duas tarefas podem registrar ao mesmo tempo.',
        'Delays de 100 e 50 ms fazem `B` terminar sempre antes de `A` — margem confortável para a ordem ser determinística.',
        '`Task.WhenAll` sobre `Task<int>` devolve `int[]`, então `Sum()` já dá o total.',
      ],
      tests: [
        {
          name: 'Sequencial contra simultâneo',
          expectedStdout:
            'sequencial: inicio A > fim A > inicio B > fim B\nsoma: 3\n' +
            'simultaneo: inicio A > inicio B > fim B > fim A\nsoma: 3\n' +
            'somas iguais: True\nordens diferentes: True\n' +
            'tres: inicio X > inicio Y > inicio Z > fim Y > fim Z > fim X\nsoma tres: 6\n' +
            'ordem estavel: True',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's09c01l02',
    title: 'O que é uma Task',
    objective: 'Entender a `Task` como uma promessa de resultado futuro, e conhecer seus estados.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma **`Task`** representa uma operação que pode ainda não ter terminado. Ela não é uma thread: é um objeto que sabe dizer se a operação acabou, se falhou, e qual foi o resultado.',
      },
      {
        kind: 'table',
        headers: ['Tipo', 'Representa'],
        rows: [
          ['`Task`', 'uma operação sem resultado — o `void` do mundo assíncrono'],
          ['`Task<T>`', 'uma operação que produzirá um `T`'],
          ['`ValueTask<T>`', 'o mesmo, otimizado para quando o resultado já existe'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Uma `Task` **não é uma thread**. Uma operação de E/S pendente não ocupa thread nenhuma: ela é um registro no sistema operacional, e a thread só é usada de novo quando a resposta chega.',
      },
      {
        kind: 'text',
        body:
          'A `Task` passa por estados, e as propriedades que os expõem são úteis para diagnóstico — não para controle de fluxo.',
      },
      {
        kind: 'table',
        headers: ['Propriedade', 'Significa'],
        rows: [
          ['`IsCompleted`', 'terminou de alguma forma: sucesso, falha ou cancelamento'],
          ['`IsCompletedSuccessfully`', 'terminou sem erro'],
          ['`IsFaulted`', 'terminou com exceção'],
          ['`IsCanceled`', 'foi cancelada'],
          ['`Status`', 'o estado detalhado, como `RanToCompletion`'],
          ['`Result`', 'o valor — **bloqueia** se ainda não terminou'],
        ],
      },
      {
        kind: 'code',
        code: `var pendente = TarefaAsync(50);
Console.WriteLine(pendente.IsCompleted);

await pendente;
Console.WriteLine($"{pendente.IsCompleted} {pendente.Status}");`,
      },
      {
        kind: 'output',
        code: `False
True RanToCompletion`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Nunca use `.Result` ou `.Wait()` para obter o valor. Eles **bloqueiam** a thread — desfazendo o único benefício do `async` — e podem travar o programa em certos contextos. A forma correta é sempre `await`.',
      },
      {
        kind: 'compare',
        good: `int valor = await BuscarAsync();`,
        bad: `int valor = BuscarAsync().Result;
BuscarAsync().Wait();`,
        goodLabel: 'Espera sem bloquear',
        badLabel: 'Bloqueia a thread',
      },
      {
        kind: 'text',
        body:
          'Nem toda `Task` representa trabalho pendente. Quando o resultado já é conhecido, existem atalhos que não alocam máquina de estados nenhuma.',
      },
      {
        kind: 'code',
        code: `Task pronta = Task.CompletedTask;
Task<int> comValor = Task.FromResult(42);
Task falhou = Task.FromException(new InvalidOperationException("erro"));`,
        caption: 'Úteis para implementar interfaces assíncronas em classes que respondem na hora — um cache, por exemplo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma `Task` só pode ser aguardada quantas vezes você quiser — mas ela executa **uma vez só**. Diferente de um `IEnumerable`, que reexecuta a cada percurso, a `Task` guarda o resultado depois que termina.',
      },
      {
        kind: 'text',
        body:
          'Quando a operação falha, a exceção fica **guardada** na `Task`. Ela só é lançada quando alguém faz `await` — e é por isso que uma `Task` esquecida engole erros em silêncio.',
      },
      {
        kind: 'output',
        code: `status: Faulted
IsFaulted: True`,
        caption: 'A tarefa terminou há tempo, e a exceção esperou pacientemente pelo `await`.',
      },
    ],
    quiz: [
      {
        id: 's09c01l02q1',
        type: 'single',
        prompt: 'Uma `Task` pendente ocupa uma thread?',
        options: [
          { id: 'a', text: 'Não: uma operação de E/S pendente é um registro no sistema, sem thread associada', correct: true },
          { id: 'b', text: 'Sim: cada `Task` tem sua thread' },
          { id: 'c', text: 'Sim, mas apenas metade de uma thread' },
          { id: 'd', text: 'Depende do número de núcleos' },
        ],
        explanation:
          'É a razão de `async` escalar: dez mil requisições pendentes custam dez mil objetos pequenos, não dez mil threads de 1 MB cada.',
      },
      {
        id: 's09c01l02q2',
        type: 'single',
        prompt: 'Por que evitar `.Result` e `.Wait()`?',
        options: [
          { id: 'a', text: 'Bloqueiam a thread, desfazendo o benefício do `async`, e podem travar em certos contextos', correct: true },
          { id: 'b', text: 'Porque devolvem um valor errado' },
          { id: 'c', text: 'Porque não funcionam com `Task<T>`' },
          { id: 'd', text: 'Porque são mais lentos que `await`' },
        ],
        explanation:
          'Além do bloqueio, em contextos com sincronização (interface gráfica, por exemplo) a combinação de `.Result` com `await` interno causa impasse permanente.',
      },
      {
        id: 's09c01l02q3',
        type: 'single',
        prompt: 'O que acontece com a exceção de uma `Task` que falha e nunca é aguardada?',
        options: [
          { id: 'a', text: 'Fica guardada na `Task` e nunca é observada', correct: true },
          { id: 'b', text: 'É lançada imediatamente na thread principal' },
          { id: 'c', text: 'É registrada no console automaticamente' },
          { id: 'd', text: 'Encerra o programa' },
        ],
        explanation:
          'A exceção só sai no `await`. Uma `Task` iniciada e esquecida engole o erro — é a origem do conselho de nunca ignorar o retorno de um método assíncrono.',
      },
    ],
    challenge: {
      brief:
        'Inspecione o ciclo de vida de uma `Task`: estados antes e depois da conclusão, tarefas já prontas, tarefas que falham, e a diferença entre observar e não observar o erro.',
      requirements: [
        'Mostre `IsCompleted` antes e depois do `await` de uma tarefa com delay.',
        'Use `Task.CompletedTask`, `Task.FromResult` e `Task.FromException`.',
        'Mostre que uma tarefa que falhou fica com `IsFaulted` e `Status` igual a `Faulted`.',
        'Demonstre que aguardar a mesma `Task` duas vezes devolve o mesmo resultado, sem reexecutar.',
        '`Contador` prova que o corpo do método assíncrono roda uma vez só.',
        'Nenhum uso de `.Result` ou `.Wait()`.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Threading.Tasks;

class Program
{
    static int execucoes;

    // TODO: incrementa 'execucoes', espera <ms>, devolve <valor>
    static async Task<int> TarefaAsync(int ms, int valor)
    {
        return 0;
    }

    // TODO: espera 10 ms e lanca InvalidOperationException("falhou")
    static async Task<int> FalhaAsync()
    {
        return 0;
    }

    // TODO: descreve o estado: "concluida", "falhou", "cancelada" ou "pendente"
    static string Descrever(Task tarefa)
    {
        return "";
    }

    static async Task Main()
    {
        execucoes = 0;

        Task<int> pendente = TarefaAsync(80, 7);
        Console.WriteLine($"antes: {pendente.IsCompleted} {Descrever(pendente)}");

        int valor = await pendente;
        Console.WriteLine($"depois: {pendente.IsCompleted} {Descrever(pendente)}");
        Console.WriteLine($"status: {pendente.Status}");
        Console.WriteLine($"valor: {valor}");

        int denovo = await pendente;
        int terceira = await pendente;
        Console.WriteLine($"reaguardada: {denovo} {terceira}");
        Console.WriteLine($"executou uma vez: {execucoes == 1}");

        Console.WriteLine($"CompletedTask: {Task.CompletedTask.IsCompleted}");
        Console.WriteLine($"FromResult: {await Task.FromResult(42)}");

        Task jaFalhou = Task.FromException(new InvalidOperationException("pronta com erro"));
        Console.WriteLine($"FromException: {Descrever(jaFalhou)}");

        try
        {
            await jaFalhou;
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"observada: {ex.Message}");
        }

        Task<int> falha = FalhaAsync();

        try
        {
            await falha;
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"capturada: {ex.Message}");
        }

        Console.WriteLine($"apos falha: {Descrever(falha)} status={falha.Status}");
        Console.WriteLine($"faulted: {falha.IsFaulted} sucesso: {falha.IsCompletedSuccessfully}");

        var varias = new List<Task<int>>
        {
            TarefaAsync(20, 1),
            TarefaAsync(30, 2),
            TarefaAsync(10, 3),
        };

        Console.WriteLine($"todas pendentes: {varias.TrueForAll(t => !t.IsCompleted)}");

        int[] resultados = await Task.WhenAll(varias);
        Console.WriteLine($"resultados: {string.Join(",", resultados)}");
        Console.WriteLine($"todas concluidas: {varias.TrueForAll(t => t.IsCompletedSuccessfully)}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Threading.Tasks;

class Program
{
    static int execucoes;

    static async Task<int> TarefaAsync(int ms, int valor)
    {
        execucoes++;
        await Task.Delay(ms);
        return valor;
    }

    static async Task<int> FalhaAsync()
    {
        await Task.Delay(10);
        throw new InvalidOperationException("falhou");
    }

    static string Descrever(Task tarefa)
    {
        if (tarefa.IsCanceled)
        {
            return "cancelada";
        }

        if (tarefa.IsFaulted)
        {
            return "falhou";
        }

        if (tarefa.IsCompleted)
        {
            return "concluida";
        }

        return "pendente";
    }

    static async Task Main()
    {
        execucoes = 0;

        Task<int> pendente = TarefaAsync(80, 7);
        Console.WriteLine($"antes: {pendente.IsCompleted} {Descrever(pendente)}");

        int valor = await pendente;
        Console.WriteLine($"depois: {pendente.IsCompleted} {Descrever(pendente)}");
        Console.WriteLine($"status: {pendente.Status}");
        Console.WriteLine($"valor: {valor}");

        int denovo = await pendente;
        int terceira = await pendente;
        Console.WriteLine($"reaguardada: {denovo} {terceira}");
        Console.WriteLine($"executou uma vez: {execucoes == 1}");

        Console.WriteLine($"CompletedTask: {Task.CompletedTask.IsCompleted}");
        Console.WriteLine($"FromResult: {await Task.FromResult(42)}");

        Task jaFalhou = Task.FromException(new InvalidOperationException("pronta com erro"));
        Console.WriteLine($"FromException: {Descrever(jaFalhou)}");

        try
        {
            await jaFalhou;
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"observada: {ex.Message}");
        }

        Task<int> falha = FalhaAsync();

        try
        {
            await falha;
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"capturada: {ex.Message}");
        }

        Console.WriteLine($"apos falha: {Descrever(falha)} status={falha.Status}");
        Console.WriteLine($"faulted: {falha.IsFaulted} sucesso: {falha.IsCompletedSuccessfully}");

        var varias = new List<Task<int>>
        {
            TarefaAsync(20, 1),
            TarefaAsync(30, 2),
            TarefaAsync(10, 3),
        };

        Console.WriteLine($"todas pendentes: {varias.TrueForAll(t => !t.IsCompleted)}");

        int[] resultados = await Task.WhenAll(varias);
        Console.WriteLine($"resultados: {string.Join(",", resultados)}");
        Console.WriteLine($"todas concluidas: {varias.TrueForAll(t => t.IsCompletedSuccessfully)}");
    }
}`,
      hints: [
        'A ordem dos testes em `Descrever` importa: `IsCompleted` é `true` também para tarefas canceladas e com falha, então precisa vir por último.',
        'Aguardar a mesma `Task` três vezes devolve o mesmo valor e não reexecuta o corpo — é isso que o contador prova.',
        '`Task.FromException` cria uma tarefa já falhada, sem executar nada; a exceção só sai quando alguém a aguarda.',
        '`Task.WhenAll` preserva a ordem dos resultados conforme a ordem das tarefas na lista, não a ordem de conclusão.',
      ],
      tests: [
        {
          name: 'Ciclo de vida da Task',
          expectedStdout:
            'antes: False pendente\ndepois: True concluida\nstatus: RanToCompletion\nvalor: 7\n' +
            'reaguardada: 7 7\nexecutou uma vez: True\n' +
            'CompletedTask: True\nFromResult: 42\n' +
            'FromException: falhou\nobservada: pronta com erro\n' +
            'capturada: falhou\napos falha: falhou status=Faulted\n' +
            'faulted: True sucesso: False\n' +
            'todas pendentes: True\nresultados: 1,2,3\ntodas concluidas: True',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's09c01l03',
    title: 'async e await',
    objective: 'Escrever métodos assíncronos e entender o que o compilador faz com eles.',
    concept: [
      {
        kind: 'text',
        body:
          'As duas palavras andam juntas: **`async`** marca um método como assíncrono, e **`await`** espera por uma operação sem bloquear a thread.',
      },
      {
        kind: 'code',
        code: `static async Task<int> BuscarAsync(int id)
{
    await Task.Delay(50);
    return id * 10;
}`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O compilador transforma o método numa **máquina de estados**, exatamente como faz com `yield`. Cada `await` é um ponto de pausa: o método devolve o controle a quem chamou e retoma dali quando a operação termina.',
      },
      {
        kind: 'text',
        body:
          'A palavra `async` sozinha não faz nada de assíncrono. Ela apenas **habilita** o uso de `await` dentro do método e faz o compilador embrulhar o retorno numa `Task`.',
      },
      {
        kind: 'compare',
        good: `// tem await: o async se justifica
static async Task<int> BuscarAsync(int id)
{
    await Task.Delay(50);
    return id * 10;
}`,
        bad: `// nenhum await: async so adiciona custo
static async Task<int> CalcularAsync(int n)
{
    return n * 2;
}`,
        goodLabel: 'Com `await`',
        badLabel: 'Sem `await` — aviso CS1998',
      },
      {
        kind: 'text',
        body:
          'Quando não há espera nenhuma, devolva uma `Task` pronta em vez de marcar o método como `async`. Isso evita a máquina de estados inteira.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Sem async',
          code: `static Task<int> CalcularAsync(int n)
{
    return Task.FromResult(n * 2);
}`,
        },
        right: {
          label: 'Com async desnecessário',
          code: `static async Task<int> CalcularAsync(int n)
{
    return n * 2;   // CS1998
}`,
        },
        note: 'A da esquerda não aloca máquina de estados e é indistinguível para quem chama.',
      },
      {
        kind: 'text',
        body: 'Três regras cobrem quase todo uso de `async` e `await`:',
      },
      {
        kind: 'table',
        headers: ['Regra', 'Por quê'],
        rows: [
          ['`await` só dentro de método `async`', 'ele precisa da máquina de estados'],
          ['método `async` devolve `Task`, `Task<T>` ou `void`', '`void` só para manipuladores de evento'],
          ['o sufixo `Async` no nome é convenção', 'sinaliza que o retorno deve ser aguardado'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O código **depois** de um `await` pode rodar numa thread diferente da que iniciou o método. Em programas de console isso raramente importa; em interfaces gráficas, é a diferença entre funcionar e travar.',
      },
      {
        kind: 'text',
        body:
          'Um `await` também pode aparecer no meio de uma expressão, e o resultado é usado normalmente:',
      },
      {
        kind: 'code',
        code: `int total = await BuscarAsync(1) + await BuscarAsync(2);

Console.WriteLine($"resultado: {await BuscarAsync(3)}");

var lista = new List<int> { await BuscarAsync(4) };`,
        caption: 'Repare que a primeira linha é **sequencial**: o segundo `await` só começa depois do primeiro.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Um método `async` que só faz `return await Outro();` quase sempre pode virar `return Outro();`, sem `async`. A exceção é quando há `try`/`finally` ou `using` em volta — aí o `await` precisa ficar.',
      },
    ],
    quiz: [
      {
        id: 's09c01l03q1',
        type: 'single',
        prompt: 'O que a palavra `async` faz sozinha?',
        options: [
          { id: 'a', text: 'Habilita `await` no método e embrulha o retorno numa `Task`', correct: true },
          { id: 'b', text: 'Executa o método numa thread separada' },
          { id: 'c', text: 'Torna o método mais rápido' },
          { id: 'd', text: 'Impede que o método bloqueie' },
        ],
        explanation:
          'Um método `async` sem `await` roda inteiramente de forma síncrona — e o compilador avisa com CS1998 justamente por isso.',
      },
      {
        id: 's09c01l03q2',
        type: 'single',
        prompt: 'Como escrever um método que devolve `Task<int>` sem nenhuma espera real?',
        options: [
          { id: 'a', text: '`static Task<int> X() => Task.FromResult(valor);`, sem `async`', correct: true },
          { id: 'b', text: '`static async Task<int> X() => valor;`' },
          { id: 'c', text: '`static async Task<int> X() { await Task.Yield(); return valor; }`' },
          { id: 'd', text: 'Não é possível' },
        ],
        explanation:
          'Sem `async`, não há máquina de estados. A opção B compila mas gera CS1998; a C adiciona uma volta ao agendador sem necessidade.',
      },
      {
        id: 's09c01l03q3',
        type: 'single',
        prompt: 'Quantas operações correm ao mesmo tempo em `await A() + await B()`?',
        options: [
          { id: 'a', text: 'Uma: `B` só começa depois de `A` terminar', correct: true },
          { id: 'b', text: 'Duas: as duas iniciam juntas' },
          { id: 'c', text: 'Depende do número de núcleos' },
          { id: 'd', text: 'Nenhuma: a expressão não compila' },
        ],
        explanation:
          'O `await` pausa a avaliação da expressão inteira. Para correrem juntas, é preciso iniciar as duas antes e depois somar os resultados.',
      },
    ],
    challenge: {
      brief:
        'Escreva um pequeno serviço assíncrono aplicando as regras: `async` só onde há `await`, `Task.FromResult` onde não há, e a distinção entre esperar em sequência e em conjunto.',
      requirements: [
        '`BuscarAsync` usa `await` de verdade e registra o id buscado.',
        '`DoCacheAsync` **não** é `async`: devolve `Task.FromResult`.',
        '`SomarSequencialAsync` usa `await A() + await B()`.',
        '`SomarJuntoAsync` inicia as duas antes de esperar.',
        '`ObterOuBuscarAsync` devolve do cache quando existe, sem tocar na busca.',
        'Um contador prova quantas buscas reais aconteceram em cada caso.',
        'Nenhum uso de `.Result` ou `.Wait()`.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class Servico
{
    private readonly Dictionary<int, string> cache = new() { [1] = "cache-um" };

    public int Buscas { get; private set; }

    // TODO: async de verdade; incrementa Buscas, espera 40 ms, devolve "buscado-<id>"
    public async Task<string> BuscarAsync(int id)
    {
        return "";
    }

    // TODO: SEM async; devolve Task.FromResult com o valor do cache, ou null
    public Task<string> DoCacheAsync(int id)
    {
        return null;
    }

    // TODO: usa o cache quando existe; so busca quando nao existe
    public async Task<string> ObterOuBuscarAsync(int id)
    {
        return "";
    }

    // TODO: await A() + await B() — sequencial
    public async Task<int> SomarSequencialAsync(int a, int b)
    {
        return 0;
    }

    // TODO: inicia as duas antes de esperar
    public async Task<int> SomarJuntoAsync(int a, int b)
    {
        return 0;
    }

    // TODO: espera <ms> e devolve o tamanho do texto
    public async Task<int> TamanhoAsync(string texto, int ms)
    {
        return 0;
    }
}

class Program
{
    static async Task Main()
    {
        var servico = new Servico();

        Console.WriteLine($"busca direta: {await servico.BuscarAsync(9)}");
        Console.WriteLine($"buscas: {servico.Buscas}");

        Console.WriteLine($"cache existente: {await servico.DoCacheAsync(1)}");
        Console.WriteLine($"cache ausente nulo: {await servico.DoCacheAsync(99) == null}");
        Console.WriteLine($"buscas apos cache: {servico.Buscas}");

        Console.WriteLine($"obter do cache: {await servico.ObterOuBuscarAsync(1)}");
        Console.WriteLine($"buscas ainda: {servico.Buscas}");

        Console.WriteLine($"obter buscando: {await servico.ObterOuBuscarAsync(5)}");
        Console.WriteLine($"buscas agora: {servico.Buscas}");

        var contador = new Servico();
        Console.WriteLine($"soma sequencial: {await contador.SomarSequencialAsync(2, 3)}");
        Console.WriteLine($"buscas sequencial: {contador.Buscas}");

        var outro = new Servico();
        Console.WriteLine($"soma junto: {await outro.SomarJuntoAsync(2, 3)}");
        Console.WriteLine($"buscas junto: {outro.Buscas}");

        Console.WriteLine($"tamanho: {await servico.TamanhoAsync("bicicleta", 20)}");
        Console.WriteLine($"tamanho vazio: {await servico.TamanhoAsync("", 10)}");

        var tarefas = new List<Task<int>>
        {
            servico.TamanhoAsync("um", 30),
            servico.TamanhoAsync("dois", 10),
            servico.TamanhoAsync("tres!", 20),
        };

        int[] tamanhos = await Task.WhenAll(tarefas);
        Console.WriteLine($"tamanhos: {string.Join(",", tamanhos)}");
        Console.WriteLine($"total: {tamanhos.Sum()}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class Servico
{
    private readonly Dictionary<int, string> cache = new() { [1] = "cache-um" };

    public int Buscas { get; private set; }

    public async Task<string> BuscarAsync(int id)
    {
        Buscas++;
        await Task.Delay(40);
        return $"buscado-{id}";
    }

    public Task<string> DoCacheAsync(int id)
    {
        return Task.FromResult(cache.TryGetValue(id, out string valor) ? valor : null);
    }

    public async Task<string> ObterOuBuscarAsync(int id)
    {
        string doCache = await DoCacheAsync(id);

        if (doCache != null)
        {
            return doCache;
        }

        return await BuscarAsync(id);
    }

    public async Task<int> SomarSequencialAsync(int a, int b)
    {
        return (await BuscarAsync(a)).Length + (await BuscarAsync(b)).Length;
    }

    public async Task<int> SomarJuntoAsync(int a, int b)
    {
        Task<string> primeira = BuscarAsync(a);
        Task<string> segunda = BuscarAsync(b);

        string[] resultados = await Task.WhenAll(primeira, segunda);
        return resultados[0].Length + resultados[1].Length;
    }

    public async Task<int> TamanhoAsync(string texto, int ms)
    {
        await Task.Delay(ms);
        return texto.Length;
    }
}

class Program
{
    static async Task Main()
    {
        var servico = new Servico();

        Console.WriteLine($"busca direta: {await servico.BuscarAsync(9)}");
        Console.WriteLine($"buscas: {servico.Buscas}");

        Console.WriteLine($"cache existente: {await servico.DoCacheAsync(1)}");
        Console.WriteLine($"cache ausente nulo: {await servico.DoCacheAsync(99) == null}");
        Console.WriteLine($"buscas apos cache: {servico.Buscas}");

        Console.WriteLine($"obter do cache: {await servico.ObterOuBuscarAsync(1)}");
        Console.WriteLine($"buscas ainda: {servico.Buscas}");

        Console.WriteLine($"obter buscando: {await servico.ObterOuBuscarAsync(5)}");
        Console.WriteLine($"buscas agora: {servico.Buscas}");

        var contador = new Servico();
        Console.WriteLine($"soma sequencial: {await contador.SomarSequencialAsync(2, 3)}");
        Console.WriteLine($"buscas sequencial: {contador.Buscas}");

        var outro = new Servico();
        Console.WriteLine($"soma junto: {await outro.SomarJuntoAsync(2, 3)}");
        Console.WriteLine($"buscas junto: {outro.Buscas}");

        Console.WriteLine($"tamanho: {await servico.TamanhoAsync("bicicleta", 20)}");
        Console.WriteLine($"tamanho vazio: {await servico.TamanhoAsync("", 10)}");

        var tarefas = new List<Task<int>>
        {
            servico.TamanhoAsync("um", 30),
            servico.TamanhoAsync("dois", 10),
            servico.TamanhoAsync("tres!", 20),
        };

        int[] tamanhos = await Task.WhenAll(tarefas);
        Console.WriteLine($"tamanhos: {string.Join(",", tamanhos)}");
        Console.WriteLine($"total: {tamanhos.Sum()}");
    }
}`,
      hints: [
        '`DoCacheAsync` não tem `await` nenhum, então não deve ser `async` — `Task.FromResult` já devolve uma tarefa concluída.',
        '`ObterOuBuscarAsync` **é** `async`, porque aguarda o cache e possivelmente a busca.',
        '`buscado-2` e `buscado-3` têm 9 caracteres cada, então as duas somas dão 18 — a diferença entre elas é só quando as buscas acontecem.',
        'Os dois métodos de soma fazem duas buscas cada; o contador confirma que nenhum deles pulou uma.',
      ],
      tests: [
        {
          name: 'Serviço assíncrono',
          expectedStdout:
            'busca direta: buscado-9\nbuscas: 1\n' +
            'cache existente: cache-um\ncache ausente nulo: True\nbuscas apos cache: 1\n' +
            'obter do cache: cache-um\nbuscas ainda: 1\n' +
            'obter buscando: buscado-5\nbuscas agora: 2\n' +
            'soma sequencial: 18\nbuscas sequencial: 2\n' +
            'soma junto: 18\nbuscas junto: 2\n' +
            'tamanho: 9\ntamanho vazio: 0\n' +
            'tamanhos: 2,4,5\ntotal: 11',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's09c01l04',
    title: 'Task<T>',
    objective: 'Trabalhar com tarefas que produzem valores, encadeando e combinando resultados.',
    concept: [
      {
        kind: 'text',
        body:
          '`Task<T>` é a promessa de um valor futuro. A relação com `Task` é a mesma de um método que devolve algo para um que devolve `void`.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Síncrono',
          code: `static int Buscar(int id)
{
    return id * 10;
}

int valor = Buscar(1);`,
        },
        right: {
          label: 'Assíncrono',
          code: `static async Task<int> BuscarAsync(int id)
{
    await Task.Delay(50);
    return id * 10;
}

int valor = await BuscarAsync(1);`,
        },
        note: 'O `await` "desembrulha" a `Task<int>` e entrega o `int`. O tipo da variável é o mesmo dos dois lados.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Dentro do método, você escreve `return id * 10;` — um `int`. O compilador é que embrulha o valor numa `Task<int>`. Escrever `return Task.FromResult(...)` dentro de um método `async` seria um erro de tipo.',
      },
      {
        kind: 'text',
        body:
          'Quando várias tarefas do mesmo tipo precisam ser aguardadas juntas, `Task.WhenAll` devolve um array com todos os resultados, **na ordem das tarefas** — não na ordem em que terminaram.',
      },
      {
        kind: 'code',
        code: `var tarefas = new List<Task<int>>
{
    BuscarAsync(1),   // demora 100 ms
    BuscarAsync(2),   // demora 20 ms
    BuscarAsync(3),   // demora 60 ms
};

int[] resultados = await Task.WhenAll(tarefas);`,
      },
      {
        kind: 'output',
        code: `10,20,30`,
        caption: 'A tarefa 2 terminou primeiro, mas o resultado dela continua na posição 1 do array.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Essa garantia de ordem é o que torna `WhenAll` seguro para combinar resultados posicionais. Você pode confiar que `resultados[0]` veio de `tarefas[0]`, independentemente do escalonamento.',
      },
      {
        kind: 'text',
        body:
          'Uma armadilha comum é misturar LINQ com `async`. `Select` com uma lambda assíncrona produz `IEnumerable<Task<T>>` — uma coleção de tarefas, não de resultados.',
      },
      {
        kind: 'compare',
        good: `var tarefas = ids.Select(id => BuscarAsync(id));
int[] valores = await Task.WhenAll(tarefas);`,
        bad: `// tipo: IEnumerable<Task<int>>
var valores = ids.Select(id => BuscarAsync(id));

// e agora? nao da para somar
var soma = valores.Sum();   // erro`,
        goodLabel: 'Aguarda a coleção de tarefas',
        badLabel: 'Esquece de aguardar',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Cuidado com `Select` assíncrono sobre uma sequência preguiçosa: as tarefas só são criadas quando alguém percorre. Um `ToList()` antes de `WhenAll` garante que todas foram iniciadas.',
      },
      {
        kind: 'text',
        body:
          'Quando as tarefas têm tipos diferentes, `WhenAll` não ajuda — mas iniciar todas e aguardar uma a uma tem o mesmo efeito de simultaneidade.',
      },
      {
        kind: 'code',
        code: `Task<int> numero = BuscarNumeroAsync();
Task<string> texto = BuscarTextoAsync();

int n = await numero;
string t = await texto;`,
        caption: 'As duas correm juntas: os `await` só aguardam algo que já está em andamento.',
      },
      {
        kind: 'text',
        body:
          'Também existe `ValueTask<T>`, uma versão que evita alocação quando o resultado já está disponível. Use-a apenas em caminhos muito quentes — ela tem restrições, como não poder ser aguardada duas vezes.',
      },
    ],
    quiz: [
      {
        id: 's09c01l04q1',
        type: 'single',
        prompt: 'Dentro de um método `async Task<int>`, o que se escreve no `return`?',
        options: [
          { id: 'a', text: 'O `int` diretamente; o compilador embrulha na `Task`', correct: true },
          { id: 'b', text: '`Task.FromResult(valor)`' },
          { id: 'c', text: '`await valor`' },
          { id: 'd', text: '`new Task<int>(valor)`' },
        ],
        explanation:
          'É o que torna a escrita de código assíncrono parecida com a síncrona. `Task.FromResult` só aparece em métodos que **não** são `async`.',
      },
      {
        id: 's09c01l04q2',
        type: 'single',
        prompt: 'Em que ordem `Task.WhenAll` devolve os resultados?',
        options: [
          { id: 'a', text: 'Na ordem das tarefas passadas, não na ordem de conclusão', correct: true },
          { id: 'b', text: 'Na ordem de conclusão' },
          { id: 'c', text: 'Em ordem aleatória' },
          { id: 'd', text: 'Ordenados pelo valor' },
        ],
        explanation:
          'É uma garantia do contrato. Sem ela, seria impossível combinar resultados posicionalmente de forma confiável.',
      },
      {
        id: 's09c01l04q3',
        type: 'single',
        prompt: 'Qual o tipo de `ids.Select(id => BuscarAsync(id))`?',
        options: [
          { id: 'a', text: '`IEnumerable<Task<int>>`', correct: true },
          { id: 'b', text: '`IEnumerable<int>`' },
          { id: 'c', text: '`Task<IEnumerable<int>>`' },
          { id: 'd', text: '`Task<int[]>`' },
        ],
        explanation:
          'A lambda devolve `Task<int>`, então o `Select` produz uma sequência delas. Falta o `await Task.WhenAll(...)` para chegar aos valores.',
      },
    ],
    challenge: {
      brief:
        'Construa um agregador que busca vários registros em paralelo, combina resultados de tipos diferentes e prova que a ordem do `WhenAll` segue a das tarefas.',
      requirements: [
        '`BuscarAsync` recebe um id e uma duração, e devolve `id * 10`.',
        '`BuscarTodosAsync` usa `Select` seguido de `Task.WhenAll`, com `ToList()` antes.',
        'A ordem dos resultados deve seguir a das tarefas, mesmo com durações embaralhadas.',
        '`CombinarAsync` aguarda tarefas de tipos diferentes iniciadas simultaneamente.',
        '`OrdemDeTermino` registra a ordem real de conclusão, para contraste.',
        '`SomarAsync` demonstra o erro comum: `Select` sem `WhenAll` não dá números.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class Program
{
    static readonly List<int> terminos = new();
    static readonly object trava = new();

    // TODO: espera <ms>, registra o id em 'terminos' sob lock, devolve id * 10
    static async Task<int> BuscarAsync(int id, int ms)
    {
        return 0;
    }

    static async Task<string> BuscarNomeAsync(int id, int ms)
    {
        await Task.Delay(ms);
        return $"nome-{id}";
    }

    static async Task<bool> BuscarAtivoAsync(int id, int ms)
    {
        await Task.Delay(ms);
        return id % 2 == 0;
    }

    // TODO: Select + ToList + WhenAll
    static async Task<int[]> BuscarTodosAsync(IEnumerable<(int Id, int Ms)> pedidos)
    {
        return new int[0];
    }

    // TODO: inicia as tres, depois aguarda cada uma; devolve "<n>|<nome>|<ativo>"
    static async Task<string> CombinarAsync(int id)
    {
        return "";
    }

    // TODO: soma os resultados; use WhenAll antes de somar
    static async Task<int> SomarAsync(IEnumerable<(int Id, int Ms)> pedidos)
    {
        return 0;
    }

    static async Task Main()
    {
        terminos.Clear();

        var pedidos = new List<(int Id, int Ms)> { (1, 100), (2, 20), (3, 60) };

        int[] resultados = await BuscarTodosAsync(pedidos);
        Console.WriteLine($"resultados: {string.Join(",", resultados)}");
        Console.WriteLine($"ordem de termino: {string.Join(",", terminos)}");
        Console.WriteLine($"ordem preservada: {resultados.SequenceEqual(new[] { 10, 20, 30 })}");
        Console.WriteLine($"terminos diferentes da entrada: {!terminos.SequenceEqual(new[] { 1, 2, 3 })}");

        terminos.Clear();
        Console.WriteLine($"soma: {await SomarAsync(pedidos)}");

        Console.WriteLine($"combinar par: {await CombinarAsync(4)}");
        Console.WriteLine($"combinar impar: {await CombinarAsync(7)}");

        terminos.Clear();
        var muitos = Enumerable.Range(1, 5).Select(i => (Id: i, Ms: (6 - i) * 40)).ToList();
        int[] varios = await BuscarTodosAsync(muitos);
        Console.WriteLine($"varios: {string.Join(",", varios)}");
        Console.WriteLine($"terminos invertidos: {terminos.SequenceEqual(new[] { 5, 4, 3, 2, 1 })}");

        Console.WriteLine($"vazio: [{string.Join(",", await BuscarTodosAsync(new List<(int, int)>()))}]");
        Console.WriteLine($"soma vazia: {await SomarAsync(new List<(int, int)>())}");

        var tipos = new List<Task>
        {
            BuscarAsync(1, 10),
            BuscarNomeAsync(2, 10),
            BuscarAtivoAsync(3, 10),
        };

        await Task.WhenAll(tipos);
        Console.WriteLine($"tipos mistos concluidos: {tipos.All(t => t.IsCompletedSuccessfully)}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class Program
{
    static readonly List<int> terminos = new();
    static readonly object trava = new();

    static async Task<int> BuscarAsync(int id, int ms)
    {
        await Task.Delay(ms);

        lock (trava)
        {
            terminos.Add(id);
        }

        return id * 10;
    }

    static async Task<string> BuscarNomeAsync(int id, int ms)
    {
        await Task.Delay(ms);
        return $"nome-{id}";
    }

    static async Task<bool> BuscarAtivoAsync(int id, int ms)
    {
        await Task.Delay(ms);
        return id % 2 == 0;
    }

    static async Task<int[]> BuscarTodosAsync(IEnumerable<(int Id, int Ms)> pedidos)
    {
        List<Task<int>> tarefas = pedidos.Select(p => BuscarAsync(p.Id, p.Ms)).ToList();
        return await Task.WhenAll(tarefas);
    }

    static async Task<string> CombinarAsync(int id)
    {
        Task<int> numero = BuscarAsync(id, 30);
        Task<string> nome = BuscarNomeAsync(id, 20);
        Task<bool> ativo = BuscarAtivoAsync(id, 10);

        int n = await numero;
        string s = await nome;
        bool a = await ativo;

        return $"{n}|{s}|{a}";
    }

    static async Task<int> SomarAsync(IEnumerable<(int Id, int Ms)> pedidos)
    {
        int[] valores = await BuscarTodosAsync(pedidos);
        return valores.Sum();
    }

    static async Task Main()
    {
        terminos.Clear();

        var pedidos = new List<(int Id, int Ms)> { (1, 100), (2, 20), (3, 60) };

        int[] resultados = await BuscarTodosAsync(pedidos);
        Console.WriteLine($"resultados: {string.Join(",", resultados)}");
        Console.WriteLine($"ordem de termino: {string.Join(",", terminos)}");
        Console.WriteLine($"ordem preservada: {resultados.SequenceEqual(new[] { 10, 20, 30 })}");
        Console.WriteLine($"terminos diferentes da entrada: {!terminos.SequenceEqual(new[] { 1, 2, 3 })}");

        terminos.Clear();
        Console.WriteLine($"soma: {await SomarAsync(pedidos)}");

        Console.WriteLine($"combinar par: {await CombinarAsync(4)}");
        Console.WriteLine($"combinar impar: {await CombinarAsync(7)}");

        terminos.Clear();
        var muitos = Enumerable.Range(1, 5).Select(i => (Id: i, Ms: (6 - i) * 40)).ToList();
        int[] varios = await BuscarTodosAsync(muitos);
        Console.WriteLine($"varios: {string.Join(",", varios)}");
        Console.WriteLine($"terminos invertidos: {terminos.SequenceEqual(new[] { 5, 4, 3, 2, 1 })}");

        Console.WriteLine($"vazio: [{string.Join(",", await BuscarTodosAsync(new List<(int, int)>()))}]");
        Console.WriteLine($"soma vazia: {await SomarAsync(new List<(int, int)>())}");

        var tipos = new List<Task>
        {
            BuscarAsync(1, 10),
            BuscarNomeAsync(2, 10),
            BuscarAtivoAsync(3, 10),
        };

        await Task.WhenAll(tipos);
        Console.WriteLine($"tipos mistos concluidos: {tipos.All(t => t.IsCompletedSuccessfully)}");
    }
}`,
      hints: [
        'O `ToList()` antes do `WhenAll` é o que garante que todas as tarefas foram iniciadas — sem ele, o `Select` preguiçoso as criaria uma a uma.',
        'Em `CombinarAsync`, as três chamadas acontecem antes de qualquer `await`; os três `await` seguidos apenas coletam resultados já em andamento.',
        'As durações `(6 - i) * 40` fazem o id 5 terminar primeiro e o id 1 por último. O espaçamento de 40 ms é folgado de propósito: com 15 ms a ordem deixa de ser confiável.',
        '`WhenAll` sobre `List<Task>` (sem `<T>`) devolve `Task`, não array: serve para esperar tarefas de tipos diferentes.',
      ],
      tests: [
        {
          name: 'Agregador de tarefas',
          expectedStdout:
            'resultados: 10,20,30\nordem de termino: 2,3,1\nordem preservada: True\n' +
            'terminos diferentes da entrada: True\n' +
            'soma: 60\n' +
            'combinar par: 40|nome-4|True\ncombinar impar: 70|nome-7|False\n' +
            'varios: 10,20,30,40,50\nterminos invertidos: True\n' +
            'vazio: []\nsoma vazia: 0\n' +
            'tipos mistos concluidos: True',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's09c01l05',
    title: 'Métodos que retornam Task',
    objective: 'Projetar assinaturas assíncronas corretas e propagar a assincronia pela cadeia de chamadas.',
    concept: [
      {
        kind: 'text',
        body:
          'A escolha do tipo de retorno de um método assíncrono é uma decisão de contrato. São três opções, e duas delas têm uso bem definido.',
      },
      {
        kind: 'table',
        headers: ['Retorno', 'Quando usar'],
        rows: [
          ['`Task`', 'a operação não produz valor'],
          ['`Task<T>`', 'a operação produz um `T`'],
          ['`void`', '**apenas** manipuladores de evento'],
        ],
      },
      {
        kind: 'text',
        body:
          'A assincronia é **contagiosa**: se um método precisa aguardar algo, ele vira `async`, e quem o chama também precisa aguardar. Essa propagação vai até o topo da pilha.',
      },
      {
        kind: 'code',
        code: `static async Task<int> RepositorioAsync() { await Task.Delay(10); return 1; }
static async Task<int> ServicoAsync() => await RepositorioAsync() * 2;
static async Task<int> ControladorAsync() => await ServicoAsync() + 1;

static async Task Main() => Console.WriteLine(await ControladorAsync());`,
        caption: 'A cadeia inteira é assíncrona. Quebrar a corrente com `.Result` no meio anula o benefício.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Essa propagação incomoda e leva à tentação de "resolver" com `.Result` num ponto da cadeia. Não faça: além de bloquear a thread, isso reintroduz o problema que a cadeia inteira existia para evitar.',
      },
      {
        kind: 'text',
        body:
          'Quando o método apenas repassa o resultado de outro, existe a opção de **omitir o `async`** e devolver a `Task` diretamente.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Com async',
          code: `static async Task<int> ServicoAsync()
{
    return await RepositorioAsync();
}`,
        },
        right: {
          label: 'Repassando',
          code: `static Task<int> ServicoAsync()
{
    return RepositorioAsync();
}`,
        },
        note: 'A da direita não aloca máquina de estados. É a mesma otimização de `Task.FromResult`, aplicada ao repasse.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Cuidado: se houver `try`/`catch`, `try`/`finally` ou `using` em volta, o `await` **precisa** ficar. Sem ele, o método retorna antes de a tarefa terminar, e o `finally` executa cedo demais — fechando um recurso ainda em uso.',
      },
      {
        kind: 'compare',
        good: `static async Task<string> LerAsync(string caminho)
{
    using var leitor = new StreamReader(caminho);
    return await leitor.ReadToEndAsync();
}`,
        bad: `static Task<string> LerAsync(string caminho)
{
    using var leitor = new StreamReader(caminho);
    return leitor.ReadToEndAsync();
    // o leitor fecha antes da leitura terminar
}`,
        goodLabel: 'Mantém o `await` dentro do `using`',
        badLabel: 'Repassa e fecha cedo demais',
      },
      {
        kind: 'text',
        body:
          'Ao projetar uma interface, o método assíncrono deve aceitar um `CancellationToken` — mesmo que a implementação atual o ignore. Adicioná-lo depois quebra todos os implementadores.',
      },
      {
        kind: 'code',
        code: `interface IRepositorio
{
    Task<Cliente?> BuscarAsync(int id, CancellationToken ct = default);
    Task SalvarAsync(Cliente cliente, CancellationToken ct = default);
}`,
        caption: 'O `= default` mantém as chamadas simples para quem não precisa cancelar.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A convenção do sufixo `Async` existe para que quem lê saiba, sem consultar a assinatura, que o retorno precisa ser aguardado. Um `Buscar()` que devolve `Task` esquecida é um bug difícil de enxergar.',
      },
    ],
    quiz: [
      {
        id: 's09c01l05q1',
        type: 'single',
        prompt: 'Por que a assincronia é chamada de "contagiosa"?',
        options: [
          { id: 'a', text: 'Quem aguarda um método `async` precisa ser `async` também, até o topo da pilha', correct: true },
          { id: 'b', text: 'Porque `async` cria threads que se multiplicam' },
          { id: 'c', text: 'Porque o compilador marca todos os métodos automaticamente' },
          { id: 'd', text: 'Porque `Task` não pode ser convertida em valor' },
        ],
        explanation:
          'A alternativa a propagar é bloquear com `.Result`, que desfaz o benefício. Por isso o padrão recomendado é "async até o fim".',
      },
      {
        id: 's09c01l05q2',
        type: 'single',
        prompt: 'Quando **não** se pode omitir o `async` num método que só repassa uma `Task`?',
        options: [
          { id: 'a', text: 'Quando há `using`, `try`/`catch` ou `try`/`finally` em volta', correct: true },
          { id: 'b', text: 'Quando o método devolve `Task<T>`' },
          { id: 'c', text: 'Quando o método é público' },
          { id: 'd', text: 'Sempre se pode omitir' },
        ],
        explanation:
          'Sem o `await`, o método retorna assim que a tarefa é criada, e o `finally` — ou o `Dispose` do `using` — executa antes de a operação terminar.',
      },
      {
        id: 's09c01l05q3',
        type: 'single',
        prompt: 'Por que incluir `CancellationToken ct = default` numa interface assíncrona?',
        options: [
          { id: 'a', text: 'Adicioná-lo depois quebraria todos os implementadores', correct: true },
          { id: 'b', text: 'Porque o compilador exige' },
          { id: 'c', text: 'Para que o método seja mais rápido' },
          { id: 'd', text: 'Porque `Task` não funciona sem token' },
        ],
        explanation:
          'É uma decisão de evolução da API. O `= default` deixa o parâmetro opcional, sem custo para quem não precisa dele.',
      },
    ],
    challenge: {
      brief:
        'Monte uma cadeia de camadas assíncronas — repositório, serviço e controlador — aplicando as regras de assinatura, incluindo repasse sem `async` onde é seguro e `await` obrigatório onde há recurso.',
      requirements: [
        'A cadeia tem três camadas, todas assíncronas, sem `.Result` em nenhum ponto.',
        '`RepassarAsync` omite o `async` e devolve a `Task` diretamente.',
        '`ComRecursoAsync` mantém o `await` dentro do `using`, e o recurso registra quando foi liberado.',
        'A interface `IRepositorio` declara `CancellationToken ct = default`.',
        '`SemValorAsync` devolve `Task` sem `<T>`.',
        'Um contador de camadas prova que cada nível foi atravessado uma vez.',
        'Demonstre que o recurso é liberado **depois** da leitura, não antes.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

class Recurso : IDisposable
{
    private readonly List<string> log;
    private readonly string nome;

    public Recurso(string nome, List<string> log)
    {
        this.nome = nome;
        this.log = log;
        log.Add($"abriu {nome}");
    }

    public async Task<string> LerAsync()
    {
        await Task.Delay(30);
        log.Add($"leu {nome}");
        return $"conteudo de {nome}";
    }

    public void Dispose()
    {
        log.Add($"fechou {nome}");
    }
}

interface IRepositorio
{
    // TODO: declare com CancellationToken ct = default
    Task<int> BuscarAsync(int id);
    Task SalvarAsync(int id);
}

class RepositorioMemoria : IRepositorio
{
    public int Chamadas { get; private set; }

    // TODO: implemente conforme a interface
    public async Task<int> BuscarAsync(int id)
    {
        return 0;
    }

    public async Task SalvarAsync(int id)
    {
    }
}

class Servico
{
    private readonly IRepositorio repositorio;
    public int Chamadas { get; private set; }

    public Servico(IRepositorio repositorio)
    {
        this.repositorio = repositorio;
    }

    // TODO: aguarda o repositorio e dobra o valor
    public async Task<int> ProcessarAsync(int id, CancellationToken ct = default)
    {
        return 0;
    }

    // TODO: SEM async — repassa a Task do repositorio
    public Task<int> RepassarAsync(int id, CancellationToken ct = default)
    {
        return null;
    }

    // TODO: Task sem <T>
    public async Task SemValorAsync(int id, CancellationToken ct = default)
    {
    }
}

class Controlador
{
    private readonly Servico servico;
    public int Chamadas { get; private set; }

    public Controlador(Servico servico)
    {
        this.servico = servico;
    }

    // TODO: aguarda o servico e soma 1
    public async Task<int> ExecutarAsync(int id)
    {
        return 0;
    }

    // TODO: mantenha o await dentro do using
    public async Task<string> ComRecursoAsync(string nome, List<string> log)
    {
        return "";
    }
}

class Program
{
    static async Task Main()
    {
        var repo = new RepositorioMemoria();
        var servico = new Servico(repo);
        var controlador = new Controlador(servico);

        Console.WriteLine($"cadeia: {await controlador.ExecutarAsync(5)}");
        Console.WriteLine($"camadas: repo={repo.Chamadas} servico={servico.Chamadas} controlador={controlador.Chamadas}");

        Console.WriteLine($"repasse: {await servico.RepassarAsync(7)}");
        Console.WriteLine($"repo apos repasse: {repo.Chamadas}");

        await servico.SemValorAsync(1);
        Console.WriteLine($"sem valor concluiu: {repo.Chamadas}");

        var log = new List<string>();
        string conteudo = await controlador.ComRecursoAsync("arquivo", log);

        Console.WriteLine($"conteudo: {conteudo}");
        Console.WriteLine($"log: {string.Join(" > ", log)}");
        Console.WriteLine($"fechou por ultimo: {log[log.Count - 1] == "fechou arquivo"}");

        using var cts = new CancellationTokenSource();
        Console.WriteLine($"com token: {await servico.ProcessarAsync(3, cts.Token)}");
        Console.WriteLine($"sem token: {await servico.ProcessarAsync(3)}");

        var tarefas = new List<Task<int>>
        {
            controlador.ExecutarAsync(1),
            controlador.ExecutarAsync(2),
        };

        int[] resultados = await Task.WhenAll(tarefas);
        Console.WriteLine($"paralelo: {string.Join(",", resultados)}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

class Recurso : IDisposable
{
    private readonly List<string> log;
    private readonly string nome;

    public Recurso(string nome, List<string> log)
    {
        this.nome = nome;
        this.log = log;
        log.Add($"abriu {nome}");
    }

    public async Task<string> LerAsync()
    {
        await Task.Delay(30);
        log.Add($"leu {nome}");
        return $"conteudo de {nome}";
    }

    public void Dispose()
    {
        log.Add($"fechou {nome}");
    }
}

interface IRepositorio
{
    Task<int> BuscarAsync(int id, CancellationToken ct = default);
    Task SalvarAsync(int id, CancellationToken ct = default);
}

class RepositorioMemoria : IRepositorio
{
    public int Chamadas { get; private set; }

    public async Task<int> BuscarAsync(int id, CancellationToken ct = default)
    {
        Chamadas++;
        await Task.Delay(20, ct);
        return id * 10;
    }

    public async Task SalvarAsync(int id, CancellationToken ct = default)
    {
        Chamadas++;
        await Task.Delay(10, ct);
    }
}

class Servico
{
    private readonly IRepositorio repositorio;
    public int Chamadas { get; private set; }

    public Servico(IRepositorio repositorio)
    {
        this.repositorio = repositorio;
    }

    public async Task<int> ProcessarAsync(int id, CancellationToken ct = default)
    {
        Chamadas++;
        int bruto = await repositorio.BuscarAsync(id, ct);
        return bruto * 2;
    }

    public Task<int> RepassarAsync(int id, CancellationToken ct = default)
    {
        return repositorio.BuscarAsync(id, ct);
    }

    public async Task SemValorAsync(int id, CancellationToken ct = default)
    {
        await repositorio.SalvarAsync(id, ct);
    }
}

class Controlador
{
    private readonly Servico servico;
    public int Chamadas { get; private set; }

    public Controlador(Servico servico)
    {
        this.servico = servico;
    }

    public async Task<int> ExecutarAsync(int id)
    {
        Chamadas++;
        int processado = await servico.ProcessarAsync(id);
        return processado + 1;
    }

    public async Task<string> ComRecursoAsync(string nome, List<string> log)
    {
        using var recurso = new Recurso(nome, log);
        return await recurso.LerAsync();
    }
}

class Program
{
    static async Task Main()
    {
        var repo = new RepositorioMemoria();
        var servico = new Servico(repo);
        var controlador = new Controlador(servico);

        Console.WriteLine($"cadeia: {await controlador.ExecutarAsync(5)}");
        Console.WriteLine($"camadas: repo={repo.Chamadas} servico={servico.Chamadas} controlador={controlador.Chamadas}");

        Console.WriteLine($"repasse: {await servico.RepassarAsync(7)}");
        Console.WriteLine($"repo apos repasse: {repo.Chamadas}");

        await servico.SemValorAsync(1);
        Console.WriteLine($"sem valor concluiu: {repo.Chamadas}");

        var log = new List<string>();
        string conteudo = await controlador.ComRecursoAsync("arquivo", log);

        Console.WriteLine($"conteudo: {conteudo}");
        Console.WriteLine($"log: {string.Join(" > ", log)}");
        Console.WriteLine($"fechou por ultimo: {log[log.Count - 1] == "fechou arquivo"}");

        using var cts = new CancellationTokenSource();
        Console.WriteLine($"com token: {await servico.ProcessarAsync(3, cts.Token)}");
        Console.WriteLine($"sem token: {await servico.ProcessarAsync(3)}");

        var tarefas = new List<Task<int>>
        {
            controlador.ExecutarAsync(1),
            controlador.ExecutarAsync(2),
        };

        int[] resultados = await Task.WhenAll(tarefas);
        Console.WriteLine($"paralelo: {string.Join(",", resultados)}");
    }
}`,
      hints: [
        '`RepassarAsync` não incrementa `Chamadas` do serviço — ele apenas devolve a `Task` do repositório, sem executar nada próprio.',
        'O log do recurso precisa sair como `abriu > leu > fechou`. Se o `await` fosse omitido, sairia `abriu > fechou > leu`.',
        'O token é repassado até `Task.Delay(ms, ct)` — é assim que o cancelamento chega ao ponto que realmente espera.',
        'A cadeia com id 5: repositório devolve 50, serviço dobra para 100, controlador soma 1 e devolve 101.',
      ],
      tests: [
        {
          name: 'Cadeia de camadas',
          expectedStdout:
            'cadeia: 101\ncamadas: repo=1 servico=1 controlador=1\n' +
            'repasse: 70\nrepo apos repasse: 2\n' +
            'sem valor concluiu: 3\n' +
            'conteudo: conteudo de arquivo\nlog: abriu arquivo > leu arquivo > fechou arquivo\n' +
            'fechou por ultimo: True\n' +
            'com token: 60\nsem token: 60\n' +
            'paralelo: 21,41',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's09c01l06',
    title: 'async void e por que evitar',
    objective: 'Entender o único uso legítimo de `async void` e o que dá errado em todos os outros.',
    concept: [
      {
        kind: 'text',
        body:
          'Um método `async` pode devolver `void`. Ele compila, roda, e parece funcionar — até o dia em que uma exceção acontece dentro dele.',
      },
      {
        kind: 'code',
        code: `static async void ProcessarAsync()
{
    await Task.Delay(10);
    throw new InvalidOperationException("erro");
}`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Sem `Task` para carregar a exceção, ela é **relançada na thread do pool** e derruba o processo inteiro. Nenhum `try`/`catch` em volta da chamada consegue capturá-la, porque o método já retornou.',
      },
      {
        kind: 'compare',
        good: `static async Task ProcessarAsync() { ... }

try
{
    await ProcessarAsync();
}
catch (Exception ex)
{
    // capturada normalmente
}`,
        bad: `static async void ProcessarAsync() { ... }

try
{
    ProcessarAsync();
}
catch (Exception ex)
{
    // nunca executa: o metodo ja
    // retornou antes de falhar
}`,
        goodLabel: '`async Task`: exceção capturável',
        badLabel: '`async void`: exceção escapa',
      },
      {
        kind: 'text',
        body: 'São três problemas, e cada um sozinho já bastaria para evitar o padrão:',
      },
      {
        kind: 'table',
        headers: ['Problema', 'Consequência'],
        rows: [
          ['exceção não capturável', 'derruba o processo'],
          ['não pode ser aguardado', 'impossível saber quando terminou'],
          ['não compõe', 'não entra em `WhenAll`, `WhenAny` nem em cadeia'],
        ],
      },
      {
        kind: 'text',
        body:
          'O segundo problema é o mais insidioso: como não há `Task`, quem chama continua imediatamente. O programa pode terminar antes de o método acabar.',
      },
      {
        kind: 'code',
        code: `DispararAsync();          // async void
Console.WriteLine("fim");  // roda antes de DispararAsync terminar`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A regra é simples: **`async void` só para manipuladores de evento**. Eles têm assinatura fixa que devolve `void`, e não há alternativa. Em qualquer outro lugar, use `async Task`.',
      },
      {
        kind: 'code',
        code: `// legitimo: assinatura imposta pelo evento
botao.Click += async (s, e) =>
{
    try
    {
        await SalvarAsync();
    }
    catch (Exception ex)
    {
        MostrarErro(ex);
    }
};`,
        caption: 'Mesmo no caso legítimo, o corpo inteiro precisa de `try`/`catch` — não há quem capture por fora.',
      },
      {
        kind: 'text',
        body:
          'Existe um irmão do `async void` igualmente problemático: chamar um método `async Task` e **descartar a `Task`**. O compilador avisa com CS4014, e o efeito é o mesmo.',
      },
      {
        kind: 'compare',
        good: `await ProcessarAsync();

// ou, se e realmente para esquecer:
_ = ProcessarAsync().ContinueWith(
    t => Registrar(t.Exception),
    TaskContinuationOptions.OnlyOnFaulted);`,
        bad: `ProcessarAsync();
// aviso CS4014, e a excecao
// fica guardada e nunca observada`,
        goodLabel: 'Aguarda, ou trata explicitamente',
        badLabel: 'Descarta e esquece',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Se você precisa mesmo disparar sem esperar, escreva isso de forma visível: um método `DispararEEsquecer(Task)` que registra falhas. O problema não é a intenção — é ela ficar implícita.',
      },
    ],
    quiz: [
      {
        id: 's09c01l06q1',
        type: 'single',
        prompt: 'O que acontece com uma exceção lançada dentro de um método `async void`?',
        options: [
          { id: 'a', text: 'É relançada na thread do pool e costuma derrubar o processo', correct: true },
          { id: 'b', text: 'É capturada pelo `try`/`catch` em volta da chamada' },
          { id: 'c', text: 'É ignorada silenciosamente' },
          { id: 'd', text: 'Fica guardada até alguém aguardar' },
        ],
        explanation:
          'Não há `Task` para carregá-la. A opção D descreve o comportamento de `async Task` com a tarefa descartada — problemático, mas diferente.',
      },
      {
        id: 's09c01l06q2',
        type: 'single',
        prompt: 'Qual o único uso legítimo de `async void`?',
        options: [
          { id: 'a', text: 'Manipuladores de evento, cuja assinatura exige `void`', correct: true },
          { id: 'b', text: 'Métodos que não devolvem valor' },
          { id: 'c', text: 'Métodos de inicialização' },
          { id: 'd', text: 'Métodos chamados apenas uma vez' },
        ],
        explanation:
          'Um método sem valor de retorno deve ser `async Task`, não `async void`. `Task` é o "void aguardável".',
      },
      {
        id: 's09c01l06q3',
        type: 'single',
        prompt: 'O que o aviso CS4014 indica?',
        options: [
          { id: 'a', text: 'Uma chamada assíncrona cujo retorno não foi aguardado', correct: true },
          { id: 'b', text: 'Um método `async` sem `await` dentro' },
          { id: 'c', text: 'Uso de `.Result` numa `Task`' },
          { id: 'd', text: 'Um `async void` numa classe' },
        ],
        explanation:
          'A opção B é o CS1998. O CS4014 aponta a `Task` descartada, cuja exceção nunca será observada.',
      },
    ],
    challenge: {
      brief:
        'Demonstre os três problemas de `async void` sem derrubar o programa: use `async Task` como referência e mostre a diferença em captura de exceção, ordem de conclusão e composição.',
      requirements: [
        'Nenhum `async void` deve lançar exceção — o processo cairia e o teste reprovaria.',
        '`ComTaskAsync` lança e a exceção é capturada normalmente pelo chamador.',
        '`SemEsperar` demonstra que uma `Task` descartada permite ao programa seguir adiante.',
        'Um registro de eventos prova a diferença de ordem entre aguardar e não aguardar.',
        '`DispararEEsquecer` recebe uma `Task` e registra a falha, em vez de deixá-la escapar.',
        '`ComposicaoAsync` mostra que apenas `async Task` entra em `WhenAll`.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class Program
{
    static readonly List<string> eventos = new();
    static readonly object trava = new();

    static void Registrar(string e)
    {
        lock (trava)
        {
            eventos.Add(e);
        }
    }

    static string Linha() => string.Join(" > ", eventos);

    // TODO: registra "inicio <nome>", espera <ms>, registra "fim <nome>"
    static async Task TrabalhoAsync(string nome, int ms)
    {
    }

    // TODO: espera 20 ms e lanca InvalidOperationException("erro no Task")
    static async Task ComTaskAsync()
    {
    }

    // TODO: async void SEM excecao; registra "inicio void" e "fim void"
    static async void SemEsperar()
    {
    }

    // TODO: aguarda a tarefa e registra a falha em 'falhas'; nunca deixa escapar
    static async Task DispararEEsquecer(Task tarefa, List<string> falhas)
    {
    }

    // TODO: tres TrabalhoAsync simultaneos, aguardados com WhenAll
    static async Task ComposicaoAsync()
    {
    }

    static async Task Main()
    {
        Console.WriteLine("== excecao com Task ==");

        try
        {
            await ComTaskAsync();
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"capturada: {ex.Message}");
        }

        Console.WriteLine("== aguardando ==");
        eventos.Clear();
        await TrabalhoAsync("A", 50);
        Registrar("depois de A");
        Console.WriteLine(Linha());

        Console.WriteLine("== sem aguardar ==");
        eventos.Clear();
        SemEsperar();
        Registrar("seguiu adiante");
        await Task.Delay(150);
        Console.WriteLine(Linha());
        Console.WriteLine($"seguiu antes do fim: {eventos.IndexOf("seguiu adiante") < eventos.IndexOf("fim void")}");

        Console.WriteLine("== disparar e esquecer ==");
        var falhas = new List<string>();
        await DispararEEsquecer(ComTaskAsync(), falhas);
        Console.WriteLine($"falhas registradas: {falhas.Count}");
        Console.WriteLine($"mensagem: {falhas.FirstOrDefault()}");

        await DispararEEsquecer(TrabalhoAsync("ok", 10), falhas);
        Console.WriteLine($"falhas apos sucesso: {falhas.Count}");

        Console.WriteLine("== composicao ==");
        eventos.Clear();
        await ComposicaoAsync();
        Console.WriteLine(Linha());
        Console.WriteLine($"tres inicios seguidos: {eventos.Take(3).All(e => e.StartsWith("inicio"))}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class Program
{
    static readonly List<string> eventos = new();
    static readonly object trava = new();

    static void Registrar(string e)
    {
        lock (trava)
        {
            eventos.Add(e);
        }
    }

    static string Linha() => string.Join(" > ", eventos);

    static async Task TrabalhoAsync(string nome, int ms)
    {
        Registrar($"inicio {nome}");
        await Task.Delay(ms);
        Registrar($"fim {nome}");
    }

    static async Task ComTaskAsync()
    {
        await Task.Delay(20);
        throw new InvalidOperationException("erro no Task");
    }

    static async void SemEsperar()
    {
        Registrar("inicio void");
        await Task.Delay(60);
        Registrar("fim void");
    }

    static async Task DispararEEsquecer(Task tarefa, List<string> falhas)
    {
        try
        {
            await tarefa;
        }
        catch (Exception ex)
        {
            falhas.Add(ex.Message);
        }
    }

    static async Task ComposicaoAsync()
    {
        Task a = TrabalhoAsync("X", 90);
        Task b = TrabalhoAsync("Y", 50);
        Task c = TrabalhoAsync("Z", 130);

        await Task.WhenAll(a, b, c);
    }

    static async Task Main()
    {
        Console.WriteLine("== excecao com Task ==");

        try
        {
            await ComTaskAsync();
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"capturada: {ex.Message}");
        }

        Console.WriteLine("== aguardando ==");
        eventos.Clear();
        await TrabalhoAsync("A", 50);
        Registrar("depois de A");
        Console.WriteLine(Linha());

        Console.WriteLine("== sem aguardar ==");
        eventos.Clear();
        SemEsperar();
        Registrar("seguiu adiante");
        await Task.Delay(150);
        Console.WriteLine(Linha());
        Console.WriteLine($"seguiu antes do fim: {eventos.IndexOf("seguiu adiante") < eventos.IndexOf("fim void")}");

        Console.WriteLine("== disparar e esquecer ==");
        var falhas = new List<string>();
        await DispararEEsquecer(ComTaskAsync(), falhas);
        Console.WriteLine($"falhas registradas: {falhas.Count}");
        Console.WriteLine($"mensagem: {falhas.FirstOrDefault()}");

        await DispararEEsquecer(TrabalhoAsync("ok", 10), falhas);
        Console.WriteLine($"falhas apos sucesso: {falhas.Count}");

        Console.WriteLine("== composicao ==");
        eventos.Clear();
        await ComposicaoAsync();
        Console.WriteLine(Linha());
        Console.WriteLine($"tres inicios seguidos: {eventos.Take(3).All(e => e.StartsWith("inicio"))}");
    }
}`,
      hints: [
        'O `async void` da lição **não pode lançar** — se lançasse, o processo cairia e nenhum teste passaria. A demonstração da exceção fica com a versão `async Task`.',
        '`SemEsperar()` retorna assim que encontra o primeiro `await`, então "seguiu adiante" é registrado antes de "fim void".',
        '`DispararEEsquecer` recebe a `Task` já iniciada; o `try`/`catch` em volta do `await` é o que impede a exceção de escapar.',
        'Na composição, os três `TrabalhoAsync` são chamados antes do `WhenAll`, então os três "inicio" saem em sequência.',
      ],
      tests: [
        {
          name: 'Os problemas de async void',
          expectedStdout:
            '== excecao com Task ==\ncapturada: erro no Task\n' +
            '== aguardando ==\ninicio A > fim A > depois de A\n' +
            '== sem aguardar ==\ninicio void > seguiu adiante > fim void\nseguiu antes do fim: True\n' +
            '== disparar e esquecer ==\nfalhas registradas: 1\nmensagem: erro no Task\nfalhas apos sucesso: 1\n' +
            '== composicao ==\ninicio X > inicio Y > inicio Z > fim Y > fim X > fim Z\n' +
            'tres inicios seguidos: True',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's09c01l07',
    title: 'Encadeando operações',
    objective: 'Compor operações assíncronas em sequência, com transformação e tratamento de erro no caminho.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando uma operação depende do resultado da anterior, o encadeamento é natural: cada `await` alimenta o próximo passo.',
      },
      {
        kind: 'code',
        code: `static async Task<string> ProcessarAsync(int id)
{
    Cliente cliente = await BuscarClienteAsync(id);
    Pedido[] pedidos = await BuscarPedidosAsync(cliente.Id);
    decimal total = await CalcularTotalAsync(pedidos);

    return $"{cliente.Nome}: {total:0.00}";
}`,
        caption: 'Cada passo precisa do anterior. A sequência aqui não é desperdício — é a lógica do problema.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare como o código assíncrono lê igual ao síncrono. É a razão de existir do `await`: a estrutura do algoritmo continua visível, mesmo com pausas no meio.',
      },
      {
        kind: 'text',
        body:
          'O erro comum é encadear o que **não** depende. Se dois passos são independentes, iniciá-los juntos e aguardar depois cortá o tempo total pela metade.',
      },
      {
        kind: 'compare',
        good: `Task<Cliente> c = BuscarClienteAsync(id);
Task<Config> cfg = BuscarConfigAsync();

var cliente = await c;
var config = await cfg;`,
        bad: `var cliente = await BuscarClienteAsync(id);
var config = await BuscarConfigAsync();
// config nao depende de cliente,
// e mesmo assim espera por ele`,
        goodLabel: 'Independentes: juntos',
        badLabel: 'Independentes: em fila',
      },
      {
        kind: 'text',
        body:
          'O tratamento de erro funciona como no código síncrono: `try`/`catch` em volta do `await` captura o que aconteceu dentro da operação.',
      },
      {
        kind: 'code',
        code: `try
{
    var cliente = await BuscarClienteAsync(id);
    return await ProcessarAsync(cliente);
}
catch (ClienteNaoEncontradoException)
{
    return "cliente inexistente";
}
finally
{
    await RegistrarAsync("tentativa concluida");
}`,
        caption: '`await` pode aparecer dentro de `try`, `catch` e `finally` — todos os três.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A exceção que sai de um `await` é a **original**, não uma `AggregateException`. Isso vale para uma tarefa; num `WhenAll` com várias falhas, o `await` relança apenas a primeira — as demais ficam na propriedade `Exception` da tarefa.',
      },
      {
        kind: 'text',
        body:
          'Para encadear com transformação sem sair do estilo, um método `async` local mantém a leitura linear. `ContinueWith` existe, mas é da era anterior ao `await` e raramente vale hoje.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Com await',
          code: `int bruto = await BuscarAsync(id);
int dobrado = bruto * 2;
string texto = await FormatarAsync(dobrado);`,
        },
        right: {
          label: 'Com ContinueWith',
          code: `return BuscarAsync(id)
    .ContinueWith(t => t.Result * 2)
    .ContinueWith(t => FormatarAsync(t.Result))
    .Unwrap();`,
        },
        note: 'A da direita é mais difícil de ler, propaga erros de forma diferente e usa `.Result`. Prefira `await`.',
      },
      {
        kind: 'text',
        body:
          'Um padrão útil no encadeamento é a **saída antecipada**: verificar uma condição barata antes de disparar a operação cara.',
      },
      {
        kind: 'code',
        code: `static async Task<string> ObterAsync(int id)
{
    if (id <= 0)
    {
        return "id invalido";
    }

    if (cache.TryGetValue(id, out string pronto))
    {
        return pronto;
    }

    return await BuscarAsync(id);
}`,
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Guardas antes do primeiro `await` executam de forma totalmente síncrona. Num método muito chamado, isso significa que o caminho do cache nem cria a máquina de estados — é o caso em que `ValueTask<T>` ganha.',
      },
    ],
    quiz: [
      {
        id: 's09c01l07q1',
        type: 'single',
        prompt: 'Quando encadear operações com `await` em sequência é a escolha certa?',
        options: [
          { id: 'a', text: 'Quando cada passo precisa do resultado do anterior', correct: true },
          { id: 'b', text: 'Sempre: é a forma mais legível' },
          { id: 'c', text: 'Quando há menos de três operações' },
          { id: 'd', text: 'Quando as operações são rápidas' },
        ],
        explanation:
          'Dependência é o critério. Encadear operações independentes desperdiça exatamente o tempo que o assíncrono existe para economizar.',
      },
      {
        id: 's09c01l07q2',
        type: 'single',
        prompt: 'Que exceção o `await` de uma tarefa que falhou relança?',
        options: [
          { id: 'a', text: 'A exceção original, não uma `AggregateException`', correct: true },
          { id: 'b', text: 'Sempre uma `AggregateException`' },
          { id: 'c', text: 'Uma `TaskCanceledException`' },
          { id: 'd', text: 'Nenhuma: o erro é silencioso' },
        ],
        explanation:
          'Foi uma decisão de projeto do `await`, justamente para que `catch (MinhaExcecao)` funcione como no código síncrono. `.Result` e `.Wait()` é que embrulham em `AggregateException`.',
      },
      {
        id: 's09c01l07q3',
        type: 'single',
        prompt: 'O que acontece com o código antes do primeiro `await` de um método `async`?',
        options: [
          { id: 'a', text: 'Executa de forma síncrona, na thread de quem chamou', correct: true },
          { id: 'b', text: 'É agendado para o pool de threads' },
          { id: 'c', text: 'Executa depois do retorno' },
          { id: 'd', text: 'É ignorado' },
        ],
        explanation:
          'É por isso que guardas e leituras de cache antes do primeiro `await` são baratas: nesse caminho o método nem chega a suspender.',
      },
    ],
    challenge: {
      brief:
        'Monte um fluxo de processamento encadeado: guardas síncronas, cache, passos dependentes em sequência, passos independentes em paralelo, e tratamento de erro com `finally`.',
      requirements: [
        '`ProcessarAsync` valida a entrada antes do primeiro `await` e sai cedo quando possível.',
        'O cache é consultado antes de qualquer operação cara.',
        'Passos dependentes são encadeados; passos independentes são iniciados juntos.',
        'Um `try`/`catch`/`finally` trata a falha e registra a tentativa nos dois casos.',
        'Um contador prova quantas operações caras foram realmente executadas.',
        'A exceção capturada é a original, não uma `AggregateException`.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class ClienteNaoEncontradoException : Exception
{
    public ClienteNaoEncontradoException(int id) : base($"cliente {id} nao encontrado") { }
}

class Fluxo
{
    private readonly Dictionary<int, string> cache = new() { [1] = "cache-1" };
    private readonly List<string> registro = new();

    public int Operacoes { get; private set; }
    public IReadOnlyList<string> Registro => registro;

    // TODO: incrementa Operacoes, espera 30 ms; lanca se id > 100
    public async Task<string> BuscarClienteAsync(int id)
    {
        return "";
    }

    // TODO: incrementa Operacoes, espera 30 ms, devolve id * 3
    public async Task<int> ContarPedidosAsync(int id)
    {
        return 0;
    }

    // TODO: incrementa Operacoes, espera 30 ms, devolve "regiao-<id % 3>"
    public async Task<string> BuscarRegiaoAsync(int id)
    {
        return "";
    }

    // TODO: registra a mensagem; espera 10 ms
    public async Task RegistrarAsync(string mensagem)
    {
    }

    // TODO:
    //  - id <= 0                       -> "id invalido" (sem nenhum await)
    //  - id no cache                   -> valor do cache (sem operacao cara)
    //  - senao: busca o cliente, e entao dispara pedidos e regiao JUNTOS
    //  - resultado: "<cliente>|<pedidos>|<regiao>"
    //  - ClienteNaoEncontradoException -> "erro: <mensagem>"
    //  - sempre registra "tentativa <id>" no finally
    public async Task<string> ProcessarAsync(int id)
    {
        return "";
    }
}

class Program
{
    static async Task Main()
    {
        var fluxo = new Fluxo();

        Console.WriteLine($"invalido: {await fluxo.ProcessarAsync(0)}");
        Console.WriteLine($"operacoes: {fluxo.Operacoes}");

        Console.WriteLine($"cache: {await fluxo.ProcessarAsync(1)}");
        Console.WriteLine($"operacoes apos cache: {fluxo.Operacoes}");

        Console.WriteLine($"completo: {await fluxo.ProcessarAsync(5)}");
        Console.WriteLine($"operacoes apos completo: {fluxo.Operacoes}");

        Console.WriteLine($"outro: {await fluxo.ProcessarAsync(7)}");
        Console.WriteLine($"operacoes apos outro: {fluxo.Operacoes}");

        Console.WriteLine($"erro: {await fluxo.ProcessarAsync(200)}");
        Console.WriteLine($"operacoes apos erro: {fluxo.Operacoes}");

        Console.WriteLine($"registro: {string.Join(" | ", fluxo.Registro)}");
        Console.WriteLine($"registrou todas: {fluxo.Registro.Count == 5}");

        var direto = new Fluxo();

        try
        {
            await direto.BuscarClienteAsync(500);
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (ClienteNaoEncontradoException ex)
        {
            Console.WriteLine($"tipo original: {ex.GetType().Name}");
            Console.WriteLine($"mensagem: {ex.Message}");
        }

        var paralelo = new Fluxo();
        var tarefas = new List<Task<string>>
        {
            paralelo.ProcessarAsync(2),
            paralelo.ProcessarAsync(3),
        };

        string[] resultados = await Task.WhenAll(tarefas);
        Console.WriteLine($"paralelo: {string.Join(" ; ", resultados)}");
        Console.WriteLine($"operacoes paralelo: {paralelo.Operacoes}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class ClienteNaoEncontradoException : Exception
{
    public ClienteNaoEncontradoException(int id) : base($"cliente {id} nao encontrado") { }
}

class Fluxo
{
    private readonly Dictionary<int, string> cache = new() { [1] = "cache-1" };
    private readonly List<string> registro = new();

    public int Operacoes { get; private set; }
    public IReadOnlyList<string> Registro => registro;

    public async Task<string> BuscarClienteAsync(int id)
    {
        Operacoes++;
        await Task.Delay(30);

        if (id > 100)
        {
            throw new ClienteNaoEncontradoException(id);
        }

        return $"cliente-{id}";
    }

    public async Task<int> ContarPedidosAsync(int id)
    {
        Operacoes++;
        await Task.Delay(30);
        return id * 3;
    }

    public async Task<string> BuscarRegiaoAsync(int id)
    {
        Operacoes++;
        await Task.Delay(30);
        return $"regiao-{id % 3}";
    }

    public async Task RegistrarAsync(string mensagem)
    {
        registro.Add(mensagem);
        await Task.Delay(10);
    }

    public async Task<string> ProcessarAsync(int id)
    {
        if (id <= 0)
        {
            return "id invalido";
        }

        if (cache.TryGetValue(id, out string pronto))
        {
            return pronto;
        }

        try
        {
            string cliente = await BuscarClienteAsync(id);

            Task<int> pedidos = ContarPedidosAsync(id);
            Task<string> regiao = BuscarRegiaoAsync(id);

            int total = await pedidos;
            string onde = await regiao;

            return $"{cliente}|{total}|{onde}";
        }
        catch (ClienteNaoEncontradoException ex)
        {
            return $"erro: {ex.Message}";
        }
        finally
        {
            await RegistrarAsync($"tentativa {id}");
        }
    }
}

class Program
{
    static async Task Main()
    {
        var fluxo = new Fluxo();

        Console.WriteLine($"invalido: {await fluxo.ProcessarAsync(0)}");
        Console.WriteLine($"operacoes: {fluxo.Operacoes}");

        Console.WriteLine($"cache: {await fluxo.ProcessarAsync(1)}");
        Console.WriteLine($"operacoes apos cache: {fluxo.Operacoes}");

        Console.WriteLine($"completo: {await fluxo.ProcessarAsync(5)}");
        Console.WriteLine($"operacoes apos completo: {fluxo.Operacoes}");

        Console.WriteLine($"outro: {await fluxo.ProcessarAsync(7)}");
        Console.WriteLine($"operacoes apos outro: {fluxo.Operacoes}");

        Console.WriteLine($"erro: {await fluxo.ProcessarAsync(200)}");
        Console.WriteLine($"operacoes apos erro: {fluxo.Operacoes}");

        Console.WriteLine($"registro: {string.Join(" | ", fluxo.Registro)}");
        Console.WriteLine($"registrou todas: {fluxo.Registro.Count == 5}");

        var direto = new Fluxo();

        try
        {
            await direto.BuscarClienteAsync(500);
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (ClienteNaoEncontradoException ex)
        {
            Console.WriteLine($"tipo original: {ex.GetType().Name}");
            Console.WriteLine($"mensagem: {ex.Message}");
        }

        var paralelo = new Fluxo();
        var tarefas = new List<Task<string>>
        {
            paralelo.ProcessarAsync(2),
            paralelo.ProcessarAsync(3),
        };

        string[] resultados = await Task.WhenAll(tarefas);
        Console.WriteLine($"paralelo: {string.Join(" ; ", resultados)}");
        Console.WriteLine($"operacoes paralelo: {paralelo.Operacoes}");
      }
}`,
      hints: [
        'As duas guardas ficam **antes** do `try`, e antes de qualquer `await` — assim o caminho do cache não paga nada.',
        '`ContarPedidosAsync` e `BuscarRegiaoAsync` não dependem uma da outra: as duas chamadas vêm juntas, e os dois `await` depois.',
        'O `finally` com `await` executa nos dois caminhos — sucesso e erro —, por isso o registro tem 5 entradas ao final.',
        'O caso do id 0 e do cache saem antes do `try`, então nem chegam ao `finally`. Confira quantas tentativas o registro deve ter.',
      ],
      tests: [
        {
          name: 'Fluxo encadeado',
          expectedStdout:
            'invalido: id invalido\noperacoes: 0\n' +
            'cache: cache-1\noperacoes apos cache: 0\n' +
            'completo: cliente-5|15|regiao-2\noperacoes apos completo: 3\n' +
            'outro: cliente-7|21|regiao-1\noperacoes apos outro: 6\n' +
            'erro: erro: cliente 200 nao encontrado\noperacoes apos erro: 7\n' +
            'registro: tentativa 5 | tentativa 7 | tentativa 200\nregistrou todas: False\n' +
            'tipo original: ClienteNaoEncontradoException\nmensagem: cliente 500 nao encontrado\n' +
            'paralelo: cliente-2|6|regiao-2 ; cliente-3|9|regiao-0\noperacoes paralelo: 6',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's09c01l08',
    title: 'Task.WhenAll',
    objective: 'Aguardar várias operações simultâneas e lidar corretamente com falhas parciais.',
    concept: [
      {
        kind: 'text',
        body:
          '`Task.WhenAll` recebe várias tarefas e devolve uma tarefa que termina quando **todas** terminam. É a ferramenta central para trabalho independente e simultâneo.',
      },
      {
        kind: 'code',
        code: `List<Task<int>> tarefas = ids.Select(id => BuscarAsync(id)).ToList();

int[] resultados = await Task.WhenAll(tarefas);`,
        caption: 'Com `Task<T>`, devolve `T[]` na ordem das tarefas. Com `Task`, devolve apenas `Task`.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O `ToList()` antes do `WhenAll` não é opcional. Sem ele, o `Select` preguiçoso criaria as tarefas **durante** a enumeração feita pelo `WhenAll` — e em alguns cenários elas nem seriam todas iniciadas ao mesmo tempo.',
      },
      {
        kind: 'text',
        body:
          'A parte que exige atenção é o comportamento com falhas. Se uma tarefa falha, `WhenAll` **não** cancela as demais: ele espera todas terminarem, e só então propaga o erro.',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Comportamento'],
        rows: [
          ['todas com sucesso', 'devolve os resultados na ordem'],
          ['uma falha', 'espera as outras, depois relança a exceção dela'],
          ['várias falham', '`await` relança **a primeira**; as demais ficam em `.Exception`'],
          ['uma é cancelada', 'a tarefa combinada fica cancelada'],
        ],
      },
      {
        kind: 'code',
        code: `Task todas = Task.WhenAll(tarefas);

try
{
    await todas;
}
catch (Exception)
{
    // todas as excecoes estao aqui
    foreach (var e in todas.Exception.InnerExceptions)
    {
        Console.WriteLine(e.Message);
    }
}`,
        caption: 'Guardar a tarefa combinada numa variável é o que dá acesso a **todas** as falhas.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O `await` relançar só a primeira exceção é uma escolha de conveniência: na maioria dos casos você quer um `catch` normal. Quando precisa de todas, a propriedade `Exception` da tarefa combinada tem a lista completa.',
      },
      {
        kind: 'text',
        body:
          'Quando falhas parciais são esperadas — e não excepcionais —, a alternativa é fazer cada tarefa **capturar seu próprio erro** e devolver um resultado que representa sucesso ou falha.',
      },
      {
        kind: 'compare',
        good: `static async Task<Resultado> TentarAsync(int id)
{
    try
    {
        return Resultado.Ok(await BuscarAsync(id));
    }
    catch (Exception ex)
    {
        return Resultado.Falha(ex.Message);
    }
}

var todos = await Task.WhenAll(ids.Select(TentarAsync));`,
        bad: `try
{
    var todos = await Task.WhenAll(
        ids.Select(BuscarAsync));
}
catch
{
    // perdeu os resultados que
    // deram certo
}`,
        goodLabel: 'Cada tarefa trata o próprio erro',
        badLabel: 'Um erro derruba tudo',
      },
      {
        kind: 'text',
        body:
          'Vale lembrar do custo: `WhenAll` inicia **todas** as tarefas de uma vez. Com dez mil chamadas de rede simultâneas, você derruba o servidor do outro lado antes de terminar.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Para limitar quantas rodam ao mesmo tempo, existem `SemaphoreSlim` e `Parallel.ForEachAsync` — os dois aparecem nos próximos capítulos. `WhenAll` sozinho não tem freio.',
      },
    ],
    quiz: [
      {
        id: 's09c01l08q1',
        type: 'single',
        prompt: 'O que `Task.WhenAll` faz quando uma das tarefas falha?',
        options: [
          { id: 'a', text: 'Espera todas terminarem e depois propaga a exceção', correct: true },
          { id: 'b', text: 'Cancela as demais imediatamente' },
          { id: 'c', text: 'Ignora a falha e devolve os outros resultados' },
          { id: 'd', text: 'Lança imediatamente, sem esperar' },
        ],
        explanation:
          'As demais continuam até o fim. Se você precisa interromper as outras ao primeiro erro, é preciso um `CancellationToken` compartilhado.',
      },
      {
        id: 's09c01l08q2',
        type: 'single',
        prompt: 'Como acessar **todas** as exceções quando várias tarefas falham?',
        options: [
          { id: 'a', text: 'Guardando a tarefa combinada e lendo `.Exception.InnerExceptions`', correct: true },
          { id: 'b', text: 'O `await` já relança uma `AggregateException` com todas' },
          { id: 'c', text: 'Não é possível: apenas a primeira fica disponível' },
          { id: 'd', text: 'Chamando `WhenAll` duas vezes' },
        ],
        explanation:
          'O `await` relança apenas a primeira, por conveniência. A `AggregateException` completa fica na propriedade `Exception` da tarefa combinada.',
      },
      {
        id: 's09c01l08q3',
        type: 'single',
        prompt: 'Qual o risco de `WhenAll` sobre dez mil tarefas de rede?',
        options: [
          { id: 'a', text: 'Todas iniciam de uma vez, sem limite de simultaneidade', correct: true },
          { id: 'b', text: 'O array de resultados não cabe na memória' },
          { id: 'c', text: 'A ordem dos resultados deixa de ser garantida' },
          { id: 'd', text: 'Nenhum: `WhenAll` limita automaticamente' },
        ],
        explanation:
          '`WhenAll` apenas aguarda; quem inicia é você, ao criar as tarefas. Limitar exige `SemaphoreSlim` ou `Parallel.ForEachAsync`.',
      },
    ],
    challenge: {
      brief:
        'Implemente um buscador em lote que lida com falhas parciais de duas formas: a ingênua, que perde tudo com um erro, e a robusta, que devolve sucessos e falhas separados.',
      requirements: [
        '`BuscarAsync` falha para ids negativos e demora proporcionalmente ao id.',
        '`BuscarTudoAsync` usa `WhenAll` direto e propaga a primeira exceção.',
        'Guarde a tarefa combinada para acessar **todas** as exceções via `.Exception.InnerExceptions`.',
        '`TentarAsync` captura o próprio erro e devolve um `Resultado`.',
        '`BuscarComTolerânciaAsync` usa `TentarAsync` e nunca lança.',
        'Prove que as tarefas bem-sucedidas terminam mesmo quando outra falha.',
        'A ordem dos resultados segue a ordem das tarefas nos dois casos.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

record Resultado(int Id, string Valor, string Erro)
{
    public bool Ok => Erro == null;
    public override string ToString() => Ok ? $"{Id}={Valor}" : $"{Id}!{Erro}";
}

class Buscador
{
    private readonly List<int> concluidos = new();
    private readonly object trava = new();

    public IReadOnlyList<int> Concluidos => concluidos;

    // TODO: espera |id| * 10 ms; lanca ArgumentException("id negativo: <id>") se id < 0;
    //       senao registra o id em 'concluidos' sob lock e devolve "v<id>"
    public async Task<string> BuscarAsync(int id)
    {
        return "";
    }

    // TODO: WhenAll direto — propaga a excecao
    public async Task<string[]> BuscarTudoAsync(IEnumerable<int> ids)
    {
        return new string[0];
    }

    // TODO: captura o proprio erro e devolve Resultado
    public async Task<Resultado> TentarAsync(int id)
    {
        return null;
    }

    // TODO: usa TentarAsync; nunca lanca
    public async Task<Resultado[]> BuscarComToleranciaAsync(IEnumerable<int> ids)
    {
        return new Resultado[0];
    }

    // TODO: devolve as mensagens de TODAS as falhas, em ordem
    public async Task<List<string>> TodasAsFalhasAsync(IEnumerable<int> ids)
    {
        return new List<string>();
    }
}

class Program
{
    static async Task Main()
    {
        var b = new Buscador();

        string[] ok = await b.BuscarTudoAsync(new[] { 1, 2, 3 });
        Console.WriteLine($"sucesso: {string.Join(",", ok)}");
        Console.WriteLine($"concluidos: {b.Concluidos.Count}");

        var comFalha = new Buscador();

        try
        {
            await comFalha.BuscarTudoAsync(new[] { 1, -2, 3 });
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"primeira excecao: {ex.Message}");
        }

        Console.WriteLine($"boas concluiram mesmo assim: {comFalha.Concluidos.Count}");

        var varias = new Buscador();
        List<string> falhas = await varias.TodasAsFalhasAsync(new[] { 1, -2, -3, 4 });
        Console.WriteLine($"todas as falhas: {falhas.Count}");
        Console.WriteLine($"mensagens: {string.Join(" | ", falhas)}");

        var tolerante = new Buscador();
        Resultado[] resultados = await tolerante.BuscarComToleranciaAsync(new[] { 1, -2, 3, -4 });

        Console.WriteLine($"resultados: {string.Join(" ; ", resultados.Select(r => r.ToString()))}");
        Console.WriteLine($"ok: {resultados.Count(r => r.Ok)} falhas: {resultados.Count(r => !r.Ok)}");
        Console.WriteLine($"ordem preservada: {resultados.Select(r => r.Id).SequenceEqual(new[] { 1, -2, 3, -4 })}");
        Console.WriteLine($"valores ok: {string.Join(",", resultados.Where(r => r.Ok).Select(r => r.Valor))}");

        var vazio = new Buscador();
        Console.WriteLine($"vazio: {(await vazio.BuscarComToleranciaAsync(new int[0])).Length}");
        Console.WriteLine($"vazio tudo: {(await vazio.BuscarTudoAsync(new int[0])).Length}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

record Resultado(int Id, string Valor, string Erro)
{
    public bool Ok => Erro == null;
    public override string ToString() => Ok ? $"{Id}={Valor}" : $"{Id}!{Erro}";
}

class Buscador
{
    private readonly List<int> concluidos = new();
    private readonly object trava = new();

    public IReadOnlyList<int> Concluidos => concluidos;

    public async Task<string> BuscarAsync(int id)
    {
        await Task.Delay(Math.Abs(id) * 10);

        if (id < 0)
        {
            throw new ArgumentException($"id negativo: {id}");
        }

        lock (trava)
        {
            concluidos.Add(id);
        }

        return $"v{id}";
    }

    public async Task<string[]> BuscarTudoAsync(IEnumerable<int> ids)
    {
        List<Task<string>> tarefas = ids.Select(BuscarAsync).ToList();
        return await Task.WhenAll(tarefas);
    }

    public async Task<Resultado> TentarAsync(int id)
    {
        try
        {
            string valor = await BuscarAsync(id);
            return new Resultado(id, valor, null);
        }
        catch (Exception ex)
        {
            return new Resultado(id, null, ex.Message);
        }
    }

    public async Task<Resultado[]> BuscarComToleranciaAsync(IEnumerable<int> ids)
    {
        List<Task<Resultado>> tarefas = ids.Select(TentarAsync).ToList();
        return await Task.WhenAll(tarefas);
    }

    public async Task<List<string>> TodasAsFalhasAsync(IEnumerable<int> ids)
    {
        List<Task<string>> tarefas = ids.Select(BuscarAsync).ToList();
        Task combinada = Task.WhenAll(tarefas);

        try
        {
            await combinada;
        }
        catch (Exception)
        {
            return combinada.Exception.InnerExceptions.Select(e => e.Message).ToList();
        }

        return new List<string>();
    }
}

class Program
{
    static async Task Main()
    {
        var b = new Buscador();

        string[] ok = await b.BuscarTudoAsync(new[] { 1, 2, 3 });
        Console.WriteLine($"sucesso: {string.Join(",", ok)}");
        Console.WriteLine($"concluidos: {b.Concluidos.Count}");

        var comFalha = new Buscador();

        try
        {
            await comFalha.BuscarTudoAsync(new[] { 1, -2, 3 });
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"primeira excecao: {ex.Message}");
        }

        Console.WriteLine($"boas concluiram mesmo assim: {comFalha.Concluidos.Count}");

        var varias = new Buscador();
        List<string> falhas = await varias.TodasAsFalhasAsync(new[] { 1, -2, -3, 4 });
        Console.WriteLine($"todas as falhas: {falhas.Count}");
        Console.WriteLine($"mensagens: {string.Join(" | ", falhas)}");

        var tolerante = new Buscador();
        Resultado[] resultados = await tolerante.BuscarComToleranciaAsync(new[] { 1, -2, 3, -4 });

        Console.WriteLine($"resultados: {string.Join(" ; ", resultados.Select(r => r.ToString()))}");
        Console.WriteLine($"ok: {resultados.Count(r => r.Ok)} falhas: {resultados.Count(r => !r.Ok)}");
        Console.WriteLine($"ordem preservada: {resultados.Select(r => r.Id).SequenceEqual(new[] { 1, -2, 3, -4 })}");
        Console.WriteLine($"valores ok: {string.Join(",", resultados.Where(r => r.Ok).Select(r => r.Valor))}");

        var vazio = new Buscador();
        Console.WriteLine($"vazio: {(await vazio.BuscarComToleranciaAsync(new int[0])).Length}");
        Console.WriteLine($"vazio tudo: {(await vazio.BuscarTudoAsync(new int[0])).Length}");
    }
}`,
      hints: [
        '`ids.Select(BuscarAsync)` passa o método como grupo — equivale a `ids.Select(id => BuscarAsync(id))`.',
        'Guardar `Task.WhenAll(...)` numa variável antes do `await` é o que dá acesso a `.Exception.InnerExceptions` depois.',
        'Os ids 1 e 3 concluem mesmo quando o -2 falha: `WhenAll` espera todas antes de propagar o erro.',
        'A ordem das falhas em `InnerExceptions` segue a ordem das tarefas, não a de ocorrência.',
      ],
      tests: [
        {
          name: 'Falhas parciais',
          expectedStdout:
            'sucesso: v1,v2,v3\nconcluidos: 3\n' +
            'primeira excecao: id negativo: -2\nboas concluiram mesmo assim: 2\n' +
            'todas as falhas: 2\nmensagens: id negativo: -2 | id negativo: -3\n' +
            'resultados: 1=v1 ; -2!id negativo: -2 ; 3=v3 ; -4!id negativo: -4\n' +
            'ok: 2 falhas: 2\nordem preservada: True\nvalores ok: v1,v3\n' +
            'vazio: 0\nvazio tudo: 0',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's09c01l09',
    title: 'Prática: Task.WhenAny e corrida',
    objective: 'Reagir à primeira tarefa que terminar, e conhecer as armadilhas do padrão.',
    concept: [
      {
        kind: 'text',
        body:
          '`Task.WhenAny` devolve a **primeira** tarefa a terminar. Diferente de `WhenAll`, ele devolve a tarefa em si — não o resultado —, então é preciso um `await` a mais.',
      },
      {
        kind: 'code',
        code: `Task<int> rapida = BuscarAsync(9, 10);
Task<int> lenta = BuscarAsync(8, 500);

Task<int> primeira = await Task.WhenAny(rapida, lenta);
int valor = await primeira;`,
        caption: 'O primeiro `await` espera alguma terminar; o segundo extrai o resultado dela.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O segundo `await` é imediato — a tarefa já terminou. Ele existe por dois motivos: extrair o valor e **relançar a exceção**, caso a primeira a terminar tenha sido a que falhou.',
      },
      {
        kind: 'text',
        body: 'São três os usos legítimos, e todos têm a mesma forma:',
      },
      {
        kind: 'table',
        headers: ['Uso', 'Como'],
        rows: [
          ['timeout', 'corre a operação contra um `Task.Delay`'],
          ['redundância', 'consulta duas fontes e usa a que responder primeiro'],
          ['processar por ordem de chegada', 'remove a vencedora e repete'],
        ],
      },
      {
        kind: 'code',
        code: `Task<int> operacao = BuscarAsync(1, 300);
Task limite = Task.Delay(100);

if (await Task.WhenAny(operacao, limite) == limite)
{
    Console.WriteLine("tempo esgotado");
}
else
{
    Console.WriteLine(await operacao);
}`,
        caption: 'Comparar a tarefa devolvida com a do timeout é como se descobre quem venceu.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'As tarefas perdedoras **continuam rodando**. `WhenAny` não cancela nada: ele apenas para de esperar. Se a operação lenta tem efeito colateral, ela vai acontecer de qualquer forma — para interrompê-la de verdade, é preciso um `CancellationToken`.',
      },
      {
        kind: 'text',
        body:
          'A segunda armadilha é o erro engolido. Se uma tarefa perdedora falhar depois, ninguém observa a exceção — o mesmo problema da `Task` descartada.',
      },
      {
        kind: 'compare',
        good: `var vencedora = await Task.WhenAny(a, b);
var perdedora = vencedora == a ? b : a;

_ = perdedora.ContinueWith(
    t => Registrar(t.Exception),
    TaskContinuationOptions.OnlyOnFaulted);`,
        bad: `var vencedora = await Task.WhenAny(a, b);
return await vencedora;
// se 'b' falhar depois, ninguem ve`,
        goodLabel: 'Observa a perdedora',
        badLabel: 'Abandona a perdedora',
      },
      {
        kind: 'text',
        body:
          'Para processar resultados **na ordem em que chegam**, o padrão é um laço que remove a vencedora da lista a cada volta.',
      },
      {
        kind: 'code',
        code: `var pendentes = new List<Task<int>>(tarefas);

while (pendentes.Count > 0)
{
    Task<int> pronta = await Task.WhenAny(pendentes);
    pendentes.Remove(pronta);

    Console.WriteLine(await pronta);
}`,
        caption: 'Cada volta processa a próxima a terminar — útil quando o resultado pode ser usado assim que chega.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Esse laço é O(n²) no número de tarefas, porque cada `WhenAny` registra uma continuação em todas as pendentes. Para muitas tarefas, `Parallel.ForEachAsync` ou `Channel` são melhores — os dois aparecem nos próximos capítulos.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Em testes, uma corrida só é determinística com **margem generosa**. Duas tarefas de 10 ms e 500 ms sempre resolvem na mesma ordem; duas de 10 ms e 15 ms, não.',
      },
    ],
    quiz: [
      {
        id: 's09c01l09q1',
        type: 'single',
        prompt: 'Por que `Task.WhenAny` exige dois `await`?',
        options: [
          { id: 'a', text: 'O primeiro devolve a tarefa vencedora; o segundo extrai o resultado e relança erro', correct: true },
          { id: 'b', text: 'Porque `WhenAny` devolve duas tarefas' },
          { id: 'c', text: 'Por causa da conversão de tipos' },
          { id: 'd', text: 'Não exige: um `await` basta' },
        ],
        explanation:
          'O segundo `await` é imediato, já que a tarefa terminou. Ele existe para desembrulhar o valor — e para propagar a exceção se a vencedora foi a que falhou.',
      },
      {
        id: 's09c01l09q2',
        type: 'single',
        prompt: 'O que acontece com as tarefas perdedoras de um `WhenAny`?',
        options: [
          { id: 'a', text: 'Continuam rodando; `WhenAny` apenas para de esperar por elas', correct: true },
          { id: 'b', text: 'São canceladas automaticamente' },
          { id: 'c', text: 'São descartadas antes de terminar' },
          { id: 'd', text: 'Lançam `TaskCanceledException`' },
        ],
        explanation:
          'Nada as interrompe. Se elas têm efeito colateral — gravar em banco, enviar e-mail — isso acontece mesmo depois de a corrida ter sido decidida.',
      },
      {
        id: 's09c01l09q3',
        type: 'single',
        prompt: 'Por que o laço que processa por ordem de chegada é O(n²)?',
        options: [
          { id: 'a', text: 'Cada `WhenAny` registra uma continuação em todas as tarefas pendentes', correct: true },
          { id: 'b', text: 'Porque `Remove` numa lista é O(n)' },
          { id: 'c', text: 'Porque as tarefas são reiniciadas a cada volta' },
          { id: 'd', text: 'Não é: o laço é O(n)' },
        ],
        explanation:
          'O custo do `Remove` também conta, mas o dominante é o registro de continuações. Para dezenas de tarefas é irrelevante; para milhares, não.',
      },
    ],
    challenge: {
      brief:
        'Implemente três padrões com `WhenAny`: timeout, fonte redundante e processamento por ordem de chegada — cuidando de observar as tarefas perdedoras.',
      requirements: [
        'As durações precisam ter margem de pelo menos 100 ms entre si, para a corrida ser determinística.',
        '`ComTimeoutAsync` corre a operação contra um `Task.Delay` e devolve `"tempo esgotado"` quando perde.',
        '`RedundanteAsync` consulta duas fontes e usa a que responder primeiro.',
        '`PorOrdemDeChegadaAsync` devolve os resultados na ordem real de conclusão.',
        '`ObservarPerdedora` registra a falha de uma tarefa perdedora, em vez de deixá-la escapar.',
        'Prove que a tarefa lenta continua rodando depois de a corrida terminar.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class Corrida
{
    private readonly List<string> concluidas = new();
    private readonly List<string> falhasObservadas = new();
    private readonly object trava = new();

    public IReadOnlyList<string> Concluidas => concluidas;
    public IReadOnlyList<string> FalhasObservadas => falhasObservadas;

    // TODO: espera <ms>, registra "<nome>" em 'concluidas' sob lock, devolve "<nome>:<valor>"
    public async Task<string> FonteAsync(string nome, int ms, int valor)
    {
        return "";
    }

    // TODO: espera <ms> e lanca InvalidOperationException("<nome> falhou")
    public async Task<string> FonteQueFalhaAsync(string nome, int ms)
    {
        return "";
    }

    // TODO: corre a operacao contra Task.Delay(limiteMs);
    //       devolve "tempo esgotado" quando o delay vence
    public async Task<string> ComTimeoutAsync(Task<string> operacao, int limiteMs)
    {
        return "";
    }

    // TODO: WhenAny entre as duas; devolve o resultado da vencedora
    //       e observa a perdedora com ObservarPerdedora
    public async Task<string> RedundanteAsync(Task<string> a, Task<string> b)
    {
        return "";
    }

    // TODO: registra a falha da perdedora em 'falhasObservadas', sem deixar escapar
    public void ObservarPerdedora(Task tarefa)
    {
    }

    // TODO: laco com WhenAny + Remove; devolve na ordem de conclusao
    public async Task<List<string>> PorOrdemDeChegadaAsync(IEnumerable<Task<string>> tarefas)
    {
        return new List<string>();
    }
}

class Program
{
    static async Task Main()
    {
        var c = new Corrida();

        Console.WriteLine($"dentro do prazo: {await c.ComTimeoutAsync(c.FonteAsync("rapida", 30, 1), 300)}");
        Console.WriteLine($"estourou: {await c.ComTimeoutAsync(c.FonteAsync("lenta", 400, 2), 100)}");

        var r = new Corrida();
        var primaria = r.FonteAsync("primaria", 300, 1);
        var espelho = r.FonteAsync("espelho", 30, 2);

        Console.WriteLine($"redundante: {await r.RedundanteAsync(primaria, espelho)}");
        Console.WriteLine($"lenta ainda rodando: {!primaria.IsCompleted}");

        await Task.Delay(400);
        Console.WriteLine($"lenta terminou depois: {primaria.IsCompleted}");
        Console.WriteLine($"concluidas: {string.Join(",", r.Concluidas)}");

        var f = new Corrida();
        var boa = f.FonteAsync("boa", 30, 1);
        var ruim = f.FonteQueFalhaAsync("ruim", 200);

        Console.WriteLine($"vencedora boa: {await f.RedundanteAsync(boa, ruim)}");
        await Task.Delay(300);
        Console.WriteLine($"falha observada: {string.Join(",", f.FalhasObservadas)}");

        var o = new Corrida();
        var tarefas = new List<Task<string>>
        {
            o.FonteAsync("A", 300, 1),
            o.FonteAsync("B", 100, 2),
            o.FonteAsync("C", 500, 3),
            o.FonteAsync("D", 200, 4),
        };

        List<string> ordem = await o.PorOrdemDeChegadaAsync(tarefas);
        Console.WriteLine($"por chegada: {string.Join(" > ", ordem)}");
        Console.WriteLine($"todas: {ordem.Count}");

        var vazio = new Corrida();
        Console.WriteLine($"vazio: {(await vazio.PorOrdemDeChegadaAsync(new List<Task<string>>())).Count}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class Corrida
{
    private readonly List<string> concluidas = new();
    private readonly List<string> falhasObservadas = new();
    private readonly object trava = new();

    public IReadOnlyList<string> Concluidas => concluidas;
    public IReadOnlyList<string> FalhasObservadas => falhasObservadas;

    public async Task<string> FonteAsync(string nome, int ms, int valor)
    {
        await Task.Delay(ms);

        lock (trava)
        {
            concluidas.Add(nome);
        }

        return $"{nome}:{valor}";
    }

    public async Task<string> FonteQueFalhaAsync(string nome, int ms)
    {
        await Task.Delay(ms);
        throw new InvalidOperationException($"{nome} falhou");
    }

    public async Task<string> ComTimeoutAsync(Task<string> operacao, int limiteMs)
    {
        Task limite = Task.Delay(limiteMs);
        Task vencedora = await Task.WhenAny(operacao, limite);

        if (vencedora == limite)
        {
            ObservarPerdedora(operacao);
            return "tempo esgotado";
        }

        return await operacao;
    }

    public async Task<string> RedundanteAsync(Task<string> a, Task<string> b)
    {
        Task<string> vencedora = await Task.WhenAny(a, b);
        Task<string> perdedora = vencedora == a ? b : a;

        ObservarPerdedora(perdedora);
        return await vencedora;
    }

    public void ObservarPerdedora(Task tarefa)
    {
        _ = tarefa.ContinueWith(
            t =>
            {
                lock (trava)
                {
                    falhasObservadas.Add(t.Exception.InnerException.Message);
                }
            },
            TaskContinuationOptions.OnlyOnFaulted);
    }

    public async Task<List<string>> PorOrdemDeChegadaAsync(IEnumerable<Task<string>> tarefas)
    {
        var pendentes = new List<Task<string>>(tarefas);
        var ordem = new List<string>();

        while (pendentes.Count > 0)
        {
            Task<string> pronta = await Task.WhenAny(pendentes);
            pendentes.Remove(pronta);
            ordem.Add(await pronta);
        }

        return ordem;
    }
}

class Program
{
    static async Task Main()
    {
        var c = new Corrida();

        Console.WriteLine($"dentro do prazo: {await c.ComTimeoutAsync(c.FonteAsync("rapida", 30, 1), 300)}");
        Console.WriteLine($"estourou: {await c.ComTimeoutAsync(c.FonteAsync("lenta", 400, 2), 100)}");

        var r = new Corrida();
        var primaria = r.FonteAsync("primaria", 300, 1);
        var espelho = r.FonteAsync("espelho", 30, 2);

        Console.WriteLine($"redundante: {await r.RedundanteAsync(primaria, espelho)}");
        Console.WriteLine($"lenta ainda rodando: {!primaria.IsCompleted}");

        await Task.Delay(400);
        Console.WriteLine($"lenta terminou depois: {primaria.IsCompleted}");
        Console.WriteLine($"concluidas: {string.Join(",", r.Concluidas)}");

        var f = new Corrida();
        var boa = f.FonteAsync("boa", 30, 1);
        var ruim = f.FonteQueFalhaAsync("ruim", 200);

        Console.WriteLine($"vencedora boa: {await f.RedundanteAsync(boa, ruim)}");
        await Task.Delay(300);
        Console.WriteLine($"falha observada: {string.Join(",", f.FalhasObservadas)}");

        var o = new Corrida();
        var tarefas = new List<Task<string>>
        {
            o.FonteAsync("A", 300, 1),
            o.FonteAsync("B", 100, 2),
            o.FonteAsync("C", 500, 3),
            o.FonteAsync("D", 200, 4),
        };

        List<string> ordem = await o.PorOrdemDeChegadaAsync(tarefas);
        Console.WriteLine($"por chegada: {string.Join(" > ", ordem)}");
        Console.WriteLine($"todas: {ordem.Count}");

        var vazio = new Corrida();
        Console.WriteLine($"vazio: {(await vazio.PorOrdemDeChegadaAsync(new List<Task<string>>())).Count}");
      }
}`,
      hints: [
        'Comparar a tarefa devolvida com a do `Task.Delay` — `vencedora == limite` — é como se identifica quem ganhou a corrida.',
        '`ContinueWith` com `TaskContinuationOptions.OnlyOnFaulted` só executa quando a tarefa falha; o `_ =` deixa explícito que a continuação não é aguardada.',
        'As durações do laço por ordem de chegada são 300, 100, 500 e 200 — margem de 100 ms entre cada, suficiente para a ordem ser estável.',
        'O `await Task.Delay(400)` depois da corrida existe para dar tempo de a tarefa lenta terminar, provando que ela não foi cancelada.',
      ],
      tests: [
        {
          name: 'Corridas com WhenAny',
          expectedStdout:
            'dentro do prazo: rapida:1\nestourou: tempo esgotado\n' +
            'redundante: espelho:2\nlenta ainda rodando: True\n' +
            'lenta terminou depois: True\nconcluidas: espelho,primaria\n' +
            'vencedora boa: boa:1\nfalha observada: ruim falhou\n' +
            'por chegada: B:2 > D:4 > A:1 > C:3\ntodas: 4\n' +
            'vazio: 0',
        },
      ],
      timeoutMs: 15000,
    },
  },

  {
    id: 's09c01l10',
    title: 'Checkpoint: async',
    objective: 'Reunir as decisões do capítulo e reconhecer os erros que elas evitam.',
    concept: [
      {
        kind: 'text',
        body:
          'Este capítulo foi sobre uma pergunta que aparece em todo método assíncrono: **esperar agora, esperar depois, ou não esperar?**',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Forma'],
        rows: [
          ['o próximo passo depende deste', '`await` em sequência'],
          ['passos independentes', 'iniciar todos, depois `Task.WhenAll`'],
          ['basta a primeira resposta', '`Task.WhenAny`'],
          ['o resultado já existe', '`Task.FromResult`, sem `async`'],
          ['só repassa outra tarefa', 'devolver a `Task`, sem `async`'],
          ['há `using` ou `finally` em volta', '`await` obrigatório'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma observação que resume o capítulo: **chamar já inicia; `await` só escolhe quando esperar**. Quase todo erro de assincronia vem de confundir essas duas coisas.',
      },
      {
        kind: 'text',
        body: 'Os cinco erros do capítulo, na ordem em que costumam aparecer:',
      },
      {
        kind: 'table',
        headers: ['Erro', 'Sintoma', 'Correção'],
        rows: [
          ['`await` em operações independentes', 'lento sem motivo', 'iniciar antes, aguardar depois'],
          ['`.Result` ou `.Wait()`', 'thread bloqueada, ou travamento', '`await`'],
          ['`async void`', 'exceção derruba o processo', '`async Task`'],
          ['`Task` descartada (CS4014)', 'erro silencioso', 'aguardar ou observar'],
          ['`Select` sem `WhenAll`', 'tipo `IEnumerable<Task<T>>`', '`ToList()` e `WhenAll`'],
        ],
      },
      {
        kind: 'compare',
        good: `var tarefas = ids.Select(BuscarAsync).ToList();
int[] valores = await Task.WhenAll(tarefas);
return valores.Sum();`,
        bad: `int soma = 0;

foreach (var id in ids)
{
    soma += await BuscarAsync(id);
}

return soma;`,
        goodLabel: 'Simultâneo',
        badLabel: 'Uma de cada vez',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A versão da direita nem sempre está errada. Se cada chamada consome uma cota, ou se a ordem importa, ela é a correta. O erro é escolher sem perceber que houve escolha.',
      },
      {
        kind: 'text',
        body:
          'Sobre exceções, três comportamentos precisam estar claros para não haver surpresa:',
      },
      {
        kind: 'table',
        headers: ['Contexto', 'O que sai'],
        rows: [
          ['`await` de uma tarefa', 'a exceção original'],
          ['`await Task.WhenAll(...)`', 'a primeira; as demais em `.Exception`'],
          ['`.Result` ou `.Wait()`', '`AggregateException` embrulhando tudo'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'O desafio final junta tudo num agregador de fontes: guardas síncronas, cache, chamadas simultâneas, tolerância a falha parcial, timeout por corrida e nenhuma `Task` abandonada.',
      },
    ],
    quiz: [
      {
        id: 's09c01l10q1',
        type: 'single',
        prompt: 'Qual observação resume o funcionamento de `async`?',
        options: [
          { id: 'a', text: 'Chamar já inicia a operação; o `await` só escolhe quando esperar', correct: true },
          { id: 'b', text: 'Cada `await` cria uma thread nova' },
          { id: 'c', text: '`async` executa o método em segundo plano' },
          { id: 'd', text: 'A `Task` só começa quando aguardada' },
        ],
        explanation:
          'A opção D descreve um iterador com `yield`, que é preguiçoso. Uma `Task` é ansiosa: ela já está em andamento quando você a recebe.',
      },
      {
        id: 's09c01l10q2',
        type: 'multiple',
        prompt: 'Quais destes são erros de assincronia vistos no capítulo?',
        options: [
          { id: 'a', text: '`async void` fora de manipulador de evento', correct: true },
          { id: 'b', text: '`.Result` para obter o valor de uma `Task`', correct: true },
          { id: 'c', text: '`Select` assíncrono sem `WhenAll`', correct: true },
          { id: 'd', text: '`await` em operações que realmente dependem uma da outra' },
        ],
        explanation:
          'A última é o uso correto: quando há dependência, sequencial é a única forma certa — e a mais legível.',
      },
      {
        id: 's09c01l10q3',
        type: 'single',
        prompt: 'O que `.Result` relança quando a tarefa falhou?',
        options: [
          { id: 'a', text: 'Uma `AggregateException` embrulhando a original', correct: true },
          { id: 'b', text: 'A exceção original' },
          { id: 'c', text: 'Uma `TaskCanceledException`' },
          { id: 'd', text: 'Nada: devolve o valor padrão' },
        ],
        explanation:
          'É mais um motivo para preferir `await`, que relança a exceção original e deixa o `catch` específico funcionar como no código síncrono.',
      },
    ],
    challenge: {
      brief:
        'Feche o capítulo com um agregador de fontes que aplica todas as decisões: guardas, cache, chamadas simultâneas, tolerância a falha parcial, timeout por corrida e nenhuma tarefa abandonada.',
      requirements: [
        'Nenhum `async void`, nenhum `.Result`, nenhum `.Wait()`.',
        '`AgregarAsync` valida a entrada antes do primeiro `await`.',
        'As fontes independentes são consultadas simultaneamente com `WhenAll`.',
        'Uma fonte que falha não impede as outras: o resultado traz sucessos e falhas.',
        '`ComTimeoutAsync` usa `WhenAny` contra um `Task.Delay` e observa a perdedora.',
        'O cache evita a consulta quando a chave já é conhecida.',
        'Um contador de consultas prova que nada foi consultado duas vezes.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

record Leitura(string Fonte, int Valor, string Erro)
{
    public bool Ok => Erro == null;
    public override string ToString() => Ok ? $"{Fonte}={Valor}" : $"{Fonte}!{Erro}";
}

class Agregador
{
    private readonly Dictionary<string, int> cache = new() { ["memoria"] = 99 };
    private readonly List<string> abandonadas = new();
    private readonly object trava = new();

    public int Consultas { get; private set; }
    public IReadOnlyList<string> Abandonadas => abandonadas;

    // TODO: incrementa Consultas, espera <ms>;
    //       lanca InvalidOperationException("<fonte> indisponivel") quando falhar=true;
    //       senao devolve o comprimento do nome da fonte vezes 10
    public async Task<int> ConsultarAsync(string fonte, int ms, bool falhar)
    {
        return 0;
    }

    // TODO: captura o proprio erro; nunca lanca
    public async Task<Leitura> TentarAsync(string fonte, int ms, bool falhar)
    {
        return null;
    }

    // TODO: corre contra Task.Delay(limiteMs); observa a perdedora quando o tempo estoura
    public async Task<Leitura> ComTimeoutAsync(string fonte, int ms, int limiteMs)
    {
        return null;
    }

    // TODO: registra em 'abandonadas' o nome da fonte cuja tarefa foi deixada para tras
    public void Observar(string fonte, Task tarefa)
    {
    }

    // TODO:
    //  - lista vazia          -> lista vazia, sem consulta
    //  - fonte no cache       -> Leitura com o valor, sem consulta
    //  - demais               -> TentarAsync simultaneos, com WhenAll
    //  - ordem preservada
    public async Task<List<Leitura>> AgregarAsync(IEnumerable<(string Fonte, int Ms, bool Falhar)> pedidos)
    {
        return new List<Leitura>();
    }
}

class Program
{
    static async Task Main()
    {
        var a = new Agregador();

        Console.WriteLine($"vazio: {(await a.AgregarAsync(new List<(string, int, bool)>())).Count}");
        Console.WriteLine($"consultas apos vazio: {a.Consultas}");

        var pedidos = new List<(string Fonte, int Ms, bool Falhar)>
        {
            ("norte", 60, false),
            ("memoria", 60, false),
            ("sul", 40, true),
            ("leste", 30, false),
        };

        List<Leitura> leituras = await a.AgregarAsync(pedidos);

        Console.WriteLine($"leituras: {string.Join(" ; ", leituras.Select(l => l.ToString()))}");
        Console.WriteLine($"ok: {leituras.Count(l => l.Ok)} falhas: {leituras.Count(l => !l.Ok)}");
        Console.WriteLine($"ordem: {string.Join(",", leituras.Select(l => l.Fonte))}");
        Console.WriteLine($"consultas: {a.Consultas}");

        var t = new Agregador();
        Console.WriteLine($"no prazo: {await t.ComTimeoutAsync("rapida", 30, 300)}");
        Console.WriteLine($"estourou: {await t.ComTimeoutAsync("lenta", 400, 100)}");
        Console.WriteLine($"abandonadas: {string.Join(",", t.Abandonadas)}");

        var c = new Agregador();
        List<Leitura> soCache = await c.AgregarAsync(new List<(string, int, bool)> { ("memoria", 100, false) });
        Console.WriteLine($"so cache: {string.Join(",", soCache.Select(l => l.ToString()))}");
        Console.WriteLine($"consultas do cache: {c.Consultas}");

        var todas = new Agregador();
        List<Leitura> falhaTotal = await todas.AgregarAsync(new List<(string, int, bool)>
        {
            ("a", 20, true),
            ("b", 30, true),
        });

        Console.WriteLine($"todas falharam: {falhaTotal.All(l => !l.Ok)}");
        Console.WriteLine($"mensagens: {string.Join(" | ", falhaTotal.Select(l => l.Erro))}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

record Leitura(string Fonte, int Valor, string Erro)
{
    public bool Ok => Erro == null;
    public override string ToString() => Ok ? $"{Fonte}={Valor}" : $"{Fonte}!{Erro}";
}

class Agregador
{
    private readonly Dictionary<string, int> cache = new() { ["memoria"] = 99 };
    private readonly List<string> abandonadas = new();
    private readonly object trava = new();

    public int Consultas { get; private set; }
    public IReadOnlyList<string> Abandonadas => abandonadas;

    public async Task<int> ConsultarAsync(string fonte, int ms, bool falhar)
    {
        Consultas++;
        await Task.Delay(ms);

        if (falhar)
        {
            throw new InvalidOperationException($"{fonte} indisponivel");
        }

        return fonte.Length * 10;
    }

    public async Task<Leitura> TentarAsync(string fonte, int ms, bool falhar)
    {
        try
        {
            int valor = await ConsultarAsync(fonte, ms, falhar);
            return new Leitura(fonte, valor, null);
        }
        catch (Exception ex)
        {
            return new Leitura(fonte, 0, ex.Message);
        }
    }

    public async Task<Leitura> ComTimeoutAsync(string fonte, int ms, int limiteMs)
    {
        Task<int> operacao = ConsultarAsync(fonte, ms, false);
        Task limite = Task.Delay(limiteMs);

        Task vencedora = await Task.WhenAny(operacao, limite);

        if (vencedora == limite)
        {
            Observar(fonte, operacao);
            return new Leitura(fonte, 0, "tempo esgotado");
        }

        return new Leitura(fonte, await operacao, null);
    }

    public void Observar(string fonte, Task tarefa)
    {
        lock (trava)
        {
            abandonadas.Add(fonte);
        }

        _ = tarefa.ContinueWith(_ => { }, TaskContinuationOptions.OnlyOnFaulted);
    }

    public async Task<List<Leitura>> AgregarAsync(IEnumerable<(string Fonte, int Ms, bool Falhar)> pedidos)
    {
        var lista = pedidos.ToList();

        if (lista.Count == 0)
        {
            return new List<Leitura>();
        }

        var tarefas = new List<Task<Leitura>>();

        foreach (var pedido in lista)
        {
            if (cache.TryGetValue(pedido.Fonte, out int pronto))
            {
                tarefas.Add(Task.FromResult(new Leitura(pedido.Fonte, pronto, null)));
                continue;
            }

            tarefas.Add(TentarAsync(pedido.Fonte, pedido.Ms, pedido.Falhar));
        }

        Leitura[] resultados = await Task.WhenAll(tarefas);
        return resultados.ToList();
    }
}

class Program
{
    static async Task Main()
    {
        var a = new Agregador();

        Console.WriteLine($"vazio: {(await a.AgregarAsync(new List<(string, int, bool)>())).Count}");
        Console.WriteLine($"consultas apos vazio: {a.Consultas}");

        var pedidos = new List<(string Fonte, int Ms, bool Falhar)>
        {
            ("norte", 60, false),
            ("memoria", 60, false),
            ("sul", 40, true),
            ("leste", 30, false),
        };

        List<Leitura> leituras = await a.AgregarAsync(pedidos);

        Console.WriteLine($"leituras: {string.Join(" ; ", leituras.Select(l => l.ToString()))}");
        Console.WriteLine($"ok: {leituras.Count(l => l.Ok)} falhas: {leituras.Count(l => !l.Ok)}");
        Console.WriteLine($"ordem: {string.Join(",", leituras.Select(l => l.Fonte))}");
        Console.WriteLine($"consultas: {a.Consultas}");

        var t = new Agregador();
        Console.WriteLine($"no prazo: {await t.ComTimeoutAsync("rapida", 30, 300)}");
        Console.WriteLine($"estourou: {await t.ComTimeoutAsync("lenta", 400, 100)}");
        Console.WriteLine($"abandonadas: {string.Join(",", t.Abandonadas)}");

        var c = new Agregador();
        List<Leitura> soCache = await c.AgregarAsync(new List<(string, int, bool)> { ("memoria", 100, false) });
        Console.WriteLine($"so cache: {string.Join(",", soCache.Select(l => l.ToString()))}");
        Console.WriteLine($"consultas do cache: {c.Consultas}");

        var todas = new Agregador();
        List<Leitura> falhaTotal = await todas.AgregarAsync(new List<(string, int, bool)>
        {
            ("a", 20, true),
            ("b", 30, true),
        });

        Console.WriteLine($"todas falharam: {falhaTotal.All(l => !l.Ok)}");
        Console.WriteLine($"mensagens: {string.Join(" | ", falhaTotal.Select(l => l.Erro))}");
    }
}`,
      hints: [
        'Para a fonte em cache, `Task.FromResult(...)` entra na lista de tarefas como qualquer outra — e o `WhenAll` preserva a posição dela.',
        '`TentarAsync` é o que torna a falha parcial inofensiva: o erro vira dado, não exceção.',
        '`memoria` tem 7 letras, `norte` 5, `leste` 5 — mas `memoria` vem do cache com valor 99, sem consulta.',
        'O `ContinueWith` vazio em `Observar` existe só para marcar a exceção como observada, evitando que ela escape para o finalizador.',
      ],
      tests: [
        {
          name: 'Agregador de fontes',
          expectedStdout:
            'vazio: 0\nconsultas apos vazio: 0\n' +
            'leituras: norte=50 ; memoria=99 ; sul!sul indisponivel ; leste=50\n' +
            'ok: 3 falhas: 1\nordem: norte,memoria,sul,leste\nconsultas: 3\n' +
            'no prazo: rapida=60\nestourou: lenta!tempo esgotado\nabandonadas: lenta\n' +
            'so cache: memoria=99\nconsultas do cache: 0\n' +
            'todas falharam: True\nmensagens: a indisponivel | b indisponivel',
        },
      ],
      timeoutMs: 15000,
    },
  },
]
