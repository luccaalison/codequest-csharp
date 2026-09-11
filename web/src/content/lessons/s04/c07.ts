import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's04c07l01',
    title: 'Pensando em pipeline',
    objective: 'Decompor um problema de dados em etapas encadeadas, escrevendo cada uma como uma transformação.',
    concept: [
      {
        kind: 'text',
        body:
          'Um problema de dados quase sempre se resolve como uma **sequência de transformações**. Descrever essas etapas em português antes de escrever o código é a parte que evita a maioria dos erros.',
      },
      {
        kind: 'output',
        code: `"os 3 produtos mais caros da categoria eletronicos, com nome em maiuscula"

1. filtrar   -> categoria == "eletronicos"
2. ordenar   -> por preco, decrescente
3. recortar  -> os 3 primeiros
4. projetar  -> nome em maiuscula`,
        caption: 'Cada linha vira um operador, na mesma ordem.',
      },
      {
        kind: 'code',
        code: `var resultado = produtos
    .Where(p => p.Categoria == "eletronicos")
    .OrderByDescending(p => p.Preco)
    .Take(3)
    .Select(p => p.Nome.ToUpper());`,
      },
      {
        kind: 'table',
        headers: ['Verbo do enunciado', 'Operador'],
        rows: [
          ['apenas, com, que tenham', '`Where`'],
          ['em ordem de, do maior', '`OrderBy`, `OrderByDescending`'],
          ['os N primeiros, top N', '`Take`'],
          ['por categoria, por cliente', '`GroupBy`'],
          ['quantos, total, média', '`Count`, `Sum`, `Average`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A ordem das etapas em português é quase sempre a ordem correta dos operadores. Quando você se pega tentando decidir onde encaixar um operador, é sinal de que a descrição em português ainda não está clara.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Duas etapas costumam ser esquecidas na descrição e causam erro: **ordenar antes de recortar** — sem isso, "os 3 maiores" viram "3 quaisquer" — e **filtrar antes de agregar**, que muda completamente o valor de uma média.',
      },
      {
        kind: 'text',
        body:
          'Este capítulo é sobre construir esses pipelines com intenção: escolher os operadores certos, na ordem certa, e saber quando o laço ainda é a melhor escolha.',
      },
    ],
    quiz: [
      {
        id: 's04c07l01q1',
        type: 'single',
        prompt: 'Qual é a ordem correta para "os 3 clientes que mais gastaram"?',
        options: [
          { id: 'a', text: 'Agrupar, somar, ordenar decrescente, recortar 3.', correct: true },
          { id: 'b', text: 'Recortar 3, agrupar, somar, ordenar.' },
          { id: 'c', text: 'Ordenar, recortar 3, agrupar, somar.' },
          { id: 'd', text: 'Somar, recortar 3, agrupar, ordenar.' },
        ],
        explanation:
          'O total por cliente só existe depois do agrupamento, e ordenar por ele exige que ele já esteja calculado. Recortar antes de ordenar pegaria três clientes quaisquer.',
      },
      {
        id: 's04c07l01q2',
        type: 'single',
        prompt: 'Qual etapa costuma ser esquecida ao pedir "os N maiores"?',
        options: [
          { id: 'a', text: 'Ordenar antes de recortar.', correct: true },
          { id: 'b', text: 'Remover duplicatas.' },
          { id: 'c', text: 'Materializar com `ToList`.' },
          { id: 'd', text: 'Agrupar.' },
        ],
        explanation:
          'Sem a ordenação, `Take(3)` devolve os três primeiros da coleção — que não têm nenhuma relação com os maiores.',
      },
      {
        id: 's04c07l01q3',
        type: 'single',
        prompt: 'Por que descrever o pipeline em português antes de codar?',
        options: [
          { id: 'a', text: 'Porque a ordem das etapas em português costuma ser a ordem correta dos operadores.', correct: true },
          { id: 'b', text: 'Porque o compilador exige comentários.' },
          { id: 'c', text: 'Para escolher entre LINQ e laço.' },
          { id: 'd', text: 'Para calcular o desempenho.' },
        ],
        explanation:
          'É o "entrada, processamento, saída" da Seção 1 aplicado a coleções. Uma descrição confusa quase sempre vira um pipeline errado.',
      },
    ],
    challenge: {
      brief:
        'Traduza quatro enunciados em pipelines LINQ, cada um exigindo uma combinação diferente de operadores na ordem certa.',
      requirements: [
        'Declare um `record Produto(string Nome, string Categoria, int Preco)` fora da classe',
        'Leia `n` produtos, cada um em três linhas',
        'Linha 1: `Top 3 eletronicos: A B C`, os nomes em maiúscula dos três mais caros da categoria `eletronicos`, do maior para o menor',
        'Linha 2: `Baratos ordenados: a b c`, os nomes dos produtos com preço abaixo de 100, em ordem alfabética',
        'Linha 3: `Categorias: x y`, em ordem alfabética e sem repetição',
        'Linha 4: `Media eletronicos: X` com duas casas, ou `indefinida`',
        'Linha 5: `Mais caro geral: nome`',
        'Em empate de preço, vale o produto lido primeiro',
        'A entrada sempre tem pelo menos um produto',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

record Produto(string Nome, string Categoria, int Preco);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Produto> produtos = new List<Produto>();
        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            string categoria = Console.ReadLine();
            int preco = int.Parse(Console.ReadLine());
            produtos.Add(new Produto(nome, categoria, preco));
        }

        // Quatro pipelines, cada um com a ordem certa
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Produto(string Nome, string Categoria, int Preco);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Produto> produtos = new List<Produto>();
        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            string categoria = Console.ReadLine();
            int preco = int.Parse(Console.ReadLine());
            produtos.Add(new Produto(nome, categoria, preco));
        }

        var top3 = produtos
            .Where(p => p.Categoria == "eletronicos")
            .OrderByDescending(p => p.Preco)
            .Take(3)
            .Select(p => p.Nome.ToUpper());

        Console.WriteLine($"Top 3 eletronicos: {string.Join(" ", top3)}");

        var baratos = produtos
            .Where(p => p.Preco < 100)
            .OrderBy(p => p.Nome)
            .Select(p => p.Nome);

        Console.WriteLine($"Baratos ordenados: {string.Join(" ", baratos)}");

        var categorias = produtos.Select(p => p.Categoria).Distinct().OrderBy(c => c);
        Console.WriteLine($"Categorias: {string.Join(" ", categorias)}");

        var eletronicos = produtos.Where(p => p.Categoria == "eletronicos");

        if (eletronicos.Any())
        {
            Console.WriteLine($"Media eletronicos: {eletronicos.Average(p => p.Preco):F2}");
        }
        else
        {
            Console.WriteLine("Media eletronicos: indefinida");
        }

        Console.WriteLine($"Mais caro geral: {produtos.MaxBy(p => p.Preco).Nome}");
    }
}
`,
      hints: [
        'No primeiro pipeline, o `OrderByDescending` precisa vir antes do `Take`.',
        'A média dos eletrônicos precisa de guarda `Any()`: pode não haver nenhum produto dessa categoria.',
      ],
      tests: [
        {
          name: 'Produtos de várias categorias',
          stdin: '5\nTeclado\neletronicos\n150\nCaderno\npapelaria\n20\nMonitor\neletronicos\n500\nCaneta\npapelaria\n5\nMouse\neletronicos\n80\n',
          expectedStdout:
            'Top 3 eletronicos: MONITOR TECLADO MOUSE\nBaratos ordenados: Caderno Caneta Mouse\n' +
            'Categorias: eletronicos papelaria\nMedia eletronicos: 243.33\nMais caro geral: Monitor',
        },
        {
          name: 'Nenhum eletrônico',
          stdin: '2\nA\nlivros\n50\nB\nlivros\n200\n',
          expectedStdout:
            'Top 3 eletronicos:\nBaratos ordenados: A\nCategorias: livros\n' +
            'Media eletronicos: indefinida\nMais caro geral: B',
        },
        {
          name: 'Um produto só',
          stdin: '1\nSolo\neletronicos\n99\n',
          expectedStdout:
            'Top 3 eletronicos: SOLO\nBaratos ordenados: Solo\nCategorias: eletronicos\n' +
            'Media eletronicos: 99.00\nMais caro geral: Solo',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c07l02',
    title: 'Refatorando laços para LINQ',
    objective: 'Reconhecer padrões de laço que têm operador equivalente e fazer a tradução com segurança.',
    concept: [
      {
        kind: 'text',
        body:
          'A maioria dos laços que você escreveu nas Seções 2 e 3 tem uma tradução direta para LINQ. Reconhecer o padrão é o que torna a refatoração mecânica em vez de arriscada.',
      },
      {
        kind: 'table',
        headers: ['Padrão do laço', 'Operador'],
        rows: [
          ['acumula em uma lista com `if`', '`Where`'],
          ['acumula transformando cada item', '`Select`'],
          ['soma ou conta em um acumulador', '`Sum`, `Count`'],
          ['guarda o maior visto até agora', '`Max`, `MaxBy`'],
          ['flag "achou algum"', '`Any`'],
          ['flag "todos passaram"', '`All`'],
          ['dicionário de contagem', '`GroupBy` + `Count`'],
        ],
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Laço',
          code: `int soma = 0;

