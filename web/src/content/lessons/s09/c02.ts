import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's09c02l01',
    title: 'Task.Delay',
    objective: 'Esperar sem bloquear, e entender por que `Thread.Sleep` não serve em código assíncrono.',
    concept: [
      {
        kind: 'text',
        body:
          'Esperar um intervalo é a operação assíncrona mais simples que existe — e a que melhor expõe a diferença entre bloquear e ceder a thread.',
      },
      {
        kind: 'compare',
        good: `await Task.Delay(100);
// a thread volta ao pool
// e atende outra coisa`,
        bad: `Thread.Sleep(100);
// a thread fica parada,
// sem fazer nada`,
        goodLabel: '`Task.Delay`',
        badLabel: '`Thread.Sleep`',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Num servidor, `Thread.Sleep` dentro de um método assíncrono é um dos piores erros possíveis: cada requisição em espera consome uma thread do pool, e o servidor para de atender muito antes do esperado.',
      },
      {
        kind: 'text',
        body:
          '`Task.Delay` tem três sobrecargas úteis, e a terceira é a que aparece em quase todo código real.',
      },
      {
        kind: 'table',
        headers: ['Forma', 'Faz'],
        rows: [
          ['`Task.Delay(100)`', 'espera 100 ms'],
          ['`Task.Delay(TimeSpan.FromSeconds(2))`', 'mesma coisa, mais legível'],
          ['`Task.Delay(100, token)`', 'espera, mas pode ser cancelada'],
        ],
      },
      {
        kind: 'code',
        code: `await Task.Delay(500, cancelamento.Token);`,
        caption: 'Sem o token, o delay ignora qualquer pedido de cancelamento e espera o tempo inteiro.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A precisão de `Task.Delay` é limitada pelo relógio do sistema — tipicamente algo entre 10 e 16 ms no Windows. Pedir 5 ms pode render 15. Isso importa quando você depende da ordem de conclusão de várias tarefas.',
      },
      {
        kind: 'text',
        body:
          'É por isso que testes sobre ordem precisam de **margem generosa**. Duas tarefas com 10 ms de diferença podem terminar fora de ordem; com 100 ms, não.',
      },
      {
        kind: 'compare',
        good: `var a = TarefaAsync(200);
var b = TarefaAsync(100);
// b sempre termina antes`,
        bad: `var a = TarefaAsync(20);
var b = TarefaAsync(15);
// a ordem varia entre execucoes`,
        goodLabel: 'Margem de 100 ms',
        badLabel: 'Margem de 5 ms',
      },
      {
        kind: 'text',
        body:
          'O uso mais comum de `Task.Delay` em código de produção é o **espaçamento entre tentativas**. Repetir imediatamente costuma piorar a situação; esperar um pouco dá chance de o problema passar.',
      },
      {
        kind: 'code',
        code: `for (int tentativa = 1; tentativa <= 3; tentativa++)
{
    try
    {
        return await OperacaoAsync();
    }
    catch (Exception) when (tentativa < 3)
    {
        await Task.Delay(100 * tentativa);
    }
}`,
        caption: 'O intervalo cresce a cada tentativa — o *backoff*, tema da lição 6 do capítulo 7.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Neste ambiente, o tempo limite padrão de um desafio é 5 segundos. Delays devem ficar entre 20 e 200 ms; qualquer coisa em segundos consome o orçamento inteiro e reprova o teste sem que haja erro no código.',
      },
    ],
    quiz: [
      {
        id: 's09c02l01q1',
        type: 'single',
        prompt: 'Qual a diferença entre `Task.Delay(100)` e `Thread.Sleep(100)`?',
        options: [
          { id: 'a', text: '`Task.Delay` libera a thread; `Thread.Sleep` a mantém parada', correct: true },
          { id: 'b', text: '`Task.Delay` é mais preciso' },
          { id: 'c', text: '`Thread.Sleep` é assíncrono' },
          { id: 'd', text: 'Nenhuma: são sinônimos' },
        ],
        explanation:
          'A precisão dos dois é parecida e limitada pelo relógio do sistema. O que muda é o custo: um consome uma thread durante toda a espera, o outro não.',
      },
      {
        id: 's09c02l01q2',
        type: 'single',
        prompt: 'O que acontece com `await Task.Delay(500)` — sem token — quando alguém pede cancelamento?',
        options: [
          { id: 'a', text: 'Nada: o delay espera os 500 ms inteiros', correct: true },
          { id: 'b', text: 'É interrompido imediatamente' },
          { id: 'c', text: 'Lança `TaskCanceledException`' },
          { id: 'd', text: 'Depende do contexto de sincronização' },
        ],
        explanation:
          'O cancelamento é cooperativo: ele só funciona onde o token é repassado. Um delay sem token é um ponto cego na cadeia de cancelamento.',
      },
      {
        id: 's09c02l01q3',
        type: 'single',
        prompt: 'Por que testes sobre ordem de conclusão precisam de margem generosa?',
        options: [
          { id: 'a', text: 'A precisão de `Task.Delay` é limitada pelo relógio do sistema', correct: true },
          { id: 'b', text: 'Porque o pool de threads é imprevisível' },
          { id: 'c', text: 'Porque `Task.Delay` arredonda para segundos' },
          { id: 'd', text: 'Não precisam: a ordem é sempre determinística' },
        ],
        explanation:
          'Com resolução de 10 a 16 ms, dois delays separados por 5 ms podem inverter. Separados por 100 ms, a ordem é confiável.',
      },
    ],
    challenge: {
      brief:
        'Construa um pequeno cronograma de tarefas espaçadas: execução em ordem previsível, delay com `TimeSpan`, espaçamento crescente entre tentativas, e a demonstração de que a ordem depende da margem.',
      requirements: [
        'Todos os delays ficam entre 20 e 250 ms — nada em segundos.',
        '`TarefaAsync` registra início e fim, para que a ordem seja verificável.',
        '`ComMargemAsync` usa delays separados por pelo menos 100 ms, e a ordem deve ser estável.',
        '`ComTimeSpanAsync` usa `TimeSpan.FromMilliseconds`.',
        '`ComEspacamentoAsync` repete uma operação com intervalo crescente e registra os intervalos usados.',
        'Nenhum uso de `Thread.Sleep`.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class Cronograma
{
    private readonly List<string> eventos = new();
    private readonly List<int> intervalos = new();
    private readonly object trava = new();

    public IReadOnlyList<string> Eventos => eventos;
    public IReadOnlyList<int> Intervalos => intervalos;

    private void Registrar(string e)
    {
        lock (trava)
        {
            eventos.Add(e);
        }
    }

    // TODO: registra "i<nome>", espera <ms>, registra "f<nome>", devolve <nome>
    public async Task<string> TarefaAsync(string nome, int ms)
    {
        return "";
    }

    // TODO: tres tarefas simultaneas com 240, 140 e 40 ms; devolve a ordem de termino
    public async Task<string> ComMargemAsync()
    {
        return "";
    }

    // TODO: espera usando TimeSpan.FromMilliseconds(ms) e devolve "esperou <ms>ms"
    public async Task<string> ComTimeSpanAsync(int ms)
    {
        return "";
    }

    // TODO: repete <vezes>; antes de cada repeticao apos a primeira,
    //       espera base * numero da repeticao e registra o intervalo em 'intervalos'
    public async Task<int> ComEspacamentoAsync(int vezes, int baseMs)
    {
        return 0;
    }

    public string Linha() => string.Join(" ", eventos);

    public void Limpar()
    {
        eventos.Clear();
        intervalos.Clear();
    }
}

class Program
{
    static async Task Main()
    {
        var c = new Cronograma();

        Console.WriteLine($"uma tarefa: {await c.TarefaAsync("A", 30)}");
        Console.WriteLine($"eventos: {c.Linha()}");

        c.Limpar();
        Console.WriteLine($"ordem: {await c.ComMargemAsync()}");
        Console.WriteLine($"eventos: {c.Linha()}");

        var repeticoes = new List<string>();

        for (int i = 0; i < 3; i++)
        {
            c.Limpar();
            repeticoes.Add(await c.ComMargemAsync());
        }

        Console.WriteLine($"ordem estavel: {repeticoes.Distinct().Count() == 1}");
        Console.WriteLine($"sempre: {repeticoes[0]}");

        Console.WriteLine($"timespan: {await c.ComTimeSpanAsync(50)}");
        Console.WriteLine($"timespan zero: {await c.ComTimeSpanAsync(0)}");

        c.Limpar();
        Console.WriteLine($"repeticoes: {await c.ComEspacamentoAsync(4, 30)}");
        Console.WriteLine($"intervalos: {string.Join(",", c.Intervalos)}");
        Console.WriteLine($"crescente: {c.Intervalos.SequenceEqual(c.Intervalos.OrderBy(x => x))}");

        c.Limpar();
        Console.WriteLine($"uma repeticao: {await c.ComEspacamentoAsync(1, 30)}");
        Console.WriteLine($"sem intervalo: {c.Intervalos.Count}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class Cronograma
{
    private readonly List<string> eventos = new();
    private readonly List<int> intervalos = new();
    private readonly object trava = new();

    public IReadOnlyList<string> Eventos => eventos;
    public IReadOnlyList<int> Intervalos => intervalos;

    private void Registrar(string e)
    {
        lock (trava)
        {
            eventos.Add(e);
        }
    }

    public async Task<string> TarefaAsync(string nome, int ms)
    {
        Registrar($"i{nome}");
        await Task.Delay(ms);
        Registrar($"f{nome}");
        return nome;
    }

    public async Task<string> ComMargemAsync()
    {
        Task<string> lenta = TarefaAsync("L", 240);
        Task<string> media = TarefaAsync("M", 140);
        Task<string> rapida = TarefaAsync("R", 40);

        await Task.WhenAll(lenta, media, rapida);

        return string.Join(",", eventos.Where(e => e.StartsWith("f")).Select(e => e.Substring(1)));
    }

    public async Task<string> ComTimeSpanAsync(int ms)
    {
        await Task.Delay(TimeSpan.FromMilliseconds(ms));
        return $"esperou {ms}ms";
    }

    public async Task<int> ComEspacamentoAsync(int vezes, int baseMs)
    {
        int executadas = 0;

        for (int i = 1; i <= vezes; i++)
        {
            if (i > 1)
            {
                int intervalo = baseMs * (i - 1);

                lock (trava)
                {
                    intervalos.Add(intervalo);
                }

                await Task.Delay(intervalo);
            }

            executadas++;
        }

        return executadas;
    }

    public string Linha() => string.Join(" ", eventos);

    public void Limpar()
    {
        eventos.Clear();
        intervalos.Clear();
    }
}

class Program
{
    static async Task Main()
    {
        var c = new Cronograma();

        Console.WriteLine($"uma tarefa: {await c.TarefaAsync("A", 30)}");
        Console.WriteLine($"eventos: {c.Linha()}");

        c.Limpar();
        Console.WriteLine($"ordem: {await c.ComMargemAsync()}");
        Console.WriteLine($"eventos: {c.Linha()}");

        var repeticoes = new List<string>();

        for (int i = 0; i < 3; i++)
        {
            c.Limpar();
            repeticoes.Add(await c.ComMargemAsync());
        }

        Console.WriteLine($"ordem estavel: {repeticoes.Distinct().Count() == 1}");
        Console.WriteLine($"sempre: {repeticoes[0]}");

        Console.WriteLine($"timespan: {await c.ComTimeSpanAsync(50)}");
        Console.WriteLine($"timespan zero: {await c.ComTimeSpanAsync(0)}");

        c.Limpar();
        Console.WriteLine($"repeticoes: {await c.ComEspacamentoAsync(4, 30)}");
        Console.WriteLine($"intervalos: {string.Join(",", c.Intervalos)}");
        Console.WriteLine($"crescente: {c.Intervalos.SequenceEqual(c.Intervalos.OrderBy(x => x))}");

        c.Limpar();
        Console.WriteLine($"uma repeticao: {await c.ComEspacamentoAsync(1, 30)}");
        Console.WriteLine($"sem intervalo: {c.Intervalos.Count}");
    }
}`,
      hints: [
        'Os delays de 240, 140 e 40 ms têm 100 ms de margem entre si — folga suficiente para a ordem de término nunca inverter.',
        'A ordem de término sai filtrando os eventos que começam com `f` e removendo o prefixo.',
        'Em `ComEspacamentoAsync`, o intervalo só existe **entre** repetições: com 4 vezes, há 3 esperas de 30, 60 e 90 ms.',
        '`Task.Delay(TimeSpan.Zero)` é válido e retorna quase imediatamente — não é preciso tratar o zero à parte.',
      ],
      tests: [
        {
          name: 'Cronograma de esperas',
          expectedStdout:
            'uma tarefa: A\neventos: iA fA\n' +
            'ordem: R,M,L\neventos: iL iM iR fR fM fL\n' +
            'ordem estavel: True\nsempre: R,M,L\n' +
            'timespan: esperou 50ms\ntimespan zero: esperou 0ms\n' +
            'repeticoes: 4\nintervalos: 30,60,90\ncrescente: True\n' +
            'uma repeticao: 1\nsem intervalo: 0',
        },
      ],
      timeoutMs: 15000,
    },
  },

  {
    id: 's09c02l02',
    title: 'A ideia de cancelamento cooperativo',
    objective: 'Entender por que o .NET não interrompe tarefas à força, e o que isso exige do seu código.',
    concept: [
      {
        kind: 'text',
        body:
          'O .NET **não tem** como abortar uma operação em andamento. Não existe "matar a tarefa". O modelo é outro: alguém **pede** o cancelamento, e o código em execução **decide** quando parar.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A ausência de aborto forçado é uma escolha, não uma limitação. Interromper código no meio deixaria estado inconsistente: um arquivo meio escrito, um `lock` nunca liberado, uma transação aberta para sempre.',
      },
      {
        kind: 'text',
        body: 'O mecanismo tem duas metades, e a separação é o que faz o modelo funcionar:',
      },
      {
        kind: 'table',
        headers: ['Peça', 'Papel', 'Quem usa'],
        rows: [
          ['`CancellationTokenSource`', 'dispara o pedido', 'quem inicia a operação'],
          ['`CancellationToken`', 'transporta o pedido', 'quem executa a operação'],
        ],
      },
      {
        kind: 'code',
        code: `using var cts = new CancellationTokenSource();

Task tarefa = TrabalhoAsync(cts.Token);

cts.Cancel();`,
        caption: 'Quem cancela tem a fonte; quem executa recebe só o token — e não pode cancelar os outros.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Essa assimetria é deliberada. Um `CancellationToken` **não** consegue disparar cancelamento: ele só consulta. Passar a fonte adiante em vez do token dá a quem executa um poder que ele não deveria ter.',
      },
      {
        kind: 'text',
        body:
          'Do lado de quem executa, cooperar significa **verificar o token com regularidade**. Existem três formas, e o código real costuma usar as três.',
      },
      {
        kind: 'table',
        headers: ['Forma', 'Efeito'],
        rows: [
          ['`ct.ThrowIfCancellationRequested()`', 'lança `OperationCanceledException`'],
          ['`if (ct.IsCancellationRequested) return;`', 'sai sem exceção'],
          ['repassar `ct` a métodos assíncronos', 'a espera interna já coopera'],
        ],
      },
      {
        kind: 'code',
        code: `static async Task<int> TrabalhoAsync(int passos, CancellationToken ct)
{
    for (int i = 0; i < passos; i++)
    {
        ct.ThrowIfCancellationRequested();
        await Task.Delay(20, ct);
    }

    return passos;
}`,
        caption: 'Duas verificações por volta: a explícita no início e a implícita dentro do `Task.Delay`.',
      },
      {
        kind: 'compare',
        good: `for (int i = 0; i < 1000; i++)
{
    ct.ThrowIfCancellationRequested();
    Processar(i);
}`,
        bad: `for (int i = 0; i < 1000; i++)
{
    Processar(i);
}
// nunca verifica: o cancelamento
// e ignorado ate o fim do laco`,
        goodLabel: 'Coopera',
        badLabel: 'Ignora o pedido',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um método que recebe `CancellationToken` e nunca o consulta **não é cancelável** — mesmo que a assinatura sugira o contrário. É um contrato quebrado em silêncio.',
      },
      {
        kind: 'text',
        body:
          'A frequência da verificação é uma decisão de equilíbrio: verificar a cada iteração de um laço de milhões de voltas custa; verificar a cada mil deixa a resposta lenta. Na prática, verificar entre unidades naturais de trabalho resolve.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A convenção do framework é que o token seja o **último parâmetro** e tenha valor padrão: `CancellationToken ct = default`. Assim quem não precisa cancelar não paga nada por isso.',
      },
    ],
    quiz: [
      {
        id: 's09c02l02q1',
        type: 'single',
        prompt: 'Por que o .NET não permite abortar uma tarefa à força?',
        options: [
          { id: 'a', text: 'Interromper no meio deixaria estado inconsistente: arquivos, locks, transações', correct: true },
          { id: 'b', text: 'Por limitação do coletor de lixo' },
          { id: 'c', text: 'Porque tarefas não têm thread própria' },
          { id: 'd', text: 'É permitido, com `Task.Abort()`' },
        ],
        explanation:
          'A API `Thread.Abort` existiu e foi removida justamente por isso. O modelo cooperativo transfere a decisão de parar para quem sabe onde é seguro.',
      },
      {
        id: 's09c02l02q2',
        type: 'single',
        prompt: 'Qual a diferença entre `CancellationTokenSource` e `CancellationToken`?',
        options: [
          { id: 'a', text: 'A fonte dispara o cancelamento; o token apenas o consulta', correct: true },
          { id: 'b', text: 'São o mesmo tipo com nomes diferentes' },
          { id: 'c', text: 'O token dispara e a fonte consulta' },
          { id: 'd', text: 'A fonte é para threads e o token para tarefas' },
        ],
        explanation:
          'A separação impede que código chamado cancele operações que não são dele. Por isso se passa o token adiante, nunca a fonte.',
      },
      {
        id: 's09c02l02q3',
        type: 'single',
        prompt: 'O que acontece com um método que recebe `CancellationToken` e nunca o consulta?',
        options: [
          { id: 'a', text: 'Não é cancelável, apesar de a assinatura sugerir que é', correct: true },
          { id: 'b', text: 'O runtime o cancela automaticamente' },
          { id: 'c', text: 'Gera erro de compilação' },
          { id: 'd', text: 'É cancelado no próximo `await`' },
        ],
        explanation:
          'Nada no compilador ou no runtime força a cooperação. O token é uma convenção — e um método que a ignora quebra o contrato em silêncio.',
      },
    ],
    challenge: {
      brief:
        'Implemente duas versões da mesma operação — uma cooperativa e uma que ignora o token — e prove pela contagem de passos que só a primeira responde ao pedido de cancelamento.',
      requirements: [
        '`CooperativoAsync` verifica o token a cada passo e repassa-o ao `Task.Delay`.',
        '`IgnoranteAsync` recebe o token e nunca o consulta.',
        'Um contador registra quantos passos cada versão executou.',
        'A versão cooperativa deve parar com bem menos passos que a ignorante.',
        '`ComSaidaLimpaAsync` usa `IsCancellationRequested` para sair **sem** exceção.',
        '`PassosDados` prova que o cancelamento chegou no meio, não no fim.',
        'Nenhum delay acima de 40 ms por passo.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

class Operacao
{
    public int PassosCooperativo { get; private set; }
    public int PassosIgnorante { get; private set; }
    public int PassosSaidaLimpa { get; private set; }

    // TODO: verifica o token a cada passo e repassa ao Task.Delay(20, ct)
    public async Task<int> CooperativoAsync(int passos, CancellationToken ct)
    {
        return 0;
    }

    // TODO: recebe o token e NUNCA o consulta; Task.Delay(20) sem token
    public async Task<int> IgnoranteAsync(int passos, CancellationToken ct)
    {
        return 0;
    }

    // TODO: usa IsCancellationRequested para sair sem excecao;
    //       devolve quantos passos completou
    public async Task<int> ComSaidaLimpaAsync(int passos, CancellationToken ct)
    {
        return 0;
    }
}

class Program
{
    static async Task Main()
    {
        var op = new Operacao();

        using (var cts = new CancellationTokenSource())
        {
            Task<int> tarefa = op.CooperativoAsync(50, cts.Token);
            await Task.Delay(120);
            cts.Cancel();

            try
            {
                await tarefa;
                Console.WriteLine("nao deveria chegar aqui");
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine("cooperativo: cancelado");
            }

            Console.WriteLine($"cooperativo parou cedo: {op.PassosCooperativo < 50}");
            Console.WriteLine($"cooperativo deu algum passo: {op.PassosCooperativo > 0}");
        }

        using (var cts = new CancellationTokenSource())
        {
            Task<int> tarefa = op.IgnoranteAsync(10, cts.Token);
            await Task.Delay(60);
            cts.Cancel();

            int resultado = await tarefa;
            Console.WriteLine($"ignorante concluiu: {resultado}");
            Console.WriteLine($"ignorante fez tudo: {op.PassosIgnorante == 10}");
        }

        using (var cts = new CancellationTokenSource())
        {
            Task<int> tarefa = op.ComSaidaLimpaAsync(50, cts.Token);
            await Task.Delay(120);
            cts.Cancel();

            int feitos = await tarefa;
            Console.WriteLine($"saida limpa sem excecao: {feitos}");
            Console.WriteLine($"saida limpa parou cedo: {feitos < 50}");
            Console.WriteLine($"saida limpa comecou: {feitos > 0}");
        }

        using (var jaCancelado = new CancellationTokenSource())
        {
            jaCancelado.Cancel();
            var nova = new Operacao();

            try
            {
                await nova.CooperativoAsync(10, jaCancelado.Token);
                Console.WriteLine("nao deveria chegar aqui");
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine($"token ja cancelado: {nova.PassosCooperativo} passos");
            }
        }

        using (var semCancelar = new CancellationTokenSource())
        {
            var completa = new Operacao();
            int total = await completa.CooperativoAsync(5, semCancelar.Token);
            Console.WriteLine($"sem cancelamento: {total}");
            Console.WriteLine($"token nao pedido: {semCancelar.Token.IsCancellationRequested}");
        }
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

class Operacao
{
    public int PassosCooperativo { get; private set; }
    public int PassosIgnorante { get; private set; }
    public int PassosSaidaLimpa { get; private set; }

    public async Task<int> CooperativoAsync(int passos, CancellationToken ct)
    {
        for (int i = 0; i < passos; i++)
        {
            ct.ThrowIfCancellationRequested();
            await Task.Delay(20, ct);
            PassosCooperativo++;
        }

        return PassosCooperativo;
    }

    public async Task<int> IgnoranteAsync(int passos, CancellationToken ct)
    {
        for (int i = 0; i < passos; i++)
        {
            await Task.Delay(20);
            PassosIgnorante++;
        }

        return PassosIgnorante;
    }

    public async Task<int> ComSaidaLimpaAsync(int passos, CancellationToken ct)
    {
        for (int i = 0; i < passos; i++)
        {
            if (ct.IsCancellationRequested)
            {
                return PassosSaidaLimpa;
            }

            await Task.Delay(20);
            PassosSaidaLimpa++;
        }

        return PassosSaidaLimpa;
    }
}

class Program
{
    static async Task Main()
    {
        var op = new Operacao();

        using (var cts = new CancellationTokenSource())
        {
            Task<int> tarefa = op.CooperativoAsync(50, cts.Token);
            await Task.Delay(120);
            cts.Cancel();

            try
            {
                await tarefa;
                Console.WriteLine("nao deveria chegar aqui");
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine("cooperativo: cancelado");
            }

            Console.WriteLine($"cooperativo parou cedo: {op.PassosCooperativo < 50}");
            Console.WriteLine($"cooperativo deu algum passo: {op.PassosCooperativo > 0}");
        }

        using (var cts = new CancellationTokenSource())
        {
            Task<int> tarefa = op.IgnoranteAsync(10, cts.Token);
            await Task.Delay(60);
            cts.Cancel();

            int resultado = await tarefa;
            Console.WriteLine($"ignorante concluiu: {resultado}");
            Console.WriteLine($"ignorante fez tudo: {op.PassosIgnorante == 10}");
        }

        using (var cts = new CancellationTokenSource())
        {
            Task<int> tarefa = op.ComSaidaLimpaAsync(50, cts.Token);
            await Task.Delay(120);
            cts.Cancel();

            int feitos = await tarefa;
            Console.WriteLine($"saida limpa sem excecao: {feitos}");
            Console.WriteLine($"saida limpa parou cedo: {feitos < 50}");
            Console.WriteLine($"saida limpa comecou: {feitos > 0}");
        }

        using (var jaCancelado = new CancellationTokenSource())
        {
            jaCancelado.Cancel();
            var nova = new Operacao();

            try
            {
                await nova.CooperativoAsync(10, jaCancelado.Token);
                Console.WriteLine("nao deveria chegar aqui");
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine($"token ja cancelado: {nova.PassosCooperativo} passos");
            }
        }

        using (var semCancelar = new CancellationTokenSource())
        {
            var completa = new Operacao();
            int total = await completa.CooperativoAsync(5, semCancelar.Token);
            Console.WriteLine($"sem cancelamento: {total}");
            Console.WriteLine($"token nao pedido: {semCancelar.Token.IsCancellationRequested}");
        }
    }
}`,
      hints: [
        '`ThrowIfCancellationRequested` no início de cada volta é o que faz o método parar rápido — ele nem começa o passo seguinte.',
        '`IgnoranteAsync` chama `Task.Delay(20)` **sem** o token: por isso a espera não é interrompida e os 10 passos completam.',
        '`ComSaidaLimpaAsync` devolve a contagem parcial em vez de lançar; use-a quando o cancelamento for um resultado esperado, não um erro.',
        'Com um token já cancelado, a primeira verificação lança antes do primeiro delay — zero passos executados.',
      ],
      tests: [
        {
          name: 'Cooperação com o token',
          expectedStdout:
            'cooperativo: cancelado\ncooperativo parou cedo: True\ncooperativo deu algum passo: True\n' +
            'ignorante concluiu: 10\nignorante fez tudo: True\n' +
            'saida limpa sem excecao: 5\nsaida limpa parou cedo: True\nsaida limpa comecou: True\n' +
            'token ja cancelado: 0 passos\n' +
            'sem cancelamento: 5\ntoken nao pedido: False',
        },
      ],
      timeoutMs: 15000,
    },
  },

  {
    id: 's09c02l03',
    title: 'CancellationToken',
    objective: 'Usar o token corretamente ao longo de uma cadeia de chamadas, incluindo tokens ligados.',
    concept: [
      {
        kind: 'text',
        body:
          'O token precisa atravessar toda a cadeia até chegar ao ponto que realmente espera. Um único elo que não o repassa transforma a operação inteira em não cancelável.',
      },
      {
        kind: 'code',
        code: `static async Task ControladorAsync(CancellationToken ct)
    => await ServicoAsync(ct);

static async Task ServicoAsync(CancellationToken ct)
    => await RepositorioAsync(ct);

static async Task RepositorioAsync(CancellationToken ct)
    => await Task.Delay(1000, ct);`,
        caption: 'O token só faz efeito na última linha. As duas primeiras existem para levá-lo até lá.',
      },
      {
        kind: 'compare',
        good: `await ServicoAsync(ct);
await Task.Delay(100, ct);
await stream.ReadAsync(buffer, ct);`,
        bad: `await ServicoAsync();
await Task.Delay(100);
await stream.ReadAsync(buffer);`,
        goodLabel: 'Token repassado',
        badLabel: 'Corrente quebrada',
      },
      {
        kind: 'text',
        body: 'A API do token tem poucos membros, e cada um serve a uma situação diferente:',
      },
      {
        kind: 'table',
        headers: ['Membro', 'Uso'],
        rows: [
          ['`IsCancellationRequested`', 'consultar sem lançar'],
          ['`ThrowIfCancellationRequested()`', 'abortar com exceção no ponto certo'],
          ['`Register(acao)`', 'executar algo quando o cancelamento chegar'],
          ['`CancellationToken.None`', 'um token que nunca é cancelado'],
          ['`CanBeCanceled`', 'saber se vale a pena verificar'],
        ],
      },
      {
        kind: 'code',
        code: `using var registro = ct.Register(() => Console.WriteLine("pediram para parar"));`,
        caption: '`Register` é útil para liberar recursos que não têm suporte a token — fechar uma conexão, por exemplo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A ação registrada roda na thread que chamou `Cancel()`. Ela deve ser curta e não lançar: uma exceção ali sobe pelo `Cancel()`, num lugar que ninguém espera.',
      },
      {
        kind: 'text',
        body:
          'Quando existem **duas razões** para cancelar — um pedido do usuário e um tempo limite, por exemplo —, o token ligado combina as duas numa fonte só.',
      },
      {
        kind: 'code',
        code: `using var doUsuario = new CancellationTokenSource();
using var doTempo = new CancellationTokenSource(TimeSpan.FromMilliseconds(200));

using var combinado = CancellationTokenSource.CreateLinkedTokenSource(
    doUsuario.Token, doTempo.Token);

await TrabalhoAsync(combinado.Token);`,
        caption: 'O token combinado é cancelado assim que **qualquer uma** das fontes for.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A fonte ligada precisa de `Dispose` — daí o `using`. Sem ele, ela permanece registrada nas fontes de origem, e num laço isso vaza memória de forma silenciosa.',
      },
      {
        kind: 'text',
        body:
          'Sobre a exceção: `OperationCanceledException` é a base, e `TaskCanceledException` herda dela. Capturar a base cobre os dois casos.',
      },
      {
        kind: 'compare',
        good: `catch (OperationCanceledException)
{
    // cobre TaskCanceledException tambem
}`,
        bad: `catch (TaskCanceledException)
{
    // nao cobre ThrowIfCancellationRequested
}`,
        goodLabel: 'Captura a base',
        badLabel: 'Captura só a derivada',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Cancelamento normalmente **não é erro**: é um resultado esperado. Registrar `OperationCanceledException` como falha polui o log com eventos que representam o funcionamento correto do sistema.',
      },
    ],
    quiz: [
      {
        id: 's09c02l03q1',
        type: 'single',
        prompt: 'O que acontece se um método no meio da cadeia não repassar o token?',
        options: [
          { id: 'a', text: 'A operação deixa de ser cancelável a partir dali', correct: true },
          { id: 'b', text: 'O compilador avisa' },
          { id: 'c', text: 'O token é propagado automaticamente' },
          { id: 'd', text: 'O cancelamento funciona mesmo assim' },
        ],
        explanation:
          'Não há propagação implícita. O token é um parâmetro comum, e a corrente se rompe no primeiro elo que o esquece.',
      },
      {
        id: 's09c02l03q2',
        type: 'single',
        prompt: 'Para que serve `CreateLinkedTokenSource`?',
        options: [
          { id: 'a', text: 'Combinar várias fontes: o token resultante cancela quando qualquer uma cancelar', correct: true },
          { id: 'b', text: 'Criar um token que só cancela quando todas cancelarem' },
          { id: 'c', text: 'Clonar um token existente' },
          { id: 'd', text: 'Converter um token em fonte' },
        ],
        explanation:
          'É a forma padrão de combinar timeout com cancelamento do usuário. A fonte ligada precisa de `Dispose`, senão fica registrada nas de origem.',
      },
      {
        id: 's09c02l03q3',
        type: 'single',
        prompt: 'Qual exceção capturar para cobrir todos os casos de cancelamento?',
        options: [
          { id: 'a', text: '`OperationCanceledException`, que é a base', correct: true },
          { id: 'b', text: '`TaskCanceledException`' },
          { id: 'c', text: '`InvalidOperationException`' },
          { id: 'd', text: '`AggregateException`' },
        ],
        explanation:
          '`TaskCanceledException` herda de `OperationCanceledException`. Capturar a derivada deixa passar o que `ThrowIfCancellationRequested` lança.',
      },
    ],
    challenge: {
      brief:
        'Construa uma cadeia de três camadas que repassa o token corretamente, combine duas razões de cancelamento com token ligado, e use `Register` para registrar a limpeza.',
      requirements: [
        'O token atravessa as três camadas até chegar ao `Task.Delay`.',
        '`SemTokenAsync` demonstra a corrente quebrada: recebe o token e não o repassa.',
        '`ComTokenLigadoAsync` combina duas fontes com `CreateLinkedTokenSource`, dentro de `using`.',
        '`Register` grava uma mensagem de limpeza quando o cancelamento chega.',
        'O `catch` usa `OperationCanceledException`, não a derivada.',
        'Um contador prova onde a operação parou em cada caso.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

class Cadeia
{
    private readonly List<string> limpezas = new();
    private readonly object trava = new();

    public int Passos { get; private set; }
    public IReadOnlyList<string> Limpezas => limpezas;

    public void Zerar()
    {
        Passos = 0;
        limpezas.Clear();
    }

    // TODO: repassa o token
    public async Task ControladorAsync(int passos, CancellationToken ct)
    {
    }

    // TODO: repassa o token
    public async Task ServicoAsync(int passos, CancellationToken ct)
    {
    }

    // TODO: verifica o token e repassa ao Task.Delay(20, ct); incrementa Passos
    public async Task RepositorioAsync(int passos, CancellationToken ct)
    {
    }

    // TODO: recebe o token e NAO o repassa — corrente quebrada
    public async Task SemTokenAsync(int passos, CancellationToken ct)
    {
    }

    // TODO: registra "limpou <nome>" em 'limpezas' quando o cancelamento chegar,
    //       e roda o repositorio com o token
    public async Task ComRegistroAsync(string nome, int passos, CancellationToken ct)
    {
    }

    // TODO: combina os dois tokens com CreateLinkedTokenSource dentro de using
    public async Task ComTokenLigadoAsync(int passos, CancellationToken a, CancellationToken b)
    {
    }
}

class Program
{
    static async Task Main()
    {
        var c = new Cadeia();

        c.Zerar();

        using (var cts = new CancellationTokenSource())
        {
            Task tarefa = c.ControladorAsync(50, cts.Token);
            await Task.Delay(120);
            cts.Cancel();

            try
            {
                await tarefa;
                Console.WriteLine("nao deveria chegar aqui");
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine("cadeia cancelou");
            }

            Console.WriteLine($"parou cedo: {c.Passos < 50}");
        }

        c.Zerar();

        using (var cts = new CancellationTokenSource())
        {
            Task tarefa = c.SemTokenAsync(6, cts.Token);
            await Task.Delay(50);
            cts.Cancel();

            await tarefa;
            Console.WriteLine($"corrente quebrada concluiu: {c.Passos}");
        }

        c.Zerar();

        using (var cts = new CancellationTokenSource())
        {
            Task tarefa = c.ComRegistroAsync("conexao", 50, cts.Token);
            await Task.Delay(120);
            cts.Cancel();

            try
            {
                await tarefa;
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine("com registro cancelou");
            }

            Console.WriteLine($"limpezas: {string.Join(",", c.Limpezas)}");
        }

        c.Zerar();

        using (var usuario = new CancellationTokenSource())
        using (var tempo = new CancellationTokenSource(TimeSpan.FromMilliseconds(150)))
        {
            try
            {
                await c.ComTokenLigadoAsync(50, usuario.Token, tempo.Token);
                Console.WriteLine("nao deveria chegar aqui");
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine("ligado cancelou pelo tempo");
            }

            Console.WriteLine($"usuario nao pediu: {usuario.Token.IsCancellationRequested}");
            Console.WriteLine($"tempo pediu: {tempo.Token.IsCancellationRequested}");
            Console.WriteLine($"passos do ligado: {c.Passos < 50}");
        }

        c.Zerar();

        using (var usuario = new CancellationTokenSource())
        using (var tempo = new CancellationTokenSource(TimeSpan.FromMilliseconds(5000)))
        {
            Task tarefa = c.ComTokenLigadoAsync(50, usuario.Token, tempo.Token);
            await Task.Delay(120);
            usuario.Cancel();

            try
            {
                await tarefa;
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine("ligado cancelou pelo usuario");
            }

            Console.WriteLine($"tempo nao estourou: {!tempo.Token.IsCancellationRequested}");
        }

        c.Zerar();
        await c.ControladorAsync(3, CancellationToken.None);
        Console.WriteLine($"sem cancelamento: {c.Passos}");
        Console.WriteLine($"None pode cancelar: {CancellationToken.None.CanBeCanceled}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

class Cadeia
{
    private readonly List<string> limpezas = new();
    private readonly object trava = new();

    public int Passos { get; private set; }
    public IReadOnlyList<string> Limpezas => limpezas;

    public void Zerar()
    {
        Passos = 0;
        limpezas.Clear();
    }

    public async Task ControladorAsync(int passos, CancellationToken ct)
    {
        await ServicoAsync(passos, ct);
    }

    public async Task ServicoAsync(int passos, CancellationToken ct)
    {
        await RepositorioAsync(passos, ct);
    }

    public async Task RepositorioAsync(int passos, CancellationToken ct)
    {
        for (int i = 0; i < passos; i++)
        {
            ct.ThrowIfCancellationRequested();
            await Task.Delay(20, ct);
            Passos++;
        }
    }

    public async Task SemTokenAsync(int passos, CancellationToken ct)
    {
        for (int i = 0; i < passos; i++)
        {
            await Task.Delay(20);
            Passos++;
        }
    }

    public async Task ComRegistroAsync(string nome, int passos, CancellationToken ct)
    {
        using var registro = ct.Register(() =>
        {
            lock (trava)
            {
                limpezas.Add($"limpou {nome}");
            }
        });

        await RepositorioAsync(passos, ct);
    }

    public async Task ComTokenLigadoAsync(int passos, CancellationToken a, CancellationToken b)
    {
        using var combinado = CancellationTokenSource.CreateLinkedTokenSource(a, b);
        await RepositorioAsync(passos, combinado.Token);
    }
}

class Program
{
    static async Task Main()
    {
        var c = new Cadeia();

        c.Zerar();

        using (var cts = new CancellationTokenSource())
        {
            Task tarefa = c.ControladorAsync(50, cts.Token);
            await Task.Delay(120);
            cts.Cancel();

            try
            {
                await tarefa;
                Console.WriteLine("nao deveria chegar aqui");
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine("cadeia cancelou");
            }

            Console.WriteLine($"parou cedo: {c.Passos < 50}");
        }

        c.Zerar();

        using (var cts = new CancellationTokenSource())
        {
            Task tarefa = c.SemTokenAsync(6, cts.Token);
            await Task.Delay(50);
            cts.Cancel();

            await tarefa;
            Console.WriteLine($"corrente quebrada concluiu: {c.Passos}");
        }

        c.Zerar();

        using (var cts = new CancellationTokenSource())
        {
            Task tarefa = c.ComRegistroAsync("conexao", 50, cts.Token);
            await Task.Delay(120);
            cts.Cancel();

            try
            {
                await tarefa;
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine("com registro cancelou");
            }

            Console.WriteLine($"limpezas: {string.Join(",", c.Limpezas)}");
        }

        c.Zerar();

        using (var usuario = new CancellationTokenSource())
        using (var tempo = new CancellationTokenSource(TimeSpan.FromMilliseconds(150)))
        {
            try
            {
                await c.ComTokenLigadoAsync(50, usuario.Token, tempo.Token);
                Console.WriteLine("nao deveria chegar aqui");
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine("ligado cancelou pelo tempo");
            }

            Console.WriteLine($"usuario nao pediu: {usuario.Token.IsCancellationRequested}");
            Console.WriteLine($"tempo pediu: {tempo.Token.IsCancellationRequested}");
            Console.WriteLine($"passos do ligado: {c.Passos < 50}");
        }

        c.Zerar();

        using (var usuario = new CancellationTokenSource())
        using (var tempo = new CancellationTokenSource(TimeSpan.FromMilliseconds(5000)))
        {
            Task tarefa = c.ComTokenLigadoAsync(50, usuario.Token, tempo.Token);
            await Task.Delay(120);
            usuario.Cancel();

            try
            {
                await tarefa;
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine("ligado cancelou pelo usuario");
            }

            Console.WriteLine($"tempo nao estourou: {!tempo.Token.IsCancellationRequested}");
        }

        c.Zerar();
        await c.ControladorAsync(3, CancellationToken.None);
        Console.WriteLine($"sem cancelamento: {c.Passos}");
        Console.WriteLine($"None pode cancelar: {CancellationToken.None.CanBeCanceled}");
      }
}`,
      hints: [
        'As duas camadas do meio não fazem nada além de repassar o token — e é exatamente esse o papel delas.',
        '`SemTokenAsync` chama `Task.Delay(20)` sem o token, então os 6 passos completam mesmo com o cancelamento pedido no meio.',
        'A ação de `Register` roda na thread que chamou `Cancel()`; o `lock` protege a lista contra escrita concorrente.',
        '`CancellationToken.None.CanBeCanceled` é `False` — é o token que nunca cancela, útil como padrão em chamadas que não precisam disso.',
      ],
      tests: [
        {
          name: 'Token pela cadeia',
          expectedStdout:
            'cadeia cancelou\nparou cedo: True\n' +
            'corrente quebrada concluiu: 6\n' +
            'com registro cancelou\nlimpezas: limpou conexao\n' +
            'ligado cancelou pelo tempo\nusuario nao pediu: False\ntempo pediu: True\npassos do ligado: True\n' +
            'ligado cancelou pelo usuario\ntempo nao estourou: True\n' +
            'sem cancelamento: 3\nNone pode cancelar: False',
        },
      ],
      timeoutMs: 15000,
    },
  },

  {
    id: 's09c02l04',
    title: 'Timeout com token',
    objective: 'Impor limite de tempo a operações, comparando a abordagem por token e por corrida.',
    concept: [
      {
        kind: 'text',
        body:
          'Toda operação externa precisa de um limite. Sem ele, uma chamada travada segura um recurso para sempre — e o problema se propaga para quem depende dela.',
      },
      {
        kind: 'text',
        body: 'Existem duas formas de impor o limite, e a diferença entre elas é importante.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Token com prazo',
          code: `using var cts = new CancellationTokenSource(
    TimeSpan.FromMilliseconds(200));

await OperacaoAsync(cts.Token);`,
        },
        right: {
          label: 'Corrida com WhenAny',
          code: `Task op = OperacaoAsync();
Task limite = Task.Delay(200);

if (await Task.WhenAny(op, limite) == limite)
{
    // estourou
}`,
        },
        note: 'A da esquerda **interrompe** a operação; a da direita apenas **para de esperar** por ela.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Essa é a distinção central: com token, a operação recebe o pedido e para. Com `WhenAny`, ela continua rodando até o fim, consumindo recursos que ninguém vai usar.',
      },
      {
        kind: 'table',
        headers: ['', 'Token com prazo', '`WhenAny` com delay'],
        rows: [
          ['interrompe a operação', 'sim', 'não'],
          ['exige cooperação do código', 'sim', 'não'],
          ['funciona com API que ignora token', 'não', 'sim'],
          ['libera recursos da operação', 'sim', 'não'],
        ],
      },
      {
        kind: 'text',
        body:
          'A regra prática: **use token sempre que a operação o aceite**. `WhenAny` fica para quando você não controla o código chamado e ele não oferece cancelamento.',
      },
      {
        kind: 'code',
        code: `using var cts = new CancellationTokenSource(TimeSpan.FromMilliseconds(200));

try
{
    return await OperacaoAsync(cts.Token);
}
catch (OperationCanceledException)
{
    return "tempo esgotado";
}`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Esse `catch` tem um problema: ele não distingue **timeout** de **cancelamento pedido pelo usuário**. Se o método recebe um token externo e você o combina com o do prazo, é preciso consultar qual dos dois disparou.',
      },
      {
        kind: 'code',
        code: `using var prazo = new CancellationTokenSource(TimeSpan.FromMilliseconds(200));
using var combinado = CancellationTokenSource.CreateLinkedTokenSource(
    externo, prazo.Token);

try
{
    return await OperacaoAsync(combinado.Token);
}
catch (OperationCanceledException) when (prazo.IsCancellationRequested)
{
    return "tempo esgotado";
}
catch (OperationCanceledException)
{
    return "cancelado pelo usuario";
}`,
        caption: 'O filtro `when` separa os dois casos consultando qual fonte disparou.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Também existe `CancelAfter`, que agenda o cancelamento numa fonte já criada. É útil quando o prazo só é conhecido depois — `cts.CancelAfter(200)`.',
      },
      {
        kind: 'text',
        body:
          'Sobre a escolha do valor: um limite curto demais transforma lentidão ocasional em erro; longo demais, deixa o sistema travado esperando. A referência costuma ser o tempo típico da operação com folga generosa.',
      },
      {
        kind: 'compare',
        good: `// operacao tipica: 50 ms
// limite: 500 ms
new CancellationTokenSource(500);`,
        bad: `// operacao tipica: 50 ms
// limite: 60 ms
new CancellationTokenSource(60);
// qualquer variacao vira erro`,
        goodLabel: 'Folga de uma ordem de grandeza',
        badLabel: 'Limite apertado',
      },
    ],
    quiz: [
      {
        id: 's09c02l04q1',
        type: 'single',
        prompt: 'Qual a diferença central entre timeout por token e por `WhenAny`?',
        options: [
          { id: 'a', text: 'O token interrompe a operação; o `WhenAny` apenas para de esperar por ela', correct: true },
          { id: 'b', text: 'O token é mais preciso' },
          { id: 'c', text: '`WhenAny` funciona apenas com `Task<T>`' },
          { id: 'd', text: 'Nenhuma: são equivalentes' },
        ],
        explanation:
          'Com `WhenAny`, a operação continua até o fim consumindo recursos. É a alternativa quando o código chamado não aceita token.',
      },
      {
        id: 's09c02l04q2',
        type: 'single',
        prompt: 'Como distinguir timeout de cancelamento do usuário num token ligado?',
        options: [
          { id: 'a', text: 'Consultando `IsCancellationRequested` da fonte do prazo, num filtro `when`', correct: true },
          { id: 'b', text: 'Pelo tipo da exceção' },
          { id: 'c', text: 'Pela mensagem da exceção' },
          { id: 'd', text: 'Não é possível distinguir' },
        ],
        explanation:
          'A exceção é a mesma nos dois casos. A informação de quem disparou está nas fontes, e o filtro `when` é onde consultá-la.',
      },
      {
        id: 's09c02l04q3',
        type: 'single',
        prompt: 'Como escolher o valor de um timeout?',
        options: [
          { id: 'a', text: 'Com folga de cerca de uma ordem de grandeza sobre o tempo típico', correct: true },
          { id: 'b', text: 'Igual ao tempo típico da operação' },
          { id: 'c', text: 'O menor possível' },
          { id: 'd', text: 'Sempre 30 segundos' },
        ],
        explanation:
          'Um limite próximo do tempo típico transforma variação normal em erro. A folga absorve picos sem deixar o sistema travado indefinidamente.',
      },
    ],
    challenge: {
      brief:
        'Implemente timeout das duas formas e demonstre a diferença: com token a operação para; com `WhenAny` ela continua rodando depois de o limite estourar.',
      requirements: [
        '`ComTokenAsync` usa `CancellationTokenSource` com prazo e interrompe a operação.',
        '`ComCorridaAsync` usa `WhenAny` contra `Task.Delay` e não interrompe nada.',
        'Um contador prova que a operação da corrida continuou depois do estouro.',
        '`ComTokenLigadoAsync` distingue timeout de cancelamento externo usando filtro `when`.',
        '`CancelAfter` é usado em ao menos um caso.',
        'Os prazos ficam entre 80 e 300 ms; as operações, entre 30 e 500 ms.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

class Servico
{
    public int PassosComToken { get; private set; }
    public int PassosSemToken { get; private set; }

    public void Zerar()
    {
        PassosComToken = 0;
        PassosSemToken = 0;
    }

    // TODO: <passos> voltas de 20 ms, verificando e repassando o token
    public async Task<string> OperacaoAsync(int passos, CancellationToken ct)
    {
        return "";
    }

    // TODO: <passos> voltas de 20 ms, SEM token; incrementa PassosSemToken
    public async Task<string> OperacaoSemTokenAsync(int passos)
    {
        return "";
    }

    // TODO: CancellationTokenSource com prazo; devolve "tempo esgotado" quando estoura
    public async Task<string> ComTokenAsync(int passos, int limiteMs)
    {
        return "";
    }

    // TODO: WhenAny contra Task.Delay(limiteMs); devolve "tempo esgotado" quando o delay vence
    public async Task<string> ComCorridaAsync(int passos, int limiteMs)
    {
        return "";
    }

    // TODO: liga o token externo com um de prazo; distingue os dois casos com filtro when
    //       -> "tempo esgotado" ou "cancelado pelo usuario"
    public async Task<string> ComTokenLigadoAsync(int passos, int limiteMs, CancellationToken externo)
    {
        return "";
    }

    // TODO: cria a fonte sem prazo e usa CancelAfter(limiteMs)
    public async Task<string> ComCancelAfterAsync(int passos, int limiteMs)
    {
        return "";
    }
}

class Program
{
    static async Task Main()
    {
        var s = new Servico();

        s.Zerar();
        Console.WriteLine($"token dentro: {await s.ComTokenAsync(3, 300)}");
        Console.WriteLine($"passos: {s.PassosComToken}");

        s.Zerar();
        Console.WriteLine($"token estourou: {await s.ComTokenAsync(25, 120)}");
        Console.WriteLine($"parou cedo: {s.PassosComToken < 25}");

        s.Zerar();
        Console.WriteLine($"corrida dentro: {await s.ComCorridaAsync(3, 300)}");

        s.Zerar();
        Console.WriteLine($"corrida estourou: {await s.ComCorridaAsync(10, 100)}");
        int logoApos = s.PassosSemToken;
        await Task.Delay(300);
        Console.WriteLine($"continuou rodando: {s.PassosSemToken > logoApos}");
        Console.WriteLine($"terminou tudo: {s.PassosSemToken == 10}");

        s.Zerar();

        using (var externo = new CancellationTokenSource())
        {
            Console.WriteLine($"ligado por tempo: {await s.ComTokenLigadoAsync(25, 120, externo.Token)}");
        }

        s.Zerar();

        using (var externo = new CancellationTokenSource())
        {
            Task<string> tarefa = s.ComTokenLigadoAsync(25, 5000, externo.Token);
            await Task.Delay(120);
            externo.Cancel();
            Console.WriteLine($"ligado por usuario: {await tarefa}");
        }

        s.Zerar();
        Console.WriteLine($"cancel after dentro: {await s.ComCancelAfterAsync(3, 300)}");

        s.Zerar();
        Console.WriteLine($"cancel after estourou: {await s.ComCancelAfterAsync(25, 120)}");
        Console.WriteLine($"parou cedo: {s.PassosComToken < 25}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

class Servico
{
    public int PassosComToken { get; private set; }
    public int PassosSemToken { get; private set; }

    public void Zerar()
    {
        PassosComToken = 0;
        PassosSemToken = 0;
    }

    public async Task<string> OperacaoAsync(int passos, CancellationToken ct)
    {
        for (int i = 0; i < passos; i++)
        {
            ct.ThrowIfCancellationRequested();
            await Task.Delay(20, ct);
            PassosComToken++;
        }

        return $"concluiu {passos}";
    }

    public async Task<string> OperacaoSemTokenAsync(int passos)
    {
        for (int i = 0; i < passos; i++)
        {
            await Task.Delay(20);
            PassosSemToken++;
        }

        return $"concluiu {passos}";
    }

    public async Task<string> ComTokenAsync(int passos, int limiteMs)
    {
        using var prazo = new CancellationTokenSource(TimeSpan.FromMilliseconds(limiteMs));

        try
        {
            return await OperacaoAsync(passos, prazo.Token);
        }
        catch (OperationCanceledException)
        {
            return "tempo esgotado";
        }
    }

    public async Task<string> ComCorridaAsync(int passos, int limiteMs)
    {
        Task<string> operacao = OperacaoSemTokenAsync(passos);
        Task limite = Task.Delay(limiteMs);

        Task vencedora = await Task.WhenAny(operacao, limite);

        if (vencedora == limite)
        {
            return "tempo esgotado";
        }

        return await operacao;
    }

    public async Task<string> ComTokenLigadoAsync(int passos, int limiteMs, CancellationToken externo)
    {
        using var prazo = new CancellationTokenSource(TimeSpan.FromMilliseconds(limiteMs));
        using var combinado = CancellationTokenSource.CreateLinkedTokenSource(externo, prazo.Token);

        try
        {
            return await OperacaoAsync(passos, combinado.Token);
        }
        catch (OperationCanceledException) when (prazo.IsCancellationRequested)
        {
            return "tempo esgotado";
        }
        catch (OperationCanceledException)
        {
            return "cancelado pelo usuario";
        }
    }

    public async Task<string> ComCancelAfterAsync(int passos, int limiteMs)
    {
        using var prazo = new CancellationTokenSource();
        prazo.CancelAfter(limiteMs);

        try
        {
            return await OperacaoAsync(passos, prazo.Token);
        }
        catch (OperationCanceledException)
        {
            return "tempo esgotado";
        }
    }
}

class Program
{
    static async Task Main()
    {
        var s = new Servico();

        s.Zerar();
        Console.WriteLine($"token dentro: {await s.ComTokenAsync(3, 300)}");
        Console.WriteLine($"passos: {s.PassosComToken}");

        s.Zerar();
        Console.WriteLine($"token estourou: {await s.ComTokenAsync(25, 120)}");
        Console.WriteLine($"parou cedo: {s.PassosComToken < 25}");

        s.Zerar();
        Console.WriteLine($"corrida dentro: {await s.ComCorridaAsync(3, 300)}");

        s.Zerar();
        Console.WriteLine($"corrida estourou: {await s.ComCorridaAsync(10, 100)}");
        int logoApos = s.PassosSemToken;
        await Task.Delay(300);
        Console.WriteLine($"continuou rodando: {s.PassosSemToken > logoApos}");
        Console.WriteLine($"terminou tudo: {s.PassosSemToken == 10}");

        s.Zerar();

        using (var externo = new CancellationTokenSource())
        {
            Console.WriteLine($"ligado por tempo: {await s.ComTokenLigadoAsync(25, 120, externo.Token)}");
        }

        s.Zerar();

        using (var externo = new CancellationTokenSource())
        {
            Task<string> tarefa = s.ComTokenLigadoAsync(25, 5000, externo.Token);
            await Task.Delay(120);
            externo.Cancel();
            Console.WriteLine($"ligado por usuario: {await tarefa}");
        }

        s.Zerar();
        Console.WriteLine($"cancel after dentro: {await s.ComCancelAfterAsync(3, 300)}");

        s.Zerar();
        Console.WriteLine($"cancel after estourou: {await s.ComCancelAfterAsync(25, 120)}");
        Console.WriteLine($"parou cedo: {s.PassosComToken < 25}");
    }
}`,
      hints: [
        'A operação da corrida usa `OperacaoSemTokenAsync` de propósito: é ela que continua rodando depois do estouro, e o contador prova isso.',
        'O filtro `catch (...) when (prazo.IsCancellationRequested)` precisa vir **antes** do `catch` genérico da mesma exceção.',
        '`CancelAfter` faz o mesmo que passar o prazo no construtor, mas permite decidir o valor depois de criar a fonte.',
        'Os 25 passos de 20 ms dariam 500 ms; com prazo de 120 ms, a operação para por volta do quinto passo.',
      ],
      tests: [
        {
          name: 'Timeout de duas formas',
          expectedStdout:
            'token dentro: concluiu 3\npassos: 3\n' +
            'token estourou: tempo esgotado\nparou cedo: True\n' +
            'corrida dentro: concluiu 3\n' +
            'corrida estourou: tempo esgotado\ncontinuou rodando: True\nterminou tudo: True\n' +
            'ligado por tempo: tempo esgotado\n' +
            'ligado por usuario: cancelado pelo usuario\n' +
            'cancel after dentro: concluiu 3\n' +
            'cancel after estourou: tempo esgotado\nparou cedo: True',
        },
      ],
      timeoutMs: 15000,
    },
  },

  {
    id: 's09c02l05',
    title: 'Relatando progresso',
    objective: 'Informar o andamento de uma operação longa sem acoplar o trabalho à forma de exibição.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma operação longa precisa contar como está indo. A tentação é fazer o método imprimir direto — e isso acopla o trabalho a uma forma específica de exibir.',
      },
      {
        kind: 'compare',
        good: `static async Task TrabalhoAsync(
    int passos, IProgress<int> progresso)
{
    for (int i = 1; i <= passos; i++)
    {
        await Task.Delay(20);
        progresso?.Report(i);
    }
}`,
        bad: `static async Task TrabalhoAsync(int passos)
{
    for (int i = 1; i <= passos; i++)
    {
        await Task.Delay(20);
        Console.WriteLine($"passo {i}");
    }
}`,
        goodLabel: 'Relata; quem chama decide',
        badLabel: 'Imprime; serve para um caso só',
      },
      {
        kind: 'text',
        body:
          '`IProgress<T>` tem um membro só: `Report(T)`. Quem executa relata; quem chamou decide o que fazer com a informação — imprimir, atualizar uma barra, ignorar.',
      },
      {
        kind: 'code',
        code: `var relatos = new List<int>();
var progresso = new Progress<int>(v => relatos.Add(v));

await TrabalhoAsync(5, progresso);`,
        caption: '`Progress<T>` é a implementação padrão: ela recebe a ação no construtor.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`Progress<T>` invoca a ação no **contexto de sincronização capturado na construção**. Em programas de console isso significa o pool de threads — e os relatos podem chegar em ordem diferente, ou depois de a operação terminar.',
      },
      {
        kind: 'text',
        body:
          'Essa é a armadilha que mais surpreende: o relato é **assíncrono**. Verificar a lista de relatos imediatamente após o `await` pode encontrá-la incompleta.',
      },
      {
        kind: 'code',
        code: `await TrabalhoAsync(5, progresso);

// relatos.Count pode ser menor que 5 aqui
await Task.Delay(50);
// agora sim`,
        caption: 'Num teste, uma pequena espera depois da operação garante que os relatos chegaram.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Quando o relato precisa ser síncrono e ordenado, implemente `IProgress<T>` você mesmo: uma classe cujo `Report` escreve direto numa lista, sem agendar nada. É o que fazemos no desafio.',
      },
      {
        kind: 'text',
        body:
          'O tipo do progresso é seu para escolher. Um `int` de porcentagem serve para o caso simples; um tipo próprio carrega muito mais.',
      },
      {
        kind: 'code',
        code: `record Andamento(int Atual, int Total, string Etapa)
{
    public int Porcentagem => Total == 0 ? 0 : Atual * 100 / Total;
}

progresso?.Report(new Andamento(i, passos, "processando"));`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O `?.` antes de `Report` não é decoração: o parâmetro de progresso costuma ser opcional, e quem não se importa passa `null`. O método precisa funcionar nos dois casos.',
      },
      {
        kind: 'text',
        body:
          'Progresso e cancelamento andam juntos: os dois são formas de a operação conversar com quem a iniciou. A assinatura completa de um método longo costuma ter os dois.',
      },
      {
        kind: 'code',
        code: `static async Task<int> ProcessarAsync(
    IReadOnlyList<string> itens,
    IProgress<Andamento>? progresso = null,
    CancellationToken ct = default)`,
        caption: 'Progresso antes, token depois — é a ordem convencional no framework.',
      },
    ],
    quiz: [
      {
        id: 's09c02l05q1',
        type: 'single',
        prompt: 'Por que usar `IProgress<T>` em vez de imprimir direto?',
        options: [
          { id: 'a', text: 'Desacopla o trabalho da forma de exibir: quem chama decide', correct: true },
          { id: 'b', text: 'É mais rápido que `Console.WriteLine`' },
          { id: 'c', text: 'Porque `Console.WriteLine` não funciona em métodos `async`' },
          { id: 'd', text: 'Para evitar bloqueio de thread' },
        ],
        explanation:
          'O mesmo método passa a servir para console, interface gráfica, log ou teste — sem alteração. É inversão de dependência aplicada ao progresso.',
      },
      {
        id: 's09c02l05q2',
        type: 'single',
        prompt: 'Por que os relatos de `Progress<T>` podem chegar depois do fim da operação?',
        options: [
          { id: 'a', text: 'Ele agenda a invocação no contexto capturado, de forma assíncrona', correct: true },
          { id: 'b', text: 'Porque `Report` é lento' },
          { id: 'c', text: 'Porque a lista de relatos tem buffer' },
          { id: 'd', text: 'Não podem: `Report` é síncrono' },
        ],
        explanation:
          'É o comportamento de `Progress<T>` especificamente. Uma implementação própria de `IProgress<T>` pode ser síncrona e ordenada.',
      },
      {
        id: 's09c02l05q3',
        type: 'single',
        prompt: 'Qual a ordem convencional dos parâmetros num método longo?',
        options: [
          { id: 'a', text: 'Dados, progresso, token — nessa ordem', correct: true },
          { id: 'b', text: 'Token, progresso, dados' },
          { id: 'c', text: 'Progresso, token, dados' },
          { id: 'd', text: 'Não há convenção' },
        ],
        explanation:
          'O token é sempre o último parâmetro, por convenção do framework. O progresso vem logo antes dele, depois dos dados de entrada.',
      },
    ],
    challenge: {
      brief:
        'Implemente uma operação longa que relata progresso de forma desacoplada, com um tipo de andamento próprio, uma implementação síncrona de `IProgress<T>` e suporte a cancelamento.',
      requirements: [
        '`Andamento` é um `record` com item atual, total, etapa e porcentagem calculada.',
        '`ColetorSincrono` implementa `IProgress<Andamento>` gravando direto numa lista, sem agendar.',
        '`ProcessarAsync` aceita progresso e token, ambos opcionais, na ordem convencional.',
        'O método funciona com `null` no progresso, sem lançar.',
        'O progresso é relatado a cada item, com a etapa correta.',
        'Ao cancelar, os relatos já emitidos permanecem — e a porcentagem final é parcial.',
        'A porcentagem de um total zero é 0, sem divisão por zero.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

// TODO: Atual, Total, Etapa; Porcentagem calculada (0 quando Total e 0)
record Andamento(int Atual, int Total, string Etapa)
{
    public int Porcentagem => 0;
    public override string ToString() => $"{Etapa} {Atual}/{Total} ({Porcentagem}%)";
}

// TODO: IProgress<Andamento> sincrono: grava direto na lista
class ColetorSincrono : IProgress<Andamento>
{
    private readonly List<Andamento> relatos = new();

    public IReadOnlyList<Andamento> Relatos => relatos;

    public void Report(Andamento valor)
    {
    }
}

class Processador
{
    public int Processados { get; private set; }

    public void Zerar() => Processados = 0;

    // TODO: para cada item: verifica o token, espera 20 ms, incrementa,
    //       relata Andamento(i, total, "processando");
    //       ao final relata Andamento(total, total, "concluido")
    public async Task<int> ProcessarAsync(
        IReadOnlyList<string> itens,
        IProgress<Andamento> progresso = null,
        CancellationToken ct = default)
    {
        return 0;
    }
}

class Program
{
    static async Task Main()
    {
        var p = new Processador();
        var itens = new List<string> { "a", "b", "c", "d" };

        var coletor = new ColetorSincrono();
        Console.WriteLine($"processados: {await p.ProcessarAsync(itens, coletor)}");
        Console.WriteLine($"relatos: {coletor.Relatos.Count}");

        foreach (Andamento a in coletor.Relatos)
        {
            Console.WriteLine($"  {a}");
        }

        Console.WriteLine($"ultima etapa: {coletor.Relatos.Last().Etapa}");
        Console.WriteLine($"chegou a 100: {coletor.Relatos.Last().Porcentagem}");

        p.Zerar();
        Console.WriteLine($"sem progresso: {await p.ProcessarAsync(itens)}");

        p.Zerar();
        var vazio = new ColetorSincrono();
        Console.WriteLine($"lista vazia: {await p.ProcessarAsync(new List<string>(), vazio)}");
        Console.WriteLine($"relatos do vazio: {vazio.Relatos.Count}");
        Console.WriteLine($"porcentagem do vazio: {vazio.Relatos.Last().Porcentagem}");

        p.Zerar();
        var parcial = new ColetorSincrono();

        using (var cts = new CancellationTokenSource())
        {
            var muitos = Enumerable.Range(1, 30).Select(i => $"item{i}").ToList();
            Task<int> tarefa = p.ProcessarAsync(muitos, parcial, cts.Token);
            await Task.Delay(120);
            cts.Cancel();

            try
            {
                await tarefa;
                Console.WriteLine("nao deveria chegar aqui");
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine("cancelado no meio");
            }
        }

        Console.WriteLine($"relatos parciais: {parcial.Relatos.Count > 0}");
        Console.WriteLine($"nao chegou ao fim: {parcial.Relatos.All(r => r.Etapa != "concluido")}");
        Console.WriteLine($"porcentagem parcial: {parcial.Relatos.Last().Porcentagem < 100}");

        var direto = new Andamento(3, 4, "teste");
        Console.WriteLine($"calculo: {direto}");
        Console.WriteLine($"zero: {new Andamento(0, 0, "vazio")}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

record Andamento(int Atual, int Total, string Etapa)
{
    public int Porcentagem => Total == 0 ? 0 : Atual * 100 / Total;
    public override string ToString() => $"{Etapa} {Atual}/{Total} ({Porcentagem}%)";
}

class ColetorSincrono : IProgress<Andamento>
{
    private readonly List<Andamento> relatos = new();

    public IReadOnlyList<Andamento> Relatos => relatos;

    public void Report(Andamento valor)
    {
        relatos.Add(valor);
    }
}

class Processador
{
    public int Processados { get; private set; }

    public void Zerar() => Processados = 0;

    public async Task<int> ProcessarAsync(
        IReadOnlyList<string> itens,
        IProgress<Andamento> progresso = null,
        CancellationToken ct = default)
    {
        for (int i = 1; i <= itens.Count; i++)
        {
            ct.ThrowIfCancellationRequested();
            await Task.Delay(20, ct);
            Processados++;
            progresso?.Report(new Andamento(i, itens.Count, "processando"));
        }

        progresso?.Report(new Andamento(itens.Count, itens.Count, "concluido"));
        return Processados;
    }
}

class Program
{
    static async Task Main()
    {
        var p = new Processador();
        var itens = new List<string> { "a", "b", "c", "d" };

        var coletor = new ColetorSincrono();
        Console.WriteLine($"processados: {await p.ProcessarAsync(itens, coletor)}");
        Console.WriteLine($"relatos: {coletor.Relatos.Count}");

        foreach (Andamento a in coletor.Relatos)
        {
            Console.WriteLine($"  {a}");
        }

        Console.WriteLine($"ultima etapa: {coletor.Relatos.Last().Etapa}");
        Console.WriteLine($"chegou a 100: {coletor.Relatos.Last().Porcentagem}");

        p.Zerar();
        Console.WriteLine($"sem progresso: {await p.ProcessarAsync(itens)}");

        p.Zerar();
        var vazio = new ColetorSincrono();
        Console.WriteLine($"lista vazia: {await p.ProcessarAsync(new List<string>(), vazio)}");
        Console.WriteLine($"relatos do vazio: {vazio.Relatos.Count}");
        Console.WriteLine($"porcentagem do vazio: {vazio.Relatos.Last().Porcentagem}");

        p.Zerar();
        var parcial = new ColetorSincrono();

        using (var cts = new CancellationTokenSource())
        {
            var muitos = Enumerable.Range(1, 30).Select(i => $"item{i}").ToList();
            Task<int> tarefa = p.ProcessarAsync(muitos, parcial, cts.Token);
            await Task.Delay(120);
            cts.Cancel();

            try
            {
                await tarefa;
                Console.WriteLine("nao deveria chegar aqui");
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine("cancelado no meio");
            }
        }

        Console.WriteLine($"relatos parciais: {parcial.Relatos.Count > 0}");
        Console.WriteLine($"nao chegou ao fim: {parcial.Relatos.All(r => r.Etapa != "concluido")}");
        Console.WriteLine($"porcentagem parcial: {parcial.Relatos.Last().Porcentagem < 100}");

        var direto = new Andamento(3, 4, "teste");
        Console.WriteLine($"calculo: {direto}");
        Console.WriteLine($"zero: {new Andamento(0, 0, "vazio")}");
    }
}`,
      hints: [
        '`ColetorSincrono.Report` apenas adiciona à lista — sem agendamento, os relatos chegam na ordem e antes de o `await` retornar.',
        '`progresso?.Report(...)` com `?.` é o que permite passar `null` quando o progresso não interessa.',
        'A lista vazia ainda gera **um** relato: o de conclusão, com `Total` zero e porcentagem 0.',
        '30 itens de 20 ms dariam 600 ms; cancelando em 120 ms, sobram relatos parciais e nenhum "concluido".',
      ],
      tests: [
        {
          name: 'Relato de progresso',
          expectedStdout:
            'processados: 4\nrelatos: 5\n' +
            '  processando 1/4 (25%)\n  processando 2/4 (50%)\n  processando 3/4 (75%)\n' +
            '  processando 4/4 (100%)\n  concluido 4/4 (100%)\n' +
            'ultima etapa: concluido\nchegou a 100: 100\n' +
            'sem progresso: 4\n' +
            'lista vazia: 0\nrelatos do vazio: 1\nporcentagem do vazio: 0\n' +
            'cancelado no meio\nrelatos parciais: True\nnao chegou ao fim: True\nporcentagem parcial: True\n' +
            'calculo: teste 3/4 (75%)\nzero: vazio 0/0 (0%)',
        },
      ],
      timeoutMs: 15000,
    },
  },

  {
    id: 's09c02l06',
    title: 'Task.Run e trabalho de CPU',
    objective: 'Mover trabalho pesado para o pool de threads, e saber quando isso ajuda e quando atrapalha.',
    concept: [
      {
        kind: 'text',
        body:
          'Até aqui, `async` tratou de **espera**. Trabalho de CPU é o oposto: nada a esperar, tudo a calcular. `Task.Run` agenda esse trabalho no pool de threads.',
      },
      {
        kind: 'code',
        code: `int resultado = await Task.Run(() =>
{
    long soma = 0;

    for (int i = 0; i < 1_000_000; i++)
    {
        soma += i;
    }

    return (int)(soma % 997);
});`,
        caption: 'A thread que chamou fica livre; o cálculo roda numa thread do pool.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`Task.Run` **não deixa o cálculo mais rápido** — ele apenas o move de thread. O trabalho total é o mesmo; o que muda é quem fica ocupado.',
      },
      {
        kind: 'text',
        body:
          'Isso torna a decisão dependente de onde o código roda. Em aplicações com interface gráfica o ganho é claro; em servidores, costuma ser prejuízo.',
      },
      {
        kind: 'table',
        headers: ['Contexto', 'Vale a pena?', 'Por quê'],
        rows: [
          ['interface gráfica', 'sim', 'a thread de UI fica livre e a tela não congela'],
          ['servidor web', 'quase nunca', 'a requisição já está numa thread do pool'],
          ['console', 'raramente', 'não há thread privilegiada a proteger'],
          ['paralelizar cálculo', 'não', 'use `Parallel` ou PLINQ'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Em servidor, `Task.Run` costuma **piorar**: você libera uma thread do pool para ocupar outra thread do mesmo pool, pagando a troca de contexto sem ganhar nada.',
      },
      {
        kind: 'text',
        body:
          'O erro simétrico é envolver trabalho de E/S em `Task.Run`. Uma operação assíncrona já não bloqueia; embrulhá-la só adiciona uma thread desnecessária.',
      },
      {
        kind: 'compare',
        good: `string dados = await LerArquivoAsync(caminho);`,
        bad: `string dados = await Task.Run(
    () => LerArquivo(caminho));
// ocupa uma thread inteira
// para esperar o disco`,
        goodLabel: 'E/S assíncrona de verdade',
        badLabel: 'E/S bloqueante embrulhada',
      },
      {
        kind: 'text',
        body:
          'A lambda de `Task.Run` pode ser assíncrona, e nesse caso o retorno é desembrulhado automaticamente — não vira `Task<Task<T>>`.',
      },
      {
        kind: 'code',
        code: `int valor = await Task.Run(async () =>
{
    await Task.Delay(10);
    return 7;
});`,
        caption: 'A sobrecarga que aceita `Func<Task<T>>` cuida do desembrulho.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Exceções lançadas dentro de `Task.Run` ficam guardadas na tarefa e são relançadas no `await` — o mesmo comportamento de qualquer método assíncrono. Elas **não** derrubam o processo, ao contrário do que aconteceria numa thread crua.',
      },
      {
        kind: 'text',
        body:
          'Para cálculos longos que precisam responder a cancelamento, o token entra dentro da lambda: `Task.Run` não interrompe nada sozinho.',
      },
      {
        kind: 'code',
        code: `await Task.Run(() =>
{
    for (int i = 0; i < n; i++)
    {
        ct.ThrowIfCancellationRequested();
        Calcular(i);
    }
}, ct);`,
        caption: 'O token no segundo parâmetro impede que a tarefa **inicie** se já estiver cancelada; a verificação interna cuida do resto.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A regra em uma frase: **`async` para esperar, `Task.Run` para calcular fora da thread atual, `Parallel` para calcular em várias ao mesmo tempo**. Confundir os três é a origem da maioria dos problemas de desempenho em código assíncrono.',
      },
    ],
    quiz: [
      {
        id: 's09c02l06q1',
        type: 'single',
        prompt: '`Task.Run` torna um cálculo mais rápido?',
        options: [
          { id: 'a', text: 'Não: ele apenas move o trabalho para outra thread', correct: true },
          { id: 'b', text: 'Sim: o pool otimiza o cálculo' },
          { id: 'c', text: 'Sim: ele paraleliza automaticamente' },
          { id: 'd', text: 'Depende do número de núcleos' },
        ],
        explanation:
          'O trabalho total não muda. Para usar vários núcleos, é preciso dividir o problema — o que `Parallel` e PLINQ fazem.',
      },
      {
        id: 's09c02l06q2',
        type: 'single',
        prompt: 'Por que `Task.Run` costuma ser prejudicial num servidor web?',
        options: [
          { id: 'a', text: 'A requisição já está numa thread do pool; trocar de thread só custa', correct: true },
          { id: 'b', text: 'Porque servidores não têm pool de threads' },
          { id: 'c', text: 'Porque `Task.Run` bloqueia a porta' },
          { id: 'd', text: 'Não é prejudicial: é recomendado' },
        ],
        explanation:
          'Você libera uma thread do pool para ocupar outra do mesmo pool. O ganho seria real se houvesse uma thread privilegiada a proteger — como a de interface gráfica.',
      },
      {
        id: 's09c02l06q3',
        type: 'single',
        prompt: 'O que `Task.Run(() => LerArquivo(caminho))` tem de errado?',
        options: [
          { id: 'a', text: 'Ocupa uma thread inteira para esperar o disco; a versão assíncrona não ocupa nenhuma', correct: true },
          { id: 'b', text: 'Não compila' },
          { id: 'c', text: 'Não pode ser aguardado' },
          { id: 'd', text: 'Nada: é o uso correto' },
        ],
        explanation:
          'Embrulhar E/S bloqueante em `Task.Run` dá aparência de assíncrono sem o benefício. A operação assíncrona nativa é a resposta.',
      },
    ],
    challenge: {
      brief:
        'Compare os três modos de trabalho: espera assíncrona, cálculo na thread atual e cálculo movido para o pool — medindo qual thread executou cada parte e como o cancelamento se comporta.',
      requirements: [
        '`CalcularNaThreadAtualAsync` faz o cálculo sem `Task.Run`.',
        '`CalcularNoPoolAsync` usa `Task.Run` e devolve o mesmo resultado.',
        'Os dois resultados precisam ser idênticos.',
        '`EhDoPool` registra se a execução aconteceu numa thread do pool.',
        '`ComTokenAsync` verifica o token dentro da lambda de `Task.Run`.',
        '`ComLambdaAsync` usa uma lambda assíncrona dentro de `Task.Run`.',
        'Exceções de dentro de `Task.Run` são capturadas normalmente no `await`.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

class Calculadora
{
    public bool UltimaFoiDoPool { get; private set; }
    public int PassosCalculados { get; private set; }

    public void Zerar()
    {
        PassosCalculados = 0;
    }

    // TODO: soma 0..n-1 e devolve (int)(soma % 997); incrementa PassosCalculados
    private int Calcular(int n)
    {
        return 0;
    }

    // TODO: calcula direto, sem Task.Run; registra UltimaFoiDoPool
    public async Task<int> CalcularNaThreadAtualAsync(int n)
    {
        return 0;
    }

    // TODO: calcula dentro de Task.Run; registra UltimaFoiDoPool
    public async Task<int> CalcularNoPoolAsync(int n)
    {
        return 0;
    }

    // TODO: Task.Run com token no segundo parametro e verificacao dentro da lambda;
    //       soma 0..n-1 verificando o token a cada 1000 iteracoes
    public async Task<long> ComTokenAsync(int n, CancellationToken ct)
    {
        return 0;
    }

    // TODO: Task.Run com lambda assincrona: espera 20 ms e devolve n * 2
    public async Task<int> ComLambdaAsync(int n)
    {
        return 0;
    }

    // TODO: Task.Run que lanca ArgumentException("valor invalido")
    public async Task<int> QueFalhaAsync()
    {
        return 0;
    }
}

class Program
{
    static async Task Main()
    {
        var c = new Calculadora();

        c.Zerar();
        int atual = await c.CalcularNaThreadAtualAsync(100000);
        bool poolAtual = c.UltimaFoiDoPool;

        c.Zerar();
        int pool = await c.CalcularNoPoolAsync(100000);
        bool poolPool = c.UltimaFoiDoPool;

        Console.WriteLine($"resultados iguais: {atual == pool}");
        Console.WriteLine($"resultado: {atual}");
        Console.WriteLine($"pool executou no pool: {poolPool}");
        Console.WriteLine($"passos iguais: {c.PassosCalculados}");

        Console.WriteLine($"lambda async: {await c.ComLambdaAsync(21)}");

        using (var cts = new CancellationTokenSource())
        {
            Console.WriteLine($"com token completo: {await c.ComTokenAsync(10000, cts.Token)}");
        }

        using (var jaCancelado = new CancellationTokenSource())
        {
            jaCancelado.Cancel();

            try
            {
                await c.ComTokenAsync(10000, jaCancelado.Token);
                Console.WriteLine("nao deveria chegar aqui");
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine("token ja cancelado: nem iniciou");
            }
        }

        try
        {
            await c.QueFalhaAsync();
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"excecao do Task.Run: {ex.Message}");
        }

        var tarefas = new List<Task<int>>
        {
            c.CalcularNoPoolAsync(50000),
            c.CalcularNoPoolAsync(50000),
        };

        int[] resultados = await Task.WhenAll(tarefas);
        Console.WriteLine($"paralelo iguais: {resultados[0] == resultados[1]}");
        Console.WriteLine($"programa continua respondendo: True");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

class Calculadora
{
    public bool UltimaFoiDoPool { get; private set; }
    public int PassosCalculados { get; private set; }

    public void Zerar()
    {
        PassosCalculados = 0;
    }

    private int Calcular(int n)
    {
        long soma = 0;

        for (int i = 0; i < n; i++)
        {
            soma += i;
        }

        PassosCalculados = n;
        return (int)(soma % 997);
    }

    public async Task<int> CalcularNaThreadAtualAsync(int n)
    {
        await Task.Delay(10);
        UltimaFoiDoPool = Thread.CurrentThread.IsThreadPoolThread;
        return Calcular(n);
    }

    public async Task<int> CalcularNoPoolAsync(int n)
    {
        return await Task.Run(() =>
        {
            UltimaFoiDoPool = Thread.CurrentThread.IsThreadPoolThread;
            return Calcular(n);
        });
    }

    public async Task<long> ComTokenAsync(int n, CancellationToken ct)
    {
        return await Task.Run(
            () =>
            {
                long soma = 0;

                for (int i = 0; i < n; i++)
                {
                    if (i % 1000 == 0)
                    {
                        ct.ThrowIfCancellationRequested();
                    }

                    soma += i;
                }

                return soma;
            },
            ct);
    }

    public async Task<int> ComLambdaAsync(int n)
    {
        return await Task.Run(async () =>
        {
            await Task.Delay(20);
            return n * 2;
        });
    }

    public async Task<int> QueFalhaAsync()
    {
        return await Task.Run<int>(() => throw new ArgumentException("valor invalido"));
    }
}

class Program
{
    static async Task Main()
    {
        var c = new Calculadora();

        c.Zerar();
        int atual = await c.CalcularNaThreadAtualAsync(100000);
        bool poolAtual = c.UltimaFoiDoPool;

        c.Zerar();
        int pool = await c.CalcularNoPoolAsync(100000);
        bool poolPool = c.UltimaFoiDoPool;

        Console.WriteLine($"resultados iguais: {atual == pool}");
        Console.WriteLine($"resultado: {atual}");
        Console.WriteLine($"pool executou no pool: {poolPool}");
        Console.WriteLine($"passos iguais: {c.PassosCalculados}");

        Console.WriteLine($"lambda async: {await c.ComLambdaAsync(21)}");

        using (var cts = new CancellationTokenSource())
        {
            Console.WriteLine($"com token completo: {await c.ComTokenAsync(10000, cts.Token)}");
        }

        using (var jaCancelado = new CancellationTokenSource())
        {
            jaCancelado.Cancel();

            try
            {
                await c.ComTokenAsync(10000, jaCancelado.Token);
                Console.WriteLine("nao deveria chegar aqui");
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine("token ja cancelado: nem iniciou");
            }
        }

        try
        {
            await c.QueFalhaAsync();
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"excecao do Task.Run: {ex.Message}");
        }

        var tarefas = new List<Task<int>>
        {
            c.CalcularNoPoolAsync(50000),
            c.CalcularNoPoolAsync(50000),
        };

        int[] resultados = await Task.WhenAll(tarefas);
        Console.WriteLine($"paralelo iguais: {resultados[0] == resultados[1]}");
        Console.WriteLine($"programa continua respondendo: True");
    }
}`,
      hints: [
        'Passar o token no **segundo parâmetro** de `Task.Run` faz a tarefa nem iniciar quando ele já está cancelado — daí a mensagem "nem iniciou".',
        'A verificação a cada 1000 iterações equilibra custo e responsividade: verificar a cada volta num laço apertado é caro.',
        '`Task.Run<int>(() => throw ...)` precisa do tipo explícito, porque uma lambda que só lança não permite inferir o retorno.',
        'A soma de 0 a 99.999 é 4.999.950.000; o resto por 997 é o que os dois métodos devem devolver.',
      ],
      tests: [
        {
          name: 'Trabalho de CPU',
          expectedStdout:
            'resultados iguais: True\nresultado: 573\npool executou no pool: True\npassos iguais: 100000\n' +
            'lambda async: 42\n' +
            'com token completo: 49995000\n' +
            'token ja cancelado: nem iniciou\n' +
            'excecao do Task.Run: valor invalido\n' +
            'paralelo iguais: True\nprograma continua respondendo: True',
        },
      ],
      timeoutMs: 15000,
    },
  },

  {
    id: 's09c02l07',
    title: 'Contexto de sincronização',
    objective: 'Entender o que decide em qual thread o código depois de um `await` executa.',
    concept: [
      {
        kind: 'text',
        body:
          'Depois de um `await`, o código precisa continuar em algum lugar. Quem decide isso é o **contexto de sincronização** — e conhecê-lo explica travamentos que parecem mágicos.',
      },
      {
        kind: 'table',
        headers: ['Ambiente', 'Contexto', 'Continua em'],
        rows: [
          ['console', 'nenhum', 'qualquer thread do pool'],
          ['interface gráfica', 'o da UI', 'sempre a thread da interface'],
          ['ASP.NET Core', 'nenhum', 'qualquer thread do pool'],
          ['ASP.NET clássico', 'o da requisição', 'a mesma thread'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Num programa de console — como este ambiente —, **não há contexto**. O código depois do `await` roda em alguma thread do pool, possivelmente diferente da anterior. Isso é normal e não causa problema.',
      },
      {
        kind: 'text',
        body:
          'Em ambientes **com** contexto, o comportamento é o oposto: o `await` captura o contexto e volta para ele. Numa aplicação gráfica, isso é o que permite atualizar a tela depois de uma operação assíncrona.',
      },
      {
        kind: 'code',
        code: `// numa aplicacao grafica:
private async void Botao_Click(object s, EventArgs e)
{
    var dados = await BuscarAsync();

    rotulo.Text = dados;   // funciona: voltamos a thread da UI
}`,
      },
      {
        kind: 'text',
        body:
          'O problema surge quando alguém **bloqueia** a thread do contexto esperando uma operação que precisa voltar para ela. É o impasse clássico do `.Result`.',
      },
      {
        kind: 'compare',
        good: `var dados = await BuscarAsync();`,
        bad: `var dados = BuscarAsync().Result;
// a thread da UI espera a operacao;
// a operacao espera a thread da UI;
// travamento permanente`,
        goodLabel: 'Aguarda cedendo a thread',
        badLabel: 'Bloqueia e trava',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Esse impasse **não acontece** em console nem em ASP.NET Core, porque não há contexto para voltar. É por isso que o mesmo código funciona num teste e trava na aplicação real — um dos bugs mais frustrantes que existem.',
      },
      {
        kind: 'text',
        body:
          'A ferramenta para dizer "não preciso voltar ao contexto" é `ConfigureAwait(false)`. Ela instrui o `await` a continuar em qualquer thread disponível.',
      },
      {
        kind: 'code',
        code: `var dados = await BuscarAsync().ConfigureAwait(false);

// daqui em diante, nao estamos
// necessariamente na thread original`,
      },
      {
        kind: 'table',
        headers: ['Onde', 'Usar `ConfigureAwait(false)`?'],
        rows: [
          ['código de biblioteca', 'sim — ela não sabe quem a chama'],
          ['código de aplicação com UI', 'não — você precisa voltar à thread da UI'],
          ['console e ASP.NET Core', 'indiferente — não há contexto'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A regra prática: **bibliotecas usam `ConfigureAwait(false)` em todos os `await`; aplicações não usam**. Uma biblioteca que esquece isso pode causar impasse no código de quem a consome.',
      },
      {
        kind: 'text',
        body:
          'Vale registrar o que **não** muda: `ConfigureAwait(false)` não torna nada paralelo, não cria threads e não altera o resultado. Ele só afeta onde a continuação executa.',
      },
    ],
    quiz: [
      {
        id: 's09c02l07q1',
        type: 'single',
        prompt: 'Num programa de console, onde o código depois de um `await` executa?',
        options: [
          { id: 'a', text: 'Em qualquer thread do pool — não há contexto para voltar', correct: true },
          { id: 'b', text: 'Sempre na thread principal' },
          { id: 'c', text: 'Sempre numa thread nova' },
          { id: 'd', text: 'Na mesma thread de antes do `await`' },
        ],
        explanation:
          'Console não tem contexto de sincronização. Por isso o impasse do `.Result` não se manifesta ali — e o bug só aparece na aplicação real.',
      },
      {
        id: 's09c02l07q2',
        type: 'single',
        prompt: 'Por que `.Result` pode travar uma aplicação gráfica?',
        options: [
          { id: 'a', text: 'A thread da UI bloqueia esperando uma operação que precisa voltar a essa mesma thread', correct: true },
          { id: 'b', text: 'Porque `.Result` cria uma thread nova' },
          { id: 'c', text: 'Porque a UI não suporta tarefas' },
          { id: 'd', text: 'Porque `.Result` sempre lança exceção' },
        ],
        explanation:
          'É um impasse circular: cada lado espera o outro. Como não há timeout, a aplicação congela permanentemente.',
      },
      {
        id: 's09c02l07q3',
        type: 'single',
        prompt: 'Onde usar `ConfigureAwait(false)`?',
        options: [
          { id: 'a', text: 'Em código de biblioteca, que não sabe quem a chama', correct: true },
          { id: 'b', text: 'Em toda parte, sempre' },
          { id: 'c', text: 'Apenas em código de interface gráfica' },
          { id: 'd', text: 'Nunca: é um recurso obsoleto' },
        ],
        explanation:
          'A biblioteca não precisa do contexto de quem a chamou, e liberá-lo evita impasse e melhora o desempenho. Numa aplicação com UI, você **quer** voltar à thread original.',
      },
    ],
    challenge: {
      brief:
        'Observe o comportamento de thread ao redor dos `await` neste ambiente sem contexto: identifique threads, compare com e sem `ConfigureAwait`, e prove que o resultado não muda.',
      requirements: [
        '`IdentificarAsync` registra o id da thread antes e depois de um `await`.',
        '`ComConfigureAsync` faz o mesmo usando `ConfigureAwait(false)`.',
        'Os dois devolvem o mesmo resultado — a configuração não afeta o valor.',
        '`SemContexto` confirma que `SynchronizationContext.Current` é nulo neste ambiente.',
        '`SempreNoPool` verifica que as continuações rodam em threads do pool.',
        '`VariasEtapasAsync` registra a thread de cada etapa de uma cadeia.',
        'Nenhum uso de `.Result` — a lição explica por que ele trava, mas não o demonstra.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

class Observador
{
    private readonly List<string> registros = new();
    private readonly object trava = new();

    public IReadOnlyList<string> Registros => registros;

    private void Anotar(string etapa)
    {
        lock (trava)
        {
            registros.Add($"{etapa}:pool={Thread.CurrentThread.IsThreadPoolThread}");
        }
    }

    public void Limpar() => registros.Clear();

    // TODO: anota "antes", espera 20 ms, anota "depois", devolve <valor> * 2
    public async Task<int> IdentificarAsync(int valor)
    {
        return 0;
    }

    // TODO: mesma coisa, mas com ConfigureAwait(false) no await
    public async Task<int> ComConfigureAsync(int valor)
    {
        return 0;
    }

    // TODO: tres awaits em sequencia, anotando "e1", "e2" e "e3" depois de cada um;
    //       devolve a soma dos tres valores recebidos
    public async Task<int> VariasEtapasAsync()
    {
        return 0;
    }

    // TODO: true quando SynchronizationContext.Current e nulo
    public static bool SemContexto()
    {
        return false;
    }

    // TODO: true quando todos os registros marcam pool=True
    public bool SempreNoPool()
    {
        return false;
    }
}

class Program
{
    static async Task Main()
    {
        var o = new Observador();

        Console.WriteLine($"sem contexto: {Observador.SemContexto()}");

        o.Limpar();
        int normal = await o.IdentificarAsync(21);
        Console.WriteLine($"normal: {normal}");
        Console.WriteLine($"registros: {string.Join(" | ", o.Registros)}");

        o.Limpar();
        int configurado = await o.ComConfigureAsync(21);
        Console.WriteLine($"configurado: {configurado}");
        Console.WriteLine($"registros: {string.Join(" | ", o.Registros)}");

        Console.WriteLine($"resultados iguais: {normal == configurado}");

        o.Limpar();
        Console.WriteLine($"etapas: {await o.VariasEtapasAsync()}");
        Console.WriteLine($"quantidade de etapas: {o.Registros.Count}");
        Console.WriteLine($"todas no pool: {o.SempreNoPool()}");

        o.Limpar();
        var tarefas = new List<Task<int>>
        {
            o.IdentificarAsync(1),
            o.IdentificarAsync(2),
            o.IdentificarAsync(3),
        };

        int[] resultados = await Task.WhenAll(tarefas);
        Console.WriteLine($"simultaneos: {string.Join(",", resultados)}");
        Console.WriteLine($"registros simultaneos: {o.Registros.Count}");
        Console.WriteLine($"contexto continua nulo: {Observador.SemContexto()}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

class Observador
{
    private readonly List<string> registros = new();
    private readonly object trava = new();

    public IReadOnlyList<string> Registros => registros;

    private void Anotar(string etapa)
    {
        lock (trava)
        {
            registros.Add($"{etapa}:pool={Thread.CurrentThread.IsThreadPoolThread}");
        }
    }

    public void Limpar() => registros.Clear();

    public async Task<int> IdentificarAsync(int valor)
    {
        Anotar("antes");
        await Task.Delay(20);
        Anotar("depois");
        return valor * 2;
    }

    public async Task<int> ComConfigureAsync(int valor)
    {
        Anotar("antes");
        await Task.Delay(20).ConfigureAwait(false);
        Anotar("depois");
        return valor * 2;
    }

    public async Task<int> VariasEtapasAsync()
    {
        await Task.Delay(20);
        Anotar("e1");

        await Task.Delay(20);
        Anotar("e2");

        await Task.Delay(20);
        Anotar("e3");

        return 1 + 2 + 3;
    }

    public static bool SemContexto()
    {
        return SynchronizationContext.Current == null;
    }

    public bool SempreNoPool()
    {
        return registros.All(r => r.EndsWith("pool=True"));
    }
}

class Program
{
    static async Task Main()
    {
        var o = new Observador();

        Console.WriteLine($"sem contexto: {Observador.SemContexto()}");

        o.Limpar();
        int normal = await o.IdentificarAsync(21);
        Console.WriteLine($"normal: {normal}");
        Console.WriteLine($"registros: {string.Join(" | ", o.Registros)}");

        o.Limpar();
        int configurado = await o.ComConfigureAsync(21);
        Console.WriteLine($"configurado: {configurado}");
        Console.WriteLine($"registros: {string.Join(" | ", o.Registros)}");

        Console.WriteLine($"resultados iguais: {normal == configurado}");

        o.Limpar();
        Console.WriteLine($"etapas: {await o.VariasEtapasAsync()}");
        Console.WriteLine($"quantidade de etapas: {o.Registros.Count}");
        Console.WriteLine($"todas no pool: {o.SempreNoPool()}");

        o.Limpar();
        var tarefas = new List<Task<int>>
        {
            o.IdentificarAsync(1),
            o.IdentificarAsync(2),
            o.IdentificarAsync(3),
        };

        int[] resultados = await Task.WhenAll(tarefas);
        Console.WriteLine($"simultaneos: {string.Join(",", resultados)}");
        Console.WriteLine($"registros simultaneos: {o.Registros.Count}");
        Console.WriteLine($"contexto continua nulo: {Observador.SemContexto()}");
      }
}`,
      hints: [
        '`SynchronizationContext.Current` é `null` em console e em ASP.NET Core — é por isso que `ConfigureAwait(false)` não muda nada aqui.',
        'O primeiro `Anotar("antes")` de `IdentificarAsync` roda antes de qualquer `await`, mas o `Main` já está numa continuação — daí `pool=True` nos dois.',
        '`VariasEtapasAsync` tem três `await`, então três registros: uma continuação por espera.',
        'Com três chamadas simultâneas, são seis registros no total: "antes" e "depois" de cada uma.',
      ],
      tests: [
        {
          name: 'Contexto de sincronização',
          expectedStdout:
            'sem contexto: True\n' +
            'normal: 42\nregistros: antes:pool=True | depois:pool=True\n' +
            'configurado: 42\nregistros: antes:pool=True | depois:pool=True\n' +
            'resultados iguais: True\n' +
            'etapas: 6\nquantidade de etapas: 3\ntodas no pool: True\n' +
            'simultaneos: 2,4,6\nregistros simultaneos: 6\ncontexto continua nulo: True',
        },
      ],
      timeoutMs: 15000,
    },
  },

  {
    id: 's09c02l08',
    title: 'Erros dentro de async',
    objective: 'Capturar, filtrar e propagar exceções em código assíncrono com o mesmo cuidado do síncrono.',
    concept: [
      {
        kind: 'text',
        body:
          'A boa notícia é que `try`/`catch`/`finally` funcionam normalmente em torno de `await`. A exceção que sai é a **original**, não uma embrulhada.',
      },
      {
        kind: 'code',
        code: `try
{
    await OperacaoAsync();
}
catch (InvalidOperationException ex)
{
    Console.WriteLine(ex.Message);
}
finally
{
    await LimparAsync();
}`,
        caption: '`await` pode aparecer nos três blocos: `try`, `catch` e `finally`.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Foi uma decisão explícita de projeto: o `await` desembrulha a `AggregateException` e relança a exceção interna. É o que permite `catch (MinhaExcecao)` funcionar exatamente como no código síncrono.',
      },
      {
        kind: 'text',
        body:
          'A diferença aparece com **múltiplas falhas**. Um `WhenAll` com duas tarefas que falham guarda as duas, mas o `await` relança apenas a primeira.',
      },
      {
        kind: 'code',
        code: `Task todas = Task.WhenAll(tarefas);

try
{
    await todas;
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    Console.WriteLine(todas.Exception.InnerExceptions.Count);
}`,
      },
      {
        kind: 'output',
        code: `x falhou
2`,
        caption: 'O `catch` viu uma; a tarefa combinada guarda as duas.',
      },
      {
        kind: 'table',
        headers: ['Forma de esperar', 'Exceção que sai'],
        rows: [
          ['`await tarefa`', 'a original'],
          ['`await Task.WhenAll(...)`', 'a primeira das que falharam'],
          ['`tarefa.Result`', '`AggregateException` embrulhando'],
          ['`tarefa.Wait()`', '`AggregateException` embrulhando'],
        ],
      },
      {
        kind: 'text',
        body:
          'Filtros `when` funcionam e são especialmente úteis em código assíncrono, porque permitem distinguir causas sem capturar e relançar.',
      },
      {
        kind: 'code',
        code: `try
{
    await OperacaoAsync(ct);
}
catch (OperationCanceledException) when (prazo.IsCancellationRequested)
{
    return "tempo esgotado";
}
catch (OperationCanceledException)
{
    return "cancelado";
}
catch (HttpRequestException ex) when (ex.StatusCode == 503)
{
    return "servico indisponivel";
}`,
        caption: 'O filtro avalia **antes** de a pilha ser desenrolada — informação preciosa em diagnóstico.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Relançar com `throw ex;` **apaga a pilha original**. Use `throw;` sozinho para preservar o rastro, ou embrulhe em outra exceção passando a original como causa interna.',
      },
      {
        kind: 'compare',
        good: `catch (SqlException ex)
{
    throw new RepositorioException(
        "falha ao buscar", ex);
}

catch (Exception)
{
    Registrar();
    throw;
}`,
        bad: `catch (Exception ex)
{
    Registrar();
    throw ex;
    // pilha original perdida
}`,
        goodLabel: 'Preserva o rastro',
        badLabel: 'Apaga o rastro',
      },
      {
        kind: 'text',
        body:
          'O erro mais grave é a **exceção não observada**: uma tarefa que falha e nunca é aguardada. A exceção fica guardada e some sem deixar rastro.',
      },
      {
        kind: 'code',
        code: `Task perdida = FalhaAsync();

await Task.Delay(50);

Console.WriteLine(perdida.IsFaulted);
Console.WriteLine(perdida.Exception.InnerException.Message);`,
        caption: 'A informação está lá — mas só para quem lembrar de olhar.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Toda `Task` criada precisa de um destino: ser aguardada, entrar num `WhenAll`, ou receber uma continuação que observe a falha. Uma `Task` sem destino é um erro esperando para desaparecer.',
      },
    ],
    quiz: [
      {
        id: 's09c02l08q1',
        type: 'single',
        prompt: 'Que exceção o `await` de uma tarefa que falhou relança?',
        options: [
          { id: 'a', text: 'A original, desembrulhada da `AggregateException`', correct: true },
          { id: 'b', text: 'Sempre uma `AggregateException`' },
          { id: 'c', text: 'Uma `TaskCanceledException`' },
          { id: 'd', text: 'Depende do contexto de sincronização' },
        ],
        explanation:
          'Foi uma escolha para que `catch` específico funcione como no código síncrono. `.Result` e `.Wait()` mantêm o embrulho antigo.',
      },
      {
        id: 's09c02l08q2',
        type: 'single',
        prompt: 'Qual a diferença entre `throw;` e `throw ex;` num `catch`?',
        options: [
          { id: 'a', text: '`throw;` preserva a pilha original; `throw ex;` a reinicia', correct: true },
          { id: 'b', text: 'Nenhuma' },
          { id: 'c', text: '`throw ex;` é mais rápido' },
          { id: 'd', text: '`throw;` só funciona fora de métodos `async`' },
        ],
        explanation:
          'Com `throw ex;`, o rastro passa a começar naquela linha, e a origem real do erro desaparece do diagnóstico.',
      },
      {
        id: 's09c02l08q3',
        type: 'single',
        prompt: 'O que acontece com a exceção de uma `Task` que falha e nunca é aguardada?',
        options: [
          { id: 'a', text: 'Fica guardada na tarefa e some sem rastro se ninguém a observar', correct: true },
          { id: 'b', text: 'Derruba o processo imediatamente' },
          { id: 'c', text: 'É registrada no console automaticamente' },
          { id: 'd', text: 'É relançada na próxima operação assíncrona' },
        ],
        explanation:
          'É o motivo do aviso CS4014 e da regra de que toda `Task` precisa de destino: aguardada, composta ou observada.',
      },
    ],
    challenge: {
      brief:
        'Construa um executor resiliente que captura, filtra, embrulha e observa exceções assíncronas corretamente — incluindo o caso de múltiplas falhas num `WhenAll`.',
      requirements: [
        '`ExecutarAsync` usa filtros `when` para distinguir três causas diferentes.',
        '`ComLimpezaAsync` tem `await` dentro do `finally`, que roda nos dois caminhos.',
        '`EmbrulharAsync` relança preservando a original como causa interna.',
        '`RelancarAsync` usa `throw;` sozinho, sem apagar a pilha.',
        '`TodasAsFalhasAsync` acessa todas as exceções de um `WhenAll` via `.Exception.InnerExceptions`.',
        '`ObservarAsync` observa uma tarefa que falhou sem aguardá-la diretamente.',
        'Nenhum uso de `.Result` ou `.Wait()`.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

class FalhaDeRede : Exception
{
    public int Codigo { get; }
    public FalhaDeRede(int codigo) : base($"rede {codigo}") => Codigo = codigo;
}

class FalhaDeRepositorio : Exception
{
    public FalhaDeRepositorio(string mensagem, Exception interna) : base(mensagem, interna) { }
}

class Executor
{
    private readonly List<string> limpezas = new();
    private readonly object trava = new();

    public IReadOnlyList<string> Limpezas => limpezas;

    public void Limpar() => limpezas.Clear();

    // TODO: espera 20 ms; lanca FalhaDeRede(codigo) quando codigo > 0;
    //       lanca ArgumentException("argumento") quando codigo < 0; senao devolve "ok"
    public async Task<string> OperacaoAsync(int codigo)
    {
        return "";
    }

    // TODO: filtros when para distinguir:
    //       rede 503 -> "indisponivel"; rede 404 -> "nao encontrado";
    //       outra rede -> "erro de rede"; ArgumentException -> "argumento invalido"
    public async Task<string> ExecutarAsync(int codigo)
    {
        return "";
    }

    // TODO: try/finally com await no finally, registrando "limpou <nome>"
    public async Task<string> ComLimpezaAsync(string nome, int codigo)
    {
        return "";
    }

    // TODO: captura FalhaDeRede e relanca como FalhaDeRepositorio, com a original dentro
    public async Task<string> EmbrulharAsync(int codigo)
    {
        return "";
    }

    // TODO: registra "tentou" e relanca com throw; sozinho
    public async Task<string> RelancarAsync(int codigo)
    {
        return "";
    }

    // TODO: WhenAll guardado numa variavel; devolve todas as mensagens de falha
    public async Task<List<string>> TodasAsFalhasAsync(IEnumerable<int> codigos)
    {
        return new List<string>();
    }

    // TODO: espera a tarefa terminar sem aguarda-la diretamente,
    //       e devolve a mensagem da excecao guardada
    public async Task<string> ObservarAsync(Task tarefa)
    {
        return "";
    }
}

class Program
{
    static async Task Main()
    {
        var e = new Executor();

        Console.WriteLine($"sucesso: {await e.ExecutarAsync(0)}");
        Console.WriteLine($"503: {await e.ExecutarAsync(503)}");
        Console.WriteLine($"404: {await e.ExecutarAsync(404)}");
        Console.WriteLine($"500: {await e.ExecutarAsync(500)}");
        Console.WriteLine($"negativo: {await e.ExecutarAsync(-1)}");

        e.Limpar();
        Console.WriteLine($"limpeza ok: {await e.ComLimpezaAsync("a", 0)}");
        Console.WriteLine($"limpeza erro: {await e.ComLimpezaAsync("b", 500)}");
        Console.WriteLine($"limpezas: {string.Join(",", e.Limpezas)}");

        try
        {
            await e.EmbrulharAsync(503);
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (FalhaDeRepositorio ex)
        {
            Console.WriteLine($"embrulhada: {ex.Message}");
            Console.WriteLine($"causa interna: {ex.InnerException.Message}");
            Console.WriteLine($"tipo da causa: {ex.InnerException.GetType().Name}");
        }

        try
        {
            await e.RelancarAsync(404);
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (FalhaDeRede ex)
        {
            Console.WriteLine($"relancada: {ex.Message} codigo={ex.Codigo}");
        }

        List<string> falhas = await e.TodasAsFalhasAsync(new[] { 503, 0, 404, 0 });
        Console.WriteLine($"quantidade de falhas: {falhas.Count}");
        Console.WriteLine($"mensagens: {string.Join(" | ", falhas)}");

        List<string> nenhuma = await e.TodasAsFalhasAsync(new[] { 0, 0 });
        Console.WriteLine($"sem falhas: {nenhuma.Count}");

        Task perdida = e.OperacaoAsync(500);
        Console.WriteLine($"observada: {await e.ObservarAsync(perdida)}");
        Console.WriteLine($"faulted: {perdida.IsFaulted}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

class FalhaDeRede : Exception
{
    public int Codigo { get; }
    public FalhaDeRede(int codigo) : base($"rede {codigo}") => Codigo = codigo;
}

class FalhaDeRepositorio : Exception
{
    public FalhaDeRepositorio(string mensagem, Exception interna) : base(mensagem, interna) { }
}

class Executor
{
    private readonly List<string> limpezas = new();
    private readonly object trava = new();

    public IReadOnlyList<string> Limpezas => limpezas;

    public void Limpar() => limpezas.Clear();

    public async Task<string> OperacaoAsync(int codigo)
    {
        await Task.Delay(20);

        if (codigo > 0)
        {
            throw new FalhaDeRede(codigo);
        }

        if (codigo < 0)
        {
            throw new ArgumentException("argumento");
        }

        return "ok";
    }

    public async Task<string> ExecutarAsync(int codigo)
    {
        try
        {
            return await OperacaoAsync(codigo);
        }
        catch (FalhaDeRede ex) when (ex.Codigo == 503)
        {
            return "indisponivel";
        }
        catch (FalhaDeRede ex) when (ex.Codigo == 404)
        {
            return "nao encontrado";
        }
        catch (FalhaDeRede)
        {
            return "erro de rede";
        }
        catch (ArgumentException)
        {
            return "argumento invalido";
        }
    }

    public async Task<string> ComLimpezaAsync(string nome, int codigo)
    {
        try
        {
            return await ExecutarAsync(codigo);
        }
        finally
        {
            await Task.Delay(10);

            lock (trava)
            {
                limpezas.Add($"limpou {nome}");
            }
        }
    }

    public async Task<string> EmbrulharAsync(int codigo)
    {
        try
        {
            return await OperacaoAsync(codigo);
        }
        catch (FalhaDeRede ex)
        {
            throw new FalhaDeRepositorio("falha ao buscar", ex);
        }
    }

    public async Task<string> RelancarAsync(int codigo)
    {
        try
        {
            return await OperacaoAsync(codigo);
        }
        catch (FalhaDeRede)
        {
            lock (trava)
            {
                limpezas.Add("tentou");
            }

            throw;
        }
    }

    public async Task<List<string>> TodasAsFalhasAsync(IEnumerable<int> codigos)
    {
        List<Task<string>> tarefas = codigos.Select(OperacaoAsync).ToList();
        Task combinada = Task.WhenAll(tarefas);

        try
        {
            await combinada;
        }
        catch (Exception)
        {
            return combinada.Exception.InnerExceptions.Select(x => x.Message).ToList();
        }

        return new List<string>();
    }

    public async Task<string> ObservarAsync(Task tarefa)
    {
        while (!tarefa.IsCompleted)
        {
            await Task.Delay(10);
        }

        if (tarefa.IsFaulted)
        {
            return tarefa.Exception.InnerException.Message;
        }

        return "sem falha";
    }
}

class Program
{
    static async Task Main()
    {
        var e = new Executor();

        Console.WriteLine($"sucesso: {await e.ExecutarAsync(0)}");
        Console.WriteLine($"503: {await e.ExecutarAsync(503)}");
        Console.WriteLine($"404: {await e.ExecutarAsync(404)}");
        Console.WriteLine($"500: {await e.ExecutarAsync(500)}");
        Console.WriteLine($"negativo: {await e.ExecutarAsync(-1)}");

        e.Limpar();
        Console.WriteLine($"limpeza ok: {await e.ComLimpezaAsync("a", 0)}");
        Console.WriteLine($"limpeza erro: {await e.ComLimpezaAsync("b", 500)}");
        Console.WriteLine($"limpezas: {string.Join(",", e.Limpezas)}");

        try
        {
            await e.EmbrulharAsync(503);
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (FalhaDeRepositorio ex)
        {
            Console.WriteLine($"embrulhada: {ex.Message}");
            Console.WriteLine($"causa interna: {ex.InnerException.Message}");
            Console.WriteLine($"tipo da causa: {ex.InnerException.GetType().Name}");
        }

        try
        {
            await e.RelancarAsync(404);
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (FalhaDeRede ex)
        {
            Console.WriteLine($"relancada: {ex.Message} codigo={ex.Codigo}");
        }

        List<string> falhas = await e.TodasAsFalhasAsync(new[] { 503, 0, 404, 0 });
        Console.WriteLine($"quantidade de falhas: {falhas.Count}");
        Console.WriteLine($"mensagens: {string.Join(" | ", falhas)}");

        List<string> nenhuma = await e.TodasAsFalhasAsync(new[] { 0, 0 });
        Console.WriteLine($"sem falhas: {nenhuma.Count}");

        Task perdida = e.OperacaoAsync(500);
        Console.WriteLine($"observada: {await e.ObservarAsync(perdida)}");
        Console.WriteLine($"faulted: {perdida.IsFaulted}");
    }
}`,
      hints: [
        'Os filtros `when` precisam vir do mais específico ao mais geral: `Codigo == 503`, depois `Codigo == 404`, depois o `catch` sem filtro.',
        '`ComLimpezaAsync` chama `ExecutarAsync`, que já trata as exceções — por isso o `finally` roda sem que nada escape.',
        '`throw;` sozinho preserva a pilha; `throw ex;` a reiniciaria a partir daquela linha.',
        'Em `TodasAsFalhasAsync`, a ordem das mensagens segue a das tarefas, não a de ocorrência das falhas.',
      ],
      tests: [
        {
          name: 'Erros assíncronos',
          expectedStdout:
            'sucesso: ok\n503: indisponivel\n404: nao encontrado\n500: erro de rede\nnegativo: argumento invalido\n' +
            'limpeza ok: ok\nlimpeza erro: erro de rede\nlimpezas: limpou a,limpou b\n' +
            'embrulhada: falha ao buscar\ncausa interna: rede 503\ntipo da causa: FalhaDeRede\n' +
            'relancada: rede 404 codigo=404\n' +
            'quantidade de falhas: 2\nmensagens: rede 503 | rede 404\n' +
            'sem falhas: 0\n' +
            'observada: rede 500\nfaulted: True',
        },
      ],
      timeoutMs: 15000,
    },
  },

  {
    id: 's09c02l09',
    title: 'Prática: operação cancelável',
    objective: 'Montar uma operação longa completa: cancelável, com progresso, timeout e limpeza garantida.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma operação longa bem escrita tem quatro responsabilidades além do trabalho em si. Elas aparecem juntas em quase todo código de produção.',
      },
      {
        kind: 'table',
        headers: ['Responsabilidade', 'Ferramenta'],
        rows: [
          ['permitir interrupção', '`CancellationToken`'],
          ['informar o andamento', '`IProgress<T>`'],
          ['não travar para sempre', 'token com prazo'],
          ['liberar recursos', '`try`/`finally` ou `using`'],
        ],
      },
      {
        kind: 'code',
        code: `public async Task<Resumo> ProcessarAsync(
    IReadOnlyList<string> itens,
    IProgress<Andamento>? progresso = null,
    CancellationToken ct = default)`,
        caption: 'A assinatura convencional: dados, progresso, token — nessa ordem.',
      },
      {
        kind: 'text',
        body:
          'O corpo segue um formato que se repete: verificar o token, fazer uma unidade de trabalho, relatar, e garantir a limpeza no `finally`.',
      },
      {
        kind: 'code',
        code: `try
{
    for (int i = 0; i < itens.Count; i++)
    {
        ct.ThrowIfCancellationRequested();

        await ProcessarItemAsync(itens[i], ct);

        progresso?.Report(new Andamento(i + 1, itens.Count));
    }

    return new Resumo(itens.Count, "concluido");
}
finally
{
    await LiberarAsync();
}`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O `finally` roda também quando a operação é cancelada. Se a limpeza precisa acontecer mesmo assim — e quase sempre precisa —, ela **não** pode receber o mesmo token, ou seria cancelada junto.',
      },
      {
        kind: 'compare',
        good: `finally
{
    await LiberarAsync(CancellationToken.None);
}`,
        bad: `finally
{
    await LiberarAsync(ct);
    // ct ja esta cancelado:
    // a limpeza nao acontece
}`,
        goodLabel: 'Limpeza sem token',
        badLabel: 'Limpeza cancelada junto',
      },
      {
        kind: 'text',
        body:
          'Uma decisão importante é o que fazer com o **trabalho parcial**. Existem duas políticas, e a escolha depende do domínio.',
      },
      {
        kind: 'table',
        headers: ['Política', 'Como', 'Quando'],
        rows: [
          ['tudo ou nada', 'lançar e desfazer o que foi feito', 'operação transacional'],
          ['salvar o que deu', 'devolver resultado parcial', 'importação, processamento em lote'],
        ],
      },
      {
        kind: 'code',
        code: `catch (OperationCanceledException)
{
    return new Resumo(processados, "cancelado");
}`,
        caption: 'A política de resultado parcial: o cancelamento vira um resultado, não um erro.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Transformar o cancelamento em resultado é frequentemente melhor que propagá-lo como exceção. Quem chamou pediu para parar — receber uma exceção por isso é ruído.',
      },
      {
        kind: 'text',
        body:
          'Por fim, a operação precisa distinguir suas razões de parada. Timeout, cancelamento do usuário e falha real merecem tratamentos diferentes.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'O desafio a seguir monta essa operação inteira. Ela é o esqueleto de qualquer importador, processador de lote ou sincronizador que você vá escrever depois.',
      },
    ],
    quiz: [
      {
        id: 's09c02l09q1',
        type: 'single',
        prompt: 'Por que a limpeza no `finally` não deve receber o mesmo token da operação?',
        options: [
          { id: 'a', text: 'O token já está cancelado, e a limpeza seria cancelada também', correct: true },
          { id: 'b', text: 'Porque o `finally` não aceita `await`' },
          { id: 'c', text: 'Porque o token expira ao sair do `try`' },
          { id: 'd', text: 'Deve receber: é o comportamento correto' },
        ],
        explanation:
          'A limpeza precisa acontecer justamente quando a operação foi interrompida. Passar o token cancelado impediria isso — e o recurso ficaria preso.',
      },
      {
        id: 's09c02l09q2',
        type: 'single',
        prompt: 'Quando transformar o cancelamento em resultado em vez de exceção?',
        options: [
          { id: 'a', text: 'Quando o trabalho parcial tem valor — importação, processamento em lote', correct: true },
          { id: 'b', text: 'Sempre' },
          { id: 'c', text: 'Nunca: cancelamento é sempre erro' },
          { id: 'd', text: 'Apenas quando não há progresso relatado' },
        ],
        explanation:
          'Numa operação transacional, o parcial não serve e o cancelamento precisa desfazer tudo. Num lote, salvar o que já foi processado costuma ser exatamente o desejado.',
      },
      {
        id: 's09c02l09q3',
        type: 'single',
        prompt: 'Qual a ordem convencional dos parâmetros de uma operação longa?',
        options: [
          { id: 'a', text: 'Dados, progresso, token', correct: true },
          { id: 'b', text: 'Token, dados, progresso' },
          { id: 'c', text: 'Progresso, dados, token' },
          { id: 'd', text: 'Dados, token, progresso' },
        ],
        explanation:
          'O token é sempre o último, por convenção do framework. Isso permite dar valor padrão aos dois opcionais sem ambiguidade.',
      },
    ],
    challenge: {
      brief:
        'Implemente um importador de lote completo: cancelável, com progresso, timeout próprio, limpeza garantida e política de resultado parcial.',
      requirements: [
        'A assinatura segue a ordem convencional: dados, progresso, token.',
        'O token é verificado a cada item e repassado às operações internas.',
        'O `finally` libera o recurso usando `CancellationToken.None`.',
        'O cancelamento vira **resultado parcial**, não exceção.',
        'Um timeout interno combina com o token externo, e os dois casos são distinguidos.',
        'Uma falha real de item é registrada, e o lote continua.',
        'O progresso é relatado a cada item processado.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

record Andamento(int Atual, int Total)
{
    public int Porcentagem => Total == 0 ? 0 : Atual * 100 / Total;
    public override string ToString() => $"{Atual}/{Total} ({Porcentagem}%)";
}

record Resumo(int Processados, int Falhas, string Situacao)
{
    public override string ToString() => $"{Situacao}: {Processados} ok, {Falhas} falhas";
}

class Coletor : IProgress<Andamento>
{
    private readonly List<Andamento> relatos = new();
    public IReadOnlyList<Andamento> Relatos => relatos;
    public void Report(Andamento valor) => relatos.Add(valor);
}

class Importador
{
    private readonly List<string> eventos = new();
    private readonly object trava = new();

    public IReadOnlyList<string> Eventos => eventos;

    public void Limpar() => eventos.Clear();

    private void Anotar(string e)
    {
        lock (trava)
        {
            eventos.Add(e);
        }
    }

    // TODO: espera 25 ms com o token; lanca InvalidOperationException("item invalido: <item>")
    //       quando o item comeca com "!"
    private async Task ProcessarItemAsync(string item, CancellationToken ct)
    {
    }

    // TODO: anota "liberou"; espera 10 ms SEM token
    private async Task LiberarAsync()
    {
    }

    // TODO:
    //  - liga o token externo com um prazo de <limiteMs>
    //  - para cada item: verifica o token, processa, conta ok ou falha, relata progresso
    //  - cancelamento pelo prazo   -> Situacao "tempo esgotado"
    //  - cancelamento pelo externo -> Situacao "cancelado"
    //  - fim normal                -> Situacao "concluido"
    //  - finally: LiberarAsync()
    public async Task<Resumo> ImportarAsync(
        IReadOnlyList<string> itens,
        int limiteMs,
        IProgress<Andamento> progresso = null,
        CancellationToken ct = default)
    {
        return null;
    }
}

class Program
{
    static async Task Main()
    {
        var imp = new Importador();
        var itens = new List<string> { "a", "b", "!c", "d" };

        imp.Limpar();
        var coletor = new Coletor();
        Resumo normal = await imp.ImportarAsync(itens, 5000, coletor);

        Console.WriteLine($"normal: {normal}");
        Console.WriteLine($"relatos: {coletor.Relatos.Count}");
        Console.WriteLine($"ultimo relato: {coletor.Relatos.Last()}");
        Console.WriteLine($"eventos: {string.Join(",", imp.Eventos)}");

        imp.Limpar();
        var muitos = Enumerable.Range(1, 40).Select(i => $"item{i}").ToList();
        var parcial = new Coletor();
        Resumo porTempo = await imp.ImportarAsync(muitos, 150, parcial);

        Console.WriteLine($"por tempo: {porTempo.Situacao}");
        Console.WriteLine($"processou parte: {porTempo.Processados > 0 && porTempo.Processados < 40}");
        Console.WriteLine($"liberou mesmo assim: {imp.Eventos.Contains("liberou")}");
        Console.WriteLine($"relatos parciais: {parcial.Relatos.Count > 0}");

        imp.Limpar();

        using (var externo = new CancellationTokenSource())
        {
            var porUsuario = new Coletor();
            Task<Resumo> tarefa = imp.ImportarAsync(muitos, 5000, porUsuario, externo.Token);
            await Task.Delay(150);
            externo.Cancel();

            Resumo r = await tarefa;
            Console.WriteLine($"por usuario: {r.Situacao}");
            Console.WriteLine($"processou parte: {r.Processados > 0 && r.Processados < 40}");
            Console.WriteLine($"liberou: {imp.Eventos.Contains("liberou")}");
        }

        imp.Limpar();
        var soFalhas = new List<string> { "!x", "!y" };
        Resumo todasFalham = await imp.ImportarAsync(soFalhas, 5000);

        Console.WriteLine($"so falhas: {todasFalham}");
        Console.WriteLine($"continuou apos falha: {todasFalham.Falhas == 2}");

        imp.Limpar();
        Resumo vazio = await imp.ImportarAsync(new List<string>(), 5000);
        Console.WriteLine($"vazio: {vazio}");
        Console.WriteLine($"liberou no vazio: {imp.Eventos.Contains("liberou")}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

record Andamento(int Atual, int Total)
{
    public int Porcentagem => Total == 0 ? 0 : Atual * 100 / Total;
    public override string ToString() => $"{Atual}/{Total} ({Porcentagem}%)";
}

record Resumo(int Processados, int Falhas, string Situacao)
{
    public override string ToString() => $"{Situacao}: {Processados} ok, {Falhas} falhas";
}

class Coletor : IProgress<Andamento>
{
    private readonly List<Andamento> relatos = new();
    public IReadOnlyList<Andamento> Relatos => relatos;
    public void Report(Andamento valor) => relatos.Add(valor);
}

class Importador
{
    private readonly List<string> eventos = new();
    private readonly object trava = new();

    public IReadOnlyList<string> Eventos => eventos;

    public void Limpar() => eventos.Clear();

    private void Anotar(string e)
    {
        lock (trava)
        {
            eventos.Add(e);
        }
    }

    private async Task ProcessarItemAsync(string item, CancellationToken ct)
    {
        await Task.Delay(25, ct);

        if (item.StartsWith("!"))
        {
            throw new InvalidOperationException($"item invalido: {item}");
        }
    }

    private async Task LiberarAsync()
    {
        Anotar("liberou");
        await Task.Delay(10);
    }

    public async Task<Resumo> ImportarAsync(
        IReadOnlyList<string> itens,
        int limiteMs,
        IProgress<Andamento> progresso = null,
        CancellationToken ct = default)
    {
        using var prazo = new CancellationTokenSource(TimeSpan.FromMilliseconds(limiteMs));
        using var combinado = CancellationTokenSource.CreateLinkedTokenSource(ct, prazo.Token);

        int processados = 0;
        int falhas = 0;

        try
        {
            for (int i = 0; i < itens.Count; i++)
            {
                combinado.Token.ThrowIfCancellationRequested();

                try
                {
                    await ProcessarItemAsync(itens[i], combinado.Token);
                    processados++;
                }
                catch (InvalidOperationException)
                {
                    falhas++;
                }

                progresso?.Report(new Andamento(i + 1, itens.Count));
            }

            return new Resumo(processados, falhas, "concluido");
        }
        catch (OperationCanceledException) when (prazo.IsCancellationRequested)
        {
            return new Resumo(processados, falhas, "tempo esgotado");
        }
        catch (OperationCanceledException)
        {
            return new Resumo(processados, falhas, "cancelado");
        }
        finally
        {
            await LiberarAsync();
        }
    }
}

class Program
{
    static async Task Main()
    {
        var imp = new Importador();
        var itens = new List<string> { "a", "b", "!c", "d" };

        imp.Limpar();
        var coletor = new Coletor();
        Resumo normal = await imp.ImportarAsync(itens, 5000, coletor);

        Console.WriteLine($"normal: {normal}");
        Console.WriteLine($"relatos: {coletor.Relatos.Count}");
        Console.WriteLine($"ultimo relato: {coletor.Relatos.Last()}");
        Console.WriteLine($"eventos: {string.Join(",", imp.Eventos)}");

        imp.Limpar();
        var muitos = Enumerable.Range(1, 40).Select(i => $"item{i}").ToList();
        var parcial = new Coletor();
        Resumo porTempo = await imp.ImportarAsync(muitos, 150, parcial);

        Console.WriteLine($"por tempo: {porTempo.Situacao}");
        Console.WriteLine($"processou parte: {porTempo.Processados > 0 && porTempo.Processados < 40}");
        Console.WriteLine($"liberou mesmo assim: {imp.Eventos.Contains("liberou")}");
        Console.WriteLine($"relatos parciais: {parcial.Relatos.Count > 0}");

        imp.Limpar();

        using (var externo = new CancellationTokenSource())
        {
            var porUsuario = new Coletor();
            Task<Resumo> tarefa = imp.ImportarAsync(muitos, 5000, porUsuario, externo.Token);
            await Task.Delay(150);
            externo.Cancel();

            Resumo r = await tarefa;
            Console.WriteLine($"por usuario: {r.Situacao}");
            Console.WriteLine($"processou parte: {r.Processados > 0 && r.Processados < 40}");
            Console.WriteLine($"liberou: {imp.Eventos.Contains("liberou")}");
        }

        imp.Limpar();
        var soFalhas = new List<string> { "!x", "!y" };
        Resumo todasFalham = await imp.ImportarAsync(soFalhas, 5000);

        Console.WriteLine($"so falhas: {todasFalham}");
        Console.WriteLine($"continuou apos falha: {todasFalham.Falhas == 2}");

        imp.Limpar();
        Resumo vazio = await imp.ImportarAsync(new List<string>(), 5000);
        Console.WriteLine($"vazio: {vazio}");
        Console.WriteLine($"liberou no vazio: {imp.Eventos.Contains("liberou")}");
    }
}`,
      hints: [
        'O `try`/`catch` interno por item é o que faz o lote continuar depois de uma falha; o externo captura só o cancelamento.',
        '`LiberarAsync` não recebe token nenhum — é por isso que a liberação acontece mesmo no caminho cancelado.',
        'O filtro `when (prazo.IsCancellationRequested)` distingue timeout de cancelamento externo, e precisa vir antes do `catch` genérico.',
        '40 itens de 25 ms dariam 1 segundo; com prazo de 150 ms, cerca de 5 itens são processados antes de parar.',
      ],
      tests: [
        {
          name: 'Importador cancelável',
          expectedStdout:
            'normal: concluido: 3 ok, 1 falhas\nrelatos: 4\nultimo relato: 4/4 (100%)\neventos: liberou\n' +
            'por tempo: tempo esgotado\nprocessou parte: True\nliberou mesmo assim: True\nrelatos parciais: True\n' +
            'por usuario: cancelado\nprocessou parte: True\nliberou: True\n' +
            'so falhas: concluido: 0 ok, 2 falhas\ncontinuou apos falha: True\n' +
            'vazio: concluido: 0 ok, 0 falhas\nliberou no vazio: True',
        },
      ],
      timeoutMs: 15000,
    },
  },

  {
    id: 's09c02l10',
    title: 'Checkpoint: controle de execução',
    objective: 'Reunir cancelamento, timeout, progresso e trabalho de CPU numa decisão coerente.',
    concept: [
      {
        kind: 'text',
        body:
          'Este capítulo tratou de tudo que envolve **controlar** uma operação assíncrona depois de iniciada: pará-la, limitá-la, acompanhá-la e escolher onde ela roda.',
      },
      {
        kind: 'table',
        headers: ['Necessidade', 'Ferramenta', 'Cuidado'],
        rows: [
          ['esperar sem bloquear', '`Task.Delay`', 'nunca `Thread.Sleep`'],
          ['interromper', '`CancellationToken`', 'precisa ser verificado'],
          ['limitar o tempo', 'token com prazo', 'distinguir de cancelamento'],
          ['acompanhar', '`IProgress<T>`', '`Progress<T>` é assíncrono'],
          ['calcular fora da thread', '`Task.Run`', 'inútil em servidor'],
          ['liberar recursos', '`finally`', 'sem o token cancelado'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O fio condutor: **cancelamento é cooperativo**. Nada no runtime interrompe código à força. Cada ferramenta deste capítulo depende de o seu código colaborar — verificando o token, repassando-o, e tratando o resultado.',
      },
      {
        kind: 'text',
        body: 'Os cinco erros do capítulo, todos com a mesma raiz — quebrar a cooperação:',
      },
      {
        kind: 'table',
        headers: ['Erro', 'Efeito'],
        rows: [
          ['token recebido e nunca verificado', 'operação não cancelável'],
          ['token não repassado adiante', 'corrente quebrada'],
          ['`Task.Delay` sem token', 'espera não interrompível'],
          ['limpeza recebendo o token cancelado', 'recurso não liberado'],
          ['`Thread.Sleep` em código assíncrono', 'thread desperdiçada'],
        ],
      },
      {
        kind: 'compare',
        good: `await Task.Delay(100, ct);
await ProximoAsync(ct);
ct.ThrowIfCancellationRequested();`,
        bad: `await Task.Delay(100);
await ProximoAsync();
// o token existe mas nao chega
// a lugar nenhum`,
        goodLabel: 'Token em toda parte',
        badLabel: 'Token decorativo',
      },
      {
        kind: 'text',
        body:
          'Sobre a política de parada, a decisão se repete em todo projeto e vale ter clara:',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Resposta ao cancelamento'],
        rows: [
          ['operação transacional', 'lançar e desfazer'],
          ['processamento em lote', 'devolver resultado parcial'],
          ['consulta somente leitura', 'lançar; não há o que salvar'],
          ['gravação incremental', 'parcial, com registro do ponto de parada'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A pergunta que resolve: **o trabalho parcial tem valor?** Se sim, o cancelamento é um resultado. Se não, é uma exceção — e o `finally` precisa desfazer o que foi feito.',
      },
    ],
    quiz: [
      {
        id: 's09c02l10q1',
        type: 'single',
        prompt: 'Qual o fio condutor de todo este capítulo?',
        options: [
          { id: 'a', text: 'Cancelamento é cooperativo: nada interrompe código à força', correct: true },
          { id: 'b', text: '`Task.Run` deixa tudo mais rápido' },
          { id: 'c', text: 'Toda operação deve ter timeout de 30 segundos' },
          { id: 'd', text: 'Progresso e cancelamento são incompatíveis' },
        ],
        explanation:
          'Todas as ferramentas do capítulo dependem de o código colaborar: verificar, repassar, tratar. Sem isso, elas são decorativas.',
      },
      {
        id: 's09c02l10q2',
        type: 'multiple',
        prompt: 'Quais destes quebram a cooperação do cancelamento?',
        options: [
          { id: 'a', text: 'Receber o token e nunca verificá-lo', correct: true },
          { id: 'b', text: 'Chamar `Task.Delay` sem passar o token', correct: true },
          { id: 'c', text: 'Passar o token cancelado para a rotina de limpeza', correct: true },
          { id: 'd', text: 'Usar `CancellationToken.None` numa operação que não precisa cancelar' },
        ],
        explanation:
          '`CancellationToken.None` é a forma correta de dizer "esta chamada não é cancelável". As três primeiras rompem a corrente em pontos diferentes.',
      },
      {
        id: 's09c02l10q3',
        type: 'single',
        prompt: 'Como decidir entre lançar e devolver resultado parcial ao cancelar?',
        options: [
          { id: 'a', text: 'Perguntando se o trabalho parcial tem valor no domínio', correct: true },
          { id: 'b', text: 'Sempre lançar: cancelamento é erro' },
          { id: 'c', text: 'Sempre devolver parcial: é mais amigável' },
          { id: 'd', text: 'Depende do número de itens' },
        ],
        explanation:
          'Numa importação, cem de mil registros salvos valem. Numa transferência bancária, metade da operação não vale nada — e precisa ser desfeita.',
      },
    ],
    challenge: {
      brief:
        'Feche o capítulo com um sincronizador que aplica todas as decisões: trabalho de CPU no pool, espera assíncrona, cancelamento cooperativo, timeout distinguível, progresso e limpeza garantida.',
      requirements: [
        'Nenhum `Thread.Sleep`, nenhum `.Result`, nenhum `.Wait()`.',
        'O token é verificado a cada item e repassado a todas as chamadas internas.',
        'O cálculo pesado usa `Task.Run` com o token no segundo parâmetro.',
        'A busca simula E/S com `Task.Delay(ms, ct)`.',
        'Timeout e cancelamento externo produzem situações distintas.',
        'A limpeza no `finally` usa `CancellationToken.None`.',
        'O resultado parcial é devolvido no cancelamento, com o ponto de parada registrado.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

record Etapa(string Nome, int Indice, int Total)
{
    public override string ToString() => $"{Nome} {Indice}/{Total}";
}

record Sincronizacao(int Sincronizados, long Soma, string Situacao, int PontoDeParada)
{
    public override string ToString() =>
        $"{Situacao}: {Sincronizados} itens, soma {Soma}, parou em {PontoDeParada}";
}

class Coletor : IProgress<Etapa>
{
    private readonly List<Etapa> etapas = new();
    public IReadOnlyList<Etapa> Etapas => etapas;
    public void Report(Etapa valor) => etapas.Add(valor);
}

class Sincronizador
{
    private readonly List<string> eventos = new();
    private readonly object trava = new();

    public IReadOnlyList<string> Eventos => eventos;
    public void Limpar() => eventos.Clear();

    private void Anotar(string e)
    {
        lock (trava)
        {
            eventos.Add(e);
        }
    }

    // TODO: simula E/S: Task.Delay(20, ct) e devolve id * 100
    private async Task<int> BuscarAsync(int id, CancellationToken ct)
    {
        return 0;
    }

    // TODO: trabalho de CPU em Task.Run com o token no segundo parametro;
    //       soma 0..valor-1 verificando o token a cada 1000 iteracoes
    private async Task<long> CalcularAsync(int valor, CancellationToken ct)
    {
        return 0;
    }

    // TODO: anota "finalizou"; Task.Delay(10) SEM token
    private async Task FinalizarAsync()
    {
    }

    // TODO:
    //  - liga o token externo com um prazo de <limiteMs>
    //  - para cada id: verifica, busca, calcula, acumula, relata Etapa
    //  - prazo    -> "tempo esgotado"
    //  - externo  -> "cancelado"
    //  - fim      -> "concluido"
    //  - PontoDeParada = quantos foram completados
    //  - finally: FinalizarAsync()
    public async Task<Sincronizacao> SincronizarAsync(
        IReadOnlyList<int> ids,
        int limiteMs,
        IProgress<Etapa> progresso = null,
        CancellationToken ct = default)
    {
        return null;
    }
}

class Program
{
    static async Task Main()
    {
        var s = new Sincronizador();

        s.Limpar();
        var poucos = new List<int> { 1, 2, 3 };
        var coletor = new Coletor();
        Sincronizacao normal = await s.SincronizarAsync(poucos, 5000, coletor);

        Console.WriteLine($"normal: {normal}");
        Console.WriteLine($"etapas: {coletor.Etapas.Count}");
        Console.WriteLine($"ultima: {coletor.Etapas.Last()}");
        Console.WriteLine($"finalizou: {s.Eventos.Contains("finalizou")}");

        s.Limpar();
        var muitos = Enumerable.Range(1, 40).ToList();
        var parcial = new Coletor();
        Sincronizacao porTempo = await s.SincronizarAsync(muitos, 150, parcial);

        Console.WriteLine($"por tempo: {porTempo.Situacao}");
        Console.WriteLine($"parcial: {porTempo.Sincronizados > 0 && porTempo.Sincronizados < 40}");
        Console.WriteLine($"ponto de parada registrado: {porTempo.PontoDeParada == porTempo.Sincronizados}");
        Console.WriteLine($"finalizou apos timeout: {s.Eventos.Contains("finalizou")}");

        s.Limpar();

        using (var externo = new CancellationTokenSource())
        {
            Task<Sincronizacao> tarefa = s.SincronizarAsync(muitos, 5000, null, externo.Token);
            await Task.Delay(150);
            externo.Cancel();

            Sincronizacao r = await tarefa;
            Console.WriteLine($"por usuario: {r.Situacao}");
            Console.WriteLine($"parcial: {r.Sincronizados > 0 && r.Sincronizados < 40}");
            Console.WriteLine($"finalizou apos cancelar: {s.Eventos.Contains("finalizou")}");
        }

        s.Limpar();
        Sincronizacao vazio = await s.SincronizarAsync(new List<int>(), 5000);
        Console.WriteLine($"vazio: {vazio}");
        Console.WriteLine($"finalizou no vazio: {s.Eventos.Contains("finalizou")}");

        s.Limpar();
        Sincronizacao um = await s.SincronizarAsync(new List<int> { 5 }, 5000);
        Console.WriteLine($"um item: {um}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

record Etapa(string Nome, int Indice, int Total)
{
    public override string ToString() => $"{Nome} {Indice}/{Total}";
}

record Sincronizacao(int Sincronizados, long Soma, string Situacao, int PontoDeParada)
{
    public override string ToString() =>
        $"{Situacao}: {Sincronizados} itens, soma {Soma}, parou em {PontoDeParada}";
}

class Coletor : IProgress<Etapa>
{
    private readonly List<Etapa> etapas = new();
    public IReadOnlyList<Etapa> Etapas => etapas;
    public void Report(Etapa valor) => etapas.Add(valor);
}

class Sincronizador
{
    private readonly List<string> eventos = new();
    private readonly object trava = new();

    public IReadOnlyList<string> Eventos => eventos;
    public void Limpar() => eventos.Clear();

    private void Anotar(string e)
    {
        lock (trava)
        {
            eventos.Add(e);
        }
    }

    private async Task<int> BuscarAsync(int id, CancellationToken ct)
    {
        await Task.Delay(20, ct);
        return id * 100;
    }

    private async Task<long> CalcularAsync(int valor, CancellationToken ct)
    {
        return await Task.Run(
            () =>
            {
                long soma = 0;

                for (int i = 0; i < valor; i++)
                {
                    if (i % 1000 == 0)
                    {
                        ct.ThrowIfCancellationRequested();
                    }

                    soma += i;
                }

                return soma;
            },
            ct);
    }

    private async Task FinalizarAsync()
    {
        Anotar("finalizou");
        await Task.Delay(10);
    }

    public async Task<Sincronizacao> SincronizarAsync(
        IReadOnlyList<int> ids,
        int limiteMs,
        IProgress<Etapa> progresso = null,
        CancellationToken ct = default)
    {
        using var prazo = new CancellationTokenSource(TimeSpan.FromMilliseconds(limiteMs));
        using var combinado = CancellationTokenSource.CreateLinkedTokenSource(ct, prazo.Token);

        int sincronizados = 0;
        long soma = 0;

        try
        {
            for (int i = 0; i < ids.Count; i++)
            {
                combinado.Token.ThrowIfCancellationRequested();

                int valor = await BuscarAsync(ids[i], combinado.Token);
                soma += await CalcularAsync(valor, combinado.Token);

                sincronizados++;
                progresso?.Report(new Etapa("sincronizando", sincronizados, ids.Count));
            }

            return new Sincronizacao(sincronizados, soma, "concluido", sincronizados);
        }
        catch (OperationCanceledException) when (prazo.IsCancellationRequested)
        {
            return new Sincronizacao(sincronizados, soma, "tempo esgotado", sincronizados);
        }
        catch (OperationCanceledException)
        {
            return new Sincronizacao(sincronizados, soma, "cancelado", sincronizados);
        }
        finally
        {
            await FinalizarAsync();
        }
    }
}

class Program
{
    static async Task Main()
    {
        var s = new Sincronizador();

        s.Limpar();
        var poucos = new List<int> { 1, 2, 3 };
        var coletor = new Coletor();
        Sincronizacao normal = await s.SincronizarAsync(poucos, 5000, coletor);

        Console.WriteLine($"normal: {normal}");
        Console.WriteLine($"etapas: {coletor.Etapas.Count}");
        Console.WriteLine($"ultima: {coletor.Etapas.Last()}");
        Console.WriteLine($"finalizou: {s.Eventos.Contains("finalizou")}");

        s.Limpar();
        var muitos = Enumerable.Range(1, 40).ToList();
        var parcial = new Coletor();
        Sincronizacao porTempo = await s.SincronizarAsync(muitos, 150, parcial);

        Console.WriteLine($"por tempo: {porTempo.Situacao}");
        Console.WriteLine($"parcial: {porTempo.Sincronizados > 0 && porTempo.Sincronizados < 40}");
        Console.WriteLine($"ponto de parada registrado: {porTempo.PontoDeParada == porTempo.Sincronizados}");
        Console.WriteLine($"finalizou apos timeout: {s.Eventos.Contains("finalizou")}");

        s.Limpar();

        using (var externo = new CancellationTokenSource())
        {
            Task<Sincronizacao> tarefa = s.SincronizarAsync(muitos, 5000, null, externo.Token);
            await Task.Delay(150);
            externo.Cancel();

            Sincronizacao r = await tarefa;
            Console.WriteLine($"por usuario: {r.Situacao}");
            Console.WriteLine($"parcial: {r.Sincronizados > 0 && r.Sincronizados < 40}");
            Console.WriteLine($"finalizou apos cancelar: {s.Eventos.Contains("finalizou")}");
        }

        s.Limpar();
        Sincronizacao vazio = await s.SincronizarAsync(new List<int>(), 5000);
        Console.WriteLine($"vazio: {vazio}");
        Console.WriteLine($"finalizou no vazio: {s.Eventos.Contains("finalizou")}");

        s.Limpar();
        Sincronizacao um = await s.SincronizarAsync(new List<int> { 5 }, 5000);
        Console.WriteLine($"um item: {um}");
    }
}`,
      hints: [
        'O token combinado é o que atravessa tudo: `BuscarAsync`, `CalcularAsync` e a verificação do laço usam `combinado.Token`.',
        '`FinalizarAsync` não recebe token nenhum — por isso "finalizou" aparece nos três cenários, inclusive nos cancelados.',
        'A soma de um id `n` é a soma de 0 até `n*100 - 1`, que vale `(n*100 - 1) * n * 100 / 2`. Para ids 1, 2 e 3: 4950 + 19900 + 44850.',
        '40 itens de 20 ms de busca mais o cálculo dariam bem mais de 150 ms; o timeout interrompe por volta do quinto item.',
      ],
      tests: [
        {
          name: 'Sincronizador completo',
          expectedStdout:
            'normal: concluido: 3 itens, soma 69700, parou em 3\netapas: 3\nultima: sincronizando 3/3\nfinalizou: True\n' +
            'por tempo: tempo esgotado\nparcial: True\nponto de parada registrado: True\nfinalizou apos timeout: True\n' +
            'por usuario: cancelado\nparcial: True\nfinalizou apos cancelar: True\n' +
            'vazio: concluido: 0 itens, soma 0, parou em 0\nfinalizou no vazio: True\n' +
            'um item: concluido: 1 itens, soma 124750, parou em 1',
        },
      ],
      timeoutMs: 15000,
    },
  },
]
