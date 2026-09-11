import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's02c04l01',
    title: 'Par, ímpar e divisibilidade',
    objective: 'Testar divisibilidade com `%` e escrever condições de paridade que funcionam também com números negativos.',
    concept: [
      {
        kind: 'text',
        body:
          'Toda a aritmética desta seção parte de uma única operação: o resto. `a % b` vale `0` exatamente quando `a` é divisível por `b`, e esse teste é a base de paridade, primalidade, divisores e conversão de base.',
      },
      {
        kind: 'code',
        code: `bool par = n % 2 == 0;
bool divisivelPor3 = n % 3 == 0;
bool multiploDe10 = n % 10 == 0;`,
      },
      {
        kind: 'text',
        body:
          'Há uma armadilha que só aparece com negativos: em C#, o resto herda o **sinal do dividendo**. `-7 % 2` não é `1`, é `-1`. Isso quebra qualquer teste de imparidade escrito como `n % 2 == 1`.',
      },
      {
        kind: 'compare',
        good: `bool impar = n % 2 != 0;`,
        bad: `bool impar = n % 2 == 1;`,
        goodLabel: 'Funciona com negativos',
        badLabel: 'Diz que -7 é par',
      },
      {
        kind: 'table',
        headers: ['`n`', '`n % 2`', '`n % 2 == 0`', '`n % 2 == 1`'],
        rows: [
          ['`8`', '`0`', '`true`', '`false`'],
          ['`7`', '`1`', '`false`', '`true`'],
          ['`-7`', '`-1`', '`false`', '**`false`**'],
          ['`-8`', '`0`', '`true`', '`false`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Testar paridade sempre pelo `== 0`, nunca pelo `== 1`. A regra vale para qualquer divisor: `n % 3 == 0` é seguro, `n % 3 == 1` só é seguro se você garantiu que `n` não é negativo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Divisibilidade por 10, 100 ou 1.000 é o mesmo teste com outro divisor, e é o que permite descobrir se um número termina em zero sem convertê-lo para texto.',
      },
    ],
    quiz: [
      {
        id: 's02c04l01q1',
        type: 'single',
        prompt: 'Quanto vale `-7 % 2` em C#?',
        options: [
          { id: 'a', code: '-1', correct: true },
          { id: 'b', code: '1' },
          { id: 'c', code: '0' },
          { id: 'd', text: 'Lança exceção.' },
        ],
        explanation:
          'O resto em C# tem o sinal do dividendo. Em outras linguagens, como Python, o resultado seria `1` — por isso o hábito de testar por `!= 0` é mais portável e mais seguro.',
      },
      {
        id: 's02c04l01q2',
        type: 'single',
        prompt: 'Qual condição identifica corretamente um número ímpar, positivo ou negativo?',
        options: [
          { id: 'a', code: 'n % 2 != 0', correct: true },
          { id: 'b', code: 'n % 2 == 1' },
          { id: 'c', code: 'n / 2 * 2 != n' },
          { id: 'd', code: 'n % 2 > 0' },
        ],
        explanation:
          'A alternativa com divisão inteira também funciona, mas é indireta e mais lenta de ler. `!= 0` é a forma idiomática, e as duas com `== 1` e `> 0` falham para negativos.',
      },
      {
        id: 's02c04l01q3',
        type: 'single',
        prompt: 'Como testar se um número termina em zero, sem convertê-lo para texto?',
        options: [
          { id: 'a', code: 'n % 10 == 0', correct: true },
          { id: 'b', code: 'n / 10 == 0' },
          { id: 'c', code: 'n % 2 == 0 && n % 5 == 0' },
          { id: 'd', code: 'n - 10 == 0' },
        ],
        explanation:
          'O último dígito é sempre `n % 10`. A alternativa com 2 e 5 dá o mesmo resultado, já que 10 é o produto dos dois — mas é um caminho mais longo para a mesma resposta.',
      },
    ],
    challenge: {
      brief:
        'Leia dois inteiros, `n` e `d` (com `d` maior que zero), e analise a faixa de 1 até `n`: quantos números são múltiplos de `d`, quantos são pares e quantos são ímpares.',
      requirements: [
        'Linha 1: `Multiplos de d: k`, usando o valor lido no lugar de `d`',
        'Linha 2: `Pares: p`',
        'Linha 3: `Impares: i`',
        'Para `n` igual a 0 as três contagens são `0`',
        'Use `% == 0` para os testes',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int d = int.Parse(Console.ReadLine());

        int multiplos = 0;
        int pares = 0;
        int impares = 0;

        // Percorra de 1 a n e classifique cada numero

        Console.WriteLine($"Multiplos de {d}: {multiplos}");
        Console.WriteLine($"Pares: {pares}");
        Console.WriteLine($"Impares: {impares}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int d = int.Parse(Console.ReadLine());

        int multiplos = 0;
        int pares = 0;
        int impares = 0;

        for (int i = 1; i <= n; i++)
        {
            if (i % d == 0)
            {
                multiplos++;
            }

            if (i % 2 == 0)
            {
                pares++;
            }
            else
            {
                impares++;
            }
        }

        Console.WriteLine($"Multiplos de {d}: {multiplos}");
        Console.WriteLine($"Pares: {pares}");
        Console.WriteLine($"Impares: {impares}");
    }
}
`,
      hints: [
        'Um único `for` alimenta as três contagens. Múltiplo de `d` e paridade são testes independentes.',
        'Todo número é par ou ímpar, então `if / else` já cobre os dois casos sem um segundo teste.',
      ],
      tests: [
        {
          name: 'Faixa até 10, divisor 3',
          stdin: '10\n3\n',
          expectedStdout: 'Multiplos de 3: 3\nPares: 5\nImpares: 5',
        },
        {
          name: 'Divisor 1: tudo é múltiplo',
          stdin: '7\n1\n',
          expectedStdout: 'Multiplos de 1: 7\nPares: 3\nImpares: 4',
        },
        {
          name: 'Faixa vazia',
          stdin: '0\n5\n',
          expectedStdout: 'Multiplos de 5: 0\nPares: 0\nImpares: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c04l02',
    title: 'Detectando números primos',
    objective: 'Testar primalidade por divisões sucessivas, parando na raiz quadrada e tratando os casos de borda 0, 1 e 2.',
    concept: [
      {
        kind: 'text',
        body:
          'Um número é primo quando tem exatamente dois divisores: 1 e ele mesmo. Testar isso é procurar um divisor no meio — e assim que um aparece, a resposta está decidida.',
      },
      {
        kind: 'code',
        code: `bool primo = n >= 2;                 // 0, 1 e negativos ja saem fora

for (int d = 2; d * d <= n; d++)
{
    if (n % d == 0)
    {
        primo = false;
        break;                           // um divisor basta
    }
}`,
      },
      {
        kind: 'text',
        body:
          'A condição `d * d <= n` é o detalhe que faz esse teste ser rápido. Se `n` tem um divisor maior que sua raiz, o par correspondente é **menor** que a raiz e já teria sido encontrado. Testar além da raiz só repete trabalho.',
      },
      {
        kind: 'table',
        headers: ['`n`', 'Divisores testados até', 'Comparações'],
        rows: [
          ['`97`', '`9`', '8'],
          ['`10.007`', '`100`', '99'],
          ['`1.000.003`', '`1.000`', '999'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O 1 **não é primo**: ele tem um único divisor. E o 2 é o único primo par — todo outro número par tem o 2 como divisor. Um teste de primalidade que erra esses dois casos passa em quase todos os testes casuais.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Escrever `d * d <= n` é preferível a `d <= Math.Sqrt(n)`: evita converter para `double` e evita erros de arredondamento em números grandes, onde a raiz calculada pode cair do lado errado do limite.',
      },
    ],
    quiz: [
      {
        id: 's02c04l02q1',
        type: 'single',
        prompt: 'Por que basta testar divisores até a raiz quadrada de `n`?',
        options: [
          { id: 'a', text: 'Porque todo divisor maior que a raiz tem um par menor que a raiz, que já teria sido encontrado.', correct: true },
          { id: 'b', text: 'Porque números maiores que a raiz nunca dividem nada.' },
          { id: 'c', text: 'Porque a raiz quadrada é sempre um número primo.' },
          { id: 'd', text: 'Não basta: é uma aproximação que erra em alguns casos.' },
        ],
        explanation:
          'Divisores vêm em pares que multiplicam até `n`. Em `36 = 4 × 9`, o 4 está abaixo da raiz e o 9 acima. Encontrar um dos dois já resolve.',
      },
      {
        id: 's02c04l02q2',
        type: 'multiple',
        prompt: 'Quais destes números são primos?',
        options: [
          { id: 'a', code: '2', correct: true },
          { id: 'b', code: '1' },
          { id: 'c', code: '9' },
          { id: 'd', code: '17', correct: true },
        ],
        explanation:
          'O 1 tem um só divisor, então não é primo. O 9 é `3 × 3`. O 2 é primo e é o único primo par.',
      },
      {
        id: 's02c04l02q3',
        type: 'single',
        prompt: 'O que acontece com `bool primo = true;` (sem a guarda `n >= 2`) para `n = 1`?',
        options: [
          { id: 'a', text: 'O laço não roda e o programa declara que 1 é primo.', correct: true },
          { id: 'b', text: 'O laço roda uma vez e corrige a resposta.' },
          { id: 'c', text: 'O programa lança exceção.' },
          { id: 'd', text: 'Nada: a resposta continua correta.' },
        ],
        explanation:
          'Com `n = 1`, a condição `2 * 2 <= 1` já é falsa e o laço dá zero voltas. A flag mantém o valor inicial, e o resultado é errado — o caso de borda precisa ser tratado antes do laço.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e imprima todos os números primos de 2 até `n`, um por linha. Termine informando quantos foram encontrados.',
      requirements: [
        'Cada primo sai sozinho na linha, em ordem crescente',
        'A última linha é `Total: k`',
        'O 1 não é primo; o 2 é',
        'Para `n` menor que 2 a saída é apenas `Total: 0`',
        'Teste divisores enquanto `d * d <= candidato`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int total = 0;

        // Para cada candidato de 2 a n, decida se e primo

        Console.WriteLine($"Total: {total}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int total = 0;

        for (int c = 2; c <= n; c++)
        {
            bool primo = true;

            for (int d = 2; d * d <= c; d++)
            {
                if (c % d == 0)
                {
                    primo = false;
                    break;
                }
            }

            if (primo)
            {
                Console.WriteLine(c);
                total++;
            }
        }

        Console.WriteLine($"Total: {total}");
    }
}
`,
      hints: [
        'A flag `primo` nasce dentro do laço externo: cada candidato precisa da sua própria resposta.',
        'Como o laço externo já começa em 2, os casos 0 e 1 ficam de fora sozinhos.',
      ],
      tests: [
        {
          name: 'Primos até 20',
          stdin: '20\n',
          expectedStdout: '2\n3\n5\n7\n11\n13\n17\n19\nTotal: 8',
        },
        {
          name: 'Só o 2',
          stdin: '2\n',
          expectedStdout: '2\nTotal: 1',
        },
        {
          name: 'O 1 não é primo',
          stdin: '1\n',
          expectedStdout: 'Total: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c04l03',
    title: 'Contando divisores',
    objective: 'Enumerar os divisores de um número e usar a soma dos divisores próprios para classificá-lo.',
    concept: [
      {
        kind: 'text',
        body:
          'Enumerar divisores é o mesmo teste da primalidade, sem o `break`: em vez de parar no primeiro divisor, você percorre todos e registra cada um.',
      },
      {
        kind: 'code',
        code: `int total = 0;

for (int d = 1; d <= n; d++)
{
    if (n % d == 0)
    {
        Console.WriteLine(d);
        total++;
    }
}`,
        caption: 'Os divisores saem naturalmente em ordem crescente.',
      },
      {
        kind: 'text',
        body:
          'Um **divisor próprio** é qualquer divisor menor que o próprio número. A soma deles classifica o número em três famílias, um assunto que os gregos já estudavam:',
      },
      {
        kind: 'table',
        headers: ['Soma dos próprios', 'Classificação', 'Exemplo'],
        rows: [
          ['menor que `n`', 'deficiente', '`8`: 1+2+4 = 7'],
          ['igual a `n`', '**perfeito**', '`6`: 1+2+3 = 6'],
          ['maior que `n`', 'abundante', '`12`: 1+2+3+4+6 = 16'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Números perfeitos são raríssimos: 6, 28, 496, 8.128 são os quatro primeiros, e o quinto já passa de 33 milhões. Até hoje não se sabe se existe algum perfeito ímpar.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O próprio `n` é divisor de si mesmo e entra na contagem total, mas **não** na soma dos próprios. Misturar os dois faz todo número parecer abundante.',
      },
      {
        kind: 'text',
        body:
          'Este laço vai de 1 até `n`, então custa `n` operações. Dá para reduzir a `raiz de n` percorrendo apenas até a raiz e contando o par de cada divisor encontrado — uma otimização que a Seção 7 explora.',
      },
    ],
    quiz: [
      {
        id: 's02c04l03q1',
        type: 'single',
        prompt: 'Quantos divisores tem o número 28?',
        options: [
          { id: 'a', code: '6', correct: true },
          { id: 'b', code: '5' },
          { id: 'c', code: '4' },
          { id: 'd', code: '28' },
        ],
        explanation:
          'São 1, 2, 4, 7, 14 e 28. Os cinco primeiros são os divisores próprios, e a soma deles dá exatamente 28 — por isso 28 é um número perfeito.',
      },
      {
        id: 's02c04l03q2',
        type: 'single',
        prompt: 'Qual é a diferença entre "divisores" e "divisores próprios"?',
        options: [
          { id: 'a', text: 'Os próprios excluem o próprio número.', correct: true },
          { id: 'b', text: 'Os próprios excluem o 1.' },
          { id: 'c', text: 'Os próprios incluem apenas os primos.' },
          { id: 'd', text: 'São sinônimos.' },
        ],
        explanation:
          'Todo número é divisível por si mesmo, e incluir esse divisor na soma tornaria a soma sempre maior que `n`. Excluí-lo é o que dá sentido à classificação.',
      },
      {
        id: 's02c04l03q3',
        type: 'single',
        prompt: 'Quantos divisores tem um número primo?',
        options: [
          { id: 'a', text: 'Exatamente dois: 1 e ele mesmo.', correct: true },
          { id: 'b', text: 'Exatamente um.' },
          { id: 'c', text: 'Depende do número.' },
          { id: 'd', text: 'Nenhum.' },
        ],
        explanation:
          'É a própria definição de primo. Isso também mostra por que 1 não é primo: ele tem só um divisor. Um teste de primalidade e um contador de divisores são o mesmo algoritmo com paradas diferentes.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e liste todos os seus divisores em ordem crescente. Informe quantos são e se o número é perfeito, ou seja, se a soma dos divisores próprios é igual a ele mesmo.',
      requirements: [
        'Cada divisor sai sozinho na linha, em ordem crescente',
        'Depois deles, `Total: k`',
        'Por último, `Perfeito: True` ou `Perfeito: False`',
        'A soma dos divisores próprios exclui o próprio `n`',
        'Para `n` igual a 1 o único divisor é o 1, e ele não é perfeito',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int total = 0;
        int somaProprios = 0;

        // Liste os divisores e some os proprios

        Console.WriteLine($"Total: {total}");
        Console.WriteLine($"Perfeito: {somaProprios == n}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int total = 0;
        int somaProprios = 0;

        for (int d = 1; d <= n; d++)
        {
            if (n % d == 0)
            {
                Console.WriteLine(d);
                total++;

                if (d != n)
                {
                    somaProprios += d;
                }
            }
        }

        Console.WriteLine($"Total: {total}");
        Console.WriteLine($"Perfeito: {somaProprios == n}");
    }
}
`,
      hints: [
        'A guarda `if (d != n)` é o que separa a contagem total da soma dos próprios.',
        'A última linha já vem pronta: basta que `somaProprios` esteja correto.',
      ],
      tests: [
        {
          name: 'Vinte e oito é perfeito',
          stdin: '28\n',
          expectedStdout: '1\n2\n4\n7\n14\n28\nTotal: 6\nPerfeito: True',
        },
        {
          name: 'Doze é abundante',
          stdin: '12\n',
          expectedStdout: '1\n2\n3\n4\n6\n12\nTotal: 6\nPerfeito: False',
        },
        {
          name: 'Seis é o menor perfeito',
          stdin: '6\n',
          expectedStdout: '1\n2\n3\n6\nTotal: 4\nPerfeito: True',
        },
        {
          name: 'O um não é perfeito',
          stdin: '1\n',
          expectedStdout: '1\nTotal: 1\nPerfeito: False',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c04l04',
    title: 'MDC pelo algoritmo de Euclides',
    objective: 'Calcular o máximo divisor comum com o algoritmo de Euclides, entendendo por que o resto substitui a busca por divisores.',
    concept: [
      {
        kind: 'text',
        body:
          'O máximo divisor comum de dois números é o maior valor que divide os dois. A forma ingênua é testar todos os candidatos de baixo para cima. O algoritmo de Euclides resolve o mesmo problema em pouquíssimos passos, e tem mais de dois mil anos.',
      },
      {
        kind: 'text',
        body:
          'A ideia é uma única observação: **qualquer divisor comum de `a` e `b` também divide `a % b`**. Então trocar o par `(a, b)` por `(b, a % b)` preserva o MDC e diminui os números. Repetindo, `b` chega a zero, e nesse ponto `a` é a resposta.',
      },
      {
        kind: 'code',
        code: `while (b != 0)
{
    int resto = a % b;
    a = b;
    b = resto;
}

Console.WriteLine(a);   // o MDC`,
        caption: 'Três linhas resolvem o que a busca ingênua faria em milhares de comparações.',
      },
      {
        kind: 'table',
        headers: ['Passo', '`a`', '`b`', '`a % b`'],
        rows: [
          ['início', '`48`', '`18`', '`12`'],
          ['1', '`18`', '`12`', '`6`'],
          ['2', '`12`', '`6`', '`0`'],
          ['3', '`6`', '`0`', 'fim'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O laço termina porque o resto é sempre menor que o divisor, então `b` decresce estritamente e chega a zero. É a mesma garantia de progresso da lição sobre laço infinito, agora aplicada a um algoritmo clássico.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A variável temporária é obrigatória. Sem ela, `a = b;` seguido de `b = a % b;` calcula o resto de `b` por `b`, que é sempre zero — o laço encerra na primeira volta com a resposta errada. É o mesmo erro de ordem que aparece em Fibonacci.',
      },
      {
        kind: 'text',
        body:
          'Quando `b` já começa em zero, o laço nem roda e a resposta é o próprio `a`. Isso é matematicamente correto: o MDC de um número com zero é o próprio número.',
      },
    ],
    quiz: [
      {
        id: 's02c04l04q1',
        type: 'single',
        prompt: 'Quanto vale o MDC de 48 e 18?',
        options: [
          { id: 'a', code: '6', correct: true },
          { id: 'b', code: '12' },
          { id: 'c', code: '3' },
          { id: 'd', code: '2' },
        ],
        explanation:
          'Os divisores comuns são 1, 2, 3 e 6. O 12 divide 48 mas não 18. Euclides chega ao 6 em três passos.',
      },
      {
        id: 's02c04l04q2',
        type: 'single',
        prompt: 'Por que o algoritmo sempre termina?',
        options: [
          { id: 'a', text: 'Porque o resto é sempre menor que o divisor, então `b` diminui a cada passo até chegar a zero.', correct: true },
          { id: 'b', text: 'Porque existe um limite fixo de 100 iterações.' },
          { id: 'c', text: 'Porque `a` e `b` acabam ficando iguais.' },
          { id: 'd', text: 'Nem sempre termina: números primos entre si causam laço infinito.' },
        ],
        explanation:
          'Uma sequência de inteiros não negativos que decresce estritamente não pode ser infinita. Para números primos entre si, o algoritmo termina normalmente com resultado 1.',
      },
      {
        id: 's02c04l04q3',
        type: 'single',
        prompt: 'Quanto vale o MDC de 10 e 0?',
        options: [
          { id: 'a', code: '10', correct: true },
          { id: 'b', code: '0' },
          { id: 'c', code: '1' },
          { id: 'd', text: 'Indefinido.' },
        ],
        explanation:
          'Todo número divide o zero, então o maior divisor comum é o maior divisor de 10, que é o próprio 10. No código, o laço simplesmente não roda.',
      },
    ],
    challenge: {
      brief:
        'Leia dois inteiros não negativos `a` e `b` e calcule o MDC pelo algoritmo de Euclides, mostrando cada passo da redução.',
      requirements: [
        'Cada passo sai no formato `48 % 18 = 12`',
        'Depois dos passos, `MDC: X`',
        'Por último, `Passos: k` com o número de reduções feitas',
        'Se `b` já for 0, nenhum passo é impresso e o MDC é o próprio `a`',
        'Use uma variável temporária para não perder o valor de `b` na troca',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());

        int passos = 0;

        // Reduza o par ate b chegar a zero

        Console.WriteLine($"MDC: {a}");
        Console.WriteLine($"Passos: {passos}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());

        int passos = 0;

        while (b != 0)
        {
            int resto = a % b;
            Console.WriteLine($"{a} % {b} = {resto}");

            a = b;
            b = resto;
            passos++;
        }

        Console.WriteLine($"MDC: {a}");
        Console.WriteLine($"Passos: {passos}");
    }
}
`,
      hints: [
        'Imprima o passo **antes** de trocar `a` e `b`: a linha mostra os valores de entrada da redução.',
        'A ordem é: calcular o resto, imprimir, depois `a = b` e `b = resto`.',
      ],
      tests: [
        {
          name: 'Clássico 48 e 18',
          stdin: '48\n18\n',
          expectedStdout: '48 % 18 = 12\n18 % 12 = 6\n12 % 6 = 0\nMDC: 6\nPassos: 3',
        },
        {
          name: 'Primos entre si',
          stdin: '17\n5\n',
          expectedStdout: '17 % 5 = 2\n5 % 2 = 1\n2 % 1 = 0\nMDC: 1\nPassos: 3',
        },
        {
          name: 'Números iguais resolvem em um passo',
          stdin: '7\n7\n',
          expectedStdout: '7 % 7 = 0\nMDC: 7\nPassos: 1',
        },
        {
          name: 'MDC com zero é o próprio número',
          stdin: '10\n0\n',
          expectedStdout: 'MDC: 10\nPassos: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c04l05',
    title: 'MMC a partir do MDC',
    objective: 'Derivar o mínimo múltiplo comum do MDC, dividindo antes de multiplicar para evitar estouro.',
    concept: [
      {
        kind: 'text',
        body:
          'O mínimo múltiplo comum é o menor número divisível pelos dois. Buscá-lo por tentativa seria caro, mas existe uma identidade que o entrega de graça a partir do MDC:',
      },
      {
        kind: 'code',
        code: `// a * b = mdc(a, b) * mmc(a, b)
long mmc = a / mdc * b;`,
        caption: 'A divisão vem antes da multiplicação — e essa ordem não é estética.',
      },
      {
        kind: 'text',
        body:
          'Escrever `a * b / mdc` dá o mesmo resultado matemático, mas calcula o produto completo primeiro. Com dois números grandes, esse produto intermediário pode estourar o tipo antes de a divisão ter chance de reduzi-lo.',
      },
      {
        kind: 'compare',
        good: `long mmc = a / mdc * b;`,
        bad: `long mmc = a * b / mdc;`,
        goodLabel: 'Reduz antes de crescer',
        badLabel: 'Pode estourar no meio',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A divisão `a / mdc` é sempre exata, por definição: o MDC divide `a`. Então não há perda de precisão em antecipá-la — só ganho de segurança.',
      },
      {
        kind: 'table',
        headers: ['`a`', '`b`', 'MDC', 'MMC'],
        rows: [
          ['`12`', '`18`', '`6`', '`36`'],
          ['`4`', '`6`', '`2`', '`12`'],
          ['`7`', '`13`', '`1`', '`91`'],
          ['`5`', '`5`', '`5`', '`5`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Quando os dois números são primos entre si, o MDC é 1 e o MMC é o produto inteiro. É justamente o caso em que o risco de estouro é maior, e onde a ordem das operações mais importa.',
      },
    ],
    quiz: [
      {
        id: 's02c04l05q1',
        type: 'single',
        prompt: 'Quanto vale o MMC de 4 e 6?',
        options: [
          { id: 'a', code: '12', correct: true },
          { id: 'b', code: '24' },
          { id: 'c', code: '2' },
          { id: 'd', code: '10' },
        ],
        explanation:
          'O 24 é múltiplo comum, mas não é o menor. Pela identidade: `4 / 2 * 6 = 12`, com MDC igual a 2.',
      },
      {
        id: 's02c04l05q2',
        type: 'single',
        prompt: 'Por que dividir antes de multiplicar?',
        options: [
          { id: 'a', text: 'Para evitar que o produto intermediário estoure o tipo numérico.', correct: true },
          { id: 'b', text: 'Porque a divisão é mais rápida que a multiplicação.' },
          { id: 'c', text: 'Porque `a * b` dá um resultado matematicamente diferente.' },
          { id: 'd', text: 'Porque o C# avalia da direita para a esquerda.' },
        ],
        explanation:
          'O resultado final é o mesmo nos dois caminhos; o que muda é o maior valor que aparece no meio do cálculo. Reduzir cedo mantém tudo dentro da faixa do tipo.',
      },
      {
        id: 's02c04l05q3',
        type: 'single',
        prompt: 'Se dois números são primos entre si, quanto vale o MMC deles?',
        options: [
          { id: 'a', text: 'O produto dos dois.', correct: true },
          { id: 'b', text: 'O maior dos dois.' },
          { id: 'c', code: '1' },
          { id: 'd', text: 'A soma dos dois.' },
        ],
        explanation:
          'Com MDC igual a 1, a identidade vira `a * b / 1`. É por isso que 7 e 13 têm MMC 91.',
      },
    ],
    challenge: {
      brief:
        'Leia dois inteiros positivos `a` e `b` e informe o MDC e o MMC dos dois. Calcule o MDC pelo algoritmo de Euclides e derive o MMC a partir dele.',
      requirements: [
        'Linha 1: `MDC: X`',
        'Linha 2: `MMC: Y`',
        'Use `long` no MMC e divida antes de multiplicar',
        'Não altere `a` e `b` originais: o cálculo do MMC precisa deles',
        'Para dois números iguais, MDC e MMC são ambos esse número',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());

        // Calcule o mdc em copias, para preservar a e b

        int mdc = 0;

        Console.WriteLine($"MDC: {mdc}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());

        int x = a;
        int y = b;

        while (y != 0)
        {
            int resto = x % y;
            x = y;
            y = resto;
        }

        int mdc = x;
        long mmc = (long)a / mdc * b;

        Console.WriteLine($"MDC: {mdc}");
        Console.WriteLine($"MMC: {mmc}");
    }
}
`,
      hints: [
        'Copie `a` e `b` para duas variáveis de trabalho antes do laço de Euclides: ele destrói os valores.',
        'O MMC é `a / mdc * b`, nessa ordem. Converta para `long` antes da multiplicação.',
      ],
      tests: [
        {
          name: 'Doze e dezoito',
          stdin: '12\n18\n',
          expectedStdout: 'MDC: 6\nMMC: 36',
        },
        {
          name: 'Quatro e seis',
          stdin: '4\n6\n',
          expectedStdout: 'MDC: 2\nMMC: 12',
        },
        {
          name: 'Primos entre si: MMC é o produto',
          stdin: '7\n13\n',
          expectedStdout: 'MDC: 1\nMMC: 91',
        },
        {
          name: 'Números iguais',
          stdin: '5\n5\n',
          expectedStdout: 'MDC: 5\nMMC: 5',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c04l06',
    title: 'Invertendo um número',
    objective: 'Construir o número invertido dígito a dígito, usando a técnica de deslocar e somar.',
    concept: [
      {
        kind: 'text',
        body:
          'Você já sabe extrair dígitos com `% 10` e `/ 10`. Inverter um número é reaproveitar essa extração e ir **montando** um segundo número no caminho, em vez de só somar os dígitos.',
      },
      {
        kind: 'code',
        code: `invertido = invertido * 10 + atual % 10;
atual = atual / 10;`,
        caption: 'Duas linhas: uma monta o novo número, a outra consome o antigo.',
      },
      {
        kind: 'text',
        body:
          'A multiplicação por 10 **empurra** os dígitos já montados uma casa para a esquerda, abrindo espaço na unidade para o dígito que acabou de sair do número original.',
      },
      {
        kind: 'table',
        headers: ['Volta', '`atual`', '`atual % 10`', '`invertido`'],
        rows: [
          ['início', '`1234`', '—', '`0`'],
          ['1', '`123`', '`4`', '`4`'],
          ['2', '`12`', '`3`', '`43`'],
          ['3', '`1`', '`2`', '`432`'],
          ['4', '`0`', '`1`', '`4321`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Zeros à direita desaparecem na inversão: `1200` vira `21`, porque os zeros passam a ser à esquerda e números não guardam zeros à esquerda. A contagem de dígitos continua sendo 4 — ela conta o original, não o resultado.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Como na soma de dígitos, use `do-while`. Com `while (atual > 0)` a entrada `0` dá zero voltas e o programa reporta 0 dígitos, quando o correto é 1.',
      },
      {
        kind: 'text',
        body:
          'A mesma técnica de "deslocar e somar" reaparece em conversão de base — basta trocar o 10 pela base desejada — e é assim que o computador constrói números a partir de bits.',
      },
    ],
    quiz: [
      {
        id: 's02c04l06q1',
        type: 'single',
        prompt: 'Qual é o resultado de inverter `1200`?',
        options: [
          { id: 'a', code: '21', correct: true },
          { id: 'b', code: '0021' },
          { id: 'c', code: '2100' },
          { id: 'd', code: '1200' },
        ],
        explanation:
          'Os dígitos saem 0, 0, 2, 1. Os dois zeros iniciais são absorvidos porque `0 * 10 + 0` continua 0. Como número, `0021` e `21` são o mesmo valor.',
      },
      {
        id: 's02c04l06q2',
        type: 'single',
        prompt: 'Por que a montagem usa `invertido * 10 + digito`?',
        options: [
          { id: 'a', text: 'A multiplicação abre uma casa na unidade, onde o novo dígito é encaixado.', correct: true },
          { id: 'b', text: 'Porque 10 é o número de dígitos possíveis.' },
          { id: 'c', text: 'Para garantir que o resultado seja par.' },
          { id: 'd', text: 'É arbitrário: `+ digito * 10` daria o mesmo.' },
        ],
        explanation:
          'Cada dígito já colocado sobe uma casa decimal. Inverter a ordem das operações colocaria o dígito novo na casa errada e destruiria o resultado.',
      },
      {
        id: 's02c04l06q3',
        type: 'single',
        prompt: 'Quantos dígitos o programa deve reportar para a entrada `0`?',
        options: [
          { id: 'a', code: '1', correct: true },
          { id: 'b', code: '0' },
          { id: 'c', text: 'Indefinido.' },
          { id: 'd', text: 'Depende do tipo usado.' },
        ],
        explanation:
          'O zero é escrito com um dígito. Um `while` comum daria 0, e é exatamente por isso que este algoritmo pede `do-while`.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a zero e informe quantos dígitos ele tem e qual é o número com os dígitos em ordem invertida.',
      requirements: [
        'Linha 1: `Original: n`',
        'Linha 2: `Invertido: r`',
        'Linha 3: `Digitos: k`, contando os dígitos do original',
        'Zeros à direita somem na inversão: `1200` vira `21`, mas continua tendo 4 dígitos',
        'A entrada `0` tem 1 dígito e invertida continua `0`',
        'Não converta o número para `string`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int atual = n;
        int invertido = 0;
        int digitos = 0;

        // Consuma atual e monte invertido

        Console.WriteLine($"Original: {n}");
        Console.WriteLine($"Invertido: {invertido}");
        Console.WriteLine($"Digitos: {digitos}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int atual = n;
        int invertido = 0;
        int digitos = 0;

        do
        {
            invertido = invertido * 10 + atual % 10;
            atual = atual / 10;
            digitos++;
        }
        while (atual > 0);

        Console.WriteLine($"Original: {n}");
        Console.WriteLine($"Invertido: {invertido}");
        Console.WriteLine($"Digitos: {digitos}");
    }
}
`,
      hints: [
        'Trabalhe em uma cópia (`atual`), porque a linha `Original` precisa do valor intacto.',
        'A ordem dentro do corpo é: montar o invertido, depois consumir o atual.',
      ],
      tests: [
        {
          name: 'Quatro dígitos distintos',
          stdin: '1234\n',
          expectedStdout: 'Original: 1234\nInvertido: 4321\nDigitos: 4',
        },
        {
          name: 'Zeros à direita somem',
          stdin: '1200\n',
          expectedStdout: 'Original: 1200\nInvertido: 21\nDigitos: 4',
        },
        {
          name: 'Um dígito só',
          stdin: '7\n',
          expectedStdout: 'Original: 7\nInvertido: 7\nDigitos: 1',
        },
        {
          name: 'O zero tem um dígito',
          stdin: '0\n',
          expectedStdout: 'Original: 0\nInvertido: 0\nDigitos: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c04l07',
    title: 'Palíndromo numérico',
    objective: 'Decidir se um número é igual a si mesmo invertido, reaproveitando um algoritmo já construído.',
    concept: [
      {
        kind: 'text',
        body:
          'Um palíndromo numérico se lê igual nos dois sentidos: 121, 4554, 7. Com a inversão da lição anterior pronta, o teste vira uma única comparação.',
      },
      {
        kind: 'code',
        code: `int invertido = 0;
int atual = n;

do
{
    invertido = invertido * 10 + atual % 10;
    atual = atual / 10;
}
while (atual > 0);

bool palindromo = invertido == n;`,
        caption: 'Reaproveitar um algoritmo já resolvido é mais confiável do que inventar um novo.',
      },
      {
        kind: 'text',
        body:
          'Repare no valor da abstração: você não precisou pensar em palíndromos para escrever esse código. Precisou apenas notar que "é palíndromo" significa "é igual ao seu invertido" — e a inversão já estava pronta.',
      },
      {
        kind: 'table',
        headers: ['`n`', 'Invertido', 'Palíndromo?'],
        rows: [
          ['`121`', '`121`', '`true`'],
          ['`1221`', '`1221`', '`true`'],
          ['`123`', '`321`', '`false`'],
          ['`10`', '`1`', '`false`'],
          ['`7`', '`7`', '`true`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Todo número de um dígito é palíndromo, inclusive o zero. É o caso de borda que costuma ser esquecido, e o único em que a resposta é verdadeira sem nenhum trabalho.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Comparar com o `n` original exige que ele não tenha sido destruído pelo laço. Consumir o próprio `n` em vez de uma cópia deixa `n` valendo zero no fim, e a comparação passa a ser sempre falsa — exceto justamente para a entrada `0`.',
      },
      {
        kind: 'text',
        body:
          'Existe uma variação mais eficiente que inverte só metade dos dígitos e compara as duas metades, evitando qualquer risco de estouro. Ela vai reaparecer na Seção 7, quando eficiência virar o assunto principal.',
      },
    ],
    quiz: [
      {
        id: 's02c04l07q1',
        type: 'multiple',
        prompt: 'Quais destes números são palíndromos?',
        options: [
          { id: 'a', code: '1221', correct: true },
          { id: 'b', code: '10' },
          { id: 'c', code: '7', correct: true },
          { id: 'd', code: '909', correct: true },
        ],
        explanation:
          'O `10` invertido é `1`, porque o zero à esquerda não existe como número. Todo número de um dígito é palíndromo.',
      },
      {
        id: 's02c04l07q2',
        type: 'single',
        prompt: 'Por que trabalhar em uma cópia de `n` em vez do próprio `n`?',
        options: [
          { id: 'a', text: 'Porque o laço consome o valor até zero, e a comparação final precisa do original.', correct: true },
          { id: 'b', text: 'Porque `n` é somente leitura.' },
          { id: 'c', text: 'Por questão de desempenho.' },
          { id: 'd', text: 'Não é necessário: o C# preserva o valor automaticamente.' },
        ],
        explanation:
          'Depois do laço, a variável consumida vale 0. Comparar o invertido com 0 daria `true` só para a entrada 0, e `false` para todo o resto — um bug bem difícil de enxergar.',
      },
      {
        id: 's02c04l07q3',
        type: 'single',
        prompt: 'Qual é a melhor forma de resolver "é palíndromo?" quando você já tem a inversão pronta?',
        options: [
          { id: 'a', text: 'Comparar o número com o seu invertido.', correct: true },
          { id: 'b', text: 'Escrever um algoritmo novo que compara os dígitos das pontas.' },
          { id: 'c', text: 'Converter para texto e usar `Contains`.' },
          { id: 'd', text: 'Testar se o número é divisível por 11.' },
        ],
        explanation:
          'Reaproveitar um algoritmo já testado tem menos chance de erro do que escrever um novo. A comparação das pontas também funciona e é mais eficiente, mas é uma otimização — não o primeiro caminho.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a zero, informe o número invertido e responda se ele é um palíndromo.',
      requirements: [
        'Linha 1: `Invertido: r`',
        'Linha 2: `Palindromo: True` ou `Palindromo: False`',
        'Todo número de um dígito é palíndromo, inclusive o `0`',
        '`10` não é palíndromo, porque invertido vale `1`',
        'Trabalhe em uma cópia de `n`, para poder comparar no fim',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int atual = n;
        int invertido = 0;

        // Inverta e compare com o original

        Console.WriteLine($"Invertido: {invertido}");
        Console.WriteLine($"Palindromo: {invertido == n}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int atual = n;
        int invertido = 0;

        do
        {
            invertido = invertido * 10 + atual % 10;
            atual = atual / 10;
        }
        while (atual > 0);

        Console.WriteLine($"Invertido: {invertido}");
        Console.WriteLine($"Palindromo: {invertido == n}");
    }
}
`,
      hints: [
        'É o mesmo laço da lição anterior. A única novidade é a comparação, que já está pronta no `starterCode`.',
        'O laço consome `atual`, nunca `n`.',
      ],
      tests: [
        {
          name: 'Palíndromo ímpar',
          stdin: '12321\n',
          expectedStdout: 'Invertido: 12321\nPalindromo: True',
        },
        {
          name: 'Não é palíndromo',
          stdin: '123\n',
          expectedStdout: 'Invertido: 321\nPalindromo: False',
        },
        {
          name: 'Dez invertido vira um',
          stdin: '10\n',
          expectedStdout: 'Invertido: 1\nPalindromo: False',
        },
        {
          name: 'Zero é palíndromo',
          stdin: '0\n',
          expectedStdout: 'Invertido: 0\nPalindromo: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c04l08',
    title: 'Conversão para binário',
    objective: 'Converter um número decimal para base 2 por divisões sucessivas, montando o resultado na ordem correta.',
    concept: [
      {
        kind: 'text',
        body:
          'Converter para binário é a mesma decomposição em dígitos, com uma única troca: onde havia 10, entra 2. Os restos são os bits, e eles saem do menos significativo para o mais significativo.',
      },
      {
        kind: 'code',
        code: `string binario = "";
int atual = n;

do
{
    int bit = atual % 2;
    binario = bit + binario;   // acrescenta na FRENTE
    atual = atual / 2;
}
while (atual > 0);`,
        caption: 'A concatenação é invertida de propósito: o bit novo é mais significativo que os anteriores.',
      },
      {
        kind: 'table',
        headers: ['Volta', '`atual`', '`bit`', '`binario`'],
        rows: [
          ['1', '`10` → `5`', '`0`', '`"0"`'],
          ['2', '`5` → `2`', '`1`', '`"10"`'],
          ['3', '`2` → `1`', '`0`', '`"010"`'],
          ['4', '`1` → `0`', '`1`', '`"1010"`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Concatenar na ordem natural (`binario += bit`) produz o número **invertido**: `0101` em vez de `1010`. O bit que sai por último é o mais significativo, então precisa ficar à esquerda de tudo que já foi montado.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A mesma estrutura converte para qualquer base até 10: troque o 2 pela base. Para bases maiores que 10, como hexadecimal, é preciso um passo extra para transformar os restos de 10 a 15 nas letras `A` a `F`.',
      },
      {
        kind: 'text',
        body:
          'Contar quantos bits valem 1 no caminho sai de graça: é um contador condicional dentro do mesmo laço. Esse número tem nome próprio — *population count* — e aparece em criptografia, compressão e códigos corretores de erro.',
      },
    ],
    quiz: [
      {
        id: 's02c04l08q1',
        type: 'single',
        prompt: 'Qual é a representação binária de 10?',
        options: [
          { id: 'a', code: '1010', correct: true },
          { id: 'b', code: '0101' },
          { id: 'c', code: '1100' },
          { id: 'd', code: '1001' },
        ],
        explanation:
          '`1010` é 8 + 2. A alternativa `0101` é exatamente o erro que aparece ao concatenar os bits na ordem em que saem, sem invertê-los.',
      },
      {
        id: 's02c04l08q2',
        type: 'single',
        prompt: 'Por que o bit novo é acrescentado na frente da string?',
        options: [
          { id: 'a', text: 'Porque cada bit que sai é mais significativo que todos os anteriores.', correct: true },
          { id: 'b', text: 'Porque strings em C# só crescem pela esquerda.' },
          { id: 'c', text: 'Para economizar memória.' },
          { id: 'd', text: 'É indiferente: as duas ordens dão o mesmo resultado.' },
        ],
        explanation:
          'A primeira divisão devolve o bit das unidades, que fica mais à direita. Cada divisão seguinte sobe uma potência de 2, então o bit correspondente fica mais à esquerda.',
      },
      {
        id: 's02c04l08q3',
        type: 'single',
        prompt: 'Quantos bits iguais a 1 tem o número 255 em binário?',
        options: [
          { id: 'a', code: '8', correct: true },
          { id: 'b', code: '1' },
          { id: 'c', code: '255' },
          { id: 'd', code: '4' },
        ],
        explanation:
          '255 é `11111111`: oito bits, todos ligados. Não por acaso, é o maior valor que cabe em um byte sem sinal.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a zero e informe sua representação em binário e quantos bits iguais a 1 ela tem.',
      requirements: [
        'Linha 1: `Binario: b`, sem zeros à esquerda',
        'Linha 2: `Bits 1: k`',
        'A entrada `0` produz `Binario: 0` e `Bits 1: 0`',
        'Monte a string acrescentando cada bit novo na frente',
        'Não use `Convert.ToString` nem nenhuma conversão pronta de base',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int atual = n;
        string binario = "";
        int uns = 0;

        // Divida por 2 e monte a string de tras para frente

        Console.WriteLine($"Binario: {binario}");
        Console.WriteLine($"Bits 1: {uns}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int atual = n;
        string binario = "";
        int uns = 0;

        do
        {
            int bit = atual % 2;
            binario = bit + binario;

            if (bit == 1)
            {
                uns++;
            }

            atual = atual / 2;
        }
        while (atual > 0);

        Console.WriteLine($"Binario: {binario}");
        Console.WriteLine($"Bits 1: {uns}");
    }
}
`,
      hints: [
        'A linha da montagem é `binario = bit + binario;` — o bit vem primeiro na expressão.',
        'O `do-while` garante que a entrada `0` produza a string `"0"` em vez de uma string vazia.',
      ],
      tests: [
        {
          name: 'Dez em binário',
          stdin: '10\n',
          expectedStdout: 'Binario: 1010\nBits 1: 2',
        },
        {
          name: 'Byte cheio',
          stdin: '255\n',
          expectedStdout: 'Binario: 11111111\nBits 1: 8',
        },
        {
          name: 'Potência de dois',
          stdin: '16\n',
          expectedStdout: 'Binario: 10000\nBits 1: 1',
        },
        {
          name: 'Zero',
          stdin: '0\n',
          expectedStdout: 'Binario: 0\nBits 1: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c04l09',
    title: 'Prática: dígito verificador',
    objective: 'Calcular um dígito verificador com soma ponderada e módulo 11, o mesmo esquema de CPF e código de barras.',
    concept: [
      {
        kind: 'text',
        body:
          'Um **dígito verificador** é um número acrescentado ao fim de um código para detectar erros de digitação. Se você trocar dois algarismos de lugar em um CPF, o dígito deixa de bater — e o sistema recusa o número sem consultar nada.',
      },
      {
        kind: 'text',
        body:
          'O esquema mais comum, chamado módulo 11, tem três passos: multiplicar cada algarismo por um peso decrescente, somar tudo, e derivar o dígito do resto da divisão por 11.',
      },
      {
        kind: 'code',
        code: `// Codigo de 8 digitos, pesos de 9 ate 2
int soma = 0;

for (int i = 0; i < 8; i++)
{
    int digito = codigo[i] - '0';   // char -> valor numerico
    int peso = 9 - i;
    soma += digito * peso;
}

int resto = soma % 11;
int dv = resto < 2 ? 0 : 11 - resto;`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A expressão `codigo[i] - \'0\'` converte um `char` de dígito no número que ele representa. Ela funciona porque os caracteres de `\'0\'` a `\'9\'` são consecutivos na tabela de códigos, então a diferença dá exatamente o valor.',
      },
      {
        kind: 'table',
        headers: ['Posição', 'Dígito de `12345678`', 'Peso', 'Produto'],
        rows: [
          ['0', '`1`', '`9`', '`9`'],
          ['1', '`2`', '`8`', '`16`'],
          ['2', '`3`', '`7`', '`21`'],
          ['...', '...', '...', '...'],
          ['7', '`8`', '`2`', '`16`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Restos 0 e 1 são o caso especial: `11 - 0` daria 11 e `11 - 1` daria 10, e nenhum dos dois é um algarismo. A regra é que ambos produzem dígito `0` — esquecer isso gera códigos inválidos em cerca de 18% dos casos.',
      },
      {
        kind: 'text',
        body:
          'O peso decrescente é o que faz o esquema detectar transposições. Se dois algarismos vizinhos trocam de lugar, seus pesos trocam junto e a soma muda — algo que um esquema de peso constante não perceberia.',
      },
    ],
    quiz: [
      {
        id: 's02c04l09q1',
        type: 'single',
        prompt: 'Quanto vale `\'7\' - \'0\'` em C#?',
        options: [
          { id: 'a', code: '7', correct: true },
          { id: 'b', code: '55' },
          { id: 'c', text: 'Erro de compilação: não se subtrai `char`.' },
          { id: 'd', code: '"7"' },
        ],
        explanation:
          'Os dois `char` viram seus códigos numéricos (55 e 48) e a subtração dá 7. É a forma padrão de converter um caractere de dígito no seu valor.',
      },
      {
        id: 's02c04l09q2',
        type: 'single',
        prompt: 'Se o resto da divisão por 11 for `1`, qual é o dígito verificador?',
        options: [
          { id: 'a', code: '0', correct: true },
          { id: 'b', code: '10' },
          { id: 'c', code: '1' },
          { id: 'd', code: '11' },
        ],
        explanation:
          '`11 - 1` daria 10, que não é um algarismo. A convenção do módulo 11 é que restos 0 e 1 produzem dígito 0.',
      },
      {
        id: 's02c04l09q3',
        type: 'single',
        prompt: 'Por que os pesos são decrescentes em vez de todos iguais a 1?',
        options: [
          { id: 'a', text: 'Para que a troca de dois algarismos de posição altere a soma e seja detectada.', correct: true },
          { id: 'b', text: 'Para que a soma seja sempre menor que 11.' },
          { id: 'c', text: 'Para acelerar o cálculo.' },
          { id: 'd', text: 'É uma escolha arbitrária, sem efeito prático.' },
        ],
        explanation:
          'Com pesos iguais, `1234` e `4321` dariam a mesma soma e o mesmo dígito. Transposição é justamente um dos erros de digitação mais comuns, e os pesos existem para pegá-lo.',
      },
    ],
    challenge: {
      brief:
        'Leia um código de exatamente 8 algarismos e calcule seu dígito verificador pelo esquema de módulo 11: multiplique cada algarismo por um peso que vai de 9 a 2 da esquerda para a direita, some tudo, e derive o dígito do resto da divisão por 11.',
      requirements: [
        'Linha 1: `Soma: s`',
        'Linha 2: `Resto: r`, com `r` sendo `s % 11`',
        'Linha 3: `Digito: d`',
        'Linha 4: `Completo: c`, com o código original seguido do dígito',
        'Quando o resto for `0` ou `1`, o dígito é `0`; caso contrário é `11 - resto`',
        'O primeiro algarismo tem peso 9 e o último tem peso 2',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        string codigo = Console.ReadLine();

        int soma = 0;

        // Peso 9 para a posicao 0, decrescendo ate 2 na posicao 7

        int resto = soma % 11;
        int digito = 0;

        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Resto: {resto}");
        Console.WriteLine($"Digito: {digito}");
        Console.WriteLine($"Completo: {codigo}{digito}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        string codigo = Console.ReadLine();

        int soma = 0;

        for (int i = 0; i < 8; i++)
        {
            int valor = codigo[i] - '0';
            int peso = 9 - i;
            soma += valor * peso;
        }

        int resto = soma % 11;
        int digito = resto < 2 ? 0 : 11 - resto;

        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Resto: {resto}");
        Console.WriteLine($"Digito: {digito}");
        Console.WriteLine($"Completo: {codigo}{digito}");
    }
}
`,
      hints: [
        'O peso da posição `i` é `9 - i`: a posição 0 recebe 9 e a posição 7 recebe 2.',
        'A regra do dígito cabe em um ternário: `resto < 2 ? 0 : 11 - resto`.',
      ],
      tests: [
        {
          name: 'Código sequencial',
          stdin: '12345678\n',
          expectedStdout: 'Soma: 156\nResto: 2\nDigito: 9\nCompleto: 123456789',
        },
        {
          name: 'Tudo zero: resto 0 gera dígito 0',
          stdin: '00000000\n',
          expectedStdout: 'Soma: 0\nResto: 0\nDigito: 0\nCompleto: 000000000',
        },
        {
          name: 'Um único algarismo no peso máximo',
          stdin: '10000000\n',
          expectedStdout: 'Soma: 9\nResto: 9\nDigito: 2\nCompleto: 100000002',
        },
        {
          name: 'Resto 1 também gera dígito 0',
          stdin: '10000010\n',
          expectedStdout: 'Soma: 12\nResto: 1\nDigito: 0\nCompleto: 100000100',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c04l10',
    title: 'Checkpoint: raciocínio numérico',
    objective: 'Produzir um dossiê completo de um número, combinando decomposição em dígitos, inversão, primalidade e divisores.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint pede sete propriedades do mesmo número. Todas já foram construídas neste capítulo; o exercício é reconhecer quais laços podem ser compartilhados e quais precisam ser independentes.',
      },
      {
        kind: 'table',
        headers: ['Propriedade', 'Laço que resolve'],
        rows: [
          ['dígitos e soma deles', '`do-while` de `% 10` e `/ 10`'],
          ['invertido e palíndromo', 'o **mesmo** laço, montando o invertido'],
          ['primo', '`for` de divisores até a raiz, com `break`'],
          ['divisores e perfeito', '`for` de 1 a `n`, sem `break`'],
        ],
      },
      {
        kind: 'text',
        body:
          'Os três primeiros resultados saem de um único laço de decomposição, porque todos consomem os dígitos na mesma ordem. Primalidade e divisores precisam de laços próprios: um testa divisores e para cedo, o outro percorre todos.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Dois casos de borda decidem se o programa está certo. O `1` não é primo e não é perfeito, mas é palíndromo e tem 1 dígito. Se o seu teste de primalidade não tiver a guarda `n >= 2`, ele vai afirmar que o 1 é primo.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Escreva e teste uma propriedade por vez. Sete linhas de saída de uma vez transformam qualquer erro em um mistério, e este é exatamente o tipo de programa em que uma cópia esquecida contamina três resultados ao mesmo tempo.',
      },
    ],
    quiz: [
      {
        id: 's02c04l10q1',
        type: 'multiple',
        prompt: 'Quais propriedades do número 28 são verdadeiras?',
        options: [
          { id: 'a', text: 'É perfeito.', correct: true },
          { id: 'b', text: 'Tem 6 divisores.', correct: true },
          { id: 'c', text: 'É primo.' },
          { id: 'd', text: 'É palíndromo.' },
        ],
        explanation:
          '28 tem os divisores 1, 2, 4, 7, 14 e 28, e os cinco próprios somam exatamente 28. Ele não é primo justamente por ter mais de dois divisores, e invertido vira 82.',
      },
      {
        id: 's02c04l10q2',
        type: 'single',
        prompt: 'Por que a decomposição em dígitos e a inversão podem compartilhar o mesmo laço?',
        options: [
          { id: 'a', text: 'Porque as duas consomem os dígitos na mesma ordem, com as mesmas operações.', correct: true },
          { id: 'b', text: 'Porque o compilador funde laços iguais automaticamente.' },
          { id: 'c', text: 'Porque a inversão é um efeito colateral da soma.' },
          { id: 'd', text: 'Não podem: cada uma precisa do seu laço.' },
        ],
        explanation:
          'Ambas fazem `% 10` e `/ 10` a cada volta. Só o que se faz com o dígito muda: uma soma, a outra empilha na montagem do invertido.',
      },
      {
        id: 's02c04l10q3',
        type: 'single',
        prompt: 'Quantos divisores tem o número 121, e ele é primo?',
        options: [
          { id: 'a', text: 'Três divisores, e não é primo.', correct: true },
          { id: 'b', text: 'Dois divisores, e é primo.' },
          { id: 'c', text: 'Quatro divisores, e não é primo.' },
          { id: 'd', text: 'Onze divisores, e não é primo.' },
        ],
        explanation:
          '121 é `11 × 11`, então seus divisores são 1, 11 e 121. Quadrados de primos são o caso em que o teste `d * d <= n` encontra o divisor exatamente no limite.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e produza um dossiê com sete propriedades dele: quantidade de dígitos, soma dos dígitos, número invertido, se é palíndromo, se é primo, quantos divisores tem, e se é perfeito.',
      requirements: [
        'Linha 1: `Digitos: k`',
        'Linha 2: `Soma dos digitos: s`',
        'Linha 3: `Invertido: r`',
        'Linha 4: `Palindromo: True` ou `False`',
        'Linha 5: `Primo: True` ou `False`',
        'Linha 6: `Divisores: d`, contando 1 e o próprio `n`',
        'Linha 7: `Perfeito: True` ou `False`, comparando `n` com a soma dos divisores próprios',
        'O `1` não é primo nem perfeito, mas é palíndromo e tem 1 divisor',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int digitos = 0;
        int somaDigitos = 0;
        int invertido = 0;

        // 1. Um laco de decomposicao resolve as tres primeiras linhas

        bool primo = n >= 2;

        // 2. Um laco de divisores ate a raiz decide a primalidade

        int divisores = 0;
        int somaProprios = 0;

        // 3. Um laco de 1 a n conta divisores e soma os proprios

        Console.WriteLine($"Digitos: {digitos}");
        Console.WriteLine($"Soma dos digitos: {somaDigitos}");
        Console.WriteLine($"Invertido: {invertido}");
        Console.WriteLine($"Palindromo: {invertido == n}");
        Console.WriteLine($"Primo: {primo}");
        Console.WriteLine($"Divisores: {divisores}");
        Console.WriteLine($"Perfeito: {somaProprios == n}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int digitos = 0;
        int somaDigitos = 0;
        int invertido = 0;

        int atual = n;

        do
        {
            int digito = atual % 10;
            somaDigitos += digito;
            invertido = invertido * 10 + digito;
            digitos++;
            atual = atual / 10;
        }
        while (atual > 0);

        bool primo = n >= 2;

        for (int d = 2; d * d <= n; d++)
        {
            if (n % d == 0)
            {
                primo = false;
                break;
            }
        }

        int divisores = 0;
        int somaProprios = 0;

        for (int d = 1; d <= n; d++)
        {
            if (n % d == 0)
            {
                divisores++;

                if (d != n)
                {
                    somaProprios += d;
                }
            }
        }

        Console.WriteLine($"Digitos: {digitos}");
        Console.WriteLine($"Soma dos digitos: {somaDigitos}");
        Console.WriteLine($"Invertido: {invertido}");
        Console.WriteLine($"Palindromo: {invertido == n}");
        Console.WriteLine($"Primo: {primo}");
        Console.WriteLine($"Divisores: {divisores}");
        Console.WriteLine($"Perfeito: {somaProprios == n}");
    }
}
`,
      hints: [
        'O laço de decomposição trabalha em `atual`, nunca em `n` — as linhas de palíndromo e de divisores precisam do original.',
        'A guarda `bool primo = n >= 2;` já vem no `starterCode` e é o que resolve o caso do número 1.',
      ],
      tests: [
        {
          name: 'Vinte e oito: perfeito e composto',
          stdin: '28\n',
          expectedStdout:
            'Digitos: 2\nSoma dos digitos: 10\nInvertido: 82\nPalindromo: False\nPrimo: False\nDivisores: 6\nPerfeito: True',
        },
        {
          name: 'Sete: primo de um dígito',
          stdin: '7\n',
          expectedStdout:
            'Digitos: 1\nSoma dos digitos: 7\nInvertido: 7\nPalindromo: True\nPrimo: True\nDivisores: 2\nPerfeito: False',
        },
        {
          name: 'Cento e vinte e um: quadrado de primo e palíndromo',
          stdin: '121\n',
          expectedStdout:
            'Digitos: 3\nSoma dos digitos: 4\nInvertido: 121\nPalindromo: True\nPrimo: False\nDivisores: 3\nPerfeito: False',
        },
        {
          name: 'Seis: o menor perfeito',
          stdin: '6\n',
          expectedStdout:
            'Digitos: 1\nSoma dos digitos: 6\nInvertido: 6\nPalindromo: True\nPrimo: False\nDivisores: 4\nPerfeito: True',
        },
        {
          name: 'Um: nem primo nem perfeito',
          stdin: '1\n',
          expectedStdout:
            'Digitos: 1\nSoma dos digitos: 1\nInvertido: 1\nPalindromo: True\nPrimo: False\nDivisores: 1\nPerfeito: False',
          hidden: true,
        },
      ],
    },
  },
]
