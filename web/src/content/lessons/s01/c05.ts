import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's01c05l01',
    title: 'Concatenação de strings',
    objective: 'Juntar textos com + e entender por que isso é diferente de somar.',
    concept: [
      {
        kind: 'text',
        body:
          'Você já usou `+` com texto várias vezes. Vale entender o que acontece por dentro: quando um dos lados é `string`, C# chama `ToString()` no outro lado e cola os dois numa string nova.',
      },
      {
        kind: 'code',
        code: `string nome = "Ana";
int idade = 28;

string frase = nome + " tem " + idade + " anos";
Console.WriteLine(frase);   // Ana tem 28 anos`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Strings em C# são **imutáveis**: nenhuma operação altera a string original, todas criam uma nova. `frase + "!"` não modifica `frase`, produz outra string.',
      },
      {
        kind: 'text',
        body:
          'A concatenação é avaliada da esquerda para a direita, e é aí que mora a pegadinha de somar números dentro de uma frase.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Sem parênteses',
          code: `int a = 2, b = 3;
Console.WriteLine("R: " + a + b);
// R: 23`,
        },
        right: {
          label: 'Com parênteses',
          code: `int a = 2, b = 3;
Console.WriteLine("R: " + (a + b));
// R: 5`,
        },
      },
      {
        kind: 'text',
        body:
          'Para juntar muitos pedaços existe `string.Concat(a, b, c)`, e para texto vazio existe `string.Empty`, que é o mesmo que `""` mas deixa a intenção explícita.',
      },
    ],
    quiz: [
      {
        id: 's01c05l01q1',
        type: 'single',
        prompt: 'Qual é a saída?',
        code: `int x = 10;
Console.WriteLine("v=" + x + 5 + "!");`,
        options: [
          { id: 'a', code: 'v=105!', correct: true },
          { id: 'b', code: 'v=15!' },
          { id: 'c', code: 'v=10 5!' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          'A avaliação segue da esquerda: `"v=" + 10` vira `"v=10"`, e somar `5` a uma string concatena, dando `"v=105"`.',
      },
      {
        id: 's01c05l01q2',
        type: 'single',
        prompt: 'O que significa dizer que `string` é imutável em C#?',
        options: [
          {
            id: 'a',
            text: 'Qualquer operação sobre uma string produz uma nova string; a original nunca muda.',
            correct: true,
          },
          { id: 'b', text: 'Uma variável string não pode receber outro valor depois de declarada.' },
          { id: 'c', text: 'Strings não podem ser comparadas com `==`.' },
          { id: 'd', text: 'Strings ocupam um tamanho fixo na memória.' },
        ],
        explanation:
          'A variável pode apontar para outra string quando quiser. O que não muda é o conteúdo de uma string já criada.',
      },
      {
        id: 's01c05l01q3',
        type: 'single',
        prompt: 'Qual expressão produz `Total: R$ 50`?',
        options: [
          { id: 'a', code: '"Total: R$ " + (20 + 30)', correct: true },
          { id: 'b', code: '"Total: R$ " + 20 + 30' },
          { id: 'c', code: '"Total: R$" + 20 + 30' },
          { id: 'd', code: '"Total: " + "R$" + 50' },
        ],
        explanation:
          'A soma precisa de parênteses para acontecer antes da concatenação. A opção D esqueceu o espaço depois de `R$`.',
      },
    ],
    challenge: {
      brief:
        'Leia três linhas — produto, quantidade e preço unitário — e monte uma linha de recibo por concatenação, incluindo o total calculado.',
      requirements: [
        'Saída em uma linha: `3x Caderno = R$ 41.70`',
        'A quantidade e o preço vêm da entrada e o total é calculado',
        'Use `decimal` para o preço e `CultureInfo.InvariantCulture` na leitura',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        string produto = Console.ReadLine();
        int quantidade = int.Parse(Console.ReadLine());
        decimal preco = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);

        // Monte a linha do recibo
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        string produto = Console.ReadLine();
        int quantidade = int.Parse(Console.ReadLine());
        decimal preco = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);

        decimal total = preco * quantidade;
        Console.WriteLine(quantidade + "x " + produto + " = R$ " + total);
    }
}
`,
      hints: [
        'Calcule o total numa variável antes de montar a frase.',
        'Preste atenção nos espaços: há um depois do `x`, um antes e um depois do `=`.',
      ],
      tests: [
        {
          name: 'Três cadernos',
          stdin: 'Caderno\n3\n13.90\n',
          expectedStdout: '3x Caderno = R$ 41.70',
        },
        {
          name: 'Item único',
          stdin: 'Mochila\n1\n189.00\n',
          expectedStdout: '1x Mochila = R$ 189.00',
        },
      ],
    },
  },
  {
    id: 's01c05l02',
    title: 'Interpolação com $',
    objective: 'Escrever strings com valores embutidos de forma legível e formatar números na saída.',
    concept: [
      {
        kind: 'text',
        body:
          'Concatenar com `+` funciona, mas fica ilegível rápido. A interpolação resolve: coloque `$` antes das aspas e escreva expressões dentro de `{ }`.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Concatenação',
          code: `Console.WriteLine("Ola, " + nome +
    "! Voce tem " + idade +
    " anos e paga " + valor + ".");`,
        },
        right: {
          label: 'Interpolação',
          code: `Console.WriteLine(
    $"Ola, {nome}! Voce tem {idade} anos e paga {valor}.");`,
        },
        note: 'Mesmo resultado, muito menos ruído visual.',
      },
      {
        kind: 'text',
        body:
          'Dentro das chaves cabe qualquer expressão, não só uma variável. E depois de dois-pontos você pode passar um formato.',
      },
      {
        kind: 'code',
        code: `int a = 7, b = 3;
double taxa = 0.0825;
decimal preco = 1234.5m;

