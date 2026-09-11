/**
 * Engine capability probes.
 *
 * Each probe pins down one behaviour of the execution engine that decides how a whole chapter of
 * sections 2-10 has to be authored: whether a learner may declare extra types, whether the
 * fileSystem and reflection capabilities really work, whether runaway recursion fails fast,
 * whether parallel output can be compared, and how much CPU fits in the default timeout.
 *
 * Every probe declares the outcome the content plan depends on, so a green run means the
 * assumptions in PLANO-SECOES-2-A-10.md still hold.
 *
 * Usage: npx tsx scripts/probe-engine.mts    (with the API up)
 */
const API = process.env.CODEQUEST_API ?? 'http://localhost:5239'

type Comparison = 'trimmed' | 'exact' | 'ignoreCase' | 'tokens'

interface Probe {
  name: string
  /** What the content plan assumes. A probe is green when reality matches this. */
  expect: 'pass' | 'fail'
  why: string
  code: string
  expectedStdout: string
  comparison?: Comparison
  capabilities?: string[]
  timeoutMs?: number
}

const probes: Probe[] = [
  {
    name: 'S05: várias classes, construtor primário e record em um arquivo',
    expect: 'pass',
    why: 'desafios de POO precisam declarar tipos além de Program',
    code: `using System;

abstract class Forma
{
    public abstract double Area();
    public override string ToString() => $"{GetType().Name}: {Area():F2}";
}

class Circulo(double raio) : Forma
{
    public override double Area() => Math.PI * raio * raio;
}

record Ponto(int X, int Y);

class Program
{
    static void Main()
    {
        Forma f = new Circulo(2);
        Console.WriteLine(f);
        Console.WriteLine(new Ponto(1, 2) == new Ponto(1, 2));
    }
}
`,
    expectedStdout: 'Circulo: 12.57\nTrue',
  },
  {
    name: 'S09: escrever e ler arquivo por caminho relativo',
    expect: 'pass',
    why: 'o capítulo de arquivos depende de escrever no diretório de trabalho da execução',
    code: `using System;
using System.IO;

class Program
{
    static void Main()
    {
        File.WriteAllLines("dados.txt", new[] { "alfa", "beta" });
        foreach (var linha in File.ReadAllLines("dados.txt"))
        {
            Console.WriteLine(linha.ToUpperInvariant());
        }
    }
}
`,
    expectedStdout: 'ALFA\nBETA',
    capabilities: ['fileSystem'],
  },
  {
    name: 'S09: arquivo NÃO sobrevive de uma execução para outra',
    expect: 'fail',
    why: 'cada teste roda em um diretório novo, então não existe fixture: toda lição escreve antes de ler',
    code: `using System;
using System.IO;

class Program
{
    static void Main()
    {
        Console.WriteLine(File.Exists("dados.txt"));
    }
}
`,
    expectedStdout: 'True',
    capabilities: ['fileSystem'],
  },
  {
    name: 'S04/S07: recursão infinita morre rápido e com stderr legível',
    expect: 'fail',
    why: 'se travasse o processo, os capítulos de recursão e backtracking ficariam inviáveis',
    code: `using System;

class Program
{
    static int Fundo(int n) => Fundo(n + 1);

    static void Main() => Console.WriteLine(Fundo(0));
}
`,
    expectedStdout: 'nunca chega aqui',
  },
  {
    name: 'S09: async Main com await e Task.WhenAll',
    expect: 'pass',
    why: 'a seção de assíncrono inteira depende de um entry point async',
    code: `using System;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        await Task.Delay(50);
        var valores = await Task.WhenAll(Task.FromResult(2), Task.FromResult(3));
        Console.WriteLine(valores[0] + valores[1]);
    }
}
`,
    expectedStdout: '5',
  },
  {
    name: 'S09: saída fora de ordem falha até com comparison tokens',
    expect: 'fail',
    why: 'tokens só colapsa espaços, não reordena: o capítulo de paralelismo precisa de saída determinística',
    code: `using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

class Program
{
    static void Main()
    {
        var saida = new ConcurrentBag<int>();
        Parallel.For(1, 6, i => saida.Add(i * i));
        foreach (var valor in saida) Console.WriteLine(valor);
    }
}
`,
    expectedStdout: '1\n4\n9\n16\n25',
    comparison: 'tokens',
  },
  {
    name: 'S08: reflection funciona com a capability declarada',
    expect: 'pass',
    why: 'o capítulo de recursos modernos usa Activator e GetProperty',
    code: `using System;

class Alvo
{
    public int Valor { get; set; } = 7;
}

class Program
{
    static void Main()
    {
        var tipo = typeof(Alvo);
        var instancia = Activator.CreateInstance(tipo);
        Console.WriteLine(tipo.GetProperty("Valor")!.GetValue(instancia));
    }
}
`,
    expectedStdout: '7',
    capabilities: ['reflection'],
  },
  {
    name: 'S02/S03: Random com semente fixa é estável entre execuções',
    expect: 'pass',
    why: 'lições de simulação e sorteio só são testáveis com sequência previsível',
    code: `using System;

class Program
{
    static void Main()
    {
        var rng = new Random(42);
        Console.WriteLine($"{rng.Next(1, 101)} {rng.Next(1, 101)} {rng.Next(1, 101)}");
    }
}
`,
    expectedStdout: '67 15 13',
  },
  {
    name: 'S07: 50 milhões de iterações cabem folgadamente no timeout',
    expect: 'pass',
    why: 'define o tamanho de entrada viável nos desafios de complexidade',
    code: `using System;

class Program
{
    static void Main()
    {
        long soma = 0;
        for (int i = 0; i < 50_000_000; i++) soma += i % 7;
        Console.WriteLine(soma);
    }
}
`,
    expectedStdout: '149999997',
  },
]

