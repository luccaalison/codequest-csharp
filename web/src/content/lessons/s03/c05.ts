import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's03c05l01',
    title: 'Array bidimensional',
    objective: 'Declarar e acessar uma matriz com dois índices, usando `GetLength` para descobrir cada dimensão.',
    concept: [
      {
        kind: 'text',
        body:
          'Um array guarda uma sequência; uma **matriz** guarda uma grade. Ela é o tipo natural para tabuleiros, tabelas, imagens e qualquer dado que tenha linha e coluna.',
      },
      {
        kind: 'code',
        code: `int[,] tabela = new int[3, 4];   // 3 linhas, 4 colunas

tabela[0, 0] = 1;                // primeira celula
tabela[2, 3] = 9;                // ultima celula

Console.WriteLine(tabela.GetLength(0));   // 3 -> linhas
Console.WriteLine(tabela.GetLength(1));   // 4 -> colunas
Console.WriteLine(tabela.Length);         // 12 -> total de celulas`,
        caption: 'A vírgula dentro dos colchetes é o que distingue `int[,]` de `int[]`.',
      },
      {
        kind: 'table',
        headers: ['Expressão', 'Devolve'],
        rows: [
          ['`m.GetLength(0)`', 'quantidade de linhas'],
          ['`m.GetLength(1)`', 'quantidade de colunas'],
          ['`m.Length`', 'total de células, linhas × colunas'],
          ['`m[i, j]`', 'a célula da linha `i`, coluna `j`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`Length` em uma matriz devolve o **total de células**, não o número de linhas. Usá-lo como limite de laço é um erro comum e produz índices muito além do válido. Para dimensões, sempre `GetLength`.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A convenção `[linha, coluna]` é a mesma da matemática e a mesma que você vai encontrar em praticamente toda biblioteca. Inverter a ordem mentalmente é a origem de metade dos bugs de grid.',
      },
      {
        kind: 'text',
        body:
          'Como todo array, a matriz nasce preenchida com o valor padrão do tipo — zeros, no caso de `int` — e cada dimensão tem índices de `0` até `GetLength(d) - 1`.',
      },
    ],
    quiz: [
      {
        id: 's03c05l01q1',
        type: 'single',
        prompt: 'Quanto vale `m.Length` para `new int[3, 4]`?',
        options: [
          { id: 'a', code: '12', correct: true },
          { id: 'b', code: '3' },
          { id: 'c', code: '4' },
          { id: 'd', code: '7' },
        ],
        explanation:
          '`Length` conta todas as células: 3 × 4. Para descobrir as dimensões separadamente é preciso `GetLength(0)` e `GetLength(1)`.',
      },
      {
        id: 's03c05l01q2',
        type: 'single',
        prompt: 'Qual é o maior índice válido de linha em `new int[3, 4]`?',
        options: [
          { id: 'a', code: '2', correct: true },
          { id: 'b', code: '3' },
          { id: 'c', code: '4' },
          { id: 'd', code: '11' },
        ],
        explanation:
          'Cada dimensão segue a mesma regra do array simples: de 0 a `GetLength(d) - 1`. Com 3 linhas, os índices são 0, 1 e 2.',
      },
      {
        id: 's03c05l01q3',
        type: 'single',
        prompt: 'O que `m[2, 3]` acessa?',
        options: [
          { id: 'a', text: 'A célula da linha 2, coluna 3.', correct: true },
          { id: 'b', text: 'A célula da coluna 2, linha 3.' },
          { id: 'c', text: 'As células de 2 até 3.' },
          { id: 'd', text: 'A célula de índice 23.' },
        ],
        explanation:
          'A ordem é sempre linha primeiro, coluna depois. Trocar os dois compila normalmente e produz resultados errados em silêncio — a menos que a matriz não seja quadrada, e aí vira exceção.',
      },
    ],
    challenge: {
      brief:
        'Leia dois inteiros maiores ou iguais a 1, `linhas` e `colunas`, e crie uma matriz em que a célula da linha `i` e coluna `j` guarda o valor `i * 10 + j`. Mostre a grade e as dimensões.',
      requirements: [
        'Uma linha por linha da matriz, com os valores separados por espaço',
        'Depois: `Linhas: l`, vindo de `GetLength(0)`',
        'Depois: `Colunas: c`, vindo de `GetLength(1)`',
        'Por último: `Total: t`, vindo de `Length`',
        'Use `GetLength` nos laços, não os valores lidos',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int linhas = int.Parse(Console.ReadLine());
        int colunas = int.Parse(Console.ReadLine());

        int[,] tabela = new int[linhas, colunas];

        // Preencha com i * 10 + j e imprima linha a linha
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int linhas = int.Parse(Console.ReadLine());
        int colunas = int.Parse(Console.ReadLine());

        int[,] tabela = new int[linhas, colunas];

        for (int i = 0; i < tabela.GetLength(0); i++)
        {
            for (int j = 0; j < tabela.GetLength(1); j++)
            {
                tabela[i, j] = i * 10 + j;
            }
        }

        for (int i = 0; i < tabela.GetLength(0); i++)
        {
            string linha = "";

            for (int j = 0; j < tabela.GetLength(1); j++)
            {
                linha += $"{tabela[i, j]} ";
            }

            Console.WriteLine(linha);
        }

        Console.WriteLine($"Linhas: {tabela.GetLength(0)}");
        Console.WriteLine($"Colunas: {tabela.GetLength(1)}");
        Console.WriteLine($"Total: {tabela.Length}");
    }
}
`,
      hints: [
        'O laço externo anda pelas linhas e o interno pelas colunas, como no desenho de retângulos da Seção 2.',
        'Monte cada linha em uma `string` e imprima quando o laço interno terminar.',
      ],
      tests: [
        {
          name: 'Três por quatro',
          stdin: '3\n4\n',
          expectedStdout:
            '0 1 2 3\n10 11 12 13\n20 21 22 23\nLinhas: 3\nColunas: 4\nTotal: 12',
        },
        {
          name: 'Uma célula',
          stdin: '1\n1\n',
          expectedStdout: '0\nLinhas: 1\nColunas: 1\nTotal: 1',
        },
        {
          name: 'Uma coluna, várias linhas',
          stdin: '4\n1\n',
          expectedStdout: '0\n10\n20\n30\nLinhas: 4\nColunas: 1\nTotal: 4',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c05l02',
    title: 'Percorrendo linhas e colunas',
    objective: 'Escolher qual índice fica no laço externo, e perceber que isso muda a ordem de visita das células.',
    concept: [
      {
        kind: 'text',
        body:
          'Existem duas formas de varrer uma matriz, e a diferença é qual laço fica por fora. As duas visitam **todas** as células — em ordens completamente diferentes.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Por linhas',
          code: `for (int i = 0; i < linhas; i++)
  for (int j = 0; j < colunas; j++)
    // m[i, j]

// 1 2 3 4 5 6`,
        },
        right: {
          label: 'Por colunas',
          code: `for (int j = 0; j < colunas; j++)
  for (int i = 0; i < linhas; i++)
    // m[i, j]

// 1 4 2 5 3 6`,
        },
        note: 'O acesso continua sendo `m[i, j]` nos dois. Só o cabeçalho dos laços troca de lugar.',
      },
      {
        kind: 'output',
        code: `matriz:
1 2 3
4 5 6`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Ao trocar os laços, o **acesso não muda**: continua `m[i, j]`, com a linha primeiro. Escrever `m[j, i]` por engano acessa a transposta, e em matriz não quadrada isso vira exceção de índice.',
      },
      {
        kind: 'text',
        body:
          'A varredura por linhas é a padrão, porque é como a matriz está organizada na memória: as células de uma linha ficam lado a lado. Percorrer por colunas obriga a saltar, o que é mais lento em matrizes grandes.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A escolha só importa quando a ordem de visita faz parte do resultado: imprimir a matriz, somar por coluna, ou processar dados que dependem do vizinho anterior. Para somar tudo, as duas dão o mesmo número.',
      },
    ],
    quiz: [
      {
        id: 's03c05l02q1',
        type: 'single',
        prompt: 'Percorrendo `[[1,2,3],[4,5,6]]` por colunas, qual é a ordem de visita?',
        options: [
          { id: 'a', code: '1 4 2 5 3 6', correct: true },
          { id: 'b', code: '1 2 3 4 5 6' },
          { id: 'c', code: '1 4 2 3 5 6' },
          { id: 'd', code: '6 5 4 3 2 1' },
        ],
        explanation:
          'Com o laço das colunas por fora, cada coluna é percorrida inteira antes de passar para a próxima: primeiro `1 4`, depois `2 5`, depois `3 6`.',
      },
      {
        id: 's03c05l02q2',
        type: 'single',
        prompt: 'Ao inverter os laços, o que acontece com a expressão de acesso?',
        options: [
          { id: 'a', text: 'Continua `m[i, j]`: a linha vem sempre primeiro.', correct: true },
          { id: 'b', text: 'Passa a ser `m[j, i]`.' },
          { id: 'c', text: 'Passa a ser `m[j][i]`.' },
          { id: 'd', text: 'Depende de qual laço é o externo.' },
        ],
        explanation:
          'A ordem dos índices é uma propriedade da matriz, não dos laços. `i` é linha e `j` é coluna, independentemente de quem varre primeiro.',
      },
      {
        id: 's03c05l02q3',
        type: 'single',
        prompt: 'Quando a escolha entre as duas varreduras muda o resultado?',
        options: [
          { id: 'a', text: 'Quando a ordem de visita faz parte da saída ou do cálculo.', correct: true },
          { id: 'b', text: 'Sempre: os resultados são sempre diferentes.' },
          { id: 'c', text: 'Nunca: são equivalentes.' },
          { id: 'd', text: 'Só em matrizes quadradas.' },
        ],
        explanation:
          'Somar todas as células dá o mesmo total nas duas. Imprimir a matriz, somar por coluna ou comparar com o vizinho anterior dependem da ordem.',
      },
    ],
    challenge: {
      brief:
        'Leia as dimensões de uma matriz e depois seus valores, uma linha por vez com os números separados por espaço. Mostre todas as células em duas ordens: percorrendo por linhas e percorrendo por colunas.',
      requirements: [
        'Linha 1: `Por linhas: 1 2 3 4 5 6`',
        'Linha 2: `Por colunas: 1 4 2 5 3 6`',
        'Linha 3: `Celulas: t`',
        'A ordem da entrada é: `linhas`, `colunas`, e depois uma linha por linha da matriz',
        'Use `m[i, j]` nas duas varreduras, mudando apenas qual laço fica por fora',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int linhas = int.Parse(Console.ReadLine());
        int colunas = int.Parse(Console.ReadLine());

        int[,] m = new int[linhas, colunas];

        for (int i = 0; i < linhas; i++)
        {
            string[] partes = Console.ReadLine().Split(' ');
            for (int j = 0; j < colunas; j++)
            {
                m[i, j] = int.Parse(partes[j]);
            }
        }

        // Duas varreduras: linhas por fora, depois colunas por fora
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int linhas = int.Parse(Console.ReadLine());
        int colunas = int.Parse(Console.ReadLine());

        int[,] m = new int[linhas, colunas];

        for (int i = 0; i < linhas; i++)
        {
            string[] partes = Console.ReadLine().Split(' ');
            for (int j = 0; j < colunas; j++)
            {
                m[i, j] = int.Parse(partes[j]);
            }
        }

        string porLinhas = "";
        for (int i = 0; i < m.GetLength(0); i++)
        {
            for (int j = 0; j < m.GetLength(1); j++)
            {
                porLinhas += $"{m[i, j]} ";
            }
        }

        string porColunas = "";
        for (int j = 0; j < m.GetLength(1); j++)
        {
            for (int i = 0; i < m.GetLength(0); i++)
            {
                porColunas += $"{m[i, j]} ";
            }
        }

        Console.WriteLine($"Por linhas: {porLinhas}");
        Console.WriteLine($"Por colunas: {porColunas}");
        Console.WriteLine($"Celulas: {m.Length}");
    }
}
`,
      hints: [
        'A leitura da matriz já vem pronta no `starterCode`. Sua tarefa são as duas varreduras.',
        'Na varredura por colunas, o `j` fica no laço externo e o `i` no interno — mas o acesso continua `m[i, j]`.',
      ],
      tests: [
        {
          name: 'Duas linhas, três colunas',
          stdin: '2\n3\n1 2 3\n4 5 6\n',
          expectedStdout: 'Por linhas: 1 2 3 4 5 6\nPor colunas: 1 4 2 5 3 6\nCelulas: 6',
        },
        {
          name: 'Matriz quadrada',
          stdin: '2\n2\n1 2\n3 4\n',
          expectedStdout: 'Por linhas: 1 2 3 4\nPor colunas: 1 3 2 4\nCelulas: 4',
        },
        {
          name: 'Uma linha só: as duas ordens coincidem',
          stdin: '1\n4\n7 8 9 10\n',
          expectedStdout: 'Por linhas: 7 8 9 10\nPor colunas: 7 8 9 10\nCelulas: 4',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c05l03',
    title: 'Somas por linha e por coluna',
    objective: 'Agregar uma matriz nas duas direções, produzindo os totais marginais de uma tabela.',
    concept: [
      {
        kind: 'text',
        body:
          'Somar por linha e por coluna transforma uma grade de números em um relatório. É o que toda planilha faz na última coluna e na última linha, e é a aplicação mais comum de matriz fora de gráficos.',
      },
      {
        kind: 'code',
        code: `// soma de uma linha: fixa o i, varre o j
