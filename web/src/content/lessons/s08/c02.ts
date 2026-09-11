import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's08c02l01',
    title: 'Métodos de extensão',
    objective: 'Adicionar métodos a tipos que você não controla, sem herança e sem modificar o original.',
    concept: [
      {
        kind: 'text',
        body:
          'Você não pode editar `string`, `int` ou `DateTime` — eles pertencem ao framework. Herdar também não resolve: `string` é `sealed`. Ainda assim, `"abc".Repetir(3)` pode existir, graças aos **métodos de extensão**.',
      },
      {
        kind: 'text',
        body: 'A receita tem três exigências, e todas são obrigatórias:',
      },
      {
        kind: 'table',
        headers: ['Exigência', 'Por quê'],
        rows: [
          ['a classe é `static`', 'o método não pertence a nenhuma instância'],
          ['o método é `static`', 'ele é uma função solta, não um membro do tipo'],
          ['o primeiro parâmetro tem `this`', 'é o que marca qual tipo está sendo estendido'],
        ],
      },
      {
        kind: 'code',
        code: `static class ExtensoesTexto
{
    public static string Repetir(this string texto, int vezes)
    {
        return string.Concat(Enumerable.Repeat(texto, vezes));
    }

    public static string Truncar(this string texto, int limite)
    {
        return texto.Length <= limite
            ? texto
            : texto.Substring(0, limite) + "...";
    }
}`,
        caption: 'O `this` no primeiro parâmetro é a única diferença entre isso e um método estático comum.',
      },
      {
        kind: 'code',
        code: `Console.WriteLine("ab".Repetir(3));
Console.WriteLine("bicicleta".Truncar(4));`,
      },
      {
        kind: 'output',
        code: `ababab
bici...`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A chamada `"ab".Repetir(3)` é **puro açúcar sintático**. O compilador a reescreve como `ExtensoesTexto.Repetir("ab", 3)`. Nada é adicionado ao tipo `string`; o que muda é apenas como você pode escrever a chamada.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'O que você escreve',
          code: `"ab".Repetir(3)`,
        },
        right: {
          label: 'O que o compilador gera',
          code: `ExtensoesTexto.Repetir("ab", 3)`,
        },
        note: 'As duas formas são válidas e produzem o mesmo código. A primeira encadeia melhor.',
      },
      {
        kind: 'text',
        body:
          'Essa equivalência tem uma consequência que surpreende: **um método de extensão funciona sobre `null`**. Não há desreferência, porque não há chamada de instância — o valor nulo simplesmente chega como argumento.',
      },
      {
        kind: 'code',
        code: `public static bool EhVazio(this string texto)
{
    return string.IsNullOrWhiteSpace(texto);
}

string nulo = null;
Console.WriteLine(nulo.EhVazio());   // True, sem excecao`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Isso é útil e perigoso ao mesmo tempo. Útil porque permite escrever extensões seguras contra nulo; perigoso porque a chamada **parece** um método de instância, e quem lê supõe que `null` explodiria.',
      },
      {
        kind: 'text',
        body:
          'Se a extensão não trata nulo, o erro acontece na primeira linha que usa o valor — dentro do seu método, não na chamada. A mensagem aponta para o lugar errado.',
      },
      {
        kind: 'compare',
        good: `public static string Truncar(this string texto, int limite)
{
    if (texto == null) return "";
    return texto.Length <= limite
        ? texto
        : texto.Substring(0, limite) + "...";
}`,
        bad: `public static string Truncar(this string texto, int limite)
{
    // NullReferenceException aqui dentro,
    // longe de onde o nulo apareceu
    return texto.Length <= limite ? texto : ...;
}`,
        goodLabel: 'Decide o que fazer com nulo',
        badLabel: 'Deixa estourar no meio',
      },
      {
        kind: 'text',
        body:
          'Você já usa métodos de extensão desde a Seção 4: **todo o LINQ é feito deles**. `Where`, `Select`, `OrderBy` e `Sum` são métodos estáticos de `System.Linq.Enumerable`, com `this IEnumerable<T>` no primeiro parâmetro.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Por isso o `using System.Linq;` importa: extensões só ficam visíveis quando o **namespace** que as contém está importado. Se um método some sem explicação, quase sempre falta um `using`.',
      },
    ],
    quiz: [
      {
        id: 's08c02l01q1',
        type: 'multiple',
        prompt: 'O que é obrigatório para declarar um método de extensão?',
        options: [
          { id: 'a', text: 'A classe que o contém precisa ser `static`', correct: true },
          { id: 'b', text: 'O método precisa ser `static`', correct: true },
          { id: 'c', text: 'O primeiro parâmetro precisa ter o modificador `this`', correct: true },
          { id: 'd', text: 'O tipo estendido precisa ser `partial`' },
        ],
        explanation:
          'As três primeiras são exigidas pelo compilador. O tipo estendido não precisa de nada — é justamente por isso que dá para estender `string` e `int`.',
      },
      {
        id: 's08c02l01q2',
        type: 'single',
        prompt: 'Por que `((string)null).EhVazio()` não lança `NullReferenceException`?',
        options: [
          { id: 'a', text: 'A chamada vira `Extensoes.EhVazio(null)` — não há desreferência', correct: true },
          { id: 'b', text: 'Porque `string` trata nulo como vazio automaticamente' },
          { id: 'c', text: 'Porque o compilador insere uma verificação de nulo' },
          { id: 'd', text: 'Lança sim: extensões não funcionam sobre nulo' },
        ],
        explanation:
          'A sintaxe de ponto é uma ilusão. Por baixo é uma chamada estática comum, e passar `null` como argumento é perfeitamente válido.',
      },
      {
        id: 's08c02l01q3',
        type: 'single',
        prompt: 'Uma extensão existe no projeto mas o compilador não a encontra. Qual a causa mais provável?',
        options: [
          { id: 'a', text: 'Falta o `using` do namespace onde a classe estática está', correct: true },
          { id: 'b', text: 'A classe estática precisa ser `public sealed`' },
          { id: 'c', text: 'Extensões só funcionam no mesmo arquivo' },
          { id: 'd', text: 'O tipo estendido é `sealed`' },
        ],
        explanation:
          'A visibilidade de extensões é por namespace importado. É o mesmo motivo pelo qual `Where` e `Select` só aparecem depois de `using System.Linq;`.',
      },
    ],
    challenge: {
      brief:
        'Escreva uma classe estática de extensões para `string` que trata nulo de forma explícita e previsível, e demonstre que a chamada estática e a chamada com ponto produzem o mesmo resultado.',
      requirements: [
        'Todas as extensões vivem numa classe `static` e têm `this string` no primeiro parâmetro.',
        'Nenhuma delas lança exceção quando o texto é `null` — cada uma decide um valor de retorno seguro.',
        '`Truncar` acrescenta `...` apenas quando corta de verdade.',
        '`ContarPalavras` ignora espaços repetidos e trata nulo como zero.',
        '`Inverter` devolve string vazia para nulo.',
        'Demonstre a equivalência chamando ao menos uma extensão nas duas formas.',
      ],
      starterCode: `using System;
using System.Linq;

static class ExtensoesTexto
{
    public static bool EhVazio(this string texto)
    {
        // TODO: nulo, vazio ou so espacos
        return false;
    }

    public static string Repetir(this string texto, int vezes)
    {
        // TODO: nulo devolve ""
        return "";
    }

    public static string Truncar(this string texto, int limite)
    {
        // TODO: acrescenta "..." so quando corta
        return "";
    }

    public static int ContarPalavras(this string texto)
    {
        // TODO: separa por espacos, ignorando repetidos
        return 0;
    }

    public static string Inverter(this string texto)
    {
        // TODO
        return "";
    }

    public static string OuEntao(this string texto, string alternativa)
    {
        // TODO: devolve a alternativa quando o texto esta vazio
        return texto;
    }
}

class Program
{
    static void Main()
    {
        string nulo = null;

        Console.WriteLine($"vazio nulo: {nulo.EhVazio()}");
        Console.WriteLine($"vazio espacos: {"   ".EhVazio()}");
        Console.WriteLine($"vazio texto: {"ok".EhVazio()}");

        Console.WriteLine($"repetir: {"ab".Repetir(3)}");
        Console.WriteLine($"repetir zero: [{"ab".Repetir(0)}]");
        Console.WriteLine($"repetir nulo: [{nulo.Repetir(3)}]");

        Console.WriteLine($"truncar: {"bicicleta".Truncar(4)}");
        Console.WriteLine($"truncar curto: {"oi".Truncar(4)}");
        Console.WriteLine($"truncar exato: {"quatro".Truncar(6)}");
        Console.WriteLine($"truncar nulo: [{nulo.Truncar(4)}]");

        Console.WriteLine($"palavras: {"a casa e amarela".ContarPalavras()}");
        Console.WriteLine($"palavras espacos: {"  a   casa  ".ContarPalavras()}");
        Console.WriteLine($"palavras nulo: {nulo.ContarPalavras()}");

        Console.WriteLine($"inverter: {"abcde".Inverter()}");
        Console.WriteLine($"inverter nulo: [{nulo.Inverter()}]");

        Console.WriteLine($"ou entao: {"".OuEntao("padrao")}");
        Console.WriteLine($"ou entao nulo: {nulo.OuEntao("padrao")}");
        Console.WriteLine($"ou entao cheio: {"valor".OuEntao("padrao")}");

        Console.WriteLine($"com ponto: {"ab".Repetir(2)}");
        Console.WriteLine($"estatico: {ExtensoesTexto.Repetir("ab", 2)}");
        Console.WriteLine($"iguais: {"ab".Repetir(2) == ExtensoesTexto.Repetir("ab", 2)}");
    }
}`,
      solution: `using System;
using System.Linq;

static class ExtensoesTexto
{
    public static bool EhVazio(this string texto)
    {
        return string.IsNullOrWhiteSpace(texto);
    }

    public static string Repetir(this string texto, int vezes)
    {
        if (texto == null)
        {
            return "";
        }

        return string.Concat(Enumerable.Repeat(texto, vezes));
    }

    public static string Truncar(this string texto, int limite)
    {
        if (texto == null)
        {
            return "";
        }

        return texto.Length <= limite ? texto : texto.Substring(0, limite) + "...";
    }

    public static int ContarPalavras(this string texto)
    {
        if (texto == null)
        {
            return 0;
        }

        return texto.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length;
    }

    public static string Inverter(this string texto)
    {
        if (texto == null)
        {
            return "";
        }

        var letras = texto.ToCharArray();
        Array.Reverse(letras);
        return new string(letras);
    }

    public static string OuEntao(this string texto, string alternativa)
    {
        return texto.EhVazio() ? alternativa : texto;
    }
}

class Program
{
    static void Main()
    {
        string nulo = null;

        Console.WriteLine($"vazio nulo: {nulo.EhVazio()}");
        Console.WriteLine($"vazio espacos: {"   ".EhVazio()}");
        Console.WriteLine($"vazio texto: {"ok".EhVazio()}");

        Console.WriteLine($"repetir: {"ab".Repetir(3)}");
        Console.WriteLine($"repetir zero: [{"ab".Repetir(0)}]");
        Console.WriteLine($"repetir nulo: [{nulo.Repetir(3)}]");

        Console.WriteLine($"truncar: {"bicicleta".Truncar(4)}");
        Console.WriteLine($"truncar curto: {"oi".Truncar(4)}");
        Console.WriteLine($"truncar exato: {"quatro".Truncar(6)}");
        Console.WriteLine($"truncar nulo: [{nulo.Truncar(4)}]");

        Console.WriteLine($"palavras: {"a casa e amarela".ContarPalavras()}");
        Console.WriteLine($"palavras espacos: {"  a   casa  ".ContarPalavras()}");
        Console.WriteLine($"palavras nulo: {nulo.ContarPalavras()}");

        Console.WriteLine($"inverter: {"abcde".Inverter()}");
        Console.WriteLine($"inverter nulo: [{nulo.Inverter()}]");

        Console.WriteLine($"ou entao: {"".OuEntao("padrao")}");
        Console.WriteLine($"ou entao nulo: {nulo.OuEntao("padrao")}");
        Console.WriteLine($"ou entao cheio: {"valor".OuEntao("padrao")}");

        Console.WriteLine($"com ponto: {"ab".Repetir(2)}");
        Console.WriteLine($"estatico: {ExtensoesTexto.Repetir("ab", 2)}");
        Console.WriteLine($"iguais: {"ab".Repetir(2) == ExtensoesTexto.Repetir("ab", 2)}");
      }
}`,
      hints: [
        '`string.IsNullOrWhiteSpace` já cobre nulo, vazio e só-espaços numa chamada.',
        '`Split(\' \', StringSplitOptions.RemoveEmptyEntries)` descarta os pedaços vazios criados por espaços repetidos.',
        '`OuEntao` pode chamar `texto.EhVazio()` — uma extensão pode usar outra do mesmo arquivo normalmente.',
      ],
      tests: [
        {
          name: 'Extensões de texto seguras',
          expectedStdout:
            'vazio nulo: True\nvazio espacos: True\nvazio texto: False\n' +
            'repetir: ababab\nrepetir zero: []\nrepetir nulo: []\n' +
            'truncar: bici...\ntruncar curto: oi\ntruncar exato: quatro\ntruncar nulo: []\n' +
            'palavras: 4\npalavras espacos: 2\npalavras nulo: 0\n' +
            'inverter: edcba\ninverter nulo: []\n' +
            'ou entao: padrao\nou entao nulo: padrao\nou entao cheio: valor\n' +
            'com ponto: abab\nestatico: abab\niguais: True',
        },
      ],
    },
  },

  {
    id: 's08c02l02',
    title: 'Boas práticas de extensão',
    objective: 'Saber quando uma extensão é a ferramenta certa — e reconhecer quando ela é a errada.',
    concept: [
      {
        kind: 'text',
        body:
          'Métodos de extensão são fáceis de escrever e por isso fáceis de usar demais. A primeira regra é a mais simples: **se o tipo é seu, escreva um método normal**.',
      },
      {
        kind: 'compare',
        good: `class Pedido
{
    public decimal Total()
    {
        return itens.Sum(i => i.Preco);
    }
}`,
        bad: `static class ExtensoesPedido
{
    public static decimal Total(this Pedido p)
    {
        // Pedido e seu. Isso so
        // espalha o comportamento.
    }
}`,
        goodLabel: 'Método na própria classe',
        badLabel: 'Extensão desnecessária',
      },
      {
        kind: 'text',
        body:
          'A segunda regra vem de uma decisão do compilador que você precisa conhecer: **o método de instância sempre vence**. Se o tipo ganha, numa versão futura, um método com a mesma assinatura da sua extensão, sua extensão silenciosamente deixa de ser chamada.',
      },
      {
        kind: 'code',
        code: `static class ExtensoesTexto
{
    public static string ToString(this string texto)
    {
        return "extensao";
    }
}

Console.WriteLine("abc".ToString());
Console.WriteLine(ExtensoesTexto.ToString("abc"));`,
      },
      {
        kind: 'output',
        code: `abc
extensao`,
        caption:
          'A primeira linha chamou o `ToString` de instância; a extensão foi ignorada sem nenhum aviso. Só a chamada explícita a alcança.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Não há erro, não há aviso, não há aviso nenhum. O comportamento do programa muda porque uma biblioteca ganhou um método novo. Nunca escreva uma extensão com o mesmo nome e assinatura de um método já existente no tipo.',
      },
      {
        kind: 'text',
        body: 'As situações em que uma extensão é realmente a ferramenta certa são poucas e reconhecíveis:',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Extensão?'],
        rows: [
          ['o tipo é do framework ou de terceiros', 'sim'],
          ['o tipo é uma interface e o comportamento é padrão para todas', 'sim'],
          ['o tipo é `sealed` e você precisa de um verbo novo', 'sim'],
          ['o tipo é seu e você pode editá-lo', 'não — método normal'],
          ['o método precisa de estado privado do tipo', 'não — extensão não enxerga `private`'],
          ['você quer só "organizar" código que já é seu', 'não'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma extensão só enxerga a superfície pública do tipo. Se o método precisa de um campo privado, ele **tem** que ser um membro real — não existe extensão com acesso privilegiado.',
      },
      {
        kind: 'text',
        body:
          'A terceira regra é sobre nulo, e ela existe porque a chamada engana quem lê. `pedido.EstaVazio()` parece que estouraria com `pedido` nulo, e pode não estourar. Escolha uma política e deixe-a explícita no nome ou na documentação.',
      },
      {
        kind: 'text',
        body:
          'Por fim, a **descoberta**. Extensões aparecem no autocompletar apenas quando o namespace está importado, então onde você as coloca importa tanto quanto o que elas fazem.',
      },
      {
        kind: 'compare',
        good: `namespace MinhaApp.Extensoes;

// um namespace so para extensoes,
// importado por quem quiser
static class ExtensoesTexto { }`,
        bad: `namespace System;

// sequestra um namespace do framework
// e aparece em todo arquivo do projeto
static class ExtensoesTexto { }`,
        goodLabel: 'Namespace próprio',
        badLabel: 'Poluindo `System`',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Uma extensão bem escrita se comporta como se sempre tivesse feito parte do tipo: nome no vocabulário do domínio, sem efeitos colaterais surpreendentes, e devolvendo um valor novo em vez de modificar o original.',
      },
    ],
    quiz: [
      {
        id: 's08c02l02q1',
        type: 'single',
        prompt: 'Você escreve uma extensão `ToString(this string)`. O que acontece em `"abc".ToString()`?',
        options: [
          { id: 'a', text: 'O método de instância é chamado; a extensão é ignorada sem aviso', correct: true },
          { id: 'b', text: 'A extensão é chamada, porque é mais específica' },
          { id: 'c', text: 'Erro de compilação por ambiguidade' },
          { id: 'd', text: 'Aviso de compilação, mas a extensão vence' },
        ],
        explanation:
          'O compilador só procura extensões quando não encontra um método de instância aplicável. O silêncio é o que torna esse caso perigoso.',
      },
      {
        id: 's08c02l02q2',
        type: 'single',
        prompt: 'Por que uma extensão não pode acessar campos privados do tipo que estende?',
        options: [
          { id: 'a', text: 'Porque é apenas um método estático numa classe externa', correct: true },
          { id: 'b', text: 'Porque o modificador `this` bloqueia o acesso' },
          { id: 'c', text: 'Pode acessar, desde que a classe seja `internal`' },
          { id: 'd', text: 'Porque extensões rodam antes da construção do objeto' },
        ],
        explanation:
          'A extensão vive em outra classe e enxerga exatamente o que qualquer código externo enxerga. Se o comportamento precisa do estado privado, ele pertence ao tipo.',
      },
      {
        id: 's08c02l02q3',
        type: 'multiple',
        prompt: 'Em quais casos escrever uma extensão é apropriado?',
        options: [
          { id: 'a', text: 'Adicionar um verbo a `string`, que é `sealed` e do framework', correct: true },
          { id: 'b', text: 'Dar comportamento padrão a todas as implementações de uma interface', correct: true },
          { id: 'c', text: 'Adicionar um método a uma classe do próprio projeto que você pode editar' },
          { id: 'd', text: 'Implementar um cálculo que depende de um campo privado do tipo' },
        ],
        explanation:
          'As duas primeiras são os casos clássicos. Se você pode editar o tipo, edite-o; e se o cálculo precisa do privado, a extensão nem compilaria.',
      },
    ],
    challenge: {
      brief:
        'Demonstre as três armadilhas de extensão num programa só: a extensão perdida para o método de instância, a extensão que não enxerga o privado, e a política de nulo explícita.',
      requirements: [
        'Crie uma extensão `Descrever(this Conta)` e um método de instância `Descrever()` com a mesma assinatura; mostre qual vence.',
        'Mostre que a chamada estática explícita alcança a extensão ignorada.',
        '`Resumo(this Conta)` só pode usar membros públicos — o saldo real fica privado e é exposto por propriedade.',
        '`RotuloSeguro(this Conta)` trata `null` devolvendo `conta ausente`, sem lançar.',
        'Uma extensão de interface `TotalGeral(this IPagavel)` funciona para as duas implementações.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

interface IPagavel
{
    decimal Valor { get; }
    string Rotulo { get; }
}

class Conta : IPagavel
{
    private decimal saldoReal;

    public string Titular { get; set; } = "";
    public decimal Valor => saldoReal;
    public string Rotulo => $"conta de {Titular}";

    public Conta(string titular, decimal saldo)
    {
        Titular = titular;
        saldoReal = saldo;
    }

    public string Descrever()
    {
        return $"instancia: {Titular}";
    }
}

class Boleto : IPagavel
{
    public decimal Valor { get; set; }
    public string Rotulo => "boleto";
}

static class Extensoes
{
    public static string Descrever(this Conta conta)
    {
        // TODO: devolva "extensao: <titular>"
        return "";
    }

    public static string Resumo(this Conta conta)
    {
        // TODO: "<titular> tem <valor>" usando so membros publicos
        return "";
    }

    public static string RotuloSeguro(this Conta conta)
    {
        // TODO: "conta ausente" quando conta e null
        return "";
    }

    public static decimal TotalGeral(this IEnumerable<IPagavel> itens)
    {
        // TODO: soma dos valores
        return 0;
    }
}

class Program
{
    static void Main()
    {
        var conta = new Conta("Ana", 250.75m);

        Console.WriteLine($"com ponto: {conta.Descrever()}");
        Console.WriteLine($"estatico: {Extensoes.Descrever(conta)}");

        Console.WriteLine($"resumo: {conta.Resumo()}");

        Conta nula = null;
        Console.WriteLine($"seguro: {nula.RotuloSeguro()}");
        Console.WriteLine($"seguro cheio: {conta.RotuloSeguro()}");

        var pagaveis = new List<IPagavel>
        {
            conta,
            new Boleto { Valor = 100m },
            new Boleto { Valor = 49.25m },
        };

        Console.WriteLine($"total: {pagaveis.TotalGeral()}");
        Console.WriteLine($"vazio: {new List<IPagavel>().TotalGeral()}");

        foreach (IPagavel item in pagaveis)
        {
            Console.WriteLine($"item: {item.Rotulo} = {item.Valor}");
        }
    }
}`,
      solution: `using System;
using System.Collections.Generic;

interface IPagavel
{
    decimal Valor { get; }
    string Rotulo { get; }
}

class Conta : IPagavel
{
    private decimal saldoReal;

    public string Titular { get; set; } = "";
    public decimal Valor => saldoReal;
    public string Rotulo => $"conta de {Titular}";

    public Conta(string titular, decimal saldo)
    {
        Titular = titular;
        saldoReal = saldo;
    }

    public string Descrever()
    {
        return $"instancia: {Titular}";
    }
}

class Boleto : IPagavel
{
    public decimal Valor { get; set; }
    public string Rotulo => "boleto";
}

static class Extensoes
{
    public static string Descrever(this Conta conta)
    {
        return $"extensao: {conta.Titular}";
    }

    public static string Resumo(this Conta conta)
    {
        return $"{conta.Titular} tem {conta.Valor}";
    }

    public static string RotuloSeguro(this Conta conta)
    {
        return conta == null ? "conta ausente" : conta.Rotulo;
    }

    public static decimal TotalGeral(this IEnumerable<IPagavel> itens)
    {
        decimal total = 0;

        foreach (IPagavel item in itens)
        {
            total += item.Valor;
        }

        return total;
    }
}

class Program
{
    static void Main()
    {
        var conta = new Conta("Ana", 250.75m);

        Console.WriteLine($"com ponto: {conta.Descrever()}");
        Console.WriteLine($"estatico: {Extensoes.Descrever(conta)}");

        Console.WriteLine($"resumo: {conta.Resumo()}");

        Conta nula = null;
        Console.WriteLine($"seguro: {nula.RotuloSeguro()}");
        Console.WriteLine($"seguro cheio: {conta.RotuloSeguro()}");

        var pagaveis = new List<IPagavel>
        {
            conta,
            new Boleto { Valor = 100m },
            new Boleto { Valor = 49.25m },
        };

        Console.WriteLine($"total: {pagaveis.TotalGeral()}");
        Console.WriteLine($"vazio: {new List<IPagavel>().TotalGeral()}");

        foreach (IPagavel item in pagaveis)
        {
            Console.WriteLine($"item: {item.Rotulo} = {item.Valor}");
        }
    }
}`,
      hints: [
        'A extensão `Descrever` nunca é alcançada por `conta.Descrever()` — o método de instância tem prioridade absoluta.',
        '`Resumo` não pode ler `saldoReal`: use a propriedade pública `Valor`, que é a única superfície disponível.',
        'A extensão sobre `IEnumerable<IPagavel>` funciona para qualquer implementação da interface, inclusive as que ainda não existem.',
      ],
      tests: [
        {
          name: 'Armadilhas de extensão',
          expectedStdout:
            'com ponto: instancia: Ana\nestatico: extensao: Ana\n' +
            'resumo: Ana tem 250.75\n' +
            'seguro: conta ausente\nseguro cheio: conta de Ana\n' +
            'total: 400.00\nvazio: 0\n' +
            'item: conta de Ana = 250.75\nitem: boleto = 100\nitem: boleto = 49.25',
        },
      ],
    },
  },

  {
    id: 's08c02l03',
    title: 'Estendendo IEnumerable',
    objective: 'Escrever operadores de sequência próprios, genéricos e preguiçosos, no mesmo estilo do LINQ.',
    concept: [
      {
        kind: 'text',
        body:
          'A extensão mais valiosa é aquela sobre uma **interface**, porque ela vale para todas as implementações — as que existem e as que ainda serão escritas. `IEnumerable<T>` é o exemplo máximo: array, `List<T>`, `HashSet<T>`, resultado de LINQ, tudo.',
      },
      {
        kind: 'code',
        code: `static class ExtensoesSequencia
{
    public static int ContarSe<T>(this IEnumerable<T> fonte, Func<T, bool> criterio)
    {
        int total = 0;

        foreach (T item in fonte)
        {
            if (criterio(item))
            {
                total++;
            }
        }

        return total;
    }
}`,
        caption: 'Genérico no tipo do item e recebendo a regra como `Func` — exatamente a forma de `Count` do LINQ.',
      },
      {
        kind: 'text',
        body:
          'Operadores que devolvem uma **sequência** merecem `yield return`: a extensão passa a ser preguiçosa e nada é calculado até alguém percorrer o resultado.',
      },
      {
        kind: 'code',
        code: `public static IEnumerable<T> Intercalar<T>(this IEnumerable<T> fonte, T separador)
{
    bool primeiro = true;

    foreach (T item in fonte)
    {
        if (!primeiro)
        {
            yield return separador;
        }

        primeiro = false;
        yield return item;
    }
}`,
      },
      {
        kind: 'code',
        code: `var numeros = new[] { 1, 2, 3 };
Console.WriteLine(string.Join("", numeros.Intercalar(0)));`,
      },
      {
        kind: 'output',
        code: `10203`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Preguiça é o que permite encadear. `fonte.Where(...).Select(...).Take(5)` não cria três coleções intermediárias: cada operador puxa um item do anterior sob demanda. Um operador seu que devolve `List<T>` quebra essa cadeia.',
      },
      {
        kind: 'text',
        body:
          'Um caso muito útil e ausente do LINQ clássico é o agrupamento em **lotes de tamanho fixo** — para enviar em blocos, paginar ou processar em partes.',
      },
      {
        kind: 'code',
        code: `public static IEnumerable<List<T>> EmLotes<T>(this IEnumerable<T> fonte, int tamanho)
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
}`,
        caption: 'A última linha é essencial: sem ela, o lote incompleto do final some.',
      },
      {
        kind: 'output',
        code: `lote: 1,2,3
lote: 4,5,6
lote: 7`,
        caption: 'Sete itens em lotes de três: dois completos e um parcial.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Repare no `lote = new List<T>(tamanho)` depois do `yield return`. Reaproveitar a mesma lista faria todos os lotes devolvidos apontarem para o **mesmo objeto**, que continua sendo modificado — um bug clássico e difícil de enxergar.',
      },
      {
        kind: 'text',
        body:
          'Um detalhe que morde: como o corpo só roda no primeiro `MoveNext`, uma validação de argumento dentro de um método com `yield` **não dispara na chamada**. Ela só acontece quando alguém percorre.',
      },
      {
        kind: 'compare',
        good: `public static IEnumerable<T> Pular<T>(
    this IEnumerable<T> fonte, int n)
{
    if (n < 0) throw new ArgumentException("n");
    return PularNucleo(fonte, n);
}

private static IEnumerable<T> PularNucleo<T>(
    IEnumerable<T> fonte, int n) { /* yield */ }`,
        bad: `public static IEnumerable<T> Pular<T>(
    this IEnumerable<T> fonte, int n)
{
    // so lanca quando alguem percorrer,
    // longe da chamada errada
    if (n < 0) throw new ArgumentException("n");
    foreach (...) yield return ...;
}`,
        goodLabel: 'Validação imediata, iteração separada',
        badLabel: 'Validação preguiçosa junto do `yield`',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Antes de escrever um operador, confira se o LINQ já o tem: `Chunk` faz lotes, `Zip` combina duas sequências, `DistinctBy` e `MaxBy` cobrem casos comuns. Escrever o seu só vale quando não existe equivalente.',
      },
    ],
    quiz: [
      {
        id: 's08c02l03q1',
        type: 'single',
        prompt: 'Por que um operador de sequência deve devolver `IEnumerable<T>` em vez de `List<T>`?',
        options: [
          { id: 'a', text: 'Para preservar a avaliação preguiçosa e permitir encadeamento sem coleções intermediárias', correct: true },
          { id: 'b', text: 'Porque `List<T>` não pode ser devolvida de um método de extensão' },
          { id: 'c', text: 'Porque `IEnumerable<T>` é mais rápida de construir' },
          { id: 'd', text: 'Para permitir modificar a coleção original' },
        ],
        explanation:
          'Devolver `List<T>` força a materialização e mata a preguiça da cadeia inteira. Quem quiser a lista pode chamar `ToList()` no fim.',
      },
      {
        id: 's08c02l03q2',
        type: 'single',
        prompt: 'O que acontece se `EmLotes` reaproveitar a mesma `List<T>` em vez de criar uma nova após cada `yield return`?',
        options: [
          { id: 'a', text: 'Todos os lotes devolvidos apontam para o mesmo objeto, que continua sendo modificado', correct: true },
          { id: 'b', text: 'O programa lança `InvalidOperationException`' },
          { id: 'c', text: 'Nada muda: o `yield return` copia a lista' },
          { id: 'd', text: 'Apenas o último lote fica errado' },
        ],
        explanation:
          '`yield return` devolve a referência, não uma cópia. Quem guardar os lotes numa lista vai encontrar N referências para a mesma coleção.',
      },
      {
        id: 's08c02l03q3',
        type: 'single',
        prompt: 'Uma extensão com `yield return` valida um argumento no início. Quando a exceção é lançada?',
        options: [
          { id: 'a', text: 'Só quando alguém começa a percorrer o resultado', correct: true },
          { id: 'b', text: 'No momento da chamada' },
          { id: 'c', text: 'Nunca: `yield` engole exceções' },
          { id: 'd', text: 'Em tempo de compilação' },
        ],
        explanation:
          'O corpo de um método com `yield` só executa no primeiro `MoveNext`. Por isso a validação vai num método comum que delega para outro, privado, com o `yield`.',
      },
    ],
    challenge: {
      brief:
        'Escreva um conjunto de operadores de sequência genéricos e preguiçosos: lotes, intercalar, pares consecutivos, contagem condicional e um `PularEnquanto`.',
      requirements: [
        'Todos os operadores são extensões genéricas sobre `IEnumerable<T>`.',
        'Os que devolvem sequência usam `yield return` e não materializam nada internamente.',
        '`EmLotes` cria uma lista nova após cada `yield return` e emite o lote parcial do final.',
        '`EmLotes` valida `tamanho <= 0` **imediatamente**, delegando a iteração a um método privado.',
        '`Consecutivos` devolve pares `(anterior, atual)`; uma sequência com menos de dois itens devolve nada.',
        '`PularEnquanto` descarta do início enquanto a condição for verdadeira e devolve todo o resto.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

static class ExtensoesSequencia
{
    public static int ContarSe<T>(this IEnumerable<T> fonte, Func<T, bool> criterio)
    {
        // TODO
        return 0;
    }

    public static IEnumerable<T> Intercalar<T>(this IEnumerable<T> fonte, T separador)
    {
        // TODO: yield return
        yield break;
    }

    public static IEnumerable<List<T>> EmLotes<T>(this IEnumerable<T> fonte, int tamanho)
    {
        // TODO: valide tamanho aqui e delegue a iteracao
        return null;
    }

    private static IEnumerable<List<T>> EmLotesNucleo<T>(IEnumerable<T> fonte, int tamanho)
    {
        // TODO: yield return, lista nova a cada lote, lote parcial no fim
        yield break;
    }

    public static IEnumerable<(T Anterior, T Atual)> Consecutivos<T>(this IEnumerable<T> fonte)
    {
        // TODO
        yield break;
    }

    public static IEnumerable<T> PularEnquanto<T>(this IEnumerable<T> fonte, Func<T, bool> condicao)
    {
        // TODO
        yield break;
    }
}

class Program
{
    static void Main()
    {
        var numeros = new[] { 1, 2, 3, 4, 5, 6, 7 };

        Console.WriteLine($"pares: {numeros.ContarSe(n => n % 2 == 0)}");
        Console.WriteLine($"maiores: {numeros.ContarSe(n => n > 10)}");

        Console.WriteLine($"intercalado: {string.Join("", numeros.Intercalar(0))}");
        Console.WriteLine($"intercalado vazio: [{string.Join("", new int[0].Intercalar(0))}]");
        Console.WriteLine($"intercalado um: {string.Join("", new[] { 9 }.Intercalar(0))}");

        foreach (var lote in numeros.EmLotes(3))
        {
            Console.WriteLine($"lote: {string.Join(",", lote)}");
        }

        var guardados = numeros.EmLotes(3).ToList();
        Console.WriteLine($"lotes independentes: {guardados[0][0]} {guardados[1][0]} {guardados[2][0]}");

        try
        {
            numeros.EmLotes(0);
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"lote invalido: {ex.Message}");
        }

        var pares = new List<string>();

        foreach (var (anterior, atual) in numeros.Consecutivos())
        {
            pares.Add($"{anterior}->{atual}");
        }

        Console.WriteLine($"consecutivos: {string.Join(" ", pares)}");

        Console.WriteLine($"consecutivos de um: {new[] { 5 }.Consecutivos().Count()}");

        Console.WriteLine($"pular: {string.Join(",", numeros.PularEnquanto(n => n < 4))}");
        Console.WriteLine($"pular tudo: {string.Join(",", numeros.PularEnquanto(n => true))}");
        Console.WriteLine($"pular nada: {string.Join(",", numeros.PularEnquanto(n => false))}");

        var palavras = new List<string> { "sol", "lua", "mar" };
        Console.WriteLine($"texto intercalado: {string.Join("", palavras.Intercalar("-"))}");
        Console.WriteLine($"texto lotes: {palavras.EmLotes(2).Count()}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

static class ExtensoesSequencia
{
    public static int ContarSe<T>(this IEnumerable<T> fonte, Func<T, bool> criterio)
    {
        int total = 0;

        foreach (T item in fonte)
        {
            if (criterio(item))
            {
                total++;
            }
        }

        return total;
    }

    public static IEnumerable<T> Intercalar<T>(this IEnumerable<T> fonte, T separador)
    {
        bool primeiro = true;

        foreach (T item in fonte)
        {
            if (!primeiro)
            {
                yield return separador;
            }

            primeiro = false;
            yield return item;
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

    public static IEnumerable<(T Anterior, T Atual)> Consecutivos<T>(this IEnumerable<T> fonte)
    {
        bool temAnterior = false;
        T anterior = default;

        foreach (T item in fonte)
        {
            if (temAnterior)
            {
                yield return (anterior, item);
            }

            anterior = item;
            temAnterior = true;
        }
    }

    public static IEnumerable<T> PularEnquanto<T>(this IEnumerable<T> fonte, Func<T, bool> condicao)
    {
        bool pulando = true;

        foreach (T item in fonte)
        {
            if (pulando && condicao(item))
            {
                continue;
            }

            pulando = false;
            yield return item;
        }
    }
}

class Program
{
    static void Main()
    {
        var numeros = new[] { 1, 2, 3, 4, 5, 6, 7 };

        Console.WriteLine($"pares: {numeros.ContarSe(n => n % 2 == 0)}");
        Console.WriteLine($"maiores: {numeros.ContarSe(n => n > 10)}");

        Console.WriteLine($"intercalado: {string.Join("", numeros.Intercalar(0))}");
        Console.WriteLine($"intercalado vazio: [{string.Join("", new int[0].Intercalar(0))}]");
        Console.WriteLine($"intercalado um: {string.Join("", new[] { 9 }.Intercalar(0))}");

        foreach (var lote in numeros.EmLotes(3))
        {
            Console.WriteLine($"lote: {string.Join(",", lote)}");
        }

        var guardados = numeros.EmLotes(3).ToList();
        Console.WriteLine($"lotes independentes: {guardados[0][0]} {guardados[1][0]} {guardados[2][0]}");

        try
        {
            numeros.EmLotes(0);
            Console.WriteLine("nao deveria chegar aqui");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"lote invalido: {ex.Message}");
        }

        var pares = new List<string>();

        foreach (var (anterior, atual) in numeros.Consecutivos())
        {
            pares.Add($"{anterior}->{atual}");
        }

        Console.WriteLine($"consecutivos: {string.Join(" ", pares)}");

        Console.WriteLine($"consecutivos de um: {new[] { 5 }.Consecutivos().Count()}");

        Console.WriteLine($"pular: {string.Join(",", numeros.PularEnquanto(n => n < 4))}");
        Console.WriteLine($"pular tudo: {string.Join(",", numeros.PularEnquanto(n => true))}");
        Console.WriteLine($"pular nada: {string.Join(",", numeros.PularEnquanto(n => false))}");

        var palavras = new List<string> { "sol", "lua", "mar" };
        Console.WriteLine($"texto intercalado: {string.Join("", palavras.Intercalar("-"))}");
        Console.WriteLine($"texto lotes: {palavras.EmLotes(2).Count()}");
    }
}`,
      hints: [
        'A validação de `EmLotes` precisa estar num método **sem** `yield`, que devolve o resultado de outro método com `yield`. É o único jeito de a exceção sair na chamada.',
        '`Consecutivos` precisa de uma flag além da variável `anterior`: sem ela, o primeiro item pareceria ter um antecessor `default`.',
        'Em `PularEnquanto`, uma vez que a condição falha a flag desliga para sempre — itens posteriores que voltem a satisfazê-la continuam saindo.',
      ],
      tests: [
        {
          name: 'Operadores de sequência',
          expectedStdout:
            'pares: 3\nmaiores: 0\n' +
            'intercalado: 1020304050607\nintercalado vazio: []\nintercalado um: 9\n' +
            'lote: 1,2,3\nlote: 4,5,6\nlote: 7\n' +
            'lotes independentes: 1 4 7\n' +
            'lote invalido: tamanho deve ser positivo\n' +
            'consecutivos: 1->2 2->3 3->4 4->5 5->6 6->7\n' +
            'consecutivos de um: 0\n' +
            'pular: 4,5,6,7\npular tudo: \npular nada: 1,2,3,4,5,6,7\n' +
            'texto intercalado: sol-lua-mar\ntexto lotes: 2',
        },
      ],
    },
  },

  {
    id: 's08c02l04',
    title: 'Estendendo string',
    objective: 'Construir um conjunto coeso de extensões de texto, decidindo cultura, alocação e política de nulo.',
    concept: [
      {
        kind: 'text',
        body:
          '`string` é o tipo mais estendido de todo projeto C#, e por bons motivos: é `sealed`, é do framework, e todo domínio tem regras de texto próprias — normalizar um documento, gerar um identificador de URL, mascarar um dado sensível.',
      },
      {
        kind: 'text',
        body:
          'Três decisões aparecem em praticamente toda extensão de texto, e vale tomá-las conscientemente em vez de por acidente.',
      },
      {
        kind: 'table',
        headers: ['Decisão', 'Pergunta', 'Padrão sensato'],
        rows: [
          ['nulo', 'devolve algo ou lança?', 'devolver vazio ou o próprio valor'],
          ['cultura', 'comparar e converter como?', '`Invariant` para dados, cultura do usuário para exibição'],
          ['alocação', 'concatenar em laço?', '`StringBuilder` acima de poucas junções'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`ToUpper()` e `ToLower()` usam a cultura corrente, que muda conforme a máquina. Para dados — chaves, comparações, identificadores — use sempre `ToUpperInvariant()` e `ToLowerInvariant()`.',
      },
      {
        kind: 'compare',
        good: `public static string Normalizar(this string texto)
{
    if (texto == null) return "";
    return texto.Trim().ToLowerInvariant();
}`,
        bad: `public static string Normalizar(this string texto)
{
    // depende da cultura da maquina
    return texto.Trim().ToLower();
}`,
        goodLabel: 'Invariante e seguro contra nulo',
        badLabel: 'Depende do ambiente',
      },
      {
        kind: 'text',
        body:
          'Extensões que **constroem** texto caractere a caractere devem usar `StringBuilder`. Cada `+=` numa string cria um objeto novo, e num laço isso vira um custo quadrático.',
      },
      {
        kind: 'code',
        code: `public static string ApenasLetrasENumeros(this string texto)
{
    if (texto == null) return "";

    var construtor = new StringBuilder(texto.Length);

    foreach (char c in texto)
    {
        if (char.IsLetterOrDigit(c))
        {
            construtor.Append(char.ToLowerInvariant(c));
        }
    }

    return construtor.ToString();
}`,
        caption: 'Dar a capacidade inicial ao `StringBuilder` evita realocações quando o tamanho final é conhecido.',
      },
      {
        kind: 'text',
        body:
          'Extensões que **cortam** texto precisam de cuidado com os limites. `Substring` lança se o índice for inválido, e "pegue os primeiros N" é a operação mais fácil de errar.',
      },
      {
        kind: 'code',
        code: `public static string Primeiros(this string texto, int quantidade)
{
    if (texto == null) return "";
    if (quantidade <= 0) return "";
    if (quantidade >= texto.Length) return texto;

    return texto.Substring(0, quantidade);
}`,
        caption: 'Três guardas antes do corte. Cada uma corresponde a um caso que quebraria em produção.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma extensão de texto bem escrita nunca lança para entrada "estranha". Texto vem de formulário, de arquivo, de API — o inesperado é o caso comum, não a exceção.',
      },
      {
        kind: 'text',
        body:
          'Mascarar dados sensíveis é um exemplo que junta tudo: nulo, limites e construção. A regra costuma ser "mostre os últimos N, esconda o resto".',
      },
      {
        kind: 'code',
        code: `public static string Mascarar(this string texto, int visiveis)
{
    if (texto == null) return "";
    if (texto.Length <= visiveis) return texto;

    int escondidos = texto.Length - visiveis;
    return new string('*', escondidos) + texto.Substring(escondidos);
}`,
      },
      {
        kind: 'output',
        code: `1234567890  ->  ******7890
123         ->  123
(nulo)      ->  (vazio)`,
        caption: 'Quando o texto é curto demais para esconder algo, devolvê-lo inteiro é melhor que lançar.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Mantenha as extensões de texto num só lugar e sem estado. Uma classe estática de utilidades que não guarda nada é trivialmente testável e segura para uso concorrente.',
      },
    ],
    quiz: [
      {
        id: 's08c02l04q1',
        type: 'single',
        prompt: 'Por que preferir `ToLowerInvariant()` a `ToLower()` numa extensão de normalização?',
        options: [
          { id: 'a', text: '`ToLower()` depende da cultura corrente, então o resultado varia com o ambiente', correct: true },
          { id: 'b', text: '`ToLowerInvariant()` é sempre mais rápido' },
          { id: 'c', text: '`ToLower()` não funciona com acentos' },
          { id: 'd', text: 'Não há diferença prática entre os dois' },
        ],
        explanation:
          'Para dados — chaves, comparações, identificadores — o resultado precisa ser o mesmo em qualquer máquina. Para texto exibido ao usuário, a cultura dele é a escolha certa.',
      },
      {
        id: 's08c02l04q2',
        type: 'single',
        prompt: 'Por que usar `StringBuilder` numa extensão que filtra caractere a caractere?',
        options: [
          { id: 'a', text: 'Cada `+=` numa string aloca um objeto novo, tornando o laço quadrático', correct: true },
          { id: 'b', text: 'Porque `string` não pode ser concatenada dentro de `foreach`' },
          { id: 'c', text: 'Porque `StringBuilder` preserva a cultura invariante' },
          { id: 'd', text: 'Porque só `StringBuilder` aceita `char`' },
        ],
        explanation:
          'Strings são imutáveis: `texto += c` cria uma string nova a cada volta. Com n caracteres isso são n alocações de tamanho crescente.',
      },
      {
        id: 's08c02l04q3',
        type: 'single',
        prompt: 'O que `"123".Mascarar(4)` deve devolver, sendo a regra "mostre os últimos 4"?',
        options: [
          { id: 'a', text: '`123`: não há nada para esconder', correct: true },
          { id: 'b', text: '`****`' },
          { id: 'c', text: '`*123`' },
          { id: 'd', text: 'Lançar `ArgumentException`' },
        ],
        explanation:
          'Quando o texto é mais curto que a parte visível, não sobra nada a mascarar. Devolvê-lo inteiro é o comportamento previsível; lançar transformaria um caso comum em erro.',
      },
    ],
    challenge: {
      brief:
        'Monte a caixa de ferramentas de texto de um sistema: normalizar, gerar identificador de URL, mascarar dados, contar ocorrências, capitalizar e centralizar — tudo seguro contra nulo e independente de cultura.',
      requirements: [
        'Todas as extensões tratam `null` sem lançar.',
        '`Normalizar` remove espaços das pontas e converte com `ToLowerInvariant`.',
        '`ParaIdentificador` mantém letras e dígitos, troca espaços por `-` e colapsa hífens repetidos.',
        '`Mascarar` mostra os últimos N caracteres; texto mais curto que N sai inteiro.',
        '`ContarOcorrencias` conta ocorrências sobrepostas de um trecho.',
        '`Capitalizar` deixa a primeira letra de cada palavra maiúscula e o resto minúsculo, com `Invariant`.',
        'Use `StringBuilder` onde o texto é construído caractere a caractere.',
      ],
      starterCode: `using System;
using System.Text;

static class ExtensoesTexto
{
    public static string Normalizar(this string texto)
    {
        // TODO
        return "";
    }

    public static string ParaIdentificador(this string texto)
    {
        // TODO: letras e digitos em minusculo, espacos viram '-', sem hifens repetidos
        return "";
    }

    public static string Mascarar(this string texto, int visiveis)
    {
        // TODO
        return "";
    }

    public static int ContarOcorrencias(this string texto, string trecho)
    {
        // TODO: ocorrencias sobrepostas
        return 0;
    }

    public static string Capitalizar(this string texto)
    {
        // TODO: primeira letra de cada palavra em maiuscula
        return "";
    }

    public static string Primeiros(this string texto, int quantidade)
    {
        // TODO
        return "";
    }

    public static string ApenasDigitos(this string texto)
    {
        // TODO
        return "";
    }
}

class Program
{
    static void Main()
    {
        string nulo = null;

        Console.WriteLine($"normalizar: [{"  Casa Verde  ".Normalizar()}]");
        Console.WriteLine($"normalizar nulo: [{nulo.Normalizar()}]");

        Console.WriteLine($"id: {"Meu Primeiro Post!".ParaIdentificador()}");
        Console.WriteLine($"id espacos: {"  a   b  ".ParaIdentificador()}");
        Console.WriteLine($"id simbolos: {"C# & .NET".ParaIdentificador()}");
        Console.WriteLine($"id nulo: [{nulo.ParaIdentificador()}]");

        Console.WriteLine($"mascarar: {"1234567890".Mascarar(4)}");
        Console.WriteLine($"mascarar curto: {"123".Mascarar(4)}");
        Console.WriteLine($"mascarar exato: {"1234".Mascarar(4)}");
        Console.WriteLine($"mascarar nulo: [{nulo.Mascarar(4)}]");

        Console.WriteLine($"ocorrencias: {"abababa".ContarOcorrencias("aba")}");
        Console.WriteLine($"ocorrencias simples: {"banana".ContarOcorrencias("na")}");
        Console.WriteLine($"ocorrencias zero: {"banana".ContarOcorrencias("xy")}");
        Console.WriteLine($"ocorrencias nulo: {nulo.ContarOcorrencias("a")}");

        Console.WriteLine($"capitalizar: {"jOAO da SILVA".Capitalizar()}");
        Console.WriteLine($"capitalizar um: {"ana".Capitalizar()}");
        Console.WriteLine($"capitalizar nulo: [{nulo.Capitalizar()}]");

        Console.WriteLine($"primeiros: {"bicicleta".Primeiros(4)}");
        Console.WriteLine($"primeiros demais: {"oi".Primeiros(10)}");
        Console.WriteLine($"primeiros zero: [{"oi".Primeiros(0)}]");

        Console.WriteLine($"digitos: {"(81) 99999-1234".ApenasDigitos()}");
        Console.WriteLine($"digitos nenhum: [{"abc".ApenasDigitos()}]");
    }
}`,
      solution: `using System;
using System.Text;

static class ExtensoesTexto
{
    public static string Normalizar(this string texto)
    {
        if (texto == null)
        {
            return "";
        }

        return texto.Trim().ToLowerInvariant();
    }

    public static string ParaIdentificador(this string texto)
    {
        if (texto == null)
        {
            return "";
        }

        var construtor = new StringBuilder(texto.Length);
        bool ultimoFoiHifen = true;

        foreach (char c in texto)
        {
            if (char.IsLetterOrDigit(c))
            {
                construtor.Append(char.ToLowerInvariant(c));
                ultimoFoiHifen = false;
            }
            else if (!ultimoFoiHifen)
            {
                construtor.Append('-');
                ultimoFoiHifen = true;
            }
        }

        string resultado = construtor.ToString();
        return resultado.TrimEnd('-');
    }

    public static string Mascarar(this string texto, int visiveis)
    {
        if (texto == null)
        {
            return "";
        }

        if (texto.Length <= visiveis)
        {
            return texto;
        }

        int escondidos = texto.Length - visiveis;
        return new string('*', escondidos) + texto.Substring(escondidos);
    }

    public static int ContarOcorrencias(this string texto, string trecho)
    {
        if (texto == null || string.IsNullOrEmpty(trecho))
        {
            return 0;
        }

        int total = 0;

        for (int i = 0; i + trecho.Length <= texto.Length; i++)
        {
            if (string.CompareOrdinal(texto, i, trecho, 0, trecho.Length) == 0)
            {
                total++;
            }
        }

        return total;
    }

    public static string Capitalizar(this string texto)
    {
        if (texto == null)
        {
            return "";
        }

        var construtor = new StringBuilder(texto.Length);
        bool inicioDePalavra = true;

        foreach (char c in texto)
        {
            if (char.IsWhiteSpace(c))
            {
                construtor.Append(c);
                inicioDePalavra = true;
                continue;
            }

            construtor.Append(inicioDePalavra ? char.ToUpperInvariant(c) : char.ToLowerInvariant(c));
            inicioDePalavra = false;
        }

        return construtor.ToString();
    }

    public static string Primeiros(this string texto, int quantidade)
    {
        if (texto == null || quantidade <= 0)
        {
            return "";
        }

        if (quantidade >= texto.Length)
        {
            return texto;
        }

        return texto.Substring(0, quantidade);
    }

    public static string ApenasDigitos(this string texto)
    {
        if (texto == null)
        {
            return "";
        }

        var construtor = new StringBuilder(texto.Length);

        foreach (char c in texto)
        {
            if (char.IsDigit(c))
            {
                construtor.Append(c);
            }
        }

        return construtor.ToString();
    }
}

class Program
{
    static void Main()
    {
        string nulo = null;

        Console.WriteLine($"normalizar: [{"  Casa Verde  ".Normalizar()}]");
        Console.WriteLine($"normalizar nulo: [{nulo.Normalizar()}]");

        Console.WriteLine($"id: {"Meu Primeiro Post!".ParaIdentificador()}");
        Console.WriteLine($"id espacos: {"  a   b  ".ParaIdentificador()}");
        Console.WriteLine($"id simbolos: {"C# & .NET".ParaIdentificador()}");
        Console.WriteLine($"id nulo: [{nulo.ParaIdentificador()}]");

        Console.WriteLine($"mascarar: {"1234567890".Mascarar(4)}");
        Console.WriteLine($"mascarar curto: {"123".Mascarar(4)}");
        Console.WriteLine($"mascarar exato: {"1234".Mascarar(4)}");
        Console.WriteLine($"mascarar nulo: [{nulo.Mascarar(4)}]");

        Console.WriteLine($"ocorrencias: {"abababa".ContarOcorrencias("aba")}");
        Console.WriteLine($"ocorrencias simples: {"banana".ContarOcorrencias("na")}");
        Console.WriteLine($"ocorrencias zero: {"banana".ContarOcorrencias("xy")}");
        Console.WriteLine($"ocorrencias nulo: {nulo.ContarOcorrencias("a")}");

        Console.WriteLine($"capitalizar: {"jOAO da SILVA".Capitalizar()}");
        Console.WriteLine($"capitalizar um: {"ana".Capitalizar()}");
        Console.WriteLine($"capitalizar nulo: [{nulo.Capitalizar()}]");

        Console.WriteLine($"primeiros: {"bicicleta".Primeiros(4)}");
        Console.WriteLine($"primeiros demais: {"oi".Primeiros(10)}");
        Console.WriteLine($"primeiros zero: [{"oi".Primeiros(0)}]");

        Console.WriteLine($"digitos: {"(81) 99999-1234".ApenasDigitos()}");
        Console.WriteLine($"digitos nenhum: [{"abc".ApenasDigitos()}]");
    }
}`,
      hints: [
        'Em `ParaIdentificador`, uma flag `ultimoFoiHifen` iniciada em `true` resolve de uma vez os hífens repetidos e o hífen inicial. O `TrimEnd(\'-\')` cuida do final.',
        '`ContarOcorrencias` sobrepostas avança de um em um: `"abababa"` contém `"aba"` nas posições 0, 2 e 4.',
        '`string.CompareOrdinal(texto, i, trecho, 0, trecho.Length)` compara um trecho sem alocar substrings.',
        'Em `Capitalizar`, o espaço precisa ser copiado **e** religar a flag de início de palavra.',
      ],
      tests: [
        {
          name: 'Caixa de ferramentas de texto',
          expectedStdout:
            'normalizar: [casa verde]\nnormalizar nulo: []\n' +
            'id: meu-primeiro-post\nid espacos: a-b\nid simbolos: c-net\nid nulo: []\n' +
            'mascarar: ******7890\nmascarar curto: 123\nmascarar exato: 1234\nmascarar nulo: []\n' +
            'ocorrencias: 3\nocorrencias simples: 2\nocorrencias zero: 0\nocorrencias nulo: 0\n' +
            'capitalizar: Joao Da Silva\ncapitalizar um: Ana\ncapitalizar nulo: []\n' +
            'primeiros: bici\nprimeiros demais: oi\nprimeiros zero: []\n' +
            'digitos: 81999991234\ndigitos nenhum: []',
        },
      ],
    },
  },

  {
    id: 's08c02l05',
    title: 'Construindo uma API fluente',
    objective: 'Encadear chamadas devolvendo o próprio objeto, e separar a construção do resultado final.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma **API fluente** encadeia operações numa expressão só. Você já usa uma: `lista.Where(...).OrderBy(...).Take(5)`. O truque por trás é banal — cada método devolve algo que permite continuar.',
      },
      {
        kind: 'code',
        code: `class Consulta
{
    private readonly List<string> filtros = new();
    private string ordem = "";
    private int limite = -1;

    public Consulta Onde(string condicao)
    {
        filtros.Add(condicao);
        return this;
    }

    public Consulta OrdenarPor(string campo)
    {
        ordem = campo;
        return this;
    }

    public Consulta Limitar(int n)
    {
        limite = n;
        return this;
    }
}`,
        caption: 'O `return this` é a API fluente inteira. Todo o resto é design.',
      },
      {
        kind: 'code',
        code: `string sql = new Consulta()
    .Onde("ativo = 1")
    .Onde("idade > 18")
    .OrdenarPor("nome")
    .Limitar(10)
    .Construir();

Console.WriteLine(sql);`,
      },
      {
        kind: 'output',
        code: `SELECT * WHERE ativo = 1 AND idade > 18 ORDER BY nome LIMIT 10`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que `Construir()` **não** devolve `this`: ele encerra a cadeia e produz o resultado. Essa separação entre "configurar" e "finalizar" é o que impede que a cadeia continue por engano depois de pronta.',
      },
      {
        kind: 'text',
        body:
          'Uma cadeia bem desenhada também lida com o caso mínimo. Nenhuma chamada de configuração deve produzir um resultado quebrado — só o resultado mais simples possível.',
      },
      {
        kind: 'output',
        code: `SELECT *`,
        caption: '`new Consulta().Construir()` sem nenhuma configuração. Válido, previsível, sem cláusulas vazias.',
      },
      {
        kind: 'text',
        body:
          'Existem dois estilos, e a escolha muda o comportamento de forma importante. O **mutável** modifica o próprio objeto; o **imutável** devolve uma cópia nova a cada passo.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Mutável: `return this`',
          code: `public Consulta Onde(string c)
{
    filtros.Add(c);
    return this;
}

var a = new Consulta().Onde("x = 1");
var b = a.Onde("y = 2");
// a e b sao o MESMO objeto`,
        },
        right: {
          label: 'Imutável: devolve cópia',
          code: `public Consulta Onde(string c)
{
    var nova = Clonar();
    nova.filtros.Add(c);
    return nova;
}

var a = new Consulta().Onde("x = 1");
var b = a.Onde("y = 2");
// a continua com um filtro so`,
        },
        note: 'O LINQ é imutável: `var q = lista.Where(...)` pode ser reaproveitada sem medo de alguém tê-la alterado.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O estilo mutável surpreende quem guarda uma etapa intermediária. Se `var basica = consulta.Onde("ativo = 1")` e depois alguém chama `basica.Limitar(5)`, a "consulta base" também mudou — as duas variáveis apontam para o mesmo objeto.',
      },
      {
        kind: 'text',
        body:
          'Métodos de extensão constroem APIs fluentes sobre tipos que você **não** controla — e é assim que o LINQ funciona sobre `IEnumerable<T>`.',
      },
      {
        kind: 'code',
        code: `static class ExtensoesTexto
{
    public static string SemAcentos(this string t) { /* ... */ return t; }
    public static string EmMinusculas(this string t) => t.ToLowerInvariant();
    public static string SemEspacos(this string t) => t.Replace(" ", "-");
}

string id = "  Meu Titulo  ".Trim().SemAcentos().EmMinusculas().SemEspacos();`,
        caption: 'Cada extensão devolve `string`, então a cadeia continua — misturando métodos do framework e seus.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Duas regras práticas: o nome de cada passo é um **verbo** que descreve a intenção, e o método que fecha a cadeia tem nome diferente dos demais (`Construir`, `Executar`, `ToList`). Quem lê precisa enxergar onde a configuração acaba.',
      },
    ],
    quiz: [
      {
        id: 's08c02l05q1',
        type: 'single',
        prompt: 'O que torna uma cadeia de métodos possível?',
        options: [
          { id: 'a', text: 'Cada método devolver um objeto sobre o qual o próximo pode ser chamado', correct: true },
          { id: 'b', text: 'Os métodos serem estáticos' },
          { id: 'c', text: 'A classe implementar `IEnumerable`' },
          { id: 'd', text: 'Os métodos serem marcados com `fluent`' },
        ],
        explanation:
          'Não há palavra-chave nem interface envolvida. Um método que devolve `void` encerra a cadeia; um que devolve algo encadeável a continua.',
      },
      {
        id: 's08c02l05q2',
        type: 'single',
        prompt: 'Por que `Construir()` não deve devolver `this`?',
        options: [
          { id: 'a', text: 'Ele encerra a cadeia e produz o resultado; devolver `this` permitiria continuar por engano', correct: true },
          { id: 'b', text: 'Porque `this` não pode ser devolvido do último método' },
          { id: 'c', text: 'Por desempenho' },
          { id: 'd', text: 'Ele deve devolver `this` também, por consistência' },
        ],
        explanation:
          'A mudança de tipo de retorno é o sinal de que a configuração terminou. É o mesmo papel de `ToList()` no LINQ.',
      },
      {
        id: 's08c02l05q3',
        type: 'single',
        prompt: 'Com uma API fluente mutável, o que acontece depois deste código?',
        code: `var basica = new Consulta().Onde("ativo = 1");
var completa = basica.Onde("idade > 18");`,
        options: [
          { id: 'a', text: '`basica` e `completa` são o mesmo objeto, com os dois filtros', correct: true },
          { id: 'b', text: '`basica` fica com um filtro e `completa` com dois' },
          { id: 'c', text: '`completa` é uma cópia independente' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          '`return this` devolve a mesma referência. Se etapas intermediárias precisam ser reaproveitadas, o estilo imutável — devolver uma cópia — é o correto.',
      },
    ],
    challenge: {
      brief:
        'Construa um gerador de relatórios com API fluente: título, colunas, filtros, ordenação e limite, encerrando com `Construir()`. Ofereça também uma versão imutável e mostre a diferença de comportamento.',
      requirements: [
        'Cada método de configuração devolve `this`, permitindo o encadeamento.',
        '`Construir` devolve `string` e **não** permite continuar a cadeia.',
        'Uma configuração vazia produz `RELATORIO sem titulo` — nunca cláusulas vazias.',
        'Colunas e filtros aparecem na ordem em que foram adicionados.',
        '`Clonar()` devolve uma cópia independente; alterar a cópia não afeta a original.',
        'Demonstre que, no estilo mutável, duas variáveis da mesma cadeia apontam para o mesmo objeto.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Text;

class Relatorio
{
    private string titulo = "";
    private readonly List<string> colunas = new();
    private readonly List<string> filtros = new();
    private string ordem = "";
    private int limite = -1;

    public Relatorio Titulo(string valor)
    {
        // TODO
        return this;
    }

    public Relatorio Coluna(string nome)
    {
        // TODO
        return this;
    }

    public Relatorio Onde(string condicao)
    {
        // TODO
        return this;
    }

    public Relatorio OrdenarPor(string campo)
    {
        // TODO
        return this;
    }

    public Relatorio Limitar(int n)
    {
        // TODO
        return this;
    }

    public Relatorio Clonar()
    {
        // TODO: copia independente
        return this;
    }

    public string Construir()
    {
        // TODO: "RELATORIO <titulo ou 'sem titulo'>"
        //       " COLUNAS a, b" quando houver
        //       " ONDE x AND y" quando houver
        //       " ORDEM campo" quando houver
        //       " LIMITE n" quando n >= 0
        return "";
    }
}

class Program
{
    static void Main()
    {
        string completo = new Relatorio()
            .Titulo("Vendas")
            .Coluna("produto")
            .Coluna("total")
            .Onde("ativo = 1")
            .Onde("total > 100")
            .OrdenarPor("total")
            .Limitar(20)
            .Construir();

        Console.WriteLine(completo);
        Console.WriteLine(new Relatorio().Construir());
        Console.WriteLine(new Relatorio().Titulo("Simples").Construir());
        Console.WriteLine(new Relatorio().Coluna("id").Limitar(0).Construir());

        var basica = new Relatorio().Titulo("Base").Coluna("id");
        var derivada = basica.Onde("ativo = 1");

        Console.WriteLine($"mesmo objeto: {ReferenceEquals(basica, derivada)}");
        Console.WriteLine($"base: {basica.Construir()}");

        var original = new Relatorio().Titulo("Original").Coluna("id");
        var copia = original.Clonar().Coluna("nome").Limitar(5);

        Console.WriteLine($"copia distinta: {!ReferenceEquals(original, copia)}");
        Console.WriteLine($"original: {original.Construir()}");
        Console.WriteLine($"copia: {copia.Construir()}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Text;

class Relatorio
{
    private string titulo = "";
    private readonly List<string> colunas = new();
    private readonly List<string> filtros = new();
    private string ordem = "";
    private int limite = -1;

    public Relatorio Titulo(string valor)
    {
        titulo = valor;
        return this;
    }

    public Relatorio Coluna(string nome)
    {
        colunas.Add(nome);
        return this;
    }

    public Relatorio Onde(string condicao)
    {
        filtros.Add(condicao);
        return this;
    }

    public Relatorio OrdenarPor(string campo)
    {
        ordem = campo;
        return this;
    }

    public Relatorio Limitar(int n)
    {
        limite = n;
        return this;
    }

    public Relatorio Clonar()
    {
        var copia = new Relatorio();
        copia.titulo = titulo;
        copia.colunas.AddRange(colunas);
        copia.filtros.AddRange(filtros);
        copia.ordem = ordem;
        copia.limite = limite;
        return copia;
    }

    public string Construir()
    {
        var construtor = new StringBuilder("RELATORIO ");
        construtor.Append(titulo == "" ? "sem titulo" : titulo);

        if (colunas.Count > 0)
        {
            construtor.Append(" COLUNAS ").Append(string.Join(", ", colunas));
        }

        if (filtros.Count > 0)
        {
            construtor.Append(" ONDE ").Append(string.Join(" AND ", filtros));
        }

        if (ordem != "")
        {
            construtor.Append(" ORDEM ").Append(ordem);
        }

        if (limite >= 0)
        {
            construtor.Append(" LIMITE ").Append(limite);
        }

        return construtor.ToString();
    }
}

class Program
{
    static void Main()
    {
        string completo = new Relatorio()
            .Titulo("Vendas")
            .Coluna("produto")
            .Coluna("total")
            .Onde("ativo = 1")
            .Onde("total > 100")
            .OrdenarPor("total")
            .Limitar(20)
            .Construir();

        Console.WriteLine(completo);
        Console.WriteLine(new Relatorio().Construir());
        Console.WriteLine(new Relatorio().Titulo("Simples").Construir());
        Console.WriteLine(new Relatorio().Coluna("id").Limitar(0).Construir());

        var basica = new Relatorio().Titulo("Base").Coluna("id");
        var derivada = basica.Onde("ativo = 1");

        Console.WriteLine($"mesmo objeto: {ReferenceEquals(basica, derivada)}");
        Console.WriteLine($"base: {basica.Construir()}");

        var original = new Relatorio().Titulo("Original").Coluna("id");
        var copia = original.Clonar().Coluna("nome").Limitar(5);

        Console.WriteLine($"copia distinta: {!ReferenceEquals(original, copia)}");
        Console.WriteLine($"original: {original.Construir()}");
        Console.WriteLine($"copia: {copia.Construir()}");
    }
}`,
      hints: [
        'Cada cláusula opcional é um `if` no `Construir`: nada é acrescentado quando a lista está vazia ou o campo continua no valor inicial.',
        '`limite >= 0` e não `limite > 0`: `Limitar(0)` é uma escolha legítima e deve aparecer na saída.',
        '`Clonar` precisa copiar o **conteúdo** das listas com `AddRange`. Atribuir a referência faria as duas instâncias compartilharem os mesmos filtros.',
      ],
      tests: [
        {
          name: 'Relatório fluente',
          expectedStdout:
            'RELATORIO Vendas COLUNAS produto, total ONDE ativo = 1 AND total > 100 ORDEM total LIMITE 20\n' +
            'RELATORIO sem titulo\n' +
            'RELATORIO Simples\n' +
            'RELATORIO sem titulo COLUNAS id LIMITE 0\n' +
            'mesmo objeto: True\n' +
            'base: RELATORIO Base COLUNAS id ONDE ativo = 1\n' +
            'copia distinta: True\n' +
            'original: RELATORIO Original COLUNAS id\n' +
            'copia: RELATORIO Original COLUNAS id, nome LIMITE 5',
        },
      ],
    },
  },

  {
    id: 's08c02l06',
    title: 'Sobrecarga de operadores',
    objective: 'Dar significado a `+`, `==` e companhia nos seus próprios tipos, sem quebrar as expectativas de quem os usa.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando um tipo representa um valor matemático — dinheiro, vetor, medida, fração — escrever `a + b` é mais legível que `a.Somar(b)`. C# permite definir o que os operadores significam para os seus tipos.',
      },
      {
        kind: 'code',
        code: `public static Dinheiro operator +(Dinheiro a, Dinheiro b)
{
    if (a.Moeda != b.Moeda)
    {
        throw new InvalidOperationException("moedas diferentes");
    }

    return new Dinheiro(a.Valor + b.Valor, a.Moeda);
}`,
        caption: 'A assinatura é fixa: `public static`, a palavra `operator`, o símbolo, e os operandos como parâmetros.',
      },
      {
        kind: 'text',
        body:
          'Operadores binários recebem dois parâmetros; unários, um. Não é obrigatório que os dois operandos sejam do mesmo tipo — `Dinheiro * int` é uma sobrecarga perfeitamente válida.',
      },
      {
        kind: 'code',
        code: `public static Dinheiro operator *(Dinheiro a, int fator)
{
    return new Dinheiro(a.Valor * fator, a.Moeda);
}

public static Dinheiro operator -(Dinheiro a)
{
    return new Dinheiro(-a.Valor, a.Moeda);
}`,
        caption: 'O segundo é o menos **unário** — o mesmo símbolo do binário, distinguido pela quantidade de parâmetros.',
      },
      {
        kind: 'output',
        code: `soma: BRL 15.00
triplo: BRL 31.50
negativo: BRL -10.50`,
      },
      {
        kind: 'text',
        body:
          'Alguns operadores só podem ser definidos **em par**. Definir um sem o outro é erro de compilação, e a regra existe para impedir tipos com lógica incoerente.',
      },
      {
        kind: 'table',
        headers: ['Se você define', 'Precisa definir também'],
        rows: [
          ['`==`', '`!=`'],
          ['`<`', '`>`'],
          ['`<=`', '`>=`'],
          ['`true`', '`false`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Definir `==` sem sobrescrever `Equals` e `GetHashCode` gera aviso do compilador — e um bug silencioso. `HashSet` e `Dictionary` usam `Equals`/`GetHashCode`, **não** o operador. Sem os três alinhados, `a == b` diz uma coisa e o dicionário acredita em outra.',
      },
      {
        kind: 'code',
        code: `public static bool operator ==(Dinheiro a, Dinheiro b)
{
    return a.Valor == b.Valor && a.Moeda == b.Moeda;
}

public static bool operator !=(Dinheiro a, Dinheiro b) => !(a == b);

public override bool Equals(object obj) => obj is Dinheiro outro && this == outro;

public override int GetHashCode() => HashCode.Combine(Valor, Moeda);`,
        caption: 'Os quatro juntos. `Equals` delega ao operador, e `GetHashCode` usa exatamente os mesmos campos.',
      },
      {
        kind: 'text',
        body:
          'O teste que revela se está tudo alinhado é colocar valores iguais num `HashSet`: se `==` diz que são iguais, o conjunto deve guardar apenas um.',
      },
      {
        kind: 'code',
        code: `var conjunto = new HashSet<Dinheiro>
{
    new Dinheiro(10.5m, "BRL"),
    new Dinheiro(10.5m, "BRL"),
    new Dinheiro(4.5m, "BRL"),
};

Console.WriteLine(conjunto.Count);`,
      },
      {
        kind: 'output',
        code: `2`,
        caption: 'Dois elementos: os dois primeiros foram reconhecidos como o mesmo valor. Sem `GetHashCode`, seriam três.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '`record` e `record struct` geram `==`, `Equals` e `GetHashCode` coerentes automaticamente. Sobrecarregar operadores à mão só é necessário quando o tipo precisa de aritmética — ou de uma igualdade diferente da estrutural.',
      },
      {
        kind: 'text',
        body:
          'A regra final é a mais importante e não é técnica: **o operador precisa significar o óbvio**. `+` que remove, `==` que compara só um campo, `<` que não define uma ordem consistente — tudo isso compila e destrói a legibilidade que o operador deveria trazer.',
      },
      {
        kind: 'compare',
        good: `// + soma, - subtrai, == compara
// tudo o que qualquer leitor supoe
var total = precoA + precoB;`,
        bad: `// + adiciona a uma lista interna
// e devolve outra coisa
var estranho = pedido + item;`,
        goodLabel: 'Operador previsível',
        badLabel: 'Operador criativo',
      },
    ],
    quiz: [
      {
        id: 's08c02l06q1',
        type: 'single',
        prompt: 'O que acontece ao definir `operator ==` sem definir `operator !=`?',
        options: [
          { id: 'a', text: 'Erro de compilação: os dois precisam vir em par', correct: true },
          { id: 'b', text: '`!=` é gerado automaticamente como a negação de `==`' },
          { id: 'c', text: 'Compila, mas `!=` sempre devolve `false`' },
          { id: 'd', text: 'Apenas um aviso' },
        ],
        explanation:
          'A linguagem exige o par para evitar tipos em que `a == b` e `a != b` possam ser ambos verdadeiros. O mesmo vale para `<`/`>` e `<=`/`>=`.',
      },
      {
        id: 's08c02l06q2',
        type: 'single',
        prompt: 'Por que sobrescrever `Equals` e `GetHashCode` ao definir `==`?',
        options: [
          { id: 'a', text: 'Coleções como `HashSet` e `Dictionary` usam `Equals`/`GetHashCode`, não o operador', correct: true },
          { id: 'b', text: 'Porque `==` não compila sem `Equals`' },
          { id: 'c', text: 'Para melhorar o desempenho da comparação' },
          { id: 'd', text: 'Não é necessário: `==` já é usado pelas coleções' },
        ],
        explanation:
          'Sem os três alinhados, dois valores "iguais" pelo operador entram duas vezes num `HashSet`. É um bug que só aparece quando o tipo vai parar numa coleção.',
      },
      {
        id: 's08c02l06q3',
        type: 'single',
        prompt: 'Quando sobrecarregar operadores é apropriado?',
        options: [
          { id: 'a', text: 'Quando o tipo representa um valor com semântica matemática ou de comparação natural', correct: true },
          { id: 'b', text: 'Sempre que a classe tiver mais de três campos' },
          { id: 'c', text: 'Sempre que quiser escrever menos código' },
          { id: 'd', text: 'Nunca: sobrecarga de operadores é obsoleta' },
        ],
        explanation:
          'Dinheiro, vetores, medidas e frações se beneficiam. Um `Pedido` ou um `Cliente` não têm soma óbvia — ali um método com nome de verbo comunica melhor.',
      },
    ],
    challenge: {
      brief:
        'Implemente um tipo `Fracao` com aritmética completa: soma, subtração, multiplicação, negação, comparação e igualdade coerente — incluindo simplificação automática.',
      requirements: [
        'A fração é sempre guardada **simplificada**, com o sinal no numerador.',
        'Denominador zero lança `ArgumentException` no construtor.',
        '`+`, `-` (binário e unário), `*` e `/` devolvem uma `Fracao` nova, já simplificada.',
        '`==`, `!=`, `<` e `>` são definidos, com `Equals` e `GetHashCode` coerentes.',
        '`ToString` imprime `a/b`, ou apenas `a` quando o denominador é 1.',
        'Um `HashSet<Fracao>` com `1/2` e `2/4` deve conter um único elemento.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

struct Fracao
{
    public int Numerador { get; }
    public int Denominador { get; }

    public Fracao(int numerador, int denominador)
    {
        // TODO: rejeite denominador zero, simplifique e ponha o sinal no numerador
        Numerador = numerador;
        Denominador = denominador;
    }

    private static int MaiorDivisorComum(int a, int b)
    {
        // TODO: use valores absolutos
        return 1;
    }

    public static Fracao operator +(Fracao a, Fracao b)
    {
        // TODO
        return a;
    }

    public static Fracao operator -(Fracao a, Fracao b)
    {
        // TODO
        return a;
    }

    public static Fracao operator -(Fracao a)
    {
        // TODO: negacao unaria
        return a;
    }

    public static Fracao operator *(Fracao a, Fracao b)
    {
        // TODO
        return a;
    }

    public static Fracao operator /(Fracao a, Fracao b)
    {
        // TODO
        return a;
    }

    public static bool operator ==(Fracao a, Fracao b)
    {
        // TODO
        return false;
    }

    public static bool operator !=(Fracao a, Fracao b)
    {
        // TODO
        return false;
    }

    public static bool operator <(Fracao a, Fracao b)
    {
        // TODO: compare por multiplicacao cruzada
        return false;
    }

    public static bool operator >(Fracao a, Fracao b)
    {
        // TODO
        return false;
    }

    public override bool Equals(object obj)
    {
        // TODO
        return false;
    }

    public override int GetHashCode()
    {
        // TODO: HashCode.Combine
        return 0;
    }

    public override string ToString()
    {
        // TODO: "a/b", ou "a" quando o denominador e 1
        return "";
    }
}

class Program
{
    static void Main()
    {
        var meio = new Fracao(1, 2);
        var terco = new Fracao(1, 3);

        Console.WriteLine($"soma: {meio + terco}");
        Console.WriteLine($"subtracao: {meio - terco}");
        Console.WriteLine($"produto: {meio * terco}");
        Console.WriteLine($"divisao: {meio / terco}");
        Console.WriteLine($"negativo: {-meio}");

        Console.WriteLine($"simplificada: {new Fracao(4, 8)}");
        Console.WriteLine($"inteira: {new Fracao(6, 3)}");
        Console.WriteLine($"sinal: {new Fracao(1, -2)}");
        Console.WriteLine($"zero: {new Fracao(0, 5)}");

        Console.WriteLine($"igual: {new Fracao(1, 2) == new Fracao(2, 4)}");
        Console.WriteLine($"diferente: {meio != terco}");
        Console.WriteLine($"menor: {terco < meio}");
        Console.WriteLine($"maior: {meio > terco}");
        Console.WriteLine($"negativos: {new Fracao(-1, 2) < new Fracao(1, 3)}");

        Console.WriteLine($"equals: {meio.Equals(new Fracao(2, 4))}");
        Console.WriteLine($"equals outro tipo: {meio.Equals("texto")}");

        var conjunto = new HashSet<Fracao>
        {
            new Fracao(1, 2),
            new Fracao(2, 4),
            new Fracao(1, 3),
        };

        Console.WriteLine($"conjunto: {conjunto.Count}");
        Console.WriteLine($"soma acumulada: {meio + terco + new Fracao(1, 6)}");

        try
        {
            var invalida = new Fracao(1, 0);
            Console.WriteLine($"nao deveria: {invalida}");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"erro: {ex.Message}");
        }
    }
}`,
      solution: `using System;
using System.Collections.Generic;

struct Fracao
{
    public int Numerador { get; }
    public int Denominador { get; }

    public Fracao(int numerador, int denominador)
    {
        if (denominador == 0)
        {
            throw new ArgumentException("denominador nao pode ser zero");
        }

        if (denominador < 0)
        {
            numerador = -numerador;
            denominador = -denominador;
        }

        int divisor = MaiorDivisorComum(numerador, denominador);
        Numerador = numerador / divisor;
        Denominador = denominador / divisor;
    }

    private static int MaiorDivisorComum(int a, int b)
    {
        a = Math.Abs(a);
        b = Math.Abs(b);

        while (b != 0)
        {
            int resto = a % b;
            a = b;
            b = resto;
        }

        return a == 0 ? 1 : a;
    }

    public static Fracao operator +(Fracao a, Fracao b)
    {
        return new Fracao(
            a.Numerador * b.Denominador + b.Numerador * a.Denominador,
            a.Denominador * b.Denominador);
    }

    public static Fracao operator -(Fracao a, Fracao b)
    {
        return new Fracao(
            a.Numerador * b.Denominador - b.Numerador * a.Denominador,
            a.Denominador * b.Denominador);
    }

    public static Fracao operator -(Fracao a)
    {
        return new Fracao(-a.Numerador, a.Denominador);
    }

    public static Fracao operator *(Fracao a, Fracao b)
    {
        return new Fracao(a.Numerador * b.Numerador, a.Denominador * b.Denominador);
    }

    public static Fracao operator /(Fracao a, Fracao b)
    {
        return new Fracao(a.Numerador * b.Denominador, a.Denominador * b.Numerador);
    }

    public static bool operator ==(Fracao a, Fracao b)
    {
        return a.Numerador == b.Numerador && a.Denominador == b.Denominador;
    }

    public static bool operator !=(Fracao a, Fracao b)
    {
        return !(a == b);
    }

    public static bool operator <(Fracao a, Fracao b)
    {
        return a.Numerador * b.Denominador < b.Numerador * a.Denominador;
    }

    public static bool operator >(Fracao a, Fracao b)
    {
        return a.Numerador * b.Denominador > b.Numerador * a.Denominador;
    }

    public override bool Equals(object obj)
    {
        return obj is Fracao outra && this == outra;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Numerador, Denominador);
    }

    public override string ToString()
    {
        return Denominador == 1 ? Numerador.ToString() : $"{Numerador}/{Denominador}";
    }
}

class Program
{
    static void Main()
    {
        var meio = new Fracao(1, 2);
        var terco = new Fracao(1, 3);

        Console.WriteLine($"soma: {meio + terco}");
        Console.WriteLine($"subtracao: {meio - terco}");
        Console.WriteLine($"produto: {meio * terco}");
        Console.WriteLine($"divisao: {meio / terco}");
        Console.WriteLine($"negativo: {-meio}");

        Console.WriteLine($"simplificada: {new Fracao(4, 8)}");
        Console.WriteLine($"inteira: {new Fracao(6, 3)}");
        Console.WriteLine($"sinal: {new Fracao(1, -2)}");
        Console.WriteLine($"zero: {new Fracao(0, 5)}");

        Console.WriteLine($"igual: {new Fracao(1, 2) == new Fracao(2, 4)}");
        Console.WriteLine($"diferente: {meio != terco}");
        Console.WriteLine($"menor: {terco < meio}");
        Console.WriteLine($"maior: {meio > terco}");
        Console.WriteLine($"negativos: {new Fracao(-1, 2) < new Fracao(1, 3)}");

        Console.WriteLine($"equals: {meio.Equals(new Fracao(2, 4))}");
        Console.WriteLine($"equals outro tipo: {meio.Equals("texto")}");

        var conjunto = new HashSet<Fracao>
        {
            new Fracao(1, 2),
            new Fracao(2, 4),
            new Fracao(1, 3),
        };

        Console.WriteLine($"conjunto: {conjunto.Count}");
        Console.WriteLine($"soma acumulada: {meio + terco + new Fracao(1, 6)}");

        try
        {
            var invalida = new Fracao(1, 0);
            Console.WriteLine($"nao deveria: {invalida}");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"erro: {ex.Message}");
        }
    }
}`,
      hints: [
        'Simplificar no construtor é o que faz `1/2 == 2/4` funcionar com uma comparação campo a campo trivial.',
        'O MDC de `0` com qualquer número é o próprio número; trate o caso `a == 0` devolvendo 1 para não dividir por zero.',
        'Mover o sinal para o numerador (`denominador < 0`) garante que `1/-2` e `-1/2` sejam o mesmo valor.',
        '`a < b` vira `a.Num * b.Den < b.Num * a.Den` — válido porque os denominadores já são positivos.',
      ],
      tests: [
        {
          name: 'Aritmética de frações',
          expectedStdout:
            'soma: 5/6\nsubtracao: 1/6\nproduto: 1/6\ndivisao: 3/2\nnegativo: -1/2\n' +
            'simplificada: 1/2\ninteira: 2\nsinal: -1/2\nzero: 0\n' +
            'igual: True\ndiferente: True\nmenor: True\nmaior: True\nnegativos: True\n' +
            'equals: True\nequals outro tipo: False\n' +
            'conjunto: 2\nsoma acumulada: 1\n' +
            'erro: denominador nao pode ser zero',
        },
      ],
    },
  },

  {
    id: 's08c02l07',
    title: 'Indexadores',
    objective: 'Permitir que seu tipo seja acessado com colchetes, como um array ou um dicionário.',
    concept: [
      {
        kind: 'text',
        body:
          'Um **indexador** é uma propriedade acessada com colchetes. Ele é declarado com a palavra `this` no lugar do nome, seguida da lista de índices entre colchetes.',
      },
      {
        kind: 'code',
        code: `class Grade
{
    private readonly int[,] celulas;

    public Grade(int linhas, int colunas)
    {
        celulas = new int[linhas, colunas];
    }

    public int this[int linha, int coluna]
    {
        get => celulas[linha, coluna];
        set => celulas[linha, coluna] = value;
    }
}`,
        caption: 'Dois índices, um `get` e um `set`. A palavra `value` funciona como em qualquer propriedade.',
      },
      {
        kind: 'code',
        code: `var grade = new Grade(2, 3);
grade[0, 0] = 7;
grade[1, 2] = 9;

Console.WriteLine($"{grade[0, 0]} {grade[1, 2]} {grade[0, 1]}");`,
      },
      {
        kind: 'output',
        code: `7 9 0`,
        caption: 'A posição nunca escrita devolve o valor padrão do array — nenhuma inicialização foi necessária.',
      },
      {
        kind: 'text',
        body:
          'O índice não precisa ser um número. Qualquer tipo serve, e um mesmo tipo pode ter **vários indexadores** sobrecarregados, distinguidos pelos tipos dos índices.',
      },
      {
        kind: 'code',
        code: `public int this[string chave]
{
    get
    {
        var partes = chave.Split(',');
        return celulas[int.Parse(partes[0]), int.Parse(partes[1])];
    }
}`,
        caption: 'Um indexador só de leitura: basta omitir o `set`.',
      },
      {
        kind: 'output',
        code: `grade["1,2"]  ->  9`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'É exatamente assim que `Dictionary<K,V>` e `List<T>` funcionam. `dicionario["chave"]` não é sintaxe especial da linguagem — é um indexador com `string` como índice, que qualquer tipo seu pode ter também.',
      },
      {
        kind: 'text',
        body:
          'A decisão de projeto mais importante num indexador é o que fazer com um índice **inválido**, e as coleções do framework dão dois exemplos opostos.',
      },
      {
        kind: 'table',
        headers: ['Coleção', 'Índice ausente no `get`', 'Índice ausente no `set`'],
        rows: [
          ['`List<T>`', '`ArgumentOutOfRangeException`', '`ArgumentOutOfRangeException`'],
          ['`Dictionary<K,V>`', '`KeyNotFoundException`', 'insere a chave'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Essa assimetria do `Dictionary` é a origem de muito bug: `d["x"]` lança se a chave não existe, mas `d["x"] = 1` a cria em silêncio. Ao escrever o seu, decida e **documente** — e ofereça um `TryObter` quando a ausência for esperada.',
      },
      {
        kind: 'compare',
        good: `public int this[int i]
{
    get
    {
        if (i < 0 || i >= tamanho)
            throw new ArgumentOutOfRangeException(nameof(i));
        return dados[i];
    }
}`,
        bad: `public int this[int i]
{
    // devolve 0 para indice invalido:
    // erros passam despercebidos
    get => i < tamanho ? dados[i] : 0;
}`,
        goodLabel: 'Falha alto e cedo',
        badLabel: 'Engole o erro',
      },
      {
        kind: 'text',
        body:
          'Indexadores também aceitam `Index` e `Range`, os tipos por trás de `^1` e `1..3`. Implementá-los faz o seu tipo se comportar como as coleções do framework.',
      },
      {
        kind: 'code',
        code: `public int this[Index indice] => dados[indice.GetOffset(tamanho)];

// permite:
// var ultimo = colecao[^1];`,
        caption: '`^1` significa "um a partir do fim". `GetOffset` traduz isso para um índice comum.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Só adicione um indexador quando o acesso por posição ou chave for **natural** para o tipo. Um `Pedido` com `pedido[3]` é um enigma; `pedido.Itens[3]` é claro.',
      },
    ],
    quiz: [
      {
        id: 's08c02l07q1',
        type: 'single',
        prompt: 'Como se declara um indexador?',
        options: [
          { id: 'a', text: 'Como uma propriedade cujo nome é `this`, seguido dos índices entre colchetes', correct: true },
          { id: 'b', text: 'Com um método chamado `Item`' },
          { id: 'c', text: 'Com o atributo `[Indexer]` sobre a propriedade' },
          { id: 'd', text: 'Sobrecarregando `operator []`' },
        ],
        explanation:
          'A sintaxe é `public T this[TIndice i] { get; set; }`. Não existe `operator []` em C# — a indexação é uma propriedade especial, não um operador.',
      },
      {
        id: 's08c02l07q2',
        type: 'single',
        prompt: 'Por que a assimetria do indexador do `Dictionary` causa bugs?',
        options: [
          { id: 'a', text: 'O `get` lança para chave ausente, mas o `set` a cria em silêncio', correct: true },
          { id: 'b', text: 'Porque o `get` devolve `null` em vez de lançar' },
          { id: 'c', text: 'Porque o `set` lança e o `get` não' },
          { id: 'd', text: 'Não há assimetria: os dois lançam' },
        ],
        explanation:
          'A mesma sintaxe tem duas políticas opostas. Um `d["chave"] = valor` com a chave digitada errada não reclama de nada — apenas cria uma entrada nova.',
      },
      {
        id: 's08c02l07q3',
        type: 'single',
        prompt: 'Pode um tipo ter mais de um indexador?',
        options: [
          { id: 'a', text: 'Sim, desde que difiram nos tipos ou na quantidade de índices', correct: true },
          { id: 'b', text: 'Não: cada tipo tem no máximo um' },
          { id: 'c', text: 'Sim, mas só se um deles for `static`' },
          { id: 'd', text: 'Sim, desde que todos devolvam o mesmo tipo' },
        ],
        explanation:
          'A sobrecarga segue as mesmas regras dos métodos: `this[int]`, `this[string]` e `this[int, int]` podem coexistir e devolver tipos diferentes.',
      },
    ],
    challenge: {
      brief:
        'Implemente um `Tabuleiro` acessível por colchetes de três formas: por linha e coluna, por notação de xadrez (`"a1"`), e por índice linear com suporte a `^1`.',
      requirements: [
        '`this[int linha, int coluna]` tem `get` e `set` e valida os limites com `ArgumentOutOfRangeException`.',
        '`this[string posicao]` aceita notação como `a1`, com letra para a coluna e dígito para a linha (base 1).',
        '`this[Index indice]` percorre o tabuleiro linha por linha e aceita `^1`.',
        'Posição de notação inválida lança `ArgumentException`.',
        '`TryObter(int, int, out char)` devolve `false` em vez de lançar, para quando a ausência é esperada.',
        'O tabuleiro começa preenchido com `.`.',
      ],
      starterCode: `using System;

class Tabuleiro
{
    private readonly char[,] casas;

    public int Linhas { get; }
    public int Colunas { get; }

    public Tabuleiro(int linhas, int colunas)
    {
        Linhas = linhas;
        Colunas = colunas;
        casas = new char[linhas, colunas];

        for (int l = 0; l < linhas; l++)
        {
            for (int c = 0; c < colunas; c++)
            {
                casas[l, c] = '.';
            }
        }
    }

    public char this[int linha, int coluna]
    {
        get
        {
            // TODO: valide e devolva
            return '.';
        }
        set
        {
            // TODO: valide e escreva
        }
    }

    public char this[string posicao]
    {
        get
        {
            // TODO: "a1" -> coluna 0, linha 0
            return '.';
        }
        set
        {
            // TODO
        }
    }

    public char this[Index indice]
    {
        get
        {
            // TODO: percurso linear, linha por linha
            return '.';
        }
    }

    public bool TryObter(int linha, int coluna, out char valor)
    {
        // TODO: false em vez de lancar
        valor = '.';
        return false;
    }

    public string Linha(int linha)
    {
        var buffer = new char[Colunas];

        for (int c = 0; c < Colunas; c++)
        {
            buffer[c] = casas[linha, c];
        }

        return new string(buffer);
    }
}

class Program
{
    static void Main()
    {
        var t = new Tabuleiro(3, 4);

        t[0, 0] = 'T';
        t[2, 3] = 'R';
        Console.WriteLine($"por par: {t[0, 0]} {t[2, 3]} {t[1, 1]}");

        t["b1"] = 'C';
        Console.WriteLine($"por notacao: {t["b1"]} {t[0, 1]}");
        Console.WriteLine($"notacao equivalente: {t["a1"]} {t["d3"]}");

        Console.WriteLine($"linear 0: {t[(Index)0]}");
        Console.WriteLine($"linear 1: {t[(Index)1]}");
        Console.WriteLine($"linear ultimo: {t[^1]}");
        Console.WriteLine($"linear penultimo: {t[^2]}");

        Console.WriteLine($"linha 0: {t.Linha(0)}");
        Console.WriteLine($"linha 2: {t.Linha(2)}");

        Console.WriteLine($"try valido: {t.TryObter(0, 0, out char achado)} {achado}");
        Console.WriteLine($"try invalido: {t.TryObter(9, 9, out char nada)} {nada}");

        try
        {
            var x = t[5, 0];
            Console.WriteLine($"nao deveria: {x}");
        }
        catch (ArgumentOutOfRangeException)
        {
            Console.WriteLine("fora dos limites");
        }

        try
        {
            var y = t["z9"];
            Console.WriteLine($"nao deveria: {y}");
        }
        catch (ArgumentException)
        {
            Console.WriteLine("notacao invalida");
        }
    }
}`,
      solution: `using System;

class Tabuleiro
{
    private readonly char[,] casas;

    public int Linhas { get; }
    public int Colunas { get; }

    public Tabuleiro(int linhas, int colunas)
    {
        Linhas = linhas;
        Colunas = colunas;
        casas = new char[linhas, colunas];

        for (int l = 0; l < linhas; l++)
        {
            for (int c = 0; c < colunas; c++)
            {
                casas[l, c] = '.';
            }
        }
    }

    private void Validar(int linha, int coluna)
    {
        if (linha < 0 || linha >= Linhas)
        {
            throw new ArgumentOutOfRangeException(nameof(linha));
        }

        if (coluna < 0 || coluna >= Colunas)
        {
            throw new ArgumentOutOfRangeException(nameof(coluna));
        }
    }

    public char this[int linha, int coluna]
    {
        get
        {
            Validar(linha, coluna);
            return casas[linha, coluna];
        }
        set
        {
            Validar(linha, coluna);
            casas[linha, coluna] = value;
        }
    }

    private (int Linha, int Coluna) Traduzir(string posicao)
    {
        if (posicao == null || posicao.Length != 2)
        {
            throw new ArgumentException("posicao invalida");
        }

        int coluna = posicao[0] - 'a';
        int linha = posicao[1] - '1';

        if (coluna < 0 || coluna >= Colunas || linha < 0 || linha >= Linhas)
        {
            throw new ArgumentException("posicao invalida");
        }

        return (linha, coluna);
    }

    public char this[string posicao]
    {
        get
        {
            var (linha, coluna) = Traduzir(posicao);
            return casas[linha, coluna];
        }
        set
        {
            var (linha, coluna) = Traduzir(posicao);
            casas[linha, coluna] = value;
        }
    }

    public char this[Index indice]
    {
        get
        {
            int posicao = indice.GetOffset(Linhas * Colunas);

            if (posicao < 0 || posicao >= Linhas * Colunas)
            {
                throw new ArgumentOutOfRangeException(nameof(indice));
            }

            return casas[posicao / Colunas, posicao % Colunas];
        }
    }

    public bool TryObter(int linha, int coluna, out char valor)
    {
        if (linha < 0 || linha >= Linhas || coluna < 0 || coluna >= Colunas)
        {
            valor = '.';
            return false;
        }

        valor = casas[linha, coluna];
        return true;
    }

    public string Linha(int linha)
    {
        var buffer = new char[Colunas];

        for (int c = 0; c < Colunas; c++)
        {
            buffer[c] = casas[linha, c];
        }

        return new string(buffer);
    }
}

class Program
{
    static void Main()
    {
        var t = new Tabuleiro(3, 4);

        t[0, 0] = 'T';
        t[2, 3] = 'R';
        Console.WriteLine($"por par: {t[0, 0]} {t[2, 3]} {t[1, 1]}");

        t["b1"] = 'C';
        Console.WriteLine($"por notacao: {t["b1"]} {t[0, 1]}");
        Console.WriteLine($"notacao equivalente: {t["a1"]} {t["d3"]}");

        Console.WriteLine($"linear 0: {t[(Index)0]}");
        Console.WriteLine($"linear 1: {t[(Index)1]}");
        Console.WriteLine($"linear ultimo: {t[^1]}");
        Console.WriteLine($"linear penultimo: {t[^2]}");

        Console.WriteLine($"linha 0: {t.Linha(0)}");
        Console.WriteLine($"linha 2: {t.Linha(2)}");

        Console.WriteLine($"try valido: {t.TryObter(0, 0, out char achado)} {achado}");
        Console.WriteLine($"try invalido: {t.TryObter(9, 9, out char nada)} {nada}");

        try
        {
            var x = t[5, 0];
            Console.WriteLine($"nao deveria: {x}");
        }
        catch (ArgumentOutOfRangeException)
        {
            Console.WriteLine("fora dos limites");
        }

        try
        {
            var y = t["z9"];
            Console.WriteLine($"nao deveria: {y}");
        }
        catch (ArgumentException)
        {
            Console.WriteLine("notacao invalida");
        }
    }
}`,
      hints: [
        'Extraia a validação para um método privado: os dois acessadores do indexador de par a usam.',
        '`posicao[0] - \'a\'` converte a letra em índice de coluna; `posicao[1] - \'1\'` faz o mesmo com a linha em base 1.',
        '`indice.GetOffset(total)` resolve `^1` para `total - 1`. Depois disso, `posicao / Colunas` dá a linha e `posicao % Colunas` a coluna.',
        '`ArgumentOutOfRangeException` herda de `ArgumentException`, então o `catch` mais específico precisa vir primeiro se os dois aparecerem juntos.',
      ],
      tests: [
        {
          name: 'Tabuleiro indexado',
          expectedStdout:
            'por par: T R .\n' +
            'por notacao: C C\nnotacao equivalente: T R\n' +
            'linear 0: T\nlinear 1: C\nlinear ultimo: R\nlinear penultimo: .\n' +
            'linha 0: TC..\nlinha 2: ...R\n' +
            'try valido: True T\ntry invalido: False .\n' +
            'fora dos limites\nnotacao invalida',
        },
      ],
    },
  },

  {
    id: 's08c02l08',
    title: 'Conversões implícitas e explícitas',
    objective: 'Definir como o seu tipo se converte em outros, e escolher entre conversão automática e obrigatória.',
    concept: [
      {
        kind: 'text',
        body:
          'Um tipo pode declarar como se converte em outro. São dois sabores, e a diferença entre eles é uma decisão de segurança, não de estilo.',
      },
      {
        kind: 'table',
        headers: ['', '`implicit`', '`explicit`'],
        rows: [
          ['sintaxe na chamada', 'nenhuma: acontece sozinha', 'exige `(Tipo)valor`'],
          ['pode perder dados?', 'nunca', 'pode'],
          ['pode lançar?', 'nunca', 'pode'],
          ['exemplo no framework', '`int` → `long`', '`long` → `int`'],
        ],
      },
      {
        kind: 'code',
        code: `public static implicit operator decimal(Dinheiro d)
{
    return d.Valor;
}

public static explicit operator Dinheiro(decimal v)
{
    return new Dinheiro(v, "BRL");
}`,
        caption: 'Sair de `Dinheiro` para `decimal` não perde nada. Entrar precisa inventar a moeda — daí o `explicit`.',
      },
      {
        kind: 'code',
        code: `var a = new Dinheiro(10.5m, "BRL");

decimal comoDecimal = a;          // implicita: sem sintaxe
var deDecimal = (Dinheiro)99.9m;  // explicita: cast obrigatorio`,
      },
      {
        kind: 'output',
        code: `implicito: 10.5
explicito: BRL 99.90`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A regra é uma pergunta só: **essa conversão pode surpreender?** Se pode perder precisão, perder informação ou falhar, ela precisa ser `explicit` — o cast obriga quem chama a assumir a responsabilidade.',
      },
      {
        kind: 'compare',
        good: `// Celsius -> Kelvin: sempre exata
public static implicit operator Kelvin(Celsius c)
    => new Kelvin(c.Graus + 273.15);`,
        bad: `// decimal -> Dinheiro implicito:
// inventa a moeda em silencio
public static implicit operator Dinheiro(decimal v)
    => new Dinheiro(v, "BRL");
// total = pedido + 10; qual moeda?`,
        goodLabel: 'Implícita: conversão total',
        badLabel: 'Implícita: informação inventada',
      },
      {
        kind: 'text',
        body:
          'Conversões implícitas têm um efeito colateral que costuma passar despercebido: elas entram na **resolução de sobrecarga**. Um método que aceita `decimal` passa a aceitar `Dinheiro` também, e o compilador pode escolher uma sobrecarga que você não esperava.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Uma conversão implícita entre dois tipos do seu domínio pode fazer comparações e somas erradas compilarem em silêncio. Se `Dinheiro` converte implicitamente em `decimal`, então `dinheiroEmReais + dinheiroEmDolares` pode virar uma soma de `decimal` — sem reclamar de nada.',
      },
      {
        kind: 'text',
        body:
          'Existe uma alternativa quase sempre melhor: **métodos com nome**. `ParaDecimal()` e `DeDecimal(v)` dizem exatamente o que fazem, aparecem no autocompletar e nunca são aplicados por acidente.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Operador de conversão',
          code: `decimal v = dinheiro;
var d = (Dinheiro)10m;`,
        },
        right: {
          label: 'Métodos com nome',
          code: `decimal v = dinheiro.ParaDecimal();
var d = Dinheiro.DeReais(10m);`,
        },
        note: 'O da direita é mais verboso e mais difícil de usar errado. Para tipos de domínio, costuma ser a escolha certa.',
      },
      {
        kind: 'text',
        body:
          'Quando a conversão pode falhar, o padrão do framework é oferecer as duas portas: a que lança e a que devolve `bool` — exatamente como `Parse` e `TryParse`.',
      },
      {
        kind: 'code',
        code: `public static explicit operator int(Medida m)
{
    if (m.Valor > int.MaxValue)
    {
        throw new OverflowException("medida grande demais");
    }

    return (int)m.Valor;
}

public static bool TryParaInt(Medida m, out int resultado)
{
    if (m.Valor > int.MaxValue)
    {
        resultado = 0;
        return false;
    }

    resultado = (int)m.Valor;
    return true;
}`,
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Na dúvida, comece com `explicit`. Afrouxar depois para `implicit` é uma mudança compatível; apertar de `implicit` para `explicit` quebra todo o código que já dependia da conversão automática.',
      },
    ],
    quiz: [
      {
        id: 's08c02l08q1',
        type: 'single',
        prompt: 'Qual o critério para uma conversão ser `implicit`?',
        options: [
          { id: 'a', text: 'Ela nunca pode perder informação nem falhar', correct: true },
          { id: 'b', text: 'Ela precisa ser entre tipos numéricos' },
          { id: 'c', text: 'Ela precisa ser mais rápida que a explícita' },
          { id: 'd', text: 'Ela precisa estar definida nos dois tipos' },
        ],
        explanation:
          'Uma conversão implícita acontece sem que quem escreve o código a peça. Se ela pode surpreender — perdendo precisão ou lançando —, precisa exigir o cast.',
      },
      {
        id: 's08c02l08q2',
        type: 'single',
        prompt: 'Qual o risco de uma conversão implícita de `Dinheiro` para `decimal`?',
        options: [
          { id: 'a', text: 'Somas entre moedas diferentes passam a compilar como soma de `decimal`', correct: true },
          { id: 'b', text: 'O programa fica mais lento' },
          { id: 'c', text: '`decimal` perde precisão' },
          { id: 'd', text: 'Nenhum: essa conversão é segura' },
        ],
        explanation:
          'A conversão em si não perde dados, mas abre um caminho para o compilador aceitar operações sem sentido no domínio — a proteção que o tipo `Dinheiro` existia para dar.',
      },
      {
        id: 's08c02l08q3',
        type: 'single',
        prompt: 'Por que começar com `explicit` na dúvida?',
        options: [
          { id: 'a', text: 'Afrouxar para `implicit` depois é compatível; o contrário quebra o código existente', correct: true },
          { id: 'b', text: 'Porque `implicit` é mais lenta' },
          { id: 'c', text: 'Porque `explicit` aceita mais tipos de destino' },
          { id: 'd', text: 'Porque `implicit` só funciona com tipos de valor' },
        ],
        explanation:
          'Código escrito contra uma conversão implícita passa a não compilar se ela virar explícita. O caminho inverso não quebra nada — é a mesma lógica de tornar um membro mais público depois.',
      },
    ],
    challenge: {
      brief:
        'Implemente um tipo `Temperatura` com conversões bem escolhidas: implícita quando é exata, explícita quando arredonda ou pode falhar, e um `TryParaInt` para o caso esperado.',
      requirements: [
        'A temperatura é guardada internamente em Celsius, como `double`.',
        '`implicit` para `double` devolve os graus Celsius — conversão exata.',
        '`explicit` para `int` arredonda com `Math.Round` e lança `OverflowException` acima de 1000 graus.',
        '`implicit` de `double` para `Temperatura` **não** deve existir; a criação é por `DeCelsius` e `DeFahrenheit`.',
        '`explicit` de `Temperatura` para `Fahrenheit` produz um tipo próprio, não um número solto.',
        '`TryParaInt` devolve `false` em vez de lançar.',
        '`ToString` imprime com uma casa decimal e o sufixo `C`.',
      ],
      starterCode: `using System;

struct Fahrenheit
{
    public double Graus { get; }

    public Fahrenheit(double graus)
    {
        Graus = graus;
    }

    public override string ToString() => $"{Graus:0.0}F";
}

struct Temperatura
{
    private readonly double celsius;

    private Temperatura(double celsius)
    {
        this.celsius = celsius;
    }

    public double Celsius => celsius;

    public static Temperatura DeCelsius(double graus)
    {
        // TODO
        return default;
    }

    public static Temperatura DeFahrenheit(double graus)
    {
        // TODO: C = (F - 32) * 5 / 9
        return default;
    }

    public static implicit operator double(Temperatura t)
    {
        // TODO
        return 0;
    }

    public static explicit operator int(Temperatura t)
    {
        // TODO: arredonda; OverflowException acima de 1000
        return 0;
    }

    public static explicit operator Fahrenheit(Temperatura t)
    {
        // TODO: F = C * 9 / 5 + 32
        return default;
    }

    public static bool TryParaInt(Temperatura t, out int resultado)
    {
        // TODO
        resultado = 0;
        return false;
    }

    public override string ToString()
    {
        // TODO: "<graus com uma casa>C"
        return "";
    }
}

class Program
{
    static void Main()
    {
        var agua = Temperatura.DeCelsius(100);
        var ambiente = Temperatura.DeCelsius(23.6);
        var gelo = Temperatura.DeFahrenheit(32);

        Console.WriteLine($"agua: {agua}");
        Console.WriteLine($"ambiente: {ambiente}");
        Console.WriteLine($"gelo: {gelo}");

        double comoDouble = ambiente;
        Console.WriteLine($"implicita: {comoDouble}");
        Console.WriteLine($"em conta: {ambiente + 1.4}");

        Console.WriteLine($"explicita int: {(int)ambiente}");
        Console.WriteLine($"explicita int baixa: {(int)Temperatura.DeCelsius(23.4)}");
        Console.WriteLine($"explicita negativa: {(int)Temperatura.DeCelsius(-4.6)}");

        Console.WriteLine($"fahrenheit: {(Fahrenheit)agua}");
        Console.WriteLine($"fahrenheit gelo: {(Fahrenheit)gelo}");

        Console.WriteLine($"try ok: {Temperatura.TryParaInt(ambiente, out int convertida)} {convertida}");
        Console.WriteLine($"try falha: {Temperatura.TryParaInt(Temperatura.DeCelsius(5000), out int nenhuma)} {nenhuma}");

        try
        {
            int demais = (int)Temperatura.DeCelsius(5000);
            Console.WriteLine($"nao deveria: {demais}");
        }
        catch (OverflowException ex)
        {
            Console.WriteLine($"erro: {ex.Message}");
        }
    }
}`,
      solution: `using System;

struct Fahrenheit
{
    public double Graus { get; }

    public Fahrenheit(double graus)
    {
        Graus = graus;
    }

    public override string ToString() => $"{Graus:0.0}F";
}

struct Temperatura
{
    private readonly double celsius;

    private Temperatura(double celsius)
    {
        this.celsius = celsius;
    }

    public double Celsius => celsius;

    public static Temperatura DeCelsius(double graus)
    {
        return new Temperatura(graus);
    }

    public static Temperatura DeFahrenheit(double graus)
    {
        return new Temperatura((graus - 32) * 5 / 9);
    }

    public static implicit operator double(Temperatura t)
    {
        return t.celsius;
    }

    public static explicit operator int(Temperatura t)
    {
        if (t.celsius > 1000)
        {
            throw new OverflowException("temperatura fora da faixa");
        }

        return (int)Math.Round(t.celsius, MidpointRounding.AwayFromZero);
    }

    public static explicit operator Fahrenheit(Temperatura t)
    {
        return new Fahrenheit(t.celsius * 9 / 5 + 32);
    }

    public static bool TryParaInt(Temperatura t, out int resultado)
    {
        if (t.celsius > 1000)
        {
            resultado = 0;
            return false;
        }

        resultado = (int)Math.Round(t.celsius, MidpointRounding.AwayFromZero);
        return true;
    }

    public override string ToString()
    {
        return $"{celsius:0.0}C";
    }
}

class Program
{
    static void Main()
    {
        var agua = Temperatura.DeCelsius(100);
        var ambiente = Temperatura.DeCelsius(23.6);
        var gelo = Temperatura.DeFahrenheit(32);

        Console.WriteLine($"agua: {agua}");
        Console.WriteLine($"ambiente: {ambiente}");
        Console.WriteLine($"gelo: {gelo}");

        double comoDouble = ambiente;
        Console.WriteLine($"implicita: {comoDouble}");
        Console.WriteLine($"em conta: {ambiente + 1.4}");

        Console.WriteLine($"explicita int: {(int)ambiente}");
        Console.WriteLine($"explicita int baixa: {(int)Temperatura.DeCelsius(23.4)}");
        Console.WriteLine($"explicita negativa: {(int)Temperatura.DeCelsius(-4.6)}");

        Console.WriteLine($"fahrenheit: {(Fahrenheit)agua}");
        Console.WriteLine($"fahrenheit gelo: {(Fahrenheit)gelo}");

        Console.WriteLine($"try ok: {Temperatura.TryParaInt(ambiente, out int convertida)} {convertida}");
        Console.WriteLine($"try falha: {Temperatura.TryParaInt(Temperatura.DeCelsius(5000), out int nenhuma)} {nenhuma}");

        try
        {
            int demais = (int)Temperatura.DeCelsius(5000);
            Console.WriteLine($"nao deveria: {demais}");
        }
        catch (OverflowException ex)
        {
            Console.WriteLine($"erro: {ex.Message}");
        }
    }
}`,
      hints: [
        'A conversão implícita para `double` é o que faz `ambiente + 1.4` compilar sem cast nenhum.',
        '`Math.Round(x, MidpointRounding.AwayFromZero)` arredonda `23.6` para 24 e `-4.6` para -5 — diferente do padrão do .NET, que arredonda para o par mais próximo.',
        'O construtor é `private` de propósito: `DeCelsius` e `DeFahrenheit` deixam explícita a unidade de quem chama, o que um construtor `double` nunca faria.',
      ],
      tests: [
        {
          name: 'Conversões de temperatura',
          expectedStdout:
            'agua: 100.0C\nambiente: 23.6C\ngelo: 0.0C\n' +
            'implicita: 23.6\nem conta: 25\n' +
            'explicita int: 24\nexplicita int baixa: 23\nexplicita negativa: -5\n' +
            'fahrenheit: 212.0F\nfahrenheit gelo: 32.0F\n' +
            'try ok: True 24\ntry falha: False 0\n' +
            'erro: temperatura fora da faixa',
        },
      ],
    },
  },

  {
    id: 's08c02l09',
    title: 'Prática: Deconstruct customizado',
    objective: 'Permitir que um objeto seja desmontado em variáveis com a sintaxe de tupla.',
    concept: [
      {
        kind: 'text',
        body:
          'A **desconstrução** desmonta um objeto em variáveis separadas numa linha só. Funciona com tuplas e com `record` desde sempre; qualquer classe sua pode ganhá-la escrevendo um método `Deconstruct`.',
      },
      {
        kind: 'code',
        code: `class Endereco
{
    public string Rua { get; set; } = "";
    public int Numero { get; set; }
    public string Cidade { get; set; } = "";

    public void Deconstruct(out string rua, out int numero)
    {
        rua = Rua;
        numero = Numero;
    }
}`,
        caption: 'As regras são fixas: nome `Deconstruct`, retorno `void`, e todos os parâmetros com `out`.',
      },
      {
        kind: 'code',
        code: `var e = new Endereco { Rua = "Rua A", Numero = 100, Cidade = "Recife" };

var (rua, numero) = e;
Console.WriteLine($"{rua} {numero}");`,
      },
      {
        kind: 'output',
        code: `Rua A 100`,
      },
      {
        kind: 'text',
        body:
          'Um tipo pode ter **vários** `Deconstruct`, distinguidos pela quantidade de parâmetros. O compilador escolhe pelo número de variáveis do lado esquerdo.',
      },
      {
        kind: 'code',
        code: `public void Deconstruct(out string rua, out int numero, out string cidade)
{
    rua = Rua;
    numero = Numero;
    cidade = Cidade;
}

var (r, n) = e;        // usa a versao de 2
var (r2, n2, c2) = e;  // usa a de 3`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Duas sobrecargas com a **mesma quantidade** de parâmetros tornam a desconstrução ambígua e o código não compila. É a aridade, não os tipos, que distingue.',
      },
      {
        kind: 'text',
        body:
          'Partes que não interessam podem ser jogadas fora com o **descarte** `_`. Ele não cria variável e deixa explícito que aquele valor foi ignorado de propósito.',
      },
      {
        kind: 'code',
        code: `(string _, int apenasNumero) = e;
Console.WriteLine(apenasNumero);`,
      },
      {
        kind: 'output',
        code: `100`,
      },
      {
        kind: 'text',
        body:
          'O mais interessante: `Deconstruct` **também funciona como método de extensão**. Isso dá desconstrução a tipos do framework que não a têm.',
      },
      {
        kind: 'code',
        code: `static class Extensoes
{
    public static void Deconstruct(this DateTime data, out int ano, out int mes, out int dia)
    {
        ano = data.Year;
        mes = data.Month;
        dia = data.Day;
    }
}

var (ano, mes, dia) = new DateTime(2024, 7, 15);
Console.WriteLine($"{ano}-{mes}-{dia}");`,
      },
      {
        kind: 'output',
        code: `2024-7-15`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'É por isso que `foreach (var (chave, valor) in dicionario)` funciona: `KeyValuePair<K,V>` tem um `Deconstruct`. Sem ele, seria preciso escrever `par.Key` e `par.Value` a cada volta.',
      },
      {
        kind: 'text',
        body:
          'A desconstrução também alimenta os **padrões posicionais** do pattern matching — assunto do próximo capítulo. Um tipo com `Deconstruct` pode ser testado por forma, e não só por valor.',
      },
      {
        kind: 'code',
        code: `string classificar = endereco switch
{
    (_, 0) => "sem numero",
    (_, < 100) => "numero baixo",
    _ => "normal",
};`,
        caption: 'O padrão `(_, 0)` só existe porque `Endereco` tem um `Deconstruct` de dois parâmetros.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Adicione `Deconstruct` quando o tipo é essencialmente um **agregado de valores** — coordenadas, intervalos, medidas. Para objetos com comportamento e ciclo de vida, desmontar em variáveis soltas raramente ajuda.',
      },
    ],
    quiz: [
      {
        id: 's08c02l09q1',
        type: 'multiple',
        prompt: 'Quais são os requisitos de um método `Deconstruct`?',
        options: [
          { id: 'a', text: 'Chamar-se exatamente `Deconstruct`', correct: true },
          { id: 'b', text: 'Devolver `void`', correct: true },
          { id: 'c', text: 'Ter todos os parâmetros marcados com `out`', correct: true },
          { id: 'd', text: 'Ser `static`' },
        ],
        explanation:
          'Como método de instância ele não é `static`. Como método de **extensão**, é `static` e leva `this` no primeiro parâmetro — as duas formas funcionam.',
      },
      {
        id: 's08c02l09q2',
        type: 'single',
        prompt: 'Como o compilador escolhe entre duas sobrecargas de `Deconstruct`?',
        options: [
          { id: 'a', text: 'Pela quantidade de variáveis do lado esquerdo da atribuição', correct: true },
          { id: 'b', text: 'Pelos tipos das variáveis' },
          { id: 'c', text: 'Pela ordem de declaração na classe' },
          { id: 'd', text: 'Sempre usa a primeira declarada' },
        ],
        explanation:
          'É a aridade que decide. Duas sobrecargas com a mesma quantidade de parâmetros — mesmo com tipos diferentes — deixam a desconstrução ambígua.',
      },
      {
        id: 's08c02l09q3',
        type: 'single',
        prompt: 'Por que `foreach (var (chave, valor) in dicionario)` funciona?',
        options: [
          { id: 'a', text: 'Porque `KeyValuePair<K,V>` tem um método `Deconstruct`', correct: true },
          { id: 'b', text: 'Porque `Dictionary` implementa `IEnumerable<(K, V)>`' },
          { id: 'c', text: 'Porque o compilador trata dicionários de forma especial' },
          { id: 'd', text: 'Porque tuplas e `KeyValuePair` são o mesmo tipo' },
        ],
        explanation:
          'O `foreach` produz `KeyValuePair<K,V>` e a desconstrução acontece na atribuição. É o mesmo mecanismo que qualquer tipo seu pode adotar.',
      },
    ],
    challenge: {
      brief:
        'Dê desconstrução a três tipos: um seu com duas aridades, um do framework via extensão, e um par chave-valor genérico — e use o descarte para ignorar partes.',
      requirements: [
        '`Coordenada` tem `Deconstruct` de 2 (`latitude`, `longitude`) e de 3 (com `altitude`).',
        '`Intervalo` tem `Deconstruct` de 2 (`inicio`, `fim`) e um de 3 que inclui a duração calculada.',
        'Uma extensão dá `Deconstruct` a `TimeSpan`, produzindo horas, minutos e segundos.',
        'Uma extensão genérica dá `Deconstruct` a `Registro<TChave, TValor>`.',
        'Demonstre o descarte `_` ignorando ao menos um componente.',
        'Demonstre a desconstrução dentro de um `foreach`.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Coordenada
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public double Altitude { get; set; }

    public void Deconstruct(out double latitude, out double longitude)
    {
        // TODO
        latitude = 0;
        longitude = 0;
    }

    public void Deconstruct(out double latitude, out double longitude, out double altitude)
    {
        // TODO
        latitude = 0;
        longitude = 0;
        altitude = 0;
    }
}

class Intervalo
{
    public int Inicio { get; set; }
    public int Fim { get; set; }

    public void Deconstruct(out int inicio, out int fim)
    {
        // TODO
        inicio = 0;
        fim = 0;
    }

    public void Deconstruct(out int inicio, out int fim, out int duracao)
    {
        // TODO: duracao = fim - inicio
        inicio = 0;
        fim = 0;
        duracao = 0;
    }
}

class Registro<TChave, TValor>
{
    public TChave Chave { get; set; }
    public TValor Valor { get; set; }
}

static class Extensoes
{
    public static void Deconstruct(this TimeSpan tempo, out int horas, out int minutos, out int segundos)
    {
        // TODO
        horas = 0;
        minutos = 0;
        segundos = 0;
    }

    public static void Deconstruct<TChave, TValor>(
        this Registro<TChave, TValor> registro, out TChave chave, out TValor valor)
    {
        // TODO
        chave = default;
        valor = default;
    }
}

class Program
{
    static void Main()
    {
        var ponto = new Coordenada { Latitude = -8.05, Longitude = -34.9, Altitude = 12.5 };

        var (lat, lon) = ponto;
        Console.WriteLine($"dois: {lat} {lon}");

        var (lat2, lon2, alt) = ponto;
        Console.WriteLine($"tres: {lat2} {lon2} {alt}");

        (double _, double apenasLon) = ponto;
        Console.WriteLine($"descarte: {apenasLon}");

        var janela = new Intervalo { Inicio = 9, Fim = 17 };

        var (inicio, fim) = janela;
        Console.WriteLine($"intervalo: {inicio} a {fim}");

        var (i2, f2, duracao) = janela;
        Console.WriteLine($"com duracao: {i2} a {f2} = {duracao}h");

        var tempo = new TimeSpan(3, 25, 40);
        var (h, m, s) = tempo;
        Console.WriteLine($"tempo: {h}h{m}m{s}s");

        var (_, minutos, _) = tempo;
        Console.WriteLine($"so minutos: {minutos}");

        var registro = new Registro<string, int> { Chave = "idade", Valor = 30 };
        var (chave, valor) = registro;
        Console.WriteLine($"registro: {chave}={valor}");

        var registros = new List<Registro<string, double>>
        {
            new Registro<string, double> { Chave = "altura", Valor = 1.75 },
            new Registro<string, double> { Chave = "peso", Valor = 70.5 },
        };

        foreach (var (nome, medida) in registros)
        {
            Console.WriteLine($"medida: {nome}={medida}");
        }

        var mapa = new Dictionary<string, int> { ["a"] = 1, ["b"] = 2 };

        foreach (var (k, v) in mapa)
        {
            Console.WriteLine($"par: {k}={v}");
        }
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Coordenada
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public double Altitude { get; set; }

    public void Deconstruct(out double latitude, out double longitude)
    {
        latitude = Latitude;
        longitude = Longitude;
    }

    public void Deconstruct(out double latitude, out double longitude, out double altitude)
    {
        latitude = Latitude;
        longitude = Longitude;
        altitude = Altitude;
    }
}

class Intervalo
{
    public int Inicio { get; set; }
    public int Fim { get; set; }

    public void Deconstruct(out int inicio, out int fim)
    {
        inicio = Inicio;
        fim = Fim;
    }

    public void Deconstruct(out int inicio, out int fim, out int duracao)
    {
        inicio = Inicio;
        fim = Fim;
        duracao = Fim - Inicio;
    }
}

class Registro<TChave, TValor>
{
    public TChave Chave { get; set; }
    public TValor Valor { get; set; }
}

static class Extensoes
{
    public static void Deconstruct(this TimeSpan tempo, out int horas, out int minutos, out int segundos)
    {
        horas = tempo.Hours;
        minutos = tempo.Minutes;
        segundos = tempo.Seconds;
    }

    public static void Deconstruct<TChave, TValor>(
        this Registro<TChave, TValor> registro, out TChave chave, out TValor valor)
    {
        chave = registro.Chave;
        valor = registro.Valor;
    }
}

class Program
{
    static void Main()
    {
        var ponto = new Coordenada { Latitude = -8.05, Longitude = -34.9, Altitude = 12.5 };

        var (lat, lon) = ponto;
        Console.WriteLine($"dois: {lat} {lon}");

        var (lat2, lon2, alt) = ponto;
        Console.WriteLine($"tres: {lat2} {lon2} {alt}");

        (double _, double apenasLon) = ponto;
        Console.WriteLine($"descarte: {apenasLon}");

        var janela = new Intervalo { Inicio = 9, Fim = 17 };

        var (inicio, fim) = janela;
        Console.WriteLine($"intervalo: {inicio} a {fim}");

        var (i2, f2, duracao) = janela;
        Console.WriteLine($"com duracao: {i2} a {f2} = {duracao}h");

        var tempo = new TimeSpan(3, 25, 40);
        var (h, m, s) = tempo;
        Console.WriteLine($"tempo: {h}h{m}m{s}s");

        var (_, minutos, _) = tempo;
        Console.WriteLine($"so minutos: {minutos}");

        var registro = new Registro<string, int> { Chave = "idade", Valor = 30 };
        var (chave, valor) = registro;
        Console.WriteLine($"registro: {chave}={valor}");

        var registros = new List<Registro<string, double>>
        {
            new Registro<string, double> { Chave = "altura", Valor = 1.75 },
            new Registro<string, double> { Chave = "peso", Valor = 70.5 },
        };

        foreach (var (nome, medida) in registros)
        {
            Console.WriteLine($"medida: {nome}={medida}");
        }

        var mapa = new Dictionary<string, int> { ["a"] = 1, ["b"] = 2 };

        foreach (var (k, v) in mapa)
        {
            Console.WriteLine($"par: {k}={v}");
        }
    }
}`,
      hints: [
        'Cada `Deconstruct` só atribui os parâmetros `out`. O compilador exige que todos recebam valor antes do retorno.',
        '`TimeSpan.Hours` devolve a componente de horas (0 a 23), diferente de `TotalHours`, que devolve o tempo inteiro em horas fracionárias.',
        'A extensão genérica sobre `Registro<TChave, TValor>` precisa repetir os dois parâmetros de tipo na assinatura do método.',
        'O `foreach` sobre `List<Registro<...>>` usa a extensão; o `foreach` sobre `Dictionary` usa o `Deconstruct` que `KeyValuePair` já tem.',
      ],
      tests: [
        {
          name: 'Desconstrução customizada',
          expectedStdout:
            'dois: -8.05 -34.9\ntres: -8.05 -34.9 12.5\ndescarte: -34.9\n' +
            'intervalo: 9 a 17\ncom duracao: 9 a 17 = 8h\n' +
            'tempo: 3h25m40s\nso minutos: 25\n' +
            'registro: idade=30\n' +
            'medida: altura=1.75\nmedida: peso=70.5\n' +
            'par: a=1\npar: b=2',
        },
      ],
    },
  },

  {
    id: 's08c02l10',
    title: 'Checkpoint: extensões',
    objective: 'Reunir extensões, operadores, indexadores, conversões e desconstrução num tipo coeso.',
    concept: [
      {
        kind: 'text',
        body:
          'Este capítulo foi sobre uma pergunta só: **como um tipo se comporta como se fosse parte da linguagem?** Cada recurso responde a uma parte dela.',
      },
      {
        kind: 'table',
        headers: ['Recurso', 'Dá ao tipo'],
        rows: [
          ['método de extensão', 'verbos novos em tipos que você não controla'],
          ['extensão de interface', 'comportamento padrão para todas as implementações'],
          ['API fluente', 'configuração encadeada, com um passo que fecha a cadeia'],
          ['sobrecarga de operador', 'aritmética e comparação legíveis'],
          ['indexador', 'acesso com colchetes, por posição ou por chave'],
          ['conversão', 'trânsito para outros tipos, automático ou obrigatório'],
          ['`Deconstruct`', 'desmontagem em variáveis e padrões posicionais'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Todos eles têm a mesma armadilha: **fazem o código parecer mais simples do que é**. Um `+` esconde uma validação de moeda; um indexador esconde uma exceção; uma conversão implícita esconde uma escolha. O poder vem junto com a responsabilidade de não surpreender.',
      },
      {
        kind: 'text',
        body: 'Vale fixar as decisões que este capítulo pediu, porque elas se repetem em todo tipo bem escrito:',
      },
      {
        kind: 'table',
        headers: ['Decisão', 'Regra prática'],
        rows: [
          ['extensão ou método?', 'o tipo é seu? método. não é? extensão'],
          ['`implicit` ou `explicit`?', 'pode perder dados ou falhar? `explicit`'],
          ['`==` sozinho?', 'nunca: sempre com `!=`, `Equals` e `GetHashCode`'],
          ['indexador inválido', 'lançar, e oferecer um `Try...` para o caso esperado'],
          ['cadeia fluente', 'o método que finaliza tem tipo de retorno diferente'],
          ['extensão sobre nulo', 'decidir a política e deixá-la explícita'],
        ],
      },
      {
        kind: 'compare',
        good: `// cada peca justificada
struct Medida
{
    public static Medida operator +(Medida a, Medida b);
    public static explicit operator int(Medida m);
    public void Deconstruct(out double v, out string u);
}`,
        bad: `// tudo porque da
struct Medida
{
    public static implicit operator int(Medida m);
    public static implicit operator string(Medida m);
    public char this[int i] => ToString()[i];
}`,
        goodLabel: 'Superfície pensada',
        badLabel: 'Superfície acidental',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Duas conversões implícitas para tipos diferentes é receita para ambiguidade de sobrecarga: o compilador passa a não saber qual caminho seguir, e o erro aparece longe da declaração.',
      },
      {
        kind: 'text',
        body:
          'O desafio final junta tudo num tipo de domínio: uma `Playlist` que se comporta como coleção, um `Duracao` que se comporta como número, e extensões que dão vocabulário a ambos.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Ao revisar um tipo com essa superfície toda, leia o código de quem o **usa**, não o da declaração. Se a linha de uso é óbvia para quem nunca viu o tipo, as escolhas estão certas.',
      },
    ],
    quiz: [
      {
        id: 's08c02l10q1',
        type: 'single',
        prompt: 'Qual é o risco comum a operadores, indexadores e conversões implícitas?',
        options: [
          { id: 'a', text: 'Escondem comportamento por trás de sintaxe que parece trivial', correct: true },
          { id: 'b', text: 'São mais lentos que métodos comuns' },
          { id: 'c', text: 'Não funcionam com genéricos' },
          { id: 'd', text: 'Impedem o uso de `null`' },
        ],
        explanation:
          'Um `a + b`, um `c[0]` ou uma atribuição sem cast parecem operações sem custo e sem risco. Quando escondem validação, exceção ou perda de informação, o leitor não tem como suspeitar.',
      },
      {
        id: 's08c02l10q2',
        type: 'multiple',
        prompt: 'Quais destas escolhas são recomendadas neste capítulo?',
        options: [
          { id: 'a', text: 'Definir `==` junto com `!=`, `Equals` e `GetHashCode`', correct: true },
          { id: 'b', text: 'Usar `explicit` quando a conversão pode falhar', correct: true },
          { id: 'c', text: 'Um indexador que lança, acompanhado de um `Try...`', correct: true },
          { id: 'd', text: 'Duas conversões implícitas para tipos diferentes' },
        ],
        explanation:
          'As três primeiras evitam incoerências. A última cria ambiguidade de sobrecarga, com erros que aparecem em lugares distantes da declaração.',
      },
      {
        id: 's08c02l10q3',
        type: 'single',
        prompt: 'Qual o melhor teste para saber se a superfície de um tipo está bem desenhada?',
        options: [
          { id: 'a', text: 'Ler o código que usa o tipo e verificar se cada linha é óbvia', correct: true },
          { id: 'b', text: 'Contar quantos operadores foram sobrecarregados' },
          { id: 'c', text: 'Verificar se o tipo tem indexador e conversões' },
          { id: 'd', text: 'Medir o tempo de execução das operações' },
        ],
        explanation:
          'A declaração sempre faz sentido para quem a escreveu. O teste real é o código de chamada: se ele precisa de comentário para ser entendido, alguma escolha foi longe demais.',
      },
    ],
    challenge: {
      brief:
        'Feche o capítulo com uma `Playlist` que junta tudo: `Duracao` com operadores e conversões, indexadores por posição e por título, `Deconstruct`, e extensões que dão vocabulário à coleção.',
      requirements: [
        '`Duracao` guarda segundos, soma com `+`, compara com `==`/`!=`/`<`/`>` e tem `Equals`/`GetHashCode` coerentes.',
        '`Duracao` converte **implicitamente** para `int` (segundos, sem perda) e **explicitamente** de `int`.',
        '`Duracao.ToString` imprime `m:ss`.',
        '`Playlist` tem indexador por posição (`int`) e por título (`string`), o segundo lançando `KeyNotFoundException`.',
        '`Playlist` tem `Deconstruct(out int faixas, out Duracao total)`.',
        'Extensões sobre `IEnumerable<Faixa>`: `DuracaoTotal`, `MaisLonga` e `Titulos`.',
        'Uma cadeia fluente `Adicionar(...).Adicionar(...)` que devolve a própria playlist.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

struct Duracao
{
    public int Segundos { get; }

    public Duracao(int segundos)
    {
        Segundos = segundos;
    }

    public static Duracao operator +(Duracao a, Duracao b)
    {
        // TODO
        return a;
    }

    public static bool operator ==(Duracao a, Duracao b)
    {
        // TODO
        return false;
    }

    public static bool operator !=(Duracao a, Duracao b)
    {
        // TODO
        return false;
    }

    public static bool operator <(Duracao a, Duracao b)
    {
        // TODO
        return false;
    }

    public static bool operator >(Duracao a, Duracao b)
    {
        // TODO
        return false;
    }

    public static implicit operator int(Duracao d)
    {
        // TODO
        return 0;
    }

    public static explicit operator Duracao(int segundos)
    {
        // TODO
        return default;
    }

    public override bool Equals(object obj)
    {
        // TODO
        return false;
    }

    public override int GetHashCode()
    {
        // TODO
        return 0;
    }

    public override string ToString()
    {
        // TODO: "m:ss"
        return "";
    }
}

class Faixa
{
    public string Titulo { get; set; } = "";
    public Duracao Duracao { get; set; }

    public void Deconstruct(out string titulo, out Duracao duracao)
    {
        // TODO
        titulo = "";
        duracao = default;
    }
}

class Playlist
{
    private readonly List<Faixa> faixas = new();

    public int Contagem => faixas.Count;

    public Playlist Adicionar(string titulo, int segundos)
    {
        // TODO: cadeia fluente
        return this;
    }

    public Faixa this[int posicao]
    {
        // TODO: ArgumentOutOfRangeException fora dos limites
        get => null;
    }

    public Faixa this[string titulo]
    {
        // TODO: KeyNotFoundException quando nao encontra
        get => null;
    }

    public void Deconstruct(out int totalDeFaixas, out Duracao total)
    {
        // TODO
        totalDeFaixas = 0;
        total = default;
    }

    public IEnumerable<Faixa> Faixas => faixas;
}

static class Extensoes
{
    public static Duracao DuracaoTotal(this IEnumerable<Faixa> faixas)
    {
        // TODO
        return default;
    }

    public static Faixa MaisLonga(this IEnumerable<Faixa> faixas)
    {
        // TODO: null quando vazio
        return null;
    }

    public static string Titulos(this IEnumerable<Faixa> faixas)
    {
        // TODO: titulos separados por ", "
        return "";
    }
}

class Program
{
    static void Main()
    {
        var lista = new Playlist()
            .Adicionar("Abertura", 95)
            .Adicionar("Tema", 245)
            .Adicionar("Encerramento", 130);

        Console.WriteLine($"contagem: {lista.Contagem}");
        Console.WriteLine($"por posicao: {lista[1].Titulo}");
        Console.WriteLine($"por titulo: {lista["Tema"].Duracao}");

        var (faixas, total) = lista;
        Console.WriteLine($"desconstruido: {faixas} faixas, {total}");

        Console.WriteLine($"total: {lista.Faixas.DuracaoTotal()}");
        Console.WriteLine($"mais longa: {lista.Faixas.MaisLonga().Titulo}");
        Console.WriteLine($"titulos: {lista.Faixas.Titulos()}");

        var (titulo, duracao) = lista[0];
        Console.WriteLine($"faixa: {titulo} {duracao}");

        var a = new Duracao(95);
        var b = new Duracao(130);

        Console.WriteLine($"soma: {a + b}");
        Console.WriteLine($"igual: {a == new Duracao(95)}");
        Console.WriteLine($"menor: {a < b}");
        Console.WriteLine($"implicito: {(int)a + 5}");
        Console.WriteLine($"explicito: {(Duracao)3661}");

        var conjunto = new HashSet<Duracao> { a, new Duracao(95), b };
        Console.WriteLine($"conjunto: {conjunto.Count}");

        var vazia = new Playlist();
        Console.WriteLine($"vazia total: {vazia.Faixas.DuracaoTotal()}");
        Console.WriteLine($"vazia mais longa: {vazia.Faixas.MaisLonga() == null}");
        Console.WriteLine($"vazia titulos: [{vazia.Faixas.Titulos()}]");

        try
        {
            var x = lista["Inexistente"];
            Console.WriteLine($"nao deveria: {x.Titulo}");
        }
        catch (KeyNotFoundException)
        {
            Console.WriteLine("titulo ausente");
        }

        try
        {
            var y = lista[9];
            Console.WriteLine($"nao deveria: {y.Titulo}");
        }
        catch (ArgumentOutOfRangeException)
        {
            Console.WriteLine("posicao invalida");
        }
    }
}`,
      solution: `using System;
using System.Collections.Generic;

struct Duracao
{
    public int Segundos { get; }

    public Duracao(int segundos)
    {
        Segundos = segundos;
    }

    public static Duracao operator +(Duracao a, Duracao b)
    {
        return new Duracao(a.Segundos + b.Segundos);
    }

    public static bool operator ==(Duracao a, Duracao b)
    {
        return a.Segundos == b.Segundos;
    }

    public static bool operator !=(Duracao a, Duracao b)
    {
        return !(a == b);
    }

    public static bool operator <(Duracao a, Duracao b)
    {
        return a.Segundos < b.Segundos;
    }

    public static bool operator >(Duracao a, Duracao b)
    {
        return a.Segundos > b.Segundos;
    }

    public static implicit operator int(Duracao d)
    {
        return d.Segundos;
    }

    public static explicit operator Duracao(int segundos)
    {
        return new Duracao(segundos);
    }

    public override bool Equals(object obj)
    {
        return obj is Duracao outra && this == outra;
    }

    public override int GetHashCode()
    {
        return Segundos.GetHashCode();
    }

    public override string ToString()
    {
        return $"{Segundos / 60}:{Segundos % 60:00}";
    }
}

class Faixa
{
    public string Titulo { get; set; } = "";
    public Duracao Duracao { get; set; }

    public void Deconstruct(out string titulo, out Duracao duracao)
    {
        titulo = Titulo;
        duracao = Duracao;
    }
}

class Playlist
{
    private readonly List<Faixa> faixas = new();

    public int Contagem => faixas.Count;

    public Playlist Adicionar(string titulo, int segundos)
    {
        faixas.Add(new Faixa { Titulo = titulo, Duracao = new Duracao(segundos) });
        return this;
    }

    public Faixa this[int posicao]
    {
        get
        {
            if (posicao < 0 || posicao >= faixas.Count)
            {
                throw new ArgumentOutOfRangeException(nameof(posicao));
            }

            return faixas[posicao];
        }
    }

    public Faixa this[string titulo]
    {
        get
        {
            foreach (Faixa faixa in faixas)
            {
                if (faixa.Titulo == titulo)
                {
                    return faixa;
                }
            }

            throw new KeyNotFoundException($"faixa {titulo} nao encontrada");
        }
    }

    public void Deconstruct(out int totalDeFaixas, out Duracao total)
    {
        totalDeFaixas = faixas.Count;
        total = faixas.DuracaoTotal();
    }

    public IEnumerable<Faixa> Faixas => faixas;
}

static class Extensoes
{
    public static Duracao DuracaoTotal(this IEnumerable<Faixa> faixas)
    {
        var total = new Duracao(0);

        foreach (Faixa faixa in faixas)
        {
            total += faixa.Duracao;
        }

        return total;
    }

    public static Faixa MaisLonga(this IEnumerable<Faixa> faixas)
    {
        Faixa melhor = null;

        foreach (Faixa faixa in faixas)
        {
            if (melhor == null || faixa.Duracao > melhor.Duracao)
            {
                melhor = faixa;
            }
        }

        return melhor;
    }

    public static string Titulos(this IEnumerable<Faixa> faixas)
    {
        var nomes = new List<string>();

        foreach (Faixa faixa in faixas)
        {
            nomes.Add(faixa.Titulo);
        }

        return string.Join(", ", nomes);
    }
}

class Program
{
    static void Main()
    {
        var lista = new Playlist()
            .Adicionar("Abertura", 95)
            .Adicionar("Tema", 245)
            .Adicionar("Encerramento", 130);

        Console.WriteLine($"contagem: {lista.Contagem}");
        Console.WriteLine($"por posicao: {lista[1].Titulo}");
        Console.WriteLine($"por titulo: {lista["Tema"].Duracao}");

        var (faixas, total) = lista;
        Console.WriteLine($"desconstruido: {faixas} faixas, {total}");

        Console.WriteLine($"total: {lista.Faixas.DuracaoTotal()}");
        Console.WriteLine($"mais longa: {lista.Faixas.MaisLonga().Titulo}");
        Console.WriteLine($"titulos: {lista.Faixas.Titulos()}");

        var (titulo, duracao) = lista[0];
        Console.WriteLine($"faixa: {titulo} {duracao}");

        var a = new Duracao(95);
        var b = new Duracao(130);

        Console.WriteLine($"soma: {a + b}");
        Console.WriteLine($"igual: {a == new Duracao(95)}");
        Console.WriteLine($"menor: {a < b}");
        Console.WriteLine($"implicito: {(int)a + 5}");
        Console.WriteLine($"explicito: {(Duracao)3661}");

        var conjunto = new HashSet<Duracao> { a, new Duracao(95), b };
        Console.WriteLine($"conjunto: {conjunto.Count}");

        var vazia = new Playlist();
        Console.WriteLine($"vazia total: {vazia.Faixas.DuracaoTotal()}");
        Console.WriteLine($"vazia mais longa: {vazia.Faixas.MaisLonga() == null}");
        Console.WriteLine($"vazia titulos: [{vazia.Faixas.Titulos()}]");

        try
        {
            var x = lista["Inexistente"];
            Console.WriteLine($"nao deveria: {x.Titulo}");
        }
        catch (KeyNotFoundException)
        {
            Console.WriteLine("titulo ausente");
        }

        try
        {
            var y = lista[9];
            Console.WriteLine($"nao deveria: {y.Titulo}");
        }
        catch (ArgumentOutOfRangeException)
        {
            Console.WriteLine("posicao invalida");
        }
    }
}`,
      hints: [
        '`$"{Segundos / 60}:{Segundos % 60:00}"` produz `1:35` — o `:00` garante os dois dígitos dos segundos.',
        '`Deconstruct` da playlist pode chamar a própria extensão `DuracaoTotal()` sobre a lista interna.',
        '`Adicionar` devolve `this` para permitir a cadeia; note que ele recebe `int` e constrói a `Duracao` por dentro.',
        'A conversão implícita para `int` é o que faz `(int)a + 5` funcionar — e também faria `a + 5` compilar, o que é justamente o risco discutido na lição 8.',
      ],
      tests: [
        {
          name: 'Playlist completa',
          expectedStdout:
            'contagem: 3\npor posicao: Tema\npor titulo: 4:05\n' +
            'desconstruido: 3 faixas, 7:50\n' +
            'total: 7:50\nmais longa: Tema\ntitulos: Abertura, Tema, Encerramento\n' +
            'faixa: Abertura 1:35\n' +
            'soma: 3:45\nigual: True\nmenor: True\nimplicito: 100\nexplicito: 61:01\n' +
            'conjunto: 2\n' +
            'vazia total: 0:00\nvazia mais longa: True\nvazia titulos: []\n' +
            'titulo ausente\nposicao invalida',
        },
      ],
    },
  },
]
