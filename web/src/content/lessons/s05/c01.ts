import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's05c01l01',
    title: 'Classe e instância',
    objective: 'Criar seu próprio tipo com uma classe e produzir objetos a partir dele.',
    concept: [
      {
        kind: 'text',
        body:
          'Até agora você usou tipos que outra pessoa criou: `int`, `string`, `List<T>`. Uma **classe** é você criando um tipo novo — um molde que descreve quais dados um objeto guarda e o que ele sabe fazer.',
      },
      {
        kind: 'code',
        code: `class Produto            // o molde
{
    public string Nome;
    public decimal Preco;
}

// os objetos:
Produto teclado = new Produto();
teclado.Nome = "Teclado";
teclado.Preco = 150m;

Produto mouse = new Produto();
mouse.Nome = "Mouse";`,
        caption: 'Uma classe, muitos objetos — cada um com seus próprios valores.',
      },
      {
        kind: 'table',
        headers: ['Termo', 'O que é', 'Analogia'],
        rows: [
          ['classe', 'a definição do tipo', 'a planta da casa'],
          ['objeto', 'um valor daquele tipo', 'uma casa construída'],
          ['instância', 'sinônimo de objeto', 'esta casa aqui'],
          ['`new`', 'cria um objeto', 'construir'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A classe é escrita uma vez e existe uma só. Os objetos são criados quantas vezes você quiser, e cada um tem sua própria cópia dos dados. Mudar o `Nome` do teclado não afeta o mouse em nada.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A classe fica **fora** da classe `Program`, no nível do arquivo — do mesmo jeito que você declarou `record` na Seção 3. Declarar uma classe dentro de outra é possível, mas significa outra coisa.',
      },
      {
        kind: 'text',
        body:
          'Você já criou tipos antes, com `record`. A diferença é que o `record` gera muita coisa automaticamente, enquanto a classe deixa cada decisão nas suas mãos — e é por isso que ela vem primeiro nesta seção.',
      },
    ],
    quiz: [
      {
        id: 's05c01l01q1',
        type: 'single',
        prompt: 'Qual é a diferença entre classe e objeto?',
        options: [
          { id: 'a', text: 'A classe é a definição do tipo; o objeto é um valor criado a partir dela.', correct: true },
          { id: 'b', text: 'São sinônimos.' },
          { id: 'c', text: 'A classe guarda dados; o objeto guarda métodos.' },
          { id: 'd', text: 'O objeto é a definição; a classe é o valor.' },
        ],
        explanation:
          'A classe existe uma vez no código. Os objetos são criados em tempo de execução, e podem existir aos milhares a partir de uma única classe.',
      },
      {
        id: 's05c01l01q2',
        type: 'single',
        prompt: 'Dois objetos criados da mesma classe compartilham os valores dos campos?',
        options: [
          { id: 'a', text: 'Não: cada objeto tem sua própria cópia.', correct: true },
          { id: 'b', text: 'Sim: os campos são compartilhados.' },
          { id: 'c', text: 'Só se forem criados na mesma linha.' },
          { id: 'd', text: 'Depende do tipo do campo.' },
        ],
        explanation:
          'É exatamente isso que torna a classe útil: um molde, muitos objetos independentes. Campos compartilhados existem, mas exigem a palavra `static`.',
      },
      {
        id: 's05c01l01q3',
        type: 'single',
        prompt: 'Onde uma classe deve ser declarada?',
        options: [
          { id: 'a', text: 'No nível do arquivo, fora da classe `Program`.', correct: true },
          { id: 'b', text: 'Dentro do método `Main`.' },
          { id: 'c', text: 'Dentro da classe `Program`.' },
          { id: 'd', text: 'Em um arquivo separado, obrigatoriamente.' },
        ],
        explanation:
          'É o mesmo lugar onde você declarou `record` na Seção 3. Vários tipos podem conviver no mesmo arquivo.',
      },
    ],
    challenge: {
      brief:
        'Crie uma classe `Produto` com dois campos públicos, `Nome` e `Preco`. O `Main` já vem pronto: ele cria dois produtos, preenche os campos e imprime os dados.',
      requirements: [
        'A classe `Produto` tem um campo público `Nome` do tipo `string`',
        'A classe `Produto` tem um campo público `Preco` do tipo `decimal`',
        'A classe fica fora da classe `Program`',
        'Não altere o método `Main`',
        'A saída é produzida pelo `Main`, não pela classe',
      ],
      starterCode: `using System;

// Declare a classe Produto aqui

class Program
{
    static void Main()
    {
        Produto a = new Produto();
        a.Nome = Console.ReadLine();
        a.Preco = decimal.Parse(Console.ReadLine());

        Produto b = new Produto();
        b.Nome = Console.ReadLine();
        b.Preco = decimal.Parse(Console.ReadLine());

        Console.WriteLine($"{a.Nome}: {a.Preco:F2}");
        Console.WriteLine($"{b.Nome}: {b.Preco:F2}");
        Console.WriteLine($"Soma: {a.Preco + b.Preco:F2}");
    }
}
`,
      solution: `using System;

class Produto
{
    public string Nome;
    public decimal Preco;
}

class Program
{
    static void Main()
    {
        Produto a = new Produto();
        a.Nome = Console.ReadLine();
        a.Preco = decimal.Parse(Console.ReadLine());

        Produto b = new Produto();
        b.Nome = Console.ReadLine();
        b.Preco = decimal.Parse(Console.ReadLine());

        Console.WriteLine($"{a.Nome}: {a.Preco:F2}");
        Console.WriteLine($"{b.Nome}: {b.Preco:F2}");
        Console.WriteLine($"Soma: {a.Preco + b.Preco:F2}");
    }
}
`,
      hints: [
        'A classe tem apenas duas linhas dentro: as declarações dos dois campos.',
        'Um campo é declarado como uma variável, com `public` na frente: `public string Nome;`.',
      ],
      tests: [
        {
          name: 'Dois produtos',
          stdin: 'Teclado\n150\nMouse\n80\n',
          expectedStdout: 'Teclado: 150.00\nMouse: 80.00\nSoma: 230.00',
        },
        {
          name: 'Preços com centavos',
          stdin: 'Caneta\n2.50\nCaderno\n17.90\n',
          expectedStdout: 'Caneta: 2.50\nCaderno: 17.90\nSoma: 20.40',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c01l02',
    title: 'Campos',
    objective: 'Declarar os dados que cada objeto guarda, entendendo os valores padrão e a inicialização.',
    concept: [
      {
        kind: 'text',
        body:
          'Um **campo** é uma variável que pertence ao objeto. Cada objeto criado tem seu próprio conjunto de campos, e eles existem enquanto o objeto existir.',
      },
      {
        kind: 'code',
        code: `class Contador
{
    public string Nome;
    public int Valor;          // comeca em 0
    public bool Ativo = true;  // valor inicial explicito
}`,
        caption: 'Um campo sem inicialização recebe o valor padrão do seu tipo.',
      },
      {
        kind: 'text',
        body:
          'Os valores padrão são os mesmos que você já viu em arrays na Seção 3 — e pela mesma razão: o objeto nasce com a memória zerada.',
      },
      {
        kind: 'table',
        headers: ['Tipo do campo', 'Valor inicial'],
        rows: [
          ['`int`, `decimal`, `double`', '`0`'],
          ['`bool`', '`false`'],
          ['`char`', '`\\0`'],
          ['`string` e outras classes', '`null`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um campo `string` não inicializado vale `null`, não string vazia. Chamar `nome.Length` nesse estado lança `NullReferenceException` — o erro mais comum de quem esquece de preencher um campo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Dar um valor inicial na declaração é a forma mais simples de garantir que o objeto nunca exista em estado inválido. Um `string Nome = "";` já elimina toda uma classe de erros.',
      },
      {
        kind: 'text',
        body:
          'Campos públicos são práticos para aprender, mas expõem o estado interno sem nenhuma proteção. O próximo capítulo mostra por que isso é um problema, e o que se usa no lugar.',
      },
    ],
    quiz: [
      {
        id: 's05c01l02q1',
        type: 'single',
        prompt: 'Qual é o valor inicial de um campo `string` não inicializado?',
        options: [
          { id: 'a', code: 'null', correct: true },
          { id: 'b', text: 'String vazia.' },
          { id: 'c', text: 'Um espaço.' },
          { id: 'd', text: 'Erro de compilação.' },
        ],
        explanation:
          'É o mesmo valor padrão de um `string` dentro de um array. Usá-lo sem preencher lança exceção em tempo de execução.',
      },
      {
        id: 's05c01l02q2',
        type: 'single',
        prompt: 'Quantas cópias de um campo existem quando três objetos são criados?',
        options: [
          { id: 'a', text: 'Três: uma por objeto.', correct: true },
          { id: 'b', text: 'Uma: compartilhada por todos.' },
          { id: 'c', text: 'Depende do tipo do campo.' },
          { id: 'd', text: 'Nenhuma até o campo ser usado.' },
        ],
        explanation:
          'Cada objeto carrega seu próprio estado. Um campo compartilhado entre todos os objetos precisa da palavra `static`, que aparece no próximo capítulo.',
      },
      {
        id: 's05c01l02q3',
        type: 'single',
        prompt: 'Para que serve dar um valor inicial na declaração do campo?',
        options: [
          { id: 'a', text: 'Para garantir que o objeto nunca exista em um estado inválido.', correct: true },
          { id: 'b', text: 'Para economizar memória.' },
          { id: 'c', text: 'Para tornar o campo somente leitura.' },
          { id: 'd', text: 'É obrigatório em C#.' },
        ],
        explanation:
          'Sem isso, quem cria o objeto precisa lembrar de preencher tudo. Com um valor inicial sensato, esquecer deixa de ser um bug.',
      },
    ],
    challenge: {
      brief:
        'Crie uma classe `Registro` com quatro campos que demonstram os valores padrão. O `Main` cria um objeto sem preencher nada e imprime o estado inicial, depois preenche e imprime de novo.',
      requirements: [
        '`Registro` tem os campos públicos `Codigo` (`int`), `Descricao` (`string`), `Ativo` (`bool`) e `Peso` (`double`)',
        '`Descricao` precisa começar com string vazia, não `null`',
        'Os outros três não recebem valor inicial explícito',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Registro aqui

class Program
{
    static void Main()
    {
        Registro r = new Registro();

        Console.WriteLine($"Inicial: {r.Codigo} [{r.Descricao}] {r.Ativo} {r.Peso}");

        r.Codigo = int.Parse(Console.ReadLine());
        r.Descricao = Console.ReadLine();
        r.Ativo = Console.ReadLine() == "1";
        r.Peso = double.Parse(Console.ReadLine());

        Console.WriteLine($"Preenchido: {r.Codigo} [{r.Descricao}] {r.Ativo} {r.Peso}");
        Console.WriteLine($"Tamanho da descricao: {r.Descricao.Length}");
    }
}
`,
      solution: `using System;

class Registro
{
    public int Codigo;
    public string Descricao = "";
    public bool Ativo;
    public double Peso;
}

class Program
{
    static void Main()
    {
        Registro r = new Registro();

        Console.WriteLine($"Inicial: {r.Codigo} [{r.Descricao}] {r.Ativo} {r.Peso}");

        r.Codigo = int.Parse(Console.ReadLine());
        r.Descricao = Console.ReadLine();
        r.Ativo = Console.ReadLine() == "1";
        r.Peso = double.Parse(Console.ReadLine());

        Console.WriteLine($"Preenchido: {r.Codigo} [{r.Descricao}] {r.Ativo} {r.Peso}");
        Console.WriteLine($"Tamanho da descricao: {r.Descricao.Length}");
    }
}
`,
      hints: [
        'Só a `Descricao` recebe valor na declaração: `public string Descricao = "";`.',
        'Os outros três campos ficam sem inicialização, para mostrar o valor padrão de cada tipo.',
      ],
      tests: [
        {
          name: 'Preenchendo todos os campos',
          stdin: '42\nCaixa grande\n1\n2.5\n',
          expectedStdout:
            'Inicial: 0 [] False 0\nPreenchido: 42 [Caixa grande] True 2.5\nTamanho da descricao: 12',
        },
        {
          name: 'Descrição vazia e inativo',
          stdin: '7\n\n0\n0\n',
          expectedStdout:
            'Inicial: 0 [] False 0\nPreenchido: 7 [] False 0\nTamanho da descricao: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c01l03',
    title: 'Métodos de instância',
    objective: 'Dar comportamento a um objeto, com métodos que operam sobre os campos dele.',
    concept: [
      {
        kind: 'text',
        body:
          'Os métodos que você escreveu na Seção 4 eram `static`: pertenciam à classe. Um **método de instância** pertence ao objeto, e tem acesso direto aos campos dele.',
      },
      {
        kind: 'code',
        code: `class Contador
{
    public int Valor;

    public void Incrementar()      // sem 'static'
    {
        Valor++;                   // acessa o campo do proprio objeto
    }

    public bool Passou(int limite)
    {
        return Valor > limite;
    }
}

Contador c = new Contador();
c.Incrementar();
c.Incrementar();
Console.WriteLine(c.Valor);    // 2`,
        caption: 'A chamada é feita **no objeto**, e o método opera sobre os campos daquele objeto.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Estático: recebe tudo',
          code: `static int Incrementar(int valor)
{
    return valor + 1;
}

x = Incrementar(x);`,
        },
        right: {
          label: 'De instância: já tem o estado',
          code: `public void Incrementar()
{
    Valor++;
}

c.Incrementar();`,
        },
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A diferença central é que o método de instância **já sabe** sobre quais dados trabalhar. Isso reduz parâmetros e mantém o dado e o comportamento que o manipula no mesmo lugar — que é a ideia inteira de orientação a objetos.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um método de instância não pode ser chamado sem um objeto. `Contador.Incrementar()` não compila: é preciso `c.Incrementar()`, com um objeto concreto.',
      },
      {
        kind: 'text',
        body:
          'Métodos de instância seguem todas as regras da Seção 4: podem receber parâmetros, devolver valores, ter sobrecargas e chamar outros métodos. A única novidade é o acesso direto aos campos.',
      },
    ],
    quiz: [
      {
        id: 's05c01l03q1',
        type: 'single',
        prompt: 'Qual é a diferença entre um método `static` e um de instância?',
        options: [
          { id: 'a', text: 'O de instância tem acesso direto aos campos do objeto em que foi chamado.', correct: true },
          { id: 'b', text: 'O `static` é mais rápido.' },
          { id: 'c', text: 'O de instância não pode ter parâmetros.' },
          { id: 'd', text: 'O `static` não pode devolver valores.' },
        ],
        explanation:
          'O método de instância trabalha sobre o estado de um objeto específico. O estático não tem objeto, então tudo que ele usa precisa vir por parâmetro.',
      },
      {
        id: 's05c01l03q2',
        type: 'single',
        prompt: 'O que acontece ao escrever `Contador.Incrementar()` para um método de instância?',
        options: [
          { id: 'a', text: 'Não compila: é preciso um objeto.', correct: true },
          { id: 'b', text: 'Funciona, incrementando todos os objetos.' },
          { id: 'c', text: 'Funciona, criando um objeto temporário.' },
          { id: 'd', text: 'Lança exceção em tempo de execução.' },
        ],
        explanation:
          'Sem objeto não há campos sobre os quais operar. O compilador detecta isso e recusa a chamada.',
      },
      {
        id: 's05c01l03q3',
        type: 'single',
        prompt: 'Qual é a vantagem de manter dados e comportamento na mesma classe?',
        options: [
          { id: 'a', text: 'O método já sabe sobre quais dados trabalhar, o que reduz parâmetros.', correct: true },
          { id: 'b', text: 'O código executa mais rápido.' },
          { id: 'c', text: 'Elimina a necessidade de validação.' },
          { id: 'd', text: 'Permite mais de um retorno.' },
        ],
        explanation:
          'É a diferença entre `Sacar(conta, valor)` e `conta.Sacar(valor)`. A segunda forma também deixa claro quem é responsável por manter aquele estado correto.',
      },
    ],
    challenge: {
      brief:
        'Crie uma classe `Contador` com um campo `Valor` e três métodos de instância que o manipulam. O `Main` já exercita a classe.',
      requirements: [
        '`Contador` tem o campo público `Valor` do tipo `int`',
        '`Incrementar()` soma 1 ao valor e não devolve nada',
        '`Somar(int quanto)` soma o valor recebido',
        '`Zerar()` devolve o valor ao estado inicial',
        '`Passou(int limite)` devolve `true` quando o valor é **maior** que o limite',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Contador aqui

class Program
{
    static void Main()
    {
        Contador c = new Contador();

        int quantos = int.Parse(Console.ReadLine());
        for (int i = 0; i < quantos; i++)
        {
            c.Incrementar();
        }

        Console.WriteLine($"Apos incrementos: {c.Valor}");

        c.Somar(int.Parse(Console.ReadLine()));
        Console.WriteLine($"Apos somar: {c.Valor}");

        int limite = int.Parse(Console.ReadLine());
        Console.WriteLine($"Passou de {limite}: {c.Passou(limite)}");

        c.Zerar();
        Console.WriteLine($"Apos zerar: {c.Valor}");
    }
}
`,
      solution: `using System;

class Contador
{
    public int Valor;

    public void Incrementar()
    {
        Valor++;
    }

    public void Somar(int quanto)
    {
        Valor += quanto;
    }

    public void Zerar()
    {
        Valor = 0;
    }

    public bool Passou(int limite)
    {
        return Valor > limite;
    }
}

class Program
{
    static void Main()
    {
        Contador c = new Contador();

        int quantos = int.Parse(Console.ReadLine());
        for (int i = 0; i < quantos; i++)
        {
            c.Incrementar();
        }

        Console.WriteLine($"Apos incrementos: {c.Valor}");

        c.Somar(int.Parse(Console.ReadLine()));
        Console.WriteLine($"Apos somar: {c.Valor}");

        int limite = int.Parse(Console.ReadLine());
        Console.WriteLine($"Passou de {limite}: {c.Passou(limite)}");

        c.Zerar();
        Console.WriteLine($"Apos zerar: {c.Valor}");
    }
}
`,
      hints: [
        'Os métodos de instância não levam `static`, e acessam `Valor` diretamente pelo nome.',
        '`Passou` usa comparação estrita: um valor igual ao limite ainda não passou dele.',
      ],
      tests: [
        {
          name: 'Incrementos e soma',
          stdin: '3\n10\n12\n',
          expectedStdout:
            'Apos incrementos: 3\nApos somar: 13\nPassou de 12: True\nApos zerar: 0',
        },
        {
          name: 'Valor exatamente no limite',
          stdin: '2\n3\n5\n',
          expectedStdout:
            'Apos incrementos: 2\nApos somar: 5\nPassou de 5: False\nApos zerar: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c01l04',
    title: 'new e referências',
    objective: 'Entender que uma variável de classe guarda uma referência, e o que isso significa ao copiar e comparar.',
    concept: [
      {
        kind: 'text',
        body:
          'Esta lição é a mais importante do capítulo. Uma variável de classe **não guarda o objeto** — ela guarda o endereço de onde ele está. É exatamente a mesma semântica dos arrays da Seção 3.',
      },
      {
        kind: 'code',
        code: `Produto a = new Produto();
a.Nome = "Teclado";

Produto b = a;          // NAO copia o objeto
b.Nome = "Mouse";

Console.WriteLine(a.Nome);   // Mouse  <- o 'a' mudou junto`,
        caption: 'Duas variáveis, um objeto só. `b` é outro nome para a mesma coisa.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Tipo por valor',
          code: `int x = 1;
int y = x;
y = 99;
// x continua 1`,
        },
        right: {
          label: 'Classe: por referência',
          code: `Produto a = new Produto();
Produto b = a;
b.Nome = "outro";
// a.Nome mudou junto`,
        },
      },
      {
        kind: 'text',
        body:
          'A consequência mais surpreendente aparece na comparação. Para classes, `==` pergunta **"são o mesmo objeto?"**, não "têm os mesmos dados?".',
      },
      {
        kind: 'code',
        code: `Produto p1 = new Produto { Nome = "X" };
Produto p2 = new Produto { Nome = "X" };

Console.WriteLine(p1 == p2);      // False  <- objetos diferentes
Console.WriteLine(p1.Nome == p2.Nome);  // True   <- dados iguais`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Esse comportamento é o oposto do `record` que você usou na Seção 3, que compara por conteúdo. É a diferença mais importante entre os dois, e o capítulo 6 volta a ela.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Para obter um objeto independente é preciso criar outro com `new` e copiar os campos — não existe cópia automática. Um método `Clonar()` que faz isso é um padrão comum, e você vai escrever um no desafio.',
      },
      {
        kind: 'text',
        body:
          'Uma variável de classe também pode valer `null`, indicando "nenhum objeto". Acessar qualquer membro nesse estado lança `NullReferenceException`.',
      },
    ],
    quiz: [
      {
        id: 's05c01l04q1',
        type: 'single',
        prompt: 'O que `Produto b = a;` faz?',
        options: [
          { id: 'a', text: 'Cria um segundo nome para o mesmo objeto.', correct: true },
          { id: 'b', text: 'Copia o objeto inteiro.' },
          { id: 'c', text: 'Copia apenas os campos numéricos.' },
          { id: 'd', text: 'Cria um objeto vazio.' },
        ],
        explanation:
          'É a mesma semântica de referência dos arrays. Alterar por qualquer um dos nomes altera o objeto que os dois enxergam.',
      },
      {
        id: 's05c01l04q2',
        type: 'single',
        prompt: 'O que `p1 == p2` compara para duas instâncias de uma classe?',
        options: [
          { id: 'a', text: 'Se as duas variáveis apontam para o mesmo objeto.', correct: true },
          { id: 'b', text: 'Se os campos têm os mesmos valores.' },
          { id: 'c', text: 'Se os objetos foram criados na mesma linha.' },
          { id: 'd', text: 'Não compila para classes.' },
        ],
        explanation:
          'A comparação padrão de classes é por identidade. Dois objetos com dados idênticos, criados separadamente, são diferentes para o `==`.',
      },
      {
        id: 's05c01l04q3',
        type: 'single',
        prompt: 'Como obter um objeto independente com os mesmos dados?',
        options: [
          { id: 'a', text: 'Criar outro com `new` e copiar os campos.', correct: true },
          { id: 'b', text: 'Atribuir com `=`.' },
          { id: 'c', text: 'Usar `==`.' },
          { id: 'd', text: 'Não é possível.' },
        ],
        explanation:
          'Não há cópia automática para classes. É o mesmo cuidado que os arrays exigiam na Seção 3, e a razão de existirem métodos `Clonar`.',
      },
    ],
    challenge: {
      brief:
        'Crie uma classe `Produto` com um método `Clonar()` que devolve um objeto independente. O `Main` demonstra a diferença entre apelido e cópia.',
      requirements: [
        '`Produto` tem os campos públicos `Nome` (`string`) e `Preco` (`decimal`)',
        '`Clonar()` devolve um `Produto` **novo** com os mesmos valores',
        'Alterar o clone não pode afetar o original',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Produto aqui, com o metodo Clonar

class Program
{
    static void Main()
    {
        Produto original = new Produto();
        original.Nome = Console.ReadLine();
        original.Preco = decimal.Parse(Console.ReadLine());

        Produto apelido = original;
        Produto copia = original.Clonar();

        apelido.Preco = 999m;

        Console.WriteLine($"Original: {original.Nome} {original.Preco:F2}");
        Console.WriteLine($"Apelido: {apelido.Nome} {apelido.Preco:F2}");
        Console.WriteLine($"Copia: {copia.Nome} {copia.Preco:F2}");
        Console.WriteLine($"Apelido e o mesmo: {ReferenceEquals(original, apelido)}");
        Console.WriteLine($"Copia e a mesma: {ReferenceEquals(original, copia)}");
    }
}
`,
      solution: `using System;

class Produto
{
    public string Nome;
    public decimal Preco;

    public Produto Clonar()
    {
        Produto novo = new Produto();
        novo.Nome = Nome;
        novo.Preco = Preco;
        return novo;
    }
}

class Program
{
    static void Main()
    {
        Produto original = new Produto();
        original.Nome = Console.ReadLine();
        original.Preco = decimal.Parse(Console.ReadLine());

        Produto apelido = original;
        Produto copia = original.Clonar();

        apelido.Preco = 999m;

        Console.WriteLine($"Original: {original.Nome} {original.Preco:F2}");
        Console.WriteLine($"Apelido: {apelido.Nome} {apelido.Preco:F2}");
        Console.WriteLine($"Copia: {copia.Nome} {copia.Preco:F2}");
        Console.WriteLine($"Apelido e o mesmo: {ReferenceEquals(original, apelido)}");
        Console.WriteLine($"Copia e a mesma: {ReferenceEquals(original, copia)}");
    }
}
`,
      hints: [
        'O `Clonar` precisa de um `new Produto()` dentro dele — sem isso não há objeto novo.',
        'Dentro do método, `Nome` sozinho já se refere ao campo do objeto em que ele foi chamado.',
      ],
      tests: [
        {
          name: 'Apelido muda o original, cópia não',
          stdin: 'Teclado\n150\n',
          expectedStdout:
            'Original: Teclado 999.00\nApelido: Teclado 999.00\nCopia: Teclado 150.00\n' +
            'Apelido e o mesmo: True\nCopia e a mesma: False',
        },
        {
          name: 'Outro produto',
          stdin: 'Monitor\n1200.50\n',
          expectedStdout:
            'Original: Monitor 999.00\nApelido: Monitor 999.00\nCopia: Monitor 1200.50\n' +
            'Apelido e o mesmo: True\nCopia e a mesma: False',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c01l05',
    title: 'this',
    objective: 'Usar `this` para referenciar o próprio objeto, resolvendo ambiguidade entre campos e parâmetros.',
    concept: [
      {
        kind: 'text',
        body:
          'Dentro de um método de instância, `this` é uma referência ao **objeto atual** — aquele em que o método foi chamado. Ele é implícito na maior parte do tempo, e obrigatório em alguns casos.',
      },
      {
        kind: 'code',
        code: `class Produto
{
    public string Nome;

    public void Renomear(string Nome)     // parametro com o mesmo nome
    {
        this.Nome = Nome;                 // campo = parametro
    }
}`,
        caption: 'Sem o `this`, os dois lados seriam o parâmetro, e a atribuição não faria nada.',
      },
      {
        kind: 'text',
        body:
          'Esse é o uso mais comum: quando um parâmetro tem o mesmo nome de um campo, ele **esconde** o campo dentro do método. O `this` desfaz a ambiguidade.',
      },
      {
        kind: 'compare',
        good: `public void Renomear(string nome)
{
    Nome = nome;
}`,
        bad: `public void Renomear(string Nome)
{
    Nome = Nome;   // nao faz nada
}`,
        goodLabel: 'Nomes diferentes: sem ambiguidade',
        badLabel: 'Mesmo nome sem `this`: atribuição inútil',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O `this` também serve para o objeto **devolver a si mesmo**. Um método que termina com `return this;` permite encadear chamadas: `pedido.Adicionar(x).Adicionar(y).Fechar()`.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Escrever `this.Campo` em todo lugar não é errado, mas é ruído: o compilador já resolve sozinho quando não há ambiguidade. Reserve o `this` para quando ele diz algo — ambiguidade, encadeamento, ou passar o próprio objeto adiante.',
      },
      {
        kind: 'text',
        body:
          'Um objeto também pode passar `this` como argumento para outro método, permitindo que outro objeto opere sobre ele. Isso aparece bastante em relacionamentos entre objetos, no último capítulo desta seção.',
      },
    ],
    quiz: [
      {
        id: 's05c01l05q1',
        type: 'single',
        prompt: 'O que `this` representa dentro de um método de instância?',
        options: [
          { id: 'a', text: 'O objeto em que o método foi chamado.', correct: true },
          { id: 'b', text: 'A classe.' },
          { id: 'c', text: 'O último objeto criado.' },
          { id: 'd', text: 'O método atual.' },
        ],
        explanation:
          'Cada chamada tem seu próprio `this`. Chamar `a.Metodo()` e `b.Metodo()` executa o mesmo código com `this` apontando para objetos diferentes.',
      },
      {
        id: 's05c01l05q2',
        type: 'single',
        prompt: 'O que faz `Nome = Nome;` quando o parâmetro se chama `Nome`?',
        options: [
          { id: 'a', text: 'Nada: atribui o parâmetro a ele mesmo.', correct: true },
          { id: 'b', text: 'Atribui o parâmetro ao campo.' },
          { id: 'c', text: 'Atribui o campo ao parâmetro.' },
          { id: 'd', text: 'Erro de compilação.' },
        ],
        explanation:
          'O parâmetro esconde o campo dentro do método, então os dois lados se referem a ele. O campo permanece intocado — um bug silencioso.',
      },
      {
        id: 's05c01l05q3',
        type: 'single',
        prompt: 'Para que serve `return this;` no fim de um método?',
        options: [
          { id: 'a', text: 'Para permitir encadear chamadas no mesmo objeto.', correct: true },
          { id: 'b', text: 'Para copiar o objeto.' },
          { id: 'c', text: 'Para destruir o objeto.' },
          { id: 'd', text: 'Para tornar o método estático.' },
        ],
        explanation:
          'Devolvendo o próprio objeto, a chamada seguinte pode ser feita direto no resultado. É a base das APIs fluentes.',
      },
    ],
    challenge: {
      brief:
        'Crie uma classe `Caixa` cujos métodos usam `this` para resolver ambiguidade e para permitir encadeamento. O `Main` encadeia três chamadas em sequência.',
      requirements: [
        '`Caixa` tem os campos públicos `Etiqueta` (`string`) e `Peso` (`int`)',
        '`Rotular(string Etiqueta)` usa um parâmetro com o **mesmo nome** do campo e precisa de `this`',
        '`Rotular` devolve o próprio objeto, para permitir encadeamento',
        '`Carregar(int quanto)` soma ao peso e também devolve o próprio objeto',
        '`Descrever()` devolve `[etiqueta] peso kg`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Caixa aqui

class Program
{
    static void Main()
    {
        string etiqueta = Console.ReadLine();
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());

        Caixa c = new Caixa();

        Console.WriteLine(c.Rotular(etiqueta).Carregar(a).Carregar(b).Descrever());
        Console.WriteLine($"Etiqueta: {c.Etiqueta}");
        Console.WriteLine($"Peso: {c.Peso}");
    }
}
`,
      solution: `using System;

class Caixa
{
    public string Etiqueta = "";
    public int Peso;

    public Caixa Rotular(string Etiqueta)
    {
        this.Etiqueta = Etiqueta;
        return this;
    }

    public Caixa Carregar(int quanto)
    {
        Peso += quanto;
        return this;
    }

    public string Descrever()
    {
        return $"[{Etiqueta}] {Peso} kg";
    }
}

class Program
{
    static void Main()
    {
        string etiqueta = Console.ReadLine();
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());

        Caixa c = new Caixa();

        Console.WriteLine(c.Rotular(etiqueta).Carregar(a).Carregar(b).Descrever());
        Console.WriteLine($"Etiqueta: {c.Etiqueta}");
        Console.WriteLine($"Peso: {c.Peso}");
    }
}
`,
      hints: [
        'Em `Rotular`, o `this.Etiqueta` é o campo e o `Etiqueta` sozinho é o parâmetro.',
        'Os dois métodos que permitem encadeamento têm `Caixa` como tipo de retorno e terminam com `return this;`.',
      ],
      tests: [
        {
          name: 'Encadeamento de três chamadas',
          stdin: 'Fragil\n10\n5\n',
          expectedStdout: '[Fragil] 15 kg\nEtiqueta: Fragil\nPeso: 15',
        },
        {
          name: 'Cargas zeradas',
          stdin: 'Vazia\n0\n0\n',
          expectedStdout: '[Vazia] 0 kg\nEtiqueta: Vazia\nPeso: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c01l06',
    title: 'Construtores',
    objective: 'Garantir que todo objeto nasça em um estado válido, exigindo os dados essenciais na criação.',
    concept: [
      {
        kind: 'text',
        body:
          'Criar um objeto e depois preencher os campos um a um tem um problema: entre o `new` e a última atribuição, o objeto existe **incompleto**. Um **construtor** elimina essa janela.',
      },
      {
        kind: 'code',
        code: `class Produto
{
    public string Nome;
    public decimal Preco;

    public Produto(string nome, decimal preco)   // sem tipo de retorno
    {
        Nome = nome;
        Preco = preco;
    }
}

Produto p = new Produto("Teclado", 150m);   // nasce pronto`,
        caption: 'O construtor tem o nome da classe e nenhum tipo de retorno — nem `void`.',
      },
      {
        kind: 'table',
        headers: ['Característica', 'Construtor'],
        rows: [
          ['nome', 'idêntico ao da classe'],
          ['tipo de retorno', 'nenhum, nem `void`'],
          ['quando executa', 'no `new`, uma vez'],
          ['pode ter parâmetros', 'sim'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Ao declarar qualquer construtor, o construtor sem parâmetros **deixa de existir**. Depois de escrever `Produto(string, decimal)`, a linha `new Produto()` para de compilar — e isso costuma ser exatamente o que você quer.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Essa é a diferença prática: sem construtor, criar um produto sem nome é possível e o compilador não reclama. Com ele, o nome vira **obrigatório**, e o erro sai na compilação em vez de virar um `null` no meio do relatório.',
      },
      {
        kind: 'text',
        body:
          'O construtor também é o lugar natural para validar. Um preço negativo pode ser rejeitado ali, antes que o objeto chegue a existir — assunto do capítulo sobre encapsulamento.',
      },
    ],
    quiz: [
      {
        id: 's05c01l06q1',
        type: 'single',
        prompt: 'Qual é o tipo de retorno de um construtor?',
        options: [
          { id: 'a', text: 'Nenhum: ele não declara tipo de retorno.', correct: true },
          { id: 'b', code: 'void' },
          { id: 'c', text: 'O tipo da própria classe.' },
          { id: 'd', code: 'object' },
        ],
        explanation:
          'Escrever `void` antes do nome faria dele um método comum, não um construtor — e o compilador reclamaria de um método com o mesmo nome da classe.',
      },
      {
        id: 's05c01l06q2',
        type: 'single',
        prompt: 'O que acontece com `new Produto()` depois de declarar um construtor com parâmetros?',
        options: [
          { id: 'a', text: 'Para de compilar: o construtor sem parâmetros deixa de existir.', correct: true },
          { id: 'b', text: 'Continua funcionando normalmente.' },
          { id: 'c', text: 'Compila mas lança exceção.' },
          { id: 'd', text: 'Cria o objeto com valores padrão.' },
        ],
        explanation:
          'O construtor sem parâmetros só é fornecido automaticamente quando você não declara nenhum. É desejável: ele impede criar objetos incompletos.',
      },
      {
        id: 's05c01l06q3',
        type: 'single',
        prompt: 'Qual é a principal vantagem de exigir dados no construtor?',
        options: [
          { id: 'a', text: 'O objeto nunca existe em estado incompleto, e o erro aparece na compilação.', correct: true },
          { id: 'b', text: 'O objeto ocupa menos memória.' },
          { id: 'c', text: 'A criação fica mais rápida.' },
          { id: 'd', text: 'Os campos ficam somente leitura.' },
        ],
        explanation:
          'Sem construtor, esquecer de preencher um campo vira um `null` descoberto muito depois. Com ele, o compilador cobra na hora da criação.',
      },
    ],
    challenge: {
      brief:
        'Crie uma classe `Livro` cujo construtor exige título, autor e ano. O `Main` cria os livros já preenchidos e imprime os dados.',
      requirements: [
        '`Livro` tem os campos públicos `Titulo`, `Autor` (`string`) e `Ano` (`int`)',
        'O construtor recebe os três, nessa ordem',
        'A classe **não** pode aceitar `new Livro()` sem argumentos',
        '`Descrever()` devolve `Titulo (Autor, Ano)`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Livro aqui, com construtor de tres parametros

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            string titulo = Console.ReadLine();
            string autor = Console.ReadLine();
            int ano = int.Parse(Console.ReadLine());

            Livro l = new Livro(titulo, autor, ano);
            Console.WriteLine(l.Descrever());
        }

        Console.WriteLine($"Livros: {n}");
    }
}
`,
      solution: `using System;

class Livro
{
    public string Titulo;
    public string Autor;
    public int Ano;

    public Livro(string titulo, string autor, int ano)
    {
        Titulo = titulo;
        Autor = autor;
        Ano = ano;
    }

    public string Descrever()
    {
        return $"{Titulo} ({Autor}, {Ano})";
    }
}

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            string titulo = Console.ReadLine();
            string autor = Console.ReadLine();
            int ano = int.Parse(Console.ReadLine());

            Livro l = new Livro(titulo, autor, ano);
            Console.WriteLine(l.Descrever());
        }

        Console.WriteLine($"Livros: {n}");
    }
}
`,
      hints: [
        'O construtor se chama `Livro`, exatamente como a classe, e não tem tipo de retorno.',
        'Use nomes de parâmetro em minúscula para não precisar de `this` nas atribuições.',
      ],
      tests: [
        {
          name: 'Dois livros',
          stdin: '2\nDom Casmurro\nMachado\n1899\nO Cortico\nAluisio\n1890\n',
          expectedStdout:
            'Dom Casmurro (Machado, 1899)\nO Cortico (Aluisio, 1890)\nLivros: 2',
        },
        {
          name: 'Um livro',
          stdin: '1\nTeste\nAutor\n2020\n',
          expectedStdout: 'Teste (Autor, 2020)\nLivros: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c01l07',
    title: 'Sobrecarga de construtor',
    objective: 'Oferecer várias formas de criar um objeto, encadeando construtores com `this` para evitar duplicação.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma classe pode ter vários construtores, desde que tenham listas de parâmetros diferentes. É a **sobrecarga** do capítulo 2 da Seção 4, aplicada à criação de objetos.',
      },
      {
        kind: 'code',
        code: `class Produto
{
    public string Nome;
    public decimal Preco;
    public int Estoque;

    public Produto(string nome, decimal preco, int estoque)
    {
        Nome = nome;
        Preco = preco;
        Estoque = estoque;
    }

    public Produto(string nome, decimal preco)
        : this(nome, preco, 0)     // delega para o construtor completo
    {
    }
}`,
        caption: 'O `: this(...)` encadeia: o construtor curto chama o completo antes de executar seu próprio corpo.',
      },
      {
        kind: 'compare',
        good: `public Produto(string nome, decimal preco)
    : this(nome, preco, 0)
{
}`,
        bad: `public Produto(string nome, decimal preco)
{
    Nome = nome;
    Preco = preco;
    Estoque = 0;
}`,
        goodLabel: 'Uma implementação só',
        badLabel: 'Lógica duplicada',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O encadeamento importa mais do que parece: se um dia o construtor completo passar a validar o preço, todos os outros herdam a validação automaticamente. Sem ele, você precisaria lembrar de acrescentar a checagem em cada um.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um construtor só pode encadear para **um** outro, e a chamada acontece **antes** do próprio corpo. Não dá para executar algo, chamar `this(...)`, e continuar — o encadeamento é sempre a primeira coisa.',
      },
      {
        kind: 'text',
        body:
          'Parâmetros opcionais também resolvem muitos casos com um construtor só, e costumam ser preferíveis quando as variações são apenas valores padrão. A sobrecarga ganha quando os construtores fazem coisas diferentes.',
      },
    ],
    quiz: [
      {
        id: 's05c01l07q1',
        type: 'single',
        prompt: 'O que `: this(nome, preco, 0)` faz?',
        options: [
          { id: 'a', text: 'Chama outro construtor da mesma classe antes de executar o corpo.', correct: true },
          { id: 'b', text: 'Cria um segundo objeto.' },
          { id: 'c', text: 'Devolve o próprio objeto.' },
          { id: 'd', text: 'Copia os campos de outro objeto.' },
        ],
        explanation:
          'É o encadeamento de construtores. O corpo do construtor que encadeia executa **depois** do construtor chamado.',
      },
      {
        id: 's05c01l07q2',
        type: 'single',
        prompt: 'Por que encadear em vez de repetir as atribuições?',
        options: [
          { id: 'a', text: 'Porque a lógica de inicialização passa a existir em um lugar só.', correct: true },
          { id: 'b', text: 'Porque é mais rápido.' },
          { id: 'c', text: 'Porque o C# não permite duplicar atribuições.' },
          { id: 'd', text: 'Porque reduz o número de construtores.' },
        ],
        explanation:
          'É o mesmo argumento contra duplicação de sempre: uma validação nova acrescentada ao construtor principal vale automaticamente para todos os outros.',
      },
      {
        id: 's05c01l07q3',
        type: 'single',
        prompt: 'Quando parâmetros opcionais são melhores que sobrecarga de construtor?',
        options: [
          { id: 'a', text: 'Quando as variações são apenas valores padrão.', correct: true },
          { id: 'b', text: 'Sempre.' },
          { id: 'c', text: 'Quando há mais de três parâmetros.' },
          { id: 'd', text: 'Nunca: sobrecarga é sempre melhor.' },
        ],
        explanation:
          'É a mesma decisão do capítulo 2 da Seção 4. A sobrecarga ganha quando os construtores recebem tipos diferentes ou inicializam de formas distintas.',
      },
    ],
    challenge: {
      brief:
        'Crie uma classe `Produto` com três construtores encadeados, cada um preenchendo menos campos que o anterior. O `Main` cria produtos das três formas.',
      requirements: [
        '`Produto` tem os campos públicos `Nome` (`string`), `Preco` (`decimal`) e `Estoque` (`int`)',
        'Um construtor recebe os três valores',
        'Um construtor recebe nome e preço, e usa estoque `0`',
        'Um construtor recebe só o nome, e usa preço `0` e estoque `0`',
        'Os construtores mais curtos precisam **encadear** com `: this(...)`, sem repetir atribuições',
        '`Descrever()` devolve `Nome: preco (estoque un)`, com o preço em duas casas',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Produto aqui, com tres construtores encadeados

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        decimal preco = decimal.Parse(Console.ReadLine());
        int estoque = int.Parse(Console.ReadLine());

        Produto completo = new Produto(nome, preco, estoque);
        Produto semEstoque = new Produto(nome, preco);
        Produto soNome = new Produto(nome);

        Console.WriteLine(completo.Descrever());
        Console.WriteLine(semEstoque.Descrever());
        Console.WriteLine(soNome.Descrever());
    }
}
`,
      solution: `using System;

class Produto
{
    public string Nome;
    public decimal Preco;
    public int Estoque;

    public Produto(string nome, decimal preco, int estoque)
    {
        Nome = nome;
        Preco = preco;
        Estoque = estoque;
    }

    public Produto(string nome, decimal preco)
        : this(nome, preco, 0)
    {
    }

    public Produto(string nome)
        : this(nome, 0m, 0)
    {
    }

    public string Descrever()
    {
        return $"{Nome}: {Preco:F2} ({Estoque} un)";
    }
}

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        decimal preco = decimal.Parse(Console.ReadLine());
        int estoque = int.Parse(Console.ReadLine());

        Produto completo = new Produto(nome, preco, estoque);
        Produto semEstoque = new Produto(nome, preco);
        Produto soNome = new Produto(nome);

        Console.WriteLine(completo.Descrever());
        Console.WriteLine(semEstoque.Descrever());
        Console.WriteLine(soNome.Descrever());
    }
}
`,
      hints: [
        'O corpo dos construtores encadeados fica **vazio**: toda a inicialização acontece no construtor completo.',
        'O de um parâmetro pode encadear direto para o de três: `: this(nome, 0m, 0)`.',
      ],
      tests: [
        {
          name: 'As três formas de criar',
          stdin: 'Teclado\n150\n5\n',
          expectedStdout:
            'Teclado: 150.00 (5 un)\nTeclado: 150.00 (0 un)\nTeclado: 0.00 (0 un)',
        },
        {
          name: 'Preço com centavos',
          stdin: 'Caneta\n2.50\n100\n',
          expectedStdout:
            'Caneta: 2.50 (100 un)\nCaneta: 2.50 (0 un)\nCaneta: 0.00 (0 un)',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c01l08',
    title: 'Inicializadores de objeto',
    objective: 'Preencher campos na criação com a sintaxe de chaves, e reconhecer quando ela substitui um construtor.',
    concept: [
      {
        kind: 'text',
        body:
          'O **inicializador de objeto** permite atribuir campos logo no `new`, com uma lista entre chaves. Você já viu essa sintaxe ao criar listas na Seção 3.',
      },
      {
        kind: 'code',
        code: `Produto p = new Produto
{
    Nome = "Teclado",
    Preco = 150m
};

// equivale a:
Produto q = new Produto();
q.Nome = "Teclado";
q.Preco = 150m;`,
        caption: 'Mais compacto e mais legível, especialmente com vários campos.',
      },
      {
        kind: 'text',
        body:
          'Ele funciona junto com construtores: primeiro o construtor executa, depois os campos do inicializador são atribuídos.',
      },
      {
        kind: 'code',
        code: `Produto p = new Produto("Teclado")   // construtor primeiro
{
    Estoque = 5                     // inicializador depois
};`,
      },
      {
        kind: 'table',
        headers: ['Abordagem', 'Garante estado válido?', 'Legibilidade'],
        rows: [
          ['construtor', '**sim**', 'boa até 3 ou 4 parâmetros'],
          ['inicializador', 'não', 'boa com muitos campos'],
          ['os dois juntos', 'parcial', 'a mais comum'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O inicializador **não** garante estado válido: nada obriga a preencher os campos. Ele é conveniência de escrita, não substituto de construtor. Dados obrigatórios continuam pertencendo ao construtor.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A regra prática: o construtor recebe o que é **obrigatório**, o inicializador preenche o que é **opcional**. É por isso que os dois convivem tão bem em código real.',
      },
      {
        kind: 'text',
        body:
          'O inicializador precisa que os campos sejam acessíveis de fora. No próximo capítulo, quando os campos virarem privados, ele passa a operar sobre propriedades — com a mesma sintaxe.',
      },
    ],
    quiz: [
      {
        id: 's05c01l08q1',
        type: 'single',
        prompt: 'O que executa primeiro: o construtor ou o inicializador?',
        options: [
          { id: 'a', text: 'O construtor, e depois o inicializador atribui os campos.', correct: true },
          { id: 'b', text: 'O inicializador, e depois o construtor.' },
          { id: 'c', text: 'Os dois ao mesmo tempo.' },
          { id: 'd', text: 'Não podem ser usados juntos.' },
        ],
        explanation:
          'Faz sentido: o objeto precisa existir antes de ter campos atribuídos. Isso significa que o inicializador pode sobrescrever algo definido no construtor.',
      },
      {
        id: 's05c01l08q2',
        type: 'single',
        prompt: 'O inicializador garante que o objeto tenha todos os campos preenchidos?',
        options: [
          { id: 'a', text: 'Não: nada obriga a preencher nenhum campo.', correct: true },
          { id: 'b', text: 'Sim: todos os campos são obrigatórios.' },
          { id: 'c', text: 'Só os campos de tipo por valor.' },
          { id: 'd', text: 'Só se a classe tiver construtor.' },
        ],
        explanation:
          'É a diferença central em relação ao construtor. Por isso dados obrigatórios pertencem ao construtor, não ao inicializador.',
      },
      {
        id: 's05c01l08q3',
        type: 'single',
        prompt: 'Qual é a divisão de papéis recomendada?',
        options: [
          { id: 'a', text: 'Construtor para o obrigatório, inicializador para o opcional.', correct: true },
          { id: 'b', text: 'Inicializador para tudo.' },
          { id: 'c', text: 'Construtor para tudo.' },
          { id: 'd', text: 'Depende do número de campos.' },
        ],
        explanation:
          'O construtor cobra o que é essencial na compilação; o inicializador oferece uma escrita agradável para o resto.',
      },
    ],
    challenge: {
      brief:
        'Crie uma classe `Evento` com construtor para os dados obrigatórios e campos opcionais preenchidos por inicializador. O `Main` cria eventos das duas formas.',
      requirements: [
        '`Evento` tem os campos públicos `Titulo` (`string`), `Local` (`string`), `Participantes` (`int`) e `Online` (`bool`)',
        'O construtor recebe **apenas** o título, que é obrigatório',
        '`Local` começa com `"a definir"` e os outros com os valores padrão do tipo',
        '`Descrever()` devolve `Titulo em Local, N participantes, online: True/False`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Evento aqui

class Program
{
    static void Main()
    {
        string titulo = Console.ReadLine();
        string local = Console.ReadLine();
        int participantes = int.Parse(Console.ReadLine());

        Evento minimo = new Evento(titulo);

        Evento completo = new Evento(titulo)
        {
            Local = local,
            Participantes = participantes,
            Online = true
        };

        Console.WriteLine(minimo.Descrever());
        Console.WriteLine(completo.Descrever());
    }
}
`,
      solution: `using System;

class Evento
{
    public string Titulo;
    public string Local = "a definir";
    public int Participantes;
    public bool Online;

    public Evento(string titulo)
    {
        Titulo = titulo;
    }

    public string Descrever()
    {
        return $"{Titulo} em {Local}, {Participantes} participantes, online: {Online}";
    }
}

class Program
{
    static void Main()
    {
        string titulo = Console.ReadLine();
        string local = Console.ReadLine();
        int participantes = int.Parse(Console.ReadLine());

        Evento minimo = new Evento(titulo);

        Evento completo = new Evento(titulo)
        {
            Local = local,
            Participantes = participantes,
            Online = true
        };

        Console.WriteLine(minimo.Descrever());
        Console.WriteLine(completo.Descrever());
    }
}
`,
      hints: [
        'O `Local` recebe o valor inicial na declaração do campo: `public string Local = "a definir";`.',
        'O construtor só precisa atribuir o título — os outros campos já nascem com valores sensatos.',
      ],
      tests: [
        {
          name: 'Mínimo e completo',
          stdin: 'Workshop\nAuditorio\n40\n',
          expectedStdout:
            'Workshop em a definir, 0 participantes, online: False\n' +
            'Workshop em Auditorio, 40 participantes, online: True',
        },
        {
          name: 'Sem participantes',
          stdin: 'Reuniao\nSala 3\n0\n',
          expectedStdout:
            'Reuniao em a definir, 0 participantes, online: False\n' +
            'Reuniao em Sala 3, 0 participantes, online: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c01l09',
    title: 'Prática: sobrescrevendo ToString',
    objective: 'Definir como um objeto se representa em texto, substituindo a saída padrão inútil.',
    concept: [
      {
        kind: 'text',
        body:
          'Toda classe já tem um método `ToString`, herdado automaticamente. O problema é que a versão padrão imprime só o nome do tipo — o que não ajuda ninguém.',
      },
      {
        kind: 'output',
        code: `Produto            <- ToString padrao
Teclado: 150.00    <- ToString sobrescrito`,
      },
      {
        kind: 'code',
        code: `class Produto
{
    public string Nome;
    public decimal Preco;

    public override string ToString()
    {
        return $"{Nome}: {Preco:F2}";
    }
}

Produto p = new Produto { Nome = "Teclado", Preco = 150m };

Console.WriteLine(p);              // chama ToString automaticamente
Console.WriteLine($"Item: {p}");   // aqui tambem`,
        caption: 'A palavra `override` indica que você está substituindo um comportamento existente.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '`Console.WriteLine(p)` e a interpolação `{p}` chamam `ToString` sozinhos. Isso significa que sobrescrever esse método melhora a saída em todo lugar do programa de uma vez, sem alterar nenhuma chamada.',
      },
      {
        kind: 'text',
        body:
          'A assinatura precisa ser exatamente `public override string ToString()`. Qualquer diferença — um parâmetro, outro tipo de retorno — cria um método novo em vez de substituir o herdado.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um `ToString` não deve lançar exceção nem ter efeitos colaterais. Ele é chamado por depuradores, por logs e por ferramentas — em lugares onde uma falha inesperada é muito difícil de rastrear.',
      },
      {
        kind: 'text',
        body:
          'É exatamente isso que o `record` da Seção 3 gerava automaticamente. Aqui você escreve à mão, e ganha controle total sobre o formato.',
      },
    ],
    quiz: [
      {
        id: 's05c01l09q1',
        type: 'single',
        prompt: 'O que `Console.WriteLine(p)` imprime sem um `ToString` sobrescrito?',
        options: [
          { id: 'a', text: 'O nome do tipo.', correct: true },
          { id: 'b', text: 'Os valores dos campos.' },
          { id: 'c', text: 'O endereço de memória.' },
          { id: 'd', text: 'Nada: não compila.' },
        ],
        explanation:
          'A implementação padrão devolve o nome do tipo, que raramente é útil. Sobrescrever é a forma de tornar a saída informativa.',
      },
      {
        id: 's05c01l09q2',
        type: 'single',
        prompt: 'Onde `ToString` é chamado automaticamente?',
        options: [
          { id: 'a', text: 'Em `Console.WriteLine(objeto)` e em interpolação de string.', correct: true },
          { id: 'b', text: 'Apenas quando chamado explicitamente.' },
          { id: 'c', text: 'Apenas em `Console.WriteLine`.' },
          { id: 'd', text: 'Ao criar o objeto.' },
        ],
        explanation:
          'Qualquer lugar que precise de texto a partir do objeto o chama. É por isso que sobrescrevê-lo melhora a saída de todo o programa de uma vez.',
      },
      {
        id: 's05c01l09q3',
        type: 'single',
        prompt: 'Por que um `ToString` não deve lançar exceção?',
        options: [
          { id: 'a', text: 'Porque ele é chamado por depuradores e logs, onde a falha é difícil de rastrear.', correct: true },
          { id: 'b', text: 'Porque o compilador proíbe.' },
          { id: 'c', text: 'Porque ele é `static`.' },
          { id: 'd', text: 'Porque exceções não podem sair de métodos `override`.' },
        ],
        explanation:
          'Uma exceção ali quebra a ferramenta que estava tentando ajudar você a depurar — geralmente no pior momento possível.',
      },
    ],
    challenge: {
      brief:
        'Crie três classes com `ToString` sobrescrito, cada uma com um formato próprio. O `Main` imprime os objetos diretamente, sem chamar nenhum método.',
      requirements: [
        '`Ponto` recebe `X` e `Y` no construtor e devolve `(X, Y)`',
        '`Dinheiro` recebe `Valor` (`decimal`) e `Moeda` (`string`), e devolve `R$ 10.50` no formato `Moeda valor`, com duas casas',
        '`Intervalo` recebe `Inicio` e `Fim` (`int`) e devolve `[inicio..fim] (N valores)`, contando os dois extremos',
        'Os três `ToString` precisam ser `override`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare as classes Ponto, Dinheiro e Intervalo aqui

class Program
{
    static void Main()
    {
        int x = int.Parse(Console.ReadLine());
        int y = int.Parse(Console.ReadLine());
        decimal valor = decimal.Parse(Console.ReadLine());
        int inicio = int.Parse(Console.ReadLine());
        int fim = int.Parse(Console.ReadLine());

        Ponto p = new Ponto(x, y);
        Dinheiro d = new Dinheiro(valor, "R$");
        Intervalo i = new Intervalo(inicio, fim);

        Console.WriteLine(p);
        Console.WriteLine(d);
        Console.WriteLine(i);
        Console.WriteLine($"Resumo: {p} custa {d} no intervalo {i}");
    }
}
`,
      solution: `using System;

class Ponto
{
    public int X;
    public int Y;

    public Ponto(int x, int y)
    {
        X = x;
        Y = y;
    }

    public override string ToString()
    {
        return $"({X}, {Y})";
    }
}

class Dinheiro
{
    public decimal Valor;
    public string Moeda;

    public Dinheiro(decimal valor, string moeda)
    {
        Valor = valor;
        Moeda = moeda;
    }

    public override string ToString()
    {
        return $"{Moeda} {Valor:F2}";
    }
}

class Intervalo
{
    public int Inicio;
    public int Fim;

    public Intervalo(int inicio, int fim)
    {
        Inicio = inicio;
        Fim = fim;
    }

    public override string ToString()
    {
        return $"[{Inicio}..{Fim}] ({Fim - Inicio + 1} valores)";
    }
}

class Program
{
    static void Main()
    {
        int x = int.Parse(Console.ReadLine());
        int y = int.Parse(Console.ReadLine());
        decimal valor = decimal.Parse(Console.ReadLine());
        int inicio = int.Parse(Console.ReadLine());
        int fim = int.Parse(Console.ReadLine());

        Ponto p = new Ponto(x, y);
        Dinheiro d = new Dinheiro(valor, "R$");
        Intervalo i = new Intervalo(inicio, fim);

        Console.WriteLine(p);
        Console.WriteLine(d);
        Console.WriteLine(i);
        Console.WriteLine($"Resumo: {p} custa {d} no intervalo {i}");
    }
}
`,
      hints: [
        'A quantidade de valores de um intervalo inclusivo é `Fim - Inicio + 1`, a fórmula da Seção 2.',
        'A assinatura precisa ser exata: `public override string ToString()`.',
      ],
      tests: [
        {
          name: 'Valores positivos',
          stdin: '3\n4\n10.50\n1\n5\n',
          expectedStdout:
            '(3, 4)\nR$ 10.50\n[1..5] (5 valores)\nResumo: (3, 4) custa R$ 10.50 no intervalo [1..5] (5 valores)',
        },
        {
          name: 'Coordenadas negativas e intervalo de um valor',
          stdin: '-2\n-7\n0\n3\n3\n',
          expectedStdout:
            '(-2, -7)\nR$ 0.00\n[3..3] (1 valores)\nResumo: (-2, -7) custa R$ 0.00 no intervalo [3..3] (1 valores)',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's05c01l10',
    title: 'Checkpoint: seus próprios tipos',
    objective: 'Modelar duas classes que colaboram, com construtores, métodos de instância e `ToString`.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint reúne o capítulo em duas classes que trabalham juntas: uma representa um item, a outra agrupa vários itens e agrega os dados deles.',
      },
      {
        kind: 'table',
        headers: ['Classe', 'Responsabilidade'],
        rows: [
          ['`ItemCarrinho`', 'guardar um produto e calcular seu subtotal'],
          ['`Carrinho`', 'reunir itens e agregar o total'],
        ],
      },
      {
        kind: 'text',
        body:
          'Uma classe pode guardar uma coleção de outra — no caso, uma `List<ItemCarrinho>` dentro do carrinho. Isso é o começo da modelagem de domínio do último capítulo desta seção.',
      },
      {
        kind: 'code',
        code: `class Carrinho
{
    private List<ItemCarrinho> itens = new List<ItemCarrinho>();

    public void Adicionar(ItemCarrinho item)
    {
        itens.Add(item);
    }

    public decimal Total()
    {
        decimal soma = 0m;

        foreach (ItemCarrinho item in itens)
        {
            soma += item.Subtotal();
        }

        return soma;
    }
}`,
        caption: 'O carrinho não recalcula subtotais: ele pergunta a cada item.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare na divisão: o item sabe calcular o **próprio** subtotal, e o carrinho apenas soma o que os itens informam. Se a regra do subtotal mudar — um desconto por quantidade, por exemplo —, só o item muda.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A lista dentro do carrinho é inicializada na declaração. Sem isso ela valeria `null`, e o primeiro `Adicionar` lançaria `NullReferenceException` — o erro mais comum ao guardar coleções em campos.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Escreva e teste uma classe por vez. A `ItemCarrinho` não depende de nada, então ela vem primeiro; o `Carrinho` só faz sentido depois que os itens funcionam.',
      },
    ],
    quiz: [
      {
        id: 's05c01l10q1',
        type: 'single',
        prompt: 'Por que o item calcula o próprio subtotal em vez de o carrinho fazer a conta?',
        options: [
          { id: 'a', text: 'Porque a regra do subtotal pertence ao item, e mudá-la afeta um lugar só.', correct: true },
          { id: 'b', text: 'Porque o carrinho não tem acesso aos campos do item.' },
          { id: 'c', text: 'Por questão de desempenho.' },
          { id: 'd', text: 'É indiferente.' },
        ],
        explanation:
          'É a distribuição de responsabilidades: cada objeto cuida do que ele sabe. Um desconto por quantidade seria acrescentado no item, sem tocar no carrinho.',
      },
      {
        id: 's05c01l10q2',
        type: 'single',
        prompt: 'O que acontece se a lista dentro da classe não for inicializada?',
        options: [
          { id: 'a', text: 'Ela vale `null` e a primeira operação lança exceção.', correct: true },
          { id: 'b', text: 'Ela começa vazia automaticamente.' },
          { id: 'c', text: 'Erro de compilação.' },
          { id: 'd', text: 'Ela é criada no primeiro `Add`.' },
        ],
        explanation:
          '`List<T>` é uma classe, e o valor padrão de um campo de classe é `null`. Inicializar na declaração é a forma mais simples de evitar isso.',
      },
      {
        id: 's05c01l10q3',
        type: 'single',
        prompt: 'Qual classe deve ser escrita e testada primeiro?',
        options: [
          { id: 'a', text: 'A que não depende da outra.', correct: true },
          { id: 'b', text: 'A maior.' },
          { id: 'c', text: 'A que tem `ToString`.' },
          { id: 'd', text: 'Tanto faz.' },
        ],
        explanation:
          'Começar pela classe independente permite testá-la isoladamente. A que depende dela só faz sentido quando a base já funciona.',
      },
    ],
    challenge: {
      brief:
        'Modele um carrinho de compras com duas classes: `ItemCarrinho`, que sabe seu próprio subtotal, e `Carrinho`, que agrupa itens e agrega os totais.',
      requirements: [
        '`ItemCarrinho` recebe `Produto` (`string`), `Preco` (`decimal`) e `Quantidade` (`int`) no construtor',
        '`ItemCarrinho.Subtotal()` devolve preço vezes quantidade',
        '`ItemCarrinho.ToString()` devolve `2x Teclado = 300.00`',
        '`Carrinho` guarda uma lista de itens, começando vazia',
        '`Carrinho.Adicionar(ItemCarrinho)` acrescenta um item',
        '`Carrinho.Total()` devolve a soma dos subtotais',
        '`Carrinho.TotalItens()` devolve a soma das quantidades',
        '`Carrinho.MaisCaro()` devolve o item de maior subtotal, ou `null` se o carrinho estiver vazio',
        'Em empate de subtotal, vale o item adicionado primeiro',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare as classes ItemCarrinho e Carrinho aqui

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Carrinho carrinho = new Carrinho();

        for (int i = 0; i < n; i++)
        {
            string produto = Console.ReadLine();
            decimal preco = decimal.Parse(Console.ReadLine());
            int quantidade = int.Parse(Console.ReadLine());

            ItemCarrinho item = new ItemCarrinho(produto, preco, quantidade);
            carrinho.Adicionar(item);

            Console.WriteLine(item);
        }

        Console.WriteLine($"Itens distintos: {n}");
        Console.WriteLine($"Total de unidades: {carrinho.TotalItens()}");
        Console.WriteLine($"Total: {carrinho.Total():F2}");

        ItemCarrinho maisCaro = carrinho.MaisCaro();

        if (maisCaro == null)
        {
            Console.WriteLine("Mais caro: nenhum");
        }
        else
        {
            Console.WriteLine($"Mais caro: {maisCaro}");
        }
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class ItemCarrinho
{
    public string Produto;
    public decimal Preco;
    public int Quantidade;

    public ItemCarrinho(string produto, decimal preco, int quantidade)
    {
        Produto = produto;
        Preco = preco;
        Quantidade = quantidade;
    }

    public decimal Subtotal()
    {
        return Preco * Quantidade;
    }

    public override string ToString()
    {
        return $"{Quantidade}x {Produto} = {Subtotal():F2}";
    }
}

class Carrinho
{
    private List<ItemCarrinho> itens = new List<ItemCarrinho>();

    public void Adicionar(ItemCarrinho item)
    {
        itens.Add(item);
    }

    public decimal Total()
    {
        decimal soma = 0m;

        foreach (ItemCarrinho item in itens)
        {
            soma += item.Subtotal();
        }

        return soma;
    }

    public int TotalItens()
    {
        int soma = 0;

        foreach (ItemCarrinho item in itens)
        {
            soma += item.Quantidade;
        }

        return soma;
    }

    public ItemCarrinho MaisCaro()
    {
        ItemCarrinho melhor = null;

        foreach (ItemCarrinho item in itens)
        {
            if (melhor == null || item.Subtotal() > melhor.Subtotal())
            {
                melhor = item;
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

        Carrinho carrinho = new Carrinho();

        for (int i = 0; i < n; i++)
        {
            string produto = Console.ReadLine();
            decimal preco = decimal.Parse(Console.ReadLine());
            int quantidade = int.Parse(Console.ReadLine());

            ItemCarrinho item = new ItemCarrinho(produto, preco, quantidade);
            carrinho.Adicionar(item);

            Console.WriteLine(item);
        }

        Console.WriteLine($"Itens distintos: {n}");
        Console.WriteLine($"Total de unidades: {carrinho.TotalItens()}");
        Console.WriteLine($"Total: {carrinho.Total():F2}");

        ItemCarrinho maisCaro = carrinho.MaisCaro();

        if (maisCaro == null)
        {
            Console.WriteLine("Mais caro: nenhum");
        }
        else
        {
            Console.WriteLine($"Mais caro: {maisCaro}");
        }
    }
}
`,
      hints: [
        'O `ToString` do item pode chamar o próprio `Subtotal()` — um método de instância pode chamar outro do mesmo objeto.',
        'No `MaisCaro`, a comparação `>` estrita mantém o primeiro item em caso de empate.',
      ],
      tests: [
        {
          name: 'Três itens',
          stdin: '3\nTeclado\n150\n2\nMouse\n80\n1\nMonitor\n500\n1\n',
          expectedStdout:
            '2x Teclado = 300.00\n1x Mouse = 80.00\n1x Monitor = 500.00\n' +
            'Itens distintos: 3\nTotal de unidades: 4\nTotal: 880.00\nMais caro: 1x Monitor = 500.00',
        },
        {
          name: 'Empate no subtotal mantém o primeiro',
          stdin: '2\nA\n50\n2\nB\n100\n1\n',
          expectedStdout:
            '2x A = 100.00\n1x B = 100.00\n' +
            'Itens distintos: 2\nTotal de unidades: 3\nTotal: 200.00\nMais caro: 2x A = 100.00',
        },
        {
          name: 'Carrinho vazio',
          stdin: '0\n',
          expectedStdout:
            'Itens distintos: 0\nTotal de unidades: 0\nTotal: 0.00\nMais caro: nenhum',
          hidden: true,
        },
      ],
    },
  },
]
