import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's08c06l01',
    title: 'Stack e heap',
    objective: 'Entender onde cada valor vive e por que isso muda o comportamento de cópia e atribuição.',
    concept: [
      {
        kind: 'text',
        body:
          'O .NET usa duas áreas de memória com regras muito diferentes. Saber qual é qual explica quase todo comportamento surpreendente de cópia e igualdade.',
      },
      {
        kind: 'table',
        headers: ['', 'Pilha (stack)', 'Monte (heap)'],
        rows: [
          ['guarda', 'variáveis locais e parâmetros', 'objetos'],
          ['libera', 'automático, ao sair do método', 'coletor de lixo'],
          ['custo de alocar', 'praticamente zero', 'baixo, mas não zero'],
          ['tamanho', 'pequeno (~1 MB por thread)', 'limitado pela memória'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A regra que costuma ser ensinada — "tipos de valor vão na pilha, tipos de referência no monte" — é uma **simplificação**. Um `int` que é campo de uma classe vive no monte, dentro do objeto. O que decide é **onde o valor está declarado**, não só o tipo dele.',
      },
      {
        kind: 'text',
        body:
          'O que muda de verdade no dia a dia é a **semântica de atribuição**. Tipos de valor copiam o conteúdo; tipos de referência copiam o endereço.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'struct: cópia',
          code: `var a = new PontoValor { X = 1 };
var b = a;
b.X = 7;

// a.X continua 1`,
        },
        right: {
          label: 'class: mesmo objeto',
          code: `var a = new PontoRef { X = 1 };
var b = a;
b.X = 7;

// a.X agora é 7`,
        },
      },
      {
        kind: 'output',
        code: `copia independente: 1 7
alias compartilha: 7 7`,
        caption: 'Duas variáveis, dois comportamentos opostos. A diferença é `struct` contra `class`.',
      },
      {
        kind: 'text',
        body:
          'A mesma regra vale para **parâmetros**. Passar um `struct` para um método entrega uma cópia; passar uma `class` entrega o endereço do mesmo objeto.',
      },
      {
        kind: 'code',
        code: `static void MudarValor(PontoValor p) => p.X = 99;
static void MudarRef(PontoRef p) => p.X = 99;

MudarValor(pv);   // pv.X continua 1
MudarRef(pr);     // pr.X vira 99`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Modificar um `struct` recebido por parâmetro é quase sempre um bug: a alteração se perde ao voltar. O compilador não avisa. Quando a mudança precisa sair, use `ref`.',
      },
      {
        kind: 'code',
        code: `static void MudarComRef(ref PontoValor p) => p.X = 99;

MudarComRef(ref pv);   // agora pv.X vira 99`,
        caption: '`ref` passa o endereço da variável, e não uma cópia do valor.',
      },
      {
        kind: 'text',
        body:
          'Um objeto no monte carrega, além dos campos, um **cabeçalho** com informação de tipo e sincronização. Isso significa que um objeto minúsculo custa mais memória do que a soma dos seus campos.',
      },
      {
        kind: 'compare',
        good: `// struct: so os campos
struct Ponto { public int X, Y; }
// 8 bytes por instancia`,
        bad: `// class: campos + cabecalho + referencia
class Ponto { public int X, Y; }
// ~32 bytes por instancia`,
        goodLabel: 'Struct pequeno em array',
        badLabel: 'Classe pequena em array',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Um `Ponto[]` de um milhão de elementos com `struct` é um bloco contíguo de 8 MB. Com `class`, são um milhão de objetos espalhados pelo monte mais um array de referências — muito mais memória e muito pior para o cache do processador.',
      },
      {
        kind: 'text',
        body:
          'Isso não significa "use `struct` sempre". Structs grandes custam caro para copiar, e a decisão completa é o assunto da lição 6 deste capítulo.',
      },
    ],
    quiz: [
      {
        id: 's08c06l01q1',
        type: 'single',
        prompt: 'Onde vive um campo `int` declarado dentro de uma `class`?',
        options: [
          { id: 'a', text: 'No monte, dentro do objeto que o contém', correct: true },
          { id: 'b', text: 'Sempre na pilha, por ser tipo de valor' },
          { id: 'c', text: 'Numa área separada para tipos primitivos' },
          { id: 'd', text: 'Depende do valor armazenado' },
        ],
        explanation:
          'O tipo do valor não decide sozinho: o que decide é onde ele está declarado. Um `int` local vai na pilha; um `int` campo de objeto vai junto com o objeto.',
      },
      {
        id: 's08c06l01q2',
        type: 'single',
        prompt: 'O que acontece ao modificar um `struct` recebido como parâmetro comum?',
        options: [
          { id: 'a', text: 'A alteração afeta só a cópia local e se perde ao retornar', correct: true },
          { id: 'b', text: 'A alteração se reflete no chamador' },
          { id: 'c', text: 'Erro de compilação' },
          { id: 'd', text: 'Exceção em tempo de execução' },
        ],
        explanation:
          'O parâmetro recebeu uma cópia. É um bug silencioso — o compilador não reclama, e o método parece funcionar até alguém conferir o resultado.',
      },
      {
        id: 's08c06l01q3',
        type: 'single',
        prompt: 'Por que um array de `struct` costuma ser mais eficiente que um array de `class` equivalente?',
        options: [
          { id: 'a', text: 'Os valores ficam contíguos, sem cabeçalho por elemento nem indireção', correct: true },
          { id: 'b', text: 'Porque structs são lidos mais rápido pelo compilador' },
          { id: 'c', text: 'Porque arrays de classe não usam o monte' },
          { id: 'd', text: 'Porque structs não podem ter métodos' },
        ],
        explanation:
          'O array de classe guarda referências; cada objeto é uma alocação separada com cabeçalho. O array de struct é um bloco único, ideal para o cache.',
      },
    ],
    challenge: {
      brief:
        'Demonstre na prática a diferença entre semântica de valor e de referência: cópia, passagem por parâmetro, `ref`, e o efeito em coleções.',
      requirements: [
        '`Medida` é um `struct` e `Contador` é uma `class`, com os mesmos campos.',
        'Mostre que atribuir um `struct` copia e atribuir uma `class` compartilha.',
        'Mostre que modificar um `struct` por parâmetro comum não afeta o chamador, e que `ref` afeta.',
        '`SomarTodos` recebe um array de cada tipo e demonstra o mesmo efeito dentro de laços.',
        '`ModificarNaLista` mostra que alterar um `struct` obtido de uma `List<T>` altera apenas a cópia.',
        'Nenhum uso de `unsafe` — o ambiente não o permite.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

struct Medida
{
    public int Valor;
    public string Rotulo;

    public override string ToString() => $"{Rotulo}={Valor}";
}

class Contador
{
    public int Valor;
    public string Rotulo = "";

    public override string ToString() => $"{Rotulo}={Valor}";
}

class Program
{
    // TODO: altera a copia local
    static void Alterar(Medida m)
    {
    }

    // TODO: altera o original
    static void Alterar(ref Medida m)
    {
    }

    // TODO: altera o objeto apontado
    static void Alterar(Contador c)
    {
    }

    // TODO: percorre e tenta zerar cada elemento; devolve a soma antes de zerar
    static int SomarEZerar(Medida[] medidas)
    {
        return 0;
    }

    static int SomarEZerar(Contador[] contadores)
    {
        return 0;
    }

    // TODO: obtem o item da lista, altera e devolve o valor na lista depois
    static int ModificarNaLista(List<Medida> lista)
    {
        return 0;
    }

    static void Main()
    {
        var original = new Medida { Valor = 1, Rotulo = "m" };
        var copia = original;
        copia.Valor = 7;
        Console.WriteLine($"struct: original={original} copia={copia}");

        var obj = new Contador { Valor = 1, Rotulo = "c" };
        var alias = obj;
        alias.Valor = 7;
        Console.WriteLine($"class: original={obj} alias={alias}");
        Console.WriteLine($"mesma referencia: {ReferenceEquals(obj, alias)}");

        var m = new Medida { Valor = 1, Rotulo = "p" };
        Alterar(m);
        Console.WriteLine($"struct por valor: {m}");
        Alterar(ref m);
        Console.WriteLine($"struct por ref: {m}");

        var c = new Contador { Valor = 1, Rotulo = "p" };
        Alterar(c);
        Console.WriteLine($"class por parametro: {c}");

        var medidas = new[]
        {
            new Medida { Valor = 10, Rotulo = "a" },
            new Medida { Valor = 20, Rotulo = "b" },
        };

        Console.WriteLine($"soma medidas: {SomarEZerar(medidas)}");
        Console.WriteLine($"medidas apos: {string.Join(",", medidas)}");

        var contadores = new[]
        {
            new Contador { Valor = 10, Rotulo = "a" },
            new Contador { Valor = 20, Rotulo = "b" },
        };

        Console.WriteLine($"soma contadores: {SomarEZerar(contadores)}");
        Console.WriteLine($"contadores apos: {string.Join(",", contadores)}");

        var lista = new List<Medida> { new Medida { Valor = 5, Rotulo = "L" } };
        Console.WriteLine($"na lista apos modificar: {ModificarNaLista(lista)}");
        Console.WriteLine($"lista: {lista[0]}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

struct Medida
{
    public int Valor;
    public string Rotulo;

    public override string ToString() => $"{Rotulo}={Valor}";
}

class Contador
{
    public int Valor;
    public string Rotulo = "";

    public override string ToString() => $"{Rotulo}={Valor}";
}

class Program
{
    static void Alterar(Medida m)
    {
        m.Valor = 99;
    }

    static void Alterar(ref Medida m)
    {
        m.Valor = 99;
    }

    static void Alterar(Contador c)
    {
        c.Valor = 99;
    }

    static int SomarEZerar(Medida[] medidas)
    {
        int soma = 0;

        foreach (Medida m in medidas)
        {
            soma += m.Valor;
        }

        for (int i = 0; i < medidas.Length; i++)
        {
            Medida copia = medidas[i];
            copia.Valor = 0;
        }

        return soma;
    }

    static int SomarEZerar(Contador[] contadores)
    {
        int soma = 0;

        foreach (Contador c in contadores)
        {
            soma += c.Valor;
        }

        foreach (Contador c in contadores)
        {
            c.Valor = 0;
        }

        return soma;
    }

    static int ModificarNaLista(List<Medida> lista)
    {
        Medida item = lista[0];
        item.Valor = 100;
        return lista[0].Valor;
    }

    static void Main()
    {
        var original = new Medida { Valor = 1, Rotulo = "m" };
        var copia = original;
        copia.Valor = 7;
        Console.WriteLine($"struct: original={original} copia={copia}");

        var obj = new Contador { Valor = 1, Rotulo = "c" };
        var alias = obj;
        alias.Valor = 7;
        Console.WriteLine($"class: original={obj} alias={alias}");
        Console.WriteLine($"mesma referencia: {ReferenceEquals(obj, alias)}");

        var m = new Medida { Valor = 1, Rotulo = "p" };
        Alterar(m);
        Console.WriteLine($"struct por valor: {m}");
        Alterar(ref m);
        Console.WriteLine($"struct por ref: {m}");

        var c = new Contador { Valor = 1, Rotulo = "p" };
        Alterar(c);
        Console.WriteLine($"class por parametro: {c}");

        var medidas = new[]
        {
            new Medida { Valor = 10, Rotulo = "a" },
            new Medida { Valor = 20, Rotulo = "b" },
        };

        Console.WriteLine($"soma medidas: {SomarEZerar(medidas)}");
        Console.WriteLine($"medidas apos: {string.Join(",", medidas)}");

        var contadores = new[]
        {
            new Contador { Valor = 10, Rotulo = "a" },
            new Contador { Valor = 20, Rotulo = "b" },
        };

        Console.WriteLine($"soma contadores: {SomarEZerar(contadores)}");
        Console.WriteLine($"contadores apos: {string.Join(",", contadores)}");

        var lista = new List<Medida> { new Medida { Valor = 5, Rotulo = "L" } };
        Console.WriteLine($"na lista apos modificar: {ModificarNaLista(lista)}");
        Console.WriteLine($"lista: {lista[0]}");
    }
}`,
      hints: [
        '`Medida copia = medidas[i];` copia o struct do array — alterar `copia` não toca o array. Para alterar de verdade, seria `medidas[i].Valor = 0;`.',
        'No array de `Contador`, o `foreach` entrega a referência, então `c.Valor = 0` altera o objeto de verdade.',
        '`lista[0]` numa `List<struct>` devolve uma **cópia** — é por isso que `ModificarNaLista` não muda nada na lista.',
        'As três sobrecargas de `Alterar` têm o mesmo corpo. A diferença de resultado vem inteiramente da assinatura.',
      ],
      tests: [
        {
          name: 'Valor contra referência',
          expectedStdout:
            'struct: original=m=1 copia=m=7\n' +
            'class: original=c=7 alias=c=7\nmesma referencia: True\n' +
            'struct por valor: p=1\nstruct por ref: p=99\n' +
            'class por parametro: p=99\n' +
            'soma medidas: 30\nmedidas apos: a=10,b=20\n' +
            'soma contadores: 30\ncontadores apos: a=0,b=0\n' +
            'na lista apos modificar: 5\nlista: L=5',
        },
      ],
    },
  },

  {
    id: 's08c06l02',
    title: 'Boxing e unboxing',
    objective: 'Reconhecer onde o empacotamento acontece — inclusive nos lugares em que ele é invisível.',
    concept: [
      {
        kind: 'text',
        body:
          'O capítulo de genéricos já mostrou o que é boxing: envolver um tipo de valor num objeto do monte para que ele caiba onde se espera uma referência. Aqui interessa **onde ele acontece sem você pedir**.',
      },
      {
        kind: 'code',
        code: `int valor = 42;
object caixa1 = valor;
object caixa2 = valor;

Console.WriteLine(caixa1.Equals(caixa2));
Console.WriteLine(ReferenceEquals(caixa1, caixa2));
Console.WriteLine(caixa1.GetType().Name);`,
      },
      {
        kind: 'output',
        code: `True
False
Int32`,
        caption: 'Mesmo valor, dois objetos distintos: houve duas alocações.',
      },
      {
        kind: 'text',
        body:
          'A atribuição explícita a `object` é o caso óbvio. Os que causam problema são os implícitos — situações em que o empacotamento acontece sem nenhuma pista no código.',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Empacota?'],
        rows: [
          ['`object o = 42;`', 'sim, e é visível'],
          ['`IComparable c = 42;`', 'sim: interface é referência'],
          ['`ArrayList.Add(42)`', 'sim: o parâmetro é `object`'],
          ['`string.Format("{0}", 42)`', 'sim: parâmetro `object`'],
          ['`$"{42}"` (interpolação)', 'em geral **não**: o compilador otimiza'],
          ['`List<int>.Add(42)`', 'não: o genérico é especializado'],
          ['`42.ToString()`', 'não: `int` tem `ToString` próprio'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Atribuir um `struct` a uma **interface** empacota. `IComparable c = meuStruct;` cria um objeto no monte, mesmo sem nenhum `object` aparecer no código. É o boxing mais fácil de não perceber.',
      },
      {
        kind: 'text',
        body:
          'O desempacotamento é **estrito**: só aceita o tipo exato que foi empacotado. Uma conversão numérica que funcionaria diretamente falha aqui.',
      },
      {
        kind: 'compare',
        good: `object numero = 42;
int certo = (int)numero;
long depois = certo;   // ok`,
        bad: `object numero = 42;
long errado = (long)numero;
// InvalidCastException`,
        goodLabel: 'Desempacota para o tipo exato',
        badLabel: 'Desempacota convertendo',
      },
      {
        kind: 'text',
        body:
          'Dá para medir o custo sem cronômetro. `GC.GetTotalAllocatedBytes` conta bytes, e a contagem é determinística — diferente do tempo.',
      },
      {
        kind: 'code',
        code: `long antes = GC.GetTotalAllocatedBytes(true);

var lista = new List<int>();
for (int i = 0; i < 100000; i++) lista.Add(i);

long generico = GC.GetTotalAllocatedBytes(true);

var antiga = new ArrayList();
for (int i = 0; i < 100000; i++) antiga.Add(i);

long objeto = GC.GetTotalAllocatedBytes(true);

Console.WriteLine(objeto - generico > generico - antes);`,
      },
      {
        kind: 'output',
        code: `True`,
        caption: 'A versão com `object` alocou mais: cem mil caixas além do array de referências.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O custo do boxing não é só a alocação. Cada caixa vira lixo para o coletor recolher, e cada leitura passa por uma indireção — o valor não está mais no array, e sim num objeto em outro lugar da memória.',
      },
      {
        kind: 'text',
        body:
          'As três formas de evitar boxing são todas coisas que você já sabe fazer: usar coleções genéricas, usar restrições em vez de `object`, e implementar as interfaces genéricas em vez das antigas.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Sem boxing',
          code: `struct M : IEquatable<M>
{
    public bool Equals(M outro) => ...;
}`,
        },
        right: {
          label: 'Com boxing a cada comparação',
          code: `struct M
{
    public override bool Equals(object o)
        => o is M m && ...;
}`,
        },
        note: '`IEquatable<T>` recebe `T` diretamente. A versão só com `Equals(object)` empacota em toda comparação.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Boxing só importa em caminhos quentes — laços com milhões de iterações, estruturas de dados grandes. Num método chamado dez vezes, otimizá-lo é perda de tempo. Meça antes de mudar.',
      },
    ],
    quiz: [
      {
        id: 's08c06l02q1',
        type: 'multiple',
        prompt: 'Quais destas operações empacotam um `int`?',
        options: [
          { id: 'a', text: '`object o = 42;`', correct: true },
          { id: 'b', text: '`IComparable c = 42;`', correct: true },
          { id: 'c', text: '`arrayList.Add(42)`', correct: true },
          { id: 'd', text: '`listaDeInt.Add(42)`' },
        ],
        explanation:
          'Interface também é tipo de referência, e `ArrayList.Add` recebe `object`. `List<int>` é especializado para `int` e guarda o valor direto.',
      },
      {
        id: 's08c06l02q2',
        type: 'single',
        prompt: 'Por que `(long)(object)42` lança exceção?',
        options: [
          { id: 'a', text: 'O desempacotamento exige o tipo exato que foi empacotado', correct: true },
          { id: 'b', text: 'Porque `long` é maior que `int`' },
          { id: 'c', text: 'Porque `object` não guarda números' },
          { id: 'd', text: 'Não lança: a conversão é implícita' },
        ],
        explanation:
          'O desempacotamento acontece antes da conversão numérica e é estrito. A forma correta é `(long)(int)numero`, em dois passos.',
      },
      {
        id: 's08c06l02q3',
        type: 'single',
        prompt: 'Por que implementar `IEquatable<T>` num `struct`?',
        options: [
          { id: 'a', text: 'Evita empacotar o valor a cada comparação', correct: true },
          { id: 'b', text: 'É obrigatório para usar `==`' },
          { id: 'c', text: 'Permite usar o struct em `List<T>`' },
          { id: 'd', text: 'Habilita a ordenação' },
        ],
        explanation:
          '`Equals(object)` força uma caixa em toda comparação. `Equals(T)` recebe o valor diretamente — e `Dictionary` e `List` preferem essa sobrecarga quando ela existe.',
      },
    ],
    challenge: {
      brief:
        'Detecte e meça o empacotamento: prove a alocação por identidade de referência, mostre o desempacotamento estrito falhando, e compare as alocações entre uma coleção genérica e uma de `object`.',
      requirements: [
        'Use `ReferenceEquals` para provar que dois empacotamentos do mesmo valor são objetos distintos.',
        'Mostre que uma `string` empacotada duas vezes **compartilha** a referência.',
        'A conversão inválida fica dentro de `try` / `catch (InvalidCastException)`.',
        'Compare alocações com `GC.GetTotalAllocatedBytes(true)` e imprima apenas o **booleano** da comparação.',
        '`Medida` implementa `IEquatable<Medida>`; demonstre que a comparação genérica funciona.',
        'Não use `Stopwatch` nem imprima medida de tempo.',
      ],
      starterCode: `using System;
using System.Collections;
using System.Collections.Generic;

struct Medida : IEquatable<Medida>
{
    public int Valor;

    // TODO: comparacao sem empacotar
    public bool Equals(Medida outra)
    {
        return false;
    }

    public override bool Equals(object obj)
    {
        return obj is Medida outra && Equals(outra);
    }

    public override int GetHashCode() => Valor.GetHashCode();

    public override string ToString() => $"M{Valor}";
}

class Program
{
    // TODO: soma via ArrayList, medindo a alocacao
    static long SomarComObjeto(int quantidade, out long alocado)
    {
        alocado = 0;
        return 0;
    }

    // TODO: soma via List<int>, medindo a alocacao
    static long SomarComGenerico(int quantidade, out long alocado)
    {
        alocado = 0;
        return 0;
    }

    // TODO: conta quantos itens do array casam com o alvo, sem empacotar
    static int Contar(Medida[] itens, Medida alvo)
    {
        return 0;
    }

    static void Main()
    {
        int valor = 42;
        object caixa1 = valor;
        object caixa2 = valor;

        Console.WriteLine($"valores iguais: {caixa1.Equals(caixa2)}");
        Console.WriteLine($"mesma referencia: {ReferenceEquals(caixa1, caixa2)}");
        Console.WriteLine($"tipo na caixa: {caixa1.GetType().Name}");

        string texto = "abc";
        object r1 = texto;
        object r2 = texto;
        Console.WriteLine($"string compartilha: {ReferenceEquals(r1, r2)}");

        var medida = new Medida { Valor = 5 };
        object mc1 = medida;
        object mc2 = medida;
        Console.WriteLine($"struct empacotado distinto: {!ReferenceEquals(mc1, mc2)}");

        IComparable comparavel = 42;
        Console.WriteLine($"interface empacota: {comparavel.GetType().Name}");

        object numero = 42;
        Console.WriteLine($"cast exato: {(int)numero}");

        try
        {
            long errado = (long)numero;
            Console.WriteLine($"nao deveria: {errado}");
        }
        catch (InvalidCastException)
        {
            Console.WriteLine("cast largo: InvalidCastException");
        }

        Console.WriteLine($"dois passos: {(long)(int)numero}");

        long somaObjeto = SomarComObjeto(100000, out long alocadoObjeto);
        long somaGenerico = SomarComGenerico(100000, out long alocadoGenerico);

        Console.WriteLine($"somas iguais: {somaObjeto == somaGenerico}");
        Console.WriteLine($"soma: {somaGenerico}");
        Console.WriteLine($"generico alocou algo: {alocadoGenerico > 0}");
        Console.WriteLine($"objeto alocou mais: {alocadoObjeto > alocadoGenerico}");

        var itens = new[]
        {
            new Medida { Valor = 1 },
            new Medida { Valor = 5 },
            new Medida { Valor = 5 },
        };

        Console.WriteLine($"contar 5: {Contar(itens, new Medida { Valor = 5 })}");
        Console.WriteLine($"contar 9: {Contar(itens, new Medida { Valor = 9 })}");
        Console.WriteLine($"equals generico: {itens[1].Equals(itens[2])}");
        Console.WriteLine($"lista contains: {new List<Medida>(itens).Contains(new Medida { Valor = 1 })}");
    }
}`,
      solution: `using System;
using System.Collections;
using System.Collections.Generic;

struct Medida : IEquatable<Medida>
{
    public int Valor;

    public bool Equals(Medida outra)
    {
        return Valor == outra.Valor;
    }

    public override bool Equals(object obj)
    {
        return obj is Medida outra && Equals(outra);
    }

    public override int GetHashCode() => Valor.GetHashCode();

    public override string ToString() => $"M{Valor}";
}

class Program
{
    static long SomarComObjeto(int quantidade, out long alocado)
    {
        long antes = GC.GetTotalAllocatedBytes(true);

        var lista = new ArrayList();

        for (int i = 0; i < quantidade; i++)
        {
            lista.Add(i);
        }

        long soma = 0;

        foreach (object item in lista)
        {
            soma += (int)item;
        }

        alocado = GC.GetTotalAllocatedBytes(true) - antes;
        return soma;
    }

    static long SomarComGenerico(int quantidade, out long alocado)
    {
        long antes = GC.GetTotalAllocatedBytes(true);

        var lista = new List<int>();

        for (int i = 0; i < quantidade; i++)
        {
            lista.Add(i);
        }

        long soma = 0;

        foreach (int item in lista)
        {
            soma += item;
        }

        alocado = GC.GetTotalAllocatedBytes(true) - antes;
        return soma;
    }

    static int Contar(Medida[] itens, Medida alvo)
    {
        int total = 0;

        foreach (Medida item in itens)
        {
            if (item.Equals(alvo))
            {
                total++;
            }
        }

        return total;
    }

    static void Main()
    {
        int valor = 42;
        object caixa1 = valor;
        object caixa2 = valor;

        Console.WriteLine($"valores iguais: {caixa1.Equals(caixa2)}");
        Console.WriteLine($"mesma referencia: {ReferenceEquals(caixa1, caixa2)}");
        Console.WriteLine($"tipo na caixa: {caixa1.GetType().Name}");

        string texto = "abc";
        object r1 = texto;
        object r2 = texto;
        Console.WriteLine($"string compartilha: {ReferenceEquals(r1, r2)}");

        var medida = new Medida { Valor = 5 };
        object mc1 = medida;
        object mc2 = medida;
        Console.WriteLine($"struct empacotado distinto: {!ReferenceEquals(mc1, mc2)}");

        IComparable comparavel = 42;
        Console.WriteLine($"interface empacota: {comparavel.GetType().Name}");

        object numero = 42;
        Console.WriteLine($"cast exato: {(int)numero}");

        try
        {
            long errado = (long)numero;
            Console.WriteLine($"nao deveria: {errado}");
        }
        catch (InvalidCastException)
        {
            Console.WriteLine("cast largo: InvalidCastException");
        }

        Console.WriteLine($"dois passos: {(long)(int)numero}");

        long somaObjeto = SomarComObjeto(100000, out long alocadoObjeto);
        long somaGenerico = SomarComGenerico(100000, out long alocadoGenerico);

        Console.WriteLine($"somas iguais: {somaObjeto == somaGenerico}");
        Console.WriteLine($"soma: {somaGenerico}");
        Console.WriteLine($"generico alocou algo: {alocadoGenerico > 0}");
        Console.WriteLine($"objeto alocou mais: {alocadoObjeto > alocadoGenerico}");

        var itens = new[]
        {
            new Medida { Valor = 1 },
            new Medida { Valor = 5 },
            new Medida { Valor = 5 },
        };

        Console.WriteLine($"contar 5: {Contar(itens, new Medida { Valor = 5 })}");
        Console.WriteLine($"contar 9: {Contar(itens, new Medida { Valor = 9 })}");
        Console.WriteLine($"equals generico: {itens[1].Equals(itens[2])}");
        Console.WriteLine($"lista contains: {new List<Medida>(itens).Contains(new Medida { Valor = 1 })}");
    }
}`,
      hints: [
        '`Equals(Medida)` recebe o valor direto; é essa sobrecarga que `Contains` e `IndexOf` escolhem quando o tipo implementa `IEquatable<T>`.',
        'Meça a alocação **antes** de criar a coleção e **depois** do laço de soma, para que o empacotamento do `foreach` também entre na conta.',
        'Imprimir o número exato de bytes não é seguro — ele varia com a versão do runtime. Imprima só a comparação.',
        '`IComparable comparavel = 42;` mostra o boxing invisível: nenhum `object` aparece no código, mas o `GetType()` revela um `Int32` empacotado.',
      ],
      tests: [
        {
          name: 'Empacotamento visível e invisível',
          expectedStdout:
            'valores iguais: True\nmesma referencia: False\ntipo na caixa: Int32\n' +
            'string compartilha: True\nstruct empacotado distinto: True\ninterface empacota: Int32\n' +
            'cast exato: 42\ncast largo: InvalidCastException\ndois passos: 42\n' +
            'somas iguais: True\nsoma: 4999950000\n' +
            'generico alocou algo: True\nobjeto alocou mais: True\n' +
            'contar 5: 2\ncontar 9: 0\nequals generico: True\nlista contains: True',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's08c06l03',
    title: 'Span<T>',
    objective: 'Trabalhar com fatias de memória sem copiar dados.',
    concept: [
      {
        kind: 'text',
        body:
          '`Span<T>` é uma **visão** sobre memória que já existe. Ele não guarda dados: guarda um ponteiro para o início e um tamanho. Fatiá-lo não copia nada.',
      },
      {
        kind: 'code',
        code: `int[] dados = { 1, 2, 3, 4, 5, 6 };

Span<int> span = dados;
Span<int> fatia = span.Slice(1, 3);

Console.WriteLine(string.Join(",", fatia.ToArray()));

fatia[0] = 99;
Console.WriteLine(string.Join(",", dados));`,
      },
      {
        kind: 'output',
        code: `2,3,4
1,99,3,4,5,6`,
        caption: 'Escrever na fatia alterou o array original — a fatia é uma janela, não uma cópia.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Essa é a diferença central em relação a `array[1..4]`, que **copia** os elementos. `span.Slice(1, 3)` e `span[1..4]` produzem uma visão, em tempo constante e sem alocar.',
      },
      {
        kind: 'compare',
        good: `Span<int> fatia = dados.AsSpan(2, 3);
// nenhuma alocacao`,
        bad: `int[] fatia = dados[2..5];
// copia 3 elementos`,
        goodLabel: 'Visão',
        badLabel: 'Cópia',
      },
      {
        kind: 'text',
        body:
          'O uso mais comum é em **parâmetros**. Um método que recebe `Span<T>` aceita array, fatia de array, ou qualquer bloco de memória — e nunca copia.',
      },
      {
        kind: 'code',
        code: `static int Somar(ReadOnlySpan<int> dados)
{
    int soma = 0;

    foreach (int x in dados)
    {
        soma += x;
    }

    return soma;
}

Somar(dados);                 // array inteiro
Somar(dados.AsSpan(2, 3));    // uma fatia
Somar(dados.AsSpan(2..5));    // com sintaxe de faixa`,
        caption: 'Uma assinatura só, sem sobrecargas de `(array, inicio, tamanho)`.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Prefira `ReadOnlySpan<T>` em parâmetros que só leem. Ele aceita tudo o que `Span<T>` aceita — e mais, incluindo `string` — e comunica que o método não vai modificar nada.',
      },
      {
        kind: 'text',
        body:
          'A contrapartida são restrições fortes. `Span<T>` é um `ref struct`, e por isso **só pode viver na pilha**.',
      },
      {
        kind: 'table',
        headers: ['Não pode', 'Motivo'],
        rows: [
          ['ser campo de uma `class`', 'o objeto vive no monte'],
          ['ser usado em `async`', 'o estado do método vai para o monte'],
          ['ser argumento de tipo genérico', '`List<Span<int>>` é impossível'],
          ['ser empacotado', 'a caixa ficaria no monte'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Essas restrições são o preço da segurança. Um `Span<T>` guardado num objeto do monte poderia sobreviver à memória que ele aponta — e apontar para lixo. O compilador impede que isso aconteça.',
      },
      {
        kind: 'text',
        body:
          'Os métodos mais úteis de `Span<T>` cobrem o que se faz com um trecho de dados. Todos operam sobre a janela, sem alocar.',
      },
      {
        kind: 'table',
        headers: ['Método', 'Faz'],
        rows: [
          ['`Slice(inicio, tamanho)`', 'nova visão sobre parte da atual'],
          ['`IndexOf(valor)`', 'posição da primeira ocorrência'],
          ['`Fill(valor)`', 'preenche a janela inteira'],
          ['`CopyTo(destino)`', 'copia para outra visão'],
          ['`Reverse()`', 'inverte no lugar'],
          ['`ToArray()`', 'aí sim copia, para um array novo'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          '`Span<T>` só compensa em caminhos quentes — processar arquivos grandes, protocolos binários, laços com milhões de iterações. Num método chamado dez vezes, um array comum é mais simples e igualmente adequado.',
      },
    ],
    quiz: [
      {
        id: 's08c06l03q1',
        type: 'single',
        prompt: 'O que `span.Slice(1, 3)` faz?',
        options: [
          { id: 'a', text: 'Cria uma visão sobre parte da memória, sem copiar', correct: true },
          { id: 'b', text: 'Copia três elementos para um array novo' },
          { id: 'c', text: 'Remove os elementos fora da faixa' },
          { id: 'd', text: 'Devolve um `IEnumerable<T>` preguiçoso' },
        ],
        explanation:
          'A fatia aponta para a mesma memória. Escrever nela altera o dado original — é isso que a torna barata e é isso que exige atenção.',
      },
      {
        id: 's08c06l03q2',
        type: 'single',
        prompt: 'Por que `Span<T>` não pode ser campo de uma classe?',
        options: [
          { id: 'a', text: 'A classe vive no monte, e o span poderia sobreviver à memória que aponta', correct: true },
          { id: 'b', text: 'Porque `Span<T>` é uma interface' },
          { id: 'c', text: 'Por limitação temporária do compilador' },
          { id: 'd', text: 'Pode, desde que o campo seja `readonly`' },
        ],
        explanation:
          '`Span<T>` é um `ref struct` restrito à pilha. A regra impede referências pendentes — o mesmo problema que ponteiros soltos causam em outras linguagens.',
      },
      {
        id: 's08c06l03q3',
        type: 'single',
        prompt: 'Por que preferir `ReadOnlySpan<T>` em parâmetros de leitura?',
        options: [
          { id: 'a', text: 'Aceita tudo que `Span<T>` aceita, mais `string`, e comunica que não modifica', correct: true },
          { id: 'b', text: 'É mais rápido em tempo de execução' },
          { id: 'c', text: 'Permite guardar o span num campo' },
          { id: 'd', text: 'Funciona em métodos `async`' },
        ],
        explanation:
          'A conversão de `Span<T>` para `ReadOnlySpan<T>` é implícita, então o parâmetro mais restrito aceita mais entradas — e documenta a intenção.',
      },
    ],
    challenge: {
      brief:
        'Implemente operações sobre trechos de um array usando `Span<T>`, sem copiar nada, e demonstre que as alterações na fatia afetam o array original.',
      requirements: [
        'Todos os métodos recebem `Span<int>` ou `ReadOnlySpan<int>` — nunca `(array, inicio, tamanho)`.',
        'Métodos que só leem recebem `ReadOnlySpan<int>`.',
        '`Inverter` e `Preencher` operam no lugar, alterando o array de origem.',
        '`MaiorSoma` encontra a janela de tamanho fixo com a maior soma, sem alocar.',
        '`Copiar` usa `CopyTo` para transferir entre duas visões.',
        'Demonstre que fatiar não aloca, comparando `GC.GetTotalAllocatedBytes` antes e depois.',
        'Nenhum `ToArray()` fora das impressões.',
      ],
      starterCode: `using System;

class Program
{
    static int Somar(ReadOnlySpan<int> dados)
    {
        // TODO
        return 0;
    }

    static int Maior(ReadOnlySpan<int> dados)
    {
        // TODO: InvalidOperationException quando vazio
        return 0;
    }

    // TODO: inverte no lugar, sem alocar
    static void Inverter(Span<int> dados)
    {
    }

    // TODO: preenche a janela inteira
    static void Preencher(Span<int> dados, int valor)
    {
    }

    // TODO: maior soma entre as janelas de tamanho fixo
    static int MaiorSoma(ReadOnlySpan<int> dados, int janela)
    {
        return 0;
    }

    // TODO: use CopyTo
    static void Copiar(ReadOnlySpan<int> origem, Span<int> destino)
    {
    }

    // TODO: posicao da primeira ocorrencia, ou -1
    static int Posicao(ReadOnlySpan<int> dados, int valor)
    {
        return 0;
    }

    static void Main()
    {
        int[] dados = { 1, 2, 3, 4, 5, 6 };

        Console.WriteLine($"soma total: {Somar(dados)}");
        Console.WriteLine($"soma fatia: {Somar(dados.AsSpan(2, 3))}");
        Console.WriteLine($"soma faixa: {Somar(dados.AsSpan(2..5))}");
        Console.WriteLine($"maior: {Maior(dados)}");
        Console.WriteLine($"maior na fatia: {Maior(dados.AsSpan(0, 3))}");

        Console.WriteLine($"posicao do 4: {Posicao(dados, 4)}");
        Console.WriteLine($"posicao do 9: {Posicao(dados, 9)}");

        long antes = GC.GetTotalAllocatedBytes(true);
        Span<int> visao = dados.AsSpan(1, 4);
        int soma = Somar(visao);
        long depois = GC.GetTotalAllocatedBytes(true);
        Console.WriteLine($"fatiar nao alocou: {depois - antes < 1000} soma={soma}");

        Inverter(dados.AsSpan(1, 4));
        Console.WriteLine($"apos inverter miolo: {string.Join(",", dados)}");

        Preencher(dados.AsSpan(0, 2), 0);
        Console.WriteLine($"apos preencher inicio: {string.Join(",", dados)}");

        int[] serie = { 3, 1, 4, 1, 5, 9, 2, 6 };
        Console.WriteLine($"maior soma 3: {MaiorSoma(serie, 3)}");
        Console.WriteLine($"maior soma 1: {MaiorSoma(serie, 1)}");
        Console.WriteLine($"maior soma total: {MaiorSoma(serie, serie.Length)}");

        int[] destino = new int[4];
        Copiar(serie.AsSpan(2, 4), destino);
        Console.WriteLine($"copiado: {string.Join(",", destino)}");

        try
        {
            Maior(ReadOnlySpan<int>.Empty);
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"vazio: {ex.Message}");
        }
    }
}`,
      solution: `using System;

class Program
{
    static int Somar(ReadOnlySpan<int> dados)
    {
        int soma = 0;

        foreach (int x in dados)
        {
            soma += x;
        }

        return soma;
    }

    static int Maior(ReadOnlySpan<int> dados)
    {
        if (dados.Length == 0)
        {
            throw new InvalidOperationException("span vazio");
        }

        int melhor = dados[0];

        for (int i = 1; i < dados.Length; i++)
        {
            if (dados[i] > melhor)
            {
                melhor = dados[i];
            }
        }

        return melhor;
    }

    static void Inverter(Span<int> dados)
    {
        dados.Reverse();
    }

    static void Preencher(Span<int> dados, int valor)
    {
        dados.Fill(valor);
    }

    static int MaiorSoma(ReadOnlySpan<int> dados, int janela)
    {
        if (janela <= 0 || janela > dados.Length)
        {
            return 0;
        }

        int atual = Somar(dados.Slice(0, janela));
        int melhor = atual;

        for (int i = janela; i < dados.Length; i++)
        {
            atual += dados[i] - dados[i - janela];

            if (atual > melhor)
            {
                melhor = atual;
            }
        }

        return melhor;
    }

    static void Copiar(ReadOnlySpan<int> origem, Span<int> destino)
    {
        origem.CopyTo(destino);
    }

    static int Posicao(ReadOnlySpan<int> dados, int valor)
    {
        return dados.IndexOf(valor);
    }

    static void Main()
    {
        int[] dados = { 1, 2, 3, 4, 5, 6 };

        Console.WriteLine($"soma total: {Somar(dados)}");
        Console.WriteLine($"soma fatia: {Somar(dados.AsSpan(2, 3))}");
        Console.WriteLine($"soma faixa: {Somar(dados.AsSpan(2..5))}");
        Console.WriteLine($"maior: {Maior(dados)}");
        Console.WriteLine($"maior na fatia: {Maior(dados.AsSpan(0, 3))}");

        Console.WriteLine($"posicao do 4: {Posicao(dados, 4)}");
        Console.WriteLine($"posicao do 9: {Posicao(dados, 9)}");

        long antes = GC.GetTotalAllocatedBytes(true);
        Span<int> visao = dados.AsSpan(1, 4);
        int soma = Somar(visao);
        long depois = GC.GetTotalAllocatedBytes(true);
        Console.WriteLine($"fatiar nao alocou: {depois - antes < 1000} soma={soma}");

        Inverter(dados.AsSpan(1, 4));
        Console.WriteLine($"apos inverter miolo: {string.Join(",", dados)}");

        Preencher(dados.AsSpan(0, 2), 0);
        Console.WriteLine($"apos preencher inicio: {string.Join(",", dados)}");

        int[] serie = { 3, 1, 4, 1, 5, 9, 2, 6 };
        Console.WriteLine($"maior soma 3: {MaiorSoma(serie, 3)}");
        Console.WriteLine($"maior soma 1: {MaiorSoma(serie, 1)}");
        Console.WriteLine($"maior soma total: {MaiorSoma(serie, serie.Length)}");

        int[] destino = new int[4];
        Copiar(serie.AsSpan(2, 4), destino);
        Console.WriteLine($"copiado: {string.Join(",", destino)}");

        try
        {
            Maior(ReadOnlySpan<int>.Empty);
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"vazio: {ex.Message}");
        }
    }
}`,
      hints: [
        '`Span<T>` já tem `Reverse()`, `Fill()`, `CopyTo()` e `IndexOf()` — não reimplemente o que a estrutura oferece.',
        '`MaiorSoma` é a janela deslizante da Seção 7: some a janela inicial e depois some o que entra e subtraia o que sai.',
        '`dados.AsSpan(2..5)` aceita a sintaxe de faixa do capítulo anterior, e continua sem copiar.',
        'Como `Inverter` opera sobre uma fatia do array original, o efeito aparece no array inteiro ao imprimi-lo.',
      ],
      tests: [
        {
          name: 'Fatias sem cópia',
          expectedStdout:
            'soma total: 21\nsoma fatia: 12\nsoma faixa: 12\nmaior: 6\nmaior na fatia: 3\n' +
            'posicao do 4: 3\nposicao do 9: -1\n' +
            'fatiar nao alocou: True soma=14\n' +
            'apos inverter miolo: 1,5,4,3,2,6\napos preencher inicio: 0,0,4,3,2,6\n' +
            'maior soma 3: 17\nmaior soma 1: 9\nmaior soma total: 31\n' +
            'copiado: 4,1,5,9\n' +
            'vazio: span vazio',
        },
      ],
    },
  },

  {
    id: 's08c06l04',
    title: 'ReadOnlySpan e fatias de string',
    objective: 'Processar texto sem alocar substrings, usando `ReadOnlySpan<char>`.',
    concept: [
      {
        kind: 'text',
        body:
          'Strings são imutáveis, e por isso **toda** operação que "modifica" uma string cria outra. `Substring`, `Trim`, `Split`, `Replace` — todos alocam. Num laço grande, isso domina o custo.',
      },
      {
        kind: 'code',
        code: `for (int i = 0; i < 10000; i++)
{
    var s = "abcdefghij".Substring(2, 5);
}`,
      },
      {
        kind: 'output',
        code: `substring alocou: True
span alocou quase nada: True`,
        caption:
          'Dez mil `Substring` alocam dez mil strings. Dez mil `AsSpan` alocam praticamente nada — a medição confirma.',
      },
      {
        kind: 'text',
        body:
          '`ReadOnlySpan<char>` é a versão somente-leitura do `Span<T>`, e é o tipo natural para trechos de texto. Uma `string` converte para ele sem copiar.',
      },
      {
        kind: 'code',
        code: `ReadOnlySpan<char> texto = "bicicleta".AsSpan();

Console.WriteLine(texto.Slice(0, 3).ToString());
Console.WriteLine(texto[^4..].ToString());
Console.WriteLine(texto.IndexOf('c'));
Console.WriteLine(texto.StartsWith("bici"));`,
      },
      {
        kind: 'output',
        code: `bic
leta
2
True`,
        caption: 'Só o `ToString()` aloca — e ele só aparece porque a saída precisa de uma string de verdade.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Todo `ToString()` sobre um span **aloca**. Se o objetivo é evitar alocação, o `ToString` precisa ficar fora do laço quente — idealmente só no ponto de saída final.',
      },
      {
        kind: 'text',
        body:
          'A maioria dos métodos de `string` tem equivalente em `ReadOnlySpan<char>`, com a mesma semântica e sem alocar.',
      },
      {
        kind: 'table',
        headers: ['`string`', '`ReadOnlySpan<char>`', 'Aloca?'],
        rows: [
          ['`s.Substring(a, b)`', '`s.AsSpan(a, b)`', 'não'],
          ['`s.IndexOf(c)`', '`span.IndexOf(c)`', 'não'],
          ['`s.StartsWith(t)`', '`span.StartsWith(t)`', 'não'],
          ['`s.Trim()`', '`span.Trim()`', 'não'],
          ['`s.Split(c)`', '`MemoryExtensions.Split` / laço manual', 'depende'],
          ['`s == t`', '`span.SequenceEqual(t)`', 'não'],
        ],
      },
      {
        kind: 'text',
        body:
          'O padrão típico de análise de texto é percorrer buscando separadores e fatiar, tudo sobre spans — e converter para `string` apenas o que realmente precisa sair.',
      },
      {
        kind: 'compare',
        good: `ReadOnlySpan<char> restante = linha;

while (!restante.IsEmpty)
{
    int p = restante.IndexOf(',');
    if (p < 0) { Processar(restante); break; }
    Processar(restante.Slice(0, p));
    restante = restante.Slice(p + 1);
}`,
        bad: `foreach (string parte in linha.Split(','))
{
    Processar(parte);
}
// aloca um array e uma string
// por campo`,
        goodLabel: 'Sem alocação por campo',
        badLabel: 'Uma string por campo',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '`int.Parse` e `int.TryParse` têm sobrecargas que aceitam `ReadOnlySpan<char>`. Dá para ler um número de um trecho de texto sem criar a string intermediária — o passo que fecha o ciclo.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Vale a pena quando o texto é grande ou o laço é quente: analisar um CSV de milhões de linhas, um log, um protocolo. Para uma configuração de vinte linhas, `Split` é mais legível e a diferença é irrelevante.',
      },
    ],
    quiz: [
      {
        id: 's08c06l04q1',
        type: 'single',
        prompt: 'Por que `"texto".Substring(0, 3)` aloca e `"texto".AsSpan(0, 3)` não?',
        options: [
          { id: 'a', text: '`Substring` cria uma string nova; `AsSpan` cria uma visão sobre a mesma memória', correct: true },
          { id: 'b', text: 'Porque `AsSpan` é um método de extensão' },
          { id: 'c', text: 'Porque `Substring` copia a string inteira' },
          { id: 'd', text: 'Os dois alocam igualmente' },
        ],
        explanation:
          'Strings são imutáveis, então `Substring` precisa de um objeto novo. O span aponta para os mesmos caracteres, com outro início e outro tamanho.',
      },
      {
        id: 's08c06l04q2',
        type: 'single',
        prompt: 'O que anula o ganho de usar spans num laço?',
        options: [
          { id: 'a', text: 'Chamar `ToString()` a cada iteração', correct: true },
          { id: 'b', text: 'Usar `IndexOf` em vez de `Contains`' },
          { id: 'c', text: 'Usar `ReadOnlySpan<char>` em vez de `Span<char>`' },
          { id: 'd', text: 'Fatiar mais de uma vez' },
        ],
        explanation:
          '`ToString()` aloca uma string por chamada. Se ele está dentro do laço, o span economizou uma alocação e criou outra no lugar.',
      },
      {
        id: 's08c06l04q3',
        type: 'single',
        prompt: 'Como comparar dois `ReadOnlySpan<char>` por conteúdo?',
        options: [
          { id: 'a', text: '`span.SequenceEqual(outro)`', correct: true },
          { id: 'b', text: '`span == outro`' },
          { id: 'c', text: '`span.Equals(outro)`' },
          { id: 'd', text: '`span.ToString() == outro.ToString()`' },
        ],
        explanation:
          '`SequenceEqual` compara conteúdo sem alocar. A última opção funciona, mas aloca duas strings — exatamente o que se queria evitar.',
      },
    ],
    challenge: {
      brief:
        'Escreva um analisador de linhas CSV que trabalha inteiramente sobre `ReadOnlySpan<char>`, sem criar uma string por campo, e prove pela medição que ele aloca menos que a versão com `Split`.',
      requirements: [
        'O analisador percorre a linha com `IndexOf` e `Slice`, sem `Split` e sem `Substring`.',
        '`ContarCampos` e `SomarNumeros` operam só sobre spans.',
        '`CampoEm` devolve o N-ésimo campo como `string` — a única conversão permitida.',
        '`SomarNumeros` usa a sobrecarga de `int.TryParse` que aceita `ReadOnlySpan<char>`.',
        '`ComecaCom` e `Iguais` comparam sem alocar.',
        'Compare as alocações entre a versão com span e a versão com `Split`, imprimindo apenas o booleano.',
      ],
      starterCode: `using System;

class Program
{
    // TODO: conta campos separados por ';' sem alocar
    static int ContarCampos(ReadOnlySpan<char> linha)
    {
        return 0;
    }

    // TODO: soma os campos numericos, ignorando os que nao convertem
    static int SomarNumeros(ReadOnlySpan<char> linha)
    {
        return 0;
    }

    // TODO: N-esimo campo (base 0) como string; "" quando nao existe
    static string CampoEm(ReadOnlySpan<char> linha, int indice)
    {
        return "";
    }

    // TODO: sem alocar
    static bool ComecaCom(ReadOnlySpan<char> texto, ReadOnlySpan<char> prefixo)
    {
        return false;
    }

    // TODO: sem alocar
    static bool Iguais(ReadOnlySpan<char> a, ReadOnlySpan<char> b)
    {
        return false;
    }

    // TODO: soma os campos numericos usando Split, para comparacao
    static int SomarComSplit(string linha)
    {
        return 0;
    }

    static void Main()
    {
        string linha = "id;42;nome;7;ativo;100";

        Console.WriteLine($"campos: {ContarCampos(linha)}");
        Console.WriteLine($"soma: {SomarNumeros(linha)}");
        Console.WriteLine($"campo 0: {CampoEm(linha, 0)}");
        Console.WriteLine($"campo 3: {CampoEm(linha, 3)}");
        Console.WriteLine($"campo 5: {CampoEm(linha, 5)}");
        Console.WriteLine($"campo 9: [{CampoEm(linha, 9)}]");

        Console.WriteLine($"campo unico: {ContarCampos("sozinho")}");
        Console.WriteLine($"linha vazia: {ContarCampos("")}");
        Console.WriteLine($"soma sem numeros: {SomarNumeros("a;b;c")}");

        Console.WriteLine($"comeca com id: {ComecaCom(linha, "id")}");
        Console.WriteLine($"comeca com xx: {ComecaCom(linha, "xx")}");
        Console.WriteLine($"iguais: {Iguais("abc", "abc")}");
        Console.WriteLine($"diferentes: {Iguais("abc", "abd")}");

        Console.WriteLine($"trecho: {linha.AsSpan(0, 2).ToString()}");
        Console.WriteLine($"indexof: {linha.AsSpan().IndexOf(';')}");
        Console.WriteLine($"trim: [{"  espaco  ".AsSpan().Trim().ToString()}]");

        long a1 = GC.GetTotalAllocatedBytes(true);

        for (int i = 0; i < 20000; i++)
        {
            SomarComSplit(linha);
        }

        long a2 = GC.GetTotalAllocatedBytes(true);

        for (int i = 0; i < 20000; i++)
        {
            SomarNumeros(linha);
        }

        long a3 = GC.GetTotalAllocatedBytes(true);

        Console.WriteLine($"resultados iguais: {SomarComSplit(linha) == SomarNumeros(linha)}");
        Console.WriteLine($"split alocou: {a2 - a1 > 100000}");
        Console.WriteLine($"span alocou muito menos: {(a3 - a2) < (a2 - a1) / 10}");
    }
}`,
      solution: `using System;

class Program
{
    static int ContarCampos(ReadOnlySpan<char> linha)
    {
        if (linha.IsEmpty)
        {
            return 0;
        }

        int total = 1;

        for (int i = 0; i < linha.Length; i++)
        {
            if (linha[i] == ';')
            {
                total++;
            }
        }

        return total;
    }

    static int SomarNumeros(ReadOnlySpan<char> linha)
    {
        int soma = 0;
        ReadOnlySpan<char> restante = linha;

        while (!restante.IsEmpty)
        {
            int posicao = restante.IndexOf(';');
            ReadOnlySpan<char> campo = posicao < 0 ? restante : restante.Slice(0, posicao);

            if (int.TryParse(campo, out int valor))
            {
                soma += valor;
            }

            if (posicao < 0)
            {
                break;
            }

            restante = restante.Slice(posicao + 1);
        }

        return soma;
    }

    static string CampoEm(ReadOnlySpan<char> linha, int indice)
    {
        ReadOnlySpan<char> restante = linha;
        int atual = 0;

        while (!restante.IsEmpty)
        {
            int posicao = restante.IndexOf(';');
            ReadOnlySpan<char> campo = posicao < 0 ? restante : restante.Slice(0, posicao);

            if (atual == indice)
            {
                return campo.ToString();
            }

            if (posicao < 0)
            {
                break;
            }

            restante = restante.Slice(posicao + 1);
            atual++;
        }

        return "";
    }

    static bool ComecaCom(ReadOnlySpan<char> texto, ReadOnlySpan<char> prefixo)
    {
        return texto.StartsWith(prefixo);
    }

    static bool Iguais(ReadOnlySpan<char> a, ReadOnlySpan<char> b)
    {
        return a.SequenceEqual(b);
    }

    static int SomarComSplit(string linha)
    {
        int soma = 0;

        foreach (string campo in linha.Split(';'))
        {
            if (int.TryParse(campo, out int valor))
            {
                soma += valor;
            }
        }

        return soma;
    }

    static void Main()
    {
        string linha = "id;42;nome;7;ativo;100";

        Console.WriteLine($"campos: {ContarCampos(linha)}");
        Console.WriteLine($"soma: {SomarNumeros(linha)}");
        Console.WriteLine($"campo 0: {CampoEm(linha, 0)}");
        Console.WriteLine($"campo 3: {CampoEm(linha, 3)}");
        Console.WriteLine($"campo 5: {CampoEm(linha, 5)}");
        Console.WriteLine($"campo 9: [{CampoEm(linha, 9)}]");

        Console.WriteLine($"campo unico: {ContarCampos("sozinho")}");
        Console.WriteLine($"linha vazia: {ContarCampos("")}");
        Console.WriteLine($"soma sem numeros: {SomarNumeros("a;b;c")}");

        Console.WriteLine($"comeca com id: {ComecaCom(linha, "id")}");
        Console.WriteLine($"comeca com xx: {ComecaCom(linha, "xx")}");
        Console.WriteLine($"iguais: {Iguais("abc", "abc")}");
        Console.WriteLine($"diferentes: {Iguais("abc", "abd")}");

        Console.WriteLine($"trecho: {linha.AsSpan(0, 2).ToString()}");
        Console.WriteLine($"indexof: {linha.AsSpan().IndexOf(';')}");
        Console.WriteLine($"trim: [{"  espaco  ".AsSpan().Trim().ToString()}]");

        long a1 = GC.GetTotalAllocatedBytes(true);

        for (int i = 0; i < 20000; i++)
        {
            SomarComSplit(linha);
        }

        long a2 = GC.GetTotalAllocatedBytes(true);

        for (int i = 0; i < 20000; i++)
        {
            SomarNumeros(linha);
        }

        long a3 = GC.GetTotalAllocatedBytes(true);

        Console.WriteLine($"resultados iguais: {SomarComSplit(linha) == SomarNumeros(linha)}");
        Console.WriteLine($"split alocou: {a2 - a1 > 100000}");
        Console.WriteLine($"span alocou muito menos: {(a3 - a2) < (a2 - a1) / 10}");
    }
}`,
      hints: [
        'O laço de análise tem sempre a mesma forma: `IndexOf` do separador, fatia até ele, e avança para depois dele. Quando `IndexOf` devolve `-1`, o campo é o restante e o laço acaba.',
        '`int.TryParse` aceita `ReadOnlySpan<char>` diretamente — sem essa sobrecarga, seria preciso um `ToString()` por campo e o ganho desapareceria.',
        '`CampoEm` é o único método que aloca, e uma vez só: o `ToString()` do campo pedido.',
        'Uma `string` converte implicitamente para `ReadOnlySpan<char>`, então `ContarCampos(linha)` funciona sem `AsSpan()` explícito.',
      ],
      tests: [
        {
          name: 'CSV sem alocação',
          expectedStdout:
            'campos: 6\nsoma: 149\n' +
            'campo 0: id\ncampo 3: 7\ncampo 5: 100\ncampo 9: []\n' +
            'campo unico: 1\nlinha vazia: 0\nsoma sem numeros: 0\n' +
            'comeca com id: True\ncomeca com xx: False\niguais: True\ndiferentes: False\n' +
            'trecho: id\nindexof: 2\ntrim: [espaco]\n' +
            'resultados iguais: True\nsplit alocou: True\nspan alocou muito menos: True',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's08c06l05',
    title: 'StringBuilder',
    objective: 'Construir texto em laços sem pagar o custo quadrático da concatenação.',
    concept: [
      {
        kind: 'text',
        body:
          'Strings são imutáveis, então `texto += "x"` **não** acrescenta um caractere: ele cria uma string nova com o conteúdo antigo mais o novo. Num laço, isso é desastroso.',
      },
      {
        kind: 'code',
        code: `string texto = "";

for (int i = 0; i < 2000; i++)
{
    texto += "x";
}`,
        caption: 'Duas mil alocações, de tamanhos 1, 2, 3… 2000. O custo total é O(n²).',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O problema não é a quantidade de alocações, é o **total copiado**. Cada `+=` copia toda a string acumulada até ali. Com n iterações, são n²/2 caracteres copiados.',
      },
      {
        kind: 'text',
        body:
          '`StringBuilder` mantém um buffer interno mutável que cresce dobrando de tamanho. Acrescentar é copiar apenas o novo trecho.',
      },
      {
        kind: 'code',
        code: `var construtor = new StringBuilder();

for (int i = 0; i < 2000; i++)
{
    construtor.Append('x');
}

string resultado = construtor.ToString();`,
      },
      {
        kind: 'output',
        code: `iguais: True
concat alocou mais: True`,
        caption: 'Mesmo resultado. A concatenação alocou muito mais — a medição confirma.',
      },
      {
        kind: 'text',
        body:
          'Nem toda concatenação precisa de `StringBuilder`. O compilador otimiza os casos simples, e usar o construtor onde ele não é necessário só deixa o código pior.',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Use'],
        rows: [
          ['`a + b + c` numa linha', 'concatenação: vira uma chamada só'],
          ['interpolação `$"{a} e {b}"`', 'interpolação: o compilador otimiza'],
          ['juntar uma coleção', '`string.Join`'],
          ['laço com quantidade desconhecida', '`StringBuilder`'],
          ['montar em partes, condicionalmente', '`StringBuilder`'],
        ],
      },
      {
        kind: 'compare',
        good: `// tres partes, uma expressao
string nome = primeiro + " " + ultimo;

// colecao
string csv = string.Join(",", itens);`,
        bad: `// StringBuilder desnecessario
var sb = new StringBuilder();
sb.Append(primeiro);
sb.Append(" ");
sb.Append(ultimo);
string nome = sb.ToString();`,
        goodLabel: 'Direto ao ponto',
        badLabel: 'Cerimônia sem ganho',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '`a + b + c` numa única expressão vira uma chamada a `string.Concat` com três argumentos: uma alocação só, do tamanho exato. O problema é o `+=` **em laço**, não o `+` em si.',
      },
      {
        kind: 'text',
        body:
          'Quando o tamanho final é conhecido, informá-lo no construtor evita as realocações intermediárias do buffer.',
      },
      {
        kind: 'code',
        code: `var construtor = new StringBuilder(capacidade: 2000);`,
      },
      {
        kind: 'text',
        body: 'Os métodos mais úteis vão além do `Append`, e conhecê-los evita muita gambiarra:',
      },
      {
        kind: 'table',
        headers: ['Método', 'Faz'],
        rows: [
          ['`Append(x)`', 'acrescenta ao fim'],
          ['`AppendLine(x)`', 'acrescenta com quebra de linha'],
          ['`Insert(pos, x)`', 'insere numa posição'],
          ['`Remove(pos, n)`', 'remove um trecho'],
          ['`Replace(a, b)`', 'substitui todas as ocorrências'],
          ['`Clear()`', 'esvazia mantendo o buffer'],
          ['`Length = n`', 'trunca sem realocar'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          '`Clear()` mantém o buffer alocado — reutilizar o mesmo `StringBuilder` num laço externo evita realocar tudo a cada volta. É o mesmo princípio de reaproveitar buffers, tema da lição 8.',
      },
    ],
    quiz: [
      {
        id: 's08c06l05q1',
        type: 'single',
        prompt: 'Por que `texto += "x"` num laço é O(n²)?',
        options: [
          { id: 'a', text: 'Cada `+=` copia toda a string acumulada até ali', correct: true },
          { id: 'b', text: 'Porque cada `+=` faz duas alocações' },
          { id: 'c', text: 'Porque `string` não tem capacidade' },
          { id: 'd', text: 'Não é: o compilador otimiza para O(n)' },
        ],
        explanation:
          'Somando as cópias de todas as iterações — 1 + 2 + 3 + … + n — chega-se a n²/2 caracteres copiados.',
      },
      {
        id: 's08c06l05q2',
        type: 'single',
        prompt: 'Quando `a + b + c` numa linha é adequado?',
        options: [
          { id: 'a', text: 'Sempre: vira uma única chamada a `string.Concat`, com uma alocação', correct: true },
          { id: 'b', text: 'Nunca: `StringBuilder` é sempre melhor' },
          { id: 'c', text: 'Só quando as três partes são literais' },
          { id: 'd', text: 'Só com menos de 100 caracteres' },
        ],
        explanation:
          'O compilador junta os operandos numa chamada só, do tamanho exato. O problema é o acúmulo em laço, não a concatenação em si.',
      },
      {
        id: 's08c06l05q3',
        type: 'single',
        prompt: 'Qual a vantagem de `Clear()` sobre criar um `StringBuilder` novo?',
        options: [
          { id: 'a', text: 'Mantém o buffer alocado, evitando realocação na próxima volta', correct: true },
          { id: 'b', text: 'É a única forma de esvaziar' },
          { id: 'c', text: 'Preserva o conteúdo anterior' },
          { id: 'd', text: 'Não há vantagem' },
        ],
        explanation:
          'Num laço externo que monta muitas strings, reaproveitar o buffer elimina a realocação repetida — o mesmo princípio dos pools de buffer.',
      },
    ],
    challenge: {
      brief:
        'Construa um formatador de relatório com `StringBuilder`, compare-o com a concatenação em laço, e mostre onde a concatenação simples continua sendo a escolha certa.',
      requirements: [
        '`ConstruirComBuilder` monta o texto com `StringBuilder`, informando a capacidade quando ela é conhecida.',
        '`ConstruirComConcat` faz o mesmo com `+=`, para comparação.',
        'Os dois resultados devem ser idênticos.',
        'Compare as alocações e imprima apenas o booleano.',
        '`Formatar` demonstra o caso em que concatenação simples basta.',
        '`Tabela` usa `AppendLine`, `Insert`, `Replace` e `Length` para truncar.',
        '`Reaproveitar` usa `Clear()` num laço externo e monta várias linhas com o mesmo construtor.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Text;

class Program
{
    // TODO: StringBuilder com capacidade informada
    static string ConstruirComBuilder(int quantidade)
    {
        return "";
    }

    // TODO: mesma coisa com +=
    static string ConstruirComConcat(int quantidade)
    {
        return "";
    }

    // TODO: caso em que concatenacao simples basta
    static string Formatar(string nome, int idade)
    {
        return "";
    }

    // TODO: AppendLine para as linhas, Insert de um cabecalho,
    //       Replace de ';' por ' | ', e trunque com Length
    static string Tabela(List<string> linhas, int limite)
    {
        return "";
    }

    // TODO: reaproveita o mesmo StringBuilder com Clear()
    static List<string> Reaproveitar(List<string> nomes)
    {
        return new List<string>();
    }

    static void Main()
    {
        string comBuilder = ConstruirComBuilder(2000);
        string comConcat = ConstruirComConcat(2000);

        Console.WriteLine($"iguais: {comBuilder == comConcat}");
        Console.WriteLine($"tamanho: {comBuilder.Length}");
        Console.WriteLine($"inicio: {comBuilder.Substring(0, 6)}");

        long a1 = GC.GetTotalAllocatedBytes(true);
        ConstruirComConcat(2000);
        long a2 = GC.GetTotalAllocatedBytes(true);
        ConstruirComBuilder(2000);
        long a3 = GC.GetTotalAllocatedBytes(true);

        Console.WriteLine($"concat alocou mais: {(a2 - a1) > (a3 - a2)}");
        Console.WriteLine($"builder alocou algo: {a3 - a2 > 0}");

        Console.WriteLine($"formatado: {Formatar("Ana", 30)}");
        Console.WriteLine($"formatado 2: {Formatar("Bruno", 45)}");

        var linhas = new List<string> { "id;nome", "1;Ana", "2;Bruno" };
        Console.WriteLine("tabela:");
        Console.WriteLine(Tabela(linhas, 100));

        Console.WriteLine("truncada:");
        Console.WriteLine(Tabela(linhas, 20));

        var nomes = new List<string> { "ana", "bruno", "carla" };
        Console.WriteLine($"reaproveitado: {string.Join(" / ", Reaproveitar(nomes))}");

        Console.WriteLine($"vazia: [{Tabela(new List<string>(), 100)}]");
        Console.WriteLine($"zero: [{ConstruirComBuilder(0)}]");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Text;

class Program
{
    static string ConstruirComBuilder(int quantidade)
    {
        var construtor = new StringBuilder(quantidade);

        for (int i = 0; i < quantidade; i++)
        {
            construtor.Append('x');
        }

        return construtor.ToString();
    }

    static string ConstruirComConcat(int quantidade)
    {
        string texto = "";

        for (int i = 0; i < quantidade; i++)
        {
            texto += "x";
        }

        return texto;
    }

    static string Formatar(string nome, int idade)
    {
        return nome + " tem " + idade + " anos";
    }

    static string Tabela(List<string> linhas, int limite)
    {
        var construtor = new StringBuilder();

        foreach (string linha in linhas)
        {
            construtor.AppendLine(linha);
        }

        construtor.Insert(0, "RELATORIO" + Environment.NewLine);
        construtor.Replace(";", " | ");

        if (construtor.Length > limite)
        {
            construtor.Length = limite;
        }

        return construtor.ToString().TrimEnd();
    }

    static List<string> Reaproveitar(List<string> nomes)
    {
        var construtor = new StringBuilder();
        var saida = new List<string>();

        foreach (string nome in nomes)
        {
            construtor.Clear();
            construtor.Append('[');
            construtor.Append(nome.ToUpperInvariant());
            construtor.Append(']');
            saida.Add(construtor.ToString());
        }

        return saida;
    }

    static void Main()
    {
        string comBuilder = ConstruirComBuilder(2000);
        string comConcat = ConstruirComConcat(2000);

        Console.WriteLine($"iguais: {comBuilder == comConcat}");
        Console.WriteLine($"tamanho: {comBuilder.Length}");
        Console.WriteLine($"inicio: {comBuilder.Substring(0, 6)}");

        long a1 = GC.GetTotalAllocatedBytes(true);
        ConstruirComConcat(2000);
        long a2 = GC.GetTotalAllocatedBytes(true);
        ConstruirComBuilder(2000);
        long a3 = GC.GetTotalAllocatedBytes(true);

        Console.WriteLine($"concat alocou mais: {(a2 - a1) > (a3 - a2)}");
        Console.WriteLine($"builder alocou algo: {a3 - a2 > 0}");

        Console.WriteLine($"formatado: {Formatar("Ana", 30)}");
        Console.WriteLine($"formatado 2: {Formatar("Bruno", 45)}");

        var linhas = new List<string> { "id;nome", "1;Ana", "2;Bruno" };
        Console.WriteLine("tabela:");
        Console.WriteLine(Tabela(linhas, 100));

        Console.WriteLine("truncada:");
        Console.WriteLine(Tabela(linhas, 20));

        var nomes = new List<string> { "ana", "bruno", "carla" };
        Console.WriteLine($"reaproveitado: {string.Join(" / ", Reaproveitar(nomes))}");

        Console.WriteLine($"vazia: [{Tabela(new List<string>(), 100)}]");
        Console.WriteLine($"zero: [{ConstruirComBuilder(0)}]");
      }
}`,
      hints: [
        '`new StringBuilder(quantidade)` reserva o buffer de uma vez — sem isso, ele dobraria de tamanho várias vezes durante o laço.',
        '`construtor.Length = limite` trunca sem realocar; é mais barato que `ToString().Substring(...)`.',
        '`Insert(0, ...)` põe o cabeçalho no início depois de tudo montado, sem precisar reordenar as chamadas.',
        '`Clear()` no início de cada volta é o que permite reaproveitar o buffer; criar um `StringBuilder` novo por nome desperdiçaria a alocação.',
      ],
      tests: [
        {
          name: 'Construção de texto',
          expectedStdout:
            'iguais: True\ntamanho: 2000\ninicio: xxxxxx\n' +
            'concat alocou mais: True\nbuilder alocou algo: True\n' +
            'formatado: Ana tem 30 anos\nformatado 2: Bruno tem 45 anos\n' +
            'tabela:\nRELATORIO\nid | nome\n1 | Ana\n2 | Bruno\n' +
            'truncada:\nRELATORIO\nid | nome\n' +
            'reaproveitado: [ANA] / [BRUNO] / [CARLA]\n' +
            'vazia: [RELATORIO]\nzero: []',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's08c06l06',
    title: 'struct ou class na prática',
    objective: 'Decidir entre tipo de valor e tipo de referência a partir de critérios objetivos.',
    concept: [
      {
        kind: 'text',
        body:
          'A escolha entre `struct` e `class` costuma ser feita por hábito. Existe um conjunto de critérios objetivos, e a orientação oficial da Microsoft é bem direta: **use `class` por padrão** e `struct` só quando todos os critérios batem.',
      },
      {
        kind: 'table',
        headers: ['Critério para `struct`', 'Por quê'],
        rows: [
          ['representa um valor único', 'ponto, dinheiro, medida, data'],
          ['16 bytes ou menos', 'acima disso a cópia fica cara'],
          ['imutável', 'evita as armadilhas de cópia'],
          ['não é empacotado com frequência', 'o boxing anula o ganho'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'São critérios **conjuntos**, não alternativos. Um `struct` de 64 bytes copiado em cada chamada de método pode ser mais lento que a `class` equivalente — a alocação acontece uma vez, a cópia acontece sempre.',
      },
      {
        kind: 'text',
        body:
          'A armadilha mais séria é o `struct` **mutável**. As lições anteriores já mostraram por quê: cada leitura de um array, de uma lista ou de uma propriedade devolve uma cópia.',
      },
      {
        kind: 'code',
        code: `var lista = new List<Medida> { new Medida { Valor = 5 } };

Medida item = lista[0];
item.Valor = 100;

Console.WriteLine(lista[0].Valor);`,
      },
      {
        kind: 'output',
        code: `5`,
        caption: 'A alteração foi para a cópia. O compilador não avisa, e o bug passa despercebido em revisão.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Por isso a regra prática mais útil: **se for `struct`, faça `readonly struct`**. O compilador passa a impedir mutação, e o problema deixa de ser possível de escrever.',
      },
      {
        kind: 'code',
        code: `readonly struct Imutavel
{
    public readonly int X;

    public Imutavel(int x)
    {
        X = x;
    }

    public Imutavel ComX(int novo) => new Imutavel(novo);
}`,
        caption: 'Para "modificar", devolva uma instância nova — o mesmo padrão de `record` e de `init`.',
      },
      {
        kind: 'text',
        body:
          'Existe uma variante que resolve quase tudo de uma vez: **`record struct`**. Ele gera igualdade estrutural, `ToString`, desconstrução e `with`, e pode ser declarado `readonly`.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'readonly record struct',
          code: `readonly record struct Ponto(int X, int Y);

var a = new Ponto(1, 2);
var b = a with { X = 9 };
Console.WriteLine(a == new Ponto(1, 2));`,
        },
        right: {
          label: 'struct à mão',
          code: `struct Ponto
{
    public int X, Y;
    // Equals, GetHashCode,
    // ToString, ==, !=
    // tudo manual
}`,
        },
        note: 'Para tipos de valor simples, `readonly record struct` é quase sempre a melhor escolha em C# moderno.',
      },
      {
        kind: 'text',
        body: 'Quando o tipo se parece com um valor, mas os critérios não fecham, a decisão fica assim:',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Escolha'],
        rows: [
          ['ponto, cor, dinheiro, intervalo', '`readonly record struct`'],
          ['entidade com identidade (cliente, pedido)', '`class`'],
          ['agregado de dados imutável e grande', '`record` (class)'],
          ['objeto com ciclo de vida e comportamento', '`class`'],
          ['tipo que aparece em milhões de posições de array', '`struct`, se couber em 16 bytes'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Um sinal claro de que deveria ser `class`: o tipo tem **identidade**. Dois clientes com os mesmos dados são clientes diferentes; dois pontos com as mesmas coordenadas são o mesmo ponto.',
      },
    ],
    quiz: [
      {
        id: 's08c06l06q1',
        type: 'single',
        prompt: 'Por que `struct` mutável é problemático?',
        options: [
          { id: 'a', text: 'Cada leitura de coleção ou propriedade devolve uma cópia, e alterações se perdem', correct: true },
          { id: 'b', text: 'Porque structs não podem ter métodos' },
          { id: 'c', text: 'Porque o compilador proíbe mutação em structs' },
          { id: 'd', text: 'Porque structs mutáveis alocam no monte' },
        ],
        explanation:
          '`lista[0].Valor = 100` nem sempre compila, e `var x = lista[0]; x.Valor = 100;` compila e não faz nada. `readonly struct` elimina a classe inteira de erro.',
      },
      {
        id: 's08c06l06q2',
        type: 'single',
        prompt: 'Qual o limite de tamanho recomendado para um `struct`?',
        options: [
          { id: 'a', text: 'Cerca de 16 bytes', correct: true },
          { id: 'b', text: '4 bytes' },
          { id: 'c', text: '1 KB' },
          { id: 'd', text: 'Não há limite recomendado' },
        ],
        explanation:
          'Acima disso o custo de copiar em cada atribuição e chamada supera o de alocar uma vez. É uma orientação, não uma regra rígida — mas um struct de 100 bytes merece revisão.',
      },
      {
        id: 's08c06l06q3',
        type: 'single',
        prompt: 'Qual o sinal mais claro de que um tipo deveria ser `class`?',
        options: [
          { id: 'a', text: 'Ele tem identidade: duas instâncias com os mesmos dados são coisas diferentes', correct: true },
          { id: 'b', text: 'Ele tem mais de três campos' },
          { id: 'c', text: 'Ele precisa de `ToString`' },
          { id: 'd', text: 'Ele é usado em coleções' },
        ],
        explanation:
          'Identidade é a fronteira conceitual. Dois clientes homônimos são clientes distintos; dois pontos (3,4) são o mesmo ponto — o primeiro é `class`, o segundo é `struct`.',
      },
    ],
    challenge: {
      brief:
        'Modele três tipos aplicando os critérios: um valor imutável pequeno, uma entidade com identidade, e demonstre a armadilha do `struct` mutável.',
      requirements: [
        '`Dinheiro` é um `readonly record struct` com aritmética e comparação.',
        '`Cliente` é uma `class`, porque tem identidade.',
        '`ContadorMutavel` é um `struct` mutável, usado apenas para demonstrar a armadilha.',
        'Mostre que alterar um `ContadorMutavel` obtido de uma lista não afeta a lista.',
        'Mostre que dois `Dinheiro` com os mesmos valores são iguais, e dois `Cliente` com os mesmos dados não são.',
        'Use `with` para produzir uma variação de `Dinheiro`.',
        '`Dinheiro` recusa operações entre moedas diferentes.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// TODO: readonly record struct com Valor e Moeda
readonly record struct Dinheiro(decimal Valor, string Moeda)
{
    // TODO: soma; InvalidOperationException para moedas diferentes
    public static Dinheiro operator +(Dinheiro a, Dinheiro b)
    {
        return a;
    }

    // TODO: multiplicacao por inteiro
    public static Dinheiro operator *(Dinheiro a, int fator)
    {
        return a;
    }

    public override string ToString() => $"{Moeda} {Valor:0.00}";
}

// TODO: class, porque tem identidade
class Cliente
{
    public required string Nome { get; init; }
    public required string Documento { get; init; }

    public override string ToString() => $"{Nome}/{Documento}";
}

// Struct mutavel: existe apenas para demonstrar a armadilha.
struct ContadorMutavel
{
    public int Valor;
    public override string ToString() => $"C{Valor}";
}

class Program
{
    // TODO: tenta incrementar o item na posicao dada; devolve o valor na lista depois
    static int TentarIncrementar(List<ContadorMutavel> lista, int posicao)
    {
        return 0;
    }

    // TODO: incrementa de verdade, reescrevendo a posicao
    static int IncrementarDeVerdade(List<ContadorMutavel> lista, int posicao)
    {
        return 0;
    }

    static void Main()
    {
        var a = new Dinheiro(10.50m, "BRL");
        var b = new Dinheiro(4.50m, "BRL");

        Console.WriteLine($"soma: {a + b}");
        Console.WriteLine($"triplo: {a * 3}");
        Console.WriteLine($"iguais: {a == new Dinheiro(10.50m, "BRL")}");
        Console.WriteLine($"diferentes: {a == b}");

        var comOutroValor = a with { Valor = 99m };
        Console.WriteLine($"with: {comOutroValor}");
        Console.WriteLine($"original intacto: {a}");

        var (valor, moeda) = a;
        Console.WriteLine($"desconstruido: {valor} {moeda}");

        var conjunto = new HashSet<Dinheiro> { a, new Dinheiro(10.50m, "BRL"), b };
        Console.WriteLine($"conjunto: {conjunto.Count}");

        try
        {
            var erro = a + new Dinheiro(1m, "USD");
            Console.WriteLine($"nao deveria: {erro}");
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"moedas: {ex.Message}");
        }

        var c1 = new Cliente { Nome = "Ana", Documento = "123" };
        var c2 = new Cliente { Nome = "Ana", Documento = "123" };

        Console.WriteLine($"clientes iguais: {c1 == c2}");
        Console.WriteLine($"mesma referencia: {ReferenceEquals(c1, c1)}");
        Console.WriteLine($"cliente: {c1}");

        var contadores = new List<ContadorMutavel>
        {
            new ContadorMutavel { Valor = 1 },
            new ContadorMutavel { Valor = 2 },
        };

        Console.WriteLine($"tentativa: {TentarIncrementar(contadores, 0)}");
        Console.WriteLine($"lista apos tentativa: {string.Join(",", contadores)}");
        Console.WriteLine($"de verdade: {IncrementarDeVerdade(contadores, 0)}");
        Console.WriteLine($"lista apos: {string.Join(",", contadores)}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

readonly record struct Dinheiro(decimal Valor, string Moeda)
{
    public static Dinheiro operator +(Dinheiro a, Dinheiro b)
    {
        if (a.Moeda != b.Moeda)
        {
            throw new InvalidOperationException("moedas diferentes");
        }

        return new Dinheiro(a.Valor + b.Valor, a.Moeda);
    }

    public static Dinheiro operator *(Dinheiro a, int fator)
    {
        return new Dinheiro(a.Valor * fator, a.Moeda);
    }

    public override string ToString() => $"{Moeda} {Valor:0.00}";
}

class Cliente
{
    public required string Nome { get; init; }
    public required string Documento { get; init; }

    public override string ToString() => $"{Nome}/{Documento}";
}

struct ContadorMutavel
{
    public int Valor;
    public override string ToString() => $"C{Valor}";
}

class Program
{
    static int TentarIncrementar(List<ContadorMutavel> lista, int posicao)
    {
        ContadorMutavel copia = lista[posicao];
        copia.Valor++;
        return lista[posicao].Valor;
    }

    static int IncrementarDeVerdade(List<ContadorMutavel> lista, int posicao)
    {
        ContadorMutavel atual = lista[posicao];
        atual.Valor++;
        lista[posicao] = atual;
        return lista[posicao].Valor;
    }

    static void Main()
    {
        var a = new Dinheiro(10.50m, "BRL");
        var b = new Dinheiro(4.50m, "BRL");

        Console.WriteLine($"soma: {a + b}");
        Console.WriteLine($"triplo: {a * 3}");
        Console.WriteLine($"iguais: {a == new Dinheiro(10.50m, "BRL")}");
        Console.WriteLine($"diferentes: {a == b}");

        var comOutroValor = a with { Valor = 99m };
        Console.WriteLine($"with: {comOutroValor}");
        Console.WriteLine($"original intacto: {a}");

        var (valor, moeda) = a;
        Console.WriteLine($"desconstruido: {valor} {moeda}");

        var conjunto = new HashSet<Dinheiro> { a, new Dinheiro(10.50m, "BRL"), b };
        Console.WriteLine($"conjunto: {conjunto.Count}");

        try
        {
            var erro = a + new Dinheiro(1m, "USD");
            Console.WriteLine($"nao deveria: {erro}");
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"moedas: {ex.Message}");
        }

        var c1 = new Cliente { Nome = "Ana", Documento = "123" };
        var c2 = new Cliente { Nome = "Ana", Documento = "123" };

        Console.WriteLine($"clientes iguais: {c1 == c2}");
        Console.WriteLine($"mesma referencia: {ReferenceEquals(c1, c1)}");
        Console.WriteLine($"cliente: {c1}");

        var contadores = new List<ContadorMutavel>
        {
            new ContadorMutavel { Valor = 1 },
            new ContadorMutavel { Valor = 2 },
        };

        Console.WriteLine($"tentativa: {TentarIncrementar(contadores, 0)}");
        Console.WriteLine($"lista apos tentativa: {string.Join(",", contadores)}");
        Console.WriteLine($"de verdade: {IncrementarDeVerdade(contadores, 0)}");
        Console.WriteLine($"lista apos: {string.Join(",", contadores)}");
    }
}`,
      hints: [
        '`readonly record struct` já gera `==`, `Equals`, `GetHashCode`, `Deconstruct` e `with` — só a aritmética precisa ser escrita.',
        '`Cliente` é uma `class` sem `record`, então `==` compara referências: duas instâncias com os mesmos dados são diferentes. É exatamente o comportamento desejado para uma entidade.',
        '`TentarIncrementar` altera a cópia e a lista permanece intacta; `IncrementarDeVerdade` reescreve a posição, que é a única forma correta com struct mutável.',
        'O `HashSet` guarda dois elementos porque `record struct` gera igualdade estrutural coerente com o `GetHashCode`.',
      ],
      tests: [
        {
          name: 'Escolhendo struct ou class',
          expectedStdout:
            'soma: BRL 15.00\ntriplo: BRL 31.50\niguais: True\ndiferentes: False\n' +
            'with: BRL 99.00\noriginal intacto: BRL 10.50\ndesconstruido: 10.50 BRL\n' +
            'conjunto: 2\nmoedas: moedas diferentes\n' +
            'clientes iguais: False\nmesma referencia: True\ncliente: Ana/123\n' +
            'tentativa: 1\nlista apos tentativa: C1,C2\nde verdade: 2\nlista apos: C2,C2',
        },
      ],
    },
  },

  {
    id: 's08c06l07',
    title: 'Como o GC pensa',
    objective: 'Entender o modelo de gerações e o que ele implica para o código que você escreve.',
    concept: [
      {
        kind: 'text',
        body:
          'O coletor de lixo do .NET opera sobre uma hipótese estatística: **a maioria dos objetos morre jovem**. Variáveis locais, resultados intermediários e strings temporárias vivem alguns microssegundos.',
      },
      {
        kind: 'text',
        body:
          'A partir disso, o monte é dividido em **gerações**, e o coletor visita cada uma com frequência diferente.',
      },
      {
        kind: 'table',
        headers: ['Geração', 'Contém', 'Coletada'],
        rows: [
          ['0', 'objetos recém-criados', 'com muita frequência, e é muito barata'],
          ['1', 'sobreviventes da gen 0', 'ocasionalmente'],
          ['2', 'sobreviventes da gen 1', 'raramente, e é cara'],
          ['LOH', 'objetos acima de ~85 KB', 'junto com a gen 2'],
        ],
      },
      {
        kind: 'code',
        code: `Console.WriteLine(GC.MaxGeneration);

var obj = new object();
Console.WriteLine(GC.GetGeneration(obj));`,
      },
      {
        kind: 'output',
        code: `2
0`,
        caption: 'Três gerações (0, 1 e 2). Todo objeto novo nasce na geração 0.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma coleta de geração 0 é surpreendentemente barata: ela visita apenas os objetos vivos, não os mortos. Se quase tudo morreu, quase nada é visitado — e a geração inteira é liberada de uma vez.',
      },
      {
        kind: 'text',
        body:
          'A consequência prática inverte uma intuição comum: **objetos temporários de vida curta são baratos**. O que custa caro é o objeto que sobrevive a várias coletas e sobe de geração.',
      },
      {
        kind: 'compare',
        good: `// morre na gen 0, custo minimo
for (int i = 0; i < 1000; i++)
{
    var temp = new Resultado(i);
    Processar(temp);
}`,
        bad: `// sobe de geracao, coleta cara
static List<Resultado> cache = new();

for (int i = 0; i < 1000; i++)
{
    cache.Add(new Resultado(i));
}`,
        goodLabel: 'Vida curta',
        badLabel: 'Retido sem necessidade',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O pior padrão é o **cache sem limite**. Ele promove objetos à geração 2, onde a coleta é cara, e nunca os libera. Um vazamento de memória em .NET quase sempre é uma referência esquecida, não memória "perdida".',
      },
      {
        kind: 'text',
        body:
          'Objetos grandes têm regra própria. Acima de aproximadamente 85 KB, eles vão para o **monte de objetos grandes** (LOH), que não é compactado e é coletado só junto com a geração 2.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Um `byte[]` de 100 KB já cai no LOH. Alocar muitos desses em laço fragmenta a memória e força coletas caras — é exatamente o caso em que reaproveitar buffers compensa, tema da próxima lição.',
      },
      {
        kind: 'text',
        body:
          'Sobre chamar `GC.Collect()` manualmente: a regra é **não chame**. O coletor tem informação que o seu código não tem, e uma coleta forçada costuma promover objetos que estavam prestes a morrer.',
      },
      {
        kind: 'compare',
        good: `// deixe o coletor decidir
ProcessarLote();
// nada aqui`,
        bad: `ProcessarLote();
GC.Collect();
GC.WaitForPendingFinalizers();
// promove sobreviventes e
// atrapalha a heuristica`,
        goodLabel: 'Confiar no coletor',
        badLabel: 'Forçar a coleta',
      },
      {
        kind: 'text',
        body:
          'O que **você** controla é quanto lixo produz e por quanto tempo segura referências. Três hábitos resolvem quase tudo: evitar alocação em laços quentes, não guardar o que não vai ser usado, e limitar o tamanho de caches.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '`GC.CollectionCount(0)` e `GC.GetTotalAllocatedBytes()` são as duas medidas úteis para acompanhar isso — a primeira conta coletas, a segunda conta bytes alocados desde o início do processo.',
      },
    ],
    quiz: [
      {
        id: 's08c06l07q1',
        type: 'single',
        prompt: 'Por que uma coleta de geração 0 é barata?',
        options: [
          { id: 'a', text: 'Ela visita apenas os objetos vivos, e a maioria já morreu', correct: true },
          { id: 'b', text: 'Porque a geração 0 é pequena' },
          { id: 'c', text: 'Porque ela não libera memória de verdade' },
          { id: 'd', text: 'Porque roda numa thread separada' },
        ],
        explanation:
          'O custo é proporcional aos sobreviventes, não ao total. É por isso que criar muitos objetos temporários de vida curta é mais barato do que a intuição sugere.',
      },
      {
        id: 's08c06l07q2',
        type: 'single',
        prompt: 'Qual padrão mais atrapalha o coletor?',
        options: [
          { id: 'a', text: 'Um cache sem limite, que promove objetos à geração 2 e nunca os libera', correct: true },
          { id: 'b', text: 'Criar muitos objetos temporários num laço' },
          { id: 'c', text: 'Usar `struct` em vez de `class`' },
          { id: 'd', text: 'Chamar métodos com muitos parâmetros' },
        ],
        explanation:
          'Objetos temporários morrem na gen 0, o caso barato. O cache sem limite empurra tudo para a gen 2, onde a coleta é cara e a memória nunca é devolvida.',
      },
      {
        id: 's08c06l07q3',
        type: 'single',
        prompt: 'Quando chamar `GC.Collect()`?',
        options: [
          { id: 'a', text: 'Praticamente nunca: costuma piorar promovendo objetos que iam morrer', correct: true },
          { id: 'b', text: 'Ao final de cada método pesado' },
          { id: 'c', text: 'Sempre que a memória passar de 100 MB' },
          { id: 'd', text: 'Antes de cada alocação grande' },
        ],
        explanation:
          'O coletor usa informação em tempo de execução que o código não tem. Uma coleta no momento errado promove sobreviventes acidentais para gerações mais caras.',
      },
    ],
    challenge: {
      brief:
        'Observe o coletor em ação: compare objetos de vida curta com objetos retidos, meça alocações e coletas, e demonstre que soltar referências permite a liberação.',
      requirements: [
        'Use `GC.GetTotalAllocatedBytes(true)` e `GC.CollectionCount(0)` para medir.',
        'Imprima apenas comparações booleanas, nunca números absolutos de bytes ou coletas.',
        '`VidaCurta` cria objetos que morrem imediatamente; `Retidos` os guarda numa lista.',
        'Mostre que os dois alocam quantidades semelhantes, mas só um retém.',
        '`GeracaoDe` mostra a geração de um objeto recém-criado.',
        '`Grande` demonstra que um array acima de 85 KB nasce numa geração alta.',
        '`Soltar` mostra que, após limpar a lista, uma coleta libera a memória.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Registro
{
    public int Id { get; init; }
    public string Rotulo { get; init; } = "";
}

class Program
{
    // TODO: cria e descarta; devolve a soma dos ids
    static long VidaCurta(int quantidade)
    {
        return 0;
    }

    // TODO: cria e guarda na lista recebida; devolve a soma dos ids
    static long Retidos(int quantidade, List<Registro> deposito)
    {
        return 0;
    }

    // TODO: geracao de um objeto recem-criado
    static int GeracaoDeNovo()
    {
        return -1;
    }

    // TODO: geracao de um array de 'bytes' bytes recem-criado
    static int GeracaoDeGrande(int bytes)
    {
        return -1;
    }

    static void Main()
    {
        Console.WriteLine($"geracoes: {GC.MaxGeneration}");
        Console.WriteLine($"objeto novo na gen 0: {GeracaoDeNovo() == 0}");
        Console.WriteLine($"array pequeno na gen 0: {GeracaoDeGrande(1000) == 0}");
        Console.WriteLine($"array grande em gen alta: {GeracaoDeGrande(200000) >= 2}");

        long a1 = GC.GetTotalAllocatedBytes(true);
        long somaCurta = VidaCurta(200000);
        long a2 = GC.GetTotalAllocatedBytes(true);

        var deposito = new List<Registro>();
        long somaRetida = Retidos(200000, deposito);
        long a3 = GC.GetTotalAllocatedBytes(true);

        Console.WriteLine($"somas iguais: {somaCurta == somaRetida}");
        Console.WriteLine($"soma: {somaCurta}");
        Console.WriteLine($"vida curta alocou: {a2 - a1 > 1000000}");
        Console.WriteLine($"retidos alocaram ordem parecida: {(a3 - a2) > (a2 - a1) / 2}");
        Console.WriteLine($"retidos ainda vivos: {deposito.Count}");

        int antesDeSoltar = GC.CollectionCount(0);
        deposito.Clear();
        GC.Collect();
        int depoisDeSoltar = GC.CollectionCount(0);

        Console.WriteLine($"coleta aconteceu: {depoisDeSoltar > antesDeSoltar}");
        Console.WriteLine($"deposito vazio: {deposito.Count}");

        var sobrevivente = new Registro { Id = 1, Rotulo = "vive" };
        int antes = GC.GetGeneration(sobrevivente);
        GC.Collect();
        int depois = GC.GetGeneration(sobrevivente);

        Console.WriteLine($"promovido: {depois > antes}");
        Console.WriteLine($"ainda acessivel: {sobrevivente.Rotulo}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Registro
{
    public int Id { get; init; }
    public string Rotulo { get; init; } = "";
}

class Program
{
    static long VidaCurta(int quantidade)
    {
        long soma = 0;

        for (int i = 0; i < quantidade; i++)
        {
            var r = new Registro { Id = i, Rotulo = "temp" };
            soma += r.Id;
        }

        return soma;
    }

    static long Retidos(int quantidade, List<Registro> deposito)
    {
        long soma = 0;

        for (int i = 0; i < quantidade; i++)
        {
            var r = new Registro { Id = i, Rotulo = "temp" };
            deposito.Add(r);
            soma += r.Id;
        }

        return soma;
    }

    static int GeracaoDeNovo()
    {
        var obj = new Registro { Id = 0 };
        return GC.GetGeneration(obj);
    }

    static int GeracaoDeGrande(int bytes)
    {
        var buffer = new byte[bytes];
        buffer[0] = 1;
        return GC.GetGeneration(buffer);
    }

    static void Main()
    {
        Console.WriteLine($"geracoes: {GC.MaxGeneration}");
        Console.WriteLine($"objeto novo na gen 0: {GeracaoDeNovo() == 0}");
        Console.WriteLine($"array pequeno na gen 0: {GeracaoDeGrande(1000) == 0}");
        Console.WriteLine($"array grande em gen alta: {GeracaoDeGrande(200000) >= 2}");

        long a1 = GC.GetTotalAllocatedBytes(true);
        long somaCurta = VidaCurta(200000);
        long a2 = GC.GetTotalAllocatedBytes(true);

        var deposito = new List<Registro>();
        long somaRetida = Retidos(200000, deposito);
        long a3 = GC.GetTotalAllocatedBytes(true);

        Console.WriteLine($"somas iguais: {somaCurta == somaRetida}");
        Console.WriteLine($"soma: {somaCurta}");
        Console.WriteLine($"vida curta alocou: {a2 - a1 > 1000000}");
        Console.WriteLine($"retidos alocaram ordem parecida: {(a3 - a2) > (a2 - a1) / 2}");
        Console.WriteLine($"retidos ainda vivos: {deposito.Count}");

        int antesDeSoltar = GC.CollectionCount(0);
        deposito.Clear();
        GC.Collect();
        int depoisDeSoltar = GC.CollectionCount(0);

        Console.WriteLine($"coleta aconteceu: {depoisDeSoltar > antesDeSoltar}");
        Console.WriteLine($"deposito vazio: {deposito.Count}");

        var sobrevivente = new Registro { Id = 1, Rotulo = "vive" };
        int antes = GC.GetGeneration(sobrevivente);
        GC.Collect();
        int depois = GC.GetGeneration(sobrevivente);

        Console.WriteLine($"promovido: {depois > antes}");
        Console.WriteLine($"ainda acessivel: {sobrevivente.Rotulo}");
    }
}`,
      hints: [
        'Os dois métodos alocam a mesma quantidade de objetos; a diferença é que um deles guarda as referências e impede a coleta.',
        'Um `byte[]` de 200.000 bytes passa do limite do LOH e nasce direto numa geração alta — o `GetGeneration` confirma.',
        '`GC.Collect()` aparece aqui **apenas** para demonstrar o mecanismo. Em código real, a lição é justamente não chamá-lo.',
        'O objeto que sobrevive à coleta é promovido: a geração dele sobe de 0 para 1.',
      ],
      tests: [
        {
          name: 'Observando o coletor',
          expectedStdout:
            'geracoes: 2\nobjeto novo na gen 0: True\narray pequeno na gen 0: True\n' +
            'array grande em gen alta: True\n' +
            'somas iguais: True\nsoma: 19999900000\n' +
            'vida curta alocou: True\nretidos alocaram ordem parecida: True\nretidos ainda vivos: 200000\n' +
            'coleta aconteceu: True\ndeposito vazio: 0\n' +
            'promovido: True\nainda acessivel: vive',
        },
      ],
      timeoutMs: 15000,
    },
  },

  {
    id: 's08c06l08',
    title: 'Reaproveitando buffers',
    objective: 'Evitar alocações repetidas em caminhos quentes com `ArrayPool<T>`.',
    concept: [
      {
        kind: 'text',
        body:
          'Alocar um array a cada iteração de um laço quente é um dos padrões mais caros que existem — especialmente quando o array passa de 85 KB e vai parar no monte de objetos grandes.',
      },
      {
        kind: 'code',
        code: `for (int i = 0; i < 1000; i++)
{
    var buffer = new int[256];
    Processar(buffer);
}`,
        caption: 'Mil arrays criados e descartados. Todos viram lixo imediatamente.',
      },
      {
        kind: 'text',
        body:
          '`ArrayPool<T>` mantém arrays já alocados prontos para uso. Você **aluga** um, usa, e **devolve** — sem alocação nova entre uma volta e outra.',
      },
      {
        kind: 'code',
        code: `var pool = ArrayPool<int>.Shared;

int[] buffer = pool.Rent(256);

try
{
    Processar(buffer.AsSpan(0, 256));
}
finally
{
    pool.Return(buffer);
}`,
        caption: 'O `try`/`finally` garante a devolução mesmo com exceção. Requer `using System.Buffers;`.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`Rent(256)` pode devolver um array **maior** que 256 — o pool trabalha com tamanhos padronizados. Sempre use `buffer.Length` com cuidado e trabalhe sobre uma fatia do tamanho que você pediu.',
      },
      {
        kind: 'compare',
        good: `int[] buffer = pool.Rent(n);
Span<int> util = buffer.AsSpan(0, n);
// trabalhe so em 'util'`,
        bad: `int[] buffer = pool.Rent(n);
for (int i = 0; i < buffer.Length; i++)
{
    // percorre alem do que voce pediu,
    // sobre lixo de um uso anterior
}`,
        goodLabel: 'Usa só o tamanho pedido',
        badLabel: 'Confia em `buffer.Length`',
      },
      {
        kind: 'text',
        body:
          'A segunda armadilha é o **conteúdo antigo**. Um array devolvido ao pool mantém os dados do uso anterior; quem o alugar em seguida encontra esse lixo.',
      },
      {
        kind: 'code',
        code: `pool.Return(buffer, clearArray: true);`,
        caption: '`clearArray: true` zera antes de devolver. Custa tempo, mas evita vazar dados entre usos.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A regra prática: **limpe quando o conteúdo for sensível** — senhas, dados pessoais, chaves. Para dados comuns, não limpe e escreva o código de forma a nunca ler além do que escreveu.',
      },
      {
        kind: 'text',
        body:
          'A terceira armadilha é a mais grave: **usar o array depois de devolvê-lo**. A partir do `Return`, o array pertence ao pool e pode ser entregue a outro trecho de código a qualquer momento.',
      },
      {
        kind: 'compare',
        good: `int[] buffer = pool.Rent(n);
try
{
    var resultado = Processar(buffer, n);
    return resultado;   // copia o que precisa
}
finally
{
    pool.Return(buffer);
}`,
        bad: `int[] buffer = pool.Rent(n);
pool.Return(buffer);
return buffer;   // devolvido E retornado
// outro codigo vai sobrescrever`,
        goodLabel: 'Devolve por último',
        badLabel: 'Usa após devolver',
      },
      {
        kind: 'text',
        body:
          'O ganho é mensurável. Mil alocações de 256 inteiros contra mil aluguéis do mesmo array: a diferença de bytes alocados é de mais de uma ordem de grandeza.',
      },
      {
        kind: 'output',
        code: `pool alocou menos: True`,
        caption: 'Medido com `GC.GetTotalAllocatedBytes`. O pool aloca uma vez e reaproveita.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Como todas as técnicas deste capítulo, isso só vale em caminhos quentes. Num método chamado dez vezes, `new int[256]` é mais simples, mais legível e não tem nenhuma das três armadilhas.',
      },
    ],
    quiz: [
      {
        id: 's08c06l08q1',
        type: 'single',
        prompt: 'O que `pool.Rent(256)` garante sobre o tamanho do array devolvido?',
        options: [
          { id: 'a', text: 'Que ele tem **pelo menos** 256 posições, podendo ter mais', correct: true },
          { id: 'b', text: 'Que ele tem exatamente 256' },
          { id: 'c', text: 'Que ele tem no máximo 256' },
          { id: 'd', text: 'Que ele está zerado' },
        ],
        explanation:
          'O pool trabalha com tamanhos padronizados. Por isso o código deve operar sobre uma fatia do tamanho pedido, não sobre `buffer.Length`.',
      },
      {
        id: 's08c06l08q2',
        type: 'single',
        prompt: 'Qual o erro mais grave ao usar `ArrayPool<T>`?',
        options: [
          { id: 'a', text: 'Continuar usando o array depois de devolvê-lo ao pool', correct: true },
          { id: 'b', text: 'Esquecer de chamar `clearArray: true`' },
          { id: 'c', text: 'Alugar um array maior que o necessário' },
          { id: 'd', text: 'Usar `ArrayPool<T>.Shared` em vez de criar um pool próprio' },
        ],
        explanation:
          'Depois do `Return`, o array pode ser entregue a outro trecho de código. Escrever nele corrompe dados alheios — e o bug aparece em lugar completamente diferente.',
      },
      {
        id: 's08c06l08q3',
        type: 'single',
        prompt: 'Quando usar `Return(buffer, clearArray: true)`?',
        options: [
          { id: 'a', text: 'Quando o conteúdo é sensível e não deve vazar para o próximo usuário', correct: true },
          { id: 'b', text: 'Sempre, por segurança' },
          { id: 'c', text: 'Nunca: limpar é responsabilidade de quem aluga' },
          { id: 'd', text: 'Somente para arrays maiores que 85 KB' },
        ],
        explanation:
          'Limpar custa tempo proporcional ao tamanho. Para dados comuns, basta escrever o código de forma a nunca ler além do que foi escrito.',
      },
    ],
    challenge: {
      brief:
        'Implemente um processador de lotes que reaproveita buffers com `ArrayPool<T>`, aplicando as três precauções, e prove pela medição que ele aloca menos que a versão com `new`.',
      requirements: [
        'Use `ArrayPool<int>.Shared` com `try` / `finally` em todo aluguel.',
        'Trabalhe sempre sobre uma fatia do tamanho pedido, nunca sobre `buffer.Length`.',
        '`ProcessarSensivel` devolve com `clearArray: true` e prova que o próximo aluguel vem zerado.',
        '`ProcessarComPool` e `ProcessarComNew` devem produzir resultados idênticos.',
        'Compare as alocações e imprima apenas o booleano.',
        '`Reaproveitado` demonstra que o mesmo array volta do pool.',
      ],
      starterCode: `using System;
using System.Buffers;
using System.Collections.Generic;

class Program
{
    // TODO: preenche a fatia com i*i e devolve a soma
    static long Calcular(Span<int> buffer)
    {
        return 0;
    }

    // TODO: aluga, calcula, devolve — com try/finally
    static long ProcessarComPool(int voltas, int tamanho)
    {
        return 0;
    }

    // TODO: mesma coisa com new a cada volta
    static long ProcessarComNew(int voltas, int tamanho)
    {
        return 0;
    }

    // TODO: escreve dados, devolve com clearArray: true,
    //       aluga de novo e devolve o primeiro elemento encontrado
    static int ProcessarSensivel(int tamanho)
    {
        return -1;
    }

    // TODO: aluga, devolve, aluga de novo; true se veio o mesmo array
    static bool Reaproveitado(int tamanho)
    {
        return false;
    }

    static void Main()
    {
        Console.WriteLine($"pool >= pedido: {ArrayPool<int>.Shared.Rent(100).Length >= 100}");

        long comPool = ProcessarComPool(1000, 256);
        long comNew = ProcessarComNew(1000, 256);

        Console.WriteLine($"resultados iguais: {comPool == comNew}");
        Console.WriteLine($"resultado: {comPool}");

        long a1 = GC.GetTotalAllocatedBytes(true);
        ProcessarComNew(1000, 256);
        long a2 = GC.GetTotalAllocatedBytes(true);
        ProcessarComPool(1000, 256);
        long a3 = GC.GetTotalAllocatedBytes(true);

        Console.WriteLine($"new alocou bastante: {a2 - a1 > 500000}");
        Console.WriteLine($"pool alocou muito menos: {(a3 - a2) < (a2 - a1) / 10}");

        Console.WriteLine($"sensivel limpo: {ProcessarSensivel(64)}");
        Console.WriteLine($"reaproveitado: {Reaproveitado(512)}");

        Console.WriteLine($"lote pequeno: {ProcessarComPool(3, 4)}");
        Console.WriteLine($"lote unitario: {ProcessarComPool(1, 1)}");
        Console.WriteLine($"zero voltas: {ProcessarComPool(0, 10)}");
    }
}`,
      solution: `using System;
using System.Buffers;
using System.Collections.Generic;

class Program
{
    static long Calcular(Span<int> buffer)
    {
        long soma = 0;

        for (int i = 0; i < buffer.Length; i++)
        {
            buffer[i] = i * i;
            soma += buffer[i];
        }

        return soma;
    }

    static long ProcessarComPool(int voltas, int tamanho)
    {
        var pool = ArrayPool<int>.Shared;
        long total = 0;

        for (int v = 0; v < voltas; v++)
        {
            int[] buffer = pool.Rent(tamanho);

            try
            {
                total += Calcular(buffer.AsSpan(0, tamanho));
            }
            finally
            {
                pool.Return(buffer);
            }
        }

        return total;
    }

    static long ProcessarComNew(int voltas, int tamanho)
    {
        long total = 0;

        for (int v = 0; v < voltas; v++)
        {
            var buffer = new int[tamanho];
            total += Calcular(buffer.AsSpan(0, tamanho));
        }

        return total;
    }

    static int ProcessarSensivel(int tamanho)
    {
        var pool = ArrayPool<int>.Shared;
        int[] buffer = pool.Rent(tamanho);

        try
        {
            for (int i = 0; i < tamanho; i++)
            {
                buffer[i] = 12345;
            }
        }
        finally
        {
            pool.Return(buffer, clearArray: true);
        }

        int[] outro = pool.Rent(tamanho);

        try
        {
            return outro[0];
        }
        finally
        {
            pool.Return(outro);
        }
    }

    static bool Reaproveitado(int tamanho)
    {
        var pool = ArrayPool<int>.Shared;

        int[] primeiro = pool.Rent(tamanho);
        pool.Return(primeiro);

        int[] segundo = pool.Rent(tamanho);
        bool mesmo = ReferenceEquals(primeiro, segundo);
        pool.Return(segundo);

        return mesmo;
    }

    static void Main()
    {
        Console.WriteLine($"pool >= pedido: {ArrayPool<int>.Shared.Rent(100).Length >= 100}");

        long comPool = ProcessarComPool(1000, 256);
        long comNew = ProcessarComNew(1000, 256);

        Console.WriteLine($"resultados iguais: {comPool == comNew}");
        Console.WriteLine($"resultado: {comPool}");

        long a1 = GC.GetTotalAllocatedBytes(true);
        ProcessarComNew(1000, 256);
        long a2 = GC.GetTotalAllocatedBytes(true);
        ProcessarComPool(1000, 256);
        long a3 = GC.GetTotalAllocatedBytes(true);

        Console.WriteLine($"new alocou bastante: {a2 - a1 > 500000}");
        Console.WriteLine($"pool alocou muito menos: {(a3 - a2) < (a2 - a1) / 10}");

        Console.WriteLine($"sensivel limpo: {ProcessarSensivel(64)}");
        Console.WriteLine($"reaproveitado: {Reaproveitado(512)}");

        Console.WriteLine($"lote pequeno: {ProcessarComPool(3, 4)}");
        Console.WriteLine($"lote unitario: {ProcessarComPool(1, 1)}");
        Console.WriteLine($"zero voltas: {ProcessarComPool(0, 10)}");
    }
}`,
      hints: [
        '`Calcular` recebe `Span<int>` e usa `buffer.Length` — mas o span já foi fatiado no tamanho certo por quem chamou, então é seguro.',
        '`buffer.AsSpan(0, tamanho)` é a linha que aplica a primeira precaução: nunca confiar no tamanho real do array alugado.',
        'Em `ProcessarSensivel`, o segundo aluguel provavelmente recebe o mesmo array de volta — zerado, por causa do `clearArray: true`.',
        'A soma de `i*i` para `i` de 0 a 255 é 5.559.680; multiplicada por mil voltas dá o resultado esperado.',
      ],
      tests: [
        {
          name: 'Reaproveitando buffers',
          expectedStdout:
            'pool >= pedido: True\n' +
            'resultados iguais: True\nresultado: 5559680000\n' +
            'new alocou bastante: True\npool alocou muito menos: True\n' +
            'sensivel limpo: 0\nreaproveitado: True\n' +
            'lote pequeno: 42\nlote unitario: 0\nzero voltas: 0',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's08c06l09',
    title: 'Prática: medindo antes de otimizar',
    objective: 'Estabelecer um método de medição confiável antes de mudar qualquer linha por desempenho.',
    concept: [
      {
        kind: 'text',
        body:
          'Todas as técnicas deste capítulo têm um pré-requisito: **medir**. Otimizar sem medir é adivinhar, e a intuição sobre desempenho erra com frequência notável.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O erro mais comum não é otimizar errado — é otimizar o lugar errado. Um método que consome 2% do tempo, acelerado em 10 vezes, melhora o programa em 1,8%. O trabalho foi todo desperdiçado.',
      },
      {
        kind: 'text',
        body: 'Existem três coisas mensuráveis, e elas têm confiabilidade bem diferente:',
      },
      {
        kind: 'table',
        headers: ['Medida', 'Determinística?', 'Ferramenta'],
        rows: [
          ['operações executadas', 'sim', 'contador no código'],
          ['bytes alocados', 'quase sempre', '`GC.GetTotalAllocatedBytes`'],
          ['tempo decorrido', '**não**', '`Stopwatch`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Contagem de operações é a medida mais confiável e a mais ignorada. Ela não depende de máquina, de carga, nem de compilação — e responde diretamente à pergunta "esse algoritmo faz trabalho demais?".',
      },
      {
        kind: 'text',
        body:
          'Tempo é a medida que todo mundo quer e a menos confiável. Num ambiente compartilhado ela varia a cada execução, e a primeira medição sempre inclui o custo de compilação sob demanda.',
      },
      {
        kind: 'compare',
        good: `long antes = GC.GetTotalAllocatedBytes(true);
Processar();
long depois = GC.GetTotalAllocatedBytes(true);

Console.WriteLine(depois - antes > limite);`,
        bad: `var sw = Stopwatch.StartNew();
Processar();
sw.Stop();

Console.WriteLine(sw.ElapsedMilliseconds);
// numero diferente a cada execucao`,
        goodLabel: 'Alocação: reprodutível',
        badLabel: 'Tempo: instável',
      },
      {
        kind: 'text',
        body:
          'Quando o tempo é realmente a métrica que importa, há três cuidados mínimos: aquecer antes de medir, repetir muitas vezes, e comparar em vez de reportar valores absolutos.',
      },
      {
        kind: 'table',
        headers: ['Cuidado', 'Motivo'],
        rows: [
          ['executar uma vez antes de medir', 'a primeira chamada inclui compilação sob demanda'],
          ['repetir milhares de vezes', 'diluir o ruído do relógio e do sistema'],
          ['comparar A com B na mesma execução', 'condições iguais para os dois'],
          ['nunca reportar o número absoluto', 'ele não se reproduz em outra máquina'],
        ],
      },
      {
        kind: 'text',
        body:
          'O ciclo completo de otimização tem quatro passos, e pular qualquer um deles costuma custar mais do que a otimização economiza.',
      },
      {
        kind: 'table',
        headers: ['Passo', 'Pergunta'],
        rows: [
          ['1. medir', 'onde o tempo ou a memória está indo de verdade?'],
          ['2. entender', 'por que essa parte custa tanto?'],
          ['3. mudar', 'qual é a menor mudança que resolve?'],
          ['4. medir de novo', 'melhorou mesmo, e quanto?'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O passo 4 é o mais pulado e o mais importante. Uma "otimização" que não foi medida depois pode ter piorado o desempenho **e** a legibilidade ao mesmo tempo.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Antes de qualquer micro-otimização, verifique a complexidade. Trocar um algoritmo O(n²) por um O(n log n) ganha mais que todas as técnicas deste capítulo somadas — e a Seção 7 já ensinou a fazer isso.',
      },
      {
        kind: 'text',
        body:
          'Em projetos reais, a ferramenta padrão é o **BenchmarkDotNet**, que cuida do aquecimento, das repetições e da análise estatística. Aqui vamos construir uma versão mínima do mesmo raciocínio.',
      },
    ],
    quiz: [
      {
        id: 's08c06l09q1',
        type: 'single',
        prompt: 'Qual a medida mais confiável de desempenho?',
        options: [
          { id: 'a', text: 'Contagem de operações executadas', correct: true },
          { id: 'b', text: 'Tempo em milissegundos' },
          { id: 'c', text: 'Uso de CPU' },
          { id: 'd', text: 'Número de linhas de código' },
        ],
        explanation:
          'A contagem é determinística e independente de máquina. Alocação vem em segundo lugar; tempo é útil, mas é a mais ruidosa das três.',
      },
      {
        id: 's08c06l09q2',
        type: 'single',
        prompt: 'Por que executar o código uma vez antes de medir o tempo?',
        options: [
          { id: 'a', text: 'A primeira chamada inclui a compilação sob demanda do método', correct: true },
          { id: 'b', text: 'Para aquecer o processador' },
          { id: 'c', text: 'Para o coletor de lixo rodar' },
          { id: 'd', text: 'Não é necessário' },
        ],
        explanation:
          'O .NET compila para código nativo na primeira execução de cada método. Medir essa chamada mede o compilador, não o algoritmo.',
      },
      {
        id: 's08c06l09q3',
        type: 'single',
        prompt: 'Qual passo do ciclo de otimização é mais frequentemente pulado?',
        options: [
          { id: 'a', text: 'Medir de novo depois da mudança', correct: true },
          { id: 'b', text: 'Medir antes' },
          { id: 'c', text: 'Entender a causa' },
          { id: 'd', text: 'Fazer a mudança' },
        ],
        explanation:
          'Sem a segunda medição não há como saber se a mudança ajudou. Muitas "otimizações" pioram o desempenho e ninguém percebe.',
      },
    ],
    challenge: {
      brief:
        'Construa um micro-arcabouço de medição que compara duas implementações contando operações e alocações, e use-o para decidir qual versão de um algoritmo é melhor.',
      requirements: [
        'O arcabouço mede **operações** e **alocações**, nunca tempo.',
        '`Medir` executa um aquecimento antes da medição real.',
        '`BuscaLinear` e `BuscaBinaria` contam comparações num contador compartilhado.',
        '`ConcatEmLaco` e `ComBuilder` produzem o mesmo texto com custos diferentes de alocação.',
        '`Comparar` devolve qual das duas fez menos operações.',
        'Todas as saídas de alocação são booleanas ou razões arredondadas, nunca bytes absolutos.',
        '`Relatorio` monta o resumo das medições.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Text;

class Medicao
{
    public required string Nome { get; init; }
    public long Operacoes { get; init; }
    public bool Alocou { get; init; }

    public override string ToString() => $"{Nome}: {Operacoes} ops, alocou={Alocou}";
}

class Program
{
    static long operacoes;

    static void Zerar() => operacoes = 0;

    // TODO: aquece uma vez, zera, executa e mede alocacao
    static Medicao Medir(string nome, Action acao)
    {
        return new Medicao { Nome = nome };
    }

    // TODO: busca linear contando comparacoes em 'operacoes'
    static int BuscaLinear(int[] dados, int alvo)
    {
        return -1;
    }

    // TODO: busca binaria contando comparacoes em 'operacoes'
    static int BuscaBinaria(int[] dados, int alvo)
    {
        return -1;
    }

    // TODO: concatena com += contando cada volta
    static string ConcatEmLaco(int voltas)
    {
        return "";
    }

    // TODO: mesma coisa com StringBuilder
    static string ComBuilder(int voltas)
    {
        return "";
    }

    // TODO: devolve o nome da medicao com menos operacoes; empate devolve a primeira
    static string Comparar(Medicao a, Medicao b)
    {
        return "";
    }

    // TODO: uma linha por medicao
    static string Relatorio(List<Medicao> medicoes)
    {
        return "";
    }

    static void Main()
    {
        var dados = new int[10000];

        for (int i = 0; i < dados.Length; i++)
        {
            dados[i] = i * 2;
        }

        int alvo = 19998;

        Medicao linear = Medir("linear", () => BuscaLinear(dados, alvo));
        Medicao binaria = Medir("binaria", () => BuscaBinaria(dados, alvo));

        Console.WriteLine(linear);
        Console.WriteLine(binaria);
        Console.WriteLine($"vencedora: {Comparar(linear, binaria)}");
        Console.WriteLine($"binaria fez menos de 20 ops: {binaria.Operacoes < 20}");
        Console.WriteLine($"linear fez mais de 1000: {linear.Operacoes > 1000}");

        Console.WriteLine($"linear achou: {BuscaLinear(dados, alvo)}");
        Console.WriteLine($"binaria achou: {BuscaBinaria(dados, alvo)}");
        Console.WriteLine($"ausente linear: {BuscaLinear(dados, 7)}");
        Console.WriteLine($"ausente binaria: {BuscaBinaria(dados, 7)}");

        Medicao concat = Medir("concat", () => ConcatEmLaco(2000));
        Medicao builder = Medir("builder", () => ComBuilder(2000));

        Console.WriteLine($"textos iguais: {ConcatEmLaco(100) == ComBuilder(100)}");
        Console.WriteLine($"mesmas operacoes: {concat.Operacoes == builder.Operacoes}");
        Console.WriteLine($"concat alocou: {concat.Alocou}");

        Console.WriteLine("relatorio:");
        Console.WriteLine(Relatorio(new List<Medicao> { linear, binaria, concat, builder }));
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Text;

class Medicao
{
    public required string Nome { get; init; }
    public long Operacoes { get; init; }
    public bool Alocou { get; init; }

    public override string ToString() => $"{Nome}: {Operacoes} ops, alocou={Alocou}";
}

class Program
{
    static long operacoes;

    static void Zerar() => operacoes = 0;

    static Medicao Medir(string nome, Action acao)
    {
        acao();

        Zerar();
        long antes = GC.GetTotalAllocatedBytes(true);
        acao();
        long depois = GC.GetTotalAllocatedBytes(true);

        return new Medicao
        {
            Nome = nome,
            Operacoes = operacoes,
            Alocou = depois - antes > 10000,
        };
    }

    static int BuscaLinear(int[] dados, int alvo)
    {
        for (int i = 0; i < dados.Length; i++)
        {
            operacoes++;

            if (dados[i] == alvo)
            {
                return i;
            }
        }

        return -1;
    }

    static int BuscaBinaria(int[] dados, int alvo)
    {
        int inicio = 0;
        int fim = dados.Length - 1;

        while (inicio <= fim)
        {
            operacoes++;
            int meio = inicio + (fim - inicio) / 2;

            if (dados[meio] == alvo)
            {
                return meio;
            }

            if (dados[meio] < alvo)
            {
                inicio = meio + 1;
            }
            else
            {
                fim = meio - 1;
            }
        }

        return -1;
    }

    static string ConcatEmLaco(int voltas)
    {
        string texto = "";

        for (int i = 0; i < voltas; i++)
        {
            operacoes++;
            texto += "x";
        }

        return texto;
    }

    static string ComBuilder(int voltas)
    {
        var construtor = new StringBuilder(voltas);

        for (int i = 0; i < voltas; i++)
        {
            operacoes++;
            construtor.Append('x');
        }

        return construtor.ToString();
    }

    static string Comparar(Medicao a, Medicao b)
    {
        return a.Operacoes <= b.Operacoes ? a.Nome : b.Nome;
    }

    static string Relatorio(List<Medicao> medicoes)
    {
        var construtor = new StringBuilder();

        foreach (Medicao m in medicoes)
        {
            construtor.AppendLine($"  {m}");
        }

        return construtor.ToString().TrimEnd();
    }

    static void Main()
    {
        var dados = new int[10000];

        for (int i = 0; i < dados.Length; i++)
        {
            dados[i] = i * 2;
        }

        int alvo = 19998;

        Medicao linear = Medir("linear", () => BuscaLinear(dados, alvo));
        Medicao binaria = Medir("binaria", () => BuscaBinaria(dados, alvo));

        Console.WriteLine(linear);
        Console.WriteLine(binaria);
        Console.WriteLine($"vencedora: {Comparar(linear, binaria)}");
        Console.WriteLine($"binaria fez menos de 20 ops: {binaria.Operacoes < 20}");
        Console.WriteLine($"linear fez mais de 1000: {linear.Operacoes > 1000}");

        Console.WriteLine($"linear achou: {BuscaLinear(dados, alvo)}");
        Console.WriteLine($"binaria achou: {BuscaBinaria(dados, alvo)}");
        Console.WriteLine($"ausente linear: {BuscaLinear(dados, 7)}");
        Console.WriteLine($"ausente binaria: {BuscaBinaria(dados, 7)}");

        Medicao concat = Medir("concat", () => ConcatEmLaco(2000));
        Medicao builder = Medir("builder", () => ComBuilder(2000));

        Console.WriteLine($"textos iguais: {ConcatEmLaco(100) == ComBuilder(100)}");
        Console.WriteLine($"mesmas operacoes: {concat.Operacoes == builder.Operacoes}");
        Console.WriteLine($"concat alocou: {concat.Alocou}");

        Console.WriteLine("relatorio:");
        Console.WriteLine(Relatorio(new List<Medicao> { linear, binaria, concat, builder }));
    }
}`,
      hints: [
        '`Medir` chama a ação uma vez antes de zerar o contador — esse é o aquecimento, e ele descarta o custo da compilação sob demanda.',
        'As duas buscas fazem o mesmo trabalho lógico, mas a contagem de comparações mostra a diferença de complexidade sem medir tempo.',
        '`ConcatEmLaco` e `ComBuilder` executam o **mesmo** número de operações; a diferença está inteiramente na alocação.',
        'O alvo `19998` é o último elemento do array, então a busca linear percorre tudo — o pior caso, que é o que interessa comparar.',
      ],
      tests: [
        {
          name: 'Medindo antes de otimizar',
          expectedStdout:
            'linear: 10000 ops, alocou=False\nbinaria: 14 ops, alocou=False\n' +
            'vencedora: binaria\nbinaria fez menos de 20 ops: True\nlinear fez mais de 1000: True\n' +
            'linear achou: 9999\nbinaria achou: 9999\nausente linear: -1\nausente binaria: -1\n' +
            'textos iguais: True\nmesmas operacoes: True\nconcat alocou: True\n' +
            'relatorio:\n' +
            '  linear: 10000 ops, alocou=False\n' +
            '  binaria: 14 ops, alocou=False\n' +
            '  concat: 2000 ops, alocou=True\n' +
            '  builder: 2000 ops, alocou=False',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's08c06l10',
    title: 'Checkpoint: desempenho',
    objective: 'Aplicar as técnicas do capítulo na ordem certa, e saber quando não aplicá-las.',
    concept: [
      {
        kind: 'text',
        body:
          'Este capítulo apresentou seis técnicas. A habilidade que importa não é conhecê-las — é saber **em que ordem** considerá-las, e quando parar.',
      },
      {
        kind: 'table',
        headers: ['Ordem', 'O quê', 'Ganho típico'],
        rows: [
          ['1', 'trocar o algoritmo (complexidade)', 'ordens de grandeza'],
          ['2', 'evitar trabalho repetido (cache, materializar)', 'grande'],
          ['3', 'evitar alocação em laço quente (`StringBuilder`, pool)', 'moderado'],
          ['4', 'evitar cópia (`Span<T>`, `readonly struct`)', 'moderado'],
          ['5', 'evitar boxing', 'pequeno a moderado'],
          ['6', 'micro-otimizações', 'quase sempre irrelevante'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A ordem não é arbitrária: cada nível só compensa depois que o anterior foi resolvido. Otimizar alocação num algoritmo O(n²) é polir uma peça que vai ser jogada fora.',
      },
      {
        kind: 'text',
        body: 'Cada técnica tem um sinal claro de que chegou a hora dela:',
      },
      {
        kind: 'table',
        headers: ['Sintoma', 'Técnica'],
        rows: [
          ['tempo cresce muito mais rápido que a entrada', 'trocar o algoritmo'],
          ['o mesmo cálculo repete', 'cache ou `ToList()`'],
          ['string montada em laço', '`StringBuilder`'],
          ['array alocado por iteração', '`ArrayPool<T>`'],
          ['`Substring` em laço de análise', '`ReadOnlySpan<char>`'],
          ['`ArrayList` ou `object` em coleções', 'genéricos'],
        ],
      },
      {
        kind: 'compare',
        good: `// legivel, correto,
// e rapido o suficiente
var nomes = clientes
    .Where(c => c.Ativo)
    .Select(c => c.Nome)
    .ToList();`,
        bad: `// otimizado sem medir,
// para 50 clientes
var buffer = pool.Rent(clientes.Count);
var span = buffer.AsSpan(0, clientes.Count);
// ... 30 linhas depois`,
        goodLabel: 'Simples até provar o contrário',
        badLabel: 'Otimizado por precaução',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Toda técnica deste capítulo **custa legibilidade**. `Span<T>` tem restrições, o pool tem três armadilhas, `readonly struct` obriga a criar cópias. Esse custo só se paga com medição que o justifique.',
      },
      {
        kind: 'text',
        body:
          'Vale fixar o que **não** fazer, porque são erros que aparecem com frequência em código otimizado por hábito:',
      },
      {
        kind: 'table',
        headers: ['Antipadrão', 'Por que é ruim'],
        rows: [
          ['`StringBuilder` para juntar três strings', 'mais código, sem ganho'],
          ['`struct` mutável "por desempenho"', 'bugs silenciosos de cópia'],
          ['`GC.Collect()` manual', 'promove objetos e atrapalha a heurística'],
          ['pool de buffers em caminho frio', 'três armadilhas, zero ganho'],
          ['otimizar sem medir antes e depois', 'pode piorar sem ninguém notar'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A pergunta final antes de qualquer otimização: **eu medi?** Se a resposta for não, a otimização certa é nenhuma. Código simples e correto é mais fácil de acelerar depois do que código complexo é de consertar.',
      },
    ],
    quiz: [
      {
        id: 's08c06l10q1',
        type: 'single',
        prompt: 'Qual otimização considerar primeiro?',
        options: [
          { id: 'a', text: 'Trocar o algoritmo por um de complexidade menor', correct: true },
          { id: 'b', text: 'Substituir concatenação por `StringBuilder`' },
          { id: 'c', text: 'Evitar boxing' },
          { id: 'd', text: 'Usar `Span<T>`' },
        ],
        explanation:
          'Complexidade domina tudo em entradas grandes. As demais técnicas dão ganhos constantes, que somem diante de uma diferença de ordem de grandeza.',
      },
      {
        id: 's08c06l10q2',
        type: 'multiple',
        prompt: 'Quais destes são antipadrões?',
        options: [
          { id: 'a', text: '`StringBuilder` para concatenar três strings', correct: true },
          { id: 'b', text: '`struct` mutável usado "por desempenho"', correct: true },
          { id: 'c', text: 'Chamar `GC.Collect()` ao fim de cada lote', correct: true },
          { id: 'd', text: 'Usar `List<T>` em vez de `ArrayList`' },
        ],
        explanation:
          'Os três primeiros custam legibilidade ou correção sem ganho. Usar coleção genérica é a escolha certa por segurança de tipo, além do desempenho.',
      },
      {
        id: 's08c06l10q3',
        type: 'single',
        prompt: 'Qual a pergunta a fazer antes de qualquer otimização?',
        options: [
          { id: 'a', text: '"Eu medi?" — sem medição, a otimização certa é nenhuma', correct: true },
          { id: 'b', text: '"Existe uma API mais moderna?"' },
          { id: 'c', text: '"Isso pode ser genérico?"' },
          { id: 'd', text: '"Cabe numa linha?"' },
        ],
        explanation:
          'Sem medir antes não se sabe onde está o problema; sem medir depois não se sabe se melhorou. As duas medições são o que separa engenharia de palpite.',
      },
    ],
    challenge: {
      brief:
        'Feche o capítulo otimizando um processador de logs na ordem correta: primeiro o algoritmo, depois as alocações — medindo cada passo e provando o ganho.',
      requirements: [
        '`ContarIngenuo` é O(n²) e conta as comparações; `ContarComDicionario` é O(n) e conta as operações.',
        'A troca de algoritmo deve reduzir as operações em pelo menos uma ordem de grandeza.',
        '`ExtrairComSplit` e `ExtrairComSpan` produzem o mesmo resultado com custos de alocação diferentes.',
        '`Montar` usa `StringBuilder` com capacidade informada.',
        '`Processar` combina tudo: algoritmo eficiente, análise sem alocação, montagem com builder.',
        'Todas as comparações de alocação são booleanas.',
        'Os dois caminhos devem produzir resultados idênticos.',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Text;

class Program
{
    static long operacoes;

    static void Zerar() => operacoes = 0;

    // TODO: para cada linha, percorre todas as outras contando repetidas — O(n^2)
    static int ContarIngenuo(string[] linhas)
    {
        return 0;
    }

    // TODO: mesma resposta com dicionario — O(n)
    static int ContarComDicionario(string[] linhas)
    {
        return 0;
    }

    // TODO: nivel de severidade do log "NIVEL;origem;mensagem", com Split
    static string ExtrairComSplit(string linha)
    {
        return "";
    }

    // TODO: mesma coisa com ReadOnlySpan, alocando so o resultado
    static string ExtrairComSpan(ReadOnlySpan<char> linha)
    {
        return "";
    }

    // TODO: StringBuilder com capacidade; uma linha por par
    static string Montar(Dictionary<string, int> contagem)
    {
        return "";
    }

    // TODO: agrupa por nivel usando ExtrairComSpan e monta o relatorio
    static string Processar(string[] linhas)
    {
        return "";
    }

    static void Main()
    {
        var linhas = new List<string>();

        for (int i = 0; i < 2000; i++)
        {
            string nivel = (i % 3) switch
            {
                0 => "INFO",
                1 => "WARN",
                _ => "ERRO",
            };

            linhas.Add($"{nivel};servico{i};mensagem {i}");
        }

        string[] dados = linhas.ToArray();

        Zerar();
        int ingenuo = ContarIngenuo(dados);
        long opsIngenuo = operacoes;

        Zerar();
        int comDicionario = ContarComDicionario(dados);
        long opsDicionario = operacoes;

        Console.WriteLine($"resultados iguais: {ingenuo == comDicionario}");
        Console.WriteLine($"origens distintas: {comDicionario}");
        Console.WriteLine($"dicionario fez menos ops: {opsDicionario < opsIngenuo / 10}");
        Console.WriteLine($"ingenuo passou de 1 milhao: {opsIngenuo > 1000000}");

        Console.WriteLine($"split: {ExtrairComSplit(dados[0])}");
        Console.WriteLine($"span: {ExtrairComSpan(dados[0])}");
        Console.WriteLine($"iguais: {ExtrairComSplit(dados[1]) == ExtrairComSpan(dados[1])}");
        Console.WriteLine($"sem separador: [{ExtrairComSpan("semponto")}]");

        long a1 = GC.GetTotalAllocatedBytes(true);

        foreach (string linha in dados)
        {
            ExtrairComSplit(linha);
        }

        long a2 = GC.GetTotalAllocatedBytes(true);

        foreach (string linha in dados)
        {
            ExtrairComSpan(linha);
        }

        long a3 = GC.GetTotalAllocatedBytes(true);

        Console.WriteLine($"split alocou mais: {(a2 - a1) > (a3 - a2)}");

        Console.WriteLine("relatorio:");
        Console.WriteLine(Processar(dados));

        Console.WriteLine($"vazio: [{Processar(new string[0])}]");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Text;

class Program
{
    static long operacoes;

    static void Zerar() => operacoes = 0;

    static int ContarIngenuo(string[] linhas)
    {
        var vistos = new List<string>();

        foreach (string linha in linhas)
        {
            string origem = ExtrairOrigem(linha);
            bool achou = false;

            foreach (string existente in vistos)
            {
                operacoes++;

                if (existente == origem)
                {
                    achou = true;
                    break;
                }
            }

            if (!achou)
            {
                vistos.Add(origem);
            }
        }

        return vistos.Count;
    }

    static int ContarComDicionario(string[] linhas)
    {
        var vistos = new HashSet<string>();

        foreach (string linha in linhas)
        {
            operacoes++;
            vistos.Add(ExtrairOrigem(linha));
        }

        return vistos.Count;
    }

    private static string ExtrairOrigem(string linha)
    {
        ReadOnlySpan<char> span = linha;
        int primeiro = span.IndexOf(';');

        if (primeiro < 0)
        {
            return "";
        }

        ReadOnlySpan<char> resto = span.Slice(primeiro + 1);
        int segundo = resto.IndexOf(';');

        return segundo < 0 ? resto.ToString() : resto.Slice(0, segundo).ToString();
    }

    static string ExtrairComSplit(string linha)
    {
        string[] partes = linha.Split(';');
        return partes.Length > 0 ? partes[0] : "";
    }

    static string ExtrairComSpan(ReadOnlySpan<char> linha)
    {
        int posicao = linha.IndexOf(';');
        return posicao < 0 ? linha.ToString() : linha.Slice(0, posicao).ToString();
    }

    static string Montar(Dictionary<string, int> contagem)
    {
        var chaves = new List<string>(contagem.Keys);
        chaves.Sort(StringComparer.Ordinal);

        var construtor = new StringBuilder(chaves.Count * 24);

        foreach (string chave in chaves)
        {
            construtor.AppendLine($"  {chave}={contagem[chave]}");
        }

        return construtor.ToString().TrimEnd();
    }

    static string Processar(string[] linhas)
    {
        var contagem = new Dictionary<string, int>();

        foreach (string linha in linhas)
        {
            string nivel = ExtrairComSpan(linha);

            if (nivel.Length == 0)
            {
                continue;
            }

            contagem[nivel] = contagem.TryGetValue(nivel, out int atual) ? atual + 1 : 1;
        }

        return Montar(contagem);
    }

    static void Main()
    {
        var linhas = new List<string>();

        for (int i = 0; i < 2000; i++)
        {
            string nivel = (i % 3) switch
            {
                0 => "INFO",
                1 => "WARN",
                _ => "ERRO",
            };

            linhas.Add($"{nivel};servico{i};mensagem {i}");
        }

        string[] dados = linhas.ToArray();

        Zerar();
        int ingenuo = ContarIngenuo(dados);
        long opsIngenuo = operacoes;

        Zerar();
        int comDicionario = ContarComDicionario(dados);
        long opsDicionario = operacoes;

        Console.WriteLine($"resultados iguais: {ingenuo == comDicionario}");
        Console.WriteLine($"origens distintas: {comDicionario}");
        Console.WriteLine($"dicionario fez menos ops: {opsDicionario < opsIngenuo / 10}");
        Console.WriteLine($"ingenuo passou de 1 milhao: {opsIngenuo > 1000000}");

        Console.WriteLine($"split: {ExtrairComSplit(dados[0])}");
        Console.WriteLine($"span: {ExtrairComSpan(dados[0])}");
        Console.WriteLine($"iguais: {ExtrairComSplit(dados[1]) == ExtrairComSpan(dados[1])}");
        Console.WriteLine($"sem separador: [{ExtrairComSpan("semponto")}]");

        long a1 = GC.GetTotalAllocatedBytes(true);

        foreach (string linha in dados)
        {
            ExtrairComSplit(linha);
        }

        long a2 = GC.GetTotalAllocatedBytes(true);

        foreach (string linha in dados)
        {
            ExtrairComSpan(linha);
        }

        long a3 = GC.GetTotalAllocatedBytes(true);

        Console.WriteLine($"split alocou mais: {(a2 - a1) > (a3 - a2)}");

        Console.WriteLine("relatorio:");
        Console.WriteLine(Processar(dados));

        Console.WriteLine($"vazio: [{Processar(new string[0])}]");
    }
}`,
      hints: [
        '`ContarIngenuo` percorre a lista de vistos para cada linha. Como as 2000 origens são todas distintas, a lista cresce sem parar e o total passa de dois milhões de comparações.',
        '`ContarComDicionario` conta uma operação por linha — 2000 no total, três ordens de grandeza a menos.',
        '`ExtrairComSpan` aloca apenas a string do resultado; `ExtrairComSplit` aloca um array e uma string por campo.',
        '`Montar` ordena as chaves antes de imprimir, porque a ordem de enumeração de um `Dictionary` não é garantida.',
        'Com 2000 linhas e ciclo de 3 níveis: 667 INFO, 667 WARN e 666 ERRO — confira o resto da divisão.',
      ],
      tests: [
        {
          name: 'Otimização na ordem certa',
          expectedStdout:
            'resultados iguais: True\norigens distintas: 2000\n' +
            'dicionario fez menos ops: True\ningenuo passou de 1 milhao: True\n' +
            'split: INFO\nspan: INFO\niguais: True\nsem separador: [semponto]\n' +
            'split alocou mais: True\n' +
            'relatorio:\n  ERRO=666\n  INFO=667\n  WARN=667\n' +
            'vazio: []',
        },
      ],
      timeoutMs: 15000,
    },
  },
]
