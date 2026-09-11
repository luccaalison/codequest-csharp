import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's04c05l01',
    title: 'Where: filtrando',
    objective: 'Filtrar uma coleção com `Where`, substituindo o laço com `if` por uma expressão declarativa.',
    concept: [
      {
        kind: 'text',
        body:
          'O **LINQ** é uma biblioteca de operações sobre coleções, e todas elas recebem comportamento como parâmetro — exatamente o que você construiu à mão no capítulo anterior. O primeiro operador é `Where`, que filtra.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Com laço',
          code: `List<int> pares = new List<int>();

foreach (int n in numeros)
{
    if (n % 2 == 0)
    {
        pares.Add(n);
    }
}`,
        },
        right: {
          label: 'Com LINQ',
          code: `var pares = numeros.Where(n => n % 2 == 0);`,
        },
        note: 'A mesma operação: seis linhas contra uma.',
      },
      {
        kind: 'code',
        code: `using System.Linq;   // necessario para todos os operadores

var pares = numeros.Where(n => n % 2 == 0);
var grandes = numeros.Where(n => n > 100);
var validos = numeros.Where(n => n > 0 && n < 1000);`,
      },
      {
        kind: 'text',
        body:
          'O `Where` recebe um `Func<T, bool>` — o predicado do capítulo anterior — e devolve **uma nova sequência** com os elementos aprovados. A coleção original não é alterada.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A diferença é de foco. O laço descreve **como** filtrar: crie uma lista, percorra, teste, adicione. O `Where` descreve **o quê**: os pares. Quem lê não precisa verificar se o laço está correto — só se o critério está.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O `Where` devolve uma sequência, não uma `List`. Para obter uma lista de verdade, chame `.ToList()` no fim. Isso importa mais do que parece, e a lição sobre execução diferida explica por quê.',
      },
      {
        kind: 'text',
        body:
          'Dois `Where` encadeados equivalem a um `&&`. Encadear costuma ficar mais legível quando os critérios são independentes, e o custo é praticamente o mesmo.',
      },
    ],
    quiz: [
      {
        id: 's04c05l01q1',
        type: 'single',
        prompt: 'O que `Where` recebe como parâmetro?',
        options: [
          { id: 'a', text: 'Uma função que recebe o elemento e devolve `bool`.', correct: true },
          { id: 'b', text: 'Uma lista de valores permitidos.' },
          { id: 'c', text: 'Um número de elementos.' },
          { id: 'd', text: 'Uma comparação entre dois elementos.' },
        ],
        explanation:
          'É o predicado do capítulo anterior: `Func<T, bool>`. Ele é chamado uma vez por elemento para decidir quem passa.',
      },
      {
        id: 's04c05l01q2',
        type: 'single',
        prompt: 'O que acontece com a coleção original depois de um `Where`?',
        options: [
          { id: 'a', text: 'Nada: ela permanece intacta.', correct: true },
          { id: 'b', text: 'Os elementos reprovados são removidos dela.' },
          { id: 'c', text: 'Ela é ordenada.' },
          { id: 'd', text: 'Ela é esvaziada.' },
        ],
        explanation:
          'Operadores LINQ nunca modificam a fonte — eles produzem uma sequência nova. É o oposto de `List.RemoveAll`, que altera no lugar.',
      },
      {
        id: 's04c05l01q3',
        type: 'single',
        prompt: 'Qual é a diferença entre `.Where(...)` e `.Where(...).ToList()`?',
        options: [
          { id: 'a', text: 'O primeiro devolve uma sequência; o segundo materializa uma `List`.', correct: true },
          { id: 'b', text: 'Nenhuma.' },
          { id: 'c', text: 'O segundo filtra duas vezes.' },
          { id: 'd', text: 'O primeiro não compila sem `ToList`.' },
        ],
        explanation:
          'A sequência é um plano de execução; a lista é o resultado concreto. A diferença fica clara na lição sobre execução diferida.',
      },
    ],
    challenge: {
      brief:
        'Filtre uma coleção de números com `Where`, aplicando três critérios diferentes e um critério composto.',
      requirements: [
        'Leia `n` valores para uma `List<int>`',
        'Linha 1: `Pares: 2 4 6`',
        'Linha 2: `Positivos: 2 4 6 7`',
        'Linha 3: `Entre 1 e 5: 2 4`',
        'Linha 4: `Pares positivos: 2 4 6`, usando dois `Where` encadeados',
        'Linha 5: `Total: n`',
        'Use `Where` em todas as filtragens, sem laços com `if`',
        'Junte os valores com `string.Join`',
        'Um filtro sem aprovados imprime apenas o rótulo',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> numeros = new List<int>();
        for (int i = 0; i < n; i++)
        {
            numeros.Add(int.Parse(Console.ReadLine()));
        }

        // Quatro filtragens com Where
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> numeros = new List<int>();
        for (int i = 0; i < n; i++)
        {
            numeros.Add(int.Parse(Console.ReadLine()));
        }

        Console.WriteLine($"Pares: {string.Join(" ", numeros.Where(x => x % 2 == 0))}");
        Console.WriteLine($"Positivos: {string.Join(" ", numeros.Where(x => x > 0))}");
        Console.WriteLine($"Entre 1 e 5: {string.Join(" ", numeros.Where(x => x >= 1 && x <= 5))}");
        Console.WriteLine($"Pares positivos: {string.Join(" ", numeros.Where(x => x % 2 == 0).Where(x => x > 0))}");
        Console.WriteLine($"Total: {n}");
    }
}
`,
      hints: [
        '`string.Join(" ", sequencia)` aceita qualquer sequência, incluindo o resultado de um `Where`.',
        'O critério composto pode ser dois `Where` encadeados ou um `&&` — o enunciado pede os dois encadeados.',
      ],
      tests: [
        {
          name: 'Valores variados',
          stdin: '6\n2\n-3\n4\n7\n6\n-8\n',
          expectedStdout:
            'Pares: 2 4 6 -8\nPositivos: 2 4 7 6\nEntre 1 e 5: 2 4\nPares positivos: 2 4 6\nTotal: 6',
        },
        {
          name: 'Todos ímpares negativos',
          stdin: '3\n-1\n-3\n-5\n',
          expectedStdout:
            'Pares:\nPositivos:\nEntre 1 e 5:\nPares positivos:\nTotal: 3',
        },
        {
          name: 'Um valor só',
          stdin: '1\n4\n',
          expectedStdout:
            'Pares: 4\nPositivos: 4\nEntre 1 e 5: 4\nPares positivos: 4\nTotal: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c05l02',
    title: 'Select: projetando',
    objective: 'Transformar cada elemento de uma coleção, produzindo uma sequência de outro tipo.',
    concept: [
      {
        kind: 'text',
        body:
          'Se `Where` decide **quais** elementos passam, `Select` decide **o que** cada um vira. Ele aplica uma transformação a cada elemento e produz uma sequência nova — possivelmente de outro tipo.',
      },
      {
        kind: 'code',
        code: `var dobros = numeros.Select(n => n * 2);              // int -> int
