import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's05c02l01',
    title: 'public, private e internal',
    objective: 'Controlar quem pode acessar cada membro, escondendo o que é detalhe interno da classe.',
    concept: [
      {
        kind: 'text',
        body:
          'Todo membro de uma classe tem um **modificador de acesso**, que decide quem pode enxergá-lo. Até aqui você usou `public` em tudo — o que significa que qualquer código pode mexer em qualquer campo.',
      },
      {
        kind: 'table',
        headers: ['Modificador', 'Acessível de'],
        rows: [
          ['`public`', 'qualquer lugar'],
          ['`private`', 'só de dentro da própria classe'],
          ['`internal`', 'de qualquer lugar do mesmo projeto'],
          ['(nenhum)', 'em classe, equivale a `private`'],
        ],
      },
      {
        kind: 'code',
        code: `class Conta
{
    private decimal saldo;        // so a Conta enxerga

    public bool Sacar(decimal valor)
    {
        if (valor <= 0 || valor > saldo) return false;

        saldo -= valor;           // aqui pode
        return true;
    }
}

Conta c = new Conta();
c.saldo = 1000000m;   // NAO compila: saldo e privado`,
        caption: 'O campo privado só pode ser alterado por métodos da própria classe.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O ganho não é secretismo: é **controle**. Com o saldo privado, toda mudança passa obrigatoriamente por `Sacar` e `Depositar`, que podem validar. Um campo público não tem como impedir um saque de valor negativo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A convenção do C# é campos privados em `camelCase` e membros públicos em `PascalCase`. Isso torna a diferença visível na leitura: `saldo` é interno, `Saldo` é a forma pública de consultá-lo.',
      },
      {
        kind: 'text',
        body:
          'A regra prática: comece com tudo `private` e torne público apenas o que precisa ser usado de fora. É muito mais fácil abrir depois do que fechar algo de que outros já dependem.',
      },
    ],
    quiz: [
      {
        id: 's05c02l01q1',
        type: 'single',
        prompt: 'Quem pode acessar um campo `private`?',
        options: [
          { id: 'a', text: 'Apenas código dentro da própria classe.', correct: true },
          { id: 'b', text: 'Qualquer código do projeto.' },
          { id: 'c', text: 'Apenas o construtor.' },
          { id: 'd', text: 'Apenas métodos `static`.' },
        ],
        explanation:
          'Qualquer método da classe pode acessá-lo, incluindo construtores. O que fica de fora é todo código escrito em outras classes.',
      },
      {
        id: 's05c02l01q2',
        type: 'single',
        prompt: 'Qual é o real ganho de tornar um campo privado?',
        options: [
          { id: 'a', text: 'Toda alteração passa por métodos que podem validar.', correct: true },
          { id: 'b', text: 'O campo ocupa menos memória.' },
          { id: 'c', text: 'O acesso fica mais rápido.' },
          { id: 'd', text: 'O valor fica criptografado.' },
        ],
        explanation:
          'Privado não é sobre esconder informação, é sobre garantir que o estado só mude por caminhos controlados.',
      },
      {
        id: 's05c02l01q3',
        type: 'single',
        prompt: 'Qual é o acesso padrão de um membro de classe sem modificador?',
        options: [
          { id: 'a', code: 'private', correct: true },
          { id: 'b', code: 'public' },
          { id: 'c', code: 'internal' },
          { id: 'd', text: 'Erro de compilação: o modificador é obrigatório.' },
        ],
        explanation:
          'O padrão é o mais restritivo, o que é uma boa escolha de projeto: você precisa decidir conscientemente expor algo.',
      },
    ],
    challenge: {
      brief:
        'Crie uma classe `Cofre` cujo conteúdo só pode ser alterado por métodos, nunca diretamente. O `Main` tenta operações válidas e inválidas.',
      requirements: [
        '`Cofre` guarda um valor interno que **não** pode ser acessado de fora da classe',
        'O construtor recebe o valor inicial; valores negativos viram `0`',
        '`Depositar(decimal)` devolve `true` e soma quando o valor é positivo, e `false` sem alterar nada caso contrário',
        '`Sacar(decimal)` devolve `true` e subtrai quando o valor é positivo e cabe no saldo, e `false` sem alterar nada caso contrário',
        '`Consultar()` devolve o valor atual',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Cofre aqui

class Program
{
    static void Main()
    {
        decimal inicial = decimal.Parse(Console.ReadLine());
        Cofre c = new Cofre(inicial);

        Console.WriteLine($"Inicial: {c.Consultar():F2}");

        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            string operacao = Console.ReadLine();
            decimal valor = decimal.Parse(Console.ReadLine());

            bool ok = operacao == "d" ? c.Depositar(valor) : c.Sacar(valor);

            Console.WriteLine($"{operacao} {valor:F2}: {ok} -> {c.Consultar():F2}");
        }

        Console.WriteLine($"Final: {c.Consultar():F2}");
    }
}
`,
      solution: `using System;

class Cofre
{
    private decimal valor;

    public Cofre(decimal inicial)
    {
        valor = inicial < 0m ? 0m : inicial;
    }

    public bool Depositar(decimal quanto)
    {
        if (quanto <= 0m)
        {
            return false;
        }

        valor += quanto;
        return true;
    }

    public bool Sacar(decimal quanto)
    {
        if (quanto <= 0m || quanto > valor)
        {
            return false;
        }

        valor -= quanto;
        return true;
    }

    public decimal Consultar()
    {
        return valor;
    }
}

class Program
{
    static void Main()
    {
        decimal inicial = decimal.Parse(Console.ReadLine());
        Cofre c = new Cofre(inicial);

        Console.WriteLine($"Inicial: {c.Consultar():F2}");

        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            string operacao = Console.ReadLine();
            decimal valor = decimal.Parse(Console.ReadLine());

            bool ok = operacao == "d" ? c.Depositar(valor) : c.Sacar(valor);

            Console.WriteLine($"{operacao} {valor:F2}: {ok} -> {c.Consultar():F2}");
        }

        Console.WriteLine($"Final: {c.Consultar():F2}");
    }
}
`,
      hints: [
        'O campo interno é declarado `private`, em minúscula, e nenhum método fora da classe o enxerga.',
        'Cada operação valida **antes** de alterar: se a validação falha, o estado fica intacto.',
      ],
      tests: [
        {
          name: 'Operações válidas e inválidas',
          stdin: '100\n4\nd\n50\ns\n30\ns\n500\nd\n-10\n',
          expectedStdout:
            'Inicial: 100.00\nd 50.00: True -> 150.00\ns 30.00: True -> 120.00\n' +
            's 500.00: False -> 120.00\nd -10.00: False -> 120.00\nFinal: 120.00',
        },
        {
          name: 'Saldo inicial negativo vira zero',
          stdin: '-50\n2\ns\n10\nd\n25\n',
          expectedStdout:
            'Inicial: 0.00\ns 10.00: False -> 0.00\nd 25.00: True -> 25.00\nFinal: 25.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c02l02',
    title: 'Propriedades',
    objective: 'Expor dados com a sintaxe de campo, mas o controle de um método.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma **propriedade** parece um campo por fora e é um par de métodos por dentro. Ela resolve o dilema entre a conveniência do campo público e o controle do método.',
      },
      {
        kind: 'code',
        code: `class Produto
{
    private decimal preco;              // o campo real, escondido

    public decimal Preco                // a propriedade, publica
    {
        get { return preco; }
        set { preco = value; }
    }
}

