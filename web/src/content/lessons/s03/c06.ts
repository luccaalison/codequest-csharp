import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's03c06l01',
    title: 'Tuplas',
    objective: 'Agrupar valores relacionados sob uma única variável, sem precisar declarar um tipo próprio.',
    concept: [
      {
        kind: 'text',
        body:
          'Às vezes dois ou três valores andam juntos e não valem uma classe inteira: um par de coordenadas, um resultado com seu status, um nome com sua pontuação. A **tupla** é exatamente isso — vários valores em um só, sem cerimônia.',
      },
      {
        kind: 'code',
        code: `(int, string) par = (1, "banana");

Console.WriteLine(par.Item1);   // 1
Console.WriteLine(par.Item2);   // banana

var outro = (2, "pera");        // o tipo e inferido`,
        caption: 'Os parênteses formam o tipo e formam o valor. `Item1` e `Item2` acessam as posições.',
      },
      {
        kind: 'text',
        body:
          'Tuplas são **tipos por valor**, como `int`. Atribuir uma tupla a outra variável copia os valores, e comparar duas tuplas com `==` compara o **conteúdo**, posição por posição.',
      },
      {
        kind: 'code',
        code: `Console.WriteLine((1, "a") == (1, "a"));   // True
Console.WriteLine((1, "a") == (1, "b"));   // False`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Essa igualdade estrutural é a diferença mais importante em relação a arrays e listas, onde `==` compara identidade. Duas tuplas com os mesmos valores são iguais, mesmo tendo sido criadas em lugares diferentes.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`Item1` e `Item2` começam em **1**, não em 0. É a única coisa em C# indexada a partir de 1, e ela contraria o hábito de todo o resto da linguagem. A próxima lição mostra como evitar esses nomes por completo.',
      },
      {
        kind: 'text',
        body:
          'Uma tupla pode ter até oito posições confortavelmente. Quando o agrupamento passa disso — ou quando ele ganha significado próprio no programa —, é sinal de que ele merece um tipo com nome, assunto do fim deste capítulo.',
      },
    ],
    quiz: [
      {
        id: 's03c06l01q1',
        type: 'single',
        prompt: 'Como acessar o primeiro elemento de `(int, string) par`?',
        options: [
          { id: 'a', code: 'par.Item1', correct: true },
          { id: 'b', code: 'par.Item0' },
          { id: 'c', code: 'par[0]' },
          { id: 'd', code: 'par.First' },
        ],
        explanation:
          'A numeração das posições de tupla começa em 1. Tuplas também não têm indexador, então `par[0]` nem compila.',
      },
      {
        id: 's03c06l01q2',
        type: 'single',
        prompt: 'Quanto vale `(1, "a") == (1, "a")`?',
        options: [
          { id: 'a', code: 'True', correct: true },
          { id: 'b', code: 'False' },
          { id: 'c', text: 'Não compila: tuplas não suportam `==`.' },
          { id: 'd', text: 'Depende de como foram criadas.' },
        ],
        explanation:
          'Tuplas comparam por conteúdo, posição a posição. É o oposto de arrays, em que `==` pergunta se são o mesmo objeto na memória.',
      },
      {
        id: 's03c06l01q3',
        type: 'single',
        prompt: 'Quando um agrupamento deixa de ser caso para tupla?',
        options: [
          { id: 'a', text: 'Quando ele ganha significado próprio no programa ou fica com valores demais.', correct: true },
          { id: 'b', text: 'Quando passa de dois valores.' },
          { id: 'c', text: 'Quando os tipos são diferentes.' },
          { id: 'd', text: 'Quando precisa ser comparado.' },
        ],
        explanation:
          'Tuplas resolvem bem o agrupamento circunstancial. Um conceito que aparece em várias partes do programa merece um nome — e é para isso que existem `record` e classes.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` pares, cada um em duas linhas: um número e um texto. Guarde-os em uma lista de tuplas, mostre cada par, e conte quantos são iguais a um par alvo lido no fim.',
      requirements: [
        'Uma linha por par, no formato `(1, a)`',
        'Depois: `Total: n`',
        'Por último: `Iguais ao alvo: k`',
        'A ordem da entrada é: `n`, os `n` pares número/texto, e depois o número e o texto do alvo',
        'Compare as tuplas inteiras com `==`, não os elementos separadamente',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<(int, string)> pares = new List<(int, string)>();

        // Leia os n pares e guarde na lista

        // Leia o alvo e conte as tuplas iguais a ele
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<(int, string)> pares = new List<(int, string)>();

        for (int i = 0; i < n; i++)
        {
            int numero = int.Parse(Console.ReadLine());
            string texto = Console.ReadLine();
            pares.Add((numero, texto));
        }

        int alvoNumero = int.Parse(Console.ReadLine());
        string alvoTexto = Console.ReadLine();
        (int, string) alvo = (alvoNumero, alvoTexto);

        int iguais = 0;

        foreach ((int, string) par in pares)
        {
            Console.WriteLine($"({par.Item1}, {par.Item2})");

            if (par == alvo)
            {
                iguais++;
            }
        }

        Console.WriteLine($"Total: {pares.Count}");
        Console.WriteLine($"Iguais ao alvo: {iguais}");
    }
}
`,
      hints: [
        'Uma tupla é criada com parênteses: `pares.Add((numero, texto));` — repare nos dois pares de parênteses.',
        'A comparação `par == alvo` já checa os dois elementos de uma vez.',
      ],
      tests: [
        {
          name: 'Duas ocorrências do alvo',
          stdin: '3\n1\na\n2\nb\n1\na\n1\na\n',
          expectedStdout: '(1, a)\n(2, b)\n(1, a)\nTotal: 3\nIguais ao alvo: 2',
        },
        {
          name: 'Número bate mas o texto não',
          stdin: '1\n5\nx\n5\ny\n',
          expectedStdout: '(5, x)\nTotal: 1\nIguais ao alvo: 0',
        },
        {
          name: 'Todos iguais ao alvo',
          stdin: '2\n7\nz\n7\nz\n7\nz\n',
          expectedStdout: '(7, z)\n(7, z)\nTotal: 2\nIguais ao alvo: 2',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c06l02',
    title: 'Nomeando elementos',
    objective: 'Dar nomes aos elementos de uma tupla, trocando `Item1` por identificadores com significado.',
    concept: [
      {
        kind: 'text',
        body:
          '`Item1` e `Item2` funcionam, mas não dizem nada. Uma tupla **nomeada** dá um identificador a cada posição, e o código passa a se explicar sozinho.',
      },
      {
        kind: 'compare',
        good: `(string Nome, int Preco) item = ("Teclado", 150);

Console.WriteLine(item.Nome);
Console.WriteLine(item.Preco);`,
        bad: `(string, int) item = ("Teclado", 150);

Console.WriteLine(item.Item1);
Console.WriteLine(item.Item2);`,
        goodLabel: 'Diz o que cada posição é',
        badLabel: 'Exige lembrar a ordem',
      },
      {
        kind: 'text',
        body:
          'Os nomes fazem parte do tipo, então uma `List<(string Nome, int Preco)>` propaga os nomes para todo elemento que sai dela — inclusive dentro de um `foreach`.',
      },
      {
        kind: 'code',
        code: `List<(string Nome, int Preco)> itens = new List<(string Nome, int Preco)>();

itens.Add(("Teclado", 150));
itens.Add(("Mouse", 80));

foreach (var item in itens)
{
    Console.WriteLine($"{item.Nome}: {item.Preco}");
}`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Os nomes existem apenas em tempo de compilação: eles não ocupam memória e não têm custo. `(string Nome, int Preco)` e `(string, int)` são **o mesmo tipo** em execução, e `Item1` continua funcionando mesmo na versão nomeada.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Como os nomes não fazem diferença em execução, atribuir uma tupla nomeada a outra com nomes diferentes compila sem reclamar — desde que os tipos casem. É a única forma de embaralhar significados sem o compilador avisar.',
      },
      {
        kind: 'text',
        body:
          'A convenção é usar maiúscula inicial nos nomes de elementos de tupla, como em `Nome` e `Preco`. É a mesma convenção de propriedades públicas, e vale porque eles são acessados de fora exatamente como propriedades.',
      },
    ],
    quiz: [
      {
        id: 's03c06l02q1',
        type: 'single',
        prompt: 'Qual é a diferença em execução entre `(string, int)` e `(string Nome, int Preco)`?',
        options: [
          { id: 'a', text: 'Nenhuma: os nomes só existem em tempo de compilação.', correct: true },
          { id: 'b', text: 'A nomeada ocupa mais memória.' },
          { id: 'c', text: 'A nomeada é mais lenta de acessar.' },
          { id: 'd', text: 'São tipos diferentes e incompatíveis.' },
        ],
        explanation:
          'Os nomes são conveniência do compilador. Isso é ótimo para desempenho e é justamente por isso que atribuições entre nomes diferentes passam sem aviso.',
      },
      {
        id: 's03c06l02q2',
        type: 'single',
        prompt: 'Em uma `List<(string Nome, int Preco)>`, como acessar o preço dentro de um `foreach`?',
        options: [
          { id: 'a', code: 'item.Preco', correct: true },
          { id: 'b', code: 'item[1]' },
          { id: 'c', code: 'item.Item0' },
          { id: 'd', text: 'Não é possível: os nomes se perdem na lista.' },
        ],
        explanation:
          'Os nomes fazem parte do tipo da lista, então todo elemento que sai dela os carrega. `item.Item2` também continua válido, mas diz muito menos.',
      },
      {
        id: 's03c06l02q3',
        type: 'single',
        prompt: 'Qual é a convenção para nomear elementos de tupla?',
        options: [
          { id: 'a', text: 'Maiúscula inicial, como em propriedades.', correct: true },
          { id: 'b', text: 'Minúscula inicial, como em variáveis locais.' },
          { id: 'c', text: 'Prefixo com underscore.' },
          { id: 'd', text: 'Tudo em maiúsculas.' },
        ],
        explanation:
          'Eles são acessados de fora com a mesma sintaxe de uma propriedade pública, então seguem a mesma convenção de nomes.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e depois `n` produtos, cada um em três linhas: código, nome e preço. Guarde-os em uma lista de tuplas nomeadas e produza o catálogo com o total e o produto mais caro.',
      requirements: [
        'Uma linha por produto, no formato `1 - Teclado: 150`',
        'Depois: `Total: t`, somando os preços',
        'Por último: `Mais caro: nome`',
        'Em caso de empate no preço, vale o **primeiro** produto lido',
        'Use uma tupla nomeada com `Codigo`, `Nome` e `Preco`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<(int Codigo, string Nome, int Preco)> catalogo =
            new List<(int Codigo, string Nome, int Preco)>();

        // Leia os n produtos e monte o catalogo

        // Imprima, some, e ache o mais caro
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<(int Codigo, string Nome, int Preco)> catalogo =
            new List<(int Codigo, string Nome, int Preco)>();

        for (int i = 0; i < n; i++)
        {
            int codigo = int.Parse(Console.ReadLine());
            string nome = Console.ReadLine();
            int preco = int.Parse(Console.ReadLine());
            catalogo.Add((codigo, nome, preco));
        }

        int total = 0;
        string maisCaro = "";
        int maiorPreco = int.MinValue;

        foreach (var item in catalogo)
        {
            Console.WriteLine($"{item.Codigo} - {item.Nome}: {item.Preco}");
            total += item.Preco;

            if (item.Preco > maiorPreco)
            {
                maiorPreco = item.Preco;
                maisCaro = item.Nome;
            }
        }

        Console.WriteLine($"Total: {total}");
        Console.WriteLine($"Mais caro: {maisCaro}");
    }
}
`,
      hints: [
        'Cada produto ocupa três linhas da entrada, na ordem código, nome, preço.',
        'A comparação `>` estrita mantém o primeiro produto em caso de empate no preço.',
      ],
      tests: [
        {
          name: 'Dois produtos',
          stdin: '2\n1\nTeclado\n150\n2\nMouse\n80\n',
          expectedStdout: '1 - Teclado: 150\n2 - Mouse: 80\nTotal: 230\nMais caro: Teclado',
        },
        {
          name: 'Empate no preço mantém o primeiro',
          stdin: '3\n1\nA\n100\n2\nB\n100\n3\nC\n50\n',
          expectedStdout:
            '1 - A: 100\n2 - B: 100\n3 - C: 50\nTotal: 250\nMais caro: A',
        },
        {
          name: 'Um produto só',
          stdin: '1\n9\nUnico\n50\n',
          expectedStdout: '9 - Unico: 50\nTotal: 50\nMais caro: Unico',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c06l03',
    title: 'Desconstrução',
    objective: 'Extrair os elementos de uma tupla para variáveis separadas em uma única linha.',
    concept: [
      {
        kind: 'text',
        body:
          'Desconstruir é o inverso de construir: em vez de juntar valores em uma tupla, você os espalha de volta em variáveis independentes, tudo em uma linha.',
      },
      {
        kind: 'code',
        code: `(string Nome, int Preco) item = ("Teclado", 150);

var (nome, preco) = item;     // duas variaveis novas

Console.WriteLine(nome);      // Teclado
Console.WriteLine(preco);     // 150`,
      },
      {
        kind: 'text',
        body:
          'A desconstrução também funciona direto no `foreach`, o que costuma deixar o corpo do laço bem mais limpo — especialmente quando os elementos são usados várias vezes.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Sem desconstruir',
          code: `foreach (var par in pares)
{
    int soma = par.A + par.B;
    Console.WriteLine(
        $"{par.A} + {par.B} = {soma}");
}`,
        },
        right: {
          label: 'Desconstruindo',
          code: `foreach (var (a, b) in pares)
{
    Console.WriteLine(
        $"{a} + {b} = {a + b}");
}`,
        },
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Os nomes que você dá na desconstrução são independentes dos nomes da tupla. Desconstruir uma `(string Nome, int Preco)` em `var (produto, valor)` é perfeitamente válido — a correspondência é por **posição**, não por nome.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Como a correspondência é posicional, trocar a ordem das variáveis não gera erro se os tipos coincidirem. Desconstruir `(int Largura, int Altura)` em `var (altura, largura)` compila perfeitamente e inverte os dois — um bug silencioso.',
      },
      {
        kind: 'text',
        body:
          'Quando alguma posição não interessa, o caractere `_` a descarta explicitamente: `var (nome, _) = item;` deixa claro para quem lê que o segundo valor foi ignorado de propósito.',
      },
    ],
    quiz: [
      {
        id: 's03c06l03q1',
        type: 'single',
        prompt: 'A desconstrução associa as variáveis por quê?',
        options: [
          { id: 'a', text: 'Por posição.', correct: true },
          { id: 'b', text: 'Pelo nome dos elementos da tupla.' },
          { id: 'c', text: 'Por tipo.' },
          { id: 'd', text: 'Por ordem alfabética.' },
        ],
        explanation:
          'É por isso que você pode escolher nomes diferentes dos da tupla — e também por isso que inverter a ordem passa despercebido quando os tipos são iguais.',
      },
      {
        id: 's03c06l03q2',
        type: 'single',
        prompt: 'Para que serve o `_` em `var (nome, _) = item;`?',
        options: [
          { id: 'a', text: 'Para descartar aquela posição explicitamente.', correct: true },
          { id: 'b', text: 'Para criar uma variável chamada `_`.' },
          { id: 'c', text: 'Para indicar valor nulo.' },
          { id: 'd', text: 'Para repetir o valor anterior.' },
        ],
        explanation:
          'O descarte comunica intenção: aquele valor existe na tupla mas não interessa aqui. É mais claro do que inventar uma variável que nunca será usada.',
      },
      {
        id: 's03c06l03q3',
        type: 'single',
        prompt: 'Qual é o risco de desconstruir uma tupla de dois `int`?',
        options: [
          { id: 'a', text: 'Trocar a ordem das variáveis compila normalmente e inverte os valores.', correct: true },
          { id: 'b', text: 'A desconstrução não funciona com tipos iguais.' },
          { id: 'c', text: 'Os nomes precisam ser idênticos aos da tupla.' },
          { id: 'd', text: 'Não há risco.' },
        ],
        explanation:
          'Com tipos diferentes o compilador barra a inversão. Com dois valores do mesmo tipo, nada avisa — e o bug só aparece no resultado.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` pares de números, cada par em duas linhas. Guarde em uma lista de tuplas e, desconstruindo cada uma, mostre a soma de cada par e os três totais.',
      requirements: [
        'Uma linha por par, no formato `3 + 4 = 7`',
        'Depois: `Soma dos primeiros: a`',
        'Depois: `Soma dos segundos: b`',
        'Por último: `Soma geral: g`',
        'Use desconstrução no `foreach`, não acesso por `Item1` e `Item2`',
        'Com `n` igual a 0, os três totais são `0` e nenhuma linha de par é impressa',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<(int, int)> pares = new List<(int, int)>();

        for (int i = 0; i < n; i++)
        {
            int a = int.Parse(Console.ReadLine());
            int b = int.Parse(Console.ReadLine());
            pares.Add((a, b));
        }

        // Desconstrua cada par no foreach e acumule os totais
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<(int, int)> pares = new List<(int, int)>();

        for (int i = 0; i < n; i++)
        {
            int a = int.Parse(Console.ReadLine());
            int b = int.Parse(Console.ReadLine());
            pares.Add((a, b));
        }

        int somaPrimeiros = 0;
        int somaSegundos = 0;

        foreach (var (primeiro, segundo) in pares)
        {
            Console.WriteLine($"{primeiro} + {segundo} = {primeiro + segundo}");
            somaPrimeiros += primeiro;
            somaSegundos += segundo;
        }

        Console.WriteLine($"Soma dos primeiros: {somaPrimeiros}");
        Console.WriteLine($"Soma dos segundos: {somaSegundos}");
        Console.WriteLine($"Soma geral: {somaPrimeiros + somaSegundos}");
    }
}
`,
      hints: [
        'A forma é `foreach (var (primeiro, segundo) in pares)`, com os parênteses internos.',
        'A soma geral não precisa de acumulador próprio: ela é a soma dos outros dois totais.',
      ],
      tests: [
        {
          name: 'Dois pares',
          stdin: '2\n3\n4\n10\n20\n',
          expectedStdout:
            '3 + 4 = 7\n10 + 20 = 30\nSoma dos primeiros: 13\nSoma dos segundos: 24\nSoma geral: 37',
        },
        {
          name: 'Par que soma zero',
          stdin: '1\n-5\n5\n',
          expectedStdout:
            '-5 + 5 = 0\nSoma dos primeiros: -5\nSoma dos segundos: 5\nSoma geral: 0',
        },
        {
          name: 'Nenhum par',
          stdin: '0\n',
          expectedStdout:
            'Soma dos primeiros: 0\nSoma dos segundos: 0\nSoma geral: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c06l04',
    title: 'Retornando múltiplos valores',
    objective: 'Empacotar vários resultados de um cálculo em uma tupla, o padrão que substitui os parâmetros `out`.',
    concept: [
      {
        kind: 'text',
        body:
          'Um cálculo costuma produzir mais de uma resposta. Analisar uma sequência devolve o menor, o maior e a soma; converter um texto devolve se deu certo **e** o valor. A tupla é a forma moderna de empacotar isso.',
      },
      {
        kind: 'code',
        code: `// tres resultados, uma variavel
var resumo = (menor, maior, soma);

// e de volta a tres variaveis
var (mn, mx, sm) = resumo;`,
      },
      {
        kind: 'text',
        body:
          'O uso mais comum aparece em **métodos**, que você vai escrever na Seção 4. Um método que devolve uma tupla entrega vários valores de uma vez, sem parâmetros `out`:',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Com tupla (Seção 4)',
          code: `static (int Menor, int Maior)
    Extremos(int[] v)
{
    // ...
    return (menor, maior);
}

var (a, b) = Extremos(dados);`,
        },
        right: {
          label: 'Com out (você já viu)',
          code: `static void Extremos(
    int[] v,
    out int menor,
    out int maior)
{
    // ...
}

Extremos(dados, out int a, out int b);`,
        },
        note: 'A versão com tupla é a preferida hoje. O `out` sobrevive principalmente no padrão `Try`.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'É exatamente por isso que `int.TryParse` usa `out`: ele precisa devolver duas coisas — o sucesso e o valor. Se essa API fosse desenhada hoje, ela provavelmente devolveria uma tupla `(bool Sucesso, int Valor)`.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Empacotar valores que **não** têm relação entre si só torna o código confuso. A tupla é para resultados que fazem sentido juntos: menor e maior de uma mesma análise, sim; a média das notas e o nome do arquivo, não.',
      },
      {
        kind: 'text',
        body:
          'Até chegar aos métodos, você pode usar o mesmo padrão dentro do `Main`: calcule tudo, empacote em uma tupla, e desconstrua na hora de usar. O ganho é organizar o que anda junto sob um nome só.',
      },
    ],
    quiz: [
      {
        id: 's03c06l04q1',
        type: 'single',
        prompt: 'Qual é a forma moderna de um método devolver dois valores?',
        options: [
          { id: 'a', text: 'Devolvendo uma tupla.', correct: true },
          { id: 'b', text: 'Com dois `return` seguidos.' },
          { id: 'c', text: 'Devolvendo um array de dois elementos.' },
          { id: 'd', text: 'Não é possível: um método devolve um valor só.' },
        ],
        explanation:
          'A tupla é um valor só que contém dois. O array funcionaria, mas perde os nomes e obriga todos os elementos a terem o mesmo tipo.',
      },
      {
        id: 's03c06l04q2',
        type: 'single',
        prompt: 'Por que `int.TryParse` usa `out` em vez de tupla?',
        options: [
          { id: 'a', text: 'Porque ele é anterior às tuplas modernas do C#.', correct: true },
          { id: 'b', text: 'Porque tuplas não podem conter `bool`.' },
          { id: 'c', text: 'Porque `out` é mais rápido.' },
          { id: 'd', text: 'Porque ele devolve só um valor.' },
        ],
        explanation:
          'O padrão `Try` é bem mais antigo que as tuplas de valor. Ele permanece por compatibilidade e porque encaixa bem em um `if`, mas APIs novas com múltiplos resultados tendem a usar tupla.',
      },
      {
        id: 's03c06l04q3',
        type: 'single',
        prompt: 'Quando **não** usar uma tupla para agrupar valores?',
        options: [
          { id: 'a', text: 'Quando os valores não têm relação entre si.', correct: true },
          { id: 'b', text: 'Quando são mais de dois.' },
          { id: 'c', text: 'Quando os tipos são diferentes.' },
          { id: 'd', text: 'Quando o resultado será impresso.' },
        ],
        explanation:
          'Tuplas de tipos variados e com vários elementos são normais. O que estraga é agrupar coisas sem relação, o que esconde a estrutura real do programa.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e depois `n` valores. Calcule o menor, o maior e a soma, **empacote os três em uma única tupla**, e depois desconstrua essa tupla para produzir o relatório.',
      requirements: [
        'Linha 1: `Menor: X`',
        'Linha 2: `Maior: Y`',
        'Linha 3: `Soma: S`',
        'Linha 4: `Amplitude: A`, a diferença entre o maior e o menor',
        'Os três resultados precisam ser agrupados em uma tupla antes de serem usados',
        'Valores negativos são válidos, e a sequência pode ser inteiramente negativa',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int menor = int.MaxValue;
        int maior = int.MinValue;
        int soma = 0;

        // Leia os n valores e alimente os tres resultados

        // Empacote em uma tupla e desconstrua para imprimir
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int menor = int.MaxValue;
        int maior = int.MinValue;
        int soma = 0;

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());

            if (valor < menor)
            {
                menor = valor;
            }

            if (valor > maior)
            {
                maior = valor;
            }

            soma += valor;
        }

        var resumo = (Menor: menor, Maior: maior, Soma: soma);

        var (mn, mx, sm) = resumo;

        Console.WriteLine($"Menor: {mn}");
        Console.WriteLine($"Maior: {mx}");
        Console.WriteLine($"Soma: {sm}");
        Console.WriteLine($"Amplitude: {mx - mn}");
    }
}
`,
      hints: [
        'A tupla pode ser criada com nomes: `var resumo = (Menor: menor, Maior: maior, Soma: soma);`.',
        'A desconstrução `var (mn, mx, sm) = resumo;` cria as três variáveis de uma vez, na ordem em que foram empacotadas.',
      ],
      tests: [
        {
          name: 'Série variada',
          stdin: '6\n12\n7\n25\n3\n18\n9\n',
          expectedStdout: 'Menor: 3\nMaior: 25\nSoma: 74\nAmplitude: 22',
        },
        {
          name: 'Todos iguais',
          stdin: '3\n5\n5\n5\n',
          expectedStdout: 'Menor: 5\nMaior: 5\nSoma: 15\nAmplitude: 0',
        },
        {
          name: 'Um valor negativo só',
          stdin: '1\n-4\n',
          expectedStdout: 'Menor: -4\nMaior: -4\nSoma: -4\nAmplitude: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c06l05',
    title: 'Trocando valores',
    objective: 'Trocar o conteúdo de duas variáveis em uma linha, sem variável temporária.',
    concept: [
      {
        kind: 'text',
        body:
          'Trocar duas variáveis é uma das operações mais frequentes em algoritmos de ordenação e manipulação de arrays. A forma clássica precisa de uma variável extra; a atribuição por tupla dispensa.',
      },
      {
        kind: 'compare',
        good: `(a, b) = (b, a);`,
        bad: `int temporario = a;
a = b;
b = temporario;`,
        goodLabel: 'Uma linha',
        badLabel: 'Três linhas e uma variável',
      },
      {
        kind: 'text',
        body:
          'Isso funciona porque o lado direito é avaliado **por completo** antes de qualquer atribuição acontecer. A tupla `(b, a)` é montada com os valores antigos, e só então os dois destinos recebem seus novos valores.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'É a mesma regra de ordem que apareceu em Fibonacci, no algoritmo de Euclides e na média móvel: calcule tudo a partir dos valores antigos antes de atualizar qualquer um. A atribuição por tupla apenas faz isso automaticamente.',
      },
      {
        kind: 'code',
        code: `// inverter um array com dois indices que se encontram
for (int i = 0, j = v.Length - 1; i < j; i++, j--)
{
    (v[i], v[j]) = (v[j], v[i]);
}`,
        caption: 'O laço de dois ponteiros da Seção 2, agora com a troca em uma linha.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A condição do laço é `i < j`, e não `i <= j`. Com `<=`, o elemento central de um array de tamanho ímpar seria trocado consigo mesmo — inofensivo no resultado, mas conta uma troca a mais que não aconteceu de fato.',
      },
      {
        kind: 'text',
        body:
          'O número de trocas para inverter um array de `n` elementos é `n / 2`, com divisão inteira. Um array de 5 elementos faz 2 trocas; o do meio já está na posição final.',
      },
    ],
    quiz: [
      {
        id: 's03c06l05q1',
        type: 'single',
        prompt: 'Por que `(a, b) = (b, a);` funciona sem variável temporária?',
        options: [
          { id: 'a', text: 'Porque o lado direito é avaliado por inteiro antes de qualquer atribuição.', correct: true },
          { id: 'b', text: 'Porque o C# usa uma variável temporária escondida que você não precisa declarar.' },
          { id: 'c', text: 'Porque as atribuições acontecem da direita para a esquerda.' },
          { id: 'd', text: 'Porque tuplas são tipos por referência.' },
        ],
        explanation:
          'A tupla `(b, a)` é construída com os valores antigos e só depois desmontada nos destinos. É a mesma ideia do `proximo` em Fibonacci, embutida na linguagem.',
      },
      {
        id: 's03c06l05q2',
        type: 'single',
        prompt: 'Quantas trocas são necessárias para inverter um array de 5 elementos?',
        options: [
          { id: 'a', code: '2', correct: true },
          { id: 'b', code: '5' },
          { id: 'c', code: '4' },
          { id: 'd', code: '3' },
        ],
        explanation:
          'São `n / 2` trocas: as posições 0 e 4, e depois 1 e 3. O elemento central já está onde precisa ficar.',
      },
      {
        id: 's03c06l05q3',
        type: 'single',
        prompt: 'Por que a condição do laço de inversão é `i < j` e não `i <= j`?',
        options: [
          { id: 'a', text: 'Para não trocar o elemento central consigo mesmo em arrays de tamanho ímpar.', correct: true },
          { id: 'b', text: 'Para evitar índice fora dos limites.' },
          { id: 'c', text: 'Porque `<=` inverteria o array duas vezes.' },
          { id: 'd', text: 'É indiferente: as duas funcionam igual.' },
        ],
        explanation:
          'O resultado do array seria o mesmo, mas a operação extra é trabalho desperdiçado e distorce qualquer contagem de trocas.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e depois `n` valores para um array. Inverta o array **no lugar**, usando troca por tupla e dois índices que se aproximam pelas pontas. Informe quantas trocas foram feitas.',
      requirements: [
        'Linha 1: `Original: 1 2 3 4 5`, antes da inversão',
        'Linha 2: `Invertido: 5 4 3 2 1`',
        'Linha 3: `Trocas: k`',
        'Inverta o próprio array, sem criar um segundo',
        'Use `(v[i], v[j]) = (v[j], v[i]);` para a troca',
        'Um array de 1 elemento faz 0 trocas',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] v = new int[n];
        for (int i = 0; i < v.Length; i++)
        {
            v[i] = int.Parse(Console.ReadLine());
        }

        // Monte a linha original antes de inverter

        int trocas = 0;

        // Inverta no lugar com dois indices que se encontram
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] v = new int[n];
        for (int i = 0; i < v.Length; i++)
        {
            v[i] = int.Parse(Console.ReadLine());
        }

        string original = "";
        for (int i = 0; i < v.Length; i++)
        {
            original += $"{v[i]} ";
        }

        int trocas = 0;

        for (int i = 0, j = v.Length - 1; i < j; i++, j--)
        {
            (v[i], v[j]) = (v[j], v[i]);
            trocas++;
        }

        string invertido = "";
        for (int i = 0; i < v.Length; i++)
        {
            invertido += $"{v[i]} ";
        }

        Console.WriteLine($"Original: {original}");
        Console.WriteLine($"Invertido: {invertido}");
        Console.WriteLine($"Trocas: {trocas}");
    }
}
`,
      hints: [
        'O cabeçalho do laço é `for (int i = 0, j = v.Length - 1; i < j; i++, j--)`, com duas variáveis de controle.',
        'Monte a linha `Original` antes do laço de inversão: depois dele a ordem original já não existe.',
      ],
      tests: [
        {
          name: 'Tamanho ímpar',
          stdin: '5\n1\n2\n3\n4\n5\n',
          expectedStdout: 'Original: 1 2 3 4 5\nInvertido: 5 4 3 2 1\nTrocas: 2',
        },
        {
          name: 'Tamanho par',
          stdin: '4\n1\n2\n3\n4\n',
          expectedStdout: 'Original: 1 2 3 4\nInvertido: 4 3 2 1\nTrocas: 2',
        },
        {
          name: 'Um elemento não precisa de troca',
          stdin: '1\n7\n',
          expectedStdout: 'Original: 7\nInvertido: 7\nTrocas: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c06l06',
    title: 'Ordenando por múltiplos critérios',
    objective: 'Ordenar por um critério e desempatar por outro, aproveitando a comparação natural de tuplas.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma tupla se compara com outra **componente por componente**: primeiro o elemento 1; se empatarem, o elemento 2; e assim por diante. É exatamente a regra de um ranking com desempate.',
      },
      {
        kind: 'code',
        code: `List<(int Pontos, string Nome)> lista = new List<(int Pontos, string Nome)>();

lista.Add((80, "Carlos"));
lista.Add((90, "Bruno"));
lista.Add((80, "Ana"));

lista.Sort();   // ordena por Pontos, depois por Nome`,
      },
      {
        kind: 'output',
        code: `(80, Ana) (80, Carlos) (90, Bruno)`,
        caption: 'Pontos crescentes, e entre os empatados, nome em ordem alfabética.',
      },
      {
        kind: 'text',
        body:
          'O problema é que `Sort` só ordena em ordem **crescente**, e um ranking quer os maiores primeiro. A solução clássica não exige nenhum recurso novo: guarde o número **negado** na tupla.',
      },
      {
        kind: 'code',
        code: `lista.Add((-pontos, nome));   // negativo inverte a ordem
lista.Sort();

// na hora de imprimir, desfaz:
foreach (var (chave, nome) in lista)
{
    Console.WriteLine($"{nome} {-chave}");
}`,
        caption: 'Pontuação decrescente e nome crescente, com um único `Sort`.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A ordem dos elementos na tupla **é** a prioridade dos critérios. Trocar `(-pontos, nome)` por `(nome, -pontos)` ordenaria alfabeticamente e usaria a pontuação apenas para desempatar homônimos — um ranking completamente diferente.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A negação só inverte critérios **numéricos**. Para ordenar texto em ordem decrescente não há truque equivalente: é preciso passar uma comparação ao `Sort`, o que depende de recursos da Seção 4.',
      },
      {
        kind: 'text',
        body:
          'Esse padrão escala para quantos critérios você quiser: `(-pontos, tempo, nome)` ordena por pontuação decrescente, depois por tempo crescente, depois por nome. Um `Sort` resolve os três.',
      },
    ],
    quiz: [
      {
        id: 's03c06l06q1',
        type: 'single',
        prompt: 'Como uma tupla é comparada com outra?',
        options: [
          { id: 'a', text: 'Componente por componente, na ordem, parando na primeira diferença.', correct: true },
          { id: 'b', text: 'Pela soma dos componentes.' },
          { id: 'c', text: 'Apenas pelo primeiro componente.' },
          { id: 'd', text: 'Tuplas não são comparáveis.' },
        ],
        explanation:
          'É a mesma regra de ordem alfabética aplicada a componentes em vez de letras — e é o que faz a tupla resolver desempates sem nenhum código extra.',
      },
      {
        id: 's03c06l06q2',
        type: 'single',
        prompt: 'Por que guardar `-pontos` em vez de `pontos` na tupla?',
        options: [
          { id: 'a', text: 'Porque `Sort` só ordena crescente, e negar inverte a ordem daquele critério.', correct: true },
          { id: 'b', text: 'Porque tuplas não aceitam números positivos.' },
          { id: 'c', text: 'Para economizar memória.' },
          { id: 'd', text: 'Porque a pontuação pode ser negativa.' },
        ],
        explanation:
          'A maior pontuação vira o menor valor negado, então ela sobe para o topo da ordem crescente. Na impressão, negar de novo devolve o valor original.',
      },
      {
        id: 's03c06l06q3',
        type: 'single',
        prompt: 'O que muda ao usar `(nome, -pontos)` em vez de `(-pontos, nome)`?',
        options: [
          { id: 'a', text: 'A lista passa a ser ordenada por nome, com a pontuação só desempatando.', correct: true },
          { id: 'b', text: 'Nada: os dois critérios são aplicados igualmente.' },
          { id: 'c', text: 'O `Sort` deixa de funcionar.' },
          { id: 'd', text: 'A ordem da pontuação passa a ser crescente.' },
        ],
        explanation:
          'A posição na tupla define a prioridade. O primeiro componente manda, e os seguintes só entram em cena quando ele empata.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e depois `n` competidores, cada um em duas linhas: nome e pontuação. Produza a classificação em ordem decrescente de pontuação, desempatando por ordem alfabética de nome.',
      requirements: [
        'Uma linha por competidor, no formato `1. Bruno 90`, com a colocação numerada a partir de 1',
        'A ordem principal é pontuação **decrescente**',
        'Empates de pontuação são desempatados por nome em ordem **crescente**',
        'Cada competidor recebe uma colocação diferente, mesmo empatando em pontos',
        'Use uma lista de tuplas e um único `Sort`, sem escrever um algoritmo de ordenação',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<(int Chave, string Nome)> lista = new List<(int Chave, string Nome)>();

        // Guarde a pontuacao negada para inverter a ordem

        // Ordene e imprima, desfazendo a negacao
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<(int Chave, string Nome)> lista = new List<(int Chave, string Nome)>();

        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int pontos = int.Parse(Console.ReadLine());
            lista.Add((-pontos, nome));
        }

        lista.Sort();

        for (int i = 0; i < lista.Count; i++)
        {
            var (chave, nome) = lista[i];
            Console.WriteLine($"{i + 1}. {nome} {-chave}");
        }
    }
}
`,
      hints: [
        'Guarde `(-pontos, nome)` na lista: a negação faz o `Sort` produzir a ordem decrescente de pontuação.',
        'Na impressão, `-chave` devolve a pontuação original, e `i + 1` é a colocação.',
      ],
      tests: [
        {
          name: 'Empate desempatado por nome',
          stdin: '4\nAna\n80\nBruno\n90\nCarlos\n80\nDiego\n70\n',
          expectedStdout: '1. Bruno 90\n2. Ana 80\n3. Carlos 80\n4. Diego 70',
        },
        {
          name: 'Todos com a mesma pontuação',
          stdin: '2\nZeca\n50\nAna\n50\n',
          expectedStdout: '1. Ana 50\n2. Zeca 50',
        },
        {
          name: 'Um competidor só',
          stdin: '1\nSolo\n10\n',
          expectedStdout: '1. Solo 10',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c06l07',
    title: 'Chave composta em dicionário',
    objective: 'Usar uma tupla como chave de dicionário para indexar dados por mais de um campo.',
    concept: [
      {
        kind: 'text',
        body:
          'Às vezes o que identifica um dado não é um valor só: uma célula de planilha precisa de linha **e** coluna, um horário de aula precisa de dia **e** período. Como tuplas comparam por conteúdo, elas funcionam como chave de dicionário.',
      },
      {
        kind: 'code',
        code: `Dictionary<(int, int), int> grade = new Dictionary<(int, int), int>();

grade[(0, 0)] = 5;
grade[(1, 2)] = 7;

Console.WriteLine(grade[(1, 2)]);            // 7
Console.WriteLine(grade.ContainsKey((3, 3))); // False`,
        caption: 'A chave `(1, 2)` criada agora é igual à `(1, 2)` criada antes: a igualdade é estrutural.',
      },
      {
        kind: 'text',
        body:
          'Isso resolve o problema da **matriz esparsa**: uma grade de mil por mil com apenas dez células preenchidas ocuparia um milhão de posições como `int[,]`, e ocupa dez entradas como dicionário de tuplas.',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Estrutura'],
        rows: [
          ['grade pequena e cheia', '`int[,]`'],
          ['grade enorme e quase vazia', '`Dictionary<(int,int), T>`'],
          ['coordenadas ilimitadas ou negativas', '`Dictionary<(int,int), T>`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma matriz obriga índices de 0 até o tamanho. O dicionário de tuplas aceita `(-5, 1000000)` sem alocar nada entre eles — é o que permite representar mapas de mundo aberto e planilhas com coordenadas arbitrárias.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Consultar uma chave inexistente continua lançando `KeyNotFoundException`, exatamente como qualquer dicionário. Em uma grade esparsa, a maioria das consultas cai em célula vazia — então `TryGetValue` deixa de ser opcional e vira o caminho normal.',
      },
      {
        kind: 'text',
        body:
          'Qualquer combinação de tipos funciona como chave: `(string, int)` para produto e ano, `(int, int, int)` para uma coordenada em três dimensões. O que importa é que todos os componentes sejam comparáveis por valor.',
      },
    ],
    quiz: [
      {
        id: 's03c06l07q1',
        type: 'single',
        prompt: 'Por que uma tupla funciona como chave de dicionário?',
        options: [
          { id: 'a', text: 'Porque tuplas comparam por conteúdo, não por identidade.', correct: true },
          { id: 'b', text: 'Porque tuplas são tipos por referência.' },
          { id: 'c', text: 'Porque tuplas são ordenadas.' },
          { id: 'd', text: 'Porque o dicionário converte a tupla em texto.' },
        ],
        explanation:
          'Duas tuplas com os mesmos valores são iguais e produzem o mesmo código de espalhamento. Um array, que compara por identidade, não serviria como chave.',
      },
      {
        id: 's03c06l07q2',
        type: 'single',
        prompt: 'Quando um dicionário de tuplas é melhor que uma matriz?',
        options: [
          { id: 'a', text: 'Quando a grade é grande e a maior parte das células está vazia.', correct: true },
          { id: 'b', text: 'Sempre: ele é mais rápido.' },
          { id: 'c', text: 'Quando a grade é pequena.' },
          { id: 'd', text: 'Quando as coordenadas começam em zero.' },
        ],
        explanation:
          'A matriz aloca todas as células, cheias ou não. O dicionário paga só pelo que existe — mas paga mais caro por célula, então em grades densas ele perde.',
      },
      {
        id: 's03c06l07q3',
        type: 'single',
        prompt: 'O que acontece ao ler uma coordenada não preenchida?',
        options: [
          { id: 'a', text: 'Lança `KeyNotFoundException`, como qualquer chave ausente.', correct: true },
          { id: 'b', text: 'Devolve `0`.' },
          { id: 'c', text: 'Cria a entrada com valor padrão.' },
          { id: 'd', text: 'Devolve `null`.' },
        ],
        explanation:
          'Chave composta não muda a regra do indexador. Em grade esparsa, a célula vazia é o caso comum, então `TryGetValue` é o acesso padrão.',
      },
    ],
    challenge: {
      brief:
        'Represente uma grade esparsa com um dicionário de tuplas. Leia `n` células preenchidas, cada uma em três linhas — linha, coluna e valor — e depois `q` consultas de coordenada, cada uma em duas linhas. Células não preenchidas valem `0`.',
      requirements: [
        'Uma linha por consulta, no formato `(1,2) -> 7`',
        'Coordenadas não preenchidas respondem `0`',
        'Depois: `Celulas ocupadas: c`',
        'Por último: `Soma: s`, somando todos os valores guardados',
        'A ordem da entrada é: `n`, as `n` células, `q`, e as `q` consultas',
        'Gravar duas vezes na mesma coordenada substitui o valor anterior',
        'Use `TryGetValue`: o programa não pode encerrar com exceção',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<(int, int), int> grade = new Dictionary<(int, int), int>();

        // Leia as n celulas preenchidas

        int q = int.Parse(Console.ReadLine());

        // Responda as q consultas com TryGetValue
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<(int, int), int> grade = new Dictionary<(int, int), int>();

        for (int i = 0; i < n; i++)
        {
            int linha = int.Parse(Console.ReadLine());
            int coluna = int.Parse(Console.ReadLine());
            int valor = int.Parse(Console.ReadLine());
            grade[(linha, coluna)] = valor;
        }

        int q = int.Parse(Console.ReadLine());

        for (int i = 0; i < q; i++)
        {
            int linha = int.Parse(Console.ReadLine());
            int coluna = int.Parse(Console.ReadLine());

            if (grade.TryGetValue((linha, coluna), out int valor))
            {
                Console.WriteLine($"({linha},{coluna}) -> {valor}");
            }
            else
            {
                Console.WriteLine($"({linha},{coluna}) -> 0");
            }
        }

        int soma = 0;
        foreach (KeyValuePair<(int, int), int> par in grade)
        {
            soma += par.Value;
        }

        Console.WriteLine($"Celulas ocupadas: {grade.Count}");
        Console.WriteLine($"Soma: {soma}");
    }
}
`,
      hints: [
        'A chave é criada com parênteses duplos: `grade[(linha, coluna)] = valor;`.',
        'A soma pode percorrer o dicionário com `foreach`, somando `par.Value` — a ordem não importa para somar.',
      ],
      tests: [
        {
          name: 'Consultas em células cheias e vazias',
          stdin: '2\n0\n0\n5\n1\n2\n7\n3\n0\n0\n1\n2\n3\n3\n',
          expectedStdout:
            '(0,0) -> 5\n(1,2) -> 7\n(3,3) -> 0\nCelulas ocupadas: 2\nSoma: 12',
        },
        {
          name: 'Gravar duas vezes na mesma coordenada',
          stdin: '2\n1\n1\n5\n1\n1\n9\n1\n1\n1\n',
          expectedStdout: '(1,1) -> 9\nCelulas ocupadas: 1\nSoma: 9',
        },
        {
          name: 'Coordenadas negativas',
          stdin: '1\n-5\n3\n42\n2\n-5\n3\n0\n0\n',
          expectedStdout:
            '(-5,3) -> 42\n(0,0) -> 0\nCelulas ocupadas: 1\nSoma: 42',
        },
        {
          name: 'Grade vazia',
          stdin: '0\n1\n0\n0\n',
          expectedStdout: '(0,0) -> 0\nCelulas ocupadas: 0\nSoma: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c06l08',
    title: 'record para dados simples',
    objective: 'Declarar um tipo próprio para dados com uma linha de código, ganhando nome, `ToString` e igualdade.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma tupla resolve o agrupamento circunstancial. Quando o agrupamento vira um **conceito** do programa — um produto, um ponto, uma medição —, ele merece um nome próprio. O `record` posicional faz isso em uma linha.',
      },
      {
        kind: 'code',
        code: `record Produto(string Nome, int Preco);

// em qualquer lugar do programa:
var p = new Produto("Teclado", 150);

Console.WriteLine(p.Nome);    // Teclado
Console.WriteLine(p.Preco);   // 150`,
        caption: 'A declaração vai fora da classe, no nível do arquivo.',
      },
      {
        kind: 'text',
        body:
          'Essa linha gera bem mais do que aparenta. Você ganha as propriedades, um `ToString` legível e a igualdade por conteúdo — tudo sem escrever nada.',
      },
      {
        kind: 'output',
        code: `Produto { Nome = Teclado, Preco = 150 }`,
        caption: 'O `ToString` automático de um `record`, útil para depuração.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Tupla',
          code: `var p = ("Teclado", 150);

// tipo sem nome
// (string, int)`,
        },
        right: {
          label: 'record',
          code: `var p = new Produto("Teclado", 150);

// tipo com nome
// aparece em mensagens de erro`,
        },
        note: 'Os dois comparam por conteúdo. A diferença é ter ou não um nome no programa.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A vantagem prática do nome é o compilador. Uma `(string, int)` de produto e uma `(string, int)` de pessoa são o **mesmo tipo**, e trocar uma pela outra passa despercebido. Um `Produto` e uma `Pessoa` são tipos diferentes, e a troca vira erro de compilação.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um `record` é **imutável** por padrão: `p.Preco = 200` não compila. Para obter um valor alterado, cria-se uma cópia com a mudança. Isso é uma vantagem para dados, e a Seção 5 mostra quando ela atrapalha.',
      },
      {
        kind: 'text',
        body:
          'Esta lição apresenta só a forma posicional, que é a que substitui uma tupla. `record` e classes têm bem mais recursos, e eles são o assunto das Seções 5 e 6.',
      },
    ],
    quiz: [
      {
        id: 's03c06l08q1',
        type: 'multiple',
        prompt: 'O que `record Produto(string Nome, int Preco);` gera automaticamente?',
        options: [
          { id: 'a', text: 'Propriedades `Nome` e `Preco`.', correct: true },
          { id: 'b', text: 'Um `ToString` legível.', correct: true },
          { id: 'c', text: 'Igualdade por conteúdo.', correct: true },
          { id: 'd', text: 'Métodos para salvar em arquivo.' },
        ],
        explanation:
          'Persistência não tem nada a ver com `record`. As outras três vêm de graça, e é isso que torna a declaração de uma linha tão produtiva.',
      },
      {
        id: 's03c06l08q2',
        type: 'single',
        prompt: 'Qual é a vantagem principal de um `record` sobre uma tupla equivalente?',
        options: [
          { id: 'a', text: 'O tipo tem nome, então o compilador impede confundi-lo com outro de mesma forma.', correct: true },
          { id: 'b', text: 'Ele é mais rápido.' },
          { id: 'c', text: 'Ele aceita mais elementos.' },
          { id: 'd', text: 'Ele pode ser usado como chave de dicionário.' },
        ],
        explanation:
          'Tuplas também servem como chave e comparam por conteúdo. O que só o `record` traz é a identidade de tipo, que transforma um erro de troca em erro de compilação.',
      },
      {
        id: 's03c06l08q3',
        type: 'single',
        prompt: 'O que acontece ao tentar `p.Preco = 200;` em um `record` posicional?',
        options: [
          { id: 'a', text: 'Não compila: as propriedades são somente leitura.', correct: true },
          { id: 'b', text: 'Compila e altera o valor.' },
          { id: 'c', text: 'Compila e cria uma cópia automaticamente.' },
          { id: 'd', text: 'Lança exceção em tempo de execução.' },
        ],
        explanation:
          'A imutabilidade é o padrão do `record` posicional. Para um valor diferente, cria-se uma instância nova — o que evita que um objeto compartilhado mude sem que quem o guardou perceba.',
      },
    ],
    challenge: {
      brief:
        'Declare um `record Produto` com nome e preço. Leia um inteiro `n` maior ou igual a 2 e depois `n` produtos, cada um em duas linhas. Mostre cada produto usando o `ToString` automático, some os preços, e informe se os dois primeiros produtos são iguais.',
      requirements: [
        'Uma linha por produto, no formato exato do `ToString` gerado: `Produto { Nome = Teclado, Preco = 150 }`',
        'Depois: `Total: t`, somando os preços',
        'Por último: `Primeiro igual ao segundo: True` ou `False`',
        'Declare o `record` fora da classe `Program`',
        'Use `==` para comparar os dois primeiros produtos, não os campos separadamente',
      ],
      starterCode: `using System;
using System.Collections.Generic;

record Produto(string Nome, int Preco);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Produto> produtos = new List<Produto>();

        // Leia os n produtos e guarde na lista

        // Imprima cada um, some, e compare os dois primeiros
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

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

        int total = 0;

        foreach (Produto p in produtos)
        {
            Console.WriteLine(p);
            total += p.Preco;
        }

        Console.WriteLine($"Total: {total}");
        Console.WriteLine($"Primeiro igual ao segundo: {produtos[0] == produtos[1]}");
    }
}
`,
      hints: [
        '`Console.WriteLine(p)` já usa o `ToString` do `record`: não é preciso montar o texto à mão.',
        'A comparação `produtos[0] == produtos[1]` checa nome e preço de uma vez, porque `record` compara por conteúdo.',
      ],
      tests: [
        {
          name: 'Dois produtos diferentes',
          stdin: '2\nTeclado\n150\nMouse\n80\n',
          expectedStdout:
            'Produto { Nome = Teclado, Preco = 150 }\nProduto { Nome = Mouse, Preco = 80 }\n' +
            'Total: 230\nPrimeiro igual ao segundo: False',
        },
        {
          name: 'Dois produtos com o mesmo conteúdo',
          stdin: '2\nA\n10\nA\n10\n',
          expectedStdout:
            'Produto { Nome = A, Preco = 10 }\nProduto { Nome = A, Preco = 10 }\n' +
            'Total: 20\nPrimeiro igual ao segundo: True',
        },
        {
          name: 'Três produtos',
          stdin: '3\nX\n1\nY\n2\nZ\n3\n',
          expectedStdout:
            'Produto { Nome = X, Preco = 1 }\nProduto { Nome = Y, Preco = 2 }\nProduto { Nome = Z, Preco = 3 }\n' +
            'Total: 6\nPrimeiro igual ao segundo: False',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c06l09',
    title: 'Prática: ranking com empate',
    objective: 'Atribuir colocações compartilhadas a competidores empatados, seguindo a regra oficial de competição.',
    concept: [
      {
        kind: 'text',
        body:
          'Na lição de ordenação, cada competidor recebeu uma colocação diferente. Em uma competição de verdade, quem **empata em pontos compartilha a colocação** — e a próxima colocação pula os lugares ocupados.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Numeração simples',
          code: `1. Bruno  90
2. Ana    80
3. Carlos 80
4. Diego  70`,
        },
        right: {
          label: 'Colocação de competição',
          code: `1. Bruno  90
2. Ana    80
2. Carlos 80
4. Diego  70`,
        },
        note: 'Dois segundos lugares, e nenhum terceiro: a colocação 3 foi consumida pelo empate.',
      },
      {
        kind: 'text',
        body:
          'A regra que produz isso é simples: a colocação de um competidor é a **posição dele na lista ordenada**, exceto quando ele empata com o anterior — e aí ele herda a colocação daquele.',
      },
      {
        kind: 'code',
        code: `if (i == 0 || pontos != pontosAnteriores)
{
    colocacao = i + 1;      // posicao na lista
}
// senao: mantem a colocacao anterior

Console.WriteLine($"{colocacao}. {nome} {pontos}");`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A colocação "pular" não é escolha do algoritmo: ela cai sozinha do `i + 1`. Depois de dois segundos lugares, o próximo competidor está no índice 3, e `3 + 1` é 4. Nenhuma linha de código trata isso explicitamente.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O desempate por nome continua valendo **dentro** de cada grupo de empatados, mesmo eles compartilhando a colocação. Ana aparece antes de Carlos porque a lista está ordenada, e não porque a colocação diz algo sobre isso.',
      },
      {
        kind: 'text',
        body:
          'Contar quantas colocações foram efetivamente usadas e quantos grupos tiveram empate exige comparar cada competidor com o anterior — e um acerto final, depois do laço, para fechar o último grupo.',
      },
    ],
    quiz: [
      {
        id: 's03c06l09q1',
        type: 'single',
        prompt: 'Com pontuações `90, 80, 80, 70`, quais colocações são atribuídas?',
        options: [
          { id: 'a', code: '1, 2, 2, 4', correct: true },
          { id: 'b', code: '1, 2, 2, 3' },
          { id: 'c', code: '1, 2, 3, 4' },
          { id: 'd', code: '1, 2, 2, 5' },
        ],
        explanation:
          'Os dois empatados ocupam as posições 2 e 3 da lista, então a colocação 3 desaparece. O quarto competidor está no índice 3 e recebe `3 + 1`.',
      },
      {
        id: 's03c06l09q2',
        type: 'single',
        prompt: 'Como o algoritmo faz a colocação "pular" depois de um empate?',
        options: [
          { id: 'a', text: 'Naturalmente: a nova colocação é `i + 1`, e o índice já avançou.', correct: true },
          { id: 'b', text: 'Somando o número de empatados à colocação anterior.' },
          { id: 'c', text: 'Com um contador separado de colocações puladas.' },
          { id: 'd', text: 'Não pula: a colocação é sempre sequencial.' },
        ],
        explanation:
          'Usar a posição na lista em vez de um contador próprio faz o salto acontecer sozinho. Qualquer tentativa de "contar as colocações" complicaria o que já estava resolvido.',
      },
      {
        id: 's03c06l09q3',
        type: 'single',
        prompt: 'Por que é preciso um acerto depois do laço para contar os grupos de empate?',
        options: [
          { id: 'a', text: 'Porque o último grupo nunca é encerrado por uma pontuação diferente.', correct: true },
          { id: 'b', text: 'Porque a lista pode estar vazia.' },
          { id: 'c', text: 'Porque o `Sort` não é estável.' },
          { id: 'd', text: 'Não é preciso.' },
        ],
        explanation:
          'É o mesmo problema da maior sequência repetida da Seção 2: o grupo em andamento quando os dados acabam precisa ser fechado fora do laço.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e depois `n` competidores, cada um em duas linhas: nome e pontuação. Produza a classificação de competição, em que empates compartilham a colocação e a seguinte pula os lugares ocupados.',
      requirements: [
        'Uma linha por competidor, no formato `2. Ana 80`',
        'Ordem decrescente de pontuação, desempatando por nome em ordem crescente',
        'Competidores com a mesma pontuação recebem a **mesma** colocação',
        'A colocação seguinte a um empate pula os lugares consumidos: `1, 2, 2, 4`',
        'Depois: `Posicoes usadas: p`, quantas colocações distintas apareceram',
        'Por último: `Empates: e`, quantas colocações foram compartilhadas por mais de um competidor',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<(int Chave, string Nome)> lista = new List<(int Chave, string Nome)>();

        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int pontos = int.Parse(Console.ReadLine());
            lista.Add((-pontos, nome));
        }

        lista.Sort();

        // Colocacao = i + 1, exceto quando empata com o anterior

        int posicoesUsadas = 0;
        int empates = 0;

        Console.WriteLine($"Posicoes usadas: {posicoesUsadas}");
        Console.WriteLine($"Empates: {empates}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<(int Chave, string Nome)> lista = new List<(int Chave, string Nome)>();

        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int pontos = int.Parse(Console.ReadLine());
            lista.Add((-pontos, nome));
        }

        lista.Sort();

        int posicoesUsadas = 0;
        int empates = 0;
        int colocacao = 0;
        int pontosAnteriores = 0;
        int noGrupo = 0;

        for (int i = 0; i < lista.Count; i++)
        {
            var (chave, nome) = lista[i];
            int pontos = -chave;

            if (i == 0 || pontos != pontosAnteriores)
            {
                if (noGrupo > 1)
                {
                    empates++;
                }

                colocacao = i + 1;
                posicoesUsadas++;
                noGrupo = 1;
            }
            else
            {
                noGrupo++;
            }

            pontosAnteriores = pontos;
            Console.WriteLine($"{colocacao}. {nome} {pontos}");
        }

        if (noGrupo > 1)
        {
            empates++;
        }

        Console.WriteLine($"Posicoes usadas: {posicoesUsadas}");
        Console.WriteLine($"Empates: {empates}");
    }
}
`,
      hints: [
        'A colocação só muda quando a pontuação difere da anterior; nesse momento ela vira `i + 1`.',
        'O contador do grupo atual precisa ser conferido uma última vez **depois** do laço, para fechar o grupo final.',
      ],
      tests: [
        {
          name: 'Um empate no meio',
          stdin: '4\nAna\n80\nBruno\n90\nCarlos\n80\nDiego\n70\n',
          expectedStdout:
            '1. Bruno 90\n2. Ana 80\n2. Carlos 80\n4. Diego 70\nPosicoes usadas: 3\nEmpates: 1',
        },
        {
          name: 'Todos empatados',
          stdin: '3\nA\n50\nB\n50\nC\n50\n',
          expectedStdout:
            '1. A 50\n1. B 50\n1. C 50\nPosicoes usadas: 1\nEmpates: 1',
        },
        {
          name: 'Nenhum empate',
          stdin: '2\nA\n20\nB\n10\n',
          expectedStdout: '1. A 20\n2. B 10\nPosicoes usadas: 2\nEmpates: 0',
        },
        {
          name: 'Um competidor só',
          stdin: '1\nSolo\n5\n',
          expectedStdout: '1. Solo 5\nPosicoes usadas: 1\nEmpates: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c06l10',
    title: 'Checkpoint: agrupando dados',
    objective: 'Agregar dois valores por chave em uma tupla e produzir um ranking ordenado por múltiplos critérios.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint junta o capítulo de dicionários com o de tuplas. O agrupamento precisa acumular **duas** coisas por vendedor — quantidade de vendas e valor total —, e a tupla é o que permite guardar as duas em um dicionário só.',
      },
      {
        kind: 'code',
        code: `Dictionary<string, (int Vendas, int Total)> resumo =
    new Dictionary<string, (int Vendas, int Total)>();

if (resumo.TryGetValue(vendedor, out var atual))
{
    resumo[vendedor] = (atual.Vendas + 1, atual.Total + valor);
}
else
{
    resumo[vendedor] = (1, valor);
}`,
        caption: 'A tupla como **valor** do dicionário: dois acumuladores sob uma chave.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Dois dicionários',
          code: `contagem[v] = ...;
totais[v] = ...;
// duas estruturas para
// manter em sincronia`,
        },
        right: {
          label: 'Um dicionário de tuplas',
          code: `resumo[v] = (vendas, total);
// impossivel uma
// dessincronizar da outra`,
        },
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Manter dois dicionários paralelos funciona, mas cria a possibilidade de eles discordarem — uma chave presente em um e ausente no outro. A tupla elimina essa classe inteira de bug, porque os dois valores nascem e morrem juntos.',
      },
      {
        kind: 'text',
        body:
          'Três estruturas convivem aqui, cada uma com um papel: o dicionário agrega por vendedor, um `HashSet` conta os produtos distintos, e uma lista de tuplas ordena o resultado final.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Como uma tupla é tipo por valor, `atual.Vendas + 1` **não** altera o que está no dicionário: é preciso gravar a tupla nova de volta. Isso é o oposto do dicionário de listas, em que o `Add` na lista já modificava o conteúdo guardado.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Monte em três etapas: primeiro só a agregação e a contagem de produtos; depois a lista ordenada; e por último o relatório. As duas semânticas de valor e referência convivendo no mesmo programa são o que mais confunde aqui.',
      },
    ],
    quiz: [
      {
        id: 's03c06l10q1',
        type: 'single',
        prompt: 'Por que um dicionário de tuplas é melhor que dois dicionários paralelos?',
        options: [
          { id: 'a', text: 'Porque os dois valores ficam sempre em sincronia por construção.', correct: true },
          { id: 'b', text: 'Porque ocupa menos memória.' },
          { id: 'c', text: 'Porque a busca é mais rápida.' },
          { id: 'd', text: 'Porque tuplas aceitam chaves repetidas.' },
        ],
        explanation:
          'Com dois dicionários, nada impede que uma chave exista em um e não no outro. Com a tupla, os dois valores são gravados na mesma operação.',
      },
      {
        id: 's03c06l10q2',
        type: 'single',
        prompt: 'Por que é preciso gravar a tupla de volta no dicionário depois de somar?',
        options: [
          { id: 'a', text: 'Porque tuplas são tipos por valor: a variável é uma cópia.', correct: true },
          { id: 'b', text: 'Porque o dicionário é somente leitura.' },
          { id: 'c', text: 'Porque `TryGetValue` remove a entrada.' },
          { id: 'd', text: 'Não é preciso: a alteração é automática.' },
        ],
        explanation:
          'É a diferença exata em relação ao dicionário de listas, onde a variável apontava para a lista guardada e o `Add` já surtia efeito. Aqui, sem regravar, a soma se perde.',
      },
      {
        id: 's03c06l10q3',
        type: 'single',
        prompt: 'Qual estrutura conta os produtos distintos vendidos?',
        options: [
          { id: 'a', code: 'HashSet<string>', correct: true },
          { id: 'b', code: 'List<string>' },
          { id: 'c', code: 'Dictionary<string, int>' },
          { id: 'd', text: 'O próprio dicionário de vendedores.' },
        ],
        explanation:
          'A pergunta é "quantos distintos", sem contagem nem ordem. O `HashSet` responde isso pelo `Count`, e o `Add` já descarta as repetições.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e depois `n` vendas, cada uma em três linhas: vendedor, produto e valor. Agrupe por vendedor acumulando a quantidade de vendas e o valor total, e produza o ranking por total decrescente, desempatando por nome.',
      requirements: [
        'Uma linha por vendedor, no formato `1. Ana -> vendas: 3, total: 300`',
        'A colocação é sequencial, começando em 1',
        'Ordem decrescente de total, desempatando por nome em ordem crescente',
        'Depois: `Vendedores: v`',
        'Depois: `Total geral: t`',
        'Por último: `Produtos distintos: p`, contando os nomes de produto distintos em todas as vendas',
        'Use um `Dictionary<string, (int, int)>` para a agregação',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, (int Vendas, int Total)> resumo =
            new Dictionary<string, (int Vendas, int Total)>();

        HashSet<string> produtos = new HashSet<string>();

        // Agregue as n vendas por vendedor

        // Monte a lista ordenada e imprima o ranking
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, (int Vendas, int Total)> resumo =
            new Dictionary<string, (int Vendas, int Total)>();

        HashSet<string> produtos = new HashSet<string>();

        int totalGeral = 0;

        for (int i = 0; i < n; i++)
        {
            string vendedor = Console.ReadLine();
            string produto = Console.ReadLine();
            int valor = int.Parse(Console.ReadLine());

            produtos.Add(produto);
            totalGeral += valor;

            if (resumo.TryGetValue(vendedor, out var atual))
            {
                resumo[vendedor] = (atual.Vendas + 1, atual.Total + valor);
            }
            else
            {
                resumo[vendedor] = (1, valor);
            }
        }

        List<(int Chave, string Nome)> ranking = new List<(int Chave, string Nome)>();

        foreach (KeyValuePair<string, (int Vendas, int Total)> par in resumo)
        {
            ranking.Add((-par.Value.Total, par.Key));
        }

        ranking.Sort();

        for (int i = 0; i < ranking.Count; i++)
        {
            var (chave, nome) = ranking[i];
            var dados = resumo[nome];

            Console.WriteLine($"{i + 1}. {nome} -> vendas: {dados.Vendas}, total: {dados.Total}");
        }

        Console.WriteLine($"Vendedores: {resumo.Count}");
        Console.WriteLine($"Total geral: {totalGeral}");
        Console.WriteLine($"Produtos distintos: {produtos.Count}");
    }
}
`,
      hints: [
        'A agregação lê a tupla atual, soma, e **grava a tupla nova de volta** — sem isso a soma não persiste.',
        'Para ordenar, monte uma lista de `(-total, nome)` a partir do dicionário e chame `Sort()` uma vez.',
      ],
      tests: [
        {
          name: 'Cinco vendas, dois vendedores',
          stdin: '5\nAna\nTeclado\n100\nBruno\nMouse\n150\nAna\nMouse\n100\nBruno\nTeclado\n100\nAna\nMonitor\n100\n',
          expectedStdout:
            '1. Ana -> vendas: 3, total: 300\n2. Bruno -> vendas: 2, total: 250\n' +
            'Vendedores: 2\nTotal geral: 550\nProdutos distintos: 3',
        },
        {
          name: 'Empate no total desempatado por nome',
          stdin: '2\nB\ny\n50\nA\nx\n50\n',
          expectedStdout:
            '1. A -> vendas: 1, total: 50\n2. B -> vendas: 1, total: 50\n' +
            'Vendedores: 2\nTotal geral: 100\nProdutos distintos: 2',
        },
        {
          name: 'Mesmo produto para vendedores diferentes',
          stdin: '3\nA\nx\n10\nB\nx\n20\nA\nx\n30\n',
          expectedStdout:
            '1. A -> vendas: 2, total: 40\n2. B -> vendas: 1, total: 20\n' +
            'Vendedores: 2\nTotal geral: 60\nProdutos distintos: 1',
        },
        {
          name: 'Uma venda só',
          stdin: '1\nSolo\nItem\n42\n',
          expectedStdout:
            '1. Solo -> vendas: 1, total: 42\nVendedores: 1\nTotal geral: 42\nProdutos distintos: 1',
          hidden: true,
        },
      ],
    },
  },
]