Console.WriteLine($"Soma: {a + b}");              // Soma: 10
Console.WriteLine($"Preco: {preco:F2}");          // Preco: 1234.50
Console.WriteLine($"Taxa: {taxa:P1}");            // Taxa: 8.3 %
Console.WriteLine($"Codigo: {a:000}");            // Codigo: 007`,
      },
      {
        kind: 'table',
        headers: ['Formato', 'Efeito', 'Exemplo'],
        rows: [
          ['`F2`', 'duas casas decimais fixas', '`1234.50`'],
          ['`N2`', 'com separador de milhar', '`1,234.50`'],
          ['`P1`', 'porcentagem', '`8.3 %`'],
          ['`000`', 'preenche com zeros', '`007`'],
          ['`C`', 'moeda da cultura atual', '`$1,234.50`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Para imprimir uma chave literal numa string interpolada, dobre-a: `$"{{literal}}"` produz `{literal}`.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O formato também depende da cultura. Na cultura invariante usada por este curso, `P1` gera `8.3 %` **com espaço** antes do símbolo, enquanto em en-US sairia `8.3%`. Vale conferir a saída real em vez de supor.',
      },
    ],
    quiz: [
      {
        id: 's01c05l02q1',
        type: 'single',
        prompt: 'Qual é a saída, com `n` valendo 4?',
        code: 'Console.WriteLine($"{n} ao quadrado e {n * n}");',
        options: [
          { id: 'a', code: '4 ao quadrado e 16', correct: true },
          { id: 'b', code: '{n} ao quadrado e {n * n}' },
          { id: 'c', code: '4 ao quadrado e 4 * 4' },
          { id: 'd', text: 'Erro de compilação: expressões não são permitidas' },
        ],
        explanation:
          'Qualquer expressão válida funciona dentro das chaves, incluindo contas, chamadas de método e comparações.',
      },
      {
        id: 's01c05l02q2',
        type: 'single',
        prompt: 'Como imprimir `19.90` a partir de `decimal v = 19.9m;`?',
        options: [
          { id: 'a', code: '$"{v:F2}"', correct: true },
          { id: 'b', code: '$"{v}"' },
          { id: 'c', code: '$"{v:00}"' },
          { id: 'd', code: '$"{v:P2}"' },
        ],
        explanation:
          '`F2` fixa duas casas decimais. Sem formato sairia `19.9`, e `P2` transformaria em porcentagem.',
      },
      {
        id: 's01c05l02q3',
        type: 'single',
        prompt: 'O que está errado em `Console.WriteLine("Ola, {nome}!");`?',
        options: [
          { id: 'a', text: 'Falta o `$` antes das aspas, então as chaves saem literais.', correct: true },
          { id: 'b', text: 'Interpolação não aceita ponto de exclamação.' },
          { id: 'c', text: 'Deveria usar aspas simples.' },
          { id: 'd', text: 'Nada, o código funciona.' },
        ],
        explanation:
          'Sem o `$` é uma string comum, e a saída é literalmente `Ola, {nome}!`. Esse erro não gera aviso do compilador.',
      },
    ],
    challenge: {
      brief:
        'Leia o nome de um produto, o preço e a alíquota de imposto (como fração, por exemplo `0.18`). Imprima um cartão de preço formatado usando interpolação.',
      requirements: [
        'Linha 1: `Produto: Fone Bluetooth`',
        'Linha 2: `Preco: 249.90`',
        'Linha 3: `Imposto: 18.0 %` (a cultura invariante inclui o espaço)',
        'Linha 4: `Final: 294.88`',
        'Use interpolação com `$` e os formatos `F2` e `P1`',
        'O valor final é preço mais imposto, formatado com 2 casas',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        string produto = Console.ReadLine();
        decimal preco = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        decimal aliquota = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);

        // Monte o cartao de preco com interpolacao
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        string produto = Console.ReadLine();
        decimal preco = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        decimal aliquota = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);

        decimal final = preco + (preco * aliquota);

        Console.WriteLine($"Produto: {produto}");
        Console.WriteLine($"Preco: {preco:F2}");
        Console.WriteLine($"Imposto: {aliquota:P1}");
        Console.WriteLine($"Final: {final:F2}");
    }
}
`,
      hints: [
        'O formato `P1` já multiplica por 100 e acrescenta o símbolo de porcentagem.',
        'O `F2` arredonda para exibição, então você não precisa arredondar o valor antes.',
      ],
      tests: [
        {
          name: 'Fone com 18% de imposto',
          stdin: 'Fone Bluetooth\n249.90\n0.18\n',
          expectedStdout:
            'Produto: Fone Bluetooth\nPreco: 249.90\nImposto: 18.0 %\nFinal: 294.88',
        },
      ],
    },
  },
  {
    id: 's01c05l03',
    title: 'Length e acesso por índice',
    objective: 'Medir o tamanho de um texto e acessar caracteres individuais sem estourar os limites.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma `string` é uma sequência de caracteres. `Length` diz quantos são, e `[i]` devolve o caractere na posição `i`, contando **do zero**.',
      },
      {
        kind: 'code',
        code: `string palavra = "Csharp";

Console.WriteLine(palavra.Length);      // 6
Console.WriteLine(palavra[0]);          // C
Console.WriteLine(palavra[5]);          // p
Console.WriteLine(palavra[^1]);         // p  (^1 = ultimo)`,
      },
      {
        kind: 'table',
        headers: ['Índice', '0', '1', '2', '3', '4', '5'],
        rows: [['Caractere', 'C', 's', 'h', 'a', 'r', 'p']],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O último índice válido é `Length - 1`. Acessar `palavra[6]` numa string de 6 caracteres lança `IndexOutOfRangeException`. Esse é o erro mais comum ao mexer com índices.',
      },
      {
        kind: 'text',
        body:
          'O índice a partir do fim, escrito `^1`, evita a conta manual: `s[^1]` é o último caractere e `s[^2]` o penúltimo. Uma string vazia tem `Length` igual a `0` e nenhum índice válido.',
      },
      {
        kind: 'code',
        code: `string s = Console.ReadLine();

if (s.Length > 0)
{
    Console.WriteLine($"Primeira: {s[0]}, ultima: {s[^1]}");
}
else
{
    Console.WriteLine("Texto vazio");
}`,
        caption: 'Sempre verifique Length antes de indexar texto vindo de fora.',
      },
    ],
    quiz: [
      {
        id: 's01c05l03q1',
        type: 'single',
        prompt: 'Para `string s = "Ola";`, qual é o valor de `s[s.Length - 1]`?',
        options: [
          { id: 'a', code: 'a', correct: true },
          { id: 'b', code: 'l' },
          { id: 'c', code: 'O' },
          { id: 'd', text: 'IndexOutOfRangeException' },
        ],
        explanation:
          '`Length` é 3, então o índice é 2, que é o último caractere. É o mesmo que `s[^1]`.',
      },
      {
        id: 's01c05l03q2',
        type: 'single',
        prompt: 'Qual é o tipo de `s[0]`?',
        options: [
          { id: 'a', code: 'char', correct: true },
          { id: 'b', code: 'string' },
          { id: 'c', code: 'int' },
          { id: 'd', code: 'byte' },
        ],
        explanation:
          'Indexar uma string devolve um `char`. Se você precisa de uma `string` de um caractere, use `s.Substring(0, 1)` ou `s[0].ToString()`.',
      },
      {
        id: 's01c05l03q3',
        type: 'single',
        prompt: 'O que este código lança quando a entrada é uma linha vazia?',
        code: `string s = Console.ReadLine();
Console.WriteLine(s[0]);`,
        options: [
          { id: 'a', code: 'IndexOutOfRangeException', correct: true },
          { id: 'b', code: 'NullReferenceException' },
          { id: 'c', code: 'FormatException' },
          { id: 'd', text: 'Nada, imprime uma linha vazia' },
        ],
        explanation:
          'Uma linha vazia é a string `""`, que existe mas tem `Length` zero. Por isso o erro é de índice, não de referência nula.',
      },
    ],
    challenge: {
      brief:
        'Leia uma palavra e imprima seu tamanho, o primeiro caractere, o último caractere, e as iniciais em maiúsculo formando uma sigla de 2 letras (primeiro e último).',
      requirements: [
        'Linha 1: `Tamanho: 11`',
        'Linha 2: `Primeiro: p`',
        'Linha 3: `Ultimo: o`',
        'Linha 4: `Sigla: PO`',
        'Use `Length`, indexação e `char.ToUpper`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        string palavra = Console.ReadLine();

        // Tamanho, extremos e sigla
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        string palavra = Console.ReadLine();

        char primeiro = palavra[0];
        char ultimo = palavra[^1];

        Console.WriteLine($"Tamanho: {palavra.Length}");
        Console.WriteLine($"Primeiro: {primeiro}");
        Console.WriteLine($"Ultimo: {ultimo}");
        Console.WriteLine($"Sigla: {char.ToUpper(primeiro)}{char.ToUpper(ultimo)}");
    }
}
`,
      hints: [
        '`palavra[^1]` é o último caractere, sem precisar calcular `Length - 1`.',
        '`char.ToUpper(c)` converte um caractere; `palavra.ToUpper()` converteria a string inteira.',
        'Duas interpolações seguidas, `{a}{b}`, colam os dois caracteres sem separador.',
      ],
      tests: [
        {
          name: 'Palavra programacao',
          stdin: 'programacao\n',
          expectedStdout: 'Tamanho: 11\nPrimeiro: p\nUltimo: o\nSigla: PO',
        },
        {
          name: 'Palavra de uma letra',
          stdin: 'x\n',
          expectedStdout: 'Tamanho: 1\nPrimeiro: x\nUltimo: x\nSigla: XX',
        },
      ],
    },
  },
  {
    id: 's01c05l04',
    title: 'Maiúsculas, minúsculas e Trim',
    objective: 'Normalizar texto para comparar e armazenar de forma consistente.',
    concept: [
      {
        kind: 'text',
        body:
          'Texto digitado por gente vem sujo: espaços sobrando, maiúsculas inconsistentes. Normalizar antes de comparar ou salvar evita bugs que parecem impossíveis.',
      },
      {
        kind: 'code',
        code: `string bruto = "   Ana Silva  ";

