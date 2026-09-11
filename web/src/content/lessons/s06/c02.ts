import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's06c02l01',
    title: 'Exceções customizadas',
    objective: 'Criar um tipo de exceção próprio quando nenhum tipo existente descreve bem o problema.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando o erro é específico do seu domínio, os tipos do .NET não descrevem bem o que aconteceu. Uma exceção customizada é apenas uma classe que herda de `Exception`.',
      },
      {
        kind: 'code',
        code: `class SaldoInsuficienteException : Exception
{
    public decimal Faltam { get; }

    public SaldoInsuficienteException(decimal faltam)
        : base($"Faltam {faltam:F2}")
    {
        Faltam = faltam;
    }
}`,
        caption: 'A herança da Seção 5 aplicada: `base(...)` passa a mensagem para a classe `Exception`.',
      },
      {
        kind: 'text',
        body:
          'A grande vantagem é poder carregar **dados estruturados**. Em vez de quem captura ter que extrair o número de dentro de uma string, ele lê `e.Faltam` diretamente.',
      },
      {
        kind: 'compare',
        good: `catch (SaldoInsuficienteException e)
{
    Oferecer(e.Faltam);
}`,
        bad: `catch (Exception e)
{
    // extrair o valor da mensagem?
    Oferecer(???);
}`,
        goodLabel: 'Dado estruturado',
        badLabel: 'Dado preso na mensagem',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A convenção é terminar o nome com `Exception`. Não é obrigatório, mas todo o .NET segue isso, e quem lê `SaldoInsuficiente` sozinho não imagina que é um tipo de erro.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Não crie uma exceção customizada para cada situação. Se `ArgumentException` já descreve o problema, use-a. Um tipo novo só se justifica quando quem captura vai **tratar aquilo de forma diferente**.',
      },
      {
        kind: 'text',
        body:
          'Vale oferecer também um construtor que aceite uma exceção interna, para permitir o embrulho que você viu no capítulo anterior.',
      },
    ],
    quiz: [
      {
        id: 's06c02l01q1',
        type: 'single',
        prompt: 'Como se cria uma exceção customizada?',
        options: [
          { id: 'a', text: 'Herdando de `Exception`.', correct: true },
          { id: 'b', text: 'Implementando `IException`.' },
          { id: 'c', text: 'Marcando a classe com `[Exception]`.' },
          { id: 'd', text: 'Herdando de `Error`.' },
        ],
        explanation:
          'É herança comum. `Exception` já traz mensagem, rastro e exceção interna; você acrescenta o que for do seu domínio.',
      },
      {
        id: 's06c02l01q2',
        type: 'single',
        prompt: 'Qual é a principal vantagem de uma exceção customizada?',
        options: [
          { id: 'a', text: 'Carregar dados estruturados que quem captura pode usar.', correct: true },
          { id: 'b', text: 'Ser mais rápida.' },
          { id: 'c', text: 'Não poder ser ignorada.' },
          { id: 'd', text: 'Encerrar o programa automaticamente.' },
        ],
        explanation:
          'Ler `e.Faltam` é confiável; extrair o número de uma mensagem de texto é frágil e quebra na primeira mudança de redação.',
      },
      {
        id: 's06c02l01q3',
        type: 'single',
        prompt: 'Quando **não** criar uma exceção customizada?',
        options: [
          { id: 'a', text: 'Quando um tipo existente já descreve o problema e ninguém vai tratá-lo de forma diferente.', correct: true },
          { id: 'b', text: 'Quando o erro acontece em uma classe privada.' },
          { id: 'c', text: 'Quando o projeto é pequeno.' },
          { id: 'd', text: 'Nunca: sempre vale a pena.' },
        ],
        explanation:
          'Um tipo novo só ganha valor se alguém for capturá-lo especificamente. Sem isso, ele é ruído.',
      },
    ],
    challenge: {
      brief:
        'Crie uma hierarquia de exceções de domínio que carregam dados úteis, e trate cada uma pelo que ela informa.',
      requirements: [
        '`EstoqueException` herda de `Exception` e recebe apenas a mensagem',
        '`ProdutoInexistenteException` herda de `EstoqueException`, guarda `Codigo` (`string`) e tem a mensagem `produto codigo nao existe`',
        '`QuantidadeIndisponivelException` herda de `EstoqueException`, guarda `Pedida` e `Disponivel` (`int`), com a mensagem `pedidas N, disponiveis M`',
        '`Estoque` guarda quantidades por código em um dicionário privado e tem `Cadastrar(string codigo, int quantidade)`',
        '`Retirar(string codigo, int quantidade)` lança a exceção adequada e devolve a quantidade restante quando dá certo',
        'O `Main` captura cada tipo e usa os **dados** da exceção, não a mensagem',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare as tres excecoes e a classe Estoque aqui

class Program
{
    static void Tentar(Estoque e, string codigo, int quantidade)
    {
        try
        {
            int restante = e.Retirar(codigo, quantidade);
            Console.WriteLine($"ok: sobraram {restante}");
        }
        catch (ProdutoInexistenteException ex)
        {
            Console.WriteLine($"inexistente: codigo={ex.Codigo}");
        }
        catch (QuantidadeIndisponivelException ex)
        {
            Console.WriteLine($"indisponivel: faltam {ex.Pedida - ex.Disponivel}");
        }
        catch (EstoqueException ex)
        {
            Console.WriteLine($"estoque: {ex.Message}");
        }
    }

    static void Main()
    {
        string codigo = Console.ReadLine();
        int inicial = int.Parse(Console.ReadLine());

        Estoque estoque = new Estoque();
        estoque.Cadastrar(codigo, inicial);

        Tentar(estoque, codigo, 1);
        Tentar(estoque, codigo, 9999);
        Tentar(estoque, "FANTASMA", 1);

        Console.WriteLine($"mensagem completa: {MensagemDe(estoque, "FANTASMA")}");
    }

    static string MensagemDe(Estoque e, string codigo)
    {
        try
        {
            e.Retirar(codigo, 1);
            return "sem erro";
        }
        catch (EstoqueException ex)
        {
            return ex.Message;
        }
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class EstoqueException : Exception
{
    public EstoqueException(string mensagem)
        : base(mensagem)
    {
    }
}

class ProdutoInexistenteException : EstoqueException
{
    public string Codigo { get; }

    public ProdutoInexistenteException(string codigo)
        : base($"produto {codigo} nao existe")
    {
        Codigo = codigo;
    }
}

class QuantidadeIndisponivelException : EstoqueException
{
    public int Pedida { get; }
    public int Disponivel { get; }

    public QuantidadeIndisponivelException(int pedida, int disponivel)
        : base($"pedidas {pedida}, disponiveis {disponivel}")
    {
        Pedida = pedida;
        Disponivel = disponivel;
    }
}

class Estoque
{
    private Dictionary<string, int> quantidades = new Dictionary<string, int>();

    public void Cadastrar(string codigo, int quantidade)
    {
        quantidades[codigo] = quantidade;
    }

    public int Retirar(string codigo, int quantidade)
    {
        if (!quantidades.TryGetValue(codigo, out int disponivel))
        {
            throw new ProdutoInexistenteException(codigo);
        }

        if (quantidade > disponivel)
        {
            throw new QuantidadeIndisponivelException(quantidade, disponivel);
        }

        quantidades[codigo] = disponivel - quantidade;
        return quantidades[codigo];
    }
}

class Program
{
    static void Tentar(Estoque e, string codigo, int quantidade)
    {
        try
        {
            int restante = e.Retirar(codigo, quantidade);
            Console.WriteLine($"ok: sobraram {restante}");
        }
        catch (ProdutoInexistenteException ex)
        {
            Console.WriteLine($"inexistente: codigo={ex.Codigo}");
        }
        catch (QuantidadeIndisponivelException ex)
        {
            Console.WriteLine($"indisponivel: faltam {ex.Pedida - ex.Disponivel}");
        }
        catch (EstoqueException ex)
        {
            Console.WriteLine($"estoque: {ex.Message}");
        }
    }

    static void Main()
    {
        string codigo = Console.ReadLine();
        int inicial = int.Parse(Console.ReadLine());

        Estoque estoque = new Estoque();
        estoque.Cadastrar(codigo, inicial);

        Tentar(estoque, codigo, 1);
        Tentar(estoque, codigo, 9999);
        Tentar(estoque, "FANTASMA", 1);

        Console.WriteLine($"mensagem completa: {MensagemDe(estoque, "FANTASMA")}");
    }

    static string MensagemDe(Estoque e, string codigo)
    {
        try
        {
            e.Retirar(codigo, 1);
            return "sem erro";
        }
        catch (EstoqueException ex)
        {
            return ex.Message;
        }
    }
}
`,
      hints: [
        'As duas exceções específicas chamam `base(...)` com a mensagem já formatada, e guardam os dados em propriedades.',
        'O `catch (EstoqueException)` no fim funciona como rede: como as outras duas herdam dela, a ordem precisa ir da mais específica para a base.',
      ],
      tests: [
        {
          name: 'Estoque com dez unidades',
          stdin: 'ABC\n10\n',
          expectedStdout:
            'ok: sobraram 9\nindisponivel: faltam 9990\ninexistente: codigo=FANTASMA\n' +
            'mensagem completa: produto FANTASMA nao existe',
        },
        {
          name: 'Estoque com uma unidade',
          stdin: 'XYZ\n1\n',
          expectedStdout:
            'ok: sobraram 0\nindisponivel: faltam 9999\ninexistente: codigo=FANTASMA\n' +
            'mensagem completa: produto FANTASMA nao existe',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c02l02',
    title: 'Validando argumentos',
    objective: 'Recusar entradas inválidas na porta do método, com os helpers que o .NET já oferece.',
    concept: [
      {
        kind: 'text',
        body:
          'Um método deve verificar seus argumentos **antes** de fazer qualquer trabalho. Falhar cedo, com uma mensagem clara, é muito melhor que falhar no meio com um erro obscuro.',
      },
      {
        kind: 'code',
        code: `static void Registrar(string nome, int idade)
{
    ArgumentException.ThrowIfNullOrWhiteSpace(nome);
    ArgumentOutOfRangeException.ThrowIfNegative(idade);

    // daqui pra baixo, nome e idade sao confiaveis
}`,
        caption: 'Os helpers do .NET fazem a verificação e lançam a exceção certa em uma linha.',
      },
      {
        kind: 'table',
        headers: ['Helper', 'Rejeita'],
        rows: [
          ['`ArgumentNullException.ThrowIfNull(x)`', '`null`'],
          ['`ArgumentException.ThrowIfNullOrEmpty(s)`', '`null` e `""`'],
          ['`ArgumentException.ThrowIfNullOrWhiteSpace(s)`', '`null`, `""` e só espaços'],
          ['`ArgumentOutOfRangeException.ThrowIfNegative(n)`', 'negativos'],
          ['`ArgumentOutOfRangeException.ThrowIfZero(n)`', 'zero'],
          ['`ArgumentOutOfRangeException.ThrowIfGreaterThan(n, max)`', 'acima do limite'],
        ],
      },
      {
        kind: 'output',
        code: `string nome = null;
ArgumentNullException.ThrowIfNull(nome);

-> ArgumentNullException: Value cannot be null. (Parameter 'nome')`,
        caption: 'O nome do parâmetro entra sozinho na mensagem: o compilador captura a expressão que você passou.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Esse nome automático funciona porque o helper usa `CallerArgumentExpression`. Como ele captura a **expressão escrita**, passar `ThrowIfNegative(-5)` produz a mensagem esquisita "Parameter \'-5\'" — passe sempre a variável.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Valide apenas o que é **contrato público**. Um método privado chamado só de dentro da própria classe, com valores já validados, não precisa revalidar tudo — isso vira ruído sem ganho.',
      },
    ],
    quiz: [
      {
        id: 's06c02l02q1',
        type: 'single',
        prompt: 'Por que validar argumentos no início do método?',
        options: [
          { id: 'a', text: 'Para falhar cedo com mensagem clara, em vez de no meio com erro obscuro.', correct: true },
          { id: 'b', text: 'Porque o compilador exige.' },
          { id: 'c', text: 'Para melhorar o desempenho.' },
          { id: 'd', text: 'Para evitar o uso de `try`.' },
        ],
        explanation:
          'Um erro detectado na porta aponta para quem chamou errado. Um erro detectado no meio pode ter deixado o objeto pela metade.',
      },
      {
        id: 's06c02l02q2',
        type: 'single',
        prompt: 'Como o nome do parâmetro entra automaticamente na mensagem?',
        options: [
          { id: 'a', text: 'O helper captura a expressão escrita com `CallerArgumentExpression`.', correct: true },
          { id: 'b', text: 'Por reflexão em tempo de execução.' },
          { id: 'c', text: 'Ele não entra: é preciso passar à mão.' },
          { id: 'd', text: 'O compilador reescreve a mensagem.' },
        ],
        explanation:
          'O texto exato da expressão vira uma string em tempo de compilação. Por isso passar um literal produz uma mensagem estranha.',
      },
      {
        id: 's06c02l02q3',
        type: 'single',
        prompt: 'Qual helper rejeita uma string composta apenas de espaços?',
        options: [
          { id: 'a', code: 'ArgumentException.ThrowIfNullOrWhiteSpace', correct: true },
          { id: 'b', code: 'ArgumentException.ThrowIfNullOrEmpty' },
          { id: 'c', code: 'ArgumentNullException.ThrowIfNull' },
          { id: 'd', code: 'ArgumentOutOfRangeException.ThrowIfZero' },
        ],
        explanation:
          '`ThrowIfNullOrEmpty` aceita `"   "` porque a string tem conteúdo. Só a versão `WhiteSpace` considera espaços como vazio.',
      },
    ],
    challenge: {
      brief:
        'Escreva um cadastro que valida cada argumento na entrada usando os helpers do .NET, e mostre qual validação pegou cada caso.',
      requirements: [
        '`Usuario` recebe `nome`, `email`, `idade` e `limite` (`decimal`) no construtor',
        '`nome` não pode ser nulo, vazio ou só espaços',
        '`email` não pode ser nulo, e deve conter `@`, lançando `ArgumentException` com a mensagem `email invalido` caso contrário',
        '`idade` não pode ser negativa nem maior que `120`',
        '`limite` não pode ser negativo',
        'Todas as validações usam os helpers `ThrowIf*` quando existir um adequado',
        '`ToString()` devolve `nome <email>, N anos, limite X.XX`',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main` nem o método `Tentar`',
      ],
      starterCode: `using System;

// Declare a classe Usuario aqui

class Program
{
    static void Tentar(string rotulo, Func<Usuario> criar)
    {
        try
        {
            Console.WriteLine($"{rotulo}: {criar()}");
        }
        catch (Exception e)
        {
            Console.WriteLine($"{rotulo}: {e.GetType().Name}");
        }
    }

    static void Main()
    {
        string nome = Console.ReadLine();
        string email = Console.ReadLine();
        int idade = int.Parse(Console.ReadLine());

        Tentar("valido", () => new Usuario(nome, email, idade, 100));
        Tentar("nome vazio", () => new Usuario("   ", email, idade, 100));
        Tentar("nome nulo", () => new Usuario(null, email, idade, 100));
        Tentar("email sem arroba", () => new Usuario(nome, "semarroba", idade, 100));
        Tentar("email nulo", () => new Usuario(nome, null, idade, 100));
        Tentar("idade negativa", () => new Usuario(nome, email, -1, 100));
        Tentar("idade absurda", () => new Usuario(nome, email, 200, 100));
        Tentar("limite negativo", () => new Usuario(nome, email, idade, -50));
    }
}
`,
      solution: `using System;

class Usuario
{
    public string Nome { get; }
    public string Email { get; }
    public int Idade { get; }
    public decimal Limite { get; }

    public Usuario(string nome, string email, int idade, decimal limite)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(nome);
        ArgumentNullException.ThrowIfNull(email);

        if (!email.Contains('@'))
        {
            throw new ArgumentException("email invalido", nameof(email));
        }

        ArgumentOutOfRangeException.ThrowIfNegative(idade);
        ArgumentOutOfRangeException.ThrowIfGreaterThan(idade, 120);
        ArgumentOutOfRangeException.ThrowIfNegative(limite);

        Nome = nome;
        Email = email;
        Idade = idade;
        Limite = limite;
    }

    public override string ToString()
    {
        return $"{Nome} <{Email}>, {Idade} anos, limite {Limite:F2}";
    }
}

class Program
{
    static void Tentar(string rotulo, Func<Usuario> criar)
    {
        try
        {
            Console.WriteLine($"{rotulo}: {criar()}");
        }
        catch (Exception e)
        {
            Console.WriteLine($"{rotulo}: {e.GetType().Name}");
        }
    }

    static void Main()
    {
        string nome = Console.ReadLine();
        string email = Console.ReadLine();
        int idade = int.Parse(Console.ReadLine());

        Tentar("valido", () => new Usuario(nome, email, idade, 100));
        Tentar("nome vazio", () => new Usuario("   ", email, idade, 100));
        Tentar("nome nulo", () => new Usuario(null, email, idade, 100));
        Tentar("email sem arroba", () => new Usuario(nome, "semarroba", idade, 100));
        Tentar("email nulo", () => new Usuario(nome, null, idade, 100));
        Tentar("idade negativa", () => new Usuario(nome, email, -1, 100));
        Tentar("idade absurda", () => new Usuario(nome, email, 200, 100));
        Tentar("limite negativo", () => new Usuario(nome, email, idade, -50));
    }
}
`,
      hints: [
        'A verificação do `@` não tem helper pronto: use um `if` e lance `ArgumentException` com `nameof(email)`.',
        'A ordem das validações define qual exceção aparece primeiro quando há mais de um problema.',
      ],
      tests: [
        {
          name: 'Usuario valido',
          stdin: 'Ana\nana@teste.com\n30\n',
          expectedStdout:
            'valido: Ana <ana@teste.com>, 30 anos, limite 100.00\n' +
            'nome vazio: ArgumentException\nnome nulo: ArgumentNullException\n' +
            'email sem arroba: ArgumentException\nemail nulo: ArgumentNullException\n' +
            'idade negativa: ArgumentOutOfRangeException\nidade absurda: ArgumentOutOfRangeException\n' +
            'limite negativo: ArgumentOutOfRangeException',
        },
        {
          name: 'Outro usuario',
          stdin: 'Bruno\nbruno@x.org\n0\n',
          expectedStdout:
            'valido: Bruno <bruno@x.org>, 0 anos, limite 100.00\n' +
            'nome vazio: ArgumentException\nnome nulo: ArgumentNullException\n' +
            'email sem arroba: ArgumentException\nemail nulo: ArgumentNullException\n' +
            'idade negativa: ArgumentOutOfRangeException\nidade absurda: ArgumentOutOfRangeException\n' +
            'limite negativo: ArgumentOutOfRangeException',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c02l03',
    title: 'Guard clauses',
    objective: 'Tratar os casos excepcionais logo no início e deixar o caminho principal sem aninhamento.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma **guard clause** é uma verificação no início do método que sai imediatamente. Em vez de envolver o caminho feliz em `if` aninhados, você elimina os casos ruins um a um.',
      },
      {
        kind: 'compare',
        good: `if (pedido == null) return "sem pedido";
if (pedido.Itens.Count == 0) return "vazio";
if (!pedido.Pago) return "nao pago";

// caminho principal, sem recuo
return Despachar(pedido);`,
        bad: `if (pedido != null)
{
    if (pedido.Itens.Count > 0)
    {
        if (pedido.Pago)
        {
            return Despachar(pedido);
        }
        else { return "nao pago"; }
    }
    else { return "vazio"; }
}
else { return "sem pedido"; }`,
        goodLabel: 'Guard clauses',
        badLabel: 'Aninhamento em escada',
      },
      {
        kind: 'text',
        body:
          'Os dois trechos fazem a mesma coisa. A diferença é que no primeiro o caminho principal fica no nível zero de recuo, e cada condição de saída fica visível na primeira linha em que aparece.',
      },
      {
        kind: 'table',
        headers: ['Aspecto', 'Aninhado', 'Com guards'],
        rows: [
          ['recuo do caminho principal', 'profundo', '**nenhum**'],
          ['distância entre `if` e `else`', 'grande', 'nenhuma'],
          ['ordem de leitura', 'do fim para o começo', 'de cima para baixo'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A regra prática: se você precisa rolar a tela para achar o `else` correspondente a um `if`, o método está pedindo guard clauses.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Guard clauses funcionam bem quando cada uma trata um caso **independente**. Se as condições dependem umas das outras em cadeia, transformá-las em guards pode esconder a relação entre elas.',
      },
    ],
    quiz: [
      {
        id: 's06c02l03q1',
        type: 'single',
        prompt: 'O que é uma guard clause?',
        options: [
          { id: 'a', text: 'Uma verificação no início que sai imediatamente no caso ruim.', correct: true },
          { id: 'b', text: 'Um bloco `try` no início do método.' },
          { id: 'c', text: 'Uma validação feita pelo compilador.' },
          { id: 'd', text: 'Um `else` no fim do método.' },
        ],
        explanation:
          'Ela elimina um caso e sai, deixando o resto do método livre daquela preocupação.',
      },
      {
        id: 's06c02l03q2',
        type: 'single',
        prompt: 'Qual é o principal ganho de usar guard clauses?',
        options: [
          { id: 'a', text: 'O caminho principal fica sem recuo e fácil de seguir.', correct: true },
          { id: 'b', text: 'O método fica mais rápido.' },
          { id: 'c', text: 'Elimina a necessidade de exceções.' },
          { id: 'd', text: 'Reduz o número de linhas pela metade.' },
        ],
        explanation:
          'Não é sobre tamanho, é sobre profundidade. Cada nível de aninhamento é um contexto a mais que o leitor precisa manter na cabeça.',
      },
      {
        id: 's06c02l03q3',
        type: 'single',
        prompt: 'Qual é o sinal de que um método está pedindo guard clauses?',
        options: [
          { id: 'a', text: 'Você precisa rolar a tela para achar o `else` de um `if`.', correct: true },
          { id: 'b', text: 'O método tem mais de dez linhas.' },
          { id: 'c', text: 'O método devolve `void`.' },
          { id: 'd', text: 'O método tem mais de dois parâmetros.' },
        ],
        explanation:
          'A distância entre a condição e o seu tratamento é o que torna o código difícil de acompanhar.',
      },
    ],
    challenge: {
      brief:
        'Reescreva uma validação profundamente aninhada usando guard clauses, mantendo exatamente o mesmo comportamento.',
      requirements: [
        '`Avaliar(string usuario, int idade, decimal saldo, bool ativo)` devolve a descrição da situação',
        'Usuário nulo ou em branco devolve `sem usuario`',
        'Idade menor que `18` devolve `menor de idade`',
        'Conta inativa devolve `conta inativa`',
        'Saldo negativo devolve `saldo negativo`',
        'Saldo abaixo de `100` devolve `saldo baixo`',
        'Passando por tudo, devolve `aprovado: usuario`',
        'O método usa guard clauses, sem nenhum `else`',
        'A ordem das verificações é exatamente a listada acima',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva Avaliar aqui, com guard clauses e sem nenhum else

    static void Main()
    {
        string usuario = Console.ReadLine();
        int idade = int.Parse(Console.ReadLine());
        decimal saldo = decimal.Parse(Console.ReadLine());

        Console.WriteLine(Avaliar(usuario, idade, saldo, true));
        Console.WriteLine(Avaliar(null, idade, saldo, true));
        Console.WriteLine(Avaliar("  ", idade, saldo, true));
        Console.WriteLine(Avaliar(usuario, 15, saldo, true));
        Console.WriteLine(Avaliar(usuario, idade, saldo, false));
        Console.WriteLine(Avaliar(usuario, idade, -10, true));
        Console.WriteLine(Avaliar(usuario, idade, 50, true));
        Console.WriteLine(Avaliar(usuario, 17, -1, false));
    }
}
`,
      solution: `using System;

class Program
{
    static string Avaliar(string usuario, int idade, decimal saldo, bool ativo)
    {
        if (string.IsNullOrWhiteSpace(usuario))
        {
            return "sem usuario";
        }

        if (idade < 18)
        {
            return "menor de idade";
        }

        if (!ativo)
        {
            return "conta inativa";
        }

        if (saldo < 0)
        {
            return "saldo negativo";
        }

        if (saldo < 100)
        {
            return "saldo baixo";
        }

        return $"aprovado: {usuario}";
    }

    static void Main()
    {
        string usuario = Console.ReadLine();
        int idade = int.Parse(Console.ReadLine());
        decimal saldo = decimal.Parse(Console.ReadLine());

        Console.WriteLine(Avaliar(usuario, idade, saldo, true));
        Console.WriteLine(Avaliar(null, idade, saldo, true));
        Console.WriteLine(Avaliar("  ", idade, saldo, true));
        Console.WriteLine(Avaliar(usuario, 15, saldo, true));
        Console.WriteLine(Avaliar(usuario, idade, saldo, false));
        Console.WriteLine(Avaliar(usuario, idade, -10, true));
        Console.WriteLine(Avaliar(usuario, idade, 50, true));
        Console.WriteLine(Avaliar(usuario, 17, -1, false));
    }
}
`,
      hints: [
        '`string.IsNullOrWhiteSpace` resolve as duas primeiras condições de uma vez.',
        'A última chamada tem três problemas ao mesmo tempo — a primeira guard que casar é a que responde.',
      ],
      tests: [
        {
          name: 'Usuario aprovado',
          stdin: 'ana\n30\n500\n',
          expectedStdout:
            'aprovado: ana\nsem usuario\nsem usuario\nmenor de idade\nconta inativa\n' +
            'saldo negativo\nsaldo baixo\nmenor de idade',
        },
        {
          name: 'Saldo no limite',
          stdin: 'bruno\n18\n100\n',
          expectedStdout:
            'aprovado: bruno\nsem usuario\nsem usuario\nmenor de idade\nconta inativa\n' +
            'saldo negativo\nsaldo baixo\nmenor de idade',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c02l04',
    title: 'O padrão TryParse',
    objective: 'Usar a alternativa sem exceção para conversões que falham com frequência.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando a falha é **esperada** — como converter texto digitado por um usuário —, lançar exceção é caro e exagerado. O padrão `TryParse` devolve um `bool` e entrega o valor por `out`.',
      },
      {
        kind: 'compare',
        good: `if (int.TryParse(texto, out int n))
{
    Console.WriteLine(n * 2);
}
else
{
    Console.WriteLine("invalido");
}`,
        bad: `try
{
    int n = int.Parse(texto);
    Console.WriteLine(n * 2);
}
catch (FormatException)
{
    Console.WriteLine("invalido");
}`,
        goodLabel: 'TryParse: falha esperada',
        badLabel: 'Parse + catch: exceção como fluxo',
      },
      {
        kind: 'output',
        code: `int.TryParse("42", out int a)    ->  True,  a = 42
int.TryParse("abc", out int b)   ->  False, b = 0`,
        caption: 'Na falha o `out` recebe o valor padrão do tipo, e nenhuma exceção é lançada.',
      },
      {
        kind: 'text',
        body:
          'O `out` da Seção 4 aparece aqui no seu uso mais famoso. A declaração pode ser feita na própria chamada — `out int n` — e a variável fica disponível depois do `if`.',
      },
      {
        kind: 'table',
        headers: ['Use', 'Quando'],
        rows: [
          ['`Parse`', 'a falha é um bug: o dado já deveria estar válido'],
          ['`TryParse`', 'a falha é rotina: entrada de usuário, arquivo externo'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Não ignore o `bool` devolvido. `int.TryParse(texto, out int n);` sem verificar compila, e `n` fica valendo `0` — que é indistinguível de um zero digitado de verdade.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O padrão aparece em toda a biblioteca: `int.TryParse`, `DateTime.TryParse`, `Dictionary.TryGetValue`, `Queue.TryDequeue`. Reconhecer o formato "devolve `bool`, entrega por `out`" é reconhecer a intenção.',
      },
    ],
    quiz: [
      {
        id: 's06c02l04q1',
        type: 'single',
        prompt: 'O que `TryParse` devolve e como entrega o valor?',
        options: [
          { id: 'a', text: 'Devolve `bool` e entrega o valor por `out`.', correct: true },
          { id: 'b', text: 'Devolve o valor ou `null`.' },
          { id: 'c', text: 'Devolve o valor e lança exceção na falha.' },
          { id: 'd', text: 'Devolve uma tupla.' },
        ],
        explanation:
          'É o formato padrão do .NET para operações que podem falhar de forma esperada.',
      },
      {
        id: 's06c02l04q2',
        type: 'single',
        prompt: 'O que acontece com a variável `out` quando o `TryParse` falha?',
        options: [
          { id: 'a', text: 'Recebe o valor padrão do tipo, como `0`.', correct: true },
          { id: 'b', text: 'Fica sem valor atribuído.' },
          { id: 'c', text: 'Recebe `null`.' },
          { id: 'd', text: 'Mantém o valor anterior.' },
        ],
        explanation:
          'É justamente por isso que ignorar o `bool` é perigoso: o zero de falha é idêntico ao zero legítimo.',
      },
      {
        id: 's06c02l04q3',
        type: 'single',
        prompt: 'Quando preferir `Parse` a `TryParse`?',
        options: [
          { id: 'a', text: 'Quando a falha indicaria um bug, porque o dado já deveria estar válido.', correct: true },
          { id: 'b', text: 'Quando o desempenho importa.' },
          { id: 'c', text: 'Sempre: `Parse` é mais simples.' },
          { id: 'd', text: 'Quando o valor vem do usuário.' },
        ],
        explanation:
          'Se o dado já passou por validação, uma falha é excepcional de verdade — e a exceção é o sinal correto.',
      },
    ],
    challenge: {
      brief:
        'Processe uma lista de entradas mistas classificando cada uma, usando apenas `TryParse` e sem nenhum bloco `try`.',
      requirements: [
        '`Classificar(string entrada)` devolve a categoria da entrada',
        'Inteiro devolve `inteiro: N`',
        'Decimal devolve `decimal: X.XX` com duas casas',
        '`true` ou `false` devolve `booleano: True` ou `booleano: False`',
        'Qualquer outra coisa devolve `texto: entrada`',
        'A ordem de tentativa é inteiro, depois decimal, depois booleano',
        'O programa não pode conter nenhum `try` nem `catch`',
        'O `Main` também soma todos os inteiros encontrados',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static int somaInteiros = 0;

    // Escreva Classificar aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            string entrada = Console.ReadLine();
            Console.WriteLine(Classificar(entrada));
        }

        Console.WriteLine($"soma dos inteiros: {somaInteiros}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static int somaInteiros = 0;

    static string Classificar(string entrada)
    {
        if (int.TryParse(entrada, out int inteiro))
        {
            somaInteiros += inteiro;
            return $"inteiro: {inteiro}";
        }

        if (decimal.TryParse(entrada, out decimal numero))
        {
            return $"decimal: {numero:F2}";
        }

        if (bool.TryParse(entrada, out bool logico))
        {
            return $"booleano: {logico}";
        }

        return $"texto: {entrada}";
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            string entrada = Console.ReadLine();
            Console.WriteLine(Classificar(entrada));
        }

        Console.WriteLine($"soma dos inteiros: {somaInteiros}");
    }
}
`,
      hints: [
        'Cada tentativa é um `if` com `TryParse`; se ela casar, o método já devolve e as seguintes nem rodam.',
        'A ordem importa: `10` também converteria como decimal, então o teste de inteiro precisa vir primeiro.',
      ],
      tests: [
        {
          name: 'Entradas mistas',
          stdin: '6\n10\n3.5\ntrue\nabc\n-7\nfalse\n',
          expectedStdout:
            'inteiro: 10\ndecimal: 3.50\nbooleano: True\ntexto: abc\ninteiro: -7\nbooleano: False\n' +
            'soma dos inteiros: 3',
        },
        {
          name: 'So textos',
          stdin: '3\nana\nbruno\ncarla\n',
          expectedStdout:
            'texto: ana\ntexto: bruno\ntexto: carla\nsoma dos inteiros: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c02l05',
    title: 'Escrevendo seus Try-métodos',
    objective: 'Aplicar o padrão `TryParse` ao seu próprio código, oferecendo uma versão que não lança.',
    concept: [
      {
        kind: 'text',
        body:
          'O padrão não é exclusivo do .NET. Quando o seu método pode falhar de forma rotineira, ofereça uma versão `Try` — e, quando fizer sentido, mantenha as duas.',
      },
      {
        kind: 'code',
        code: `static bool TryDividir(int a, int b, out int resultado)
{
    if (b == 0)
    {
        resultado = 0;         // sempre atribua antes de sair
        return false;
    }

    resultado = a / b;
    return true;
}`,
        caption: 'O compilador exige que todo caminho de saída atribua o parâmetro `out`.',
      },
      {
        kind: 'text',
        body:
          'A dupla clássica oferece as duas versões, com a que lança implementada em cima da que não lança:',
      },
      {
        kind: 'code',
        code: `static int Dividir(int a, int b)
{
    if (!TryDividir(a, b, out int resultado))
        throw new DivideByZeroException();

    return resultado;
}`,
        caption: 'A lógica mora em um lugar só; a diferença é apenas o que fazer na falha.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A convenção de nome importa: começar com `Try` e devolver `bool` sinaliza imediatamente que aquele método **não lança** e que o retorno precisa ser verificado.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um método `Try` que lança exceção quebra o contrato que o nome promete. Se ele pode falhar de formas que o `bool` não cobre, ou o nome está errado, ou a falha extra deveria virar mais um `false`.',
      },
      {
        kind: 'text',
        body:
          'Uma variação moderna devolve a tupla `(bool ok, T valor)` da Seção 4, dispensando o `out`. Ela é mais confortável de escrever, mas o padrão com `out` é o que você vai encontrar na biblioteca padrão.',
      },
    ],
    quiz: [
      {
        id: 's06c02l05q1',
        type: 'single',
        prompt: 'O que o compilador exige de um método com parâmetro `out`?',
        options: [
          { id: 'a', text: 'Que todo caminho de saída atribua o parâmetro.', correct: true },
          { id: 'b', text: 'Que ele devolva `bool`.' },
          { id: 'c', text: 'Que o nome comece com `Try`.' },
          { id: 'd', text: 'Que ele não lance exceções.' },
        ],
        explanation:
          'Quem chama recebe a garantia de que a variável foi preenchida, mesmo no caminho de falha.',
      },
      {
        id: 's06c02l05q2',
        type: 'single',
        prompt: 'O que o prefixo `Try` comunica?',
        options: [
          { id: 'a', text: 'Que o método não lança e o retorno precisa ser verificado.', correct: true },
          { id: 'b', text: 'Que o método usa `try`/`catch` internamente.' },
          { id: 'c', text: 'Que o método é experimental.' },
          { id: 'd', text: 'Que o método é mais lento.' },
        ],
        explanation:
          'É uma convenção forte no .NET. Quebrá-la — lançando de dentro de um `Try` — engana quem lê.',
      },
      {
        id: 's06c02l05q3',
        type: 'single',
        prompt: 'Como implementar a dupla "lança" e "não lança" sem duplicar lógica?',
        options: [
          { id: 'a', text: 'A versão que lança chama a versão `Try` e lança se ela devolver `false`.', correct: true },
          { id: 'b', text: 'A versão `Try` captura a exceção da outra.' },
          { id: 'c', text: 'Copiando o corpo nas duas.' },
          { id: 'd', text: 'Não é possível evitar a duplicação.' },
        ],
        explanation:
          'Construir a que lança sobre a que não lança evita o custo de exceção no caminho comum. O inverso pagaria esse custo sempre.',
      },
    ],
    challenge: {
      brief:
        'Ofereça as duas versões de um analisador de data simples: uma que devolve `bool` e outra que lança, sem duplicar a lógica.',
      requirements: [
        '`TryAnalisar(string texto, out int dia, out int mes)` interpreta o formato `dia/mes`',
        'Devolve `false` quando o texto é nulo, não tem exatamente uma barra, ou as partes não são números',
        'Devolve `false` quando o mês não está entre `1` e `12`, ou o dia não está entre `1` e `31`',
        'Em qualquer falha, os dois `out` recebem `0`',
        '`Analisar(string texto)` devolve `dia/mes` formatado com dois dígitos cada, e lança `FormatException` com a mensagem `data invalida: texto` quando o `Try` falha',
        '`Analisar` chama `TryAnalisar` — a lógica não pode estar duplicada',
        'O `TryAnalisar` não pode conter `try`, `catch` nem `throw`',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva TryAnalisar e Analisar aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            string entrada = Console.ReadLine();

            if (TryAnalisar(entrada, out int dia, out int mes))
            {
                Console.WriteLine($"{entrada} -> dia {dia}, mes {mes}");
            }
            else
            {
                Console.WriteLine($"{entrada} -> invalida (dia={dia}, mes={mes})");
            }
        }

        Console.WriteLine($"formatada: {Analisar("7/3")}");

        try
        {
            Analisar("32/1");
        }
        catch (FormatException e)
        {
            Console.WriteLine($"lancou: {e.Message}");
        }
    }
}
`,
      solution: `using System;

class Program
{
    static bool TryAnalisar(string texto, out int dia, out int mes)
    {
        dia = 0;
        mes = 0;

        if (texto == null)
        {
            return false;
        }

        string[] partes = texto.Split('/');

        if (partes.Length != 2)
        {
            return false;
        }

        if (!int.TryParse(partes[0], out int d))
        {
            return false;
        }

        if (!int.TryParse(partes[1], out int m))
        {
            return false;
        }

        if (m < 1 || m > 12)
        {
            return false;
        }

        if (d < 1 || d > 31)
        {
            return false;
        }

        dia = d;
        mes = m;
        return true;
    }

    static string Analisar(string texto)
    {
        if (!TryAnalisar(texto, out int dia, out int mes))
        {
            throw new FormatException($"data invalida: {texto}");
        }

        return $"{dia:D2}/{mes:D2}";
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            string entrada = Console.ReadLine();

            if (TryAnalisar(entrada, out int dia, out int mes))
            {
                Console.WriteLine($"{entrada} -> dia {dia}, mes {mes}");
            }
            else
            {
                Console.WriteLine($"{entrada} -> invalida (dia={dia}, mes={mes})");
            }
        }

        Console.WriteLine($"formatada: {Analisar("7/3")}");

        try
        {
            Analisar("32/1");
        }
        catch (FormatException e)
        {
            Console.WriteLine($"lancou: {e.Message}");
        }
    }
}
`,
      hints: [
        'Atribua `dia = 0` e `mes = 0` na primeira linha: assim todo `return false` já sai com os `out` preenchidos.',
        'Só atribua os valores reais no fim, depois que todas as verificações passarem.',
      ],
      tests: [
        {
          name: 'Datas variadas',
          stdin: '5\n15/8\n32/1\n1/13\nabc\n10/10/10\n',
          expectedStdout:
            '15/8 -> dia 15, mes 8\n32/1 -> invalida (dia=0, mes=0)\n1/13 -> invalida (dia=0, mes=0)\n' +
            'abc -> invalida (dia=0, mes=0)\n10/10/10 -> invalida (dia=0, mes=0)\n' +
            'formatada: 07/03\nlancou: data invalida: 32/1',
        },
        {
          name: 'Datas nos limites',
          stdin: '3\n1/1\n31/12\n0/5\n',
          expectedStdout:
            '1/1 -> dia 1, mes 1\n31/12 -> dia 31, mes 12\n0/5 -> invalida (dia=0, mes=0)\n' +
            'formatada: 07/03\nlancou: data invalida: 32/1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c02l06',
    title: 'O padrão Result',
    objective: 'Devolver sucesso ou falha como um valor, tornando o erro parte explícita da assinatura.',
    concept: [
      {
        kind: 'text',
        body:
          'O `TryParse` resolve o caso simples, mas não carrega **o motivo** da falha. O padrão `Result` embrulha as duas possibilidades em um único tipo que diz o que aconteceu.',
      },
      {
        kind: 'code',
        code: `class Resultado<T>
{
    public bool Ok { get; }
    public T Valor { get; }
    public string Erro { get; }

    private Resultado(bool ok, T valor, string erro)
    {
        Ok = ok; Valor = valor; Erro = erro;
    }

    public static Resultado<T> Sucesso(T valor) => new(true, valor, null);
    public static Resultado<T> Falha(string erro) => new(false, default, erro);
}`,
        caption: 'Construtor privado mais dois métodos de fábrica: só existem dois jeitos de criar um resultado.',
      },
      {
        kind: 'table',
        headers: ['Estratégia', 'Carrega motivo?', 'Aparece na assinatura?'],
        rows: [
          ['exceção', 'sim', '**não**'],
          ['`bool` + `out`', 'não', 'sim'],
          ['`Result`', '**sim**', '**sim**'],
        ],
      },
      {
        kind: 'text',
        body:
          'A vantagem sobre a exceção é que a falha fica **visível na assinatura**. Um método que devolve `Resultado<int>` avisa que pode falhar; um que devolve `int` e lança não avisa nada.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Os métodos de fábrica `Sucesso` e `Falha` são estáticos porque criam a instância. Com o construtor privado, é impossível criar um resultado incoerente — como um sucesso que carrega mensagem de erro.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O padrão só ajuda se quem chama **verificar o `Ok` antes de ler o `Valor`**. Ler o valor de um resultado falho devolve o padrão do tipo, e o erro volta a ser silencioso — o mesmo problema do `TryParse` ignorado.',
      },
      {
        kind: 'text',
        body:
          'Não existe uma escolha única correta. Exceção para o excepcional, `Try` para falha rotineira e simples, `Result` quando o motivo da falha importa para quem chamou.',
      },
    ],
    quiz: [
      {
        id: 's06c02l06q1',
        type: 'single',
        prompt: 'Qual é a vantagem do `Result` sobre a exceção?',
        options: [
          { id: 'a', text: 'A possibilidade de falha fica visível na assinatura do método.', correct: true },
          { id: 'b', text: 'Ele não pode ser ignorado.' },
          { id: 'c', text: 'Ele preserva o stack trace.' },
          { id: 'd', text: 'Ele encerra o programa na falha.' },
        ],
        explanation:
          'Um método que lança parece igual a um que não lança. Um que devolve `Resultado<T>` declara o risco no tipo.',
      },
      {
        id: 's06c02l06q2',
        type: 'single',
        prompt: 'Por que o construtor de `Resultado<T>` é privado?',
        options: [
          { id: 'a', text: 'Para impedir a criação de um resultado incoerente.', correct: true },
          { id: 'b', text: 'Porque genéricos exigem isso.' },
          { id: 'c', text: 'Para economizar memória.' },
          { id: 'd', text: 'Para permitir herança.' },
        ],
        explanation:
          'Com apenas `Sucesso` e `Falha` disponíveis, não existe como produzir um objeto com `Ok = true` e uma mensagem de erro preenchida.',
      },
      {
        id: 's06c02l06q3',
        type: 'single',
        prompt: 'Qual é a fraqueza do padrão `Result`?',
        options: [
          { id: 'a', text: 'Ele depende de quem chama verificar o `Ok` antes de ler o valor.', correct: true },
          { id: 'b', text: 'Ele é mais lento que exceções.' },
          { id: 'c', text: 'Ele não funciona com genéricos.' },
          { id: 'd', text: 'Ele não carrega o motivo da falha.' },
        ],
        explanation:
          'Como o `TryParse`, ele pode ser ignorado. A diferença com a exceção é exatamente essa: uma exige atenção, o outro pede.',
      },
    ],
    challenge: {
      brief:
        'Implemente o padrão `Result` genérico e use-o em operações que precisam explicar por que falharam.',
      requirements: [
        '`Resultado<T>` tem `Ok` (`bool`), `Valor` (`T`) e `Erro` (`string`), todos somente de leitura',
        'O construtor é privado; a criação acontece por `Resultado<T>.Sucesso(valor)` e `Resultado<T>.Falha(erro)`',
        '`ToString()` devolve `ok: valor` ou `falha: erro`',
        '`Dividir(int a, int b)` devolve falha `divisao por zero` quando `b` é zero',
        '`RaizInteira(int n)` devolve falha `numero negativo` para negativos, e falha `nao e quadrado perfeito` quando a raiz não é exata',
        '`Etapas(int a, int b)` encadeia: divide, e se der certo aplica a raiz do resultado, propagando a primeira falha',
        'Nenhuma exceção é usada para sinalizar essas falhas',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare Resultado<T> aqui

class Program
{
    // Escreva Dividir, RaizInteira e Etapas aqui

    static void Main()
    {
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());

        Console.WriteLine($"dividir: {Dividir(a, b)}");
        Console.WriteLine($"dividir por zero: {Dividir(a, 0)}");
        Console.WriteLine($"raiz de 16: {RaizInteira(16)}");
        Console.WriteLine($"raiz de 15: {RaizInteira(15)}");
        Console.WriteLine($"raiz de -4: {RaizInteira(-4)}");
        Console.WriteLine($"etapas: {Etapas(a, b)}");
        Console.WriteLine($"etapas com zero: {Etapas(a, 0)}");

        Resultado<int> r = Dividir(a, b);

        if (r.Ok)
        {
            Console.WriteLine($"valor lido com seguranca: {r.Valor}");
        }
        else
        {
            Console.WriteLine($"motivo: {r.Erro}");
        }
    }
}
`,
      solution: `using System;

class Resultado<T>
{
    public bool Ok { get; }
    public T Valor { get; }
    public string Erro { get; }

    private Resultado(bool ok, T valor, string erro)
    {
        Ok = ok;
        Valor = valor;
        Erro = erro;
    }

    public static Resultado<T> Sucesso(T valor)
    {
        return new Resultado<T>(true, valor, null);
    }

    public static Resultado<T> Falha(string erro)
    {
        return new Resultado<T>(false, default, erro);
    }

    public override string ToString()
    {
        return Ok ? $"ok: {Valor}" : $"falha: {Erro}";
    }
}

class Program
{
    static Resultado<int> Dividir(int a, int b)
    {
        if (b == 0)
        {
            return Resultado<int>.Falha("divisao por zero");
        }

        return Resultado<int>.Sucesso(a / b);
    }

    static Resultado<int> RaizInteira(int n)
    {
        if (n < 0)
        {
            return Resultado<int>.Falha("numero negativo");
        }

        int raiz = (int)Math.Sqrt(n);

        if (raiz * raiz != n)
        {
            return Resultado<int>.Falha("nao e quadrado perfeito");
        }

        return Resultado<int>.Sucesso(raiz);
    }

    static Resultado<int> Etapas(int a, int b)
    {
        Resultado<int> divisao = Dividir(a, b);

        if (!divisao.Ok)
        {
            return divisao;
        }

        return RaizInteira(divisao.Valor);
    }

    static void Main()
    {
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());

        Console.WriteLine($"dividir: {Dividir(a, b)}");
        Console.WriteLine($"dividir por zero: {Dividir(a, 0)}");
        Console.WriteLine($"raiz de 16: {RaizInteira(16)}");
        Console.WriteLine($"raiz de 15: {RaizInteira(15)}");
        Console.WriteLine($"raiz de -4: {RaizInteira(-4)}");
        Console.WriteLine($"etapas: {Etapas(a, b)}");
        Console.WriteLine($"etapas com zero: {Etapas(a, 0)}");

        Resultado<int> r = Dividir(a, b);

        if (r.Ok)
        {
            Console.WriteLine($"valor lido com seguranca: {r.Valor}");
        }
        else
        {
            Console.WriteLine($"motivo: {r.Erro}");
        }
    }
}
`,
      hints: [
        'O `default` dentro de `Falha` devolve o valor padrão do tipo genérico — `0` para `int`, `null` para referências.',
        'O `Etapas` devolve o próprio resultado da divisão quando ela falha: a falha se propaga sem ser reembrulhada.',
      ],
      tests: [
        {
          name: 'Divisao que da quadrado perfeito',
          stdin: '64\n4\n',
          expectedStdout:
            'dividir: ok: 16\ndividir por zero: falha: divisao por zero\n' +
            'raiz de 16: ok: 4\nraiz de 15: falha: nao e quadrado perfeito\n' +
            'raiz de -4: falha: numero negativo\n' +
            'etapas: ok: 4\netapas com zero: falha: divisao por zero\n' +
            'valor lido com seguranca: 16',
        },
        {
          name: 'Divisao que nao da quadrado',
          stdin: '30\n3\n',
          expectedStdout:
            'dividir: ok: 10\ndividir por zero: falha: divisao por zero\n' +
            'raiz de 16: ok: 4\nraiz de 15: falha: nao e quadrado perfeito\n' +
            'raiz de -4: falha: numero negativo\n' +
            'etapas: falha: nao e quadrado perfeito\netapas com zero: falha: divisao por zero\n' +
            'valor lido com seguranca: 10',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c02l07',
    title: 'Tipos nullable',
    objective: 'Representar a ausência de valor de forma explícita, em tipos por valor e por referência.',
    concept: [
      {
        kind: 'text',
        body:
          'Um `int` sempre tem um valor. Mas às vezes "não informado" é diferente de zero — e é para isso que existe o `int?`, o tipo nullable.',
      },
      {
        kind: 'code',
        code: `int? idade = null;              // permitido
int  normal = null;             // nao compila

Console.WriteLine(idade.HasValue);              // False
Console.WriteLine(idade ?? -1);                 // -1
Console.WriteLine(idade.GetValueOrDefault(9));  // 9`,
      },
      {
        kind: 'table',
        headers: ['Membro', 'Devolve'],
        rows: [
          ['`HasValue`', '`true` se tem valor'],
          ['`Value`', 'o valor — **lança** se for nulo'],
          ['`GetValueOrDefault(x)`', 'o valor, ou `x`'],
          ['`?? x`', 'o valor, ou `x`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Ler `.Value` de um nullable vazio lança `InvalidOperationException: Nullable object must have a value.` — não é `NullReferenceException`, como muita gente espera.',
      },
      {
        kind: 'text',
        body:
          'Para tipos por **referência** o `?` significa outra coisa: ele é uma anotação de intenção. `string?` avisa que ali pode haver nulo, e `string` avisa que não deveria — mas nada impede em tempo de execução.',
      },
      {
        kind: 'compare',
        good: `int? naoInformado = null;
// zero e "nao informado"
// sao coisas diferentes`,
        bad: `int naoInformado = 0;
// zero significa
// "zero" ou "vazio"?`,
        goodLabel: 'Ausência explícita',
        badLabel: 'Zero como valor mágico',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Usar `int?` em vez de `-1` ou `0` como "sem valor" elimina uma classe inteira de bugs: nenhum valor legítimo pode ser confundido com a ausência.',
      },
    ],
    quiz: [
      {
        id: 's06c02l07q1',
        type: 'single',
        prompt: 'O que acontece ao ler `.Value` de um `int?` que está nulo?',
        options: [
          { id: 'a', code: 'InvalidOperationException', correct: true },
          { id: 'b', code: 'NullReferenceException' },
          { id: 'c', text: 'Devolve `0`.' },
          { id: 'd', text: 'Devolve `null`.' },
        ],
        explanation:
          'A mensagem é "Nullable object must have a value.". Para evitar, verifique `HasValue` ou use `??`.',
      },
      {
        id: 's06c02l07q2',
        type: 'single',
        prompt: 'Qual a diferença entre `int?` e `string?`?',
        options: [
          { id: 'a', text: '`int?` muda o tipo; `string?` é apenas uma anotação de intenção.', correct: true },
          { id: 'b', text: 'Nenhuma: os dois funcionam igual.' },
          { id: 'c', text: '`string?` não compila.' },
          { id: 'd', text: '`int?` é só anotação.' },
        ],
        explanation:
          'Referências já podiam ser nulas. O `?` nelas serve para o compilador avisar sobre usos suspeitos, não para mudar o comportamento.',
      },
      {
        id: 's06c02l07q3',
        type: 'single',
        prompt: 'Por que preferir `int?` a usar `-1` como "sem valor"?',
        options: [
          { id: 'a', text: 'Porque nenhum valor legítimo pode ser confundido com a ausência.', correct: true },
          { id: 'b', text: 'Porque ocupa menos memória.' },
          { id: 'c', text: 'Porque `-1` não compila.' },
          { id: 'd', text: 'Porque é mais rápido.' },
        ],
        explanation:
          'Um dia alguém vai precisar armazenar `-1` de verdade, e o valor mágico deixa de funcionar silenciosamente.',
      },
    ],
    challenge: {
      brief:
        'Modele um formulário em que campos não preenchidos são realmente ausentes, e não zeros disfarçados.',
      requirements: [
        '`Formulario` recebe `nome` (`string`), `idade` (`int?`) e `renda` (`decimal?`)',
        '`IdadeInformada` e `RendaInformada` dizem se cada campo veio preenchido',
        '`Camposvazios` conta quantos dos três campos estão ausentes ou em branco',
        '`Resumo()` devolve `nome | idade | renda`, usando `nao informado` para cada ausente e duas casas na renda',
        '`IdadeOu(int padrao)` devolve a idade ou o padrão',
        '`Completo` é verdadeiro quando os três campos estão preenchidos',
        'Nenhum valor mágico como `-1` ou `0` representa ausência',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Formulario aqui

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        string idadeTexto = Console.ReadLine();
        string rendaTexto = Console.ReadLine();

        int? idade = int.TryParse(idadeTexto, out int i) ? i : null;
        decimal? renda = decimal.TryParse(rendaTexto, out decimal r) ? r : null;

        Formulario f = new Formulario(nome, idade, renda);

        Console.WriteLine(f.Resumo());
        Console.WriteLine($"idade informada: {f.IdadeInformada}");
        Console.WriteLine($"renda informada: {f.RendaInformada}");
        Console.WriteLine($"vazios: {f.CamposVazios}");
        Console.WriteLine($"completo: {f.Completo}");
        Console.WriteLine($"idade ou 18: {f.IdadeOu(18)}");

        Formulario branco = new Formulario("", null, null);
        Console.WriteLine(branco.Resumo());
        Console.WriteLine($"vazios do branco: {branco.CamposVazios}");
        Console.WriteLine($"idade ou 18: {branco.IdadeOu(18)}");
    }
}
`,
      solution: `using System;

class Formulario
{
    public string Nome { get; }
    public int? Idade { get; }
    public decimal? Renda { get; }

    public Formulario(string nome, int? idade, decimal? renda)
    {
        Nome = nome;
        Idade = idade;
        Renda = renda;
    }

    public bool IdadeInformada => Idade.HasValue;

    public bool RendaInformada => Renda.HasValue;

    public bool Completo => !string.IsNullOrWhiteSpace(Nome) && IdadeInformada && RendaInformada;

    public int CamposVazios
    {
        get
        {
            int vazios = 0;

            if (string.IsNullOrWhiteSpace(Nome)) vazios++;
            if (!IdadeInformada) vazios++;
            if (!RendaInformada) vazios++;

            return vazios;
        }
    }

    public int IdadeOu(int padrao)
    {
        return Idade ?? padrao;
    }

    public string Resumo()
    {
        string textoNome = string.IsNullOrWhiteSpace(Nome) ? "nao informado" : Nome;
        string textoIdade = IdadeInformada ? Idade.Value.ToString() : "nao informado";
        string textoRenda = RendaInformada ? Renda.Value.ToString("F2") : "nao informado";

        return $"{textoNome} | {textoIdade} | {textoRenda}";
    }
}

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        string idadeTexto = Console.ReadLine();
        string rendaTexto = Console.ReadLine();

        int? idade = int.TryParse(idadeTexto, out int i) ? i : null;
        decimal? renda = decimal.TryParse(rendaTexto, out decimal r) ? r : null;

        Formulario f = new Formulario(nome, idade, renda);

        Console.WriteLine(f.Resumo());
        Console.WriteLine($"idade informada: {f.IdadeInformada}");
        Console.WriteLine($"renda informada: {f.RendaInformada}");
        Console.WriteLine($"vazios: {f.CamposVazios}");
        Console.WriteLine($"completo: {f.Completo}");
        Console.WriteLine($"idade ou 18: {f.IdadeOu(18)}");

        Formulario branco = new Formulario("", null, null);
        Console.WriteLine(branco.Resumo());
        Console.WriteLine($"vazios do branco: {branco.CamposVazios}");
        Console.WriteLine($"idade ou 18: {branco.IdadeOu(18)}");
    }
}
`,
      hints: [
        'Só leia `.Value` depois de confirmar `HasValue` — ou use `??`, que já trata a ausência.',
        'O `IdadeOu` cabe em uma linha com o operador `??`.',
      ],
      tests: [
        {
          name: 'Formulario completo',
          stdin: 'Ana\n30\n2500.5\n',
          expectedStdout:
            'Ana | 30 | 2500.50\nidade informada: True\nrenda informada: True\n' +
            'vazios: 0\ncompleto: True\nidade ou 18: 30\n' +
            'nao informado | nao informado | nao informado\nvazios do branco: 3\nidade ou 18: 18',
        },
        {
          name: 'Formulario parcial',
          stdin: 'Bruno\nabc\n1000\n',
          expectedStdout:
            'Bruno | nao informado | 1000.00\nidade informada: False\nrenda informada: True\n' +
            'vazios: 1\ncompleto: False\nidade ou 18: 18\n' +
            'nao informado | nao informado | nao informado\nvazios do branco: 3\nidade ou 18: 18',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c02l08',
    title: 'Operadores ?. e ??',
    objective: 'Encadear acessos e fornecer valores padrão sem escrever uma cascata de verificações de nulo.',
    concept: [
      {
        kind: 'text',
        body:
          'Três operadores tornam o trabalho com nulos muito mais curto. Eles não eliminam o problema, mas eliminam o ruído de verificá-lo a cada passo.',
      },
      {
        kind: 'table',
        headers: ['Operador', 'Nome', 'O que faz'],
        rows: [
          ['`?.`', 'acesso condicional', 'devolve `null` em vez de acessar um nulo'],
          ['`??`', 'coalescência nula', 'devolve o da direita se o da esquerda for nulo'],
          ['`??=`', 'atribuição por coalescência', 'atribui só se estiver nulo'],
        ],
      },
      {
        kind: 'compare',
        good: `int tamanho = texto?.Trim()?.Length ?? 0;`,
        bad: `int tamanho;
if (texto != null)
{
    string limpo = texto.Trim();
    if (limpo != null)
        tamanho = limpo.Length;
    else
        tamanho = 0;
}
else
{
    tamanho = 0;
}`,
        goodLabel: 'Encadeado',
        badLabel: 'Verificação manual',
      },
      {
        kind: 'text',
        body:
          'O detalhe importante do `?.`: se qualquer elo da cadeia for nulo, **toda a expressão vira nulo de imediato** e os elos seguintes nem são avaliados. É curto-circuito, como o `&&`.',
      },
      {
        kind: 'output',
        code: `string txt = null;

txt?.Trim()?.Length          ->  null   (nao chamou Trim)
txt?.Trim()?.Length ?? -1    ->  -1`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um `?.` sobre um tipo por valor muda o tipo do resultado para nullable: `lista?.Count` é `int?`, não `int`. Por isso a cadeia quase sempre termina com um `??` fornecendo o padrão.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Cuidado para não usar `?.` como forma de ignorar nulos que não deveriam existir. Se aquele valor nunca deveria ser nulo, uma validação que **falha alto** é melhor que uma cadeia que silenciosamente não faz nada.',
      },
    ],
    quiz: [
      {
        id: 's06c02l08q1',
        type: 'single',
        prompt: 'O que acontece quando um elo do meio de uma cadeia `?.` é nulo?',
        options: [
          { id: 'a', text: 'A expressão inteira vira nulo e os elos seguintes não são avaliados.', correct: true },
          { id: 'b', text: 'Lança `NullReferenceException`.' },
          { id: 'c', text: 'Os elos seguintes são avaliados com valor padrão.' },
          { id: 'd', text: 'Devolve o valor padrão do tipo.' },
        ],
        explanation:
          'É curto-circuito. Nenhum método depois do elo nulo chega a ser chamado.',
      },
      {
        id: 's06c02l08q2',
        type: 'single',
        prompt: 'Qual é o tipo de `lista?.Count`, sendo `Count` um `int`?',
        options: [
          { id: 'a', code: 'int?', correct: true },
          { id: 'b', code: 'int' },
          { id: 'c', code: 'object' },
          { id: 'd', text: 'Não compila.' },
        ],
        explanation:
          'A expressão precisa poder devolver nulo, então o tipo por valor é promovido a nullable.',
      },
      {
        id: 's06c02l08q3',
        type: 'single',
        prompt: 'Quando **não** usar `?.`?',
        options: [
          { id: 'a', text: 'Quando aquele valor nunca deveria ser nulo — aí é melhor falhar alto.', correct: true },
          { id: 'b', text: 'Quando a cadeia tem mais de dois elos.' },
          { id: 'c', text: 'Quando o tipo é por valor.' },
          { id: 'd', text: 'Dentro de laços.' },
        ],
        explanation:
          'Silenciar um nulo impossível esconde o bug. A validação com exceção aponta para a causa; o `?.` só faz o sintoma sumir.',
      },
    ],
    challenge: {
      brief:
        'Navegue por uma estrutura de objetos com elos possivelmente ausentes, usando os operadores em vez de verificações manuais.',
      requirements: [
        '`Endereco` recebe cidade e pode ter `Cep` nulo',
        '`Empresa` recebe nome e um `Endereco` que pode ser nulo',
        '`Funcionario` recebe nome e uma `Empresa` que pode ser nula',
        '`CidadeDe(Funcionario f)` devolve a cidade, ou `desconhecida`, usando apenas `?.` e `??`',
        '`CepDe(Funcionario f)` devolve o CEP, ou `sem cep`',
        '`TamanhoNomeEmpresa(Funcionario f)` devolve o comprimento do nome da empresa, ou `-1`',
        '`NomeOuPadrao(Funcionario f)` devolve o nome do funcionário, usando `??=` para preencher `sem nome` quando estiver em branco',
        'Nenhum `if` de verificação de nulo é usado nesses quatro métodos',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare Endereco, Empresa e Funcionario aqui

class Program
{
    // Escreva CidadeDe, CepDe, TamanhoNomeEmpresa e NomeOuPadrao aqui

    static void Main()
    {
        string cidade = Console.ReadLine();
        string cep = Console.ReadLine();
        string nomeEmpresa = Console.ReadLine();

        Funcionario completo = new Funcionario("Ana", new Empresa(nomeEmpresa, new Endereco(cidade, cep)));
        Funcionario semCep = new Funcionario("Bruno", new Empresa(nomeEmpresa, new Endereco(cidade, null)));
        Funcionario semEndereco = new Funcionario("Carla", new Empresa(nomeEmpresa, null));
        Funcionario semEmpresa = new Funcionario("Diego", null);
        Funcionario semNome = new Funcionario(null, null);

        Funcionario[] todos = { completo, semCep, semEndereco, semEmpresa, semNome };

        foreach (Funcionario f in todos)
        {
            Console.WriteLine($"{NomeOuPadrao(f)}: cidade={CidadeDe(f)}, cep={CepDe(f)}, tamanho={TamanhoNomeEmpresa(f)}");
        }
    }
}
`,
      solution: `using System;

class Endereco
{
    public string Cidade { get; }
    public string Cep { get; }

    public Endereco(string cidade, string cep)
    {
        Cidade = cidade;
        Cep = cep;
    }
}

class Empresa
{
    public string Nome { get; }
    public Endereco Endereco { get; }

    public Empresa(string nome, Endereco endereco)
    {
        Nome = nome;
        Endereco = endereco;
    }
}

class Funcionario
{
    public string Nome { get; }
    public Empresa Empresa { get; }

    public Funcionario(string nome, Empresa empresa)
    {
        Nome = nome;
        Empresa = empresa;
    }
}

class Program
{
    static string CidadeDe(Funcionario f)
    {
        return f?.Empresa?.Endereco?.Cidade ?? "desconhecida";
    }

    static string CepDe(Funcionario f)
    {
        return f?.Empresa?.Endereco?.Cep ?? "sem cep";
    }

    static int TamanhoNomeEmpresa(Funcionario f)
    {
        return f?.Empresa?.Nome?.Length ?? -1;
    }

    static string NomeOuPadrao(Funcionario f)
    {
        string nome = f?.Nome;
        nome ??= "sem nome";
        return nome;
    }

    static void Main()
    {
        string cidade = Console.ReadLine();
        string cep = Console.ReadLine();
        string nomeEmpresa = Console.ReadLine();

        Funcionario completo = new Funcionario("Ana", new Empresa(nomeEmpresa, new Endereco(cidade, cep)));
        Funcionario semCep = new Funcionario("Bruno", new Empresa(nomeEmpresa, new Endereco(cidade, null)));
        Funcionario semEndereco = new Funcionario("Carla", new Empresa(nomeEmpresa, null));
        Funcionario semEmpresa = new Funcionario("Diego", null);
        Funcionario semNome = new Funcionario(null, null);

        Funcionario[] todos = { completo, semCep, semEndereco, semEmpresa, semNome };

        foreach (Funcionario f in todos)
        {
            Console.WriteLine($"{NomeOuPadrao(f)}: cidade={CidadeDe(f)}, cep={CepDe(f)}, tamanho={TamanhoNomeEmpresa(f)}");
        }
    }
}
`,
      hints: [
        'Cada método é uma única expressão: a cadeia de `?.` seguida de um `??` com o padrão.',
        'O `??=` precisa de uma variável local: guarde `f?.Nome` primeiro e aplique o operador nela.',
      ],
      tests: [
        {
          name: 'Empresa com endereco completo',
          stdin: 'Recife\n50000-000\nAcme\n',
          expectedStdout:
            'Ana: cidade=Recife, cep=50000-000, tamanho=4\n' +
            'Bruno: cidade=Recife, cep=sem cep, tamanho=4\n' +
            'Carla: cidade=desconhecida, cep=sem cep, tamanho=4\n' +
            'Diego: cidade=desconhecida, cep=sem cep, tamanho=-1\n' +
            'sem nome: cidade=desconhecida, cep=sem cep, tamanho=-1',
        },
        {
          name: 'Nome de empresa mais longo',
          stdin: 'Olinda\n53000-111\nIndustrias\n',
          expectedStdout:
            'Ana: cidade=Olinda, cep=53000-111, tamanho=10\n' +
            'Bruno: cidade=Olinda, cep=sem cep, tamanho=10\n' +
            'Carla: cidade=desconhecida, cep=sem cep, tamanho=10\n' +
            'Diego: cidade=desconhecida, cep=sem cep, tamanho=-1\n' +
            'sem nome: cidade=desconhecida, cep=sem cep, tamanho=-1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c02l09',
    title: 'Prática: ThrowIfNull e validações',
    objective: 'Montar uma camada de validação completa combinando helpers, guards e mensagens úteis.',
    concept: [
      {
        kind: 'text',
        body:
          'Na prática, validar bem é escolher a ferramenta certa para cada categoria de problema. Esta lição junta tudo que o capítulo apresentou em um fluxo só.',
      },
      {
        kind: 'table',
        headers: ['Categoria', 'Ferramenta'],
        rows: [
          ['argumento nulo', '`ArgumentNullException.ThrowIfNull`'],
          ['texto vazio', '`ArgumentException.ThrowIfNullOrWhiteSpace`'],
          ['fora de faixa', '`ArgumentOutOfRangeException.ThrowIf*`'],
          ['regra de negócio', '`if` + exceção de domínio'],
          ['entrada de usuário', '`TryParse` ou `Result`'],
        ],
      },
      {
        kind: 'text',
        body:
          'A ordem também importa: verifique **nulo antes de conteúdo**. Testar `texto.Length` antes de garantir que `texto` existe troca uma mensagem clara por uma `NullReferenceException`.',
      },
      {
        kind: 'compare',
        good: `ArgumentNullException.ThrowIfNull(itens);
if (itens.Count == 0)
    throw new ArgumentException("lista vazia");`,
        bad: `if (itens.Count == 0)          // estoura se for null
    throw new ArgumentException("lista vazia");
ArgumentNullException.ThrowIfNull(itens);`,
        goodLabel: 'Nulo primeiro',
        badLabel: 'Conteúdo antes do nulo',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma boa mensagem de validação diz **o que foi recebido e o que era esperado**. "idade invalida" ajuda pouco; "idade deve estar entre 0 e 120" diz exatamente como corrigir.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Validação repetida em toda camada vira ruído e esconde onde está a regra de verdade. Valide na **fronteira** — onde o dado entra no sistema — e confie nele depois disso.',
      },
    ],
    quiz: [
      {
        id: 's06c02l09q1',
        type: 'single',
        prompt: 'Por que verificar nulo antes de verificar conteúdo?',
        options: [
          { id: 'a', text: 'Porque acessar conteúdo de um nulo troca a mensagem clara por uma `NullReferenceException`.', correct: true },
          { id: 'b', text: 'Porque é mais rápido.' },
          { id: 'c', text: 'Porque o compilador exige essa ordem.' },
          { id: 'd', text: 'A ordem não importa.' },
        ],
        explanation:
          'A verificação de conteúdo já é um acesso ao objeto. Se ele não existe, o erro acontece antes da sua validação rodar.',
      },
      {
        id: 's06c02l09q2',
        type: 'single',
        prompt: 'O que caracteriza uma boa mensagem de validação?',
        options: [
          { id: 'a', text: 'Dizer o que foi recebido e o que era esperado.', correct: true },
          { id: 'b', text: 'Ser curta.' },
          { id: 'c', text: 'Incluir o stack trace.' },
          { id: 'd', text: 'Nomear o método que falhou.' },
        ],
        explanation:
          'Quem lê a mensagem quer saber como corrigir. A faixa esperada é a informação que resolve isso.',
      },
      {
        id: 's06c02l09q3',
        type: 'single',
        prompt: 'Onde a validação deve acontecer?',
        options: [
          { id: 'a', text: 'Na fronteira, onde o dado entra no sistema.', correct: true },
          { id: 'b', text: 'Em toda camada, por segurança.' },
          { id: 'c', text: 'Apenas no `Main`.' },
          { id: 'd', text: 'Apenas nos métodos privados.' },
        ],
        explanation:
          'Revalidar em todo lugar espalha a regra e torna difícil saber qual é a definitiva. A fronteira é onde o dado ainda não é confiável.',
      },
    ],
    challenge: {
      brief:
        'Escreva a camada de validação de um cadastro de produtos, escolhendo a ferramenta certa para cada categoria de erro.',
      requirements: [
        '`ProdutoInvalidoException` é customizada e guarda `Campo` (`string`), com mensagem `campo X: motivo`',
        '`Produto` recebe `codigo`, `nome`, `preco` (`decimal`) e `tags` (`List<string>`)',
        '`codigo` não pode ser nulo nem em branco, e deve ter exatamente 5 caracteres, senão lança `ProdutoInvalidoException` no campo `codigo` com o motivo `deve ter 5 caracteres`',
        '`nome` não pode ser nulo nem em branco',
        '`preco` não pode ser negativo, e não pode passar de `1000000`',
        '`tags` não pode ser nula, e a lista vazia lança `ProdutoInvalidoException` no campo `tags` com o motivo `pelo menos uma tag`',
        'As verificações de nulo vêm antes das de conteúdo',
        '`ToString()` devolve `codigo - nome: R$ X.XX [N tags]`',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main` nem o método `Tentar`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare ProdutoInvalidoException e Produto aqui

class Program
{
    static void Tentar(string rotulo, Func<Produto> criar)
    {
        try
        {
            Console.WriteLine($"{rotulo}: {criar()}");
        }
        catch (ProdutoInvalidoException e)
        {
            Console.WriteLine($"{rotulo}: dominio [{e.Campo}] {e.Message}");
        }
        catch (Exception e)
        {
            Console.WriteLine($"{rotulo}: {e.GetType().Name}");
        }
    }

    static void Main()
    {
        string codigo = Console.ReadLine();
        string nome = Console.ReadLine();
        decimal preco = decimal.Parse(Console.ReadLine());

        List<string> tags = new List<string> { "novo", "promocao" };

        Tentar("valido", () => new Produto(codigo, nome, preco, tags));
        Tentar("codigo nulo", () => new Produto(null, nome, preco, tags));
        Tentar("codigo curto", () => new Produto("AB", nome, preco, tags));
        Tentar("nome branco", () => new Produto(codigo, "   ", preco, tags));
        Tentar("preco negativo", () => new Produto(codigo, nome, -1, tags));
        Tentar("preco absurdo", () => new Produto(codigo, nome, 2000000, tags));
        Tentar("tags nulas", () => new Produto(codigo, nome, preco, null));
        Tentar("tags vazias", () => new Produto(codigo, nome, preco, new List<string>()));
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class ProdutoInvalidoException : Exception
{
    public string Campo { get; }

    public ProdutoInvalidoException(string campo, string motivo)
        : base($"campo {campo}: {motivo}")
    {
        Campo = campo;
    }
}

class Produto
{
    public string Codigo { get; }
    public string Nome { get; }
    public decimal Preco { get; }
    public List<string> Tags { get; }

    public Produto(string codigo, string nome, decimal preco, List<string> tags)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(codigo);

        if (codigo.Length != 5)
        {
            throw new ProdutoInvalidoException("codigo", "deve ter 5 caracteres");
        }

        ArgumentException.ThrowIfNullOrWhiteSpace(nome);

        ArgumentOutOfRangeException.ThrowIfNegative(preco);
        ArgumentOutOfRangeException.ThrowIfGreaterThan(preco, 1000000);

        ArgumentNullException.ThrowIfNull(tags);

        if (tags.Count == 0)
        {
            throw new ProdutoInvalidoException("tags", "pelo menos uma tag");
        }

        Codigo = codigo;
        Nome = nome;
        Preco = preco;
        Tags = new List<string>(tags);
    }

    public override string ToString()
    {
        return $"{Codigo} - {Nome}: R$ {Preco:F2} [{Tags.Count} tags]";
    }
}

class Program
{
    static void Tentar(string rotulo, Func<Produto> criar)
    {
        try
        {
            Console.WriteLine($"{rotulo}: {criar()}");
        }
        catch (ProdutoInvalidoException e)
        {
            Console.WriteLine($"{rotulo}: dominio [{e.Campo}] {e.Message}");
        }
        catch (Exception e)
        {
            Console.WriteLine($"{rotulo}: {e.GetType().Name}");
        }
    }

    static void Main()
    {
        string codigo = Console.ReadLine();
        string nome = Console.ReadLine();
        decimal preco = decimal.Parse(Console.ReadLine());

        List<string> tags = new List<string> { "novo", "promocao" };

        Tentar("valido", () => new Produto(codigo, nome, preco, tags));
        Tentar("codigo nulo", () => new Produto(null, nome, preco, tags));
        Tentar("codigo curto", () => new Produto("AB", nome, preco, tags));
        Tentar("nome branco", () => new Produto(codigo, "   ", preco, tags));
        Tentar("preco negativo", () => new Produto(codigo, nome, -1, tags));
        Tentar("preco absurdo", () => new Produto(codigo, nome, 2000000, tags));
        Tentar("tags nulas", () => new Produto(codigo, nome, preco, null));
        Tentar("tags vazias", () => new Produto(codigo, nome, preco, new List<string>()));
    }
}
`,
      hints: [
        'As validações de argumento usam os helpers; as de regra de negócio usam a exceção de domínio.',
        'A lista de tags é copiada no construtor, seguindo a proteção de coleções da Seção 5.',
      ],
      tests: [
        {
          name: 'Produto valido',
          stdin: 'ABC12\nTeclado\n250.00\n',
          expectedStdout:
            'valido: ABC12 - Teclado: R$ 250.00 [2 tags]\n' +
            'codigo nulo: ArgumentNullException\n' +
            'codigo curto: dominio [codigo] campo codigo: deve ter 5 caracteres\n' +
            'nome branco: ArgumentException\n' +
            'preco negativo: ArgumentOutOfRangeException\n' +
            'preco absurdo: ArgumentOutOfRangeException\n' +
            'tags nulas: ArgumentNullException\n' +
            'tags vazias: dominio [tags] campo tags: pelo menos uma tag',
        },
        {
          name: 'Produto com preco zero',
          stdin: 'XYZ99\nMouse\n0\n',
          expectedStdout:
            'valido: XYZ99 - Mouse: R$ 0.00 [2 tags]\n' +
            'codigo nulo: ArgumentNullException\n' +
            'codigo curto: dominio [codigo] campo codigo: deve ter 5 caracteres\n' +
            'nome branco: ArgumentException\n' +
            'preco negativo: ArgumentOutOfRangeException\n' +
            'preco absurdo: ArgumentOutOfRangeException\n' +
            'tags nulas: ArgumentNullException\n' +
            'tags vazias: dominio [tags] campo tags: pelo menos uma tag',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c02l10',
    title: 'Checkpoint: robustez',
    objective: 'Escolher entre exceção, `Try` e `Result` conforme a natureza de cada falha do sistema.',
    concept: [
      {
        kind: 'text',
        body:
          'Robustez não é capturar tudo. É decidir, para cada falha possível, **quem é o responsável** e **como ele fica sabendo**.',
      },
      {
        kind: 'table',
        headers: ['A falha é...', 'Sinalize com', 'Porque'],
        rows: [
          ['bug de quem chamou', 'exceção de argumento', 'precisa ser corrigido no código'],
          ['estado impossível', '`InvalidOperationException`', 'não deveria acontecer'],
          ['entrada externa ruim', '`TryParse` / `Result`', 'é rotina, não excepcional'],
          ['regra de negócio', 'exceção de domínio', 'quem chama trata de forma específica'],
          ['ausência legítima', '`null` ou `T?`', 'não é erro nenhum'],
        ],
      },
      {
        kind: 'text',
        body:
          'A última linha é a mais esquecida. Nem toda ausência é falha: um usuário sem telefone cadastrado não é um erro, e forçar uma exceção nesse caso complica quem só queria saber se havia telefone.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um sistema robusto falha de forma **previsível**. Isso vale mais que nunca falhar: quem usa consegue programar contra o comportamento, porque sabe exatamente o que esperar em cada caso ruim.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Misturar estratégias no mesmo método confunde. Um método que às vezes devolve `null`, às vezes lança e às vezes devolve `false` obriga quem chama a se defender de três formas ao mesmo tempo.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Escreva primeiro a assinatura pensando em quem vai chamar. Se a chamada fica desconfortável de escrever, a estratégia de erro provavelmente está errada.',
      },
    ],
    quiz: [
      {
        id: 's06c02l10q1',
        type: 'single',
        prompt: 'Como sinalizar que um argumento recebido é inválido?',
        options: [
          { id: 'a', text: 'Com exceção de argumento: é um bug a ser corrigido no código.', correct: true },
          { id: 'b', code: 'return false' },
          { id: 'c', code: 'return null' },
          { id: 'd', text: 'Com `Result`.' },
        ],
        explanation:
          'Um argumento inválido significa que quem chamou errou. Isso precisa ser barulhento para ser corrigido, não silenciosamente tratado.',
      },
      {
        id: 's06c02l10q2',
        type: 'single',
        prompt: 'Uma ausência legítima de valor deve ser sinalizada como?',
        options: [
          { id: 'a', text: 'Com `null` ou tipo nullable — não é erro nenhum.', correct: true },
          { id: 'b', text: 'Com exceção.' },
          { id: 'c', code: 'Result.Falha' },
          { id: 'd', text: 'Com um valor mágico.' },
        ],
        explanation:
          'Transformar ausência em erro obriga quem chama a tratar como excepcional algo que é perfeitamente normal.',
      },
      {
        id: 's06c02l10q3',
        type: 'single',
        prompt: 'O que significa "falhar de forma previsível"?',
        options: [
          { id: 'a', text: 'Quem usa sabe exatamente o que esperar em cada caso ruim.', correct: true },
          { id: 'b', text: 'O programa nunca falha.' },
          { id: 'c', text: 'Todas as falhas viram exceção.' },
          { id: 'd', text: 'As falhas são registradas em arquivo.' },
        ],
        explanation:
          'A previsibilidade é o que permite programar contra o comportamento. Um método imprevisível é impossível de usar com segurança.',
      },
    ],
    challenge: {
      brief:
        'Construa uma camada de acesso a dados que usa cada estratégia de erro onde ela é apropriada, sem misturá-las no mesmo método.',
      requirements: [
        '`Resultado<T>` tem `Ok`, `Valor`, `Erro`, fábricas `Sucesso` e `Falha`, e `ToString()` que devolve `ok: valor` ou `falha: erro`',
        '`Repositorio` guarda nomes por identificador (`int`) em um dicionário privado',
        '`Adicionar(int id, string nome)` lança `ArgumentOutOfRangeException` para id negativo e `ArgumentException` para nome em branco — bugs de quem chamou',
        '`Buscar(int id)` devolve o nome ou `null` — ausência é legítima, não é erro',
        '`TryBuscar(int id, out string nome)` devolve `bool` sem lançar',
        '`Interpretar(string entrada)` recebe `id:nome` e devolve `Resultado<string>`, com falhas `formato invalido`, `id nao numerico` e `nome vazio`',
        '`Remover(int id)` lança `InvalidOperationException` com a mensagem `repositorio vazio` quando não há nada cadastrado, e devolve `bool` para a chave ausente',
        'Cada método usa uma única estratégia de erro',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main` nem o método `Tentar`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare Resultado<T> e Repositorio aqui

class Program
{
    static void Tentar(string rotulo, Action acao)
    {
        try
        {
            acao();
            Console.WriteLine($"{rotulo}: ok");
        }
        catch (Exception e)
        {
            Console.WriteLine($"{rotulo}: {e.GetType().Name} - {e.Message}");
        }
    }

    static void Main()
    {
        int id = int.Parse(Console.ReadLine());
        string nome = Console.ReadLine();

        Repositorio repo = new Repositorio();

        Tentar("remover de vazio", () => repo.Remover(id));
        Tentar("adicionar valido", () => repo.Adicionar(id, nome));
        Tentar("adicionar segundo", () => repo.Adicionar(id + 1, nome + "2"));
        Tentar("adicionar id negativo", () => repo.Adicionar(-1, nome));
        Tentar("adicionar nome branco", () => repo.Adicionar(99, "  "));

        Console.WriteLine($"buscar existente: {repo.Buscar(id) ?? "ausente"}");
        Console.WriteLine($"buscar ausente: {repo.Buscar(12345) ?? "ausente"}");
        Console.WriteLine($"try existente: {repo.TryBuscar(id, out string achado)} -> {achado ?? "nulo"}");
        Console.WriteLine($"try ausente: {repo.TryBuscar(12345, out string vazio)} -> {vazio ?? "nulo"}");

        Console.WriteLine($"interpretar ok: {repo.Interpretar("7:Ana")}");
        Console.WriteLine($"interpretar sem separador: {repo.Interpretar("7Ana")}");
        Console.WriteLine($"interpretar id ruim: {repo.Interpretar("x:Ana")}");
        Console.WriteLine($"interpretar nome vazio: {repo.Interpretar("7: ")}");

        Console.WriteLine($"remover existente: {repo.Remover(id)}");
        Console.WriteLine($"remover ausente: {repo.Remover(12345)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Resultado<T>
{
    public bool Ok { get; }
    public T Valor { get; }
    public string Erro { get; }

    private Resultado(bool ok, T valor, string erro)
    {
        Ok = ok;
        Valor = valor;
        Erro = erro;
    }

    public static Resultado<T> Sucesso(T valor)
    {
        return new Resultado<T>(true, valor, null);
    }

    public static Resultado<T> Falha(string erro)
    {
        return new Resultado<T>(false, default, erro);
    }

    public override string ToString()
    {
        return Ok ? $"ok: {Valor}" : $"falha: {Erro}";
    }
}

class Repositorio
{
    private Dictionary<int, string> dados = new Dictionary<int, string>();

    public void Adicionar(int id, string nome)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(id);
        ArgumentException.ThrowIfNullOrWhiteSpace(nome);

        dados[id] = nome;
    }

    public string Buscar(int id)
    {
        if (dados.TryGetValue(id, out string nome))
        {
            return nome;
        }

        return null;
    }

    public bool TryBuscar(int id, out string nome)
    {
        return dados.TryGetValue(id, out nome);
    }

    public Resultado<string> Interpretar(string entrada)
    {
        if (entrada == null)
        {
            return Resultado<string>.Falha("formato invalido");
        }

        string[] partes = entrada.Split(':');

        if (partes.Length != 2)
        {
            return Resultado<string>.Falha("formato invalido");
        }

        if (!int.TryParse(partes[0], out int id))
        {
            return Resultado<string>.Falha("id nao numerico");
        }

        if (string.IsNullOrWhiteSpace(partes[1]))
        {
            return Resultado<string>.Falha("nome vazio");
        }

        return Resultado<string>.Sucesso($"{id}={partes[1]}");
    }

    public bool Remover(int id)
    {
        if (dados.Count == 0)
        {
            throw new InvalidOperationException("repositorio vazio");
        }

        return dados.Remove(id);
    }
}

class Program
{
    static void Tentar(string rotulo, Action acao)
    {
        try
        {
            acao();
            Console.WriteLine($"{rotulo}: ok");
        }
        catch (Exception e)
        {
            Console.WriteLine($"{rotulo}: {e.GetType().Name} - {e.Message}");
        }
    }

    static void Main()
    {
        int id = int.Parse(Console.ReadLine());
        string nome = Console.ReadLine();

        Repositorio repo = new Repositorio();

        Tentar("remover de vazio", () => repo.Remover(id));
        Tentar("adicionar valido", () => repo.Adicionar(id, nome));
        Tentar("adicionar segundo", () => repo.Adicionar(id + 1, nome + "2"));
        Tentar("adicionar id negativo", () => repo.Adicionar(-1, nome));
        Tentar("adicionar nome branco", () => repo.Adicionar(99, "  "));

        Console.WriteLine($"buscar existente: {repo.Buscar(id) ?? "ausente"}");
        Console.WriteLine($"buscar ausente: {repo.Buscar(12345) ?? "ausente"}");
        Console.WriteLine($"try existente: {repo.TryBuscar(id, out string achado)} -> {achado ?? "nulo"}");
        Console.WriteLine($"try ausente: {repo.TryBuscar(12345, out string vazio)} -> {vazio ?? "nulo"}");

        Console.WriteLine($"interpretar ok: {repo.Interpretar("7:Ana")}");
        Console.WriteLine($"interpretar sem separador: {repo.Interpretar("7Ana")}");
        Console.WriteLine($"interpretar id ruim: {repo.Interpretar("x:Ana")}");
        Console.WriteLine($"interpretar nome vazio: {repo.Interpretar("7: ")}");

        Console.WriteLine($"remover existente: {repo.Remover(id)}");
        Console.WriteLine($"remover ausente: {repo.Remover(12345)}");
    }
}
`,
      hints: [
        'O `TryBuscar` pode delegar direto para o `TryGetValue` do dicionário — a assinatura é a mesma.',
        'O `Interpretar` usa apenas `Resultado`, sem lançar nada: as falhas dele são de entrada externa.',
        'Repare que `Remover` combina duas estratégias com propósitos distintos: exceção para estado impossível, `bool` para chave ausente.',
      ],
      tests: [
        {
          name: 'Fluxo completo',
          stdin: '7\nAna\n',
          expectedStdout:
            'remover de vazio: InvalidOperationException - repositorio vazio\n' +
            'adicionar valido: ok\n' +
            'adicionar segundo: ok\n' +
            "adicionar id negativo: ArgumentOutOfRangeException - id ('-1') must be a non-negative value. (Parameter 'id')\n" +
            'Actual value was -1.\n' +
            "adicionar nome branco: ArgumentException - The value cannot be an empty string or composed entirely of whitespace. (Parameter 'nome')\n" +
            'buscar existente: Ana\nbuscar ausente: ausente\n' +
            'try existente: True -> Ana\ntry ausente: False -> nulo\n' +
            'interpretar ok: ok: 7=Ana\ninterpretar sem separador: falha: formato invalido\n' +
            'interpretar id ruim: falha: id nao numerico\ninterpretar nome vazio: falha: nome vazio\n' +
            'remover existente: True\nremover ausente: False',
        },
        {
          name: 'Outro identificador',
          stdin: '42\nBruno\n',
          expectedStdout:
            'remover de vazio: InvalidOperationException - repositorio vazio\n' +
            'adicionar valido: ok\n' +
            'adicionar segundo: ok\n' +
            "adicionar id negativo: ArgumentOutOfRangeException - id ('-1') must be a non-negative value. (Parameter 'id')\n" +
            'Actual value was -1.\n' +
            "adicionar nome branco: ArgumentException - The value cannot be an empty string or composed entirely of whitespace. (Parameter 'nome')\n" +
            'buscar existente: Bruno\nbuscar ausente: ausente\n' +
            'try existente: True -> Bruno\ntry ausente: False -> nulo\n' +
            'interpretar ok: ok: 7=Ana\ninterpretar sem separador: falha: formato invalido\n' +
            'interpretar id ruim: falha: id nao numerico\ninterpretar nome vazio: falha: nome vazio\n' +
            'remover existente: True\nremover ausente: False',
          hidden: true,
        },
      ],
    },
  },
]
