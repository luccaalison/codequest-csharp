import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's01c03l01',
    title: 'Operadores aritméticos',
    objective: 'Combinar valores com soma, subtração, multiplicação e divisão, e prever o tipo do resultado.',
    concept: [
      {
        kind: 'text',
        body:
          'Os quatro operadores básicos são `+`, `-`, `*` e `/`. O detalhe que pega todo mundo: o **tipo dos operandos** decide o tipo do resultado, e isso muda a resposta.',
      },
      {
        kind: 'code',
        code: `Console.WriteLine(7 + 3);      // 10
Console.WriteLine(7 - 3);      // 4
Console.WriteLine(7 * 3);      // 21
Console.WriteLine(7 / 3);      // 2   <- divisao inteira!
Console.WriteLine(7.0 / 3);    // 2.3333333333333335`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Se os dois lados de `/` são inteiros, C# faz divisão inteira e joga a parte fracionária fora. Não arredonda: trunca. Para obter `2.33...` basta um dos lados ser `double`.',
      },
      {
        kind: 'text',
        body:
          'O `+` também funciona com texto, mas aí ele concatena em vez de somar. `"1" + "2"` é `"12"`, não `3`.',
      },
    ],
    quiz: [
      {
        id: 's01c03l01q1',
        type: 'single',
        prompt: 'O que imprime?',
        code: 'Console.WriteLine(9 / 2);',
        options: [
          { id: 'a', code: '4', correct: true },
          { id: 'b', code: '4.5' },
          { id: 'c', code: '5' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          'Dois inteiros produzem divisão inteira: `4.5` é truncado para `4`. Note que trunca, não arredonda.',
      },
      {
        id: 's01c03l01q2',
        type: 'single',
        prompt: 'Como obter `4.5` como resultado?',
        options: [
          { id: 'a', code: 'Console.WriteLine(9 / 2.0);', correct: true },
          { id: 'b', code: 'Console.WriteLine((9 / 2).ToString("0.0"));' },
          { id: 'c', code: 'Console.WriteLine(9 % 2);' },
          { id: 'd', code: 'Console.WriteLine(double(9 / 2));' },
        ],
        explanation:
          'Basta um operando ser `double` para a divisão ser real. A opção B formata um `4` que já perdeu a fração, e a D não é sintaxe válida em C#.',
      },
      {
        id: 's01c03l01q3',
        type: 'single',
        prompt: 'Qual é a saída?',
        code: 'Console.WriteLine("2" + 3);',
        options: [
          { id: 'a', code: '23', correct: true },
          { id: 'b', code: '5' },
          { id: 'c', text: 'Erro de compilação' },
          { id: 'd', code: '2 3' },
        ],
        explanation:
          'Quando um dos lados de `+` é `string`, o outro é convertido em texto e os dois são concatenados. Essa é uma fonte comum de bug ao montar mensagens.',
      },
    ],
    challenge: {
      brief:
        'Uma turma tem 34 alunos e as carteiras vêm em pacotes de 6. Calcule quantos pacotes completos dão para montar e quantos alunos ficariam sem carteira usando só pacotes completos.',
      requirements: [
        'Linha 1: `Pacotes completos: 5`',
        'Linha 2: `Alunos sem carteira: 4`',
        'Linha 3: `Media por pacote: 6.8`',
        'A média deve ser calculada como divisão real de alunos por pacotes',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int alunos = 34;
        int carteirasPorPacote = 6;

        // Pacotes completos, sobra, e a media real
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int alunos = 34;
        int carteirasPorPacote = 6;

        int pacotes = alunos / carteirasPorPacote;
        int sobra = alunos - (pacotes * carteirasPorPacote);
        double media = (double)alunos / pacotes;

        Console.WriteLine("Pacotes completos: " + pacotes);
        Console.WriteLine("Alunos sem carteira: " + sobra);
        Console.WriteLine("Media por pacote: " + media);
    }
}
`,
      hints: [
        'A divisão inteira `34 / 6` já dá os pacotes completos.',
        'A sobra é o total menos o que os pacotes cobrem.',
        'Para a média real, converta um dos lados com `(double)`.',
      ],
      tests: [
        {
          name: 'Distribuição de carteiras',
          expectedStdout:
            'Pacotes completos: 5\nAlunos sem carteira: 4\nMedia por pacote: 6.8',
        },
      ],
    },
  },
  {
    id: 's01c03l02',
    title: 'Divisão inteira e resto com %',
    objective: 'Usar / e % juntos para resolver problemas de agrupamento, paridade e ciclos.',
    concept: [
      {
        kind: 'text',
        body:
          'O operador `%` devolve o **resto** da divisão. Junto com a divisão inteira, ele resolve uma família enorme de problemas: quantos grupos cabem, o que sobra, e onde algo cai em um ciclo.',
      },
      {
        kind: 'code',
        code: `Console.WriteLine(17 / 5);   // 3  -> quantos grupos completos
Console.WriteLine(17 % 5);   // 2  -> o que sobra

Console.WriteLine(10 % 2);   // 0  -> par
Console.WriteLine(7 % 2);    // 1  -> impar`,
      },
      {
        kind: 'table',
        headers: ['Pergunta', 'Expressão'],
        rows: [
          ['É par?', '`n % 2 == 0`'],
          ['É múltiplo de 3?', '`n % 3 == 0`'],
          ['Último dígito de um número', '`n % 10`'],
          ['Dia da semana daqui a n dias', '`(hoje + n) % 7`'],
          ['Quantas caixas cheias?', '`total / porCaixa`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '`%` com números negativos segue o sinal do dividendo em C#: `-7 % 3` é `-1`, não `2`. Se precisar sempre de um resto positivo, use `((n % m) + m) % m`.',
      },
    ],
    quiz: [
      {
        id: 's01c03l02q1',
        type: 'single',
        prompt: 'Qual é o valor de `23 % 4`?',
        options: [
          { id: 'a', code: '3', correct: true },
          { id: 'b', code: '5' },
          { id: 'c', code: '5.75' },
          { id: 'd', code: '0' },
        ],
        explanation: '`4 * 5 = 20`, sobrando `3`. A divisão inteira `23 / 4` daria `5`.',
      },
      {
        id: 's01c03l02q2',
        type: 'single',
        prompt: 'Como testar se um número guardado em `n` é múltiplo de 7?',
        options: [
          { id: 'a', code: 'n % 7 == 0', correct: true },
          { id: 'b', code: 'n / 7 == 0' },
          { id: 'c', code: '7 % n == 0' },
          { id: 'd', code: 'n % 7 == 7' },
        ],
        explanation:
          'Múltiplo significa divisão sem resto, então `n % 7` tem que ser zero. A opção B só é verdadeira para `n` menor que 7.',
      },
      {
        id: 's01c03l02q3',
        type: 'single',
        prompt: 'Você tem 95 minutos. Qual expressão dá as horas cheias e quais os minutos restantes?',
        options: [
          { id: 'a', code: '95 / 60 e 95 % 60', correct: true },
          { id: 'b', code: '95 % 60 e 95 / 60' },
          { id: 'c', code: '95 / 60.0 e 95 - 60' },
          { id: 'd', code: '95 * 60 e 95 / 60' },
        ],
        explanation:
          'A divisão inteira dá `1` hora e o resto dá `35` minutos. Esse par `/` e `%` é o padrão para quebrar uma unidade em outra.',
      },
    ],
    challenge: {
      brief:
        'Uma loja precisa embalar 247 produtos em caixas de 12. Informe quantas caixas cheias, quantos produtos sobram, e quantas caixas serão usadas no total (a sobra também precisa de caixa).',
      requirements: [
        'Linha 1: `Caixas cheias: 20`',
        'Linha 2: `Sobra: 7`',
        'Linha 3: `Caixas usadas: 21`',
        'Calcule tudo com `/` e `%`, sem escrever os resultados na mão',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int produtos = 247;
        int porCaixa = 12;

        // Caixas cheias, sobra, e total de caixas usadas
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int produtos = 247;
        int porCaixa = 12;

        int cheias = produtos / porCaixa;
        int sobra = produtos % porCaixa;
        int usadas = cheias;
        if (sobra > 0)
        {
            usadas = cheias + 1;
        }

        Console.WriteLine("Caixas cheias: " + cheias);
        Console.WriteLine("Sobra: " + sobra);
        Console.WriteLine("Caixas usadas: " + usadas);
    }
}
`,
      hints: [
        '`produtos / porCaixa` dá as caixas cheias e `produtos % porCaixa` dá a sobra.',
        'Só some uma caixa extra se a sobra for maior que zero.',
      ],
      tests: [
        {
          name: 'Embalagem de 247 produtos',
          expectedStdout: 'Caixas cheias: 20\nSobra: 7\nCaixas usadas: 21',
        },
      ],
    },
  },
  {
    id: 's01c03l03',
    title: 'Precedência e parênteses',
    objective: 'Prever a ordem em que C# avalia uma expressão e usar parênteses para deixar a intenção explícita.',
    concept: [
      {
        kind: 'text',
        body:
          'C# não avalia da esquerda para a direita cegamente: alguns operadores têm **prioridade** maior. Multiplicação e divisão vêm antes de soma e subtração, exatamente como na matemática.',
      },
      {
        kind: 'code',
        code: `Console.WriteLine(2 + 3 * 4);     // 14, nao 20
Console.WriteLine((2 + 3) * 4);   // 20
Console.WriteLine(10 - 4 - 3);    // 3, avalia da esquerda: (10-4)-3
Console.WriteLine(10 - (4 - 3));  // 9`,
      },
      {
        kind: 'table',
        headers: ['Prioridade', 'Operadores'],
        rows: [
          ['1 (maior)', '`()`'],
          ['2', '`*` `/` `%`'],
          ['3', '`+` `-`'],
          ['4', '`<` `>` `<=` `>=`'],
          ['5', '`==` `!=`'],
          ['6', '`&&`'],
          ['7 (menor)', '`||`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Você não precisa decorar a tabela. Na dúvida, use parênteses: eles não custam nada em desempenho e economizam minutos de depuração para quem lê o código depois.',
      },
    ],
    quiz: [
      {
        id: 's01c03l03q1',
        type: 'single',
        prompt: 'Qual é o resultado?',
        code: 'Console.WriteLine(1 + 2 * 3 - 4);',
        options: [
          { id: 'a', code: '3', correct: true },
          { id: 'b', code: '5' },
          { id: 'c', code: '-1' },
          { id: 'd', code: '9' },
        ],
        explanation: '`2 * 3` sai primeiro dando `6`. Depois `1 + 6 - 4` é avaliado da esquerda: `7 - 4 = 3`.',
      },
      {
        id: 's01c03l03q2',
        type: 'single',
        prompt: 'A média de 8 e 6 deveria ser 7. O que está errado em `double m = 8 + 6 / 2;`?',
        options: [
          {
            id: 'a',
            text: 'A divisão acontece antes da soma, então o resultado é 11. O correto é `(8 + 6) / 2.0`.',
            correct: true,
          },
          { id: 'b', text: 'Faltou converter para `double`, mas a ordem está certa.' },
          { id: 'c', text: 'Nada está errado, o resultado é 7.' },
          { id: 'd', text: 'A média precisa do operador `%`.' },
        ],
        explanation:
          '`6 / 2` vale `3`, e `8 + 3` dá `11`. Os parênteses ao redor da soma são obrigatórios, e o `2.0` garante divisão real quando a soma for ímpar.',
      },
      {
        id: 's01c03l03q3',
        type: 'single',
        prompt: 'Qual é o valor de `20 / 5 * 2`?',
        options: [
          { id: 'a', code: '8', correct: true },
          { id: 'b', code: '2' },
          { id: 'c', code: '200' },
          { id: 'd', code: '0' },
        ],
        explanation:
          '`*` e `/` têm a mesma prioridade, então a avaliação é da esquerda para a direita: `20 / 5 = 4`, depois `4 * 2 = 8`.',
      },
    ],
    challenge: {
      brief:
        'Um pedido tem 3 itens de R$ 24,00 e 2 itens de R$ 15,50, com desconto de R$ 10,00 no total e frete de R$ 12,00. Calcule o subtotal e o valor final na ordem correta.',
      requirements: [
        'Linha 1: `Subtotal: 103.00`',
        'Linha 2: `Total: 105.00`',
        'Use `decimal` e monte as expressões com parênteses onde for necessário',
        'O total é o subtotal menos o desconto mais o frete',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        decimal precoA = 24.00m;
        int quantidadeA = 3;
        decimal precoB = 15.50m;
        int quantidadeB = 2;
        decimal desconto = 10.00m;
        decimal frete = 12.00m;

        // Subtotal e total
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        decimal precoA = 24.00m;
        int quantidadeA = 3;
        decimal precoB = 15.50m;
        int quantidadeB = 2;
        decimal desconto = 10.00m;
        decimal frete = 12.00m;

        decimal subtotal = (precoA * quantidadeA) + (precoB * quantidadeB);
        decimal total = subtotal - desconto + frete;

        Console.WriteLine("Subtotal: " + subtotal);
        Console.WriteLine("Total: " + total);
    }
}
`,
      hints: [
        'Multiplique preço por quantidade de cada item antes de somar.',
        'Como `*` já tem prioridade sobre `+`, os parênteses aqui são para clareza, não para corrigir a ordem.',
      ],
      tests: [
        {
          name: 'Fechamento do pedido',
          expectedStdout: 'Subtotal: 103.00\nTotal: 105.00',
        },
      ],
    },
  },
  {
    id: 's01c03l04',
    title: 'Atribuição composta',
    objective: 'Atualizar uma variável a partir do próprio valor com +=, -=, *=, /= e %=.',
    concept: [
      {
        kind: 'text',
        body:
          'Somar algo ao valor atual de uma variável é tão comum que existe uma forma curta. `saldo = saldo + 50` pode virar `saldo += 50`, com exatamente o mesmo efeito.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Forma longa',
          code: `int total = 10;
total = total + 5;
total = total * 2;
total = total - 3;`,
        },
        right: {
          label: 'Forma composta',
          code: `int total = 10;
total += 5;
total *= 2;
total -= 3;`,
        },
        note: 'Os dois blocos terminam com `total` valendo 27. A forma composta só evita repetir o nome.',
      },
      {
        kind: 'text',
        body:
          'Todos os operadores aritméticos têm versão composta: `+=`, `-=`, `*=`, `/=` e `%=`. Com `string`, o `+=` também funciona e vai anexando texto ao final.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A atribuição composta aplica o operador ao **resultado inteiro** do lado direito. Ou seja, `x *= 2 + 3` é `x = x * (2 + 3)`, não `x = x * 2 + 3`.',
      },
    ],
    quiz: [
      {
        id: 's01c03l04q1',
        type: 'single',
        prompt: 'Qual é o valor final de `n`?',
        code: `int n = 8;
n += 4;
n /= 3;
Console.WriteLine(n);`,
        options: [
          { id: 'a', code: '4', correct: true },
          { id: 'b', code: '12' },
          { id: 'c', code: '9' },
          { id: 'd', code: '2' },
        ],
        explanation: '`n` vira `12` com o `+=`, e `12 / 3` dá `4`. As operações acontecem em sequência.',
      },
      {
        id: 's01c03l04q2',
        type: 'single',
        prompt: 'Se `x` vale 10, qual é o valor de `x` depois de `x *= 3 + 2;`?',
        options: [
          { id: 'a', code: '50', correct: true },
          { id: 'b', code: '32' },
          { id: 'c', code: '15' },
          { id: 'd', code: '60' },
        ],
        explanation:
          'O lado direito é avaliado inteiro primeiro: `3 + 2 = 5`, então `x = 10 * 5`. É como se houvesse parênteses invisíveis em volta de `3 + 2`.',
      },
      {
        id: 's01c03l04q3',
        type: 'single',
        prompt: 'Qual linha é equivalente a `msg = msg + "!";`?',
        options: [
          { id: 'a', code: 'msg += "!";', correct: true },
          { id: 'b', code: 'msg =+ "!";' },
          { id: 'c', code: 'msg++;' },
          { id: 'd', code: 'msg .= "!";' },
        ],
        explanation:
          '`+=` funciona com `string`. Cuidado com `=+`, que compila mas significa "atribuir o positivo de", um erro de digitação difícil de enxergar.',
      },
    ],
    challenge: {
      brief:
        'Simule uma conta que começa com R$ 200,00, recebe um depósito de R$ 150,00, sofre um saque de R$ 80,00 e depois uma tarifa de 2% sobre o saldo. Imprima o saldo após cada passo usando atribuição composta.',
      requirements: [
        'Linha 1: `Deposito: 350.00`',
        'Linha 2: `Saque: 270.00`',
        'Linha 3: `Tarifa: 264.6000`',
        'Use `+=`, `-=` e `-=` com a tarifa calculada sobre o saldo do momento',
        'Use `decimal` para o saldo',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        decimal saldo = 200.00m;

        // Deposito, saque e tarifa de 2%
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        decimal saldo = 200.00m;

        saldo += 150.00m;
        Console.WriteLine("Deposito: " + saldo);

        saldo -= 80.00m;
        Console.WriteLine("Saque: " + saldo);

        saldo -= saldo * 0.02m;
        Console.WriteLine("Tarifa: " + saldo);
    }
}
`,
      hints: [
        'Imprima o saldo logo depois de cada operação, não tudo no final.',
        'A tarifa é `saldo * 0.02m` subtraída do próprio saldo: `saldo -= saldo * 0.02m`.',
        'Com `decimal`, `270.00m * 0.02m` dá `5.4000`, e a subtração resulta em `264.60` porque a escala maior vem do lado esquerdo.',
      ],
      tests: [
        {
          name: 'Extrato da conta',
          expectedStdout: 'Deposito: 350.00\nSaque: 270.00\nTarifa: 264.6000',
        },
      ],
    },
  },
  {
    id: 's01c03l05',
    title: 'Incremento e decremento',
    objective: 'Usar ++ e -- e entender a diferença entre a forma prefixa e a posfixa.',
    concept: [
      {
        kind: 'text',
        body:
          'Somar ou subtrair exatamente 1 é tão frequente em contadores e laços que existem operadores dedicados: `++` e `--`.',
      },
      {
        kind: 'code',
        code: `int contador = 0;
contador++;              // agora vale 1
contador++;              // agora vale 2
contador--;              // volta para 1
Console.WriteLine(contador);   // 1`,
      },
      {
        kind: 'text',
        body:
          'A pegadinha aparece quando você **usa o valor na mesma expressão** em que incrementa. `i++` devolve o valor antigo e depois incrementa; `++i` incrementa primeiro e devolve o novo.',
      },
      {
        kind: 'code',
        code: `int a = 5;
Console.WriteLine(a++);   // imprime 5, depois a vira 6
Console.WriteLine(a);     // 6

int b = 5;
Console.WriteLine(++b);   // b vira 6 e imprime 6
Console.WriteLine(b);     // 6`,
        caption: 'Posfixo devolve antes de somar; prefixo soma antes de devolver.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Em código de produção, prefira usar `++` isolado em sua própria linha. Misturar incremento com leitura na mesma expressão é legal em C#, mas costuma render bugs sutis e revisões demoradas.',
      },
    ],
    quiz: [
      {
        id: 's01c03l05q1',
        type: 'single',
        prompt: 'O que é impresso?',
        code: `int i = 3;
int r = i++ + 1;
Console.WriteLine(r + " " + i);`,
        options: [
          { id: 'a', code: '4 4', correct: true },
          { id: 'b', code: '5 4' },
          { id: 'c', code: '4 3' },
          { id: 'd', code: '5 5' },
        ],
        explanation:
          '`i++` entrega o valor antigo `3` para a expressão, então `r` fica `4`. Depois disso `i` passa a valer `4`.',
      },
      {
        id: 's01c03l05q2',
        type: 'single',
        prompt: 'Qual par de linhas produz o mesmo resultado final em `n`?',
        options: [
          { id: 'a', code: 'n++;   e   ++n;', correct: true },
          { id: 'b', code: 'n++;   e   n += 2;' },
          { id: 'c', code: 'n--;   e   n = 1 - n;' },
          { id: 'd', code: 'n++;   e   n = n;' },
        ],
        explanation:
          'Quando o incremento está isolado, prefixo e posfixo têm o mesmo efeito sobre a variável. A diferença só aparece quando o valor devolvido é aproveitado.',
      },
      {
        id: 's01c03l05q3',
        type: 'single',
        prompt: 'Por que `int x = 5; x = x++;` deixa `x` valendo 5?',
        options: [
          {
            id: 'a',
            text: '`x++` devolve 5, o incremento acontece, e em seguida a atribuição sobrescreve x com o 5 devolvido.',
            correct: true,
          },
          { id: 'b', text: 'Porque `x++` não altera a variável quando está do lado direito.' },
          { id: 'c', text: 'Porque a linha não compila e x mantém o valor inicial.' },
          { id: 'd', text: 'Porque o compilador otimiza a linha e a remove.' },
        ],
        explanation:
          'A atribuição usa o valor que a expressão devolveu, apagando o incremento. É o exemplo clássico de por que não misturar `++` com atribuição.',
      },
    ],
    challenge: {
      brief:
        'Um catraca de academia começa o dia zerada. Registre três entradas e uma saída, imprimindo a contagem depois de cada evento, e no final informe quantas pessoas passaram pela catraca no total (entradas mais saídas).',
      requirements: [
        'Linhas 1 a 4: `Dentro: 1`, `Dentro: 2`, `Dentro: 3`, `Dentro: 2`',
        'Linha 5: `Eventos: 4`',
        'Use `++` e `--` para atualizar os contadores',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int dentro = 0;
        int eventos = 0;

        // Tres entradas e uma saida
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int dentro = 0;
        int eventos = 0;

        dentro++;
        eventos++;
        Console.WriteLine("Dentro: " + dentro);

        dentro++;
        eventos++;
        Console.WriteLine("Dentro: " + dentro);

        dentro++;
        eventos++;
        Console.WriteLine("Dentro: " + dentro);

        dentro--;
        eventos++;
        Console.WriteLine("Dentro: " + dentro);

        Console.WriteLine("Eventos: " + eventos);
    }
}
`,
      hints: [
        'Cada evento mexe em dois contadores: quem está dentro e quantos eventos ocorreram.',
        'A saída diminui `dentro` mas ainda **soma** em `eventos`.',
      ],
      tests: [
        {
          name: 'Contagem da catraca',
          expectedStdout: 'Dentro: 1\nDentro: 2\nDentro: 3\nDentro: 2\nEventos: 4',
        },
      ],
    },
  },
  {
    id: 's01c03l06',
    title: 'Comparando valores',
    objective: 'Produzir valores bool com os operadores relacionais e entender por que == não é =.',
    concept: [
      {
        kind: 'text',
        body:
          'Comparar dois valores gera um `bool`. Esses operadores são a matéria-prima de toda decisão que seu programa vai tomar.',
      },
      {
        kind: 'table',
        headers: ['Operador', 'Pergunta', 'Exemplo verdadeiro'],
        rows: [
          ['`==`', 'são iguais?', '`5 == 5`'],
          ['`!=`', 'são diferentes?', '`5 != 3`'],
          ['`>`', 'maior?', '`7 > 2`'],
          ['`<`', 'menor?', '`2 < 7`'],
          ['`>=`', 'maior ou igual?', '`5 >= 5`'],
          ['`<=`', 'menor ou igual?', '`4 <= 9`'],
        ],
      },
      {
        kind: 'code',
        code: `int idade = 20;
bool podeVotar = idade >= 16;
bool ehMenor = idade < 18;

Console.WriteLine(podeVotar);   // True
Console.WriteLine(ehMenor);     // False`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`=` atribui e `==` compara. Em C# essa confusão quase sempre vira erro de compilação, porque um `if` exige um `bool` e uma atribuição de `int` não é `bool`. Em `bool` os dois compilam, então preste atenção redobrada.',
      },
      {
        kind: 'text',
        body:
          'Com `string`, o `==` compara o **conteúdo**, letra por letra, incluindo maiúsculas e minúsculas. `"C#" == "c#"` é `false`.',
      },
    ],
    quiz: [
      {
        id: 's01c03l06q1',
        type: 'single',
        prompt: 'Qual é a saída?',
        code: `int a = 4;
Console.WriteLine(a * 2 >= 8);`,
        options: [
          { id: 'a', code: 'True', correct: true },
          { id: 'b', code: 'False' },
          { id: 'c', code: '8' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          'Aritmética tem prioridade sobre comparação, então avalia `8 >= 8`, que é `True`. Um `bool` impresso aparece com a primeira letra maiúscula.',
      },
      {
        id: 's01c03l06q2',
        type: 'single',
        prompt: 'Qual expressão verifica se `nota` está fora da faixa de 0 a 10?',
        options: [
          { id: 'a', code: 'nota < 0 || nota > 10', correct: true },
          { id: 'b', code: 'nota < 0 && nota > 10' },
          { id: 'c', code: '0 > nota > 10' },
          { id: 'd', code: 'nota != 0 && nota != 10' },
        ],
        explanation:
          'Estar fora significa abaixo do mínimo **ou** acima do máximo. A opção B nunca é verdadeira, e a C não é sintaxe válida para comparação em cadeia em C#.',
      },
      {
        id: 's01c03l06q3',
        type: 'single',
        prompt: 'O que imprime?',
        code: 'Console.WriteLine("Sim" == "sim");',
        options: [
          { id: 'a', code: 'False', correct: true },
          { id: 'b', code: 'True' },
          { id: 'c', text: 'Erro de compilação' },
          { id: 'd', text: 'Uma linha vazia' },
        ],
        explanation:
          'A comparação de `string` diferencia maiúsculas de minúsculas. Para ignorar isso existe `string.Equals(a, b, StringComparison.OrdinalIgnoreCase)`.',
      },
    ],
    challenge: {
      brief:
        'Um sistema de frete precisa avaliar um pacote de 8 kg e 32 cm de lado. Imprima três verificações: se é pesado (acima de 5 kg), se é grande (lado de 30 cm ou mais) e se cabe na franquia (até 10 kg).',
      requirements: [
        'Linha 1: `Pesado: True`',
        'Linha 2: `Grande: True`',
        'Linha 3: `Na franquia: True`',
        'Cada linha deve vir de uma variável `bool` calculada por comparação, sem escrever True na mão',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        double pesoKg = 8;
        double ladoCm = 32;

        // Tres verificacoes booleanas
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        double pesoKg = 8;
        double ladoCm = 32;

        bool pesado = pesoKg > 5;
        bool grande = ladoCm >= 30;
        bool naFranquia = pesoKg <= 10;

        Console.WriteLine("Pesado: " + pesado);
        Console.WriteLine("Grande: " + grande);
        Console.WriteLine("Na franquia: " + naFranquia);
    }
}
`,
      hints: [
        '"Acima de 5" é `> 5`, enquanto "30 ou mais" é `>= 30`. Leia o enunciado com atenção nesses limites.',
        'Concatenar um `bool` com `string` produz `True` ou `False` automaticamente.',
      ],
      tests: [
        {
          name: 'Avaliação do pacote',
          expectedStdout: 'Pesado: True\nGrande: True\nNa franquia: True',
        },
      ],
    },
  },
  {
    id: 's01c03l07',
    title: 'Operadores lógicos && e ||',
    objective: 'Combinar condições com E e OU para expressar regras compostas.',
    concept: [
      {
        kind: 'text',
        body:
          'Regras reais raramente dependem de uma única condição. Para combiná-las existem `&&` (E: exige as duas) e `||` (OU: basta uma).',
      },
      {
        kind: 'table',
        headers: ['a', 'b', '`a && b`', '`a \\|\\| b`'],
        rows: [
          ['true', 'true', 'true', 'true'],
          ['true', 'false', 'false', 'true'],
          ['false', 'true', 'false', 'true'],
          ['false', 'false', 'false', 'false'],
        ],
      },
      {
        kind: 'code',
        code: `int idade = 22;
bool temCarteira = true;

bool podeDirigir = idade >= 18 && temCarteira;      // true
bool temDesconto = idade < 12 || idade >= 60;       // false

Console.WriteLine(podeDirigir);
Console.WriteLine(temDesconto);`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '`&&` tem prioridade maior que `||`. Então `a || b && c` significa `a || (b && c)`. Quando os dois aparecem juntos, use parênteses e deixe a regra óbvia.',
      },
      {
        kind: 'text',
        body:
          'Para dizer que um valor está **dentro** de uma faixa, use `&&` com dois limites: `nota >= 0 && nota <= 10`. C# não aceita a forma encadeada `0 <= nota <= 10`.',
      },
    ],
    quiz: [
      {
        id: 's01c03l07q1',
        type: 'single',
        prompt: 'Qual é a saída?',
        code: `int n = 15;
Console.WriteLine(n % 3 == 0 && n % 5 == 0);`,
        options: [
          { id: 'a', code: 'True', correct: true },
          { id: 'b', code: 'False' },
          { id: 'c', code: '0' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation: '15 é divisível por 3 e por 5, então as duas condições são verdadeiras e o `&&` resulta em `True`.',
      },
      {
        id: 's01c03l07q2',
        type: 'single',
        prompt:
          'Regra: entra grátis quem tem menos de 6 anos ou mais de 65. Qual expressão traduz isso?',
        options: [
          { id: 'a', code: 'idade < 6 || idade > 65', correct: true },
          { id: 'b', code: 'idade < 6 && idade > 65' },
          { id: 'c', code: 'idade <= 6 || idade >= 65' },
          { id: 'd', code: 'idade < 6 || idade < 65' },
        ],
        explanation:
          'São dois casos alternativos, logo `||`. A opção C muda os limites ("menos de 6" não inclui 6) e a D é verdadeira para quase todo mundo.',
      },
      {
        id: 's01c03l07q3',
        type: 'single',
        prompt: 'Se `a` é false, `b` é true e `c` é true, quanto vale `a || b && c`?',
        options: [
          { id: 'a', code: 'true', correct: true },
          { id: 'b', code: 'false' },
          { id: 'c', text: 'Depende da ordem de leitura' },
          { id: 'd', text: 'Erro de compilação por ambiguidade' },
        ],
        explanation:
          '`&&` liga primeiro: `b && c` é `true`, e `false || true` é `true`. Se fosse `(a || b) && c` o resultado também seria `true` aqui, mas nem sempre coincide.',
      },
    ],
    challenge: {
      brief:
        'Um formulário de cadastro aprova o usuário quando ele tem 18 anos ou mais, aceitou os termos, e informou e-mail ou telefone. Avalie um usuário de 25 anos que aceitou os termos, deixou o e-mail vazio mas informou telefone.',
      requirements: [
        'Linha 1: `Contato informado: True`',
        'Linha 2: `Aprovado: True`',
        'A aprovação precisa combinar idade, termos e contato em uma única expressão booleana',
        'Considere e-mail informado quando `temEmail` for true',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int idade = 25;
        bool aceitouTermos = true;
        bool temEmail = false;
        bool temTelefone = true;

        // Contato informado e aprovacao final
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int idade = 25;
        bool aceitouTermos = true;
        bool temEmail = false;
        bool temTelefone = true;

        bool contato = temEmail || temTelefone;
        bool aprovado = idade >= 18 && aceitouTermos && contato;

        Console.WriteLine("Contato informado: " + contato);
        Console.WriteLine("Aprovado: " + aprovado);
    }
}
`,
      hints: [
        'Comece isolando a parte do "ou" em uma variável `contato`.',
        'A aprovação encadeia três condições obrigatórias com `&&`.',
      ],
      tests: [
        {
          name: 'Validação do cadastro',
          expectedStdout: 'Contato informado: True\nAprovado: True',
        },
      ],
    },
  },
  {
    id: 's01c03l08',
    title: 'Negação e curto-circuito',
    objective: 'Inverter condições com ! e entender por que && e || param de avaliar no meio do caminho.',
    concept: [
      {
        kind: 'text',
        body:
          'O `!` inverte um `bool`: o que era `true` fica `false`. Ele se lê como "não".',
      },
      {
        kind: 'code',
        code: `bool ativo = true;
Console.WriteLine(!ativo);            // False

int estoque = 0;
bool indisponivel = !(estoque > 0);   // true
Console.WriteLine(indisponivel);`,
      },
      {
        kind: 'text',
        body:
          'Os operadores `&&` e `||` fazem **curto-circuito**: se o primeiro lado já decide o resultado, o segundo nem é avaliado. Em `false && algo`, o `algo` é ignorado; em `true || algo`, também.',
      },
      {
        kind: 'code',
        code: `int divisor = 0;

// Seguro: o lado direito so roda se divisor != 0 for verdadeiro
if (divisor != 0 && 100 / divisor > 5)
{
    Console.WriteLine("Grande");
}

Console.WriteLine("Nao explodiu");`,
        caption: 'O curto-circuito é o que impede a divisão por zero aqui.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Coloque sempre a condição "de guarda" (a que verifica se é seguro continuar) do lado esquerdo. Esse padrão evita a maioria das exceções de valor inválido.',
      },
      {
        kind: 'text',
        body:
          'Prefira reescrever a comparação em vez de negar tudo: `!(a >= b)` é o mesmo que `a < b`, e a segunda forma é bem mais fácil de ler.',
      },
    ],
    quiz: [
      {
        id: 's01c03l08q1',
        type: 'single',
        prompt: 'Qual expressão é equivalente a `!(idade < 18)`?',
        options: [
          { id: 'a', code: 'idade >= 18', correct: true },
          { id: 'b', code: 'idade > 18' },
          { id: 'c', code: 'idade <= 18' },
          { id: 'd', code: 'idade != 18' },
        ],
        explanation:
          'A negação de "menor que" é "maior ou igual". Trocar `<` por `>` sem incluir o `=` é o erro mais comum aqui.',
      },
      {
        id: 's01c03l08q2',
        type: 'single',
        prompt: 'Por que a linha abaixo não lança exceção quando `total` é zero?',
        code: 'if (total != 0 && soma / total > 1) { }',
        options: [
          {
            id: 'a',
            text: 'Porque `&&` faz curto-circuito: com o lado esquerdo falso, a divisão nunca é executada.',
            correct: true,
          },
          { id: 'b', text: 'Porque divisão por zero devolve infinito em C#.' },
          { id: 'c', text: 'Porque o compilador reordena a expressão automaticamente.' },
          { id: 'd', text: 'Porque o `if` ignora expressões inválidas.' },
        ],
        explanation:
          'É exatamente para isso que o curto-circuito existe. Se você trocar a ordem dos dois lados, o programa passa a falhar.',
      },
      {
        id: 's01c03l08q3',
        type: 'single',
        prompt: 'Qual é a negação correta de `a && b`?',
        options: [
          { id: 'a', code: '!a || !b', correct: true },
          { id: 'b', code: '!a && !b' },
          { id: 'c', code: '!(a) && b' },
          { id: 'd', code: 'a || b' },
        ],
        explanation:
          'Negar um E vira um OU de negações. "Não é verdade que os dois valem" significa "pelo menos um não vale".',
      },
    ],
    challenge: {
      brief:
        'Um checkout precisa recusar o pedido quando o estoque é zero. Calcule a razão entre itens pedidos e estoque de forma segura, imprimindo `Indisponivel: True` e uma razão de `0` quando o estoque for zero.',
      requirements: [
        'Linha 1: `Indisponivel: True`',
        'Linha 2: `Razao: 0`',
        'Use `!` para derivar `indisponivel` a partir de uma comparação de estoque',
        'Use curto-circuito para nunca dividir por zero',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int pedidos = 12;
        int estoque = 0;

        // Indisponibilidade e razao segura
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int pedidos = 12;
        int estoque = 0;

        bool indisponivel = !(estoque > 0);
        int razao = 0;
        if (!indisponivel && pedidos / estoque > 0)
        {
            razao = pedidos / estoque;
        }

        Console.WriteLine("Indisponivel: " + indisponivel);
        Console.WriteLine("Razao: " + razao);
    }
}
`,
      hints: [
        '`!(estoque > 0)` já entrega a indisponibilidade.',
        'Deixe a divisão do lado direito de um `&&` cuja guarda garante estoque positivo.',
      ],
      tests: [
        {
          name: 'Checkout sem estoque',
          expectedStdout: 'Indisponivel: True\nRazao: 0',
        },
      ],
    },
  },
  {
    id: 's01c03l09',
    title: 'Prática: calculadora de bolso',
    objective: 'Aplicar aritmética, precedência e comparação em um problema com várias etapas.',
    concept: [
      {
        kind: 'text',
        body:
          'Hora de juntar as peças. Problemas reais chegam como um enunciado em português, e seu trabalho é traduzi-lo em expressões. A receita que funciona é sempre a mesma: identifique as entradas, escreva as contas intermediárias em variáveis nomeadas, e só então imprima.',
      },
      {
        kind: 'code',
        code: `// Ruim: uma expressao gigante e indecifravel
Console.WriteLine((a * 3 + b * 2 - 10) * 1.1 / 4);

// Bom: cada etapa tem nome
decimal itens = a * 3 + b * 2;
decimal comDesconto = itens - 10;
decimal comImposto = comDesconto * 1.1m;
decimal porPessoa = comImposto / 4;`,
        caption: 'Variáveis intermediárias custam nada e tornam o erro localizável.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Quando o resultado sai errado, imprima as variáveis intermediárias uma por uma. Em segundos você descobre em qual etapa a conta desviou.',
      },
    ],
    quiz: [
      {
        id: 's01c03l09q1',
        type: 'single',
        prompt:
          'Você precisa dividir 100 reais entre 3 pessoas e saber quantos centavos sobram inteiros. Qual dupla resolve?',
        options: [
          { id: 'a', code: '10000 / 3 e 10000 % 3', correct: true },
          { id: 'b', code: '100 / 3 e 100 % 3' },
          { id: 'c', code: '100 / 3.0 e 100 % 3.0' },
          { id: 'd', code: '100 * 3 e 100 / 3' },
        ],
        explanation:
          'Trabalhar em centavos com inteiros elimina o problema de arredondamento: `3333` centavos para cada um e `1` centavo de sobra.',
      },
      {
        id: 's01c03l09q2',
        type: 'single',
        prompt: 'Qual é o valor de `media` no código abaixo?',
        code: `int a = 7, b = 8;
double media = (a + b) / 2;`,
        options: [
          { id: 'a', code: '7', correct: true },
          { id: 'b', code: '7.5' },
          { id: 'c', code: '15' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          'A divisão acontece entre dois `int`, então dá `7` e só depois é convertida para `double`. Declarar a variável como `double` não conserta a conta: precisa de `/ 2.0`.',
      },
      {
        id: 's01c03l09q3',
        type: 'single',
        prompt: 'Qual expressão verifica se `ano` é bissexto de forma correta?',
        options: [
          {
            id: 'a',
            code: '(ano % 4 == 0 && ano % 100 != 0) || ano % 400 == 0',
            correct: true,
          },
          { id: 'b', code: 'ano % 4 == 0' },
          { id: 'c', code: 'ano % 4 == 0 && ano % 400 == 0' },
          { id: 'd', code: 'ano % 100 == 0 || ano % 400 == 0' },
        ],
        explanation:
          'A regra tem uma exceção dentro da exceção, e os parênteses são o que a torna correta. A opção B erra em 1900 e a C erra em 2024.',
      },
    ],
    challenge: {
      brief:
        'Monte o fechamento de uma corrida de aplicativo. A tarifa é R$ 5,00 de bandeirada, R$ 2,10 por km e R$ 0,45 por minuto. A corrida teve 12 km e 27 minutos. Sobre o valor bruto incide 20% de taxa da plataforma, e o motorista fica com o resto.',
      requirements: [
        'Linha 1: `Bruto: 42.35`',
        'Linha 2: `Taxa: 8.4700`',
        'Linha 3: `Motorista: 33.8800`',
        'Linha 4: `Acima da media: True`',
        '`Acima da media` compara o valor do motorista com R$ 30,00',
        'Use `decimal` em todos os valores monetários',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        decimal bandeirada = 5.00m;
        decimal porKm = 2.10m;
        decimal porMinuto = 0.45m;
        int km = 12;
        int minutos = 27;

        // Bruto, taxa de 20%, valor do motorista e comparacao
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        decimal bandeirada = 5.00m;
        decimal porKm = 2.10m;
        decimal porMinuto = 0.45m;
        int km = 12;
        int minutos = 27;

        decimal bruto = bandeirada + (porKm * km) + (porMinuto * minutos);
        decimal taxa = bruto * 0.20m;
        decimal motorista = bruto - taxa;
        bool acimaDaMedia = motorista > 30.00m;

        Console.WriteLine("Bruto: " + bruto);
        Console.WriteLine("Taxa: " + taxa);
        Console.WriteLine("Motorista: " + motorista);
        Console.WriteLine("Acima da media: " + acimaDaMedia);
    }
}
`,
      hints: [
        'O bruto soma três parcelas: bandeirada, distância e tempo.',
        'A taxa é `bruto * 0.20m`, e o motorista é o bruto menos a taxa.',
        'Confira as casas decimais: multiplicar por `0.20m` acrescenta escala, então a taxa sai com 4 casas.',
      ],
      tests: [
        {
          name: 'Fechamento da corrida',
          expectedStdout:
            'Bruto: 42.35\nTaxa: 8.4700\nMotorista: 33.8800\nAcima da media: True',
        },
      ],
    },
  },
  {
    id: 's01c03l10',
    title: 'Checkpoint: expressões',
    objective: 'Provar domínio de aritmética, precedência, resto e lógica booleana em um único programa.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint fecha o capítulo de operadores. Você vai precisar de tudo: divisão inteira, resto, precedência, comparação e combinação lógica.',
      },
      {
        kind: 'table',
        headers: ['Ferramenta', 'Quando usar'],
        rows: [
          ['`/` com inteiros', 'quantos grupos completos cabem'],
          ['`%`', 'o que sobra, paridade, múltiplos'],
          ['`(double)` ou `2.0`', 'quando a fração importa'],
          ['`&&` / `||`', 'combinar regras'],
          ['`!`', 'inverter uma condição'],
          ['parênteses', 'sempre que a ordem não for óbvia'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A maior parte dos erros de lógica em programas iniciantes não vem de sintaxe, vem de limites: `>` onde devia ser `>=`, ou `&&` onde devia ser `||`. Releia o enunciado prestando atenção nas palavras "ou mais", "acima de", "até".',
      },
    ],
    quiz: [
      {
        id: 's01c03l10q1',
        type: 'single',
        prompt: 'Qual é o resultado?',
        code: 'Console.WriteLine(10 + 20 % 6 * 2);',
        options: [
          { id: 'a', code: '14', correct: true },
          { id: 'b', code: '10' },
          { id: 'c', code: '60' },
          { id: 'd', code: '18' },
        ],
        explanation:
          '`%` e `*` têm a mesma prioridade e resolvem da esquerda: `20 % 6` dá `2`, `2 * 2` dá `4`, e `10 + 4` dá `14`.',
      },
      {
        id: 's01c03l10q2',
        type: 'multiple',
        prompt: 'Marque todas as afirmações verdadeiras.',
        options: [
          { id: 'a', text: '`7 / 2` vale 3 e `7 % 2` vale 1.', correct: true },
          { id: 'b', text: '`&&` é avaliado antes de `||`.', correct: true },
          {
            id: 'c',
            text: '`x += 2` é o mesmo que `x = x + 2`.',
            correct: true,
          },
          { id: 'd', text: '`0 <= n <= 10` é a forma correta de testar uma faixa em C#.' },
          { id: 'e', text: '`i++` devolve o valor já incrementado.' },
        ],
        explanation:
          'A faixa precisa de `n >= 0 && n <= 10`, e `i++` devolve o valor antigo (é `++i` que devolve o novo).',
      },
      {
        id: 's01c03l10q3',
        type: 'single',
        prompt:
          'Um ingresso é meia-entrada para estudantes ou para quem tem menos de 12 anos, mas só em dias úteis. Qual expressão traduz a regra?',
        options: [
          { id: 'a', code: '(estudante || idade < 12) && diaUtil', correct: true },
          { id: 'b', code: 'estudante || idade < 12 && diaUtil' },
          { id: 'c', code: 'estudante && idade < 12 && diaUtil' },
          { id: 'd', code: 'estudante || (idade < 12 || diaUtil)' },
        ],
        explanation:
          'O "mas só" vale para os dois casos, então os parênteses são obrigatórios. Sem eles (opção B) um estudante teria meia-entrada até no fim de semana.',
      },
    ],
    challenge: {
      brief:
        'Um estacionamento cobra R$ 8,00 pela primeira hora e R$ 3,50 por hora adicional, contando qualquer fração de hora como hora cheia. Um carro ficou 197 minutos. Além do valor, informe se o cliente ganha a validação gratuita, concedida quando ficou 3 horas ou mais e não é isento.',
      requirements: [
        'Linha 1: `Horas cobradas: 4`',
        'Linha 2: `Valor: 18.50`',
        'Linha 3: `Validacao gratis: True`',
        'Calcule as horas cobradas a partir dos minutos com `/` e `%`',
        'Use `decimal` para o valor e `bool` para a validação',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int minutos = 197;
        decimal primeiraHora = 8.00m;
        decimal horaAdicional = 3.50m;
        bool isento = false;

        // Horas cobradas, valor total e validacao
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int minutos = 197;
        decimal primeiraHora = 8.00m;
        decimal horaAdicional = 3.50m;
        bool isento = false;

        int horas = minutos / 60;
        if (minutos % 60 > 0)
        {
            horas++;
        }

        decimal valor = primeiraHora + (horaAdicional * (horas - 1));
        bool validacaoGratis = horas >= 3 && !isento;

        Console.WriteLine("Horas cobradas: " + horas);
        Console.WriteLine("Valor: " + valor);
        Console.WriteLine("Validacao gratis: " + validacaoGratis);
    }
}
`,
      hints: [
        '`197 / 60` dá 3 horas e `197 % 60` dá 17 minutos de sobra, que arredondam para a quarta hora.',
        'As horas adicionais são `horas - 1`, porque a primeira tem preço próprio.',
        'A validação combina uma comparação com uma negação: `horas >= 3 && !isento`.',
      ],
      tests: [
        {
          name: 'Cobrança de 197 minutos',
          expectedStdout: 'Horas cobradas: 4\nValor: 18.50\nValidacao gratis: True',
        },
      ],
    },
  },
]