Console.WriteLine($"[{bruto.Trim()}]");        // [Ana Silva]
Console.WriteLine(bruto.Trim().ToUpper());     // ANA SILVA
Console.WriteLine(bruto.Trim().ToLower());     // ana silva`,
      },
      {
        kind: 'table',
        headers: ['Método', 'O que faz'],
        rows: [
          ['`Trim()`', 'remove espaços das duas pontas'],
          ['`TrimStart()`', 'remove só do começo'],
          ['`TrimEnd()`', 'remove só do fim'],
          ['`ToUpper()`', 'tudo em maiúsculas'],
          ['`ToLower()`', 'tudo em minúsculas'],
          ['`string.IsNullOrWhiteSpace(s)`', 'true se é null, vazia ou só espaços'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Como strings são imutáveis, `bruto.Trim()` **não altera** `bruto`. Você precisa usar o retorno: `bruto = bruto.Trim();`. Chamar o método e ignorar o resultado é um erro silencioso frequente.',
      },
      {
        kind: 'text',
        body:
          'Para comparar ignorando maiúsculas, prefira `string.Equals` com a opção adequada em vez de converter os dois lados. É mais rápido e mais correto com acentos.',
      },
      {
        kind: 'code',
        code: `string digitado = "  ADMIN ";
string esperado = "admin";

bool igual = string.Equals(
    digitado.Trim(),
    esperado,
    StringComparison.OrdinalIgnoreCase);

Console.WriteLine(igual);   // True`,
      },
    ],
    quiz: [
      {
        id: 's01c05l04q1',
        type: 'single',
        prompt: 'Por que este código imprime `   ana  ` com os espaços?',
        code: `string s = "   ana  ";
s.Trim();
Console.WriteLine($"[{s}]");`,
        options: [
          {
            id: 'a',
            text: 'Porque `Trim` devolve uma nova string e o retorno foi descartado.',
            correct: true,
          },
          { id: 'b', text: 'Porque `Trim` só remove tabulações, não espaços.' },
          { id: 'c', text: 'Porque falta chamar `ToLower` antes.' },
          { id: 'd', text: 'Porque a interpolação reinsere os espaços.' },
        ],
        explanation:
          'Imutabilidade em ação. O código correto é `s = s.Trim();`. O compilador não avisa porque descartar um retorno é legal.',
      },
      {
        id: 's01c05l04q2',
        type: 'single',
        prompt: 'Qual verificação detecta uma entrada que contém apenas espaços?',
        options: [
          { id: 'a', code: 'string.IsNullOrWhiteSpace(s)', correct: true },
          { id: 'b', code: 's == ""' },
          { id: 'c', code: 's.Length == 0' },
          { id: 'd', code: 's == null' },
        ],
        explanation:
          'Uma string com três espaços tem `Length` 3 e não é igual a `""`. Só `IsNullOrWhiteSpace` cobre os três casos de "sem conteúdo útil".',
      },
      {
        id: 's01c05l04q3',
        type: 'single',
        prompt: 'Qual é a melhor forma de comparar um login digitado com o valor armazenado?',
        options: [
          {
            id: 'a',
            code: 'string.Equals(digitado.Trim(), salvo, StringComparison.OrdinalIgnoreCase)',
            correct: true,
          },
          { id: 'b', code: 'digitado == salvo' },
          { id: 'c', code: 'digitado.ToUpper() == salvo' },
          { id: 'd', code: 'digitado.Length == salvo.Length' },
        ],
        explanation:
          'Ela trata espaços e diferença de caixa de forma explícita. A opção C só funciona se o valor salvo também estiver em maiúsculas.',
      },
    ],
    challenge: {
      brief:
        'Leia duas linhas: um e-mail digitado no cadastro e o e-mail já salvo no banco. Normalize o digitado e informe se são o mesmo endereço, mostrando também a versão normalizada.',
      requirements: [
        'Linha 1: `Normalizado: ana.silva@email.com`',
        'Linha 2: `Tamanho: 19`',
        'Linha 3: `Ja cadastrado: True`',
        'Normalizar significa remover espaços das pontas e passar para minúsculas',
        'A comparação usa o e-mail normalizado',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        string digitado = Console.ReadLine();
        string salvo = Console.ReadLine();

        // Normalize e compare
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        string digitado = Console.ReadLine();
        string salvo = Console.ReadLine();

        string normalizado = digitado.Trim().ToLower();
        bool jaCadastrado = string.Equals(normalizado, salvo, StringComparison.Ordinal);

        Console.WriteLine($"Normalizado: {normalizado}");
        Console.WriteLine($"Tamanho: {normalizado.Length}");
        Console.WriteLine($"Ja cadastrado: {jaCadastrado}");
    }
}
`,
      hints: [
        'Encadeie as chamadas: `digitado.Trim().ToLower()`.',
        'Guarde o resultado numa variável, porque você vai usá-lo três vezes.',
      ],
      tests: [
        {
          name: 'E-mail com espaços e maiúsculas',
          stdin: '  Ana.Silva@Email.com \nana.silva@email.com\n',
          expectedStdout:
            'Normalizado: ana.silva@email.com\nTamanho: 19\nJa cadastrado: True',
        },
        {
          name: 'E-mail diferente',
          stdin: 'BRUNO@EMAIL.COM\nana.silva@email.com\n',
          expectedStdout:
            'Normalizado: bruno@email.com\nTamanho: 15\nJa cadastrado: False',
        },
      ],
    },
  },
  {
    id: 's01c05l05',
    title: 'Substring: recortando texto',
    objective: 'Extrair pedaços de uma string por posição e tamanho sem estourar limites.',
    concept: [
      {
        kind: 'text',
        body:
          '`Substring` recorta um trecho. Ele tem duas formas: a partir de uma posição até o fim, ou a partir de uma posição com um tamanho definido.',
      },
      {
        kind: 'code',
        code: `string codigo = "BR-2024-0871";

Console.WriteLine(codigo.Substring(3));        // 2024-0871
Console.WriteLine(codigo.Substring(0, 2));     // BR
Console.WriteLine(codigo.Substring(3, 4));     // 2024`,
        caption: 'O segundo argumento é o comprimento, não o índice final.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Confundir comprimento com índice final é a origem de metade dos `ArgumentOutOfRangeException`. `Substring(3, 4)` pega 4 caracteres começando no índice 3, ou seja, os índices 3, 4, 5 e 6.',
      },
      {
        kind: 'text',
        body:
          'C# também oferece a sintaxe de intervalo com `..`, que muitas vezes é mais legível. Aqui o segundo número **é** o índice final, exclusivo.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Substring',
          code: `s.Substring(0, 2)   // "BR"
s.Substring(3, 4)   // "2024"
s.Substring(8)      // "0871"`,
        },
        right: {
          label: 'Intervalo',
          code: `s[0..2]    // "BR"
s[3..7]    // "2024"
s[8..]     // "0871"`,
        },
        note: 'Em s[3..7] o índice 7 fica de fora. Escolha um estilo e mantenha.',
      },
      {
        kind: 'text',
        body:
          'Antes de recortar texto que veio de fora, confirme o tamanho. `s.Length >= 4` é uma guarda simples que evita a exceção.',
      },
    ],
    quiz: [
      {
        id: 's01c05l05q1',
        type: 'single',
        prompt: 'Para `string s = "abcdefgh";`, quanto vale `s.Substring(2, 3)`?',
        options: [
          { id: 'a', code: 'cde', correct: true },
          { id: 'b', code: 'cd' },
          { id: 'c', code: 'bcd' },
          { id: 'd', code: 'defgh' },
        ],
        explanation: 'Começa no índice 2 (`c`) e pega 3 caracteres: `c`, `d` e `e`.',
      },
      {
        id: 's01c05l05q2',
        type: 'single',
        prompt: 'Qual expressão é equivalente a `s.Substring(2, 3)`?',
        options: [
          { id: 'a', code: 's[2..5]', correct: true },
          { id: 'b', code: 's[2..3]' },
          { id: 'c', code: 's[2..^3]' },
          { id: 'd', code: 's[3..5]' },
        ],
        explanation:
          'Comprimento 3 a partir de 2 termina no índice 5 exclusivo. A conta é sempre `inicio + comprimento`.',
      },
      {
        id: 's01c05l05q3',
        type: 'single',
        prompt: 'O que acontece em `"abc".Substring(1, 5)`?',
        options: [
          { id: 'a', code: 'ArgumentOutOfRangeException', correct: true },
          { id: 'b', text: 'Devolve `"bc"`, truncando no que existe' },
          { id: 'c', text: 'Devolve `"bc  "` com espaços' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          '`Substring` não tolera pedir mais do que existe. Se você quer o comportamento tolerante, calcule o comprimento com `Math.Min`.',
      },
    ],
    challenge: {
      brief:
        'Leia um código de nota fiscal no formato `UF-AAAA-NNNN` (2 letras, ano de 4 dígitos, número de 4 dígitos) e imprima cada parte separadamente, além do número convertido para inteiro.',
      requirements: [
        'Linha 1: `UF: SP`',
        'Linha 2: `Ano: 2024`',
        'Linha 3: `Numero: 871`',
        'Linha 4: `Sequencial: 0871`',
        '`Numero` é o sequencial convertido para `int`, sem os zeros à esquerda',
        'Use `Substring` ou intervalos, sem depender de `Split`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        string codigo = Console.ReadLine();

        // Recorte UF, ano e sequencial
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        string codigo = Console.ReadLine();

        string uf = codigo.Substring(0, 2);
        string ano = codigo.Substring(3, 4);
        string sequencial = codigo.Substring(8, 4);
        int numero = int.Parse(sequencial);

        Console.WriteLine($"UF: {uf}");
        Console.WriteLine($"Ano: {ano}");
        Console.WriteLine($"Numero: {numero}");
        Console.WriteLine($"Sequencial: {sequencial}");
    }
}
`,
      hints: [
        'Conte as posições: `S`=0, `P`=1, `-`=2, ano começa em 3, o segundo `-` está em 7 e o sequencial em 8.',
        '`int.Parse("0871")` devolve `871`: zeros à esquerda são aceitos e descartados.',
      ],
      tests: [
        {
          name: 'Nota de São Paulo',
          stdin: 'SP-2024-0871\n',
          expectedStdout: 'UF: SP\nAno: 2024\nNumero: 871\nSequencial: 0871',
        },
        {
          name: 'Nota do Rio Grande do Sul',
          stdin: 'RS-2019-1500\n',
          expectedStdout: 'UF: RS\nAno: 2019\nNumero: 1500\nSequencial: 1500',
        },
      ],
    },
  },
  {
    id: 's01c05l06',
    title: 'IndexOf e Contains',
    objective: 'Localizar trechos dentro de um texto e reagir quando não são encontrados.',
    concept: [
      {
        kind: 'text',
        body:
          '`Contains` responde uma pergunta de sim ou não. `IndexOf` vai além e diz **onde** o trecho começa, devolvendo `-1` quando não encontra.',
      },
      {
        kind: 'code',
        code: `string email = "ana.silva@empresa.com";

Console.WriteLine(email.Contains("@"));        // True
Console.WriteLine(email.IndexOf("@"));         // 9
Console.WriteLine(email.IndexOf("xyz"));       // -1
Console.WriteLine(email.LastIndexOf("."));     // 18`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Esse `-1` é traiçoeiro: se você passar direto para `Substring`, o erro que aparece é um `ArgumentOutOfRangeException` sem relação óbvia com a busca. Sempre teste `!= -1` antes de usar o índice.',
      },
      {
        kind: 'code',
        code: `int arroba = email.IndexOf("@");

if (arroba != -1)
{
    string usuario = email.Substring(0, arroba);
    string dominio = email.Substring(arroba + 1);
    Console.WriteLine($"{usuario} em {dominio}");
}
else
{
    Console.WriteLine("Sem arroba");
}`,
        caption: 'O padrão canônico: buscar, verificar, recortar.',
      },
      {
        kind: 'table',
        headers: ['Método', 'Devolve'],
        rows: [
          ['`Contains(t)`', '`bool`'],
          ['`IndexOf(t)`', 'primeira posição ou `-1`'],
          ['`LastIndexOf(t)`', 'última posição ou `-1`'],
          ['`StartsWith(t)`', '`bool`'],
          ['`EndsWith(t)`', '`bool`'],
        ],
      },
    ],
    quiz: [
      {
        id: 's01c05l06q1',
        type: 'single',
        prompt: 'Quanto vale `"banana".IndexOf("na")`?',
        options: [
          { id: 'a', code: '2', correct: true },
          { id: 'b', code: '4' },
          { id: 'c', code: '1' },
          { id: 'd', code: '-1' },
        ],
        explanation:
          '`IndexOf` devolve a **primeira** ocorrência: `b`=0, `a`=1, `n`=2. Para a segunda ocorrência, `LastIndexOf` devolveria 4.',
      },
      {
        id: 's01c05l06q2',
        type: 'single',
        prompt: 'Por que este código pode lançar exceção?',
        code: `int i = texto.IndexOf(",");
string antes = texto.Substring(0, i);`,
        options: [
          {
            id: 'a',
            text: 'Se não houver vírgula, `i` vale -1 e `Substring` não aceita comprimento negativo.',
            correct: true,
          },
          { id: 'b', text: 'Porque `IndexOf` só funciona com `char`, não com `string`.' },
          { id: 'c', text: 'Porque `Substring` precisa de dois argumentos positivos sempre iguais.' },
          { id: 'd', text: 'Não pode lançar exceção, é seguro.' },
        ],
        explanation:
          'Faltou a guarda `if (i != -1)`. É o bug clássico de parsing manual de texto.',
      },
      {
        id: 's01c05l06q3',
        type: 'single',
        prompt: 'Como verificar se um nome de arquivo termina em `.csv` ignorando maiúsculas?',
        options: [
          {
            id: 'a',
            code: 'nome.EndsWith(".csv", StringComparison.OrdinalIgnoreCase)',
            correct: true,
          },
          { id: 'b', code: 'nome.Contains(".csv")' },
          { id: 'c', code: 'nome.IndexOf(".csv") > 0' },
          { id: 'd', code: 'nome.EndsWith("csv")' },
        ],
        explanation:
          '`EndsWith` com `StringComparison` cobre `.CSV` e `.Csv`. As opções B e C dariam true para `dados.csv.bak`, que não é um CSV.',
      },
    ],
    challenge: {
      brief:
        'Leia um endereço de e-mail e quebre-o em usuário e domínio. Se não houver `@`, imprima uma mensagem de erro em vez de tentar recortar.',
      requirements: [
        'Com e-mail válido, linha 1: `Usuario: ana.silva`',
        'Linha 2: `Dominio: empresa.com`',
        'Linha 3: `Posicao da arroba: 9`',
        'Sem `@`, imprima apenas `Erro: email invalido`',
        'Use `IndexOf` e verifique o `-1` antes de recortar',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        string email = Console.ReadLine();

        // Localize a arroba e recorte com seguranca
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        string email = Console.ReadLine();

        int arroba = email.IndexOf("@");

        if (arroba == -1)
        {
            Console.WriteLine("Erro: email invalido");
        }
        else
        {
            Console.WriteLine($"Usuario: {email.Substring(0, arroba)}");
            Console.WriteLine($"Dominio: {email.Substring(arroba + 1)}");
            Console.WriteLine($"Posicao da arroba: {arroba}");
        }
    }
}
`,
      hints: [
        'Guarde o resultado de `IndexOf` numa variável para não buscar duas vezes.',
        'O domínio começa uma posição depois da arroba: `arroba + 1`.',
      ],
      tests: [
        {
          name: 'E-mail válido',
          stdin: 'ana.silva@empresa.com\n',
          expectedStdout:
            'Usuario: ana.silva\nDominio: empresa.com\nPosicao da arroba: 9',
        },
        {
          name: 'Texto sem arroba',
          stdin: 'ana.silva.empresa.com\n',
          expectedStdout: 'Erro: email invalido',
        },
      ],
    },
  },
  {
    id: 's01c05l07',
    title: 'Replace e StartsWith',
    objective: 'Substituir trechos e testar prefixos e sufixos para limpar e classificar texto.',
    concept: [
      {
        kind: 'text',
        body:
          '`Replace` troca **todas** as ocorrências de um trecho por outro. É a ferramenta padrão para limpar formatação indesejada.',
      },
      {
        kind: 'code',
        code: `string telefone = "(11) 98765-4321";

