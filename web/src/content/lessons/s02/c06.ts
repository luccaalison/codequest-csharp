import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's02c06l01',
    title: 'Soma e média',
    objective: 'Calcular a média de uma sequência sem cair na divisão inteira, e tratar o caso de nenhum dado.',
    concept: [
      {
        kind: 'text',
        body:
          'A média é a primeira estatística e a que mais gera bug, por um motivo bobo: em C#, dividir dois `int` devolve um `int`, e a parte fracionária é jogada fora sem aviso.',
      },
      {
        kind: 'compare',
        good: `double media = (double)soma / n;
// 105 / 4  ->  26.25`,
        bad: `double media = soma / n;
// 105 / 4  ->  26.0`,
        goodLabel: 'Divisão real',
        badLabel: 'Divisão inteira disfarçada',
      },
      {
        kind: 'text',
        body:
          'O `double` da variável de destino não salva nada: a divisão já aconteceu entre dois `int`, e o resultado truncado é que foi convertido. É preciso que **pelo menos um dos operandos** seja real antes da divisão.',
      },
      {
        kind: 'table',
        headers: ['Expressão', 'Resultado', 'Por quê'],
        rows: [
          ['`105 / 4`', '`26`', 'os dois são `int`'],
          ['`(double)105 / 4`', '`26.25`', 'o cast vem antes da divisão'],
          ['`105 / 4.0`', '`26.25`', 'o literal já é `double`'],
          ['`(double)(105 / 4)`', '`26.0`', 'o cast chegou tarde'],
        ],
      },
      {
        kind: 'code',
        code: `int soma = 0;

for (int i = 0; i < n; i++)
{
    soma += int.Parse(Console.ReadLine());
}

double media = n > 0 ? (double)soma / n : 0.0;

Console.WriteLine($"Soma: {soma}");
Console.WriteLine($"Media: {media:F2}");`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Sem dados, a média é uma divisão por zero. Com `int` isso lança exceção; com `double` produz `NaN`, que imprime como texto e estraga a saída em silêncio. A guarda `n > 0` não é preciosismo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A soma continua sendo `int` porque somar inteiros dá um inteiro exato. Só a divisão precisa de `double`. Manter cada valor no tipo mais preciso possível até o último momento evita erro acumulado.',
      },
    ],
    quiz: [
      {
        id: 's02c06l01q1',
        type: 'single',
        prompt: 'Quanto vale `double m = 7 / 2;`?',
        options: [
          { id: 'a', code: '3.0', correct: true },
          { id: 'b', code: '3.5' },
          { id: 'c', code: '4.0' },
          { id: 'd', text: 'Erro de compilação.' },
        ],
        explanation:
          'A divisão entre dois `int` produz `3`, e só então esse 3 é convertido para `double`. O tipo da variável não influencia como a expressão é avaliada.',
      },
      {
        id: 's02c06l01q2',
        type: 'multiple',
        prompt: 'Quais expressões produzem `3.5` a partir de `7` e `2`?',
        options: [
          { id: 'a', code: '(double)7 / 2', correct: true },
          { id: 'b', code: '7 / 2.0', correct: true },
          { id: 'c', code: '(double)(7 / 2)' },
          { id: 'd', code: '7.0 / 2', correct: true },
        ],
        explanation:
          'Basta um operando real antes da divisão. A opção com o cast por fora converte um resultado que já tinha sido truncado.',
      },
      {
        id: 's02c06l01q3',
        type: 'single',
        prompt: 'O que acontece ao dividir um `double` por zero?',
        options: [
          { id: 'a', text: 'O resultado é `NaN` ou infinito, sem exceção nenhuma.', correct: true },
          { id: 'b', text: 'Lança `DivideByZeroException`.' },
          { id: 'c', text: 'O resultado é `0.0`.' },
          { id: 'd', text: 'O programa trava.' },
        ],
        explanation:
          '`0.0 / 0.0` dá `NaN` e `1.0 / 0.0` dá infinito. Nenhum dos dois lança erro, então o valor absurdo se propaga pelo resto do cálculo — o que costuma ser pior que uma exceção.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` valores inteiros. Informe a soma e a média deles, com a média em duas casas decimais.',
      requirements: [
        'Linha 1: `Soma: X`',
        'Linha 2: `Media: Y`, com exatamente duas casas decimais',
        'Valores negativos são válidos',
        'Se `n` for 0, a soma é `0` e a média é `0.00`',
        'Use `(double)` antes da divisão, não depois',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int soma = 0;

        // Acumule os n valores

        double media = 0.0;

        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Media: {media:F2}");
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

        for (int i = 0; i < n; i++)
        {
            soma += int.Parse(Console.ReadLine());
        }

        double media = n > 0 ? (double)soma / n : 0.0;

        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Media: {media:F2}");
    }
}
`,
      hints: [
        'A soma pode continuar sendo `int`. Só a divisão precisa virar real.',
        'Um ternário resolve o caso sem dados: `n > 0 ? (double)soma / n : 0.0`.',
      ],
      tests: [
        {
          name: 'Média exata',
          stdin: '4\n10\n20\n30\n45\n',
          expectedStdout: 'Soma: 105\nMedia: 26.25',
        },
        {
          name: 'Média com dízima',
          stdin: '3\n1\n2\n2\n',
          expectedStdout: 'Soma: 5\nMedia: 1.67',
        },
        {
          name: 'Valores negativos',
          stdin: '2\n-8\n-2\n',
          expectedStdout: 'Soma: -10\nMedia: -5.00',
        },
        {
          name: 'Nenhum valor: sem divisão por zero',
          stdin: '0\n',
          expectedStdout: 'Soma: 0\nMedia: 0.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c06l02',
    title: 'Encontrando o máximo',
    objective: 'Rastrear o maior valor de uma sequência escolhendo um valor inicial que funcione com dados negativos.',
    concept: [
      {
        kind: 'text',
        body:
          'Encontrar o máximo parece trivial até você inicializar a variável com zero. Se todos os dados forem negativos, o programa responde `0` — um valor que nunca apareceu na entrada.',
      },
      {
        kind: 'compare',
        good: `int maior = primeiro;   // o primeiro valor lido

// nas voltas seguintes:
if (valor > maior) maior = valor;`,
        bad: `int maior = 0;

// com dados -5, -2, -8
// resposta: 0, que nao existe`,
        goodLabel: 'Começa com um dado real',
        badLabel: 'Inventa um valor',
      },
      {
        kind: 'text',
        body:
          'Existem duas inicializações corretas. A primeira é usar o **primeiro valor lido** como ponto de partida. A segunda é usar `int.MinValue`, o menor inteiro possível, que perde para qualquer dado.',
      },
      {
        kind: 'code',
        code: `int maior = int.MinValue;   // perde de qualquer valor real
int posicao = 0;

for (int i = 1; i <= n; i++)
{
    int valor = int.Parse(Console.ReadLine());

    if (valor > maior)     // '>' guarda a PRIMEIRA ocorrencia
    {
        maior = valor;
        posicao = i;
    }
}`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Trocar `>` por `>=` muda a resposta em caso de empate: com `>` a posição registrada é a da **primeira** ocorrência do máximo, com `>=` é a da última. Nenhuma das duas é errada, mas o enunciado precisa dizer qual.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'É a mesma assimetria da busca com `break` e da primeira ocorrência em uma string. Sempre que uma comparação decide entre manter e substituir, o operador de igualdade é quem escolhe entre o primeiro e o último.',
      },
      {
        kind: 'text',
        body:
          'Com nenhum dado, não existe máximo, e `int.MinValue` acabaria sendo impresso. Por isso este exercício exige pelo menos um valor — uma restrição honesta, e não um caso a ser inventado.',
      },
    ],
    quiz: [
      {
        id: 's02c06l02q1',
        type: 'single',
        prompt: 'Um programa inicializa `maior = 0` e lê os valores -5, -2 e -8. O que ele imprime?',
        options: [
          { id: 'a', code: '0', correct: true },
          { id: 'b', code: '-2' },
          { id: 'c', code: '-8' },
          { id: 'd', text: 'Lança exceção.' },
        ],
        explanation:
          'Nenhum valor supera 0, então a variável nunca é atualizada. A resposta correta seria `-2`, o maior dos três.',
      },
      {
        id: 's02c06l02q2',
        type: 'single',
        prompt: 'Com os valores 3, 9, 2, 9 e a condição `valor > maior`, qual posição é registrada?',
        options: [
          { id: 'a', text: 'A segunda: a primeira ocorrência do 9.', correct: true },
          { id: 'b', text: 'A quarta: a última ocorrência do 9.' },
          { id: 'c', text: 'As duas.' },
          { id: 'd', text: 'A primeira, sempre.' },
        ],
        explanation:
          'Na quarta volta, `9 > 9` é falso e nada é atualizado. Com `>=` a posição seria substituída e a resposta viraria 4.',
      },
      {
        id: 's02c06l02q3',
        type: 'multiple',
        prompt: 'Quais inicializações funcionam para encontrar o máximo de qualquer sequência não vazia?',
        options: [
          { id: 'a', code: 'int maior = int.MinValue;', correct: true },
          { id: 'b', text: 'O primeiro valor lido.', correct: true },
          { id: 'c', code: 'int maior = 0;' },
          { id: 'd', code: 'int maior = -1;' },
        ],
        explanation:
          'Qualquer valor fixo diferente de `int.MinValue` pode ser maior que todos os dados reais. Só o mínimo do tipo e o próprio primeiro dado são seguros.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e depois `n` valores. Informe o maior valor e em que posição ele aparece pela primeira vez, contando de 1.',
      requirements: [
        'Linha 1: `Maior: X`',
        'Linha 2: `Posicao: p`, contando de 1',
        'Em caso de empate, vale a **primeira** posição',
        'Valores negativos são válidos, e uma sequência pode ser inteiramente negativa',
        'Não inicialize o máximo com zero',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int maior = int.MinValue;
        int posicao = 0;

        // Percorra e atualize so quando encontrar algo estritamente maior

        Console.WriteLine($"Maior: {maior}");
        Console.WriteLine($"Posicao: {posicao}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int maior = int.MinValue;
        int posicao = 0;

        for (int i = 1; i <= n; i++)
        {
            int valor = int.Parse(Console.ReadLine());

            if (valor > maior)
            {
                maior = valor;
                posicao = i;
            }
        }

        Console.WriteLine($"Maior: {maior}");
        Console.WriteLine($"Posicao: {posicao}");
    }
}
`,
      hints: [
        'Comece o contador do `for` em 1, para que `i` já seja a posição a registrar.',
        'A comparação é `>` e não `>=`: assim o empate não desloca a posição para a última ocorrência.',
      ],
      tests: [
        {
          name: 'Empate: vale a primeira posição',
          stdin: '5\n3\n9\n2\n9\n1\n',
          expectedStdout: 'Maior: 9\nPosicao: 2',
        },
        {
          name: 'Todos negativos',
          stdin: '3\n-5\n-2\n-8\n',
          expectedStdout: 'Maior: -2\nPosicao: 2',
        },
        {
          name: 'Máximo na última posição',
          stdin: '4\n1\n2\n3\n4\n',
          expectedStdout: 'Maior: 4\nPosicao: 4',
        },
        {
          name: 'Um valor só',
          stdin: '1\n7\n',
          expectedStdout: 'Maior: 7\nPosicao: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c06l03',
    title: 'Encontrando o mínimo',
    objective: 'Rastrear o menor valor e registrar simultaneamente a primeira e a última posição em que ele aparece.',
    concept: [
      {
        kind: 'text',
        body:
          'O mínimo é o máximo com os sinais invertidos: inicialize com `int.MaxValue` e compare com `<`. A novidade desta lição é registrar as **duas** pontas de um empate ao mesmo tempo.',
      },
      {
        kind: 'code',
        code: `int menor = int.MaxValue;
int primeira = 0;
int ultima = 0;

for (int i = 1; i <= n; i++)
{
    int valor = int.Parse(Console.ReadLine());

    if (valor < menor)          // achou um novo minimo
    {
        menor = valor;
        primeira = i;
        ultima = i;
    }
    else if (valor == menor)    // empatou com o minimo atual
    {
        ultima = i;
    }
}`,
      },
      {
        kind: 'text',
        body:
          'A lógica tem dois ramos porque um novo mínimo **reinicia** as duas posições, enquanto um empate só estende a última. Tratar os dois casos como um só, com `<=`, perderia a primeira posição.',
      },
      {
        kind: 'table',
        headers: ['Valor lido', 'Comparação', 'Efeito'],
        rows: [
          ['menor que o atual', '`<`', 'novo mínimo, reinicia as duas posições'],
          ['igual ao atual', '`==`', 'estende só a última'],
          ['maior que o atual', '—', 'nenhum'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Ao encontrar um mínimo novo, é obrigatório reiniciar **também** a última posição. Esquecer essa linha deixa `ultima` apontando para um empate do mínimo antigo, que já nem é mais o mínimo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '`int.MaxValue` e `int.MinValue` são constantes do próprio tipo. Elas existem exatamente para este padrão, e usá-las é mais claro do que escrever `2147483647` à mão — número que, além de ilegível, é fácil de errar por um dígito.',
      },
    ],
    quiz: [
      {
        id: 's02c06l03q1',
        type: 'single',
        prompt: 'Com que valor inicializar uma variável que vai guardar o mínimo?',
        options: [
          { id: 'a', code: 'int.MaxValue', correct: true },
          { id: 'b', code: 'int.MinValue' },
          { id: 'c', code: '0' },
          { id: 'd', code: '-1' },
        ],
        explanation:
          'O ponto de partida precisa perder para qualquer dado real. Para o mínimo isso significa começar no maior valor possível — exatamente o oposto do máximo.',
      },
      {
        id: 's02c06l03q2',
        type: 'single',
        prompt: 'Nos valores 4, 1, 7, 1, 9, qual é a primeira e qual é a última posição do mínimo?',
        options: [
          { id: 'a', text: 'Primeira 2, última 4.', correct: true },
          { id: 'b', text: 'Primeira 2, última 2.' },
          { id: 'c', text: 'Primeira 1, última 5.' },
          { id: 'd', text: 'Primeira 4, última 2.' },
        ],
        explanation:
          'O mínimo é 1, que aparece nas posições 2 e 4. O ramo `<` registra a posição 2 e o ramo `==` estende para a 4.',
      },
      {
        id: 's02c06l03q3',
        type: 'single',
        prompt: 'O que acontece se, ao achar um mínimo novo, só `primeira` for atualizada?',
        options: [
          { id: 'a', text: '`ultima` continua apontando para uma posição do mínimo anterior.', correct: true },
          { id: 'b', text: 'Nada: `ultima` é corrigida no fim.' },
          { id: 'c', text: 'O programa lança exceção.' },
          { id: 'd', text: '`primeira` e `ultima` ficam sempre iguais.' },
        ],
        explanation:
          'Com os valores 5, 5, 2, a última ficaria em 2 — posição de um cinco — enquanto o mínimo passou a ser o 2 da posição 3. Um mínimo novo invalida toda a informação anterior.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e depois `n` valores. Informe o menor valor e as posições da primeira e da última vez em que ele aparece, contando de 1.',
      requirements: [
        'Linha 1: `Menor: X`',
        'Linha 2: `Primeira: p`',
        'Linha 3: `Ultima: u`',
        'Sem empates, `p` e `u` são iguais',
        'Um mínimo novo reinicia as duas posições',
        'Valores negativos são válidos',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int menor = int.MaxValue;
        int primeira = 0;
        int ultima = 0;

        // Dois ramos: minimo novo reinicia, empate estende

        Console.WriteLine($"Menor: {menor}");
        Console.WriteLine($"Primeira: {primeira}");
        Console.WriteLine($"Ultima: {ultima}");
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
        int primeira = 0;
        int ultima = 0;

        for (int i = 1; i <= n; i++)
        {
            int valor = int.Parse(Console.ReadLine());

            if (valor < menor)
            {
                menor = valor;
                primeira = i;
                ultima = i;
            }
            else if (valor == menor)
            {
                ultima = i;
            }
        }

        Console.WriteLine($"Menor: {menor}");
        Console.WriteLine($"Primeira: {primeira}");
        Console.WriteLine($"Ultima: {ultima}");
    }
}
`,
      hints: [
        'São dois ramos: `if (valor < menor)` para um mínimo novo e `else if (valor == menor)` para o empate.',
        'No ramo do mínimo novo, as **duas** posições recebem `i`.',
      ],
      tests: [
        {
          name: 'Mínimo repetido',
          stdin: '5\n4\n1\n7\n1\n9\n',
          expectedStdout: 'Menor: 1\nPrimeira: 2\nUltima: 4',
        },
        {
          name: 'Todos iguais',
          stdin: '3\n5\n5\n5\n',
          expectedStdout: 'Menor: 5\nPrimeira: 1\nUltima: 3',
        },
        {
          name: 'Mínimo novo reinicia as posições',
          stdin: '3\n5\n5\n2\n',
          expectedStdout: 'Menor: 2\nPrimeira: 3\nUltima: 3',
        },
        {
          name: 'Um valor negativo só',
          stdin: '1\n-3\n',
          expectedStdout: 'Menor: -3\nPrimeira: 1\nUltima: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c06l04',
    title: 'Contagem condicional',
    objective: 'Classificar cada valor em uma de três faixas e converter as contagens em percentual.',
    concept: [
      {
        kind: 'text',
        body:
          'Contar quantos valores caem em cada faixa é a estatística mais usada em relatório. A estrutura é um `if / else if / else` com três contadores, e a regra de ouro é que os três casos precisam ser **mutuamente exclusivos e cobrir tudo**.',
      },
      {
        kind: 'code',
        code: `if (valor > limite)       acima++;
else if (valor < limite)  abaixo++;
else                      iguais++;`,
        caption: 'Todo valor cai em exatamente um dos três ramos, sem sobra e sem sobreposição.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma verificação barata que pega quase todo erro de classificação: a soma dos contadores tem que dar exatamente o total de valores lidos. Se não der, ou um caso ficou de fora ou algum valor foi contado duas vezes.',
      },
      {
        kind: 'text',
        body:
          'Transformar contagem em percentual traz de volta a armadilha da divisão inteira, agora com um multiplicador. A ordem importa: dividir dois `int` e depois multiplicar por 100 produz sempre 0 ou 100.',
      },
      {
        kind: 'compare',
        good: `double p = (double)acima / n * 100;
// 2 de 6  ->  33.333`,
        bad: `double p = acima / n * 100;
// 2 de 6  ->  0`,
        goodLabel: '33.3%',
        badLabel: '0%',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Usar `>=` no primeiro ramo faz o valor igual ao limite ser contado como "acima", e o ramo dos iguais nunca é alcançado. Quando o enunciado distingue os três casos, o primeiro teste precisa ser estrito.',
      },
      {
        kind: 'table',
        headers: ['`valor`', '`limite`', 'Ramo'],
        rows: [
          ['`70`', '`50`', 'acima'],
          ['`50`', '`50`', 'iguais'],
          ['`30`', '`50`', 'abaixo'],
        ],
      },
    ],
    quiz: [
      {
        id: 's02c06l04q1',
        type: 'single',
        prompt: 'O que acontece se o primeiro ramo usar `valor >= limite`?',
        options: [
          { id: 'a', text: 'O contador de iguais fica sempre em zero.', correct: true },
          { id: 'b', text: 'O contador de abaixo fica sempre em zero.' },
          { id: 'c', text: 'Nada muda.' },
          { id: 'd', text: 'O programa não compila.' },
        ],
        explanation:
          'O `>=` absorve o caso de igualdade, e o `else` que trataria os iguais nunca é alcançado. É a mesma questão de ordem e especificidade da régua numerada.',
      },
      {
        id: 's02c06l04q2',
        type: 'single',
        prompt: 'Quanto vale `acima / n * 100` com `acima = 2` e `n = 6`, ambos `int`?',
        options: [
          { id: 'a', code: '0', correct: true },
          { id: 'b', code: '33' },
          { id: 'c', code: '33.33' },
          { id: 'd', code: '200' },
        ],
        explanation:
          '`2 / 6` entre inteiros dá 0, e `0 * 100` continua 0. O cast precisa vir antes da divisão, não depois.',
      },
      {
        id: 's02c06l04q3',
        type: 'single',
        prompt: 'Qual verificação rápida detecta um erro na classificação em três faixas?',
        options: [
          { id: 'a', text: 'A soma dos três contadores tem que ser igual ao total de valores.', correct: true },
          { id: 'b', text: 'O contador de iguais tem que ser o menor dos três.' },
          { id: 'c', text: 'A soma dos percentuais tem que ser exatamente 100,00.' },
          { id: 'd', text: 'O contador de acima tem que ser maior que zero.' },
        ],
        explanation:
          'É a única invariante que sempre vale. A soma dos percentuais pode não fechar em 100 por arredondamento, e nenhum contador tem obrigação de ser maior que outro.',
      },
    ],
    challenge: {
      brief:
        'Leia um `limite`, um inteiro `n`, e depois `n` valores. Classifique cada valor como abaixo, igual ou acima do limite, e informe as três contagens mais o percentual de valores acima.',
      requirements: [
        'Linha 1: `Abaixo: a`',
        'Linha 2: `Iguais: i`',
        'Linha 3: `Acima: c`',
        'Linha 4: `Percentual acima: p`, com uma casa decimal',
        'Um valor igual ao limite não conta como acima nem como abaixo',
        'Se `n` for 0, as três contagens são `0` e o percentual é `0.0`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int limite = int.Parse(Console.ReadLine());
        int n = int.Parse(Console.ReadLine());

        int abaixo = 0;
        int iguais = 0;
        int acima = 0;

        // Tres ramos mutuamente exclusivos

        double percentual = 0.0;

        Console.WriteLine($"Abaixo: {abaixo}");
        Console.WriteLine($"Iguais: {iguais}");
        Console.WriteLine($"Acima: {acima}");
        Console.WriteLine($"Percentual acima: {percentual:F1}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int limite = int.Parse(Console.ReadLine());
        int n = int.Parse(Console.ReadLine());

        int abaixo = 0;
        int iguais = 0;
        int acima = 0;

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());

            if (valor > limite)
            {
                acima++;
            }
            else if (valor < limite)
            {
                abaixo++;
            }
            else
            {
                iguais++;
            }
        }

        double percentual = n > 0 ? (double)acima / n * 100 : 0.0;

        Console.WriteLine($"Abaixo: {abaixo}");
        Console.WriteLine($"Iguais: {iguais}");
        Console.WriteLine($"Acima: {acima}");
        Console.WriteLine($"Percentual acima: {percentual:F1}");
    }
}
`,
      hints: [
        'Os dois primeiros ramos usam comparações estritas; o `else` fica com os iguais.',
        'O percentual é `(double)acima / n * 100`, com o cast antes da divisão e a guarda para `n` igual a 0.',
      ],
      tests: [
        {
          name: 'Distribuição equilibrada',
          stdin: '50\n6\n30\n50\n70\n50\n20\n90\n',
          expectedStdout: 'Abaixo: 2\nIguais: 2\nAcima: 2\nPercentual acima: 33.3',
        },
        {
          name: 'Metade acima',
          stdin: '50\n4\n60\n70\n10\n20\n',
          expectedStdout: 'Abaixo: 2\nIguais: 0\nAcima: 2\nPercentual acima: 50.0',
        },
        {
          name: 'Limite zero com negativos',
          stdin: '0\n3\n-1\n0\n1\n',
          expectedStdout: 'Abaixo: 1\nIguais: 1\nAcima: 1\nPercentual acima: 33.3',
        },
        {
          name: 'Nenhum valor',
          stdin: '10\n0\n',
          expectedStdout: 'Abaixo: 0\nIguais: 0\nAcima: 0\nPercentual acima: 0.0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c06l05',
    title: 'Média ponderada',
    objective: 'Acumular numerador e denominador separadamente para calcular uma média em que cada valor tem peso próprio.',
    concept: [
      {
        kind: 'text',
        body:
          'Na média simples todo valor conta igual. Na **ponderada**, cada valor traz um peso, e o cálculo precisa de dois acumuladores em vez de um.',
      },
      {
        kind: 'code',
        code: `int numerador = 0;     // soma de valor * peso
int denominador = 0;   // soma dos pesos

for (int i = 0; i < n; i++)
{
    int valor = int.Parse(Console.ReadLine());
    int peso = int.Parse(Console.ReadLine());

    numerador += valor * peso;
    denominador += peso;
}

double media = denominador > 0
    ? (double)numerador / denominador
    : 0.0;`,
      },
      {
        kind: 'text',
        body:
          'O denominador é a soma dos **pesos**, não a quantidade de valores. Essa é a diferença conceitual inteira: três notas com pesos 2, 3 e 5 são divididas por 10, não por 3.',
      },
      {
        kind: 'table',
        headers: ['Valor', 'Peso', 'Produto'],
        rows: [
          ['`8`', '`2`', '`16`'],
          ['`6`', '`3`', '`18`'],
          ['`9`', '`5`', '`45`'],
          ['**soma**', '`10`', '`79`'],
        ],
      },
      {
        kind: 'output',
        code: `Media ponderada: 7.90
Media simples:   7.67`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Dividir pela quantidade de itens em vez da soma dos pesos é o erro clássico, e ele passa despercebido quando todos os pesos valem 1 — que é justamente o caso mais provável de aparecer no primeiro teste.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um peso zero remove o valor do cálculo sem removê-lo dos dados: ele contribui `0` ao numerador e `0` ao denominador. É assim que sistemas de notas descartam uma avaliação sem apagar o registro.',
      },
    ],
    quiz: [
      {
        id: 's02c06l05q1',
        type: 'single',
        prompt: 'Notas 8, 6 e 9 com pesos 2, 3 e 5. Qual é a média ponderada?',
        options: [
          { id: 'a', code: '7.90', correct: true },
          { id: 'b', code: '7.67' },
          { id: 'c', code: '26.33' },
          { id: 'd', code: '23.00' },
        ],
        explanation:
          'O numerador é `16 + 18 + 45 = 79` e o denominador é `2 + 3 + 5 = 10`. A alternativa `7.67` é a média simples, que ignora os pesos.',
      },
      {
        id: 's02c06l05q2',
        type: 'single',
        prompt: 'Pelo que o numerador deve ser dividido?',
        options: [
          { id: 'a', text: 'Pela soma dos pesos.', correct: true },
          { id: 'b', text: 'Pela quantidade de valores.' },
          { id: 'c', text: 'Pelo maior peso.' },
          { id: 'd', text: 'Pela média dos pesos.' },
        ],
        explanation:
          'Dividir pela quantidade dá o mesmo resultado apenas quando todos os pesos valem 1 — a coincidência que esconde o bug.',
      },
      {
        id: 's02c06l05q3',
        type: 'single',
        prompt: 'Qual é o efeito de um peso igual a zero?',
        options: [
          { id: 'a', text: 'O valor é excluído do cálculo sem afetar os demais.', correct: true },
          { id: 'b', text: 'O cálculo inteiro vira zero.' },
          { id: 'c', text: 'O programa lança exceção.' },
          { id: 'd', text: 'O valor passa a contar em dobro.' },
        ],
        explanation:
          'Ele soma `0` ao numerador e `0` ao denominador, então a fração resultante é a mesma que existiria sem ele. É o comportamento desejado para uma avaliação descartada.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` pares de linhas, cada par com um valor e um peso, ambos inteiros e não negativos. Informe a soma dos pesos, a média ponderada e a média simples, as duas com duas casas decimais.',
      requirements: [
        'Linha 1: `Soma dos pesos: s`',
        'Linha 2: `Media ponderada: p`, com duas casas',
        'Linha 3: `Media simples: m`, com duas casas',
        'A média ponderada divide pela soma dos pesos; a simples divide pela quantidade de valores',
        'Se a soma dos pesos for 0, a média ponderada é `0.00`',
        'Se `n` for 0, as duas médias são `0.00`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int numerador = 0;
        int somaPesos = 0;
        int somaValores = 0;

        // Cada item ocupa duas linhas: valor, depois peso

        double ponderada = 0.0;
        double simples = 0.0;

        Console.WriteLine($"Soma dos pesos: {somaPesos}");
        Console.WriteLine($"Media ponderada: {ponderada:F2}");
        Console.WriteLine($"Media simples: {simples:F2}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int numerador = 0;
        int somaPesos = 0;
        int somaValores = 0;

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());
            int peso = int.Parse(Console.ReadLine());

            numerador += valor * peso;
            somaPesos += peso;
            somaValores += valor;
        }

        double ponderada = somaPesos > 0 ? (double)numerador / somaPesos : 0.0;
        double simples = n > 0 ? (double)somaValores / n : 0.0;

        Console.WriteLine($"Soma dos pesos: {somaPesos}");
        Console.WriteLine($"Media ponderada: {ponderada:F2}");
        Console.WriteLine($"Media simples: {simples:F2}");
    }
}
`,
      hints: [
        'São três acumuladores: `valor * peso`, a soma dos pesos, e a soma dos valores puros.',
        'As duas médias têm denominadores diferentes: a soma dos pesos e o `n`.',
      ],
      tests: [
        {
          name: 'Pesos diferentes',
          stdin: '3\n8\n2\n6\n3\n9\n5\n',
          expectedStdout: 'Soma dos pesos: 10\nMedia ponderada: 7.90\nMedia simples: 7.67',
        },
        {
          name: 'Peso zero descarta o valor',
          stdin: '2\n10\n0\n5\n1\n',
          expectedStdout: 'Soma dos pesos: 1\nMedia ponderada: 5.00\nMedia simples: 7.50',
        },
        {
          name: 'Todos os pesos iguais a 1',
          stdin: '2\n4\n1\n6\n1\n',
          expectedStdout: 'Soma dos pesos: 2\nMedia ponderada: 5.00\nMedia simples: 5.00',
        },
        {
          name: 'Todos os pesos zerados',
          stdin: '2\n7\n0\n9\n0\n',
          expectedStdout: 'Soma dos pesos: 0\nMedia ponderada: 0.00\nMedia simples: 8.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c06l06',
    title: 'Detectando sequência crescente',
    objective: 'Comparar cada valor com o anterior, mantendo o estado de uma volta para a seguinte.',
    concept: [
      {
        kind: 'text',
        body:
          'Todas as estatísticas anteriores olhavam um valor de cada vez. Detectar se uma sequência é crescente exige comparar **pares consecutivos**, e para isso o laço precisa lembrar do valor da volta anterior.',
      },
      {
        kind: 'code',
        code: `int anterior = 0;
int quebras = 0;

for (int i = 1; i <= n; i++)
{
    int atual = int.Parse(Console.ReadLine());

    if (i > 1 && atual <= anterior)   // a 1a volta nao tem par
    {
        quebras++;
    }

    anterior = atual;                 // prepara a proxima comparacao
}`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A guarda `i > 1` é obrigatória. Na primeira volta não existe valor anterior, e comparar com o `0` da inicialização inventaria uma quebra que não existe — ou esconderia uma que existe, se o primeiro dado for negativo.',
      },
      {
        kind: 'text',
        body:
          'Com `n` valores há apenas `n - 1` pares consecutivos. Confundir a quantidade de valores com a quantidade de comparações é o erro de um a mais desta lição.',
      },
      {
        kind: 'table',
        headers: ['Condição', 'Significado', 'Sequência aceita'],
        rows: [
          ['`atual <= anterior`', 'quebra de crescimento estrito', '`1 3 7` sim, `1 3 3` não'],
          ['`atual < anterior`', 'quebra de não decrescimento', '`1 3 3` sim, `1 3 2` não'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma sequência de um único valor é crescente por vacuidade: não existe par que a viole. Vale a mesma lógica das flags de "todos são X" — sem contraexemplo, a afirmação é verdadeira.',
      },
      {
        kind: 'text',
        body:
          'A atualização `anterior = atual` fica na **última** linha do corpo, depois de todas as comparações. Antecipá-la faz o valor comparar consigo mesmo, e a resposta passa a ser sempre a mesma.',
      },
    ],
    quiz: [
      {
        id: 's02c06l06q1',
        type: 'single',
        prompt: 'A sequência `1 3 3 7 9` é estritamente crescente?',
        options: [
          { id: 'a', text: 'Não: o par `3 3` não cresce.', correct: true },
          { id: 'b', text: 'Sim: os valores nunca diminuem.' },
          { id: 'c', text: 'Sim: só o último par importa.' },
          { id: 'd', text: 'Depende do valor de `n`.' },
        ],
        explanation:
          'Estritamente crescente exige que cada valor seja **maior** que o anterior. Essa sequência é não decrescente, que é uma condição mais fraca.',
      },
      {
        id: 's02c06l06q2',
        type: 'single',
        prompt: 'Quantos pares consecutivos existem numa sequência de 6 valores?',
        options: [
          { id: 'a', code: '5', correct: true },
          { id: 'b', code: '6' },
          { id: 'c', code: '15' },
          { id: 'd', code: '7' },
        ],
        explanation:
          'Cada valor forma um par com o seguinte, exceto o último. São sempre `n - 1` comparações.',
      },
      {
        id: 's02c06l06q3',
        type: 'single',
        prompt: 'Por que `anterior = atual` deve ser a última linha do corpo?',
        options: [
          { id: 'a', text: 'Porque as comparações precisam do valor da volta anterior, não do atual.', correct: true },
          { id: 'b', text: 'Porque o C# exige atribuições no fim do bloco.' },
          { id: 'c', text: 'Para economizar uma variável.' },
          { id: 'd', text: 'A posição é indiferente.' },
        ],
        explanation:
          'Atualizar antes faria `atual <= anterior` comparar o valor consigo mesmo, resultando sempre em quebra. É a mesma regra de ordem que aparece em Fibonacci e no algoritmo de Euclides.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` valores. Informe se a sequência é estritamente crescente, se é não decrescente, e quantos pares consecutivos quebram o crescimento estrito.',
      requirements: [
        'Linha 1: `Crescente: True` ou `False`, exigindo que cada valor seja maior que o anterior',
        'Linha 2: `Nao decrescente: True` ou `False`, aceitando valores iguais',
        'Linha 3: `Quebras: k`, contando os pares em que o valor não aumentou',
        'Uma sequência de zero ou um valor é crescente e não decrescente',
        'Compare apenas pares consecutivos: são `n - 1` comparações',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int anterior = 0;
        int quebras = 0;
        int descidas = 0;

        // Compare com o anterior a partir da segunda volta

        Console.WriteLine($"Crescente: {quebras == 0}");
        Console.WriteLine($"Nao decrescente: {descidas == 0}");
        Console.WriteLine($"Quebras: {quebras}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int anterior = 0;
        int quebras = 0;
        int descidas = 0;

        for (int i = 1; i <= n; i++)
        {
            int atual = int.Parse(Console.ReadLine());

            if (i > 1)
            {
                if (atual <= anterior)
                {
                    quebras++;
                }

                if (atual < anterior)
                {
                    descidas++;
                }
            }

            anterior = atual;
        }

        Console.WriteLine($"Crescente: {quebras == 0}");
        Console.WriteLine($"Nao decrescente: {descidas == 0}");
        Console.WriteLine($"Quebras: {quebras}");
    }
}
`,
      hints: [
        'São dois contadores com condições diferentes: `<=` para o crescimento estrito e `<` para o não decrescimento.',
        'Tudo que compara fica dentro de `if (i > 1)`. Só o `anterior = atual` roda em toda volta.',
      ],
      tests: [
        {
          name: 'Empate quebra o crescimento estrito',
          stdin: '5\n1\n3\n3\n7\n9\n',
          expectedStdout: 'Crescente: False\nNao decrescente: True\nQuebras: 1',
        },
        {
          name: 'Estritamente crescente',
          stdin: '4\n2\n4\n6\n8\n',
          expectedStdout: 'Crescente: True\nNao decrescente: True\nQuebras: 0',
        },
        {
          name: 'Sobe e desce',
          stdin: '4\n5\n3\n4\n1\n',
          expectedStdout: 'Crescente: False\nNao decrescente: False\nQuebras: 2',
        },
        {
          name: 'Um valor só: crescente por vacuidade',
          stdin: '1\n9\n',
          expectedStdout: 'Crescente: True\nNao decrescente: True\nQuebras: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c06l07',
    title: 'Maior sequência repetida',
    objective: 'Rastrear o comprimento de uma repetição em andamento e compará-lo com o melhor resultado já visto.',
    concept: [
      {
        kind: 'text',
        body:
          'Encontrar a maior sequência de valores iguais consecutivos exige dois pares de variáveis: as do trecho **em andamento** e as do **melhor** trecho encontrado até agora. Confundir os dois é o erro central desta lição.',
      },
      {
        kind: 'table',
        headers: ['Variável', 'Papel'],
        rows: [
          ['`atualValor`', 'valor que está se repetindo agora'],
          ['`atualTam`', 'quantas vezes ele já apareceu seguido'],
          ['`melhorValor`', 'valor da maior repetição já vista'],
          ['`melhorTam`', 'comprimento dessa maior repetição'],
        ],
      },
      {
        kind: 'code',
        code: `if (i > 0 && valor == atualValor)
{
    atualTam++;                 // a sequencia continua
}
else
{
    atualValor = valor;         // comeca uma sequencia nova
    atualTam = 1;
}

if (atualTam > melhorTam)       // o campeao mudou?
{
    melhorTam = atualTam;
    melhorValor = atualValor;
}`,
      },
      {
        kind: 'text',
        body:
          'A comparação com o melhor acontece **a cada volta**, não no fim. Deixar para conferir só depois do laço perderia a última sequência, que nunca chega a ser "encerrada" por um valor diferente.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A comparação usa `>` e não `>=`. Com `>=`, um empate no comprimento faria a sequência mais recente substituir a anterior, e a resposta deixaria de ser a primeira maior repetição.',
      },
      {
        kind: 'output',
        code: `2 2 5 5 5 7 3 3
    ^^^^^
    maior: valor 5, comprimento 3`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Este é o algoritmo por trás da compressão RLE, usada em fax, em bitmaps simples e no formato de imagem do Windows. Trocar uma sequência de 200 pixels brancos por "200 brancos" é exatamente contar repetições.',
      },
    ],
    quiz: [
      {
        id: 's02c06l07q1',
        type: 'single',
        prompt: 'Qual é a maior sequência repetida em `2 2 5 5 5 7 3 3`?',
        options: [
          { id: 'a', text: 'O valor 5, com comprimento 3.', correct: true },
          { id: 'b', text: 'O valor 2, com comprimento 2.' },
          { id: 'c', text: 'O valor 3, com comprimento 2.' },
          { id: 'd', text: 'O valor 5, com comprimento 5.' },
        ],
        explanation:
          'As repetições são: 2 duas vezes, 5 três vezes, 7 uma vez, 3 duas vezes. A mais longa é a do 5.',
      },
      {
        id: 's02c06l07q2',
        type: 'single',
        prompt: 'Por que a comparação com o melhor precisa acontecer dentro do laço?',
        options: [
          { id: 'a', text: 'Porque a última sequência nunca é encerrada por um valor diferente.', correct: true },
          { id: 'b', text: 'Porque as variáveis do melhor são apagadas no fim do laço.' },
          { id: 'c', text: 'Por questão de desempenho.' },
          { id: 'd', text: 'Não precisa: conferir depois dá o mesmo resultado.' },
        ],
        explanation:
          'Se os dados terminam com a maior repetição, ela ficaria só nas variáveis do trecho em andamento. Comparar a cada volta cobre esse caso sem nenhum tratamento especial.',
      },
      {
        id: 's02c06l07q3',
        type: 'single',
        prompt: 'Com `1 1 2 2` e a comparação `>`, qual é a resposta?',
        options: [
          { id: 'a', text: 'Valor 1, comprimento 2.', correct: true },
          { id: 'b', text: 'Valor 2, comprimento 2.' },
          { id: 'c', text: 'Valor 1, comprimento 4.' },
          { id: 'd', text: 'Os dois empatam e o programa deve reportar erro.' },
        ],
        explanation:
          'Quando a sequência do 2 chega a comprimento 2, a comparação `2 > 2` é falsa e o campeão não muda. O `>` estrito é o que garante que o empate fica com o primeiro.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e depois `n` valores. Encontre a maior sequência de valores iguais consecutivos e informe qual valor é e qual o seu comprimento.',
      requirements: [
        'Linha 1: `Valor: v`',
        'Linha 2: `Comprimento: c`',
        'Em caso de empate no comprimento, vale a sequência que aparece primeiro',
        'Se todos os valores forem diferentes, a resposta é o primeiro valor com comprimento 1',
        'Compare com o melhor a cada volta, não só no fim do laço',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int atualValor = 0;
        int atualTam = 0;
        int melhorValor = 0;
        int melhorTam = 0;

        // Continue ou reinicie a sequencia, e compare com o melhor

        Console.WriteLine($"Valor: {melhorValor}");
        Console.WriteLine($"Comprimento: {melhorTam}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int atualValor = 0;
        int atualTam = 0;
        int melhorValor = 0;
        int melhorTam = 0;

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());

            if (i > 0 && valor == atualValor)
            {
                atualTam++;
            }
            else
            {
                atualValor = valor;
                atualTam = 1;
            }

            if (atualTam > melhorTam)
            {
                melhorTam = atualTam;
                melhorValor = atualValor;
            }
        }

        Console.WriteLine($"Valor: {melhorValor}");
        Console.WriteLine($"Comprimento: {melhorTam}");
    }
}
`,
      hints: [
        'A guarda `i > 0` impede que o primeiro valor seja comparado com a inicialização, que não é um dado real.',
        'A atualização do melhor fica fora do `if / else`, para rodar em toda volta.',
      ],
      tests: [
        {
          name: 'Repetição no meio',
          stdin: '8\n2\n2\n5\n5\n5\n7\n3\n3\n',
          expectedStdout: 'Valor: 5\nComprimento: 3',
        },
        {
          name: 'Todos diferentes',
          stdin: '4\n1\n2\n3\n4\n',
          expectedStdout: 'Valor: 1\nComprimento: 1',
        },
        {
          name: 'Todos iguais',
          stdin: '5\n4\n4\n4\n4\n4\n',
          expectedStdout: 'Valor: 4\nComprimento: 5',
        },
        {
          name: 'Empate: vale a primeira',
          stdin: '4\n1\n1\n2\n2\n',
          expectedStdout: 'Valor: 1\nComprimento: 2',
        },
        {
          name: 'Um valor só',
          stdin: '1\n9\n',
          expectedStdout: 'Valor: 9\nComprimento: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c06l08',
    title: 'Média móvel',
    objective: 'Manter uma janela deslizante de tamanho fixo usando apenas variáveis, sem guardar a sequência inteira.',
    concept: [
      {
        kind: 'text',
        body:
          'A média móvel suaviza uma série calculando a média dos últimos `k` valores a cada nova leitura. Ela é o que transforma um gráfico serrilhado de vendas diárias em uma tendência legível.',
      },
      {
        kind: 'text',
        body:
          'Para uma janela de 3, bastam duas variáveis de memória: o valor de duas voltas atrás e o da volta anterior. A cada leitura elas **deslizam**, e a mais antiga é descartada.',
      },
      {
        kind: 'code',
        code: `int anterior2 = 0;   // duas voltas atras
int anterior1 = 0;   // uma volta atras

for (int i = 1; i <= n; i++)
{
    int atual = int.Parse(Console.ReadLine());

    if (i >= 3)      // so a partir do 3o valor a janela esta cheia
    {
        double media = (anterior2 + anterior1 + atual) / 3.0;
        Console.WriteLine($"Posicao {i}: {media:F2}");
    }

    anterior2 = anterior1;   // desliza a janela
    anterior1 = atual;
}`,
      },
      {
        kind: 'table',
        headers: ['Leitura', 'Janela', 'Média'],
        rows: [
          ['`10`', 'incompleta', '—'],
          ['`20`', 'incompleta', '—'],
          ['`30`', '`10 20 30`', '`20.00`'],
          ['`40`', '`20 30 40`', '`30.00`'],
          ['`50`', '`30 40 50`', '`40.00`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O deslizamento vem **depois** do cálculo. Inverter as duas linhas do deslizamento também quebra tudo: `anterior1 = atual` antes de `anterior2 = anterior1` faria as duas variáveis guardarem o mesmo valor, o mesmo erro de Fibonacci.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma série de `n` valores produz `n - k + 1` janelas completas. Com `n` menor que `k` não sai nenhuma média, e isso está correto: não há dado suficiente para a primeira janela.',
      },
      {
        kind: 'text',
        body:
          'Uma janela de tamanho 3 cabe em duas variáveis, mas uma de tamanho 30 não caberia em 29. A solução geral exige guardar a sequência, e é isso que a próxima seção destrava com arrays e listas.',
      },
    ],
    quiz: [
      {
        id: 's02c06l08q1',
        type: 'single',
        prompt: 'Quantas médias móveis de janela 3 saem de uma série de 5 valores?',
        options: [
          { id: 'a', code: '3', correct: true },
          { id: 'b', code: '5' },
          { id: 'c', code: '2' },
          { id: 'd', code: '4' },
        ],
        explanation:
          '`n - k + 1` dá `5 - 3 + 1 = 3`. As duas primeiras leituras só alimentam a janela, sem produzir resultado.',
      },
      {
        id: 's02c06l08q2',
        type: 'single',
        prompt: 'Qual é a ordem correta do deslizamento da janela?',
        options: [
          { id: 'a', code: 'anterior2 = anterior1; anterior1 = atual;', correct: true },
          { id: 'b', code: 'anterior1 = atual; anterior2 = anterior1;' },
          { id: 'c', code: 'anterior2 = atual; anterior1 = anterior2;' },
          { id: 'd', text: 'A ordem é indiferente.' },
        ],
        explanation:
          'O valor mais antigo precisa ser salvo antes de a variável que o guarda ser sobrescrita. É a mesma regra de sempre calcular tudo dos valores antigos antes de atualizar qualquer um.',
      },
      {
        id: 's02c06l08q3',
        type: 'single',
        prompt: 'Por que uma janela de tamanho 30 não é resolvida assim?',
        options: [
          { id: 'a', text: 'Exigiria 29 variáveis nomeadas, o que é impraticável.', correct: true },
          { id: 'b', text: 'Porque `double` não tem precisão para 30 valores.' },
          { id: 'c', text: 'Porque o laço ficaria lento demais.' },
          { id: 'd', text: 'É resolvida assim: basta repetir o padrão.' },
        ],
        explanation:
          'A técnica funciona porque 2 variáveis ainda é gerenciável. A solução geral precisa de uma estrutura que guarde vários valores sob um único nome — exatamente o que arrays e listas oferecem.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` valores. A partir do terceiro valor, imprima a média dos últimos três lidos, com duas casas decimais. No fim, informe quantas janelas completas houve.',
      requirements: [
        'Cada média sai no formato `Posicao 3: 20.00`, com a posição do último valor da janela',
        'A primeira média só aparece na posição 3',
        'A última linha é `Janelas: k`',
        'Com `n` menor que 3 nenhuma média é impressa e `k` é `0`',
        'Use apenas variáveis para a janela; não guarde a série inteira',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int anterior2 = 0;
        int anterior1 = 0;
        int janelas = 0;

        // Calcule quando a janela estiver cheia, depois deslize

        Console.WriteLine($"Janelas: {janelas}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int anterior2 = 0;
        int anterior1 = 0;
        int janelas = 0;

        for (int i = 1; i <= n; i++)
        {
            int atual = int.Parse(Console.ReadLine());

            if (i >= 3)
            {
                double media = (anterior2 + anterior1 + atual) / 3.0;
                Console.WriteLine($"Posicao {i}: {media:F2}");
                janelas++;
            }

            anterior2 = anterior1;
            anterior1 = atual;
        }

        Console.WriteLine($"Janelas: {janelas}");
    }
}
`,
      hints: [
        'A condição `i >= 3` é o que espera a janela encher antes de produzir a primeira média.',
        'Divida por `3.0` e não por `3`, senão a média sai truncada.',
      ],
      tests: [
        {
          name: 'Série crescente',
          stdin: '5\n10\n20\n30\n40\n50\n',
          expectedStdout:
            'Posicao 3: 20.00\nPosicao 4: 30.00\nPosicao 5: 40.00\nJanelas: 3',
        },
        {
          name: 'Uma janela só, com dízima',
          stdin: '3\n1\n2\n4\n',
          expectedStdout: 'Posicao 3: 2.33\nJanelas: 1',
        },
        {
          name: 'Série com queda',
          stdin: '6\n3\n3\n3\n9\n0\n0\n',
          expectedStdout:
            'Posicao 3: 3.00\nPosicao 4: 5.00\nPosicao 5: 4.00\nPosicao 6: 3.00\nJanelas: 4',
        },
        {
          name: 'Série curta demais para uma janela',
          stdin: '2\n5\n6\n',
          expectedStdout: 'Janelas: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c06l09',
    title: 'Prática: painel de estatísticas',
    objective: 'Calcular seis estatísticas em uma única passada pelos dados, sem armazená-los.',
    concept: [
      {
        kind: 'text',
        body:
          'Este é o exercício que amarra o capítulo: contagem, soma, média, máximo, mínimo e amplitude, todos extraídos de uma **única leitura** da sequência.',
      },
      {
        kind: 'text',
        body:
          'Ler os dados uma vez só não é preciosismo. Quando os dados vêm de um fluxo — teclado, arquivo, rede — não há como voltar ao início. Toda estatística que exigir duas passadas exige também guardar tudo na memória.',
      },
      {
        kind: 'table',
        headers: ['Estatística', 'Precisa de'],
        rows: [
          ['quantidade', 'um contador'],
          ['soma', 'um acumulador'],
          ['média', 'soma e quantidade, calculada no fim'],
          ['máximo e mínimo', 'duas variáveis com o valor extremo atual'],
          ['amplitude', 'a diferença entre os dois extremos'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A amplitude não precisa de laço próprio: ela é derivada de máximo e mínimo depois que o laço termina. Sempre que uma estatística pode ser calculada a partir de outras já disponíveis, ela sai de graça.',
      },
      {
        kind: 'code',
        code: `if (i == 1)                    // o primeiro valor define os dois extremos
{
    maior = valor;
    menor = valor;
}
else
{
    if (valor > maior) maior = valor;
    if (valor < menor) menor = valor;
}`,
        caption: 'Alternativa a `int.MinValue` e `int.MaxValue`: usar o primeiro dado real como ponto de partida.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Uma estatística que **não** cabe em uma passada é "quantos valores estão acima da média": a média só é conhecida no fim, e nesse ponto os dados já passaram. Ela exige guardar tudo — o que a próxima seção viabiliza.',
      },
    ],
    quiz: [
      {
        id: 's02c06l09q1',
        type: 'single',
        prompt: 'Qual destas estatísticas **não** pode ser calculada em uma única passada?',
        options: [
          { id: 'a', text: 'Quantos valores estão acima da média.', correct: true },
          { id: 'b', text: 'A média.' },
          { id: 'c', text: 'A amplitude.' },
          { id: 'd', text: 'A maior sequência repetida.' },
        ],
        explanation:
          'A média só fica pronta depois do último valor, e comparar cada dado com ela exigiria revisitá-los. As outras três dependem apenas do que já foi visto até cada ponto.',
      },
      {
        id: 's02c06l09q2',
        type: 'single',
        prompt: 'Qual é a amplitude de `12 7 25 3 18 9`?',
        options: [
          { id: 'a', code: '22', correct: true },
          { id: 'b', code: '25' },
          { id: 'c', code: '28' },
          { id: 'd', code: '15' },
        ],
        explanation:
          'É a diferença entre o maior (25) e o menor (3). Ela mede o quanto os dados se espalham, e vale 0 quando todos os valores são iguais.',
      },
      {
        id: 's02c06l09q3',
        type: 'single',
        prompt: 'Por que usar o primeiro valor lido para inicializar máximo e mínimo?',
        options: [
          { id: 'a', text: 'Porque é um dado real, então funciona qualquer que seja a faixa dos valores.', correct: true },
          { id: 'b', text: 'Porque é mais rápido que usar `int.MaxValue`.' },
          { id: 'c', text: 'Porque `int.MaxValue` não existe para todos os tipos.' },
          { id: 'd', text: 'Porque o primeiro valor é sempre o maior.' },
        ],
        explanation:
          'As duas técnicas são corretas. Usar o primeiro dado tem a vantagem de funcionar igual para qualquer tipo numérico, sem depender de conhecer a constante do limite.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e depois `n` valores. Produza um painel com seis estatísticas: quantidade, soma, média, maior, menor e amplitude.',
      requirements: [
        'Linha 1: `Quantidade: q`',
        'Linha 2: `Soma: s`',
        'Linha 3: `Media: m`, com duas casas decimais',
        'Linha 4: `Maior: M`',
        'Linha 5: `Menor: n`',
        'Linha 6: `Amplitude: a`, a diferença entre maior e menor',
        'Valores negativos são válidos, e a sequência pode ser inteiramente negativa',
        'Use um único laço para todas as estatísticas',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int soma = 0;
        int maior = 0;
        int menor = 0;

        // Uma unica passada alimenta todas as estatisticas

        double media = 0.0;

        Console.WriteLine($"Quantidade: {n}");
        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Media: {media:F2}");
        Console.WriteLine($"Maior: {maior}");
        Console.WriteLine($"Menor: {menor}");
        Console.WriteLine($"Amplitude: {maior - menor}");
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
        int maior = 0;
        int menor = 0;

        for (int i = 1; i <= n; i++)
        {
            int valor = int.Parse(Console.ReadLine());

            soma += valor;

            if (i == 1)
            {
                maior = valor;
                menor = valor;
            }
            else
            {
                if (valor > maior)
                {
                    maior = valor;
                }

                if (valor < menor)
                {
                    menor = valor;
                }
            }
        }

        double media = n > 0 ? (double)soma / n : 0.0;

        Console.WriteLine($"Quantidade: {n}");
        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Media: {media:F2}");
        Console.WriteLine($"Maior: {maior}");
        Console.WriteLine($"Menor: {menor}");
        Console.WriteLine($"Amplitude: {maior - menor}");
    }
}
`,
      hints: [
        'O primeiro valor define os dois extremos de uma vez. A partir do segundo, cada um é testado separadamente.',
        'A amplitude já está calculada na última linha do `starterCode`: basta que `maior` e `menor` estejam corretos.',
      ],
      tests: [
        {
          name: 'Série variada',
          stdin: '6\n12\n7\n25\n3\n18\n9\n',
          expectedStdout:
            'Quantidade: 6\nSoma: 74\nMedia: 12.33\nMaior: 25\nMenor: 3\nAmplitude: 22',
        },
        {
          name: 'Todos iguais: amplitude zero',
          stdin: '3\n5\n5\n5\n',
          expectedStdout:
            'Quantidade: 3\nSoma: 15\nMedia: 5.00\nMaior: 5\nMenor: 5\nAmplitude: 0',
        },
        {
          name: 'Toda a série negativa',
          stdin: '4\n-1\n-9\n-3\n-5\n',
          expectedStdout:
            'Quantidade: 4\nSoma: -18\nMedia: -4.50\nMaior: -1\nMenor: -9\nAmplitude: 8',
        },
        {
          name: 'Um valor negativo só',
          stdin: '1\n-4\n',
          expectedStdout:
            'Quantidade: 1\nSoma: -4\nMedia: -4.00\nMaior: -4\nMenor: -4\nAmplitude: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c06l10',
    title: 'Checkpoint: agregando dados',
    objective: 'Montar um relatório completo a partir de um fluxo com sentinela, validação e oito estatísticas em uma passada.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint junta o capítulo 1 — sentinela e validação — com o capítulo 6 inteiro. Os dados chegam sujos e em quantidade desconhecida, e o relatório precisa sair correto mesmo assim.',
      },
      {
        kind: 'table',
        headers: ['Origem', 'Ferramenta'],
        rows: [
          ['capítulo 1', 'sentinela `fim`, `TryParse`, contadores'],
          ['lição 1', 'soma e média com `(double)`'],
          ['lições 2 e 3', 'máximo e mínimo a partir do primeiro dado'],
          ['lição 6', 'comparação com o valor anterior'],
          ['lição 7', 'repetição em andamento contra a melhor'],
        ],
      },
      {
        kind: 'text',
        body:
          'A dificuldade real está na interação: a **primeira leitura válida** é especial para quatro estatísticas de uma vez. Ela define máximo e mínimo, abre a primeira repetição, e não tem valor anterior com que se comparar.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Use o contador de leituras válidas como marcador do primeiro dado: `if (validas == 1)` cobre todos os quatro casos especiais com uma única condição, e continua correto mesmo que a primeira linha do arquivo seja inválida.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Sem nenhuma leitura válida, máximo e mínimo não existem. O enunciado resolve isso definindo que ambos valem `0` nesse caso — uma convenção que precisa estar escrita, porque não é dedutível.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Todas as oito estatísticas cabem em uma passada. A que não caberia — "quantas leituras estão acima da média" — foi deliberadamente deixada de fora, e volta na Seção 3, quando guardar os dados deixa de ser um problema.',
      },
    ],
    quiz: [
      {
        id: 's02c06l10q1',
        type: 'single',
        prompt: 'Por que usar `validas == 1` em vez de o índice do laço para detectar o primeiro dado?',
        options: [
          { id: 'a', text: 'Porque a primeira linha pode ser inválida, e aí o primeiro dado válido não é o primeiro lido.', correct: true },
          { id: 'b', text: 'Porque o índice do laço não existe em um `while`.' },
          { id: 'c', text: 'Por questão de desempenho.' },
          { id: 'd', text: 'São equivalentes em todos os casos.' },
        ],
        explanation:
          'Com um descarte no começo, o primeiro dado bom pode ser a terceira linha. O contador de válidas acompanha os dados, não as linhas.',
      },
      {
        id: 's02c06l10q2',
        type: 'multiple',
        prompt: 'Quais estatísticas dependem de tratar o primeiro dado válido de forma especial?',
        options: [
          { id: 'a', text: 'Máximo.', correct: true },
          { id: 'b', text: 'Mínimo.', correct: true },
          { id: 'c', text: 'Comparação com o valor anterior.', correct: true },
          { id: 'd', text: 'Soma.' },
        ],
        explanation:
          'A soma começa no elemento neutro e não precisa de nada especial. As outras três ou precisam de um valor real de partida, ou não têm par para comparar.',
      },
      {
        id: 's02c06l10q3',
        type: 'single',
        prompt: 'Sem nenhuma leitura válida, qual deve ser a resposta para "a sequência é crescente"?',
        options: [
          { id: 'a', code: 'True', correct: true },
          { id: 'b', code: 'False' },
          { id: 'c', text: 'A linha deve ser omitida.' },
          { id: 'd', text: 'O programa deveria encerrar com erro.' },
        ],
        explanation:
          'Não existe par que viole o crescimento, então a afirmação é verdadeira por vacuidade — o mesmo raciocínio das flags de "todos são X".',
      },
    ],
    challenge: {
      brief:
        'Um sensor envia leituras, uma por linha, até a palavra `fim`. Linhas que não são um número inteiro devem ser descartadas; valores negativos são leituras válidas. Gere o relatório completo do período.',
      requirements: [
        'Linha 1: `Validas: v`',
        'Linha 2: `Descartadas: d`',
        'Linha 3: `Soma: s`',
        'Linha 4: `Media: m`, com duas casas decimais',
        'Linha 5: `Maior: M`',
        'Linha 6: `Menor: n`',
        'Linha 7: `Crescente: True` ou `False`, exigindo cada leitura estritamente maior que a anterior',
        'Linha 8: `Maior repeticao: r`, o comprimento da maior sequência de leituras iguais consecutivas',
        'Sem nenhuma leitura válida: soma `0`, média `0.00`, maior e menor `0`, crescente `True`, repetição `0`',
        'Uma única leitura válida já é crescente e tem repetição de comprimento 1',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        string linha = Console.ReadLine();

        int validas = 0;
        int descartadas = 0;
        int soma = 0;
        int maior = 0;
        int menor = 0;
        int anterior = 0;
        int quebras = 0;
        int repeticaoAtual = 0;
        int melhorRepeticao = 0;

        // Le ate "fim". O primeiro dado valido e especial.

        double media = 0.0;

        Console.WriteLine($"Validas: {validas}");
        Console.WriteLine($"Descartadas: {descartadas}");
        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Media: {media:F2}");
        Console.WriteLine($"Maior: {maior}");
        Console.WriteLine($"Menor: {menor}");
        Console.WriteLine($"Crescente: {quebras == 0}");
        Console.WriteLine($"Maior repeticao: {melhorRepeticao}");
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
        int soma = 0;
        int maior = 0;
        int menor = 0;
        int anterior = 0;
        int quebras = 0;
        int repeticaoAtual = 0;
        int melhorRepeticao = 0;

        while (linha != "fim")
        {
            if (int.TryParse(linha, out int leitura))
            {
                validas++;
                soma += leitura;

                if (validas == 1)
                {
                    maior = leitura;
                    menor = leitura;
                    repeticaoAtual = 1;
                }
                else
                {
                    if (leitura > maior)
                    {
                        maior = leitura;
                    }

                    if (leitura < menor)
                    {
                        menor = leitura;
                    }

                    if (leitura <= anterior)
                    {
                        quebras++;
                    }

                    if (leitura == anterior)
                    {
                        repeticaoAtual++;
                    }
                    else
                    {
                        repeticaoAtual = 1;
                    }
                }

                if (repeticaoAtual > melhorRepeticao)
                {
                    melhorRepeticao = repeticaoAtual;
                }

                anterior = leitura;
            }
            else
            {
                descartadas++;
            }

            linha = Console.ReadLine();
        }

        double media = validas > 0 ? (double)soma / validas : 0.0;

        Console.WriteLine($"Validas: {validas}");
        Console.WriteLine($"Descartadas: {descartadas}");
        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Media: {media:F2}");
        Console.WriteLine($"Maior: {maior}");
        Console.WriteLine($"Menor: {menor}");
        Console.WriteLine($"Crescente: {quebras == 0}");
        Console.WriteLine($"Maior repeticao: {melhorRepeticao}");
    }
}
`,
      hints: [
        'Uma única condição `if (validas == 1)` resolve os quatro casos especiais do primeiro dado válido.',
        'A comparação com `melhorRepeticao` fica fora desse `if / else`, para rodar em toda leitura válida — inclusive na primeira.',
      ],
      tests: [
        {
          name: 'Fluxo com descartes',
          stdin: '12\n7\nabc\n25\n3\n18\n-x\n9\nfim\n',
          expectedStdout:
            'Validas: 6\nDescartadas: 2\nSoma: 74\nMedia: 12.33\nMaior: 25\nMenor: 3\nCrescente: False\nMaior repeticao: 1',
        },
        {
          name: 'Fluxo estritamente crescente',
          stdin: '1\n2\n3\nfim\n',
          expectedStdout:
            'Validas: 3\nDescartadas: 0\nSoma: 6\nMedia: 2.00\nMaior: 3\nMenor: 1\nCrescente: True\nMaior repeticao: 1',
        },
        {
          name: 'Leituras todas iguais',
          stdin: '5\n5\n5\n5\nfim\n',
          expectedStdout:
            'Validas: 4\nDescartadas: 0\nSoma: 20\nMedia: 5.00\nMaior: 5\nMenor: 5\nCrescente: False\nMaior repeticao: 4',
        },
        {
          name: 'Uma leitura negativa só',
          stdin: '-3\nfim\n',
          expectedStdout:
            'Validas: 1\nDescartadas: 0\nSoma: -3\nMedia: -3.00\nMaior: -3\nMenor: -3\nCrescente: True\nMaior repeticao: 1',
        },
        {
          name: 'Período sem nenhuma leitura',
          stdin: 'fim\n',
          expectedStdout:
            'Validas: 0\nDescartadas: 0\nSoma: 0\nMedia: 0.00\nMaior: 0\nMenor: 0\nCrescente: True\nMaior repeticao: 0',
          hidden: true,
        },
      ],
    },
  },
]
