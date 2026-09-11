import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's06c01l01',
    title: 'O que é uma exceção',
    objective: 'Entender o que acontece quando um programa encontra uma situação que ele não sabe tratar.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma **exceção** é o mecanismo do C# para sinalizar que algo deu errado de um jeito que o código atual não consegue resolver. Ela interrompe a execução e sobe procurando quem saiba lidar com aquilo.',
      },
      {
        kind: 'output',
        code: `antes do erro
[erro em tempo de execução] InvalidOperationException: estourou aqui`,
        caption: 'O que já foi impresso continua impresso. O que vinha depois nunca acontece.',
      },
      {
        kind: 'text',
        body:
          'Repare na sequência: o programa rodou normalmente até o ponto do erro, e a partir dali **nada mais executou**. Não houve retorno de valor errado nem continuação silenciosa — a execução simplesmente parou.',
      },
      {
        kind: 'table',
        headers: ['Estratégia', 'O que acontece com um erro', 'Problema'],
        rows: [
          ['devolver um valor especial', '`-1` significa "deu errado"', 'fácil de ignorar'],
          ['devolver `false`', 'quem chamou verifica', 'e se ele não verificar?'],
          ['**exceção**', 'a execução para', '**impossível de ignorar**'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A vantagem da exceção é justamente ser barulhenta. Um código que devolve `-1` em caso de erro permite que o erro passe despercebido e contamine cálculos seguintes. Uma exceção não deixa.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Exceção é para o **excepcional**. Um arquivo ausente, uma entrada malformada, uma divisão por zero — situações fora do fluxo normal. Um usuário digitar um valor inválido em um formulário é esperado, e merece validação, não exceção.',
      },
      {
        kind: 'text',
        body:
          'Toda exceção carrega ao menos três coisas: o **tipo** (que diz a categoria do problema), a **mensagem** (que descreve o caso) e o **rastro de pilha** (que diz onde aconteceu). Os três aparecem nas próximas lições.',
      },
    ],
    quiz: [
      {
        id: 's06c01l01q1',
        type: 'single',
        prompt: 'O que acontece com o código que vem depois do ponto onde uma exceção é lançada?',
        options: [
          { id: 'a', text: 'Nunca executa: a execução é interrompida ali.', correct: true },
          { id: 'b', text: 'Executa normalmente.' },
          { id: 'c', text: 'Executa, mas com valores zerados.' },
          { id: 'd', text: 'Executa apenas se estiver em outro método.' },
        ],
        explanation:
          'A exceção interrompe o fluxo no ponto exato do erro e sobe procurando quem a trate. Nada entre esse ponto e o tratamento chega a rodar.',
      },
      {
        id: 's06c01l01q2',
        type: 'single',
        prompt: 'Qual é a vantagem de uma exceção sobre devolver `-1` em caso de erro?',
        options: [
          { id: 'a', text: 'Ela é impossível de ignorar por acidente.', correct: true },
          { id: 'b', text: 'Ela é mais rápida.' },
          { id: 'c', text: 'Ela ocupa menos memória.' },
          { id: 'd', text: 'Ela sempre encerra o programa.' },
        ],
        explanation:
          'Um `-1` ignorado vira entrada de outro cálculo e o erro se espalha silenciosamente. Uma exceção obriga alguém a decidir o que fazer.',
      },
      {
        id: 's06c01l01q3',
        type: 'single',
        prompt: 'Quando um erro **não** deveria virar exceção?',
        options: [
          { id: 'a', text: 'Quando ele faz parte do fluxo esperado, como um formulário mal preenchido.', correct: true },
          { id: 'b', text: 'Quando ele acontece dentro de um laço.' },
          { id: 'c', text: 'Quando ele acontece em um método privado.' },
          { id: 'd', text: 'Exceções servem para qualquer erro.' },
        ],
        explanation:
          'Exceção é para o excepcional. Entrada de usuário inválida é rotina, e validar é mais barato e mais claro que lançar e capturar.',
      },
    ],
    challenge: {
      brief:
        'Compare as duas estratégias: um método que sinaliza erro devolvendo um valor especial e outro que valida antes, mostrando por que a primeira é fácil de ignorar.',
      requirements: [
        '`DividirOuMenosUm(int a, int b)` devolve `a / b`, ou `-1` quando `b` é zero',
        '`PodeDividir(int b)` devolve se a divisão é possível',
        'O `Main` mostra que o valor `-1` se propaga para o cálculo seguinte sem alarde',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva DividirOuMenosUm e PodeDividir aqui

    static void Main()
    {
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());

        int resultado = DividirOuMenosUm(a, b);
        Console.WriteLine($"Resultado: {resultado}");

        // o -1 vira entrada do proximo calculo sem ninguem perceber
        int dobro = resultado * 2;
        Console.WriteLine($"Dobro: {dobro}");

        Console.WriteLine($"Pode dividir: {PodeDividir(b)}");

        if (PodeDividir(b))
        {
            Console.WriteLine($"Divisao segura: {a / b}");
        }
        else
        {
            Console.WriteLine("Divisao segura: recusada");
        }
    }
}
`,
      solution: `using System;

class Program
{
    static int DividirOuMenosUm(int a, int b)
    {
        if (b == 0)
        {
            return -1;
        }

        return a / b;
    }

    static bool PodeDividir(int b)
    {
        return b != 0;
    }

    static void Main()
    {
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());

        int resultado = DividirOuMenosUm(a, b);
        Console.WriteLine($"Resultado: {resultado}");

        // o -1 vira entrada do proximo calculo sem ninguem perceber
        int dobro = resultado * 2;
        Console.WriteLine($"Dobro: {dobro}");

        Console.WriteLine($"Pode dividir: {PodeDividir(b)}");

        if (PodeDividir(b))
        {
            Console.WriteLine($"Divisao segura: {a / b}");
        }
        else
        {
            Console.WriteLine("Divisao segura: recusada");
        }
    }
}
`,
      hints: [
        'O `DividirOuMenosUm` verifica o divisor antes de dividir e devolve `-1` no caso ruim.',
        'Repare na saída: com `b` igual a zero, o dobro vira `-2` — um número que parece um resultado legítimo.',
      ],
      tests: [
        {
          name: 'Divisao valida',
          stdin: '10\n2\n',
          expectedStdout:
            'Resultado: 5\nDobro: 10\nPode dividir: True\nDivisao segura: 5',
        },
        {
          name: 'Divisor zero contamina o calculo',
          stdin: '10\n0\n',
          expectedStdout:
            'Resultado: -1\nDobro: -2\nPode dividir: False\nDivisao segura: recusada',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c01l02',
    title: 'try e catch',
    objective: 'Capturar uma exceção e decidir o que fazer, em vez de deixar o programa morrer.',
    concept: [
      {
        kind: 'text',
        body:
          'O bloco `try` marca o trecho onde algo pode dar errado. O `catch` recebe o problema e decide o que fazer com ele.',
      },
      {
        kind: 'code',
        code: `try
{
    int n = int.Parse(texto);       // pode falhar
    Console.WriteLine(n * 2);
}
catch (FormatException e)
{
    Console.WriteLine($"Nao era um numero: {e.Message}");
}`,
        caption: 'Se o `Parse` falhar, a linha seguinte não executa e o controle pula direto para o `catch`.',
      },
      {
        kind: 'text',
        body:
          'A variável do `catch` — o `e` acima — é a própria exceção. Ela carrega a `Message`, o `StackTrace` e o tipo, e serve para decidir o que informar ou registrar.',
      },
      {
        kind: 'table',
        headers: ['Situação', 'O que acontece'],
        rows: [
          ['nada falha', 'o `try` roda inteiro, o `catch` é ignorado'],
          ['falha no meio', 'o resto do `try` é pulado, o `catch` roda'],
          ['tipo não bate', 'o `catch` não pega, e a exceção continua subindo'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um `catch` vazio é uma das piores coisas que se pode escrever. Ele engole o erro sem tratar e sem registrar, e o programa segue em um estado que ninguém previu. Se você capturou, faça alguma coisa — nem que seja avisar.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Capture apenas o que você **sabe tratar**. Se o seu método não tem o que fazer com um erro de disco, deixe-o subir para quem tem. Capturar cedo demais transforma um problema visível em um problema escondido.',
      },
    ],
    quiz: [
      {
        id: 's06c01l02q1',
        type: 'single',
        prompt: 'O que acontece com o resto do bloco `try` quando uma exceção é lançada no meio dele?',
        options: [
          { id: 'a', text: 'É pulado: o controle vai direto para o `catch`.', correct: true },
          { id: 'b', text: 'Continua executando até o fim do bloco.' },
          { id: 'c', text: 'Executa de novo desde o começo.' },
          { id: 'd', text: 'Depende do tipo da exceção.' },
        ],
        explanation:
          'A exceção interrompe o fluxo imediatamente. Tudo entre o ponto do erro e o fim do `try` é abandonado.',
      },
      {
        id: 's06c01l02q2',
        type: 'single',
        prompt: 'O que acontece se o tipo do `catch` não corresponder à exceção lançada?',
        options: [
          { id: 'a', text: 'O `catch` não pega, e a exceção continua subindo.', correct: true },
          { id: 'b', text: 'O `catch` pega assim mesmo.' },
          { id: 'c', text: 'Erro de compilação.' },
          { id: 'd', text: 'O programa ignora a exceção.' },
        ],
        explanation:
          'Cada `catch` declara o tipo que sabe tratar. Se não bate, é como se aquele `catch` não existisse.',
      },
      {
        id: 's06c01l02q3',
        type: 'single',
        prompt: 'Por que um `catch` vazio é perigoso?',
        options: [
          { id: 'a', text: 'Ele engole o erro sem tratar, e o programa segue em estado imprevisto.', correct: true },
          { id: 'b', text: 'Ele deixa o programa mais lento.' },
          { id: 'c', text: 'Ele não compila.' },
          { id: 'd', text: 'Ele captura exceções demais.' },
        ],
        explanation:
          'O erro desaparece sem deixar rastro, e o sintoma aparece bem longe da causa — o cenário mais difícil de depurar que existe.',
      },
    ],
    challenge: {
      brief:
        'Leia valores que podem estar malformados e trate cada falha sem deixar o programa morrer.',
      requirements: [
        '`ConverterOuZero(string texto)` devolve o inteiro convertido, ou `0` se a conversão falhar',
        'A falha é tratada com `try`/`catch` capturando `FormatException`',
        'Cada falha imprime `invalido: texto` antes de devolver `0`',
        '`SomaSegura(List<string> entradas)` soma tudo que converter e devolve o total',
        'O `Main` mostra o total e quantas entradas eram inválidas',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static int invalidos = 0;

    // Escreva ConverterOuZero e SomaSegura aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<string> entradas = new List<string>();

        for (int i = 0; i < n; i++)
        {
            entradas.Add(Console.ReadLine());
        }

        int total = SomaSegura(entradas);

        Console.WriteLine($"Total: {total}");
        Console.WriteLine($"Invalidos: {invalidos}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static int invalidos = 0;

    static int ConverterOuZero(string texto)
    {
        try
        {
            return int.Parse(texto);
        }
        catch (FormatException)
        {
            Console.WriteLine($"invalido: {texto}");
            invalidos++;
            return 0;
        }
    }

    static int SomaSegura(List<string> entradas)
    {
        int total = 0;

        foreach (string entrada in entradas)
        {
            total += ConverterOuZero(entrada);
        }

        return total;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<string> entradas = new List<string>();

        for (int i = 0; i < n; i++)
        {
            entradas.Add(Console.ReadLine());
        }

        int total = SomaSegura(entradas);

        Console.WriteLine($"Total: {total}");
        Console.WriteLine($"Invalidos: {invalidos}");
    }
}
`,
      hints: [
        'O `return` dentro do `try` só acontece se a conversão der certo; o `catch` tem o seu próprio `return`.',
        'Você não precisa da variável da exceção se não vai usá-la: `catch (FormatException)` basta.',
      ],
      tests: [
        {
          name: 'Mistura de validos e invalidos',
          stdin: '4\n10\nabc\n20\nxyz\n',
          expectedStdout:
            'invalido: abc\ninvalido: xyz\nTotal: 30\nInvalidos: 2',
        },
        {
          name: 'Todos validos',
          stdin: '3\n1\n2\n3\n',
          expectedStdout: 'Total: 6\nInvalidos: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c01l03',
    title: 'Exceções mais comuns',
    objective: 'Reconhecer os tipos de exceção que mais aparecem e o que cada um indica.',
    concept: [
      {
        kind: 'text',
        body:
          'O tipo da exceção é a primeira pista sobre o que aconteceu. Vale reconhecer os mais frequentes de imediato — eles cobrem a grande maioria dos erros do dia a dia.',
      },
      {
        kind: 'table',
        headers: ['Tipo', 'Causa típica', 'Mensagem'],
        rows: [
          ['`IndexOutOfRangeException`', 'índice além do array', 'Index was outside the bounds of the array.'],
          ['`NullReferenceException`', 'uso de referência nula', '—'],
          ['`FormatException`', 'texto que não converte', "The input string 'abc' was not in a correct format."],
          ['`DivideByZeroException`', 'divisão inteira por zero', 'Attempted to divide by zero.'],
          ['`KeyNotFoundException`', 'chave ausente no dicionário', '—'],
          ['`InvalidCastException`', 'conversão de tipo impossível', '—'],
          ['`OverflowException`', 'estouro em bloco `checked`', 'Arithmetic operation resulted in an overflow.'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A `NullReferenceException` é a campeã histórica. Ela quase nunca aponta para o erro real: o problema não é a linha que usou o nulo, e sim o ponto — muitas vezes distante — em que aquele valor deveria ter sido preenchido e não foi.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Divisão de **inteiros** por zero lança exceção; divisão de **ponto flutuante** não. `5.0 / 0` devolve `Infinity` silenciosamente, e `0.0 / 0` devolve `NaN`. É uma diferença que pega muita gente.',
      },
      {
        kind: 'text',
        body:
          'Vários desses tipos são **evitáveis por verificação**: conferir o tamanho antes de indexar, usar `TryGetValue` no dicionário, `TryParse` na conversão. Preferir a verificação é mais barato e mais claro que capturar.',
      },
    ],
    quiz: [
      {
        id: 's06c01l03q1',
        type: 'single',
        prompt: 'Qual exceção acontece ao acessar `array[5]` em um array de 2 posições?',
        options: [
          { id: 'a', code: 'IndexOutOfRangeException', correct: true },
          { id: 'b', code: 'ArgumentException' },
          { id: 'c', code: 'NullReferenceException' },
          { id: 'd', code: 'OverflowException' },
        ],
        explanation:
          'O índice está fora dos limites do array. É a exceção mais direta de diagnosticar, porque aponta exatamente para o acesso errado.',
      },
      {
        id: 's06c01l03q2',
        type: 'single',
        prompt: 'O que acontece em `5.0 / 0`?',
        options: [
          { id: 'a', text: 'Devolve `Infinity`, sem exceção.', correct: true },
          { id: 'b', code: 'DivideByZeroException' },
          { id: 'c', text: 'Devolve `0`.' },
          { id: 'd', code: 'OverflowException' },
        ],
        explanation:
          'Ponto flutuante tem representação para infinito e para `NaN`. Só a divisão inteira por zero lança exceção.',
      },
      {
        id: 's06c01l03q3',
        type: 'single',
        prompt: 'Por que a `NullReferenceException` costuma ser difícil de diagnosticar?',
        options: [
          { id: 'a', text: 'Porque o ponto onde ela estoura não é onde o valor deveria ter sido preenchido.', correct: true },
          { id: 'b', text: 'Porque ela não tem mensagem.' },
          { id: 'c', text: 'Porque ela não aparece no stack trace.' },
          { id: 'd', text: 'Porque ela só acontece em produção.' },
        ],
        explanation:
          'O sintoma e a causa ficam separados. A linha que estourou é apenas a primeira que tentou usar o valor ausente.',
      },
    ],
    challenge: {
      brief:
        'Provoque e capture cada uma das exceções mais comuns, imprimindo o tipo de cada uma.',
      requirements: [
        '`Testar(int caso)` provoca e captura a exceção correspondente ao caso, e devolve o nome do tipo',
        'Caso `1`: índice fora do array; caso `2`: referência nula; caso `3`: conversão inválida',
        'Caso `4`: divisão inteira por zero; caso `5`: chave ausente no dicionário',
        'Qualquer outro caso devolve `sem erro`',
        'Use `e.GetType().Name` para obter o nome do tipo',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Escreva Testar aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 1; i <= n; i++)
        {
            Console.WriteLine($"{i}: {Testar(i)}");
        }

        Console.WriteLine($"Fora da lista: {Testar(99)}");
        Console.WriteLine($"Double por zero: {5.0 / 0}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static string Testar(int caso)
    {
        try
        {
            if (caso == 1)
            {
                int[] pequeno = new int[2];
                Console.WriteLine(pequeno[5]);
            }
            else if (caso == 2)
            {
                string nulo = null;
                Console.WriteLine(nulo.Length);
            }
            else if (caso == 3)
            {
                Console.WriteLine(int.Parse("abc"));
            }
            else if (caso == 4)
            {
                int zero = 0;
                Console.WriteLine(10 / zero);
            }
            else if (caso == 5)
            {
                Dictionary<string, int> mapa = new Dictionary<string, int>();
                Console.WriteLine(mapa["ausente"]);
            }

            return "sem erro";
        }
        catch (Exception e)
        {
            return e.GetType().Name;
        }
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 1; i <= n; i++)
        {
            Console.WriteLine($"{i}: {Testar(i)}");
        }

        Console.WriteLine($"Fora da lista: {Testar(99)}");
        Console.WriteLine($"Double por zero: {5.0 / 0}");
    }
}
`,
      hints: [
        'Um único `catch (Exception e)` pega todos os casos, e `e.GetType().Name` diz qual foi.',
        'O `return "sem erro"` fica no fim do `try`: ele só é alcançado se nada tiver estourado.',
      ],
      tests: [
        {
          name: 'Cinco casos',
          stdin: '5\n',
          expectedStdout:
            '1: IndexOutOfRangeException\n2: NullReferenceException\n3: FormatException\n' +
            '4: DivideByZeroException\n5: KeyNotFoundException\n' +
            'Fora da lista: sem erro\nDouble por zero: Infinity',
        },
        {
          name: 'Apenas os tres primeiros',
          stdin: '3\n',
          expectedStdout:
            '1: IndexOutOfRangeException\n2: NullReferenceException\n3: FormatException\n' +
            'Fora da lista: sem erro\nDouble por zero: Infinity',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c01l04',
    title: 'Múltiplos blocos catch',
    objective: 'Tratar tipos diferentes de erro de formas diferentes, respeitando a ordem de especificidade.',
    concept: [
      {
        kind: 'text',
        body:
          'Um `try` pode ter vários `catch`. O primeiro cujo tipo corresponder é o que roda — e apenas ele.',
      },
      {
        kind: 'code',
        code: `try
{
    Processar(entrada);
}
catch (FormatException)
{
    Console.WriteLine("formato invalido");
}
catch (OverflowException)
{
    Console.WriteLine("numero grande demais");
}
catch (Exception e)
{
    Console.WriteLine($"erro inesperado: {e.GetType().Name}");
}`,
        caption: 'Do mais específico para o mais genérico, sempre.',
      },
      {
        kind: 'text',
        body:
          'A ordem importa porque a correspondência considera a **herança**: todas as exceções derivam de `Exception`, então um `catch (Exception)` pega tudo. Se ele vier primeiro, os demais nunca rodam.',
      },
      {
        kind: 'compare',
        good: `catch (FormatException) { }
catch (Exception) { }

// especifico primeiro:
// cada um pega o seu`,
        bad: `catch (Exception) { }
catch (FormatException) { }

// generico primeiro:
// nao compila`,
        goodLabel: 'Do específico ao genérico',
        badLabel: 'Genérico antes: inalcançável',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Colocar `catch (Exception)` antes de um mais específico é **erro de compilação**: o compilador percebe que o segundo bloco é inalcançável e recusa. É um dos raros casos em que ele protege você de um erro de lógica.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um `catch (Exception)` no fim é aceitável como rede de segurança, desde que ele **registre** o que aconteceu. O que não pode é ser a única forma de tratamento, porque aí todo erro vira a mesma mensagem genérica.',
      },
    ],
    quiz: [
      {
        id: 's06c01l04q1',
        type: 'single',
        prompt: 'Quantos blocos `catch` rodam quando uma exceção é capturada?',
        options: [
          { id: 'a', text: 'Apenas um: o primeiro cujo tipo corresponde.', correct: true },
          { id: 'b', text: 'Todos os que correspondem.' },
          { id: 'c', text: 'Todos, em ordem.' },
          { id: 'd', text: 'Depende do tipo da exceção.' },
        ],
        explanation:
          'A busca para no primeiro tipo compatível. Os demais são ignorados, mesmo que também correspondessem.',
      },
      {
        id: 's06c01l04q2',
        type: 'single',
        prompt: 'O que acontece se `catch (Exception)` vier antes de `catch (FormatException)`?',
        options: [
          { id: 'a', text: 'Erro de compilação: o segundo bloco é inalcançável.', correct: true },
          { id: 'b', text: 'Compila, e o segundo nunca roda.' },
          { id: 'c', text: 'Compila, e os dois rodam.' },
          { id: 'd', text: 'Compila com aviso.' },
        ],
        explanation:
          'Como toda exceção deriva de `Exception`, o compilador prova que o segundo nunca seria alcançado e recusa o código.',
      },
      {
        id: 's06c01l04q3',
        type: 'single',
        prompt: 'Quando um `catch (Exception)` genérico é aceitável?',
        options: [
          { id: 'a', text: 'Como rede de segurança no fim, desde que registre o que aconteceu.', correct: true },
          { id: 'b', text: 'Sempre, é a forma mais simples.' },
          { id: 'c', text: 'Nunca.' },
          { id: 'd', text: 'Apenas dentro de laços.' },
        ],
        explanation:
          'Ele evita que um erro imprevisto derrube tudo — mas só ajuda se deixar rastro. Sem registro, vira um `catch` vazio com mais passos.',
      },
    ],
    challenge: {
      brief:
        'Escreva um processador que trata três categorias de erro de formas diferentes, com uma rede de segurança no fim.',
      requirements: [
        '`Processar(string entrada)` converte a entrada e devolve uma descrição do que aconteceu',
        'Sucesso devolve `ok: N` com o dobro do valor convertido',
        '`FormatException` devolve `formato: texto nao numerico`',
        '`OverflowException` devolve `overflow: numero fora do alcance`',
        'Qualquer outra exceção devolve `inesperado: NomeDoTipo`',
        'Uma entrada vazia deve provocar a exceção genérica, lançando `ArgumentException` antes da conversão',
        'Os blocos `catch` vão do mais específico ao mais genérico',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva Processar aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            string entrada = Console.ReadLine();
            Console.WriteLine(Processar(entrada));
        }

        Console.WriteLine($"Muito grande: {Processar("99999999999999999999")}");
        Console.WriteLine($"Vazio: {Processar("")}");
    }
}
`,
      solution: `using System;

class Program
{
    static string Processar(string entrada)
    {
        try
        {
            if (entrada.Length == 0)
            {
                throw new ArgumentException("entrada vazia");
            }

            int valor = int.Parse(entrada);
            return $"ok: {valor * 2}";
        }
        catch (FormatException)
        {
            return "formato: texto nao numerico";
        }
        catch (OverflowException)
        {
            return "overflow: numero fora do alcance";
        }
        catch (Exception e)
        {
            return $"inesperado: {e.GetType().Name}";
        }
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            string entrada = Console.ReadLine();
            Console.WriteLine(Processar(entrada));
        }

        Console.WriteLine($"Muito grande: {Processar("99999999999999999999")}");
        Console.WriteLine($"Vazio: {Processar("")}");
    }
}
`,
      hints: [
        '`OverflowException` acontece quando o texto é um número válido, mas grande demais para caber em um `int`.',
        'O `throw new ArgumentException(...)` para a entrada vazia é capturado pelo `catch (Exception)` do fim.',
      ],
      tests: [
        {
          name: 'Entradas variadas',
          stdin: '3\n21\nabc\n5\n',
          expectedStdout:
            'ok: 42\nformato: texto nao numerico\nok: 10\n' +
            'Muito grande: overflow: numero fora do alcance\n' +
            'Vazio: inesperado: ArgumentException',
        },
        {
          name: 'So numeros validos',
          stdin: '2\n0\n100\n',
          expectedStdout:
            'ok: 0\nok: 200\n' +
            'Muito grande: overflow: numero fora do alcance\n' +
            'Vazio: inesperado: ArgumentException',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c01l05',
    title: 'finally',
    objective: 'Garantir que uma limpeza aconteça, tenha dado certo ou errado.',
    concept: [
      {
        kind: 'text',
        body:
          'O bloco `finally` roda **sempre**: depois do `try` bem-sucedido, depois de um `catch`, e até quando a exceção não é capturada e vai embora. É o lugar da limpeza.',
      },
      {
        kind: 'code',
        code: `try
{
    Console.WriteLine("try");
    throw new Exception("x");
}
catch
{
    Console.WriteLine("catch");
}
finally
{
    Console.WriteLine("finally");
}`,
      },
      {
        kind: 'output',
        code: `try