string limpo = telefone
    .Replace("(", "")
    .Replace(")", "")
    .Replace(" ", "")
    .Replace("-", "");

Console.WriteLine(limpo);          // 11987654321
Console.WriteLine(limpo.Length);   // 11`,
        caption: 'Encadear Replace é comum e legível para limpezas simples.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Trocar por string vazia (`""`) é como se remove um caractere. E lembre: cada `Replace` cria uma string nova, então o encadeamento produz várias strings intermediárias. Para textos gigantes existe `StringBuilder`, assunto de uma seção mais adiante.',
      },
      {
        kind: 'text',
        body:
          '`StartsWith` e `EndsWith` respondem sobre as pontas do texto. São perfeitos para classificar por prefixo, algo muito comum em códigos de sistema.',
      },
      {
        kind: 'code',
        code: `string sku = "ELE-4821";

if (sku.StartsWith("ELE"))
{
    Console.WriteLine("Eletronicos");
}
else if (sku.StartsWith("VES"))
{
    Console.WriteLine("Vestuario");
}

Console.WriteLine(sku.EndsWith("21"));   // True`,
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Prefira `StartsWith("ELE")` a `Substring(0, 3) == "ELE"`. O primeiro nunca lança exceção com string curta; o segundo quebra se o texto tiver menos de 3 caracteres.',
      },
    ],
    quiz: [
      {
        id: 's01c05l07q1',
        type: 'single',
        prompt: 'Quanto vale `"a-b-c".Replace("-", "")`?',
        options: [
          { id: 'a', code: 'abc', correct: true },
          { id: 'b', code: 'a-bc' },
          { id: 'c', code: 'ab-c' },
          { id: 'd', code: 'a-b-c' },
        ],
        explanation: '`Replace` age em todas as ocorrências, não só na primeira.',
      },
      {
        id: 's01c05l07q2',
        type: 'single',
        prompt: 'Por que `s.Replace("x", "y");` sozinho não muda `s`?',
        options: [
          {
            id: 'a',
            text: 'Porque strings são imutáveis: é preciso escrever `s = s.Replace("x", "y");`.',
            correct: true,
          },
          { id: 'b', text: 'Porque `Replace` só funciona com `char`.' },
          { id: 'c', text: 'Porque falta um terceiro argumento com a quantidade.' },
          { id: 'd', text: 'Porque `Replace` ignora ocorrências no fim da string.' },
        ],
        explanation:
          'Mesma armadilha do `Trim` e do `ToUpper`. Todo método de string que "modifica" na verdade devolve uma cópia nova.',
      },
      {
        id: 's01c05l07q3',
        type: 'single',
        prompt: 'Qual é a vantagem de `sku.StartsWith("ELE")` sobre `sku.Substring(0, 3) == "ELE"`?',
        options: [
          {
            id: 'a',
            text: 'Funciona mesmo quando `sku` tem menos de 3 caracteres, sem lançar exceção.',
            correct: true,
          },
          { id: 'b', text: 'Ignora maiúsculas e minúsculas por padrão.' },
          { id: 'c', text: 'Também verifica o final da string.' },
          { id: 'd', text: 'Devolve o índice do prefixo em vez de um bool.' },
        ],
        explanation:
          'Robustez é a vantagem. Para ignorar a caixa você ainda precisa passar `StringComparison.OrdinalIgnoreCase` explicitamente.',
      },
    ],
    challenge: {
      brief:
        'Leia um telefone com formatação livre e um SKU de produto. Limpe o telefone deixando só dígitos, informe se é celular (11 dígitos), e classifique o SKU pelo prefixo: `ELE` para Eletronicos, `VES` para Vestuario, qualquer outro para Outros.',
      requirements: [
        'Linha 1: `Telefone: 11987654321`',
        'Linha 2: `Celular: True`',
        'Linha 3: `Categoria: Eletronicos`',
        'Remova parênteses, espaços, pontos e hifens do telefone',
        'Use `Replace` e `StartsWith`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        string telefone = Console.ReadLine();
        string sku = Console.ReadLine();

        // Limpe o telefone e classifique o SKU
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        string telefone = Console.ReadLine();
        string sku = Console.ReadLine();

        string limpo = telefone
            .Replace("(", "")
            .Replace(")", "")
            .Replace(" ", "")
            .Replace("-", "")
            .Replace(".", "");

        bool celular = limpo.Length == 11;

        string categoria = "Outros";
        if (sku.StartsWith("ELE"))
        {
            categoria = "Eletronicos";
        }
        else if (sku.StartsWith("VES"))
        {
            categoria = "Vestuario";
        }

        Console.WriteLine($"Telefone: {limpo}");
        Console.WriteLine($"Celular: {celular}");
        Console.WriteLine($"Categoria: {categoria}");
    }
}
`,
      hints: [
        'Encadeie um `Replace` para cada caractere que deve sair.',
        'Comece `categoria` com `"Outros"` e sobrescreva quando um prefixo casar.',
      ],
      tests: [
        {
          name: 'Celular e eletrônico',
          stdin: '(11) 98765-4321\nELE-4821\n',
          expectedStdout: 'Telefone: 11987654321\nCelular: True\nCategoria: Eletronicos',
        },
        {
          name: 'Fixo e vestuário',
          stdin: '11.3456.7890\nVES-0099\n',
          expectedStdout: 'Telefone: 1134567890\nCelular: False\nCategoria: Vestuario',
        },
        {
          name: 'Prefixo desconhecido',
          stdin: '(21) 5555-1234\nLIV-7\n',
          expectedStdout: 'Telefone: 2155551234\nCelular: False\nCategoria: Outros',
        },
      ],
    },
  },
  {
    id: 's01c05l08',
    title: 'Split e Join',
    objective: 'Quebrar uma linha em partes e remontar texto a partir de pedaços.',
    concept: [
      {
        kind: 'text',
        body:
          '`Split` parte uma string num separador e devolve um array de pedaços. É a forma padrão de ler dados delimitados, como uma linha de CSV.',
      },
      {
        kind: 'code',
        code: `string linha = "Ana;28;Recife";