var textos = numeros.Select(n => $"#{n}");           // int -> string
var tamanhos = palavras.Select(p => p.Length);       // string -> int`,
        caption: 'O tipo da saída é decidido pela lambda, não pela coleção de entrada.',
      },
      {
        kind: 'text',
        body:
          'Essa mudança de tipo é o que torna `Select` tão útil. Ele extrai um campo, formata para exibição, converte uma unidade — qualquer transformação de um elemento em outra coisa.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Extrair um campo',
          code: `pessoas.Select(p => p.Nome)`,
        },
        right: {
          label: 'Montar um texto',
          code: `pessoas.Select(p => $"{p.Nome} ({p.Idade})")`,
        },
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A combinação `Where` seguido de `Select` é o par mais comum do LINQ inteiro: filtre o que interessa, depois transforme no que você precisa. A ordem importa — filtrar primeiro evita transformar elementos que seriam descartados.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`Select` sempre devolve a **mesma quantidade** de elementos que entrou. Ele transforma, nunca filtra. Se você quer menos elementos, o operador é `Where`.',
      },
      {
        kind: 'text',
        body:
          'Existe uma sobrecarga de `Select` que recebe também o índice: `Select((valor, i) => ...)`. Ela é útil para numerar itens sem precisar de um contador externo.',
      },
    ],
    quiz: [
      {
        id: 's04c05l02q1',
        type: 'single',
        prompt: 'Quantos elementos `Select` devolve?',
        options: [
          { id: 'a', text: 'Exatamente os mesmos que entraram.', correct: true },
          { id: 'b', text: 'Apenas os que passam no critério.' },
          { id: 'c', text: 'Depende da transformação.' },
          { id: 'd', text: 'Um a menos.' },
        ],
        explanation:
          '`Select` é uma transformação um-para-um. Quem muda a quantidade é `Where`, e a confusão entre os dois é comum no começo.',
      },
      {
        id: 's04c05l02q2',
        type: 'single',
        prompt: 'O que `palavras.Select(p => p.Length)` devolve?',
        options: [
          { id: 'a', text: 'Uma sequência de `int` com os comprimentos.', correct: true },
          { id: 'b', text: 'Uma sequência de `string`.' },
          { id: 'c', text: 'O comprimento total.' },
          { id: 'd', text: 'A palavra mais longa.' },
        ],
        explanation:
          'A lambda devolve `int`, então a sequência resultante é de `int`. O tipo de saída é sempre o da lambda.',
      },
      {
        id: 's04c05l02q3',
        type: 'single',
        prompt: 'Por que filtrar antes de transformar?',
        options: [
          { id: 'a', text: 'Para não transformar elementos que seriam descartados.', correct: true },
          { id: 'b', text: 'Porque `Select` não funciona depois de `Where`.' },
          { id: 'c', text: 'Porque a ordem muda o resultado sempre.' },
          { id: 'd', text: 'É indiferente.' },
        ],
        explanation:
          'O resultado costuma ser o mesmo, mas o trabalho não. Transformar 1000 elementos para depois descartar 900 é desperdício puro.',
      },
    ],
    challenge: {
      brief:
        'Transforme uma lista de palavras com `Select`, produzindo saídas de tipos diferentes, e combine `Where` com `Select` em um pipeline.',
      requirements: [
        'Leia `n` palavras para uma `List<string>`',
        'Linha 1: `Maiusculas: UVA BANANA`',
        'Linha 2: `Tamanhos: 3 6`',
        'Linha 3: `Formatadas: [uva] [banana]`',
        'Linha 4: `Longas em maiuscula: BANANA`, filtrando as com mais de 4 letras e depois convertendo',
        'Linha 5: `Soma dos tamanhos: X`',
        'Use `Select` em todas as transformações, sem laços',
        'A soma dos tamanhos pode usar `Sum` sobre a projeção',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<string> palavras = new List<string>();
        for (int i = 0; i < n; i++)
        {
            palavras.Add(Console.ReadLine());
        }

        // Projete de formas diferentes com Select
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<string> palavras = new List<string>();
        for (int i = 0; i < n; i++)
        {
            palavras.Add(Console.ReadLine());
        }

        Console.WriteLine($"Maiusculas: {string.Join(" ", palavras.Select(p => p.ToUpper()))}");
        Console.WriteLine($"Tamanhos: {string.Join(" ", palavras.Select(p => p.Length))}");
        Console.WriteLine($"Formatadas: {string.Join(" ", palavras.Select(p => $"[{p}]"))}");
        Console.WriteLine($"Longas em maiuscula: {string.Join(" ", palavras.Where(p => p.Length > 4).Select(p => p.ToUpper()))}");
        Console.WriteLine($"Soma dos tamanhos: {palavras.Select(p => p.Length).Sum()}");
    }
}
`,
      hints: [
        'A lambda de `Select` pode devolver qualquer tipo: `p.Length` produz uma sequência de `int`.',
        'No pipeline da linha 4, o `Where` vem antes do `Select`.',
      ],
      tests: [
        {
          name: 'Duas palavras',
          stdin: '2\nuva\nbanana\n',
          expectedStdout:
            'Maiusculas: UVA BANANA\nTamanhos: 3 6\nFormatadas: [uva] [banana]\n' +
            'Longas em maiuscula: BANANA\nSoma dos tamanhos: 9',
        },
        {
          name: 'Nenhuma palavra longa',
          stdin: '2\noi\nabc\n',
          expectedStdout:
            'Maiusculas: OI ABC\nTamanhos: 2 3\nFormatadas: [oi] [abc]\n' +
            'Longas em maiuscula:\nSoma dos tamanhos: 5',
        },
        {
          name: 'Uma palavra longa',
          stdin: '1\nabacaxi\n',
          expectedStdout:
            'Maiusculas: ABACAXI\nTamanhos: 7\nFormatadas: [abacaxi]\n' +
            'Longas em maiuscula: ABACAXI\nSoma dos tamanhos: 7',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c05l03',
    title: 'OrderBy e ThenBy',
    objective: 'Ordenar por um ou mais critérios sem alterar a coleção original.',
    concept: [
      {
        kind: 'text',
        body:
          'Na Seção 3, ordenar exigia copiar a coleção porque `Sort` altera no lugar. O `OrderBy` do LINQ resolve isso por construção: ele **devolve uma sequência ordenada** e deixa a original intacta.',
      },
      {
        kind: 'code',
        code: `var crescente = numeros.OrderBy(n => n);
var decrescente = numeros.OrderByDescending(n => n);

var porTamanho = palavras.OrderBy(p => p.Length);
var porUltima = palavras.OrderBy(p => p[p.Length - 1]);`,
        caption: 'A lambda extrai a **chave** de ordenação, não compara dois elementos.',
      },
      {
        kind: 'text',
        body:
          'Essa é a diferença central em relação ao `Sort` com `Comparison` do capítulo anterior: você diz **por qual valor** ordenar, e não como comparar dois elementos. É mais simples e menos sujeito a erro.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Sort: compara dois',
          code: `lista.Sort((a, b) =>
    a.Length.CompareTo(b.Length));`,
        },
        right: {
          label: 'OrderBy: extrai a chave',
          code: `lista.OrderBy(p => p.Length)`,
        },
      },
      {
        kind: 'text',
        body:
          'Para desempatar, use `ThenBy` — que só entra em ação quando o critério anterior empata. Ele pode ser encadeado quantas vezes for preciso.',
      },
      {
        kind: 'code',
        code: `palavras
    .OrderBy(p => p.Length)      // primeiro por tamanho
    .ThenBy(p => p);             // desempata alfabeticamente`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O desempate precisa ser `ThenBy`, não um segundo `OrderBy`. Encadear dois `OrderBy` **descarta** a primeira ordenação, porque o segundo reordena tudo do zero pelo seu próprio critério.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A ordenação do LINQ é **estável**: elementos que empatam mantêm a ordem relativa que tinham na origem. Isso significa que, na prática, o `ThenBy` só é necessário quando você quer um desempate **diferente** da ordem original.',
      },
    ],
    quiz: [
      {
        id: 's04c05l03q1',
        type: 'single',
        prompt: 'O que a lambda de `OrderBy` deve devolver?',
        options: [
          { id: 'a', text: 'A chave pela qual ordenar.', correct: true },
          { id: 'b', text: 'Um número negativo, zero ou positivo.' },
          { id: 'c', text: 'Um `bool` dizendo se vem antes.' },
          { id: 'd', text: 'A coleção ordenada.' },
        ],
        explanation:
          'Diferente de `Comparison`, aqui você extrai o valor a comparar e o LINQ cuida da comparação. É por isso que a lambda recebe **um** elemento, não dois.',
      },
      {
        id: 's04c05l03q2',
        type: 'single',
        prompt: 'O que acontece ao encadear dois `OrderBy`?',
        options: [
          { id: 'a', text: 'O segundo descarta a ordenação do primeiro.', correct: true },
          { id: 'b', text: 'Eles se combinam como critério e desempate.' },
          { id: 'c', text: 'Erro de compilação.' },
          { id: 'd', text: 'O primeiro é ignorado.' },
        ],
        explanation:
          'Cada `OrderBy` reordena a sequência inteira pelo seu critério. Para desempate, o operador correto é `ThenBy`.',
      },
      {
        id: 's04c05l03q3',
        type: 'single',
        prompt: 'O que significa a ordenação do LINQ ser estável?',
        options: [
          { id: 'a', text: 'Elementos que empatam mantêm a ordem que tinham na origem.', correct: true },
          { id: 'b', text: 'Ela nunca lança exceção.' },
          { id: 'c', text: 'Ela sempre produz o mesmo resultado.' },
          { id: 'd', text: 'Ela não altera a coleção original.' },
        ],
        explanation:
          'Estabilidade é sobre empates. Ela permite ordenar em etapas, e é o que torna o `ThenBy` opcional em muitos casos.',
      },
    ],
    challenge: {
      brief:
        'Ordene uma lista de palavras por critérios diferentes com `OrderBy` e `ThenBy`, mostrando que a lista original permanece intacta.',
      requirements: [
        'Leia `n` palavras para uma `List<string>`',
        'Linha 1: `Original: ...`, na ordem lida',
        'Linha 2: `Alfabetica: ...`',
        'Linha 3: `Decrescente: ...`',
        'Linha 4: `Por tamanho: ...`, desempatando alfabeticamente com `ThenBy`',
        'Linha 5: `Por tamanho decrescente: ...`, desempatando alfabeticamente crescente',
        'Linha 6: `Original intacta: True`, comparando a lista atual com a ordem lida',
        'Use `OrderBy`, `OrderByDescending` e `ThenBy`, sem `Sort`',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<string> palavras = new List<string>();
        for (int i = 0; i < n; i++)
        {
            palavras.Add(Console.ReadLine());
        }

        string original = string.Join(" ", palavras);

        // Quatro ordenacoes com LINQ
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<string> palavras = new List<string>();
        for (int i = 0; i < n; i++)
        {
            palavras.Add(Console.ReadLine());
        }

        string original = string.Join(" ", palavras);

        Console.WriteLine($"Original: {original}");
        Console.WriteLine($"Alfabetica: {string.Join(" ", palavras.OrderBy(p => p))}");
        Console.WriteLine($"Decrescente: {string.Join(" ", palavras.OrderByDescending(p => p))}");
        Console.WriteLine($"Por tamanho: {string.Join(" ", palavras.OrderBy(p => p.Length).ThenBy(p => p))}");
        Console.WriteLine($"Por tamanho decrescente: {string.Join(" ", palavras.OrderByDescending(p => p.Length).ThenBy(p => p))}");
        Console.WriteLine($"Original intacta: {string.Join(" ", palavras) == original}");
    }
}
`,
      hints: [
        'Para ordenar por si mesmo, a lambda é `p => p`.',
        'A linha final compara a lista atual com o texto guardado antes das ordenações — como o LINQ não altera nada, ela sempre dá `True`.',
      ],
      tests: [
        {
          name: 'Palavras de tamanhos variados',
          stdin: '5\nuva\nbanana\nkiwi\npera\nabacaxi\n',
          expectedStdout:
            'Original: uva banana kiwi pera abacaxi\nAlfabetica: abacaxi banana kiwi pera uva\n' +
            'Decrescente: uva pera kiwi banana abacaxi\nPor tamanho: uva kiwi pera banana abacaxi\n' +
            'Por tamanho decrescente: abacaxi banana kiwi pera uva\nOriginal intacta: True',
        },
        {
          name: 'Todas do mesmo tamanho',
          stdin: '3\ncba\nabc\nbca\n',
          expectedStdout:
            'Original: cba abc bca\nAlfabetica: abc bca cba\nDecrescente: cba bca abc\n' +
            'Por tamanho: abc bca cba\nPor tamanho decrescente: abc bca cba\nOriginal intacta: True',
        },
        {
          name: 'Uma palavra',
          stdin: '1\nsolo\n',
          expectedStdout:
            'Original: solo\nAlfabetica: solo\nDecrescente: solo\nPor tamanho: solo\n' +
            'Por tamanho decrescente: solo\nOriginal intacta: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c05l04',
    title: 'First, FirstOrDefault e Single',
    objective: 'Obter um único elemento de uma sequência, escolhendo o operador conforme o que deve acontecer quando ele não existe.',
    concept: [
      {
        kind: 'text',
        body:
          'Quatro operadores devolvem um elemento só, e a diferença entre eles é o que acontece nos **casos anormais**: nenhum elemento, ou mais de um.',
      },
      {
        kind: 'table',
        headers: ['Operador', 'Nenhum elemento', 'Vários elementos'],
        rows: [
          ['`First`', '**exceção**', 'devolve o primeiro'],
          ['`FirstOrDefault`', 'valor padrão', 'devolve o primeiro'],
          ['`Single`', '**exceção**', '**exceção**'],
          ['`SingleOrDefault`', 'valor padrão', '**exceção**'],
        ],
      },
      {
        kind: 'code',
        code: `var primeiro = numeros.First(n => n > 10);           // explode se nao houver
