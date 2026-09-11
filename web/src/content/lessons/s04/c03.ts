import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's04c03l01',
    title: 'A ideia da recursão',
    objective: 'Reconhecer um problema que se define em função de si mesmo e traduzi-lo em um método que se chama.',
    concept: [
      {
        kind: 'text',
        body:
          'Um método pode chamar a si mesmo. Isso se chama **recursão**, e é a forma natural de resolver problemas cuja definição já é recursiva: "a soma de 1 até n é n mais a soma de 1 até n-1".',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Iterativo',
          code: `static int Soma(int n)
{
    int total = 0;

    for (int i = 1; i <= n; i++)
    {
        total += i;
    }

    return total;
}`,
        },
        right: {
          label: 'Recursivo',
          code: `static int Soma(int n)
{
    if (n <= 0) return 0;

    return n + Soma(n - 1);
}`,
        },
        note: 'Os dois calculam a mesma coisa. Um descreve **como** somar; o outro descreve **o que** a soma é.',
      },
      {
        kind: 'text',
        body:
          'Toda recursão tem duas partes obrigatórias, e faltar qualquer uma delas produz um programa que não termina.',
      },
      {
        kind: 'table',
        headers: ['Parte', 'Papel', 'No exemplo'],
        rows: [
          ['caso base', 'para a recursão', '`if (n <= 0) return 0;`'],
          ['caso recursivo', 'reduz o problema', '`n + Soma(n - 1)`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A garantia de término é a mesma dos laços da Seção 2: cada chamada precisa **chegar mais perto** do caso base. `Soma(n - 1)` reduz `n` a cada passo, então ele necessariamente alcança zero.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Uma recursão sem caso base — ou que não se aproxima dele — derruba o programa com `Stack overflow.` em menos de um segundo. Não é um laço infinito silencioso: é um encerramento abrupto, e o próximo capítulo explica por quê.',
      },
      {
        kind: 'text',
        body:
          'Recursão não é obrigatória: tudo que ela faz, um laço também faz. Ela ganha quando a **estrutura do problema** é recursiva — árvores, divisão e conquista, backtracking — e o código recursivo fica mais curto e mais parecido com a definição.',
      },
    ],
    quiz: [
      {
        id: 's04c03l01q1',
        type: 'single',
        prompt: 'Quais são as duas partes obrigatórias de uma recursão?',
        options: [
          { id: 'a', text: 'Um caso base e um caso que reduz o problema.', correct: true },
          { id: 'b', text: 'Um laço e uma condição.' },
          { id: 'c', text: 'Dois métodos que se chamam.' },
          { id: 'd', text: 'Um parâmetro e um retorno.' },
        ],
        explanation:
          'Sem caso base, nada para a recursão. Sem redução, o caso base nunca é alcançado. As duas juntas garantem o término.',
      },
      {
        id: 's04c03l01q2',
        type: 'single',
        prompt: 'O que acontece com uma recursão que não se aproxima do caso base?',
        options: [
          { id: 'a', text: 'O programa encerra com `Stack overflow.`.', correct: true },
          { id: 'b', text: 'Ela roda para sempre, em silêncio.' },
          { id: 'c', text: 'Erro de compilação.' },
          { id: 'd', text: 'Ela devolve zero.' },
        ],
        explanation:
          'Cada chamada consome espaço na pilha. Quando ele acaba, o processo morre — diferente de um laço infinito, que continuaria rodando indefinidamente.',
      },
      {
        id: 's04c03l01q3',
        type: 'single',
        prompt: 'Quando a recursão é preferível a um laço?',
        options: [
          { id: 'a', text: 'Quando a estrutura do problema é recursiva, como árvores e divisão e conquista.', correct: true },
          { id: 'b', text: 'Sempre: ela é mais rápida.' },
          { id: 'c', text: 'Quando há muitos dados.' },
          { id: 'd', text: 'Quando o método devolve `void`.' },
        ],
        explanation:
          'A recursão costuma ser mais lenta e usa mais memória. O que ela compra é código que espelha a definição do problema — e em problemas ramificados isso é uma diferença enorme.',
      },
    ],
    challenge: {
      brief:
        'Escreva `Soma` de forma recursiva, sem nenhum laço: ela devolve a soma de 1 até `n`. Leia `q` valores e mostre o resultado de cada um, além do total.',
      requirements: [
        '`Soma` recebe um `int` e devolve um `int`',
        'A implementação precisa ser **recursiva**: sem `for` nem `while` dentro do método',
        'Uma linha por consulta, no formato `Soma(5) = 15`',
        'Para `n` menor ou igual a 0, o resultado é `0`',
        'A última linha é `Total: t`',
        'Não mude a assinatura de `Soma`',
      ],
      starterCode: `using System;

class Program
{
    static int Soma(int n)
    {
        // Caso base primeiro, depois n + Soma(n - 1)
        return 0;
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int total = 0;

        for (int i = 0; i < q; i++)
        {
            int n = int.Parse(Console.ReadLine());

            // Chame, imprima e acumule
        }

        Console.WriteLine($"Total: {total}");
    }
}
`,
      solution: `using System;

class Program
{
    static int Soma(int n)
    {
        if (n <= 0)
        {
            return 0;
        }

        return n + Soma(n - 1);
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int total = 0;

        for (int i = 0; i < q; i++)
        {
            int n = int.Parse(Console.ReadLine());

            int resultado = Soma(n);
            Console.WriteLine($"Soma({n}) = {resultado}");
            total += resultado;
        }

        Console.WriteLine($"Total: {total}");
    }
}
`,
      hints: [
        'O caso base vem primeiro: `if (n <= 0) return 0;`.',
        'O caso recursivo é uma linha só: o valor atual mais a soma do que vem antes dele.',
      ],
      tests: [
        {
          name: 'Duas consultas',
          stdin: '2\n5\n10\n',
          expectedStdout: 'Soma(5) = 15\nSoma(10) = 55\nTotal: 70',
        },
        {
          name: 'Zero e negativo',
          stdin: '2\n0\n-3\n',
          expectedStdout: 'Soma(0) = 0\nSoma(-3) = 0\nTotal: 0',
        },
        {
          name: 'Um valor só',
          stdin: '1\n1\n',
          expectedStdout: 'Soma(1) = 1\nTotal: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c03l02',
    title: 'O caso base',
    objective: 'Escolher o caso base correto, cobrindo todas as entradas que não devem gerar nova chamada.',
    concept: [
      {
        kind: 'text',
        body:
          'O caso base é a resposta que o método sabe dar **sem se chamar de novo**. Escolhê-lo errado produz dois tipos de erro: recursão infinita, ou resposta errada em um caso de borda.',
      },
      {
        kind: 'compare',
        good: `static int Soma(int n)
{
    if (n <= 0) return 0;
    return n + Soma(n - 1);
}`,
        bad: `static int Soma(int n)
{
    if (n == 0) return 0;
    return n + Soma(n - 1);
}`,
        goodLabel: 'Cobre negativos',
        badLabel: '`Soma(-1)` nunca para',
      },
      {
        kind: 'text',
        body:
          'A diferença entre `== 0` e `<= 0` parece cosmética e não é. Com `Soma(-1)`, a versão de igualdade chama `Soma(-2)`, depois `Soma(-3)`, e se afasta do caso base para sempre.',
      },
      {
        kind: 'table',
        headers: ['Recursão', 'Caso base seguro', 'Por quê'],
        rows: [
          ['soma até `n`', '`n <= 0`', 'cobre zero e negativos'],
          ['fatorial', '`n <= 1`', '`0!` e `1!` valem 1'],
          ['percorrer array', '`i >= tamanho`', 'cobre índices além do fim'],
          ['contagem regressiva', '`n <= 0`', 'não depende de acertar o zero exato'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A regra prática: use uma comparação de **ordem** (`<=`, `>=`) em vez de igualdade sempre que possível. Uma comparação de ordem continua verdadeira depois que o limite é ultrapassado; uma igualdade só é verdadeira em um ponto exato, que a recursão pode pular.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Alguns problemas precisam de **mais de um** caso base. Fibonacci precisa de dois — `F(0)` e `F(1)` —, porque o caso recursivo depende dos dois valores anteriores e não teria de onde partir com apenas um.',
      },
      {
        kind: 'text',
        body:
          'A pergunta que resolve quase todo caso base: qual é a **menor entrada possível**, e qual é a resposta correta para ela? Se você consegue responder sem recursão, essa é a base.',
      },
    ],
    quiz: [
      {
        id: 's04c03l02q1',
        type: 'single',
        prompt: 'Por que `if (n == 0)` é um caso base arriscado para `Soma`?',
        options: [
          { id: 'a', text: 'Porque uma entrada negativa nunca alcança o zero exato.', correct: true },
          { id: 'b', text: 'Porque `==` é mais lento que `<=`.' },
          { id: 'c', text: 'Porque zero não é um valor válido.' },
          { id: 'd', text: 'Não é arriscado: as duas formas são equivalentes.' },
        ],
        explanation:
          'É o mesmo problema de `while (i != n)` da Seção 2: comparações de igualdade só barram um ponto exato, e a recursão pode passar direto por ele.',
      },
      {
        id: 's04c03l02q2',
        type: 'single',
        prompt: 'Por que Fibonacci precisa de dois casos base?',
        options: [
          { id: 'a', text: 'Porque o caso recursivo depende dos dois valores anteriores.', correct: true },
          { id: 'b', text: 'Porque ele cresce muito rápido.' },
          { id: 'c', text: 'Porque `F(0)` e `F(1)` valem o mesmo.' },
          { id: 'd', text: 'Ele não precisa: um basta.' },
        ],
        explanation:
          '`F(n) = F(n-1) + F(n-2)` exige dois pontos de partida. Com apenas `F(0)` definido, o cálculo de `F(1)` cairia em `F(-1)`.',
      },
      {
        id: 's04c03l02q3',
        type: 'single',
        prompt: 'Qual pergunta ajuda a encontrar o caso base?',
        options: [
          { id: 'a', text: 'Qual é a menor entrada possível, e a resposta para ela sem recursão?', correct: true },
          { id: 'b', text: 'Quantas chamadas a recursão vai fazer?' },
          { id: 'c', text: 'Qual é o maior valor que cabe no tipo?' },
          { id: 'd', text: 'Quantos parâmetros o método tem?' },
        ],
        explanation:
          'A menor entrada é onde a recursão precisa parar. Se você consegue dar a resposta direto, ela é o caso base.',
      },
    ],
    challenge: {
      brief:
        'Escreva `Contar`, que gera uma contagem regressiva recursiva de `n` até 1, e `Potencia`, que calcula `base` elevado a `expoente` recursivamente. Ambas precisam de casos base seguros.',
      requirements: [
        '`Contar` recebe um `int` e devolve uma `string` no formato `5 4 3 2 1 `, com um espaço após cada número',
        'Para `n` menor ou igual a 0, `Contar` devolve texto vazio',
        '`Potencia` recebe dois `int` e devolve um `long`',
        'Qualquer base elevada a 0 devolve `1`',
        'Expoentes negativos devolvem `0`',
        'Linha 1: `Contagem: 5 4 3 2 1`',
        'Linha 2: `Potencia: X`',
        'As duas implementações precisam ser recursivas, sem laços',
        'Não mude as assinaturas de `Contar` nem de `Potencia`',
      ],
      starterCode: `using System;

class Program
{
    static string Contar(int n)
    {
        // Caso base seguro, depois n + o resto da contagem
        return "";
    }

    static long Potencia(int numeroBase, int expoente)
    {
        // Expoente 0 devolve 1; negativo devolve 0
        return 0;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int numeroBase = int.Parse(Console.ReadLine());
        int expoente = int.Parse(Console.ReadLine());

        Console.WriteLine($"Contagem: {Contar(n)}");
        Console.WriteLine($"Potencia: {Potencia(numeroBase, expoente)}");
    }
}
`,
      solution: `using System;

class Program
{
    static string Contar(int n)
    {
        if (n <= 0)
        {
            return "";
        }

        return n + " " + Contar(n - 1);
    }

    static long Potencia(int numeroBase, int expoente)
    {
        if (expoente < 0)
        {
            return 0;
        }

        if (expoente == 0)
        {
            return 1;
        }

        return numeroBase * Potencia(numeroBase, expoente - 1);
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int numeroBase = int.Parse(Console.ReadLine());
        int expoente = int.Parse(Console.ReadLine());

        Console.WriteLine($"Contagem: {Contar(n)}");
        Console.WriteLine($"Potencia: {Potencia(numeroBase, expoente)}");
    }
}
`,
      hints: [
        'O caso base de `Contar` usa `<= 0`, para funcionar também com entradas negativas.',
        '`Potencia` precisa de dois testes: o expoente negativo devolve 0, e o expoente zero devolve 1.',
      ],
      tests: [
        {
          name: 'Contagem de cinco e potência normal',
          stdin: '5\n2\n10\n',
          expectedStdout: 'Contagem: 5 4 3 2 1\nPotencia: 1024',
        },
        {
          name: 'Expoente zero',
          stdin: '3\n7\n0\n',
          expectedStdout: 'Contagem: 3 2 1\nPotencia: 1',
        },
        {
          name: 'Contagem vazia e expoente negativo',
          stdin: '0\n5\n-2\n',
          expectedStdout: 'Contagem:\nPotencia: 0',
        },
        {
          name: 'Entrada negativa na contagem',
          stdin: '-4\n3\n3\n',
          expectedStdout: 'Contagem:\nPotencia: 27',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c03l03',
    title: 'Fatorial recursivo',
    objective: 'Traduzir a definição matemática do fatorial em recursão e comparar o resultado com a versão iterativa.',
    concept: [
      {
        kind: 'text',
        body:
          'O fatorial é o exemplo clássico de recursão porque a própria definição matemática já é recursiva: `n! = n × (n-1)!`, com `0! = 1`.',
      },
      {
        kind: 'code',
        code: `static long Fatorial(int n)
{
    if (n <= 1) return 1;         // 0! e 1! valem 1

    return n * Fatorial(n - 1);
}`,
        caption: 'Duas linhas que são a tradução literal da definição.',
      },
      {
        kind: 'text',
        body:
          'A sequência de chamadas para `Fatorial(4)` mostra como a resposta é montada de volta, de dentro para fora:',
      },
      {
        kind: 'output',
        code: `Fatorial(4)
  4 * Fatorial(3)
      3 * Fatorial(2)
          2 * Fatorial(1)
              1              <- caso base
          2 * 1 = 2
      3 * 2 = 6
  4 * 6 = 24`,
        caption: 'A recursão desce até a base e depois volta multiplicando.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que a multiplicação acontece **na volta**, não na ida. É por isso que a última chamada a resolver é a primeira que foi feita — e é essa ordem invertida que a pilha de chamadas gerencia.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Aqui a recursão tem custo **linear**: `Fatorial(n)` faz exatamente `n` chamadas. Isso é aceitável, e é bem diferente do que acontece com Fibonacci na próxima lição — onde o número de chamadas explode.',
      },
      {
        kind: 'text',
        body:
          'A restrição de tipo continua valendo: fatoriais estouram `int` a partir de `13!`, e `long` a partir de `21!`. A escolha do tipo é a mesma que você fez na versão iterativa da Seção 2.',
      },
    ],
    quiz: [
      {
        id: 's04c03l03q1',
        type: 'single',
        prompt: 'Quantas chamadas `Fatorial(5)` gera, contando a inicial?',
        options: [
          { id: 'a', code: '5', correct: true },
          { id: 'b', code: '10' },
          { id: 'c', code: '120' },
          { id: 'd', code: '25' },
        ],
        explanation:
          'São as chamadas para 5, 4, 3, 2 e 1. Cada uma faz no máximo uma chamada nova, então o total é linear.',
      },
      {
        id: 's04c03l03q2',
        type: 'single',
        prompt: 'Quando a multiplicação acontece na recursão do fatorial?',
        options: [
          { id: 'a', text: 'Na volta, depois que a chamada interna devolve o resultado.', correct: true },
          { id: 'b', text: 'Na ida, antes de chamar de novo.' },
          { id: 'c', text: 'Toda no caso base.' },
          { id: 'd', text: 'Em paralelo com as chamadas.' },
        ],
        explanation:
          '`n * Fatorial(n - 1)` precisa do resultado da chamada interna antes de multiplicar. Toda a descida acontece antes de qualquer multiplicação.',
      },
      {
        id: 's04c03l03q3',
        type: 'single',
        prompt: 'Por que usar `long` em vez de `int` no fatorial?',
        options: [
          { id: 'a', text: 'Porque `13!` já não cabe em `int`.', correct: true },
          { id: 'b', text: 'Porque a recursão exige `long`.' },
          { id: 'c', text: 'Porque `int` não aceita multiplicação em cadeia.' },
          { id: 'd', text: 'Por questão de desempenho.' },
        ],
        explanation:
          'É a mesma limitação da versão iterativa da Seção 2. A recursão não muda os limites do tipo — só a forma de calcular.',
      },
    ],
    challenge: {
      brief:
        'Escreva `Fatorial` de forma recursiva e `FatorialIterativo` com laço. Leia `q` valores entre 0 e 20 e mostre que as duas versões concordam, informando quantas chamadas recursivas foram feitas.',
      requirements: [
        '`Fatorial` recebe um `int` e devolve um `long`, implementado com recursão',
        '`FatorialIterativo` recebe um `int` e devolve um `long`, implementado com laço',
        'Uma linha por valor, no formato `5! = 120 (iterativo 120, chamadas 5)`',
        'A contagem de chamadas inclui a chamada inicial',
        '`0!` e `1!` valem 1 e geram 1 chamada',
        'A última linha é `Total de chamadas: t`',
        'Não mude as assinaturas dos dois métodos',
      ],
      starterCode: `using System;

class Program
{
    static long chamadas = 0;

    static long Fatorial(int n)
    {
        chamadas++;

        // Implementacao recursiva
        return 1;
    }

    static long FatorialIterativo(int n)
    {
        // Implementacao com laco
        return 1;
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        long totalChamadas = 0;

        for (int i = 0; i < q; i++)
        {
            int n = int.Parse(Console.ReadLine());

            chamadas = 0;

            // Chame as duas versoes e relate
        }

        Console.WriteLine($"Total de chamadas: {totalChamadas}");
    }
}
`,
      solution: `using System;

class Program
{
    static long chamadas = 0;

    static long Fatorial(int n)
    {
        chamadas++;

        if (n <= 1)
        {
            return 1;
        }

        return n * Fatorial(n - 1);
    }

    static long FatorialIterativo(int n)
    {
        long resultado = 1;

        for (int i = 2; i <= n; i++)
        {
            resultado *= i;
        }

        return resultado;
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        long totalChamadas = 0;

        for (int i = 0; i < q; i++)
        {
            int n = int.Parse(Console.ReadLine());

            chamadas = 0;
            long recursivo = Fatorial(n);
            long iterativo = FatorialIterativo(n);

            Console.WriteLine($"{n}! = {recursivo} (iterativo {iterativo}, chamadas {chamadas})");
            totalChamadas += chamadas;
        }

        Console.WriteLine($"Total de chamadas: {totalChamadas}");
    }
}
`,
      hints: [
        'O contador `chamadas` já é incrementado na primeira linha do método: basta zerá-lo antes de cada consulta.',
        'A versão iterativa pode começar o laço em 2, já que multiplicar por 1 não muda nada.',
      ],
      tests: [
        {
          name: 'Três valores',
          stdin: '3\n5\n10\n0\n',
          expectedStdout:
            '5! = 120 (iterativo 120, chamadas 5)\n10! = 3628800 (iterativo 3628800, chamadas 10)\n' +
            '0! = 1 (iterativo 1, chamadas 1)\nTotal de chamadas: 16',
        },
        {
          name: 'Fatorial que só cabe em long',
          stdin: '1\n20\n',
          expectedStdout:
            '20! = 2432902008176640000 (iterativo 2432902008176640000, chamadas 20)\nTotal de chamadas: 20',
        },
        {
          name: 'Um e dois',
          stdin: '2\n1\n2\n',
          expectedStdout:
            '1! = 1 (iterativo 1, chamadas 1)\n2! = 2 (iterativo 2, chamadas 2)\nTotal de chamadas: 3',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c03l04',
    title: 'Fibonacci recursivo e seu custo',
    objective: 'Medir a explosão de chamadas da recursão ingênua de Fibonacci e entender de onde vem o desperdício.',
    concept: [
      {
        kind: 'text',
        body:
          'A tradução recursiva de Fibonacci é tão direta quanto a do fatorial — e o custo dela é catastroficamente diferente. A razão está em uma única palavra: **duas** chamadas por nível, em vez de uma.',
      },
      {
        kind: 'code',
        code: `static long Fib(int n)
{
    if (n <= 1) return n;

    return Fib(n - 1) + Fib(n - 2);   // DUAS chamadas
}`,
      },
      {
        kind: 'text',
        body:
          'Cada chamada gera duas, que geram quatro, que geram oito. O número de chamadas cresce de forma exponencial, e estes são os números **medidos** neste engine:',
      },
      {
        kind: 'table',
        headers: ['`n`', 'Chamadas', 'Comparado ao anterior'],
        rows: [
          ['`5`', '15', '—'],
          ['`10`', '177', '12×'],
          ['`20`', '21.891', '124×'],
          ['`25`', '242.785', '11×'],
          ['`30`', '2.692.537', '11×'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Sete milhões de chamadas para `Fib(32)` levam cerca de 15 ms neste engine — rápido demais para você **sentir**. É por isso que esta lição conta chamadas em vez de medir tempo: o desperdício é visível na contagem muito antes de ser visível no relógio.',
      },
      {
        kind: 'text',
        body:
          'A origem do desperdício é a **repetição**. Para calcular `Fib(5)`, o valor de `Fib(3)` é recalculado do zero duas vezes, `Fib(2)` três vezes, `Fib(1)` cinco vezes — cada uma delas refazendo toda a subárvore de novo.',
      },
      {
        kind: 'output',
        code: `                Fib(5)
          /                 \\
      Fib(4)               Fib(3)
      /     \\             /      \\
  Fib(3)   Fib(2)     Fib(2)    Fib(1)
   / \\      / \\        / \\
 ...  ...  ... ...    ... ...

Fib(3) aparece 2x, Fib(2) 3x, Fib(1) 5x`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A versão iterativa da Seção 2 faz **uma** soma por termo, porque guarda os dois valores anteriores. A solução geral desse desperdício é guardar os resultados já calculados — o cache da Seção 3, aqui chamado de memoização, e assunto da Seção 7.',
      },
    ],
    quiz: [
      {
        id: 's04c03l04q1',
        type: 'single',
        prompt: 'Por que Fibonacci recursivo custa tanto mais que fatorial recursivo?',
        options: [
          { id: 'a', text: 'Porque ele faz duas chamadas por nível, gerando uma árvore em vez de uma cadeia.', correct: true },
          { id: 'b', text: 'Porque os números são maiores.' },
          { id: 'c', text: 'Porque ele usa `long`.' },
          { id: 'd', text: 'Porque ele tem dois casos base.' },
        ],
        explanation:
          'Uma chamada por nível produz `n` chamadas no total. Duas por nível produzem uma árvore binária, cujo tamanho cresce exponencialmente.',
      },
      {
        id: 's04c03l04q2',
        type: 'single',
        prompt: 'Quantas chamadas `Fib(20)` faz aproximadamente?',
        options: [
          { id: 'a', text: 'Cerca de 22 mil.', correct: true },
          { id: 'b', text: 'Cerca de 20.' },
          { id: 'c', text: 'Cerca de 400.' },
          { id: 'd', text: 'Cerca de 2 milhões.' },
        ],
        explanation:
          'São 21.891 chamadas medidas, para produzir um número que a versão iterativa calcula com 20 somas.',
      },
      {
        id: 's04c03l04q3',
        type: 'single',
        prompt: 'Qual é a origem do desperdício?',
        options: [
          { id: 'a', text: 'Os mesmos subproblemas são recalculados muitas vezes.', correct: true },
          { id: 'b', text: 'A pilha de chamadas fica cheia.' },
          { id: 'c', text: 'A soma de `long` é lenta.' },
          { id: 'd', text: 'O compilador não otimiza recursão.' },
        ],
        explanation:
          '`Fib(3)` é calculado do zero em cada ramo que precisa dele. Guardar o resultado da primeira vez elimina toda a repetição.',
      },
    ],
    challenge: {
      brief:
        'Compare as duas versões de Fibonacci. Escreva `Fib` recursiva contando as chamadas, e `FibIterativo` com laço contando as operações. Leia `q` valores e mostre a diferença de custo.',
      requirements: [
        '`Fib` recebe um `int` e devolve um `long`, implementada com recursão dupla',
        '`FibIterativo` recebe um `int` e devolve um `long`, implementada com laço',
        'Uma linha por valor, no formato `Fib(10) = 55 | recursivo: 177 chamadas, iterativo: 10 passos`',
        'A contagem recursiva inclui a chamada inicial',
        'A contagem iterativa é o número de voltas do laço',
        '`Fib(0)` é 0 e `Fib(1)` é 1, ambos com 1 chamada e 0 passos',
        'A última linha é `Chamadas economizadas: e`, a diferença total entre as duas contagens',
        'Os valores de entrada não passam de 25',
        'Não mude as assinaturas dos dois métodos',
      ],
      starterCode: `using System;

class Program
{
    static long chamadas = 0;
    static long passos = 0;

    static long Fib(int n)
    {
        chamadas++;

        // Recursao dupla
        return 0;
    }

    static long FibIterativo(int n)
    {
        // Laco com dois estados, contando os passos em 'passos'
        return 0;
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        long economizadas = 0;

        for (int i = 0; i < q; i++)
        {
            int n = int.Parse(Console.ReadLine());

            chamadas = 0;
            passos = 0;

            // Chame as duas e compare o custo
        }

        Console.WriteLine($"Chamadas economizadas: {economizadas}");
    }
}
`,
      solution: `using System;

class Program
{
    static long chamadas = 0;
    static long passos = 0;

    static long Fib(int n)
    {
        chamadas++;

        if (n <= 1)
        {
            return n;
        }

        return Fib(n - 1) + Fib(n - 2);
    }

    static long FibIterativo(int n)
    {
        long anterior = 0;
        long atual = 1;

        for (int i = 0; i < n; i++)
        {
            long proximo = anterior + atual;
            anterior = atual;
            atual = proximo;
            passos++;
        }

        return anterior;
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        long economizadas = 0;

        for (int i = 0; i < q; i++)
        {
            int n = int.Parse(Console.ReadLine());

            chamadas = 0;
            passos = 0;

            long recursivo = Fib(n);
            FibIterativo(n);

            Console.WriteLine(
                $"Fib({n}) = {recursivo} | recursivo: {chamadas} chamadas, iterativo: {passos} passos");

            economizadas += chamadas - passos;
        }

        Console.WriteLine($"Chamadas economizadas: {economizadas}");
    }
}
`,
      hints: [
        'A versão iterativa é a da Seção 2: dois estados que avançam juntos, com uma variável temporária.',
        'Depois de `n` voltas do laço, o valor de `anterior` é exatamente `Fib(n)`.',
      ],
      tests: [
        {
          name: 'Três valores com custos muito diferentes',
          stdin: '3\n5\n10\n20\n',
          expectedStdout:
            'Fib(5) = 5 | recursivo: 15 chamadas, iterativo: 5 passos\n' +
            'Fib(10) = 55 | recursivo: 177 chamadas, iterativo: 10 passos\n' +
            'Fib(20) = 6765 | recursivo: 21891 chamadas, iterativo: 20 passos\n' +
            'Chamadas economizadas: 22048',
        },
        {
          name: 'Casos base',
          stdin: '2\n0\n1\n',
          expectedStdout:
            'Fib(0) = 0 | recursivo: 1 chamadas, iterativo: 0 passos\n' +
            'Fib(1) = 1 | recursivo: 1 chamadas, iterativo: 1 passos\n' +
            'Chamadas economizadas: 1',
        },
        {
          name: 'Valor de 25: quase 250 mil chamadas',
          stdin: '1\n25\n',
          expectedStdout:
            'Fib(25) = 75025 | recursivo: 242785 chamadas, iterativo: 25 passos\n' +
            'Chamadas economizadas: 242760',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c03l05',
    title: 'Somando uma lista',
    objective: 'Aplicar recursão a uma coleção, usando um índice para reduzir o problema a cada chamada.',
    concept: [
      {
        kind: 'text',
        body:
          'Para percorrer uma coleção recursivamente, o que diminui a cada chamada não é o valor — é a **posição**. O método recebe um índice e avança até passar do fim.',
      },
      {
        kind: 'code',
        code: `static int Somar(int[] valores, int indice)
{
    if (indice >= valores.Length) return 0;   // passou do fim

    return valores[indice] + Somar(valores, indice + 1);
}

Somar(dados, 0);   // comeca do inicio`,
        caption: 'O array não muda; o índice é que caminha em direção ao caso base.',
      },
      {
        kind: 'text',
        body:
          'O caso base usa `>=` em vez de `==` pelo mesmo motivo da lição anterior: uma comparação de ordem continua verdadeira depois do limite, o que protege contra qualquer chamada com índice já ultrapassado.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Da esquerda para a direita',
          code: `if (i >= v.Length) return 0;
return v[i] + Somar(v, i + 1);`,
        },
        right: {
          label: 'Da direita para a esquerda',
          code: `if (i < 0) return 0;
return v[i] + Somar(v, i - 1);`,
        },
        note: 'Para somar, as duas direções dão o mesmo resultado. Para montar texto, não.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma coleção vazia é tratada de graça: com `Length` igual a 0, a primeira chamada já satisfaz o caso base e devolve o elemento neutro. É a mesma vantagem do laço `for` bem escrito da Seção 2.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A profundidade da recursão é igual ao tamanho da coleção. Neste engine, a pilha suporta cerca de **24 mil** níveis — então somar um array de 100 mil elementos recursivamente derruba o programa, enquanto um laço resolveria sem esforço.',
      },
      {
        kind: 'text',
        body:
          'Para coleções, o laço quase sempre é a escolha certa. Esta lição existe porque a mesma técnica de "reduzir por índice" é a base para percorrer **árvores**, onde o laço deixa de ser natural.',
      },
    ],
    quiz: [
      {
        id: 's04c03l05q1',
        type: 'single',
        prompt: 'O que diminui a cada chamada ao percorrer um array recursivamente?',
        options: [
          { id: 'a', text: 'A parte do array que ainda falta processar, controlada pelo índice.', correct: true },
          { id: 'b', text: 'O tamanho do array.' },
          { id: 'c', text: 'O valor de cada elemento.' },
          { id: 'd', text: 'A quantidade de parâmetros.' },
        ],
        explanation:
          'O array é o mesmo em todas as chamadas. O que avança em direção ao caso base é a posição a partir da qual falta somar.',
      },
      {
        id: 's04c03l05q2',
        type: 'single',
        prompt: 'Como uma coleção vazia é tratada nessa recursão?',
        options: [
          { id: 'a', text: 'A primeira chamada já satisfaz o caso base e devolve o elemento neutro.', correct: true },
          { id: 'b', text: 'Lança exceção de índice.' },
          { id: 'c', text: 'Entra em recursão infinita.' },
          { id: 'd', text: 'Precisa de uma guarda especial.' },
        ],
        explanation:
          'Com `Length` igual a 0, a condição `0 >= 0` já é verdadeira. Nenhum tratamento extra é necessário.',
      },
      {
        id: 's04c03l05q3',
        type: 'single',
        prompt: 'Qual é o limite prático da recursão sobre coleções neste engine?',
        options: [
          { id: 'a', text: 'Cerca de 24 mil níveis, depois disso a pilha estoura.', correct: true },
          { id: 'b', text: 'Não há limite.' },
          { id: 'c', text: 'Cerca de 100 níveis.' },
          { id: 'd', text: 'O limite é o tamanho do `int`.' },
        ],
        explanation:
          'Cada chamada ocupa espaço na pilha, que é finita. Um laço usa uma única moldura, independentemente do tamanho da coleção.',
      },
    ],
    challenge: {
      brief:
        'Escreva três métodos recursivos sobre arrays: `Somar`, `Maximo` e `Concatenar`. Leia `n` valores e produza o relatório usando os três, sem nenhum laço dentro dos métodos.',
      requirements: [
        '`Somar` recebe um `int[]` e um `int` de índice, e devolve a soma a partir dele',
        '`Maximo` recebe um `int[]` e um `int` de índice, e devolve o maior valor a partir dele',
        '`Concatenar` recebe um `int[]` e um `int` de índice, e devolve os valores separados por espaço',
        'Linha 1: `Soma: X`',
        'Linha 2: `Maximo: Y`',
        'Linha 3: `Valores: 3 1 4 1 5`',
        'Linha 4: `Elementos: n`',
        'As três implementações precisam ser recursivas, sem `for` nem `while`',
        'A entrada sempre tem pelo menos um valor',
        'Valores negativos são válidos',
        'Não mude as assinaturas dos três métodos',
      ],
      starterCode: `using System;

class Program
{
    static int Somar(int[] valores, int indice)
    {
        return 0;
    }

    static int Maximo(int[] valores, int indice)
    {
        // O ultimo elemento e o caso base
        return 0;
    }

    static string Concatenar(int[] valores, int indice)
    {
        return "";
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] valores = new int[n];
        for (int i = 0; i < n; i++)
        {
            valores[i] = int.Parse(Console.ReadLine());
        }

        // Chame os tres a partir do indice 0
    }
}
`,
      solution: `using System;

class Program
{
    static int Somar(int[] valores, int indice)
    {
        if (indice >= valores.Length)
        {
            return 0;
        }

        return valores[indice] + Somar(valores, indice + 1);
    }

    static int Maximo(int[] valores, int indice)
    {
        if (indice == valores.Length - 1)
        {
            return valores[indice];
        }

        int resto = Maximo(valores, indice + 1);

        return valores[indice] > resto ? valores[indice] : resto;
    }

    static string Concatenar(int[] valores, int indice)
    {
        if (indice >= valores.Length)
        {
            return "";
        }

        return valores[indice] + " " + Concatenar(valores, indice + 1);
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] valores = new int[n];
        for (int i = 0; i < n; i++)
        {
            valores[i] = int.Parse(Console.ReadLine());
        }

        Console.WriteLine($"Soma: {Somar(valores, 0)}");
        Console.WriteLine($"Maximo: {Maximo(valores, 0)}");
        Console.WriteLine($"Valores: {Concatenar(valores, 0)}");
        Console.WriteLine($"Elementos: {n}");
    }
}
`,
      hints: [
        'O caso base de `Maximo` é o **último elemento**, não a posição além do fim — não existe "maior de nenhum valor".',
        'O `Maximo` compara o elemento atual com o resultado da chamada recursiva, guardado em uma variável.',
      ],
      tests: [
        {
          name: 'Cinco valores',
          stdin: '5\n3\n1\n4\n1\n5\n',
          expectedStdout: 'Soma: 14\nMaximo: 5\nValores: 3 1 4 1 5\nElementos: 5',
        },
        {
          name: 'Todos negativos',
          stdin: '3\n-5\n-2\n-8\n',
          expectedStdout: 'Soma: -15\nMaximo: -2\nValores: -5 -2 -8\nElementos: 3',
        },
        {
          name: 'Um valor só',
          stdin: '1\n7\n',
          expectedStdout: 'Soma: 7\nMaximo: 7\nValores: 7\nElementos: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c03l06',
    title: 'Potência por divisão',
    objective: 'Reduzir o problema pela metade a cada chamada, transformando custo linear em logarítmico.',
    concept: [
      {
        kind: 'text',
        body:
          'Até aqui toda recursão reduzia o problema em **um** a cada chamada. A divisão e conquista reduz pela **metade** — e isso muda a ordem de grandeza do custo.',
      },
      {
        kind: 'text',
        body:
          'A ideia para a potência: em vez de multiplicar `base` por si mesma `n` vezes, calcule a metade do expoente uma vez só e aproveite o resultado duas vezes. Cada chamada custa uma multiplicação, mais uma extra quando o expoente é ímpar.',
      },
      {
        kind: 'code',
        code: `static long Potencia(int b, int e)
{
    if (e == 0) return 1;

    long metade = Potencia(b, e / 2);    // UMA chamada

    if (e % 2 == 0)
    {
        return metade * metade;
    }

    return metade * metade * b;          // expoente impar sobra um
}`,
        caption: 'A chamada acontece uma vez e o resultado é reaproveitado — nunca `Potencia(...) * Potencia(...)`.',
      },
      {
        kind: 'table',
        headers: ['Expoente', 'Chamadas ingênuas', 'Chamadas por divisão', 'Multiplicações'],
        rows: [
          ['`10`', '10', '4', '6'],
          ['`100`', '100', '7', '10'],
          ['`1.000`', '1.000', '10', '16'],
          ['`1.000.000`', '1 milhão', '20', '~30'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Guardar a metade em uma variável é **essencial**. Escrever `Potencia(b, e/2) * Potencia(b, e/2)` calcula a mesma coisa duas vezes e joga fora todo o ganho — o custo volta a ser linear, exatamente como no Fibonacci ingênuo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A cada chamada o expoente é dividido por 2, então a profundidade é o número de vezes que `n` pode ser dividido até chegar a 1 — o mesmo cálculo do laço `n = n / 2` da Seção 2. Para um expoente de um milhão, são 20 níveis.',
      },
      {
        kind: 'text',
        body:
          'Essa é a primeira aparição de divisão e conquista no curso, e ela volta na Seção 7 em busca binária e em ordenação. O padrão é sempre o mesmo: partir o problema ao meio em vez de andar um passo.',
      },
    ],
    quiz: [
      {
        id: 's04c03l06q1',
        type: 'single',
        prompt: 'Quantas chamadas recursivas a potência por divisão faz para o expoente 1000?',
        options: [
          { id: 'a', text: 'Cerca de 10.', correct: true },
          { id: 'b', text: 'Cerca de 1000.' },
          { id: 'c', text: 'Cerca de 500.' },
          { id: 'd', text: 'Cerca de 100.' },
        ],
        explanation:
          'A cada chamada o expoente cai pela metade: 1000, 500, 250, 125... São cerca de 10 níveis até chegar a zero.',
      },
      {
        id: 's04c03l06q2',
        type: 'single',
        prompt: 'Por que guardar a metade em uma variável em vez de chamar duas vezes?',
        options: [
          { id: 'a', text: 'Porque duas chamadas recalculam a mesma coisa e destroem o ganho.', correct: true },
          { id: 'b', text: 'Porque o compilador não aceita duas chamadas na mesma expressão.' },
          { id: 'c', text: 'Porque a segunda chamada daria outro resultado.' },
          { id: 'd', text: 'É indiferente.' },
        ],
        explanation:
          'É exatamente o erro do Fibonacci ingênuo. Com duas chamadas, o número de nós dobra a cada nível e o custo volta a crescer com o expoente.',
      },
      {
        id: 's04c03l06q3',
        type: 'single',
        prompt: 'Por que o expoente ímpar precisa de uma multiplicação extra?',
        options: [
          { id: 'a', text: 'Porque a divisão inteira descarta um fator, que precisa ser reposto.', correct: true },
          { id: 'b', text: 'Porque números ímpares são maiores.' },
          { id: 'c', text: 'Porque o caso base muda.' },
          { id: 'd', text: 'Não precisa: o resultado sai igual.' },
        ],
        explanation:
          'Para `e = 5`, a metade é 2, e `b² × b²` dá `b⁴`. Falta um `b` para chegar a `b⁵` — o fator perdido no arredondamento da divisão.',
      },
    ],
    challenge: {
      brief:
        'Escreva `Potencia` por divisão e conquista, e `PotenciaIngenua` com laço. Leia `q` pares base e expoente, e compare o número de multiplicações de cada abordagem.',
      requirements: [
        'As duas recebem dois `int` e devolvem um `long`',
        '`Potencia` precisa ser recursiva, reduzindo o expoente pela metade',
        '`PotenciaIngenua` usa um laço com uma multiplicação por volta',
        'Uma linha por consulta, no formato `2^10 = 1024 | divisao: 6 mult, ingenua: 10 mult`',
        'Qualquer base elevada a 0 devolve `1`, com 0 multiplicações nas duas',
        'A última linha é `Multiplicacoes economizadas: e`',
        'Conte cada multiplicação executada, não estime pela fórmula',
        'Os expoentes de entrada não são negativos',
        'Não mude as assinaturas dos dois métodos',
      ],
      starterCode: `using System;

class Program
{
    static int multDivisao = 0;
    static int multIngenua = 0;

    static long Potencia(int b, int e)
    {
        // Divida o expoente pela metade e reaproveite o resultado
        return 1;
    }

    static long PotenciaIngenua(int b, int e)
    {
        // Um laco com uma multiplicacao por volta
        return 1;
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int economizadas = 0;

        for (int i = 0; i < q; i++)
        {
            int b = int.Parse(Console.ReadLine());
            int e = int.Parse(Console.ReadLine());

            multDivisao = 0;
            multIngenua = 0;

            // Chame as duas e compare
        }

        Console.WriteLine($"Multiplicacoes economizadas: {economizadas}");
    }
}
`,
      solution: `using System;

class Program
{
    static int multDivisao = 0;
    static int multIngenua = 0;

    static long Potencia(int b, int e)
    {
        if (e == 0)
        {
            return 1;
        }

        long metade = Potencia(b, e / 2);

        multDivisao++;
        long quadrado = metade * metade;

        if (e % 2 == 0)
        {
            return quadrado;
        }

        multDivisao++;
        return quadrado * b;
    }

    static long PotenciaIngenua(int b, int e)
    {
        long resultado = 1;

        for (int i = 0; i < e; i++)
        {
            resultado *= b;
            multIngenua++;
        }

        return resultado;
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int economizadas = 0;

        for (int i = 0; i < q; i++)
        {
            int b = int.Parse(Console.ReadLine());
            int e = int.Parse(Console.ReadLine());

            multDivisao = 0;
            multIngenua = 0;

            long resultado = Potencia(b, e);
            PotenciaIngenua(b, e);

            Console.WriteLine(
                $"{b}^{e} = {resultado} | divisao: {multDivisao} mult, ingenua: {multIngenua} mult");

            economizadas += multIngenua - multDivisao;
        }

        Console.WriteLine($"Multiplicacoes economizadas: {economizadas}");
    }
}
`,
      hints: [
        'Conte uma multiplicação para `metade * metade`, e mais uma quando o expoente for ímpar.',
        'O caso base do expoente zero não multiplica nada e não conta.',
      ],
      tests: [
        {
          name: 'Expoentes par e ímpar',
          stdin: '2\n2\n10\n3\n5\n',
          expectedStdout:
            '2^10 = 1024 | divisao: 6 mult, ingenua: 10 mult\n' +
            '3^5 = 243 | divisao: 5 mult, ingenua: 5 mult\n' +
            'Multiplicacoes economizadas: 4',
        },
        {
          name: 'Expoente zero',
          stdin: '1\n7\n0\n',
          expectedStdout:
            '7^0 = 1 | divisao: 0 mult, ingenua: 0 mult\nMultiplicacoes economizadas: 0',
        },
        {
          name: 'Expoente grande',
          stdin: '1\n2\n30\n',
          expectedStdout:
            '2^30 = 1073741824 | divisao: 9 mult, ingenua: 30 mult\nMultiplicacoes economizadas: 21',
        },
        {
          name: 'Expoente um',
          stdin: '1\n5\n1\n',
          expectedStdout:
            '5^1 = 5 | divisao: 2 mult, ingenua: 1 mult\nMultiplicacoes economizadas: -1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c03l07',
    title: 'Torre de Hanói',
    objective: 'Resolver um problema que só tem solução recursiva prática, confiando na chamada sem rastreá-la mentalmente.',
    concept: [
      {
        kind: 'text',
        body:
          'A Torre de Hanói tem três hastes e `n` discos de tamanhos diferentes, empilhados do maior para o menor. O objetivo é mover a pilha inteira para outra haste, movendo um disco por vez e nunca colocando um disco maior sobre um menor.',
      },
      {
        kind: 'text',
        body:
          'A solução recursiva cabe em três linhas, e é um daqueles casos em que a recursão não é uma alternativa ao laço — é a única forma prática de resolver.',
      },
      {
        kind: 'code',
        code: `static void Mover(int n, char origem, char destino, char auxiliar)
{
    if (n == 0) return;

    Mover(n - 1, origem, auxiliar, destino);   // 1. tira n-1 do caminho
    Console.WriteLine($"{origem} -> {destino}"); // 2. move o maior
    Mover(n - 1, auxiliar, destino, origem);   // 3. traz n-1 de volta
}`,
        caption: 'Repare que as hastes trocam de papel nas chamadas — é isso que faz o algoritmo funcionar.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A chave para entender é **não tentar rastrear** todas as chamadas mentalmente. Confie que `Mover(n-1, ...)` resolve o subproblema corretamente e concentre-se em uma pergunta só: dado que os `n-1` discos de cima já foram tirados do caminho, o que falta fazer?',
      },
      {
        kind: 'text',
        body:
          'O número de movimentos é `2^n - 1`, e ele dobra a cada disco a mais. Este é o crescimento exponencial em sua forma mais pura — e diferente do Fibonacci, aqui ele é **inevitável**: cada movimento é necessário.',
      },
      {
        kind: 'table',
        headers: ['Discos', 'Movimentos'],
        rows: [
          ['`3`', '7'],
          ['`10`', '1.023'],
          ['`20`', '1.048.575'],
          ['`64`', 'mais de 18 quintilhões'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A lenda diz que monges movem 64 discos, e que o mundo acaba quando terminarem. A um movimento por segundo, isso levaria cerca de 585 bilhões de anos — o que dá uma boa noção do que "exponencial" significa.',
      },
    ],
    quiz: [
      {
        id: 's04c03l07q1',
        type: 'single',
        prompt: 'Quantos movimentos são necessários para 4 discos?',
        options: [
          { id: 'a', code: '15', correct: true },
          { id: 'b', code: '8' },
          { id: 'c', code: '16' },
          { id: 'd', code: '4' },
        ],
        explanation:
          '`2^4 - 1 = 15`. Cada disco adicional mais que dobra o total, porque a pilha inteira precisa ser movida duas vezes.',
      },
      {
        id: 's04c03l07q2',
        type: 'single',
        prompt: 'Qual é a estratégia da solução recursiva?',
        options: [
          { id: 'a', text: 'Mover os n-1 de cima para a haste auxiliar, mover o maior, e trazer os n-1 de volta.', correct: true },
          { id: 'b', text: 'Mover um disco por vez da origem para o destino.' },
          { id: 'c', text: 'Alternar entre as três hastes em ciclo.' },
          { id: 'd', text: 'Mover os discos do menor para o maior.' },
        ],
        explanation:
          'O disco maior só pode se mover quando todos os outros estão fora do caminho. Essa observação é a solução inteira.',
      },
      {
        id: 's04c03l07q3',
        type: 'single',
        prompt: 'Por que o custo exponencial de Hanói é diferente do de Fibonacci?',
        options: [
          { id: 'a', text: 'Em Hanói cada movimento é necessário; em Fibonacci o trabalho é repetido à toa.', correct: true },
          { id: 'b', text: 'Hanói cresce mais devagar.' },
          { id: 'c', text: 'Hanói usa menos memória.' },
          { id: 'd', text: 'Não há diferença.' },
        ],
        explanation:
          'Fibonacci pode ser resolvido em tempo linear com cache. Hanói não: a saída em si tem tamanho exponencial, então nenhum algoritmo pode ser mais rápido.',
      },
    ],
    challenge: {
      brief:
        'Resolva a Torre de Hanói. Escreva `Mover`, que imprime cada movimento, e conte o total. Leia o número de discos e as três hastes.',
      requirements: [
        '`Mover` recebe um `int` e três `char`: origem, destino e auxiliar',
        'Cada movimento imprime `A -> C`, com as hastes envolvidas',
        'Depois dos movimentos: `Movimentos: k`',
        'Por último: `Formula: 2^n - 1 = k`, confirmando que a contagem bate com a fórmula',
        'Com 0 discos, nenhum movimento é impresso e a contagem é `0`',
        'A entrada tem no máximo 5 discos',
        'Não mude a assinatura de `Mover`',
      ],
      starterCode: `using System;

class Program
{
    static int movimentos = 0;

    static void Mover(int n, char origem, char destino, char auxiliar)
    {
        // Tire n-1 do caminho, mova o maior, traga n-1 de volta
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        char a = Console.ReadLine()[0];
        char b = Console.ReadLine()[0];
        char c = Console.ReadLine()[0];

        Mover(n, a, b, c);

        Console.WriteLine($"Movimentos: {movimentos}");

        long formula = 1;
        for (int i = 0; i < n; i++)
        {
            formula *= 2;
        }

        Console.WriteLine($"Formula: 2^{n} - 1 = {formula - 1}");
    }
}
`,
      solution: `using System;

class Program
{
    static int movimentos = 0;

    static void Mover(int n, char origem, char destino, char auxiliar)
    {
        if (n == 0)
        {
            return;
        }

        Mover(n - 1, origem, auxiliar, destino);

        Console.WriteLine($"{origem} -> {destino}");
        movimentos++;

        Mover(n - 1, auxiliar, destino, origem);
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        char a = Console.ReadLine()[0];
        char b = Console.ReadLine()[0];
        char c = Console.ReadLine()[0];

        Mover(n, a, b, c);

        Console.WriteLine($"Movimentos: {movimentos}");

        long formula = 1;
        for (int i = 0; i < n; i++)
        {
            formula *= 2;
        }

        Console.WriteLine($"Formula: 2^{n} - 1 = {formula - 1}");
    }
}
`,
      hints: [
        'A ordem dos parâmetros nas duas chamadas recursivas é diferente: na primeira o destino vira auxiliar, na segunda a origem vira auxiliar.',
        'O `movimentos++` acontece junto com a impressão, entre as duas chamadas recursivas.',
      ],
      tests: [
        {
          name: 'Três discos',
          stdin: '3\nA\nC\nB\n',
          expectedStdout:
            'A -> C\nA -> B\nC -> B\nA -> C\nB -> A\nB -> C\nA -> C\n' +
            'Movimentos: 7\nFormula: 2^3 - 1 = 7',
        },
        {
          name: 'Um disco',
          stdin: '1\nA\nC\nB\n',
          expectedStdout: 'A -> C\nMovimentos: 1\nFormula: 2^1 - 1 = 1',
        },
        {
          name: 'Dois discos',
          stdin: '2\nA\nC\nB\n',
          expectedStdout:
            'A -> B\nA -> C\nB -> C\nMovimentos: 3\nFormula: 2^2 - 1 = 3',
        },
        {
          name: 'Nenhum disco',
          stdin: '0\nA\nC\nB\n',
          expectedStdout: 'Movimentos: 0\nFormula: 2^0 - 1 = 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c03l08',
    title: 'A pilha de chamadas',
    objective: 'Entender onde as chamadas em andamento são guardadas e por que a recursão tem um limite de profundidade.',
    concept: [
      {
        kind: 'text',
        body:
          'Toda chamada de método em andamento ocupa espaço em uma estrutura chamada **pilha de chamadas**. Ela guarda os parâmetros, as variáveis locais, e o ponto exato para onde voltar quando o método terminar.',
      },
      {
        kind: 'text',
        body:
          'É literalmente uma pilha, como a da Seção 3: a última chamada feita é a primeira a terminar. Por isso o fatorial multiplica na volta — a chamada mais interna resolve primeiro.',
      },
      {
        kind: 'output',
        code: `Main            <- base da pilha
  Fatorial(4)
    Fatorial(3)
      Fatorial(2)
        Fatorial(1)   <- topo, resolve primeiro`,
        caption: 'Cinco molduras empilhadas ao mesmo tempo durante `Fatorial(4)`.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A pilha tem tamanho **fixo**, e neste engine ela suporta cerca de **24 mil** níveis de recursão simples. Passar disso encerra o processo com `Stack overflow.` — não é uma exceção que você possa capturar e tratar.',
      },
      {
        kind: 'table',
        headers: ['Recursão', 'Profundidade', 'Cabe?'],
        rows: [
          ['`Fatorial(20)`', '20', 'folgado'],
          ['`Fib(30)`', '30', 'folgado'],
          ['somar array de 10 mil', '10.000', 'sim, no limite'],
          ['somar array de 100 mil', '100.000', '**estoura**'],
        ],
      },
      {
        kind: 'text',
        body:
          'Repare que o que importa é a **profundidade**, não o total de chamadas. `Fib(30)` faz 2,7 milhões de chamadas e nunca passa de 30 níveis, porque cada ramo termina antes de o próximo começar.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'É a pilha de chamadas que aparece quando um erro acontece: o *stack trace* é exatamente a lista de molduras empilhadas naquele instante. Ler um `stack trace` é ler essa pilha de cima para baixo.',
      },
    ],
    quiz: [
      {
        id: 's04c03l08q1',
        type: 'single',
        prompt: 'O que a pilha de chamadas guarda?',
        options: [
          { id: 'a', text: 'Parâmetros, variáveis locais e o ponto de retorno de cada chamada em andamento.', correct: true },
          { id: 'b', text: 'Todos os métodos do programa.' },
          { id: 'c', text: 'Os valores já devolvidos.' },
          { id: 'd', text: 'O código compilado.' },
        ],
        explanation:
          'Cada chamada precisa lembrar onde estava. Essa lembrança é a moldura, e as molduras se empilham enquanto as chamadas não terminam.',
      },
      {
        id: 's04c03l08q2',
        type: 'single',
        prompt: 'Qual é a profundidade máxima da pilha durante `Fib(30)`?',
        options: [
          { id: 'a', text: 'Cerca de 30: cada ramo termina antes do próximo começar.', correct: true },
          { id: 'b', text: 'Cerca de 2,7 milhões, uma por chamada.' },
          { id: 'c', text: 'Cerca de 900.' },
          { id: 'd', text: 'Depende da memória disponível.' },
        ],
        explanation:
          'O total de chamadas é enorme, mas elas não coexistem. A pilha só cresce até o ramo mais fundo, que tem 30 níveis.',
      },
      {
        id: 's04c03l08q3',
        type: 'single',
        prompt: 'O que é um `Stack overflow`?',
        options: [
          { id: 'a', text: 'O esgotamento do espaço da pilha, que encerra o processo abruptamente.', correct: true },
          { id: 'b', text: 'Uma exceção que pode ser capturada com `try/catch`.' },
          { id: 'c', text: 'Um aviso do compilador.' },
          { id: 'd', text: 'Falta de memória para os dados.' },
        ],
        explanation:
          'Ele não pode ser tratado porque não há espaço nem para executar o tratador. O processo simplesmente morre.',
      },
    ],
    challenge: {
      brief:
        'Meça a profundidade da pilha. Escreva `Profundidade`, que desce recursivamente e devolve o nível máximo alcançado, e `MaiorProfundidade`, que registra em uma variável o nível mais fundo visitado. Leia `q` valores e relate.',
      requirements: [
        '`Profundidade` recebe um `int` e devolve um `int` com quantos níveis foram descidos',
        '`MaiorProfundidade` recebe um `int` de contagem e um `int` de nível atual, e atualiza a variável `maiorNivel`',
        'Uma linha por consulta, no formato `n=100: profundidade 100, nivel maximo 100`',
        'Para `n` igual a 0, a profundidade é `0` e o nível máximo é `0`',
        'A última linha é `Soma das profundidades: s`',
        'Os valores de entrada não passam de 1000, bem abaixo do limite da pilha',
        'Não mude as assinaturas dos dois métodos',
      ],
      starterCode: `using System;

class Program
{
    static int maiorNivel = 0;

    static int Profundidade(int n)
    {
        // Desca n niveis e devolva quantos foram
        return 0;
    }

    static void MaiorProfundidade(int restantes, int nivelAtual)
    {
        // Registre o nivel mais fundo em maiorNivel
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int soma = 0;

        for (int i = 0; i < q; i++)
        {
            int n = int.Parse(Console.ReadLine());

            maiorNivel = 0;

            // Chame os dois e relate
        }

        Console.WriteLine($"Soma das profundidades: {soma}");
    }
}
`,
      solution: `using System;

class Program
{
    static int maiorNivel = 0;

    static int Profundidade(int n)
    {
        if (n <= 0)
        {
            return 0;
        }

        return 1 + Profundidade(n - 1);
    }

    static void MaiorProfundidade(int restantes, int nivelAtual)
    {
        if (nivelAtual > maiorNivel)
        {
            maiorNivel = nivelAtual;
        }

        if (restantes <= 0)
        {
            return;
        }

        MaiorProfundidade(restantes - 1, nivelAtual + 1);
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int soma = 0;

        for (int i = 0; i < q; i++)
        {
            int n = int.Parse(Console.ReadLine());

            maiorNivel = 0;

            int profundidade = Profundidade(n);
            MaiorProfundidade(n, 0);

            Console.WriteLine($"n={n}: profundidade {profundidade}, nivel maximo {maiorNivel}");
            soma += profundidade;
        }

        Console.WriteLine($"Soma das profundidades: {soma}");
    }
}
`,
      hints: [
        '`Profundidade` conta na volta: `1 + Profundidade(n - 1)`, com caso base devolvendo 0.',
        '`MaiorProfundidade` atualiza a variável **antes** de testar o caso base, para registrar também o nível em que parou.',
      ],
      tests: [
        {
          name: 'Três profundidades',
          stdin: '3\n100\n5\n0\n',
          expectedStdout:
            'n=100: profundidade 100, nivel maximo 100\nn=5: profundidade 5, nivel maximo 5\n' +
            'n=0: profundidade 0, nivel maximo 0\nSoma das profundidades: 105',
        },
        {
          name: 'Mil níveis',
          stdin: '1\n1000\n',
          expectedStdout:
            'n=1000: profundidade 1000, nivel maximo 1000\nSoma das profundidades: 1000',
        },
        {
          name: 'Um nível',
          stdin: '1\n1\n',
          expectedStdout:
            'n=1: profundidade 1, nivel maximo 1\nSoma das profundidades: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c03l09',
    title: 'Prática: contagem em árvore',
    objective: 'Percorrer uma estrutura hierárquica com recursão, o caso em que ela é claramente melhor que o laço.',
    concept: [
      {
        kind: 'text',
        body:
          'Até aqui a recursão sempre teve uma alternativa iterativa razoável. Em estruturas **hierárquicas** — pastas dentro de pastas, categorias dentro de categorias — essa alternativa deixa de ser simples, e a recursão vira a escolha óbvia.',
      },
      {
        kind: 'text',
        body:
          'Uma árvore pode ser representada por um dicionário que associa cada nó à lista de seus filhos. Percorrê-la é visitar um nó e depois, recursivamente, cada um dos filhos.',
      },
      {
        kind: 'code',
        code: `static int ContarNos(Dictionary<string, List<string>> arvore, string no)
{
    int total = 1;                          // conta o proprio no

    if (arvore.TryGetValue(no, out List<string> filhos))
    {
        foreach (string filho in filhos)
        {
            total += ContarNos(arvore, filho);   // soma cada subarvore
        }
    }

    return total;
}`,
        caption: 'Um laço **e** uma recursão: o laço percorre os filhos, a recursão desce em cada um.',
      },
      {
        kind: 'output',
        code: `raiz
├── a
│   ├── c
│   └── d
└── b
    └── e

5 nos, profundidade 3, 3 folhas (c, d, e)`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A combinação de laço com recursão é o que distingue árvores de listas. Na lista, cada nó tem no máximo um sucessor e um laço basta. Na árvore, cada nó tem **vários**, e é preciso descer em todos.',
      },
      {
        kind: 'text',
        body:
          'Um nó sem filhos é chamado de **folha**. No código, ele é justamente o caso base: o `TryGetValue` falha ou a lista está vazia, o `foreach` não dá voltas, e a chamada devolve 1.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Este algoritmo assume que a estrutura é realmente uma **árvore**: sem ciclos. Se um nó fosse descendente de si mesmo, a recursão nunca terminaria — e o caso base nunca seria alcançado. Grafos com ciclos exigem marcar os nós já visitados, assunto da Seção 7.',
      },
    ],
    quiz: [
      {
        id: 's04c03l09q1',
        type: 'single',
        prompt: 'Por que percorrer uma árvore combina laço com recursão?',
        options: [
          { id: 'a', text: 'O laço percorre os filhos de um nó; a recursão desce em cada filho.', correct: true },
          { id: 'b', text: 'Porque o laço é mais rápido.' },
          { id: 'c', text: 'Porque a recursão sozinha não compila.' },
          { id: 'd', text: 'Para evitar estouro de pilha.' },
        ],
        explanation:
          'Cada nó tem vários filhos, e cada filho é uma subárvore completa. São duas dimensões: largura resolvida pelo laço, profundidade pela recursão.',
      },
      {
        id: 's04c03l09q2',
        type: 'single',
        prompt: 'O que é uma folha, e como ela aparece no código?',
        options: [
          { id: 'a', text: 'Um nó sem filhos: o `foreach` não dá voltas e a chamada devolve 1.', correct: true },
          { id: 'b', text: 'O nó raiz da árvore.' },
          { id: 'c', text: 'Um nó com exatamente um filho.' },
          { id: 'd', text: 'O nó de maior profundidade.' },
        ],
        explanation:
          'A folha é o caso base natural. Ele não precisa de um `if` explícito: a ausência de filhos já impede qualquer chamada nova.',
      },
      {
        id: 's04c03l09q3',
        type: 'single',
        prompt: 'O que aconteceria se a estrutura tivesse um ciclo?',
        options: [
          { id: 'a', text: 'A recursão nunca terminaria e a pilha estouraria.', correct: true },
          { id: 'b', text: 'A contagem sairia com um nó a menos.' },
          { id: 'c', text: 'O `TryGetValue` devolveria `false`.' },
          { id: 'd', text: 'Nada: o algoritmo trata ciclos.' },
        ],
        explanation:
          'Um nó que é seu próprio descendente faz o percurso voltar ao ponto de partida indefinidamente. Grafos exigem um conjunto de visitados para quebrar esse ciclo.',
      },
    ],
    challenge: {
      brief:
        'Analise uma árvore de categorias. Leia `n` relações pai-filho e depois o nome da raiz. Escreva `ContarNos`, `Profundidade` e `ContarFolhas`, todos recursivos, e produza o relatório.',
      requirements: [
        'Os três métodos recebem o dicionário da árvore e o nome de um nó',
        '`ContarNos` devolve quantos nós há na subárvore, incluindo o próprio',
        '`Profundidade` devolve quantos níveis a subárvore tem, sendo `1` para uma folha',
        '`ContarFolhas` devolve quantos nós sem filhos há na subárvore',
        'Linha 1: `Nos: k`',
        'Linha 2: `Profundidade: p`',
        'Linha 3: `Folhas: f`',
        'Cada relação da entrada ocupa duas linhas: o pai e o filho',
        'A árvore não tem ciclos',
        'Não mude as assinaturas dos três métodos',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static int ContarNos(Dictionary<string, List<string>> arvore, string no)
    {
        return 0;
    }

    static int Profundidade(Dictionary<string, List<string>> arvore, string no)
    {
        // Uma folha tem profundidade 1
        return 0;
    }

    static int ContarFolhas(Dictionary<string, List<string>> arvore, string no)
    {
        return 0;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, List<string>> arvore = new Dictionary<string, List<string>>();

        for (int i = 0; i < n; i++)
        {
            string pai = Console.ReadLine();
            string filho = Console.ReadLine();

            if (!arvore.TryGetValue(pai, out List<string> filhos))
            {
                filhos = new List<string>();
                arvore[pai] = filhos;
            }

            filhos.Add(filho);
        }

        string raiz = Console.ReadLine();

        // Chame os tres a partir da raiz
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static int ContarNos(Dictionary<string, List<string>> arvore, string no)
    {
        int total = 1;

        if (arvore.TryGetValue(no, out List<string> filhos))
        {
            foreach (string filho in filhos)
            {
                total += ContarNos(arvore, filho);
            }
        }

        return total;
    }

    static int Profundidade(Dictionary<string, List<string>> arvore, string no)
    {
        if (!arvore.TryGetValue(no, out List<string> filhos) || filhos.Count == 0)
        {
            return 1;
        }

        int maior = 0;

        foreach (string filho in filhos)
        {
            int profundidadeFilho = Profundidade(arvore, filho);

            if (profundidadeFilho > maior)
            {
                maior = profundidadeFilho;
            }
        }

        return 1 + maior;
    }

    static int ContarFolhas(Dictionary<string, List<string>> arvore, string no)
    {
        if (!arvore.TryGetValue(no, out List<string> filhos) || filhos.Count == 0)
        {
            return 1;
        }

        int total = 0;

        foreach (string filho in filhos)
        {
            total += ContarFolhas(arvore, filho);
        }

        return total;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, List<string>> arvore = new Dictionary<string, List<string>>();

        for (int i = 0; i < n; i++)
        {
            string pai = Console.ReadLine();
            string filho = Console.ReadLine();

            if (!arvore.TryGetValue(pai, out List<string> filhos))
            {
                filhos = new List<string>();
                arvore[pai] = filhos;
            }

            filhos.Add(filho);
        }

        string raiz = Console.ReadLine();

        Console.WriteLine($"Nos: {ContarNos(arvore, raiz)}");
        Console.WriteLine($"Profundidade: {Profundidade(arvore, raiz)}");
        Console.WriteLine($"Folhas: {ContarFolhas(arvore, raiz)}");
      }
}
`,
      hints: [
        '`ContarNos` começa em 1 — o próprio nó — e soma as subárvores. `ContarFolhas` começa em 0, porque um nó com filhos não é folha.',
        '`Profundidade` pega o **maior** entre os filhos e soma 1, em vez de somar todos.',
      ],
      tests: [
        {
          name: 'Árvore de cinco nós',
          stdin: '4\nraiz\na\nraiz\nb\na\nc\na\nd\nraiz\n',
          expectedStdout: 'Nos: 5\nProfundidade: 3\nFolhas: 3',
        },
        {
          name: 'Raiz sem filhos é uma folha',
          stdin: '0\nsolo\n',
          expectedStdout: 'Nos: 1\nProfundidade: 1\nFolhas: 1',
        },
        {
          name: 'Cadeia linear',
          stdin: '3\na\nb\nb\nc\nc\nd\na\n',
          expectedStdout: 'Nos: 4\nProfundidade: 4\nFolhas: 1',
        },
        {
          name: 'Subárvore a partir de um nó do meio',
          stdin: '4\nraiz\na\nraiz\nb\na\nc\na\nd\na\n',
          expectedStdout: 'Nos: 3\nProfundidade: 2\nFolhas: 2',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c03l10',
    title: 'Checkpoint: recursão',
    objective: 'Escolher entre recursão e laço com critério, aplicando cada um onde ele é claramente melhor.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint reúne quatro problemas recursivos de naturezas diferentes. O objetivo não é usar recursão em tudo — é reconhecer **por que** cada um pede o que pede.',
      },
      {
        kind: 'table',
        headers: ['Problema', 'Tipo de redução', 'Custo'],
        rows: [
          ['inverter texto', 'um caractere por vez', 'linear'],
          ['MDC de Euclides', 'resto, encolhe rápido', 'logarítmico'],
          ['soma de dígitos', 'divisão por 10', 'logarítmico'],
          ['contar caminhos em grade', 'duas chamadas', '**exponencial**'],
        ],
      },
      {
        kind: 'text',
        body:
          'O último merece atenção. Contar caminhos em uma grade — andando só para a direita e para baixo — tem a mesma forma do Fibonacci: **duas chamadas por nível**, e portanto o mesmo desperdício por recálculo.',
      },
      {
        kind: 'code',
        code: `static long Caminhos(int linhas, int colunas)
{
    if (linhas == 1 || colunas == 1) return 1;   // so um caminho reto

    return Caminhos(linhas - 1, colunas)
         + Caminhos(linhas, colunas - 1);
}`,
        caption: 'Chegar a uma célula é vir de cima ou vir da esquerda — daí as duas chamadas.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O MDC recursivo é notavelmente elegante: `Mdc(a, b) = Mdc(b, a % b)`, com caso base em `b == 0`. É a mesma redução do laço da Seção 2, escrita na forma que espelha a definição matemática.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A contagem de caminhos cresce rápido: uma grade 8×8 tem 3.432 caminhos e faz milhares de chamadas repetidas. Mantenha as grades pequenas — e note que este é exatamente o problema que a memoização da Seção 7 resolve.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Escreva e teste um método por vez. Os quatro são independentes entre si, então um erro em um não contamina os outros — o que torna este checkpoint mais fácil de depurar que os anteriores.',
      },
    ],
    quiz: [
      {
        id: 's04c03l10q1',
        type: 'single',
        prompt: 'Por que contar caminhos em grade é exponencial?',
        options: [
          { id: 'a', text: 'Porque faz duas chamadas por nível, recalculando as mesmas células.', correct: true },
          { id: 'b', text: 'Porque a grade é bidimensional.' },
          { id: 'c', text: 'Porque usa `long`.' },
          { id: 'd', text: 'Porque o caso base é complexo.' },
        ],
        explanation:
          'É a mesma estrutura do Fibonacci: uma árvore binária de chamadas em que os mesmos subproblemas reaparecem em ramos diferentes.',
      },
      {
        id: 's04c03l10q2',
        type: 'single',
        prompt: 'Qual é o caso base do MDC recursivo?',
        options: [
          { id: 'a', code: 'b == 0, devolvendo a', correct: true },
          { id: 'b', code: 'a == b, devolvendo a' },
          { id: 'c', code: 'a == 0, devolvendo b' },
          { id: 'd', code: 'a < b, trocando os dois' },
        ],
        explanation:
          'É a mesma condição de parada do laço da Seção 2. O MDC de um número com zero é o próprio número.',
      },
      {
        id: 's04c03l10q3',
        type: 'single',
        prompt: 'Quantos caminhos existem em uma grade 3×3?',
        options: [
          { id: 'a', code: '6', correct: true },
          { id: 'b', code: '9' },
          { id: 'c', code: '4' },
          { id: 'd', code: '3' },
        ],
        explanation:
          'Da célula inicial à final é preciso descer 2 e andar 2 para a direita, em qualquer ordem — são 6 combinações.',
      },
    ],
    challenge: {
      brief:
        'Resolva quatro problemas recursivos: `Inverter` inverte um texto, `Mdc` calcula o máximo divisor comum, `SomaDigitos` soma os dígitos de um número, e `Caminhos` conta as rotas em uma grade. Leia uma entrada para cada e produza o relatório.',
      requirements: [
        '`Inverter` recebe uma `string` e devolve a `string` invertida',
        '`Mdc` recebe dois `int` e devolve um `int`',
        '`SomaDigitos` recebe um `int` e devolve um `int`',
        '`Caminhos` recebe dois `int` e devolve um `long`',
        'Linha 1: `Invertido: oaxiac`',
        'Linha 2: `MDC: 6`',
        'Linha 3: `Soma dos digitos: 14`',
        'Linha 4: `Caminhos: 6`',
        'Linha 5: `Chamadas de Caminhos: k`',
        'As quatro implementações precisam ser recursivas, sem `for` nem `while`',
        'Um texto vazio invertido continua vazio, e `SomaDigitos(0)` é `0`',
        'Não mude as assinaturas dos quatro métodos',
      ],
      starterCode: `using System;

class Program
{
    static int chamadasCaminhos = 0;

    static string Inverter(string texto)
    {
        return "";
    }

    static int Mdc(int a, int b)
    {
        return 0;
    }

    static int SomaDigitos(int n)
    {
        return 0;
    }

    static long Caminhos(int linhas, int colunas)
    {
        chamadasCaminhos++;

        return 0;
    }

    static void Main()
    {
        string texto = Console.ReadLine();
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());
        int numero = int.Parse(Console.ReadLine());
        int linhas = int.Parse(Console.ReadLine());
        int colunas = int.Parse(Console.ReadLine());

        // Chame os quatro e monte o relatorio
    }
}
`,
      solution: `using System;

class Program
{
    static int chamadasCaminhos = 0;

    static string Inverter(string texto)
    {
        if (texto.Length <= 1)
        {
            return texto;
        }

        return Inverter(texto.Substring(1)) + texto[0];
    }

    static int Mdc(int a, int b)
    {
        if (b == 0)
        {
            return a;
        }

        return Mdc(b, a % b);
    }

    static int SomaDigitos(int n)
    {
        if (n < 10)
        {
            return n;
        }

        return n % 10 + SomaDigitos(n / 10);
    }

    static long Caminhos(int linhas, int colunas)
    {
        chamadasCaminhos++;

        if (linhas == 1 || colunas == 1)
        {
            return 1;
        }

        return Caminhos(linhas - 1, colunas) + Caminhos(linhas, colunas - 1);
    }

    static void Main()
    {
        string texto = Console.ReadLine();
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());
        int numero = int.Parse(Console.ReadLine());
        int linhas = int.Parse(Console.ReadLine());
        int colunas = int.Parse(Console.ReadLine());

        Console.WriteLine($"Invertido: {Inverter(texto)}");
        Console.WriteLine($"MDC: {Mdc(a, b)}");
        Console.WriteLine($"Soma dos digitos: {SomaDigitos(numero)}");
        Console.WriteLine($"Caminhos: {Caminhos(linhas, colunas)}");
        Console.WriteLine($"Chamadas de Caminhos: {chamadasCaminhos}");
    }
}
`,
      hints: [
        '`Inverter` pode devolver a inversão do resto do texto seguida do primeiro caractere: `Inverter(texto.Substring(1)) + texto[0]`.',
        '`SomaDigitos` usa o caso base `n < 10`, que cobre o zero e qualquer número de um dígito.',
      ],
      tests: [
        {
          name: 'Entrada completa',
          stdin: 'caixao\n48\n18\n4820\n3\n3\n',
          expectedStdout:
            'Invertido: oaxiac\nMDC: 6\nSoma dos digitos: 14\nCaminhos: 6\nChamadas de Caminhos: 11',
        },
        {
          name: 'Grade de uma linha',
          stdin: 'ab\n7\n7\n5\n1\n5\n',
          expectedStdout:
            'Invertido: ba\nMDC: 7\nSoma dos digitos: 5\nCaminhos: 1\nChamadas de Caminhos: 1',
        },
        {
          name: 'Números primos entre si e grade maior',
          stdin: 'x\n17\n5\n999\n4\n4\n',
          expectedStdout:
            'Invertido: x\nMDC: 1\nSoma dos digitos: 27\nCaminhos: 20\nChamadas de Caminhos: 39',
        },
        {
          name: 'Texto vazio e zero',
          stdin: '\n10\n0\n0\n2\n2\n',
          expectedStdout:
            'Invertido:\nMDC: 10\nSoma dos digitos: 0\nCaminhos: 2\nChamadas de Caminhos: 3',
          hidden: true,
        },
      ],
    },
  },
]