string[] campos = linha.Split(';');

Console.WriteLine(campos.Length);   // 3
Console.WriteLine(campos[0]);       // Ana
Console.WriteLine(campos[1]);       // 28
Console.WriteLine(campos[2]);       // Recife`,
      },
      {
        kind: 'text',
        body:
          '`string.Join` faz o inverso: recebe um separador e uma coleção, e devolve tudo colado. Note que ele é chamado no tipo `string`, não numa instância.',
      },
      {
        kind: 'code',
        code: `string[] partes = { "2024", "08", "25" };

Console.WriteLine(string.Join("-", partes));   // 2024-08-25
Console.WriteLine(string.Join(", ", partes));  // 2024, 08, 25`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Separadores consecutivos geram pedaços vazios: `"a,,b".Split(\',\')` devolve 3 itens, sendo o do meio `""`. Para descartá-los, passe `StringSplitOptions.RemoveEmptyEntries`.',
      },
      {
        kind: 'code',
        code: `string bruto = " ana , bruno ,, caio ";

string[] nomes = bruto.Split(
    ',',
    StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

Console.WriteLine(nomes.Length);              // 3
Console.WriteLine(string.Join("|", nomes));   // ana|bruno|caio`,
        caption: 'TrimEntries limpa os espaços de cada pedaço numa só passada.',
      },
    ],
    quiz: [
      {
        id: 's01c05l08q1',
        type: 'single',
        prompt: 'Quantos elementos tem `"a,b,,c".Split(\',\')`?',
        options: [
          { id: 'a', code: '4', correct: true },
          { id: 'b', code: '3' },
          { id: 'c', code: '5' },
          { id: 'd', code: '2' },
        ],
        explanation:
          'Os pedaços são `"a"`, `"b"`, `""` e `"c"`. O separador duplo cria uma entrada vazia, que ainda conta.',
      },
      {
        id: 's01c05l08q2',
        type: 'single',
        prompt: 'Qual chamada devolve `2024/08/25` a partir de `string[] p = { "2024", "08", "25" };`?',
        options: [
          { id: 'a', code: 'string.Join("/", p)', correct: true },
          { id: 'b', code: 'p.Join("/")' },
          { id: 'c', code: 'string.Concat("/", p)' },
          { id: 'd', code: 'p.ToString("/")' },
        ],
        explanation:
          '`Join` é um método estático de `string`, então a chamada começa por `string.`. `Concat` colaria tudo sem separador entre os itens.',
      },
      {
        id: 's01c05l08q3',
        type: 'single',
        prompt: 'O que faz `StringSplitOptions.TrimEntries`?',
        options: [
          { id: 'a', text: 'Remove os espaços das pontas de cada pedaço resultante.', correct: true },
          { id: 'b', text: 'Remove os pedaços vazios do resultado.' },
          { id: 'c', text: 'Limita a quantidade de pedaços retornados.' },
          { id: 'd', text: 'Aplica `Trim` só no primeiro e no último pedaço.' },
        ],
        explanation:
          'Cada pedaço é aparado. Quem remove os vazios é `RemoveEmptyEntries`, e as duas opções costumam andar juntas com `|`.',
      },
    ],
    challenge: {
      brief:
        'Leia uma linha de CSV com nome, idade e cidade separados por ponto e vírgula, possivelmente com espaços sobrando. Imprima os campos identificados e remonte a linha no formato pipe.',
      requirements: [
        'Linha 1: `Nome: Ana Paula`',
        'Linha 2: `Idade: 28`',
        'Linha 3: `Cidade: Recife`',
        'Linha 4: `Registro: Ana Paula|28|Recife`',
        'A idade deve ser convertida para `int` e reimpressa',
        'Use `Split` com `TrimEntries` e `string.Join`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        string linha = Console.ReadLine();

        // Quebre, valide e remonte
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        string linha = Console.ReadLine();

        string[] campos = linha.Split(';', StringSplitOptions.TrimEntries);

        string nome = campos[0];
        int idade = int.Parse(campos[1]);
        string cidade = campos[2];

        Console.WriteLine($"Nome: {nome}");
        Console.WriteLine($"Idade: {idade}");
        Console.WriteLine($"Cidade: {cidade}");
        Console.WriteLine($"Registro: {string.Join("|", campos)}");
    }
}
`,
      hints: [
        'Passe `StringSplitOptions.TrimEntries` para não precisar chamar `Trim` em cada campo.',
        'Você pode usar `string.Join("|", campos)` diretamente no array já aparado.',
      ],
      tests: [
        {
          name: 'CSV com espaços',
          stdin: 'Ana Paula ; 28 ; Recife\n',
          expectedStdout:
            'Nome: Ana Paula\nIdade: 28\nCidade: Recife\nRegistro: Ana Paula|28|Recife',
        },
        {
          name: 'CSV limpo',
          stdin: 'Bruno;41;Curitiba\n',
          expectedStdout:
            'Nome: Bruno\nIdade: 41\nCidade: Curitiba\nRegistro: Bruno|41|Curitiba',
        },
      ],
    },
  },
  {
    id: 's01c05l09',
    title: 'Prática: normalizador de nomes',
    objective: 'Combinar Split, Trim, caixa e Join num pipeline de limpeza de dados reais.',
    concept: [
      {
        kind: 'text',
        body:
          'Normalizar nomes é um problema real e surpreendentemente cheio de detalhes. A entrada vem em CAIXA ALTA, em minúsculas, com espaços duplicados, e a saída precisa ficar apresentável.',
      },
      {
        kind: 'text',
        body:
          'A receita que funciona é um pipeline: quebrar em palavras descartando vazios, ajustar cada palavra, e juntar de novo com um único espaço.',
      },
      {
        kind: 'code',
        code: `string bruto = "  ANA   maria  DA silva ";