Produto p = new Produto();
p.Preco = 150m;                 // parece campo, chama o 'set'
Console.WriteLine(p.Preco);     // parece campo, chama o 'get'`,
        caption: 'O `value` é uma palavra reservada: ele contém o valor que está sendo atribuído.',
      },
      {
        kind: 'table',
        headers: ['Parte', 'Executa quando', 'Papel'],
        rows: [
          ['`get`', 'o valor é lido', 'devolve o valor'],
          ['`set`', 'o valor é atribuído', 'recebe em `value`'],
          ['campo privado', '—', 'guarda o dado de fato'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A vantagem decisiva é poder mudar de ideia depois. Um campo público que vira propriedade quebra todo código que o usava; uma propriedade que ganha validação no `set` não quebra ninguém — a sintaxe de quem chama continua idêntica.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O campo privado por trás da propriedade é chamado de campo de apoio, e por convenção usa o mesmo nome em minúscula. Escrever `Preco = value` dentro do `set` por engano cria uma recursão infinita, porque a propriedade chamaria a si mesma.',
      },
      {
        kind: 'text',
        body:
          'Essa forma completa é necessária quando há lógica no `get` ou no `set`. Quando não há, existe uma sintaxe muito mais curta — assunto de duas lições adiante.',
      },
    ],
    quiz: [
      {
        id: 's05c02l02q1',
        type: 'single',
        prompt: 'O que a palavra `value` representa dentro de um `set`?',
        options: [
          { id: 'a', text: 'O valor que está sendo atribuído à propriedade.', correct: true },
          { id: 'b', text: 'O valor atual do campo.' },
          { id: 'c', text: 'O nome da propriedade.' },
          { id: 'd', text: 'O objeto atual.' },
        ],
        explanation:
          'Ele é o parâmetro implícito do `set`. Em `p.Preco = 150m`, o `value` vale `150m` dentro do bloco.',
      },
      {
        id: 's05c02l02q2',
        type: 'single',
        prompt: 'O que acontece ao escrever `Preco = value;` dentro do `set` da propriedade `Preco`?',
        options: [
          { id: 'a', text: 'Recursão infinita: a propriedade chama a si mesma.', correct: true },
          { id: 'b', text: 'Funciona normalmente.' },
          { id: 'c', text: 'Erro de compilação.' },
          { id: 'd', text: 'O valor é ignorado.' },
        ],
        explanation:
          'Atribuir à propriedade invoca o `set` de novo, indefinidamente — até estourar a pilha. O destino correto é o campo de apoio, em minúscula.',
      },
      {
        id: 's05c02l02q3',
        type: 'single',
        prompt: 'Qual é a principal vantagem de uma propriedade sobre um campo público?',
        options: [
          { id: 'a', text: 'Ela pode ganhar lógica depois sem quebrar quem já a usa.', correct: true },
          { id: 'b', text: 'Ela é mais rápida.' },
          { id: 'c', text: 'Ela ocupa menos memória.' },
          { id: 'd', text: 'Ela não pode ser lida.' },
        ],
        explanation:
          'A sintaxe de uso é a mesma de um campo, então trocar a implementação interna é invisível para quem chama. Um campo público não oferece esse ponto de extensão.',
      },
    ],
    challenge: {
      brief:
        'Crie uma classe `Termometro` cuja propriedade de temperatura registra quantas vezes foi lida e escrita. O `Main` exercita a classe e mostra os contadores.',
      requirements: [
        '`Termometro` expõe uma propriedade `Celsius` do tipo `double`, com `get` e `set` escritos por extenso',
        'Cada leitura de `Celsius` incrementa um contador de leituras',
        'Cada escrita incrementa um contador de escritas',
        '`Leituras` e `Escritas` são propriedades apenas de leitura, que **não** contam a si mesmas',
        'A temperatura começa em `0`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Termometro aqui

class Program
{
    static void Main()
    {
        Termometro t = new Termometro();

        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            t.Celsius = double.Parse(Console.ReadLine());
            Console.WriteLine($"Registrado: {t.Celsius:F1}");
        }

        Console.WriteLine($"Ultima: {t.Celsius:F1}");
        Console.WriteLine($"Escritas: {t.Escritas}");
        Console.WriteLine($"Leituras: {t.Leituras}");
    }
}
`,
      solution: `using System;

class Termometro
{
    private double celsius;
    private int leituras;
    private int escritas;

    public double Celsius
    {
        get
        {
            leituras++;
            return celsius;
        }
        set
        {
            escritas++;
            celsius = value;
        }
    }

    public int Leituras
    {
        get { return leituras; }
    }

    public int Escritas
    {
        get { return escritas; }
    }
}

class Program
{
    static void Main()
    {
        Termometro t = new Termometro();

        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            t.Celsius = double.Parse(Console.ReadLine());
            Console.WriteLine($"Registrado: {t.Celsius:F1}");
        }

        Console.WriteLine($"Ultima: {t.Celsius:F1}");
        Console.WriteLine($"Escritas: {t.Escritas}");
        Console.WriteLine($"Leituras: {t.Leituras}");
    }
}
`,
      hints: [
        'O `get` pode ter mais de uma linha: incremente o contador e depois devolva o campo.',
        '`Leituras` e `Escritas` só têm `get`, e devolvem os campos privados sem incrementar nada.',
      ],
      tests: [
        {
          name: 'Três registros',
          stdin: '3\n20.5\n21.0\n19.5\n',
          expectedStdout:
            'Registrado: 20.5\nRegistrado: 21.0\nRegistrado: 19.5\nUltima: 19.5\nEscritas: 3\nLeituras: 4',
        },
        {
          name: 'Nenhum registro',
          stdin: '0\n',
          expectedStdout: 'Ultima: 0.0\nEscritas: 0\nLeituras: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c02l03',
    title: 'get e set',
    objective: 'Controlar leitura e escrita de forma independente, criando propriedades somente leitura.',
    concept: [
      {
        kind: 'text',
        body:
          'Os dois acessores são independentes. Omitir um deles, ou dar a ele um acesso mais restrito, é como se define o que pode ser lido e o que pode ser alterado de fora.',
      },
      {
        kind: 'table',
        headers: ['Forma', 'De fora', 'De dentro'],
        rows: [
          ['`{ get; set; }`', 'lê e escreve', 'lê e escreve'],
          ['`{ get; }`', 'só lê', 'só no construtor'],
          ['`{ get; private set; }`', 'só lê', 'lê e escreve'],
          ['`{ get; init; }`', 'só lê', 'só na criação'],
        ],
      },
      {
        kind: 'code',
        code: `class Pedido
{
    public int Numero { get; }              // fixo apos a criacao
    public decimal Total { get; private set; }   // so a classe altera

    public Pedido(int numero)
    {
        Numero = numero;      // permitido: estamos no construtor
    }

    public void Adicionar(decimal valor)
    {
        Total += valor;       // permitido: o 'set' e privado, mas estamos dentro
    }
}`,
        caption: 'O total muda, mas só por dentro da classe — quem chama não consegue atribuir.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O `private set` é a forma mais usada de expor estado que muda: quem lê consegue consultar, e quem altera precisa passar pelos métodos da classe. É o encapsulamento com a conveniência de leitura de um campo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Uma propriedade só com `get` pode ser atribuída **no construtor**, e só lá. Depois disso ela é imutável, inclusive para código dentro da própria classe.',
      },
      {
        kind: 'text',
        body:
          'O acessor `init` é uma variação moderna: ele permite atribuição no construtor **e** em um inicializador de objeto, mas nunca depois. É o que o `record` da Seção 3 usa por padrão.',
      },
    ],
    quiz: [
      {
        id: 's05c02l03q1',
        type: 'single',
        prompt: 'Onde uma propriedade `{ get; }` pode receber valor?',
        options: [
          { id: 'a', text: 'Apenas no construtor.', correct: true },
          { id: 'b', text: 'Em qualquer método da classe.' },
          { id: 'c', text: 'Em qualquer lugar.' },
          { id: 'd', text: 'Em nenhum lugar.' },
        ],
        explanation:
          'É o que a torna imutável depois da criação: nem métodos da própria classe conseguem alterá-la.',
      },
      {
        id: 's05c02l03q2',
        type: 'single',
        prompt: 'O que `{ get; private set; }` permite?',
        options: [
          { id: 'a', text: 'Leitura de fora, e escrita apenas de dentro da classe.', correct: true },
          { id: 'b', text: 'Escrita de fora, e leitura apenas de dentro.' },
          { id: 'c', text: 'Leitura e escrita de qualquer lugar.' },
          { id: 'd', text: 'Nem leitura nem escrita de fora.' },
        ],
        explanation:
          'É a forma mais comum de expor estado que muda ao longo da vida do objeto, mantendo o controle sobre **como** ele muda.',
      },
      {
        id: 's05c02l03q3',
        type: 'single',
        prompt: 'Qual é a diferença entre `get;` e `get; init;`?',
        options: [
          { id: 'a', text: 'O `init` também permite atribuição em um inicializador de objeto.', correct: true },
          { id: 'b', text: 'O `init` permite atribuição a qualquer momento.' },
          { id: 'c', text: 'Não há diferença.' },
          { id: 'd', text: 'O `init` só funciona em `record`.' },
        ],
        explanation:
          'Os dois são imutáveis depois da criação. O `init` apenas amplia o momento em que a atribuição inicial é permitida.',
      },
    ],
    challenge: {
      brief:
        'Crie uma classe `Pedido` em que o número é fixo desde a criação e o total só muda por dentro da classe. O `Main` adiciona valores e consulta o estado.',
      requirements: [
        '`Pedido` expõe `Numero` (`int`), que não pode ser alterado após a criação',
        '`Pedido` expõe `Total` (`decimal`) e `Itens` (`int`), legíveis de fora mas alteráveis apenas pela própria classe',
        'O construtor recebe o número do pedido',
        '`Adicionar(decimal valor)` soma ao total e incrementa a contagem de itens quando o valor é positivo, devolvendo `true`',
        'Valores não positivos são rejeitados: devolve `false` e nada muda',
        '`Media()` devolve o valor médio por item, ou `0` quando não há itens',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Pedido aqui

class Program
{
    static void Main()
    {
        int numero = int.Parse(Console.ReadLine());
        Pedido p = new Pedido(numero);

        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            decimal valor = decimal.Parse(Console.ReadLine());
            Console.WriteLine($"Adicionar {valor:F2}: {p.Adicionar(valor)}");
        }

        Console.WriteLine($"Pedido: {p.Numero}");
        Console.WriteLine($"Itens: {p.Itens}");
        Console.WriteLine($"Total: {p.Total:F2}");
        Console.WriteLine($"Media: {p.Media():F2}");
    }
}
`,
      solution: `using System;

class Pedido
{
    public int Numero { get; }
    public decimal Total { get; private set; }
    public int Itens { get; private set; }

    public Pedido(int numero)
    {
        Numero = numero;
    }

    public bool Adicionar(decimal valor)
    {
        if (valor <= 0m)
        {
            return false;
        }

        Total += valor;
        Itens++;
        return true;
    }

    public decimal Media()
    {
        if (Itens == 0)
        {
            return 0m;
        }

        return Total / Itens;
    }
}

class Program
{
    static void Main()
    {
        int numero = int.Parse(Console.ReadLine());
        Pedido p = new Pedido(numero);

        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            decimal valor = decimal.Parse(Console.ReadLine());
            Console.WriteLine($"Adicionar {valor:F2}: {p.Adicionar(valor)}");
        }

        Console.WriteLine($"Pedido: {p.Numero}");
        Console.WriteLine($"Itens: {p.Itens}");
        Console.WriteLine($"Total: {p.Total:F2}");
        Console.WriteLine($"Media: {p.Media():F2}");
    }
}
`,
      hints: [
        '`Numero` usa apenas `{ get; }` e é atribuído no construtor.',
        '`Total` e `Itens` usam `{ get; private set; }` — o `Adicionar` consegue alterá-los, o `Main` não.',
      ],
      tests: [
        {
          name: 'Valores válidos e um rejeitado',
          stdin: '1001\n4\n100\n50\n-20\n30\n',
          expectedStdout:
            'Adicionar 100.00: True\nAdicionar 50.00: True\nAdicionar -20.00: False\nAdicionar 30.00: True\n' +
            'Pedido: 1001\nItens: 3\nTotal: 180.00\nMedia: 60.00',
        },
        {
          name: 'Nenhum item aceito',
          stdin: '7\n2\n0\n-5\n',
          expectedStdout:
            'Adicionar 0.00: False\nAdicionar -5.00: False\n' +
            'Pedido: 7\nItens: 0\nTotal: 0.00\nMedia: 0.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c02l04',
    title: 'Auto-propriedades e valores padrão',
    objective: 'Escrever propriedades sem lógica na forma curta, com valores iniciais quando necessário.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando o `get` só devolve e o `set` só atribui, escrever tudo por extenso é ruído. A **auto-propriedade** deixa o compilador criar o campo de apoio por você.',
      },
      {
        kind: 'compare',
        good: `public string Nome { get; set; }`,
        bad: `private string nome;

public string Nome
{
    get { return nome; }
    set { nome = value; }
}`,
        goodLabel: 'Auto-propriedade',
        badLabel: 'Mesma coisa, seis linhas',
      },
      {
        kind: 'text',
        body:
          'O campo de apoio continua existindo — você apenas não o escreve nem consegue acessá-lo diretamente. Isso significa que trocar para a forma completa depois é uma mudança puramente interna.',
      },
      {
        kind: 'code',
        code: `class Configuracao
{
    public string Ambiente { get; set; } = "producao";   // valor padrao
    public int Tentativas { get; set; } = 3;
    public bool Ativo { get; set; }                      // false
}`,
        caption: 'O valor padrão vai depois das chaves, como na inicialização de um campo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Dar valores padrão às auto-propriedades é o que permite criar um objeto com o inicializador e ainda assim ter um estado sensato. Cada campo não preenchido cai no padrão em vez de virar `null` ou zero por acidente.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Uma auto-propriedade não pode validar nada. No momento em que você precisar rejeitar um valor no `set`, ela tem que virar a forma completa — e é exatamente isso que a lição sobre validação vai pedir.',
      },
      {
        kind: 'text',
        body:
          'A recomendação prática: comece com auto-propriedade e só expanda quando precisar de lógica. O código fica menor, e a troca depois não afeta ninguém de fora.',
      },
    ],
    quiz: [
      {
        id: 's05c02l04q1',
        type: 'single',
        prompt: 'O que `public string Nome { get; set; }` cria por baixo?',
        options: [
          { id: 'a', text: 'Um campo privado gerado pelo compilador, mais os dois acessores.', correct: true },
          { id: 'b', text: 'Apenas um campo público.' },
          { id: 'c', text: 'Nada: é só uma declaração.' },
          { id: 'd', text: 'Um método com dois parâmetros.' },
        ],
        explanation:
          'O campo de apoio existe, mas é inacessível pelo nome. Por isso trocar para a forma completa depois não afeta quem usa a classe.',
      },
      {
        id: 's05c02l04q2',
        type: 'single',
        prompt: 'Como dar um valor padrão a uma auto-propriedade?',
        options: [
          { id: 'a', code: 'public int X { get; set; } = 3;', correct: true },
          { id: 'b', code: 'public int X { get = 3; set; }' },
          { id: 'c', code: 'public int X { get; set; default 3; }' },
          { id: 'd', text: 'Não é possível: só no construtor.' },
        ],
        explanation:
          'A sintaxe é a mesma da inicialização de campo, com o `=` depois das chaves. O construtor também pode sobrescrever esse valor.',
      },
      {
        id: 's05c02l04q3',
        type: 'single',
        prompt: 'Quando uma auto-propriedade precisa virar a forma completa?',
        options: [
          { id: 'a', text: 'Quando o `get` ou o `set` precisam de lógica, como validação.', correct: true },
          { id: 'b', text: 'Quando o tipo é `string`.' },
          { id: 'c', text: 'Quando há mais de três propriedades.' },
          { id: 'd', text: 'Nunca.' },
        ],
        explanation:
          'A auto-propriedade não tem onde colocar código. Qualquer regra — validar, registrar, calcular — exige o corpo por extenso.',
      },
    ],
    challenge: {
      brief:
        'Crie uma classe `Configuracao` usando apenas auto-propriedades com valores padrão sensatos. O `Main` cria uma configuração padrão e outra personalizada.',
      requirements: [
        '`Configuracao` expõe `Ambiente` (`string`, padrão `"producao"`), `Tentativas` (`int`, padrão `3`), `TimeoutSegundos` (`int`, padrão `30`) e `Verboso` (`bool`, padrão `false`)',
        'Todas são auto-propriedades com `get` e `set` públicos',
        '`Resumo()` devolve `ambiente | N tentativas | Ns | verboso: True/False`',
        'A classe **não** declara construtor',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Configuracao aqui

class Program
{
    static void Main()
    {
        Configuracao padrao = new Configuracao();

        string ambiente = Console.ReadLine();
        int tentativas = int.Parse(Console.ReadLine());

        Configuracao custom = new Configuracao
        {
            Ambiente = ambiente,
            Tentativas = tentativas,
            Verboso = true
        };

        Console.WriteLine(padrao.Resumo());
        Console.WriteLine(custom.Resumo());
    }
}
`,
      solution: `using System;

class Configuracao
{
    public string Ambiente { get; set; } = "producao";
    public int Tentativas { get; set; } = 3;
    public int TimeoutSegundos { get; set; } = 30;
    public bool Verboso { get; set; }

    public string Resumo()
    {
        return $"{Ambiente} | {Tentativas} tentativas | {TimeoutSegundos}s | verboso: {Verboso}";
    }
}

class Program
{
    static void Main()
    {
        Configuracao padrao = new Configuracao();

        string ambiente = Console.ReadLine();
        int tentativas = int.Parse(Console.ReadLine());

        Configuracao custom = new Configuracao
        {
            Ambiente = ambiente,
            Tentativas = tentativas,
            Verboso = true
        };

        Console.WriteLine(padrao.Resumo());
        Console.WriteLine(custom.Resumo());
    }
}
`,
      hints: [
        'O valor padrão vai depois das chaves: `public int Tentativas { get; set; } = 3;`.',
        '`Verboso` não precisa de valor explícito — `false` já é o padrão de `bool`.',
      ],
      tests: [
        {
          name: 'Padrão e personalizada',
          stdin: 'homologacao\n5\n',
          expectedStdout:
            'producao | 3 tentativas | 30s | verboso: False\n' +
            'homologacao | 5 tentativas | 30s | verboso: True',
        },
        {
          name: 'Zero tentativas',
          stdin: 'local\n0\n',
          expectedStdout:
            'producao | 3 tentativas | 30s | verboso: False\n' +
            'local | 0 tentativas | 30s | verboso: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c02l05',
    title: 'Propriedades calculadas',
    objective: 'Expor valores derivados de outros dados, sem guardá-los em campo.',
    concept: [
      {
        kind: 'text',
        body:
          'Nem todo dado precisa ser armazenado. Uma **propriedade calculada** tem apenas `get`, e produz o valor a partir dos outros dados do objeto no momento em que é lida.',
      },
      {
        kind: 'code',
        code: `class Retangulo
{
    public double Largura { get; set; }
    public double Altura { get; set; }

    public double Area => Largura * Altura;              // calculada
    public double Perimetro => 2 * (Largura + Altura);   // calculada
    public bool EhQuadrado => Largura == Altura;
}`,
        caption: 'A seta `=>` é a forma curta de uma propriedade que só tem `get`.',
      },
      {
        kind: 'text',
        body:
          'A alternativa seria guardar a área em um campo — e aí ela precisaria ser recalculada toda vez que a largura ou a altura mudassem. Calcular sob demanda elimina essa sincronização.',
      },
      {
        kind: 'compare',
        good: `public double Area => Largura * Altura;`,
        bad: `public double Area { get; set; }

// e lembrar de atualizar em
// todo lugar que muda os lados`,
        goodLabel: 'Sempre correta',
        badLabel: 'Pode ficar desatualizada',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A regra: se o valor pode ser **derivado** de outros dados, calcule. Guardá-lo cria duas fontes de verdade que podem discordar — e discordar é exatamente o que elas vão fazer no primeiro esquecimento.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Uma propriedade calculada é executada a **cada leitura**. Para cálculos caros dentro de um laço, isso pode custar. A regra prática: propriedade para cálculos baratos, método para os caros — porque o `()` avisa quem lê que ali acontece trabalho.',
      },
      {
        kind: 'text',
        body:
          'A mesma sintaxe de seta funciona para métodos de uma expressão só, como você já viu na Seção 4. Em propriedades, ela é a forma idiomática.',
      },
    ],
    quiz: [
      {
        id: 's05c02l05q1',
        type: 'single',
        prompt: 'Quando uma propriedade calculada é executada?',
        options: [
          { id: 'a', text: 'A cada leitura.', correct: true },
          { id: 'b', text: 'Uma vez, na criação do objeto.' },
          { id: 'c', text: 'Quando algum campo relacionado muda.' },
          { id: 'd', text: 'Apenas na primeira leitura.' },
        ],
        explanation:
          'Ela é um `get` como qualquer outro. Isso garante que o valor esteja sempre atualizado, ao custo de recalcular toda vez.',
      },
      {
        id: 's05c02l05q2',
        type: 'single',
        prompt: 'Por que preferir calcular a guardar um valor derivado?',
        options: [
          { id: 'a', text: 'Porque guardar cria duas fontes de verdade que podem discordar.', correct: true },
          { id: 'b', text: 'Porque calcular é sempre mais rápido.' },
          { id: 'c', text: 'Porque campos não podem ser `double`.' },
          { id: 'd', text: 'Porque o compilador exige.' },
        ],
        explanation:
          'Um valor guardado precisa ser atualizado em todo lugar que altera suas origens. Esquecer um desses lugares produz um objeto internamente inconsistente.',
      },
      {
        id: 's05c02l05q3',
        type: 'single',
        prompt: 'Quando preferir um método a uma propriedade calculada?',
        options: [
          { id: 'a', text: 'Quando o cálculo é caro, porque os parênteses avisam que há trabalho ali.', correct: true },
          { id: 'b', text: 'Quando o retorno é `bool`.' },
          { id: 'c', text: 'Quando há mais de um parâmetro.' },
          { id: 'd', text: 'Nunca.' },
        ],
        explanation:
          'Quem lê espera que uma propriedade seja barata. Um cálculo pesado escondido atrás dela surpreende, especialmente dentro de laços.',
      },
    ],
    challenge: {
      brief:
        'Crie uma classe `Retangulo` em que apenas os lados são armazenados, e todas as outras informações são calculadas sob demanda.',
      requirements: [
        '`Retangulo` recebe largura e altura (`double`) no construtor',
        'Largura e altura podem ser alteradas depois da criação',
        'Expõe `Area`, `Perimetro`, `Diagonal` e `EhQuadrado`, todas **calculadas** a partir dos lados',
        '`Diagonal` é a raiz quadrada da soma dos quadrados dos lados',
        '`Descrever()` devolve `LxA area=X perimetro=Y diagonal=Z quadrado=True/False`, com uma casa decimal em cada número',
        'Alterar um lado precisa refletir imediatamente em todos os valores derivados',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Retangulo aqui

class Program
{
    static void Main()
    {
        double largura = double.Parse(Console.ReadLine());
        double altura = double.Parse(Console.ReadLine());

        Retangulo r = new Retangulo(largura, altura);
        Console.WriteLine(r.Descrever());

        double nova = double.Parse(Console.ReadLine());
        r.Largura = nova;

        Console.WriteLine(r.Descrever());
        Console.WriteLine($"Area apos mudanca: {r.Area:F1}");
    }
}
`,
      solution: `using System;

class Retangulo
{
    public double Largura { get; set; }
    public double Altura { get; set; }

    public Retangulo(double largura, double altura)
    {
        Largura = largura;
        Altura = altura;
    }

    public double Area => Largura * Altura;
    public double Perimetro => 2 * (Largura + Altura);
    public double Diagonal => Math.Sqrt(Largura * Largura + Altura * Altura);
    public bool EhQuadrado => Largura == Altura;

    public string Descrever()
    {
        return $"{Largura:F1}x{Altura:F1} area={Area:F1} perimetro={Perimetro:F1} " +
               $"diagonal={Diagonal:F1} quadrado={EhQuadrado}";
    }
}

class Program
{
    static void Main()
    {
        double largura = double.Parse(Console.ReadLine());
        double altura = double.Parse(Console.ReadLine());

        Retangulo r = new Retangulo(largura, altura);
        Console.WriteLine(r.Descrever());

        double nova = double.Parse(Console.ReadLine());
        r.Largura = nova;

        Console.WriteLine(r.Descrever());
        Console.WriteLine($"Area apos mudanca: {r.Area:F1}");
    }
}
`,
      hints: [
        'As quatro propriedades derivadas usam a forma de seta: `public double Area => Largura * Altura;`.',
        'Nenhum valor derivado é guardado em campo — é isso que faz eles se atualizarem sozinhos.',
      ],
      tests: [
        {
          name: 'Retângulo que vira quadrado',
          stdin: '3\n4\n4\n',
          expectedStdout:
            '3.0x4.0 area=12.0 perimetro=14.0 diagonal=5.0 quadrado=False\n' +
            '4.0x4.0 area=16.0 perimetro=16.0 diagonal=5.7 quadrado=True\n' +
            'Area apos mudanca: 16.0',
        },
        {
          name: 'Quadrado que vira retângulo',
          stdin: '5\n5\n10\n',
          expectedStdout:
            '5.0x5.0 area=25.0 perimetro=20.0 diagonal=7.1 quadrado=True\n' +
            '10.0x5.0 area=50.0 perimetro=30.0 diagonal=11.2 quadrado=False\n' +
            'Area apos mudanca: 50.0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c02l06',
    title: 'readonly e imutabilidade',
    objective: 'Impedir que um dado mude depois da criação, e reconhecer os limites dessa garantia.',
    concept: [
      {
        kind: 'text',
        body:
          'Um campo `readonly` só pode receber valor na declaração ou no construtor. Depois disso, nem métodos da própria classe conseguem alterá-lo — o compilador recusa.',
      },
      {
        kind: 'code',
        code: `class Transacao
{
    private readonly int id;
    public string Descricao { get; set; }

    public Transacao(int id)
    {
        this.id = id;      // permitido: construtor
    }

    public void Alterar()
    {
        id = 99;           // NAO compila
    }
}`,
        caption: 'A garantia é verificada na compilação, não em tempo de execução.',
      },
      {
        kind: 'text',
        body:
          'Um objeto **imutável** é aquele cujo estado inteiro não muda depois de criado. Ele se constrói com todas as propriedades somente leitura e nenhum método que altere estado.',
      },
      {
        kind: 'table',
        headers: ['Vantagem da imutabilidade', 'Por quê'],
        rows: [
          ['fácil de raciocinar', 'o valor de hoje é o de sempre'],
          ['seguro para compartilhar', 'ninguém pode alterá-lo pelas suas costas'],
          ['bom para chave de dicionário', 'a chave não muda depois de inserida'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O `readonly` protege a **referência**, não o objeto apontado. Um `readonly List<int>` não pode ser trocado por outra lista, mas continua aceitando `Add` — a lista em si permanece mutável.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Para alterar um objeto imutável, cria-se outro com o valor novo. Parece caro e raramente é: a alternativa costuma ser rastrear quem mudou o quê e quando, que custa muito mais em tempo de depuração.',
      },
      {
        kind: 'text',
        body:
          'O `record` da Seção 3 já nascia assim. Nesta seção você constrói a mesma garantia à mão, o que deixa claro o que aquele `record` estava fazendo por baixo.',
      },
    ],
    quiz: [
      {
        id: 's05c02l06q1',
        type: 'single',
        prompt: 'Onde um campo `readonly` pode receber valor?',
        options: [
          { id: 'a', text: 'Na declaração ou no construtor.', correct: true },
          { id: 'b', text: 'Em qualquer método da classe.' },
          { id: 'c', text: 'Apenas na declaração.' },
          { id: 'd', text: 'Em qualquer lugar, uma vez só.' },
        ],
        explanation:
          'Depois que o construtor termina, o valor está fixo. Tentar alterá-lo em outro método é erro de compilação.',
      },
      {
        id: 's05c02l06q2',
        type: 'single',
        prompt: 'Um `readonly List<int>` impede `lista.Add(5)`?',
        options: [
          { id: 'a', text: 'Não: ele impede trocar a lista, não modificá-la.', correct: true },
          { id: 'b', text: 'Sim: a lista fica congelada.' },
          { id: 'c', text: 'Sim, mas só fora da classe.' },
          { id: 'd', text: 'Não compila com tipos de referência.' },
        ],
        explanation:
          'É a distinção entre a variável e o objeto — a mesma do `in` na Seção 4. O `readonly` congela para onde a variável aponta, e nada mais.',
      },
      {
        id: 's05c02l06q3',
        type: 'single',
        prompt: 'Como "alterar" um objeto imutável?',
        options: [
          { id: 'a', text: 'Criando outro objeto com o valor novo.', correct: true },
          { id: 'b', text: 'Usando `readonly` no método.' },
          { id: 'c', text: 'Alterando pelo construtor.' },
          { id: 'd', text: 'Não é possível de forma alguma.' },
        ],
        explanation:
          'É o que o `with` do `record` faz na Seção 3: copia tudo e substitui o que mudou, devolvendo um objeto novo.',
      },
    ],
    challenge: {
      brief:
        'Crie uma classe `Transacao` totalmente imutável, com um método que produz uma versão alterada em vez de modificar a original.',
      requirements: [
        '`Transacao` recebe `Id` (`int`), `Descricao` (`string`) e `Valor` (`decimal`) no construtor',
        'Nenhum dos três pode ser alterado depois da criação',
        '`ComValor(decimal novo)` devolve uma **nova** `Transacao` com o mesmo id e descrição, e o valor informado',
        '`ComDescricao(string nova)` faz o equivalente para a descrição',
        '`ToString()` devolve `#id descricao: valor`, com o valor em duas casas',
        'A transação original nunca muda',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Transacao aqui

class Program
{
    static void Main()
    {
        int id = int.Parse(Console.ReadLine());
        string descricao = Console.ReadLine();
        decimal valor = decimal.Parse(Console.ReadLine());
        decimal novoValor = decimal.Parse(Console.ReadLine());
        string novaDescricao = Console.ReadLine();

        Transacao original = new Transacao(id, descricao, valor);
        Transacao comValor = original.ComValor(novoValor);
        Transacao comDescricao = comValor.ComDescricao(novaDescricao);

        Console.WriteLine(original);
        Console.WriteLine(comValor);
        Console.WriteLine(comDescricao);
        Console.WriteLine($"Original intacta: {original.Valor == valor}");
        Console.WriteLine($"Sao objetos distintos: {!ReferenceEquals(original, comValor)}");
    }
}
`,
      solution: `using System;

class Transacao
{
    public int Id { get; }
    public string Descricao { get; }
    public decimal Valor { get; }

    public Transacao(int id, string descricao, decimal valor)
    {
        Id = id;
        Descricao = descricao;
        Valor = valor;
    }

    public Transacao ComValor(decimal novo)
    {
        return new Transacao(Id, Descricao, novo);
    }

    public Transacao ComDescricao(string nova)
    {
        return new Transacao(Id, nova, Valor);
    }

    public override string ToString()
    {
        return $"#{Id} {Descricao}: {Valor:F2}";
    }
}

class Program
{
    static void Main()
    {
        int id = int.Parse(Console.ReadLine());
        string descricao = Console.ReadLine();
        decimal valor = decimal.Parse(Console.ReadLine());
        decimal novoValor = decimal.Parse(Console.ReadLine());
        string novaDescricao = Console.ReadLine();

        Transacao original = new Transacao(id, descricao, valor);
        Transacao comValor = original.ComValor(novoValor);
        Transacao comDescricao = comValor.ComDescricao(novaDescricao);

        Console.WriteLine(original);
        Console.WriteLine(comValor);
        Console.WriteLine(comDescricao);
        Console.WriteLine($"Original intacta: {original.Valor == valor}");
        Console.WriteLine($"Sao objetos distintos: {!ReferenceEquals(original, comValor)}");
    }
}
`,
      hints: [
        'As três propriedades usam apenas `{ get; }` e são atribuídas no construtor.',
        'Os métodos `Com...` chamam o construtor com os valores atuais, substituindo apenas o que muda.',
      ],
      tests: [
        {
          name: 'Cópias com alterações',
          stdin: '1\nCompra\n100\n250\nCompra ajustada\n',
          expectedStdout:
            '#1 Compra: 100.00\n#1 Compra: 250.00\n#1 Compra ajustada: 250.00\n' +
            'Original intacta: True\nSao objetos distintos: True',
        },
        {
          name: 'Valores negativos',
          stdin: '99\nEstorno\n-50\n-75\nEstorno parcial\n',
          expectedStdout:
            '#99 Estorno: -50.00\n#99 Estorno: -75.00\n#99 Estorno parcial: -75.00\n' +
            'Original intacta: True\nSao objetos distintos: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c02l07',
    title: 'Validando no setter',
    objective: 'Rejeitar valores inválidos no momento da atribuição, garantindo que o objeto nunca fique inconsistente.',
    concept: [
      {
        kind: 'text',
        body:
          'Este é o motivo pelo qual propriedades existem. Com o `set` sob seu controle, um valor inválido pode ser **recusado antes de entrar** no objeto.',
      },
      {
        kind: 'code',
        code: `private int idade;

public int Idade
{
    get { return idade; }
    set
    {
        if (value < 0 || value > 150) return;   // ignora o invalido
        idade = value;
    }
}`,
        caption: 'Uma atribuição fora da faixa simplesmente não tem efeito.',
      },
      {
        kind: 'text',
        body:
          'Existem três políticas para o valor inválido, e a escolha entre elas é uma decisão de projeto que precisa estar documentada.',
      },
      {
        kind: 'table',
        headers: ['Política', 'Comportamento', 'Quando usar'],
        rows: [
          ['ignorar', 'mantém o valor anterior', 'entrada de usuário, tolerante'],
          ['ajustar', 'limita ao mínimo ou máximo', 'faixas com limites naturais'],
          ['lançar exceção', 'interrompe a operação', 'erro de programação'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A política de **ignorar** é a mais silenciosa e a mais perigosa: quem atribuiu não fica sabendo que nada aconteceu. Ela é aceitável quando documentada, e vale considerar expor um método que devolve `bool` em vez da propriedade.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A validação no `set` protege o objeto de todos os caminhos de uma vez — construtor, inicializador, métodos, código externo. Validar só no construtor deixa a porta aberta para uma atribuição posterior estragar tudo.',
      },
      {
        kind: 'text',
        body:
          'Para que o próprio construtor passe pela validação, ele deve atribuir à **propriedade**, não ao campo de apoio. É um detalhe pequeno com consequência grande.',
      },
    ],
    quiz: [
      {
        id: 's05c02l07q1',
        type: 'single',
        prompt: 'Por que validar no `set` em vez de só no construtor?',
        options: [
          { id: 'a', text: 'Porque protege também as atribuições feitas depois da criação.', correct: true },
          { id: 'b', text: 'Porque o construtor não pode ter `if`.' },
          { id: 'c', text: 'Porque é mais rápido.' },
          { id: 'd', text: 'Porque o construtor não tem acesso ao campo.' },
        ],
        explanation:
          'Validar no construtor cobre a criação; validar no `set` cobre a criação **e** toda alteração posterior, inclusive as feitas por código externo.',
      },
      {
        id: 's05c02l07q2',
        type: 'single',
        prompt: 'Qual é o risco da política de ignorar o valor inválido?',
        options: [
          { id: 'a', text: 'Quem atribuiu não fica sabendo que nada aconteceu.', correct: true },
          { id: 'b', text: 'O objeto fica em estado inválido.' },
          { id: 'c', text: 'Lança exceção inesperada.' },
          { id: 'd', text: 'Não há risco.' },
        ],
        explanation:
          'O objeto continua consistente, mas o programa segue achando que a atribuição funcionou. É a falha silenciosa que a Seção 4 discutiu no padrão `Try`.',
      },
      {
        id: 's05c02l07q3',
        type: 'single',
        prompt: 'Como fazer o construtor passar pela validação do `set`?',
        options: [
          { id: 'a', text: 'Atribuindo à propriedade, não ao campo de apoio.', correct: true },
          { id: 'b', text: 'Chamando o `set` explicitamente.' },
          { id: 'c', text: 'Não é possível.' },
          { id: 'd', text: 'Declarando o construtor como `public`.' },
        ],
        explanation:
          'Atribuir ao campo de apoio pula o `set` inteiro. É um erro fácil de cometer e que anula a validação justamente na criação.',
      },
    ],
    challenge: {
      brief:
        'Crie uma classe `Pessoa` com três políticas de validação diferentes, cada uma em uma propriedade, e demonstre o comportamento de cada uma.',
      requirements: [
        '`Pessoa` recebe nome e idade no construtor, passando pelas mesmas validações das propriedades',
        '`Nome` **ignora** atribuições vazias ou só com espaços, mantendo o valor anterior; começa como `"sem nome"`',
        '`Idade` **ajusta** para a faixa de 0 a 150: valores menores viram 0, maiores viram 150',
        '`Salario` (`decimal`) **ignora** valores negativos; começa em `0`',
        '`Descrever()` devolve `nome, N anos, R$ valor`, com o salário em duas casas',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Pessoa aqui

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        int idade = int.Parse(Console.ReadLine());

        Pessoa p = new Pessoa(nome, idade);
        Console.WriteLine(p.Descrever());

        p.Nome = "";
        Console.WriteLine($"Apos nome vazio: {p.Descrever()}");

        p.Idade = int.Parse(Console.ReadLine());
        Console.WriteLine($"Apos idade: {p.Descrever()}");

        p.Salario = decimal.Parse(Console.ReadLine());
        Console.WriteLine($"Apos salario: {p.Descrever()}");

        p.Salario = -100m;
        Console.WriteLine($"Apos salario negativo: {p.Descrever()}");
    }
}
`,
      solution: `using System;

class Pessoa
{
    private string nome = "sem nome";
    private int idade;
    private decimal salario;

    public string Nome
    {
        get { return nome; }
        set
        {
            if (value == null || value.Trim().Length == 0) return;
            nome = value;
        }
    }

    public int Idade
    {
        get { return idade; }
        set
        {
            if (value < 0) idade = 0;
            else if (value > 150) idade = 150;
            else idade = value;
        }
    }

    public decimal Salario
    {
        get { return salario; }
        set
        {
            if (value < 0m) return;
            salario = value;
        }
    }

    public Pessoa(string nome, int idade)
    {
        Nome = nome;
        Idade = idade;
    }

    public string Descrever()
    {
        return $"{Nome}, {Idade} anos, R$ {Salario:F2}";
    }
}

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        int idade = int.Parse(Console.ReadLine());

        Pessoa p = new Pessoa(nome, idade);
        Console.WriteLine(p.Descrever());

        p.Nome = "";
        Console.WriteLine($"Apos nome vazio: {p.Descrever()}");

        p.Idade = int.Parse(Console.ReadLine());
        Console.WriteLine($"Apos idade: {p.Descrever()}");

        p.Salario = decimal.Parse(Console.ReadLine());
        Console.WriteLine($"Apos salario: {p.Descrever()}");

        p.Salario = -100m;
        Console.WriteLine($"Apos salario negativo: {p.Descrever()}");
    }
}
`,
      hints: [
        'O construtor atribui às **propriedades** (`Nome`, `Idade`), não aos campos — assim ele passa pela validação.',
        'A política de ajustar usa `if / else if / else`; a de ignorar usa um `return` antecipado.',
      ],
      tests: [
        {
          name: 'Idade acima do limite é ajustada',
          stdin: 'Ana\n30\n200\n5000\n',
          expectedStdout:
            'Ana, 30 anos, R$ 0.00\nApos nome vazio: Ana, 30 anos, R$ 0.00\n' +
            'Apos idade: Ana, 150 anos, R$ 0.00\nApos salario: Ana, 150 anos, R$ 5000.00\n' +
            'Apos salario negativo: Ana, 150 anos, R$ 5000.00',
        },
        {
          name: 'Nome vazio no construtor mantém o padrão',
          stdin: '\n-10\n25\n1500.50\n',
          expectedStdout:
            'sem nome, 0 anos, R$ 0.00\nApos nome vazio: sem nome, 0 anos, R$ 0.00\n' +
            'Apos idade: sem nome, 25 anos, R$ 0.00\nApos salario: sem nome, 25 anos, R$ 1500.50\n' +
            'Apos salario negativo: sem nome, 25 anos, R$ 1500.50',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c02l08',
    title: 'Membros estáticos',
    objective: 'Compartilhar dados e comportamento entre todas as instâncias, e reconhecer quando isso é adequado.',
    concept: [
      {
        kind: 'text',
        body:
          'Um membro `static` pertence à **classe**, não a nenhum objeto. Existe uma única cópia, compartilhada por todas as instâncias e acessível mesmo sem criar nenhuma.',
      },
      {
        kind: 'code',
        code: `class Conta
{
    public static int Total { get; private set; }   // uma so, compartilhada
    public string Titular { get; }                  // uma por objeto

    public Conta(string titular)
    {
        Titular = titular;
        Total++;                    // conta todas as contas criadas
    }
}

new Conta("Ana");
new Conta("Bruno");

Console.WriteLine(Conta.Total);   // 2  -> acessado pela CLASSE`,
        caption: 'Membros estáticos são acessados pelo nome da classe, nunca por um objeto.',
      },
      {
        kind: 'table',
        headers: ['Aspecto', 'Instância', 'Estático'],
        rows: [
          ['quantas cópias', 'uma por objeto', 'uma total'],
          ['acesso', '`obj.Membro`', '`Classe.Membro`'],
          ['precisa de objeto', 'sim', 'não'],
          ['enxerga membros de instância', 'sim', '**não**'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um método estático **não** tem `this`, e por isso não consegue acessar campos de instância. Faz sentido: ele pode ser chamado sem nenhum objeto existir, então não haveria de qual objeto ler.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Os usos legítimos são poucos: constantes compartilhadas, contadores globais, e métodos utilitários que não dependem de estado — como o `Math.Sqrt` que você usa desde a Seção 1.',
      },
      {
        kind: 'text',
        body:
          'Estado estático mutável é uma fonte conhecida de problemas: ele é compartilhado por todo o programa, o que torna difícil rastrear quem mudou o quê. Constantes e contadores simples são seguros; um cache global compartilhado, muito menos.',
      },
    ],
    quiz: [
      {
        id: 's05c02l08q1',
        type: 'single',
        prompt: 'Quantas cópias de um campo `static` existem?',
        options: [
          { id: 'a', text: 'Uma, compartilhada por todos os objetos.', correct: true },
          { id: 'b', text: 'Uma por objeto.' },
          { id: 'c', text: 'Nenhuma até o primeiro objeto ser criado.' },
          { id: 'd', text: 'Uma por método que o acessa.' },
        ],
        explanation:
          'Ele pertence à classe. Isso significa que alterá-lo por um objeto muda o valor visto por todos os outros.',
      },
      {
        id: 's05c02l08q2',
        type: 'single',
        prompt: 'Por que um método `static` não pode acessar campos de instância?',
        options: [
          { id: 'a', text: 'Porque ele pode ser chamado sem nenhum objeto existir.', correct: true },
          { id: 'b', text: 'Porque campos de instância são privados.' },
          { id: 'c', text: 'Por questão de desempenho.' },
          { id: 'd', text: 'Ele pode acessar normalmente.' },
        ],
        explanation:
          'Sem objeto não há `this`, e sem `this` não há de qual instância ler o campo. O compilador detecta isso e recusa.',
      },
      {
        id: 's05c02l08q3',
        type: 'single',
        prompt: 'Qual é um uso legítimo de membro estático?',
        options: [
          { id: 'a', text: 'Um método utilitário que não depende de estado, como `Math.Sqrt`.', correct: true },
          { id: 'b', text: 'Guardar os dados de cada objeto.' },
          { id: 'c', text: 'Substituir propriedades de instância.' },
          { id: 'd', text: 'Evitar criar objetos.' },
        ],
        explanation:
          'Métodos sem estado são o caso mais seguro: eles recebem tudo por parâmetro e não compartilham nada. Estado estático mutável exige muito mais cuidado.',
      },
    ],
    challenge: {
      brief:
        'Crie uma classe `Conta` que gera números sequenciais automaticamente e mantém estatísticas compartilhadas entre todas as contas.',
      requirements: [
        '`Conta` recebe o titular no construtor, e o número é gerado automaticamente a partir de 1',
        '`Numero` e `Titular` não mudam depois da criação',
        '`Saldo` é legível de fora e alterável apenas pela classe, começando em `0`',
        '`Depositar(decimal)` soma quando o valor é positivo e devolve `true`; caso contrário devolve `false`',
        '`Total` é um contador **estático** de quantas contas foram criadas',
        '`SaldoTotal` é uma propriedade **estática** com a soma dos saldos de todas as contas',
        '`ToString()` devolve `#N titular: saldo`, com o saldo em duas casas',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Conta aqui

class Program
{
    static void Main()
    {
        Console.WriteLine($"Contas antes: {Conta.Total}");

        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            string titular = Console.ReadLine();
            decimal deposito = decimal.Parse(Console.ReadLine());

            Conta c = new Conta(titular);
            c.Depositar(deposito);

            Console.WriteLine(c);
        }

        Console.WriteLine($"Contas depois: {Conta.Total}");
        Console.WriteLine($"Saldo total: {Conta.SaldoTotal:F2}");
    }
}
`,
      solution: `using System;

class Conta
{
    private static int proximoNumero = 1;

    public static int Total { get; private set; }
    public static decimal SaldoTotal { get; private set; }

    public int Numero { get; }
    public string Titular { get; }
    public decimal Saldo { get; private set; }

    public Conta(string titular)
    {
        Numero = proximoNumero;
        proximoNumero++;
        Titular = titular;
        Total++;
    }

    public bool Depositar(decimal valor)
    {
        if (valor <= 0m)
        {
            return false;
        }

        Saldo += valor;
        SaldoTotal += valor;
        return true;
    }

    public override string ToString()
    {
        return $"#{Numero} {Titular}: {Saldo:F2}";
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine($"Contas antes: {Conta.Total}");

        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            string titular = Console.ReadLine();
            decimal deposito = decimal.Parse(Console.ReadLine());

            Conta c = new Conta(titular);
            c.Depositar(deposito);

            Console.WriteLine(c);
        }

        Console.WriteLine($"Contas depois: {Conta.Total}");
        Console.WriteLine($"Saldo total: {Conta.SaldoTotal:F2}");
    }
}
`,
      hints: [
        'Um campo estático `proximoNumero` guarda o próximo número a ser usado, e o construtor o incrementa.',
        '`SaldoTotal` é atualizado no `Depositar`, junto com o saldo da conta — um valor por objeto, o outro compartilhado.',
      ],
      tests: [
        {
          name: 'Três contas',
          stdin: '3\nAna\n100\nBruno\n250.50\nCarla\n0\n',
          expectedStdout:
            'Contas antes: 0\n#1 Ana: 100.00\n#2 Bruno: 250.50\n#3 Carla: 0.00\n' +
            'Contas depois: 3\nSaldo total: 350.50',
        },
        {
          name: 'Nenhuma conta',
          stdin: '0\n',
          expectedStdout: 'Contas antes: 0\nContas depois: 0\nSaldo total: 0.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c02l09',
    title: 'Prática: conta com saldo protegido',
    objective: 'Construir uma classe com invariantes garantidas, em que nenhum caminho consegue produzir estado inválido.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma **invariante** é uma afirmação que precisa ser verdadeira o tempo todo, não importa o que aconteça com o objeto. Numa conta bancária, a mais óbvia é: o saldo nunca fica negativo.',
      },
      {
        kind: 'table',
        headers: ['Invariante', 'Como garantir'],
        rows: [
          ['saldo nunca negativo', 'saque valida antes de subtrair'],
          ['limite nunca negativo', 'validação na propriedade'],
          ['histórico nunca perde registro', 'lista privada, sem setter'],
          ['titular nunca vazio', 'validação no construtor e no `set`'],
        ],
      },
      {
        kind: 'text',
        body:
          'A garantia vem de fechar **todos** os caminhos. Não adianta o `Sacar` validar se o saldo também pode ser atribuído diretamente por uma propriedade pública.',
      },
      {
        kind: 'code',
        code: `public decimal Saldo { get; private set; }   // so a classe altera

public bool Sacar(decimal valor)
{
    if (valor <= 0m || valor > Saldo) return false;

    Saldo -= valor;
    return true;
}`,
        caption: 'Com o `set` privado, o único caminho para o saldo diminuir é o `Sacar`.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Expor uma coleção interna é o vazamento mais comum de encapsulamento. Devolver a `List` direto permite que qualquer código chame `Clear()` nela. A forma segura é devolver uma cópia, ou apenas informações derivadas dela.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A validação precisa acontecer **antes** da alteração. Subtrair primeiro e checar depois deixa o objeto momentaneamente inválido — e se algo lançar exceção no meio, ele fica assim.',
      },
      {
        kind: 'text',
        body:
          'O teste de que a invariante está bem construída é simples: tente quebrá-la de fora. Se não existe nenhuma sequência de chamadas públicas que produza um saldo negativo, ela está garantida.',
      },
    ],
    quiz: [
      {
        id: 's05c02l09q1',
        type: 'single',
        prompt: 'O que é uma invariante de classe?',
        options: [
          { id: 'a', text: 'Uma afirmação que precisa ser verdadeira o tempo todo sobre o objeto.', correct: true },
          { id: 'b', text: 'Um campo que não muda.' },
          { id: 'c', text: 'Um método sem parâmetros.' },
          { id: 'd', text: 'Uma propriedade calculada.' },
        ],
        explanation:
          '"O saldo nunca é negativo" vale desde a criação até o fim da vida do objeto, seja qual for a sequência de operações.',
      },
      {
        id: 's05c02l09q2',
        type: 'single',
        prompt: 'Por que devolver a lista interna diretamente quebra o encapsulamento?',
        options: [
          { id: 'a', text: 'Porque quem recebe pode modificá-la, contornando os métodos da classe.', correct: true },
          { id: 'b', text: 'Porque listas não podem ser devolvidas.' },
          { id: 'c', text: 'Porque a lista é copiada automaticamente.' },
          { id: 'd', text: 'Não quebra: a lista é privada.' },
        ],
        explanation:
          'É a semântica de referência de novo: o campo é privado, mas a referência devolvida aponta para o mesmo objeto que a classe usa internamente.',
      },
      {
        id: 's05c02l09q3',
        type: 'single',
        prompt: 'Por que validar antes de alterar o estado?',
        options: [
          { id: 'a', text: 'Para que o objeto nunca fique momentaneamente inválido.', correct: true },
          { id: 'b', text: 'Porque é mais rápido.' },
          { id: 'c', text: 'Porque o compilador exige.' },
          { id: 'd', text: 'É indiferente.' },
        ],
        explanation:
          'Alterar primeiro cria uma janela de inconsistência. Se uma exceção acontecer nela, o objeto fica permanentemente quebrado.',
      },
    ],
    challenge: {
      brief:
        'Construa uma classe `ContaCorrente` com invariantes garantidas por todos os caminhos, incluindo um histórico que não pode ser adulterado de fora.',
      requirements: [
        '`ContaCorrente` recebe titular e limite de cheque especial no construtor',
        'O titular nunca pode ficar vazio: um valor vazio é ignorado e mantém o anterior; começa como `"sem titular"`',
        'O limite nunca é negativo: valores negativos viram `0`',
        '`Saldo` é legível de fora e alterável apenas pela classe',
        '`Depositar(decimal)` aceita apenas valores positivos, devolvendo `true` ou `false`',
        '`Sacar(decimal)` aceita apenas valores positivos que caibam em saldo mais limite, devolvendo `true` ou `false`',
        'Cada operação **aceita** acrescenta uma linha ao histórico interno',
        '`Historico()` devolve uma **cópia** da lista de registros, de forma que alterá-la não afete a conta',
        '`Extrato()` devolve `titular: saldo (limite N, K operacoes)`, com saldo e limite em duas casas',
        'O saldo pode ficar negativo até o limite, mas nunca além dele',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare a classe ContaCorrente aqui

class Program
{
    static void Main()
    {
        string titular = Console.ReadLine();
        decimal limite = decimal.Parse(Console.ReadLine());

        ContaCorrente c = new ContaCorrente(titular, limite);

        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            string op = Console.ReadLine();
            decimal valor = decimal.Parse(Console.ReadLine());

            bool ok = op == "d" ? c.Depositar(valor) : c.Sacar(valor);
            Console.WriteLine($"{op} {valor:F2}: {ok}");
        }

        Console.WriteLine(c.Extrato());

        List<string> copia = c.Historico();
        copia.Clear();

        Console.WriteLine($"Historico apos limpar copia: {c.Historico().Count}");

        c.Titular = "";
        Console.WriteLine($"Titular apos vazio: {c.Titular}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class ContaCorrente
{
    private string titular = "sem titular";
    private decimal limite;
    private List<string> historico = new List<string>();

    public string Titular
    {
        get { return titular; }
        set
        {
            if (value == null || value.Trim().Length == 0) return;
            titular = value;
        }
    }

    public decimal Limite
    {
        get { return limite; }
        set { limite = value < 0m ? 0m : value; }
    }

    public decimal Saldo { get; private set; }

    public ContaCorrente(string titular, decimal limite)
    {
        Titular = titular;
        Limite = limite;
    }

    public bool Depositar(decimal valor)
    {
        if (valor <= 0m)
        {
            return false;
        }

        Saldo += valor;
        historico.Add($"deposito {valor:F2}");
        return true;
    }

    public bool Sacar(decimal valor)
    {
        if (valor <= 0m || valor > Saldo + Limite)
        {
            return false;
        }

        Saldo -= valor;
        historico.Add($"saque {valor:F2}");
        return true;
    }

    public List<string> Historico()
    {
        return new List<string>(historico);
    }

    public string Extrato()
    {
        return $"{Titular}: {Saldo:F2} (limite {Limite:F2}, {historico.Count} operacoes)";
    }
}

class Program
{
    static void Main()
    {
        string titular = Console.ReadLine();
        decimal limite = decimal.Parse(Console.ReadLine());

        ContaCorrente c = new ContaCorrente(titular, limite);

        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            string op = Console.ReadLine();
            decimal valor = decimal.Parse(Console.ReadLine());

            bool ok = op == "d" ? c.Depositar(valor) : c.Sacar(valor);
            Console.WriteLine($"{op} {valor:F2}: {ok}");
        }

        Console.WriteLine(c.Extrato());

        List<string> copia = c.Historico();
        copia.Clear();

        Console.WriteLine($"Historico apos limpar copia: {c.Historico().Count}");

        c.Titular = "";
        Console.WriteLine($"Titular apos vazio: {c.Titular}");
    }
}
`,
      hints: [
        '`Historico()` precisa devolver `new List<string>(historico)` — devolver a lista direto permitiria limpá-la de fora.',
        'O limite entra na conta do saque: a condição é `valor > Saldo + Limite`.',
      ],
      tests: [
        {
          name: 'Saque dentro do limite',
          stdin: 'Ana\n500\n4\nd\n100\ns\n300\ns\n1000\nd\n-50\n',
          expectedStdout:
            'd 100.00: True\ns 300.00: True\ns 1000.00: False\nd -50.00: False\n' +
            'Ana: -200.00 (limite 500.00, 2 operacoes)\nHistorico apos limpar copia: 2\n' +
            'Titular apos vazio: Ana',
        },
        {
          name: 'Limite negativo vira zero',
          stdin: 'Bruno\n-100\n2\nd\n50\ns\n80\n',
          expectedStdout:
            'd 50.00: True\ns 80.00: False\n' +
            'Bruno: 50.00 (limite 0.00, 1 operacoes)\nHistorico apos limpar copia: 1\n' +
            'Titular apos vazio: Bruno',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c02l10',
    title: 'Checkpoint: encapsulamento',
    objective: 'Projetar uma classe cuja interface pública torna impossível representar um estado inválido.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint junta tudo do capítulo em um princípio: **o objeto deve ser difícil de usar errado**. Se existe uma sequência de chamadas públicas que produz estado inconsistente, o encapsulamento está incompleto.',
      },
      {
        kind: 'table',
        headers: ['Recurso', 'Papel no projeto'],
        rows: [
          ['`private`', 'esconde o que é detalhe interno'],
          ['`{ get; private set; }`', 'expõe leitura, controla escrita'],
          ['`{ get; }`', 'fixa o que não deve mudar'],
          ['validação no `set`', 'rejeita valores inválidos'],
          ['propriedade calculada', 'evita dados que podem discordar'],
          ['cópia na saída', 'protege coleções internas'],
        ],
      },
      {
        kind: 'text',
        body:
          'A pergunta que guia o projeto é sempre a mesma: **o que precisa continuar verdadeiro?** As respostas viram invariantes, e as invariantes decidem quais membros são públicos.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um bom teste mental: imagine alguém tentando quebrar sua classe de propósito, usando apenas os membros públicos. Toda tentativa que funciona é um buraco no projeto.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Cuidado com o que a capacidade **calculada** revela. Uma propriedade `Disponivel` derivada de `Capacidade - Ocupadas` nunca fica inconsistente; um campo `Disponivel` atualizado à mão, sim.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Escreva as invariantes em português antes de codar. "A ocupação nunca passa da capacidade" e "a capacidade nunca diminui abaixo da ocupação atual" são frases que se traduzem direto em validações.',
      },
    ],
    quiz: [
      {
        id: 's05c02l10q1',
        type: 'single',
        prompt: 'Qual é o teste de que o encapsulamento está completo?',
        options: [
          { id: 'a', text: 'Não existe sequência de chamadas públicas que produza estado inválido.', correct: true },
          { id: 'b', text: 'Todos os campos são privados.' },
          { id: 'c', text: 'A classe tem mais métodos que propriedades.' },
          { id: 'd', text: 'Nenhuma propriedade tem `set`.' },
        ],
        explanation:
          'Campos privados são meio, não fim. O objetivo é que a interface pública não permita chegar a um estado inconsistente.',
      },
      {
        id: 's05c02l10q2',
        type: 'single',
        prompt: 'Por que preferir uma capacidade disponível calculada a um campo?',
        options: [
          { id: 'a', text: 'Porque um campo pode ficar desatualizado em relação aos outros dados.', correct: true },
          { id: 'b', text: 'Porque campos não aceitam `int`.' },
          { id: 'c', text: 'Porque calcular é mais rápido.' },
          { id: 'd', text: 'Porque campos são sempre públicos.' },
        ],
        explanation:
          'Duas fontes de verdade acabam discordando. O valor derivado não tem como discordar de si mesmo.',
      },
      {
        id: 's05c02l10q3',
        type: 'single',
        prompt: 'Como escrever boas invariantes antes de codar?',
        options: [
          { id: 'a', text: 'Como frases em português sobre o que precisa continuar verdadeiro.', correct: true },
          { id: 'b', text: 'Como uma lista de campos privados.' },
          { id: 'c', text: 'Como comentários no construtor.' },
          { id: 'd', text: 'Como testes automatizados.' },
        ],
        explanation:
          '"A ocupação nunca passa da capacidade" já contém a validação. Escrever isso primeiro é o que evita descobrir a regra depois de o bug aparecer.',
      },
    ],
    challenge: {
      brief:
        'Projete uma classe `Sala` que gerencia reservas, com invariantes que tornam impossível ocupar mais lugares do que existem.',
      requirements: [
        '`Sala` recebe nome e capacidade no construtor',
        'O nome nunca fica vazio: valores vazios são ignorados; começa como `"sem nome"`',
        'A capacidade nunca é menor que 1 nem menor que a ocupação atual: tentativas inválidas são ignoradas',
        '`Ocupadas` é legível de fora e alterável apenas pela classe',
        '`Disponiveis` é **calculada** a partir de capacidade e ocupação',
        '`Ocupada` é calculada e devolve `true` quando não há lugares disponíveis',
        '`Reservar(int quantos)` devolve `true` e ocupa quando o valor é positivo e cabe; caso contrário devolve `false` sem alterar nada',
        '`Liberar(int quantos)` devolve `true` e libera quando o valor é positivo e não passa das ocupadas',
        '`Status()` devolve `nome: O/C ocupadas, D disponiveis, cheia: True/False`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Sala aqui

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        int capacidade = int.Parse(Console.ReadLine());

        Sala s = new Sala(nome, capacidade);
        Console.WriteLine(s.Status());

        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            string op = Console.ReadLine();
            int quantos = int.Parse(Console.ReadLine());

            bool ok = op == "r" ? s.Reservar(quantos) : s.Liberar(quantos);
            Console.WriteLine($"{op} {quantos}: {ok} -> {s.Status()}");
        }

        s.Capacidade = 0;
        Console.WriteLine($"Capacidade apos zero: {s.Capacidade}");

        s.Nome = "";
        Console.WriteLine($"Nome apos vazio: {s.Nome}");
    }
}
`,
      solution: `using System;

class Sala
{
    private string nome = "sem nome";
    private int capacidade = 1;

    public string Nome
    {
        get { return nome; }
        set
        {
            if (value == null || value.Trim().Length == 0) return;
            nome = value;
        }
    }

    public int Capacidade
    {
        get { return capacidade; }
        set
        {
            if (value < 1 || value < Ocupadas) return;
            capacidade = value;
        }
    }

    public int Ocupadas { get; private set; }

    public int Disponiveis => Capacidade - Ocupadas;

    public bool Ocupada => Disponiveis == 0;

    public Sala(string nome, int capacidade)
    {
        Nome = nome;
        Capacidade = capacidade;
    }

    public bool Reservar(int quantos)
    {
        if (quantos <= 0 || quantos > Disponiveis)
        {
            return false;
        }

        Ocupadas += quantos;
        return true;
    }

    public bool Liberar(int quantos)
    {
        if (quantos <= 0 || quantos > Ocupadas)
        {
            return false;
        }

        Ocupadas -= quantos;
        return true;
    }

    public string Status()
    {
        return $"{Nome}: {Ocupadas}/{Capacidade} ocupadas, {Disponiveis} disponiveis, cheia: {Ocupada}";
    }
}

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        int capacidade = int.Parse(Console.ReadLine());

        Sala s = new Sala(nome, capacidade);
        Console.WriteLine(s.Status());

        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            string op = Console.ReadLine();
            int quantos = int.Parse(Console.ReadLine());

            bool ok = op == "r" ? s.Reservar(quantos) : s.Liberar(quantos);
            Console.WriteLine($"{op} {quantos}: {ok} -> {s.Status()}");
        }

        s.Capacidade = 0;
        Console.WriteLine($"Capacidade apos zero: {s.Capacidade}");

        s.Nome = "";
        Console.WriteLine($"Nome apos vazio: {s.Nome}");
    }
}
`,
      hints: [
        'A capacidade começa em `1` no campo, para que o objeto seja válido mesmo se o construtor receber um valor recusado.',
        '`Disponiveis` e `Ocupada` são propriedades calculadas — nunca campos, para não poderem discordar do resto.',
      ],
      tests: [
        {
          name: 'Reservas até encher',
          stdin: 'Auditorio\n10\n5\nr\n4\nr\n6\nr\n1\nl\n3\nl\n20\n',
          expectedStdout:
            'Auditorio: 0/10 ocupadas, 10 disponiveis, cheia: False\n' +
            'r 4: True -> Auditorio: 4/10 ocupadas, 6 disponiveis, cheia: False\n' +
            'r 6: True -> Auditorio: 10/10 ocupadas, 0 disponiveis, cheia: True\n' +
            'r 1: False -> Auditorio: 10/10 ocupadas, 0 disponiveis, cheia: True\n' +
            'l 3: True -> Auditorio: 7/10 ocupadas, 3 disponiveis, cheia: False\n' +
            'l 20: False -> Auditorio: 7/10 ocupadas, 3 disponiveis, cheia: False\n' +
            'Capacidade apos zero: 10\nNome apos vazio: Auditorio',
        },
        {
          name: 'Capacidade invalida no construtor',
          stdin: 'Sala\n0\n2\nr\n1\nr\n1\n',
          expectedStdout:
            'Sala: 0/1 ocupadas, 1 disponiveis, cheia: False\n' +
            'r 1: True -> Sala: 1/1 ocupadas, 0 disponiveis, cheia: True\n' +
            'r 1: False -> Sala: 1/1 ocupadas, 0 disponiveis, cheia: True\n' +
            'Capacidade apos zero: 1\nNome apos vazio: Sala',
          hidden: true,
        },
      ],
    },
  },
]
