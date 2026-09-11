import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's01c04l01',
    title: 'Lendo com Console.ReadLine',
    objective: 'Receber texto digitado pelo usuário e usar esse valor no programa.',
    concept: [
      {
        kind: 'text',
        body:
          'Até agora seus programas só falavam. `Console.ReadLine()` faz o contrário: ele **espera** o usuário digitar uma linha e pressionar Enter, e devolve o que foi digitado como `string`.',
      },
      {
        kind: 'code',
        code: `Console.Write("Seu nome: ");
string nome = Console.ReadLine();
Console.WriteLine("Ola, " + nome + "!");`,
        caption: 'Use Write no prompt para o cursor ficar na mesma linha.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '`ReadLine` **sempre** devolve `string`, mesmo que o usuário digite `42`. Para o programa, isso é o texto `"42"`, não o número 42. Fazer contas exige uma conversão, que é o assunto da próxima lição.',
      },
      {
        kind: 'text',
        body:
          'Se não houver mais nada para ler (a entrada acabou), `ReadLine` devolve `null`. Nas lições deste curso a entrada é sempre fornecida, mas em produção vale checar.',
      },
      {
        kind: 'output',
        code: 'Seu nome: Ana\nOla, Ana!',
        caption: 'Ana foi digitada pelo usuário; o resto foi impresso pelo programa.',
      },
    ],
    quiz: [
      {
        id: 's01c04l01q1',
        type: 'single',
        prompt: 'Qual é o tipo de retorno de `Console.ReadLine()`?',
        options: [
          { id: 'a', code: 'string', correct: true },
          { id: 'b', code: 'int' },
          { id: 'c', code: 'char' },
          { id: 'd', text: 'Depende do que o usuário digitar' },
        ],
        explanation:
          'É sempre `string`. O tipo de uma expressão em C# é decidido em tempo de compilação, muito antes de alguém digitar qualquer coisa.',
      },
      {
        id: 's01c04l01q2',
        type: 'single',
        prompt: 'Por que este código imprime `510` em vez de `15`?',
        code: `string a = Console.ReadLine();   // usuario digita 5
string b = Console.ReadLine();   // usuario digita 10
Console.WriteLine(a + b);`,
        options: [
          {
            id: 'a',
            text: 'Porque `+` entre duas strings concatena o texto em vez de somar números.',
            correct: true,
          },
          { id: 'b', text: 'Porque `ReadLine` inverte a ordem dos valores lidos.' },
          { id: 'c', text: 'Porque faltou um `Console.Write` antes da leitura.' },
          { id: 'd', text: 'Porque `5` e `10` têm quantidades diferentes de dígitos.' },
        ],
        explanation:
          'O bug mais clássico de quem começa. Os valores são texto, então `"5" + "10"` vira `"510"`.',
      },
      {
        id: 's01c04l01q3',
        type: 'single',
        prompt: 'Qual a diferença entre `Console.Write("Idade: ")` e `Console.WriteLine("Idade: ")` num prompt?',
        options: [
          {
            id: 'a',
            text: 'Com `Write` o usuário digita na mesma linha do texto; com `WriteLine` ele digita na linha de baixo.',
            correct: true,
          },
          { id: 'b', text: 'Nenhuma, o console ignora a diferença ao ler.' },
          { id: 'c', text: '`Write` não funciona antes de um `ReadLine`.' },
          { id: 'd', text: '`WriteLine` limpa a tela antes de escrever.' },
        ],
        explanation:
          'É só uma questão de apresentação: `WriteLine` acrescenta a quebra de linha, então o cursor desce.',
      },
    ],
    challenge: {
      brief:
        'Escreva um programa que lê três linhas — nome, cidade e profissão — e imprime uma apresentação em uma linha só.',
      requirements: [
        'Leia exatamente três linhas com `Console.ReadLine()`',
        'Imprima uma única linha no formato `Ana, de Recife, trabalha como designer.`',
        'Não imprima nenhum texto de prompt: a saída deve ter só a apresentação',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Leia nome, cidade e profissao
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        string cidade = Console.ReadLine();
        string profissao = Console.ReadLine();

        Console.WriteLine(nome + ", de " + cidade + ", trabalha como " + profissao + ".");
    }
}
`,
      hints: [
        'Guarde cada leitura em sua própria variável antes de montar a frase.',
        'Cuidado com a vírgula e o ponto final: eles fazem parte do formato esperado.',
      ],
      tests: [
        {
          name: 'Apresentação da Ana',
          stdin: 'Ana\nRecife\ndesigner\n',
          expectedStdout: 'Ana, de Recife, trabalha como designer.',
        },
        {
          name: 'Outro usuário',
          stdin: 'Bruno\nCuritiba\ndesenvolvedor\n',
          expectedStdout: 'Bruno, de Curitiba, trabalha como desenvolvedor.',
        },
      ],
    },
  },
  {
    id: 's01c04l02',
    title: 'Convertendo texto em int',
    objective: 'Transformar a string lida em número para poder fazer contas.',
    concept: [
      {
        kind: 'text',
        body:
          'Para somar o que o usuário digitou, o texto precisa virar número. `int.Parse` faz exatamente isso: recebe uma `string` e devolve um `int`.',
      },
      {
        kind: 'code',
        code: `string texto = Console.ReadLine();   // "42"
int numero = int.Parse(texto);