string[] palavras = bruto.Split(
    ' ',
    StringSplitOptions.RemoveEmptyEntries);

Console.WriteLine(palavras.Length);   // 4
Console.WriteLine(string.Join("_", palavras));
// ANA_maria_DA_silva`,
        caption: 'RemoveEmptyEntries resolve os espaços duplicados de uma vez.',
      },
      {
        kind: 'text',
        body:
          'Para deixar uma palavra com a inicial maiúscula e o resto minúsculo, combine o primeiro caractere com o restante:',
      },
      {
        kind: 'code',
        code: `string p = "SILVA";
string ajustada = char.ToUpper(p[0]) + p.Substring(1).ToLower();
Console.WriteLine(ajustada);   // Silva`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Existe `CultureInfo.CurrentCulture.TextInfo.ToTitleCase`, mas ele não abaixa palavras que já estão em CAIXA ALTA e capitaliza preposições como "da" e "de". Para nomes de pessoas, a versão manual costuma dar resultado melhor.',
      },
    ],
    quiz: [
      {
        id: 's01c05l09q1',
        type: 'single',
        prompt: 'Quantos elementos tem `"  a   b ".Split(\' \', StringSplitOptions.RemoveEmptyEntries)`?',
        options: [
          { id: 'a', code: '2', correct: true },
          { id: 'b', code: '4' },
          { id: 'c', code: '7' },
          { id: 'd', code: '3' },
        ],
        explanation:
          'Todos os pedaços vazios gerados pelos espaços consecutivos são descartados, deixando só `"a"` e `"b"`.',
      },
      {
        id: 's01c05l09q2',
        type: 'single',
        prompt: 'Qual expressão transforma `"JOÃO"` em `"João"`?',
        options: [
          { id: 'a', code: 'char.ToUpper(p[0]) + p.Substring(1).ToLower()', correct: true },
          { id: 'b', code: 'p.ToUpper()' },
          { id: 'c', code: 'p[0] + p.Substring(1).ToLower()' },
          { id: 'd', code: 'p.ToLower().ToUpper()' },
        ],
        explanation:
          'A opção C esquece de subir a primeira letra, e como ela já está em maiúscula funcionaria por acidente aqui, mas falharia com `"joão"`.',
      },
      {
        id: 's01c05l09q3',
        type: 'single',
        prompt: 'Por que `char.ToUpper(p[0]) + p.Substring(1)` compila e produz string?',
        options: [
          {
            id: 'a',
            text: 'Porque o `+` com uma `string` do outro lado converte o `char` em texto e concatena.',
            correct: true,
          },
          { id: 'b', text: 'Porque `char` e `string` são o mesmo tipo em C#.' },
          { id: 'c', text: 'Porque `char.ToUpper` devolve `string`.' },
          { id: 'd', text: 'Porque o compilador insere um cast implícito para `string`.' },
        ],
        explanation:
          '`char.ToUpper` devolve `char`. Se os dois lados fossem `char`, o `+` somaria os códigos numéricos e o resultado seria um `int`.',
      },
    ],
    challenge: {
      brief:
        'Leia uma linha com um nome completo escrito de qualquer maneira e produza a versão normalizada, a quantidade de palavras, e as iniciais.',
      requirements: [
        'Linha 1: `Nome: Ana Maria Da Silva`',
        'Linha 2: `Palavras: 4`',
        'Linha 3: `Iniciais: A.M.D.S.`',
        'Cada palavra fica com a inicial maiúscula e o resto minúsculo',
        'Espaços duplicados e nas pontas devem desaparecer',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        string bruto = Console.ReadLine();

        // Normalize o nome, conte palavras e monte as iniciais
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        string bruto = Console.ReadLine();

        string[] palavras = bruto.Split(' ', StringSplitOptions.RemoveEmptyEntries);

        string nome = "";
        string iniciais = "";

        foreach (string p in palavras)
        {
            string ajustada = char.ToUpper(p[0]) + p.Substring(1).ToLower();

            if (nome.Length > 0)
            {
                nome += " ";
            }
            nome += ajustada;
            iniciais += char.ToUpper(p[0]) + ".";
        }

        Console.WriteLine($"Nome: {nome}");
        Console.WriteLine($"Palavras: {palavras.Length}");
        Console.WriteLine($"Iniciais: {iniciais}");
    }
}
`,
      hints: [
        'Um `foreach` percorre cada palavra do array devolvido pelo `Split`.',
        'Para não deixar um espaço sobrando no início, só adicione o separador quando `nome` já tiver conteúdo.',
        'As iniciais recebem a letra maiúscula seguida de um ponto, inclusive na última palavra.',
      ],
      tests: [
        {
          name: 'Nome com espaços e caixa mista',
          stdin: '  ANA   maria  DA silva \n',
          expectedStdout:
            'Nome: Ana Maria Da Silva\nPalavras: 4\nIniciais: A.M.D.S.',
        },
        {
          name: 'Nome simples em minúsculas',
          stdin: 'bruno costa\n',
          expectedStdout: 'Nome: Bruno Costa\nPalavras: 2\nIniciais: B.C.',
        },
        {
          name: 'Uma única palavra',
          stdin: 'MARIA\n',
          expectedStdout: 'Nome: Maria\nPalavras: 1\nIniciais: M.',
        },
      ],
    },
  },
  {
    id: 's01c05l10',
    title: 'Checkpoint: manipulando texto',
    objective: 'Resolver um problema de parsing e formatação usando todo o arsenal de string do capítulo.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint fecha o capítulo de strings. Praticamente todo software passa a maior parte do tempo movendo, validando e formatando texto: dominar esses métodos rende muito.',
      },
      {
        kind: 'table',
        headers: ['Preciso', 'Uso'],
        rows: [
          ['montar mensagem com valores', 'interpolação `$""`'],
          ['formatar número na saída', '`{v:F2}`, `{v:N0}`'],
          ['limpar espaços', '`Trim()`'],
          ['comparar ignorando caixa', '`StringComparison.OrdinalIgnoreCase`'],
          ['saber se contém algo', '`Contains`'],
          ['saber onde está', '`IndexOf` (cuidado com `-1`)'],
          ['recortar por posição', '`Substring` ou `s[a..b]`'],
          ['quebrar em campos', '`Split`'],
          ['remontar', '`string.Join`'],
          ['remover ou trocar', '`Replace`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Os três erros que mais aparecem: ignorar o retorno de um método (imutabilidade), usar um `IndexOf` que devolveu `-1`, e indexar além de `Length - 1`. Se um exercício de string falhar, comece checando esses três.',
      },
    ],
    quiz: [
      {
        id: 's01c05l10q1',
        type: 'single',
        prompt: 'Qual é a saída?',
        code: `string s = "  Csharp  ";