catch
finally`,
        caption: 'O `finally` roda por último, independentemente do caminho tomado.',
      },
      {
        kind: 'text',
        body:
          'O caso que surpreende: o `finally` roda **mesmo quando o `try` tem um `return`**. O valor de retorno é calculado, o `finally` executa, e só então o método devolve.',
      },
      {
        kind: 'output',
        code: `static int ComReturn()
{
    try { return 1; }
    finally { Console.WriteLine("finally com return"); }
}

// saida:
finally com return
comReturn: 1`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'É por isso que o `finally` é o lugar certo para fechar arquivos, liberar conexões e devolver recursos: não existe caminho de saída do `try` que escape dele.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Nunca dê `return` de dentro de um `finally`. Ele sobrescreve silenciosamente o valor que o `try` ia devolver — e, pior, descarta uma exceção que estivesse subindo. O compilador nem sempre reclama.',
      },
    ],
    quiz: [
      {
        id: 's06c01l05q1',
        type: 'single',
        prompt: 'Quando o bloco `finally` executa?',
        options: [
          { id: 'a', text: 'Sempre: com sucesso, com exceção capturada, ou com exceção subindo.', correct: true },
          { id: 'b', text: 'Apenas quando não houve exceção.' },
          { id: 'c', text: 'Apenas quando houve exceção.' },
          { id: 'd', text: 'Apenas quando existe um `catch`.' },
        ],
        explanation:
          'Essa garantia é a razão de ele existir. Nenhum caminho de saída do `try` pula o `finally`.',
      },
      {
        id: 's06c01l05q2',
        type: 'single',
        prompt: 'O `finally` roda quando o `try` tem um `return`?',
        options: [
          { id: 'a', text: 'Sim: o valor é calculado, o `finally` roda, e só então o método devolve.', correct: true },
          { id: 'b', text: 'Não: o `return` sai antes.' },
          { id: 'c', text: 'Só se o valor for um tipo por referência.' },
          { id: 'd', text: 'Só se não houver `catch`.' },
        ],
        explanation:
          'É o comportamento que garante a limpeza mesmo em métodos com vários pontos de saída.',
      },
      {
        id: 's06c01l05q3',
        type: 'single',
        prompt: 'Por que não dar `return` dentro de um `finally`?',
        options: [
          { id: 'a', text: 'Porque ele sobrescreve o retorno do `try` e descarta exceções que subiam.', correct: true },
          { id: 'b', text: 'Porque não compila.' },
          { id: 'c', text: 'Porque deixa o método mais lento.' },
          { id: 'd', text: 'Porque o `finally` não pode ter código.' },
        ],
        explanation:
          'Uma exceção em trânsito simplesmente desaparece, e o erro some sem deixar rastro. É um bug muito difícil de encontrar.',
      },
    ],
    challenge: {
      brief:
        'Simule uma operação com recurso que precisa ser fechado, e prove que o fechamento acontece nos três caminhos possíveis.',
      requirements: [
        '`Operar(int caso)` imprime `abrindo`, executa a operação e imprime `fechando` no `finally`',
        'Caso `1`: sucesso, imprime `processando` e devolve `sucesso`',
        'Caso `2`: lança `InvalidOperationException`, capturada no próprio método, devolve `tratado`',
        'Caso `3`: lança `FormatException`, **não** capturada no método, que sobe para o `Main`',
        'O `Main` captura o caso 3 e mostra que o `fechando` aconteceu mesmo assim',
        '`ComReturn()` devolve `10` de dentro do `try` e imprime `finally rodou` no `finally`',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva Operar e ComReturn aqui

    static void Main()
    {
        Console.WriteLine($"caso 1 -> {Operar(1)}");
        Console.WriteLine("---");
        Console.WriteLine($"caso 2 -> {Operar(2)}");
        Console.WriteLine("---");

        try
        {
            Console.WriteLine($"caso 3 -> {Operar(3)}");
        }
        catch (FormatException e)
        {
            Console.WriteLine($"main capturou: {e.GetType().Name}");
        }

        Console.WriteLine("---");
        Console.WriteLine($"retorno: {ComReturn()}");
    }
}
`,
      solution: `using System;

class Program
{
    static string Operar(int caso)
    {
        Console.WriteLine("abrindo");

        try
        {
            if (caso == 2)
            {
                throw new InvalidOperationException("falha tratada");
            }

            if (caso == 3)
            {
                throw new FormatException("falha nao tratada");
            }

            Console.WriteLine("processando");
            return "sucesso";
        }
        catch (InvalidOperationException)
        {
            return "tratado";
        }
        finally
        {
            Console.WriteLine("fechando");
        }
    }

    static int ComReturn()
    {
        try
        {
            return 10;
        }
        finally
        {
            Console.WriteLine("finally rodou");
        }
    }

    static void Main()
    {
        Console.WriteLine($"caso 1 -> {Operar(1)}");
        Console.WriteLine("---");
        Console.WriteLine($"caso 2 -> {Operar(2)}");
        Console.WriteLine("---");

        try
        {
            Console.WriteLine($"caso 3 -> {Operar(3)}");
        }
        catch (FormatException e)
        {
            Console.WriteLine($"main capturou: {e.GetType().Name}");
        }

        Console.WriteLine("---");
        Console.WriteLine($"retorno: {ComReturn()}");
    }
}
`,
      hints: [
        'O `catch` do `Operar` só pega `InvalidOperationException`, então a `FormatException` do caso 3 passa direto — mas o `finally` roda antes de ela subir.',
        'Repare na ordem da saída do caso 3: `fechando` aparece **antes** de `main capturou`.',
      ],
      tests: [
        {
          name: 'Os tres caminhos',
          stdin: '',
          expectedStdout:
            'abrindo\nprocessando\nfechando\ncaso 1 -> sucesso\n---\n' +
            'abrindo\nfechando\ncaso 2 -> tratado\n---\n' +
            'abrindo\nfechando\nmain capturou: FormatException\n---\n' +
            'finally rodou\nretorno: 10',
        },
      ],
    },
  },
  {
    id: 's06c01l06',
    title: 'using e descarte',
    objective: 'Liberar recursos automaticamente com `using`, sem depender de um `finally` escrito à mão.',
    concept: [
      {
        kind: 'text',
        body:
          'Recursos como arquivos e conexões precisam ser fechados. O `using` faz isso automaticamente: ao sair do bloco, ele chama `Dispose()` no objeto — dando certo ou dando errado.',
      },
      {
        kind: 'compare',
        good: `using (var r = new Recurso("A"))
{
    Console.WriteLine("usando A");
}
// Dispose automatico`,
        bad: `var r = new Recurso("A");
try
{
    Console.WriteLine("usando A");
}
finally
{
    r.Dispose();
}`,
        goodLabel: 'Com using',
        badLabel: 'À mão: mesma coisa, mais ruído',
      },
      {
        kind: 'output',
        code: `abriu A
usando A
fechou A`,
        caption: 'O `fechou` sai sozinho, ao final do bloco.',
      },
      {
        kind: 'text',
        body:
          'Para participar disso, o tipo precisa implementar `IDisposable` — a interface do capítulo 5 da Seção 5, com um único método `Dispose()`. É o contrato que diz "eu tenho algo a liberar".',
      },
      {
        kind: 'code',
        code: `class Recurso : IDisposable
{
    public Recurso(string nome) { Console.WriteLine($"abriu {nome}"); }
    public void Dispose()      { Console.WriteLine($"fechou {nome}"); }
}`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Existe a forma sem chaves, a **declaração** `using var r = new Recurso("B");`. O descarte acontece no fim do método em vez do fim do bloco. É mais limpa quando o recurso vive o método inteiro.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O `using` não captura exceções — ele só garante o descarte. Se algo estourar dentro do bloco, o `Dispose` roda e a exceção continua subindo normalmente. Para tratá-la, ainda é preciso um `catch`.',
      },
    ],
    quiz: [
      {
        id: 's06c01l06q1',
        type: 'single',
        prompt: 'O que o `using` faz ao final do bloco?',
        options: [
          { id: 'a', text: 'Chama `Dispose()` no objeto.', correct: true },
          { id: 'b', text: 'Captura exceções.' },
          { id: 'c', text: 'Libera a memória do objeto.' },
          { id: 'd', text: 'Define o objeto como `null`.' },
        ],
        explanation:
          'Ele é açúcar sintático para um `try`/`finally` que chama `Dispose`. A memória continua sendo trabalho do coletor de lixo.',
      },
      {
        id: 's06c01l06q2',
        type: 'single',
        prompt: 'O que um tipo precisa para ser usado com `using`?',
        options: [
          { id: 'a', text: 'Implementar `IDisposable`.', correct: true },
          { id: 'b', text: 'Herdar de `Recurso`.' },
          { id: 'c', text: 'Ser uma classe selada.' },
          { id: 'd', text: 'Ter um destrutor.' },
        ],
        explanation:
          'É o contrato que declara que o tipo tem algo a liberar. Sem ele, o `using` nem compila.',
      },
      {
        id: 's06c01l06q3',
        type: 'single',
        prompt: 'O que acontece se uma exceção for lançada dentro de um bloco `using`?',
        options: [
          { id: 'a', text: 'O `Dispose` roda e a exceção continua subindo.', correct: true },
          { id: 'b', text: 'A exceção é capturada pelo `using`.' },
          { id: 'c', text: 'O `Dispose` não roda.' },
          { id: 'd', text: 'O programa encerra imediatamente.' },
        ],
        explanation:
          'O `using` garante a limpeza, não o tratamento. Ele resolve o descarte e deixa a decisão sobre o erro para quem sabe tratá-lo.',
      },
    ],
    challenge: {
      brief:
        'Implemente um recurso descartável e prove que ele é fechado nos três casos: sucesso, erro tratado e erro que escapa.',
      requirements: [
        '`Conexao` implementa `IDisposable`, recebe o nome no construtor e imprime `abriu nome`',
        '`Conexao.Dispose()` imprime `fechou nome`',
        '`Conexao.Executar(string comando)` imprime `executando comando`; se o comando for `falhar`, lança `InvalidOperationException`',
        '`Rodar(string comando)` usa `using` com bloco e devolve `ok` ou `tratado`, capturando a exceção',
        '`RodarSemTratar(string comando)` usa a **declaração** `using var` e deixa a exceção subir',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Conexao aqui

class Program
{
    // Escreva Rodar e RodarSemTratar aqui

    static void Main()
    {
        string comando = Console.ReadLine();

        Console.WriteLine($"-> {Rodar(comando)}");
        Console.WriteLine("---");
        Console.WriteLine($"-> {Rodar("falhar")}");
        Console.WriteLine("---");

        try
        {
            RodarSemTratar("falhar");
        }
        catch (InvalidOperationException e)
        {
            Console.WriteLine($"main capturou: {e.Message}");
        }
    }
}
`,
      solution: `using System;

class Conexao : IDisposable
{
    private string nome;

    public Conexao(string nome)
    {
        this.nome = nome;
        Console.WriteLine($"abriu {nome}");
    }

    public void Executar(string comando)
    {
        Console.WriteLine($"executando {comando}");

        if (comando == "falhar")
        {
            throw new InvalidOperationException("comando invalido");
        }
    }

    public void Dispose()
    {
        Console.WriteLine($"fechou {nome}");
    }
}

class Program
{
    static string Rodar(string comando)
    {
        try
        {
            using (Conexao c = new Conexao("principal"))
            {
                c.Executar(comando);
                return "ok";
            }
        }
        catch (InvalidOperationException)
        {
            return "tratado";
        }
    }

    static void RodarSemTratar(string comando)
    {
        using var c = new Conexao("secundaria");
        c.Executar(comando);
    }

    static void Main()
    {
        string comando = Console.ReadLine();

        Console.WriteLine($"-> {Rodar(comando)}");
        Console.WriteLine("---");
        Console.WriteLine($"-> {Rodar("falhar")}");
        Console.WriteLine("---");

        try
        {
            RodarSemTratar("falhar");
        }
        catch (InvalidOperationException e)
        {
            Console.WriteLine($"main capturou: {e.Message}");
        }
    }
}
`,
      hints: [
        'O `using` fica **dentro** do `try` no `Rodar`, para que o `catch` pegue a exceção depois do descarte.',
        'Repare que o `fechou` sempre aparece antes de `main capturou` — o descarte acontece enquanto a exceção sobe.',
      ],
      tests: [
        {
          name: 'Comando valido primeiro',
          stdin: 'listar\n',
          expectedStdout:
            'abriu principal\nexecutando listar\nfechou principal\n-> ok\n---\n' +
            'abriu principal\nexecutando falhar\nfechou principal\n-> tratado\n---\n' +
            'abriu secundaria\nexecutando falhar\nfechou secundaria\n' +
            'main capturou: comando invalido',
        },
        {
          name: 'Comando ja invalido',
          stdin: 'falhar\n',
          expectedStdout:
            'abriu principal\nexecutando falhar\nfechou principal\n-> tratado\n---\n' +
            'abriu principal\nexecutando falhar\nfechou principal\n-> tratado\n---\n' +
            'abriu secundaria\nexecutando falhar\nfechou secundaria\n' +
            'main capturou: comando invalido',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c01l07',
    title: 'Lançando com throw',
    objective: 'Sinalizar um erro do seu próprio código, escolhendo o tipo e a mensagem certos.',
    concept: [
      {
        kind: 'text',
        body:
          'Até aqui você capturou exceções lançadas pelo .NET. Agora vai lançar as suas: quando o seu método recebe algo que ele não tem como processar, ele avisa com `throw`.',
      },
      {
        kind: 'code',
        code: `static decimal Sacar(decimal saldo, decimal valor)
{
    if (valor <= 0)
        throw new ArgumentException("valor precisa ser positivo", nameof(valor));

    if (valor > saldo)
        throw new InvalidOperationException("saldo insuficiente");

    return saldo - valor;
}`,
        caption: 'O tipo comunica a categoria; a mensagem comunica o caso concreto.',
      },
      {
        kind: 'table',
        headers: ['Tipo a lançar', 'Quando'],
        rows: [
          ['`ArgumentException`', 'o argumento recebido é inválido'],
          ['`ArgumentNullException`', 'o argumento é nulo e não podia'],
          ['`ArgumentOutOfRangeException`', 'o argumento está fora da faixa'],
          ['`InvalidOperationException`', 'o objeto não está em estado de fazer isso'],
          ['`NotSupportedException`', 'a operação não faz sentido para este tipo'],
        ],
      },
      {
        kind: 'text',
        body:
          'A distinção importante: `ArgumentException` culpa **quem chamou** — ele passou algo errado. `InvalidOperationException` culpa o **momento** — os argumentos estão bem, mas o objeto não está pronto.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Use `nameof(parametro)` em vez de escrever o nome entre aspas. Se o parâmetro for renomeado depois, o `nameof` acompanha e a mensagem continua correta — uma string literal ficaria mentindo em silêncio.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Não lance `Exception` genérica. Quem for capturar não terá como distinguir o seu erro de qualquer outro, e será obrigado a escrever um `catch (Exception)` que pega tudo.',
      },
    ],
    quiz: [
      {
        id: 's06c01l07q1',
        type: 'single',
        prompt: 'Qual a diferença entre `ArgumentException` e `InvalidOperationException`?',
        options: [
          { id: 'a', text: 'A primeira culpa o argumento recebido; a segunda, o estado do objeto.', correct: true },
          { id: 'b', text: 'A primeira é mais grave.' },
          { id: 'c', text: 'A segunda não pode ser capturada.' },
          { id: 'd', text: 'São sinônimos.' },
        ],
        explanation:
          '"Você me passou um valor negativo" é diferente de "os valores estão bons, mas esta conta está encerrada".',
      },
      {
        id: 's06c01l07q2',
        type: 'single',
        prompt: 'Por que usar `nameof(valor)` em vez de `"valor"`?',
        options: [
          { id: 'a', text: 'Porque ele acompanha uma futura renomeação do parâmetro.', correct: true },
          { id: 'b', text: 'Porque é mais rápido.' },
          { id: 'c', text: 'Porque strings não são aceitas ali.' },
          { id: 'd', text: 'Porque ele traduz a mensagem.' },
        ],
        explanation:
          'Uma string literal continua com o nome antigo depois da renomeação, e passa a apontar para um parâmetro que não existe mais.',
      },
      {
        id: 's06c01l07q3',
        type: 'single',
        prompt: 'Por que não lançar `Exception` genérica?',
        options: [
          { id: 'a', text: 'Porque quem captura não consegue distinguir esse erro de qualquer outro.', correct: true },
          { id: 'b', text: 'Porque não compila.' },
          { id: 'c', text: 'Porque ela não tem mensagem.' },
          { id: 'd', text: 'Porque ela encerra o programa.' },
        ],
        explanation:
          'O tipo é a principal informação que uma exceção carrega. Lançar o tipo base joga fora essa informação.',
      },
    ],
    challenge: {
      brief:
        'Escreva operações de conta que recusam entradas inválidas com o tipo de exceção correto para cada caso.',
      requirements: [
        '`Conta` recebe titular e saldo inicial; o saldo inicial negativo lança `ArgumentOutOfRangeException`',
        '`Depositar(decimal valor)` lança `ArgumentException` com `nameof(valor)` se o valor não for positivo',
        '`Sacar(decimal valor)` lança `ArgumentException` se o valor não for positivo, e `InvalidOperationException` com a mensagem `saldo insuficiente` se faltar saldo',
        '`Encerrar()` marca a conta como encerrada; qualquer operação depois disso lança `InvalidOperationException` com a mensagem `conta encerrada`',
        '`Saldo` é somente de leitura de fora',
        '`Tentar(Action acao)` no `Main` já captura e imprime o tipo e a mensagem',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main` nem o método `Tentar`',
      ],
      starterCode: `using System;

// Declare a classe Conta aqui

class Program
{
    static void Tentar(string rotulo, Action acao)
    {
        try
        {
            acao();
            Console.WriteLine($"{rotulo}: ok");
        }
        catch (Exception e)
        {
            Console.WriteLine($"{rotulo}: {e.GetType().Name} - {e.Message}");
        }
    }

    static void Main()
    {
        decimal inicial = decimal.Parse(Console.ReadLine());

        Tentar("saldo negativo", () => new Conta("Ana", -1));

        Conta c = new Conta("Ana", inicial);
        Console.WriteLine($"saldo: {c.Saldo:F2}");

        Tentar("deposito valido", () => c.Depositar(100));
        Tentar("deposito zero", () => c.Depositar(0));
        Tentar("saque grande", () => c.Sacar(99999));
        Tentar("saque negativo", () => c.Sacar(-5));
        Tentar("saque valido", () => c.Sacar(50));

        Console.WriteLine($"saldo: {c.Saldo:F2}");

        c.Encerrar();
        Tentar("deposito apos encerrar", () => c.Depositar(10));
    }
}
`,
      solution: `using System;

class Conta
{
    private bool encerrada;

    public string Titular { get; }
    public decimal Saldo { get; private set; }

    public Conta(string titular, decimal saldoInicial)
    {
        if (saldoInicial < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(saldoInicial), "saldo inicial nao pode ser negativo");
        }

        Titular = titular;
        Saldo = saldoInicial;
    }

    public void Depositar(decimal valor)
    {
        GarantirAtiva();

        if (valor <= 0)
        {
            throw new ArgumentException("valor precisa ser positivo", nameof(valor));
        }

        Saldo += valor;
    }

    public void Sacar(decimal valor)
    {
        GarantirAtiva();

        if (valor <= 0)
        {
            throw new ArgumentException("valor precisa ser positivo", nameof(valor));
        }

        if (valor > Saldo)
        {
            throw new InvalidOperationException("saldo insuficiente");
        }

        Saldo -= valor;
    }

    public void Encerrar()
    {
        encerrada = true;
    }

    private void GarantirAtiva()
    {
        if (encerrada)
        {
            throw new InvalidOperationException("conta encerrada");
        }
    }
}

class Program
{
    static void Tentar(string rotulo, Action acao)
    {
        try
        {
            acao();
            Console.WriteLine($"{rotulo}: ok");
        }
        catch (Exception e)
        {
            Console.WriteLine($"{rotulo}: {e.GetType().Name} - {e.Message}");
        }
    }

    static void Main()
    {
        decimal inicial = decimal.Parse(Console.ReadLine());

        Tentar("saldo negativo", () => new Conta("Ana", -1));

        Conta c = new Conta("Ana", inicial);
        Console.WriteLine($"saldo: {c.Saldo:F2}");

        Tentar("deposito valido", () => c.Depositar(100));
        Tentar("deposito zero", () => c.Depositar(0));
        Tentar("saque grande", () => c.Sacar(99999));
        Tentar("saque negativo", () => c.Sacar(-5));
        Tentar("saque valido", () => c.Sacar(50));

        Console.WriteLine($"saldo: {c.Saldo:F2}");

        c.Encerrar();
        Tentar("deposito apos encerrar", () => c.Depositar(10));
    }
}
`,
      hints: [
        'Um método privado `GarantirAtiva()` evita repetir a verificação de conta encerrada em cada operação.',
        'A mensagem de `ArgumentException` ganha automaticamente um sufixo com o nome do parâmetro — não escreva o nome dentro da mensagem.',
      ],
      tests: [
        {
          name: 'Conta com saldo inicial',
          stdin: '200\n',
          expectedStdout:
            "saldo negativo: ArgumentOutOfRangeException - saldo inicial nao pode ser negativo (Parameter 'saldoInicial')\n" +
            'saldo: 200.00\n' +
            'deposito valido: ok\n' +
            "deposito zero: ArgumentException - valor precisa ser positivo (Parameter 'valor')\n" +
            'saque grande: InvalidOperationException - saldo insuficiente\n' +
            "saque negativo: ArgumentException - valor precisa ser positivo (Parameter 'valor')\n" +
            'saque valido: ok\n' +
            'saldo: 250.00\n' +
            'deposito apos encerrar: InvalidOperationException - conta encerrada',
        },
        {
          name: 'Conta zerada',
          stdin: '0\n',
          expectedStdout:
            "saldo negativo: ArgumentOutOfRangeException - saldo inicial nao pode ser negativo (Parameter 'saldoInicial')\n" +
            'saldo: 0.00\n' +
            'deposito valido: ok\n' +
            "deposito zero: ArgumentException - valor precisa ser positivo (Parameter 'valor')\n" +
            'saque grande: InvalidOperationException - saldo insuficiente\n' +
            "saque negativo: ArgumentException - valor precisa ser positivo (Parameter 'valor')\n" +
            'saque valido: ok\n' +
            'saldo: 50.00\n' +
            'deposito apos encerrar: InvalidOperationException - conta encerrada',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c01l08',
    title: 'Relançando sem perder o rastro',
    objective: 'Deixar uma exceção continuar subindo preservando a informação de onde ela nasceu.',
    concept: [
      {
        kind: 'text',
        body:
          'Às vezes você precisa capturar para registrar, mas não tem como resolver. A exceção deve continuar subindo — e a forma de relançar decide se o rastro sobrevive.',
      },
      {
        kind: 'compare',
        good: `catch (Exception e)
{
    Registrar(e);
    throw;          // preserva o rastro
}`,
        bad: `catch (Exception e)
{
    Registrar(e);
    throw e;        // rastro reiniciado aqui
}`,
        goodLabel: 'throw: mantém a origem',
        badLabel: 'throw e: apaga a origem',
      },
      {
        kind: 'text',
        body:
          'O `throw;` sozinho relança a exceção atual **sem tocar no rastro**. Já `throw e;` trata a exceção como se ela tivesse nascido ali, e todo o caminho anterior desaparece.',
      },
      {
        kind: 'output',
        code: `// com throw;
   at Program.Nivel3()      <- causa real
   at Program.Nivel2()
   at Program.Nivel1()
   at Program.Main()`,
        caption: 'O topo do rastro é sempre o ponto mais profundo — onde o erro realmente aconteceu.',
      },
      {
        kind: 'text',
        body:
          'A alternativa quando você quer **acrescentar contexto** é embrulhar: lançar uma exceção nova passando a original como `innerException`. Nada se perde, e quem captura pode ler as duas.',
      },
      {
        kind: 'code',
        code: `catch (FormatException e)
{
    throw new InvalidOperationException("falha ao carregar config", e);
}

// depois:
e.Message                 -> "falha ao carregar config"
e.InnerException.Message  -> "original"`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Perder o rastro é caro. Sem ele, o registro de erro aponta para o método que relançou, e a causa real fica invisível — você passa a depurar o mensageiro em vez do problema.',
      },
    ],
    quiz: [
      {
        id: 's06c01l08q1',
        type: 'single',
        prompt: 'Qual é a diferença entre `throw;` e `throw e;` dentro de um `catch`?',
        options: [
          { id: 'a', text: '`throw;` preserva o rastro original; `throw e;` o reinicia no ponto atual.', correct: true },
          { id: 'b', text: 'Não há diferença.' },
          { id: 'c', text: '`throw e;` é mais rápido.' },
          { id: 'd', text: '`throw;` só funciona fora de métodos.' },
        ],
        explanation:
          'É uma das armadilhas mais comuns do C#. As duas formas compilam, mas uma destrói a informação de diagnóstico.',
      },
      {
        id: 's06c01l08q2',
        type: 'single',
        prompt: 'O que aparece no topo de um stack trace?',
        options: [
          { id: 'a', text: 'O ponto mais profundo, onde o erro realmente aconteceu.', correct: true },
          { id: 'b', code: 'Main' },
          { id: 'c', text: 'O método que capturou a exceção.' },
          { id: 'd', text: 'O último método chamado antes do `catch`.' },
        ],
        explanation:
          'O rastro é lido de cima para baixo como "quem causou" seguido de "quem chamou". A primeira linha é a origem.',
      },
      {
        id: 's06c01l08q3',
        type: 'single',
        prompt: 'Como acrescentar contexto sem perder a exceção original?',
        options: [
          { id: 'a', text: 'Lançar uma nova passando a original como `innerException`.', correct: true },
          { id: 'b', code: 'throw e;' },
          { id: 'c', text: 'Concatenar as mensagens.' },
          { id: 'd', text: 'Não é possível.' },
        ],
        explanation:
          'A exceção externa explica o que falhou no seu nível; a interna guarda a causa técnica. Quem captura tem acesso às duas.',
      },
    ],
    challenge: {
      brief:
        'Compare as três estratégias de relançamento e mostre o efeito de cada uma sobre o rastro e sobre a informação preservada.',
      requirements: [
        '`Nivel3()` lança `FormatException` com a mensagem `falha na origem`',
        '`Nivel2()` chama `Nivel3()`; `Nivel1()` chama `Nivel2()`',
        '`RelancaPreservando()` captura, imprime `registrando` e usa `throw;`',
        '`RelancaPerdendo()` captura, imprime `registrando` e usa `throw e;`',
        '`Embrulha()` captura e lança `InvalidOperationException` com a mensagem `falha ao processar` e a original como interna',
        'O `Main` mostra, para cada uma, se o rastro ainda contém `Nivel3`',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva Nivel3, Nivel2, Nivel1, RelancaPreservando, RelancaPerdendo e Embrulha aqui

    static void Main()
    {
        try
        {
            RelancaPreservando();
        }
        catch (Exception e)
        {
            Console.WriteLine($"preservando: rastro tem Nivel3 = {(e.StackTrace ?? "").Contains("Nivel3")}");
        }

        try
        {
            RelancaPerdendo();
        }
        catch (Exception e)
        {
            Console.WriteLine($"perdendo: rastro tem Nivel3 = {(e.StackTrace ?? "").Contains("Nivel3")}");
        }

        try
        {
            Embrulha();
        }
        catch (Exception e)
        {
            Console.WriteLine($"embrulhada: {e.Message}");
            Console.WriteLine($"interna: {e.InnerException.GetType().Name} - {e.InnerException.Message}");
            Console.WriteLine($"interna tem Nivel3 = {(e.InnerException.StackTrace ?? "").Contains("Nivel3")}");
        }
    }
}
`,
      solution: `using System;

class Program
{
    static void Nivel3()
    {
        throw new FormatException("falha na origem");
    }

    static void Nivel2()
    {
        Nivel3();
    }

    static void Nivel1()
    {
        Nivel2();
    }

    static void RelancaPreservando()
    {
        try
        {
            Nivel1();
        }
        catch (Exception)
        {
            Console.WriteLine("registrando");
            throw;
        }
    }

    static void RelancaPerdendo()
    {
        try
        {
            Nivel1();
        }
        catch (Exception e)
        {
            Console.WriteLine("registrando");
            throw e;
        }
    }

    static void Embrulha()
    {
        try
        {
            Nivel1();
        }
        catch (Exception e)
        {
            throw new InvalidOperationException("falha ao processar", e);
        }
    }

    static void Main()
    {
        try
        {
            RelancaPreservando();
        }
        catch (Exception e)
        {
            Console.WriteLine($"preservando: rastro tem Nivel3 = {(e.StackTrace ?? "").Contains("Nivel3")}");
        }

        try
        {
            RelancaPerdendo();
        }
        catch (Exception e)
        {
            Console.WriteLine($"perdendo: rastro tem Nivel3 = {(e.StackTrace ?? "").Contains("Nivel3")}");
        }

        try
        {
            Embrulha();
        }
        catch (Exception e)
        {
            Console.WriteLine($"embrulhada: {e.Message}");
            Console.WriteLine($"interna: {e.InnerException.GetType().Name} - {e.InnerException.Message}");
            Console.WriteLine($"interna tem Nivel3 = {(e.InnerException.StackTrace ?? "").Contains("Nivel3")}");
        }
    }
}
`,
      hints: [
        'No `RelancaPreservando`, o `catch` não precisa da variável: `catch (Exception)` seguido de `throw;`.',
        'O embrulho preserva o rastro **da exceção interna** — é por isso que a última verificação dá `True`.',
      ],
      tests: [
        {
          name: 'As tres estrategias',
          stdin: '',
          expectedStdout:
            'registrando\npreservando: rastro tem Nivel3 = True\n' +
            'registrando\nperdendo: rastro tem Nivel3 = False\n' +
            'embrulhada: falha ao processar\n' +
            'interna: FormatException - falha na origem\n' +
            'interna tem Nivel3 = True',
        },
      ],
    },
  },
  {
    id: 's06c01l09',
    title: 'Prática: filtros com when',
    objective: 'Capturar seletivamente com base em uma condição, sem capturar para depois relançar.',
    concept: [
      {
        kind: 'text',
        body:
          'A cláusula `when` acrescenta uma condição ao `catch`. Se a condição for falsa, aquele bloco **não captura** e a exceção continua procurando outro tratador.',
      },
      {
        kind: 'code',
        code: `try
{
    throw new ArgumentException("param invalido", "idade");
}
catch (ArgumentException e) when (e.ParamName == "nome")
{
    Console.WriteLine("filtro nome");        // nao roda
}
catch (ArgumentException e) when (e.ParamName == "idade")
{
    Console.WriteLine($"filtro idade: {e.ParamName}");
}`,
        caption: 'O mesmo tipo, tratado de formas diferentes conforme o conteúdo.',
      },
      {
        kind: 'compare',
        good: `catch (HttpException e)
    when (e.Codigo == 404)
{
    UsarCache();
}
// so captura o que trata`,
        bad: `catch (HttpException e)
{
    if (e.Codigo != 404) throw;
    UsarCache();
}
// captura tudo e devolve`,
        goodLabel: 'Filtro: decide antes de capturar',
        badLabel: 'Capturar e relançar',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A diferença não é só estética. O filtro é avaliado **antes** de a pilha ser desenrolada, então o estado no momento do erro continua intacto para o depurador. Capturar e relançar já desenrolou.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A condição do `when` não deve ter efeitos colaterais nem lançar exceções. Ela roda em um momento delicado, e uma exceção dentro dela é silenciosamente tratada como `false`.',
      },
      {
        kind: 'text',
        body:
          'Um uso frequente é registrar sem capturar: `catch (Exception e) when (Registrar(e))`, com um `Registrar` que sempre devolve `false`. O efeito é anotar a passagem da exceção deixando-a seguir intacta.',
      },
    ],
    quiz: [
      {
        id: 's06c01l09q1',
        type: 'single',
        prompt: 'O que acontece quando a condição de um `when` é falsa?',
        options: [
          { id: 'a', text: 'O bloco não captura, e a exceção continua procurando outro tratador.', correct: true },
          { id: 'b', text: 'O bloco captura assim mesmo.' },
          { id: 'c', text: 'A exceção é descartada.' },
          { id: 'd', text: 'O programa encerra.' },
        ],
        explanation:
          'É a diferença central para um `if` dentro do `catch`: aqui a captura nem chega a acontecer.',
      },
      {
        id: 's06c01l09q2',
        type: 'single',
        prompt: 'Qual a vantagem técnica do filtro sobre capturar e relançar?',
        options: [
          { id: 'a', text: 'O filtro roda antes de a pilha ser desenrolada, preservando o estado do erro.', correct: true },
          { id: 'b', text: 'O filtro é mais rápido de escrever.' },
          { id: 'c', text: 'O filtro captura mais tipos.' },
          { id: 'd', text: 'Não há vantagem técnica.' },
        ],
        explanation:
          'Depois de capturar e relançar, o contexto original já foi perdido. O filtro decide antes disso acontecer.',
      },
      {
        id: 's06c01l09q3',
        type: 'single',
        prompt: 'O que acontece se a condição de um `when` lançar uma exceção?',
        options: [
          { id: 'a', text: 'Ela é tratada silenciosamente como `false`.', correct: true },
          { id: 'b', text: 'Ela substitui a exceção original.' },
          { id: 'c', text: 'O programa encerra.' },
          { id: 'd', text: 'Erro de compilação.' },
        ],
        explanation:
          'Por isso a condição deve ser simples e segura. Um erro dentro dela vira um filtro que não casa, e o diagnóstico fica confuso.',
      },
    ],
    challenge: {
      brief:
        'Trate um mesmo tipo de exceção de formas diferentes conforme o conteúdo dela, usando filtros em vez de condicionais dentro do bloco.',
      requirements: [
        '`FalhaHttp` é uma exceção customizada com a propriedade `Codigo` (`int`), construída com código e mensagem',
        '`Buscar(int codigo)` lança `FalhaHttp` quando o código não é `200`, e devolve `conteudo` quando é',
        '`Tratar(int codigo)` usa filtros `when` para distinguir os casos e devolve a descrição',
        'Código `404` devolve `usando cache`; código `401` devolve `renovando credencial`',
        'Códigos de `500` para cima devolvem `tentando de novo`',
        'Qualquer outro código de erro devolve `desistindo: N`',
        'Código `200` devolve `ok: conteudo`',
        'Nenhum bloco `catch` pode usar `if` para escolher o tratamento',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare FalhaHttp aqui

class Program
{
    // Escreva Buscar e Tratar aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            int codigo = int.Parse(Console.ReadLine());
            Console.WriteLine($"{codigo} -> {Tratar(codigo)}");
        }
    }
}
`,
      solution: `using System;

class FalhaHttp : Exception
{
    public int Codigo { get; }

    public FalhaHttp(int codigo, string mensagem)
        : base(mensagem)
    {
        Codigo = codigo;
    }
}

class Program
{
    static string Buscar(int codigo)
    {
        if (codigo != 200)
        {
            throw new FalhaHttp(codigo, $"requisicao falhou com {codigo}");
        }

        return "conteudo";
    }

    static string Tratar(int codigo)
    {
        try
        {
            return $"ok: {Buscar(codigo)}";
        }
        catch (FalhaHttp e) when (e.Codigo == 404)
        {
            return "usando cache";
        }
        catch (FalhaHttp e) when (e.Codigo == 401)
        {
            return "renovando credencial";
        }
        catch (FalhaHttp e) when (e.Codigo >= 500)
        {
            return "tentando de novo";
        }
        catch (FalhaHttp e)
        {
            return $"desistindo: {e.Codigo}";
        }
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            int codigo = int.Parse(Console.ReadLine());
            Console.WriteLine($"{codigo} -> {Tratar(codigo)}");
        }
    }
}
`,
      hints: [
        'Os filtros são avaliados na ordem em que aparecem — coloque os códigos específicos antes da faixa `>= 500`.',
        'O último `catch (FalhaHttp e)` sem `when` é a rede de segurança para os códigos que não casaram com nenhum filtro.',
      ],
      tests: [
        {
          name: 'Varios codigos',
          stdin: '6\n200\n404\n401\n500\n503\n418\n',
          expectedStdout:
            '200 -> ok: conteudo\n404 -> usando cache\n401 -> renovando credencial\n' +
            '500 -> tentando de novo\n503 -> tentando de novo\n418 -> desistindo: 418',
        },
        {
          name: 'So erros de cliente',
          stdin: '3\n400\n403\n404\n',
          expectedStdout:
            '400 -> desistindo: 400\n403 -> desistindo: 403\n404 -> usando cache',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c01l10',
    title: 'Checkpoint: exceções',
    objective: 'Combinar captura seletiva, limpeza garantida, lançamento próprio e preservação de rastro.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint reúne o capítulo inteiro em um único fluxo: um processador que valida, lança, captura seletivamente, embrulha com contexto e sempre libera o recurso.',
      },
      {
        kind: 'table',
        headers: ['Ferramenta', 'Para quê'],
        rows: [
          ['`try`/`catch`', 'tratar o que você sabe tratar'],
          ['vários `catch`', 'reagir diferente por tipo'],
          ['`when`', 'reagir diferente por conteúdo'],
          ['`finally` / `using`', 'garantir a limpeza'],
          ['`throw`', 'sinalizar erro próprio'],
          ['`throw;`', 'relançar sem perder o rastro'],
          ['`innerException`', 'acrescentar contexto sem perder a causa'],
        ],
      },
      {
        kind: 'text',
        body:
          'A pergunta que organiza tudo: **este nível do código sabe o que fazer com esse erro?** Se sim, trate. Se não, deixe subir — mas garanta a limpeza antes.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um erro só deve ser tratado uma vez. Tratar em dois níveis diferentes costuma significar que um dos dois está apenas escondendo o problema do outro.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Cuidado com exceções como fluxo de controle. Se um "erro" acontece na maioria das execuções, ele não é excepcional — é um caso normal, e merece um `if` ou um `TryParse`, não um `throw`.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Escreva o caminho feliz primeiro e só depois acrescente o tratamento. Começar pelos erros costuma produzir um método em que a lógica principal fica escondida no meio de blocos de exceção.',
      },
    ],
    quiz: [
      {
        id: 's06c01l10q1',
        type: 'single',
        prompt: 'Qual pergunta decide se um erro deve ser tratado no nível atual?',
        options: [
          { id: 'a', text: 'Este nível sabe o que fazer com esse erro?', correct: true },
          { id: 'b', text: 'Este erro é grave?' },
          { id: 'c', text: 'Este método é público?' },
          { id: 'd', text: 'Existe um `finally` por perto?' },
        ],
        explanation:
          'Capturar sem saber tratar apenas esconde o problema de quem saberia. Deixar subir é a decisão correta nesse caso.',
      },
      {
        id: 's06c01l10q2',
        type: 'single',
        prompt: 'O que indica que uma exceção está sendo usada como fluxo de controle?',
        options: [
          { id: 'a', text: 'O "erro" acontece na maioria das execuções.', correct: true },
          { id: 'b', text: 'Ela é capturada em mais de um lugar.' },
          { id: 'c', text: 'Ela tem uma mensagem longa.' },
          { id: 'd', text: 'Ela é de um tipo customizado.' },
        ],
        explanation:
          'Se o caso é comum, ele é parte do fluxo normal. Uma verificação prévia é mais clara e mais barata que lançar e capturar.',
      },
      {
        id: 's06c01l10q3',
        type: 'single',
        prompt: 'Por que um erro deve ser tratado apenas uma vez?',
        options: [
          { id: 'a', text: 'Porque tratar em dois níveis costuma significar que um está escondendo o problema do outro.', correct: true },
          { id: 'b', text: 'Porque o segundo `catch` não compila.' },
          { id: 'c', text: 'Porque a exceção some depois do primeiro.' },
          { id: 'd', text: 'Por questão de desempenho.' },
        ],
        explanation:
          'O tratamento duplicado torna difícil saber qual nível é responsável, e mensagens de erro acabam duplicadas ou contraditórias.',
      },
    ],
    challenge: {
      brief:
        'Construa um importador de registros que valida cada linha, trata cada categoria de erro de forma própria, garante a liberação do recurso e preserva a causa original.',
      requirements: [
        '`RegistroInvalidoException` é customizada, tem a propriedade `Linha` (`int`) e é construída com linha, mensagem e exceção interna',
        '`Arquivo` implementa `IDisposable`, recebe o nome, imprime `abrindo nome` e `fechando nome` no descarte',
        '`Analisar(string linha)` espera o formato `nome:idade`; devolve `nome tem idade anos`',
        'Formato sem `:` lança `FormatException` com a mensagem `separador ausente`',
        'Idade não numérica deixa a `FormatException` do `int.Parse` subir',
        'Idade negativa lança `ArgumentOutOfRangeException` com a mensagem `idade negativa`',
        '`Importar(List<string> linhas)` processa tudo dentro de um `using` de `Arquivo`',
        'Cada falha é capturada, embrulhada em `RegistroInvalidoException` com o número da linha começando em 1, e registrada com `linha N: mensagem (causa: NomeDoTipo)`',
        'O total de sucessos e falhas é impresso ao final',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare RegistroInvalidoException e Arquivo aqui

class Program
{
    // Escreva Analisar e Importar aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<string> linhas = new List<string>();

        for (int i = 0; i < n; i++)
        {
            linhas.Add(Console.ReadLine());
        }

        Importar(linhas);
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class RegistroInvalidoException : Exception
{
    public int Linha { get; }

    public RegistroInvalidoException(int linha, string mensagem, Exception interna)
        : base(mensagem, interna)
    {
        Linha = linha;
    }
}

class Arquivo : IDisposable
{
    private string nome;

    public Arquivo(string nome)
    {
        this.nome = nome;
        Console.WriteLine($"abrindo {nome}");
    }

    public void Dispose()
    {
        Console.WriteLine($"fechando {nome}");
    }
}

class Program
{
    static string Analisar(string linha)
    {
        int separador = linha.IndexOf(':');

        if (separador < 0)
        {
            throw new FormatException("separador ausente");
        }

        string nome = linha.Substring(0, separador);
        int idade = int.Parse(linha.Substring(separador + 1));

        if (idade < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(idade), "idade negativa");
        }

        return $"{nome} tem {idade} anos";
    }

    static void Importar(List<string> linhas)
    {
        int ok = 0;
        int falhas = 0;

        using (Arquivo arquivo = new Arquivo("registros.txt"))
        {
            for (int i = 0; i < linhas.Count; i++)
            {
                try
                {
                    try
                    {
                        Console.WriteLine(Analisar(linhas[i]));
                        ok++;
                    }
                    catch (Exception e)
                    {
                        throw new RegistroInvalidoException(i + 1, "registro invalido", e);
                    }
                }
                catch (RegistroInvalidoException e)
                {
                    Console.WriteLine($"linha {e.Linha}: {e.Message} (causa: {e.InnerException.GetType().Name})");
                    falhas++;
                }
            }
        }

        Console.WriteLine($"sucessos: {ok}");
        Console.WriteLine($"falhas: {falhas}");
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<string> linhas = new List<string>();

        for (int i = 0; i < n; i++)
        {
            linhas.Add(Console.ReadLine());
        }

        Importar(linhas);
    }
}
`,
      hints: [
        'O embrulho e a captura ficam em dois `try` aninhados: o interno converte qualquer falha em `RegistroInvalidoException`, o externo a registra.',
        'O `IndexOf(\':\')` devolve `-1` quando o caractere não existe — é assim que se detecta o separador ausente.',
        'O `using` envolve o laço inteiro, então o `fechando` aparece depois da última linha processada.',
      ],
      tests: [
        {
          name: 'Mistura de validos e invalidos',
          stdin: '4\nAna:30\nBrunoSemSeparador\nCarla:abc\nDiego:-5\n',
          expectedStdout:
            'abrindo registros.txt\n' +
            'Ana tem 30 anos\n' +
            'linha 2: registro invalido (causa: FormatException)\n' +
            'linha 3: registro invalido (causa: FormatException)\n' +
            'linha 4: registro invalido (causa: ArgumentOutOfRangeException)\n' +
            'fechando registros.txt\nsucessos: 1\nfalhas: 3',
        },
        {
          name: 'Todos validos',
          stdin: '2\nElena:25\nFabio:40\n',
          expectedStdout:
            'abrindo registros.txt\nElena tem 25 anos\nFabio tem 40 anos\n' +
            'fechando registros.txt\nsucessos: 2\nfalhas: 0',
          hidden: true,
        },
      ],
    },
  },
]