Console.WriteLine(numero * 2);       // 84`,
      },
      {
        kind: 'text',
        body: 'Também é comum converter direto na leitura, sem variável intermediária:',
      },
      {
        kind: 'code',
        code: `int idade = int.Parse(Console.ReadLine());
Console.WriteLine("Ano que vem: " + (idade + 1));`,
        caption: 'Note os parênteses em (idade + 1): sem eles, o + viraria concatenação.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`int.Parse` **lança exceção** se o texto não for um número inteiro válido. `"abc"`, `"3.5"` e `""` todos derrubam o programa. A lição sobre `TryParse` mostra como se proteger.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Sem converter',
          code: `string a = "5";
string b = "3";
Console.WriteLine(a + b);   // 53`,
        },
        right: {
          label: 'Convertendo',
          code: `int a = int.Parse("5");
int b = int.Parse("3");
Console.WriteLine(a + b);   // 8`,
        },
      },
    ],
    quiz: [
      {
        id: 's01c04l02q1',
        type: 'single',
        prompt: 'O usuário digita `7`. O que o programa imprime?',
        code: `int n = int.Parse(Console.ReadLine());
Console.WriteLine("Dobro: " + n * 2);`,
        options: [
          { id: 'a', code: 'Dobro: 14', correct: true },
          { id: 'b', code: 'Dobro: 77' },
          { id: 'c', code: 'Dobro: 7 * 2' },
          { id: 'd', text: 'Erro em tempo de execução' },
        ],
        explanation:
          '`*` tem prioridade sobre `+`, então `n * 2` é calculado antes da concatenação. Aqui os parênteses não são necessários.',
      },
      {
        id: 's01c04l02q2',
        type: 'single',
        prompt: 'Qual chamada lança exceção?',
        options: [
          { id: 'a', code: 'int.Parse("3.0")', correct: true },
          { id: 'b', code: 'int.Parse("-15")' },
          { id: 'c', code: 'int.Parse("007")' },
          { id: 'd', code: 'int.Parse("2000000")' },
        ],
        explanation:
          '`int.Parse` não aceita ponto decimal, nem mesmo quando a parte fracionária é zero. Sinal negativo e zeros à esquerda são aceitos normalmente.',
      },
      {
        id: 's01c04l02q3',
        type: 'single',
        prompt: 'Por que `Console.WriteLine("Total: " + idade + 1)` imprime `Total: 201` para idade 20?',
        options: [
          {
            id: 'a',
            text: 'A avaliação é da esquerda para a direita: a string absorve o 20 e depois absorve o 1.',
            correct: true,
          },
          { id: 'b', text: 'Porque `idade` foi lido como string.' },
          { id: 'c', text: 'Porque `+` com número sempre vem antes da concatenação.' },
          { id: 'd', text: 'Porque `WriteLine` converte o resultado para texto no final.' },
        ],
        explanation:
          '`"Total: " + idade` já produziu `"Total: 20"`, e somar `1` a uma string concatena. A solução é `("Total: " + (idade + 1))`.',
      },
    ],
    challenge: {
      brief:
        'Leia dois números inteiros, um por linha, e imprima a soma, a diferença e o produto deles.',
      requirements: [
        'Leia duas linhas e converta cada uma para `int`',
        'Linha 1 da saída: `Soma: 13`',
        'Linha 2: `Diferenca: 3`',
        'Linha 3: `Produto: 40`',
        'A diferença é o primeiro valor menos o segundo',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Leia dois inteiros e opere sobre eles
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

        Console.WriteLine("Soma: " + (a + b));
        Console.WriteLine("Diferenca: " + (a - b));
        Console.WriteLine("Produto: " + a * b);
    }
}
`,
      hints: [
        'Converta cada linha com `int.Parse(Console.ReadLine())`.',
        'Nas linhas com `+` e `-`, envolva a conta em parênteses para não cair na concatenação.',
      ],
      tests: [
        {
          name: '8 e 5',
          stdin: '8\n5\n',
          expectedStdout: 'Soma: 13\nDiferenca: 3\nProduto: 40',
        },
        {
          name: 'Valores negativos',
          stdin: '-4\n6\n',
          expectedStdout: 'Soma: 2\nDiferenca: -10\nProduto: -24',
        },
      ],
    },
  },
  {
    id: 's01c04l03',
    title: 'Convert e as armadilhas do Parse',
    objective: 'Conhecer a família Convert, comparar com Parse e prever o que cada uma faz com entrada inválida.',
    concept: [
      {
        kind: 'text',
        body:
          'Existe outro caminho para converter: a classe `Convert`. `Convert.ToInt32(texto)` faz quase o mesmo que `int.Parse(texto)`, mas com duas diferenças que importam.',
      },
      {
        kind: 'table',
        headers: ['Entrada', '`int.Parse`', '`Convert.ToInt32`'],
        rows: [
          ['`"42"`', '42', '42'],
          ['`"abc"`', 'exceção', 'exceção'],
          ['`null`', 'exceção', '**0**'],
          ['`"3.7"` (double)', 'não aceita', '4 (arredonda)'],
        ],
      },
      {
        kind: 'code',
        code: `Console.WriteLine(Convert.ToInt32("42"));      // 42
Console.WriteLine(Convert.ToInt32(3.7));       // 4  -> arredonda
Console.WriteLine(Convert.ToInt32(2.5));       // 2  -> arredonda para o par!
Console.WriteLine((int)3.7);                   // 3  -> cast trunca`,
        caption: 'Convert arredonda, cast trunca. São ferramentas diferentes.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '`Convert.ToInt32(2.5)` devolve `2`, não `3`. Ele usa arredondamento bancário, que leva o `.5` para o número par mais próximo. É o comportamento correto para estatística e o inesperado para quase todo o resto.',
      },
      {
        kind: 'text',
        body:
          'Na prática: use `int.Parse` (ou `int.TryParse`) para texto vindo do usuário, e `Convert` quando estiver mudando entre tipos numéricos e quiser arredondamento. Nenhum dos dois resolve o problema de entrada inválida.',
      },
    ],
    quiz: [
      {
        id: 's01c04l03q1',
        type: 'single',
        prompt: 'Qual é a saída?',
        code: 'Console.WriteLine(Convert.ToInt32(4.5) + " " + (int)4.9);',
        options: [
          { id: 'a', code: '4 4', correct: true },
          { id: 'b', code: '5 5' },
          { id: 'c', code: '5 4' },
          { id: 'd', code: '4 5' },
        ],
        explanation:
          '`Convert.ToInt32(4.5)` arredonda para o par, dando `4`. O cast `(int)4.9` trunca, também dando `4`. Dois caminhos diferentes para o mesmo número, por coincidência.',
      },
      {
        id: 's01c04l03q2',
        type: 'single',
        prompt: 'Qual diferença de comportamento é real entre `int.Parse(s)` e `Convert.ToInt32(s)`?',
        options: [
          { id: 'a', text: 'Com `s` valendo null, o Parse lança exceção e o Convert devolve 0.', correct: true },
          { id: 'b', text: 'O Convert aceita letras e o Parse não.' },
          { id: 'c', text: 'O Parse é mais rápido porque não valida a entrada.' },
          { id: 'd', text: 'O Convert devolve `int?` em vez de `int`.' },
        ],
        explanation:
          'Esse `0` silencioso do Convert é uma faca de dois gumes: evita a exceção, mas esconde o fato de que não havia dado nenhum.',
      },
      {
        id: 's01c04l03q3',
        type: 'multiple',
        prompt: 'Quais chamadas terminam em exceção em tempo de execução?',
        options: [
          { id: 'a', code: 'int.Parse("")', correct: true },
          { id: 'b', code: 'int.Parse("12 ")' },
          { id: 'c', code: 'Convert.ToInt32("R$ 10")', correct: true },
          { id: 'd', code: 'Convert.ToInt32("-7")' },
          { id: 'e', code: 'int.Parse("1,5")', correct: true },
        ],
        explanation:
          'Espaços nas pontas são tolerados. Já texto vazio, símbolos e vírgula decimal não formam um inteiro válido e viram `FormatException`.',
      },
    ],
    challenge: {
      brief:
        'Leia uma linha com um valor decimal e imprima três interpretações dele: o valor truncado com cast, o valor arredondado com `Convert`, e o dobro do valor original.',
      requirements: [
        'Leia a linha e converta para `double` com `double.Parse(linha, CultureInfo.InvariantCulture)`',
        'Linha 1: `Truncado: 7`',
        'Linha 2: `Arredondado: 8`',
        'Linha 3: `Dobro: 15.4`',
        'Use `using System.Globalization;`',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        string linha = Console.ReadLine();

        // Truncar, arredondar e dobrar
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        string linha = Console.ReadLine();
        double valor = double.Parse(linha, CultureInfo.InvariantCulture);

        Console.WriteLine("Truncado: " + (int)valor);
        Console.WriteLine("Arredondado: " + Convert.ToInt32(valor));
        Console.WriteLine("Dobro: " + valor * 2);
    }
}
`,
      hints: [
        'O cast `(int)valor` descarta a fração; `Convert.ToInt32(valor)` arredonda.',
        'Envolva o cast em parênteses dentro da concatenação: `"Truncado: " + (int)valor`.',
      ],
      tests: [
        {
          name: 'Valor 7.7',
          stdin: '7.7\n',
          expectedStdout: 'Truncado: 7\nArredondado: 8\nDobro: 15.4',
        },
        {
          name: 'Meio exato em 2.5',
          stdin: '2.5\n',
          expectedStdout: 'Truncado: 2\nArredondado: 2\nDobro: 5',
        },
      ],
    },
  },
  {
    id: 's01c04l04',
    title: 'Validando com int.TryParse',
    objective: 'Aceitar entrada inválida sem derrubar o programa usando o padrão Try.',
    concept: [
      {
        kind: 'text',
        body:
          'Programas de verdade não confiam na entrada. `int.TryParse` é a versão que **não lança exceção**: ela devolve um `bool` dizendo se deu certo e entrega o número por um parâmetro de saída.',
      },
      {
        kind: 'code',
        code: `string entrada = Console.ReadLine();

