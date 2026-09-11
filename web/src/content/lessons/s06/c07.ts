import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's06c07l01',
    title: 'Responsabilidade única',
    objective: 'Dar a cada classe um só motivo para mudar.',
    concept: [
      {
        kind: 'text',
        body:
          'O princípio da **responsabilidade única** costuma ser resumido como "uma classe faz uma coisa". A formulação mais útil é outra: uma classe deve ter **um só motivo para mudar**.',
      },
      {
        kind: 'compare',
        good: `class Pedido        // regras do pedido
class PedidoRepositorio  // persistencia
class PedidoRelatorio    // formatacao
class PedidoEmail        // notificacao`,
        bad: `class Pedido
{
    decimal Total() { }
    void SalvarNoBanco() { }
    string GerarHtml() { }
    void EnviarEmail() { }
}`,
        goodLabel: 'Quatro motivos, quatro classes',
        badLabel: 'Quatro motivos para mudar',
      },
      {
        kind: 'text',
        body:
          'A classe ruim muda quando a regra de negócio muda, quando o banco muda, quando o formato do relatório muda, e quando o serviço de e-mail muda. Quatro equipes diferentes acabam mexendo no mesmo arquivo.',
      },
      {
        kind: 'table',
        headers: ['Pergunta', 'Se a resposta for "mais de um"'],
        rows: [
          ['quantos motivos essa classe tem para mudar?', 'separar'],
          ['quantas pessoas diferentes pediriam mudanças nela?', 'separar'],
          ['o nome precisa de "e" ou "Manager"?', 'separar'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Nomes como `Manager`, `Helper`, `Utils` e `Service` genérico costumam denunciar responsabilidade indefinida. Eles cabem em qualquer coisa — e por isso acabam recebendo tudo que não achou outro lugar.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Levar o princípio ao extremo produz centenas de classes de um método, e o custo de navegar entre elas passa a superar o benefício. O critério é o **motivo de mudança**, não a quantidade de métodos.',
      },
    ],
    quiz: [
      {
        id: 's06c07l01q1',
        type: 'single',
        prompt: 'Qual é a formulação mais útil da responsabilidade única?',
        options: [
          { id: 'a', text: 'Uma classe deve ter um só motivo para mudar.', correct: true },
          { id: 'b', text: 'Uma classe deve ter um só método público.' },
          { id: 'c', text: 'Uma classe deve ter menos de 100 linhas.' },
          { id: 'd', text: 'Uma classe deve ter um só campo.' },
        ],
        explanation:
          '"Fazer uma coisa" é vago demais para decidir. "Um motivo para mudar" é verificável na prática.',
      },
      {
        id: 's06c07l01q2',
        type: 'single',
        prompt: 'O que nomes como `Manager` e `Utils` costumam denunciar?',
        options: [
          { id: 'a', text: 'Responsabilidade indefinida.', correct: true },
          { id: 'b', text: 'Boa organização.' },
          { id: 'c', text: 'Uso de padrões de projeto.' },
          { id: 'd', text: 'Código legado.' },
        ],
        explanation:
          'Como cabem em qualquer coisa, acabam recebendo tudo que não achou um lugar melhor.',
      },
      {
        id: 's06c07l01q3',
        type: 'single',
        prompt: 'Qual é o risco de levar o princípio ao extremo?',
        options: [
          { id: 'a', text: 'Centenas de classes minúsculas, com custo de navegação maior que o benefício.', correct: true },
          { id: 'b', text: 'Perda de desempenho.' },
          { id: 'c', text: 'Impossibilidade de testar.' },
          { id: 'd', text: 'Não há risco.' },
        ],
        explanation:
          'O critério é o motivo de mudança. Dividir além disso fragmenta sem separar nada de verdade.',
      },
    ],
    challenge: {
      brief:
        'Separe uma classe que acumula quatro responsabilidades em classes com um motivo de mudança cada.',
      requirements: [
        '`Fatura` guarda cliente e itens, e calcula `Total()` — só regras de negócio',
        '`Fatura.Adicionar(string descricao, decimal valor)` acrescenta um item',
        '`FaturaFormatador.ParaTexto(Fatura f)` devolve `cliente: N itens, R$ X.XX`',
        '`FaturaFormatador.ParaCsv(Fatura f)` devolve `cliente;itens;total` com o total em duas casas',
        '`FaturaRepositorio.Salvar(Fatura f)` guarda em memória e devolve o identificador atribuído, começando em `1`',
        '`FaturaRepositorio.Quantidade` diz quantas foram salvas',
        '`FaturaNotificador.Notificar(Fatura f)` devolve `enviado para cliente`',
        'A `Fatura` não conhece formatação, persistência nem notificação',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Esta classe tem quatro motivos para mudar. Separe em quatro classes.
//
// class FaturaManager
// {
//     cliente, itens
//     decimal Total()
//     string ParaTexto()
//     string ParaCsv()
//     int Salvar()
//     string Notificar()
// }

class Program
{
    static void Main()
    {
        string cliente = Console.ReadLine();
        int n = int.Parse(Console.ReadLine());

        Fatura fatura = new Fatura(cliente);

        for (int i = 0; i < n; i++)
        {
            string descricao = Console.ReadLine();
            decimal valor = decimal.Parse(Console.ReadLine());
            fatura.Adicionar(descricao, valor);
        }

        Console.WriteLine($"total: {fatura.Total():F2}");
        Console.WriteLine(FaturaFormatador.ParaTexto(fatura));
        Console.WriteLine(FaturaFormatador.ParaCsv(fatura));

        FaturaRepositorio repositorio = new FaturaRepositorio();

        Console.WriteLine($"id: {repositorio.Salvar(fatura)}");
        Console.WriteLine($"id: {repositorio.Salvar(new Fatura("Outro"))}");
        Console.WriteLine($"salvas: {repositorio.Quantidade}");
        Console.WriteLine(FaturaNotificador.Notificar(fatura));

        Fatura vazia = new Fatura("Ninguem");
        Console.WriteLine(FaturaFormatador.ParaTexto(vazia));
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Fatura
{
    private List<decimal> valores = new List<decimal>();
    private List<string> descricoes = new List<string>();

    public string Cliente { get; }

    public Fatura(string cliente)
    {
        Cliente = cliente;
    }

    public int Quantidade => valores.Count;

    public void Adicionar(string descricao, decimal valor)
    {
        descricoes.Add(descricao);
        valores.Add(valor);
    }

    public decimal Total()
    {
        decimal soma = 0;

        foreach (decimal valor in valores)
        {
            soma += valor;
        }

        return soma;
    }
}

class FaturaFormatador
{
    public static string ParaTexto(Fatura f)
    {
        return $"{f.Cliente}: {f.Quantidade} itens, R$ {f.Total():F2}";
    }

    public static string ParaCsv(Fatura f)
    {
        return $"{f.Cliente};{f.Quantidade};{f.Total():F2}";
    }
}

class FaturaRepositorio
{
    private List<Fatura> salvas = new List<Fatura>();

    public int Quantidade => salvas.Count;

    public int Salvar(Fatura f)
    {
        salvas.Add(f);
        return salvas.Count;
    }
}

class FaturaNotificador
{
    public static string Notificar(Fatura f)
    {
        return $"enviado para {f.Cliente}";
    }
}

class Program
{
    static void Main()
    {
        string cliente = Console.ReadLine();
        int n = int.Parse(Console.ReadLine());

        Fatura fatura = new Fatura(cliente);

        for (int i = 0; i < n; i++)
        {
            string descricao = Console.ReadLine();
            decimal valor = decimal.Parse(Console.ReadLine());
            fatura.Adicionar(descricao, valor);
        }

        Console.WriteLine($"total: {fatura.Total():F2}");
        Console.WriteLine(FaturaFormatador.ParaTexto(fatura));
        Console.WriteLine(FaturaFormatador.ParaCsv(fatura));

        FaturaRepositorio repositorio = new FaturaRepositorio();

        Console.WriteLine($"id: {repositorio.Salvar(fatura)}");
        Console.WriteLine($"id: {repositorio.Salvar(new Fatura("Outro"))}");
        Console.WriteLine($"salvas: {repositorio.Quantidade}");
        Console.WriteLine(FaturaNotificador.Notificar(fatura));

        Fatura vazia = new Fatura("Ninguem");
        Console.WriteLine(FaturaFormatador.ParaTexto(vazia));
    }
}
`,
      hints: [
        'Os formatadores e o notificador não guardam estado, então podem ter métodos estáticos.',
        'O repositório é o único que guarda estado próprio: a lista do que foi salvo.',
        'A `Fatura` expõe `Cliente`, `Quantidade` e `Total()` — é tudo que as outras classes precisam dela.',
      ],
      tests: [
        {
          name: 'Fatura com dois itens',
          stdin: 'Ana\n2\ncaneta\n10.50\ncaderno\n25.00\n',
          expectedStdout:
            'total: 35.50\nAna: 2 itens, R$ 35.50\nAna;2;35.50\n' +
            'id: 1\nid: 2\nsalvas: 2\nenviado para Ana\nNinguem: 0 itens, R$ 0.00',
        },
        {
          name: 'Fatura com um item',
          stdin: 'Bruno\n1\nmochila\n199.99\n',
          expectedStdout:
            'total: 199.99\nBruno: 1 itens, R$ 199.99\nBruno;1;199.99\n' +
            'id: 1\nid: 2\nsalvas: 2\nenviado para Bruno\nNinguem: 0 itens, R$ 0.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c07l02',
    title: 'Aberto para extensão',
    objective: 'Desenhar código que aceita comportamento novo sem precisar ser alterado.',
    concept: [
      {
        kind: 'text',
        body:
          'O princípio diz que o código deve ser **aberto para extensão e fechado para modificação**: dá para acrescentar comportamento novo sem mexer no que já funciona.',
      },
      {
        kind: 'compare',
        good: `interface IRegra
{
    bool Aprova(Pedido p);
}

// regra nova = classe nova
// o motor nao muda`,
        bad: `bool Aprovar(Pedido p)
{
    if (regra == "valor") ...
    else if (regra == "cliente") ...
    // regra nova = editar aqui
}`,
        goodLabel: 'Extensão por acréscimo',
        badLabel: 'Extensão por edição',
      },
      {
        kind: 'text',
        body:
          'O ganho é sobre **risco**. Acrescentar uma classe nova não pode quebrar as existentes; editar um método que todas usam pode. Quanto mais crítico o código, mais isso importa.',
      },
      {
        kind: 'table',
        headers: ['Mecanismo', 'Como estende'],
        rows: [
          ['interface', 'nova implementação'],
          ['classe abstrata', 'nova derivada'],
          ['delegate', 'nova função passada'],
          ['registro de plugins', 'novo item registrado'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Não tente prever todas as extensões futuras. Abstrações criadas "por precaução" quase sempre erram o ponto de variação real — e você paga a complexidade sem receber a flexibilidade.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A regra prática: abra o código para extensão **depois** que a segunda variação aparecer. Aí você sabe qual é o eixo real de variação, em vez de adivinhar.',
      },
    ],
    quiz: [
      {
        id: 's06c07l02q1',
        type: 'single',
        prompt: 'O que significa "fechado para modificação"?',
        options: [
          { id: 'a', text: 'Comportamento novo não exige alterar o código existente.', correct: true },
          { id: 'b', text: 'O código não pode ser alterado nunca.' },
          { id: 'c', text: 'As classes devem ser `sealed`.' },
          { id: 'd', text: 'Os campos devem ser privados.' },
        ],
        explanation:
          'O ponto é o risco: acrescentar uma classe nova não quebra as existentes; editar código compartilhado pode.',
      },
      {
        id: 's06c07l02q2',
        type: 'single',
        prompt: 'Quando abrir o código para extensão?',
        options: [
          { id: 'a', text: 'Depois que a segunda variação aparecer.', correct: true },
          { id: 'b', text: 'Sempre, desde o início.' },
          { id: 'c', text: 'Quando houver mais de cinco classes.' },
          { id: 'd', text: 'Nunca: é complexidade desnecessária.' },
        ],
        explanation:
          'A segunda variação revela o eixo real. Antes disso, qualquer abstração é palpite.',
      },
      {
        id: 's06c07l02q3',
        type: 'single',
        prompt: 'Qual é o risco de abstrair por precaução?',
        options: [
          { id: 'a', text: 'A abstração erra o ponto de variação real e você paga complexidade sem flexibilidade.', correct: true },
          { id: 'b', text: 'O código fica mais lento.' },
          { id: 'c', text: 'O compilador reclama.' },
          { id: 'd', text: 'Aumenta o consumo de memória.' },
        ],
        explanation:
          'Uma abstração no eixo errado precisa ser desfeita antes que a variação real possa ser acomodada.',
      },
    ],
    challenge: {
      brief:
        'Transforme um motor de regras que exige edição a cada regra nova em um que aceita regras por acréscimo.',
      requirements: [
        '`IRegra` declara `Aprova(decimal valor, int itens, bool clienteVip)` devolvendo `bool` e a propriedade `Nome`',
        '`RegraValorMinimo` recebe o mínimo no construtor e aprova pedidos acima dele; nome `valor minimo`',
        '`RegraItensMaximo` recebe o máximo e aprova pedidos com no máximo essa quantidade; nome `itens maximo`',
        '`RegraApenasVip` aprova apenas clientes VIP; nome `apenas vip`',
        '`MotorAprovacao` guarda regras em lista privada, com `Registrar(IRegra r)`',
        '`Avaliar(...)` devolve `aprovado` quando todas as regras aprovam, ou `reprovado por: nome` da primeira que reprovar',
        '`MotorAprovacao` não conhece nenhum tipo concreto de regra',
        'Acrescentar uma regra nova não exige alterar `MotorAprovacao`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Este motor exige edicao a cada regra nova:
//
// string Avaliar(decimal valor, int itens, bool vip, string[] regras)
// {
//     foreach (string r in regras)
//     {
//         if (r == "valor" && valor < 100) return "reprovado por: valor minimo";
//         if (r == "itens" && itens > 10) return "reprovado por: itens maximo";
//         if (r == "vip" && !vip) return "reprovado por: apenas vip";
//     }
//     return "aprovado";
// }
//
// Reescreva com IRegra e MotorAprovacao.

class Program
{
    static void Main()
    {
        decimal valor = decimal.Parse(Console.ReadLine());
        int itens = int.Parse(Console.ReadLine());

        MotorAprovacao motor = new MotorAprovacao();
        motor.Registrar(new RegraValorMinimo(100));
        motor.Registrar(new RegraItensMaximo(10));

        Console.WriteLine($"padrao: {motor.Avaliar(valor, itens, false)}");
        Console.WriteLine($"valor baixo: {motor.Avaliar(10, itens, false)}");
        Console.WriteLine($"itens demais: {motor.Avaliar(valor, 50, false)}");

        MotorAprovacao comVip = new MotorAprovacao();
        comVip.Registrar(new RegraValorMinimo(100));
        comVip.Registrar(new RegraApenasVip());

        Console.WriteLine($"nao vip: {comVip.Avaliar(valor, itens, false)}");
        Console.WriteLine($"vip: {comVip.Avaliar(valor, itens, true)}");

        MotorAprovacao vazio = new MotorAprovacao();
        Console.WriteLine($"sem regras: {vazio.Avaliar(0, 0, false)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

interface IRegra
{
    bool Aprova(decimal valor, int itens, bool clienteVip);
    string Nome { get; }
}

class RegraValorMinimo : IRegra
{
    private decimal minimo;

    public RegraValorMinimo(decimal minimo)
    {
        this.minimo = minimo;
    }

    public string Nome => "valor minimo";

    public bool Aprova(decimal valor, int itens, bool clienteVip)
    {
        return valor >= minimo;
    }
}

class RegraItensMaximo : IRegra
{
    private int maximo;

    public RegraItensMaximo(int maximo)
    {
        this.maximo = maximo;
    }

    public string Nome => "itens maximo";

    public bool Aprova(decimal valor, int itens, bool clienteVip)
    {
        return itens <= maximo;
    }
}

class RegraApenasVip : IRegra
{
    public string Nome => "apenas vip";

    public bool Aprova(decimal valor, int itens, bool clienteVip)
    {
        return clienteVip;
    }
}

class MotorAprovacao
{
    private List<IRegra> regras = new List<IRegra>();

    public void Registrar(IRegra r)
    {
        if (r == null)
        {
            return;
        }

        regras.Add(r);
    }

    public string Avaliar(decimal valor, int itens, bool clienteVip)
    {
        foreach (IRegra regra in regras)
        {
            if (!regra.Aprova(valor, itens, clienteVip))
            {
                return $"reprovado por: {regra.Nome}";
            }
        }

        return "aprovado";
    }
}

class Program
{
    static void Main()
    {
        decimal valor = decimal.Parse(Console.ReadLine());
        int itens = int.Parse(Console.ReadLine());

        MotorAprovacao motor = new MotorAprovacao();
        motor.Registrar(new RegraValorMinimo(100));
        motor.Registrar(new RegraItensMaximo(10));

        Console.WriteLine($"padrao: {motor.Avaliar(valor, itens, false)}");
        Console.WriteLine($"valor baixo: {motor.Avaliar(10, itens, false)}");
        Console.WriteLine($"itens demais: {motor.Avaliar(valor, 50, false)}");

        MotorAprovacao comVip = new MotorAprovacao();
        comVip.Registrar(new RegraValorMinimo(100));
        comVip.Registrar(new RegraApenasVip());

        Console.WriteLine($"nao vip: {comVip.Avaliar(valor, itens, false)}");
        Console.WriteLine($"vip: {comVip.Avaliar(valor, itens, true)}");

        MotorAprovacao vazio = new MotorAprovacao();
        Console.WriteLine($"sem regras: {vazio.Avaliar(0, 0, false)}");
      }
}
`,
      hints: [
        'Todas as regras recebem os mesmos três parâmetros, mesmo quando usam só um — é o preço de uma interface uniforme.',
        'O motor percorre as regras e para na primeira que reprova.',
        'Sem nenhuma regra registrada, tudo é aprovado: o laço não executa nenhuma vez.',
      ],
      tests: [
        {
          name: 'Pedido dentro das regras',
          stdin: '500\n5\n',
          expectedStdout:
            'padrao: aprovado\nvalor baixo: reprovado por: valor minimo\n' +
            'itens demais: reprovado por: itens maximo\n' +
            'nao vip: reprovado por: apenas vip\nvip: aprovado\nsem regras: aprovado',
        },
        {
          name: 'Pedido no limite',
          stdin: '100\n10\n',
          expectedStdout:
            'padrao: aprovado\nvalor baixo: reprovado por: valor minimo\n' +
            'itens demais: reprovado por: itens maximo\n' +
            'nao vip: reprovado por: apenas vip\nvip: aprovado\nsem regras: aprovado',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c07l03',
    title: 'Substituição de Liskov',
    objective: 'Garantir que uma derivada possa substituir a base sem quebrar quem usa.',
    concept: [
      {
        kind: 'text',
        body:
          'O princípio de Liskov diz que **onde a base funciona, a derivada também deve funcionar**. Se trocar uma pela outra quebra o programa, a hierarquia está errada.',
      },
      {
        kind: 'compare',
        good: `abstract class Forma
{
    public abstract int Area();
}

class Quadrado : Forma { }
class Retangulo : Forma { }
// irmaos, nao pai e filho`,
        bad: `class Retangulo
{
    public virtual int Largura { set; }
    public virtual int Altura { set; }
}

class Quadrado : Retangulo
{
    // set em um altera o outro:
    // quebra quem usa Retangulo
}`,
        goodLabel: 'Hierarquia que se sustenta',
        badLabel: 'Quadrado herdando de Retângulo',
      },
      {
        kind: 'text',
        body:
          'O exemplo do quadrado é o clássico. Quem recebe um `Retangulo` pode escrever "defina largura 5, altura 4, então a área é 20". Um `Quadrado` disfarçado de retângulo quebra essa expectativa.',
      },
      {
        kind: 'table',
        headers: ['Violação', 'Sintoma'],
        rows: [
          ['a derivada lança onde a base funcionava', '`NotSupportedException`'],
          ['a derivada exige mais da entrada', 'chamadas válidas passam a falhar'],
          ['a derivada promete menos na saída', 'quem chama precisa reverificar'],
          ['quem usa testa o tipo concreto', '`is` espalhado pelo código'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A última linha é o sintoma mais fácil de detectar: se o código que usa a base precisa perguntar "mas será que é daquele tipo específico?", a substituição não está funcionando.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A relação "é um" da linguagem natural engana. Um quadrado **é** um retângulo na geometria, mas não em um modelo com largura e altura mutáveis. O que importa é o comportamento, não a taxonomia.',
      },
    ],
    quiz: [
      {
        id: 's06c07l03q1',
        type: 'single',
        prompt: 'O que o princípio de Liskov exige?',
        options: [
          { id: 'a', text: 'Que a derivada funcione em todo lugar onde a base funciona.', correct: true },
          { id: 'b', text: 'Que a derivada tenha os mesmos métodos.' },
          { id: 'c', text: 'Que a hierarquia tenha no máximo dois níveis.' },
          { id: 'd', text: 'Que a base seja abstrata.' },
        ],
        explanation:
          'A assinatura igual o compilador garante. O que Liskov cobra é a compatibilidade de **comportamento**.',
      },
      {
        id: 's06c07l03q2',
        type: 'single',
        prompt: 'Qual é o sintoma mais fácil de detectar de uma violação?',
        options: [
          { id: 'a', text: 'Código que usa a base testando o tipo concreto com `is`.', correct: true },
          { id: 'b', text: 'Muitos métodos virtuais.' },
          { id: 'c', text: 'Hierarquia profunda.' },
          { id: 'd', text: 'Uso de classes abstratas.' },
        ],
        explanation:
          'Se quem usa a base precisa saber qual derivada chegou, o polimorfismo não está cumprindo o papel.',
      },
      {
        id: 's06c07l03q3',
        type: 'single',
        prompt: 'Por que "quadrado é um retângulo" engana na modelagem?',
        options: [
          { id: 'a', text: 'Porque o que importa é o comportamento, não a taxonomia da linguagem natural.', correct: true },
          { id: 'b', text: 'Porque quadrados não têm área.' },
          { id: 'c', text: 'Porque a herança não suporta formas.' },
          { id: 'd', text: 'A frase não engana.' },
        ],
        explanation:
          'Com largura e altura mutáveis, o quadrado não consegue cumprir o contrato que o retângulo promete.',
      },
    ],
    challenge: {
      brief:
        'Conserte uma hierarquia que viola Liskov, transformando a relação de herança forçada em irmãs de uma base honesta.',
      requirements: [
        '`Forma` é abstrata com `Area()` e `Nome()` abstratos, e `Descrever()` devolvendo `nome: area`',
        '`Retangulo` recebe largura e altura, ambas imutáveis',
        '`Quadrado` recebe apenas o lado, e **não** herda de `Retangulo`',
        '`Circulo` recebe o raio e devolve a área truncada para `int` com `(int)(3.14159 * raio * raio)`',
        '`AreaTotal(List<Forma> formas)` soma as áreas sem testar nenhum tipo concreto',
        'Nenhum `is` ou `as` aparece no código que usa `Forma`',
        'Nenhuma derivada lança exceção em um método que a base promete',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Esta hierarquia viola Liskov: Quadrado herda de Retangulo e
// precisa lancar excecao para manter a propria invariante.
//
// class Retangulo { public virtual void DefinirLargura(int l) ... }
// class Quadrado : Retangulo
// {
//     public override void DefinirLargura(int l)
//         => throw new NotSupportedException("quadrado nao tem largura propria");
// }
//
// Conserte: faca Quadrado e Retangulo serem irmaos sob Forma.

class Program
{
    static void Main()
    {
        int largura = int.Parse(Console.ReadLine());
        int altura = int.Parse(Console.ReadLine());
        int lado = int.Parse(Console.ReadLine());
        int raio = int.Parse(Console.ReadLine());

        List<Forma> formas = new List<Forma>
        {
            new Retangulo(largura, altura),
            new Quadrado(lado),
            new Circulo(raio)
        };

        foreach (Forma f in formas)
        {
            Console.WriteLine(f.Descrever());
        }

        Console.WriteLine($"total: {AreaTotal(formas)}");
        Console.WriteLine($"quadrado e retangulo: {new Quadrado(lado) is Retangulo}");
        Console.WriteLine($"todos sao forma: {new Quadrado(lado) is Forma && new Circulo(raio) is Forma}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

abstract class Forma
{
    public abstract int Area();

    public abstract string Nome();

    public string Descrever()
    {
        return $"{Nome()}: {Area()}";
    }
}

class Retangulo : Forma
{
    private int largura;
    private int altura;

    public Retangulo(int largura, int altura)
    {
        this.largura = largura;
        this.altura = altura;
    }

    public override int Area()
    {
        return largura * altura;
    }

    public override string Nome()
    {
        return "retangulo";
    }
}

class Quadrado : Forma
{
    private int lado;

    public Quadrado(int lado)
    {
        this.lado = lado;
    }

    public override int Area()
    {
        return lado * lado;
    }

    public override string Nome()
    {
        return "quadrado";
    }
}

class Circulo : Forma
{
    private int raio;

    public Circulo(int raio)
    {
        this.raio = raio;
    }

    public override int Area()
    {
        return (int)(3.14159 * raio * raio);
    }

    public override string Nome()
    {
        return "circulo";
    }
}

class Program
{
    static int AreaTotal(List<Forma> formas)
    {
        int total = 0;

        foreach (Forma f in formas)
        {
            total += f.Area();
        }

        return total;
    }

    static void Main()
    {
        int largura = int.Parse(Console.ReadLine());
        int altura = int.Parse(Console.ReadLine());
        int lado = int.Parse(Console.ReadLine());
        int raio = int.Parse(Console.ReadLine());

        List<Forma> formas = new List<Forma>
        {
            new Retangulo(largura, altura),
            new Quadrado(lado),
            new Circulo(raio)
        };

        foreach (Forma f in formas)
        {
            Console.WriteLine(f.Descrever());
        }

        Console.WriteLine($"total: {AreaTotal(formas)}");
        Console.WriteLine($"quadrado e retangulo: {new Quadrado(lado) is Retangulo}");
        Console.WriteLine($"todos sao forma: {new Quadrado(lado) is Forma && new Circulo(raio) is Forma}");
    }
}
`,
      hints: [
        'A imutabilidade resolve metade do problema: sem setters, não há como violar a invariante do quadrado.',
        'O `Quadrado` herda de `Forma`, não de `Retangulo` — eles viram irmãos.',
        'O `AreaTotal` funciona porque toda `Forma` promete `Area()` e todas cumprem.',
      ],
      tests: [
        {
          name: 'Formas variadas',
          stdin: '5\n4\n3\n2\n',
          expectedStdout:
            'retangulo: 20\nquadrado: 9\ncirculo: 12\ntotal: 41\n' +
            'quadrado e retangulo: False\ntodos sao forma: True',
        },
        {
          name: 'Formas maiores',
          stdin: '10\n10\n6\n5\n',
          expectedStdout:
            'retangulo: 100\nquadrado: 36\ncirculo: 78\ntotal: 214\n' +
            'quadrado e retangulo: False\ntodos sao forma: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c07l04',
    title: 'Segregação de interfaces',
    objective: 'Manter interfaces pequenas, para que ninguém seja obrigado a implementar o que não usa.',
    concept: [
      {
        kind: 'text',
        body:
          'O princípio diz que **nenhum tipo deve ser forçado a depender de métodos que não usa**. Interfaces grandes obrigam implementações incompletas.',
      },
      {
        kind: 'compare',
        good: `interface ILeitor { string Ler(); }
interface IEscritor { void Escrever(string s); }

class SomenteLeitura : ILeitor { }
class Completo : ILeitor, IEscritor { }`,
        bad: `interface IArquivo
{
    string Ler();
    void Escrever(string s);
    void Apagar();
}

class SomenteLeitura : IArquivo
{
    public void Escrever(string s)
        => throw new NotSupportedException();
    // ...
}`,
        goodLabel: 'Contratos separados',
        badLabel: 'Implementação obrigada a mentir',
      },
      {
        kind: 'text',
        body:
          'A implementação que lança `NotSupportedException` é o sintoma direto: ela assinou um contrato que não consegue cumprir. Isso também viola Liskov, porque quem recebe um `IArquivo` não pode chamar `Escrever` com segurança.',
      },
      {
        kind: 'table',
        headers: ['Sinal', 'O que fazer'],
        rows: [
          ['implementações lançando "não suportado"', 'dividir a interface'],
          ['implementações com métodos vazios', 'dividir a interface'],
          ['quem usa só chama um subconjunto', 'depender de uma interface menor'],
          ['a interface tem mais de cinco métodos', 'investigar se há mais de um papel'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Interfaces pequenas se combinam. Um tipo que precisa dos três papéis implementa as três interfaces; um que precisa de um implementa uma. A herança múltipla de interfaces é o que torna isso possível.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Dividir demais também tem custo. Dez interfaces de um método cada, sempre implementadas juntas, só acrescentam nomes. Divida onde existem implementações que usam **subconjuntos diferentes**.',
      },
    ],
    quiz: [
      {
        id: 's06c07l04q1',
        type: 'single',
        prompt: 'Qual é o sintoma direto de uma interface grande demais?',
        options: [
          { id: 'a', text: 'Implementações que lançam "não suportado" ou têm métodos vazios.', correct: true },
          { id: 'b', text: 'Muitas classes implementando a interface.' },
          { id: 'c', text: 'A interface ser usada em vários lugares.' },
          { id: 'd', text: 'A interface ter um nome longo.' },
        ],
        explanation:
          'A implementação está declarando que assinou um contrato que não consegue cumprir.',
      },
      {
        id: 's06c07l04q2',
        type: 'single',
        prompt: 'Qual outro princípio uma implementação que lança "não suportado" viola?',
        options: [
          { id: 'a', text: 'Substituição de Liskov.', correct: true },
          { id: 'b', text: 'Responsabilidade única.' },
          { id: 'c', text: 'Inversão de dependência.' },
          { id: 'd', text: 'Nenhum outro.' },
        ],
        explanation:
          'Quem recebe a interface não pode chamar todos os métodos com segurança — a substituição deixa de valer.',
      },
      {
        id: 's06c07l04q3',
        type: 'single',
        prompt: 'Quando **não** dividir uma interface?',
        options: [
          { id: 'a', text: 'Quando todas as implementações usam todos os métodos.', correct: true },
          { id: 'b', text: 'Quando ela tem mais de três métodos.' },
          { id: 'c', text: 'Quando há muitas implementações.' },
          { id: 'd', text: 'Sempre divida.' },
        ],
        explanation:
          'Sem subconjuntos distintos em uso, a divisão só multiplica nomes sem separar papel nenhum.',
      },
    ],
    challenge: {
      brief:
        'Divida uma interface inchada em papéis separados, eliminando as implementações que precisavam lançar exceção.',
      requirements: [
        '`ILeitor` declara `Ler()` devolvendo `string`',
        '`IEscritor` declara `Escrever(string conteudo)`',
        '`IApagavel` declara `Apagar()` devolvendo `bool`',
        '`ArquivoSomenteLeitura` recebe o conteúdo no construtor e implementa apenas `ILeitor`',
        '`ArquivoTemporario` implementa `ILeitor`, `IEscritor` e `IApagavel`, começando vazio',
        '`Arquivo.Apagar()` do temporário limpa o conteúdo e devolve `true`',
        '`LogSomenteEscrita` implementa apenas `IEscritor` e conta quantas linhas recebeu em `Linhas`',
        '`Copiar(ILeitor origem, IEscritor destino)` transfere o conteúdo',
        'Nenhuma implementação lança exceção por método não suportado',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Interface inchada:
//
// interface IArquivo { string Ler(); void Escrever(string c); bool Apagar(); }
//
// class ArquivoSomenteLeitura : IArquivo
// {
//     public void Escrever(string c) => throw new NotSupportedException();
//     public bool Apagar() => throw new NotSupportedException();
// }
//
// Divida em ILeitor, IEscritor e IApagavel.

class Program
{
    static void Main()
    {
        string conteudo = Console.ReadLine();

        ArquivoSomenteLeitura fixo = new ArquivoSomenteLeitura(conteudo);
        ArquivoTemporario temporario = new ArquivoTemporario();
        LogSomenteEscrita log = new LogSomenteEscrita();

        Console.WriteLine($"fixo le: {fixo.Ler()}");
        Console.WriteLine($"temporario vazio: '{temporario.Ler()}'");

        Copiar(fixo, temporario);
        Console.WriteLine($"apos copia: {temporario.Ler()}");

        Copiar(fixo, log);
        Copiar(temporario, log);
        Console.WriteLine($"log recebeu: {log.Linhas} linhas");

        Console.WriteLine($"apagou: {temporario.Apagar()}");
        Console.WriteLine($"apos apagar: '{temporario.Ler()}'");

        Console.WriteLine($"fixo e leitor: {fixo is ILeitor}");
        Console.WriteLine($"fixo e escritor: {fixo is IEscritor}");
        Console.WriteLine($"temporario e apagavel: {temporario is IApagavel}");
        Console.WriteLine($"log e leitor: {log is ILeitor}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

interface ILeitor
{
    string Ler();
}

interface IEscritor
{
    void Escrever(string conteudo);
}

interface IApagavel
{
    bool Apagar();
}

class ArquivoSomenteLeitura : ILeitor
{
    private string conteudo;

    public ArquivoSomenteLeitura(string conteudo)
    {
        this.conteudo = conteudo;
    }

    public string Ler()
    {
        return conteudo;
    }
}

class ArquivoTemporario : ILeitor, IEscritor, IApagavel
{
    private string conteudo = "";

    public string Ler()
    {
        return conteudo;
    }

    public void Escrever(string novoConteudo)
    {
        conteudo = novoConteudo;
    }

    public bool Apagar()
    {
        conteudo = "";
        return true;
    }
}

class LogSomenteEscrita : IEscritor
{
    public int Linhas { get; private set; }

    public void Escrever(string conteudo)
    {
        Linhas++;
    }
}

class Program
{
    static void Copiar(ILeitor origem, IEscritor destino)
    {
        destino.Escrever(origem.Ler());
    }

    static void Main()
    {
        string conteudo = Console.ReadLine();

        ArquivoSomenteLeitura fixo = new ArquivoSomenteLeitura(conteudo);
        ArquivoTemporario temporario = new ArquivoTemporario();
        LogSomenteEscrita log = new LogSomenteEscrita();

        Console.WriteLine($"fixo le: {fixo.Ler()}");
        Console.WriteLine($"temporario vazio: '{temporario.Ler()}'");

        Copiar(fixo, temporario);
        Console.WriteLine($"apos copia: {temporario.Ler()}");

        Copiar(fixo, log);
        Copiar(temporario, log);
        Console.WriteLine($"log recebeu: {log.Linhas} linhas");

        Console.WriteLine($"apagou: {temporario.Apagar()}");
        Console.WriteLine($"apos apagar: '{temporario.Ler()}'");

        Console.WriteLine($"fixo e leitor: {fixo is ILeitor}");
        Console.WriteLine($"fixo e escritor: {fixo is IEscritor}");
        Console.WriteLine($"temporario e apagavel: {temporario is IApagavel}");
        Console.WriteLine($"log e leitor: {log is ILeitor}");
    }
}
`,
      hints: [
        'O `Copiar` só precisa de leitura na origem e escrita no destino — ele não exige que nenhum dos dois seja apagável.',
        'O `LogSomenteEscrita` não implementa `ILeitor`, e por isso não precisa inventar um `Ler()` que não faz sentido.',
        'Cada classe lista apenas as interfaces cujos métodos ela consegue cumprir de verdade.',
      ],
      tests: [
        {
          name: 'Conteudo simples',
          stdin: 'texto de teste\n',
          expectedStdout:
            "fixo le: texto de teste\ntemporario vazio: ''\napos copia: texto de teste\n" +
            'log recebeu: 2 linhas\napagou: True\napos apagar: \'\'\n' +
            'fixo e leitor: True\nfixo e escritor: False\n' +
            'temporario e apagavel: True\nlog e leitor: False',
        },
        {
          name: 'Outro conteudo',
          stdin: 'abc\n',
          expectedStdout:
            "fixo le: abc\ntemporario vazio: ''\napos copia: abc\n" +
            'log recebeu: 2 linhas\napagou: True\napos apagar: \'\'\n' +
            'fixo e leitor: True\nfixo e escritor: False\n' +
            'temporario e apagavel: True\nlog e leitor: False',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c07l05',
    title: 'Inversão de dependência',
    objective: 'Fazer o código de alto nível depender de abstrações, e não de implementações concretas.',
    concept: [
      {
        kind: 'text',
        body:
          'O princípio tem duas partes: módulos de alto nível não devem depender dos de baixo nível — **ambos devem depender de abstrações**.',
      },
      {
        kind: 'compare',
        good: `class Pedido
{
    private INotificador n;

    public Pedido(INotificador n)
    {
        this.n = n;
    }
}`,
        bad: `class Pedido
{
    private EmailSmtp email
        = new EmailSmtp();

    // preso ao SMTP para sempre
}`,
        goodLabel: 'Depende do contrato',
        badLabel: 'Depende da implementação',
      },
      {
        kind: 'text',
        body:
          'A "inversão" está no sentido da seta. Normalmente o alto nível aponta para o baixo nível; com o princípio aplicado, o **baixo nível** passa a apontar para a abstração definida pelo alto nível.',
      },
      {
        kind: 'table',
        headers: ['Sem inversão', 'Com inversão'],
        rows: [
          ['`Pedido` → `EmailSmtp`', '`Pedido` → `INotificador` ← `EmailSmtp`'],
          ['trocar e-mail exige mexer em `Pedido`', 'trocar é registrar outra implementação'],
          ['testar exige enviar e-mail de verdade', 'testar usa um notificador falso'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A última linha costuma ser o argumento decisivo. Uma classe que instancia as próprias dependências é praticamente impossível de testar isoladamente — e a dificuldade de testar é o sintoma que denuncia o acoplamento.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Nem toda dependência precisa ser invertida. Depender de `List<T>`, `string` ou `DateTime` é normal — a inversão vale para o que **varia** ou tem efeito externo: banco, rede, arquivo, relógio, aleatoriedade.',
      },
    ],
    quiz: [
      {
        id: 's06c07l05q1',
        type: 'single',
        prompt: 'O que exatamente é "invertido" no princípio?',
        options: [
          { id: 'a', text: 'O sentido da dependência: o baixo nível passa a apontar para a abstração.', correct: true },
          { id: 'b', text: 'A ordem das chamadas.' },
          { id: 'c', text: 'A hierarquia de herança.' },
          { id: 'd', text: 'A ordem dos parâmetros.' },
        ],
        explanation:
          'A abstração é definida pelo alto nível, e a implementação concreta é que se conforma a ela.',
      },
      {
        id: 's06c07l05q2',
        type: 'single',
        prompt: 'Qual sintoma denuncia acoplamento a implementações concretas?',
        options: [
          { id: 'a', text: 'A classe é difícil de testar isoladamente.', correct: true },
          { id: 'b', text: 'A classe tem muitos métodos.' },
          { id: 'c', text: 'A classe é grande.' },
          { id: 'd', text: 'A classe usa herança.' },
        ],
        explanation:
          'Se testar exige um banco de verdade ou uma conexão real, a dependência está fixa no código.',
      },
      {
        id: 's06c07l05q3',
        type: 'multiple',
        prompt: 'Quais dependências normalmente valem a inversão?',
        options: [
          { id: 'a', text: 'Acesso a banco de dados.', correct: true },
          { id: 'b', text: 'Chamadas de rede.', correct: true },
          { id: 'c', text: 'O relógio do sistema.', correct: true },
          { id: 'd', code: 'List<T>' },
        ],
        explanation:
          'Vale inverter o que varia ou tem efeito externo. Estruturas de dados da linguagem são estáveis e sem efeito colateral.',
      },
    ],
    challenge: {
      brief:
        'Inverta as dependências de um processador de pedidos para que ele possa ser testado sem banco, sem e-mail e sem relógio real.',
      requirements: [
        '`IRepositorio` declara `Salvar(string pedido)` devolvendo `int`',
        '`INotificador` declara `Notificar(string destino, string mensagem)` devolvendo `bool`',
        '`IRelogio` declara a propriedade `Agora` devolvendo `int` (um contador de instantes)',
        '`ProcessadorPedido` recebe as três dependências no construtor',
        '`Processar(string pedido, string cliente)` salva, notifica e devolve `pedido N registrado em T`, com o identificador e o instante',
        'A notificação falhando faz o retorno virar `pedido N registrado em T (sem notificacao)`',
        '`RepositorioFalso` devolve identificadores sequenciais a partir de `1` e conta os salvamentos',
        '`NotificadorFalso` registra as mensagens e pode ser configurado para falhar',
        '`RelogioFalso` começa em `100` e avança `1` a cada leitura',
        '`ProcessadorPedido` não instancia nenhuma implementação concreta',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Versao acoplada:
//
// class ProcessadorPedido
// {
//     private BancoSql banco = new BancoSql();
//     private EmailSmtp email = new EmailSmtp();
//     string Processar(...) { banco.Salvar(...); email.Enviar(...); DateTime.Now ... }
// }
//
// Inverta as tres dependencias e crie as versoes falsas para teste.

class Program
{
    static void Main()
    {
        string pedido = Console.ReadLine();
        string cliente = Console.ReadLine();

        RepositorioFalso repositorio = new RepositorioFalso();
        NotificadorFalso notificador = new NotificadorFalso();
        RelogioFalso relogio = new RelogioFalso();

        ProcessadorPedido processador = new ProcessadorPedido(repositorio, notificador, relogio);

        Console.WriteLine(processador.Processar(pedido, cliente));
        Console.WriteLine(processador.Processar(pedido, cliente));

        Console.WriteLine($"salvos: {repositorio.Salvos}");
        Console.WriteLine($"notificacoes: {notificador.Enviadas}");
        Console.WriteLine($"ultima mensagem: {notificador.Ultima}");

        notificador.Falhar = true;
        Console.WriteLine(processador.Processar(pedido, cliente));
        Console.WriteLine($"notificacoes: {notificador.Enviadas}");
        Console.WriteLine($"salvos: {repositorio.Salvos}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

interface IRepositorio
{
    int Salvar(string pedido);
}

interface INotificador
{
    bool Notificar(string destino, string mensagem);
}

interface IRelogio
{
    int Agora { get; }
}

class ProcessadorPedido
{
    private IRepositorio repositorio;
    private INotificador notificador;
    private IRelogio relogio;

    public ProcessadorPedido(IRepositorio repositorio, INotificador notificador, IRelogio relogio)
    {
        this.repositorio = repositorio;
        this.notificador = notificador;
        this.relogio = relogio;
    }

    public string Processar(string pedido, string cliente)
    {
        int id = repositorio.Salvar(pedido);
        int instante = relogio.Agora;

        bool avisou = notificador.Notificar(cliente, $"pedido {id} recebido");

        string resultado = $"pedido {id} registrado em {instante}";

        if (!avisou)
        {
            resultado += " (sem notificacao)";
        }

        return resultado;
    }
}

class RepositorioFalso : IRepositorio
{
    public int Salvos { get; private set; }

    public int Salvar(string pedido)
    {
        Salvos++;
        return Salvos;
    }
}

class NotificadorFalso : INotificador
{
    private List<string> mensagens = new List<string>();

    public bool Falhar { get; set; }

    public int Enviadas => mensagens.Count;

    public string Ultima => mensagens.Count == 0 ? "nenhuma" : mensagens[mensagens.Count - 1];

    public bool Notificar(string destino, string mensagem)
    {
        if (Falhar)
        {
            return false;
        }

        mensagens.Add($"{destino}: {mensagem}");
        return true;
    }
}

class RelogioFalso : IRelogio
{
    private int instante = 100;

    public int Agora => instante++;
}

class Program
{
    static void Main()
    {
        string pedido = Console.ReadLine();
        string cliente = Console.ReadLine();

        RepositorioFalso repositorio = new RepositorioFalso();
        NotificadorFalso notificador = new NotificadorFalso();
        RelogioFalso relogio = new RelogioFalso();

        ProcessadorPedido processador = new ProcessadorPedido(repositorio, notificador, relogio);

        Console.WriteLine(processador.Processar(pedido, cliente));
        Console.WriteLine(processador.Processar(pedido, cliente));

        Console.WriteLine($"salvos: {repositorio.Salvos}");
        Console.WriteLine($"notificacoes: {notificador.Enviadas}");
        Console.WriteLine($"ultima mensagem: {notificador.Ultima}");

        notificador.Falhar = true;
        Console.WriteLine(processador.Processar(pedido, cliente));
        Console.WriteLine($"notificacoes: {notificador.Enviadas}");
        Console.WriteLine($"salvos: {repositorio.Salvos}");
    }
}
`,
      hints: [
        'O `RelogioFalso` usa `instante++` na propriedade: ela devolve o valor atual e já avança para a próxima leitura.',
        'O processador chama `relogio.Agora` **uma vez** por processamento e guarda o resultado.',
        'Repare que as versões falsas tornam a saída totalmente determinística — impossível com relógio e e-mail reais.',
      ],
      tests: [
        {
          name: 'Tres processamentos',
          stdin: 'PEDIDO-A\nana@teste.com\n',
          expectedStdout:
            'pedido 1 registrado em 100\npedido 2 registrado em 101\n' +
            'salvos: 2\nnotificacoes: 2\nultima mensagem: ana@teste.com: pedido 2 recebido\n' +
            'pedido 3 registrado em 102 (sem notificacao)\nnotificacoes: 2\nsalvos: 3',
        },
        {
          name: 'Outro cliente',
          stdin: 'PEDIDO-B\nbruno@x.org\n',
          expectedStdout:
            'pedido 1 registrado em 100\npedido 2 registrado em 101\n' +
            'salvos: 2\nnotificacoes: 2\nultima mensagem: bruno@x.org: pedido 2 recebido\n' +
            'pedido 3 registrado em 102 (sem notificacao)\nnotificacoes: 2\nsalvos: 3',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c07l06',
    title: 'Composição em vez de herança',
    objective: 'Escolher composição como padrão e reservar a herança para os casos em que ela realmente cabe.',
    concept: [
      {
        kind: 'text',
        body:
          'A herança parece a ferramenta natural para reaproveitar código, e é justamente aí que ela é mais mal usada. A recomendação clássica: **prefira composição**.',
      },
      {
        kind: 'table',
        headers: ['Aspecto', 'Herança', 'Composição'],
        rows: [
          ['acoplamento', 'forte', '**fraco**'],
          ['quantas por tipo', 'uma', '**várias**'],
          ['pode mudar em execução', 'não', '**sim**'],
          ['expõe detalhes da base', 'sim', 'não'],
          ['relação', '"é um"', '"tem um"'],
        ],
      },
      {
        kind: 'text',
        body:
          'O problema central da herança é o acoplamento à **implementação** da base. Uma alteração interna na classe base pode quebrar derivadas que nem foram tocadas — o que se chama de problema da classe base frágil.',
      },
      {
        kind: 'compare',
        good: `class Registrador
{
    private IFormatador f;
    private IDestino d;

    // troca em execucao:
    // registrador.Destino = arquivo;
}`,
        bad: `class RegistradorArquivoJson
    : RegistradorArquivo
{
    // uma classe por combinacao:
    // Arquivo x Json, Arquivo x Texto,
    // Console x Json, Console x Texto...
}`,
        goodLabel: 'Duas peças combináveis',
        badLabel: 'Explosão de subclasses',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A explosão combinatória é o sinal mais claro. Se você precisa de uma subclasse para cada combinação de duas características, elas são duas **peças** — e peças se combinam por composição, não por herança.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Herança ainda tem lugar: quando existe uma relação "é um" genuína, com comportamento compartilhado real e substituição válida. O template method da Seção 5 é um bom exemplo disso.',
      },
    ],
    quiz: [
      {
        id: 's06c07l06q1',
        type: 'single',
        prompt: 'Qual é o problema central da herança?',
        options: [
          { id: 'a', text: 'O acoplamento à implementação da base, que pode quebrar derivadas não tocadas.', correct: true },
          { id: 'b', text: 'O desempenho do despacho virtual.' },
          { id: 'c', text: 'A quantidade de código.' },
          { id: 'd', text: 'A dificuldade de nomear as classes.' },
        ],
        explanation:
          'É o problema da classe base frágil: mudanças internas da base se propagam para quem herdou.',
      },
      {
        id: 's06c07l06q2',
        type: 'single',
        prompt: 'O que indica que duas características deveriam ser peças compostas?',
        options: [
          { id: 'a', text: 'Precisar de uma subclasse para cada combinação delas.', correct: true },
          { id: 'b', text: 'Elas terem o mesmo tipo.' },
          { id: 'c', text: 'Elas serem opcionais.' },
          { id: 'd', text: 'Elas serem usadas juntas.' },
        ],
        explanation:
          'A explosão combinatória de subclasses é o sinal de que existem dois eixos independentes de variação.',
      },
      {
        id: 's06c07l06q3',
        type: 'single',
        prompt: 'Quando a herança ainda é a escolha certa?',
        options: [
          { id: 'a', text: 'Quando há uma relação "é um" genuína com comportamento compartilhado e substituição válida.', correct: true },
          { id: 'b', text: 'Quando se quer reaproveitar código.' },
          { id: 'c', text: 'Quando as classes têm campos em comum.' },
          { id: 'd', text: 'Nunca.' },
        ],
        explanation:
          'Reaproveitar código é o motivo errado. A relação de substituição é o que justifica a herança.',
      },
    ],
    challenge: {
      brief:
        'Substitua uma explosão de subclasses por duas peças compostas, permitindo trocar o comportamento em tempo de execução.',
      requirements: [
        '`IFormatador` declara `Formatar(string nivel, string mensagem)` devolvendo `string`',
        '`FormatoSimples` devolve `nivel: mensagem`; `FormatoJson` devolve `{"nivel":"X","msg":"Y"}`',
        '`IDestino` declara `Escrever(string linha)` e a propriedade `Total` com a quantidade escrita',
        '`DestinoConsole` imprime a linha; `DestinoMemoria` guarda em uma lista e expõe `Ultima`',
        '`Registrador` recebe formatador e destino no construtor, e os expõe como propriedades com `set` público',
        '`Registrar(string nivel, string mensagem)` formata e escreve',
        'Trocar o formatador ou o destino em tempo de execução muda o comportamento sem criar classe nova',
        'Nenhuma classe herda de outra',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Versao por heranca exigia quatro classes:
//   RegistradorConsoleSimples, RegistradorConsoleJson,
//   RegistradorMemoriaSimples, RegistradorMemoriaJson
//
// Componha duas pecas: IFormatador e IDestino.

class Program
{
    static void Main()
    {
        string mensagem = Console.ReadLine();

        DestinoMemoria memoria = new DestinoMemoria();
        Registrador registrador = new Registrador(new FormatoSimples(), memoria);

        registrador.Registrar("INFO", mensagem);
        Console.WriteLine($"memoria: {memoria.Ultima}");

        registrador.Formatador = new FormatoJson();
        registrador.Registrar("ERRO", mensagem);
        Console.WriteLine($"memoria: {memoria.Ultima}");
        Console.WriteLine($"total memoria: {memoria.Total}");

        registrador.Destino = new DestinoConsole();
        registrador.Registrar("AVISO", mensagem);

        registrador.Formatador = new FormatoSimples();
        registrador.Registrar("DEBUG", mensagem);

        Console.WriteLine($"total console: {registrador.Destino.Total}");
        Console.WriteLine($"total memoria: {memoria.Total}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

interface IFormatador
{
    string Formatar(string nivel, string mensagem);
}

class FormatoSimples : IFormatador
{
    public string Formatar(string nivel, string mensagem)
    {
        return $"{nivel}: {mensagem}";
    }
}

class FormatoJson : IFormatador
{
    public string Formatar(string nivel, string mensagem)
    {
        return "{\\"nivel\\":\\"" + nivel + "\\",\\"msg\\":\\"" + mensagem + "\\"}";
    }
}

interface IDestino
{
    void Escrever(string linha);
    int Total { get; }
}

class DestinoConsole : IDestino
{
    public int Total { get; private set; }

    public void Escrever(string linha)
    {
        Total++;
        Console.WriteLine(linha);
    }
}

class DestinoMemoria : IDestino
{
    private List<string> linhas = new List<string>();

    public int Total => linhas.Count;

    public string Ultima => linhas.Count == 0 ? "nenhuma" : linhas[linhas.Count - 1];

    public void Escrever(string linha)
    {
        linhas.Add(linha);
    }
}

class Registrador
{
    public IFormatador Formatador { get; set; }
    public IDestino Destino { get; set; }

    public Registrador(IFormatador formatador, IDestino destino)
    {
        Formatador = formatador;
        Destino = destino;
    }

    public void Registrar(string nivel, string mensagem)
    {
        Destino.Escrever(Formatador.Formatar(nivel, mensagem));
    }
}

class Program
{
    static void Main()
    {
        string mensagem = Console.ReadLine();

        DestinoMemoria memoria = new DestinoMemoria();
        Registrador registrador = new Registrador(new FormatoSimples(), memoria);

        registrador.Registrar("INFO", mensagem);
        Console.WriteLine($"memoria: {memoria.Ultima}");

        registrador.Formatador = new FormatoJson();
        registrador.Registrar("ERRO", mensagem);
        Console.WriteLine($"memoria: {memoria.Ultima}");
        Console.WriteLine($"total memoria: {memoria.Total}");

        registrador.Destino = new DestinoConsole();
        registrador.Registrar("AVISO", mensagem);

        registrador.Formatador = new FormatoSimples();
        registrador.Registrar("DEBUG", mensagem);

        Console.WriteLine($"total console: {registrador.Destino.Total}");
        Console.WriteLine($"total memoria: {memoria.Total}");
    }
}
`,
      hints: [
        'As duas peças são independentes: quatro combinações saem de duas interfaces com duas implementações cada.',
        'As propriedades do `Registrador` têm `set` público justamente para permitir a troca em execução.',
        'O `Total` do `DestinoMemoria` deriva da lista; o do `DestinoConsole` precisa de um contador próprio.',
      ],
      tests: [
        {
          name: 'Mensagem simples',
          stdin: 'algo aconteceu\n',
          expectedStdout:
            'memoria: INFO: algo aconteceu\n' +
            'memoria: {"nivel":"ERRO","msg":"algo aconteceu"}\ntotal memoria: 2\n' +
            '{"nivel":"AVISO","msg":"algo aconteceu"}\nDEBUG: algo aconteceu\n' +
            'total console: 2\ntotal memoria: 2',
        },
        {
          name: 'Outra mensagem',
          stdin: 'falha na conexao\n',
          expectedStdout:
            'memoria: INFO: falha na conexao\n' +
            'memoria: {"nivel":"ERRO","msg":"falha na conexao"}\ntotal memoria: 2\n' +
            '{"nivel":"AVISO","msg":"falha na conexao"}\nDEBUG: falha na conexao\n' +
            'total console: 2\ntotal memoria: 2',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c07l07',
    title: 'Acoplamento e coesão',
    objective: 'Avaliar um desenho pelas duas medidas que resumem quase tudo.',
    concept: [
      {
        kind: 'text',
        body:
          'Duas medidas resumem a qualidade de um desenho: **acoplamento**, o quanto as partes dependem umas das outras, e **coesão**, o quanto o conteúdo de cada parte pertence junto.',
      },
      {
        kind: 'table',
        headers: ['', 'Acoplamento', 'Coesão'],
        rows: [
          ['mede', 'dependência **entre** módulos', 'unidade **dentro** do módulo'],
          ['o desejável', '**baixo**', '**alta**'],
          ['sintoma ruim', 'mudar um exige mudar outro', 'a classe faz coisas sem relação'],
          ['pergunta', 'quantos módulos essa mudança afeta?', 'esses membros pertencem juntos?'],
        ],
      },
      {
        kind: 'text',
        body:
          'As duas andam juntas na prática: aumentar a coesão de uma classe normalmente reduz o acoplamento dela, porque as partes que não pertenciam ali levam consigo as dependências que só elas precisavam.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A medida prática de acoplamento é: **quantos arquivos preciso abrir para fazer esta mudança?** Se uma alteração simples exige tocar em sete lugares, o acoplamento está alto — independentemente do que qualquer diagrama mostre.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Acoplamento zero é impossível e indesejável: partes que não se comunicam não formam um sistema. O objetivo é que as dependências sejam **poucas, explícitas e estáveis** — não que não existam.',
      },
      {
        kind: 'text',
        body:
          'Dependências explícitas — declaradas no construtor ou na assinatura — são muito melhores que implícitas, escondidas em variáveis estáticas ou instanciações internas. As primeiras aparecem; as segundas surpreendem.',
      },
    ],
    quiz: [
      {
        id: 's06c07l07q1',
        type: 'single',
        prompt: 'Qual é a combinação desejável?',
        options: [
          { id: 'a', text: 'Acoplamento baixo e coesão alta.', correct: true },
          { id: 'b', text: 'Acoplamento alto e coesão alta.' },
          { id: 'c', text: 'Acoplamento baixo e coesão baixa.' },
          { id: 'd', text: 'Acoplamento zero e coesão baixa.' },
        ],
        explanation:
          'Cada módulo deve ser internamente unido e externamente independente.',
      },
      {
        id: 's06c07l07q2',
        type: 'single',
        prompt: 'Qual é a medida prática de acoplamento?',
        options: [
          { id: 'a', text: 'Quantos arquivos você precisa abrir para fazer uma mudança.', correct: true },
          { id: 'b', text: 'Quantas classes existem no projeto.' },
          { id: 'c', text: 'Quantos métodos cada classe tem.' },
          { id: 'd', text: 'O número de interfaces.' },
        ],
        explanation:
          'É observável no dia a dia e não depende de nenhuma ferramenta de análise.',
      },
      {
        id: 's06c07l07q3',
        type: 'single',
        prompt: 'Por que acoplamento zero é indesejável?',
        options: [
          { id: 'a', text: 'Porque partes que não se comunicam não formam um sistema.', correct: true },
          { id: 'b', text: 'Porque prejudica o desempenho.' },
          { id: 'c', text: 'Porque exige mais código.' },
          { id: 'd', text: 'Acoplamento zero é o ideal.' },
        ],
        explanation:
          'O objetivo é dependências poucas, explícitas e estáveis — não ausência de dependências.',
      },
    ],
    challenge: {
      brief:
        'Aumente a coesão de uma classe que mistura assuntos e torne explícitas as dependências que ela escondia.',
      requirements: [
        '`CalculadoraPreco` recebe a taxa de imposto no construtor e calcula `ComImposto(decimal valor)`',
        '`FormatadorMoeda` recebe o símbolo no construtor e devolve `simbolo valor` com duas casas',
        '`ContadorAcessos` conta chamadas e expõe `Total`',
        '`Loja` recebe as três dependências no construtor — nenhuma é instanciada internamente',
        '`Loja.Vender(decimal valor)` conta o acesso, aplica o imposto e devolve o valor formatado',
        '`Loja.Relatorio()` devolve `N vendas, total simbolo X.XX` com a soma dos valores já com imposto',
        'A `Loja` não conhece a taxa de imposto nem o símbolo da moeda',
        'Cada classe tem um só assunto',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Esta classe mistura tres assuntos e esconde as dependencias:
//
// class Loja
// {
//     private const decimal TAXA = 0.18m;   // implicito
//     private const string SIMBOLO = "R$";  // implicito
//     private int acessos;
//     string Vender(decimal v) { acessos++; return SIMBOLO + " " + (v * 1.18m); }
// }
//
// Separe em CalculadoraPreco, FormatadorMoeda e ContadorAcessos,
// e injete as tres na Loja.

class Program
{
    static void Main()
    {
        decimal valor = decimal.Parse(Console.ReadLine());
        decimal taxa = decimal.Parse(Console.ReadLine());
        string simbolo = Console.ReadLine();

        CalculadoraPreco calculadora = new CalculadoraPreco(taxa);
        FormatadorMoeda formatador = new FormatadorMoeda(simbolo);
        ContadorAcessos contador = new ContadorAcessos();

        Loja loja = new Loja(calculadora, formatador, contador);

        Console.WriteLine($"venda: {loja.Vender(valor)}");
        Console.WriteLine($"venda: {loja.Vender(valor * 2)}");
        Console.WriteLine($"acessos: {contador.Total}");
        Console.WriteLine(loja.Relatorio());

        Loja outra = new Loja(new CalculadoraPreco(0), new FormatadorMoeda("USD"), new ContadorAcessos());
        Console.WriteLine($"sem imposto: {outra.Vender(valor)}");
        Console.WriteLine(outra.Relatorio());

        Console.WriteLine($"calculadora isolada: {calculadora.ComImposto(100):F2}");
        Console.WriteLine($"formatador isolado: {formatador.Formatar(9.5m)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class CalculadoraPreco
{
    private decimal taxa;

    public CalculadoraPreco(decimal taxa)
    {
        this.taxa = taxa;
    }

    public decimal ComImposto(decimal valor)
    {
        return valor + valor * taxa;
    }
}

class FormatadorMoeda
{
    private string simbolo;

    public FormatadorMoeda(string simbolo)
    {
        this.simbolo = simbolo;
    }

    public string Formatar(decimal valor)
    {
        return $"{simbolo} {valor:F2}";
    }
}

class ContadorAcessos
{
    public int Total { get; private set; }

    public void Registrar()
    {
        Total++;
    }
}

class Loja
{
    private CalculadoraPreco calculadora;
    private FormatadorMoeda formatador;
    private ContadorAcessos contador;
    private decimal acumulado;

    public Loja(CalculadoraPreco calculadora, FormatadorMoeda formatador, ContadorAcessos contador)
    {
        this.calculadora = calculadora;
        this.formatador = formatador;
        this.contador = contador;
    }

    public string Vender(decimal valor)
    {
        contador.Registrar();

        decimal comImposto = calculadora.ComImposto(valor);
        acumulado += comImposto;

        return formatador.Formatar(comImposto);
    }

    public string Relatorio()
    {
        return $"{contador.Total} vendas, total {formatador.Formatar(acumulado)}";
    }
}

class Program
{
    static void Main()
    {
        decimal valor = decimal.Parse(Console.ReadLine());
        decimal taxa = decimal.Parse(Console.ReadLine());
        string simbolo = Console.ReadLine();

        CalculadoraPreco calculadora = new CalculadoraPreco(taxa);
        FormatadorMoeda formatador = new FormatadorMoeda(simbolo);
        ContadorAcessos contador = new ContadorAcessos();

        Loja loja = new Loja(calculadora, formatador, contador);

        Console.WriteLine($"venda: {loja.Vender(valor)}");
        Console.WriteLine($"venda: {loja.Vender(valor * 2)}");
        Console.WriteLine($"acessos: {contador.Total}");
        Console.WriteLine(loja.Relatorio());

        Loja outra = new Loja(new CalculadoraPreco(0), new FormatadorMoeda("USD"), new ContadorAcessos());
        Console.WriteLine($"sem imposto: {outra.Vender(valor)}");
        Console.WriteLine(outra.Relatorio());

        Console.WriteLine($"calculadora isolada: {calculadora.ComImposto(100):F2}");
        Console.WriteLine($"formatador isolado: {formatador.Formatar(9.5m)}");
    }
}
`,
      hints: [
        'A `Loja` guarda apenas o acumulado — todo o resto ela pede às dependências.',
        'Repare que cada peça pode ser usada e testada sozinha, como o `Main` demonstra nas duas últimas linhas.',
        'O `Relatorio` reusa o mesmo formatador da venda, sem repetir a formatação.',
      ],
      tests: [
        {
          name: 'Imposto de 18 por cento',
          stdin: '100\n0.18\nR$\n',
          expectedStdout:
            'venda: R$ 118.00\nvenda: R$ 236.00\nacessos: 2\n2 vendas, total R$ 354.00\n' +
            'sem imposto: USD 100.00\n1 vendas, total USD 100.00\n' +
            'calculadora isolada: 118.00\nformatador isolado: R$ 9.50',
        },
        {
          name: 'Imposto de 10 por cento',
          stdin: '50\n0.10\nEUR\n',
          expectedStdout:
            'venda: EUR 55.00\nvenda: EUR 110.00\nacessos: 2\n2 vendas, total EUR 165.00\n' +
            'sem imposto: USD 50.00\n1 vendas, total USD 50.00\n' +
            'calculadora isolada: 110.00\nformatador isolado: EUR 9.50',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c07l08',
    title: 'Injeção de dependência na mão',
    objective: 'Montar o grafo de objetos em um único lugar, sem framework.',
    concept: [
      {
        kind: 'text',
        body:
          '**Injeção de dependência** é apenas isto: em vez de a classe criar o que precisa, ela recebe pronto. O nome soa complicado; a técnica cabe em uma linha.',
      },
      {
        kind: 'compare',
        good: `class Servico
{
    private IRepo repo;

    public Servico(IRepo repo)
    {
        this.repo = repo;
    }
}`,
        bad: `class Servico
{
    private IRepo repo
        = new RepoSql();

    // decide sozinho,
    // e ninguem pode mudar
}`,
        goodLabel: 'Recebe a dependência',
        badLabel: 'Cria a dependência',
      },
      {
        kind: 'text',
        body:
          'Alguém ainda precisa decidir qual implementação usar. Esse lugar tem nome: **raiz de composição**, e normalmente é o `Main` ou a configuração inicial do programa — um ponto único onde o grafo inteiro é montado.',
      },
      {
        kind: 'code',
        code: `// raiz de composicao: um lugar so
var repo = new RepoSql(conexao);
var email = new EmailSmtp(servidor);
var servico = new Servico(repo, email);

servico.Executar();`,
      },
      {
        kind: 'table',
        headers: ['Forma de injeção', 'Quando'],
        rows: [
          ['por construtor', 'dependência obrigatória — **prefira esta**'],
          ['por propriedade', 'dependência opcional ou trocável'],
          ['por parâmetro de método', 'usada só naquele método'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A injeção por construtor tem uma vantagem que as outras não têm: ela torna a dependência **obrigatória e visível**. Não existe como criar o objeto em estado incompleto, e a assinatura documenta tudo que ele precisa.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um construtor com oito dependências não é um problema de injeção — é um aviso de que a classe faz coisas demais. O framework de injeção esconderia o sintoma; a solução é dividir a classe.',
      },
    ],
    quiz: [
      {
        id: 's06c07l08q1',
        type: 'single',
        prompt: 'O que é a raiz de composição?',
        options: [
          { id: 'a', text: 'O lugar único onde o grafo de objetos é montado, normalmente o `Main`.', correct: true },
          { id: 'b', text: 'A classe base da hierarquia.' },
          { id: 'c', text: 'A primeira interface do projeto.' },
          { id: 'd', text: 'O arquivo de configuração.' },
        ],
        explanation:
          'Concentrar as decisões de instanciação em um ponto deixa todo o resto do código livre de tipos concretos.',
      },
      {
        id: 's06c07l08q2',
        type: 'single',
        prompt: 'Qual é a vantagem da injeção por construtor?',
        options: [
          { id: 'a', text: 'Torna a dependência obrigatória e visível na assinatura.', correct: true },
          { id: 'b', text: 'É mais rápida.' },
          { id: 'c', text: 'Permite trocar em execução.' },
          { id: 'd', text: 'Dispensa interfaces.' },
        ],
        explanation:
          'Não há como criar o objeto sem fornecer o que ele precisa, e a assinatura documenta as dependências.',
      },
      {
        id: 's06c07l08q3',
        type: 'single',
        prompt: 'O que um construtor com oito dependências indica?',
        options: [
          { id: 'a', text: 'Que a classe faz coisas demais e deveria ser dividida.', correct: true },
          { id: 'b', text: 'Que falta um framework de injeção.' },
          { id: 'c', text: 'Que as dependências deveriam ser propriedades.' },
          { id: 'd', text: 'Que o desenho está correto.' },
        ],
        explanation:
          'O framework apenas esconderia o sintoma. O número alto é informação sobre a responsabilidade da classe.',
      },
    ],
    challenge: {
      brief:
        'Monte manualmente o grafo de objetos de um sistema de importação, com toda a instanciação concentrada na raiz de composição.',
      requirements: [
        '`IValidador` declara `Valido(string linha)`; `ValidadorTamanho` recebe o mínimo e aprova linhas com pelo menos esse comprimento',
        '`ITransformador` declara `Transformar(string linha)`; `ParaMaiusculas` converte; `SemEspacos` remove espaços',
        '`IRegistro` declara `Registrar(string linha)` e a propriedade `Total`',
        '`RegistroMemoria` guarda as linhas e expõe `Ultima`',
        '`Importador` recebe um `IValidador`, uma **lista** de `ITransformador` e um `IRegistro` no construtor',
        '`Importar(List<string> linhas)` valida cada linha, aplica os transformadores na ordem e registra; devolve quantas foram aceitas',
        '`Importador` não instancia nada — tudo vem pelo construtor',
        'Toda a instanciação acontece no `Main`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Escreva IValidador, ValidadorTamanho, ITransformador, ParaMaiusculas,
// SemEspacos, IRegistro, RegistroMemoria e Importador.
//
// O Importador recebe tudo pelo construtor e nao cria nenhuma instancia.

class Program
{
    static void Main()
    {
        int minimo = int.Parse(Console.ReadLine());
        int n = int.Parse(Console.ReadLine());

        List<string> linhas = new List<string>();

        for (int i = 0; i < n; i++)
        {
            linhas.Add(Console.ReadLine());
        }

        // raiz de composicao
        IValidador validador = new ValidadorTamanho(minimo);
        List<ITransformador> transformadores = new List<ITransformador>
        {
            new ParaMaiusculas(),
            new SemEspacos()
        };
        RegistroMemoria registro = new RegistroMemoria();

        Importador importador = new Importador(validador, transformadores, registro);

        Console.WriteLine($"aceitas: {importador.Importar(linhas)}");
        Console.WriteLine($"registradas: {registro.Total}");
        Console.WriteLine($"ultima: {registro.Ultima}");

        // outra composicao, sem transformadores
        RegistroMemoria outroRegistro = new RegistroMemoria();
        Importador semTransformacao = new Importador(
            new ValidadorTamanho(0),
            new List<ITransformador>(),
            outroRegistro);

        Console.WriteLine($"aceitas sem filtro: {semTransformacao.Importar(linhas)}");
        Console.WriteLine($"ultima sem transformar: {outroRegistro.Ultima}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

interface IValidador
{
    bool Valido(string linha);
}

class ValidadorTamanho : IValidador
{
    private int minimo;

    public ValidadorTamanho(int minimo)
    {
        this.minimo = minimo;
    }

    public bool Valido(string linha)
    {
        return linha != null && linha.Length >= minimo;
    }
}

interface ITransformador
{
    string Transformar(string linha);
}

class ParaMaiusculas : ITransformador
{
    public string Transformar(string linha)
    {
        return linha.ToUpper();
    }
}

class SemEspacos : ITransformador
{
    public string Transformar(string linha)
    {
        return linha.Replace(" ", "");
    }
}

interface IRegistro
{
    void Registrar(string linha);
    int Total { get; }
}

class RegistroMemoria : IRegistro
{
    private List<string> linhas = new List<string>();

    public int Total => linhas.Count;

    public string Ultima => linhas.Count == 0 ? "nenhuma" : linhas[linhas.Count - 1];

    public void Registrar(string linha)
    {
        linhas.Add(linha);
    }
}

class Importador
{
    private IValidador validador;
    private List<ITransformador> transformadores;
    private IRegistro registro;

    public Importador(IValidador validador, List<ITransformador> transformadores, IRegistro registro)
    {
        this.validador = validador;
        this.transformadores = transformadores;
        this.registro = registro;
    }

    public int Importar(List<string> linhas)
    {
        int aceitas = 0;

        foreach (string linha in linhas)
        {
            if (!validador.Valido(linha))
            {
                continue;
            }

            string atual = linha;

            foreach (ITransformador transformador in transformadores)
            {
                atual = transformador.Transformar(atual);
            }

            registro.Registrar(atual);
            aceitas++;
        }

        return aceitas;
    }
}

class Program
{
    static void Main()
    {
        int minimo = int.Parse(Console.ReadLine());
        int n = int.Parse(Console.ReadLine());

        List<string> linhas = new List<string>();

        for (int i = 0; i < n; i++)
        {
            linhas.Add(Console.ReadLine());
        }

        IValidador validador = new ValidadorTamanho(minimo);
        List<ITransformador> transformadores = new List<ITransformador>
        {
            new ParaMaiusculas(),
            new SemEspacos()
        };
        RegistroMemoria registro = new RegistroMemoria();

        Importador importador = new Importador(validador, transformadores, registro);

        Console.WriteLine($"aceitas: {importador.Importar(linhas)}");
        Console.WriteLine($"registradas: {registro.Total}");
        Console.WriteLine($"ultima: {registro.Ultima}");

        RegistroMemoria outroRegistro = new RegistroMemoria();
        Importador semTransformacao = new Importador(
            new ValidadorTamanho(0),
            new List<ITransformador>(),
            outroRegistro);

        Console.WriteLine($"aceitas sem filtro: {semTransformacao.Importar(linhas)}");
        Console.WriteLine($"ultima sem transformar: {outroRegistro.Ultima}");
    }
}
`,
      hints: [
        'Os transformadores são aplicados em cadeia: a saída de um é a entrada do próximo.',
        'A lista vazia de transformadores faz a linha passar intacta — o laço interno não roda.',
        'O `Importador` funciona com qualquer combinação porque só conhece as três interfaces.',
      ],
      tests: [
        {
          name: 'Linhas variadas',
          stdin: '5\n4\nabc\nlinha longa\nolá\nteste final\n',
          expectedStdout:
            'aceitas: 2\nregistradas: 2\nultima: TESTEFINAL\n' +
            'aceitas sem filtro: 4\nultima sem transformar: teste final',
        },
        {
          name: 'Minimo zero',
          stdin: '0\n2\nab\ncd ef\n',
          expectedStdout:
            'aceitas: 2\nregistradas: 2\nultima: CDEF\n' +
            'aceitas sem filtro: 2\nultima sem transformar: cd ef',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c07l09',
    title: 'Prática: identificando code smells',
    objective: 'Reconhecer os sinais que indicam problemas de desenho antes de decidir como corrigi-los.',
    concept: [
      {
        kind: 'text',
        body:
          'Um **code smell** não é um bug: é um sinal de que algo no desenho pode estar errado. Ele não prova o problema — indica onde vale a pena olhar.',
      },
      {
        kind: 'table',
        headers: ['Smell', 'O que sugere', 'Refatoração'],
        rows: [
          ['método longo', 'responsabilidades demais', 'extrair método'],
          ['classe grande', 'mais de um motivo para mudar', 'extrair classe'],
          ['lista longa de parâmetros', 'conceito faltando', 'objeto de parâmetro'],
          ['inveja de recurso', 'método no lugar errado', 'mover método'],
          ['obsessão por primitivos', 'tipo de domínio faltando', 'criar o tipo'],
          ['cadeia de mensagens', 'acoplamento a estrutura interna', 'delegar'],
          ['cirurgia com rifle', 'uma mudança espalhada', 'juntar o que muda junto'],
        ],
      },
      {
        kind: 'text',
        body:
          '**Inveja de recurso** é um método que usa mais dados de outra classe do que da própria — ele está no lugar errado. **Obsessão por primitivos** é representar um CPF, um dinheiro ou um período como `string` e `int` soltos.',
      },
      {
        kind: 'code',
        code: `// cadeia de mensagens: acoplado a tres niveis
pedido.Cliente.Endereco.Cidade.Nome

// delegando: acoplado a um
pedido.CidadeDeEntrega()`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '**Cirurgia com rifle** é o oposto da classe grande: uma mudança simples exige alterações pequenas em muitos arquivos. O problema é o mesmo — o que muda junto não está junto.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Smell não é sentença. Um método longo pode ser a forma mais clara de expressar um algoritmo sequencial. Investigue antes de refatorar, e refatore quando encontrar um problema real — não porque a lista pediu.',
      },
    ],
    quiz: [
      {
        id: 's06c07l09q1',
        type: 'single',
        prompt: 'O que é "inveja de recurso"?',
        options: [
          { id: 'a', text: 'Um método que usa mais dados de outra classe do que da própria.', correct: true },
          { id: 'b', text: 'Uma classe que depende de muitas outras.' },
          { id: 'c', text: 'Um método que consome muita memória.' },
          { id: 'd', text: 'Herança usada onde caberia composição.' },
        ],
        explanation:
          'É o sinal clássico de método no lugar errado: ele pertence à classe cujos dados ele mais usa.',
      },
      {
        id: 's06c07l09q2',
        type: 'single',
        prompt: 'O que é "cirurgia com rifle"?',
        options: [
          { id: 'a', text: 'Uma mudança simples que exige alterações pequenas em muitos arquivos.', correct: true },
          { id: 'b', text: 'Uma refatoração grande demais.' },
          { id: 'c', text: 'Remover muitas linhas de uma vez.' },
          { id: 'd', text: 'Alterar uma classe base.' },
        ],
        explanation:
          'O que deveria mudar junto está espalhado — o oposto da classe grande, com a mesma causa raiz.',
      },
      {
        id: 's06c07l09q3',
        type: 'single',
        prompt: 'Um smell prova que existe um problema?',
        options: [
          { id: 'a', text: 'Não: ele indica onde vale a pena olhar.', correct: true },
          { id: 'b', text: 'Sim, sempre.' },
          { id: 'c', text: 'Sim, se aparecer mais de uma vez.' },
          { id: 'd', text: 'Só em código legado.' },
        ],
        explanation:
          'Um método longo pode ser a forma mais clara de expressar um algoritmo sequencial. O smell inicia a investigação, não a conclui.',
      },
    ],
    challenge: {
      brief:
        'Identifique e corrija quatro smells em um módulo: obsessão por primitivos, inveja de recurso, cadeia de mensagens e lista longa de parâmetros.',
      requirements: [
        '`Cpf` é um tipo de domínio que recebe o texto, valida `11` dígitos numéricos e expõe `Valido` e `Formatado` no padrão `XXX.XXX.XXX-XX`',
        '`Endereco` recebe rua e cidade, com `Resumo()` devolvendo `rua, cidade`',
        '`Cliente` recebe nome, `Cpf` e `Endereco`',
        '`Cliente.CidadeDeEntrega()` delega ao endereço, eliminando a cadeia de mensagens',
        '`Cliente.Etiqueta()` mora no `Cliente`, não fora dele — ele é quem tem os dados',
        '`DadosCobranca` agrupa valor, parcelas e juros, substituindo a lista longa de parâmetros',
        '`Cobranca.Calcular(DadosCobranca dados)` devolve o valor da parcela com juros simples: `valor * (1 + juros) / parcelas`',
        'Nenhum método recebe valor, parcelas e juros como três parâmetros soltos',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Quatro smells neste modulo:
//
// 1. obsessao por primitivos: string cpf solto por todo lado
// 2. cadeia de mensagens: cliente.Endereco.Cidade em quem usa
// 3. inveja de recurso: static string Etiqueta(Cliente c) usando so dados de c
// 4. lista longa de parametros: Calcular(decimal valor, int parcelas, decimal juros)
//
// Corrija os quatro.

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        string cpf = Console.ReadLine();
        string rua = Console.ReadLine();
        string cidade = Console.ReadLine();
        decimal valor = decimal.Parse(Console.ReadLine());
        int parcelas = int.Parse(Console.ReadLine());

        Cliente cliente = new Cliente(nome, new Cpf(cpf), new Endereco(rua, cidade));

        Console.WriteLine(cliente.Etiqueta());
        Console.WriteLine($"cidade: {cliente.CidadeDeEntrega()}");
        Console.WriteLine($"cpf valido: {cliente.Cpf.Valido}");
        Console.WriteLine($"cpf formatado: {cliente.Cpf.Formatado}");

        Cpf invalido = new Cpf("123");
        Console.WriteLine($"cpf curto valido: {invalido.Valido}");
        Console.WriteLine($"cpf curto formatado: {invalido.Formatado}");

        DadosCobranca dados = new DadosCobranca(valor, parcelas, 0.10m);
        Console.WriteLine($"parcela: {Cobranca.Calcular(dados):F2}");

        DadosCobranca avista = new DadosCobranca(valor, 1, 0m);
        Console.WriteLine($"a vista: {Cobranca.Calcular(avista):F2}");
    }
}
`,
      solution: `using System;

class Cpf
{
    private const int TamanhoCpf = 11;

    private string digitos;

    public Cpf(string texto)
    {
        digitos = texto ?? "";
    }

    public bool Valido
    {
        get
        {
            if (digitos.Length != TamanhoCpf)
            {
                return false;
            }

            foreach (char c in digitos)
            {
                if (c < '0' || c > '9')
                {
                    return false;
                }
            }

            return true;
        }
    }

    public string Formatado
    {
        get
        {
            if (!Valido)
            {
                return "invalido";
            }

            return $"{digitos.Substring(0, 3)}.{digitos.Substring(3, 3)}.{digitos.Substring(6, 3)}-{digitos.Substring(9, 2)}";
        }
    }
}

class Endereco
{
    public string Rua { get; }
    public string Cidade { get; }

    public Endereco(string rua, string cidade)
    {
        Rua = rua;
        Cidade = cidade;
    }

    public string Resumo()
    {
        return $"{Rua}, {Cidade}";
    }
}

class Cliente
{
    public string Nome { get; }
    public Cpf Cpf { get; }
    public Endereco Endereco { get; }

    public Cliente(string nome, Cpf cpf, Endereco endereco)
    {
        Nome = nome;
        Cpf = cpf;
        Endereco = endereco;
    }

    public string CidadeDeEntrega()
    {
        return Endereco.Cidade;
    }

    public string Etiqueta()
    {
        return $"{Nome} ({Cpf.Formatado}) - {Endereco.Resumo()}";
    }
}

class DadosCobranca
{
    public decimal Valor { get; }
    public int Parcelas { get; }
    public decimal Juros { get; }

    public DadosCobranca(decimal valor, int parcelas, decimal juros)
    {
        Valor = valor;
        Parcelas = parcelas;
        Juros = juros;
    }
}

class Cobranca
{
    public static decimal Calcular(DadosCobranca dados)
    {
        if (dados.Parcelas <= 0)
        {
            return 0;
        }

        return dados.Valor * (1 + dados.Juros) / dados.Parcelas;
    }
}

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        string cpf = Console.ReadLine();
        string rua = Console.ReadLine();
        string cidade = Console.ReadLine();
        decimal valor = decimal.Parse(Console.ReadLine());
        int parcelas = int.Parse(Console.ReadLine());

        Cliente cliente = new Cliente(nome, new Cpf(cpf), new Endereco(rua, cidade));

        Console.WriteLine(cliente.Etiqueta());
        Console.WriteLine($"cidade: {cliente.CidadeDeEntrega()}");
        Console.WriteLine($"cpf valido: {cliente.Cpf.Valido}");
        Console.WriteLine($"cpf formatado: {cliente.Cpf.Formatado}");

        Cpf invalido = new Cpf("123");
        Console.WriteLine($"cpf curto valido: {invalido.Valido}");
        Console.WriteLine($"cpf curto formatado: {invalido.Formatado}");

        DadosCobranca dados = new DadosCobranca(valor, parcelas, 0.10m);
        Console.WriteLine($"parcela: {Cobranca.Calcular(dados):F2}");

        DadosCobranca avista = new DadosCobranca(valor, 1, 0m);
        Console.WriteLine($"a vista: {Cobranca.Calcular(avista):F2}");
    }
}
`,
      hints: [
        'O `Cpf` resolve a obsessão por primitivos: a validação e a formatação passam a morar com o dado.',
        'A `Etiqueta` era estática e usava só dados do cliente — inveja de recurso clássica, resolvida movendo o método.',
        'O `CidadeDeEntrega` delega, encurtando `cliente.Endereco.Cidade` para uma chamada só.',
      ],
      tests: [
        {
          name: 'Cliente com CPF valido',
          stdin: 'Ana Silva\n12345678901\nRua A 100\nRecife\n1000\n10\n',
          expectedStdout:
            'Ana Silva (123.456.789-01) - Rua A 100, Recife\ncidade: Recife\n' +
            'cpf valido: True\ncpf formatado: 123.456.789-01\n' +
            'cpf curto valido: False\ncpf curto formatado: invalido\n' +
            'parcela: 110.00\na vista: 1000.00',
        },
        {
          name: 'Outro cliente',
          stdin: 'Bruno Lima\n98765432100\nAv B 20\nOlinda\n500\n5\n',
          expectedStdout:
            'Bruno Lima (987.654.321-00) - Av B 20, Olinda\ncidade: Olinda\n' +
            'cpf valido: True\ncpf formatado: 987.654.321-00\n' +
            'cpf curto valido: False\ncpf curto formatado: invalido\n' +
            'parcela: 110.00\na vista: 500.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c07l10',
    title: 'Boss: reescrevendo um módulo legado',
    objective: 'Reunir a seção inteira: caracterizar, corrigir, refatorar e desenhar um módulo legado com testes.',
    concept: [
      {
        kind: 'text',
        body:
          'Este é o desafio final da seção. Ele percorre o ciclo completo de trabalho com código legado, na ordem que dá certo.',
      },
      {
        kind: 'table',
        headers: ['Etapa', 'Da seção', 'O que fazer'],
        rows: [
          ['1. caracterizar', 'capítulo 4', 'testes do comportamento atual'],
          ['2. tratar erros', 'capítulos 1 e 2', 'exceções onde o legado ignorava'],
          ['3. limpar', 'capítulo 5', 'nomes, constantes, aninhamento'],
          ['4. refatorar', 'capítulo 6', 'extrair, dividir, desduplicar'],
          ['5. desenhar', 'capítulo 7', 'responsabilidades e dependências'],
        ],
      },
      {
        kind: 'text',
        body:
          'A ordem importa. Caracterizar primeiro dá a rede de segurança; tratar erros antes de refatorar evita reorganizar código que engole falhas; e o desenho vem por último, quando você já entende o domínio.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O maior erro com legado é começar reescrevendo do zero. O código feio funcionando embute anos de casos especiais que ninguém lembra — e a reescrita redescobre cada um deles em produção.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Distinga **preservar comportamento** de **preservar bug**. Quando um teste de caracterização registra algo claramente errado, isso é uma decisão a tomar de forma explícita — não algo a manter por inércia.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Construa por etapas e rode a cada uma. Cinco transformações aplicadas de uma vez, se quebrarem, não dizem qual delas quebrou — e você perde a vantagem de ter começado pelos testes.',
      },
    ],
    quiz: [
      {
        id: 's06c07l10q1',
        type: 'single',
        prompt: 'Por que caracterizar antes de qualquer outra coisa?',
        options: [
          { id: 'a', text: 'Porque os testes são a rede de segurança de todas as etapas seguintes.', correct: true },
          { id: 'b', text: 'Porque é a etapa mais rápida.' },
          { id: 'c', text: 'Porque revela os bugs.' },
          { id: 'd', text: 'Porque melhora a cobertura.' },
        ],
        explanation:
          'Sem eles, cada transformação seguinte é uma aposta sem confirmação.',
      },
      {
        id: 's06c07l10q2',
        type: 'single',
        prompt: 'Por que reescrever do zero costuma dar errado?',
        options: [
          { id: 'a', text: 'Porque o código antigo embute anos de casos especiais que ninguém lembra.', correct: true },
          { id: 'b', text: 'Porque leva mais tempo.' },
          { id: 'c', text: 'Porque a linguagem muda.' },
          { id: 'd', text: 'Porque perde o histórico de versões.' },
        ],
        explanation:
          'Cada trecho estranho costuma ser a cicatriz de um bug real, e a reescrita os redescobre um a um em produção.',
      },
      {
        id: 's06c07l10q3',
        type: 'single',
        prompt: 'O teste registrou um comportamento claramente errado. O que fazer?',
        options: [
          { id: 'a', text: 'Tomar a decisão de forma explícita, em vez de mantê-lo por inércia.', correct: true },
          { id: 'b', text: 'Manter, porque refatoração preserva comportamento.' },
          { id: 'c', text: 'Corrigir junto com a refatoração.' },
          { id: 'd', text: 'Remover o teste.' },
        ],
        explanation:
          'Preservar comportamento é a regra da refatoração, não uma obrigação de manter bugs para sempre.',
      },
    ],
    challenge: {
      brief:
        'Reescreva um módulo legado de processamento de matrículas: caracterize, trate os erros que ele ignorava, limpe, refatore e desenhe as dependências.',
      requirements: [
        '`MatriculaInvalidaException` é customizada, guarda `Campo` e tem a mensagem `campo X invalido`',
        '`Aluno` recebe nome e idade; nome em branco ou idade fora de `0` a `120` lança `MatriculaInvalidaException`',
        '`Curso` recebe nome e vagas; vagas não positivas lançam `MatriculaInvalidaException` no campo `vagas`',
        '`ICalculadoraMensalidade` declara `Calcular(int idade)`; `MensalidadePadrao` cobra `500`, com 50 por cento de desconto para menores de `18` e 30 por cento para `60` ou mais',
        '`IRegistroMatriculas` declara `Registrar(string aluno, string curso)` devolvendo `int` e a propriedade `Total`',
        '`RegistroMemoria` devolve identificadores sequenciais a partir de `1`',
        '`SistemaMatricula` recebe a calculadora e o registro no construtor, e não instancia nenhuma das duas',
        '`Matricular(Aluno aluno, Curso curso)` devolve `matricula N: aluno em curso, R$ X.XX`',
        'Curso sem vagas restantes lança `InvalidOperationException` com a mensagem `curso lotado`',
        'Cada matrícula ocupa uma vaga; `Curso.VagasRestantes` reflete isso',
        '`Verificar(string, bool)` e `Lanca<T>(Action)` sustentam a bateria de testes',
        '`RodarTestes()` verifica os oito casos esperados, na ordem dada',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Modulo legado (resumo do que ele fazia):
//
// class MatriculaManager
// {
//     static List<string> registros = new List<string>();
//     static string M(string n, int i, string c, int v)
//     {
//         // sem validacao nenhuma: aceita nome vazio, idade negativa, vagas zero
//         decimal m = 500;
//         if (i < 18) m = m * 0.5m;
//         if (i >= 60) m = m * 0.7m;
//         registros.Add(n + c);
//         return "matricula " + registros.Count + ": " + n + " em " + c + ", R$ " + m;
//     }
// }
//
// Reescreva aplicando a secao inteira.

class Program
{
    static int passou = 0;
    static int total = 0;

    // Escreva MatriculaInvalidaException, Aluno, Curso,
    // ICalculadoraMensalidade, MensalidadePadrao,
    // IRegistroMatriculas, RegistroMemoria, SistemaMatricula,
    // Verificar, Lanca<T>, Relatorio e RodarTestes.
    //
    // Os oito testes, nesta ordem e com estes nomes:
    //   "aluno com nome vazio e recusado"
    //   "aluno com idade negativa e recusado"
    //   "aluno com idade absurda e recusado"
    //   "curso sem vagas e recusado"
    //   "menor de idade tem meia mensalidade"
    //   "idoso tem 30 por cento de desconto"
    //   "adulto paga integral"
    //   "curso lotado recusa matricula"

    static void Main()
    {
        RodarTestes();
        Relatorio();

        ICalculadoraMensalidade calculadora = new MensalidadePadrao();
        IRegistroMatriculas registro = new RegistroMemoria();
        SistemaMatricula sistema = new SistemaMatricula(calculadora, registro);

        Curso curso = new Curso("Programacao", 3);

        Console.WriteLine(sistema.Matricular(new Aluno("Ana", 30), curso));
        Console.WriteLine(sistema.Matricular(new Aluno("Bruno", 15), curso));
        Console.WriteLine(sistema.Matricular(new Aluno("Carla", 65), curso));

        Console.WriteLine($"vagas restantes: {curso.VagasRestantes}");
        Console.WriteLine($"total registrado: {registro.Total}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class MatriculaInvalidaException : Exception
{
    public string Campo { get; }

    public MatriculaInvalidaException(string campo)
        : base($"campo {campo} invalido")
    {
        Campo = campo;
    }
}

class Aluno
{
    private const int IdadeMaxima = 120;

    public string Nome { get; }
    public int Idade { get; }

    public Aluno(string nome, int idade)
    {
        if (string.IsNullOrWhiteSpace(nome))
        {
            throw new MatriculaInvalidaException("nome");
        }

        if (idade < 0 || idade > IdadeMaxima)
        {
            throw new MatriculaInvalidaException("idade");
        }

        Nome = nome;
        Idade = idade;
    }
}

class Curso
{
    public string Nome { get; }
    public int Vagas { get; }
    public int Ocupadas { get; private set; }

    public Curso(string nome, int vagas)
    {
        if (string.IsNullOrWhiteSpace(nome))
        {
            throw new MatriculaInvalidaException("nome");
        }

        if (vagas <= 0)
        {
            throw new MatriculaInvalidaException("vagas");
        }

        Nome = nome;
        Vagas = vagas;
    }

    public int VagasRestantes => Vagas - Ocupadas;

    public void Ocupar()
    {
        if (VagasRestantes <= 0)
        {
            throw new InvalidOperationException("curso lotado");
        }

        Ocupadas++;
    }
}

interface ICalculadoraMensalidade
{
    decimal Calcular(int idade);
}

class MensalidadePadrao : ICalculadoraMensalidade
{
    private const decimal ValorBase = 500m;
    private const int IdadeMaioridade = 18;
    private const int IdadeIdoso = 60;
    private const decimal DescontoMenor = 0.5m;
    private const decimal DescontoIdoso = 0.7m;

    public decimal Calcular(int idade)
    {
        if (idade < IdadeMaioridade)
        {
            return ValorBase * DescontoMenor;
        }

        if (idade >= IdadeIdoso)
        {
            return ValorBase * DescontoIdoso;
        }

        return ValorBase;
    }
}

interface IRegistroMatriculas
{
    int Registrar(string aluno, string curso);
    int Total { get; }
}

class RegistroMemoria : IRegistroMatriculas
{
    private List<string> registros = new List<string>();

    public int Total => registros.Count;

    public int Registrar(string aluno, string curso)
    {
        registros.Add($"{aluno}|{curso}");
        return registros.Count;
    }
}

class SistemaMatricula
{
    private ICalculadoraMensalidade calculadora;
    private IRegistroMatriculas registro;

    public SistemaMatricula(ICalculadoraMensalidade calculadora, IRegistroMatriculas registro)
    {
        this.calculadora = calculadora;
        this.registro = registro;
    }

    public string Matricular(Aluno aluno, Curso curso)
    {
        curso.Ocupar();

        decimal mensalidade = calculadora.Calcular(aluno.Idade);
        int id = registro.Registrar(aluno.Nome, curso.Nome);

        return $"matricula {id}: {aluno.Nome} em {curso.Nome}, R$ {mensalidade:F2}";
    }
}

class Program
{
    static int passou = 0;
    static int total = 0;

    static void Verificar(string nome, bool condicao)
    {
        total++;

        if (condicao)
        {
            passou++;
            Console.WriteLine($"PASS {nome}");
        }
        else
        {
            Console.WriteLine($"FAIL {nome}");
        }
    }

    static bool Lanca<T>(Action acao) where T : Exception
    {
        try
        {
            acao();
            return false;
        }
        catch (T)
        {
            return true;
        }
        catch
        {
            return false;
        }
    }

    static void Relatorio()
    {
        Console.WriteLine($"{passou}/{total} testes passaram");
    }

    static void RodarTestes()
    {
        Verificar("aluno com nome vazio e recusado",
            Lanca<MatriculaInvalidaException>(() => new Aluno("  ", 20)));

        Verificar("aluno com idade negativa e recusado",
            Lanca<MatriculaInvalidaException>(() => new Aluno("Ana", -1)));

        Verificar("aluno com idade absurda e recusado",
            Lanca<MatriculaInvalidaException>(() => new Aluno("Ana", 200)));

        Verificar("curso sem vagas e recusado",
            Lanca<MatriculaInvalidaException>(() => new Curso("Curso", 0)));

        ICalculadoraMensalidade calculadora = new MensalidadePadrao();

        Verificar("menor de idade tem meia mensalidade", calculadora.Calcular(15) == 250m);
        Verificar("idoso tem 30 por cento de desconto", calculadora.Calcular(70) == 350m);
        Verificar("adulto paga integral", calculadora.Calcular(30) == 500m);

        SistemaMatricula sistema = new SistemaMatricula(calculadora, new RegistroMemoria());
        Curso lotado = new Curso("Lotado", 1);
        sistema.Matricular(new Aluno("Primeiro", 25), lotado);

        Verificar("curso lotado recusa matricula",
            Lanca<InvalidOperationException>(() => sistema.Matricular(new Aluno("Segundo", 25), lotado)));
    }

    static void Main()
    {
        RodarTestes();
        Relatorio();

        ICalculadoraMensalidade calculadora = new MensalidadePadrao();
        IRegistroMatriculas registro = new RegistroMemoria();
        SistemaMatricula sistema = new SistemaMatricula(calculadora, registro);

        Curso curso = new Curso("Programacao", 3);

        Console.WriteLine(sistema.Matricular(new Aluno("Ana", 30), curso));
        Console.WriteLine(sistema.Matricular(new Aluno("Bruno", 15), curso));
        Console.WriteLine(sistema.Matricular(new Aluno("Carla", 65), curso));

        Console.WriteLine($"vagas restantes: {curso.VagasRestantes}");
        Console.WriteLine($"total registrado: {registro.Total}");
    }
}
`,
      hints: [
        'Construa por etapas: primeiro `Aluno` e `Curso` com validação, depois a calculadora, depois o registro, e só então o sistema.',
        'O `Curso.Ocupar()` é quem lança `curso lotado` — a vaga é responsabilidade do curso, não do sistema.',
        'O legado aplicava os dois descontos em sequência; a versão nova usa `if`/`return`, então um idoso recebe apenas o desconto de idoso.',
        'O `SistemaMatricula` recebe as duas dependências e não conhece nenhum tipo concreto delas.',
      ],
      tests: [
        {
          name: 'Sistema completo',
          stdin: '',
          expectedStdout:
            'PASS aluno com nome vazio e recusado\nPASS aluno com idade negativa e recusado\n' +
            'PASS aluno com idade absurda e recusado\nPASS curso sem vagas e recusado\n' +
            'PASS menor de idade tem meia mensalidade\nPASS idoso tem 30 por cento de desconto\n' +
            'PASS adulto paga integral\nPASS curso lotado recusa matricula\n' +
            '8/8 testes passaram\n' +
            'matricula 1: Ana em Programacao, R$ 500.00\n' +
            'matricula 2: Bruno em Programacao, R$ 250.00\n' +
            'matricula 3: Carla em Programacao, R$ 350.00\n' +
            'vagas restantes: 0\ntotal registrado: 3',
        },
      ],
    },
  },
]
