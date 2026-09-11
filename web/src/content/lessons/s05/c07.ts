import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's05c07l01',
    title: 'Achando os substantivos e os verbos',
    objective: 'Transformar a descrição de um problema em uma primeira lista de tipos e métodos.',
    concept: [
      {
        kind: 'text',
        body:
          'Modelar começa antes de escrever código. A técnica mais antiga e ainda a mais útil: leia a descrição do problema e sublinhe os **substantivos** e os **verbos**.',
      },
      {
        kind: 'text',
        body:
          '*"Um **cliente** faz um **pedido** com vários **itens**. O pedido pode ser **confirmado** ou **cancelado**. Cada item tem um **produto** e uma **quantidade**, e o pedido **calcula** seu total."*',
      },
      {
        kind: 'table',
        headers: ['Substantivo', 'Vira', 'Verbo', 'Vira'],
        rows: [
          ['cliente', 'classe `Cliente`', 'confirmar', '`Pedido.Confirmar()`'],
          ['pedido', 'classe `Pedido`', 'cancelar', '`Pedido.Cancelar()`'],
          ['item', 'classe `Item`', 'calcular total', '`Pedido.Total()`'],
          ['produto', 'classe `Produto`', '', ''],
          ['quantidade', 'campo de `Item`', '', ''],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Nem todo substantivo vira classe. "Quantidade" é um número dentro de `Item`, não um tipo próprio. A pergunta é: esse substantivo tem **comportamento** ou dados próprios, ou é só um valor de outra coisa?',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um verbo vira método **de alguém**. "Calcular total" pertence ao pedido, porque é ele que tem os itens. Colocar o verbo na classe errada é o erro de modelagem mais comum, e é o assunto da próxima lição.',
      },
      {
        kind: 'text',
        body:
          'Esse primeiro rascunho quase nunca é o modelo final — e não precisa ser. Ele é um ponto de partida concreto, muito melhor que encarar a tela em branco.',
      },
    ],
    quiz: [
      {
        id: 's05c07l01q1',
        type: 'single',
        prompt: 'Na descrição do problema, os substantivos costumam virar o quê?',
        options: [
          { id: 'a', text: 'Classes ou campos.', correct: true },
          { id: 'b', text: 'Métodos.' },
          { id: 'c', text: 'Interfaces.' },
          { id: 'd', text: 'Sempre classes.' },
        ],
        explanation:
          'Um substantivo com comportamento e dados próprios vira classe. Um que é só um valor de outro vira campo.',
      },
      {
        id: 's05c07l01q2',
        type: 'single',
        prompt: 'Como decidir se um substantivo merece ser uma classe própria?',
        options: [
          { id: 'a', text: 'Perguntando se ele tem comportamento ou dados próprios.', correct: true },
          { id: 'b', text: 'Contando quantas vezes ele aparece.' },
          { id: 'c', text: 'Verificando se é o sujeito da frase.' },
          { id: 'd', text: 'Todo substantivo vira classe.' },
        ],
        explanation:
          '"Quantidade" é só um `int`. "Pedido" tem itens, estado e cálculos — ele merece um tipo.',
      },
      {
        id: 's05c07l01q3',
        type: 'single',
        prompt: 'A quem pertence o método "calcular total"?',
        options: [
          { id: 'a', text: 'Ao pedido, porque é ele que tem os itens.', correct: true },
          { id: 'b', text: 'Ao cliente, porque é ele que paga.' },
          { id: 'c', text: 'Ao `Program`, porque é o principal.' },
          { id: 'd', text: 'Ao item, porque é ele que tem preço.' },
        ],
        explanation:
          'Um comportamento pertence a quem tem os dados de que ele precisa. O pedido é dono da lista de itens, então é ele quem soma.',
      },
    ],
    challenge: {
      brief:
        'Traduza uma descrição em tipos e métodos: uma escola tem turmas, cada turma tem alunos, e cada aluno tem notas.',
      requirements: [
        '`Aluno` recebe nome no construtor, tem `Nome` de leitura e guarda notas',
        '`Aluno.Adicionar(double nota)` acrescenta uma nota',
        '`Aluno.Media` é a média das notas, ou `0` sem notas',
        '`Turma` recebe nome no construtor e guarda alunos',
        '`Turma.Matricular(Aluno a)` acrescenta um aluno',
        '`Turma.MediaGeral` é a média das médias dos alunos, ou `0` sem alunos',
        '`Turma.Aprovados(double corte)` conta alunos com média maior ou igual ao corte',
        'Os dois `ToString()` devolvem, respectivamente, `nome: media` e `turma nome: N alunos`, com médias em uma casa decimal',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare Aluno e Turma aqui

class Program
{
    static void Main()
    {
        string nomeTurma = Console.ReadLine();
        int n = int.Parse(Console.ReadLine());

        Turma turma = new Turma(nomeTurma);

        for (int i = 0; i < n; i++)
        {
            Aluno a = new Aluno(Console.ReadLine());
            int notas = int.Parse(Console.ReadLine());

            for (int j = 0; j < notas; j++)
            {
                a.Adicionar(double.Parse(Console.ReadLine()));
            }

            turma.Matricular(a);
            Console.WriteLine(a);
        }

        Console.WriteLine(turma);
        Console.WriteLine($"Media geral: {turma.MediaGeral:F1}");
        Console.WriteLine($"Aprovados com 7: {turma.Aprovados(7)}");
        Console.WriteLine($"Aprovados com 5: {turma.Aprovados(5)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Aluno
{
    private List<double> notas = new List<double>();

    public string Nome { get; }

    public Aluno(string nome)
    {
        Nome = nome;
    }

    public void Adicionar(double nota)
    {
        notas.Add(nota);
    }

    public double Media
    {
        get
        {
            if (notas.Count == 0)
            {
                return 0;
            }

            double soma = 0;

            foreach (double n in notas)
            {
                soma += n;
            }

            return soma / notas.Count;
        }
    }

    public override string ToString()
    {
        return $"{Nome}: {Media:F1}";
    }
}

class Turma
{
    private List<Aluno> alunos = new List<Aluno>();

    public string Nome { get; }

    public Turma(string nome)
    {
        Nome = nome;
    }

    public void Matricular(Aluno a)
    {
        alunos.Add(a);
    }

    public double MediaGeral
    {
        get
        {
            if (alunos.Count == 0)
            {
                return 0;
            }

            double soma = 0;

            foreach (Aluno a in alunos)
            {
                soma += a.Media;
            }

            return soma / alunos.Count;
        }
    }

    public int Aprovados(double corte)
    {
        int total = 0;

        foreach (Aluno a in alunos)
        {
            if (a.Media >= corte)
            {
                total++;
            }
        }

        return total;
    }

    public override string ToString()
    {
        return $"turma {Nome}: {alunos.Count} alunos";
    }
}

class Program
{
    static void Main()
    {
        string nomeTurma = Console.ReadLine();
        int n = int.Parse(Console.ReadLine());

        Turma turma = new Turma(nomeTurma);

        for (int i = 0; i < n; i++)
        {
            Aluno a = new Aluno(Console.ReadLine());
            int notas = int.Parse(Console.ReadLine());

            for (int j = 0; j < notas; j++)
            {
                a.Adicionar(double.Parse(Console.ReadLine()));
            }

            turma.Matricular(a);
            Console.WriteLine(a);
        }

        Console.WriteLine(turma);
        Console.WriteLine($"Media geral: {turma.MediaGeral:F1}");
        Console.WriteLine($"Aprovados com 7: {turma.Aprovados(7)}");
        Console.WriteLine($"Aprovados com 5: {turma.Aprovados(5)}");
    }
}
`,
      hints: [
        'Cada classe guarda sua própria lista privada: o aluno guarda notas, a turma guarda alunos.',
        'A média geral é a média **das médias**, não a média de todas as notas juntas.',
      ],
      tests: [
        {
          name: 'Turma com tres alunos',
          stdin: '3A\n3\nAna\n2\n8\n10\nBruno\n2\n6\n4\nCarla\n1\n7\n',
          expectedStdout:
            'Ana: 9.0\nBruno: 5.0\nCarla: 7.0\nturma 3A: 3 alunos\n' +
            'Media geral: 7.0\nAprovados com 7: 2\nAprovados com 5: 3',
        },
        {
          name: 'Aluno sem notas',
          stdin: '4B\n2\nDiego\n0\nElena\n1\n9\n',
          expectedStdout:
            'Diego: 0.0\nElena: 9.0\nturma 4B: 2 alunos\n' +
            'Media geral: 4.5\nAprovados com 7: 1\nAprovados com 5: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c07l02',
    title: 'Distribuindo responsabilidades',
    objective: 'Colocar cada comportamento na classe que tem os dados de que ele precisa.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma vez que os tipos existem, a pergunta que decide a qualidade do modelo é: **onde cada método mora?** A regra é simples — o comportamento vai para quem tem os dados.',
      },
      {
        kind: 'compare',
        good: `// no Pedido
public double Total()
{
    double total = 0;
    foreach (var i in itens)
        total += i.Subtotal();
    return total;
}`,
        bad: `// no Program
double total = 0;
foreach (var i in pedido.Itens)
{
    total += i.Preco * i.Qtd;
}`,
        goodLabel: 'Lógica com o dono',
        badLabel: 'Lógica fora do dono',
      },
      {
        kind: 'text',
        body:
          'O sinal de alerta é um trecho que **pergunta muito** a um objeto antes de decidir algo. Se o `Program` precisa ler cinco propriedades de `Pedido` para calcular uma resposta, esse cálculo pertence ao `Pedido`.',
      },
      {
        kind: 'table',
        headers: ['Sintoma', 'O que significa', 'Correção'],
        rows: [
          ['classe só com dados', 'os verbos foram parar em outro lugar', 'mover os métodos para ela'],
          ['`Program` gigante', 'nada foi distribuído', 'perguntar de quem é cada trecho'],
          ['acesso em cadeia longa', 'a decisão está no lugar errado', 'pedir a resposta, não os dados'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A formulação clássica: **pergunte menos, peça mais**. Em vez de "me dê os itens para eu somar", diga "me dê o total". Quem tem os dados é quem sabe respondê-los.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Cuidado com o extremo oposto: uma classe que faz tudo. Se `Pedido` também formata relatórios, envia e-mails e grava em arquivo, ela virou o `Program` com outro nome. Cada classe tem **uma** responsabilidade.',
      },
    ],
    quiz: [
      {
        id: 's05c07l02q1',
        type: 'single',
        prompt: 'Onde um método deve morar?',
        options: [
          { id: 'a', text: 'Na classe que tem os dados de que ele precisa.', correct: true },
          { id: 'b', text: 'Sempre no `Program`.' },
          { id: 'c', text: 'Na classe com menos métodos.' },
          { id: 'd', text: 'Na classe base da hierarquia.' },
        ],
        explanation:
          'É a regra que evita tanto a classe anêmica quanto o `Program` inchado.',
      },
      {
        id: 's05c07l02q2',
        type: 'single',
        prompt: 'O que significa uma classe que só tem dados e nenhum comportamento?',
        options: [
          { id: 'a', text: 'Que os verbos dela foram parar em outro lugar.', correct: true },
          { id: 'b', text: 'Que ela está bem projetada.' },
          { id: 'c', text: 'Que ela deveria ser um enum.' },
          { id: 'd', text: 'Que ela precisa de herança.' },
        ],
        explanation:
          'É a "classe anêmica". Ela funciona, mas a lógica que deveria estar nela ficou espalhada em quem a usa.',
      },
      {
        id: 's05c07l02q3',
        type: 'single',
        prompt: 'O que quer dizer "pergunte menos, peça mais"?',
        options: [
          { id: 'a', text: 'Peça a resposta pronta em vez dos dados para calculá-la.', correct: true },
          { id: 'b', text: 'Reduza o número de propriedades públicas.' },
          { id: 'c', text: 'Use menos parâmetros nos métodos.' },
          { id: 'd', text: 'Evite propriedades de leitura.' },
        ],
        explanation:
          'Se você lê propriedades de um objeto só para tomar uma decisão sobre ele, essa decisão deveria ser um método dele.',
      },
    ],
    challenge: {
      brief:
        'Refatore um cálculo que está no `Main` movendo cada parte para a classe que tem os dados.',
      requirements: [
        '`Item` recebe descrição, preço unitário (`double`) e quantidade (`int`)',
        '`Item.Subtotal()` devolve preço vezes quantidade',
        '`Item.ToString()` devolve `descricao xN = R$ X.XX`, com duas casas',
        '`Carrinho` guarda itens em uma lista privada, sem expor a lista',
        '`Carrinho.Adicionar(Item i)` acrescenta',
        '`Carrinho.Total()` soma os subtotais',
        '`Carrinho.Quantidade()` soma as quantidades de todos os itens',
        '`Carrinho.MaisCaro()` devolve o item de maior subtotal, ou `null` se vazio',
        '`Carrinho.AplicarDesconto(double percentual)` devolve o total com o desconto aplicado',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare Item e Carrinho aqui

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Carrinho c = new Carrinho();

        for (int i = 0; i < n; i++)
        {
            string descricao = Console.ReadLine();
            double preco = double.Parse(Console.ReadLine());
            int qtd = int.Parse(Console.ReadLine());

            Item item = new Item(descricao, preco, qtd);
            c.Adicionar(item);
            Console.WriteLine(item);
        }

        Console.WriteLine($"Total: {c.Total():F2}");
        Console.WriteLine($"Pecas: {c.Quantidade()}");
        Console.WriteLine($"Mais caro: {c.MaisCaro()}");
        Console.WriteLine($"Com 10%: {c.AplicarDesconto(10):F2}");

        Carrinho vazio = new Carrinho();
        Console.WriteLine($"Vazio total: {vazio.Total():F2}");
        Console.WriteLine($"Vazio mais caro: {vazio.MaisCaro() == null}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Item
{
    public string Descricao { get; }
    public double Preco { get; }
    public int Quantidade { get; }

    public Item(string descricao, double preco, int quantidade)
    {
        Descricao = descricao;
        Preco = preco;
        Quantidade = quantidade;
    }

    public double Subtotal()
    {
        return Preco * Quantidade;
    }

    public override string ToString()
    {
        return $"{Descricao} x{Quantidade} = R$ {Subtotal():F2}";
    }
}

class Carrinho
{
    private List<Item> itens = new List<Item>();

    public void Adicionar(Item i)
    {
        itens.Add(i);
    }

    public double Total()
    {
        double total = 0;

        foreach (Item i in itens)
        {
            total += i.Subtotal();
        }

        return total;
    }

    public int Quantidade()
    {
        int total = 0;

        foreach (Item i in itens)
        {
            total += i.Quantidade;
        }

        return total;
    }

    public Item MaisCaro()
    {
        Item maior = null;

        foreach (Item i in itens)
        {
            if (maior == null || i.Subtotal() > maior.Subtotal())
            {
                maior = i;
            }
        }

        return maior;
    }

    public double AplicarDesconto(double percentual)
    {
        return Total() * (1 - percentual / 100);
    }
}

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Carrinho c = new Carrinho();

        for (int i = 0; i < n; i++)
        {
            string descricao = Console.ReadLine();
            double preco = double.Parse(Console.ReadLine());
            int qtd = int.Parse(Console.ReadLine());

            Item item = new Item(descricao, preco, qtd);
            c.Adicionar(item);
            Console.WriteLine(item);
        }

        Console.WriteLine($"Total: {c.Total():F2}");
        Console.WriteLine($"Pecas: {c.Quantidade()}");
        Console.WriteLine($"Mais caro: {c.MaisCaro()}");
        Console.WriteLine($"Com 10%: {c.AplicarDesconto(10):F2}");

        Carrinho vazio = new Carrinho();
        Console.WriteLine($"Vazio total: {vazio.Total():F2}");
        Console.WriteLine($"Vazio mais caro: {vazio.MaisCaro() == null}");
    }
}
`,
      hints: [
        'O `Carrinho` nunca expõe a lista: quem quiser um número pede o método correspondente.',
        'Para `MaisCaro`, mantenha uma variável do maior encontrado, começando em `null`.',
      ],
      tests: [
        {
          name: 'Carrinho com tres itens',
          stdin: '3\ncaneta\n2.50\n4\ncaderno\n15.00\n2\nmochila\n80.00\n1\n',
          expectedStdout:
            'caneta x4 = R$ 10.00\ncaderno x2 = R$ 30.00\nmochila x1 = R$ 80.00\n' +
            'Total: 120.00\nPecas: 7\nMais caro: mochila x1 = R$ 80.00\nCom 10%: 108.00\n' +
            'Vazio total: 0.00\nVazio mais caro: True',
        },
        {
          name: 'Um item so',
          stdin: '1\nlivro\n40.00\n3\n',
          expectedStdout:
            'livro x3 = R$ 120.00\n' +
            'Total: 120.00\nPecas: 3\nMais caro: livro x3 = R$ 120.00\nCom 10%: 108.00\n' +
            'Vazio total: 0.00\nVazio mais caro: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c07l03',
    title: 'Objetos que contêm objetos',
    objective: 'Montar hierarquias por composição, em que um objeto delega parte do trabalho a outro.',
    concept: [
      {
        kind: 'text',
        body:
          '**Composição** é um objeto ter outro como campo. É a forma mais comum de estruturar um modelo — e, na maioria dos casos, uma alternativa melhor que a herança.',
      },
      {
        kind: 'code',
        code: `class Pedido
{
    public Cliente Cliente { get; }      // pedido TEM UM cliente
    public Endereco Entrega { get; }     // pedido TEM UM endereco

    public string Resumo()
        => $"{Cliente.Nome} - {Entrega.Cidade}";   // delega
}`,
        caption: 'O pedido não sabe formatar um endereço: ele pergunta ao endereço.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Herança: "é um"',
          code: `class Gerente : Funcionario
{
    // gerente E UM funcionario
}`,
        },
        right: {
          label: 'Composição: "tem um"',
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
          'A recomendação clássica é **preferir composição a herança**. Composição é mais flexível: o objeto contido pode ser trocado, pode ser `null`, e não amarra o tipo a uma hierarquia inteira.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um objeto contido pode ser `null`, e o código que o usa precisa lidar com isso. Um pedido sem endereço de entrega é um caso real, não um erro — e ignorá-lo produz `NullReferenceException`.',
      },
      {
        kind: 'text',
        body:
          'A delegação é o que mantém as classes pequenas: cada uma resolve a sua parte e pede o resto a quem sabe. Um pedido que formatasse endereços saberia demais.',
      },
    ],
    quiz: [
      {
        id: 's05c07l03q1',
        type: 'single',
        prompt: 'O que é composição?',
        options: [
          { id: 'a', text: 'Um objeto ter outro como campo.', correct: true },
          { id: 'b', text: 'Uma classe herdar de outra.' },
          { id: 'c', text: 'Duas classes implementarem a mesma interface.' },
          { id: 'd', text: 'Uma classe abstrata com métodos concretos.' },
        ],
        explanation:
          'É a relação "tem um", em contraste com o "é um" da herança.',
      },
      {
        id: 's05c07l03q2',
        type: 'single',
        prompt: 'Por que preferir composição a herança?',
        options: [
          { id: 'a', text: 'Porque é mais flexível: o objeto contido pode ser trocado.', correct: true },
          { id: 'b', text: 'Porque é mais rápida.' },
          { id: 'c', text: 'Porque herança não permite polimorfismo.' },
          { id: 'd', text: 'Porque usa menos memória.' },
        ],
        explanation:
          'A herança amarra o tipo a uma hierarquia inteira e consome a única vaga de base. A composição não impõe nenhuma dessas restrições.',
      },
      {
        id: 's05c07l03q3',
        type: 'single',
        prompt: 'Qual cuidado a composição exige?',
        options: [
          { id: 'a', text: 'O objeto contido pode ser `null`.', correct: true },
          { id: 'b', text: 'O objeto contido precisa ser `sealed`.' },
          { id: 'c', text: 'Os dois tipos precisam implementar a mesma interface.' },
          { id: 'd', text: 'A profundidade não pode passar de dois níveis.' },
        ],
        explanation:
          'Diferente da herança, em que a parte da base sempre existe, um campo de referência pode estar vazio — e usá-lo sem verificar quebra o programa.',
      },
    ],
    challenge: {
      brief:
        'Monte um modelo por composição, com um objeto que delega parte do próprio texto a outros.',
      requirements: [
        '`Endereco` recebe rua, cidade e CEP; `ToString()` devolve `rua, cidade - cep`',
        '`Cliente` recebe nome e um `Endereco`, que pode ser `null`; `ToString()` devolve `nome`',
        '`Cliente.Localizacao` devolve a cidade do endereço, ou `sem endereco` quando ele é `null`',
        '`Encomenda` recebe código e um `Cliente`',
        '`Encomenda.Etiqueta()` devolve `[codigo] nome / endereco`, usando `sem endereco` quando não há',
        'Nenhuma classe formata dados de outra: cada uma delega',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare Endereco, Cliente e Encomenda aqui

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        string rua = Console.ReadLine();
        string cidade = Console.ReadLine();
        string cep = Console.ReadLine();
        string codigo = Console.ReadLine();

        Endereco e = new Endereco(rua, cidade, cep);
        Cliente comEndereco = new Cliente(nome, e);
        Cliente semEndereco = new Cliente("Anonimo", null);

        Console.WriteLine(e);
        Console.WriteLine(comEndereco);
        Console.WriteLine($"Localizacao: {comEndereco.Localizacao}");
        Console.WriteLine($"Sem: {semEndereco.Localizacao}");

        Encomenda a = new Encomenda(codigo, comEndereco);
        Encomenda b = new Encomenda(codigo + "B", semEndereco);

        Console.WriteLine(a.Etiqueta());
        Console.WriteLine(b.Etiqueta());
    }
}
`,
      solution: `using System;

class Endereco
{
    public string Rua { get; }
    public string Cidade { get; }
    public string Cep { get; }

    public Endereco(string rua, string cidade, string cep)
    {
        Rua = rua;
        Cidade = cidade;
        Cep = cep;
    }

    public override string ToString()
    {
        return $"{Rua}, {Cidade} - {Cep}";
    }
}

class Cliente
{
    public string Nome { get; }
    public Endereco Endereco { get; }

    public Cliente(string nome, Endereco endereco)
    {
        Nome = nome;
        Endereco = endereco;
    }

    public string Localizacao
    {
        get
        {
            if (Endereco == null)
            {
                return "sem endereco";
            }

            return Endereco.Cidade;
        }
    }

    public override string ToString()
    {
        return Nome;
    }
}

class Encomenda
{
    public string Codigo { get; }
    public Cliente Cliente { get; }

    public Encomenda(string codigo, Cliente cliente)
    {
        Codigo = codigo;
        Cliente = cliente;
    }

    public string Etiqueta()
    {
        string destino = Cliente.Endereco == null
            ? "sem endereco"
            : Cliente.Endereco.ToString();

        return $"[{Codigo}] {Cliente} / {destino}";
    }
}

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        string rua = Console.ReadLine();
        string cidade = Console.ReadLine();
        string cep = Console.ReadLine();
        string codigo = Console.ReadLine();

        Endereco e = new Endereco(rua, cidade, cep);
        Cliente comEndereco = new Cliente(nome, e);
        Cliente semEndereco = new Cliente("Anonimo", null);

        Console.WriteLine(e);
        Console.WriteLine(comEndereco);
        Console.WriteLine($"Localizacao: {comEndereco.Localizacao}");
        Console.WriteLine($"Sem: {semEndereco.Localizacao}");

        Encomenda a = new Encomenda(codigo, comEndereco);
        Encomenda b = new Encomenda(codigo + "B", semEndereco);

        Console.WriteLine(a.Etiqueta());
        Console.WriteLine(b.Etiqueta());
    }
}
`,
      hints: [
        'A `Etiqueta` usa o `ToString()` do cliente e o do endereço — ela não monta nenhum dos dois textos.',
        'Verifique o `null` antes de chamar qualquer coisa no endereço.',
      ],
      tests: [
        {
          name: 'Cliente com endereco',
          stdin: 'Ana\nRua A 100\nRecife\n50000-000\nE1\n',
          expectedStdout:
            'Rua A 100, Recife - 50000-000\nAna\nLocalizacao: Recife\nSem: sem endereco\n' +
            '[E1] Ana / Rua A 100, Recife - 50000-000\n[E1B] Anonimo / sem endereco',
        },
        {
          name: 'Outro cliente',
          stdin: 'Bruno\nAv B 20\nOlinda\n53000-111\nX9\n',
          expectedStdout:
            'Av B 20, Olinda - 53000-111\nBruno\nLocalizacao: Olinda\nSem: sem endereco\n' +
            '[X9] Bruno / Av B 20, Olinda - 53000-111\n[X9B] Anonimo / sem endereco',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c07l04',
    title: 'Coleções dentro de objetos',
    objective: 'Expor uma coleção interna sem entregar o controle dela para fora.',
    concept: [
      {
        kind: 'text',
        body:
          'Quase todo modelo tem um objeto que contém **muitos** outros: o pedido tem itens, a turma tem alunos, a conta tem transações. A questão é como expor isso.',
      },
      {
        kind: 'compare',
        good: `private List<Item> itens = new();

public int Quantidade => itens.Count;

public void Adicionar(Item i)
{
    if (i == null) return;
    itens.Add(i);
}`,
        bad: `public List<Item> Itens { get; }
    = new List<Item>();

// qualquer um faz:
pedido.Itens.Clear();
pedido.Itens.Add(null);`,
        goodLabel: 'Lista privada com porta de entrada',
        badLabel: 'Lista pública',
      },
      {
        kind: 'text',
        body:
          'Uma lista pública é uma propriedade `readonly` inútil: a **referência** não pode ser trocada, mas o **conteúdo** pode ser alterado por qualquer um. Toda a validação do capítulo 2 é contornada.',
      },
      {
        kind: 'table',
        headers: ['O que expor', 'Como', 'Permite alterar?'],
        rows: [
          ['a lista', '`public List<T> Itens`', '**sim** — evite'],
          ['a contagem', '`public int Quantidade`', 'não'],
          ['a leitura', '`IEnumerable<T>` ou `foreach`', 'não'],
          ['uma cópia', '`new List<T>(itens)`', 'não afeta o original'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Implementar `IEnumerable<T>`, do capítulo 5, é a solução mais elegante: quem usa consegue percorrer e aplicar LINQ, mas não consegue acrescentar nem remover nada.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Devolver a lista interna de um método de leitura tem o mesmo problema da propriedade pública. Se precisar devolver uma lista, devolva uma **cópia**.',
      },
    ],
    quiz: [
      {
        id: 's05c07l04q1',
        type: 'single',
        prompt: 'Qual é o problema de expor uma `List<T>` como propriedade pública de leitura?',
        options: [
          { id: 'a', text: 'A referência não muda, mas o conteúdo pode ser alterado por qualquer um.', correct: true },
          { id: 'b', text: 'Ela não pode ser percorrida.' },
          { id: 'c', text: 'Ela consome mais memória.' },
          { id: 'd', text: 'Não há problema.' },
        ],
        explanation:
          '`readonly` protege a variável, não o objeto apontado. `Add`, `Clear` e `Remove` continuam disponíveis para fora.',
      },
      {
        id: 's05c07l04q2',
        type: 'single',
        prompt: 'Qual é a forma mais elegante de permitir leitura sem permitir alteração?',
        options: [
          { id: 'a', text: 'Implementar `IEnumerable<T>`.', correct: true },
          { id: 'b', text: 'Tornar a lista `const`.' },
          { id: 'c', text: 'Usar um array em vez de lista.' },
          { id: 'd', text: 'Expor a lista com `private set`.' },
        ],
        explanation:
          'Quem recebe consegue percorrer e usar LINQ, mas a interface não tem `Add` nem `Remove`.',
      },
      {
        id: 's05c07l04q3',
        type: 'single',
        prompt: 'Se um método precisa devolver uma lista, o que fazer?',
        options: [
          { id: 'a', text: 'Devolver uma cópia.', correct: true },
          { id: 'b', text: 'Devolver a lista interna direto.' },
          { id: 'c', text: 'Devolver `null` quando vazia.' },
          { id: 'd', text: 'Tornar o método privado.' },
        ],
        explanation:
          'Devolver a lista interna é o mesmo furo da propriedade pública, só que escondido atrás de um método.',
      },
    ],
    challenge: {
      brief:
        'Escreva uma classe que contém uma coleção e a protege, permitindo leitura mas nunca alteração de fora.',
      requirements: [
        '`Playlist` recebe o nome no construtor e guarda faixas em uma lista privada',
        '`Adicionar(string faixa)` acrescenta, ignorando vazios e duplicatas',
        '`Remover(string faixa)` remove e devolve se conseguiu',
        '`Total` é uma propriedade de leitura com a quantidade',
        '`Faixas` devolve uma **cópia** da lista interna',
        '`Playlist` implementa `IEnumerable<string>` para permitir `foreach` e LINQ',
        'A lista interna nunca é exposta diretamente',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

// Declare a classe Playlist aqui

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        int n = int.Parse(Console.ReadLine());

        Playlist p = new Playlist(nome);

        for (int i = 0; i < n; i++)
        {
            p.Adicionar(Console.ReadLine());
        }

        Console.WriteLine($"{nome}: {p.Total} faixas");
        Console.WriteLine($"Conteudo: {string.Join(" | ", p)}");

        List<string> copia = p.Faixas();
        copia.Clear();
        copia.Add("invasor");

        Console.WriteLine($"Apos mexer na copia: {p.Total} faixas");
        Console.WriteLine($"Ordenadas: {string.Join(" ", p.OrderBy(f => f))}");
        Console.WriteLine($"Removeu inexistente: {p.Remover("nao existe")}");

        string primeira = p.Faixas()[0];
        Console.WriteLine($"Removeu {primeira}: {p.Remover(primeira)}");
        Console.WriteLine($"Final: {p.Total} faixas");
    }
}
`,
      solution: `using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

class Playlist : IEnumerable<string>
{
    private List<string> faixas = new List<string>();

    public string Nome { get; }

    public Playlist(string nome)
    {
        Nome = nome;
    }

    public int Total => faixas.Count;

    public void Adicionar(string faixa)
    {
        if (faixa == null || faixa.Trim().Length == 0)
        {
            return;
        }

        if (faixas.Contains(faixa))
        {
            return;
        }

        faixas.Add(faixa);
    }

    public bool Remover(string faixa)
    {
        return faixas.Remove(faixa);
    }

    public List<string> Faixas()
    {
        return new List<string>(faixas);
    }

    public IEnumerator<string> GetEnumerator()
    {
        return faixas.GetEnumerator();
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        int n = int.Parse(Console.ReadLine());

        Playlist p = new Playlist(nome);

        for (int i = 0; i < n; i++)
        {
            p.Adicionar(Console.ReadLine());
        }

        Console.WriteLine($"{nome}: {p.Total} faixas");
        Console.WriteLine($"Conteudo: {string.Join(" | ", p)}");

        List<string> copia = p.Faixas();
        copia.Clear();
        copia.Add("invasor");

        Console.WriteLine($"Apos mexer na copia: {p.Total} faixas");
        Console.WriteLine($"Ordenadas: {string.Join(" ", p.OrderBy(f => f))}");
        Console.WriteLine($"Removeu inexistente: {p.Remover("nao existe")}");

        string primeira = p.Faixas()[0];
        Console.WriteLine($"Removeu {primeira}: {p.Remover(primeira)}");
        Console.WriteLine($"Final: {p.Total} faixas");
    }
}
`,
      hints: [
        '`new List<string>(faixas)` cria uma lista nova com os mesmos elementos.',
        '`List.Remove` já devolve `bool` indicando se o elemento estava lá.',
      ],
      tests: [
        {
          name: 'Playlist com duplicata',
          stdin: 'Favoritas\n4\numa\nduas\numa\ntres\n',
          expectedStdout:
            'Favoritas: 3 faixas\nConteudo: uma | duas | tres\nApos mexer na copia: 3 faixas\n' +
            'Ordenadas: duas tres uma\nRemoveu inexistente: False\n' +
            'Removeu uma: True\nFinal: 2 faixas',
        },
        {
          name: 'Playlist com entrada vazia',
          stdin: 'Estudo\n3\nalfa\n\nbeta\n',
          expectedStdout:
            'Estudo: 2 faixas\nConteudo: alfa | beta\nApos mexer na copia: 2 faixas\n' +
            'Ordenadas: alfa beta\nRemoveu inexistente: False\n' +
            'Removeu alfa: True\nFinal: 1 faixas',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c07l05',
    title: 'Modelando um banco',
    objective: 'Aplicar herança, encapsulamento e composição juntos em um domínio com regras reais.',
    concept: [
      {
        kind: 'text',
        body:
          'Um banco é o exemplo clássico porque reúne tudo: contas com **regras diferentes** (herança), saldo que não pode ser alterado de fora (encapsulamento), e um histórico de operações (composição com coleção).',
      },
      {
        kind: 'code',
        code: `abstract class Conta
{
    public decimal Saldo { get; private set; }   // so a classe altera

    public bool Sacar(decimal valor)
    {
        if (valor <= 0 || !PodeSacar(valor)) return false;
        Saldo -= valor;
        return true;
    }

    protected abstract bool PodeSacar(decimal valor);   // cada tipo decide
}`,
        caption: 'O template method do capítulo 4: o fluxo é comum, a regra varia.',
      },
      {
        kind: 'table',
        headers: ['Tipo de conta', 'Regra de saque'],
        rows: [
          ['corrente', 'permite negativar até o limite'],
          ['poupança', 'nunca fica negativa'],
          ['salário', 'nunca negativa e no máximo N saques'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que `Sacar` valida o valor **uma vez só**, na base. Se cada derivada repetisse essa verificação, a regra estaria em três lugares — e um dia elas divergiriam.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Dinheiro em `double` acumula erro de arredondamento. Use `decimal`, que é feito para valores monetários — ou trabalhe em centavos inteiros, como fez o `readonly struct` do capítulo 6.',
      },
      {
        kind: 'text',
        body:
          'Uma transferência é uma operação entre **duas** contas. Ela não pertence a nenhuma delas isoladamente — normalmente mora em quem conhece as duas, como o banco.',
      },
    ],
    quiz: [
      {
        id: 's05c07l05q1',
        type: 'single',
        prompt: 'Por que `Saldo` tem `private set`?',
        options: [
          { id: 'a', text: 'Para que só as operações da própria classe alterem o valor.', correct: true },
          { id: 'b', text: 'Para economizar memória.' },
          { id: 'c', text: 'Porque `decimal` exige.' },
          { id: 'd', text: 'Para permitir herança.' },
        ],
        explanation:
          'Se o saldo fosse público para escrita, qualquer código poderia mudar o dinheiro sem passar pelas regras de saque e depósito.',
      },
      {
        id: 's05c07l05q2',
        type: 'single',
        prompt: 'Por que a validação do valor fica na classe base?',
        options: [
          { id: 'a', text: 'Para não repetir a mesma regra em cada derivada.', correct: true },
          { id: 'b', text: 'Porque derivadas não podem validar.' },
          { id: 'c', text: 'Porque `abstract` exige.' },
          { id: 'd', text: 'Por questão de desempenho.' },
        ],
        explanation:
          'É o template method: o que é comum fica na base, o que varia vira um método abstrato.',
      },
      {
        id: 's05c07l05q3',
        type: 'single',
        prompt: 'Onde mora uma transferência entre duas contas?',
        options: [
          { id: 'a', text: 'Em quem conhece as duas, como o banco.', correct: true },
          { id: 'b', text: 'Na conta de origem.' },
          { id: 'c', text: 'Na conta de destino.' },
          { id: 'd', text: 'Na classe base `Conta`.' },
        ],
        explanation:
          'Uma operação entre dois objetos não pertence a nenhum deles sozinho. Ela vai para o objeto que coordena os dois.',
      },
    ],
    challenge: {
      brief:
        'Modele contas com regras de saque diferentes, saldo protegido e um banco que coordena transferências.',
      requirements: [
        '`Conta` é abstrata, recebe titular no construtor, começa com saldo `0` e expõe `Titular` e `Saldo` (`decimal`, só leitura de fora)',
        '`Depositar(decimal valor)` só aceita valores positivos e devolve se conseguiu',
        '`Sacar(decimal valor)` rejeita valores não positivos e delega a regra a `PodeSacar`, que é `protected abstract`',
        '`ToString()` devolve `tipo titular: R$ X.XX`, usando `GetType().Name` e duas casas',
        '`ContaCorrente` recebe titular e limite; permite negativar até `-limite`',
        '`Poupanca` recebe apenas titular; nunca fica negativa',
        '`Banco` guarda contas em lista privada, com `Abrir(Conta c)` e `Transferir(Conta de, Conta para, decimal valor)`',
        '`Transferir` só move o dinheiro se o saque der certo, e devolve se conseguiu',
        '`Banco.Total` soma os saldos de todas as contas',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare Conta, ContaCorrente, Poupanca e Banco aqui

class Program
{
    static void Main()
    {
        string titular = Console.ReadLine();
        decimal limite = decimal.Parse(Console.ReadLine());
        decimal deposito = decimal.Parse(Console.ReadLine());
        decimal saque = decimal.Parse(Console.ReadLine());

        ContaCorrente cc = new ContaCorrente(titular, limite);
        Poupanca pp = new Poupanca(titular);

        Banco banco = new Banco();
        banco.Abrir(cc);
        banco.Abrir(pp);

        Console.WriteLine($"Deposito: {cc.Depositar(deposito)}");
        Console.WriteLine($"Deposito negativo: {cc.Depositar(-10)}");
        Console.WriteLine(cc);

        Console.WriteLine($"Saque: {cc.Sacar(saque)}");
        Console.WriteLine(cc);

        Console.WriteLine($"Transferencia: {banco.Transferir(cc, pp, 50)}");
        Console.WriteLine(cc);
        Console.WriteLine(pp);

        Console.WriteLine($"Saque da poupanca alem do saldo: {pp.Sacar(9999)}");
        Console.WriteLine($"Total do banco: {banco.Total:F2}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

abstract class Conta
{
    public string Titular { get; }
    public decimal Saldo { get; private set; }

    protected Conta(string titular)
    {
        Titular = titular;
        Saldo = 0;
    }

    public bool Depositar(decimal valor)
    {
        if (valor <= 0)
        {
            return false;
        }

        Saldo += valor;
        return true;
    }

    public bool Sacar(decimal valor)
    {
        if (valor <= 0)
        {
            return false;
        }

        if (!PodeSacar(valor))
        {
            return false;
        }

        Saldo -= valor;
        return true;
    }

    protected abstract bool PodeSacar(decimal valor);

    public override string ToString()
    {
        return $"{GetType().Name} {Titular}: R$ {Saldo:F2}";
    }
}

class ContaCorrente : Conta
{
    private decimal limite;

    public ContaCorrente(string titular, decimal limite)
        : base(titular)
    {
        this.limite = limite;
    }

    protected override bool PodeSacar(decimal valor)
    {
        return Saldo - valor >= -limite;
    }
}

class Poupanca : Conta
{
    public Poupanca(string titular)
        : base(titular)
    {
    }

    protected override bool PodeSacar(decimal valor)
    {
        return Saldo - valor >= 0;
    }
}

class Banco
{
    private List<Conta> contas = new List<Conta>();

    public void Abrir(Conta c)
    {
        if (c == null)
        {
            return;
        }

        contas.Add(c);
    }

    public bool Transferir(Conta de, Conta para, decimal valor)
    {
        if (de == null || para == null)
        {
            return false;
        }

        if (!de.Sacar(valor))
        {
            return false;
        }

        para.Depositar(valor);
        return true;
    }

    public decimal Total
    {
        get
        {
            decimal soma = 0;

            foreach (Conta c in contas)
            {
                soma += c.Saldo;
            }

            return soma;
        }
    }
}

class Program
{
    static void Main()
    {
        string titular = Console.ReadLine();
        decimal limite = decimal.Parse(Console.ReadLine());
        decimal deposito = decimal.Parse(Console.ReadLine());
        decimal saque = decimal.Parse(Console.ReadLine());

        ContaCorrente cc = new ContaCorrente(titular, limite);
        Poupanca pp = new Poupanca(titular);

        Banco banco = new Banco();
        banco.Abrir(cc);
        banco.Abrir(pp);

        Console.WriteLine($"Deposito: {cc.Depositar(deposito)}");
        Console.WriteLine($"Deposito negativo: {cc.Depositar(-10)}");
        Console.WriteLine(cc);

        Console.WriteLine($"Saque: {cc.Sacar(saque)}");
        Console.WriteLine(cc);

        Console.WriteLine($"Transferencia: {banco.Transferir(cc, pp, 50)}");
        Console.WriteLine(cc);
        Console.WriteLine(pp);

        Console.WriteLine($"Saque da poupanca alem do saldo: {pp.Sacar(9999)}");
        Console.WriteLine($"Total do banco: {banco.Total:F2}");
    }
}
`,
      hints: [
        '`PodeSacar` responde apenas se o saldo suporta — quem subtrai é o `Sacar` da base.',
        'A transferência é um saque seguido de um depósito, e só continua se o saque der certo.',
      ],
      tests: [
        {
          name: 'Corrente com limite',
          stdin: 'Ana\n200\n300\n400\n',
          expectedStdout:
            'Deposito: True\nDeposito negativo: False\nContaCorrente Ana: R$ 300.00\n' +
            'Saque: True\nContaCorrente Ana: R$ -100.00\n' +
            'Transferencia: True\nContaCorrente Ana: R$ -150.00\nPoupanca Ana: R$ 50.00\n' +
            'Saque da poupanca alem do saldo: False\nTotal do banco: -100.00',
        },
        {
          name: 'Saque alem do limite',
          stdin: 'Bruno\n50\n100\n500\n',
          expectedStdout:
            'Deposito: True\nDeposito negativo: False\nContaCorrente Bruno: R$ 100.00\n' +
            'Saque: False\nContaCorrente Bruno: R$ 100.00\n' +
            'Transferencia: True\nContaCorrente Bruno: R$ 50.00\nPoupanca Bruno: R$ 50.00\n' +
            'Saque da poupanca alem do saldo: False\nTotal do banco: 100.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c07l06',
    title: 'Modelando uma biblioteca',
    objective: 'Distinguir o item do catálogo do exemplar físico, e modelar o empréstimo como uma relação.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma biblioteca ensina uma distinção que aparece em quase todo domínio: a diferença entre o **tipo de coisa** e a **coisa específica**.',
      },
      {
        kind: 'table',
        headers: ['Conceito', 'É', 'Quantos'],
        rows: [
          ['`Livro`', 'título, autor, ISBN', 'um por obra'],
          ['`Exemplar`', 'uma cópia física do livro', 'vários por obra'],
          ['`Emprestimo`', 'quem pegou qual exemplar', 'um por empréstimo'],
        ],
      },
      {
        kind: 'text',
        body:
          'Confundir os dois é o erro clássico. Se `Livro` tiver a propriedade `Emprestado`, a biblioteca não consegue ter duas cópias da mesma obra — algo que toda biblioteca real tem.',
      },
      {
        kind: 'code',
        code: `class Livro          { public string Titulo; public string Isbn; }
class Exemplar      { public Livro Obra; public bool Disponivel; }
class Emprestimo    { public Exemplar Copia; public string Leitor; }`,
        caption: 'Cada nível aponta para o anterior por composição.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O `Emprestimo` é a modelagem de uma **relação** entre duas coisas. Sempre que uma associação tem dados próprios — data, prazo, quem autorizou —, ela merece virar uma classe.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A disponibilidade é uma propriedade do **exemplar**, não do livro. Perguntar "esse livro está disponível?" na verdade quer dizer "existe algum exemplar dele disponível?", e essa é uma consulta ao acervo.',
      },
    ],
    quiz: [
      {
        id: 's05c07l06q1',
        type: 'single',
        prompt: 'Por que separar `Livro` de `Exemplar`?',
        options: [
          { id: 'a', text: 'Porque a biblioteca pode ter várias cópias da mesma obra.', correct: true },
          { id: 'b', text: 'Para reduzir o tamanho das classes.' },
          { id: 'c', text: 'Porque um livro não tem comportamento.' },
          { id: 'd', text: 'Por convenção de nomenclatura.' },
        ],
        explanation:
          'O livro é a obra; o exemplar é o objeto físico que se empresta. Sem a separação, três cópias do mesmo título seriam impossíveis de representar.',
      },
      {
        id: 's05c07l06q2',
        type: 'single',
        prompt: 'Quando uma associação entre dois objetos merece virar uma classe?',
        options: [
          { id: 'a', text: 'Quando ela tem dados próprios, como data ou prazo.', correct: true },
          { id: 'b', text: 'Sempre.' },
          { id: 'c', text: 'Quando envolve mais de dois objetos.' },
          { id: 'd', text: 'Quando os dois objetos são da mesma hierarquia.' },
        ],
        explanation:
          'Uma associação sem dados pode ser só uma referência. Com dados próprios, ela é uma entidade — como o empréstimo.',
      },
      {
        id: 's05c07l06q3',
        type: 'single',
        prompt: 'De quem é a propriedade "disponível"?',
        options: [
          { id: 'a', text: 'Do exemplar.', correct: true },
          { id: 'b', text: 'Do livro.' },
          { id: 'c', text: 'Do empréstimo.' },
          { id: 'd', text: 'Da biblioteca.' },
        ],
        explanation:
          'Cada cópia física está emprestada ou não. A disponibilidade de um título é uma consulta derivada: existe algum exemplar livre?',
      },
    ],
    challenge: {
      brief:
        'Modele um acervo em que a mesma obra tem vários exemplares, e o empréstimo registra quem levou qual cópia.',
      requirements: [
        '`Livro` recebe título e ISBN; `ToString()` devolve `titulo (isbn)`',
        '`Exemplar` recebe o `Livro` e um número de tombo (`int`), começa disponível',
        '`Exemplar.ToString()` devolve `tombo N: titulo`',
        '`Emprestimo` recebe o `Exemplar` e o nome do leitor; `ToString()` devolve `leitor <- tombo N`',
        '`Biblioteca` guarda exemplares e empréstimos em listas privadas',
        '`Registrar(Livro obra, int copias)` cria os exemplares com tombos sequenciais a partir de 1 no acervo inteiro',
        '`Emprestar(string isbn, string leitor)` pega o **primeiro** exemplar disponível daquele ISBN, marca como indisponível, registra o empréstimo e o devolve; sem exemplar livre, devolve `null`',
        '`Devolver(int tombo)` marca o exemplar como disponível de novo e devolve se conseguiu',
        '`Disponiveis(string isbn)` conta os exemplares livres daquele ISBN',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare Livro, Exemplar, Emprestimo e Biblioteca aqui

class Program
{
    static void Main()
    {
        string titulo = Console.ReadLine();
        string isbn = Console.ReadLine();
        int copias = int.Parse(Console.ReadLine());

        Livro obra = new Livro(titulo, isbn);
        Biblioteca b = new Biblioteca();
        b.Registrar(obra, copias);

        Console.WriteLine(obra);
        Console.WriteLine($"Disponiveis: {b.Disponiveis(isbn)}");

        Emprestimo e1 = b.Emprestar(isbn, "Ana");
        Console.WriteLine(e1);
        Console.WriteLine($"Disponiveis: {b.Disponiveis(isbn)}");

        Emprestimo e2 = b.Emprestar(isbn, "Bruno");
        Console.WriteLine(e2 == null ? "sem exemplar" : e2.ToString());
        Console.WriteLine($"Disponiveis: {b.Disponiveis(isbn)}");

        Console.WriteLine($"Devolveu 1: {b.Devolver(1)}");
        Console.WriteLine($"Devolveu 99: {b.Devolver(99)}");
        Console.WriteLine($"Disponiveis: {b.Disponiveis(isbn)}");
        Console.WriteLine($"Outro isbn: {b.Disponiveis("000")}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Livro
{
    public string Titulo { get; }
    public string Isbn { get; }

    public Livro(string titulo, string isbn)
    {
        Titulo = titulo;
        Isbn = isbn;
    }

    public override string ToString()
    {
        return $"{Titulo} ({Isbn})";
    }
}

class Exemplar
{
    public Livro Obra { get; }
    public int Tombo { get; }
    public bool Disponivel { get; set; }

    public Exemplar(Livro obra, int tombo)
    {
        Obra = obra;
        Tombo = tombo;
        Disponivel = true;
    }

    public override string ToString()
    {
        return $"tombo {Tombo}: {Obra.Titulo}";
    }
}

class Emprestimo
{
    public Exemplar Copia { get; }
    public string Leitor { get; }

    public Emprestimo(Exemplar copia, string leitor)
    {
        Copia = copia;
        Leitor = leitor;
    }

    public override string ToString()
    {
        return $"{Leitor} <- tombo {Copia.Tombo}";
    }
}

class Biblioteca
{
    private List<Exemplar> exemplares = new List<Exemplar>();
    private List<Emprestimo> emprestimos = new List<Emprestimo>();

    public void Registrar(Livro obra, int copias)
    {
        for (int i = 0; i < copias; i++)
        {
            exemplares.Add(new Exemplar(obra, exemplares.Count + 1));
        }
    }

    public Emprestimo Emprestar(string isbn, string leitor)
    {
        foreach (Exemplar e in exemplares)
        {
            if (e.Obra.Isbn == isbn && e.Disponivel)
            {
                e.Disponivel = false;
                Emprestimo emprestimo = new Emprestimo(e, leitor);
                emprestimos.Add(emprestimo);
                return emprestimo;
            }
        }

        return null;
    }

    public bool Devolver(int tombo)
    {
        foreach (Exemplar e in exemplares)
        {
            if (e.Tombo == tombo && !e.Disponivel)
            {
                e.Disponivel = true;
                return true;
            }
        }

        return false;
    }

    public int Disponiveis(string isbn)
    {
        int total = 0;

        foreach (Exemplar e in exemplares)
        {
            if (e.Obra.Isbn == isbn && e.Disponivel)
            {
                total++;
            }
        }

        return total;
    }
}

class Program
{
    static void Main()
    {
        string titulo = Console.ReadLine();
        string isbn = Console.ReadLine();
        int copias = int.Parse(Console.ReadLine());

        Livro obra = new Livro(titulo, isbn);
        Biblioteca b = new Biblioteca();
        b.Registrar(obra, copias);

        Console.WriteLine(obra);
        Console.WriteLine($"Disponiveis: {b.Disponiveis(isbn)}");

        Emprestimo e1 = b.Emprestar(isbn, "Ana");
        Console.WriteLine(e1);
        Console.WriteLine($"Disponiveis: {b.Disponiveis(isbn)}");

        Emprestimo e2 = b.Emprestar(isbn, "Bruno");
        Console.WriteLine(e2 == null ? "sem exemplar" : e2.ToString());
        Console.WriteLine($"Disponiveis: {b.Disponiveis(isbn)}");

        Console.WriteLine($"Devolveu 1: {b.Devolver(1)}");
        Console.WriteLine($"Devolveu 99: {b.Devolver(99)}");
        Console.WriteLine($"Disponiveis: {b.Disponiveis(isbn)}");
        Console.WriteLine($"Outro isbn: {b.Disponiveis("000")}");
    }
}
`,
      hints: [
        'O tombo é sequencial no acervo inteiro, então use a contagem atual de exemplares mais um.',
        '`Emprestar` percorre os exemplares em ordem e para no primeiro que serve.',
      ],
      tests: [
        {
          name: 'Uma copia so',
          stdin: 'Dom Casmurro\n978-1\n1\n',
          expectedStdout:
            'Dom Casmurro (978-1)\nDisponiveis: 1\nAna <- tombo 1\nDisponiveis: 0\n' +
            'sem exemplar\nDisponiveis: 0\nDevolveu 1: True\nDevolveu 99: False\n' +
            'Disponiveis: 1\nOutro isbn: 0',
        },
        {
          name: 'Duas copias',
          stdin: 'Memorias\n978-2\n2\n',
          expectedStdout:
            'Memorias (978-2)\nDisponiveis: 2\nAna <- tombo 1\nDisponiveis: 1\n' +
            'Bruno <- tombo 2\nDisponiveis: 0\nDevolveu 1: True\nDevolveu 99: False\n' +
            'Disponiveis: 1\nOutro isbn: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c07l07',
    title: 'Modelando um e-commerce',
    objective: 'Separar o catálogo do carrinho e do pedido, e entender por que o preço precisa ser congelado.',
    concept: [
      {
        kind: 'text',
        body:
          'Um e-commerce parece simples até você notar que o **preço muda com o tempo**. Um pedido de ontem não pode ser recalculado com o preço de hoje.',
      },
      {
        kind: 'table',
        headers: ['Tipo', 'Representa', 'Muda com o tempo?'],
        rows: [
          ['`Produto`', 'o item do catálogo', '**sim** — preço, estoque'],
          ['`ItemCarrinho`', 'intenção de compra', 'sim — quantidade'],
          ['`ItemPedido`', 'o que foi comprado', '**não** — congelado'],
        ],
      },
      {
        kind: 'compare',
        good: `class ItemPedido
{
    public string Nome;
    public decimal PrecoPago;
    public int Qtd;

    public decimal Total()
        => PrecoPago * Qtd;
}`,
        bad: `class ItemPedido
{
    public Produto Produto;
    public int Qtd;

    // o total muda quando
    // o preco do catalogo muda
    public decimal Total()
        => Produto.Preco * Qtd;
}`,
        goodLabel: 'Pedido copia o preço',
        badLabel: 'Pedido aponta para o produto',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Congelar o preço no momento da compra é um exemplo de dado **histórico**: ele registra o que aconteceu, não o que é verdade agora. Confundir os dois gera bugs difíceis de reproduzir.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O carrinho e o pedido parecem iguais e não são. O carrinho é temporário e mutável; o pedido é definitivo e imutável. Usar a mesma classe para os dois faz o pedido herdar a mutabilidade que ele não deveria ter.',
      },
      {
        kind: 'text',
        body:
          'A conversão de carrinho em pedido é o momento em que os dados são copiados. Depois disso, o pedido é independente do catálogo e do carrinho.',
      },
    ],
    quiz: [
      {
        id: 's05c07l07q1',
        type: 'single',
        prompt: 'Por que o item do pedido copia o preço em vez de apontar para o produto?',
        options: [
          { id: 'a', text: 'Porque o preço do catálogo muda, e o pedido registra o que foi pago.', correct: true },
          { id: 'b', text: 'Para economizar memória.' },
          { id: 'c', text: 'Porque produtos não podem ser referenciados.' },
          { id: 'd', text: 'Para permitir ordenação.' },
        ],
        explanation:
          'Um pedido é um registro histórico. Se ele apontasse para o produto, uma promoção de amanhã mudaria o valor de uma compra de ontem.',
      },
      {
        id: 's05c07l07q2',
        type: 'single',
        prompt: 'Qual é a diferença entre carrinho e pedido?',
        options: [
          { id: 'a', text: 'O carrinho é temporário e mutável; o pedido é definitivo e imutável.', correct: true },
          { id: 'b', text: 'Nenhuma: só o nome.' },
          { id: 'c', text: 'O carrinho não tem itens.' },
          { id: 'd', text: 'O pedido não tem total.' },
        ],
        explanation:
          'Usar a mesma classe para os dois faz o pedido herdar uma mutabilidade que ele não deveria ter.',
      },
      {
        id: 's05c07l07q3',
        type: 'single',
        prompt: 'O que é um dado histórico?',
        options: [
          { id: 'a', text: 'Um que registra o que aconteceu, não o que é verdade agora.', correct: true },
          { id: 'b', text: 'Um que fica em um arquivo separado.' },
          { id: 'c', text: 'Um que só pode ser lido.' },
          { id: 'd', text: 'Um que tem data de criação.' },
        ],
        explanation:
          'Preço pago, endereço de entrega na época, nome do cliente na época — todos precisam ser congelados no momento do registro.',
      },
    ],
    challenge: {
      brief:
        'Modele catálogo, carrinho e pedido, congelando o preço no momento em que o pedido é fechado.',
      requirements: [
        '`Produto` recebe nome e preço (`decimal`); `Preco` tem `set` público para simular mudanças de catálogo',
        '`ItemCarrinho` recebe o `Produto` e a quantidade; `Subtotal()` usa o preço **atual** do produto',
        '`ItemPedido` recebe nome, preço pago e quantidade — sem referência ao produto; `Subtotal()` usa o preço pago',
        '`ItemPedido.ToString()` devolve `nome xN a R$ X.XX`',
        '`Carrinho` guarda itens em lista privada, com `Adicionar(Produto p, int qtd)` e `Total()`',
        '`Carrinho.Fechar()` devolve um `Pedido` com os itens convertidos em `ItemPedido`, congelando os preços',
        '`Pedido` recebe a lista de itens no construtor, expõe `Total()` e `Quantidade`, e não permite acrescentar itens',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare Produto, ItemCarrinho, ItemPedido, Carrinho e Pedido aqui

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        decimal preco = decimal.Parse(Console.ReadLine());
        int qtd = int.Parse(Console.ReadLine());
        decimal novoPreco = decimal.Parse(Console.ReadLine());

        Produto p = new Produto(nome, preco);

        Carrinho c = new Carrinho();
        c.Adicionar(p, qtd);

        Console.WriteLine($"Carrinho: {c.Total():F2}");

        Pedido pedido = c.Fechar();
        Console.WriteLine($"Pedido: {pedido.Total():F2}");
        Console.WriteLine($"Itens: {pedido.Quantidade}");

        foreach (ItemPedido item in pedido.Itens)
        {
            Console.WriteLine(item);
        }

        p.Preco = novoPreco;

        Console.WriteLine($"Carrinho apos mudanca: {c.Total():F2}");
        Console.WriteLine($"Pedido apos mudanca: {pedido.Total():F2}");
        Console.WriteLine($"Catalogo agora: {p.Preco:F2}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Produto
{
    public string Nome { get; }
    public decimal Preco { get; set; }

    public Produto(string nome, decimal preco)
    {
        Nome = nome;
        Preco = preco;
    }
}

class ItemCarrinho
{
    public Produto Produto { get; }
    public int Quantidade { get; }

    public ItemCarrinho(Produto produto, int quantidade)
    {
        Produto = produto;
        Quantidade = quantidade;
    }

    public decimal Subtotal()
    {
        return Produto.Preco * Quantidade;
    }
}

class ItemPedido
{
    public string Nome { get; }
    public decimal PrecoPago { get; }
    public int Quantidade { get; }

    public ItemPedido(string nome, decimal precoPago, int quantidade)
    {
        Nome = nome;
        PrecoPago = precoPago;
        Quantidade = quantidade;
    }

    public decimal Subtotal()
    {
        return PrecoPago * Quantidade;
    }

    public override string ToString()
    {
        return $"{Nome} x{Quantidade} a R$ {PrecoPago:F2}";
    }
}

class Carrinho
{
    private List<ItemCarrinho> itens = new List<ItemCarrinho>();

    public void Adicionar(Produto p, int qtd)
    {
        if (p == null || qtd <= 0)
        {
            return;
        }

        itens.Add(new ItemCarrinho(p, qtd));
    }

    public decimal Total()
    {
        decimal total = 0;

        foreach (ItemCarrinho i in itens)
        {
            total += i.Subtotal();
        }

        return total;
    }

    public Pedido Fechar()
    {
        List<ItemPedido> congelados = new List<ItemPedido>();

        foreach (ItemCarrinho i in itens)
        {
            congelados.Add(new ItemPedido(i.Produto.Nome, i.Produto.Preco, i.Quantidade));
        }

        return new Pedido(congelados);
    }
}

class Pedido
{
    private List<ItemPedido> itens;

    public Pedido(List<ItemPedido> itens)
    {
        this.itens = new List<ItemPedido>(itens);
    }

    public List<ItemPedido> Itens => new List<ItemPedido>(itens);

    public int Quantidade => itens.Count;

    public decimal Total()
    {
        decimal total = 0;

        foreach (ItemPedido i in itens)
        {
            total += i.Subtotal();
        }

        return total;
    }
}

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        decimal preco = decimal.Parse(Console.ReadLine());
        int qtd = int.Parse(Console.ReadLine());
        decimal novoPreco = decimal.Parse(Console.ReadLine());

        Produto p = new Produto(nome, preco);

        Carrinho c = new Carrinho();
        c.Adicionar(p, qtd);

        Console.WriteLine($"Carrinho: {c.Total():F2}");

        Pedido pedido = c.Fechar();
        Console.WriteLine($"Pedido: {pedido.Total():F2}");
        Console.WriteLine($"Itens: {pedido.Quantidade}");

        foreach (ItemPedido item in pedido.Itens)
        {
            Console.WriteLine(item);
        }

        p.Preco = novoPreco;

        Console.WriteLine($"Carrinho apos mudanca: {c.Total():F2}");
        Console.WriteLine($"Pedido apos mudanca: {pedido.Total():F2}");
        Console.WriteLine($"Catalogo agora: {p.Preco:F2}");
    }
}
`,
      hints: [
        'O `Fechar` é o momento da cópia: ele lê nome e preço do produto e guarda os valores no `ItemPedido`.',
        'O `Pedido` copia a lista recebida no construtor, para que ninguém a altere de fora depois.',
      ],
      tests: [
        {
          name: 'Preco sobe apos a compra',
          stdin: 'teclado\n150.00\n2\n200.00\n',
          expectedStdout:
            'Carrinho: 300.00\nPedido: 300.00\nItens: 1\nteclado x2 a R$ 150.00\n' +
            'Carrinho apos mudanca: 400.00\nPedido apos mudanca: 300.00\nCatalogo agora: 200.00',
        },
        {
          name: 'Preco cai apos a compra',
          stdin: 'mouse\n80.00\n3\n50.00\n',
          expectedStdout:
            'Carrinho: 240.00\nPedido: 240.00\nItens: 1\nmouse x3 a R$ 80.00\n' +
            'Carrinho apos mudanca: 150.00\nPedido apos mudanca: 240.00\nCatalogo agora: 50.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c07l08',
    title: 'Modelando combate de RPG',
    objective: 'Usar polimorfismo para variar comportamento de combate sem espalhar condicionais.',
    concept: [
      {
        kind: 'text',
        body:
          'Um sistema de combate é o terreno natural do polimorfismo: cada classe de personagem ataca de um jeito, mas o laço de combate é sempre o mesmo.',
      },
      {
        kind: 'code',
        code: `abstract class Personagem
{
    public int Vida { get; protected set; }

    public abstract int Dano();

    public void Atacar(Personagem alvo)
    {
        alvo.Receber(Dano());          // o laco nao sabe quem ataca
    }
}`,
        caption: 'Cada derivada define `Dano()`; o `Atacar` é escrito uma vez só.',
      },
      {
        kind: 'compare',
        good: `int dano = p.Dano();

// cada classe nova
// e uma classe nova,
// e nada mais muda`,
        bad: `int dano;
if (p.Classe == "guerreiro")
    dano = p.Forca * 2;
else if (p.Classe == "mago")
    dano = p.Magia * 3;
// cada classe nova
// mexe nesse if`,
        goodLabel: 'Polimorfismo',
        badLabel: 'Condicional por tipo',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O teste do bom modelo: **acrescentar um tipo novo não deve exigir mexer no código existente**. Com condicionais por tipo, toda classe nova obriga a revisitar todos os `if`.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Receber dano precisa de um piso: a vida não pode ficar negativa, senão a contagem de rodadas e a verificação de "está vivo" começam a produzir resultados estranhos. `Math.Max(0, ...)` resolve.',
      },
      {
        kind: 'text',
        body:
          'Note que `Vida` usa `protected set`: as derivadas precisam alterá-la, mas nada de fora da hierarquia deveria conseguir. É o modificador do capítulo 3 no seu uso mais típico.',
      },
    ],
    quiz: [
      {
        id: 's05c07l08q1',
        type: 'single',
        prompt: 'Qual é o teste de um bom modelo polimórfico?',
        options: [
          { id: 'a', text: 'Acrescentar um tipo novo não exige mexer no código existente.', correct: true },
          { id: 'b', text: 'Todas as classes têm o mesmo número de métodos.' },
          { id: 'c', text: 'A hierarquia tem no máximo dois níveis.' },
          { id: 'd', text: 'Nenhum método é abstrato.' },
        ],
        explanation:
          'É a diferença observável entre polimorfismo e uma cadeia de condicionais disfarçada.',
      },
      {
        id: 's05c07l08q2',
        type: 'single',
        prompt: 'Por que `Vida` usa `protected set`?',
        options: [
          { id: 'a', text: 'Porque as derivadas precisam alterá-la, mas nada de fora deveria.', correct: true },
          { id: 'b', text: 'Porque `private set` não compila em classes abstratas.' },
          { id: 'c', text: 'Para permitir polimorfismo.' },
          { id: 'd', text: 'Porque `public set` seria mais lento.' },
        ],
        explanation:
          'É exatamente o caso de uso do `protected`: acesso para a família, fechado para o resto do mundo.',
      },
      {
        id: 's05c07l08q3',
        type: 'single',
        prompt: 'Por que limitar a vida a um piso de zero?',
        options: [
          { id: 'a', text: 'Porque vida negativa distorce contagens e verificações de estado.', correct: true },
          { id: 'b', text: 'Porque `int` não aceita negativos.' },
          { id: 'c', text: 'Para economizar memória.' },
          { id: 'd', text: 'Não é necessário.' },
        ],
        explanation:
          'Um estado impossível no domínio não deveria ser representável. `Math.Max(0, ...)` mantém o modelo coerente.',
      },
    ],
    challenge: {
      brief:
        'Construa um combate por turnos em que cada classe de personagem calcula o próprio dano, sem nenhum condicional por tipo.',
      requirements: [
        '`Personagem` é abstrata, recebe nome e vida inicial, expõe `Nome`, `Vida` (leitura de fora) e `Vivo`',
        '`Dano()` é `public abstract int`',
        '`Receber(int dano)` reduz a vida, nunca abaixo de zero',
        '`ToString()` devolve `nome (tipo): N de vida`, usando `GetType().Name`',
        '`Guerreiro` recebe nome, vida e força; o dano é `forca * 2`',
        '`Mago` recebe nome, vida e magia; o dano é `magia * 3`',
        '`Arqueiro` recebe nome, vida e destreza; o dano é `destreza + 5`',
        '`Combate.Duelar(Personagem a, Personagem b)` alterna golpes começando por `a`, até um cair, e devolve o vencedor',
        '`Combate.Rodadas` guarda quantos golpes foram dados no último duelo',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare Personagem, Guerreiro, Mago, Arqueiro e Combate aqui

class Program
{
    static void Main()
    {
        int vida = int.Parse(Console.ReadLine());
        int forca = int.Parse(Console.ReadLine());
        int magia = int.Parse(Console.ReadLine());
        int destreza = int.Parse(Console.ReadLine());

        Guerreiro g = new Guerreiro("Thor", vida, forca);
        Mago m = new Mago("Merlin", vida, magia);
        Arqueiro a = new Arqueiro("Robin", vida, destreza);

        List<Personagem> grupo = new List<Personagem> { g, m, a };

        foreach (Personagem p in grupo)
        {
            Console.WriteLine($"{p} dano {p.Dano()}");
        }

        Combate c = new Combate();
        Personagem vencedor = c.Duelar(g, m);

        Console.WriteLine($"Vencedor: {vencedor.Nome}");
        Console.WriteLine($"Rodadas: {c.Rodadas}");
        Console.WriteLine(g);
        Console.WriteLine(m);
        Console.WriteLine($"Mago vivo: {m.Vivo}");
        Console.WriteLine($"Arqueiro intacto: {a}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

abstract class Personagem
{
    public string Nome { get; }
    public int Vida { get; protected set; }

    protected Personagem(string nome, int vida)
    {
        Nome = nome;
        Vida = vida;
    }

    public bool Vivo => Vida > 0;

    public abstract int Dano();

    public void Receber(int dano)
    {
        Vida = Math.Max(0, Vida - dano);
    }

    public void Atacar(Personagem alvo)
    {
        alvo.Receber(Dano());
    }

    public override string ToString()
    {
        return $"{Nome} ({GetType().Name}): {Vida} de vida";
    }
}

class Guerreiro : Personagem
{
    private int forca;

    public Guerreiro(string nome, int vida, int forca)
        : base(nome, vida)
    {
        this.forca = forca;
    }

    public override int Dano()
    {
        return forca * 2;
    }
}

class Mago : Personagem
{
    private int magia;

    public Mago(string nome, int vida, int magia)
        : base(nome, vida)
    {
        this.magia = magia;
    }

    public override int Dano()
    {
        return magia * 3;
    }
}

class Arqueiro : Personagem
{
    private int destreza;

    public Arqueiro(string nome, int vida, int destreza)
        : base(nome, vida)
    {
        this.destreza = destreza;
    }

    public override int Dano()
    {
        return destreza + 5;
    }
}

class Combate
{
    public int Rodadas { get; private set; }

    public Personagem Duelar(Personagem a, Personagem b)
    {
        Rodadas = 0;

        Personagem atacante = a;
        Personagem defensor = b;

        while (a.Vivo && b.Vivo)
        {
            atacante.Atacar(defensor);
            Rodadas++;

            Personagem trocado = atacante;
            atacante = defensor;
            defensor = trocado;
        }

        return a.Vivo ? a : b;
    }
}

class Program
{
    static void Main()
    {
        int vida = int.Parse(Console.ReadLine());
        int forca = int.Parse(Console.ReadLine());
        int magia = int.Parse(Console.ReadLine());
        int destreza = int.Parse(Console.ReadLine());

        Guerreiro g = new Guerreiro("Thor", vida, forca);
        Mago m = new Mago("Merlin", vida, magia);
        Arqueiro a = new Arqueiro("Robin", vida, destreza);

        List<Personagem> grupo = new List<Personagem> { g, m, a };

        foreach (Personagem p in grupo)
        {
            Console.WriteLine($"{p} dano {p.Dano()}");
        }

        Combate c = new Combate();
        Personagem vencedor = c.Duelar(g, m);

        Console.WriteLine($"Vencedor: {vencedor.Nome}");
        Console.WriteLine($"Rodadas: {c.Rodadas}");
        Console.WriteLine(g);
        Console.WriteLine(m);
        Console.WriteLine($"Mago vivo: {m.Vivo}");
        Console.WriteLine($"Arqueiro intacto: {a}");
    }
}
`,
      hints: [
        'No duelo, troque atacante e defensor a cada golpe usando uma variável temporária.',
        'O laço só continua enquanto os **dois** estiverem vivos, e o vencedor é quem sobrou.',
      ],
      tests: [
        {
          name: 'Mago mais forte',
          stdin: '100\n10\n15\n12\n',
          expectedStdout:
            'Thor (Guerreiro): 100 de vida dano 20\nMerlin (Mago): 100 de vida dano 45\n' +
            'Robin (Arqueiro): 100 de vida dano 17\n' +
            'Vencedor: Merlin\nRodadas: 6\n' +
            'Thor (Guerreiro): 0 de vida\nMerlin (Mago): 40 de vida\n' +
            'Mago vivo: True\nArqueiro intacto: Robin (Arqueiro): 100 de vida',
        },
        {
          name: 'Guerreiro mais forte',
          stdin: '50\n20\n5\n8\n',
          expectedStdout:
            'Thor (Guerreiro): 50 de vida dano 40\nMerlin (Mago): 50 de vida dano 15\n' +
            'Robin (Arqueiro): 50 de vida dano 13\n' +
            'Vencedor: Thor\nRodadas: 3\n' +
            'Thor (Guerreiro): 35 de vida\nMerlin (Mago): 0 de vida\n' +
            'Mago vivo: False\nArqueiro intacto: Robin (Arqueiro): 50 de vida',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c07l09',
    title: 'Prática: refatorando código procedural',
    objective: 'Converter um bloco de código sem objetos em um modelo com responsabilidades distribuídas.',
    concept: [
      {
        kind: 'text',
        body:
          'Muito código real começa como um `Main` gigante com listas paralelas e laços aninhados. Refatorar isso em objetos é um trabalho comum — e segue sempre os mesmos passos.',
      },
      {
        kind: 'compare',
        good: `List<Item> itens = ...;

foreach (Item i in itens)
{
    total += i.Subtotal();
}`,
        bad: `string[] nomes = ...;
double[] precos = ...;
int[] qtds = ...;

for (int i = 0; i < nomes.Length; i++)
{
    total += precos[i] * qtds[i];
}`,
        goodLabel: 'Orientado a objetos',
        badLabel: 'Procedural',
      },
      {
        kind: 'table',
        headers: ['Passo', 'O que fazer'],
        rows: [
          ['1', 'agrupar arrays paralelos em uma classe'],
          ['2', 'mover cada cálculo para quem tem os dados'],
          ['3', 'trocar condicionais por tipo por polimorfismo'],
          ['4', 'fechar o acesso ao que não precisa ser público'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '**Arrays paralelos** — vários arrays de mesmo tamanho cujos índices se correspondem — são o sinal mais confiável de um objeto faltando. Um erro em um único índice desalinha tudo silenciosamente.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A regra da refatoração: a saída não pode mudar. Se ela mudar, ou você corrigiu um bug sem querer, ou introduziu um. Nos dois casos vale saber qual dos dois foi.',
      },
      {
        kind: 'text',
        body:
          'Refatorar não é reescrever. O objetivo é a mesma funcionalidade com uma estrutura melhor — e cada passo pode ser verificado rodando o programa de novo.',
      },
    ],
    quiz: [
      {
        id: 's05c07l09q1',
        type: 'single',
        prompt: 'O que arrays paralelos indicam?',
        options: [
          { id: 'a', text: 'Um objeto faltando.', correct: true },
          { id: 'b', text: 'Um problema de desempenho.' },
          { id: 'c', text: 'Falta de encapsulamento.' },
          { id: 'd', text: 'Necessidade de herança.' },
        ],
        explanation:
          'Três arrays cujos índices se correspondem são, na verdade, uma lista de um tipo com três campos.',
      },
      {
        id: 's05c07l09q2',
        type: 'single',
        prompt: 'Qual é a regra que define uma refatoração bem-sucedida?',
        options: [
          { id: 'a', text: 'A saída continua idêntica.', correct: true },
          { id: 'b', text: 'O código fica menor.' },
          { id: 'c', text: 'O número de classes aumenta.' },
          { id: 'd', text: 'O programa fica mais rápido.' },
        ],
        explanation:
          'Refatorar muda a estrutura, não o comportamento. Uma saída diferente significa que algo além da estrutura mudou.',
      },
      {
        id: 's05c07l09q3',
        type: 'single',
        prompt: 'Qual é o primeiro passo ao refatorar código procedural?',
        options: [
          { id: 'a', text: 'Agrupar arrays paralelos em uma classe.', correct: true },
          { id: 'b', text: 'Criar uma hierarquia de herança.' },
          { id: 'c', text: 'Tornar tudo privado.' },
          { id: 'd', text: 'Extrair interfaces.' },
        ],
        explanation:
          'Sem os tipos, não há para onde mover os comportamentos. Criar os objetos vem antes de distribuir responsabilidades.',
      },
    ],
    challenge: {
      brief:
        'Refatore um relatório de vendas escrito com arrays paralelos, produzindo exatamente a mesma saída.',
      requirements: [
        '`Venda` recebe vendedor, produto, valor (`double`) e quantidade (`int`)',
        '`Venda.Total()` devolve valor vezes quantidade',
        '`Venda.ToString()` devolve `vendedor - produto: R$ X.XX`',
        '`Relatorio` guarda vendas em lista privada, com `Registrar(Venda v)`',
        '`Relatorio.Faturamento()` soma os totais',
        '`Relatorio.TotalDe(string vendedor)` soma os totais de um vendedor',
        '`Relatorio.MelhorVendedor()` devolve o nome de quem mais faturou, ou `nenhum` se vazio; empate fica com o primeiro registrado',
        '`Relatorio.Vendedores()` devolve os nomes distintos, na ordem em que apareceram',
        'A saída deve ser idêntica à do código procedural original',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// O codigo original usava tres arrays paralelos:
//   string[] vendedores, string[] produtos, double[] valores, int[] qtds
// Refatore em Venda e Relatorio, mantendo a saida identica.

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Relatorio r = new Relatorio();

        for (int i = 0; i < n; i++)
        {
            string vendedor = Console.ReadLine();
            string produto = Console.ReadLine();
            double valor = double.Parse(Console.ReadLine());
            int qtd = int.Parse(Console.ReadLine());

            Venda v = new Venda(vendedor, produto, valor, qtd);
            r.Registrar(v);
            Console.WriteLine(v);
        }

        Console.WriteLine($"Faturamento: {r.Faturamento():F2}");
        Console.WriteLine($"Vendedores: {string.Join(", ", r.Vendedores())}");

        foreach (string v in r.Vendedores())
        {
            Console.WriteLine($"  {v}: {r.TotalDe(v):F2}");
        }

        Console.WriteLine($"Melhor: {r.MelhorVendedor()}");
        Console.WriteLine($"Desconhecido: {r.TotalDe("ninguem"):F2}");
        Console.WriteLine($"Vazio: {new Relatorio().MelhorVendedor()}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Venda
{
    public string Vendedor { get; }
    public string Produto { get; }
    public double Valor { get; }
    public int Quantidade { get; }

    public Venda(string vendedor, string produto, double valor, int quantidade)
    {
        Vendedor = vendedor;
        Produto = produto;
        Valor = valor;
        Quantidade = quantidade;
    }

    public double Total()
    {
        return Valor * Quantidade;
    }

    public override string ToString()
    {
        return $"{Vendedor} - {Produto}: R$ {Total():F2}";
    }
}

class Relatorio
{
    private List<Venda> vendas = new List<Venda>();

    public void Registrar(Venda v)
    {
        if (v == null)
        {
            return;
        }

        vendas.Add(v);
    }

    public double Faturamento()
    {
        double total = 0;

        foreach (Venda v in vendas)
        {
            total += v.Total();
        }

        return total;
    }

    public double TotalDe(string vendedor)
    {
        double total = 0;

        foreach (Venda v in vendas)
        {
            if (v.Vendedor == vendedor)
            {
                total += v.Total();
            }
        }

        return total;
    }

    public List<string> Vendedores()
    {
        List<string> nomes = new List<string>();

        foreach (Venda v in vendas)
        {
            if (!nomes.Contains(v.Vendedor))
            {
                nomes.Add(v.Vendedor);
            }
        }

        return nomes;
    }

    public string MelhorVendedor()
    {
        string melhor = "nenhum";
        double maior = -1;

        foreach (string nome in Vendedores())
        {
            double total = TotalDe(nome);

            if (total > maior)
            {
                maior = total;
                melhor = nome;
            }
        }

        return melhor;
    }
}

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Relatorio r = new Relatorio();

        for (int i = 0; i < n; i++)
        {
            string vendedor = Console.ReadLine();
            string produto = Console.ReadLine();
            double valor = double.Parse(Console.ReadLine());
            int qtd = int.Parse(Console.ReadLine());

            Venda v = new Venda(vendedor, produto, valor, qtd);
            r.Registrar(v);
            Console.WriteLine(v);
        }

        Console.WriteLine($"Faturamento: {r.Faturamento():F2}");
        Console.WriteLine($"Vendedores: {string.Join(", ", r.Vendedores())}");

        foreach (string v in r.Vendedores())
        {
            Console.WriteLine($"  {v}: {r.TotalDe(v):F2}");
        }

        Console.WriteLine($"Melhor: {r.MelhorVendedor()}");
        Console.WriteLine($"Desconhecido: {r.TotalDe("ninguem"):F2}");
        Console.WriteLine($"Vazio: {new Relatorio().MelhorVendedor()}");
    }
}
`,
      hints: [
        'Os quatro arrays paralelos viram quatro campos de uma única classe `Venda`.',
        'Para o empate ficar com o primeiro registrado, use `>` e não `>=` na comparação.',
      ],
      tests: [
        {
          name: 'Tres vendas de dois vendedores',
          stdin: '3\nAna\nteclado\n100.00\n2\nBruno\nmouse\n50.00\n3\nAna\nmonitor\n300.00\n1\n',
          expectedStdout:
            'Ana - teclado: R$ 200.00\nBruno - mouse: R$ 150.00\nAna - monitor: R$ 300.00\n' +
            'Faturamento: 650.00\nVendedores: Ana, Bruno\n' +
            '  Ana: 500.00\n  Bruno: 150.00\n' +
            'Melhor: Ana\nDesconhecido: 0.00\nVazio: nenhum',
        },
        {
          name: 'Empate entre vendedores',
          stdin: '2\nCarla\ncabo\n25.00\n4\nDiego\nhub\n100.00\n1\n',
          expectedStdout:
            'Carla - cabo: R$ 100.00\nDiego - hub: R$ 100.00\n' +
            'Faturamento: 200.00\nVendedores: Carla, Diego\n' +
            '  Carla: 100.00\n  Diego: 100.00\n' +
            'Melhor: Carla\nDesconhecido: 0.00\nVazio: nenhum',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c07l10',
    title: 'Boss: sistema de reservas',
    objective: 'Reunir toda a Seção 5 em um sistema completo: hierarquia, interfaces, valores e coleções protegidas.',
    concept: [
      {
        kind: 'text',
        body:
          'Este é o desafio final da seção. Ele exige tudo: uma hierarquia de acomodações com preços diferentes, um valor imutável para o período, um contrato para o cálculo de tarifa, e um hotel que protege as próprias coleções.',
      },
      {
        kind: 'table',
        headers: ['Peça', 'Mecanismo', 'Capítulo'],
        rows: [
          ['`Periodo`', '`readonly record struct`', '6'],
          ['`Acomodacao`', 'classe abstrata', '4'],
          ['`ITarifavel`', 'interface', '5'],
          ['`Reserva`', 'classe com estado protegido', '2'],
          ['`Hotel`', 'coleções privadas', '7'],
        ],
      },
      {
        kind: 'text',
        body:
          'A regra central: uma acomodação **não pode ser reservada duas vezes no mesmo período**. Detectar conflito entre dois intervalos é a parte algorítmica do desafio.',
      },
      {
        kind: 'code',
        code: `// dois periodos se sobrepoem quando:
bool conflita = a.Entrada < b.Saida && b.Entrada < a.Saida;`,
        caption: 'Períodos que apenas se tocam nas pontas não conflitam: quem sai no dia 10 libera o quarto para quem entra no dia 10.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Essa expressão de conflito é curta e nada óbvia. Vale testá-la mentalmente com casos extremos: períodos idênticos, um dentro do outro, e adjacentes — o terceiro é o que costuma revelar o erro.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Construa por partes. Faça o `Periodo` e teste o conflito. Depois as acomodações e o preço. Só então o hotel. Tentar tudo de uma vez torna difícil saber qual peça falhou.',
      },
    ],
    quiz: [
      {
        id: 's05c07l10q1',
        type: 'single',
        prompt: 'Dois períodos que se tocam nas pontas conflitam?',
        options: [
          { id: 'a', text: 'Não: quem sai no dia 10 libera o quarto para quem entra no dia 10.', correct: true },
          { id: 'b', text: 'Sim, sempre.' },
          { id: 'c', text: 'Depende do tipo de acomodação.' },
          { id: 'd', text: 'Só se forem do mesmo hóspede.' },
        ],
        explanation:
          'É justamente o caso que a comparação estrita `<` trata corretamente, e que `<=` trataria errado.',
      },
      {
        id: 's05c07l10q2',
        type: 'single',
        prompt: 'Por que `Periodo` é um `readonly record struct`?',
        options: [
          { id: 'a', text: 'Porque é um valor pequeno e imutável, e dois períodos iguais são o mesmo.', correct: true },
          { id: 'b', text: 'Porque precisa de herança.' },
          { id: 'c', text: 'Porque será usado como chave de dicionário.' },
          { id: 'd', text: 'Por questão de desempenho apenas.' },
        ],
        explanation:
          'Dois campos, sem identidade própria, igualdade por conteúdo — a definição de um valor, segundo o checkpoint do capítulo 6.',
      },
      {
        id: 's05c07l10q3',
        type: 'single',
        prompt: 'Por que o hotel guarda as reservas em uma lista privada?',
        options: [
          { id: 'a', text: 'Para que ninguém acrescente uma reserva sem passar pela verificação de conflito.', correct: true },
          { id: 'b', text: 'Para economizar memória.' },
          { id: 'c', text: 'Porque listas públicas não compilam.' },
          { id: 'd', text: 'Para permitir ordenação.' },
        ],
        explanation:
          'Uma lista pública deixaria a regra mais importante do sistema ser contornada com um único `Add`.',
      },
    ],
    challenge: {
      brief:
        'Construa o sistema de reservas completo: acomodações com tarifas diferentes, períodos como valor, e um hotel que impede reservas conflitantes.',
      requirements: [
        '`Periodo` é um `readonly record struct` com `Entrada` e `Saida` (`int`), a propriedade `Noites` e o método `Conflita(Periodo outro)`',
        '`ITarifavel` declara `Tarifa(Periodo p)` devolvendo `decimal`',
        '`Acomodacao` é abstrata, implementa `ITarifavel`, recebe número (`int`) e diária (`decimal`), e expõe `Numero`, `Diaria` e `Descricao` (abstrata, `string`)',
        '`Acomodacao.Tarifa(Periodo p)` é `Diaria * Noites` mais o que `Adicional(p)` devolver; `Adicional` é `protected virtual` e devolve `0`',
        '`Acomodacao.ToString()` devolve `numero (descricao)`',
        '`Standard` tem descrição `standard` e nenhum adicional',
        '`Suite` tem descrição `suite` e cobra 100 de taxa fixa por reserva',
        '`Chale` tem descrição `chale` e cobra 50 por noite de limpeza',
        '`Reserva` recebe hóspede, `Acomodacao` e `Periodo`; expõe `Valor` calculado na criação e `ToString()` no formato `hospede: acomodacao, N noites, R$ X.XX`',
        '`Hotel` guarda acomodações e reservas em listas privadas',
        '`Hotel.Adicionar(Acomodacao a)` cadastra',
        '`Hotel.Reservar(int numero, string hospede, Periodo p)` cria a reserva se a acomodação existe e não há conflito; caso contrário devolve `null`',
        '`Hotel.Ocupacao(Periodo p)` conta acomodações reservadas naquele período',
        '`Hotel.Faturamento` soma os valores de todas as reservas',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare Periodo, ITarifavel, Acomodacao, Standard, Suite, Chale, Reserva e Hotel

class Program
{
    static void Main()
    {
        decimal diaria = decimal.Parse(Console.ReadLine());
        int entrada = int.Parse(Console.ReadLine());
        int saida = int.Parse(Console.ReadLine());

        Hotel h = new Hotel();
        h.Adicionar(new Standard(101, diaria));
        h.Adicionar(new Suite(201, diaria * 2));
        h.Adicionar(new Chale(301, diaria));

        Periodo p = new Periodo(entrada, saida);
        Periodo seguinte = new Periodo(saida, saida + 2);
        Periodo sobreposto = new Periodo(entrada + 1, saida + 1);

        Console.WriteLine($"Noites: {p.Noites}");
        Console.WriteLine($"Conflita com seguinte: {p.Conflita(seguinte)}");
        Console.WriteLine($"Conflita com sobreposto: {p.Conflita(sobreposto)}");

        Reserva r1 = h.Reservar(101, "Ana", p);
        Console.WriteLine(r1);

        Reserva r2 = h.Reservar(101, "Bruno", sobreposto);
        Console.WriteLine(r2 == null ? "conflito" : r2.ToString());

        Reserva r3 = h.Reservar(101, "Carla", seguinte);
        Console.WriteLine(r3);

        Reserva r4 = h.Reservar(201, "Diego", p);
        Console.WriteLine(r4);

        Reserva r5 = h.Reservar(301, "Elena", p);
        Console.WriteLine(r5);

        Reserva r6 = h.Reservar(999, "Fabio", p);
        Console.WriteLine(r6 == null ? "inexistente" : r6.ToString());

        Console.WriteLine($"Ocupacao no periodo: {h.Ocupacao(p)}");
        Console.WriteLine($"Faturamento: {h.Faturamento:F2}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

readonly record struct Periodo(int Entrada, int Saida)
{
    public int Noites => Saida - Entrada;

    public bool Conflita(Periodo outro)
    {
        return Entrada < outro.Saida && outro.Entrada < Saida;
    }
}

interface ITarifavel
{
    decimal Tarifa(Periodo p);
}

abstract class Acomodacao : ITarifavel
{
    public int Numero { get; }
    public decimal Diaria { get; }

    protected Acomodacao(int numero, decimal diaria)
    {
        Numero = numero;
        Diaria = diaria;
    }

    public abstract string Descricao { get; }

    public decimal Tarifa(Periodo p)
    {
        return Diaria * p.Noites + Adicional(p);
    }

    protected virtual decimal Adicional(Periodo p)
    {
        return 0;
    }

    public override string ToString()
    {
        return $"{Numero} ({Descricao})";
    }
}

class Standard : Acomodacao
{
    public Standard(int numero, decimal diaria)
        : base(numero, diaria)
    {
    }

    public override string Descricao => "standard";
}

class Suite : Acomodacao
{
    public Suite(int numero, decimal diaria)
        : base(numero, diaria)
    {
    }

    public override string Descricao => "suite";

    protected override decimal Adicional(Periodo p)
    {
        return 100;
    }
}

class Chale : Acomodacao
{
    public Chale(int numero, decimal diaria)
        : base(numero, diaria)
    {
    }

    public override string Descricao => "chale";

    protected override decimal Adicional(Periodo p)
    {
        return 50 * p.Noites;
    }
}

class Reserva
{
    public string Hospede { get; }
    public Acomodacao Acomodacao { get; }
    public Periodo Periodo { get; }
    public decimal Valor { get; }

    public Reserva(string hospede, Acomodacao acomodacao, Periodo periodo)
    {
        Hospede = hospede;
        Acomodacao = acomodacao;
        Periodo = periodo;
        Valor = acomodacao.Tarifa(periodo);
    }

    public override string ToString()
    {
        return $"{Hospede}: {Acomodacao}, {Periodo.Noites} noites, R$ {Valor:F2}";
    }
}

class Hotel
{
    private List<Acomodacao> acomodacoes = new List<Acomodacao>();
    private List<Reserva> reservas = new List<Reserva>();

    public void Adicionar(Acomodacao a)
    {
        if (a == null)
        {
            return;
        }

        acomodacoes.Add(a);
    }

    public Reserva Reservar(int numero, string hospede, Periodo p)
    {
        Acomodacao alvo = null;

        foreach (Acomodacao a in acomodacoes)
        {
            if (a.Numero == numero)
            {
                alvo = a;
                break;
            }
        }

        if (alvo == null)
        {
            return null;
        }

        foreach (Reserva r in reservas)
        {
            if (r.Acomodacao.Numero == numero && r.Periodo.Conflita(p))
            {
                return null;
            }
        }

        Reserva nova = new Reserva(hospede, alvo, p);
        reservas.Add(nova);
        return nova;
    }

    public int Ocupacao(Periodo p)
    {
        int total = 0;

        foreach (Reserva r in reservas)
        {
            if (r.Periodo.Conflita(p))
            {
                total++;
            }
        }

        return total;
    }

    public decimal Faturamento
    {
        get
        {
            decimal soma = 0;

            foreach (Reserva r in reservas)
            {
                soma += r.Valor;
            }

            return soma;
        }
    }
}

class Program
{
    static void Main()
    {
        decimal diaria = decimal.Parse(Console.ReadLine());
        int entrada = int.Parse(Console.ReadLine());
        int saida = int.Parse(Console.ReadLine());

        Hotel h = new Hotel();
        h.Adicionar(new Standard(101, diaria));
        h.Adicionar(new Suite(201, diaria * 2));
        h.Adicionar(new Chale(301, diaria));

        Periodo p = new Periodo(entrada, saida);
        Periodo seguinte = new Periodo(saida, saida + 2);
        Periodo sobreposto = new Periodo(entrada + 1, saida + 1);

        Console.WriteLine($"Noites: {p.Noites}");
        Console.WriteLine($"Conflita com seguinte: {p.Conflita(seguinte)}");
        Console.WriteLine($"Conflita com sobreposto: {p.Conflita(sobreposto)}");

        Reserva r1 = h.Reservar(101, "Ana", p);
        Console.WriteLine(r1);

        Reserva r2 = h.Reservar(101, "Bruno", sobreposto);
        Console.WriteLine(r2 == null ? "conflito" : r2.ToString());

        Reserva r3 = h.Reservar(101, "Carla", seguinte);
        Console.WriteLine(r3);

        Reserva r4 = h.Reservar(201, "Diego", p);
        Console.WriteLine(r4);

        Reserva r5 = h.Reservar(301, "Elena", p);
        Console.WriteLine(r5);

        Reserva r6 = h.Reservar(999, "Fabio", p);
        Console.WriteLine(r6 == null ? "inexistente" : r6.ToString());

        Console.WriteLine($"Ocupacao no periodo: {h.Ocupacao(p)}");
        Console.WriteLine($"Faturamento: {h.Faturamento:F2}");
    }
}
`,
      hints: [
        'O `Adicional` da suíte ignora o período e devolve sempre 100; o do chalé multiplica por noites.',
        'O `Reservar` faz duas buscas: uma pela acomodação, outra por conflitos entre as reservas dela.',
        'A `Reserva` calcula o valor **no construtor**, congelando a tarifa daquele momento.',
      ],
      tests: [
        {
          name: 'Tres noites',
          stdin: '200\n10\n13\n',
          expectedStdout:
            'Noites: 3\nConflita com seguinte: False\nConflita com sobreposto: True\n' +
            'Ana: 101 (standard), 3 noites, R$ 600.00\nconflito\n' +
            'Carla: 101 (standard), 2 noites, R$ 400.00\n' +
            'Diego: 201 (suite), 3 noites, R$ 1300.00\n' +
            'Elena: 301 (chale), 3 noites, R$ 750.00\ninexistente\n' +
            'Ocupacao no periodo: 3\nFaturamento: 3050.00',
        },
        {
          name: 'Duas noites com diaria menor',
          stdin: '100\n5\n7\n',
          expectedStdout:
            'Noites: 2\nConflita com seguinte: False\nConflita com sobreposto: True\n' +
            'Ana: 101 (standard), 2 noites, R$ 200.00\nconflito\n' +
            'Carla: 101 (standard), 2 noites, R$ 200.00\n' +
            'Diego: 201 (suite), 2 noites, R$ 500.00\n' +
            'Elena: 301 (chale), 2 noites, R$ 300.00\ninexistente\n' +
            'Ocupacao no periodo: 3\nFaturamento: 1200.00',
          hidden: true,
        },
      ],
    },
  },
]
