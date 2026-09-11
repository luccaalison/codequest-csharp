import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's08c05l01',
    title: 'IEnumerable por dentro',
    objective: 'Entender o que o `foreach` realmente faz e qual contrato uma sequência precisa cumprir.',
    concept: [
      {
        kind: 'text',
        body:
          'Você usa `foreach` desde a Seção 2 sem precisar saber como ele funciona. Chegou a hora: por baixo, `foreach` é um `while` sobre duas interfaces bem pequenas.',
      },
      {
        kind: 'code',
        code: `interface IEnumerable<T>
{
    IEnumerator<T> GetEnumerator();
}

interface IEnumerator<T> : IDisposable
{
    T Current { get; }
    bool MoveNext();
    void Reset();
}`,
        caption: 'Três membros úteis no total. Toda a maquinaria de sequências do .NET se apoia nisso.',
      },
      {
        kind: 'text',
        body: 'A divisão de papéis entre as duas é a chave:',
      },
      {
        kind: 'table',
        headers: ['Interface', 'Papel', 'Analogia'],
        rows: [
          ['`IEnumerable<T>`', 'sabe produzir um percorredor', 'o livro'],
          ['`IEnumerator<T>`', 'é o percorredor, com posição', 'o marcador de página'],
        ],
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'O que você escreve',
          code: `foreach (int x in numeros)
{
    Console.WriteLine(x);
}`,
        },
        right: {
          label: 'O que o compilador gera',
          code: `var e = numeros.GetEnumerator();

try
{
    while (e.MoveNext())
    {
        int x = e.Current;
        Console.WriteLine(x);
    }
}
finally
{
    e.Dispose();
}`,
        },
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare no `try`/`finally`: o `foreach` **sempre** chama `Dispose`, inclusive quando o laço termina por `break`, `return` ou exceção. É isso que permite a uma sequência liberar arquivos e conexões com segurança.',
      },
      {
        kind: 'text',
        body:
          'Separar as duas interfaces resolve um problema concreto: uma coleção pode ser percorrida por vários laços ao mesmo tempo, cada um com seu enumerador e sua posição independente.',
      },
      {
        kind: 'code',
        code: `foreach (int a in numeros)
{
    foreach (int b in numeros)
    {
        // dois enumeradores, duas posicoes
        Console.WriteLine($"{a},{b}");
    }
}`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`foreach` **não exige** que o tipo implemente `IEnumerable<T>`. Basta ter um método público `GetEnumerator()` que devolva algo com `Current` e `MoveNext()`. Essa é a razão de o `foreach` funcionar sobre `Span<T>`, que não pode implementar interfaces.',
      },
      {
        kind: 'text',
        body:
          'Implementar a interface, ainda assim, é o que dá acesso ao LINQ inteiro — porque todos os operadores são extensões sobre `IEnumerable<T>`.',
      },
      {
        kind: 'code',
        code: `class Colecao : IEnumerable<int>
{
    private readonly int[] dados = { 1, 2, 3 };

    public IEnumerator<int> GetEnumerator()
    {
        for (int i = 0; i < dados.Length; i++)
        {
            yield return dados[i];
        }
    }

    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
}`,
        caption:
          'A segunda `GetEnumerator` é a versão não genérica, herdada de `IEnumerable`. Implementá-la explicitamente a esconde do uso comum.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A duplicação existe por compatibilidade: `IEnumerable<T>` herda de `IEnumerable`, que é de 2002. A implementação explícita — sem `public` e com o nome qualificado — deixa só a versão genérica visível.',
      },
      {
        kind: 'text',
        body:
          'Duas garantias importantes que o contrato **não** dá: uma sequência não promete tamanho conhecido, nem que percorrer duas vezes dê o mesmo resultado. Por isso `Count()` do LINQ pode ser caro, e por isso o próximo capítulo fala de avaliação preguiçosa.',
      },
    ],
    quiz: [
      {
        id: 's08c05l01q1',
        type: 'single',
        prompt: 'Por que o `foreach` gerado tem um bloco `finally`?',
        options: [
          { id: 'a', text: 'Para chamar `Dispose` no enumerador mesmo com `break` ou exceção', correct: true },
          { id: 'b', text: 'Para capturar exceções do corpo do laço' },
          { id: 'c', text: 'Para reiniciar o enumerador' },
          { id: 'd', text: 'Para liberar a coleção original' },
        ],
        explanation:
          'É a garantia que permite a uma sequência abrir um arquivo, produzir linhas e fechá-lo no fim — mesmo quando quem consome desiste no meio.',
      },
      {
        id: 's08c05l01q2',
        type: 'single',
        prompt: 'O que um tipo precisa para funcionar com `foreach`?',
        options: [
          { id: 'a', text: 'Um método público `GetEnumerator()` cujo retorno tenha `Current` e `MoveNext()`', correct: true },
          { id: 'b', text: 'Implementar obrigatoriamente `IEnumerable<T>`' },
          { id: 'c', text: 'Ter um indexador e uma propriedade `Count`' },
          { id: 'd', text: 'Herdar de `List<T>`' },
        ],
        explanation:
          'O `foreach` casa por forma, não por interface. Implementar `IEnumerable<T>` continua valendo a pena, porque é o que libera o LINQ.',
      },
      {
        id: 's08c05l01q3',
        type: 'single',
        prompt: 'Por que `IEnumerable<T>` e `IEnumerator<T>` são separados?',
        options: [
          { id: 'a', text: 'Para permitir vários percursos simultâneos, cada um com sua posição', correct: true },
          { id: 'b', text: 'Por compatibilidade com versões antigas do C#' },
          { id: 'c', text: 'Porque `IEnumerator<T>` não pode ser genérica' },
          { id: 'd', text: 'Para separar leitura de escrita' },
        ],
        explanation:
          'A coleção não guarda posição; o enumerador guarda. Sem essa separação, dois `foreach` aninhados sobre a mesma coleção interfeririam um no outro.',
      },
    ],
    challenge: {
      brief:
        'Escreva uma coleção própria que implementa `IEnumerable<T>`, demonstre a equivalência entre `foreach` e o laço manual, e mostre que dois percursos simultâneos não interferem.',
      requirements: [
        '`Pilha<T>` implementa `IEnumerable<T>`, percorrendo do topo para a base.',
        'A versão não genérica de `GetEnumerator` é implementada **explicitamente**.',
        '`PercorrerManualmente` reproduz o que o `foreach` faz, com `try`/`finally` e `Dispose`.',
        'Demonstre dois `foreach` aninhados sobre a mesma instância.',
        'A coleção deve funcionar com operadores do LINQ.',
      ],
      starterCode: `using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

class Pilha<T> : IEnumerable<T>
{
    private readonly List<T> itens = new();

    public int Contagem => itens.Count;

    public void Empilhar(T valor)
    {
        itens.Add(valor);
    }

    // TODO: percorre do topo (ultimo inserido) para a base
    public IEnumerator<T> GetEnumerator()
    {
        yield break;
    }

    // TODO: implementacao explicita da versao nao generica
    IEnumerator IEnumerable.GetEnumerator()
    {
        return null;
    }
}

class Program
{
    // TODO: reproduza o que o foreach faz, com try/finally e Dispose
    static string PercorrerManualmente<T>(IEnumerable<T> fonte)
    {
        return "";
    }

    static void Main()
    {
        var pilha = new Pilha<string>();
        pilha.Empilhar("a");
        pilha.Empilhar("b");
        pilha.Empilhar("c");

        Console.WriteLine($"contagem: {pilha.Contagem}");
        Console.WriteLine($"foreach: {string.Join(",", pilha)}");
        Console.WriteLine($"manual: {PercorrerManualmente(pilha)}");
        Console.WriteLine($"iguais: {string.Join(",", pilha) == PercorrerManualmente(pilha)}");

        var pares = new List<string>();

        foreach (string a in pilha)
        {
            foreach (string b in pilha)
            {
                pares.Add($"{a}{b}");
            }
        }

        Console.WriteLine($"pares: {string.Join(",", pares)}");
        Console.WriteLine($"total de pares: {pares.Count}");

        Console.WriteLine($"linq maiusculas: {string.Join(",", pilha.Select(x => x.ToUpperInvariant()))}");
        Console.WriteLine($"linq primeiro: {pilha.First()}");
        Console.WriteLine($"linq contagem: {pilha.Count()}");

        var numeros = new Pilha<int>();

        for (int i = 1; i <= 4; i++)
        {
            numeros.Empilhar(i * 10);
        }

        Console.WriteLine($"numeros: {string.Join(",", numeros)}");
        Console.WriteLine($"soma: {numeros.Sum()}");

        var vazia = new Pilha<int>();
        Console.WriteLine($"vazia: [{string.Join(",", vazia)}]");
        Console.WriteLine($"vazia manual: [{PercorrerManualmente(vazia)}]");
    }
}`,
      solution: `using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

class Pilha<T> : IEnumerable<T>
{
    private readonly List<T> itens = new();

    public int Contagem => itens.Count;

    public void Empilhar(T valor)
    {
        itens.Add(valor);
    }

    public IEnumerator<T> GetEnumerator()
    {
        for (int i = itens.Count - 1; i >= 0; i--)
        {
            yield return itens[i];
        }
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}

class Program
{
    static string PercorrerManualmente<T>(IEnumerable<T> fonte)
    {
        var partes = new List<string>();
        IEnumerator<T> enumerador = fonte.GetEnumerator();

        try
        {
            while (enumerador.MoveNext())
            {
                T atual = enumerador.Current;
                partes.Add(atual?.ToString() ?? "");
            }
        }
        finally
        {
            enumerador.Dispose();
        }

        return string.Join(",", partes);
    }

    static void Main()
    {
        var pilha = new Pilha<string>();
        pilha.Empilhar("a");
        pilha.Empilhar("b");
        pilha.Empilhar("c");

        Console.WriteLine($"contagem: {pilha.Contagem}");
        Console.WriteLine($"foreach: {string.Join(",", pilha)}");
        Console.WriteLine($"manual: {PercorrerManualmente(pilha)}");
        Console.WriteLine($"iguais: {string.Join(",", pilha) == PercorrerManualmente(pilha)}");

        var pares = new List<string>();

        foreach (string a in pilha)
        {
            foreach (string b in pilha)
            {
                pares.Add($"{a}{b}");
            }
        }

        Console.WriteLine($"pares: {string.Join(",", pares)}");
        Console.WriteLine($"total de pares: {pares.Count}");

        Console.WriteLine($"linq maiusculas: {string.Join(",", pilha.Select(x => x.ToUpperInvariant()))}");
        Console.WriteLine($"linq primeiro: {pilha.First()}");
        Console.WriteLine($"linq contagem: {pilha.Count()}");

        var numeros = new Pilha<int>();

        for (int i = 1; i <= 4; i++)
        {
            numeros.Empilhar(i * 10);
        }

        Console.WriteLine($"numeros: {string.Join(",", numeros)}");
        Console.WriteLine($"soma: {numeros.Sum()}");

        var vazia = new Pilha<int>();
        Console.WriteLine($"vazia: [{string.Join(",", vazia)}]");
        Console.WriteLine($"vazia manual: [{PercorrerManualmente(vazia)}]");
    }
}`,
      hints: [
        'Um laço decrescente sobre a lista interna produz a ordem do topo para a base — sem precisar copiar nada.',
        'A implementação explícita se escreve sem `public` e com o nome qualificado: `IEnumerator IEnumerable.GetEnumerator()`.',
        'Em `PercorrerManualmente`, o `Dispose` vai no `finally` — é exatamente o que o compilador gera para o `foreach`.',
        'Os dois `foreach` aninhados funcionam porque cada um chama `GetEnumerator()` e recebe um enumerador independente.',
      ],
      tests: [
        {
          name: 'Coleção própria',
          expectedStdout:
            'contagem: 3\nforeach: c,b,a\nmanual: c,b,a\niguais: True\n' +
            'pares: cc,cb,ca,bc,bb,ba,ac,ab,aa\ntotal de pares: 9\n' +
            'linq maiusculas: C,B,A\nlinq primeiro: c\nlinq contagem: 3\n' +
            'numeros: 40,30,20,10\nsoma: 100\n' +
            'vazia: []\nvazia manual: []',
        },
      ],
    },
  },

  {
    id: 's08c05l02',
    title: 'yield return',
    objective: 'Produzir sequências sob demanda sem escrever um enumerador à mão.',
    concept: [
      {
        kind: 'text',
        body:
          'Implementar `IEnumerator<T>` à mão dá trabalho: é preciso guardar posição, estado intermediário e reconstruir o contexto a cada `MoveNext()`. A palavra **`yield return`** faz o compilador escrever tudo isso por você.',
      },
      {
        kind: 'code',
        code: `static IEnumerable<int> Contar(int ate)
{
    for (int i = 1; i <= ate; i++)
    {
        yield return i;
    }
}`,
        caption: 'Seis linhas. A versão manual equivalente passa de trinta.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O compilador transforma esse método numa **máquina de estados**: uma classe gerada com um campo para cada variável local e um número indicando em que `yield` a execução parou. `MoveNext()` retoma exatamente dali.',
      },
      {
        kind: 'text',
        body:
          'A consequência mais importante é o momento em que o corpo executa: **nada roda na chamada**. O corpo só começa no primeiro `MoveNext()`, e pausa em cada `yield return`.',
      },
      {
        kind: 'code',
        code: `static IEnumerable<int> Contar(int ate)
{
    Console.WriteLine("  corpo iniciou");

    for (int i = 1; i <= ate; i++)
    {
        Console.WriteLine($"  produzindo {i}");
        yield return i;
    }

    Console.WriteLine("  corpo terminou");
}

var seq = Contar(3);
Console.WriteLine("nada aconteceu ainda");

foreach (int x in seq)
{
    Console.WriteLine($"recebi {x}");
    if (x == 2) break;
}`,
      },
      {
        kind: 'output',
        code: `nada aconteceu ainda
  corpo iniciou
  produzindo 1
recebi 1
  produzindo 2
recebi 2`,
        caption:
          'Duas coisas para notar: a chamada não executou nada, e o `break` deixou o corpo parado — "corpo terminou" nunca apareceu.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O intercalado da saída não é detalhe: produtor e consumidor **alternam**. O `yield return` entrega um item e devolve o controle a quem chamou; a produção do próximo só acontece no `MoveNext()` seguinte.',
      },
      {
        kind: 'text',
        body:
          'Outra consequência: percorrer a mesma sequência duas vezes **executa o corpo duas vezes**. O iterador não guarda resultado.',
      },
      {
        kind: 'compare',
        good: `var lista = Contar(3).ToList();

// corpo executou uma vez
foreach (var x in lista) { }
foreach (var x in lista) { }`,
        bad: `var seq = Contar(3);

// corpo executa duas vezes
foreach (var x in seq) { }
foreach (var x in seq) { }`,
        goodLabel: 'Materializar quando reusar',
        badLabel: 'Reiterar o iterador',
      },
      {
        kind: 'text',
        body:
          'Um método com `yield` tem regras próprias. Conhecê-las evita erros de compilação confusos:',
      },
      {
        kind: 'table',
        headers: ['Regra', 'Motivo'],
        rows: [
          ['retorno é `IEnumerable<T>` ou `IEnumerator<T>`', 'é o que a máquina de estados produz'],
          ['não pode ter `return valor;`', '`yield return` e `return` são incompatíveis'],
          ['não aceita `ref` nem `out`', 'os parâmetros vivem além da chamada'],
          ['`yield` não pode estar dentro de `catch`', 'o estado não sobreviveria à retomada'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          '`yield` **pode** estar dentro de `try`/`finally`, e o `finally` roda quando o enumerador é descartado — inclusive num `break`. É o mecanismo que permite fechar um arquivo depois de produzir suas linhas.',
      },
      {
        kind: 'text',
        body:
          'O ganho de memória é o motivo real de usar iteradores: uma sequência de um milhão de itens produzidos sob demanda ocupa o espaço de **um** item por vez.',
      },
    ],
    quiz: [
      {
        id: 's08c05l02q1',
        type: 'single',
        prompt: 'Quando o corpo de um método com `yield return` começa a executar?',
        options: [
          { id: 'a', text: 'No primeiro `MoveNext()`, ou seja, quando o `foreach` começa', correct: true },
          { id: 'b', text: 'Na chamada do método' },
          { id: 'c', text: 'Quando o método é compilado' },
          { id: 'd', text: 'Somente no `Dispose`' },
        ],
        explanation:
          'A chamada apenas constrói a máquina de estados. É por isso que validar argumentos dentro de um método com `yield` faz a exceção sair no lugar errado.',
      },
      {
        id: 's08c05l02q2',
        type: 'single',
        prompt: 'O que acontece ao percorrer duas vezes a mesma sequência devolvida por um iterador?',
        options: [
          { id: 'a', text: 'O corpo executa de novo, do início', correct: true },
          { id: 'b', text: 'A segunda iteração devolve zero itens' },
          { id: 'c', text: 'O resultado fica em cache' },
          { id: 'd', text: 'É lançada `InvalidOperationException`' },
        ],
        explanation:
          'Cada `foreach` chama `GetEnumerator()` e obtém uma máquina de estados nova. Se o corpo tem efeito colateral ou custo alto, materialize com `ToList()`.',
      },
      {
        id: 's08c05l02q3',
        type: 'single',
        prompt: 'Qual destas construções é proibida num método com `yield`?',
        options: [
          { id: 'a', text: '`return valor;`', correct: true },
          { id: 'b', text: '`try` / `finally`' },
          { id: 'c', text: '`foreach` interno' },
          { id: 'd', text: '`if` com `yield return` dentro' },
        ],
        explanation:
          'Um método iterador devolve a sequência inteira via `yield`; um `return` com valor seria uma segunda forma de devolver, incompatível com a máquina de estados.',
      },
    ],
    challenge: {
      brief:
        'Escreva geradores com `yield return` que produzem sequências sob demanda, e demonstre que o corpo só executa durante a iteração — e uma vez por percurso.',
      requirements: [
        'Todos os geradores usam `yield return`; nenhum monta uma lista internamente.',
        '`Contar` registra o que produz num contador estático, para provar a execução preguiçosa.',
        '`Repetir` produz o mesmo valor N vezes sem alocar array.',
        '`Intercalar` alterna entre duas sequências até a mais curta acabar.',
        '`Acumular` produz as somas parciais de uma sequência.',
        '`Achatar` produz os elementos de uma sequência de sequências.',
        'Demonstre que `break` interrompe a produção no meio.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static int produzidos;

    static IEnumerable<int> Contar(int ate)
    {
        // TODO: incremente 'produzidos' a cada item antes do yield
        yield break;
    }

    static IEnumerable<T> Repetir<T>(T valor, int vezes)
    {
        // TODO
        yield break;
    }

    static IEnumerable<T> Intercalar<T>(IEnumerable<T> a, IEnumerable<T> b)
    {
        // TODO: use os enumeradores das duas e alterne ate a mais curta acabar
        yield break;
    }

    static IEnumerable<int> Acumular(IEnumerable<int> fonte)
    {
        // TODO: somas parciais
        yield break;
    }

    static IEnumerable<T> Achatar<T>(IEnumerable<IEnumerable<T>> grupos)
    {
        // TODO
        yield break;
    }

    static void Main()
    {
        produzidos = 0;
        var seq = Contar(5);
        Console.WriteLine($"apos a chamada: {produzidos}");

        int recebidos = 0;

        foreach (int x in seq)
        {
            recebidos++;

            if (x == 3)
            {
                break;
            }
        }

        Console.WriteLine($"apos break: produzidos={produzidos} recebidos={recebidos}");

        produzidos = 0;
        Console.WriteLine($"soma: {seq.Sum()} produzidos={produzidos}");

        produzidos = 0;
        int _ = seq.Count();
        int __ = seq.Count();
        Console.WriteLine($"dois percursos: {produzidos}");

        Console.WriteLine($"repetir: {string.Join(",", Repetir("ok", 3))}");
        Console.WriteLine($"repetir zero: [{string.Join(",", Repetir(9, 0))}]");

        Console.WriteLine($"intercalar: {string.Join(",", Intercalar(new[] { 1, 2, 3 }, new[] { 10, 20 }))}");
        Console.WriteLine($"intercalar iguais: {string.Join(",", Intercalar(new[] { 1, 2 }, new[] { 8, 9 }))}");
        Console.WriteLine($"intercalar vazia: [{string.Join(",", Intercalar(new int[0], new[] { 1 }))}]");

        Console.WriteLine($"acumular: {string.Join(",", Acumular(new[] { 1, 2, 3, 4 }))}");
        Console.WriteLine($"acumular vazio: [{string.Join(",", Acumular(new int[0]))}]");

        var grupos = new List<List<int>>
        {
            new List<int> { 1, 2 },
            new List<int>(),
            new List<int> { 3 },
        };

        Console.WriteLine($"achatar: {string.Join(",", Achatar(grupos))}");

        produzidos = 0;
        Console.WriteLine($"preguicoso: {string.Join(",", Contar(1000).Take(3))} produzidos={produzidos}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static int produzidos;

    static IEnumerable<int> Contar(int ate)
    {
        for (int i = 1; i <= ate; i++)
        {
            produzidos++;
            yield return i;
        }
    }

    static IEnumerable<T> Repetir<T>(T valor, int vezes)
    {
        for (int i = 0; i < vezes; i++)
        {
            yield return valor;
        }
    }

    static IEnumerable<T> Intercalar<T>(IEnumerable<T> a, IEnumerable<T> b)
    {
        using IEnumerator<T> ea = a.GetEnumerator();
        using IEnumerator<T> eb = b.GetEnumerator();

        while (ea.MoveNext() && eb.MoveNext())
        {
            yield return ea.Current;
            yield return eb.Current;
        }
    }

    static IEnumerable<int> Acumular(IEnumerable<int> fonte)
    {
        int soma = 0;

        foreach (int item in fonte)
        {
            soma += item;
            yield return soma;
        }
    }

    static IEnumerable<T> Achatar<T>(IEnumerable<IEnumerable<T>> grupos)
    {
        foreach (IEnumerable<T> grupo in grupos)
        {
            foreach (T item in grupo)
            {
                yield return item;
            }
        }
    }

    static void Main()
    {
        produzidos = 0;
        var seq = Contar(5);
        Console.WriteLine($"apos a chamada: {produzidos}");

        int recebidos = 0;

        foreach (int x in seq)
        {
            recebidos++;

            if (x == 3)
            {
                break;
            }
        }

        Console.WriteLine($"apos break: produzidos={produzidos} recebidos={recebidos}");

        produzidos = 0;
        Console.WriteLine($"soma: {seq.Sum()} produzidos={produzidos}");

        produzidos = 0;
        int _ = seq.Count();
        int __ = seq.Count();
        Console.WriteLine($"dois percursos: {produzidos}");

        Console.WriteLine($"repetir: {string.Join(",", Repetir("ok", 3))}");
        Console.WriteLine($"repetir zero: [{string.Join(",", Repetir(9, 0))}]");

        Console.WriteLine($"intercalar: {string.Join(",", Intercalar(new[] { 1, 2, 3 }, new[] { 10, 20 }))}");
        Console.WriteLine($"intercalar iguais: {string.Join(",", Intercalar(new[] { 1, 2 }, new[] { 8, 9 }))}");
        Console.WriteLine($"intercalar vazia: [{string.Join(",", Intercalar(new int[0], new[] { 1 }))}]");

        Console.WriteLine($"acumular: {string.Join(",", Acumular(new[] { 1, 2, 3, 4 }))}");
        Console.WriteLine($"acumular vazio: [{string.Join(",", Acumular(new int[0]))}]");

        var grupos = new List<List<int>>
        {
            new List<int> { 1, 2 },
            new List<int>(),
            new List<int> { 3 },
        };

        Console.WriteLine($"achatar: {string.Join(",", Achatar(grupos))}");

        produzidos = 0;
        Console.WriteLine($"preguicoso: {string.Join(",", Contar(1000).Take(3))} produzidos={produzidos}");
    }
}`,
      hints: [
        'Em `Contar`, o incremento vem **antes** do `yield return`: é ele que registra que o item foi produzido.',
        '`Intercalar` precisa dos enumeradores explícitos, porque dois `foreach` não avançariam em sincronia. `using` garante o `Dispose` dos dois.',
        '`while (ea.MoveNext() && eb.MoveNext())` para na mais curta — o `&&` curto-circuita e não consome um item da segunda à toa.',
        'A última linha é a prova da preguiça: `Contar(1000).Take(3)` produz apenas 3 itens, não mil.',
      ],
      tests: [
        {
          name: 'Geradores preguiçosos',
          expectedStdout:
            'apos a chamada: 0\napos break: produzidos=3 recebidos=3\n' +
            'soma: 15 produzidos=5\ndois percursos: 10\n' +
            'repetir: ok,ok,ok\nrepetir zero: []\n' +
            'intercalar: 1,10,2,20\nintercalar iguais: 1,8,2,9\nintercalar vazia: []\n' +
            'acumular: 1,3,6,10\nacumular vazio: []\n' +
            'achatar: 1,2,3\n' +
            'preguicoso: 1,2,3 produzidos=3',
        },
      ],
    },
  },

  {
    id: 's08c05l03',
    title: 'yield break',
    objective: 'Encerrar uma sequência antes do fim natural do método.',
    concept: [
      {
        kind: 'text',
        body:
          '`yield break` termina a sequência imediatamente. É o equivalente ao `return` num método comum — mas sem valor, porque o valor de um iterador são os itens já produzidos.',
      },
      {
        kind: 'code',
        code: `static IEnumerable<int> AtePrimeiroNegativo(int[] dados)
{
    foreach (int x in dados)
    {
        if (x < 0)
        {
            yield break;
        }

        yield return x;
    }
}`,
      },
      {
        kind: 'output',
        code: `[1, 2, -1, 3]  ->  1,2
[-1]           ->  (vazio)
[]             ->  (vazio)`,
        caption: 'Os itens produzidos antes do `yield break` permanecem — ele encerra, não descarta.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Para quem consome, `yield break` é indistinguível do fim natural: o `MoveNext()` devolve `false` e o `foreach` termina. Não há sinal de "parou antes da hora".',
      },
      {
        kind: 'text',
        body:
          'O caso mais comum é a **saída antecipada por condição**. Chegar ao fim do método também encerra a sequência, então `yield break` só é necessário quando você quer sair de dentro de um laço ou de um ramo.',
      },
      {
        kind: 'compare',
        good: `static IEnumerable<string> Ler(string[] linhas)
{
    foreach (string l in linhas)
    {
        if (l == "FIM") yield break;
        yield return l;
    }
}`,
        bad: `static IEnumerable<string> Ler(string[] linhas)
{
    bool parou = false;

    foreach (string l in linhas)
    {
        if (l == "FIM") parou = true;
        if (!parou) yield return l;
    }
}`,
        goodLabel: 'Sai na hora',
        badLabel: 'Continua percorrendo à toa',
      },
      {
        kind: 'text',
        body:
          'Um `yield break` no início serve para devolver uma sequência **vazia** de forma explícita — útil em ramos de validação.',
      },
      {
        kind: 'code',
        code: `static IEnumerable<int> Fatias(int[] dados, int tamanho)
{
    if (tamanho <= 0 || dados.Length == 0)
    {
        yield break;
    }

    // ... producao normal
}`,
        caption: 'Para uma sequência vazia fora de um iterador, `Enumerable.Empty<T>()` é mais direto.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Sequência vazia **não** é a mesma coisa que sequência nula. Devolver `yield break` é seguro; devolver `null` faz o `foreach` de quem chama lançar `NullReferenceException`.',
      },
      {
        kind: 'text',
        body:
          '`yield break` interage com `try`/`finally` como qualquer saída: o `finally` executa antes de a sequência terminar de verdade.',
      },
      {
        kind: 'code',
        code: `static IEnumerable<int> ComLimpeza(int[] dados)
{
    try
    {
        foreach (int x in dados)
        {
            if (x < 0)
            {
                yield break;
            }

            yield return x;
        }
    }
    finally
    {
        Console.WriteLine("limpeza");
    }
}`,
        caption: 'A limpeza roda tanto no fim natural quanto no `yield break` — e também quando quem consome dá `break`.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Do lado de quem consome, `Take`, `TakeWhile` e `First` fazem o mesmo trabalho sem exigir um `yield break` no produtor. Escreva o gerador completo e deixe o consumidor decidir onde parar — costuma ser mais reutilizável.',
      },
    ],
    quiz: [
      {
        id: 's08c05l03q1',
        type: 'single',
        prompt: 'O que acontece com os itens já produzidos quando um `yield break` executa?',
        options: [
          { id: 'a', text: 'Permanecem: `yield break` encerra a sequência, não a descarta', correct: true },
          { id: 'b', text: 'São descartados e a sequência fica vazia' },
          { id: 'c', text: 'São reenviados ao consumidor' },
          { id: 'd', text: 'É lançada uma exceção' },
        ],
        explanation:
          'Cada item já foi entregue a quem consome no momento do `yield return`. O `break` apenas informa que não virão mais.',
      },
      {
        id: 's08c05l03q2',
        type: 'single',
        prompt: 'Como quem consome distingue um `yield break` do fim natural da sequência?',
        options: [
          { id: 'a', text: 'Não distingue: nos dois casos `MoveNext()` devolve `false`', correct: true },
          { id: 'b', text: 'O `foreach` recebe um sinal especial' },
          { id: 'c', text: '`Current` fica com o valor padrão' },
          { id: 'd', text: 'Uma exceção é lançada no `yield break`' },
        ],
        explanation:
          'Se a distinção importa, ela precisa fazer parte dos dados — um item sentinela, ou um `out` num método que não seja iterador.',
      },
      {
        id: 's08c05l03q3',
        type: 'single',
        prompt: 'Qual a diferença entre devolver `yield break` e devolver `null`?',
        options: [
          { id: 'a', text: '`yield break` produz sequência vazia; `null` faz o `foreach` de quem chama lançar', correct: true },
          { id: 'b', text: 'Nenhuma: os dois representam ausência' },
          { id: 'c', text: '`null` é mais eficiente' },
          { id: 'd', text: '`yield break` só funciona dentro de laços' },
        ],
        explanation:
          'É a mesma regra do capítulo de nullability: nunca devolva coleção nula. Uma sequência vazia é iterável e não exige verificação.',
      },
    ],
    challenge: {
      brief:
        'Escreva um leitor de arquivo de configuração que interrompe a sequência em condições específicas, usando `yield break` — e garanta a limpeza com `try`/`finally`.',
      requirements: [
        '`LerAte` interrompe ao encontrar a linha marcadora, sem incluí-la.',
        '`LerValidas` interrompe no primeiro erro de formato, produzindo apenas as válidas.',
        '`Fatiar` devolve sequência vazia via `yield break` quando o tamanho é inválido.',
        '`ComLimpeza` registra numa lista que a limpeza rodou, tanto no fim natural quanto no `yield break` e no `break` de quem consome.',
        'Nenhum gerador devolve `null`.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static readonly List<string> limpezas = new();

    static IEnumerable<string> LerAte(string[] linhas, string marcador)
    {
        // TODO: para ao encontrar o marcador, sem incluir a linha
        yield break;
    }

    static IEnumerable<int> LerValidas(string[] linhas)
    {
        // TODO: converte cada linha; para no primeiro erro de formato
        yield break;
    }

    static IEnumerable<int[]> Fatiar(int[] dados, int tamanho)
    {
        // TODO: yield break imediato quando tamanho <= 0 ou dados vazio
        yield break;
    }

    static IEnumerable<int> ComLimpeza(int[] dados, string rotulo)
    {
        // TODO: try/finally registrando em 'limpezas'; yield break em valor negativo
        yield break;
    }

    static void Main()
    {
        string[] arquivo = { "host=local", "porta=5239", "FIM", "ignorado=1" };

        Console.WriteLine($"ate FIM: {string.Join(" | ", LerAte(arquivo, "FIM"))}");
        Console.WriteLine($"sem marcador: {string.Join(" | ", LerAte(arquivo, "NADA"))}");
        Console.WriteLine($"marcador primeiro: [{string.Join(" | ", LerAte(new[] { "FIM", "x" }, "FIM"))}]");
        Console.WriteLine($"arquivo vazio: [{string.Join(" | ", LerAte(new string[0], "FIM"))}]");

        Console.WriteLine($"validas: {string.Join(",", LerValidas(new[] { "1", "2", "abc", "3" }))}");
        Console.WriteLine($"todas validas: {string.Join(",", LerValidas(new[] { "10", "20" }))}");
        Console.WriteLine($"primeira invalida: [{string.Join(",", LerValidas(new[] { "x", "1" }))}]");

        Console.WriteLine($"fatias: {Fatiar(new[] { 1, 2, 3, 4, 5 }, 2).Count()}");
        Console.WriteLine($"fatias tamanho zero: {Fatiar(new[] { 1, 2 }, 0).Count()}");
        Console.WriteLine($"fatias vazio: {Fatiar(new int[0], 2).Count()}");

        foreach (int[] f in Fatiar(new[] { 1, 2, 3, 4, 5 }, 2))
        {
            Console.WriteLine($"  fatia: {string.Join(",", f)}");
        }

        limpezas.Clear();
        Console.WriteLine($"natural: {string.Join(",", ComLimpeza(new[] { 1, 2 }, "natural"))}");

        Console.WriteLine($"com break: {string.Join(",", ComLimpeza(new[] { 1, -1, 2 }, "yieldbreak"))}");

        foreach (int x in ComLimpeza(new[] { 1, 2, 3 }, "consumidor"))
        {
            break;
        }

        Console.WriteLine($"limpezas: {string.Join(",", limpezas)}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static readonly List<string> limpezas = new();

    static IEnumerable<string> LerAte(string[] linhas, string marcador)
    {
        foreach (string linha in linhas)
        {
            if (linha == marcador)
            {
                yield break;
            }

            yield return linha;
        }
    }

    static IEnumerable<int> LerValidas(string[] linhas)
    {
        foreach (string linha in linhas)
        {
            if (!int.TryParse(linha, out int valor))
            {
                yield break;
            }

            yield return valor;
        }
    }

    static IEnumerable<int[]> Fatiar(int[] dados, int tamanho)
    {
        if (tamanho <= 0 || dados.Length == 0)
        {
            yield break;
        }

        for (int i = 0; i < dados.Length; i += tamanho)
        {
            int fim = Math.Min(i + tamanho, dados.Length);
            var fatia = new int[fim - i];

            for (int j = i; j < fim; j++)
            {
                fatia[j - i] = dados[j];
            }

            yield return fatia;
        }
    }

    static IEnumerable<int> ComLimpeza(int[] dados, string rotulo)
    {
        try
        {
            foreach (int x in dados)
            {
                if (x < 0)
                {
                    yield break;
                }

                yield return x;
            }
        }
        finally
        {
            limpezas.Add(rotulo);
        }
    }

    static void Main()
    {
        string[] arquivo = { "host=local", "porta=5239", "FIM", "ignorado=1" };

        Console.WriteLine($"ate FIM: {string.Join(" | ", LerAte(arquivo, "FIM"))}");
        Console.WriteLine($"sem marcador: {string.Join(" | ", LerAte(arquivo, "NADA"))}");
        Console.WriteLine($"marcador primeiro: [{string.Join(" | ", LerAte(new[] { "FIM", "x" }, "FIM"))}]");
        Console.WriteLine($"arquivo vazio: [{string.Join(" | ", LerAte(new string[0], "FIM"))}]");

        Console.WriteLine($"validas: {string.Join(",", LerValidas(new[] { "1", "2", "abc", "3" }))}");
        Console.WriteLine($"todas validas: {string.Join(",", LerValidas(new[] { "10", "20" }))}");
        Console.WriteLine($"primeira invalida: [{string.Join(",", LerValidas(new[] { "x", "1" }))}]");

        Console.WriteLine($"fatias: {Fatiar(new[] { 1, 2, 3, 4, 5 }, 2).Count()}");
        Console.WriteLine($"fatias tamanho zero: {Fatiar(new[] { 1, 2 }, 0).Count()}");
        Console.WriteLine($"fatias vazio: {Fatiar(new int[0], 2).Count()}");

        foreach (int[] f in Fatiar(new[] { 1, 2, 3, 4, 5 }, 2))
        {
            Console.WriteLine($"  fatia: {string.Join(",", f)}");
        }

        limpezas.Clear();
        Console.WriteLine($"natural: {string.Join(",", ComLimpeza(new[] { 1, 2 }, "natural"))}");

        Console.WriteLine($"com break: {string.Join(",", ComLimpeza(new[] { 1, -1, 2 }, "yieldbreak"))}");

        foreach (int x in ComLimpeza(new[] { 1, 2, 3 }, "consumidor"))
        {
            break;
        }

        Console.WriteLine($"limpezas: {string.Join(",", limpezas)}");
    }
}`,
      hints: [
        '`int.TryParse` devolve `false` sem lançar — é o que permite decidir pelo `yield break` sem `try`/`catch`.',
        'O `yield break` de `Fatiar` está antes do laço: ele devolve sequência vazia sem produzir nada.',
        'O `finally` de `ComLimpeza` roda nas três situações: fim natural, `yield break` e `Dispose` disparado pelo `break` de quem consome.',
        '`string.Join` sobre sequência vazia devolve string vazia — por isso as saídas esperadas usam colchetes para tornar o vazio visível.',
      ],
      tests: [
        {
          name: 'Encerramento antecipado',
          expectedStdout:
            'ate FIM: host=local | porta=5239\nsem marcador: host=local | porta=5239 | FIM | ignorado=1\n' +
            'marcador primeiro: []\narquivo vazio: []\n' +
            'validas: 1,2\ntodas validas: 10,20\nprimeira invalida: []\n' +
            'fatias: 3\nfatias tamanho zero: 0\nfatias vazio: 0\n' +
            '  fatia: 1,2\n  fatia: 3,4\n  fatia: 5\n' +
            'natural: 1,2\ncom break: 1\n' +
            'limpezas: natural,yieldbreak,consumidor',
        },
      ],
    },
  },

  {
    id: 's08c05l04',
    title: 'Avaliação preguiçosa',
    objective: 'Entender quando uma sequência é realmente calculada, e o que isso muda no desempenho e no comportamento.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma sequência preguiçosa não guarda resultado: ela guarda **como calcular**. O trabalho acontece no momento em que alguém percorre — nem antes, nem uma vez só.',
      },
      {
        kind: 'text',
        body:
          'Isso divide os operadores do LINQ em dois grupos, e reconhecer a diferença explica quase todo comportamento inesperado com sequências.',
      },
      {
        kind: 'table',
        headers: ['Grupo', 'Operadores', 'Quando executam'],
        rows: [
          ['preguiçosos', '`Where`, `Select`, `Take`, `Skip`, `OrderBy`', 'só ao percorrer'],
          ['imediatos', '`ToList`, `ToArray`, `Count`, `Sum`, `First`, `Any`', 'na chamada'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Os preguiçosos devolvem `IEnumerable<T>`; os imediatos devolvem um valor concreto. Olhar o tipo de retorno é a forma mais rápida de saber em qual grupo um operador está.',
      },
      {
        kind: 'text',
        body:
          'O ganho é evitar trabalho. Numa cadeia preguiçosa, cada item atravessa toda a cadeia antes do próximo — e a produção para assim que o consumidor tem o que queria.',
      },
      {
        kind: 'code',
        code: `var resultado = Contar(1000)
    .Where(n => n % 2 == 0)
    .Select(n => n * n)
    .Take(3);

Console.WriteLine(string.Join(",", resultado));`,
      },
      {
        kind: 'output',
        code: `4,16,36`,
        caption: 'A fonte produziu 6 itens, não mil. `Take(3)` parou a cadeia inteira assim que teve três resultados.',
      },
      {
        kind: 'compare',
        good: `// nenhuma colecao intermediaria
fonte.Where(...).Select(...).Take(3)`,
        bad: `// tres listas completas na memoria
fonte.Where(...).ToList()
     .Select(...).ToList()
     .Take(3).ToList()`,
        goodLabel: 'Cadeia preguiçosa',
        badLabel: 'Materializando a cada passo',
      },
      {
        kind: 'text',
        body:
          'A preguiça tem um custo, e ele aparece quando a mesma sequência é percorrida mais de uma vez: **o trabalho se repete**.',
      },
      {
        kind: 'code',
        code: `var caros = fonte.Select(x => CalculoCaro(x));

int quantos = caros.Count();   // calcula tudo
var lista = caros.ToList();    // calcula tudo de novo`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A regra prática: **percorreu uma vez, deixe preguiçoso; vai percorrer duas ou mais, materialize com `ToList()`**. Um `Count()` seguido de um `foreach` sobre a mesma sequência já é motivo suficiente.',
      },
      {
        kind: 'text',
        body:
          'O segundo efeito colateral é mais sutil: como o cálculo acontece depois, ele enxerga o **estado do momento da iteração**, não o da definição.',
      },
      {
        kind: 'code',
        code: `var lista = new List<int> { 1, 2, 3 };
var pares = lista.Where(n => n % 2 == 0);

lista.Add(4);

Console.WriteLine(string.Join(",", pares));`,
      },
      {
        kind: 'output',
        code: `2,4`,
        caption: 'O `4` entrou depois da definição do filtro, e ainda assim apareceu — a consulta foi avaliada no `Join`.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Isso vira exceção quando a coleção muda **durante** a iteração: `InvalidOperationException` com "Collection was modified". Materialize antes de modificar a fonte.',
      },
      {
        kind: 'text',
        body:
          'Nem todo operador preguiçoso é igualmente barato. `OrderBy` é preguiçoso, mas quando finalmente executa precisa de **toda** a sequência em memória para ordenar — a preguiça adia o custo, não o elimina.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Ordem importa numa cadeia: `Where` antes de `Select` processa menos itens; `Take` antes de `OrderBy` dá resultado diferente de `OrderBy` antes de `Take`. A preguiça não reordena nada por você.',
      },
    ],
    quiz: [
      {
        id: 's08c05l04q1',
        type: 'single',
        prompt: 'Como identificar rapidamente se um operador do LINQ é preguiçoso?',
        options: [
          { id: 'a', text: 'Pelo tipo de retorno: `IEnumerable<T>` é preguiçoso, valor concreto é imediato', correct: true },
          { id: 'b', text: 'Preguiçosos sempre têm nome no gerúndio' },
          { id: 'c', text: 'Preguiçosos aceitam lambda' },
          { id: 'd', text: 'Todos os operadores do LINQ são preguiçosos' },
        ],
        explanation:
          '`Where` devolve `IEnumerable<T>` e não faz nada; `Count()` devolve `int` e precisa percorrer para responder. O tipo denuncia o comportamento.',
      },
      {
        id: 's08c05l04q2',
        type: 'single',
        prompt: 'Quando materializar uma sequência com `ToList()`?',
        options: [
          { id: 'a', text: 'Quando ela será percorrida mais de uma vez', correct: true },
          { id: 'b', text: 'Sempre, por segurança' },
          { id: 'c', text: 'Nunca: a preguiça é sempre melhor' },
          { id: 'd', text: 'Somente quando a fonte é um array' },
        ],
        explanation:
          'Percorrer duas vezes uma cadeia preguiçosa repete todo o trabalho. Materializar troca memória por tempo — e só compensa quando há reuso.',
      },
      {
        id: 's08c05l04q3',
        type: 'single',
        prompt: 'Por que `OrderBy`, mesmo sendo preguiçoso, não economiza memória?',
        options: [
          { id: 'a', text: 'Quando executa, precisa de toda a sequência em memória para ordenar', correct: true },
          { id: 'b', text: 'Porque ele materializa na chamada' },
          { id: 'c', text: 'Porque devolve um array' },
          { id: 'd', text: 'Ele economiza: ordena item a item' },
        ],
        explanation:
          'A preguiça adia o custo até o primeiro `MoveNext()`, mas não o elimina. Ordenar exige conhecer todos os elementos antes de decidir o primeiro.',
      },
    ],
    challenge: {
      brief:
        'Demonstre e meça a avaliação preguiçosa: conte quantos itens a fonte realmente produz em cada cenário, mostre a repetição de trabalho e a captura do estado no momento da iteração.',
      requirements: [
        '`Fonte` incrementa um contador a cada item produzido.',
        'Uma cadeia com `Where`, `Select` e `Take` deve produzir apenas os itens necessários.',
        'Demonstre que dois percursos da mesma cadeia dobram o trabalho.',
        'Demonstre que `ToList()` evita a repetição.',
        'Mostre que uma consulta definida antes de a fonte mudar enxerga a mudança.',
        '`Where` antes de `Select` produz menos chamadas de projeção que a ordem inversa.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static int produzidos;
    static int projetados;

    static IEnumerable<int> Fonte(int ate)
    {
        // TODO: incremente 'produzidos' a cada item
        yield break;
    }

    static int Projetar(int n)
    {
        projetados++;
        return n * n;
    }

    static void Zerar()
    {
        produzidos = 0;
        projetados = 0;
    }

    static void Main()
    {
        Zerar();
        var cadeia = Fonte(1000).Where(n => n % 2 == 0).Select(Projetar).Take(3);
        Console.WriteLine($"definida: produzidos={produzidos}");

        Console.WriteLine($"resultado: {string.Join(",", cadeia)}");
        Console.WriteLine($"apos iterar: produzidos={produzidos} projetados={projetados}");

        Zerar();
        int _ = cadeia.Count();
        int __ = cadeia.Count();
        Console.WriteLine($"dois percursos: produzidos={produzidos}");

        Zerar();
        var materializada = Fonte(10).Where(n => n % 2 == 0).Select(Projetar).ToList();
        int depoisDeMaterializar = produzidos;
        int a = materializada.Count;
        int b = materializada.Count;
        Console.WriteLine($"materializada: produzidos={depoisDeMaterializar} apos dois usos={produzidos}");

        var lista = new List<int> { 1, 2, 3 };
        var pares = lista.Where(n => n % 2 == 0);
        lista.Add(4);
        Console.WriteLine($"estado no momento da iteracao: {string.Join(",", pares)}");

        Zerar();
        int _c = Fonte(10).Where(n => n % 2 == 0).Select(Projetar).Count();
        Console.WriteLine($"where antes: projetados={projetados}");

        Zerar();
        int _d = Fonte(10).Select(Projetar).Where(n => n % 2 == 0).Count();
        Console.WriteLine($"select antes: projetados={projetados}");

        Zerar();
        int primeiro = Fonte(1000).First(n => n > 5);
        Console.WriteLine($"first: {primeiro} produzidos={produzidos}");

        Zerar();
        bool existe = Fonte(1000).Any(n => n == 3);
        Console.WriteLine($"any: {existe} produzidos={produzidos}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static int produzidos;
    static int projetados;

    static IEnumerable<int> Fonte(int ate)
    {
        for (int i = 1; i <= ate; i++)
        {
            produzidos++;
            yield return i;
        }
    }

    static int Projetar(int n)
    {
        projetados++;
        return n * n;
    }

    static void Zerar()
    {
        produzidos = 0;
        projetados = 0;
    }

    static void Main()
    {
        Zerar();
        var cadeia = Fonte(1000).Where(n => n % 2 == 0).Select(Projetar).Take(3);
        Console.WriteLine($"definida: produzidos={produzidos}");

        Console.WriteLine($"resultado: {string.Join(",", cadeia)}");
        Console.WriteLine($"apos iterar: produzidos={produzidos} projetados={projetados}");

        Zerar();
        int _ = cadeia.Count();
        int __ = cadeia.Count();
        Console.WriteLine($"dois percursos: produzidos={produzidos}");

        Zerar();
        var materializada = Fonte(10).Where(n => n % 2 == 0).Select(Projetar).ToList();
        int depoisDeMaterializar = produzidos;
        int a = materializada.Count;
        int b = materializada.Count;
        Console.WriteLine($"materializada: produzidos={depoisDeMaterializar} apos dois usos={produzidos}");

        var lista = new List<int> { 1, 2, 3 };
        var pares = lista.Where(n => n % 2 == 0);
        lista.Add(4);
        Console.WriteLine($"estado no momento da iteracao: {string.Join(",", pares)}");

        Zerar();
        int _c = Fonte(10).Where(n => n % 2 == 0).Select(Projetar).Count();
        Console.WriteLine($"where antes: projetados={projetados}");

        Zerar();
        int _d = Fonte(10).Select(Projetar).Where(n => n % 2 == 0).Count();
        Console.WriteLine($"select antes: projetados={projetados}");

        Zerar();
        int primeiro = Fonte(1000).First(n => n > 5);
        Console.WriteLine($"first: {primeiro} produzidos={produzidos}");

        Zerar();
        bool existe = Fonte(1000).Any(n => n == 3);
        Console.WriteLine($"any: {existe} produzidos={produzidos}");
    }
}`,
      hints: [
        'A cadeia com `Take(3)` precisa de três pares, e o terceiro par é o 6 — então a fonte produz exatamente 6 itens.',
        'Depois do `ToList()`, `materializada.Count` é uma propriedade da lista: ela não toca a fonte, e o contador não muda.',
        '`Where` antes de `Select` projeta apenas os 5 pares de 1 a 10; a ordem inversa projeta os 10.',
        '`First` e `Any` param assim que encontram — são imediatos, mas não percorrem tudo.',
      ],
      tests: [
        {
          name: 'Medindo a preguiça',
          expectedStdout:
            'definida: produzidos=0\nresultado: 4,16,36\napos iterar: produzidos=6 projetados=3\n' +
            'dois percursos: produzidos=12\n' +
            'materializada: produzidos=10 apos dois usos=10\n' +
            'estado no momento da iteracao: 2,4\n' +
            'where antes: projetados=5\nselect antes: projetados=10\n' +
            'first: 6 produzidos=6\nany: True produzidos=3',
        },
      ],
    },
  },

  {
    id: 's08c05l05',
    title: 'Sequências infinitas',
    objective: 'Escrever geradores sem fim e consumi-los com segurança.',
    concept: [
      {
        kind: 'text',
        body:
          'Como um iterador só produz o próximo item quando pedido, nada impede que ele **nunca acabe**. Um `while (true)` com `yield return` é uma sequência infinita perfeitamente válida.',
      },
      {
        kind: 'code',
        code: `static IEnumerable<int> Naturais()
{
    int n = 1;

    while (true)
    {
        yield return n++;
    }
}`,
        caption: 'O método nunca retorna. Ele pausa em cada `yield return` e retoma quando pedem o próximo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Consumir isso com `foreach` sem parada, ou com `ToList()`, `Count()` ou `OrderBy`, **trava o programa**. Não há erro nem exceção: o processo simplesmente roda para sempre até o tempo limite.',
      },
      {
        kind: 'compare',
        good: `foreach (int n in Naturais().Take(5))
{
    Console.WriteLine(n);
}

var primeiro = Naturais().First(n => n * n > 100);`,
        bad: `foreach (int n in Naturais())
{
    Console.WriteLine(n);
}

var lista = Naturais().ToList();`,
        goodLabel: 'Sempre com um limitador',
        badLabel: 'Consumo sem fim',
      },
      {
        kind: 'text',
        body: 'Os operadores seguros sobre uma sequência infinita são os que param sozinhos:',
      },
      {
        kind: 'table',
        headers: ['Operador', 'Seguro?', 'Por quê'],
        rows: [
          ['`Take(n)`', 'sim', 'para depois de n itens'],
          ['`TakeWhile(...)`', 'sim, se a condição falhar', 'para no primeiro item que não casa'],
          ['`First(...)`', 'sim, se existir', 'para no primeiro que casa'],
          ['`Any(...)`', 'sim, se existir', 'para no primeiro que casa'],
          ['`Where`, `Select`', 'sim', 'preguiçosos, não consomem sozinhos'],
          ['`Count`, `ToList`, `Last`, `OrderBy`', '**não**', 'precisam do fim da sequência'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`First(...)` e `Any(...)` só param **se o item existir**. `Naturais().First(n => n < 0)` procura para sempre — a condição nunca será verdadeira, e o operador nunca desiste.',
      },
      {
        kind: 'text',
        body:
          'A vantagem prática é separar a **definição** da sequência da decisão de quanto dela usar. O gerador não precisa saber quantos itens alguém vai querer.',
      },
      {
        kind: 'code',
        code: `static IEnumerable<long> Fibonacci()
{
    long a = 0, b = 1;

    while (true)
    {
        yield return a;
        (a, b) = (b, a + b);
    }
}

Console.WriteLine(string.Join(",", Fibonacci().Take(10)));`,
      },
      {
        kind: 'output',
        code: `0,1,1,2,3,5,8,13,21,34`,
        caption: 'O gerador não tem limite embutido. Quem consome decide — 10 aqui, 100 em outro lugar.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Compare com a alternativa: um método `Fibonacci(int quantidade)` que devolve uma lista. Ele obriga a decidir o tamanho na hora da chamada, e não serve para "os primeiros que passarem de mil".',
      },
      {
        kind: 'text',
        body:
          'Sequências infinitas combinam bem com filtros: a filtragem também é preguiçosa, então a busca só avança o necessário.',
      },
      {
        kind: 'code',
        code: `var multiplos = Naturais().Where(n => n % 3 == 0).Take(4);
Console.WriteLine(string.Join(",", multiplos));

var primeiro = Naturais().First(n => n * n > 100);
Console.WriteLine(primeiro);`,
      },
      {
        kind: 'output',
        code: `3,6,9,12
11`,
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Quando um gerador infinito é público, deixe isso claro no nome ou na documentação — `NaturaisInfinitos()` avisa antes do travamento. E ofereça uma sobrecarga com limite para quem só quer os N primeiros.',
      },
    ],
    quiz: [
      {
        id: 's08c05l05q1',
        type: 'single',
        prompt: 'O que acontece em `Naturais().ToList()`, com `Naturais()` infinita?',
        options: [
          { id: 'a', text: 'O programa trava até estourar o tempo ou a memória', correct: true },
          { id: 'b', text: 'É lançada `InvalidOperationException`' },
          { id: 'c', text: 'A lista fica com os 100 primeiros' },
          { id: 'd', text: 'O compilador rejeita a chamada' },
        ],
        explanation:
          '`ToList` percorre até o fim, e não há fim. Nenhum aviso é possível: o compilador não tem como saber que a sequência é infinita.',
      },
      {
        id: 's08c05l05q2',
        type: 'single',
        prompt: 'Por que `Naturais().First(n => n < 0)` trava?',
        options: [
          { id: 'a', text: '`First` para no primeiro item que casa, e nenhum natural é negativo', correct: true },
          { id: 'b', text: 'Porque `First` sempre percorre tudo' },
          { id: 'c', text: 'Porque `First` não funciona com condição' },
          { id: 'd', text: 'Não trava: devolve `default`' },
        ],
        explanation:
          '`First` é seguro **desde que o item exista**. Quando não existe, ele procura para sempre. `FirstOrDefault` tem o mesmo problema em sequência infinita.',
      },
      {
        id: 's08c05l05q3',
        type: 'single',
        prompt: 'Qual a vantagem de um gerador infinito sobre `Fibonacci(int quantidade)`?',
        options: [
          { id: 'a', text: 'Quem consome decide quanto usar, inclusive por condição em vez de quantidade', correct: true },
          { id: 'b', text: 'É mais rápido' },
          { id: 'c', text: 'Usa menos memória para a mesma quantidade' },
          { id: 'd', text: 'Não pode travar' },
        ],
        explanation:
          'Com o gerador infinito, "os primeiros 10" e "os que passarem de mil" são a mesma sequência com consumidores diferentes.',
      },
    ],
    challenge: {
      brief:
        'Escreva um conjunto de geradores infinitos — naturais, Fibonacci, potências e um ciclo — e consuma cada um com limitadores adequados, sem travar.',
      requirements: [
        'Todos os geradores usam `while (true)` e não têm limite embutido.',
        'Todo consumo passa por `Take`, `TakeWhile`, `First` ou `Any` — nunca `ToList` direto.',
        '`Ciclar` repete uma sequência finita para sempre; com fonte vazia, devolve sequência vazia em vez de travar.',
        '`Potencias` usa `long` e produz `base^0, base^1, ...`.',
        '`Primos` gera primos por divisão simples.',
        'Um teste usa `TakeWhile` para parar por condição, não por contagem.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static IEnumerable<int> Naturais()
    {
        // TODO: 1, 2, 3, ... para sempre
        yield break;
    }

    static IEnumerable<long> Fibonacci()
    {
        // TODO: 0, 1, 1, 2, 3, ... para sempre
        yield break;
    }

    static IEnumerable<long> Potencias(long baseValor)
    {
        // TODO: baseValor^0, baseValor^1, ... para sempre
        yield break;
    }

    static IEnumerable<int> Primos()
    {
        // TODO: 2, 3, 5, 7, ... para sempre
        yield break;
    }

    static bool EhPrimo(int n)
    {
        if (n < 2)
        {
            return false;
        }

        for (int d = 2; d * d <= n; d++)
        {
            if (n % d == 0)
            {
                return false;
            }
        }

        return true;
    }

    static IEnumerable<T> Ciclar<T>(IEnumerable<T> fonte)
    {
        // TODO: repete a fonte para sempre; fonte vazia devolve sequencia vazia
        yield break;
    }

    static void Main()
    {
        Console.WriteLine($"naturais: {string.Join(",", Naturais().Take(6))}");
        Console.WriteLine($"fibonacci: {string.Join(",", Fibonacci().Take(10))}");
        Console.WriteLine($"potencias de 2: {string.Join(",", Potencias(2).Take(8))}");
        Console.WriteLine($"potencias de 10: {string.Join(",", Potencias(10).Take(4))}");
        Console.WriteLine($"primos: {string.Join(",", Primos().Take(8))}");

        Console.WriteLine($"fib ate 100: {string.Join(",", Fibonacci().TakeWhile(f => f < 100))}");
        Console.WriteLine($"pot ate 1000: {string.Join(",", Potencias(3).TakeWhile(p => p <= 1000))}");

        Console.WriteLine($"primeiro quadrado > 100: {Naturais().First(n => n * n > 100)}");
        Console.WriteLine($"primeiro fib > 1000: {Fibonacci().First(f => f > 1000)}");
        Console.WriteLine($"primeiro primo > 50: {Primos().First(p => p > 50)}");

        Console.WriteLine($"existe multiplo de 7: {Naturais().Any(n => n % 7 == 0)}");

        Console.WriteLine($"multiplos de 3: {string.Join(",", Naturais().Where(n => n % 3 == 0).Take(5))}");
        Console.WriteLine($"quadrados pares: {string.Join(",", Naturais().Select(n => n * n).Where(q => q % 2 == 0).Take(4))}");

        Console.WriteLine($"ciclo: {string.Join(",", Ciclar(new[] { "a", "b", "c" }).Take(7))}");
        Console.WriteLine($"ciclo unitario: {string.Join(",", Ciclar(new[] { 9 }).Take(3))}");
        Console.WriteLine($"ciclo vazio: [{string.Join(",", Ciclar(new int[0]).Take(5))}]");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static IEnumerable<int> Naturais()
    {
        int n = 1;

        while (true)
        {
            yield return n++;
        }
    }

    static IEnumerable<long> Fibonacci()
    {
        long a = 0;
        long b = 1;

        while (true)
        {
            yield return a;
            (a, b) = (b, a + b);
        }
    }

    static IEnumerable<long> Potencias(long baseValor)
    {
        long atual = 1;

        while (true)
        {
            yield return atual;
            atual *= baseValor;
        }
    }

    static IEnumerable<int> Primos()
    {
        int candidato = 2;

        while (true)
        {
            if (EhPrimo(candidato))
            {
                yield return candidato;
            }

            candidato++;
        }
    }

    static bool EhPrimo(int n)
    {
        if (n < 2)
        {
            return false;
        }

        for (int d = 2; d * d <= n; d++)
        {
            if (n % d == 0)
            {
                return false;
            }
        }

        return true;
    }

    static IEnumerable<T> Ciclar<T>(IEnumerable<T> fonte)
    {
        var copia = new List<T>(fonte);

        if (copia.Count == 0)
        {
            yield break;
        }

        while (true)
        {
            foreach (T item in copia)
            {
                yield return item;
            }
        }
    }

    static void Main()
    {
        Console.WriteLine($"naturais: {string.Join(",", Naturais().Take(6))}");
        Console.WriteLine($"fibonacci: {string.Join(",", Fibonacci().Take(10))}");
        Console.WriteLine($"potencias de 2: {string.Join(",", Potencias(2).Take(8))}");
        Console.WriteLine($"potencias de 10: {string.Join(",", Potencias(10).Take(4))}");
        Console.WriteLine($"primos: {string.Join(",", Primos().Take(8))}");

        Console.WriteLine($"fib ate 100: {string.Join(",", Fibonacci().TakeWhile(f => f < 100))}");
        Console.WriteLine($"pot ate 1000: {string.Join(",", Potencias(3).TakeWhile(p => p <= 1000))}");

        Console.WriteLine($"primeiro quadrado > 100: {Naturais().First(n => n * n > 100)}");
        Console.WriteLine($"primeiro fib > 1000: {Fibonacci().First(f => f > 1000)}");
        Console.WriteLine($"primeiro primo > 50: {Primos().First(p => p > 50)}");

        Console.WriteLine($"existe multiplo de 7: {Naturais().Any(n => n % 7 == 0)}");

        Console.WriteLine($"multiplos de 3: {string.Join(",", Naturais().Where(n => n % 3 == 0).Take(5))}");
        Console.WriteLine($"quadrados pares: {string.Join(",", Naturais().Select(n => n * n).Where(q => q % 2 == 0).Take(4))}");

        Console.WriteLine($"ciclo: {string.Join(",", Ciclar(new[] { "a", "b", "c" }).Take(7))}");
        Console.WriteLine($"ciclo unitario: {string.Join(",", Ciclar(new[] { 9 }).Take(3))}");
        Console.WriteLine($"ciclo vazio: [{string.Join(",", Ciclar(new int[0]).Take(5))}]");
    }
}`,
      hints: [
        'Se o programa não terminar, quase certamente falta um `Take` ou `TakeWhile` em algum consumo. Todo `string.Join` sobre gerador infinito precisa de um limitador.',
        '`Ciclar` precisa copiar a fonte para uma lista: percorrer o `IEnumerable` original repetidamente reexecutaria o gerador de origem a cada volta.',
        'A guarda de lista vazia em `Ciclar` é obrigatória — sem ela, o `while (true)` giraria sem produzir nada e o `Take` nunca seria satisfeito.',
        '`(a, b) = (b, a + b)` atualiza os dois de uma vez, sem variável temporária e sem usar o novo `a` no cálculo de `b`.',
      ],
      tests: [
        {
          name: 'Geradores infinitos',
          expectedStdout:
            'naturais: 1,2,3,4,5,6\nfibonacci: 0,1,1,2,3,5,8,13,21,34\n' +
            'potencias de 2: 1,2,4,8,16,32,64,128\npotencias de 10: 1,10,100,1000\n' +
            'primos: 2,3,5,7,11,13,17,19\n' +
            'fib ate 100: 0,1,1,2,3,5,8,13,21,34,55,89\npot ate 1000: 1,3,9,27,81,243,729\n' +
            'primeiro quadrado > 100: 11\nprimeiro fib > 1000: 1597\nprimeiro primo > 50: 53\n' +
            'existe multiplo de 7: True\n' +
            'multiplos de 3: 3,6,9,12,15\nquadrados pares: 4,16,36,64\n' +
            'ciclo: a,b,c,a,b,c,a\nciclo unitario: 9,9,9\nciclo vazio: []',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's08c05l06',
    title: 'Escrevendo sua coleção',
    objective: 'Construir uma coleção completa: enumerável, indexável, contável e utilizável com LINQ.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma coleção própria é mais que um `GetEnumerator`. O que separa "iterável" de "coleção de verdade" é o conjunto de interfaces que ela implementa — e cada uma libera capacidades específicas.',
      },
      {
        kind: 'table',
        headers: ['Interface', 'Exige', 'Libera'],
        rows: [
          ['`IEnumerable<T>`', '`GetEnumerator`', '`foreach` e todo o LINQ'],
          ['`IReadOnlyCollection<T>`', '`+ Count`', '`Count` em O(1)'],
          ['`IReadOnlyList<T>`', '`+ this[int]`', 'acesso por índice'],
          ['`ICollection<T>`', '`+ Add`, `Remove`, `Contains`…', 'modificação'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Implementar `IReadOnlyCollection<T>` tem um ganho concreto: `Count()` do LINQ detecta a interface e usa a propriedade em vez de percorrer a sequência inteira. É O(1) em vez de O(n), sem nenhuma mudança em quem chama.',
      },
      {
        kind: 'text',
        body:
          'Para a maioria dos casos, herdar de uma coleção pronta ou compor com uma é melhor que implementar tudo. A escolha entre as duas abordagens vale a pena entender.',
      },
      {
        kind: 'compare',
        good: `class Historico<T> : IReadOnlyList<T>
{
    private readonly List<T> itens = new();

    public int Count => itens.Count;
    public T this[int i] => itens[i];
    public IEnumerator<T> GetEnumerator()
        => itens.GetEnumerator();
}`,
        bad: `class Historico<T> : List<T>
{
    // herda Add, Remove, Clear,
    // Insert, Sort, Reverse...
    // tudo publico, sem controle
}`,
        goodLabel: 'Composição: superfície controlada',
        badLabel: 'Herança: superfície inteira herdada',
      },
      {
        kind: 'text',
        body:
          'A composição deixa você escolher exatamente quais operações expor. Uma coleção de histórico, por exemplo, aceita adição mas não remoção — algo impossível de garantir herdando de `List<T>`.',
      },
      {
        kind: 'code',
        code: `class Historico<T> : IReadOnlyList<T>
{
    private readonly List<T> itens = new();
    private readonly int capacidade;

    public Historico(int capacidade)
    {
        this.capacidade = capacidade;
    }

    public int Count => itens.Count;

    public T this[int indice] => itens[indice];

    public void Registrar(T item)
    {
        itens.Add(item);

        if (itens.Count > capacidade)
        {
            itens.RemoveAt(0);
        }
    }

    public IEnumerator<T> GetEnumerator() => itens.GetEnumerator();

    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
}`,
        caption: 'O descarte do item mais antigo é invariante da classe — quem usa não consegue burlar.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Delegar `GetEnumerator()` para a coleção interna é mais eficiente que escrever um `yield return` num laço: `List<T>` devolve um enumerador otimizado, sem a máquina de estados gerada.',
      },
      {
        kind: 'text',
        body:
          'Para que a sintaxe de inicializador de coleção funcione — `new Historico<int> { 1, 2, 3 }` —, o tipo precisa de duas coisas: implementar `IEnumerable` e ter um método público chamado **`Add`**.',
      },
      {
        kind: 'code',
        code: `public void Add(T item) => Registrar(item);

var h = new Historico<int>(3) { 1, 2, 3, 4 };`,
        caption: 'O compilador traduz o inicializador numa sequência de chamadas a `Add`.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Expor `Add` público só para habilitar o inicializador tem um custo: qualquer código passa a poder adicionar itens. Se a coleção deveria ser controlada, o inicializador não vale o preço.',
      },
      {
        kind: 'text',
        body:
          'Uma última decisão: o que fazer quando a coleção é modificada **durante** uma iteração. `List<T>` lança `InvalidOperationException`; delegando o enumerador, você herda esse comportamento de graça.',
      },
    ],
    quiz: [
      {
        id: 's08c05l06q1',
        type: 'single',
        prompt: 'O que implementar `IReadOnlyCollection<T>` melhora em relação a só `IEnumerable<T>`?',
        options: [
          { id: 'a', text: '`Count()` do LINQ passa a ser O(1) em vez de percorrer a sequência', correct: true },
          { id: 'b', text: 'Habilita o `foreach`' },
          { id: 'c', text: 'Permite modificar a coleção' },
          { id: 'd', text: 'Libera acesso por índice' },
        ],
        explanation:
          'Os operadores do LINQ verificam interfaces mais ricas em tempo de execução e usam o atalho quando existe. Índice exige `IReadOnlyList<T>`.',
      },
      {
        id: 's08c05l06q2',
        type: 'single',
        prompt: 'Por que compor com `List<T>` costuma ser melhor que herdar dela?',
        options: [
          { id: 'a', text: 'A herança expõe toda a superfície pública, incluindo operações que quebram invariantes', correct: true },
          { id: 'b', text: 'Porque `List<T>` é `sealed`' },
          { id: 'c', text: 'Porque a herança é mais lenta' },
          { id: 'd', text: 'Porque `List<T>` não implementa `IEnumerable<T>`' },
        ],
        explanation:
          'Herdando, você ganha `Clear`, `Insert`, `RemoveAt` e tudo mais, sem poder impedir. Compondo, cada operação exposta é uma decisão.',
      },
      {
        id: 's08c05l06q3',
        type: 'single',
        prompt: 'O que um tipo precisa para aceitar `new Colecao { 1, 2, 3 }`?',
        options: [
          { id: 'a', text: 'Implementar `IEnumerable` e ter um método público `Add`', correct: true },
          { id: 'b', text: 'Implementar `ICollection<T>`' },
          { id: 'c', text: 'Ter um construtor que aceite `params`' },
          { id: 'd', text: 'Herdar de `List<T>`' },
        ],
        explanation:
          'O compilador só procura por `Add` e pela interface. É um casamento por forma, como o do `foreach`.',
      },
    ],
    challenge: {
      brief:
        'Implemente uma coleção de histórico com capacidade limitada: enumerável, contável, indexável, com inicializador de coleção e descarte automático do item mais antigo.',
      requirements: [
        '`Historico<T>` implementa `IReadOnlyList<T>` — e portanto também `IReadOnlyCollection<T>` e `IEnumerable<T>`.',
        'Ao ultrapassar a capacidade, o item **mais antigo** é descartado.',
        '`GetEnumerator` delega para a coleção interna, sem `yield`.',
        'Um `Add` público habilita a sintaxe de inicializador de coleção.',
        '`MaisRecente` e `MaisAntigo` lançam `InvalidOperationException` quando vazio.',
        'O indexador valida os limites com `ArgumentOutOfRangeException`.',
        'A coleção deve funcionar com operadores do LINQ.',
      ],
      starterCode: `using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

class Historico<T> : IReadOnlyList<T>
{
    private readonly List<T> itens = new();
    private readonly int capacidade;

    public Historico(int capacidade)
    {
        if (capacidade <= 0)
        {
            throw new ArgumentException("capacidade deve ser positiva");
        }

        this.capacidade = capacidade;
    }

    public int Capacidade => capacidade;

    // TODO: Count em O(1)
    public int Count => 0;

    // TODO: indexador com validacao de limites
    public T this[int indice] => default;

    // TODO: registra e descarta o mais antigo quando passa da capacidade
    public void Registrar(T item)
    {
    }

    // TODO: habilita o inicializador de colecao
    public void Add(T item)
    {
    }

    // TODO: InvalidOperationException quando vazio
    public T MaisRecente()
    {
        return default;
    }

    public T MaisAntigo()
    {
        return default;
    }

    // TODO: delegue para a colecao interna
    public IEnumerator<T> GetEnumerator()
    {
        return null;
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}

class Program
{
    static void Main()
    {
        var h = new Historico<string>(3);

        h.Registrar("a");
        h.Registrar("b");
        h.Registrar("c");
        Console.WriteLine($"cheio: {string.Join(",", h)} count={h.Count}");

        h.Registrar("d");
        Console.WriteLine($"apos excedente: {string.Join(",", h)} count={h.Count}");

        Console.WriteLine($"indice 0: {h[0]}");
        Console.WriteLine($"indice 2: {h[2]}");
        Console.WriteLine($"mais recente: {h.MaisRecente()}");
        Console.WriteLine($"mais antigo: {h.MaisAntigo()}");
        Console.WriteLine($"capacidade: {h.Capacidade}");

        var inicializado = new Historico<int>(4) { 1, 2, 3, 4, 5 };
        Console.WriteLine($"inicializador: {string.Join(",", inicializado)}");

        Console.WriteLine($"linq soma: {inicializado.Sum()}");
        Console.WriteLine($"linq pares: {string.Join(",", inicializado.Where(n => n % 2 == 0))}");
        Console.WriteLine($"linq count: {inicializado.Count()}");
        Console.WriteLine($"linq max: {inicializado.Max()}");

        var vazio = new Historico<int>(2);
        Console.WriteLine($"vazio count: {vazio.Count}");
        Console.WriteLine($"vazio join: [{string.Join(",", vazio)}]");

        try
        {
            vazio.MaisRecente();
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"vazio erro: {ex.Message}");
        }

        try
        {
            var x = h[9];
            Console.WriteLine($"nao deveria: {x}");
        }
        catch (ArgumentOutOfRangeException)
        {
            Console.WriteLine("indice invalido");
        }

        try
        {
            var invalido = new Historico<int>(0);
            Console.WriteLine($"nao deveria: {invalido.Capacidade}");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"capacidade: {ex.Message}");
        }
    }
}`,
      solution: `using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

class Historico<T> : IReadOnlyList<T>
{
    private readonly List<T> itens = new();
    private readonly int capacidade;

    public Historico(int capacidade)
    {
        if (capacidade <= 0)
        {
            throw new ArgumentException("capacidade deve ser positiva");
        }

        this.capacidade = capacidade;
    }

    public int Capacidade => capacidade;

    public int Count => itens.Count;

    public T this[int indice]
    {
        get
        {
            if (indice < 0 || indice >= itens.Count)
            {
                throw new ArgumentOutOfRangeException(nameof(indice));
            }

            return itens[indice];
        }
    }

    public void Registrar(T item)
    {
        itens.Add(item);

        if (itens.Count > capacidade)
        {
            itens.RemoveAt(0);
        }
    }

    public void Add(T item)
    {
        Registrar(item);
    }

    public T MaisRecente()
    {
        if (itens.Count == 0)
        {
            throw new InvalidOperationException("historico vazio");
        }

        return itens[itens.Count - 1];
    }

    public T MaisAntigo()
    {
        if (itens.Count == 0)
        {
            throw new InvalidOperationException("historico vazio");
        }

        return itens[0];
    }

    public IEnumerator<T> GetEnumerator()
    {
        return itens.GetEnumerator();
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}

class Program
{
    static void Main()
    {
        var h = new Historico<string>(3);

        h.Registrar("a");
        h.Registrar("b");
        h.Registrar("c");
        Console.WriteLine($"cheio: {string.Join(",", h)} count={h.Count}");

        h.Registrar("d");
        Console.WriteLine($"apos excedente: {string.Join(",", h)} count={h.Count}");

        Console.WriteLine($"indice 0: {h[0]}");
        Console.WriteLine($"indice 2: {h[2]}");
        Console.WriteLine($"mais recente: {h.MaisRecente()}");
        Console.WriteLine($"mais antigo: {h.MaisAntigo()}");
        Console.WriteLine($"capacidade: {h.Capacidade}");

        var inicializado = new Historico<int>(4) { 1, 2, 3, 4, 5 };
        Console.WriteLine($"inicializador: {string.Join(",", inicializado)}");

        Console.WriteLine($"linq soma: {inicializado.Sum()}");
        Console.WriteLine($"linq pares: {string.Join(",", inicializado.Where(n => n % 2 == 0))}");
        Console.WriteLine($"linq count: {inicializado.Count()}");
        Console.WriteLine($"linq max: {inicializado.Max()}");

        var vazio = new Historico<int>(2);
        Console.WriteLine($"vazio count: {vazio.Count}");
        Console.WriteLine($"vazio join: [{string.Join(",", vazio)}]");

        try
        {
            vazio.MaisRecente();
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"vazio erro: {ex.Message}");
        }

        try
        {
            var x = h[9];
            Console.WriteLine($"nao deveria: {x}");
        }
        catch (ArgumentOutOfRangeException)
        {
            Console.WriteLine("indice invalido");
        }

        try
        {
            var invalido = new Historico<int>(0);
            Console.WriteLine($"nao deveria: {invalido.Capacidade}");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"capacidade: {ex.Message}");
        }
    }
}`,
      hints: [
        '`RemoveAt(0)` descarta o mais antigo. É O(n) numa `List<T>`, aceitável para históricos pequenos — uma fila circular seria o passo seguinte.',
        '`Add` apenas delega para `Registrar`: o inicializador de coleção não precisa de comportamento próprio.',
        '`itens.GetEnumerator()` devolve o enumerador otimizado da `List<T>`, sem gerar uma máquina de estados.',
        '`ArgumentOutOfRangeException` herda de `ArgumentException`, então o `catch` mais específico precisa vir antes se os dois aparecerem no mesmo `try`.',
      ],
      tests: [
        {
          name: 'Coleção de histórico',
          expectedStdout:
            'cheio: a,b,c count=3\napos excedente: b,c,d count=3\n' +
            'indice 0: b\nindice 2: d\nmais recente: d\nmais antigo: b\ncapacidade: 3\n' +
            'inicializador: 2,3,4,5\n' +
            'linq soma: 14\nlinq pares: 2,4\nlinq count: 4\nlinq max: 5\n' +
            'vazio count: 0\nvazio join: []\n' +
            'vazio erro: historico vazio\nindice invalido\n' +
            'capacidade: capacidade deve ser positiva',
        },
      ],
    },
  },

  {
    id: 's08c05l07',
    title: 'IEnumerator na mão',
    objective: 'Implementar um enumerador manualmente e entender o que `yield` gera por baixo.',
    concept: [
      {
        kind: 'text',
        body:
          'Você quase nunca vai escrever um `IEnumerator<T>` à mão — `yield` resolve. Mas escrever um é a única forma de enxergar o que o compilador faz, e existem casos em que o controle manual é necessário.',
      },
      {
        kind: 'code',
        code: `class ContadorManual : IEnumerator<int>
{
    private readonly int limite;
    private int atual = -1;

    public ContadorManual(int limite)
    {
        this.limite = limite;
    }

    public int Current => atual;

    object IEnumerator.Current => Current;

    public bool MoveNext()
    {
        atual++;
        return atual < limite;
    }

    public void Reset() => atual = -1;

    public void Dispose() { }
}`,
        caption: 'Note o `-1` inicial: o enumerador começa **antes** do primeiro item.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Esse é o contrato mais fácil de errar: um enumerador recém-criado está posicionado **antes** do primeiro elemento. Ler `Current` antes do primeiro `MoveNext()` é comportamento indefinido — por isso o `foreach` sempre chama `MoveNext()` primeiro.',
      },
      {
        kind: 'text',
        body: 'Cada membro tem uma regra específica, e o `yield` cuida de todas elas automaticamente:',
      },
      {
        kind: 'table',
        headers: ['Membro', 'Contrato'],
        rows: [
          ['`MoveNext()`', 'avança e devolve `false` quando acabou'],
          ['`Current`', 'só é válido depois de um `MoveNext()` bem-sucedido'],
          ['`Dispose()`', 'libera recursos; chamado pelo `foreach` mesmo com `break`'],
          ['`Reset()`', 'raramente implementado; `yield` lança `NotSupportedException`'],
        ],
      },
      {
        kind: 'text',
        body:
          'O `Dispose` é o membro que justifica a existência da interface `IDisposable` aqui. Uma sequência que lê arquivo precisa fechá-lo, mesmo quando quem consome desiste no meio.',
      },
      {
        kind: 'code',
        code: `public void Dispose()
{
    Console.WriteLine("dispose chamado");
}`,
      },
      {
        kind: 'output',
        code: `foreach (int x in new Sequencia())
{
    Console.WriteLine($"foreach {x}");
}

foreach 0
foreach 1
foreach 2
dispose chamado`,
        caption: 'O `Dispose` roda ao final do `foreach`, sem nenhuma chamada explícita.',
      },
      {
        kind: 'text',
        body:
          'Comparando as duas formas, fica claro por que `yield` domina: a versão manual tem o triplo do código e cinco lugares para errar.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Com yield',
          code: `IEnumerable<int> Contar(int n)
{
    for (int i = 0; i < n; i++)
    {
        yield return i;
    }
}`,
        },
        right: {
          label: 'Manual',
          code: `class E : IEnumerator<int>
{
    int atual = -1;
    readonly int n;
    public int Current => atual;
    object IEnumerator.Current => Current;
    public bool MoveNext()
        => ++atual < n;
    public void Reset() => atual = -1;
    public void Dispose() { }
}`,
        },
        note: 'A versão manual ainda precisa de uma classe `IEnumerable` que a devolva.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Guardar estado num campo do **enumerável** em vez do enumerador é o erro clássico. Dois `foreach` simultâneos sobre a mesma instância passariam a interferir um no outro. O estado pertence ao enumerador.',
      },
      {
        kind: 'text',
        body:
          'Sobram poucos motivos legítimos para o controle manual: quando o enumerador precisa ser um `struct` para evitar alocação, quando `Reset()` precisa funcionar de verdade, ou quando a lógica de avanço não cabe num fluxo linear.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Um enumerador `struct` é o que `List<T>` usa, e é por isso que `foreach` sobre uma lista não aloca nada. É uma otimização real — e uma das poucas razões práticas para escrever um enumerador à mão.',
      },
    ],
    quiz: [
      {
        id: 's08c05l07q1',
        type: 'single',
        prompt: 'Por que um enumerador começa posicionado antes do primeiro elemento?',
        options: [
          { id: 'a', text: 'Para que o `foreach` possa chamar `MoveNext()` antes de ler `Current`', correct: true },
          { id: 'b', text: 'Para permitir `Reset()`' },
          { id: 'c', text: 'Para economizar memória' },
          { id: 'd', text: 'Por compatibilidade com arrays' },
        ],
        explanation:
          'O laço gerado é `while (MoveNext()) { usa Current; }`. Se o enumerador já estivesse no primeiro item, ele seria pulado.',
      },
      {
        id: 's08c05l07q2',
        type: 'single',
        prompt: 'Onde o estado de posição deve ficar?',
        options: [
          { id: 'a', text: 'No enumerador, para que percursos simultâneos não interfiram', correct: true },
          { id: 'b', text: 'No enumerável, para ser compartilhado' },
          { id: 'c', text: 'Num campo estático' },
          { id: 'd', text: 'Tanto faz' },
        ],
        explanation:
          'É a razão de existirem duas interfaces. Guardar a posição no enumerável quebraria dois `foreach` aninhados sobre a mesma coleção.',
      },
      {
        id: 's08c05l07q3',
        type: 'single',
        prompt: 'Qual motivo legítimo para escrever um enumerador à mão?',
        options: [
          { id: 'a', text: 'Fazer dele um `struct` para evitar alocação a cada `foreach`', correct: true },
          { id: 'b', text: 'Deixar o código mais legível' },
          { id: 'c', text: 'Permitir uso do LINQ' },
          { id: 'd', text: 'Habilitar o `foreach`' },
        ],
        explanation:
          'É o que `List<T>` faz. As outras três são resolvidas melhor por `yield`, que gera uma classe e aloca — custo desprezível fora de caminhos muito quentes.',
      },
    ],
    challenge: {
      brief:
        'Implemente um enumerador manual completo sobre uma matriz, percorrendo-a linha a linha, e compare com a versão equivalente escrita com `yield`.',
      requirements: [
        '`EnumeradorDeMatriz` implementa `IEnumerator<int>` com posição própria.',
        'O enumerador começa antes do primeiro elemento.',
        '`Dispose` registra a chamada numa lista estática, provando que o `foreach` o invoca.',
        '`Reset` funciona de verdade e permite reiniciar o percurso.',
        '`Matriz` implementa `IEnumerable<int>` devolvendo o enumerador manual.',
        '`ComYield` produz a mesma sequência usando `yield return`, e as duas devem coincidir.',
        'Demonstre dois percursos simultâneos sem interferência.',
      ],
      starterCode: `using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

class EnumeradorDeMatriz : IEnumerator<int>
{
    private readonly int[,] dados;
    private int posicao = -1;

    public EnumeradorDeMatriz(int[,] dados)
    {
        this.dados = dados;
    }

    private int Total => dados.GetLength(0) * dados.GetLength(1);

    // TODO: elemento na posicao atual, linha a linha
    public int Current => 0;

    object IEnumerator.Current => Current;

    // TODO: avanca e devolve false ao passar do fim
    public bool MoveNext()
    {
        return false;
    }

    // TODO: volta para antes do primeiro
    public void Reset()
    {
    }

    // TODO: registre em Registro.Disposes
    public void Dispose()
    {
    }
}

static class Registro
{
    public static readonly List<string> Disposes = new();
}

class Matriz : IEnumerable<int>
{
    private readonly int[,] dados;

    public Matriz(int[,] dados)
    {
        this.dados = dados;
    }

    // TODO: devolve o enumerador manual
    public IEnumerator<int> GetEnumerator()
    {
        return null;
    }

    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

    // TODO: mesma sequencia, com yield return
    public IEnumerable<int> ComYield()
    {
        yield break;
    }
}

class Program
{
    static void Main()
    {
        var matriz = new Matriz(new int[,]
        {
            { 1, 2, 3 },
            { 4, 5, 6 },
        });

        Registro.Disposes.Clear();
        Console.WriteLine($"manual: {string.Join(",", matriz)}");
        Console.WriteLine($"com yield: {string.Join(",", matriz.ComYield())}");
        Console.WriteLine($"iguais: {matriz.SequenceEqual(matriz.ComYield())}");
        Console.WriteLine($"disposes: {Registro.Disposes.Count}");

        Registro.Disposes.Clear();

        foreach (int x in matriz)
        {
            if (x == 3)
            {
                break;
            }
        }

        Console.WriteLine($"dispose apos break: {Registro.Disposes.Count}");

        var e = matriz.GetEnumerator();
        Console.WriteLine($"primeiro MoveNext: {e.MoveNext()} Current={e.Current}");
        e.MoveNext();
        Console.WriteLine($"segundo: {e.Current}");
        e.Reset();
        Console.WriteLine($"apos reset: {e.MoveNext()} Current={e.Current}");
        e.Dispose();

        var pares = new List<string>();

        foreach (int a in matriz)
        {
            foreach (int b in matriz)
            {
                pares.Add($"{a}{b}");
            }
        }

        Console.WriteLine($"pares simultaneos: {pares.Count}");
        Console.WriteLine($"primeiros pares: {string.Join(",", pares.Take(4))}");

        Console.WriteLine($"linq soma: {matriz.Sum()}");
        Console.WriteLine($"linq pares: {string.Join(",", matriz.Where(n => n % 2 == 0))}");

        var vazia = new Matriz(new int[0, 0]);
        Console.WriteLine($"vazia: [{string.Join(",", vazia)}]");
    }
}`,
      solution: `using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

class EnumeradorDeMatriz : IEnumerator<int>
{
    private readonly int[,] dados;
    private int posicao = -1;

    public EnumeradorDeMatriz(int[,] dados)
    {
        this.dados = dados;
    }

    private int Total => dados.GetLength(0) * dados.GetLength(1);

    public int Current
    {
        get
        {
            int colunas = dados.GetLength(1);
            return dados[posicao / colunas, posicao % colunas];
        }
    }

    object IEnumerator.Current => Current;

    public bool MoveNext()
    {
        posicao++;
        return posicao < Total;
    }

    public void Reset()
    {
        posicao = -1;
    }

    public void Dispose()
    {
        Registro.Disposes.Add("matriz");
    }
}

static class Registro
{
    public static readonly List<string> Disposes = new();
}

class Matriz : IEnumerable<int>
{
    private readonly int[,] dados;

    public Matriz(int[,] dados)
    {
        this.dados = dados;
    }

    public IEnumerator<int> GetEnumerator()
    {
        return new EnumeradorDeMatriz(dados);
    }

    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

    public IEnumerable<int> ComYield()
    {
        for (int linha = 0; linha < dados.GetLength(0); linha++)
        {
            for (int coluna = 0; coluna < dados.GetLength(1); coluna++)
            {
                yield return dados[linha, coluna];
            }
        }
    }
}

class Program
{
    static void Main()
    {
        var matriz = new Matriz(new int[,]
        {
            { 1, 2, 3 },
            { 4, 5, 6 },
        });

        Registro.Disposes.Clear();
        Console.WriteLine($"manual: {string.Join(",", matriz)}");
        Console.WriteLine($"com yield: {string.Join(",", matriz.ComYield())}");
        Console.WriteLine($"iguais: {matriz.SequenceEqual(matriz.ComYield())}");
        Console.WriteLine($"disposes: {Registro.Disposes.Count}");

        Registro.Disposes.Clear();

        foreach (int x in matriz)
        {
            if (x == 3)
            {
                break;
            }
        }

        Console.WriteLine($"dispose apos break: {Registro.Disposes.Count}");

        var e = matriz.GetEnumerator();
        Console.WriteLine($"primeiro MoveNext: {e.MoveNext()} Current={e.Current}");
        e.MoveNext();
        Console.WriteLine($"segundo: {e.Current}");
        e.Reset();
        Console.WriteLine($"apos reset: {e.MoveNext()} Current={e.Current}");
        e.Dispose();

        var pares = new List<string>();

        foreach (int a in matriz)
        {
            foreach (int b in matriz)
            {
                pares.Add($"{a}{b}");
            }
        }

        Console.WriteLine($"pares simultaneos: {pares.Count}");
        Console.WriteLine($"primeiros pares: {string.Join(",", pares.Take(4))}");

        Console.WriteLine($"linq soma: {matriz.Sum()}");
        Console.WriteLine($"linq pares: {string.Join(",", matriz.Where(n => n % 2 == 0))}");

        var vazia = new Matriz(new int[0, 0]);
        Console.WriteLine($"vazia: [{string.Join(",", vazia)}]");
    }
}`,
      hints: [
        'Com uma posição linear, `posicao / colunas` dá a linha e `posicao % colunas` dá a coluna — o mesmo truque do indexador `Index` do capítulo 2.',
        '`MoveNext` incrementa **antes** de comparar. Como a posição começa em `-1`, o primeiro `MoveNext` a leva a `0`.',
        'Cada `GetEnumerator()` cria um `EnumeradorDeMatriz` novo — é isso que permite os dois `foreach` aninhados.',
        'A matriz vazia tem `Total` igual a zero, então o primeiro `MoveNext` já devolve `false`.',
        'O contador chega a 2, não 3: o `Join` sobre `matriz` registra um, e o `SequenceEqual` registra outro — o enumerador de `ComYield` é gerado pelo compilador e não passa pelo seu `Dispose`.',
      ],
      tests: [
        {
          name: 'Enumerador manual',
          expectedStdout:
            'manual: 1,2,3,4,5,6\ncom yield: 1,2,3,4,5,6\niguais: True\ndisposes: 2\n' +
            'dispose apos break: 1\n' +
            'primeiro MoveNext: True Current=1\nsegundo: 2\napos reset: True Current=1\n' +
            'pares simultaneos: 36\nprimeiros pares: 11,12,13,14\n' +
            'linq soma: 21\nlinq pares: 2,4,6\n' +
            'vazia: []',
        },
      ],
    },
  },

  {
    id: 's08c05l08',
    title: 'Range e Index',
    objective: 'Usar `^` e `..` para acessar posições relativas ao fim e fatias de coleções.',
    concept: [
      {
        kind: 'text',
        body:
          'Dois tipos pequenos resolvem duas irritações antigas: `Index` dá posições contadas a partir do fim, e `Range` recorta fatias sem laço.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Antes',
          code: `var ultimo = n[n.Length - 1];
var penultimo = n[n.Length - 2];

var meio = new int[2];
Array.Copy(n, 1, meio, 0, 2);`,
        },
        right: {
          label: 'Agora',
          code: `var ultimo = n[^1];
var penultimo = n[^2];

var meio = n[1..3];`,
        },
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O operador `^` conta a partir de **1**, não de 0. `n[^1]` é o último elemento e `n[^0]` é a posição logo depois do fim — inválida como índice, mas válida como fim de uma faixa.',
      },
      {
        kind: 'text',
        body:
          'Uma faixa `a..b` inclui `a` e **exclui** `b`. É a mesma convenção de `Substring` e de quase toda API que trabalha com intervalos.',
      },
      {
        kind: 'code',
        code: `int[] n = { 10, 20, 30, 40, 50, 60 };

Console.WriteLine(string.Join(",", n[1..3]));    // 20,30
Console.WriteLine(string.Join(",", n[..2]));     // 10,20
Console.WriteLine(string.Join(",", n[3..]));     // 40,50,60
Console.WriteLine(string.Join(",", n[..]));      // tudo
Console.WriteLine(string.Join(",", n[^2..]));    // 50,60
Console.WriteLine(string.Join(",", n[1..^1]));   // 20,30,40,50`,
      },
      {
        kind: 'output',
        code: `20,30
10,20
40,50,60
10,20,30,40,50,60
50,60
20,30,40,50`,
        caption: 'Omitir um lado significa "do início" ou "até o fim". `n[..]` copia a coleção inteira.',
      },
      {
        kind: 'table',
        headers: ['Expressão', 'Significa'],
        rows: [
          ['`n[0]`', 'primeiro elemento'],
          ['`n[^1]`', 'último elemento'],
          ['`n[a..b]`', 'de `a` inclusive até `b` exclusive'],
          ['`n[..b]`', 'do início até `b`'],
          ['`n[a..]`', 'de `a` até o fim'],
          ['`n[^2..]`', 'os dois últimos'],
          ['`n[1..^1]`', 'sem o primeiro e sem o último'],
          ['`n[i..i]`', 'fatia vazia'],
        ],
      },
      {
        kind: 'text',
        body:
          '`Index` e `Range` são tipos de primeira classe: podem ser guardados em variáveis, passados como parâmetro e inspecionados.',
      },
      {
        kind: 'code',
        code: `Index doFim = ^2;
Console.WriteLine($"{doFim.Value} {doFim.IsFromEnd}");
Console.WriteLine(doFim.GetOffset(6));

Range faixa = 1..4;
var (offset, length) = faixa.GetOffsetAndLength(6);
Console.WriteLine($"{offset} {length}");`,
      },
      {
        kind: 'output',
        code: `2 True
4
1 3`,
        caption: '`GetOffset` e `GetOffsetAndLength` traduzem para índices concretos, dado o tamanho da coleção.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Fatiar um **array** com `..` **copia** os elementos. Para fatiar sem alocar, o tipo é `Span<T>` — assunto do próximo capítulo. Em `string`, `texto[0..3]` também cria uma string nova.',
      },
      {
        kind: 'text',
        body:
          'Nem toda coleção suporta os dois. `List<T>` aceita `^` mas **não** aceita `..`; arrays e `string` aceitam ambos. A regra é a mesma dos padrões de lista: exige `Count`/`Length` e o indexador apropriado.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Seu próprio tipo entra na brincadeira com dois indexadores: `this[Index]` e `this[Range]`. Com eles, `meuBuffer[^1]` e `meuBuffer[1..3]` passam a funcionar como em qualquer coleção do framework.',
      },
      {
        kind: 'text',
        body:
          'Faixas fora dos limites lançam `ArgumentOutOfRangeException`, como qualquer índice inválido — a sintaxe é mais curta, mas não é mais permissiva.',
      },
    ],
    quiz: [
      {
        id: 's08c05l08q1',
        type: 'single',
        prompt: 'O que `n[^1]` devolve num array de 6 elementos?',
        options: [
          { id: 'a', text: 'O último elemento, equivalente a `n[5]`', correct: true },
          { id: 'b', text: 'O primeiro elemento' },
          { id: 'c', text: 'O penúltimo elemento' },
          { id: 'd', text: 'Lança exceção' },
        ],
        explanation:
          'O `^` conta a partir de 1 no fim: `^1` é o último. `^0` seria a posição após o fim, válida apenas como limite superior de uma faixa.',
      },
      {
        id: 's08c05l08q2',
        type: 'single',
        prompt: 'Qual o resultado de `n[1..^1]` em `{10, 20, 30, 40}`?',
        options: [
          { id: 'a', text: '`20,30`', correct: true },
          { id: 'b', text: '`20,30,40`' },
          { id: 'c', text: '`10,20,30`' },
          { id: 'd', text: '`30`' },
        ],
        explanation:
          'Começa no índice 1 e termina antes do último. É a forma idiomática de "tudo menos as pontas".',
      },
      {
        id: 's08c05l08q3',
        type: 'single',
        prompt: 'O que acontece ao fatiar um array com `..`?',
        options: [
          { id: 'a', text: 'Os elementos são copiados para um array novo', correct: true },
          { id: 'b', text: 'É criada uma visão sobre o array original' },
          { id: 'c', text: 'O array original é modificado' },
          { id: 'd', text: 'É devolvido um `IEnumerable<T>` preguiçoso' },
        ],
        explanation:
          'Fatiar array aloca. Para uma visão sem cópia, o tipo é `Span<T>`, que suporta a mesma sintaxe sem copiar nada.',
      },
    ],
    challenge: {
      brief:
        'Escreva utilitários de recorte usando `Index` e `Range`, e um `Buffer` próprio que aceita as duas sintaxes através de indexadores dedicados.',
      requirements: [
        'Use `^` e `..` — nada de `Array.Copy` nem aritmética manual de índices.',
        '`Miolo` devolve a fatia sem o primeiro e sem o último elemento.',
        '`Ultimos` devolve os N últimos, sem estourar quando N passa do tamanho.',
        '`SemUltimos` devolve tudo menos os N últimos.',
        '`Buffer` implementa `this[int]`, `this[Index]` e `this[Range]`.',
        '`Descrever` usa `GetOffsetAndLength` para relatar uma faixa em índices concretos.',
        'Uma faixa inválida deve ser capturada com `ArgumentOutOfRangeException`.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Buffer
{
    private readonly int[] dados;

    public Buffer(params int[] dados)
    {
        this.dados = dados;
    }

    public int Length => dados.Length;

    // TODO: indexador por int
    public int this[int i] => 0;

    // TODO: indexador por Index (habilita ^1)
    public int this[Index i] => 0;

    // TODO: indexador por Range (habilita 1..3)
    public int[] this[Range r] => new int[0];
}

class Program
{
    // TODO: sem o primeiro e sem o ultimo
    static int[] Miolo(int[] n)
    {
        return new int[0];
    }

    // TODO: os N ultimos; N maior que o tamanho devolve tudo
    static int[] Ultimos(int[] n, int quantidade)
    {
        return new int[0];
    }

    // TODO: tudo menos os N ultimos
    static int[] SemUltimos(int[] n, int quantidade)
    {
        return new int[0];
    }

    // TODO: "<offset>+<length>" usando GetOffsetAndLength
    static string Descrever(Range r, int tamanho)
    {
        return "";
    }

    static void Main()
    {
        int[] n = { 10, 20, 30, 40, 50, 60 };

        Console.WriteLine($"primeiro: {n[0]} ultimo: {n[^1]} penultimo: {n[^2]}");
        Console.WriteLine($"faixa 1..3: {string.Join(",", n[1..3])}");
        Console.WriteLine($"inicio ..2: {string.Join(",", n[..2])}");
        Console.WriteLine($"fim 3..: {string.Join(",", n[3..])}");
        Console.WriteLine($"tudo: {string.Join(",", n[..])}");
        Console.WriteLine($"vazia: [{string.Join(",", n[2..2])}]");

        Console.WriteLine($"miolo: {string.Join(",", Miolo(n))}");
        Console.WriteLine($"miolo de dois: [{string.Join(",", Miolo(new[] { 1, 2 }))}]");

        Console.WriteLine($"ultimos 2: {string.Join(",", Ultimos(n, 2))}");
        Console.WriteLine($"ultimos 10: {string.Join(",", Ultimos(n, 10))}");
        Console.WriteLine($"ultimos 0: [{string.Join(",", Ultimos(n, 0))}]");

        Console.WriteLine($"sem ultimos 2: {string.Join(",", SemUltimos(n, 2))}");
        Console.WriteLine($"sem ultimos 10: [{string.Join(",", SemUltimos(n, 10))}]");

        Index doFim = ^2;
        Console.WriteLine($"index: valor={doFim.Value} doFim={doFim.IsFromEnd} offset={doFim.GetOffset(n.Length)}");

        Console.WriteLine($"descrever 1..4: {Descrever(1..4, n.Length)}");
        Console.WriteLine($"descrever ^3..: {Descrever(^3.., n.Length)}");

        string texto = "bicicleta";
        Console.WriteLine($"texto inicio: {texto[0..3]} fim: {texto[^4..]}");

        var buf = new Buffer(5, 6, 7, 8);
        Console.WriteLine($"buffer int: {buf[0]}");
        Console.WriteLine($"buffer index: {buf[^1]}");
        Console.WriteLine($"buffer range: {string.Join(",", buf[1..3])}");
        Console.WriteLine($"buffer tudo: {string.Join(",", buf[..])}");

        try
        {
            var x = n[2..10];
            Console.WriteLine($"nao deveria: {x.Length}");
        }
        catch (ArgumentOutOfRangeException)
        {
            Console.WriteLine("faixa invalida");
        }
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Buffer
{
    private readonly int[] dados;

    public Buffer(params int[] dados)
    {
        this.dados = dados;
    }

    public int Length => dados.Length;

    public int this[int i] => dados[i];

    public int this[Index i] => dados[i];

    public int[] this[Range r] => dados[r];
}

class Program
{
    static int[] Miolo(int[] n)
    {
        if (n.Length <= 2)
        {
            return Array.Empty<int>();
        }

        return n[1..^1];
    }

    static int[] Ultimos(int[] n, int quantidade)
    {
        if (quantidade <= 0)
        {
            return Array.Empty<int>();
        }

        if (quantidade >= n.Length)
        {
            return n[..];
        }

        return n[^quantidade..];
    }

    static int[] SemUltimos(int[] n, int quantidade)
    {
        if (quantidade <= 0)
        {
            return n[..];
        }

        if (quantidade >= n.Length)
        {
            return Array.Empty<int>();
        }

        return n[..^quantidade];
    }

    static string Descrever(Range r, int tamanho)
    {
        var (offset, length) = r.GetOffsetAndLength(tamanho);
        return $"{offset}+{length}";
    }

    static void Main()
    {
        int[] n = { 10, 20, 30, 40, 50, 60 };

        Console.WriteLine($"primeiro: {n[0]} ultimo: {n[^1]} penultimo: {n[^2]}");
        Console.WriteLine($"faixa 1..3: {string.Join(",", n[1..3])}");
        Console.WriteLine($"inicio ..2: {string.Join(",", n[..2])}");
        Console.WriteLine($"fim 3..: {string.Join(",", n[3..])}");
        Console.WriteLine($"tudo: {string.Join(",", n[..])}");
        Console.WriteLine($"vazia: [{string.Join(",", n[2..2])}]");

        Console.WriteLine($"miolo: {string.Join(",", Miolo(n))}");
        Console.WriteLine($"miolo de dois: [{string.Join(",", Miolo(new[] { 1, 2 }))}]");

        Console.WriteLine($"ultimos 2: {string.Join(",", Ultimos(n, 2))}");
        Console.WriteLine($"ultimos 10: {string.Join(",", Ultimos(n, 10))}");
        Console.WriteLine($"ultimos 0: [{string.Join(",", Ultimos(n, 0))}]");

        Console.WriteLine($"sem ultimos 2: {string.Join(",", SemUltimos(n, 2))}");
        Console.WriteLine($"sem ultimos 10: [{string.Join(",", SemUltimos(n, 10))}]");

        Index doFim = ^2;
        Console.WriteLine($"index: valor={doFim.Value} doFim={doFim.IsFromEnd} offset={doFim.GetOffset(n.Length)}");

        Console.WriteLine($"descrever 1..4: {Descrever(1..4, n.Length)}");
        Console.WriteLine($"descrever ^3..: {Descrever(^3.., n.Length)}");

        string texto = "bicicleta";
        Console.WriteLine($"texto inicio: {texto[0..3]} fim: {texto[^4..]}");

        var buf = new Buffer(5, 6, 7, 8);
        Console.WriteLine($"buffer int: {buf[0]}");
        Console.WriteLine($"buffer index: {buf[^1]}");
        Console.WriteLine($"buffer range: {string.Join(",", buf[1..3])}");
        Console.WriteLine($"buffer tudo: {string.Join(",", buf[..])}");

        try
        {
            var x = n[2..10];
            Console.WriteLine($"nao deveria: {x.Length}");
        }
        catch (ArgumentOutOfRangeException)
        {
            Console.WriteLine("faixa invalida");
        }
    }
}`,
      hints: [
        '`n[1..^1]` é literalmente "sem o primeiro e sem o último" — mas precisa de guarda para arrays com dois elementos ou menos.',
        '`n[^quantidade..]` pega os últimos N, e falha se `quantidade > n.Length`; por isso as duas guardas antes.',
        'No `Buffer`, os três indexadores podem simplesmente delegar para `dados`, que já suporta `int`, `Index` e `Range`.',
        '`^3..` é um `Range` completo com início relativo ao fim e fim omitido; `GetOffsetAndLength(6)` o traduz para `3+3`.',
      ],
      tests: [
        {
          name: 'Recortes com Range e Index',
          expectedStdout:
            'primeiro: 10 ultimo: 60 penultimo: 50\n' +
            'faixa 1..3: 20,30\ninicio ..2: 10,20\nfim 3..: 40,50,60\n' +
            'tudo: 10,20,30,40,50,60\nvazia: []\n' +
            'miolo: 20,30,40,50\nmiolo de dois: []\n' +
            'ultimos 2: 50,60\nultimos 10: 10,20,30,40,50,60\nultimos 0: []\n' +
            'sem ultimos 2: 10,20,30,40\nsem ultimos 10: []\n' +
            'index: valor=2 doFim=True offset=4\n' +
            'descrever 1..4: 1+3\ndescrever ^3..: 3+3\n' +
            'texto inicio: bic fim: leta\n' +
            'buffer int: 5\nbuffer index: 8\nbuffer range: 6,7\nbuffer tudo: 5,6,7,8\n' +
            'faixa invalida',
        },
      ],
    },
  },

  {
    id: 's08c05l09',
    title: 'Prática: gerador de páginas',
    objective: 'Construir uma paginação preguiçosa que funciona sobre qualquer sequência, inclusive infinita.',
    concept: [
      {
        kind: 'text',
        body:
          'Paginar é agrupar uma sequência em blocos de tamanho fixo. Parece trivial, e é um bom exercício justamente porque cada decisão de projeto tem consequência.',
      },
      {
        kind: 'code',
        code: `static IEnumerable<List<T>> Paginar<T>(IEnumerable<T> fonte, int tamanho)
{
    var pagina = new List<T>(tamanho);

    foreach (T item in fonte)
    {
        pagina.Add(item);

        if (pagina.Count == tamanho)
        {
            yield return pagina;
            pagina = new List<T>(tamanho);
        }
    }

    if (pagina.Count > 0)
    {
        yield return pagina;
    }
}`,
        caption: 'Três detalhes importantes: a lista nova após cada página, a página parcial no fim, e nada materializado.',
      },
      {
        kind: 'text',
        body: 'Cada uma das três linhas críticas evita um bug específico:',
      },
      {
        kind: 'table',
        headers: ['Linha', 'O que evita'],
        rows: [
          ['`pagina = new List<T>(...)` após o yield', 'todas as páginas apontarem para o mesmo objeto'],
          ['`if (pagina.Count > 0)` no fim', 'perder a última página incompleta'],
          ['nenhum `ToList()` na fonte', 'travar em sequência infinita e gastar memória'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Reaproveitar a mesma `List<T>` é o erro mais difícil de enxergar: um `foreach` simples funciona perfeitamente, e só quebra quando alguém guarda as páginas com `ToList()`. Aí todas contêm os mesmos dados.',
      },
      {
        kind: 'text',
        body:
          'Como o gerador é preguiçoso, ele pagina sequências infinitas sem problema — quem consome decide quantas páginas quer.',
      },
      {
        kind: 'code',
        code: `foreach (var pagina in Paginar(Naturais(), 3).Take(2))
{
    Console.WriteLine(string.Join(",", pagina));
}`,
      },
      {
        kind: 'output',
        code: `1,2,3
4,5,6`,
        caption: 'Seis itens produzidos ao todo. Uma paginação que materializasse a fonte nunca terminaria.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A validação de `tamanho` precisa ficar fora do método com `yield`, num método comum que delega. Do contrário a exceção só apareceria quando alguém percorresse — longe da chamada errada.',
      },
      {
        kind: 'text',
        body:
          'Paginação real costuma precisar de mais que os blocos: o número da página, se existe próxima, e o total quando ele é conhecido. Um tipo próprio carrega isso.',
      },
      {
        kind: 'code',
        code: `record Pagina<T>(int Numero, IReadOnlyList<T> Itens)
{
    public int Tamanho => Itens.Count;
}`,
        caption: '`IReadOnlyList<T>` impede que quem recebe altere a página — e comunica a intenção.',
      },
      {
        kind: 'text',
        body:
          'O framework já tem `Chunk`, que faz exatamente isso desde o .NET 6. Escrever o seu vale como exercício e para os casos em que a página precisa carregar metadados.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Chunk do LINQ',
          code: `foreach (int[] p in fonte.Chunk(3))
{
    // p e um array
}`,
        },
        right: {
          label: 'Paginar próprio',
          code: `foreach (var p in Paginar(fonte, 3))
{
    // p carrega numero, total...
}`,
        },
        note: 'Use `Chunk` quando só precisar dos blocos. Escreva o seu quando a página for um conceito do domínio.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Cuidado ao expor a página como `List<T>`: quem recebe pode alterá-la. `IReadOnlyList<T>` custa nada e evita que uma modificação acidental se propague.',
      },
    ],
    quiz: [
      {
        id: 's08c05l09q1',
        type: 'single',
        prompt: 'Por que criar uma `List<T>` nova depois de cada `yield return`?',
        options: [
          { id: 'a', text: 'Sem isso, todas as páginas devolvidas referenciam o mesmo objeto', correct: true },
          { id: 'b', text: 'Para liberar memória mais cedo' },
          { id: 'c', text: 'Porque `List<T>` não pode ser limpa' },
          { id: 'd', text: 'Para permitir sequências infinitas' },
        ],
        explanation:
          '`yield return` devolve a referência. Reaproveitar a lista funciona num `foreach` simples e quebra assim que alguém guarda as páginas.',
      },
      {
        id: 's08c05l09q2',
        type: 'single',
        prompt: 'Por que a validação de `tamanho` não pode ficar no método com `yield`?',
        options: [
          { id: 'a', text: 'A exceção só sairia quando alguém percorresse, longe da chamada errada', correct: true },
          { id: 'b', text: 'Porque `yield` não permite `throw`' },
          { id: 'c', text: 'Porque a validação seria executada a cada item' },
          { id: 'd', text: 'Não há problema: pode ficar' },
        ],
        explanation:
          'O corpo de um iterador só executa no primeiro `MoveNext()`. A solução é um método comum que valida e delega para outro, privado, com o `yield`.',
      },
      {
        id: 's08c05l09q3',
        type: 'single',
        prompt: 'Por que expor a página como `IReadOnlyList<T>` em vez de `List<T>`?',
        options: [
          { id: 'a', text: 'Impede que quem recebe altere a página e comunica a intenção', correct: true },
          { id: 'b', text: 'É mais rápido' },
          { id: 'c', text: 'Permite paginar sequências infinitas' },
          { id: 'd', text: '`List<T>` não pode ser devolvida de um iterador' },
        ],
        explanation:
          'A conversão é gratuita — `List<T>` já implementa a interface. O ganho é só de contrato, e por isso mesmo vale sempre.',
      },
    ],
    challenge: {
      brief:
        'Implemente um paginador completo: preguiçoso, com validação imediata, páginas numeradas e imutáveis, e capaz de paginar sequências infinitas.',
      requirements: [
        '`Paginar` valida `tamanho <= 0` **imediatamente**, delegando a iteração a um método privado.',
        'Cada página é um `Pagina<T>` com número (começando em 1) e itens em `IReadOnlyList<T>`.',
        'Cria uma lista nova a cada página; guardar todas com `ToList()` deve produzir páginas independentes.',
        'A última página parcial é emitida.',
        'O paginador funciona sobre uma sequência infinita, consumida com `Take`.',
        '`PaginaDe` devolve a N-ésima página, ou `null` quando ela não existe.',
        '`TotalDePaginas` funciona apenas sobre sequências finitas.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

record Pagina<T>(int Numero, IReadOnlyList<T> Itens)
{
    public int Tamanho => Itens.Count;
    public override string ToString() => $"p{Numero}[{string.Join(",", Itens)}]";
}

class Program
{
    static IEnumerable<int> Naturais()
    {
        int n = 1;

        while (true)
        {
            yield return n++;
        }
    }

    // TODO: valida aqui e delega
    static IEnumerable<Pagina<T>> Paginar<T>(IEnumerable<T> fonte, int tamanho)
    {
        return null;
    }

    // TODO: yield return, lista nova por pagina, pagina parcial no fim
    private static IEnumerable<Pagina<T>> PaginarNucleo<T>(IEnumerable<T> fonte, int tamanho)
    {
        yield break;
    }

    // TODO: N-esima pagina (base 1), ou null quando nao existe
    static Pagina<T> PaginaDe<T>(IEnumerable<T> fonte, int tamanho, int numero)
    {
        return null;
    }

    // TODO: so para sequencias finitas
    static int TotalDePaginas<T>(IEnumerable<T> fonte, int tamanho)
    {
        return 0;
    }

    static void Main()
    {
        int[] dados = { 1, 2, 3, 4, 5, 6, 7 };

        foreach (var p in Paginar(dados, 3))
        {
            Console.WriteLine($"pagina: {p}");
        }

        Console.WriteLine($"total: {TotalDePaginas(dados, 3)}");
        Console.WriteLine($"total exato: {TotalDePaginas(new[] { 1, 2, 3, 4 }, 2)}");
        Console.WriteLine($"total vazio: {TotalDePaginas(new int[0], 3)}");

        var guardadas = Paginar(dados, 3).ToList();
        Console.WriteLine($"guardadas: {guardadas.Count}");
        Console.WriteLine($"independentes: {guardadas[0].Itens[0]} {guardadas[1].Itens[0]} {guardadas[2].Itens[0]}");

        Console.WriteLine($"pagina 2: {PaginaDe(dados, 3, 2)}");
        Console.WriteLine($"pagina 3: {PaginaDe(dados, 3, 3)}");
        Console.WriteLine($"pagina 9 nula: {PaginaDe(dados, 3, 9) == null}");
        Console.WriteLine($"pagina 0 nula: {PaginaDe(dados, 3, 0) == null}");

        Console.WriteLine("infinita:");

        foreach (var p in Paginar(Naturais(), 4).Take(3))
        {
            Console.WriteLine($"  {p}");
        }

        var textos = new List<string> { "a", "b", "c" };
        Console.WriteLine($"textos: {string.Join(" ", Paginar(textos, 2))}");
        Console.WriteLine($"tamanho maior que a fonte: {string.Join(" ", Paginar(textos, 10))}");
        Console.WriteLine($"fonte vazia: {Paginar(new int[0], 3).Count()}");

        try
        {
            Paginar(dados, 0);
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"erro: {ex.Message}");
        }
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Pagina<T>(int Numero, IReadOnlyList<T> Itens)
{
    public int Tamanho => Itens.Count;
    public override string ToString() => $"p{Numero}[{string.Join(",", Itens)}]";
}

class Program
{
    static IEnumerable<int> Naturais()
    {
        int n = 1;

        while (true)
        {
            yield return n++;
        }
    }

    static IEnumerable<Pagina<T>> Paginar<T>(IEnumerable<T> fonte, int tamanho)
    {
        if (tamanho <= 0)
        {
            throw new ArgumentException("tamanho deve ser positivo");
        }

        return PaginarNucleo(fonte, tamanho);
    }

    private static IEnumerable<Pagina<T>> PaginarNucleo<T>(IEnumerable<T> fonte, int tamanho)
    {
        var atual = new List<T>(tamanho);
        int numero = 1;

        foreach (T item in fonte)
        {
            atual.Add(item);

            if (atual.Count == tamanho)
            {
                yield return new Pagina<T>(numero, atual);
                numero++;
                atual = new List<T>(tamanho);
            }
        }

        if (atual.Count > 0)
        {
            yield return new Pagina<T>(numero, atual);
        }
    }

    static Pagina<T> PaginaDe<T>(IEnumerable<T> fonte, int tamanho, int numero)
    {
        if (numero < 1)
        {
            return null;
        }

        foreach (Pagina<T> pagina in Paginar(fonte, tamanho))
        {
            if (pagina.Numero == numero)
            {
                return pagina;
            }
        }

        return null;
    }

    static int TotalDePaginas<T>(IEnumerable<T> fonte, int tamanho)
    {
        int total = 0;

        foreach (Pagina<T> pagina in Paginar(fonte, tamanho))
        {
            total++;
        }

        return total;
    }

    static void Main()
    {
        int[] dados = { 1, 2, 3, 4, 5, 6, 7 };

        foreach (var p in Paginar(dados, 3))
        {
            Console.WriteLine($"pagina: {p}");
        }

        Console.WriteLine($"total: {TotalDePaginas(dados, 3)}");
        Console.WriteLine($"total exato: {TotalDePaginas(new[] { 1, 2, 3, 4 }, 2)}");
        Console.WriteLine($"total vazio: {TotalDePaginas(new int[0], 3)}");

        var guardadas = Paginar(dados, 3).ToList();
        Console.WriteLine($"guardadas: {guardadas.Count}");
        Console.WriteLine($"independentes: {guardadas[0].Itens[0]} {guardadas[1].Itens[0]} {guardadas[2].Itens[0]}");

        Console.WriteLine($"pagina 2: {PaginaDe(dados, 3, 2)}");
        Console.WriteLine($"pagina 3: {PaginaDe(dados, 3, 3)}");
        Console.WriteLine($"pagina 9 nula: {PaginaDe(dados, 3, 9) == null}");
        Console.WriteLine($"pagina 0 nula: {PaginaDe(dados, 3, 0) == null}");

        Console.WriteLine("infinita:");

        foreach (var p in Paginar(Naturais(), 4).Take(3))
        {
            Console.WriteLine($"  {p}");
        }

        var textos = new List<string> { "a", "b", "c" };
        Console.WriteLine($"textos: {string.Join(" ", Paginar(textos, 2))}");
        Console.WriteLine($"tamanho maior que a fonte: {string.Join(" ", Paginar(textos, 10))}");
        Console.WriteLine($"fonte vazia: {Paginar(new int[0], 3).Count()}");

        try
        {
            Paginar(dados, 0);
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"erro: {ex.Message}");
        }
    }
}`,
      hints: [
        '`Paginar` **não** pode conter `yield`: ele valida e devolve o resultado de `PaginarNucleo`. É o que faz a exceção sair na chamada.',
        '`PaginaDe` percorre as páginas até achar o número certo — e para ali, sem consumir o resto. Isso o mantém seguro sobre fontes grandes.',
        '`TotalDePaginas` só faz sentido em sequências finitas; sobre `Naturais()` ele nunca terminaria.',
        'A prova de independência é `guardadas[0].Itens[0]`, `[1]` e `[2]` valerem 1, 4 e 7 — se a lista fosse reaproveitada, os três seriam iguais.',
      ],
      tests: [
        {
          name: 'Paginador preguiçoso',
          expectedStdout:
            'pagina: p1[1,2,3]\npagina: p2[4,5,6]\npagina: p3[7]\n' +
            'total: 3\ntotal exato: 2\ntotal vazio: 0\n' +
            'guardadas: 3\nindependentes: 1 4 7\n' +
            'pagina 2: p2[4,5,6]\npagina 3: p3[7]\npagina 9 nula: True\npagina 0 nula: True\n' +
            'infinita:\n  p1[1,2,3,4]\n  p2[5,6,7,8]\n  p3[9,10,11,12]\n' +
            'textos: p1[a,b] p2[c]\ntamanho maior que a fonte: p1[a,b,c]\nfonte vazia: 0\n' +
            'erro: tamanho deve ser positivo',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's08c05l10',
    title: 'Checkpoint: iteradores',
    objective: 'Decidir entre iterador, coleção materializada e sequência infinita conforme o problema.',
    concept: [
      {
        kind: 'text',
        body:
          'Este capítulo tratou de uma escolha só, vista de vários ângulos: **produzir sob demanda ou guardar pronto?** As duas opções são certas em situações diferentes.',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Escolha'],
        rows: [
          ['percorrer uma vez', 'iterador preguiçoso'],
          ['percorrer várias vezes', 'materializar com `ToList()`'],
          ['fonte grande ou infinita', 'iterador, sempre'],
          ['precisa de `Count` frequente', 'coleção com `Count` em O(1)'],
          ['precisa de índice', 'coleção indexável'],
          ['resultado alimenta uma cadeia', 'iterador, para não materializar no meio'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Os erros deste capítulo têm todos a mesma raiz: **esquecer que a sequência ainda não foi calculada**. A exceção que sai no lugar errado, o trabalho repetido, a lista compartilhada entre páginas, o `ToList()` que trava — tudo é a preguiça agindo mais tarde do que se esperava.',
      },
      {
        kind: 'text',
        body: 'Vale fixar as quatro armadilhas, porque elas reaparecem em todo código que usa iteradores:',
      },
      {
        kind: 'table',
        headers: ['Armadilha', 'Correção'],
        rows: [
          ['validação dentro do `yield`', 'método comum que valida e delega'],
          ['coleção reaproveitada entre `yield`s', 'instância nova após cada `yield return`'],
          ['sequência percorrida duas vezes', '`ToList()` quando há reuso'],
          ['`Count`/`ToList` sobre infinita', '`Take`, `TakeWhile`, `First` ou `Any`'],
        ],
      },
      {
        kind: 'compare',
        good: `public IEnumerable<T> Filtrar(...)
{
    if (algo invalido) throw ...;
    return Nucleo(...);
}

private IEnumerable<T> Nucleo(...)
{
    foreach (...) yield return ...;
}`,
        bad: `public IEnumerable<T> Filtrar(...)
{
    // so lanca ao percorrer
    if (algo invalido) throw ...;
    foreach (...) yield return ...;
}`,
        goodLabel: 'Validação imediata',
        badLabel: 'Validação adiada',
      },
      {
        kind: 'text',
        body:
          'Ao expor uma sequência numa API pública, o tipo de retorno comunica mais do que parece. Cada opção assume um compromisso diferente com quem consome.',
      },
      {
        kind: 'table',
        headers: ['Retorno', 'Promete'],
        rows: [
          ['`IEnumerable<T>`', 'iterável; pode ser preguiçoso, infinito ou caro'],
          ['`IReadOnlyCollection<T>`', 'finito, com `Count` barato'],
          ['`IReadOnlyList<T>`', 'finito, contável e indexável'],
          ['`List<T>`', 'tudo isso — e modificável por quem recebe'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Prefira o **mais fraco** que atende: `IEnumerable<T>` dá a maior liberdade de implementação. Mas se o método já materializa internamente, devolver `IReadOnlyList<T>` evita que quem chama gaste um `ToList()` desnecessário.',
      },
      {
        kind: 'text',
        body:
          'O desafio final junta tudo: um pipeline de processamento preguiçoso, com validação imediata, medição do trabalho realizado e materialização apenas onde ela é necessária.',
      },
    ],
    quiz: [
      {
        id: 's08c05l10q1',
        type: 'single',
        prompt: 'Qual a raiz comum dos erros típicos com iteradores?',
        options: [
          { id: 'a', text: 'Esquecer que a sequência ainda não foi calculada no momento da chamada', correct: true },
          { id: 'b', text: 'Usar `yield` em vez de listas' },
          { id: 'c', text: 'Não implementar `IEnumerator<T>` à mão' },
          { id: 'd', text: 'Devolver `IEnumerable<T>` em vez de `List<T>`' },
        ],
        explanation:
          'Validação no lugar errado, trabalho repetido, lista compartilhada e travamento em sequência infinita são todos sintomas da mesma causa.',
      },
      {
        id: 's08c05l10q2',
        type: 'single',
        prompt: 'Um método já materializa o resultado internamente. Que tipo devolver?',
        options: [
          { id: 'a', text: '`IReadOnlyList<T>`: evita um `ToList()` desnecessário em quem chama', correct: true },
          { id: 'b', text: '`IEnumerable<T>`, sempre o mais fraco possível' },
          { id: 'c', text: '`List<T>`, para dar liberdade total' },
          { id: 'd', text: '`ICollection<T>`' },
        ],
        explanation:
          'Devolver `IEnumerable<T>` esconderia que o custo já foi pago, e quem chama materializaria de novo. `List<T>` daria permissão de modificar sem necessidade.',
      },
      {
        id: 's08c05l10q3',
        type: 'multiple',
        prompt: 'Quais operações são seguras sobre uma sequência infinita?',
        options: [
          { id: 'a', text: '`Take(10)`', correct: true },
          { id: 'b', text: '`TakeWhile(x => x < 100)`', correct: true },
          { id: 'c', text: '`Where(...)` seguido de `Take(...)`', correct: true },
          { id: 'd', text: '`OrderBy(x => x).Take(10)`' },
        ],
        explanation:
          '`OrderBy` precisa de toda a sequência antes de decidir o primeiro elemento, então o `Take` posterior nunca é alcançado.',
      },
    ],
    challenge: {
      brief:
        'Feche o capítulo com um pipeline de processamento de eventos: preguiçoso do início ao fim, com validação imediata, medição do trabalho e materialização só no ponto certo.',
      requirements: [
        'Todos os operadores do pipeline são preguiçosos e usam `yield return`.',
        '`Janelas` valida o tamanho imediatamente, delegando a iteração.',
        '`Janelas` produz janelas deslizantes de tamanho fixo, cada uma numa lista independente.',
        '`Normalizar` e `Enumerar` são preguiçosos e contam quantos itens processaram.',
        'O pipeline deve funcionar sobre uma fonte infinita, consumido com `Take`.',
        '`Resumir` materializa **uma vez** e usa o resultado várias vezes.',
        'Demonstre a diferença de trabalho entre o pipeline preguiçoso e o materializado.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static int lidos;
    static int normalizados;

    static IEnumerable<int> Fonte(int ate)
    {
        for (int i = 1; i <= ate; i++)
        {
            lidos++;
            yield return i;
        }
    }

    static IEnumerable<int> Infinita()
    {
        int n = 1;

        while (true)
        {
            lidos++;
            yield return n++;
        }
    }

    // TODO: preguicoso, incrementa 'normalizados', devolve o valor vezes 10
    static IEnumerable<int> Normalizar(IEnumerable<int> fonte)
    {
        yield break;
    }

    // TODO: preguicoso, produz "<indice>:<valor>" comecando em 1
    static IEnumerable<string> Enumerar(IEnumerable<int> fonte)
    {
        yield break;
    }

    // TODO: valida tamanho aqui e delega
    static IEnumerable<List<int>> Janelas(IEnumerable<int> fonte, int tamanho)
    {
        return null;
    }

    // TODO: janelas deslizantes de tamanho fixo, cada uma independente
    private static IEnumerable<List<int>> JanelasNucleo(IEnumerable<int> fonte, int tamanho)
    {
        yield break;
    }

    // TODO: materializa uma vez e usa varias — devolve "<count>/<soma>/<max>"
    static string Resumir(IEnumerable<int> fonte)
    {
        return "";
    }

    static void Zerar()
    {
        lidos = 0;
        normalizados = 0;
    }

    static void Main()
    {
        Zerar();
        var pipeline = Normalizar(Fonte(1000)).Where(n => n % 20 == 0).Take(3);
        Console.WriteLine($"definido: lidos={lidos}");
        Console.WriteLine($"resultado: {string.Join(",", pipeline)}");
        Console.WriteLine($"apos iterar: lidos={lidos} normalizados={normalizados}");

        Zerar();
        Console.WriteLine($"enumerado: {string.Join(" ", Enumerar(Fonte(4)))}");
        Console.WriteLine($"lidos: {lidos}");

        Zerar();

        foreach (List<int> janela in Janelas(Fonte(6), 3))
        {
            Console.WriteLine($"  janela: {string.Join(",", janela)}");
        }

        var guardadas = Janelas(new[] { 1, 2, 3, 4 }, 2).ToList();
        Console.WriteLine($"janelas guardadas: {guardadas.Count}");
        Console.WriteLine($"independentes: {guardadas[0][0]} {guardadas[1][0]} {guardadas[2][0]}");

        Console.WriteLine($"janela maior que a fonte: {Janelas(new[] { 1, 2 }, 5).Count()}");
        Console.WriteLine($"janela exata: {Janelas(new[] { 1, 2 }, 2).Count()}");

        Zerar();
        Console.WriteLine($"infinita: {string.Join(",", Normalizar(Infinita()).Take(4))} lidos={lidos}");

        Zerar();
        Console.WriteLine($"janela infinita: {string.Join(" | ", Janelas(Infinita(), 2).Take(3).Select(j => string.Join(",", j)))}");

        Zerar();
        Console.WriteLine($"resumo: {Resumir(Normalizar(Fonte(5)))}");
        Console.WriteLine($"trabalho do resumo: lidos={lidos} normalizados={normalizados}");

        try
        {
            Janelas(new[] { 1, 2 }, 0);
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"erro: {ex.Message}");
        }
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static int lidos;
    static int normalizados;

    static IEnumerable<int> Fonte(int ate)
    {
        for (int i = 1; i <= ate; i++)
        {
            lidos++;
            yield return i;
        }
    }

    static IEnumerable<int> Infinita()
    {
        int n = 1;

        while (true)
        {
            lidos++;
            yield return n++;
        }
    }

    static IEnumerable<int> Normalizar(IEnumerable<int> fonte)
    {
        foreach (int item in fonte)
        {
            normalizados++;
            yield return item * 10;
        }
    }

    static IEnumerable<string> Enumerar(IEnumerable<int> fonte)
    {
        int indice = 1;

        foreach (int item in fonte)
        {
            yield return $"{indice}:{item}";
            indice++;
        }
    }

    static IEnumerable<List<int>> Janelas(IEnumerable<int> fonte, int tamanho)
    {
        if (tamanho <= 0)
        {
            throw new ArgumentException("tamanho deve ser positivo");
        }

        return JanelasNucleo(fonte, tamanho);
    }

    private static IEnumerable<List<int>> JanelasNucleo(IEnumerable<int> fonte, int tamanho)
    {
        var buffer = new List<int>(tamanho);

        foreach (int item in fonte)
        {
            buffer.Add(item);

            if (buffer.Count == tamanho)
            {
                yield return new List<int>(buffer);
                buffer.RemoveAt(0);
            }
        }
    }

    static string Resumir(IEnumerable<int> fonte)
    {
        var materializada = fonte.ToList();

        if (materializada.Count == 0)
        {
            return "0/0/0";
        }

        int soma = 0;
        int maior = materializada[0];

        foreach (int item in materializada)
        {
            soma += item;

            if (item > maior)
            {
                maior = item;
            }
        }

        return $"{materializada.Count}/{soma}/{maior}";
    }

    static void Zerar()
    {
        lidos = 0;
        normalizados = 0;
    }

    static void Main()
    {
        Zerar();
        var pipeline = Normalizar(Fonte(1000)).Where(n => n % 20 == 0).Take(3);
        Console.WriteLine($"definido: lidos={lidos}");
        Console.WriteLine($"resultado: {string.Join(",", pipeline)}");
        Console.WriteLine($"apos iterar: lidos={lidos} normalizados={normalizados}");

        Zerar();
        Console.WriteLine($"enumerado: {string.Join(" ", Enumerar(Fonte(4)))}");
        Console.WriteLine($"lidos: {lidos}");

        Zerar();

        foreach (List<int> janela in Janelas(Fonte(6), 3))
        {
            Console.WriteLine($"  janela: {string.Join(",", janela)}");
        }

        var guardadas = Janelas(new[] { 1, 2, 3, 4 }, 2).ToList();
        Console.WriteLine($"janelas guardadas: {guardadas.Count}");
        Console.WriteLine($"independentes: {guardadas[0][0]} {guardadas[1][0]} {guardadas[2][0]}");

        Console.WriteLine($"janela maior que a fonte: {Janelas(new[] { 1, 2 }, 5).Count()}");
        Console.WriteLine($"janela exata: {Janelas(new[] { 1, 2 }, 2).Count()}");

        Zerar();
        Console.WriteLine($"infinita: {string.Join(",", Normalizar(Infinita()).Take(4))} lidos={lidos}");

        Zerar();
        Console.WriteLine($"janela infinita: {string.Join(" | ", Janelas(Infinita(), 2).Take(3).Select(j => string.Join(",", j)))}");

        Zerar();
        Console.WriteLine($"resumo: {Resumir(Normalizar(Fonte(5)))}");
        Console.WriteLine($"trabalho do resumo: lidos={lidos} normalizados={normalizados}");

        try
        {
            Janelas(new[] { 1, 2 }, 0);
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"erro: {ex.Message}");
        }
    }
}`,
      hints: [
        'Janelas **deslizantes** avançam de um em um: depois de emitir, remova só o primeiro item do buffer em vez de esvaziá-lo.',
        '`yield return new List<int>(buffer)` copia o buffer — sem isso, todas as janelas apontariam para o mesmo objeto em mutação.',
        'O pipeline com `Take(3)` precisa de três múltiplos de 20 depois da normalização: 2, 4 e 6 na fonte, portanto 6 itens lidos.',
        '`Resumir` chama `ToList()` uma vez e depois percorre a lista — o contador de trabalho não deve subir além dos 5 itens da fonte.',
      ],
      tests: [
        {
          name: 'Pipeline preguiçoso',
          expectedStdout:
            'definido: lidos=0\nresultado: 20,40,60\napos iterar: lidos=6 normalizados=6\n' +
            'enumerado: 1:1 2:2 3:3 4:4\nlidos: 4\n' +
            '  janela: 1,2,3\n  janela: 2,3,4\n  janela: 3,4,5\n  janela: 4,5,6\n' +
            'janelas guardadas: 3\nindependentes: 1 2 3\n' +
            'janela maior que a fonte: 0\njanela exata: 1\n' +
            'infinita: 10,20,30,40 lidos=4\n' +
            'janela infinita: 1,2 | 2,3 | 3,4\n' +
            'resumo: 5/150/50\ntrabalho do resumo: lidos=5 normalizados=5\n' +
            'erro: tamanho deve ser positivo',
        },
      ],
      timeoutMs: 10000,
    },
  },
]