for (int i = 0; i < linhas; i++)
{
    int soma = 0;
    for (int j = 0; j < colunas; j++)
    {
        soma += m[i, j];
    }
    Console.WriteLine($"Linha {i}: {soma}");
}`,
        caption: 'O acumulador nasce dentro do laço externo: cada linha tem o seu.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O acumulador precisa ser **zerado a cada linha**. Declará-lo antes do laço externo faz os totais se somarem uns aos outros, e o resultado vira uma soma acumulada em vez de totais por linha.',
      },
      {
        kind: 'text',
        body:
          'A soma por coluna é a mesma coisa com os laços trocados: fixa o `j`, varre o `i`. E o acesso continua sendo `m[i, j]`, como na lição anterior.',
      },
      {
        kind: 'output',
        code: `      c0  c1  c2   soma
l0     1   2   3     6
l1     4   5   6    15
l2     7   8   9    24
soma  12  15  18    45`,
        caption: 'Os totais marginais de uma matriz 3×3.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A soma dos totais por linha tem que ser igual à soma dos totais por coluna, e as duas iguais ao total geral. É a verificação mais barata que existe para saber se a varredura está correta: se os três números não baterem, algum índice está trocado.',
      },
    ],
    quiz: [
      {
        id: 's03c05l03q1',
        type: 'single',
        prompt: 'Onde deve ser declarado o acumulador da soma de cada linha?',
        options: [
          { id: 'a', text: 'Dentro do laço externo, antes do interno.', correct: true },
          { id: 'b', text: 'Antes dos dois laços.' },
          { id: 'c', text: 'Dentro do laço interno.' },
          { id: 'd', text: 'Depois dos dois laços.' },
        ],
        explanation:
          'Antes dos dois, ele acumularia todas as linhas juntas. Dentro do interno, ele seria zerado a cada célula e sempre valeria o último valor.',
      },
      {
        id: 's03c05l03q2',
        type: 'single',
        prompt: 'Qual é a soma da coluna 1 de `[[1,2,3],[4,5,6],[7,8,9]]`?',
        options: [
          { id: 'a', code: '15', correct: true },
          { id: 'b', code: '6' },
          { id: 'c', code: '12' },
          { id: 'd', code: '18' },
        ],
        explanation:
          'A coluna 1 é a do meio: 2 + 5 + 8 = 15. A resposta 6 seria a soma da linha 0, um erro de índice trocado.',
      },
      {
        id: 's03c05l03q3',
        type: 'single',
        prompt: 'Qual verificação confirma que as somas estão corretas?',
        options: [
          { id: 'a', text: 'A soma dos totais por linha tem que ser igual à dos totais por coluna.', correct: true },
          { id: 'b', text: 'Cada total de linha tem que ser igual ao total de coluna correspondente.' },
          { id: 'c', text: 'O total geral tem que ser divisível pelo número de células.' },
          { id: 'd', text: 'Todos os totais precisam ser positivos.' },
        ],
        explanation:
          'As duas agregações somam exatamente as mesmas células, só que agrupadas de formas diferentes. Se os totais discordam, alguma célula foi contada duas vezes ou nenhuma.',
      },
    ],
    challenge: {
      brief:
        'Leia uma matriz e produza seus totais marginais: a soma de cada linha, a soma de cada coluna, e o total geral.',
      requirements: [
        'Uma linha por linha da matriz, no formato `Linha 0: 6`',
        'Depois, uma linha por coluna, no formato `Coluna 0: 12`',
        'Por último: `Total: t`',
        'Os índices de linha e coluna começam em 0',
        'A ordem da entrada é: `linhas`, `colunas`, e depois uma linha por linha da matriz',
        'Valores negativos são válidos',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int linhas = int.Parse(Console.ReadLine());
        int colunas = int.Parse(Console.ReadLine());

        int[,] m = new int[linhas, colunas];

        for (int i = 0; i < linhas; i++)
        {
            string[] partes = Console.ReadLine().Split(' ');
            for (int j = 0; j < colunas; j++)
            {
                m[i, j] = int.Parse(partes[j]);
            }
        }

        // Somas por linha, somas por coluna, e o total geral
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int linhas = int.Parse(Console.ReadLine());
        int colunas = int.Parse(Console.ReadLine());

        int[,] m = new int[linhas, colunas];

        for (int i = 0; i < linhas; i++)
        {
            string[] partes = Console.ReadLine().Split(' ');
            for (int j = 0; j < colunas; j++)
            {
                m[i, j] = int.Parse(partes[j]);
            }
        }

        int total = 0;

        for (int i = 0; i < m.GetLength(0); i++)
        {
            int soma = 0;

            for (int j = 0; j < m.GetLength(1); j++)
            {
                soma += m[i, j];
            }

            Console.WriteLine($"Linha {i}: {soma}");
            total += soma;
        }

        for (int j = 0; j < m.GetLength(1); j++)
        {
            int soma = 0;

            for (int i = 0; i < m.GetLength(0); i++)
            {
                soma += m[i, j];
            }

            Console.WriteLine($"Coluna {j}: {soma}");
        }

        Console.WriteLine($"Total: {total}");
    }
}
`,
      hints: [
        'São dois pares de laços independentes: um com `i` por fora, outro com `j` por fora.',
        'O total geral pode ser acumulado somando os totais de linha, sem precisar de um terceiro laço.',
      ],
      tests: [
        {
          name: 'Matriz três por três',
          stdin: '3\n3\n1 2 3\n4 5 6\n7 8 9\n',
          expectedStdout:
            'Linha 0: 6\nLinha 1: 15\nLinha 2: 24\nColuna 0: 12\nColuna 1: 15\nColuna 2: 18\nTotal: 45',
        },
        {
          name: 'Retangular com negativos',
          stdin: '2\n3\n1 -2 3\n-4 5 -6\n',
          expectedStdout:
            'Linha 0: 2\nLinha 1: -5\nColuna 0: -3\nColuna 1: 3\nColuna 2: -3\nTotal: -3',
        },
        {
          name: 'Uma célula',
          stdin: '1\n1\n7\n',
          expectedStdout: 'Linha 0: 7\nColuna 0: 7\nTotal: 7',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c05l04',
    title: 'Diagonais',
    objective: 'Identificar as duas diagonais de uma matriz quadrada pelas relações entre os índices.',
    concept: [
      {
        kind: 'text',
        body:
          'As diagonais de uma matriz quadrada são definidas por relações simples entre os índices — e reconhecê-las evita escrever um laço aninhado onde um laço só basta.',
      },
      {
        kind: 'table',
        headers: ['Diagonal', 'Condição', 'Percurso'],
        rows: [
          ['principal', '`i == j`', '`m[k, k]`'],
          ['secundária', '`i + j == n - 1`', '`m[k, n - 1 - k]`'],
        ],
      },
      {
        kind: 'code',
        code: `int n = m.GetLength(0);

for (int k = 0; k < n; k++)
{
    somaPrincipal += m[k, k];
    somaSecundaria += m[k, n - 1 - k];
}`,
        caption: 'Um único laço percorre as duas diagonais ao mesmo tempo.',
      },
      {
        kind: 'output',
        code: `1  2  3      principal:  1 5 9
4  5  6      secundaria: 3 5 7
7  8  9`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Quando `n` é **ímpar**, as duas diagonais se cruzam na célula central, que pertence às duas. Quando `n` é par, elas não têm nenhuma célula em comum. É a mesma paridade que decidia se sobrava um valor central nos pares da Seção 2.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Diagonal só existe em matriz **quadrada**. Em uma matriz 2×3, `m[2, 2]` estoura os limites. Se a matriz pode não ser quadrada, o programa precisa checar `GetLength(0) == GetLength(1)` antes.',
      },
      {
        kind: 'text',
        body:
          'Percorrer uma diagonal custa `n` acessos, contra `n²` de uma varredura completa. Escrever dois laços aninhados e testar `if (i == j)` funciona, mas faz `n²` trabalho para visitar `n` células.',
      },
    ],
    quiz: [
      {
        id: 's03c05l04q1',
        type: 'single',
        prompt: 'Qual condição identifica a diagonal secundária de uma matriz `n × n`?',
        options: [
          { id: 'a', code: 'i + j == n - 1', correct: true },
          { id: 'b', code: 'i == j' },
          { id: 'c', code: 'i + j == n' },
          { id: 'd', code: 'i - j == n - 1' },
        ],
        explanation:
          'Em uma 3×3, os pares são `(0,2)`, `(1,1)` e `(2,0)` — a soma dos índices é sempre 2, que é `n - 1`.',
      },
      {
        id: 's03c05l04q2',
        type: 'single',
        prompt: 'Quando as duas diagonais compartilham uma célula?',
        options: [
          { id: 'a', text: 'Quando `n` é ímpar: elas se cruzam no centro.', correct: true },
          { id: 'b', text: 'Quando `n` é par.' },
          { id: 'c', text: 'Sempre.' },
          { id: 'd', text: 'Nunca.' },
        ],
        explanation:
          'A célula central existe apenas com lado ímpar, e nela `i == j` e `i + j == n - 1` valem ao mesmo tempo.',
      },
      {
        id: 's03c05l04q3',
        type: 'single',
        prompt: 'Por que um laço só é melhor que dois laços com `if (i == j)`?',
        options: [
          { id: 'a', text: 'Porque visita exatamente as `n` células da diagonal, em vez de testar as `n²`.', correct: true },
          { id: 'b', text: 'Porque o resultado seria diferente.' },
          { id: 'c', text: 'Porque `if` não funciona com índices.' },
          { id: 'd', text: 'São equivalentes em custo.' },
        ],
        explanation:
          'Os dois dão o mesmo resultado. A diferença é que um vai direto às células certas e o outro examina a matriz inteira para descartar quase tudo.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois uma matriz quadrada `n × n`. Mostre as duas diagonais, suas somas, e informe se elas se cruzam em alguma célula.',
      requirements: [
        'Linha 1: `Principal: 1 5 9`, da primeira linha para a última',
        'Linha 2: `Soma principal: s`',
        'Linha 3: `Secundaria: 3 5 7`, também da primeira linha para a última',
        'Linha 4: `Soma secundaria: s`',
        'Linha 5: `Cruzam no centro: True` ou `False`',
        'As duas se cruzam quando `n` é ímpar',
        'Use um único laço para percorrer as duas diagonais',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[,] m = new int[n, n];

        for (int i = 0; i < n; i++)
        {
            string[] partes = Console.ReadLine().Split(' ');
            for (int j = 0; j < n; j++)
            {
                m[i, j] = int.Parse(partes[j]);
            }
        }

        // Um laco de k percorre m[k, k] e m[k, n - 1 - k]
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[,] m = new int[n, n];

        for (int i = 0; i < n; i++)
        {
            string[] partes = Console.ReadLine().Split(' ');
            for (int j = 0; j < n; j++)
            {
                m[i, j] = int.Parse(partes[j]);
            }
        }

        string principal = "";
        string secundaria = "";
        int somaPrincipal = 0;
        int somaSecundaria = 0;

        for (int k = 0; k < n; k++)
        {
            principal += $"{m[k, k]} ";
            somaPrincipal += m[k, k];

            secundaria += $"{m[k, n - 1 - k]} ";
            somaSecundaria += m[k, n - 1 - k];
        }

        Console.WriteLine($"Principal: {principal}");
        Console.WriteLine($"Soma principal: {somaPrincipal}");
        Console.WriteLine($"Secundaria: {secundaria}");
        Console.WriteLine($"Soma secundaria: {somaSecundaria}");
        Console.WriteLine($"Cruzam no centro: {n % 2 == 1}");
    }
}
`,
      hints: [
        'A célula da diagonal secundária na linha `k` é `m[k, n - 1 - k]`.',
        'As duas diagonais podem ser montadas no mesmo laço, cada uma na sua `string` e no seu acumulador.',
      ],
      tests: [
        {
          name: 'Matriz ímpar: diagonais se cruzam',
          stdin: '3\n1 2 3\n4 5 6\n7 8 9\n',
          expectedStdout:
            'Principal: 1 5 9\nSoma principal: 15\nSecundaria: 3 5 7\nSoma secundaria: 15\nCruzam no centro: True',
        },
        {
          name: 'Matriz par: sem cruzamento',
          stdin: '2\n1 2\n3 4\n',
          expectedStdout:
            'Principal: 1 4\nSoma principal: 5\nSecundaria: 2 3\nSoma secundaria: 5\nCruzam no centro: False',
        },
        {
          name: 'Uma célula é as duas diagonais',
          stdin: '1\n7\n',
          expectedStdout:
            'Principal: 7\nSoma principal: 7\nSecundaria: 7\nSoma secundaria: 7\nCruzam no centro: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c05l05',
    title: 'Transposta',
    objective: 'Construir a matriz transposta em uma nova matriz, entendendo por que trocar no lugar não funciona.',
    concept: [
      {
        kind: 'text',
        body:
          'A **transposta** troca linhas por colunas: o que estava em `[i, j]` passa para `[j, i]`. Uma matriz `2 × 3` transposta vira `3 × 2` — as dimensões se invertem junto com os índices.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Original 2×3',
          code: `1  2  3
4  5  6`,
        },
        right: {
          label: 'Transposta 3×2',
          code: `1  4
2  5
3  6`,
        },
      },
      {
        kind: 'code',
        code: `int linhas = m.GetLength(0);
int colunas = m.GetLength(1);

int[,] t = new int[colunas, linhas];   // dimensoes invertidas

for (int i = 0; i < linhas; i++)
{
    for (int j = 0; j < colunas; j++)
    {
        t[j, i] = m[i, j];             // indices invertidos
    }
}`,
        caption: 'Duas inversões: nas dimensões do `new` e na atribuição.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Transpor **no lugar** não funciona para matrizes retangulares: uma `2 × 3` não tem o formato de uma `3 × 2`, então não há onde colocar os valores. E mesmo em matriz quadrada, trocar `m[i,j]` com `m[j,i]` em um laço completo desfaz cada troca ao chegar do outro lado.',
      },
      {
        kind: 'text',
        body:
          'Para transpor uma matriz quadrada no lugar, seria preciso percorrer apenas **metade** dela — o triângulo acima da diagonal, com `j` começando em `i + 1`. É a forma triangular do capítulo 3 da Seção 2.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma matriz é **simétrica** quando ela é igual à própria transposta, ou seja, quando `m[i, j] == m[j, i]` para todo par. Verificar isso não precisa construir a transposta: basta comparar as duas metades.',
      },
    ],
    quiz: [
      {
        id: 's03c05l05q1',
        type: 'single',
        prompt: 'Qual é a dimensão da transposta de uma matriz `4 × 7`?',
        options: [
          { id: 'a', code: '7 x 4', correct: true },
          { id: 'b', code: '4 x 7' },
          { id: 'c', code: '4 x 4' },
          { id: 'd', code: '7 x 7' },
        ],
        explanation:
          'Linhas viram colunas e vice-versa. É por isso que o `new` da transposta usa as dimensões trocadas.',
      },
      {
        id: 's03c05l05q2',
        type: 'single',
        prompt: 'Por que não dá para transpor uma matriz retangular no lugar?',
        options: [
          { id: 'a', text: 'Porque as dimensões mudam, e a matriz original não tem o formato do resultado.', correct: true },
          { id: 'b', text: 'Porque o C# proíbe alterar matrizes.' },
          { id: 'c', text: 'Porque a operação é lenta demais.' },
          { id: 'd', text: 'Dá: basta trocar `m[i,j]` com `m[j,i]`.' },
        ],
        explanation:
          'Em uma `2 × 3`, o índice `m[2, 0]` da transposta nem existe na original. A transposição retangular precisa obrigatoriamente de uma matriz nova.',
      },
      {
        id: 's03c05l05q3',
        type: 'single',
        prompt: 'O que caracteriza uma matriz simétrica?',
        options: [
          { id: 'a', code: 'm[i, j] == m[j, i] para todo par', correct: true },
          { id: 'b', text: 'Todas as linhas têm a mesma soma.' },
          { id: 'c', text: 'As duas diagonais são iguais.' },
          { id: 'd', text: 'Ela é quadrada.' },
        ],
        explanation:
          'Ser quadrada é condição necessária, mas não suficiente. A simetria é a igualdade com a própria transposta, célula a célula.',
      },
    ],
    challenge: {
      brief:
        'Leia uma matriz e construa a sua transposta em uma matriz nova. Mostre as duas, cada uma precedida por suas dimensões.',
      requirements: [
        'Linha 1: `Original: 2x3`, com as dimensões da matriz lida',
        'Em seguida, uma linha por linha da matriz original',
        'Depois: `Transposta: 3x2`',
        'Em seguida, uma linha por linha da transposta',
        'A ordem da entrada é: `linhas`, `colunas`, e depois uma linha por linha da matriz',
        'Crie uma matriz nova com as dimensões invertidas',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int linhas = int.Parse(Console.ReadLine());
        int colunas = int.Parse(Console.ReadLine());

        int[,] m = new int[linhas, colunas];

        for (int i = 0; i < linhas; i++)
        {
            string[] partes = Console.ReadLine().Split(' ');
            for (int j = 0; j < colunas; j++)
            {
                m[i, j] = int.Parse(partes[j]);
            }
        }

        // Crie a transposta com as dimensoes invertidas e preencha
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int linhas = int.Parse(Console.ReadLine());
        int colunas = int.Parse(Console.ReadLine());

        int[,] m = new int[linhas, colunas];

        for (int i = 0; i < linhas; i++)
        {
            string[] partes = Console.ReadLine().Split(' ');
            for (int j = 0; j < colunas; j++)
            {
                m[i, j] = int.Parse(partes[j]);
            }
        }

        int[,] t = new int[colunas, linhas];

        for (int i = 0; i < linhas; i++)
        {
            for (int j = 0; j < colunas; j++)
            {
                t[j, i] = m[i, j];
            }
        }

        Console.WriteLine($"Original: {linhas}x{colunas}");

        for (int i = 0; i < m.GetLength(0); i++)
        {
            string linha = "";
            for (int j = 0; j < m.GetLength(1); j++)
            {
                linha += $"{m[i, j]} ";
            }
            Console.WriteLine(linha);
        }

        Console.WriteLine($"Transposta: {colunas}x{linhas}");

        for (int i = 0; i < t.GetLength(0); i++)
        {
            string linha = "";
            for (int j = 0; j < t.GetLength(1); j++)
            {
                linha += $"{t[i, j]} ";
            }
            Console.WriteLine(linha);
        }
    }
}
`,
      hints: [
        'A transposta é `new int[colunas, linhas]`: as dimensões trocam de lugar.',
        'O preenchimento é `t[j, i] = m[i, j]`, com os índices invertidos na atribuição.',
      ],
      tests: [
        {
          name: 'Retangular dois por três',
          stdin: '2\n3\n1 2 3\n4 5 6\n',
          expectedStdout:
            'Original: 2x3\n1 2 3\n4 5 6\nTransposta: 3x2\n1 4\n2 5\n3 6',
        },
        {
          name: 'Quadrada',
          stdin: '2\n2\n1 2\n3 4\n',
          expectedStdout:
            'Original: 2x2\n1 2\n3 4\nTransposta: 2x2\n1 3\n2 4',
        },
        {
          name: 'Uma linha vira uma coluna',
          stdin: '1\n3\n7 8 9\n',
          expectedStdout:
            'Original: 1x3\n7 8 9\nTransposta: 3x1\n7\n8\n9',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c05l06',
    title: 'Arrays irregulares (jagged)',
    objective: 'Usar um array de arrays quando as linhas têm comprimentos diferentes, e distinguir `int[][]` de `int[,]`.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma matriz `int[,]` é retangular: todas as linhas têm o mesmo tamanho. Quando isso não vale — turmas com quantidades diferentes de alunos, dias com números diferentes de registros —, o tipo certo é o **array irregular**, ou *jagged*.',
      },
      {
        kind: 'code',
        code: `int[][] dados = new int[3][];    // 3 linhas, tamanhos ainda indefinidos

dados[0] = new int[2];           // esta linha tem 2 colunas
dados[1] = new int[4];           // esta tem 4
dados[2] = new int[1];           // esta tem 1

dados[1][3] = 9;                 // dois pares de colchetes`,
        caption: 'Cada linha é um array independente, criado com o seu próprio tamanho.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Retangular `int[,]`',
          code: `m[i, j]
m.GetLength(0)
m.GetLength(1)`,
        },
        right: {
          label: 'Irregular `int[][]`',
          code: `d[i][j]
d.Length
d[i].Length`,
        },
        note: 'A sintaxe muda: uma vírgula contra dois pares de colchetes.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'No irregular **não existe** `GetLength(1)`: não há uma quantidade de colunas única. O comprimento de cada linha é `d[i].Length`, e ele pode ser diferente a cada `i`.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um `int[][]` recém-criado tem todas as linhas em `null` — elas ainda não são arrays. Esquecer de criar cada linha com `new` é o erro clássico, e ele só aparece em tempo de execução, ao tentar usar a linha.',
      },
      {
        kind: 'text',
        body:
          'Como cada linha é um array separado, o laço interno precisa consultar o tamanho **daquela** linha: `for (int j = 0; j < d[i].Length; j++)`. Usar um tamanho fixo estoura os limites na primeira linha mais curta.',
      },
    ],
    quiz: [
      {
        id: 's03c05l06q1',
        type: 'single',
        prompt: 'Como acessar a coluna 3 da linha 1 em um `int[][]`?',
        options: [
          { id: 'a', code: 'd[1][3]', correct: true },
          { id: 'b', code: 'd[1, 3]' },
          { id: 'c', code: 'd[3][1]' },
          { id: 'd', code: 'd.GetValue(1, 3)' },
        ],
        explanation:
          'A primeira indexação escolhe a linha, que é um array; a segunda indexa dentro dela. A forma com vírgula é a da matriz retangular.',
      },
      {
        id: 's03c05l06q2',
        type: 'single',
        prompt: 'O que contém `new int[3][]` logo após a criação?',
        options: [
          { id: 'a', text: 'Três linhas em `null`: nenhum array foi criado ainda.', correct: true },
          { id: 'b', text: 'Três arrays vazios.' },
          { id: 'c', text: 'Três arrays de tamanho 3.' },
          { id: 'd', text: 'Não compila sem o segundo tamanho.' },
        ],
        explanation:
          'O `new` externo cria apenas o array de referências. Cada linha ainda precisa do seu próprio `new int[...]` antes de ser usada.',
      },
      {
        id: 's03c05l06q3',
        type: 'single',
        prompt: 'Como descobrir quantas colunas tem a linha `i` de um array irregular?',
        options: [
          { id: 'a', code: 'd[i].Length', correct: true },
          { id: 'b', code: 'd.GetLength(1)' },
          { id: 'c', code: 'd.Length' },
          { id: 'd', text: 'Todas as linhas têm o mesmo tamanho.' },
        ],
        explanation:
          '`d.Length` dá o número de linhas, e `GetLength(1)` nem existe aqui. Cada linha responde pelo próprio tamanho, e é isso que torna o tipo irregular.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` linhas, cada uma com uma quantidade própria de números separados por espaço. Guarde tudo em um array irregular e produza o relatório de cada linha.',
      requirements: [
        'Uma linha por linha lida, no formato `Linha 0 (2): 1 2`, com o índice, o comprimento entre parênteses e os valores',
        'Depois: `Linhas: n`',
        'Depois: `Total de elementos: t`, somando os comprimentos de todas as linhas',
        'Por último: `Soma: s`, somando todos os valores',
        'Cada linha da entrada define o próprio comprimento',
        'Use `int[][]`, não `int[,]`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[][] dados = new int[n][];

        // Cada linha vira um array do tamanho do que foi lido

        // Relatorio por linha, depois os totais
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[][] dados = new int[n][];

        for (int i = 0; i < n; i++)
        {
            string[] partes = Console.ReadLine().Split(' ');
            dados[i] = new int[partes.Length];

            for (int j = 0; j < partes.Length; j++)
            {
                dados[i][j] = int.Parse(partes[j]);
            }
        }

        int totalElementos = 0;
        int soma = 0;

        for (int i = 0; i < dados.Length; i++)
        {
            string linha = "";

            for (int j = 0; j < dados[i].Length; j++)
            {
                linha += $"{dados[i][j]} ";
                soma += dados[i][j];
            }

            Console.WriteLine($"Linha {i} ({dados[i].Length}): {linha}");
            totalElementos += dados[i].Length;
        }

        Console.WriteLine($"Linhas: {dados.Length}");
        Console.WriteLine($"Total de elementos: {totalElementos}");
        Console.WriteLine($"Soma: {soma}");
    }
}
`,
      hints: [
        'O `Split` já diz o tamanho da linha: `dados[i] = new int[partes.Length];`.',
        'O laço interno usa `dados[i].Length`, que muda a cada linha.',
      ],
      tests: [
        {
          name: 'Três linhas de tamanhos diferentes',
          stdin: '3\n1 2\n3 4 5 6\n7\n',
          expectedStdout:
            'Linha 0 (2): 1 2\nLinha 1 (4): 3 4 5 6\nLinha 2 (1): 7\n' +
            'Linhas: 3\nTotal de elementos: 7\nSoma: 28',
        },
        {
          name: 'Uma linha só',
          stdin: '1\n5\n',
          expectedStdout:
            'Linha 0 (1): 5\nLinhas: 1\nTotal de elementos: 1\nSoma: 5',
        },
        {
          name: 'Valores repetidos e negativos',
          stdin: '2\n1 1 1\n-2\n',
          expectedStdout:
            'Linha 0 (3): 1 1 1\nLinha 1 (1): -2\nLinhas: 2\nTotal de elementos: 4\nSoma: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c05l07',
    title: 'Multiplicação de matrizes',
    objective: 'Implementar o produto de matrizes com três laços aninhados, respeitando a compatibilidade das dimensões.',
    concept: [
      {
        kind: 'text',
        body:
          'Multiplicar matrizes não é multiplicar célula a célula. Cada célula do resultado é a **soma dos produtos** de uma linha da primeira com uma coluna da segunda.',
      },
      {
        kind: 'code',
        code: `// C[i, j] = soma de A[i, k] * B[k, j], para todo k

for (int i = 0; i < m; i++)
{
    for (int j = 0; j < p; j++)
    {
        int soma = 0;

        for (int k = 0; k < n; k++)
        {
            soma += a[i, k] * b[k, j];
        }

        c[i, j] = soma;
    }
}`,
        caption: 'Três laços: linha do resultado, coluna do resultado, e o índice que percorre a linha e a coluna.',
      },
      {
        kind: 'text',
        body:
          'As dimensões precisam ser **compatíveis**: o número de colunas de A tem que ser igual ao de linhas de B. O resultado tem as linhas de A e as colunas de B.',
      },
      {
        kind: 'table',
        headers: ['Matriz', 'Dimensão'],
        rows: [
          ['A', '`m × n`'],
          ['B', '`n × p`'],
          ['C = A · B', '`m × p`'],
          ['operações', '`m · n · p`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O `k` é o índice compartilhado: ele é a **coluna** em A e a **linha** em B. Escrever `a[i, k] * b[j, k]` compila e produz números errados — em matriz não quadrada, vira exceção de índice.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Este é o primeiro algoritmo cúbico do curso: multiplicar duas matrizes `1000 × 1000` custa um bilhão de operações. É por isso que multiplicação de matrizes é a referência de desempenho de praticamente todo hardware numérico.',
      },
      {
        kind: 'text',
        body:
          'A multiplicação também **não é comutativa**: `A · B` e `B · A` costumam ter dimensões diferentes, e quando têm a mesma, os resultados quase nunca coincidem.',
      },
    ],
    quiz: [
      {
        id: 's03c05l07q1',
        type: 'single',
        prompt: 'Multiplicando uma matriz `2 × 3` por uma `3 × 4`, qual é a dimensão do resultado?',
        options: [
          { id: 'a', code: '2 x 4', correct: true },
          { id: 'b', code: '3 x 3' },
          { id: 'c', code: '2 x 3' },
          { id: 'd', text: 'As dimensões são incompatíveis.' },
        ],
        explanation:
          'As dimensões internas (3 e 3) precisam casar e desaparecem; as externas (2 e 4) formam o resultado.',
      },
      {
        id: 's03c05l07q2',
        type: 'single',
        prompt: 'Qual é a expressão correta dentro do laço mais interno?',
        options: [
          { id: 'a', code: 'a[i, k] * b[k, j]', correct: true },
          { id: 'b', code: 'a[i, k] * b[j, k]' },
          { id: 'c', code: 'a[k, i] * b[k, j]' },
          { id: 'd', code: 'a[i, j] * b[i, j]' },
        ],
        explanation:
          'O `k` é coluna em A e linha em B. A última alternativa é a multiplicação célula a célula, que é uma operação diferente.',
      },
      {
        id: 's03c05l07q3',
        type: 'single',
        prompt: 'Quantas multiplicações são feitas para `A(2×3) · B(3×2)`?',
        options: [
          { id: 'a', code: '12', correct: true },
          { id: 'b', code: '6' },
          { id: 'c', code: '4' },
          { id: 'd', code: '18' },
        ],
        explanation:
          'São `m · n · p = 2 · 3 · 2`. Cada uma das 4 células do resultado exige 3 multiplicações.',
      },
    ],
    challenge: {
      brief:
        'Leia três inteiros `m`, `n` e `p`, depois uma matriz A de dimensão `m × n` e uma matriz B de dimensão `n × p`. Calcule o produto e informe quantas multiplicações foram necessárias.',
      requirements: [
        'Linha 1: `Resultado: 2x2`, com as dimensões do produto',
        'Em seguida, uma linha por linha do resultado, com os valores separados por espaço',
        'Por último: `Operacoes: k`, o total de multiplicações realizadas',
        'A ordem da entrada é: `m`, `n`, `p`, as `m` linhas de A, e as `n` linhas de B',
        'Conte as operações com um contador dentro do laço, não pela fórmula',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int m = int.Parse(Console.ReadLine());
        int n = int.Parse(Console.ReadLine());
        int p = int.Parse(Console.ReadLine());

        int[,] a = new int[m, n];
        for (int i = 0; i < m; i++)
        {
            string[] partes = Console.ReadLine().Split(' ');
            for (int j = 0; j < n; j++)
            {
                a[i, j] = int.Parse(partes[j]);
            }
        }

        int[,] b = new int[n, p];
        for (int i = 0; i < n; i++)
        {
            string[] partes = Console.ReadLine().Split(' ');
            for (int j = 0; j < p; j++)
            {
                b[i, j] = int.Parse(partes[j]);
            }
        }

        // Tres lacos: i, j, e o k compartilhado
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int m = int.Parse(Console.ReadLine());
        int n = int.Parse(Console.ReadLine());
        int p = int.Parse(Console.ReadLine());

        int[,] a = new int[m, n];
        for (int i = 0; i < m; i++)
        {
            string[] partes = Console.ReadLine().Split(' ');
            for (int j = 0; j < n; j++)
            {
                a[i, j] = int.Parse(partes[j]);
            }
        }

        int[,] b = new int[n, p];
        for (int i = 0; i < n; i++)
        {
            string[] partes = Console.ReadLine().Split(' ');
            for (int j = 0; j < p; j++)
            {
                b[i, j] = int.Parse(partes[j]);
            }
        }

        int[,] c = new int[m, p];
        int operacoes = 0;

        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < p; j++)
            {
                int soma = 0;

                for (int k = 0; k < n; k++)
                {
                    soma += a[i, k] * b[k, j];
                    operacoes++;
                }

                c[i, j] = soma;
            }
        }

        Console.WriteLine($"Resultado: {m}x{p}");

        for (int i = 0; i < m; i++)
        {
            string linha = "";
            for (int j = 0; j < p; j++)
            {
                linha += $"{c[i, j]} ";
            }
            Console.WriteLine(linha);
        }

        Console.WriteLine($"Operacoes: {operacoes}");
    }
}
`,
      hints: [
        'O acumulador `soma` nasce dentro do laço de `j`: cada célula do resultado tem o seu.',
        'O contador de operações sobe uma vez por multiplicação, no laço mais interno.',
      ],
      tests: [
        {
          name: 'Duas por três vezes três por duas',
          stdin: '2\n3\n2\n1 2 3\n4 5 6\n7 8\n9 10\n11 12\n',
          expectedStdout: 'Resultado: 2x2\n58 64\n139 154\nOperacoes: 12',
        },
        {
          name: 'Multiplicar pela identidade preserva a matriz',
          stdin: '2\n2\n2\n1 2\n3 4\n1 0\n0 1\n',
          expectedStdout: 'Resultado: 2x2\n1 2\n3 4\nOperacoes: 8',
        },
        {
          name: 'Uma célula por uma célula',
          stdin: '1\n1\n1\n5\n3\n',
          expectedStdout: 'Resultado: 1x1\n15\nOperacoes: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c05l08',
    title: 'Vizinhos em um grid',
    objective: 'Visitar as oito células ao redor de uma posição, descartando as que caem fora da matriz.',
    concept: [
      {
        kind: 'text',
        body:
          'Muitos problemas de grid — jogos, simulações, processamento de imagem — precisam olhar ao redor de uma célula. A técnica padrão usa dois laços de **deslocamento**, de `-1` a `1`.',
      },
      {
        kind: 'code',
        code: `for (int di = -1; di <= 1; di++)
{
    for (int dj = -1; dj <= 1; dj++)
    {
        if (di == 0 && dj == 0) continue;   // a propria celula

        int ni = i + di;
        int nj = j + dj;

        if (ni >= 0 && ni < linhas && nj >= 0 && nj < colunas)
        {
            // m[ni, nj] e um vizinho valido
        }
    }
}`,
        caption: 'Nove combinações, menos a própria célula, menos as que saem da matriz.',
      },
      {
        kind: 'table',
        headers: ['Posição', 'Vizinhos válidos'],
        rows: [
          ['centro', '8'],
          ['borda (não canto)', '5'],
          ['canto', '3'],
          ['grid 1×1', '0'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A guarda de limites precisa cobrir as **quatro** pontas: linha mínima, linha máxima, coluna mínima e coluna máxima. Esquecer qualquer uma faz o programa quebrar exatamente nas bordas — que é onde ele mais vai rodar em um grid pequeno.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O `continue` para `di == 0 && dj == 0` é o que exclui a própria célula. Sem ele, a célula central entraria na conta como se fosse sua própria vizinha — um erro que passa despercebido em somas e destrói contagens.',
      },
      {
        kind: 'text',
        body:
          'Essa vizinhança de oito células é chamada de vizinhança de Moore. Alguns problemas usam apenas as quatro ortogonais, a vizinhança de Von Neumann, obtida com a condição extra de que `di` ou `dj` seja zero.',
      },
    ],
    quiz: [
      {
        id: 's03c05l08q1',
        type: 'single',
        prompt: 'Quantos vizinhos tem uma célula de canto em um grid de pelo menos 2×2?',
        options: [
          { id: 'a', code: '3', correct: true },
          { id: 'b', code: '8' },
          { id: 'c', code: '5' },
          { id: 'd', code: '4' },
        ],
        explanation:
          'Das oito posições ao redor, cinco caem fora da matriz. Sobram a da direita, a de baixo e a diagonal entre as duas.',
      },
      {
        id: 's03c05l08q2',
        type: 'single',
        prompt: 'Para que serve o `continue` quando `di` e `dj` são ambos zero?',
        options: [
          { id: 'a', text: 'Para não contar a própria célula como vizinha dela mesma.', correct: true },
          { id: 'b', text: 'Para evitar índice negativo.' },
          { id: 'c', text: 'Para pular a diagonal.' },
          { id: 'd', text: 'Não é necessário.' },
        ],
        explanation:
          'Com deslocamento zero nas duas direções, `ni` e `nj` apontam para a célula de partida. Ela sempre passa na guarda de limites, então precisa ser excluída explicitamente.',
      },
      {
        id: 's03c05l08q3',
        type: 'single',
        prompt: 'Quantas condições a guarda de limites precisa testar?',
        options: [
          { id: 'a', text: 'Quatro: mínimo e máximo de linha, mínimo e máximo de coluna.', correct: true },
          { id: 'b', text: 'Duas: máximo de linha e de coluna.' },
          { id: 'c', text: 'Uma: se a célula existe.' },
          { id: 'd', text: 'Oito, uma por vizinho.' },
        ],
        explanation:
          'Os deslocamentos negativos podem produzir índices menores que zero, e os positivos podem passar do limite. As duas pontas de cada dimensão precisam ser cobertas.',
      },
    ],
    challenge: {
      brief:
        'Leia uma matriz e uma posição `(i, j)` dentro dela. Informe quantos vizinhos essa célula tem, a soma dos valores deles, e qual é o maior.',
      requirements: [
        'Linha 1: `Vizinhos: v`, contando apenas as células que existem na matriz',
        'Linha 2: `Soma: s`',
        'Linha 3: `Maior: M`, ou `0` se não houver nenhum vizinho',
        'A própria célula não conta como vizinha',
        'Considere as oito posições ao redor, incluindo as diagonais',
        'A ordem da entrada é: `linhas`, `colunas`, as linhas da matriz, `i` e `j`',
        'A posição informada é sempre válida',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int linhas = int.Parse(Console.ReadLine());
        int colunas = int.Parse(Console.ReadLine());

        int[,] m = new int[linhas, colunas];
        for (int a = 0; a < linhas; a++)
        {
            string[] partes = Console.ReadLine().Split(' ');
            for (int b = 0; b < colunas; b++)
            {
                m[a, b] = int.Parse(partes[b]);
            }
        }

        int i = int.Parse(Console.ReadLine());
        int j = int.Parse(Console.ReadLine());

        int vizinhos = 0;
        int soma = 0;
        int maior = 0;

        // Dois lacos de deslocamento, de -1 a 1, com guarda de limites

        Console.WriteLine($"Vizinhos: {vizinhos}");
        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Maior: {maior}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int linhas = int.Parse(Console.ReadLine());
        int colunas = int.Parse(Console.ReadLine());

        int[,] m = new int[linhas, colunas];
        for (int a = 0; a < linhas; a++)
        {
            string[] partes = Console.ReadLine().Split(' ');
            for (int b = 0; b < colunas; b++)
            {
                m[a, b] = int.Parse(partes[b]);
            }
        }

        int i = int.Parse(Console.ReadLine());
        int j = int.Parse(Console.ReadLine());

        int vizinhos = 0;
        int soma = 0;
        int maior = 0;

        for (int di = -1; di <= 1; di++)
        {
            for (int dj = -1; dj <= 1; dj++)
            {
                if (di == 0 && dj == 0)
                {
                    continue;
                }

                int ni = i + di;
                int nj = j + dj;

                if (ni >= 0 && ni < linhas && nj >= 0 && nj < colunas)
                {
                    if (vizinhos == 0 || m[ni, nj] > maior)
                    {
                        maior = m[ni, nj];
                    }

                    soma += m[ni, nj];
                    vizinhos++;
                }
            }
        }

        Console.WriteLine($"Vizinhos: {vizinhos}");
        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Maior: {maior}");
    }
}
`,
      hints: [
        'O `continue` de `di == 0 && dj == 0` precisa vir antes de calcular `ni` e `nj`.',
        'Para o maior funcionar com valores negativos, use o **primeiro** vizinho encontrado como ponto de partida em vez de zero.',
      ],
      tests: [
        {
          name: 'Centro de um grid três por três',
          stdin: '3\n3\n1 2 3\n4 5 6\n7 8 9\n1\n1\n',
          expectedStdout: 'Vizinhos: 8\nSoma: 40\nMaior: 9',
        },
        {
          name: 'Canto superior esquerdo',
          stdin: '3\n3\n1 2 3\n4 5 6\n7 8 9\n0\n0\n',
          expectedStdout: 'Vizinhos: 3\nSoma: 11\nMaior: 5',
        },
        {
          name: 'Canto inferior direito',
          stdin: '3\n3\n1 2 3\n4 5 6\n7 8 9\n2\n2\n',
          expectedStdout: 'Vizinhos: 3\nSoma: 19\nMaior: 8',
        },
        {
          name: 'Grid de uma célula: sem vizinhos',
          stdin: '1\n1\n7\n0\n0\n',
          expectedStdout: 'Vizinhos: 0\nSoma: 0\nMaior: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c05l09',
    title: 'Prática: campo minado',
    objective: 'Aplicar a varredura de vizinhos a um grid inteiro, gerando o tabuleiro anotado do campo minado.',
    concept: [
      {
        kind: 'text',
        body:
          'O campo minado é a aplicação canônica da vizinhança: para **cada** célula sem mina, conte quantas das oito ao redor têm mina. É a lição anterior aplicada a todas as posições em vez de a uma só.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Entrada',
          code: `*..
...
..*`,
        },
        right: {
          label: 'Saída',
          code: `*10
121
01*`,
        },
        note: 'As mesmas posições de mina, agora com a contagem de vizinhança em todo o resto.',
      },
      {
        kind: 'code',
        code: `if (campo[i, j] == '*')
{
    saida += "*";      // mina permanece mina
    continue;
}

int conta = 0;
// ... dois lacos de deslocamento contando '*' ao redor
saida += conta;`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A célula com mina **não** recebe contagem: ela sai como `*`. Calcular a vizinhança dela seria trabalho jogado fora, e imprimir um número no lugar da mina esconderia a informação principal do tabuleiro.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A varredura completa custa `linhas × colunas × 8` verificações: são três laços aninhados escondidos em dois. Para um tabuleiro de 30 × 16, o padrão do nível difícil, são menos de 4 mil verificações — instantâneo.',
      },
      {
        kind: 'text',
        body:
          'Este exercício recebe o campo pela entrada, e não sorteado. Isso é deliberado: um tabuleiro aleatório tornaria a saída imprevisível e o exercício impossível de testar. Com semente fixa daria para sortear, mas ler o campo é mais direto.',
      },
    ],
    quiz: [
      {
        id: 's03c05l09q1',
        type: 'single',
        prompt: 'O que deve aparecer na saída na posição de uma mina?',
        options: [
          { id: 'a', text: 'O próprio `*`, sem contagem.', correct: true },
          { id: 'b', text: 'A contagem de minas vizinhas.' },
          { id: 'c', text: 'O número 9.' },
          { id: 'd', text: 'Um espaço.' },
        ],
        explanation:
          'A contagem só faz sentido para células sem mina. Substituir o `*` por um número apagaria justamente a informação que o tabuleiro precisa mostrar.',
      },
      {
        id: 's03c05l09q2',
        type: 'single',
        prompt: 'No campo `*..` / `...` / `..*`, qual é a contagem da célula central?',
        options: [
          { id: 'a', code: '2', correct: true },
          { id: 'b', code: '1' },
          { id: 'c', code: '0' },
          { id: 'd', code: '8' },
        ],
        explanation:
          'A célula central é vizinha das duas minas, nos cantos opostos. Ela é a única posição do tabuleiro que enxerga as duas.',
      },
      {
        id: 's03c05l09q3',
        type: 'single',
        prompt: 'Por que o campo é lido da entrada em vez de sorteado?',
        options: [
          { id: 'a', text: 'Porque um tabuleiro aleatório produziria saída imprevisível e não testável.', correct: true },
          { id: 'b', text: 'Porque `Random` não funciona com grids.' },
          { id: 'c', text: 'Porque sortear seria mais lento.' },
          { id: 'd', text: 'Porque o campo minado real não usa sorteio.' },
        ],
        explanation:
          'Com semente fixa o sorteio também seria determinístico, mas ler o campo deixa cada caso de teste explícito — inclusive os de borda, que um sorteio raramente produziria.',
      },
    ],
    challenge: {
      brief:
        'Leia as dimensões de um campo minado e depois o tabuleiro, uma linha por vez, onde `*` é mina e `.` é célula livre. Produza o tabuleiro anotado, em que cada célula livre mostra quantas minas há ao seu redor.',
      requirements: [
        'Uma linha por linha do tabuleiro, sem espaços entre os caracteres',
        'Células com mina saem como `*`',
        'Células livres saem com o número de minas vizinhas, de `0` a `8`',
        'A vizinhança inclui as oito posições ao redor, com as diagonais',
        'Por último: `Minas: k`, o total de minas no campo',
        'A ordem da entrada é: `linhas`, `colunas`, e depois as linhas do tabuleiro',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int linhas = int.Parse(Console.ReadLine());
        int colunas = int.Parse(Console.ReadLine());

        char[,] campo = new char[linhas, colunas];

        for (int i = 0; i < linhas; i++)
        {
            string linha = Console.ReadLine();
            for (int j = 0; j < colunas; j++)
            {
                campo[i, j] = linha[j];
            }
        }

        // Para cada celula livre, conte as minas ao redor
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int linhas = int.Parse(Console.ReadLine());
        int colunas = int.Parse(Console.ReadLine());

        char[,] campo = new char[linhas, colunas];

        for (int i = 0; i < linhas; i++)
        {
            string linha = Console.ReadLine();
            for (int j = 0; j < colunas; j++)
            {
                campo[i, j] = linha[j];
            }
        }

        int minas = 0;

        for (int i = 0; i < linhas; i++)
        {
            for (int j = 0; j < colunas; j++)
            {
                if (campo[i, j] == '*')
                {
                    minas++;
                }
            }
        }

        for (int i = 0; i < linhas; i++)
        {
            string saida = "";

            for (int j = 0; j < colunas; j++)
            {
                if (campo[i, j] == '*')
                {
                    saida += "*";
                    continue;
                }

                int conta = 0;

                for (int di = -1; di <= 1; di++)
                {
                    for (int dj = -1; dj <= 1; dj++)
                    {
                        if (di == 0 && dj == 0)
                        {
                            continue;
                        }

                        int ni = i + di;
                        int nj = j + dj;

                        if (ni >= 0 && ni < linhas && nj >= 0 && nj < colunas
                            && campo[ni, nj] == '*')
                        {
                            conta++;
                        }
                    }
                }

                saida += conta;
            }

            Console.WriteLine(saida);
        }

        Console.WriteLine($"Minas: {minas}");
    }
}
`,
      hints: [
        'A contagem total de minas pode ser feita em uma varredura separada, antes de montar o tabuleiro.',
        'Dentro do laço das colunas, trate a mina primeiro com um `continue` — assim o resto do corpo só cuida das células livres.',
      ],
      tests: [
        {
          name: 'Duas minas em cantos opostos',
          stdin: '3\n3\n*..\n...\n..*\n',
          expectedStdout: '*10\n121\n01*\nMinas: 2',
        },
        {
          name: 'Campo sem minas',
          stdin: '2\n2\n..\n..\n',
          expectedStdout: '00\n00\nMinas: 0',
        },
        {
          name: 'Duas minas na mesma linha',
          stdin: '2\n3\n*.*\n...\n',
          expectedStdout: '*2*\n121\nMinas: 2',
        },
        {
          name: 'Campo de uma célula com mina',
          stdin: '1\n1\n*\n',
          expectedStdout: '*\nMinas: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c05l10',
    title: 'Checkpoint: dados 2D',
    objective: 'Produzir um dossiê completo de uma matriz quadrada: agregações, diagonais, extremo e simetria.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint analisa uma matriz quadrada por seis ângulos. Cada um usa uma varredura diferente, e reconhecer qual é a certa em cada caso é o exercício.',
      },
      {
        kind: 'table',
        headers: ['Resultado', 'Varredura', 'Custo'],
        rows: [
          ['somas por linha', '`i` externo, `j` interno', '`n²`'],
          ['somas por coluna', '`j` externo, `i` interno', '`n²`'],
          ['diagonais', 'um laço só', '`n`'],
          ['maior e posição', 'varredura completa', '`n²`'],
          ['simetria', 'metade da matriz', '`n² / 2`'],
        ],
      },
      {
        kind: 'text',
        body:
          'A verificação de **simetria** só precisa comparar metade das células: se `m[i, j] == m[j, i]` vale para todo par com `j > i`, o outro triângulo é consequência. É a forma triangular do capítulo de laços aninhados.',
      },
      {
        kind: 'code',
        code: `bool simetrica = true;

for (int i = 0; i < n && simetrica; i++)
{
    for (int j = i + 1; j < n; j++)
    {
        if (m[i, j] != m[j, i])
        {
            simetrica = false;
            break;
        }
    }
}`,
        caption: 'O `j` começa em `i + 1`: só o triângulo acima da diagonal é examinado.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A diagonal principal nunca precisa ser testada na simetria: `m[i, i] == m[i, i]` é trivialmente verdadeiro. Começar o `j` em `i + 1` já a exclui de graça.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Para o maior valor, a comparação usa `>` estrito e a varredura vai por linhas — assim a posição registrada é a **primeira** ocorrência do máximo. E o valor inicial precisa ser a primeira célula, não zero: uma matriz inteiramente negativa mostraria isso na hora.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Resolva uma linha da saída por vez, rodando os testes a cada uma. As duas matrizes de teste mais reveladoras são a simétrica e a totalmente negativa: juntas elas pegam quase todo erro possível aqui.',
      },
    ],
    quiz: [
      {
        id: 's03c05l10q1',
        type: 'single',
        prompt: 'Por que a verificação de simetria começa o `j` em `i + 1`?',
        options: [
          { id: 'a', text: 'Para examinar só metade da matriz e pular a diagonal, que é sempre simétrica.', correct: true },
          { id: 'b', text: 'Para evitar índice fora dos limites.' },
          { id: 'c', text: 'Porque a diagonal pode quebrar a simetria.' },
          { id: 'd', text: 'É indiferente: `j = 0` daria o mesmo custo.' },
        ],
        explanation:
          'Cada par `(i, j)` e `(j, i)` seria testado duas vezes com `j = 0`, e a diagonal se compararia consigo mesma. A forma triangular elimina os dois desperdícios.',
      },
      {
        id: 's03c05l10q2',
        type: 'single',
        prompt: 'A matriz `[[1,2,3],[2,4,5],[3,5,6]]` é simétrica?',
        options: [
          { id: 'a', text: 'Sim: cada `m[i,j]` é igual ao `m[j,i]` correspondente.', correct: true },
          { id: 'b', text: 'Não: as diagonais são diferentes.' },
          { id: 'c', text: 'Não: as somas de linha e coluna não batem.' },
          { id: 'd', text: 'Só se ela for quadrada.' },
        ],
        explanation:
          'Os pares fora da diagonal são `2 = 2`, `3 = 3` e `5 = 5`. Numa matriz simétrica, aliás, a soma de cada linha é sempre igual à da coluna de mesmo índice.',
      },
      {
        id: 's03c05l10q3',
        type: 'single',
        prompt: 'Por que o maior valor não deve ser inicializado com zero?',
        options: [
          { id: 'a', text: 'Porque uma matriz inteiramente negativa daria zero como resposta.', correct: true },
          { id: 'b', text: 'Porque zero pode estar na matriz.' },
          { id: 'c', text: 'Porque o C# não permite.' },
          { id: 'd', text: 'Pode ser zero sem problema.' },
        ],
        explanation:
          'É o mesmo erro da busca de máximo da Seção 2, agora em duas dimensões: o ponto de partida precisa ser um dado real ou o mínimo do tipo.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois uma matriz quadrada `n × n`. Produza um dossiê com as somas por linha e por coluna, as somas das duas diagonais, o maior valor com sua posição, e se a matriz é simétrica.',
      requirements: [
        'Linha 1: `Somas por linha: 6 15 24`, na ordem das linhas',
        'Linha 2: `Somas por coluna: 12 15 18`',
        'Linha 3: `Diagonal principal: s`',
        'Linha 4: `Diagonal secundaria: s`',
        'Linha 5: `Maior: 9 em (2,2)`, com a linha e a coluna entre parênteses',
        'Linha 6: `Simetrica: True` ou `False`',
        'Em caso de empate no maior valor, vale a **primeira** ocorrência na varredura por linhas',
        'Valores negativos são válidos, e a matriz pode ser inteiramente negativa',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[,] m = new int[n, n];

        for (int i = 0; i < n; i++)
        {
            string[] partes = Console.ReadLine().Split(' ');
            for (int j = 0; j < n; j++)
            {
                m[i, j] = int.Parse(partes[j]);
            }
        }

        // Somas, diagonais, maior com posicao, e simetria
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[,] m = new int[n, n];

        for (int i = 0; i < n; i++)
        {
            string[] partes = Console.ReadLine().Split(' ');
            for (int j = 0; j < n; j++)
            {
                m[i, j] = int.Parse(partes[j]);
            }
        }

        string somasLinha = "";
        for (int i = 0; i < n; i++)
        {
            int soma = 0;
            for (int j = 0; j < n; j++)
            {
                soma += m[i, j];
            }
            somasLinha += $"{soma} ";
        }

        string somasColuna = "";
        for (int j = 0; j < n; j++)
        {
            int soma = 0;
            for (int i = 0; i < n; i++)
            {
                soma += m[i, j];
            }
            somasColuna += $"{soma} ";
        }

        int principal = 0;
        int secundaria = 0;
        for (int k = 0; k < n; k++)
        {
            principal += m[k, k];
            secundaria += m[k, n - 1 - k];
        }

        int maior = m[0, 0];
        int linhaMaior = 0;
        int colunaMaior = 0;

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (m[i, j] > maior)
                {
                    maior = m[i, j];
                    linhaMaior = i;
                    colunaMaior = j;
                }
            }
        }

        bool simetrica = true;

        for (int i = 0; i < n && simetrica; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                if (m[i, j] != m[j, i])
                {
                    simetrica = false;
                    break;
                }
            }
        }

        Console.WriteLine($"Somas por linha: {somasLinha}");
        Console.WriteLine($"Somas por coluna: {somasColuna}");
        Console.WriteLine($"Diagonal principal: {principal}");
        Console.WriteLine($"Diagonal secundaria: {secundaria}");
        Console.WriteLine($"Maior: {maior} em ({linhaMaior},{colunaMaior})");
        Console.WriteLine($"Simetrica: {simetrica}");
    }
}
`,
      hints: [
        'Comece o maior com `m[0, 0]` e a posição em `(0,0)`: assim ele funciona com qualquer faixa de valores.',
        'A simetria pode parar assim que encontra o primeiro par diferente — não é preciso terminar a varredura.',
      ],
      tests: [
        {
          name: 'Matriz sequencial',
          stdin: '3\n1 2 3\n4 5 6\n7 8 9\n',
          expectedStdout:
            'Somas por linha: 6 15 24\nSomas por coluna: 12 15 18\nDiagonal principal: 15\n' +
            'Diagonal secundaria: 15\nMaior: 9 em (2,2)\nSimetrica: False',
        },
        {
          name: 'Matriz simétrica',
          stdin: '3\n1 2 3\n2 4 5\n3 5 6\n',
          expectedStdout:
            'Somas por linha: 6 11 14\nSomas por coluna: 6 11 14\nDiagonal principal: 11\n' +
            'Diagonal secundaria: 10\nMaior: 6 em (2,2)\nSimetrica: True',
        },
        {
          name: 'Uma célula é sempre simétrica',
          stdin: '1\n5\n',
          expectedStdout:
            'Somas por linha: 5\nSomas por coluna: 5\nDiagonal principal: 5\n' +
            'Diagonal secundaria: 5\nMaior: 5 em (0,0)\nSimetrica: True',
        },
        {
          name: 'Matriz inteiramente negativa',
          stdin: '2\n-1 -2\n-3 -4\n',
          expectedStdout:
            'Somas por linha: -3 -7\nSomas por coluna: -4 -6\nDiagonal principal: -5\n' +
            'Diagonal secundaria: -5\nMaior: -1 em (0,0)\nSimetrica: False',
          hidden: true,
        },
      ],
    },
  },
]
