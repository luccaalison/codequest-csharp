import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's05c04l01',
    title: 'Referência do tipo base',
    objective: 'Guardar objetos de tipos derivados em variáveis do tipo base, e entender o que isso permite e o que restringe.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma variável do tipo base pode apontar para um objeto de qualquer tipo derivado. Isso não é um truque — é a consequência direta da relação "é um": todo `Gerente` **é um** `Funcionario`.',
      },
      {
        kind: 'code',
        code: `Funcionario f = new Gerente("Ana", 8000m, 5);   // permitido

f.Nome;        // ok: todo Funcionario tem Nome
f.Equipe;      // NAO compila: nem todo Funcionario tem Equipe`,
        caption: 'A variável decide **o que pode ser chamado**; o objeto decide **como responde**.',
      },
      {
        kind: 'text',
        body:
          'Essa é a distinção central da seção. O tipo da variável limita o vocabulário disponível; o tipo real do objeto escolhe a implementação de cada método virtual.',
      },
      {
        kind: 'table',
        headers: ['Pergunta', 'Quem responde'],
        rows: [
          ['quais membros posso chamar?', 'o tipo da **variável**'],
          ['qual implementação executa?', 'o tipo do **objeto**'],
          ['o que `GetType()` devolve?', 'o tipo do **objeto**'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O ganho aparece em coleções: uma `List<Funcionario>` guarda gerentes, vendedores e diretores juntos, e o código que a percorre não precisa saber quais tipos existem.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A conversão para cima é automática e sempre segura. A conversão de volta — de `Funcionario` para `Gerente` — precisa ser explícita e pode falhar, porque nem todo funcionário é gerente.',
      },
      {
        kind: 'text',
        body:
          'Escrever código que opera sobre o tipo base é o que torna um programa extensível: acrescentar um cargo novo não exige tocar em nada que já funciona.',
      },
    ],
    quiz: [
      {
        id: 's05c04l01q1',
        type: 'single',
        prompt: 'O que determina quais membros podem ser chamados?',
        options: [
          { id: 'a', text: 'O tipo declarado da variável.', correct: true },
          { id: 'b', text: 'O tipo real do objeto.' },
          { id: 'c', text: 'Os dois, na interseção.' },
          { id: 'd', text: 'A ordem de declaração das classes.' },
        ],
        explanation:
          'O compilador só conhece o tipo declarado. Membros exclusivos da derivada exigem uma variável daquele tipo, ou uma conversão explícita.',
      },
      {
        id: 's05c04l01q2',
        type: 'single',
        prompt: 'Por que `Funcionario f = new Gerente(...)` é permitido?',
        options: [
          { id: 'a', text: 'Porque todo gerente é um funcionário.', correct: true },
          { id: 'b', text: 'Porque os construtores são compatíveis.' },
          { id: 'c', text: 'Porque `Gerente` é `sealed`.' },
          { id: 'd', text: 'Porque a conversão é feita em execução.' },
        ],
        explanation:
          'A relação de herança garante que o objeto tem todos os membros que a variável promete. É por isso que a conversão para cima nunca falha.',
      },
      {
        id: 's05c04l01q3',
        type: 'single',
        prompt: 'Qual é o ganho prático de escrever código sobre o tipo base?',
        options: [
          { id: 'a', text: 'Acrescentar um tipo novo não exige alterar o código existente.', correct: true },
          { id: 'b', text: 'O programa fica mais rápido.' },
          { id: 'c', text: 'Reduz o número de classes.' },
          { id: 'd', text: 'Elimina a necessidade de construtores.' },
        ],
        explanation:
          'O código depende do contrato da base, não dos tipos concretos. Um cargo novo entra na coleção e funciona sem nenhuma alteração.',
      },
    ],
    challenge: {
      brief:
        'Guarde objetos de tipos diferentes em variáveis do tipo base e observe o que fica acessível. O `Main` já demonstra os dois lados.',
      requirements: [
        '`Midia` recebe título e tem `Duracao()` virtual devolvendo `0`, e `Resumo()` devolvendo `titulo (N min)`',
        '`Musica` herda de `Midia`, recebe título e minutos, e devolve os minutos em `Duracao()`',
        '`Filme` herda de `Midia`, recebe título, minutos e diretor, devolve os minutos, e acrescenta a propriedade `Diretor`',
        'O `Main` guarda um filme em uma variável `Midia` e mostra que `Resumo()` funciona mas `Diretor` só é acessível pela variável do tipo certo',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare Midia, Musica e Filme aqui

class Program
{
    static void Main()
    {
        string tituloMusica = Console.ReadLine();
        int minutosMusica = int.Parse(Console.ReadLine());
        string tituloFilme = Console.ReadLine();
        int minutosFilme = int.Parse(Console.ReadLine());
        string diretor = Console.ReadLine();

        Midia m = new Musica(tituloMusica, minutosMusica);
        Filme f = new Filme(tituloFilme, minutosFilme, diretor);
        Midia comoMidia = f;

        Console.WriteLine(m.Resumo());
        Console.WriteLine(f.Resumo());
        Console.WriteLine(comoMidia.Resumo());
        Console.WriteLine($"Diretor pela variavel Filme: {f.Diretor}");
        Console.WriteLine($"Tipo real da variavel Midia: {comoMidia.GetType().Name}");
        Console.WriteLine($"Duracao total: {m.Duracao() + comoMidia.Duracao()} min");
    }
}
`,
      solution: `using System;

class Midia
{
    public string Titulo { get; }

    public Midia(string titulo)
    {
        Titulo = titulo;
    }

    public virtual int Duracao()
    {
        return 0;
    }

    public string Resumo()
    {
        return $"{Titulo} ({Duracao()} min)";
    }
}

class Musica : Midia
{
    public int Minutos { get; }

    public Musica(string titulo, int minutos)
        : base(titulo)
    {
        Minutos = minutos;
    }

    public override int Duracao()
    {
        return Minutos;
    }
}

class Filme : Midia
{
    public int Minutos { get; }
    public string Diretor { get; }

    public Filme(string titulo, int minutos, string diretor)
        : base(titulo)
    {
        Minutos = minutos;
        Diretor = diretor;
    }

    public override int Duracao()
    {
        return Minutos;
    }
}

class Program
{
    static void Main()
    {
        string tituloMusica = Console.ReadLine();
        int minutosMusica = int.Parse(Console.ReadLine());
        string tituloFilme = Console.ReadLine();
        int minutosFilme = int.Parse(Console.ReadLine());
        string diretor = Console.ReadLine();

        Midia m = new Musica(tituloMusica, minutosMusica);
        Filme f = new Filme(tituloFilme, minutosFilme, diretor);
        Midia comoMidia = f;

        Console.WriteLine(m.Resumo());
        Console.WriteLine(f.Resumo());
        Console.WriteLine(comoMidia.Resumo());
        Console.WriteLine($"Diretor pela variavel Filme: {f.Diretor}");
        Console.WriteLine($"Tipo real da variavel Midia: {comoMidia.GetType().Name}");
        Console.WriteLine($"Duracao total: {m.Duracao() + comoMidia.Duracao()} min");
    }
}
`,
      hints: [
        '`Resumo()` fica na base e não precisa ser virtual: ele chama `Duracao()`, que já resolve para a versão certa.',
        'A variável `comoMidia` aponta para o mesmo filme, mas só enxerga os membros de `Midia`.',
      ],
      tests: [
        {
          name: 'Música e filme',
          stdin: 'Bohemian\n6\nMatrix\n136\nWachowski\n',
          expectedStdout:
            'Bohemian (6 min)\nMatrix (136 min)\nMatrix (136 min)\n' +
            'Diretor pela variavel Filme: Wachowski\nTipo real da variavel Midia: Filme\n' +
            'Duracao total: 142 min',
        },
        {
          name: 'Duracoes curtas',
          stdin: 'Jingle\n1\nCurta\n5\nAutor\n',
          expectedStdout:
            'Jingle (1 min)\nCurta (5 min)\nCurta (5 min)\n' +
            'Diretor pela variavel Filme: Autor\nTipo real da variavel Midia: Filme\n' +
            'Duracao total: 6 min',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c04l02',
    title: 'Despacho virtual',
    objective: 'Entender o mecanismo que escolhe a implementação em tempo de execução, e o que ele torna possível.',
    concept: [
      {
        kind: 'text',
        body:
          'O **despacho virtual** é o mecanismo por trás de tudo neste capítulo: quando um método `virtual` é chamado, a implementação escolhida vem do tipo **real** do objeto, decidido durante a execução.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Resolvido na compilação',
          code: `// sobrecarga: pelos tipos
// dos argumentos
Descrever(5);
Descrever("texto");`,
        },
        right: {
          label: 'Resolvido na execução',
          code: `// despacho virtual: pelo
// tipo real do objeto
foreach (Forma f in formas)
    f.Area();`,
        },
      },
      {
        kind: 'text',
        body:
          'A consequência prática é que o mesmo código produz comportamentos diferentes conforme o objeto — sem nenhum `if` sobre tipos.',
      },
      {
        kind: 'code',
        code: `foreach (Funcionario f in folha)
{
    total += f.Bonus();     // cada objeto usa a SUA regra
}`,
        caption: 'Um laço, várias regras de bônus, e nenhuma condição sobre o tipo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Compare com a alternativa: uma cadeia de `if (f is Gerente) ... else if (f is Vendedor) ...`. Cada cargo novo exigiria voltar ao laço e acrescentar um ramo. Com despacho virtual, o laço nunca muda.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O despacho virtual funciona a partir do momento em que o construtor da classe **daquele nível** termina. Chamar um método virtual dentro de um construtor pode executar a versão da derivada antes de os campos dela estarem inicializados — uma armadilha clássica.',
      },
      {
        kind: 'text',
        body:
          'Esse mecanismo tem um custo mínimo: uma indireção a mais na chamada. Em troca, ele é a base de praticamente toda arquitetura extensível em linguagens orientadas a objetos.',
      },
    ],
    quiz: [
      {
        id: 's05c04l02q1',
        type: 'single',
        prompt: 'Quando o despacho virtual escolhe a implementação?',
        options: [
          { id: 'a', text: 'Em tempo de execução, pelo tipo real do objeto.', correct: true },
          { id: 'b', text: 'Em tempo de compilação, pelo tipo da variável.' },
          { id: 'c', text: 'Na criação do objeto.' },
          { id: 'd', text: 'Depende do modificador de acesso.' },
        ],
        explanation:
          'É o que distingue o despacho virtual da sobrecarga, que é resolvida pelo compilador a partir dos tipos dos argumentos.',
      },
      {
        id: 's05c04l02q2',
        type: 'single',
        prompt: 'Qual é a alternativa ao despacho virtual, e por que ela é pior?',
        options: [
          { id: 'a', text: 'Uma cadeia de `if` por tipo, que precisa ser alterada a cada tipo novo.', correct: true },
          { id: 'b', text: 'Sobrecarga de métodos, que é mais lenta.' },
          { id: 'c', text: 'Não há alternativa.' },
          { id: 'd', text: 'Usar `static`, que não funciona com herança.' },
        ],
        explanation:
          'A cadeia de `if` centraliza o conhecimento de todos os tipos em um lugar, que passa a ser editado toda vez que a hierarquia cresce.',
      },
      {
        id: 's05c04l02q3',
        type: 'single',
        prompt: 'Por que evitar chamar métodos virtuais dentro de construtores?',
        options: [
          { id: 'a', text: 'Porque a versão da derivada pode executar antes de os campos dela estarem prontos.', correct: true },
          { id: 'b', text: 'Porque não compila.' },
          { id: 'c', text: 'Porque o despacho virtual não funciona em construtores.' },
          { id: 'd', text: 'Porque torna a criação mais lenta.' },
        ],
        explanation:
          'O construtor da base roda primeiro, mas o despacho já aponta para a derivada. O método sobrescrito acessaria campos ainda não inicializados.',
      },
    ],
    challenge: {
      brief:
        'Compare as duas abordagens: um cálculo com despacho virtual e outro com cadeia de `if` por tipo, mostrando que produzem o mesmo resultado.',
      requirements: [
        '`Notificacao` recebe destinatário e tem `Custo()` virtual devolvendo `0`',
        '`Sms` custa `0.25` por envio; `Email` custa `0.01`; `Push` custa `0`',
        'O `Main` calcula o total de duas formas: por despacho virtual e por cadeia de `if`',
        'A cadeia de `if` precisa usar `is` para identificar cada tipo',
        'Os dois totais precisam ser idênticos',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare Notificacao, Sms, Email e Push aqui

class Program
{
    static void Main()
    {
        int sms = int.Parse(Console.ReadLine());
        int emails = int.Parse(Console.ReadLine());
        int push = int.Parse(Console.ReadLine());

        List<Notificacao> fila = new List<Notificacao>();

        for (int i = 0; i < sms; i++) fila.Add(new Sms("destino"));
        for (int i = 0; i < emails; i++) fila.Add(new Email("destino"));
        for (int i = 0; i < push; i++) fila.Add(new Push("destino"));

        decimal totalVirtual = 0m;
        foreach (Notificacao n in fila)
        {
            totalVirtual += n.Custo();
        }

        decimal totalIf = 0m;
        foreach (Notificacao n in fila)
        {
            if (n is Sms) totalIf += 0.25m;
            else if (n is Email) totalIf += 0.01m;
            else if (n is Push) totalIf += 0m;
        }

        Console.WriteLine($"Fila: {fila.Count}");
        Console.WriteLine($"Total por despacho virtual: {totalVirtual:F2}");
        Console.WriteLine($"Total por cadeia de if: {totalIf:F2}");
        Console.WriteLine($"Iguais: {totalVirtual == totalIf}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Notificacao
{
    public string Destinatario { get; }

    public Notificacao(string destinatario)
    {
        Destinatario = destinatario;
    }

    public virtual decimal Custo()
    {
        return 0m;
    }
}

class Sms : Notificacao
{
    public Sms(string destinatario)
        : base(destinatario)
    {
    }

    public override decimal Custo()
    {
        return 0.25m;
    }
}

class Email : Notificacao
{
    public Email(string destinatario)
        : base(destinatario)
    {
    }

    public override decimal Custo()
    {
        return 0.01m;
    }
}

class Push : Notificacao
{
    public Push(string destinatario)
        : base(destinatario)
    {
    }

    public override decimal Custo()
    {
        return 0m;
    }
}

class Program
{
    static void Main()
    {
        int sms = int.Parse(Console.ReadLine());
        int emails = int.Parse(Console.ReadLine());
        int push = int.Parse(Console.ReadLine());

        List<Notificacao> fila = new List<Notificacao>();

        for (int i = 0; i < sms; i++) fila.Add(new Sms("destino"));
        for (int i = 0; i < emails; i++) fila.Add(new Email("destino"));
        for (int i = 0; i < push; i++) fila.Add(new Push("destino"));

        decimal totalVirtual = 0m;
        foreach (Notificacao n in fila)
        {
            totalVirtual += n.Custo();
        }

        decimal totalIf = 0m;
        foreach (Notificacao n in fila)
        {
            if (n is Sms) totalIf += 0.25m;
            else if (n is Email) totalIf += 0.01m;
            else if (n is Push) totalIf += 0m;
        }

        Console.WriteLine($"Fila: {fila.Count}");
        Console.WriteLine($"Total por despacho virtual: {totalVirtual:F2}");
        Console.WriteLine($"Total por cadeia de if: {totalIf:F2}");
        Console.WriteLine($"Iguais: {totalVirtual == totalIf}");
    }
}
`,
      hints: [
        'Cada tipo sobrescreve apenas `Custo()` — o resto vem da base.',
        'A cadeia de `if` já está pronta no `Main`: ela existe para contrastar com o laço virtual logo acima.',
      ],
      tests: [
        {
          name: 'Fila mista',
          stdin: '4\n10\n5\n',
          expectedStdout:
            'Fila: 19\nTotal por despacho virtual: 1.10\nTotal por cadeia de if: 1.10\nIguais: True',
        },
        {
          name: 'Fila vazia',
          stdin: '0\n0\n0\n',
          expectedStdout:
            'Fila: 0\nTotal por despacho virtual: 0.00\nTotal por cadeia de if: 0.00\nIguais: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c04l03',
    title: 'Classes abstratas',
    objective: 'Criar uma base que define um contrato mas não pode ser instanciada por si só.',
    concept: [
      {
        kind: 'text',
        body:
          'Algumas classes existem apenas para serem herdadas. Uma **classe abstrata** declara isso explicitamente: ela pode ter código e estado, mas não pode ser instanciada diretamente.',
      },
      {
        kind: 'code',
        code: `abstract class Forma
{
    public string Nome { get; }

    protected Forma(string nome)     // construtor, mas so para derivadas
    {
        Nome = nome;
    }

    public virtual double Area() => 0;
}

Forma f = new Forma("x");     // NAO compila
Forma c = new Circulo(2);     // ok`,
        caption: 'A classe abstrata tem construtor, campos e métodos — só não vira objeto sozinha.',
      },
      {
        kind: 'text',
        body:
          'A pergunta que decide: "faz sentido existir um objeto que é **apenas** isso?". Uma `Forma` genérica, sem ser círculo nem quadrado, não faz sentido — então ela é abstrata.',
      },
      {
        kind: 'table',
        headers: ['Classe', 'Abstrata?', 'Por quê'],
        rows: [
          ['`Forma`', 'sim', 'nenhuma forma é "só uma forma"'],
          ['`Funcionario`', 'depende', 'existe funcionário sem cargo específico?'],
          ['`Circulo`', 'não', 'é um objeto concreto'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Tornar a base abstrata elimina uma categoria inteira de erro: ninguém consegue criar acidentalmente um objeto genérico e incompleto. O compilador cobra a escolha de um tipo concreto.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O construtor de uma classe abstrata costuma ser `protected`, já que só as derivadas o chamam. Declará-lo `public` não é erro, mas comunica algo que não é verdade.',
      },
      {
        kind: 'text',
        body:
          'Uma classe abstrata ainda pode ter métodos completos, e as derivadas os herdam normalmente. O que ela ganha é a capacidade de exigir implementações — assunto da próxima lição.',
      },
    ],
    quiz: [
      {
        id: 's05c04l03q1',
        type: 'single',
        prompt: 'O que uma classe abstrata não permite?',
        options: [
          { id: 'a', text: 'Ser instanciada diretamente com `new`.', correct: true },
          { id: 'b', text: 'Ter construtor.' },
          { id: 'c', text: 'Ter métodos com corpo.' },
          { id: 'd', text: 'Ter campos.' },
        ],
        explanation:
          'Ela pode ter tudo que uma classe normal tem. A única restrição é que o objeto criado precisa ser de um tipo derivado concreto.',
      },
      {
        id: 's05c04l03q2',
        type: 'single',
        prompt: 'Qual pergunta decide se uma classe deve ser abstrata?',
        options: [
          { id: 'a', text: 'Faz sentido existir um objeto que seja apenas isso?', correct: true },
          { id: 'b', text: 'A classe tem mais de três métodos?' },
          { id: 'c', text: 'A classe tem métodos virtuais?' },
          { id: 'd', text: 'A classe tem mais de uma derivada?' },
        ],
        explanation:
          'Se a resposta é não — como em uma `Forma` que não é círculo nem quadrado —, a classe existe apenas como contrato e deve ser abstrata.',
      },
      {
        id: 's05c04l03q3',
        type: 'single',
        prompt: 'Por que o construtor de uma classe abstrata costuma ser `protected`?',
        options: [
          { id: 'a', text: 'Porque só as classes derivadas o chamam.', correct: true },
          { id: 'b', text: 'Porque `public` não compila.' },
          { id: 'c', text: 'Para impedir herança.' },
          { id: 'd', text: 'Para permitir instanciação.' },
        ],
        explanation:
          'Ninguém de fora pode criar a classe abstrata, então expor o construtor como público comunica uma possibilidade que não existe.',
      },
    ],
    challenge: {
      brief:
        'Crie uma hierarquia de meios de pagamento com uma base abstrata que centraliza a taxa e deixa o cálculo do valor para as derivadas.',
      requirements: [
        '`Pagamento` é **abstrata**, recebe o valor no construtor e o expõe como `Valor`',
        '`Pagamento.Taxa()` é virtual e devolve `0`',
        '`Pagamento.Total()` devolve valor mais taxa',
        '`Pagamento.Recibo()` devolve `tipo: valor + taxa = total`, com o tipo real e duas casas em cada valor',
        '`Dinheiro` não tem taxa',
        '`Cartao` tem taxa de 3% do valor',
        '`Boleto` tem taxa fixa de `2.50`',
        'O construtor da base é acessível apenas às derivadas',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare Pagamento (abstrata), Dinheiro, Cartao e Boleto aqui

class Program
{
    static void Main()
    {
        decimal valor = decimal.Parse(Console.ReadLine());

        List<Pagamento> formas = new List<Pagamento>
        {
            new Dinheiro(valor),
            new Cartao(valor),
            new Boleto(valor)
        };

        decimal totalTaxas = 0m;

        foreach (Pagamento p in formas)
        {
            Console.WriteLine(p.Recibo());
            totalTaxas += p.Taxa();
        }

        Console.WriteLine($"Total de taxas: {totalTaxas:F2}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

abstract class Pagamento
{
    public decimal Valor { get; }

    protected Pagamento(decimal valor)
    {
        Valor = valor;
    }

    public virtual decimal Taxa()
    {
        return 0m;
    }

    public decimal Total()
    {
        return Valor + Taxa();
    }

    public string Recibo()
    {
        return $"{GetType().Name}: {Valor:F2} + {Taxa():F2} = {Total():F2}";
    }
}

class Dinheiro : Pagamento
{
    public Dinheiro(decimal valor)
        : base(valor)
    {
    }
}

class Cartao : Pagamento
{
    public Cartao(decimal valor)
        : base(valor)
    {
    }

    public override decimal Taxa()
    {
        return Valor * 0.03m;
    }
}

class Boleto : Pagamento
{
    public Boleto(decimal valor)
        : base(valor)
    {
    }

    public override decimal Taxa()
    {
        return 2.50m;
    }
}

class Program
{
    static void Main()
    {
        decimal valor = decimal.Parse(Console.ReadLine());

        List<Pagamento> formas = new List<Pagamento>
        {
            new Dinheiro(valor),
            new Cartao(valor),
            new Boleto(valor)
        };

        decimal totalTaxas = 0m;

        foreach (Pagamento p in formas)
        {
            Console.WriteLine(p.Recibo());
            totalTaxas += p.Taxa();
        }

        Console.WriteLine($"Total de taxas: {totalTaxas:F2}");
    }
}
`,
      hints: [
        '`Dinheiro` não sobrescreve nada: a taxa zero da base já é o comportamento correto.',
        'O construtor da base é `protected Pagamento(decimal valor)`.',
      ],
      tests: [
        {
          name: 'Valor de cem',
          stdin: '100\n',
          expectedStdout:
            'Dinheiro: 100.00 + 0.00 = 100.00\nCartao: 100.00 + 3.00 = 103.00\n' +
            'Boleto: 100.00 + 2.50 = 102.50\nTotal de taxas: 5.50',
        },
        {
          name: 'Valor zero',
          stdin: '0\n',
          expectedStdout:
            'Dinheiro: 0.00 + 0.00 = 0.00\nCartao: 0.00 + 0.00 = 0.00\n' +
            'Boleto: 0.00 + 2.50 = 2.50\nTotal de taxas: 2.50',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c04l04',
    title: 'Métodos abstratos',
    objective: 'Exigir que toda derivada forneça uma implementação, transformando a omissão em erro de compilação.',
    concept: [
      {
        kind: 'text',
        body:
          'Um método **abstrato** declara a assinatura sem corpo. Ele obriga cada classe derivada concreta a fornecer uma implementação — e o compilador cobra.',
      },
      {
        kind: 'code',
        code: `abstract class Forma
{
    public abstract double Area();      // sem corpo, sem chaves

    public string Relatorio() => $"{GetType().Name}: {Area():F2}";
}

class Circulo : Forma
{
    private double r;
    public Circulo(double raio) { r = raio; }

    public override double Area() => Math.PI * r * r;   // obrigatorio
}`,
        caption: 'Uma classe derivada que não implementar `Area()` não compila.',
      },
      {
        kind: 'table',
        headers: ['Aspecto', '`virtual`', '`abstract`'],
        rows: [
          ['tem corpo na base', '**sim**', 'não'],
          ['derivada é obrigada a implementar', 'não', '**sim**'],
          ['só existe em classe abstrata', 'não', '**sim**'],
          ['pode chamar `base.Metodo()`', 'sim', 'não'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A diferença prática é sobre garantias. Um `virtual` com corpo padrão permite que uma derivada esqueça de sobrescrever e herde um comportamento genérico — que pode estar errado. O `abstract` torna o esquecimento impossível.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A base não pode chamar `base.Area()` de um método abstrato, porque não há implementação lá. Se você precisa de um comportamento padrão **e** quer forçar a substituição, escolha um dos dois: não dá para ter os dois.',
      },
      {
        kind: 'text',
        body:
          'Repare que a base **usa** o método abstrato em `Relatorio()`, mesmo sem saber como ele será implementado. Esse é o padrão que a próxima lição formaliza.',
      },
    ],
    quiz: [
      {
        id: 's05c04l04q1',
        type: 'single',
        prompt: 'O que acontece se uma classe concreta não implementar um método abstrato herdado?',
        options: [
          { id: 'a', text: 'Erro de compilação.', correct: true },
          { id: 'b', text: 'Ela herda uma versão vazia.' },
          { id: 'c', text: 'Lança exceção ao chamar.' },
          { id: 'd', text: 'O método é ignorado.' },
        ],
        explanation:
          'É a garantia central do `abstract`: a implementação é obrigatória, e a omissão é detectada antes de o programa rodar.',
      },
      {
        id: 's05c04l04q2',
        type: 'single',
        prompt: 'Qual é a diferença entre `virtual` e `abstract`?',
        options: [
          { id: 'a', text: 'O `virtual` tem corpo e é opcional substituir; o `abstract` não tem corpo e é obrigatório.', correct: true },
          { id: 'b', text: 'O `abstract` é mais rápido.' },
          { id: 'c', text: 'O `virtual` só funciona em classes abstratas.' },
          { id: 'd', text: 'Não há diferença prática.' },
        ],
        explanation:
          'A escolha é sobre se existe um comportamento padrão razoável. Quando não existe, o `abstract` força cada derivada a decidir.',
      },
      {
        id: 's05c04l04q3',
        type: 'single',
        prompt: 'Uma classe abstrata pode usar seus próprios métodos abstratos?',
        options: [
          { id: 'a', text: 'Sim: ela os chama sem saber como serão implementados.', correct: true },
          { id: 'b', text: 'Não: métodos sem corpo não podem ser chamados.' },
          { id: 'c', text: 'Só dentro do construtor.' },
          { id: 'd', text: 'Só se forem `protected`.' },
        ],
        explanation:
          'Em execução, o objeto sempre é de um tipo concreto que implementou o método. É isso que permite a base escrever algoritmos completos usando peças que ela não conhece.',
      },
    ],
    challenge: {
      brief:
        'Crie uma hierarquia de formas geométricas em que a base exige o cálculo da área e do perímetro, e oferece um relatório pronto.',
      requirements: [
        '`Forma` é abstrata com dois métodos **abstratos**: `Area()` e `Perimetro()`, ambos `double`',
        '`Forma.Descrever()` devolve `tipo: area=X perimetro=Y`, com o tipo real e duas casas',
        '`Retangulo` recebe largura e altura',
        '`Circulo` recebe o raio; use `Math.PI`',
        '`Triangulo` recebe base, altura e os três lados; a área é base vezes altura sobre dois',
        'Nenhuma derivada pode deixar de implementar os dois métodos',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare Forma (abstrata), Retangulo, Circulo e Triangulo aqui

class Program
{
    static void Main()
    {
        double largura = double.Parse(Console.ReadLine());
        double altura = double.Parse(Console.ReadLine());
        double raio = double.Parse(Console.ReadLine());
        double b = double.Parse(Console.ReadLine());
        double h = double.Parse(Console.ReadLine());
        double l1 = double.Parse(Console.ReadLine());
        double l2 = double.Parse(Console.ReadLine());
        double l3 = double.Parse(Console.ReadLine());

        List<Forma> formas = new List<Forma>
        {
            new Retangulo(largura, altura),
            new Circulo(raio),
            new Triangulo(b, h, l1, l2, l3)
        };

        double areaTotal = 0;

        foreach (Forma f in formas)
        {
            Console.WriteLine(f.Descrever());
            areaTotal += f.Area();
        }

        Console.WriteLine($"Area total: {areaTotal:F2}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

abstract class Forma
{
    public abstract double Area();
    public abstract double Perimetro();

    public string Descrever()
    {
        return $"{GetType().Name}: area={Area():F2} perimetro={Perimetro():F2}";
    }
}

class Retangulo : Forma
{
    private double largura;
    private double altura;

    public Retangulo(double largura, double altura)
    {
        this.largura = largura;
        this.altura = altura;
    }

    public override double Area()
    {
        return largura * altura;
    }

    public override double Perimetro()
    {
        return 2 * (largura + altura);
    }
}

class Circulo : Forma
{
    private double raio;

    public Circulo(double raio)
    {
        this.raio = raio;
    }

    public override double Area()
    {
        return Math.PI * raio * raio;
    }

    public override double Perimetro()
    {
        return 2 * Math.PI * raio;
    }
}

class Triangulo : Forma
{
    private double baseTriangulo;
    private double altura;
    private double lado1;
    private double lado2;
    private double lado3;

    public Triangulo(double baseTriangulo, double altura, double lado1, double lado2, double lado3)
    {
        this.baseTriangulo = baseTriangulo;
        this.altura = altura;
        this.lado1 = lado1;
        this.lado2 = lado2;
        this.lado3 = lado3;
    }

    public override double Area()
    {
        return baseTriangulo * altura / 2;
    }

    public override double Perimetro()
    {
        return lado1 + lado2 + lado3;
    }
}

class Program
{
    static void Main()
    {
        double largura = double.Parse(Console.ReadLine());
        double altura = double.Parse(Console.ReadLine());
        double raio = double.Parse(Console.ReadLine());
        double b = double.Parse(Console.ReadLine());
        double h = double.Parse(Console.ReadLine());
        double l1 = double.Parse(Console.ReadLine());
        double l2 = double.Parse(Console.ReadLine());
        double l3 = double.Parse(Console.ReadLine());

        List<Forma> formas = new List<Forma>
        {
            new Retangulo(largura, altura),
            new Circulo(raio),
            new Triangulo(b, h, l1, l2, l3)
        };

        double areaTotal = 0;

        foreach (Forma f in formas)
        {
            Console.WriteLine(f.Descrever());
            areaTotal += f.Area();
        }

        Console.WriteLine($"Area total: {areaTotal:F2}");
    }
}
`,
      hints: [
        'A base não tem campos nem construtor: cada forma guarda apenas os dados de que precisa.',
        '`Descrever()` fica na base e não é virtual — ele usa os métodos abstratos, que cada derivada implementou.',
      ],
      tests: [
        {
          name: 'Tres formas',
          stdin: '4\n5\n2\n6\n4\n5\n5\n6\n',
          expectedStdout:
            'Retangulo: area=20.00 perimetro=18.00\nCirculo: area=12.57 perimetro=12.57\n' +
            'Triangulo: area=12.00 perimetro=16.00\nArea total: 44.57',
        },
        {
          name: 'Valores unitarios',
          stdin: '1\n1\n1\n2\n1\n1\n1\n1\n',
          expectedStdout:
            'Retangulo: area=1.00 perimetro=4.00\nCirculo: area=3.14 perimetro=6.28\n' +
            'Triangulo: area=1.00 perimetro=3.00\nArea total: 5.14',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c04l05',
    title: 'Template method',
    objective: 'Definir a estrutura de um algoritmo na base, deixando as etapas variáveis para as derivadas.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando vários processos seguem a **mesma sequência** de etapas mas executam algumas delas de formas diferentes, a base pode fixar a ordem e delegar apenas o que varia.',
      },
      {
        kind: 'code',
        code: `abstract class Relatorio
{
    public string Gerar()               // a estrutura, fixa
    {
        return Cabecalho() + "\\n" + Corpo() + "\\n" + Rodape();
    }

    protected virtual string Cabecalho() => "=== RELATORIO ===";
    protected abstract string Corpo();               // cada um faz o seu
    protected virtual string Rodape() => "=== FIM ===";
}`,
        caption: 'O método público define a receita; os protegidos são os ingredientes.',
      },
      {
        kind: 'text',
        body:
          'Esse arranjo tem nome: **template method**. O método que define a sequência não é virtual — a ordem das etapas é justamente o que a base garante.',
      },
      {
        kind: 'table',
        headers: ['Membro', 'Modificador', 'Papel'],
        rows: [
          ['o método que orquestra', 'público, não virtual', 'garante a sequência'],
          ['etapa obrigatória', '`protected abstract`', 'cada derivada define'],
          ['etapa com padrão', '`protected virtual`', 'derivada pode ajustar'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'As etapas são `protected` porque são detalhes internos: quem usa o relatório chama `Gerar()`, não as partes. Torná-las públicas permitiria chamar o corpo sem o cabeçalho, quebrando a garantia.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Se o método orquestrador for virtual, a garantia desaparece: uma derivada pode substituí-lo e mudar a ordem inteira. O ponto do padrão é justamente que ele **não** pode ser alterado.',
      },
      {
        kind: 'text',
        body:
          'A combinação de `abstract` e `virtual` nas etapas permite dosar a liberdade: obrigatórias onde não há padrão razoável, opcionais onde há.',
      },
    ],
    quiz: [
      {
        id: 's05c04l05q1',
        type: 'single',
        prompt: 'Por que o método orquestrador não deve ser virtual?',
        options: [
          { id: 'a', text: 'Porque a sequência das etapas é justamente o que a base garante.', correct: true },
          { id: 'b', text: 'Porque métodos públicos não podem ser virtuais.' },
          { id: 'c', text: 'Por questão de desempenho.' },
          { id: 'd', text: 'Porque ele chama métodos abstratos.' },
        ],
        explanation:
          'Se ele puder ser substituído, uma derivada pode reordenar ou pular etapas — e o padrão deixa de oferecer qualquer garantia.',
      },
      {
        id: 's05c04l05q2',
        type: 'single',
        prompt: 'Por que as etapas são `protected` e não `public`?',
        options: [
          { id: 'a', text: 'Porque são detalhes internos: quem usa chama o método orquestrador.', correct: true },
          { id: 'b', text: 'Porque métodos abstratos precisam ser `protected`.' },
          { id: 'c', text: 'Para permitir sobrescrita.' },
          { id: 'd', text: 'Porque `public` não funciona em classes abstratas.' },
        ],
        explanation:
          'Expor as etapas permitiria usá-las fora de ordem, o que anula a estrutura que a base impõe.',
      },
      {
        id: 's05c04l05q3',
        type: 'single',
        prompt: 'Quando uma etapa deve ser `virtual` em vez de `abstract`?',
        options: [
          { id: 'a', text: 'Quando existe um comportamento padrão razoável para ela.', correct: true },
          { id: 'b', text: 'Quando ela devolve `string`.' },
          { id: 'c', text: 'Sempre.' },
          { id: 'd', text: 'Quando há mais de duas derivadas.' },
        ],
        explanation:
          'O `virtual` oferece um padrão e permite ajuste; o `abstract` obriga cada derivada a decidir. A escolha depende de existir ou não uma resposta genérica sensata.',
      },
    ],
    challenge: {
      brief:
        'Implemente o padrão template method em uma hierarquia de relatórios, com uma etapa obrigatória e duas com comportamento padrão.',
      requirements: [
        '`Relatorio` é abstrata e tem `Gerar()` público **não virtual**, que monta cabeçalho, corpo e rodapé separados por quebra de linha',
        '`Cabecalho()` é `protected virtual` e devolve `=== titulo ===`, usando um `Titulo` recebido no construtor',
        '`Corpo()` é `protected abstract`',
        '`Rodape()` é `protected virtual` e devolve `--- fim ---`',
        '`RelatorioVendas` recebe uma lista de valores e o corpo devolve `N vendas, total X`, com duas casas',
        '`RelatorioEstoque` recebe uma lista de quantidades e o corpo devolve `N itens, soma X`',
        '`RelatorioEstoque` sobrescreve o rodapé para devolver `--- estoque conferido ---`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare Relatorio (abstrata), RelatorioVendas e RelatorioEstoque aqui

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<decimal> vendas = new List<decimal>();
        for (int i = 0; i < n; i++)
        {
            vendas.Add(decimal.Parse(Console.ReadLine()));
        }

        int m = int.Parse(Console.ReadLine());

        List<int> estoque = new List<int>();
        for (int i = 0; i < m; i++)
        {
            estoque.Add(int.Parse(Console.ReadLine()));
        }

        Relatorio r1 = new RelatorioVendas("Vendas", vendas);
        Relatorio r2 = new RelatorioEstoque("Estoque", estoque);

        Console.WriteLine(r1.Gerar());
        Console.WriteLine(r2.Gerar());
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

abstract class Relatorio
{
    public string Titulo { get; }

    protected Relatorio(string titulo)
    {
        Titulo = titulo;
    }

    public string Gerar()
    {
        return Cabecalho() + "\\n" + Corpo() + "\\n" + Rodape();
    }

    protected virtual string Cabecalho()
    {
        return $"=== {Titulo} ===";
    }

    protected abstract string Corpo();

    protected virtual string Rodape()
    {
        return "--- fim ---";
    }
}

class RelatorioVendas : Relatorio
{
    private List<decimal> vendas;

    public RelatorioVendas(string titulo, List<decimal> vendas)
        : base(titulo)
    {
        this.vendas = vendas;
    }

    protected override string Corpo()
    {
        decimal total = 0m;

        foreach (decimal v in vendas)
        {
            total += v;
        }

        return $"{vendas.Count} vendas, total {total:F2}";
    }
}

class RelatorioEstoque : Relatorio
{
    private List<int> itens;

    public RelatorioEstoque(string titulo, List<int> itens)
        : base(titulo)
    {
        this.itens = itens;
    }

    protected override string Corpo()
    {
        int soma = 0;

        foreach (int q in itens)
        {
            soma += q;
        }

        return $"{itens.Count} itens, soma {soma}";
    }

    protected override string Rodape()
    {
        return "--- estoque conferido ---";
    }
}

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<decimal> vendas = new List<decimal>();
        for (int i = 0; i < n; i++)
        {
            vendas.Add(decimal.Parse(Console.ReadLine()));
        }

        int m = int.Parse(Console.ReadLine());

        List<int> estoque = new List<int>();
        for (int i = 0; i < m; i++)
        {
            estoque.Add(int.Parse(Console.ReadLine()));
        }

        Relatorio r1 = new RelatorioVendas("Vendas", vendas);
        Relatorio r2 = new RelatorioEstoque("Estoque", estoque);

        Console.WriteLine(r1.Gerar());
        Console.WriteLine(r2.Gerar());
    }
}
`,
      hints: [
        'O `Gerar()` é o único método público, e ele monta as três partes na ordem fixa.',
        '`RelatorioVendas` não sobrescreve o rodapé — o padrão da base já serve para ele.',
      ],
      tests: [
        {
          name: 'Vendas e estoque',
          stdin: '3\n100\n250.50\n80\n2\n5\n12\n',
          expectedStdout:
            '=== Vendas ===\n3 vendas, total 430.50\n--- fim ---\n' +
            '=== Estoque ===\n2 itens, soma 17\n--- estoque conferido ---',
        },
        {
          name: 'Listas vazias',
          stdin: '0\n0\n',
          expectedStdout:
            '=== Vendas ===\n0 vendas, total 0.00\n--- fim ---\n' +
            '=== Estoque ===\n0 itens, soma 0\n--- estoque conferido ---',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c04l06',
    title: 'is e as',
    objective: 'Testar e converter tipos com segurança, sem arriscar uma exceção de conversão.',
    concept: [
      {
        kind: 'text',
        body:
          'Às vezes é preciso descobrir o tipo real de um objeto guardado em uma variável do tipo base. Há três formas, e duas delas são seguras.',
      },
      {
        kind: 'table',
        headers: ['Operador', 'Devolve', 'Se falhar'],
        rows: [
          ['`obj is Tipo`', '`bool`', 'devolve `false`'],
          ['`obj as Tipo`', 'o objeto ou `null`', 'devolve `null`'],
          ['`(Tipo)obj`', 'o objeto convertido', '**lança exceção**'],
        ],
      },
      {
        kind: 'code',
        code: `Forma f = formas[0];

if (f is Circulo)               // testa
{
    Circulo c = (Circulo)f;     // converte, seguro depois do teste
}

Circulo c2 = f as Circulo;      // converte ou devolve null
if (c2 != null) { }`,
      },
      {
        kind: 'text',
        body:
          'A forma moderna combina as duas em uma linha: o `is` com **padrão de tipo** testa e já cria a variável convertida.',
      },
      {
        kind: 'code',
        code: `if (f is Circulo c)         // testa E converte
{
    Console.WriteLine(c.Raio);   // 'c' so existe aqui dentro
}`,
        caption: 'É a forma preferida hoje: uma operação, sem repetir o tipo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A conversão direta com parênteses lança `InvalidCastException` quando o tipo não bate. Use-a apenas quando o `is` já garantiu o tipo, ou quando uma falha ali realmente indica um bug.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Precisar de `is` com frequência costuma ser sinal de que falta um método virtual. Se o código pergunta o tipo para decidir o que fazer, a decisão provavelmente pertence ao próprio objeto.',
      },
    ],
    quiz: [
      {
        id: 's05c04l06q1',
        type: 'single',
        prompt: 'O que `obj as Tipo` devolve quando a conversão não é possível?',
        options: [
          { id: 'a', code: 'null', correct: true },
          { id: 'b', text: 'Lança exceção.' },
          { id: 'c', text: 'O objeto original.' },
          { id: 'd', code: 'false' },
        ],
        explanation:
          'É a diferença central em relação à conversão com parênteses, que lança `InvalidCastException` no mesmo caso.',
      },
      {
        id: 's05c04l06q2',
        type: 'single',
        prompt: 'O que `if (f is Circulo c)` faz?',
        options: [
          { id: 'a', text: 'Testa o tipo e, se bater, cria a variável `c` já convertida.', correct: true },
          { id: 'b', text: 'Compara `f` com uma variável chamada `c`.' },
          { id: 'c', text: 'Converte `f` e lança exceção se falhar.' },
          { id: 'd', text: 'Declara `c` como `null`.' },
        ],
        explanation:
          'É o padrão de tipo. A variável só existe dentro do bloco, e só quando o teste passou — o que elimina a chance de usá-la indevidamente.',
      },
      {
        id: 's05c04l06q3',
        type: 'single',
        prompt: 'O que o uso frequente de `is` costuma indicar?',
        options: [
          { id: 'a', text: 'Que falta um método virtual, e a decisão pertence ao objeto.', correct: true },
          { id: 'b', text: 'Que a hierarquia é rasa demais.' },
          { id: 'c', text: 'Que faltam classes abstratas.' },
          { id: 'd', text: 'Nada: é uso normal.' },
        ],
        explanation:
          'Perguntar o tipo para decidir o comportamento é reimplementar o despacho virtual à mão — com a desvantagem de precisar ser atualizado a cada tipo novo.',
      },
    ],
    challenge: {
      brief:
        'Processe uma coleção heterogênea identificando os tipos com segurança, sem nenhuma conversão que possa lançar exceção.',
      requirements: [
        '`Evento` é abstrata com `Titulo` e `Descrever()` abstrato',
        '`Reuniao` acrescenta `Participantes` (`int`); `Prazo` acrescenta `DiasRestantes` (`int`); `Lembrete` não acrescenta nada',
        'Cada `Descrever()` devolve `tipo: titulo`',
        'O `Main` percorre a lista e, para cada evento, imprime a descrição e uma linha extra específica quando o tipo permite',
        'Use `is` com padrão de tipo para identificar `Reuniao` e `Prazo`',
        'Reuniões imprimem `  -> N participantes`; prazos imprimem `  -> vence em N dias`',
        'Lembretes não imprimem linha extra',
        'Nenhuma conversão pode lançar exceção',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare Evento (abstrata), Reuniao, Prazo e Lembrete aqui

class Program
{
    static void Main()
    {
        int participantes = int.Parse(Console.ReadLine());
        int dias = int.Parse(Console.ReadLine());

        List<Evento> agenda = new List<Evento>
        {
            new Reuniao("Planejamento", participantes),
            new Lembrete("Comprar cafe"),
            new Prazo("Entrega do relatorio", dias)
        };

        int totalParticipantes = 0;
        int prazosProximos = 0;

        foreach (Evento e in agenda)
        {
            Console.WriteLine(e.Descrever());

            if (e is Reuniao r)
            {
                Console.WriteLine($"  -> {r.Participantes} participantes");
                totalParticipantes += r.Participantes;
            }
            else if (e is Prazo p)
            {
                Console.WriteLine($"  -> vence em {p.DiasRestantes} dias");
                if (p.DiasRestantes <= 7) prazosProximos++;
            }
        }

        Console.WriteLine($"Total de participantes: {totalParticipantes}");
        Console.WriteLine($"Prazos proximos: {prazosProximos}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

abstract class Evento
{
    public string Titulo { get; }

    protected Evento(string titulo)
    {
        Titulo = titulo;
    }

    public abstract string Descrever();
}

class Reuniao : Evento
{
    public int Participantes { get; }

    public Reuniao(string titulo, int participantes)
        : base(titulo)
    {
        Participantes = participantes;
    }

    public override string Descrever()
    {
        return $"Reuniao: {Titulo}";
    }
}

class Prazo : Evento
{
    public int DiasRestantes { get; }

    public Prazo(string titulo, int diasRestantes)
        : base(titulo)
    {
        DiasRestantes = diasRestantes;
    }

    public override string Descrever()
    {
        return $"Prazo: {Titulo}";
    }
}

class Lembrete : Evento
{
    public Lembrete(string titulo)
        : base(titulo)
    {
    }

    public override string Descrever()
    {
        return $"Lembrete: {Titulo}";
    }
}

class Program
{
    static void Main()
    {
        int participantes = int.Parse(Console.ReadLine());
        int dias = int.Parse(Console.ReadLine());

        List<Evento> agenda = new List<Evento>
        {
            new Reuniao("Planejamento", participantes),
            new Lembrete("Comprar cafe"),
            new Prazo("Entrega do relatorio", dias)
        };

        int totalParticipantes = 0;
        int prazosProximos = 0;

        foreach (Evento e in agenda)
        {
            Console.WriteLine(e.Descrever());

            if (e is Reuniao r)
            {
                Console.WriteLine($"  -> {r.Participantes} participantes");
                totalParticipantes += r.Participantes;
            }
            else if (e is Prazo p)
            {
                Console.WriteLine($"  -> vence em {p.DiasRestantes} dias");
                if (p.DiasRestantes <= 7) prazosProximos++;
            }
        }

        Console.WriteLine($"Total de participantes: {totalParticipantes}");
        Console.WriteLine($"Prazos proximos: {prazosProximos}");
    }
}
`,
      hints: [
        'Cada `Descrever()` devolve o nome do tipo escrito à mão, não `GetType().Name` — os textos são fixos.',
        'O `Main` já traz os `is` com padrão prontos: sua parte é a hierarquia que os torna possíveis.',
      ],
      tests: [
        {
          name: 'Prazo proximo',
          stdin: '8\n5\n',
          expectedStdout:
            'Reuniao: Planejamento\n  -> 8 participantes\nLembrete: Comprar cafe\n' +
            'Prazo: Entrega do relatorio\n  -> vence em 5 dias\n' +
            'Total de participantes: 8\nPrazos proximos: 1',
        },
        {
          name: 'Prazo distante',
          stdin: '3\n30\n',
          expectedStdout:
            'Reuniao: Planejamento\n  -> 3 participantes\nLembrete: Comprar cafe\n' +
            'Prazo: Entrega do relatorio\n  -> vence em 30 dias\n' +
            'Total de participantes: 3\nPrazos proximos: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c04l07',
    title: 'Pattern matching por tipo',
    objective: 'Escolher entre vários tipos com uma expressão `switch`, mais legível que uma cadeia de `if`.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando a decisão por tipo é inevitável, a `switch` expression torna a cadeia de `if` muito mais compacta — e o compilador ajuda verificando se todos os casos foram cobertos.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Cadeia de if',
          code: `string d;

if (f is Circulo c)
    d = $"circulo r={c.Raio}";
else if (f is Quadrado q)
    d = $"quadrado l={q.Lado}";
else
    d = "outro";`,
        },
        right: {
          label: 'switch expression',
          code: `string d = f switch
{
    Circulo c => $"circulo r={c.Raio}",
    Quadrado q => $"quadrado l={q.Lado}",
    _ => "outro"
};`,
        },
      },
      {
        kind: 'text',
        body:
          'Cada braço tem a forma `Tipo variavel => resultado`. O `_` no fim é o caso padrão, que captura tudo que não casou com os anteriores.',
      },
      {
        kind: 'code',
        code: `decimal desconto = cliente switch
{
    Vip v when v.Anos > 5 => 0.20m,     // com condicao extra
    Vip => 0.10m,                        // sem usar a variavel
    Comum => 0.05m,
    _ => 0m
};`,
        caption: 'A cláusula `when` acrescenta uma condição ao padrão de tipo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A ordem dos braços importa: o primeiro que casar vence. Um padrão mais geral colocado antes de um mais específico torna o segundo inalcançável — o mesmo princípio da régua numerada da Seção 2.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Sem o `_`, uma entrada que não casa com nenhum braço lança exceção em execução. Incluí-lo é quase sempre a escolha certa, mesmo que você acredite ter coberto todos os tipos.',
      },
      {
        kind: 'text',
        body:
          'Vale a mesma ressalva da lição anterior: se a decisão puder virar um método virtual, ela pertence ao objeto. O `switch` por tipo é a saída quando a lógica não cabe dentro das classes — por exemplo, quando elas vêm de uma biblioteca que você não controla.',
      },
    ],
    quiz: [
      {
        id: 's05c04l07q1',
        type: 'single',
        prompt: 'O que o `_` representa em uma `switch` expression?',
        options: [
          { id: 'a', text: 'O caso padrão, que captura tudo que não casou antes.', correct: true },
          { id: 'b', text: 'Um valor nulo.' },
          { id: 'c', text: 'Uma variável descartada.' },
          { id: 'd', text: 'O tipo base.' },
        ],
        explanation:
          'Sem ele, um valor que não casa com nenhum braço lança exceção. É o equivalente ao `else` final de uma cadeia de `if`.',
      },
      {
        id: 's05c04l07q2',
        type: 'single',
        prompt: 'O que a cláusula `when` acrescenta a um padrão?',
        options: [
          { id: 'a', text: 'Uma condição extra além do teste de tipo.', correct: true },
          { id: 'b', text: 'Um segundo tipo a testar.' },
          { id: 'c', text: 'Um valor padrão.' },
          { id: 'd', text: 'Uma conversão explícita.' },
        ],
        explanation:
          'Ela permite distinguir casos dentro do mesmo tipo — como um VIP com mais de cinco anos e um VIP recém-chegado.',
      },
      {
        id: 's05c04l07q3',
        type: 'single',
        prompt: 'Por que a ordem dos braços importa?',
        options: [
          { id: 'a', text: 'Porque o primeiro que casar vence, e um padrão geral antes torna o específico inalcançável.', correct: true },
          { id: 'b', text: 'Porque o compilador avalia de baixo para cima.' },
          { id: 'c', text: 'Porque só o último braço executa.' },
          { id: 'd', text: 'A ordem não importa.' },
        ],
        explanation:
          'É o mesmo princípio do FizzBuzz e da régua da Seção 2: o teste mais específico vem primeiro.',
      },
    ],
    challenge: {
      brief:
        'Classifique clientes e calcule descontos com uma `switch` expression por tipo, incluindo condições extras com `when`.',
      requirements: [
        '`Cliente` é abstrata com `Nome`',
        '`Vip` acrescenta `Anos` (`int`); `Comum` não acrescenta nada; `Novo` acrescenta `DiasDeCadastro` (`int`)',
        'O `Main` calcula o desconto com uma `switch` expression: VIP com mais de 5 anos recebe `0.20`, VIP recebe `0.10`, novo com menos de 30 dias recebe `0.15`, novo recebe `0.05`, comum recebe `0.05`',
        'A categoria vem de outra `switch` expression: `VIP prata`, `VIP ouro`, `recem-chegado`, `padrao`',
        'VIP com mais de 5 anos é `VIP ouro`; os demais VIP são `VIP prata`; novo com menos de 30 dias é `recem-chegado`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare Cliente (abstrata), Vip, Comum e Novo aqui

class Program
{
    static void Main()
    {
        int anosVip = int.Parse(Console.ReadLine());
        int diasNovo = int.Parse(Console.ReadLine());
        decimal compra = decimal.Parse(Console.ReadLine());

        List<Cliente> clientes = new List<Cliente>
        {
            new Vip("Ana", anosVip),
            new Comum("Bruno"),
            new Novo("Carla", diasNovo)
        };

        decimal totalDesconto = 0m;

        foreach (Cliente c in clientes)
        {
            decimal desconto = c switch
            {
                Vip v when v.Anos > 5 => 0.20m,
                Vip => 0.10m,
                Novo n when n.DiasDeCadastro < 30 => 0.15m,
                Novo => 0.05m,
                _ => 0.05m
            };

            string categoria = c switch
            {
                Vip v when v.Anos > 5 => "VIP ouro",
                Vip => "VIP prata",
                Novo n when n.DiasDeCadastro < 30 => "recem-chegado",
                _ => "padrao"
            };

            decimal valor = compra * desconto;
            totalDesconto += valor;

            Console.WriteLine($"{c.Nome} ({categoria}): {desconto:P0} = {valor:F2}");
        }

        Console.WriteLine($"Desconto total: {totalDesconto:F2}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

abstract class Cliente
{
    public string Nome { get; }

    protected Cliente(string nome)
    {
        Nome = nome;
    }
}

class Vip : Cliente
{
    public int Anos { get; }

    public Vip(string nome, int anos)
        : base(nome)
    {
        Anos = anos;
    }
}

class Comum : Cliente
{
    public Comum(string nome)
        : base(nome)
    {
    }
}

class Novo : Cliente
{
    public int DiasDeCadastro { get; }

    public Novo(string nome, int dias)
        : base(nome)
    {
        DiasDeCadastro = dias;
    }
}

class Program
{
    static void Main()
    {
        int anosVip = int.Parse(Console.ReadLine());
        int diasNovo = int.Parse(Console.ReadLine());
        decimal compra = decimal.Parse(Console.ReadLine());

        List<Cliente> clientes = new List<Cliente>
        {
            new Vip("Ana", anosVip),
            new Comum("Bruno"),
            new Novo("Carla", diasNovo)
        };

        decimal totalDesconto = 0m;

        foreach (Cliente c in clientes)
        {
            decimal desconto = c switch
            {
                Vip v when v.Anos > 5 => 0.20m,
                Vip => 0.10m,
                Novo n when n.DiasDeCadastro < 30 => 0.15m,
                Novo => 0.05m,
                _ => 0.05m
            };

            string categoria = c switch
            {
                Vip v when v.Anos > 5 => "VIP ouro",
                Vip => "VIP prata",
                Novo n when n.DiasDeCadastro < 30 => "recem-chegado",
                _ => "padrao"
            };

            decimal valor = compra * desconto;
            totalDesconto += valor;

            Console.WriteLine($"{c.Nome} ({categoria}): {desconto:P0} = {valor:F2}");
        }

        Console.WriteLine($"Desconto total: {totalDesconto:F2}");
    }
}
`,
      hints: [
        'As duas `switch` expressions já vêm prontas no `Main`: sua tarefa é declarar a hierarquia que elas percorrem.',
        '`Cliente` precisa ser abstrata com `Nome` no construtor protegido, e cada derivada repassa o nome com `: base(nome)`.',
      ],
      tests: [
        {
          name: 'VIP ouro e recem-chegado',
          stdin: '8\n15\n1000\n',
          expectedStdout:
            'Ana (VIP ouro): 20 % = 200.00\nBruno (padrao): 5 % = 50.00\n' +
            'Carla (recem-chegado): 15 % = 150.00\nDesconto total: 400.00',
        },
        {
          name: 'VIP prata e novo antigo',
          stdin: '2\n90\n200\n',
          expectedStdout:
            'Ana (VIP prata): 10 % = 20.00\nBruno (padrao): 5 % = 10.00\n' +
            'Carla (padrao): 5 % = 10.00\nDesconto total: 40.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c04l08',
    title: 'Coleções polimórficas',
    objective: 'Guardar objetos de tipos diferentes em uma coleção do tipo base e processá-los uniformemente.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma `List<Forma>` aceita círculos, quadrados e triângulos ao mesmo tempo. É aqui que o polimorfismo entrega seu maior valor prático: um laço que funciona para tipos que ainda nem existem.',
      },
      {
        kind: 'code',
        code: `List<Forma> formas = new List<Forma>
{
    new Circulo(2),
    new Quadrado(3),
    new Triangulo(4, 5)
};

foreach (Forma f in formas)
{
    Console.WriteLine(f.Area());   // cada uma calcula do seu jeito
}`,
      },
      {
        kind: 'text',
        body:
          'Todo o LINQ da Seção 4 continua funcionando sobre essas coleções, porque ele opera sobre o tipo declarado — e todos os elementos honram esse contrato.',
      },
      {
        kind: 'code',
        code: `double areaTotal = formas.Sum(f => f.Area());

var maiores = formas
    .Where(f => f.Area() > 10)
    .OrderByDescending(f => f.Area());

var soCirculos = formas.OfType<Circulo>();   // filtra por tipo`,
        caption: 'O `OfType<T>` é o operador LINQ que seleciona apenas os elementos de um tipo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O `OfType<T>` é a forma idiomática de extrair um subconjunto por tipo. Ele filtra e converte de uma vez, e ignora silenciosamente o que não casa — sem risco de exceção.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A coleção guarda **referências**. Alterar um objeto depois de adicioná-lo altera o que está na lista, porque é o mesmo objeto — a semântica de referência do capítulo 1 continua valendo aqui.',
      },
      {
        kind: 'text',
        body:
          'Se a coleção precisar aceitar tipos sem uma base comum, a resposta é uma interface — que é exatamente o assunto do próximo capítulo.',
      },
    ],
    quiz: [
      {
        id: 's05c04l08q1',
        type: 'single',
        prompt: 'O que `List<Forma>` aceita?',
        options: [
          { id: 'a', text: 'Objetos de `Forma` e de qualquer tipo derivado dela.', correct: true },
          { id: 'b', text: 'Apenas objetos de `Forma`.' },
          { id: 'c', text: 'Qualquer objeto.' },
          { id: 'd', text: 'Apenas tipos derivados, não a própria base.' },
        ],
        explanation:
          'A relação "é um" vale para o parâmetro de tipo da lista. Se `Forma` for abstrata, apenas as derivadas concretas podem ser criadas.',
      },
      {
        id: 's05c04l08q2',
        type: 'single',
        prompt: 'O que `formas.OfType<Circulo>()` faz?',
        options: [
          { id: 'a', text: 'Devolve apenas os elementos que são círculos, já convertidos.', correct: true },
          { id: 'b', text: 'Lança exceção se houver elementos de outros tipos.' },
          { id: 'c', text: 'Converte todos os elementos para `Circulo`.' },
          { id: 'd', text: 'Conta quantos círculos existem.' },
        ],
        explanation:
          'Ele filtra e converte em uma operação, descartando silenciosamente o que não é do tipo pedido.',
      },
      {
        id: 's05c04l08q3',
        type: 'single',
        prompt: 'O que acontece ao alterar um objeto depois de adicioná-lo à lista?',
        options: [
          { id: 'a', text: 'A alteração aparece na lista: é o mesmo objeto.', correct: true },
          { id: 'b', text: 'A lista guarda uma cópia e não muda.' },
          { id: 'c', text: 'Lança exceção.' },
          { id: 'd', text: 'Depende do tipo do objeto.' },
        ],
        explanation:
          'A lista guarda referências. É a mesma semântica que fazia `Produto b = a` criar um apelido no capítulo 1.',
      },
    ],
    challenge: {
      brief:
        'Processe uma coleção polimórfica de veículos com LINQ, agregando dados de todos e extraindo subconjuntos por tipo.',
      requirements: [
        '`Veiculo` é abstrata com `Placa` e os métodos abstratos `Tarifa()` (`decimal`) e `Eixos()` (`int`)',
        '`Carro` tem tarifa `10.00` e 2 eixos; `Moto` tem tarifa `5.00` e 2 eixos; `Caminhao` recebe o número de eixos e cobra `8.00` por eixo',
        '`Veiculo.Descrever()` devolve `placa (tipo): N eixos, R$ tarifa`, com o tipo real e duas casas na tarifa',
        'O `Main` calcula a arrecadação total, a média por veículo, e lista as placas dos caminhões',
        'Use `OfType<Caminhao>()` para extrair os caminhões',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

// Declare Veiculo (abstrata), Carro, Moto e Caminhao aqui

class Program
{
    static void Main()
    {
        int eixos1 = int.Parse(Console.ReadLine());
        int eixos2 = int.Parse(Console.ReadLine());

        List<Veiculo> pedagio = new List<Veiculo>
        {
            new Carro("AAA1111"),
            new Caminhao("BBB2222", eixos1),
            new Moto("CCC3333"),
            new Caminhao("DDD4444", eixos2)
        };

        foreach (Veiculo v in pedagio)
        {
            Console.WriteLine(v.Descrever());
        }

        Console.WriteLine($"Veiculos: {pedagio.Count}");
        Console.WriteLine($"Arrecadacao: {pedagio.Sum(v => v.Tarifa()):F2}");
        Console.WriteLine($"Media: {pedagio.Average(v => v.Tarifa()):F2}");

        var caminhoes = pedagio.OfType<Caminhao>().ToList();

        Console.WriteLine($"Caminhoes: {caminhoes.Count}");
        Console.WriteLine($"Placas: {string.Join(" ", caminhoes.Select(c => c.Placa))}");
        Console.WriteLine($"Eixos de caminhao: {caminhoes.Sum(c => c.Eixos())}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

abstract class Veiculo
{
    public string Placa { get; }

    protected Veiculo(string placa)
    {
        Placa = placa;
    }

    public abstract decimal Tarifa();
    public abstract int Eixos();

    public string Descrever()
    {
        return $"{Placa} ({GetType().Name}): {Eixos()} eixos, R$ {Tarifa():F2}";
    }
}

class Carro : Veiculo
{
    public Carro(string placa)
        : base(placa)
    {
    }

    public override decimal Tarifa()
    {
        return 10.00m;
    }

    public override int Eixos()
    {
        return 2;
    }
}

class Moto : Veiculo
{
    public Moto(string placa)
        : base(placa)
    {
    }

    public override decimal Tarifa()
    {
        return 5.00m;
    }

    public override int Eixos()
    {
        return 2;
    }
}

class Caminhao : Veiculo
{
    private int eixos;

    public Caminhao(string placa, int eixos)
        : base(placa)
    {
        this.eixos = eixos;
    }

    public override decimal Tarifa()
    {
        return 8.00m * eixos;
    }

    public override int Eixos()
    {
        return eixos;
    }
}

class Program
{
    static void Main()
    {
        int eixos1 = int.Parse(Console.ReadLine());
        int eixos2 = int.Parse(Console.ReadLine());

        List<Veiculo> pedagio = new List<Veiculo>
        {
            new Carro("AAA1111"),
            new Caminhao("BBB2222", eixos1),
            new Moto("CCC3333"),
            new Caminhao("DDD4444", eixos2)
        };

        foreach (Veiculo v in pedagio)
        {
            Console.WriteLine(v.Descrever());
        }

        Console.WriteLine($"Veiculos: {pedagio.Count}");
        Console.WriteLine($"Arrecadacao: {pedagio.Sum(v => v.Tarifa()):F2}");
        Console.WriteLine($"Media: {pedagio.Average(v => v.Tarifa()):F2}");

        var caminhoes = pedagio.OfType<Caminhao>().ToList();

        Console.WriteLine($"Caminhoes: {caminhoes.Count}");
        Console.WriteLine($"Placas: {string.Join(" ", caminhoes.Select(c => c.Placa))}");
        Console.WriteLine($"Eixos de caminhao: {caminhoes.Sum(c => c.Eixos())}");
    }
}
`,
      hints: [
        'O `Descrever()` fica na base e usa os dois métodos abstratos — ele não precisa saber o tipo concreto.',
        'O caminhão guarda o número de eixos em um campo, e a tarifa é `8.00m * eixos`.',
      ],
      tests: [
        {
          name: 'Caminhoes de 3 e 5 eixos',
          stdin: '3\n5\n',
          expectedStdout:
            'AAA1111 (Carro): 2 eixos, R$ 10.00\nBBB2222 (Caminhao): 3 eixos, R$ 24.00\n' +
            'CCC3333 (Moto): 2 eixos, R$ 5.00\nDDD4444 (Caminhao): 5 eixos, R$ 40.00\n' +
            'Veiculos: 4\nArrecadacao: 79.00\nMedia: 19.75\nCaminhoes: 2\n' +
            'Placas: BBB2222 DDD4444\nEixos de caminhao: 8',
        },
        {
          name: 'Caminhoes de 2 eixos',
          stdin: '2\n2\n',
          expectedStdout:
            'AAA1111 (Carro): 2 eixos, R$ 10.00\nBBB2222 (Caminhao): 2 eixos, R$ 16.00\n' +
            'CCC3333 (Moto): 2 eixos, R$ 5.00\nDDD4444 (Caminhao): 2 eixos, R$ 16.00\n' +
            'Veiculos: 4\nArrecadacao: 47.00\nMedia: 11.75\nCaminhoes: 2\n' +
            'Placas: BBB2222 DDD4444\nEixos de caminhao: 4',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c04l09',
    title: 'Prática: formas geométricas',
    objective: 'Construir a hierarquia canônica do polimorfismo, com validação e ordenação sobre a coleção.',
    concept: [
      {
        kind: 'text',
        body:
          'Formas geométricas são o exemplo tradicional do polimorfismo porque a relação é genuína: toda forma tem área e perímetro, e cada uma calcula de um jeito completamente diferente.',
      },
      {
        kind: 'table',
        headers: ['Forma', 'Área', 'Perímetro'],
        rows: [
          ['círculo', '`π r²`', '`2 π r`'],
          ['retângulo', '`l × a`', '`2(l + a)`'],
          ['quadrado', '`l²`', '`4l`'],
          ['triângulo retângulo', '`c1 × c2 / 2`', '`c1 + c2 + hipotenusa`'],
        ],
      },
      {
        kind: 'text',
        body:
          'Uma decisão de projeto aparece aqui: um quadrado **é um** retângulo com lados iguais? Matematicamente sim, mas em código isso costuma dar problema — um retângulo permite alterar os lados independentemente, e um quadrado não.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Esse é o famoso problema círculo-elipse: a relação matemática de subconjunto nem sempre sobrevive quando os objetos são mutáveis. Com formas **imutáveis**, herdar `Quadrado` de `Retangulo` é seguro — e é uma boa razão para preferir imutabilidade.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Dimensões negativas não fazem sentido geométrico. Validar no construtor é o que garante que nenhuma forma inválida chegue a existir — a lição de invariantes do capítulo 2, aplicada aqui.',
      },
      {
        kind: 'text',
        body:
          'Com a hierarquia pronta, ordenar por área, filtrar por tamanho e somar tudo funcionam sem que o código saiba quais formas existem.',
      },
    ],
    quiz: [
      {
        id: 's05c04l09q1',
        type: 'single',
        prompt: 'Por que herdar `Quadrado` de `Retangulo` pode dar problema?',
        options: [
          { id: 'a', text: 'Porque o retângulo permite alterar os lados independentemente, e o quadrado não.', correct: true },
          { id: 'b', text: 'Porque as fórmulas são diferentes.' },
          { id: 'c', text: 'Porque quadrado tem menos campos.' },
          { id: 'd', text: 'Não dá problema nenhum.' },
        ],
        explanation:
          'É o problema círculo-elipse. Se o retângulo tem setters independentes, o quadrado não consegue honrar esse contrato sem quebrar a própria invariante.',
      },
      {
        id: 's05c04l09q2',
        type: 'single',
        prompt: 'Como a imutabilidade ajuda nesse caso?',
        options: [
          { id: 'a', text: 'Sem setters, não há como violar a invariante do quadrado.', correct: true },
          { id: 'b', text: 'Ela torna as fórmulas mais rápidas.' },
          { id: 'c', text: 'Ela elimina a necessidade de herança.' },
          { id: 'd', text: 'Ela não ajuda.' },
        ],
        explanation:
          'O problema surge da mutação. Objetos imutáveis nascem consistentes e permanecem assim, então a relação de subconjunto se mantém.',
      },
      {
        id: 's05c04l09q3',
        type: 'single',
        prompt: 'Onde validar que as dimensões são positivas?',
        options: [
          { id: 'a', text: 'No construtor, para que uma forma inválida nunca exista.', correct: true },
          { id: 'b', text: 'No método que calcula a área.' },
          { id: 'c', text: 'No `Main`, antes de criar.' },
          { id: 'd', text: 'Não é necessário validar.' },
        ],
        explanation:
          'Validar no cálculo permitiria criar o objeto inválido e só descobrir depois. O construtor é a única porta de entrada.',
      },
    ],
    challenge: {
      brief:
        'Construa a hierarquia de formas geométricas com validação no construtor, e processe uma coleção delas com ordenação e agregação.',
      requirements: [
        '`Forma` é abstrata com `Area()` e `Perimetro()` abstratos e `Descrever()` devolvendo `tipo: area=X perimetro=Y`, com duas casas',
        '`Circulo` recebe o raio; `Retangulo` recebe largura e altura; `TrianguloRetangulo` recebe os dois catetos',
        'A hipotenusa é a raiz da soma dos quadrados dos catetos',
        'Dimensões menores ou iguais a zero são **ajustadas para 1** no construtor',
        'O `Main` ordena as formas por área decrescente e imprime nessa ordem',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

// Declare Forma (abstrata), Circulo, Retangulo e TrianguloRetangulo aqui

class Program
{
    static void Main()
    {
        double raio = double.Parse(Console.ReadLine());
        double largura = double.Parse(Console.ReadLine());
        double altura = double.Parse(Console.ReadLine());
        double cateto1 = double.Parse(Console.ReadLine());
        double cateto2 = double.Parse(Console.ReadLine());

        List<Forma> formas = new List<Forma>
        {
            new Circulo(raio),
            new Retangulo(largura, altura),
            new TrianguloRetangulo(cateto1, cateto2)
        };

        foreach (Forma f in formas.OrderByDescending(x => x.Area()))
        {
            Console.WriteLine(f.Descrever());
        }

        Console.WriteLine($"Area total: {formas.Sum(f => f.Area()):F2}");
        Console.WriteLine($"Maior area: {formas.Max(f => f.Area()):F2}");
        Console.WriteLine($"Acima de 10: {formas.Count(f => f.Area() > 10)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

abstract class Forma
{
    public abstract double Area();
    public abstract double Perimetro();

    public string Descrever()
    {
        return $"{GetType().Name}: area={Area():F2} perimetro={Perimetro():F2}";
    }

    protected static double Positivo(double valor)
    {
        return valor <= 0 ? 1 : valor;
    }
}

class Circulo : Forma
{
    private double raio;

    public Circulo(double raio)
    {
        this.raio = Positivo(raio);
    }

    public override double Area()
    {
        return Math.PI * raio * raio;
    }

    public override double Perimetro()
    {
        return 2 * Math.PI * raio;
    }
}

class Retangulo : Forma
{
    private double largura;
    private double altura;

    public Retangulo(double largura, double altura)
    {
        this.largura = Positivo(largura);
        this.altura = Positivo(altura);
    }

    public override double Area()
    {
        return largura * altura;
    }

    public override double Perimetro()
    {
        return 2 * (largura + altura);
    }
}

class TrianguloRetangulo : Forma
{
    private double cateto1;
    private double cateto2;

    public TrianguloRetangulo(double cateto1, double cateto2)
    {
        this.cateto1 = Positivo(cateto1);
        this.cateto2 = Positivo(cateto2);
    }

    public override double Area()
    {
        return cateto1 * cateto2 / 2;
    }

    public override double Perimetro()
    {
        return cateto1 + cateto2 + Math.Sqrt(cateto1 * cateto1 + cateto2 * cateto2);
    }
}

class Program
{
    static void Main()
    {
        double raio = double.Parse(Console.ReadLine());
        double largura = double.Parse(Console.ReadLine());
        double altura = double.Parse(Console.ReadLine());
        double cateto1 = double.Parse(Console.ReadLine());
        double cateto2 = double.Parse(Console.ReadLine());

        List<Forma> formas = new List<Forma>
        {
            new Circulo(raio),
            new Retangulo(largura, altura),
            new TrianguloRetangulo(cateto1, cateto2)
        };

        foreach (Forma f in formas.OrderByDescending(x => x.Area()))
        {
            Console.WriteLine(f.Descrever());
        }

        Console.WriteLine($"Area total: {formas.Sum(f => f.Area()):F2}");
        Console.WriteLine($"Maior area: {formas.Max(f => f.Area()):F2}");
        Console.WriteLine($"Acima de 10: {formas.Count(f => f.Area() > 10)}");
      }
}
`,
      hints: [
        'Um método `protected static` na base pode centralizar o ajuste de valores não positivos, evitando repeti-lo em cada construtor.',
        'A hipotenusa usa `Math.Sqrt(c1 * c1 + c2 * c2)`.',
      ],
      tests: [
        {
          name: 'Formas de tamanhos variados',
          stdin: '3\n4\n5\n3\n4\n',
          expectedStdout:
            'Circulo: area=28.27 perimetro=18.85\nRetangulo: area=20.00 perimetro=18.00\n' +
            'TrianguloRetangulo: area=6.00 perimetro=12.00\n' +
            'Area total: 54.27\nMaior area: 28.27\nAcima de 10: 2',
        },
        {
          name: 'Dimensoes invalidas viram 1',
          stdin: '0\n-2\n5\n0\n0\n',
          expectedStdout:
            'Retangulo: area=5.00 perimetro=12.00\nCirculo: area=3.14 perimetro=6.28\n' +
            'TrianguloRetangulo: area=0.50 perimetro=3.41\n' +
            'Area total: 8.64\nMaior area: 5.00\nAcima de 10: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c04l10',
    title: 'Checkpoint: polimorfismo',
    objective: 'Combinar classes abstratas, template method e coleções polimórficas em um sistema extensível.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint junta o capítulo em um sistema de processamento de arquivos. Cada formato tem sua própria leitura, mas todos seguem a mesma sequência de etapas.',
      },
      {
        kind: 'table',
        headers: ['Recurso', 'Papel no sistema'],
        rows: [
          ['classe abstrata', 'define o contrato de um processador'],
          ['método abstrato', 'obriga cada formato a fornecer a extração'],
          ['template method', 'fixa a sequência validar → processar → resumir'],
          ['método virtual', 'oferece validação padrão, ajustável'],
          ['coleção polimórfica', 'processa todos os formatos no mesmo laço'],
        ],
      },
      {
        kind: 'text',
        body:
          'O teste de que o desenho está bom: acrescentar um formato novo deve exigir **apenas** uma classe nova, sem tocar em nada do que já funciona.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que o `Main` nunca menciona os tipos concretos depois de criá-los. Todo o processamento acontece através do tipo base — é isso que torna o sistema extensível.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Uma etapa que **pode** falhar precisa de um caminho de saída definido. Aqui, um conteúdo que não passa na validação interrompe o processamento daquele item, mas não derruba o laço inteiro.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Construa em três passos: primeiro a base com o template method e um formato só; depois os outros formatos; e por último a validação sobrescrita. Testar a cada passo isola os erros.',
      },
    ],
    quiz: [
      {
        id: 's05c04l10q1',
        type: 'single',
        prompt: 'Qual é o teste de que a hierarquia está bem projetada?',
        options: [
          { id: 'a', text: 'Acrescentar um tipo novo exige apenas uma classe nova.', correct: true },
          { id: 'b', text: 'Todos os métodos são virtuais.' },
          { id: 'c', text: 'A base tem poucos métodos.' },
          { id: 'd', text: 'Existem pelo menos três derivadas.' },
        ],
        explanation:
          'Se acrescentar um formato exige editar o laço, a base ou outras classes, o polimorfismo não está cumprindo seu papel.',
      },
      {
        id: 's05c04l10q2',
        type: 'single',
        prompt: 'Por que o template method fixa a sequência de etapas?',
        options: [
          { id: 'a', text: 'Para garantir que toda derivada siga a mesma ordem, sem poder alterá-la.', correct: true },
          { id: 'b', text: 'Para melhorar o desempenho.' },
          { id: 'c', text: 'Porque métodos abstratos exigem ordem fixa.' },
          { id: 'd', text: 'Para reduzir o número de métodos.' },
        ],
        explanation:
          'A sequência é a garantia que a base oferece. Se as derivadas pudessem reordená-la, não haveria garantia nenhuma.',
      },
      {
        id: 's05c04l10q3',
        type: 'single',
        prompt: 'Por que a validação é `virtual` e a extração é `abstract`?',
        options: [
          { id: 'a', text: 'Porque existe uma validação padrão razoável, mas não existe extração padrão.', correct: true },
          { id: 'b', text: 'Porque validação é mais simples.' },
          { id: 'c', text: 'Porque `abstract` só funciona uma vez por classe.' },
          { id: 'd', text: 'É uma escolha arbitrária.' },
        ],
        explanation:
          '"Conteúdo não vazio" serve para qualquer formato; "como extrair os dados" depende inteiramente do formato e não tem resposta genérica.',
      },
    ],
    challenge: {
      brief:
        'Construa um sistema de processamento de arquivos com template method, formatos diferentes, e uma coleção polimórfica que processa todos.',
      requirements: [
        '`Processador` é abstrata, recebe o nome do arquivo, e tem `Processar(string conteudo)` público **não virtual**',
        '`Processar` segue a sequência: se `Valido(conteudo)` for falso, devolve `arquivo: INVALIDO`; senão devolve `arquivo: N registros (formato)`, com o resultado de `Extrair` e `Formato()`',
        '`Valido(string)` é `protected virtual` e devolve `true` quando o conteúdo não está vazio',
        '`Extrair(string)` é `protected abstract` e devolve `int`',
        '`Formato()` é `protected abstract` e devolve `string`',
        '`ProcessadorCsv` conta os campos separados por `;`; formato `csv`',
        '`ProcessadorLinhas` conta os pedaços separados por `|`; formato `linhas`',
        '`ProcessadorPalavras` conta as palavras separadas por espaço; formato `palavras`, e sobrescreve `Valido` para exigir também pelo menos 3 caracteres',
        'O `Main` processa a mesma entrada com os três e soma os registros dos válidos',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare Processador (abstrata) e os tres processadores aqui

class Program
{
    static void Main()
    {
        string conteudo = Console.ReadLine();

        List<Processador> processadores = new List<Processador>
        {
            new ProcessadorCsv("dados.csv"),
            new ProcessadorLinhas("dados.txt"),
            new ProcessadorPalavras("texto.txt")
        };

        int totalRegistros = 0;
        int invalidos = 0;

        foreach (Processador p in processadores)
        {
            string resultado = p.Processar(conteudo);
            Console.WriteLine(resultado);

            if (resultado.EndsWith("INVALIDO"))
            {
                invalidos++;
            }
            else
            {
                totalRegistros += p.UltimoTotal;
            }
        }

        Console.WriteLine($"Processadores: {processadores.Count}");
        Console.WriteLine($"Invalidos: {invalidos}");
        Console.WriteLine($"Total de registros: {totalRegistros}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

abstract class Processador
{
    public string Arquivo { get; }
    public int UltimoTotal { get; private set; }

    protected Processador(string arquivo)
    {
        Arquivo = arquivo;
    }

    public string Processar(string conteudo)
    {
        if (!Valido(conteudo))
        {
            UltimoTotal = 0;
            return $"{Arquivo}: INVALIDO";
        }

        UltimoTotal = Extrair(conteudo);
        return $"{Arquivo}: {UltimoTotal} registros ({Formato()})";
    }

    protected virtual bool Valido(string conteudo)
    {
        return conteudo != null && conteudo.Length > 0;
    }

    protected abstract int Extrair(string conteudo);

    protected abstract string Formato();
}

class ProcessadorCsv : Processador
{
    public ProcessadorCsv(string arquivo)
        : base(arquivo)
    {
    }

    protected override int Extrair(string conteudo)
    {
        return conteudo.Split(';').Length;
    }

    protected override string Formato()
    {
        return "csv";
    }
}

class ProcessadorLinhas : Processador
{
    public ProcessadorLinhas(string arquivo)
        : base(arquivo)
    {
    }

    protected override int Extrair(string conteudo)
    {
        return conteudo.Split('|').Length;
    }

    protected override string Formato()
    {
        return "linhas";
    }
}

class ProcessadorPalavras : Processador
{
    public ProcessadorPalavras(string arquivo)
        : base(arquivo)
    {
    }

    protected override bool Valido(string conteudo)
    {
        return base.Valido(conteudo) && conteudo.Length >= 3;
    }

    protected override int Extrair(string conteudo)
    {
        return conteudo.Split(' ').Length;
    }

    protected override string Formato()
    {
        return "palavras";
    }
}

class Program
{
    static void Main()
    {
        string conteudo = Console.ReadLine();

        List<Processador> processadores = new List<Processador>
        {
            new ProcessadorCsv("dados.csv"),
            new ProcessadorLinhas("dados.txt"),
            new ProcessadorPalavras("texto.txt")
        };

        int totalRegistros = 0;
        int invalidos = 0;

        foreach (Processador p in processadores)
        {
            string resultado = p.Processar(conteudo);
            Console.WriteLine(resultado);

            if (resultado.EndsWith("INVALIDO"))
            {
                invalidos++;
            }
            else
            {
                totalRegistros += p.UltimoTotal;
            }
        }

        Console.WriteLine($"Processadores: {processadores.Count}");
        Console.WriteLine($"Invalidos: {invalidos}");
        Console.WriteLine($"Total de registros: {totalRegistros}");
    }
}
`,
      hints: [
        '`UltimoTotal` é uma propriedade com `private set`, atualizada dentro do `Processar`.',
        '`ProcessadorPalavras` reaproveita a validação da base com `base.Valido(conteudo) && ...`.',
      ],
      tests: [
        {
          name: 'Conteudo com varios separadores',
          stdin: 'a;b;c|d e f\n',
          expectedStdout:
            'dados.csv: 3 registros (csv)\ndados.txt: 2 registros (linhas)\n' +
            'texto.txt: 3 registros (palavras)\n' +
            'Processadores: 3\nInvalidos: 0\nTotal de registros: 8',
        },
        {
          name: 'Conteudo curto reprova so o de palavras',
          stdin: 'ab\n',
          expectedStdout:
            'dados.csv: 1 registros (csv)\ndados.txt: 1 registros (linhas)\n' +
            'texto.txt: INVALIDO\n' +
            'Processadores: 3\nInvalidos: 1\nTotal de registros: 2',
        },
        {
          name: 'Conteudo vazio reprova todos',
          stdin: '\n',
          expectedStdout:
            'dados.csv: INVALIDO\ndados.txt: INVALIDO\ntexto.txt: INVALIDO\n' +
            'Processadores: 3\nInvalidos: 3\nTotal de registros: 0',
          hidden: true,
        },
      ],
    },
  },
]
