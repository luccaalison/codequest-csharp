import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's05c03l01',
    title: 'A ideia de herança',
    objective: 'Criar uma classe que reaproveita os membros de outra, acrescentando o que é específico dela.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando duas classes compartilham dados e comportamento, copiar o código é a pior solução. A **herança** permite que uma classe reaproveite tudo de outra e acrescente apenas o que a diferencia.',
      },
      {
        kind: 'code',
        code: `class Funcionario
{
    public string Nome { get; set; }
    public decimal Salario { get; set; }

    public string Cracha() => $"{Nome} - {Salario:F2}";
}

class Gerente : Funcionario      // herda tudo de Funcionario
{
    public int Equipe { get; set; }    // e acrescenta o proprio
}`,
        caption: 'Os dois-pontos leem-se como "é um": um gerente **é um** funcionário.',
      },
      {
        kind: 'text',
        body:
          'Um `Gerente` tem `Nome`, `Salario` e `Cracha()` sem que nada disso apareça na declaração dele. Tudo que é público na classe base está disponível na derivada.',
      },
      {
        kind: 'table',
        headers: ['Termo', 'Significado'],
        rows: [
          ['classe base', 'a que é herdada — `Funcionario`'],
          ['classe derivada', 'a que herda — `Gerente`'],
          ['herança simples', 'C# permite **uma** classe base só'],
          ['`is a`', 'o teste de que a herança faz sentido'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O teste "é um" é o critério, e ele é mais rigoroso do que parece. Um `Gerente` **é um** `Funcionario`: herança faz sentido. Um `Pedido` **tem um** `Cliente`: aí a resposta é um campo, não herança.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Herdar só para reaproveitar código é a armadilha clássica. Se a derivada não puder ser usada em todo lugar que espera a base, a herança está errada — e um campo resolveria melhor.',
      },
      {
        kind: 'text',
        body:
          'C# permite herdar de **uma** classe apenas. Para compartilhar comportamento de várias fontes existem as interfaces, assunto do capítulo 5.',
      },
    ],
    quiz: [
      {
        id: 's05c03l01q1',
        type: 'single',
        prompt: 'O que a classe derivada recebe da base?',
        options: [
          { id: 'a', text: 'Todos os membros públicos e protegidos, sem precisar declará-los.', correct: true },
          { id: 'b', text: 'Apenas os campos.' },
          { id: 'c', text: 'Apenas os métodos.' },
          { id: 'd', text: 'Nada: é preciso redeclarar tudo.' },
        ],
        explanation:
          'Os membros privados existem no objeto mas não são acessíveis pela derivada — é o que a lição sobre `protected` resolve.',
      },
      {
        id: 's05c03l01q2',
        type: 'single',
        prompt: 'Qual relação **não** deve ser modelada com herança?',
        options: [
          { id: 'a', text: 'Um pedido tem um cliente.', correct: true },
          { id: 'b', text: 'Um gerente é um funcionário.' },
          { id: 'c', text: 'Um círculo é uma forma.' },
          { id: 'd', text: 'Um cachorro é um animal.' },
        ],
        explanation:
          '"Tem um" pede um campo. Fazer `Pedido` herdar de `Cliente` significaria que todo pedido **é** um cliente, o que não faz sentido nenhum.',
      },
      {
        id: 's05c03l01q3',
        type: 'single',
        prompt: 'De quantas classes uma classe C# pode herdar?',
        options: [
          { id: 'a', text: 'Uma.', correct: true },
          { id: 'b', text: 'Quantas quiser.' },
          { id: 'c', text: 'Duas.' },
          { id: 'd', text: 'Nenhuma: só interfaces.' },
        ],
        explanation:
          'É a herança simples. Para combinar comportamento de várias fontes, C# oferece interfaces, que podem ser implementadas em qualquer quantidade.',
      },
    ],
    challenge: {
      brief:
        'Crie uma hierarquia com `Funcionario` como base e `Gerente` como derivada. O `Main` usa os dois e mostra que o gerente herdou tudo.',
      requirements: [
        '`Funcionario` recebe nome e salário no construtor, expostos como propriedades legíveis',
        '`Funcionario.Cracha()` devolve `nome - salario`, com o salário em duas casas',
        '`Gerente` herda de `Funcionario` e acrescenta `Equipe` (`int`)',
        'O construtor de `Gerente` recebe nome, salário e tamanho da equipe',
        '`Gerente.Resumo()` devolve `cracha (N pessoas)`, usando o `Cracha()` herdado',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare Funcionario e Gerente aqui

class Program
{
    static void Main()
    {
        string nomeF = Console.ReadLine();
        decimal salarioF = decimal.Parse(Console.ReadLine());
        string nomeG = Console.ReadLine();
        decimal salarioG = decimal.Parse(Console.ReadLine());
        int equipe = int.Parse(Console.ReadLine());

        Funcionario f = new Funcionario(nomeF, salarioF);
        Gerente g = new Gerente(nomeG, salarioG, equipe);

        Console.WriteLine(f.Cracha());
        Console.WriteLine(g.Cracha());
        Console.WriteLine(g.Resumo());
        Console.WriteLine($"Gerente e funcionario: {g is Funcionario}");
        Console.WriteLine($"Nome do gerente: {g.Nome}");
    }
}
`,
      solution: `using System;

class Funcionario
{
    public string Nome { get; }
    public decimal Salario { get; }

    public Funcionario(string nome, decimal salario)
    {
        Nome = nome;
        Salario = salario;
    }

    public string Cracha()
    {
        return $"{Nome} - {Salario:F2}";
    }
}

class Gerente : Funcionario
{
    public int Equipe { get; }

    public Gerente(string nome, decimal salario, int equipe)
        : base(nome, salario)
    {
        Equipe = equipe;
    }

    public string Resumo()
    {
        return $"{Cracha()} ({Equipe} pessoas)";
    }
}

class Program
{
    static void Main()
    {
        string nomeF = Console.ReadLine();
        decimal salarioF = decimal.Parse(Console.ReadLine());
        string nomeG = Console.ReadLine();
        decimal salarioG = decimal.Parse(Console.ReadLine());
        int equipe = int.Parse(Console.ReadLine());

        Funcionario f = new Funcionario(nomeF, salarioF);
        Gerente g = new Gerente(nomeG, salarioG, equipe);

        Console.WriteLine(f.Cracha());
        Console.WriteLine(g.Cracha());
        Console.WriteLine(g.Resumo());
        Console.WriteLine($"Gerente e funcionario: {g is Funcionario}");
        Console.WriteLine($"Nome do gerente: {g.Nome}");
    }
}
`,
      hints: [
        'A derivada declara `class Gerente : Funcionario`, e o construtor dela repassa os dados com `: base(nome, salario)`.',
        'Dentro de `Resumo()`, o `Cracha()` herdado é chamado diretamente pelo nome.',
      ],
      tests: [
        {
          name: 'Funcionário e gerente',
          stdin: 'Ana\n3000\nBruno\n8000\n5\n',
          expectedStdout:
            'Ana - 3000.00\nBruno - 8000.00\nBruno - 8000.00 (5 pessoas)\n' +
            'Gerente e funcionario: True\nNome do gerente: Bruno',
        },
        {
          name: 'Equipe vazia',
          stdin: 'X\n1000\nY\n2000\n0\n',
          expectedStdout:
            'X - 1000.00\nY - 2000.00\nY - 2000.00 (0 pessoas)\n' +
            'Gerente e funcionario: True\nNome do gerente: Y',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c03l02',
    title: 'base',
    objective: 'Chamar explicitamente membros da classe base, tanto no construtor quanto em métodos.',
    concept: [
      {
        kind: 'text',
        body:
          'A palavra `base` referencia a classe base a partir da derivada. Ela aparece em dois lugares: repassando dados no construtor, e chamando a versão original de um método.',
      },
      {
        kind: 'code',
        code: `class Gerente : Funcionario
{
    public int Equipe { get; }

    public Gerente(string nome, decimal salario, int equipe)
        : base(nome, salario)      // repassa para o construtor da base
    {
        Equipe = equipe;
    }
}`,
        caption: 'O `: base(...)` é a mesma sintaxe do `: this(...)` do capítulo 1.',
      },
      {
        kind: 'text',
        body:
          'Sem o `: base(...)`, o compilador tenta chamar o construtor sem parâmetros da base. Se ela não tiver um, o código não compila — o que é um erro comum e confuso na primeira vez.',
      },
      {
        kind: 'code',
        code: `public override string Cracha()
{
    return "[GERENTE] " + base.Cracha();   // reaproveita e estende
}`,
        caption: 'O `base.Metodo()` chama a versão da classe base, mesmo tendo sobrescrito.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Chamar `base.Metodo()` dentro do método sobrescrito é o padrão de **estender** em vez de substituir: você aproveita o que a base faz e acrescenta o seu por cima.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Dentro de um método sobrescrito, chamar `Cracha()` sem o `base.` causa **recursão infinita**: o método chama a si mesmo. É a mesma armadilha do `set` que atribui à própria propriedade.',
      },
      {
        kind: 'text',
        body:
          'O `base` só alcança um nível acima. Em uma hierarquia de três classes, a do meio pode chamar a de cima, mas a de baixo não tem como pular direto para a raiz.',
      },
    ],
    quiz: [
      {
        id: 's05c03l02q1',
        type: 'single',
        prompt: 'O que acontece sem `: base(...)` quando a base só tem construtor com parâmetros?',
        options: [
          { id: 'a', text: 'Não compila: o compilador procura um construtor sem parâmetros que não existe.', correct: true },
          { id: 'b', text: 'Os campos da base ficam com valores padrão.' },
          { id: 'c', text: 'O construtor da base é pulado.' },
          { id: 'd', text: 'Lança exceção em tempo de execução.' },
        ],
        explanation:
          'Toda derivada precisa inicializar sua base. Sem indicação explícita, ela tenta o construtor sem parâmetros — e reclama quando ele não existe.',
      },
      {
        id: 's05c03l02q2',
        type: 'single',
        prompt: 'O que `base.Cracha()` faz dentro de um `Cracha()` sobrescrito?',
        options: [
          { id: 'a', text: 'Chama a versão da classe base.', correct: true },
          { id: 'b', text: 'Chama a si mesmo.' },
          { id: 'c', text: 'Não compila.' },
          { id: 'd', text: 'Cria um objeto da base.' },
        ],
        explanation:
          'É o que permite estender em vez de substituir. Sem o `base.`, a chamada resolveria para a própria versão sobrescrita, em recursão infinita.',
      },
      {
        id: 's05c03l02q3',
        type: 'single',
        prompt: 'Em uma hierarquia de três níveis, a classe mais derivada pode chamar diretamente a raiz?',
        options: [
          { id: 'a', text: 'Não: `base` só alcança um nível acima.', correct: true },
          { id: 'b', text: 'Sim, com `base.base`.' },
          { id: 'c', text: 'Sim, pelo nome da classe raiz.' },
          { id: 'd', text: 'Sim, automaticamente.' },
        ],
        explanation:
          'Cada nível só conversa com o imediatamente acima. Isso mantém o encadeamento previsível: cada classe controla o que repassa adiante.',
      },
    ],
    challenge: {
      brief:
        'Construa uma hierarquia de três níveis em que cada construtor repassa dados para o anterior e cada descrição estende a da base.',
      requirements: [
        '`Veiculo` recebe marca e rodas; `Descrever()` devolve `marca (N rodas)`',
        '`Carro` herda de `Veiculo`, recebe marca e portas, e sempre tem 4 rodas',
        '`Carro.Descrever()` devolve a descrição da base seguida de ` [N portas]`',
        '`CarroEsportivo` herda de `Carro`, recebe marca, portas e velocidade máxima',
        '`CarroEsportivo.Descrever()` devolve a descrição de `Carro` seguida de ` [N km/h]`',
        'Cada `Descrever()` precisa **chamar** a versão da base, sem repetir o texto',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare Veiculo, Carro e CarroEsportivo aqui

class Program
{
    static void Main()
    {
        string marca = Console.ReadLine();
        int portas = int.Parse(Console.ReadLine());
        int velocidade = int.Parse(Console.ReadLine());

        Veiculo v = new Veiculo(marca, 2);
        Carro c = new Carro(marca, portas);
        CarroEsportivo e = new CarroEsportivo(marca, portas, velocidade);

        Console.WriteLine(v.Descrever());
        Console.WriteLine(c.Descrever());
        Console.WriteLine(e.Descrever());
        Console.WriteLine($"Esportivo e carro: {e is Carro}");
        Console.WriteLine($"Esportivo e veiculo: {e is Veiculo}");
    }
}
`,
      solution: `using System;

class Veiculo
{
    public string Marca { get; }
    public int Rodas { get; }

    public Veiculo(string marca, int rodas)
    {
        Marca = marca;
        Rodas = rodas;
    }

    public virtual string Descrever()
    {
        return $"{Marca} ({Rodas} rodas)";
    }
}

class Carro : Veiculo
{
    public int Portas { get; }

    public Carro(string marca, int portas)
        : base(marca, 4)
    {
        Portas = portas;
    }

    public override string Descrever()
    {
        return base.Descrever() + $" [{Portas} portas]";
    }
}

class CarroEsportivo : Carro
{
    public int VelocidadeMaxima { get; }

    public CarroEsportivo(string marca, int portas, int velocidade)
        : base(marca, portas)
    {
        VelocidadeMaxima = velocidade;
    }

    public override string Descrever()
    {
        return base.Descrever() + $" [{VelocidadeMaxima} km/h]";
    }
}

class Program
{
    static void Main()
    {
        string marca = Console.ReadLine();
        int portas = int.Parse(Console.ReadLine());
        int velocidade = int.Parse(Console.ReadLine());

        Veiculo v = new Veiculo(marca, 2);
        Carro c = new Carro(marca, portas);
        CarroEsportivo e = new CarroEsportivo(marca, portas, velocidade);

        Console.WriteLine(v.Descrever());
        Console.WriteLine(c.Descrever());
        Console.WriteLine(e.Descrever());
        Console.WriteLine($"Esportivo e carro: {e is Carro}");
        Console.WriteLine($"Esportivo e veiculo: {e is Veiculo}");
    }
}
`,
      hints: [
        'O construtor de `Carro` passa o `4` fixo para a base: `: base(marca, 4)`.',
        'Cada `Descrever()` começa com `base.Descrever()` e concatena o próprio trecho.',
      ],
      tests: [
        {
          name: 'Três níveis',
          stdin: 'Fusca\n2\n120\n',
          expectedStdout:
            'Fusca (2 rodas)\nFusca (4 rodas) [2 portas]\nFusca (4 rodas) [2 portas] [120 km/h]\n' +
            'Esportivo e carro: True\nEsportivo e veiculo: True',
        },
        {
          name: 'Quatro portas',
          stdin: 'Sedan\n4\n200\n',
          expectedStdout:
            'Sedan (2 rodas)\nSedan (4 rodas) [4 portas]\nSedan (4 rodas) [4 portas] [200 km/h]\n' +
            'Esportivo e carro: True\nEsportivo e veiculo: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c03l03',
    title: 'Construtores em hierarquia',
    objective: 'Entender a ordem de execução dos construtores e por que a base é sempre inicializada primeiro.',
    concept: [
      {
        kind: 'text',
        body:
          'Ao criar um objeto de uma classe derivada, **todos** os construtores da hierarquia executam — e a ordem é de cima para baixo, da base para a derivada.',
      },
      {
        kind: 'output',
        code: `new Derivada();

ctor Base       <- primeiro
ctor Derivada   <- depois`,
        caption: 'A base é sempre inicializada antes do corpo da derivada rodar.',
      },
      {
        kind: 'text',
        body:
          'A ordem faz sentido: o corpo da derivada pode usar membros herdados, e eles precisam estar prontos. Se a base rodasse depois, a derivada trabalharia sobre dados ainda não inicializados.',
      },
      {
        kind: 'code',
        code: `class Derivada : Base
{
    public Derivada() : base("valor")   // executa ANTES do corpo abaixo
    {
        Console.WriteLine("ctor Derivada");
    }
}`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O `: base(...)` acontece **antes** do corpo do construtor derivado, mesmo aparecendo na mesma linha da assinatura. Não há como executar algo antes de inicializar a base.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Em uma hierarquia de três níveis, a cadeia inteira executa: raiz, meio, folha. Isso significa que criar um objeto derivado nunca deixa nenhum nível pela metade.',
      },
      {
        kind: 'text',
        body:
          'Se a base tiver um construtor sem parâmetros, o `: base()` é implícito e pode ser omitido. Escrever tudo explicitamente só é necessário quando há parâmetros a repassar.',
      },
    ],
    quiz: [
      {
        id: 's05c03l03q1',
        type: 'single',
        prompt: 'Qual construtor executa primeiro ao criar um objeto derivado?',
        options: [
          { id: 'a', text: 'O da classe base.', correct: true },
          { id: 'b', text: 'O da classe derivada.' },
          { id: 'c', text: 'Os dois ao mesmo tempo.' },
          { id: 'd', text: 'Depende do `: base(...)`.' },
        ],
        explanation:
          'A base precisa estar pronta antes que o corpo da derivada possa usar qualquer membro herdado.',
      },
      {
        id: 's05c03l03q2',
        type: 'single',
        prompt: 'Em uma hierarquia de três níveis, quantos construtores executam?',
        options: [
          { id: 'a', text: 'Três: um por nível, da raiz para a folha.', correct: true },
          { id: 'b', text: 'Um: o da classe criada.' },
          { id: 'c', text: 'Dois: a base e a folha.' },
          { id: 'd', text: 'Depende dos parâmetros.' },
        ],
        explanation:
          'A cadeia é completa. Cada nível inicializa a parte do objeto que ele declara, sem deixar nada pela metade.',
      },
      {
        id: 's05c03l03q3',
        type: 'single',
        prompt: 'Quando o `: base()` pode ser omitido?',
        options: [
          { id: 'a', text: 'Quando a base tem um construtor sem parâmetros.', correct: true },
          { id: 'b', text: 'Sempre.' },
          { id: 'c', text: 'Quando a derivada não tem campos.' },
          { id: 'd', text: 'Nunca.' },
        ],
        explanation:
          'O compilador insere a chamada implicitamente. Sem um construtor sem parâmetros na base, a omissão vira erro de compilação.',
      },
    ],
    challenge: {
      brief:
        'Construa uma hierarquia de três níveis cujos construtores imprimem uma mensagem, revelando a ordem de execução.',
      requirements: [
        '`Animal` recebe o nome, imprime `Animal: nome` no construtor, e expõe `Nome`',
        '`Mamifero` herda de `Animal`, recebe nome e temperatura, e imprime `Mamifero: N graus`',
        '`Cachorro` herda de `Mamifero`, recebe nome e raça, usa temperatura fixa `38`, e imprime `Cachorro: raca`',
        '`Ficha()` em `Cachorro` devolve `nome (raca, N graus)`',
        'As mensagens dos construtores precisam sair na ordem em que executam',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare Animal, Mamifero e Cachorro aqui

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        string raca = Console.ReadLine();

        Console.WriteLine("--- criando ---");
        Cachorro c = new Cachorro(nome, raca);
        Console.WriteLine("--- criado ---");

        Console.WriteLine(c.Ficha());
        Console.WriteLine($"Cachorro e animal: {c is Animal}");
    }
}
`,
      solution: `using System;

class Animal
{
    public string Nome { get; }

    public Animal(string nome)
    {
        Nome = nome;
        Console.WriteLine($"Animal: {nome}");
    }
}

class Mamifero : Animal
{
    public int Temperatura { get; }

    public Mamifero(string nome, int temperatura)
        : base(nome)
    {
        Temperatura = temperatura;
        Console.WriteLine($"Mamifero: {temperatura} graus");
    }
}

class Cachorro : Mamifero
{
    public string Raca { get; }

    public Cachorro(string nome, string raca)
        : base(nome, 38)
    {
        Raca = raca;
        Console.WriteLine($"Cachorro: {raca}");
    }

    public string Ficha()
    {
        return $"{Nome} ({Raca}, {Temperatura} graus)";
    }
}

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        string raca = Console.ReadLine();

        Console.WriteLine("--- criando ---");
        Cachorro c = new Cachorro(nome, raca);
        Console.WriteLine("--- criado ---");

        Console.WriteLine(c.Ficha());
        Console.WriteLine($"Cachorro e animal: {c is Animal}");
    }
}
`,
      hints: [
        'Cada construtor imprime **depois** de atribuir seus campos, e o `: base(...)` já executou antes disso.',
        'O construtor de `Cachorro` passa a temperatura fixa: `: base(nome, 38)`.',
      ],
      tests: [
        {
          name: 'Ordem dos construtores',
          stdin: 'Rex\nLabrador\n',
          expectedStdout:
            '--- criando ---\nAnimal: Rex\nMamifero: 38 graus\nCachorro: Labrador\n--- criado ---\n' +
            'Rex (Labrador, 38 graus)\nCachorro e animal: True',
        },
        {
          name: 'Outro cachorro',
          stdin: 'Bidu\nVira-lata\n',
          expectedStdout:
            '--- criando ---\nAnimal: Bidu\nMamifero: 38 graus\nCachorro: Vira-lata\n--- criado ---\n' +
            'Bidu (Vira-lata, 38 graus)\nCachorro e animal: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c03l04',
    title: 'protected',
    objective: 'Compartilhar membros com as classes derivadas sem expô-los ao resto do programa.',
    concept: [
      {
        kind: 'text',
        body:
          'O `private` esconde de todo mundo, inclusive das derivadas. O `public` mostra para todos. O **`protected`** fica no meio: visível para a própria classe e para quem herda dela, e mais ninguém.',
      },
      {
        kind: 'table',
        headers: ['Modificador', 'Própria classe', 'Derivadas', 'Resto'],
        rows: [
          ['`private`', 'sim', '**não**', 'não'],
          ['`protected`', 'sim', '**sim**', 'não'],
          ['`public`', 'sim', 'sim', 'sim'],
        ],
      },
      {
        kind: 'code',
        code: `class Funcionario
{
    protected decimal salarioBase;    // derivadas enxergam

    public Funcionario(decimal salario)
    {
        salarioBase = salario;
    }

    public virtual decimal Total() => salarioBase;
}

class Gerente : Funcionario
{
    public override decimal Total()
    {
        return salarioBase * 1.5m;    // acessa o protegido da base
    }
}`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O `protected` abre um buraco no encapsulamento: qualquer classe que herde da sua passa a mexer naquele campo. Um `private` com um método `protected` que o manipula costuma ser uma escolha melhor.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A regra prática é a mesma de sempre: comece `private` e promova a `protected` só quando uma derivada realmente precisar. Fechar algo depois de as derivadas dependerem dele é bem mais trabalhoso.',
      },
      {
        kind: 'text',
        body:
          'Métodos `protected` são muito mais comuns que campos `protected`. Eles permitem que a base ofereça uma operação controlada às derivadas sem expor o estado interno bruto.',
      },
    ],
    quiz: [
      {
        id: 's05c03l04q1',
        type: 'single',
        prompt: 'Quem pode acessar um membro `protected`?',
        options: [
          { id: 'a', text: 'A própria classe e as classes que herdam dela.', correct: true },
          { id: 'b', text: 'Apenas a própria classe.' },
          { id: 'c', text: 'Qualquer classe do projeto.' },
          { id: 'd', text: 'Apenas as classes derivadas, não a própria.' },
        ],
        explanation:
          'É a categoria intermediária entre `private` e `public`, pensada exatamente para o relacionamento de herança.',
      },
      {
        id: 's05c03l04q2',
        type: 'single',
        prompt: 'Uma classe derivada consegue acessar um campo `private` da base?',
        options: [
          { id: 'a', text: 'Não: `private` exclui até as derivadas.', correct: true },
          { id: 'b', text: 'Sim: herança dá acesso total.' },
          { id: 'c', text: 'Sim, mas só no construtor.' },
          { id: 'd', text: 'Sim, com `base.campo`.' },
        ],
        explanation:
          'O campo existe no objeto — a derivada simplesmente não consegue mencioná-lo. É por isso que o `protected` existe.',
      },
      {
        id: 's05c03l04q3',
        type: 'single',
        prompt: 'Por que preferir método `protected` a campo `protected`?',
        options: [
          { id: 'a', text: 'Porque a base mantém o controle de como o estado é alterado.', correct: true },
          { id: 'b', text: 'Porque campos não podem ser `protected`.' },
          { id: 'c', text: 'Porque métodos são mais rápidos.' },
          { id: 'd', text: 'Não há diferença.' },
        ],
        explanation:
          'É o mesmo argumento de propriedade contra campo público, um nível acima: expor a operação em vez do dado bruto preserva as invariantes.',
      },
    ],
    challenge: {
      brief:
        'Construa uma hierarquia em que a base guarda o estado de forma protegida e oferece uma operação controlada às derivadas.',
      requirements: [
        '`ContaBase` recebe o saldo inicial e o expõe apenas para leitura',
        'O saldo é guardado em um membro **não acessível** de fora da hierarquia',
        '`ContaBase` oferece um método `protected` `Creditar(decimal)` que soma ao saldo apenas valores positivos',
        '`ContaBase.Render()` é virtual e não faz nada por padrão',
        '`Poupanca` herda de `ContaBase` e sobrescreve `Render()` para creditar 1% do saldo',
        '`ContaSalario` herda de `ContaBase` e sobrescreve `Render()` para creditar 20 reais fixos',
        '`Render()` de cada classe precisa usar o método protegido, não alterar o saldo diretamente',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare ContaBase, Poupanca e ContaSalario aqui

class Program
{
    static void Main()
    {
        decimal inicial = decimal.Parse(Console.ReadLine());
        int meses = int.Parse(Console.ReadLine());

        Poupanca p = new Poupanca(inicial);
        ContaSalario s = new ContaSalario(inicial);

        for (int i = 0; i < meses; i++)
        {
            p.Render();
            s.Render();
        }

        Console.WriteLine($"Poupanca: {p.Saldo:F2}");
        Console.WriteLine($"Salario: {s.Saldo:F2}");
        Console.WriteLine($"Diferenca: {p.Saldo - s.Saldo:F2}");
    }
}
`,
      solution: `using System;

class ContaBase
{
    private decimal saldo;

    public decimal Saldo => saldo;

    public ContaBase(decimal inicial)
    {
        saldo = inicial < 0m ? 0m : inicial;
    }

    protected void Creditar(decimal valor)
    {
        if (valor <= 0m)
        {
            return;
        }

        saldo += valor;
    }

    public virtual void Render()
    {
    }
}

class Poupanca : ContaBase
{
    public Poupanca(decimal inicial)
        : base(inicial)
    {
    }

    public override void Render()
    {
        Creditar(Saldo * 0.01m);
    }
}

class ContaSalario : ContaBase
{
    public ContaSalario(decimal inicial)
        : base(inicial)
    {
    }

    public override void Render()
    {
        Creditar(20m);
    }
}

class Program
{
    static void Main()
    {
        decimal inicial = decimal.Parse(Console.ReadLine());
        int meses = int.Parse(Console.ReadLine());

        Poupanca p = new Poupanca(inicial);
        ContaSalario s = new ContaSalario(inicial);

        for (int i = 0; i < meses; i++)
        {
            p.Render();
            s.Render();
        }

        Console.WriteLine($"Poupanca: {p.Saldo:F2}");
        Console.WriteLine($"Salario: {s.Saldo:F2}");
        Console.WriteLine($"Diferenca: {p.Saldo - s.Saldo:F2}");
    }
}
`,
      hints: [
        'O campo do saldo é `private`, e o que as derivadas enxergam é o método `protected Creditar`.',
        'A poupança calcula `Saldo * 0.01m` e passa esse valor para `Creditar` — sem tocar no campo.',
      ],
      tests: [
        {
          name: 'Doze meses',
          stdin: '1000\n12\n',
          expectedStdout: 'Poupanca: 1126.83\nSalario: 1240.00\nDiferenca: -113.17',
        },
        {
          name: 'Nenhum mes',
          stdin: '500\n0\n',
          expectedStdout: 'Poupanca: 500.00\nSalario: 500.00\nDiferenca: 0.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c03l05',
    title: 'virtual e override',
    objective: 'Permitir que a derivada substitua o comportamento da base, e entender qual versão é executada.',
    concept: [
      {
        kind: 'text',
        body:
          'Um método `virtual` é um convite: a base declara que aquele comportamento **pode** ser substituído. A derivada aceita o convite com `override`.',
      },
      {
        kind: 'code',
        code: `class Funcionario
{
    public virtual decimal Bonus() => 0m;     // pode ser substituido
}

class Gerente : Funcionario
{
    public override decimal Bonus() => 5000m;  // substitui
}`,
      },
      {
        kind: 'text',
        body:
          'A parte decisiva é qual versão executa. A escolha depende do **tipo real do objeto**, não do tipo da variável que o guarda.',
      },
      {
        kind: 'output',
        code: `Funcionario f = new Gerente();

f.Bonus();     // 5000  <- a versao do Gerente`,
        caption: 'A variável é `Funcionario`, o objeto é `Gerente`, e o `Gerente` decide.',
      },
      {
        kind: 'table',
        headers: ['Palavra', 'Onde', 'Significa'],
        rows: [
          ['`virtual`', 'na base', 'pode ser substituído'],
          ['`override`', 'na derivada', 'estou substituindo'],
          ['(nenhuma)', 'na base', 'não pode ser substituído'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Sem o `virtual` na base, o `override` não compila. E sem o `override` na derivada, um método de mesma assinatura gera aviso e se comporta de forma diferente — assunto da próxima lição.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Essa escolha em tempo de execução tem nome: **despacho virtual**. Ela é o mecanismo que torna o polimorfismo possível, e é o assunto inteiro do próximo capítulo.',
      },
    ],
    quiz: [
      {
        id: 's05c03l05q1',
        type: 'single',
        prompt: 'Qual versão executa em `Funcionario f = new Gerente(); f.Bonus();`?',
        options: [
          { id: 'a', text: 'A do `Gerente`, porque é o tipo real do objeto.', correct: true },
          { id: 'b', text: 'A do `Funcionario`, porque é o tipo da variável.' },
          { id: 'c', text: 'As duas, em sequência.' },
          { id: 'd', text: 'Depende do valor dos campos.' },
        ],
        explanation:
          'Para métodos virtuais, o tipo real do objeto manda. A variável só decide quais membros podem ser chamados, não qual implementação roda.',
      },
      {
        id: 's05c03l05q2',
        type: 'single',
        prompt: 'O que acontece ao usar `override` para um método não `virtual`?',
        options: [
          { id: 'a', text: 'Erro de compilação.', correct: true },
          { id: 'b', text: 'Funciona normalmente.' },
          { id: 'c', text: 'Gera apenas um aviso.' },
          { id: 'd', text: 'O método da base é ignorado.' },
        ],
        explanation:
          'A base precisa autorizar explicitamente a substituição. É uma decisão de projeto de C#: por padrão, métodos não são substituíveis.',
      },
      {
        id: 's05c03l05q3',
        type: 'single',
        prompt: 'Como se chama a escolha da implementação pelo tipo real do objeto?',
        options: [
          { id: 'a', text: 'Despacho virtual.', correct: true },
          { id: 'b', text: 'Sobrecarga.' },
          { id: 'c', text: 'Encapsulamento.' },
          { id: 'd', text: 'Conversão implícita.' },
        ],
        explanation:
          'A sobrecarga é resolvida na compilação pelos tipos dos argumentos; o despacho virtual acontece em execução pelo tipo do objeto.',
      },
    ],
    challenge: {
      brief:
        'Construa uma hierarquia de funcionários em que cada cargo calcula o próprio bônus, e o total é calculado sem saber os tipos concretos.',
      requirements: [
        '`Funcionario` recebe nome e salário, e tem `Bonus()` **virtual** devolvendo `0`',
        '`Funcionario.Total()` devolve salário mais bônus',
        '`Vendedor` sobrescreve `Bonus()` para devolver 10% do salário',
        '`Gerente` sobrescreve `Bonus()` para devolver 30% do salário',
        '`Diretor` herda de `Gerente` e sobrescreve `Bonus()` para devolver o bônus de gerente mais 5000',
        '`Diretor` precisa **reaproveitar** o cálculo do gerente, sem repetir a porcentagem',
        '`Ficha()` devolve `nome: salario + bonus = total`, com duas casas em cada valor',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare Funcionario, Vendedor, Gerente e Diretor aqui

class Program
{
    static void Main()
    {
        decimal salario = decimal.Parse(Console.ReadLine());

        Funcionario comum = new Funcionario("Comum", salario);
        Funcionario vendedor = new Vendedor("Vendedor", salario);
        Funcionario gerente = new Gerente("Gerente", salario);
        Funcionario diretor = new Diretor("Diretor", salario);

        Console.WriteLine(comum.Ficha());
        Console.WriteLine(vendedor.Ficha());
        Console.WriteLine(gerente.Ficha());
        Console.WriteLine(diretor.Ficha());

        decimal folha = comum.Total() + vendedor.Total() + gerente.Total() + diretor.Total();
        Console.WriteLine($"Folha: {folha:F2}");
    }
}
`,
      solution: `using System;

class Funcionario
{
    public string Nome { get; }
    public decimal Salario { get; }

    public Funcionario(string nome, decimal salario)
    {
        Nome = nome;
        Salario = salario;
    }

    public virtual decimal Bonus()
    {
        return 0m;
    }

    public decimal Total()
    {
        return Salario + Bonus();
    }

    public string Ficha()
    {
        return $"{Nome}: {Salario:F2} + {Bonus():F2} = {Total():F2}";
    }
}

class Vendedor : Funcionario
{
    public Vendedor(string nome, decimal salario)
        : base(nome, salario)
    {
    }

    public override decimal Bonus()
    {
        return Salario * 0.10m;
    }
}

class Gerente : Funcionario
{
    public Gerente(string nome, decimal salario)
        : base(nome, salario)
    {
    }

    public override decimal Bonus()
    {
        return Salario * 0.30m;
    }
}

class Diretor : Gerente
{
    public Diretor(string nome, decimal salario)
        : base(nome, salario)
    {
    }

    public override decimal Bonus()
    {
        return base.Bonus() + 5000m;
    }
}

class Program
{
    static void Main()
    {
        decimal salario = decimal.Parse(Console.ReadLine());

        Funcionario comum = new Funcionario("Comum", salario);
        Funcionario vendedor = new Vendedor("Vendedor", salario);
        Funcionario gerente = new Gerente("Gerente", salario);
        Funcionario diretor = new Diretor("Diretor", salario);

        Console.WriteLine(comum.Ficha());
        Console.WriteLine(vendedor.Ficha());
        Console.WriteLine(gerente.Ficha());
        Console.WriteLine(diretor.Ficha());

        decimal folha = comum.Total() + vendedor.Total() + gerente.Total() + diretor.Total();
        Console.WriteLine($"Folha: {folha:F2}");
    }
}
`,
      hints: [
        '`Total()` e `Ficha()` não precisam ser virtuais: eles chamam `Bonus()`, que já resolve para a versão certa.',
        'O `Diretor` reaproveita com `base.Bonus() + 5000m`.',
      ],
      tests: [
        {
          name: 'Salário de 10 mil',
          stdin: '10000\n',
          expectedStdout:
            'Comum: 10000.00 + 0.00 = 10000.00\nVendedor: 10000.00 + 1000.00 = 11000.00\n' +
            'Gerente: 10000.00 + 3000.00 = 13000.00\nDiretor: 10000.00 + 8000.00 = 18000.00\n' +
            'Folha: 52000.00',
        },
        {
          name: 'Salário de 2 mil',
          stdin: '2000\n',
          expectedStdout:
            'Comum: 2000.00 + 0.00 = 2000.00\nVendedor: 2000.00 + 200.00 = 2200.00\n' +
            'Gerente: 2000.00 + 600.00 = 2600.00\nDiretor: 2000.00 + 5600.00 = 7600.00\n' +
            'Folha: 14400.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c03l06',
    title: 'Escondendo com new',
    objective: 'Reconhecer a diferença entre substituir e esconder um método, e por que esconder quase sempre é um erro.',
    concept: [
      {
        kind: 'text',
        body:
          'Existe uma segunda forma de a derivada declarar um método com a mesma assinatura da base: a palavra `new`. Ela **esconde** o método em vez de substituí-lo — e o resultado é bem diferente.',
      },
      {
        kind: 'code',
        code: `class Base
{
    public virtual string Falar() => "base virtual";
    public string Fixo() => "base fixo";
}

class Derivada : Base
{
    public override string Falar() => "derivada override";
    public new string Fixo() => "derivada new";
}`,
      },
      {
        kind: 'text',
        body:
          'A diferença aparece quando o objeto é acessado por uma variável do tipo base — e ela é exatamente o oposto do que a intuição sugere.',
      },
      {
        kind: 'output',
        code: `Derivada d = new Derivada();
Base comoBase = d;              // mesmo objeto, outra variavel

comoBase.Falar()   ->  derivada override    (o OBJETO decide)
d.Falar()          ->  derivada override

comoBase.Fixo()    ->  base fixo            (a VARIAVEL decide)
d.Fixo()           ->  derivada new`,
        caption: 'O mesmo objeto responde diferente conforme o tipo da variável — só com `new`.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Esse é o problema: com `new`, o comportamento depende de como você está segurando o objeto. Guardar a mesma instância em duas variáveis de tipos diferentes produz respostas diferentes, o que é uma fonte de bugs difíceis de rastrear.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Se você escrever um método com a mesma assinatura da base sem `override` nem `new`, o compilador emite um aviso e assume `new`. O aviso existe justamente porque isso raramente é intencional.',
      },
      {
        kind: 'text',
        body:
          'Os usos legítimos de `new` são raros: basicamente quando você herda de uma classe que não controla e ela ganhou um membro com o mesmo nome que o seu. Na dúvida, use `virtual` e `override`.',
      },
    ],
    quiz: [
      {
        id: 's05c03l06q1',
        type: 'single',
        prompt: 'Com `new`, qual versão executa ao acessar pelo tipo base?',
        options: [
          { id: 'a', text: 'A da base: o tipo da variável decide.', correct: true },
          { id: 'b', text: 'A da derivada: o tipo do objeto decide.' },
          { id: 'c', text: 'As duas.' },
          { id: 'd', text: 'Erro de compilação.' },
        ],
        explanation:
          'É o contrário de `override`. Com `new`, a resolução acontece na compilação pelo tipo declarado da variável.',
      },
      {
        id: 's05c03l06q2',
        type: 'single',
        prompt: 'Por que esconder com `new` é problemático?',
        options: [
          { id: 'a', text: 'Porque o comportamento passa a depender do tipo da variável, não do objeto.', correct: true },
          { id: 'b', text: 'Porque não compila.' },
          { id: 'c', text: 'Porque é mais lento.' },
          { id: 'd', text: 'Porque impede herança.' },
        ],
        explanation:
          'O mesmo objeto responde diferente conforme quem o segura. Isso quebra a expectativa de que um objeto tem um comportamento só.',
      },
      {
        id: 's05c03l06q3',
        type: 'single',
        prompt: 'O que o compilador faz com um método de mesma assinatura sem `override` nem `new`?',
        options: [
          { id: 'a', text: 'Emite um aviso e assume `new`.', correct: true },
          { id: 'b', text: 'Assume `override`.' },
          { id: 'c', text: 'Recusa a compilação.' },
          { id: 'd', text: 'Ignora o método da derivada.' },
        ],
        explanation:
          'O aviso existe porque esse é quase sempre um erro. Escrever `new` explicitamente é a forma de dizer "eu sei o que estou fazendo".',
      },
    ],
    challenge: {
      brief:
        'Demonstre a diferença entre `override` e `new` com uma classe que tem os dois, revelando o comportamento pelas duas formas de acesso.',
      requirements: [
        '`Documento` tem `Titulo` e dois métodos: `Formatar()` **virtual** devolvendo `[titulo]`, e `Assinar()` **não virtual** devolvendo `assinado por documento`',
        '`Relatorio` herda de `Documento`, sobrescreve `Formatar()` para devolver `RELATORIO: titulo`, e **esconde** `Assinar()` com `new`, devolvendo `assinado por relatorio`',
        'O `Main` acessa o mesmo objeto pelas duas variáveis e imprime as quatro combinações',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare Documento e Relatorio aqui

class Program
{
    static void Main()
    {
        string titulo = Console.ReadLine();

        Relatorio r = new Relatorio(titulo);
        Documento d = r;

        Console.WriteLine($"Formatar via Relatorio: {r.Formatar()}");
        Console.WriteLine($"Formatar via Documento: {d.Formatar()}");
        Console.WriteLine($"Assinar via Relatorio: {r.Assinar()}");
        Console.WriteLine($"Assinar via Documento: {d.Assinar()}");
        Console.WriteLine($"Mesmo objeto: {ReferenceEquals(r, d)}");
    }
}
`,
      solution: `using System;

class Documento
{
    public string Titulo { get; }

    public Documento(string titulo)
    {
        Titulo = titulo;
    }

    public virtual string Formatar()
    {
        return $"[{Titulo}]";
    }

    public string Assinar()
    {
        return "assinado por documento";
    }
}

class Relatorio : Documento
{
    public Relatorio(string titulo)
        : base(titulo)
    {
    }

    public override string Formatar()
    {
        return $"RELATORIO: {Titulo}";
    }

    public new string Assinar()
    {
        return "assinado por relatorio";
    }
}

class Program
{
    static void Main()
    {
        string titulo = Console.ReadLine();

        Relatorio r = new Relatorio(titulo);
        Documento d = r;

        Console.WriteLine($"Formatar via Relatorio: {r.Formatar()}");
        Console.WriteLine($"Formatar via Documento: {d.Formatar()}");
        Console.WriteLine($"Assinar via Relatorio: {r.Assinar()}");
        Console.WriteLine($"Assinar via Documento: {d.Assinar()}");
        Console.WriteLine($"Mesmo objeto: {ReferenceEquals(r, d)}");
    }
}
`,
      hints: [
        '`Formatar` usa `virtual` na base e `override` na derivada; `Assinar` não tem `virtual` e a derivada usa `new`.',
        'As duas linhas de `Formatar` dão o mesmo resultado; as de `Assinar` dão resultados diferentes — é esse o ponto.',
      ],
      tests: [
        {
          name: 'Override contra new',
          stdin: 'Vendas Q1\n',
          expectedStdout:
            'Formatar via Relatorio: RELATORIO: Vendas Q1\nFormatar via Documento: RELATORIO: Vendas Q1\n' +
            'Assinar via Relatorio: assinado por relatorio\nAssinar via Documento: assinado por documento\n' +
            'Mesmo objeto: True',
        },
        {
          name: 'Outro titulo',
          stdin: 'Balanco\n',
          expectedStdout:
            'Formatar via Relatorio: RELATORIO: Balanco\nFormatar via Documento: RELATORIO: Balanco\n' +
            'Assinar via Relatorio: assinado por relatorio\nAssinar via Documento: assinado por documento\n' +
            'Mesmo objeto: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c03l07',
    title: 'sealed',
    objective: 'Impedir que uma classe seja herdada ou que um método continue sendo sobrescrito.',
    concept: [
      {
        kind: 'text',
        body:
          'O `sealed` fecha uma porta. Aplicado a uma classe, impede que alguém herde dela; aplicado a um método sobrescrito, impede que as derivadas seguintes continuem substituindo.',
      },
      {
        kind: 'code',
        code: `sealed class Configuracao       // ninguem pode herdar
{
}

class Gerente : Funcionario
{
    public sealed override decimal Bonus() => 5000m;   // para aqui
}

class Diretor : Gerente
{
    public override decimal Bonus() => 9000m;   // NAO compila
}`,
      },
      {
        kind: 'table',
        headers: ['Onde', 'Efeito'],
        rows: [
          ['`sealed class`', 'a classe não pode ser base de ninguém'],
          ['`sealed override`', 'aquele método não pode ser sobrescrito de novo'],
          ['`sealed` em método não `override`', 'não compila'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Herança é um contrato: quem herda depende dos detalhes de como a base funciona. `sealed` é a forma de dizer "esta classe não foi projetada para ser estendida, e eu me reservo o direito de mudá-la por dentro".',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A opinião moderna é que classes deveriam ser `sealed` por padrão, e abertas apenas quando a extensão foi pensada. Uma classe herdável mal projetada é muito mais difícil de corrigir depois do que uma fechada que precisa ser aberta.',
      },
      {
        kind: 'text',
        body:
          'Vários tipos da própria biblioteca padrão são `sealed`, incluindo `string`. Isso permite otimizações e garante que ninguém altere o comportamento de algo tão fundamental.',
      },
    ],
    quiz: [
      {
        id: 's05c03l07q1',
        type: 'single',
        prompt: 'O que `sealed` em uma classe impede?',
        options: [
          { id: 'a', text: 'Que outras classes herdem dela.', correct: true },
          { id: 'b', text: 'Que ela seja instanciada.' },
          { id: 'c', text: 'Que seus métodos sejam chamados.' },
          { id: 'd', text: 'Que ela herde de outra.' },
        ],
        explanation:
          'Ela continua sendo usada normalmente, e pode inclusive herdar de outra. O que fica proibido é alguém herdar **dela**.',
      },
      {
        id: 's05c03l07q2',
        type: 'single',
        prompt: 'O que `sealed override` faz?',
        options: [
          { id: 'a', text: 'Sobrescreve o método e impede que derivadas o sobrescrevam de novo.', correct: true },
          { id: 'b', text: 'Impede que o método seja chamado.' },
          { id: 'c', text: 'Torna o método `static`.' },
          { id: 'd', text: 'Não compila.' },
        ],
        explanation:
          'É a forma de encerrar uma cadeia de substituições em um ponto específico, sem fechar a classe inteira.',
      },
      {
        id: 's05c03l07q3',
        type: 'single',
        prompt: 'Por que a recomendação moderna é selar por padrão?',
        options: [
          { id: 'a', text: 'Porque uma classe herdável mal projetada é difícil de corrigir depois.', correct: true },
          { id: 'b', text: 'Porque `sealed` melhora a legibilidade.' },
          { id: 'c', text: 'Porque herança é sempre ruim.' },
          { id: 'd', text: 'Porque o compilador exige.' },
        ],
        explanation:
          'Abrir depois é fácil; fechar depois quebra quem já herdou. Projetar para herança exige cuidado, e nem toda classe merece esse investimento.',
      },
    ],
    challenge: {
      brief:
        'Construa uma hierarquia em que um nível intermediário sela o cálculo, e uma classe final não pode ser estendida.',
      requirements: [
        '`Imposto` tem `Base` (`decimal`) e um método `virtual` `Calcular()` devolvendo 10% da base',
        '`ImpostoReduzido` herda e sobrescreve `Calcular()` para 5% da base, **selando** o método',
        '`ImpostoIsento` herda de `ImpostoReduzido` e não pode sobrescrever `Calcular()`',
        '`ImpostoIsento` é uma classe **selada** e acrescenta `Motivo` (`string`)',
        '`Descrever()` em `Imposto` devolve `tipo: base -> imposto`, com o nome do tipo real e os valores em duas casas',
        'Use `GetType().Name` para obter o nome do tipo real',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare Imposto, ImpostoReduzido e ImpostoIsento aqui

class Program
{
    static void Main()
    {
        decimal valor = decimal.Parse(Console.ReadLine());
        string motivo = Console.ReadLine();

        Imposto normal = new Imposto(valor);
        Imposto reduzido = new ImpostoReduzido(valor);
        ImpostoIsento isento = new ImpostoIsento(valor, motivo);

        Console.WriteLine(normal.Descrever());
        Console.WriteLine(reduzido.Descrever());
        Console.WriteLine(isento.Descrever());
        Console.WriteLine($"Motivo: {isento.Motivo}");
        Console.WriteLine($"Isento e reduzido: {isento is ImpostoReduzido}");
    }
}
`,
      solution: `using System;

class Imposto
{
    public decimal Base { get; }

    public Imposto(decimal valorBase)
    {
        Base = valorBase;
    }

    public virtual decimal Calcular()
    {
        return Base * 0.10m;
    }

    public string Descrever()
    {
        return $"{GetType().Name}: {Base:F2} -> {Calcular():F2}";
    }
}

class ImpostoReduzido : Imposto
{
    public ImpostoReduzido(decimal valorBase)
        : base(valorBase)
    {
    }

    public sealed override decimal Calcular()
    {
        return Base * 0.05m;
    }
}

sealed class ImpostoIsento : ImpostoReduzido
{
    public string Motivo { get; }

    public ImpostoIsento(decimal valorBase, string motivo)
        : base(valorBase)
    {
        Motivo = motivo;
    }
}

class Program
{
    static void Main()
    {
        decimal valor = decimal.Parse(Console.ReadLine());
        string motivo = Console.ReadLine();

        Imposto normal = new Imposto(valor);
        Imposto reduzido = new ImpostoReduzido(valor);
        ImpostoIsento isento = new ImpostoIsento(valor, motivo);

        Console.WriteLine(normal.Descrever());
        Console.WriteLine(reduzido.Descrever());
        Console.WriteLine(isento.Descrever());
        Console.WriteLine($"Motivo: {isento.Motivo}");
        Console.WriteLine($"Isento e reduzido: {isento is ImpostoReduzido}");
    }
}
`,
      hints: [
        'O `ImpostoIsento` herda o cálculo selado de `ImpostoReduzido` — ele não pode nem tentar sobrescrever.',
        '`GetType().Name` devolve o nome do tipo real do objeto, mesmo quando a variável é do tipo base.',
      ],
      tests: [
        {
          name: 'Base de mil',
          stdin: '1000\nEntidade sem fins lucrativos\n',
          expectedStdout:
            'Imposto: 1000.00 -> 100.00\nImpostoReduzido: 1000.00 -> 50.00\n' +
            'ImpostoIsento: 1000.00 -> 50.00\nMotivo: Entidade sem fins lucrativos\n' +
            'Isento e reduzido: True',
        },
        {
          name: 'Base zero',
          stdin: '0\nSem operacao\n',
          expectedStdout:
            'Imposto: 0.00 -> 0.00\nImpostoReduzido: 0.00 -> 0.00\n' +
            'ImpostoIsento: 0.00 -> 0.00\nMotivo: Sem operacao\nIsento e reduzido: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c03l08',
    title: 'Profundidade de hierarquia',
    objective: 'Reconhecer os custos de hierarquias profundas e preferir composição quando ela resolve melhor.',
    concept: [
      {
        kind: 'text',
        body:
          'Herança encadeia. Uma hierarquia de cinco níveis significa que entender a classe folha exige ler as cinco — e uma mudança na raiz afeta todas as descendentes de uma vez.',
      },
      {
        kind: 'table',
        headers: ['Profundidade', 'Consequência'],
        rows: [
          ['1 ou 2 níveis', 'saudável e comum'],
          ['3 a 4 níveis', 'começa a ficar difícil de rastrear'],
          ['5 ou mais', 'geralmente sinal de projeto errado'],
        ],
      },
      {
        kind: 'text',
        body:
          'O problema central é a **fragilidade**: a derivada depende dos detalhes internos da base. Uma mudança inocente na raiz pode quebrar comportamento em uma folha escrita meses depois.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Herança: é um',
          code: `class Gerente : Funcionario
{
    // gerente E UM funcionario
}`,
        },
        right: {
          label: 'Composição: tem um',
          code: `class Pedido
{
    private Cliente cliente;
    // pedido TEM UM cliente
}`,
        },
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A recomendação clássica é **preferir composição a herança**. Composição é mais flexível: um objeto pode conter vários outros, e trocar o que ele contém em tempo de execução — coisas que a herança não permite.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O sinal de alerta mais confiável: se a derivada precisa **desfazer** algo que a base faz, ou sobrescrever um método para não fazer nada, a herança está errada. A relação "é um" não estava lá.',
      },
      {
        kind: 'text',
        body:
          'Herança continua sendo a ferramenta certa quando existe uma hierarquia real de conceitos e as derivadas realmente podem substituir a base. O capítulo seguinte explora justamente isso.',
      },
    ],
    quiz: [
      {
        id: 's05c03l08q1',
        type: 'single',
        prompt: 'Qual é o problema central de hierarquias profundas?',
        options: [
          { id: 'a', text: 'A derivada depende dos detalhes internos da base, e mudanças se propagam.', correct: true },
          { id: 'b', text: 'O programa fica mais lento.' },
          { id: 'c', text: 'Usa mais memória.' },
          { id: 'd', text: 'O compilador tem limite de níveis.' },
        ],
        explanation:
          'É a fragilidade da classe base: uma mudança na raiz pode quebrar comportamento em qualquer descendente, sem aviso.',
      },
      {
        id: 's05c03l08q2',
        type: 'single',
        prompt: 'Qual é o sinal mais claro de que a herança está errada?',
        options: [
          { id: 'a', text: 'A derivada precisa desfazer ou anular algo que a base faz.', correct: true },
          { id: 'b', text: 'A derivada tem muitos campos.' },
          { id: 'c', text: 'A base tem métodos virtuais.' },
          { id: 'd', text: 'A hierarquia tem dois níveis.' },
        ],
        explanation:
          'Se a derivada não pode fazer tudo que a base promete, ela não "é uma" base. A relação certa provavelmente é composição.',
      },
      {
        id: 's05c03l08q3',
        type: 'single',
        prompt: 'Qual é a vantagem da composição sobre a herança?',
        options: [
          { id: 'a', text: 'Um objeto pode conter vários outros e trocá-los em tempo de execução.', correct: true },
          { id: 'b', text: 'É mais rápida.' },
          { id: 'c', text: 'Evita escrever construtores.' },
          { id: 'd', text: 'Permite herança múltipla.' },
        ],
        explanation:
          'A herança é fixada na compilação e limitada a uma base. A composição é flexível nos dois eixos.',
      },
    ],
    challenge: {
      brief:
        'Compare as duas abordagens resolvendo o mesmo problema: uma versão com herança de três níveis e outra com composição.',
      requirements: [
        'Na versão com herança: `Aparelho` tem `Nome` e `Ligado`, com `Ligar()` e `Status()`; `AparelhoComTimer` acrescenta `Minutos`; `AparelhoCompleto` acrescenta `Temperatura`',
        '`AparelhoCompleto.Status()` devolve `nome: ligado=B, timer=N, temp=T`',
        'Na versão com composição: `Dispositivo` tem `Nome`, `Ligado`, e dois campos opcionais `Timer` e `Termostato` (classes próprias, podendo ser `null`)',
        '`Timer` tem `Minutos`; `Termostato` tem `Temperatura`',
        '`Dispositivo.Status()` devolve `nome: ligado=B` e acrescenta `, timer=N` e `, temp=T` apenas quando o componente existe',
        'Os dois `Status()` do caso completo precisam produzir a mesma saída',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Versao com heranca: Aparelho, AparelhoComTimer, AparelhoCompleto

// Versao com composicao: Timer, Termostato, Dispositivo

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        int minutos = int.Parse(Console.ReadLine());
        int temperatura = int.Parse(Console.ReadLine());

        AparelhoCompleto heranca = new AparelhoCompleto(nome, minutos, temperatura);
        heranca.Ligar();

        Dispositivo composicao = new Dispositivo(nome);
        composicao.Ligar();
        composicao.Timer = new Timer(minutos);
        composicao.Termostato = new Termostato(temperatura);

        Dispositivo simples = new Dispositivo(nome);

        Console.WriteLine(heranca.Status());
        Console.WriteLine(composicao.Status());
        Console.WriteLine($"Iguais: {heranca.Status() == composicao.Status()}");
        Console.WriteLine(simples.Status());
    }
}
`,
      solution: `using System;

class Aparelho
{
    public string Nome { get; }
    public bool Ligado { get; private set; }

    public Aparelho(string nome)
    {
        Nome = nome;
    }

    public void Ligar()
    {
        Ligado = true;
    }

    public virtual string Status()
    {
        return $"{Nome}: ligado={Ligado}";
    }
}

class AparelhoComTimer : Aparelho
{
    public int Minutos { get; }

    public AparelhoComTimer(string nome, int minutos)
        : base(nome)
    {
        Minutos = minutos;
    }

    public override string Status()
    {
        return base.Status() + $", timer={Minutos}";
    }
}

class AparelhoCompleto : AparelhoComTimer
{
    public int Temperatura { get; }

    public AparelhoCompleto(string nome, int minutos, int temperatura)
        : base(nome, minutos)
    {
        Temperatura = temperatura;
    }

    public override string Status()
    {
        return base.Status() + $", temp={Temperatura}";
    }
}

class Timer
{
    public int Minutos { get; }

    public Timer(int minutos)
    {
        Minutos = minutos;
    }
}

class Termostato
{
    public int Temperatura { get; }

    public Termostato(int temperatura)
    {
        Temperatura = temperatura;
    }
}

class Dispositivo
{
    public string Nome { get; }
    public bool Ligado { get; private set; }
    public Timer Timer { get; set; }
    public Termostato Termostato { get; set; }

    public Dispositivo(string nome)
    {
        Nome = nome;
    }

    public void Ligar()
    {
        Ligado = true;
    }

    public string Status()
    {
        string texto = $"{Nome}: ligado={Ligado}";

        if (Timer != null)
        {
            texto += $", timer={Timer.Minutos}";
        }

        if (Termostato != null)
        {
            texto += $", temp={Termostato.Temperatura}";
        }

        return texto;
    }
}

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        int minutos = int.Parse(Console.ReadLine());
        int temperatura = int.Parse(Console.ReadLine());

        AparelhoCompleto heranca = new AparelhoCompleto(nome, minutos, temperatura);
        heranca.Ligar();

        Dispositivo composicao = new Dispositivo(nome);
        composicao.Ligar();
        composicao.Timer = new Timer(minutos);
        composicao.Termostato = new Termostato(temperatura);

        Dispositivo simples = new Dispositivo(nome);

        Console.WriteLine(heranca.Status());
        Console.WriteLine(composicao.Status());
        Console.WriteLine($"Iguais: {heranca.Status() == composicao.Status()}");
        Console.WriteLine(simples.Status());
    }
}
`,
      hints: [
        'Na versão com herança, cada `Status()` chama `base.Status()` e concatena o próprio trecho.',
        'Na composição, os componentes ausentes valem `null`, e o `Status()` só acrescenta o trecho quando eles existem.',
      ],
      tests: [
        {
          name: 'Aparelho completo',
          stdin: 'Forno\n30\n180\n',
          expectedStdout:
            'Forno: ligado=True, timer=30, temp=180\nForno: ligado=True, timer=30, temp=180\n' +
            'Iguais: True\nForno: ligado=False',
        },
        {
          name: 'Valores zerados',
          stdin: 'Ventilador\n0\n0\n',
          expectedStdout:
            'Ventilador: ligado=True, timer=0, temp=0\nVentilador: ligado=True, timer=0, temp=0\n' +
            'Iguais: True\nVentilador: ligado=False',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c03l09',
    title: 'Prática: hierarquia de funcionários',
    objective: 'Modelar uma folha de pagamento com regras diferentes por cargo, reaproveitando o cálculo comum.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma folha de pagamento é o exemplo clássico de herança bem aplicada: todos os cargos compartilham a estrutura de remuneração, e cada um tem sua própria regra de cálculo.',
      },
      {
        kind: 'table',
        headers: ['Cargo', 'Regra de remuneração'],
        rows: [
          ['horista', 'valor da hora × horas trabalhadas'],
          ['mensalista', 'salário fixo'],
          ['comissionado', 'salário base + percentual das vendas'],
        ],
      },
      {
        kind: 'text',
        body:
          'A parte comum — nome, matrícula, desconto de imposto, formatação da ficha — mora na base. Só o cálculo do bruto varia, e ele é o único método virtual.',
      },
      {
        kind: 'code',
        code: `public abstract class Base
{
    public virtual decimal Bruto() => 0m;

    public decimal Liquido() => Bruto() - Bruto() * 0.11m;   // regra comum
}`,
        caption: 'O líquido é calculado uma vez só, e funciona para qualquer cargo presente ou futuro.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare no ganho: acrescentar um cargo novo exige escrever uma classe com um método. Todo o resto — desconto, ficha, totalização — já funciona para ele sem nenhuma alteração.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Chamar `Bruto()` duas vezes na mesma expressão executa o cálculo duas vezes. Para cálculos baratos isso é irrelevante; para caros, guarde em uma variável local primeiro.',
      },
      {
        kind: 'text',
        body:
          'Este é o desenho que o próximo capítulo formaliza: a base define **o que** todo funcionário faz, e as derivadas definem **como**.',
      },
    ],
    quiz: [
      {
        id: 's05c03l09q1',
        type: 'single',
        prompt: 'Qual método deve ser virtual nesta hierarquia?',
        options: [
          { id: 'a', text: 'Apenas o cálculo do bruto, que varia por cargo.', correct: true },
          { id: 'b', text: 'Todos os métodos.' },
          { id: 'c', text: 'Apenas a ficha.' },
          { id: 'd', text: 'Nenhum.' },
        ],
        explanation:
          'O que é comum a todos os cargos não precisa ser substituível. Tornar tudo virtual convida derivadas a quebrar regras que deveriam ser universais.',
      },
      {
        id: 's05c03l09q2',
        type: 'single',
        prompt: 'O que é preciso para acrescentar um cargo novo?',
        options: [
          { id: 'a', text: 'Uma classe derivada com o cálculo do bruto.', correct: true },
          { id: 'b', text: 'Alterar a classe base.' },
          { id: 'c', text: 'Alterar todos os cargos existentes.' },
          { id: 'd', text: 'Reescrever o cálculo do líquido.' },
        ],
        explanation:
          'É o ganho da hierarquia: o código que usa funcionários não muda, e as regras comuns são herdadas automaticamente.',
      },
      {
        id: 's05c03l09q3',
        type: 'single',
        prompt: 'Por que guardar `Bruto()` em uma variável antes de usá-lo duas vezes?',
        options: [
          { id: 'a', text: 'Para não executar o cálculo duas vezes.', correct: true },
          { id: 'b', text: 'Porque o valor muda entre chamadas.' },
          { id: 'c', text: 'Porque métodos virtuais só podem ser chamados uma vez.' },
          { id: 'd', text: 'Não é necessário em nenhum caso.' },
        ],
        explanation:
          'É a mesma consideração das propriedades calculadas: cada chamada refaz o trabalho. Para cálculos baratos, a clareza vence.',
      },
    ],
    challenge: {
      brief:
        'Modele uma folha de pagamento com três tipos de funcionário, cada um com sua regra de remuneração e todos compartilhando o desconto.',
      requirements: [
        '`Funcionario` recebe matrícula (`int`) e nome, com `Bruto()` virtual devolvendo `0`',
        '`Funcionario.Desconto()` devolve 11% do bruto',
        '`Funcionario.Liquido()` devolve bruto menos desconto',
        '`Funcionario.Ficha()` devolve `#matricula nome (tipo): bruto - desconto = liquido`, com o nome do tipo real e três casas de valores em duas decimais',
        '`Horista` recebe valor da hora e horas trabalhadas',
        '`Mensalista` recebe salário fixo',
        '`Comissionado` recebe salário base, total de vendas e percentual de comissão',
        'Use `GetType().Name` para o tipo na ficha',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare Funcionario, Horista, Mensalista e Comissionado aqui

class Program
{
    static void Main()
    {
        decimal hora = decimal.Parse(Console.ReadLine());
        int horas = int.Parse(Console.ReadLine());
        decimal mensal = decimal.Parse(Console.ReadLine());
        decimal salarioBase = decimal.Parse(Console.ReadLine());
        decimal vendas = decimal.Parse(Console.ReadLine());
        decimal percentual = decimal.Parse(Console.ReadLine());

        List<Funcionario> folha = new List<Funcionario>
        {
            new Horista(1, "Ana", hora, horas),
            new Mensalista(2, "Bruno", mensal),
            new Comissionado(3, "Carla", salarioBase, vendas, percentual)
        };

        decimal totalBruto = 0m;
        decimal totalLiquido = 0m;

        foreach (Funcionario f in folha)
        {
            Console.WriteLine(f.Ficha());
            totalBruto += f.Bruto();
            totalLiquido += f.Liquido();
        }

        Console.WriteLine($"Total bruto: {totalBruto:F2}");
        Console.WriteLine($"Total liquido: {totalLiquido:F2}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Funcionario
{
    public int Matricula { get; }
    public string Nome { get; }

    public Funcionario(int matricula, string nome)
    {
        Matricula = matricula;
        Nome = nome;
    }

    public virtual decimal Bruto()
    {
        return 0m;
    }

    public decimal Desconto()
    {
        return Bruto() * 0.11m;
    }

    public decimal Liquido()
    {
        return Bruto() - Desconto();
    }

    public string Ficha()
    {
        return $"#{Matricula} {Nome} ({GetType().Name}): {Bruto():F2} - {Desconto():F2} = {Liquido():F2}";
    }
}

class Horista : Funcionario
{
    public decimal ValorHora { get; }
    public int Horas { get; }

    public Horista(int matricula, string nome, decimal valorHora, int horas)
        : base(matricula, nome)
    {
        ValorHora = valorHora;
        Horas = horas;
    }

    public override decimal Bruto()
    {
        return ValorHora * Horas;
    }
}

class Mensalista : Funcionario
{
    public decimal Salario { get; }

    public Mensalista(int matricula, string nome, decimal salario)
        : base(matricula, nome)
    {
        Salario = salario;
    }

    public override decimal Bruto()
    {
        return Salario;
    }
}

class Comissionado : Funcionario
{
    public decimal SalarioBase { get; }
    public decimal Vendas { get; }
    public decimal Percentual { get; }

    public Comissionado(int matricula, string nome, decimal salarioBase, decimal vendas, decimal percentual)
        : base(matricula, nome)
    {
        SalarioBase = salarioBase;
        Vendas = vendas;
        Percentual = percentual;
    }

    public override decimal Bruto()
    {
        return SalarioBase + Vendas * Percentual / 100m;
    }
}

class Program
{
    static void Main()
    {
        decimal hora = decimal.Parse(Console.ReadLine());
        int horas = int.Parse(Console.ReadLine());
        decimal mensal = decimal.Parse(Console.ReadLine());
        decimal salarioBase = decimal.Parse(Console.ReadLine());
        decimal vendas = decimal.Parse(Console.ReadLine());
        decimal percentual = decimal.Parse(Console.ReadLine());

        List<Funcionario> folha = new List<Funcionario>
        {
            new Horista(1, "Ana", hora, horas),
            new Mensalista(2, "Bruno", mensal),
            new Comissionado(3, "Carla", salarioBase, vendas, percentual)
        };

        decimal totalBruto = 0m;
        decimal totalLiquido = 0m;

        foreach (Funcionario f in folha)
        {
            Console.WriteLine(f.Ficha());
            totalBruto += f.Bruto();
            totalLiquido += f.Liquido();
        }

        Console.WriteLine($"Total bruto: {totalBruto:F2}");
        Console.WriteLine($"Total liquido: {totalLiquido:F2}");
    }
}
`,
      hints: [
        'Só o `Bruto()` é virtual — `Desconto()`, `Liquido()` e `Ficha()` são comuns a todos e ficam na base.',
        'A comissão é `Vendas * Percentual / 100m`, somada ao salário base.',
      ],
      tests: [
        {
          name: 'Três cargos',
          stdin: '50\n160\n5000\n2000\n30000\n3\n',
          expectedStdout:
            '#1 Ana (Horista): 8000.00 - 880.00 = 7120.00\n#2 Bruno (Mensalista): 5000.00 - 550.00 = 4450.00\n' +
            '#3 Carla (Comissionado): 2900.00 - 319.00 = 2581.00\n' +
            'Total bruto: 15900.00\nTotal liquido: 14151.00',
        },
        {
          name: 'Sem horas e sem vendas',
          stdin: '100\n0\n1000\n1500\n0\n5\n',
          expectedStdout:
            '#1 Ana (Horista): 0.00 - 0.00 = 0.00\n#2 Bruno (Mensalista): 1000.00 - 110.00 = 890.00\n' +
            '#3 Carla (Comissionado): 1500.00 - 165.00 = 1335.00\n' +
            'Total bruto: 2500.00\nTotal liquido: 2225.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c03l10',
    title: 'Checkpoint: herança',
    objective: 'Projetar uma hierarquia com nível intermediário, decidindo o que fica em cada camada.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint pede uma hierarquia de três níveis com uma decisão de projeto real: o que pertence à raiz, o que pertence ao nível intermediário, e o que é específico de cada folha.',
      },
      {
        kind: 'table',
        headers: ['Camada', 'Contém'],
        rows: [
          ['raiz', 'o que **todos** compartilham'],
          ['intermediária', 'o que um subgrupo compartilha'],
          ['folhas', 'o que é específico de cada um'],
        ],
      },
      {
        kind: 'text',
        body:
          'A regra para decidir: um membro sobe para a camada mais alta em que ele faz sentido para **todos** os descendentes. Se um irmão não precisa dele, ele está alto demais.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O nível intermediário se justifica quando existe um subgrupo com dados ou comportamento próprios. Sem esse subgrupo real, ele vira uma camada de indireção sem conteúdo — e a hierarquia fica mais profunda sem ganhar nada.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Cuidado com métodos virtuais em excesso. Cada `virtual` é uma promessa de que aquele comportamento pode mudar nas derivadas, e mais promessas significam menos garantias sobre o que a base realmente faz.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Escreva a hierarquia em português antes de codar: "todo item de acervo tem título e código; livros e revistas são impressos e têm páginas; e-books têm tamanho em MB". As camadas aparecem sozinhas.',
      },
    ],
    quiz: [
      {
        id: 's05c03l10q1',
        type: 'single',
        prompt: 'Em qual camada um membro deve ficar?',
        options: [
          { id: 'a', text: 'Na mais alta em que ele faz sentido para todos os descendentes.', correct: true },
          { id: 'b', text: 'Sempre na raiz.' },
          { id: 'c', text: 'Sempre nas folhas.' },
          { id: 'd', text: 'Na camada com menos membros.' },
        ],
        explanation:
          'Subir demais obriga descendentes a carregar o que não usam. Descer demais duplica o mesmo membro em vários irmãos.',
      },
      {
        id: 's05c03l10q2',
        type: 'single',
        prompt: 'Quando um nível intermediário se justifica?',
        options: [
          { id: 'a', text: 'Quando existe um subgrupo real com dados ou comportamento próprios.', correct: true },
          { id: 'b', text: 'Sempre que houver mais de duas folhas.' },
          { id: 'c', text: 'Para deixar a hierarquia mais organizada visualmente.' },
          { id: 'd', text: 'Nunca.' },
        ],
        explanation:
          'Uma camada sem conteúdo próprio só acrescenta um nível a percorrer quando alguém tenta entender a folha.',
      },
      {
        id: 's05c03l10q3',
        type: 'single',
        prompt: 'Qual é o risco de marcar muitos métodos como `virtual`?',
        options: [
          { id: 'a', text: 'Cada um é uma promessa de que o comportamento pode mudar, reduzindo as garantias da base.', correct: true },
          { id: 'b', text: 'O programa fica mais lento.' },
          { id: 'c', text: 'A hierarquia não compila.' },
          { id: 'd', text: 'Não há risco.' },
        ],
        explanation:
          'Se qualquer coisa pode ser substituída, nada na base é garantido. Marcar como virtual só o que realmente varia mantém o contrato firme.',
      },
    ],
    challenge: {
      brief:
        'Projete o acervo de uma biblioteca com três níveis: itens em geral, itens impressos, e os tipos concretos de cada categoria.',
      requirements: [
        '`ItemAcervo` recebe código (`int`) e título; tem `DiasEmprestimo()` virtual devolvendo `7` e `Descrever()` devolvendo `#codigo titulo (tipo, N dias)` com o tipo real',
        '`Impresso` herda de `ItemAcervo` e acrescenta `Paginas` (`int`)',
        '`Impresso.Descrever()` acrescenta ` - N paginas` ao final',
        '`Livro` herda de `Impresso` e devolve `14` dias de empréstimo',
        '`Revista` herda de `Impresso` e devolve `3` dias',
        '`Ebook` herda de `ItemAcervo`, acrescenta `TamanhoMb` (`int`) e devolve `30` dias',
        '`Ebook.Descrever()` acrescenta ` - N MB` ao final',
        'Cada `Descrever()` precisa **reaproveitar** a versão da base, sem repetir o texto',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare ItemAcervo, Impresso, Livro, Revista e Ebook aqui

class Program
{
    static void Main()
    {
        int paginasLivro = int.Parse(Console.ReadLine());
        int paginasRevista = int.Parse(Console.ReadLine());
        int tamanho = int.Parse(Console.ReadLine());

        List<ItemAcervo> acervo = new List<ItemAcervo>
        {
            new Livro(1, "Dom Casmurro", paginasLivro),
            new Revista(2, "Ciencia Hoje", paginasRevista),
            new Ebook(3, "C# Moderno", tamanho)
        };

        int totalDias = 0;

        foreach (ItemAcervo item in acervo)
        {
            Console.WriteLine(item.Descrever());
            totalDias += item.DiasEmprestimo();
        }

        Console.WriteLine($"Itens: {acervo.Count}");
        Console.WriteLine($"Total de dias: {totalDias}");
        Console.WriteLine($"Livro e impresso: {acervo[0] is Impresso}");
        Console.WriteLine($"Ebook e impresso: {acervo[2] is Impresso}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class ItemAcervo
{
    public int Codigo { get; }
    public string Titulo { get; }

    public ItemAcervo(int codigo, string titulo)
    {
        Codigo = codigo;
        Titulo = titulo;
    }

    public virtual int DiasEmprestimo()
    {
        return 7;
    }

    public virtual string Descrever()
    {
        return $"#{Codigo} {Titulo} ({GetType().Name}, {DiasEmprestimo()} dias)";
    }
}

class Impresso : ItemAcervo
{
    public int Paginas { get; }

    public Impresso(int codigo, string titulo, int paginas)
        : base(codigo, titulo)
    {
        Paginas = paginas;
    }

    public override string Descrever()
    {
        return base.Descrever() + $" - {Paginas} paginas";
    }
}

class Livro : Impresso
{
    public Livro(int codigo, string titulo, int paginas)
        : base(codigo, titulo, paginas)
    {
    }

    public override int DiasEmprestimo()
    {
        return 14;
    }
}

class Revista : Impresso
{
    public Revista(int codigo, string titulo, int paginas)
        : base(codigo, titulo, paginas)
    {
    }

    public override int DiasEmprestimo()
    {
        return 3;
    }
}

class Ebook : ItemAcervo
{
    public int TamanhoMb { get; }

    public Ebook(int codigo, string titulo, int tamanhoMb)
        : base(codigo, titulo)
    {
        TamanhoMb = tamanhoMb;
    }

    public override int DiasEmprestimo()
    {
        return 30;
    }

    public override string Descrever()
    {
        return base.Descrever() + $" - {TamanhoMb} MB";
    }
}

class Program
{
    static void Main()
    {
        int paginasLivro = int.Parse(Console.ReadLine());
        int paginasRevista = int.Parse(Console.ReadLine());
        int tamanho = int.Parse(Console.ReadLine());

        List<ItemAcervo> acervo = new List<ItemAcervo>
        {
            new Livro(1, "Dom Casmurro", paginasLivro),
            new Revista(2, "Ciencia Hoje", paginasRevista),
            new Ebook(3, "C# Moderno", tamanho)
        };

        int totalDias = 0;

        foreach (ItemAcervo item in acervo)
        {
            Console.WriteLine(item.Descrever());
            totalDias += item.DiasEmprestimo();
        }

        Console.WriteLine($"Itens: {acervo.Count}");
        Console.WriteLine($"Total de dias: {totalDias}");
        Console.WriteLine($"Livro e impresso: {acervo[0] is Impresso}");
        Console.WriteLine($"Ebook e impresso: {acervo[2] is Impresso}");
    }
}
`,
      hints: [
        '`Impresso` não sobrescreve `DiasEmprestimo()` — ele não tem uma regra própria, só o campo de páginas.',
        'O `Descrever()` da base já chama `DiasEmprestimo()`, então cada folha aparece com o próprio prazo automaticamente.',
      ],
      tests: [
        {
          name: 'Acervo completo',
          stdin: '256\n80\n5\n',
          expectedStdout:
            '#1 Dom Casmurro (Livro, 14 dias) - 256 paginas\n#2 Ciencia Hoje (Revista, 3 dias) - 80 paginas\n' +
            '#3 C# Moderno (Ebook, 30 dias) - 5 MB\n' +
            'Itens: 3\nTotal de dias: 47\nLivro e impresso: True\nEbook e impresso: False',
        },
        {
          name: 'Valores zerados',
          stdin: '0\n0\n0\n',
          expectedStdout:
            '#1 Dom Casmurro (Livro, 14 dias) - 0 paginas\n#2 Ciencia Hoje (Revista, 3 dias) - 0 paginas\n' +
            '#3 C# Moderno (Ebook, 30 dias) - 0 MB\n' +
            'Itens: 3\nTotal de dias: 47\nLivro e impresso: True\nEbook e impresso: False',
          hidden: true,
        },
      ],
    },
  },
]