if (int.TryParse(entrada, out int numero))
{
    Console.WriteLine("Valido: " + numero);
}
else
{
    Console.WriteLine("Nao e um inteiro");
}`,
        caption: 'O out int numero declara a variável ali mesmo, já preenchida.',
      },
      {
        kind: 'text',
        body:
          'Quando a conversão falha, `TryParse` devolve `false` **e** coloca `0` na variável de saída. Por isso nunca use o valor sem antes checar o retorno.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Parse: quebra',
          code: `// usuario digita "oi"
int n = int.Parse(entrada);
// FormatException,
// programa morre aqui`,
        },
        right: {
          label: 'TryParse: controla',
          code: `// usuario digita "oi"
if (!int.TryParse(entrada, out int n))
{
    n = 0;   // valor padrao
}
// programa continua`,
        },
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'O padrão `Try` aparece em toda a biblioteca do .NET: `double.TryParse`, `DateTime.TryParse`, `dicionario.TryGetValue`. Sempre que existir uma versão `Try`, ela é a escolha certa para dado que veio de fora.',
      },
    ],
    quiz: [
      {
        id: 's01c04l04q1',
        type: 'single',
        prompt: 'O que `int.TryParse("abc", out int n)` devolve, e quanto fica `n`?',
        options: [
          { id: 'a', text: 'Devolve `false` e `n` fica 0.', correct: true },
          { id: 'b', text: 'Devolve `false` e `n` fica indefinido.' },
          { id: 'c', text: 'Devolve `0` e `n` fica null.' },
          { id: 'd', text: 'Lança `FormatException`.' },
        ],
        explanation:
          'O contrato é claro: falha devolve `false` e zera a saída. Como `0` é um valor plausível, é obrigatório checar o `bool`.',
      },
      {
        id: 's01c04l04q2',
        type: 'single',
        prompt: 'Qual código trata corretamente uma entrada possivelmente inválida?',
        options: [
          {
            id: 'a',
            code: `if (int.TryParse(s, out int n))
    Console.WriteLine(n * 2);
else
    Console.WriteLine("invalido");`,
            correct: true,
          },
          {
            id: 'b',
            code: `int.TryParse(s, out int n);
Console.WriteLine(n * 2);`,
          },
          {
            id: 'c',
            code: `int n = int.Parse(s);
if (n != 0) Console.WriteLine(n * 2);`,
          },
          {
            id: 'd',
            code: `if (s != null)
    Console.WriteLine(int.Parse(s) * 2);`,
          },
        ],
        explanation:
          'Só a A usa o retorno para decidir. A B ignora a falha e trata `0` como se fosse dado válido, e C e D ainda quebram com `"abc"`.',
      },
      {
        id: 's01c04l04q3',
        type: 'single',
        prompt: 'Para que serve a palavra `out` na chamada `int.TryParse(s, out int n)`?',
        options: [
          {
            id: 'a',
            text: 'Indica que o método vai preencher a variável, permitindo devolver o bool e o número ao mesmo tempo.',
            correct: true,
          },
          { id: 'b', text: 'Indica que a variável `n` é somente leitura.' },
          { id: 'c', text: 'Faz o método imprimir o resultado no console.' },
          { id: 'd', text: 'Converte `n` para string antes de retornar.' },
        ],
        explanation:
          'Um método só tem um valor de retorno, então `out` é o mecanismo para entregar um segundo resultado pelo parâmetro.',
      },
    ],
    challenge: {
      brief:
        'Leia três linhas que deveriam conter idades. Conte quantas são inteiros válidos, some as válidas e imprima o relatório. Entradas inválidas são apenas ignoradas.',
      requirements: [
        'Leia exatamente três linhas',
        'Linha 1 da saída: `Validas: 2`',
        'Linha 2: `Soma: 55`',
        'Linha 3: `Invalidas: 1`',
        'Use `int.TryParse` e nunca deixe uma exceção acontecer',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int validas = 0;
        int soma = 0;
        int invalidas = 0;

        // Leia tres linhas e classifique cada uma
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int validas = 0;
        int soma = 0;
        int invalidas = 0;

        if (int.TryParse(Console.ReadLine(), out int a))
        {
            validas++;
            soma += a;
        }
        else
        {
            invalidas++;
        }

        if (int.TryParse(Console.ReadLine(), out int b))
        {
            validas++;
            soma += b;
        }
        else
        {
            invalidas++;
        }

        if (int.TryParse(Console.ReadLine(), out int c))
        {
            validas++;
            soma += c;
        }
        else
        {
            invalidas++;
        }

        Console.WriteLine("Validas: " + validas);
        Console.WriteLine("Soma: " + soma);
        Console.WriteLine("Invalidas: " + invalidas);
    }
}
`,
      hints: [
        'Repita o mesmo bloco de leitura e verificação três vezes, cada um com sua própria variável de saída.',
        'Só some em `soma` dentro do ramo em que o `TryParse` devolveu true.',
      ],
      tests: [
        {
          name: 'Uma entrada inválida no meio',
          stdin: '30\nvinte\n25\n',
          expectedStdout: 'Validas: 2\nSoma: 55\nInvalidas: 1',
        },
        {
          name: 'Todas válidas',
          stdin: '10\n20\n30\n',
          expectedStdout: 'Validas: 3\nSoma: 60\nInvalidas: 0',
        },
        {
          name: 'Linha vazia conta como inválida',
          stdin: '5\n\n7\n',
          expectedStdout: 'Validas: 2\nSoma: 12\nInvalidas: 1',
        },
      ],
    },
  },
  {
    id: 's01c04l05',
    title: 'Lendo números decimais',
    objective: 'Converter texto em double e decimal lidando com o separador decimal de forma previsível.',
    concept: [
      {
        kind: 'text',
        body:
          'Ler um número com fração tem um detalhe extra: **qual símbolo separa os decimais**. Em português do Brasil é a vírgula (`3,5`); no padrão internacional é o ponto (`3.5`). O .NET decide isso pela cultura em que o programa está rodando.',
      },
      {
        kind: 'code',
        code: `using System.Globalization;

