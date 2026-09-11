import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's04c04l01',
    title: 'O que é um delegate',
    objective: 'Guardar um método em uma variável, tratando comportamento como um dado que pode ser passado adiante.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma variável pode guardar um número, um texto, uma lista. Um **delegate** permite que ela guarde um **método** — e isso muda o que é possível expressar em um programa.',
      },
      {
        kind: 'code',
        code: `delegate int Operacao(int a, int b);   // o tipo: assinatura de um metodo

static int Somar(int a, int b) => a + b;
static int Multiplicar(int a, int b) => a * b;

Operacao op = Somar;          // guarda o metodo, sem parenteses
Console.WriteLine(op(3, 4));  // 7  -> chama pelo delegate

op = Multiplicar;             // troca o comportamento
Console.WriteLine(op(3, 4));  // 12`,
        caption: 'Sem parênteses na atribuição: `Somar` é o método, `Somar(3,4)` seria o resultado dele.',
      },
      {
        kind: 'text',
        body:
          'Um delegate é um **tipo** que descreve uma assinatura. Qualquer método com aquela forma — mesmos tipos de parâmetro e mesmo retorno — pode ser atribuído a ele, independentemente do nome.',
      },
      {
        kind: 'table',
        headers: ['Declaração', 'Aceita métodos que...'],
        rows: [
          ['`delegate int Op(int a, int b)`', 'recebem dois `int` e devolvem `int`'],
          ['`delegate void Acao(string s)`', 'recebem `string` e não devolvem nada'],
          ['`delegate bool Teste(int n)`', 'recebem `int` e devolvem `bool`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Esquecer de tirar os parênteses é o erro mais comum. `Operacao op = Somar(3, 4);` tenta atribuir o **número 7** a uma variável de delegate, e não compila.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Isso destrava um padrão novo: um método pode receber outro método como parâmetro e decidir **quando** e **quantas vezes** chamá-lo. É a base de tudo que vem neste capítulo e do LINQ inteiro.',
      },
      {
        kind: 'text',
        body:
          'Declarar delegates próprios é raro hoje. O .NET já traz tipos genéricos prontos — `Action`, `Func` e `Predicate` — que cobrem quase todos os casos, e são o assunto das próximas três lições.',
      },
    ],
    quiz: [
      {
        id: 's04c04l01q1',
        type: 'single',
        prompt: 'O que um delegate guarda?',
        options: [
          { id: 'a', text: 'Uma referência a um método.', correct: true },
          { id: 'b', text: 'O resultado de um método.' },
          { id: 'c', text: 'O código-fonte de um método.' },
          { id: 'd', text: 'O nome de um método, como texto.' },
        ],
        explanation:
          'Ele aponta para o método em si, o que permite chamá-lo depois. Guardar o resultado seria simplesmente uma variável comum.',
      },
      {
        id: 's04c04l01q2',
        type: 'single',
        prompt: 'Por que `Operacao op = Somar;` não leva parênteses?',
        options: [
          { id: 'a', text: 'Porque os parênteses executariam o método em vez de referenciá-lo.', correct: true },
          { id: 'b', text: 'Porque `Somar` não tem parâmetros.' },
          { id: 'c', text: 'Porque delegates não aceitam parênteses.' },
          { id: 'd', text: 'É opcional: as duas formas funcionam.' },
        ],
        explanation:
          '`Somar` é o método; `Somar(3, 4)` é o `int` que ele devolve. Só o primeiro pode ser atribuído a uma variável de delegate.',
      },
      {
        id: 's04c04l01q3',
        type: 'single',
        prompt: 'O que determina se um método pode ser atribuído a um delegate?',
        options: [
          { id: 'a', text: 'Os tipos dos parâmetros e o tipo de retorno.', correct: true },
          { id: 'b', text: 'O nome do método.' },
          { id: 'c', text: 'Os nomes dos parâmetros.' },
          { id: 'd', text: 'A classe em que ele está.' },
        ],
        explanation:
          'A compatibilidade é estrutural: qualquer método com a forma certa serve, tenha o nome que tiver.',
      },
    ],
    challenge: {
      brief:
        'Declare um delegate `Operacao` para métodos que recebem dois `int` e devolvem `int`. Escreva quatro operações e aplique a que o usuário pedir, guardando o método em uma variável.',
      requirements: [
        'Declare `delegate int Operacao(int a, int b);` fora da classe',
        'Escreva `Somar`, `Subtrair`, `Multiplicar` e `Dividir`, todos com a assinatura compatível',
        'Cada comando da entrada tem três linhas: o símbolo da operação, e os dois operandos',
        'Uma linha por comando, no formato `3 + 4 = 7`',
        'Símbolos desconhecidos imprimem `operacao invalida` e não contam',
        'Divisão por zero imprime `divisao por zero` e não conta',
        'A última linha é `Executadas: k`',
        'A operação escolhida precisa ser guardada em uma variável do tipo `Operacao` antes de ser chamada',
      ],
      starterCode: `using System;

delegate int Operacao(int a, int b);

class Program
{
    static int Somar(int a, int b) => a + b;
    static int Subtrair(int a, int b) => a - b;
    static int Multiplicar(int a, int b) => a * b;
    static int Dividir(int a, int b) => a / b;

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int executadas = 0;

        for (int i = 0; i < q; i++)
        {
            string simbolo = Console.ReadLine();
            int a = int.Parse(Console.ReadLine());
            int b = int.Parse(Console.ReadLine());

            // Escolha o metodo, guarde em uma variavel Operacao, e chame
        }

        Console.WriteLine($"Executadas: {executadas}");
    }
}
`,
      solution: `using System;

delegate int Operacao(int a, int b);

class Program
{
    static int Somar(int a, int b) => a + b;
    static int Subtrair(int a, int b) => a - b;
    static int Multiplicar(int a, int b) => a * b;
    static int Dividir(int a, int b) => a / b;

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int executadas = 0;

        for (int i = 0; i < q; i++)
        {
            string simbolo = Console.ReadLine();
            int a = int.Parse(Console.ReadLine());
            int b = int.Parse(Console.ReadLine());

            Operacao op = null;

            if (simbolo == "+") op = Somar;
            else if (simbolo == "-") op = Subtrair;
            else if (simbolo == "*") op = Multiplicar;
            else if (simbolo == "/") op = Dividir;

            if (op == null)
            {
                Console.WriteLine("operacao invalida");
            }
            else if (simbolo == "/" && b == 0)
            {
                Console.WriteLine("divisao por zero");
            }
            else
            {
                Console.WriteLine($"{a} {simbolo} {b} = {op(a, b)}");
                executadas++;
            }
        }

        Console.WriteLine($"Executadas: {executadas}");
    }
}
`,
      hints: [
        'A variável `Operacao op` começa em `null` e recebe o método correspondente ao símbolo, sem parênteses.',
        'A checagem de divisão por zero acontece **antes** de chamar `op`, senão o programa quebra.',
      ],
      tests: [
        {
          name: 'Quatro operações válidas',
          stdin: '4\n+\n3\n4\n-\n10\n3\n*\n5\n6\n/\n20\n4\n',
          expectedStdout:
            '3 + 4 = 7\n10 - 3 = 7\n5 * 6 = 30\n20 / 4 = 5\nExecutadas: 4',
        },
        {
          name: 'Símbolo desconhecido e divisão por zero',
          stdin: '3\n%\n5\n2\n/\n5\n0\n+\n1\n1\n',
          expectedStdout:
            'operacao invalida\ndivisao por zero\n1 + 1 = 2\nExecutadas: 1',
        },
        {
          name: 'Uma operação só',
          stdin: '1\n*\n-3\n4\n',
          expectedStdout: '-3 * 4 = -12\nExecutadas: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c04l02',
    title: 'Action',
    objective: 'Usar `Action` para guardar métodos que produzem efeito e não devolvem valor.',
    concept: [
      {
        kind: 'text',
        body:
          'Declarar um `delegate` próprio para cada assinatura seria repetitivo. O .NET traz tipos genéricos prontos, e o primeiro deles é o **`Action`**: métodos que fazem algo e não devolvem nada.',
      },
      {
        kind: 'table',
        headers: ['Tipo', 'Equivale a'],
        rows: [
          ['`Action`', '`void Metodo()`'],
          ['`Action<string>`', '`void Metodo(string s)`'],
          ['`Action<int, int>`', '`void Metodo(int a, int b)`'],
          ['`Action<T1, T2, T3>`', 'e assim por diante, até 16'],
        ],
      },
      {
        kind: 'code',
        code: `static void Maiusculo(string s) => Console.WriteLine(s.ToUpper());
static void ComPrefixo(string s) => Console.WriteLine("> " + s);

Action<string> escrever = Maiusculo;
escrever("teste");         // TESTE

escrever = ComPrefixo;
escrever("teste");         // > teste`,
        caption: 'Os tipos entre `<>` são os parâmetros. `Action` nunca tem retorno.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O ganho não é sintático: é de **vocabulário compartilhado**. Um `Action<string>` significa a mesma coisa em qualquer código C# do mundo, enquanto um `delegate MinhaAcao` só faz sentido no projeto que o declarou.',
      },
      {
        kind: 'text',
        body:
          'Um mesmo `Action` pode receber vários métodos ao longo do programa, o que permite escolher o comportamento em tempo de execução — sem `if` espalhado por todo lado.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Uma variável de delegate não inicializada vale `null`, e chamá-la lança `NullReferenceException`. Ou inicialize sempre, ou verifique antes de chamar.',
      },
      {
        kind: 'text',
        body:
          'Delegates também podem acumular vários métodos com o operador `+=`, e uma única chamada executa todos em sequência. Esse recurso é a base de eventos, um assunto da Seção 5.',
      },
    ],
    quiz: [
      {
        id: 's04c04l02q1',
        type: 'single',
        prompt: 'O que `Action<int, string>` representa?',
        options: [
          { id: 'a', text: 'Um método que recebe um `int` e uma `string`, e não devolve nada.', correct: true },
          { id: 'b', text: 'Um método que recebe um `int` e devolve uma `string`.' },
          { id: 'c', text: 'Um método que devolve um `int` e uma `string`.' },
          { id: 'd', text: 'Dois métodos encadeados.' },
        ],
        explanation:
          'Em `Action`, todos os tipos entre `<>` são parâmetros. Não existe posição para retorno, porque `Action` é sempre `void`.',
      },
      {
        id: 's04c04l02q2',
        type: 'single',
        prompt: 'Qual é a vantagem de `Action` sobre um `delegate` declarado à mão?',
        options: [
          { id: 'a', text: 'É um tipo padrão, reconhecido em qualquer código C#.', correct: true },
          { id: 'b', text: 'É mais rápido.' },
          { id: 'c', text: 'Aceita mais parâmetros.' },
          { id: 'd', text: 'Permite retorno de valor.' },
        ],
        explanation:
          'Os dois funcionam igual. O que muda é que `Action<string>` dispensa declaração e é imediatamente compreensível para quem lê.',
      },
      {
        id: 's04c04l02q3',
        type: 'single',
        prompt: 'O que acontece ao chamar uma variável de delegate que vale `null`?',
        options: [
          { id: 'a', text: 'Lança `NullReferenceException`.', correct: true },
          { id: 'b', text: 'Nada acontece, silenciosamente.' },
          { id: 'c', text: 'Erro de compilação.' },
          { id: 'd', text: 'Devolve o valor padrão do tipo.' },
        ],
        explanation:
          'É uma referência como qualquer outra. Chamar um método em uma referência nula é o mesmo erro de sempre.',
      },
    ],
    challenge: {
      brief:
        'Escreva três métodos de formatação compatíveis com `Action<string>` e aplique o que o usuário escolher a cada linha de texto.',
      requirements: [
        '`Maiusculo` imprime o texto em maiúsculas',
        '`Minusculo` imprime o texto em minúsculas',
        '`ComPrefixo` imprime `> ` seguido do texto',
        'Cada comando tem duas linhas: o modo (`M`, `m` ou `p`) e o texto',
        'Modos desconhecidos imprimem `modo invalido` e não contam',
        'A última linha é `Aplicadas: k`',
        'O método escolhido precisa ser guardado em uma variável `Action<string>` antes de ser chamado',
        'Não mude as assinaturas dos três métodos',
      ],
      starterCode: `using System;

class Program
{
    static void Maiusculo(string s)
    {
        // Imprima em maiusculas
    }

    static void Minusculo(string s)
    {
        // Imprima em minusculas
    }

    static void ComPrefixo(string s)
    {
        // Imprima com "> " na frente
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int aplicadas = 0;

        for (int i = 0; i < q; i++)
        {
            string modo = Console.ReadLine();
            string texto = Console.ReadLine();

            // Escolha o metodo, guarde em um Action<string>, e chame
        }

        Console.WriteLine($"Aplicadas: {aplicadas}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Maiusculo(string s)
    {
        Console.WriteLine(s.ToUpper());
    }

    static void Minusculo(string s)
    {
        Console.WriteLine(s.ToLower());
    }

    static void ComPrefixo(string s)
    {
        Console.WriteLine("> " + s);
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int aplicadas = 0;

        for (int i = 0; i < q; i++)
        {
            string modo = Console.ReadLine();
            string texto = Console.ReadLine();

            Action<string> acao = null;

            if (modo == "M") acao = Maiusculo;
            else if (modo == "m") acao = Minusculo;
            else if (modo == "p") acao = ComPrefixo;

            if (acao == null)
            {
                Console.WriteLine("modo invalido");
            }
            else
            {
                acao(texto);
                aplicadas++;
            }
        }

        Console.WriteLine($"Aplicadas: {aplicadas}");
    }
}
`,
      hints: [
        'A variável é `Action<string> acao` e recebe o método sem parênteses.',
        'Chamar é como chamar um método normal: `acao(texto);`.',
      ],
      tests: [
        {
          name: 'Os três modos',
          stdin: '3\nM\nteste\nm\nTESTE\np\nteste\n',
          expectedStdout: 'TESTE\nteste\n> teste\nAplicadas: 3',
        },
        {
          name: 'Modo inválido',
          stdin: '2\nx\nalgo\nM\nok\n',
          expectedStdout: 'modo invalido\nOK\nAplicadas: 1',
        },
        {
          name: 'Texto com espaços',
          stdin: '1\np\numa frase\n',
          expectedStdout: '> uma frase\nAplicadas: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c04l03',
    title: 'Func',
    objective: 'Usar `Func` para guardar métodos que devolvem valor, entendendo que o último tipo é sempre o retorno.',
    concept: [
      {
        kind: 'text',
        body:
          'Se `Action` é para métodos que não devolvem nada, **`Func`** é para os que devolvem. A regra da leitura: o **último** tipo entre `<>` é o retorno; todos os anteriores são parâmetros.',
      },
      {
        kind: 'table',
        headers: ['Tipo', 'Equivale a'],
        rows: [
          ['`Func<int>`', '`int Metodo()`'],
          ['`Func<int, int>`', '`int Metodo(int a)`'],
          ['`Func<int, int, int>`', '`int Metodo(int a, int b)`'],
          ['`Func<string, bool>`', '`bool Metodo(string s)`'],
        ],
      },
      {
        kind: 'code',
        code: `static int Dobro(int n) => n * 2;
static int Quadrado(int n) => n * n;

Func<int, int> transformar = Dobro;
Console.WriteLine(transformar(5));   // 10

transformar = Quadrado;
Console.WriteLine(transformar(5));   // 25`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A posição do retorno confunde no começo. Em `Func<string, bool>`, o `bool` é o **retorno** e a `string` é o parâmetro — não o contrário. Leia sempre da direita: "devolve `bool`, recebendo `string`".',
      },
      {
        kind: 'text',
        body:
          'Um `Func` pode ser aplicado a uma coleção inteira, transformando cada elemento. Este é o padrão que o LINQ leva ao extremo, e você o verá com o nome de `Select` no capítulo 5.',
      },
      {
        kind: 'code',
        code: `static int[] Aplicar(int[] valores, Func<int, int> f)
{
    int[] resultado = new int[valores.Length];

    for (int i = 0; i < valores.Length; i++)
    {
        resultado[i] = f(valores[i]);   // o metodo veio de fora
    }

    return resultado;
}`,
        caption: 'O laço é sempre o mesmo; o que muda é a transformação recebida.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare no que aconteceu: `Aplicar` não sabe **o que** está sendo calculado, e mesmo assim faz um trabalho útil. Separar "percorrer" de "transformar" é o que permite escrever o percurso uma vez e reutilizá-lo com qualquer transformação.',
      },
    ],
    quiz: [
      {
        id: 's04c04l03q1',
        type: 'single',
        prompt: 'O que `Func<string, int>` representa?',
        options: [
          { id: 'a', text: 'Um método que recebe uma `string` e devolve um `int`.', correct: true },
          { id: 'b', text: 'Um método que recebe um `int` e devolve uma `string`.' },
          { id: 'c', text: 'Um método que recebe os dois e não devolve nada.' },
          { id: 'd', text: 'Um método que devolve os dois.' },
        ],
        explanation:
          'O último tipo é sempre o retorno. Aqui há um parâmetro `string` e retorno `int`.',
      },
      {
        id: 's04c04l03q2',
        type: 'single',
        prompt: 'Qual é a diferença entre `Func<int>` e `Action<int>`?',
        options: [
          { id: 'a', text: '`Func<int>` não recebe nada e devolve `int`; `Action<int>` recebe `int` e não devolve nada.', correct: true },
          { id: 'b', text: 'São equivalentes.' },
          { id: 'c', text: 'Os dois recebem `int`.' },
          { id: 'd', text: 'Os dois devolvem `int`.' },
        ],
        explanation:
          'É o contraste que fixa a regra: em `Func` o único tipo é o retorno; em `Action` o único tipo é o parâmetro.',
      },
      {
        id: 's04c04l03q3',
        type: 'single',
        prompt: 'Por que passar um `Func` para um método de percurso é útil?',
        options: [
          { id: 'a', text: 'Porque o percurso é escrito uma vez e serve para qualquer transformação.', correct: true },
          { id: 'b', text: 'Porque fica mais rápido.' },
          { id: 'c', text: 'Porque evita usar arrays.' },
          { id: 'd', text: 'Porque permite mais de um retorno.' },
        ],
        explanation:
          'A alternativa seria um método de percurso para cada transformação, todos com o mesmo laço copiado. É o mesmo argumento contra duplicação de sempre.',
      },
    ],
    challenge: {
      brief:
        'Escreva `Aplicar`, que recebe um array e um `Func<int, int>`, e devolve um array novo com a transformação aplicada. Escreva três transformações e aplique a escolhida.',
      requirements: [
        '`Aplicar` recebe um `int[]` e um `Func<int, int>`, e devolve um `int[]` novo',
        '`Dobro`, `Quadrado` e `Negativo` são as transformações disponíveis',
        'O modo `d` usa `Dobro`, `q` usa `Quadrado` e `n` usa `Negativo`',
        'Linha 1: `Original: 1 2 3 4`',
        'Linha 2: `Transformado: 2 4 6 8`',
        'Linha 3: `Soma do resultado: X`',
        'O array original não pode ser modificado',
        'Não mude as assinaturas de `Aplicar` nem das três transformações',
      ],
      starterCode: `using System;

class Program
{
    static int Dobro(int n) => n * 2;
    static int Quadrado(int n) => n * n;
    static int Negativo(int n) => -n;

    static int[] Aplicar(int[] valores, Func<int, int> f)
    {
        // Crie um array novo e aplique f a cada elemento
        return valores;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] valores = new int[n];
        for (int i = 0; i < n; i++)
        {
            valores[i] = int.Parse(Console.ReadLine());
        }

        string modo = Console.ReadLine();

        // Escolha o Func, aplique, e monte o relatorio
    }
}
`,
      solution: `using System;

class Program
{
    static int Dobro(int n) => n * 2;
    static int Quadrado(int n) => n * n;
    static int Negativo(int n) => -n;

    static int[] Aplicar(int[] valores, Func<int, int> f)
    {
        int[] resultado = new int[valores.Length];

        for (int i = 0; i < valores.Length; i++)
        {
            resultado[i] = f(valores[i]);
        }

        return resultado;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] valores = new int[n];
        for (int i = 0; i < n; i++)
        {
            valores[i] = int.Parse(Console.ReadLine());
        }

        string modo = Console.ReadLine();

        Func<int, int> f = Dobro;

        if (modo == "q") f = Quadrado;
        else if (modo == "n") f = Negativo;

        int[] transformado = Aplicar(valores, f);

        string original = "";
        string resultado = "";
        int soma = 0;

        for (int i = 0; i < n; i++)
        {
            original += $"{valores[i]} ";
            resultado += $"{transformado[i]} ";
            soma += transformado[i];
        }

        Console.WriteLine($"Original: {original}");
        Console.WriteLine($"Transformado: {resultado}");
        Console.WriteLine($"Soma do resultado: {soma}");
    }
}
`,
      hints: [
        '`Aplicar` precisa criar um array novo com `new int[valores.Length]` — escrever no original quebraria a primeira linha da saída.',
        'A variável `Func<int, int> f` recebe o método sem parênteses, como qualquer delegate.',
      ],
      tests: [
        {
          name: 'Dobro',
          stdin: '4\n1\n2\n3\n4\nd\n',
          expectedStdout: 'Original: 1 2 3 4\nTransformado: 2 4 6 8\nSoma do resultado: 20',
        },
        {
          name: 'Quadrado',
          stdin: '3\n2\n3\n4\nq\n',
          expectedStdout: 'Original: 2 3 4\nTransformado: 4 9 16\nSoma do resultado: 29',
        },
        {
          name: 'Negativo com valores negativos',
          stdin: '3\n-1\n2\n-3\nn\n',
          expectedStdout: 'Original: -1 2 -3\nTransformado: 1 -2 3\nSoma do resultado: 2',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c04l04',
    title: 'Predicate',
    objective: 'Usar `Predicate` para representar testes, e reconhecer que ele é um `Func` com retorno booleano.',
    concept: [
      {
        kind: 'text',
        body:
          'Um **predicado** é um teste: recebe um valor e responde sim ou não. O .NET tem um tipo dedicado, `Predicate<T>`, que é exatamente equivalente a `Func<T, bool>`.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Predicate',
          code: `Predicate<int> teste = EhPar;

if (teste(4)) { }`,
        },
        right: {
          label: 'Func equivalente',
          code: `Func<int, bool> teste = EhPar;

if (teste(4)) { }`,
        },
        note: 'Os dois aceitam o mesmo método. `Predicate` só comunica melhor a intenção.',
      },
      {
        kind: 'text',
        body:
          'Um predicado passado como parâmetro transforma um método de filtragem em algo genérico: o laço fica igual, e o critério vem de fora.',
      },
      {
        kind: 'code',
        code: `static int Contar(int[] valores, Predicate<int> criterio)
{
    int total = 0;

    foreach (int v in valores)
    {
        if (criterio(v)) total++;
    }

    return total;
}

Contar(dados, EhPar);        // quantos pares
Contar(dados, EhPositivo);   // quantos positivos`,
        caption: 'Um método de contagem que serve para qualquer critério.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Sem predicados, esse método precisaria ser duplicado para cada critério — `ContarPares`, `ContarPositivos`, `ContarMaioresQue`. Com ele, existe um só, e os critérios viram dados.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Na prática moderna, `Func<T, bool>` é mais comum que `Predicate<T>`, porque é o que o LINQ usa. Vale conhecer `Predicate` porque ele aparece em APIs mais antigas, como `List.FindAll` e `Array.Find`.',
      },
      {
        kind: 'text',
        body:
          'Os predicados que você escreveu no capítulo 1 — `EhPar`, `EhPrimo`, `EhPositivo` — já eram compatíveis com esse tipo desde então. A diferença é que agora eles podem ser **passados adiante**.',
      },
    ],
    quiz: [
      {
        id: 's04c04l04q1',
        type: 'single',
        prompt: 'A que `Predicate<string>` é equivalente?',
        options: [
          { id: 'a', code: 'Func<string, bool>', correct: true },
          { id: 'b', code: 'Func<bool, string>' },
          { id: 'c', code: 'Action<string>' },
          { id: 'd', code: 'Func<string>' },
        ],
        explanation:
          'Um predicado recebe o valor e devolve `bool`. Em `Func`, o retorno é o último tipo, então a ordem é `<string, bool>`.',
      },
      {
        id: 's04c04l04q2',
        type: 'single',
        prompt: 'Qual é a vantagem de receber o critério como parâmetro?',
        options: [
          { id: 'a', text: 'Um único método de contagem serve para qualquer critério.', correct: true },
          { id: 'b', text: 'A contagem fica mais rápida.' },
          { id: 'c', text: 'Evita percorrer a coleção.' },
          { id: 'd', text: 'Permite contar mais de uma coisa por vez.' },
        ],
        explanation:
          'A alternativa é um método por critério, todos com o mesmo laço. O predicado extrai justamente a parte que varia.',
      },
      {
        id: 's04c04l04q3',
        type: 'single',
        prompt: 'Por que `Func<T, bool>` é mais comum que `Predicate<T>` hoje?',
        options: [
          { id: 'a', text: 'Porque é o tipo que o LINQ usa em toda a sua API.', correct: true },
          { id: 'b', text: 'Porque `Predicate` foi removido do .NET.' },
          { id: 'c', text: 'Porque `Predicate` é mais lento.' },
          { id: 'd', text: 'Porque `Predicate` não aceita métodos estáticos.' },
        ],
        explanation:
          '`Predicate` continua existindo e funcionando. O LINQ padronizou em `Func`, e por consistência o resto do código moderno seguiu.',
      },
    ],
    challenge: {
      brief:
        'Escreva `Contar` e `Filtrar`, que recebem um critério como `Predicate<int>`. Escreva três critérios e aplique o escolhido a um array.',
      requirements: [
        '`Contar` recebe um `int[]` e um `Predicate<int>`, e devolve quantos elementos passam',
        '`Filtrar` recebe os mesmos e devolve os elementos que passam, separados por espaço',
        '`EhPar`, `EhPositivo` e `EhGrande` são os critérios; `EhGrande` testa se o valor passa de 10',
        'O modo `p` usa `EhPar`, `+` usa `EhPositivo` e `g` usa `EhGrande`',
        'Linha 1: `Aprovados: k`',
        'Linha 2: `Valores: 2 4 6`',
        'Linha 3: `Reprovados: r`, calculado a partir do total e dos aprovados',
        'Não mude as assinaturas dos métodos nem dos critérios',
      ],
      starterCode: `using System;

class Program
{
    static bool EhPar(int n) => n % 2 == 0;
    static bool EhPositivo(int n) => n > 0;
    static bool EhGrande(int n) => n > 10;

    static int Contar(int[] valores, Predicate<int> criterio)
    {
        return 0;
    }

    static string Filtrar(int[] valores, Predicate<int> criterio)
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

        string modo = Console.ReadLine();

        // Escolha o criterio e aplique nos dois metodos
    }
}
`,
      solution: `using System;

class Program
{
    static bool EhPar(int n) => n % 2 == 0;
    static bool EhPositivo(int n) => n > 0;
    static bool EhGrande(int n) => n > 10;

    static int Contar(int[] valores, Predicate<int> criterio)
    {
        int total = 0;

        foreach (int v in valores)
        {
            if (criterio(v))
            {
                total++;
            }
        }

        return total;
    }

    static string Filtrar(int[] valores, Predicate<int> criterio)
    {
        string resultado = "";

        foreach (int v in valores)
        {
            if (criterio(v))
            {
                resultado += $"{v} ";
            }
        }

        return resultado;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] valores = new int[n];
        for (int i = 0; i < n; i++)
        {
            valores[i] = int.Parse(Console.ReadLine());
        }

        string modo = Console.ReadLine();

        Predicate<int> criterio = EhPar;

        if (modo == "+") criterio = EhPositivo;
        else if (modo == "g") criterio = EhGrande;

        int aprovados = Contar(valores, criterio);

        Console.WriteLine($"Aprovados: {aprovados}");
        Console.WriteLine($"Valores: {Filtrar(valores, criterio)}");
        Console.WriteLine($"Reprovados: {n - aprovados}");
    }
}
`,
      hints: [
        'Os dois métodos têm o mesmo laço; só o que fazem com o elemento aprovado muda.',
        'Os reprovados não precisam de contagem própria: são o total menos os aprovados.',
      ],
      tests: [
        {
          name: 'Critério de paridade',
          stdin: '6\n1\n2\n3\n4\n5\n6\np\n',
          expectedStdout: 'Aprovados: 3\nValores: 2 4 6\nReprovados: 3',
        },
        {
          name: 'Critério de positivos',
          stdin: '4\n-1\n0\n5\n-3\n+\n',
          expectedStdout: 'Aprovados: 1\nValores: 5\nReprovados: 3',
        },
        {
          name: 'Nenhum aprovado',
          stdin: '3\n1\n2\n3\ng\n',
          expectedStdout: 'Aprovados: 0\nValores:\nReprovados: 3',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c04l05',
    title: 'Expressões lambda',
    objective: 'Escrever comportamento inline com lambdas, sem precisar declarar um método com nome.',
    concept: [
      {
        kind: 'text',
        body:
          'Declarar um método com nome só para passá-lo adiante é burocrático quando ele tem uma linha e é usado uma vez. A **expressão lambda** permite escrever a função no próprio lugar em que ela é usada.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Método nomeado',
          code: `static bool EhPar(int n)
{
    return n % 2 == 0;
}

Contar(dados, EhPar);`,
        },
        right: {
          label: 'Lambda',
          code: `Contar(dados, n => n % 2 == 0);`,
        },
        note: 'A lambda é a mesma função, sem nome e sem declaração separada.',
      },
      {
        kind: 'text',
        body:
          'A sintaxe é `parâmetros => corpo`. O tipo dos parâmetros é inferido do contexto, e quando o corpo é uma única expressão, o `return` fica implícito.',
      },
      {
        kind: 'table',
        headers: ['Lambda', 'Equivale a'],
        rows: [
          ['`n => n * 2`', '`int Metodo(int n) { return n * 2; }`'],
          ['`() => 42`', '`int Metodo() { return 42; }`'],
          ['`(a, b) => a + b`', '`int Metodo(int a, int b) { return a + b; }`'],
          ['`s => Console.WriteLine(s)`', '`void Metodo(string s) { ... }`'],
        ],
      },
      {
        kind: 'code',
        code: `// corpo com varias instrucoes usa chaves e return explicito
Func<int, string> classificar = n =>
{
    if (n < 0) return "negativo";
    if (n == 0) return "zero";
    return "positivo";
};`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A escolha entre lambda e método nomeado é sobre **reuso e nome**. Se a lógica é usada em um lugar só e cabe em uma linha, a lambda é mais direta. Se ela se repete, ou se o nome explica algo que o corpo não explica, o método nomeado ganha.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Uma lambda longa, com muitas linhas dentro de uma chamada, é difícil de ler e impossível de testar isoladamente. Quando ela passa de três ou quatro linhas, é sinal de que merece virar um método com nome.',
      },
    ],
    quiz: [
      {
        id: 's04c04l05q1',
        type: 'single',
        prompt: 'O que `n => n * 2` significa?',
        options: [
          { id: 'a', text: 'Uma função que recebe `n` e devolve `n * 2`.', correct: true },
          { id: 'b', text: 'Uma comparação entre `n` e `n * 2`.' },
          { id: 'c', text: 'Uma atribuição de `n * 2` a `n`.' },
          { id: 'd', text: 'Uma declaração de variável.' },
        ],
        explanation:
          'A seta separa os parâmetros do corpo. Com uma expressão única, o `return` é implícito.',
      },
      {
        id: 's04c04l05q2',
        type: 'single',
        prompt: 'Como escrever uma lambda sem parâmetros?',
        options: [
          { id: 'a', code: '() => 42', correct: true },
          { id: 'b', code: '=> 42' },
          { id: 'c', code: '_ => 42' },
          { id: 'd', code: 'void => 42' },
        ],
        explanation:
          'Os parênteses vazios marcam a ausência de parâmetros. O `_` seria um parâmetro descartado, o que é diferente de não ter nenhum.',
      },
      {
        id: 's04c04l05q3',
        type: 'single',
        prompt: 'Quando preferir um método nomeado a uma lambda?',
        options: [
          { id: 'a', text: 'Quando a lógica se repete ou o nome explica algo que o corpo não explica.', correct: true },
          { id: 'b', text: 'Sempre: lambdas são mais lentas.' },
          { id: 'c', text: 'Quando há mais de um parâmetro.' },
          { id: 'd', text: 'Quando o retorno é `bool`.' },
        ],
        explanation:
          'Reuso e legibilidade decidem. `EhElegivelParaDesconto` diz mais que a expressão booleana correspondente, mesmo que ela caiba em uma linha.',
      },
    ],
    challenge: {
      brief:
        'Reescreva a filtragem usando lambdas em vez de métodos nomeados. Escreva `Filtrar` recebendo um `Func<int, bool>` e aplique quatro critérios diferentes, todos como lambdas inline.',
      requirements: [
        '`Filtrar` recebe um `int[]` e um `Func<int, bool>`, e devolve os aprovados separados por espaço',
        'Linha 1: `Pares: ...`, filtrando com uma lambda de paridade',
        'Linha 2: `Maiores que 10: ...`',
        'Linha 3: `Negativos: ...`',
        'Linha 4: `Multiplos de 3: ...`',
        'Linha 5: `Total analisado: n`',
        'Os quatro critérios precisam ser lambdas escritas na própria chamada, sem métodos nomeados',
        'Um filtro sem aprovados imprime apenas o rótulo',
        'Não mude a assinatura de `Filtrar`',
      ],
      starterCode: `using System;

class Program
{
    static string Filtrar(int[] valores, Func<int, bool> criterio)
    {
        // Percorra e junte os aprovados
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

        // Quatro chamadas, quatro lambdas inline
    }
}
`,
      solution: `using System;

class Program
{
    static string Filtrar(int[] valores, Func<int, bool> criterio)
    {
        string resultado = "";

        foreach (int v in valores)
        {
            if (criterio(v))
            {
                resultado += $"{v} ";
            }
        }

        return resultado;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] valores = new int[n];
        for (int i = 0; i < n; i++)
        {
            valores[i] = int.Parse(Console.ReadLine());
        }

        Console.WriteLine($"Pares: {Filtrar(valores, v => v % 2 == 0)}");
        Console.WriteLine($"Maiores que 10: {Filtrar(valores, v => v > 10)}");
        Console.WriteLine($"Negativos: {Filtrar(valores, v => v < 0)}");
        Console.WriteLine($"Multiplos de 3: {Filtrar(valores, v => v % 3 == 0)}");
        Console.WriteLine($"Total analisado: {n}");
    }
}
`,
      hints: [
        'A lambda vai direto na chamada: `Filtrar(valores, v => v % 2 == 0)`.',
        'O teste de paridade precisa ser `% 2 == 0` para funcionar com negativos.',
      ],
      tests: [
        {
          name: 'Valores variados',
          stdin: '7\n1\n-2\n3\n12\n-5\n6\n15\n',
          expectedStdout:
            'Pares: -2 12 6\nMaiores que 10: 12 15\nNegativos: -2 -5\nMultiplos de 3: 3 12 6 15\n' +
            'Total analisado: 7',
        },
        {
          name: 'Nenhum negativo',
          stdin: '3\n2\n4\n6\n',
          expectedStdout:
            'Pares: 2 4 6\nMaiores que 10:\nNegativos:\nMultiplos de 3: 6\nTotal analisado: 3',
        },
        {
          name: 'Um valor só',
          stdin: '1\n9\n',
          expectedStdout:
            'Pares:\nMaiores que 10:\nNegativos:\nMultiplos de 3: 9\nTotal analisado: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c04l06',
    title: 'Capturando variáveis (closures)',
    objective: 'Entender que uma lambda captura variáveis por referência, e reconhecer a armadilha clássica do laço `for`.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma lambda pode usar variáveis declaradas fora dela. Quando isso acontece, ela **captura** a variável — e o detalhe decisivo é que a captura é por **referência**, não por valor.',
      },
      {
        kind: 'code',
        code: `int limite = 5;
Func<int, bool> acima = x => x > limite;

Console.WriteLine(acima(7));   // True

limite = 10;                   // muda a variavel capturada
Console.WriteLine(acima(7));   // False  <- a lambda enxergou a mudanca`,
        caption: 'A lambda não guardou o valor 5: ela guardou a variável `limite`.',
      },
      {
        kind: 'text',
        body:
          'Isso leva à armadilha mais famosa de closures. Um laço `for` tem **uma única** variável de controle, compartilhada por todas as voltas — e todas as lambdas criadas nele capturam a mesma:',
      },
      {
        kind: 'compare',
        good: `foreach (int k in new[] { 10, 20, 30 })
{
    acoes.Add(() => Console.Write(k));
}

// imprime: 10 20 30`,
        bad: `for (int i = 0; i < 3; i++)
{
    acoes.Add(() => Console.Write(i));
}

// imprime: 3 3 3`,
        goodLabel: '`foreach`: variável nova por volta',
        badLabel: '`for`: uma variável só',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'As três lambdas do `for` imprimem `3` porque todas apontam para o mesmo `i` — que, quando elas finalmente executam, já vale 3. Não é um bug: é a captura por referência funcionando exatamente como documentado.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A solução é criar uma variável **nova a cada volta**: `int copia = i;` dentro do laço, e capturar a cópia. O `foreach` faz isso automaticamente, o que explica a diferença de comportamento entre os dois.',
      },
      {
        kind: 'text',
        body:
          'Captura por referência também permite algo útil: uma lambda pode **modificar** a variável capturada, e a mudança é visível de fora. É assim que se constrói um contador compartilhado sem parâmetros nem retorno.',
      },
    ],
    quiz: [
      {
        id: 's04c04l06q1',
        type: 'single',
        prompt: 'O que este trecho imprime?',
        code: `var acoes = new List<Action>();

for (int i = 0; i < 3; i++)
{
    acoes.Add(() => Console.Write(i));
}

foreach (var a in acoes) a();`,
        options: [
          { id: 'a', code: '333', correct: true },
          { id: 'b', code: '012' },
          { id: 'c', code: '123' },
          { id: 'd', text: 'Erro de compilação.' },
        ],
        explanation:
          'As três lambdas capturam a **mesma** variável `i`. Quando elas executam, o laço já terminou e `i` vale 3.',
      },
      {
        id: 's04c04l06q2',
        type: 'single',
        prompt: 'Por que a versão com `foreach` imprime valores diferentes?',
        options: [
          { id: 'a', text: 'Porque o `foreach` cria uma variável nova a cada volta.', correct: true },
          { id: 'b', text: 'Porque o `foreach` captura por valor.' },
          { id: 'c', text: 'Porque o `foreach` executa as lambdas imediatamente.' },
          { id: 'd', text: 'Porque arrays se comportam diferente de contadores.' },
        ],
        explanation:
          'Cada volta do `foreach` tem sua própria variável de iteração, então cada lambda captura uma variável distinta. A captura continua sendo por referência — a diferença é quantas variáveis existem.',
      },
      {
        id: 's04c04l06q3',
        type: 'single',
        prompt: 'Como corrigir a versão com `for`?',
        options: [
          { id: 'a', text: 'Criando uma variável local dentro do laço e capturando ela.', correct: true },
          { id: 'b', text: 'Chamando as lambdas imediatamente.' },
          { id: 'c', text: 'Declarando `i` fora do laço.' },
          { id: 'd', text: 'Usando `Func` em vez de `Action`.' },
        ],
        explanation:
          '`int copia = i;` dentro do corpo cria uma variável nova a cada volta, e cada lambda captura a sua. É exatamente o que o `foreach` faz sozinho.',
      },
    ],
    challenge: {
      brief:
        'Demonstre a captura de variáveis. Construa listas de `Action` das três formas — `for` sem cópia, `for` com cópia, e `foreach` — e mostre o que cada uma imprime.',
      requirements: [
        'Linha 1: `Com for: 3 3 3 `, capturando a variável do laço diretamente',
        'Linha 2: `Com copia: 0 1 2 `, capturando uma cópia local',
        'Linha 3: `Com foreach: 10 20 30 `, sobre o array lido da entrada',
        'Linha 4: `Contador: k`, o valor de um contador incrementado por uma lambda',
        'A lambda do contador precisa ser chamada `n` vezes, com `n` lido da entrada',
        'Os três laços rodam três voltas cada, independentemente da entrada',
        'Cada valor impresso é seguido de um espaço',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int[] valores = new int[3];
        for (int i = 0; i < 3; i++)
        {
            valores[i] = int.Parse(Console.ReadLine());
        }

        int n = int.Parse(Console.ReadLine());

        // 1. for capturando a variavel do laco
        // 2. for capturando uma copia local
        // 3. foreach sobre o array
        // 4. lambda que incrementa um contador n vezes
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int[] valores = new int[3];
        for (int i = 0; i < 3; i++)
        {
            valores[i] = int.Parse(Console.ReadLine());
        }

        int n = int.Parse(Console.ReadLine());

        List<Action> comFor = new List<Action>();
        for (int i = 0; i < 3; i++)
        {
            comFor.Add(() => Console.Write(i + " "));
        }

        Console.Write("Com for: ");
        foreach (Action a in comFor) a();
        Console.WriteLine();

        List<Action> comCopia = new List<Action>();
        for (int i = 0; i < 3; i++)
        {
            int copia = i;
            comCopia.Add(() => Console.Write(copia + " "));
        }

        Console.Write("Com copia: ");
        foreach (Action a in comCopia) a();
        Console.WriteLine();

        List<Action> comForeach = new List<Action>();
        foreach (int v in valores)
        {
            comForeach.Add(() => Console.Write(v + " "));
        }

        Console.Write("Com foreach: ");
        foreach (Action a in comForeach) a();
        Console.WriteLine();

        int contador = 0;
        Action incrementar = () => contador++;

        for (int i = 0; i < n; i++)
        {
            incrementar();
        }

        Console.WriteLine($"Contador: {contador}");
    }
}
`,
      hints: [
        'A cópia precisa ser declarada **dentro** do corpo do laço: `int copia = i;` antes de criar a lambda.',
        'A lambda do contador modifica a variável capturada, e a mudança é visível fora dela.',
      ],
      tests: [
        {
          name: 'Três valores e cinco incrementos',
          stdin: '10\n20\n30\n5\n',
          expectedStdout:
            'Com for: 3 3 3\nCom copia: 0 1 2\nCom foreach: 10 20 30\nContador: 5',
        },
        {
          name: 'Nenhum incremento',
          stdin: '1\n2\n3\n0\n',
          expectedStdout:
            'Com for: 3 3 3\nCom copia: 0 1 2\nCom foreach: 1 2 3\nContador: 0',
        },
        {
          name: 'Valores negativos no array',
          stdin: '-1\n-2\n-3\n2\n',
          expectedStdout:
            'Com for: 3 3 3\nCom copia: 0 1 2\nCom foreach: -1 -2 -3\nContador: 2',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c04l07',
    title: 'Passando comportamento como parâmetro',
    objective: 'Separar a parte fixa de um algoritmo da parte variável, recebendo esta última como função.',
    concept: [
      {
        kind: 'text',
        body:
          'Este é o padrão que reúne tudo do capítulo. Muitos algoritmos têm uma **estrutura fixa** — percorrer, acumular, decidir — e um **detalhe variável**. Passar o detalhe como função permite escrever a estrutura uma vez só.',
      },
      {
        kind: 'code',
        code: `static int Reduzir(int[] valores, int inicial, Func<int, int, int> combinar)
{
    int acumulado = inicial;

    foreach (int v in valores)
    {
        acumulado = combinar(acumulado, v);
    }

    return acumulado;
}

Reduzir(dados, 0, (acc, x) => acc + x);              // soma
Reduzir(dados, 1, (acc, x) => acc * x);              // produto
Reduzir(dados, int.MinValue, (acc, x) => x > acc ? x : acc);   // maximo`,
        caption: 'Um método, três algoritmos diferentes. O laço e o acumulador nunca mudam.',
      },
      {
        kind: 'text',
        body:
          'Repare que `inicial` também é parâmetro. É o elemento neutro da Seção 2, agora escolhido por quem chama — porque ele depende da operação, não do percurso.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Sem esse padrão, seriam três métodos com o mesmo laço copiado. Com ele, o laço existe uma vez e a operação vira **dado**. É a mesma ideia que fez `EhPrimo` ser reutilizável, levada um nível adiante: agora o que se reutiliza é a estrutura, não a regra.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O valor inicial precisa combinar com a operação. Somar começando em 1 dá um resultado errado por um; multiplicar começando em 0 zera tudo. Escolher o neutro errado é o bug mais provável aqui.',
      },
      {
        kind: 'text',
        body:
          'Este método tem um nome padrão na programação funcional — *fold* ou *reduce* — e existe no LINQ com o nome de `Aggregate`, que você verá no capítulo 6.',
      },
    ],
    quiz: [
      {
        id: 's04c04l07q1',
        type: 'single',
        prompt: 'Qual valor inicial usar para calcular o produto com `Reduzir`?',
        options: [
          { id: 'a', code: '1', correct: true },
          { id: 'b', code: '0' },
          { id: 'c', text: 'O primeiro elemento.' },
          { id: 'd', code: 'int.MaxValue' },
        ],
        explanation:
          'É o elemento neutro da multiplicação, o mesmo da Seção 2. Começar em 0 faria todo produto resultar em 0.',
      },
      {
        id: 's04c04l07q2',
        type: 'single',
        prompt: 'O que a lambda `(acc, x) => x > acc ? x : acc` calcula?',
        options: [
          { id: 'a', text: 'O maior valor da coleção.', correct: true },
          { id: 'b', text: 'A soma dos valores.' },
          { id: 'c', text: 'A quantidade de valores maiores que o acumulado.' },
          { id: 'd', text: 'O último valor.' },
        ],
        explanation:
          'Ela mantém o acumulado quando ele já é maior, e o substitui quando encontra algo maior. É a busca de máximo da Seção 2, escrita como combinação.',
      },
      {
        id: 's04c04l07q3',
        type: 'single',
        prompt: 'Qual é a vantagem de receber a operação como parâmetro?',
        options: [
          { id: 'a', text: 'A estrutura do algoritmo é escrita uma vez e serve para várias operações.', correct: true },
          { id: 'b', text: 'O código executa mais rápido.' },
          { id: 'c', text: 'Elimina a necessidade de laços.' },
          { id: 'd', text: 'Permite processar tipos diferentes na mesma coleção.' },
        ],
        explanation:
          'A alternativa é copiar o mesmo laço para cada operação. Passar a operação isola exatamente a parte que varia.',
      },
    ],
    challenge: {
      brief:
        'Escreva `Reduzir`, que percorre um array combinando os elementos com uma função recebida. Use-o para calcular quatro agregados diferentes, sem escrever nenhum laço adicional.',
      requirements: [
        '`Reduzir` recebe um `int[]`, um `int` inicial e um `Func<int, int, int>`',
        'Linha 1: `Soma: X`',
        'Linha 2: `Produto: Y`',
        'Linha 3: `Maximo: Z`',
        'Linha 4: `Minimo: W`',
        'Linha 5: `Contagem de pares: k`, contando quantos elementos são pares',
        'Os cinco resultados precisam sair de chamadas a `Reduzir`, com lambdas diferentes',
        'A entrada sempre tem pelo menos um valor',
        'Não mude a assinatura de `Reduzir`',
      ],
      starterCode: `using System;

class Program
{
    static int Reduzir(int[] valores, int inicial, Func<int, int, int> combinar)
    {
        // Acumule aplicando combinar a cada elemento
        return inicial;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] valores = new int[n];
        for (int i = 0; i < n; i++)
        {
            valores[i] = int.Parse(Console.ReadLine());
        }

        // Cinco chamadas a Reduzir, com lambdas diferentes
    }
}
`,
      solution: `using System;

class Program
{
    static int Reduzir(int[] valores, int inicial, Func<int, int, int> combinar)
    {
        int acumulado = inicial;

        foreach (int v in valores)
        {
            acumulado = combinar(acumulado, v);
        }

        return acumulado;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] valores = new int[n];
        for (int i = 0; i < n; i++)
        {
            valores[i] = int.Parse(Console.ReadLine());
        }

        Console.WriteLine($"Soma: {Reduzir(valores, 0, (acc, x) => acc + x)}");
        Console.WriteLine($"Produto: {Reduzir(valores, 1, (acc, x) => acc * x)}");
        Console.WriteLine($"Maximo: {Reduzir(valores, int.MinValue, (acc, x) => x > acc ? x : acc)}");
        Console.WriteLine($"Minimo: {Reduzir(valores, int.MaxValue, (acc, x) => x < acc ? x : acc)}");
        Console.WriteLine($"Contagem de pares: {Reduzir(valores, 0, (acc, x) => x % 2 == 0 ? acc + 1 : acc)}");
    }
}
`,
      hints: [
        'Cada agregado precisa do seu valor inicial: 0 para soma e contagem, 1 para produto, e os extremos do tipo para máximo e mínimo.',
        'A contagem de pares ignora o valor de `x` no acumulado: ela só decide entre somar 1 ou manter.',
      ],
      tests: [
        {
          name: 'Quatro valores',
          stdin: '4\n2\n3\n4\n5\n',
          expectedStdout:
            'Soma: 14\nProduto: 120\nMaximo: 5\nMinimo: 2\nContagem de pares: 2',
        },
        {
          name: 'Valores negativos',
          stdin: '3\n-2\n-3\n-4\n',
          expectedStdout:
            'Soma: -9\nProduto: -24\nMaximo: -2\nMinimo: -4\nContagem de pares: 2',
        },
        {
          name: 'Um valor só',
          stdin: '1\n7\n',
          expectedStdout:
            'Soma: 7\nProduto: 7\nMaximo: 7\nMinimo: 7\nContagem de pares: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c04l08',
    title: 'Comparison e ordenação customizada',
    objective: 'Ordenar por qualquer critério passando uma função de comparação ao `Sort`.',
    concept: [
      {
        kind: 'text',
        body:
          'Na Seção 3, `Sort` só sabia ordenar em ordem crescente natural. Agora que comportamento pode ser passado como parâmetro, ele passa a ordenar por **qualquer** critério.',
      },
      {
        kind: 'code',
        code: `List<int> lista = new List<int> { 3, 1, 2 };

lista.Sort((a, b) => b.CompareTo(a));   // decrescente
// 3 2 1`,
        caption: 'A lambda recebe dois elementos e diz qual vem primeiro.',
      },
      {
        kind: 'text',
        body:
          'O contrato da comparação é um número, não um `bool`. O sinal é o que importa:',
      },
      {
        kind: 'table',
        headers: ['`comparar(a, b)` devolve', 'Significa'],
        rows: [
          ['negativo', '`a` vem antes de `b`'],
          ['zero', 'tanto faz'],
          ['positivo', '`a` vem depois de `b`'],
        ],
      },
      {
        kind: 'text',
        body:
          'Você raramente precisa calcular esse número à mão: `CompareTo` já devolve exatamente isso. Trocar a ordem dos operandos inverte a ordenação.',
      },
      {
        kind: 'compare',
        good: `lista.Sort((a, b) => a.CompareTo(b));   // crescente
lista.Sort((a, b) => b.CompareTo(a));   // decrescente`,
        bad: `lista.Sort((a, b) => a > b);   // nao compila: bool nao serve`,
        goodLabel: 'Devolve `int`',
        badLabel: 'Devolve `bool`',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Para ordenar por vários critérios, compare o primeiro e só desempate quando ele der zero. É a mesma prioridade em cadeia que a tupla resolvia automaticamente na Seção 3 — aqui você a escreve explicitamente.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A comparação precisa ser **consistente**: se `a` vem antes de `b` e `b` antes de `c`, então `a` tem que vir antes de `c`. Uma comparação contraditória pode fazer o algoritmo de ordenação lançar exceção.',
      },
    ],
    quiz: [
      {
        id: 's04c04l08q1',
        type: 'single',
        prompt: 'O que a função de comparação deve devolver para `a` vir antes de `b`?',
        options: [
          { id: 'a', text: 'Um número negativo.', correct: true },
          { id: 'b', code: 'true' },
          { id: 'c', text: 'Um número positivo.' },
          { id: 'd', code: '0' },
        ],
        explanation:
          'A convenção é a mesma de `CompareTo`: negativo significa "menor", e o menor vem primeiro na ordem crescente.',
      },
      {
        id: 's04c04l08q2',
        type: 'single',
        prompt: 'Como inverter uma ordenação?',
        options: [
          { id: 'a', text: 'Trocando a ordem dos operandos: `b.CompareTo(a)`.', correct: true },
          { id: 'b', text: 'Devolvendo o valor absoluto.' },
          { id: 'c', text: 'Chamando `Sort` duas vezes.' },
          { id: 'd', text: 'Usando `!` na comparação.' },
        ],
        explanation:
          'Inverter os operandos inverte o sinal do resultado, e portanto a ordem inteira. O `!` nem se aplica, porque o retorno não é `bool`.',
      },
      {
        id: 's04c04l08q3',
        type: 'single',
        prompt: 'Como ordenar por um critério e desempatar por outro?',
        options: [
          { id: 'a', text: 'Comparar o primeiro e, se o resultado for zero, comparar o segundo.', correct: true },
          { id: 'b', text: 'Chamar `Sort` duas vezes, uma para cada critério.' },
          { id: 'c', text: 'Somar as duas comparações.' },
          { id: 'd', text: 'Não é possível com uma função só.' },
        ],
        explanation:
          'Zero significa empate no primeiro critério, e é exatamente aí que o segundo entra. Ordenar duas vezes desfaria a primeira ordenação.',
      },
    ],
    challenge: {
      brief:
        'Ordene uma lista de palavras por critérios diferentes usando `Sort` com comparações customizadas.',
      requirements: [
        'Leia `n` palavras para uma `List<string>`',
        'Linha 1: `Alfabetica: ...`, em ordem alfabética crescente',
        'Linha 2: `Inversa: ...`, em ordem alfabética decrescente',
        'Linha 3: `Por tamanho: ...`, do mais curto para o mais longo, desempatando por ordem alfabética',
        'Linha 4: `Por tamanho decrescente: ...`, do mais longo para o mais curto, desempatando por ordem alfabética crescente',
        'As palavras aparecem separadas por espaço em todas as linhas',
        'Cada ordenação precisa partir da lista original, sem depender da ordenação anterior',
        'Use `Sort` com lambdas de comparação, sem escrever um algoritmo de ordenação',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<string> palavras = new List<string>();
        for (int i = 0; i < n; i++)
        {
            palavras.Add(Console.ReadLine());
        }

        // Quatro ordenacoes, cada uma sobre uma copia da lista original
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<string> palavras = new List<string>();
        for (int i = 0; i < n; i++)
        {
            palavras.Add(Console.ReadLine());
        }

        List<string> alfabetica = new List<string>(palavras);
        alfabetica.Sort((a, b) => a.CompareTo(b));

        List<string> inversa = new List<string>(palavras);
        inversa.Sort((a, b) => b.CompareTo(a));

        List<string> porTamanho = new List<string>(palavras);
        porTamanho.Sort((a, b) =>
        {
            int diferenca = a.Length.CompareTo(b.Length);
            return diferenca != 0 ? diferenca : a.CompareTo(b);
        });

        List<string> porTamanhoDecrescente = new List<string>(palavras);
        porTamanhoDecrescente.Sort((a, b) =>
        {
            int diferenca = b.Length.CompareTo(a.Length);
            return diferenca != 0 ? diferenca : a.CompareTo(b);
        });

        Console.WriteLine($"Alfabetica: {string.Join(" ", alfabetica)}");
        Console.WriteLine($"Inversa: {string.Join(" ", inversa)}");
        Console.WriteLine($"Por tamanho: {string.Join(" ", porTamanho)}");
        Console.WriteLine($"Por tamanho decrescente: {string.Join(" ", porTamanhoDecrescente)}");
    }
}
`,
      hints: [
        'Cada ordenação precisa da sua própria cópia: `new List<string>(palavras)`, porque `Sort` altera no lugar.',
        'No desempate, guarde a primeira comparação em uma variável e só use a segunda quando ela for zero.',
      ],
      tests: [
        {
          name: 'Palavras de tamanhos variados',
          stdin: '5\nuva\nbanana\nkiwi\npera\nabacaxi\n',
          expectedStdout:
            'Alfabetica: abacaxi banana kiwi pera uva\nInversa: uva pera kiwi banana abacaxi\n' +
            'Por tamanho: uva kiwi pera banana abacaxi\nPor tamanho decrescente: abacaxi banana kiwi pera uva',
        },
        {
          name: 'Todas do mesmo tamanho',
          stdin: '3\ncba\nabc\nbca\n',
          expectedStdout:
            'Alfabetica: abc bca cba\nInversa: cba bca abc\n' +
            'Por tamanho: abc bca cba\nPor tamanho decrescente: abc bca cba',
        },
        {
          name: 'Uma palavra só',
          stdin: '1\nsozinha\n',
          expectedStdout:
            'Alfabetica: sozinha\nInversa: sozinha\nPor tamanho: sozinha\nPor tamanho decrescente: sozinha',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c04l09',
    title: 'Prática: pipeline configurável',
    objective: 'Encadear transformações guardadas em uma coleção, aplicando-as em sequência sobre os dados.',
    concept: [
      {
        kind: 'text',
        body:
          'Se uma função pode ser guardada em uma variável, ela também pode ser guardada em uma **lista**. Uma lista de funções é um pipeline: cada uma recebe o resultado da anterior.',
      },
      {
        kind: 'code',
        code: `List<Func<int, int>> etapas = new List<Func<int, int>>();

etapas.Add(x => x * 2);
etapas.Add(x => x + 10);
etapas.Add(x => x / 3);

int valor = 5;

foreach (Func<int, int> etapa in etapas)
{
    valor = etapa(valor);   // saida de uma vira entrada da proxima
}

// 5 -> 10 -> 20 -> 6`,
        caption: 'O pipeline é montado em tempo de execução, e sua composição é um dado.',
      },
      {
        kind: 'text',
        body:
          'A vantagem é que a **sequência de transformações** deixa de estar fixa no código. Ela pode vir de uma configuração, de uma entrada do usuário, ou ser montada condicionalmente.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A ordem importa e não é comutativa. Dobrar e depois somar 10 dá um resultado diferente de somar 10 e depois dobrar — em 5, o primeiro dá 20 e o segundo dá 30.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Este é o mesmo conceito do LINQ, que você verá nos próximos capítulos: `Where` seguido de `Select` seguido de `OrderBy` é um pipeline de transformações. A diferença é que lá a sintaxe é encadeada em vez de uma lista.',
      },
      {
        kind: 'text',
        body:
          'Um pipeline vazio devolve o valor de entrada inalterado — o que é coerente: nenhuma transformação aplicada significa nenhuma mudança.',
      },
    ],
    quiz: [
      {
        id: 's04c04l09q1',
        type: 'single',
        prompt: 'Aplicando `x => x * 2` e depois `x => x + 10` ao valor 5, qual é o resultado?',
        options: [
          { id: 'a', code: '20', correct: true },
          { id: 'b', code: '30' },
          { id: 'c', code: '15' },
          { id: 'd', code: '25' },
        ],
        explanation:
          '`5 * 2 = 10`, e `10 + 10 = 20`. Na ordem inversa daria `(5 + 10) * 2 = 30`.',
      },
      {
        id: 's04c04l09q2',
        type: 'single',
        prompt: 'O que um pipeline vazio devolve?',
        options: [
          { id: 'a', text: 'O valor de entrada, inalterado.', correct: true },
          { id: 'b', code: '0' },
          { id: 'c', text: 'Lança exceção.' },
          { id: 'd', code: 'null' },
        ],
        explanation:
          'O `foreach` não dá voltas e o valor nunca é modificado. É o mesmo comportamento neutro de um laço que não roda.',
      },
      {
        id: 's04c04l09q3',
        type: 'single',
        prompt: 'Qual é a vantagem de guardar as transformações em uma lista?',
        options: [
          { id: 'a', text: 'A sequência pode ser montada em tempo de execução, e não fica fixa no código.', correct: true },
          { id: 'b', text: 'Fica mais rápido que chamar as funções diretamente.' },
          { id: 'c', text: 'Permite transformações de tipos diferentes.' },
          { id: 'd', text: 'Evita usar lambdas.' },
        ],
        explanation:
          'A composição vira dado. Isso permite configurar o processamento sem recompilar, e montar pipelines diferentes conforme a situação.',
      },
    ],
    challenge: {
      brief:
        'Monte um pipeline configurável. Leia uma sequência de códigos de transformação, construa a lista de etapas correspondente, e aplique o pipeline a cada valor de entrada.',
      requirements: [
        'Os códigos são: `d` para dobrar, `t` para triplicar, `i` para incrementar em 10, `n` para negar, e `q` para elevar ao quadrado',
        'Códigos desconhecidos são ignorados e não entram no pipeline',
        'Linha 1: `Etapas: k`, quantas transformações válidas foram montadas',
        'Uma linha por valor, no formato `5 -> 20`',
        'A última linha é `Soma dos resultados: X`',
        'A ordem da entrada é: `e` e os `e` códigos, depois `v` e os `v` valores',
        'Um pipeline vazio devolve cada valor inalterado',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int e = int.Parse(Console.ReadLine());

        List<Func<int, int>> etapas = new List<Func<int, int>>();

        for (int i = 0; i < e; i++)
        {
            string codigo = Console.ReadLine();

            // Monte o pipeline conforme o codigo
        }

        Console.WriteLine($"Etapas: {etapas.Count}");

        int v = int.Parse(Console.ReadLine());
        int soma = 0;

        for (int i = 0; i < v; i++)
        {
            int valor = int.Parse(Console.ReadLine());

            // Aplique todas as etapas em sequencia
        }

        Console.WriteLine($"Soma dos resultados: {soma}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int e = int.Parse(Console.ReadLine());

        List<Func<int, int>> etapas = new List<Func<int, int>>();

        for (int i = 0; i < e; i++)
        {
            string codigo = Console.ReadLine();

            if (codigo == "d") etapas.Add(x => x * 2);
            else if (codigo == "t") etapas.Add(x => x * 3);
            else if (codigo == "i") etapas.Add(x => x + 10);
            else if (codigo == "n") etapas.Add(x => -x);
            else if (codigo == "q") etapas.Add(x => x * x);
        }

        Console.WriteLine($"Etapas: {etapas.Count}");

        int v = int.Parse(Console.ReadLine());
        int soma = 0;

        for (int i = 0; i < v; i++)
        {
            int original = int.Parse(Console.ReadLine());
            int valor = original;

            foreach (Func<int, int> etapa in etapas)
            {
                valor = etapa(valor);
            }

            Console.WriteLine($"{original} -> {valor}");
            soma += valor;
        }

        Console.WriteLine($"Soma dos resultados: {soma}");
    }
}
`,
      hints: [
        'Guarde o valor original antes de aplicar o pipeline: a linha de saída mostra os dois.',
        'O `foreach` sobre as etapas reatribui a mesma variável: `valor = etapa(valor);`.',
      ],
      tests: [
        {
          name: 'Dobrar e incrementar',
          stdin: '2\nd\ni\n3\n5\n10\n0\n',
          expectedStdout:
            'Etapas: 2\n5 -> 20\n10 -> 30\n0 -> 10\nSoma dos resultados: 60',
        },
        {
          name: 'Código inválido é ignorado',
          stdin: '3\nd\nx\nn\n2\n5\n-5\n',
          expectedStdout:
            'Etapas: 2\n5 -> -10\n-5 -> 10\nSoma dos resultados: 0',
        },
        {
          name: 'Pipeline vazio não altera nada',
          stdin: '0\n2\n7\n9\n',
          expectedStdout: 'Etapas: 0\n7 -> 7\n9 -> 9\nSoma dos resultados: 16',
        },
        {
          name: 'Quadrado depois de triplicar',
          stdin: '2\nt\nq\n1\n2\n',
          expectedStdout: 'Etapas: 2\n2 -> 36\nSoma dos resultados: 36',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c04l10',
    title: 'Checkpoint: comportamento como dado',
    objective: 'Construir um processador genérico que recebe filtro, transformação, ordenação e agregação como parâmetros.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint monta um processador de dados em que **todas** as decisões vêm de fora. O método não sabe o que filtra, o que transforma, como ordena, nem o que calcula — e mesmo assim faz um trabalho completo.',
      },
      {
        kind: 'table',
        headers: ['Etapa', 'Tipo', 'Papel'],
        rows: [
          ['filtrar', '`Func<int, bool>`', 'quais elementos passam'],
          ['transformar', '`Func<int, int>`', 'o que fazer com cada um'],
          ['ordenar', '`Comparison<int>`', 'em que ordem apresentar'],
          ['agregar', '`Func<int, int, int>`', 'como combinar em um número'],
        ],
      },
      {
        kind: 'code',
        code: `Processar(dados,
    x => x > 0,           // so positivos
    x => x * x,           // ao quadrado
    (a, b) => b - a,      // decrescente
    (acc, x) => acc + x); // somados`,
        caption: 'A chamada descreve o processamento inteiro, sem revelar como ele é executado.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que a ordem das etapas é fixa — filtrar, transformar, ordenar, agregar — e é isso que dá sentido ao pipeline. Transformar antes de filtrar produziria resultados diferentes, e por isso a ordem faz parte do contrato do método.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A comparação `(a, b) => b - a` funciona para valores pequenos, mas pode estourar com números muito grandes ou muito negativos. `b.CompareTo(a)` é sempre seguro, e é a forma que você deve preferir.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Construa em etapas, testando a cada uma: primeiro só o filtro, depois a transformação, depois a ordenação, e por último a agregação. Quatro funções de uma vez é muito estado para depurar de cabeça.',
      },
      {
        kind: 'text',
        body:
          'O que você acabou de construir é essencialmente o LINQ — que os próximos dois capítulos apresentam com uma sintaxe muito mais confortável, mas exatamente os mesmos conceitos.',
      },
    ],
    quiz: [
      {
        id: 's04c04l10q1',
        type: 'single',
        prompt: 'Por que a ordem das etapas faz parte do contrato do método?',
        options: [
          { id: 'a', text: 'Porque transformar antes de filtrar produziria resultados diferentes.', correct: true },
          { id: 'b', text: 'Porque as funções precisam ser passadas nessa ordem.' },
          { id: 'c', text: 'Porque a ordenação exige dados já agregados.' },
          { id: 'd', text: 'Não faz: a ordem é indiferente.' },
        ],
        explanation:
          'Filtrar valores positivos e depois elevar ao quadrado dá um conjunto; elevar primeiro tornaria todos positivos e o filtro deixaria de excluir qualquer coisa.',
      },
      {
        id: 's04c04l10q2',
        type: 'single',
        prompt: 'Por que preferir `b.CompareTo(a)` a `b - a` na comparação?',
        options: [
          { id: 'a', text: 'Porque a subtração pode estourar com valores extremos.', correct: true },
          { id: 'b', text: 'Porque `CompareTo` é mais rápido.' },
          { id: 'c', text: 'Porque `b - a` não compila.' },
          { id: 'd', text: 'Porque `CompareTo` devolve `bool`.' },
        ],
        explanation:
          'A diferença entre `int.MaxValue` e um negativo grande não cabe em um `int`, e o resultado dá a volta com o sinal errado. `CompareTo` nunca tem esse problema.',
      },
      {
        id: 's04c04l10q3',
        type: 'single',
        prompt: 'O que este processador tem em comum com o LINQ?',
        options: [
          { id: 'a', text: 'Os dois recebem comportamento como parâmetro para filtrar, transformar e agregar.', correct: true },
          { id: 'b', text: 'Os dois usam a mesma sintaxe.' },
          { id: 'c', text: 'Os dois funcionam só com `int`.' },
          { id: 'd', text: 'Nenhuma relação.' },
        ],
        explanation:
          'O LINQ é exatamente esse padrão com uma API encadeada e genérica. Entender este método é entender o mecanismo por trás dos próximos dois capítulos.',
      },
    ],
    challenge: {
      brief:
        'Construa um processador genérico com quatro etapas configuráveis. Leia os dados e os códigos das quatro etapas, e produza o resultado do pipeline completo.',
      requirements: [
        '`Processar` recebe um `int[]`, um `Func<int, bool>`, um `Func<int, int>`, um `Comparison<int>`, um `Func<int, int, int>` e um `int` inicial, e devolve a lista processada e o agregado',
        'A ordem das etapas é: filtrar, transformar, ordenar, agregar',
        'Filtros: `p` positivos, `a` pares, `t` todos',
        'Transformações: `q` quadrado, `d` dobro, `i` identidade',
        'Ordenações: `c` crescente, `d` decrescente',
        'Agregações: `s` soma com inicial `0`, `m` produto com inicial `1`, `x` máximo com inicial `int.MinValue`',
        'Linha 1: `Filtrados e transformados: 4 16 36`',
        'Linha 2: `Quantidade: k`',
        'Linha 3: `Agregado: X`',
        'A ordem da entrada é: `n`, os `n` valores, e depois os quatro códigos',
        'Com nenhum elemento aprovado, a primeira linha sai só com o rótulo e o agregado é o valor inicial',
        'Não mude a assinatura de `Processar`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static (List<int> Itens, int Agregado) Processar(
        int[] valores,
        Func<int, bool> filtrar,
        Func<int, int> transformar,
        Comparison<int> ordenar,
        Func<int, int, int> agregar,
        int inicial)
    {
        // Filtre, transforme, ordene, agregue
        return (new List<int>(), inicial);
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] valores = new int[n];
        for (int i = 0; i < n; i++)
        {
            valores[i] = int.Parse(Console.ReadLine());
        }

        string codigoFiltro = Console.ReadLine();
        string codigoTransformacao = Console.ReadLine();
        string codigoOrdem = Console.ReadLine();
        string codigoAgregacao = Console.ReadLine();

        // Monte as quatro funcoes e chame Processar
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static (List<int> Itens, int Agregado) Processar(
        int[] valores,
        Func<int, bool> filtrar,
        Func<int, int> transformar,
        Comparison<int> ordenar,
        Func<int, int, int> agregar,
        int inicial)
    {
        List<int> itens = new List<int>();

        foreach (int v in valores)
        {
            if (filtrar(v))
            {
                itens.Add(transformar(v));
            }
        }

        itens.Sort(ordenar);

        int agregado = inicial;

        foreach (int item in itens)
        {
            agregado = agregar(agregado, item);
        }

        return (itens, agregado);
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] valores = new int[n];
        for (int i = 0; i < n; i++)
        {
            valores[i] = int.Parse(Console.ReadLine());
        }

        string codigoFiltro = Console.ReadLine();
        string codigoTransformacao = Console.ReadLine();
        string codigoOrdem = Console.ReadLine();
        string codigoAgregacao = Console.ReadLine();

        Func<int, bool> filtrar = x => true;
        if (codigoFiltro == "p") filtrar = x => x > 0;
        else if (codigoFiltro == "a") filtrar = x => x % 2 == 0;

        Func<int, int> transformar = x => x;
        if (codigoTransformacao == "q") transformar = x => x * x;
        else if (codigoTransformacao == "d") transformar = x => x * 2;

        Comparison<int> ordenar = (a, b) => a.CompareTo(b);
        if (codigoOrdem == "d") ordenar = (a, b) => b.CompareTo(a);

        Func<int, int, int> agregar = (acc, x) => acc + x;
        int inicial = 0;

        if (codigoAgregacao == "m")
        {
            agregar = (acc, x) => acc * x;
            inicial = 1;
        }
        else if (codigoAgregacao == "x")
        {
            agregar = (acc, x) => x > acc ? x : acc;
            inicial = int.MinValue;
        }

        var (itens, agregado) = Processar(
            valores, filtrar, transformar, ordenar, agregar, inicial);

        Console.WriteLine($"Filtrados e transformados: {string.Join(" ", itens)}");
        Console.WriteLine($"Quantidade: {itens.Count}");
        Console.WriteLine($"Agregado: {agregado}");
    }
}
`,
      hints: [
        'Cada código escolhe uma lambda; comece com um valor padrão e substitua conforme a entrada.',
        'A agregação vem em par com o valor inicial: soma com 0, produto com 1, máximo com `int.MinValue`.',
      ],
      tests: [
        {
          name: 'Positivos ao quadrado, crescente, somados',
          stdin: '5\n2\n-3\n4\n-5\n6\np\nq\nc\ns\n',
          expectedStdout:
            'Filtrados e transformados: 4 16 36\nQuantidade: 3\nAgregado: 56',
        },
        {
          name: 'Pares dobrados, decrescente, produto',
          stdin: '4\n1\n2\n3\n4\na\nd\nd\nm\n',
          expectedStdout:
            'Filtrados e transformados: 8 4\nQuantidade: 2\nAgregado: 32',
        },
        {
          name: 'Todos, identidade, crescente, máximo',
          stdin: '3\n-5\n10\n3\nt\ni\nc\nx\n',
          expectedStdout:
            'Filtrados e transformados: -5 3 10\nQuantidade: 3\nAgregado: 10',
        },
        {
          name: 'Nenhum aprovado no filtro',
          stdin: '2\n-1\n-3\np\nq\nc\ns\n',
          expectedStdout:
            'Filtrados e transformados:\nQuantidade: 0\nAgregado: 0',
          hidden: true,
        },
      ],
    },
  },
]
