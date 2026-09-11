import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's08c04l01',
    title: 'Contexto nullable',
    objective: 'Entender o que o contexto nullable liga, e por que ele existe.',
    concept: [
      {
        kind: 'text',
        body:
          '`NullReferenceException` é o erro mais comum da história do .NET. A causa é estrutural: até o C# 8, **toda** variável de tipo de referência podia ser nula, e o compilador não tinha como distinguir "pode ser nula" de "nunca é nula".',
      },
      {
        kind: 'code',
        code: `string nome = ObterNome();
Console.WriteLine(nome.Length);

// ObterNome pode devolver null?
// O tipo nao diz. Ninguem sabe
// sem ler a implementacao.`,
      },
      {
        kind: 'text',
        body:
          'O **contexto nullable** resolve isso mudando o significado dos tipos. Com ele ligado, `string` passa a significar "nunca nula" e `string?` significa "pode ser nula" — e o compilador confere.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Sem o contexto',
          code: `string a = null;   // ok
string? b = null;  // ok
// os dois sao a mesma coisa`,
        },
        right: {
          label: 'Com o contexto',
          code: `string a = null;   // aviso CS8600
string? b = null;  // ok
// tipos diferentes de verdade`,
        },
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Isso **não muda o tempo de execução**. Não há verificação nova ao rodar, nem custo de desempenho. É análise estática pura: o compilador passa a rastrear, linha a linha, o que pode e o que não pode ser nulo.',
      },
      {
        kind: 'text',
        body:
          'O contexto tem duas metades independentes, e conhecer a diferença explica muita confusão:',
      },
      {
        kind: 'table',
        headers: ['Metade', 'O que faz'],
        rows: [
          ['**anotações**', 'dá significado ao `?`: `string` e `string?` viram tipos distintos'],
          ['**avisos**', 'emite os diagnósticos quando o fluxo viola as anotações'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Ligar só os avisos, sem as anotações, não funciona: sem anotações todos os tipos ficam "indiferentes" e não há o que violar. As duas metades precisam estar ligadas para a análise fazer sentido.',
      },
      {
        kind: 'text',
        body:
          'Num projeto real, o contexto é ligado no arquivo de projeto e vale para tudo. Também dá para controlá-lo por arquivo ou por trecho, com diretivas.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'No projeto (.csproj)',
          code: `<Nullable>enable</Nullable>`,
        },
        right: {
          label: 'No arquivo',
          code: `#nullable enable
// ... codigo ...
#nullable restore`,
        },
        note: 'A diretiva é a ferramenta para migrar um projeto antigo arquivo por arquivo, sem parar tudo.',
      },
      {
        kind: 'text',
        body:
          'Com o contexto ligado, um método que pode devolver nulo precisa dizer isso no tipo — e aí quem chama é obrigado a lidar com a possibilidade.',
      },
      {
        kind: 'code',
        code: `static string? Buscar(string chave)
{
    return chave == "ok" ? "achou" : null;
}

string? resultado = Buscar("nao");
Console.WriteLine(resultado.Length);   // aviso CS8602`,
      },
      {
        kind: 'output',
        code: `warning CS8602: Dereference of a possibly null reference.`,
        caption: 'O aviso aparece onde o valor é usado, apontando a linha exata do risco.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'São **avisos**, não erros: o código compila e roda. Em projetos sérios, a configuração `TreatWarningsAsErrors` transforma esses avisos em erros de build — e é aí que a garantia vira real.',
      },
      {
        kind: 'text',
        body:
          'A partir daqui, todas as lições deste capítulo rodam com o contexto ligado. Os avisos aparecem no painel de diagnósticos ao lado do desafio, e a solução correta é aquela que sai **sem nenhum aviso**.',
      },
    ],
    quiz: [
      {
        id: 's08c04l01q1',
        type: 'single',
        prompt: 'O que o contexto nullable muda em tempo de execução?',
        options: [
          { id: 'a', text: 'Nada: é análise estática pura, sem custo ao rodar', correct: true },
          { id: 'b', text: 'Insere verificações de nulo em cada acesso' },
          { id: 'c', text: 'Faz `string` lançar exceção ao receber `null`' },
          { id: 'd', text: 'Converte `null` em string vazia automaticamente' },
        ],
        explanation:
          'Um `string` não anulável ainda pode conter nulo em execução — via reflexão, deserialização ou código sem o contexto. A garantia é de análise, não de runtime.',
      },
      {
        id: 's08c04l01q2',
        type: 'single',
        prompt: 'Quais são as duas metades do contexto nullable?',
        options: [
          { id: 'a', text: 'Anotações (o `?` passa a ter significado) e avisos (os diagnósticos)', correct: true },
          { id: 'b', text: 'Compilação e execução' },
          { id: 'c', text: 'Tipos de valor e tipos de referência' },
          { id: 'd', text: 'Projeto e arquivo' },
        ],
        explanation:
          'Ligar só os avisos deixa todos os tipos indiferentes e não produz diagnóstico nenhum. A análise só funciona com as duas metades ativas.',
      },
      {
        id: 's08c04l01q3',
        type: 'single',
        prompt: 'Como migrar um projeto grande para o contexto nullable sem parar tudo?',
        options: [
          { id: 'a', text: 'Ligar por arquivo com `#nullable enable`, avançando aos poucos', correct: true },
          { id: 'b', text: 'Não é possível: a migração é tudo ou nada' },
          { id: 'c', text: 'Adicionar `?` a todas as variáveis do projeto' },
          { id: 'd', text: 'Desligar os avisos e ligar só as anotações' },
        ],
        explanation:
          'A diretiva por arquivo existe exatamente para isso. Cada arquivo migrado fica limpo e protegido, sem esperar o projeto inteiro.',
      },
    ],
    challenge: {
      brief:
        'Escreva um pequeno módulo de busca com o contexto nullable ligado, anotando corretamente o que pode ser nulo e lidando com a possibilidade em quem chama — sem gerar nenhum aviso.',
      requirements: [
        'O desafio roda com o contexto nullable ligado: avisos aparecem no painel de diagnósticos.',
        'A solução correta compila **sem nenhum aviso**.',
        'Métodos que podem devolver nulo declaram `string?`; os que nunca devolvem, `string`.',
        'Use `??` e `?.` para lidar com os valores anuláveis.',
        'Nenhum uso do operador `!` — ele é assunto da lição 4.',
      ],
      nullable: 'enabled',
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static readonly Dictionary<string, string> catalogo = new()
    {
        ["cafe"] = "Cafe torrado",
        ["cha"] = "Cha verde",
    };

    // TODO: anote o retorno corretamente — este metodo pode nao encontrar
    static string BuscarDescricao(string chave)
    {
        return catalogo.TryGetValue(chave, out string? descricao) ? descricao : null;
    }

    // TODO: este sempre devolve algo. Qual a anotacao certa?
    static string DescricaoOuPadrao(string chave)
    {
        return "";
    }

    // TODO: devolve o tamanho da descricao, ou -1 quando nao existe
    static int TamanhoDaDescricao(string chave)
    {
        return 0;
    }

    // TODO: junta as descricoes existentes, ignorando as ausentes
    static string Juntar(IEnumerable<string> chaves)
    {
        return "";
    }

    static void Main()
    {
        Console.WriteLine($"cafe: {BuscarDescricao("cafe")}");
        Console.WriteLine($"agua nula: {BuscarDescricao("agua") == null}");

        Console.WriteLine($"padrao cafe: {DescricaoOuPadrao("cafe")}");
        Console.WriteLine($"padrao agua: {DescricaoOuPadrao("agua")}");

        Console.WriteLine($"tamanho cha: {TamanhoDaDescricao("cha")}");
        Console.WriteLine($"tamanho agua: {TamanhoDaDescricao("agua")}");

        Console.WriteLine($"juntar: {Juntar(new[] { "cafe", "agua", "cha" })}");
        Console.WriteLine($"juntar vazio: [{Juntar(new string[0])}]");
        Console.WriteLine($"juntar sem achados: [{Juntar(new[] { "agua", "suco" })}]");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static readonly Dictionary<string, string> catalogo = new()
    {
        ["cafe"] = "Cafe torrado",
        ["cha"] = "Cha verde",
    };

    static string? BuscarDescricao(string chave)
    {
        return catalogo.TryGetValue(chave, out string? descricao) ? descricao : null;
    }

    static string DescricaoOuPadrao(string chave)
    {
        return BuscarDescricao(chave) ?? "sem descricao";
    }

    static int TamanhoDaDescricao(string chave)
    {
        return BuscarDescricao(chave)?.Length ?? -1;
    }

    static string Juntar(IEnumerable<string> chaves)
    {
        var encontradas = new List<string>();

        foreach (string chave in chaves)
        {
            string? descricao = BuscarDescricao(chave);

            if (descricao is not null)
            {
                encontradas.Add(descricao);
            }
        }

        return string.Join(" | ", encontradas);
    }

    static void Main()
    {
        Console.WriteLine($"cafe: {BuscarDescricao("cafe")}");
        Console.WriteLine($"agua nula: {BuscarDescricao("agua") == null}");

        Console.WriteLine($"padrao cafe: {DescricaoOuPadrao("cafe")}");
        Console.WriteLine($"padrao agua: {DescricaoOuPadrao("agua")}");

        Console.WriteLine($"tamanho cha: {TamanhoDaDescricao("cha")}");
        Console.WriteLine($"tamanho agua: {TamanhoDaDescricao("agua")}");

        Console.WriteLine($"juntar: {Juntar(new[] { "cafe", "agua", "cha" })}");
        Console.WriteLine($"juntar vazio: [{Juntar(new string[0])}]");
        Console.WriteLine($"juntar sem achados: [{Juntar(new[] { "agua", "suco" })}]");
    }
}`,
      hints: [
        '`BuscarDescricao` devolve `null` numa das saídas, então o tipo de retorno precisa ser `string?`.',
        '`DescricaoOuPadrao` nunca devolve nulo porque o `??` garante um valor — por isso o retorno é `string`, sem `?`.',
        '`?.Length ?? -1` combina os dois operadores: acesso condicional que produz `int?`, e coalescência que resolve o nulo.',
        'Em `Juntar`, `if (descricao is not null)` estreita o tipo: dentro do bloco, o compilador sabe que não é nulo.',
      ],
      tests: [
        {
          name: 'Módulo de busca anotado',
          expectedStdout:
            'cafe: Cafe torrado\nagua nula: True\n' +
            'padrao cafe: Cafe torrado\npadrao agua: sem descricao\n' +
            'tamanho cha: 9\ntamanho agua: -1\n' +
            'juntar: Cafe torrado | Cha verde\njuntar vazio: []\njuntar sem achados: []',
        },
      ],
    },
  },

  {
    id: 's08c04l02',
    title: 'Anotações ? em tipos de referência',
    objective: 'Anotar assinaturas com precisão, transformando o tipo num contrato sobre nulidade.',
    concept: [
      {
        kind: 'text',
        body:
          'Com o contexto ligado, cada `?` que você escreve — ou deixa de escrever — é uma **decisão de contrato**. A assinatura passa a documentar a nulidade, e o compilador cobra os dois lados.',
      },
      {
        kind: 'table',
        headers: ['Posição', '`string`', '`string?`'],
        rows: [
          ['parâmetro', 'quem chama **não** pode passar nulo', 'nulo é aceito'],
          ['retorno', 'nunca devolve nulo', 'pode devolver nulo'],
          ['campo ou propriedade', 'sempre tem valor', 'pode estar vazio'],
        ],
      },
      {
        kind: 'code',
        code: `// nunca devolve nulo; nao aceita nulo
static string Normalizar(string texto) => texto.Trim();

// pode devolver nulo; nao aceita nulo
static string? Buscar(string chave) => ...;

// aceita nulo; nunca devolve nulo
static string OuPadrao(string? texto) => texto ?? "padrao";`,
        caption: 'Três assinaturas, três contratos diferentes — sem uma linha de documentação.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A anotação transfere a responsabilidade. `string?` no retorno diz "eu devolvo; você trata". `string` no parâmetro diz "você garante; eu uso direto". Antes disso, essa negociação vivia em comentários — quando vivia.',
      },
      {
        kind: 'text',
        body:
          'Violar o contrato de qualquer lado produz um aviso, e cada situação tem um código próprio que ajuda a localizar o problema.',
      },
      {
        kind: 'table',
        headers: ['Código', 'Situação'],
        rows: [
          ['CS8600', 'atribuir possível nulo a variável não anulável'],
          ['CS8602', 'desreferenciar possível nulo (`x.Length`)'],
          ['CS8603', '`return null;` de método que devolve não anulável'],
          ['CS8604', 'passar possível nulo para parâmetro não anulável'],
          ['CS8618', 'campo não anulável sem valor ao fim do construtor'],
        ],
      },
      {
        kind: 'code',
        code: `static int Tamanho(string texto) => texto.Length;

string? talvez = Buscar("nao");
Console.WriteLine(Tamanho(talvez));   // aviso CS8604
string certo = talvez;                // aviso CS8600`,
      },
      {
        kind: 'text',
        body:
          'O CS8618 aparece em classes e é o que obriga a pensar na inicialização. Um campo `string` sem valor ao final do construtor está mentindo — ele **vai** conter nulo.',
      },
      {
        kind: 'compare',
        good: `class Pessoa
{
    public string Nome { get; set; } = "";
    public string? Apelido { get; set; }
}`,
        bad: `class Pessoa
{
    // aviso CS8618: Nome sera nulo
    public string Nome { get; set; }
    public string? Apelido { get; set; }
}`,
        goodLabel: 'Inicializado ou anulável',
        badLabel: 'Não anulável sem valor',
      },
      {
        kind: 'text',
        body:
          'São três saídas para o CS8618, e escolher entre elas é uma decisão de modelagem, não um detalhe:',
      },
      {
        kind: 'table',
        headers: ['Saída', 'Significa'],
        rows: [
          ['valor padrão (`= ""`)', 'existe sempre, e vazio é um estado válido'],
          ['exigir no construtor', 'o objeto não pode ser criado sem esse dado'],
          ['anotar `string?`', 'a ausência é um estado legítimo do domínio'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Anotar tudo com `?` para calar os avisos é a pior das três. Você mantém o problema e ainda perde a informação — todo consumidor passa a ter que verificar nulo em campos que na prática sempre têm valor.',
      },
      {
        kind: 'text',
        body:
          'Em genéricos, `T?` significa coisas diferentes conforme `T` seja referência ou valor, e sem restrição o compilador não pode assumir nenhum dos dois. Por isso `where T : class` ou `where T : struct` costumam aparecer junto.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Ao anotar uma API existente, comece pelos **retornos**. Eles determinam o que os consumidores precisam tratar, e é onde a informação mais falta.',
      },
    ],
    quiz: [
      {
        id: 's08c04l02q1',
        type: 'single',
        prompt: 'O que `static string OuPadrao(string? texto)` comunica?',
        options: [
          { id: 'a', text: 'Aceita nulo como argumento e garante que nunca devolve nulo', correct: true },
          { id: 'b', text: 'Exige argumento não nulo e pode devolver nulo' },
          { id: 'c', text: 'Aceita e devolve nulo' },
          { id: 'd', text: 'Não aceita nem devolve nulo' },
        ],
        explanation:
          'O `?` está no parâmetro, não no retorno. É a assinatura típica de um método que resolve a ausência — recebe o problema e devolve a solução.',
      },
      {
        id: 's08c04l02q2',
        type: 'single',
        prompt: 'Qual a **pior** forma de silenciar um aviso CS8618?',
        options: [
          { id: 'a', text: 'Anotar a propriedade com `?` sem que a ausência faça sentido no domínio', correct: true },
          { id: 'b', text: 'Inicializar com um valor padrão' },
          { id: 'c', text: 'Exigir o valor no construtor' },
          { id: 'd', text: 'Marcar a propriedade como `required`' },
        ],
        explanation:
          'O `?` mentiroso espalha o custo: cada consumidor passa a verificar nulo num campo que sempre tem valor. As outras três resolvem a causa.',
      },
      {
        id: 's08c04l02q3',
        type: 'single',
        prompt: 'Por onde começar ao anotar uma API existente?',
        options: [
          { id: 'a', text: 'Pelos tipos de retorno, que determinam o que os consumidores precisam tratar', correct: true },
          { id: 'b', text: 'Pelos campos privados' },
          { id: 'c', text: 'Pelas variáveis locais' },
          { id: 'd', text: 'Pelos parâmetros de métodos privados' },
        ],
        explanation:
          'O retorno é a informação que falta a quem consome. Locais são inferidas pelo compilador, e campos privados só afetam a própria classe.',
      },
    ],
    challenge: {
      brief:
        'Anote corretamente um módulo de perfis de usuário: decida qual propriedade é obrigatória, qual é opcional e qual assinatura cada método deve ter — sem gerar avisos.',
      requirements: [
        'A solução compila **sem nenhum aviso** com o contexto nullable ligado.',
        '`Nome` sempre existe; `Apelido` e `Bio` são opcionais de verdade.',
        '`BuscarPorId` pode não encontrar; `NomeExibicao` nunca devolve nulo.',
        '`ContarComBio` conta perfis que têm bio preenchida.',
        '`Resumir` aceita um perfil possivelmente nulo e devolve texto sempre.',
        'Nenhum uso do operador `!`.',
      ],
      nullable: 'enabled',
      starterCode: `using System;
using System.Collections.Generic;

class Perfil
{
    // TODO: Nome sempre existe. Apelido e Bio sao opcionais.
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Apelido { get; set; }
    public string Bio { get; set; }
}

class Program
{
    static readonly List<Perfil> perfis = new()
    {
        new Perfil { Id = 1, Nome = "Ana", Apelido = "aninha", Bio = "gosta de grafos" },
        new Perfil { Id = 2, Nome = "Bruno" },
        new Perfil { Id = 3, Nome = "Carla", Bio = "" },
    };

    // TODO: pode nao encontrar
    static Perfil BuscarPorId(int id)
    {
        foreach (Perfil p in perfis)
        {
            if (p.Id == id)
            {
                return p;
            }
        }

        return null;
    }

    // TODO: nunca devolve nulo — apelido quando houver, senao o nome
    static string NomeExibicao(Perfil perfil)
    {
        return "";
    }

    // TODO: conta perfis com Bio nao vazia
    static int ContarComBio()
    {
        return 0;
    }

    // TODO: aceita perfil possivelmente nulo, devolve texto sempre
    static string Resumir(Perfil perfil)
    {
        return "";
    }

    static void Main()
    {
        Console.WriteLine($"busca 1: {BuscarPorId(1)?.Nome}");
        Console.WriteLine($"busca 9 nula: {BuscarPorId(9) == null}");

        foreach (Perfil p in perfis)
        {
            Console.WriteLine($"exibicao {p.Id}: {NomeExibicao(p)}");
        }

        Console.WriteLine($"com bio: {ContarComBio()}");

        Console.WriteLine($"resumo 1: {Resumir(BuscarPorId(1))}");
        Console.WriteLine($"resumo 2: {Resumir(BuscarPorId(2))}");
        Console.WriteLine($"resumo 3: {Resumir(BuscarPorId(3))}");
        Console.WriteLine($"resumo ausente: {Resumir(BuscarPorId(9))}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Perfil
{
    public int Id { get; set; }
    public string Nome { get; set; } = "";
    public string? Apelido { get; set; }
    public string? Bio { get; set; }
}

class Program
{
    static readonly List<Perfil> perfis = new()
    {
        new Perfil { Id = 1, Nome = "Ana", Apelido = "aninha", Bio = "gosta de grafos" },
        new Perfil { Id = 2, Nome = "Bruno" },
        new Perfil { Id = 3, Nome = "Carla", Bio = "" },
    };

    static Perfil? BuscarPorId(int id)
    {
        foreach (Perfil p in perfis)
        {
            if (p.Id == id)
            {
                return p;
            }
        }

        return null;
    }

    static string NomeExibicao(Perfil perfil)
    {
        return string.IsNullOrWhiteSpace(perfil.Apelido) ? perfil.Nome : perfil.Apelido;
    }

    static int ContarComBio()
    {
        int total = 0;

        foreach (Perfil p in perfis)
        {
            if (!string.IsNullOrWhiteSpace(p.Bio))
            {
                total++;
            }
        }

        return total;
    }

    static string Resumir(Perfil? perfil)
    {
        if (perfil is null)
        {
            return "perfil ausente";
        }

        string bio = string.IsNullOrWhiteSpace(perfil.Bio) ? "sem bio" : perfil.Bio;
        return $"{NomeExibicao(perfil)}: {bio}";
    }

    static void Main()
    {
        Console.WriteLine($"busca 1: {BuscarPorId(1)?.Nome}");
        Console.WriteLine($"busca 9 nula: {BuscarPorId(9) == null}");

        foreach (Perfil p in perfis)
        {
            Console.WriteLine($"exibicao {p.Id}: {NomeExibicao(p)}");
        }

        Console.WriteLine($"com bio: {ContarComBio()}");

        Console.WriteLine($"resumo 1: {Resumir(BuscarPorId(1))}");
        Console.WriteLine($"resumo 2: {Resumir(BuscarPorId(2))}");
        Console.WriteLine($"resumo 3: {Resumir(BuscarPorId(3))}");
        Console.WriteLine($"resumo ausente: {Resumir(BuscarPorId(9))}");
    }
}`,
      hints: [
        '`Nome` precisa de `= ""` para não gerar CS8618; `Apelido` e `Bio` recebem `?` porque a ausência é legítima.',
        '`string.IsNullOrWhiteSpace` cobre nulo e vazio de uma vez, e o compilador entende que dentro do `else` o valor não é nulo.',
        'A Carla tem `Bio = ""`, que não é nulo mas também não conta como bio preenchida — só a Ana entra na contagem.',
        '`Resumir` recebe `Perfil?` e trata o nulo logo na primeira linha; depois disso o compilador sabe que o valor existe.',
      ],
      tests: [
        {
          name: 'Perfis anotados',
          expectedStdout:
            'busca 1: Ana\nbusca 9 nula: True\n' +
            'exibicao 1: aninha\nexibicao 2: Bruno\nexibicao 3: Carla\n' +
            'com bio: 1\n' +
            'resumo 1: aninha: gosta de grafos\nresumo 2: Bruno: sem bio\n' +
            'resumo 3: Carla: sem bio\nresumo ausente: perfil ausente',
        },
      ],
    },
  },

  {
    id: 's08c04l03',
    title: 'Análise de fluxo',
    objective: 'Entender como o compilador rastreia a nulidade linha a linha, e por que os avisos somem sozinhos.',
    concept: [
      {
        kind: 'text',
        body:
          'A parte mais interessante do contexto nullable não são as anotações — é a **análise de fluxo**. O compilador acompanha o caminho da execução e atualiza o que sabe sobre cada variável a cada linha.',
      },
      {
        kind: 'code',
        code: `string? talvez = Buscar("x");

Console.WriteLine(talvez.Length);   // aviso CS8602

if (talvez is not null)
{
    Console.WriteLine(talvez.Length);   // sem aviso
}`,
        caption: 'A mesma expressão, dois resultados: dentro do `if`, o compilador sabe que não é nulo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Isso se chama **estreitamento**. A anotação diz o que o valor *pode* ser; a análise de fluxo diz o que ele *é neste ponto*. As duas juntas é o que torna o recurso utilizável na prática.',
      },
      {
        kind: 'text',
        body: 'Várias construções estreitam, e reconhecê-las evita verificações redundantes:',
      },
      {
        kind: 'table',
        headers: ['Construção', 'Efeito'],
        rows: [
          ['`if (x is not null) { ... }`', 'não nulo dentro do bloco'],
          ['`if (x is null) return;`', 'não nulo **depois** do `if`'],
          ['`x ??= "padrao";`', 'não nulo daí em diante'],
          ['`if (string.IsNullOrEmpty(s)) return;`', 'não nulo depois (o método é anotado)'],
          ['`if (d.TryGetValue(k, out var v))`', '`v` não nulo dentro do `if`'],
        ],
      },
      {
        kind: 'text',
        body:
          'A cláusula de guarda é o caso mais idiomático: tratar a ausência cedo e sair, deixando o resto do método livre de verificações.',
      },
      {
        kind: 'compare',
        good: `static int Tamanho(string? texto)
{
    if (texto is null) return 0;

    // daqui pra baixo o compilador
    // sabe que texto nao e nulo
    return texto.Length;
}`,
        bad: `static int Tamanho(string? texto)
{
    if (texto is not null)
    {
        return texto.Length;
    }

    return 0;
}`,
        goodLabel: 'Guarda no início',
        badLabel: 'Corpo dentro do `if`',
      },
      {
        kind: 'text',
        body:
          'Um comportamento que surpreende: **desreferenciar também estreita**. Se `talvez.Length` executou sem estourar, o compilador conclui que a partir dali o valor não é nulo.',
      },
      {
        kind: 'code',
        code: `string? talvez = Buscar("x");

Console.WriteLine(talvez.Length);   // aviso CS8602
Console.WriteLine(Tamanho(talvez)); // SEM aviso`,
        caption:
          'A segunda linha não avisa porque, se a primeira não lançou, o valor não era nulo. É lógica correta — e assustadora de ler.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Isso significa que **o primeiro aviso é o que importa**. Corrigi-lo pode fazer avisos posteriores aparecerem, porque a suposição otimista some junto. Nunca corrija de baixo para cima.',
      },
      {
        kind: 'text',
        body:
          'O `out` também participa da análise, graças a atributos que o framework aplica. `TryGetValue` é anotado com `[NotNullWhen(true)]`, e por isso o compilador entende o padrão.',
      },
      {
        kind: 'code',
        code: `if (mapa.TryGetValue("chave", out string? valor))
{
    Console.WriteLine(valor.Length);   // sem aviso
}`,
      },
      {
        kind: 'text',
        body: 'Você pode anotar os seus próprios métodos da mesma forma:',
      },
      {
        kind: 'code',
        code: `static bool TryBuscar(string chave, [NotNullWhen(true)] out string? valor)
{
    valor = chave == "ok" ? "achou" : null;
    return valor != null;
}`,
        caption: 'Requer `using System.Diagnostics.CodeAnalysis;`. É o que ensina o compilador a confiar no seu `Try`.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A análise é conservadora com **campos**: entre duas leituras, outro código poderia tê-lo mudado. Se um campo anulável precisa ser usado várias vezes, copie-o para uma variável local — aí o estreitamento vale para o método inteiro.',
      },
    ],
    quiz: [
      {
        id: 's08c04l03q1',
        type: 'single',
        prompt: 'Por que `texto.Length` não avisa depois de `if (texto is null) return;`?',
        options: [
          { id: 'a', text: 'A análise de fluxo sabe que, se o método continuou, `texto` não é nulo', correct: true },
          { id: 'b', text: 'Porque o `return` desliga os avisos do método' },
          { id: 'c', text: 'Porque `is null` converte o valor' },
          { id: 'd', text: 'Avisa sim: a guarda não ajuda' },
        ],
        explanation:
          'O compilador rastreia cada caminho de execução. No caminho que chega à linha seguinte, a única possibilidade é o valor não ser nulo.',
      },
      {
        id: 's08c04l03q2',
        type: 'single',
        prompt: 'Por que o segundo uso de `talvez` não avisa, mesmo o primeiro tendo avisado?',
        code: `Console.WriteLine(talvez.Length);
Console.WriteLine(Tamanho(talvez));`,
        options: [
          { id: 'a', text: 'Desreferenciar estreita: se a primeira linha não lançou, o valor não era nulo', correct: true },
          { id: 'b', text: 'Porque o compilador só avisa uma vez por variável' },
          { id: 'c', text: 'Porque `Tamanho` aceita nulo' },
          { id: 'd', text: 'É um bug do compilador' },
        ],
        explanation:
          'É lógica correta com uma consequência prática importante: corrija sempre o primeiro aviso, porque avisos posteriores podem estar escondidos por essa suposição.',
      },
      {
        id: 's08c04l03q3',
        type: 'single',
        prompt: 'O que `[NotNullWhen(true)]` num parâmetro `out` comunica ao compilador?',
        options: [
          { id: 'a', text: 'Quando o método devolve `true`, o parâmetro de saída não é nulo', correct: true },
          { id: 'b', text: 'O parâmetro nunca é nulo' },
          { id: 'c', text: 'O método lança se o parâmetro for nulo' },
          { id: 'd', text: 'O parâmetro é obrigatório' },
        ],
        explanation:
          'É o atributo que faz o padrão `Try` funcionar com a análise de fluxo. Sem ele, o compilador avisaria mesmo dentro do `if` bem-sucedido.',
      },
    ],
    challenge: {
      brief:
        'Escreva um leitor de configuração que aproveita a análise de fluxo: guardas no início, um `Try` anotado com `[NotNullWhen(true)]` e nenhum aviso na saída.',
      requirements: [
        'A solução compila **sem nenhum aviso**.',
        '`TryObter` é anotado com `[NotNullWhen(true)]` no parâmetro `out`.',
        '`Tamanho` e `Formatar` usam cláusula de guarda no início, não corpo dentro de `if`.',
        '`ResolverCaminho` usa `??=` e aproveita o estreitamento resultante.',
        'Um campo anulável é copiado para variável local antes de ser usado várias vezes.',
        'Nenhum uso do operador `!`.',
      ],
      nullable: 'enabled',
      starterCode: `using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

class Configuracao
{
    private readonly Dictionary<string, string> valores = new()
    {
        ["host"] = "localhost",
        ["porta"] = "5239",
        ["vazio"] = "",
    };

    public string? Prefixo { get; set; }

    // TODO: anote o out para que o compilador confie dentro do if
    public bool TryObter(string chave, out string valor)
    {
        valor = "";
        return false;
    }

    public string? Obter(string chave)
    {
        // TODO
        return null;
    }

    // TODO: use ??= e aproveite o estreitamento
    public string ResolverCaminho(string recurso)
    {
        return "";
    }

    // TODO: copie Prefixo para uma local antes de usar varias vezes
    public string DescreverPrefixo()
    {
        return "";
    }
}

class Program
{
    // TODO: guarda no inicio
    static int Tamanho(string? texto)
    {
        return 0;
    }

    // TODO: guarda no inicio
    static string Formatar(string? texto, string rotulo)
    {
        return "";
    }

    static void Main()
    {
        var cfg = new Configuracao();

        if (cfg.TryObter("host", out string host))
        {
            Console.WriteLine($"host: {host} ({host.Length})");
        }

        Console.WriteLine($"try ausente: {cfg.TryObter("nada", out string _)}");

        Console.WriteLine($"obter porta: {cfg.Obter("porta")}");
        Console.WriteLine($"obter ausente nula: {cfg.Obter("nada") == null}");

        Console.WriteLine($"tamanho: {Tamanho(cfg.Obter("host"))}");
        Console.WriteLine($"tamanho nulo: {Tamanho(cfg.Obter("nada"))}");
        Console.WriteLine($"tamanho vazio: {Tamanho(cfg.Obter("vazio"))}");

        Console.WriteLine($"formatar: {Formatar(cfg.Obter("porta"), "porta")}");
        Console.WriteLine($"formatar nulo: {Formatar(cfg.Obter("nada"), "nada")}");

        Console.WriteLine($"prefixo inicial: {cfg.DescreverPrefixo()}");
        Console.WriteLine($"caminho: {cfg.ResolverCaminho("api")}");
        Console.WriteLine($"prefixo depois: {cfg.DescreverPrefixo()}");
        Console.WriteLine($"caminho de novo: {cfg.ResolverCaminho("saude")}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

class Configuracao
{
    private readonly Dictionary<string, string> valores = new()
    {
        ["host"] = "localhost",
        ["porta"] = "5239",
        ["vazio"] = "",
    };

    public string? Prefixo { get; set; }

    public bool TryObter(string chave, [NotNullWhen(true)] out string? valor)
    {
        return valores.TryGetValue(chave, out valor);
    }

    public string? Obter(string chave)
    {
        return valores.TryGetValue(chave, out string? valor) ? valor : null;
    }

    public string ResolverCaminho(string recurso)
    {
        Prefixo ??= "/padrao";
        return $"{Prefixo}/{recurso}";
    }

    public string DescreverPrefixo()
    {
        string? atual = Prefixo;

        if (atual is null)
        {
            return "sem prefixo";
        }

        return $"prefixo {atual} com {atual.Length} caracteres";
    }
}

class Program
{
    static int Tamanho(string? texto)
    {
        if (texto is null)
        {
            return -1;
        }

        return texto.Length;
    }

    static string Formatar(string? texto, string rotulo)
    {
        if (texto is null)
        {
            return $"{rotulo}: ausente";
        }

        return $"{rotulo}: {texto.ToUpperInvariant()} ({texto.Length})";
    }

    static void Main()
    {
        var cfg = new Configuracao();

        if (cfg.TryObter("host", out string? host))
        {
            Console.WriteLine($"host: {host} ({host.Length})");
        }

        Console.WriteLine($"try ausente: {cfg.TryObter("nada", out string? _)}");

        Console.WriteLine($"obter porta: {cfg.Obter("porta")}");
        Console.WriteLine($"obter ausente nula: {cfg.Obter("nada") == null}");

        Console.WriteLine($"tamanho: {Tamanho(cfg.Obter("host"))}");
        Console.WriteLine($"tamanho nulo: {Tamanho(cfg.Obter("nada"))}");
        Console.WriteLine($"tamanho vazio: {Tamanho(cfg.Obter("vazio"))}");

        Console.WriteLine($"formatar: {Formatar(cfg.Obter("porta"), "porta")}");
        Console.WriteLine($"formatar nulo: {Formatar(cfg.Obter("nada"), "nada")}");

        Console.WriteLine($"prefixo inicial: {cfg.DescreverPrefixo()}");
        Console.WriteLine($"caminho: {cfg.ResolverCaminho("api")}");
        Console.WriteLine($"prefixo depois: {cfg.DescreverPrefixo()}");
        Console.WriteLine($"caminho de novo: {cfg.ResolverCaminho("saude")}");
    }
}`,
      hints: [
        '`TryObter` pode delegar direto para `valores.TryGetValue(chave, out valor)` — o `out` do dicionário já é anotado da mesma forma.',
        '`Prefixo ??= "/padrao";` atribui e estreita: depois dessa linha o compilador sabe que `Prefixo` não é nulo.',
        'Em `DescreverPrefixo`, copiar a propriedade para `atual` é o que permite usar `atual.Length` sem aviso — a análise não confia em duas leituras seguidas de um membro.',
        'A guarda no início deixa o corpo principal sem indentação extra e sem verificações espalhadas.',
      ],
      tests: [
        {
          name: 'Leitor de configuração',
          expectedStdout:
            'host: localhost (9)\ntry ausente: False\n' +
            'obter porta: 5239\nobter ausente nula: True\n' +
            'tamanho: 9\ntamanho nulo: -1\ntamanho vazio: 0\n' +
            'formatar: porta: 5239 (4)\nformatar nulo: nada: ausente\n' +
            'prefixo inicial: sem prefixo\ncaminho: /padrao/api\n' +
            'prefixo depois: prefixo /padrao com 7 caracteres\ncaminho de novo: /padrao/saude',
        },
      ],
    },
  },

  {
    id: 's08c04l04',
    title: 'O operador ! e quando usá-lo',
    objective: 'Usar o operador de perdão de nulo com parcimônia, sabendo exatamente o que ele promete e o que não promete.',
    concept: [
      {
        kind: 'text',
        body:
          'O operador `!` — chamado de **perdão de nulo** — diz ao compilador: "eu sei que isso não é nulo, pare de avisar". Ele silencia o diagnóstico e não faz mais nada.',
      },
      {
        kind: 'code',
        code: `string? talvez = Buscar("ok");

Console.WriteLine(talvez.Length);    // aviso CS8602
Console.WriteLine(talvez!.Length);   // sem aviso`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O `!` **não protege nada em tempo de execução**. Se o valor for nulo, a `NullReferenceException` acontece exatamente como aconteceria sem ele. A única diferença é que você abriu mão do aviso que teria evitado o problema.',
      },
      {
        kind: 'output',
        code: `string? x = null;
Console.WriteLine(x!.Length);

->  NullReferenceException`,
        caption: 'O `!` é uma promessa sua ao compilador. Se a promessa for falsa, o programa quebra.',
      },
      {
        kind: 'text',
        body:
          'Isso faz do `!` uma ferramenta de último recurso. Antes de usá-lo, existem três alternativas que resolvem de verdade:',
      },
      {
        kind: 'table',
        headers: ['Em vez de `!`', 'Prefira'],
        rows: [
          ['`valor!.Length`', '`valor?.Length ?? 0`'],
          ['`return valor!;`', '`return valor ?? padrao;`'],
          ['`Usar(valor!)`', '`if (valor is null) return;` antes'],
          ['`campo!.Metodo()`', 'copiar para local e estreitar'],
        ],
      },
      {
        kind: 'compare',
        good: `if (config is null)
{
    throw new InvalidOperationException(
        "configuracao nao carregada");
}

return config.Host;`,
        bad: `return config!.Host;
// se for nulo, NullReferenceException
// sem mensagem util nenhuma`,
        goodLabel: 'Falha com mensagem',
        badLabel: 'Falha sem explicação',
      },
      {
        kind: 'text',
        body:
          'Ainda assim, existem casos legítimos — situações em que você tem uma garantia que o compilador não consegue enxergar.',
      },
      {
        kind: 'table',
        headers: ['Caso legítimo', 'Por quê'],
        rows: [
          ['depois de um `Validar()` próprio', 'o método garante, mas o compilador não sabe'],
          ['campo inicializado por framework', 'injeção de dependência, deserialização'],
          ['em testes, montando dados', 'o cenário controla a entrada'],
          ['invariante provada em outro lugar', 'a garantia existe fora do método'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Quando o `!` for realmente necessário, **escreva um comentário explicando a garantia**. Um `!` sem justificativa é indistinguível de um aviso ignorado por preguiça, e é assim que ele será lido daqui a seis meses.',
      },
      {
        kind: 'text',
        body:
          'Para o caso do campo inicializado por fora, existe uma alternativa melhor que o `!` em cada uso: o `= null!` na declaração, que concentra a mentira num lugar só.',
      },
      {
        kind: 'code',
        code: `class Servico
{
    // o framework preenche antes de qualquer uso
    private Conexao conexao = null!;

    public void Executar()
    {
        conexao.Abrir();   // sem ! aqui
    }
}`,
        caption: 'Um `null!` na declaração em vez de um `!` em cada uso. Ainda é uma promessa, mas fica visível e localizada.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A métrica que importa: **quantos `!` existem no seu código?** Poucos e comentados indicam um projeto que leva o contexto a sério. Espalhados por toda parte indicam que os avisos foram tratados como ruído, e a garantia inteira virou fachada.',
      },
      {
        kind: 'text',
        body:
          'O `!` também pode aparecer em padrões e expressões maiores, e sempre com o mesmo significado: uma afirmação sua, não uma verificação.',
      },
    ],
    quiz: [
      {
        id: 's08c04l04q1',
        type: 'single',
        prompt: 'O que o operador `!` faz em tempo de execução?',
        options: [
          { id: 'a', text: 'Nada: ele só silencia o aviso do compilador', correct: true },
          { id: 'b', text: 'Lança exceção se o valor for nulo' },
          { id: 'c', text: 'Substitui nulo pelo valor padrão' },
          { id: 'd', text: 'Verifica o valor e retorna se for nulo' },
        ],
        explanation:
          'Ele não gera instrução nenhuma. Um `x!.Length` com `x` nulo produz exatamente a mesma `NullReferenceException` de `x.Length`.',
      },
      {
        id: 's08c04l04q2',
        type: 'single',
        prompt: 'Qual a melhor alternativa a `return config!.Host;`?',
        options: [
          { id: 'a', text: 'Verificar e lançar com mensagem própria antes de acessar', correct: true },
          { id: 'b', text: 'Anotar `Host` como `string?`' },
          { id: 'c', text: 'Desligar o contexto nullable no arquivo' },
          { id: 'd', text: 'Usar `config!!.Host`' },
        ],
        explanation:
          'A falha vai acontecer de qualquer forma; a escolha é entre uma `NullReferenceException` sem contexto e uma exceção que diz o que estava faltando.',
      },
      {
        id: 's08c04l04q3',
        type: 'single',
        prompt: 'Por que `= null!` na declaração é melhor que um `!` em cada uso?',
        options: [
          { id: 'a', text: 'Concentra a afirmação num ponto visível, em vez de espalhá-la pelo código', correct: true },
          { id: 'b', text: 'Porque `null!` verifica o valor em execução' },
          { id: 'c', text: 'Porque `null!` funciona sem o contexto nullable' },
          { id: 'd', text: 'Não é melhor: os dois são equivalentes em legibilidade' },
        ],
        explanation:
          'A promessa continua sendo uma promessa, mas fica num lugar só — fácil de encontrar, comentar e revisar quando a inicialização mudar.',
      },
    ],
    challenge: {
      brief:
        'Refatore um módulo cheio de `!` para eliminá-los todos, exceto um caso genuinamente justificado — e mostre que o `!` não protege nada em execução.',
      requirements: [
        'A solução compila **sem nenhum aviso**.',
        'Exatamente **um** `!` permanece no código, com comentário explicando a garantia.',
        '`TamanhoSeguro` usa `?.` e `??` em vez de `!`.',
        '`HostObrigatorio` lança `InvalidOperationException` com mensagem própria em vez de usar `!`.',
        '`PrimeiroNaoVazio` usa guarda e estreitamento.',
        'Demonstre, dentro de `try`/`catch`, que `!` sobre um valor nulo ainda lança `NullReferenceException`.',
      ],
      nullable: 'enabled',
      starterCode: `using System;
using System.Collections.Generic;

class Config
{
    // Preenchido por Carregar() antes de qualquer uso.
    // TODO: use "= null!" aqui e explique no comentario
    public string Host { get; set; }

    public string? Porta { get; set; }

    public void Carregar()
    {
        Host = "localhost";
        Porta = "5239";
    }
}

class Program
{
    // TODO: substitua o ! por ?. e ??
    static int TamanhoSeguro(string? texto)
    {
        return 0;
    }

    // TODO: substitua o ! por verificacao com mensagem propria
    static string HostObrigatorio(Config? config)
    {
        return "";
    }

    // TODO: guarda e estreitamento; sem !
    static string PrimeiroNaoVazio(IEnumerable<string?> textos)
    {
        return "";
    }

    static void Main()
    {
        var config = new Config();
        config.Carregar();

        Console.WriteLine($"host: {HostObrigatorio(config)}");
        Console.WriteLine($"porta: {config.Porta}");

        try
        {
            HostObrigatorio(null);
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"erro: {ex.Message}");
        }

        Console.WriteLine($"tamanho: {TamanhoSeguro("abcde")}");
        Console.WriteLine($"tamanho nulo: {TamanhoSeguro(null)}");

        Console.WriteLine($"primeiro: {PrimeiroNaoVazio(new string?[] { null, "", "achou", "outro" })}");
        Console.WriteLine($"primeiro nenhum: {PrimeiroNaoVazio(new string?[] { null, "" })}");
        Console.WriteLine($"primeiro vazio: {PrimeiroNaoVazio(new string?[0])}");

        string? nulo = null;

        try
        {
            Console.WriteLine(nulo!.Length);
        }
        catch (NullReferenceException)
        {
            Console.WriteLine("o ! nao protege em execucao");
        }
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Config
{
    // Carregar() preenche antes de qualquer leitura; o framework garante a ordem.
    // Este e o unico null! do modulo, concentrado na declaracao.
    public string Host { get; set; } = null!;

    public string? Porta { get; set; }

    public void Carregar()
    {
        Host = "localhost";
        Porta = "5239";
    }
}

class Program
{
    static int TamanhoSeguro(string? texto)
    {
        return texto?.Length ?? -1;
    }

    static string HostObrigatorio(Config? config)
    {
        if (config is null)
        {
            throw new InvalidOperationException("configuracao nao carregada");
        }

        return config.Host;
    }

    static string PrimeiroNaoVazio(IEnumerable<string?> textos)
    {
        foreach (string? texto in textos)
        {
            if (string.IsNullOrEmpty(texto))
            {
                continue;
            }

            return texto;
        }

        return "nenhum";
    }

    static void Main()
    {
        var config = new Config();
        config.Carregar();

        Console.WriteLine($"host: {HostObrigatorio(config)}");
        Console.WriteLine($"porta: {config.Porta}");

        try
        {
            HostObrigatorio(null);
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"erro: {ex.Message}");
        }

        Console.WriteLine($"tamanho: {TamanhoSeguro("abcde")}");
        Console.WriteLine($"tamanho nulo: {TamanhoSeguro(null)}");

        Console.WriteLine($"primeiro: {PrimeiroNaoVazio(new string?[] { null, "", "achou", "outro" })}");
        Console.WriteLine($"primeiro nenhum: {PrimeiroNaoVazio(new string?[] { null, "" })}");
        Console.WriteLine($"primeiro vazio: {PrimeiroNaoVazio(new string?[0])}");

        string? nulo = null;

        try
        {
            Console.WriteLine(nulo!.Length);
        }
        catch (NullReferenceException)
        {
            Console.WriteLine("o ! nao protege em execucao");
        }
    }
}`,
      hints: [
        '`= null!` na declaração de `Host` é o único `!` justificado: ele documenta que a inicialização acontece fora do construtor.',
        '`texto?.Length ?? -1` substitui o `!` sem abrir mão de nada — se for nulo, o resultado é o padrão.',
        'Em `PrimeiroNaoVazio`, `string.IsNullOrEmpty(texto)` seguido de `continue` estreita `texto` para não nulo no resto do laço.',
        'O `!` do `Main` é intencional: ele existe para demonstrar que a exceção acontece mesmo assim.',
      ],
      tests: [
        {
          name: 'Eliminando o perdão de nulo',
          expectedStdout:
            'host: localhost\nporta: 5239\n' +
            'erro: configuracao nao carregada\n' +
            'tamanho: 5\ntamanho nulo: -1\n' +
            'primeiro: achou\nprimeiro nenhum: nenhum\nprimeiro vazio: nenhum\n' +
            'o ! nao protege em execucao',
        },
      ],
    },
  },

  {
    id: 's08c04l05',
    title: 'required',
    objective: 'Exigir que uma propriedade seja preenchida na criação do objeto, sem construtor.',
    concept: [
      {
        kind: 'text',
        body:
          'O CS8618 avisa que uma propriedade não anulável pode ficar nula. O modificador **`required`** resolve isso de forma direta: o compilador passa a exigir que ela seja atribuída em toda criação do objeto.',
      },
      {
        kind: 'code',
        code: `class Pessoa
{
    public required string Nome { get; init; }
    public string? Apelido { get; init; }
    public int Idade { get; init; }
}`,
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Compila',
          code: `var p = new Pessoa { Nome = "Ana" };

var q = new Pessoa
{
    Nome = "Bruno",
    Apelido = "Bru",
    Idade = 40,
};`,
        },
        right: {
          label: 'Não compila',
          code: `var r = new Pessoa { Idade = 30 };
// erro CS9035: Required member
// 'Pessoa.Nome' must be set`,
        },
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que é **erro**, não aviso. Diferente do resto do capítulo, `required` não é análise otimista: o objeto simplesmente não pode ser construído sem os campos obrigatórios.',
      },
      {
        kind: 'text',
        body:
          'A alternativa clássica era um construtor com parâmetros. `required` resolve o mesmo problema com uma diferença prática importante:',
      },
      {
        kind: 'table',
        headers: ['', 'Construtor', '`required`'],
        rows: [
          ['obrigatoriedade', 'sim', 'sim'],
          ['ordem dos argumentos', 'importa', 'não existe'],
          ['nome visível na chamada', 'não', 'sim'],
          ['adicionar campo obrigatório', 'quebra todas as chamadas', 'quebra todas as chamadas'],
          ['muitos campos opcionais', 'explosão de sobrecargas', 'nenhum problema'],
        ],
      },
      {
        kind: 'compare',
        good: `new Pedido
{
    Cliente = "Ana",
    Valor = 250m,
    Itens = 3,
};`,
        bad: `new Pedido("Ana", 250m, 3);
// qual e qual?
// e se dois forem decimal?`,
        goodLabel: 'Nomeado e obrigatório',
        badLabel: 'Posicional',
      },
      {
        kind: 'text',
        body:
          'A combinação natural é `required` com `init`: obrigatório na criação e imutável depois. Juntos, eles produzem um objeto que nasce completo e não muda.',
      },
      {
        kind: 'code',
        code: `class Configuracao
{
    public required string Host { get; init; }
    public required int Porta { get; init; }
    public string? Usuario { get; init; }
    public int Timeout { get; init; } = 30;
}`,
        caption: '`Timeout` tem valor padrão e não é obrigatório; `Host` e `Porta` são o mínimo para o objeto fazer sentido.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um construtor que **não** preenche os membros obrigatórios precisa ser anotado com `[SetsRequiredMembers]`, ou o compilador continua exigindo o inicializador. Sem esse atributo, ter construtor e `required` juntos gera confusão.',
      },
      {
        kind: 'text',
        body:
          '`required` funciona com `class`, `struct` e `record`. Em `record` posicional os parâmetros já são obrigatórios, então `required` aparece nas propriedades **adicionais**.',
      },
      {
        kind: 'code',
        code: `record Produto(string Codigo, decimal Preco)
{
    public required string Categoria { get; init; }
    public string? Descricao { get; init; }
}

var p = new Produto("A1", 10m) { Categoria = "bebidas" };`,
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A pergunta para decidir: **este objeto faz sentido sem esse campo?** Se não faz, o campo é `required`. Se faz — mesmo que raramente —, ele é opcional e deve ser `?` ou ter valor padrão.',
      },
    ],
    quiz: [
      {
        id: 's08c04l05q1',
        type: 'single',
        prompt: 'O que acontece ao criar um objeto sem preencher uma propriedade `required`?',
        options: [
          { id: 'a', text: 'Erro de compilação CS9035', correct: true },
          { id: 'b', text: 'Aviso, mas o código compila' },
          { id: 'c', text: 'Exceção em tempo de execução' },
          { id: 'd', text: 'A propriedade recebe o valor padrão' },
        ],
        explanation:
          'É a diferença mais importante em relação aos avisos de nulidade: `required` é uma exigência real do compilador, não uma sugestão.',
      },
      {
        id: 's08c04l05q2',
        type: 'single',
        prompt: 'Qual a principal vantagem de `required` sobre um construtor com parâmetros?',
        options: [
          { id: 'a', text: 'Os nomes ficam visíveis na chamada e a ordem não importa', correct: true },
          { id: 'b', text: 'É mais rápido em tempo de execução' },
          { id: 'c', text: 'Permite propriedades mutáveis' },
          { id: 'd', text: 'Dispensa a anotação de tipos' },
        ],
        explanation:
          'Com muitos campos, `new Pedido("Ana", 250m, 3, true, null)` é ilegível. O inicializador nomeado se explica sozinho e não sofre com trocas de posição.',
      },
      {
        id: 's08c04l05q3',
        type: 'single',
        prompt: 'Quando uma propriedade **não** deve ser `required`?',
        options: [
          { id: 'a', text: 'Quando o objeto faz sentido sem ela, ainda que raramente', correct: true },
          { id: 'b', text: 'Quando ela é do tipo `string`' },
          { id: 'c', text: 'Quando ela tem `init`' },
          { id: 'd', text: 'Quando a classe tem mais de cinco propriedades' },
        ],
        explanation:
          'Marcar como obrigatório algo opcional força todo mundo a inventar um valor. O critério é a integridade do objeto, não a frequência de uso.',
      },
    ],
    challenge: {
      brief:
        'Modele o cadastro de um evento decidindo, campo a campo, o que é obrigatório, o que é opcional e o que tem valor padrão — usando `required`, `init` e anotações de nulidade.',
      requirements: [
        'A solução compila **sem nenhum aviso**.',
        '`Titulo`, `Data` e `Local` são `required`; `Descricao` e `Site` são opcionais de verdade.',
        '`CapacidadeMaxima` tem valor padrão 100 e não é obrigatória.',
        'Todas as propriedades são `init` — o evento não muda depois de criado.',
        '`Resumir` monta a descrição lidando com os campos opcionais.',
        '`TemInscricaoOnline` responde sem desreferenciar nada possivelmente nulo.',
      ],
      nullable: 'enabled',
      starterCode: `using System;
using System.Collections.Generic;

class Evento
{
    // TODO: decida required / opcional / padrao para cada uma
    public string Titulo { get; init; }
    public DateTime Data { get; init; }
    public string Local { get; init; }
    public string Descricao { get; init; }
    public string Site { get; init; }
    public int CapacidadeMaxima { get; init; }
}

class Program
{
    // TODO: "<titulo> em <local> (<data yyyy-MM-dd>)" mais " - <descricao>" quando houver
    static string Resumir(Evento e)
    {
        return "";
    }

    // TODO: true quando Site nao e nulo nem vazio
    static bool TemInscricaoOnline(Evento e)
    {
        return false;
    }

    // TODO: "<n> vagas" ou "lotado" quando inscritos >= capacidade
    static string Vagas(Evento e, int inscritos)
    {
        return "";
    }

    static void Main()
    {
        var completo = new Evento
        {
            Titulo = "CodeQuest Conf",
            Data = new DateTime(2026, 5, 20),
            Local = "Recife",
            Descricao = "encontro anual",
            Site = "https://exemplo.dev",
            CapacidadeMaxima = 300,
        };

        var minimo = new Evento
        {
            Titulo = "Meetup C#",
            Data = new DateTime(2026, 6, 2),
            Local = "Online",
        };

        Console.WriteLine($"completo: {Resumir(completo)}");
        Console.WriteLine($"minimo: {Resumir(minimo)}");

        Console.WriteLine($"online completo: {TemInscricaoOnline(completo)}");
        Console.WriteLine($"online minimo: {TemInscricaoOnline(minimo)}");

        Console.WriteLine($"capacidade completo: {completo.CapacidadeMaxima}");
        Console.WriteLine($"capacidade minimo: {minimo.CapacidadeMaxima}");

        Console.WriteLine($"vagas: {Vagas(completo, 250)}");
        Console.WriteLine($"lotado: {Vagas(minimo, 100)}");
        Console.WriteLine($"vazio: {Vagas(minimo, 0)}");

        var eventos = new List<Evento> { completo, minimo };
        int comSite = 0;

        foreach (Evento e in eventos)
        {
            if (TemInscricaoOnline(e))
            {
                comSite++;
            }
        }

        Console.WriteLine($"com site: {comSite}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Evento
{
    public required string Titulo { get; init; }
    public required DateTime Data { get; init; }
    public required string Local { get; init; }
    public string? Descricao { get; init; }
    public string? Site { get; init; }
    public int CapacidadeMaxima { get; init; } = 100;
}

class Program
{
    static string Resumir(Evento e)
    {
        string basico = $"{e.Titulo} em {e.Local} ({e.Data:yyyy-MM-dd})";

        if (string.IsNullOrWhiteSpace(e.Descricao))
        {
            return basico;
        }

        return $"{basico} - {e.Descricao}";
    }

    static bool TemInscricaoOnline(Evento e)
    {
        return !string.IsNullOrWhiteSpace(e.Site);
    }

    static string Vagas(Evento e, int inscritos)
    {
        int restantes = e.CapacidadeMaxima - inscritos;
        return restantes <= 0 ? "lotado" : $"{restantes} vagas";
    }

    static void Main()
    {
        var completo = new Evento
        {
            Titulo = "CodeQuest Conf",
            Data = new DateTime(2026, 5, 20),
            Local = "Recife",
            Descricao = "encontro anual",
            Site = "https://exemplo.dev",
            CapacidadeMaxima = 300,
        };

        var minimo = new Evento
        {
            Titulo = "Meetup C#",
            Data = new DateTime(2026, 6, 2),
            Local = "Online",
        };

        Console.WriteLine($"completo: {Resumir(completo)}");
        Console.WriteLine($"minimo: {Resumir(minimo)}");

        Console.WriteLine($"online completo: {TemInscricaoOnline(completo)}");
        Console.WriteLine($"online minimo: {TemInscricaoOnline(minimo)}");

        Console.WriteLine($"capacidade completo: {completo.CapacidadeMaxima}");
        Console.WriteLine($"capacidade minimo: {minimo.CapacidadeMaxima}");

        Console.WriteLine($"vagas: {Vagas(completo, 250)}");
        Console.WriteLine($"lotado: {Vagas(minimo, 100)}");
        Console.WriteLine($"vazio: {Vagas(minimo, 0)}");

        var eventos = new List<Evento> { completo, minimo };
        int comSite = 0;

        foreach (Evento e in eventos)
        {
            if (TemInscricaoOnline(e))
            {
                comSite++;
            }
        }

        Console.WriteLine($"com site: {comSite}");
    }
}`,
      hints: [
        'Um evento sem título, data ou local não é um evento — os três são `required`. Descrição e site são informações extras.',
        '`CapacidadeMaxima` recebe `= 100` na declaração: tem valor sensato e por isso não precisa ser obrigatória.',
        '`string.IsNullOrWhiteSpace` evita desreferenciar o campo opcional e cobre nulo e vazio de uma vez.',
        '`DateTime` é tipo de valor: ele nunca é nulo, mas `required` continua fazendo sentido para exigir que alguém informe a data.',
      ],
      tests: [
        {
          name: 'Cadastro de evento',
          expectedStdout:
            'completo: CodeQuest Conf em Recife (2026-05-20) - encontro anual\n' +
            'minimo: Meetup C# em Online (2026-06-02)\n' +
            'online completo: True\nonline minimo: False\n' +
            'capacidade completo: 300\ncapacidade minimo: 100\n' +
            'vagas: 50 vagas\nlotado: lotado\nvazio: 100 vagas\n' +
            'com site: 1',
        },
      ],
    },
  },

  {
    id: 's08c04l06',
    title: 'init',
    objective: 'Criar objetos que aceitam inicializador de propriedades e ficam imutáveis depois.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma propriedade `init` pode ser atribuída **apenas** durante a construção do objeto: no construtor ou no inicializador de propriedades. Depois disso, ela é somente leitura.',
      },
      {
        kind: 'code',
        code: `class Endereco
{
    public required string Rua { get; init; }
    public string? Complemento { get; init; }
}

var e = new Endereco { Rua = "Rua A" };   // ok
e.Rua = "Rua B";                          // erro CS8852`,
      },
      {
        kind: 'text',
        body:
          'Isso preenche uma lacuna antiga. Antes existiam só dois extremos, e nenhum servia bem:',
      },
      {
        kind: 'table',
        headers: ['Acessador', 'Atribuível', 'Aceita inicializador'],
        rows: [
          ['`get; set;`', 'sempre', 'sim'],
          ['`get;` (só leitura)', 'só no construtor', 'não'],
          ['`get; init;`', 'só na construção', 'sim'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '`init` é o que torna `required` útil. Sem ele, você teria que escolher entre um objeto mutável ou um construtor com dez parâmetros posicionais. Com os dois juntos, o objeto nasce completo e permanece estável.',
      },
      {
        kind: 'compare',
        good: `class Config
{
    public required string Host { get; init; }
    public int Timeout { get; init; } = 30;
}

var c = new Config { Host = "local" };
// c nunca muda`,
        bad: `class Config
{
    public string Host { get; set; } = "";
    public int Timeout { get; set; } = 30;
}

var c = new Config { Host = "local" };
c.Host = "outro";  // qualquer um muda`,
        goodLabel: 'Imutável após a criação',
        badLabel: 'Mutável para sempre',
      },
      {
        kind: 'text',
        body:
          'Objetos imutáveis eliminam uma classe inteira de bug: nada muda "por baixo" enquanto você usa. Ninguém precisa se perguntar se o valor lido no início do método ainda é o mesmo no fim.',
      },
      {
        kind: 'text',
        body:
          'Um `init` pode ler outros membros e validar, como qualquer acessador. É onde a invariante do objeto é garantida.',
      },
      {
        kind: 'code',
        code: `class Intervalo
{
    private readonly int fim;

    public required int Inicio { get; init; }

    public required int Fim
    {
        get => fim;
        init
        {
            if (value < Inicio)
            {
                throw new ArgumentException("fim antes do inicio");
            }

            fim = value;
        }
    }
}`,
        caption: 'A validação roda na construção. Depois disso o objeto é garantidamente válido — para sempre.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Cuidado com a **ordem** no inicializador: as propriedades são atribuídas na ordem em que você as escreve. Um `init` que lê outra propriedade depende de ela já ter sido atribuída, e o compilador não avisa se a ordem estiver errada.',
      },
      {
        kind: 'text',
        body:
          'Para "modificar" um objeto imutável, o caminho é criar outro. `record` traz `with` de graça; em classes comuns, um método de cópia faz o papel.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'record: `with`',
          code: `var novo = antigo with { Timeout = 60 };`,
        },
        right: {
          label: 'class: método de cópia',
          code: `public Config ComTimeout(int t) => new Config
{
    Host = Host,
    Timeout = t,
};`,
        },
        note: 'O `with` é o motivo mais forte para usar `record` quando o tipo é essencialmente um agregado de valores.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          '`init` protege a **referência**, não o conteúdo. Uma propriedade `init` do tipo `List<T>` continua permitindo `objeto.Itens.Add(...)`. Para imutabilidade real, exponha `IReadOnlyList<T>`.',
      },
      {
        kind: 'text',
        body:
          'A combinação recomendada para objetos de dados é a mesma em quase todo projeto moderno: `required` no que é essencial, `init` em tudo, `?` no que é genuinamente opcional.',
      },
    ],
    quiz: [
      {
        id: 's08c04l06q1',
        type: 'single',
        prompt: 'Quando uma propriedade `init` pode ser atribuída?',
        options: [
          { id: 'a', text: 'No construtor e no inicializador de propriedades, e nunca depois', correct: true },
          { id: 'b', text: 'Somente no construtor' },
          { id: 'c', text: 'A qualquer momento, como `set`' },
          { id: 'd', text: 'Somente na declaração' },
        ],
        explanation:
          'É exatamente essa janela que faltava: uma propriedade só de leitura não aceita inicializador, e uma com `set` nunca fica estável.',
      },
      {
        id: 's08c04l06q2',
        type: 'single',
        prompt: 'O que `init` **não** protege?',
        options: [
          { id: 'a', text: 'O conteúdo de uma coleção referenciada pela propriedade', correct: true },
          { id: 'b', text: 'A atribuição da propriedade após a construção' },
          { id: 'c', text: 'A atribuição fora do construtor' },
          { id: 'd', text: 'A leitura da propriedade' },
        ],
        explanation:
          'A referência fica fixa, mas o objeto apontado continua mutável. Expor `IReadOnlyList<T>` em vez de `List<T>` fecha essa porta.',
      },
      {
        id: 's08c04l06q3',
        type: 'single',
        prompt: 'Como "modificar" um objeto com propriedades `init`?',
        options: [
          { id: 'a', text: 'Criando um novo — com `with` em `record`, ou um método de cópia em classes', correct: true },
          { id: 'b', text: 'Usando reflexão' },
          { id: 'c', text: 'Trocando `init` por `set` temporariamente' },
          { id: 'd', text: 'Não é possível de forma alguma' },
        ],
        explanation:
          'Essa é a proposta da imutabilidade: em vez de alterar o objeto existente, produzir um novo com as diferenças. `record` automatiza isso com `with`.',
      },
    ],
    challenge: {
      brief:
        'Modele uma reserva imutável: `required` no essencial, `init` em tudo, validação dentro do acessador e métodos de cópia para produzir variações.',
      requirements: [
        'A solução compila **sem nenhum aviso**.',
        'Todas as propriedades são `init`; nenhuma tem `set`.',
        '`Fim` valida no acessador e lança `ArgumentException` quando é menor que `Inicio`.',
        '`Hospedes` é exposta como `IReadOnlyList<string>` para que o conteúdo também seja imutável.',
        '`ComQuarto` e `ComHospedes` devolvem **novas** reservas, sem alterar a original.',
        '`Noites` é calculada a partir de `Inicio` e `Fim`.',
      ],
      nullable: 'enabled',
      starterCode: `using System;
using System.Collections.Generic;

class Reserva
{
    private readonly int fim;
    private readonly List<string> hospedes = new();

    // TODO: required + init
    public string Quarto { get; init; }
    public int Inicio { get; init; }

    // TODO: init com validacao — lanca ArgumentException se value < Inicio
    public int Fim
    {
        get => fim;
        init { }
    }

    public string? Observacao { get; init; }

    // TODO: exponha como IReadOnlyList<string>; o init recebe IEnumerable<string>
    public IReadOnlyList<string> Hospedes
    {
        get => hospedes;
        init { }
    }

    public int Noites => Fim - Inicio;

    // TODO: nova reserva com outro quarto, preservando o resto
    public Reserva ComQuarto(string quarto)
    {
        return this;
    }

    // TODO: nova reserva com outros hospedes
    public Reserva ComHospedes(IEnumerable<string> novos)
    {
        return this;
    }

    public override string ToString()
    {
        string obs = Observacao is null ? "" : $" [{Observacao}]";
        return $"{Quarto} {Inicio}-{Fim} ({Noites}n) {string.Join(",", Hospedes)}{obs}";
    }
}

class Program
{
    static void Main()
    {
        var original = new Reserva
        {
            Quarto = "101",
            Inicio = 10,
            Fim = 14,
            Hospedes = new[] { "Ana", "Bruno" },
            Observacao = "cama extra",
        };

        Console.WriteLine($"original: {original}");
        Console.WriteLine($"noites: {original.Noites}");

        var outroQuarto = original.ComQuarto("202");
        Console.WriteLine($"outro quarto: {outroQuarto}");
        Console.WriteLine($"original intacta: {original.Quarto}");

        var maisGente = original.ComHospedes(new[] { "Ana", "Bruno", "Carla" });
        Console.WriteLine($"mais gente: {maisGente}");
        Console.WriteLine($"original hospedes: {original.Hospedes.Count}");

        var semObservacao = new Reserva
        {
            Quarto = "303",
            Inicio = 1,
            Fim = 2,
            Hospedes = new[] { "Davi" },
        };

        Console.WriteLine($"sem obs: {semObservacao}");
        Console.WriteLine($"mesma referencia: {ReferenceEquals(original, outroQuarto)}");

        try
        {
            var invalida = new Reserva
            {
                Quarto = "404",
                Inicio = 20,
                Fim = 15,
                Hospedes = new string[0],
            };

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

class Reserva
{
    private readonly int fim;
    private readonly List<string> hospedes = new();

    public required string Quarto { get; init; }

    public required int Inicio { get; init; }

    public required int Fim
    {
        get => fim;
        init
        {
            if (value < Inicio)
            {
                throw new ArgumentException("fim antes do inicio");
            }

            fim = value;
        }
    }

    public string? Observacao { get; init; }

    public IReadOnlyList<string> Hospedes
    {
        get => hospedes;
        init => hospedes.AddRange(value);
    }

    public int Noites => Fim - Inicio;

    public Reserva ComQuarto(string quarto)
    {
        return new Reserva
        {
            Quarto = quarto,
            Inicio = Inicio,
            Fim = Fim,
            Hospedes = Hospedes,
            Observacao = Observacao,
        };
    }

    public Reserva ComHospedes(IEnumerable<string> novos)
    {
        return new Reserva
        {
            Quarto = Quarto,
            Inicio = Inicio,
            Fim = Fim,
            Hospedes = new List<string>(novos),
            Observacao = Observacao,
        };
    }

    public override string ToString()
    {
        string obs = Observacao is null ? "" : $" [{Observacao}]";
        return $"{Quarto} {Inicio}-{Fim} ({Noites}n) {string.Join(",", Hospedes)}{obs}";
    }
}

class Program
{
    static void Main()
    {
        var original = new Reserva
        {
            Quarto = "101",
            Inicio = 10,
            Fim = 14,
            Hospedes = new[] { "Ana", "Bruno" },
            Observacao = "cama extra",
        };

        Console.WriteLine($"original: {original}");
        Console.WriteLine($"noites: {original.Noites}");

        var outroQuarto = original.ComQuarto("202");
        Console.WriteLine($"outro quarto: {outroQuarto}");
        Console.WriteLine($"original intacta: {original.Quarto}");

        var maisGente = original.ComHospedes(new[] { "Ana", "Bruno", "Carla" });
        Console.WriteLine($"mais gente: {maisGente}");
        Console.WriteLine($"original hospedes: {original.Hospedes.Count}");

        var semObservacao = new Reserva
        {
            Quarto = "303",
            Inicio = 1,
            Fim = 2,
            Hospedes = new[] { "Davi" },
        };

        Console.WriteLine($"sem obs: {semObservacao}");
        Console.WriteLine($"mesma referencia: {ReferenceEquals(original, outroQuarto)}");

        try
        {
            var invalida = new Reserva
            {
                Quarto = "404",
                Inicio = 20,
                Fim = 15,
                Hospedes = new string[0],
            };

            Console.WriteLine($"nao deveria: {invalida}");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"erro: {ex.Message}");
        }
    }
}`,
      hints: [
        'A validação de `Fim` depende de `Inicio` já ter sido atribuído — por isso `Inicio` vem antes de `Fim` em todos os inicializadores.',
        '`init => hospedes.AddRange(value)` copia o conteúdo para a lista interna, de modo que quem passou o array não consegue alterá-la depois.',
        'Os métodos de cópia constroem um objeto novo repetindo cada propriedade. É verboso — e é exatamente o que `record` gera de graça com `with`.',
        'A reserva inválida lança dentro do inicializador, antes de a variável existir.',
      ],
      tests: [
        {
          name: 'Reserva imutável',
          expectedStdout:
            'original: 101 10-14 (4n) Ana,Bruno [cama extra]\nnoites: 4\n' +
            'outro quarto: 202 10-14 (4n) Ana,Bruno [cama extra]\noriginal intacta: 101\n' +
            'mais gente: 101 10-14 (4n) Ana,Bruno,Carla [cama extra]\noriginal hospedes: 2\n' +
            'sem obs: 303 1-2 (1n) Davi\nmesma referencia: False\n' +
            'erro: fim antes do inicio',
        },
      ],
    },
  },

  {
    id: 's08c04l07',
    title: 'Nullable de tipos de valor',
    objective: 'Distinguir `int?` de `string?` — dois recursos diferentes que compartilham a mesma sintaxe.',
    concept: [
      {
        kind: 'text',
        body:
          'O `?` significa **coisas diferentes** conforme o tipo. Em referências, ele é uma anotação para o compilador. Em tipos de valor, ele muda o tipo de verdade.',
      },
      {
        kind: 'table',
        headers: ['', '`string?`', '`int?`'],
        rows: [
          ['o que é', 'uma anotação sobre `string`', 'açúcar para `Nullable<int>`'],
          ['existe em execução?', 'não: é `string`', 'sim: é uma struct distinta'],
          ['desde quando', 'C# 8 (2019)', 'C# 2 (2005)'],
          ['ignorar avisa?', 'aviso', 'erro de compilação'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Essa é a diferença que mais confunde. `int?` sempre foi um tipo real e sempre teve verificação de verdade. `string?` é uma anotação nova, que o compilador respeita mas o runtime desconhece.',
      },
      {
        kind: 'code',
        code: `int? numero = null;

Console.WriteLine(numero.HasValue);            // False
Console.WriteLine(numero ?? -1);               // -1
Console.WriteLine(numero.GetValueOrDefault(99)); // 99

numero = 7;
Console.WriteLine(numero.Value);               // 7`,
        caption: '`HasValue`, `Value` e `GetValueOrDefault` são membros de `Nullable<T>` — não existem em `string?`.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Ler `.Value` de um `int?` vazio lança `InvalidOperationException`, não `NullReferenceException`. É um erro diferente, com mensagem diferente — e igualmente evitável com `??` ou `GetValueOrDefault`.',
      },
      {
        kind: 'text',
        body:
          'A aritmética com anuláveis segue a **lógica de três valores**: qualquer operação que envolva um nulo produz nulo.',
      },
      {
        kind: 'code',
        code: `int? a = 5;
int? b = null;

Console.WriteLine((a + b) == null);   // True
Console.WriteLine(a > b);             // False
Console.WriteLine(a < b);             // False`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`a > b` e `a < b` são **ambos falsos** quando um dos lados é nulo. É a mesma armadilha do `NaN`: negar uma comparação com anuláveis não dá o resultado que a intuição espera.',
      },
      {
        kind: 'text',
        body:
          'A igualdade, por outro lado, funciona como se espera: dois nulos são iguais, e um nulo nunca é igual a um valor.',
      },
      {
        kind: 'output',
        code: `(int?)null == (int?)null  ->  True
(int?)null == 0           ->  False
(int?)5 == 5              ->  True`,
      },
      {
        kind: 'text',
        body:
          'O uso mais comum de `int?` é representar **ausência de medida**, distinguindo-a de zero. São coisas diferentes, e confundi-las gera relatórios errados.',
      },
      {
        kind: 'compare',
        good: `int? nota = null;   // ainda nao avaliado
int? outra = 0;     // avaliado, tirou zero

// media so das notas existentes`,
        bad: `int nota = 0;   // nao avaliado? ou tirou zero?
// impossivel distinguir,
// e a media fica errada`,
        goodLabel: 'Ausência distinta de zero',
        badLabel: 'Zero como "sem valor"',
      },
      {
        kind: 'text',
        body:
          'Em genéricos, `T?` depende da restrição. Com `where T : struct` ele é `Nullable<T>` e ganha `HasValue`; com `where T : class` é apenas anotação. Sem restrição, o compilador não pode assumir nenhum dos dois.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          '`??` funciona igual nos dois mundos e é quase sempre a forma mais curta: `numero ?? -1` para valores, `texto ?? "padrao"` para referências. Prefira-o a `HasValue` seguido de `Value`.',
      },
    ],
    quiz: [
      {
        id: 's08c04l07q1',
        type: 'single',
        prompt: 'Qual a diferença fundamental entre `int?` e `string?`?',
        options: [
          { id: 'a', text: '`int?` é um tipo real (`Nullable<int>`); `string?` é apenas uma anotação', correct: true },
          { id: 'b', text: 'Nenhuma: os dois são anotações' },
          { id: 'c', text: '`string?` existe em execução e `int?` não' },
          { id: 'd', text: '`int?` só funciona com o contexto nullable ligado' },
        ],
        explanation:
          '`int?` existe desde 2005 e é uma struct com `HasValue` e `Value`. `string?` foi introduzido em 2019 e some na compilação — o runtime só vê `string`.',
      },
      {
        id: 's08c04l07q2',
        type: 'single',
        prompt: 'Qual exceção `((int?)null).Value` lança?',
        options: [
          { id: 'a', text: '`InvalidOperationException`', correct: true },
          { id: 'b', text: '`NullReferenceException`' },
          { id: 'c', text: '`ArgumentNullException`' },
          { id: 'd', text: 'Nenhuma: devolve 0' },
        ],
        explanation:
          '`Nullable<T>` é uma struct: não há referência para desreferenciar. A operação é inválida para o estado atual, daí `InvalidOperationException`.',
      },
      {
        id: 's08c04l07q3',
        type: 'single',
        prompt: 'Com `int? a = 5;` e `int? b = null;`, quanto valem `a > b` e `a < b`?',
        options: [
          { id: 'a', text: 'Ambos `false`', correct: true },
          { id: 'b', text: '`a > b` é `true`' },
          { id: 'c', text: '`a < b` é `true`' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          'Comparações de ordem com um operando nulo são sempre falsas — como acontece com `NaN`. Negar uma delas não produz a outra.',
      },
    ],
    challenge: {
      brief:
        'Processe leituras de sensores em que a ausência de medida é diferente de zero: calcule média, extremos e cobertura, tratando `null` corretamente em cada operação.',
      requirements: [
        'A solução compila **sem nenhum aviso**.',
        'As leituras são `double?`; `null` significa "sensor sem dado", diferente de `0`.',
        '`Media` ignora as ausentes e devolve `null` quando não há nenhuma leitura.',
        '`Maior` e `Menor` também ignoram ausentes e devolvem `double?`.',
        '`Cobertura` devolve a porcentagem de leituras presentes, arredondada a uma casa.',
        '`Variacao` devolve `null` se qualquer um dos dois extremos for ausente.',
        'Nenhum uso de `.Value` sem verificar antes; prefira `??` e `HasValue`.',
      ],
      nullable: 'enabled',
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // TODO: media das leituras presentes; null se nao houver nenhuma
    static double? Media(double?[] leituras)
    {
        return null;
    }

    static double? Maior(double?[] leituras)
    {
        // TODO
        return null;
    }

    static double? Menor(double?[] leituras)
    {
        // TODO
        return null;
    }

    // TODO: porcentagem de leituras presentes, uma casa decimal
    static double Cobertura(double?[] leituras)
    {
        return 0;
    }

    // TODO: diferenca entre maior e menor; null se algum for ausente
    static double? Variacao(double?[] leituras)
    {
        return null;
    }

    static string Formatar(double? valor)
    {
        return valor.HasValue ? valor.Value.ToString("0.0") : "ausente";
    }

    static void Main()
    {
        double?[] completo = { 21.5, 22.0, 20.5, 23.0 };
        double?[] parcial = { 21.5, null, 20.5, null };
        double?[] zerado = { 0.0, 0.0, null };
        double?[] vazio = { null, null };
        double?[] nenhum = new double?[0];

        var conjuntos = new Dictionary<string, double?[]>
        {
            ["completo"] = completo,
            ["parcial"] = parcial,
            ["zerado"] = zerado,
            ["vazio"] = vazio,
            ["nenhum"] = nenhum,
        };

        foreach (var (nome, leituras) in conjuntos)
        {
            Console.WriteLine(
                $"{nome}: media={Formatar(Media(leituras))} " +
                $"maior={Formatar(Maior(leituras))} " +
                $"menor={Formatar(Menor(leituras))} " +
                $"cobertura={Cobertura(leituras)}% " +
                $"variacao={Formatar(Variacao(leituras))}");
        }

        double? a = 5;
        double? b = null;

        Console.WriteLine($"soma com nulo: {(a + b) == null}");
        Console.WriteLine($"maior que: {a > b}");
        Console.WriteLine($"menor que: {a < b}");
        Console.WriteLine($"nulos iguais: {b == null}");
        Console.WriteLine($"coalescencia: {b ?? -1}");
        Console.WriteLine($"padrao: {((double?)null).GetValueOrDefault(99)}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static double? Media(double?[] leituras)
    {
        double soma = 0;
        int quantidade = 0;

        foreach (double? leitura in leituras)
        {
            if (leitura.HasValue)
            {
                soma += leitura.Value;
                quantidade++;
            }
        }

        return quantidade == 0 ? null : soma / quantidade;
    }

    static double? Maior(double?[] leituras)
    {
        double? melhor = null;

        foreach (double? leitura in leituras)
        {
            if (!leitura.HasValue)
            {
                continue;
            }

            if (!melhor.HasValue || leitura.Value > melhor.Value)
            {
                melhor = leitura;
            }
        }

        return melhor;
    }

    static double? Menor(double?[] leituras)
    {
        double? melhor = null;

        foreach (double? leitura in leituras)
        {
            if (!leitura.HasValue)
            {
                continue;
            }

            if (!melhor.HasValue || leitura.Value < melhor.Value)
            {
                melhor = leitura;
            }
        }

        return melhor;
    }

    static double Cobertura(double?[] leituras)
    {
        if (leituras.Length == 0)
        {
            return 0;
        }

        int presentes = 0;

        foreach (double? leitura in leituras)
        {
            if (leitura.HasValue)
            {
                presentes++;
            }
        }

        return Math.Round(presentes * 100.0 / leituras.Length, 1);
    }

    static double? Variacao(double?[] leituras)
    {
        double? maior = Maior(leituras);
        double? menor = Menor(leituras);

        if (!maior.HasValue || !menor.HasValue)
        {
            return null;
        }

        return maior.Value - menor.Value;
    }

    static string Formatar(double? valor)
    {
        return valor.HasValue ? valor.Value.ToString("0.0") : "ausente";
    }

    static void Main()
    {
        double?[] completo = { 21.5, 22.0, 20.5, 23.0 };
        double?[] parcial = { 21.5, null, 20.5, null };
        double?[] zerado = { 0.0, 0.0, null };
        double?[] vazio = { null, null };
        double?[] nenhum = new double?[0];

        var conjuntos = new Dictionary<string, double?[]>
        {
            ["completo"] = completo,
            ["parcial"] = parcial,
            ["zerado"] = zerado,
            ["vazio"] = vazio,
            ["nenhum"] = nenhum,
        };

        foreach (var (nome, leituras) in conjuntos)
        {
            Console.WriteLine(
                $"{nome}: media={Formatar(Media(leituras))} " +
                $"maior={Formatar(Maior(leituras))} " +
                $"menor={Formatar(Menor(leituras))} " +
                $"cobertura={Cobertura(leituras)}% " +
                $"variacao={Formatar(Variacao(leituras))}");
        }

        double? a = 5;
        double? b = null;

        Console.WriteLine($"soma com nulo: {(a + b) == null}");
        Console.WriteLine($"maior que: {a > b}");
        Console.WriteLine($"menor que: {a < b}");
        Console.WriteLine($"nulos iguais: {b == null}");
        Console.WriteLine($"coalescencia: {b ?? -1}");
        Console.WriteLine($"padrao: {((double?)null).GetValueOrDefault(99)}");
    }
}`,
      hints: [
        'O conjunto "zerado" tem leituras `0.0`, que **são** medidas válidas: a média é 0, não "ausente".',
        'Em `Maior`, a condição `!melhor.HasValue || leitura.Value > melhor.Value` trata a primeira leitura e as seguintes com o mesmo código.',
        '`Cobertura` de um array vazio precisa de guarda: sem ela, a divisão por zero produziria `NaN`.',
        '`Variacao` de um único valor é 0 — maior e menor são a mesma leitura.',
      ],
      tests: [
        {
          name: 'Leituras de sensores',
          expectedStdout:
            'completo: media=21.8 maior=23.0 menor=20.5 cobertura=100% variacao=2.5\n' +
            'parcial: media=21.0 maior=21.5 menor=20.5 cobertura=50% variacao=1.0\n' +
            'zerado: media=0.0 maior=0.0 menor=0.0 cobertura=66.7% variacao=0.0\n' +
            'vazio: media=ausente maior=ausente menor=ausente cobertura=0% variacao=ausente\n' +
            'nenhum: media=ausente maior=ausente menor=ausente cobertura=0% variacao=ausente\n' +
            'soma com nulo: True\nmaior que: False\nmenor que: False\n' +
            'nulos iguais: True\ncoalescencia: -1\npadrao: 99',
        },
      ],
    },
  },

  {
    id: 's08c04l08',
    title: 'Padrões de tratamento de null',
    objective: 'Escolher entre coalescência, acesso condicional, guarda e objeto nulo conforme a situação.',
    concept: [
      {
        kind: 'text',
        body:
          'Saber que um valor pode ser nulo é metade do trabalho. A outra metade é decidir **o que fazer** com essa possibilidade — e existem quatro respostas padrão, cada uma com seu lugar.',
      },
      {
        kind: 'table',
        headers: ['Padrão', 'Sintaxe', 'Use quando'],
        rows: [
          ['coalescência', '`x ?? padrao`', 'existe um valor de substituição óbvio'],
          ['acesso condicional', '`x?.Membro`', 'a operação inteira faz sentido ser pulada'],
          ['guarda', '`if (x is null) return;`', 'o método não tem o que fazer sem o valor'],
          ['exceção', '`?? throw new ...`', 'a ausência é violação de contrato'],
        ],
      },
      {
        kind: 'text',
        body:
          'A **coalescência** é a mais simples: devolve o valor da direita quando o da esquerda é nulo. Ela encadeia, e a avaliação é preguiçosa — a direita só roda se necessário.',
      },
      {
        kind: 'code',
        code: `string nome = apelido ?? nomeCompleto ?? "anonimo";

// versao de atribuicao
config ??= CarregarPadrao();`,
        caption: '`??=` só atribui quando o valor atual é nulo, e estreita o tipo depois disso.',
      },
      {
        kind: 'text',
        body:
          'O **acesso condicional** `?.` interrompe a expressão inteira quando encontra nulo, devolvendo nulo. Ele encadeia sem exigir verificações intermediárias.',
      },
      {
        kind: 'compare',
        good: `int? tamanho = pedido?.Cliente?.Nome?.Length;`,
        bad: `int? tamanho = null;

if (pedido != null && pedido.Cliente != null
    && pedido.Cliente.Nome != null)
{
    tamanho = pedido.Cliente.Nome.Length;
}`,
        goodLabel: 'Acesso condicional encadeado',
        badLabel: 'Verificação manual em cada nível',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`?.` sobre um tipo de valor **promove o resultado a anulável**. `texto?.Length` é `int?`, não `int` — por isso a combinação `?.Length ?? 0` é tão comum.',
      },
      {
        kind: 'text',
        body:
          'A **cláusula de guarda** trata a ausência no início e sai. É a que produz o código mais plano, e a que aproveita melhor a análise de fluxo.',
      },
      {
        kind: 'code',
        code: `static string Processar(Pedido? pedido)
{
    if (pedido is null)
    {
        return "pedido ausente";
    }

    // resto do metodo sem verificacoes
    return $"pedido de {pedido.Cliente}";
}`,
      },
      {
        kind: 'text',
        body:
          'A **exceção** é para quando a ausência não deveria ser possível. O `??` com `throw` deixa isso numa linha só, e a mensagem diz o que faltou.',
      },
      {
        kind: 'code',
        code: `public Servico(Repositorio? repositorio)
{
    this.repositorio = repositorio
        ?? throw new ArgumentNullException(nameof(repositorio));
}`,
        caption: 'Falha na construção, não no primeiro uso — o erro aparece perto da causa.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Existe um quinto padrão que elimina a decisão: o **objeto nulo**. Em vez de devolver `null`, devolva uma instância que não faz nada — `Logger.Nenhum`, `List` vazia, `Cliente.Anonimo`. Quem consome deixa de precisar verificar.',
      },
      {
        kind: 'compare',
        good: `static IReadOnlyList<Item> Itens(int id)
{
    return achou ? lista : Array.Empty<Item>();
}

foreach (var i in Itens(9)) { ... }`,
        bad: `static List<Item>? Itens(int id)
{
    return achou ? lista : null;
}

var r = Itens(9);
if (r != null)
    foreach (var i in r) { ... }`,
        goodLabel: 'Coleção vazia',
        badLabel: 'Coleção nula',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A regra mais valiosa deste capítulo: **nunca devolva uma coleção nula**. Devolva vazia. Um `foreach` sobre vazio não faz nada e não exige verificação nenhuma — e nenhum consumidor precisa lembrar de checar.',
      },
    ],
    quiz: [
      {
        id: 's08c04l08q1',
        type: 'single',
        prompt: 'Qual o tipo de `texto?.Length`, sendo `texto` uma `string?`?',
        options: [
          { id: 'a', text: '`int?`', correct: true },
          { id: 'b', text: '`int`' },
          { id: 'c', text: '`string?`' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          'O `?.` pode produzir nulo, então o resultado precisa ser capaz de representá-lo. É por isso que `?.Length ?? 0` aparece o tempo todo.',
      },
      {
        id: 's08c04l08q2',
        type: 'single',
        prompt: 'Por que devolver uma coleção vazia é melhor que devolver `null`?',
        options: [
          { id: 'a', text: 'Quem consome pode iterar direto, sem verificação nenhuma', correct: true },
          { id: 'b', text: 'Porque a coleção vazia ocupa menos memória' },
          { id: 'c', text: 'Porque `null` não pode ser devolvido de um método' },
          { id: 'd', text: 'Porque `foreach` sobre `null` devolve zero itens' },
        ],
        explanation:
          '`foreach` sobre `null` lança `NullReferenceException`. A coleção vazia elimina a verificação em todos os consumidores, presentes e futuros.',
      },
      {
        id: 's08c04l08q3',
        type: 'single',
        prompt: 'Quando usar `?? throw new ArgumentNullException(...)`?',
        options: [
          { id: 'a', text: 'Quando a ausência viola o contrato e o objeto não pode funcionar sem o valor', correct: true },
          { id: 'b', text: 'Sempre que houver um valor anulável' },
          { id: 'c', text: 'Quando existe um valor padrão razoável' },
          { id: 'd', text: 'Quando a operação pode ser pulada' },
        ],
        explanation:
          'Se existe padrão razoável, use `??`. Se a operação pode ser pulada, use `?.`. A exceção é para o caso em que continuar seria pior do que falhar.',
      },
    ],
    challenge: {
      brief:
        'Escreva um módulo de notificações que aplica os quatro padrões no lugar certo, mais o padrão de objeto nulo para coleções e para um destinatário ausente.',
      requirements: [
        'A solução compila **sem nenhum aviso**.',
        '`Assunto` usa coalescência encadeada com três alternativas.',
        '`TamanhoDoNome` usa acesso condicional encadeado com `?? 0`.',
        '`Enviar` usa cláusula de guarda no início.',
        'O construtor de `Servico` usa `?? throw new ArgumentNullException(nameof(...))`.',
        '`Destinatarios` **nunca** devolve nulo: devolve `Array.Empty<string>()` quando não há nenhum.',
        '`Contato.Anonimo` é o objeto nulo, usado no lugar de um contato ausente.',
      ],
      nullable: 'enabled',
      starterCode: `using System;
using System.Collections.Generic;

class Contato
{
    public required string Email { get; init; }
    public string? Nome { get; init; }
    public string? Apelido { get; init; }

    // TODO: objeto nulo — um contato que representa "ninguem"
    public static Contato Anonimo { get; } = null!;
}

class Repositorio
{
    private readonly Dictionary<string, List<string>> listas = new()
    {
        ["equipe"] = new List<string> { "ana@x.dev", "bruno@x.dev" },
        ["vazia"] = new List<string>(),
    };

    // TODO: nunca devolva nulo
    public IReadOnlyList<string> Destinatarios(string lista)
    {
        return null;
    }
}

class Servico
{
    private readonly Repositorio repositorio;

    // TODO: ?? throw new ArgumentNullException(nameof(repositorio))
    public Servico(Repositorio? repositorio)
    {
        this.repositorio = repositorio;
    }

    // TODO: coalescencia encadeada — apelido, nome, email
    public string Assunto(Contato? contato)
    {
        return "";
    }

    // TODO: acesso condicional encadeado com ?? 0
    public int TamanhoDoNome(Contato? contato)
    {
        return 0;
    }

    // TODO: guarda no inicio
    public string Enviar(Contato? contato, string lista)
    {
        return "";
    }
}

class Program
{
    static void Main()
    {
        var servico = new Servico(new Repositorio());

        var completo = new Contato { Email = "ana@x.dev", Nome = "Ana Souza", Apelido = "aninha" };
        var semApelido = new Contato { Email = "bruno@x.dev", Nome = "Bruno" };
        var soEmail = new Contato { Email = "carla@x.dev" };

        Console.WriteLine($"assunto completo: {servico.Assunto(completo)}");
        Console.WriteLine($"assunto sem apelido: {servico.Assunto(semApelido)}");
        Console.WriteLine($"assunto so email: {servico.Assunto(soEmail)}");
        Console.WriteLine($"assunto nulo: {servico.Assunto(null)}");

        Console.WriteLine($"nome completo: {servico.TamanhoDoNome(completo)}");
        Console.WriteLine($"nome ausente: {servico.TamanhoDoNome(soEmail)}");
        Console.WriteLine($"contato nulo: {servico.TamanhoDoNome(null)}");

        Console.WriteLine($"enviar: {servico.Enviar(completo, "equipe")}");
        Console.WriteLine($"enviar lista vazia: {servico.Enviar(completo, "vazia")}");
        Console.WriteLine($"enviar lista inexistente: {servico.Enviar(completo, "nada")}");
        Console.WriteLine($"enviar sem contato: {servico.Enviar(null, "equipe")}");

        Console.WriteLine($"anonimo email: {Contato.Anonimo.Email}");
        Console.WriteLine($"anonimo assunto: {servico.Assunto(Contato.Anonimo)}");

        var repo = new Repositorio();
        int total = 0;

        foreach (string d in repo.Destinatarios("nada"))
        {
            total++;
        }

        Console.WriteLine($"iterou sem verificar: {total}");

        try
        {
            new Servico(null);
        }
        catch (ArgumentNullException ex)
        {
            Console.WriteLine($"erro: {ex.ParamName}");
        }
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Contato
{
    public required string Email { get; init; }
    public string? Nome { get; init; }
    public string? Apelido { get; init; }

    public static Contato Anonimo { get; } = new Contato { Email = "sem-email" };
}

class Repositorio
{
    private readonly Dictionary<string, List<string>> listas = new()
    {
        ["equipe"] = new List<string> { "ana@x.dev", "bruno@x.dev" },
        ["vazia"] = new List<string>(),
    };

    public IReadOnlyList<string> Destinatarios(string lista)
    {
        return listas.TryGetValue(lista, out List<string>? encontrada)
            ? encontrada
            : Array.Empty<string>();
    }
}

class Servico
{
    private readonly Repositorio repositorio;

    public Servico(Repositorio? repositorio)
    {
        this.repositorio = repositorio ?? throw new ArgumentNullException(nameof(repositorio));
    }

    public string Assunto(Contato? contato)
    {
        if (contato is null)
        {
            return "destinatario desconhecido";
        }

        return contato.Apelido ?? contato.Nome ?? contato.Email;
    }

    public int TamanhoDoNome(Contato? contato)
    {
        return contato?.Nome?.Length ?? 0;
    }

    public string Enviar(Contato? contato, string lista)
    {
        if (contato is null)
        {
            return "sem destinatario";
        }

        IReadOnlyList<string> destinos = repositorio.Destinatarios(lista);

        if (destinos.Count == 0)
        {
            return $"nada a enviar para {Assunto(contato)}";
        }

        return $"enviado para {Assunto(contato)} e mais {destinos.Count}";
    }
}

class Program
{
    static void Main()
    {
        var servico = new Servico(new Repositorio());

        var completo = new Contato { Email = "ana@x.dev", Nome = "Ana Souza", Apelido = "aninha" };
        var semApelido = new Contato { Email = "bruno@x.dev", Nome = "Bruno" };
        var soEmail = new Contato { Email = "carla@x.dev" };

        Console.WriteLine($"assunto completo: {servico.Assunto(completo)}");
        Console.WriteLine($"assunto sem apelido: {servico.Assunto(semApelido)}");
        Console.WriteLine($"assunto so email: {servico.Assunto(soEmail)}");
        Console.WriteLine($"assunto nulo: {servico.Assunto(null)}");

        Console.WriteLine($"nome completo: {servico.TamanhoDoNome(completo)}");
        Console.WriteLine($"nome ausente: {servico.TamanhoDoNome(soEmail)}");
        Console.WriteLine($"contato nulo: {servico.TamanhoDoNome(null)}");

        Console.WriteLine($"enviar: {servico.Enviar(completo, "equipe")}");
        Console.WriteLine($"enviar lista vazia: {servico.Enviar(completo, "vazia")}");
        Console.WriteLine($"enviar lista inexistente: {servico.Enviar(completo, "nada")}");
        Console.WriteLine($"enviar sem contato: {servico.Enviar(null, "equipe")}");

        Console.WriteLine($"anonimo email: {Contato.Anonimo.Email}");
        Console.WriteLine($"anonimo assunto: {servico.Assunto(Contato.Anonimo)}");

        var repo = new Repositorio();
        int total = 0;

        foreach (string d in repo.Destinatarios("nada"))
        {
            total++;
        }

        Console.WriteLine($"iterou sem verificar: {total}");

        try
        {
            new Servico(null);
        }
        catch (ArgumentNullException ex)
        {
            Console.WriteLine($"erro: {ex.ParamName}");
        }
    }
}`,
      hints: [
        '`Array.Empty<string>()` devolve uma instância compartilhada — não aloca nada a cada chamada.',
        '`contato?.Nome?.Length ?? 0` tem dois `?.` porque há dois níveis que podem ser nulos, e um `??` para converter o `int?` final em `int`.',
        '`Contato.Anonimo` precisa de `required Email` preenchido: o objeto nulo é um objeto de verdade, só que inofensivo.',
        '`nameof(repositorio)` na exceção faz `ex.ParamName` devolver exatamente o nome do parâmetro.',
      ],
      tests: [
        {
          name: 'Padrões de tratamento',
          expectedStdout:
            'assunto completo: aninha\nassunto sem apelido: Bruno\nassunto so email: carla@x.dev\n' +
            'assunto nulo: destinatario desconhecido\n' +
            'nome completo: 9\nnome ausente: 0\ncontato nulo: 0\n' +
            'enviar: enviado para aninha e mais 2\nenviar lista vazia: nada a enviar para aninha\n' +
            'enviar lista inexistente: nada a enviar para aninha\nenviar sem contato: sem destinatario\n' +
            'anonimo email: sem-email\nanonimo assunto: sem-email\n' +
            'iterou sem verificar: 0\n' +
            'erro: repositorio',
        },
      ],
    },
  },

  {
    id: 's08c04l09',
    title: 'Prática: eliminando nulls de um módulo',
    objective: 'Migrar um módulo legado para o contexto nullable, resolvendo cada aviso pela causa e não pelo sintoma.',
    concept: [
      {
        kind: 'text',
        body:
          'Ligar o contexto num módulo existente produz uma lista de avisos. A tentação é silenciá-los; o trabalho de verdade é usar cada um como uma pergunta sobre o design.',
      },
      {
        kind: 'table',
        headers: ['Aviso', 'A pergunta que ele faz'],
        rows: [
          ['CS8618 num campo', 'esse dado é obrigatório ou opcional?'],
          ['CS8603 num retorno', 'esse método pode mesmo falhar em encontrar?'],
          ['CS8602 num acesso', 'quem deveria ter garantido que existe?'],
          ['CS8604 num argumento', 'esse parâmetro aceita ausência?'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Os avisos são um **mapa das suposições não ditas** do módulo. Cada um marca um lugar onde alguém, em algum momento, assumiu algo sem escrever.',
      },
      {
        kind: 'text',
        body: 'A migração tem uma ordem que evita retrabalho, e ela é de fora para dentro:',
      },
      {
        kind: 'table',
        headers: ['Passo', 'O quê'],
        rows: [
          ['1', 'anotar os **retornos** públicos: é o que os consumidores precisam saber'],
          ['2', 'decidir os **campos**: `required`, valor padrão, ou `?`'],
          ['3', 'anotar os **parâmetros**: quem aceita ausência?'],
          ['4', 'trocar coleções nulas por vazias'],
          ['5', 'resolver os avisos restantes com guarda ou coalescência'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Resolva os avisos **de cima para baixo** no arquivo. Como desreferenciar estreita, corrigir um aviso pode revelar outros que estavam escondidos por uma suposição otimista do compilador.',
      },
      {
        kind: 'text',
        body:
          'A pergunta que mais muda o resultado é a do passo 2. As três respostas produzem módulos bem diferentes:',
      },
      {
        kind: 'compare',
        good: `// o dado e essencial
public required string Nome { get; init; }

// a ausencia e um estado real
public string? Apelido { get; init; }

// existe sempre, com padrao
public int Tentativas { get; init; } = 3;`,
        bad: `// tudo anulavel "por seguranca"
public string? Nome { get; set; }
public string? Apelido { get; set; }
public int? Tentativas { get; set; }
// todo consumidor verifica tudo`,
        goodLabel: 'Cada campo declara sua natureza',
        badLabel: 'Anulável por omissão',
      },
      {
        kind: 'text',
        body:
          'O passo 4 costuma ser o de maior retorno. Trocar `List<T>?` por `IReadOnlyList<T>` sempre preenchida elimina verificações em todos os pontos de uso de uma vez.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Ao terminar, conte os `!` que sobraram. Cada um deve ter um comentário explicando a garantia. Se não tiver, aquele aviso não foi resolvido — foi escondido.',
      },
      {
        kind: 'text',
        body:
          'O resultado de uma boa migração não é "os avisos sumiram". É que o módulo passou a **dizer** o que antes só estava implícito, e os consumidores passaram a ser cobrados pelo compilador em vez de pelo usuário final.',
      },
    ],
    quiz: [
      {
        id: 's08c04l09q1',
        type: 'single',
        prompt: 'Por que anotar os retornos públicos antes dos campos privados?',
        options: [
          { id: 'a', text: 'São eles que os consumidores precisam conhecer para tratar a ausência', correct: true },
          { id: 'b', text: 'Porque campos privados não geram avisos' },
          { id: 'c', text: 'Porque o compilador exige essa ordem' },
          { id: 'd', text: 'Porque retornos são mais fáceis de anotar' },
        ],
        explanation:
          'A anotação de retorno é a informação que atravessa a fronteira do módulo. Campos privados só afetam quem está dentro.',
      },
      {
        id: 's08c04l09q2',
        type: 'single',
        prompt: 'Por que resolver os avisos de cima para baixo no arquivo?',
        options: [
          { id: 'a', text: 'Desreferenciar estreita, então corrigir um aviso pode revelar outros escondidos', correct: true },
          { id: 'b', text: 'Porque o compilador só reporta o primeiro aviso' },
          { id: 'c', text: 'Por convenção de estilo' },
          { id: 'd', text: 'Porque avisos de baixo dependem de avisos de cima terem sido ignorados' },
        ],
        explanation:
          'Depois de um `x.Length` que avisa, o compilador assume que `x` não é nulo. Corrigir aquela linha desfaz a suposição e pode fazer surgir avisos posteriores.',
      },
      {
        id: 's08c04l09q3',
        type: 'single',
        prompt: 'Qual mudança elimina mais verificações de nulo de uma vez?',
        options: [
          { id: 'a', text: 'Trocar coleções nulas por coleções vazias sempre preenchidas', correct: true },
          { id: 'b', text: 'Anotar todos os campos com `?`' },
          { id: 'c', text: 'Adicionar `!` nos pontos de uso' },
          { id: 'd', text: 'Trocar `class` por `record`' },
        ],
        explanation:
          'Cada consumidor de uma coleção que podia ser nula precisava verificar. Garantir vazia em vez de nula remove a verificação de todos eles simultaneamente.',
      },
    ],
    challenge: {
      brief:
        'Migre um módulo de carrinho de compras para o contexto nullable: decida a natureza de cada campo, anote os retornos, elimine coleções nulas e resolva todos os avisos pela causa.',
      requirements: [
        'A solução compila **sem nenhum aviso**.',
        'Nenhum uso do operador `!` — todos os avisos devem ser resolvidos pela causa.',
        '`Codigo` e `Nome` de `Item` são `required`; `Observacao` é opcional.',
        '`BuscarItem` pode não encontrar e anota isso no retorno.',
        '`Itens` e `ItensPorCategoria` **nunca** devolvem nulo.',
        '`Cupom` é opcional e o desconto é 0 quando ausente.',
        '`ResumoCliente` aceita um cliente possivelmente nulo e devolve texto sempre.',
      ],
      nullable: 'enabled',
      starterCode: `using System;
using System.Collections.Generic;

class Item
{
    // TODO: decida required / opcional / padrao
    public string Codigo { get; init; }
    public string Nome { get; init; }
    public string Categoria { get; init; }
    public decimal Preco { get; init; }
    public int Quantidade { get; init; }
    public string Observacao { get; init; }

    public decimal Subtotal => Preco * Quantidade;
}

class Cliente
{
    public required string Nome { get; init; }
    public string? Email { get; init; }
}

class Carrinho
{
    private readonly List<Item> itens = new();

    public Cliente? Cliente { get; init; }

    // TODO: opcional
    public string Cupom { get; init; }

    public void Adicionar(Item item)
    {
        itens.Add(item);
    }

    // TODO: nunca devolve nulo
    public IReadOnlyList<Item> Itens()
    {
        return null;
    }

    // TODO: pode nao encontrar
    public Item BuscarItem(string codigo)
    {
        foreach (Item i in itens)
        {
            if (i.Codigo == codigo)
            {
                return i;
            }
        }

        return null;
    }

    // TODO: nunca devolve nulo — lista vazia quando a categoria nao existe
    public IReadOnlyList<Item> ItensPorCategoria(string categoria)
    {
        return null;
    }

    // TODO: 10% quando o cupom for "DEZ", 0 caso contrario
    public decimal Desconto()
    {
        return 0;
    }

    public decimal Total()
    {
        decimal soma = 0;

        foreach (Item i in itens)
        {
            soma += i.Subtotal;
        }

        return soma - Desconto() * soma;
    }

    // TODO: aceita cliente possivelmente nulo
    public static string ResumoCliente(Cliente cliente)
    {
        return "";
    }
}

class Program
{
    static void Main()
    {
        var carrinho = new Carrinho
        {
            Cliente = new Cliente { Nome = "Ana", Email = "ana@x.dev" },
            Cupom = "DEZ",
        };

        carrinho.Adicionar(new Item { Codigo = "A1", Nome = "Cafe", Categoria = "bebida", Preco = 20m, Quantidade = 2 });
        carrinho.Adicionar(new Item { Codigo = "B2", Nome = "Cha", Categoria = "bebida", Preco = 15m, Quantidade = 1, Observacao = "sem acucar" });
        carrinho.Adicionar(new Item { Codigo = "C3", Nome = "Bolo", Categoria = "doce", Preco = 30m, Quantidade = 1 });

        Console.WriteLine($"itens: {carrinho.Itens().Count}");
        Console.WriteLine($"bebidas: {carrinho.ItensPorCategoria("bebida").Count}");
        Console.WriteLine($"salgados: {carrinho.ItensPorCategoria("salgado").Count}");

        Console.WriteLine($"busca A1: {carrinho.BuscarItem("A1")?.Nome}");
        Console.WriteLine($"busca Z9 nula: {carrinho.BuscarItem("Z9") == null}");

        Console.WriteLine($"observacao B2: {carrinho.BuscarItem("B2")?.Observacao ?? "sem observacao"}");
        Console.WriteLine($"observacao A1: {carrinho.BuscarItem("A1")?.Observacao ?? "sem observacao"}");

        Console.WriteLine($"desconto: {carrinho.Desconto()}");
        Console.WriteLine($"total: {carrinho.Total()}");

        var semCupom = new Carrinho();
        semCupom.Adicionar(new Item { Codigo = "D4", Nome = "Suco", Categoria = "bebida", Preco = 10m, Quantidade = 1 });

        Console.WriteLine($"sem cupom desconto: {semCupom.Desconto()}");
        Console.WriteLine($"sem cupom total: {semCupom.Total()}");

        Console.WriteLine($"resumo: {Carrinho.ResumoCliente(carrinho.Cliente)}");
        Console.WriteLine($"resumo sem cliente: {Carrinho.ResumoCliente(semCupom.Cliente)}");
        Console.WriteLine($"resumo sem email: {Carrinho.ResumoCliente(new Cliente { Nome = "Bruno" })}");

        int contados = 0;

        foreach (Item i in new Carrinho().Itens())
        {
            contados++;
        }

        Console.WriteLine($"carrinho vazio iterou: {contados}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Item
{
    public required string Codigo { get; init; }
    public required string Nome { get; init; }
    public required string Categoria { get; init; }
    public decimal Preco { get; init; }
    public int Quantidade { get; init; } = 1;
    public string? Observacao { get; init; }

    public decimal Subtotal => Preco * Quantidade;
}

class Cliente
{
    public required string Nome { get; init; }
    public string? Email { get; init; }
}

class Carrinho
{
    private readonly List<Item> itens = new();

    public Cliente? Cliente { get; init; }

    public string? Cupom { get; init; }

    public void Adicionar(Item item)
    {
        itens.Add(item);
    }

    public IReadOnlyList<Item> Itens()
    {
        return itens;
    }

    public Item? BuscarItem(string codigo)
    {
        foreach (Item i in itens)
        {
            if (i.Codigo == codigo)
            {
                return i;
            }
        }

        return null;
    }

    public IReadOnlyList<Item> ItensPorCategoria(string categoria)
    {
        var encontrados = new List<Item>();

        foreach (Item i in itens)
        {
            if (i.Categoria == categoria)
            {
                encontrados.Add(i);
            }
        }

        return encontrados;
    }

    public decimal Desconto()
    {
        return Cupom == "DEZ" ? 0.1m : 0m;
    }

    public decimal Total()
    {
        decimal soma = 0;

        foreach (Item i in itens)
        {
            soma += i.Subtotal;
        }

        return soma - Desconto() * soma;
    }

    public static string ResumoCliente(Cliente? cliente)
    {
        if (cliente is null)
        {
            return "sem cliente";
        }

        return $"{cliente.Nome} <{cliente.Email ?? "sem email"}>";
    }
}

class Program
{
    static void Main()
    {
        var carrinho = new Carrinho
        {
            Cliente = new Cliente { Nome = "Ana", Email = "ana@x.dev" },
            Cupom = "DEZ",
        };

        carrinho.Adicionar(new Item { Codigo = "A1", Nome = "Cafe", Categoria = "bebida", Preco = 20m, Quantidade = 2 });
        carrinho.Adicionar(new Item { Codigo = "B2", Nome = "Cha", Categoria = "bebida", Preco = 15m, Quantidade = 1, Observacao = "sem acucar" });
        carrinho.Adicionar(new Item { Codigo = "C3", Nome = "Bolo", Categoria = "doce", Preco = 30m, Quantidade = 1 });

        Console.WriteLine($"itens: {carrinho.Itens().Count}");
        Console.WriteLine($"bebidas: {carrinho.ItensPorCategoria("bebida").Count}");
        Console.WriteLine($"salgados: {carrinho.ItensPorCategoria("salgado").Count}");

        Console.WriteLine($"busca A1: {carrinho.BuscarItem("A1")?.Nome}");
        Console.WriteLine($"busca Z9 nula: {carrinho.BuscarItem("Z9") == null}");

        Console.WriteLine($"observacao B2: {carrinho.BuscarItem("B2")?.Observacao ?? "sem observacao"}");
        Console.WriteLine($"observacao A1: {carrinho.BuscarItem("A1")?.Observacao ?? "sem observacao"}");

        Console.WriteLine($"desconto: {carrinho.Desconto()}");
        Console.WriteLine($"total: {carrinho.Total()}");

        var semCupom = new Carrinho();
        semCupom.Adicionar(new Item { Codigo = "D4", Nome = "Suco", Categoria = "bebida", Preco = 10m, Quantidade = 1 });

        Console.WriteLine($"sem cupom desconto: {semCupom.Desconto()}");
        Console.WriteLine($"sem cupom total: {semCupom.Total()}");

        Console.WriteLine($"resumo: {Carrinho.ResumoCliente(carrinho.Cliente)}");
        Console.WriteLine($"resumo sem cliente: {Carrinho.ResumoCliente(semCupom.Cliente)}");
        Console.WriteLine($"resumo sem email: {Carrinho.ResumoCliente(new Cliente { Nome = "Bruno" })}");

        int contados = 0;

        foreach (Item i in new Carrinho().Itens())
        {
            contados++;
        }

        Console.WriteLine($"carrinho vazio iterou: {contados}");
    }
}`,
      hints: [
        '`Categoria` também é `required`: um item sem categoria quebraria `ItensPorCategoria` silenciosamente.',
        '`Quantidade` ganha `= 1` — é um padrão sensato e evita que o item nasça com subtotal zero.',
        '`ItensPorCategoria` devolve a lista construída, que é vazia quando nada casa. Nunca `null`.',
        '`Cupom == "DEZ"` funciona com `Cupom` nulo: comparar `null` com uma string é `false`, sem exceção.',
      ],
      tests: [
        {
          name: 'Carrinho migrado',
          expectedStdout:
            'itens: 3\nbebidas: 2\nsalgados: 0\n' +
            'busca A1: Cafe\nbusca Z9 nula: True\n' +
            'observacao B2: sem acucar\nobservacao A1: sem observacao\n' +
            'desconto: 0.1\ntotal: 76.5\n' +
            'sem cupom desconto: 0\nsem cupom total: 10\n' +
            'resumo: Ana <ana@x.dev>\nresumo sem cliente: sem cliente\nresumo sem email: Bruno <sem email>\n' +
            'carrinho vazio iterou: 0',
        },
      ],
    },
  },

  {
    id: 's08c04l10',
    title: 'Checkpoint: nullability',
    objective: 'Consolidar as decisões de nulidade e reconhecer os limites reais da garantia.',
    concept: [
      {
        kind: 'text',
        body:
          'O contexto nullable transforma nulidade de detalhe de implementação em **parte do tipo**. Este capítulo cobriu as ferramentas; falta consolidar as decisões e as fronteiras.',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Decisão'],
        rows: [
          ['dado essencial ao objeto', '`required` + `init`'],
          ['dado com padrão sensato', 'valor na declaração'],
          ['ausência é estado real', '`?`'],
          ['busca que pode não achar', 'retorno `?`, ou `TryX` com `[NotNullWhen(true)]`'],
          ['coleção sem resultados', '**vazia**, nunca nula'],
          ['garantia que o compilador não vê', '`!` com comentário — e o mínimo possível'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O ganho real não é "menos `NullReferenceException`". É que a **nulidade virou parte da assinatura**: quem consome o seu código sabe o que pode faltar sem ler a implementação nem torcer para a documentação estar atualizada.',
      },
      {
        kind: 'text',
        body:
          'Igualmente importante é saber onde a garantia **não** vale. O contexto é análise estática, e o mundo real entra pelas bordas.',
      },
      {
        kind: 'table',
        headers: ['Fronteira', 'Por que a garantia não vale'],
        rows: [
          ['deserialização (JSON, banco)', 'preenche por reflexão, sem passar pelo compilador'],
          ['código sem o contexto ligado', 'os tipos de lá são "indiferentes"'],
          ['reflexão e `Activator`', 'contornam construtores e inicializadores'],
          ['arrays recém-criados', '`new string[10]` tem dez nulos, sem aviso'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O caso do array é o mais fácil de esquecer: `new string[10]` compila sem aviso e contém dez nulos. O compilador não rastreia o conteúdo de arrays — só o tipo do elemento.',
      },
      {
        kind: 'text',
        body:
          'Nas fronteiras, a resposta é **validar na entrada**. Depois que o dado entrou validado no seu modelo, o contexto cuida do resto.',
      },
      {
        kind: 'compare',
        good: `// valida na fronteira
var dto = Deserializar(json);

if (dto.Nome is null)
{
    throw new FormatException("nome ausente");
}

var pessoa = new Pessoa { Nome = dto.Nome };`,
        bad: `var dto = Deserializar(json);

// dto.Nome e "string" mas pode
// estar nulo de verdade
var pessoa = new Pessoa { Nome = dto.Nome };`,
        goodLabel: 'Valida ao entrar',
        badLabel: 'Confia na anotação',
      },
      {
        kind: 'text',
        body:
          'Vale fechar com a hierarquia de escolhas que este capítulo defendeu, do melhor para o pior:',
      },
      {
        kind: 'table',
        headers: ['Ordem', 'Abordagem'],
        rows: [
          ['1º', 'projetar para que o nulo não exista (`required`, objeto nulo, coleção vazia)'],
          ['2º', 'anotar `?` e tratar com `??`, `?.` ou guarda'],
          ['3º', 'lançar exceção com mensagem clara na fronteira'],
          ['4º', '`!` com comentário justificando a garantia'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Se você está no nível 4 com frequência, o problema está no nível 1. Um `!` recorrente costuma indicar um modelo em que a ausência não foi decidida — e não uma limitação do compilador.',
      },
    ],
    quiz: [
      {
        id: 's08c04l10q1',
        type: 'multiple',
        prompt: 'Onde a garantia do contexto nullable **não** vale?',
        options: [
          { id: 'a', text: 'Objetos preenchidos por deserialização', correct: true },
          { id: 'b', text: 'Código de bibliotecas sem o contexto ligado', correct: true },
          { id: 'c', text: 'Elementos de um array recém-criado', correct: true },
          { id: 'd', text: 'Variáveis locais dentro de um método anotado' },
        ],
        explanation:
          'As três primeiras contornam a análise do compilador. Variáveis locais são justamente onde a análise de fluxo é mais precisa.',
      },
      {
        id: 's08c04l10q2',
        type: 'single',
        prompt: 'Qual a primeira escolha ao lidar com um valor que pode faltar?',
        options: [
          { id: 'a', text: 'Projetar para que a ausência não exista: `required`, coleção vazia, objeto nulo', correct: true },
          { id: 'b', text: 'Anotar com `?` e verificar em cada uso' },
          { id: 'c', text: 'Usar `!` para silenciar o aviso' },
          { id: 'd', text: 'Lançar exceção sempre que for nulo' },
        ],
        explanation:
          'Tratar bem a ausência é bom; eliminá-la do modelo é melhor. Uma coleção sempre vazia remove a verificação de todos os consumidores de uma vez.',
      },
      {
        id: 's08c04l10q3',
        type: 'single',
        prompt: 'O que `!` frequente no código costuma indicar?',
        options: [
          { id: 'a', text: 'Um modelo em que a ausência não foi decidida', correct: true },
          { id: 'b', text: 'Uso avançado e correto do recurso' },
          { id: 'c', text: 'Uma limitação do compilador' },
          { id: 'd', text: 'Que o contexto está mal configurado' },
        ],
        explanation:
          'Um `!` ocasional e comentado é legítimo. Muitos deles significam que os avisos foram tratados como ruído, e a garantia inteira virou fachada.',
      },
    ],
    challenge: {
      brief:
        'Feche o capítulo com um importador que atravessa a fronteira: recebe dados crus possivelmente nulos, valida na entrada e produz um modelo interno em que a nulidade está resolvida por design.',
      requirements: [
        'A solução compila **sem nenhum aviso** e não usa `!` em lugar nenhum.',
        '`RegistroCru` representa a fronteira: todos os campos são `string?`.',
        '`Cadastro` é o modelo interno: `required`, `init`, e opcionais só onde a ausência é real.',
        '`Importar` valida cada registro e devolve um resultado com sucessos e erros.',
        'A lista de erros é sempre preenchida, nunca nula.',
        '`ProcessarLote` trata um array possivelmente contendo nulos.',
        '`Buscar` usa o padrão `Try` com `[NotNullWhen(true)]`.',
      ],
      nullable: 'enabled',
      starterCode: `using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

class RegistroCru
{
    // A fronteira: tudo pode faltar
    public string? Codigo { get; set; }
    public string? Nome { get; set; }
    public string? Email { get; set; }
    public string? Idade { get; set; }
}

class Cadastro
{
    // TODO: required / init / opcional
    public string Codigo { get; init; }
    public string Nome { get; init; }
    public string Email { get; init; }
    public int? Idade { get; init; }

    public override string ToString()
    {
        string idade = Idade.HasValue ? Idade.Value.ToString() : "?";
        return $"{Codigo} {Nome} <{Email}> ({idade})";
    }
}

class Resultado
{
    // TODO: as duas listas nunca sao nulas
    public IReadOnlyList<Cadastro> Aceitos { get; init; }
    public IReadOnlyList<string> Erros { get; init; }
}

class Importador
{
    private readonly Dictionary<string, Cadastro> porCodigo = new();

    // TODO: valida e converte; erros no formato "<codigo ou '?'>: <motivo>"
    //  - Codigo vazio  -> "sem codigo"
    //  - Nome vazio    -> "sem nome"
    //  - Email vazio   -> "sem email"
    //  - Idade nao numerica quando presente -> "idade invalida"
    public Resultado Importar(IEnumerable<RegistroCru?> registros)
    {
        return new Resultado();
    }

    // TODO: padrao Try com [NotNullWhen(true)]
    public bool TryBuscar(string codigo, out Cadastro cadastro)
    {
        cadastro = null;
        return false;
    }

    // TODO: array pode conter nulos; devolve quantos foram aceitos
    public int ProcessarLote(RegistroCru?[] lote)
    {
        return 0;
    }
}

class Program
{
    static void Main()
    {
        var importador = new Importador();

        var registros = new RegistroCru?[]
        {
            new RegistroCru { Codigo = "A1", Nome = "Ana", Email = "ana@x.dev", Idade = "30" },
            new RegistroCru { Codigo = "B2", Nome = "Bruno", Email = "bruno@x.dev" },
            new RegistroCru { Codigo = "", Nome = "Sem codigo", Email = "x@x.dev" },
            new RegistroCru { Codigo = "C3", Email = "c@x.dev" },
            new RegistroCru { Codigo = "D4", Nome = "Davi" },
            new RegistroCru { Codigo = "E5", Nome = "Eva", Email = "eva@x.dev", Idade = "abc" },
            null,
        };

        Resultado resultado = importador.Importar(registros);

        Console.WriteLine($"aceitos: {resultado.Aceitos.Count}");

        foreach (Cadastro c in resultado.Aceitos)
        {
            Console.WriteLine($"  {c}");
        }

        Console.WriteLine($"erros: {resultado.Erros.Count}");

        foreach (string e in resultado.Erros)
        {
            Console.WriteLine($"  {e}");
        }

        if (importador.TryBuscar("A1", out Cadastro achado))
        {
            Console.WriteLine($"encontrado: {achado.Nome} com {achado.Nome.Length} letras");
        }

        Console.WriteLine($"busca ausente: {importador.TryBuscar("Z9", out Cadastro _)}");

        var vazio = new Importador();
        Resultado nenhum = vazio.Importar(new RegistroCru?[0]);
        Console.WriteLine($"vazio aceitos: {nenhum.Aceitos.Count} erros: {nenhum.Erros.Count}");

        int iterou = 0;

        foreach (string e in nenhum.Erros)
        {
            iterou++;
        }

        Console.WriteLine($"iterou erros vazios: {iterou}");

        var outro = new Importador();
        Console.WriteLine($"lote: {outro.ProcessarLote(registros)}");
        Console.WriteLine($"lote so nulos: {new Importador().ProcessarLote(new RegistroCru?[] { null, null })}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

class RegistroCru
{
    public string? Codigo { get; set; }
    public string? Nome { get; set; }
    public string? Email { get; set; }
    public string? Idade { get; set; }
}

class Cadastro
{
    public required string Codigo { get; init; }
    public required string Nome { get; init; }
    public required string Email { get; init; }
    public int? Idade { get; init; }

    public override string ToString()
    {
        string idade = Idade.HasValue ? Idade.Value.ToString() : "?";
        return $"{Codigo} {Nome} <{Email}> ({idade})";
    }
}

class Resultado
{
    public IReadOnlyList<Cadastro> Aceitos { get; init; } = Array.Empty<Cadastro>();
    public IReadOnlyList<string> Erros { get; init; } = Array.Empty<string>();
}

class Importador
{
    private readonly Dictionary<string, Cadastro> porCodigo = new();

    public Resultado Importar(IEnumerable<RegistroCru?> registros)
    {
        var aceitos = new List<Cadastro>();
        var erros = new List<string>();

        foreach (RegistroCru? cru in registros)
        {
            if (cru is null)
            {
                erros.Add("?: registro nulo");
                continue;
            }

            string rotulo = string.IsNullOrWhiteSpace(cru.Codigo) ? "?" : cru.Codigo;

            if (string.IsNullOrWhiteSpace(cru.Codigo))
            {
                erros.Add($"{rotulo}: sem codigo");
                continue;
            }

            if (string.IsNullOrWhiteSpace(cru.Nome))
            {
                erros.Add($"{rotulo}: sem nome");
                continue;
            }

            if (string.IsNullOrWhiteSpace(cru.Email))
            {
                erros.Add($"{rotulo}: sem email");
                continue;
            }

            int? idade = null;

            if (!string.IsNullOrWhiteSpace(cru.Idade))
            {
                if (!int.TryParse(cru.Idade, out int convertida))
                {
                    erros.Add($"{rotulo}: idade invalida");
                    continue;
                }

                idade = convertida;
            }

            var cadastro = new Cadastro
            {
                Codigo = cru.Codigo,
                Nome = cru.Nome,
                Email = cru.Email,
                Idade = idade,
            };

            aceitos.Add(cadastro);
            porCodigo[cadastro.Codigo] = cadastro;
        }

        return new Resultado { Aceitos = aceitos, Erros = erros };
    }

    public bool TryBuscar(string codigo, [NotNullWhen(true)] out Cadastro? cadastro)
    {
        return porCodigo.TryGetValue(codigo, out cadastro);
    }

    public int ProcessarLote(RegistroCru?[] lote)
    {
        return Importar(lote).Aceitos.Count;
    }
}

class Program
{
    static void Main()
    {
        var importador = new Importador();

        var registros = new RegistroCru?[]
        {
            new RegistroCru { Codigo = "A1", Nome = "Ana", Email = "ana@x.dev", Idade = "30" },
            new RegistroCru { Codigo = "B2", Nome = "Bruno", Email = "bruno@x.dev" },
            new RegistroCru { Codigo = "", Nome = "Sem codigo", Email = "x@x.dev" },
            new RegistroCru { Codigo = "C3", Email = "c@x.dev" },
            new RegistroCru { Codigo = "D4", Nome = "Davi" },
            new RegistroCru { Codigo = "E5", Nome = "Eva", Email = "eva@x.dev", Idade = "abc" },
            null,
        };

        Resultado resultado = importador.Importar(registros);

        Console.WriteLine($"aceitos: {resultado.Aceitos.Count}");

        foreach (Cadastro c in resultado.Aceitos)
        {
            Console.WriteLine($"  {c}");
        }

        Console.WriteLine($"erros: {resultado.Erros.Count}");

        foreach (string e in resultado.Erros)
        {
            Console.WriteLine($"  {e}");
        }

        if (importador.TryBuscar("A1", out Cadastro? achado))
        {
            Console.WriteLine($"encontrado: {achado.Nome} com {achado.Nome.Length} letras");
        }

        Console.WriteLine($"busca ausente: {importador.TryBuscar("Z9", out Cadastro? _)}");

        var vazio = new Importador();
        Resultado nenhum = vazio.Importar(new RegistroCru?[0]);
        Console.WriteLine($"vazio aceitos: {nenhum.Aceitos.Count} erros: {nenhum.Erros.Count}");

        int iterou = 0;

        foreach (string e in nenhum.Erros)
        {
            iterou++;
        }

        Console.WriteLine($"iterou erros vazios: {iterou}");

        var outro = new Importador();
        Console.WriteLine($"lote: {outro.ProcessarLote(registros)}");
        Console.WriteLine($"lote so nulos: {new Importador().ProcessarLote(new RegistroCru?[] { null, null })}");
    }
}`,
      hints: [
        'Cada `string.IsNullOrWhiteSpace(x)` seguido de `continue` estreita `x` para não nulo no resto do laço — é isso que permite atribuir a propriedades `required` sem aviso.',
        '`Resultado` inicializa as duas listas com `Array.Empty<>()` na declaração: um `new Resultado()` sem inicializador continua sendo seguro de iterar.',
        '`[NotNullWhen(true)] out Cadastro?` faz o `if (TryBuscar(...))` estreitar o valor dentro do bloco, sem precisar de `!`.',
        '`ProcessarLote` pode simplesmente delegar para `Importar` e contar os aceitos — `RegistroCru?[]` já é um `IEnumerable<RegistroCru?>`.',
      ],
      tests: [
        {
          name: 'Importador na fronteira',
          expectedStdout:
            'aceitos: 2\n' +
            '  A1 Ana <ana@x.dev> (30)\n' +
            '  B2 Bruno <bruno@x.dev> (?)\n' +
            'erros: 5\n' +
            '  ?: sem codigo\n' +
            '  C3: sem nome\n' +
            '  D4: sem email\n' +
            '  E5: idade invalida\n' +
            '  ?: registro nulo\n' +
            'encontrado: Ana com 3 letras\n' +
            'busca ausente: False\n' +
            'vazio aceitos: 0 erros: 0\n' +
            'iterou erros vazios: 0\n' +
            'lote: 2\nlote so nulos: 0',
        },
      ],
    },
  },
]