foreach (var p in produtos)
{
    if (p.Ativo)
    {
        soma += p.Preco;
    }
}`,
        },
        right: {
          label: 'LINQ',
          code: `int soma = produtos
    .Where(p => p.Ativo)
    .Sum(p => p.Preco);`,
        },
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A refatoração é segura porque **não muda o comportamento**: se os testes passavam antes, eles continuam passando. É a mesma garantia da extração de método do capítulo 1.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um laço que faz **duas coisas** — soma e conta ao mesmo tempo — não tem tradução direta. Ou você o quebra em duas consultas, o que percorre os dados duas vezes, ou mantém o laço. Nem toda refatoração compensa.',
      },
      {
        kind: 'text',
        body:
          'O ganho principal é de leitura: `produtos.Where(p => p.Ativo).Sum(p => p.Preco)` diz o que calcula em uma linha, enquanto o laço exige ler seis linhas para reconstruir a mesma intenção.',
      },
    ],
    quiz: [
      {
        id: 's04c07l02q1',
        type: 'single',
        prompt: 'Qual operador substitui um laço que acumula itens em uma lista com um `if`?',
        options: [
          { id: 'a', code: 'Where', correct: true },
          { id: 'b', code: 'Select' },
          { id: 'c', code: 'Aggregate' },
          { id: 'd', code: 'GroupBy' },
        ],
        explanation:
          'Filtrar é exatamente o que esse laço faz. Se ele também transformasse o item antes de adicionar, seria `Where` seguido de `Select`.',
      },
      {
        id: 's04c07l02q2',
        type: 'single',
        prompt: 'Por que a refatoração de laço para LINQ é segura?',
        options: [
          { id: 'a', text: 'Porque o comportamento não muda, então os testes existentes continuam válidos.', correct: true },
          { id: 'b', text: 'Porque o compilador verifica a equivalência.' },
          { id: 'c', text: 'Porque LINQ não pode ter bugs.' },
          { id: 'd', text: 'Porque o resultado é sempre ordenado.' },
        ],
        explanation:
          'Refatorar é mudar a estrutura preservando o comportamento. Testes que passavam e continuam passando são a evidência de que a tradução está correta.',
      },
      {
        id: 's04c07l02q3',
        type: 'single',
        prompt: 'Quando um laço **não** deve ser traduzido?',
        options: [
          { id: 'a', text: 'Quando ele calcula várias coisas ao mesmo tempo em uma passada.', correct: true },
          { id: 'b', text: 'Quando a coleção é grande.' },
          { id: 'c', text: 'Quando ele tem um `if`.' },
          { id: 'd', text: 'Quando ele usa `foreach`.' },
        ],
        explanation:
          'Quebrar uma passada em três consultas percorre os dados três vezes. Quando isso importa, o laço com vários acumuladores continua sendo a escolha certa.',
      },
    ],
    challenge: {
      brief:
        'Refatore quatro laços para LINQ e prove que os resultados são idênticos, calculando cada valor das duas formas.',
      requirements: [
        'Leia `n` valores para uma `List<int>`',
        'Linha 1: `Soma dos pares - laco: X, linq: X, iguais: True`',
        'Linha 2: `Maior - laco: Y, linq: Y, iguais: True`',
        'Linha 3: `Tem negativo - laco: True/False, linq: idem, iguais: True`',
        'Linha 4: `Quadrados - laco: 1 4 9, linq: 1 4 9, iguais: True`',
        'Cada valor precisa ser calculado com laço **e** com LINQ, e os dois comparados',
        'A entrada sempre tem pelo menos um valor',
        'A comparação das sequências pode usar `SequenceEqual`',
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

        // Calcule cada resultado das duas formas e compare
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

        int somaLaco = 0;
        foreach (int x in numeros)
        {
            if (x % 2 == 0)
            {
                somaLaco += x;
            }
        }

        int somaLinq = numeros.Where(x => x % 2 == 0).Sum();

        Console.WriteLine(
            $"Soma dos pares - laco: {somaLaco}, linq: {somaLinq}, iguais: {somaLaco == somaLinq}");

        int maiorLaco = numeros[0];
        foreach (int x in numeros)
        {
            if (x > maiorLaco)
            {
                maiorLaco = x;
            }
        }

        int maiorLinq = numeros.Max();

        Console.WriteLine(
            $"Maior - laco: {maiorLaco}, linq: {maiorLinq}, iguais: {maiorLaco == maiorLinq}");

        bool negativoLaco = false;
        foreach (int x in numeros)
        {
            if (x < 0)
            {
                negativoLaco = true;
            }
        }

        bool negativoLinq = numeros.Any(x => x < 0);

        Console.WriteLine(
            $"Tem negativo - laco: {negativoLaco}, linq: {negativoLinq}, iguais: {negativoLaco == negativoLinq}");

        List<int> quadradosLaco = new List<int>();
        foreach (int x in numeros)
        {
            quadradosLaco.Add(x * x);
        }

        List<int> quadradosLinq = numeros.Select(x => x * x).ToList();

        Console.WriteLine(
            $"Quadrados - laco: {string.Join(" ", quadradosLaco)}, " +
            $"linq: {string.Join(" ", quadradosLinq)}, " +
            $"iguais: {quadradosLaco.SequenceEqual(quadradosLinq)}");
    }
}
`,
      hints: [
        'O laço do maior precisa começar em `numeros[0]`, não em zero — a coleção pode ser toda negativa.',
        '`SequenceEqual` compara duas listas elemento a elemento e devolve um `bool`.',
      ],
      tests: [
        {
          name: 'Valores variados',
          stdin: '4\n1\n2\n3\n4\n',
          expectedStdout:
            'Soma dos pares - laco: 6, linq: 6, iguais: True\nMaior - laco: 4, linq: 4, iguais: True\n' +
            'Tem negativo - laco: False, linq: False, iguais: True\n' +
            'Quadrados - laco: 1 4 9 16, linq: 1 4 9 16, iguais: True',
        },
        {
          name: 'Todos negativos',
          stdin: '3\n-2\n-3\n-4\n',
          expectedStdout:
            'Soma dos pares - laco: -6, linq: -6, iguais: True\nMaior - laco: -2, linq: -2, iguais: True\n' +
            'Tem negativo - laco: True, linq: True, iguais: True\n' +
            'Quadrados - laco: 4 9 16, linq: 4 9 16, iguais: True',
        },
        {
          name: 'Um valor só',
          stdin: '1\n5\n',
          expectedStdout:
            'Soma dos pares - laco: 0, linq: 0, iguais: True\nMaior - laco: 5, linq: 5, iguais: True\n' +
            'Tem negativo - laco: False, linq: False, iguais: True\n' +
            'Quadrados - laco: 25, linq: 25, iguais: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c07l03',
    title: 'Quando NÃO usar LINQ',
    objective: 'Reconhecer as situações em que o laço continua sendo a escolha melhor, apesar de o LINQ funcionar.',
    concept: [
      {
        kind: 'text',
        body:
          'LINQ é excelente para descrever transformações de dados, e ruim para outras coisas. Saber onde ele não ajuda é tão importante quanto saber usá-lo.',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Por que o laço é melhor'],
        rows: [
          ['vários resultados em uma passada', 'LINQ exigiria percorrer várias vezes'],
          ['depende do elemento anterior', 'não há operador para estado entre itens'],
          ['precisa parar no meio por outra razão', '`break` com condição composta é mais claro'],
          ['efeito colateral a cada item', 'LINQ é para transformar, não para agir'],
          ['lógica complexa por item', 'a lambda ficaria ilegível'],
        ],
      },
      {
        kind: 'compare',
        good: `int soma = 0, conta = 0, maior = int.MinValue;

foreach (var x in dados)
{
    soma += x;
    conta++;
    if (x > maior) maior = x;
}`,
        bad: `int soma = dados.Sum();
int conta = dados.Count();
int maior = dados.Max();`,
        goodLabel: 'Uma passada',
        badLabel: 'Três passadas',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A versão com três operadores é mais legível e percorre os dados **três vezes**. Com uma lista pequena, isso é irrelevante e a legibilidade vence. Com uma sequência calculada e cara, o laço volta a ser a escolha certa.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Cálculos que dependem do elemento **anterior** — média móvel, detecção de sequência crescente, diferenças entre valores consecutivos — não têm operador LINQ natural. O laço com estado da Seção 2 continua sendo a solução.',
      },
      {
        kind: 'text',
        body:
          'Um `foreach` com `Console.WriteLine` também é mais honesto que um `Select` que imprime: LINQ descreve transformações, e usar um operador por seu efeito colateral confunde quem lê.',
      },
    ],
    quiz: [
      {
        id: 's04c07l03q1',
        type: 'single',
        prompt: 'Por que um laço pode ser melhor que três operadores LINQ?',
        options: [
          { id: 'a', text: 'Porque calcula tudo em uma passada, em vez de três.', correct: true },
          { id: 'b', text: 'Porque LINQ não calcula somas.' },
          { id: 'c', text: 'Porque laços são sempre mais rápidos.' },
          { id: 'd', text: 'Porque LINQ não funciona com `int`.' },
        ],
        explanation:
          'Cada operador percorre a sequência. Quando a fonte é cara de produzir, repetir o percurso multiplica o custo.',
      },
      {
        id: 's04c07l03q2',
        type: 'single',
        prompt: 'Qual cálculo não tem operador LINQ natural?',
        options: [
          { id: 'a', text: 'Média móvel dos últimos três valores.', correct: true },
          { id: 'b', text: 'Soma dos valores positivos.' },
          { id: 'c', text: 'Contagem de elementos distintos.' },
          { id: 'd', text: 'O maior valor.' },
        ],
        explanation:
          'Ela depende de manter estado entre elementos consecutivos, e os operadores LINQ tratam cada elemento de forma independente.',
      },
      {
        id: 's04c07l03q3',
        type: 'single',
        prompt: 'Por que não usar `Select` para imprimir cada elemento?',
        options: [
          { id: 'a', text: 'Porque `Select` descreve uma transformação, e imprimir é um efeito colateral.', correct: true },
          { id: 'b', text: 'Porque `Select` não aceita `Console.WriteLine`.' },
          { id: 'c', text: 'Porque `Select` é lento.' },
          { id: 'd', text: 'Porque `Select` inverte a ordem.' },
        ],
        explanation:
          'Além de confundir quem lê, há um risco real: por ser diferido, o `Select` só imprimiria se alguém enumerasse o resultado.',
      },
    ],
    challenge: {
      brief:
        'Compare as duas abordagens contando quantas vezes cada uma percorre os dados, e resolva com laço um cálculo que depende do elemento anterior.',
      requirements: [
        'Leia `n` valores para uma `List<int>`',
        'Calcule soma, contagem e maior de duas formas: com um único laço e com três operadores LINQ',
        'Linha 1: `Laco - soma: X, conta: Y, maior: Z, passadas: 1`',
        'Linha 2: `LINQ - soma: X, conta: Y, maior: Z, passadas: 3`',
        'Linha 3: `Iguais: True`',
        'Linha 4: `Diferencas: a b c`, a diferença entre cada valor e o anterior, calculada com laço',
        'Linha 5: `Maior subida: M`, a maior diferença positiva, ou `0` se não houver',
        'As diferenças começam a partir do segundo elemento; com um valor só, a lista sai vazia',
        'A entrada sempre tem pelo menos um valor',
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

        // Uma passada com laco, tres com LINQ, e as diferencas consecutivas
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

        int soma = 0;
        int conta = 0;
        int maior = numeros[0];

        foreach (int x in numeros)
        {
            soma += x;
            conta++;

            if (x > maior)
            {
                maior = x;
            }
        }

        int somaLinq = numeros.Sum();
        int contaLinq = numeros.Count();
        int maiorLinq = numeros.Max();

        Console.WriteLine($"Laco - soma: {soma}, conta: {conta}, maior: {maior}, passadas: 1");
        Console.WriteLine($"LINQ - soma: {somaLinq}, conta: {contaLinq}, maior: {maiorLinq}, passadas: 3");
        Console.WriteLine($"Iguais: {soma == somaLinq && conta == contaLinq && maior == maiorLinq}");

        List<int> diferencas = new List<int>();
        int maiorSubida = 0;

        for (int i = 1; i < numeros.Count; i++)
        {
            int diferenca = numeros[i] - numeros[i - 1];
            diferencas.Add(diferenca);

            if (diferenca > maiorSubida)
            {
                maiorSubida = diferenca;
            }
        }

        Console.WriteLine($"Diferencas: {string.Join(" ", diferencas)}");
        Console.WriteLine($"Maior subida: {maiorSubida}");
    }
}
`,
      hints: [
        'O laço das diferenças começa em `i = 1` e compara com `numeros[i - 1]` — é o padrão de comparar com o anterior da Seção 2.',
        'A maior subida começa em 0, então uma série sempre decrescente devolve 0 corretamente.',
      ],
      tests: [
        {
          name: 'Série crescente e decrescente',
          stdin: '5\n10\n15\n12\n20\n18\n',
          expectedStdout:
            'Laco - soma: 75, conta: 5, maior: 20, passadas: 1\n' +
            'LINQ - soma: 75, conta: 5, maior: 20, passadas: 3\nIguais: True\n' +
            'Diferencas: 5 -3 8 -2\nMaior subida: 8',
        },
        {
          name: 'Série sempre decrescente',
          stdin: '3\n10\n5\n1\n',
          expectedStdout:
            'Laco - soma: 16, conta: 3, maior: 10, passadas: 1\n' +
            'LINQ - soma: 16, conta: 3, maior: 10, passadas: 3\nIguais: True\n' +
            'Diferencas: -5 -4\nMaior subida: 0',
        },
        {
          name: 'Um valor só',
          stdin: '1\n7\n',
          expectedStdout:
            'Laco - soma: 7, conta: 1, maior: 7, passadas: 1\n' +
            'LINQ - soma: 7, conta: 1, maior: 7, passadas: 3\nIguais: True\n' +
            'Diferencas:\nMaior subida: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c07l04',
    title: 'Top N com critério de desempate',
    objective: 'Produzir rankings estáveis, garantindo que empates sejam resolvidos de forma determinística.',
    concept: [
      {
        kind: 'text',
        body:
          'Um ranking sem regra de desempate não é determinístico: dois elementos com o mesmo valor podem aparecer em qualquer ordem, e o "top 3" pode mudar entre execuções.',
      },
      {
        kind: 'code',
        code: `var top3 = jogadores
    .OrderByDescending(j => j.Pontos)
    .ThenBy(j => j.Nome)          // desempate explicito
    .Take(3);`,
        caption: 'Sem o `ThenBy`, dois jogadores com a mesma pontuação ficam em ordem arbitrária.',
      },
      {
        kind: 'text',
        body:
          'Na prática, a ordenação do LINQ é **estável** — empates mantêm a ordem original. Mas depender disso é frágil: a ordem original pode mudar, e a estabilidade não é uma promessa que o enunciado do problema faz.',
      },
      {
        kind: 'table',
        headers: ['Critério de desempate', 'Efeito'],
        rows: [
          ['nenhum', 'depende da ordem de entrada'],
          ['`ThenBy(nome)`', 'alfabético, sempre igual'],
          ['`ThenBy(id)`', 'quem foi cadastrado antes'],
          ['`ThenByDescending(data)`', 'o mais recente primeiro'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma variação comum é o **top N com empates incluídos**: se três jogadores empatam na terceira posição, mostrar todos os cinco em vez de cortar arbitrariamente. Isso exige descobrir o valor de corte primeiro e depois filtrar por ele.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O `Take(3)` corta exatamente três, sem olhar valores. Se o quarto colocado tem a mesma pontuação do terceiro, ele fica de fora — o que pode ser injusto dependendo do contexto.',
      },
      {
        kind: 'text',
        body:
          'A colocação com empate compartilhado — `1, 2, 2, 4` — é a mesma regra de competição da Seção 3. Com LINQ, ela se calcula comparando cada elemento com o anterior depois de ordenar.',
      },
    ],
    quiz: [
      {
        id: 's04c07l04q1',
        type: 'single',
        prompt: 'Por que incluir um critério de desempate explícito?',
        options: [
          { id: 'a', text: 'Para que o resultado não dependa da ordem de entrada dos dados.', correct: true },
          { id: 'b', text: 'Porque `OrderBy` exige dois critérios.' },
          { id: 'c', text: 'Para melhorar o desempenho.' },
          { id: 'd', text: 'Para evitar exceções.' },
        ],
        explanation:
          'Sem ele, reordenar a fonte muda o ranking. Um relatório que muda sem os dados mudarem é difícil de confiar e de testar.',
      },
      {
        id: 's04c07l04q2',
        type: 'single',
        prompt: 'O que acontece com o quarto colocado empatado com o terceiro em um `Take(3)`?',
        options: [
          { id: 'a', text: 'Ele fica de fora, mesmo com a mesma pontuação.', correct: true },
          { id: 'b', text: 'Ele é incluído automaticamente.' },
          { id: 'c', text: 'O `Take` devolve quatro elementos.' },
          { id: 'd', text: 'Lança exceção por ambiguidade.' },
        ],
        explanation:
          '`Take` conta posições, não valores. Incluir os empatados exige descobrir o valor de corte e filtrar por ele.',
      },
      {
        id: 's04c07l04q3',
        type: 'single',
        prompt: 'Como incluir todos os empatados no top N?',
        options: [
          { id: 'a', text: 'Descobrir o valor da N-ésima posição e filtrar todos com valor maior ou igual.', correct: true },
          { id: 'b', text: 'Usar `Take(n + 1)`.' },
          { id: 'c', text: 'Ordenar duas vezes.' },
          { id: 'd', text: 'Não é possível com LINQ.' },
        ],
        explanation:
          'O corte passa a ser por valor, não por posição. `Skip(n - 1).First()` dá o valor da N-ésima posição, e um `Where` completa o trabalho.',
      },
    ],
    challenge: {
      brief:
        'Produza um ranking com desempate determinístico e uma versão que inclui todos os empatados no corte.',
      requirements: [
        'Declare um `record Jogador(string Nome, int Pontos)` fora da classe',
        'Leia `n` jogadores, cada um em duas linhas, e depois o tamanho `k` do top',
        'Linha 1: `Top k: nome1 nome2 nome3`, ordenado por pontos decrescentes e desempatado por nome crescente',
        'Linha 2: `Com empates: nome1 nome2 nome3 nome4`, incluindo todos que empatam com o último colocado do corte',
        'Linha 3: `Corte: X`, a pontuação do k-ésimo colocado',
        'Linha 4: `Incluidos por empate: e`',
        'Linha 5: `Colocacoes: 1 2 2 4`, a colocação de cada jogador do ranking completo, com empates compartilhando posição',
        'Se `k` for maior que a quantidade de jogadores, o corte é a menor pontuação',
        'A entrada sempre tem pelo menos um jogador',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

record Jogador(string Nome, int Pontos);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Jogador> jogadores = new List<Jogador>();
        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int pontos = int.Parse(Console.ReadLine());
            jogadores.Add(new Jogador(nome, pontos));
        }

        int k = int.Parse(Console.ReadLine());

        // Ranking com desempate, corte por valor, e colocacoes
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Jogador(string Nome, int Pontos);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Jogador> jogadores = new List<Jogador>();
        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int pontos = int.Parse(Console.ReadLine());
            jogadores.Add(new Jogador(nome, pontos));
        }

        int k = int.Parse(Console.ReadLine());

        var ordenados = jogadores
            .OrderByDescending(j => j.Pontos)
            .ThenBy(j => j.Nome)
            .ToList();

        var top = ordenados.Take(k).ToList();

        Console.WriteLine($"Top {k}: {string.Join(" ", top.Select(j => j.Nome))}");

        int corte = top.Last().Pontos;

        var comEmpates = ordenados.Where(j => j.Pontos >= corte).ToList();

        Console.WriteLine($"Com empates: {string.Join(" ", comEmpates.Select(j => j.Nome))}");
        Console.WriteLine($"Corte: {corte}");
        Console.WriteLine($"Incluidos por empate: {comEmpates.Count - top.Count}");

        List<int> colocacoes = new List<int>();
        int colocacao = 0;
        int anteriores = 0;

        for (int i = 0; i < ordenados.Count; i++)
        {
            if (i == 0 || ordenados[i].Pontos != anteriores)
            {
                colocacao = i + 1;
            }

            colocacoes.Add(colocacao);
            anteriores = ordenados[i].Pontos;
        }

        Console.WriteLine($"Colocacoes: {string.Join(" ", colocacoes)}");
    }
}
`,
      hints: [
        'O corte é a pontuação do **último** elemento do top: `top.Last().Pontos`.',
        'A colocação só muda quando a pontuação difere da anterior, e vira `i + 1` — a mesma regra da Seção 3.',
      ],
      tests: [
        {
          name: 'Empate no corte',
          stdin: '5\nAna\n100\nBruno\n80\nCarla\n80\nDiego\n60\nElena\n80\n3\n',
          expectedStdout:
            'Top 3: Ana Bruno Carla\nCom empates: Ana Bruno Carla Elena\nCorte: 80\n' +
            'Incluidos por empate: 1\nColocacoes: 1 2 2 2 5',
        },
        {
          name: 'Sem empates',
          stdin: '4\nA\n40\nB\n30\nC\n20\nD\n10\n2\n',
          expectedStdout:
            'Top 2: A B\nCom empates: A B\nCorte: 30\nIncluidos por empate: 0\nColocacoes: 1 2 3 4',
        },
        {
          name: 'k maior que a quantidade',
          stdin: '2\nX\n10\nY\n20\n5\n',
          expectedStdout:
            'Top 5: Y X\nCom empates: Y X\nCorte: 10\nIncluidos por empate: 0\nColocacoes: 1 2',
        },
        {
          name: 'Todos empatados',
          stdin: '3\nC\n50\nA\n50\nB\n50\n1\n',
          expectedStdout:
            'Top 1: A\nCom empates: A B C\nCorte: 50\nIncluidos por empate: 2\nColocacoes: 1 1 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c07l05',
    title: 'Filtros combinados dinamicamente',
    objective: 'Montar critérios de filtragem em tempo de execução, combinando predicados conforme a entrada.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma busca com filtros opcionais — categoria, faixa de preço, disponibilidade — não pode ter os critérios fixos no código. Eles precisam ser montados conforme o que o usuário preencheu.',
      },
      {
        kind: 'text',
        body:
          'A forma mais simples aproveita a **execução diferida**: cada filtro aplicado cria uma consulta nova, e nada é executado até o fim.',
      },
      {
        kind: 'code',
        code: `IEnumerable<Produto> consulta = produtos;

if (categoria != "")
{
    consulta = consulta.Where(p => p.Categoria == categoria);
}

if (precoMaximo > 0)
{
    consulta = consulta.Where(p => p.Preco <= precoMaximo);
}

var resultado = consulta.ToList();   // so aqui executa`,
        caption: 'Cada `if` acrescenta uma etapa ao plano, sem percorrer nada.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Isso só é eficiente por causa da execução diferida. Se cada `Where` percorresse a coleção na hora, três filtros significariam três passadas — aqui, os três são combinados e aplicados em uma só.',
      },
      {
        kind: 'text',
        body:
          'Uma alternativa é acumular predicados em uma lista e combiná-los. Ela é mais explícita e permite contar quantos filtros foram aplicados, mas exige testar todos os predicados para cada elemento.',
      },
      {
        kind: 'code',
        code: `var filtros = new List<Func<Produto, bool>>();

if (categoria != "") filtros.Add(p => p.Categoria == categoria);
if (precoMaximo > 0) filtros.Add(p => p.Preco <= precoMaximo);

var resultado = produtos.Where(p => filtros.All(f => f(p)));`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Cuidado com a captura de variáveis nesse padrão. Se um filtro capturar uma variável de laço que muda depois, ele passa a usar o valor final — a armadilha de closures do capítulo 4, agora dentro de uma consulta.',
      },
      {
        kind: 'text',
        body:
          'Sem nenhum filtro aplicado, a consulta devolve tudo. O `All` sobre uma lista vazia de filtros é `true` para qualquer elemento — a verdade vacuosa, mais uma vez trabalhando a favor.',
      },
    ],
    quiz: [
      {
        id: 's04c07l05q1',
        type: 'single',
        prompt: 'Por que aplicar filtros condicionais em sequência é eficiente?',
        options: [
          { id: 'a', text: 'Porque a execução diferida combina todos e percorre a coleção uma vez só.', correct: true },
          { id: 'b', text: 'Porque `Where` é otimizado para múltiplas chamadas.' },
          { id: 'c', text: 'Porque cada filtro reduz a coleção antes do próximo.' },
          { id: 'd', text: 'Não é eficiente: cada filtro é uma passada.' },
        ],
        explanation:
          'Nenhum `Where` executa ao ser escrito — eles montam um pipeline. A coleção só é percorrida quando o resultado é materializado.',
      },
      {
        id: 's04c07l05q2',
        type: 'single',
        prompt: 'O que acontece quando nenhum filtro é aplicado?',
        options: [
          { id: 'a', text: 'A consulta devolve a coleção inteira.', correct: true },
          { id: 'b', text: 'A consulta devolve vazio.' },
          { id: 'c', text: 'Lança exceção.' },
          { id: 'd', text: 'A consulta devolve `null`.' },
        ],
        explanation:
          'A variável continua apontando para a fonte original. Com a lista de predicados, o `All` vazio devolve `true` para todos — o mesmo resultado.',
      },
      {
        id: 's04c07l05q3',
        type: 'single',
        prompt: 'Qual cuidado é necessário ao guardar predicados em uma lista?',
        options: [
          { id: 'a', text: 'A captura de variáveis: um predicado pode enxergar o valor final, não o do momento.', correct: true },
          { id: 'b', text: 'A lista precisa estar ordenada.' },
          { id: 'c', text: 'Os predicados precisam ser do mesmo tipo de retorno.' },
          { id: 'd', text: 'Não há cuidados especiais.' },
        ],
        explanation:
          'É a armadilha de closures do capítulo 4. Predicados criados dentro de um laço que captura a variável de controle são o caso clássico.',
      },
    ],
    challenge: {
      brief:
        'Implemente uma busca com filtros opcionais, aplicando apenas os que foram preenchidos e reportando quantos foram usados.',
      requirements: [
        'Declare um `record Produto(string Nome, string Categoria, int Preco, bool Disponivel)` fora da classe',
        'Leia `n` produtos, cada um em quatro linhas — a disponibilidade é `1` ou `0`',
        'Depois leia três linhas de filtro: categoria (`-` para nenhum), preço máximo (`0` para nenhum) e disponibilidade (`1`, `0` ou `-`)',
        'Linha 1: `Filtros aplicados: k`',
        'Linha 2: `Resultados: nome1 nome2`, em ordem alfabética',
        'Linha 3: `Encontrados: q`',
        'Linha 4: `Preco medio: X` com duas casas, ou `indefinido`',
        'Sem nenhum filtro, todos os produtos são retornados',
        'Aplique apenas os filtros preenchidos, sem testar os demais',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

record Produto(string Nome, string Categoria, int Preco, bool Disponivel);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Produto> produtos = new List<Produto>();
        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            string categoria = Console.ReadLine();
            int preco = int.Parse(Console.ReadLine());
            bool disponivel = Console.ReadLine() == "1";
            produtos.Add(new Produto(nome, categoria, preco, disponivel));
        }

        string filtroCategoria = Console.ReadLine();
        int filtroPreco = int.Parse(Console.ReadLine());
        string filtroDisponivel = Console.ReadLine();

        // Aplique so os filtros preenchidos
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Produto(string Nome, string Categoria, int Preco, bool Disponivel);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Produto> produtos = new List<Produto>();
        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            string categoria = Console.ReadLine();
            int preco = int.Parse(Console.ReadLine());
            bool disponivel = Console.ReadLine() == "1";
            produtos.Add(new Produto(nome, categoria, preco, disponivel));
        }

        string filtroCategoria = Console.ReadLine();
        int filtroPreco = int.Parse(Console.ReadLine());
        string filtroDisponivel = Console.ReadLine();

        IEnumerable<Produto> consulta = produtos;
        int aplicados = 0;

        if (filtroCategoria != "-")
        {
            consulta = consulta.Where(p => p.Categoria == filtroCategoria);
            aplicados++;
        }

        if (filtroPreco > 0)
        {
            consulta = consulta.Where(p => p.Preco <= filtroPreco);
            aplicados++;
        }

        if (filtroDisponivel != "-")
        {
            bool queroDisponivel = filtroDisponivel == "1";
            consulta = consulta.Where(p => p.Disponivel == queroDisponivel);
            aplicados++;
        }

        var resultado = consulta.OrderBy(p => p.Nome).ToList();

        Console.WriteLine($"Filtros aplicados: {aplicados}");
        Console.WriteLine($"Resultados: {string.Join(" ", resultado.Select(p => p.Nome))}");
        Console.WriteLine($"Encontrados: {resultado.Count}");

        if (resultado.Any())
        {
            Console.WriteLine($"Preco medio: {resultado.Average(p => p.Preco):F2}");
        }
        else
        {
            Console.WriteLine("Preco medio: indefinido");
        }
    }
}
`,
      hints: [
        'A variável da consulta precisa ser `IEnumerable<Produto>` para poder receber o resultado de cada `Where`.',
        'Guarde a disponibilidade desejada em uma variável local antes da lambda — capturar a `string` e converter dentro funcionaria, mas é menos claro.',
      ],
      tests: [
        {
          name: 'Três filtros aplicados',
          stdin: '4\nTeclado\neletronicos\n150\n1\nMouse\neletronicos\n80\n1\nMonitor\neletronicos\n500\n0\nCaderno\npapelaria\n20\n1\neletronicos\n200\n1\n',
          expectedStdout:
            'Filtros aplicados: 3\nResultados: Mouse Teclado\nEncontrados: 2\nPreco medio: 115.00',
        },
        {
          name: 'Nenhum filtro',
          stdin: '2\nA\nx\n10\n1\nB\ny\n20\n0\n-\n0\n-\n',
          expectedStdout:
            'Filtros aplicados: 0\nResultados: A B\nEncontrados: 2\nPreco medio: 15.00',
        },
        {
          name: 'Filtro sem resultados',
          stdin: '2\nA\nx\n10\n1\nB\ny\n20\n1\nz\n0\n-\n',
          expectedStdout:
            'Filtros aplicados: 1\nResultados:\nEncontrados: 0\nPreco medio: indefinido',
        },
        {
          name: 'Só o filtro de disponibilidade',
          stdin: '3\nA\nx\n10\n0\nB\ny\n20\n1\nC\nz\n30\n0\n-\n0\n0\n',
          expectedStdout:
            'Filtros aplicados: 1\nResultados: A C\nEncontrados: 2\nPreco medio: 20.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c07l06',
    title: 'Estatísticas por categoria',
    objective: 'Produzir múltiplas métricas por grupo em uma consulta, evitando percorrer os dados uma vez por métrica.',
    concept: [
      {
        kind: 'text',
        body:
          'Um painel de métricas por categoria — contagem, total, média, extremos — pode ser escrito de duas formas muito diferentes em custo. A escolha está em **quantas vezes cada grupo é percorrido**.',
      },
      {
        kind: 'compare',
        good: `.GroupBy(v => v.Categoria)
