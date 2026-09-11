import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's08c03l01',
    title: 'switch como expressão',
    objective: 'Trocar o `switch` de comando por uma expressão que devolve valor, sem `break` nem variável temporária.',
    concept: [
      {
        kind: 'text',
        body:
          'O `switch` que você conhece desde a Seção 2 é um **comando**: ele executa blocos. Existe uma segunda forma, a **expressão switch**, que em vez de executar, *devolve um valor*.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'switch de comando',
          code: `string rotulo;

switch (nota)
{
    case 10:
        rotulo = "otimo";
        break;
    case 9:
    case 8:
        rotulo = "bom";
        break;
    default:
        rotulo = "revisar";
        break;
}`,
        },
        right: {
          label: 'expressão switch',
          code: `string rotulo = nota switch
{
    10 => "otimo",
    9 or 8 => "bom",
    _ => "revisar",
};`,
        },
        note: 'Mesma lógica, sem variável não inicializada, sem `break`, e o resultado é uma expressão que pode ir direto num `return`.',
      },
      {
        kind: 'text',
        body: 'A sintaxe muda em quatro pontos, e vale reparar em cada um:',
      },
      {
        kind: 'table',
        headers: ['', 'Comando', 'Expressão'],
        rows: [
          ['posição do `switch`', 'antes do valor', 'depois do valor'],
          ['separador', '`case X:`', '`X =>`'],
          ['fim de cada braço', '`break`', 'vírgula'],
          ['caso padrão', '`default:`', '`_ =>`'],
        ],
      },
      {
        kind: 'code',
        code: `static string Classificar(int n) => n switch
{
    < 0 => "negativo",
    0 => "zero",
    > 0 and < 10 => "pequeno",
    >= 10 and < 100 => "medio",
    _ => "grande",
};`,
        caption: 'Um método inteiro numa expressão. É a forma mais comum de escrever conversões de valor em C# moderno.',
      },
      {
        kind: 'output',
        code: `-5   -> negativo
0    -> zero
3    -> pequeno
42   -> medio
500  -> grande`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A ordem dos braços **importa**: o primeiro que casar vence. Por isso `0` precisa vir antes de `> 0 and < 10`? Não — mas `< 0` precisa vir antes de qualquer padrão mais amplo que também aceite negativos.',
      },
      {
        kind: 'text',
        body:
          'A vantagem que mais se sente no dia a dia é o compilador conferir a **exaustividade**. Se existir um valor de entrada que nenhum braço cobre, ele avisa.',
      },
      {
        kind: 'code',
        code: `string f = numero switch
{
    1 => "um",
    2 => "dois",
};`,
      },
      {
        kind: 'output',
        code: `warning CS8509: The switch expression does not handle all possible values
of its input type (it is not exhaustive). For example, the pattern '0' is not covered.`,
        caption: 'Um aviso em tempo de compilação para um caso que, sem ele, só apareceria em produção.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'É apenas um **aviso**, não erro: o código compila. Se nenhum braço casar em tempo de execução, o resultado é uma `SwitchExpressionException`. Ignorar CS8509 é adiar a falha.',
      },
      {
        kind: 'text',
        body:
          'O `_` é o **descarte**, e faz o papel do `default`. Ele casa com qualquer coisa, e por isso precisa ser sempre o último — um braço depois dele seria inalcançável.',
      },
      {
        kind: 'compare',
        good: `var r = valor switch
{
    < 0 => "negativo",
    0 => "zero",
    _ => "positivo",
};`,
        bad: `var r = valor switch
{
    _ => "qualquer",
    0 => "zero",
    // erro: braco inalcancavel
};`,
        goodLabel: 'Descarte por último',
        badLabel: 'Descarte no meio',
      },
      {
        kind: 'text',
        body:
          'Uma expressão switch cabe em qualquer lugar onde um valor cabe: num argumento, numa interpolação, dentro de outra expressão switch. É essa composição que a torna a base de todo o resto do capítulo.',
      },
      {
        kind: 'code',
        code: `Console.WriteLine($"Voce tirou {nota} ({nota switch { >= 7 => "aprovado", _ => "reprovado" }})");`,
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Use a expressão quando cada caso **produz um valor**; use o comando quando cada caso **executa ações**. Espremer três linhas de efeito colateral num braço de expressão é forçar a ferramenta errada.',
      },
    ],
    quiz: [
      {
        id: 's08c03l01q1',
        type: 'single',
        prompt: 'Qual a diferença fundamental entre o `switch` de comando e a expressão switch?',
        options: [
          { id: 'a', text: 'O comando executa blocos; a expressão devolve um valor', correct: true },
          { id: 'b', text: 'A expressão é mais rápida em tempo de execução' },
          { id: 'c', text: 'O comando não aceita `string`' },
          { id: 'd', text: 'A expressão não permite mais de três casos' },
        ],
        explanation:
          'Por devolver valor, a expressão pode aparecer num `return`, num argumento ou numa interpolação — lugares onde um comando não caberia.',
      },
      {
        id: 's08c03l01q2',
        type: 'single',
        prompt: 'O que acontece quando nenhum braço de uma expressão switch casa em tempo de execução?',
        options: [
          { id: 'a', text: 'É lançada uma `SwitchExpressionException`', correct: true },
          { id: 'b', text: 'A expressão devolve `null`' },
          { id: 'c', text: 'A expressão devolve `default`' },
          { id: 'd', text: 'O programa continua silenciosamente' },
        ],
        explanation:
          'O compilador avisa com CS8509 quando consegue provar que faltam casos, mas o aviso não impede a compilação. Sem um `_` final, a falha vira exceção.',
      },
      {
        id: 's08c03l01q3',
        type: 'single',
        prompt: 'Por que este código não compila?',
        code: `var r = valor switch
{
    _ => "qualquer",
    0 => "zero",
};`,
        options: [
          { id: 'a', text: 'O braço `0` é inalcançável: `_` já casou com tudo', correct: true },
          { id: 'b', text: 'O `_` precisa vir sempre primeiro' },
          { id: 'c', text: 'Falta um `break` entre os braços' },
          { id: 'd', text: 'Compila normalmente' },
        ],
        explanation:
          'Os braços são testados em ordem. Como `_` aceita qualquer valor, tudo que vier depois é código morto — e o compilador trata isso como erro.',
      },
    ],
    challenge: {
      brief:
        'Reescreva um conjunto de classificações usando expressões switch: faixa etária, conceito de nota, dia da semana, categoria de valor e sinal de número.',
      requirements: [
        'Todos os métodos usam expressão switch, sem `if` e sem `switch` de comando.',
        'Cada método é escrito como corpo de expressão (`=>`), numa linha de assinatura só.',
        'Todos são exaustivos: nenhum aviso CS8509 e nenhuma `SwitchExpressionException`.',
        '`Conceito` usa `or` para agrupar notas equivalentes.',
        '`Sinal` devolve `-1`, `0` ou `1`.',
        '`DescricaoCompleta` combina duas expressões switch numa interpolação.',
      ],
      starterCode: `using System;

class Program
{
    static string FaixaEtaria(int idade) => idade switch
    {
        // TODO: <0 invalida, <13 crianca, <18 adolescente, <60 adulto, resto idoso
        _ => "",
    };

    static string Conceito(int nota) => nota switch
    {
        // TODO: 10 e 9 => "A", 8 e 7 => "B", 6 e 5 => "C", resto "D"
        _ => "",
    };

    static string DiaDaSemana(int dia) => dia switch
    {
        // TODO: 1 a 5 uteis (nomeados), 6 e 7 "fim de semana", resto "invalido"
        _ => "",
    };

    static string Categoria(decimal valor) => valor switch
    {
        // TODO: <0 "estorno", 0 "gratuito", <50 "baixo", <500 "medio", resto "alto"
        _ => "",
    };

    static int Sinal(double n) => n switch
    {
        // TODO: -1, 0 ou 1
        _ => 0,
    };

    static string DescricaoCompleta(int idade, int nota)
    {
        // TODO: "<faixa> com conceito <conceito>" usando as duas expressoes na interpolacao
        return "";
    }

    static void Main()
    {
        foreach (int idade in new[] { -1, 5, 15, 30, 70 })
        {
            Console.WriteLine($"idade {idade}: {FaixaEtaria(idade)}");
        }

        foreach (int nota in new[] { 10, 9, 8, 7, 6, 5, 3 })
        {
            Console.WriteLine($"nota {nota}: {Conceito(nota)}");
        }

        foreach (int dia in new[] { 1, 3, 5, 6, 7, 9 })
        {
            Console.WriteLine($"dia {dia}: {DiaDaSemana(dia)}");
        }

        foreach (decimal valor in new[] { -10m, 0m, 25m, 300m, 5000m })
        {
            Console.WriteLine($"valor {valor}: {Categoria(valor)}");
        }

        foreach (double n in new[] { -3.5, 0.0, 7.2 })
        {
            Console.WriteLine($"sinal {n}: {Sinal(n)}");
        }

        Console.WriteLine(DescricaoCompleta(15, 9));
        Console.WriteLine(DescricaoCompleta(70, 4));
    }
}`,
      solution: `using System;

class Program
{
    static string FaixaEtaria(int idade) => idade switch
    {
        < 0 => "invalida",
        < 13 => "crianca",
        < 18 => "adolescente",
        < 60 => "adulto",
        _ => "idoso",
    };

    static string Conceito(int nota) => nota switch
    {
        10 or 9 => "A",
        8 or 7 => "B",
        6 or 5 => "C",
        _ => "D",
    };

    static string DiaDaSemana(int dia) => dia switch
    {
        1 => "segunda",
        2 => "terca",
        3 => "quarta",
        4 => "quinta",
        5 => "sexta",
        6 or 7 => "fim de semana",
        _ => "invalido",
    };

    static string Categoria(decimal valor) => valor switch
    {
        < 0 => "estorno",
        0 => "gratuito",
        < 50 => "baixo",
        < 500 => "medio",
        _ => "alto",
    };

    static int Sinal(double n) => n switch
    {
        < 0 => -1,
        0 => 0,
        _ => 1,
    };

    static string DescricaoCompleta(int idade, int nota)
    {
        return $"{FaixaEtaria(idade)} com conceito {Conceito(nota)}";
    }

    static void Main()
    {
        foreach (int idade in new[] { -1, 5, 15, 30, 70 })
        {
            Console.WriteLine($"idade {idade}: {FaixaEtaria(idade)}");
        }

        foreach (int nota in new[] { 10, 9, 8, 7, 6, 5, 3 })
        {
            Console.WriteLine($"nota {nota}: {Conceito(nota)}");
        }

        foreach (int dia in new[] { 1, 3, 5, 6, 7, 9 })
        {
            Console.WriteLine($"dia {dia}: {DiaDaSemana(dia)}");
        }

        foreach (decimal valor in new[] { -10m, 0m, 25m, 300m, 5000m })
        {
            Console.WriteLine($"valor {valor}: {Categoria(valor)}");
        }

        foreach (double n in new[] { -3.5, 0.0, 7.2 })
        {
            Console.WriteLine($"sinal {n}: {Sinal(n)}");
        }

        Console.WriteLine(DescricaoCompleta(15, 9));
        Console.WriteLine(DescricaoCompleta(70, 4));
    }
}`,
      hints: [
        'Ordene os braços do mais restritivo ao mais amplo: `< 0` precisa vir antes de `< 13`, senão os negativos cairiam em "crianca".',
        '`10 or 9 => "A"` é um padrão lógico — dois valores num braço só, sem repetir o resultado.',
        'Em `Sinal`, `< 0` e `0` cobrem tudo abaixo e igual a zero; o `_` fica com os positivos.',
      ],
      tests: [
        {
          name: 'Classificações com expressão switch',
          expectedStdout:
            'idade -1: invalida\nidade 5: crianca\nidade 15: adolescente\nidade 30: adulto\nidade 70: idoso\n' +
            'nota 10: A\nnota 9: A\nnota 8: B\nnota 7: B\nnota 6: C\nnota 5: C\nnota 3: D\n' +
            'dia 1: segunda\ndia 3: quarta\ndia 5: sexta\ndia 6: fim de semana\ndia 7: fim de semana\ndia 9: invalido\n' +
            'valor -10: estorno\nvalor 0: gratuito\nvalor 25: baixo\nvalor 300: medio\nvalor 5000: alto\n' +
            'sinal -3.5: -1\nsinal 0: 0\nsinal 7.2: 1\n' +
            'adolescente com conceito A\nidoso com conceito D',
        },
      ],
    },
  },

  {
    id: 's08c03l02',
    title: 'Padrões de tipo',
    objective: 'Testar o tipo de um valor e já capturá-lo numa variável tipada, sem cast separado.',
    concept: [
      {
        kind: 'text',
        body:
          'O **padrão de tipo** verifica se um valor é de determinado tipo e, no mesmo passo, o guarda numa variável já convertida. Substitui o par "testar e depois converter" por uma operação só.',
      },
      {
        kind: 'compare',
        good: `if (o is string s)
{
    Console.WriteLine(s.Length);
}`,
        bad: `if (o is string)
{
    string s = (string)o;
    Console.WriteLine(s.Length);
}`,
        goodLabel: 'Testa e captura',
        badLabel: 'Testa, depois converte de novo',
      },
      {
        kind: 'text',
        body:
          'A versão da direita faz o trabalho duas vezes: o `is` já verificou o tipo, e o cast verifica outra vez. A da esquerda é mais curta, mais rápida e impossível de dessincronizar.',
      },
      {
        kind: 'text',
        body:
          'O mesmo padrão funciona dentro de uma expressão switch, e é aí que ele brilha — substituindo cadeias longas de `if` por uma tabela de tipos.',
      },
      {
        kind: 'code',
        code: `static double Area(Forma f) => f switch
{
    Circulo c => Math.PI * c.Raio * c.Raio,
    Retangulo r => r.Largura * r.Altura,
    Triangulo t => t.Base * t.Altura / 2,
    _ => 0,
};`,
        caption: 'Cada braço testa um tipo e recebe a variável já convertida, pronta para uso.',
      },
      {
        kind: 'output',
        code: `area circulo: 12.57
area retangulo: 12
area triangulo: 12`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Isso é uma alternativa ao polimorfismo, não um substituto. Se `Area` pertence às formas, um método virtual é melhor. O padrão de tipo ganha quando a operação é **externa** ao tipo — um formatador, um serializador, um roteador de mensagens.',
      },
      {
        kind: 'text',
        body:
          'A ordem dos braços importa muito aqui, porque tipos derivados casam com padrões da classe base. O mais **específico** precisa vir primeiro.',
      },
      {
        kind: 'compare',
        good: `o switch
{
    ArgumentNullException => "argumento nulo",
    ArgumentException => "argumento invalido",
    Exception => "erro",
}`,
        bad: `o switch
{
    Exception => "erro",
    // inalcancavel: toda excecao
    // ja casou com Exception
    ArgumentException => "...",
}`,
        goodLabel: 'Do específico ao geral',
        badLabel: 'Base antes da derivada',
      },
      {
        kind: 'text',
        body:
          'O padrão `null` é um caso à parte e merece o primeiro braço quando a entrada pode ser nula — nenhum padrão de tipo casa com `null`.',
      },
      {
        kind: 'code',
        code: `static string Descrever(object o) => o switch
{
    null => "nulo",
    int i => $"int {i}",
    string s => $"texto de {s.Length}",
    int[] a => $"array de {a.Length}",
    List<int> l => $"lista de {l.Count}",
    _ => $"outro: {o.GetType().Name}",
};`,
      },
      {
        kind: 'output',
        code: `null              -> nulo
5                 -> int 5
"abc"             -> texto de 3
new int[3]        -> array de 3
new List<int>{..} -> lista de 2
3.5               -> outro: Double`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Sem o braço `null` no início, um valor nulo cairia no `_` — e `o.GetType()` lançaria `NullReferenceException` **dentro** do braço padrão. O erro apareceria no lugar mais confuso possível.',
      },
      {
        kind: 'text',
        body:
          'Quando o valor capturado não é usado, o nome pode ser omitido: `Circulo => "redondo"` testa o tipo sem criar variável. É mais limpo e evita o aviso de variável não utilizada.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          '`is not` também existe e lê melhor que a negação: `if (o is not string)` em vez de `if (!(o is string))`. E `is not null` é a forma idiomática de checar presença.',
      },
    ],
    quiz: [
      {
        id: 's08c03l02q1',
        type: 'single',
        prompt: 'O que `if (o is string s)` faz além de testar o tipo?',
        options: [
          { id: 'a', text: 'Declara `s` já convertida para `string`, válida dentro do bloco', correct: true },
          { id: 'b', text: 'Converte `o` permanentemente para `string`' },
          { id: 'c', text: 'Lança exceção se o tipo não bater' },
          { id: 'd', text: 'Nada: `s` é só um rótulo' },
        ],
        explanation:
          'A conversão acontece uma vez só, como parte do teste. Não há segundo cast, e `s` não pode estar dessincronizada de `o`.',
      },
      {
        id: 's08c03l02q2',
        type: 'single',
        prompt: 'Por que `ArgumentException` deve vir antes de `Exception` numa expressão switch?',
        options: [
          { id: 'a', text: 'Porque `ArgumentException` também casa com `Exception`, tornando o braço mais específico inalcançável', correct: true },
          { id: 'b', text: 'Porque `Exception` é abstrata' },
          { id: 'c', text: 'Por convenção de estilo, sem efeito real' },
          { id: 'd', text: 'A ordem não importa em expressões switch' },
        ],
        explanation:
          'Os braços são testados em ordem, e todo derivado casa com o padrão da base. É a mesma regra dos blocos `catch`.',
      },
      {
        id: 's08c03l02q3',
        type: 'single',
        prompt: 'Um valor `null` chega a uma expressão switch cujo primeiro braço é `int i`. O que acontece?',
        options: [
          { id: 'a', text: 'Nenhum padrão de tipo casa com `null`; ele segue para os braços seguintes', correct: true },
          { id: 'b', text: '`null` casa com qualquer padrão de tipo' },
          { id: 'c', text: '`i` recebe `0`' },
          { id: 'd', text: 'É lançada `NullReferenceException` imediatamente' },
        ],
        explanation:
          'Padrões de tipo exigem uma instância daquele tipo, e `null` não é instância de nada. Por isso o braço `null` explícito é a primeira linha de defesa.',
      },
    ],
    challenge: {
      brief:
        'Escreva um formatador que descreve qualquer valor pelo seu tipo — números, texto, coleções, exceções — usando padrões de tipo e respeitando a ordem do específico para o geral.',
      requirements: [
        'Use apenas padrões de tipo em expressão switch; nada de `GetType()` comparado com `typeof`.',
        'O braço `null` vem primeiro.',
        'Exceções são classificadas do tipo mais específico ao mais geral.',
        'Colecões devolvem a quantidade de elementos.',
        '`SomarNumericos` percorre um `object[]` e soma apenas os valores numéricos, convertendo cada um.',
        '`ContarPorTipo` devolve quantos itens de cada categoria existem no array.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static string Descrever(object o) => o switch
    {
        // TODO: null, int, double, decimal, bool, string vazia, string,
        //       int[], List<string>, Dictionary<string,int>, resto
        _ => "",
    };

    static string ClassificarErro(Exception e) => e switch
    {
        // TODO: ArgumentNullException, ArgumentOutOfRangeException,
        //       ArgumentException, InvalidOperationException, Exception
        _ => "",
    };

    static double SomarNumericos(object[] itens)
    {
        // TODO: some int, double e decimal; ignore o resto
        return 0;
    }

    static (int Numeros, int Textos, int Colecoes, int Outros) ContarPorTipo(object[] itens)
    {
        // TODO
        return (0, 0, 0, 0);
    }

    static void Main()
    {
        object[] valores =
        {
            null,
            42,
            3.5,
            19.99m,
            true,
            "",
            "abc",
            new int[3],
            new List<string> { "a", "b" },
            new Dictionary<string, int> { ["x"] = 1 },
            new DateTime(2024, 1, 1),
        };

        foreach (object o in valores)
        {
            Console.WriteLine($"descrever: {Descrever(o)}");
        }

        Exception[] erros =
        {
            new ArgumentNullException("p"),
            new ArgumentOutOfRangeException("p"),
            new ArgumentException("generico"),
            new InvalidOperationException("estado"),
            new FormatException("formato"),
        };

        foreach (Exception e in erros)
        {
            Console.WriteLine($"erro: {ClassificarErro(e)}");
        }

        Console.WriteLine($"soma: {SomarNumericos(valores)}");
        Console.WriteLine($"soma vazia: {SomarNumericos(new object[0])}");

        var (numeros, textos, colecoes, outros) = ContarPorTipo(valores);
        Console.WriteLine($"contagem: {numeros} {textos} {colecoes} {outros}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static string Descrever(object o) => o switch
    {
        null => "nulo",
        int i => $"int {i}",
        double d => $"double {d}",
        decimal m => $"decimal {m}",
        bool b => $"bool {b}",
        string s when s.Length == 0 => "texto vazio",
        string s => $"texto de {s.Length}",
        int[] a => $"array de {a.Length}",
        List<string> l => $"lista de {l.Count}",
        Dictionary<string, int> d => $"mapa de {d.Count}",
        _ => $"outro: {o.GetType().Name}",
    };

    static string ClassificarErro(Exception e) => e switch
    {
        ArgumentNullException => "argumento nulo",
        ArgumentOutOfRangeException => "fora da faixa",
        ArgumentException => "argumento invalido",
        InvalidOperationException => "estado invalido",
        _ => "erro generico",
    };

    static double SomarNumericos(object[] itens)
    {
        double total = 0;

        foreach (object item in itens)
        {
            total += item switch
            {
                int i => i,
                double d => d,
                decimal m => (double)m,
                _ => 0,
            };
        }

        return total;
    }

    static (int Numeros, int Textos, int Colecoes, int Outros) ContarPorTipo(object[] itens)
    {
        int numeros = 0;
        int textos = 0;
        int colecoes = 0;
        int outros = 0;

        foreach (object item in itens)
        {
            switch (item)
            {
                case int:
                case double:
                case decimal:
                    numeros++;
                    break;
                case string:
                    textos++;
                    break;
                case int[]:
                case List<string>:
                case Dictionary<string, int>:
                    colecoes++;
                    break;
                default:
                    outros++;
                    break;
            }
        }

        return (numeros, textos, colecoes, outros);
    }

    static void Main()
    {
        object[] valores =
        {
            null,
            42,
            3.5,
            19.99m,
            true,
            "",
            "abc",
            new int[3],
            new List<string> { "a", "b" },
            new Dictionary<string, int> { ["x"] = 1 },
            new DateTime(2024, 1, 1),
        };

        foreach (object o in valores)
        {
            Console.WriteLine($"descrever: {Descrever(o)}");
        }

        Exception[] erros =
        {
            new ArgumentNullException("p"),
            new ArgumentOutOfRangeException("p"),
            new ArgumentException("generico"),
            new InvalidOperationException("estado"),
            new FormatException("formato"),
        };

        foreach (Exception e in erros)
        {
            Console.WriteLine($"erro: {ClassificarErro(e)}");
        }

        Console.WriteLine($"soma: {SomarNumericos(valores)}");
        Console.WriteLine($"soma vazia: {SomarNumericos(new object[0])}");

        var (numeros, textos, colecoes, outros) = ContarPorTipo(valores);
        Console.WriteLine($"contagem: {numeros} {textos} {colecoes} {outros}");
    }
}`,
      hints: [
        '`ArgumentNullException` e `ArgumentOutOfRangeException` herdam de `ArgumentException`, então precisam vir antes dela.',
        'Quando o valor capturado não é usado, escreva só o tipo: `ArgumentNullException => "..."`, sem nome de variável.',
        '`null` conta como "outros" em `ContarPorTipo`, porque não casa com nenhum `case` de tipo e cai no `default`.',
      ],
      tests: [
        {
          name: 'Formatador por tipo',
          expectedStdout:
            'descrever: nulo\ndescrever: int 42\ndescrever: double 3.5\ndescrever: decimal 19.99\n' +
            'descrever: bool True\ndescrever: texto vazio\ndescrever: texto de 3\n' +
            'descrever: array de 3\ndescrever: lista de 2\ndescrever: mapa de 1\n' +
            'descrever: outro: DateTime\n' +
            'erro: argumento nulo\nerro: fora da faixa\nerro: argumento invalido\n' +
            'erro: estado invalido\nerro: erro generico\n' +
            'soma: 65.49\nsoma vazia: 0\n' +
            'contagem: 3 2 3 3',
        },
      ],
    },
  },

  {
    id: 's08c03l03',
    title: 'Padrões relacionais',
    objective: 'Comparar com `<`, `>`, `<=` e `>=` dentro de um padrão, montando faixas sem escrever a variável.',
    concept: [
      {
        kind: 'text',
        body:
          'Um **padrão relacional** é um operador de comparação usado como padrão. Em vez de `n < 0`, escreve-se apenas `< 0` — a variável fica implícita, porque o `switch` já disse qual é.',
      },
      {
        kind: 'code',
        code: `static string Classificar(int n) => n switch
{
    < 0 => "negativo",
    0 => "zero",
    < 10 => "pequeno",
    < 100 => "medio",
    _ => "grande",
};`,
        caption: 'Os quatro operadores relacionais são aceitos: `<`, `>`, `<=` e `>=`.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que o terceiro braço é só `< 10`, não `> 0 and < 10`. Como os braços são testados em ordem e os anteriores já retiraram tudo que é `<= 0`, a faixa fica implícita. Menos condição para ler e para errar.',
      },
      {
        kind: 'text',
        body:
          'Essa é a diferença prática mais forte em relação a uma cadeia de `if`: a **ordem faz parte da lógica**, e o compilador entende isso ao verificar exaustividade e alcançabilidade.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Cadeia de if',
          code: `if (n < 0) return "negativo";
if (n == 0) return "zero";
if (n < 10) return "pequeno";
if (n < 100) return "medio";
return "grande";`,
        },
        right: {
          label: 'Padrões relacionais',
          code: `return n switch
{
    < 0 => "negativo",
    0 => "zero",
    < 10 => "pequeno",
    < 100 => "medio",
    _ => "grande",
};`,
        },
        note: 'A da direita é uma expressão só: cabe num `=>`, num argumento, numa interpolação.',
      },
      {
        kind: 'text',
        body:
          'Padrões relacionais funcionam com qualquer tipo que tenha ordem embutida na linguagem: todos os numéricos, `char`, e `enum`.',
      },
      {
        kind: 'code',
        code: `static string TipoDeCaractere(char c) => c switch
{
    >= '0' and <= '9' => "digito",
    >= 'a' and <= 'z' => "minuscula",
    >= 'A' and <= 'Z' => "maiuscula",
    _ => "outro",
};`,
        caption: 'Faixas de `char` funcionam porque `char` tem ordem numérica definida.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O operando de um padrão relacional precisa ser uma **constante em tempo de compilação**. `< limite`, com `limite` sendo uma variável, não compila — para isso existe a cláusula `when`, na lição 8.',
      },
      {
        kind: 'compare',
        good: `const int Limite = 100;

n switch
{
    < Limite => "abaixo",
    _ => "acima",
}`,
        bad: `int limite = LerConfiguracao();

n switch
{
    // erro: nao e constante
    < limite => "abaixo",
    _ => "acima",
}`,
        goodLabel: 'Constante',
        badLabel: 'Variável',
      },
      {
        kind: 'text',
        body:
          'Padrões relacionais também aparecem fora do `switch`, direto num `is` — e essa forma é excelente para validações.',
      },
      {
        kind: 'code',
        code: `if (idade is >= 18 and < 65)
{
    Console.WriteLine("idade de trabalho");
}

bool valido = nota is >= 0 and <= 10;`,
        caption: '`idade is >= 18 and < 65` diz a mesma coisa que `idade >= 18 && idade < 65`, sem repetir o nome.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Escrever a variável uma vez só elimina uma classe inteira de bug: a condição composta em que alguém trocou `idade >= 18 && altura < 65` sem perceber.',
      },
      {
        kind: 'text',
        body:
          'Cuidado com números de ponto flutuante: `NaN` não é maior, nem menor, nem igual a nada. Um valor `NaN` escapa de todos os padrões relacionais e vai parar no `_`.',
      },
      {
        kind: 'output',
        code: `double.NaN switch { < 0 => "neg", >= 0 => "pos", _ => "nenhum" }
->  nenhum`,
        caption: 'Sem o `_`, esse switch lançaria `SwitchExpressionException` para `NaN`.',
      },
    ],
    quiz: [
      {
        id: 's08c03l03q1',
        type: 'single',
        prompt: 'Por que o braço `< 10` sozinho basta depois dos braços `< 0` e `0`?',
        options: [
          { id: 'a', text: 'Os braços são testados em ordem, e os anteriores já eliminaram tudo que é `<= 0`', correct: true },
          { id: 'b', text: 'Porque `< 10` significa automaticamente `> 0 and < 10`' },
          { id: 'c', text: 'Porque o compilador reordena os braços' },
          { id: 'd', text: 'Não basta: é preciso escrever `> 0 and < 10`' },
        ],
        explanation:
          'A ordem é parte da semântica. Escrever `> 0 and < 10` funcionaria igual, mas seria uma condição redundante — e uma a mais para manter em sincronia.',
      },
      {
        id: 's08c03l03q2',
        type: 'single',
        prompt: 'Por que `< limite`, com `limite` sendo uma variável `int`, não compila?',
        options: [
          { id: 'a', text: 'Padrões relacionais exigem constante de compilação', correct: true },
          { id: 'b', text: 'Porque `limite` precisa ser `readonly`' },
          { id: 'c', text: 'Porque o padrão precisa vir antes do `switch`' },
          { id: 'd', text: 'Compila normalmente' },
        ],
        explanation:
          'O compilador precisa conhecer o valor para analisar alcançabilidade e exaustividade. Para comparar com um valor calculado, use `when`.',
      },
      {
        id: 's08c03l03q3',
        type: 'single',
        prompt: 'O que acontece com `double.NaN` numa expressão switch com braços `< 0` e `>= 0`?',
        options: [
          { id: 'a', text: 'Nenhum dos dois casa; sem `_`, é lançada `SwitchExpressionException`', correct: true },
          { id: 'b', text: 'Casa com `< 0`' },
          { id: 'c', text: 'Casa com `>= 0`' },
          { id: 'd', text: 'O compilador rejeita `NaN` em padrões' },
        ],
        explanation:
          'Toda comparação com `NaN` é falsa, inclusive `NaN >= 0`. É a mesma armadilha das comparações comuns, e o `_` é a rede de segurança.',
      },
    ],
    challenge: {
      brief:
        'Monte um conjunto de classificadores por faixa: índice de massa corporal, velocidade de conexão, temperatura, tipo de caractere e nível de alerta — tudo com padrões relacionais.',
      requirements: [
        'Use padrões relacionais em expressão switch; nada de `if` encadeado.',
        'Aproveite a ordem dos braços para não repetir limites inferiores.',
        '`TipoDeCaractere` usa faixas de `char`.',
        '`NivelDeAlerta` combina padrões relacionais com `and`.',
        '`ClassificarTemperatura` trata `double.NaN` explicitamente, sem cair em faixa errada.',
        '`Validar` usa `is` com padrão relacional fora de um `switch`.',
      ],
      starterCode: `using System;

class Program
{
    static string ClassificarImc(double imc) => imc switch
    {
        // TODO: NaN "invalido", <18.5 "abaixo", <25 "normal", <30 "sobrepeso", resto "obesidade"
        _ => "",
    };

    static string Velocidade(int mbps) => mbps switch
    {
        // TODO: <0 "invalida", 0 "sem conexao", <10 "lenta", <100 "media", <1000 "rapida", resto "fibra"
        _ => "",
    };

    static string ClassificarTemperatura(double celsius) => celsius switch
    {
        // TODO: NaN "sem leitura", <0 "congelante", <15 "frio", <25 "ameno", <35 "quente", resto "extremo"
        _ => "",
    };

    static string TipoDeCaractere(char c) => c switch
    {
        // TODO: digito, minuscula, maiuscula, espaco, outro
        _ => "",
    };

    static string NivelDeAlerta(int erros, int avisos) => (erros, avisos) switch
    {
        // TODO: erros > 10 "critico"; erros > 0 "erro"; avisos > 5 "atencao"; avisos > 0 "aviso"; resto "ok"
        _ => "",
    };

    static bool Validar(int nota)
    {
        // TODO: use "is" com padrao relacional, entre 0 e 10 inclusive
        return false;
    }

    static void Main()
    {
        foreach (double imc in new[] { 17.0, 22.0, 27.5, 35.0, double.NaN })
        {
            Console.WriteLine($"imc {imc}: {ClassificarImc(imc)}");
        }

        foreach (int mbps in new[] { -1, 0, 5, 50, 500, 2000 })
        {
            Console.WriteLine($"velocidade {mbps}: {Velocidade(mbps)}");
        }

        foreach (double t in new[] { -5.0, 10.0, 20.0, 30.0, 45.0, double.NaN })
        {
            Console.WriteLine($"temperatura {t}: {ClassificarTemperatura(t)}");
        }

        foreach (char c in new[] { '7', 'k', 'M', ' ', '#' })
        {
            Console.WriteLine($"caractere {c}: {TipoDeCaractere(c)}");
        }

        Console.WriteLine($"alerta 20/0: {NivelDeAlerta(20, 0)}");
        Console.WriteLine($"alerta 3/0: {NivelDeAlerta(3, 0)}");
        Console.WriteLine($"alerta 0/9: {NivelDeAlerta(0, 9)}");
        Console.WriteLine($"alerta 0/2: {NivelDeAlerta(0, 2)}");
        Console.WriteLine($"alerta 0/0: {NivelDeAlerta(0, 0)}");

        foreach (int nota in new[] { -1, 0, 7, 10, 11 })
        {
            Console.WriteLine($"validar {nota}: {Validar(nota)}");
        }
    }
}`,
      solution: `using System;

class Program
{
    static string ClassificarImc(double imc) => imc switch
    {
        double.NaN => "invalido",
        < 18.5 => "abaixo",
        < 25 => "normal",
        < 30 => "sobrepeso",
        _ => "obesidade",
    };

    static string Velocidade(int mbps) => mbps switch
    {
        < 0 => "invalida",
        0 => "sem conexao",
        < 10 => "lenta",
        < 100 => "media",
        < 1000 => "rapida",
        _ => "fibra",
    };

    static string ClassificarTemperatura(double celsius) => celsius switch
    {
        double.NaN => "sem leitura",
        < 0 => "congelante",
        < 15 => "frio",
        < 25 => "ameno",
        < 35 => "quente",
        _ => "extremo",
    };

    static string TipoDeCaractere(char c) => c switch
    {
        >= '0' and <= '9' => "digito",
        >= 'a' and <= 'z' => "minuscula",
        >= 'A' and <= 'Z' => "maiuscula",
        ' ' => "espaco",
        _ => "outro",
    };

    static string NivelDeAlerta(int erros, int avisos) => (erros, avisos) switch
    {
        ( > 10, _) => "critico",
        ( > 0, _) => "erro",
        (_, > 5) => "atencao",
        (_, > 0) => "aviso",
        _ => "ok",
    };

    static bool Validar(int nota)
    {
        return nota is >= 0 and <= 10;
    }

    static void Main()
    {
        foreach (double imc in new[] { 17.0, 22.0, 27.5, 35.0, double.NaN })
        {
            Console.WriteLine($"imc {imc}: {ClassificarImc(imc)}");
        }

        foreach (int mbps in new[] { -1, 0, 5, 50, 500, 2000 })
        {
            Console.WriteLine($"velocidade {mbps}: {Velocidade(mbps)}");
        }

        foreach (double t in new[] { -5.0, 10.0, 20.0, 30.0, 45.0, double.NaN })
        {
            Console.WriteLine($"temperatura {t}: {ClassificarTemperatura(t)}");
        }

        foreach (char c in new[] { '7', 'k', 'M', ' ', '#' })
        {
            Console.WriteLine($"caractere {c}: {TipoDeCaractere(c)}");
        }

        Console.WriteLine($"alerta 20/0: {NivelDeAlerta(20, 0)}");
        Console.WriteLine($"alerta 3/0: {NivelDeAlerta(3, 0)}");
        Console.WriteLine($"alerta 0/9: {NivelDeAlerta(0, 9)}");
        Console.WriteLine($"alerta 0/2: {NivelDeAlerta(0, 2)}");
        Console.WriteLine($"alerta 0/0: {NivelDeAlerta(0, 0)}");

        foreach (int nota in new[] { -1, 0, 7, 10, 11 })
        {
            Console.WriteLine($"validar {nota}: {Validar(nota)}");
        }
    }
}`,
      hints: [
        '`double.NaN` é uma constante e pode ser usada como padrão de valor — mas precisa vir **antes** dos relacionais, que nunca casam com ela.',
        'Em `NivelDeAlerta`, o `switch` opera sobre a tupla `(erros, avisos)`; cada braço é um par de padrões, com `_` no componente que não importa.',
        '`nota is >= 0 and <= 10` combina dois padrões relacionais fora de um `switch`, escrevendo a variável uma vez só.',
      ],
      tests: [
        {
          name: 'Classificação por faixas',
          expectedStdout:
            'imc 17: abaixo\nimc 22: normal\nimc 27.5: sobrepeso\nimc 35: obesidade\nimc NaN: invalido\n' +
            'velocidade -1: invalida\nvelocidade 0: sem conexao\nvelocidade 5: lenta\n' +
            'velocidade 50: media\nvelocidade 500: rapida\nvelocidade 2000: fibra\n' +
            'temperatura -5: congelante\ntemperatura 10: frio\ntemperatura 20: ameno\n' +
            'temperatura 30: quente\ntemperatura 45: extremo\ntemperatura NaN: sem leitura\n' +
            'caractere 7: digito\ncaractere k: minuscula\ncaractere M: maiuscula\n' +
            'caractere  : espaco\ncaractere #: outro\n' +
            'alerta 20/0: critico\nalerta 3/0: erro\nalerta 0/9: atencao\nalerta 0/2: aviso\nalerta 0/0: ok\n' +
            'validar -1: False\nvalidar 0: True\nvalidar 7: True\nvalidar 10: True\nvalidar 11: False',
        },
      ],
    },
  },

  {
    id: 's08c03l04',
    title: 'Padrões lógicos and, or, not',
    objective: 'Combinar padrões com operadores lógicos, escrevendo a variável testada uma única vez.',
    concept: [
      {
        kind: 'text',
        body:
          'Padrões se combinam com três palavras: **`and`**, **`or`** e **`not`**. Elas não são os operadores `&&`, `||` e `!` — operam sobre *padrões*, não sobre valores booleanos.',
      },
      {
        kind: 'code',
        code: `bool ehLetra = c is >= 'a' and <= 'z';
bool ehVogal = c is 'a' or 'e' or 'i' or 'o' or 'u';
bool naoEhNulo = valor is not null;`,
      },
      {
        kind: 'compare',
        good: `if (c is >= 'a' and <= 'z')`,
        bad: `if (c >= 'a' && c <= 'z')`,
        goodLabel: 'A variável aparece uma vez',
        badLabel: 'A variável aparece duas vezes',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A diferença não é economia de caracteres, é de erro. Numa condição composta longa, trocar `c` por `d` na segunda metade compila perfeitamente e produz um bug. Com padrões, o nome está escrito uma vez só e não há como divergir.',
      },
      {
        kind: 'text',
        body: 'Cada operador tem um papel bem definido, e todos podem ser aninhados:',
      },
      {
        kind: 'table',
        headers: ['Operador', 'Casa quando', 'Exemplo'],
        rows: [
          ['`and`', 'os dois padrões casam', '`>= 18 and < 65`'],
          ['`or`', 'pelo menos um casa', '`"PE" or "BA" or "CE"`'],
          ['`not`', 'o padrão **não** casa', '`not null`'],
        ],
      },
      {
        kind: 'text',
        body:
          'A precedência segue a intuição: `not` liga mais forte que `and`, que liga mais forte que `or`. Parênteses resolvem qualquer dúvida.',
      },
      {
        kind: 'code',
        code: `// not > and > or
x is not 0 and < 10 or > 100

// o mesmo, explicito:
x is ((not 0) and (< 10)) or (> 100)`,
      },
      {
        kind: 'text',
        body:
          '`or` com valores literais substitui bem o agrupamento de `case` do `switch` de comando, e lê melhor do que uma sequência de comparações.',
      },
      {
        kind: 'code',
        code: `static string Conceito(int nota) => nota switch
{
    10 or 9 => "A",
    8 or 7 => "B",
    6 or 5 => "C",
    _ => "D",
};`,
      },
      {
        kind: 'text',
        body:
          '`not` é especialmente útil combinado com padrões de tipo. `is not string` lê melhor que `!(x is string)` e não precisa de parênteses.',
      },
      {
        kind: 'compare',
        good: `if (o is not string texto)
{
    return "nao e texto";
}

// texto esta disponivel aqui,
// se o metodo continuou`,
        bad: `if (!(o is string))
{
    return "nao e texto";
}

string texto = (string)o;`,
        goodLabel: '`is not` com captura',
        badLabel: 'Negação com cast separado',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Cuidado com `not` sobre um padrão que captura: `o is not string s` compila, mas `s` só está definitivamente atribuída no caminho em que a condição é **falsa** — ou seja, depois do `if` que retorna. É correto, mas exige atenção ao ler.',
      },
      {
        kind: 'text',
        body:
          'A combinação mais frequente na prática é `and` unindo faixas com `or` unindo alternativas, tudo dentro de um braço só.',
      },
      {
        kind: 'code',
        code: `static string Ticket(int prioridade, string origem) => (prioridade, origem) switch
{
    ( >= 1 and <= 2, "cliente" or "suporte") => "urgente",
    ( >= 1 and <= 2, _) => "alta",
    (3 or 4, not "interno") => "normal",
    _ => "baixa",
};`,
        caption: 'Faixas, alternativas e negação convivendo no mesmo padrão de tupla.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Se um padrão combinado passar de uma linha confortável, ele provavelmente virou lógica de negócio disfarçada. Extraia para um método com nome — `EhUrgente(...)` comunica mais que qualquer combinação de `and` e `or`.',
      },
    ],
    quiz: [
      {
        id: 's08c03l04q1',
        type: 'single',
        prompt: 'Qual a diferença entre `and` de padrões e o operador `&&`?',
        options: [
          { id: 'a', text: '`and` combina padrões; `&&` combina expressões booleanas', correct: true },
          { id: 'b', text: '`and` não faz avaliação curto-circuitada' },
          { id: 'c', text: '`and` só funciona com números' },
          { id: 'd', text: 'São sinônimos exatos' },
        ],
        explanation:
          '`c is >= \'a\' and <= \'z\'` tem um único operando à esquerda do `is`. Com `&&` seriam duas expressões completas, cada uma repetindo o nome da variável.',
      },
      {
        id: 's08c03l04q2',
        type: 'single',
        prompt: 'Como `x is not 0 and < 10 or > 100` é agrupado?',
        options: [
          { id: 'a', text: '`((not 0) and (< 10)) or (> 100)`', correct: true },
          { id: 'b', text: '`not (0 and (< 10 or > 100))`' },
          { id: 'c', text: '`(not 0) and ((< 10) or (> 100))`' },
          { id: 'd', text: 'Não compila: parênteses são obrigatórios' },
        ],
        explanation:
          'A precedência é `not` > `and` > `or`, a mesma de `!`, `&&` e `||`. Parênteses continuam sendo a forma mais legível quando há dúvida.',
      },
      {
        id: 's08c03l04q3',
        type: 'single',
        prompt: 'Qual a vantagem prática de `c is >= \'a\' and <= \'z\'` sobre `c >= \'a\' && c <= \'z\'`?',
        options: [
          { id: 'a', text: 'A variável é escrita uma vez só, eliminando a chance de trocá-la na segunda comparação', correct: true },
          { id: 'b', text: 'É mais rápido em tempo de execução' },
          { id: 'c', text: 'Permite comparar tipos diferentes' },
          { id: 'd', text: 'Funciona com `null`' },
        ],
        explanation:
          'O bug de `a.X >= 0 && b.X <= 10` numa condição longa é invisível na revisão. Com padrões ele deixa de ser possível de escrever.',
      },
    ],
    challenge: {
      brief:
        'Implemente um roteador de chamados que combina prioridade, origem e status usando `and`, `or` e `not`, mais um validador de senha e um classificador de caracteres.',
      requirements: [
        'Use padrões lógicos; nada de `&&`, `||` ou `!` nas condições que puderem ser padrões.',
        '`Classificar` opera sobre a tupla `(prioridade, origem, aberto)`.',
        '`TipoDeCaractere` distingue vogal, consoante, dígito, pontuação e outros.',
        '`ForcaDaSenha` combina faixas de tamanho com presença de tipos de caractere.',
        '`EhFimDeSemana` usa `or` sobre valores de `DayOfWeek`.',
        '`Fora` usa `not` sobre uma faixa combinada.',
      ],
      starterCode: `using System;

class Program
{
    static string Classificar(int prioridade, string origem, bool aberto)
    {
        // TODO: use (prioridade, origem, aberto) switch com and/or/not
        //  - fechado (aberto false)                       -> "arquivado"
        //  - prioridade 1 ou 2, origem cliente/suporte    -> "urgente"
        //  - prioridade 1 ou 2, outra origem              -> "alta"
        //  - prioridade 3 ou 4, origem diferente de interno -> "normal"
        //  - resto                                        -> "baixa"
        return "";
    }

    static string TipoDeCaractere(char c) => c switch
    {
        // TODO: vogal, consoante, digito, pontuacao (. , ; : ! ?), outro
        _ => "",
    };

    static string ForcaDaSenha(string senha)
    {
        bool temLetra = false;
        bool temDigito = false;
        bool temSimbolo = false;

        foreach (char c in senha)
        {
            if (c is >= 'a' and <= 'z' or >= 'A' and <= 'Z')
            {
                temLetra = true;
            }
            else if (c is >= '0' and <= '9')
            {
                temDigito = true;
            }
            else
            {
                temSimbolo = true;
            }
        }

        // TODO: use (senha.Length, temLetra, temDigito, temSimbolo) switch
        //  - tamanho < 6                                -> "fraca"
        //  - tamanho >= 12 e os tres tipos              -> "muito forte"
        //  - letra e digito e (tamanho >= 8)            -> "forte"
        //  - letra e digito                             -> "media"
        //  - resto                                      -> "fraca"
        return "";
    }

    static bool EhFimDeSemana(DayOfWeek dia)
    {
        // TODO: use "is" com or
        return false;
    }

    static bool Fora(int valor)
    {
        // TODO: use "is not" sobre a faixa 0 a 100 inclusive
        return false;
    }

    static void Main()
    {
        Console.WriteLine($"a: {Classificar(1, "cliente", true)}");
        Console.WriteLine($"b: {Classificar(2, "parceiro", true)}");
        Console.WriteLine($"c: {Classificar(3, "cliente", true)}");
        Console.WriteLine($"d: {Classificar(4, "interno", true)}");
        Console.WriteLine($"e: {Classificar(7, "cliente", true)}");
        Console.WriteLine($"f: {Classificar(1, "cliente", false)}");

        foreach (char c in new[] { 'a', 'b', '5', '!', '#' })
        {
            Console.WriteLine($"caractere {c}: {TipoDeCaractere(c)}");
        }

        foreach (string senha in new[] { "abc", "abcdef", "abc123", "abcde123", "abcde123456!" })
        {
            Console.WriteLine($"senha {senha}: {ForcaDaSenha(senha)}");
        }

        foreach (DayOfWeek d in new[] { DayOfWeek.Monday, DayOfWeek.Saturday, DayOfWeek.Sunday })
        {
            Console.WriteLine($"fim de semana {d}: {EhFimDeSemana(d)}");
        }

        foreach (int v in new[] { -5, 0, 50, 100, 101 })
        {
            Console.WriteLine($"fora {v}: {Fora(v)}");
        }
    }
}`,
      solution: `using System;

class Program
{
    static string Classificar(int prioridade, string origem, bool aberto)
    {
        return (prioridade, origem, aberto) switch
        {
            (_, _, false) => "arquivado",
            (1 or 2, "cliente" or "suporte", _) => "urgente",
            (1 or 2, _, _) => "alta",
            (3 or 4, not "interno", _) => "normal",
            _ => "baixa",
        };
    }

    static string TipoDeCaractere(char c) => c switch
    {
        'a' or 'e' or 'i' or 'o' or 'u' => "vogal",
        >= 'a' and <= 'z' => "consoante",
        >= '0' and <= '9' => "digito",
        '.' or ',' or ';' or ':' or '!' or '?' => "pontuacao",
        _ => "outro",
    };

    static string ForcaDaSenha(string senha)
    {
        bool temLetra = false;
        bool temDigito = false;
        bool temSimbolo = false;

        foreach (char c in senha)
        {
            if (c is >= 'a' and <= 'z' or >= 'A' and <= 'Z')
            {
                temLetra = true;
            }
            else if (c is >= '0' and <= '9')
            {
                temDigito = true;
            }
            else
            {
                temSimbolo = true;
            }
        }

        return (senha.Length, temLetra, temDigito, temSimbolo) switch
        {
            ( < 6, _, _, _) => "fraca",
            ( >= 12, true, true, true) => "muito forte",
            ( >= 8, true, true, _) => "forte",
            (_, true, true, _) => "media",
            _ => "fraca",
        };
    }

    static bool EhFimDeSemana(DayOfWeek dia)
    {
        return dia is DayOfWeek.Saturday or DayOfWeek.Sunday;
    }

    static bool Fora(int valor)
    {
        return valor is not ( >= 0 and <= 100);
    }

    static void Main()
    {
        Console.WriteLine($"a: {Classificar(1, "cliente", true)}");
        Console.WriteLine($"b: {Classificar(2, "parceiro", true)}");
        Console.WriteLine($"c: {Classificar(3, "cliente", true)}");
        Console.WriteLine($"d: {Classificar(4, "interno", true)}");
        Console.WriteLine($"e: {Classificar(7, "cliente", true)}");
        Console.WriteLine($"f: {Classificar(1, "cliente", false)}");

        foreach (char c in new[] { 'a', 'b', '5', '!', '#' })
        {
            Console.WriteLine($"caractere {c}: {TipoDeCaractere(c)}");
        }

        foreach (string senha in new[] { "abc", "abcdef", "abc123", "abcde123", "abcde123456!" })
        {
            Console.WriteLine($"senha {senha}: {ForcaDaSenha(senha)}");
        }

        foreach (DayOfWeek d in new[] { DayOfWeek.Monday, DayOfWeek.Saturday, DayOfWeek.Sunday })
        {
            Console.WriteLine($"fim de semana {d}: {EhFimDeSemana(d)}");
        }

        foreach (int v in new[] { -5, 0, 50, 100, 101 })
        {
            Console.WriteLine($"fora {v}: {Fora(v)}");
        }
    }
}`,
      hints: [
        'O braço `(_, _, false) => "arquivado"` precisa vir primeiro: ele vale independentemente da prioridade e da origem.',
        'Em `TipoDeCaractere`, as vogais vêm antes de `>= \'a\' and <= \'z\'` — senão todas cairiam em "consoante".',
        '`valor is not (>= 0 and <= 100)` precisa dos parênteses: sem eles, `not` se aplicaria só ao primeiro padrão.',
        'Em `ForcaDaSenha`, a tupla de quatro componentes deixa cada regra numa linha, com `_` onde o componente não importa.',
      ],
      tests: [
        {
          name: 'Padrões lógicos combinados',
          expectedStdout:
            'a: urgente\nb: alta\nc: normal\nd: baixa\ne: baixa\nf: arquivado\n' +
            'caractere a: vogal\ncaractere b: consoante\ncaractere 5: digito\n' +
            'caractere !: pontuacao\ncaractere #: outro\n' +
            'senha abc: fraca\nsenha abcdef: fraca\nsenha abc123: media\n' +
            'senha abcde123: forte\nsenha abcde123456!: muito forte\n' +
            'fim de semana Monday: False\nfim de semana Saturday: True\nfim de semana Sunday: True\n' +
            'fora -5: True\nfora 0: False\nfora 50: False\nfora 100: False\nfora 101: True',
        },
      ],
    },
  },

  {
    id: 's08c03l05',
    title: 'Padrões de propriedade',
    objective: 'Testar propriedades de um objeto dentro do padrão, incluindo propriedades aninhadas.',
    concept: [
      {
        kind: 'text',
        body:
          'Um **padrão de propriedade** examina o conteúdo de um objeto, não apenas o tipo dele. A sintaxe são chaves com pares `Propriedade: padrão`.',
      },
      {
        kind: 'code',
        code: `static string Frete(Pedido p) => p switch
{
    { Status: "cancelado" } => "sem frete",
    { Total: > 200, Itens: > 1 } => "gratis",
    { Total: > 200 } => "gratis unitario",
    { Cliente: "vip" } => "cortesia",
    _ => "padrao",
};`,
        caption: 'Vírgulas dentro das chaves significam **e**: todas as propriedades listadas precisam casar.',
      },
      {
        kind: 'output',
        code: `(ana, 300, 3, novo)         -> gratis
(ana, 300, 1, novo)         -> gratis unitario
(vip, 50, 1, novo)          -> cortesia
(ana, 500, 5, cancelado)    -> sem frete
(ana, 10, 1, novo)          -> padrao`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A grande vantagem sobre uma cadeia de `if` é a leitura: cada braço descreve **uma forma de pedido**, e as regras ficam empilhadas em ordem de prioridade. A lógica de negócio vira uma tabela.',
      },
      {
        kind: 'text',
        body:
          'O valor de cada propriedade é um **padrão completo**, então tudo do capítulo cabe ali dentro: relacionais, lógicos, de tipo e até outros padrões de propriedade.',
      },
      {
        kind: 'code',
        code: `p switch
{
    { Total: >= 100 and < 500 } => "faixa media",
    { Status: "novo" or "pendente" } => "em aberto",
    { Cliente: not null } => "identificado",
    { Itens: 0 } => "vazio",
}`,
      },
      {
        kind: 'text',
        body:
          'Para descer em objetos aninhados existem duas formas equivalentes. A segunda, com ponto, é mais recente e bem mais curta.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Aninhado com chaves',
          code: `c switch
{
    { Endereco: { Uf: "PE" } } => "PE",
    _ => "outro",
}`,
        },
        right: {
          label: 'Propriedade estendida',
          code: `c switch
{
    { Endereco.Uf: "PE" } => "PE",
    _ => "outro",
}`,
        },
        note: 'As duas fazem exatamente a mesma coisa. Em três ou quatro níveis, a da direita é a única legível.',
      },
      {
        kind: 'code',
        code: `static string Regiao(Cliente c) => c switch
{
    { Endereco.Uf: "PE" or "BA" or "CE" } => "nordeste",
    { Endereco.Uf: "SP" or "RJ" or "MG" } => "sudeste",
    { Endereco.Uf: "RS" } => "sul",
    _ => "outra",
};`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um padrão de propriedade **não casa com `null`**. `{ Endereco.Uf: "PE" }` é seguro mesmo se `Endereco` for nulo: o padrão simplesmente não casa, sem lançar. É uma navegação segura embutida.',
      },
      {
        kind: 'text',
        body:
          'Também dá para capturar o valor de uma propriedade com `var`, para usá-lo no resultado do braço.',
      },
      {
        kind: 'code',
        code: `c switch
{
    { Endereco.Cidade: var cidade } when cidade.StartsWith("Nova") => $"cidade nova: {cidade}",
    { Idade: var idade and >= 60 } => $"idoso de {idade}",
    _ => "comum",
}`,
        caption: '`var idade and >= 60` captura **e** testa no mesmo padrão.',
      },
      {
        kind: 'text',
        body:
          'O padrão vazio `{ }` casa com qualquer objeto **não nulo**. É uma forma concisa de dizer "existe alguma coisa aqui", e às vezes lê melhor que `not null`.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Ordene os braços da regra mais específica para a mais geral, exatamente como você ordenaria os `if`. A diferença é que aqui o compilador consegue avisar quando um braço ficou inalcançável.',
      },
    ],
    quiz: [
      {
        id: 's08c03l05q1',
        type: 'single',
        prompt: 'O que `{ Total: > 200, Itens: > 1 }` exige?',
        options: [
          { id: 'a', text: 'Que as duas condições sejam verdadeiras ao mesmo tempo', correct: true },
          { id: 'b', text: 'Que pelo menos uma seja verdadeira' },
          { id: 'c', text: 'Que `Total` e `Itens` sejam iguais' },
          { id: 'd', text: 'Que o objeto tenha exatamente essas duas propriedades' },
        ],
        explanation:
          'A vírgula dentro das chaves é conjunção. Para alternativa, use `or` entre padrões completos: `{ Total: > 200 } or { Itens: > 5 }`.',
      },
      {
        id: 's08c03l05q2',
        type: 'single',
        prompt: 'O que acontece com `{ Endereco.Uf: "PE" }` quando `Endereco` é `null`?',
        options: [
          { id: 'a', text: 'O padrão simplesmente não casa, sem lançar exceção', correct: true },
          { id: 'b', text: 'É lançada `NullReferenceException`' },
          { id: 'c', text: 'O padrão casa, porque `null` é ignorado' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          'A navegação segura é embutida em padrões de propriedade. É uma diferença importante em relação a escrever `c.Endereco.Uf == "PE"` num `if`.',
      },
      {
        id: 's08c03l05q3',
        type: 'single',
        prompt: 'O que o padrão `{ }` casa?',
        options: [
          { id: 'a', text: 'Qualquer objeto não nulo', correct: true },
          { id: 'b', text: 'Apenas objetos sem propriedades' },
          { id: 'c', text: 'Apenas `null`' },
          { id: 'd', text: 'Absolutamente qualquer valor, inclusive `null`' },
        ],
        explanation:
          'Ele testa zero propriedades, mas ainda exige que exista um objeto. `{ }` e `not null` são equivalentes — o segundo costuma ser mais claro.',
      },
    ],
    challenge: {
      brief:
        'Escreva o motor de regras de uma seguradora: classifique apólices por perfil do cliente, endereço e histórico, usando padrões de propriedade com aninhamento e captura.',
      requirements: [
        'Use padrões de propriedade em expressão switch; nada de acesso encadeado dentro de `if`.',
        'Use a forma estendida `{ A.B: padrao }` para propriedades aninhadas.',
        'Nenhum braço pode lançar quando `Endereco` for `null`.',
        '`Risco` combina idade, região e sinistros.',
        '`Desconto` captura um valor com `var` e o usa no resultado.',
        '`Situacao` usa o padrão `{ }` para distinguir presença de ausência.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

record Endereco(string Cidade, string Uf);
record Historico(int Sinistros, int AnosSemSinistro);
record Apolice(string Titular, int Idade, Endereco Endereco, Historico Historico, decimal Valor);

class Program
{
    static string Risco(Apolice a) => a switch
    {
        // TODO
        //  - Historico.Sinistros > 3                                  -> "muito alto"
        //  - Idade < 25 e Historico.Sinistros > 0                     -> "alto"
        //  - Idade < 25                                               -> "medio"
        //  - Endereco.Uf "SP" ou "RJ" e Historico.Sinistros > 1       -> "alto"
        //  - Historico.AnosSemSinistro >= 5                           -> "baixo"
        //  - resto                                                    -> "medio"
        _ => "",
    };

    static string Desconto(Apolice a) => a switch
    {
        // TODO
        //  - Historico.AnosSemSinistro capturado e >= 10  -> "30% por <n> anos limpos"
        //  - Historico.AnosSemSinistro capturado e >= 5   -> "15% por <n> anos limpos"
        //  - Idade capturada e >= 60                      -> "10% senior aos <n>"
        //  - resto                                        -> "sem desconto"
        _ => "",
    };

    static string Situacao(Apolice a) => a switch
    {
        // TODO
        //  - a nulo                        -> "inexistente"
        //  - Endereco nulo                 -> "endereco pendente"
        //  - Historico nulo                -> "historico pendente"
        //  - Valor <= 0                    -> "sem cobertura"
        //  - resto                         -> "ativa"
        _ => "",
    };

    static string Regiao(Apolice a) => a switch
    {
        // TODO: nordeste (PE, BA, CE), sudeste (SP, RJ, MG), sul (RS, SC, PR), outra
        _ => "",
    };

    static void Main()
    {
        var apolices = new List<Apolice>
        {
            new Apolice("Ana", 30, new Endereco("Recife", "PE"), new Historico(0, 12), 1500m),
            new Apolice("Bruno", 22, new Endereco("Sao Paulo", "SP"), new Historico(1, 0), 900m),
            new Apolice("Carla", 45, new Endereco("Rio", "RJ"), new Historico(4, 0), 2000m),
            new Apolice("Davi", 65, new Endereco("Curitiba", "PR"), new Historico(0, 3), 800m),
            new Apolice("Eva", 19, new Endereco("Salvador", "BA"), new Historico(0, 1), 700m),
            new Apolice("Fabio", 50, new Endereco("Sao Paulo", "SP"), new Historico(2, 0), 1100m),
            new Apolice("Gil", 40, null, new Historico(0, 6), 950m),
            new Apolice("Hugo", 35, new Endereco("Manaus", "AM"), null, 600m),
            new Apolice("Ivo", 28, new Endereco("Recife", "PE"), new Historico(0, 7), 0m),
        };

        foreach (Apolice a in apolices)
        {
            Console.WriteLine($"{a.Titular}: risco={Risco(a)} regiao={Regiao(a)} situacao={Situacao(a)}");
        }

        foreach (Apolice a in apolices)
        {
            Console.WriteLine($"{a.Titular}: {Desconto(a)}");
        }

        Console.WriteLine($"nula: {Situacao(null)}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

record Endereco(string Cidade, string Uf);
record Historico(int Sinistros, int AnosSemSinistro);
record Apolice(string Titular, int Idade, Endereco Endereco, Historico Historico, decimal Valor);

class Program
{
    static string Risco(Apolice a) => a switch
    {
        { Historico.Sinistros: > 3 } => "muito alto",
        { Idade: < 25, Historico.Sinistros: > 0 } => "alto",
        { Idade: < 25 } => "medio",
        { Endereco.Uf: "SP" or "RJ", Historico.Sinistros: > 1 } => "alto",
        { Historico.AnosSemSinistro: >= 5 } => "baixo",
        _ => "medio",
    };

    static string Desconto(Apolice a) => a switch
    {
        { Historico.AnosSemSinistro: var anos and >= 10 } => $"30% por {anos} anos limpos",
        { Historico.AnosSemSinistro: var anos and >= 5 } => $"15% por {anos} anos limpos",
        { Idade: var idade and >= 60 } => $"10% senior aos {idade}",
        _ => "sem desconto",
    };

    static string Situacao(Apolice a) => a switch
    {
        null => "inexistente",
        { Endereco: null } => "endereco pendente",
        { Historico: null } => "historico pendente",
        { Valor: <= 0 } => "sem cobertura",
        _ => "ativa",
    };

    static string Regiao(Apolice a) => a switch
    {
        { Endereco.Uf: "PE" or "BA" or "CE" } => "nordeste",
        { Endereco.Uf: "SP" or "RJ" or "MG" } => "sudeste",
        { Endereco.Uf: "RS" or "SC" or "PR" } => "sul",
        _ => "outra",
    };

    static void Main()
    {
        var apolices = new List<Apolice>
        {
            new Apolice("Ana", 30, new Endereco("Recife", "PE"), new Historico(0, 12), 1500m),
            new Apolice("Bruno", 22, new Endereco("Sao Paulo", "SP"), new Historico(1, 0), 900m),
            new Apolice("Carla", 45, new Endereco("Rio", "RJ"), new Historico(4, 0), 2000m),
            new Apolice("Davi", 65, new Endereco("Curitiba", "PR"), new Historico(0, 3), 800m),
            new Apolice("Eva", 19, new Endereco("Salvador", "BA"), new Historico(0, 1), 700m),
            new Apolice("Fabio", 50, new Endereco("Sao Paulo", "SP"), new Historico(2, 0), 1100m),
            new Apolice("Gil", 40, null, new Historico(0, 6), 950m),
            new Apolice("Hugo", 35, new Endereco("Manaus", "AM"), null, 600m),
            new Apolice("Ivo", 28, new Endereco("Recife", "PE"), new Historico(0, 7), 0m),
        };

        foreach (Apolice a in apolices)
        {
            Console.WriteLine($"{a.Titular}: risco={Risco(a)} regiao={Regiao(a)} situacao={Situacao(a)}");
        }

        foreach (Apolice a in apolices)
        {
            Console.WriteLine($"{a.Titular}: {Desconto(a)}");
        }

        Console.WriteLine($"nula: {Situacao(null)}");
    }
}`,
      hints: [
        'Um padrão de propriedade sobre um objeto nulo simplesmente não casa. Por isso `{ Historico.Sinistros: > 3 }` é seguro para a apólice do Hugo, cujo `Historico` é nulo.',
        '`{ Historico.AnosSemSinistro: var anos and >= 10 }` captura o valor em `anos` e o testa no mesmo padrão.',
        'Em `Situacao`, o braço `null` cobre a apólice inteira ausente; `{ Endereco: null }` cobre a propriedade ausente. São testes diferentes.',
        'Carla tem 4 sinistros: o primeiro braço de `Risco` vence antes de qualquer regra sobre UF.',
      ],
      tests: [
        {
          name: 'Motor de regras da seguradora',
          expectedStdout:
            'Ana: risco=baixo regiao=nordeste situacao=ativa\n' +
            'Bruno: risco=alto regiao=sudeste situacao=ativa\n' +
            'Carla: risco=muito alto regiao=sudeste situacao=ativa\n' +
            'Davi: risco=medio regiao=sul situacao=ativa\n' +
            'Eva: risco=medio regiao=nordeste situacao=ativa\n' +
            'Fabio: risco=alto regiao=sudeste situacao=ativa\n' +
            'Gil: risco=baixo regiao=outra situacao=endereco pendente\n' +
            'Hugo: risco=medio regiao=outra situacao=historico pendente\n' +
            'Ivo: risco=baixo regiao=nordeste situacao=sem cobertura\n' +
            'Ana: 30% por 12 anos limpos\n' +
            'Bruno: sem desconto\n' +
            'Carla: sem desconto\n' +
            'Davi: 10% senior aos 65\n' +
            'Eva: sem desconto\n' +
            'Fabio: sem desconto\n' +
            'Gil: 15% por 6 anos limpos\n' +
            'Hugo: sem desconto\n' +
            'Ivo: 15% por 7 anos limpos\n' +
            'nula: inexistente',
        },
      ],
    },
  },

  {
    id: 's08c03l06',
    title: 'Padrões posicionais',
    objective: 'Casar um objeto pela posição dos seus componentes, aproveitando `Deconstruct` e tuplas.',
    concept: [
      {
        kind: 'text',
        body:
          'Um **padrão posicional** usa parênteses e testa os componentes **pela ordem**, não pelo nome. Ele funciona sobre qualquer tipo que tenha `Deconstruct` — e todo `record` posicional tem um de graça.',
      },
      {
        kind: 'code',
        code: `record Circulo(double Raio) : Forma;
record Retangulo(double Largura, double Altura) : Forma;

static string Descrever(Forma f) => f switch
{
    Circulo(0) => "ponto",
    Circulo(var r) => $"circulo {r}",
    Retangulo(var l, var a) when l == a => $"quadrado {l}",
    Retangulo(var l, var a) => $"retangulo {l}x{a}",
    _ => "outra",
};`,
        caption: '`Circulo(0)` casa quando o primeiro componente vale zero. Nenhum nome de propriedade aparece.',
      },
      {
        kind: 'output',
        code: `Circulo(0)         -> ponto
Circulo(5)         -> circulo 5
Retangulo(3, 3)    -> quadrado 3
Retangulo(3, 4)    -> retangulo 3x4`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'É o mesmo `Deconstruct` da lição 9 do capítulo anterior. Adicionar um `Deconstruct` a uma classe sua não dá só a desconstrução em variáveis: dá também padrões posicionais no `switch`.',
      },
      {
        kind: 'text',
        body:
          'Cada posição aceita **qualquer padrão**: constante, relacional, lógico, de tipo, `var` para capturar, ou `_` para ignorar.',
      },
      {
        kind: 'table',
        headers: ['Padrão na posição', 'Significa'],
        rows: [
          ['`0`', 'o componente vale exatamente zero'],
          ['`> 100`', 'o componente é maior que 100'],
          ['`var r`', 'captura o componente em `r`, sem testar'],
          ['`_`', 'ignora o componente'],
          ['`"a" or "b"`', 'o componente é um dos dois valores'],
          ['`not null`', 'o componente não é nulo'],
        ],
      },
      {
        kind: 'text',
        body:
          'O uso mais comum não envolve `Deconstruct` nenhum: é o padrão sobre uma **tupla montada na hora**, para decidir a partir de duas ou três variáveis ao mesmo tempo.',
      },
      {
        kind: 'code',
        code: `static string Resultado(int golsCasa, int golsFora) => (golsCasa, golsFora) switch
{
    (0, 0) => "empate sem gols",
    var (c, f) when c == f => "empate",
    ( > 3, _) => "goleada da casa",
    (_, > 3) => "goleada de fora",
    var (c, f) when c > f => "vitoria da casa",
    _ => "vitoria de fora",
};`,
        caption: 'Uma tabela de decisão sobre duas variáveis, sem nenhum `if` aninhado.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Esse é o padrão de tupla que você já usou nas lições 3 e 4 deste capítulo. Ele é a ferramenta certa sempre que a decisão depende de **mais de uma** variável — e substitui muito `if` encadeado.',
      },
      {
        kind: 'text',
        body:
          'A ordem dos componentes é a do `Deconstruct`, e não a de declaração das propriedades — quando existem várias sobrecargas, a **quantidade** de posições escolhe qual será usada.',
      },
      {
        kind: 'compare',
        good: `// posicional: bom quando a ordem
// e obvia e estavel
Ponto(0, 0) => "origem",
Ponto(var x, 0) => $"eixo X em {x}",`,
        bad: `// posicional com muitos componentes:
// quem lembra o que e a 4a posicao?
Config(_, _, _, true, _) => "ativo",`,
        goodLabel: 'Duas ou três posições',
        badLabel: 'Cinco posições',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Acima de três componentes, prefira o padrão de **propriedade**: `{ Ativo: true }` diz o que está sendo testado; `(_, _, _, true, _)` obriga o leitor a contar vírgulas.',
      },
      {
        kind: 'text',
        body:
          'Os dois estilos podem ser combinados no mesmo padrão: posicional para os primeiros componentes, propriedade para o resto.',
      },
      {
        kind: 'code',
        code: `p switch
{
    Retangulo(var l, var a) { Cor: "vermelho" } => $"retangulo vermelho {l}x{a}",
    Retangulo(0, _) => "sem largura",
    _ => "outro",
}`,
      },
    ],
    quiz: [
      {
        id: 's08c03l06q1',
        type: 'single',
        prompt: 'O que um tipo precisa ter para aceitar padrões posicionais?',
        options: [
          { id: 'a', text: 'Um método `Deconstruct` — que todo `record` posicional já tem', correct: true },
          { id: 'b', text: 'Implementar `IEnumerable`' },
          { id: 'c', text: 'Ser um `struct`' },
          { id: 'd', text: 'Sobrecarregar o operador `==`' },
        ],
        explanation:
          'O compilador traduz o padrão posicional numa chamada a `Deconstruct`. Por isso adicionar esse método a uma classe sua a torna utilizável em padrões.',
      },
      {
        id: 's08c03l06q2',
        type: 'single',
        prompt: 'Numa classe com `Deconstruct` de 2 e de 3 parâmetros, o que decide qual será usado?',
        options: [
          { id: 'a', text: 'A quantidade de posições escritas no padrão', correct: true },
          { id: 'b', text: 'Os tipos dos componentes' },
          { id: 'c', text: 'A ordem de declaração dos métodos' },
          { id: 'd', text: 'Sempre o de menos parâmetros' },
        ],
        explanation:
          'É a aridade, exatamente como na desconstrução em variáveis. `(a, b)` escolhe a sobrecarga de dois; `(a, b, c)` a de três.',
      },
      {
        id: 's08c03l06q3',
        type: 'single',
        prompt: 'Quando preferir padrão de propriedade a padrão posicional?',
        options: [
          { id: 'a', text: 'Quando há muitos componentes e a posição deixa de ser óbvia', correct: true },
          { id: 'b', text: 'Sempre: padrões posicionais são obsoletos' },
          { id: 'c', text: 'Quando o tipo é um `record`' },
          { id: 'd', text: 'Quando é preciso capturar valores' },
        ],
        explanation:
          '`(_, _, _, true, _)` exige contar vírgulas para entender. `{ Ativo: true }` se explica sozinho, e não quebra se a ordem dos componentes mudar.',
      },
    ],
    challenge: {
      brief:
        'Implemente um interpretador de jogadas e um classificador de formas usando padrões posicionais sobre `record`s e sobre tuplas montadas na hora.',
      requirements: [
        'Use padrões posicionais; não acesse propriedades por nome nos braços que puderem ser posicionais.',
        '`Resultado` opera sobre a tupla `(golsCasa, golsFora)`.',
        '`Descrever` classifica formas usando os componentes dos `record`s.',
        '`Movimento` recebe `(linha, coluna)` e classifica a casa do tabuleiro.',
        '`Intervalo` tem `Deconstruct` de 2 e de 3; os dois devem ser usados.',
        'Combine posicional com propriedade em ao menos um braço.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

abstract record Forma
{
    public string Cor { get; init; } = "preto";
}

record Circulo(double Raio) : Forma;
record Retangulo(double Largura, double Altura) : Forma;
record Triangulo(double A, double B, double C) : Forma;

class Intervalo
{
    public int Inicio { get; init; }
    public int Fim { get; init; }

    public void Deconstruct(out int inicio, out int fim)
    {
        inicio = Inicio;
        fim = Fim;
    }

    public void Deconstruct(out int inicio, out int fim, out int duracao)
    {
        inicio = Inicio;
        fim = Fim;
        duracao = Fim - Inicio;
    }
}

class Program
{
    static string Resultado(int golsCasa, int golsFora) => (golsCasa, golsFora) switch
    {
        // TODO
        //  (0,0) -> "empate sem gols"; iguais -> "empate"
        //  casa > 3 -> "goleada da casa"; fora > 3 -> "goleada de fora"
        //  casa > fora -> "vitoria da casa"; resto -> "vitoria de fora"
        _ => "",
    };

    static string Descrever(Forma f) => f switch
    {
        // TODO
        //  Circulo com raio 0                     -> "ponto"
        //  Retangulo vermelho                     -> "retangulo vermelho <l>x<a>" (posicional + propriedade)
        //  Retangulo com lados iguais             -> "quadrado <l>"
        //  Retangulo                              -> "retangulo <l>x<a>"
        //  Triangulo com tres lados iguais        -> "equilatero"
        //  Triangulo com dois lados iguais        -> "isosceles"
        //  Triangulo                              -> "escaleno"
        //  Circulo                                -> "circulo <r>"
        //  resto                                  -> "desconhecida"
        _ => "",
    };

    static string Movimento(int linha, int coluna) => (linha, coluna) switch
    {
        // TODO
        //  fora de 0..7 em qualquer eixo -> "invalido"
        //  (0,0) (0,7) (7,0) (7,7)       -> "canto"
        //  linha 0 ou 7, ou coluna 0 ou 7 -> "borda"
        //  resto                          -> "centro"
        _ => "",
    };

    static string Janela(Intervalo i) => i switch
    {
        // TODO: use o Deconstruct de 3 para "curta" (duracao < 4), "media" (< 9), "longa"
        //       e o de 2 para o caso inicio == fim -> "instantanea"
        _ => "",
    };

    static void Main()
    {
        (int, int)[] placares = { (0, 0), (2, 2), (5, 1), (1, 4), (3, 1), (1, 3) };

        foreach (var (casa, fora) in placares)
        {
            Console.WriteLine($"{casa}x{fora}: {Resultado(casa, fora)}");
        }

        var formas = new List<Forma>
        {
            new Circulo(0),
            new Circulo(2.5),
            new Retangulo(3, 3),
            new Retangulo(3, 4),
            new Retangulo(2, 5) { Cor = "vermelho" },
            new Triangulo(3, 3, 3),
            new Triangulo(3, 3, 5),
            new Triangulo(3, 4, 5),
        };

        foreach (Forma f in formas)
        {
            Console.WriteLine($"forma: {Descrever(f)}");
        }

        (int, int)[] casas = { (0, 0), (0, 7), (3, 0), (0, 4), (4, 4), (8, 1), (2, 9) };

        foreach (var (l, c) in casas)
        {
            Console.WriteLine($"({l},{c}): {Movimento(l, c)}");
        }

        var janelas = new List<Intervalo>
        {
            new Intervalo { Inicio = 5, Fim = 5 },
            new Intervalo { Inicio = 9, Fim = 11 },
            new Intervalo { Inicio = 8, Fim = 14 },
            new Intervalo { Inicio = 0, Fim = 20 },
        };

        foreach (Intervalo i in janelas)
        {
            Console.WriteLine($"janela {i.Inicio}-{i.Fim}: {Janela(i)}");
        }
    }
}`,
      solution: `using System;
using System.Collections.Generic;

abstract record Forma
{
    public string Cor { get; init; } = "preto";
}

record Circulo(double Raio) : Forma;
record Retangulo(double Largura, double Altura) : Forma;
record Triangulo(double A, double B, double C) : Forma;

class Intervalo
{
    public int Inicio { get; init; }
    public int Fim { get; init; }

    public void Deconstruct(out int inicio, out int fim)
    {
        inicio = Inicio;
        fim = Fim;
    }

    public void Deconstruct(out int inicio, out int fim, out int duracao)
    {
        inicio = Inicio;
        fim = Fim;
        duracao = Fim - Inicio;
    }
}

class Program
{
    static string Resultado(int golsCasa, int golsFora) => (golsCasa, golsFora) switch
    {
        (0, 0) => "empate sem gols",
        var (c, f) when c == f => "empate",
        ( > 3, _) => "goleada da casa",
        (_, > 3) => "goleada de fora",
        var (c, f) when c > f => "vitoria da casa",
        _ => "vitoria de fora",
    };

    static string Descrever(Forma f) => f switch
    {
        Circulo(0) => "ponto",
        Retangulo(var l, var a) { Cor: "vermelho" } => $"retangulo vermelho {l}x{a}",
        Retangulo(var l, var a) when l == a => $"quadrado {l}",
        Retangulo(var l, var a) => $"retangulo {l}x{a}",
        Triangulo(var x, var y, var z) when x == y && y == z => "equilatero",
        Triangulo(var x, var y, var z) when x == y || y == z || x == z => "isosceles",
        Triangulo => "escaleno",
        Circulo(var r) => $"circulo {r}",
        _ => "desconhecida",
    };

    static string Movimento(int linha, int coluna) => (linha, coluna) switch
    {
        ( < 0 or > 7, _) => "invalido",
        (_, < 0 or > 7) => "invalido",
        (0 or 7, 0 or 7) => "canto",
        (0 or 7, _) => "borda",
        (_, 0 or 7) => "borda",
        _ => "centro",
    };

    static string Janela(Intervalo i) => i switch
    {
        (var inicio, var fim) when inicio == fim => "instantanea",
        (_, _, < 4) => "curta",
        (_, _, < 9) => "media",
        _ => "longa",
    };

    static void Main()
    {
        (int, int)[] placares = { (0, 0), (2, 2), (5, 1), (1, 4), (3, 1), (1, 3) };

        foreach (var (casa, fora) in placares)
        {
            Console.WriteLine($"{casa}x{fora}: {Resultado(casa, fora)}");
        }

        var formas = new List<Forma>
        {
            new Circulo(0),
            new Circulo(2.5),
            new Retangulo(3, 3),
            new Retangulo(3, 4),
            new Retangulo(2, 5) { Cor = "vermelho" },
            new Triangulo(3, 3, 3),
            new Triangulo(3, 3, 5),
            new Triangulo(3, 4, 5),
        };

        foreach (Forma f in formas)
        {
            Console.WriteLine($"forma: {Descrever(f)}");
        }

        (int, int)[] casas = { (0, 0), (0, 7), (3, 0), (0, 4), (4, 4), (8, 1), (2, 9) };

        foreach (var (l, c) in casas)
        {
            Console.WriteLine($"({l},{c}): {Movimento(l, c)}");
        }

        var janelas = new List<Intervalo>
        {
            new Intervalo { Inicio = 5, Fim = 5 },
            new Intervalo { Inicio = 9, Fim = 11 },
            new Intervalo { Inicio = 8, Fim = 14 },
            new Intervalo { Inicio = 0, Fim = 20 },
        };

        foreach (Intervalo i in janelas)
        {
            Console.WriteLine($"janela {i.Inicio}-{i.Fim}: {Janela(i)}");
        }
    }
}`,
      hints: [
        '`Retangulo(var l, var a) { Cor: "vermelho" }` combina posicional e propriedade — e precisa vir antes dos braços de retângulo sem cor.',
        'Em `Janela`, o padrão de duas posições usa o `Deconstruct` de 2; o de três posições usa o outro. A quantidade de posições decide.',
        'Em `Movimento`, os dois braços de "invalido" vêm primeiro: qualquer eixo fora da faixa invalida a casa inteira.',
        '`Triangulo => "escaleno"` sem parênteses é um padrão de **tipo**, e serve de captura-tudo depois dos casos específicos.',
      ],
      tests: [
        {
          name: 'Padrões posicionais',
          expectedStdout:
            '0x0: empate sem gols\n2x2: empate\n5x1: goleada da casa\n1x4: goleada de fora\n' +
            '3x1: vitoria da casa\n1x3: vitoria de fora\n' +
            'forma: ponto\nforma: circulo 2.5\nforma: quadrado 3\nforma: retangulo 3x4\n' +
            'forma: retangulo vermelho 2x5\nforma: equilatero\nforma: isosceles\nforma: escaleno\n' +
            '(0,0): canto\n(0,7): canto\n(3,0): borda\n(0,4): borda\n(4,4): centro\n' +
            '(8,1): invalido\n(2,9): invalido\n' +
            'janela 5-5: instantanea\njanela 9-11: curta\njanela 8-14: media\njanela 0-20: longa',
        },
      ],
    },
  },

  {
    id: 's08c03l07',
    title: 'Padrões de lista',
    objective: 'Casar sequências pela forma: quantidade, elementos das pontas e o miolo variável.',
    concept: [
      {
        kind: 'text',
        body:
          'Um **padrão de lista** descreve a forma de um array ou lista com colchetes. Cada posição é um padrão, e `..` representa "qualquer quantidade de elementos aqui".',
      },
      {
        kind: 'code',
        code: `static string Descrever(int[] itens) => itens switch
{
    [] => "vazio",
    [var unico] => $"um: {unico}",
    [var primeiro, var segundo] => $"dois: {primeiro},{segundo}",
    [1, .., 9] => "comeca 1 termina 9",
    [var p, .. var meio, var u] => $"{p}..{u} com {meio.Length} no meio",
};`,
        caption: 'Os braços vão do mais restritivo ao mais amplo — a mesma regra de sempre.',
      },
      {
        kind: 'output',
        code: `[]              -> vazio
[7]             -> um: 7
[7, 8]          -> dois: 7,8
[1, 5, 5, 9]    -> comeca 1 termina 9
[2, 5, 5, 8]    -> 2..8 com 2 no meio`,
      },
      {
        kind: 'text',
        body: 'Os elementos de um padrão de lista aceitam tudo o que você já conhece:',
      },
      {
        kind: 'table',
        headers: ['Padrão', 'Casa com'],
        rows: [
          ['`[]`', 'sequência vazia'],
          ['`[_]`', 'exatamente um elemento, qualquer'],
          ['`[_, _, _]`', 'exatamente três elementos'],
          ['`[0, ..]`', 'começa com zero, qualquer tamanho'],
          ['`[.., 0]`', 'termina com zero'],
          ['`[1, .., 9]`', 'começa com 1 e termina com 9'],
          ['`[.. var resto]`', 'captura tudo em `resto`'],
          ['`[> 0, > 0]`', 'dois elementos, ambos positivos'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Só pode haver **um** `..` por padrão. `[.., 5, ..]` não compila — com dois trechos variáveis o casamento seria ambíguo.',
      },
      {
        kind: 'text',
        body:
          'O `..` pode capturar o trecho que ele representa, com `.. var nome`. O tipo do capturado depende da fonte: num `int[]` é `int[]`; numa `List<T>`, `List<T>`.',
      },
      {
        kind: 'code',
        code: `if (comando is [var verbo, .. var argumentos])
{
    Console.WriteLine($"verbo: {verbo}");
    Console.WriteLine($"argumentos: {argumentos.Length}");
}`,
        caption: 'É o formato clássico de um interpretador de comandos: primeira palavra é o verbo, o resto são argumentos.',
      },
      {
        kind: 'text',
        body:
          'Para que um tipo aceite padrões de lista, ele precisa de um `Count` (ou `Length`) e de um indexador `int`. Arrays, `List<T>`, `string` e `Span<T>` atendem.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Isso funciona para `string` também, mas com um detalhe: os elementos são `char`. `texto is [\'a\', ..]` testa se o texto começa com a letra `a`.',
      },
      {
        kind: 'text',
        body:
          'A aplicação mais direta é validar formatos: uma linha de CSV, um comando digitado, uma coordenada em três partes.',
      },
      {
        kind: 'code',
        code: `static string Interpretar(string[] partes) => partes switch
{
    [] => "comando vazio",
    ["sair"] => "encerrando",
    ["ajuda", ..] => "exibindo ajuda",
    ["mover", var direcao] => $"movendo para {direcao}",
    ["mover", var direcao, var passos] => $"movendo {passos} para {direcao}",
    [var desconhecido, ..] => $"comando desconhecido: {desconhecido}",
};`,
      },
      {
        kind: 'compare',
        good: `partes switch
{
    ["mover", var d] => ...,
    ["mover", var d, var n] => ...,
}`,
        bad: `if (partes.Length >= 1 && partes[0] == "mover")
{
    if (partes.Length == 2) { ... }
    else if (partes.Length == 3) { ... }
}`,
        goodLabel: 'A forma descreve o comando',
        badLabel: 'Verificar tamanho e indexar',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A grande vantagem é não indexar manualmente. `partes[2]` só é seguro depois de conferir `Length`; num padrão de lista, a posição só existe se o padrão casou — o `IndexOutOfRangeException` deixa de ser possível.',
      },
    ],
    quiz: [
      {
        id: 's08c03l07q1',
        type: 'single',
        prompt: 'O que `[1, .., 9]` casa?',
        options: [
          { id: 'a', text: 'Qualquer sequência que comece com 1 e termine com 9, de tamanho 2 ou mais', correct: true },
          { id: 'b', text: 'Exatamente a sequência `[1, 9]`' },
          { id: 'c', text: 'Qualquer sequência que contenha 1 e 9' },
          { id: 'd', text: 'Sequências de exatamente três elementos' },
        ],
        explanation:
          'O `..` representa zero ou mais elementos, então `[1, 9]` também casa. O que importa é o primeiro e o último.',
      },
      {
        id: 's08c03l07q2',
        type: 'single',
        prompt: 'Por que `[.., 5, ..]` não compila?',
        options: [
          { id: 'a', text: 'Só pode haver um `..` por padrão; com dois o casamento seria ambíguo', correct: true },
          { id: 'b', text: 'Porque `5` precisa vir na primeira posição' },
          { id: 'c', text: 'Porque `..` não pode ser usado com constantes' },
          { id: 'd', text: 'Compila normalmente' },
        ],
        explanation:
          'Com dois trechos variáveis, um `5` no meio poderia ser casado de várias formas. A linguagem elimina a ambiguidade permitindo um só.',
      },
      {
        id: 's08c03l07q3',
        type: 'single',
        prompt: 'O que um tipo precisa para aceitar padrões de lista?',
        options: [
          { id: 'a', text: 'Um `Count` ou `Length` e um indexador que aceite `int`', correct: true },
          { id: 'b', text: 'Implementar `IList<T>`' },
          { id: 'c', text: 'Ser um array' },
          { id: 'd', text: 'Ter um método `Deconstruct`' },
        ],
        explanation:
          'É a mesma exigência dos operadores de índice e faixa. Por isso arrays, `List<T>`, `string` e `Span<T>` funcionam, mas `IEnumerable<T>` não.',
      },
    ],
    challenge: {
      brief:
        'Escreva o interpretador de um terminal de jogo: reconheça comandos pela forma da lista de palavras, valide coordenadas e classifique sequências numéricas.',
      requirements: [
        'Use padrões de lista; nada de checar `Length` seguido de indexação manual.',
        '`Interpretar` reconhece `sair`, `ajuda` com ou sem tópico, `mover` com uma ou duas partes, e o desconhecido.',
        '`Coordenada` valida listas de exatamente 2 ou 3 números, todos não negativos.',
        '`Sequencia` classifica arrays por forma: vazio, unitário, extremos iguais, crescente nas pontas.',
        '`Prefixo` usa padrão de lista sobre `string` para detectar iniciais.',
        'Nenhum acesso por índice fora de um padrão que já garantiu a posição.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static string Interpretar(string[] partes) => partes switch
    {
        // TODO
        //  []                          -> "comando vazio"
        //  ["sair"]                    -> "encerrando"
        //  ["ajuda"]                   -> "ajuda geral"
        //  ["ajuda", topico]           -> "ajuda sobre <topico>"
        //  ["mover", direcao]          -> "movendo para <direcao>"
        //  ["mover", direcao, passos]  -> "movendo <passos> para <direcao>"
        //  ["mover", ..]               -> "mover recebe 1 ou 2 argumentos"
        //  [verbo, ..]                 -> "comando desconhecido: <verbo>"
        _ => "",
    };

    static string Coordenada(int[] valores) => valores switch
    {
        // TODO
        //  [x, y] com ambos >= 0        -> "2D (<x>,<y>)"
        //  [x, y, z] com todos >= 0     -> "3D (<x>,<y>,<z>)"
        //  [..] contendo negativo       -> "coordenada negativa"
        //  resto                        -> "dimensao invalida"
        _ => "",
    };

    static string Sequencia(int[] n) => n switch
    {
        // TODO
        //  []                       -> "vazia"
        //  [unico]                  -> "unitaria: <unico>"
        //  [p, .., u] com p == u     -> "extremos iguais em <p>"
        //  [p, .. meio, u] com p < u -> "cresce de <p> a <u> com <meio.Length> no meio"
        //  [p, .., u]               -> "decresce de <p> a <u>"
        _ => "",
    };

    static string Prefixo(string texto) => texto switch
    {
        // TODO
        //  ""                 -> "vazio"
        //  ['#', ..]          -> "comentario"
        //  ['-', '-', ..]     -> "opcao longa"
        //  ['-', ..]          -> "opcao curta"
        //  [.., ':']          -> "rotulo"
        //  _                  -> "texto comum"
        _ => "",
    };

    static void Main()
    {
        string[][] comandos =
        {
            new string[0],
            new[] { "sair" },
            new[] { "ajuda" },
            new[] { "ajuda", "combate" },
            new[] { "mover", "norte" },
            new[] { "mover", "norte", "3" },
            new[] { "mover", "norte", "3", "rapido" },
            new[] { "voar", "alto" },
        };

        foreach (string[] c in comandos)
        {
            Console.WriteLine($"comando: {Interpretar(c)}");
        }

        int[][] coordenadas =
        {
            new[] { 3, 4 },
            new[] { 1, 2, 3 },
            new[] { -1, 5 },
            new[] { 1 },
            new[] { 1, 2, 3, 4 },
        };

        foreach (int[] c in coordenadas)
        {
            Console.WriteLine($"coordenada: {Coordenada(c)}");
        }

        int[][] sequencias =
        {
            new int[0],
            new[] { 5 },
            new[] { 3, 9, 1, 3 },
            new[] { 2, 7, 7, 8 },
            new[] { 9, 4, 1 },
        };

        foreach (int[] s in sequencias)
        {
            Console.WriteLine($"sequencia: {Sequencia(s)}");
        }

        foreach (string t in new[] { "", "# nota", "--verbose", "-v", "titulo:", "comum" })
        {
            Console.WriteLine($"prefixo [{t}]: {Prefixo(t)}");
        }
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static string Interpretar(string[] partes) => partes switch
    {
        [] => "comando vazio",
        ["sair"] => "encerrando",
        ["ajuda"] => "ajuda geral",
        ["ajuda", var topico] => $"ajuda sobre {topico}",
        ["mover", var direcao] => $"movendo para {direcao}",
        ["mover", var direcao, var passos] => $"movendo {passos} para {direcao}",
        ["mover", ..] => "mover recebe 1 ou 2 argumentos",
        [var verbo, ..] => $"comando desconhecido: {verbo}",
    };

    static string Coordenada(int[] valores) => valores switch
    {
        [ >= 0, >= 0] => $"2D ({valores[0]},{valores[1]})",
        [ >= 0, >= 0, >= 0] => $"3D ({valores[0]},{valores[1]},{valores[2]})",
        [_, _] or [_, _, _] => "coordenada negativa",
        _ => "dimensao invalida",
    };

    static string Sequencia(int[] n) => n switch
    {
        [] => "vazia",
        [var unico] => $"unitaria: {unico}",
        [var p, .., var u] when p == u => $"extremos iguais em {p}",
        [var p, .. var meio, var u] when p < u => $"cresce de {p} a {u} com {meio.Length} no meio",
        [var p, .., var u] => $"decresce de {p} a {u}",
    };

    static string Prefixo(string texto) => texto switch
    {
        [] => "vazio",
        ['#', ..] => "comentario",
        ['-', '-', ..] => "opcao longa",
        ['-', ..] => "opcao curta",
        [.., ':'] => "rotulo",
        _ => "texto comum",
    };

    static void Main()
    {
        string[][] comandos =
        {
            new string[0],
            new[] { "sair" },
            new[] { "ajuda" },
            new[] { "ajuda", "combate" },
            new[] { "mover", "norte" },
            new[] { "mover", "norte", "3" },
            new[] { "mover", "norte", "3", "rapido" },
            new[] { "voar", "alto" },
        };

        foreach (string[] c in comandos)
        {
            Console.WriteLine($"comando: {Interpretar(c)}");
        }

        int[][] coordenadas =
        {
            new[] { 3, 4 },
            new[] { 1, 2, 3 },
            new[] { -1, 5 },
            new[] { 1 },
            new[] { 1, 2, 3, 4 },
        };

        foreach (int[] c in coordenadas)
        {
            Console.WriteLine($"coordenada: {Coordenada(c)}");
        }

        int[][] sequencias =
        {
            new int[0],
            new[] { 5 },
            new[] { 3, 9, 1, 3 },
            new[] { 2, 7, 7, 8 },
            new[] { 9, 4, 1 },
        };

        foreach (int[] s in sequencias)
        {
            Console.WriteLine($"sequencia: {Sequencia(s)}");
        }

        foreach (string t in new[] { "", "# nota", "--verbose", "-v", "titulo:", "comum" })
        {
            Console.WriteLine($"prefixo [{t}]: {Prefixo(t)}");
        }
    }
}`,
      hints: [
        'Em `Interpretar`, `["mover", ..]` precisa vir **depois** das versões de dois e três elementos: ele casaria com todas.',
        'Em `Prefixo`, `[\'-\', \'-\', ..]` vem antes de `[\'-\', ..]` — o mais específico primeiro, como sempre.',
        'Em `Sequencia`, `[var p, .., var u]` casa com dois elementos ou mais; o caso unitário precisa ser tratado antes.',
        '`[.., \':\']` casa com qualquer texto terminado em dois-pontos, inclusive um texto de um caractere só.',
      ],
      tests: [
        {
          name: 'Interpretador por forma de lista',
          expectedStdout:
            'comando: comando vazio\ncomando: encerrando\ncomando: ajuda geral\n' +
            'comando: ajuda sobre combate\ncomando: movendo para norte\n' +
            'comando: movendo 3 para norte\ncomando: mover recebe 1 ou 2 argumentos\n' +
            'comando: comando desconhecido: voar\n' +
            'coordenada: 2D (3,4)\ncoordenada: 3D (1,2,3)\ncoordenada: coordenada negativa\n' +
            'coordenada: dimensao invalida\ncoordenada: dimensao invalida\n' +
            'sequencia: vazia\nsequencia: unitaria: 5\nsequencia: extremos iguais em 3\n' +
            'sequencia: cresce de 2 a 8 com 2 no meio\nsequencia: decresce de 9 a 1\n' +
            'prefixo []: vazio\nprefixo [# nota]: comentario\nprefixo [--verbose]: opcao longa\n' +
            'prefixo [-v]: opcao curta\nprefixo [titulo:]: rotulo\nprefixo [comum]: texto comum',
        },
      ],
    },
  },

  {
    id: 's08c03l08',
    title: 'Cláusula when',
    objective: 'Acrescentar a um braço uma condição que padrões não conseguem expressar.',
    concept: [
      {
        kind: 'text',
        body:
          'Padrões testam **forma e constantes**. Quando a condição envolve uma variável de fora, um cálculo ou uma relação entre componentes, ela não cabe num padrão — e é aí que entra o `when`.',
      },
      {
        kind: 'code',
        code: `static string Comparar(int a, int b) => (a, b) switch
{
    var (x, y) when x == y => "iguais",
    var (x, y) when x > y => "primeiro maior",
    _ => "segundo maior",
};`,
        caption: '`x == y` compara dois componentes entre si — impossível de expressar com padrões sozinhos.',
      },
      {
        kind: 'text',
        body: 'Três situações justificam um `when`, e vale reconhecê-las:',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Exemplo'],
        rows: [
          ['comparar componentes entre si', '`when l == a` (quadrado)'],
          ['comparar com variável ou configuração', '`when total > limiteConfigurado`'],
          ['chamar um método', '`when texto.StartsWith("Nova")`'],
        ],
      },
      {
        kind: 'code',
        code: `f switch
{
    Retangulo(var l, var a) when l == a => "quadrado",
    { Endereco.Cidade: var cidade } when cidade.StartsWith("Nova") => "cidade nova",
    { Total: var t } when t > limite => "acima do limite",
}`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A pergunta antes de escrever um `when`: **isso poderia ser um padrão?** `when x > 100` deveria ser `> 100`; `when o is string` deveria ser `string s`. O `when` só se justifica quando o padrão não alcança.',
      },
      {
        kind: 'compare',
        good: `n switch
{
    > 100 => "grande",
    > 10 => "medio",
    _ => "pequeno",
}`,
        bad: `n switch
{
    var x when x > 100 => "grande",
    var x when x > 10 => "medio",
    _ => "pequeno",
}`,
        goodLabel: 'Padrão relacional',
        badLabel: '`when` desnecessário',
      },
      {
        kind: 'text',
        body:
          'Um detalhe com consequências: o `when` **desliga a análise de exaustividade**. O compilador não tenta provar que uma condição arbitrária é verdadeira, então um `switch` cujos braços usam só `when` é sempre considerado não exaustivo.',
      },
      {
        kind: 'output',
        code: `warning CS8509: The switch expression does not handle all possible values`,
        caption: 'Aparece mesmo quando as condições cobrem tudo logicamente. Um `_` final é obrigatório na prática.',
      },
      {
        kind: 'text',
        body:
          'As cláusulas `when` são avaliadas **em ordem e sob demanda**: assim que uma casa, as seguintes nem são executadas. Isso importa quando a condição tem efeito colateral ou custo.',
      },
      {
        kind: 'code',
        code: `static int contador;
static bool Caro(decimal v) { contador++; return v > 100; }

static string ComEfeito(decimal v) => v switch
{
    _ when Caro(v) => "caro",
    _ when Caro(v) => "nunca chega",
    _ => "barato",
};`,
      },
      {
        kind: 'output',
        code: `ComEfeito(200)  -> "caro",    contador = 1
ComEfeito(50)   -> "barato",  contador = 2`,
        caption: 'Com 200, o primeiro `when` casou e o segundo nem rodou. Com 50, os dois foram avaliados.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Uma condição `when` cara pode ser avaliada uma vez por braço até alguma casar. Se ela consulta banco, lê arquivo ou faz um cálculo pesado, calcule o valor **antes** do `switch` e case sobre o resultado.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Um `when` longo é lógica de negócio escondida num braço. Extraia para um método com nome — `when EhClienteEstrategico(c)` documenta a regra e pode ser testado isoladamente.',
      },
    ],
    quiz: [
      {
        id: 's08c03l08q1',
        type: 'single',
        prompt: 'Qual destas condições **precisa** de `when`?',
        options: [
          { id: 'a', text: '`Retangulo(var l, var a)` em que `l == a`', correct: true },
          { id: 'b', text: '`n` maior que 100' },
          { id: 'c', text: '`o` é uma `string`' },
          { id: 'd', text: '`status` é `"novo"` ou `"pendente"`' },
        ],
        explanation:
          'Comparar dois componentes entre si não é expressável com padrões. As outras três têm padrão direto: `> 100`, `string s` e `"novo" or "pendente"`.',
      },
      {
        id: 's08c03l08q2',
        type: 'single',
        prompt: 'Qual o efeito do `when` sobre a análise de exaustividade?',
        options: [
          { id: 'a', text: 'O compilador desiste de provar cobertura e passa a exigir um `_` na prática', correct: true },
          { id: 'b', text: 'Nenhum: a análise continua igual' },
          { id: 'c', text: 'A exaustividade vira erro em vez de aviso' },
          { id: 'd', text: 'O compilador avalia a condição em tempo de compilação' },
        ],
        explanation:
          'Uma condição arbitrária não é analisável estaticamente. Sem um braço `_`, o CS8509 aparece — e ignorá-lo leva à `SwitchExpressionException`.',
      },
      {
        id: 's08c03l08q3',
        type: 'single',
        prompt: 'Quantas vezes `Caro(v)` é chamada em `ComEfeito(50)`, com dois braços `_ when Caro(v)`?',
        options: [
          { id: 'a', text: 'Duas: nenhuma casou, então as duas foram avaliadas', correct: true },
          { id: 'b', text: 'Uma: o resultado é reaproveitado' },
          { id: 'c', text: 'Nenhuma: o `_` casa antes' },
          { id: 'd', text: 'Três, contando o braço padrão' },
        ],
        explanation:
          'Cada `when` é avaliado na ordem, até um casar. Se a condição for cara, vale calcular antes do `switch` e casar sobre o valor pronto.',
      },
    ],
    challenge: {
      brief:
        'Implemente um avaliador de propostas comerciais em que algumas regras dependem de comparações entre campos e de limites configuráveis — exatamente os casos que exigem `when`.',
      requirements: [
        'Use `when` **apenas** onde um padrão não resolveria; o restante em padrões puros.',
        '`Avaliar` compara `Pedido` com `Estoque` e usa um limite recebido por parâmetro.',
        '`Formato` classifica retângulos comparando largura e altura entre si.',
        '`Prioridade` usa um método auxiliar dentro do `when`.',
        '`ContarAvaliacoes` demonstra que as condições `when` são avaliadas em ordem e param na primeira que casa.',
        'Todos os `switch` têm braço `_` final.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

record Proposta(string Cliente, decimal Valor, int Pedido, int Estoque, int DiasAberta);
record Retangulo(double Largura, double Altura);

class Program
{
    static int avaliacoes;

    static bool ClienteEstrategico(string nome)
    {
        avaliacoes++;
        return nome is "acme" or "globex";
    }

    static string Avaliar(Proposta p, decimal limiteAprovacao) => p switch
    {
        // TODO
        //  Pedido maior que Estoque              -> "sem estoque"
        //  Pedido igual ao Estoque               -> "esgota estoque"
        //  Valor acima do limite recebido        -> "requer diretoria"
        //  DiasAberta > 30                       -> "expirada"
        //  Valor <= 0                            -> "invalida"
        //  resto                                 -> "aprovada"
        _ => "",
    };

    static string Formato(Retangulo r) => r switch
    {
        // TODO
        //  largura ou altura <= 0     -> "invalido"
        //  largura == altura          -> "quadrado"
        //  largura > altura           -> "paisagem"
        //  resto                      -> "retrato"
        _ => "",
    };

    static string Prioridade(Proposta p) => p switch
    {
        // TODO
        //  cliente estrategico e valor > 10000  -> "maxima"
        //  cliente estrategico                  -> "alta"
        //  valor > 10000                        -> "media"
        //  resto                                -> "normal"
        _ => "",
    };

    static void Main()
    {
        var propostas = new List<Proposta>
        {
            new Proposta("acme", 50000m, 5, 3, 2),
            new Proposta("acme", 50000m, 5, 5, 2),
            new Proposta("beta", 50000m, 2, 9, 2),
            new Proposta("beta", 500m, 2, 9, 45),
            new Proposta("beta", 0m, 1, 9, 3),
            new Proposta("globex", 900m, 1, 9, 3),
        };

        foreach (Proposta p in propostas)
        {
            Console.WriteLine($"{p.Cliente} {p.Valor}: {Avaliar(p, 10000m)}");
        }

        var retangulos = new List<Retangulo>
        {
            new Retangulo(0, 5),
            new Retangulo(4, 4),
            new Retangulo(8, 3),
            new Retangulo(3, 8),
        };

        foreach (Retangulo r in retangulos)
        {
            Console.WriteLine($"{r.Largura}x{r.Altura}: {Formato(r)}");
        }

        avaliacoes = 0;
        Console.WriteLine($"prioridade 1: {Prioridade(propostas[0])} apos {avaliacoes} avaliacoes");

        avaliacoes = 0;
        Console.WriteLine($"prioridade 2: {Prioridade(propostas[5])} apos {avaliacoes} avaliacoes");

        avaliacoes = 0;
        Console.WriteLine($"prioridade 3: {Prioridade(propostas[2])} apos {avaliacoes} avaliacoes");

        avaliacoes = 0;
        Console.WriteLine($"prioridade 4: {Prioridade(propostas[3])} apos {avaliacoes} avaliacoes");

        Console.WriteLine($"limite alto: {Avaliar(propostas[2], 100000m)}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

record Proposta(string Cliente, decimal Valor, int Pedido, int Estoque, int DiasAberta);
record Retangulo(double Largura, double Altura);

class Program
{
    static int avaliacoes;

    static bool ClienteEstrategico(string nome)
    {
        avaliacoes++;
        return nome is "acme" or "globex";
    }

    static string Avaliar(Proposta p, decimal limiteAprovacao) => p switch
    {
        var x when x.Pedido > x.Estoque => "sem estoque",
        var x when x.Pedido == x.Estoque => "esgota estoque",
        var x when x.Valor > limiteAprovacao => "requer diretoria",
        { DiasAberta: > 30 } => "expirada",
        { Valor: <= 0 } => "invalida",
        _ => "aprovada",
    };

    static string Formato(Retangulo r) => r switch
    {
        ( <= 0, _) or (_, <= 0) => "invalido",
        var (l, a) when l == a => "quadrado",
        var (l, a) when l > a => "paisagem",
        _ => "retrato",
    };

    static string Prioridade(Proposta p) => p switch
    {
        { Valor: > 10000 } when ClienteEstrategico(p.Cliente) => "maxima",
        var x when ClienteEstrategico(x.Cliente) => "alta",
        { Valor: > 10000 } => "media",
        _ => "normal",
    };

    static void Main()
    {
        var propostas = new List<Proposta>
        {
            new Proposta("acme", 50000m, 5, 3, 2),
            new Proposta("acme", 50000m, 5, 5, 2),
            new Proposta("beta", 50000m, 2, 9, 2),
            new Proposta("beta", 500m, 2, 9, 45),
            new Proposta("beta", 0m, 1, 9, 3),
            new Proposta("globex", 900m, 1, 9, 3),
        };

        foreach (Proposta p in propostas)
        {
            Console.WriteLine($"{p.Cliente} {p.Valor}: {Avaliar(p, 10000m)}");
        }

        var retangulos = new List<Retangulo>
        {
            new Retangulo(0, 5),
            new Retangulo(4, 4),
            new Retangulo(8, 3),
            new Retangulo(3, 8),
        };

        foreach (Retangulo r in retangulos)
        {
            Console.WriteLine($"{r.Largura}x{r.Altura}: {Formato(r)}");
        }

        avaliacoes = 0;
        Console.WriteLine($"prioridade 1: {Prioridade(propostas[0])} apos {avaliacoes} avaliacoes");

        avaliacoes = 0;
        Console.WriteLine($"prioridade 2: {Prioridade(propostas[5])} apos {avaliacoes} avaliacoes");

        avaliacoes = 0;
        Console.WriteLine($"prioridade 3: {Prioridade(propostas[2])} apos {avaliacoes} avaliacoes");

        avaliacoes = 0;
        Console.WriteLine($"prioridade 4: {Prioridade(propostas[3])} apos {avaliacoes} avaliacoes");

        Console.WriteLine($"limite alto: {Avaliar(propostas[2], 100000m)}");
    }
}`,
      hints: [
        'Comparar `Pedido` com `Estoque` exige `when`: são dois componentes do mesmo objeto, e nenhum padrão relaciona um ao outro.',
        '`{ DiasAberta: > 30 }` e `{ Valor: <= 0 }` são padrões puros — não os transforme em `when`.',
        'Em `Prioridade`, o braço `{ Valor: > 10000 } when ClienteEstrategico(...)` só chama o método quando o padrão de valor já casou; a proposta 3 tem valor alto e cliente comum, então o método é chamado duas vezes.',
        'A proposta 4 tem valor baixo: o primeiro braço nem avalia o `when`, porque o padrão de propriedade falhou antes.',
      ],
      tests: [
        {
          name: 'Avaliação de propostas',
          expectedStdout:
            'acme 50000: sem estoque\nacme 50000: esgota estoque\nbeta 50000: requer diretoria\n' +
            'beta 500: expirada\nbeta 0: invalida\nglobex 900: aprovada\n' +
            '0x5: invalido\n4x4: quadrado\n8x3: paisagem\n3x8: retrato\n' +
            'prioridade 1: maxima apos 1 avaliacoes\n' +
            'prioridade 2: alta apos 1 avaliacoes\n' +
            'prioridade 3: media apos 2 avaliacoes\n' +
            'prioridade 4: normal apos 1 avaliacoes\n' +
            'limite alto: aprovada',
        },
      ],
    },
  },

  {
    id: 's08c03l09',
    title: 'Prática: máquina de estados',
    objective: 'Modelar transições de estado como uma tabela de padrões sobre tuplas.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma **máquina de estados** é um sistema que só pode estar num estado por vez e muda de estado em resposta a eventos. Pedido, documento, assinatura, conexão — quase todo domínio tem uma.',
      },
      {
        kind: 'text',
        body:
          'A implementação tradicional são `if` aninhados ou `switch` de comando dentro de `switch` de comando. Com padrões sobre **tuplas**, ela vira uma tabela que se lê de cima a baixo.',
      },
      {
        kind: 'code',
        code: `enum Estado { Rascunho, Enviado, Aprovado, Rejeitado, Arquivado }
enum Evento { Enviar, Aprovar, Rejeitar, Arquivar, Reabrir }

static Estado Transicao(Estado atual, Evento evento) => (atual, evento) switch
{
    (Estado.Rascunho, Evento.Enviar) => Estado.Enviado,
    (Estado.Enviado, Evento.Aprovar) => Estado.Aprovado,
    (Estado.Enviado, Evento.Rejeitar) => Estado.Rejeitado,
    (Estado.Rejeitado, Evento.Reabrir) => Estado.Rascunho,
    (Estado.Aprovado, Evento.Arquivar) => Estado.Arquivado,
    _ => atual,
};`,
        caption: 'Cada linha é uma transição válida. O `_` final define a política para tudo que não está na tabela.',
      },
      {
        kind: 'output',
        code: `Rascunho  + Enviar    -> Enviado
Enviado   + Rejeitar  -> Rejeitado
Rejeitado + Reabrir   -> Rascunho
Rascunho  + Enviar    -> Enviado
Enviado   + Aprovar   -> Aprovado
Aprovado  + Arquivar  -> Arquivado
Arquivado + Enviar    -> Arquivado`,
        caption: 'A última linha mostra a política do `_`: evento inválido não muda o estado.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A grande vantagem é que a tabela **é** a especificação. Um analista consegue ler os braços e conferir as regras sem entender C#, e adicionar uma transição é adicionar uma linha — não caçar o `if` certo.',
      },
      {
        kind: 'text',
        body: 'A decisão de projeto mais importante é o que fazer com uma transição inválida. Há três políticas legítimas:',
      },
      {
        kind: 'table',
        headers: ['Política', 'Braço `_`', 'Quando usar'],
        rows: [
          ['ignorar', '`_ => atual`', 'eventos duplicados são esperados'],
          ['recusar', '`_ => throw new InvalidOperationException(...)`', 'transição inválida é bug'],
          ['sinalizar', '`_ => null`, com `Estado?`', 'quem chama decide o que fazer'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Ignorar é a política mais silenciosa e a mais perigosa. Um evento que deveria mudar o estado e não muda vira um bug que só aparece muito depois, longe da causa.',
      },
      {
        kind: 'text',
        body:
          'Uma máquina completa costuma precisar de mais do que o próximo estado: também de quais eventos são válidos agora, e de se o estado é final.',
      },
      {
        kind: 'code',
        code: `static bool EhFinal(Estado e) => e is Estado.Arquivado;

static bool Permite(Estado atual, Evento evento) =>
    Transicao(atual, evento) != atual || (atual, evento) is (Estado.Rascunho, Evento.Enviar);`,
        caption:
          'Cuidado com o atalho: se alguma transição válida levar ao mesmo estado, comparar com `atual` dá falso negativo.',
      },
      {
        kind: 'compare',
        good: `static bool Permite(Estado a, Evento e) => (a, e) switch
{
    (Estado.Rascunho, Evento.Enviar) => true,
    (Estado.Enviado, Evento.Aprovar or Evento.Rejeitar) => true,
    _ => false,
};`,
        bad: `static bool Permite(Estado a, Evento e)
    => Transicao(a, e) != a;
// falha quando uma transicao valida
// leva ao proprio estado`,
        goodLabel: 'Tabela explícita',
        badLabel: 'Deduzir da transição',
      },
      {
        kind: 'text',
        body:
          'Quando a transição depende de mais do que estado e evento — um perfil, um valor, uma data —, acrescente componentes à tupla ou use `when`. A tabela cresce, mas continua sendo uma tabela.',
      },
      {
        kind: 'code',
        code: `(atual, evento, perfil) switch
{
    (Estado.Enviado, Evento.Aprovar, "gerente") => Estado.Aprovado,
    (Estado.Enviado, Evento.Aprovar, _) => Estado.Enviado,
    ...
}`,
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Mantenha a máquina de estados **pura**: uma função de (estado, evento) para estado, sem efeitos colaterais. Registrar log, enviar e-mail e gravar no banco ficam do lado de fora, onde podem ser testados separadamente.',
      },
    ],
    quiz: [
      {
        id: 's08c03l09q1',
        type: 'single',
        prompt: 'Qual a principal vantagem de escrever a máquina de estados como padrões sobre tuplas?',
        options: [
          { id: 'a', text: 'A tabela de transições fica legível como especificação, e adicionar uma regra é adicionar uma linha', correct: true },
          { id: 'b', text: 'É mais rápida que `if` aninhados' },
          { id: 'c', text: 'Elimina a necessidade de enums' },
          { id: 'd', text: 'Permite estados simultâneos' },
        ],
        explanation:
          'O ganho é de manutenção e revisão. Cada braço é uma regra completa, sem contexto espalhado em condições aninhadas.',
      },
      {
        id: 's08c03l09q2',
        type: 'single',
        prompt: 'Por que `Permite(a, e) => Transicao(a, e) != a` pode estar errado?',
        options: [
          { id: 'a', text: 'Uma transição válida pode levar ao próprio estado, e seria reportada como não permitida', correct: true },
          { id: 'b', text: 'Porque `Transicao` pode lançar exceção' },
          { id: 'c', text: 'Porque enums não podem ser comparados com `!=`' },
          { id: 'd', text: 'Está sempre correto' },
        ],
        explanation:
          'É um atalho que depende de um detalhe acidental da tabela. Uma tabela explícita de permissões não tem esse acoplamento.',
      },
      {
        id: 's08c03l09q3',
        type: 'single',
        prompt: 'Qual política para transição inválida é a mais silenciosa e arriscada?',
        options: [
          { id: 'a', text: 'Ignorar, devolvendo o estado atual', correct: true },
          { id: 'b', text: 'Lançar exceção' },
          { id: 'c', text: 'Devolver `null` num `Estado?`' },
          { id: 'd', text: 'Registrar log e lançar' },
        ],
        explanation:
          'Ignorar não deixa rastro. O evento perdido só é percebido quando alguém repara que o fluxo travou — muito longe da linha que causou o problema.',
      },
    ],
    challenge: {
      brief:
        'Implemente a máquina de estados de um pedido de e-commerce: transições por tabela, consulta de eventos permitidos, detecção de estado final e uma variante que recusa transições inválidas.',
      requirements: [
        '`Transicao` devolve o novo estado, ou o próprio estado quando o evento não se aplica.',
        '`TransicaoEstrita` lança `InvalidOperationException` com a mensagem `nao pode <evento> em <estado>`.',
        '`Permite` é uma tabela explícita, não derivada de `Transicao`.',
        '`EventosPermitidos` devolve a lista ordenada de eventos válidos no estado atual.',
        '`EhFinal` identifica estados terminais.',
        '`Processar` aplica uma sequência de eventos e devolve o histórico de estados.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

enum Estado { Novo, Pago, Separado, Enviado, Entregue, Cancelado, Devolvido }
enum Evento { Pagar, Separar, Despachar, Confirmar, Cancelar, Devolver }

class Program
{
    static Estado Transicao(Estado atual, Evento evento) => (atual, evento) switch
    {
        // TODO: tabela de transicoes
        //  Novo      + Pagar      -> Pago
        //  Novo      + Cancelar   -> Cancelado
        //  Pago      + Separar    -> Separado
        //  Pago      + Cancelar   -> Cancelado
        //  Separado  + Despachar  -> Enviado
        //  Enviado   + Confirmar  -> Entregue
        //  Entregue  + Devolver   -> Devolvido
        //  resto                  -> atual
        _ => atual,
    };

    static Estado TransicaoEstrita(Estado atual, Evento evento)
    {
        // TODO: usa Permite; lanca InvalidOperationException "nao pode <evento> em <estado>"
        return atual;
    }

    static bool Permite(Estado atual, Evento evento) => (atual, evento) switch
    {
        // TODO: tabela explicita de permissoes
        _ => false,
    };

    static List<Evento> EventosPermitidos(Estado atual)
    {
        // TODO: percorra todos os eventos e recolha os permitidos, em ordem do enum
        return new List<Evento>();
    }

    static bool EhFinal(Estado e)
    {
        // TODO: Cancelado e Devolvido sao finais
        return false;
    }

    static List<Estado> Processar(Estado inicial, IEnumerable<Evento> eventos)
    {
        // TODO: devolve o historico, comecando pelo estado inicial
        return new List<Estado>();
    }

    static void Main()
    {
        var fluxoFeliz = new[] { Evento.Pagar, Evento.Separar, Evento.Despachar, Evento.Confirmar };
        Console.WriteLine($"feliz: {string.Join(" -> ", Processar(Estado.Novo, fluxoFeliz))}");

        var comErro = new[] { Evento.Separar, Evento.Pagar, Evento.Despachar, Evento.Separar, Evento.Despachar };
        Console.WriteLine($"com erro: {string.Join(" -> ", Processar(Estado.Novo, comErro))}");

        var cancelado = new[] { Evento.Pagar, Evento.Cancelar, Evento.Separar };
        Console.WriteLine($"cancelado: {string.Join(" -> ", Processar(Estado.Novo, cancelado))}");

        foreach (Estado e in new[] { Estado.Novo, Estado.Pago, Estado.Enviado, Estado.Entregue, Estado.Cancelado })
        {
            Console.WriteLine($"{e}: permitidos [{string.Join(",", EventosPermitidos(e))}] final={EhFinal(e)}");
        }

        Console.WriteLine($"permite Novo/Pagar: {Permite(Estado.Novo, Evento.Pagar)}");
        Console.WriteLine($"permite Novo/Despachar: {Permite(Estado.Novo, Evento.Despachar)}");

        Console.WriteLine($"estrita ok: {TransicaoEstrita(Estado.Novo, Evento.Pagar)}");

        try
        {
            TransicaoEstrita(Estado.Novo, Evento.Despachar);
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"estrita erro: {ex.Message}");
        }
    }
}`,
      solution: `using System;
using System.Collections.Generic;

enum Estado { Novo, Pago, Separado, Enviado, Entregue, Cancelado, Devolvido }
enum Evento { Pagar, Separar, Despachar, Confirmar, Cancelar, Devolver }

class Program
{
    static Estado Transicao(Estado atual, Evento evento) => (atual, evento) switch
    {
        (Estado.Novo, Evento.Pagar) => Estado.Pago,
        (Estado.Novo, Evento.Cancelar) => Estado.Cancelado,
        (Estado.Pago, Evento.Separar) => Estado.Separado,
        (Estado.Pago, Evento.Cancelar) => Estado.Cancelado,
        (Estado.Separado, Evento.Despachar) => Estado.Enviado,
        (Estado.Enviado, Evento.Confirmar) => Estado.Entregue,
        (Estado.Entregue, Evento.Devolver) => Estado.Devolvido,
        _ => atual,
    };

    static Estado TransicaoEstrita(Estado atual, Evento evento)
    {
        if (!Permite(atual, evento))
        {
            throw new InvalidOperationException($"nao pode {evento} em {atual}");
        }

        return Transicao(atual, evento);
    }

    static bool Permite(Estado atual, Evento evento) => (atual, evento) switch
    {
        (Estado.Novo, Evento.Pagar or Evento.Cancelar) => true,
        (Estado.Pago, Evento.Separar or Evento.Cancelar) => true,
        (Estado.Separado, Evento.Despachar) => true,
        (Estado.Enviado, Evento.Confirmar) => true,
        (Estado.Entregue, Evento.Devolver) => true,
        _ => false,
    };

    static List<Evento> EventosPermitidos(Estado atual)
    {
        var lista = new List<Evento>();

        foreach (Evento evento in Enum.GetValues<Evento>())
        {
            if (Permite(atual, evento))
            {
                lista.Add(evento);
            }
        }

        return lista;
    }

    static bool EhFinal(Estado e)
    {
        return e is Estado.Cancelado or Estado.Devolvido;
    }

    static List<Estado> Processar(Estado inicial, IEnumerable<Evento> eventos)
    {
        var historico = new List<Estado> { inicial };
        Estado atual = inicial;

        foreach (Evento evento in eventos)
        {
            atual = Transicao(atual, evento);
            historico.Add(atual);
        }

        return historico;
    }

    static void Main()
    {
        var fluxoFeliz = new[] { Evento.Pagar, Evento.Separar, Evento.Despachar, Evento.Confirmar };
        Console.WriteLine($"feliz: {string.Join(" -> ", Processar(Estado.Novo, fluxoFeliz))}");

        var comErro = new[] { Evento.Separar, Evento.Pagar, Evento.Despachar, Evento.Separar, Evento.Despachar };
        Console.WriteLine($"com erro: {string.Join(" -> ", Processar(Estado.Novo, comErro))}");

        var cancelado = new[] { Evento.Pagar, Evento.Cancelar, Evento.Separar };
        Console.WriteLine($"cancelado: {string.Join(" -> ", Processar(Estado.Novo, cancelado))}");

        foreach (Estado e in new[] { Estado.Novo, Estado.Pago, Estado.Enviado, Estado.Entregue, Estado.Cancelado })
        {
            Console.WriteLine($"{e}: permitidos [{string.Join(",", EventosPermitidos(e))}] final={EhFinal(e)}");
        }

        Console.WriteLine($"permite Novo/Pagar: {Permite(Estado.Novo, Evento.Pagar)}");
        Console.WriteLine($"permite Novo/Despachar: {Permite(Estado.Novo, Evento.Despachar)}");

        Console.WriteLine($"estrita ok: {TransicaoEstrita(Estado.Novo, Evento.Pagar)}");

        try
        {
            TransicaoEstrita(Estado.Novo, Evento.Despachar);
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"estrita erro: {ex.Message}");
        }
    }
}`,
      hints: [
        'Use `or` para agrupar eventos que levam ao mesmo destino a partir do mesmo estado: `(Estado.Novo, Evento.Pagar or Evento.Cancelar)`.',
        '`Enum.GetValues<Evento>()` devolve os valores na ordem de declaração — é o que garante a ordem da lista de permitidos.',
        '`Processar` começa o histórico com o estado inicial, então o resultado tem sempre um item a mais que a quantidade de eventos.',
        'No fluxo com erro, o primeiro `Separar` não faz nada: `Novo + Separar` não está na tabela e cai no `_`.',
      ],
      tests: [
        {
          name: 'Máquina de estados do pedido',
          expectedStdout:
            'feliz: Novo -> Pago -> Separado -> Enviado -> Entregue\n' +
            'com erro: Novo -> Novo -> Pago -> Pago -> Separado -> Enviado\n' +
            'cancelado: Novo -> Pago -> Cancelado -> Cancelado\n' +
            'Novo: permitidos [Pagar,Cancelar] final=False\n' +
            'Pago: permitidos [Separar,Cancelar] final=False\n' +
            'Enviado: permitidos [Confirmar] final=False\n' +
            'Entregue: permitidos [Devolver] final=False\n' +
            'Cancelado: permitidos [] final=True\n' +
            'permite Novo/Pagar: True\npermite Novo/Despachar: False\n' +
            'estrita ok: Pago\nestrita erro: nao pode Despachar em Novo',
        },
      ],
    },
  },

  {
    id: 's08c03l10',
    title: 'Checkpoint: pattern matching',
    objective: 'Escolher o padrão certo para cada situação e reconhecer quando o pattern matching não é a resposta.',
    concept: [
      {
        kind: 'text',
        body:
          'Este capítulo apresentou sete famílias de padrões. Elas se combinam livremente, e a habilidade que importa é escolher a mais simples que resolve.',
      },
      {
        kind: 'table',
        headers: ['Padrão', 'Forma', 'Use quando'],
        rows: [
          ['constante', '`0`, `"novo"`, `Estado.Pago`', 'o valor exato importa'],
          ['tipo', '`string s`, `Circulo c`', 'o tipo decide o comportamento'],
          ['relacional', '`> 100`, `<= 0`', 'a faixa decide'],
          ['lógico', '`and`, `or`, `not`', 'combinar padrões sobre o mesmo valor'],
          ['propriedade', '`{ Total: > 200 }`', 'o conteúdo do objeto decide'],
          ['posicional', '`(0, var y)`', 'a decisão depende de 2–3 componentes'],
          ['lista', '`[var p, .., var u]`', 'a forma da sequência decide'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O fio condutor de todos: **descrever a forma do dado em vez de testá-la passo a passo**. Um `if` diz como verificar; um padrão diz o que você espera encontrar.',
      },
      {
        kind: 'text',
        body: 'Três regras se repetiram em todas as lições e valem para qualquer padrão:',
      },
      {
        kind: 'table',
        headers: ['Regra', 'Consequência de ignorar'],
        rows: [
          ['do específico ao geral', 'braço inalcançável, ou erro de compilação'],
          ['sempre um `_` final', '`SwitchExpressionException` em produção'],
          ['`when` só quando o padrão não alcança', 'perde exaustividade e legibilidade'],
        ],
      },
      {
        kind: 'text',
        body:
          'Também vale saber quando **não** usar. Pattern matching brilha em decisões externas ao tipo; dentro de uma hierarquia que você controla, o polimorfismo continua sendo melhor.',
      },
      {
        kind: 'compare',
        good: `// a operacao pertence ao tipo
abstract class Forma
{
    public abstract double Area();
}

// adicionar uma forma nova
// nao mexe em codigo existente`,
        bad: `// a operacao mora fora,
// e cada nova forma exige
// editar todos os switch
static double Area(Forma f) => f switch
{
    Circulo c => ...,
    Retangulo r => ...,
};`,
        goodLabel: 'Polimorfismo: fácil adicionar tipos',
        badLabel: 'Switch: fácil adicionar operações',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A regra prática: se você adiciona **tipos** com frequência, use polimorfismo. Se adiciona **operações** sobre um conjunto estável de tipos, use padrões. Um serializador, um formatador e um roteador de mensagens são casos claros de padrão.',
      },
      {
        kind: 'text',
        body:
          'O desafio final junta as sete famílias num interpretador de eventos — o tipo de código em que padrões substituem centenas de linhas de `if`.',
      },
    ],
    quiz: [
      {
        id: 's08c03l10q1',
        type: 'single',
        prompt: 'Quando o polimorfismo é preferível ao pattern matching?',
        options: [
          { id: 'a', text: 'Quando a operação pertence ao tipo e novos tipos são adicionados com frequência', correct: true },
          { id: 'b', text: 'Sempre: pattern matching é um recurso de transição' },
          { id: 'c', text: 'Quando há mais de três tipos envolvidos' },
          { id: 'd', text: 'Quando os tipos são `record`' },
        ],
        explanation:
          'Com polimorfismo, um tipo novo se acrescenta sem tocar em código existente. Com `switch`, cada tipo novo exige revisar todas as expressões — o compilador nem sempre avisa.',
      },
      {
        id: 's08c03l10q2',
        type: 'multiple',
        prompt: 'Quais regras se aplicam a qualquer expressão switch?',
        options: [
          { id: 'a', text: 'Ordenar os braços do específico para o geral', correct: true },
          { id: 'b', text: 'Incluir um braço `_` quando a exaustividade não é garantida', correct: true },
          { id: 'c', text: 'Preferir padrões a `when` sempre que possível', correct: true },
          { id: 'd', text: 'Limitar a cinco braços por expressão' },
        ],
        explanation:
          'As três primeiras evitam bug, exceção e perda de análise estática. Não há limite de braços — a legibilidade é o critério.',
      },
      {
        id: 's08c03l10q3',
        type: 'single',
        prompt: 'Qual padrão usar para decidir a partir de três variáveis independentes?',
        options: [
          { id: 'a', text: 'Padrão posicional sobre uma tupla montada na hora', correct: true },
          { id: 'b', text: 'Três expressões switch aninhadas' },
          { id: 'c', text: 'Padrão de lista' },
          { id: 'd', text: 'Padrão de tipo com `object`' },
        ],
        explanation:
          '`(a, b, c) switch` põe cada regra numa linha, com `_` nos componentes que não importam para aquele braço. É o substituto natural de `if` aninhado.',
      },
    ],
    challenge: {
      brief:
        'Feche o capítulo com um processador de eventos de sistema que usa as sete famílias de padrões para classificar, rotear e resumir uma fila de eventos heterogêneos.',
      requirements: [
        'Use pelo menos um padrão de cada família: constante, tipo, relacional, lógico, propriedade, posicional e lista.',
        '`Classificar` roteia por tipo de evento e conteúdo, usando padrões de propriedade aninhados.',
        '`Severidade` combina relacionais e lógicos.',
        '`Rota` decide sobre a tupla `(severidade, origem, horarioComercial)`.',
        '`ResumirLote` usa padrão de lista para descrever a fila.',
        '`when` aparece no máximo onde nenhum padrão resolveria.',
        'Todos os `switch` são exaustivos, sem `SwitchExpressionException`.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

record Origem(string Servico, string Ambiente);

abstract record EventoSistema(Origem Origem);
record Erro(Origem Origem, string Codigo, int Ocorrencias) : EventoSistema(Origem);
record Metrica(Origem Origem, string Nome, double Valor, double Limite) : EventoSistema(Origem);
record Acesso(Origem Origem, string Usuario, bool Sucesso) : EventoSistema(Origem);
record Desconhecido(Origem Origem) : EventoSistema(Origem);

class Program
{
    static string Classificar(EventoSistema e) => e switch
    {
        // TODO
        //  Erro com Ocorrencias > 100                     -> "erro em rajada"
        //  Erro com Codigo iniciando por "5"              -> "erro de servidor" (when: StartsWith)
        //  Erro                                           -> "erro"
        //  Metrica com Valor acima do Limite              -> "metrica estourada" (when: comparacao entre campos)
        //  Metrica                                        -> "metrica normal"
        //  Acesso sem sucesso, ambiente "producao"        -> "falha de acesso em producao"
        //  Acesso sem sucesso                             -> "falha de acesso"
        //  Acesso                                         -> "acesso"
        //  resto                                          -> "desconhecido"
        _ => "",
    };

    static int Severidade(EventoSistema e) => e switch
    {
        // TODO
        //  Erro com Ocorrencias > 100                          -> 5
        //  Erro com Ocorrencias > 10 e ambiente "producao"     -> 4
        //  Erro                                                -> 3
        //  Metrica com Valor acima do Limite                   -> 3
        //  Acesso sem sucesso                                  -> 2
        //  resto                                               -> 1
        _ => 0,
    };

    static string Rota(int severidade, string ambiente, bool horarioComercial) =>
        (severidade, ambiente, horarioComercial) switch
        {
            // TODO
            //  severidade >= 5, producao, qualquer horario   -> "plantao"
            //  severidade >= 4, producao, fora do horario    -> "plantao"
            //  severidade >= 4, producao, no horario         -> "time responsavel"
            //  severidade >= 3, qualquer ambiente            -> "fila de triagem"
            //  resto                                         -> "log"
            _ => "",
        };

    static string ResumirLote(EventoSistema[] lote) => lote switch
    {
        // TODO
        //  []                          -> "lote vazio"
        //  [var unico]                 -> "lote unitario: <classificacao>"
        //  [Erro, .., Erro]            -> "lote comeca e termina em erro"
        //  [_, .. var meio, _]         -> "lote de <meio.Length + 2> eventos"
        _ => "",
    };

    static void Main()
    {
        var producao = new Origem("api", "producao");
        var homolog = new Origem("api", "homologacao");

        var eventos = new EventoSistema[]
        {
            new Erro(producao, "500", 250),
            new Erro(producao, "503", 15),
            new Erro(homolog, "404", 3),
            new Metrica(producao, "latencia", 950, 500),
            new Metrica(producao, "latencia", 120, 500),
            new Acesso(producao, "ana", false),
            new Acesso(homolog, "bruno", false),
            new Acesso(producao, "carla", true),
            new Desconhecido(homolog),
        };

        foreach (EventoSistema e in eventos)
        {
            int sev = Severidade(e);
            Console.WriteLine($"{Classificar(e)} | sev={sev} | {Rota(sev, e.Origem.Ambiente, true)}");
        }

        Console.WriteLine($"fora do horario: {Rota(4, "producao", false)}");
        Console.WriteLine($"no horario: {Rota(4, "producao", true)}");
        Console.WriteLine($"homologacao: {Rota(5, "homologacao", false)}");

        Console.WriteLine($"vazio: {ResumirLote(new EventoSistema[0])}");
        Console.WriteLine($"unitario: {ResumirLote(new EventoSistema[] { eventos[3] })}");
        Console.WriteLine($"erros nas pontas: {ResumirLote(new[] { eventos[0], eventos[3], eventos[2] })}");
        Console.WriteLine($"misto: {ResumirLote(new[] { eventos[3], eventos[5], eventos[7], eventos[8] })}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

record Origem(string Servico, string Ambiente);

abstract record EventoSistema(Origem Origem);
record Erro(Origem Origem, string Codigo, int Ocorrencias) : EventoSistema(Origem);
record Metrica(Origem Origem, string Nome, double Valor, double Limite) : EventoSistema(Origem);
record Acesso(Origem Origem, string Usuario, bool Sucesso) : EventoSistema(Origem);
record Desconhecido(Origem Origem) : EventoSistema(Origem);

class Program
{
    static string Classificar(EventoSistema e) => e switch
    {
        Erro { Ocorrencias: > 100 } => "erro em rajada",
        Erro { Codigo: var codigo } when codigo.StartsWith("5") => "erro de servidor",
        Erro => "erro",
        Metrica m when m.Valor > m.Limite => "metrica estourada",
        Metrica => "metrica normal",
        Acesso { Sucesso: false, Origem.Ambiente: "producao" } => "falha de acesso em producao",
        Acesso { Sucesso: false } => "falha de acesso",
        Acesso => "acesso",
        _ => "desconhecido",
    };

    static int Severidade(EventoSistema e) => e switch
    {
        Erro { Ocorrencias: > 100 } => 5,
        Erro { Ocorrencias: > 10, Origem.Ambiente: "producao" } => 4,
        Erro => 3,
        Metrica m when m.Valor > m.Limite => 3,
        Acesso { Sucesso: false } => 2,
        _ => 1,
    };

    static string Rota(int severidade, string ambiente, bool horarioComercial) =>
        (severidade, ambiente, horarioComercial) switch
        {
            ( >= 5, "producao", _) => "plantao",
            ( >= 4, "producao", false) => "plantao",
            ( >= 4, "producao", true) => "time responsavel",
            ( >= 3, _, _) => "fila de triagem",
            _ => "log",
        };

    static string ResumirLote(EventoSistema[] lote) => lote switch
    {
        [] => "lote vazio",
        [var unico] => $"lote unitario: {Classificar(unico)}",
        [Erro, .., Erro] => "lote comeca e termina em erro",
        [_, .. var meio, _] => $"lote de {meio.Length + 2} eventos",
    };

    static void Main()
    {
        var producao = new Origem("api", "producao");
        var homolog = new Origem("api", "homologacao");

        var eventos = new EventoSistema[]
        {
            new Erro(producao, "500", 250),
            new Erro(producao, "503", 15),
            new Erro(homolog, "404", 3),
            new Metrica(producao, "latencia", 950, 500),
            new Metrica(producao, "latencia", 120, 500),
            new Acesso(producao, "ana", false),
            new Acesso(homolog, "bruno", false),
            new Acesso(producao, "carla", true),
            new Desconhecido(homolog),
        };

        foreach (EventoSistema e in eventos)
        {
            int sev = Severidade(e);
            Console.WriteLine($"{Classificar(e)} | sev={sev} | {Rota(sev, e.Origem.Ambiente, true)}");
        }

        Console.WriteLine($"fora do horario: {Rota(4, "producao", false)}");
        Console.WriteLine($"no horario: {Rota(4, "producao", true)}");
        Console.WriteLine($"homologacao: {Rota(5, "homologacao", false)}");

        Console.WriteLine($"vazio: {ResumirLote(new EventoSistema[0])}");
        Console.WriteLine($"unitario: {ResumirLote(new EventoSistema[] { eventos[3] })}");
        Console.WriteLine($"erros nas pontas: {ResumirLote(new[] { eventos[0], eventos[3], eventos[2] })}");
        Console.WriteLine($"misto: {ResumirLote(new[] { eventos[3], eventos[5], eventos[7], eventos[8] })}");
    }
}`,
      hints: [
        '`Erro { Ocorrencias: > 100 }` combina padrão de tipo com padrão de propriedade — a forma mais comum na prática.',
        'Comparar `m.Valor` com `m.Limite` exige `when`: são dois campos do mesmo objeto, e nenhum padrão os relaciona.',
        'Em `Rota`, `( >= 5, "producao", _)` precisa vir antes de `( >= 4, ...)`, e as duas antes de `( >= 3, _, _)`.',
        'Em `ResumirLote`, `[Erro, .., Erro]` usa padrões de **tipo** dentro de um padrão de **lista** — as duas famílias combinadas.',
      ],
      tests: [
        {
          name: 'Processador de eventos',
          expectedStdout:
            'erro em rajada | sev=5 | plantao\n' +
            'erro de servidor | sev=4 | time responsavel\n' +
            'erro | sev=3 | fila de triagem\n' +
            'metrica estourada | sev=3 | fila de triagem\n' +
            'metrica normal | sev=1 | log\n' +
            'falha de acesso em producao | sev=2 | log\n' +
            'falha de acesso | sev=2 | log\n' +
            'acesso | sev=1 | log\n' +
            'desconhecido | sev=1 | log\n' +
            'fora do horario: plantao\nno horario: time responsavel\nhomologacao: fila de triagem\n' +
            'vazio: lote vazio\nunitario: lote unitario: metrica estourada\n' +
            'erros nas pontas: lote comeca e termina em erro\nmisto: lote de 4 eventos',
        },
      ],
    },
  },
]