var seguro = numeros.FirstOrDefault(n => n > 10);    // devolve 0 se nao houver
var unico = numeros.Single(n => n == 42);            // exige exatamente um`,
      },
      {
        kind: 'text',
        body:
          'A escolha comunica uma **expectativa**. `Single` diz "deve existir exatamente um, e se não for o caso os dados estão errados". `FirstOrDefault` diz "pode não existir, e isso é normal".',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O valor padrão de `FirstOrDefault` é `0` para números e `null` para tipos de referência — e `0` pode ser um resultado legítimo. É a mesma ambiguidade do `out` do padrão `Try`: se a distinção importa, use `Any` antes ou compare com o padrão.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Usar `Single` quando você espera um único resultado é uma forma barata de **validação**. Se um dia os dados passarem a ter duplicatas, o programa avisa na hora em vez de silenciosamente processar só o primeiro.',
      },
      {
        kind: 'text',
        body:
          'Existem também `Last` e `LastOrDefault`, com o mesmo contrato pelo outro lado da sequência.',
      },
    ],
    quiz: [
      {
        id: 's04c05l04q1',
        type: 'single',
        prompt: 'O que `First` faz quando nenhum elemento satisfaz o critério?',
        options: [
          { id: 'a', text: 'Lança exceção.', correct: true },
          { id: 'b', text: 'Devolve `0`.' },
          { id: 'c', text: 'Devolve `null`.' },
          { id: 'd', text: 'Devolve o primeiro elemento da coleção.' },
        ],
        explanation:
          'Ele promete devolver um elemento; sem nenhum candidato, não há como cumprir. Quem aceita a ausência é `FirstOrDefault`.',
      },
      {
        id: 's04c05l04q2',
        type: 'single',
        prompt: 'Quando usar `Single` em vez de `First`?',
        options: [
          { id: 'a', text: 'Quando mais de um resultado indicaria um erro nos dados.', correct: true },
          { id: 'b', text: 'Quando a coleção é pequena.' },
          { id: 'c', text: 'Quando você quer o último elemento.' },
          { id: 'd', text: 'Quando a coleção pode estar vazia.' },
        ],
        explanation:
          '`Single` transforma uma suposição em verificação. Buscar por um identificador único é o caso clássico: dois resultados significam dados corrompidos.',
      },
      {
        id: 's04c05l04q3',
        type: 'single',
        prompt: 'Qual é o risco de `FirstOrDefault` com números?',
        options: [
          { id: 'a', text: 'O padrão `0` é indistinguível de um resultado legítimo igual a zero.', correct: true },
          { id: 'b', text: 'Ele lança exceção com coleções vazias.' },
          { id: 'c', text: 'Ele devolve o último elemento.' },
          { id: 'd', text: 'Ele não funciona com `int`.' },
        ],
        explanation:
          'É a mesma armadilha do `out` no padrão `Try`. Quando zero é um valor possível nos dados, é preciso outra forma de detectar a ausência.',
      },
    ],
    challenge: {
      brief:
        'Busque elementos em uma lista usando os operadores de elemento único, tratando os casos em que eles não existem sem deixar o programa quebrar.',
      requirements: [
        'Leia `n` valores para uma `List<int>` e depois um `alvo`',
        'Linha 1: `Primeiro maior que alvo: X` ou `Primeiro maior que alvo: nenhum`',
        'Linha 2: `Primeiro par: X` ou `Primeiro par: nenhum`',
        'Linha 3: `Ocorrencias do alvo: k`',
        'Linha 4: `Unico alvo: True` quando o alvo aparece exatamente uma vez, senão `False`',
        'Linha 5: `Ultimo positivo: X` ou `Ultimo positivo: nenhum`',
        'Use `Any` para verificar a existência antes de chamar `First` ou `Last`',
        'O programa não pode encerrar com exceção',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> numeros = new List<int>();
        for (int i = 0; i < n; i++)
        {
            numeros.Add(int.Parse(Console.ReadLine()));
        }

        int alvo = int.Parse(Console.ReadLine());

        // Busque com seguranca, verificando a existencia antes
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> numeros = new List<int>();
        for (int i = 0; i < n; i++)
        {
            numeros.Add(int.Parse(Console.ReadLine()));
        }

        int alvo = int.Parse(Console.ReadLine());

        if (numeros.Any(x => x > alvo))
        {
            Console.WriteLine($"Primeiro maior que alvo: {numeros.First(x => x > alvo)}");
        }
        else
        {
            Console.WriteLine("Primeiro maior que alvo: nenhum");
        }

        if (numeros.Any(x => x % 2 == 0))
        {
            Console.WriteLine($"Primeiro par: {numeros.First(x => x % 2 == 0)}");
        }
        else
        {
            Console.WriteLine("Primeiro par: nenhum");
        }

        int ocorrencias = numeros.Count(x => x == alvo);

        Console.WriteLine($"Ocorrencias do alvo: {ocorrencias}");
        Console.WriteLine($"Unico alvo: {ocorrencias == 1}");

        if (numeros.Any(x => x > 0))
        {
            Console.WriteLine($"Ultimo positivo: {numeros.Last(x => x > 0)}");
        }
        else
        {
            Console.WriteLine("Ultimo positivo: nenhum");
        }
    }
}
`,
      hints: [
        '`Any` com o mesmo predicado do `First` é a forma segura de evitar a exceção.',
        'Para a linha do único, `Count` com o predicado responde diretamente — sem precisar arriscar um `Single`.',
      ],
      tests: [
        {
          name: 'Todos os casos presentes',
          stdin: '5\n3\n8\n5\n12\n8\n5\n',
          expectedStdout:
            'Primeiro maior que alvo: 8\nPrimeiro par: 8\nOcorrencias do alvo: 1\n' +
            'Unico alvo: True\nUltimo positivo: 8',
        },
        {
          name: 'Alvo repetido',
          stdin: '4\n5\n5\n1\n2\n5\n',
          expectedStdout:
            'Primeiro maior que alvo: nenhum\nPrimeiro par: 2\nOcorrencias do alvo: 2\n' +
            'Unico alvo: False\nUltimo positivo: 2',
        },
        {
          name: 'Nenhum par e nenhum positivo',
          stdin: '3\n-1\n-3\n-5\n0\n',
          expectedStdout:
            'Primeiro maior que alvo: nenhum\nPrimeiro par: nenhum\nOcorrencias do alvo: 0\n' +
            'Unico alvo: False\nUltimo positivo: nenhum',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c05l05',
    title: 'Any e All',
    objective: 'Responder perguntas de existência e universalidade sobre uma coleção com um único operador.',
    concept: [
      {
        kind: 'text',
        body:
          'Na Seção 2 você usava flags para responder "existe algum?" e "todos são?". O LINQ tem um operador para cada uma dessas perguntas, e eles são a tradução direta das flags.',
      },
      {
        kind: 'code',
        code: `bool temNegativo = numeros.Any(n => n < 0);      // existe algum?
