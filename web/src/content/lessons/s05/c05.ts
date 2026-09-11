import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's05c05l01',
    title: 'Definindo uma interface',
    objective: 'Declarar um contrato de comportamento sem nenhuma implementação, separando o que de como.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma **interface** é um contrato puro: ela lista o que um tipo precisa saber fazer, sem dizer como. Nenhum código, nenhum estado — apenas as assinaturas.',
      },
      {
        kind: 'code',
        code: `interface IExportador
{
    string Exportar(string dados);      // sem corpo
    string Extensao { get; }            // propriedade so de leitura
}`,
        caption: 'Os membros são públicos por definição: escrever `public` aqui é redundante.',
      },
      {
        kind: 'table',
        headers: ['Aspecto', 'Interface', 'Classe abstrata'],
        rows: [
          ['pode ter campos', 'não', 'sim'],
          ['pode ter construtor', 'não', 'sim'],
          ['quantas por tipo', '**várias**', 'uma'],
          ['membros', 'públicos', 'qualquer acesso'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A convenção do C# é começar nomes de interface com `I` maiúsculo: `IExportador`, `IComparable`, `IEnumerable`. Não é obrigatório, mas é universal — quem lê identifica o contrato de imediato.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Uma interface não pode ser instanciada, exatamente como uma classe abstrata. Ela só existe como tipo de variável, apontando para um objeto de alguma classe que a implementa.',
      },
      {
        kind: 'text',
        body:
          'A diferença essencial para a herança: uma interface não estabelece "é um" no sentido de família. Ela diz "sabe fazer isso" — e tipos completamente distintos podem saber fazer a mesma coisa.',
      },
    ],
    quiz: [
      {
        id: 's05c05l01q1',
        type: 'single',
        prompt: 'O que uma interface pode conter?',
        options: [
          { id: 'a', text: 'Assinaturas de métodos e propriedades, sem implementação.', correct: true },
          { id: 'b', text: 'Campos e construtores.' },
          { id: 'c', text: 'Métodos com corpo, mas sem campos.' },
          { id: 'd', text: 'Apenas propriedades.' },
        ],
        explanation:
          'Ela descreve capacidades, não estado. Sem campos e sem construtor, ela não tem nada a inicializar.',
      },
      {
        id: 's05c05l01q2',
        type: 'single',
        prompt: 'Por que os membros de uma interface não levam `public`?',
        options: [
          { id: 'a', text: 'Porque eles são públicos por definição.', correct: true },
          { id: 'b', text: 'Porque são privados por padrão.' },
          { id: 'c', text: 'Porque o acesso é definido na classe que implementa.' },
          { id: 'd', text: 'Porque interfaces não têm modificadores.' },
        ],
        explanation:
          'Uma interface existe para ser usada de fora. Um membro não público nela seria uma contradição.',
      },
      {
        id: 's05c05l01q3',
        type: 'single',
        prompt: 'Qual é a diferença conceitual entre interface e herança?',
        options: [
          { id: 'a', text: 'A herança diz "é um"; a interface diz "sabe fazer isso".', correct: true },
          { id: 'b', text: 'A interface é mais rápida.' },
          { id: 'c', text: 'A herança não permite polimorfismo.' },
          { id: 'd', text: 'Não há diferença conceitual.' },
        ],
        explanation:
          'Tipos sem nenhum parentesco podem compartilhar uma capacidade. Um relatório e uma imagem podem ambos saber se exportar, sem serem da mesma família.',
      },
    ],
    challenge: {
      brief:
        'Declare uma interface de exportação e implemente-a em duas classes sem nenhum parentesco entre si.',
      requirements: [
        '`IExportador` declara o método `Exportar(string dados)` devolvendo `string`, e a propriedade `Extensao` apenas de leitura',
        '`ExportadorCsv` troca cada espaço por `;` e tem extensão `csv`',
        '`ExportadorJson` devolve `{"dados":"..."}` com o conteúdo entre aspas, e tem extensão `json`',
        'As duas classes não herdam de nada',
        'O `Main` usa as duas por variáveis do tipo da interface',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a interface IExportador e as duas classes aqui

class Program
{
    static void Main()
    {
        string dados = Console.ReadLine();

        IExportador csv = new ExportadorCsv();
        IExportador json = new ExportadorJson();

        Console.WriteLine($"{csv.Extensao}: {csv.Exportar(dados)}");
        Console.WriteLine($"{json.Extensao}: {json.Exportar(dados)}");
        Console.WriteLine($"Csv e exportador: {csv is IExportador}");
        Console.WriteLine($"Tipo real: {json.GetType().Name}");
    }
}
`,
      solution: `using System;

interface IExportador
{
    string Exportar(string dados);
    string Extensao { get; }
}

class ExportadorCsv : IExportador
{
    public string Extensao => "csv";

    public string Exportar(string dados)
    {
        return dados.Replace(" ", ";");
    }
}

class ExportadorJson : IExportador
{
    public string Extensao => "json";

    public string Exportar(string dados)
    {
        return "{\\"dados\\":\\"" + dados + "\\"}";
    }
}

class Program
{
    static void Main()
    {
        string dados = Console.ReadLine();

        IExportador csv = new ExportadorCsv();
        IExportador json = new ExportadorJson();

        Console.WriteLine($"{csv.Extensao}: {csv.Exportar(dados)}");
        Console.WriteLine($"{json.Extensao}: {json.Exportar(dados)}");
        Console.WriteLine($"Csv e exportador: {csv is IExportador}");
        Console.WriteLine($"Tipo real: {json.GetType().Name}");
    }
}
`,
      hints: [
        'Os membros da classe que implementam a interface precisam ser `public`, mesmo que na interface não levem modificador.',
        'A propriedade `Extensao` pode usar a forma de seta: `public string Extensao => "csv";`.',
      ],
      tests: [
        {
          name: 'Frase com espacos',
          stdin: 'nome idade cidade\n',
          expectedStdout:
            'csv: nome;idade;cidade\njson: {"dados":"nome idade cidade"}\n' +
            'Csv e exportador: True\nTipo real: ExportadorJson',
        },
        {
          name: 'Palavra unica',
          stdin: 'teste\n',
          expectedStdout:
            'csv: teste\njson: {"dados":"teste"}\n' +
            'Csv e exportador: True\nTipo real: ExportadorJson',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c05l02',
    title: 'Implementando',
    objective: 'Fazer uma classe cumprir um contrato, e usar o tipo da interface para desacoplar quem chama de quem executa.',
    concept: [
      {
        kind: 'text',
        body:
          'Implementar uma interface é assinar um contrato: a classe se compromete a fornecer todos os membros declarados, com as assinaturas exatas.',
      },
      {
        kind: 'code',
        code: `class ExportadorCsv : IExportador
{
    public string Extensao => "csv";                    // obrigatorio

    public string Exportar(string dados)                // obrigatorio
    {
        return dados.Replace(" ", ";");
    }
}`,
        caption: 'Faltando qualquer membro, o código não compila.',
      },
      {
        kind: 'text',
        body:
          'O ganho aparece quando o código passa a depender da **interface**, não da classe concreta. Um método que recebe `IExportador` funciona com qualquer implementação, inclusive as que ainda não existem.',
      },
      {
        kind: 'code',
        code: `static void Salvar(IExportador exportador, string dados)
{
    Console.WriteLine(exportador.Exportar(dados));
}

Salvar(new ExportadorCsv(), "a b c");
Salvar(new ExportadorJson(), "a b c");    // funciona igual`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Isso se chama **desacoplamento**: quem usa não conhece quem implementa. Trocar a implementação, acrescentar uma nova, ou usar uma versão falsa em testes — nada disso exige tocar no código que chama.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Os membros que implementam a interface precisam ser `public` na classe. Esquecer isso produz um erro de compilação que costuma confundir, porque a interface não usava a palavra.',
      },
      {
        kind: 'text',
        body:
          'Uma classe pode implementar uma interface **e** herdar de outra classe ao mesmo tempo. A ordem na declaração é sempre a classe base primeiro, depois as interfaces.',
      },
    ],
    quiz: [
      {
        id: 's05c05l02q1',
        type: 'single',
        prompt: 'O que acontece se uma classe não implementar todos os membros da interface?',
        options: [
          { id: 'a', text: 'Erro de compilação.', correct: true },
          { id: 'b', text: 'Os membros faltantes ficam vazios.' },
          { id: 'c', text: 'Lança exceção ao chamar.' },
          { id: 'd', text: 'A interface é ignorada.' },
        ],
        explanation:
          'O contrato é verificado na compilação, exatamente como acontece com métodos abstratos herdados.',
      },
      {
        id: 's05c05l02q2',
        type: 'single',
        prompt: 'O que se ganha ao depender da interface em vez da classe concreta?',
        options: [
          { id: 'a', text: 'O código funciona com qualquer implementação, inclusive futuras.', correct: true },
          { id: 'b', text: 'A execução fica mais rápida.' },
          { id: 'c', text: 'Menos classes no projeto.' },
          { id: 'd', text: 'Dispensa a implementação.' },
        ],
        explanation:
          'É o desacoplamento. Quem chama depende do contrato, e trocar quem cumpre o contrato não exige nenhuma alteração.',
      },
      {
        id: 's05c05l02q3',
        type: 'single',
        prompt: 'Uma classe pode herdar de uma classe e implementar interfaces ao mesmo tempo?',
        options: [
          { id: 'a', text: 'Sim: a classe base vem primeiro na declaração, depois as interfaces.', correct: true },
          { id: 'b', text: 'Não: é preciso escolher entre os dois.' },
          { id: 'c', text: 'Sim, mas só uma interface.' },
          { id: 'd', text: 'Sim, com a interface antes da classe base.' },
        ],
        explanation:
          'A ordem importa para o compilador. `class X : Base, IUm, IDois` é a forma correta.',
      },
    ],
    challenge: {
      brief:
        'Escreva um método que opera sobre a interface, e passe implementações diferentes para ele sem que o método saiba quais são.',
      requirements: [
        '`IValidador` declara `Validar(string valor)` devolvendo `bool` e a propriedade `Nome` de leitura',
        '`ValidadorTamanho` recebe o tamanho mínimo no construtor e aprova textos com pelo menos esse comprimento; nome `tamanho`',
        '`ValidadorNumerico` aprova textos que convertem para inteiro; nome `numerico`',
        '`ValidadorNaoVazio` aprova textos com algum caractere não branco; nome `nao vazio`',
        'O `Main` passa cada validador para o mesmo método `Testar`, que não conhece os tipos concretos',
        'Não altere o método `Main` nem o método `Testar`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare IValidador e os tres validadores aqui

class Program
{
    static int Testar(IValidador validador, List<string> valores)
    {
        int aprovados = 0;

        foreach (string v in valores)
        {
            if (validador.Validar(v)) aprovados++;
        }

        Console.WriteLine($"{validador.Nome}: {aprovados}/{valores.Count} aprovados");
        return aprovados;
    }

    static void Main()
    {
        int minimo = int.Parse(Console.ReadLine());
        int n = int.Parse(Console.ReadLine());

        List<string> valores = new List<string>();
        for (int i = 0; i < n; i++)
        {
            valores.Add(Console.ReadLine());
        }

        List<IValidador> validadores = new List<IValidador>
        {
            new ValidadorTamanho(minimo),
            new ValidadorNumerico(),
            new ValidadorNaoVazio()
        };

        int total = 0;

        foreach (IValidador v in validadores)
        {
            total += Testar(v, valores);
        }

        Console.WriteLine($"Total de aprovacoes: {total}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

interface IValidador
{
    bool Validar(string valor);
    string Nome { get; }
}

class ValidadorTamanho : IValidador
{
    private int minimo;

    public ValidadorTamanho(int minimo)
    {
        this.minimo = minimo;
    }

    public string Nome => "tamanho";

    public bool Validar(string valor)
    {
        return valor != null && valor.Length >= minimo;
    }
}

class ValidadorNumerico : IValidador
{
    public string Nome => "numerico";

    public bool Validar(string valor)
    {
        return int.TryParse(valor, out int _);
    }
}

class ValidadorNaoVazio : IValidador
{
    public string Nome => "nao vazio";

    public bool Validar(string valor)
    {
        return valor != null && valor.Trim().Length > 0;
    }
}

class Program
{
    static int Testar(IValidador validador, List<string> valores)
    {
        int aprovados = 0;

        foreach (string v in valores)
        {
            if (validador.Validar(v)) aprovados++;
        }

        Console.WriteLine($"{validador.Nome}: {aprovados}/{valores.Count} aprovados");
        return aprovados;
    }

    static void Main()
    {
        int minimo = int.Parse(Console.ReadLine());
        int n = int.Parse(Console.ReadLine());

        List<string> valores = new List<string>();
        for (int i = 0; i < n; i++)
        {
            valores.Add(Console.ReadLine());
        }

        List<IValidador> validadores = new List<IValidador>
        {
            new ValidadorTamanho(minimo),
            new ValidadorNumerico(),
            new ValidadorNaoVazio()
        };

        int total = 0;

        foreach (IValidador v in validadores)
        {
            total += Testar(v, valores);
        }

        Console.WriteLine($"Total de aprovacoes: {total}");
    }
}
`,
      hints: [
        'Só `ValidadorTamanho` precisa de construtor — os outros dois não guardam estado.',
        '`int.TryParse(valor, out int _)` descarta o valor convertido e aproveita só o `bool`.',
      ],
      tests: [
        {
          name: 'Valores variados',
          stdin: '3\n4\nabc\n42\n\nab\n',
          expectedStdout:
            'tamanho: 1/4 aprovados\nnumerico: 1/4 aprovados\nnao vazio: 3/4 aprovados\n' +
            'Total de aprovacoes: 5',
        },
        {
          name: 'Todos numericos',
          stdin: '1\n2\n10\n20\n',
          expectedStdout:
            'tamanho: 2/2 aprovados\nnumerico: 2/2 aprovados\nnao vazio: 2/2 aprovados\n' +
            'Total de aprovacoes: 6',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c05l03',
    title: 'Múltiplas interfaces',
    objective: 'Combinar vários contratos em uma classe, algo que a herança simples não permite.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma classe herda de **uma** base, mas pode implementar **quantas** interfaces quiser. É assim que C# resolve a necessidade de combinar capacidades de origens diferentes.',
      },
      {
        kind: 'code',
        code: `interface ISalvavel { void Salvar(); }
interface IImprimivel { string Imprimir(); }
interface IValidavel { bool Valido(); }

class Documento : ISalvavel, IImprimivel, IValidavel
{
    // precisa implementar os tres contratos
}`,
        caption: 'As interfaces são listadas separadas por vírgula, depois da classe base se houver.',
      },
      {
        kind: 'text',
        body:
          'Cada interface pode ser usada isoladamente. Um método que só precisa imprimir recebe `IImprimivel`, e aceita qualquer coisa que saiba imprimir — documentos, relatórios, etiquetas.',
      },
      {
        kind: 'table',
        headers: ['Assinatura do método', 'Aceita'],
        rows: [
          ['`void P(Documento d)`', 'apenas documentos'],
          ['`void P(IImprimivel i)`', 'qualquer coisa imprimível'],
          ['`void P(ISalvavel s)`', 'qualquer coisa salvável'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Interfaces pequenas e focadas são melhores que uma grande. Um `IImprimivel` com um método é fácil de implementar em muitos lugares; um `IDocumento` com quinze métodos obriga quem só quer imprimir a fornecer os outros catorze.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Se duas interfaces declaram um método com a mesma assinatura, uma única implementação atende às duas. Quando os comportamentos precisam ser diferentes, existe a implementação explícita — assunto de uma lição adiante.',
      },
      {
        kind: 'text',
        body:
          'O `is` funciona com interfaces exatamente como com classes: `if (obj is IImprimivel)` testa se aquele objeto sabe imprimir, seja qual for o tipo dele.',
      },
    ],
    quiz: [
      {
        id: 's05c05l03q1',
        type: 'single',
        prompt: 'Quantas interfaces uma classe pode implementar?',
        options: [
          { id: 'a', text: 'Quantas quiser.', correct: true },
          { id: 'b', text: 'Uma.' },
          { id: 'c', text: 'Duas.' },
          { id: 'd', text: 'Depende se ela herda de alguma classe.' },
        ],
        explanation:
          'É a diferença central em relação à herança. Interfaces não trazem estado nem implementação, então combinar várias não gera ambiguidade de dados.',
      },
      {
        id: 's05c05l03q2',
        type: 'single',
        prompt: 'Por que preferir interfaces pequenas?',
        options: [
          { id: 'a', text: 'Porque quem só precisa de uma capacidade não é obrigado a fornecer as outras.', correct: true },
          { id: 'b', text: 'Porque compilam mais rápido.' },
          { id: 'c', text: 'Porque interfaces grandes não são permitidas.' },
          { id: 'd', text: 'Por questão de estilo apenas.' },
        ],
        explanation:
          'Uma interface grande força implementações incompletas ou métodos que lançam exceção. Contratos focados são cumpridos por inteiro.',
      },
      {
        id: 's05c05l03q3',
        type: 'single',
        prompt: 'O que acontece quando duas interfaces declaram o mesmo método?',
        options: [
          { id: 'a', text: 'Uma única implementação atende às duas.', correct: true },
          { id: 'b', text: 'Erro de compilação.' },
          { id: 'c', text: 'É preciso implementar duas vezes obrigatoriamente.' },
          { id: 'd', text: 'A segunda interface é ignorada.' },
        ],
        explanation:
          'Quando o comportamento deve ser o mesmo, isso é conveniente. Quando precisa ser diferente, a implementação explícita separa os dois.',
      },
    ],
    challenge: {
      brief:
        'Crie três interfaces focadas e classes que combinam capacidades diferentes, com métodos que operam sobre cada contrato isoladamente.',
      requirements: [
        '`IImprimivel` declara `Imprimir()` devolvendo `string`',
        '`ISalvavel` declara `Salvar()` devolvendo `string`',
        '`IValidavel` declara `Valido()` devolvendo `bool`',
        '`Relatorio` recebe título e implementa as três; imprime `[titulo]`, salva `titulo.pdf`, e é válido quando o título não está vazio',
        '`Etiqueta` recebe texto e implementa apenas `IImprimivel`; imprime `<texto>`',
        '`Rascunho` recebe conteúdo e implementa `ISalvavel` e `IValidavel`; salva `rascunho.tmp`, e é válido quando o conteúdo tem pelo menos 5 caracteres',
        'O `Main` percorre uma lista de `object` e usa `is` para descobrir quais capacidades cada item tem',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare as tres interfaces e as tres classes aqui

class Program
{
    static void Main()
    {
        string titulo = Console.ReadLine();
        string texto = Console.ReadLine();
        string conteudo = Console.ReadLine();

        List<object> itens = new List<object>
        {
            new Relatorio(titulo),
            new Etiqueta(texto),
            new Rascunho(conteudo)
        };

        int imprimiveis = 0;
        int salvaveis = 0;
        int validos = 0;

        foreach (object item in itens)
        {
            Console.WriteLine($"--- {item.GetType().Name} ---");

            if (item is IImprimivel i)
            {
                Console.WriteLine($"  imprime: {i.Imprimir()}");
                imprimiveis++;
            }

            if (item is ISalvavel s)
            {
                Console.WriteLine($"  salva: {s.Salvar()}");
                salvaveis++;
            }

            if (item is IValidavel v)
            {
                Console.WriteLine($"  valido: {v.Valido()}");
                if (v.Valido()) validos++;
            }
        }

        Console.WriteLine($"Imprimiveis: {imprimiveis}");
        Console.WriteLine($"Salvaveis: {salvaveis}");
        Console.WriteLine($"Validos: {validos}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

interface IImprimivel
{
    string Imprimir();
}

interface ISalvavel
{
    string Salvar();
}

interface IValidavel
{
    bool Valido();
}

class Relatorio : IImprimivel, ISalvavel, IValidavel
{
    private string titulo;

    public Relatorio(string titulo)
    {
        this.titulo = titulo;
    }

    public string Imprimir()
    {
        return $"[{titulo}]";
    }

    public string Salvar()
    {
        return $"{titulo}.pdf";
    }

    public bool Valido()
    {
        return titulo != null && titulo.Trim().Length > 0;
    }
}

class Etiqueta : IImprimivel
{
    private string texto;

    public Etiqueta(string texto)
    {
        this.texto = texto;
    }

    public string Imprimir()
    {
        return $"<{texto}>";
    }
}

class Rascunho : ISalvavel, IValidavel
{
    private string conteudo;

    public Rascunho(string conteudo)
    {
        this.conteudo = conteudo;
    }

    public string Salvar()
    {
        return "rascunho.tmp";
    }

    public bool Valido()
    {
        return conteudo != null && conteudo.Length >= 5;
    }
}

class Program
{
    static void Main()
    {
        string titulo = Console.ReadLine();
        string texto = Console.ReadLine();
        string conteudo = Console.ReadLine();

        List<object> itens = new List<object>
        {
            new Relatorio(titulo),
            new Etiqueta(texto),
            new Rascunho(conteudo)
        };

        int imprimiveis = 0;
        int salvaveis = 0;
        int validos = 0;

        foreach (object item in itens)
        {
            Console.WriteLine($"--- {item.GetType().Name} ---");

            if (item is IImprimivel i)
            {
                Console.WriteLine($"  imprime: {i.Imprimir()}");
                imprimiveis++;
            }

            if (item is ISalvavel s)
            {
                Console.WriteLine($"  salva: {s.Salvar()}");
                salvaveis++;
            }

            if (item is IValidavel v)
            {
                Console.WriteLine($"  valido: {v.Valido()}");
                if (v.Valido()) validos++;
            }
        }

        Console.WriteLine($"Imprimiveis: {imprimiveis}");
        Console.WriteLine($"Salvaveis: {salvaveis}");
        Console.WriteLine($"Validos: {validos}");
    }
}
`,
      hints: [
        'Cada classe lista apenas as interfaces que implementa, separadas por vírgula.',
        '`Etiqueta` não implementa `ISalvavel` nem `IValidavel` — os `is` correspondentes simplesmente não entram.',
      ],
      tests: [
        {
          name: 'Todos validos',
          stdin: 'Balanco\nFragil\nTexto longo\n',
          expectedStdout:
            '--- Relatorio ---\n  imprime: [Balanco]\n  salva: Balanco.pdf\n  valido: True\n' +
            '--- Etiqueta ---\n  imprime: <Fragil>\n' +
            '--- Rascunho ---\n  salva: rascunho.tmp\n  valido: True\n' +
            'Imprimiveis: 2\nSalvaveis: 2\nValidos: 2',
        },
        {
          name: 'Rascunho curto e titulo vazio',
          stdin: '\nEtiq\nabc\n',
          expectedStdout:
            '--- Relatorio ---\n  imprime: []\n  salva: .pdf\n  valido: False\n' +
            '--- Etiqueta ---\n  imprime: <Etiq>\n' +
            '--- Rascunho ---\n  salva: rascunho.tmp\n  valido: False\n' +
            'Imprimiveis: 2\nSalvaveis: 2\nValidos: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c05l04',
    title: 'Interface ou classe abstrata',
    objective: 'Escolher entre os dois mecanismos a partir do que cada um oferece e do que o problema exige.',
    concept: [
      {
        kind: 'text',
        body:
          'Os dois definem contratos e permitem polimorfismo. A escolha depende de duas perguntas: existe **estado ou código** compartilhado, e os tipos formam uma **família**?',
      },
      {
        kind: 'table',
        headers: ['Critério', 'Classe abstrata', 'Interface'],
        rows: [
          ['estado compartilhado', '**sim**', 'não'],
          ['implementação parcial', '**sim**', 'não'],
          ['quantas por tipo', 'uma', '**várias**'],
          ['relação', '"é um"', '"sabe fazer"'],
          ['tipos sem parentesco', 'não serve', '**serve**'],
        ],
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Classe abstrata',
          code: `abstract class Funcionario
{
    public string Nome { get; }
    public decimal Salario { get; }

    public abstract decimal Bonus();

    public decimal Total()
        => Salario + Bonus();
}`,
        },
        right: {
          label: 'Interface',
          code: `interface IExportavel
{
    string Exportar();
}

// implementado por Relatorio,
// Grafico, Planilha...
// que nao tem nada em comum`,
        },
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A regra prática: use classe abstrata quando os tipos compartilham **dados e código**; use interface quando compartilham apenas uma **capacidade**. Na dúvida, comece pela interface — ela é menos restritiva.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Os dois não são excludentes, e combiná-los é comum: uma classe abstrata que implementa uma interface oferece a implementação padrão do contrato, e as derivadas ajustam o que precisam.',
      },
      {
        kind: 'text',
        body:
          'Uma vantagem prática da interface: uma classe que já herda de outra ainda pode ganhar capacidades novas. Com classe abstrata, a única vaga de herança já estaria ocupada.',
      },
    ],
    quiz: [
      {
        id: 's05c05l04q1',
        type: 'single',
        prompt: 'Quando usar classe abstrata em vez de interface?',
        options: [
          { id: 'a', text: 'Quando os tipos compartilham estado e código, além do contrato.', correct: true },
          { id: 'b', text: 'Quando há mais de três tipos.' },
          { id: 'c', text: 'Quando os métodos devolvem `void`.' },
          { id: 'd', text: 'Sempre que houver polimorfismo.' },
        ],
        explanation:
          'Interfaces não guardam estado nem implementação. Quando existe algo real a compartilhar, a classe abstrata evita duplicação.',
      },
      {
        id: 's05c05l04q2',
        type: 'single',
        prompt: 'Qual é a vantagem prática da interface para uma classe que já herda de outra?',
        options: [
          { id: 'a', text: 'Ela ainda pode ganhar capacidades novas, sem a vaga de herança.', correct: true },
          { id: 'b', text: 'Ela passa a poder herdar de duas classes.' },
          { id: 'c', text: 'Ela dispensa a classe base.' },
          { id: 'd', text: 'Ela fica mais rápida.' },
        ],
        explanation:
          'A herança é limitada a uma base; as interfaces não têm limite. Isso as torna a única opção quando a vaga já está ocupada.',
      },
      {
        id: 's05c05l04q3',
        type: 'single',
        prompt: 'É possível combinar os dois?',
        options: [
          { id: 'a', text: 'Sim: uma classe abstrata pode implementar uma interface e oferecer a implementação padrão.', correct: true },
          { id: 'b', text: 'Não: são mecanismos excludentes.' },
          { id: 'c', text: 'Sim, mas só em classes seladas.' },
          { id: 'd', text: 'Sim, mas a interface é ignorada.' },
        ],
        explanation:
          'É um arranjo muito comum: a interface define o contrato público, e a classe abstrata poupa cada derivada de reimplementar o que é comum.',
      },
    ],
    challenge: {
      brief:
        'Combine os dois mecanismos: uma interface define o contrato, uma classe abstrata oferece a base compartilhada, e as derivadas completam o que falta.',
      requirements: [
        '`INotificavel` declara `Enviar(string mensagem)` devolvendo `string` e a propriedade `Canal` de leitura',
        '`NotificadorBase` é abstrata, implementa `INotificavel`, recebe o destinatário no construtor e o expõe como `Destinatario`',
        '`NotificadorBase.Enviar` é **não virtual** e devolve `[canal] destinatario: mensagem formatada`, usando `Formatar(mensagem)`',
        '`Formatar(string)` é `protected virtual` e devolve a mensagem sem alteração',
        '`Canal` continua abstrato na classe base',
        '`NotificadorEmail` tem canal `email` e formata a mensagem em minúsculas',
        '`NotificadorSms` tem canal `sms` e corta a mensagem em 10 caracteres quando ela é maior',
        '`NotificadorPush` tem canal `push` e não altera a formatação',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare INotificavel, NotificadorBase (abstrata) e os tres notificadores

class Program
{
    static void Main()
    {
        string destinatario = Console.ReadLine();
        string mensagem = Console.ReadLine();

        List<INotificavel> canais = new List<INotificavel>
        {
            new NotificadorEmail(destinatario),
            new NotificadorSms(destinatario),
            new NotificadorPush(destinatario)
        };

        foreach (INotificavel n in canais)
        {
            Console.WriteLine(n.Enviar(mensagem));
        }

        Console.WriteLine($"Canais: {canais.Count}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

interface INotificavel
{
    string Enviar(string mensagem);
    string Canal { get; }
}

abstract class NotificadorBase : INotificavel
{
    public string Destinatario { get; }

    protected NotificadorBase(string destinatario)
    {
        Destinatario = destinatario;
    }

    public abstract string Canal { get; }

    public string Enviar(string mensagem)
    {
        return $"[{Canal}] {Destinatario}: {Formatar(mensagem)}";
    }

    protected virtual string Formatar(string mensagem)
    {
        return mensagem;
    }
}

class NotificadorEmail : NotificadorBase
{
    public NotificadorEmail(string destinatario)
        : base(destinatario)
    {
    }

    public override string Canal => "email";

    protected override string Formatar(string mensagem)
    {
        return mensagem.ToLower();
    }
}

class NotificadorSms : NotificadorBase
{
    public NotificadorSms(string destinatario)
        : base(destinatario)
    {
    }

    public override string Canal => "sms";

    protected override string Formatar(string mensagem)
    {
        return mensagem.Length > 10 ? mensagem.Substring(0, 10) : mensagem;
    }
}

class NotificadorPush : NotificadorBase
{
    public NotificadorPush(string destinatario)
        : base(destinatario)
    {
    }

    public override string Canal => "push";
}

class Program
{
    static void Main()
    {
        string destinatario = Console.ReadLine();
        string mensagem = Console.ReadLine();

        List<INotificavel> canais = new List<INotificavel>
        {
            new NotificadorEmail(destinatario),
            new NotificadorSms(destinatario),
            new NotificadorPush(destinatario)
        };

        foreach (INotificavel n in canais)
        {
            Console.WriteLine(n.Enviar(mensagem));
        }

        Console.WriteLine($"Canais: {canais.Count}");
      }
}
`,
      hints: [
        '`Canal` é declarado abstrato na classe base e implementado com seta em cada derivada.',
        '`NotificadorPush` não sobrescreve `Formatar` — o padrão da base já serve.',
      ],
      tests: [
        {
          name: 'Mensagem longa',
          stdin: 'ana@teste\nOLA MUNDO INTEIRO\n',
          expectedStdout:
            '[email] ana@teste: ola mundo inteiro\n[sms] ana@teste: OLA MUNDO\n' +
            '[push] ana@teste: OLA MUNDO INTEIRO\nCanais: 3',
        },
        {
          name: 'Mensagem curta',
          stdin: 'bruno\nOI\n',
          expectedStdout:
            '[email] bruno: oi\n[sms] bruno: OI\n[push] bruno: OI\nCanais: 3',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c05l05',
    title: 'IComparable e ordenação natural',
    objective: 'Definir a ordem natural de um tipo, fazendo `Sort` funcionar sem comparação externa.',
    concept: [
      {
        kind: 'text',
        body:
          'Na Seção 4 você passava uma comparação ao `Sort`. Quando um tipo tem uma ordem **natural** — a que faz sentido por padrão —, ele pode declará-la implementando `IComparable<T>`.',
      },
      {
        kind: 'code',
        code: `class Produto : IComparable<Produto>
{
    public string Nome { get; }
    public int Preco { get; }

    public int CompareTo(Produto outro)
    {
        return Preco.CompareTo(outro.Preco);   // ordem natural: por preco
    }
}

lista.Sort();       // agora funciona sem argumento`,
        caption: 'O contrato é um método só, que devolve o mesmo `int` da Seção 4.',
      },
      {
        kind: 'table',
        headers: ['`CompareTo` devolve', 'Significa'],
        rows: [
          ['negativo', 'este vem antes do outro'],
          ['zero', 'ordem indiferente'],
          ['positivo', 'este vem depois do outro'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Delegar para o `CompareTo` de um campo é a forma mais segura de implementar: `Preco.CompareTo(outro.Preco)` já devolve o valor correto, sem risco de estouro que uma subtração teria.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A ordem natural precisa ser **óbvia** para quem usa o tipo. Se existem vários critérios igualmente razoáveis — nome, preço, data —, nenhum é natural, e passar a comparação explicitamente comunica melhor.',
      },
      {
        kind: 'text',
        body:
          'Depois de implementar, `Sort`, `Max`, `Min` e `OrderBy` passam a funcionar sobre o tipo sem nenhuma configuração — todos eles procuram por essa interface.',
      },
    ],
    quiz: [
      {
        id: 's05c05l05q1',
        type: 'single',
        prompt: 'O que `CompareTo` deve devolver quando o objeto atual vem antes?',
        options: [
          { id: 'a', text: 'Um número negativo.', correct: true },
          { id: 'b', code: 'true' },
          { id: 'c', text: 'Um número positivo.' },
          { id: 'd', code: '0' },
        ],
        explanation:
          'É a mesma convenção do `Comparison` da Seção 4. Negativo significa "menor", e o menor vem primeiro na ordem crescente.',
      },
      {
        id: 's05c05l05q2',
        type: 'single',
        prompt: 'Por que delegar para o `CompareTo` de um campo em vez de subtrair?',
        options: [
          { id: 'a', text: 'Porque a subtração pode estourar com valores extremos.', correct: true },
          { id: 'b', text: 'Porque a subtração não compila.' },
          { id: 'c', text: 'Porque `CompareTo` é mais rápido.' },
          { id: 'd', text: 'É indiferente.' },
        ],
        explanation:
          'A diferença entre `int.MaxValue` e um negativo grande não cabe em um `int`, e o sinal sai errado. `CompareTo` nunca tem esse problema.',
      },
      {
        id: 's05c05l05q3',
        type: 'single',
        prompt: 'Quando **não** implementar `IComparable`?',
        options: [
          { id: 'a', text: 'Quando existem vários critérios igualmente razoáveis.', correct: true },
          { id: 'b', text: 'Quando o tipo tem mais de dois campos.' },
          { id: 'c', text: 'Quando o tipo é uma classe.' },
          { id: 'd', text: 'Nunca: sempre vale a pena.' },
        ],
        explanation:
          'Escolher arbitrariamente um critério como "natural" surpreende quem usa. Sem ordem óbvia, passar a comparação deixa a intenção explícita.',
      },
    ],
    challenge: {
      brief:
        'Defina a ordem natural de um tipo e mostre que ela é usada automaticamente por `Sort`, `Max` e `Min`.',
      requirements: [
        '`Tarefa` implementa `IComparable<Tarefa>`, recebe descrição e prioridade (`int`) no construtor',
        'A ordem natural é por prioridade **crescente**; empates são desempatados pela descrição em ordem alfabética',
        '`ToString()` devolve `descricao (P prioridade)`',
        'O `Main` ordena com `Sort()` sem argumentos e usa `Max()` e `Min()` sem seletor',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

// Declare a classe Tarefa aqui

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Tarefa> tarefas = new List<Tarefa>();

        for (int i = 0; i < n; i++)
        {
            string descricao = Console.ReadLine();
            int prioridade = int.Parse(Console.ReadLine());
            tarefas.Add(new Tarefa(descricao, prioridade));
        }

        tarefas.Sort();

        foreach (Tarefa t in tarefas)
        {
            Console.WriteLine(t);
        }

        Console.WriteLine($"Mais urgente: {tarefas.Min()}");
        Console.WriteLine($"Menos urgente: {tarefas.Max()}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Tarefa : IComparable<Tarefa>
{
    public string Descricao { get; }
    public int Prioridade { get; }

    public Tarefa(string descricao, int prioridade)
    {
        Descricao = descricao;
        Prioridade = prioridade;
    }

    public int CompareTo(Tarefa outra)
    {
        int porPrioridade = Prioridade.CompareTo(outra.Prioridade);

        if (porPrioridade != 0)
        {
            return porPrioridade;
        }

        return Descricao.CompareTo(outra.Descricao);
    }

    public override string ToString()
    {
        return $"{Descricao} (P{Prioridade})";
    }
}

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Tarefa> tarefas = new List<Tarefa>();

        for (int i = 0; i < n; i++)
        {
            string descricao = Console.ReadLine();
            int prioridade = int.Parse(Console.ReadLine());
            tarefas.Add(new Tarefa(descricao, prioridade));
        }

        tarefas.Sort();

        foreach (Tarefa t in tarefas)
        {
            Console.WriteLine(t);
        }

        Console.WriteLine($"Mais urgente: {tarefas.Min()}");
        Console.WriteLine($"Menos urgente: {tarefas.Max()}");
    }
}
`,
      hints: [
        'O desempate segue o padrão da Seção 4: guarde a primeira comparação e só use a segunda quando ela der zero.',
        '`Min()` e `Max()` sem argumento usam exatamente o `CompareTo` que você implementou.',
      ],
      tests: [
        {
          name: 'Prioridades com empate',
          stdin: '4\nRevisar codigo\n2\nCorrigir bug\n1\nAtualizar docs\n2\nDeploy\n3\n',
          expectedStdout:
            'Corrigir bug (P1)\nAtualizar docs (P2)\nRevisar codigo (P2)\nDeploy (P3)\n' +
            'Mais urgente: Corrigir bug (P1)\nMenos urgente: Deploy (P3)',
        },
        {
          name: 'Uma tarefa',
          stdin: '1\nUnica\n5\n',
          expectedStdout:
            'Unica (P5)\nMais urgente: Unica (P5)\nMenos urgente: Unica (P5)',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c05l06',
    title: 'IEquatable e igualdade',
    objective: 'Definir o que torna dois objetos iguais, e entender por que o `==` continua comparando referências.',
    concept: [
      {
        kind: 'text',
        body:
          'Por padrão, dois objetos de classe só são iguais se forem **o mesmo objeto**. Quando a igualdade deve ser por conteúdo, o tipo precisa declarar isso implementando `IEquatable<T>`.',
      },
      {
        kind: 'code',
        code: `class Produto : IEquatable<Produto>
{
    public string Nome { get; }
    public int Preco { get; }

    public bool Equals(Produto outro)
    {
        return outro != null && Nome == outro.Nome && Preco == outro.Preco;
    }
}`,
      },
      {
        kind: 'output',
        code: `var p1 = new Produto("X", 5);
var p2 = new Produto("X", 5);

p1.Equals(p2)                  ->  True
lista.Contains(p2)             ->  True
p1 == p2                       ->  False   <-- atencao`,
        caption: 'O `Equals` passa a comparar conteúdo, mas o `==` continua comparando identidade.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Implementar `IEquatable` **não** muda o comportamento do `==`. Para isso seria preciso sobrecarregar o operador separadamente — e é justamente essa dupla configuração que o `record` da Seção 3 faz sozinho.',
      },
      {
        kind: 'text',
        body:
          'Vários métodos passam a funcionar corretamente depois disso: `Contains`, `IndexOf`, `Distinct`, `Remove` — todos eles procuram por `Equals` para decidir o que é igual.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Ao definir igualdade, a regra é que objetos iguais devem produzir o mesmo `GetHashCode`. Sem isso, o objeto se comporta de forma errada como chave de `Dictionary` e dentro de `HashSet` — que usam o código de espalhamento antes do `Equals`.',
      },
      {
        kind: 'text',
        body:
          'Se o seu tipo é essencialmente um pacote de dados com igualdade por valor, o `record` já entrega tudo isso pronto. Escrever à mão faz sentido quando a regra de igualdade é específica — por exemplo, comparar só o identificador.',
      },
    ],
    quiz: [
      {
        id: 's05c05l06q1',
        type: 'single',
        prompt: 'Implementar `IEquatable<T>` muda o comportamento do `==`?',
        options: [
          { id: 'a', text: 'Não: o `==` continua comparando referências.', correct: true },
          { id: 'b', text: 'Sim: os dois passam a comparar conteúdo.' },
          { id: 'c', text: 'Sim, mas só para tipos por valor.' },
          { id: 'd', text: 'Depende de o tipo ser `sealed`.' },
        ],
        explanation:
          'São mecanismos separados. Mudar o `==` exige sobrecarregar o operador, o que o `record` faz automaticamente.',
      },
      {
        id: 's05c05l06q2',
        type: 'multiple',
        prompt: 'Quais operações passam a funcionar corretamente com `Equals` implementado?',
        options: [
          { id: 'a', code: 'lista.Contains(x)', correct: true },
          { id: 'b', code: 'lista.Remove(x)', correct: true },
          { id: 'c', code: 'colecao.Distinct()', correct: true },
          { id: 'd', code: 'lista.Sort()' },
        ],
        explanation:
          '`Sort` depende de `IComparable`, não de igualdade. As outras três precisam saber quando dois elementos são o mesmo.',
      },
      {
        id: 's05c05l06q3',
        type: 'single',
        prompt: 'Por que sobrescrever `GetHashCode` junto com `Equals`?',
        options: [
          { id: 'a', text: 'Porque `Dictionary` e `HashSet` usam o código de espalhamento antes do `Equals`.', correct: true },
          { id: 'b', text: 'Porque o compilador exige.' },
          { id: 'c', text: 'Para melhorar o desempenho do `Equals`.' },
          { id: 'd', text: 'Não é necessário.' },
        ],
        explanation:
          'Objetos iguais com códigos diferentes acabam em posições diferentes da tabela, e o `Equals` nunca chega a ser chamado — o item some do conjunto.',
      },
    ],
    challenge: {
      brief:
        'Implemente igualdade por conteúdo em um tipo e demonstre que ela afeta `Equals` e as coleções, mas não o `==`.',
      requirements: [
        '`Cor` implementa `IEquatable<Cor>`, recebe `R`, `G` e `B` (`int`) no construtor',
        'Duas cores são iguais quando os três componentes coincidem',
        'Sobrescreva também `Equals(object)` e `GetHashCode`',
        '`GetHashCode` pode combinar os três componentes com `HashCode.Combine(R, G, B)`',
        '`ToString()` devolve `(R,G,B)`',
        'O `Main` compara cores, testa `Contains` e conta os valores distintos',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

// Declare a classe Cor aqui

class Program
{
    static void Main()
    {
        int r = int.Parse(Console.ReadLine());
        int g = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());

        Cor c1 = new Cor(r, g, b);
        Cor c2 = new Cor(r, g, b);
        Cor c3 = new Cor(0, 0, 0);

        List<Cor> paleta = new List<Cor> { c1, c3, c2 };

        Console.WriteLine($"c1: {c1}");
        Console.WriteLine($"Equals: {c1.Equals(c2)}");
        Console.WriteLine($"Operador ==: {c1 == c2}");
        Console.WriteLine($"Mesma referencia: {ReferenceEquals(c1, c2)}");
        Console.WriteLine($"Contains: {paleta.Contains(new Cor(r, g, b))}");
        Console.WriteLine($"Distintas: {paleta.Distinct().Count()}");
        Console.WriteLine($"Em HashSet: {new HashSet<Cor>(paleta).Count}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Cor : IEquatable<Cor>
{
    public int R { get; }
    public int G { get; }
    public int B { get; }

    public Cor(int r, int g, int b)
    {
        R = r;
        G = g;
        B = b;
    }

    public bool Equals(Cor outra)
    {
        return outra != null && R == outra.R && G == outra.G && B == outra.B;
    }

    public override bool Equals(object obj)
    {
        return Equals(obj as Cor);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(R, G, B);
    }

    public override string ToString()
    {
        return $"({R},{G},{B})";
    }
}

class Program
{
    static void Main()
    {
        int r = int.Parse(Console.ReadLine());
        int g = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());

        Cor c1 = new Cor(r, g, b);
        Cor c2 = new Cor(r, g, b);
        Cor c3 = new Cor(0, 0, 0);

        List<Cor> paleta = new List<Cor> { c1, c3, c2 };

        Console.WriteLine($"c1: {c1}");
        Console.WriteLine($"Equals: {c1.Equals(c2)}");
        Console.WriteLine($"Operador ==: {c1 == c2}");
        Console.WriteLine($"Mesma referencia: {ReferenceEquals(c1, c2)}");
        Console.WriteLine($"Contains: {paleta.Contains(new Cor(r, g, b))}");
        Console.WriteLine($"Distintas: {paleta.Distinct().Count()}");
        Console.WriteLine($"Em HashSet: {new HashSet<Cor>(paleta).Count}");
    }
}
`,
      hints: [
        '`Equals(object)` pode delegar para a versão tipada usando `obj as Cor` — que devolve `null` se o tipo não bater.',
        '`HashCode.Combine` já existe no .NET e resolve o cálculo do código de espalhamento.',
      ],
      tests: [
        {
          name: 'Cor colorida',
          stdin: '255\n128\n0\n',
          expectedStdout:
            'c1: (255,128,0)\nEquals: True\nOperador ==: False\nMesma referencia: False\n' +
            'Contains: True\nDistintas: 2\nEm HashSet: 2',
        },
        {
          name: 'Cor igual ao preto',
          stdin: '0\n0\n0\n',
          expectedStdout:
            'c1: (0,0,0)\nEquals: True\nOperador ==: False\nMesma referencia: False\n' +
            'Contains: True\nDistintas: 1\nEm HashSet: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c05l07',
    title: 'IEnumerable e foreach',
    objective: 'Tornar um tipo próprio percorrível com `foreach`, entendendo o contrato que o laço exige.',
    concept: [
      {
        kind: 'text',
        body:
          'O `foreach` não funciona por mágica: ele exige que o tipo forneça um **enumerador**. Qualquer classe que implemente `IEnumerable<T>` passa a ser percorrível — e ganha todo o LINQ junto.',
      },
      {
        kind: 'code',
        code: `class Baralho : IEnumerable<string>
{
    private List<string> cartas = new List<string> { "A", "K", "Q" };

    public IEnumerator<string> GetEnumerator()
    {
        return cartas.GetEnumerator();          // delega para a lista interna
    }

    IEnumerator IEnumerable.GetEnumerator()     // versao antiga, obrigatoria
    {
        return GetEnumerator();
    }
}`,
        caption: 'Delegar para uma coleção interna é a implementação mais simples e mais comum.',
      },
      {
        kind: 'text',
        body:
          'A segunda versão do método, sem tipo genérico, existe por compatibilidade com código anterior aos genéricos. Ela é escrita de forma explícita — o assunto da próxima lição — e apenas delega para a primeira.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O ganho vai além do `foreach`: todo o LINQ da Seção 4 passa a funcionar sobre o seu tipo. `Where`, `Select`, `Count`, `OrderBy` — tudo isso opera sobre `IEnumerable<T>`.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Devolver o enumerador da coleção interna expõe a ordem dela, mas não permite modificá-la pelo `foreach`. Ainda assim, se a classe precisa controlar o que é exposto, ela pode enumerar um subconjunto em vez da lista inteira.',
      },
      {
        kind: 'text',
        body:
          'Existe uma forma ainda mais simples usando `yield return`, que constrói o enumerador automaticamente. Ela é um recurso da Seção 8, e por enquanto delegar resolve todos os casos práticos.',
      },
    ],
    quiz: [
      {
        id: 's05c05l07q1',
        type: 'single',
        prompt: 'O que o `foreach` exige de um tipo?',
        options: [
          { id: 'a', text: 'Um método `GetEnumerator` que devolva um enumerador.', correct: true },
          { id: 'b', text: 'Que ele herde de `List<T>`.' },
          { id: 'c', text: 'Que ele tenha um indexador.' },
          { id: 'd', text: 'Que ele implemente `IComparable`.' },
        ],
        explanation:
          'É o contrato de `IEnumerable<T>`. Implementá-lo é o que torna qualquer tipo percorrível.',
      },
      {
        id: 's05c05l07q2',
        type: 'single',
        prompt: 'O que se ganha além do `foreach`?',
        options: [
          { id: 'a', text: 'Todos os operadores do LINQ.', correct: true },
          { id: 'b', text: 'Acesso por índice.' },
          { id: 'c', text: 'Ordenação automática.' },
          { id: 'd', text: 'Igualdade por conteúdo.' },
        ],
        explanation:
          'O LINQ inteiro é construído sobre `IEnumerable<T>`. Implementar a interface abre a biblioteca toda de uma vez.',
      },
      {
        id: 's05c05l07q3',
        type: 'single',
        prompt: 'Por que existe uma segunda versão de `GetEnumerator` sem genérico?',
        options: [
          { id: 'a', text: 'Por compatibilidade com código anterior aos genéricos.', correct: true },
          { id: 'b', text: 'Para permitir enumerar em ordem inversa.' },
          { id: 'c', text: 'Porque o `foreach` chama as duas.' },
          { id: 'd', text: 'Para melhorar o desempenho.' },
        ],
        explanation:
          '`IEnumerable<T>` herda de `IEnumerable`, que é anterior aos genéricos. A versão antiga é obrigatória e costuma apenas delegar para a nova.',
      },
    ],
    challenge: {
      brief:
        'Torne uma classe própria percorrível com `foreach` e use LINQ sobre ela, sem expor a coleção interna.',
      requirements: [
        '`Turma` implementa `IEnumerable<string>` e recebe o nome da turma no construtor',
        '`Matricular(string aluno)` acrescenta um aluno à lista interna, ignorando nomes vazios',
        'A lista interna é privada e não é exposta por nenhuma propriedade',
        'O `foreach` sobre a turma percorre os alunos matriculados',
        '`Total` é uma propriedade de leitura com a quantidade de alunos',
        'O `Main` usa `foreach` e operadores LINQ sobre a turma',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

// Declare a classe Turma aqui

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        int n = int.Parse(Console.ReadLine());

        Turma turma = new Turma(nome);

        for (int i = 0; i < n; i++)
        {
            turma.Matricular(Console.ReadLine());
        }

        Console.WriteLine($"Turma {nome}: {turma.Total} alunos");

        foreach (string aluno in turma)
        {
            Console.WriteLine($"  - {aluno}");
        }

        Console.WriteLine($"Com A: {turma.Count(a => a.StartsWith("A"))}");
        Console.WriteLine($"Ordenados: {string.Join(" ", turma.OrderBy(a => a))}");
        Console.WriteLine($"Primeiro: {turma.FirstOrDefault() ?? "nenhum"}");
    }
}
`,
      solution: `using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

class Turma : IEnumerable<string>
{
    private List<string> alunos = new List<string>();

    public string Nome { get; }

    public Turma(string nome)
    {
        Nome = nome;
    }

    public int Total => alunos.Count;

    public void Matricular(string aluno)
    {
        if (aluno == null || aluno.Trim().Length == 0)
        {
            return;
        }

        alunos.Add(aluno);
    }

    public IEnumerator<string> GetEnumerator()
    {
        return alunos.GetEnumerator();
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

        Turma turma = new Turma(nome);

        for (int i = 0; i < n; i++)
        {
            turma.Matricular(Console.ReadLine());
        }

        Console.WriteLine($"Turma {nome}: {turma.Total} alunos");

        foreach (string aluno in turma)
        {
            Console.WriteLine($"  - {aluno}");
        }

        Console.WriteLine($"Com A: {turma.Count(a => a.StartsWith("A"))}");
        Console.WriteLine($"Ordenados: {string.Join(" ", turma.OrderBy(a => a))}");
        Console.WriteLine($"Primeiro: {turma.FirstOrDefault() ?? "nenhum"}");
    }
}
`,
      hints: [
        'A versão não genérica de `GetEnumerator` é escrita como `IEnumerator IEnumerable.GetEnumerator()` e apenas chama a outra.',
        'O `using System.Collections;` é necessário para o tipo `IEnumerator` não genérico.',
      ],
      tests: [
        {
          name: 'Turma com alunos',
          stdin: 'Turma A\n4\nCarlos\nAna\n\nBruno\n',
          expectedStdout:
            'Turma Turma A: 3 alunos\n  - Carlos\n  - Ana\n  - Bruno\n' +
            'Com A: 1\nOrdenados: Ana Bruno Carlos\nPrimeiro: Carlos',
        },
        {
          name: 'Turma vazia',
          stdin: 'Vazia\n1\n\n',
          expectedStdout:
            'Turma Vazia: 0 alunos\nCom A: 0\nOrdenados:\nPrimeiro: nenhum',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c05l08',
    title: 'Implementação explícita',
    objective: 'Implementar um membro de forma que só seja acessível pelo tipo da interface, resolvendo conflitos de nome.',
    concept: [
      {
        kind: 'text',
        body:
          'Um membro implementado **explicitamente** pertence à interface, não à classe. Ele só pode ser acessado através de uma variável do tipo da interface.',
      },
      {
        kind: 'code',
        code: `interface IIngles { string Falar(); }
interface IPortugues { string Falar(); }

class Bilingue : IIngles, IPortugues
{
    string IIngles.Falar() => "hello";        // sem 'public'
    string IPortugues.Falar() => "ola";
}

Bilingue b = new Bilingue();
b.Falar();                    // NAO compila
((IIngles)b).Falar();         // hello
((IPortugues)b).Falar();      // ola`,
        caption: 'O nome do membro é prefixado pela interface, e não leva modificador de acesso.',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Solução'],
        rows: [
          ['duas interfaces, mesmo nome, comportamentos diferentes', 'implementação explícita'],
          ['o membro não faz sentido na API pública da classe', 'implementação explícita'],
          ['caso normal', 'implementação implícita, com `public`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O segundo uso é o mais comum na prática: esconder da API pública um membro que existe só para cumprir contrato. É por isso que a versão não genérica de `GetEnumerator` costuma ser explícita — ela existe por compatibilidade e ninguém deveria chamá-la diretamente.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um membro explícito não pode ser `public`, `virtual` nem `override`. Ele fica fora do sistema de herança normal, o que também significa que derivadas não conseguem substituí-lo.',
      },
      {
        kind: 'text',
        body:
          'Na dúvida, prefira a implementação implícita: ela é mais simples e o membro fica acessível pelos dois caminhos. A explícita é para resolver problemas específicos.',
      },
    ],
    quiz: [
      {
        id: 's05c05l08q1',
        type: 'single',
        prompt: 'Como um membro implementado explicitamente é acessado?',
        options: [
          { id: 'a', text: 'Apenas por uma variável do tipo da interface.', correct: true },
          { id: 'b', text: 'Pelos dois caminhos, como o implícito.' },
          { id: 'c', text: 'Apenas de dentro da própria classe.' },
          { id: 'd', text: 'Apenas por classes derivadas.' },
        ],
        explanation:
          'Ele não faz parte da API pública da classe. Uma conversão para o tipo da interface é obrigatória.',
      },
      {
        id: 's05c05l08q2',
        type: 'single',
        prompt: 'Qual é o uso mais comum da implementação explícita?',
        options: [
          { id: 'a', text: 'Esconder da API pública um membro que existe só para cumprir contrato.', correct: true },
          { id: 'b', text: 'Melhorar o desempenho.' },
          { id: 'c', text: 'Permitir herança múltipla.' },
          { id: 'd', text: 'Tornar o membro virtual.' },
        ],
        explanation:
          'O caso do `GetEnumerator` não genérico é o exemplo canônico: ele precisa existir, mas não deveria aparecer para quem usa a classe.',
      },
      {
        id: 's05c05l08q3',
        type: 'single',
        prompt: 'Um membro explícito pode ser `virtual`?',
        options: [
          { id: 'a', text: 'Não: ele fica fora do sistema de herança normal.', correct: true },
          { id: 'b', text: 'Sim, como qualquer outro membro.' },
          { id: 'c', text: 'Sim, mas só em classes abstratas.' },
          { id: 'd', text: 'Sim, se a interface declarar `virtual`.' },
        ],
        explanation:
          'Ele também não aceita modificadores de acesso. Derivadas não conseguem substituí-lo diretamente — precisariam reimplementar a interface inteira.',
      },
    ],
    challenge: {
      brief:
        'Resolva um conflito de nomes entre duas interfaces com implementação explícita, e esconda um membro de compatibilidade da API pública.',
      requirements: [
        '`IEmMetros` declara `Distancia()` devolvendo `double`',
        '`IEmMilhas` declara `Distancia()` devolvendo `double`',
        '`Percurso` recebe a distância em metros e implementa as duas interfaces **explicitamente**',
        '`IEmMetros.Distancia()` devolve os metros; `IEmMilhas.Distancia()` devolve metros dividido por 1609.34',
        '`Percurso` expõe publicamente `Descrever()`, que usa as duas conversões e devolve `X m = Y mi`, com duas casas em cada',
        'A chamada `percurso.Distancia()` **não** pode compilar',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare IEmMetros, IEmMilhas e Percurso aqui

class Program
{
    static void Main()
    {
        double metros = double.Parse(Console.ReadLine());

        Percurso p = new Percurso(metros);

        IEmMetros emMetros = p;
        IEmMilhas emMilhas = p;

        Console.WriteLine($"Metros: {emMetros.Distancia():F2}");
        Console.WriteLine($"Milhas: {emMilhas.Distancia():F2}");
        Console.WriteLine(p.Descrever());
        Console.WriteLine($"Mesmo objeto: {ReferenceEquals(emMetros, emMilhas)}");
    }
}
`,
      solution: `using System;

interface IEmMetros
{
    double Distancia();
}

interface IEmMilhas
{
    double Distancia();
}

class Percurso : IEmMetros, IEmMilhas
{
    private double metros;

    public Percurso(double metros)
    {
        this.metros = metros;
    }

    double IEmMetros.Distancia()
    {
        return metros;
    }

    double IEmMilhas.Distancia()
    {
        return metros / 1609.34;
    }

    public string Descrever()
    {
        double m = ((IEmMetros)this).Distancia();
        double mi = ((IEmMilhas)this).Distancia();

        return $"{m:F2} m = {mi:F2} mi";
    }
}

class Program
{
    static void Main()
    {
        double metros = double.Parse(Console.ReadLine());

        Percurso p = new Percurso(metros);

        IEmMetros emMetros = p;
        IEmMilhas emMilhas = p;

        Console.WriteLine($"Metros: {emMetros.Distancia():F2}");
        Console.WriteLine($"Milhas: {emMilhas.Distancia():F2}");
        Console.WriteLine(p.Descrever());
        Console.WriteLine($"Mesmo objeto: {ReferenceEquals(emMetros, emMilhas)}");
    }
}
`,
      hints: [
        'Os membros explícitos não levam `public` e são prefixados pelo nome da interface.',
        'Dentro de `Descrever()`, converta `this` para cada interface: `((IEmMetros)this).Distancia()`.',
      ],
      tests: [
        {
          name: 'Cinco mil metros',
          stdin: '5000\n',
          expectedStdout:
            'Metros: 5000.00\nMilhas: 3.11\n5000.00 m = 3.11 mi\nMesmo objeto: True',
        },
        {
          name: 'Distancia zero',
          stdin: '0\n',
          expectedStdout:
            'Metros: 0.00\nMilhas: 0.00\n0.00 m = 0.00 mi\nMesmo objeto: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c05l09',
    title: 'Prática: plugins de exportação',
    objective: 'Construir um sistema de plugins em que implementações são registradas e selecionadas em tempo de execução.',
    concept: [
      {
        kind: 'text',
        body:
          'Um sistema de plugins é a aplicação mais direta de interfaces: o núcleo define o contrato, e as implementações são descobertas e selecionadas sem que ele conheça nenhuma delas.',
      },
      {
        kind: 'code',
        code: `Dictionary<string, IExportador> plugins = new Dictionary<string, IExportador>();

plugins["csv"] = new ExportadorCsv();
plugins["json"] = new ExportadorJson();

// selecao em tempo de execucao
if (plugins.TryGetValue(formato, out IExportador exportador))
{
    Console.WriteLine(exportador.Exportar(dados));
}`,
        caption: 'O dicionário da Seção 3 encontra o plugin; a interface garante que ele sabe o que fazer.',
      },
      {
        kind: 'text',
        body:
          'O núcleo do sistema — o laço que processa, o registro, a seleção — nunca menciona um tipo concreto. Acrescentar um formato novo é escrever uma classe e registrá-la.',
      },
      {
        kind: 'table',
        headers: ['Parte', 'Depende de'],
        rows: [
          ['registro', 'a interface'],
          ['seleção', 'a chave e a interface'],
          ['execução', 'a interface'],
          ['implementações', 'nada além da interface'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que a dependência aponta para o **contrato**, nunca para as implementações. Isso é o que permite testar o núcleo com um plugin falso, e trocar qualquer implementação sem tocar em nada.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um formato solicitado que não existe no registro precisa de tratamento explícito. Usar o indexador direto lançaria `KeyNotFoundException`; o `TryGetValue` da Seção 3 é o caminho seguro.',
      },
      {
        kind: 'text',
        body:
          'Em sistemas reais, os plugins costumam ser carregados de arquivos externos em tempo de execução. O mecanismo muda, mas o desenho — contrato, registro, seleção — é exatamente este.',
      },
    ],
    quiz: [
      {
        id: 's05c05l09q1',
        type: 'single',
        prompt: 'De que o núcleo de um sistema de plugins depende?',
        options: [
          { id: 'a', text: 'Apenas da interface, nunca das implementações.', correct: true },
          { id: 'b', text: 'De todas as implementações registradas.' },
          { id: 'c', text: 'Da classe base comum.' },
          { id: 'd', text: 'Do dicionário de registro.' },
        ],
        explanation:
          'É o que torna o sistema extensível: implementações podem ser acrescentadas, trocadas ou substituídas por versões falsas sem alterar o núcleo.',
      },
      {
        id: 's05c05l09q2',
        type: 'single',
        prompt: 'Como tratar um formato que não está registrado?',
        options: [
          { id: 'a', text: 'Com `TryGetValue`, que devolve `false` sem lançar exceção.', correct: true },
          { id: 'b', text: 'Com o indexador, que devolve `null`.' },
          { id: 'c', text: 'Registrando todos os formatos possíveis antes.' },
          { id: 'd', text: 'Não é preciso tratar.' },
        ],
        explanation:
          'O indexador lança `KeyNotFoundException` para chave ausente. O `TryGetValue` é o padrão seguro da Seção 3.',
      },
      {
        id: 's05c05l09q3',
        type: 'single',
        prompt: 'O que é preciso para acrescentar um formato novo?',
        options: [
          { id: 'a', text: 'Escrever uma classe que implemente a interface e registrá-la.', correct: true },
          { id: 'b', text: 'Alterar o laço de processamento.' },
          { id: 'c', text: 'Alterar a interface.' },
          { id: 'd', text: 'Alterar todas as implementações existentes.' },
        ],
        explanation:
          'Nada do que já existe precisa mudar. É a diferença entre um sistema extensível e um que exige edição a cada novidade.',
      },
    ],
    challenge: {
      brief:
        'Construa um sistema de exportação com plugins registrados por nome, selecionados em tempo de execução a partir da entrada.',
      requirements: [
        '`IExportador` declara `Exportar(List<string> dados)` devolvendo `string` e a propriedade `Formato` de leitura',
        '`ExportadorCsv` junta os dados com `;`; formato `csv`',
        '`ExportadorLista` junta com `\\n` prefixando cada item com `- `; formato `lista`',
        '`ExportadorContagem` devolve `N itens`; formato `contagem`',
        'O `Main` registra os três em um dicionário por formato e processa pedidos da entrada',
        'Um formato desconhecido imprime `formato desconhecido: X` e conta como erro',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare IExportador e os tres exportadores aqui

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<string> dados = new List<string>();
        for (int i = 0; i < n; i++)
        {
            dados.Add(Console.ReadLine());
        }

        Dictionary<string, IExportador> plugins = new Dictionary<string, IExportador>();

        foreach (IExportador e in new IExportador[]
        {
            new ExportadorCsv(),
            new ExportadorLista(),
            new ExportadorContagem()
        })
        {
            plugins[e.Formato] = e;
        }

        Console.WriteLine($"Plugins: {plugins.Count}");

        int pedidos = int.Parse(Console.ReadLine());
        int erros = 0;

        for (int i = 0; i < pedidos; i++)
        {
            string formato = Console.ReadLine();

            if (plugins.TryGetValue(formato, out IExportador exportador))
            {
                Console.WriteLine(exportador.Exportar(dados));
            }
            else
            {
                Console.WriteLine($"formato desconhecido: {formato}");
                erros++;
            }
        }

        Console.WriteLine($"Erros: {erros}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

interface IExportador
{
    string Exportar(List<string> dados);
    string Formato { get; }
}

class ExportadorCsv : IExportador
{
    public string Formato => "csv";

    public string Exportar(List<string> dados)
    {
        return string.Join(";", dados);
    }
}

class ExportadorLista : IExportador
{
    public string Formato => "lista";

    public string Exportar(List<string> dados)
    {
        List<string> linhas = new List<string>();

        foreach (string d in dados)
        {
            linhas.Add("- " + d);
        }

        return string.Join("\\n", linhas);
    }
}

class ExportadorContagem : IExportador
{
    public string Formato => "contagem";

    public string Exportar(List<string> dados)
    {
        return $"{dados.Count} itens";
    }
}

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<string> dados = new List<string>();
        for (int i = 0; i < n; i++)
        {
            dados.Add(Console.ReadLine());
        }

        Dictionary<string, IExportador> plugins = new Dictionary<string, IExportador>();

        foreach (IExportador e in new IExportador[]
        {
            new ExportadorCsv(),
            new ExportadorLista(),
            new ExportadorContagem()
        })
        {
            plugins[e.Formato] = e;
        }

        Console.WriteLine($"Plugins: {plugins.Count}");

        int pedidos = int.Parse(Console.ReadLine());
        int erros = 0;

        for (int i = 0; i < pedidos; i++)
        {
            string formato = Console.ReadLine();

            if (plugins.TryGetValue(formato, out IExportador exportador))
            {
                Console.WriteLine(exportador.Exportar(dados));
            }
            else
            {
                Console.WriteLine($"formato desconhecido: {formato}");
                erros++;
            }
        }

        Console.WriteLine($"Erros: {erros}");
    }
}
`,
      hints: [
        'Cada exportador expõe seu próprio `Formato`, e o `Main` usa isso como chave do registro.',
        '`string.Join` resolve os dois primeiros formatos: um com `;` e outro com quebra de linha.',
      ],
      tests: [
        {
          name: 'Tres formatos e um invalido',
          stdin: '3\nana\nbruno\ncarla\n4\ncsv\nlista\ncontagem\nxml\n',
          expectedStdout:
            'Plugins: 3\nana;bruno;carla\n- ana\n- bruno\n- carla\n3 itens\n' +
            'formato desconhecido: xml\nErros: 1',
        },
        {
          name: 'Dados vazios',
          stdin: '0\n2\ncontagem\ncsv\n',
          expectedStdout: 'Plugins: 3\n0 itens\n\nErros: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c05l10',
    title: 'Checkpoint: interfaces',
    objective: 'Combinar interfaces do .NET e próprias em um tipo que participa de ordenação, igualdade e enumeração.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint constrói um tipo que fala todas as línguas do .NET: ele se ordena, se compara, é percorrível, e ainda cumpre um contrato próprio.',
      },
      {
        kind: 'table',
        headers: ['Interface', 'O que habilita'],
        rows: [
          ['`IComparable<T>`', '`Sort`, `Max`, `Min` sem argumento'],
          ['`IEquatable<T>`', '`Contains`, `Distinct`, `Remove`'],
          ['`IEnumerable<T>`', '`foreach` e todo o LINQ'],
          ['interface própria', 'o contrato do seu domínio'],
        ],
      },
      {
        kind: 'text',
        body:
          'Implementar as interfaces certas faz o tipo se integrar naturalmente à biblioteca padrão. É a diferença entre um tipo que "funciona" e um que se comporta como se fizesse parte da linguagem.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que nenhuma dessas interfaces exige herança. Um mesmo tipo participa de quatro contratos independentes — algo que a herança simples jamais permitiria.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Ao implementar `IEquatable`, lembre-se do `GetHashCode`. E ao implementar `IComparable`, garanta que a ordem seja **consistente** com a igualdade: dois objetos iguais devem comparar como zero.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Implemente uma interface por vez, testando a cada uma. Quatro contratos escritos de uma vez tornam difícil descobrir qual deles está causando um comportamento inesperado.',
      },
    ],
    quiz: [
      {
        id: 's05c05l10q1',
        type: 'single',
        prompt: 'Quantas dessas interfaces exigem herança?',
        options: [
          { id: 'a', text: 'Nenhuma: um tipo pode implementar todas ao mesmo tempo.', correct: true },
          { id: 'b', text: 'Todas.' },
          { id: 'c', text: 'Apenas `IEnumerable`.' },
          { id: 'd', text: 'Apenas `IComparable`.' },
        ],
        explanation:
          'É a vantagem central das interfaces: capacidades combináveis sem consumir a única vaga de herança.',
      },
      {
        id: 's05c05l10q2',
        type: 'single',
        prompt: 'O que significa a ordem ser consistente com a igualdade?',
        options: [
          { id: 'a', text: 'Dois objetos iguais devem comparar como zero.', correct: true },
          { id: 'b', text: 'A ordem deve ser alfabética.' },
          { id: 'c', text: 'A comparação deve usar os mesmos campos do `ToString`.' },
          { id: 'd', text: 'A ordem deve ser crescente.' },
        ],
        explanation:
          'Se `Equals` diz que são iguais mas `CompareTo` devolve diferente de zero, coleções ordenadas e operações de busca passam a se comportar de forma imprevisível.',
      },
      {
        id: 's05c05l10q3',
        type: 'single',
        prompt: 'Por que implementar as interfaces do .NET em vez de métodos próprios equivalentes?',
        options: [
          { id: 'a', text: 'Porque a biblioteca padrão inteira passa a funcionar sobre o tipo.', correct: true },
          { id: 'b', text: 'Porque métodos próprios não compilam.' },
          { id: 'c', text: 'Porque é mais rápido.' },
          { id: 'd', text: 'Porque reduz o código.' },
        ],
        explanation:
          'Um método `Comparar` próprio não faz o `Sort` funcionar. As interfaces são os contratos que a biblioteca procura.',
      },
    ],
    challenge: {
      brief:
        'Construa um tipo que implementa quatro contratos: ordenação natural, igualdade por conteúdo, enumeração dos itens, e um contrato próprio de resumo.',
      requirements: [
        '`IResumivel` declara `Resumir()` devolvendo `string`',
        '`Playlist` implementa `IComparable<Playlist>`, `IEquatable<Playlist>`, `IEnumerable<string>` e `IResumivel`',
        '`Playlist` recebe o nome no construtor e guarda faixas em uma lista privada',
        '`Adicionar(string faixa)` acrescenta, ignorando vazios',
        'A ordem natural é por **quantidade de faixas** decrescente, desempatando por nome crescente',
        'Duas playlists são iguais quando têm o mesmo nome',
        'O `foreach` percorre as faixas',
        '`Resumir()` devolve `nome: N faixas`',
        '`ToString()` devolve o mesmo que `Resumir()`',
        'Sobrescreva `Equals(object)` e `GetHashCode`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

// Declare IResumivel e Playlist aqui

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Playlist> playlists = new List<Playlist>();

        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int faixas = int.Parse(Console.ReadLine());

            Playlist p = new Playlist(nome);

            for (int j = 0; j < faixas; j++)
            {
                p.Adicionar(Console.ReadLine());
            }

            playlists.Add(p);
        }

        playlists.Sort();

        foreach (Playlist p in playlists)
        {
            Console.WriteLine(p.Resumir());
        }

        Playlist primeira = playlists[0];

        Console.WriteLine($"Faixas da primeira: {string.Join(" ", primeira)}");
        Console.WriteLine($"Maior: {playlists.Max()}");
        Console.WriteLine($"Contains por nome: {playlists.Contains(new Playlist(primeira.Nome))}");
        Console.WriteLine($"Distintas: {playlists.Distinct().Count()}");
        Console.WriteLine($"Total de faixas: {playlists.Sum(p => p.Count())}");
    }
}
`,
      solution: `using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

interface IResumivel
{
    string Resumir();
}

class Playlist : IComparable<Playlist>, IEquatable<Playlist>, IEnumerable<string>, IResumivel
{
    private List<string> faixas = new List<string>();

    public string Nome { get; }

    public Playlist(string nome)
    {
        Nome = nome;
    }

    public void Adicionar(string faixa)
    {
        if (faixa == null || faixa.Trim().Length == 0)
        {
            return;
        }

        faixas.Add(faixa);
    }

    public int CompareTo(Playlist outra)
    {
        int porQuantidade = outra.faixas.Count.CompareTo(faixas.Count);

        if (porQuantidade != 0)
        {
            return porQuantidade;
        }

        return Nome.CompareTo(outra.Nome);
    }

    public bool Equals(Playlist outra)
    {
        return outra != null && Nome == outra.Nome;
    }

    public override bool Equals(object obj)
    {
        return Equals(obj as Playlist);
    }

    public override int GetHashCode()
    {
        return Nome.GetHashCode();
    }

    public IEnumerator<string> GetEnumerator()
    {
        return faixas.GetEnumerator();
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }

    public string Resumir()
    {
        return $"{Nome}: {faixas.Count} faixas";
    }

    public override string ToString()
    {
        return Resumir();
    }
}

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Playlist> playlists = new List<Playlist>();

        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int faixas = int.Parse(Console.ReadLine());

            Playlist p = new Playlist(nome);

            for (int j = 0; j < faixas; j++)
            {
                p.Adicionar(Console.ReadLine());
            }

            playlists.Add(p);
        }

        playlists.Sort();

        foreach (Playlist p in playlists)
        {
            Console.WriteLine(p.Resumir());
        }

        Playlist primeira = playlists[0];

        Console.WriteLine($"Faixas da primeira: {string.Join(" ", primeira)}");
        Console.WriteLine($"Maior: {playlists.Max()}");
        Console.WriteLine($"Contains por nome: {playlists.Contains(new Playlist(primeira.Nome))}");
        Console.WriteLine($"Distintas: {playlists.Distinct().Count()}");
        Console.WriteLine($"Total de faixas: {playlists.Sum(p => p.Count())}");
    }
}
`,
      hints: [
        'Para ordem decrescente por quantidade, inverta os operandos: `outra.faixas.Count.CompareTo(faixas.Count)`.',
        '`Max()` usa o `CompareTo`, e como a ordem é decrescente por quantidade, o "maior" é a playlist com **menos** faixas.',
      ],
      tests: [
        {
          name: 'Tres playlists',
          stdin: '3\nRock\n2\nfaixa1\nfaixa2\nJazz\n3\na\nb\nc\nPop\n1\nx\n',
          expectedStdout:
            'Jazz: 3 faixas\nRock: 2 faixas\nPop: 1 faixas\n' +
            'Faixas da primeira: a b c\nMaior: Pop: 1 faixas\n' +
            'Contains por nome: True\nDistintas: 3\nTotal de faixas: 6',
        },
        {
          name: 'Empate na quantidade',
          stdin: '2\nZeta\n1\nx\nAlfa\n1\ny\n',
          expectedStdout:
            'Alfa: 1 faixas\nZeta: 1 faixas\n' +
            'Faixas da primeira: y\nMaior: Zeta: 1 faixas\n' +
            'Contains por nome: True\nDistintas: 2\nTotal de faixas: 2',
          hidden: true,
        },
      ],
    },
  },
]
