import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's02c02l01',
    title: 'Anatomia de um for',
    objective: 'Escrever laços contados com `for`, reunindo preparação, condição e progresso em uma única linha.',
    concept: [
      {
        kind: 'text',
        body:
          'O `for` não faz nada que o `while` não faça. O que ele muda é a **organização**: as três peças do laço, que no `while` ficavam espalhadas, aparecem juntas no cabeçalho.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'while: peças espalhadas',
          code: `int i = 1;
while (i <= 3)
{
    Console.WriteLine(i);
    i++;
}`,
        },
        right: {
          label: 'for: peças reunidas',
          code: `for (int i = 1; i <= 3; i++)
{
    Console.WriteLine(i);
}`,
        },
        note: 'Os dois imprimem 1, 2 e 3. O `for` só deixa impossível esquecer o progresso.',
      },
      {
        kind: 'code',
        code: `for (int i = 1; i <= 3; i++)
//   \\_______/  \\______/  \\_/
//   preparacao  condicao  progresso
{
    Console.WriteLine(i);
}`,
        caption: 'Separadas por ponto e vírgula, nesta ordem, sempre.',
      },
      {
        kind: 'text',
        body:
          'A ordem de execução é: a preparação roda **uma vez**; a condição é testada; se verdadeira, o corpo roda; então o progresso roda; e volta para a condição. O progresso acontece **depois** do corpo, não antes.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A variável declarada na preparação só existe dentro do laço. Isso é uma vantagem: acabou o laço, o nome fica livre de novo, e é impossível usar por engano um contador que já cumpriu seu papel.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um ponto e vírgula extra logo depois do parêntese — `for (int i = 0; i < 3; i++);` — compila sem erro e cria um laço de corpo vazio. O bloco abaixo dele roda uma única vez, e o bug é invisível na leitura rápida.',
      },
    ],
    quiz: [
      {
        id: 's02c02l01q1',
        type: 'single',
        prompt: 'Qual é a ordem correta das três partes do cabeçalho de um `for`?',
        options: [
          { id: 'a', text: 'Preparação, condição, progresso.', correct: true },
          { id: 'b', text: 'Condição, preparação, progresso.' },
          { id: 'c', text: 'Preparação, progresso, condição.' },
          { id: 'd', text: 'A ordem é livre, desde que separadas por ponto e vírgula.' },
        ],
        explanation:
          'A ordem é fixa e reflete o ciclo de vida do laço: preparar uma vez, testar antes de cada volta, avançar depois de cada volta.',
      },
      {
        id: 's02c02l01q2',
        type: 'single',
        prompt: 'Quantas vezes o corpo executa?',
        code: `for (int i = 0; i < 4; i++)
{
    Console.WriteLine("x");
}`,
        options: [
          { id: 'a', code: '4', correct: true },
          { id: 'b', code: '3' },
          { id: 'c', code: '5' },
          { id: 'd', code: '0' },
        ],
        explanation:
          'Com `i` começando em 0 e a condição `i < 4`, os valores visitados são 0, 1, 2 e 3 — quatro voltas. A fórmula `b - a` continua valendo.',
      },
      {
        id: 's02c02l01q3',
        type: 'single',
        prompt: 'O que este código imprime?',
        code: `for (int i = 1; i <= 3; i++);
{
    Console.WriteLine("oi");
}`,
        options: [
          { id: 'a', text: '`oi` uma única vez.', correct: true },
          { id: 'b', text: '`oi` três vezes.' },
          { id: 'c', text: 'Nada.' },
          { id: 'd', text: 'Erro de compilação.' },
        ],
        explanation:
          'O `;` no fim do cabeçalho é o corpo do laço: um corpo vazio, executado três vezes sem efeito. O bloco de chaves abaixo é apenas um bloco solto, que roda uma vez.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e imprima a tabela de quadrados de 1 até `n`, no formato `i x i = quadrado`. Termine imprimindo a soma de todos os quadrados.',
      requirements: [
        'Cada linha tem o formato `2 x 2 = 4`, com espaços em volta do `x` e do `=`',
        'A última linha é `Soma dos quadrados: X`',
        'Para `n` igual a 0, a saída é apenas `Soma dos quadrados: 0`',
        'Use `for`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int soma = 0;

        // Escreva o for de 1 ate n

        Console.WriteLine($"Soma dos quadrados: {soma}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int soma = 0;

        for (int i = 1; i <= n; i++)
        {
            int quadrado = i * i;
            Console.WriteLine($"{i} x {i} = {quadrado}");
            soma += quadrado;
        }

        Console.WriteLine($"Soma dos quadrados: {soma}");
    }
}
`,
      hints: [
        'O cabeçalho é `for (int i = 1; i <= n; i++)`. O acumulador `soma` fica fora dele.',
        'Calcule `i * i` uma vez em uma variável: você precisa do valor para imprimir e para somar.',
      ],
      tests: [
        {
          name: 'Quatro linhas',
          stdin: '4\n',
          expectedStdout: '1 x 1 = 1\n2 x 2 = 4\n3 x 3 = 9\n4 x 4 = 16\nSoma dos quadrados: 30',
        },
        {
          name: 'Uma linha só',
          stdin: '1\n',
          expectedStdout: '1 x 1 = 1\nSoma dos quadrados: 1',
        },
        {
          name: 'Zero: nenhuma volta',
          stdin: '0\n',
          expectedStdout: 'Soma dos quadrados: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c02l02',
    title: 'Contando para trás',
    objective: 'Percorrer uma faixa em ordem decrescente, invertendo condição e progresso de forma coerente.',
    concept: [
      {
        kind: 'text',
        body:
          'Contar para trás exige inverter **três coisas ao mesmo tempo**: o valor inicial, o operador da condição e a direção do progresso. Inverter só uma ou duas produz um laço que não roda ou que nunca para.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Crescente',
          code: `for (int i = 1; i <= n; i++)
{
    Console.WriteLine(i);
}`,
        },
        right: {
          label: 'Decrescente',
          code: `for (int i = n; i >= 1; i--)
{
    Console.WriteLine(i);
}`,
        },
        note: 'Começa no fim, testa com `>=`, e anda com `--`. Três inversões, não uma.',
      },
      {
        kind: 'table',
        headers: ['Se você trocar só...', 'O que acontece'],
        rows: [
          ['o início (`i = n`)', 'condição `i <= n` já é verdadeira e `i++` afasta: laço infinito'],
          ['o progresso (`i--`)', '`i` começa em 1 e desce: `i <= n` nunca fica falsa'],
          ['a condição (`i >= 1`)', '`i` começa em 1 e sobe: também nunca fica falsa'],
          ['os três', 'funciona'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um laço decrescente que chega a zero e continua não gera erro: `int` vai para negativo sem reclamar. Se a condição for `i != 0` e o passo for `i -= 2` a partir de um ímpar, o laço passa direto pelo zero e roda até o valor mínimo do `int`.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Na dúvida, conte as voltas mentalmente com o menor caso possível. Um laço decrescente com `n = 1` deve dar exatamente uma volta; com `n = 0`, nenhuma. Se qualquer um dos dois falhar, o cabeçalho está errado.',
      },
    ],
    quiz: [
      {
        id: 's02c02l02q1',
        type: 'single',
        prompt: 'O que este laço imprime?',
        code: `for (int i = 3; i >= 0; i--)
{
    Console.Write(i);
}`,
        options: [
          { id: 'a', code: '3210', correct: true },
          { id: 'b', code: '321' },
          { id: 'c', code: '0123' },
          { id: 'd', text: 'Nada.' },
        ],
        explanation:
          'A condição `i >= 0` inclui o zero, então os valores são 3, 2, 1 e 0. Trocar para `i > 0` pararia em 1.',
      },
      {
        id: 's02c02l02q2',
        type: 'single',
        prompt: 'Por que `for (int i = n; i <= 1; i--)` está errado para uma contagem regressiva?',
        options: [
          { id: 'a', text: 'A condição foi esquecida na inversão: para `n` maior que 1 ela já começa falsa.', correct: true },
          { id: 'b', text: 'Porque `i--` não pode aparecer junto com `<=`.' },
          { id: 'c', text: 'Porque `i` deveria ser `var`.' },
          { id: 'd', text: 'Está correto: imprime de `n` até 1.' },
        ],
        explanation:
          'Com `n = 5`, a condição `5 <= 1` é falsa de saída e o laço dá zero voltas. Início e progresso foram invertidos, mas a condição ficou para trás.',
      },
      {
        id: 's02c02l02q3',
        type: 'single',
        prompt: 'Qual laço decrescente é seguro contra laço infinito?',
        options: [
          { id: 'a', code: 'for (int i = n; i >= 0; i -= 3)', correct: true },
          { id: 'b', code: 'for (int i = n; i != 0; i -= 3)' },
          { id: 'c', code: 'for (int i = n; i >= 0; i--) { i++; }' },
          { id: 'd', code: 'for (int i = n; i > 0; i += 1)' },
        ],
        explanation:
          'Comparações de ordem ficam falsas e continuam falsas. Já `i != 0` com passo 3 pode pular o zero: partindo de 7, a sequência é 7, 4, 1, -2, e nunca toca o valor testado.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e faça uma contagem regressiva de `n` até 1, um número por linha. Termine com a linha `Decolar!`.',
      requirements: [
        'Cada número sai sozinho na linha, em ordem decrescente',
        'A contagem termina em 1, e o 0 não é impresso',
        'A última linha é sempre `Decolar!`',
        'Para `n` igual a 0, a saída é apenas `Decolar!`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        // Conte de n ate 1

        Console.WriteLine("Decolar!");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = n; i >= 1; i--)
        {
            Console.WriteLine(i);
        }

        Console.WriteLine("Decolar!");
    }
}
`,
      hints: [
        'Inverta as três partes de uma vez: comece em `n`, teste com `>=`, ande com `i--`.',
        'A contagem para em 1, então a condição é `i >= 1` e não `i >= 0`.',
      ],
      tests: [
        {
          name: 'Contagem de cinco',
          stdin: '5\n',
          expectedStdout: '5\n4\n3\n2\n1\nDecolar!',
        },
        {
          name: 'Uma volta só',
          stdin: '1\n',
          expectedStdout: '1\nDecolar!',
        },
        {
          name: 'Zero: decola direto',
          stdin: '0\n',
          expectedStdout: 'Decolar!',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c02l03',
    title: 'Ajustando o passo',
    objective: 'Avançar de dois em dois, de dez em dez ou por multiplicação, controlando quantos valores o laço visita.',
    concept: [
      {
        kind: 'text',
        body:
          'A terceira parte do `for` não precisa ser `i++`. Qualquer expressão que altere a variável de controle serve, e é aí que o laço deixa de ser só um contador e vira uma ferramenta de amostragem.',
      },
      {
        kind: 'table',
        headers: ['Progresso', 'Sequência a partir de 1', 'Uso típico'],
        rows: [
          ['`i++`', '1, 2, 3, 4, 5', 'percorrer tudo'],
          ['`i += 2`', '1, 3, 5, 7, 9', 'só os ímpares'],
          ['`i += 10`', '1, 11, 21, 31', 'faixas'],
          ['`i *= 2`', '1, 2, 4, 8, 16', 'crescimento exponencial'],
        ],
      },
      {
        kind: 'code',
        code: `// Todos os multiplos de 5 ate 30
for (int i = 5; i <= 30; i += 5)
{
    Console.Write(i + " ");
}`,
      },
      {
        kind: 'output',
        code: `5 10 15 20 25 30`,
      },
      {
        kind: 'text',
        body:
          'Com passo diferente de 1, o número de voltas deixa de ser a diferença simples. Para um passo `p` de `a` até `b` inclusive, são `(b - a) / p + 1` voltas quando `b >= a`, e zero caso contrário.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Com passo maior que 1 o laço pode **pular** o limite sem tocá-lo. De 2 até 10 com passo 3 a sequência é 2, 5, 8, e o 10 nunca aparece. Por isso a condição deve ser `<=` e não `==`.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um passo de multiplicação como `i *= 2` só funciona se `i` começar diferente de zero. Começar em 0 congela o laço, porque `0 * 2` continua 0 — o mesmo tipo de armadilha da divisão inteira.',
      },
    ],
    quiz: [
      {
        id: 's02c02l03q1',
        type: 'single',
        prompt: 'Quantos números este laço imprime?',
        code: `for (int i = 2; i <= 10; i += 3)
{
    Console.WriteLine(i);
}`,
        options: [
          { id: 'a', code: '3', correct: true },
          { id: 'b', code: '4' },
          { id: 'c', code: '9' },
          { id: 'd', code: '2' },
        ],
        explanation:
          'A sequência é 2, 5, 8. O próximo seria 11, que já não satisfaz `<= 10`. Pela fórmula: `(10 - 2) / 3 + 1 = 3`.',
      },
      {
        id: 's02c02l03q2',
        type: 'single',
        prompt: 'O que acontece com `for (int i = 0; i <= 100; i *= 2)`?',
        options: [
          { id: 'a', text: 'Laço infinito: `0 * 2` continua sendo 0.', correct: true },
          { id: 'b', text: 'Imprime 0, 2, 4, 8, 16...' },
          { id: 'c', text: 'Dá erro de compilação.' },
          { id: 'd', text: 'Dá exatamente uma volta.' },
        ],
        explanation:
          'Multiplicação tem 0 como elemento absorvente. Um progresso multiplicativo precisa começar em pelo menos 1 para efetivamente avançar.',
      },
      {
        id: 's02c02l03q3',
        type: 'single',
        prompt: 'Você quer visitar apenas os números pares entre 1 e `n`. Qual cabeçalho é o mais direto?',
        options: [
          { id: 'a', code: 'for (int i = 2; i <= n; i += 2)', correct: true },
          { id: 'b', code: 'for (int i = 1; i <= n; i += 2)' },
          { id: 'c', code: 'for (int i = 1; i <= n; i++) if (i % 2 == 0)' },
          { id: 'd', code: 'for (int i = 0; i <= n; i *= 2)' },
        ],
        explanation:
          'Começar no primeiro par e andar de 2 em 2 visita metade dos valores. A alternativa com `if` também funciona e dá o mesmo resultado, mas dá o dobro de voltas para descartar metade delas.',
      },
    ],
    challenge: {
      brief:
        'Leia três inteiros — `inicio`, `fim` e `passo` (com `passo` maior ou igual a 1) — e imprima a progressão de `inicio` até `fim`, avançando de `passo` em `passo`. Termine informando quantos valores foram impressos.',
      requirements: [
        'Cada valor sai sozinho na linha',
        'O último valor impresso é o maior que ainda não passa de `fim`',
        'A última linha é `Quantidade: k`',
        'Se `inicio` for maior que `fim`, nada é impresso e `k` é `0`',
        'Deixe o laço contar; não calcule `k` por fórmula',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int inicio = int.Parse(Console.ReadLine());
        int fim = int.Parse(Console.ReadLine());
        int passo = int.Parse(Console.ReadLine());

        int quantidade = 0;

        // Percorra de inicio ate fim, avancando de passo em passo

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
        int passo = int.Parse(Console.ReadLine());

        int quantidade = 0;

        for (int i = inicio; i <= fim; i += passo)
        {
            Console.WriteLine(i);
            quantidade++;
        }

        Console.WriteLine($"Quantidade: {quantidade}");
    }
}
`,
      hints: [
        'O progresso do `for` pode ser `i += passo`, usando a variável lida.',
        'A condição continua sendo `i <= fim`. Com passo maior que 1 o laço pode parar antes de tocar o limite, e isso é o comportamento correto.',
      ],
      tests: [
        {
          name: 'Passo 3 sem tocar o limite',
          stdin: '2\n10\n3\n',
          expectedStdout: '2\n5\n8\nQuantidade: 3',
        },
        {
          name: 'Passo 5 fechando no limite',
          stdin: '5\n30\n5\n',
          expectedStdout: '5\n10\n15\n20\n25\n30\nQuantidade: 6',
        },
        {
          name: 'Um valor só',
          stdin: '1\n1\n1\n',
          expectedStdout: '1\nQuantidade: 1',
        },
        {
          name: 'Faixa invertida não imprime nada',
          stdin: '10\n5\n2\n',
          expectedStdout: 'Quantidade: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c02l04',
    title: 'Várias variáveis de controle',
    objective: 'Fazer dois contadores caminharem juntos em um mesmo `for`, um subindo e outro descendo.',
    concept: [
      {
        kind: 'text',
        body:
          'A preparação e o progresso de um `for` aceitam mais de uma expressão, separadas por vírgula. A condição continua sendo uma só — mas pode envolver as duas variáveis.',
      },
      {
        kind: 'code',
        code: `for (int i = 1, j = 10; i < j; i++, j--)
{
    Console.WriteLine($"{i} e {j}");
}`,
      },
      {
        kind: 'output',
        code: `1 e 10
2 e 9
3 e 8
4 e 7
5 e 6`,
      },
      {
        kind: 'text',
        body:
          'Este padrão — dois ponteiros que se aproximam pelas pontas — é a base de vários algoritmos que você vai reencontrar: inverter uma sequência, testar palíndromo, e a busca de pares que somam um alvo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'As duas variáveis da preparação precisam ser do **mesmo tipo**, porque `int i = 1, j = 10` é uma única declaração. Para tipos diferentes, declare uma delas antes do laço.',
      },
      {
        kind: 'text',
        body:
          'A condição `i < j` é o que faz os dois se encontrarem no meio. Com um total par eles se cruzam sem se tocar; com total ímpar existe um valor central que fica de fora do laço, e muitas vezes é justamente esse valor que o problema quer.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Usar `i <= j` em vez de `i < j` inclui o par central `(k, k)` quando o total é ímpar. Qual das duas está certa depende do problema — decida isso antes de escrever, não depois de o teste falhar.',
      },
    ],
    quiz: [
      {
        id: 's02c02l04q1',
        type: 'single',
        prompt: 'Quantas linhas este laço imprime?',
        code: `for (int i = 1, j = 7; i < j; i++, j--)
{
    Console.WriteLine($"{i}-{j}");
}`,
        options: [
          { id: 'a', code: '3', correct: true },
          { id: 'b', code: '4' },
          { id: 'c', code: '7' },
          { id: 'd', code: '6' },
        ],
        explanation:
          'Os pares são 1-7, 2-6 e 3-5. Na quarta avaliação `i` e `j` valem os dois 4, e `4 < 4` é falso. O valor central sobra de fora.',
      },
      {
        id: 's02c02l04q2',
        type: 'single',
        prompt: 'Por que `for (int i = 0, double x = 1.0; ...)` não compila?',
        options: [
          { id: 'a', text: 'A preparação é uma única declaração, então todas as variáveis precisam ter o mesmo tipo.', correct: true },
          { id: 'b', text: 'Porque `double` não pode ser usado em laços.' },
          { id: 'c', text: 'Porque só é permitida uma variável na preparação.' },
          { id: 'd', text: 'Porque falta um ponto e vírgula entre as duas.' },
        ],
        explanation:
          'A vírgula separa declaradores de uma mesma declaração, não declarações independentes. Para misturar tipos, declare `double x = 1.0;` antes do `for` e use só `x = ...` na preparação.',
      },
      {
        id: 's02c02l04q3',
        type: 'single',
        prompt: 'Com `i` subindo de 1 e `j` descendo de `n`, quando existe um valor central que o laço não visita?',
        options: [
          { id: 'a', text: 'Quando `n` é ímpar.', correct: true },
          { id: 'b', text: 'Quando `n` é par.' },
          { id: 'c', text: 'Sempre existe um.' },
          { id: 'd', text: 'Nunca existe.' },
        ],
        explanation:
          'Com `n` par os dois se cruzam entre dois valores. Com `n` ímpar eles se encontram exatamente no meio, e a condição `i < j` exclui esse encontro.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e forme pares entre as pontas da faixa de 1 a `n`: o primeiro com o último, o segundo com o penúltimo, e assim por diante. Informe quantos pares saíram e qual valor ficou sem par.',
      requirements: [
        'Cada par sai como `1 e 6`, com o menor primeiro',
        'Depois dos pares, imprima `Pares: k`',
        'A última linha é `Sobrou: v` quando `n` é ímpar, e `Sobrou: nenhum` quando é par',
        'Para `n` igual a 1 não sai nenhum par, `k` é `0` e sobra o próprio 1',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int pares = 0;

        // Use duas variaveis de controle que se aproximam pelas pontas

        Console.WriteLine($"Pares: {pares}");

        // Informe o valor central quando n for impar
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int pares = 0;

        for (int i = 1, j = n; i < j; i++, j--)
        {
            Console.WriteLine($"{i} e {j}");
            pares++;
        }

        Console.WriteLine($"Pares: {pares}");

        if (n % 2 == 1)
        {
            Console.WriteLine($"Sobrou: {(n + 1) / 2}");
        }
        else
        {
            Console.WriteLine("Sobrou: nenhum");
        }
    }
}
`,
      hints: [
        'O cabeçalho é `for (int i = 1, j = n; i < j; i++, j--)`.',
        'O valor central de uma faixa ímpar de 1 a `n` é `(n + 1) / 2` — com `n` ímpar, essa divisão inteira dá exatamente o meio.',
      ],
      tests: [
        {
          name: 'Total par: ninguém sobra',
          stdin: '6\n',
          expectedStdout: '1 e 6\n2 e 5\n3 e 4\nPares: 3\nSobrou: nenhum',
        },
        {
          name: 'Total ímpar: sobra o central',
          stdin: '5\n',
          expectedStdout: '1 e 5\n2 e 4\nPares: 2\nSobrou: 3',
        },
        {
          name: 'Um valor só, sem par possível',
          stdin: '1\n',
          expectedStdout: 'Pares: 0\nSobrou: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c02l05',
    title: 'for ou while: como decidir',
    objective: 'Escolher o laço certo a partir da natureza do problema, e combinar os dois quando ambos aparecem juntos.',
    concept: [
      {
        kind: 'text',
        body:
          'Os dois laços têm o mesmo poder: qualquer `for` vira um `while` e vice-versa. A escolha é sobre **comunicar a intenção** para quem lê o código depois — inclusive você.',
      },
      {
        kind: 'table',
        headers: ['Se o problema diz...', 'Use', 'Por quê'],
        rows: [
          ['"repita n vezes"', '`for`', 'a contagem é o assunto'],
          ['"de 1 até n"', '`for`', 'faixa conhecida'],
          ['"para cada linha lida"', '`for`', 'a quantidade veio antes'],
          ['"enquanto houver dados"', '`while`', 'o fim depende do dado'],
          ['"até o usuário acertar"', '`while`', 'pode nunca ou sempre'],
          ['"pelo menos uma vez"', '`do-while`', 'o teste vem depois'],
        ],
      },
      {
        kind: 'text',
        body:
          'A pergunta que resolve quase todos os casos: **no momento em que o laço começa, você já sabe quantas voltas vai dar?** Se sim, `for`. Se a resposta depende do que acontecer lá dentro, `while`.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Contagem conhecida',
          code: `for (int i = 0; i < n; i++)
{
    // processa o i-esimo item
}`,
        },
        right: {
          label: 'Fim descoberto no caminho',
          code: `while (valor > 1)
{
    valor = valor / 2;
}`,
        },
        note: 'No segundo caso, quantas voltas serão dadas só se descobre executando.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Os dois convivem no mesmo programa o tempo todo, e o encaixe mais comum é um `while` dentro de um `for`: o `for` percorre uma quantidade conhecida de itens, e o `while` processa cada item até uma condição interna.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um `for` com condição que não depende do contador (`for (int i = 0; texto != "sair"; i++)`) é um `while` disfarçado, e disfarçado de forma confusa. Se o cabeçalho não conta nada, ele não devia ser um `for`.',
      },
    ],
    quiz: [
      {
        id: 's02c02l05q1',
        type: 'single',
        prompt: 'Qual laço é o mais adequado para "leia linhas até encontrar a palavra fim"?',
        options: [
          { id: 'a', code: 'while', correct: true },
          { id: 'b', code: 'for' },
          { id: 'c', text: 'Tanto faz: os dois comunicam a mesma coisa.' },
          { id: 'd', text: 'Nenhum dos dois: isso exige uma estrutura diferente.' },
        ],
        explanation:
          'A quantidade de linhas só é conhecida quando a sentinela aparece. O `for` funcionaria, mas o cabeçalho não teria nada para contar.',
      },
      {
        id: 's02c02l05q2',
        type: 'single',
        prompt: 'Qual laço é o mais adequado para "leia n e depois leia n notas"?',
        options: [
          { id: 'a', code: 'for', correct: true },
          { id: 'b', code: 'while' },
          { id: 'c', code: 'do-while' },
          { id: 'd', text: 'Um `switch`.' },
        ],
        explanation:
          'A quantidade de voltas é conhecida antes da primeira delas. Isso é a definição de laço contado, e o `for` deixa isso explícito no cabeçalho.',
      },
      {
        id: 's02c02l05q3',
        type: 'multiple',
        prompt: 'Quais afirmações sobre `for` e `while` são verdadeiras?',
        options: [
          { id: 'a', text: 'Todo `for` pode ser reescrito como `while`.', correct: true },
          { id: 'b', text: 'A escolha entre eles é sobre legibilidade, não sobre capacidade.', correct: true },
          { id: 'c', text: 'Um `while` pode aparecer dentro de um `for`.', correct: true },
          { id: 'd', text: 'O `for` é mais rápido, porque o compilador o otimiza melhor.' },
        ],
        explanation:
          'Não há diferença de desempenho: os dois geram essencialmente o mesmo código. A diferença é inteiramente de comunicação.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` valores, cada um maior ou igual a 1. Para cada valor, conte quantas divisões inteiras por 2 são necessárias até ele chegar a 1. Imprima o resultado de cada valor e o total de passos.',
      requirements: [
        'Cada valor gera uma linha no formato `20 -> 4`',
        'A última linha é `Total: X`, com a soma de todos os passos',
        'O valor 1 precisa de 0 passos',
        'O laço externo é contado (`for`), e o interno depende do dado (`while`)',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int total = 0;

        // for externo: n valores. while interno: divide ate chegar em 1.

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

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());

            int atual = valor;
            int passos = 0;

            while (atual > 1)
            {
                atual = atual / 2;
                passos++;
            }

            Console.WriteLine($"{valor} -> {passos}");
            total += passos;
        }

        Console.WriteLine($"Total: {total}");
    }
}
`,
      hints: [
        'Guarde o valor original em uma variável separada da que você vai dividir: você precisa dele para imprimir.',
        '`passos` nasce zerado a cada volta do `for`, mas `total` precisa sobreviver a todas elas.',
      ],
      tests: [
        {
          name: 'Dois valores',
          stdin: '2\n20\n7\n',
          expectedStdout: '20 -> 4\n7 -> 2\nTotal: 6',
        },
        {
          name: 'O valor 1 não precisa de passo nenhum',
          stdin: '1\n1\n',
          expectedStdout: '1 -> 0\nTotal: 0',
        },
        {
          name: 'Potência de dois exata',
          stdin: '3\n1\n2\n1024\n',
          expectedStdout: '1 -> 0\n2 -> 1\n1024 -> 10\nTotal: 11',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c02l06',
    title: 'Somatórios e produtórios',
    objective: 'Traduzir fórmulas de somatório e produtório em laços, escolhendo o acumulador certo para cada uma.',
    concept: [
      {
        kind: 'text',
        body:
          'Notação matemática e laço são a mesma ideia escrita em dois idiomas. O somatório com o símbolo sigma diz "some `i` para cada `i` de 1 até n"; o `for` diz exatamente isso, só que executável.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Somatório de 1 a n',
          code: `int soma = 0;
for (int i = 1; i <= n; i++)
{
    soma += i;
}`,
        },
        right: {
          label: 'Produtório de 1 a n',
          code: `long produto = 1;
for (int i = 1; i <= n; i++)
{
    produto *= i;
}`,
        },
        note: 'Muda o acumulador, muda o valor inicial, muda o operador. O esqueleto do laço é idêntico.',
      },
      {
        kind: 'text',
        body:
          'Um somatório pode ter uma **condição** embutida: "some apenas os pares" é o mesmo laço com um `if` no corpo. E pode ter um **termo transformado**: "some os quadrados" acumula `i * i` em vez de `i`.',
      },
      {
        kind: 'table',
        headers: ['Enunciado', 'Início', 'Corpo'],
        rows: [
          ['soma de 1 a n', '`0`', '`soma += i`'],
          ['soma dos quadrados', '`0`', '`soma += i * i`'],
          ['soma dos pares', '`0`', '`if (i % 2 == 0) soma += i`'],
          ['produto de 1 a n', '`1`', '`produto *= i`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Produtórios crescem rápido demais para `int`. Já `13!` passa de 6 bilhões e estoura o limite, silenciosamente, virando um número negativo. Use `long` sempre que o acumulador for multiplicativo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Quando o laço não dá nenhuma volta, o resultado é o valor inicial — e é por isso que ele precisa ser o elemento neutro. Uma soma vazia vale 0 e um produto vazio vale 1. Isso não é convenção arbitrária: é o único valor que mantém as fórmulas coerentes.',
      },
    ],
    quiz: [
      {
        id: 's02c02l06q1',
        type: 'single',
        prompt: 'Quanto vale `soma` ao final?',
        code: `int soma = 0;
for (int i = 1; i <= 4; i++)
{
    soma += i * i;
}`,
        options: [
          { id: 'a', code: '30', correct: true },
          { id: 'b', code: '10' },
          { id: 'c', code: '100' },
          { id: 'd', code: '16' },
        ],
        explanation:
          'O termo acumulado é `i * i`, então a soma é 1 + 4 + 9 + 16 = 30. Somar `i` daria 10; somar e depois elevar daria 100.',
      },
      {
        id: 's02c02l06q2',
        type: 'single',
        prompt: 'Um produtório sobre uma faixa vazia deve resultar em quanto?',
        options: [
          { id: 'a', code: '1', correct: true },
          { id: 'b', code: '0' },
          { id: 'c', text: 'Indefinido: o programa deveria avisar.' },
          { id: 'd', text: 'O primeiro valor da faixa.' },
        ],
        explanation:
          'O produto vazio vale 1, o elemento neutro da multiplicação. É o mesmo motivo pelo qual `0! = 1`, que você vai reencontrar na próxima lição.',
      },
      {
        id: 's02c02l06q3',
        type: 'single',
        prompt: 'Por que usar `long` no acumulador de um produtório?',
        options: [
          { id: 'a', text: 'Porque produtos crescem muito rápido e um `int` estoura sem aviso.', correct: true },
          { id: 'b', text: 'Porque `*=` não funciona com `int`.' },
          { id: 'c', text: 'Porque `long` é mais rápido para multiplicação.' },
          { id: 'd', text: 'Porque `int` não pode ser inicializado com 1.' },
        ],
        explanation:
          'O `int` vai até cerca de 2,1 bilhões. Multiplicações passam disso em poucas voltas, e o resultado dá a volta para negativo sem lançar exceção — um erro silencioso.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` entre 0 e 12 e calcule três agregados sobre a faixa de 1 a `n`: a soma de todos os números, a soma apenas dos pares, e o produto apenas dos ímpares.',
      requirements: [
        'Linha 1: `Soma: X`',
        'Linha 2: `Soma dos pares: Y`',
        'Linha 3: `Produto dos impares: Z`',
        'Para `n` igual a 0 a saída é `Soma: 0`, `Soma dos pares: 0` e `Produto dos impares: 1`',
        'Use um único `for` para os três acumuladores',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int soma = 0;
        int somaPares = 0;
        long produtoImpares = 1;

        // Um unico for alimenta os tres acumuladores

        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Soma dos pares: {somaPares}");
        Console.WriteLine($"Produto dos impares: {produtoImpares}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int soma = 0;
        int somaPares = 0;
        long produtoImpares = 1;

        for (int i = 1; i <= n; i++)
        {
            soma += i;

            if (i % 2 == 0)
            {
                somaPares += i;
            }
            else
            {
                produtoImpares *= i;
            }
        }

        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Soma dos pares: {somaPares}");
        Console.WriteLine($"Produto dos impares: {produtoImpares}");
    }
}
`,
      hints: [
        'Os três acumuladores são declarados antes do laço, cada um com o seu elemento neutro.',
        'Um `if / else` dentro do laço basta: todo número é par ou ímpar, nunca os dois.',
      ],
      tests: [
        {
          name: 'Faixa até 6',
          stdin: '6\n',
          expectedStdout: 'Soma: 21\nSoma dos pares: 12\nProduto dos impares: 15',
        },
        {
          name: 'Faixa até 9',
          stdin: '9\n',
          expectedStdout: 'Soma: 45\nSoma dos pares: 20\nProduto dos impares: 945',
        },
        {
          name: 'Faixa vazia: só os neutros',
          stdin: '0\n',
          expectedStdout: 'Soma: 0\nSoma dos pares: 0\nProduto dos impares: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c02l07',
    title: 'Fatorial iterativo',
    objective: 'Calcular fatoriais com um laço, entendendo por que `0!` é 1 e onde o tipo do acumulador estoura.',
    concept: [
      {
        kind: 'text',
        body:
          'O fatorial de `n` é o produto de todos os inteiros de 1 até `n`. É o produtório mais famoso que existe e aparece em contagem de permutações, probabilidade e várias fórmulas combinatórias.',
      },
      {
        kind: 'code',
        code: `long fatorial = 1;              // 0! ja esta calculado

for (int i = 1; i <= n; i++)
{
    fatorial *= i;
}`,
        caption: 'O laço começa em 1 porque multiplicar por 1 antes disso não muda nada.',
      },
      {
        kind: 'text',
        body:
          'A definição `0! = 1` costuma parecer arbitrária, mas cai naturalmente do laço: com `n` igual a 0 o corpo nunca roda, e o resultado é o valor inicial do acumulador — o elemento neutro da multiplicação.',
      },
      {
        kind: 'table',
        headers: ['`n`', '`n!`', 'Cabe em'],
        rows: [
          ['`10`', '3.628.800', '`int`'],
          ['`12`', '479.001.600', '`int`'],
          ['`13`', '6.227.020.800', 'só `long`'],
          ['`20`', '2.432.902.008.176.640.000', 'limite do `long`'],
          ['`21`', 'passa de 51 quintilhões', 'nem `long`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O estouro não avisa. Com `int`, `13!` devolve `1932053504`, um número perfeitamente plausível e completamente errado. O fatorial é o exemplo clássico porque a explosão acontece em pouquíssimas voltas.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que cada valor de `fatorial` dentro do laço é o fatorial de `i`. Imprimir o acumulador a cada volta dá a tabela inteira de graça, sem recalcular nada — cada resultado reaproveita o anterior.',
      },
    ],
    quiz: [
      {
        id: 's02c02l07q1',
        type: 'single',
        prompt: 'Quanto vale `0!`?',
        options: [
          { id: 'a', code: '1', correct: true },
          { id: 'b', code: '0' },
          { id: 'c', text: 'Indefinido.' },
          { id: 'd', text: 'Depende da convenção adotada.' },
        ],
        explanation:
          'Com `n = 0` o laço dá zero voltas e o resultado é o valor inicial do acumulador. Um produto vazio vale 1, então `0! = 1`.',
      },
      {
        id: 's02c02l07q2',
        type: 'single',
        prompt: 'Por que o laço pode começar em 2 sem alterar o resultado?',
        options: [
          { id: 'a', text: 'Porque multiplicar por 1 não muda o acumulador.', correct: true },
          { id: 'b', text: 'Porque `1!` é 0 e pode ser ignorado.' },
          { id: 'c', text: 'Porque o C# ignora a primeira volta de todo `for`.' },
          { id: 'd', text: 'Não pode: começar em 2 dá resultado errado.' },
        ],
        explanation:
          'A volta com `i = 1` executa `fatorial *= 1`, que é uma operação sem efeito. Começar em 2 economiza uma volta e dá exatamente o mesmo número.',
      },
      {
        id: 's02c02l07q3',
        type: 'single',
        prompt: 'Um programa calcula `13!` com um acumulador `int`. O que acontece?',
        options: [
          { id: 'a', text: 'Ele imprime um número errado, sem erro nem aviso.', correct: true },
          { id: 'b', text: 'Ele lança uma exceção de overflow.' },
          { id: 'c', text: 'Ele imprime o valor correto: `int` vai até 9 quintilhões.' },
          { id: 'd', text: 'Ele entra em laço infinito.' },
        ],
        explanation:
          'Fora de um bloco `checked`, o estouro de um `int` simplesmente descarta os bits que não couberam. O resultado é lixo com aparência de número válido.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` entre 0 e 20 e imprima a tabela de fatoriais de `0!` até `n!`, uma linha por valor.',
      requirements: [
        'Cada linha tem o formato `5! = 120`',
        'A primeira linha é sempre `0! = 1`',
        'Para `n` igual a 0, essa é a única linha da saída',
        'Use `long` no acumulador: com `int` o resultado quebra a partir de `13!`',
        'Reaproveite o valor anterior em vez de recalcular o produto a cada linha',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        long fatorial = 1;
        Console.WriteLine($"0! = {fatorial}");

        // A cada volta, multiplique pelo i atual e imprima
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        long fatorial = 1;
        Console.WriteLine($"0! = {fatorial}");

        for (int i = 1; i <= n; i++)
        {
            fatorial *= i;
            Console.WriteLine($"{i}! = {fatorial}");
        }
    }
}
`,
      hints: [
        'A linha do `0!` já vem impressa. O laço cuida de 1 até `n`.',
        'Multiplique **antes** de imprimir: na volta de `i`, o acumulador precisa já valer `i!`.',
      ],
      tests: [
        {
          name: 'Até 5',
          stdin: '5\n',
          expectedStdout: '0! = 1\n1! = 1\n2! = 2\n3! = 6\n4! = 24\n5! = 120',
        },
        {
          name: 'Só o zero',
          stdin: '0\n',
          expectedStdout: '0! = 1',
        },
        {
          name: 'Até 10',
          stdin: '10\n',
          expectedStdout:
            '0! = 1\n1! = 1\n2! = 2\n3! = 6\n4! = 24\n5! = 120\n6! = 720\n7! = 5040\n8! = 40320\n9! = 362880\n10! = 3628800',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c02l08',
    title: 'Fibonacci iterativo',
    objective: 'Gerar a sequência de Fibonacci com um laço, mantendo dois estados que avançam juntos sem se sobrescrever.',
    concept: [
      {
        kind: 'text',
        body:
          'Na sequência de Fibonacci cada termo é a soma dos dois anteriores, começando em 0 e 1: 0, 1, 1, 2, 3, 5, 8, 13, 21. Ela é o primeiro problema desta seção em que o laço precisa lembrar de **dois** valores ao mesmo tempo.',
      },
      {
        kind: 'code',
        code: `long anterior = 0;
long atual = 1;

for (int i = 0; i < n; i++)
{
    Console.WriteLine(anterior);

    long proximo = anterior + atual;   // calcula antes de sobrescrever
    anterior = atual;
    atual = proximo;
}`,
        caption: 'A variável temporária existe para não perder o valor antigo no meio da troca.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Sem a variável temporária, `anterior = atual;` seguido de `atual = anterior + atual;` dá errado: na segunda linha `anterior` **já foi trocado**, e a soma usa o mesmo valor duas vezes. O resultado é uma sequência de potências de 2, não de Fibonacci.',
      },
      {
        kind: 'compare',
        good: `long proximo = anterior + atual;
anterior = atual;
atual = proximo;`,
        bad: `anterior = atual;
atual = anterior + atual;`,
        goodLabel: '0 1 1 2 3 5 8',
        badLabel: '0 1 2 4 8 16 32',
      },
      {
        kind: 'text',
        body:
          'A ordem é sempre a mesma quando um estado depende de outro: **calcule tudo que precisa dos valores antigos, e só depois atualize**. Essa regra vai reaparecer em ordenação, em simulações e em qualquer troca de duas variáveis.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Esta versão faz uma soma por termo. A versão recursiva, que você verá na Seção 4, recalcula os mesmos termos milhões de vezes para valores nem tão grandes. O laço aqui é incomparavelmente mais eficiente.',
      },
    ],
    quiz: [
      {
        id: 's02c02l08q1',
        type: 'single',
        prompt: 'Quais são os sete primeiros termos de Fibonacci, começando em `F0`?',
        options: [
          { id: 'a', text: '0, 1, 1, 2, 3, 5, 8', correct: true },
          { id: 'b', text: '1, 1, 2, 3, 5, 8, 13' },
          { id: 'c', text: '0, 1, 2, 3, 5, 8, 13' },
          { id: 'd', text: '1, 2, 4, 8, 16, 32, 64' },
        ],
        explanation:
          'Com `F0 = 0` e `F1 = 1`, cada termo seguinte é a soma dos dois anteriores. A alternativa que começa em 1 é a mesma sequência deslocada, uma convenção também usada — por isso o enunciado sempre precisa dizer onde começa.',
      },
      {
        id: 's02c02l08q2',
        type: 'single',
        prompt: 'O que este trecho produz em vez de Fibonacci?',
        code: `long anterior = 0, atual = 1;
for (int i = 0; i < 6; i++)
{
    Console.Write(anterior + " ");
    anterior = atual;
    atual = anterior + atual;
}`,
        options: [
          { id: 'a', text: 'Potências de 2: 0 1 2 4 8 16', correct: true },
          { id: 'b', text: 'Fibonacci correto: 0 1 1 2 3 5' },
          { id: 'c', text: 'Todos zeros.' },
          { id: 'd', text: 'Erro de compilação.' },
        ],
        explanation:
          'Depois de `anterior = atual`, as duas variáveis são iguais, então `anterior + atual` vira `atual * 2`. O valor antigo de `anterior` foi perdido antes de ser usado.',
      },
      {
        id: 's02c02l08q3',
        type: 'single',
        prompt: 'Por que usar `long` em vez de `int` para os termos?',
        options: [
          { id: 'a', text: 'Porque a sequência cresce rápido e passa do limite do `int` por volta do termo 47.', correct: true },
          { id: 'b', text: 'Porque `int` não suporta soma de duas variáveis.' },
          { id: 'c', text: 'Porque Fibonacci pode gerar valores negativos.' },
          { id: 'd', text: 'Não há motivo: `int` é suficiente para qualquer `n`.' },
        ],
        explanation:
          'O crescimento é exponencial, com razão próxima de 1,618. `F46` é 1.836.311.903, e `F47` já não cabe em `int`.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 0 e imprima os `n` primeiros termos de Fibonacci, começando em `F0 = 0`. No fim, imprima a soma de todos os termos exibidos.',
      requirements: [
        'Cada termo sai no formato `F0 = 0`, com o índice começando em 0',
        'A última linha é `Soma: X`',
        'Para `n` igual a 0 a saída é apenas `Soma: 0`',
        'Use `long` nos termos e na soma',
        'Calcule o próximo termo antes de atualizar os dois estados',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        long anterior = 0;
        long atual = 1;
        long soma = 0;

        // Imprima n termos e acumule a soma

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

        long anterior = 0;
        long atual = 1;
        long soma = 0;

        for (int i = 0; i < n; i++)
        {
            Console.WriteLine($"F{i} = {anterior}");
            soma += anterior;

            long proximo = anterior + atual;
            anterior = atual;
            atual = proximo;
        }

        Console.WriteLine($"Soma: {soma}");
    }
}
`,
      hints: [
        'O termo que você imprime é sempre `anterior`. O `atual` é o que vem depois dele.',
        'Use uma variável temporária `proximo` para guardar a soma antes de mexer em `anterior` e `atual`.',
      ],
      tests: [
        {
          name: 'Sete termos',
          stdin: '7\n',
          expectedStdout: 'F0 = 0\nF1 = 1\nF2 = 1\nF3 = 2\nF4 = 3\nF5 = 5\nF6 = 8\nSoma: 20',
        },
        {
          name: 'Um termo só',
          stdin: '1\n',
          expectedStdout: 'F0 = 0\nSoma: 0',
        },
        {
          name: 'Dez termos',
          stdin: '10\n',
          expectedStdout:
            'F0 = 0\nF1 = 1\nF2 = 1\nF3 = 2\nF4 = 3\nF5 = 5\nF6 = 8\nF7 = 13\nF8 = 21\nF9 = 34\nSoma: 88',
        },
        {
          name: 'Nenhum termo',
          stdin: '0\n',
          expectedStdout: 'Soma: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c02l09',
    title: 'Prática: tabuada completa',
    objective: 'Aninhar dois `for` para gerar uma tabela bidimensional, mantendo claro o papel de cada contador.',
    concept: [
      {
        kind: 'text',
        body:
          'Um laço dentro de outro é o primeiro passo para gerar tabelas, grades e figuras. A regra que organiza tudo: o laço **externo** troca de linha, o **interno** percorre a linha inteira.',
      },
      {
        kind: 'code',
        code: `for (int t = 2; t <= 3; t++)       // externo: qual tabuada
{
    Console.WriteLine($"Tabuada do {t}");

    for (int m = 1; m <= 10; m++)  // interno: da 1 ate 10
    {
        Console.WriteLine($"{t} x {m} = {t * m}");
    }
}`,
      },
      {
        kind: 'text',
        body:
          'O laço interno roda **por completo** a cada volta do externo. Com o externo dando 2 voltas e o interno 10, o corpo mais interno executa 20 vezes — a multiplicação das duas contagens.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Os dois contadores precisam ter nomes diferentes. Reaproveitar `i` nos dois faz o laço interno destruir o progresso do externo, o que costuma virar laço infinito. Nomes com significado (`t` de tabuada, `m` de multiplicador) evitam o problema e ainda documentam o código.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A variável do laço externo é visível dentro do interno, e é justamente isso que faz a tabela funcionar: a expressão `t * m` só existe porque os dois contadores estão disponíveis ao mesmo tempo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Se a saída sai com as linhas na ordem errada, o problema quase nunca é o cálculo: é qual laço ficou por fora. Trocar externo por interno transpõe a tabela inteira.',
      },
    ],
    quiz: [
      {
        id: 's02c02l09q1',
        type: 'single',
        prompt: 'Quantas vezes o `Console.WriteLine` mais interno executa?',
        code: `for (int a = 1; a <= 4; a++)
{
    for (int b = 1; b <= 5; b++)
    {
        Console.WriteLine(a * b);
    }
}`,
        options: [
          { id: 'a', code: '20', correct: true },
          { id: 'b', code: '9' },
          { id: 'c', code: '5' },
          { id: 'd', code: '4' },
        ],
        explanation:
          'O laço interno roda inteiro a cada volta do externo, então o total é 4 × 5 = 20. Laços aninhados multiplicam o trabalho, e isso vira o assunto do próximo capítulo.',
      },
      {
        id: 's02c02l09q2',
        type: 'single',
        prompt: 'O que acontece se os dois laços usarem a mesma variável `i`?',
        options: [
          { id: 'a', text: 'Não compila: o laço interno tenta redeclarar um nome que já existe no escopo.', correct: true },
          { id: 'b', text: 'Compila e a tabela sai transposta.' },
          { id: 'c', text: 'Compila e imprime só a primeira linha.' },
          { id: 'd', text: 'Compila e funciona normalmente.' },
        ],
        explanation:
          'O C# impede a redeclaração dentro de um escopo aninhado, então o erro aparece já na compilação. Em linguagens mais permissivas o mesmo código viraria um laço infinito silencioso.',
      },
      {
        id: 's02c02l09q3',
        type: 'single',
        prompt: 'Você inverteu os laços e a saída mudou. Por quê?',
        options: [
          { id: 'a', text: 'O laço externo define a ordem das linhas, então trocá-los transpõe a tabela.', correct: true },
          { id: 'b', text: 'Porque a multiplicação não é comutativa.' },
          { id: 'c', text: 'Porque o laço interno passa a rodar menos vezes.' },
          { id: 'd', text: 'Porque o compilador reordena o código.' },
        ],
        explanation:
          'O total de linhas é o mesmo e cada produto também, mas o agrupamento muda: em vez de "tudo do 2, depois tudo do 3", sai "o 2 e o 3 do primeiro multiplicador, depois do segundo".',
      },
    ],
    challenge: {
      brief:
        'Leia dois inteiros, `inicio` e `fim` (com `inicio` menor ou igual a `fim`), e imprima as tabuadas de `inicio` até `fim`. Cada tabuada começa com um cabeçalho e traz as multiplicações de 1 a 10.',
      requirements: [
        'Cada tabuada começa com a linha `Tabuada do 7`',
        'Em seguida vêm 10 linhas no formato `7 x 1 = 7`, com o multiplicador de 1 a 10',
        'As tabuadas saem em ordem crescente, sem linha em branco entre elas',
        'Use dois `for` aninhados, com nomes de contador diferentes',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int inicio = int.Parse(Console.ReadLine());
        int fim = int.Parse(Console.ReadLine());

        // Externo: qual tabuada. Interno: multiplicadores de 1 a 10.
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

        for (int t = inicio; t <= fim; t++)
        {
            Console.WriteLine($"Tabuada do {t}");

            for (int m = 1; m <= 10; m++)
            {
                Console.WriteLine($"{t} x {m} = {t * m}");
            }
        }
    }
}
`,
      hints: [
        'O cabeçalho `Tabuada do X` é impresso pelo laço externo, antes de entrar no interno.',
        'O laço interno vai sempre de 1 a 10, independentemente da tabuada — só o `t` muda.',
      ],
      tests: [
        {
          name: 'Uma tabuada só',
          stdin: '7\n7\n',
          expectedStdout:
            'Tabuada do 7\n7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70',
        },
        {
          name: 'Duas tabuadas seguidas',
          stdin: '1\n2\n',
          expectedStdout:
            'Tabuada do 1\n1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n1 x 4 = 4\n1 x 5 = 5\n1 x 6 = 6\n1 x 7 = 7\n1 x 8 = 8\n1 x 9 = 9\n1 x 10 = 10\n' +
            'Tabuada do 2\n2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18\n2 x 10 = 20',
        },
        {
          name: 'Tabuada do 10',
          stdin: '10\n10\n',
          expectedStdout:
            'Tabuada do 10\n10 x 1 = 10\n10 x 2 = 20\n10 x 3 = 30\n10 x 4 = 40\n10 x 5 = 50\n10 x 6 = 60\n10 x 7 = 70\n10 x 8 = 80\n10 x 9 = 90\n10 x 10 = 100',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c02l10',
    title: 'Checkpoint: laços com for',
    objective: 'Montar um painel numérico que exercita, num único programa, todas as formas de `for` do capítulo.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint pede seis resultados sobre o mesmo `n`, e cada um usa uma variação diferente de `for` que você aprendeu neste capítulo. Nenhum deles é difícil sozinho; o exercício é fazer os seis conviverem.',
      },
      {
        kind: 'table',
        headers: ['Saída', 'Variação de `for`'],
        rows: [
          ['crescente', '`i++` de 1 a `n`'],
          ['decrescente', '`i--` de `n` a 1'],
          ['ímpares', '`i += 2` a partir de 1'],
          ['soma', 'somatório acumulado'],
          ['fatorial', 'produtório em `long`'],
          ['fibonacci', 'dois estados que avançam juntos'],
        ],
      },
      {
        kind: 'text',
        body:
          'Para montar uma lista em uma linha só, acumule em uma `string`. Cada volta concatena o valor mais um espaço, e a linha inteira é impressa depois do laço.',
      },
      {
        kind: 'code',
        code: `string lista = "";

for (int i = 1; i <= n; i++)
{
    lista += $"{i} ";
}

Console.WriteLine($"Crescente: {lista}");`,
        caption: 'O espaço sobrando no fim da linha é ignorado na comparação da saída.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Teste com `n = 0` antes de considerar o programa pronto. As três listas ficam vazias, a soma dá 0 e o fatorial dá 1 — os valores iniciais de cada acumulador aparecem sozinhos, e é aí que se descobre se algum foi escolhido errado.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Cada resultado precisa do seu próprio laço, com o seu próprio contador. Tentar calcular os seis dentro de um único `for` é possível, mas o decrescente e o Fibonacci não seguem a mesma cadência dos outros e a lógica vira um nó.',
      },
    ],
    quiz: [
      {
        id: 's02c02l10q1',
        type: 'single',
        prompt: 'Com `n = 0`, quais devem ser os valores de soma e de fatorial?',
        options: [
          { id: 'a', text: 'Soma 0 e fatorial 1.', correct: true },
          { id: 'b', text: 'Soma 0 e fatorial 0.' },
          { id: 'c', text: 'Soma 1 e fatorial 1.' },
          { id: 'd', text: 'Os dois indefinidos.' },
        ],
        explanation:
          'Nenhum dos dois laços dá volta, então cada acumulador mantém seu valor inicial. Somar nada dá 0; multiplicar nada dá 1.',
      },
      {
        id: 's02c02l10q2',
        type: 'single',
        prompt: 'Por que o espaço extra no fim de `"1 2 3 "` não quebra o teste?',
        options: [
          { id: 'a', text: 'Porque a comparação padrão apara os espaços do fim de cada linha.', correct: true },
          { id: 'b', text: 'Porque o C# remove espaços duplicados automaticamente.' },
          { id: 'c', text: 'Porque `Console.WriteLine` corta o último caractere.' },
          { id: 'd', text: 'Ele quebra: é preciso montar a lista sem o espaço final.' },
        ],
        explanation:
          'O modo de comparação padrão normaliza o fim de cada linha antes de comparar. Espaço à direita é invisível e nunca é o assunto de um exercício.',
      },
      {
        id: 's02c02l10q3',
        type: 'multiple',
        prompt: 'Quais destes laços dão zero voltas quando `n` é 0?',
        options: [
          { id: 'a', code: 'for (int i = 1; i <= n; i++)', correct: true },
          { id: 'b', code: 'for (int i = n; i >= 1; i--)', correct: true },
          { id: 'c', code: 'for (int i = 1; i <= n; i += 2)', correct: true },
          { id: 'd', code: 'for (int i = 0; i <= n; i++)' },
        ],
        explanation:
          'Os três primeiros começam em 1 ou em `n` e já falham no primeiro teste. O último começa em 0 e a condição `0 <= 0` é verdadeira, então ele dá uma volta — a diferença entre `1` e `0` no início muda o caso vazio.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` entre 0 e 20 e monte um painel com seis linhas sobre essa faixa: os números em ordem crescente, em ordem decrescente, apenas os ímpares, a soma de 1 a `n`, o fatorial de `n`, e os `n` primeiros termos de Fibonacci.',
      requirements: [
        'Linha 1: `Crescente: 1 2 3 4 5 6`',
        'Linha 2: `Decrescente: 6 5 4 3 2 1`',
        'Linha 3: `Impares: 1 3 5`',
        'Linha 4: `Soma: 21`',
        'Linha 5: `Fatorial: 720`',
        'Linha 6: `Fibonacci: 0 1 1 2 3 5`, começando em `F0 = 0`',
        'Com `n` igual a 0 as três listas saem vazias, a soma é `0` e o fatorial é `1`',
        'O fatorial usa `long`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        // Um laco para cada linha do painel

        string crescente = "";
        string decrescente = "";
        string impares = "";
        int soma = 0;
        long fatorial = 1;
        string fibonacci = "";

        Console.WriteLine($"Crescente: {crescente}");
        Console.WriteLine($"Decrescente: {decrescente}");
        Console.WriteLine($"Impares: {impares}");
        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Fatorial: {fatorial}");
        Console.WriteLine($"Fibonacci: {fibonacci}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        string crescente = "";
        string decrescente = "";
        string impares = "";
        int soma = 0;
        long fatorial = 1;
        string fibonacci = "";

        for (int i = 1; i <= n; i++)
        {
            crescente += $"{i} ";
        }

        for (int i = n; i >= 1; i--)
        {
            decrescente += $"{i} ";
        }

        for (int i = 1; i <= n; i += 2)
        {
            impares += $"{i} ";
        }

        for (int i = 1; i <= n; i++)
        {
            soma += i;
        }

        for (int i = 1; i <= n; i++)
        {
            fatorial *= i;
        }

        long anterior = 0;
        long atual = 1;

        for (int i = 0; i < n; i++)
        {
            fibonacci += $"{anterior} ";

            long proximo = anterior + atual;
            anterior = atual;
            atual = proximo;
        }

        Console.WriteLine($"Crescente: {crescente}");
        Console.WriteLine($"Decrescente: {decrescente}");
        Console.WriteLine($"Impares: {impares}");
        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Fatorial: {fatorial}");
        Console.WriteLine($"Fibonacci: {fibonacci}");
    }
}
`,
      hints: [
        'Escreva um laço de cada vez e rode os testes. Seis laços de uma vez transformam qualquer erro num mistério.',
        'O laço dos ímpares começa em 1 e usa `i += 2`. O de Fibonacci vai de `0` até `n - 1` porque conta termos, não valores da faixa.',
      ],
      tests: [
        {
          name: 'Painel de 6',
          stdin: '6\n',
          expectedStdout:
            'Crescente: 1 2 3 4 5 6\nDecrescente: 6 5 4 3 2 1\nImpares: 1 3 5\nSoma: 21\nFatorial: 720\nFibonacci: 0 1 1 2 3 5',
        },
        {
          name: 'Painel de 1',
          stdin: '1\n',
          expectedStdout:
            'Crescente: 1\nDecrescente: 1\nImpares: 1\nSoma: 1\nFatorial: 1\nFibonacci: 0',
        },
        {
          name: 'Painel de 9',
          stdin: '9\n',
          expectedStdout:
            'Crescente: 1 2 3 4 5 6 7 8 9\nDecrescente: 9 8 7 6 5 4 3 2 1\nImpares: 1 3 5 7 9\nSoma: 45\nFatorial: 362880\nFibonacci: 0 1 1 2 3 5 8 13 21',
        },
        {
          name: 'Painel vazio: só os valores iniciais',
          stdin: '0\n',
          expectedStdout:
            'Crescente:\nDecrescente:\nImpares:\nSoma: 0\nFatorial: 1\nFibonacci:',
          hidden: true,
        },
      ],
    },
  },
]