Console.WriteLine($"[{s.Trim().ToUpper()[0]}]");`,
        options: [
          { id: 'a', code: '[C]', correct: true },
          { id: 'b', code: '[ ]' },
          { id: 'c', code: '[CSHARP]' },
          { id: 'd', code: '[c]' },
        ],
        explanation:
          'A cadeia é avaliada da esquerda: apara, sobe a caixa, e indexa o primeiro caractere do resultado, que é `C`.',
      },
      {
        id: 's01c05l10q2',
        type: 'multiple',
        prompt: 'Marque todas as afirmações verdadeiras sobre `string` em C#.',
        options: [
          { id: 'a', text: '`s.Replace("a","b")` não altera `s`.', correct: true },
          { id: 'b', text: '`IndexOf` devolve `-1` quando não encontra.', correct: true },
          { id: 'c', text: '`s[0]` devolve um `char`.', correct: true },
          { id: 'd', text: '`s.Substring(2, 3)` vai do índice 2 ao índice 3.' },
          { id: 'e', text: '`"A" == "a"` é true por padrão.' },
        ],
        explanation:
          'O segundo argumento de `Substring` é o comprimento, e a comparação padrão de strings diferencia maiúsculas de minúsculas.',
      },
      {
        id: 's01c05l10q3',
        type: 'single',
        prompt:
          'Você recebe `"produto=Teclado"` e precisa extrair `Teclado` de forma robusta. Qual abordagem é a melhor?',
        options: [
          {
            id: 'a',
            text: 'Achar o `=` com `IndexOf`, checar se é diferente de -1, e usar `Substring(i + 1)`.',
            correct: true,
          },
          { id: 'b', text: 'Usar `Substring(9)` porque `produto=` sempre tem 8 caracteres.' },
          { id: 'c', text: 'Usar `Replace("produto=", "")` e confiar no formato.' },
          { id: 'd', text: 'Usar `s[^7..]` porque o valor tem 7 letras.' },
        ],
        explanation:
          'Só a A não depende de nenhum tamanho fixo. As outras quebram no primeiro registro com chave ou valor de outro tamanho.',
      },
    ],
    challenge: {
      brief:
        'Um log de sistema chega no formato `NIVEL|origem|mensagem`. Leia uma linha, valide que ela tem os três campos, e produza um relatório legível. Se faltar campo, imprima o erro.',
      requirements: [
        'Com linha válida, linha 1: `Nivel: ERRO`',
        'Linha 2: `Origem: PagamentoService`',
        'Linha 3: `Mensagem: Timeout ao chamar o gateway`',
        'Linha 4: `Critico: True`',
        'Linha 5: `Resumo: [ERRO] PagamentoService - 27 caracteres`',
        '`Critico` é True quando o nível é `ERRO` ou `FATAL`, ignorando maiúsculas',
        'Se a linha não tiver exatamente 3 campos, imprima só `Erro: formato invalido`',
        'O nível sai sempre em maiúsculas e os campos sem espaços nas pontas',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        string linha = Console.ReadLine();

        // Valide o formato e monte o relatorio
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        string linha = Console.ReadLine();

        string[] campos = linha.Split('|', StringSplitOptions.TrimEntries);

        if (campos.Length != 3)
        {
            Console.WriteLine("Erro: formato invalido");
        }
        else
        {
            string nivel = campos[0].ToUpper();
            string origem = campos[1];
            string mensagem = campos[2];

            bool critico =
                string.Equals(nivel, "ERRO", StringComparison.Ordinal) ||
                string.Equals(nivel, "FATAL", StringComparison.Ordinal);

            Console.WriteLine($"Nivel: {nivel}");
            Console.WriteLine($"Origem: {origem}");
            Console.WriteLine($"Mensagem: {mensagem}");
            Console.WriteLine($"Critico: {critico}");
            Console.WriteLine($"Resumo: [{nivel}] {origem} - {mensagem.Length} caracteres");
        }
    }
}
`,
      hints: [
        'Use `Split` com `TrimEntries` e cheque `campos.Length` antes de acessar qualquer índice.',
        'Suba o nível para maiúsculas uma vez e compare com `"ERRO"` e `"FATAL"` já normalizados.',
        '`mensagem.Length` conta os caracteres depois do trim.',
      ],
      tests: [
        {
          name: 'Log de erro completo',
          stdin: 'erro | PagamentoService | Timeout ao chamar o gateway\n',
          expectedStdout:
            'Nivel: ERRO\nOrigem: PagamentoService\nMensagem: Timeout ao chamar o gateway\nCritico: True\nResumo: [ERRO] PagamentoService - 27 caracteres',
        },
        {
          name: 'Log informativo',
          stdin: 'INFO|Auth|Usuario autenticado\n',
          expectedStdout:
            'Nivel: INFO\nOrigem: Auth\nMensagem: Usuario autenticado\nCritico: False\nResumo: [INFO] Auth - 19 caracteres',
        },
        {
          name: 'Campo faltando',
          stdin: 'WARN|Cache\n',
          expectedStdout: 'Erro: formato invalido',
        },
      ],
    },
  },
]
