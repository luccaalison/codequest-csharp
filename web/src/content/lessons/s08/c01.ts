import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's08c01l01',
    title: 'O problema que genéricos resolvem',
    objective: 'Entender por que `object` não basta e o que os genéricos ganham em troca.',
    concept: [
      {
        kind: 'text',
        body:
          'Antes dos genéricos havia uma única forma de escrever código que servisse para qualquer tipo: aceitar `object`, o ancestral comum de tudo em C#. Funciona — e cobra caro.',
      },
      {
        kind: 'code',
        code: `class CaixaDeObjeto
{
    private object conteudo;

    public void Guardar(object valor)
    {
        conteudo = valor;
    }

    public object Pegar()
    {
        return conteudo;
    }
}`,
      },
      {
        kind: 'text',
        body:
          'O problema aparece na hora de usar. Como `Pegar()` devolve `object`, quem chama precisa converter — e o compilador não tem como saber se a conversão está certa.',
      },
      {
        kind: 'code',
        code: `var velha = new CaixaDeObjeto();

velha.Guardar(42);
int recuperado = (int)velha.Pegar();   // ok

velha.Guardar("texto");
int erro = (int)velha.Pegar();         // compila, e explode em execucao`,
      },
      {
        kind: 'output',
        code: `objeto: 42
quebrou em execucao: InvalidCastException`,
        caption: 'As duas linhas compilam sem uma única reclamação. A segunda só falha com o programa rodando.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Esse é o custo real: um erro que **deveria** ser de compilação virou erro de execução. Em vez de o compilador avisar enquanto você escreve, o usuário descobre em produção.',
      },
      {
        kind: 'text',
        body:
          'Um **genérico** resolve isso com um parâmetro de tipo. `T` é um espaço em branco que quem chama preenche, e a partir daí o compilador conhece o tipo exato.',
      },
      {
        kind: 'code',
        code: `class Caixa<T>
{
    private T conteudo;

    public void Guardar(T valor)
    {
        conteudo = valor;
    }

    public T Pegar()
    {
        return conteudo;
    }
}`,
      },
      {
        kind: 'compare',
        good: `var caixa = new Caixa<int>();
caixa.Guardar(42);
int valor = caixa.Pegar();   // sem conversao

caixa.Guardar("texto");
// erro de compilacao, na hora`,
        bad: `var velha = new CaixaDeObjeto();
velha.Guardar(42);
int valor = (int)velha.Pegar();

velha.Guardar("texto");
// compila. quebra depois.`,
        goodLabel: '`Caixa<T>`: erro na hora de escrever',
        badLabel: '`object`: erro na hora de rodar',
      },
      {
        kind: 'text',
        body: 'São três ganhos de uma vez, e nenhum deles é sobre digitar menos:',
      },
      {
        kind: 'table',
        headers: ['Ganho', 'Com `object`', 'Com `T`'],
        rows: [
          ['segurança de tipo', 'erro em execução', 'erro em compilação'],
          ['conversões', 'toda leitura exige um cast', 'nenhuma'],
          ['desempenho com tipos de valor', 'empacota na pilha gerenciada', 'sem empacotamento'],
        ],
      },
      {
        kind: 'text',
        body:
          'O terceiro ponto é o menos óbvio. Guardar um `int` num `object` obriga o runtime a criar um objeto no heap para envolvê-lo — o **boxing**. Dá para ver isso acontecendo: dois empacotamentos do mesmo número são objetos diferentes.',
      },
      {
        kind: 'code',
        code: `int valor = 42;
object caixa1 = valor;
object caixa2 = valor;

Console.WriteLine(caixa1.Equals(caixa2));
Console.WriteLine(ReferenceEquals(caixa1, caixa2));`,
      },
      {
        kind: 'output',
        code: `True
False`,
        caption: 'Mesmo valor, referências distintas: cada empacotamento alocou um objeto novo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Genérico não é um `object` com açúcar sintático. O compilador gera código especializado para cada tipo de valor usado, então `List<int>` guarda inteiros de verdade — não caixas com inteiros dentro.',
      },
      {
        kind: 'text',
        body:
          'Você já vem usando genéricos desde a Seção 3: `List<T>`, `Dictionary<K,V>`, `Queue<T>`, `Stack<T>`. O que muda agora é passar de consumidor a autor.',
      },
    ],
    quiz: [
      {
        id: 's08c01l01q1',
        type: 'single',
        prompt: 'Qual o principal problema de usar `object` para escrever código reutilizável?',
        options: [
          { id: 'a', text: 'Erros de tipo só aparecem em execução, não em compilação', correct: true },
          { id: 'b', text: '`object` não consegue guardar tipos de valor' },
          { id: 'c', text: '`object` só existe em versões antigas do C#' },
          { id: 'd', text: 'Não é possível converter de `object` de volta ao tipo original' },
        ],
        explanation:
          'A conversão é possível — o problema é que ela compila mesmo quando está errada. O compilador não tem informação para reclamar, então o erro escapa para a execução.',
      },
      {
        id: 's08c01l01q2',
        type: 'single',
        prompt: 'Por que `ReferenceEquals` devolve `False` para dois empacotamentos do mesmo `int`?',
        options: [
          { id: 'a', text: 'Cada empacotamento aloca um objeto novo no heap', correct: true },
          { id: 'b', text: 'Porque `int` não implementa `Equals` corretamente' },
          { id: 'c', text: 'Porque `ReferenceEquals` sempre devolve `False` para números' },
          { id: 'd', text: 'Porque os dois valores são diferentes' },
        ],
        explanation:
          '`Equals` devolve `True` porque os valores são iguais. `ReferenceEquals` expõe o custo escondido: são dois objetos distintos, e cada um deles foi uma alocação.',
      },
      {
        id: 's08c01l01q3',
        type: 'multiple',
        prompt: 'Quais são vantagens reais de `Caixa<T>` sobre `CaixaDeObjeto`?',
        options: [
          { id: 'a', text: 'Erros de tipo viram erros de compilação', correct: true },
          { id: 'b', text: 'Não é preciso converter ao ler o valor', correct: true },
          { id: 'c', text: 'Tipos de valor não são empacotados', correct: true },
          { id: 'd', text: 'A classe genérica ocupa menos espaço no arquivo fonte' },
        ],
        explanation:
          'As três primeiras são ganhos concretos de correção e desempenho. Escrever menos é consequência ocasional, não o motivo de existir dos genéricos.',
      },
    ],
    challenge: {
      brief:
        'Escreva as duas versões de um cofre — uma com `object`, outra genérica — e demonstre lado a lado a diferença: a conversão errada que só falha em execução, e o empacotamento que aloca objetos distintos.',
      requirements: [
        '`CofreDeObjeto` guarda e devolve `object`; `Cofre<T>` guarda e devolve `T`.',
        'A conversão inválida deve ser capturada com `catch (InvalidCastException)` — uma exceção que escapa reprova o teste.',
        'Use `ReferenceEquals` para mostrar que dois empacotamentos do mesmo `int` são objetos diferentes.',
        'Nenhum `cast` deve aparecer no uso da versão genérica.',
      ],
      starterCode: `using System;

class CofreDeObjeto
{
    // TODO: guarde um object
}

class Cofre<T>
{
    // TODO: guarde um T
}

class Program
{
    static void Main()
    {
        var velho = new CofreDeObjeto();
        // TODO: guarde 42, leia como int e imprima "objeto: 42"

        // TODO: guarde "texto", tente ler como int dentro de try/catch
        //       e imprima "falhou: InvalidCastException"

        var novo = new Cofre<int>();
        // TODO: guarde 42, leia sem conversao e imprima "generico: 42"

        var texto = new Cofre<string>();
        // TODO: guarde "abc" e imprima "generico texto: abc"

        int valor = 42;
        object caixa1 = valor;
        object caixa2 = valor;
        Console.WriteLine($"iguais: {caixa1.Equals(caixa2)}");
        Console.WriteLine($"mesma referencia: {ReferenceEquals(caixa1, caixa2)}");
        Console.WriteLine($"tipo empacotado: {caixa1.GetType().Name}");

        string palavra = "abc";
        Console.WriteLine($"referencia igual: {ReferenceEquals((object)palavra, (object)palavra)}");
    }
}`,
      solution: `using System;

class CofreDeObjeto
{
    private object conteudo;

    public void Guardar(object valor)
    {
        conteudo = valor;
    }

    public object Pegar()
    {
        return conteudo;
    }
}

class Cofre<T>
{
    private T conteudo;

    public void Guardar(T valor)
    {
        conteudo = valor;
    }

    public T Pegar()
    {
        return conteudo;
    }
}

class Program
{
    static void Main()
    {
        var velho = new CofreDeObjeto();
        velho.Guardar(42);
        int recuperado = (int)velho.Pegar();
        Console.WriteLine($"objeto: {recuperado}");

        velho.Guardar("texto");

        try
        {
            int erro = (int)velho.Pegar();
            Console.WriteLine($"nao deveria chegar aqui: {erro}");
        }
        catch (InvalidCastException)
        {
            Console.WriteLine("falhou: InvalidCastException");
        }

        var novo = new Cofre<int>();
        novo.Guardar(42);
        Console.WriteLine($"generico: {novo.Pegar()}");

        var texto = new Cofre<string>();
        texto.Guardar("abc");
        Console.WriteLine($"generico texto: {texto.Pegar()}");

        int valor = 42;
        object caixa1 = valor;
        object caixa2 = valor;
        Console.WriteLine($"iguais: {caixa1.Equals(caixa2)}");
        Console.WriteLine($"mesma referencia: {ReferenceEquals(caixa1, caixa2)}");
        Console.WriteLine($"tipo empacotado: {caixa1.GetType().Name}");

        string palavra = "abc";
        Console.WriteLine($"referencia igual: {ReferenceEquals((object)palavra, (object)palavra)}");
    }
}`,
      hints: [
        'As duas classes têm exatamente o mesmo corpo; a única diferença é `object` virar `T`.',
        'A conversão errada precisa estar dentro de `try`. Sem o `catch`, o processo termina com erro e o teste reprova mesmo que a saída anterior esteja certa.',
        '`ReferenceEquals` com a mesma `string` devolve `True` porque strings são tipos de referência: não há empacotamento, é o mesmo objeto.',
      ],
      tests: [
        {
          name: 'object contra genérico',
          expectedStdout:
            'objeto: 42\nfalhou: InvalidCastException\n' +
            'generico: 42\ngenerico texto: abc\n' +
            'iguais: True\nmesma referencia: False\ntipo empacotado: Int32\nreferencia igual: True',
        },
      ],
    },
  },

  {
    id: 's08c01l02',
    title: 'Métodos genéricos',
    objective: 'Escrever um método com parâmetro de tipo e deixar o compilador inferi-lo na chamada.',
    concept: [
      {
        kind: 'text',
        body:
          'Nem sempre a classe inteira precisa ser genérica. Um **método genérico** declara o próprio parâmetro de tipo, entre `<>` logo depois do nome, e pode viver numa classe comum.',
      },
      {
        kind: 'code',
        code: `static void Trocar<T>(ref T a, ref T b)
{
    T guarda = a;
    a = b;
    b = guarda;
}`,
        caption: 'O `<T>` fica entre o nome e a lista de parâmetros. Daí em diante `T` é um tipo como qualquer outro.',
      },
      {
        kind: 'text',
        body:
          'Na chamada, você **não precisa** dizer qual é o tipo: o compilador deduz a partir dos argumentos. É a **inferência de tipo**.',
      },
      {
        kind: 'code',
        code: `int x = 1, y = 2;
Trocar(ref x, ref y);            // T deduzido como int

string s1 = "a", s2 = "b";
Trocar(ref s1, ref s2);          // T deduzido como string

Trocar<double>(ref p, ref q);    // explicito, quando a deducao nao basta`,
      },
      {
        kind: 'output',
        code: `trocado: 2 1
trocado texto: b a`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A inferência só olha os **argumentos**, nunca o tipo de retorno. `T Ler<T>()` não tem como ser inferido — nesse caso a chamada precisa escrever `Ler<int>()` explicitamente.',
      },
      {
        kind: 'text',
        body:
          'O ponto que costuma confundir: dentro do método, você só pode fazer com `T` aquilo que vale para **qualquer** tipo. Isso é bem pouco — comparar com `==`, somar, chamar `.Length`, nada disso está disponível.',
      },
      {
        kind: 'compare',
        good: `static void Imprimir<T>(T item)
{
    // ToString existe em todo tipo
    Console.WriteLine(item.ToString());
}`,
        bad: `static T Somar<T>(T a, T b)
{
    // erro: o operador + nao esta
    // definido para "qualquer tipo"
    return a + b;
}`,
        goodLabel: 'Só o que todo tipo tem',
        badLabel: 'Supondo capacidades que `T` não garante',
      },
      {
        kind: 'text',
        body:
          'A saída para isso são as **restrições** — o assunto da lição 4. Por enquanto, os métodos genéricos úteis são os que apenas movem valores de lugar, sem inspecioná-los.',
      },
      {
        kind: 'code',
        code: `static T[] Repetir<T>(T valor, int vezes)
{
    var saida = new T[vezes];

    for (int i = 0; i < vezes; i++)
    {
        saida[i] = valor;
    }

    return saida;
}

static void Inverter<T>(T[] itens)
{
    for (int i = 0, j = itens.Length - 1; i < j; i++, j--)
    {
        T guarda = itens[i];
        itens[i] = itens[j];
        itens[j] = guarda;
    }
}`,
        caption: 'Nenhum dos dois precisa saber o que `T` é: eles só copiam e reordenam.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Um bom teste para saber se um método deveria ser genérico: se você o escreveu para `int` e a versão para `string` seria idêntica trocando uma palavra, ele deveria ser genérico.',
      },
      {
        kind: 'text',
        body:
          'Métodos genéricos podem estar em classes genéricas, e nesse caso o `T` da classe e o do método são parâmetros diferentes — dar nomes distintos evita muita confusão.',
      },
    ],
    quiz: [
      {
        id: 's08c01l02q1',
        type: 'single',
        prompt: 'Por que `Trocar(ref x, ref y)` funciona sem escrever `Trocar<int>`?',
        options: [
          { id: 'a', text: 'O compilador infere `T` a partir dos tipos dos argumentos', correct: true },
          { id: 'b', text: 'Porque `int` é o tipo padrão de qualquer `T`' },
          { id: 'c', text: 'Porque `ref` dispensa a inferência' },
          { id: 'd', text: 'Não funciona: o tipo é sempre obrigatório' },
        ],
        explanation:
          'Os dois argumentos são `int`, então `T` só pode ser `int`. A forma explícita continua valendo e é obrigatória quando os argumentos não determinam o tipo.',
      },
      {
        id: 's08c01l02q2',
        type: 'single',
        prompt: 'Por que este método não compila?',
        code: `static T Somar<T>(T a, T b)
{
    return a + b;
}`,
        options: [
          { id: 'a', text: 'Nem todo tipo tem operador `+`, e `T` não promete nada', correct: true },
          { id: 'b', text: 'Métodos genéricos não podem devolver `T`' },
          { id: 'c', text: 'Faltou escrever `Somar<int>`' },
          { id: 'd', text: 'Compila normalmente' },
        ],
        explanation:
          'Dentro do método, `T` pode ser qualquer coisa — inclusive um tipo sem `+`. O compilador só libera operações que valem para todos os tipos possíveis.',
      },
      {
        id: 's08c01l02q3',
        type: 'single',
        prompt: 'O compilador consegue inferir `T` na chamada `var x = Criar();` de `static T Criar<T>()`?',
        options: [
          { id: 'a', text: 'Não: a inferência olha só os argumentos, nunca o retorno', correct: true },
          { id: 'b', text: 'Sim: ele deduz pelo tipo da variável que recebe' },
          { id: 'c', text: 'Sim: `T` vira `object` automaticamente' },
          { id: 'd', text: 'Sim, desde que exista `where T : new()`' },
        ],
        explanation:
          'Sem argumentos não há de onde deduzir. A chamada precisa ser `Criar<Produto>()` — e é por isso que fábricas genéricas sempre aparecem com o tipo explícito.',
      },
    ],
    challenge: {
      brief:
        'Monte um pequeno kit de métodos genéricos que manipulam arrays sem saber o que guardam: trocar, repetir, inverter, rotacionar e contar ocorrências.',
      requirements: [
        'Todos os métodos são genéricos e funcionam com qualquer tipo.',
        'Nenhum deles usa `object` nem faz conversões.',
        '`Contar` compara com `EqualityComparer<T>.Default.Equals` — `==` não está disponível para um `T` sem restrição.',
        '`Rotacionar` desloca à direita e trata deslocamento maior que o tamanho do array.',
        'As chamadas no `Main` não escrevem o tipo explicitamente, exceto onde a inferência não alcança.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Trocar<T>(ref T a, ref T b)
    {
        // TODO
    }

    static T[] Repetir<T>(T valor, int vezes)
    {
        // TODO
        return new T[0];
    }

    static void Inverter<T>(T[] itens)
    {
        // TODO: dois ponteiros
    }

    static T[] Rotacionar<T>(T[] itens, int passos)
    {
        // TODO: deslocamento a direita; passos pode ser maior que o tamanho
        return itens;
    }

    static int Contar<T>(T[] itens, T procurado)
    {
        // TODO: use EqualityComparer<T>.Default
        return 0;
    }

    static void Main()
    {
        int x = 1, y = 2;
        Trocar(ref x, ref y);
        Console.WriteLine($"numeros: {x} {y}");

        string a = "primeiro", b = "segundo";
        Trocar(ref a, ref b);
        Console.WriteLine($"textos: {a} {b}");

        Console.WriteLine($"repetir: {string.Join(",", Repetir("ok", 3))}");
        Console.WriteLine($"repetir zero: [{string.Join(",", Repetir(9, 0))}]");

        int[] numeros = { 1, 2, 3, 4, 5 };
        Inverter(numeros);
        Console.WriteLine($"invertido: {string.Join(",", numeros)}");

        string[] palavras = { "a", "b", "c", "d" };
        Console.WriteLine($"rotacionado 1: {string.Join(",", Rotacionar(palavras, 1))}");
        Console.WriteLine($"rotacionado 6: {string.Join(",", Rotacionar(palavras, 6))}");
        Console.WriteLine($"rotacionado 0: {string.Join(",", Rotacionar(palavras, 0))}");

        int[] repetidos = { 3, 1, 3, 7, 3 };
        Console.WriteLine($"contar 3: {Contar(repetidos, 3)}");
        Console.WriteLine($"contar 9: {Contar(repetidos, 9)}");
        Console.WriteLine($"contar texto: {Contar(new[] { "x", "y", "x" }, "x")}");
        Console.WriteLine($"contar nulo: {Contar(new string[] { "x", null, null }, null)}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Trocar<T>(ref T a, ref T b)
    {
        T guarda = a;
        a = b;
        b = guarda;
    }

    static T[] Repetir<T>(T valor, int vezes)
    {
        var saida = new T[vezes];

        for (int i = 0; i < vezes; i++)
        {
            saida[i] = valor;
        }

        return saida;
    }

    static void Inverter<T>(T[] itens)
    {
        for (int i = 0, j = itens.Length - 1; i < j; i++, j--)
        {
            T guarda = itens[i];
            itens[i] = itens[j];
            itens[j] = guarda;
        }
    }

    static T[] Rotacionar<T>(T[] itens, int passos)
    {
        if (itens.Length == 0)
        {
            return itens;
        }

        int deslocamento = passos % itens.Length;
        var saida = new T[itens.Length];

        for (int i = 0; i < itens.Length; i++)
        {
            saida[(i + deslocamento) % itens.Length] = itens[i];
        }

        return saida;
    }

    static int Contar<T>(T[] itens, T procurado)
    {
        var comparador = EqualityComparer<T>.Default;
        int total = 0;

        foreach (T item in itens)
        {
            if (comparador.Equals(item, procurado))
            {
                total++;
            }
        }

        return total;
    }

    static void Main()
    {
        int x = 1, y = 2;
        Trocar(ref x, ref y);
        Console.WriteLine($"numeros: {x} {y}");

        string a = "primeiro", b = "segundo";
        Trocar(ref a, ref b);
        Console.WriteLine($"textos: {a} {b}");

        Console.WriteLine($"repetir: {string.Join(",", Repetir("ok", 3))}");
        Console.WriteLine($"repetir zero: [{string.Join(",", Repetir(9, 0))}]");

        int[] numeros = { 1, 2, 3, 4, 5 };
        Inverter(numeros);
        Console.WriteLine($"invertido: {string.Join(",", numeros)}");

        string[] palavras = { "a", "b", "c", "d" };
        Console.WriteLine($"rotacionado 1: {string.Join(",", Rotacionar(palavras, 1))}");
        Console.WriteLine($"rotacionado 6: {string.Join(",", Rotacionar(palavras, 6))}");
        Console.WriteLine($"rotacionado 0: {string.Join(",", Rotacionar(palavras, 0))}");

        int[] repetidos = { 3, 1, 3, 7, 3 };
        Console.WriteLine($"contar 3: {Contar(repetidos, 3)}");
        Console.WriteLine($"contar 9: {Contar(repetidos, 9)}");
        Console.WriteLine($"contar texto: {Contar(new[] { "x", "y", "x" }, "x")}");
        Console.WriteLine($"contar nulo: {Contar(new string[] { "x", null, null }, null)}");
    }
}`,
      hints: [
        '`new T[vezes]` funciona sem restrição nenhuma: criar um array de `T` não exige saber o que `T` é.',
        'Em `Rotacionar`, `passos % itens.Length` normaliza deslocamentos maiores que o array. Trate o array vazio antes, para não dividir por zero.',
        '`EqualityComparer<T>.Default` funciona com `null` e com tipos de valor, e é a única forma correta de comparar dois `T` sem restrição.',
      ],
      tests: [
        {
          name: 'Kit genérico',
          expectedStdout:
            'numeros: 2 1\ntextos: segundo primeiro\n' +
            'repetir: ok,ok,ok\nrepetir zero: []\n' +
            'invertido: 5,4,3,2,1\n' +
            'rotacionado 1: d,a,b,c\nrotacionado 6: c,d,a,b\nrotacionado 0: a,b,c,d\n' +
            'contar 3: 3\ncontar 9: 0\ncontar texto: 2\ncontar nulo: 2',
        },
      ],
    },
  },

  {
    id: 's08c01l03',
    title: 'Classes genéricas',
    objective: 'Escrever uma coleção própria parametrizada por tipo, com armazenamento e crescimento internos.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma **classe genérica** declara os parâmetros de tipo junto ao nome, e todos os membros passam a poder usá-los: campos, propriedades, parâmetros e retornos.',
      },
      {
        kind: 'code',
        code: `class Pilha<T>
{
    private T[] itens = new T[4];
    private int topo;

    public int Contagem => topo;
    public int Capacidade => itens.Length;

    public void Empilhar(T valor)
    {
        if (topo == itens.Length)
        {
            Array.Resize(ref itens, itens.Length * 2);
        }

        itens[topo++] = valor;
    }

    public T Desempilhar()
    {
        if (topo == 0)
        {
            throw new InvalidOperationException("pilha vazia");
        }

        return itens[--topo];
    }
}`,
        caption: 'O array interno é `T[]`, então uma `Pilha<int>` guarda inteiros de verdade — sem empacotamento.',
      },
      {
        kind: 'text',
        body:
          'Cada combinação de tipo produz um **tipo fechado** independente: `Pilha<int>` e `Pilha<string>` são tipos distintos, sem qualquer parentesco. `Pilha<T>` sozinho é o **tipo aberto**, um molde.',
      },
      {
        kind: 'code',
        code: `var pilha = new Pilha<string>();
Console.WriteLine(pilha.Capacidade);

for (int i = 1; i <= 5; i++)
{
    pilha.Empilhar($"item{i}");
}

Console.WriteLine($"{pilha.Contagem} / {pilha.Capacidade}");
Console.WriteLine(pilha.Desempilhar());`,
      },
      {
        kind: 'output',
        code: `4
5 / 8
item5`,
        caption: 'A quinta inserção dobrou a capacidade de 4 para 8 — a mesma estratégia que `List<T>` usa por dentro.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Duplicar a capacidade, em vez de somar uma posição, é o que mantém a inserção em O(1) **amortizado**: as cópias ficam cada vez mais raras à medida que o array cresce.',
      },
      {
        kind: 'text',
        body:
          'Um detalhe que surpreende: o nome de um tipo genérico em tempo de execução não é o que você escreveu.',
      },
      {
        kind: 'code',
        code: `Console.WriteLine(typeof(Pilha<int>).Name);
Console.WriteLine(typeof(Pilha<int>));
Console.WriteLine(typeof(List<string>).Name);`,
      },
      {
        kind: 'output',
        code: `Pilha\`1
Pilha\`1[System.Int32]
List\`1`,
        caption: 'O `` `1 `` é a **aridade**: quantos parâmetros de tipo a classe declara.',
      },
      {
        kind: 'text',
        body:
          'Campos de uma classe genérica podem ser inicializados normalmente, mas cuidado com o valor inicial de `T`: sem restrição, o compilador não sabe se `T` é um tipo de referência (que começa em `null`) ou de valor (que começa em zero).',
      },
      {
        kind: 'compare',
        good: `private T conteudo = default;
// funciona para qualquer T:
// null se for referencia,
// zero se for numero`,
        bad: `private T conteudo = null;
// erro: T pode ser int,
// e int nao aceita null`,
        goodLabel: '`default`',
        badLabel: '`null` sem restrição',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Ao escrever sua própria coleção, o mais importante é decidir o que acontece nos casos de borda — pilha vazia, capacidade zero, remoção do único item. É onde as implementações caseiras costumam quebrar, e é o que os testes vão cobrar.',
      },
    ],
    quiz: [
      {
        id: 's08c01l03q1',
        type: 'single',
        prompt: 'Qual a relação entre `Pilha<int>` e `Pilha<string>`?',
        options: [
          { id: 'a', text: 'Nenhuma: são dois tipos independentes gerados do mesmo molde', correct: true },
          { id: 'b', text: '`Pilha<int>` herda de `Pilha<string>`' },
          { id: 'c', text: 'As duas são a mesma classe em tempo de execução' },
          { id: 'd', text: 'Uma pode ser convertida na outra com um cast' },
        ],
        explanation:
          'Cada tipo fechado é independente. É justamente essa separação que permite ao compilador especializar o código e evitar empacotamento nos tipos de valor.',
      },
      {
        id: 's08c01l03q2',
        type: 'single',
        prompt: 'Por que `private T conteudo = null;` não compila numa classe genérica sem restrições?',
        options: [
          { id: 'a', text: '`T` pode ser um tipo de valor, e tipos de valor não aceitam `null`', correct: true },
          { id: 'b', text: 'Campos genéricos não podem ser inicializados' },
          { id: 'c', text: 'Falta a palavra `static`' },
          { id: 'd', text: 'Compila normalmente' },
        ],
        explanation:
          'Sem saber o que `T` é, o compilador precisa aceitar `int` como possibilidade. `default` resolve: vale `null` para referências e o valor zero para tipos de valor.',
      },
      {
        id: 's08c01l03q3',
        type: 'single',
        prompt: 'Por que a `Pilha<T>` dobra a capacidade em vez de aumentá-la de um em um?',
        options: [
          { id: 'a', text: 'Para manter a inserção em O(1) amortizado, tornando as cópias cada vez mais raras', correct: true },
          { id: 'b', text: 'Porque `Array.Resize` só aceita potências de dois' },
          { id: 'c', text: 'Para gastar menos memória' },
          { id: 'd', text: 'É uma exigência da linguagem para classes genéricas' },
        ],
        explanation:
          'Crescendo de um em um, cada inserção copiaria o array inteiro e n inserções custariam O(n²). Dobrando, o custo total de n inserções é O(n).',
      },
    ],
    challenge: {
      brief:
        'Implemente uma fila circular genérica com array de tamanho fixo: enfileira, desenfileira, espia o primeiro, informa se está cheia e descarta o mais antigo quando transborda.',
      requirements: [
        '`FilaCircular<T>` recebe a capacidade no construtor e nunca realoca o array.',
        'Quando cheia, `Enfileirar` sobrescreve o item mais antigo e devolve `false`; caso contrário devolve `true`.',
        '`Desenfileirar` em fila vazia lança `InvalidOperationException` — o teste captura, nada escapa.',
        'Os índices avançam com `%` para dar a volta no array.',
        '`ParaTexto` lista os itens do mais antigo ao mais recente, separados por vírgula.',
      ],
      starterCode: `using System;

class FilaCircular<T>
{
    private readonly T[] itens;
    private int inicio;
    private int contagem;

    public FilaCircular(int capacidade)
    {
        itens = new T[capacidade];
    }

    public int Contagem => contagem;
    public int Capacidade => itens.Length;
    public bool Cheia => contagem == itens.Length;

    public bool Enfileirar(T valor)
    {
        // TODO: quando cheia, sobrescreve o mais antigo e devolve false
        return true;
    }

    public T Desenfileirar()
    {
        // TODO: lanca InvalidOperationException quando vazia
        return default;
    }

    public T Espiar()
    {
        // TODO: primeiro item, sem remover
        return default;
    }

    public string ParaTexto()
    {
        // TODO: do mais antigo ao mais recente
        return "";
    }
}

class Program
{
    static void Main()
    {
        var fila = new FilaCircular<string>(3);
        Console.WriteLine($"vazia: {fila.Contagem} cheia: {fila.Cheia}");

        Console.WriteLine($"add a: {fila.Enfileirar("a")}");
        Console.WriteLine($"add b: {fila.Enfileirar("b")}");
        Console.WriteLine($"add c: {fila.Enfileirar("c")}");
        Console.WriteLine($"conteudo: {fila.ParaTexto()}");
        Console.WriteLine($"cheia: {fila.Cheia}");

        Console.WriteLine($"add d: {fila.Enfileirar("d")}");
        Console.WriteLine($"conteudo: {fila.ParaTexto()}");
        Console.WriteLine($"espiar: {fila.Espiar()}");
        Console.WriteLine($"tira: {fila.Desenfileirar()}");
        Console.WriteLine($"conteudo: {fila.ParaTexto()}");

        var numeros = new FilaCircular<int>(2);
        numeros.Enfileirar(10);
        numeros.Enfileirar(20);
        numeros.Enfileirar(30);
        Console.WriteLine($"numeros: {numeros.ParaTexto()}");
        Console.WriteLine($"tira: {numeros.Desenfileirar()}");
        Console.WriteLine($"tira: {numeros.Desenfileirar()}");
        Console.WriteLine($"contagem: {numeros.Contagem}");

        try
        {
            numeros.Desenfileirar();
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"vazia: {ex.Message}");
        }

        Console.WriteLine($"tipo: {typeof(FilaCircular<int>).Name}");
    }
}`,
      solution: `using System;

class FilaCircular<T>
{
    private readonly T[] itens;
    private int inicio;
    private int contagem;

    public FilaCircular(int capacidade)
    {
        itens = new T[capacidade];
    }

    public int Contagem => contagem;
    public int Capacidade => itens.Length;
    public bool Cheia => contagem == itens.Length;

    public bool Enfileirar(T valor)
    {
        if (Cheia)
        {
            itens[inicio] = valor;
            inicio = (inicio + 1) % itens.Length;
            return false;
        }

        itens[(inicio + contagem) % itens.Length] = valor;
        contagem++;
        return true;
    }

    public T Desenfileirar()
    {
        if (contagem == 0)
        {
            throw new InvalidOperationException("fila vazia");
        }

        T valor = itens[inicio];
        itens[inicio] = default;
        inicio = (inicio + 1) % itens.Length;
        contagem--;
        return valor;
    }

    public T Espiar()
    {
        if (contagem == 0)
        {
            throw new InvalidOperationException("fila vazia");
        }

        return itens[inicio];
    }

    public string ParaTexto()
    {
        var partes = new string[contagem];

        for (int i = 0; i < contagem; i++)
        {
            partes[i] = itens[(inicio + i) % itens.Length]?.ToString() ?? "";
        }

        return string.Join(",", partes);
    }
}

class Program
{
    static void Main()
    {
        var fila = new FilaCircular<string>(3);
        Console.WriteLine($"vazia: {fila.Contagem} cheia: {fila.Cheia}");

        Console.WriteLine($"add a: {fila.Enfileirar("a")}");
        Console.WriteLine($"add b: {fila.Enfileirar("b")}");
        Console.WriteLine($"add c: {fila.Enfileirar("c")}");
        Console.WriteLine($"conteudo: {fila.ParaTexto()}");
        Console.WriteLine($"cheia: {fila.Cheia}");

        Console.WriteLine($"add d: {fila.Enfileirar("d")}");
        Console.WriteLine($"conteudo: {fila.ParaTexto()}");
        Console.WriteLine($"espiar: {fila.Espiar()}");
        Console.WriteLine($"tira: {fila.Desenfileirar()}");
        Console.WriteLine($"conteudo: {fila.ParaTexto()}");

        var numeros = new FilaCircular<int>(2);
        numeros.Enfileirar(10);
        numeros.Enfileirar(20);
        numeros.Enfileirar(30);
        Console.WriteLine($"numeros: {numeros.ParaTexto()}");
        Console.WriteLine($"tira: {numeros.Desenfileirar()}");
        Console.WriteLine($"tira: {numeros.Desenfileirar()}");
        Console.WriteLine($"contagem: {numeros.Contagem}");

        try
        {
            numeros.Desenfileirar();
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"vazia: {ex.Message}");
        }

        Console.WriteLine($"tipo: {typeof(FilaCircular<int>).Name}");
    }
}`,
      hints: [
        'A posição de escrita é `(inicio + contagem) % Capacidade`. Guardar só `inicio` e `contagem` já determina tudo.',
        'Quando a fila está cheia, escrever em `inicio` e avançar `inicio` sobrescreve exatamente o item mais antigo — e a contagem não muda.',
        '`itens[inicio] = default;` ao desenfileirar não é obrigatório para a lógica, mas solta a referência para o coletor de lixo.',
      ],
      tests: [
        {
          name: 'Fila circular',
          expectedStdout:
            'vazia: 0 cheia: False\n' +
            'add a: True\nadd b: True\nadd c: True\nconteudo: a,b,c\ncheia: True\n' +
            'add d: False\nconteudo: b,c,d\nespiar: b\ntira: b\nconteudo: c,d\n' +
            'numeros: 20,30\ntira: 20\ntira: 30\ncontagem: 0\n' +
            'vazia: fila vazia\n' +
            'tipo: FilaCircular`1',
        },
      ],
    },
  },

  {
    id: 's08c01l04',
    title: 'Restrições where',
    objective: 'Exigir capacidades de `T` para poder usá-las, sem abrir mão da segurança de tipo.',
    concept: [
      {
        kind: 'text',
        body:
          'Um `T` sem restrições é praticamente inútil por dentro: só dá para movê-lo de lugar. A cláusula **`where`** muda isso, exigindo que `T` cumpra requisitos — e, em troca, liberando o uso deles.',
      },
      {
        kind: 'code',
        code: `static T Maior<T>(T a, T b) where T : IComparable<T>
{
    return a.CompareTo(b) >= 0 ? a : b;
}`,
        caption: 'A restrição promete `CompareTo`, então o compilador libera a chamada.',
      },
      {
        kind: 'code',
        code: `Console.WriteLine(Maior(3, 7));
Console.WriteLine(Maior("abacaxi", "banana"));
Console.WriteLine(Maior(new DateTime(2020, 1, 1), new DateTime(2021, 1, 1)));`,
      },
      {
        kind: 'output',
        code: `7
banana
01/01/2021 00:00:00`,
        caption: 'Um método, três tipos sem nada em comum além de saberem se comparar.',
      },
      {
        kind: 'text',
        body: 'As restrições disponíveis cobrem quatro perguntas diferentes sobre `T`:',
      },
      {
        kind: 'table',
        headers: ['Restrição', 'Exige que `T` seja', 'Libera'],
        rows: [
          ['`where T : IComparable<T>`', 'um tipo que implementa a interface', 'os membros da interface'],
          ['`where T : class`', 'um tipo de referência', 'comparar com `null`'],
          ['`where T : struct`', 'um tipo de valor', '`T?` como anulável de valor'],
          ['`where T : new()`', 'um tipo com construtor sem parâmetros', '`new T()`'],
          ['`where T : Produto`', 'o próprio tipo ou um derivado', 'os membros de `Produto`'],
        ],
      },
      {
        kind: 'code',
        code: `static T Criar<T>() where T : new()
{
    return new T();
}

static string Descrever<T>(T item) where T : ITemNome
{
    return $"nome={item.Nome}";
}

static T? PrimeiroValor<T>(List<T> itens) where T : struct
{
    if (itens.Count == 0)
    {
        return null;
    }

    return itens[0];
}`,
        caption: 'Em `PrimeiroValor`, `where T : struct` é o que faz `T?` significar `Nullable<T>` e aceitar `null`.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Restrição não é burocracia: é um **contrato nos dois sentidos**. Quem chama precisa cumpri-la, e em troca o corpo do método ganha permissão para usar exatamente o que ela promete — nem mais, nem menos.',
      },
      {
        kind: 'text',
        body:
          'Várias restrições sobre o mesmo `T` são separadas por vírgula, e a ordem é obrigatória: `class` ou `struct` primeiro, depois as interfaces e a classe base, e `new()` sempre por último.',
      },
      {
        kind: 'code',
        code: `static void Processar<T>(T item)
    where T : class, IComparable<T>, new()
{
    // T e referencia, sabe se comparar e tem construtor vazio
}`,
      },
      {
        kind: 'compare',
        good: `static T Maior<T>(T a, T b)
    where T : IComparable<T>
{
    return a.CompareTo(b) >= 0 ? a : b;
}`,
        bad: `static object Maior(object a, object b)
{
    var ca = (IComparable)a;
    return ca.CompareTo(b) >= 0 ? a : b;
    // aceita Maior(3, "texto") e
    // explode em execucao
}`,
        goodLabel: 'Restrição: o compilador cobra',
        badLabel: 'Cast: o usuário descobre',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Restrinja só o necessário. Cada restrição a mais reduz o conjunto de tipos que podem usar seu método, e restrições excessivas transformam um utilitário genérico em algo que serve para três classes.',
      },
    ],
    quiz: [
      {
        id: 's08c01l04q1',
        type: 'single',
        prompt: 'Por que `where T : IComparable<T>` é necessário para chamar `a.CompareTo(b)`?',
        options: [
          { id: 'a', text: 'Sem ela, `T` pode ser um tipo que não tem `CompareTo`', correct: true },
          { id: 'b', text: 'Porque `CompareTo` só existe em tipos genéricos' },
          { id: 'c', text: 'Para melhorar o desempenho da comparação' },
          { id: 'd', text: 'Não é necessário: `CompareTo` existe em `object`' },
        ],
        explanation:
          '`object` tem `ToString`, `Equals` e `GetHashCode` — não `CompareTo`. O compilador só libera um membro quando alguma restrição garante que ele existe.',
      },
      {
        id: 's08c01l04q2',
        type: 'single',
        prompt: 'O que `where T : struct` permite que `where T : class` não permite?',
        options: [
          { id: 'a', text: 'Escrever `T?` como um anulável de tipo de valor', correct: true },
          { id: 'b', text: 'Chamar `new T()`' },
          { id: 'c', text: 'Comparar `T` com `null`' },
          { id: 'd', text: 'Usar `T` como chave de dicionário' },
        ],
        explanation:
          'Com `struct`, `T?` vira `Nullable<T>` e ganha `HasValue` e `Value`. `new T()` exige `new()`, e comparar com `null` é o que `class` libera.',
      },
      {
        id: 's08c01l04q3',
        type: 'single',
        prompt: 'Qual o efeito de acrescentar restrições desnecessárias a um método genérico?',
        options: [
          { id: 'a', text: 'Reduz o conjunto de tipos que podem usá-lo, sem ganho algum', correct: true },
          { id: 'b', text: 'Deixa o método mais rápido' },
          { id: 'c', text: 'Nenhum: restrições não usadas são ignoradas' },
          { id: 'd', text: 'Causa erro de compilação' },
        ],
        explanation:
          'A restrição é uma exigência sobre quem chama. Exigir `new()` num método que nunca constrói nada apenas impede que tipos sem construtor vazio o usem.',
      },
    ],
    challenge: {
      brief:
        'Escreva um conjunto de utilitários que só funcionam graças às restrições: máximo e mínimo de uma lista, criação de instâncias padrão, descrição por interface e primeiro valor de uma lista de tipos de valor.',
      requirements: [
        '`Maior` e `Menor` usam `where T : IComparable<T>` e lançam `ArgumentException` em lista vazia.',
        '`CriarVarios` usa `where T : new()` e devolve uma lista com N instâncias novas.',
        '`Descrever` usa `where T : IIdentificavel` e monta o texto a partir da interface.',
        '`PrimeiroOuNulo` usa `where T : struct` e devolve `T?`.',
        '`MaisRecente` combina duas restrições: `where T : class, IIdentificavel`.',
        'Toda exceção esperada é capturada no `Main` — nada escapa.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

interface IIdentificavel
{
    int Id { get; }
    string Rotulo { get; }
}

class Tarefa : IIdentificavel
{
    public int Id { get; set; }
    public string Rotulo { get; set; } = "sem titulo";
}

class Program
{
    static T Maior<T>(List<T> itens) where T : IComparable<T>
    {
        // TODO: ArgumentException se vazia
        return default;
    }

    static T Menor<T>(List<T> itens) where T : IComparable<T>
    {
        // TODO
        return default;
    }

    static List<T> CriarVarios<T>(int quantidade) where T : new()
    {
        // TODO
        return new List<T>();
    }

    static string Descrever<T>(T item) where T : IIdentificavel
    {
        // TODO: "#id rotulo"
        return "";
    }

    static T? PrimeiroOuNulo<T>(List<T> itens) where T : struct
    {
        // TODO
        return null;
    }

    static T MaisRecente<T>(List<T> itens) where T : class, IIdentificavel
    {
        // TODO: maior Id; null se a lista estiver vazia
        return null;
    }

    static void Main()
    {
        var numeros = new List<int> { 5, 2, 9, 1 };
        Console.WriteLine($"maior: {Maior(numeros)}");
        Console.WriteLine($"menor: {Menor(numeros)}");

        var textos = new List<string> { "pera", "abacaxi", "uva" };
        Console.WriteLine($"maior texto: {Maior(textos)}");
        Console.WriteLine($"menor texto: {Menor(textos)}");

        try
        {
            Maior(new List<int>());
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"vazia: {ex.Message}");
        }

        var tarefas = CriarVarios<Tarefa>(3);
        Console.WriteLine($"criadas: {tarefas.Count}");
        Console.WriteLine($"primeira: {Descrever(tarefas[0])}");

        tarefas[0].Id = 7;
        tarefas[0].Rotulo = "revisar";
        tarefas[1].Id = 12;
        tarefas[1].Rotulo = "publicar";
        tarefas[2].Id = 3;
        tarefas[2].Rotulo = "arquivar";

        Console.WriteLine($"descrita: {Descrever(tarefas[1])}");
        Console.WriteLine($"recente: {Descrever(MaisRecente(tarefas))}");
        Console.WriteLine($"recente de vazia: {MaisRecente(new List<Tarefa>()) == null}");

        Console.WriteLine($"primeiro int: {PrimeiroOuNulo(numeros)}");
        Console.WriteLine($"primeiro vazio: {PrimeiroOuNulo(new List<int>()) == null}");
        Console.WriteLine($"primeiro double: {PrimeiroOuNulo(new List<double> { 1.5 })}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

interface IIdentificavel
{
    int Id { get; }
    string Rotulo { get; }
}

class Tarefa : IIdentificavel
{
    public int Id { get; set; }
    public string Rotulo { get; set; } = "sem titulo";
}

class Program
{
    static T Maior<T>(List<T> itens) where T : IComparable<T>
    {
        if (itens.Count == 0)
        {
            throw new ArgumentException("lista vazia");
        }

        T melhor = itens[0];

        foreach (T item in itens)
        {
            if (item.CompareTo(melhor) > 0)
            {
                melhor = item;
            }
        }

        return melhor;
    }

    static T Menor<T>(List<T> itens) where T : IComparable<T>
    {
        if (itens.Count == 0)
        {
            throw new ArgumentException("lista vazia");
        }

        T melhor = itens[0];

        foreach (T item in itens)
        {
            if (item.CompareTo(melhor) < 0)
            {
                melhor = item;
            }
        }

        return melhor;
    }

    static List<T> CriarVarios<T>(int quantidade) where T : new()
    {
        var lista = new List<T>();

        for (int i = 0; i < quantidade; i++)
        {
            lista.Add(new T());
        }

        return lista;
    }

    static string Descrever<T>(T item) where T : IIdentificavel
    {
        return $"#{item.Id} {item.Rotulo}";
    }

    static T? PrimeiroOuNulo<T>(List<T> itens) where T : struct
    {
        if (itens.Count == 0)
        {
            return null;
        }

        return itens[0];
    }

    static T MaisRecente<T>(List<T> itens) where T : class, IIdentificavel
    {
        T melhor = null;

        foreach (T item in itens)
        {
            if (melhor == null || item.Id > melhor.Id)
            {
                melhor = item;
            }
        }

        return melhor;
    }

    static void Main()
    {
        var numeros = new List<int> { 5, 2, 9, 1 };
        Console.WriteLine($"maior: {Maior(numeros)}");
        Console.WriteLine($"menor: {Menor(numeros)}");

        var textos = new List<string> { "pera", "abacaxi", "uva" };
        Console.WriteLine($"maior texto: {Maior(textos)}");
        Console.WriteLine($"menor texto: {Menor(textos)}");

        try
        {
            Maior(new List<int>());
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"vazia: {ex.Message}");
        }

        var tarefas = CriarVarios<Tarefa>(3);
        Console.WriteLine($"criadas: {tarefas.Count}");
        Console.WriteLine($"primeira: {Descrever(tarefas[0])}");

        tarefas[0].Id = 7;
        tarefas[0].Rotulo = "revisar";
        tarefas[1].Id = 12;
        tarefas[1].Rotulo = "publicar";
        tarefas[2].Id = 3;
        tarefas[2].Rotulo = "arquivar";

        Console.WriteLine($"descrita: {Descrever(tarefas[1])}");
        Console.WriteLine($"recente: {Descrever(MaisRecente(tarefas))}");
        Console.WriteLine($"recente de vazia: {MaisRecente(new List<Tarefa>()) == null}");

        Console.WriteLine($"primeiro int: {PrimeiroOuNulo(numeros)}");
        Console.WriteLine($"primeiro vazio: {PrimeiroOuNulo(new List<int>()) == null}");
        Console.WriteLine($"primeiro double: {PrimeiroOuNulo(new List<double> { 1.5 })}");
    }
}`,
      hints: [
        '`item.CompareTo(melhor) > 0` significa "item vem depois" — para strings isso é ordem alfabética.',
        'Em `MaisRecente`, `melhor == null` só compila porque `where T : class` está presente: sem ela, `T` poderia ser um `int`.',
        'A ordem das restrições é fixa: `class`/`struct` primeiro, interfaces depois, `new()` por último.',
      ],
      tests: [
        {
          name: 'Utilitários com restrição',
          expectedStdout:
            'maior: 9\nmenor: 1\nmaior texto: uva\nmenor texto: abacaxi\n' +
            'vazia: lista vazia\n' +
            'criadas: 3\nprimeira: #0 sem titulo\n' +
            'descrita: #12 publicar\nrecente: #12 publicar\nrecente de vazia: True\n' +
            'primeiro int: 5\nprimeiro vazio: True\nprimeiro double: 1.5',
        },
      ],
    },
  },

  {
    id: 's08c01l05',
    title: 'Vários parâmetros de tipo',
    objective: 'Trabalhar com dois ou mais tipos independentes na mesma classe ou método.',
    concept: [
      {
        kind: 'text',
        body:
          'Nada obriga um genérico a ter um único parâmetro. `Dictionary<TChave, TValor>` é o exemplo mais familiar: dois tipos que variam de forma independente.',
      },
      {
        kind: 'code',
        code: `class Par<TChave, TValor>
{
    public TChave Chave { get; }
    public TValor Valor { get; }

    public Par(TChave chave, TValor valor)
    {
        Chave = chave;
        Valor = valor;
    }

    public override string ToString() => $"{Chave}={Valor}";

    public Par<TValor, TChave> Inverter()
    {
        return new Par<TValor, TChave>(Valor, Chave);
    }
}`,
        caption: '`Inverter` devolve um tipo fechado diferente, com os parâmetros trocados de posição.',
      },
      {
        kind: 'output',
        code: `par: idade=30
invertido: 30=idade`,
        caption: '`Par<string,int>` e `Par<int,string>` são tipos distintos, e o compilador sabe disso.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Com mais de um parâmetro, `T` deixa de ser um bom nome. A convenção é prefixar com `T` e descrever o papel: `TChave`, `TValor`, `TEntrada`, `TSaida`. Um `<T, U, V>` fica ilegível em três linhas.',
      },
      {
        kind: 'text',
        body:
          'Cada parâmetro tem suas próprias restrições, numa cláusula `where` separada por parâmetro:',
      },
      {
        kind: 'code',
        code: `static Dictionary<TChave, List<TItem>> Agrupar<TItem, TChave>(
    List<TItem> itens,
    Func<TItem, TChave> obterChave)
    where TChave : notnull
{
    var grupos = new Dictionary<TChave, List<TItem>>();

    foreach (TItem item in itens)
    {
        TChave chave = obterChave(item);

        if (!grupos.ContainsKey(chave))
        {
            grupos[chave] = new List<TItem>();
        }

        grupos[chave].Add(item);
    }

    return grupos;
}`,
        caption: '`where TChave : notnull` é exigência do próprio `Dictionary`: chave nula não é permitida.',
      },
      {
        kind: 'text',
        body:
          'Repare que `Agrupar` tem **dois** parâmetros de tipo, mas a chamada não precisa escrever nenhum: os dois são inferidos, um pelo tipo da lista e outro pelo retorno da função.',
      },
      {
        kind: 'code',
        code: `var grupos = Agrupar(produtos, p => p.Categoria);
// TItem = Produto, TChave = string`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A inferência é tudo ou nada: ou o compilador deduz **todos** os parâmetros, ou você precisa escrever **todos** explicitamente. Não existe deduzir metade.',
      },
      {
        kind: 'text',
        body:
          'Um método que converte de um tipo para outro é o caso mais comum de dois parâmetros — e é exatamente a assinatura de `Select` do LINQ.',
      },
      {
        kind: 'code',
        code: `static List<TSaida> Mapear<TEntrada, TSaida>(
    List<TEntrada> itens,
    Func<TEntrada, TSaida> converter)
{
    var saida = new List<TSaida>();

    foreach (TEntrada item in itens)
    {
        saida.Add(converter(item));
    }

    return saida;
}`,
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Seu Mapear',
          code: `List<string> nomes =
    Mapear(produtos, p => p.Nome);`,
        },
        right: {
          label: 'Select do LINQ',
          code: `List<string> nomes =
    produtos.Select(p => p.Nome).ToList();`,
        },
        note: 'A mesma ideia. O `Select` é um método de extensão genérico — assunto do próximo capítulo.',
      },
      {
        kind: 'text',
        body:
          'A aridade aparece no nome em tempo de execução: `Par<string,int>` é `` Par`2 ``, e `Dictionary<K,V>` é `` Dictionary`2 ``.',
      },
    ],
    quiz: [
      {
        id: 's08c01l05q1',
        type: 'single',
        prompt: 'Qual a relação entre `Par<string, int>` e `Par<int, string>`?',
        options: [
          { id: 'a', text: 'São tipos completamente distintos', correct: true },
          { id: 'b', text: 'São o mesmo tipo, já que usam os mesmos dois tipos' },
          { id: 'c', text: 'Um converte implicitamente no outro' },
          { id: 'd', text: 'O segundo herda do primeiro' },
        ],
        explanation:
          'A ordem dos parâmetros faz parte da identidade do tipo fechado. É por isso que `Inverter` precisa construir um objeto novo em vez de fazer um cast.',
      },
      {
        id: 's08c01l05q2',
        type: 'single',
        prompt: 'Num método `Mapear<TEntrada, TSaida>(List<TEntrada>, Func<TEntrada, TSaida>)`, como o compilador deduz `TSaida`?',
        options: [
          { id: 'a', text: 'Pelo tipo de retorno da função passada como argumento', correct: true },
          { id: 'b', text: 'Pelo tipo da variável que recebe o resultado' },
          { id: 'c', text: 'Não deduz: `TSaida` precisa ser explícito' },
          { id: 'd', text: 'Assume `object` por padrão' },
        ],
        explanation:
          'O `Func<TEntrada, TSaida>` é um argumento, e a inferência olha os argumentos. Em `p => p.Nome`, o retorno é `string`, então `TSaida` é `string`.',
      },
      {
        id: 's08c01l05q3',
        type: 'single',
        prompt: 'Por que `Agrupar` exige `where TChave : notnull`?',
        options: [
          { id: 'a', text: 'Porque `Dictionary<TChave, ...>` não aceita chave nula', correct: true },
          { id: 'b', text: 'Para permitir comparar `TChave` com `==`' },
          { id: 'c', text: 'Para melhorar o desempenho do agrupamento' },
          { id: 'd', text: 'Porque todo parâmetro de tipo precisa de pelo menos uma restrição' },
        ],
        explanation:
          'A restrição vem do tipo usado por dentro. Sempre que um genérico seu envolve outro genérico com restrições, elas sobem para a sua assinatura.',
      },
    ],
    challenge: {
      brief:
        'Implemente um mini-índice genérico com duas chaves independentes: registre pares, converta entre tipos com `Mapear`, agrupe por uma chave calculada e inverta o par.',
      requirements: [
        '`Par<TChave, TValor>` tem `Inverter()` devolvendo `Par<TValor, TChave>`.',
        '`Mapear<TEntrada, TSaida>` converte uma lista aplicando um `Func`.',
        '`Agrupar<TItem, TChave>` usa `where TChave : notnull` e preserva a ordem de inserção dentro de cada grupo.',
        '`Inverter<TChave, TValor>` recebe um dicionário e devolve outro com chaves e valores trocados; use `where` em ambos.',
        'Nenhuma chamada no `Main` escreve os parâmetros de tipo explicitamente.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Par<TChave, TValor>
{
    public TChave Chave { get; }
    public TValor Valor { get; }

    public Par(TChave chave, TValor valor)
    {
        Chave = chave;
        Valor = valor;
    }

    public override string ToString() => $"{Chave}={Valor}";

    public Par<TValor, TChave> Inverter()
    {
        // TODO
        return null;
    }
}

class Program
{
    static List<TSaida> Mapear<TEntrada, TSaida>(List<TEntrada> itens, Func<TEntrada, TSaida> converter)
    {
        // TODO
        return new List<TSaida>();
    }

    static Dictionary<TChave, List<TItem>> Agrupar<TItem, TChave>(
        List<TItem> itens,
        Func<TItem, TChave> obterChave)
        where TChave : notnull
    {
        // TODO: preserve a ordem de insercao dentro de cada grupo
        return new Dictionary<TChave, List<TItem>>();
    }

    static Dictionary<TValor, TChave> Trocar<TChave, TValor>(Dictionary<TChave, TValor> origem)
        where TChave : notnull
        where TValor : notnull
    {
        // TODO
        return new Dictionary<TValor, TChave>();
    }

    static void Main()
    {
        var par = new Par<string, int>("idade", 30);
        Console.WriteLine($"par: {par}");
        Console.WriteLine($"invertido: {par.Inverter()}");
        Console.WriteLine($"tipo: {par.Inverter().GetType().Name}");

        var palavras = new List<string> { "casa", "sol", "bicicleta" };
        Console.WriteLine($"tamanhos: {string.Join(",", Mapear(palavras, p => p.Length))}");
        Console.WriteLine($"maiusculas: {string.Join(",", Mapear(palavras, p => p.ToUpperInvariant()))}");

        var grupos = Agrupar(palavras, p => p.Length > 3 ? "longa" : "curta");
        foreach (string chave in new[] { "curta", "longa" })
        {
            Console.WriteLine($"{chave}: {string.Join(",", grupos[chave])}");
        }

        var numeros = new List<int> { 1, 2, 3, 4, 5, 6 };
        var porResto = Agrupar(numeros, n => n % 3);
        for (int resto = 0; resto < 3; resto++)
        {
            Console.WriteLine($"resto {resto}: {string.Join(",", porResto[resto])}");
        }

        var siglas = new Dictionary<string, int> { ["um"] = 1, ["dois"] = 2, ["tres"] = 3 };
        var trocado = Trocar(siglas);
        Console.WriteLine($"trocado 2: {trocado[2]}");
        Console.WriteLine($"trocado tamanho: {trocado.Count}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Par<TChave, TValor>
{
    public TChave Chave { get; }
    public TValor Valor { get; }

    public Par(TChave chave, TValor valor)
    {
        Chave = chave;
        Valor = valor;
    }

    public override string ToString() => $"{Chave}={Valor}";

    public Par<TValor, TChave> Inverter()
    {
        return new Par<TValor, TChave>(Valor, Chave);
    }
}

class Program
{
    static List<TSaida> Mapear<TEntrada, TSaida>(List<TEntrada> itens, Func<TEntrada, TSaida> converter)
    {
        var saida = new List<TSaida>();

        foreach (TEntrada item in itens)
        {
            saida.Add(converter(item));
        }

        return saida;
    }

    static Dictionary<TChave, List<TItem>> Agrupar<TItem, TChave>(
        List<TItem> itens,
        Func<TItem, TChave> obterChave)
        where TChave : notnull
    {
        var grupos = new Dictionary<TChave, List<TItem>>();

        foreach (TItem item in itens)
        {
            TChave chave = obterChave(item);

            if (!grupos.ContainsKey(chave))
            {
                grupos[chave] = new List<TItem>();
            }

            grupos[chave].Add(item);
        }

        return grupos;
    }

    static Dictionary<TValor, TChave> Trocar<TChave, TValor>(Dictionary<TChave, TValor> origem)
        where TChave : notnull
        where TValor : notnull
    {
        var saida = new Dictionary<TValor, TChave>();

        foreach (var entrada in origem)
        {
            saida[entrada.Value] = entrada.Key;
        }

        return saida;
    }

    static void Main()
    {
        var par = new Par<string, int>("idade", 30);
        Console.WriteLine($"par: {par}");
        Console.WriteLine($"invertido: {par.Inverter()}");
        Console.WriteLine($"tipo: {par.Inverter().GetType().Name}");

        var palavras = new List<string> { "casa", "sol", "bicicleta" };
        Console.WriteLine($"tamanhos: {string.Join(",", Mapear(palavras, p => p.Length))}");
        Console.WriteLine($"maiusculas: {string.Join(",", Mapear(palavras, p => p.ToUpperInvariant()))}");

        var grupos = Agrupar(palavras, p => p.Length > 3 ? "longa" : "curta");
        foreach (string chave in new[] { "curta", "longa" })
        {
            Console.WriteLine($"{chave}: {string.Join(",", grupos[chave])}");
        }

        var numeros = new List<int> { 1, 2, 3, 4, 5, 6 };
        var porResto = Agrupar(numeros, n => n % 3);
        for (int resto = 0; resto < 3; resto++)
        {
            Console.WriteLine($"resto {resto}: {string.Join(",", porResto[resto])}");
        }

        var siglas = new Dictionary<string, int> { ["um"] = 1, ["dois"] = 2, ["tres"] = 3 };
        var trocado = Trocar(siglas);
        Console.WriteLine($"trocado 2: {trocado[2]}");
        Console.WriteLine($"trocado tamanho: {trocado.Count}");
    }
}`,
      hints: [
        '`Inverter` não pode fazer cast: `Par<A,B>` e `Par<B,A>` são tipos sem relação. Construa um objeto novo.',
        'Em `Agrupar`, `List<TItem>` preserva a ordem de inserção naturalmente — basta adicionar na ordem em que os itens aparecem.',
        'Em `Trocar`, o indexador `saida[valor] = chave` sobrescreve em caso de valores repetidos, o que é o comportamento esperado aqui.',
      ],
      tests: [
        {
          name: 'Dois parâmetros de tipo',
          expectedStdout:
            'par: idade=30\ninvertido: 30=idade\ntipo: Par`2\n' +
            'tamanhos: 4,3,9\nmaiusculas: CASA,SOL,BICICLETA\n' +
            'curta: sol\nlonga: casa,bicicleta\n' +
            'resto 0: 3,6\nresto 1: 1,4\nresto 2: 2,5\n' +
            'trocado 2: dois\ntrocado tamanho: 3',
        },
      ],
    },
  },

  {
    id: 's08c01l06',
    title: 'default e valores genéricos',
    objective: 'Obter e reconhecer o valor inicial de um `T` desconhecido, sem supor se ele é referência ou valor.',
    concept: [
      {
        kind: 'text',
        body:
          'Dentro de um genérico, "o valor vazio de `T`" é um problema real. `null` não serve — `T` pode ser `int`. `0` não serve — `T` pode ser `string`. A resposta é a palavra-chave **`default`**.',
      },
      {
        kind: 'code',
        code: `static T ValorPadrao<T>()
{
    return default;
}`,
        caption: 'Uma única expressão que resolve para o valor inicial correto de qualquer tipo.',
      },
      {
        kind: 'output',
        code: `int: 0
double: 0
bool: False
char vazio: True
string nula: True
ponto: (0,0)
datetime: 0001-01-01
decimal: 0
nullable int: True`,
        caption: '`default` é sempre "a memória zerada": nulo para referências, zero para números, `\\0` para `char`.',
      },
      {
        kind: 'table',
        headers: ['`T`', '`default`'],
        rows: [
          ['`int`, `long`, `decimal`', '`0`'],
          ['`bool`', '`false`'],
          ['`char`', '`\\0`'],
          ['`DateTime`', '`0001-01-01`'],
          ['qualquer `class`, `string`', '`null`'],
          ['`struct`', 'todos os campos em `default`'],
          ['`int?` e outros anuláveis', '`null`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`default` de `string` é `null`, **não** `""`. É uma fonte clássica de `NullReferenceException` em código genérico: você espera uma string vazia e recebe nulo.',
      },
      {
        kind: 'text',
        body:
          'A pergunta inversa — "este valor é o padrão?" — não pode usar `==`, porque `T` sem restrição não promete nenhum operador. A ferramenta correta é `EqualityComparer<T>.Default`.',
      },
      {
        kind: 'compare',
        good: `static bool EhPadrao<T>(T valor)
{
    return EqualityComparer<T>.Default
        .Equals(valor, default);
}`,
        bad: `static bool EhPadrao<T>(T valor)
{
    return valor == default;
    // erro: o operador == nao esta
    // definido para um T qualquer
}`,
        goodLabel: '`EqualityComparer<T>.Default`',
        badLabel: '`==` sem restrição',
      },
      {
        kind: 'text',
        body:
          '`EqualityComparer<T>.Default` escolhe a comparação certa sozinho: usa `IEquatable<T>` quando o tipo implementa, cai no `Equals` herdado quando não, e trata `null` sem estourar.',
      },
      {
        kind: 'code',
        code: `Console.WriteLine(EhPadrao(0));               // True
Console.WriteLine(EhPadrao(1));               // False
Console.WriteLine(EhPadrao(""));              // False, "" nao e null
Console.WriteLine(EhPadrao<string>(null));    // True
Console.WriteLine(EhPadrao(new Ponto()));     // True, struct zerado`,
      },
      {
        kind: 'output',
        code: `True
False
False
True
True`,
        caption: 'Repare na terceira linha: string vazia **não** é o valor padrão de `string`.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Você já viu `default` em ação sem saber: é ele que `FirstOrDefault`, `SingleOrDefault` e `TryGetValue` devolvem quando não encontram nada. O "OrDefault" do nome é literalmente esta palavra-chave.',
      },
      {
        kind: 'text',
        body:
          'Quando o tipo precisa ser explícito, `default(T)` também é válido — a forma curta só funciona onde o compilador consegue deduzir o tipo esperado.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Forma curta',
          code: `T valor = default;
return default;`,
        },
        right: {
          label: 'Forma explícita',
          code: `var valor = default(T);
Console.WriteLine(default(int));`,
        },
        note: 'Em `var` e dentro de interpolação, o compilador não tem o tipo esperado — aí a forma explícita é obrigatória.',
      },
    ],
    quiz: [
      {
        id: 's08c01l06q1',
        type: 'single',
        prompt: 'Qual o valor de `default(string)`?',
        options: [
          { id: 'a', text: '`null`', correct: true },
          { id: 'b', text: '`""`' },
          { id: 'c', text: '`" "`' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          '`string` é um tipo de referência, então seu padrão é nulo. Confundir isso com string vazia é uma das causas mais comuns de `NullReferenceException` em código genérico.',
      },
      {
        id: 's08c01l06q2',
        type: 'single',
        prompt: 'Por que `valor == default` não compila num método `EhPadrao<T>(T valor)` sem restrições?',
        options: [
          { id: 'a', text: 'O operador `==` não é garantido para um `T` qualquer', correct: true },
          { id: 'b', text: 'Porque `default` não pode aparecer à direita de `==`' },
          { id: 'c', text: 'Porque falta escrever `default(T)`' },
          { id: 'd', text: 'Compila normalmente' },
        ],
        explanation:
          'Sem restrição, `T` pode ser um `struct` que não define `==`. `EqualityComparer<T>.Default.Equals` funciona para todos os tipos e é a forma correta.',
      },
      {
        id: 's08c01l06q3',
        type: 'single',
        prompt: 'O que `default` produz para um `struct Ponto { public int X; public int Y; }`?',
        options: [
          { id: 'a', text: 'Um `Ponto` com `X = 0` e `Y = 0`', correct: true },
          { id: 'b', text: '`null`' },
          { id: 'c', text: 'Erro: structs não têm valor padrão' },
          { id: 'd', text: 'Um `Ponto` não inicializado, com lixo de memória' },
        ],
        explanation:
          '`default` de um `struct` zera todos os campos, recursivamente. É o mesmo que `new Ponto()` — e é por isso que todo `struct` tem construtor sem parâmetros implícito.',
      },
    ],
    challenge: {
      brief:
        'Monte um conjunto de utilitários que lidam com o valor padrão de forma genérica: obter, detectar, substituir, contar padrões numa lista e limpar posições.',
      requirements: [
        '`EhPadrao` usa `EqualityComparer<T>.Default` — `==` não compila aqui.',
        '`OuAlternativa` devolve a alternativa quando o valor é o padrão.',
        '`ContarPadroes` conta quantas posições de um array estão no valor padrão.',
        '`Limpar` põe `default` em todas as posições e devolve quantas mudaram.',
        '`PrimeiroNaoPadrao` devolve o primeiro item que não é o padrão, ou o próprio padrão quando não há nenhum.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

struct Ponto
{
    public int X;
    public int Y;
    public override string ToString() => $"({X},{Y})";
}

class Program
{
    static T ValorPadrao<T>()
    {
        // TODO
        return default;
    }

    static bool EhPadrao<T>(T valor)
    {
        // TODO: EqualityComparer<T>.Default
        return false;
    }

    static T OuAlternativa<T>(T valor, T alternativa)
    {
        // TODO
        return valor;
    }

    static int ContarPadroes<T>(T[] itens)
    {
        // TODO
        return 0;
    }

    static int Limpar<T>(T[] itens)
    {
        // TODO: zera tudo e devolve quantas posicoes mudaram
        return 0;
    }

    static T PrimeiroNaoPadrao<T>(T[] itens)
    {
        // TODO
        return default;
    }

    static void Main()
    {
        Console.WriteLine($"int: {ValorPadrao<int>()}");
        Console.WriteLine($"bool: {ValorPadrao<bool>()}");
        Console.WriteLine($"string nula: {ValorPadrao<string>() == null}");
        Console.WriteLine($"ponto: {ValorPadrao<Ponto>()}");
        Console.WriteLine($"decimal: {ValorPadrao<decimal>()}");
        Console.WriteLine($"anulavel: {ValorPadrao<int?>() == null}");

        Console.WriteLine($"padrao 0: {EhPadrao(0)}");
        Console.WriteLine($"padrao 5: {EhPadrao(5)}");
        Console.WriteLine($"padrao vazio: {EhPadrao("")}");
        Console.WriteLine($"padrao nulo: {EhPadrao<string>(null)}");
        Console.WriteLine($"padrao ponto: {EhPadrao(new Ponto())}");
        Console.WriteLine($"ponto com x: {EhPadrao(new Ponto { X = 1 })}");
        Console.WriteLine($"ponto com y: {EhPadrao(new Ponto { Y = 2 })}");

        Console.WriteLine($"alternativa 0: {OuAlternativa(0, 99)}");
        Console.WriteLine($"alternativa 5: {OuAlternativa(5, 99)}");
        Console.WriteLine($"alternativa nula: {OuAlternativa<string>(null, "vazio")}");

        int[] numeros = { 0, 3, 0, 7, 0 };
        Console.WriteLine($"padroes: {ContarPadroes(numeros)}");
        Console.WriteLine($"primeiro nao padrao: {PrimeiroNaoPadrao(numeros)}");

        string[] textos = { null, null, "ok" };
        Console.WriteLine($"padroes texto: {ContarPadroes(textos)}");
        Console.WriteLine($"primeiro texto: {PrimeiroNaoPadrao(textos)}");

        int[] zerados = { 0, 0 };
        Console.WriteLine($"primeiro de zerados: {PrimeiroNaoPadrao(zerados)}");

        Console.WriteLine($"limpou: {Limpar(numeros)}");
        Console.WriteLine($"depois: {string.Join(",", numeros)}");
        Console.WriteLine($"limpou de novo: {Limpar(numeros)}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

struct Ponto
{
    public int X;
    public int Y;
    public override string ToString() => $"({X},{Y})";
}

class Program
{
    static T ValorPadrao<T>()
    {
        return default;
    }

    static bool EhPadrao<T>(T valor)
    {
        return EqualityComparer<T>.Default.Equals(valor, default);
    }

    static T OuAlternativa<T>(T valor, T alternativa)
    {
        return EhPadrao(valor) ? alternativa : valor;
    }

    static int ContarPadroes<T>(T[] itens)
    {
        int total = 0;

        foreach (T item in itens)
        {
            if (EhPadrao(item))
            {
                total++;
            }
        }

        return total;
    }

    static int Limpar<T>(T[] itens)
    {
        int mudadas = 0;

        for (int i = 0; i < itens.Length; i++)
        {
            if (!EhPadrao(itens[i]))
            {
                itens[i] = default;
                mudadas++;
            }
        }

        return mudadas;
    }

    static T PrimeiroNaoPadrao<T>(T[] itens)
    {
        foreach (T item in itens)
        {
            if (!EhPadrao(item))
            {
                return item;
            }
        }

        return default;
    }

    static void Main()
    {
        Console.WriteLine($"int: {ValorPadrao<int>()}");
        Console.WriteLine($"bool: {ValorPadrao<bool>()}");
        Console.WriteLine($"string nula: {ValorPadrao<string>() == null}");
        Console.WriteLine($"ponto: {ValorPadrao<Ponto>()}");
        Console.WriteLine($"decimal: {ValorPadrao<decimal>()}");
        Console.WriteLine($"anulavel: {ValorPadrao<int?>() == null}");

        Console.WriteLine($"padrao 0: {EhPadrao(0)}");
        Console.WriteLine($"padrao 5: {EhPadrao(5)}");
        Console.WriteLine($"padrao vazio: {EhPadrao("")}");
        Console.WriteLine($"padrao nulo: {EhPadrao<string>(null)}");
        Console.WriteLine($"padrao ponto: {EhPadrao(new Ponto())}");
        Console.WriteLine($"ponto com x: {EhPadrao(new Ponto { X = 1 })}");
        Console.WriteLine($"ponto com y: {EhPadrao(new Ponto { Y = 2 })}");

        Console.WriteLine($"alternativa 0: {OuAlternativa(0, 99)}");
        Console.WriteLine($"alternativa 5: {OuAlternativa(5, 99)}");
        Console.WriteLine($"alternativa nula: {OuAlternativa<string>(null, "vazio")}");

        int[] numeros = { 0, 3, 0, 7, 0 };
        Console.WriteLine($"padroes: {ContarPadroes(numeros)}");
        Console.WriteLine($"primeiro nao padrao: {PrimeiroNaoPadrao(numeros)}");

        string[] textos = { null, null, "ok" };
        Console.WriteLine($"padroes texto: {ContarPadroes(textos)}");
        Console.WriteLine($"primeiro texto: {PrimeiroNaoPadrao(textos)}");

        int[] zerados = { 0, 0 };
        Console.WriteLine($"primeiro de zerados: {PrimeiroNaoPadrao(zerados)}");

        Console.WriteLine($"limpou: {Limpar(numeros)}");
        Console.WriteLine($"depois: {string.Join(",", numeros)}");
        Console.WriteLine($"limpou de novo: {Limpar(numeros)}");
    }
}`,
      hints: [
        'Escreva `EhPadrao` primeiro: os outros quatro métodos são todos construídos em cima dele.',
        '`PrimeiroNaoPadrao` num array todo zerado devolve `default` — que é indistinguível de "encontrei um zero". Essa ambiguidade é real, e é a razão de existir `TryGetValue` em vez de só `Get`.',
        '`Limpar` só conta as posições que **mudaram**: rodar duas vezes seguidas devolve 0 na segunda.',
      ],
      tests: [
        {
          name: 'Valores padrão genéricos',
          expectedStdout:
            'int: 0\nbool: False\nstring nula: True\nponto: (0,0)\ndecimal: 0\nanulavel: True\n' +
            'padrao 0: True\npadrao 5: False\npadrao vazio: False\npadrao nulo: True\n' +
            'padrao ponto: True\nponto com x: False\nponto com y: False\n' +
            'alternativa 0: 99\nalternativa 5: 5\nalternativa nula: vazio\n' +
            'padroes: 3\nprimeiro nao padrao: 3\n' +
            'padroes texto: 2\nprimeiro texto: ok\nprimeiro de zerados: 0\n' +
            'limpou: 2\ndepois: 0,0,0,0,0\nlimpou de novo: 0',
        },
      ],
    },
  },

  {
    id: 's08c01l07',
    title: 'Genéricos e desempenho',
    objective: 'Medir o custo do empacotamento e entender por que genéricos são mais rápidos que `object`.',
    concept: [
      {
        kind: 'text',
        body:
          'A vantagem de desempenho dos genéricos tem um nome: eles evitam o **boxing**. Vale entender o que exatamente esse custo é.',
      },
      {
        kind: 'text',
        body:
          'Tipos de valor — `int`, `double`, `bool`, `struct` — vivem diretamente onde foram declarados. Guardá-los num `object` obriga o runtime a **alocar um objeto no heap** e copiar o valor para dentro dele. Isso é o empacotamento.',
      },
      {
        kind: 'code',
        code: `int valor = 42;

object caixa1 = valor;   // aloca um objeto no heap
object caixa2 = valor;   // aloca OUTRO objeto

Console.WriteLine(caixa1.Equals(caixa2));
Console.WriteLine(ReferenceEquals(caixa1, caixa2));
Console.WriteLine(caixa1.GetType().Name);`,
      },
      {
        kind: 'output',
        code: `True
False
Int32`,
        caption: 'Valores iguais, objetos diferentes. Cada `object caixa = valor;` foi uma alocação.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '`GetType()` devolve `Int32`, não `Object`: a caixa lembra o tipo original. É por isso que o desempacotamento pode verificar se o cast está correto — e falhar quando não está.',
      },
      {
        kind: 'text',
        body:
          'O desempacotamento é **estrito**: a conversão de volta só aceita exatamente o tipo original. Um `int` empacotado não sai como `long`, mesmo que a conversão numérica direta funcionasse.',
      },
      {
        kind: 'compare',
        good: `object numero = 42;
int certo = (int)numero;         // ok
long depois = certo;             // ok`,
        bad: `object numero = 42;
long errado = (long)numero;
// InvalidCastException em execucao`,
        goodLabel: 'Desempacotar para o tipo exato',
        badLabel: 'Desempacotar convertendo',
      },
      {
        kind: 'text',
        body:
          'A diferença fica visível em coleções. `ArrayList` guarda `object`, então cada `int` inserido é uma alocação; `List<int>` guarda inteiros de verdade, num array de inteiros.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'ArrayList: empacota tudo',
          code: `var antiga = new ArrayList();
antiga.Add(1);            // boxing

int soma = 0;
foreach (object item in antiga)
{
    soma += (int)item;    // unboxing
}`,
        },
        right: {
          label: 'List<int>: nenhum empacotamento',
          code: `var moderna = new List<int>();
moderna.Add(1);

int soma = 0;
foreach (int item in moderna)
{
    soma += item;
}`,
        },
        note: 'Além do custo, a versão da esquerda aceita `antiga.Add("texto")` sem reclamar — e quebra no `foreach`.',
      },
      {
        kind: 'text',
        body:
          'Dá para medir isso sem cronômetro, usando `GC.GetTotalAllocatedBytes`. Contar bytes é determinístico; contar milissegundos, num ambiente compartilhado, não é.',
      },
      {
        kind: 'code',
        code: `long antes = GC.GetTotalAllocatedBytes(true);

var lista = new List<int>();
for (int i = 0; i < 100000; i++) lista.Add(i);

long depoisGenerico = GC.GetTotalAllocatedBytes(true);

var arraylist = new ArrayList();
for (int i = 0; i < 100000; i++) arraylist.Add(i);

long depoisObjeto = GC.GetTotalAllocatedBytes(true);

Console.WriteLine(depoisObjeto - depoisGenerico > depoisGenerico - antes);`,
      },
      {
        kind: 'output',
        code: `True`,
        caption:
          'A versão com `object` alocou mais que a genérica — 100 mil caixas a mais, além do array de referências.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Cronometrar dentro de um sandbox compartilhado dá números que mudam a cada execução. Quando a lição é sobre custo, prefira medir **alocações** ou **contagem de operações** — as duas são reprodutíveis.',
      },
      {
        kind: 'table',
        headers: ['Operação', 'Com `object`', 'Com `T`'],
        rows: [
          ['guardar um `int`', 'alocação no heap', 'cópia direta'],
          ['ler o valor', 'cast verificado em execução', 'nenhum'],
          ['erro de tipo', 'em execução', 'em compilação'],
          ['pressão sobre o coletor de lixo', 'alta', 'nenhuma'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Para tipos de **referência** o ganho de desempenho desaparece — não há empacotamento a evitar, e o runtime compartilha o mesmo código compilado. O que permanece é a segurança de tipo, que já basta.',
      },
    ],
    quiz: [
      {
        id: 's08c01l07q1',
        type: 'single',
        prompt: 'O que acontece na linha `object caixa = 42;`?',
        options: [
          { id: 'a', text: 'Um objeto é alocado no heap e o valor 42 é copiado para dentro dele', correct: true },
          { id: 'b', text: 'Nada: `object` apenas aponta para o `int` original' },
          { id: 'c', text: 'O `int` é convertido em `string`' },
          { id: 'd', text: 'O compilador rejeita a atribuição' },
        ],
        explanation:
          'Tipos de valor não têm identidade de referência. Para caber onde se espera um `object`, precisam de uma caixa — e cada caixa é uma alocação.',
      },
      {
        id: 's08c01l07q2',
        type: 'single',
        prompt: 'Por que `long x = (long)(object)42;` lança `InvalidCastException`?',
        options: [
          { id: 'a', text: 'O desempacotamento só aceita o tipo exato que foi empacotado', correct: true },
          { id: 'b', text: 'Porque `long` é maior que `int`' },
          { id: 'c', text: 'Porque `object` não guarda números' },
          { id: 'd', text: 'Não lança: a conversão de `int` para `long` é implícita' },
        ],
        explanation:
          'A conversão `int` → `long` existe, mas o desempacotamento acontece antes dela e é estrito. Primeiro `(int)`, depois a conversão numérica.',
      },
      {
        id: 's08c01l07q3',
        type: 'single',
        prompt: 'Por que uma lição sobre desempenho deve medir alocações em vez de tempo?',
        options: [
          { id: 'a', text: 'A contagem de bytes é reprodutível; o tempo varia a cada execução', correct: true },
          { id: 'b', text: 'Porque medir tempo em C# não é possível' },
          { id: 'c', text: 'Porque alocações são sempre mais importantes que tempo' },
          { id: 'd', text: 'Porque `Stopwatch` só funciona em modo de depuração' },
        ],
        explanation:
          '`Stopwatch` funciona, mas o número muda conforme a carga da máquina. Um teste automatizado precisa de um resultado determinístico, e alocações são.',
      },
    ],
    challenge: {
      brief:
        'Demonstre o custo do empacotamento de forma medível: compare identidade de referência, mostre o desempacotamento estrito falhando, some a mesma coleção nas duas formas e compare as alocações.',
      requirements: [
        'Use `ReferenceEquals` para mostrar que dois empacotamentos do mesmo valor são objetos distintos.',
        'A conversão inválida fica dentro de `try` / `catch (InvalidCastException)`.',
        'Compare as alocações com `GC.GetTotalAllocatedBytes(true)` e imprima apenas o **booleano** da comparação — nunca o número, que varia.',
        'A soma calculada pelas duas coleções deve bater exatamente.',
        'Não use `Stopwatch` nem imprima qualquer medida de tempo.',
      ],
      starterCode: `using System;
using System.Collections;
using System.Collections.Generic;

class Program
{
    static long SomarComObjeto(int quantidade, out long alocado)
    {
        // TODO: ArrayList, medindo alocacao antes e depois
        alocado = 0;
        return 0;
    }

    static long SomarComGenerico(int quantidade, out long alocado)
    {
        // TODO: List<int>, medindo alocacao antes e depois
        alocado = 0;
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
        Console.WriteLine($"referencia compartilhada: {ReferenceEquals(r1, r2)}");

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

        Console.WriteLine($"cast em dois passos: {(long)(int)numero}");

        long somaObjeto = SomarComObjeto(100000, out long alocadoObjeto);
        long somaGenerico = SomarComGenerico(100000, out long alocadoGenerico);

        Console.WriteLine($"somas iguais: {somaObjeto == somaGenerico}");
        Console.WriteLine($"soma: {somaGenerico}");
        Console.WriteLine($"generico alocou algo: {alocadoGenerico > 0}");
        Console.WriteLine($"objeto alocou mais: {alocadoObjeto > alocadoGenerico}");
    }
}`,
      solution: `using System;
using System.Collections;
using System.Collections.Generic;

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
        Console.WriteLine($"referencia compartilhada: {ReferenceEquals(r1, r2)}");

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

        Console.WriteLine($"cast em dois passos: {(long)(int)numero}");

        long somaObjeto = SomarComObjeto(100000, out long alocadoObjeto);
        long somaGenerico = SomarComGenerico(100000, out long alocadoGenerico);

        Console.WriteLine($"somas iguais: {somaObjeto == somaGenerico}");
        Console.WriteLine($"soma: {somaGenerico}");
        Console.WriteLine($"generico alocou algo: {alocadoGenerico > 0}");
        Console.WriteLine($"objeto alocou mais: {alocadoObjeto > alocadoGenerico}");
      }
}`,
      hints: [
        '`GC.GetTotalAllocatedBytes(true)` com `true` força a contabilização precisa antes de devolver o número.',
        'Meça **antes** de criar a coleção e **depois** do laço de soma, para que o empacotamento do `foreach` também entre na conta.',
        'Imprimir `alocadoObjeto > alocadoGenerico` é seguro; imprimir `alocadoObjeto` não é — o número exato depende da versão do runtime.',
      ],
      tests: [
        {
          name: 'O custo do empacotamento',
          expectedStdout:
            'valores iguais: True\nmesma referencia: False\ntipo na caixa: Int32\n' +
            'referencia compartilhada: True\n' +
            'cast exato: 42\ncast largo: InvalidCastException\ncast em dois passos: 42\n' +
            'somas iguais: True\nsoma: 4999950000\n' +
            'generico alocou algo: True\nobjeto alocou mais: True',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's08c01l08',
    title: 'Cache genérico',
    objective: 'Guardar resultados por tipo, aproveitando que campos estáticos são independentes em cada tipo fechado.',
    concept: [
      {
        kind: 'text',
        body:
          'Aqui está um comportamento que surpreende quase todo mundo na primeira vez: um campo `static` numa classe genérica **não é compartilhado** entre os tipos fechados. Cada `Contador<int>`, `Contador<string>` e `Contador<decimal>` tem o seu.',
      },
      {
        kind: 'code',
        code: `class Contador<T>
{
    public static int Criados;

    public Contador()
    {
        Criados++;
    }
}`,
      },
      {
        kind: 'code',
        code: `new Contador<int>();
new Contador<int>();
new Contador<int>();
new Contador<string>();

Console.WriteLine(Contador<int>.Criados);
Console.WriteLine(Contador<string>.Criados);
Console.WriteLine(Contador<decimal>.Criados);`,
      },
      {
        kind: 'output',
        code: `3
1
0`,
        caption: '`Contador<decimal>` nunca foi instanciado, e seu contador está intocado em zero.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'É consequência direta do que a lição 3 mostrou: `Contador<int>` e `Contador<string>` são **tipos diferentes**. Tipos diferentes têm estáticos diferentes. Não é uma exceção da regra — é a regra.',
      },
      {
        kind: 'text',
        body:
          'Isso pode ser uma armadilha ou uma ferramenta. Como armadilha: um contador global que você esperava único vira um contador por tipo. Como ferramenta: é a base de um **cache por tipo** sem dicionário nenhum.',
      },
      {
        kind: 'code',
        code: `static class Descritor<T>
{
    // Calculado uma vez por tipo fechado, na primeira leitura.
    public static readonly string Nome = typeof(T).Name;
    public static readonly bool EhValor = typeof(T).IsValueType;
}`,
        caption: 'Um `static readonly` é inicializado uma única vez por tipo fechado, sem lock e sem custo por chamada.',
      },
      {
        kind: 'text',
        body:
          'O cache mais comum, porém, é por **valor**, não por tipo — e para isso a ferramenta é uma classe genérica com dicionário interno, exatamente o padrão da memoização da Seção 7.',
      },
      {
        kind: 'code',
        code: `class Cache<TChave, TValor> where TChave : notnull
{
    private readonly Dictionary<TChave, TValor> mapa = new();

    public int Acertos { get; private set; }
    public int Erros { get; private set; }
    public int Tamanho => mapa.Count;

    public TValor Obter(TChave chave, Func<TChave, TValor> calcular)
    {
        if (mapa.TryGetValue(chave, out TValor existente))
        {
            Acertos++;
            return existente;
        }

        Erros++;
        TValor novo = calcular(chave);
        mapa[chave] = novo;
        return novo;
    }
}`,
        caption: 'Genérico nos dois eixos: a chave e o valor variam de forma independente.',
      },
      {
        kind: 'code',
        code: `var cache = new Cache<int, long>();
int chamadas = 0;
Func<int, long> quadrado = n => { chamadas++; return (long)n * n; };

cache.Obter(5, quadrado);
cache.Obter(5, quadrado);
cache.Obter(7, quadrado);

Console.WriteLine($"chamadas: {chamadas} acertos: {cache.Acertos} erros: {cache.Erros}");`,
      },
      {
        kind: 'output',
        code: `chamadas: 2 acertos: 1 erros: 2`,
        caption: 'Três pedidos, dois cálculos: a segunda consulta ao 5 veio do dicionário.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`where TChave : notnull` não é decoração: `Dictionary` recusa chave nula. Sempre que seu genérico envolve outro genérico com restrições, essas restrições sobem para a sua assinatura.',
      },
      {
        kind: 'compare',
        good: `// contador global de verdade
static class Metricas
{
    public static int Total;
}`,
        bad: `// um contador por tipo fechado,
// provavelmente sem querer
class Metricas<T>
{
    public static int Total;
}`,
        goodLabel: 'Estático numa classe não genérica',
        badLabel: 'Estático numa classe genérica',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Um cache sem limite é um vazamento de memória com outro nome. Em produção, todo cache precisa de política de descarte — tamanho máximo, tempo de vida, ou os dois.',
      },
    ],
    quiz: [
      {
        id: 's08c01l08q1',
        type: 'single',
        prompt: 'Depois de criar três `Contador<int>` e um `Contador<string>`, quanto vale `Contador<string>.Criados`?',
        options: [
          { id: 'a', text: '1', correct: true },
          { id: 'b', text: '4' },
          { id: 'c', text: '3' },
          { id: 'd', text: '0' },
        ],
        explanation:
          'Cada tipo fechado tem seu próprio conjunto de campos estáticos. O contador de `string` só foi incrementado uma vez, pela única instância criada.',
      },
      {
        id: 's08c01l08q2',
        type: 'single',
        prompt: 'Você quer um contador global compartilhado por todos os tipos. Onde colocar o campo estático?',
        options: [
          { id: 'a', text: 'Numa classe não genérica separada', correct: true },
          { id: 'b', text: 'Na própria classe genérica, com `readonly`' },
          { id: 'c', text: 'Na classe genérica, marcado como `const`' },
          { id: 'd', text: 'Não é possível ter um contador global em C#' },
        ],
        explanation:
          'Qualquer estático dentro de `Classe<T>` é replicado por tipo fechado. O único jeito de compartilhar é tirá-lo do genérico.',
      },
      {
        id: 's08c01l08q3',
        type: 'single',
        prompt: 'Por que `Cache<TChave, TValor>` precisa de `where TChave : notnull`?',
        options: [
          { id: 'a', text: 'Porque o `Dictionary` usado internamente não aceita chave nula', correct: true },
          { id: 'b', text: 'Para permitir comparar chaves com `==`' },
          { id: 'c', text: 'Para que `TValor` possa ser um tipo de valor' },
          { id: 'd', text: 'Para melhorar o desempenho do dicionário' },
        ],
        explanation:
          'A restrição é herdada do tipo que você usa por dentro. Sem ela o código nem compila, porque `Dictionary<TChave, TValor>` já a exige.',
      },
    ],
    challenge: {
      brief:
        'Construa um cache genérico com estatísticas e demonstre o comportamento por tipo dos campos estáticos: contadores independentes por tipo fechado, e um contador global que realmente é global.',
      requirements: [
        '`Cache<TChave, TValor>` usa `where TChave : notnull` e expõe `Acertos`, `Erros`, `Tamanho`.',
        '`Obter` calcula apenas quando a chave está ausente.',
        '`Remover` devolve `true` só quando havia algo para remover; `Limpar` zera o dicionário mas **preserva** as estatísticas.',
        '`Rastreador<T>` tem um estático por tipo fechado; `MetricaGlobal` tem um estático único, numa classe não genérica.',
        'Imprima os três contadores por tipo, incluindo um tipo nunca instanciado.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

static class MetricaGlobal
{
    public static int Total;
}

class Rastreador<T>
{
    // TODO: contador estatico por tipo fechado, mais o incremento global
    public static int Criados;

    public Rastreador()
    {
        // TODO
    }
}

class Cache<TChave, TValor> where TChave : notnull
{
    private readonly Dictionary<TChave, TValor> mapa = new();

    public int Acertos { get; private set; }
    public int Erros { get; private set; }
    public int Tamanho => mapa.Count;

    public TValor Obter(TChave chave, Func<TChave, TValor> calcular)
    {
        // TODO
        return default;
    }

    public bool Contem(TChave chave)
    {
        // TODO
        return false;
    }

    public bool Remover(TChave chave)
    {
        // TODO
        return false;
    }

    public void Limpar()
    {
        // TODO: esvazia o mapa e preserva Acertos e Erros
    }
}

class Program
{
    static void Main()
    {
        var cache = new Cache<int, long>();
        int chamadas = 0;
        Func<int, long> quadrado = n =>
        {
            chamadas++;
            return (long)n * n;
        };

        Console.WriteLine($"obter 5: {cache.Obter(5, quadrado)}");
        Console.WriteLine($"obter 5: {cache.Obter(5, quadrado)}");
        Console.WriteLine($"obter 7: {cache.Obter(7, quadrado)}");
        Console.WriteLine($"obter 7: {cache.Obter(7, quadrado)}");
        Console.WriteLine($"chamadas: {chamadas}");
        Console.WriteLine($"acertos: {cache.Acertos} erros: {cache.Erros} tamanho: {cache.Tamanho}");

        Console.WriteLine($"contem 5: {cache.Contem(5)}");
        Console.WriteLine($"remover 5: {cache.Remover(5)}");
        Console.WriteLine($"remover 5: {cache.Remover(5)}");
        Console.WriteLine($"tamanho: {cache.Tamanho}");

        cache.Limpar();
        Console.WriteLine($"apos limpar tamanho: {cache.Tamanho}");
        Console.WriteLine($"apos limpar acertos: {cache.Acertos}");

        var textos = new Cache<string, int>();
        Console.WriteLine($"texto: {textos.Obter("bicicleta", s => s.Length)}");
        Console.WriteLine($"texto: {textos.Obter("bicicleta", s => s.Length)}");
        Console.WriteLine($"texto acertos: {textos.Acertos} erros: {textos.Erros}");

        new Rastreador<int>();
        new Rastreador<int>();
        new Rastreador<int>();
        new Rastreador<string>();

        Console.WriteLine($"rastreador int: {Rastreador<int>.Criados}");
        Console.WriteLine($"rastreador string: {Rastreador<string>.Criados}");
        Console.WriteLine($"rastreador decimal: {Rastreador<decimal>.Criados}");
        Console.WriteLine($"global: {MetricaGlobal.Total}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

static class MetricaGlobal
{
    public static int Total;
}

class Rastreador<T>
{
    public static int Criados;

    public Rastreador()
    {
        Criados++;
        MetricaGlobal.Total++;
    }
}

class Cache<TChave, TValor> where TChave : notnull
{
    private readonly Dictionary<TChave, TValor> mapa = new();

    public int Acertos { get; private set; }
    public int Erros { get; private set; }
    public int Tamanho => mapa.Count;

    public TValor Obter(TChave chave, Func<TChave, TValor> calcular)
    {
        if (mapa.TryGetValue(chave, out TValor existente))
        {
            Acertos++;
            return existente;
        }

        Erros++;
        TValor novo = calcular(chave);
        mapa[chave] = novo;
        return novo;
    }

    public bool Contem(TChave chave)
    {
        return mapa.ContainsKey(chave);
    }

    public bool Remover(TChave chave)
    {
        return mapa.Remove(chave);
    }

    public void Limpar()
    {
        mapa.Clear();
    }
}

class Program
{
    static void Main()
    {
        var cache = new Cache<int, long>();
        int chamadas = 0;
        Func<int, long> quadrado = n =>
        {
            chamadas++;
            return (long)n * n;
        };

        Console.WriteLine($"obter 5: {cache.Obter(5, quadrado)}");
        Console.WriteLine($"obter 5: {cache.Obter(5, quadrado)}");
        Console.WriteLine($"obter 7: {cache.Obter(7, quadrado)}");
        Console.WriteLine($"obter 7: {cache.Obter(7, quadrado)}");
        Console.WriteLine($"chamadas: {chamadas}");
        Console.WriteLine($"acertos: {cache.Acertos} erros: {cache.Erros} tamanho: {cache.Tamanho}");

        Console.WriteLine($"contem 5: {cache.Contem(5)}");
        Console.WriteLine($"remover 5: {cache.Remover(5)}");
        Console.WriteLine($"remover 5: {cache.Remover(5)}");
        Console.WriteLine($"tamanho: {cache.Tamanho}");

        cache.Limpar();
        Console.WriteLine($"apos limpar tamanho: {cache.Tamanho}");
        Console.WriteLine($"apos limpar acertos: {cache.Acertos}");

        var textos = new Cache<string, int>();
        Console.WriteLine($"texto: {textos.Obter("bicicleta", s => s.Length)}");
        Console.WriteLine($"texto: {textos.Obter("bicicleta", s => s.Length)}");
        Console.WriteLine($"texto acertos: {textos.Acertos} erros: {textos.Erros}");

        new Rastreador<int>();
        new Rastreador<int>();
        new Rastreador<int>();
        new Rastreador<string>();

        Console.WriteLine($"rastreador int: {Rastreador<int>.Criados}");
        Console.WriteLine($"rastreador string: {Rastreador<string>.Criados}");
        Console.WriteLine($"rastreador decimal: {Rastreador<decimal>.Criados}");
        Console.WriteLine($"global: {MetricaGlobal.Total}");
    }
}`,
      hints: [
        '`mapa.TryGetValue(chave, out TValor existente)` faz busca e leitura numa passada só — melhor que `ContainsKey` seguido de indexador.',
        '`Limpar` chama apenas `mapa.Clear()`. As estatísticas são propriedades independentes e não devem ser tocadas.',
        '`Rastreador<decimal>` nunca é instanciado no `Main`, e por isso seu contador imprime 0 — é essa linha que prova a independência por tipo fechado.',
      ],
      tests: [
        {
          name: 'Cache e estáticos por tipo',
          expectedStdout:
            'obter 5: 25\nobter 5: 25\nobter 7: 49\nobter 7: 49\nchamadas: 2\n' +
            'acertos: 2 erros: 2 tamanho: 2\n' +
            'contem 5: True\nremover 5: True\nremover 5: False\ntamanho: 1\n' +
            'apos limpar tamanho: 0\napos limpar acertos: 2\n' +
            'texto: 9\ntexto: 9\ntexto acertos: 1 erros: 1\n' +
            'rastreador int: 3\nrastreador string: 1\nrastreador decimal: 0\nglobal: 4',
        },
      ],
    },
  },

  {
    id: 's08c01l09',
    title: 'Prática: fábrica genérica',
    objective: 'Montar um registro de construtores por chave, tipado, sem `object` e sem conversões.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma **fábrica** decide em tempo de execução qual objeto criar, a partir de uma chave — um nome de configuração, um tipo lido de um arquivo, uma opção do usuário. O desafio é fazer isso sem perder a tipagem.',
      },
      {
        kind: 'text',
        body:
          'A ingênua guarda `Type` e usa reflexão. A boa guarda **funções que constroem**: `Func<TBase>` é um construtor empacotado, e o compilador verifica cada registro no momento em que ele é escrito.',
      },
      {
        kind: 'code',
        code: `class Fabrica<TBase>
{
    private readonly Dictionary<string, Func<TBase>> criadores = new();

    public void Registrar(string chave, Func<TBase> criador)
    {
        criadores[chave] = criador;
    }

    public TBase Criar(string chave)
    {
        if (!criadores.TryGetValue(chave, out var criador))
        {
            throw new KeyNotFoundException($"sem receita para {chave}");
        }

        return criador();
    }
}`,
        caption: '`TBase` costuma ser uma interface: a fábrica produz implementações diferentes do mesmo contrato.',
      },
      {
        kind: 'code',
        code: `var fabrica = new Fabrica<IProduto>();
fabrica.Registrar("cafe", () => new Cafe());
fabrica.Registrar("cha", () => new Cha());

Console.WriteLine(fabrica.Criar("cafe").Nome);`,
      },
      {
        kind: 'output',
        code: `cafe`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O detalhe importante é que a lambda `() => new Cafe()` é executada **a cada chamada** de `Criar`. A fábrica guarda a receita, não o prato pronto — duas chamadas devolvem instâncias distintas.',
      },
      {
        kind: 'compare',
        good: `fabrica.Registrar("cafe", () => new Cafe());
// uma instancia nova por chamada`,
        bad: `var unico = new Cafe();
fabrica.Registrar("cafe", () => unico);
// sempre a mesma instancia,
// compartilhada por todos`,
        goodLabel: 'Fábrica',
        badLabel: 'Singleton disfarçado de fábrica',
      },
      {
        kind: 'text',
        body:
          'Falta decidir o que acontece quando a chave não existe. Duas respostas legítimas, e a fábrica deve oferecer as duas — o mesmo par que você já viu em `Parse`/`TryParse` e em `[]`/`TryGetValue`.',
      },
      {
        kind: 'table',
        headers: ['Método', 'Chave ausente', 'Quando usar'],
        rows: [
          ['`Criar`', 'lança `KeyNotFoundException`', 'a ausência é um erro de programação'],
          ['`CriarOuPadrao`', 'devolve `default`', 'a ausência é esperada e tratável'],
        ],
      },
      {
        kind: 'code',
        code: `public TBase CriarOuPadrao(string chave)
{
    return criadores.TryGetValue(chave, out var criador)
        ? criador()
        : default;
}`,
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Sem restrição, `default` de `TBase` pode ser `null` (interface) ou um valor zerado (`struct`). Se a fábrica deve sempre devolver algo ou nada, adicione `where TBase : class` — aí `default` é sempre `null` e o contrato fica claro.',
      },
      {
        kind: 'text',
        body:
          'Uma fábrica útil também consegue se descrever: listar as chaves conhecidas e responder se uma chave está registrada. Ordenar a listagem com `StringComparer.Ordinal` garante que a saída não dependa da ordem interna do dicionário.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A ordem de enumeração de um `Dictionary` **não é garantida** pelo contrato dele. Sempre que a saída for comparada — num teste, num log, numa API — ordene antes de imprimir.',
      },
    ],
    quiz: [
      {
        id: 's08c01l09q1',
        type: 'single',
        prompt: 'Por que a fábrica guarda `Func<TBase>` em vez de `TBase`?',
        options: [
          { id: 'a', text: 'Para criar uma instância nova a cada chamada, em vez de compartilhar uma só', correct: true },
          { id: 'b', text: 'Porque `Dictionary` não aceita interfaces como valor' },
          { id: 'c', text: 'Para economizar memória no registro' },
          { id: 'd', text: 'Porque `TBase` não pode ser instanciado sem `new()`' },
        ],
        explanation:
          'Guardar a instância transforma a fábrica num registro de singletons. Guardar a função guarda a **receita**, que é executada de novo a cada `Criar`.',
      },
      {
        id: 's08c01l09q2',
        type: 'single',
        prompt: 'Por que ordenar as chaves antes de imprimi-las?',
        options: [
          { id: 'a', text: 'A ordem de enumeração de um `Dictionary` não é garantida pelo contrato', correct: true },
          { id: 'b', text: 'Porque `string.Join` exige uma lista ordenada' },
          { id: 'c', text: 'Para deixar a busca mais rápida' },
          { id: 'd', text: 'Não é necessário: dicionários mantêm a ordem de inserção' },
        ],
        explanation:
          'Hoje pode funcionar por acaso, e amanhã quebrar sem ninguém ter mudado o código. Depender de ordem não garantida é um bug esperando a hora certa.',
      },
      {
        id: 's08c01l09q3',
        type: 'single',
        prompt: 'Qual a diferença entre `Criar` e `CriarOuPadrao` quando a chave não existe?',
        options: [
          { id: 'a', text: '`Criar` lança exceção; `CriarOuPadrao` devolve `default`', correct: true },
          { id: 'b', text: '`Criar` devolve `null`; `CriarOuPadrao` lança exceção' },
          { id: 'c', text: 'Os dois lançam exceção, com mensagens diferentes' },
          { id: 'd', text: 'Não há diferença de comportamento' },
        ],
        explanation:
          'É o mesmo par de `Parse`/`TryParse`: uma versão trata a ausência como erro, a outra como resultado possível. Oferecer as duas deixa a escolha com quem chama.',
      },
    ],
    challenge: {
      brief:
        'Implemente uma fábrica genérica de relatórios: registre construtores por chave, produza instâncias novas, liste as chaves de forma determinística e ofereça as duas políticas para chave ausente.',
      requirements: [
        '`Fabrica<TBase>` usa `where TBase : class` e guarda `Dictionary<string, Func<TBase>>`.',
        '`Registrar` sobrescreve uma chave já existente e devolve `true` quando substituiu, `false` quando era nova.',
        '`Criar` lança `KeyNotFoundException` com a mensagem `sem receita para <chave>`.',
        '`CriarOuPadrao` devolve `null` para chave desconhecida.',
        '`Chaves` devolve a lista ordenada com `StringComparer.Ordinal`.',
        'Duas chamadas a `Criar` com a mesma chave devolvem instâncias diferentes.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

interface IRelatorio
{
    string Titulo { get; }
    string Gerar(int linhas);
}

class Resumo : IRelatorio
{
    public string Titulo => "resumo";
    public string Gerar(int linhas) => $"resumo com {linhas} linha(s)";
}

class Detalhado : IRelatorio
{
    public string Titulo => "detalhado";
    public string Gerar(int linhas) => $"detalhado com {linhas * 3} linha(s)";
}

class Fabrica<TBase> where TBase : class
{
    private readonly Dictionary<string, Func<TBase>> criadores = new();

    public int Registradas => criadores.Count;

    public bool Registrar(string chave, Func<TBase> criador)
    {
        // TODO: devolve true se sobrescreveu uma chave existente
        return false;
    }

    public bool Conhece(string chave)
    {
        // TODO
        return false;
    }

    public TBase Criar(string chave)
    {
        // TODO: KeyNotFoundException com "sem receita para <chave>"
        return null;
    }

    public TBase CriarOuPadrao(string chave)
    {
        // TODO: null quando a chave nao existe
        return null;
    }

    public List<string> Chaves()
    {
        // TODO: ordenada com StringComparer.Ordinal
        return new List<string>();
    }
}

class Program
{
    static void Main()
    {
        var fabrica = new Fabrica<IRelatorio>();

        Console.WriteLine($"registrar resumo: {fabrica.Registrar("resumo", () => new Resumo())}");
        Console.WriteLine($"registrar detalhado: {fabrica.Registrar("detalhado", () => new Detalhado())}");
        Console.WriteLine($"registrar resumo de novo: {fabrica.Registrar("resumo", () => new Resumo())}");
        Console.WriteLine($"registradas: {fabrica.Registradas}");
        Console.WriteLine($"chaves: {string.Join(",", fabrica.Chaves())}");

        Console.WriteLine($"conhece resumo: {fabrica.Conhece("resumo")}");
        Console.WriteLine($"conhece grafico: {fabrica.Conhece("grafico")}");

        IRelatorio r = fabrica.Criar("detalhado");
        Console.WriteLine($"titulo: {r.Titulo}");
        Console.WriteLine($"gerado: {r.Gerar(4)}");
        Console.WriteLine($"gerado resumo: {fabrica.Criar("resumo").Gerar(4)}");

        var a = fabrica.Criar("resumo");
        var b = fabrica.Criar("resumo");
        Console.WriteLine($"instancias distintas: {!ReferenceEquals(a, b)}");

        Console.WriteLine($"ou padrao: {fabrica.CriarOuPadrao("grafico") == null}");
        Console.WriteLine($"ou padrao valido: {fabrica.CriarOuPadrao("resumo").Titulo}");

        try
        {
            fabrica.Criar("grafico");
        }
        catch (KeyNotFoundException ex)
        {
            Console.WriteLine($"erro: {ex.Message}");
        }

        var vazia = new Fabrica<IRelatorio>();
        Console.WriteLine($"vazia chaves: [{string.Join(",", vazia.Chaves())}]");
        Console.WriteLine($"vazia registradas: {vazia.Registradas}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

interface IRelatorio
{
    string Titulo { get; }
    string Gerar(int linhas);
}

class Resumo : IRelatorio
{
    public string Titulo => "resumo";
    public string Gerar(int linhas) => $"resumo com {linhas} linha(s)";
}

class Detalhado : IRelatorio
{
    public string Titulo => "detalhado";
    public string Gerar(int linhas) => $"detalhado com {linhas * 3} linha(s)";
}

class Fabrica<TBase> where TBase : class
{
    private readonly Dictionary<string, Func<TBase>> criadores = new();

    public int Registradas => criadores.Count;

    public bool Registrar(string chave, Func<TBase> criador)
    {
        bool substituiu = criadores.ContainsKey(chave);
        criadores[chave] = criador;
        return substituiu;
    }

    public bool Conhece(string chave)
    {
        return criadores.ContainsKey(chave);
    }

    public TBase Criar(string chave)
    {
        if (!criadores.TryGetValue(chave, out var criador))
        {
            throw new KeyNotFoundException($"sem receita para {chave}");
        }

        return criador();
    }

    public TBase CriarOuPadrao(string chave)
    {
        return criadores.TryGetValue(chave, out var criador) ? criador() : null;
    }

    public List<string> Chaves()
    {
        var lista = new List<string>(criadores.Keys);
        lista.Sort(StringComparer.Ordinal);
        return lista;
    }
}

class Program
{
    static void Main()
    {
        var fabrica = new Fabrica<IRelatorio>();

        Console.WriteLine($"registrar resumo: {fabrica.Registrar("resumo", () => new Resumo())}");
        Console.WriteLine($"registrar detalhado: {fabrica.Registrar("detalhado", () => new Detalhado())}");
        Console.WriteLine($"registrar resumo de novo: {fabrica.Registrar("resumo", () => new Resumo())}");
        Console.WriteLine($"registradas: {fabrica.Registradas}");
        Console.WriteLine($"chaves: {string.Join(",", fabrica.Chaves())}");

        Console.WriteLine($"conhece resumo: {fabrica.Conhece("resumo")}");
        Console.WriteLine($"conhece grafico: {fabrica.Conhece("grafico")}");

        IRelatorio r = fabrica.Criar("detalhado");
        Console.WriteLine($"titulo: {r.Titulo}");
        Console.WriteLine($"gerado: {r.Gerar(4)}");
        Console.WriteLine($"gerado resumo: {fabrica.Criar("resumo").Gerar(4)}");

        var a = fabrica.Criar("resumo");
        var b = fabrica.Criar("resumo");
        Console.WriteLine($"instancias distintas: {!ReferenceEquals(a, b)}");

        Console.WriteLine($"ou padrao: {fabrica.CriarOuPadrao("grafico") == null}");
        Console.WriteLine($"ou padrao valido: {fabrica.CriarOuPadrao("resumo").Titulo}");

        try
        {
            fabrica.Criar("grafico");
        }
        catch (KeyNotFoundException ex)
        {
            Console.WriteLine($"erro: {ex.Message}");
        }

        var vazia = new Fabrica<IRelatorio>();
        Console.WriteLine($"vazia chaves: [{string.Join(",", vazia.Chaves())}]");
        Console.WriteLine($"vazia registradas: {vazia.Registradas}");
    }
}`,
      hints: [
        'Em `Registrar`, verifique `ContainsKey` **antes** de escrever no indexador: depois da escrita a informação já se perdeu.',
        '`CriarOuPadrao` pode devolver `null` literal porque `where TBase : class` garante que `TBase` é um tipo de referência.',
        '`new List<string>(criadores.Keys)` copia as chaves; ordenar a cópia não afeta o dicionário.',
      ],
      tests: [
        {
          name: 'Fábrica de relatórios',
          expectedStdout:
            'registrar resumo: False\nregistrar detalhado: False\nregistrar resumo de novo: True\n' +
            'registradas: 2\nchaves: detalhado,resumo\n' +
            'conhece resumo: True\nconhece grafico: False\n' +
            'titulo: detalhado\ngerado: detalhado com 12 linha(s)\ngerado resumo: resumo com 4 linha(s)\n' +
            'instancias distintas: True\n' +
            'ou padrao: True\nou padrao valido: resumo\n' +
            'erro: sem receita para grafico\n' +
            'vazia chaves: []\nvazia registradas: 0',
        },
      ],
    },
  },

  {
    id: 's08c01l10',
    title: 'Checkpoint: genéricos',
    objective: 'Reunir parâmetros de tipo, restrições, `default` e estáticos por tipo fechado num componente só.',
    concept: [
      {
        kind: 'text',
        body:
          'Este capítulo cobriu tudo o que é preciso para escrever genéricos de verdade. Antes do desafio, vale ver as peças juntas.',
      },
      {
        kind: 'table',
        headers: ['Peça', 'O que resolve'],
        rows: [
          ['`class C<T>` / `M<T>()`', 'um molde que serve para qualquer tipo, sem `object`'],
          ['inferência', 'a chamada não precisa repetir o tipo — exceto quando não há argumentos'],
          ['`where`', 'exige capacidades de `T` e, em troca, libera o uso delas'],
          ['`default`', 'o valor inicial correto, seja `T` referência ou valor'],
          ['`EqualityComparer<T>.Default`', 'comparar dois `T` sem exigir restrição'],
          ['estático em `C<T>`', 'um campo **por tipo fechado**, não global'],
        ],
      },
      {
        kind: 'text',
        body:
          'O padrão que amarra tudo é o **repositório genérico**: uma coleção de entidades identificadas por chave, em que tanto a entidade quanto a chave são parâmetros de tipo.',
      },
      {
        kind: 'code',
        code: `interface IEntidade<TChave>
{
    TChave Id { get; }
}

class Repositorio<TEntidade, TChave>
    where TEntidade : class, IEntidade<TChave>
    where TChave : notnull
{
    private readonly Dictionary<TChave, TEntidade> itens = new();

    public TEntidade? Buscar(TChave chave)
    {
        return itens.TryGetValue(chave, out var achado) ? achado : null;
    }
}`,
        caption: 'Repare no encadeamento: `TEntidade` é restrito por uma interface que usa `TChave`.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Cada restrição aqui é obrigatória por um motivo diferente: `class` para poder devolver `null`, `IEntidade<TChave>` para poder ler `.Id`, e `notnull` porque o `Dictionary` exige. Nenhuma é decorativa.',
      },
      {
        kind: 'text',
        body:
          'Antes de escrever um genérico, vale a checagem inversa: **ele precisa mesmo ser genérico?** Um `T` que na prática só é usado com um tipo é complexidade sem retorno.',
      },
      {
        kind: 'compare',
        good: `// dois ou mais tipos de verdade,
// com o mesmo comportamento
class Cache<TChave, TValor>
    where TChave : notnull { }`,
        bad: `// so existe ClienteRepositorio<Cliente>
// no projeto inteiro
class Repositorio<T> { }`,
        goodLabel: 'Genérico que se paga',
        badLabel: 'Genérico por precaução',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A pergunta certa não é "isso pode ser genérico?", e sim "já existem dois usos reais?". Genérico especulativo é abstração antes da necessidade, e quase sempre acerta o alvo errado.',
      },
      {
        kind: 'text',
        body:
          'Uma última armadilha para levar deste capítulo: **estáticos em classes genéricas são por tipo fechado**. Se você precisa de um contador realmente global, ele mora numa classe não genérica.',
      },
    ],
    quiz: [
      {
        id: 's08c01l10q1',
        type: 'multiple',
        prompt: 'Em `Repositorio<TEntidade, TChave> where TEntidade : class, IEntidade<TChave> where TChave : notnull`, qual restrição serve para quê?',
        options: [
          { id: 'a', text: '`class` permite devolver `null` em `Buscar`', correct: true },
          { id: 'b', text: '`IEntidade<TChave>` permite ler `.Id` da entidade', correct: true },
          { id: 'c', text: '`notnull` é exigido pelo `Dictionary` usado internamente', correct: true },
          { id: 'd', text: '`class` permite instanciar `TEntidade` com `new`' },
        ],
        explanation:
          'As três primeiras são necessárias. Instanciar exigiria `new()`, que não está na lista — o repositório guarda entidades, não as constrói.',
      },
      {
        id: 's08c01l10q2',
        type: 'single',
        prompt: 'Qual é o melhor critério para decidir tornar uma classe genérica?',
        options: [
          { id: 'a', text: 'Já existirem dois usos reais com tipos diferentes e comportamento idêntico', correct: true },
          { id: 'b', text: 'Ser possível parametrizar o tipo' },
          { id: 'c', text: 'A classe ter mais de cem linhas' },
          { id: 'd', text: 'A classe usar um `Dictionary` internamente' },
        ],
        explanation:
          'Quase tudo *pode* ser genérico. Vale a pena quando existe duplicação real — antes disso, o `T` só adiciona ruído e restrições a manter.',
      },
      {
        id: 's08c01l10q3',
        type: 'single',
        prompt: 'Você quer contar quantas instâncias de `Repositorio<,>` foram criadas no programa inteiro. Onde fica o contador?',
        options: [
          { id: 'a', text: 'Numa classe estática não genérica, incrementada pelo construtor', correct: true },
          { id: 'b', text: 'Num campo `static` do próprio `Repositorio<TEntidade, TChave>`' },
          { id: 'c', text: 'Num campo `static readonly` do repositório' },
          { id: 'd', text: 'Numa propriedade de instância' },
        ],
        explanation:
          'Um estático dentro do genérico conta por tipo fechado: `Repositorio<Cliente,int>` e `Repositorio<Pedido,Guid>` teriam contadores separados.',
      },
    ],
    challenge: {
      brief:
        'Feche o capítulo com um repositório genérico completo: duas restrições encadeadas, busca que devolve `null`, estatísticas por tipo fechado e um contador global de verdade.',
      requirements: [
        '`Repositorio<TEntidade, TChave>` usa `where TEntidade : class, IEntidade<TChave>` e `where TChave : notnull`.',
        '`Adicionar` devolve `false` sem sobrescrever quando o `Id` já existe.',
        '`Buscar` devolve `null` para chave desconhecida; `Remover` devolve `false` quando não havia nada.',
        '`Todos` devolve as entidades **ordenadas pelo `Id`**, para que a saída não dependa da ordem do dicionário.',
        '`Repositorio<,>.Instancias` conta por tipo fechado; `Fabrica.Total` conta globalmente, numa classe não genérica.',
        '`BuscarOuPadrao` devolve a alternativa recebida quando a chave não existe.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

static class Fabrica
{
    public static int Total;
}

interface IEntidade<TChave>
{
    TChave Id { get; }
}

class Cliente : IEntidade<int>
{
    public int Id { get; set; }
    public string Nome { get; set; } = "";
    public override string ToString() => $"#{Id} {Nome}";
}

class Cidade : IEntidade<string>
{
    public string Id { get; set; } = "";
    public int Habitantes { get; set; }
    public override string ToString() => $"{Id}:{Habitantes}";
}

class Repositorio<TEntidade, TChave>
    where TEntidade : class, IEntidade<TChave>
    where TChave : notnull
{
    private readonly Dictionary<TChave, TEntidade> itens = new();

    public static int Instancias;

    public Repositorio()
    {
        // TODO: conte por tipo fechado e globalmente
    }

    public int Contagem => itens.Count;

    public bool Adicionar(TEntidade entidade)
    {
        // TODO: false sem sobrescrever quando o Id ja existe
        return false;
    }

    public TEntidade Buscar(TChave chave)
    {
        // TODO: null quando nao existe
        return null;
    }

    public TEntidade BuscarOuPadrao(TChave chave, TEntidade alternativa)
    {
        // TODO
        return alternativa;
    }

    public bool Remover(TChave chave)
    {
        // TODO
        return false;
    }

    public List<TEntidade> Todos(IComparer<TChave> ordem)
    {
        // TODO: ordenado pelo Id usando o comparador recebido
        return new List<TEntidade>();
    }
}

class Program
{
    static void Main()
    {
        var clientes = new Repositorio<Cliente, int>();

        Console.WriteLine($"add 2: {clientes.Adicionar(new Cliente { Id = 2, Nome = "Bruno" })}");
        Console.WriteLine($"add 1: {clientes.Adicionar(new Cliente { Id = 1, Nome = "Ana" })}");
        Console.WriteLine($"add 3: {clientes.Adicionar(new Cliente { Id = 3, Nome = "Carla" })}");
        Console.WriteLine($"add 1 repetido: {clientes.Adicionar(new Cliente { Id = 1, Nome = "Outro" })}");
        Console.WriteLine($"contagem: {clientes.Contagem}");
        Console.WriteLine($"todos: {string.Join(" | ", clientes.Todos(Comparer<int>.Default))}");

        Console.WriteLine($"buscar 1: {clientes.Buscar(1)}");
        Console.WriteLine($"buscar 9: {clientes.Buscar(9) == null}");

        var padrao = new Cliente { Id = 0, Nome = "desconhecido" };
        Console.WriteLine($"ou padrao: {clientes.BuscarOuPadrao(9, padrao)}");
        Console.WriteLine($"ou padrao existente: {clientes.BuscarOuPadrao(2, padrao)}");

        Console.WriteLine($"remover 2: {clientes.Remover(2)}");
        Console.WriteLine($"remover 2: {clientes.Remover(2)}");
        Console.WriteLine($"todos: {string.Join(" | ", clientes.Todos(Comparer<int>.Default))}");

        var cidades = new Repositorio<Cidade, string>();
        cidades.Adicionar(new Cidade { Id = "recife", Habitantes = 1600000 });
        cidades.Adicionar(new Cidade { Id = "belem", Habitantes = 1300000 });
        Console.WriteLine($"cidades: {string.Join(" | ", cidades.Todos(StringComparer.Ordinal))}");
        Console.WriteLine($"buscar belem: {cidades.Buscar("belem")}");

        new Repositorio<Cliente, int>();

        Console.WriteLine($"instancias cliente: {Repositorio<Cliente, int>.Instancias}");
        Console.WriteLine($"instancias cidade: {Repositorio<Cidade, string>.Instancias}");
        Console.WriteLine($"total global: {Fabrica.Total}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

static class Fabrica
{
    public static int Total;
}

interface IEntidade<TChave>
{
    TChave Id { get; }
}

class Cliente : IEntidade<int>
{
    public int Id { get; set; }
    public string Nome { get; set; } = "";
    public override string ToString() => $"#{Id} {Nome}";
}

class Cidade : IEntidade<string>
{
    public string Id { get; set; } = "";
    public int Habitantes { get; set; }
    public override string ToString() => $"{Id}:{Habitantes}";
}

class Repositorio<TEntidade, TChave>
    where TEntidade : class, IEntidade<TChave>
    where TChave : notnull
{
    private readonly Dictionary<TChave, TEntidade> itens = new();

    public static int Instancias;

    public Repositorio()
    {
        Instancias++;
        Fabrica.Total++;
    }

    public int Contagem => itens.Count;

    public bool Adicionar(TEntidade entidade)
    {
        if (itens.ContainsKey(entidade.Id))
        {
            return false;
        }

        itens[entidade.Id] = entidade;
        return true;
    }

    public TEntidade Buscar(TChave chave)
    {
        return itens.TryGetValue(chave, out var achado) ? achado : null;
    }

    public TEntidade BuscarOuPadrao(TChave chave, TEntidade alternativa)
    {
        return itens.TryGetValue(chave, out var achado) ? achado : alternativa;
    }

    public bool Remover(TChave chave)
    {
        return itens.Remove(chave);
    }

    public List<TEntidade> Todos(IComparer<TChave> ordem)
    {
        var chaves = new List<TChave>(itens.Keys);
        chaves.Sort(ordem);

        var lista = new List<TEntidade>();

        foreach (TChave chave in chaves)
        {
            lista.Add(itens[chave]);
        }

        return lista;
    }
}

class Program
{
    static void Main()
    {
        var clientes = new Repositorio<Cliente, int>();

        Console.WriteLine($"add 2: {clientes.Adicionar(new Cliente { Id = 2, Nome = "Bruno" })}");
        Console.WriteLine($"add 1: {clientes.Adicionar(new Cliente { Id = 1, Nome = "Ana" })}");
        Console.WriteLine($"add 3: {clientes.Adicionar(new Cliente { Id = 3, Nome = "Carla" })}");
        Console.WriteLine($"add 1 repetido: {clientes.Adicionar(new Cliente { Id = 1, Nome = "Outro" })}");
        Console.WriteLine($"contagem: {clientes.Contagem}");
        Console.WriteLine($"todos: {string.Join(" | ", clientes.Todos(Comparer<int>.Default))}");

        Console.WriteLine($"buscar 1: {clientes.Buscar(1)}");
        Console.WriteLine($"buscar 9: {clientes.Buscar(9) == null}");

        var padrao = new Cliente { Id = 0, Nome = "desconhecido" };
        Console.WriteLine($"ou padrao: {clientes.BuscarOuPadrao(9, padrao)}");
        Console.WriteLine($"ou padrao existente: {clientes.BuscarOuPadrao(2, padrao)}");

        Console.WriteLine($"remover 2: {clientes.Remover(2)}");
        Console.WriteLine($"remover 2: {clientes.Remover(2)}");
        Console.WriteLine($"todos: {string.Join(" | ", clientes.Todos(Comparer<int>.Default))}");

        var cidades = new Repositorio<Cidade, string>();
        cidades.Adicionar(new Cidade { Id = "recife", Habitantes = 1600000 });
        cidades.Adicionar(new Cidade { Id = "belem", Habitantes = 1300000 });
        Console.WriteLine($"cidades: {string.Join(" | ", cidades.Todos(StringComparer.Ordinal))}");
        Console.WriteLine($"buscar belem: {cidades.Buscar("belem")}");

        new Repositorio<Cliente, int>();

        Console.WriteLine($"instancias cliente: {Repositorio<Cliente, int>.Instancias}");
        Console.WriteLine($"instancias cidade: {Repositorio<Cidade, string>.Instancias}");
        Console.WriteLine($"total global: {Fabrica.Total}");
    }
}`,
      hints: [
        '`Adicionar` precisa checar `ContainsKey` antes de escrever: o indexador sobrescreveria silenciosamente.',
        'Em `Todos`, ordene as **chaves** com o comparador recebido e depois monte a lista de entidades na ordem resultante.',
        '`Repositorio<Cliente,int>` é instanciado duas vezes no `Main` e `Repositorio<Cidade,string>` uma; o total global é a soma dos dois contadores.',
      ],
      tests: [
        {
          name: 'Repositório genérico',
          expectedStdout:
            'add 2: True\nadd 1: True\nadd 3: True\nadd 1 repetido: False\ncontagem: 3\n' +
            'todos: #1 Ana | #2 Bruno | #3 Carla\n' +
            'buscar 1: #1 Ana\nbuscar 9: True\n' +
            'ou padrao: #0 desconhecido\nou padrao existente: #2 Bruno\n' +
            'remover 2: True\nremover 2: False\ntodos: #1 Ana | #3 Carla\n' +
            'cidades: belem:1300000 | recife:1600000\nbuscar belem: belem:1300000\n' +
            'instancias cliente: 2\ninstancias cidade: 1\ntotal global: 3',
        },
      ],
    },
  },
]