interface ExecuteResponse {
  compiled: boolean
  rejectionReason: string | null
  diagnostics: Array<{ severity: string; line: number; message: string }>
  results: Array<{
    passed: boolean
    actual: string
    stderr: string
    exitCode: number
    timedOut: boolean
  }>
}

async function run(probe: Probe): Promise<boolean> {
  const started = Date.now()
  const response = await fetch(`${API}/api/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: probe.code,
      tests: [
        {
          name: 'probe',
          expectedStdout: probe.expectedStdout,
          comparison: probe.comparison ?? 'trimmed',
        },
      ],
      capabilities: probe.capabilities,
      timeoutMs: probe.timeoutMs,
    }),
  })

  const elapsed = Date.now() - started
  const body = (await response.json()) as ExecuteResponse

  const rejected = body.rejectionReason !== null || !body.compiled
  const passed = !rejected && body.results[0].passed === true
  const asExpected = (probe.expect === 'pass') === passed

  console.log(`${asExpected ? '  ok  ' : ' FALHA'}  ${probe.name}   (${elapsed}ms)`)
  console.log(`        esperado: ${probe.expect} — ${probe.why}`)

  if (!asExpected || probe.expect === 'fail') {
    if (body.rejectionReason) console.log(`        guard rejeitou: ${body.rejectionReason}`)
    for (const d of body.diagnostics.filter((x) => x.severity === 'Error')) {
      console.log(`        não compila, linha ${d.line}: ${d.message}`)
    }
    const result = body.results[0]
    if (result) {
      console.log(`        exit=${result.exitCode} timeout=${result.timedOut}`)
      console.log(`        stdout: ${JSON.stringify(result.actual)}`)
      if (result.stderr) {
        console.log(`        stderr: ${JSON.stringify(result.stderr.split('\n')[0])}`)
      }
    }
  }

  return asExpected
}

const health = await fetch(`${API}/api/health`).catch(() => null)
if (!health?.ok) {
  console.error(`Não consegui falar com a API em ${API}.`)
  console.error('Suba o backend primeiro: dotnet run --project server/CodeQuest.Api')
  process.exit(1)
}

console.log(`Sondando o engine em ${API}\n`)
const outcomes: boolean[] = []
for (const probe of probes) {
  outcomes.push(await run(probe))
  console.log()
}

const broken = outcomes.filter((ok) => !ok).length
if (broken > 0) {
  console.error(`${broken} sonda(s) divergiram do que o plano de conteúdo assume.`)
  process.exit(1)
}
console.log(`Todas as ${probes.length} sondas confirmam as premissas do plano.`)