.Select(g => new
{
    Cat = g.Key,
    Lista = g.ToList()      // materializa uma vez
})
.Select(x => new
{
    x.Cat,
    Qtd = x.Lista.Count,
    Total = x.Lista.Sum(v => v.Valor)
})`,
        bad: `.GroupBy(v => v.Categoria)
.Select(g => new
{
    Cat = g.Key,
    Qtd = g.Count(),
    Total = g.Sum(v => v.Valor),
    Media = g.Average(v => v.Valor),
    Maior = g.Max(v => v.Valor)
})`,
        goodLabel: 'Uma passada por grupo',
        badLabel: 'Quatro passadas por grupo',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Na prática, a segunda versão é a que se escreve — ela é muito mais legível, e para coleções na memória a diferença é irrelevante. O ponto é **saber** que existem quatro percursos ali, para reconhecer quando isso passa a importar.',
      },
      {
        kind: 'text',
        body:
          'A regra de decisão é a mesma da lição sobre quando não usar LINQ: legibilidade vence até que a medição prove o contrário. Otimizar sem medir costuma tornar o código pior sem torná-lo mais rápido.',
      },
      {
        kind: 'table',
        headers: ['Métrica por grupo', 'Operador dentro do grupo'],
        rows: [
          ['quantidade', '`g.Count()`'],
          ['total', '`g.Sum(seletor)`'],
          ['média', '`g.Average(seletor)`'],
          ['extremos', '`g.Max`, `g.Min`'],
          ['o registro campeão', '`g.MaxBy(seletor)`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um grupo nunca é vazio — ele só existe porque tem pelo menos um elemento. Isso significa que `Average` dentro de um grupo **nunca** lança exceção, diferente do `Average` sobre um filtro que pode não aprovar ninguém.',
      },
    ],
    quiz: [
      {
        id: 's04c07l06q1',
        type: 'single',
        prompt: 'Por que `Average` dentro de um `GroupBy` nunca lança exceção?',
        options: [
          { id: 'a', text: 'Porque um grupo só existe se tiver pelo menos um elemento.', correct: true },
          { id: 'b', text: 'Porque `GroupBy` remove grupos vazios.' },
          { id: 'c', text: 'Porque `Average` dentro de grupo devolve zero.' },
          { id: 'd', text: 'Ele pode lançar, sim.' },
        ],
        explanation:
          'Grupos nascem dos elementos. Não existe grupo sem membro, então a média de um grupo sempre tem denominador.',
      },
      {
        id: 's04c07l06q2',
        type: 'single',
        prompt: 'Quantas vezes um grupo é percorrido ao calcular contagem, soma, média e máximo?',
        options: [
          { id: 'a', code: '4', correct: true },
          { id: 'b', code: '1' },
          { id: 'c', code: '2' },
          { id: 'd', text: 'Depende do tamanho do grupo.' },
        ],
        explanation:
          'Cada agregador percorre o grupo. Para coleções na memória isso raramente importa, mas é bom saber que está acontecendo.',
      },
      {
        id: 's04c07l06q3',
        type: 'single',
        prompt: 'Quando otimizar essas passadas extras?',
        options: [
          { id: 'a', text: 'Só depois de medir e confirmar que elas são um problema real.', correct: true },
          { id: 'b', text: 'Sempre que houver mais de duas métricas.' },
          { id: 'c', text: 'Sempre que a coleção passar de cem elementos.' },
          { id: 'd', text: 'Nunca: a versão legível é sempre suficiente.' },
        ],
        explanation:
          'Trocar legibilidade por desempenho é um negócio ruim quando o desempenho não era problema. A medição é o que distingue os dois casos.',
      },
    ],
    challenge: {
      brief:
        'Produza um painel de métricas por categoria, com cinco medidas por grupo e uma linha de consolidado geral.',
      requirements: [
        'Declare um `record Venda(string Categoria, string Vendedor, int Valor)` fora da classe',
        'Leia `n` vendas, cada uma em três linhas',
        'Uma linha por categoria, no formato `eletronicos: 3 vendas, total 730, media 243.33, min 80, max 500`',
        'A média com duas casas decimais',
        'As categorias saem em ordem alfabética',
        'Depois: `Categorias: k`',
        'Depois: `Media geral: X` com duas casas',
        'Depois: `Maior categoria: nome`, a de maior total',
        'Por último: `Vendedores distintos: v`',
        'Em empate no total, a maior categoria é a alfabeticamente menor',
        'A entrada sempre tem pelo menos uma venda',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

record Venda(string Categoria, string Vendedor, int Valor);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Venda> vendas = new List<Venda>();
        for (int i = 0; i < n; i++)
        {
            string categoria = Console.ReadLine();
            string vendedor = Console.ReadLine();
            int valor = int.Parse(Console.ReadLine());
            vendas.Add(new Venda(categoria, vendedor, valor));
        }

        // Painel por categoria e consolidado
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Venda(string Categoria, string Vendedor, int Valor);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Venda> vendas = new List<Venda>();
        for (int i = 0; i < n; i++)
        {
            string categoria = Console.ReadLine();
            string vendedor = Console.ReadLine();
            int valor = int.Parse(Console.ReadLine());
            vendas.Add(new Venda(categoria, vendedor, valor));
        }

        var painel = vendas
            .GroupBy(v => v.Categoria)
            .Select(g => new
            {
                Categoria = g.Key,
                Quantidade = g.Count(),
                Total = g.Sum(v => v.Valor),
                Media = g.Average(v => v.Valor),
                Minimo = g.Min(v => v.Valor),
                Maximo = g.Max(v => v.Valor)
            })
            .OrderBy(x => x.Categoria)
            .ToList();

        foreach (var linha in painel)
        {
            Console.WriteLine(
                $"{linha.Categoria}: {linha.Quantidade} vendas, total {linha.Total}, " +
                $"media {linha.Media:F2}, min {linha.Minimo}, max {linha.Maximo}");
        }

        Console.WriteLine($"Categorias: {painel.Count}");
        Console.WriteLine($"Media geral: {vendas.Average(v => v.Valor):F2}");

        var maior = painel.OrderByDescending(x => x.Total).ThenBy(x => x.Categoria).First();

        Console.WriteLine($"Maior categoria: {maior.Categoria}");
        Console.WriteLine($"Vendedores distintos: {vendas.Select(v => v.Vendedor).Distinct().Count()}");
    }
}
`,
      hints: [
        'O objeto anônimo dentro do `Select` pode conter todas as cinco métricas de uma vez.',
        'A maior categoria sai de uma ordenação sobre o painel já calculado, não sobre as vendas originais.',
      ],
      tests: [
        {
          name: 'Duas categorias',
          stdin: '5\neletronicos\nAna\n500\nlivros\nBruno\n80\neletronicos\nCarla\n150\nlivros\nAna\n120\neletronicos\nAna\n80\n',
          expectedStdout:
            'eletronicos: 3 vendas, total 730, media 243.33, min 80, max 500\n' +
            'livros: 2 vendas, total 200, media 100.00, min 80, max 120\n' +
            'Categorias: 2\nMedia geral: 186.00\nMaior categoria: eletronicos\nVendedores distintos: 3',
        },
        {
          name: 'Uma categoria',
          stdin: '2\nunica\nX\n10\nunica\nY\n20\n',
          expectedStdout:
            'unica: 2 vendas, total 30, media 15.00, min 10, max 20\n' +
            'Categorias: 1\nMedia geral: 15.00\nMaior categoria: unica\nVendedores distintos: 2',
        },
        {
          name: 'Empate no total',
          stdin: '2\nzeta\nA\n100\nalfa\nB\n100\n',
          expectedStdout:
            'alfa: 1 vendas, total 100, media 100.00, min 100, max 100\n' +
            'zeta: 1 vendas, total 100, media 100.00, min 100, max 100\n' +
            'Categorias: 2\nMedia geral: 100.00\nMaior categoria: alfa\nVendedores distintos: 2',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c07l07',
    title: 'Transformando CSV em objetos',
    objective: 'Converter linhas de texto delimitado em registros tipados, descartando as linhas inválidas.',
    concept: [
      {
        kind: 'text',
        body:
          'Dados de fora chegam como texto. Transformá-los em objetos tipados é a primeira etapa de qualquer processamento — e ela precisa lidar com linhas malformadas sem derrubar o programa.',
      },
      {
        kind: 'code',
        code: `string[] partes = linha.Split(';');

if (partes.Length != 3) { descartadas++; continue; }

if (!int.TryParse(partes[2], out int valor)) { descartadas++; continue; }

registros.Add(new Registro(partes[0], partes[1], valor));`,
        caption: 'Valida o formato, depois o conteúdo, e só então constrói o objeto.',
      },
      {
        kind: 'table',
        headers: ['Problema na linha', 'Detecção'],
        rows: [
          ['campos a menos ou a mais', '`partes.Length != 3`'],
          ['número inválido', '`int.TryParse` devolve `false`'],
          ['campo obrigatório vazio', '`partes[0].Length == 0`'],
          ['espaços em volta', '`Trim()` antes de usar'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Descartar em silêncio é perigoso. Um relatório que ignora 30% das linhas por erro de formato e não avisa produz números confiantes e errados. **Sempre reporte quantas linhas foram descartadas.**',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Essa é a separação em camadas do capítulo 1 aplicada a dados: uma etapa converte texto em objetos, e todas as consultas seguintes trabalham com tipos, sem nunca mais tocar em `string`.',
      },
      {
        kind: 'text',
        body:
          'Depois de convertidos, os registros são apenas uma coleção — e todo o LINQ dos capítulos anteriores se aplica normalmente. O trabalho difícil está na fronteira.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Um CSV de verdade tem casos que o `Split` simples não resolve: campos com o delimitador dentro de aspas, quebras de linha em um campo, e cabeçalhos. Para esses, existem bibliotecas — e usá-las é a escolha certa.',
      },
    ],
    quiz: [
      {
        id: 's04c07l07q1',
        type: 'single',
        prompt: 'Por que reportar as linhas descartadas?',
        options: [
          { id: 'a', text: 'Porque um relatório que ignora dados sem avisar produz números errados com aparência de certos.', correct: true },
          { id: 'b', text: 'Porque o compilador exige.' },
          { id: 'c', text: 'Para melhorar o desempenho.' },
          { id: 'd', text: 'Não é necessário reportar.' },
        ],
        explanation:
          'É a diferença entre "o total é 500" e "o total é 500, com 30 linhas descartadas". A segunda permite descobrir um problema no arquivo de origem.',
      },
      {
        id: 's04c07l07q2',
        type: 'single',
        prompt: 'Em que ordem validar uma linha de CSV?',
        options: [
          { id: 'a', text: 'Formato primeiro, depois o conteúdo de cada campo.', correct: true },
          { id: 'b', text: 'Conteúdo primeiro, depois o formato.' },
          { id: 'c', text: 'Tudo de uma vez em uma condição.' },
          { id: 'd', text: 'A ordem é indiferente.' },
        ],
        explanation:
          'Sem o número certo de campos, acessar `partes[2]` estouraria os limites. A checagem de formato protege as seguintes.',
      },
      {
        id: 's04c07l07q3',
        type: 'single',
        prompt: 'Quando usar uma biblioteca em vez de `Split`?',
        options: [
          { id: 'a', text: 'Quando o CSV tem campos com aspas, delimitadores dentro dos dados ou quebras de linha.', correct: true },
          { id: 'b', text: 'Sempre.' },
          { id: 'c', text: 'Quando há mais de mil linhas.' },
          { id: 'd', text: 'Quando os campos são numéricos.' },
        ],
        explanation:
          'O formato CSV real tem regras de escape que um `Split` ignora. Para arquivos simples e controlados, o `Split` basta.',
      },
    ],
    challenge: {
      brief:
        'Converta linhas de texto delimitado em registros tipados, descartando as inválidas, e produza um relatório sobre os dados válidos.',
      requirements: [
        'Declare um `record Funcionario(string Nome, string Setor, int Salario)` fora da classe',
        'Leia linhas até a palavra `fim`; cada linha válida tem três campos separados por `;`',
        'Descarte linhas com número de campos diferente de 3, com salário não numérico, ou com nome vazio',
        'Linha 1: `Validos: v`',
        'Linha 2: `Descartados: d`',
        'Uma linha por setor, no formato `TI: 2 funcionarios, media 5500.00`, em ordem alfabética',
        'Depois: `Setores: s`',
        'Depois: `Folha total: X`',
        'Por último: `Maior salario: nome (valor)`, ou `Maior salario: nenhum`',
        'Espaços em volta dos campos devem ser removidos',
        'O programa não pode encerrar com exceção',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

record Funcionario(string Nome, string Setor, int Salario);

class Program
{
    static void Main()
    {
        List<Funcionario> funcionarios = new List<Funcionario>();
        int descartados = 0;

        string linha = Console.ReadLine();

        // Converta cada linha, validando formato e conteudo

        // Relatorio por setor
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Funcionario(string Nome, string Setor, int Salario);

class Program
{
    static void Main()
    {
        List<Funcionario> funcionarios = new List<Funcionario>();
        int descartados = 0;

        string linha = Console.ReadLine();

        while (linha != "fim")
        {
            string[] partes = linha.Split(';');

            if (partes.Length != 3)
            {
                descartados++;
                linha = Console.ReadLine();
                continue;
            }

            string nome = partes[0].Trim();
            string setor = partes[1].Trim();

            if (nome.Length == 0 || !int.TryParse(partes[2].Trim(), out int salario))
            {
                descartados++;
                linha = Console.ReadLine();
                continue;
            }

            funcionarios.Add(new Funcionario(nome, setor, salario));
            linha = Console.ReadLine();
        }

        Console.WriteLine($"Validos: {funcionarios.Count}");
        Console.WriteLine($"Descartados: {descartados}");

        var porSetor = funcionarios
            .GroupBy(f => f.Setor)
            .Select(g => new
            {
                Setor = g.Key,
                Quantidade = g.Count(),
                Media = g.Average(f => f.Salario)
            })
            .OrderBy(x => x.Setor)
            .ToList();

        foreach (var item in porSetor)
        {
            Console.WriteLine($"{item.Setor}: {item.Quantidade} funcionarios, media {item.Media:F2}");
        }

        Console.WriteLine($"Setores: {porSetor.Count}");
        Console.WriteLine($"Folha total: {funcionarios.Sum(f => f.Salario)}");

        if (funcionarios.Any())
        {
            var maior = funcionarios.MaxBy(f => f.Salario);
            Console.WriteLine($"Maior salario: {maior.Nome} ({maior.Salario})");
        }
        else
        {
            Console.WriteLine("Maior salario: nenhum");
        }
    }
}
`,
      hints: [
        'Cada `continue` precisa ler a próxima linha antes de saltar, senão o laço trava.',
        'O `Trim()` é aplicado a cada campo antes de validar, para que espaços em volta não impeçam a conversão.',
      ],
      tests: [
        {
          name: 'Linhas válidas e inválidas',
          stdin: 'Ana;TI;5000\nBruno;RH;abc\nCarla;TI;6000\n;TI;3000\nDiego;RH\nElena; RH ; 4000 \nfim\n',
          expectedStdout:
            'Validos: 3\nDescartados: 3\nRH: 1 funcionarios, media 4000.00\n' +
            'TI: 2 funcionarios, media 5500.00\nSetores: 2\nFolha total: 15000\n' +
            'Maior salario: Carla (6000)',
        },
        {
          name: 'Todas inválidas',
          stdin: 'a;b\nx;y;z\nfim\n',
          expectedStdout:
            'Validos: 0\nDescartados: 2\nSetores: 0\nFolha total: 0\nMaior salario: nenhum',
        },
        {
          name: 'Um funcionário só',
          stdin: 'Solo;Geral;1000\nfim\n',
          expectedStdout:
            'Validos: 1\nDescartados: 0\nGeral: 1 funcionarios, media 1000.00\n' +
            'Setores: 1\nFolha total: 1000\nMaior salario: Solo (1000)',
        },
        {
          name: 'Nenhuma linha',
          stdin: 'fim\n',
          expectedStdout:
            'Validos: 0\nDescartados: 0\nSetores: 0\nFolha total: 0\nMaior salario: nenhum',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c07l08',
    title: 'Detectando duplicidade em dados',
    objective: 'Encontrar registros repetidos por chave e relatar as inconsistências em vez de escondê-las.',
    concept: [
      {
        kind: 'text',
        body:
          'Duplicidade em dados costuma indicar um problema na origem: um cadastro feito duas vezes, um arquivo importado em dobro, um identificador que deveria ser único e não é. Detectá-la é mais útil que removê-la em silêncio.',
      },
      {
        kind: 'code',
        code: `var duplicados = registros
    .GroupBy(r => r.Cpf)
    .Where(g => g.Count() > 1)     // so os grupos com repeticao
    .Select(g => new { Chave = g.Key, Vezes = g.Count() });`,
        caption: 'Agrupar por chave e filtrar os grupos com mais de um elemento.',
      },
      {
        kind: 'text',
        body:
          'Essa é a diferença entre `Distinct` e a detecção: o primeiro **resolve** o problema escondendo as repetições, o segundo o **expõe** para que alguém decida o que fazer.',
      },
      {
        kind: 'table',
        headers: ['Objetivo', 'Abordagem'],
        rows: [
          ['limpar os dados', '`DistinctBy(chave)`'],
          ['saber quais repetem', '`GroupBy` + `Where(g => g.Count() > 1)`'],
          ['contar quantas repetições', 'total menos distintos'],
          ['ver os registros conflitantes', 'listar os elementos de cada grupo'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma nuance importante: registros com a mesma chave podem ter **conteúdos diferentes**. Dois cadastros com o mesmo CPF e nomes distintos é um problema bem pior que dois idênticos, e vale distinguir os dois casos no relatório.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`Distinct` sobre os registros completos não detecta esse caso: dois registros com o mesmo CPF e nomes diferentes são "distintos" para ele. A detecção precisa ser **pela chave**, não pelo registro inteiro.',
      },
      {
        kind: 'text',
        body:
          'O número de registros excedentes é o total menos a quantidade de chaves distintas. Ele responde "quantas linhas sobrariam se eu removesse as duplicatas".',
      },
    ],
    quiz: [
      {
        id: 's04c07l08q1',
        type: 'single',
        prompt: 'Como encontrar as chaves que aparecem mais de uma vez?',
        options: [
          { id: 'a', code: 'GroupBy(chave).Where(g => g.Count() > 1)', correct: true },
          { id: 'b', code: 'Distinct().Where(...)' },
          { id: 'c', code: 'Where(x => x.Count > 1)' },
          { id: 'd', code: 'GroupBy(chave).Take(2)' },
        ],
        explanation:
          'O agrupamento reúne os registros por chave, e o filtro seleciona os grupos com mais de um membro. `Distinct` faria o oposto: esconderia a repetição.',
      },
      {
        id: 's04c07l08q2',
        type: 'single',
        prompt: 'Por que `Distinct` sobre o registro completo não detecta todas as duplicidades?',
        options: [
          { id: 'a', text: 'Porque dois registros com a mesma chave e conteúdos diferentes são distintos para ele.', correct: true },
          { id: 'b', text: 'Porque `Distinct` só funciona com `int`.' },
          { id: 'c', text: 'Porque `Distinct` ignora a ordem.' },
          { id: 'd', text: 'Ele detecta todas.' },
        ],
        explanation:
          'É justamente o caso mais grave: mesmo CPF, nomes diferentes. A duplicidade é da **chave**, e é por ela que se deve agrupar.',
      },
      {
        id: 's04c07l08q3',
        type: 'single',
        prompt: 'Como calcular quantos registros são excedentes?',
        options: [
          { id: 'a', text: 'Total de registros menos a quantidade de chaves distintas.', correct: true },
          { id: 'b', text: 'A quantidade de grupos duplicados.' },
          { id: 'c', text: 'O tamanho do maior grupo.' },
          { id: 'd', text: 'A soma dos grupos com mais de um elemento.' },
        ],
        explanation:
          'Cada chave deveria ter um registro. O que passa disso é excedente, e a diferença dá exatamente esse número.',
      },
    ],
    challenge: {
      brief:
        'Detecte registros duplicados por chave, distinguindo duplicatas idênticas de conflitos com dados divergentes.',
      requirements: [
        'Declare um `record Cadastro(string Documento, string Nome, string Cidade)` fora da classe',
        'Leia `n` cadastros, cada um em três linhas',
        'Linha 1: `Total: n`',
        'Linha 2: `Documentos distintos: d`',
        'Linha 3: `Excedentes: e`, o total menos os distintos',
        'Uma linha por documento repetido, no formato `12345: 3 registros, conflitante`, em ordem alfabética de documento',
        'Um grupo é `conflitante` quando os registros têm conteúdos diferentes, e `identico` quando são todos iguais',
        'Depois: `Duplicados: k`, quantos documentos aparecem mais de uma vez',
        'Por último: `Conflitantes: c`',
        'Sem duplicatas, nenhuma linha de documento é impressa',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

record Cadastro(string Documento, string Nome, string Cidade);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Cadastro> cadastros = new List<Cadastro>();
        for (int i = 0; i < n; i++)
        {
            string documento = Console.ReadLine();
            string nome = Console.ReadLine();
            string cidade = Console.ReadLine();
            cadastros.Add(new Cadastro(documento, nome, cidade));
        }

        // Agrupe por documento e detecte as repeticoes
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Cadastro(string Documento, string Nome, string Cidade);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Cadastro> cadastros = new List<Cadastro>();
        for (int i = 0; i < n; i++)
        {
            string documento = Console.ReadLine();
            string nome = Console.ReadLine();
            string cidade = Console.ReadLine();
            cadastros.Add(new Cadastro(documento, nome, cidade));
        }

        int distintos = cadastros.Select(c => c.Documento).Distinct().Count();

        Console.WriteLine($"Total: {n}");
        Console.WriteLine($"Documentos distintos: {distintos}");
        Console.WriteLine($"Excedentes: {n - distintos}");

        var duplicados = cadastros
            .GroupBy(c => c.Documento)
            .Where(g => g.Count() > 1)
            .Select(g => new
            {
                Documento = g.Key,
                Vezes = g.Count(),
                Conflitante = g.Distinct().Count() > 1
            })
            .OrderBy(x => x.Documento)
            .ToList();

        foreach (var item in duplicados)
        {
            string estado = item.Conflitante ? "conflitante" : "identico";
            Console.WriteLine($"{item.Documento}: {item.Vezes} registros, {estado}");
        }

        Console.WriteLine($"Duplicados: {duplicados.Count}");
        Console.WriteLine($"Conflitantes: {duplicados.Count(x => x.Conflitante)}");
    }
}
`,
      hints: [
        'O `Distinct()` dentro do grupo compara os registros completos — se sobra mais de um, os conteúdos divergem.',
        'Os excedentes saem da diferença entre o total e a contagem de documentos distintos.',
      ],
      tests: [
        {
          name: 'Duplicata idêntica e conflitante',
          stdin: '5\n111\nAna\nSP\n222\nBruno\nRJ\n111\nAna\nSP\n333\nCarla\nMG\n222\nBruno Silva\nRJ\n',
          expectedStdout:
            'Total: 5\nDocumentos distintos: 3\nExcedentes: 2\n111: 2 registros, identico\n' +
            '222: 2 registros, conflitante\nDuplicados: 2\nConflitantes: 1',
        },
        {
          name: 'Sem duplicatas',
          stdin: '2\n1\nX\nA\n2\nY\nB\n',
          expectedStdout:
            'Total: 2\nDocumentos distintos: 2\nExcedentes: 0\nDuplicados: 0\nConflitantes: 0',
        },
        {
          name: 'Todos com o mesmo documento',
          stdin: '3\n9\nA\nSP\n9\nB\nRJ\n9\nC\nMG\n',
          expectedStdout:
            'Total: 3\nDocumentos distintos: 1\nExcedentes: 2\n9: 3 registros, conflitante\n' +
            'Duplicados: 1\nConflitantes: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c07l09',
    title: 'Prática: painel de métricas',
    objective: 'Montar um painel completo que combina agrupamento, ranking e percentuais em uma única saída.',
    concept: [
      {
        kind: 'text',
        body:
          'Um painel de métricas responde a várias perguntas sobre os mesmos dados, e cada resposta é uma consulta diferente sobre a mesma coleção base.',
      },
      {
        kind: 'table',
        headers: ['Bloco do painel', 'Consulta'],
        rows: [
          ['visão geral', 'agregadores sobre tudo'],
          ['por dimensão', '`GroupBy` + agregadores'],
          ['ranking', '`OrderByDescending` + `Take`'],
          ['participação', 'valor do grupo dividido pelo total'],
        ],
      },
      {
        kind: 'text',
        body:
          'O cálculo de **participação percentual** merece cuidado: ele é uma divisão, e a armadilha da divisão inteira da Seção 2 continua valendo. O total precisa ser convertido para `double` antes.',
      },
      {
        kind: 'code',
        code: `double percentual = totalGeral > 0
    ? (double)totalDoGrupo / totalGeral * 100
    : 0.0;`,
        caption: 'Conversão antes da divisão, e guarda contra o total zero.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A soma dos percentuais pode não dar exatamente 100 por causa do arredondamento — três grupos de um terço dariam `33.33` cada, somando `99.99`. Isso é esperado, e um painel não deve tentar "corrigir" a diferença.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Materializar a coleção base uma vez e derivar todos os blocos dela é o padrão certo. Cada bloco é uma consulta independente, mas todas partem do mesmo `ToList()`.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Monte um bloco por vez, testando a cada um. Um painel com cinco blocos escrito de uma vez é praticamente impossível de depurar quando um número sai errado.',
      },
    ],
    quiz: [
      {
        id: 's04c07l09q1',
        type: 'single',
        prompt: 'Como calcular a participação percentual de um grupo?',
        options: [
          { id: 'a', code: '(double)totalGrupo / totalGeral * 100', correct: true },
          { id: 'b', code: 'totalGrupo / totalGeral * 100' },
          { id: 'c', code: 'totalGrupo * 100 / totalGeral' },
          { id: 'd', code: '(double)(totalGrupo / totalGeral) * 100' },
        ],
        explanation:
          'A conversão precisa vir **antes** da divisão. A terceira opção funciona por acaso com inteiros pequenos, mas pode estourar; a quarta converte tarde demais.',
      },
      {
        id: 's04c07l09q2',
        type: 'single',
        prompt: 'Por que a soma dos percentuais pode não dar 100?',
        options: [
          { id: 'a', text: 'Por arredondamento: três terços viram 33.33 cada.', correct: true },
          { id: 'b', text: 'Porque algum grupo foi esquecido.' },
          { id: 'c', text: 'Porque `double` é impreciso para somas.' },
          { id: 'd', text: 'Isso indica erro no cálculo.' },
        ],
        explanation:
          'É consequência esperada de exibir com casas limitadas. Tentar ajustar a diferença costuma criar números que não batem com nenhum cálculo individual.',
      },
      {
        id: 's04c07l09q3',
        type: 'single',
        prompt: 'Por que materializar a coleção base antes de montar os blocos?',
        options: [
          { id: 'a', text: 'Porque cada bloco a percorre, e sem isso a fonte seria reprocessada várias vezes.', correct: true },
          { id: 'b', text: 'Porque os blocos precisam de índices.' },
          { id: 'c', text: 'Porque `GroupBy` exige uma lista.' },
          { id: 'd', text: 'Para garantir a ordem.' },
        ],
        explanation:
          'É a execução diferida de novo: cinco blocos sobre uma consulta não materializada significam cinco execuções da consulta base.',
      },
    ],
    challenge: {
      brief:
        'Monte um painel de métricas de atendimentos, com visão geral, quebra por canal com participação percentual, e ranking de atendentes.',
      requirements: [
        'Declare um `record Atendimento(string Atendente, string Canal, int Minutos, bool Resolvido)` fora da classe',
        'Leia `n` atendimentos, cada um em quatro linhas — o resolvido é `1` ou `0`',
        'Linha 1: `Atendimentos: n`',
        'Linha 2: `Tempo total: X minutos`',
        'Linha 3: `Tempo medio: Y` com duas casas, ou `indefinido`',
        'Linha 4: `Taxa de resolucao: Z%` com uma casa, ou `indefinida`',
        'Uma linha por canal, no formato `chat: 3 atendimentos, 45 min, 37.5%`, com o percentual do tempo sobre o total e uma casa decimal',
        'Os canais saem em ordem alfabética',
        'Depois: `Canais: c`',
        'Depois: `Top 2 atendentes: nome1 nome2`, por tempo total decrescente, desempatando por nome',
        'Por último: `Mais eficiente: nome`, o atendente com a maior taxa de resolução, desempatando por nome',
        'Com `n` igual a 0, as médias são indefinidas, as listas ficam vazias e o mais eficiente é `nenhum`',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

record Atendimento(string Atendente, string Canal, int Minutos, bool Resolvido);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Atendimento> dados = new List<Atendimento>();
        for (int i = 0; i < n; i++)
        {
            string atendente = Console.ReadLine();
            string canal = Console.ReadLine();
            int minutos = int.Parse(Console.ReadLine());
            bool resolvido = Console.ReadLine() == "1";
            dados.Add(new Atendimento(atendente, canal, minutos, resolvido));
        }

        // Painel: visao geral, por canal, e ranking
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Atendimento(string Atendente, string Canal, int Minutos, bool Resolvido);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Atendimento> dados = new List<Atendimento>();
        for (int i = 0; i < n; i++)
        {
            string atendente = Console.ReadLine();
            string canal = Console.ReadLine();
            int minutos = int.Parse(Console.ReadLine());
            bool resolvido = Console.ReadLine() == "1";
            dados.Add(new Atendimento(atendente, canal, minutos, resolvido));
        }

        int tempoTotal = dados.Sum(a => a.Minutos);

        Console.WriteLine($"Atendimentos: {n}");
        Console.WriteLine($"Tempo total: {tempoTotal} minutos");

        if (dados.Any())
        {
            Console.WriteLine($"Tempo medio: {dados.Average(a => a.Minutos):F2}");
            double taxa = (double)dados.Count(a => a.Resolvido) / dados.Count * 100;
            Console.WriteLine($"Taxa de resolucao: {taxa:F1}%");
        }
        else
        {
            Console.WriteLine("Tempo medio: indefinido");
            Console.WriteLine("Taxa de resolucao: indefinida");
        }

        var canais = dados
            .GroupBy(a => a.Canal)
            .Select(g => new
            {
                Canal = g.Key,
                Quantidade = g.Count(),
                Minutos = g.Sum(a => a.Minutos)
            })
            .OrderBy(x => x.Canal)
            .ToList();

        foreach (var canal in canais)
        {
            double percentual = tempoTotal > 0
                ? (double)canal.Minutos / tempoTotal * 100
                : 0.0;

            Console.WriteLine(
                $"{canal.Canal}: {canal.Quantidade} atendimentos, {canal.Minutos} min, {percentual:F1}%");
        }

        Console.WriteLine($"Canais: {canais.Count}");

        var porAtendente = dados
            .GroupBy(a => a.Atendente)
            .Select(g => new
            {
                Nome = g.Key,
                Minutos = g.Sum(a => a.Minutos),
                Taxa = (double)g.Count(a => a.Resolvido) / g.Count()
            })
            .ToList();

        var top2 = porAtendente
            .OrderByDescending(x => x.Minutos)
            .ThenBy(x => x.Nome)
            .Take(2)
            .Select(x => x.Nome);

        Console.WriteLine($"Top 2 atendentes: {string.Join(" ", top2)}");

        if (porAtendente.Any())
        {
            var eficiente = porAtendente
                .OrderByDescending(x => x.Taxa)
                .ThenBy(x => x.Nome)
                .First();

            Console.WriteLine($"Mais eficiente: {eficiente.Nome}");
        }
        else
        {
            Console.WriteLine("Mais eficiente: nenhum");
        }
    }
}
`,
      hints: [
        'A taxa de resolução por atendente é a contagem de resolvidos dividida pelo tamanho do grupo — e o grupo nunca é vazio.',
        'O percentual de cada canal precisa da guarda `tempoTotal > 0`, porque todos os atendimentos podem ter zero minutos.',
      ],
      tests: [
        {
          name: 'Painel completo',
          stdin: '5\nAna\nchat\n20\n1\nBruno\nemail\n50\n0\nAna\nchat\n25\n1\nCarla\ntelefone\n30\n1\nBruno\nemail\n35\n1\n',
          expectedStdout:
            'Atendimentos: 5\nTempo total: 160 minutos\nTempo medio: 32.00\nTaxa de resolucao: 80.0%\n' +
            'chat: 2 atendimentos, 45 min, 28.1%\nemail: 2 atendimentos, 85 min, 53.1%\n' +
            'telefone: 1 atendimentos, 30 min, 18.8%\nCanais: 3\nTop 2 atendentes: Bruno Ana\n' +
            'Mais eficiente: Ana',
        },
        {
          name: 'Nenhum resolvido',
          stdin: '2\nX\nchat\n10\n0\nY\nchat\n20\n0\n',
          expectedStdout:
            'Atendimentos: 2\nTempo total: 30 minutos\nTempo medio: 15.00\nTaxa de resolucao: 0.0%\n' +
            'chat: 2 atendimentos, 30 min, 100.0%\nCanais: 1\nTop 2 atendentes: Y X\n' +
            'Mais eficiente: X',
        },
        {
          name: 'Um atendimento',
          stdin: '1\nSolo\nchat\n15\n1\n',
          expectedStdout:
            'Atendimentos: 1\nTempo total: 15 minutos\nTempo medio: 15.00\nTaxa de resolucao: 100.0%\n' +
            'chat: 1 atendimentos, 15 min, 100.0%\nCanais: 1\nTop 2 atendentes: Solo\n' +
            'Mais eficiente: Solo',
        },
        {
          name: 'Sem atendimentos',
          stdin: '0\n',
          expectedStdout:
            'Atendimentos: 0\nTempo total: 0 minutos\nTempo medio: indefinido\n' +
            'Taxa de resolucao: indefinida\nCanais: 0\nTop 2 atendentes:\nMais eficiente: nenhum',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c07l10',
    title: 'Boss: analisador de log',
    objective: 'Integrar toda a Seção 4 em um analisador que converte, valida, agrupa e ranqueia dados brutos.',
    concept: [
      {
        kind: 'text',
        body:
          'Este é o desafio final da Seção 4. Ele reúne tudo: métodos com responsabilidade única, validação na fronteira, LINQ para consultar, e agregação em múltiplos níveis.',
      },
      {
        kind: 'table',
        headers: ['Etapa', 'Recurso da seção'],
        rows: [
          ['converter linhas em registros', 'métodos + padrão `Try`'],
          ['descartar linhas inválidas', 'validação em camadas'],
          ['contar por nível', '`GroupBy` + `Count`'],
          ['top rotas', '`GroupBy` + `OrderByDescending` + `Take`'],
          ['tempo médio por rota', '`GroupBy` + `Average`'],
          ['detectar rotas lentas', '`Where` sobre o agrupamento'],
        ],
      },
      {
        kind: 'text',
        body:
          'A estrutura recomendada separa a conversão do resto: um método que transforma uma linha em registro ou avisa que ela é inválida, e o `Main` cuidando do pipeline de análise.',
      },
      {
        kind: 'code',
        code: `static bool TentarConverter(string linha, out Entrada entrada)
{
    entrada = null;

    string[] partes = linha.Split(' ');
    if (partes.Length != 4) return false;

    if (!int.TryParse(partes[3], out int ms)) return false;

    entrada = new Entrada(partes[0], partes[1], partes[2], ms);
    return true;
}`,
        caption: 'O padrão `Try` do capítulo 2 aplicado à conversão de uma linha.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um analisador de log precisa ser **tolerante**: uma linha malformada não pode derrubar a análise das outras milhares. Mas ela também não pode ser esquecida — o relatório informa quantas foram descartadas.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que o pipeline inteiro é declarativo depois da conversão. A parte imperativa — ler linhas, validar, converter — fica isolada na fronteira, e toda a análise trabalha com dados tipados.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Construa em quatro etapas, rodando os testes a cada uma: primeiro só a conversão e as contagens; depois o agrupamento por nível; depois o ranking de rotas; e por último as métricas de tempo. Oito linhas de saída de uma vez é um mistério garantido.',
      },
    ],
    quiz: [
      {
        id: 's04c07l10q1',
        type: 'single',
        prompt: 'Por que isolar a conversão em um método com padrão `Try`?',
        options: [
          { id: 'a', text: 'Porque separa a validação da análise, e permite tratar a falha sem exceções.', correct: true },
          { id: 'b', text: 'Porque LINQ exige métodos separados.' },
          { id: 'c', text: 'Para melhorar o desempenho.' },
          { id: 'd', text: 'Porque `Split` só funciona em métodos.' },
        ],
        explanation:
          'É a separação em camadas do capítulo 1 combinada com o padrão `Try` do capítulo 2: a fronteira lida com texto sujo, o resto trabalha com tipos.',
      },
      {
        id: 's04c07l10q2',
        type: 'single',
        prompt: 'Por que um analisador de log não deve parar na primeira linha inválida?',
        options: [
          { id: 'a', text: 'Porque uma linha corrompida não deve impedir a análise de todas as outras.', correct: true },
          { id: 'b', text: 'Porque linhas inválidas são sempre no fim.' },
          { id: 'c', text: 'Porque `Split` nunca falha.' },
          { id: 'd', text: 'Ele deve parar, sim.' },
        ],
        explanation:
          'Logs vêm de sistemas reais, com truncamentos e corrupções ocasionais. Descartar e continuar, reportando a quantidade, é o comportamento correto.',
      },
      {
        id: 's04c07l10q3',
        type: 'single',
        prompt: 'Qual é a vantagem de o pipeline de análise ser declarativo?',
        options: [
          { id: 'a', text: 'Cada consulta expressa uma pergunta, sem misturar-se com a leitura dos dados.', correct: true },
          { id: 'b', text: 'Ele executa em paralelo automaticamente.' },
          { id: 'c', text: 'Ele dispensa validação.' },
          { id: 'd', text: 'Ele usa menos memória.' },
        ],
        explanation:
          'A separação entre "obter os dados" e "responder perguntas sobre eles" é o que permite acrescentar uma métrica nova sem tocar em nada do que já existe.',
      },
    ],
    challenge: {
      brief:
        'Analise um log de requisições. Cada linha tem quatro campos separados por espaço: horário, nível, rota e tempo em milissegundos. Leia até a palavra `fim`, descarte linhas malformadas, e produza o relatório completo.',
      requirements: [
        'Declare um `record Entrada(string Hora, string Nivel, string Rota, int Ms)` fora da classe',
        'Escreva `TentarConverter(string linha, out Entrada entrada)` devolvendo `bool`',
        'Uma linha é inválida se não tiver exatamente 4 campos, ou se o tempo não for um inteiro',
        'Linha 1: `Validas: v`',
        'Linha 2: `Descartadas: d`',
        'Uma linha por nível, no formato `ERROR: 2`, em ordem alfabética de nível',
        'Depois: `Rotas distintas: r`',
        'Depois: `Top 2 rotas: /a /b`, as mais requisitadas, desempatando por nome crescente',
        'Depois: `Tempo medio: X` com duas casas, ou `indefinido`',
        'Depois: `Rota mais lenta: /rota (Y)`, pela média de tempo com duas casas, desempatando por nome, ou `nenhuma`',
        'Por último: `Rotas lentas: /a /b`, as rotas com média acima de 100ms, em ordem alfabética',
        'Não mude a assinatura de `TentarConverter`',
        'O programa não pode encerrar com exceção',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

record Entrada(string Hora, string Nivel, string Rota, int Ms);

class Program
{
    static bool TentarConverter(string linha, out Entrada entrada)
    {
        entrada = null;

        // Valide o formato e o tempo antes de construir
        return false;
    }

    static void Main()
    {
        List<Entrada> entradas = new List<Entrada>();
        int descartadas = 0;

        string linha = Console.ReadLine();

        // Converta, depois analise com LINQ
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Entrada(string Hora, string Nivel, string Rota, int Ms);

class Program
{
    static bool TentarConverter(string linha, out Entrada entrada)
    {
        entrada = null;

        string[] partes = linha.Split(' ');

        if (partes.Length != 4)
        {
            return false;
        }

        if (!int.TryParse(partes[3], out int ms))
        {
            return false;
        }

        entrada = new Entrada(partes[0], partes[1], partes[2], ms);
        return true;
    }

    static void Main()
    {
        List<Entrada> entradas = new List<Entrada>();
        int descartadas = 0;

        string linha = Console.ReadLine();

        while (linha != "fim")
        {
            if (TentarConverter(linha, out Entrada entrada))
            {
                entradas.Add(entrada);
            }
            else
            {
                descartadas++;
            }

            linha = Console.ReadLine();
        }

        Console.WriteLine($"Validas: {entradas.Count}");
        Console.WriteLine($"Descartadas: {descartadas}");

        var niveis = entradas
            .GroupBy(e => e.Nivel)
            .Select(g => new { Nivel = g.Key, Quantidade = g.Count() })
            .OrderBy(x => x.Nivel);

        foreach (var nivel in niveis)
        {
            Console.WriteLine($"{nivel.Nivel}: {nivel.Quantidade}");
        }

        var porRota = entradas
            .GroupBy(e => e.Rota)
            .Select(g => new
            {
                Rota = g.Key,
                Quantidade = g.Count(),
                Media = g.Average(e => e.Ms)
            })
            .ToList();

        Console.WriteLine($"Rotas distintas: {porRota.Count}");

        var top2 = porRota
            .OrderByDescending(x => x.Quantidade)
            .ThenBy(x => x.Rota)
            .Take(2)
            .Select(x => x.Rota);

        Console.WriteLine($"Top 2 rotas: {string.Join(" ", top2)}");

        if (entradas.Any())
        {
            Console.WriteLine($"Tempo medio: {entradas.Average(e => e.Ms):F2}");
        }
        else
        {
            Console.WriteLine("Tempo medio: indefinido");
        }

        if (porRota.Any())
        {
            var maisLenta = porRota
                .OrderByDescending(x => x.Media)
                .ThenBy(x => x.Rota)
                .First();

            Console.WriteLine($"Rota mais lenta: {maisLenta.Rota} ({maisLenta.Media:F2})");
        }
        else
        {
            Console.WriteLine("Rota mais lenta: nenhuma");
        }

        var lentas = porRota
            .Where(x => x.Media > 100)
            .OrderBy(x => x.Rota)
            .Select(x => x.Rota);

        Console.WriteLine($"Rotas lentas: {string.Join(" ", lentas)}");
    }
}
`,
      hints: [
        'O `TentarConverter` valida o formato antes do conteúdo, e só constrói o registro quando os dois passam.',
        'Materialize `porRota` com `ToList()`: ele é usado no ranking, na rota mais lenta e nas rotas lentas.',
        'A rota mais lenta usa a **média** de tempo, não o tempo total — duas rotas com o mesmo total podem ter médias bem diferentes.',
      ],
      tests: [
        {
          name: 'Log com linhas inválidas',
          stdin: '10:00 INFO /home 50\n10:01 ERROR /api abc\n10:02 INFO /api 150\n10:03 ERROR /api 200\n10:04 INFO /home\n10:05 WARN /login 90\n10:06 INFO /api 120\nfim\n',
          expectedStdout:
            'Validas: 5\nDescartadas: 2\nERROR: 1\nINFO: 3\nWARN: 1\nRotas distintas: 3\n' +
            'Top 2 rotas: /api /home\nTempo medio: 122.00\nRota mais lenta: /api (156.67)\n' +
            'Rotas lentas: /api',
        },
        {
          name: 'Todas as linhas válidas e rápidas',
          stdin: '1 INFO /a 10\n2 INFO /b 20\nfim\n',
          expectedStdout:
            'Validas: 2\nDescartadas: 0\nINFO: 2\nRotas distintas: 2\nTop 2 rotas: /a /b\n' +
            'Tempo medio: 15.00\nRota mais lenta: /b (20.00)\nRotas lentas:',
        },
        {
          name: 'Nenhuma linha válida',
          stdin: 'lixo\noutra coisa aqui agora demais\nfim\n',
          expectedStdout:
            'Validas: 0\nDescartadas: 2\nRotas distintas: 0\nTop 2 rotas:\n' +
            'Tempo medio: indefinido\nRota mais lenta: nenhuma\nRotas lentas:',
        },
        {
          name: 'Empate na quantidade de requisições',
          stdin: '1 INFO /zeta 300\n2 INFO /alfa 50\nfim\n',
          expectedStdout:
            'Validas: 2\nDescartadas: 0\nINFO: 2\nRotas distintas: 2\nTop 2 rotas: /alfa /zeta\n' +
            'Tempo medio: 175.00\nRota mais lenta: /zeta (300.00)\nRotas lentas: /zeta',
        },
        {
          name: 'Log vazio',
          stdin: 'fim\n',
          expectedStdout:
            'Validas: 0\nDescartadas: 0\nRotas distintas: 0\nTop 2 rotas:\n' +
            'Tempo medio: indefinido\nRota mais lenta: nenhuma\nRotas lentas:',
          hidden: true,
        },
      ],
    },
  },
]