// Sempre aceita ponto, independente da maquina
double x = double.Parse("3.5", CultureInfo.InvariantCulture);
decimal y = decimal.Parse("19.90", CultureInfo.InvariantCulture);

Console.WriteLine(x + " " + y);   // 3.5 19.90`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Sem informar a cultura, `double.Parse("3.5")` pode devolver `35` numa máquina configurada em pt-BR, porque o ponto é interpretado como separador de milhar. É um bug que só aparece no computador do cliente.',
      },
      {
        kind: 'text',
        body:
          'A versão segura também existe: `double.TryParse(texto, NumberStyles.Float, CultureInfo.InvariantCulture, out double valor)`. Nas lições deste curso a entrada usa ponto, e passar `CultureInfo.InvariantCulture` é o hábito que você deve levar para o trabalho.',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Escolha'],
        rows: [
          ['Dinheiro, contas exatas', '`decimal`'],
          ['Medidas, médias, física', '`double`'],
          ['Dado vindo de arquivo ou API', '`InvariantCulture` sempre'],
          ['Texto digitado pelo usuário final', 'cultura do usuário'],
        ],
      },
    ],
    quiz: [
      {
        id: 's01c04l05q1',
        type: 'single',
        prompt: 'Por que passar `CultureInfo.InvariantCulture` para `double.Parse`?',
        options: [
          {
            id: 'a',
            text: 'Para o significado do ponto e da vírgula não depender da configuração da máquina.',
            correct: true,
          },
          { id: 'b', text: 'Para acelerar a conversão.' },
          { id: 'c', text: 'Porque sem isso o método lança exceção.' },
          { id: 'd', text: 'Para o resultado sair sempre com duas casas decimais.' },
        ],
        explanation:
          'É uma questão de determinismo. O mesmo texto tem que virar o mesmo número em qualquer computador.',
      },
      {
        id: 's01c04l05q2',
        type: 'single',
        prompt: 'Qual chamada é a forma correta e segura de ler um preço com fração?',
        options: [
          {
            id: 'a',
            code: 'decimal.TryParse(s, NumberStyles.Number, CultureInfo.InvariantCulture, out decimal p)',
            correct: true,
          },
          { id: 'b', code: 'int.TryParse(s, out int p)' },
          { id: 'c', code: 'Convert.ToDecimal(s)' },
          { id: 'd', code: 'decimal.Parse(s)' },
        ],
        explanation:
          'Combina as duas boas práticas: `Try` para não quebrar com entrada inválida e cultura explícita para não depender da máquina. A B descarta os centavos e as outras duas quebram ou variam.',
      },
      {
        id: 's01c04l05q3',
        type: 'single',
        prompt: 'A entrada é a linha `12.5`. O que este código imprime?',
        code: `double d = double.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
Console.WriteLine(d * 2);`,
        options: [
          { id: 'a', code: '25', correct: true },
          { id: 'b', code: '12.512.5' },
          { id: 'c', code: '24' },
          { id: 'd', code: '25.0' },
        ],
        explanation:
          '`12.5 * 2` dá exatamente `25`, e `double` imprime sem casas decimais quando a fração é zero. Não existe `.0` na saída padrão.',
      },
    ],
    challenge: {
      brief:
        'Leia duas linhas: a quantidade de litros abastecidos e o preço por litro. Imprima o total e o valor com 5% de desconto no cartão da rede.',
      requirements: [
        'Leia os dois valores como `decimal` usando `CultureInfo.InvariantCulture`',
        'Linha 1: `Total: 232.750`',
        'Linha 2: `Com desconto: 221.11250`',
        'O desconto é de 5% sobre o total',
        'Use `using System.Globalization;`',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        // Leia litros e preco por litro
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        decimal litros = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        decimal precoLitro = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);

        decimal total = litros * precoLitro;
        decimal comDesconto = total - (total * 0.05m);

        Console.WriteLine("Total: " + total);
        Console.WriteLine("Com desconto: " + comDesconto);
    }
}
`,
      hints: [
        'Passe `CultureInfo.InvariantCulture` como segundo argumento de `decimal.Parse`.',
        'Lembre que a escala do `decimal` se acumula: `47.5` (1 casa) vezes `4.90` (2 casas) dá 3 casas.',
      ],
      tests: [
        {
          name: 'Abastecimento de 47.5 litros',
          stdin: '47.5\n4.90\n',
          expectedStdout: 'Total: 232.750\nCom desconto: 221.11250',
        },
      ],
    },
  },
  {
    id: 's01c04l06',
    title: 'Conversões implícitas',
    objective: 'Entender quando C# converte tipos numéricos automaticamente e por que só numa direção.',
    concept: [
      {
        kind: 'text',
        body:
          'C# converte um tipo em outro sozinho quando a mudança é **segura**, ou seja, quando é impossível perder informação. Isso se chama conversão implícita.',
      },
      {
        kind: 'code',
        code: `int pequeno = 42;
long grande = pequeno;     // ok: todo int cabe num long
double real = pequeno;     // ok: todo int cabe num double

