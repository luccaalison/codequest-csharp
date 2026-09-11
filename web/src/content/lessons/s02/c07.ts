import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's02c07l01',
    title: 'FizzBuzz',
    objective: 'Resolver o exercício de entrevista mais famoso do mundo, acertando a ordem dos testes sobrepostos.',
    concept: [
      {
        kind: 'text',
        body:
          'FizzBuzz é simples de enunciar: percorra de 1 a `n`, imprima `Fizz` nos múltiplos de 3, `Buzz` nos múltiplos de 5, `FizzBuzz` nos múltiplos dos dois, e o próprio número no resto. Ele é famoso porque a maioria erra na primeira tentativa — e sempre pelo mesmo motivo.',
      },
      {
        kind: 'compare',
        good: `if (i % 15 == 0)     "FizzBuzz"
else if (i % 3 == 0) "Fizz"
else if (i % 5 == 0) "Buzz"
else                  i`,
        bad: `if (i % 3 == 0)      "Fizz"
else if (i % 5 == 0) "Buzz"
else if (i % 15 == 0) "FizzBuzz"
else                  i`,
        goodLabel: 'O 15 sai como FizzBuzz',
        badLabel: 'O 15 sai como Fizz',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Todo múltiplo de 15 também é múltiplo de 3 e de 5. Se o teste mais específico não vier primeiro, ele é capturado por um ramo anterior e nunca é alcançado — a mesma armadilha da régua numerada.',
      },
      {
        kind: 'text',
        body:
          'Testar `i % 15 == 0` é equivalente a testar `i % 3 == 0 && i % 5 == 0`, porque 3 e 5 não têm divisor comum. As duas formas estão corretas; a segunda deixa a intenção mais explícita para quem lê.',
      },
      {
        kind: 'output',
        code: `1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O que o exercício realmente testa não é aritmética: é se você percebe que as condições se sobrepõem. É por isso que ele sobrevive há vinte anos como filtro de entrevista.',
      },
    ],
    quiz: [
      {
        id: 's02c07l01q1',
        type: 'single',
        prompt: 'O que sai na posição 15 se o teste de múltiplo de 3 vier primeiro?',
        options: [
          { id: 'a', code: 'Fizz', correct: true },
          { id: 'b', code: 'FizzBuzz' },
          { id: 'c', code: 'Buzz' },
          { id: 'd', code: '15' },
        ],
        explanation:
          'O ramo do 3 captura o 15 e a cadeia de `else if` para ali. O ramo do FizzBuzz vira código morto.',
      },
      {
        id: 's02c07l01q2',
        type: 'single',
        prompt: 'Qual condição é equivalente a `i % 15 == 0`?',
        options: [
          { id: 'a', code: 'i % 3 == 0 && i % 5 == 0', correct: true },
          { id: 'b', code: 'i % 3 == 0 || i % 5 == 0' },
          { id: 'c', code: 'i % 3 == 0 && i % 15 == 0' },
          { id: 'd', code: 'i / 15 == 0' },
        ],
        explanation:
          'Ser múltiplo de 15 é ser múltiplo de 3 **e** de 5 ao mesmo tempo. Com `||` a condição valeria para 3, 5, 6, 9 e vários outros que não são múltiplos de 15.',
      },
      {
        id: 's02c07l01q3',
        type: 'single',
        prompt: 'Quantos números entre 1 e 30 saem como `Fizz`, sem contar os `FizzBuzz`?',
        options: [
          { id: 'a', code: '8', correct: true },
          { id: 'b', code: '10' },
          { id: 'c', code: '6' },
          { id: 'd', code: '2' },
        ],
        explanation:
          'Há 10 múltiplos de 3 até 30, mas dois deles (15 e 30) também são múltiplos de 5 e viram `FizzBuzz`. Sobram 8.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e imprima a sequência do FizzBuzz de 1 até `n`. Depois da sequência, informe quantos `Fizz`, quantos `Buzz` e quantos `FizzBuzz` saíram.',
      requirements: [
        'Múltiplos de 3 e de 5 ao mesmo tempo saem como `FizzBuzz`',
        'Múltiplos apenas de 3 saem como `Fizz`; apenas de 5 saem como `Buzz`',
        'Os demais saem como o próprio número',
        'Depois da sequência: `Fizz: a`, `Buzz: b` e `FizzBuzz: c`',
        'As contagens de `Fizz` e `Buzz` **não** incluem os `FizzBuzz`',
        'Para `n` igual a 0 saem apenas as três contagens, todas em zero',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int fizz = 0;
        int buzz = 0;
        int fizzbuzz = 0;

        // Do teste mais especifico para o mais geral

        Console.WriteLine($"Fizz: {fizz}");
        Console.WriteLine($"Buzz: {buzz}");
        Console.WriteLine($"FizzBuzz: {fizzbuzz}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int fizz = 0;
        int buzz = 0;
        int fizzbuzz = 0;

        for (int i = 1; i <= n; i++)
        {
            if (i % 15 == 0)
            {
                Console.WriteLine("FizzBuzz");
                fizzbuzz++;
            }
            else if (i % 3 == 0)
            {
                Console.WriteLine("Fizz");
                fizz++;
            }
            else if (i % 5 == 0)
            {
                Console.WriteLine("Buzz");
                buzz++;
            }
            else
            {
                Console.WriteLine(i);
            }
        }

        Console.WriteLine($"Fizz: {fizz}");
        Console.WriteLine($"Buzz: {buzz}");
        Console.WriteLine($"FizzBuzz: {fizzbuzz}");
    }
}
`,
      hints: [
        'O primeiro teste da cadeia é `i % 15 == 0`. Os outros dois vêm depois dele.',
        'Cada ramo imprime **e** incrementa o contador correspondente, então as contagens nunca se sobrepõem.',
      ],
      tests: [
        {
          name: 'Até 15',
          stdin: '15\n',
          expectedStdout:
            '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\nFizz: 4\nBuzz: 2\nFizzBuzz: 1',
        },
        {
          name: 'Até 5, sem nenhum FizzBuzz',
          stdin: '5\n',
          expectedStdout: '1\n2\nFizz\n4\nBuzz\nFizz: 1\nBuzz: 1\nFizzBuzz: 0',
        },
        {
          name: 'Antes do primeiro múltiplo',
          stdin: '2\n',
          expectedStdout: '1\n2\nFizz: 0\nBuzz: 0\nFizzBuzz: 0',
        },
        {
          name: 'Nenhum número',
          stdin: '0\n',
          expectedStdout: 'Fizz: 0\nBuzz: 0\nFizzBuzz: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c07l02',
    title: 'Troco em moedas',
    objective: 'Aplicar a estratégia gulosa para decompor um valor no menor número de moedas possível.',
    concept: [
      {
        kind: 'text',
        body:
          'Dar troco com o menor número de moedas é o exemplo clássico de **algoritmo guloso**: em cada passo, use a maior moeda que ainda cabe, e nunca reconsidere a escolha.',
      },
      {
        kind: 'code',
        code: `int quantidade = restante / moeda;   // quantas cabem
restante = restante % moeda;         // o que sobra`,
        caption: 'Divisão e resto resolvem cada denominação em duas linhas.',
      },
      {
        kind: 'table',
        headers: ['Moeda', 'Restante antes', 'Quantidade', 'Restante depois'],
        rows: [
          ['`100`', '`287`', '`2`', '`87`'],
          ['`50`', '`87`', '`1`', '`37`'],
          ['`25`', '`37`', '`1`', '`12`'],
          ['`10`', '`12`', '`1`', '`2`'],
          ['`5`', '`2`', '`0`', '`2`'],
          ['`1`', '`2`', '`2`', '`0`'],
        ],
      },
      {
        kind: 'text',
        body:
          'Para percorrer as denominações sem uma coleção, uma `switch` expression decide qual é a próxima moeda a partir da atual. O laço termina quando a moeda chega a zero.',
      },
      {
        kind: 'code',
        code: `moeda = moeda switch
{
    100 => 50,
    50 => 25,
    25 => 10,
    10 => 5,
    5 => 1,
    _ => 0,      // acabaram as denominacoes
};`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O guloso só dá o resultado ótimo em sistemas de moeda bem comportados, como o real e o dólar. Com denominações de 1, 3 e 4, o troco de 6 seria resolvido como `4 + 1 + 1` — três moedas, quando `3 + 3` bastariam. O algoritmo certo para o caso geral é programação dinâmica, assunto da Seção 7.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A denominação de valor 1 é o que garante que o resto sempre chega a zero. Sem ela, o algoritmo pode terminar com um resto que nenhuma moeda cobre — e o programa precisaria reportar isso em vez de ignorar.',
      },
    ],
    quiz: [
      {
        id: 's02c07l02q1',
        type: 'single',
        prompt: 'Quantas moedas o algoritmo guloso usa para dar 287 centavos com 100, 50, 25, 10, 5 e 1?',
        options: [
          { id: 'a', code: '7', correct: true },
          { id: 'b', code: '6' },
          { id: 'c', code: '9' },
          { id: 'd', code: '12' },
        ],
        explanation:
          'Duas de 100, uma de 50, uma de 25, uma de 10 e duas de 1: 2 + 1 + 1 + 1 + 0 + 2 = 7.',
      },
      {
        id: 's02c07l02q2',
        type: 'single',
        prompt: 'Com denominações de 1, 3 e 4, quantas moedas o guloso usa para dar 6?',
        options: [
          { id: 'a', text: 'Três: 4 + 1 + 1, quando duas de 3 bastariam.', correct: true },
          { id: 'b', text: 'Duas: 3 + 3.' },
          { id: 'c', text: 'Seis: seis moedas de 1.' },
          { id: 'd', text: 'O algoritmo não termina.' },
        ],
        explanation:
          'O guloso pega o 4 primeiro e fica preso com resto 2, que só as moedas de 1 cobrem. Ele nunca reconsidera a primeira escolha, e é justamente aí que falha.',
      },
      {
        id: 's02c07l02q3',
        type: 'single',
        prompt: 'Por que `restante % moeda` vem depois de `restante / moeda`?',
        options: [
          { id: 'a', text: 'A divisão usa o valor antes de ser reduzido; inverter a ordem daria quantidade zero.', correct: true },
          { id: 'b', text: 'Porque `%` é mais lento que `/`.' },
          { id: 'c', text: 'Porque `%` só funciona depois de uma divisão.' },
          { id: 'd', text: 'A ordem é indiferente.' },
        ],
        explanation:
          'Se `restante` for atualizado primeiro, ele já vale menos que a moeda e a divisão devolve 0. É a mesma regra de sempre: calcule tudo com os valores antigos antes de atualizar qualquer um.',
      },
    ],
    challenge: {
      brief:
        'Leia um valor em centavos, maior ou igual a zero, e informe quantas moedas de cada denominação — 100, 50, 25, 10, 5 e 1 — compõem esse valor usando o menor número possível de moedas.',
      requirements: [
        'Uma linha por denominação, no formato `100: 2`, sempre nas seis denominações e sempre em ordem decrescente',
        'Denominações que não são usadas saem com quantidade `0`',
        'A última linha é `Total de moedas: k`',
        'Para o valor 0 todas as quantidades são `0`',
        'Use a estratégia gulosa: sempre a maior moeda que ainda cabe',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int valor = int.Parse(Console.ReadLine());

        int restante = valor;
        int total = 0;
        int moeda = 100;

        // Enquanto houver denominacao, divida e reduza

        Console.WriteLine($"Total de moedas: {total}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int valor = int.Parse(Console.ReadLine());

        int restante = valor;
        int total = 0;
        int moeda = 100;

        while (moeda >= 1)
        {
            int quantidade = restante / moeda;
            restante = restante % moeda;
            total += quantidade;

            Console.WriteLine($"{moeda}: {quantidade}");

            moeda = moeda switch
            {
                100 => 50,
                50 => 25,
                25 => 10,
                10 => 5,
                5 => 1,
                _ => 0,
            };
        }

        Console.WriteLine($"Total de moedas: {total}");
    }
}
`,
      hints: [
        'A `switch` expression que avança a denominação fica no fim do corpo do laço, e devolver `0` é o que encerra o `while`.',
        'Divida antes de tirar o resto: as duas operações usam o mesmo valor de `restante`.',
      ],
      tests: [
        {
          name: 'Valor com todas as faixas',
          stdin: '287\n',
          expectedStdout: '100: 2\n50: 1\n25: 1\n10: 1\n5: 0\n1: 2\nTotal de moedas: 7',
        },
        {
          name: 'Valor abaixo da maior moeda',
          stdin: '99\n',
          expectedStdout: '100: 0\n50: 1\n25: 1\n10: 2\n5: 0\n1: 4\nTotal de moedas: 8',
        },
        {
          name: 'Uma moeda só',
          stdin: '1\n',
          expectedStdout: '100: 0\n50: 0\n25: 0\n10: 0\n5: 0\n1: 1\nTotal de moedas: 1',
        },
        {
          name: 'Valor zero',
          stdin: '0\n',
          expectedStdout: '100: 0\n50: 0\n25: 0\n10: 0\n5: 0\n1: 0\nTotal de moedas: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c07l03',
    title: 'Juros compostos',
    objective: 'Simular a evolução de um saldo mês a mês, usando `decimal` e aplicando o fator sobre o valor já atualizado.',
    concept: [
      {
        kind: 'text',
        body:
          'Juros compostos incidem sobre o saldo **já acumulado**, não sobre o capital inicial. É essa realimentação que faz o crescimento ser exponencial, e ela cai naturalmente em um laço que reatribui a própria variável.',
      },
      {
        kind: 'compare',
        good: `saldo = saldo * fator;
// cada mes rende sobre o saldo novo`,
        bad: `saldo = capital * fator;
// cada mes rende sobre o inicial`,
        goodLabel: 'Juros compostos',
        badLabel: 'Juros simples disfarçados',
      },
      {
        kind: 'code',
        code: `decimal fator = 1 + taxa / 100m;

for (int mes = 1; mes <= meses; mes++)
{
    saldo = saldo * fator;
    Console.WriteLine($"Mes {mes}: {saldo:F2}");
}`,
        caption: 'O fator é calculado uma vez só, fora do laço: ele não muda.',
      },
      {
        kind: 'table',
        headers: ['Mês', 'Saldo com 2% ao mês'],
        rows: [
          ['`0`', '`1000.00`'],
          ['`1`', '`1020.00`'],
          ['`2`', '`1040.40`'],
          ['`3`', '`1061.21`'],
          ['`4`', '`1082.43`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Dinheiro usa `decimal`, nunca `double`. Um `double` não representa `0.1` exatamente, e depois de dezenas de multiplicações o erro aparece nos centavos. `decimal` é decimal de verdade, e foi criado exatamente para isso.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que o valor exibido é arredondado, mas o valor **acumulado** não. O saldo do mês 3 é `1061.208`, exibido como `1061.21`, e o mês 4 parte de `1061.208`. Arredondar a cada mês produziria um total diferente — e é assim que sistemas financeiros geram divergências de centavos.',
      },
      {
        kind: 'text',
        body:
          'Com zero meses o laço não roda e o saldo continua sendo o capital. O rendimento é zero, e isso sai naturalmente de `saldo - capital` sem nenhum tratamento especial.',
      },
    ],
    quiz: [
      {
        id: 's02c07l03q1',
        type: 'single',
        prompt: 'Qual linha aplica juros compostos corretamente?',
        options: [
          { id: 'a', code: 'saldo = saldo * fator;', correct: true },
          { id: 'b', code: 'saldo = capital * fator;' },
          { id: 'c', code: 'saldo = saldo + capital * fator;' },
          { id: 'd', code: 'saldo = capital + saldo * taxa;' },
        ],
        explanation:
          'A realimentação é o ponto: o novo saldo precisa ser calculado a partir do saldo atual. Usar o capital em qualquer volta transforma o cálculo em juros simples.',
      },
      {
        id: 's02c07l03q2',
        type: 'single',
        prompt: 'Por que usar `decimal` em vez de `double` para dinheiro?',
        options: [
          { id: 'a', text: 'Porque `double` não representa frações decimais exatamente, e o erro acumula.', correct: true },
          { id: 'b', text: 'Porque `double` não aceita multiplicação.' },
          { id: 'c', text: 'Porque `decimal` é mais rápido.' },
          { id: 'd', text: 'Porque `double` não pode ser formatado com `F2`.' },
        ],
        explanation:
          'Em binário, `0.1` é uma dízima. `decimal` guarda os dígitos em base 10 e por isso representa valores monetários sem erro de conversão.',
      },
      {
        id: 's02c07l03q3',
        type: 'single',
        prompt: 'Por que o fator é calculado fora do laço?',
        options: [
          { id: 'a', text: 'Porque ele não muda entre os meses; recalculá-lo seria trabalho repetido.', correct: true },
          { id: 'b', text: 'Porque variáveis não podem ser criadas dentro de um `for`.' },
          { id: 'c', text: 'Porque a taxa muda a cada volta.' },
          { id: 'd', text: 'Porque o resultado seria diferente se estivesse dentro.' },
        ],
        explanation:
          'O resultado seria idêntico, mas tirar do laço o que não depende dele é um hábito que vale para qualquer cálculo — e deixa claro para quem lê que a taxa é fixa.',
      },
    ],
    challenge: {
      brief:
        'Leia um `capital` em reais, uma `taxa` mensal em porcentagem e um número de `meses` entre 0 e 10. Mostre a evolução do saldo mês a mês e informe o saldo final e o rendimento total.',
      requirements: [
        'Uma linha por mês, no formato `Mes 1: 1020.00`, com duas casas decimais',
        'Depois dos meses: `Saldo final: X` e `Rendimento: Y`',
        'O rendimento é o saldo final menos o capital inicial',
        'Use `decimal` e leia os valores com `CultureInfo.InvariantCulture`',
        'Não arredonde o saldo entre os meses: só a exibição usa duas casas',
        'Com 0 meses não sai nenhuma linha de mês, e o rendimento é `0.00`',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        decimal capital = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        decimal taxa = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        int meses = int.Parse(Console.ReadLine());

        decimal saldo = capital;

        // Um fator fixo, aplicado sobre o saldo a cada mes

        Console.WriteLine($"Saldo final: {saldo:F2}");
        Console.WriteLine($"Rendimento: {saldo - capital:F2}");
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        decimal capital = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        decimal taxa = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        int meses = int.Parse(Console.ReadLine());

        decimal saldo = capital;
        decimal fator = 1 + taxa / 100m;

        for (int mes = 1; mes <= meses; mes++)
        {
            saldo = saldo * fator;
            Console.WriteLine($"Mes {mes}: {saldo:F2}");
        }

        Console.WriteLine($"Saldo final: {saldo:F2}");
        Console.WriteLine($"Rendimento: {saldo - capital:F2}");
    }
}
`,
      hints: [
        'O fator é `1 + taxa / 100m`. O sufixo `m` mantém a divisão em `decimal`.',
        'A reatribuição `saldo = saldo * fator;` é o que torna os juros compostos.',
      ],
      tests: [
        {
          name: 'Quatro meses a 2%',
          stdin: '1000.00\n2\n4\n',
          expectedStdout:
            'Mes 1: 1020.00\nMes 2: 1040.40\nMes 3: 1061.21\nMes 4: 1082.43\nSaldo final: 1082.43\nRendimento: 82.43',
        },
        {
          name: 'Dois meses a 10%',
          stdin: '500.00\n10\n2\n',
          expectedStdout:
            'Mes 1: 550.00\nMes 2: 605.00\nSaldo final: 605.00\nRendimento: 105.00',
        },
        {
          name: 'Taxa zero não rende',
          stdin: '250.00\n0\n3\n',
          expectedStdout:
            'Mes 1: 250.00\nMes 2: 250.00\nMes 3: 250.00\nSaldo final: 250.00\nRendimento: 0.00',
        },
        {
          name: 'Nenhum mês de aplicação',
          stdin: '500.00\n10\n0\n',
          expectedStdout: 'Saldo final: 500.00\nRendimento: 0.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c07l04',
    title: 'Adivinhe o número',
    objective: 'Usar `Random` com semente fixa para gerar um jogo que continua sendo reproduzível e testável.',
    concept: [
      {
        kind: 'text',
        body:
          'Um jogo de adivinhação precisa de um número aleatório. Mas um programa cujo resultado muda a cada execução é impossível de testar — e a solução para isso é entender o que "aleatório" significa em um computador.',
      },
      {
        kind: 'text',
        body:
          '`Random` não produz números realmente aleatórios: produz uma sequência calculada a partir de um valor inicial, a **semente**. Mesma semente, mesma sequência, sempre. Sem semente explícita, ela vem do relógio — e aí sim cada execução difere.',
      },
      {
        kind: 'code',
        code: `Random sorteio = new Random(42);       // semente fixa
int segredo = sorteio.Next(1, 101);    // 1 a 100, inclusive o 1

// Com a semente 42, os tres primeiros sorteios
// nessa faixa sao sempre 67, 15 e 13.`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`Next(1, 101)` sorteia de 1 a 100: o limite inferior é **inclusivo** e o superior é **exclusivo**. Escrever `Next(1, 100)` nunca devolveria 100, e é o erro de um a mais mais comum com `Random`.',
      },
      {
        kind: 'table',
        headers: ['Chamada', 'Faixa sorteada'],
        rows: [
          ['`Next()`', '`0` até o máximo do `int`'],
          ['`Next(6)`', '`0` a `5`'],
          ['`Next(1, 7)`', '`1` a `6`, como um dado'],
          ['`Next(1, 101)`', '`1` a `100`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Semente fixa não é gambiarra de teste: é técnica padrão em simulação científica, onde reproduzir exatamente um experimento é obrigatório. O mesmo vale para depurar um jogo — sem semente fixa, o bug não se repete.',
      },
      {
        kind: 'text',
        body:
          'Um `Random` deve ser criado **uma vez** e reutilizado. Criar um novo a cada sorteio, dentro de um laço, é o erro clássico: em versões antigas do .NET todos eram semeados pelo relógio e devolviam o mesmo valor.',
      },
    ],
    quiz: [
      {
        id: 's02c07l04q1',
        type: 'single',
        prompt: 'Qual faixa `Next(1, 7)` sorteia?',
        options: [
          { id: 'a', text: 'De 1 a 6, inclusive.', correct: true },
          { id: 'b', text: 'De 1 a 7, inclusive.' },
          { id: 'c', text: 'De 0 a 7.' },
          { id: 'd', text: 'De 2 a 6.' },
        ],
        explanation:
          'O limite inferior entra e o superior não. Para simular um dado de seis faces, `Next(1, 7)` é a chamada correta.',
      },
      {
        id: 's02c07l04q2',
        type: 'single',
        prompt: 'Por que dois programas com `new Random(42)` produzem a mesma sequência?',
        options: [
          { id: 'a', text: 'Porque a sequência é calculada de forma determinística a partir da semente.', correct: true },
          { id: 'b', text: 'Por coincidência.' },
          { id: 'c', text: 'Porque 42 é um valor especial.' },
          { id: 'd', text: 'Porque o .NET guarda a sequência em cache.' },
        ],
        explanation:
          'É um gerador pseudoaleatório: cada valor sai de uma fórmula aplicada ao estado anterior. A semente define o estado inicial, e o resto é consequência.',
      },
      {
        id: 's02c07l04q3',
        type: 'single',
        prompt: 'Qual é o problema de criar um `new Random()` dentro do laço?',
        options: [
          { id: 'a', text: 'Cada instância recomeça a sequência, o que pode gerar valores repetidos.', correct: true },
          { id: 'b', text: 'O programa fica sem memória.' },
          { id: 'c', text: '`Random` não pode ser criado dentro de um laço.' },
          { id: 'd', text: 'Nenhum: é a forma recomendada.' },
        ],
        explanation:
          'A aleatoriedade vem de avançar o estado de um mesmo gerador. Recriar o objeto reinicia esse estado e desperdiça exatamente a propriedade que se queria.',
      },
    ],
    challenge: {
      brief:
        'Escreva o jogo de adivinhação. O programa sorteia um número de 1 a 100 usando `new Random(42)`, e então lê palpites, um por linha, até o palpite estar correto. Para cada palpite, informe se o segredo é maior ou menor.',
      requirements: [
        'Crie o gerador com `new Random(42)` e sorteie com `Next(1, 101)`',
        'Cada palpite gera uma linha `50: Maior`, `75: Menor` ou `67: Acertou`',
        '`Maior` significa que o segredo é maior que o palpite',
        'Depois do acerto: `Tentativas: k`, contando todos os palpites, inclusive o correto',
        'Por último: `Segredo: s`',
        'A entrada sempre termina com o palpite correto',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        Random sorteio = new Random(42);
        int segredo = sorteio.Next(1, 101);

        int tentativas = 0;

        // Leia palpites ate acertar

        Console.WriteLine($"Tentativas: {tentativas}");
        Console.WriteLine($"Segredo: {segredo}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        Random sorteio = new Random(42);
        int segredo = sorteio.Next(1, 101);

        int tentativas = 0;
        bool acertou = false;

        while (!acertou)
        {
            int palpite = int.Parse(Console.ReadLine());
            tentativas++;

            if (palpite < segredo)
            {
                Console.WriteLine($"{palpite}: Maior");
            }
            else if (palpite > segredo)
            {
                Console.WriteLine($"{palpite}: Menor");
            }
            else
            {
                Console.WriteLine($"{palpite}: Acertou");
                acertou = true;
            }
        }

        Console.WriteLine($"Tentativas: {tentativas}");
        Console.WriteLine($"Segredo: {segredo}");
    }
}
`,
      hints: [
        'Uma flag `bool acertou` controla o `while`. Ela vira `true` no ramo do acerto.',
        'Conte a tentativa logo depois de ler o palpite, antes das comparações: o palpite correto também conta.',
      ],
      tests: [
        {
          name: 'Cinco palpites até acertar',
          stdin: '50\n75\n62\n68\n67\n',
          expectedStdout:
            '50: Maior\n75: Menor\n62: Maior\n68: Menor\n67: Acertou\nTentativas: 5\nSegredo: 67',
        },
        {
          name: 'Acerta de primeira',
          stdin: '67\n',
          expectedStdout: '67: Acertou\nTentativas: 1\nSegredo: 67',
        },
        {
          name: 'Busca binária completa',
          stdin: '50\n75\n63\n69\n66\n68\n67\n',
          expectedStdout:
            '50: Maior\n75: Menor\n63: Maior\n69: Menor\n66: Maior\n68: Menor\n67: Acertou\nTentativas: 7\nSegredo: 67',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c07l05',
    title: 'Sequência de Collatz',
    objective: 'Simular um processo iterativo cuja quantidade de passos é imprevisível, rastreando o pico e o comprimento.',
    concept: [
      {
        kind: 'text',
        body:
          'A regra é absurdamente simples: se o número é par, divida por 2; se é ímpar, multiplique por 3 e some 1. Repita até chegar a 1. A **conjectura de Collatz** afirma que todo número positivo chega a 1 — e ninguém provou isso até hoje.',
      },
      {
        kind: 'code',
        code: `while (atual != 1)
{
    atual = atual % 2 == 0
        ? atual / 2
        : atual * 3 + 1;

    passos++;
}`,
      },
      {
        kind: 'output',
        code: `6 3 10 5 16 8 4 2 1
Passos: 8
Maior: 16`,
      },
      {
        kind: 'text',
        body:
          'Este laço é diferente de todos os anteriores do capítulo: **não há como saber quantas voltas ele vai dar** sem executá-lo. Partindo de 6 são 8 passos; de 7 são 16; de 27 são 111, com pico em 9.232.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Como o número cresce nos passos ímpares antes de cair, o pico pode ficar muito acima do valor inicial. Partindo de 27, o valor chega a 9.232 — quase 350 vezes o ponto de partida. Para entradas grandes, isso é motivo real para usar `long`.',
      },
      {
        kind: 'table',
        headers: ['Início', 'Passos', 'Pico'],
        rows: [
          ['`1`', '`0`', '`1`'],
          ['`6`', '`8`', '`16`'],
          ['`7`', '`16`', '`52`'],
          ['`27`', '`111`', '`9232`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Este é o exemplo perfeito de por que o `while` existe e o `for` não serviria: a condição de parada depende inteiramente do que acontece dentro do laço, e nenhuma fórmula conhecida prevê o número de voltas.',
      },
    ],
    quiz: [
      {
        id: 's02c07l05q1',
        type: 'single',
        prompt: 'Qual é a sequência de Collatz começando em 6?',
        options: [
          { id: 'a', text: '6, 3, 10, 5, 16, 8, 4, 2, 1', correct: true },
          { id: 'b', text: '6, 3, 9, 4, 2, 1' },
          { id: 'c', text: '6, 12, 6, 3, 1' },
          { id: 'd', text: '6, 3, 1' },
        ],
        explanation:
          'Par divide por 2: 6 vira 3. Ímpar triplica e soma 1: 3 vira 10. E assim por diante, até 1, em 8 passos.',
      },
      {
        id: 's02c07l05q2',
        type: 'single',
        prompt: 'Por que `while` é o laço certo para Collatz, e não `for`?',
        options: [
          { id: 'a', text: 'Porque o número de voltas só é conhecido executando.', correct: true },
          { id: 'b', text: 'Porque `for` não permite condições com `!=`.' },
          { id: 'c', text: 'Porque a sequência pode ser infinita.' },
          { id: 'd', text: 'Porque `while` é mais rápido.' },
        ],
        explanation:
          'É a definição de laço não contado. Não existe fórmula que dê o comprimento da sequência a partir do valor inicial — se existisse, a conjectura já teria sido provada.',
      },
      {
        id: 's02c07l05q3',
        type: 'single',
        prompt: 'Quantos passos a sequência dá partindo de 1?',
        options: [
          { id: 'a', code: '0', correct: true },
          { id: 'b', code: '1' },
          { id: 'c', code: '3' },
          { id: 'd', text: 'Ela nunca termina.' },
        ],
        explanation:
          'A condição `atual != 1` já começa falsa e o laço não roda. O 1 é o destino, então partir dele significa já ter chegado.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e gere a sequência de Collatz a partir dele: par divide por 2, ímpar multiplica por 3 e soma 1, até chegar a 1. Imprima a sequência inteira em uma linha e informe quantos passos foram dados e qual foi o maior valor alcançado.',
      requirements: [
        'Linha 1: todos os valores da sequência, separados por espaço, começando pelo próprio `n` e terminando em 1',
        'Linha 2: `Passos: k`, contando as transformações e não os valores',
        'Linha 3: `Maior: m`, o maior valor da sequência, incluindo o `n` inicial',
        'Para `n` igual a 1 a sequência é apenas `1`, com 0 passos e maior 1',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int atual = n;
        int passos = 0;
        int maior = n;
        string sequencia = $"{n} ";

        // Aplique a regra ate atual chegar a 1

        Console.WriteLine(sequencia);
        Console.WriteLine($"Passos: {passos}");
        Console.WriteLine($"Maior: {maior}");
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
        int passos = 0;
        int maior = n;
        string sequencia = $"{n} ";

        while (atual != 1)
        {
            atual = atual % 2 == 0 ? atual / 2 : atual * 3 + 1;
            passos++;
            sequencia += $"{atual} ";

            if (atual > maior)
            {
                maior = atual;
            }
        }

        Console.WriteLine(sequencia);
        Console.WriteLine($"Passos: {passos}");
        Console.WriteLine($"Maior: {maior}");
    }
}
`,
      hints: [
        'O `n` inicial já entra na sequência e já é o candidato a maior, antes do laço começar.',
        'Um ternário resolve a regra em uma linha: `atual % 2 == 0 ? atual / 2 : atual * 3 + 1`.',
      ],
      tests: [
        {
          name: 'Partindo de 6',
          stdin: '6\n',
          expectedStdout: '6 3 10 5 16 8 4 2 1\nPassos: 8\nMaior: 16',
        },
        {
          name: 'Partindo de 7: sobe bem alto',
          stdin: '7\n',
          expectedStdout:
            '7 22 11 34 17 52 26 13 40 20 10 5 16 8 4 2 1\nPassos: 16\nMaior: 52',
        },
        {
          name: 'Partindo de 3',
          stdin: '3\n',
          expectedStdout: '3 10 5 16 8 4 2 1\nPassos: 7\nMaior: 16',
        },
        {
          name: 'Já começa no destino',
          stdin: '1\n',
          expectedStdout: '1\nPassos: 0\nMaior: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c07l06',
    title: 'Contagem de vogais e consoantes',
    objective: 'Percorrer um texto classificando cada caractere em categorias mutuamente exclusivas.',
    concept: [
      {
        kind: 'text',
        body:
          'Classificar caracteres é a base de qualquer análise de texto. O padrão é o mesmo da contagem condicional, com uma diferença: as categorias são **aninhadas**, porque vogal e consoante são subdivisões de letra.',
      },
      {
        kind: 'code',
        code: `string minusculo = texto.ToLower();

for (int i = 0; i < minusculo.Length; i++)
{
    char c = minusculo[i];

    if (c >= 'a' && c <= 'z')          // e letra?
    {
        if (c == 'a' || c == 'e' || c == 'i'
         || c == 'o' || c == 'u')      // qual tipo de letra?
        {
            vogais++;
        }
        else
        {
            consoantes++;
        }
    }
    else if (c >= '0' && c <= '9') digitos++;
    else                            outros++;
}`,
      },
      {
        kind: 'text',
        body:
          'Converter o texto inteiro para minúsculas **antes** do laço elimina metade dos testes. Sem isso, cada comparação de vogal precisaria contemplar as duas caixas, e a condição teria dez alternativas em vez de cinco.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Comparar `char` com `>=` e `<=` funciona porque letras e dígitos são consecutivos na tabela de códigos. É a mesma propriedade que faz `c - \'0\'` devolver o valor de um dígito.',
      },
      {
        kind: 'table',
        headers: ['Texto', 'Vogais', 'Consoantes', 'Dígitos', 'Outros'],
        rows: [
          ['`Programacao 101`', '`5`', '`6`', '`3`', '`1`'],
          ['`AEIOU`', '`5`', '`0`', '`0`', '`0`'],
          ['`xyz`', '`0`', '`3`', '`0`', '`0`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A soma das quatro contagens tem que dar exatamente `texto.Length`. Se não der, alguma categoria ficou de fora — e o candidato mais provável é o espaço, que muita gente esquece de contar como "outros".',
      },
      {
        kind: 'text',
        body:
          'Letras acentuadas caem em "outros" nesta classificação, porque `á` não está entre `a` e `z`. Tratá-las corretamente exige as funções de cultura do .NET, e é por isso que o conteúdo deste curso mantém identificadores e saídas sem acento.',
      },
    ],
    quiz: [
      {
        id: 's02c07l06q1',
        type: 'single',
        prompt: 'Por que converter o texto para minúsculas antes de classificar?',
        options: [
          { id: 'a', text: 'Para que cada teste precise cobrir apenas uma caixa de letra.', correct: true },
          { id: 'b', text: 'Porque o indexador só funciona em minúsculas.' },
          { id: 'c', text: 'Porque maiúsculas não são letras.' },
          { id: 'd', text: 'Para acelerar o laço.' },
        ],
        explanation:
          'Sem a conversão, o teste de letra precisaria de dois intervalos e o de vogal de dez comparações. Normalizar antes é sempre mais barato que tratar variações depois.',
      },
      {
        id: 's02c07l06q2',
        type: 'single',
        prompt: 'Quantos caracteres de `"Programacao 101"` caem na categoria "outros"?',
        options: [
          { id: 'a', code: '1', correct: true },
          { id: 'b', code: '0' },
          { id: 'c', code: '3' },
          { id: 'd', code: '4' },
        ],
        explanation:
          'Só o espaço. Os dígitos têm categoria própria, e todas as letras são vogal ou consoante.',
      },
      {
        id: 's02c07l06q3',
        type: 'single',
        prompt: 'Qual verificação rápida confirma que nenhuma categoria ficou faltando?',
        options: [
          { id: 'a', text: 'A soma das quatro contagens tem que ser igual ao comprimento do texto.', correct: true },
          { id: 'b', text: 'O número de vogais tem que ser menor que o de consoantes.' },
          { id: 'c', text: 'A categoria "outros" tem que ficar em zero.' },
          { id: 'd', text: 'O texto não pode ter espaços.' },
        ],
        explanation:
          'É a mesma invariante da contagem condicional: cada caractere entra em exatamente uma categoria, então as partes somam o todo.',
      },
    ],
    challenge: {
      brief:
        'Leia uma linha de texto e classifique cada caractere em quatro categorias: vogais, consoantes, dígitos e outros. A classificação de vogais e consoantes ignora maiúsculas e minúsculas.',
      requirements: [
        'Linha 1: `Vogais: v`',
        'Linha 2: `Consoantes: c`',
        'Linha 3: `Digitos: d`',
        'Linha 4: `Outros: o`',
        'Linha 5: `Total: t`, igual ao comprimento do texto',
        'Consoantes são as letras de `a` a `z` que não são vogais',
        'Espaços e pontuação contam como "outros"',
        'A soma das quatro categorias tem que dar o total',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        string texto = Console.ReadLine();
        string minusculo = texto.ToLower();

        int vogais = 0;
        int consoantes = 0;
        int digitos = 0;
        int outros = 0;

        // Classifique cada caractere em exatamente uma categoria

        Console.WriteLine($"Vogais: {vogais}");
        Console.WriteLine($"Consoantes: {consoantes}");
        Console.WriteLine($"Digitos: {digitos}");
        Console.WriteLine($"Outros: {outros}");
        Console.WriteLine($"Total: {texto.Length}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        string texto = Console.ReadLine();
        string minusculo = texto.ToLower();

        int vogais = 0;
        int consoantes = 0;
        int digitos = 0;
        int outros = 0;

        for (int i = 0; i < minusculo.Length; i++)
        {
            char c = minusculo[i];

            if (c >= 'a' && c <= 'z')
            {
                if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
                {
                    vogais++;
                }
                else
                {
                    consoantes++;
                }
            }
            else if (c >= '0' && c <= '9')
            {
                digitos++;
            }
            else
            {
                outros++;
            }
        }

        Console.WriteLine($"Vogais: {vogais}");
        Console.WriteLine($"Consoantes: {consoantes}");
        Console.WriteLine($"Digitos: {digitos}");
        Console.WriteLine($"Outros: {outros}");
        Console.WriteLine($"Total: {texto.Length}");
    }
}
`,
      hints: [
        'O teste de letra vem primeiro e envolve os dois contadores de letra; dígitos e outros ficam nos `else if` seguintes.',
        'Percorra a versão em minúsculas, mas informe o comprimento do texto original — os dois são iguais.',
      ],
      tests: [
        {
          name: 'Texto com letras, dígito e espaço',
          stdin: 'Programacao 101\n',
          expectedStdout: 'Vogais: 5\nConsoantes: 6\nDigitos: 3\nOutros: 1\nTotal: 15',
        },
        {
          name: 'Só vogais maiúsculas',
          stdin: 'AEIOU\n',
          expectedStdout: 'Vogais: 5\nConsoantes: 0\nDigitos: 0\nOutros: 0\nTotal: 5',
        },
        {
          name: 'Só consoantes',
          stdin: 'xyz\n',
          expectedStdout: 'Vogais: 0\nConsoantes: 3\nDigitos: 0\nOutros: 0\nTotal: 3',
        },
        {
          name: 'Só dígitos e espaço',
          stdin: '123 456\n',
          expectedStdout: 'Vogais: 0\nConsoantes: 0\nDigitos: 6\nOutros: 1\nTotal: 7',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c07l07',
    title: 'Simulação de fila de banco',
    objective: 'Simular um recurso único ao longo do tempo, rastreando ocupação, espera e ociosidade.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma simulação de fila acompanha o tempo avançando. Toda a lógica cabe em uma variável: **quando o caixa fica livre**. Ela é o estado que sobrevive de um cliente para o seguinte.',
      },
      {
        kind: 'code',
        code: `int inicio = chegada > livre ? chegada : livre;
int fim = inicio + atendimento;
int espera = inicio - chegada;

livre = fim;   // estado para o proximo cliente`,
        caption: 'O atendimento começa no mais tarde entre a chegada e a liberação do caixa.',
      },
      {
        kind: 'table',
        headers: ['Cliente', 'Chegada', 'Duração', 'Início', 'Fim', 'Espera'],
        rows: [
          ['`1`', '`0`', '`5`', '`0`', '`5`', '`0`'],
          ['`2`', '`2`', '`3`', '`5`', '`8`', '`3`'],
          ['`3`', '`10`', '`4`', '`10`', '`14`', '`0`'],
        ],
      },
      {
        kind: 'text',
        body:
          'Há dois casos, e o `inicio` os resolve de uma vez. Se o cliente chega e o caixa está ocupado, ele **espera** — e a espera é a diferença entre início e chegada. Se ele chega e o caixa está parado, quem esperou foi o caixa: isso é **ociosidade**.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Espera e ociosidade são exclusivas: em cada cliente, uma das duas é obrigatoriamente zero. Se as duas derem valor positivo no mesmo cliente, o cálculo de `inicio` está errado.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A simulação só funciona se as chegadas vierem em ordem não decrescente. Um cliente que chega antes do anterior quebraria a premissa de que basta olhar para trás uma posição — e exigiria uma fila de verdade, que é assunto da Seção 3.',
      },
      {
        kind: 'text',
        body:
          'Este modelo é o mais simples da teoria de filas, e mesmo assim já responde a perguntas reais: quanto tempo em média o cliente espera, quando o expediente termina, e quanto do dia o atendente ficou parado.',
      },
    ],
    quiz: [
      {
        id: 's02c07l07q1',
        type: 'single',
        prompt: 'Um cliente chega no instante 2 e o caixa fica livre no 5. Quando o atendimento começa?',
        options: [
          { id: 'a', code: '5', correct: true },
          { id: 'b', code: '2' },
          { id: 'c', code: '7' },
          { id: 'd', code: '3' },
        ],
        explanation:
          'O atendimento começa no mais tarde entre a chegada e a liberação do caixa. A espera desse cliente é `5 - 2 = 3`.',
      },
      {
        id: 's02c07l07q2',
        type: 'single',
        prompt: 'Um cliente pode ter espera e ociosidade positivas ao mesmo tempo?',
        options: [
          { id: 'a', text: 'Não: ou ele espera pelo caixa, ou o caixa esperou por ele.', correct: true },
          { id: 'b', text: 'Sim, quando o atendimento é muito longo.' },
          { id: 'c', text: 'Sim, sempre que ele é o primeiro da fila.' },
          { id: 'd', text: 'Depende da ordem das chegadas.' },
        ],
        explanation:
          'As duas medem o mesmo intervalo em direções opostas. Se `chegada > livre` há ociosidade e a espera é 0; caso contrário há espera e a ociosidade é 0.',
      },
      {
        id: 's02c07l07q3',
        type: 'single',
        prompt: 'Por que a simulação exige chegadas em ordem não decrescente?',
        options: [
          { id: 'a', text: 'Porque só o instante de liberação é guardado; um cliente fora de ordem precisaria de uma fila real.', correct: true },
          { id: 'b', text: 'Porque `int` não aceita valores decrescentes.' },
          { id: 'c', text: 'Porque a média de espera ficaria negativa.' },
          { id: 'd', text: 'Não exige: a ordem é indiferente.' },
        ],
        explanation:
          'O modelo processa cada cliente uma vez, na ordem lida. Reordenar exigiria guardar todos os clientes antes de decidir — o que só é viável com uma estrutura de dados.',
      },
    ],
    challenge: {
      brief:
        'Simule um caixa único de banco. Leia um inteiro `n` e depois `n` clientes, cada um em duas linhas: o instante de chegada e a duração do atendimento. As chegadas vêm em ordem não decrescente. Relate cada atendimento e as estatísticas do dia.',
      requirements: [
        'Uma linha por cliente: `Cliente 1: inicio 0, fim 5, espera 0`',
        'Depois: `Espera total: t`, `Espera media: m` com duas casas, `Fechamento: f` e `Ociosidade: o`',
        'O atendimento começa no mais tarde entre a chegada do cliente e a liberação do caixa',
        'A ociosidade conta desde o instante 0: um primeiro cliente que chega no 5 gera 5 de ociosidade',
        'O fechamento é o instante em que o último atendimento termina',
        'Com `n` igual a 0, todas as estatísticas são zero e a média é `0.00`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int livre = 0;
        int esperaTotal = 0;
        int ociosidade = 0;

        // Cada cliente: chegada, depois duracao

        double media = 0.0;

        Console.WriteLine($"Espera total: {esperaTotal}");
        Console.WriteLine($"Espera media: {media:F2}");
        Console.WriteLine($"Fechamento: {livre}");
        Console.WriteLine($"Ociosidade: {ociosidade}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int livre = 0;
        int esperaTotal = 0;
        int ociosidade = 0;

        for (int i = 1; i <= n; i++)
        {
            int chegada = int.Parse(Console.ReadLine());
            int atendimento = int.Parse(Console.ReadLine());

            if (chegada > livre)
            {
                ociosidade += chegada - livre;
                livre = chegada;
            }

            int inicio = livre;
            int fim = inicio + atendimento;
            int espera = inicio - chegada;

            Console.WriteLine($"Cliente {i}: inicio {inicio}, fim {fim}, espera {espera}");

            esperaTotal += espera;
            livre = fim;
        }

        double media = n > 0 ? (double)esperaTotal / n : 0.0;

        Console.WriteLine($"Espera total: {esperaTotal}");
        Console.WriteLine($"Espera media: {media:F2}");
        Console.WriteLine($"Fechamento: {livre}");
        Console.WriteLine($"Ociosidade: {ociosidade}");
    }
}
`,
      hints: [
        'Trate a ociosidade antes de calcular o início: se `chegada > livre`, acumule a diferença e avance `livre` até a chegada.',
        'Depois desse ajuste, `inicio` é sempre igual a `livre`, e a espera é `inicio - chegada`.',
      ],
      tests: [
        {
          name: 'Três clientes com espera e ociosidade',
          stdin: '3\n0\n5\n2\n3\n10\n4\n',
          expectedStdout:
            'Cliente 1: inicio 0, fim 5, espera 0\nCliente 2: inicio 5, fim 8, espera 3\nCliente 3: inicio 10, fim 14, espera 0\n' +
            'Espera total: 3\nEspera media: 1.00\nFechamento: 14\nOciosidade: 2',
        },
        {
          name: 'Dois clientes chegam juntos',
          stdin: '2\n0\n3\n0\n4\n',
          expectedStdout:
            'Cliente 1: inicio 0, fim 3, espera 0\nCliente 2: inicio 3, fim 7, espera 3\n' +
            'Espera total: 3\nEspera media: 1.50\nFechamento: 7\nOciosidade: 0',
        },
        {
          name: 'Banco vazio',
          stdin: '0\n',
          expectedStdout:
            'Espera total: 0\nEspera media: 0.00\nFechamento: 0\nOciosidade: 0',
        },
        {
          name: 'Ociosidade inicial',
          stdin: '1\n5\n2\n',
          expectedStdout:
            'Cliente 1: inicio 5, fim 7, espera 0\n' +
            'Espera total: 0\nEspera media: 0.00\nFechamento: 7\nOciosidade: 5',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c07l08',
    title: 'Torneio de pontos',
    objective: 'Acumular estatísticas de duas entidades em paralelo e aplicar um critério de desempate.',
    concept: [
      {
        kind: 'text',
        body:
          'Um confronto direto entre dois times exige acumular tudo em dobro: pontos, gols e vitórias de cada lado. A estrutura é a de sempre — acumuladores fora do laço, atualização dentro —, só que duplicada.',
      },
      {
        kind: 'code',
        code: `if (golsA > golsB)       { pontosA += 3; vitoriasA++; }
else if (golsB > golsA)  { pontosB += 3; vitoriasB++; }
else                     { pontosA++; pontosB++; empates++; }`,
        caption: 'Vitória vale 3, empate vale 1 para cada lado, derrota vale 0.',
      },
      {
        kind: 'text',
        body:
          'O ramo do empate é o único que atualiza os **dois** times. É também o único em que uma entidade ganha pontos sem ganhar uma vitória — e confundir essas duas contagens é o erro mais comum de uma tabela de classificação.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Duas verificações confirmam que os acumuladores estão coerentes: `vitoriasA + vitoriasB + empates` tem que dar o número de partidas, e `pontosA + pontosB` tem que ser `3` por partida decidida mais `2` por empate.',
      },
      {
        kind: 'text',
        body:
          'Quando os pontos empatam, entra o critério de desempate. Em um confronto entre dois times, saldo de gols e gols marcados dão o mesmo resultado — o que um marcou a mais, o outro sofreu.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um empate perfeito, em pontos **e** em gols, é possível e precisa de resposta própria. Deixar a cadeia de `else if` sem um `else` final produziria um campeão indefinido, ou uma variável não inicializada.',
      },
      {
        kind: 'table',
        headers: ['Partidas', 'Pontos A', 'Pontos B', 'Gols A', 'Gols B', 'Campeão'],
        rows: [
          ['`2x1, 0x0, 1x3, 2x2`', '`5`', '`5`', '`5`', '`6`', '`B`'],
          ['`3x0, 1x0`', '`6`', '`0`', '`4`', '`0`', '`A`'],
          ['`1x1`', '`1`', '`1`', '`1`', '`1`', '`empate`'],
        ],
      },
    ],
    quiz: [
      {
        id: 's02c07l08q1',
        type: 'single',
        prompt: 'Depois de 4 partidas com 1 vitória de cada lado e 2 empates, quantos pontos cada time tem?',
        options: [
          { id: 'a', text: 'Cinco cada: 3 da vitória mais 2 dos empates.', correct: true },
          { id: 'b', text: 'Três cada.' },
          { id: 'c', text: 'Quatro cada.' },
          { id: 'd', text: 'Seis cada.' },
        ],
        explanation:
          'Cada empate rende 1 ponto para os dois. Com dois empates são 2 pontos, somados aos 3 da vitória.',
      },
      {
        id: 's02c07l08q2',
        type: 'single',
        prompt: 'Qual invariante confirma que a contagem de resultados está correta?',
        options: [
          { id: 'a', code: 'vitoriasA + vitoriasB + empates == partidas', correct: true },
          { id: 'b', code: 'pontosA + pontosB == partidas * 3' },
          { id: 'c', code: 'golsA == golsB' },
          { id: 'd', code: 'vitoriasA == vitoriasB' },
        ],
        explanation:
          'Toda partida tem exatamente um dos três desfechos. A soma de pontos só daria `partidas * 3` se não houvesse nenhum empate, já que um empate distribui 2 pontos em vez de 3.',
      },
      {
        id: 's02c07l08q3',
        type: 'single',
        prompt: 'Por que a cadeia de desempate precisa de um `else` final?',
        options: [
          { id: 'a', text: 'Porque pontos e gols podem empatar ao mesmo tempo, e esse caso precisa de resposta.', correct: true },
          { id: 'b', text: 'Porque o C# exige `else` em toda cadeia.' },
          { id: 'c', text: 'Para tratar entradas inválidas.' },
          { id: 'd', text: 'Não precisa: sempre há um vencedor.' },
        ],
        explanation:
          'Uma única partida `1x1` já produz empate total. Sem o `else`, a variável do campeão ficaria sem valor atribuído em um caminho possível.',
      },
    ],
    challenge: {
      brief:
        'Dois times disputam uma série de partidas. Leia um inteiro `n` e depois `n` partidas, cada uma em duas linhas: os gols do time A e os gols do time B. Vitória vale 3 pontos, empate vale 1 para cada lado. Gere a tabela final e aponte o campeão.',
      requirements: [
        'Linha 1: `Pontos A: pa`',
        'Linha 2: `Pontos B: pb`',
        'Linha 3: `Gols A: ga`',
        'Linha 4: `Gols B: gb`',
        'Linha 5: `Vitorias A: va`',
        'Linha 6: `Vitorias B: vb`',
        'Linha 7: `Empates: e`',
        'Linha 8: `Campeao: A`, `Campeao: B` ou `Campeao: empate`',
        'O campeão é quem tem mais pontos; empatando em pontos, quem marcou mais gols; empatando nos dois, `empate`',
        'Com `n` igual a 0 tudo fica em zero e o campeão é `empate`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int pontosA = 0;
        int pontosB = 0;
        int golsA = 0;
        int golsB = 0;
        int vitoriasA = 0;
        int vitoriasB = 0;
        int empates = 0;

        // Cada partida: gols de A, depois gols de B

        string campeao = "empate";

        Console.WriteLine($"Pontos A: {pontosA}");
        Console.WriteLine($"Pontos B: {pontosB}");
        Console.WriteLine($"Gols A: {golsA}");
        Console.WriteLine($"Gols B: {golsB}");
        Console.WriteLine($"Vitorias A: {vitoriasA}");
        Console.WriteLine($"Vitorias B: {vitoriasB}");
        Console.WriteLine($"Empates: {empates}");
        Console.WriteLine($"Campeao: {campeao}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int pontosA = 0;
        int pontosB = 0;
        int golsA = 0;
        int golsB = 0;
        int vitoriasA = 0;
        int vitoriasB = 0;
        int empates = 0;

        for (int i = 0; i < n; i++)
        {
            int a = int.Parse(Console.ReadLine());
            int b = int.Parse(Console.ReadLine());

            golsA += a;
            golsB += b;

            if (a > b)
            {
                pontosA += 3;
                vitoriasA++;
            }
            else if (b > a)
            {
                pontosB += 3;
                vitoriasB++;
            }
            else
            {
                pontosA++;
                pontosB++;
                empates++;
            }
        }

        string campeao;

        if (pontosA > pontosB)
        {
            campeao = "A";
        }
        else if (pontosB > pontosA)
        {
            campeao = "B";
        }
        else if (golsA > golsB)
        {
            campeao = "A";
        }
        else if (golsB > golsA)
        {
            campeao = "B";
        }
        else
        {
            campeao = "empate";
        }

        Console.WriteLine($"Pontos A: {pontosA}");
        Console.WriteLine($"Pontos B: {pontosB}");
        Console.WriteLine($"Gols A: {golsA}");
        Console.WriteLine($"Gols B: {golsB}");
        Console.WriteLine($"Vitorias A: {vitoriasA}");
        Console.WriteLine($"Vitorias B: {vitoriasB}");
        Console.WriteLine($"Empates: {empates}");
        Console.WriteLine($"Campeao: {campeao}");
    }
}
`,
      hints: [
        'Os gols são acumulados sempre, antes de decidir o resultado da partida.',
        'A cadeia do campeão tem quatro testes e um `else`: pontos de A, pontos de B, gols de A, gols de B, e o empate total.',
      ],
      tests: [
        {
          name: 'Empate em pontos, decidido por gols',
          stdin: '4\n2\n1\n0\n0\n1\n3\n2\n2\n',
          expectedStdout:
            'Pontos A: 5\nPontos B: 5\nGols A: 5\nGols B: 6\nVitorias A: 1\nVitorias B: 1\nEmpates: 2\nCampeao: B',
        },
        {
          name: 'Time A vence tudo',
          stdin: '2\n3\n0\n1\n0\n',
          expectedStdout:
            'Pontos A: 6\nPontos B: 0\nGols A: 4\nGols B: 0\nVitorias A: 2\nVitorias B: 0\nEmpates: 0\nCampeao: A',
        },
        {
          name: 'Empate total',
          stdin: '1\n1\n1\n',
          expectedStdout:
            'Pontos A: 1\nPontos B: 1\nGols A: 1\nGols B: 1\nVitorias A: 0\nVitorias B: 0\nEmpates: 1\nCampeao: empate',
        },
        {
          name: 'Nenhuma partida disputada',
          stdin: '0\n',
          expectedStdout:
            'Pontos A: 0\nPontos B: 0\nGols A: 0\nGols B: 0\nVitorias A: 0\nVitorias B: 0\nEmpates: 0\nCampeao: empate',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c07l09',
    title: 'Prática: cronômetro de tarefas',
    objective: 'Converter segundos acumulados em tempo formatado, usando divisão, resto e preenchimento com zeros.',
    concept: [
      {
        kind: 'text',
        body:
          'Transformar 3.661 segundos em `01:01:01` é divisão e resto aplicados em cascata — a mesma decomposição em dígitos do capítulo 4, agora com bases 60 e 60 em vez de 10.',
      },
      {
        kind: 'code',
        code: `int horas    = total / 3600;
int minutos  = total % 3600 / 60;
int segundos = total % 60;`,
        caption: 'Cada unidade é o resto da maior dividido pela menor.',
      },
      {
        kind: 'table',
        headers: ['Total', 'Horas', 'Minutos', 'Segundos'],
        rows: [
          ['`90`', '`0`', '`1`', '`30`'],
          ['`335`', '`0`', '`5`', '`35`'],
          ['`3661`', '`1`', '`1`', '`1`'],
        ],
      },
      {
        kind: 'text',
        body:
          'Para exibir com dois dígitos existe um especificador próprio: `D2` preenche o número com zeros à esquerda até o comprimento pedido. Ele só vale para inteiros — o equivalente para reais é o `F` que você já usa.',
      },
      {
        kind: 'code',
        code: `Console.WriteLine($"{5:D2}");        // 05
Console.WriteLine($"{minutos:D2}:{segundos:D2}");`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`D2` preenche, mas nunca **corta**. Um total de 60 minutos exibido em `mm:ss` sai como `60:00`, não como `00:00`. Se o formato precisa de minutos limitados a 59, é a aritmética que tem que extrair as horas — o formato não faz isso sozinho.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A ordem `total % 3600 / 60` importa: primeiro se remove a parte das horas, depois se converte o que sobrou em minutos. Inverter para `total / 60 % 3600` daria o total de minutos, não os minutos da hora corrente.',
      },
    ],
    quiz: [
      {
        id: 's02c07l09q1',
        type: 'single',
        prompt: 'Como 3.661 segundos são exibidos no formato `hh:mm:ss`?',
        options: [
          { id: 'a', code: '01:01:01', correct: true },
          { id: 'b', code: '01:00:61' },
          { id: 'c', code: '00:61:01' },
          { id: 'd', code: '36:61:00' },
        ],
        explanation:
          '3.600 segundos formam uma hora, sobram 61 segundos, que viram 1 minuto e 1 segundo.',
      },
      {
        id: 's02c07l09q2',
        type: 'single',
        prompt: 'O que `$"{7:D2}"` produz?',
        options: [
          { id: 'a', code: '07', correct: true },
          { id: 'b', code: '7.00' },
          { id: 'c', code: '7' },
          { id: 'd', code: '70' },
        ],
        explanation:
          '`D2` formata um inteiro com no mínimo dois dígitos, preenchendo com zero à esquerda. Para casas decimais, o especificador é `F`.',
      },
      {
        id: 's02c07l09q3',
        type: 'single',
        prompt: 'Um acumulado de 3.600 segundos exibido em `mm:ss` produz o quê?',
        options: [
          { id: 'a', code: '60:00', correct: true },
          { id: 'b', code: '00:00' },
          { id: 'c', code: '01:00' },
          { id: 'd', code: '3600:00' },
        ],
        explanation:
          'Sem a extração das horas, o campo de minutos recebe 60 e o `D2` apenas garante o mínimo de dois dígitos. Formatar não é o mesmo que converter.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` durações de tarefas em segundos, cada uma maior ou igual a zero. Para cada tarefa, mostre o tempo acumulado até ali no formato `mm:ss`. No fim, mostre o total no formato `hh:mm:ss` e a duração da tarefa mais longa.',
      requirements: [
        'Uma linha por tarefa: `Tarefa 1: 01:30`, com o acumulado até aquela tarefa',
        'No formato `mm:ss`, os minutos não são limitados a 59: 3.600 segundos saem como `60:00`',
        'Penúltima linha: `Total: 00:05:35`, no formato `hh:mm:ss`',
        'Última linha: `Mais longa: d`, a maior duração individual em segundos',
        'Todos os campos de tempo têm exatamente dois dígitos',
        'Com `n` igual a 0, o total é `00:00:00` e a mais longa é `0`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int acumulado = 0;
        int maisLonga = 0;

        // Acumule e exiba mm:ss a cada tarefa

        Console.WriteLine($"Total: {acumulado / 3600:D2}:{acumulado % 3600 / 60:D2}:{acumulado % 60:D2}");
        Console.WriteLine($"Mais longa: {maisLonga}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int acumulado = 0;
        int maisLonga = 0;

        for (int i = 1; i <= n; i++)
        {
            int duracao = int.Parse(Console.ReadLine());

            acumulado += duracao;

            if (duracao > maisLonga)
            {
                maisLonga = duracao;
            }

            int minutos = acumulado / 60;
            int segundos = acumulado % 60;

            Console.WriteLine($"Tarefa {i}: {minutos:D2}:{segundos:D2}");
        }

        Console.WriteLine($"Total: {acumulado / 3600:D2}:{acumulado % 3600 / 60:D2}:{acumulado % 60:D2}");
        Console.WriteLine($"Mais longa: {maisLonga}");
    }
}
`,
      hints: [
        'No formato `mm:ss` os minutos são simplesmente `acumulado / 60`, sem resto: eles podem passar de 59.',
        'A linha do total já vem pronta no `starterCode`. Ela mostra a decomposição completa em três níveis.',
      ],
      tests: [
        {
          name: 'Três tarefas curtas',
          stdin: '3\n90\n45\n200\n',
          expectedStdout:
            'Tarefa 1: 01:30\nTarefa 2: 02:15\nTarefa 3: 05:35\nTotal: 00:05:35\nMais longa: 200',
        },
        {
          name: 'Minutos passam de 59',
          stdin: '2\n3600\n61\n',
          expectedStdout:
            'Tarefa 1: 60:00\nTarefa 2: 61:01\nTotal: 01:01:01\nMais longa: 3600',
        },
        {
          name: 'Nenhuma tarefa',
          stdin: '0\n',
          expectedStdout: 'Total: 00:00:00\nMais longa: 0',
        },
        {
          name: 'Tarefa de duração zero',
          stdin: '1\n0\n',
          expectedStdout: 'Tarefa 1: 00:00\nTotal: 00:00:00\nMais longa: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c07l10',
    title: 'Boss: simulador de caixa',
    objective: 'Integrar toda a Seção 2 em um sistema com estado de sessão, comandos, validação e relatório financeiro.',
    concept: [
      {
        kind: 'text',
        body:
          'Este é o desafio final da Seção 2. Ele reúne tudo: laço com sentinela, validação de entrada, comandos que mudam o estado, acumuladores de dois níveis, e formatação monetária com `decimal`.',
      },
      {
        kind: 'text',
        body:
          'A novidade estrutural é o **estado de sessão**. Existem dois níveis de acumulação convivendo: o da venda em andamento, que é zerado a cada pagamento, e o do dia inteiro, que sobrevive do início ao fim.',
      },
      {
        kind: 'table',
        headers: ['Nível', 'Variáveis', 'Zerado quando'],
        rows: [
          ['venda atual', 'itens da venda, subtotal', 'a cada `pagar`'],
          ['dia', 'vendas, faturamento, descontos', 'nunca'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Zerar o estado da venda é obrigatório mesmo quando o `pagar` não gera venda nenhuma. Um `pagar` sem itens é ignorado, mas ainda assim encerra a sessão — e esquecer o reajuste faria itens de uma venda vazarem para a seguinte.',
      },
      {
        kind: 'text',
        body:
          'Cada linha da entrada é uma de quatro coisas: o comando `fechar`, o comando `pagar`, um preço válido, ou lixo. A ordem dos testes decide o comportamento, e os comandos precisam vir antes da tentativa de conversão.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Construa em quatro etapas, rodando os testes a cada uma: primeiro só o laço que lê até `fechar` e conta descartes; depois o acúmulo de itens e o `pagar`; depois o desconto; e só então o relatório. Onze linhas de saída de uma vez é um mistério garantido.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que o desconto é calculado sobre o subtotal e **guardado**, em vez de apenas subtraído. Relatórios financeiros precisam saber quanto foi concedido, não só quanto entrou — e essa informação desaparece se você só fizer a subtração.',
      },
    ],
    quiz: [
      {
        id: 's02c07l10q1',
        type: 'single',
        prompt: 'Por que os comandos precisam ser testados antes da tentativa de converter a linha em preço?',
        options: [
          { id: 'a', text: 'Porque `pagar` e `fechar` não são números e cairiam no descarte.', correct: true },
          { id: 'b', text: 'Por questão de desempenho.' },
          { id: 'c', text: 'Porque `TryParse` lança exceção com texto.' },
          { id: 'd', text: 'A ordem é indiferente.' },
        ],
        explanation:
          'A conversão falharia e o `else` contaria os comandos como linhas inválidas. É a mesma regra do teste mais específico primeiro que aparece no FizzBuzz e na régua.',
      },
      {
        id: 's02c07l10q2',
        type: 'single',
        prompt: 'Uma venda de 5 itens somando 25,00 com 10% de desconto fecha em quanto?',
        options: [
          { id: 'a', code: '22.50', correct: true },
          { id: 'b', code: '25.00' },
          { id: 'c', code: '2.50' },
          { id: 'd', code: '20.00' },
        ],
        explanation:
          'O desconto é `25.00 * 0.10 = 2.50`, e o total é `25.00 - 2.50 = 22.50`. Os 2,50 também precisam ser somados ao total de descontos concedidos no dia.',
      },
      {
        id: 's02c07l10q3',
        type: 'multiple',
        prompt: 'Quais situações precisam de tratamento explícito neste simulador?',
        options: [
          { id: 'a', text: 'Um `pagar` sem nenhum item na venda.', correct: true },
          { id: 'b', text: 'Um `fechar` com uma venda ainda aberta.', correct: true },
          { id: 'c', text: 'Um dia sem nenhuma venda, para o ticket médio.', correct: true },
          { id: 'd', text: 'Duas vendas com exatamente o mesmo total.' },
        ],
        explanation:
          'Totais iguais não são um caso especial: a comparação com `>` já mantém a primeira como maior. As outras três ou dividem por zero, ou vazam estado, ou contam uma venda que não existiu.',
      },
    ],
    challenge: {
      brief:
        'Simule o caixa de um mercado durante um dia. A primeira linha traz o valor inicial em caixa. Depois vêm linhas até a palavra `fechar`: um preço positivo adiciona um item à venda em andamento, a palavra `pagar` fecha a venda atual, e qualquer outra coisa é descartada. Vendas com 5 itens ou mais recebem 10% de desconto. Ao `fechar`, uma venda ainda aberta é abandonada. Gere o relatório do dia.',
      requirements: [
        'A cada venda concluída, imprima `Venda 1: 30.00` com o total já com desconto, numerando a partir de 1',
        'Depois: `Vendas: v`, `Itens vendidos: i`, `Itens abandonados: a`',
        'Depois: `Faturamento: f`, `Ticket medio: t`, `Maior venda: m`, `Descontos: d`',
        'Por último: `Descartadas: x` e `Caixa final: c`',
        'Todos os valores monetários com duas casas decimais',
        'Um `pagar` sem itens não gera venda, mas ainda zera a venda em andamento',
        'O desconto de 10% vale a partir de 5 itens, inclusive',
        '`Itens abandonados` conta os itens da venda que ficou aberta no `fechar`',
        'O ticket médio é o faturamento dividido pelo número de vendas, ou `0.00` sem vendas',
        'O caixa final é o valor inicial mais o faturamento',
        'Preços menores ou iguais a zero são descartados',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        decimal caixa = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);

        int vendas = 0;
        int itensVendidos = 0;
        decimal faturamento = 0m;
        decimal maiorVenda = 0m;
        decimal descontos = 0m;
        int descartadas = 0;

        int itensVenda = 0;
        decimal subtotal = 0m;

        string linha = Console.ReadLine();

        // fechar encerra o dia. pagar fecha a venda. numero positivo e item.

        decimal ticket = 0m;

        Console.WriteLine($"Vendas: {vendas}");
        Console.WriteLine($"Itens vendidos: {itensVendidos}");
        Console.WriteLine($"Itens abandonados: {itensVenda}");
        Console.WriteLine($"Faturamento: {faturamento:F2}");
        Console.WriteLine($"Ticket medio: {ticket:F2}");
        Console.WriteLine($"Maior venda: {maiorVenda:F2}");
        Console.WriteLine($"Descontos: {descontos:F2}");
        Console.WriteLine($"Descartadas: {descartadas}");
        Console.WriteLine($"Caixa final: {caixa + faturamento:F2}");
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        decimal caixa = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);

        int vendas = 0;
        int itensVendidos = 0;
        decimal faturamento = 0m;
        decimal maiorVenda = 0m;
        decimal descontos = 0m;
        int descartadas = 0;

        int itensVenda = 0;
        decimal subtotal = 0m;

        string linha = Console.ReadLine();

        while (linha != "fechar")
        {
            if (linha == "pagar")
            {
                if (itensVenda > 0)
                {
                    decimal desconto = 0m;

                    if (itensVenda >= 5)
                    {
                        desconto = subtotal * 0.10m;
                    }

                    decimal total = subtotal - desconto;

                    vendas++;
                    itensVendidos += itensVenda;
                    faturamento += total;
                    descontos += desconto;

                    if (total > maiorVenda)
                    {
                        maiorVenda = total;
                    }

                    Console.WriteLine($"Venda {vendas}: {total:F2}");
                }

                itensVenda = 0;
                subtotal = 0m;
            }
            else if (decimal.TryParse(
                linha, NumberStyles.Number, CultureInfo.InvariantCulture, out decimal preco)
                && preco > 0m)
            {
                itensVenda++;
                subtotal += preco;
            }
            else
            {
                descartadas++;
            }

            linha = Console.ReadLine();
        }

        decimal ticket = vendas > 0 ? faturamento / vendas : 0m;

        Console.WriteLine($"Vendas: {vendas}");
        Console.WriteLine($"Itens vendidos: {itensVendidos}");
        Console.WriteLine($"Itens abandonados: {itensVenda}");
        Console.WriteLine($"Faturamento: {faturamento:F2}");
        Console.WriteLine($"Ticket medio: {ticket:F2}");
        Console.WriteLine($"Maior venda: {maiorVenda:F2}");
        Console.WriteLine($"Descontos: {descontos:F2}");
        Console.WriteLine($"Descartadas: {descartadas}");
        Console.WriteLine($"Caixa final: {caixa + faturamento:F2}");
    }
}
`,
      hints: [
        'A ordem dos testes no laço é: `pagar` primeiro, depois a conversão para preço, e o `else` fica com o descarte. O `fechar` já está na condição do `while`.',
        'O reajuste `itensVenda = 0; subtotal = 0m;` fica **fora** do `if (itensVenda > 0)`, para valer também quando o `pagar` não gera venda.',
        'Como `itensVenda` só é zerado no `pagar`, ao sair do laço ele já contém exatamente os itens abandonados — a linha do relatório usa essa variável direto.',
      ],
      tests: [
        {
          name: 'Dia com desconto, descarte e venda abandonada',
          stdin: '100.00\n10.00\n20.00\npagar\n5.00\n5.00\n5.00\n5.00\n5.00\npagar\nabc\n30.00\nfechar\n',
          expectedStdout:
            'Venda 1: 30.00\nVenda 2: 22.50\nVendas: 2\nItens vendidos: 7\nItens abandonados: 1\n' +
            'Faturamento: 52.50\nTicket medio: 26.25\nMaior venda: 30.00\nDescontos: 2.50\n' +
            'Descartadas: 1\nCaixa final: 152.50',
        },
        {
          name: 'Uma venda simples sem desconto',
          stdin: '50.00\n15.50\n4.50\npagar\nfechar\n',
          expectedStdout:
            'Venda 1: 20.00\nVendas: 1\nItens vendidos: 2\nItens abandonados: 0\n' +
            'Faturamento: 20.00\nTicket medio: 20.00\nMaior venda: 20.00\nDescontos: 0.00\n' +
            'Descartadas: 0\nCaixa final: 70.00',
        },
        {
          name: 'Dia sem nenhuma venda',
          stdin: '0.00\nfechar\n',
          expectedStdout:
            'Vendas: 0\nItens vendidos: 0\nItens abandonados: 0\n' +
            'Faturamento: 0.00\nTicket medio: 0.00\nMaior venda: 0.00\nDescontos: 0.00\n' +
            'Descartadas: 0\nCaixa final: 0.00',
        },
        {
          name: 'Pagamento vazio e preços inválidos',
          stdin: '10.00\npagar\n-5.00\nxyz\n2.00\n3.00\n4.00\n5.00\n6.00\npagar\nfechar\n',
          expectedStdout:
            'Venda 1: 18.00\nVendas: 1\nItens vendidos: 5\nItens abandonados: 0\n' +
            'Faturamento: 18.00\nTicket medio: 18.00\nMaior venda: 18.00\nDescontos: 2.00\n' +
            'Descartadas: 2\nCaixa final: 28.00',
        },
        {
          name: 'Exatamente quatro itens não recebem desconto',
          stdin: '0.00\n1.00\n1.00\n1.00\n1.00\npagar\nfechar\n',
          expectedStdout:
            'Venda 1: 4.00\nVendas: 1\nItens vendidos: 4\nItens abandonados: 0\n' +
            'Faturamento: 4.00\nTicket medio: 4.00\nMaior venda: 4.00\nDescontos: 0.00\n' +
            'Descartadas: 0\nCaixa final: 4.00',
          hidden: true,
        },
      ],
    },
  },
]
