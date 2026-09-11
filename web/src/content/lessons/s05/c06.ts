import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's05c06l01',
    title: 'struct',
    objective: 'Declarar um tipo por valor e conhecer as diferenças de comportamento em relação à classe.',
    concept: [
      {
        kind: 'text',
        body:
          'Um `struct` se declara quase como uma classe, mas é um **tipo por valor**: ele vive onde foi declarado, e atribuí-lo copia o conteúdo em vez de compartilhar uma referência.',
      },
      {
        kind: 'code',
        code: `struct Ponto
{
    public int X;
    public int Y;

    public Ponto(int x, int y)
    {
        X = x;
        Y = y;
    }

    public override string ToString() => $"({X},{Y})";
}`,
      },
      {
        kind: 'table',
        headers: ['Aspecto', '`class`', '`struct`'],
        rows: [
          ['categoria', 'referência', '**valor**'],
          ['atribuição', 'compartilha', '**copia**'],
          ['pode ser `null`', 'sim', 'não'],
          ['herança', 'sim', '**não**'],
          ['valor padrão', '`null`', 'todos os campos zerados'],
        ],
      },
      {
        kind: 'output',
        code: `Ponto p = default;
Console.WriteLine(p);       ->  (0,0)     nunca null`,
        caption: 'Um `struct` sempre existe. Não há estado "não inicializado" como o `null` de uma classe.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um `struct` não pode herdar de outro nem servir de base. Ele pode implementar interfaces, mas a hierarquia da Seção 5 até aqui não se aplica a ele.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Use `struct` para valores pequenos e imutáveis que representam **uma quantidade**, não uma entidade: um ponto, uma cor, uma medida, um intervalo de datas. Para qualquer coisa com identidade própria, use `class`.',
      },
    ],
    quiz: [
      {
        id: 's05c06l01q1',
        type: 'single',
        prompt: 'Qual é o valor padrão de um `struct` não inicializado?',
        options: [
          { id: 'a', text: 'Todos os campos zerados.', correct: true },
          { id: 'b', code: 'null' },
          { id: 'c', text: 'Erro de compilação.' },
          { id: 'd', text: 'Depende do construtor.' },
        ],
        explanation:
          'Um tipo por valor sempre ocupa espaço e sempre tem conteúdo. `null` simplesmente não existe para ele.',
      },
      {
        id: 's05c06l01q2',
        type: 'single',
        prompt: 'Um `struct` pode herdar de outro `struct`?',
        options: [
          { id: 'a', text: 'Não: structs não participam de herança.', correct: true },
          { id: 'b', text: 'Sim, como classes.' },
          { id: 'c', text: 'Sim, mas apenas um nível.' },
          { id: 'd', text: 'Sim, se ele for `readonly`.' },
        ],
        explanation:
          'Ele pode implementar interfaces, mas não tem base nem derivadas. Toda a hierarquia dos capítulos 3 e 4 é exclusiva das classes.',
      },
      {
        id: 's05c06l01q3',
        type: 'single',
        prompt: 'Para que tipo de dado o `struct` é apropriado?',
        options: [
          { id: 'a', text: 'Valores pequenos e imutáveis que representam uma quantidade.', correct: true },
          { id: 'b', text: 'Entidades com identidade própria.' },
          { id: 'c', text: 'Qualquer tipo, indiferentemente.' },
          { id: 'd', text: 'Tipos com muitos campos.' },
        ],
        explanation:
          'Um ponto ou uma cor são valores: dois pontos com as mesmas coordenadas são o mesmo ponto. Já duas contas com o mesmo saldo são contas diferentes.',
      },
    ],
    challenge: {
      brief:
        'Declare um `struct` que representa uma medida e demonstre o comportamento de valor padrão e de cópia.',
      requirements: [
        '`Intervalo` é um `struct` com as propriedades de leitura `Inicio` e `Fim` (`int`)',
        'O construtor recebe início e fim',
        '`Duracao` é uma propriedade calculada: `Fim - Inicio`',
        '`Contem(int valor)` devolve `true` quando o valor está entre início e fim, inclusive',
        '`ToString()` devolve `[inicio..fim]`',
        'O `Main` demonstra o valor padrão e a impossibilidade de `null`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare o struct Intervalo aqui

class Program
{
    static void Main()
    {
        int inicio = int.Parse(Console.ReadLine());
        int fim = int.Parse(Console.ReadLine());
        int teste = int.Parse(Console.ReadLine());

        Intervalo i = new Intervalo(inicio, fim);
        Intervalo padrao = default;

        Console.WriteLine($"Intervalo: {i}");
        Console.WriteLine($"Duracao: {i.Duracao}");
        Console.WriteLine($"Contem {teste}: {i.Contem(teste)}");
        Console.WriteLine($"Padrao: {padrao}");
        Console.WriteLine($"Duracao do padrao: {padrao.Duracao}");
        Console.WriteLine($"E tipo por valor: {typeof(Intervalo).IsValueType}");
    }
}
`,
      solution: `using System;

struct Intervalo
{
    public int Inicio { get; }
    public int Fim { get; }

    public Intervalo(int inicio, int fim)
    {
        Inicio = inicio;
        Fim = fim;
    }

    public int Duracao => Fim - Inicio;

    public bool Contem(int valor)
    {
        return valor >= Inicio && valor <= Fim;
    }

    public override string ToString()
    {
        return $"[{Inicio}..{Fim}]";
    }
}

class Program
{
    static void Main()
    {
        int inicio = int.Parse(Console.ReadLine());
        int fim = int.Parse(Console.ReadLine());
        int teste = int.Parse(Console.ReadLine());

        Intervalo i = new Intervalo(inicio, fim);
        Intervalo padrao = default;

        Console.WriteLine($"Intervalo: {i}");
        Console.WriteLine($"Duracao: {i.Duracao}");
        Console.WriteLine($"Contem {teste}: {i.Contem(teste)}");
        Console.WriteLine($"Padrao: {padrao}");
        Console.WriteLine($"Duracao do padrao: {padrao.Duracao}");
        Console.WriteLine($"E tipo por valor: {typeof(Intervalo).IsValueType}");
    }
}
`,
      hints: [
        'A declaração é `struct Intervalo` — o resto do corpo é igual ao de uma classe.',
        '`default` de um struct zera todos os campos, então `[0..0]` com duração `0`.',
      ],
      tests: [
        {
          name: 'Intervalo com valor dentro',
          stdin: '10\n20\n15\n',
          expectedStdout:
            'Intervalo: [10..20]\nDuracao: 10\nContem 15: True\nPadrao: [0..0]\n' +
            'Duracao do padrao: 0\nE tipo por valor: True',
        },
        {
          name: 'Valor fora do intervalo',
          stdin: '0\n5\n9\n',
          expectedStdout:
            'Intervalo: [0..5]\nDuracao: 5\nContem 9: False\nPadrao: [0..0]\n' +
            'Duracao do padrao: 0\nE tipo por valor: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c06l02',
    title: 'Semântica de valor',
    objective: 'Entender a consequência prática da cópia: alterações em uma variável não afetam a outra.',
    concept: [
      {
        kind: 'text',
        body:
          'A diferença entre valor e referência aparece no momento da **atribuição**. Com classe, duas variáveis apontam para o mesmo objeto. Com struct, cada variável tem sua própria cópia.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'class',
          code: `var a = new PontoC(1, 2);
var b = a;
b.X = 50;

// a.X tambem virou 50
// mesmo objeto`,
        },
        right: {
          label: 'struct',
          code: `var a = new PontoS(1, 2);
var b = a;
b.X = 50;

// a.X continua 1
// copia independente`,
        },
      },
      {
        kind: 'output',
        code: `copia: a=(1,2) b=(50,2)
apos passar para um metodo que altera: (1,2)`,
        caption: 'Passar um struct para um método também copia: o método altera a cópia, e o original não muda.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Isso confunde quem espera comportamento de referência. Um método que "modifica" um struct recebido por parâmetro não modifica nada de fora — a menos que use `ref`, da Seção 4.',
      },
      {
        kind: 'text',
        body:
          'A mesma armadilha aparece em coleções: `lista[0].X = 5` sobre uma `List<struct>` nem compila, porque o indexador devolve uma cópia, e alterar a cópia não teria efeito.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Toda essa classe de surpresas desaparece se o struct for **imutável**. É por isso que a recomendação prática é sempre a mesma: struct mutável é fonte de bug; struct imutável é seguro.',
      },
    ],
    quiz: [
      {
        id: 's05c06l02q1',
        type: 'single',
        prompt: 'O que acontece ao atribuir um struct a outra variável?',
        options: [
          { id: 'a', text: 'O conteúdo é copiado; as duas ficam independentes.', correct: true },
          { id: 'b', text: 'As duas passam a apontar para o mesmo dado.' },
          { id: 'c', text: 'A segunda vira `null`.' },
          { id: 'd', text: 'Erro de compilação.' },
        ],
        explanation:
          'É a definição de tipo por valor. A partir da atribuição, as duas variáveis não têm mais nenhuma ligação.',
      },
      {
        id: 's05c06l02q2',
        type: 'single',
        prompt: 'Um método que altera um struct recebido por parâmetro afeta o original?',
        options: [
          { id: 'a', text: 'Não, a menos que o parâmetro seja `ref`.', correct: true },
          { id: 'b', text: 'Sim, sempre.' },
          { id: 'c', text: 'Sim, se o struct tiver propriedades.' },
          { id: 'd', text: 'Não, nunca — nem com `ref`.' },
        ],
        explanation:
          'A passagem copia o valor. O `ref` da Seção 4 é justamente o que passa a variável em si, e não uma cópia.',
      },
      {
        id: 's05c06l02q3',
        type: 'single',
        prompt: 'Como evitar as surpresas da semântica de valor?',
        options: [
          { id: 'a', text: 'Tornando o struct imutável.', correct: true },
          { id: 'b', text: 'Usando sempre `ref`.' },
          { id: 'c', text: 'Convertendo para classe.' },
          { id: 'd', text: 'Evitando construtores.' },
        ],
        explanation:
          'Se nada pode ser alterado depois da criação, a diferença entre a cópia e o original deixa de importar.',
      },
    ],
    challenge: {
      brief:
        'Demonstre lado a lado a diferença entre um struct e uma classe com os mesmos campos, na atribuição e na passagem a método.',
      requirements: [
        '`ContadorStruct` é um `struct` com o campo público `Valor` (`int`) e o método `Incrementar()` que soma 1',
        '`ContadorClasse` é uma `class` idêntica em campos e método',
        'O `Main` copia cada um, incrementa a cópia e mostra o efeito no original',
        'O `Main` também passa cada um para um método que incrementa, e mostra o efeito',
        'Não altere o método `Main` nem os métodos auxiliares',
      ],
      starterCode: `using System;

// Declare ContadorStruct e ContadorClasse aqui

class Program
{
    static void IncrementarStruct(ContadorStruct c)
    {
        c.Incrementar();
    }

    static void IncrementarClasse(ContadorClasse c)
    {
        c.Incrementar();
    }

    static void Main()
    {
        int inicial = int.Parse(Console.ReadLine());

        ContadorStruct s1 = new ContadorStruct();
        s1.Valor = inicial;
        ContadorStruct s2 = s1;
        s2.Incrementar();

        ContadorClasse c1 = new ContadorClasse();
        c1.Valor = inicial;
        ContadorClasse c2 = c1;
        c2.Incrementar();

        Console.WriteLine($"struct apos copia: original={s1.Valor} copia={s2.Valor}");
        Console.WriteLine($"classe apos copia: original={c1.Valor} copia={c2.Valor}");

        IncrementarStruct(s1);
        IncrementarClasse(c1);

        Console.WriteLine($"struct apos metodo: {s1.Valor}");
        Console.WriteLine($"classe apos metodo: {c1.Valor}");
        Console.WriteLine($"struct e valor: {typeof(ContadorStruct).IsValueType}");
        Console.WriteLine($"classe e valor: {typeof(ContadorClasse).IsValueType}");
    }
}
`,
      solution: `using System;

struct ContadorStruct
{
    public int Valor;

    public void Incrementar()
    {
        Valor++;
    }
}

class ContadorClasse
{
    public int Valor;

    public void Incrementar()
    {
        Valor++;
    }
}

class Program
{
    static void IncrementarStruct(ContadorStruct c)
    {
        c.Incrementar();
    }

    static void IncrementarClasse(ContadorClasse c)
    {
        c.Incrementar();
    }

    static void Main()
    {
        int inicial = int.Parse(Console.ReadLine());

        ContadorStruct s1 = new ContadorStruct();
        s1.Valor = inicial;
        ContadorStruct s2 = s1;
        s2.Incrementar();

        ContadorClasse c1 = new ContadorClasse();
        c1.Valor = inicial;
        ContadorClasse c2 = c1;
        c2.Incrementar();

        Console.WriteLine($"struct apos copia: original={s1.Valor} copia={s2.Valor}");
        Console.WriteLine($"classe apos copia: original={c1.Valor} copia={c2.Valor}");

        IncrementarStruct(s1);
        IncrementarClasse(c1);

        Console.WriteLine($"struct apos metodo: {s1.Valor}");
        Console.WriteLine($"classe apos metodo: {c1.Valor}");
        Console.WriteLine($"struct e valor: {typeof(ContadorStruct).IsValueType}");
        Console.WriteLine($"classe e valor: {typeof(ContadorClasse).IsValueType}");
    }
}
`,
      hints: [
        'Os dois tipos têm exatamente o mesmo corpo. A única diferença é a palavra `struct` ou `class`.',
        'Com a classe, `c1` e `c2` são o mesmo objeto, então o incremento aparece nos dois.',
      ],
      tests: [
        {
          name: 'Comecando em zero',
          stdin: '0\n',
          expectedStdout:
            'struct apos copia: original=0 copia=1\nclasse apos copia: original=1 copia=1\n' +
            'struct apos metodo: 0\nclasse apos metodo: 2\n' +
            'struct e valor: True\nclasse e valor: False',
        },
        {
          name: 'Comecando em dez',
          stdin: '10\n',
          expectedStdout:
            'struct apos copia: original=10 copia=11\nclasse apos copia: original=11 copia=11\n' +
            'struct apos metodo: 10\nclasse apos metodo: 12\n' +
            'struct e valor: True\nclasse e valor: False',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c06l03',
    title: 'Structs imutáveis',
    objective: 'Declarar um `readonly struct` e transformar mutações em criação de novos valores.',
    concept: [
      {
        kind: 'text',
        body:
          'Um `readonly struct` garante, na compilação, que nenhum campo pode mudar depois da construção. É a forma recomendada de escrever structs.',
      },
      {
        kind: 'code',
        code: `readonly struct Medida
{
    public double Valor { get; }
    public string Unidade { get; }

    public Medida(double valor, string unidade)
    {
        Valor = valor;
        Unidade = unidade;
    }

    public Medida Dobrar() => new Medida(Valor * 2, Unidade);   // devolve novo
}`,
        caption: 'Todos os campos precisam ser `readonly` ou propriedades só de leitura.',
      },
      {
        kind: 'text',
        body:
          'A mudança de mentalidade é a mesma dos tipos imutáveis do capítulo 2: em vez de alterar o objeto, um método devolve **um novo valor** com a alteração aplicada.',
      },
      {
        kind: 'compare',
        good: `readonly struct Medida
{
    public double Valor { get; }
    public Medida Dobrar()
        => new Medida(Valor * 2);
}`,
        bad: `struct Medida
{
    public double Valor;
    public void Dobrar()
        => Valor *= 2;      // altera a copia
}`,
        goodLabel: 'Struct imutável',
        badLabel: 'Struct mutável',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Com o struct imutável, todas as armadilhas da lição anterior somem: como nada muda, não importa se você está olhando para o original ou para uma cópia.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um método que devolve um novo valor só tem efeito se o resultado for **guardado**. Escrever `m.Dobrar();` sozinho compila e não faz nada — o valor devolvido é descartado.',
      },
    ],
    quiz: [
      {
        id: 's05c06l03q1',
        type: 'single',
        prompt: 'O que `readonly struct` garante?',
        options: [
          { id: 'a', text: 'Que nenhum campo pode mudar depois da construção.', correct: true },
          { id: 'b', text: 'Que ele não pode ser copiado.' },
          { id: 'c', text: 'Que ele não pode ser passado a métodos.' },
          { id: 'd', text: 'Que ele vira um tipo por referência.' },
        ],
        explanation:
          'É verificado na compilação. Todos os membros precisam ser somente de leitura.',
      },
      {
        id: 's05c06l03q2',
        type: 'single',
        prompt: 'Como um struct imutável "altera" um valor?',
        options: [
          { id: 'a', text: 'Devolvendo um novo valor com a alteração aplicada.', correct: true },
          { id: 'b', text: 'Usando `ref` no método.' },
          { id: 'c', text: 'Não é possível.' },
          { id: 'd', text: 'Recriando a variável com `default`.' },
        ],
        explanation:
          'É o mesmo padrão de `string`, que também é imutável: `ToUpper()` não muda o texto, devolve outro.',
      },
      {
        id: 's05c06l03q3',
        type: 'single',
        prompt: 'Por que a imutabilidade resolve as armadilhas da cópia?',
        options: [
          { id: 'a', text: 'Porque, se nada muda, não importa se é o original ou a cópia.', correct: true },
          { id: 'b', text: 'Porque a cópia deixa de acontecer.' },
          { id: 'c', text: 'Porque o struct passa a ser passado por referência.' },
          { id: 'd', text: 'Porque o compilador impede a cópia.' },
        ],
        explanation:
          'A cópia continua acontecendo — ela só deixa de ter consequência observável.',
      },
    ],
    challenge: {
      brief:
        'Escreva um `readonly struct` de dinheiro em que toda operação devolve um novo valor.',
      requirements: [
        '`Dinheiro` é um `readonly struct` com as propriedades de leitura `Centavos` (`int`) e `Moeda` (`string`)',
        'O construtor recebe centavos e moeda',
        '`Somar(Dinheiro outro)` devolve um novo `Dinheiro` com a soma; se as moedas diferem, devolve o valor atual sem alteração',
        '`Aplicar(double fator)` devolve um novo `Dinheiro` com os centavos multiplicados, arredondados com `(int)Math.Round(...)`',
        '`ToString()` devolve `moeda X,YY`, com os centavos formatados em duas casas decimais',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare o readonly struct Dinheiro aqui

class Program
{
    static void Main()
    {
        int centavos = int.Parse(Console.ReadLine());
        string moeda = Console.ReadLine();
        int outros = int.Parse(Console.ReadLine());

        Dinheiro a = new Dinheiro(centavos, moeda);
        Dinheiro b = new Dinheiro(outros, moeda);
        Dinheiro estrangeiro = new Dinheiro(999, "USD");

        Console.WriteLine($"a: {a}");
        Console.WriteLine($"a + b: {a.Somar(b)}");
        Console.WriteLine($"a apos somar: {a}");
        Console.WriteLine($"a + estrangeiro: {a.Somar(estrangeiro)}");
        Console.WriteLine($"a com 10%: {a.Aplicar(1.1)}");
        Console.WriteLine($"a metade: {a.Aplicar(0.5)}");
    }
}
`,
      solution: `using System;

readonly struct Dinheiro
{
    public int Centavos { get; }
    public string Moeda { get; }

    public Dinheiro(int centavos, string moeda)
    {
        Centavos = centavos;
        Moeda = moeda;
    }

    public Dinheiro Somar(Dinheiro outro)
    {
        if (Moeda != outro.Moeda)
        {
            return this;
        }

        return new Dinheiro(Centavos + outro.Centavos, Moeda);
    }

    public Dinheiro Aplicar(double fator)
    {
        return new Dinheiro((int)Math.Round(Centavos * fator), Moeda);
    }

    public override string ToString()
    {
        return $"{Moeda} {(Centavos / 100.0):F2}";
    }
}

class Program
{
    static void Main()
    {
        int centavos = int.Parse(Console.ReadLine());
        string moeda = Console.ReadLine();
        int outros = int.Parse(Console.ReadLine());

        Dinheiro a = new Dinheiro(centavos, moeda);
        Dinheiro b = new Dinheiro(outros, moeda);
        Dinheiro estrangeiro = new Dinheiro(999, "USD");

        Console.WriteLine($"a: {a}");
        Console.WriteLine($"a + b: {a.Somar(b)}");
        Console.WriteLine($"a apos somar: {a}");
        Console.WriteLine($"a + estrangeiro: {a.Somar(estrangeiro)}");
        Console.WriteLine($"a com 10%: {a.Aplicar(1.1)}");
        Console.WriteLine($"a metade: {a.Aplicar(0.5)}");
    }
}
`,
      hints: [
        'Dentro de um struct, `this` devolve o próprio valor — útil quando não há alteração a fazer.',
        'Para o `ToString`, divida os centavos por `100.0` e formate com `:F2`.',
      ],
      tests: [
        {
          name: 'Valores em BRL',
          stdin: '1050\nBRL\n250\n',
          expectedStdout:
            'a: BRL 10.50\na + b: BRL 13.00\na apos somar: BRL 10.50\na + estrangeiro: BRL 10.50\n' +
            'a com 10%: BRL 11.55\na metade: BRL 5.25',
        },
        {
          name: 'Valor zerado',
          stdin: '0\nEUR\n100\n',
          expectedStdout:
            'a: EUR 0.00\na + b: EUR 1.00\na apos somar: EUR 0.00\na + estrangeiro: EUR 0.00\n' +
            'a com 10%: EUR 0.00\na metade: EUR 0.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c06l04',
    title: 'record',
    objective: 'Usar `record` para tipos de dados, ganhando igualdade, `ToString` e cópia sem escrever nada.',
    concept: [
      {
        kind: 'text',
        body:
          'Você viu `record` de passagem na Seção 3. Agora que os capítulos anteriores mostraram tudo que ele economiza, dá para apreciar o tamanho do atalho.',
      },
      {
        kind: 'code',
        code: `record Pessoa(string Nome, int Idade);`,
        caption: 'Uma linha. Compare com o que ela substitui.',
      },
      {
        kind: 'table',
        headers: ['O que você escreveria à mão', 'O `record` já dá'],
        rows: [
          ['propriedades só de leitura', 'sim'],
          ['construtor', 'sim'],
          ['`ToString` formatado', 'sim'],
          ['`Equals` por conteúdo', 'sim'],
          ['`GetHashCode`', 'sim'],
          ['operador `==` por conteúdo', '**sim**'],
          ['cópia com alteração', 'sim, com `with`'],
        ],
      },
      {
        kind: 'output',
        code: `var p = new Pessoa("Ana", 30);
Console.WriteLine(p);
->  Pessoa { Nome = Ana, Idade = 30 }`,
        caption: 'O formato do `ToString` gerado inclui o nome do tipo e todas as propriedades.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Note a linha que a classe manual do capítulo 5 **não** conseguia: o `record` sobrecarrega o `==` de verdade. Dois records com o mesmo conteúdo são `==` iguais.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um `record` continua sendo um tipo por **referência** — ele é uma classe com facilidades. O que muda é a igualdade, não a categoria: `ReferenceEquals` de dois records iguais ainda é `false`.',
      },
      {
        kind: 'text',
        body:
          'Um `record` pode ter corpo, com métodos e propriedades calculadas, e pode até herdar de outro `record`. A forma de uma linha é só o caso mais comum.',
      },
      {
        kind: 'output',
        code: `record Livro(string Titulo, int Ano)
{
    public bool Antigo => Ano < 1980;
}

Console.WriteLine(new Livro("X", 1899));
->  Livro { Titulo = X, Ano = 1899, Antigo = True }`,
        caption: 'Uma propriedade calculada acrescentada no corpo também entra no `ToString` gerado.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Repare que a propriedade calculada aparece no texto, mas **não** participa da igualdade: só as propriedades posicionais do construtor são comparadas. Como o valor calculado deriva delas, o resultado costuma ser o mesmo — mas a regra é essa.',
      },
    ],
    quiz: [
      {
        id: 's05c06l04q1',
        type: 'multiple',
        prompt: 'O que um `record` gera automaticamente?',
        options: [
          { id: 'a', text: 'Igualdade por conteúdo, incluindo o `==`.', correct: true },
          { id: 'b', text: 'Um `ToString` com nome do tipo e propriedades.', correct: true },
          { id: 'c', text: 'Cópia com alteração via `with`.', correct: true },
          { id: 'd', text: 'Ordenação natural via `IComparable`.' },
        ],
        explanation:
          'Ordenação não é gerada — não existe critério óbvio. Para ordenar um record, implemente `IComparable` ou passe a comparação.',
      },
      {
        id: 's05c06l04q2',
        type: 'single',
        prompt: 'Um `record` é tipo por valor?',
        options: [
          { id: 'a', text: 'Não: ele é por referência, com igualdade por conteúdo.', correct: true },
          { id: 'b', text: 'Sim, como um struct.' },
          { id: 'c', text: 'Depende de ele ter corpo.' },
          { id: 'd', text: 'Sim, se todas as propriedades forem de leitura.' },
        ],
        explanation:
          'É uma confusão comum: igualdade por conteúdo não faz dele um tipo por valor. `record struct` é a versão por valor, e é o assunto da próxima lição.',
      },
      {
        id: 's05c06l04q3',
        type: 'single',
        prompt: 'Qual é a saída de `Console.WriteLine(new Pessoa("Ana", 30))`?',
        options: [
          { id: 'a', code: 'Pessoa { Nome = Ana, Idade = 30 }', correct: true },
          { id: 'b', code: '(Ana, 30)' },
          { id: 'c', code: 'Pessoa' },
          { id: 'd', code: 'Ana 30' },
        ],
        explanation:
          'O formato gerado é o nome do tipo, chaves, e cada propriedade como `Nome = valor` separada por vírgula.',
      },
    ],
    challenge: {
      brief:
        'Substitua uma classe escrita à mão por um `record` e mostre que ele entrega igualdade, texto e coleções corretamente.',
      requirements: [
        '`Livro` é um `record` com as propriedades `Titulo` (`string`), `Autor` (`string`) e `Ano` (`int`)',
        'Acrescente ao `Livro` uma propriedade calculada `Antigo`, verdadeira quando `Ano` é menor que 1980',
        '`Coordenada` é um `record` com `Latitude` e `Longitude` (`double`)',
        'Nenhum `Equals`, `GetHashCode` ou `ToString` escrito à mão',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

// Declare os records Livro e Coordenada aqui

class Program
{
    static void Main()
    {
        string titulo = Console.ReadLine();
        string autor = Console.ReadLine();
        int ano = int.Parse(Console.ReadLine());

        Livro a = new Livro(titulo, autor, ano);
        Livro b = new Livro(titulo, autor, ano);

        Console.WriteLine(a);
        Console.WriteLine($"Iguais: {a == b}");
        Console.WriteLine($"Equals: {a.Equals(b)}");
        Console.WriteLine($"Mesma referencia: {ReferenceEquals(a, b)}");
        Console.WriteLine($"Antigo: {a.Antigo}");

        List<Livro> acervo = new List<Livro> { a, b, new Livro("Outro", autor, 2000) };

        Console.WriteLine($"Distintos: {acervo.Distinct().Count()}");
        Console.WriteLine($"Contains: {acervo.Contains(new Livro(titulo, autor, ano))}");
        Console.WriteLine(new Coordenada(1.5, -2.25));
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Livro(string Titulo, string Autor, int Ano)
{
    public bool Antigo => Ano < 1980;
}

record Coordenada(double Latitude, double Longitude);

class Program
{
    static void Main()
    {
        string titulo = Console.ReadLine();
        string autor = Console.ReadLine();
        int ano = int.Parse(Console.ReadLine());

        Livro a = new Livro(titulo, autor, ano);
        Livro b = new Livro(titulo, autor, ano);

        Console.WriteLine(a);
        Console.WriteLine($"Iguais: {a == b}");
        Console.WriteLine($"Equals: {a.Equals(b)}");
        Console.WriteLine($"Mesma referencia: {ReferenceEquals(a, b)}");
        Console.WriteLine($"Antigo: {a.Antigo}");

        List<Livro> acervo = new List<Livro> { a, b, new Livro("Outro", autor, 2000) };

        Console.WriteLine($"Distintos: {acervo.Distinct().Count()}");
        Console.WriteLine($"Contains: {acervo.Contains(new Livro(titulo, autor, ano))}");
        Console.WriteLine(new Coordenada(1.5, -2.25));
    }
}
`,
      hints: [
        'Um `record` com corpo usa chaves em vez de ponto e vírgula: `record Livro(...) { ... }`.',
        'A propriedade calculada é escrita exatamente como em uma classe, com seta.',
      ],
      tests: [
        {
          name: 'Livro antigo',
          stdin: 'Dom Casmurro\nMachado\n1899\n',
          expectedStdout:
            'Livro { Titulo = Dom Casmurro, Autor = Machado, Ano = 1899, Antigo = True }\n' +
            'Iguais: True\nEquals: True\nMesma referencia: False\nAntigo: True\n' +
            'Distintos: 2\nContains: True\nCoordenada { Latitude = 1.5, Longitude = -2.25 }',
        },
        {
          name: 'Livro recente',
          stdin: 'Codigo Limpo\nMartin\n2008\n',
          expectedStdout:
            'Livro { Titulo = Codigo Limpo, Autor = Martin, Ano = 2008, Antigo = False }\n' +
            'Iguais: True\nEquals: True\nMesma referencia: False\nAntigo: False\n' +
            'Distintos: 2\nContains: True\nCoordenada { Latitude = 1.5, Longitude = -2.25 }',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c06l05',
    title: 'record struct',
    objective: 'Combinar a semântica de valor do struct com as facilidades geradas do record.',
    concept: [
      {
        kind: 'text',
        body:
          'Um `record struct` é um tipo **por valor** que ganha tudo que o `record` gera: igualdade por conteúdo, `ToString` formatado, `with` e desconstrução.',
      },
      {
        kind: 'code',
        code: `record struct Coord(double X, double Y);

Coord c = new Coord(1.5, 2);
Console.WriteLine(c);            // Coord { X = 1.5, Y = 2 }
var (x, y) = c;                  // desconstrucao pronta`,
      },
      {
        kind: 'table',
        headers: ['Tipo', 'Categoria', 'Igualdade', 'Facilidades geradas'],
        rows: [
          ['`class`', 'referência', 'referência', 'nenhuma'],
          ['`struct`', 'valor', 'conteúdo (`Equals`)', 'poucas'],
          ['`record`', 'referência', '**conteúdo, com `==`**', 'todas'],
          ['`record struct`', '**valor**', '**conteúdo, com `==`**', 'todas'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A tabela resolve a pergunta de escolha: decida primeiro a **categoria** — o dado é uma quantidade ou uma entidade? — e depois se quer as facilidades geradas. Na prática, `record struct` é a escolha certa para quase todo valor pequeno.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um `record struct` é **mutável** por padrão, ao contrário do `record`. Para o comportamento imutável recomendado, declare `readonly record struct`.',
      },
      {
        kind: 'text',
        body:
          'Um detalhe do `ToString` gerado: números são impressos na forma mais curta. Um `double` de valor `2` aparece como `2`, não `2.0`.',
      },
    ],
    quiz: [
      {
        id: 's05c06l05q1',
        type: 'single',
        prompt: 'Qual é a diferença entre `record` e `record struct`?',
        options: [
          { id: 'a', text: 'A categoria: um é por referência, o outro por valor.', correct: true },
          { id: 'b', text: 'A igualdade: só o `record` compara conteúdo.' },
          { id: 'c', text: 'O `record struct` não tem `with`.' },
          { id: 'd', text: 'Nenhuma diferença prática.' },
        ],
        explanation:
          'As facilidades geradas são as mesmas. O que muda é como o valor é copiado e armazenado.',
      },
      {
        id: 's05c06l05q2',
        type: 'single',
        prompt: 'Como tornar um `record struct` imutável?',
        options: [
          { id: 'a', code: 'readonly record struct', correct: true },
          { id: 'b', text: 'Ele já é imutável por padrão.' },
          { id: 'c', text: 'Declarando as propriedades como `const`.' },
          { id: 'd', text: 'Não é possível.' },
        ],
        explanation:
          'Diferente do `record`, cujas propriedades posicionais já são só de leitura, o `record struct` precisa do `readonly` explícito.',
      },
      {
        id: 's05c06l05q3',
        type: 'single',
        prompt: 'Como um `double` de valor 2 aparece no `ToString` gerado?',
        options: [
          { id: 'a', code: '2', correct: true },
          { id: 'b', code: '2.0' },
          { id: 'c', code: '2,00' },
          { id: 'd', code: '2.00' },
        ],
        explanation:
          'A formatação padrão de números não acrescenta casas decimais desnecessárias. Para controlar o formato, escreva o `ToString` à mão.',
      },
    ],
    challenge: {
      brief:
        'Declare um `readonly record struct` e mostre que ele combina cópia por valor com igualdade e texto gerados.',
      requirements: [
        '`Tamanho` é um `readonly record struct` com `Largura` e `Altura` (`int`)',
        'Acrescente a propriedade calculada `Area`',
        'Acrescente o método `Girar()`, que devolve um `Tamanho` com largura e altura trocadas',
        '`Fracao` é um `readonly record struct` com `Numerador` e `Denominador` (`int`)',
        '`Fracao` tem a propriedade calculada `Valor` (`double`), com o denominador zero devolvendo `0`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare Tamanho e Fracao aqui

class Program
{
    static void Main()
    {
        int largura = int.Parse(Console.ReadLine());
        int altura = int.Parse(Console.ReadLine());

        Tamanho t = new Tamanho(largura, altura);
        Tamanho copia = t;

        Console.WriteLine(t);
        Console.WriteLine($"Area: {t.Area}");
        Console.WriteLine($"Girado: {t.Girar()}");
        Console.WriteLine($"Original apos girar: {t}");
        Console.WriteLine($"Copia igual: {copia == t}");
        Console.WriteLine($"E valor: {typeof(Tamanho).IsValueType}");

        var (l, a) = t;
        Console.WriteLine($"Desconstruido: {l} {a}");

        Console.WriteLine(new Fracao(1, 2));
        Console.WriteLine($"Valor: {new Fracao(1, 4).Valor}");
        Console.WriteLine($"Sem denominador: {new Fracao(3, 0).Valor}");
    }
}
`,
      solution: `using System;

readonly record struct Tamanho(int Largura, int Altura)
{
    public int Area => Largura * Altura;

    public Tamanho Girar()
    {
        return new Tamanho(Altura, Largura);
    }
}

readonly record struct Fracao(int Numerador, int Denominador)
{
    public double Valor => Denominador == 0 ? 0 : (double)Numerador / Denominador;
}

class Program
{
    static void Main()
    {
        int largura = int.Parse(Console.ReadLine());
        int altura = int.Parse(Console.ReadLine());

        Tamanho t = new Tamanho(largura, altura);
        Tamanho copia = t;

        Console.WriteLine(t);
        Console.WriteLine($"Area: {t.Area}");
        Console.WriteLine($"Girado: {t.Girar()}");
        Console.WriteLine($"Original apos girar: {t}");
        Console.WriteLine($"Copia igual: {copia == t}");
        Console.WriteLine($"E valor: {typeof(Tamanho).IsValueType}");

        var (l, a) = t;
        Console.WriteLine($"Desconstruido: {l} {a}");

        Console.WriteLine(new Fracao(1, 2));
        Console.WriteLine($"Valor: {new Fracao(1, 4).Valor}");
        Console.WriteLine($"Sem denominador: {new Fracao(3, 0).Valor}");
    }
}
`,
      hints: [
        'A declaração completa é `readonly record struct Tamanho(int Largura, int Altura) { ... }`.',
        'Na `Fracao`, converta um dos operandos para `double` antes de dividir, senão a divisão é inteira.',
      ],
      tests: [
        {
          name: 'Tamanho retangular',
          stdin: '4\n3\n',
          expectedStdout:
            'Tamanho { Largura = 4, Altura = 3, Area = 12 }\nArea: 12\n' +
            'Girado: Tamanho { Largura = 3, Altura = 4, Area = 12 }\n' +
            'Original apos girar: Tamanho { Largura = 4, Altura = 3, Area = 12 }\n' +
            'Copia igual: True\nE valor: True\nDesconstruido: 4 3\n' +
            'Fracao { Numerador = 1, Denominador = 2, Valor = 0.5 }\nValor: 0.25\nSem denominador: 0',
        },
        {
          name: 'Tamanho quadrado',
          stdin: '5\n5\n',
          expectedStdout:
            'Tamanho { Largura = 5, Altura = 5, Area = 25 }\nArea: 25\n' +
            'Girado: Tamanho { Largura = 5, Altura = 5, Area = 25 }\n' +
            'Original apos girar: Tamanho { Largura = 5, Altura = 5, Area = 25 }\n' +
            'Copia igual: True\nE valor: True\nDesconstruido: 5 5\n' +
            'Fracao { Numerador = 1, Denominador = 2, Valor = 0.5 }\nValor: 0.25\nSem denominador: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c06l06',
    title: 'Cópia com with',
    objective: 'Criar variações de um valor imutável sem repetir os campos que não mudam.',
    concept: [
      {
        kind: 'text',
        body:
          'A expressão `with` cria uma **cópia** de um record com algumas propriedades alteradas. É a resposta para o incômodo da imutabilidade: mudar um campo sem reescrever todos os outros.',
      },
      {
        kind: 'compare',
        good: `var novo = p with { Idade = 31 };`,
        bad: `var novo = new Pessoa(
    p.Nome,
    31,
    p.Cidade,
    p.Email,
    p.Telefone);`,
        goodLabel: 'Com `with`',
        badLabel: 'Sem `with`',
      },
      {
        kind: 'output',
        code: `var p1 = new Pessoa("Ana", 30);
var p2 = p1 with { Idade = 31 };

p1  ->  Pessoa { Nome = Ana, Idade = 30 }     inalterado
p2  ->  Pessoa { Nome = Ana, Idade = 31 }`,
        caption: 'O original nunca muda. O `with` produz um objeto novo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Várias propriedades podem ser alteradas de uma vez, separadas por vírgula: `p with { Idade = 31, Cidade = "Recife" }`.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A cópia é **rasa**. Se o record contém uma referência a uma lista, o novo objeto aponta para a mesma lista — alterar essa lista afeta os dois. É o mesmo cuidado da cópia de arrays da Seção 3.',
      },
      {
        kind: 'text',
        body:
          'O `with` funciona em `record`, `record struct` e `struct` — mas não em classes comuns, que não têm o mecanismo de cópia gerado.',
      },
    ],
    quiz: [
      {
        id: 's05c06l06q1',
        type: 'single',
        prompt: 'O que `p with { Idade = 31 }` faz?',
        options: [
          { id: 'a', text: 'Cria uma cópia de `p` com a idade alterada, sem mudar `p`.', correct: true },
          { id: 'b', text: 'Altera a idade de `p`.' },
          { id: 'c', text: 'Cria um objeto só com a propriedade `Idade`.' },
          { id: 'd', text: 'Compara `p` com a idade 31.' },
        ],
        explanation:
          'É cópia com alteração. O original é imutável e continua exatamente como estava.',
      },
      {
        id: 's05c06l06q2',
        type: 'single',
        prompt: 'A cópia feita pelo `with` é rasa ou profunda?',
        options: [
          { id: 'a', text: 'Rasa: referências internas continuam compartilhadas.', correct: true },
          { id: 'b', text: 'Profunda: tudo é duplicado.' },
          { id: 'c', text: 'Depende de o record ser posicional.' },
          { id: 'd', text: 'Rasa para structs, profunda para records.' },
        ],
        explanation:
          'Uma lista dentro do record continua sendo a mesma lista nos dois objetos. Imutabilidade do record não torna o conteúdo dele imutável.',
      },
      {
        id: 's05c06l06q3',
        type: 'single',
        prompt: 'Em que tipos o `with` funciona?',
        options: [
          { id: 'a', text: 'Em `record`, `record struct` e `struct`.', correct: true },
          { id: 'b', text: 'Apenas em `record`.' },
          { id: 'c', text: 'Em qualquer tipo.' },
          { id: 'd', text: 'Apenas em tipos por valor.' },
        ],
        explanation:
          'Classes comuns ficam de fora: elas não têm o mecanismo de cópia que o `with` usa.',
      },
    ],
    challenge: {
      brief:
        'Use `with` para produzir uma sequência de variações de uma configuração imutável.',
      requirements: [
        '`Config` é um `record` com `Host` (`string`), `Porta` (`int`), `Timeout` (`int`) e `Seguro` (`bool`)',
        '`Config` tem a propriedade calculada `Url`, no formato `http://host:porta` ou `https://host:porta` conforme `Seguro`',
        'O `Main` deriva variações com `with`, sem chamar o construtor de novo',
        'Nenhuma variação altera a configuração original',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare o record Config aqui

class Program
{
    static void Main()
    {
        string host = Console.ReadLine();
        int porta = int.Parse(Console.ReadLine());

        Config baseConfig = new Config(host, porta, 30, false);

        Config segura = baseConfig with { Seguro = true, Porta = 443 };
        Config lenta = baseConfig with { Timeout = 120 };
        Config outra = segura with { Host = "backup" };

        Console.WriteLine($"base: {baseConfig.Url} timeout={baseConfig.Timeout}");
        Console.WriteLine($"segura: {segura.Url}");
        Console.WriteLine($"lenta: {lenta.Url} timeout={lenta.Timeout}");
        Console.WriteLine($"outra: {outra.Url}");
        Console.WriteLine($"base intacta: {baseConfig.Url} timeout={baseConfig.Timeout}");
        Console.WriteLine($"base == lenta: {baseConfig == lenta}");
        Console.WriteLine($"base == (base with nada): {baseConfig == baseConfig with { }}");
    }
}
`,
      solution: `using System;

record Config(string Host, int Porta, int Timeout, bool Seguro)
{
    public string Url => $"{(Seguro ? "https" : "http")}://{Host}:{Porta}";
}

class Program
{
    static void Main()
    {
        string host = Console.ReadLine();
        int porta = int.Parse(Console.ReadLine());

        Config baseConfig = new Config(host, porta, 30, false);

        Config segura = baseConfig with { Seguro = true, Porta = 443 };
        Config lenta = baseConfig with { Timeout = 120 };
        Config outra = segura with { Host = "backup" };

        Console.WriteLine($"base: {baseConfig.Url} timeout={baseConfig.Timeout}");
        Console.WriteLine($"segura: {segura.Url}");
        Console.WriteLine($"lenta: {lenta.Url} timeout={lenta.Timeout}");
        Console.WriteLine($"outra: {outra.Url}");
        Console.WriteLine($"base intacta: {baseConfig.Url} timeout={baseConfig.Timeout}");
        Console.WriteLine($"base == lenta: {baseConfig == lenta}");
        Console.WriteLine($"base == (base with nada): {baseConfig == baseConfig with { }}");
    }
}
`,
      hints: [
        'A propriedade `Url` usa um operador ternário dentro da interpolação para escolher o esquema.',
        '`baseConfig with { }` sem nenhuma alteração produz uma cópia idêntica — e igual pelo `==`.',
      ],
      tests: [
        {
          name: 'Servidor local',
          stdin: 'localhost\n8080\n',
          expectedStdout:
            'base: http://localhost:8080 timeout=30\nsegura: https://localhost:443\n' +
            'lenta: http://localhost:8080 timeout=120\noutra: https://backup:443\n' +
            'base intacta: http://localhost:8080 timeout=30\n' +
            'base == lenta: False\nbase == (base with nada): True',
        },
        {
          name: 'Servidor remoto',
          stdin: 'api.teste\n80\n',
          expectedStdout:
            'base: http://api.teste:80 timeout=30\nsegura: https://api.teste:443\n' +
            'lenta: http://api.teste:80 timeout=120\noutra: https://backup:443\n' +
            'base intacta: http://api.teste:80 timeout=30\n' +
            'base == lenta: False\nbase == (base with nada): True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c06l07',
    title: 'Igualdade estrutural',
    objective: 'Reunir as regras de igualdade de cada categoria de tipo em um quadro único.',
    concept: [
      {
        kind: 'text',
        body:
          'A essa altura você viu quatro comportamentos diferentes de igualdade. Vale organizá-los, porque a confusão entre eles é uma das fontes mais comuns de bug.',
      },
      {
        kind: 'table',
        headers: ['Tipo', '`Equals` padrão', '`==` padrão'],
        rows: [
          ['`class`', 'referência', 'referência'],
          ['`class` com `IEquatable`', '**conteúdo**', 'referência'],
          ['`struct`', '**conteúdo**', 'não existe'],
          ['`record`', '**conteúdo**', '**conteúdo**'],
          ['`record struct`', '**conteúdo**', '**conteúdo**'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A linha mais surpreendente é a do `struct`: o `==` simplesmente **não compila** entre dois structs comuns. O `Equals` funciona e compara conteúdo, mas o operador precisaria ser sobrecarregado à mão.',
      },
      {
        kind: 'text',
        body:
          'Igualdade **estrutural** significa comparar campo a campo. É o que `struct`, `record` e `record struct` fazem por padrão, e o que uma classe com `IEquatable` faz depois de você escrever a regra.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A pergunta que decide tudo: dois objetos com o mesmo conteúdo são **o mesmo**? Para um ponto ou uma cor, sim — use igualdade estrutural. Para uma conta bancária ou um usuário, não — duas contas com o mesmo saldo são contas distintas.',
      },
      {
        kind: 'text',
        body:
          'Sempre que a igualdade for estrutural, coleções que dependem de espalhamento — `Dictionary` e `HashSet` — passam a agrupar por conteúdo, o que costuma ser exatamente o que se quer.',
      },
    ],
    quiz: [
      {
        id: 's05c06l07q1',
        type: 'single',
        prompt: 'O que acontece ao escrever `a == b` entre dois structs comuns?',
        options: [
          { id: 'a', text: 'Erro de compilação: o operador não existe.', correct: true },
          { id: 'b', text: 'Compara conteúdo.' },
          { id: 'c', text: 'Compara referências.' },
          { id: 'd', code: 'false' },
        ],
        explanation:
          'O `Equals` de um struct compara conteúdo, mas o operador `==` precisa ser sobrecarregado explicitamente. `record struct` já vem com ele.',
      },
      {
        id: 's05c06l07q2',
        type: 'single',
        prompt: 'Em quais tipos o `==` compara conteúdo por padrão?',
        options: [
          { id: 'a', text: 'Em `record` e `record struct`.', correct: true },
          { id: 'b', text: 'Em todos os tipos por valor.' },
          { id: 'c', text: 'Em classes com `IEquatable`.' },
          { id: 'd', text: 'Em nenhum.' },
        ],
        explanation:
          'Só as duas formas de `record` sobrecarregam o operador automaticamente. `IEquatable` afeta apenas o `Equals`.',
      },
      {
        id: 's05c06l07q3',
        type: 'single',
        prompt: 'Qual pergunta decide se a igualdade deve ser estrutural?',
        options: [
          { id: 'a', text: 'Dois objetos com o mesmo conteúdo são o mesmo?', correct: true },
          { id: 'b', text: 'O tipo tem mais de três campos?' },
          { id: 'c', text: 'O tipo será usado em coleções?' },
          { id: 'd', text: 'O tipo é público?' },
        ],
        explanation:
          'Valores respondem sim; entidades respondem não. É a mesma distinção que decide entre `struct`/`record` e `class`.',
      },
    ],
    challenge: {
      brief:
        'Compare lado a lado o comportamento de igualdade de quatro tipos com os mesmos dados.',
      requirements: [
        '`PontoClasse` é uma `class` com `X` e `Y` (`int`), sem `Equals` escrito à mão',
        '`PontoEquatable` é uma `class` com `X` e `Y` que implementa `IEquatable<PontoEquatable>` comparando os dois campos, com `Equals(object)` e `GetHashCode`',
        '`PontoStruct` é um `struct` com `X` e `Y`',
        '`PontoRecord` é um `record` com `X` e `Y`',
        'Todos recebem `X` e `Y` no construtor',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare os quatro tipos aqui

class Program
{
    static void Main()
    {
        int x = int.Parse(Console.ReadLine());
        int y = int.Parse(Console.ReadLine());

        var c1 = new PontoClasse(x, y);
        var c2 = new PontoClasse(x, y);
        var e1 = new PontoEquatable(x, y);
        var e2 = new PontoEquatable(x, y);
        var s1 = new PontoStruct(x, y);
        var s2 = new PontoStruct(x, y);
        var r1 = new PontoRecord(x, y);
        var r2 = new PontoRecord(x, y);

        Console.WriteLine($"classe Equals: {c1.Equals(c2)}");
        Console.WriteLine($"classe ==: {c1 == c2}");
        Console.WriteLine($"equatable Equals: {e1.Equals(e2)}");
        Console.WriteLine($"equatable ==: {e1 == e2}");
        Console.WriteLine($"struct Equals: {s1.Equals(s2)}");
        Console.WriteLine($"record Equals: {r1.Equals(r2)}");
        Console.WriteLine($"record ==: {r1 == r2}");

        Console.WriteLine($"classe em HashSet: {new HashSet<PontoClasse> { c1, c2 }.Count}");
        Console.WriteLine($"equatable em HashSet: {new HashSet<PontoEquatable> { e1, e2 }.Count}");
        Console.WriteLine($"struct em HashSet: {new HashSet<PontoStruct> { s1, s2 }.Count}");
        Console.WriteLine($"record em HashSet: {new HashSet<PontoRecord> { r1, r2 }.Count}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class PontoClasse
{
    public int X { get; }
    public int Y { get; }

    public PontoClasse(int x, int y)
    {
        X = x;
        Y = y;
    }
}

class PontoEquatable : IEquatable<PontoEquatable>
{
    public int X { get; }
    public int Y { get; }

    public PontoEquatable(int x, int y)
    {
        X = x;
        Y = y;
    }

    public bool Equals(PontoEquatable outro)
    {
        return outro != null && X == outro.X && Y == outro.Y;
    }

    public override bool Equals(object obj)
    {
        return Equals(obj as PontoEquatable);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(X, Y);
    }
}

struct PontoStruct
{
    public int X { get; }
    public int Y { get; }

    public PontoStruct(int x, int y)
    {
        X = x;
        Y = y;
    }
}

record PontoRecord(int X, int Y);

class Program
{
    static void Main()
    {
        int x = int.Parse(Console.ReadLine());
        int y = int.Parse(Console.ReadLine());

        var c1 = new PontoClasse(x, y);
        var c2 = new PontoClasse(x, y);
        var e1 = new PontoEquatable(x, y);
        var e2 = new PontoEquatable(x, y);
        var s1 = new PontoStruct(x, y);
        var s2 = new PontoStruct(x, y);
        var r1 = new PontoRecord(x, y);
        var r2 = new PontoRecord(x, y);

        Console.WriteLine($"classe Equals: {c1.Equals(c2)}");
        Console.WriteLine($"classe ==: {c1 == c2}");
        Console.WriteLine($"equatable Equals: {e1.Equals(e2)}");
        Console.WriteLine($"equatable ==: {e1 == e2}");
        Console.WriteLine($"struct Equals: {s1.Equals(s2)}");
        Console.WriteLine($"record Equals: {r1.Equals(r2)}");
        Console.WriteLine($"record ==: {r1 == r2}");

        Console.WriteLine($"classe em HashSet: {new HashSet<PontoClasse> { c1, c2 }.Count}");
        Console.WriteLine($"equatable em HashSet: {new HashSet<PontoEquatable> { e1, e2 }.Count}");
        Console.WriteLine($"struct em HashSet: {new HashSet<PontoStruct> { s1, s2 }.Count}");
        Console.WriteLine($"record em HashSet: {new HashSet<PontoRecord> { r1, r2 }.Count}");
    }
}
`,
      hints: [
        'O `PontoRecord` é uma linha só — todo o resto é gerado.',
        'Repare que o `Main` nunca escreve `s1 == s2`: esse operador não existe para um struct comum.',
      ],
      tests: [
        {
          name: 'Ponto na diagonal',
          stdin: '3\n4\n',
          expectedStdout:
            'classe Equals: False\nclasse ==: False\nequatable Equals: True\nequatable ==: False\n' +
            'struct Equals: True\nrecord Equals: True\nrecord ==: True\n' +
            'classe em HashSet: 2\nequatable em HashSet: 1\n' +
            'struct em HashSet: 1\nrecord em HashSet: 1',
        },
        {
          name: 'Origem',
          stdin: '0\n0\n',
          expectedStdout:
            'classe Equals: False\nclasse ==: False\nequatable Equals: True\nequatable ==: False\n' +
            'struct Equals: True\nrecord Equals: True\nrecord ==: True\n' +
            'classe em HashSet: 2\nequatable em HashSet: 1\n' +
            'struct em HashSet: 1\nrecord em HashSet: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c06l08',
    title: 'enum',
    objective: 'Substituir constantes soltas por um tipo que lista todos os valores válidos.',
    concept: [
      {
        kind: 'text',
        body:
          'Um `enum` define um conjunto fechado de valores nomeados. Ele transforma uma coleção de constantes em um **tipo**, e com isso o compilador passa a ajudar.',
      },
      {
        kind: 'compare',
        good: `enum Nivel
{
    Baixo, Medio, Alto
}

void P(Nivel nivel) { ... }
P(Nivel.Alto);    // so valores validos`,
        bad: `const int Baixo = 0;
const int Medio = 1;
const int Alto = 2;

void P(int nivel) { ... }
P(47);            // compila!`,
        goodLabel: 'enum',
        badLabel: 'Constantes soltas',
      },
      {
        kind: 'output',
        code: `Nivel n = Nivel.Medio;

Console.WriteLine(n);              ->  Medio
Console.WriteLine((int)n);         ->  1
Enum.Parse<Nivel>("Alto")          ->  Alto
Enum.GetNames<Nivel>()             ->  Baixo,Medio,Alto`,
        caption: 'Os valores começam em 0 e seguem em ordem, mas podem ser atribuídos explicitamente.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O `enum` combina muito bem com o `switch` da Seção 2: um `switch` sobre um enum lista todos os casos possíveis de forma legível, e o nome de cada caso documenta a intenção.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Por baixo, um `enum` ainda é um número. `(Nivel)99` compila e produz um valor que não corresponde a nenhum nome — ele será impresso como `99`. Valide entradas externas com `Enum.IsDefined`.',
      },
      {
        kind: 'text',
        body:
          'Um `enum` é um tipo por valor, e o valor padrão dele é `0` — ou seja, o primeiro membro declarado. Vale escolher esse primeiro membro com cuidado.',
      },
    ],
    quiz: [
      {
        id: 's05c06l08q1',
        type: 'single',
        prompt: 'Qual é o valor numérico do primeiro membro de um enum, sem atribuição explícita?',
        options: [
          { id: 'a', code: '0', correct: true },
          { id: 'b', code: '1' },
          { id: 'c', text: 'Indefinido.' },
          { id: 'd', text: 'Depende da ordem alfabética.' },
        ],
        explanation:
          'A contagem começa em zero e segue em ordem de declaração. Como `default` de um enum também é zero, o primeiro membro é o valor padrão.',
      },
      {
        id: 's05c06l08q2',
        type: 'single',
        prompt: 'O que `(Nivel)99` produz, se o enum tem só três membros?',
        options: [
          { id: 'a', text: 'Um valor que não corresponde a nenhum nome, impresso como `99`.', correct: true },
          { id: 'b', text: 'Erro de compilação.' },
          { id: 'c', text: 'O terceiro membro.' },
          { id: 'd', text: 'Uma exceção em tempo de execução.' },
        ],
        explanation:
          'A conversão é permitida porque o enum é um número por baixo. `Enum.IsDefined` é o que verifica se o valor corresponde a um membro real.',
      },
      {
        id: 's05c06l08q3',
        type: 'single',
        prompt: 'Qual é a vantagem do enum sobre constantes inteiras soltas?',
        options: [
          { id: 'a', text: 'O tipo do parâmetro passa a aceitar apenas os valores do conjunto.', correct: true },
          { id: 'b', text: 'Ocupa menos memória.' },
          { id: 'c', text: 'É mais rápido.' },
          { id: 'd', text: 'Permite valores calculados.' },
        ],
        explanation:
          'Com `int`, qualquer número passa. Com enum, o compilador exige um membro do conjunto — o erro deixa de existir em vez de virar um teste.',
      },
    ],
    challenge: {
      brief:
        'Modele estados de um pedido com um enum e use `switch` para decidir as transições permitidas.',
      requirements: [
        '`Estado` é um enum com `Novo`, `Pago`, `Enviado`, `Entregue` e `Cancelado`, nessa ordem',
        '`Pedido` é uma classe que recebe o identificador no construtor e começa no estado `Novo`',
        '`Avancar()` move `Novo`→`Pago`→`Enviado`→`Entregue`; a partir de `Entregue` ou `Cancelado`, nada muda',
        '`Cancelar()` leva a `Cancelado`, exceto a partir de `Entregue`, onde nada muda',
        '`Estado` é exposto como propriedade de leitura',
        '`ToString()` devolve `pedido id: estado`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare o enum Estado e a classe Pedido aqui

class Program
{
    static void Main()
    {
        string id = Console.ReadLine();
        int passos = int.Parse(Console.ReadLine());

        Pedido p = new Pedido(id);
        Console.WriteLine(p);

        for (int i = 0; i < passos; i++)
        {
            p.Avancar();
            Console.WriteLine(p);
        }

        Console.WriteLine($"Numero do estado: {(int)p.Estado}");

        p.Cancelar();
        Console.WriteLine($"Apos cancelar: {p}");
        Console.WriteLine($"Estados possiveis: {string.Join(",", Enum.GetNames<Estado>())}");
        Console.WriteLine($"Padrao: {default(Estado)}");
    }
}
`,
      solution: `using System;

enum Estado
{
    Novo,
    Pago,
    Enviado,
    Entregue,
    Cancelado
}

class Pedido
{
    public string Id { get; }
    public Estado Estado { get; private set; }

    public Pedido(string id)
    {
        Id = id;
        Estado = Estado.Novo;
    }

    public void Avancar()
    {
        switch (Estado)
        {
            case Estado.Novo:
                Estado = Estado.Pago;
                break;
            case Estado.Pago:
                Estado = Estado.Enviado;
                break;
            case Estado.Enviado:
                Estado = Estado.Entregue;
                break;
        }
    }

    public void Cancelar()
    {
        if (Estado != Estado.Entregue)
        {
            Estado = Estado.Cancelado;
        }
    }

    public override string ToString()
    {
        return $"pedido {Id}: {Estado}";
    }
}

class Program
{
    static void Main()
    {
        string id = Console.ReadLine();
        int passos = int.Parse(Console.ReadLine());

        Pedido p = new Pedido(id);
        Console.WriteLine(p);

        for (int i = 0; i < passos; i++)
        {
            p.Avancar();
            Console.WriteLine(p);
        }

        Console.WriteLine($"Numero do estado: {(int)p.Estado}");

        p.Cancelar();
        Console.WriteLine($"Apos cancelar: {p}");
        Console.WriteLine($"Estados possiveis: {string.Join(",", Enum.GetNames<Estado>())}");
        Console.WriteLine($"Padrao: {default(Estado)}");
    }
}
`,
      hints: [
        'O `switch` sem `default` deixa os estados finais inalterados — que é exatamente o comportamento pedido.',
        'A propriedade `Estado` usa `private set` para que só a própria classe mude o estado.',
      ],
      tests: [
        {
          name: 'Ate enviado',
          stdin: 'A1\n2\n',
          expectedStdout:
            'pedido A1: Novo\npedido A1: Pago\npedido A1: Enviado\nNumero do estado: 2\n' +
            'Apos cancelar: pedido A1: Cancelado\n' +
            'Estados possiveis: Novo,Pago,Enviado,Entregue,Cancelado\nPadrao: Novo',
        },
        {
          name: 'Ate entregue e alem',
          stdin: 'B2\n5\n',
          expectedStdout:
            'pedido B2: Novo\npedido B2: Pago\npedido B2: Enviado\npedido B2: Entregue\n' +
            'pedido B2: Entregue\npedido B2: Entregue\nNumero do estado: 3\n' +
            'Apos cancelar: pedido B2: Entregue\n' +
            'Estados possiveis: Novo,Pago,Enviado,Entregue,Cancelado\nPadrao: Novo',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c06l09',
    title: 'Prática: enum com Flags',
    objective: 'Representar combinações de opções em um único valor usando operações sobre bits.',
    concept: [
      {
        kind: 'text',
        body:
          'Um enum normal guarda **uma** opção. Com `[Flags]` e valores em potências de dois, ele passa a guardar **qualquer combinação** delas em um único valor.',
      },
      {
        kind: 'code',
        code: `[Flags]
enum Permissao
{
    Nenhuma  = 0,
    Ler      = 1,
    Escrever = 2,
    Executar = 4
}`,
        caption: 'Cada membro ocupa um bit distinto: 1, 2, 4, 8, 16...',
      },
      {
        kind: 'output',
        code: `var p = Permissao.Ler | Permissao.Escrever;

Console.WriteLine(p);                    ->  Ler, Escrever
Console.WriteLine((int)p);               ->  3
p.HasFlag(Permissao.Ler)                 ->  True
p.HasFlag(Permissao.Executar)            ->  False
(Permissao)5                             ->  Ler, Executar`,
        caption: 'O `[Flags]` é o que faz o `ToString` decompor o número nos nomes, separados por vírgula e espaço.',
      },
      {
        kind: 'table',
        headers: ['Operação', 'Operador', 'Exemplo'],
        rows: [
          ['combinar', '`|`', '`Ler \\| Escrever`'],
          ['testar', '`HasFlag`', '`p.HasFlag(Ler)`'],
          ['remover', '`& ~`', '`p & ~Ler`'],
          ['interseção', '`&`', '`p & q`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Os valores **precisam** ser potências de dois. Usar 1, 2, 3 faz as combinações se sobreporem e o resultado fica errado de forma silenciosa.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Vale declarar o valor `0` com um nome como `Nenhuma`, porque ele é o valor padrão do tipo. Sem ele, um enum de flags não inicializado imprime `0`.',
      },
    ],
    quiz: [
      {
        id: 's05c06l09q1',
        type: 'single',
        prompt: 'Por que os valores de um enum de flags precisam ser potências de dois?',
        options: [
          { id: 'a', text: 'Para que cada opção ocupe um bit distinto e as combinações não se sobreponham.', correct: true },
          { id: 'b', text: 'Por convenção de estilo.' },
          { id: 'c', text: 'Para melhorar o desempenho.' },
          { id: 'd', text: 'Porque o `[Flags]` exige.' },
        ],
        explanation:
          'Com 1, 2, 3, a combinação `1 | 2` dá 3 — indistinguível do terceiro membro. Potências de dois garantem que cada combinação seja única.',
      },
      {
        id: 's05c06l09q2',
        type: 'single',
        prompt: 'Qual é a saída de `Console.WriteLine(Permissao.Ler | Permissao.Escrever)`?',
        options: [
          { id: 'a', code: 'Ler, Escrever', correct: true },
          { id: 'b', code: '3' },
          { id: 'c', code: 'Ler|Escrever' },
          { id: 'd', code: 'Ler Escrever' },
        ],
        explanation:
          'O `[Flags]` decompõe o número nos nomes que o formam, separados por vírgula e espaço. Sem o atributo, a saída seria `3`.',
      },
      {
        id: 's05c06l09q3',
        type: 'single',
        prompt: 'Como remover uma flag de um valor combinado?',
        options: [
          { id: 'a', code: 'p & ~Permissao.Ler', correct: true },
          { id: 'b', code: 'p - Permissao.Ler' },
          { id: 'c', code: 'p | ~Permissao.Ler' },
          { id: 'd', code: 'p ^ ~Permissao.Ler' },
        ],
        explanation:
          'O `~` inverte todos os bits da flag, e o `&` mantém apenas os bits que sobreviverem — ou seja, todos menos aquele.',
      },
    ],
    challenge: {
      brief:
        'Modele permissões de arquivo com um enum de flags e implemente conceder, revogar e verificar.',
      requirements: [
        '`Permissao` é um enum com `[Flags]`: `Nenhuma` = 0, `Ler` = 1, `Escrever` = 2, `Executar` = 4',
        '`Arquivo` recebe o nome no construtor e começa com `Permissao.Nenhuma`',
        '`Conceder(Permissao p)` acrescenta a permissão',
        '`Revogar(Permissao p)` remove a permissão',
        '`Pode(Permissao p)` devolve se a permissão está presente',
        '`Permissoes` é uma propriedade de leitura',
        '`ToString()` devolve `nome [permissoes]`',
        'O `Main` interpreta comandos `+nome`, `-nome` e `?nome` da entrada',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare o enum Permissao e a classe Arquivo aqui

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        int comandos = int.Parse(Console.ReadLine());

        Arquivo a = new Arquivo(nome);
        Console.WriteLine(a);

        for (int i = 0; i < comandos; i++)
        {
            string linha = Console.ReadLine();
            char acao = linha[0];
            Permissao p = Enum.Parse<Permissao>(linha.Substring(1));

            if (acao == '+')
            {
                a.Conceder(p);
                Console.WriteLine(a);
            }
            else if (acao == '-')
            {
                a.Revogar(p);
                Console.WriteLine(a);
            }
            else
            {
                Console.WriteLine($"pode {p}: {a.Pode(p)}");
            }
        }

        Console.WriteLine($"Numero final: {(int)a.Permissoes}");
    }
}
`,
      solution: `using System;

[Flags]
enum Permissao
{
    Nenhuma = 0,
    Ler = 1,
    Escrever = 2,
    Executar = 4
}

class Arquivo
{
    public string Nome { get; }
    public Permissao Permissoes { get; private set; }

    public Arquivo(string nome)
    {
        Nome = nome;
        Permissoes = Permissao.Nenhuma;
    }

    public void Conceder(Permissao p)
    {
        Permissoes = Permissoes | p;
    }

    public void Revogar(Permissao p)
    {
        Permissoes = Permissoes & ~p;
    }

    public bool Pode(Permissao p)
    {
        return Permissoes.HasFlag(p);
    }

    public override string ToString()
    {
        return $"{Nome} [{Permissoes}]";
    }
}

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        int comandos = int.Parse(Console.ReadLine());

        Arquivo a = new Arquivo(nome);
        Console.WriteLine(a);

        for (int i = 0; i < comandos; i++)
        {
            string linha = Console.ReadLine();
            char acao = linha[0];
            Permissao p = Enum.Parse<Permissao>(linha.Substring(1));

            if (acao == '+')
            {
                a.Conceder(p);
                Console.WriteLine(a);
            }
            else if (acao == '-')
            {
                a.Revogar(p);
                Console.WriteLine(a);
            }
            else
            {
                Console.WriteLine($"pode {p}: {a.Pode(p)}");
            }
        }

        Console.WriteLine($"Numero final: {(int)a.Permissoes}");
    }
}
`,
      hints: [
        'Conceder é `|`, revogar é `& ~`, e verificar é `HasFlag`.',
        'Quando todas as permissões são revogadas, o valor volta a `0` e o `ToString` imprime `Nenhuma`.',
      ],
      tests: [
        {
          name: 'Concede e revoga',
          stdin: 'dados.txt\n5\n+Ler\n+Escrever\n?Ler\n-Ler\n?Ler\n',
          expectedStdout:
            'dados.txt [Nenhuma]\ndados.txt [Ler]\ndados.txt [Ler, Escrever]\n' +
            'pode Ler: True\ndados.txt [Escrever]\npode Ler: False\nNumero final: 2',
        },
        {
          name: 'Todas as permissoes',
          stdin: 'script.sh\n4\n+Ler\n+Escrever\n+Executar\n?Executar\n',
          expectedStdout:
            'script.sh [Nenhuma]\nscript.sh [Ler]\nscript.sh [Ler, Escrever]\n' +
            'script.sh [Ler, Escrever, Executar]\npode Executar: True\nNumero final: 7',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c06l10',
    title: 'Checkpoint: valor ou referência',
    objective: 'Escolher entre classe, struct, record e enum a partir da natureza de cada dado do problema.',
    concept: [
      {
        kind: 'text',
        body:
          'Todo tipo que você escreve responde a uma pergunta: esse dado é uma **entidade**, um **valor** ou uma **escolha**? A resposta determina o mecanismo.',
      },
      {
        kind: 'table',
        headers: ['Natureza do dado', 'Pergunta que revela', 'Mecanismo'],
        rows: [
          ['entidade', 'tem identidade própria?', '`class`'],
          ['valor', 'dois iguais são o mesmo?', '`record` ou `record struct`'],
          ['valor pequeno', 'cabe em poucos campos?', '`readonly record struct`'],
          ['escolha fechada', 'a lista de opções é fixa?', '`enum`'],
          ['combinação de escolhas', 'várias ao mesmo tempo?', '`enum` com `[Flags]`'],
        ],
      },
      {
        kind: 'text',
        body:
          'Um mesmo sistema costuma usar os quatro. Um pedido é uma entidade — ele tem número e histórico. O dinheiro dele é um valor. O estado é uma escolha. As permissões de quem o acessa são uma combinação.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Escolher errado não impede o programa de funcionar, mas cria atrito: uma entidade como record fica com igualdade absurda; um valor como classe exige `Equals` escrito à mão; uma escolha como `string` transforma erro de compilação em erro de execução.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Na dúvida entre `record` e `record struct`, escolha `record`. A vantagem do struct é evitar alocações em valores muito pequenos e muito numerosos — uma otimização, não uma decisão de projeto.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Cuidado com o valor padrão de cada categoria: `class` e `record` começam `null`; `struct` e `enum` sempre existem, zerados. Um enum cujo primeiro membro é um estado significativo pode esconder um bug de inicialização.',
      },
    ],
    quiz: [
      {
        id: 's05c06l10q1',
        type: 'single',
        prompt: 'Uma conta bancária deve ser modelada como quê?',
        options: [
          { id: 'a', text: '`class`, porque tem identidade própria.', correct: true },
          { id: 'b', text: '`record`, porque tem vários campos.' },
          { id: 'c', text: '`struct`, porque guarda um valor.' },
          { id: 'd', text: '`enum`, porque tem estados.' },
        ],
        explanation:
          'Duas contas com o mesmo saldo e o mesmo titular continuam sendo contas diferentes. Isso é identidade, e identidade pede classe.',
      },
      {
        id: 's05c06l10q2',
        type: 'single',
        prompt: 'Qual o problema de modelar uma escolha fechada como `string`?',
        options: [
          { id: 'a', text: 'Um valor inválido só é descoberto em tempo de execução.', correct: true },
          { id: 'b', text: 'Ocupa mais memória.' },
          { id: 'c', text: 'Não pode ser usada em `switch`.' },
          { id: 'd', text: 'Não pode ser comparada.' },
        ],
        explanation:
          'Com `enum`, escrever um valor que não existe nem compila. Com `string`, um erro de digitação vira um bug em produção.',
      },
      {
        id: 's05c06l10q3',
        type: 'single',
        prompt: 'Quando escolher `record struct` em vez de `record`?',
        options: [
          { id: 'a', text: 'Para valores muito pequenos e muito numerosos, como otimização.', correct: true },
          { id: 'b', text: 'Sempre que o tipo for imutável.' },
          { id: 'c', text: 'Quando houver mais de três campos.' },
          { id: 'd', text: 'Quando o tipo implementar interfaces.' },
        ],
        explanation:
          'É uma decisão de desempenho, não de projeto. Comece com `record` e mude quando houver uma razão medida.',
      },
    ],
    challenge: {
      brief:
        'Modele um sistema de reservas usando cada mecanismo onde ele é apropriado: entidade, valor, escolha e combinação.',
      requirements: [
        '`Situacao` é um enum com `Pendente`, `Confirmada`, `Cancelada`',
        '`Extras` é um enum com `[Flags]`: `Nenhum` = 0, `CafeDaManha` = 1, `Estacionamento` = 2, `Wifi` = 4',
        '`Periodo` é um `readonly record struct` com `Entrada` e `Saida` (`int`, o dia do mês) e a propriedade calculada `Noites`',
        '`Reserva` é uma `class` com `Codigo` (`string`), `Periodo`, `Situacao` (leitura, começa `Pendente`) e `Extras` (leitura, começa `Nenhum`)',
        '`Confirmar()` só sai de `Pendente`; `Cancelar()` sai de `Pendente` ou `Confirmada`',
        '`Adicionar(Extras e)` acrescenta um extra',
        '`Total(int diaria)` devolve `Noites * diaria`, somando 30 por noite se tem café e 20 por noite se tem estacionamento',
        '`ToString()` devolve `codigo: situacao, N noites, extras`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare Situacao, Extras, Periodo e Reserva aqui

class Program
{
    static void Main()
    {
        string codigo = Console.ReadLine();
        int entrada = int.Parse(Console.ReadLine());
        int saida = int.Parse(Console.ReadLine());
        int diaria = int.Parse(Console.ReadLine());

        Periodo p = new Periodo(entrada, saida);
        Reserva r = new Reserva(codigo, p);

        Console.WriteLine(r);
        Console.WriteLine($"Total simples: {r.Total(diaria)}");

        r.Adicionar(Extras.CafeDaManha);
        r.Adicionar(Extras.Estacionamento);
        Console.WriteLine(r);
        Console.WriteLine($"Total com extras: {r.Total(diaria)}");

        r.Confirmar();
        Console.WriteLine(r);

        r.Confirmar();
        Console.WriteLine($"Confirmar de novo: {r.Situacao}");

        r.Cancelar();
        Console.WriteLine(r);

        Console.WriteLine($"Periodo e valor: {typeof(Periodo).IsValueType}");
        Console.WriteLine($"Reserva e valor: {typeof(Reserva).IsValueType}");
        Console.WriteLine($"Periodo igual: {p == new Periodo(entrada, saida)}");
    }
}
`,
      solution: `using System;

enum Situacao
{
    Pendente,
    Confirmada,
    Cancelada
}

[Flags]
enum Extras
{
    Nenhum = 0,
    CafeDaManha = 1,
    Estacionamento = 2,
    Wifi = 4
}

readonly record struct Periodo(int Entrada, int Saida)
{
    public int Noites => Saida - Entrada;
}

class Reserva
{
    public string Codigo { get; }
    public Periodo Periodo { get; }
    public Situacao Situacao { get; private set; }
    public Extras Extras { get; private set; }

    public Reserva(string codigo, Periodo periodo)
    {
        Codigo = codigo;
        Periodo = periodo;
        Situacao = Situacao.Pendente;
        Extras = Extras.Nenhum;
    }

    public void Confirmar()
    {
        if (Situacao == Situacao.Pendente)
        {
            Situacao = Situacao.Confirmada;
        }
    }

    public void Cancelar()
    {
        if (Situacao != Situacao.Cancelada)
        {
            Situacao = Situacao.Cancelada;
        }
    }

    public void Adicionar(Extras e)
    {
        Extras = Extras | e;
    }

    public int Total(int diaria)
    {
        int porNoite = diaria;

        if (Extras.HasFlag(Extras.CafeDaManha))
        {
            porNoite += 30;
        }

        if (Extras.HasFlag(Extras.Estacionamento))
        {
            porNoite += 20;
        }

        return Periodo.Noites * porNoite;
    }

    public override string ToString()
    {
        return $"{Codigo}: {Situacao}, {Periodo.Noites} noites, {Extras}";
    }
}

class Program
{
    static void Main()
    {
        string codigo = Console.ReadLine();
        int entrada = int.Parse(Console.ReadLine());
        int saida = int.Parse(Console.ReadLine());
        int diaria = int.Parse(Console.ReadLine());

        Periodo p = new Periodo(entrada, saida);
        Reserva r = new Reserva(codigo, p);

        Console.WriteLine(r);
        Console.WriteLine($"Total simples: {r.Total(diaria)}");

        r.Adicionar(Extras.CafeDaManha);
        r.Adicionar(Extras.Estacionamento);
        Console.WriteLine(r);
        Console.WriteLine($"Total com extras: {r.Total(diaria)}");

        r.Confirmar();
        Console.WriteLine(r);

        r.Confirmar();
        Console.WriteLine($"Confirmar de novo: {r.Situacao}");

        r.Cancelar();
        Console.WriteLine(r);

        Console.WriteLine($"Periodo e valor: {typeof(Periodo).IsValueType}");
        Console.WriteLine($"Reserva e valor: {typeof(Reserva).IsValueType}");
        Console.WriteLine($"Periodo igual: {p == new Periodo(entrada, saida)}");
    }
}
`,
      hints: [
        'Some os adicionais à diária **antes** de multiplicar pelas noites — os extras são cobrados por noite.',
        'O `Periodo` não aparece no `ToString` da reserva: só o número de noites.',
      ],
      tests: [
        {
          name: 'Reserva de tres noites',
          stdin: 'R100\n10\n13\n200\n',
          expectedStdout:
            'R100: Pendente, 3 noites, Nenhum\nTotal simples: 600\n' +
            'R100: Pendente, 3 noites, CafeDaManha, Estacionamento\nTotal com extras: 750\n' +
            'R100: Confirmada, 3 noites, CafeDaManha, Estacionamento\n' +
            'Confirmar de novo: Confirmada\n' +
            'R100: Cancelada, 3 noites, CafeDaManha, Estacionamento\n' +
            'Periodo e valor: True\nReserva e valor: False\nPeriodo igual: True',
        },
        {
          name: 'Reserva de uma noite',
          stdin: 'R200\n1\n2\n100\n',
          expectedStdout:
            'R200: Pendente, 1 noites, Nenhum\nTotal simples: 100\n' +
            'R200: Pendente, 1 noites, CafeDaManha, Estacionamento\nTotal com extras: 150\n' +
            'R200: Confirmada, 1 noites, CafeDaManha, Estacionamento\n' +
            'Confirmar de novo: Confirmada\n' +
            'R200: Cancelada, 1 noites, CafeDaManha, Estacionamento\n' +
            'Periodo e valor: True\nReserva e valor: False\nPeriodo igual: True',
          hidden: true,
        },
      ],
    },
  },
]