Console.WriteLine(grande);   // 42
Console.WriteLine(real);     // 42`,
      },
      {
        kind: 'text',
        body:
          'O caminho de volta não é automático, porque nem todo `long` cabe num `int` e nem todo `double` tem parte fracionária descartável.',
      },
      {
        kind: 'code',
        code: `double d = 3.9;
int i = d;    // ERRO CS0266: nao existe conversao implicita`,
        caption: 'O compilador exige que você declare a perda de informação de forma explícita.',
      },
      {
        kind: 'table',
        headers: ['De', 'Para (implícito)'],
        rows: [
          ['`int`', '`long`, `float`, `double`, `decimal`'],
          ['`long`', '`float`, `double`, `decimal`'],
          ['`float`', '`double`'],
          ['`char`', '`int`, `long`, `double`'],
          ['`double`', '**nada** (precisa cast)'],
          ['`decimal`', '**nada** (precisa cast)'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Essa é a razão de `7 / 2.0` funcionar: o `7` é promovido a `double` implicitamente para que os dois lados tenham o mesmo tipo, e a divisão sai real.',
      },
    ],
    quiz: [
      {
        id: 's01c04l06q1',
        type: 'single',
        prompt: 'Qual linha compila sem cast?',
        options: [
          { id: 'a', code: 'double x = 10;', correct: true },
          { id: 'b', code: 'int x = 10.0;' },
          { id: 'c', code: 'int x = 10m;' },
          { id: 'd', code: 'decimal x = 10.5;' },
        ],
        explanation:
          'Só a A vai do menor para o maior. A D falha porque `10.5` é um literal `double`, e `double` para `decimal` exige cast, mesmo parecendo inofensivo.',
      },
      {
        id: 's01c04l06q2',
        type: 'single',
        prompt: 'Por que `double media = soma / quantidade;` pode dar resultado errado mesmo com `media` sendo double?',
        options: [
          {
            id: 'a',
            text: 'Porque a divisão entre dois int já aconteceu e truncou antes da conversão implícita para double.',
            correct: true,
          },
          { id: 'b', text: 'Porque `double` não guarda frações exatas.' },
          { id: 'c', text: 'Porque falta `CultureInfo.InvariantCulture`.' },
          { id: 'd', text: 'Porque a conversão implícita arredonda para o inteiro mais próximo.' },
        ],
        explanation:
          'O tipo da variável de destino não influencia como a expressão é calculada. A promoção precisa acontecer **dentro** da conta: `(double)soma / quantidade`.',
      },
      {
        id: 's01c04l06q3',
        type: 'single',
        prompt: 'O que imprime?',
        code: `char letra = 'A';
int codigo = letra;
Console.WriteLine(codigo);`,
        options: [
          { id: 'a', code: '65', correct: true },
          { id: 'b', code: 'A' },
          { id: 'c', code: '0' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          '`char` converte implicitamente para `int`, revelando o código Unicode do caractere. `A` é 65, `a` é 97, `0` é 48.',
      },
    ],
    challenge: {
      brief:
        'Leia dois inteiros: o total de pontos de um time e o número de partidas. Imprima o total como `long`, a média de pontos por partida como `double`, e o código Unicode da primeira letra do nome do time lido na terceira linha.',
      requirements: [
        'Linha 1: `Total: 87`',
        'Linha 2: `Media: 5.8`',
        'Linha 3: `Codigo inicial: 70`',
        'A média deve usar divisão real, não inteira',
        'O código vem de converter o `char` inicial para `int`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int pontos = int.Parse(Console.ReadLine());
        int partidas = int.Parse(Console.ReadLine());
        string time = Console.ReadLine();

        // Total como long, media como double, codigo da inicial
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int pontos = int.Parse(Console.ReadLine());
        int partidas = int.Parse(Console.ReadLine());
        string time = Console.ReadLine();

        long total = pontos;
        double media = (double)pontos / partidas;
        int codigo = time[0];

        Console.WriteLine("Total: " + total);
        Console.WriteLine("Media: " + media);
        Console.WriteLine("Codigo inicial: " + codigo);
    }
}
`,
      hints: [
        'Atribuir um `int` a um `long` não pede nada: a conversão é implícita.',
        '`time[0]` devolve o primeiro `char` da string, e ele converte implicitamente para `int`.',
        'Sem o `(double)` na divisão, a média de 87 por 15 sairia como 5.',
      ],
      tests: [
        {
          name: 'Flamengo com 87 pontos',
          stdin: '87\n15\nFlamengo\n',
          expectedStdout: 'Total: 87\nMedia: 5.8\nCodigo inicial: 70',
        },
      ],
    },
  },
  {
    id: 's01c04l07',
    title: 'Conversão explícita (cast)',
    objective: 'Usar o cast para assumir a responsabilidade por uma conversão que pode perder informação.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando a conversão pode perder informação, C# obriga você a pedir explicitamente. A sintaxe é o nome do tipo entre parênteses antes do valor.',
      },
      {
        kind: 'code',
        code: `double preciso = 9.87;

int inteiro = (int)preciso;      // 9  -> a fracao e descartada
Console.WriteLine(inteiro);

decimal exato = (decimal)preciso;
Console.WriteLine(exato);        // 9.87`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O cast de ponto flutuante para inteiro **trunca**, sempre em direção ao zero. `(int)9.99` é `9` e `(int)-9.99` é `-9`. Se você quer arredondar, use `Math.Round` ou `Convert.ToInt32`.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Truncar',
          code: `(int)7.9    // 7
(int)7.1    // 7
(int)-7.9   // -7`,
        },
        right: {
          label: 'Arredondar',
          code: `Math.Round(7.9)   // 8
Math.Round(7.1)   // 7
Math.Round(-7.9)  // -8`,
        },
        note: 'Math.Round devolve double; combine com cast se precisar de int.',
      },
      {
        kind: 'text',
        body:
          'O cast é uma afirmação sua ao compilador: "eu sei que pode perder algo e assumo o risco". Ele não valida nada em tempo de execução para tipos numéricos, apenas corta o que não cabe.',
      },
    ],
    quiz: [
      {
        id: 's01c04l07q1',
        type: 'single',
        prompt: 'Qual é a saída?',
        code: 'Console.WriteLine((int)(19.0 / 4));',
        options: [
          { id: 'a', code: '4', correct: true },
          { id: 'b', code: '5' },
          { id: 'c', code: '4.75' },
          { id: 'd', code: '3' },
        ],
        explanation:
          'A divisão real dá `4.75`, e o cast trunca para `4`. Os parênteses são essenciais: sem eles o cast se aplicaria só ao `19.0`.',
      },
      {
        id: 's01c04l07q2',
        type: 'single',
        prompt: 'Como transformar `8.6` em `9` guardando o resultado num `int`?',
        options: [
          { id: 'a', code: '(int)Math.Round(8.6)', correct: true },
          { id: 'b', code: '(int)8.6' },
          { id: 'c', code: 'Math.Round((int)8.6)' },
          { id: 'd', code: '(int)Math.Floor(8.6)' },
        ],
        explanation:
          'Arredonde primeiro, converta depois. Na opção C o cast já truncou para 8 antes do arredondamento, e `Math.Floor` sempre desce.',
      },
      {
        id: 's01c04l07q3',
        type: 'single',
        prompt: 'O que acontece em `int x = (int)3000000000.0;`?',
        options: [
          {
            id: 'a',
            text: 'Compila e produz um valor sem sentido, porque 3 bilhões não cabe num int.',
            correct: true,
          },
          { id: 'b', text: 'Lança `OverflowException` em tempo de execução.' },
          { id: 'c', text: 'Guarda `int.MaxValue` automaticamente.' },
          { id: 'd', text: 'Não compila.' },
        ],
        explanation:
          'Por padrão a conversão não é verificada e o resultado fica indefinido. É justamente o cenário da próxima lição sobre overflow.',
      },
    ],
    challenge: {
      brief:
        'Leia uma linha com a temperatura em Fahrenheit (pode ter fração) e imprima a conversão para Celsius de três formas: o valor exato, o truncado e o arredondado.',
      requirements: [
        'A fórmula é `(f - 32) * 5 / 9`',
        'Linha 1: `Exato: 37.77777777777778`',
        'Linha 2: `Truncado: 37`',
        'Linha 3: `Arredondado: 38`',
        'Use `double`, cast e `Math.Round`',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        double f = double.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);

        // Converta para Celsius nas tres formas
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        double f = double.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);

        double celsius = (f - 32) * 5 / 9;

        Console.WriteLine("Exato: " + celsius);
        Console.WriteLine("Truncado: " + (int)celsius);
        Console.WriteLine("Arredondado: " + (int)Math.Round(celsius));
    }
}
`,
      hints: [
        'Os parênteses em `(f - 32)` são obrigatórios, senão a multiplicação vem primeiro.',
        'Como `f` é `double`, a divisão por 9 já é real e não precisa de `9.0`.',
        'Arredonde antes de converter: `(int)Math.Round(celsius)`.',
      ],
      tests: [
        {
          name: '100 graus Fahrenheit',
          stdin: '100\n',
          expectedStdout: 'Exato: 37.77777777777778\nTruncado: 37\nArredondado: 38',
        },
        {
          name: 'Congelamento em 32',
          stdin: '32\n',
          expectedStdout: 'Exato: 0\nTruncado: 0\nArredondado: 0',
        },
      ],
    },
  },
  {
    id: 's01c04l08',
    title: 'Overflow: quando o número não cabe',
    objective: 'Reconhecer o estouro de capacidade dos tipos inteiros e escolher entre checked, unchecked e um tipo maior.',
    concept: [
      {
        kind: 'text',
        body:
          'Todo tipo inteiro tem um limite. Um `int` vai de aproximadamente -2,1 bilhões a 2,1 bilhões. Quando uma conta passa desse teto, o valor **dá a volta** e vira negativo, sem aviso nenhum.',
      },
      {
        kind: 'code',
        code: `int maximo = int.MaxValue;
