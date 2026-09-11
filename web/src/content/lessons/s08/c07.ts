import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's08c07l01',
    title: 'Atributos',
    objective: 'Anexar metadados a tipos e membros, e entender o que o compilador e o runtime fazem com eles.',
    concept: [
      {
        kind: 'text',
        body:
          'Um **atributo** é um dado anexado a um elemento do código — classe, método, propriedade, parâmetro. Ele não executa nada por si só: fica gravado no assembly, esperando que alguém o leia.',
      },
      {
        kind: 'code',
        code: `[Obsolete("use Preco")]
public decimal PrecoAntigo => Preco;

[Serializable]
class Configuracao { }`,
        caption: 'A sintaxe é o nome entre colchetes, imediatamente antes do elemento que ele descreve.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Atributos são **declarativos**: eles descrevem, não fazem. `[Obsolete]` não impede o uso — ele grava a informação, e o compilador escolhe emitir um aviso ao encontrá-la. Quem age é sempre quem lê.',
      },
      {
        kind: 'text',
        body: 'Existem três públicos possíveis para um atributo, e a diferença importa:',
      },
      {
        kind: 'table',
        headers: ['Quem lê', 'Exemplos', 'Quando'],
        rows: [
          ['o compilador', '`[Obsolete]`, `[Conditional]`, `[CallerMemberName]`', 'em tempo de compilação'],
          ['o runtime', '`[Serializable]`, `[ThreadStatic]`', 'em tempo de execução'],
          ['bibliotecas e o seu código', '`[JsonPropertyName]`, `[Required]`, os seus', 'via reflexão'],
        ],
      },
      {
        kind: 'text',
        body:
          'Um atributo pode receber argumentos de duas formas: **posicionais**, definidos pelo construtor, e **nomeados**, que atribuem propriedades públicas.',
      },
      {
        kind: 'code',
        code: `[Descricao("Um produto do catalogo", Ordem = 1)]
class Produto { }`,
        caption: '`"Um produto..."` é posicional; `Ordem = 1` é nomeado. Os posicionais vêm sempre primeiro.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Argumentos de atributo precisam ser **constantes em tempo de compilação**: literais, `typeof(...)`, valores de `enum` e arrays desses. Uma variável, um `new` ou uma chamada de método não compilam.',
      },
      {
        kind: 'compare',
        good: `[Descricao("texto fixo")]
[Limite(Maximo = 100)]
[Aceita(typeof(Produto))]`,
        bad: `[Descricao(nomeVariavel)]
[Limite(Maximo = Calcular())]
[Aceita(new Produto())]`,
        goodLabel: 'Constantes',
        badLabel: 'Valores calculados',
      },
      {
        kind: 'text',
        body:
          'Vários atributos podem ser aplicados ao mesmo elemento, cada um em seus colchetes ou separados por vírgula dentro dos mesmos.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Separados',
          code: `[Descricao("Codigo unico")]
[Validacao("obrigatorio")]
public string Codigo { get; set; }`,
        },
        right: {
          label: 'Juntos',
          code: `[Descricao("Codigo unico"), Validacao("obrigatorio")]
public string Codigo { get; set; }`,
        },
        note: 'As duas formas são equivalentes. A da esquerda costuma ser mais legível quando há três ou mais.',
      },
      {
        kind: 'text',
        body:
          'Alguns atributos do framework aparecem o tempo todo e vale reconhecê-los antes de escrever os seus.',
      },
      {
        kind: 'table',
        headers: ['Atributo', 'Efeito'],
        rows: [
          ['`[Obsolete("motivo")]`', 'aviso de compilação ao usar o membro'],
          ['`[Obsolete("motivo", true)]`', '**erro** de compilação ao usar'],
          ['`[Flags]`', 'muda o `ToString` de um `enum` de bits'],
          ['`[Conditional("DEBUG")]`', 'a chamada é removida fora do símbolo'],
          ['`[CallerMemberName]`', 'preenche o parâmetro com o nome de quem chamou'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Ler um atributo do próprio código exige reflexão — o assunto da próxima lição. Antes disso, vale a pergunta: o dado que você quer anexar é mesmo **metadado**, ou seria melhor como propriedade normal?',
      },
    ],
    quiz: [
      {
        id: 's08c07l01q1',
        type: 'single',
        prompt: 'O que um atributo faz por si só?',
        options: [
          { id: 'a', text: 'Nada: ele grava metadados que alguém precisa ler para agir', correct: true },
          { id: 'b', text: 'Executa código antes do membro anotado' },
          { id: 'c', text: 'Modifica o comportamento do método automaticamente' },
          { id: 'd', text: 'Valida os argumentos em tempo de execução' },
        ],
        explanation:
          'O atributo é declarativo. `[Obsolete]` só produz aviso porque o **compilador** procura por ele; um atributo seu só faz algo se o seu código o ler.',
      },
      {
        id: 's08c07l01q2',
        type: 'single',
        prompt: 'Por que `[Descricao(nomeVariavel)]` não compila?',
        options: [
          { id: 'a', text: 'Argumentos de atributo precisam ser constantes em tempo de compilação', correct: true },
          { id: 'b', text: 'Porque `Descricao` precisa de argumento nomeado' },
          { id: 'c', text: 'Porque variáveis não podem ser `string`' },
          { id: 'd', text: 'Compila normalmente' },
        ],
        explanation:
          'O valor é gravado no assembly durante a compilação, então precisa ser conhecido ali. Literais, `typeof`, valores de `enum` e arrays desses são aceitos.',
      },
      {
        id: 's08c07l01q3',
        type: 'single',
        prompt: 'Qual a diferença entre argumento posicional e nomeado num atributo?',
        options: [
          { id: 'a', text: 'Posicional vem do construtor; nomeado atribui uma propriedade pública', correct: true },
          { id: 'b', text: 'Posicional é obrigatório e nomeado é opcional, sempre' },
          { id: 'c', text: 'Nomeado só funciona com `string`' },
          { id: 'd', text: 'Não há diferença técnica' },
        ],
        explanation:
          'Por consequência, os posicionais são de fato obrigatórios (o construtor os exige) e os nomeados são opcionais — mas o mecanismo é esse, não uma regra à parte.',
      },
    ],
    challenge: {
      brief:
        'Defina atributos próprios para descrever um modelo de dados e aplique-os com argumentos posicionais e nomeados, incluindo um atributo que pode se repetir.',
      requirements: [
        '`DescricaoAttribute` recebe o texto por construtor e tem uma propriedade `Ordem` opcional.',
        '`ValidacaoAttribute` permite múltiplas aplicações no mesmo membro.',
        'Use `[AttributeUsage]` para restringir onde cada atributo pode ser aplicado.',
        'A classe `Produto` recebe descrição de classe e de propriedades.',
        'Ao menos uma propriedade tem duas validações.',
        'Ao menos um membro usa `[Obsolete]`.',
        'O programa apenas confirma que o modelo compila e funciona — a leitura dos atributos é a próxima lição.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// TODO: AttributeUsage permitindo classe e propriedade, sem repeticao
class DescricaoAttribute : Attribute
{
    // TODO: Texto por construtor, Ordem como propriedade opcional
    public string Texto { get; } = "";
    public int Ordem { get; set; }
}

// TODO: AttributeUsage permitindo propriedade, com AllowMultiple
class ValidacaoAttribute : Attribute
{
    public string Regra { get; } = "";
}

// TODO: aplique Descricao na classe, com Ordem
class Produto
{
    // TODO: Descricao e duas Validacao
    public string Codigo { get; set; } = "";

    // TODO: Descricao
    public decimal Preco { get; set; }

    public string Interno { get; set; } = "";

    // TODO: Obsolete com mensagem
    public decimal PrecoAntigo => Preco;
}

class Program
{
    static void Main()
    {
        var p = new Produto { Codigo = "ABC12", Preco = 19.9m, Interno = "x" };

        Console.WriteLine($"codigo: {p.Codigo}");
        Console.WriteLine($"preco: {p.Preco}");
        Console.WriteLine($"interno: {p.Interno}");

        var descricao = new DescricaoAttribute("teste") { Ordem = 5 };
        Console.WriteLine($"atributo direto: {descricao.Texto} ordem={descricao.Ordem}");

        var padrao = new DescricaoAttribute("sem ordem");
        Console.WriteLine($"ordem padrao: {padrao.Ordem}");

        var validacao = new ValidacaoAttribute("obrigatorio");
        Console.WriteLine($"validacao: {validacao.Regra}");

        var uso = (AttributeUsageAttribute)Attribute.GetCustomAttribute(
            typeof(DescricaoAttribute), typeof(AttributeUsageAttribute));

        Console.WriteLine($"descricao permite multiplos: {uso.AllowMultiple}");
        Console.WriteLine($"descricao em classe: {uso.ValidOn.HasFlag(AttributeTargets.Class)}");

        var usoValidacao = (AttributeUsageAttribute)Attribute.GetCustomAttribute(
            typeof(ValidacaoAttribute), typeof(AttributeUsageAttribute));

        Console.WriteLine($"validacao permite multiplos: {usoValidacao.AllowMultiple}");
        Console.WriteLine($"validacao em classe: {usoValidacao.ValidOn.HasFlag(AttributeTargets.Class)}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Property, AllowMultiple = false)]
class DescricaoAttribute : Attribute
{
    public string Texto { get; }
    public int Ordem { get; set; }

    public DescricaoAttribute(string texto)
    {
        Texto = texto;
    }
}

[AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
class ValidacaoAttribute : Attribute
{
    public string Regra { get; }

    public ValidacaoAttribute(string regra)
    {
        Regra = regra;
    }
}

[Descricao("Um produto do catalogo", Ordem = 1)]
class Produto
{
    [Descricao("Codigo unico")]
    [Validacao("obrigatorio")]
    [Validacao("tamanho:5")]
    public string Codigo { get; set; } = "";

    [Descricao("Preco em reais")]
    public decimal Preco { get; set; }

    public string Interno { get; set; } = "";

    [Obsolete("use Preco")]
    public decimal PrecoAntigo => Preco;
}

class Program
{
    static void Main()
    {
        var p = new Produto { Codigo = "ABC12", Preco = 19.9m, Interno = "x" };

        Console.WriteLine($"codigo: {p.Codigo}");
        Console.WriteLine($"preco: {p.Preco}");
        Console.WriteLine($"interno: {p.Interno}");

        var descricao = new DescricaoAttribute("teste") { Ordem = 5 };
        Console.WriteLine($"atributo direto: {descricao.Texto} ordem={descricao.Ordem}");

        var padrao = new DescricaoAttribute("sem ordem");
        Console.WriteLine($"ordem padrao: {padrao.Ordem}");

        var validacao = new ValidacaoAttribute("obrigatorio");
        Console.WriteLine($"validacao: {validacao.Regra}");

        var uso = (AttributeUsageAttribute)Attribute.GetCustomAttribute(
            typeof(DescricaoAttribute), typeof(AttributeUsageAttribute));

        Console.WriteLine($"descricao permite multiplos: {uso.AllowMultiple}");
        Console.WriteLine($"descricao em classe: {uso.ValidOn.HasFlag(AttributeTargets.Class)}");

        var usoValidacao = (AttributeUsageAttribute)Attribute.GetCustomAttribute(
            typeof(ValidacaoAttribute), typeof(AttributeUsageAttribute));

        Console.WriteLine($"validacao permite multiplos: {usoValidacao.AllowMultiple}");
        Console.WriteLine($"validacao em classe: {usoValidacao.ValidOn.HasFlag(AttributeTargets.Class)}");
    }
}`,
      hints: [
        'Por convenção, a classe se chama `XAttribute` e é usada como `[X]` — o sufixo é opcional na aplicação.',
        '`AllowMultiple = true` é o que permite duas `[Validacao]` no mesmo membro; sem ele, o compilador rejeita a segunda.',
        '`AttributeTargets.Class | AttributeTargets.Property` combina os alvos com um "ou" de bits.',
        'O `Texto` só tem `get` porque é preenchido pelo construtor; `Ordem` precisa de `set` para ser usada como argumento nomeado.',
      ],
      capabilities: ['reflection'],
      tests: [
        {
          name: 'Atributos declarados',
          expectedStdout:
            'codigo: ABC12\npreco: 19.9\ninterno: x\n' +
            'atributo direto: teste ordem=5\nordem padrao: 0\nvalidacao: obrigatorio\n' +
            'descricao permite multiplos: False\ndescricao em classe: True\n' +
            'validacao permite multiplos: True\nvalidacao em classe: False',
        },
      ],
    },
  },

  {
    id: 's08c07l02',
    title: 'Reflection na prática',
    objective: 'Inspecionar tipos em tempo de execução, e conhecer o custo dessa flexibilidade.',
    concept: [
      {
        kind: 'text',
        body:
          '**Reflexão** é a capacidade de examinar e manipular tipos em tempo de execução. O ponto de partida é sempre um `Type`, obtido de duas formas.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Do tipo, em compilação',
          code: `Type t = typeof(Produto);`,
        },
        right: {
          label: 'De uma instância, em execução',
          code: `Type t = objeto.GetType();`,
        },
        note: '`typeof` exige o tipo escrito no código; `GetType()` descobre o tipo real do objeto.',
      },
      {
        kind: 'text',
        body: 'A partir do `Type`, você chega a tudo o que o tipo declara:',
      },
      {
        kind: 'code',
        code: `var tipo = typeof(Produto);

Console.WriteLine(tipo.FullName);
Console.WriteLine(tipo.IsClass);

foreach (var p in tipo.GetProperties())
{
    Console.WriteLine($"{p.Name} ({p.PropertyType.Name})");
}`,
      },
      {
        kind: 'table',
        headers: ['Método', 'Devolve'],
        rows: [
          ['`GetProperties()`', 'as propriedades públicas'],
          ['`GetMethods()`', 'os métodos públicos, incluindo herdados'],
          ['`GetFields()`', 'os campos públicos'],
          ['`GetCustomAttribute<T>()`', 'um atributo, ou `null`'],
          ['`GetCustomAttributes<T>()`', 'todos os atributos daquele tipo'],
        ],
      },
      {
        kind: 'text',
        body:
          'Ler e escrever valores não exige conhecer o tipo em tempo de compilação — é o que torna possível um serializador genérico.',
      },
      {
        kind: 'code',
        code: `var prop = tipo.GetProperty("Preco");

object valor = prop.GetValue(produto);
prop.SetValue(produto, 99.5m);`,
        caption: '`GetValue` e `SetValue` trabalham com `object`, então há empacotamento em tipos de valor.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Reflexão é **lenta**: uma chamada por `Invoke` custa ordens de grandeza mais que a chamada direta, e cada `GetValue` de um `int` empacota. É a técnica menos adequada para caminhos quentes.',
      },
      {
        kind: 'text',
        body:
          'A combinação de atributos com reflexão é o que dá poder real: você anota o modelo e escreve **um** código que serve para qualquer tipo anotado.',
      },
      {
        kind: 'code',
        code: `foreach (var p in tipo.GetProperties())
{
    var d = p.GetCustomAttribute<DescricaoAttribute>();
    var regras = p.GetCustomAttributes<ValidacaoAttribute>().ToList();

    Console.WriteLine($"{p.Name}: {d?.Texto ?? "sem descricao"} ({regras.Count} regras)");
}`,
      },
      {
        kind: 'output',
        code: `Codigo: Codigo unico (2 regras)
Preco: Preco em reais (0 regras)
Interno: sem descricao (0 regras)`,
        caption: 'Um laço só descreve o modelo inteiro. Adicionar uma propriedade anotada não exige mudar este código.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'É exatamente assim que serializadores JSON, mapeadores objeto-relacional e validadores funcionam. Você declara o **quê** com atributos; a biblioteca descobre o **como** com reflexão.',
      },
      {
        kind: 'text',
        body:
          'Para filtrar o que `GetMethods` e companhia devolvem, existe `BindingFlags` — sem ele, a lista vem cheia de membros herdados de `object`.',
      },
      {
        kind: 'code',
        code: `var metodos = tipo.GetMethods(
    BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly);`,
        caption: '`DeclaredOnly` exclui o que veio da classe base — quase sempre o que você quer.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Use reflexão em código de **infraestrutura**, executado uma vez na inicialização — registrar plugins, montar um mapa de tipos, validar um modelo. Evite-a em código de negócio, onde a tipagem estática é a vantagem que você está pagando para ter.',
      },
    ],
    quiz: [
      {
        id: 's08c07l02q1',
        type: 'single',
        prompt: 'Qual a diferença entre `typeof(X)` e `objeto.GetType()`?',
        options: [
          { id: 'a', text: '`typeof` usa o tipo escrito no código; `GetType()` devolve o tipo real do objeto', correct: true },
          { id: 'b', text: 'Nenhuma: os dois devolvem o mesmo `Type`' },
          { id: 'c', text: '`typeof` é mais lento' },
          { id: 'd', text: '`GetType()` só funciona com tipos de valor' },
        ],
        explanation:
          'Se `Produto p = new ProdutoEspecial()`, então `typeof(Produto)` dá `Produto` e `p.GetType()` dá `ProdutoEspecial`. É a diferença entre tipo estático e dinâmico.',
      },
      {
        id: 's08c07l02q2',
        type: 'single',
        prompt: 'Por que reflexão é lenta?',
        options: [
          { id: 'a', text: 'A resolução acontece em execução e as chamadas passam por `object`, com empacotamento', correct: true },
          { id: 'b', text: 'Porque ela lê o arquivo fonte' },
          { id: 'c', text: 'Porque força coleta de lixo' },
          { id: 'd', text: 'Ela não é lenta' },
        ],
        explanation:
          'A chamada direta é resolvida na compilação; a por reflexão precisa procurar o membro, verificar acesso e empacotar argumentos e retorno.',
      },
      {
        id: 's08c07l02q3',
        type: 'single',
        prompt: 'Para que serve `BindingFlags.DeclaredOnly`?',
        options: [
          { id: 'a', text: 'Excluir os membros herdados, devolvendo só os do próprio tipo', correct: true },
          { id: 'b', text: 'Incluir membros privados' },
          { id: 'c', text: 'Filtrar apenas membros estáticos' },
          { id: 'd', text: 'Ordenar os resultados' },
        ],
        explanation:
          'Sem ele, `GetMethods()` traz `ToString`, `Equals`, `GetHashCode` e `GetType`, herdados de `object` — quase nunca o que interessa.',
      },
    ],
    challenge: {
      brief:
        'Escreva um descritor genérico de modelos: usando reflexão, ele lista propriedades, lê os atributos aplicados e serializa qualquer objeto anotado num texto — sem conhecer o tipo.',
      requirements: [
        'O desafio precisa da capacidade `reflection`.',
        '`Descrever` funciona para qualquer tipo, listando nome, tipo e descrição de cada propriedade.',
        '`Serializar` produz `nome=valor` para cada propriedade pública, na ordem de declaração.',
        '`Validar` aplica as regras dos atributos `Validacao` e devolve a lista de erros.',
        '`DefinirPorNome` altera uma propriedade pelo nome, devolvendo `false` quando ela não existe.',
        '`ContarAnotadas` conta quantas propriedades têm um dado atributo.',
        'A lista de erros nunca é nula.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Property)]
class DescricaoAttribute : Attribute
{
    public string Texto { get; }
    public DescricaoAttribute(string texto) => Texto = texto;
}

[AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
class ValidacaoAttribute : Attribute
{
    public string Regra { get; }
    public ValidacaoAttribute(string regra) => Regra = regra;
}

[Descricao("Produto do catalogo")]
class Produto
{
    [Descricao("Codigo unico")]
    [Validacao("obrigatorio")]
    [Validacao("tamanho:5")]
    public string Codigo { get; set; } = "";

    [Descricao("Preco em reais")]
    [Validacao("positivo")]
    public decimal Preco { get; set; }

    public int Estoque { get; set; }
}

[Descricao("Cliente cadastrado")]
class Cliente
{
    [Descricao("Nome completo")]
    [Validacao("obrigatorio")]
    public string Nome { get; set; } = "";

    public string Email { get; set; } = "";
}

class Program
{
    // TODO: "<tipo>: <descricao da classe>" seguido de uma linha por propriedade
    static string Descrever(Type tipo)
    {
        return "";
    }

    // TODO: "nome=valor" separados por ";"
    static string Serializar(object alvo)
    {
        return "";
    }

    // TODO: aplica as regras: obrigatorio (string vazia), tamanho:N, positivo
    static List<string> Validar(object alvo)
    {
        return new List<string>();
    }

    // TODO: define a propriedade pelo nome; false quando nao existe ou nao tem set
    static bool DefinirPorNome(object alvo, string propriedade, object valor)
    {
        return false;
    }

    // TODO: quantas propriedades tem o atributo T
    static int ContarAnotadas<T>(Type tipo) where T : Attribute
    {
        return 0;
    }

    static void Main()
    {
        Console.WriteLine(Descrever(typeof(Produto)));
        Console.WriteLine(Descrever(typeof(Cliente)));

        var p = new Produto { Codigo = "ABC12", Preco = 19.9m, Estoque = 7 };
        Console.WriteLine($"serializado: {Serializar(p)}");

        var c = new Cliente { Nome = "Ana", Email = "ana@x.dev" };
        Console.WriteLine($"serializado: {Serializar(c)}");

        Console.WriteLine($"erros validos: {Validar(p).Count}");

        var invalido = new Produto { Codigo = "AB", Preco = -1m };
        var erros = Validar(invalido);
        Console.WriteLine($"erros: {erros.Count}");

        foreach (string e in erros)
        {
            Console.WriteLine($"  {e}");
        }

        Console.WriteLine($"define preco: {DefinirPorNome(p, "Preco", 50m)}");
        Console.WriteLine($"apos definir: {p.Preco}");
        Console.WriteLine($"define inexistente: {DefinirPorNome(p, "Nada", 1)}");

        Console.WriteLine($"produto anotadas descricao: {ContarAnotadas<DescricaoAttribute>(typeof(Produto))}");
        Console.WriteLine($"produto anotadas validacao: {ContarAnotadas<ValidacaoAttribute>(typeof(Produto))}");
        Console.WriteLine($"cliente anotadas validacao: {ContarAnotadas<ValidacaoAttribute>(typeof(Cliente))}");

        Console.WriteLine($"tipo dinamico: {((object)p).GetType().Name}");
        Console.WriteLine($"propriedades: {typeof(Produto).GetProperties().Length}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Property)]
class DescricaoAttribute : Attribute
{
    public string Texto { get; }
    public DescricaoAttribute(string texto) => Texto = texto;
}

[AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
class ValidacaoAttribute : Attribute
{
    public string Regra { get; }
    public ValidacaoAttribute(string regra) => Regra = regra;
}

[Descricao("Produto do catalogo")]
class Produto
{
    [Descricao("Codigo unico")]
    [Validacao("obrigatorio")]
    [Validacao("tamanho:5")]
    public string Codigo { get; set; } = "";

    [Descricao("Preco em reais")]
    [Validacao("positivo")]
    public decimal Preco { get; set; }

    public int Estoque { get; set; }
}

[Descricao("Cliente cadastrado")]
class Cliente
{
    [Descricao("Nome completo")]
    [Validacao("obrigatorio")]
    public string Nome { get; set; } = "";

    public string Email { get; set; } = "";
}

class Program
{
    static string Descrever(Type tipo)
    {
        var classe = tipo.GetCustomAttribute<DescricaoAttribute>();
        var linhas = new List<string> { $"{tipo.Name}: {classe?.Texto ?? "sem descricao"}" };

        foreach (PropertyInfo p in tipo.GetProperties())
        {
            var d = p.GetCustomAttribute<DescricaoAttribute>();
            linhas.Add($"  {p.Name} ({p.PropertyType.Name}): {d?.Texto ?? "sem descricao"}");
        }

        return string.Join(Environment.NewLine, linhas);
    }

    static string Serializar(object alvo)
    {
        var partes = new List<string>();

        foreach (PropertyInfo p in alvo.GetType().GetProperties())
        {
            partes.Add($"{p.Name}={p.GetValue(alvo)}");
        }

        return string.Join(";", partes);
    }

    static List<string> Validar(object alvo)
    {
        var erros = new List<string>();

        foreach (PropertyInfo p in alvo.GetType().GetProperties())
        {
            object valor = p.GetValue(alvo);

            foreach (ValidacaoAttribute regra in p.GetCustomAttributes<ValidacaoAttribute>())
            {
                if (regra.Regra == "obrigatorio" && string.IsNullOrEmpty(valor as string))
                {
                    erros.Add($"{p.Name}: obrigatorio");
                }

                if (regra.Regra.StartsWith("tamanho:"))
                {
                    int esperado = int.Parse(regra.Regra.Substring("tamanho:".Length));

                    if (valor is string texto && texto.Length != esperado)
                    {
                        erros.Add($"{p.Name}: tamanho deve ser {esperado}");
                    }
                }

                if (regra.Regra == "positivo" && valor is decimal numero && numero <= 0)
                {
                    erros.Add($"{p.Name}: deve ser positivo");
                }
            }
        }

        return erros;
    }

    static bool DefinirPorNome(object alvo, string propriedade, object valor)
    {
        PropertyInfo p = alvo.GetType().GetProperty(propriedade);

        if (p == null || !p.CanWrite)
        {
            return false;
        }

        p.SetValue(alvo, valor);
        return true;
    }

    static int ContarAnotadas<T>(Type tipo) where T : Attribute
    {
        int total = 0;

        foreach (PropertyInfo p in tipo.GetProperties())
        {
            if (p.GetCustomAttributes<T>().Any())
            {
                total++;
            }
        }

        return total;
    }

    static void Main()
    {
        Console.WriteLine(Descrever(typeof(Produto)));
        Console.WriteLine(Descrever(typeof(Cliente)));

        var p = new Produto { Codigo = "ABC12", Preco = 19.9m, Estoque = 7 };
        Console.WriteLine($"serializado: {Serializar(p)}");

        var c = new Cliente { Nome = "Ana", Email = "ana@x.dev" };
        Console.WriteLine($"serializado: {Serializar(c)}");

        Console.WriteLine($"erros validos: {Validar(p).Count}");

        var invalido = new Produto { Codigo = "AB", Preco = -1m };
        var erros = Validar(invalido);
        Console.WriteLine($"erros: {erros.Count}");

        foreach (string e in erros)
        {
            Console.WriteLine($"  {e}");
        }

        Console.WriteLine($"define preco: {DefinirPorNome(p, "Preco", 50m)}");
        Console.WriteLine($"apos definir: {p.Preco}");
        Console.WriteLine($"define inexistente: {DefinirPorNome(p, "Nada", 1)}");

        Console.WriteLine($"produto anotadas descricao: {ContarAnotadas<DescricaoAttribute>(typeof(Produto))}");
        Console.WriteLine($"produto anotadas validacao: {ContarAnotadas<ValidacaoAttribute>(typeof(Produto))}");
        Console.WriteLine($"cliente anotadas validacao: {ContarAnotadas<ValidacaoAttribute>(typeof(Cliente))}");

        Console.WriteLine($"tipo dinamico: {((object)p).GetType().Name}");
        Console.WriteLine($"propriedades: {typeof(Produto).GetProperties().Length}");
    }
}`,
      hints: [
        '`p.GetCustomAttribute<T>()` devolve `null` quando o atributo não existe — o `?.` e o `??` resolvem o caso.',
        '`GetValue` devolve `object`, então `valor is string texto` e `valor is decimal numero` fazem a checagem e a conversão de uma vez.',
        '`p.CanWrite` é `false` para propriedades só de leitura, e evita a exceção do `SetValue`.',
        '`GetProperties()` devolve as propriedades na ordem de declaração para tipos simples — é o que garante a ordem da serialização.',
      ],
      capabilities: ['reflection'],
      tests: [
        {
          name: 'Descritor genérico',
          expectedStdout:
            'Produto: Produto do catalogo\n' +
            '  Codigo (String): Codigo unico\n' +
            '  Preco (Decimal): Preco em reais\n' +
            '  Estoque (Int32): sem descricao\n' +
            'Cliente: Cliente cadastrado\n' +
            '  Nome (String): Nome completo\n' +
            '  Email (String): sem descricao\n' +
            'serializado: Codigo=ABC12;Preco=19.9;Estoque=7\n' +
            'serializado: Nome=Ana;Email=ana@x.dev\n' +
            'erros validos: 0\n' +
            'erros: 2\n' +
            '  Codigo: tamanho deve ser 5\n' +
            '  Preco: deve ser positivo\n' +
            'define preco: True\napos definir: 50\ndefine inexistente: False\n' +
            'produto anotadas descricao: 2\nproduto anotadas validacao: 2\ncliente anotadas validacao: 1\n' +
            'tipo dinamico: Produto\npropriedades: 3',
        },
      ],
    },
  },

  {
    id: 's08c07l03',
    title: 'Atributos customizados',
    objective: 'Projetar atributos próprios que carregam configuração e alimentam um processador genérico.',
    concept: [
      {
        kind: 'text',
        body:
          'As duas lições anteriores mostraram as peças. Aqui elas se juntam num padrão que aparece em praticamente toda biblioteca de infraestrutura: **anotar o modelo e processar genericamente**.',
      },
      {
        kind: 'text',
        body: 'Um atributo bem projetado responde a três perguntas antes de ser escrito:',
      },
      {
        kind: 'table',
        headers: ['Pergunta', 'Decisão'],
        rows: [
          ['onde pode ser aplicado?', '`AttributeTargets` no `AttributeUsage`'],
          ['pode repetir no mesmo membro?', '`AllowMultiple`'],
          ['classes derivadas o herdam?', '`Inherited`'],
        ],
      },
      {
        kind: 'code',
        code: `[AttributeUsage(
    AttributeTargets.Property,
    AllowMultiple = true,
    Inherited = false)]
class RegraAttribute : Attribute
{
    public string Nome { get; }
    public int Limite { get; set; } = -1;
    public string Mensagem { get; set; } = "";

    public RegraAttribute(string nome)
    {
        Nome = nome;
    }
}`,
        caption: 'O obrigatório vai no construtor; o opcional vira propriedade com valor padrão.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A divisão entre construtor e propriedade **é** a divisão entre obrigatório e opcional. Um atributo cujo construtor pede cinco argumentos é tão desagradável de usar quanto um método com cinco parâmetros posicionais.',
      },
      {
        kind: 'text',
        body:
          'O processador é o outro lado do par. Ele lê os atributos, aplica a lógica, e nunca precisa saber quais tipos existem.',
      },
      {
        kind: 'code',
        code: `static List<string> Aplicar(object alvo)
{
    var erros = new List<string>();

    foreach (var p in alvo.GetType().GetProperties())
    {
        object valor = p.GetValue(alvo);

        foreach (var regra in p.GetCustomAttributes<RegraAttribute>())
        {
            string erro = Avaliar(regra, p.Name, valor);

            if (erro != null)
            {
                erros.Add(erro);
            }
        }
    }

    return erros;
}`,
        caption: 'Adicionar uma propriedade anotada ao modelo não exige tocar nesta função.',
      },
      {
        kind: 'compare',
        good: `// declarativo: a regra fica
// junto do dado que ela descreve
[Regra("obrigatorio")]
[Regra("tamanho", Limite = 5)]
public string Codigo { get; set; }`,
        bad: `// imperativo: a regra vive longe,
// e some quando alguem esquece
if (string.IsNullOrEmpty(p.Codigo))
    erros.Add("codigo obrigatorio");
if (p.Codigo.Length != 5)
    erros.Add("codigo tamanho 5");`,
        goodLabel: 'Regra junto do dado',
        badLabel: 'Regra em outro arquivo',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A troca não é gratuita. A versão declarativa **perde verificação em tempo de compilação**: `[Regra("tamnaho")]` com erro de digitação compila perfeitamente e falha em silêncio. Um `enum` no lugar da `string` recupera parte dessa segurança.',
      },
      {
        kind: 'text',
        body:
          'Quando vale a pena? A conta é simples: quanto mais tipos usam a mesma lógica, mais o processador genérico se paga.',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Vale a pena?'],
        rows: [
          ['1 ou 2 tipos, regras simples', 'não — escreva o `if`'],
          ['muitos tipos, mesma lógica', 'sim'],
          ['a regra precisa aparecer na documentação', 'sim'],
          ['a regra depende de outro campo', 'não — atributos não veem o objeto'],
          ['caminho quente, chamado em laço', 'não — reflexão é lenta'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Se o processamento acontece muitas vezes, faça a reflexão **uma vez** e guarde o resultado num dicionário estático por tipo — exatamente o cache genérico do capítulo 1. Assim o custo é pago só na primeira chamada.',
      },
    ],
    quiz: [
      {
        id: 's08c07l03q1',
        type: 'single',
        prompt: 'O que deve ir no construtor de um atributo, e o que deve ser propriedade?',
        options: [
          { id: 'a', text: 'Construtor para o obrigatório, propriedade para o opcional', correct: true },
          { id: 'b', text: 'Construtor para strings, propriedade para números' },
          { id: 'c', text: 'Tudo no construtor, sempre' },
          { id: 'd', text: 'Tudo em propriedades, sempre' },
        ],
        explanation:
          'Argumentos posicionais são exigidos pelo compilador; nomeados são opcionais. A escolha do autor do atributo define a experiência de quem o aplica.',
      },
      {
        id: 's08c07l03q2',
        type: 'single',
        prompt: 'Qual a principal desvantagem de regras declarativas por atributo?',
        options: [
          { id: 'a', text: 'Perdem verificação em tempo de compilação: um nome errado compila e falha em silêncio', correct: true },
          { id: 'b', text: 'Não podem ser lidas em execução' },
          { id: 'c', text: 'Só funcionam em classes públicas' },
          { id: 'd', text: 'Não permitem múltiplas regras no mesmo membro' },
        ],
        explanation:
          'A string do atributo não é validada por ninguém. Usar um `enum` em vez de `string` recupera boa parte dessa segurança.',
      },
      {
        id: 's08c07l03q3',
        type: 'single',
        prompt: 'Quando **não** usar o padrão de atributo + reflexão?',
        options: [
          { id: 'a', text: 'Quando a regra depende de outro campo do mesmo objeto', correct: true },
          { id: 'b', text: 'Quando há muitos tipos com a mesma lógica' },
          { id: 'c', text: 'Quando a regra precisa aparecer na documentação' },
          { id: 'd', text: 'Quando o processamento acontece na inicialização' },
        ],
        explanation:
          'Um atributo descreve **um membro**, isoladamente. Regras que cruzam campos — "data de fim depois da de início" — não cabem nele e ficam melhores como validação explícita.',
      },
    ],
    challenge: {
      brief:
        'Construa um validador declarativo completo: atributos que carregam configuração, um processador genérico que os aplica, e um cache por tipo para não repetir a reflexão.',
      requirements: [
        'O desafio precisa da capacidade `reflection`.',
        '`RegraAttribute` recebe o nome por construtor e tem `Limite` e `Mensagem` opcionais.',
        'O validador suporta as regras `obrigatorio`, `minimo`, `maximo` e `tamanho`.',
        'Quando `Mensagem` é definida, ela substitui a mensagem padrão.',
        '`Validador` guarda a reflexão num cache estático por tipo e conta quantas vezes refletiu.',
        'Validar o mesmo tipo duas vezes deve refletir uma vez só.',
        'A lista de erros nunca é nula.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

[AttributeUsage(AttributeTargets.Property, AllowMultiple = true, Inherited = false)]
class RegraAttribute : Attribute
{
    public string Nome { get; }
    public int Limite { get; set; } = -1;
    public string Mensagem { get; set; } = "";

    public RegraAttribute(string nome) => Nome = nome;
}

class Cadastro
{
    [Regra("obrigatorio")]
    [Regra("tamanho", Limite = 5, Mensagem = "codigo precisa ter 5 caracteres")]
    public string Codigo { get; set; } = "";

    [Regra("obrigatorio")]
    public string Nome { get; set; } = "";

    [Regra("minimo", Limite = 0)]
    [Regra("maximo", Limite = 120)]
    public int Idade { get; set; }

    public string Observacao { get; set; } = "";
}

class Produto
{
    [Regra("obrigatorio")]
    public string Titulo { get; set; } = "";

    [Regra("minimo", Limite = 1)]
    public int Quantidade { get; set; }
}

class Validador
{
    private static readonly Dictionary<Type, List<(PropertyInfo Propriedade, RegraAttribute Regra)>> cache = new();

    public static int Reflexoes { get; private set; }

    // TODO: monta (ou reusa do cache) a lista de pares propriedade/regra
    private static List<(PropertyInfo, RegraAttribute)> RegrasDe(Type tipo)
    {
        return new List<(PropertyInfo, RegraAttribute)>();
    }

    // TODO: aplica todas as regras e devolve os erros
    public static List<string> Validar(object alvo)
    {
        return new List<string>();
    }

    // TODO: avalia uma regra; devolve null quando passa
    private static string Avaliar(RegraAttribute regra, string propriedade, object valor)
    {
        return null;
    }
}

class Program
{
    static void Main()
    {
        var valido = new Cadastro { Codigo = "ABC12", Nome = "Ana", Idade = 30 };
        Console.WriteLine($"valido: {Validador.Validar(valido).Count} erros");
        Console.WriteLine($"reflexoes: {Validador.Reflexoes}");

        var invalido = new Cadastro { Codigo = "AB", Nome = "", Idade = 200 };
        var erros = Validador.Validar(invalido);
        Console.WriteLine($"invalido: {erros.Count} erros");

        foreach (string e in erros)
        {
            Console.WriteLine($"  {e}");
        }

        Console.WriteLine($"reflexoes apos segundo: {Validador.Reflexoes}");

        var produto = new Produto { Titulo = "", Quantidade = 0 };
        var errosProduto = Validador.Validar(produto);
        Console.WriteLine($"produto: {errosProduto.Count} erros");

        foreach (string e in errosProduto)
        {
            Console.WriteLine($"  {e}");
        }

        Console.WriteLine($"reflexoes com dois tipos: {Validador.Reflexoes}");

        var produtoOk = new Produto { Titulo = "Cafe", Quantidade = 3 };
        Console.WriteLine($"produto ok: {Validador.Validar(produtoOk).Count} erros");
        Console.WriteLine($"reflexoes finais: {Validador.Reflexoes}");

        var negativo = new Cadastro { Codigo = "XYZ99", Nome = "Bruno", Idade = -5 };
        Console.WriteLine($"idade negativa: {string.Join(" | ", Validador.Validar(negativo))}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

[AttributeUsage(AttributeTargets.Property, AllowMultiple = true, Inherited = false)]
class RegraAttribute : Attribute
{
    public string Nome { get; }
    public int Limite { get; set; } = -1;
    public string Mensagem { get; set; } = "";

    public RegraAttribute(string nome) => Nome = nome;
}

class Cadastro
{
    [Regra("obrigatorio")]
    [Regra("tamanho", Limite = 5, Mensagem = "codigo precisa ter 5 caracteres")]
    public string Codigo { get; set; } = "";

    [Regra("obrigatorio")]
    public string Nome { get; set; } = "";

    [Regra("minimo", Limite = 0)]
    [Regra("maximo", Limite = 120)]
    public int Idade { get; set; }

    public string Observacao { get; set; } = "";
}

class Produto
{
    [Regra("obrigatorio")]
    public string Titulo { get; set; } = "";

    [Regra("minimo", Limite = 1)]
    public int Quantidade { get; set; }
}

class Validador
{
    private static readonly Dictionary<Type, List<(PropertyInfo Propriedade, RegraAttribute Regra)>> cache = new();

    public static int Reflexoes { get; private set; }

    private static List<(PropertyInfo, RegraAttribute)> RegrasDe(Type tipo)
    {
        if (cache.TryGetValue(tipo, out var existente))
        {
            return existente;
        }

        Reflexoes++;
        var lista = new List<(PropertyInfo, RegraAttribute)>();

        foreach (PropertyInfo p in tipo.GetProperties())
        {
            foreach (RegraAttribute regra in p.GetCustomAttributes<RegraAttribute>())
            {
                lista.Add((p, regra));
            }
        }

        cache[tipo] = lista;
        return lista;
    }

    public static List<string> Validar(object alvo)
    {
        var erros = new List<string>();

        foreach (var (propriedade, regra) in RegrasDe(alvo.GetType()))
        {
            string erro = Avaliar(regra, propriedade.Name, propriedade.GetValue(alvo));

            if (erro != null)
            {
                erros.Add(erro);
            }
        }

        return erros;
    }

    private static string Avaliar(RegraAttribute regra, string propriedade, object valor)
    {
        string padrao;

        switch (regra.Nome)
        {
            case "obrigatorio":
                if (!string.IsNullOrWhiteSpace(valor as string))
                {
                    return null;
                }

                padrao = $"{propriedade}: obrigatorio";
                break;

            case "tamanho":
                if (valor is not string texto || texto.Length == regra.Limite)
                {
                    return null;
                }

                padrao = $"{propriedade}: tamanho deve ser {regra.Limite}";
                break;

            case "minimo":
                if (valor is not int menor || menor >= regra.Limite)
                {
                    return null;
                }

                padrao = $"{propriedade}: minimo {regra.Limite}";
                break;

            case "maximo":
                if (valor is not int maior || maior <= regra.Limite)
                {
                    return null;
                }

                padrao = $"{propriedade}: maximo {regra.Limite}";
                break;

            default:
                return null;
        }

        return regra.Mensagem == "" ? padrao : $"{propriedade}: {regra.Mensagem}";
    }
}

class Program
{
    static void Main()
    {
        var valido = new Cadastro { Codigo = "ABC12", Nome = "Ana", Idade = 30 };
        Console.WriteLine($"valido: {Validador.Validar(valido).Count} erros");
        Console.WriteLine($"reflexoes: {Validador.Reflexoes}");

        var invalido = new Cadastro { Codigo = "AB", Nome = "", Idade = 200 };
        var erros = Validador.Validar(invalido);
        Console.WriteLine($"invalido: {erros.Count} erros");

        foreach (string e in erros)
        {
            Console.WriteLine($"  {e}");
        }

        Console.WriteLine($"reflexoes apos segundo: {Validador.Reflexoes}");

        var produto = new Produto { Titulo = "", Quantidade = 0 };
        var errosProduto = Validador.Validar(produto);
        Console.WriteLine($"produto: {errosProduto.Count} erros");

        foreach (string e in errosProduto)
        {
            Console.WriteLine($"  {e}");
        }

        Console.WriteLine($"reflexoes com dois tipos: {Validador.Reflexoes}");

        var produtoOk = new Produto { Titulo = "Cafe", Quantidade = 3 };
        Console.WriteLine($"produto ok: {Validador.Validar(produtoOk).Count} erros");
        Console.WriteLine($"reflexoes finais: {Validador.Reflexoes}");

        var negativo = new Cadastro { Codigo = "XYZ99", Nome = "Bruno", Idade = -5 };
        Console.WriteLine($"idade negativa: {string.Join(" | ", Validador.Validar(negativo))}");
    }
}`,
      hints: [
        'O cache guarda a lista de pares `(propriedade, regra)` já resolvida — a reflexão acontece uma vez por tipo, não por objeto.',
        'Cada `case` do `switch` devolve `null` no caminho de sucesso e monta a mensagem padrão no de falha; a substituição por `Mensagem` acontece no final, num lugar só.',
        '`valor is not string texto` cobre o caso de a regra estar aplicada num tipo incompatível: em vez de lançar, a regra simplesmente não se aplica.',
        'O `Codigo` inválido tem duas regras: `obrigatorio` passa (não está vazio) e `tamanho` falha, com a mensagem customizada.',
      ],
      capabilities: ['reflection'],
      tests: [
        {
          name: 'Validador declarativo',
          expectedStdout:
            'valido: 0 erros\nreflexoes: 1\n' +
            'invalido: 3 erros\n' +
            '  Codigo: codigo precisa ter 5 caracteres\n' +
            '  Nome: obrigatorio\n' +
            '  Idade: maximo 120\n' +
            'reflexoes apos segundo: 1\n' +
            'produto: 2 erros\n' +
            '  Titulo: obrigatorio\n' +
            '  Quantidade: minimo 1\n' +
            'reflexoes com dois tipos: 2\n' +
            'produto ok: 0 erros\nreflexoes finais: 2\n' +
            'idade negativa: Idade: minimo 0',
        },
      ],
    },
  },

  {
    id: 's08c07l04',
    title: 'Top-level statements',
    objective: 'Escrever programas sem a cerimônia de `class Program` e `static void Main`.',
    concept: [
      {
        kind: 'text',
        body:
          'Desde o C# 9, um arquivo pode conter instruções diretamente, sem classe nem método. O compilador gera a classe e o `Main` por você.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Clássico',
          code: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("ola");
    }
}`,
        },
        right: {
          label: 'Top-level',
          code: `Console.WriteLine("ola");`,
        },
        note: 'Os dois produzem exatamente o mesmo assembly. A diferença é só de sintaxe.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Não é um modo especial nem um script: o compilador realmente gera uma classe com um `Main`. Por isso tudo o que vale num `Main` — argumentos, código assíncrono, retorno de código de saída — continua valendo.',
      },
      {
        kind: 'text',
        body:
          'Alguns elementos ficam disponíveis implicitamente, sem que você os declare:',
      },
      {
        kind: 'table',
        headers: ['Disponível', 'Equivale a'],
        rows: [
          ['`args`', 'o parâmetro `string[] args` do `Main`'],
          ['`await`', '`static async Task Main`'],
          ['`return 0;`', '`static int Main`'],
        ],
      },
      {
        kind: 'code',
        code: `Console.WriteLine($"argumentos: {args.Length}");

int Dobrar(int n) => n * 2;
Console.WriteLine(Dobrar(21));

record Registro(string Nome, int Valor);

Registro r = new("teste", 7);
Console.WriteLine(r);`,
      },
      {
        kind: 'output',
        code: `argumentos: 0
42
Registro { Nome = teste, Valor = 7 }`,
        caption: 'Funções locais e declarações de tipo convivem com as instruções no mesmo arquivo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A ordem importa: **as instruções vêm primeiro, as declarações de tipo depois**. Um `class` ou `record` no meio das instruções não compila — todas as declarações precisam vir ao final do arquivo.',
      },
      {
        kind: 'compare',
        good: `Console.WriteLine(Processar());

int Processar() => 42;

record Item(string Nome);`,
        bad: `Console.WriteLine("inicio");

record Item(string Nome);

Console.WriteLine("fim");
// erro: instrucao depois de declaracao`,
        goodLabel: 'Instruções, depois declarações',
        badLabel: 'Declaração no meio',
      },
      {
        kind: 'text',
        body: 'Há três restrições que valem lembrar:',
      },
      {
        kind: 'table',
        headers: ['Restrição', 'Motivo'],
        rows: [
          ['apenas **um** arquivo por projeto pode usar', 'só pode haver um ponto de entrada'],
          ['sem `namespace` envolvendo as instruções', 'a classe gerada fica no namespace global'],
          ['funções locais, não métodos', 'não há classe sua para hospedá-los'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Vale para programas pequenos, utilitários de linha de comando e exemplos. Num projeto grande, o `Main` explícito costuma ser melhor: ele documenta o ponto de entrada e dá lugar para a configuração de inicialização.',
      },
      {
        kind: 'text',
        body:
          'Combinado com os **global usings** da próxima lição, o top-level reduz um programa de dez linhas de cerimônia para uma linha de conteúdo — o que explica por que os templates modernos do .NET o adotaram por padrão.',
      },
    ],
    quiz: [
      {
        id: 's08c07l04q1',
        type: 'single',
        prompt: 'O que o compilador faz com um arquivo de top-level statements?',
        options: [
          { id: 'a', text: 'Gera uma classe com um método `Main` contendo as instruções', correct: true },
          { id: 'b', text: 'Interpreta o arquivo como script, sem compilar' },
          { id: 'c', text: 'Executa as instruções em tempo de compilação' },
          { id: 'd', text: 'Cria um método para cada instrução' },
        ],
        explanation:
          'O resultado é indistinguível do programa clássico. Por isso `args`, `await` e `return` de código de saída continuam funcionando.',
      },
      {
        id: 's08c07l04q2',
        type: 'single',
        prompt: 'Por que este código não compila?',
        code: `Console.WriteLine("inicio");
record Item(string Nome);
Console.WriteLine("fim");`,
        options: [
          { id: 'a', text: 'Instruções não podem vir depois de declarações de tipo', correct: true },
          { id: 'b', text: '`record` não pode ser declarado em top-level' },
          { id: 'c', text: 'Falta o `using System;`' },
          { id: 'd', text: 'Compila normalmente' },
        ],
        explanation:
          'Todas as instruções formam o corpo do `Main` gerado, e ele precisa ser contíguo. As declarações de tipo vão depois.',
      },
      {
        id: 's08c07l04q3',
        type: 'single',
        prompt: 'Quantos arquivos de um projeto podem usar top-level statements?',
        options: [
          { id: 'a', text: 'Apenas um', correct: true },
          { id: 'b', text: 'Todos' },
          { id: 'c', text: 'Nenhum, se houver um `Main` explícito em outro lugar' },
          { id: 'd', text: 'Até dois' },
        ],
        explanation:
          'Cada arquivo com top-level geraria um ponto de entrada, e um programa só pode ter um. É a mesma regra do `Main` explícito.',
      },
    ],
    challenge: {
      brief:
        'Escreva um utilitário de linha de comando inteiro em top-level statements: funções locais, tipos declarados ao final, e uso de `args`.',
      requirements: [
        'O programa **não** declara `class Program` nem `static void Main`.',
        'Todas as instruções vêm antes de qualquer declaração de tipo.',
        'Use funções locais em vez de métodos.',
        'Use `args` para demonstrar que ele está disponível.',
        'Declare ao menos um `record` e uma `enum`, ambos ao final do arquivo.',
        'O utilitário processa uma lista de itens e imprime um resumo agrupado.',
      ],
      starterCode: `// TODO: escreva o programa inteiro em top-level statements.
// Nada de class Program nem static void Main.

Console.WriteLine($"argumentos recebidos: {args.Length}");

// TODO: crie a lista de itens, processe e imprima o resumo.
// Use as funcoes locais e os tipos declarados no fim do arquivo.

// TODO: funcao local que devolve a categoria de um item pelo preco
// ate 10 -> Barato, ate 100 -> Medio, acima -> Caro

// TODO: funcao local que agrupa e conta por categoria

// TODO: funcao local que formata o resumo, ordenado por nome de categoria

// --- declaracoes de tipo (precisam vir depois de todas as instrucoes) ---

// TODO: record Item(string Nome, decimal Preco)
// TODO: enum Categoria { Barato, Medio, Caro }
`,
      solution: `Console.WriteLine($"argumentos recebidos: {args.Length}");

var itens = new List<Item>
{
    new Item("Cafe", 8.50m),
    new Item("Livro", 45m),
    new Item("Notebook", 3200m),
    new Item("Caneta", 3.90m),
    new Item("Fone", 250m),
    new Item("Adesivo", 2m),
};

Console.WriteLine($"itens: {itens.Count}");

foreach (Item item in itens)
{
    Console.WriteLine($"  {item.Nome}: {Classificar(item.Preco)}");
}

Dictionary<Categoria, int> contagem = Agrupar(itens);
Console.WriteLine("resumo:");
Console.WriteLine(Formatar(contagem));

Console.WriteLine($"total: {Total(itens):0.00}");
Console.WriteLine($"mais caro: {MaisCaro(itens).Nome}");
Console.WriteLine($"vazio: [{Formatar(Agrupar(new List<Item>()))}]");

Categoria Classificar(decimal preco) => preco switch
{
    <= 10m => Categoria.Barato,
    <= 100m => Categoria.Medio,
    _ => Categoria.Caro,
};

Dictionary<Categoria, int> Agrupar(List<Item> lista)
{
    var mapa = new Dictionary<Categoria, int>();

    foreach (Item item in lista)
    {
        Categoria c = Classificar(item.Preco);
        mapa[c] = mapa.TryGetValue(c, out int atual) ? atual + 1 : 1;
    }

    return mapa;
}

string Formatar(Dictionary<Categoria, int> mapa)
{
    var chaves = new List<Categoria>(mapa.Keys);
    chaves.Sort();

    var linhas = new List<string>();

    foreach (Categoria c in chaves)
    {
        linhas.Add($"  {c}={mapa[c]}");
    }

    return string.Join(Environment.NewLine, linhas);
}

decimal Total(List<Item> lista)
{
    decimal soma = 0;

    foreach (Item item in lista)
    {
        soma += item.Preco;
    }

    return soma;
}

Item MaisCaro(List<Item> lista)
{
    Item melhor = lista[0];

    foreach (Item item in lista)
    {
        if (item.Preco > melhor.Preco)
        {
            melhor = item;
        }
    }

    return melhor;
}

record Item(string Nome, decimal Preco);

enum Categoria { Barato, Medio, Caro }
`,
      hints: [
        'Funções locais podem ser declaradas **depois** de serem usadas — o compilador as resolve no arquivo inteiro, como métodos.',
        'Tipos (`record`, `enum`, `class`) precisam vir depois de todas as instruções, senão o compilador reclama de "instrução após declaração".',
        '`chaves.Sort()` num `List<Categoria>` ordena pelos valores do enum, que seguem a ordem de declaração: Barato, Medio, Caro.',
        'Os `using` de `System`, `System.Collections.Generic` e `System.Linq` já estão implícitos neste ambiente.',
      ],
      tests: [
        {
          name: 'Utilitário em top-level',
          expectedStdout:
            'argumentos recebidos: 0\n' +
            'itens: 6\n' +
            '  Cafe: Barato\n  Livro: Medio\n  Notebook: Caro\n' +
            '  Caneta: Barato\n  Fone: Caro\n  Adesivo: Barato\n' +
            'resumo:\n  Barato=3\n  Medio=1\n  Caro=2\n' +
            'total: 3509.40\nmais caro: Notebook\nvazio: []',
        },
      ],
    },
  },

  {
    id: 's08c07l05',
    title: 'Global usings',
    objective: 'Eliminar a repetição de `using` no topo de cada arquivo.',
    concept: [
      {
        kind: 'text',
        body:
          'Todo arquivo de um projeto costuma repetir os mesmos cinco ou seis `using`. O modificador **`global`** declara uma importação uma vez e a aplica ao projeto inteiro.',
      },
      {
        kind: 'code',
        code: `global using System;
global using System.Collections.Generic;
global using System.Linq;`,
        caption: 'A convenção é concentrar todos num arquivo próprio, geralmente chamado `GlobalUsings.cs`.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Sem global usings',
          code: `// em cada um dos 200 arquivos:
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Servicos;`,
        },
        right: {
          label: 'Com global usings',
          code: `// GlobalUsings.cs, uma vez:
global using System;
global using System.Collections.Generic;
global using System.Linq;
global using System.Threading.Tasks;

// nos outros 199 arquivos:
namespace App.Servicos;`,
        },
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Os templates modernos do .NET já ativam os **implicit usings**: uma opção do projeto que declara automaticamente os namespaces mais comuns para o tipo de aplicação. Este ambiente também os tem — é por isso que `List<T>` e `Sum()` funcionam sem `using`.',
      },
      {
        kind: 'text',
        body:
          'A forma `global using static` importa os **membros estáticos** de um tipo, permitindo chamá-los sem qualificar.',
      },
      {
        kind: 'code',
        code: `global using static System.Math;

double h = Sqrt(Pow(3, 2) + Pow(4, 2));`,
        caption: 'Sem o `static`, seria `Math.Sqrt(Math.Pow(...))`.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`using static` é o recurso mais fácil de exagerar. Importar `System.Math` globalmente faz `Max`, `Min` e `Abs` aparecerem soltos em todo arquivo — e quem lê perde a pista de onde vieram.',
      },
      {
        kind: 'text',
        body:
          'A terceira forma é o **alias**, que dá um nome curto a um tipo longo ou desfaz um conflito de nomes.',
      },
      {
        kind: 'code',
        code: `global using Config = App.Infra.Configuracao.ConfiguracaoDoServico;
global using ListaDeIds = System.Collections.Generic.List<int>;`,
        caption: 'Desde o C# 12, o alias também aceita tipos genéricos fechados e tuplas.',
      },
      {
        kind: 'text',
        body: 'A regra prática para decidir o que vira global é a frequência de uso:',
      },
      {
        kind: 'table',
        headers: ['Namespace', 'Global?'],
        rows: [
          ['`System`, `System.Collections.Generic`, `System.Linq`', 'sim — usados em quase tudo'],
          ['namespaces do próprio projeto muito usados', 'sim'],
          ['`System.Text.Json`, usado em três arquivos', 'não'],
          ['`using static` de qualquer tipo', 'raramente'],
        ],
      },
      {
        kind: 'compare',
        good: `// GlobalUsings.cs
global using System;
global using System.Collections.Generic;
global using System.Linq;
global using App.Dominio;`,
        bad: `// GlobalUsings.cs
global using System;
// ... 40 linhas depois ...
global using static App.Util.Helpers;
global using static System.Math;
global using static System.Console;`,
        goodLabel: 'Poucos e frequentes',
        badLabel: 'Tudo importado globalmente',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'O custo dos global usings aparece na leitura: um tipo desconhecido no meio do arquivo não tem mais um `using` local que explique de onde ele veio. Manter a lista curta é o que mantém esse custo baixo.',
      },
    ],
    quiz: [
      {
        id: 's08c07l05q1',
        type: 'single',
        prompt: 'Qual o efeito de `global using System.Linq;`?',
        options: [
          { id: 'a', text: 'O namespace fica importado em todos os arquivos do projeto', correct: true },
          { id: 'b', text: 'O namespace é importado apenas no arquivo atual' },
          { id: 'c', text: 'Os tipos do namespace são incluídos no assembly' },
          { id: 'd', text: 'Os membros estáticos ficam disponíveis sem qualificação' },
        ],
        explanation:
          'É uma importação de escopo de projeto. A última opção descreve `global using static`, que é outra coisa.',
      },
      {
        id: 's08c07l05q2',
        type: 'single',
        prompt: 'Por que evitar `global using static System.Math;`?',
        options: [
          { id: 'a', text: '`Max`, `Min` e `Abs` passam a aparecer soltos em todo arquivo, sem pista de origem', correct: true },
          { id: 'b', text: 'Porque `Math` não tem membros estáticos' },
          { id: 'c', text: 'Porque aumenta o tamanho do assembly' },
          { id: 'd', text: 'Porque `using static` não pode ser global' },
        ],
        explanation:
          'O ganho é digitar `Sqrt` em vez de `Math.Sqrt`; o custo é que quem lê o código não sabe mais de onde `Sqrt` veio, no projeto inteiro.',
      },
      {
        id: 's08c07l05q3',
        type: 'single',
        prompt: 'Por que este ambiente reconhece `List<T>` sem nenhum `using`?',
        options: [
          { id: 'a', text: 'Os implicit usings do projeto já declaram os namespaces comuns', correct: true },
          { id: 'b', text: '`List<T>` está no namespace global' },
          { id: 'c', text: 'O compilador resolve tipos genéricos automaticamente' },
          { id: 'd', text: 'Porque `List<T>` é uma palavra-chave' },
        ],
        explanation:
          'É a mesma opção que os templates do .NET ativam por padrão: um conjunto de `global using` gerado automaticamente conforme o tipo de projeto.',
      },
    ],
    challenge: {
      brief:
        'Use `global using` no topo do arquivo para importar um namespace e criar aliases, e escreva um pequeno módulo que se beneficia deles.',
      requirements: [
        'Declare ao menos um `global using` de namespace e um alias.',
        'Os `global using` precisam vir antes de qualquer outra declaração do arquivo.',
        'Use o alias no lugar do tipo completo em toda a solução.',
        '`Registrar` e `Resumir` operam sobre o tipo com alias.',
        'Demonstre `using static` num escopo controlado, não global.',
        'O programa monta e imprime um relatório usando os tipos importados.',
      ],
      starterCode: `// TODO: declare os global usings aqui, antes de tudo.
//  - um namespace (por exemplo System.Text)
//  - um alias para List<string>
//  - um alias para Dictionary<string, int>

using static System.Math;

class Inventario
{
    private readonly Contagem contagem = new();
    private readonly Nomes nomes = new();

    // TODO: registra o item; incrementa a contagem e guarda o nome uma vez
    public void Registrar(string nome, int quantidade)
    {
    }

    // TODO: StringBuilder, uma linha por nome em ordem alfabetica
    public string Resumir()
    {
        return "";
    }

    // TODO: maior quantidade registrada; 0 quando vazio
    public int Maior()
    {
        return 0;
    }

    public int Distintos => nomes.Count;
}

class Program
{
    static void Main()
    {
        var inv = new Inventario();

        inv.Registrar("cafe", 3);
        inv.Registrar("cha", 5);
        inv.Registrar("cafe", 2);
        inv.Registrar("acucar", 1);

        Console.WriteLine($"distintos: {inv.Distintos}");
        Console.WriteLine("resumo:");
        Console.WriteLine(inv.Resumir());
        Console.WriteLine($"maior: {inv.Maior()}");

        Console.WriteLine($"raiz: {Sqrt(16)}");
        Console.WriteLine($"maximo: {Max(3, 7)}");
        Console.WriteLine($"absoluto: {Abs(-5)}");

        var vazio = new Inventario();
        Console.WriteLine($"vazio distintos: {vazio.Distintos}");
        Console.WriteLine($"vazio resumo: [{vazio.Resumir()}]");
        Console.WriteLine($"vazio maior: {vazio.Maior()}");

        Nomes lista = new() { "z", "a" };
        lista.Sort(StringComparer.Ordinal);
        Console.WriteLine($"alias funciona: {string.Join(",", lista)}");

        Contagem mapa = new() { ["x"] = 1 };
        Console.WriteLine($"alias de mapa: {mapa["x"]}");
    }
}`,
      solution: `global using System.Text;
global using Nomes = System.Collections.Generic.List<string>;
global using Contagem = System.Collections.Generic.Dictionary<string, int>;

using static System.Math;

class Inventario
{
    private readonly Contagem contagem = new();
    private readonly Nomes nomes = new();

    public void Registrar(string nome, int quantidade)
    {
        if (contagem.TryGetValue(nome, out int atual))
        {
            contagem[nome] = atual + quantidade;
            return;
        }

        contagem[nome] = quantidade;
        nomes.Add(nome);
    }

    public string Resumir()
    {
        var ordenados = new Nomes(nomes);
        ordenados.Sort(StringComparer.Ordinal);

        var construtor = new StringBuilder();

        foreach (string nome in ordenados)
        {
            construtor.AppendLine($"  {nome}={contagem[nome]}");
        }

        return construtor.ToString().TrimEnd();
    }

    public int Maior()
    {
        int melhor = 0;

        foreach (int valor in contagem.Values)
        {
            melhor = Max(melhor, valor);
        }

        return melhor;
    }

    public int Distintos => nomes.Count;
}

class Program
{
    static void Main()
    {
        var inv = new Inventario();

        inv.Registrar("cafe", 3);
        inv.Registrar("cha", 5);
        inv.Registrar("cafe", 2);
        inv.Registrar("acucar", 1);

        Console.WriteLine($"distintos: {inv.Distintos}");
        Console.WriteLine("resumo:");
        Console.WriteLine(inv.Resumir());
        Console.WriteLine($"maior: {inv.Maior()}");

        Console.WriteLine($"raiz: {Sqrt(16)}");
        Console.WriteLine($"maximo: {Max(3, 7)}");
        Console.WriteLine($"absoluto: {Abs(-5)}");

        var vazio = new Inventario();
        Console.WriteLine($"vazio distintos: {vazio.Distintos}");
        Console.WriteLine($"vazio resumo: [{vazio.Resumir()}]");
        Console.WriteLine($"vazio maior: {vazio.Maior()}");

        Nomes lista = new() { "z", "a" };
        lista.Sort(StringComparer.Ordinal);
        Console.WriteLine($"alias funciona: {string.Join(",", lista)}");

        Contagem mapa = new() { ["x"] = 1 };
        Console.WriteLine($"alias de mapa: {mapa["x"]}");
    }
}`,
      hints: [
        'Os `global using` precisam ser as primeiras declarações do arquivo — antes até dos `using` comuns.',
        'Um alias de tipo genérico fechado (`List<string>`) exige o nome totalmente qualificado do lado direito.',
        '`global using System.Text` é o que torna `StringBuilder` visível sem `using` local.',
        '`using static System.Math` fica em escopo de arquivo aqui — é a forma controlada, em contraste com a versão global desaconselhada na lição.',
      ],
      tests: [
        {
          name: 'Importações globais',
          expectedStdout:
            'distintos: 3\n' +
            'resumo:\n  acucar=1\n  cafe=5\n  cha=5\n' +
            'maior: 5\n' +
            'raiz: 4\nmaximo: 7\nabsoluto: 5\n' +
            'vazio distintos: 0\nvazio resumo: []\nvazio maior: 0\n' +
            'alias funciona: a,z\nalias de mapa: 1',
        },
      ],
    },
  },

  {
    id: 's08c07l06',
    title: 'Construtores primários',
    objective: 'Declarar parâmetros de construtor junto ao nome do tipo e usá-los em todo o corpo.',
    concept: [
      {
        kind: 'text',
        body:
          'Desde o C# 12, qualquer `class` ou `struct` pode declarar parâmetros junto ao nome — como um `record` posicional já fazia. Esses parâmetros ficam visíveis no corpo inteiro do tipo.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Clássico',
          code: `class Pedido
{
    private readonly string cliente;
    private readonly decimal valor;

    public Pedido(string cliente, decimal valor)
    {
        this.cliente = cliente;
        this.valor = valor;
    }

    public string Resumo()
        => $"{cliente}: {valor:0.00}";
}`,
        },
        right: {
          label: 'Construtor primário',
          code: `class Pedido(string cliente, decimal valor)
{
    public string Resumo()
        => $"{cliente}: {valor:0.00}";
}`,
        },
        note: 'Doze linhas viram três. O compilador gera os campos de apoio conforme o uso.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A diferença crucial em relação a `record`: num `record` posicional, os parâmetros viram **propriedades públicas** automaticamente. Numa `class` ou `struct`, eles **não** viram nada público — são apenas parâmetros capturados.',
      },
      {
        kind: 'code',
        code: `class Pedido(string cliente, decimal valor)
{
    public string Cliente => cliente;
    public decimal Valor { get; } = valor;
}`,
        caption: 'Expor exige escrever a propriedade. As duas formas acima têm efeitos diferentes — veja abaixo.',
      },
      {
        kind: 'table',
        headers: ['Forma', 'O que acontece'],
        rows: [
          ['`public string Cliente => cliente;`', 'lê o campo capturado a cada acesso'],
          ['`public decimal Valor { get; } = valor;`', 'copia o valor uma vez, na construção'],
          ['usar `cliente` num método', 'usa o campo capturado'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Fazer as duas coisas com o mesmo parâmetro gera o aviso **CS9124**: o parâmetro é capturado num campo **e** usado para inicializar uma propriedade, criando duas cópias do mesmo dado. Escolha uma das duas.',
      },
      {
        kind: 'text',
        body:
          'Os parâmetros primários também alimentam a chamada à classe base e os inicializadores de campo.',
      },
      {
        kind: 'code',
        code: `class Pessoa(string nome)
{
    public string Nome => nome;
}

class Funcionario(string nome, decimal salario) : Pessoa(nome)
{
    public decimal Salario => salario;
}`,
        caption: 'A base é chamada na própria declaração, sem `: base(...)` num construtor separado.',
      },
      {
        kind: 'text',
        body:
          'A validação é o ponto fraco: não há corpo de construtor onde colocá-la. A saída é validar num inicializador de campo, que executa na construção.',
      },
      {
        kind: 'compare',
        good: `class Conta(string titular, decimal saldo)
{
    private readonly decimal validado =
        saldo >= 0
            ? saldo
            : throw new ArgumentException("saldo negativo");

    public decimal Saldo => validado;
}`,
        bad: `class Conta(string titular, decimal saldo)
{
    // nao ha onde validar:
    // sem corpo de construtor
    public decimal Saldo => saldo;
}`,
        goodLabel: 'Valida no inicializador',
        badLabel: 'Sem validação possível',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Quando a validação fica complexa, o construtor primário deixa de compensar. Ele é uma conveniência para tipos simples — não uma substituição universal do construtor explícito.',
      },
      {
        kind: 'text',
        body: 'A decisão entre as três formas fica assim:',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Escolha'],
        rows: [
          ['agregado de dados imutável', '`record` posicional'],
          ['classe com dependências e comportamento', '`class` com construtor primário'],
          ['construção com validação ou lógica', 'construtor explícito'],
          ['várias formas de construir', 'construtores sobrecarregados'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'O caso em que ele mais brilha é a injeção de dependência: `class Servico(IRepositorio repo, ILogger log)` elimina três campos e um construtor de seis linhas, sem perder nada.',
      },
    ],
    quiz: [
      {
        id: 's08c07l06q1',
        type: 'single',
        prompt: 'Numa `class` com construtor primário, os parâmetros viram propriedades públicas?',
        options: [
          { id: 'a', text: 'Não: são apenas parâmetros capturados; expor exige escrever a propriedade', correct: true },
          { id: 'b', text: 'Sim, sempre' },
          { id: 'c', text: 'Sim, mas somente de leitura' },
          { id: 'd', text: 'Somente se forem `readonly`' },
        ],
        explanation:
          'É a diferença em relação ao `record` posicional, que gera propriedades públicas com `init`. Em `class` e `struct`, o parâmetro fica privado ao corpo do tipo.',
      },
      {
        id: 's08c07l06q2',
        type: 'single',
        prompt: 'O que causa o aviso CS9124?',
        options: [
          { id: 'a', text: 'Capturar o parâmetro num campo **e** usá-lo para inicializar uma propriedade', correct: true },
          { id: 'b', text: 'Usar o parâmetro em mais de um método' },
          { id: 'c', text: 'Não expor o parâmetro publicamente' },
          { id: 'd', text: 'Chamar a classe base com o parâmetro' },
        ],
        explanation:
          'O resultado seriam duas cópias do mesmo dado, com risco de divergirem. A correção é escolher entre `=> parametro` e `{ get; } = parametro`.',
      },
      {
        id: 's08c07l06q3',
        type: 'single',
        prompt: 'Onde validar um parâmetro de construtor primário?',
        options: [
          { id: 'a', text: 'Num inicializador de campo, que executa durante a construção', correct: true },
          { id: 'b', text: 'Num método `Validar` chamado por quem constrói' },
          { id: 'c', text: 'Não é possível validar' },
          { id: 'd', text: 'Num atributo sobre o parâmetro' },
        ],
        explanation:
          'Não há corpo de construtor. Um inicializador com expressão condicional e `throw` funciona — mas se a validação crescer, o construtor explícito volta a ser a escolha certa.',
      },
    ],
    challenge: {
      brief:
        'Modele uma pequena hierarquia usando construtores primários: captura de parâmetros, chamada à base, validação em inicializador e exposição controlada.',
      requirements: [
        '`Pessoa`, `Funcionario` e `Gerente` usam construtores primários, com herança encadeada.',
        '`Conta` valida o saldo num inicializador de campo, lançando `ArgumentException` para negativo.',
        'Nenhum parâmetro deve ser capturado **e** usado para inicializar propriedade — sem avisos CS9124.',
        '`Servico` demonstra o caso de injeção de dependência.',
        '`Calculadora` usa um parâmetro primário em vários membros, incluindo uma propriedade calculada.',
        'Nenhum construtor explícito no código.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// TODO: construtor primario com nome
class Pessoa
{
    public string Nome => "";
    public virtual string Cargo => "pessoa";
    public override string ToString() => $"{Nome} ({Cargo})";
}

// TODO: construtor primario, herda de Pessoa passando o nome
class Funcionario : Pessoa
{
    public decimal Salario => 0;
    public override string Cargo => "funcionario";
}

// TODO: construtor primario, herda de Funcionario
class Gerente : Funcionario
{
    public int Equipe => 0;
    public override string Cargo => "gerente";
}

// TODO: construtor primario com validacao em inicializador de campo
class Conta
{
    public string Titular => "";
    public decimal Saldo => 0;
}

interface IRepositorio
{
    string Buscar(int id);
}

class RepositorioMemoria : IRepositorio
{
    public string Buscar(int id) => $"registro{id}";
}

// TODO: construtor primario recebendo IRepositorio e um prefixo
class Servico
{
    public string Processar(int id) => "";
}

// TODO: construtor primario com fator, usado em varios membros
class Calculadora
{
    public int Aplicar(int valor) => 0;
    public int Dobro => 0;
    public string Descrever() => "";
}

class Program
{
    static void Main()
    {
        var p = new Pessoa("Ana");
        var f = new Funcionario("Bruno", 5000m);
        var g = new Gerente("Carla", 9000m, 6);

        Console.WriteLine($"pessoa: {p}");
        Console.WriteLine($"funcionario: {f} salario={f.Salario}");
        Console.WriteLine($"gerente: {g} salario={g.Salario} equipe={g.Equipe}");

        var pessoas = new List<Pessoa> { p, f, g };

        foreach (Pessoa pessoa in pessoas)
        {
            Console.WriteLine($"  {pessoa.Nome}: {pessoa.Cargo}");
        }

        var conta = new Conta("Ana", 250m);
        Console.WriteLine($"conta: {conta.Titular} {conta.Saldo}");

        var zerada = new Conta("Bruno", 0m);
        Console.WriteLine($"zerada: {zerada.Saldo}");

        try
        {
            var invalida = new Conta("Carla", -10m);
            Console.WriteLine($"nao deveria: {invalida.Saldo}");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"erro: {ex.Message}");
        }

        var servico = new Servico(new RepositorioMemoria(), "PRE");
        Console.WriteLine($"servico: {servico.Processar(7)}");
        Console.WriteLine($"servico: {servico.Processar(9)}");

        var calc = new Calculadora(3);
        Console.WriteLine($"aplicar: {calc.Aplicar(5)}");
        Console.WriteLine($"dobro: {calc.Dobro}");
        Console.WriteLine($"descrever: {calc.Descrever()}");

        var neutra = new Calculadora(1);
        Console.WriteLine($"neutra: {neutra.Aplicar(42)} {neutra.Dobro}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Pessoa(string nome)
{
    public string Nome => nome;
    public virtual string Cargo => "pessoa";
    public override string ToString() => $"{Nome} ({Cargo})";
}

class Funcionario(string nome, decimal salario) : Pessoa(nome)
{
    public decimal Salario => salario;
    public override string Cargo => "funcionario";
}

class Gerente(string nome, decimal salario, int equipe) : Funcionario(nome, salario)
{
    public int Equipe => equipe;
    public override string Cargo => "gerente";
}

class Conta(string titular, decimal saldo)
{
    private readonly decimal validado = saldo >= 0
        ? saldo
        : throw new ArgumentException("saldo negativo");

    public string Titular => titular;
    public decimal Saldo => validado;
}

interface IRepositorio
{
    string Buscar(int id);
}

class RepositorioMemoria : IRepositorio
{
    public string Buscar(int id) => $"registro{id}";
}

class Servico(IRepositorio repositorio, string prefixo)
{
    public string Processar(int id) => $"{prefixo}:{repositorio.Buscar(id)}";
}

class Calculadora(int fator)
{
    public int Aplicar(int valor) => valor * fator;
    public int Dobro => fator * 2;
    public string Descrever() => $"multiplica por {fator}";
}

class Program
{
    static void Main()
    {
        var p = new Pessoa("Ana");
        var f = new Funcionario("Bruno", 5000m);
        var g = new Gerente("Carla", 9000m, 6);

        Console.WriteLine($"pessoa: {p}");
        Console.WriteLine($"funcionario: {f} salario={f.Salario}");
        Console.WriteLine($"gerente: {g} salario={g.Salario} equipe={g.Equipe}");

        var pessoas = new List<Pessoa> { p, f, g };

        foreach (Pessoa pessoa in pessoas)
        {
            Console.WriteLine($"  {pessoa.Nome}: {pessoa.Cargo}");
        }

        var conta = new Conta("Ana", 250m);
        Console.WriteLine($"conta: {conta.Titular} {conta.Saldo}");

        var zerada = new Conta("Bruno", 0m);
        Console.WriteLine($"zerada: {zerada.Saldo}");

        try
        {
            var invalida = new Conta("Carla", -10m);
            Console.WriteLine($"nao deveria: {invalida.Saldo}");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"erro: {ex.Message}");
        }

        var servico = new Servico(new RepositorioMemoria(), "PRE");
        Console.WriteLine($"servico: {servico.Processar(7)}");
        Console.WriteLine($"servico: {servico.Processar(9)}");

        var calc = new Calculadora(3);
        Console.WriteLine($"aplicar: {calc.Aplicar(5)}");
        Console.WriteLine($"dobro: {calc.Dobro}");
        Console.WriteLine($"descrever: {calc.Descrever()}");

        var neutra = new Calculadora(1);
        Console.WriteLine($"neutra: {neutra.Aplicar(42)} {neutra.Dobro}");
    }
}`,
      hints: [
        'Use `=> parametro` para expor, nunca `{ get; } = parametro` junto com uso do parâmetro em métodos — é essa combinação que gera CS9124.',
        '`: Pessoa(nome)` na declaração substitui o `: base(nome)` que estaria num construtor explícito.',
        'Uma expressão condicional pode terminar em `throw` desde o C# 7 — é isso que permite validar num inicializador de campo.',
        '`Servico(IRepositorio repositorio, string prefixo)` é o padrão de injeção de dependência: sem campos declarados, sem construtor escrito.',
      ],
      tests: [
        {
          name: 'Construtores primários',
          expectedStdout:
            'pessoa: Ana (pessoa)\nfuncionario: Bruno (funcionario) salario=5000\n' +
            'gerente: Carla (gerente) salario=9000 equipe=6\n' +
            '  Ana: pessoa\n  Bruno: funcionario\n  Carla: gerente\n' +
            'conta: Ana 250\nzerada: 0\nerro: saldo negativo\n' +
            'servico: PRE:registro7\nservico: PRE:registro9\n' +
            'aplicar: 15\ndobro: 6\ndescrever: multiplica por 3\n' +
            'neutra: 42 2',
        },
      ],
    },
  },

  {
    id: 's08c07l07',
    title: 'Expressões de coleção',
    objective: 'Criar e combinar coleções com a sintaxe de colchetes, incluindo o operador de espalhamento.',
    concept: [
      {
        kind: 'text',
        body:
          'Desde o C# 12, colchetes criam coleções de qualquer tipo. O compilador escolhe a construção adequada ao tipo esperado — array, `List<T>`, `Span<T>` ou outros.',
      },
      {
        kind: 'code',
        code: `int[] numeros = [1, 2, 3];
List<string> nomes = ["ana", "bruno"];
Span<int> janela = [7, 8, 9];
int[] vazio = [];`,
        caption: 'A mesma sintaxe, quatro tipos diferentes. O tipo do alvo decide o que é gerado.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Antes',
          code: `int[] a = new int[] { 1, 2, 3 };
List<string> b = new List<string> { "x" };
int[] c = Array.Empty<int>();`,
        },
        right: {
          label: 'Agora',
          code: `int[] a = [1, 2, 3];
List<string> b = ["x"];
int[] c = [];`,
        },
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A expressão precisa de um **tipo alvo**. `var x = [1, 2, 3];` não compila, porque `var` não diz ao compilador qual coleção construir. Declare o tipo, ou passe a expressão a um parâmetro tipado.',
      },
      {
        kind: 'text',
        body:
          'O recurso mais útil é o **operador de espalhamento** `..`, que insere os elementos de outra coleção dentro da nova.',
      },
      {
        kind: 'code',
        code: `int[] a = [1, 2, 3];
int[] b = [4, 5];

int[] junto = [..a, ..b, 6];
Console.WriteLine(string.Join(",", junto));`,
      },
      {
        kind: 'output',
        code: `1,2,3,4,5,6`,
        caption: 'Concatenar duas coleções e acrescentar um item, numa expressão só.',
      },
      {
        kind: 'compare',
        good: `int[] junto = [..a, ..b, 6];`,
        bad: `var lista = new List<int>();
lista.AddRange(a);
lista.AddRange(b);
lista.Add(6);
int[] junto = lista.ToArray();`,
        goodLabel: 'Uma expressão',
        badLabel: 'Cinco linhas',
      },
      {
        kind: 'text',
        body:
          'O espalhamento aceita qualquer `IEnumerable<T>`, inclusive o resultado de uma consulta LINQ — o que permite montar coleções a partir de transformações.',
      },
      {
        kind: 'code',
        code: `List<int> dobrados = [..a.Select(x => x * 10)];
int[] combinado = [0, ..a.Where(x => x > 1), 99];`,
      },
      {
        kind: 'output',
        code: `dobrados: 10,20,30
combinado: 0,2,3,99`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O compilador escolhe a construção mais eficiente que consegue: para um array de tamanho conhecido, ele aloca uma vez, do tamanho exato. A versão manual com `List` e `ToArray()` faria duas alocações.',
      },
      {
        kind: 'text',
        body:
          'Para que um tipo seu aceite a sintaxe, ele precisa do atributo `[CollectionBuilder]` apontando para um método de construção — ou implementar uma interface de coleção conhecida.',
      },
      {
        kind: 'table',
        headers: ['Tipo alvo', 'Funciona?'],
        rows: [
          ['`T[]`, `List<T>`, `Span<T>`, `ReadOnlySpan<T>`', 'sim, nativamente'],
          ['`IEnumerable<T>`, `IReadOnlyList<T>`', 'sim'],
          ['`Dictionary<K,V>`', 'não — precisa de pares'],
          ['tipo próprio', 'só com `[CollectionBuilder]`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A sintaxe é mais curta, mas não é sempre a mais clara: `[..a, ..b, ..c, ..d]` esconde o que está acontecendo. Quando a expressão fica densa, um nome de variável intermediária vale mais que a economia de linhas.',
      },
    ],
    quiz: [
      {
        id: 's08c07l07q1',
        type: 'single',
        prompt: 'Por que `var x = [1, 2, 3];` não compila?',
        options: [
          { id: 'a', text: 'A expressão de coleção precisa de um tipo alvo para saber o que construir', correct: true },
          { id: 'b', text: 'Porque `var` não aceita arrays' },
          { id: 'c', text: 'Porque falta a palavra `new`' },
          { id: 'd', text: 'Compila: o tipo é `int[]`' },
        ],
        explanation:
          'A mesma expressão pode virar array, `List<T>` ou `Span<T>`. Sem tipo declarado, o compilador não tem como escolher.',
      },
      {
        id: 's08c07l07q2',
        type: 'single',
        prompt: 'O que `[..a, ..b, 6]` produz?',
        options: [
          { id: 'a', text: 'Uma coleção com os elementos de `a`, depois os de `b`, depois o `6`', correct: true },
          { id: 'b', text: 'Uma coleção com `a`, `b` e `6` como três elementos' },
          { id: 'c', text: 'Um erro: `..` só funciona sozinho' },
          { id: 'd', text: 'Uma coleção aninhada' },
        ],
        explanation:
          'O `..` **espalha** os elementos, não insere a coleção como item. Sem ele, `[a, b, 6]` nem compilaria num `int[]`.',
      },
      {
        id: 's08c07l07q3',
        type: 'single',
        prompt: 'Por que `[..a, ..b]` costuma ser mais eficiente que `AddRange` seguido de `ToArray()`?',
        options: [
          { id: 'a', text: 'O compilador pode alocar uma vez, do tamanho exato', correct: true },
          { id: 'b', text: 'Porque não usa `IEnumerable`' },
          { id: 'c', text: 'Porque evita boxing' },
          { id: 'd', text: 'Não é: as duas formas são idênticas' },
        ],
        explanation:
          'A versão manual constrói uma `List` que cresce dobrando e depois copia tudo para um array. A expressão de coleção conhece os tamanhos e aloca o resultado direto.',
      },
    ],
    challenge: {
      brief:
        'Monte um construtor de listas de reprodução usando expressões de coleção e espalhamento: combine fontes, filtre, insira separadores e trate coleções vazias.',
      requirements: [
        'Use expressões de coleção `[...]` em todas as construções — nada de `new List<T> { }` nem `Array.Empty`.',
        '`Juntar` combina duas coleções e acrescenta um item ao final.',
        '`ComCabecalho` insere um item no início e outro no fim.',
        '`Filtrar` usa espalhamento com uma consulta LINQ.',
        '`Intercalar` produz `a[0], sep, a[1], sep, ...` sem separador ao final.',
        '`Achatar` combina uma lista de listas com espalhamento.',
        'Todos os métodos tratam coleções vazias sem lançar.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    // TODO: [..a, ..b, extra]
    static string[] Juntar(string[] a, string[] b, string extra)
    {
        return [];
    }

    // TODO: [inicio, ..itens, fim]
    static string[] ComCabecalho(string[] itens, string inicio, string fim)
    {
        return [];
    }

    // TODO: espalhe o resultado de uma consulta LINQ
    static int[] Filtrar(int[] fonte, int minimo)
    {
        return [];
    }

    // TODO: sem separador ao final
    static string[] Intercalar(string[] itens, string separador)
    {
        return [];
    }

    // TODO: combine as listas internas com espalhamento
    static int[] Achatar(List<int[]> grupos)
    {
        return [];
    }

    // TODO: os N primeiros e os N ultimos, sem repetir quando a fonte e pequena
    static int[] PontasDe(int[] fonte, int quantidade)
    {
        return [];
    }

    static void Main()
    {
        string[] rock = ["Bohemian", "Stairway"];
        string[] jazz = ["Take Five"];

        Console.WriteLine($"juntar: {string.Join(" | ", Juntar(rock, jazz, "Bonus"))}");
        Console.WriteLine($"juntar vazio: {string.Join(" | ", Juntar([], [], "So"))}");

        Console.WriteLine($"cabecalho: {string.Join(" | ", ComCabecalho(rock, "INICIO", "FIM"))}");
        Console.WriteLine($"cabecalho vazio: {string.Join(" | ", ComCabecalho([], "A", "Z"))}");

        int[] numeros = [5, 12, 3, 40, 8];
        Console.WriteLine($"filtrar: {string.Join(",", Filtrar(numeros, 8))}");
        Console.WriteLine($"filtrar nenhum: [{string.Join(",", Filtrar(numeros, 100))}]");

        Console.WriteLine($"intercalar: {string.Join(" ", Intercalar(rock, "-"))}");
        Console.WriteLine($"intercalar um: {string.Join(" ", Intercalar(jazz, "-"))}");
        Console.WriteLine($"intercalar vazio: [{string.Join(" ", Intercalar([], "-"))}]");

        List<int[]> grupos = [[1, 2], [], [3, 4, 5]];
        Console.WriteLine($"achatar: {string.Join(",", Achatar(grupos))}");
        Console.WriteLine($"achatar vazio: [{string.Join(",", Achatar([]))}]");

        int[] longo = [1, 2, 3, 4, 5, 6, 7, 8];
        Console.WriteLine($"pontas 2: {string.Join(",", PontasDe(longo, 2))}");
        Console.WriteLine($"pontas 3: {string.Join(",", PontasDe(longo, 3))}");
        Console.WriteLine($"pontas grandes: {string.Join(",", PontasDe([1, 2, 3], 5))}");

        int[] direto = [..rock.Select(r => r.Length)];
        Console.WriteLine($"direto: {string.Join(",", direto)}");

        List<string> lista = [..jazz, ..rock];
        Console.WriteLine($"lista: {string.Join(" | ", lista)}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static string[] Juntar(string[] a, string[] b, string extra)
    {
        return [..a, ..b, extra];
    }

    static string[] ComCabecalho(string[] itens, string inicio, string fim)
    {
        return [inicio, ..itens, fim];
    }

    static int[] Filtrar(int[] fonte, int minimo)
    {
        return [..fonte.Where(n => n >= minimo)];
    }

    static string[] Intercalar(string[] itens, string separador)
    {
        if (itens.Length == 0)
        {
            return [];
        }

        string[] resultado = [itens[0]];

        for (int i = 1; i < itens.Length; i++)
        {
            resultado = [..resultado, separador, itens[i]];
        }

        return resultado;
    }

    static int[] Achatar(List<int[]> grupos)
    {
        int[] resultado = [];

        foreach (int[] grupo in grupos)
        {
            resultado = [..resultado, ..grupo];
        }

        return resultado;
    }

    static int[] PontasDe(int[] fonte, int quantidade)
    {
        if (fonte.Length <= quantidade * 2)
        {
            return [..fonte];
        }

        return [..fonte[..quantidade], ..fonte[^quantidade..]];
    }

    static void Main()
    {
        string[] rock = ["Bohemian", "Stairway"];
        string[] jazz = ["Take Five"];

        Console.WriteLine($"juntar: {string.Join(" | ", Juntar(rock, jazz, "Bonus"))}");
        Console.WriteLine($"juntar vazio: {string.Join(" | ", Juntar([], [], "So"))}");

        Console.WriteLine($"cabecalho: {string.Join(" | ", ComCabecalho(rock, "INICIO", "FIM"))}");
        Console.WriteLine($"cabecalho vazio: {string.Join(" | ", ComCabecalho([], "A", "Z"))}");

        int[] numeros = [5, 12, 3, 40, 8];
        Console.WriteLine($"filtrar: {string.Join(",", Filtrar(numeros, 8))}");
        Console.WriteLine($"filtrar nenhum: [{string.Join(",", Filtrar(numeros, 100))}]");

        Console.WriteLine($"intercalar: {string.Join(" ", Intercalar(rock, "-"))}");
        Console.WriteLine($"intercalar um: {string.Join(" ", Intercalar(jazz, "-"))}");
        Console.WriteLine($"intercalar vazio: [{string.Join(" ", Intercalar([], "-"))}]");

        List<int[]> grupos = [[1, 2], [], [3, 4, 5]];
        Console.WriteLine($"achatar: {string.Join(",", Achatar(grupos))}");
        Console.WriteLine($"achatar vazio: [{string.Join(",", Achatar([]))}]");

        int[] longo = [1, 2, 3, 4, 5, 6, 7, 8];
        Console.WriteLine($"pontas 2: {string.Join(",", PontasDe(longo, 2))}");
        Console.WriteLine($"pontas 3: {string.Join(",", PontasDe(longo, 3))}");
        Console.WriteLine($"pontas grandes: {string.Join(",", PontasDe([1, 2, 3], 5))}");

        int[] direto = [..rock.Select(r => r.Length)];
        Console.WriteLine($"direto: {string.Join(",", direto)}");

        List<string> lista = [..jazz, ..rock];
        Console.WriteLine($"lista: {string.Join(" | ", lista)}");
    }
}`,
      hints: [
        '`return [];` devolve uma coleção vazia do tipo declarado — substitui `Array.Empty<T>()` sem alocar mais que ele.',
        'Em `Intercalar`, reconstruir o array a cada volta é O(n²) e serve como exercício de sintaxe; num caso real, `string.Join` resolveria tudo.',
        '`PontasDe` combina o espalhamento com as faixas do capítulo anterior: `fonte[..n]` e `fonte[^n..]`.',
        '`List<int[]> grupos = [[1, 2], [], [3, 4, 5]];` mostra expressões de coleção aninhadas: a externa é a `List`, as internas são os arrays.',
      ],
      tests: [
        {
          name: 'Expressões de coleção',
          expectedStdout:
            'juntar: Bohemian | Stairway | Take Five | Bonus\njuntar vazio: So\n' +
            'cabecalho: INICIO | Bohemian | Stairway | FIM\ncabecalho vazio: A | Z\n' +
            'filtrar: 12,40,8\nfiltrar nenhum: []\n' +
            'intercalar: Bohemian - Stairway\nintercalar um: Take Five\nintercalar vazio: []\n' +
            'achatar: 1,2,3,4,5\nachatar vazio: []\n' +
            'pontas 2: 1,2,7,8\npontas 3: 1,2,3,6,7,8\npontas grandes: 1,2,3\n' +
            'direto: 8,8\nlista: Take Five | Bohemian | Stairway',
        },
      ],
    },
  },

  {
    id: 's08c07l08',
    title: 'Membros com corpo de expressão',
    objective: 'Usar a sintaxe `=>` em membros de uma linha, sem sacrificar clareza.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando um membro consiste numa única expressão, a forma `=>` substitui as chaves e o `return`. Ela vale para quase todo tipo de membro.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Com bloco',
          code: `public int Quadrado(int n)
{
    return n * n;
}

public string Nome
{
    get { return primeiro + " " + ultimo; }
}`,
        },
        right: {
          label: 'Com expressão',
          code: `public int Quadrado(int n) => n * n;

public string Nome => primeiro + " " + ultimo;`,
        },
      },
      {
        kind: 'table',
        headers: ['Membro', 'Suportado desde'],
        rows: [
          ['método', 'C# 6'],
          ['propriedade somente leitura', 'C# 6'],
          ['`get` e `set` separados', 'C# 7'],
          ['construtor e finalizador', 'C# 7'],
          ['indexador', 'C# 6'],
          ['operador', 'C# 6'],
        ],
      },
      {
        kind: 'code',
        code: `class Temperatura(double celsius)
{
    public double Celsius => celsius;
    public double Fahrenheit => celsius * 9 / 5 + 32;

    public bool Congelando => celsius <= 0;

    public string Descrever() => $"{celsius:0.0}C / {Fahrenheit:0.0}F";

    public static Temperatura operator +(Temperatura a, double d) => new(a.Celsius + d);

    public override string ToString() => Descrever();
}`,
        caption: 'A classe inteira em corpos de expressão, sem uma única chave de bloco.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma propriedade `=>` é **calculada a cada acesso**, como um método sem parâmetros. É diferente de `{ get; } = valor`, que guarda o resultado uma vez. A distinção importa quando o cálculo é caro.',
      },
      {
        kind: 'compare',
        good: `// recalcula: reflete mudancas
public decimal Total => itens.Sum(i => i.Preco);`,
        bad: `// guarda uma vez: nao reflete
public decimal Total { get; } = itens.Sum(i => i.Preco);`,
        goodLabel: 'Propriedade calculada',
        badLabel: 'Propriedade fixada na construção',
      },
      {
        kind: 'text',
        body:
          'A forma com `get` e `set` separados permite validar ou disparar efeitos sem voltar ao bloco.',
      },
      {
        kind: 'code',
        code: `private int idade;

public int Idade
{
    get => idade;
    set => idade = value >= 0 ? value : throw new ArgumentException("negativa");
}`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O limite é a legibilidade, não a sintaxe. Uma expressão com três operadores ternários aninhados cabe num `=>` e é ilegível — nesses casos, um bloco com `if` ou uma expressão `switch` comunica muito melhor.',
      },
      {
        kind: 'compare',
        good: `public string Faixa => idade switch
{
    < 13 => "crianca",
    < 18 => "adolescente",
    < 60 => "adulto",
    _ => "idoso",
};`,
        bad: `public string Faixa => idade < 13 ? "crianca"
    : idade < 18 ? "adolescente"
    : idade < 60 ? "adulto" : "idoso";`,
        goodLabel: 'Expressão switch',
        badLabel: 'Ternários encadeados',
      },
      {
        kind: 'text',
        body:
          'Construtores com corpo de expressão só fazem sentido quando há uma única atribuição — e mesmo aí, o construtor primário da lição anterior costuma ser melhor.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A regra que funciona: use `=>` quando o membro **cabe confortavelmente numa linha**. Se precisou quebrar em três, o bloco é mais honesto — ele avisa ao leitor que há algo acontecendo ali.',
      },
    ],
    quiz: [
      {
        id: 's08c07l08q1',
        type: 'single',
        prompt: 'Qual a diferença entre `public int X => Calcular();` e `public int X { get; } = Calcular();`?',
        options: [
          { id: 'a', text: 'O primeiro recalcula a cada acesso; o segundo calcula uma vez na construção', correct: true },
          { id: 'b', text: 'Nenhuma: são equivalentes' },
          { id: 'c', text: 'O primeiro é somente leitura e o segundo não' },
          { id: 'd', text: 'O segundo não compila' },
        ],
        explanation:
          'O `=>` é açúcar para um `get` com corpo. O `= valor` é um inicializador de campo de apoio, avaliado uma única vez.',
      },
      {
        id: 's08c07l08q2',
        type: 'single',
        prompt: 'Quando **não** usar corpo de expressão?',
        options: [
          { id: 'a', text: 'Quando a expressão fica longa ou com lógica aninhada', correct: true },
          { id: 'b', text: 'Em propriedades' },
          { id: 'c', text: 'Em operadores' },
          { id: 'd', text: 'Em métodos que devolvem `void`' },
        ],
        explanation:
          'A sintaxe suporta os três últimos casos sem problema. O critério real é se o resultado continua legível numa linha.',
      },
      {
        id: 's08c07l08q3',
        type: 'single',
        prompt: 'Um `set` com corpo de expressão pode validar?',
        options: [
          { id: 'a', text: 'Sim: uma expressão condicional pode terminar em `throw`', correct: true },
          { id: 'b', text: 'Não: `set` com `=>` só atribui' },
          { id: 'c', text: 'Sim, mas só com `ArgumentNullException`' },
          { id: 'd', text: 'Não: validação exige bloco' },
        ],
        explanation:
          '`set => campo = valido ? value : throw new ...;` funciona porque `throw` é uma expressão desde o C# 7. Se a validação crescer, volte ao bloco.',
      },
    ],
    challenge: {
      brief:
        'Reescreva um tipo de domínio inteiro com membros de corpo de expressão — propriedades calculadas, métodos, operadores, indexador e `set` com validação —, mantendo tudo legível.',
      requirements: [
        'Todos os membros que cabem numa linha usam `=>`.',
        '`Perimetro` e `Area` são propriedades calculadas, não fixadas na construção.',
        '`Escala` tem `get` e `set` com corpo de expressão, e o `set` valida com `throw`.',
        '`Classificar` usa uma expressão switch, não ternários encadeados.',
        'O indexador devolve a dimensão pelo índice, com validação.',
        'Sobrecarregue `+` e `*` com corpo de expressão.',
        '`ToString` também usa `=>`.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Retangulo
{
    private double escala = 1;

    public double Largura { get; }
    public double Altura { get; }

    public Retangulo(double largura, double altura)
    {
        Largura = largura;
        Altura = altura;
    }

    // TODO: calculadas, com =>
    public double Perimetro => 0;
    public double Area => 0;
    public bool EhQuadrado => false;

    // TODO: get e set com =>; set lanca ArgumentException para valor <= 0
    public double Escala
    {
        get => 0;
        set { }
    }

    // TODO: area vezes escala ao quadrado
    public double AreaEscalada => 0;

    // TODO: expressao switch: ate 1 "minusculo", ate 100 "pequeno",
    //       ate 10000 "medio", acima "grande"
    public string Classificar => "";

    // TODO: indexador: 0 = largura, 1 = altura, resto ArgumentOutOfRangeException
    public double this[int dimensao] => 0;

    // TODO: soma as dimensoes de dois retangulos
    public static Retangulo operator +(Retangulo a, Retangulo b) => null;

    // TODO: multiplica as duas dimensoes por um fator
    public static Retangulo operator *(Retangulo a, double fator) => null;

    // TODO: "<largura>x<altura>"
    public override string ToString() => "";
}

class Program
{
    static void Main()
    {
        var r = new Retangulo(3, 4);

        Console.WriteLine($"retangulo: {r}");
        Console.WriteLine($"perimetro: {r.Perimetro}");
        Console.WriteLine($"area: {r.Area}");
        Console.WriteLine($"quadrado: {r.EhQuadrado}");
        Console.WriteLine($"classificar: {r.Classificar}");

        var q = new Retangulo(5, 5);
        Console.WriteLine($"quadrado real: {q.EhQuadrado}");

        Console.WriteLine($"indexador 0: {r[0]} indexador 1: {r[1]}");

        Console.WriteLine($"escala inicial: {r.Escala}");
        Console.WriteLine($"area escalada: {r.AreaEscalada}");

        r.Escala = 2;
        Console.WriteLine($"apos escala: {r.Escala} area={r.AreaEscalada}");

        Console.WriteLine($"soma: {r + q}");
        Console.WriteLine($"produto: {r * 3}");

        foreach (var dim in new[] { new Retangulo(0.5, 1), new Retangulo(10, 5), new Retangulo(200, 100) })
        {
            Console.WriteLine($"  {dim}: {dim.Classificar} (area {dim.Area})");
        }

        try
        {
            r.Escala = 0;
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"escala invalida: {ex.Message}");
        }

        try
        {
            var x = r[5];
            Console.WriteLine($"nao deveria: {x}");
        }
        catch (ArgumentOutOfRangeException)
        {
            Console.WriteLine("dimensao invalida");
        }
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Retangulo
{
    private double escala = 1;

    public double Largura { get; }
    public double Altura { get; }

    public Retangulo(double largura, double altura)
    {
        Largura = largura;
        Altura = altura;
    }

    public double Perimetro => 2 * (Largura + Altura);
    public double Area => Largura * Altura;
    public bool EhQuadrado => Largura == Altura;

    public double Escala
    {
        get => escala;
        set => escala = value > 0 ? value : throw new ArgumentException("escala deve ser positiva");
    }

    public double AreaEscalada => Area * escala * escala;

    public string Classificar => Area switch
    {
        <= 1 => "minusculo",
        <= 100 => "pequeno",
        <= 10000 => "medio",
        _ => "grande",
    };

    public double this[int dimensao] => dimensao switch
    {
        0 => Largura,
        1 => Altura,
        _ => throw new ArgumentOutOfRangeException(nameof(dimensao)),
    };

    public static Retangulo operator +(Retangulo a, Retangulo b) =>
        new Retangulo(a.Largura + b.Largura, a.Altura + b.Altura);

    public static Retangulo operator *(Retangulo a, double fator) =>
        new Retangulo(a.Largura * fator, a.Altura * fator);

    public override string ToString() => $"{Largura}x{Altura}";
}

class Program
{
    static void Main()
    {
        var r = new Retangulo(3, 4);

        Console.WriteLine($"retangulo: {r}");
        Console.WriteLine($"perimetro: {r.Perimetro}");
        Console.WriteLine($"area: {r.Area}");
        Console.WriteLine($"quadrado: {r.EhQuadrado}");
        Console.WriteLine($"classificar: {r.Classificar}");

        var q = new Retangulo(5, 5);
        Console.WriteLine($"quadrado real: {q.EhQuadrado}");

        Console.WriteLine($"indexador 0: {r[0]} indexador 1: {r[1]}");

        Console.WriteLine($"escala inicial: {r.Escala}");
        Console.WriteLine($"area escalada: {r.AreaEscalada}");

        r.Escala = 2;
        Console.WriteLine($"apos escala: {r.Escala} area={r.AreaEscalada}");

        Console.WriteLine($"soma: {r + q}");
        Console.WriteLine($"produto: {r * 3}");

        foreach (var dim in new[] { new Retangulo(0.5, 1), new Retangulo(10, 5), new Retangulo(200, 100) })
        {
            Console.WriteLine($"  {dim}: {dim.Classificar} (area {dim.Area})");
        }

        try
        {
            r.Escala = 0;
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"escala invalida: {ex.Message}");
        }

        try
        {
            var x = r[5];
            Console.WriteLine($"nao deveria: {x}");
        }
        catch (ArgumentOutOfRangeException)
        {
            Console.WriteLine("dimensao invalida");
        }
    }
}`,
      hints: [
        'O indexador também aceita uma expressão switch com `throw` no braço padrão — é uma expressão, não um comando.',
        '`set => campo = condicao ? value : throw new ...;` funciona porque `throw` é expressão desde o C# 7.',
        '`AreaEscalada` multiplica a área pelo quadrado da escala, porque escalar as duas dimensões multiplica a área duas vezes.',
        'O construtor fica com bloco: ele tem duas atribuições, e forçá-lo numa expressão não seria possível.',
      ],
      tests: [
        {
          name: 'Membros com corpo de expressão',
          expectedStdout:
            'retangulo: 3x4\nperimetro: 14\narea: 12\nquadrado: False\nclassificar: pequeno\n' +
            'quadrado real: True\n' +
            'indexador 0: 3 indexador 1: 4\n' +
            'escala inicial: 1\narea escalada: 12\n' +
            'apos escala: 2 area=48\n' +
            'soma: 8x9\nproduto: 9x12\n' +
            '  0.5x1: minusculo (area 0.5)\n  10x5: pequeno (area 50)\n  200x100: grande (area 20000)\n' +
            'escala invalida: escala deve ser positiva\ndimensao invalida',
        },
      ],
    },
  },

  {
    id: 's08c07l09',
    title: 'Prática: modernizando código antigo',
    objective: 'Reescrever um módulo de estilo antigo aplicando os recursos da seção, sem mudar o comportamento.',
    concept: [
      {
        kind: 'text',
        body:
          'Modernizar código não é trocar sintaxe por moda. Cada recurso desta seção resolve um problema concreto, e a reescrita só se justifica quando ela **elimina** algo — repetição, risco de nulo, conversão insegura, ambiguidade.',
      },
      {
        kind: 'text',
        body: 'Os padrões antigos mais comuns e o que os substitui hoje:',
      },
      {
        kind: 'table',
        headers: ['Padrão antigo', 'Substituto', 'Ganho'],
        rows: [
          ['`ArrayList`, `Hashtable`', '`List<T>`, `Dictionary<K,V>`', 'tipagem e sem boxing'],
          ['cadeia de `if` por tipo', 'expressão switch com padrões', 'exaustividade verificada'],
          ['`string` que pode ser nula', '`string?` anotado', 'aviso em vez de exceção'],
          ['campos + construtor longo', 'construtor primário', 'menos ruído'],
          ['`new List<T> { }`', '`[...]`', 'menos cerimônia'],
          ['`+=` em laço', '`StringBuilder`', 'custo linear'],
          ['`get { return x; }`', '`=> x`', 'menos linhas'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A regra número um de qualquer modernização: **o comportamento observável não muda**. Se não houver testes cobrindo o módulo, escreva-os antes de reescrever — senão a "modernização" vira uma reescrita não verificada.',
      },
      {
        kind: 'text',
        body:
          'A ordem também importa. Comece pelas mudanças que o compilador consegue verificar, e deixe as que exigem julgamento para o fim.',
      },
      {
        kind: 'table',
        headers: ['Ordem', 'Mudança', 'Verificável?'],
        rows: [
          ['1', 'coleções não genéricas → genéricas', 'sim, o compilador cobra'],
          ['2', 'ligar o contexto nullable e anotar', 'sim, avisos guiam'],
          ['3', 'cadeias de `if` → padrões', 'parcialmente'],
          ['4', 'construtores e membros → forma curta', 'não muda semântica'],
          ['5', 'otimizações de alocação', 'só com medição'],
        ],
      },
      {
        kind: 'compare',
        good: `static string Descrever(object? o) => o switch
{
    null => "nulo",
    int i when i > 100 => $"int grande {i}",
    int i => $"int {i}",
    string s => $"texto de {s.Length}",
    _ => "desconhecido",
};`,
        bad: `static string Descrever(object o)
{
    if (o == null) return "nulo";
    if (o is int)
    {
        int i = (int)o;
        if (i > 100) return "int grande " + i;
        return "int " + i;
    }
    if (o is string) return "texto de " + ((string)o).Length;
    return "desconhecido";
}`,
        goodLabel: 'Padrões, uma expressão',
        badLabel: 'Testes de tipo com cast',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que a versão moderna não é só mais curta: ela elimina os casts duplicados, o `o` anotado como possivelmente nulo passa a ser verificado, e o compilador consegue avisar se um caso ficar inalcançável.',
      },
      {
        kind: 'text',
        body:
          'Há mudanças que parecem modernização e não são. Vale reconhecê-las para não gastar revisão com elas.',
      },
      {
        kind: 'table',
        headers: ['Mudança', 'Vale?'],
        rows: [
          ['`var` no lugar de tipos explícitos', 'estilo, não modernização'],
          ['`=>` num método de dez linhas', 'piora a legibilidade'],
          ['`Span<T>` em código chamado três vezes', 'complexidade sem ganho'],
          ['construtor primário com validação complexa', 'força a lógica para um lugar ruim'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Modernize por **módulo**, não por arquivo inteiro de uma vez. Um módulo pequeno, reescrito e verificado, dá confiança para o próximo — e mantém cada revisão num tamanho que alguém consegue ler.',
      },
    ],
    quiz: [
      {
        id: 's08c07l09q1',
        type: 'single',
        prompt: 'Qual a regra número um ao modernizar código existente?',
        options: [
          { id: 'a', text: 'O comportamento observável não pode mudar', correct: true },
          { id: 'b', text: 'Usar sempre o recurso mais recente disponível' },
          { id: 'c', text: 'Reduzir o número de linhas ao máximo' },
          { id: 'd', text: 'Substituir todos os `if` por padrões' },
        ],
        explanation:
          'Modernização é refatoração: muda a forma, preserva o efeito. Sem testes cobrindo o módulo, não há como afirmar que isso aconteceu.',
      },
      {
        id: 's08c07l09q2',
        type: 'single',
        prompt: 'Por que começar trocando coleções não genéricas por genéricas?',
        options: [
          { id: 'a', text: 'É a mudança que o compilador mais verifica: erros de tipo aparecem imediatamente', correct: true },
          { id: 'b', text: 'Porque é a mais rápida de fazer' },
          { id: 'c', text: 'Porque `ArrayList` foi removida do .NET' },
          { id: 'd', text: 'Porque melhora mais o desempenho' },
        ],
        explanation:
          'Trocar `ArrayList` por `List<T>` transforma casts em verificações de compilação. Os erros que aparecem já eram bugs latentes.',
      },
      {
        id: 's08c07l09q3',
        type: 'multiple',
        prompt: 'Quais destas **não** são modernizações que valem a pena?',
        options: [
          { id: 'a', text: 'Trocar tipos explícitos por `var` em toda parte', correct: true },
          { id: 'b', text: 'Usar `=>` num método de dez linhas', correct: true },
          { id: 'c', text: 'Introduzir `Span<T>` num método chamado três vezes', correct: true },
          { id: 'd', text: 'Trocar `Hashtable` por `Dictionary<K,V>`' },
        ],
        explanation:
          'As três primeiras trocam legibilidade ou complexidade por nada. A quarta elimina boxing e casts inseguros — modernização real.',
      },
    ],
    challenge: {
      brief:
        'Modernize um módulo de processamento de pedidos escrito em estilo antigo: coleções não genéricas, testes de tipo com cast, concatenação em laço e construtores verbosos.',
      requirements: [
        'Substitua as coleções não genéricas por genéricas — nenhum `ArrayList` ou `Hashtable` deve restar.',
        'Substitua a cadeia de `if` com cast por uma expressão switch com padrões.',
        'Use construtor primário nas classes de dados.',
        'Use expressões de coleção onde couber.',
        'Substitua a concatenação em laço por `StringBuilder`.',
        'Use membros com corpo de expressão nos membros de uma linha.',
        'O comportamento observável precisa ser idêntico ao da versão antiga.',
      ],
      starterCode: `using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// ===== VERSAO ANTIGA (nao altere; ela define o comportamento esperado) =====

class ItemAntigo
{
    private string nome;
    private decimal preco;
    private int quantidade;

    public ItemAntigo(string nome, decimal preco, int quantidade)
    {
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
    }

    public string Nome { get { return nome; } }
    public decimal Preco { get { return preco; } }
    public int Quantidade { get { return quantidade; } }
    public decimal Subtotal { get { return preco * quantidade; } }
}

class ProcessadorAntigo
{
    public static string Classificar(object valor)
    {
        if (valor == null) return "vazio";
        if (valor is int)
        {
            int i = (int)valor;
            if (i > 100) return "inteiro grande";
            return "inteiro";
        }
        if (valor is decimal) return "decimal";
        if (valor is string)
        {
            string s = (string)valor;
            if (s.Length == 0) return "texto vazio";
            return "texto";
        }
        return "desconhecido";
    }

    public static decimal Total(ArrayList itens)
    {
        decimal soma = 0;
        for (int i = 0; i < itens.Count; i++)
        {
            ItemAntigo item = (ItemAntigo)itens[i];
            soma += item.Subtotal;
        }
        return soma;
    }

    public static string Listar(ArrayList itens)
    {
        string texto = "";
        for (int i = 0; i < itens.Count; i++)
        {
            ItemAntigo item = (ItemAntigo)itens[i];
            texto += item.Nome + "=" + item.Subtotal + ";";
        }
        return texto;
    }
}

// ===== VERSAO MODERNA (implemente aqui) =====

// TODO: construtor primario, membros com =>
class Item
{
    public string Nome => "";
    public decimal Preco => 0;
    public int Quantidade => 0;
    public decimal Subtotal => 0;
}

class Processador
{
    // TODO: expressao switch com padroes
    public static string Classificar(object? valor) => "";

    // TODO: List<Item>, sem cast
    public static decimal Total(List<Item> itens) => 0;

    // TODO: StringBuilder
    public static string Listar(List<Item> itens) => "";

    // TODO: nomes dos itens acima do limite, com expressao de colecao
    public static string[] AcimaDe(List<Item> itens, decimal limite) => [];
}

class Program
{
    static void Main()
    {
        var antigos = new ArrayList
        {
            new ItemAntigo("cafe", 10m, 3),
            new ItemAntigo("cha", 5m, 2),
            new ItemAntigo("bolo", 25m, 1),
        };

        List<Item> modernos = [
            new Item("cafe", 10m, 3),
            new Item("cha", 5m, 2),
            new Item("bolo", 25m, 1),
        ];

        Console.WriteLine($"total antigo: {ProcessadorAntigo.Total(antigos)}");
        Console.WriteLine($"total moderno: {Processador.Total(modernos)}");
        Console.WriteLine($"totais iguais: {ProcessadorAntigo.Total(antigos) == Processador.Total(modernos)}");

        Console.WriteLine($"listar antigo: {ProcessadorAntigo.Listar(antigos)}");
        Console.WriteLine($"listar moderno: {Processador.Listar(modernos)}");
        Console.WriteLine($"listagens iguais: {ProcessadorAntigo.Listar(antigos) == Processador.Listar(modernos)}");

        object?[] valores = [null, 5, 500, 19.9m, "", "abc", DateTime.Now];

        foreach (object? v in valores)
        {
            string a = ProcessadorAntigo.Classificar(v!);
            string m = Processador.Classificar(v);
            Console.WriteLine($"  {a} == {m}: {a == m}");
        }

        Console.WriteLine($"acima de 20: {string.Join(",", Processador.AcimaDe(modernos, 20m))}");
        Console.WriteLine($"acima de 100: [{string.Join(",", Processador.AcimaDe(modernos, 100m))}]");

        Console.WriteLine($"vazio total: {Processador.Total([])}");
        Console.WriteLine($"vazio listar: [{Processador.Listar([])}]");
    }
}`,
      solution: `using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// ===== VERSAO ANTIGA (nao altere; ela define o comportamento esperado) =====

class ItemAntigo
{
    private string nome;
    private decimal preco;
    private int quantidade;

    public ItemAntigo(string nome, decimal preco, int quantidade)
    {
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
    }

    public string Nome { get { return nome; } }
    public decimal Preco { get { return preco; } }
    public int Quantidade { get { return quantidade; } }
    public decimal Subtotal { get { return preco * quantidade; } }
}

class ProcessadorAntigo
{
    public static string Classificar(object valor)
    {
        if (valor == null) return "vazio";
        if (valor is int)
        {
            int i = (int)valor;
            if (i > 100) return "inteiro grande";
            return "inteiro";
        }
        if (valor is decimal) return "decimal";
        if (valor is string)
        {
            string s = (string)valor;
            if (s.Length == 0) return "texto vazio";
            return "texto";
        }
        return "desconhecido";
    }

    public static decimal Total(ArrayList itens)
    {
        decimal soma = 0;
        for (int i = 0; i < itens.Count; i++)
        {
            ItemAntigo item = (ItemAntigo)itens[i];
            soma += item.Subtotal;
        }
        return soma;
    }

    public static string Listar(ArrayList itens)
    {
        string texto = "";
        for (int i = 0; i < itens.Count; i++)
        {
            ItemAntigo item = (ItemAntigo)itens[i];
            texto += item.Nome + "=" + item.Subtotal + ";";
        }
        return texto;
    }
}

// ===== VERSAO MODERNA =====

class Item(string nome, decimal preco, int quantidade)
{
    public string Nome => nome;
    public decimal Preco => preco;
    public int Quantidade => quantidade;
    public decimal Subtotal => preco * quantidade;
}

class Processador
{
    public static string Classificar(object? valor) => valor switch
    {
        null => "vazio",
        int i when i > 100 => "inteiro grande",
        int => "inteiro",
        decimal => "decimal",
        string { Length: 0 } => "texto vazio",
        string => "texto",
        _ => "desconhecido",
    };

    public static decimal Total(List<Item> itens)
    {
        decimal soma = 0;

        foreach (Item item in itens)
        {
            soma += item.Subtotal;
        }

        return soma;
    }

    public static string Listar(List<Item> itens)
    {
        var construtor = new StringBuilder();

        foreach (Item item in itens)
        {
            construtor.Append(item.Nome).Append('=').Append(item.Subtotal).Append(';');
        }

        return construtor.ToString();
    }

    public static string[] AcimaDe(List<Item> itens, decimal limite) =>
        [..itens.Where(i => i.Subtotal > limite).Select(i => i.Nome)];
}

class Program
{
    static void Main()
    {
        var antigos = new ArrayList
        {
            new ItemAntigo("cafe", 10m, 3),
            new ItemAntigo("cha", 5m, 2),
            new ItemAntigo("bolo", 25m, 1),
        };

        List<Item> modernos = [
            new Item("cafe", 10m, 3),
            new Item("cha", 5m, 2),
            new Item("bolo", 25m, 1),
        ];

        Console.WriteLine($"total antigo: {ProcessadorAntigo.Total(antigos)}");
        Console.WriteLine($"total moderno: {Processador.Total(modernos)}");
        Console.WriteLine($"totais iguais: {ProcessadorAntigo.Total(antigos) == Processador.Total(modernos)}");

        Console.WriteLine($"listar antigo: {ProcessadorAntigo.Listar(antigos)}");
        Console.WriteLine($"listar moderno: {Processador.Listar(modernos)}");
        Console.WriteLine($"listagens iguais: {ProcessadorAntigo.Listar(antigos) == Processador.Listar(modernos)}");

        object?[] valores = [null, 5, 500, 19.9m, "", "abc", DateTime.Now];

        foreach (object? v in valores)
        {
            string a = ProcessadorAntigo.Classificar(v!);
            string m = Processador.Classificar(v);
            Console.WriteLine($"  {a} == {m}: {a == m}");
        }

        Console.WriteLine($"acima de 20: {string.Join(",", Processador.AcimaDe(modernos, 20m))}");
        Console.WriteLine($"acima de 100: [{string.Join(",", Processador.AcimaDe(modernos, 100m))}]");

        Console.WriteLine($"vazio total: {Processador.Total([])}");
        Console.WriteLine($"vazio listar: [{Processador.Listar([])}]");
    }
}`,
      hints: [
        '`string { Length: 0 }` é um padrão de tipo combinado com padrão de propriedade — substitui o cast seguido de teste de tamanho.',
        'A ordem dos braços reproduz a ordem dos `if` antigos: `int i when i > 100` precisa vir antes de `int`.',
        '`[..itens.Where(...).Select(...)]` espalha o resultado do LINQ direto num `string[]`, sem `ToArray()`.',
        'O `Listar` moderno precisa produzir exatamente a mesma string, incluindo o `;` final — é o que o teste de igualdade verifica.',
      ],
      tests: [
        {
          name: 'Modernização verificada',
          expectedStdout:
            'total antigo: 65\ntotal moderno: 65\ntotais iguais: True\n' +
            'listar antigo: cafe=30;cha=10;bolo=25;\nlistar moderno: cafe=30;cha=10;bolo=25;\n' +
            'listagens iguais: True\n' +
            '  vazio == vazio: True\n' +
            '  inteiro == inteiro: True\n' +
            '  inteiro grande == inteiro grande: True\n' +
            '  decimal == decimal: True\n' +
            '  texto vazio == texto vazio: True\n' +
            '  texto == texto: True\n' +
            '  desconhecido == desconhecido: True\n' +
            'acima de 20: cafe,bolo\nacima de 100: []\n' +
            'vazio total: 0\nvazio listar: []',
        },
      ],
    },
  },

  {
    id: 's08c07l10',
    title: 'Boss: mini biblioteca idiomática',
    objective:
      'Fechar a seção construindo uma biblioteca que usa genéricos, extensões, padrões, nullability, iteradores e recursos modernos juntos.',
    concept: [
      {
        kind: 'text',
        body:
          'Esta seção cobriu sete capítulos. O desafio final não introduz nada novo: ele pede que você use os sete ao mesmo tempo, como faria numa biblioteca de verdade.',
      },
      {
        kind: 'table',
        headers: ['Capítulo', 'O que ele contribui aqui'],
        rows: [
          ['1. Genéricos', 'o pipeline funciona com qualquer tipo de item'],
          ['2. Extensões', 'os operadores são métodos de extensão encadeáveis'],
          ['3. Pattern matching', 'a classificação dos resultados'],
          ['4. Nullability', 'a ausência é explícita na assinatura'],
          ['5. Iteradores', 'o processamento é preguiçoso'],
          ['6. Memória', '`StringBuilder` no relatório, sem alocação por item'],
          ['7. Recursos modernos', 'construtor primário, `=>`, `[...]`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O que separa uma biblioteca boa de um punhado de funções é a **coerência**: nomes previsíveis, comportamento uniforme para casos de borda, e uma superfície que se explica sozinha. Os recursos são meio, não fim.',
      },
      {
        kind: 'text',
        body: 'Três decisões de projeto aparecem em qualquer biblioteca e valem revisitar antes do desafio:',
      },
      {
        kind: 'table',
        headers: ['Decisão', 'Escolha coerente'],
        rows: [
          ['o que devolver quando não há resultado', 'sequência vazia, nunca nula'],
          ['o que fazer com entrada inválida', 'lançar cedo, na chamada, não na iteração'],
          ['o que expor no tipo de retorno', 'o mais fraco que atende'],
        ],
      },
      {
        kind: 'compare',
        good: `public static IEnumerable<T> Filtrar<T>(
    this IEnumerable<T> fonte, Func<T, bool> regra)
{
    if (regra is null)
        throw new ArgumentNullException(nameof(regra));

    return Nucleo(fonte, regra);
}`,
        bad: `public static List<T>? Filtrar<T>(
    this IEnumerable<T> fonte, Func<T, bool> regra)
{
    if (fonte is null) return null;
    // materializa, devolve nulo,
    // e valida tarde demais
}`,
        goodLabel: 'Preguiçoso, validado, nunca nulo',
        badLabel: 'Materializado e nulo',
      },
      {
        kind: 'text',
        body:
          'A última peça é a **consistência de nomes**. Numa biblioteca coerente, quem aprendeu um método consegue adivinhar o próximo.',
      },
      {
        kind: 'table',
        headers: ['Prefixo', 'Significa'],
        rows: [
          ['`Try...`', 'devolve `bool` e não lança'],
          ['`...OuPadrao`', 'devolve um valor de reserva em vez de lançar'],
          ['`Para...`', 'converte para outro tipo'],
          ['`Com...`', 'devolve uma cópia com algo alterado'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Ao terminar, faça o teste do capítulo 2: leia o código que **usa** a biblioteca, não o que a implementa. Se cada linha de uso é óbvia para quem nunca a viu, o projeto está certo.',
      },
    ],
    quiz: [
      {
        id: 's08c07l10q1',
        type: 'single',
        prompt: 'Por que validar argumentos fora do método com `yield`?',
        options: [
          { id: 'a', text: 'Para a exceção sair na chamada, e não só quando alguém iterar', correct: true },
          { id: 'b', text: 'Porque `yield` não permite `throw`' },
          { id: 'c', text: 'Para evitar alocação' },
          { id: 'd', text: 'Por convenção de nomes' },
        ],
        explanation:
          'O corpo de um iterador só executa no primeiro `MoveNext()`. Sem a separação, a exceção aparece longe da linha que passou o argumento errado.',
      },
      {
        id: 's08c07l10q2',
        type: 'single',
        prompt: 'O que uma biblioteca deve devolver quando não há resultados?',
        options: [
          { id: 'a', text: 'Uma sequência vazia', correct: true },
          { id: 'b', text: '`null`' },
          { id: 'c', text: 'Lançar exceção' },
          { id: 'd', text: 'Um valor sentinela' },
        ],
        explanation:
          'A sequência vazia é iterável sem verificação. Devolver nulo transfere para todos os consumidores um trabalho que a biblioteca podia ter evitado.',
      },
      {
        id: 's08c07l10q3',
        type: 'single',
        prompt: 'Qual o melhor teste final de uma superfície de biblioteca?',
        options: [
          { id: 'a', text: 'Ler o código que a usa e verificar se cada linha é óbvia', correct: true },
          { id: 'b', text: 'Contar quantos recursos modernos ela emprega' },
          { id: 'c', text: 'Verificar se todos os métodos são genéricos' },
          { id: 'd', text: 'Medir o número de linhas da implementação' },
        ],
        explanation:
          'A implementação sempre faz sentido para quem a escreveu. O código de chamada é onde as escolhas de projeto aparecem — bem ou mal.',
      },
    ],
    challenge: {
      brief:
        'Construa uma mini biblioteca de pipeline de dados que reúne os sete capítulos: operadores genéricos preguiçosos como extensões, classificação por padrões, nulidade explícita, e um relatório montado com `StringBuilder`.',
      requirements: [
        'A solução compila **sem nenhum aviso** com o contexto nullable ligado.',
        'Todos os operadores são extensões genéricas sobre `IEnumerable<T>` e são preguiçosos.',
        '`EmLotes` valida o tamanho imediatamente, delegando a iteração a um método privado.',
        '`PrimeiroOuNulo` devolve `T?` com `where T : class`; `TryPrimeiro` usa `[NotNullWhen(true)]`.',
        '`Classificar` usa expressão switch com padrões de tipo, propriedade e relacionais.',
        '`Resultado` é um `record` com construtor primário e membros `=>`.',
        '`Relatorio` usa `StringBuilder` e ordena as chaves.',
        'Nenhum método devolve coleção nula; use expressões de coleção onde couber.',
      ],
      nullable: 'enabled',
      starterCode: `using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;

record Medida(string Nome, double Valor, string Unidade)
{
    // TODO: membros com =>
    public bool EhValida => false;
    public string Rotulo => "";
}

static class Pipeline
{
    // TODO: preguicoso
    public static IEnumerable<T> Onde<T>(this IEnumerable<T> fonte, Func<T, bool> regra)
    {
        yield break;
    }

    // TODO: preguicoso
    public static IEnumerable<TSaida> Mapear<TEntrada, TSaida>(
        this IEnumerable<TEntrada> fonte, Func<TEntrada, TSaida> converter)
    {
        yield break;
    }

    // TODO: valida aqui e delega
    public static IEnumerable<List<T>> EmLotes<T>(this IEnumerable<T> fonte, int tamanho)
    {
        return null!;
    }

    private static IEnumerable<List<T>> EmLotesNucleo<T>(IEnumerable<T> fonte, int tamanho)
    {
        yield break;
    }

    // TODO: null quando vazio
    public static T? PrimeiroOuNulo<T>(this IEnumerable<T> fonte) where T : class
    {
        return null;
    }

    // TODO: [NotNullWhen(true)]
    public static bool TryPrimeiro<T>(this IEnumerable<T> fonte, out T? primeiro) where T : class
    {
        primeiro = null;
        return false;
    }

    // TODO: agrupa contando; nunca devolve nulo
    public static Dictionary<string, int> Contar<T>(this IEnumerable<T> fonte, Func<T, string> chave)
    {
        return new Dictionary<string, int>();
    }
}

static class Analisador
{
    // TODO: expressao switch com padroes
    //  - null                              -> "ausente"
    //  - { EhValida: false }               -> "invalida"
    //  - { Unidade: "C", Valor: > 40 }     -> "temperatura alta"
    //  - { Unidade: "C" }                  -> "temperatura"
    //  - { Unidade: "kg" or "g" }          -> "massa"
    //  - { Valor: <= 0 }                   -> "nao positiva"
    //  - resto                             -> "generica"
    public static string Classificar(Medida? m) => "";

    // TODO: StringBuilder, chaves ordenadas
    public static string Relatorio(Dictionary<string, int> contagem) => "";
}

class Program
{
    static void Main()
    {
        List<Medida> medidas = [
            new Medida("sala", 45.5, "C"),
            new Medida("quarto", 22.0, "C"),
            new Medida("saco", 3.2, "kg"),
            new Medida("amostra", 150, "g"),
            new Medida("erro", double.NaN, "C"),
            new Medida("zerada", 0, "m"),
            new Medida("distancia", 12.5, "m"),
        ];

        Console.WriteLine($"total: {medidas.Count}");

        var validas = medidas.Onde(m => m.EhValida).ToList();
        Console.WriteLine($"validas: {validas.Count}");

        var rotulos = medidas.Onde(m => m.EhValida).Mapear(m => m.Rotulo).ToList();
        Console.WriteLine($"rotulos: {string.Join(" | ", rotulos)}");

        foreach (List<Medida> lote in medidas.EmLotes(3))
        {
            Console.WriteLine($"  lote: {string.Join(",", lote.Mapear(m => m.Nome))}");
        }

        Console.WriteLine($"primeiro: {medidas.PrimeiroOuNulo()?.Nome}");
        Console.WriteLine($"primeiro de vazio: {new List<Medida>().PrimeiroOuNulo() == null}");

        if (medidas.TryPrimeiro(out Medida? achado))
        {
            Console.WriteLine($"try: {achado.Nome} com {achado.Nome.Length} letras");
        }

        Console.WriteLine($"try vazio: {new List<Medida>().TryPrimeiro(out Medida? _)}");

        foreach (Medida m in medidas)
        {
            Console.WriteLine($"  {m.Nome}: {Analisador.Classificar(m)}");
        }

        Console.WriteLine($"nula: {Analisador.Classificar(null)}");

        Dictionary<string, int> contagem = medidas.Contar(Analisador.Classificar);
        Console.WriteLine("relatorio:");
        Console.WriteLine(Analisador.Relatorio(contagem));

        Console.WriteLine($"vazio relatorio: [{Analisador.Relatorio(new Dictionary<string, int>())}]");
        Console.WriteLine($"vazio contar: {new List<Medida>().Contar(Analisador.Classificar).Count}");

        try
        {
            medidas.EmLotes(0);
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"erro: {ex.Message}");
        }
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;

record Medida(string Nome, double Valor, string Unidade)
{
    public bool EhValida => !double.IsNaN(Valor);
    public string Rotulo => $"{Nome}={Valor}{Unidade}";
}

static class Pipeline
{
    public static IEnumerable<T> Onde<T>(this IEnumerable<T> fonte, Func<T, bool> regra)
    {
        foreach (T item in fonte)
        {
            if (regra(item))
            {
                yield return item;
            }
        }
    }

    public static IEnumerable<TSaida> Mapear<TEntrada, TSaida>(
        this IEnumerable<TEntrada> fonte, Func<TEntrada, TSaida> converter)
    {
        foreach (TEntrada item in fonte)
        {
            yield return converter(item);
        }
    }

    public static IEnumerable<List<T>> EmLotes<T>(this IEnumerable<T> fonte, int tamanho)
    {
        if (tamanho <= 0)
        {
            throw new ArgumentException("tamanho deve ser positivo");
        }

        return EmLotesNucleo(fonte, tamanho);
    }

    private static IEnumerable<List<T>> EmLotesNucleo<T>(IEnumerable<T> fonte, int tamanho)
    {
        var lote = new List<T>(tamanho);

        foreach (T item in fonte)
        {
            lote.Add(item);

            if (lote.Count == tamanho)
            {
                yield return lote;
                lote = new List<T>(tamanho);
            }
        }

        if (lote.Count > 0)
        {
            yield return lote;
        }
    }

    public static T? PrimeiroOuNulo<T>(this IEnumerable<T> fonte) where T : class
    {
        foreach (T item in fonte)
        {
            return item;
        }

        return null;
    }

    public static bool TryPrimeiro<T>(this IEnumerable<T> fonte, [NotNullWhen(true)] out T? primeiro)
        where T : class
    {
        foreach (T item in fonte)
        {
            primeiro = item;
            return true;
        }

        primeiro = null;
        return false;
    }

    public static Dictionary<string, int> Contar<T>(this IEnumerable<T> fonte, Func<T, string> chave)
    {
        var mapa = new Dictionary<string, int>();

        foreach (T item in fonte)
        {
            string k = chave(item);
            mapa[k] = mapa.TryGetValue(k, out int atual) ? atual + 1 : 1;
        }

        return mapa;
    }
}

static class Analisador
{
    public static string Classificar(Medida? m) => m switch
    {
        null => "ausente",
        { EhValida: false } => "invalida",
        { Unidade: "C", Valor: > 40 } => "temperatura alta",
        { Unidade: "C" } => "temperatura",
        { Unidade: "kg" or "g" } => "massa",
        { Valor: <= 0 } => "nao positiva",
        _ => "generica",
    };

    public static string Relatorio(Dictionary<string, int> contagem)
    {
        List<string> chaves = [..contagem.Keys];
        chaves.Sort(StringComparer.Ordinal);

        var construtor = new StringBuilder();

        foreach (string chave in chaves)
        {
            construtor.AppendLine($"  {chave}={contagem[chave]}");
        }

        return construtor.ToString().TrimEnd();
    }
}

class Program
{
    static void Main()
    {
        List<Medida> medidas = [
            new Medida("sala", 45.5, "C"),
            new Medida("quarto", 22.0, "C"),
            new Medida("saco", 3.2, "kg"),
            new Medida("amostra", 150, "g"),
            new Medida("erro", double.NaN, "C"),
            new Medida("zerada", 0, "m"),
            new Medida("distancia", 12.5, "m"),
        ];

        Console.WriteLine($"total: {medidas.Count}");

        var validas = medidas.Onde(m => m.EhValida).ToList();
        Console.WriteLine($"validas: {validas.Count}");

        var rotulos = medidas.Onde(m => m.EhValida).Mapear(m => m.Rotulo).ToList();
        Console.WriteLine($"rotulos: {string.Join(" | ", rotulos)}");

        foreach (List<Medida> lote in medidas.EmLotes(3))
        {
            Console.WriteLine($"  lote: {string.Join(",", lote.Mapear(m => m.Nome))}");
        }

        Console.WriteLine($"primeiro: {medidas.PrimeiroOuNulo()?.Nome}");
        Console.WriteLine($"primeiro de vazio: {new List<Medida>().PrimeiroOuNulo() == null}");

        if (medidas.TryPrimeiro(out Medida? achado))
        {
            Console.WriteLine($"try: {achado.Nome} com {achado.Nome.Length} letras");
        }

        Console.WriteLine($"try vazio: {new List<Medida>().TryPrimeiro(out Medida? _)}");

        foreach (Medida m in medidas)
        {
            Console.WriteLine($"  {m.Nome}: {Analisador.Classificar(m)}");
        }

        Console.WriteLine($"nula: {Analisador.Classificar(null)}");

        Dictionary<string, int> contagem = medidas.Contar(Analisador.Classificar);
        Console.WriteLine("relatorio:");
        Console.WriteLine(Analisador.Relatorio(contagem));

        Console.WriteLine($"vazio relatorio: [{Analisador.Relatorio(new Dictionary<string, int>())}]");
        Console.WriteLine($"vazio contar: {new List<Medida>().Contar(Analisador.Classificar).Count}");

        try
        {
            medidas.EmLotes(0);
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"erro: {ex.Message}");
        }
    }
}`,
      hints: [
        '`EmLotes` precisa ser um método **sem** `yield` que devolve o resultado de `EmLotesNucleo` — é o que faz a exceção sair na chamada.',
        'A ordem dos braços de `Classificar` importa: `{ Unidade: "C", Valor: > 40 }` precisa vir antes de `{ Unidade: "C" }`.',
        '`{ EhValida: false }` é um padrão de propriedade sobre um membro calculado — funciona como qualquer outra propriedade.',
        '`[NotNullWhen(true)]` é o que permite usar `achado.Nome` dentro do `if` sem aviso e sem `!`.',
        'A medida "zerada" tem unidade `m` e valor 0, então cai em `{ Valor: <= 0 }`, não em "generica".',
      ],
      tests: [
        {
          name: 'Mini biblioteca idiomática',
          expectedStdout:
            'total: 7\nvalidas: 6\n' +
            'rotulos: sala=45.5C | quarto=22C | saco=3.2kg | amostra=150g | zerada=0m | distancia=12.5m\n' +
            '  lote: sala,quarto,saco\n  lote: amostra,erro,zerada\n  lote: distancia\n' +
            'primeiro: sala\nprimeiro de vazio: True\n' +
            'try: sala com 4 letras\ntry vazio: False\n' +
            '  sala: temperatura alta\n  quarto: temperatura\n  saco: massa\n  amostra: massa\n' +
            '  erro: invalida\n  zerada: nao positiva\n  distancia: generica\n' +
            'nula: ausente\n' +
            'relatorio:\n' +
            '  generica=1\n  invalida=1\n  massa=2\n  nao positiva=1\n  temperatura=1\n  temperatura alta=1\n' +
            'vazio relatorio: []\nvazio contar: 0\n' +
            'erro: tamanho deve ser positivo',
        },
      ],
      timeoutMs: 10000,
    },
  },
]
