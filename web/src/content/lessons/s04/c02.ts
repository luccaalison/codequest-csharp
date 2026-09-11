import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's04c02l01',
    title: 'Sobrecarga de métodos',
    objective: 'Dar o mesmo nome a métodos que fazem a mesma coisa conceitual com entradas diferentes.',
    concept: [
      {
        kind: 'text',
        body:
          'Vários métodos podem compartilhar o mesmo nome, desde que suas listas de parâmetros sejam diferentes. Isso se chama **sobrecarga**, e o compilador escolhe qual chamar pelos argumentos que você passou.',
      },
      {
        kind: 'code',
        code: `static string Descrever(int n) => "inteiro " + n;
static string Descrever(double d) => "real " + d.ToString("F2");
static string Descrever(string s) => "texto " + s;
static string Descrever(int a, int b) => $"par {a} e {b}";

Descrever(5);        // inteiro 5
Descrever(5.5);      // real 5.50
Descrever("abc");    // texto abc
Descrever(3, 4);     // par 3 e 4`,
        caption: 'Quatro métodos, um nome. A escolha acontece na compilação, não em execução.',
      },
      {
        kind: 'text',
        body:
          'A **assinatura** de um método é o nome mais os tipos dos parâmetros. Duas sobrecargas precisam diferir em pelo menos um desses tipos, ou na quantidade de parâmetros.',
      },
      {
        kind: 'table',
        headers: ['Diferença', 'Vale como sobrecarga?'],
        rows: [
          ['quantidade de parâmetros', '**sim**'],
          ['tipos dos parâmetros', '**sim**'],
          ['nomes dos parâmetros', 'não'],
          ['tipo de retorno', 'não'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Duas sobrecargas que diferem **apenas no tipo de retorno** não compilam. O compilador escolhe pela chamada, e a chamada não diz qual retorno você quer — em `Console.WriteLine(Ler())` não haveria como decidir.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Sobrecarregar só faz sentido quando as versões fazem **a mesma coisa conceitual**. `Console.WriteLine` tem quase vinte sobrecargas e todas escrevem uma linha. Usar o mesmo nome para operações diferentes é pior que usar nomes diferentes.',
      },
      {
        kind: 'text',
        body:
          'A seta `=>` no lugar das chaves é uma forma abreviada para métodos de uma expressão só. Ela é equivalente a um corpo com `return` e aparece muito em código moderno.',
      },
    ],
    quiz: [
      {
        id: 's04c02l01q1',
        type: 'single',
        prompt: 'O que compõe a assinatura de um método para fins de sobrecarga?',
        options: [
          { id: 'a', text: 'O nome e os tipos dos parâmetros.', correct: true },
          { id: 'b', text: 'O nome e o tipo de retorno.' },
          { id: 'c', text: 'Apenas o nome.' },
          { id: 'd', text: 'O nome e os nomes dos parâmetros.' },
        ],
        explanation:
          'Nomes de parâmetro e tipo de retorno não entram na conta. É por isso que mudar só o retorno não cria uma sobrecarga válida.',
      },
      {
        id: 's04c02l01q2',
        type: 'single',
        prompt: 'Qual sobrecarga é chamada por `Descrever(5)`?',
        options: [
          { id: 'a', text: 'A que recebe `int`.', correct: true },
          { id: 'b', text: 'A que recebe `double`.' },
          { id: 'c', text: 'Depende do valor.' },
          { id: 'd', text: 'A chamada é ambígua e não compila.' },
        ],
        explanation:
          'O literal `5` é `int`, e existe uma sobrecarga que aceita `int` exatamente. Só na ausência dela o compilador consideraria a conversão implícita para `double`.',
      },
      {
        id: 's04c02l01q3',
        type: 'single',
        prompt: 'Quando **não** usar sobrecarga?',
        options: [
          { id: 'a', text: 'Quando as versões fazem coisas conceitualmente diferentes.', correct: true },
          { id: 'b', text: 'Quando há mais de duas versões.' },
          { id: 'c', text: 'Quando os parâmetros têm tipos diferentes.' },
          { id: 'd', text: 'Quando o método é `void`.' },
        ],
        explanation:
          'O nome compartilhado promete comportamento compartilhado. Quando as versões fazem coisas distintas, nomes distintos comunicam melhor e evitam surpresas.',
      },
    ],
    challenge: {
      brief:
        'Escreva quatro sobrecargas de `Descrever`, uma para cada forma de entrada. Leia `q` chamadas, cada uma começando por um marcador de tipo, e produza a descrição correspondente.',
      requirements: [
        '`Descrever(int)` devolve `inteiro 5`',
        '`Descrever(double)` devolve `real 5.50`, com duas casas decimais',
        '`Descrever(string)` devolve `texto abc`',
        '`Descrever(int, int)` devolve `par 3 e 4`',
        'O marcador `i` é seguido de um inteiro, `d` de um real, `s` de um texto e `p` de dois inteiros',
        'A última linha é `Chamadas: q`',
        'Leia os reais com `CultureInfo.InvariantCulture`',
        'Não mude as assinaturas das quatro sobrecargas',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static string Descrever(int n)
    {
        return "";
    }

    static string Descrever(double d)
    {
        return "";
    }

    static string Descrever(string s)
    {
        return "";
    }

    static string Descrever(int a, int b)
    {
        return "";
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());

        for (int i = 0; i < q; i++)
        {
            string marcador = Console.ReadLine();

            // Leia conforme o marcador e chame a sobrecarga certa
        }

        Console.WriteLine($"Chamadas: {q}");
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static string Descrever(int n)
    {
        return "inteiro " + n;
    }

    static string Descrever(double d)
    {
        return "real " + d.ToString("F2");
    }

    static string Descrever(string s)
    {
        return "texto " + s;
    }

    static string Descrever(int a, int b)
    {
        return $"par {a} e {b}";
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());

        for (int i = 0; i < q; i++)
        {
            string marcador = Console.ReadLine();

            if (marcador == "i")
            {
                Console.WriteLine(Descrever(int.Parse(Console.ReadLine())));
            }
            else if (marcador == "d")
            {
                double d = double.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
                Console.WriteLine(Descrever(d));
            }
            else if (marcador == "s")
            {
                Console.WriteLine(Descrever(Console.ReadLine()));
            }
            else
            {
                int a = int.Parse(Console.ReadLine());
                int b = int.Parse(Console.ReadLine());
                Console.WriteLine(Descrever(a, b));
            }
        }

        Console.WriteLine($"Chamadas: {q}");
    }
}
`,
      hints: [
        'O tipo da variável que você passa é o que escolhe a sobrecarga: passar um `double` chama a versão de `double`.',
        'O marcador `p` consome **duas** linhas de entrada; os outros consomem uma.',
      ],
      tests: [
        {
          name: 'As quatro sobrecargas',
          stdin: '4\ni\n5\nd\n5.5\ns\nabc\np\n3\n4\n',
          expectedStdout:
            'inteiro 5\nreal 5.50\ntexto abc\npar 3 e 4\nChamadas: 4',
        },
        {
          name: 'Inteiro negativo e texto',
          stdin: '2\ni\n-7\ns\noi\n',
          expectedStdout: 'inteiro -7\ntexto oi\nChamadas: 2',
        },
        {
          name: 'Só a sobrecarga de dois parâmetros',
          stdin: '1\np\n10\n20\n',
          expectedStdout: 'par 10 e 20\nChamadas: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c02l02',
    title: 'Parâmetros opcionais',
    objective: 'Definir valores padrão para parâmetros, permitindo chamadas curtas sem criar sobrecargas.',
    concept: [
      {
        kind: 'text',
        body:
          'Um parâmetro com valor padrão pode ser omitido na chamada. É a alternativa a criar três sobrecargas que só repassam valores umas para as outras.',
      },
      {
        kind: 'code',
        code: `static string Formatar(string texto, int largura = 10, char preenchimento = '.')
{
    string resultado = texto;

    while (resultado.Length < largura)
    {
        resultado += preenchimento;
    }

    return resultado;
}

Formatar("abc");             // abc.......
Formatar("abc", 5);          // abc..
Formatar("abc", 5, '-');     // abc--`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Parâmetros opcionais precisam vir **depois** de todos os obrigatórios. `Formatar(int largura = 10, string texto)` não compila: não haveria como omitir o primeiro e passar o segundo por posição.',
      },
      {
        kind: 'text',
        body:
          'Os valores padrão precisam ser **constantes de compilação**: literais, `null`, ou constantes declaradas. Não é possível usar uma chamada de método ou uma variável como padrão.',
      },
      {
        kind: 'compare',
        good: `static void Log(string msg, int nivel = 1)`,
        bad: `static void Log(string msg, DateTime quando = DateTime.Now)`,
        goodLabel: 'Literal: compila',
        badLabel: 'Chamada: não compila',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O valor padrão é substituído **no local da chamada**, em tempo de compilação. Isso tem uma consequência prática: mudar o padrão de uma biblioteca não afeta código já compilado que a usa — ele guarda o valor antigo.',
      },
      {
        kind: 'text',
        body:
          'Quando o padrão precisa ser calculado, o caminho é aceitar um valor sentinela — como `null` ou `-1` — e resolver dentro do método. É o que fazem várias APIs do .NET.',
      },
    ],
    quiz: [
      {
        id: 's04c02l02q1',
        type: 'single',
        prompt: 'Onde os parâmetros opcionais devem ficar na assinatura?',
        options: [
          { id: 'a', text: 'Depois de todos os obrigatórios.', correct: true },
          { id: 'b', text: 'Antes dos obrigatórios.' },
          { id: 'c', text: 'Em qualquer posição.' },
          { id: 'd', text: 'Sempre em segundo lugar.' },
        ],
        explanation:
          'Como os argumentos são associados por posição, um opcional no meio tornaria impossível omiti-lo e ainda passar os seguintes.',
      },
      {
        id: 's04c02l02q2',
        type: 'single',
        prompt: 'Por que `int limite = ObterLimite()` não pode ser um valor padrão?',
        options: [
          { id: 'a', text: 'Porque o padrão precisa ser uma constante conhecida em compilação.', correct: true },
          { id: 'b', text: 'Porque métodos não podem devolver `int`.' },
          { id: 'c', text: 'Porque o método pode lançar exceção.' },
          { id: 'd', text: 'Pode: essa forma é válida.' },
        ],
        explanation:
          'O valor é gravado no local da chamada durante a compilação. Uma chamada de método só teria resultado em execução, quando já é tarde.',
      },
      {
        id: 's04c02l02q3',
        type: 'single',
        prompt: 'Qual é a vantagem de parâmetros opcionais sobre sobrecargas?',
        options: [
          { id: 'a', text: 'Uma implementação só, em vez de várias que se repassam.', correct: true },
          { id: 'b', text: 'Execução mais rápida.' },
          { id: 'c', text: 'Permitem tipos de retorno diferentes.' },
          { id: 'd', text: 'Funcionam com qualquer ordem de argumentos.' },
        ],
        explanation:
          'Três sobrecargas para o mesmo comportamento significam três lugares para corrigir um bug. Com padrões, existe um método só.',
      },
    ],
    challenge: {
      brief:
        'Escreva `Formatar`, que completa um texto até uma largura mínima com um caractere de preenchimento. A largura padrão é 10 e o preenchimento padrão é o ponto. Leia `q` chamadas com quantidades diferentes de argumentos.',
      requirements: [
        '`Formatar` recebe uma `string` obrigatória, um `int` opcional com padrão `10` e um `char` opcional com padrão `.`',
        'O texto é completado à **direita** até atingir a largura',
        'Um texto que já é maior ou igual à largura é devolvido sem alteração',
        'Cada chamada começa com o modo: `1` passa só o texto, `2` passa texto e largura, `3` passa os três',
        'A última linha é `Chamadas: q`',
        'Não mude a assinatura de `Formatar`',
      ],
      starterCode: `using System;

class Program
{
    static string Formatar(string texto, int largura = 10, char preenchimento = '.')
    {
        // Complete o texto ate a largura minima
        return texto;
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());

        for (int i = 0; i < q; i++)
        {
            int modo = int.Parse(Console.ReadLine());
            string texto = Console.ReadLine();

            // Chame Formatar com 1, 2 ou 3 argumentos conforme o modo
        }

        Console.WriteLine($"Chamadas: {q}");
    }
}
`,
      solution: `using System;

class Program
{
    static string Formatar(string texto, int largura = 10, char preenchimento = '.')
    {
        string resultado = texto;

        while (resultado.Length < largura)
        {
            resultado += preenchimento;
        }

        return resultado;
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());

        for (int i = 0; i < q; i++)
        {
            int modo = int.Parse(Console.ReadLine());
            string texto = Console.ReadLine();

            if (modo == 1)
            {
                Console.WriteLine(Formatar(texto));
            }
            else if (modo == 2)
            {
                int largura = int.Parse(Console.ReadLine());
                Console.WriteLine(Formatar(texto, largura));
            }
            else
            {
                int largura = int.Parse(Console.ReadLine());
                char preenchimento = Console.ReadLine()[0];
                Console.WriteLine(Formatar(texto, largura, preenchimento));
            }
        }

        Console.WriteLine($"Chamadas: {q}");
    }
}
`,
      hints: [
        'O `while (resultado.Length < largura)` já trata sozinho o caso do texto que não precisa de preenchimento.',
        'O modo determina quantas linhas extras a chamada consome da entrada.',
      ],
      tests: [
        {
          name: 'Os três modos de chamada',
          stdin: '3\n1\nabc\n2\nabc\n5\n3\nabc\n5\n-\n',
          expectedStdout: 'abc.......\nabc..\nabc--\nChamadas: 3',
        },
        {
          name: 'Texto maior que a largura fica intacto',
          stdin: '1\n2\nabcdefghijkl\n5\n',
          expectedStdout: 'abcdefghijkl\nChamadas: 1',
        },
        {
          name: 'Texto de um caractere com os padrões',
          stdin: '1\n1\nx\n',
          expectedStdout: 'x.........\nChamadas: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c02l03',
    title: 'Argumentos nomeados',
    objective: 'Passar argumentos pelo nome do parâmetro, para pular opcionais e tornar a chamada autoexplicativa.',
    concept: [
      {
        kind: 'text',
        body:
          'Argumentos nomeados resolvem dois problemas de uma vez: eles deixam claro o que cada valor significa, e permitem **pular** parâmetros opcionais do meio.',
      },
      {
        kind: 'code',
        code: `static string Enfeitar(
    string texto,
    char borda = '*',
    int repeticoes = 3,
    bool maiusculas = false)

Enfeitar("abc");                            // ***abc***
Enfeitar("abc", borda: '#');                // ###abc###
Enfeitar("abc", maiusculas: true);          // ***ABC***   <- pulou dois
Enfeitar("abc", repeticoes: 1, maiusculas: true);  // *ABC*`,
        caption: 'A terceira chamada pula `borda` e `repeticoes` sem repetir os padrões.',
      },
      {
        kind: 'text',
        body:
          'Sem nomes, a única forma de definir o quarto parâmetro seria passar os três anteriores — repetindo exatamente os valores padrão, o que é ruidoso e frágil.',
      },
      {
        kind: 'compare',
        good: `Enfeitar("abc", maiusculas: true);`,
        bad: `Enfeitar("abc", '*', 3, true);`,
        goodLabel: 'Diz o que muda',
        badLabel: 'Repete os padrões',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O ganho de legibilidade é maior em chamadas com literais soltos. `Criar("relatorio", true, false, true)` é impenetrável; `Criar("relatorio", compactar: true, publico: false, versionar: true)` se lê sem consultar a assinatura.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Nomear um argumento cria uma dependência do **nome do parâmetro**. Renomear um parâmetro passa a ser uma mudança que quebra quem chama — algo que não acontecia quando tudo era posicional.',
      },
      {
        kind: 'text',
        body:
          'Argumentos posicionais e nomeados podem se misturar, desde que os posicionais venham primeiro. Na prática, o padrão é passar os obrigatórios por posição e nomear os opcionais.',
      },
    ],
    quiz: [
      {
        id: 's04c02l03q1',
        type: 'single',
        prompt: 'Qual problema os argumentos nomeados resolvem além da legibilidade?',
        options: [
          { id: 'a', text: 'Permitem pular parâmetros opcionais do meio.', correct: true },
          { id: 'b', text: 'Permitem passar argumentos de tipos diferentes.' },
          { id: 'c', text: 'Permitem omitir parâmetros obrigatórios.' },
          { id: 'd', text: 'Tornam a chamada mais rápida.' },
        ],
        explanation:
          'Sem eles, definir o último de quatro opcionais exigiria repetir os três padrões anteriores. Obrigatórios continuam obrigatórios.',
      },
      {
        id: 's04c02l03q2',
        type: 'single',
        prompt: 'Argumentos posicionais e nomeados podem ser misturados?',
        options: [
          { id: 'a', text: 'Sim, desde que os posicionais venham primeiro.', correct: true },
          { id: 'b', text: 'Não: é preciso escolher um estilo.' },
          { id: 'c', text: 'Sim, em qualquer ordem.' },
          { id: 'd', text: 'Só se todos os parâmetros forem opcionais.' },
        ],
        explanation:
          'Uma vez que você começa a nomear, os seguintes também precisam ser nomeados — o compilador perderia a referência de posição.',
      },
      {
        id: 's04c02l03q3',
        type: 'single',
        prompt: 'Qual é o custo de usar argumentos nomeados em uma biblioteca pública?',
        options: [
          { id: 'a', text: 'Renomear um parâmetro passa a quebrar quem chama.', correct: true },
          { id: 'b', text: 'A chamada fica mais lenta.' },
          { id: 'c', text: 'Os parâmetros deixam de aceitar valores padrão.' },
          { id: 'd', text: 'Nenhum custo.' },
        ],
        explanation:
          'O nome do parâmetro vira parte do contrato público. É um detalhe que só aparece quando alguém tenta renomear e descobre que não pode mais.',
      },
    ],
    challenge: {
      brief:
        'Escreva `Enfeitar`, que cerca um texto com bordas repetidas e pode convertê-lo para maiúsculas. Leia um texto e produza quatro variações, usando argumentos nomeados onde for necessário pular parâmetros.',
      requirements: [
        '`Enfeitar` recebe uma `string` obrigatória e três opcionais: `borda` com padrão `*`, `repeticoes` com padrão `3` e `maiusculas` com padrão `false`',
        'O resultado é a borda repetida, o texto, e a borda repetida de novo',
        'Linha 1: chamada só com o texto',
        'Linha 2: chamada com `borda` igual a `#`',
        'Linha 3: chamada com `maiusculas` igual a `true`, pulando os dois do meio',
        'Linha 4: chamada com `repeticoes` igual a `1` e `maiusculas` igual a `true`',
        'A última linha é `Variacoes: 4`',
        'Não mude a assinatura de `Enfeitar`',
      ],
      starterCode: `using System;

class Program
{
    static string Enfeitar(
        string texto,
        char borda = '*',
        int repeticoes = 3,
        bool maiusculas = false)
    {
        // Monte a borda, aplique maiusculas se pedido, e cerque o texto
        return texto;
    }

    static void Main()
    {
        string texto = Console.ReadLine();

        // Quatro variacoes, usando argumentos nomeados onde precisar

        Console.WriteLine("Variacoes: 4");
    }
}
`,
      solution: `using System;

class Program
{
    static string Enfeitar(
        string texto,
        char borda = '*',
        int repeticoes = 3,
        bool maiusculas = false)
    {
        string cerca = "";

        for (int i = 0; i < repeticoes; i++)
        {
            cerca += borda;
        }

        string miolo = maiusculas ? texto.ToUpper() : texto;

        return cerca + miolo + cerca;
    }

    static void Main()
    {
        string texto = Console.ReadLine();

        Console.WriteLine(Enfeitar(texto));
        Console.WriteLine(Enfeitar(texto, borda: '#'));
        Console.WriteLine(Enfeitar(texto, maiusculas: true));
        Console.WriteLine(Enfeitar(texto, repeticoes: 1, maiusculas: true));

        Console.WriteLine("Variacoes: 4");
    }
}
`,
      hints: [
        'A terceira chamada precisa de argumento nomeado: sem ele não há como pular `borda` e `repeticoes`.',
        'A cerca é montada com um laço que repete o caractere `repeticoes` vezes.',
      ],
      tests: [
        {
          name: 'Texto de três letras',
          stdin: 'abc\n',
          expectedStdout: '***abc***\n###abc###\n***ABC***\n*ABC*\nVariacoes: 4',
        },
        {
          name: 'Texto de duas letras',
          stdin: 'oi\n',
          expectedStdout: '***oi***\n###oi###\n***OI***\n*OI*\nVariacoes: 4',
        },
        {
          name: 'Texto já em maiúscula',
          stdin: 'X\n',
          expectedStdout: '***X***\n###X###\n***X***\n*X*\nVariacoes: 4',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c02l04',
    title: 'params: quantidade variável',
    objective: 'Aceitar um número indefinido de argumentos, chamando o método com zero, um ou muitos valores.',
    concept: [
      {
        kind: 'text',
        body:
          'O modificador `params` permite chamar um método com quantos argumentos você quiser. Por dentro, eles chegam como um array — mas quem chama não precisa criá-lo.',
      },
      {
        kind: 'code',
        code: `static int Somar(params int[] valores)
{
    int soma = 0;

    foreach (int v in valores)
    {
        soma += v;
    }

    return soma;
}

Somar();               // 0
Somar(1);              // 1
Somar(1, 2, 3);        // 6
Somar(meuArray);       // tambem funciona`,
        caption: 'Zero argumentos produzem um array vazio, não `null`.',
      },
      {
        kind: 'table',
        headers: ['Regra do `params`', 'Motivo'],
        rows: [
          ['tem que ser o último parâmetro', 'os seguintes não teriam como ser passados'],
          ['só pode haver um por método', 'não haveria como dividir os argumentos'],
          ['tem que ser um array', 'é assim que os valores chegam'],
        ],
      },
      {
        kind: 'code',
        code: `static string Juntar(string separador, params string[] partes)
{
    return string.Join(separador, partes);
}

Juntar("-", "a", "b", "c");   // a-b-c`,
        caption: 'Parâmetros normais podem vir antes; o `params` fica no fim.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Você já usa `params` desde a Seção 1 sem saber: é assim que `Console.WriteLine("{0} e {1}", a, b)` aceita quantos valores você passar. É também como `string.Join` recebe uma lista solta de partes.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Com zero argumentos, o array chega **vazio**, e não `null`. Um `foreach` sobre ele simplesmente não dá voltas — mas um acesso como `valores[0]` estoura os limites. A guarda é sobre `Length`, não sobre nulidade.',
      },
      {
        kind: 'text',
        body:
          'A conveniência tem um custo pequeno: cada chamada com argumentos soltos aloca um array novo. Em código chamado milhões de vezes por segundo isso aparece, e por isso algumas APIs oferecem sobrecargas fixas para 1, 2 e 3 argumentos além da versão `params`.',
      },
    ],
    quiz: [
      {
        id: 's04c02l04q1',
        type: 'single',
        prompt: 'O que chega em `valores` quando o método é chamado sem argumentos?',
        options: [
          { id: 'a', text: 'Um array vazio.', correct: true },
          { id: 'b', code: 'null' },
          { id: 'c', text: 'Um array com um elemento zero.' },
          { id: 'd', text: 'A chamada não compila.' },
        ],
        explanation:
          'O compilador cria um array de comprimento 0. Por isso um `foreach` funciona sem guarda, mas um acesso por índice não.',
      },
      {
        id: 's04c02l04q2',
        type: 'single',
        prompt: 'Onde o parâmetro `params` deve ficar?',
        options: [
          { id: 'a', text: 'Por último, e só pode haver um.', correct: true },
          { id: 'b', text: 'Por primeiro.' },
          { id: 'c', text: 'Em qualquer posição.' },
          { id: 'd', text: 'Pode haver vários, em qualquer posição.' },
        ],
        explanation:
          'Como ele absorve todos os argumentos restantes, qualquer parâmetro depois dele ficaria inalcançável. Dois `params` seriam impossíveis de separar.',
      },
      {
        id: 's04c02l04q3',
        type: 'single',
        prompt: 'Qual método que você já usa recebe `params`?',
        options: [
          { id: 'a', code: 'string.Join', correct: true },
          { id: 'b', code: 'int.Parse' },
          { id: 'c', code: 'Console.ReadLine' },
          { id: 'd', code: 'Array.Sort' },
        ],
        explanation:
          '`string.Join` aceita tanto uma coleção quanto uma lista solta de partes. `Console.WriteLine` com formato também usa `params`.',
      },
    ],
    challenge: {
      brief:
        'Escreva `Somar`, que aceita qualquer quantidade de inteiros, e `Juntar`, que combina textos com um separador. Demonstre as duas com chamadas de aridades diferentes, incluindo uma com um array lido da entrada.',
      requirements: [
        '`Somar` recebe `params int[]` e devolve a soma; sem argumentos devolve `0`',
        '`Juntar` recebe uma `string` de separador e `params string[]`',
        'Linha 1: `Somar() = 0`',
        'Linha 2: `Somar(1) = 1`',
        'Linha 3: `Somar(1, 2, 3) = 6`',
        'Linha 4: `Somar(entrada) = X`, passando o array lido da entrada',
        'Linha 5: `Juntar = a-b-c`, chamando com o separador `-` e as partes `a`, `b` e `c`',
        'Linha 6: `Valores lidos: n`',
        'Não mude as assinaturas de `Somar` nem de `Juntar`',
      ],
      starterCode: `using System;

class Program
{
    static int Somar(params int[] valores)
    {
        return 0;
    }

    static string Juntar(string separador, params string[] partes)
    {
        return "";
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] entrada = new int[n];
        for (int i = 0; i < n; i++)
        {
            entrada[i] = int.Parse(Console.ReadLine());
        }

        // Demonstre as aridades e passe o array lido
    }
}
`,
      solution: `using System;

class Program
{
    static int Somar(params int[] valores)
    {
        int soma = 0;

        foreach (int v in valores)
        {
            soma += v;
        }

        return soma;
    }

    static string Juntar(string separador, params string[] partes)
    {
        return string.Join(separador, partes);
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] entrada = new int[n];
        for (int i = 0; i < n; i++)
        {
            entrada[i] = int.Parse(Console.ReadLine());
        }

        Console.WriteLine($"Somar() = {Somar()}");
        Console.WriteLine($"Somar(1) = {Somar(1)}");
        Console.WriteLine($"Somar(1, 2, 3) = {Somar(1, 2, 3)}");
        Console.WriteLine($"Somar(entrada) = {Somar(entrada)}");
        Console.WriteLine($"Juntar = {Juntar("-", "a", "b", "c")}");
        Console.WriteLine($"Valores lidos: {n}");
    }
}
`,
      hints: [
        'Um `foreach` sobre o array de `params` já trata o caso de zero argumentos sem nenhuma guarda.',
        'Passar um array existente para um `params` funciona diretamente: `Somar(entrada)`.',
      ],
      tests: [
        {
          name: 'Quatro valores na entrada',
          stdin: '4\n2\n4\n6\n8\n',
          expectedStdout:
            'Somar() = 0\nSomar(1) = 1\nSomar(1, 2, 3) = 6\nSomar(entrada) = 20\nJuntar = a-b-c\nValores lidos: 4',
        },
        {
          name: 'Um valor na entrada',
          stdin: '1\n100\n',
          expectedStdout:
            'Somar() = 0\nSomar(1) = 1\nSomar(1, 2, 3) = 6\nSomar(entrada) = 100\nJuntar = a-b-c\nValores lidos: 1',
        },
        {
          name: 'Entrada vazia',
          stdin: '0\n',
          expectedStdout:
            'Somar() = 0\nSomar(1) = 1\nSomar(1, 2, 3) = 6\nSomar(entrada) = 0\nJuntar = a-b-c\nValores lidos: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c02l05',
    title: 'Passando por referência com ref',
    objective: 'Permitir que um método altere a variável de quem o chamou, e reconhecer quando isso vale a pena.',
    concept: [
      {
        kind: 'text',
        body:
          'Por padrão, um parâmetro de tipo por valor é uma **cópia**: alterá-lo dentro do método não afeta nada fora. O modificador `ref` muda isso — o método passa a trabalhar sobre a variável original.',
      },
      {
        kind: 'code',
        code: `static void Trocar(ref int a, ref int b)
{
    (a, b) = (b, a);
}

int x = 3, y = 7;
Trocar(ref x, ref y);      // o ref aparece nos DOIS lados

Console.WriteLine($"{x} {y}");   // 7 3`,
        caption: 'O `ref` é obrigatório tanto na declaração quanto na chamada.',
      },
      {
        kind: 'text',
        body:
          'A obrigatoriedade do `ref` na chamada é uma decisão de projeto do C#: quem lê `Trocar(ref x, ref y)` sabe imediatamente que `x` e `y` podem sair diferentes. Em linguagens que não exigem isso, a alteração é invisível no local da chamada.',
      },
      {
        kind: 'table',
        headers: ['Modificador', 'Precisa estar inicializada antes?', 'O método precisa atribuir?'],
        rows: [
          ['(nenhum)', '**sim**', 'não'],
          ['`ref`', '**sim**', 'não'],
          ['`out`', 'não', '**sim**'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um método que altera os parâmetros do chamador é mais difícil de entender e de testar. Prefira **devolver** o novo valor sempre que possível: `x = Dobrar(x)` é mais claro que `Dobrar(ref x)`.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Tipos por referência, como arrays e listas, já permitem que o método altere o **conteúdo** sem nenhum `ref`. O `ref` em um array serve para outra coisa: trocar a qual array a variável do chamador aponta.',
      },
      {
        kind: 'text',
        body:
          'Os usos legítimos de `ref` são poucos e específicos: trocar valores, atualizar contadores em laços muito quentes, e algumas APIs de baixo nível. Fora disso, o retorno de valor ou uma tupla resolvem melhor.',
      },
    ],
    quiz: [
      {
        id: 's04c02l05q1',
        type: 'single',
        prompt: 'Onde a palavra `ref` precisa aparecer?',
        options: [
          { id: 'a', text: 'Na declaração do parâmetro e na chamada.', correct: true },
          { id: 'b', text: 'Só na declaração.' },
          { id: 'c', text: 'Só na chamada.' },
          { id: 'd', text: 'Na declaração da variável original.' },
        ],
        explanation:
          'Exigir `ref` na chamada torna visível, no local, que a variável pode ser alterada. É uma escolha deliberada de legibilidade.',
      },
      {
        id: 's04c02l05q2',
        type: 'single',
        prompt: 'Por que preferir devolver um valor a usar `ref`?',
        options: [
          { id: 'a', text: 'Porque um método que só devolve é mais fácil de entender e testar.', correct: true },
          { id: 'b', text: 'Porque `ref` é mais lento.' },
          { id: 'c', text: 'Porque `ref` não funciona com `int`.' },
          { id: 'd', text: 'Porque `ref` exige que o método seja `void`.' },
        ],
        explanation:
          'Efeitos colaterais em variáveis de quem chamou obrigam a rastrear o estado de fora do método. Um retorno concentra tudo no valor devolvido.',
      },
      {
        id: 's04c02l05q3',
        type: 'single',
        prompt: 'Um método recebe um `int[]` sem `ref` e altera `array[0]`. O chamador vê a mudança?',
        options: [
          { id: 'a', text: 'Sim: arrays são tipos por referência, e o conteúdo é compartilhado.', correct: true },
          { id: 'b', text: 'Não: sem `ref` nada escapa do método.' },
          { id: 'c', text: 'Só se o array tiver um elemento.' },
          { id: 'd', text: 'Só se o método for `void`.' },
        ],
        explanation:
          'É a semântica de referência da Seção 3. O `ref` seria necessário apenas para fazer a variável do chamador apontar para **outro** array.',
      },
    ],
    challenge: {
      brief:
        'Escreva `Trocar`, que inverte o conteúdo de duas variáveis, e `Incrementar`, que soma um valor a uma variável do chamador. Leia dois inteiros e mostre o efeito de cada operação.',
      requirements: [
        '`Trocar` recebe dois `int` por `ref` e não devolve nada',
        '`Incrementar` recebe um `int` por `ref` e um `int` normal com o quanto somar',
        'Linha 1: `Antes: 3 7`',
        'Linha 2: `Depois da troca: 7 3`',
        'Linha 3: `Depois do incremento: 12 8`, com 5 somado a cada variável',
        'As duas variáveis do `Main` precisam refletir as alterações',
        'Não mude as assinaturas de `Trocar` nem de `Incrementar`',
      ],
      starterCode: `using System;

class Program
{
    static void Trocar(ref int a, ref int b)
    {
        // Inverta o conteudo das duas
    }

    static void Incrementar(ref int valor, int quanto)
    {
        // Some quanto ao valor do chamador
    }

    static void Main()
    {
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());

        Console.WriteLine($"Antes: {a} {b}");

        // Troque, mostre, incremente os dois em 5, mostre
    }
}
`,
      solution: `using System;

class Program
{
    static void Trocar(ref int a, ref int b)
    {
        (a, b) = (b, a);
    }

    static void Incrementar(ref int valor, int quanto)
    {
        valor += quanto;
    }

    static void Main()
    {
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());

        Console.WriteLine($"Antes: {a} {b}");

        Trocar(ref a, ref b);
        Console.WriteLine($"Depois da troca: {a} {b}");

        Incrementar(ref a, 5);
        Incrementar(ref b, 5);
        Console.WriteLine($"Depois do incremento: {a} {b}");
    }
}
`,
      hints: [
        'A troca por tupla da Seção 3 funciona igual aqui: `(a, b) = (b, a);`.',
        'O `ref` precisa aparecer também na chamada: `Trocar(ref a, ref b);`.',
      ],
      tests: [
        {
          name: 'Dois valores diferentes',
          stdin: '3\n7\n',
          expectedStdout: 'Antes: 3 7\nDepois da troca: 7 3\nDepois do incremento: 12 8',
        },
        {
          name: 'Valores iguais',
          stdin: '0\n0\n',
          expectedStdout: 'Antes: 0 0\nDepois da troca: 0 0\nDepois do incremento: 5 5',
        },
        {
          name: 'Valores negativos',
          stdin: '-1\n1\n',
          expectedStdout: 'Antes: -1 1\nDepois da troca: 1 -1\nDepois do incremento: 6 4',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c02l06',
    title: 'Devolvendo com out',
    objective: 'Usar `out` para produzir valores adicionais, reconhecendo o padrão `Try` que você já usa desde a Seção 1.',
    concept: [
      {
        kind: 'text',
        body:
          'O modificador `out` também dá ao método acesso à variável do chamador, mas com um contrato diferente do `ref`: a variável **não precisa** estar inicializada antes, e o método **é obrigado** a atribuir um valor a ela.',
      },
      {
        kind: 'code',
        code: `static bool TentarDividir(int a, int b, out int quociente, out int resto)
{
    if (b == 0)
    {
        quociente = 0;    // obrigatorio: todo caminho atribui
        resto = 0;
        return false;
    }

    quociente = a / b;
    resto = a % b;
    return true;
}`,
        caption: 'Mesmo no caminho de falha, os dois `out` precisam receber algum valor.',
      },
      {
        kind: 'text',
        body:
          'Esse é exatamente o formato do `int.TryParse` que você usa desde a Seção 1: um `bool` diz se deu certo, e o resultado sai pelo `out`. Agora você sabe escrever os seus.',
      },
      {
        kind: 'code',
        code: `if (TentarDividir(17, 5, out int q, out int r))
{
    Console.WriteLine($"{q} resto {r}");   // 3 resto 2
}`,
        caption: 'A variável pode ser declarada na própria chamada, como no `TryParse`.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Se algum caminho do método não atribuir um `out`, o código não compila. É uma garantia forte: quem chama sabe que a variável sempre sai preenchida, mesmo que com um valor padrão sem significado.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A regra de ouro do padrão `Try`: **nunca use o valor do `out` sem antes checar o `bool`**. Na falha ele recebe um valor de preenchimento — zero, normalmente — que não significa nada e é fácil de confundir com um resultado legítimo.',
      },
      {
        kind: 'text',
        body:
          'Hoje, para devolver vários valores, a tupla costuma ser a escolha melhor — é a próxima lição. O `out` continua sendo o formato certo quando existe um **par sucesso/valor**, porque ele encaixa naturalmente dentro de um `if`.',
      },
    ],
    quiz: [
      {
        id: 's04c02l06q1',
        type: 'single',
        prompt: 'Qual é a diferença de contrato entre `ref` e `out`?',
        options: [
          { id: 'a', text: '`ref` exige variável inicializada antes; `out` exige que o método atribua.', correct: true },
          { id: 'b', text: '`out` é mais rápido que `ref`.' },
          { id: 'c', text: '`ref` só funciona com tipos por valor.' },
          { id: 'd', text: 'Não há diferença prática.' },
        ],
        explanation:
          'O `ref` é para valores que entram **e** saem; o `out` é só de saída, então o que havia antes é irrelevante e o preenchimento é obrigatório.',
      },
      {
        id: 's04c02l06q2',
        type: 'single',
        prompt: 'O que acontece se um caminho do método não atribuir um parâmetro `out`?',
        options: [
          { id: 'a', text: 'Erro de compilação.', correct: true },
          { id: 'b', text: 'O parâmetro recebe zero automaticamente.' },
          { id: 'c', text: 'O parâmetro fica com o valor anterior.' },
          { id: 'd', text: 'Exceção em tempo de execução.' },
        ],
        explanation:
          'O compilador verifica todos os caminhos. É essa checagem que permite a quem chama confiar que a variável sempre sai preenchida.',
      },
      {
        id: 's04c02l06q3',
        type: 'single',
        prompt: 'Por que nunca usar o valor do `out` sem checar o `bool` devolvido?',
        options: [
          { id: 'a', text: 'Porque na falha ele recebe um valor de preenchimento sem significado.', correct: true },
          { id: 'b', text: 'Porque ele pode estar não inicializado.' },
          { id: 'c', text: 'Porque o compilador impede.' },
          { id: 'd', text: 'Porque ele sempre vale `null`.' },
        ],
        explanation:
          'É a mesma armadilha do `int.TryParse("abc", out int n)`: `n` fica `0`, que é indistinguível de uma conversão bem-sucedida do texto `"0"`.',
      },
    ],
    challenge: {
      brief:
        'Escreva `TentarDividir`, no padrão `Try`: ela devolve `false` quando o divisor é zero, e `true` com o quociente e o resto pelos parâmetros `out`. Leia `q` divisões e processe cada uma.',
      requirements: [
        '`TentarDividir` recebe dois `int` e dois `out int`, e devolve um `bool`',
        'Divisão bem-sucedida imprime `17 / 5 = 3 resto 2`',
        'Divisor zero imprime `17 / 0 = indefinido`',
        'Todo caminho do método precisa atribuir os dois `out`',
        'Depois: `Sucessos: s` e `Falhas: f`',
        'Não mude a assinatura de `TentarDividir`',
        'O programa não pode encerrar com exceção',
      ],
      starterCode: `using System;

class Program
{
    static bool TentarDividir(int a, int b, out int quociente, out int resto)
    {
        // Todo caminho precisa atribuir quociente e resto
        quociente = 0;
        resto = 0;
        return false;
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int sucessos = 0;
        int falhas = 0;

        for (int i = 0; i < q; i++)
        {
            int a = int.Parse(Console.ReadLine());
            int b = int.Parse(Console.ReadLine());

            // Chame e trate os dois casos
        }

        Console.WriteLine($"Sucessos: {sucessos}");
        Console.WriteLine($"Falhas: {falhas}");
    }
}
`,
      solution: `using System;

class Program
{
    static bool TentarDividir(int a, int b, out int quociente, out int resto)
    {
        if (b == 0)
        {
            quociente = 0;
            resto = 0;
            return false;
        }

        quociente = a / b;
        resto = a % b;
        return true;
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int sucessos = 0;
        int falhas = 0;

        for (int i = 0; i < q; i++)
        {
            int a = int.Parse(Console.ReadLine());
            int b = int.Parse(Console.ReadLine());

            if (TentarDividir(a, b, out int quociente, out int resto))
            {
                Console.WriteLine($"{a} / {b} = {quociente} resto {resto}");
                sucessos++;
            }
            else
            {
                Console.WriteLine($"{a} / {b} = indefinido");
                falhas++;
            }
        }

        Console.WriteLine($"Sucessos: {sucessos}");
        Console.WriteLine($"Falhas: {falhas}");
    }
}
`,
      hints: [
        'O ramo do divisor zero precisa atribuir os dois `out` antes do `return false`, senão não compila.',
        'Na chamada, declare as variáveis inline: `out int quociente, out int resto`.',
      ],
      tests: [
        {
          name: 'Divisão exata e com resto',
          stdin: '3\n17\n5\n10\n2\n7\n0\n',
          expectedStdout:
            '17 / 5 = 3 resto 2\n10 / 2 = 5 resto 0\n7 / 0 = indefinido\nSucessos: 2\nFalhas: 1',
        },
        {
          name: 'Todas indefinidas',
          stdin: '2\n1\n0\n5\n0\n',
          expectedStdout:
            '1 / 0 = indefinido\n5 / 0 = indefinido\nSucessos: 0\nFalhas: 2',
        },
        {
          name: 'Dividendo negativo',
          stdin: '1\n-7\n2\n',
          expectedStdout: '-7 / 2 = -3 resto -1\nSucessos: 1\nFalhas: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c02l07',
    title: 'in: leitura sem cópia',
    objective: 'Passar valores grandes sem copiá-los, garantindo ao mesmo tempo que o método não os altere.',
    concept: [
      {
        kind: 'text',
        body:
          'O modificador `in` é o terceiro da família: ele passa por referência, como `ref`, mas **proíbe** a alteração. É "leia o original, não copie, não mexa".',
      },
      {
        kind: 'table',
        headers: ['Modificador', 'Direção', 'Pode alterar?'],
        rows: [
          ['(nenhum)', 'entrada, por cópia', 'só a cópia'],
          ['`in`', 'entrada, por referência', '**não**'],
          ['`ref`', 'entrada e saída', 'sim'],
          ['`out`', 'saída', 'obrigatório'],
        ],
      },
      {
        kind: 'code',
        code: `static int SomaComponentes(in (int A, int B, int C, int D) ponto)
{
    // ponto.A = 5;   <- nao compila: 'in' e somente leitura
    return ponto.A + ponto.B + ponto.C + ponto.D;
}`,
        caption: 'A tupla de quatro campos é lida diretamente, sem ser duplicada.',
      },
      {
        kind: 'text',
        body:
          'O ganho só existe para **tipos por valor grandes**: tuplas com muitos campos, ou estruturas próprias. Para um `int`, copiar quatro bytes é mais barato que o trabalho extra de passar uma referência — usar `in` ali só atrapalha.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Diferente de `ref` e `out`, o `in` é **opcional na chamada**. Você pode escrever `SomaComponentes(ponto)` sem palavra nenhuma, e é assim que quase todo código real aparece.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Para tipos por referência — arrays, listas, `string` — o `in` não traz vantagem: eles já são passados por referência. E ele não protege o conteúdo: um `in List<int>` continua permitindo `lista.Add(...)`, porque o que é somente leitura é a variável, não o objeto.',
      },
      {
        kind: 'text',
        body:
          'Na prática, `in` é uma otimização de nicho, comum em código de jogos e de cálculo numérico. Conhecê-lo é útil principalmente para **ler** código que o usa e entender que aquilo é uma promessa de não alteração.',
      },
    ],
    quiz: [
      {
        id: 's04c02l07q1',
        type: 'single',
        prompt: 'O que `in` garante?',
        options: [
          { id: 'a', text: 'Que o método não vai alterar o parâmetro, e que ele não será copiado.', correct: true },
          { id: 'b', text: 'Que o parâmetro é opcional.' },
          { id: 'c', text: 'Que o método vai atribuir um valor a ele.' },
          { id: 'd', text: 'Que o parâmetro pode ser `null`.' },
        ],
        explanation:
          'São as duas promessas juntas: acesso direto ao original, sem permissão de escrita. Qualquer tentativa de atribuição é erro de compilação.',
      },
      {
        id: 's04c02l07q2',
        type: 'single',
        prompt: 'Quando `in` traz ganho real de desempenho?',
        options: [
          { id: 'a', text: 'Com tipos por valor grandes, como tuplas de muitos campos.', correct: true },
          { id: 'b', text: 'Com `int` e `bool`.' },
          { id: 'c', text: 'Com arrays e listas.' },
          { id: 'd', text: 'Sempre.' },
        ],
        explanation:
          'Tipos pequenos são mais baratos de copiar do que de referenciar. Tipos por referência já não são copiados, então não há o que economizar.',
      },
      {
        id: 's04c02l07q3',
        type: 'single',
        prompt: 'Um método recebe `in List<int> lista`. Ele pode chamar `lista.Add(5)`?',
        options: [
          { id: 'a', text: 'Sim: o `in` protege a variável, não o objeto apontado.', correct: true },
          { id: 'b', text: 'Não: `in` torna tudo somente leitura.' },
          { id: 'c', text: 'Só se a lista estiver vazia.' },
          { id: 'd', text: 'Não compila usar `in` com `List`.' },
        ],
        explanation:
          'O que fica proibido é reatribuir a variável para outra lista. O conteúdo do objeto continua modificável — uma distinção que confunde bastante.',
      },
    ],
    challenge: {
      brief:
        'Escreva três métodos que recebem uma tupla de quatro campos com `in`: `SomaComponentes`, `MaiorComponente` e `Descrever`. Leia `q` tuplas e produza o relatório de cada uma.',
      requirements: [
        'Os três métodos recebem `in (int A, int B, int C, int D)`',
        '`SomaComponentes` e `MaiorComponente` devolvem `int`; `Descrever` devolve `string`',
        '`Descrever` devolve o formato `(1, 2, 3, 4)`',
        'Uma linha por tupla, no formato `(1, 2, 3, 4) -> soma 10, maior 4`',
        'Cada tupla ocupa quatro linhas da entrada',
        'A última linha é `Tuplas: q`',
        'Não mude as assinaturas dos três métodos',
      ],
      starterCode: `using System;

class Program
{
    static int SomaComponentes(in (int A, int B, int C, int D) t)
    {
        return 0;
    }

    static int MaiorComponente(in (int A, int B, int C, int D) t)
    {
        return 0;
    }

    static string Descrever(in (int A, int B, int C, int D) t)
    {
        return "";
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());

        for (int i = 0; i < q; i++)
        {
            int a = int.Parse(Console.ReadLine());
            int b = int.Parse(Console.ReadLine());
            int c = int.Parse(Console.ReadLine());
            int d = int.Parse(Console.ReadLine());

            var t = (a, b, c, d);

            // Monte a linha do relatorio
        }

        Console.WriteLine($"Tuplas: {q}");
    }
}
`,
      solution: `using System;

class Program
{
    static int SomaComponentes(in (int A, int B, int C, int D) t)
    {
        return t.A + t.B + t.C + t.D;
    }

    static int MaiorComponente(in (int A, int B, int C, int D) t)
    {
        int maior = t.A;

        if (t.B > maior) maior = t.B;
        if (t.C > maior) maior = t.C;
        if (t.D > maior) maior = t.D;

        return maior;
    }

    static string Descrever(in (int A, int B, int C, int D) t)
    {
        return $"({t.A}, {t.B}, {t.C}, {t.D})";
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());

        for (int i = 0; i < q; i++)
        {
            int a = int.Parse(Console.ReadLine());
            int b = int.Parse(Console.ReadLine());
            int c = int.Parse(Console.ReadLine());
            int d = int.Parse(Console.ReadLine());

            var t = (a, b, c, d);

            Console.WriteLine(
                $"{Descrever(t)} -> soma {SomaComponentes(t)}, maior {MaiorComponente(t)}");
        }

        Console.WriteLine($"Tuplas: {q}");
    }
}
`,
      hints: [
        'Na chamada, o `in` é opcional: `SomaComponentes(t)` funciona normalmente.',
        'O maior componente começa em `t.A` e é comparado com os outros três — nunca comece em zero, porque os valores podem ser negativos.',
      ],
      tests: [
        {
          name: 'Duas tuplas',
          stdin: '2\n1\n2\n3\n4\n10\n5\n8\n2\n',
          expectedStdout:
            '(1, 2, 3, 4) -> soma 10, maior 4\n(10, 5, 8, 2) -> soma 25, maior 10\nTuplas: 2',
        },
        {
          name: 'Todos negativos',
          stdin: '1\n-1\n-9\n-3\n-5\n',
          expectedStdout: '(-1, -9, -3, -5) -> soma -18, maior -1\nTuplas: 1',
        },
        {
          name: 'Todos iguais',
          stdin: '1\n7\n7\n7\n7\n',
          expectedStdout: '(7, 7, 7, 7) -> soma 28, maior 7\nTuplas: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c02l08',
    title: 'Retornando tuplas',
    objective: 'Devolver vários valores relacionados de uma vez, a alternativa moderna aos parâmetros `out`.',
    concept: [
      {
        kind: 'text',
        body:
          'A Seção 3 mostrou tuplas como forma de agrupar valores. Aqui elas encontram o seu uso mais natural: um método que produz **vários resultados relacionados** devolve todos de uma vez.',
      },
      {
        kind: 'code',
        code: `static (int Min, int Max, double Media) Analisar(int[] valores)
{
    int min = int.MaxValue;
    int max = int.MinValue;
    int soma = 0;

    foreach (int v in valores)
    {
        if (v < min) min = v;
        if (v > max) max = v;
        soma += v;
    }

    return (min, max, (double)soma / valores.Length);
}

var (menor, maior, media) = Analisar(dados);`,
        caption: 'Três resultados de uma análise, devolvidos e desconstruídos em duas linhas.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Com tupla',
          code: `static (int Min, int Max) Extremos(int[] v)

var (mn, mx) = Extremos(dados);`,
        },
        right: {
          label: 'Com out',
          code: `static void Extremos(
    int[] v, out int min, out int max)

Extremos(dados, out int mn, out int mx);`,
        },
        note: 'A tupla nomeia os resultados no tipo de retorno; o `out` os espalha pela lista de parâmetros.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A regra prática para escolher: se os valores são **um resultado composto**, use tupla. Se um deles é um indicador de sucesso que governa os outros, o padrão `Try` com `out` encaixa melhor, porque cabe dentro de um `if`.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Nomeie os elementos no tipo de retorno. Uma assinatura `(int, int, double)` obriga quem chama a adivinhar a ordem; `(int Min, int Max, double Media)` documenta e habilita o acesso por nome.',
      },
      {
        kind: 'text',
        body:
          'Como toda tupla, o retorno pode ser desconstruído em variáveis separadas ou guardado inteiro em uma só. As duas formas são úteis: desconstrua quando for usar tudo, guarde inteiro quando for repassar adiante.',
      },
    ],
    quiz: [
      {
        id: 's04c02l08q1',
        type: 'single',
        prompt: 'Quando preferir tupla a parâmetros `out`?',
        options: [
          { id: 'a', text: 'Quando os valores formam um resultado composto, sem indicador de sucesso.', correct: true },
          { id: 'b', text: 'Sempre: `out` está obsoleto.' },
          { id: 'c', text: 'Quando há mais de cinco valores.' },
          { id: 'd', text: 'Quando os tipos são iguais.' },
        ],
        explanation:
          'O padrão `Try` continua sendo a melhor forma quando existe um `bool` que decide se os outros valores fazem sentido — ele encaixa direto em um `if`.',
      },
      {
        id: 's04c02l08q2',
        type: 'single',
        prompt: 'Por que nomear os elementos no tipo de retorno?',
        options: [
          { id: 'a', text: 'Para documentar a ordem e permitir acesso por nome.', correct: true },
          { id: 'b', text: 'Porque sem nomes não compila.' },
          { id: 'c', text: 'Para melhorar o desempenho.' },
          { id: 'd', text: 'Para permitir a desconstrução.' },
        ],
        explanation:
          'A desconstrução funciona sem nomes, já que é posicional. O que se ganha é legibilidade: `resultado.Media` diz muito mais que `resultado.Item3`.',
      },
      {
        id: 's04c02l08q3',
        type: 'single',
        prompt: 'O que `var (a, b) = Metodo();` faz?',
        options: [
          { id: 'a', text: 'Desconstrói a tupla devolvida em duas variáveis novas.', correct: true },
          { id: 'b', text: 'Guarda a tupla inteira em `a` e ignora `b`.' },
          { id: 'c', text: 'Chama o método duas vezes.' },
          { id: 'd', text: 'Não compila.' },
        ],
        explanation:
          'É a desconstrução da Seção 3 aplicada a um retorno. A associação é por posição, então a ordem das variáveis tem que casar com a da tupla.',
      },
    ],
    challenge: {
      brief:
        'Escreva `Analisar`, que recebe um array de inteiros e devolve mínimo, máximo e média em uma tupla nomeada. Leia `n` valores, chame o método uma vez, e produza o relatório desconstruindo o resultado.',
      requirements: [
        '`Analisar` recebe um `int[]` e devolve `(int Min, int Max, double Media)`',
        'Linha 1: `Minimo: X`',
        'Linha 2: `Maximo: Y`',
        'Linha 3: `Media: Z`, com duas casas decimais',
        'Linha 4: `Amplitude: A`, calculada no `Main` a partir do que foi devolvido',
        'A entrada sempre tem pelo menos um valor',
        'Valores negativos são válidos, e a série pode ser inteiramente negativa',
        'Não mude a assinatura de `Analisar`',
      ],
      starterCode: `using System;

class Program
{
    static (int Min, int Max, double Media) Analisar(int[] valores)
    {
        // Percorra uma vez e devolva os tres resultados
        return (0, 0, 0.0);
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] valores = new int[n];
        for (int i = 0; i < n; i++)
        {
            valores[i] = int.Parse(Console.ReadLine());
        }

        // Chame, desconstrua e monte o relatorio
    }
}
`,
      solution: `using System;

class Program
{
    static (int Min, int Max, double Media) Analisar(int[] valores)
    {
        int min = int.MaxValue;
        int max = int.MinValue;
        int soma = 0;

        foreach (int v in valores)
        {
            if (v < min) min = v;
            if (v > max) max = v;
            soma += v;
        }

        return (min, max, (double)soma / valores.Length);
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] valores = new int[n];
        for (int i = 0; i < n; i++)
        {
            valores[i] = int.Parse(Console.ReadLine());
        }

        var (menor, maior, media) = Analisar(valores);

        Console.WriteLine($"Minimo: {menor}");
        Console.WriteLine($"Maximo: {maior}");
        Console.WriteLine($"Media: {media:F2}");
        Console.WriteLine($"Amplitude: {maior - menor}");
    }
}
`,
      hints: [
        'O `return` monta a tupla com parênteses: `return (min, max, (double)soma / valores.Length);`.',
        'A amplitude não precisa vir do método: ela é a diferença entre dois valores que ele já devolveu.',
      ],
      tests: [
        {
          name: 'Série variada',
          stdin: '6\n12\n7\n25\n3\n18\n9\n',
          expectedStdout: 'Minimo: 3\nMaximo: 25\nMedia: 12.33\nAmplitude: 22',
        },
        {
          name: 'Todos iguais',
          stdin: '3\n5\n5\n5\n',
          expectedStdout: 'Minimo: 5\nMaximo: 5\nMedia: 5.00\nAmplitude: 0',
        },
        {
          name: 'Série inteiramente negativa',
          stdin: '4\n-1\n-9\n-3\n-5\n',
          expectedStdout: 'Minimo: -9\nMaximo: -1\nMedia: -4.50\nAmplitude: 8',
        },
        {
          name: 'Um valor só',
          stdin: '1\n7\n',
          expectedStdout: 'Minimo: 7\nMaximo: 7\nMedia: 7.00\nAmplitude: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c02l09',
    title: 'Prática: parser flexível',
    objective: 'Construir uma API de conversão que combina `out`, opcionais e nomeados em um conjunto coerente.',
    concept: [
      {
        kind: 'text',
        body:
          'Este exercício monta um pequeno parser com três formas de uso, cada uma servindo a uma necessidade diferente — a mesma estratégia que o próprio .NET usa em `int.Parse` e `int.TryParse`.',
      },
      {
        kind: 'table',
        headers: ['Método', 'Formato', 'Quando usar'],
        rows: [
          ['`TentarLerInt`', '`out` + `bool`', 'a entrada pode ser inválida'],
          ['`LerIntOu`', 'valor padrão', 'há um fallback razoável'],
          ['`LerFaixa`', 'padrão + limites', 'o valor precisa caber em uma faixa'],
        ],
      },
      {
        kind: 'code',
        code: `static bool TentarLerInt(string texto, out int valor)
{
    return int.TryParse(texto, out valor);
}

static int LerIntOu(string texto, int padrao = 0)
{
    return TentarLerInt(texto, out int v) ? v : padrao;
}`,
        caption: 'O segundo método é construído sobre o primeiro — a composição do capítulo anterior.',
      },
      {
        kind: 'text',
        body:
          'Repare que `LerIntOu` **repassa direto** o parâmetro `out` para o `int.TryParse`. Isso funciona porque o contrato é o mesmo: preencher em todo caminho.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O `LerFaixa` combina duas ideias já vistas: ele converte com fallback e depois limita com um `Clamp`. Nenhuma linha nova de lógica — só composição de peças que já existiam.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um texto inválido e um texto que representa um valor fora da faixa são situações **diferentes**. Aqui as duas terminam no mesmo lugar por decisão de projeto, e essa decisão precisa estar documentada — senão quem usa não sabe o que significa receber o padrão.',
      },
      {
        kind: 'text',
        body:
          'Uma API bem desenhada oferece o formato certo para cada necessidade, sem obrigar o usuário a escrever o mesmo tratamento toda vez. É por isso que `int` tem `Parse`, `TryParse` e várias sobrecargas.',
      },
    ],
    quiz: [
      {
        id: 's04c02l09q1',
        type: 'single',
        prompt: 'Por que `LerIntOu` pode ser construído sobre `TentarLerInt`?',
        options: [
          { id: 'a', text: 'Porque ele só precisa decidir o que fazer quando a conversão falha.', correct: true },
          { id: 'b', text: 'Porque os dois têm o mesmo nome.' },
          { id: 'c', text: 'Porque `out` só funciona em cadeia.' },
          { id: 'd', text: 'Não pode: cada um precisa converter por conta própria.' },
        ],
        explanation:
          'A conversão já está resolvida; o que muda é a política de falha. Reaproveitar evita duas implementações que podem divergir.',
      },
      {
        id: 's04c02l09q2',
        type: 'single',
        prompt: 'O que `LerFaixa("999", 0, 1, 10)` deve devolver?',
        options: [
          { id: 'a', code: '10', correct: true },
          { id: 'b', code: '999' },
          { id: 'c', code: '0' },
          { id: 'd', code: '1' },
        ],
        explanation:
          'A conversão funciona e produz 999, que é então limitado ao máximo da faixa. O padrão só entraria em cena se o texto não convertesse.',
      },
      {
        id: 's04c02l09q3',
        type: 'single',
        prompt: 'Por que documentar que texto inválido e valor fora da faixa têm o mesmo destino?',
        options: [
          { id: 'a', text: 'Porque são situações diferentes, e quem usa precisa saber que não consegue distingui-las.', correct: true },
          { id: 'b', text: 'Porque o compilador exige.' },
          { id: 'c', text: 'Porque uma delas lança exceção.' },
          { id: 'd', text: 'Não é preciso documentar.' },
        ],
        explanation:
          'Quem receber o valor padrão não vai saber se a entrada era lixo ou apenas grande demais. Se essa distinção importar, a API precisa de outro formato.',
      },
    ],
    challenge: {
      brief:
        'Monte um parser com três métodos: `TentarLerInt` no padrão `Try`, `LerIntOu` com valor padrão, e `LerFaixa` com padrão e limites. Leia `q` entradas de texto e processe cada uma com os três.',
      requirements: [
        '`TentarLerInt` recebe uma `string` e um `out int`, e devolve `bool`',
        '`LerIntOu` recebe uma `string` e um `int` opcional com padrão `0`',
        '`LerFaixa` recebe uma `string`, um `int` opcional com padrão `0`, e dois `int` opcionais com padrões `0` e `100`',
        'Uma linha por entrada, no formato `abc -> valido False, ou -1, faixa 1`',
        'A chamada de `LerIntOu` usa o padrão `-1`; a de `LerFaixa` usa padrão `-1` e faixa de `1` a `10`',
        'Use argumentos nomeados onde precisar pular parâmetros',
        'A última linha é `Validos: k`',
        'Não mude as assinaturas dos três métodos',
      ],
      starterCode: `using System;

class Program
{
    static bool TentarLerInt(string texto, out int valor)
    {
        valor = 0;
        return false;
    }

    static int LerIntOu(string texto, int padrao = 0)
    {
        return padrao;
    }

    static int LerFaixa(string texto, int padrao = 0, int min = 0, int max = 100)
    {
        // Converta com fallback e limite a faixa
        return padrao;
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int validos = 0;

        for (int i = 0; i < q; i++)
        {
            string texto = Console.ReadLine();

            // Aplique os tres metodos e monte a linha
        }

        Console.WriteLine($"Validos: {validos}");
    }
}
`,
      solution: `using System;

class Program
{
    static bool TentarLerInt(string texto, out int valor)
    {
        return int.TryParse(texto, out valor);
    }

    static int LerIntOu(string texto, int padrao = 0)
    {
        return TentarLerInt(texto, out int v) ? v : padrao;
    }

    static int LerFaixa(string texto, int padrao = 0, int min = 0, int max = 100)
    {
        int valor = LerIntOu(texto, padrao);

        if (valor < min) return min;
        if (valor > max) return max;

        return valor;
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int validos = 0;

        for (int i = 0; i < q; i++)
        {
            string texto = Console.ReadLine();

            bool valido = TentarLerInt(texto, out int _);
            int ou = LerIntOu(texto, -1);
            int faixa = LerFaixa(texto, padrao: -1, min: 1, max: 10);

            Console.WriteLine($"{texto} -> valido {valido}, ou {ou}, faixa {faixa}");

            if (valido)
            {
                validos++;
            }
        }

        Console.WriteLine($"Validos: {validos}");
    }
}
`,
      hints: [
        'O `LerFaixa` limita **depois** de converter: um texto inválido vira o padrão, e o padrão também é limitado pela faixa.',
        'Use `out int _` quando só interessa o `bool` e o valor convertido não será usado.',
      ],
      tests: [
        {
          name: 'Texto inválido, valor grande e valor na faixa',
          stdin: '3\nabc\n999\n5\n',
          expectedStdout:
            'abc -> valido False, ou -1, faixa 1\n999 -> valido True, ou 999, faixa 10\n' +
            '5 -> valido True, ou 5, faixa 5\nValidos: 2',
        },
        {
          name: 'Valor negativo é levantado ao mínimo',
          stdin: '1\n-50\n',
          expectedStdout: '-50 -> valido True, ou -50, faixa 1\nValidos: 1',
        },
        {
          name: 'Valores exatamente nos limites',
          stdin: '2\n1\n10\n',
          expectedStdout:
            '1 -> valido True, ou 1, faixa 1\n10 -> valido True, ou 10, faixa 10\nValidos: 2',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c02l10',
    title: 'Checkpoint: assinaturas',
    objective: 'Combinar sobrecarga, opcionais, nomeados, `params`, `out` e retorno de tupla em uma API coerente.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint monta uma pequena calculadora estatística usando **todas** as formas de assinatura do capítulo. Cada método foi escolhido para a forma que melhor descreve o que ele faz.',
      },
      {
        kind: 'table',
        headers: ['Método', 'Recurso', 'Por que este'],
        rows: [
          ['`Media(params)`', '`params`', 'quantidade variável de valores'],
          ['`Media(int[], int, int)`', 'sobrecarga', 'a mesma ideia sobre uma faixa'],
          ['`TentarMediana`', '`out` + `bool`', 'array vazio não tem mediana'],
          ['`Resumo`', 'tupla', 'três resultados compostos'],
          ['`Formatar`', 'opcionais', 'variações de exibição'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'As duas sobrecargas de `Media` mostram bem o critério: elas fazem a **mesma coisa conceitual** — calcular uma média — sobre entradas diferentes. É exatamente para isso que a sobrecarga existe.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A mediana de um array vazio não existe, e por isso ela usa o padrão `Try`. Devolver `0` seria mentira: zero é uma mediana perfeitamente possível para dados reais, e quem chamasse não teria como distinguir.',
      },
      {
        kind: 'text',
        body:
          'A mediana exige ordenar os dados, e ordenar destrói a ordem original. Como o array pode ser necessário depois, o método trabalha sobre uma **cópia** — o cuidado da Seção 3.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Escreva e teste um método por vez, começando pelos que não dependem de nenhum outro. `Resumo` depende de `Media`, e o `Main` depende de todos — deixá-los por último evita depurar vários erros ao mesmo tempo.',
      },
    ],
    quiz: [
      {
        id: 's04c02l10q1',
        type: 'single',
        prompt: 'Por que `TentarMediana` usa o padrão `Try` em vez de devolver a mediana direto?',
        options: [
          { id: 'a', text: 'Porque um array vazio não tem mediana, e qualquer valor devolvido seria ambíguo.', correct: true },
          { id: 'b', text: 'Porque a mediana é sempre `double`.' },
          { id: 'c', text: 'Porque ordenar pode falhar.' },
          { id: 'd', text: 'Porque `out` é mais rápido.' },
        ],
        explanation:
          'Zero é uma mediana legítima para dados que incluem zero. O `bool` separado é a única forma de distinguir "não existe" de "vale zero".',
      },
      {
        id: 's04c02l10q2',
        type: 'single',
        prompt: 'Por que as duas versões de `Media` podem compartilhar o nome?',
        options: [
          { id: 'a', text: 'Porque fazem a mesma coisa conceitual sobre entradas diferentes.', correct: true },
          { id: 'b', text: 'Porque têm o mesmo tipo de retorno.' },
          { id: 'c', text: 'Porque uma chama a outra.' },
          { id: 'd', text: 'Porque as duas usam `params`.' },
        ],
        explanation:
          'Sobrecarga é sobre a mesma operação com formas diferentes de entrada. Se uma calculasse média e a outra mediana, os nomes deveriam ser diferentes.',
      },
      {
        id: 's04c02l10q3',
        type: 'single',
        prompt: 'Por que `TentarMediana` ordena uma cópia do array?',
        options: [
          { id: 'a', text: 'Porque `Array.Sort` altera no lugar e a ordem original pode ser necessária depois.', correct: true },
          { id: 'b', text: 'Porque arrays não podem ser ordenados diretamente.' },
          { id: 'c', text: 'Por questão de desempenho.' },
          { id: 'd', text: 'Porque o parâmetro é `in`.' },
        ],
        explanation:
          'É o cuidado da Seção 3: um método que recebe uma coleção e a reordena surpreende quem chamou. Trabalhar sobre uma cópia mantém a promessa de só ler.',
      },
    ],
    challenge: {
      brief:
        'Monte uma calculadora estatística com cinco métodos usando todas as formas de assinatura do capítulo. Leia `n` valores e produza o relatório completo.',
      requirements: [
        '`Media(params int[])` devolve `double`; com zero valores devolve `0.0`',
        '`Media(int[], int, int)` é uma sobrecarga que calcula a média de uma faixa de índices, do início ao fim inclusive',
        '`TentarMediana(int[], out double)` devolve `bool`, sendo `false` para array vazio',
        '`Resumo(int[])` devolve `(int Min, int Max, double Media)` e usa `Media`',
        '`Formatar(string, double, int casas = 2, string sufixo = "")` devolve `Media: 12.33`',
        'Linha 1: `Media geral: 12.33`',
        'Linha 2: `Media primeira metade: X`, dos índices 0 até `n / 2 - 1`',
        'Linha 3: `Mediana: Y` ou `Mediana: indefinida`',
        'Linha 4: `Minimo: A` e linha 5: `Maximo: B`, com zero casas decimais',
        'Linha 6: `Amplitude: C unidades`, com zero casas e o sufixo ` unidades`',
        'Com `n` igual a 0, a média geral é `0.00`, a da metade é `0.00`, a mediana é indefinida, e mínimo, máximo e amplitude são `0`',
        'A mediana de uma quantidade par é a média dos dois valores centrais',
        'Não mude as assinaturas dos cinco métodos',
      ],
      starterCode: `using System;

class Program
{
    static double Media(params int[] valores)
    {
        return 0.0;
    }

    static double Media(int[] valores, int inicio, int fim)
    {
        return 0.0;
    }

    static bool TentarMediana(int[] valores, out double mediana)
    {
        mediana = 0.0;
        return false;
    }

    static (int Min, int Max, double Media) Resumo(int[] valores)
    {
        return (0, 0, 0.0);
    }

    static string Formatar(string rotulo, double valor, int casas = 2, string sufixo = "")
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

        // Monte as seis linhas do relatorio
    }
}
`,
      solution: `using System;

class Program
{
    static double Media(params int[] valores)
    {
        if (valores.Length == 0)
        {
            return 0.0;
        }

        int soma = 0;

        foreach (int v in valores)
        {
            soma += v;
        }

        return (double)soma / valores.Length;
    }

    static double Media(int[] valores, int inicio, int fim)
    {
        if (inicio > fim)
        {
            return 0.0;
        }

        int soma = 0;

        for (int i = inicio; i <= fim; i++)
        {
            soma += valores[i];
        }

        return (double)soma / (fim - inicio + 1);
    }

    static bool TentarMediana(int[] valores, out double mediana)
    {
        if (valores.Length == 0)
        {
            mediana = 0.0;
            return false;
        }

        int[] copia = new int[valores.Length];
        Array.Copy(valores, copia, valores.Length);
        Array.Sort(copia);

        int meio = copia.Length / 2;

        mediana = copia.Length % 2 == 1
            ? copia[meio]
            : (copia[meio - 1] + copia[meio]) / 2.0;

        return true;
    }

    static (int Min, int Max, double Media) Resumo(int[] valores)
    {
        if (valores.Length == 0)
        {
            return (0, 0, 0.0);
        }

        int min = valores[0];
        int max = valores[0];

        foreach (int v in valores)
        {
            if (v < min) min = v;
            if (v > max) max = v;
        }

        return (min, max, Media(valores));
    }

    static string Formatar(string rotulo, double valor, int casas = 2, string sufixo = "")
    {
        return $"{rotulo}: {valor.ToString("F" + casas)}{sufixo}";
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] valores = new int[n];
        for (int i = 0; i < n; i++)
        {
            valores[i] = int.Parse(Console.ReadLine());
        }

        var (min, max, media) = Resumo(valores);

        Console.WriteLine(Formatar("Media geral", media));
        Console.WriteLine(Formatar("Media primeira metade", Media(valores, 0, n / 2 - 1)));

        if (TentarMediana(valores, out double mediana))
        {
            Console.WriteLine(Formatar("Mediana", mediana));
        }
        else
        {
            Console.WriteLine("Mediana: indefinida");
        }

        Console.WriteLine(Formatar("Minimo", min, casas: 0));
        Console.WriteLine(Formatar("Maximo", max, casas: 0));
        Console.WriteLine(Formatar("Amplitude", max - min, casas: 0, sufixo: " unidades"));
    }
}
`,
      hints: [
        'A sobrecarga de faixa precisa tratar `inicio > fim`, que acontece quando `n` é 0 ou 1 e a primeira metade fica vazia.',
        'O `Formatar` monta o especificador dinamicamente: `valor.ToString("F" + casas)`.',
        'A `Amplitude` usa argumentos nomeados para pular direto ao `sufixo` depois de definir as casas.',
      ],
      tests: [
        {
          name: 'Série de seis valores',
          stdin: '6\n12\n7\n25\n3\n18\n9\n',
          expectedStdout:
            'Media geral: 12.33\nMedia primeira metade: 14.67\nMediana: 10.50\n' +
            'Minimo: 3\nMaximo: 25\nAmplitude: 22 unidades',
        },
        {
          name: 'Quantidade ímpar',
          stdin: '5\n1\n2\n3\n4\n5\n',
          expectedStdout:
            'Media geral: 3.00\nMedia primeira metade: 1.50\nMediana: 3.00\n' +
            'Minimo: 1\nMaximo: 5\nAmplitude: 4 unidades',
        },
        {
          name: 'Um valor só: a primeira metade fica vazia',
          stdin: '1\n7\n',
          expectedStdout:
            'Media geral: 7.00\nMedia primeira metade: 0.00\nMediana: 7.00\n' +
            'Minimo: 7\nMaximo: 7\nAmplitude: 0 unidades',
        },
        {
          name: 'Série inteiramente negativa',
          stdin: '4\n-1\n-9\n-3\n-5\n',
          expectedStdout:
            'Media geral: -4.50\nMedia primeira metade: -5.00\nMediana: -4.00\n' +
            'Minimo: -9\nMaximo: -1\nAmplitude: 8 unidades',
        },
        {
          name: 'Nenhum valor',
          stdin: '0\n',
          expectedStdout:
            'Media geral: 0.00\nMedia primeira metade: 0.00\nMediana: indefinida\n' +
            'Minimo: 0\nMaximo: 0\nAmplitude: 0 unidades',
          hidden: true,
        },
      ],
    },
  },
]