Console.WriteLine(maximo);        // 2147483647

int estourou = maximo + 1;
Console.WriteLine(estourou);      // -2147483648`,
        caption: 'O contador reinicia no menor valor possível. Nenhum erro é reportado.',
      },
      {
        kind: 'table',
        headers: ['Tipo', 'Limite máximo aproximado'],
        rows: [
          ['`byte`', '255'],
          ['`short`', '32 mil'],
          ['`int`', '2,1 bilhões'],
          ['`long`', '9,2 quintilhões'],
          ['`decimal`', '7,9 × 10²⁸'],
        ],
      },
      {
        kind: 'text',
        body:
          'Você pode pedir para o runtime avisar em vez de dar a volta, usando `checked`. Aí o estouro vira uma `OverflowException`, que é bem melhor que um número errado circulando pelo sistema.',
      },
      {
        kind: 'code',
        code: `int a = int.MaxValue;

int semAviso = a + 1;                // -2147483648, silencioso
int comAviso = checked(a + 1);        // OverflowException`,
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Na prática, a melhor defesa é escolher o tipo certo desde o começo. Contagens que podem crescer muito (visualizações, bytes transferidos, milissegundos acumulados) pedem `long`, não `int`.',
      },
    ],
    quiz: [
      {
        id: 's01c04l08q1',
        type: 'single',
        prompt: 'O que acontece com `int x = 2000000000; int y = x + x;` sem `checked`?',
        options: [
          { id: 'a', text: '`y` recebe um valor negativo por causa do estouro.', correct: true },
          { id: 'b', text: 'Lança `OverflowException`.' },
          { id: 'c', text: '`y` recebe `int.MaxValue`.' },
          { id: 'd', text: 'Não compila.' },
        ],
        explanation:
          '4 bilhões não cabe num `int`, então o valor dá a volta. Esse é o tipo de bug que aparece só quando o sistema já está em produção com volume alto.',
      },
      {
        id: 's01c04l08q2',
        type: 'single',
        prompt: 'Qual solução evita o estouro ao somar dois inteiros grandes?',
        options: [
          { id: 'a', code: 'long soma = (long)a + b;', correct: true },
          { id: 'b', code: 'long soma = a + b;' },
          { id: 'c', code: 'int soma = (int)((long)a + b);' },
          { id: 'd', code: 'double soma = a + b;' },
        ],
        explanation:
          'O cast precisa vir **antes** da soma, para que a conta aconteça em `long`. Na B a soma já estourou em `int` e só depois foi promovida.',
      },
      {
        id: 's01c04l08q3',
        type: 'single',
        prompt: 'Para que serve o bloco `checked`?',
        options: [
          {
            id: 'a',
            text: 'Fazer o runtime lançar OverflowException em vez de deixar o valor dar a volta silenciosamente.',
            correct: true,
          },
          { id: 'b', text: 'Verificar se uma variável é null antes de usar.' },
          { id: 'c', text: 'Aumentar automaticamente a capacidade do tipo.' },
          { id: 'd', text: 'Impedir a compilação de contas que possam estourar.' },
        ],
        explanation:
          'Ele troca um erro silencioso por um erro alto e claro. Não muda a capacidade do tipo nem detecta nada em tempo de compilação.',
      },
    ],
    challenge: {
      brief:
        'Um serviço registra 2 bilhões de eventos por dia. Leia o número de eventos diários e a quantidade de dias, e imprima o total calculado de duas formas: em `int` (mostrando o estouro) e em `long` (correto).',
      requirements: [
        'Linha 1: `Em int: -294967296`',
        'Linha 2: `Em long: 4000000000`',
        'Linha 3: `Estourou: True`',
        'O cálculo em `long` deve converter antes de multiplicar',
        '`Estourou` compara os dois resultados',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int porDia = int.Parse(Console.ReadLine());
        int dias = int.Parse(Console.ReadLine());

        // Calcule em int e em long, e compare
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int porDia = int.Parse(Console.ReadLine());
        int dias = int.Parse(Console.ReadLine());

        int emInt = porDia * dias;
        long emLong = (long)porDia * dias;
        bool estourou = emInt != emLong;

        Console.WriteLine("Em int: " + emInt);
        Console.WriteLine("Em long: " + emLong);
        Console.WriteLine("Estourou: " + estourou);
    }
}
`,
      hints: [
        'Em `(long)porDia * dias`, o cast promove o primeiro operando e a multiplicação inteira acontece em 64 bits.',
        'Se os dois resultados diferem, houve estouro no cálculo em `int`.',
      ],
      tests: [
        {
          name: '2 bilhões por 2 dias',
          stdin: '2000000000\n2\n',
          expectedStdout: 'Em int: -294967296\nEm long: 4000000000\nEstourou: True',
        },
        {
          name: 'Volume que cabe em int',
          stdin: '1000\n30\n',
          expectedStdout: 'Em int: 30000\nEm long: 30000\nEstourou: False',
        },
      ],
    },
  },
  {
    id: 's01c04l09',
    title: 'Prática: leitor de formulário',
    objective: 'Montar um fluxo completo de leitura, validação e cálculo com dados heterogêneos.',
    concept: [
      {
        kind: 'text',
        body:
          'Um formulário real mistura tipos: texto livre, número inteiro, valor com centavos, sim ou não. A rotina que funciona é ler tudo como texto e converter cada campo com a ferramenta adequada ao seu tipo.',
      },
      {
        kind: 'code',
        code: `string nome = Console.ReadLine();