bool todosPares = numeros.All(n => n % 2 == 0);  // todos sao?
bool temAlgumaCoisa = numeros.Any();             // a colecao nao esta vazia?`,
      },
      {
        kind: 'table',
        headers: ['Operador', 'Coleção vazia', 'Para quando'],
        rows: [
          ['`Any(p)`', '`false`', 'acha o primeiro que passa'],
          ['`All(p)`', '**`true`**', 'acha o primeiro que falha'],
          ['`Any()`', '`false`', 'no primeiro elemento'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A coleção vazia devolve `true` em `All` — a mesma verdade vacuosa das flags da Seção 2. Não existe contraexemplo, então a afirmação é verdadeira. Parece estranho e é a única definição coerente.',
      },
      {
        kind: 'text',
        body:
          'Os dois **param cedo**: `Any` encerra ao encontrar o primeiro elemento que passa, e `All` ao encontrar o primeiro que falha. Em uma coleção grande, isso pode significar examinar um elemento em vez de um milhão.',
      },
      {
        kind: 'compare',
        good: `if (lista.Any())`,
        bad: `if (lista.Count() > 0)`,
        goodLabel: 'Para no primeiro',
        badLabel: 'Percorre tudo para contar',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Usar `Count() > 0` para testar se há elementos é um desperdício clássico: ele percorre a coleção inteira só para descobrir algo que o primeiro elemento já responderia. Com uma `List` a diferença é pequena, mas com uma sequência calculada pode ser enorme.',
      },
    ],
    quiz: [
      {
        id: 's04c05l05q1',
        type: 'single',
        prompt: 'O que `All` devolve para uma coleção vazia?',
        options: [
          { id: 'a', code: 'true', correct: true },
          { id: 'b', code: 'false' },
          { id: 'c', text: 'Lança exceção.' },
          { id: 'd', text: 'Depende do predicado.' },
        ],
        explanation:
          'É a verdade vacuosa: não há nenhum elemento que viole a condição. A mesma lógica das flags de "todos são X" da Seção 2.',
      },
      {
        id: 's04c05l05q2',
        type: 'single',
        prompt: 'Por que `Any()` é melhor que `Count() > 0`?',
        options: [
          { id: 'a', text: 'Porque `Any` para no primeiro elemento, enquanto `Count` percorre tudo.', correct: true },
          { id: 'b', text: 'Porque `Count` não funciona com sequências.' },
          { id: 'c', text: 'Porque `Any` devolve o elemento.' },
          { id: 'd', text: 'São equivalentes em tudo.' },
        ],
        explanation:
          'A pergunta é "existe algum", e um elemento basta para responder. Contar todos é fazer muito mais trabalho do que a pergunta exige.',
      },
      {
        id: 's04c05l05q3',
        type: 'single',
        prompt: 'Quando `All` para de examinar a coleção?',
        options: [
          { id: 'a', text: 'No primeiro elemento que **falha** no predicado.', correct: true },
          { id: 'b', text: 'No primeiro elemento que passa.' },
          { id: 'c', text: 'Nunca: ele sempre percorre tudo.' },
          { id: 'd', text: 'No último elemento.' },
        ],
        explanation:
          'Um único contraexemplo já torna a afirmação falsa. É o espelho do `Any`, que para no primeiro sucesso.',
      },
    ],
    challenge: {
      brief:
        'Responda perguntas de existência e universalidade sobre uma coleção usando `Any` e `All`.',
      requirements: [
        'Leia `n` valores para uma `List<int>`',
        'Linha 1: `Tem elementos: True`',
        'Linha 2: `Tem negativo: True/False`',
        'Linha 3: `Todos pares: True/False`',
        'Linha 4: `Todos positivos: True/False`',
        'Linha 5: `Tem multiplo de 10: True/False`',
        'Linha 6: `Nenhum maior que 100: True/False`, usando `All` com a condição invertida',
        'Com `n` igual a 0, a primeira linha é `False`, as de `All` são `True` e as de `Any` são `False`',
        'Use `Any` e `All`, sem laços',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> numeros = new List<int>();
        for (int i = 0; i < n; i++)
        {
            numeros.Add(int.Parse(Console.ReadLine()));
        }

        // Seis perguntas com Any e All
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> numeros = new List<int>();
        for (int i = 0; i < n; i++)
        {
            numeros.Add(int.Parse(Console.ReadLine()));
        }

        Console.WriteLine($"Tem elementos: {numeros.Any()}");
        Console.WriteLine($"Tem negativo: {numeros.Any(x => x < 0)}");
        Console.WriteLine($"Todos pares: {numeros.All(x => x % 2 == 0)}");
        Console.WriteLine($"Todos positivos: {numeros.All(x => x > 0)}");
        Console.WriteLine($"Tem multiplo de 10: {numeros.Any(x => x % 10 == 0)}");
        Console.WriteLine($"Nenhum maior que 100: {numeros.All(x => x <= 100)}");
    }
}
`,
      hints: [
        '"Nenhum maior que 100" é o mesmo que "todos menores ou iguais a 100" — daí o `All` com a condição invertida.',
        '`Any()` sem predicado responde apenas se a coleção tem algum elemento.',
      ],
      tests: [
        {
          name: 'Valores variados',
          stdin: '5\n2\n-4\n10\n6\n8\n',
          expectedStdout:
            'Tem elementos: True\nTem negativo: True\nTodos pares: True\nTodos positivos: False\n' +
            'Tem multiplo de 10: True\nNenhum maior que 100: True',
        },
        {
          name: 'Todos positivos ímpares',
          stdin: '3\n1\n3\n5\n',
          expectedStdout:
            'Tem elementos: True\nTem negativo: False\nTodos pares: False\nTodos positivos: True\n' +
            'Tem multiplo de 10: False\nNenhum maior que 100: True',
        },
        {
          name: 'Coleção vazia',
          stdin: '0\n',
          expectedStdout:
            'Tem elementos: False\nTem negativo: False\nTodos pares: True\nTodos positivos: True\n' +
            'Tem multiplo de 10: False\nNenhum maior que 100: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c05l06',
    title: 'Count, Sum e Average',
    objective: 'Agregar uma coleção em um único número, com ou sem filtro embutido.',
    concept: [
      {
        kind: 'text',
        body:
          'Os agregadores reduzem uma coleção inteira a um valor só. Eles substituem os acumuladores que você escrevia à mão na Seção 2, e a maioria aceita um predicado opcional que filtra na mesma chamada.',
      },
      {
        kind: 'code',
        code: `int quantos = numeros.Count();                  // total de elementos
int pares = numeros.Count(n => n % 2 == 0);     // so os que passam

int soma = numeros.Sum();
int somaPares = numeros.Sum(n => n % 2 == 0 ? n : 0);

double media = numeros.Average();`,
      },
      {
        kind: 'table',
        headers: ['Operador', 'Devolve', 'Coleção vazia'],
        rows: [
          ['`Count()`', 'a quantidade', '`0`'],
          ['`Sum()`', 'a soma', '`0`'],
          ['`Average()`', 'a média, como `double`', '**exceção**'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`Average` em uma coleção vazia lança `InvalidOperationException` — e a razão é honesta: a média de nada não existe. `Sum` e `Count` devolvem zero porque zero é a resposta correta, mas média zero seria mentira.',
      },
      {
        kind: 'text',
        body:
          'O `Count` com predicado é mais direto que `Where` seguido de `Count`, e diz melhor a intenção. Já para somar apenas alguns elementos, `Where` antes de `Sum` costuma ser mais claro que um ternário dentro do `Sum`.',
      },
      {
        kind: 'compare',
        good: `numeros.Where(n => n > 0).Sum()`,
        bad: `numeros.Sum(n => n > 0 ? n : 0)`,
        goodLabel: 'Filtra e soma',
        badLabel: 'Soma zeros para ignorar',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '`Average` sempre devolve `double`, mesmo sobre uma coleção de `int`. Isso evita a divisão inteira que era a armadilha número um da Seção 2 — aqui ela simplesmente não pode acontecer.',
      },
    ],
    quiz: [
      {
        id: 's04c05l06q1',
        type: 'single',
        prompt: 'O que `Average()` faz em uma coleção vazia?',
        options: [
          { id: 'a', text: 'Lança exceção.', correct: true },
          { id: 'b', text: 'Devolve `0`.' },
          { id: 'c', text: 'Devolve `null`.' },
          { id: 'd', text: 'Devolve `NaN`.' },
        ],
        explanation:
          'Não existe média de nenhum elemento. Diferente de `Sum`, que tem o zero como resposta legítima, aqui qualquer valor seria inventado.',
      },
      {
        id: 's04c05l06q2',
        type: 'single',
        prompt: 'Qual é o tipo de retorno de `Average()` sobre uma `List<int>`?',
        options: [
          { id: 'a', code: 'double', correct: true },
          { id: 'b', code: 'int' },
          { id: 'c', code: 'decimal' },
          { id: 'd', text: 'Depende dos valores.' },
        ],
        explanation:
          'Ele sempre promove para ponto flutuante, o que elimina de vez o risco de divisão inteira acidental.',
      },
      {
        id: 's04c05l06q3',
        type: 'single',
        prompt: 'Como contar quantos elementos passam em um critério?',
        options: [
          { id: 'a', code: 'lista.Count(x => criterio)', correct: true },
          { id: 'b', code: 'lista.Count()' },
          { id: 'c', code: 'lista.Sum(x => criterio)' },
          { id: 'd', code: 'lista.Any(x => criterio)' },
        ],
        explanation:
          'A sobrecarga com predicado conta só os aprovados. `Where(...).Count()` daria o mesmo resultado, com uma etapa a mais.',
      },
    ],
    challenge: {
      brief:
        'Agregue uma coleção de notas com `Count`, `Sum` e `Average`, incluindo versões com filtro, e trate a coleção vazia sem deixar o programa quebrar.',
      requirements: [
        'Leia `n` valores para uma `List<int>`',
        'Linha 1: `Quantidade: k`',
        'Linha 2: `Soma: X`',
        'Linha 3: `Media: Y`, com duas casas decimais, ou `Media: indefinida` para coleção vazia',
        'Linha 4: `Aprovados: a`, contando os valores maiores ou iguais a 6',
        'Linha 5: `Soma dos aprovados: Z`',
        'Linha 6: `Media dos aprovados: W` com duas casas, ou `Media dos aprovados: indefinida`',
        'Use `Any` para checar antes de calcular qualquer média',
        'O programa não pode encerrar com exceção',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> notas = new List<int>();
        for (int i = 0; i < n; i++)
        {
            notas.Add(int.Parse(Console.ReadLine()));
        }

        // Agregue com e sem filtro, tratando o caso vazio
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> notas = new List<int>();
        for (int i = 0; i < n; i++)
        {
            notas.Add(int.Parse(Console.ReadLine()));
        }

        Console.WriteLine($"Quantidade: {notas.Count()}");
        Console.WriteLine($"Soma: {notas.Sum()}");

        if (notas.Any())
        {
            Console.WriteLine($"Media: {notas.Average():F2}");
        }
        else
        {
            Console.WriteLine("Media: indefinida");
        }

        var aprovados = notas.Where(x => x >= 6);

        Console.WriteLine($"Aprovados: {notas.Count(x => x >= 6)}");
        Console.WriteLine($"Soma dos aprovados: {aprovados.Sum()}");

        if (aprovados.Any())
        {
            Console.WriteLine($"Media dos aprovados: {aprovados.Average():F2}");
        }
        else
        {
            Console.WriteLine("Media dos aprovados: indefinida");
        }
    }
}
`,
      hints: [
        'Guarde o resultado do `Where` em uma variável: ele é usado três vezes.',
        'A checagem `Any()` precisa vir antes de cada `Average`, incluindo a dos aprovados.',
      ],
      tests: [
        {
          name: 'Notas variadas',
          stdin: '5\n7\n4\n9\n6\n3\n',
          expectedStdout:
            'Quantidade: 5\nSoma: 29\nMedia: 5.80\nAprovados: 3\nSoma dos aprovados: 22\n' +
            'Media dos aprovados: 7.33',
        },
        {
          name: 'Nenhum aprovado',
          stdin: '3\n1\n2\n3\n',
          expectedStdout:
            'Quantidade: 3\nSoma: 6\nMedia: 2.00\nAprovados: 0\nSoma dos aprovados: 0\n' +
            'Media dos aprovados: indefinida',
        },
        {
          name: 'Coleção vazia',
          stdin: '0\n',
          expectedStdout:
            'Quantidade: 0\nSoma: 0\nMedia: indefinida\nAprovados: 0\nSoma dos aprovados: 0\n' +
            'Media dos aprovados: indefinida',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c05l07',
    title: 'Min, Max e MaxBy',
    objective: 'Encontrar extremos de uma coleção, distinguindo o valor extremo do elemento que o contém.',
    concept: [
      {
        kind: 'text',
        body:
          'Existem duas perguntas diferentes sobre extremos, e confundi-las é comum: "qual é o **maior valor**?" e "qual é o **elemento** com o maior valor?". `Max` responde a primeira, `MaxBy` responde a segunda.',
      },
      {
        kind: 'code',
        code: `int maiorIdade = pessoas.Max(p => p.Idade);   // 30       -> o numero
var maisVelha = pessoas.MaxBy(p => p.Idade);  // a Pessoa -> o objeto

Console.WriteLine(maisVelha.Nome);            // so possivel com MaxBy`,
        caption: '`Max` devolve a chave; `MaxBy` devolve o elemento inteiro.',
      },
      {
        kind: 'table',
        headers: ['Operador', 'Devolve', 'Coleção vazia'],
        rows: [
          ['`Max()`', 'o maior valor', '**exceção**'],
          ['`Max(chave)`', 'a maior chave', '**exceção**'],
          ['`MaxBy(chave)`', 'o elemento', '`null`'],
          ['`Min`, `MinBy`', 'espelhos dos anteriores', 'idem'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`Max` lança exceção em coleção vazia, mas `MaxBy` devolve `null`. A inconsistência é real e vale memorizar: sempre cheque com `Any()` antes, e a diferença deixa de importar.',
      },
      {
        kind: 'text',
        body:
          'Em caso de empate, `MaxBy` devolve o **primeiro** elemento que atinge o máximo — a mesma convenção da busca de máximo que você escreveu na Seção 2 com `>` estrito.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Antes do `MaxBy` existir, obter o elemento exigia ordenar a coleção inteira e pegar o primeiro — um custo muito maior para responder à mesma pergunta. `MaxBy` faz uma única passada.',
      },
      {
        kind: 'text',
        body:
          'O par `Min` e `MinBy` funciona exatamente igual pelo outro lado, com as mesmas regras de empate e de coleção vazia.',
      },
    ],
    quiz: [
      {
        id: 's04c05l07q1',
        type: 'single',
        prompt: 'Qual é a diferença entre `Max(p => p.Idade)` e `MaxBy(p => p.Idade)`?',
        options: [
          { id: 'a', text: 'O primeiro devolve a idade; o segundo devolve a pessoa.', correct: true },
          { id: 'b', text: 'São equivalentes.' },
          { id: 'c', text: 'O primeiro ordena a coleção.' },
          { id: 'd', text: 'O segundo devolve uma lista.' },
        ],
        explanation:
          'A distinção é entre a chave e o portador da chave. Com `Max` você perde o acesso aos outros campos do elemento.',
      },
      {
        id: 's04c05l07q2',
        type: 'single',
        prompt: 'O que `MaxBy` devolve em uma coleção vazia?',
        options: [
          { id: 'a', code: 'null', correct: true },
          { id: 'b', text: 'Lança exceção.' },
          { id: 'c', code: '0' },
          { id: 'd', text: 'O valor padrão do tipo da chave.' },
        ],
        explanation:
          'É a inconsistência da família: `Max` lança e `MaxBy` devolve `null`. Checar com `Any()` antes resolve os dois casos.',
      },
      {
        id: 's04c05l07q3',
        type: 'single',
        prompt: 'Qual elemento `MaxBy` devolve em caso de empate?',
        options: [
          { id: 'a', text: 'O primeiro que atinge o valor máximo.', correct: true },
          { id: 'b', text: 'O último.' },
          { id: 'c', text: 'Um qualquer, sem garantia.' },
          { id: 'd', text: 'Lança exceção por ambiguidade.' },
        ],
        explanation:
          'É a mesma convenção da comparação `>` estrita: um empate não substitui o campeão atual.',
      },
    ],
    challenge: {
      brief:
        'Analise uma lista de produtos com os operadores de extremo, distinguindo o valor máximo do produto que o possui.',
      requirements: [
        'Declare um `record Produto(string Nome, int Preco)` fora da classe',
        'Leia `n` produtos, cada um em duas linhas: nome e preço',
        'Linha 1: `Maior preco: X`, usando `Max`',
        'Linha 2: `Menor preco: Y`, usando `Min`',
        'Linha 3: `Mais caro: nome`, usando `MaxBy`',
        'Linha 4: `Mais barato: nome`, usando `MinBy`',
        'Linha 5: `Amplitude: Z`',
        'Em caso de empate no preço, vale o primeiro produto lido',
        'A entrada sempre tem pelo menos um produto',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

record Produto(string Nome, int Preco);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Produto> produtos = new List<Produto>();
        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int preco = int.Parse(Console.ReadLine());
            produtos.Add(new Produto(nome, preco));
        }

        // Use Max, Min, MaxBy e MinBy
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Produto(string Nome, int Preco);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Produto> produtos = new List<Produto>();
        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int preco = int.Parse(Console.ReadLine());
            produtos.Add(new Produto(nome, preco));
        }

        int maior = produtos.Max(p => p.Preco);
        int menor = produtos.Min(p => p.Preco);

        Console.WriteLine($"Maior preco: {maior}");
        Console.WriteLine($"Menor preco: {menor}");
        Console.WriteLine($"Mais caro: {produtos.MaxBy(p => p.Preco).Nome}");
        Console.WriteLine($"Mais barato: {produtos.MinBy(p => p.Preco).Nome}");
        Console.WriteLine($"Amplitude: {maior - menor}");
      }
}
`,
      hints: [
        '`MaxBy` devolve o `Produto` inteiro, então o nome sai com `.Nome` no fim.',
        'A amplitude usa os valores de `Max` e `Min`, não os objetos.',
      ],
      tests: [
        {
          name: 'Três produtos',
          stdin: '3\nTeclado\n150\nMouse\n80\nMonitor\n500\n',
          expectedStdout:
            'Maior preco: 500\nMenor preco: 80\nMais caro: Monitor\nMais barato: Mouse\nAmplitude: 420',
        },
        {
          name: 'Empate mantém o primeiro',
          stdin: '3\nA\n100\nB\n100\nC\n50\n',
          expectedStdout:
            'Maior preco: 100\nMenor preco: 50\nMais caro: A\nMais barato: C\nAmplitude: 50',
        },
        {
          name: 'Um produto só',
          stdin: '1\nUnico\n42\n',
          expectedStdout:
            'Maior preco: 42\nMenor preco: 42\nMais caro: Unico\nMais barato: Unico\nAmplitude: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c05l08',
    title: 'Take, Skip e paginação',
    objective: 'Recortar uma sequência com `Take` e `Skip`, implementando paginação com duas chamadas.',
    concept: [
      {
        kind: 'text',
        body:
          '`Take` pega os primeiros elementos e `Skip` descarta os primeiros. Juntos, eles recortam qualquer trecho de uma sequência — e é assim que se implementa paginação.',
      },
      {
        kind: 'code',
        code: `var primeiros3 = numeros.Take(3);           // 1, 2, 3
var semOsPrimeiros3 = numeros.Skip(3);      // 4, 5, 6, 7...

var pagina2 = numeros.Skip(3).Take(3);      // 4, 5, 6`,
        caption: 'A fórmula da paginação: pular as páginas anteriores, pegar o tamanho de uma.',
      },
      {
        kind: 'text',
        body:
          'A fórmula geral, com páginas numeradas a partir de 1, é `Skip((pagina - 1) * tamanho).Take(tamanho)`. O `-1` é o que faz a página 1 não pular nada.',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Resultado'],
        rows: [
          ['`Take(3)` com 2 elementos', 'devolve os 2, sem erro'],
          ['`Skip(10)` com 3 elementos', 'sequência vazia'],
          ['`Take(0)`', 'sequência vazia'],
          ['`Skip(-1)`', 'trata como 0'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Nenhuma dessas operações lança exceção por falta de elementos. Pedir mais do que existe simplesmente devolve o que há — um contraste deliberado com o acesso por índice, que estoura.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A ordem importa: `Take(3).Skip(1)` devolve 2 elementos, enquanto `Skip(1).Take(3)` devolve 3. O primeiro recorta antes de descartar, o segundo descarta antes de recortar.',
      },
      {
        kind: 'text',
        body:
          'Para paginação de verdade, é comum ordenar antes: `OrderBy(...).Skip(...).Take(...)`. Sem uma ordem definida, a "página 2" não significa nada estável.',
      },
    ],
    quiz: [
      {
        id: 's04c05l08q1',
        type: 'single',
        prompt: 'Qual é a fórmula para obter a página `p` com `t` itens por página?',
        options: [
          { id: 'a', code: 'Skip((p - 1) * t).Take(t)', correct: true },
          { id: 'b', code: 'Skip(p * t).Take(t)' },
          { id: 'c', code: 'Take(p * t).Skip(t)' },
          { id: 'd', code: 'Skip(t).Take(p)' },
        ],
        explanation:
          'O `-1` faz a primeira página não pular nada. Sem ele, a página 1 começaria no item `t + 1`.',
      },
      {
        id: 's04c05l08q2',
        type: 'single',
        prompt: 'O que `Take(10)` devolve em uma coleção de 3 elementos?',
        options: [
          { id: 'a', text: 'Os 3 elementos, sem erro.', correct: true },
          { id: 'b', text: 'Lança exceção.' },
          { id: 'c', text: 'Uma sequência vazia.' },
          { id: 'd', text: '3 elementos e 7 valores padrão.' },
        ],
        explanation:
          '`Take` pega **até** a quantidade pedida. Pedir mais do que existe não é erro, é apenas menos resultado.',
      },
      {
        id: 's04c05l08q3',
        type: 'single',
        prompt: 'Por que ordenar antes de paginar?',
        options: [
          { id: 'a', text: 'Porque sem ordem definida, o conteúdo de cada página não é estável.', correct: true },
          { id: 'b', text: 'Porque `Skip` exige uma sequência ordenada.' },
          { id: 'c', text: 'Porque melhora o desempenho.' },
          { id: 'd', text: 'Não é necessário ordenar.' },
        ],
        explanation:
          'Paginação divide uma sequência em pedaços por posição. Se a posição de cada item pode mudar, o mesmo item pode aparecer em duas páginas ou em nenhuma.',
      },
    ],
    challenge: {
      brief:
        'Implemente paginação sobre uma lista ordenada. Leia os itens, o tamanho da página e o número da página, e mostre o recorte correspondente.',
      requirements: [
        'Leia `n` palavras, depois o tamanho da página e o número da página',
        'Ordene alfabeticamente antes de paginar',
        'Linha 1: `Total: n`',
        'Linha 2: `Paginas: p`, arredondando para cima',
        'Linha 3: `Pagina k: item1 item2`, com os itens da página pedida',
        'Linha 4: `Itens nesta pagina: q`',
        'Linha 5: `Tem proxima: True/False`',
        'Uma página além do fim sai vazia, sem erro',
        'Use `Skip` e `Take`, sem acesso por índice',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<string> itens = new List<string>();
        for (int i = 0; i < n; i++)
        {
            itens.Add(Console.ReadLine());
        }

        int tamanho = int.Parse(Console.ReadLine());
        int pagina = int.Parse(Console.ReadLine());

        // Ordene, calcule o total de paginas, e recorte
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<string> itens = new List<string>();
        for (int i = 0; i < n; i++)
        {
            itens.Add(Console.ReadLine());
        }

        int tamanho = int.Parse(Console.ReadLine());
        int pagina = int.Parse(Console.ReadLine());

        var ordenados = itens.OrderBy(x => x);

        int totalPaginas = (n + tamanho - 1) / tamanho;

        var recorte = ordenados.Skip((pagina - 1) * tamanho).Take(tamanho).ToList();

        Console.WriteLine($"Total: {n}");
        Console.WriteLine($"Paginas: {totalPaginas}");
        Console.WriteLine($"Pagina {pagina}: {string.Join(" ", recorte)}");
        Console.WriteLine($"Itens nesta pagina: {recorte.Count}");
        Console.WriteLine($"Tem proxima: {pagina < totalPaginas}");
    }
}
`,
      hints: [
        'O arredondamento para cima sem ponto flutuante é `(n + tamanho - 1) / tamanho`.',
        'Materialize o recorte com `ToList()`: ele é usado três vezes, e recalcular seria desperdício.',
      ],
      tests: [
        {
          name: 'Segunda página de sete itens',
          stdin: '7\nuva\nbanana\nkiwi\npera\nabacaxi\nmanga\nlimao\n3\n2\n',
          expectedStdout:
            'Total: 7\nPaginas: 3\nPagina 2: limao manga pera\nItens nesta pagina: 3\nTem proxima: True',
        },
        {
          name: 'Última página incompleta',
          stdin: '7\nuva\nbanana\nkiwi\npera\nabacaxi\nmanga\nlimao\n3\n3\n',
          expectedStdout:
            'Total: 7\nPaginas: 3\nPagina 3: uva\nItens nesta pagina: 1\nTem proxima: False',
        },
        {
          name: 'Página além do fim',
          stdin: '2\nb\na\n5\n2\n',
          expectedStdout:
            'Total: 2\nPaginas: 1\nPagina 2:\nItens nesta pagina: 0\nTem proxima: False',
        },
        {
          name: 'Primeira página com tudo',
          stdin: '3\nc\na\nb\n10\n1\n',
          expectedStdout:
            'Total: 3\nPaginas: 1\nPagina 1: a b c\nItens nesta pagina: 3\nTem proxima: False',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c05l09',
    title: 'Prática: consulta de pedidos',
    objective: 'Encadear operadores LINQ em uma consulta realista sobre uma coleção de registros.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma consulta de verdade encadeia vários operadores, e cada um recebe o resultado do anterior. A ordem do encadeamento é a ordem do raciocínio: filtre, ordene, recorte, projete.',
      },
      {
        kind: 'code',
        code: `var resultado = pedidos
    .Where(p => p.Valor > 100)          // 1. quais interessam
    .OrderByDescending(p => p.Valor)    // 2. em que ordem
    .Take(3)                            // 3. quantos
    .Select(p => p.Cliente);            // 4. o que mostrar`,
        caption: 'Quatro etapas que se leem de cima para baixo, na ordem em que acontecem.',
      },
      {
        kind: 'table',
        headers: ['Ordem', 'Consequência'],
        rows: [
          ['`Where` antes de `OrderBy`', 'ordena menos elementos — mais rápido'],
          ['`OrderBy` antes de `Take`', 'pega os maiores, e não três quaisquer'],
          ['`Select` por último', 'projeta só o que sobrou'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Colocar `Take` antes de `OrderByDescending` produz um resultado completamente diferente: você pega três pedidos quaisquer e depois os ordena, em vez de pegar os três maiores. É o erro de encadeamento mais comum.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Filtrar cedo é a regra geral de desempenho em pipelines. Cada operador seguinte trabalha sobre menos dados, e o ganho se acumula ao longo da cadeia.',
      },
      {
        kind: 'text',
        body:
          'Uma consulta pode ser guardada em uma variável e reutilizada. Isso é útil quando várias respostas partem do mesmo filtro — e a lição sobre execução diferida, no próximo capítulo, explica um detalhe importante sobre isso.',
      },
    ],
    quiz: [
      {
        id: 's04c05l09q1',
        type: 'single',
        prompt: 'Qual é a diferença entre `.OrderBy(...).Take(3)` e `.Take(3).OrderBy(...)`?',
        options: [
          { id: 'a', text: 'O primeiro pega os três maiores; o segundo pega três quaisquer e os ordena.', correct: true },
          { id: 'b', text: 'Nenhuma.' },
          { id: 'c', text: 'O segundo é mais rápido e dá o mesmo resultado.' },
          { id: 'd', text: 'O segundo não compila.' },
        ],
        explanation:
          'A ordem determina sobre o que cada operador trabalha. `Take` antes recorta a coleção original, e a ordenação passa a valer só para esse recorte arbitrário.',
      },
      {
        id: 's04c05l09q2',
        type: 'single',
        prompt: 'Por que filtrar antes de ordenar?',
        options: [
          { id: 'a', text: 'Porque ordenar menos elementos custa menos.', correct: true },
          { id: 'b', text: 'Porque `Where` não funciona depois de `OrderBy`.' },
          { id: 'c', text: 'Porque a ordenação apagaria o filtro.' },
          { id: 'd', text: 'É indiferente.' },
        ],
        explanation:
          'O resultado é o mesmo nas duas ordens, mas ordenar é a operação mais cara da cadeia. Aplicá-la ao menor conjunto possível é sempre melhor.',
      },
      {
        id: 's04c05l09q3',
        type: 'single',
        prompt: 'Onde `Select` costuma ficar em uma cadeia?',
        options: [
          { id: 'a', text: 'Por último, projetando só o que sobrou.', correct: true },
          { id: 'b', text: 'Primeiro, para simplificar os dados.' },
          { id: 'c', text: 'Entre `Where` e `OrderBy`.' },
          { id: 'd', text: 'A posição é irrelevante.' },
        ],
        explanation:
          'Projetar cedo pode descartar campos de que os operadores seguintes precisam — se você projetar só o nome, não dá mais para ordenar por valor.',
      },
    ],
    challenge: {
      brief:
        'Consulte uma base de pedidos com LINQ encadeado, produzindo cinco respostas diferentes a partir da mesma coleção.',
      requirements: [
        'Declare um `record Pedido(string Cliente, string Produto, int Valor)` fora da classe',
        'Leia `n` pedidos, cada um em três linhas',
        'Linha 1: `Acima de 100: k`, contando os pedidos com valor maior que 100',
        'Linha 2: `Top 3 clientes: a b c`, os clientes dos três maiores pedidos, do maior para o menor',
        'Linha 3: `Produtos distintos: x y z`, em ordem alfabética, sem repetição',
        'Linha 4: `Valor total: X`',
        'Linha 5: `Maior pedido: cliente - produto (valor)`, do pedido de maior valor',
        'Em empates de valor, vale o primeiro pedido lido',
        'A entrada sempre tem pelo menos um pedido',
        'Use LINQ encadeado, sem laços de processamento',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

record Pedido(string Cliente, string Produto, int Valor);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Pedido> pedidos = new List<Pedido>();
        for (int i = 0; i < n; i++)
        {
            string cliente = Console.ReadLine();
            string produto = Console.ReadLine();
            int valor = int.Parse(Console.ReadLine());
            pedidos.Add(new Pedido(cliente, produto, valor));
        }

        // Cinco consultas encadeadas
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Pedido(string Cliente, string Produto, int Valor);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Pedido> pedidos = new List<Pedido>();
        for (int i = 0; i < n; i++)
        {
            string cliente = Console.ReadLine();
            string produto = Console.ReadLine();
            int valor = int.Parse(Console.ReadLine());
            pedidos.Add(new Pedido(cliente, produto, valor));
        }

        Console.WriteLine($"Acima de 100: {pedidos.Count(p => p.Valor > 100)}");

        var top3 = pedidos
            .OrderByDescending(p => p.Valor)
            .Take(3)
            .Select(p => p.Cliente);

        Console.WriteLine($"Top 3 clientes: {string.Join(" ", top3)}");

        var produtos = pedidos
            .Select(p => p.Produto)
            .Distinct()
            .OrderBy(p => p);

        Console.WriteLine($"Produtos distintos: {string.Join(" ", produtos)}");
        Console.WriteLine($"Valor total: {pedidos.Sum(p => p.Valor)}");

        var maior = pedidos.MaxBy(p => p.Valor);

        Console.WriteLine($"Maior pedido: {maior.Cliente} - {maior.Produto} ({maior.Valor})");
    }
}
`,
      hints: [
        'O top 3 encadeia três operadores: ordenar decrescente, pegar três, projetar o cliente.',
        '`Distinct` remove as repetições da projeção de produtos, e o `OrderBy` vem depois dele.',
      ],
      tests: [
        {
          name: 'Cinco pedidos',
          stdin: '5\nAna\nTeclado\n150\nBruno\nMouse\n80\nCarla\nMonitor\n500\nAna\nMouse\n120\nDiego\nTeclado\n90\n',
          expectedStdout:
            'Acima de 100: 3\nTop 3 clientes: Carla Ana Ana\nProdutos distintos: Monitor Mouse Teclado\n' +
            'Valor total: 940\nMaior pedido: Carla - Monitor (500)',
        },
        {
          name: 'Menos de três pedidos',
          stdin: '2\nX\nA\n50\nY\nB\n200\n',
          expectedStdout:
            'Acima de 100: 1\nTop 3 clientes: Y X\nProdutos distintos: A B\n' +
            'Valor total: 250\nMaior pedido: Y - B (200)',
        },
        {
          name: 'Um pedido só',
          stdin: '1\nSolo\nItem\n42\n',
          expectedStdout:
            'Acima de 100: 0\nTop 3 clientes: Solo\nProdutos distintos: Item\n' +
            'Valor total: 42\nMaior pedido: Solo - Item (42)',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c05l10',
    title: 'Checkpoint: LINQ básico',
    objective: 'Combinar os operadores essenciais em um relatório completo, escolhendo o certo para cada pergunta.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint monta um relatório de vendas em que cada linha exige um operador diferente. O exercício é reconhecer, para cada pergunta, qual operador a responde diretamente.',
      },
      {
        kind: 'table',
        headers: ['Pergunta', 'Operador'],
        rows: [
          ['quantos passam no critério?', '`Count(p)`'],
          ['existe algum?', '`Any(p)`'],
          ['todos são?', '`All(p)`'],
          ['qual é o maior valor?', '`Max(chave)`'],
          ['qual elemento tem o maior?', '`MaxBy(chave)`'],
          ['os N maiores', '`OrderByDescending().Take(n)`'],
          ['a média dos aprovados', '`Where().Average()`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A diferença entre um bom e um mau uso de LINQ está quase toda aqui: escolher o operador que responde à pergunta em vez de encadear operadores genéricos até chegar lá. `Count(p)` diz mais que `Where(p).ToList().Count`.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Toda média precisa de guarda. `Average` sobre um filtro que não aprovou ninguém lança exceção — e é justamente em relatórios que esse caso aparece, quando um critério exigente não encontra nada.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Escreva uma linha por vez, rodando os testes a cada uma. Consultas LINQ são densas: um operador trocado produz um resultado plausível e errado, e isolar qual foi é difícil quando você escreveu oito de uma vez.',
      },
      {
        kind: 'text',
        body:
          'O próximo capítulo acrescenta os operadores de agrupamento e junção, que resolvem as perguntas que este conjunto ainda não alcança — como "quanto cada vendedor vendeu".',
      },
    ],
    quiz: [
      {
        id: 's04c05l10q1',
        type: 'single',
        prompt: 'Qual operador responde "existe alguma venda acima de mil?"',
        options: [
          { id: 'a', code: 'Any(v => v.Valor > 1000)', correct: true },
          { id: 'b', code: 'Count(v => v.Valor > 1000)' },
          { id: 'c', code: 'Where(v => v.Valor > 1000)' },
          { id: 'd', code: 'Max(v => v.Valor)' },
        ],
        explanation:
          'A pergunta é de existência, e `Any` para no primeiro que passa. `Count` daria a resposta certa fazendo trabalho desnecessário.',
      },
      {
        id: 's04c05l10q2',
        type: 'single',
        prompt: 'Como obter o nome do vendedor com a maior venda?',
        options: [
          { id: 'a', code: 'vendas.MaxBy(v => v.Valor).Vendedor', correct: true },
          { id: 'b', code: 'vendas.Max(v => v.Vendedor)' },
          { id: 'c', code: 'vendas.Max(v => v.Valor)' },
          { id: 'd', code: 'vendas.OrderBy(v => v.Valor).First().Vendedor' },
        ],
        explanation:
          '`MaxBy` devolve o registro inteiro. A opção com `OrderBy` crescente pegaria o **menor**, e `Max(v => v.Vendedor)` daria o nome alfabeticamente maior.',
      },
      {
        id: 's04c05l10q3',
        type: 'single',
        prompt: 'Por que toda média precisa de guarda em um relatório?',
        options: [
          { id: 'a', text: 'Porque um filtro pode não aprovar nenhum elemento, e `Average` lança exceção.', correct: true },
          { id: 'b', text: 'Porque `Average` pode devolver `null`.' },
          { id: 'c', text: 'Porque a média pode ser negativa.' },
          { id: 'd', text: 'Porque `Average` só funciona com `double`.' },
        ],
        explanation:
          'É o caso de borda mais provável em relatórios reais: um critério exigente que, em um período ruim, não encontra nada.',
      },
    ],
    challenge: {
      brief:
        'Produza um relatório de vendas completo usando os operadores essenciais do LINQ, com uma linha para cada tipo de pergunta.',
      requirements: [
        'Declare um `record Venda(string Vendedor, string Regiao, int Valor)` fora da classe',
        'Leia `n` vendas, cada uma em três linhas',
        'Linha 1: `Total de vendas: n`',
        'Linha 2: `Valor total: X`',
        'Linha 3: `Media: Y` com duas casas, ou `Media: indefinida`',
        'Linha 4: `Acima de 200: k`',
        'Linha 5: `Tem venda no Sul: True/False`',
        'Linha 6: `Todas acima de 50: True/False`',
        'Linha 7: `Maior venda: vendedor (valor)`',
        'Linha 8: `Top 2 valores: a b`, os dois maiores valores em ordem decrescente',
        'Linha 9: `Regioes: n s`, em ordem alfabética e sem repetição',
        'Linha 10: `Media acima de 200: Z` com duas casas, ou `Media acima de 200: indefinida`',
        'Com `n` igual a 0, as médias são indefinidas, a maior venda é `nenhuma`, e as listas saem vazias',
        'Use os operadores LINQ diretamente, sem laços de processamento',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

record Venda(string Vendedor, string Regiao, int Valor);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Venda> vendas = new List<Venda>();
        for (int i = 0; i < n; i++)
        {
            string vendedor = Console.ReadLine();
            string regiao = Console.ReadLine();
            int valor = int.Parse(Console.ReadLine());
            vendas.Add(new Venda(vendedor, regiao, valor));
        }

        // Dez linhas de relatorio, cada uma com o operador certo
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Venda(string Vendedor, string Regiao, int Valor);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Venda> vendas = new List<Venda>();
        for (int i = 0; i < n; i++)
        {
            string vendedor = Console.ReadLine();
            string regiao = Console.ReadLine();
            int valor = int.Parse(Console.ReadLine());
            vendas.Add(new Venda(vendedor, regiao, valor));
        }

        Console.WriteLine($"Total de vendas: {vendas.Count()}");
        Console.WriteLine($"Valor total: {vendas.Sum(v => v.Valor)}");

        if (vendas.Any())
        {
            Console.WriteLine($"Media: {vendas.Average(v => v.Valor):F2}");
        }
        else
        {
            Console.WriteLine("Media: indefinida");
        }

        Console.WriteLine($"Acima de 200: {vendas.Count(v => v.Valor > 200)}");
        Console.WriteLine($"Tem venda no Sul: {vendas.Any(v => v.Regiao == "Sul")}");
        Console.WriteLine($"Todas acima de 50: {vendas.All(v => v.Valor > 50)}");

        if (vendas.Any())
        {
            var maior = vendas.MaxBy(v => v.Valor);
            Console.WriteLine($"Maior venda: {maior.Vendedor} ({maior.Valor})");
        }
        else
        {
            Console.WriteLine("Maior venda: nenhuma");
        }

        var top2 = vendas.OrderByDescending(v => v.Valor).Take(2).Select(v => v.Valor);
        Console.WriteLine($"Top 2 valores: {string.Join(" ", top2)}");

        var regioes = vendas.Select(v => v.Regiao).Distinct().OrderBy(r => r);
        Console.WriteLine($"Regioes: {string.Join(" ", regioes)}");

        var acima = vendas.Where(v => v.Valor > 200);

        if (acima.Any())
        {
            Console.WriteLine($"Media acima de 200: {acima.Average(v => v.Valor):F2}");
        }
        else
        {
            Console.WriteLine("Media acima de 200: indefinida");
        }
    }
}
`,
      hints: [
        'As duas médias precisam de guarda `Any()`, e a segunda checa o resultado do `Where`, não a coleção inteira.',
        'O `MaxBy` também precisa de guarda: em coleção vazia ele devolve `null`, e acessar `.Vendedor` quebraria.',
      ],
      tests: [
        {
          name: 'Cinco vendas',
          stdin: '5\nAna\nSul\n300\nBruno\nNorte\n150\nCarla\nSul\n500\nDiego\nLeste\n80\nAna\nNorte\n250\n',
          expectedStdout:
            'Total de vendas: 5\nValor total: 1280\nMedia: 256.00\nAcima de 200: 3\n' +
            'Tem venda no Sul: True\nTodas acima de 50: True\nMaior venda: Carla (500)\n' +
            'Top 2 valores: 500 300\nRegioes: Leste Norte Sul\nMedia acima de 200: 350.00',
        },
        {
          name: 'Nenhuma acima de 200',
          stdin: '2\nX\nNorte\n100\nY\nNorte\n40\n',
          expectedStdout:
            'Total de vendas: 2\nValor total: 140\nMedia: 70.00\nAcima de 200: 0\n' +
            'Tem venda no Sul: False\nTodas acima de 50: False\nMaior venda: X (100)\n' +
            'Top 2 valores: 100 40\nRegioes: Norte\nMedia acima de 200: indefinida',
        },
        {
          name: 'Uma venda só',
          stdin: '1\nSolo\nSul\n1000\n',
          expectedStdout:
            'Total de vendas: 1\nValor total: 1000\nMedia: 1000.00\nAcima de 200: 1\n' +
            'Tem venda no Sul: True\nTodas acima de 50: True\nMaior venda: Solo (1000)\n' +
            'Top 2 valores: 1000\nRegioes: Sul\nMedia acima de 200: 1000.00',
        },
        {
          name: 'Nenhuma venda',
          stdin: '0\n',
          expectedStdout:
            'Total de vendas: 0\nValor total: 0\nMedia: indefinida\nAcima de 200: 0\n' +
            'Tem venda no Sul: False\nTodas acima de 50: True\nMaior venda: nenhuma\n' +
            'Top 2 valores:\nRegioes:\nMedia acima de 200: indefinida',
          hidden: true,
        },
      ],
    },
  },
]
