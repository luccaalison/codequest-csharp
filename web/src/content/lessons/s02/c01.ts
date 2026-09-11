import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's02c01l01',
    title: 'Anatomia de um while',
    objective: 'Repetir um bloco de código enquanto uma condição for verdadeira, entendendo as três peças que todo laço precisa ter.',
    concept: [
      {
        kind: 'text',
        body:
          'Até agora todo programa que você escreveu executava cada linha exatamente uma vez. O `while` quebra essa regra: ele repete um bloco **enquanto** uma condição for verdadeira.',
      },
      {
        kind: 'code',
        code: `int i = 1;                 // 1. preparacao: antes do laco

while (i <= 3)             // 2. condicao: testada a cada volta
{
    Console.WriteLine(i);
    i++;                   // 3. progresso: muda o que a condicao testa
}`,
        caption: 'Todo laço que termina tem estas três peças.',
      },
      {
        kind: 'output',
        code: `1
2
3`,
      },
      {
        kind: 'text',
        body:
          'A ordem importa: a condição é avaliada **antes** de cada volta, inclusive da primeira. Se ela já começa falsa, o corpo nunca executa e o programa segue em frente sem reclamar.',
      },
      {
        kind: 'table',
        headers: ['Volta', '`i` no teste', 'Condição `i <= 3`', 'O que acontece'],
        rows: [
          ['1ª', '1', 'true', 'imprime 1, `i` vira 2'],
          ['2ª', '2', 'true', 'imprime 2, `i` vira 3'],
          ['3ª', '3', 'true', 'imprime 3, `i` vira 4'],
          ['4ª', '4', 'false', 'o laço termina'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Esquecer a peça 3 é o erro clássico. Sem o `i++`, a condição continua verdadeira para sempre e o programa nunca termina — o desafio simplesmente estoura o tempo limite.',
      },
    ],
    quiz: [
      {
        id: 's02c01l01q1',
        type: 'single',
        prompt: 'Quantas linhas este trecho imprime?',
        code: `int x = 5;
while (x < 5)
{
    Console.WriteLine("oi");
    x++;
}`,
        options: [
          { id: 'a', text: 'Nenhuma: a condição já começa falsa.', correct: true },
          { id: 'b', text: 'Uma: o corpo sempre roda pelo menos uma vez.' },
          { id: 'c', text: 'Cinco.' },
          { id: 'd', text: 'Infinitas.' },
        ],
        explanation:
          'O `while` testa **antes** de executar. Como `5 < 5` é falso logo de cara, o corpo é pulado inteiro.',
      },
      {
        id: 's02c01l01q2',
        type: 'single',
        prompt: 'Qual é o problema deste laço?',
        code: `int i = 1;
while (i <= 3)
{
    Console.WriteLine(i);
}`,
        options: [
          { id: 'a', text: 'Nada muda `i`, então a condição nunca fica falsa e o laço não termina.', correct: true },
          { id: 'b', text: 'Falta um ponto e vírgula depois do `while`.' },
          { id: 'c', text: '`i` deveria começar em 0.' },
          { id: 'd', text: 'A condição deveria usar `<` em vez de `<=`.' },
        ],
        explanation:
          'Falta a peça de progresso. O corpo precisa alterar alguma variável que a condição testa, senão o teste dá o mesmo resultado para sempre.',
      },
      {
        id: 's02c01l01q3',
        type: 'multiple',
        prompt: 'Quais afirmações sobre `while` são verdadeiras?',
        options: [
          { id: 'a', text: 'A condição é reavaliada antes de cada volta.', correct: true },
          { id: 'b', text: 'O corpo pode não executar nenhuma vez.', correct: true },
          { id: 'c', text: 'A variável de controle precisa ser declarada antes do laço.', correct: true },
          { id: 'd', text: 'O laço para no instante em que a condição fica falsa, mesmo no meio do corpo.' },
        ],
        explanation:
          'A condição só é testada entre uma volta e outra, nunca no meio do corpo. Se `i` ficar 99 na primeira linha do bloco, o resto do bloco ainda roda até o fim.',
      },
    ],
    challenge: {
      brief:
        'Leia um número inteiro `n` e imprima `Linha 1`, `Linha 2`, ..., até `Linha n`, uma por linha. Depois imprima `Fim`.',
      requirements: [
        'Cada linha do laço tem o formato `Linha X`, com X começando em 1',
        'Depois do laço, imprima `Fim` sempre',
        'Se `n` for 0, o laço não imprime nada e só sai `Fim`',
        'Use `while`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        // Declare o contador, escreva o while, e nao esqueca do progresso

        Console.WriteLine("Fim");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int i = 1;
        while (i <= n)
        {
            Console.WriteLine($"Linha {i}");
            i++;
        }

        Console.WriteLine("Fim");
    }
}
`,
      hints: [
        'Comece o contador em 1 e repita enquanto ele for menor ou igual a `n`.',
        'A última linha dentro das chaves precisa ser `i++;`. Sem ela o programa trava.',
      ],
      tests: [
        {
          name: 'Três linhas',
          stdin: '3\n',
          expectedStdout: 'Linha 1\nLinha 2\nLinha 3\nFim',
        },
        {
          name: 'Uma linha só',
          stdin: '1\n',
          expectedStdout: 'Linha 1\nFim',
        },
        {
          name: 'Zero: o corpo nunca roda',
          stdin: '0\n',
          expectedStdout: 'Fim',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c01l02',
    title: 'Contadores',
    objective: 'Usar uma variável para contar quantas vezes algo acontece, separando o contador do laço da contagem de eventos.',
    concept: [
      {
        kind: 'text',
        body:
          'Existem dois contadores diferentes, e confundi-los é fonte de bug. O **contador do laço** controla quantas voltas dar. O **contador de eventos** registra quantas vezes uma condição foi satisfeita dentro dessas voltas.',
      },
      {
        kind: 'code',
        code: `int i = 1;          // contador do laco: anda sempre
int pares = 0;      // contador de eventos: anda so as vezes

while (i <= 10)
{
    if (i % 2 == 0)
    {
        pares++;    // so incrementa quando a condicao vale
    }
    i++;            // este incrementa em toda volta
}

Console.WriteLine(pares);`,
      },
      {
        kind: 'output',
        code: `5`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Colocar o `i++` **dentro** do `if` é o erro mais comum desta lição. O laço deixa de avançar nas voltas em que a condição é falsa e trava para sempre.',
      },
      {
        kind: 'compare',
        good: `while (i <= 10)
{
    if (i % 2 == 0)
    {
        pares++;
    }
    i++;
}`,
        bad: `while (i <= 10)
{
    if (i % 2 == 0)
    {
        pares++;
        i++;
    }
}`,
        goodLabel: 'O laço sempre avança',
        badLabel: 'Trava no primeiro ímpar',
      },
      {
        kind: 'text',
        body:
          'Um contador de eventos sempre começa em `0`, porque antes de olhar qualquer valor você contou zero coisas. Começá-lo em `1` desloca todo o resultado.',
      },
    ],
    quiz: [
      {
        id: 's02c01l02q1',
        type: 'single',
        prompt: 'Qual valor `total` tem no fim?',
        code: `int i = 1;
int total = 0;
while (i <= 6)
{
    if (i % 3 == 0)
    {
        total++;
    }
    i++;
}`,
        options: [
          { id: 'a', code: '2', correct: true },
          { id: 'b', code: '3' },
          { id: 'c', code: '6' },
          { id: 'd', code: '0' },
        ],
        explanation:
          'Entre 1 e 6 os múltiplos de 3 são 3 e 6. O contador do laço deu 6 voltas, mas o contador de eventos só subiu duas vezes.',
      },
      {
        id: 's02c01l02q2',
        type: 'single',
        prompt: 'Por que um contador de eventos deve começar em zero?',
        options: [
          { id: 'a', text: 'Porque antes de examinar qualquer valor, nenhuma ocorrência foi encontrada.', correct: true },
          { id: 'b', text: 'Porque o C# não permite inicializar variáveis com outros números.' },
          { id: 'c', text: 'Porque índices em C# começam em zero.' },
          { id: 'd', text: 'Porque zero é o valor mais rápido de incrementar.' },
        ],
        explanation:
          'O valor inicial de um acumulador é sempre a resposta correta para "nenhum dado". Nenhum dado significa nenhuma ocorrência, então zero.',
      },
      {
        id: 's02c01l02q3',
        type: 'single',
        prompt: 'O laço abaixo trava. Por quê?',
        code: `int i = 1;
int achados = 0;
while (i <= 20)
{
    if (i % 7 == 0)
    {
        achados++;
        i++;
    }
}`,
        options: [
          { id: 'a', text: 'Quando `i` é 1, a condição do `if` é falsa e nada altera `i`.', correct: true },
          { id: 'b', text: 'Porque `achados` nunca chega a 20.' },
          { id: 'c', text: 'Porque `%` não funciona com o número 7.' },
          { id: 'd', text: 'Porque falta declarar `i` como `var`.' },
        ],
        explanation:
          'O progresso do laço ficou preso dentro do `if`. Já na primeira volta `1 % 7` é 1, o `if` não roda, `i` continua 1, e o teste se repete idêntico para sempre.',
      },
    ],
    challenge: {
      brief:
        'Leia um número inteiro `n` e imprima todos os múltiplos de 3 entre 1 e `n`, um por linha. No fim, imprima `Total: k`, onde `k` é quantos foram encontrados.',
      requirements: [
        'Imprima cada múltiplo de 3 sozinho na linha, em ordem crescente',
        'A última linha é sempre `Total: k`',
        'Para `n` menor que 3 a saída é apenas `Total: 0`',
        'Use um contador de laço e um contador de eventos separados',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int i = 1;
        int total = 0;

        // Percorra de 1 ate n e conte os multiplos de 3

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

        int i = 1;
        int total = 0;

        while (i <= n)
        {
            if (i % 3 == 0)
            {
                Console.WriteLine(i);
                total++;
            }
            i++;
        }

        Console.WriteLine($"Total: {total}");
    }
}
`,
      hints: [
        'Um número é múltiplo de 3 quando `i % 3 == 0`.',
        'O `i++` fica fora do `if`, como última instrução do corpo do laço.',
      ],
      tests: [
        {
          name: 'Até 10',
          stdin: '10\n',
          expectedStdout: '3\n6\n9\nTotal: 3',
        },
        {
          name: 'O limite exato conta',
          stdin: '9\n',
          expectedStdout: '3\n6\n9\nTotal: 3',
        },
        {
          name: 'Nenhum múltiplo',
          stdin: '2\n',
          expectedStdout: 'Total: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c01l03',
    title: 'Acumuladores',
    objective: 'Somar uma sequência de valores em uma única variável, escolhendo o valor inicial correto para cada tipo de acumulação.',
    concept: [
      {
        kind: 'text',
        body:
          'Um **acumulador** guarda o resultado parcial de uma operação repetida. É o mesmo padrão do contador, mas em vez de somar sempre 1, ele soma o valor que chegou.',
      },
      {
        kind: 'code',
        code: `int lidos = 0;
int soma = 0;              // elemento neutro da soma

while (lidos < 3)
{
    int valor = int.Parse(Console.ReadLine());
    soma += valor;         // acumula o que chegou
    lidos++;
}

Console.WriteLine(soma);`,
        caption: 'Ler exatamente n valores é o caso mais comum de acumulação.',
      },
      {
        kind: 'text',
        body:
          'O valor inicial não é escolhido por gosto: ele é o **elemento neutro** da operação. Somar começa em 0 porque `0 + x` é `x`. Multiplicar começa em 1, porque começar em 0 zeraria tudo. Concatenar começa na string vazia.',
      },
      {
        kind: 'table',
        headers: ['Acumulação', 'Início', 'Passo', 'Por quê'],
        rows: [
          ['soma', '`0`', '`soma += v`', '`0 + v` é `v`'],
          ['produto', '`1`', '`produto *= v`', '`1 * v` é `v`'],
          ['contagem', '`0`', '`conta++`', 'nada visto ainda'],
          ['texto', '`""`', '`texto += v`', 'vazio não altera'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Declarar o acumulador **dentro** do laço zera o valor a cada volta e a resposta final vira sempre o último item. Ele precisa nascer antes das chaves e sobreviver a elas.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Como o acumulador é atualizado a cada volta, imprimi-lo dentro do laço mostra o resultado parcial em construção. É a forma mais barata de depurar um laço que dá o número errado.',
      },
    ],
    quiz: [
      {
        id: 's02c01l03q1',
        type: 'single',
        prompt: 'O que este trecho imprime ao ler 4, 6 e 10?',
        code: `int lidos = 0;
while (lidos < 3)
{
    int soma = 0;
    soma += int.Parse(Console.ReadLine());
    lidos++;
    Console.WriteLine(soma);
}`,
        options: [
          { id: 'a', text: '`4`, `6` e `10`: a soma é zerada a cada volta.', correct: true },
          { id: 'b', text: '`4`, `10` e `20`.' },
          { id: 'c', text: '`20` uma vez só.' },
          { id: 'd', text: 'Nada: o código não compila.' },
        ],
        explanation:
          '`int soma = 0;` está dentro das chaves, então uma variável nova nasce zerada a cada volta. O acumulador precisa ser declarado antes do laço.',
      },
      {
        id: 's02c01l03q2',
        type: 'single',
        prompt: 'Você vai acumular o **produto** de vários números. Com que valor a variável deve começar?',
        options: [
          { id: 'a', code: '1', correct: true },
          { id: 'b', code: '0' },
          { id: 'c', text: 'Com o primeiro número lido, obrigatoriamente.' },
          { id: 'd', code: '-1' },
        ],
        explanation:
          'Multiplicar por 1 não muda nada, então 1 é o ponto de partida seguro. Começar em 0 faria todo produto resultar em 0.',
      },
      {
        id: 's02c01l03q3',
        type: 'single',
        prompt: 'Qual é a diferença entre `lidos++` e `soma += valor` no laço desta lição?',
        options: [
          { id: 'a', text: '`lidos` conta quantas voltas houve; `soma` acumula o conteúdo de cada volta.', correct: true },
          { id: 'b', text: 'São equivalentes: `++` é só um atalho de `+= valor`.' },
          { id: 'c', text: '`lidos++` só funciona com `int`, `+=` funciona com qualquer tipo.' },
          { id: 'd', text: '`soma += valor` também controla quando o laço termina.' },
        ],
        explanation:
          '`lidos++` é o progresso do laço e controla a parada. `soma += valor` é o resultado que estamos construindo. Um responde "quantas vezes", o outro "quanto no total".',
      },
    ],
    challenge: {
      brief:
        'Leia um número `n` e depois `n` valores inteiros. A cada valor lido, imprima `Parcial: X` com a soma acumulada até ali. No fim, imprima `Total: X`.',
      requirements: [
        'A primeira linha da entrada é a quantidade de valores',
        'Para cada valor lido, imprima `Parcial: X` com a soma acumulada',
        'A última linha é `Total: X`',
        'Valores negativos são válidos e diminuem a soma',
        'Se `n` for 0, a saída é apenas `Total: 0`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int lidos = 0;
        int soma = 0;

        // Leia n valores, acumule e mostre a parcial de cada volta

        Console.WriteLine($"Total: {soma}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int lidos = 0;
        int soma = 0;

        while (lidos < n)
        {
            int valor = int.Parse(Console.ReadLine());
            soma += valor;
            Console.WriteLine($"Parcial: {soma}");
            lidos++;
        }

        Console.WriteLine($"Total: {soma}");
    }
}
`,
      hints: [
        'O laço repete enquanto `lidos < n`. A leitura de cada valor acontece dentro do corpo.',
        '`soma` e `lidos` são declarados antes do `while` para sobreviverem entre as voltas.',
      ],
      tests: [
        {
          name: 'Três valores',
          stdin: '3\n10\n20\n5\n',
          expectedStdout: 'Parcial: 10\nParcial: 30\nParcial: 35\nTotal: 35',
        },
        {
          name: 'Valor negativo diminui a soma',
          stdin: '2\n8\n-3\n',
          expectedStdout: 'Parcial: 8\nParcial: 5\nTotal: 5',
        },
        {
          name: 'Nenhum valor',
          stdin: '0\n',
          expectedStdout: 'Total: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c01l04',
    title: 'Escolhendo a condição de parada',
    objective: 'Decidir entre `<` e `<=` com segurança e prever exatamente quantas voltas um laço vai dar.',
    concept: [
      {
        kind: 'text',
        body:
          'A condição de parada é onde mora o erro de **um a mais ou um a menos** — o famoso *off-by-one*. Trocar `<` por `<=` muda o resultado em exatamente uma volta, e uma volta a mais ou a menos costuma ser a diferença entre certo e errado.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Começa em 0, para antes',
          code: `int i = 0;
while (i < 5)
{
    Console.Write(i);
    i++;
}
// 01234  ->  5 voltas`,
        },
        right: {
          label: 'Começa em 1, inclui o limite',
          code: `int i = 1;
while (i <= 5)
{
    Console.Write(i);
    i++;
}
// 12345  ->  5 voltas`,
        },
        note: 'Os dois dão 5 voltas, mas com valores diferentes. Escolha o que combina com o enunciado.',
      },
      {
        kind: 'text',
        body:
          'Existe uma conta que resolve a dúvida sem tentativa e erro. Para um contador que anda de 1 em 1:',
      },
      {
        kind: 'table',
        headers: ['Forma', 'Voltas', 'Primeiro', 'Último'],
        rows: [
          ['`i = a; i < b`', '`b - a`', '`a`', '`b - 1`'],
          ['`i = a; i <= b`', '`b - a + 1`', '`a`', '`b`'],
        ],
      },
      {
        kind: 'code',
        code: `// "de 3 ate 7, incluindo os dois"  ->  7 - 3 + 1 = 5 voltas
int atual = 3;
while (atual <= 7)
{
    Console.Write(atual + " ");
    atual++;
}`,
        caption: 'Traduza o enunciado para a fórmula antes de escrever o laço.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Quando a condição já começa falsa (`inicio` maior que `fim`), o laço dá zero voltas e isso quase sempre é o comportamento certo. Cuidado é só com o contador de voltas: ele precisa terminar em 0, não em um número negativo calculado por fórmula.',
      },
    ],
    quiz: [
      {
        id: 's02c01l04q1',
        type: 'single',
        prompt: 'Quantas voltas dá o laço `int i = 2; while (i < 9) { i++; }`?',
        options: [
          { id: 'a', code: '7', correct: true },
          { id: 'b', code: '8' },
          { id: 'c', code: '9' },
          { id: 'd', code: '6' },
        ],
        explanation:
          'Com `<`, o número de voltas é `b - a`, ou seja `9 - 2 = 7`. Os valores visitados vão de 2 a 8.',
      },
      {
        id: 's02c01l04q2',
        type: 'single',
        prompt: 'O enunciado diz "imprima os números de 1 até n, incluindo n". Qual condição está correta?',
        options: [
          { id: 'a', code: 'while (i <= n)', correct: true },
          { id: 'b', code: 'while (i < n)' },
          { id: 'c', code: 'while (i < n + 2)' },
          { id: 'd', code: 'while (i != n)' },
        ],
        explanation:
          '"Incluindo n" pede `<=`. A alternativa `i != n` é perigosa: se `i` pular o valor exato de `n`, o laço nunca para.',
      },
      {
        id: 's02c01l04q3',
        type: 'single',
        prompt: 'Por que `while (i != n)` é uma condição de parada arriscada?',
        options: [
          { id: 'a', text: 'Se `i` ultrapassar `n` sem passar exatamente por ele, o laço nunca termina.', correct: true },
          { id: 'b', text: 'Porque `!=` não pode ser usado com `int`.' },
          { id: 'c', text: 'Porque `!=` é mais lento que `<`.' },
          { id: 'd', text: 'Porque `!=` sempre inclui o limite superior.' },
        ],
        explanation:
          'Uma comparação de ordem (`<`, `<=`) fica falsa a partir de um ponto e continua falsa. Uma comparação de igualdade só é falsa em um valor exato, e um passo de 2 ou um `n` menor que `i` faz o laço passar direto.',
      },
    ],
    challenge: {
      brief:
        'Leia dois inteiros, `inicio` e `fim`, e imprima todos os números de `inicio` até `fim`, **incluindo os dois**, um por linha. Depois imprima `Quantidade: k`.',
      requirements: [
        'Cada número sai sozinho em sua linha, em ordem crescente',
        'A última linha é sempre `Quantidade: k`',
        'Se `inicio` for maior que `fim`, nada é impresso e `k` é `0`',
        'Se `inicio` e `fim` forem iguais, o número sai uma vez e `k` é `1`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int inicio = int.Parse(Console.ReadLine());
        int fim = int.Parse(Console.ReadLine());

        int atual = inicio;
        int quantidade = 0;

        // Percorra de inicio ate fim, incluindo os dois

        Console.WriteLine($"Quantidade: {quantidade}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int inicio = int.Parse(Console.ReadLine());
        int fim = int.Parse(Console.ReadLine());

        int atual = inicio;
        int quantidade = 0;

        while (atual <= fim)
        {
            Console.WriteLine(atual);
            quantidade++;
            atual++;
        }

        Console.WriteLine($"Quantidade: {quantidade}");
    }
}
`,
      hints: [
        '"Incluindo os dois" é a pista de que a condição usa `<=`.',
        'Não calcule a quantidade por fórmula: deixe o próprio laço contar. Assim o caso `inicio > fim` dá 0 sozinho.',
      ],
      tests: [
        {
          name: 'De 3 a 7',
          stdin: '3\n7\n',
          expectedStdout: '3\n4\n5\n6\n7\nQuantidade: 5',
        },
        {
          name: 'Início igual ao fim',
          stdin: '5\n5\n',
          expectedStdout: '5\nQuantidade: 1',
        },
        {
          name: 'Faixa invertida não imprime nada',
          stdin: '9\n4\n',
          expectedStdout: 'Quantidade: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c01l05',
    title: 'Laço infinito: causa e cura',
    objective: 'Reconhecer as três causas de um laço que nunca termina e garantir progresso em direção à parada.',
    concept: [
      {
        kind: 'text',
        body:
          'Um laço infinito não é um erro de compilação: o código está sintaticamente perfeito. Ele só nunca chega ao fim. No desafio, isso aparece como **tempo limite excedido**, e não como resposta errada.',
      },
      {
        kind: 'table',
        headers: ['Causa', 'Como aparece', 'Cura'],
        rows: [
          ['Sem progresso', 'nada altera a variável da condição', 'incluir o passo no corpo'],
          ['Progresso no lugar errado', 'o passo está dentro de um `if`', 'mover o passo para fora'],
          ['Progresso na direção errada', '`i--` em `while (i < n)`', 'inverter o operador'],
        ],
      },
      {
        kind: 'text',
        body:
          'Existe uma quarta causa, mais sutil: o passo **existe** e vai na direção certa, mas trava antes de cruzar a condição. Divisão inteira é o caso clássico.',
      },
      {
        kind: 'compare',
        good: `int n = 20;
while (n >= 1)
{
    Console.WriteLine(n);
    n = n / 2;
}
// 20 10 5 2 1  e termina`,
        bad: `int n = 20;
while (n >= 0)
{
    Console.WriteLine(n);
    n = n / 2;
}
// 20 10 5 2 1 0 0 0 0 ...`,
        goodLabel: 'Para em 1',
        badLabel: 'Trava em 0 para sempre',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Em `0 / 2` o resultado é `0`. O laço continua "progredindo", mas o valor não muda mais e a condição `n >= 0` fica verdadeira eternamente. Sempre pergunte: **existe um valor onde meu passo para de mudar as coisas?**',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Para verificar se um laço termina, olhe só duas coisas: a condição fica falsa para algum valor alcançável? E cada volta chega mais perto desse valor? Se as duas respostas forem sim, o laço termina.',
      },
    ],
    quiz: [
      {
        id: 's02c01l05q1',
        type: 'single',
        prompt: 'Por que este laço nunca termina?',
        code: `int n = 10;
while (n > 0)
{
    Console.WriteLine(n);
    n++;
}`,
        options: [
          { id: 'a', text: 'O passo afasta `n` da condição de parada em vez de aproximá-lo.', correct: true },
          { id: 'b', text: 'Falta inicializar `n`.' },
          { id: 'c', text: 'A condição deveria ser `n >= 0`.' },
          { id: 'd', text: 'Porque `Console.WriteLine` é lento demais.' },
        ],
        explanation:
          'A condição fica falsa quando `n` chega a 0 ou menos, mas `n++` só aumenta o valor. O progresso precisa apontar para a condição, e aqui aponta para o lado oposto.',
      },
      {
        id: 's02c01l05q2',
        type: 'single',
        prompt: 'Quantas vezes este laço imprime algo?',
        code: `int n = 5;
while (n >= 0)
{
    Console.WriteLine(n);
    n = n / 3;
}`,
        options: [
          { id: 'a', text: 'Infinitas: `n` chega a 0 e `0 / 3` continua sendo 0.', correct: true },
          { id: 'b', text: 'Três vezes: 5, 1 e 0.' },
          { id: 'c', text: 'Duas vezes: 5 e 1.' },
          { id: 'd', text: 'Uma vez: só 5.' },
        ],
        explanation:
          'A sequência é 5, 1, 0, 0, 0... Com a condição em `>= 0`, o valor 0 nunca torna o teste falso e o laço fica preso. Trocar para `>= 1` resolve.',
      },
      {
        id: 's02c01l05q3',
        type: 'multiple',
        prompt: 'Quais mudanças fazem `int i = 0; while (i < 5) { Console.WriteLine(i); }` terminar?',
        options: [
          { id: 'a', text: 'Adicionar `i++;` como última linha do corpo.', correct: true },
          { id: 'b', text: 'Adicionar `i += 2;` como última linha do corpo.', correct: true },
          { id: 'c', text: 'Trocar a condição por `i < 0`.', correct: true },
          { id: 'd', text: 'Trocar `Console.WriteLine(i)` por `Console.Write(i)`.' },
        ],
        explanation:
          'Qualquer passo positivo termina o laço, com mais ou menos voltas. Trocar a condição por `i < 0` também termina, porque ela já começa falsa — o laço dá zero voltas. Mudar a forma de imprimir não afeta a parada.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1. Imprima `n`, depois sua metade inteira, depois a metade dessa, e assim por diante enquanto o valor for pelo menos 1. Termine imprimindo `Fim`.',
      requirements: [
        'Cada valor sai sozinho na linha, começando pelo próprio `n`',
        'A divisão é inteira: `n / 2` descarta a parte fracionária',
        'O laço para quando o valor chega a 0, então 1 é o último número impresso',
        'A última linha é sempre `Fim`',
        'A condição precisa ser `>= 1`; com `>= 0` o programa trava',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        // Imprima n e va dividindo por 2 ate o valor sumir

        Console.WriteLine("Fim");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        while (n >= 1)
        {
            Console.WriteLine(n);
            n = n / 2;
        }

        Console.WriteLine("Fim");
    }
}
`,
      hints: [
        'Você pode reatribuir o próprio `n` dentro do laço: `n = n / 2;`.',
        'Se o programa estourar o tempo, quase certamente a condição é `>= 0` em vez de `>= 1`.',
      ],
      tests: [
        {
          name: 'Potência de dois',
          stdin: '20\n',
          expectedStdout: '20\n10\n5\n2\n1\nFim',
        },
        {
          name: 'Número ímpar',
          stdin: '7\n',
          expectedStdout: '7\n3\n1\nFim',
        },
        {
          name: 'Uma volta só',
          stdin: '1\n',
          expectedStdout: '1\nFim',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c01l06',
    title: 'do-while',
    objective: 'Usar `do-while` quando o corpo precisa executar pelo menos uma vez antes de qualquer teste.',
    concept: [
      {
        kind: 'text',
        body:
          'O `do-while` é o `while` de cabeça para baixo: o corpo roda **primeiro**, e só então a condição é testada. Consequência prática: ele sempre executa pelo menos uma vez, mesmo com a condição falsa.',
      },
      {
        kind: 'code',
        code: `int i = 10;

do
{
    Console.WriteLine(i);
    i++;
}
while (i < 5);       // ponto e virgula obrigatorio aqui`,
        caption: 'Imprime 10 e para: a condição só foi olhada depois da primeira volta.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'while: testa, depois faz',
          code: `int i = 10;
while (i < 5)
{
    Console.WriteLine(i);
    i++;
}
// nao imprime nada`,
        },
        right: {
          label: 'do-while: faz, depois testa',
          code: `int i = 10;
do
{
    Console.WriteLine(i);
    i++;
}
while (i < 5);
// imprime 10`,
        },
        note: 'Com a condição verdadeira desde o início, os dois se comportam igual. A diferença só aparece quando ela começa falsa.',
      },
      {
        kind: 'text',
        body:
          'Use `do-while` quando a pergunta só faz sentido **depois** de fazer algo: pedir um dado antes de saber se ele é válido, aplicar uma transformação antes de saber se o resultado já basta, mostrar um menu antes de saber se o usuário quer sair.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O ponto e vírgula depois de `while (...)` é obrigatório no `do-while`, e ilegal no `while` comum. Esquecê-lo dá erro de compilação; colocá-lo por engano no `while` cria um laço de corpo vazio que trava.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um `do-while` sempre pode virar um `while` se você duplicar o corpo antes do laço. O contrário nem sempre é verdade sem uma variável extra. Por isso ele existe: economiza duplicação no caso "pelo menos uma vez".',
      },
    ],
    quiz: [
      {
        id: 's02c01l06q1',
        type: 'single',
        prompt: 'O que este trecho imprime?',
        code: `int x = 100;
do
{
    Console.WriteLine(x);
    x = x * 2;
}
while (x < 10);`,
        options: [
          { id: 'a', code: '100', correct: true },
          { id: 'b', text: 'Nada.' },
          { id: 'c', code: '100\n200' },
          { id: 'd', text: 'Trava em laço infinito.' },
        ],
        explanation:
          'O corpo roda uma vez incondicionalmente, imprimindo 100 e dobrando `x` para 200. Aí a condição `200 < 10` é falsa e o laço termina.',
      },
      {
        id: 's02c01l06q2',
        type: 'single',
        prompt: 'Em qual situação `do-while` é a escolha mais natural?',
        options: [
          { id: 'a', text: 'Ler um valor do usuário e repetir a leitura enquanto ele for inválido.', correct: true },
          { id: 'b', text: 'Percorrer os números de 1 a 100.' },
          { id: 'c', text: 'Somar valores enquanto ainda houver dados na entrada.' },
          { id: 'd', text: 'Repetir uma ação exatamente 3 vezes.' },
        ],
        explanation:
          'Você precisa ler pelo menos uma vez para ter o que validar. Nos outros casos a condição pode ser avaliada antes, e o `while` comum é mais direto.',
      },
      {
        id: 's02c01l06q3',
        type: 'single',
        prompt: 'Qual é a diferença sintática entre `while` e `do-while` que mais gera erro de compilação?',
        options: [
          { id: 'a', text: 'O `do-while` exige ponto e vírgula depois da condição final.', correct: true },
          { id: 'b', text: 'O `do-while` não aceita chaves no corpo.' },
          { id: 'c', text: 'O `do-while` exige que a variável seja `var`.' },
          { id: 'd', text: 'O `do-while` não aceita condições compostas com `&&`.' },
        ],
        explanation:
          'A linha `while (condicao);` fecha a instrução `do`, então o ponto e vírgula faz parte dela. No `while` comum esse mesmo ponto e vírgula criaria um corpo vazio.',
      },
    ],
    challenge: {
      brief:
        'Leia um `valor` (pelo menos 1) e um `limite`. Dobre o valor repetidamente, imprimindo `Valor: X` a cada dobra, e pare assim que o valor passar do limite. No fim imprima `Passos: k`. **Pelo menos uma dobra sempre acontece**, mesmo que o valor já comece acima do limite.',
      requirements: [
        'Cada dobra imprime `Valor: X` com o valor já dobrado',
        'A dobra se repete enquanto o valor for menor ou igual ao limite',
        'O primeiro valor dobrado sempre é impresso, mesmo se já ultrapassar o limite',
        'A última linha é `Passos: k`, com `k` contando as dobras',
        'Use `do-while`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int valor = int.Parse(Console.ReadLine());
        int limite = int.Parse(Console.ReadLine());

        int passos = 0;

        // Dobre pelo menos uma vez e continue enquanto couber no limite

        Console.WriteLine($"Passos: {passos}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int valor = int.Parse(Console.ReadLine());
        int limite = int.Parse(Console.ReadLine());

        int passos = 0;

        do
        {
            valor *= 2;
            passos++;
            Console.WriteLine($"Valor: {valor}");
        }
        while (valor <= limite);

        Console.WriteLine($"Passos: {passos}");
    }
}
`,
      hints: [
        'A ordem dentro do corpo é: dobrar, contar, imprimir. O valor impresso é sempre o já dobrado.',
        'A condição `valor <= limite` fica no fim, depois do fecha-chaves, e termina com ponto e vírgula.',
      ],
      tests: [
        {
          name: 'Três dobras até passar de 20',
          stdin: '3\n20\n',
          expectedStdout: 'Valor: 6\nValor: 12\nValor: 24\nPassos: 3',
        },
        {
          name: 'Uma dobra basta',
          stdin: '1\n1\n',
          expectedStdout: 'Valor: 2\nPassos: 1',
        },
        {
          name: 'Já começa acima do limite, mas dobra mesmo assim',
          stdin: '100\n10\n',
          expectedStdout: 'Valor: 200\nPassos: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c01l07',
    title: 'Lendo até um valor sentinela',
    objective: 'Processar uma quantidade desconhecida de dados, encerrando a leitura em um valor combinado de parada.',
    concept: [
      {
        kind: 'text',
        body:
          'Nem sempre a quantidade de dados é conhecida de antemão. A alternativa a "leia n valores" é combinar um valor especial que significa "acabou": a **sentinela**.',
      },
      {
        kind: 'code',
        code: `int valor = int.Parse(Console.ReadLine());   // 1. le antes do laco
int soma = 0;

while (valor != 0)                          // 2. a sentinela e o 0
{
    soma += valor;
    valor = int.Parse(Console.ReadLine());  // 3. le de novo no fim
}

Console.WriteLine(soma);`,
        caption: 'Padrão leia-antes, leia-de-novo: a leitura aparece duas vezes, e isso é intencional.',
      },
      {
        kind: 'text',
        body:
          'A duplicação incomoda, mas é necessária: a condição precisa de um valor **já lido** para testar. A primeira leitura alimenta o primeiro teste; a leitura no fim do corpo alimenta todos os seguintes.',
      },
      {
        kind: 'compare',
        good: `int v = int.Parse(Console.ReadLine());
while (v != 0)
{
    soma += v;
    v = int.Parse(Console.ReadLine());
}`,
        bad: `int v = int.Parse(Console.ReadLine());
while (v != 0)
{
    v = int.Parse(Console.ReadLine());
    soma += v;
}`,
        goodLabel: 'Processa o valor testado',
        badLabel: 'Perde o primeiro e soma a sentinela',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A sentinela **não faz parte dos dados**. Ela não entra na soma nem na contagem — só marca o fim. Somar o `0` por acidente até passa despercebido; somar uma sentinela `-1` estraga o resultado na cara.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Escolha uma sentinela impossível nos dados reais. Para idades, `-1` serve. Para saldos, que podem ser negativos, `0` também é um valor legítimo — nesse caso use uma palavra como `fim` e valide o texto antes de converter.',
      },
    ],
    quiz: [
      {
        id: 's02c01l07q1',
        type: 'single',
        prompt: 'Com a entrada `4`, `6`, `0`, o que este trecho imprime?',
        code: `int v = int.Parse(Console.ReadLine());
int soma = 0;
while (v != 0)
{
    v = int.Parse(Console.ReadLine());
    soma += v;
}
Console.WriteLine(soma);`,
        options: [
          { id: 'a', code: '6', correct: true },
          { id: 'b', code: '10' },
          { id: 'c', code: '0' },
          { id: 'd', text: 'Estoura o tempo limite.' },
        ],
        explanation:
          'O 4 é testado mas nunca somado, porque a primeira coisa que o corpo faz é sobrescrever `v` com o 6. Depois o 6 é somado, o 0 é lido, somado (sem efeito) e encerra o laço. Resultado: 6.',
      },
      {
        id: 's02c01l07q2',
        type: 'single',
        prompt: 'Você vai ler temperaturas, que podem ser negativas. Qual é a pior escolha de sentinela?',
        options: [
          { id: 'a', code: '-1', correct: true },
          { id: 'b', text: 'A palavra `fim`, validando o texto antes de converter.' },
          { id: 'c', code: '9999' },
          { id: 'd', text: 'Uma linha vazia.' },
        ],
        explanation:
          '`-1` é uma temperatura perfeitamente possível, então o programa pararia no meio dos dados reais. A sentinela precisa ser um valor que jamais apareceria como dado válido.',
      },
      {
        id: 's02c01l07q3',
        type: 'single',
        prompt: 'Por que a leitura aparece duas vezes no padrão de sentinela?',
        options: [
          { id: 'a', text: 'A condição precisa de um valor já lido; a primeira leitura alimenta o primeiro teste e a segunda alimenta os demais.', correct: true },
          { id: 'b', text: 'Porque `Console.ReadLine` precisa ser chamado em pares.' },
          { id: 'c', text: 'Para garantir que o laço rode pelo menos duas vezes.' },
          { id: 'd', text: 'É um estilo antigo; uma leitura só resolveria igual.' },
        ],
        explanation:
          'Sem a leitura anterior ao laço, a primeira avaliação da condição olharia uma variável sem dado. O `do-while` é a alternativa que evita a duplicação, ao custo de testar a sentinela dentro do corpo.',
      },
    ],
    challenge: {
      brief:
        'Leia números inteiros, um por linha, até encontrar um `0`. Imprima quantos números foram lidos e a soma deles. O `0` marca o fim e **não** entra na contagem nem na soma.',
      requirements: [
        'Linha 1: `Lidos: k`',
        'Linha 2: `Soma: X`',
        'O `0` final não é contado nem somado',
        'Números negativos são dados válidos e entram normalmente',
        'Se o primeiro valor já for `0`, a saída é `Lidos: 0` e `Soma: 0`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int valor = int.Parse(Console.ReadLine());

        int lidos = 0;
        int soma = 0;

        // Processe enquanto o valor lido nao for a sentinela

        Console.WriteLine($"Lidos: {lidos}");
        Console.WriteLine($"Soma: {soma}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int valor = int.Parse(Console.ReadLine());

        int lidos = 0;
        int soma = 0;

        while (valor != 0)
        {
            soma += valor;
            lidos++;
            valor = int.Parse(Console.ReadLine());
        }

        Console.WriteLine($"Lidos: {lidos}");
        Console.WriteLine($"Soma: {soma}");
    }
}
`,
      hints: [
        'A leitura já vem feita no `starterCode`. Sua tarefa é usar esse valor e ler o próximo no fim do corpo.',
        'Acumule e conte **antes** de ler o próximo valor, senão o último número lido nunca é processado.',
      ],
      tests: [
        {
          name: 'Três valores antes da sentinela',
          stdin: '5\n7\n3\n0\n',
          expectedStdout: 'Lidos: 3\nSoma: 15',
        },
        {
          name: 'Negativos contam e podem zerar a soma',
          stdin: '-4\n4\n0\n',
          expectedStdout: 'Lidos: 2\nSoma: 0',
        },
        {
          name: 'Sentinela logo de cara',
          stdin: '0\n',
          expectedStdout: 'Lidos: 0\nSoma: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c01l08',
    title: 'Validação em laço',
    objective: 'Insistir na leitura até receber um dado válido, combinando `int.TryParse` com uma condição de faixa.',
    concept: [
      {
        kind: 'text',
        body:
          'Você já sabe checar se uma entrada é válida com `int.TryParse`. O que faltava era o que fazer quando não é: com um laço, a resposta deixa de ser "desiste" e passa a ser "pede de novo".',
      },
      {
        kind: 'code',
        code: `int idade = -1;                   // valor impossivel = "ainda nao tenho"

while (idade < 0)
{
    string entrada = Console.ReadLine();

    if (int.TryParse(entrada, out int lida) && lida >= 0 && lida <= 120)
    {
        idade = lida;                 // so aqui a condicao vira falsa
    }
}

Console.WriteLine($"Idade: {idade}");`,
        caption: 'O laço só termina quando a variável recebe um valor da faixa aceita.',
      },
      {
        kind: 'text',
        body:
          'A técnica é sempre a mesma: escolher um valor **impossível** para o dado, inicializar com ele, e repetir enquanto a variável ainda estiver nesse estado. Ele funciona como "não preenchido" sem precisar de nenhuma variável extra.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Validar é sempre duas checagens, nunca uma. `TryParse` responde "é um número?"; a comparação de faixa responde "é um número que faz sentido?". Aceitar `-7` como idade porque converteu bem é um erro de validação, não de conversão.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O `&&` faz curto-circuito, então `lida` só é comparada depois de `TryParse` ter devolvido `true`. Se a conversão falha, as comparações nem são avaliadas — e é por isso que essa ordem é obrigatória.',
      },
      {
        kind: 'table',
        headers: ['Entrada', '`TryParse`', 'Faixa 0..120', 'Aceita?'],
        rows: [
          ['`"30"`', 'true, `lida = 30`', 'ok', 'sim'],
          ['`"abc"`', 'false, `lida = 0`', 'nem avaliada', 'não'],
          ['`"-7"`', 'true, `lida = -7`', 'fora', 'não'],
          ['`"3.5"`', 'false, `lida = 0`', 'nem avaliada', 'não'],
        ],
      },
    ],
    quiz: [
      {
        id: 's02c01l08q1',
        type: 'single',
        prompt: 'Por que a condição usa `TryParse` **e** uma comparação de faixa?',
        options: [
          { id: 'a', text: 'Uma garante que é número, a outra garante que o número faz sentido no contexto.', correct: true },
          { id: 'b', text: 'Porque `TryParse` sozinho lança exceção com valores negativos.' },
          { id: 'c', text: 'Porque `&&` exige pelo menos duas comparações.' },
          { id: 'd', text: 'São redundantes: qualquer uma das duas bastaria.' },
        ],
        explanation:
          '`"-7"` converte perfeitamente e ainda assim é uma idade inválida. Conversão e regra de negócio são checagens diferentes.',
      },
      {
        id: 's02c01l08q2',
        type: 'single',
        prompt: 'O que acontece se a ordem das condições for invertida para `lida >= 0 && int.TryParse(entrada, out int lida)`?',
        options: [
          { id: 'a', text: 'Não compila: `lida` seria usada antes de ser declarada.', correct: true },
          { id: 'b', text: 'Compila e funciona igual.' },
          { id: 'c', text: 'Compila, mas aceita textos não numéricos.' },
          { id: 'd', text: 'Compila e sempre devolve `false`.' },
        ],
        explanation:
          'A variável de saída do `out` só existe a partir do ponto em que é declarada. Além da ordem lógica, o próprio compilador impede a inversão.',
      },
      {
        id: 's02c01l08q3',
        type: 'single',
        prompt: 'Por que inicializar `idade` com `-1` em vez de `0`?',
        options: [
          { id: 'a', text: 'Porque `0` é uma idade válida e o laço terminaria antes de ler qualquer coisa.', correct: true },
          { id: 'b', text: 'Porque `-1` ocupa menos memória.' },
          { id: 'c', text: 'Porque `int` não pode começar em `0`.' },
          { id: 'd', text: 'Porque `TryParse` devolve `-1` quando falha.' },
        ],
        explanation:
          'O valor inicial precisa ser impossível dentro da faixa aceita. Como 0 está dentro dela, usá-lo faria a condição `idade < 0` já começar falsa.',
      },
    ],
    challenge: {
      brief:
        'Leia linhas até receber uma nota válida: um número inteiro de 1 a 5. Conte quantas linhas foram recusadas pelo caminho e imprima o resultado.',
      requirements: [
        'Linha 1: `Recusadas: k`',
        'Linha 2: `Nota: v`',
        'Uma linha é recusada quando não é um inteiro, ou quando está fora da faixa de 1 a 5',
        'A primeira linha válida encerra a leitura',
        'Se a primeira linha já for válida, `k` é `0`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int nota = 0;          // 0 e impossivel na faixa 1..5
        int recusadas = 0;

        // Leia ate receber uma nota valida, contando as recusas

        Console.WriteLine($"Recusadas: {recusadas}");
        Console.WriteLine($"Nota: {nota}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int nota = 0;
        int recusadas = 0;

        while (nota == 0)
        {
            string entrada = Console.ReadLine();

            if (int.TryParse(entrada, out int lida) && lida >= 1 && lida <= 5)
            {
                nota = lida;
            }
            else
            {
                recusadas++;
            }
        }

        Console.WriteLine($"Recusadas: {recusadas}");
        Console.WriteLine($"Nota: {nota}");
    }
}
`,
      hints: [
        'Como `0` está fora da faixa aceita, `while (nota == 0)` já serve de condição: o laço para sozinho quando a nota é preenchida.',
        'O `else` do `if` é onde a contagem de recusas acontece.',
      ],
      tests: [
        {
          name: 'Texto e valor fora da faixa antes do acerto',
          stdin: 'abc\n9\n4\n',
          expectedStdout: 'Recusadas: 2\nNota: 4',
        },
        {
          name: 'Acerta de primeira',
          stdin: '3\n',
          expectedStdout: 'Recusadas: 0\nNota: 3',
        },
        {
          name: 'Zero e negativo também são recusados',
          stdin: '0\n6\n-2\n1\n',
          expectedStdout: 'Recusadas: 3\nNota: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c01l09',
    title: 'Prática: somando dígitos',
    objective: 'Decompor um número em seus dígitos com `% 10` e `/ 10`, aplicando o `do-while` para tratar o zero corretamente.',
    concept: [
      {
        kind: 'text',
        body:
          'Extrair os dígitos de um número é um dos algoritmos mais reaproveitados que existem. Ele aparece em dígito verificador, palíndromo numérico, conversão de base e soma de dígitos — tudo isso ainda vai voltar nesta seção.',
      },
      {
        kind: 'text',
        body:
          'A ideia usa duas operações que você já conhece do capítulo de operadores: `% 10` devolve o último dígito, e `/ 10` remove esse dígito.',
      },
      {
        kind: 'table',
        headers: ['`n`', '`n % 10`', '`n / 10`'],
        rows: [
          ['`4820`', '`0`', '`482`'],
          ['`482`', '`2`', '`48`'],
          ['`48`', '`8`', '`4`'],
          ['`4`', '`4`', '`0`'],
        ],
      },
      {
        kind: 'code',
        code: `int n = 4820;
int soma = 0;

do
{
    soma += n % 10;   // pega o ultimo digito
    n = n / 10;       // e descarta ele
}
while (n > 0);

Console.WriteLine(soma);   // 0 + 2 + 8 + 4 = 14`,
        caption: 'Os dígitos saem de trás para frente, o que não importa para uma soma.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Com `while (n > 0)` no lugar de `do-while`, a entrada `0` produz zero voltas: o programa diria que 0 tem **nenhum** dígito. O `do-while` garante que todo número, inclusive o zero, tenha pelo menos um dígito processado.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O laço termina porque `n / 10` reduz o número a cada volta e a divisão inteira acaba chegando a 0. É a mesma garantia de progresso da lição sobre laço infinito, aplicada a um problema útil.',
      },
    ],
    quiz: [
      {
        id: 's02c01l09q1',
        type: 'single',
        prompt: 'Qual é o valor de `907 % 10` e de `907 / 10`?',
        options: [
          { id: 'a', text: '`7` e `90`', correct: true },
          { id: 'b', text: '`9` e `07`' },
          { id: 'c', text: '`7` e `90.7`' },
          { id: 'd', text: '`0` e `90`' },
        ],
        explanation:
          '`%` devolve o resto da divisão por 10, que é sempre o último dígito. `/` entre dois `int` é divisão inteira, então `90.7` vira `90`.',
      },
      {
        id: 's02c01l09q2',
        type: 'single',
        prompt: 'Com `while (n > 0)` em vez de `do-while`, qual entrada dá resposta errada?',
        options: [
          { id: 'a', code: '0', correct: true },
          { id: 'b', code: '10' },
          { id: 'c', code: '999' },
          { id: 'd', code: '1' },
        ],
        explanation:
          'Para `n = 0` a condição já começa falsa e o corpo nunca roda, resultando em 0 dígitos. Todo número maior que zero entra no laço normalmente.',
      },
      {
        id: 's02c01l09q3',
        type: 'single',
        prompt: 'Em que ordem os dígitos de `4820` são visitados por esse laço?',
        options: [
          { id: 'a', text: 'Do último para o primeiro: 0, 2, 8, 4.', correct: true },
          { id: 'b', text: 'Do primeiro para o último: 4, 8, 2, 0.' },
          { id: 'c', text: 'Em ordem crescente: 0, 2, 4, 8.' },
          { id: 'd', text: 'A ordem é imprevisível.' },
        ],
        explanation:
          '`% 10` sempre pega a unidade, ou seja, o dígito mais à direita. Para uma soma a ordem não importa, mas para inverter o número ou testar palíndromo ela é exatamente o que se aproveita.',
      },
    ],
    challenge: {
      brief:
        'Leia um número inteiro maior ou igual a zero e informe quantos dígitos ele tem e quanto vale a soma desses dígitos.',
      requirements: [
        'Linha 1: `Digitos: k`',
        'Linha 2: `Soma: X`',
        'A entrada `0` tem 1 dígito e soma 0',
        'Use `% 10` e `/ 10`; não converta o número para `string`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int digitos = 0;
        int soma = 0;

        // Extraia um digito por volta ate esgotar o numero

        Console.WriteLine($"Digitos: {digitos}");
        Console.WriteLine($"Soma: {soma}");
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
        int soma = 0;

        do
        {
            soma += n % 10;
            digitos++;
            n = n / 10;
        }
        while (n > 0);

        Console.WriteLine($"Digitos: {digitos}");
        Console.WriteLine($"Soma: {soma}");
    }
}
`,
      hints: [
        'A cada volta faça três coisas: somar `n % 10`, contar mais um dígito, e reduzir `n` com `n / 10`.',
        'Use `do-while`, senão a entrada `0` sai com zero dígitos.',
      ],
      tests: [
        {
          name: 'Quatro dígitos com um zero no meio',
          stdin: '4820\n',
          expectedStdout: 'Digitos: 4\nSoma: 14',
        },
        {
          name: 'Um dígito só',
          stdin: '7\n',
          expectedStdout: 'Digitos: 1\nSoma: 7',
        },
        {
          name: 'Todos os dígitos iguais',
          stdin: '999\n',
          expectedStdout: 'Digitos: 3\nSoma: 27',
        },
        {
          name: 'O zero tem um dígito',
          stdin: '0\n',
          expectedStdout: 'Digitos: 1\nSoma: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c01l10',
    title: 'Checkpoint: laços com while',
    objective: 'Combinar sentinela, validação, contagem e acumulação em um único programa de relatório.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint junta as cinco ferramentas do capítulo. Nenhuma delas é nova; o que é novo é fazê-las conviver no mesmo laço sem se atrapalharem.',
      },
      {
        kind: 'table',
        headers: ['Ferramenta', 'Papel aqui'],
        rows: [
          ['sentinela', 'encerrar a leitura em `fim`'],
          ['`TryParse` + faixa', 'separar leitura válida de descarte'],
          ['contador', 'quantas válidas, quantas descartadas'],
          ['acumulador', 'consumo total'],
          ['contagem condicional', 'quantas passam de 40'],
        ],
      },
      {
        kind: 'text',
        body:
          'A estrutura recomendada é um laço com um `if` de validação no topo. Tudo que só vale para dado bom fica dentro do `if`; o `else` cuida do descarte. O importante é que a leitura da próxima linha aconteça **fora** desse `if`, na última instrução do corpo — senão o laço trava no primeiro descarte.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Resolva uma linha de saída por vez e rode os testes a cada passo. Cinco linhas de uma vez transformam qualquer erro num mistério, e este é o tipo de programa em que um `>` no lugar de `>=` passa despercebido por bastante tempo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '"Acima de 40" exclui o próprio 40. Um dos testes tem exatamente esse valor, justamente porque é o limite onde a maioria dos programas erra.',
      },
    ],
    quiz: [
      {
        id: 's02c01l10q1',
        type: 'single',
        prompt: 'Num laço com sentinela e validação, onde deve ficar a leitura da próxima linha?',
        options: [
          { id: 'a', text: 'Na última instrução do corpo, fora do `if` de validação.', correct: true },
          { id: 'b', text: 'Dentro do `if`, junto com o processamento do dado válido.' },
          { id: 'c', text: 'Dentro do `else`, só quando o dado foi descartado.' },
          { id: 'd', text: 'Antes do `if`, na primeira linha do corpo.' },
        ],
        explanation:
          'Colocá-la dentro do `if` faz o laço travar na primeira linha inválida, porque a variável testada pela condição para de mudar. Ela precisa acontecer em toda volta.',
      },
      {
        id: 's02c01l10q2',
        type: 'multiple',
        prompt: 'Quais entradas devem ser descartadas por um leitor de consumo que aceita apenas inteiros não negativos?',
        options: [
          { id: 'a', text: '`abc`', correct: true },
          { id: 'b', text: '`-3`', correct: true },
          { id: 'c', text: '`12.5`', correct: true },
          { id: 'd', text: '`0`' },
        ],
        explanation:
          '`0` é um consumo perfeitamente válido — um dia sem gasto. Texto, negativo e decimal não passam: os dois primeiros por regra de negócio ou conversão, o `12.5` porque `int.TryParse` não aceita casas decimais.',
      },
      {
        id: 's02c01l10q3',
        type: 'single',
        prompt: 'Se nenhuma leitura válida chegar, qual deve ser o total impresso?',
        options: [
          { id: 'a', code: '0', correct: true },
          { id: 'b', text: 'Nada: a linha do total é omitida.' },
          { id: 'c', text: 'A palavra `indefinido`.' },
          { id: 'd', text: 'O programa deve encerrar com erro.' },
        ],
        explanation:
          'O acumulador começa em 0 e esse já é o valor correto para "nenhum dado". É exatamente por isso que o elemento neutro é a escolha certa de inicialização.',
      },
    ],
    challenge: {
      brief:
        'Um medidor registra o consumo diário de energia. Leia uma linha por dia até encontrar a palavra `fim`. Uma leitura é válida quando é um inteiro maior ou igual a zero; qualquer outra coisa é descartada. Gere o relatório do período.',
      requirements: [
        'Linha 1: `Leituras validas: k`',
        'Linha 2: `Descartadas: d`',
        'Linha 3: `Consumo total: t`',
        'Linha 4: `Dias acima de 40: a`',
        'Linha 5: `Status: ALERTA` quando o total passa de 120, senão `Status: OK`',
        '"Acima de 40" exclui o valor 40, e "passa de 120" exclui o valor 120',
        'Sem nenhuma leitura, o total é `0` e o status é `OK`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        string linha = Console.ReadLine();

        int validas = 0;
        int descartadas = 0;
        int total = 0;
        int acima = 0;

        // Processe cada linha ate a sentinela "fim"

        Console.WriteLine($"Leituras validas: {validas}");
        Console.WriteLine($"Descartadas: {descartadas}");
        Console.WriteLine($"Consumo total: {total}");
        Console.WriteLine($"Dias acima de 40: {acima}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        string linha = Console.ReadLine();

        int validas = 0;
        int descartadas = 0;
        int total = 0;
        int acima = 0;

        while (linha != "fim")
        {
            if (int.TryParse(linha, out int leitura) && leitura >= 0)
            {
                validas++;
                total += leitura;

                if (leitura > 40)
                {
                    acima++;
                }
            }
            else
            {
                descartadas++;
            }

            linha = Console.ReadLine();
        }

        Console.WriteLine($"Leituras validas: {validas}");
        Console.WriteLine($"Descartadas: {descartadas}");
        Console.WriteLine($"Consumo total: {total}");
        Console.WriteLine($"Dias acima de 40: {acima}");
        Console.WriteLine(total > 120 ? "Status: ALERTA" : "Status: OK");
    }
}
`,
      hints: [
        'A sentinela é texto, então compare a `string` **antes** de tentar converter: `while (linha != "fim")`.',
        'O `if` de "acima de 40" fica aninhado dentro do `if` de validação — só faz sentido perguntar isso de uma leitura boa.',
      ],
      tests: [
        {
          name: 'Período com descartes e alerta',
          stdin: '35\nabc\n52\n18\n-3\n32\nfim\n',
          expectedStdout:
            'Leituras validas: 4\nDescartadas: 2\nConsumo total: 137\nDias acima de 40: 1\nStatus: ALERTA',
        },
        {
          name: 'Exatamente 40 não conta como acima',
          stdin: '40\n40\nfim\n',
          expectedStdout:
            'Leituras validas: 2\nDescartadas: 0\nConsumo total: 80\nDias acima de 40: 0\nStatus: OK',
        },
        {
          name: 'Uma leitura alta dispara o alerta',
          stdin: '150\nfim\n',
          expectedStdout:
            'Leituras validas: 1\nDescartadas: 0\nConsumo total: 150\nDias acima de 40: 1\nStatus: ALERTA',
        },
        {
          name: 'Total exatamente 120 ainda é OK',
          stdin: '60\n60\nfim\n',
          expectedStdout:
            'Leituras validas: 2\nDescartadas: 0\nConsumo total: 120\nDias acima de 40: 2\nStatus: OK',
        },
        {
          name: 'Período vazio',
          stdin: 'fim\n',
          expectedStdout:
            'Leituras validas: 0\nDescartadas: 0\nConsumo total: 0\nDias acima de 40: 0\nStatus: OK',
          hidden: true,
        },
      ],
    },
  },
]