int idade = int.Parse(Console.ReadLine());
decimal salario = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
bool aceita = Console.ReadLine() == "sim";`,
        caption: 'Cada linha do formulário, cada conversão no seu lugar.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Converter um "sim"/"não" em `bool` é só uma comparação de string. Não existe `bool.Parse("sim")`: o `bool.Parse` só entende `"true"` e `"false"`.',
      },
      {
        kind: 'text',
        body:
          'Uma dica de organização: leia todos os campos primeiro, calcule depois, imprima no final. Misturar leitura e impressão torna difícil enxergar o que o programa faz.',
      },
    ],
    quiz: [
      {
        id: 's01c04l09q1',
        type: 'single',
        prompt: 'Como converter a linha `sim` em um `bool` verdadeiro?',
        options: [
          { id: 'a', code: 'bool ok = Console.ReadLine() == "sim";', correct: true },
          { id: 'b', code: 'bool ok = bool.Parse(Console.ReadLine());' },
          { id: 'c', code: 'bool ok = Convert.ToBoolean(Console.ReadLine());' },
          { id: 'd', code: 'bool ok = (bool)Console.ReadLine();' },
        ],
        explanation:
          '`bool.Parse` e `Convert.ToBoolean` só aceitam `"true"` e `"false"`, e não existe cast de `string` para `bool`. Uma comparação resolve.',
      },
      {
        id: 's01c04l09q2',
        type: 'single',
        prompt: 'Numa entrada com 4 linhas, o que acontece se você chamar `Console.ReadLine()` cinco vezes?',
        options: [
          { id: 'a', text: 'A quinta chamada devolve `null`.', correct: true },
          { id: 'b', text: 'A quinta chamada relê a primeira linha.' },
          { id: 'c', text: 'O programa fica travado para sempre.' },
          { id: 'd', text: 'A quinta chamada devolve string vazia.' },
        ],
        explanation:
          'Fim de entrada devolve `null`. Se você passar esse `null` para `int.Parse`, o erro que aparece é uma `ArgumentNullException`, muitas vezes longe da causa real.',
      },
      {
        id: 's01c04l09q3',
        type: 'multiple',
        prompt: 'Quais são boas práticas ao ler dados de entrada?',
        options: [
          { id: 'a', text: 'Usar `TryParse` para qualquer campo numérico que venha de fora.', correct: true },
          { id: 'b', text: 'Passar `CultureInfo.InvariantCulture` ao ler decimais de arquivos e APIs.', correct: true },
          { id: 'c', text: 'Guardar cada campo em uma variável com nome descritivo.', correct: true },
          { id: 'd', text: 'Converter tudo com `Convert.ToInt32` porque nunca lança exceção.' },
          { id: 'e', text: 'Usar o valor de saída do `TryParse` sem checar o retorno.' },
        ],
        explanation:
          '`Convert.ToInt32` lança exceção com texto inválido (só o `null` é que virou zero), e ignorar o retorno do `TryParse` trata `0` como dado legítimo.',
      },
    ],
    challenge: {
      brief:
        'Leia um formulário de 4 linhas: nome, horas trabalhadas no mês, valor da hora, e se o profissional é PJ (`sim` ou `nao`). Calcule o bruto, o desconto de 11% aplicado só a quem não é PJ, e o líquido.',
      requirements: [
        'Linha 1: `Profissional: Marina`',
        'Linha 2: `Bruto: 14400.00`',
        'Linha 3: `Desconto: 1584.0000`',
        'Linha 4: `Liquido: 12816.0000`',
        'Quem é PJ tem desconto `0.00` e líquido igual ao bruto',
        'Use `decimal` com `CultureInfo.InvariantCulture`',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        int horas = int.Parse(Console.ReadLine());
        decimal valorHora = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        bool ehPj = Console.ReadLine() == "sim";

        // Bruto, desconto condicional e liquido
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        int horas = int.Parse(Console.ReadLine());
        decimal valorHora = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        bool ehPj = Console.ReadLine() == "sim";

        decimal bruto = valorHora * horas;
        decimal desconto = 0.00m;
        if (!ehPj)
        {
            desconto = bruto * 0.11m;
        }
        decimal liquido = bruto - desconto;

        Console.WriteLine("Profissional: " + nome);
        Console.WriteLine("Bruto: " + bruto);
        Console.WriteLine("Desconto: " + desconto);
        Console.WriteLine("Liquido: " + liquido);
    }
}
`,
      hints: [
        'Comece o desconto em `0.00m` e só recalcule quando `ehPj` for falso.',
        'Use `!ehPj` para inverter o booleano na condição.',
        'A multiplicação por `0.11m` acrescenta duas casas na escala do decimal, por isso o desconto sai com 4 casas.',
      ],
      tests: [
        {
          name: 'Marina como CLT',
          stdin: 'Marina\n160\n90.00\nnao\n',
          expectedStdout:
            'Profissional: Marina\nBruto: 14400.00\nDesconto: 1584.0000\nLiquido: 12816.0000',
        },
        {
          name: 'Profissional PJ sem desconto',
          stdin: 'Caio\n100\n120.50\nsim\n',
          expectedStdout:
            'Profissional: Caio\nBruto: 12050.00\nDesconto: 0.00\nLiquido: 12050.00',
        },
      ],
    },
  },
  {
    id: 's01c04l10',
    title: 'Checkpoint: entrada confiável',
    objective: 'Construir um programa que nunca quebra com entrada ruim, combinando leitura, validação e conversão.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint fecha o capítulo. A ideia central que você precisa levar daqui: **tudo que vem de fora é suspeito até ser validado**. Entrada de usuário, arquivo, API, banco de dados.',
      },
      {
        kind: 'table',
        headers: ['Precisa', 'Use'],
        rows: [
          ['Ler uma linha', '`Console.ReadLine()`'],
          ['Texto → int confiando', '`int.Parse`'],
          ['Texto → int validando', '`int.TryParse`'],
          ['Texto → decimal', '`decimal.Parse(s, CultureInfo.InvariantCulture)`'],
          ['Perder fração de propósito', 'cast `(int)`'],
          ['Arredondar', '`Math.Round` ou `Convert.ToInt32`'],
          ['Evitar estouro', 'converter para `long` antes da conta'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Um programa que responde "dado inválido" é infinitamente melhor que um que exibe um stack trace. Validar não é burocracia, é a diferença entre software e protótipo.',
      },
    ],
    quiz: [
      {
        id: 's01c04l10q1',
        type: 'single',
        prompt: 'A entrada é a linha `12abc`. O que acontece?',
        code: `if (int.TryParse(Console.ReadLine(), out int n))
    Console.WriteLine("ok " + n);
else
    Console.WriteLine("ruim " + n);`,
        options: [
          { id: 'a', code: 'ruim 0', correct: true },
          { id: 'b', code: 'ok 12' },
          { id: 'c', code: 'ruim 12' },
          { id: 'd', text: 'Exceção em tempo de execução' },
        ],
        explanation:
          '`TryParse` exige que a string **inteira** seja um número. Ele não lê os dígitos iniciais e para: falha e zera a saída.',
      },
      {
        id: 's01c04l10q2',
        type: 'multiple',
        prompt: 'Marque as afirmações verdadeiras.',
        options: [
          { id: 'a', text: '`(int)7.9` vale 7 e `Convert.ToInt32(7.9)` vale 8.', correct: true },
          { id: 'b', text: 'Somar dois `int` grandes pode gerar resultado negativo.', correct: true },
          { id: 'c', text: '`Console.ReadLine()` devolve `string` mesmo quando o usuário digita números.', correct: true },
          { id: 'd', text: '`double` converte implicitamente para `int` quando a fração é zero.' },
          { id: 'e', text: '`int.Parse("")` devolve 0.' },
        ],
        explanation:
          'Não existe conversão implícita de `double` para `int` em nenhuma circunstância, e `int.Parse("")` lança `FormatException`.',
      },
      {
        id: 's01c04l10q3',
        type: 'single',
        prompt:
          'Você precisa calcular a média de uma lista de notas lidas como texto, tolerando linhas inválidas. Qual combinação é a correta?',
        options: [
          {
            id: 'a',
            text: '`double.TryParse` com cultura invariante, contando só as linhas válidas e dividindo com divisão real.',
            correct: true,
          },
          { id: 'b', text: '`int.Parse` em cada linha e dividir pelo total de linhas lidas.' },
          { id: 'c', text: '`Convert.ToDouble` em cada linha, tratando falha como zero.' },
          { id: 'd', text: '`double.Parse` sem cultura, dividindo pelo total de linhas.' },
        ],
        explanation:
          'Dividir pelo total de linhas em vez do total de válidas distorce a média para baixo, e tratar falha como zero faz o mesmo. `Try` mais contagem separada é o caminho.',
      },
    ],
    challenge: {
      brief:
        'Um caixa lê o código do produto, a quantidade e o preço unitário, nessa ordem, mas os operadores erram com frequência. Valide a quantidade e o preço: se algum for inválido, imprima uma mensagem de erro e nada mais. Se ambos forem válidos, imprima o resumo da venda.',
      requirements: [
        'Entrada válida imprime 3 linhas: `Produto: A-1042`, `Itens: 3`, `Total: 74.70`',
        'Se a quantidade for inválida, imprima só `Erro: quantidade invalida`',
        'Se o preço for inválido, imprima só `Erro: preco invalido`',
        'A quantidade é inválida também quando for zero ou negativa',
        'Use `int.TryParse` e `decimal.TryParse` com `NumberStyles.Number` e `CultureInfo.InvariantCulture`',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        string codigo = Console.ReadLine();
        string linhaQtd = Console.ReadLine();
        string linhaPreco = Console.ReadLine();

        // Valide e decida o que imprimir
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        string codigo = Console.ReadLine();
        string linhaQtd = Console.ReadLine();
        string linhaPreco = Console.ReadLine();

        bool qtdOk = int.TryParse(linhaQtd, out int quantidade) && quantidade > 0;
        bool precoOk = decimal.TryParse(
            linhaPreco,
            NumberStyles.Number,
            CultureInfo.InvariantCulture,
            out decimal preco);

        if (!qtdOk)
        {
            Console.WriteLine("Erro: quantidade invalida");
        }
        else if (!precoOk)
        {
            Console.WriteLine("Erro: preco invalido");
        }
        else
        {
            Console.WriteLine("Produto: " + codigo);
            Console.WriteLine("Itens: " + quantidade);
            Console.WriteLine("Total: " + preco * quantidade);
        }
    }
}
`,
      hints: [
        'Combine o resultado do `TryParse` com a regra de negócio num único `bool`: `int.TryParse(...) && quantidade > 0`.',
        'O curto-circuito do `&&` garante que `quantidade > 0` só é avaliado quando a conversão deu certo.',
        'Verifique a quantidade antes do preço, porque a ordem das mensagens de erro importa.',
        '`24.90m * 3` mantém duas casas decimais, resultando em `74.70`.',
      ],
      tests: [
        {
          name: 'Venda válida',
          stdin: 'A-1042\n3\n24.90\n',
          expectedStdout: 'Produto: A-1042\nItens: 3\nTotal: 74.70',
        },
        {
          name: 'Quantidade com texto',
          stdin: 'A-1042\ntres\n24.90\n',
          expectedStdout: 'Erro: quantidade invalida',
        },
        {
          name: 'Quantidade zero',
          stdin: 'A-1042\n0\n24.90\n',
          expectedStdout: 'Erro: quantidade invalida',
        },
        {
          name: 'Preço inválido',
          stdin: 'A-1042\n2\nR$ 24,90\n',
          expectedStdout: 'Erro: preco invalido',
        },
      ],
    },
  },
]
