import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's06c06l01',
    title: 'Extrair método',
    objective: 'Isolar um trecho coeso em um método com nome, reduzindo o que o original precisa explicar.',
    concept: [
      {
        kind: 'text',
        body:
          '**Extrair método** é a refatoração mais usada de todas. Um trecho que faz uma coisa identificável vira um método, e a chamada dele passa a documentar o que acontece ali.',
      },
      {
        kind: 'compare',
        good: `decimal total = SomarItens(itens);
decimal frete = CalcularFrete(peso);

return total + frete;`,
        bad: `decimal total = 0;
foreach (var i in itens)
    total += i.Preco * i.Qtd;

decimal frete = peso < 5
    ? 10 : peso * 2.5m;

return total + frete;`,
        goodLabel: 'Duas linhas que se explicam',
        badLabel: 'Detalhe misturado com estrutura',
      },
      {
        kind: 'table',
        headers: ['Passo', 'O que fazer'],
        rows: [
          ['1', 'identificar o trecho coeso'],
          ['2', 'ver quais variáveis ele lê — viram parâmetros'],
          ['3', 'ver qual variável ele produz — vira retorno'],
          ['4', 'nomear pelo **que faz**, não pelo como'],
          ['5', 'rodar e conferir que nada mudou'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O passo 3 é o filtro de qualidade: se o trecho produz **mais de um** valor que o resto do método usa, ele provavelmente não era coeso. Extrair mesmo assim gera um método com vários `out`, e isso é um sinal de corte no lugar errado.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um método extraído que precisa de seis parâmetros costuma indicar que o corte foi arbitrário. Muitos parâmetros significam que o trecho dependia de estado demais para ser independente.',
      },
      {
        kind: 'text',
        body:
          'A extração é segura porque é mecânica: mover o código, passar o que ele lê, devolver o que ele produz. A saída não muda — e é isso que permite fazê-la sem medo.',
      },
    ],
    quiz: [
      {
        id: 's06c06l01q1',
        type: 'single',
        prompt: 'As variáveis que o trecho extraído lê viram o quê?',
        options: [
          { id: 'a', text: 'Parâmetros do novo método.', correct: true },
          { id: 'b', text: 'Campos da classe.' },
          { id: 'c', text: 'Constantes.' },
          { id: 'd', text: 'Valores de retorno.' },
        ],
        explanation:
          'O trecho passa a receber de fora tudo que antes lia do escopo do método original.',
      },
      {
        id: 's06c06l01q2',
        type: 'single',
        prompt: 'O trecho produz três valores usados depois. O que isso indica?',
        options: [
          { id: 'a', text: 'Que ele provavelmente não era coeso, e o corte está no lugar errado.', correct: true },
          { id: 'b', text: 'Que ele deve usar três parâmetros `out`.' },
          { id: 'c', text: 'Que ele deve devolver uma tupla.' },
          { id: 'd', text: 'Que ele está pronto para ser extraído.' },
        ],
        explanation:
          'Um trecho coeso produz uma resposta. Três respostas normalmente são três extrações separadas.',
      },
      {
        id: 's06c06l01q3',
        type: 'single',
        prompt: 'Por que a extração de método é considerada segura?',
        options: [
          { id: 'a', text: 'Porque é mecânica: mover o código, passar o que lê, devolver o que produz.', correct: true },
          { id: 'b', text: 'Porque o compilador a faz automaticamente.' },
          { id: 'c', text: 'Porque não altera nomes.' },
          { id: 'd', text: 'Porque só funciona em métodos curtos.' },
        ],
        explanation:
          'Não há decisão de lógica envolvida, então o comportamento é preservado por construção.',
      },
    ],
    challenge: {
      brief:
        'Extraia três métodos de um cálculo de folha de pagamento, mantendo o comportamento exatamente igual.',
      requirements: [
        '`CalcularFolha(decimal salario, int horasExtras, int faltas)` devolve o valor a pagar',
        'A hora extra vale o salário dividido por `160`, com acréscimo de 50 por cento, multiplicada pelas horas',
        'Cada falta desconta o salário dividido por `30`',
        'O valor a pagar é salário mais extras menos faltas, nunca negativo',
        'O cálculo das horas extras vira o método `ValorHorasExtras`',
        'O desconto por faltas vira o método `DescontoFaltas`',
        'O piso zero vira o método `NuncaNegativo`',
        'A saída deve continuar idêntica à do código original',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Extraia ValorHorasExtras, DescontoFaltas e NuncaNegativo deste metodo.
    static decimal CalcularFolha(decimal salario, int horasExtras, int faltas)
    {
        decimal valorHora = salario / 160;
        decimal extras = valorHora * 1.5m * horasExtras;

        decimal valorDia = salario / 30;
        decimal descontos = valorDia * faltas;

        decimal aPagar = salario + extras - descontos;

        if (aPagar < 0)
        {
            aPagar = 0;
        }

        return aPagar;
    }

    static void Main()
    {
        decimal salario = decimal.Parse(Console.ReadLine());
        int extras = int.Parse(Console.ReadLine());
        int faltas = int.Parse(Console.ReadLine());

        Console.WriteLine($"folha: {CalcularFolha(salario, extras, faltas):F2}");
        Console.WriteLine($"sem extras: {CalcularFolha(salario, 0, faltas):F2}");
        Console.WriteLine($"sem faltas: {CalcularFolha(salario, extras, 0):F2}");
        Console.WriteLine($"limpo: {CalcularFolha(salario, 0, 0):F2}");
        Console.WriteLine($"muitas faltas: {CalcularFolha(salario, 0, 100):F2}");
    }
}
`,
      solution: `using System;

class Program
{
    const decimal HorasMensais = 160m;
    const decimal DiasMensais = 30m;
    const decimal AdicionalHoraExtra = 1.5m;

    static decimal ValorHorasExtras(decimal salario, int horasExtras)
    {
        decimal valorHora = salario / HorasMensais;
        return valorHora * AdicionalHoraExtra * horasExtras;
    }

    static decimal DescontoFaltas(decimal salario, int faltas)
    {
        decimal valorDia = salario / DiasMensais;
        return valorDia * faltas;
    }

    static decimal NuncaNegativo(decimal valor)
    {
        return valor < 0 ? 0 : valor;
    }

    static decimal CalcularFolha(decimal salario, int horasExtras, int faltas)
    {
        decimal extras = ValorHorasExtras(salario, horasExtras);
        decimal descontos = DescontoFaltas(salario, faltas);

        return NuncaNegativo(salario + extras - descontos);
    }

    static void Main()
    {
        decimal salario = decimal.Parse(Console.ReadLine());
        int extras = int.Parse(Console.ReadLine());
        int faltas = int.Parse(Console.ReadLine());

        Console.WriteLine($"folha: {CalcularFolha(salario, extras, faltas):F2}");
        Console.WriteLine($"sem extras: {CalcularFolha(salario, 0, faltas):F2}");
        Console.WriteLine($"sem faltas: {CalcularFolha(salario, extras, 0):F2}");
        Console.WriteLine($"limpo: {CalcularFolha(salario, 0, 0):F2}");
        Console.WriteLine($"muitas faltas: {CalcularFolha(salario, 0, 100):F2}");
    }
}
`,
      hints: [
        'Cada método extraído lê `salario` e mais um valor — esses são os dois parâmetros.',
        'Depois da extração, o `CalcularFolha` fica com três linhas que descrevem o cálculo inteiro.',
        'Aproveite para nomear os literais `160`, `30` e `1.5m` como constantes.',
      ],
      tests: [
        {
          name: 'Salario com extras e faltas',
          stdin: '3200\n10\n2\n',
          expectedStdout:
            'folha: 3286.67\nsem extras: 2986.67\nsem faltas: 3500.00\n' +
            'limpo: 3200.00\nmuitas faltas: 0.00',
        },
        {
          name: 'Salario menor',
          stdin: '1600\n5\n1\n',
          expectedStdout:
            'folha: 1621.67\nsem extras: 1546.67\nsem faltas: 1675.00\n' +
            'limpo: 1600.00\nmuitas faltas: 0.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c06l02',
    title: 'Extrair classe',
    objective: 'Separar em uma classe própria um conjunto de campos e métodos que formam um conceito.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando uma classe acumula responsabilidades, alguns campos passam a andar sempre juntos e a ser usados pelos mesmos métodos. Esse subconjunto é uma classe esperando para nascer.',
      },
      {
        kind: 'compare',
        good: `class Pessoa
{
    public string Nome;
    public Endereco Endereco;
}

class Endereco
{
    public string Rua;
    public string Cidade;
    public string Cep;

    public string Completo() => ...;
}`,
        bad: `class Pessoa
{
    public string Nome;
    public string Rua;
    public string Cidade;
    public string Cep;

    public string EnderecoCompleto()
        => ...;
}`,
        goodLabel: 'Conceito próprio',
        badLabel: 'Campos de dois assuntos misturados',
      },
      {
        kind: 'table',
        headers: ['Sinal', 'O que sugere'],
        rows: [
          ['campos com prefixo comum', 'eles formam um conceito'],
          ['métodos que usam só um subconjunto', 'esse subconjunto é uma classe'],
          ['a classe é difícil de nomear', 'ela faz mais de uma coisa'],
          ['os mesmos campos são copiados juntos', 'eles deveriam viajar como um objeto'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O prefixo repetido é o sinal mais fácil de enxergar. `enderecoRua`, `enderecoCidade` e `enderecoCep` estão praticamente pedindo uma classe `Endereco` — e o prefixo já dá o nome dela.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A classe extraída precisa fazer sentido sozinha. Se ela vira um saco de campos sem nenhum comportamento, o problema apenas mudou de lugar — vale mover para ela também os métodos que operam sobre esses campos.',
      },
    ],
    quiz: [
      {
        id: 's06c06l02q1',
        type: 'single',
        prompt: 'Qual é o sinal mais fácil de identificar uma classe escondida?',
        options: [
          { id: 'a', text: 'Vários campos com o mesmo prefixo.', correct: true },
          { id: 'b', text: 'A classe ter mais de 100 linhas.' },
          { id: 'c', text: 'Muitos métodos privados.' },
          { id: 'd', text: 'A classe ser usada em vários lugares.' },
        ],
        explanation:
          'O prefixo repetido é o nome do conceito que os campos formam, dito de forma redundante em cada um.',
      },
      {
        id: 's06c06l02q2',
        type: 'single',
        prompt: 'O que a classe extraída deve levar junto?',
        options: [
          { id: 'a', text: 'Os métodos que operam sobre aqueles campos.', correct: true },
          { id: 'b', text: 'Apenas os campos.' },
          { id: 'c', text: 'Uma cópia da classe original.' },
          { id: 'd', text: 'Os testes da classe original.' },
        ],
        explanation:
          'Sem comportamento, ela vira apenas um agrupamento de dados e a lógica continua espalhada.',
      },
      {
        id: 's06c06l02q3',
        type: 'single',
        prompt: 'Uma classe difícil de nomear indica o quê?',
        options: [
          { id: 'a', text: 'Que ela faz mais de uma coisa.', correct: true },
          { id: 'b', text: 'Que faltam comentários.' },
          { id: 'c', text: 'Que ela precisa de herança.' },
          { id: 'd', text: 'Que o domínio é complexo.' },
        ],
        explanation:
          'É o mesmo teste do "e" aplicado a classes: se o nome precisa de conjunção, existem dois conceitos ali.',
      },
    ],
    challenge: {
      brief:
        'Extraia duas classes de um cadastro inchado, movendo junto os métodos que operam sobre cada conjunto de campos.',
      requirements: [
        '`Endereco` recebe rua, cidade e CEP, e tem `Completo()` devolvendo `rua, cidade - cep`',
        '`Contato` recebe email e telefone, e tem `Valido()`, verdadeiro quando o email contém `@` e o telefone tem `11` caracteres',
        '`Contato.Resumo()` devolve `email / telefone`',
        '`Cliente` recebe nome, um `Endereco` e um `Contato`',
        '`Cliente.Ficha()` devolve `nome | endereco completo | contato resumo`',
        '`Cliente.PodeReceberEntrega()` é verdadeiro quando o contato é válido e a cidade não está em branco',
        'A saída deve continuar idêntica à do código original',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Esta classe faz coisas demais. Extraia Endereco e Contato,
// movendo junto os metodos que operam sobre cada grupo de campos.
//
// class Cliente
// {
//     nome
//     enderecoRua, enderecoCidade, enderecoCep
//     contatoEmail, contatoTelefone
//     EnderecoCompleto(), ContatoValido(), ContatoResumo(), Ficha(), PodeReceberEntrega()
// }

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        string rua = Console.ReadLine();
        string cidade = Console.ReadLine();
        string cep = Console.ReadLine();
        string email = Console.ReadLine();
        string telefone = Console.ReadLine();

        Cliente cliente = new Cliente(nome, new Endereco(rua, cidade, cep), new Contato(email, telefone));

        Console.WriteLine(cliente.Ficha());
        Console.WriteLine($"pode receber: {cliente.PodeReceberEntrega()}");

        Cliente semCidade = new Cliente(nome, new Endereco(rua, "  ", cep), new Contato(email, telefone));
        Console.WriteLine($"sem cidade: {semCidade.PodeReceberEntrega()}");

        Cliente contatoRuim = new Cliente(nome, new Endereco(rua, cidade, cep), new Contato("semarroba", "123"));
        Console.WriteLine($"contato ruim: {contatoRuim.PodeReceberEntrega()}");
        Console.WriteLine($"contato valido: {contatoRuim.Contato.Valido()}");
        Console.WriteLine($"endereco isolado: {new Endereco("Rua X", "Recife", "50000").Completo()}");
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

    public string Completo()
    {
        return $"{Rua}, {Cidade} - {Cep}";
    }
}

class Contato
{
    private const int TamanhoTelefone = 11;

    public string Email { get; }
    public string Telefone { get; }

    public Contato(string email, string telefone)
    {
        Email = email;
        Telefone = telefone;
    }

    public bool Valido()
    {
        if (Email == null || !Email.Contains('@'))
        {
            return false;
        }

        return Telefone != null && Telefone.Length == TamanhoTelefone;
    }

    public string Resumo()
    {
        return $"{Email} / {Telefone}";
    }
}

class Cliente
{
    public string Nome { get; }
    public Endereco Endereco { get; }
    public Contato Contato { get; }

    public Cliente(string nome, Endereco endereco, Contato contato)
    {
        Nome = nome;
        Endereco = endereco;
        Contato = contato;
    }

    public string Ficha()
    {
        return $"{Nome} | {Endereco.Completo()} | {Contato.Resumo()}";
    }

    public bool PodeReceberEntrega()
    {
        return Contato.Valido() && !string.IsNullOrWhiteSpace(Endereco.Cidade);
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
        string email = Console.ReadLine();
        string telefone = Console.ReadLine();

        Cliente cliente = new Cliente(nome, new Endereco(rua, cidade, cep), new Contato(email, telefone));

        Console.WriteLine(cliente.Ficha());
        Console.WriteLine($"pode receber: {cliente.PodeReceberEntrega()}");

        Cliente semCidade = new Cliente(nome, new Endereco(rua, "  ", cep), new Contato(email, telefone));
        Console.WriteLine($"sem cidade: {semCidade.PodeReceberEntrega()}");

        Cliente contatoRuim = new Cliente(nome, new Endereco(rua, cidade, cep), new Contato("semarroba", "123"));
        Console.WriteLine($"contato ruim: {contatoRuim.PodeReceberEntrega()}");
        Console.WriteLine($"contato valido: {contatoRuim.Contato.Valido()}");
        Console.WriteLine($"endereco isolado: {new Endereco("Rua X", "Recife", "50000").Completo()}");
    }
}
`,
      hints: [
        'O prefixo `endereco` nos campos originais já dá o nome da primeira classe extraída.',
        '`EnderecoCompleto()` vira `Endereco.Completo()` — o prefixo some porque a classe já diz o assunto.',
        'O `Cliente` fica com três campos e dois métodos que apenas delegam.',
      ],
      tests: [
        {
          name: 'Cliente completo',
          stdin: 'Ana\nRua A 100\nRecife\n50000-000\nana@teste.com\n81999998888\n',
          expectedStdout:
            'Ana | Rua A 100, Recife - 50000-000 | ana@teste.com / 81999998888\n' +
            'pode receber: True\nsem cidade: False\ncontato ruim: False\n' +
            'contato valido: False\nendereco isolado: Rua X, Recife - 50000',
        },
        {
          name: 'Outro cliente',
          stdin: 'Bruno\nAv B 20\nOlinda\n53000-111\nbruno@x.org\n81888887777\n',
          expectedStdout:
            'Bruno | Av B 20, Olinda - 53000-111 | bruno@x.org / 81888887777\n' +
            'pode receber: True\nsem cidade: False\ncontato ruim: False\n' +
            'contato valido: False\nendereco isolado: Rua X, Recife - 50000',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c06l03',
    title: 'Renomear com intenção',
    objective: 'Tratar a renomeação como uma refatoração de primeira classe, e não como detalhe cosmético.',
    concept: [
      {
        kind: 'text',
        body:
          'Renomear é a refatoração de melhor relação entre custo e benefício. É quase sempre segura, leva segundos, e um nome certo economiza minutos de leitura para cada pessoa que passar por ali.',
      },
      {
        kind: 'table',
        headers: ['Nome atual', 'Problema', 'Melhor'],
        rows: [
          ['`ProcessarDados`', 'vago demais', '`ValidarPedidos`'],
          ['`temp`', 'não diz nada', '`totalParcial`'],
          ['`GetUsuarioAtivo`', 'devolve uma lista', '`UsuariosAtivos`'],
          ['`flag`', 'não diz o que sinaliza', '`estaCancelado`'],
          ['`Calcular`', 'calcular o quê', '`CalcularImposto`'],
        ],
      },
      {
        kind: 'text',
        body:
          'Um nome errado é um bug de comunicação, e ele se propaga: quem lê `GetUsuarioAtivo` no singular escreve código supondo um resultado só, e descobre a lista tarde demais.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Se você **não consegue** achar um bom nome, isso é informação. Significa que aquele elemento não tem um propósito claro — e o problema real é de desenho, não de vocabulário.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Renomear um membro público é diferente de renomear uma variável local. O primeiro afeta todo mundo que usa a sua API; o segundo não sai do método. O custo da renomeação cresce com o alcance.',
      },
      {
        kind: 'text',
        body:
          'Quando um conceito do domínio muda de nome no mundo real, o código deve acompanhar. Manter o nome antigo cria uma tradução permanente que todo mundo precisa fazer de cabeça.',
      },
    ],
    quiz: [
      {
        id: 's06c06l03q1',
        type: 'single',
        prompt: 'Por que renomear tem a melhor relação custo-benefício?',
        options: [
          { id: 'a', text: 'É segura, rápida, e economiza tempo de leitura para todo mundo depois.', correct: true },
          { id: 'b', text: 'Porque melhora o desempenho.' },
          { id: 'c', text: 'Porque reduz o número de linhas.' },
          { id: 'd', text: 'Porque elimina bugs automaticamente.' },
        ],
        explanation:
          'O custo é de segundos e o benefício se repete a cada leitura futura do código.',
      },
      {
        id: 's06c06l03q2',
        type: 'single',
        prompt: 'O que significa não conseguir achar um bom nome?',
        options: [
          { id: 'a', text: 'Que o elemento não tem propósito claro — é um problema de desenho.', correct: true },
          { id: 'b', text: 'Que falta vocabulário técnico.' },
          { id: 'c', text: 'Que o nome atual está bom.' },
          { id: 'd', text: 'Que o código é complexo demais para nomear.' },
        ],
        explanation:
          'A dificuldade de nomear é um diagnóstico útil: ela aponta responsabilidades mal definidas.',
      },
      {
        id: 's06c06l03q3',
        type: 'single',
        prompt: 'Por que o custo de renomear cresce com o alcance?',
        options: [
          { id: 'a', text: 'Um membro público afeta todos que usam a API; uma variável local não sai do método.', correct: true },
          { id: 'b', text: 'Porque nomes longos são mais lentos.' },
          { id: 'c', text: 'Porque o compilador demora mais.' },
          { id: 'd', text: 'O custo não varia.' },
        ],
        explanation:
          'Dentro de um método a renomeação é gratuita. Em uma API publicada, ela quebra código de terceiros.',
      },
    ],
    challenge: {
      brief:
        'Renomeie os elementos de um módulo para que cada nome diga a verdade — inclusive um que hoje promete o contrário do que entrega.',
      requirements: [
        '`EstoqueService` vira `ControleEstoque`',
        '`ProcessarDados` vira `RegistrarEntrada`, porque é o que ele faz',
        '`GetItemDisponivel` vira `ItensDisponiveis`, porque devolve uma lista',
        '`flag` vira `estaBloqueado`',
        '`temp` vira `totalDisponivel`',
        '`Calc` vira `CalcularValorTotal`',
        'A saída deve continuar idêntica à do código original',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Todos os nomes deste modulo estao errados de algum jeito.
// Renomeie conforme os requisitos. O comportamento nao muda.

class EstoqueService
{
    private Dictionary<string, int> dados = new Dictionary<string, int>();
    private Dictionary<string, decimal> precos = new Dictionary<string, decimal>();
    private bool flag = false;

    public bool EstaBloqueado => flag;

    public void ProcessarDados(string codigo, int quantidade, decimal preco)
    {
        if (flag) { return; }

        if (dados.ContainsKey(codigo))
        {
            dados[codigo] += quantidade;
        }
        else
        {
            dados[codigo] = quantidade;
        }

        precos[codigo] = preco;
    }

    public List<string> GetItemDisponivel()
    {
        List<string> resultado = new List<string>();

        foreach (KeyValuePair<string, int> par in dados)
        {
            if (par.Value > 0)
            {
                resultado.Add(par.Key);
            }
        }

        return resultado;
    }

    public decimal Calc()
    {
        decimal temp = 0;

        foreach (KeyValuePair<string, int> par in dados)
        {
            temp += par.Value * precos[par.Key];
        }

        return temp;
    }

    public void Bloquear() { flag = true; }
}

class Program
{
    static void Main()
    {
        string codigo = Console.ReadLine();
        int quantidade = int.Parse(Console.ReadLine());
        decimal preco = decimal.Parse(Console.ReadLine());

        ControleEstoque controle = new ControleEstoque();

        controle.RegistrarEntrada(codigo, quantidade, preco);
        controle.RegistrarEntrada("OUTRO", 5, 10);
        controle.RegistrarEntrada(codigo, quantidade, preco);

        Console.WriteLine($"disponiveis: {string.Join(", ", controle.ItensDisponiveis())}");
        Console.WriteLine($"total: {controle.CalcularValorTotal():F2}");
        Console.WriteLine($"bloqueado: {controle.EstaBloqueado}");

        controle.Bloquear();
        controle.RegistrarEntrada("IGNORADO", 100, 1);

        Console.WriteLine($"bloqueado: {controle.EstaBloqueado}");
        Console.WriteLine($"disponiveis apos bloqueio: {string.Join(", ", controle.ItensDisponiveis())}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class ControleEstoque
{
    private Dictionary<string, int> dados = new Dictionary<string, int>();
    private Dictionary<string, decimal> precos = new Dictionary<string, decimal>();
    private bool estaBloqueado = false;

    public bool EstaBloqueado => estaBloqueado;

    public void RegistrarEntrada(string codigo, int quantidade, decimal preco)
    {
        if (estaBloqueado)
        {
            return;
        }

        if (dados.ContainsKey(codigo))
        {
            dados[codigo] += quantidade;
        }
        else
        {
            dados[codigo] = quantidade;
        }

        precos[codigo] = preco;
    }

    public List<string> ItensDisponiveis()
    {
        List<string> resultado = new List<string>();

        foreach (KeyValuePair<string, int> par in dados)
        {
            if (par.Value > 0)
            {
                resultado.Add(par.Key);
            }
        }

        return resultado;
    }

    public decimal CalcularValorTotal()
    {
        decimal totalDisponivel = 0;

        foreach (KeyValuePair<string, int> par in dados)
        {
            totalDisponivel += par.Value * precos[par.Key];
        }

        return totalDisponivel;
    }

    public void Bloquear()
    {
        estaBloqueado = true;
    }
}

class Program
{
    static void Main()
    {
        string codigo = Console.ReadLine();
        int quantidade = int.Parse(Console.ReadLine());
        decimal preco = decimal.Parse(Console.ReadLine());

        ControleEstoque controle = new ControleEstoque();

        controle.RegistrarEntrada(codigo, quantidade, preco);
        controle.RegistrarEntrada("OUTRO", 5, 10);
        controle.RegistrarEntrada(codigo, quantidade, preco);

        Console.WriteLine($"disponiveis: {string.Join(", ", controle.ItensDisponiveis())}");
        Console.WriteLine($"total: {controle.CalcularValorTotal():F2}");
        Console.WriteLine($"bloqueado: {controle.EstaBloqueado}");

        controle.Bloquear();
        controle.RegistrarEntrada("IGNORADO", 100, 1);

        Console.WriteLine($"bloqueado: {controle.EstaBloqueado}");
        Console.WriteLine($"disponiveis apos bloqueio: {string.Join(", ", controle.ItensDisponiveis())}");
    }
}
`,
      hints: [
        'O `Main` já usa todos os nomes novos — ele é a lista de renomeações a fazer.',
        'O campo privado e a propriedade podem ter o mesmo nome com capitalização diferente: `estaBloqueado` e `EstaBloqueado`.',
        'Repare que `GetItemDisponivel` no singular era uma mentira: o método sempre devolveu uma lista.',
      ],
      tests: [
        {
          name: 'Estoque com dois itens',
          stdin: 'ABC\n3\n25.00\n',
          expectedStdout:
            'disponiveis: ABC, OUTRO\ntotal: 200.00\nbloqueado: False\n' +
            'bloqueado: True\ndisponiveis apos bloqueio: ABC, OUTRO',
        },
        {
          name: 'Quantidade maior',
          stdin: 'XYZ\n10\n2.50\n',
          expectedStdout:
            'disponiveis: XYZ, OUTRO\ntotal: 100.00\nbloqueado: False\n' +
            'bloqueado: True\ndisponiveis apos bloqueio: XYZ, OUTRO',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c06l04',
    title: 'Substituir condicional por polimorfismo',
    objective: 'Trocar uma cadeia de `if` por tipo por uma hierarquia em que cada tipo sabe o próprio comportamento.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma cadeia de condicionais que decide pelo **tipo** de algo é o sinal clássico de polimorfismo faltando. Cada ramo do `if` é um método de uma classe que não foi criada.',
      },
      {
        kind: 'compare',
        good: `abstract class Funcionario
{
    public abstract decimal Bonus();
}

class Gerente : Funcionario
{
    public override decimal Bonus()
        => Salario * 0.20m;
}`,
        bad: `decimal Bonus(Funcionario f)
{
    if (f.Tipo == "gerente")
        return f.Salario * 0.20m;
    if (f.Tipo == "vendedor")
        return f.Salario * 0.15m;
    return f.Salario * 0.10m;
}`,
        goodLabel: 'Cada tipo sabe o seu',
        badLabel: 'Um `if` que cresce a cada tipo novo',
      },
      {
        kind: 'text',
        body:
          'O ganho aparece na **manutenção**. Com a cadeia de `if`, um tipo novo obriga a encontrar e alterar todos os condicionais espalhados pelo sistema. Com polimorfismo, ele é uma classe nova e nada existente muda.',
      },
      {
        kind: 'table',
        headers: ['Passo da refatoração', 'O que fazer'],
        rows: [
          ['1', 'criar a classe base com o método abstrato'],
          ['2', 'criar uma derivada por ramo do `if`'],
          ['3', 'mover o corpo de cada ramo para a derivada'],
          ['4', 'trocar a criação para o tipo certo'],
          ['5', 'apagar o condicional'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Nem todo `if` deve virar classe. A troca vale quando o mesmo teste de tipo aparece em **vários lugares**. Um único condicional em um método só costuma ser mais claro do que uma hierarquia inteira.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que o condicional não desaparece de verdade: ele se muda para o ponto de **criação** do objeto. A diferença é que agora existe um lugar só onde o tipo é decidido, em vez de um por comportamento.',
      },
    ],
    quiz: [
      {
        id: 's06c06l04q1',
        type: 'single',
        prompt: 'O que uma cadeia de `if` que testa o tipo indica?',
        options: [
          { id: 'a', text: 'Polimorfismo faltando: cada ramo é um método de uma classe.', correct: true },
          { id: 'b', text: 'Falta de validação.' },
          { id: 'c', text: 'Necessidade de mais testes.' },
          { id: 'd', text: 'Um problema de desempenho.' },
        ],
        explanation:
          'A pergunta "que tipo é este?" seguida de comportamento diferente é a definição do que o despacho virtual resolve.',
      },
      {
        id: 's06c06l04q2',
        type: 'single',
        prompt: 'Onde o condicional vai parar depois da refatoração?',
        options: [
          { id: 'a', text: 'No ponto de criação do objeto.', correct: true },
          { id: 'b', text: 'Ele desaparece completamente.' },
          { id: 'c', text: 'Na classe base.' },
          { id: 'd', text: 'Em cada classe derivada.' },
        ],
        explanation:
          'Alguém ainda precisa decidir qual tipo criar. A diferença é que isso acontece em um lugar só.',
      },
      {
        id: 's06c06l04q3',
        type: 'single',
        prompt: 'Quando **não** trocar o condicional por polimorfismo?',
        options: [
          { id: 'a', text: 'Quando o teste de tipo aparece em um único lugar.', correct: true },
          { id: 'b', text: 'Quando há mais de três tipos.' },
          { id: 'c', text: 'Quando o método é curto.' },
          { id: 'd', text: 'Quando não há herança no projeto.' },
        ],
        explanation:
          'Uma hierarquia inteira para resolver um `if` isolado custa mais atenção do que economiza.',
      },
    ],
    challenge: {
      brief:
        'Substitua três cadeias de condicionais por uma hierarquia, em que cada tipo de assinatura conhece as próprias regras.',
      requirements: [
        '`Assinatura` é abstrata, recebe o nome do cliente e tem `Mensalidade()`, `LimiteDispositivos()` e `Rotulo()` abstratos ou virtuais',
        '`Basica` custa `20`, permite `1` dispositivo, rótulo `basica`',
        '`Padrao` custa `35`, permite `2` dispositivos, rótulo `padrao`',
        '`Premium` custa `60`, permite `4` dispositivos, rótulo `premium`',
        '`Assinatura.Descrever()` devolve `cliente (rotulo): R$ X.XX, N dispositivos` e não é sobrescrito por nenhuma derivada',
        '`Criar(string tipo, string cliente)` é o único lugar com condicional por tipo, devolvendo a instância certa',
        'Um tipo desconhecido faz `Criar` devolver `null`',
        'A saída deve continuar idêntica à do código original',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Tres cadeias de condicionais sobre o mesmo tipo.
// Substitua por uma hierarquia: Assinatura, Basica, Padrao, Premium.
//
// static decimal Mensalidade(string tipo) { if basica -> 20; if padrao -> 35; ... }
// static int LimiteDispositivos(string tipo) { if basica -> 1; if padrao -> 2; ... }
// static string Rotulo(string tipo) { ... }

class Program
{
    static void Main()
    {
        string cliente = Console.ReadLine();

        List<Assinatura> assinaturas = new List<Assinatura>
        {
            Criar("basica", cliente),
            Criar("padrao", cliente),
            Criar("premium", cliente)
        };

        foreach (Assinatura a in assinaturas)
        {
            Console.WriteLine(a.Descrever());
        }

        decimal total = 0;

        foreach (Assinatura a in assinaturas)
        {
            total += a.Mensalidade();
        }

        Console.WriteLine($"total: R$ {total:F2}");
        Console.WriteLine($"desconhecido: {Criar("ouro", cliente) == null}");

        Assinatura premium = Criar("premium", cliente);
        Console.WriteLine($"premium cabe 4: {premium.LimiteDispositivos() == 4}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

abstract class Assinatura
{
    public string Cliente { get; }

    protected Assinatura(string cliente)
    {
        Cliente = cliente;
    }

    public abstract decimal Mensalidade();

    public abstract int LimiteDispositivos();

    public abstract string Rotulo();

    public string Descrever()
    {
        return $"{Cliente} ({Rotulo()}): R$ {Mensalidade():F2}, {LimiteDispositivos()} dispositivos";
    }
}

class Basica : Assinatura
{
    public Basica(string cliente)
        : base(cliente)
    {
    }

    public override decimal Mensalidade() => 20m;

    public override int LimiteDispositivos() => 1;

    public override string Rotulo() => "basica";
}

class Padrao : Assinatura
{
    public Padrao(string cliente)
        : base(cliente)
    {
    }

    public override decimal Mensalidade() => 35m;

    public override int LimiteDispositivos() => 2;

    public override string Rotulo() => "padrao";
}

class Premium : Assinatura
{
    public Premium(string cliente)
        : base(cliente)
    {
    }

    public override decimal Mensalidade() => 60m;

    public override int LimiteDispositivos() => 4;

    public override string Rotulo() => "premium";
}

class Program
{
    static Assinatura Criar(string tipo, string cliente)
    {
        if (tipo == "basica") return new Basica(cliente);
        if (tipo == "padrao") return new Padrao(cliente);
        if (tipo == "premium") return new Premium(cliente);

        return null;
    }

    static void Main()
    {
        string cliente = Console.ReadLine();

        List<Assinatura> assinaturas = new List<Assinatura>
        {
            Criar("basica", cliente),
            Criar("padrao", cliente),
            Criar("premium", cliente)
        };

        foreach (Assinatura a in assinaturas)
        {
            Console.WriteLine(a.Descrever());
        }

        decimal total = 0;

        foreach (Assinatura a in assinaturas)
        {
            total += a.Mensalidade();
        }

        Console.WriteLine($"total: R$ {total:F2}");
        Console.WriteLine($"desconhecido: {Criar("ouro", cliente) == null}");

        Assinatura premium = Criar("premium", cliente);
        Console.WriteLine($"premium cabe 4: {premium.LimiteDispositivos() == 4}");
    }
}
`,
      hints: [
        'Cada uma das três cadeias de `if` vira um método abstrato na base, implementado nas três derivadas.',
        'O `Descrever` fica na base e usa os três métodos — é o template method da Seção 5.',
        'O único condicional por tipo que sobrevive é o do `Criar`.',
      ],
      tests: [
        {
          name: 'Cliente Ana',
          stdin: 'Ana\n',
          expectedStdout:
            'Ana (basica): R$ 20.00, 1 dispositivos\nAna (padrao): R$ 35.00, 2 dispositivos\n' +
            'Ana (premium): R$ 60.00, 4 dispositivos\ntotal: R$ 115.00\n' +
            'desconhecido: True\npremium cabe 4: True',
        },
        {
          name: 'Cliente Bruno',
          stdin: 'Bruno\n',
          expectedStdout:
            'Bruno (basica): R$ 20.00, 1 dispositivos\nBruno (padrao): R$ 35.00, 2 dispositivos\n' +
            'Bruno (premium): R$ 60.00, 4 dispositivos\ntotal: R$ 115.00\n' +
            'desconhecido: True\npremium cabe 4: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c06l05',
    title: 'Introduzir objeto de parâmetro',
    objective: 'Agrupar parâmetros que andam sempre juntos em um objeto com nome.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando os mesmos parâmetros aparecem juntos em várias assinaturas, eles formam um conceito. Agrupá-los em um objeto encurta as chamadas e dá nome ao que eles representam.',
      },
      {
        kind: 'compare',
        good: `Reservar(new Periodo(10, 15), quarto);
Precificar(new Periodo(10, 15));
Validar(new Periodo(10, 15));`,
        bad: `Reservar(10, 15, quarto);
Precificar(10, 15);
Validar(10, 15);
// qual e a entrada e qual e a saida?`,
        goodLabel: 'Um conceito com nome',
        badLabel: 'Dois números soltos',
      },
      {
        kind: 'text',
        body:
          'O ganho vai além do tamanho da chamada: o objeto pode **validar a si mesmo** e oferecer comportamento. Um `Periodo` garante no construtor que a saída é depois da entrada — algo impossível de garantir com dois `int` soltos.',
      },
      {
        kind: 'table',
        headers: ['Sinal', 'Sugere'],
        rows: [
          ['os mesmos parâmetros em várias assinaturas', 'objeto de parâmetro'],
          ['mais de três ou quatro parâmetros', 'algum subconjunto forma um conceito'],
          ['parâmetros do mesmo tipo em sequência', 'risco de trocar a ordem'],
          ['validação repetida em cada método', 'a validação pertence ao objeto'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A terceira linha é um risco concreto: `Reservar(10, 15, ...)` e `Reservar(15, 10, ...)` compilam igual. Um objeto de parâmetro com construtor que valida transforma esse bug silencioso em erro imediato.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Não agrupe parâmetros que só coincidem nesta chamada. O objeto precisa representar um conceito real do domínio, senão você criou um saco de valores com nome arbitrário.',
      },
    ],
    quiz: [
      {
        id: 's06c06l05q1',
        type: 'single',
        prompt: 'Além de encurtar chamadas, o que um objeto de parâmetro permite?',
        options: [
          { id: 'a', text: 'Validar a si mesmo e oferecer comportamento próprio.', correct: true },
          { id: 'b', text: 'Reduzir o uso de memória.' },
          { id: 'c', text: 'Acelerar as chamadas.' },
          { id: 'd', text: 'Dispensar o uso de tipos.' },
        ],
        explanation:
          'Um `Periodo` garante no construtor que a saída vem depois da entrada. Dois `int` soltos não garantem nada.',
      },
      {
        id: 's06c06l05q2',
        type: 'single',
        prompt: 'Qual risco vem de vários parâmetros do mesmo tipo em sequência?',
        options: [
          { id: 'a', text: 'Trocar a ordem sem que o compilador perceba.', correct: true },
          { id: 'b', text: 'Estouro de pilha.' },
          { id: 'c', text: 'Perda de precisão.' },
          { id: 'd', text: 'Chamadas mais lentas.' },
        ],
        explanation:
          '`Reservar(15, 10)` compila igual a `Reservar(10, 15)` e produz um bug silencioso.',
      },
      {
        id: 's06c06l05q3',
        type: 'single',
        prompt: 'Quando **não** criar um objeto de parâmetro?',
        options: [
          { id: 'a', text: 'Quando os parâmetros só coincidem nesta chamada e não formam um conceito real.', correct: true },
          { id: 'b', text: 'Quando há menos de cinco parâmetros.' },
          { id: 'c', text: 'Quando os tipos são diferentes.' },
          { id: 'd', text: 'Quando o método é público.' },
        ],
        explanation:
          'Sem um conceito por trás, o objeto vira um agrupamento arbitrário que só acrescenta uma indireção.',
      },
    ],
    challenge: {
      brief:
        'Agrupe parâmetros repetidos em objetos que se validam, eliminando o risco de inverter a ordem.',
      requirements: [
        '`Periodo` é um `readonly record struct` com `Entrada` e `Saida` (`int`)',
        'O construtor lança `ArgumentException` com a mensagem `saida antes da entrada` quando `Saida` é menor ou igual a `Entrada`',
        '`Periodo.Noites` devolve a diferença',
        '`Dimensoes` é um `readonly record struct` com `Largura` e `Altura` (`int`) e a propriedade `Area`',
        '`CalcularAluguel(Periodo periodo, Dimensoes dimensoes, decimal precoPorMetro)` devolve `Noites * Area * precoPorMetro`',
        '`Validar(Periodo periodo)` devolve se o período tem no máximo `30` noites',
        '`Descrever(Periodo periodo, Dimensoes dimensoes)` devolve `N noites, M m2`',
        'Nenhum método recebe entrada e saída como dois inteiros separados',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Estes metodos recebem sempre os mesmos quatro numeros soltos:
//   CalcularAluguel(int entrada, int saida, int largura, int altura, decimal preco)
//   Validar(int entrada, int saida)
//   Descrever(int entrada, int saida, int largura, int altura)
//
// Agrupe em Periodo e Dimensoes, com validacao no construtor de Periodo.

class Program
{
    static void Main()
    {
        int entrada = int.Parse(Console.ReadLine());
        int saida = int.Parse(Console.ReadLine());
        int largura = int.Parse(Console.ReadLine());
        int altura = int.Parse(Console.ReadLine());

        Periodo periodo = new Periodo(entrada, saida);
        Dimensoes dimensoes = new Dimensoes(largura, altura);

        Console.WriteLine(Descrever(periodo, dimensoes));
        Console.WriteLine($"aluguel: {CalcularAluguel(periodo, dimensoes, 2.5m):F2}");
        Console.WriteLine($"valido: {Validar(periodo)}");
        Console.WriteLine($"longo: {Validar(new Periodo(1, 60))}");

        try
        {
            Periodo invertido = new Periodo(saida, entrada);
            Console.WriteLine($"invertido aceito: {invertido.Noites}");
        }
        catch (ArgumentException e)
        {
            Console.WriteLine($"invertido recusado: {e.Message}");
        }

        Console.WriteLine($"periodos iguais: {periodo == new Periodo(entrada, saida)}");
    }
}
`,
      solution: `using System;

readonly record struct Periodo
{
    public int Entrada { get; }
    public int Saida { get; }

    public Periodo(int entrada, int saida)
    {
        if (saida <= entrada)
        {
            throw new ArgumentException("saida antes da entrada");
        }

        Entrada = entrada;
        Saida = saida;
    }

    public int Noites => Saida - Entrada;
}

readonly record struct Dimensoes(int Largura, int Altura)
{
    public int Area => Largura * Altura;
}

class Program
{
    const int MaximoNoites = 30;

    static decimal CalcularAluguel(Periodo periodo, Dimensoes dimensoes, decimal precoPorMetro)
    {
        return periodo.Noites * dimensoes.Area * precoPorMetro;
    }

    static bool Validar(Periodo periodo)
    {
        return periodo.Noites <= MaximoNoites;
    }

    static string Descrever(Periodo periodo, Dimensoes dimensoes)
    {
        return $"{periodo.Noites} noites, {dimensoes.Area} m2";
    }

    static void Main()
    {
        int entrada = int.Parse(Console.ReadLine());
        int saida = int.Parse(Console.ReadLine());
        int largura = int.Parse(Console.ReadLine());
        int altura = int.Parse(Console.ReadLine());

        Periodo periodo = new Periodo(entrada, saida);
        Dimensoes dimensoes = new Dimensoes(largura, altura);

        Console.WriteLine(Descrever(periodo, dimensoes));
        Console.WriteLine($"aluguel: {CalcularAluguel(periodo, dimensoes, 2.5m):F2}");
        Console.WriteLine($"valido: {Validar(periodo)}");
        Console.WriteLine($"longo: {Validar(new Periodo(1, 60))}");

        try
        {
            Periodo invertido = new Periodo(saida, entrada);
            Console.WriteLine($"invertido aceito: {invertido.Noites}");
        }
        catch (ArgumentException e)
        {
            Console.WriteLine($"invertido recusado: {e.Message}");
        }

        Console.WriteLine($"periodos iguais: {periodo == new Periodo(entrada, saida)}");
    }
}
`,
      hints: [
        'O `Periodo` precisa de construtor explícito para validar, então declare as propriedades no corpo em vez de usar a forma posicional.',
        'O `Dimensoes` não valida nada, então a forma posicional resolve.',
        'Repare no ganho: a inversão de ordem, que antes passaria despercebida, agora vira exceção imediata.',
      ],
      tests: [
        {
          name: 'Periodo de cinco noites',
          stdin: '10\n15\n4\n3\n',
          expectedStdout:
            '5 noites, 12 m2\naluguel: 150.00\nvalido: True\nlongo: False\n' +
            'invertido recusado: saida antes da entrada\nperiodos iguais: True',
        },
        {
          name: 'Periodo de uma noite',
          stdin: '1\n2\n2\n2\n',
          expectedStdout:
            '1 noites, 4 m2\naluguel: 10.00\nvalido: True\nlongo: False\n' +
            'invertido recusado: saida antes da entrada\nperiodos iguais: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c06l06',
    title: 'Removendo duplicação',
    objective: 'Encontrar as formas disfarçadas de duplicação e eliminá-las sem forçar abstrações.',
    concept: [
      {
        kind: 'text',
        body:
          'A duplicação óbvia — dois blocos idênticos — é fácil de ver. As formas disfarçadas são as que sobrevivem por anos no código.',
      },
      {
        kind: 'table',
        headers: ['Forma', 'Como aparece'],
        rows: [
          ['literal', 'blocos idênticos'],
          ['estrutural', 'mesmo formato, valores diferentes'],
          ['de conhecimento', 'a mesma regra escrita de dois jeitos'],
          ['de intenção', 'dois métodos que resolvem o mesmo problema'],
        ],
      },
      {
        kind: 'text',
        body:
          'A **duplicação de conhecimento** é a mais perigosa. Se a regra "cliente VIP tem 10 por cento" existe em três lugares com implementações diferentes, mudar a política obriga a encontrar os três — e esquecer um é silencioso.',
      },
      {
        kind: 'compare',
        good: `static bool EhVip(Cliente c)
    => c.Compras >= 10;

// usado nos tres lugares`,
        bad: `if (c.Compras >= 10) { }        // aqui
if (c.Compras > 9) { }          // e aqui
if (c.Compras >= LIMITE) { }    // e aqui`,
        goodLabel: 'Uma definição',
        badLabel: 'A mesma regra, três escritas',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que as três formas do exemplo ruim são **equivalentes hoje**. Elas produzem o mesmo resultado, o que faz a duplicação passar despercebida — até o dia em que uma delas é atualizada e as outras não.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Duplicação estrutural nem sempre deve ser eliminada. Dois laços com a mesma forma mas propósitos diferentes só ficam piores se forem unificados em um método genérico com parâmetros de comportamento.',
      },
    ],
    quiz: [
      {
        id: 's06c06l06q1',
        type: 'single',
        prompt: 'Qual forma de duplicação é a mais perigosa?',
        options: [
          { id: 'a', text: 'De conhecimento: a mesma regra escrita de jeitos diferentes.', correct: true },
          { id: 'b', text: 'Literal: blocos idênticos.' },
          { id: 'c', text: 'Estrutural: mesmo formato.' },
          { id: 'd', text: 'Todas são igualmente perigosas.' },
        ],
        explanation:
          'Ela é invisível para busca textual, e as versões só divergem quando alguém atualiza uma delas.',
      },
      {
        id: 's06c06l06q2',
        type: 'single',
        prompt: 'Por que a duplicação de conhecimento passa despercebida?',
        options: [
          { id: 'a', text: 'Porque as versões são equivalentes hoje e produzem o mesmo resultado.', correct: true },
          { id: 'b', text: 'Porque está em arquivos diferentes.' },
          { id: 'c', text: 'Porque o compilador a esconde.' },
          { id: 'd', text: 'Porque envolve poucos casos.' },
        ],
        explanation:
          'Nada quebra enquanto a regra não muda. O problema aparece só na primeira alteração.',
      },
      {
        id: 's06c06l06q3',
        type: 'single',
        prompt: 'Quando **não** eliminar duplicação estrutural?',
        options: [
          { id: 'a', text: 'Quando os trechos têm propósitos diferentes e a unificação exigiria parâmetros de comportamento.', correct: true },
          { id: 'b', text: 'Quando são mais de dois trechos.' },
          { id: 'c', text: 'Quando estão na mesma classe.' },
          { id: 'd', text: 'Sempre deve ser eliminada.' },
        ],
        explanation:
          'Um método genérico controlado por flags é mais difícil de entender que os dois laços originais.',
      },
    ],
    challenge: {
      brief:
        'Elimine a duplicação de conhecimento de um sistema de descontos, onde a mesma regra aparece escrita de três formas diferentes.',
      requirements: [
        '`EhVip(int compras)` centraliza a regra: cliente é VIP com `10` compras ou mais',
        '`EhAtacado(int quantidade)` centraliza a regra: atacado a partir de `50` unidades',
        '`DescontoCliente(int compras)` devolve `0.10m` para VIP e `0` para os demais',
        '`DescontoVolume(int quantidade)` devolve `0.05m` para atacado e `0` para os demais',
        '`PrecoFinal(decimal preco, int quantidade, int compras)` aplica os dois descontos sobre o total',
        '`Etiqueta(int compras, int quantidade)` devolve `vip+atacado`, `vip`, `atacado` ou `comum`',
        'As regras de VIP e atacado aparecem em um único lugar cada',
        'O código entregue tem três escritas da regra de VIP, e uma delas está com o limite errado — unifique usando `10`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // A regra "VIP tem 10 compras ou mais" aparece escrita de tres jeitos,
    // e uma das escritas usa o limite errado. Unifique em EhVip.
    // Faca o mesmo com a regra de atacado.

    static decimal DescontoCliente(int compras)
    {
        if (compras >= 10)
        {
            return 0.10m;
        }

        return 0;
    }

    static decimal DescontoVolume(int quantidade)
    {
        if (quantidade >= 50)
        {
            return 0.05m;
        }

        return 0;
    }

    static decimal PrecoFinal(decimal preco, int quantidade, int compras)
    {
        decimal total = preco * quantidade;

        total -= total * DescontoCliente(compras);
        total -= total * DescontoVolume(quantidade);

        return total;
    }

    static string Etiqueta(int compras, int quantidade)
    {
        // aqui a regra virou "> 9", equivalente por acaso
        bool vip = compras > 9;

        // e aqui o limite esta errado
        bool atacado = quantidade >= 40;

        if (vip && atacado) { return "vip+atacado"; }
        if (vip) { return "vip"; }
        if (atacado) { return "atacado"; }

        return "comum";
    }

    static void Main()
    {
        decimal preco = decimal.Parse(Console.ReadLine());
        int quantidade = int.Parse(Console.ReadLine());
        int compras = int.Parse(Console.ReadLine());

        Console.WriteLine($"final: {PrecoFinal(preco, quantidade, compras):F2}");
        Console.WriteLine($"etiqueta: {Etiqueta(compras, quantidade)}");
        Console.WriteLine($"vip 10: {EhVip(10)}");
        Console.WriteLine($"vip 9: {EhVip(9)}");
        Console.WriteLine($"atacado 50: {EhAtacado(50)}");
        Console.WriteLine($"atacado 45: {EhAtacado(45)}");
        Console.WriteLine($"etiqueta 45 unidades: {Etiqueta(0, 45)}");
        Console.WriteLine($"etiqueta vip atacado: {Etiqueta(10, 50)}");
    }
}
`,
      solution: `using System;

class Program
{
    const int ComprasParaVip = 10;
    const int QuantidadeParaAtacado = 50;
    const decimal DescontoVip = 0.10m;
    const decimal DescontoAtacado = 0.05m;

    static bool EhVip(int compras)
    {
        return compras >= ComprasParaVip;
    }

    static bool EhAtacado(int quantidade)
    {
        return quantidade >= QuantidadeParaAtacado;
    }

    static decimal DescontoCliente(int compras)
    {
        return EhVip(compras) ? DescontoVip : 0;
    }

    static decimal DescontoVolume(int quantidade)
    {
        return EhAtacado(quantidade) ? DescontoAtacado : 0;
    }

    static decimal PrecoFinal(decimal preco, int quantidade, int compras)
    {
        decimal total = preco * quantidade;

        total -= total * DescontoCliente(compras);
        total -= total * DescontoVolume(quantidade);

        return total;
    }

    static string Etiqueta(int compras, int quantidade)
    {
        bool vip = EhVip(compras);
        bool atacado = EhAtacado(quantidade);

        if (vip && atacado) return "vip+atacado";
        if (vip) return "vip";
        if (atacado) return "atacado";

        return "comum";
    }

    static void Main()
    {
        decimal preco = decimal.Parse(Console.ReadLine());
        int quantidade = int.Parse(Console.ReadLine());
        int compras = int.Parse(Console.ReadLine());

        Console.WriteLine($"final: {PrecoFinal(preco, quantidade, compras):F2}");
        Console.WriteLine($"etiqueta: {Etiqueta(compras, quantidade)}");
        Console.WriteLine($"vip 10: {EhVip(10)}");
        Console.WriteLine($"vip 9: {EhVip(9)}");
        Console.WriteLine($"atacado 50: {EhAtacado(50)}");
        Console.WriteLine($"atacado 45: {EhAtacado(45)}");
        Console.WriteLine($"etiqueta 45 unidades: {Etiqueta(0, 45)}");
        Console.WriteLine($"etiqueta vip atacado: {Etiqueta(10, 50)}");
      }
}
`,
      hints: [
        'As três escritas da regra de VIP são `compras >= 10`, `compras > 9` e o limite errado de atacado em `40`.',
        'Depois de criar `EhVip` e `EhAtacado`, todos os outros métodos chamam essas duas.',
        'A `Etiqueta` com `45` unidades passa a devolver `comum`, porque o limite correto de atacado é `50`.',
      ],
      tests: [
        {
          name: 'Cliente vip com atacado',
          stdin: '10.00\n50\n10\n',
          expectedStdout:
            'final: 427.50\netiqueta: vip+atacado\nvip 10: True\nvip 9: False\n' +
            'atacado 50: True\natacado 45: False\netiqueta 45 unidades: comum\n' +
            'etiqueta vip atacado: vip+atacado',
        },
        {
          name: 'Cliente comum',
          stdin: '20.00\n5\n2\n',
          expectedStdout:
            'final: 100.00\netiqueta: comum\nvip 10: True\nvip 9: False\n' +
            'atacado 50: True\natacado 45: False\netiqueta 45 unidades: comum\n' +
            'etiqueta vip atacado: vip+atacado',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c06l07',
    title: 'Simplificando condições',
    objective: 'Tornar condições complexas legíveis dando nome às partes que as compõem.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma condição com cinco operadores é difícil de ler e quase impossível de verificar mentalmente. A solução é a mesma da extração de método: dar nome às partes.',
      },
      {
        kind: 'compare',
        good: `bool temSaldo = c.Saldo >= valor;
bool estaAtiva = c.Ativa && !c.Bloqueada;
bool dentroDoLimite = valor <= c.Limite;

if (temSaldo && estaAtiva && dentroDoLimite)`,
        bad: `if (c.Saldo >= valor && c.Ativa
    && !c.Bloqueada
    && valor <= c.Limite
    && valor > 0)`,
        goodLabel: 'Cada parte com nome',
        badLabel: 'Condição de cinco termos',
      },
      {
        kind: 'table',
        headers: ['Técnica', 'Quando'],
        rows: [
          ['variável booleana com nome', 'a condição tem partes identificáveis'],
          ['método de predicado', 'a mesma condição aparece em vários lugares'],
          ['guard clause', 'a condição decide se continua'],
          ['inverter a condição', 'a versão negada é mais simples'],
        ],
      },
      {
        kind: 'text',
        body:
          'Vale conhecer as **leis de De Morgan**, que ajudam a simplificar negações: `!(a && b)` é o mesmo que `!a || !b`, e `!(a || b)` é o mesmo que `!a && !b`.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Negações aninhadas são das coisas mais difíceis de ler. `if (!(!ativo || !valido))` é logicamente `if (ativo && valido)` — e a segunda forma é compreensível em um segundo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Extrair a condição para uma variável muda o momento da avaliação: o curto-circuito do `&&` deixa de pular o segundo termo. Se o segundo termo pode lançar quando o primeiro é falso, mantenha-os na mesma expressão.',
      },
    ],
    quiz: [
      {
        id: 's06c06l07q1',
        type: 'single',
        prompt: 'Qual é o equivalente de `!(a && b)`?',
        options: [
          { id: 'a', code: '!a || !b', correct: true },
          { id: 'b', code: '!a && !b' },
          { id: 'c', code: 'a || b' },
          { id: 'd', code: '!(a) && b' },
        ],
        explanation:
          'É uma das leis de De Morgan. A negação de uma conjunção é a disjunção das negações.',
      },
      {
        id: 's06c06l07q2',
        type: 'single',
        prompt: 'Que cuidado tomar ao extrair uma condição para uma variável?',
        options: [
          { id: 'a', text: 'O curto-circuito deixa de valer, e o segundo termo passa a ser sempre avaliado.', correct: true },
          { id: 'b', text: 'A condição fica mais lenta.' },
          { id: 'c', text: 'O compilador reordena os termos.' },
          { id: 'd', text: 'Não há cuidado a tomar.' },
        ],
        explanation:
          'Se o segundo termo lança quando o primeiro é falso — como acessar um nulo já verificado —, a extração quebra o código.',
      },
      {
        id: 's06c06l07q3',
        type: 'single',
        prompt: 'Quando transformar a condição em um método de predicado?',
        options: [
          { id: 'a', text: 'Quando a mesma condição aparece em vários lugares.', correct: true },
          { id: 'b', text: 'Quando ela tem mais de dois termos.' },
          { id: 'c', text: 'Quando ela envolve negação.' },
          { id: 'd', text: 'Sempre.' },
        ],
        explanation:
          'Aí o método elimina duplicação de conhecimento, além de dar nome à regra.',
      },
    ],
    challenge: {
      brief:
        'Simplifique condições emaranhadas dando nome às partes. Ao desfazer as negações aninhadas, um erro de lógica vai aparecer.',
      requirements: [
        '`PodeSacar(decimal saldo, decimal valor, bool ativa, bool bloqueada, decimal limite)` devolve se o saque é permitido',
        'É permitido quando o valor é positivo, cabe no saldo, não passa do limite, a conta está ativa e não está bloqueada',
        'Cada parte da condição vira uma variável booleana com nome',
        '`Recusado(...)` devolve o motivo da recusa: `valor invalido`, `sem saldo`, `acima do limite`, `conta inativa`, `conta bloqueada` ou `permitido`',
        'A ordem das verificações de `Recusado` é a listada acima',
        'O código entregue tem uma negação aninhada que inverteu a lógica — corrija',
        'Nenhuma condição tem mais de dois termos',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // BUG: a negacao aninhada abaixo inverteu a logica de uma das partes.
    // Simplifique dando nome a cada parte e o erro vai aparecer.
    static bool PodeSacar(decimal saldo, decimal valor, bool ativa, bool bloqueada, decimal limite)
    {
        return !(!(valor > 0) || !(saldo >= valor)) && !(!ativa || !bloqueada) && valor <= limite;
    }

    // Escreva Recusado aqui

    static void Main()
    {
        decimal saldo = decimal.Parse(Console.ReadLine());
        decimal valor = decimal.Parse(Console.ReadLine());
        decimal limite = decimal.Parse(Console.ReadLine());

        Console.WriteLine($"normal: {PodeSacar(saldo, valor, true, false, limite)}");
        Console.WriteLine($"bloqueada: {PodeSacar(saldo, valor, true, true, limite)}");
        Console.WriteLine($"inativa: {PodeSacar(saldo, valor, false, false, limite)}");
        Console.WriteLine($"valor zero: {PodeSacar(saldo, 0, true, false, limite)}");
        Console.WriteLine($"acima do limite: {PodeSacar(saldo, limite + 1, true, false, limite)}");

        Console.WriteLine($"motivo normal: {Recusado(saldo, valor, true, false, limite)}");
        Console.WriteLine($"motivo zero: {Recusado(saldo, 0, true, false, limite)}");
        Console.WriteLine($"motivo sem saldo: {Recusado(0, 100, true, false, 1000)}");
        Console.WriteLine($"motivo limite: {Recusado(saldo, limite + 1, true, false, limite)}");
        Console.WriteLine($"motivo inativa: {Recusado(saldo, valor, false, false, limite)}");
        Console.WriteLine($"motivo bloqueada: {Recusado(saldo, valor, true, true, limite)}");
    }
}
`,
      solution: `using System;

class Program
{
    static bool PodeSacar(decimal saldo, decimal valor, bool ativa, bool bloqueada, decimal limite)
    {
        bool valorValido = valor > 0;
        bool temSaldo = saldo >= valor;
        bool dentroDoLimite = valor <= limite;
        bool contaUtilizavel = ativa && !bloqueada;

        return valorValido && temSaldo && dentroDoLimite && contaUtilizavel;
    }

    static string Recusado(decimal saldo, decimal valor, bool ativa, bool bloqueada, decimal limite)
    {
        if (valor <= 0)
        {
            return "valor invalido";
        }

        if (saldo < valor)
        {
            return "sem saldo";
        }

        if (valor > limite)
        {
            return "acima do limite";
        }

        if (!ativa)
        {
            return "conta inativa";
        }

        if (bloqueada)
        {
            return "conta bloqueada";
        }

        return "permitido";
    }

    static void Main()
    {
        decimal saldo = decimal.Parse(Console.ReadLine());
        decimal valor = decimal.Parse(Console.ReadLine());
        decimal limite = decimal.Parse(Console.ReadLine());

        Console.WriteLine($"normal: {PodeSacar(saldo, valor, true, false, limite)}");
        Console.WriteLine($"bloqueada: {PodeSacar(saldo, valor, true, true, limite)}");
        Console.WriteLine($"inativa: {PodeSacar(saldo, valor, false, false, limite)}");
        Console.WriteLine($"valor zero: {PodeSacar(saldo, 0, true, false, limite)}");
        Console.WriteLine($"acima do limite: {PodeSacar(saldo, limite + 1, true, false, limite)}");

        Console.WriteLine($"motivo normal: {Recusado(saldo, valor, true, false, limite)}");
        Console.WriteLine($"motivo zero: {Recusado(saldo, 0, true, false, limite)}");
        Console.WriteLine($"motivo sem saldo: {Recusado(0, 100, true, false, 1000)}");
        Console.WriteLine($"motivo limite: {Recusado(saldo, limite + 1, true, false, limite)}");
        Console.WriteLine($"motivo inativa: {Recusado(saldo, valor, false, false, limite)}");
        Console.WriteLine($"motivo bloqueada: {Recusado(saldo, valor, true, true, limite)}");
    }
}
`,
      hints: [
        'Aplique De Morgan em `!(!ativa || !bloqueada)`: ela vira `ativa && bloqueada` — exigindo que a conta esteja bloqueada para sacar.',
        'A regra correta é `ativa && !bloqueada`.',
        'O `Recusado` é uma sequência de guard clauses na ordem dos requisitos.',
      ],
      tests: [
        {
          name: 'Saldo suficiente',
          stdin: '1000\n200\n500\n',
          expectedStdout:
            'normal: True\nbloqueada: False\ninativa: False\nvalor zero: False\n' +
            'acima do limite: False\nmotivo normal: permitido\nmotivo zero: valor invalido\n' +
            'motivo sem saldo: sem saldo\nmotivo limite: acima do limite\n' +
            'motivo inativa: conta inativa\nmotivo bloqueada: conta bloqueada',
        },
        {
          name: 'Limite baixo',
          stdin: '5000\n100\n200\n',
          expectedStdout:
            'normal: True\nbloqueada: False\ninativa: False\nvalor zero: False\n' +
            'acima do limite: False\nmotivo normal: permitido\nmotivo zero: valor invalido\n' +
            'motivo sem saldo: sem saldo\nmotivo limite: acima do limite\n' +
            'motivo inativa: conta inativa\nmotivo bloqueada: conta bloqueada',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c06l08',
    title: 'Dividindo laços que fazem duas coisas',
    objective: 'Separar responsabilidades que foram agrupadas em um laço só por eficiência aparente.',
    concept: [
      {
        kind: 'text',
        body:
          'Um laço que calcula duas coisas diferentes ao mesmo tempo economiza uma passagem pela coleção — e paga com clareza. Na maioria dos casos, o negócio não compensa.',
      },
      {
        kind: 'compare',
        good: `int soma = Somar(valores);
int maior = Maior(valores);

// duas passagens,
// duas responsabilidades`,
        bad: `int soma = 0, maior = int.MinValue;

foreach (int v in valores)
{
    soma += v;
    if (v > maior) maior = v;
}
// uma passagem,
// duas responsabilidades`,
        goodLabel: 'Cada coisa no seu lugar',
        badLabel: 'Duas contas entrelaçadas',
      },
      {
        kind: 'text',
        body:
          'A economia é real, mas pequena: percorrer uma lista duas vezes continua sendo tempo linear. Dobrar uma constante raramente importa — e, quando importa, isso é uma decisão consciente, apoiada em medição.',
      },
      {
        kind: 'table',
        headers: ['Dividir permite', 'Detalhe'],
        rows: [
          ['nomear cada cálculo', 'o nome documenta a intenção'],
          ['testar separadamente', 'cada parte tem seus casos'],
          ['reusar uma das partes', 'sem arrastar a outra junto'],
          ['alterar uma sem tocar na outra', 'menos risco por mudança'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Este é um caso claro de otimização prematura. Junte as passagens **depois** de medir que aquele laço é o gargalo — o que quase nunca acontece.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A exceção legítima é quando a coleção é enorme ou a leitura é cara — um arquivo, uma consulta remota. Aí a passagem única é a decisão certa, e vale um comentário explicando o porquê.',
      },
    ],
    quiz: [
      {
        id: 's06c06l08q1',
        type: 'single',
        prompt: 'Qual é o custo real de percorrer a lista duas vezes em vez de uma?',
        options: [
          { id: 'a', text: 'Dobrar uma constante; a complexidade continua linear.', correct: true },
          { id: 'b', text: 'A complexidade vira quadrática.' },
          { id: 'c', text: 'O uso de memória dobra.' },
          { id: 'd', text: 'Não há custo nenhum.' },
        ],
        explanation:
          'Duas passagens lineares continuam lineares. Trocar clareza por essa constante raramente compensa.',
      },
      {
        id: 's06c06l08q2',
        type: 'multiple',
        prompt: 'O que dividir o laço permite?',
        options: [
          { id: 'a', text: 'Nomear cada cálculo.', correct: true },
          { id: 'b', text: 'Testar cada parte separadamente.', correct: true },
          { id: 'c', text: 'Reusar uma das partes sozinha.', correct: true },
          { id: 'd', text: 'Reduzir a complexidade assintótica.' },
        ],
        explanation:
          'A complexidade não muda — os ganhos são todos de clareza, teste e reúso.',
      },
      {
        id: 's06c06l08q3',
        type: 'single',
        prompt: 'Qual é a exceção legítima para manter a passagem única?',
        options: [
          { id: 'a', text: 'Quando a coleção é enorme ou a leitura é cara, como arquivo ou rede.', correct: true },
          { id: 'b', text: 'Quando há mais de dois cálculos.' },
          { id: 'c', text: 'Quando o método é privado.' },
          { id: 'd', text: 'Não há exceção.' },
        ],
        explanation:
          'Nesses casos a segunda passagem custa de verdade — e a decisão merece um comentário explicando a razão.',
      },
    ],
    challenge: {
      brief:
        'Divida um laço que calcula cinco estatísticas de uma vez em métodos independentes. Ao separar, um dos cálculos vai se revelar errado.',
      requirements: [
        '`Soma(List<int> valores)` devolve a soma; lista vazia devolve `0`',
        '`Maior(List<int> valores)` devolve o maior; lista vazia devolve `0`',
        '`Menor(List<int> valores)` devolve o menor; lista vazia devolve `0`',
        '`ContarPares(List<int> valores)` conta os números pares',
        '`Media(List<int> valores)` devolve a média inteira; lista vazia devolve `0`',
        'Cada método percorre a lista por conta própria',
        'O código entregue tem um bug em um dos cálculos, escondido pelo entrelaçamento — corrija',
        'As cinco funções tratam lista vazia sem estourar',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Um laco calculando cinco coisas ao mesmo tempo.
    // Divida em cinco metodos. Um dos calculos esta errado,
    // e o entrelacamento esconde qual.
    static void Estatisticas(List<int> valores, out int soma, out int maior, out int menor, out int pares, out int media)
    {
        soma = 0;
        maior = valores.Count > 0 ? valores[0] : 0;
        menor = valores.Count > 0 ? valores[0] : 0;
        pares = 0;

        foreach (int valor in valores)
        {
            soma += valor;

            if (valor > maior)
            {
                maior = valor;
            }

            if (valor > menor)
            {
                menor = valor;
            }

            if (valor % 2 == 0)
            {
                pares++;
            }
        }

        media = valores.Count == 0 ? 0 : soma / valores.Count;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> valores = new List<int>();

        for (int i = 0; i < n; i++)
        {
            valores.Add(int.Parse(Console.ReadLine()));
        }

        Console.WriteLine($"soma: {Soma(valores)}");
        Console.WriteLine($"maior: {Maior(valores)}");
        Console.WriteLine($"menor: {Menor(valores)}");
        Console.WriteLine($"pares: {ContarPares(valores)}");
        Console.WriteLine($"media: {Media(valores)}");

        List<int> vazia = new List<int>();

        Console.WriteLine($"vazia: {Soma(vazia)} {Maior(vazia)} {Menor(vazia)} {ContarPares(vazia)} {Media(vazia)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static int Soma(List<int> valores)
    {
        int soma = 0;

        foreach (int valor in valores)
        {
            soma += valor;
        }

        return soma;
    }

    static int Maior(List<int> valores)
    {
        if (valores.Count == 0)
        {
            return 0;
        }

        int maior = valores[0];

        foreach (int valor in valores)
        {
            if (valor > maior)
            {
                maior = valor;
            }
        }

        return maior;
    }

    static int Menor(List<int> valores)
    {
        if (valores.Count == 0)
        {
            return 0;
        }

        int menor = valores[0];

        foreach (int valor in valores)
        {
            if (valor < menor)
            {
                menor = valor;
            }
        }

        return menor;
    }

    static int ContarPares(List<int> valores)
    {
        int pares = 0;

        foreach (int valor in valores)
        {
            if (valor % 2 == 0)
            {
                pares++;
            }
        }

        return pares;
    }

    static int Media(List<int> valores)
    {
        if (valores.Count == 0)
        {
            return 0;
        }

        return Soma(valores) / valores.Count;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> valores = new List<int>();

        for (int i = 0; i < n; i++)
        {
            valores.Add(int.Parse(Console.ReadLine()));
        }

        Console.WriteLine($"soma: {Soma(valores)}");
        Console.WriteLine($"maior: {Maior(valores)}");
        Console.WriteLine($"menor: {Menor(valores)}");
        Console.WriteLine($"pares: {ContarPares(valores)}");
        Console.WriteLine($"media: {Media(valores)}");

        List<int> vazia = new List<int>();

        Console.WriteLine($"vazia: {Soma(vazia)} {Maior(vazia)} {Menor(vazia)} {ContarPares(vazia)} {Media(vazia)}");
    }
}
`,
      hints: [
        'Ao isolar o `Menor`, a condição `valor > menor` fica evidentemente errada: ela procura o maior.',
        'A comparação correta para o menor é `valor < menor`.',
        'O `Media` pode reusar o `Soma` em vez de percorrer de novo — aqui a reutilização é legítima.',
      ],
      tests: [
        {
          name: 'Valores variados',
          stdin: '5\n8\n3\n10\n1\n6\n',
          expectedStdout:
            'soma: 28\nmaior: 10\nmenor: 1\npares: 3\nmedia: 5\nvazia: 0 0 0 0 0',
        },
        {
          name: 'Com negativos',
          stdin: '4\n-5\n2\n-8\n4\n',
          expectedStdout:
            'soma: -7\nmaior: 4\nmenor: -8\npares: 3\nmedia: -1\nvazia: 0 0 0 0 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c06l09',
    title: 'Prática: refatorando com rede de segurança',
    objective: 'Refatorar com testes garantindo que o comportamento não mudou a cada passo.',
    concept: [
      {
        kind: 'text',
        body:
          'Refatorar sem testes é uma aposta. Com testes, cada passo tem confirmação imediata — e é isso que permite fazer alterações grandes com segurança.',
      },
      {
        kind: 'table',
        headers: ['Passo', 'O que fazer'],
        rows: [
          ['1', 'escrever testes do comportamento **atual**'],
          ['2', 'rodar e confirmar que passam'],
          ['3', 'refatorar um passo'],
          ['4', 'rodar de novo'],
          ['5', 'repetir 3 e 4 até terminar'],
        ],
      },
      {
        kind: 'text',
        body:
          'O passo 1 tem um detalhe crucial: os testes descrevem o comportamento **atual**, mesmo que ele esteja errado. A refatoração preserva comportamento; corrigir bugs é outra tarefa, feita depois e separadamente.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Esses testes escritos antes de refatorar código legado têm nome: **testes de caracterização**. Eles não dizem o que o código deveria fazer, e sim registram o que ele faz hoje — para que qualquer mudança acidental apareça.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Misturar refatoração com correção de bug é o erro clássico. Quando o teste falha, você não sabe se foi a refatoração que quebrou ou a correção que mudou o comportamento de propósito. Faça um de cada vez.',
      },
      {
        kind: 'text',
        body:
          'Quando um teste de caracterização registra um comportamento que você acredita ser um bug, anote-o. Depois de terminar a refatoração, aí sim discuta e corrija — com o teste sendo atualizado deliberadamente.',
      },
    ],
    quiz: [
      {
        id: 's06c06l09q1',
        type: 'single',
        prompt: 'O que um teste de caracterização registra?',
        options: [
          { id: 'a', text: 'O comportamento atual do código, mesmo que esteja errado.', correct: true },
          { id: 'b', text: 'O comportamento correto esperado.' },
          { id: 'c', text: 'Os requisitos originais.' },
          { id: 'd', text: 'A cobertura do código.' },
        ],
        explanation:
          'O objetivo é detectar mudanças acidentais, não julgar se o comportamento está certo.',
      },
      {
        id: 's06c06l09q2',
        type: 'single',
        prompt: 'Por que não misturar refatoração com correção de bug?',
        options: [
          { id: 'a', text: 'Porque a falha do teste não distingue as duas causas.', correct: true },
          { id: 'b', text: 'Porque o compilador reclama.' },
          { id: 'c', text: 'Porque a refatoração fica mais lenta.' },
          { id: 'd', text: 'Pode misturar sem problema.' },
        ],
        explanation:
          'É a disciplina de mudar uma coisa por vez, aplicada em outra escala.',
      },
      {
        id: 's06c06l09q3',
        type: 'single',
        prompt: 'O teste registrou um comportamento que parece um bug. O que fazer?',
        options: [
          { id: 'a', text: 'Anotar, terminar a refatoração, e só então corrigir deliberadamente.', correct: true },
          { id: 'b', text: 'Corrigir imediatamente.' },
          { id: 'c', text: 'Remover o teste.' },
          { id: 'd', text: 'Ignorar o comportamento.' },
        ],
        explanation:
          'A correção é uma mudança de comportamento intencional, e merece o seu próprio passo com o teste atualizado de propósito.',
      },
    ],
    challenge: {
      brief:
        'Escreva testes de caracterização de um formatador legado, refatore com eles rodando, e só então corrija o comportamento que eles registraram como suspeito.',
      requirements: [
        '`FormatarNome(string entrada)` recebe `sobrenome, nome` e devolve `Nome Sobrenome` com iniciais maiúsculas',
        'Entrada nula ou em branco devolve `sem nome`',
        'Entrada sem vírgula devolve a própria entrada com a primeira letra maiúscula',
        'Espaços em excesso ao redor das partes são removidos',
        '`Verificar(string nome, bool condicao)` conta e imprime `PASS nome` ou `FAIL nome`',
        '`RodarCaracterizacao()` verifica os seis casos que os testes da lição esperam, na ordem dada',
        'Depois de refatorar, `FormatarNome` usa métodos auxiliares nomeados em vez de um bloco único',
        'A saída deve continuar idêntica à do código original',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int passou = 0;
    static int total = 0;

    // Codigo legado. Escreva os testes de caracterizacao primeiro,
    // depois refatore em metodos auxiliares mantendo o comportamento.
    static string FormatarNome(string entrada)
    {
        if (entrada == null || entrada.Trim().Length == 0) { return "sem nome"; }
        int v = entrada.IndexOf(',');
        if (v < 0)
        {
            string u = entrada.Trim();
            return u.Substring(0, 1).ToUpper() + u.Substring(1).ToLower();
        }
        string s = entrada.Substring(0, v).Trim();
        string n = entrada.Substring(v + 1).Trim();
        string sf = s.Length == 0 ? "" : s.Substring(0, 1).ToUpper() + s.Substring(1).ToLower();
        string nf = n.Length == 0 ? "" : n.Substring(0, 1).ToUpper() + n.Substring(1).ToLower();
        if (nf.Length == 0) { return sf; }
        if (sf.Length == 0) { return nf; }
        return nf + " " + sf;
    }

    // Escreva Verificar, Relatorio e RodarCaracterizacao aqui
    // Os seis casos, nesta ordem e com estes nomes:
    //   "nome completo"
    //   "espacos em excesso"
    //   "sem virgula"
    //   "entrada vazia"
    //   "entrada nula"
    //   "so sobrenome"

    static void Main()
    {
        RodarCaracterizacao();
        Relatorio();

        Console.WriteLine($"exemplo: {FormatarNome("SILVA, ana")}");
        Console.WriteLine($"exemplo: {FormatarNome("  PEREIRA  ,  joao  ")}");
        Console.WriteLine($"exemplo: {FormatarNome("madonna")}");
    }
}
`,
      solution: `using System;

class Program
{
    static int passou = 0;
    static int total = 0;

    static string Capitalizar(string texto)
    {
        if (texto.Length == 0)
        {
            return "";
        }

        return texto.Substring(0, 1).ToUpper() + texto.Substring(1).ToLower();
    }

    static bool EstaVazia(string entrada)
    {
        return entrada == null || entrada.Trim().Length == 0;
    }

    static string FormatarSemVirgula(string entrada)
    {
        return Capitalizar(entrada.Trim());
    }

    static string FormatarComVirgula(string entrada, int posicaoVirgula)
    {
        string sobrenome = Capitalizar(entrada.Substring(0, posicaoVirgula).Trim());
        string nome = Capitalizar(entrada.Substring(posicaoVirgula + 1).Trim());

        if (nome.Length == 0)
        {
            return sobrenome;
        }

        if (sobrenome.Length == 0)
        {
            return nome;
        }

        return nome + " " + sobrenome;
    }

    static string FormatarNome(string entrada)
    {
        if (EstaVazia(entrada))
        {
            return "sem nome";
        }

        int posicaoVirgula = entrada.IndexOf(',');

        if (posicaoVirgula < 0)
        {
            return FormatarSemVirgula(entrada);
        }

        return FormatarComVirgula(entrada, posicaoVirgula);
    }

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

    static void Relatorio()
    {
        Console.WriteLine($"{passou}/{total} caracterizados");
    }

    static void RodarCaracterizacao()
    {
        Verificar("nome completo", FormatarNome("SILVA, ana") == "Ana Silva");
        Verificar("espacos em excesso", FormatarNome("  PEREIRA  ,  joao  ") == "Joao Pereira");
        Verificar("sem virgula", FormatarNome("madonna") == "Madonna");
        Verificar("entrada vazia", FormatarNome("   ") == "sem nome");
        Verificar("entrada nula", FormatarNome(null) == "sem nome");
        Verificar("so sobrenome", FormatarNome("SILVA,") == "Silva");
    }

    static void Main()
    {
        RodarCaracterizacao();
        Relatorio();

        Console.WriteLine($"exemplo: {FormatarNome("SILVA, ana")}");
        Console.WriteLine($"exemplo: {FormatarNome("  PEREIRA  ,  joao  ")}");
        Console.WriteLine($"exemplo: {FormatarNome("madonna")}");
    }
}
`,
      hints: [
        'Rode o código legado com cada entrada primeiro, e escreva o teste com o valor que ele **realmente** devolve.',
        '`Capitalizar` é o auxiliar mais óbvio: a mesma expressão aparece três vezes no código original.',
        'Depois de extrair, o `FormatarNome` fica com três guard clauses e duas delegações.',
      ],
      tests: [
        {
          name: 'Caracterizacao completa',
          stdin: '',
          expectedStdout:
            'PASS nome completo\nPASS espacos em excesso\nPASS sem virgula\n' +
            'PASS entrada vazia\nPASS entrada nula\nPASS so sobrenome\n' +
            '6/6 caracterizados\n' +
            'exemplo: Ana Silva\nexemplo: Joao Pereira\nexemplo: Madonna',
        },
      ],
    },
  },
  {
    id: 's06c06l10',
    title: 'Checkpoint: refatoração',
    objective: 'Aplicar o catálogo completo de refatorações a um módulo, com testes garantindo o comportamento.',
    concept: [
      {
        kind: 'text',
        body:
          'Refatorar é uma sequência de transformações pequenas e seguras. O catálogo do capítulo cobre as que resolvem a maioria dos problemas reais.',
      },
      {
        kind: 'table',
        headers: ['Refatoração', 'Resolve'],
        rows: [
          ['extrair método', 'método longo demais'],
          ['extrair classe', 'classe com responsabilidades demais'],
          ['renomear', 'nome que não explica'],
          ['condicional por polimorfismo', '`if` por tipo espalhado'],
          ['objeto de parâmetro', 'parâmetros que andam juntos'],
          ['remover duplicação', 'a mesma regra em vários lugares'],
          ['simplificar condição', 'expressão booleana ilegível'],
          ['dividir laço', 'laço com duas responsabilidades'],
        ],
      },
      {
        kind: 'text',
        body:
          'A ordem importa menos que a disciplina: um passo por vez, com verificação entre cada um. Refatorações grandes são apenas muitas refatorações pequenas aplicadas em sequência.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Refatorar não é uma etapa separada do trabalho. A prática que funciona é limpar o código **enquanto** se trabalha nele: sempre que você entende um trecho, deixa-o um pouco mais claro para o próximo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Refatoração sem propósito é desperdício. Refatore o que você está prestes a mudar, o que dá trabalho para entender, ou o que já causou bug. Reescrever código estável que ninguém toca não rende nada.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Se a refatoração ficar grande demais para acompanhar, desfaça e recomece com passos menores. Não existe prêmio por chegar lá em uma tentativa só.',
      },
    ],
    quiz: [
      {
        id: 's06c06l10q1',
        type: 'single',
        prompt: 'O que importa mais que a ordem das refatorações?',
        options: [
          { id: 'a', text: 'A disciplina: um passo por vez, com verificação entre cada um.', correct: true },
          { id: 'b', text: 'Escolher a refatoração mais impactante primeiro.' },
          { id: 'c', text: 'Terminar tudo na mesma sessão.' },
          { id: 'd', text: 'Usar todas as do catálogo.' },
        ],
        explanation:
          'Passos pequenos e verificados tornam qualquer refatoração grande viável — e reversível.',
      },
      {
        id: 's06c06l10q2',
        type: 'multiple',
        prompt: 'O que vale a pena refatorar?',
        options: [
          { id: 'a', text: 'O código que você está prestes a mudar.', correct: true },
          { id: 'b', text: 'O código que dá trabalho para entender.', correct: true },
          { id: 'c', text: 'O código que já causou bug.', correct: true },
          { id: 'd', text: 'Código estável que ninguém toca há anos.' },
        ],
        explanation:
          'Refatorar tem custo e risco. Ele se paga onde há atividade, não em código parado e funcionando.',
      },
      {
        id: 's06c06l10q3',
        type: 'single',
        prompt: 'A refatoração ficou grande demais para acompanhar. O que fazer?',
        options: [
          { id: 'a', text: 'Desfazer e recomeçar com passos menores.', correct: true },
          { id: 'b', text: 'Continuar até o fim.' },
          { id: 'c', text: 'Comentar o código antigo e seguir.' },
          { id: 'd', text: 'Rodar os testes só no final.' },
        ],
        explanation:
          'Insistir em uma refatoração fora de controle costuma custar mais que recomeçar com passos que cabem na cabeça.',
      },
    ],
    challenge: {
      brief:
        'Refatore um módulo de pedidos aplicando cinco refatorações do catálogo, com testes de caracterização garantindo que nada mudou.',
      requirements: [
        '`Endereco` é extraído com rua e cidade, e tem `Resumo()` devolvendo `rua - cidade`',
        '`ItemPedido` é extraído com nome, quantidade e preço, e tem `Subtotal()`',
        '`TipoCliente` vira uma hierarquia: `Comum` sem desconto, `Vip` com 10 por cento, `Parceiro` com 20 por cento, todos com `Rotulo()` e `Desconto()`',
        '`Pedido` recebe cliente, `Endereco` e uma lista de `ItemPedido`',
        '`Pedido.Total()` soma os subtotais e aplica o desconto do tipo de cliente',
        '`Pedido.Descrever()` devolve `cliente (rotulo) | endereco resumo | N itens | R$ X.XX`',
        '`Verificar(string, bool)` conta e relata; `RodarTestes()` verifica os seis casos esperados na ordem dada',
        'A regra de desconto aparece em um único lugar por tipo',
        'A saída deve continuar idêntica à do código original',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Modulo legado a refatorar. Aplique: extrair classe (Endereco, ItemPedido),
// condicional por polimorfismo (TipoCliente), objeto de parametro,
// remover duplicacao e extrair metodo.
//
// class PedidoLegado
// {
//     string cliente, tipoCliente;
//     string enderecoRua, enderecoCidade;
//     List<string> nomes; List<int> quantidades; List<decimal> precos;
//     decimal Total()      // if tipo == "vip" -> 0.10, if "parceiro" -> 0.20
//     string Descrever()   // repete o mesmo if para pegar o rotulo
// }

class Program
{
    static int passou = 0;
    static int total = 0;

    // Escreva Endereco, ItemPedido, a hierarquia TipoCliente,
    // Pedido, Verificar, Relatorio e RodarTestes.
    //
    // Os seis testes, nesta ordem e com estes nomes:
    //   "comum nao tem desconto"
    //   "vip tem 10 por cento"
    //   "parceiro tem 20 por cento"
    //   "pedido vazio soma zero"
    //   "subtotal do item"
    //   "resumo do endereco"

    static void Main()
    {
        RodarTestes();
        Relatorio();

        List<ItemPedido> itens = new List<ItemPedido>
        {
            new ItemPedido("caneta", 4, 2.50m),
            new ItemPedido("caderno", 2, 15.00m)
        };

        Endereco endereco = new Endereco("Rua A 100", "Recife");

        Console.WriteLine(new Pedido("Ana", new Comum(), endereco, itens).Descrever());
        Console.WriteLine(new Pedido("Bruno", new Vip(), endereco, itens).Descrever());
        Console.WriteLine(new Pedido("Carla", new Parceiro(), endereco, itens).Descrever());
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

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
        return $"{Rua} - {Cidade}";
    }
}

class ItemPedido
{
    public string Nome { get; }
    public int Quantidade { get; }
    public decimal Preco { get; }

    public ItemPedido(string nome, int quantidade, decimal preco)
    {
        Nome = nome;
        Quantidade = quantidade;
        Preco = preco;
    }

    public decimal Subtotal()
    {
        return Quantidade * Preco;
    }
}

abstract class TipoCliente
{
    public abstract string Rotulo();

    public abstract decimal Desconto();
}

class Comum : TipoCliente
{
    public override string Rotulo() => "comum";

    public override decimal Desconto() => 0m;
}

class Vip : TipoCliente
{
    public override string Rotulo() => "vip";

    public override decimal Desconto() => 0.10m;
}

class Parceiro : TipoCliente
{
    public override string Rotulo() => "parceiro";

    public override decimal Desconto() => 0.20m;
}

class Pedido
{
    private List<ItemPedido> itens;

    public string Cliente { get; }
    public TipoCliente Tipo { get; }
    public Endereco Endereco { get; }

    public Pedido(string cliente, TipoCliente tipo, Endereco endereco, List<ItemPedido> itens)
    {
        Cliente = cliente;
        Tipo = tipo;
        Endereco = endereco;
        this.itens = new List<ItemPedido>(itens);
    }

    public int Quantidade => itens.Count;

    private decimal SomarItens()
    {
        decimal soma = 0;

        foreach (ItemPedido item in itens)
        {
            soma += item.Subtotal();
        }

        return soma;
    }

    public decimal Total()
    {
        decimal bruto = SomarItens();

        return bruto - bruto * Tipo.Desconto();
    }

    public string Descrever()
    {
        return $"{Cliente} ({Tipo.Rotulo()}) | {Endereco.Resumo()} | {Quantidade} itens | R$ {Total():F2}";
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

    static void Relatorio()
    {
        Console.WriteLine($"{passou}/{total} testes passaram");
    }

    static void RodarTestes()
    {
        List<ItemPedido> itens = new List<ItemPedido>
        {
            new ItemPedido("caneta", 4, 2.50m),
            new ItemPedido("caderno", 2, 15.00m)
        };

        Endereco endereco = new Endereco("Rua A 100", "Recife");

        Pedido comum = new Pedido("Ana", new Comum(), endereco, itens);
        Verificar("comum nao tem desconto", comum.Total() == 40.00m);

        Pedido vip = new Pedido("Bruno", new Vip(), endereco, itens);
        Verificar("vip tem 10 por cento", vip.Total() == 36.00m);

        Pedido parceiro = new Pedido("Carla", new Parceiro(), endereco, itens);
        Verificar("parceiro tem 20 por cento", parceiro.Total() == 32.00m);

        Pedido vazio = new Pedido("Diego", new Comum(), endereco, new List<ItemPedido>());
        Verificar("pedido vazio soma zero", vazio.Total() == 0m);

        ItemPedido item = new ItemPedido("mochila", 3, 80.00m);
        Verificar("subtotal do item", item.Subtotal() == 240.00m);

        Verificar("resumo do endereco", endereco.Resumo() == "Rua A 100 - Recife");
    }

    static void Main()
    {
        RodarTestes();
        Relatorio();

        List<ItemPedido> itens = new List<ItemPedido>
        {
            new ItemPedido("caneta", 4, 2.50m),
            new ItemPedido("caderno", 2, 15.00m)
        };

        Endereco endereco = new Endereco("Rua A 100", "Recife");

        Console.WriteLine(new Pedido("Ana", new Comum(), endereco, itens).Descrever());
        Console.WriteLine(new Pedido("Bruno", new Vip(), endereco, itens).Descrever());
        Console.WriteLine(new Pedido("Carla", new Parceiro(), endereco, itens).Descrever());
    }
}
`,
      hints: [
        'O `Main` mostra exatamente quais tipos precisam existir e com que assinatura.',
        'O `SomarItens` privado elimina a duplicação entre `Total` e qualquer outro cálculo futuro.',
        'A hierarquia de `TipoCliente` substitui os dois `if` idênticos que existiam em `Total` e `Descrever`.',
      ],
      tests: [
        {
          name: 'Modulo refatorado',
          stdin: '',
          expectedStdout:
            'PASS comum nao tem desconto\nPASS vip tem 10 por cento\n' +
            'PASS parceiro tem 20 por cento\nPASS pedido vazio soma zero\n' +
            'PASS subtotal do item\nPASS resumo do endereco\n' +
            '6/6 testes passaram\n' +
            'Ana (comum) | Rua A 100 - Recife | 2 itens | R$ 40.00\n' +
            'Bruno (vip) | Rua A 100 - Recife | 2 itens | R$ 36.00\n' +
            'Carla (parceiro) | Rua A 100 - Recife | 2 itens | R$ 32.00',
        },
      ],
    },
  },
]
