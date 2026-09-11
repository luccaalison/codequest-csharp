import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's03c03l01',
    title: 'A ideia de chave e valor',
    objective: 'Associar cada valor a uma chave própria e recuperá-lo diretamente, sem percorrer a coleção.',
    concept: [
      {
        kind: 'text',
        body:
          'Array e `List` respondem a "o que está na posição 3?". O `Dictionary` responde a uma pergunta muito mais útil: **"qual o valor associado a esta chave?"**. A posição deixa de importar; o que identifica o dado é o próprio dado.',
      },
      {
        kind: 'code',
        code: `using System.Collections.Generic;

Dictionary<string, int> precos = new Dictionary<string, int>();

precos["banana"] = 7;
precos["pera"] = 5;

Console.WriteLine(precos["banana"]);   // 7
Console.WriteLine(precos.Count);       // 2`,
        caption: '`<string, int>`: as chaves são texto, os valores são números.',
      },
      {
        kind: 'text',
        body:
          'A diferença decisiva é de **custo**. Procurar um produto em uma `List` exige comparar item por item até achar. Em um `Dictionary`, a chave é convertida em um endereço direto e a busca acontece em um único passo, independentemente do tamanho.',
      },
      {
        kind: 'table',
        headers: ['Coleção', 'Buscar por valor', 'Com 1 milhão de itens'],
        rows: [
          ['`List<T>`', 'percorre até achar', 'até 1 milhão de comparações'],
          ['`Dictionary`', 'calcula e vai direto', '**uma** consulta'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'É o mesmo salto entre procurar uma palavra folheando um livro inteiro e procurá-la no índice remissivo. O índice custa espaço extra e trabalho para manter — e paga isso na primeira consulta.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Chaves são **únicas**: cada chave aparece uma vez só. Gravar duas vezes na mesma chave não cria duas entradas, e sim substitui a anterior. Se o seu problema precisa de vários valores por chave, a saída é guardar uma lista como valor — assunto de uma lição adiante.',
      },
      {
        kind: 'text',
        body:
          'Os dois tipos são livres: `Dictionary<string, int>` para preços, `Dictionary<int, string>` para nomes por código, `Dictionary<string, List<string>>` para agrupamentos.',
      },
    ],
    quiz: [
      {
        id: 's03c03l01q1',
        type: 'single',
        prompt: 'Qual é a principal vantagem do `Dictionary` sobre a `List` para buscar um item?',
        options: [
          { id: 'a', text: 'A busca por chave não depende do tamanho da coleção.', correct: true },
          { id: 'b', text: 'Ele ocupa menos memória.' },
          { id: 'c', text: 'Ele mantém os itens sempre ordenados.' },
          { id: 'd', text: 'Ele aceita chaves repetidas.' },
        ],
        explanation:
          'O `Dictionary` ocupa **mais** memória e não garante ordem nenhuma. O que ele compra é a busca imediata, e é isso que justifica os dois custos.',
      },
      {
        id: 's03c03l01q2',
        type: 'single',
        prompt: 'O que acontece ao gravar duas vezes na mesma chave com o indexador?',
        options: [
          { id: 'a', text: 'O segundo valor substitui o primeiro; a contagem não muda.', correct: true },
          { id: 'b', text: 'Os dois valores ficam guardados.' },
          { id: 'c', text: 'Lança exceção.' },
          { id: 'd', text: 'O segundo é ignorado.' },
        ],
        explanation:
          'Chaves são únicas por definição. O indexador sempre aceita a gravação, criando ou substituindo — diferente do `Add`, que recusa chave repetida.',
      },
      {
        id: 's03c03l01q3',
        type: 'single',
        prompt: 'Você precisa guardar vários telefones por pessoa. Qual tipo resolve?',
        options: [
          { id: 'a', code: 'Dictionary<string, List<string>>', correct: true },
          { id: 'b', code: 'Dictionary<string, string>' },
          { id: 'c', text: 'Dois dicionários com a mesma chave.' },
          { id: 'd', text: 'Não é possível com `Dictionary`.' },
        ],
        explanation:
          'Como a chave é única, o caminho é fazer o **valor** ser uma coleção. Essa combinação é tão comum que ganha uma lição só para ela neste capítulo.',
      },
    ],
    challenge: {
      brief:
        'Monte uma tabela de preços. Leia um inteiro `n` e depois `n` produtos, cada um em duas linhas: o nome e o preço. Em seguida leia `q` consultas, cada uma o nome de um produto que **existe** na tabela, e informe o preço de cada uma.',
      requirements: [
        'Uma linha por consulta, no formato `banana -> 7`',
        'A última linha é `Total: t`, com a quantidade de produtos na tabela',
        'A ordem da entrada é: `n`, os `n` pares nome/preço, `q`, as `q` consultas',
        'Todas as consultas usam nomes que existem',
        'Use o indexador para gravar e para consultar',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, int> precos = new Dictionary<string, int>();

        // Leia n pares nome/preco

        int q = int.Parse(Console.ReadLine());

        // Responda as q consultas
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, int> precos = new Dictionary<string, int>();

        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int preco = int.Parse(Console.ReadLine());
            precos[nome] = preco;
        }

        int q = int.Parse(Console.ReadLine());

        for (int i = 0; i < q; i++)
        {
            string consulta = Console.ReadLine();
            Console.WriteLine($"{consulta} -> {precos[consulta]}");
        }

        Console.WriteLine($"Total: {precos.Count}");
    }
}
`,
      hints: [
        'Cada produto ocupa duas linhas da entrada: o nome vem primeiro, o preço depois.',
        'A consulta é `precos[consulta]`, com a própria chave entre colchetes — não um índice numérico.',
      ],
      tests: [
        {
          name: 'Três produtos, duas consultas',
          stdin: '3\nbanana\n7\npera\n5\nuva\n3\n2\nbanana\nuva\n',
          expectedStdout: 'banana -> 7\nuva -> 3\nTotal: 3',
        },
        {
          name: 'Um produto só',
          stdin: '1\nitem\n42\n1\nitem\n',
          expectedStdout: 'item -> 42\nTotal: 1',
        },
        {
          name: 'Consulta repetida',
          stdin: '2\na\n1\nb\n2\n3\na\nb\na\n',
          expectedStdout: 'a -> 1\nb -> 2\na -> 1\nTotal: 2',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c03l02',
    title: 'Add e o indexador',
    objective: 'Escolher entre `Add` e o indexador conforme a chave repetida deva ser um erro ou uma atualização.',
    concept: [
      {
        kind: 'text',
        body:
          'Existem duas formas de gravar em um dicionário, e elas discordam em exatamente um ponto: o que fazer quando a chave **já existe**.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Add: recusa repetição',
          code: `dic.Add("a", 1);
dic.Add("a", 2);   // explode`,
        },
        right: {
          label: 'Indexador: cria ou substitui',
          code: `dic["a"] = 1;
dic["a"] = 2;      // agora vale 2`,
        },
      },
      {
        kind: 'output',
        code: `ArgumentException: An item with the same key
has already been added. Key: a`,
        caption: 'O erro do `Add` com chave repetida.',
      },
      {
        kind: 'text',
        body:
          'A escolha é sobre intenção. Use `Add` quando uma chave repetida significa que **algo deu errado** — dois cadastros com o mesmo CPF, por exemplo. Use o indexador quando repetir é normal e o valor novo deve prevalecer.',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Escolha'],
        rows: [
          ['carregar dados que devem ser únicos', '`Add`'],
          ['atualizar um cadastro', 'indexador'],
          ['contar frequências', 'indexador'],
          ['detectar duplicata na entrada', '`Add` com tratamento'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Dá para saber se uma gravação criou ou substituiu sem consultar nada antes: compare o `Count` de antes com o de depois. Se não mudou, a chave já existia. É um truque barato e não depende de percorrer o dicionário.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O indexador tem comportamentos **diferentes** ao gravar e ao ler. Gravar em chave inexistente cria a entrada; ler de chave inexistente lança exceção. Essa assimetria é a causa do erro que a próxima lição resolve.',
      },
    ],
    quiz: [
      {
        id: 's03c03l02q1',
        type: 'single',
        prompt: 'O que acontece em `dic.Add("a", 1); dic.Add("a", 2);`?',
        options: [
          { id: 'a', text: 'A segunda chamada lança `ArgumentException`.', correct: true },
          { id: 'b', text: 'O valor da chave `a` vira 2.' },
          { id: 'c', text: 'A segunda chamada é ignorada.' },
          { id: 'd', text: 'O dicionário passa a ter duas entradas com chave `a`.' },
        ],
        explanation:
          '`Add` promete criar uma entrada nova. Se a chave já existe, ele não tem como cumprir a promessa e reclama em vez de silenciosamente sobrescrever.',
      },
      {
        id: 's03c03l02q2',
        type: 'single',
        prompt: 'Você está contando quantas vezes cada palavra aparece. Qual forma de gravação usar?',
        options: [
          { id: 'a', text: 'O indexador: a mesma palavra vai aparecer várias vezes.', correct: true },
          { id: 'b', text: '`Add`, para detectar as repetições.' },
          { id: 'c', text: 'Tanto faz.' },
          { id: 'd', text: 'Nenhum dos dois: contagem exige outra estrutura.' },
        ],
        explanation:
          'Repetição é exatamente o que se está medindo, então ela não é erro. Com `Add`, a segunda ocorrência de qualquer palavra derrubaria o programa.',
      },
      {
        id: 's03c03l02q3',
        type: 'single',
        prompt: 'Como saber se `dic[chave] = valor` criou uma entrada nova?',
        options: [
          { id: 'a', text: 'Comparando o `Count` antes e depois da gravação.', correct: true },
          { id: 'b', text: 'Pelo retorno do indexador.' },
          { id: 'c', text: 'Não é possível saber.' },
          { id: 'd', text: 'Verificando se o valor mudou.' },
        ],
        explanation:
          'O indexador não devolve nada nessa forma. O `Count` cresce apenas quando a chave é nova, então a diferença responde à pergunta sem custo extra.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` pares chave/valor, gravando cada um com o indexador. Chaves repetidas devem substituir o valor anterior. Depois leia `q` consultas de chaves existentes e informe os valores finais.',
      requirements: [
        'Uma linha por consulta, no formato `a -> 9`',
        'Depois: `Total: t`, com a quantidade de chaves distintas',
        'Por último: `Sobrescritas: s`, quantas gravações caíram em chave já existente',
        'A ordem da entrada é: `n`, os `n` pares chave/valor, `q`, as `q` consultas',
        'Descubra as sobrescritas comparando o `Count` antes e depois de cada gravação',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, int> dados = new Dictionary<string, int>();
        int sobrescritas = 0;

        // Grave com o indexador e detecte as sobrescritas pelo Count

        int q = int.Parse(Console.ReadLine());

        // Responda as consultas
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, int> dados = new Dictionary<string, int>();
        int sobrescritas = 0;

        for (int i = 0; i < n; i++)
        {
            string chave = Console.ReadLine();
            int valor = int.Parse(Console.ReadLine());

            int antes = dados.Count;
            dados[chave] = valor;

            if (dados.Count == antes)
            {
                sobrescritas++;
            }
        }

        int q = int.Parse(Console.ReadLine());

        for (int i = 0; i < q; i++)
        {
            string consulta = Console.ReadLine();
            Console.WriteLine($"{consulta} -> {dados[consulta]}");
        }

        Console.WriteLine($"Total: {dados.Count}");
        Console.WriteLine($"Sobrescritas: {sobrescritas}");
    }
}
`,
      hints: [
        'Guarde o `Count` em uma variável **antes** da gravação, e compare logo depois.',
        'O `Count` só cresce quando a chave é nova, então "não mudou" significa "substituiu".',
      ],
      tests: [
        {
          name: 'Uma chave repetida',
          stdin: '4\na\n1\nb\n2\na\n9\nc\n3\n3\na\nb\nc\n',
          expectedStdout: 'a -> 9\nb -> 2\nc -> 3\nTotal: 3\nSobrescritas: 1',
        },
        {
          name: 'Nenhuma repetição',
          stdin: '2\nx\n10\ny\n20\n2\nx\ny\n',
          expectedStdout: 'x -> 10\ny -> 20\nTotal: 2\nSobrescritas: 0',
        },
        {
          name: 'Sempre a mesma chave',
          stdin: '3\nk\n1\nk\n2\nk\n3\n1\nk\n',
          expectedStdout: 'k -> 3\nTotal: 1\nSobrescritas: 2',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c03l03',
    title: 'TryGetValue',
    objective: 'Consultar uma chave que pode não existir sem derrubar o programa, usando o padrão `Try` do .NET.',
    concept: [
      {
        kind: 'text',
        body:
          'Ler uma chave inexistente com o indexador é a exceção mais comum de quem começa com dicionários. Diferente do `Add`, que só falha em caso raro, esta falha em caso rotineiro: consultar algo que o usuário digitou.',
      },
      {
        kind: 'output',
        code: `KeyNotFoundException: The given key 'z' was
not present in the dictionary.`,
      },
      {
        kind: 'text',
        body:
          'A solução é o mesmo padrão `Try` que você já usa desde a Seção 1 com `int.TryParse`: um `bool` diz se deu certo, e o valor sai por um parâmetro de saída.',
      },
      {
        kind: 'code',
        code: `if (precos.TryGetValue(consulta, out int preco))
{
    Console.WriteLine($"{consulta} -> {preco}");
}
else
{
    Console.WriteLine($"{consulta} -> nao encontrado");
}`,
        caption: 'Uma única consulta responde "existe?" e "quanto vale?" ao mesmo tempo.',
      },
      {
        kind: 'compare',
        good: `if (dic.TryGetValue(k, out int v))
{
    usar(v);
}`,
        bad: `if (dic.ContainsKey(k))
{
    usar(dic[k]);
}`,
        goodLabel: 'Uma consulta',
        badLabel: 'Duas consultas ao mesmo dado',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'As duas versões funcionam, mas a segunda procura a chave duas vezes: uma no `ContainsKey` e outra no indexador. `TryGetValue` faz o trabalho uma vez só, e é por isso que ele é a forma idiomática.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Quando a chave não existe, o parâmetro de saída recebe o valor **padrão** do tipo: `0` para `int`, `null` para `string`. Nunca use esse valor sem antes checar o retorno — é a mesma regra do `int.TryParse`.',
      },
    ],
    quiz: [
      {
        id: 's03c03l03q1',
        type: 'single',
        prompt: 'O que acontece ao ler `dic["z"]` quando a chave `z` não existe?',
        options: [
          { id: 'a', text: 'Lança `KeyNotFoundException`.', correct: true },
          { id: 'b', text: 'Devolve `0`.' },
          { id: 'c', text: 'Devolve `null`.' },
          { id: 'd', text: 'Cria a entrada com valor padrão.' },
        ],
        explanation:
          'Gravar em chave inexistente cria a entrada; **ler** de chave inexistente é erro. Essa assimetria do indexador é o que torna o `TryGetValue` necessário.',
      },
      {
        id: 's03c03l03q2',
        type: 'single',
        prompt: 'Por que `TryGetValue` é preferível a `ContainsKey` seguido do indexador?',
        options: [
          { id: 'a', text: 'Porque faz uma única busca em vez de duas.', correct: true },
          { id: 'b', text: 'Porque `ContainsKey` não funciona com `string`.' },
          { id: 'c', text: 'Porque `ContainsKey` pode lançar exceção.' },
          { id: 'd', text: 'São idênticos em tudo.' },
        ],
        explanation:
          'As duas versões dão o mesmo resultado. A diferença é que uma paga o custo da busca uma vez e a outra paga duas — desprezível em um caso, relevante dentro de um laço grande.',
      },
      {
        id: 's03c03l03q3',
        type: 'single',
        prompt: 'Quanto vale `v` depois de `dic.TryGetValue("z", out int v)` devolver `false`?',
        options: [
          { id: 'a', code: '0', correct: true },
          { id: 'b', code: '-1' },
          { id: 'c', text: 'Fica indefinido.' },
          { id: 'd', text: 'Mantém o valor anterior.' },
        ],
        explanation:
          'Ele recebe o valor padrão do tipo. Usar esse `0` sem checar o retorno faria uma chave ausente parecer uma chave com valor zero — exatamente o bug que o padrão `Try` existe para evitar.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` pares nome/preço. Em seguida leia `q` consultas, que podem incluir produtos **inexistentes**. Responda cada uma sem deixar o programa quebrar e conte os acertos e as ausências.',
      requirements: [
        'Consulta encontrada: `banana -> 7`',
        'Consulta ausente: `manga -> nao encontrado`',
        'Depois: `Encontradas: e` e `Ausentes: a`',
        'A ordem da entrada é: `n`, os `n` pares nome/preço, `q`, as `q` consultas',
        'Use `TryGetValue`, sem `ContainsKey` antes',
        'O programa não pode encerrar com exceção',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, int> precos = new Dictionary<string, int>();
        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            precos[nome] = int.Parse(Console.ReadLine());
        }

        int q = int.Parse(Console.ReadLine());

        int encontradas = 0;
        int ausentes = 0;

        // Responda cada consulta com TryGetValue

        Console.WriteLine($"Encontradas: {encontradas}");
        Console.WriteLine($"Ausentes: {ausentes}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, int> precos = new Dictionary<string, int>();
        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            precos[nome] = int.Parse(Console.ReadLine());
        }

        int q = int.Parse(Console.ReadLine());

        int encontradas = 0;
        int ausentes = 0;

        for (int i = 0; i < q; i++)
        {
            string consulta = Console.ReadLine();

            if (precos.TryGetValue(consulta, out int preco))
            {
                Console.WriteLine($"{consulta} -> {preco}");
                encontradas++;
            }
            else
            {
                Console.WriteLine($"{consulta} -> nao encontrado");
                ausentes++;
            }
        }

        Console.WriteLine($"Encontradas: {encontradas}");
        Console.WriteLine($"Ausentes: {ausentes}");
    }
}
`,
      hints: [
        'A forma é `if (precos.TryGetValue(consulta, out int preco))`, com a variável declarada dentro do `out`.',
        'O `preco` só pode ser usado dentro do ramo verdadeiro: no `else` ele vale `0` e não significa nada.',
      ],
      tests: [
        {
          name: 'Consultas presentes e ausentes',
          stdin: '3\nbanana\n7\npera\n5\nuva\n3\n3\nbanana\nmanga\nuva\n',
          expectedStdout:
            'banana -> 7\nmanga -> nao encontrado\nuva -> 3\nEncontradas: 2\nAusentes: 1',
        },
        {
          name: 'Todas ausentes',
          stdin: '1\na\n1\n2\nx\ny\n',
          expectedStdout:
            'x -> nao encontrado\ny -> nao encontrado\nEncontradas: 0\nAusentes: 2',
        },
        {
          name: 'Valor zero não é ausência',
          stdin: '1\ngratis\n0\n2\ngratis\noutro\n',
          expectedStdout:
            'gratis -> 0\noutro -> nao encontrado\nEncontradas: 1\nAusentes: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c03l04',
    title: 'ContainsKey e Remove',
    objective: 'Testar a presença de uma chave e removê-la, sabendo o custo de cada consulta.',
    concept: [
      {
        kind: 'text',
        body:
          'Nem toda pergunta precisa do valor. Quando só interessa saber se a chave existe, `ContainsKey` responde diretamente — e é a escolha certa quando o valor não será usado.',
      },
      {
        kind: 'code',
        code: `if (dic.ContainsKey("banana"))
{
    Console.WriteLine("temos banana");
}

bool saiu = dic.Remove("pera");   // true se existia`,
      },
      {
        kind: 'table',
        headers: ['Método', 'Procura por', 'Custo'],
        rows: [
          ['`ContainsKey(k)`', 'chave', 'imediato'],
          ['`Remove(k)`', 'chave', 'imediato'],
          ['`ContainsValue(v)`', 'valor', '**percorre tudo**'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`ContainsValue` é a exceção que confirma a regra: o dicionário é organizado pelas **chaves**, então procurar por valor exige examinar todas as entradas. Se você precisa buscar pelos dois lados com frequência, a resposta costuma ser manter dois dicionários.',
      },
      {
        kind: 'text',
        body:
          '`Remove` segue a mesma convenção do `Remove` da `List`: devolve `true` se removeu e `false` se a chave não estava lá. Ele nunca lança exceção por chave ausente.',
      },
      {
        kind: 'compare',
        good: `dic.Remove("x");`,
        bad: `if (dic.ContainsKey("x"))
{
    dic.Remove("x");
}`,
        goodLabel: 'Já é seguro sozinho',
        badLabel: 'Busca a mesma chave duas vezes',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A guarda antes do `Remove` é desnecessária, e é um reflexo herdado de `RemoveAt` em listas — que **precisa** de guarda. A diferença é que ali o argumento é uma posição, que pode ser inválida; aqui é uma chave, cuja ausência é uma resposta legítima.',
      },
    ],
    quiz: [
      {
        id: 's03c03l04q1',
        type: 'single',
        prompt: 'O que `dic.Remove("z")` faz quando a chave `z` não existe?',
        options: [
          { id: 'a', text: 'Devolve `false` e não altera nada.', correct: true },
          { id: 'b', text: 'Lança `KeyNotFoundException`.' },
          { id: 'c', text: 'Remove a primeira entrada do dicionário.' },
          { id: 'd', text: 'Cria a chave e depois a remove.' },
        ],
        explanation:
          'Diferente de `RemoveAt` em listas, aqui não há índice inválido possível. Chave ausente é informação, não erro.',
      },
      {
        id: 's03c03l04q2',
        type: 'single',
        prompt: 'Por que `ContainsValue` é mais caro que `ContainsKey`?',
        options: [
          { id: 'a', text: 'Porque a organização interna é pelas chaves, então buscar por valor exige percorrer tudo.', correct: true },
          { id: 'b', text: 'Porque valores podem ser repetidos.' },
          { id: 'c', text: 'Porque ele converte todos os valores para texto.' },
          { id: 'd', text: 'Não é mais caro: os dois custam igual.' },
        ],
        explanation:
          'O dicionário só sabe ir direto ao ponto a partir da chave. Pelo lado do valor ele não tem atalho nenhum, e vira uma busca linear como a de uma `List`.',
      },
      {
        id: 's03c03l04q3',
        type: 'single',
        prompt: 'Qual código remove uma chave de forma segura?',
        options: [
          { id: 'a', code: 'dic.Remove(chave);', correct: true },
          { id: 'b', code: 'if (dic.ContainsKey(chave)) dic.Remove(chave);' },
          { id: 'c', code: 'dic[chave] = null;' },
          { id: 'd', code: 'dic.RemoveAt(chave);' },
        ],
        explanation:
          'A segunda funciona, mas busca a chave duas vezes sem necessidade. A terceira não remove nada, e a quarta nem existe em `Dictionary`.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` pares chave/valor. Em seguida leia `q` chaves para remover, que podem ou não existir. Informe o resultado de cada remoção e o estado do dicionário antes e depois.',
      requirements: [
        'Linha 1: `Antes: c`, com a quantidade inicial de chaves',
        'Uma linha por remoção, no formato `remover pera: True` ou `remover manga: False`',
        'Depois: `Depois: c`, com a quantidade final',
        'Por último: `Removidas: k`, quantas remoções deram certo',
        'A ordem da entrada é: `n`, os `n` pares, `q`, as `q` chaves a remover',
        'Chame `Remove` diretamente, sem `ContainsKey` antes',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, int> dados = new Dictionary<string, int>();
        for (int i = 0; i < n; i++)
        {
            string chave = Console.ReadLine();
            dados[chave] = int.Parse(Console.ReadLine());
        }

        Console.WriteLine($"Antes: {dados.Count}");

        int q = int.Parse(Console.ReadLine());
        int removidas = 0;

        // Remova cada chave e relate o resultado

        Console.WriteLine($"Depois: {dados.Count}");
        Console.WriteLine($"Removidas: {removidas}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, int> dados = new Dictionary<string, int>();
        for (int i = 0; i < n; i++)
        {
            string chave = Console.ReadLine();
            dados[chave] = int.Parse(Console.ReadLine());
        }

        Console.WriteLine($"Antes: {dados.Count}");

        int q = int.Parse(Console.ReadLine());
        int removidas = 0;

        for (int i = 0; i < q; i++)
        {
            string alvo = Console.ReadLine();
            bool saiu = dados.Remove(alvo);

            Console.WriteLine($"remover {alvo}: {saiu}");

            if (saiu)
            {
                removidas++;
            }
        }

        Console.WriteLine($"Depois: {dados.Count}");
        Console.WriteLine($"Removidas: {removidas}");
    }
}
`,
      hints: [
        'Guarde o retorno do `Remove` em um `bool`: você precisa dele para imprimir e para contar.',
        'A linha `Antes` já está no `starterCode`, impressa antes de qualquer remoção.',
      ],
      tests: [
        {
          name: 'Remoções que existem e que não existem',
          stdin: '3\nbanana\n7\npera\n5\nuva\n3\n3\npera\nmanga\nbanana\n',
          expectedStdout:
            'Antes: 3\nremover pera: True\nremover manga: False\nremover banana: True\nDepois: 1\nRemovidas: 2',
        },
        {
          name: 'Remover a mesma chave duas vezes',
          stdin: '1\nk\n1\n2\nk\nk\n',
          expectedStdout:
            'Antes: 1\nremover k: True\nremover k: False\nDepois: 0\nRemovidas: 1',
        },
        {
          name: 'Nenhuma remoção acerta',
          stdin: '2\na\n1\nb\n2\n1\nz\n',
          expectedStdout: 'Antes: 2\nremover z: False\nDepois: 2\nRemovidas: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c03l05',
    title: 'Percorrendo pares',
    objective: 'Enumerar as entradas de um dicionário e produzir saída determinística apesar de a ordem não ser garantida.',
    concept: [
      {
        kind: 'text',
        body:
          'Um `foreach` sobre um dicionário devolve pares. Cada elemento é um `KeyValuePair`, com as propriedades `Key` e `Value`.',
      },
      {
        kind: 'code',
        code: `foreach (KeyValuePair<string, int> par in precos)
{
    Console.WriteLine($"{par.Key}: {par.Value}");
}

// so as chaves, ou so os valores:
foreach (string chave in precos.Keys) { }
foreach (int valor in precos.Values) { }`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A **ordem dessa enumeração não é garantida** por contrato. Hoje, na prática, um dicionário sem remoções costuma sair na ordem de inserção — mas isso é detalhe de implementação, pode mudar entre versões do .NET, e muda mesmo depois de qualquer remoção.',
      },
      {
        kind: 'text',
        body:
          'Consequência prática: se a saída do seu programa precisa ser sempre a mesma, você **não pode** depender da ordem do `foreach`. A solução é copiar as chaves para uma lista, ordená-la, e percorrer essa lista.',
      },
      {
        kind: 'code',
        code: `List<string> chaves = new List<string>(precos.Keys);
chaves.Sort();

foreach (string chave in chaves)
{
    Console.WriteLine($"{chave}: {precos[chave]}");
}`,
        caption: 'Duas linhas a mais compram uma saída idêntica em toda execução.',
      },
      {
        kind: 'output',
        code: `banana: 7
pera: 5
uva: 3`,
        caption: 'Ordem alfabética garantida, independentemente da ordem de inserção.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Essa é a mesma decisão que aparece em qualquer relatório: se a ordem é parte da especificação, ela precisa ser produzida explicitamente. "A ordem que sair" não é uma especificação — é uma aposta.',
      },
    ],
    quiz: [
      {
        id: 's03c03l05q1',
        type: 'single',
        prompt: 'A ordem do `foreach` sobre um `Dictionary` é garantida?',
        options: [
          { id: 'a', text: 'Não: é detalhe de implementação e não deve ser usada como especificação.', correct: true },
          { id: 'b', text: 'Sim: sempre alfabética por chave.' },
          { id: 'c', text: 'Sim: sempre a ordem de inserção.' },
          { id: 'd', text: 'Sim: sempre a ordem de inserção invertida.' },
        ],
        explanation:
          'Na prática ela costuma coincidir com a inserção enquanto não há remoções, e é justamente por isso que o bug demora a aparecer: o programa funciona por sorte até que pare de funcionar.',
      },
      {
        id: 's03c03l05q2',
        type: 'single',
        prompt: 'Como garantir saída em ordem alfabética de chave?',
        options: [
          { id: 'a', text: 'Copiar as chaves para uma `List`, ordená-la, e percorrer essa lista.', correct: true },
          { id: 'b', text: 'Chamar `precos.Sort()`.' },
          { id: 'c', text: 'Inserir as chaves em ordem alfabética.' },
          { id: 'd', text: 'Usar `foreach` sobre `precos.Keys`.' },
        ],
        explanation:
          '`Dictionary` não tem `Sort`, e a ordem de inserção não é honrada na enumeração. Só a lista intermediária dá controle sobre a ordem.',
      },
      {
        id: 's03c03l05q3',
        type: 'single',
        prompt: 'O que `par.Key` e `par.Value` representam em um `foreach` sobre dicionário?',
        options: [
          { id: 'a', text: 'A chave e o valor da entrada atual.', correct: true },
          { id: 'b', text: 'O índice e o elemento.' },
          { id: 'c', text: 'O primeiro e o último elemento.' },
          { id: 'd', text: 'A quantidade de chaves e de valores.' },
        ],
        explanation:
          'Cada elemento da enumeração é um par completo. É por isso que o `foreach` de dicionário dá acesso aos dois lados de uma vez, sem consulta extra.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` pares nome/valor. Liste todas as entradas em **ordem alfabética de chave** e informe quantas chaves há e a soma de todos os valores.',
      requirements: [
        'Uma linha por entrada, no formato `banana: 7`, em ordem alfabética crescente de chave',
        'Depois: `Chaves: c`',
        'Por último: `Soma dos valores: s`',
        'A ordem alfabética precisa ser produzida explicitamente: não confie na ordem do `foreach`',
        'Chaves repetidas na entrada substituem o valor anterior',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, int> dados = new Dictionary<string, int>();
        for (int i = 0; i < n; i++)
        {
            string chave = Console.ReadLine();
            dados[chave] = int.Parse(Console.ReadLine());
        }

        // Copie as chaves, ordene, e percorra na ordem certa
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, int> dados = new Dictionary<string, int>();
        for (int i = 0; i < n; i++)
        {
            string chave = Console.ReadLine();
            dados[chave] = int.Parse(Console.ReadLine());
        }

        List<string> chaves = new List<string>(dados.Keys);
        chaves.Sort();

        int soma = 0;

        foreach (string chave in chaves)
        {
            Console.WriteLine($"{chave}: {dados[chave]}");
            soma += dados[chave];
        }

        Console.WriteLine($"Chaves: {dados.Count}");
        Console.WriteLine($"Soma dos valores: {soma}");
    }
}
`,
      hints: [
        'A cópia das chaves é `new List<string>(dados.Keys)`, e o `Sort()` da lista faz o resto.',
        'A soma pode ser acumulada dentro do mesmo laço que imprime.',
      ],
      tests: [
        {
          name: 'Três entradas fora de ordem',
          stdin: '3\nuva\n3\nbanana\n7\npera\n5\n',
          expectedStdout: 'banana: 7\npera: 5\nuva: 3\nChaves: 3\nSoma dos valores: 15',
        },
        {
          name: 'Chave repetida substitui',
          stdin: '3\nb\n1\na\n2\nb\n9\n',
          expectedStdout: 'a: 2\nb: 9\nChaves: 2\nSoma dos valores: 11',
        },
        {
          name: 'Uma entrada só',
          stdin: '1\nsozinha\n42\n',
          expectedStdout: 'sozinha: 42\nChaves: 1\nSoma dos valores: 42',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c03l06',
    title: 'Contando frequências',
    objective: 'Aplicar o padrão ler-somar-gravar, o uso mais frequente de dicionário que existe.',
    concept: [
      {
        kind: 'text',
        body:
          'Contar quantas vezes cada coisa aparece é o problema que o dicionário resolve melhor que qualquer outra estrutura. Na Seção 2 você contava **uma** condição por variável; aqui a quantidade de contadores é descoberta durante a execução.',
      },
      {
        kind: 'code',
        code: `Dictionary<string, int> contagem = new Dictionary<string, int>();

foreach (string palavra in palavras)
{
    if (contagem.TryGetValue(palavra, out int atual))
    {
        contagem[palavra] = atual + 1;   // ja vista: incrementa
    }
    else
    {
        contagem[palavra] = 1;           // primeira vez
    }
}`,
        caption: 'Ler, somar, gravar: três passos que resolvem qualquer contagem por categoria.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A tentação é escrever `contagem[palavra] = contagem[palavra] + 1` direto. Isso quebra na **primeira** ocorrência de cada palavra, porque ler uma chave inexistente lança exceção. É exatamente o erro que o `TryGetValue` existe para evitar.',
      },
      {
        kind: 'text',
        body:
          'Existe uma forma mais curta que o .NET oferece para o mesmo padrão, e vale conhecer: `GetValueOrDefault` devolve o valor ou o padrão do tipo, sem lançar nada.',
      },
      {
        kind: 'code',
        code: `// as duas linhas abaixo fazem o mesmo:
contagem[palavra] = contagem.GetValueOrDefault(palavra) + 1;

// versao explicita, com o padrao Try
if (contagem.TryGetValue(palavra, out int atual))
    contagem[palavra] = atual + 1;
else
    contagem[palavra] = 1;`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Como a **ordem** de enumeração de um dicionário não é garantida, a saída deste exercício é comparada sem levar a ordem em conta: qualquer sequência das mesmas linhas passa. Isso reflete a realidade — e é por isso que um relatório de verdade sempre ordena antes de imprimir.',
      },
      {
        kind: 'text',
        body:
          'O mesmo padrão vale para somar em vez de contar: basta trocar o `+ 1` pelo valor que chegou. É o que a próxima lição faz para agrupar totais por categoria.',
      },
    ],
    quiz: [
      {
        id: 's03c03l06q1',
        type: 'single',
        prompt: 'Por que `contagem[p] = contagem[p] + 1` falha?',
        options: [
          { id: 'a', text: 'Porque a leitura do lado direito lança exceção na primeira vez que a palavra aparece.', correct: true },
          { id: 'b', text: 'Porque não se pode ler e gravar a mesma chave na mesma linha.' },
          { id: 'c', text: 'Porque o valor inicial seria `null`.' },
          { id: 'd', text: 'Não falha: é a forma correta.' },
        ],
        explanation:
          'Gravar em chave nova é permitido, mas **ler** de chave nova não é. A expressão da direita é avaliada primeiro, e é ela que quebra.',
      },
      {
        id: 's03c03l06q2',
        type: 'single',
        prompt: 'Com as palavras `banana banana pera`, como fica o dicionário?',
        options: [
          { id: 'a', text: '`banana` com 2 e `pera` com 1.', correct: true },
          { id: 'b', text: '`banana` com 1 e `pera` com 1.' },
          { id: 'c', text: 'Três entradas, uma por palavra lida.' },
          { id: 'd', text: '`banana` com 3.' },
        ],
        explanation:
          'A chave é única, então a segunda `banana` incrementa a entrada existente em vez de criar outra. O `Count` final é 2, não 3.',
      },
      {
        id: 's03c03l06q3',
        type: 'single',
        prompt: 'Como adaptar este padrão para **somar** valores por categoria em vez de contar?',
        options: [
          { id: 'a', text: 'Trocar o `+ 1` pelo valor que chegou.', correct: true },
          { id: 'b', text: 'Usar `Add` em vez do indexador.' },
          { id: 'c', text: 'Trocar o `Dictionary` por uma `List`.' },
          { id: 'd', text: 'Não é possível: contagem e soma são estruturas diferentes.' },
        ],
        explanation:
          'Contar é somar 1 a cada ocorrência. Somar valores é a mesma operação com uma parcela variável — o esqueleto do código é idêntico.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` palavras, uma por linha. Informe quantas vezes cada palavra distinta apareceu, uma linha por palavra.',
      requirements: [
        'Uma linha por palavra distinta, no formato `banana: 3`',
        'A **ordem das linhas não importa**: a saída é comparada como um conjunto',
        'Palavras que aparecem uma vez só também são listadas',
        'A comparação diferencia maiúsculas de minúsculas',
        'Use `TryGetValue` para tratar a primeira ocorrência de cada palavra',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, int> contagem = new Dictionary<string, int>();

        // Leia n palavras e conte cada uma

        // Imprima um par por linha
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, int> contagem = new Dictionary<string, int>();

        for (int i = 0; i < n; i++)
        {
            string palavra = Console.ReadLine();

            if (contagem.TryGetValue(palavra, out int atual))
            {
                contagem[palavra] = atual + 1;
            }
            else
            {
                contagem[palavra] = 1;
            }
        }

        foreach (KeyValuePair<string, int> par in contagem)
        {
            Console.WriteLine($"{par.Key}: {par.Value}");
        }
    }
}
`,
      hints: [
        'O `TryGetValue` distingue "primeira vez" de "já vista", e só isso muda entre os dois ramos.',
        'Para imprimir, um `foreach` sobre o dicionário dá acesso a `par.Key` e `par.Value` de uma vez.',
      ],
      tests: [
        {
          name: 'Palavras com repetições',
          stdin: '6\nbanana\nbanana\npera\nuva\nbanana\npera\n',
          expectedStdout: 'banana: 3\npera: 2\nuva: 1',
          comparison: 'unordered',
        },
        {
          name: 'Uma palavra só',
          stdin: '1\nsozinha\n',
          expectedStdout: 'sozinha: 1',
          comparison: 'unordered',
        },
        {
          name: 'Empate de frequências',
          stdin: '4\na\nb\na\nb\n',
          expectedStdout: 'a: 2\nb: 2',
          comparison: 'unordered',
        },
        {
          name: 'Maiúscula é outra palavra',
          stdin: '3\nCasa\ncasa\nCasa\n',
          expectedStdout: 'Casa: 2\ncasa: 1',
          comparison: 'unordered',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c03l07',
    title: 'Agrupando por chave',
    objective: 'Somar valores por categoria, produzindo um relatório ordenado a partir de dados desordenados.',
    concept: [
      {
        kind: 'text',
        body:
          'Agrupar é contar com uma parcela variável. Em vez de somar 1 por ocorrência, você soma o valor que veio junto — e o dicionário passa a guardar **totais por categoria**.',
      },
      {
        kind: 'code',
        code: `if (totais.TryGetValue(categoria, out int acumulado))
{
    totais[categoria] = acumulado + valor;
}
else
{
    totais[categoria] = valor;
}`,
        caption: 'Idêntico à contagem, trocando o `+ 1` pelo `+ valor`.',
      },
      {
        kind: 'text',
        body:
          'A entrada chega desordenada e misturada; a saída precisa ser um relatório limpo. Esse é o formato de praticamente todo processamento de dados: agrupar, agregar, ordenar, apresentar.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Entrada',
          code: `alimentos    20
transporte   30
alimentos    25
limpeza      20
transporte    0`,
        },
        right: {
          label: 'Saída',
          code: `alimentos: 45
limpeza: 20
transporte: 30`,
        },
        note: 'Cinco lançamentos viram três totais, em ordem alfabética.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O total geral pode ser obtido de dois jeitos: somando os lançamentos conforme chegam, ou somando os totais por categoria no fim. Os dois têm que dar o mesmo número — e comparar os dois é uma verificação barata de que o agrupamento não perdeu nada.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Valores negativos e zeros são lançamentos válidos, não erros. Um estorno de `-5` reduz o total da categoria, e uma categoria pode perfeitamente terminar com total zero — e ainda assim ela existe e deve aparecer no relatório.',
      },
    ],
    quiz: [
      {
        id: 's03c03l07q1',
        type: 'single',
        prompt: 'Qual é a única diferença entre contar frequências e agrupar somas?',
        options: [
          { id: 'a', text: 'A parcela somada: `1` na contagem, o valor lido no agrupamento.', correct: true },
          { id: 'b', text: 'O agrupamento precisa de `Add` em vez do indexador.' },
          { id: 'c', text: 'O agrupamento não pode usar `TryGetValue`.' },
          { id: 'd', text: 'O agrupamento exige chaves numéricas.' },
        ],
        explanation:
          'O esqueleto é o mesmo: ler o acumulado, somar algo, gravar de volta. Contar é o caso particular em que esse "algo" é sempre 1.',
      },
      {
        id: 's03c03l07q2',
        type: 'single',
        prompt: 'Uma categoria recebeu os lançamentos `10` e `-10`. Ela deve aparecer no relatório?',
        options: [
          { id: 'a', text: 'Sim, com total `0`: a categoria existe.', correct: true },
          { id: 'b', text: 'Não: total zero significa ausência.' },
          { id: 'c', text: 'Só se houver outras categorias.' },
          { id: 'd', text: 'O programa deveria recusar o lançamento negativo.' },
        ],
        explanation:
          'A chave foi criada no primeiro lançamento e nunca foi removida. "Existe e vale zero" é diferente de "não existe" — a mesma distinção do `TryGetValue`.',
      },
      {
        id: 's03c03l07q3',
        type: 'single',
        prompt: 'Como verificar rapidamente que o agrupamento não perdeu lançamentos?',
        options: [
          { id: 'a', text: 'A soma dos totais por categoria tem que bater com a soma dos lançamentos.', correct: true },
          { id: 'b', text: 'O número de categorias tem que ser igual ao de lançamentos.' },
          { id: 'c', text: 'Todas as categorias precisam ter total positivo.' },
          { id: 'd', text: 'Não há como verificar sem recalcular tudo.' },
        ],
        explanation:
          'É a invariante do agrupamento: nada é criado nem perdido, só redistribuído. Quando os dois números discordam, algum lançamento caiu na categoria errada ou foi ignorado.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` lançamentos, cada um em duas linhas: a categoria e o valor. Some os valores por categoria e produza o relatório em ordem alfabética de categoria.',
      requirements: [
        'Uma linha por categoria, no formato `alimentos: 45`, em ordem alfabética crescente',
        'Depois: `Categorias: c`',
        'Por último: `Total geral: t`',
        'Valores negativos e zero são lançamentos válidos',
        'Uma categoria com total zero ainda aparece no relatório',
        'A ordem alfabética precisa ser produzida explicitamente',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, int> totais = new Dictionary<string, int>();

        // Acumule o valor de cada lancamento na sua categoria

        // Ordene as chaves e imprima o relatorio
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, int> totais = new Dictionary<string, int>();

        for (int i = 0; i < n; i++)
        {
            string categoria = Console.ReadLine();
            int valor = int.Parse(Console.ReadLine());

            if (totais.TryGetValue(categoria, out int acumulado))
            {
                totais[categoria] = acumulado + valor;
            }
            else
            {
                totais[categoria] = valor;
            }
        }

        List<string> chaves = new List<string>(totais.Keys);
        chaves.Sort();

        int totalGeral = 0;

        foreach (string chave in chaves)
        {
            Console.WriteLine($"{chave}: {totais[chave]}");
            totalGeral += totais[chave];
        }

        Console.WriteLine($"Categorias: {totais.Count}");
        Console.WriteLine($"Total geral: {totalGeral}");
    }
}
`,
      hints: [
        'Cada lançamento ocupa duas linhas: a categoria primeiro, o valor depois.',
        'O total geral pode ser acumulado no mesmo laço que imprime as categorias ordenadas.',
      ],
      tests: [
        {
          name: 'Cinco lançamentos, três categorias',
          stdin: '5\nalimentos\n20\ntransporte\n30\nalimentos\n25\nlimpeza\n20\ntransporte\n0\n',
          expectedStdout:
            'alimentos: 45\nlimpeza: 20\ntransporte: 30\nCategorias: 3\nTotal geral: 95',
        },
        {
          name: 'Uma categoria só',
          stdin: '1\nunica\n7\n',
          expectedStdout: 'unica: 7\nCategorias: 1\nTotal geral: 7',
        },
        {
          name: 'Estorno zera uma categoria',
          stdin: '3\na\n-5\na\n5\nb\n0\n',
          expectedStdout: 'a: 0\nb: 0\nCategorias: 2\nTotal geral: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c03l08',
    title: 'Dicionário de listas',
    objective: 'Guardar vários valores por chave, criando a coleção interna na primeira vez que a chave aparece.',
    concept: [
      {
        kind: 'text',
        body:
          'Chaves são únicas, então não dá para ter duas entradas com a mesma chave. O que dá é fazer o **valor** ser uma coleção: `Dictionary<string, List<string>>` guarda vários alunos por turma, vários telefones por pessoa, vários pedidos por cliente.',
      },
      {
        kind: 'code',
        code: `Dictionary<string, List<string>> turmas =
    new Dictionary<string, List<string>>();

if (!turmas.TryGetValue(turma, out List<string> alunos))
{
    alunos = new List<string>();   // primeira vez: cria
    turmas[turma] = alunos;        // e guarda no dicionario
}

alunos.Add(nome);                  // vale para os dois casos`,
        caption: 'O padrão "pegue ou crie": três linhas que cobrem chave nova e chave existente.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A última linha funciona nos dois casos por causa da semântica de referência. `alunos` aponta para a **mesma** lista guardada no dicionário, então `Add` modifica o que está lá dentro. Não é preciso gravar de novo no dicionário depois.',
      },
      {
        kind: 'compare',
        good: `alunos = new List<string>();
turmas[turma] = alunos;
alunos.Add(nome);`,
        bad: `turmas[turma] = new List<string>();
List<string> copia = new List<string>(turmas[turma]);
copia.Add(nome);`,
        goodLabel: 'Adiciona na lista guardada',
        badLabel: 'Adiciona em uma cópia descartada',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O erro clássico aqui é criar a lista dentro do `if` mas esquecer de gravá-la no dicionário. O programa roda, os `Add` funcionam, e no fim todas as listas do dicionário aparecem vazias — porque nenhuma delas chegou a ser guardada.',
      },
      {
        kind: 'text',
        body:
          'Contar os elementos totais exige somar os `Count` de cada lista. Não existe uma propriedade que dê isso direto: o dicionário sabe quantas **chaves** tem, não quantos itens há espalhados pelos valores.',
      },
    ],
    quiz: [
      {
        id: 's03c03l08q1',
        type: 'single',
        prompt: 'Por que `alunos.Add(nome)` afeta a lista guardada no dicionário?',
        options: [
          { id: 'a', text: 'Porque `List` é tipo por referência: a variável aponta para a mesma lista.', correct: true },
          { id: 'b', text: 'Porque o dicionário sincroniza automaticamente.' },
          { id: 'c', text: 'Porque `Add` grava direto no dicionário.' },
          { id: 'd', text: 'Não afeta: é preciso regravar no dicionário depois.' },
        ],
        explanation:
          'É a mesma semântica que fazia `int[] b = a` criar um apelido. Aqui ela trabalha a favor: você manipula a lista sem precisar recolocá-la no dicionário.',
      },
      {
        id: 's03c03l08q2',
        type: 'single',
        prompt: 'O que acontece se a lista for criada mas não gravada no dicionário?',
        options: [
          { id: 'a', text: 'Os `Add` funcionam, mas o dicionário fica com listas vazias ou sem a chave.', correct: true },
          { id: 'b', text: 'Erro de compilação.' },
          { id: 'c', text: 'Exceção ao adicionar.' },
          { id: 'd', text: 'Nada: o C# grava automaticamente.' },
        ],
        explanation:
          'A lista existe apenas na variável local e é descartada ao fim da volta. É um bug silencioso: nada reclama, e o resultado só aparece errado no relatório final.',
      },
      {
        id: 's03c03l08q3',
        type: 'single',
        prompt: 'Como contar o total de alunos de todas as turmas?',
        options: [
          { id: 'a', text: 'Somando o `Count` de cada lista guardada.', correct: true },
          { id: 'b', text: 'Lendo `turmas.Count`.' },
          { id: 'c', text: 'Lendo `turmas.Values.Count`.' },
          { id: 'd', text: 'Multiplicando `turmas.Count` pela média.' },
        ],
        explanation:
          '`turmas.Count` e `turmas.Values.Count` dão a mesma coisa: a quantidade de **chaves**. O total de itens está espalhado pelas listas e precisa ser somado.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` matrículas, cada uma em duas linhas: a turma e o nome do aluno. Agrupe os alunos por turma e liste as turmas em ordem alfabética, com os alunos na ordem em que foram matriculados.',
      requirements: [
        'Uma linha por turma, no formato `A: Ana Bruno`, com os alunos separados por espaço',
        'As turmas saem em ordem alfabética crescente',
        'Os alunos de cada turma saem na ordem de entrada, não ordenados',
        'Depois: `Turmas: t`',
        'Por último: `Alunos: a`, somando os alunos de todas as turmas',
        'Um mesmo nome pode aparecer em turmas diferentes',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, List<string>> turmas =
            new Dictionary<string, List<string>>();

        // Para cada matricula: pegue a lista da turma, ou crie e guarde

        // Ordene as turmas e liste cada uma
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, List<string>> turmas =
            new Dictionary<string, List<string>>();

        for (int i = 0; i < n; i++)
        {
            string turma = Console.ReadLine();
            string aluno = Console.ReadLine();

            if (!turmas.TryGetValue(turma, out List<string> alunos))
            {
                alunos = new List<string>();
                turmas[turma] = alunos;
            }

            alunos.Add(aluno);
        }

        List<string> chaves = new List<string>(turmas.Keys);
        chaves.Sort();

        int totalAlunos = 0;

        foreach (string chave in chaves)
        {
            List<string> alunos = turmas[chave];

            string linha = "";
            for (int i = 0; i < alunos.Count; i++)
            {
                linha += $"{alunos[i]} ";
            }

            Console.WriteLine($"{chave}: {linha}");
            totalAlunos += alunos.Count;
        }

        Console.WriteLine($"Turmas: {turmas.Count}");
        Console.WriteLine($"Alunos: {totalAlunos}");
    }
}
`,
      hints: [
        'O `!` na frente do `TryGetValue` inverte o teste: o corpo do `if` roda quando a turma é nova.',
        'Depois de `turmas[turma] = alunos;`, todo `Add` na variável já vai para a lista guardada.',
      ],
      tests: [
        {
          name: 'Três turmas fora de ordem',
          stdin: '4\nA\nAna\nB\nCarla\nA\nBruno\nC\nDiego\n',
          expectedStdout: 'A: Ana Bruno\nB: Carla\nC: Diego\nTurmas: 3\nAlunos: 4',
        },
        {
          name: 'Todos na mesma turma',
          stdin: '3\nX\na\nX\nb\nX\nc\n',
          expectedStdout: 'X: a b c\nTurmas: 1\nAlunos: 3',
        },
        {
          name: 'Mesmo nome em turmas diferentes',
          stdin: '3\nB\nAna\nA\nAna\nA\nAna\n',
          expectedStdout: 'A: Ana Ana\nB: Ana\nTurmas: 2\nAlunos: 3',
        },
        {
          name: 'Uma matrícula só',
          stdin: '1\nsozinha\nunico\n',
          expectedStdout: 'sozinha: unico\nTurmas: 1\nAlunos: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c03l09',
    title: 'Prática: contador de palavras',
    objective: 'Processar um texto do começo ao fim: separar, contar, ordenar e identificar o mais frequente com desempate definido.',
    concept: [
      {
        kind: 'text',
        body:
          'Este é o programa que junta o capítulo inteiro com as ferramentas de texto da Seção 1. Ele tem quatro etapas, e cada uma tem uma decisão de projeto.',
      },
      {
        kind: 'table',
        headers: ['Etapa', 'Ferramenta', 'Decisão'],
        rows: [
          ['separar', '`Split(\' \')`', 'o que fazer com pedaços vazios'],
          ['contar', '`TryGetValue`', 'primeira vez contra repetição'],
          ['ordenar', 'lista de chaves + `Sort`', 'a ordem é parte da saída'],
          ['achar o maior', 'comparação com `>`', 'como desempatar'],
        ],
      },
      {
        kind: 'code',
        code: `foreach (string palavra in texto.Split(' '))
{
    if (palavra.Length == 0) continue;   // espacos duplicados
    // ... conta
}`,
        caption: '`Split` produz pedaços vazios quando há espaços seguidos; o `continue` os descarta.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Duas palavras podem empatar na frequência, e nesse caso o enunciado **precisa** dizer quem ganha. Aqui a regra é: a primeira em ordem alfabética. Sem essa regra, o resultado dependeria da ordem de enumeração do dicionário — que não é garantida.',
      },
      {
        kind: 'text',
        body:
          'O desempate cai de graça se você procurar o máximo percorrendo as chaves **já ordenadas** e comparando com `>` estrito: a primeira palavra a atingir a frequência máxima é a que fica registrada.',
      },
      {
        kind: 'code',
        code: `foreach (string chave in chavesOrdenadas)
{
    if (contagem[chave] > melhorContagem)
    {
        melhorContagem = contagem[chave];
        melhorPalavra = chave;      // empate nao substitui
    }
}`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'É a mesma assimetria de `>` contra `>=` que apareceu na busca do máximo, na primeira ocorrência em uma string e na maior sequência repetida. Sempre que uma comparação decide entre manter e substituir, é o operador que escolhe entre o primeiro e o último.',
      },
    ],
    quiz: [
      {
        id: 's03c03l09q1',
        type: 'single',
        prompt: 'Por que descartar os pedaços vazios do `Split`?',
        options: [
          { id: 'a', text: 'Porque espaços seguidos produzem pedaços vazios, que não são palavras.', correct: true },
          { id: 'b', text: 'Porque `Split` sempre devolve um vazio no fim.' },
          { id: 'c', text: 'Porque strings vazias não podem ser chave de dicionário.' },
          { id: 'd', text: 'Não é preciso descartar.' },
        ],
        explanation:
          'Uma string vazia é uma chave perfeitamente válida — e é justamente esse o problema: sem o descarte, ela apareceria no relatório como se fosse uma palavra.',
      },
      {
        id: 's03c03l09q2',
        type: 'single',
        prompt: 'Duas palavras empatam com 2 ocorrências: `o` e `rato`. Qual é a mais frequente pela regra desta lição?',
        options: [
          { id: 'a', code: 'o', correct: true },
          { id: 'b', code: 'rato' },
          { id: 'c', text: 'As duas devem ser informadas.' },
          { id: 'd', text: 'Depende da ordem em que apareceram no texto.' },
        ],
        explanation:
          'O desempate é alfabético, e `o` vem antes de `rato`. Depender da ordem do texto ou da enumeração do dicionário tornaria a resposta imprevisível.',
      },
      {
        id: 's03c03l09q3',
        type: 'single',
        prompt: 'Como o desempate alfabético sai "de graça"?',
        options: [
          { id: 'a', text: 'Percorrendo as chaves já ordenadas e comparando com `>` estrito.', correct: true },
          { id: 'b', text: 'Ordenando o dicionário com `Sort`.' },
          { id: 'c', text: 'Comparando com `>=` para pegar a última.' },
          { id: 'd', text: 'Guardando todas as palavras empatadas em uma lista.' },
        ],
        explanation:
          'Se a varredura já está em ordem alfabética, a primeira a atingir o máximo é a alfabeticamente menor. O `>` estrito impede que uma empatada posterior tome o lugar dela.',
      },
    ],
    challenge: {
      brief:
        'Leia uma linha de texto com palavras separadas por espaço. Conte a frequência de cada palavra, liste todas em ordem alfabética, e informe o total de palavras, quantas são distintas e qual é a mais frequente.',
      requirements: [
        'Uma linha por palavra distinta, no formato `rato: 2`, em ordem alfabética crescente',
        'Depois: `Palavras: p`, o total de palavras do texto',
        'Depois: `Distintas: d`',
        'Por último: `Mais frequente: o (2)`, com a palavra e a contagem entre parênteses',
        'Em caso de empate na frequência, vence a primeira em ordem alfabética',
        'Pedaços vazios produzidos por espaços seguidos não contam como palavra',
        'A comparação diferencia maiúsculas de minúsculas',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        string texto = Console.ReadLine();

        Dictionary<string, int> contagem = new Dictionary<string, int>();
        int totalPalavras = 0;

        // Separe, descarte os vazios, e conte

        // Ordene as chaves, liste, e ache a mais frequente
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        string texto = Console.ReadLine();

        Dictionary<string, int> contagem = new Dictionary<string, int>();
        int totalPalavras = 0;

        foreach (string palavra in texto.Split(' '))
        {
            if (palavra.Length == 0)
            {
                continue;
            }

            totalPalavras++;

            if (contagem.TryGetValue(palavra, out int atual))
            {
                contagem[palavra] = atual + 1;
            }
            else
            {
                contagem[palavra] = 1;
            }
        }

        List<string> chaves = new List<string>(contagem.Keys);
        chaves.Sort();

        string melhorPalavra = "";
        int melhorContagem = 0;

        foreach (string chave in chaves)
        {
            Console.WriteLine($"{chave}: {contagem[chave]}");

            if (contagem[chave] > melhorContagem)
            {
                melhorContagem = contagem[chave];
                melhorPalavra = chave;
            }
        }

        Console.WriteLine($"Palavras: {totalPalavras}");
        Console.WriteLine($"Distintas: {contagem.Count}");
        Console.WriteLine($"Mais frequente: {melhorPalavra} ({melhorContagem})");
    }
}
`,
      hints: [
        'O laço que imprime as chaves ordenadas pode, na mesma volta, procurar a mais frequente.',
        'A comparação `>` estrita é o que faz o empate ficar com a palavra alfabeticamente menor.',
      ],
      tests: [
        {
          name: 'Texto com duas palavras repetidas',
          stdin: 'o rato roeu a roupa do rei de roma o rato\n',
          expectedStdout:
            'a: 1\nde: 1\ndo: 1\no: 2\nrato: 2\nrei: 1\nroeu: 1\nroma: 1\nroupa: 1\n' +
            'Palavras: 11\nDistintas: 9\nMais frequente: o (2)',
        },
        {
          name: 'Empate resolvido pela ordem alfabética',
          stdin: 'b b a a c\n',
          expectedStdout:
            'a: 2\nb: 2\nc: 1\nPalavras: 5\nDistintas: 3\nMais frequente: a (2)',
        },
        {
          name: 'Uma palavra repetida',
          stdin: 'a a a\n',
          expectedStdout: 'a: 3\nPalavras: 3\nDistintas: 1\nMais frequente: a (3)',
        },
        {
          name: 'Palavra única',
          stdin: 'unica\n',
          expectedStdout: 'unica: 1\nPalavras: 1\nDistintas: 1\nMais frequente: unica (1)',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c03l10',
    title: 'Checkpoint: dicionários',
    objective: 'Manter o estado de um sistema por comandos validados, respondendo com um relatório ordenado e consistente.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint constrói um controle de estoque. Cada comando altera o estado, e cada alteração precisa ser validada **antes** de acontecer — porque um estoque negativo é um erro que se propaga silenciosamente.',
      },
      {
        kind: 'code',
        code: `string[] partes = linha.Split(' ');

if (partes.Length != 3) { rejeitados++; continue; }

string verbo = partes[0];
string produto = partes[1];

if (!int.TryParse(partes[2], out int qtd) || qtd <= 0)
{
    rejeitados++;
    continue;
}`,
        caption: 'Validar o formato, depois o conteúdo, e só então tocar no estado.',
      },
      {
        kind: 'table',
        headers: ['Comando', 'Aceito quando', 'Efeito'],
        rows: [
          ['`entrada p q`', 'sempre, com `q` positivo', 'soma `q` ao estoque de `p`'],
          ['`saida p q`', '`p` existe e tem `q` ou mais', 'subtrai `q`'],
          ['qualquer outro', 'nunca', 'rejeitado'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Uma `saida` de produto inexistente e uma `saida` maior que o estoque são **as duas** rejeições, e por motivos diferentes: uma é chave ausente, a outra é regra de negócio. O `TryGetValue` resolve a primeira, e a comparação resolve a segunda — nessa ordem.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um produto cujo estoque chega a zero **continua existindo** no dicionário. Isso é intencional: ele foi cadastrado, apenas está esgotado. Removê-lo faria o relatório esconder que ele existe, e permitiria uma `saida` posterior ser rejeitada pelo motivo errado.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Monte em quatro passos, rodando os testes a cada um: primeiro só o laço que lê até `fim` e conta rejeições de formato; depois a `entrada`; depois a `saida` com as duas validações; e por último o relatório ordenado.',
      },
    ],
    quiz: [
      {
        id: 's03c03l10q1',
        type: 'single',
        prompt: 'Uma `saida` pede 9 unidades de um produto que tem 5. O que deve acontecer?',
        options: [
          { id: 'a', text: 'A operação é rejeitada e o estoque não muda.', correct: true },
          { id: 'b', text: 'O estoque vai para -4.' },
          { id: 'c', text: 'Saem as 5 disponíveis.' },
          { id: 'd', text: 'O produto é removido do dicionário.' },
        ],
        explanation:
          'Uma saída parcial silenciosa seria pior que a rejeição: os números do relatório deixariam de bater com os comandos aceitos, e nada avisaria.',
      },
      {
        id: 's03c03l10q2',
        type: 'single',
        prompt: 'Por que um produto com estoque zero continua no dicionário?',
        options: [
          { id: 'a', text: 'Porque ele existe: esgotado é diferente de não cadastrado.', correct: true },
          { id: 'b', text: 'Porque `Remove` não funciona com valor zero.' },
          { id: 'c', text: 'Por questão de desempenho.' },
          { id: 'd', text: 'Ele não continua: deve ser removido.' },
        ],
        explanation:
          'É a mesma distinção que o `TryGetValue` faz entre "chave ausente" e "chave com valor zero". Apagá-lo perderia informação e mudaria o motivo de rejeições futuras.',
      },
      {
        id: 's03c03l10q3',
        type: 'multiple',
        prompt: 'Quais linhas devem ser rejeitadas?',
        options: [
          { id: 'a', text: '`xyz`', correct: true },
          { id: 'b', text: '`entrada b abc`', correct: true },
          { id: 'c', text: '`entrada x 0`', correct: true },
          { id: 'd', text: '`entrada arroz 10`' },
        ],
        explanation:
          'A primeira não tem três partes, a segunda tem quantidade não numérica, e a terceira tem quantidade não positiva. Só a última é um comando completo e válido.',
      },
    ],
    challenge: {
      brief:
        'Controle um estoque por comandos. Leia linhas até a palavra `fim`. Cada linha válida tem três partes separadas por espaço: `entrada <produto> <qtd>` acrescenta ao estoque, e `saida <produto> <qtd>` retira. Uma saída só é aceita se o produto existe e tem quantidade suficiente. Qualquer outra linha é rejeitada.',
      requirements: [
        'Uma linha por produto, no formato `arroz: 9`, em ordem alfabética crescente',
        'Depois: `Produtos: p`',
        'Depois: `Total em estoque: t`',
        'Depois: `Aceitos: a`',
        'Por último: `Rejeitados: r`',
        'A quantidade precisa ser um inteiro **maior que zero**',
        'Linhas que não têm exatamente três partes são rejeitadas',
        'Uma saída de produto inexistente ou com estoque insuficiente é rejeitada e não altera nada',
        'Um produto com estoque zero continua aparecendo no relatório',
        'O programa não pode encerrar com exceção',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Dictionary<string, int> estoque = new Dictionary<string, int>();

        int aceitos = 0;
        int rejeitados = 0;

        string linha = Console.ReadLine();

        // Valide formato, depois conteudo, e so entao altere o estoque

        // Relatorio ordenado por produto
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Dictionary<string, int> estoque = new Dictionary<string, int>();

        int aceitos = 0;
        int rejeitados = 0;

        string linha = Console.ReadLine();

        while (linha != "fim")
        {
            string[] partes = linha.Split(' ');

            if (partes.Length != 3)
            {
                rejeitados++;
                linha = Console.ReadLine();
                continue;
            }

            string verbo = partes[0];
            string produto = partes[1];

            if (!int.TryParse(partes[2], out int quantidade) || quantidade <= 0)
            {
                rejeitados++;
                linha = Console.ReadLine();
                continue;
            }

            if (verbo == "entrada")
            {
                if (estoque.TryGetValue(produto, out int atual))
                {
                    estoque[produto] = atual + quantidade;
                }
                else
                {
                    estoque[produto] = quantidade;
                }

                aceitos++;
            }
            else if (verbo == "saida"
                && estoque.TryGetValue(produto, out int disponivel)
                && disponivel >= quantidade)
            {
                estoque[produto] = disponivel - quantidade;
                aceitos++;
            }
            else
            {
                rejeitados++;
            }

            linha = Console.ReadLine();
        }

        List<string> produtos = new List<string>(estoque.Keys);
        produtos.Sort();

        int total = 0;

        foreach (string produto in produtos)
        {
            Console.WriteLine($"{produto}: {estoque[produto]}");
            total += estoque[produto];
        }

        Console.WriteLine($"Produtos: {estoque.Count}");
        Console.WriteLine($"Total em estoque: {total}");
        Console.WriteLine($"Aceitos: {aceitos}");
        Console.WriteLine($"Rejeitados: {rejeitados}");
    }
}
`,
      hints: [
        'Cada `continue` precisa ler a próxima linha antes de saltar, senão o laço trava na mesma linha inválida.',
        'A condição da `saida` encadeia três testes com `&&`: o verbo, a existência do produto, e o estoque suficiente. O curto-circuito garante a ordem segura.',
      ],
      tests: [
        {
          name: 'Movimentos válidos e rejeitados',
          stdin: 'entrada arroz 10\nentrada feijao 5\nsaida arroz 3\nsaida feijao 9\nentrada arroz 2\nxyz\nsaida acucar 1\nfim\n',
          expectedStdout:
            'arroz: 9\nfeijao: 5\nProdutos: 2\nTotal em estoque: 14\nAceitos: 4\nRejeitados: 3',
        },
        {
          name: 'Produto esgotado continua listado',
          stdin: 'entrada leite 1\nsaida leite 1\nfim\n',
          expectedStdout:
            'leite: 0\nProdutos: 1\nTotal em estoque: 0\nAceitos: 2\nRejeitados: 0',
        },
        {
          name: 'Saída de estoque zerado e quantidade não numérica',
          stdin: 'entrada a 5\nsaida a 5\nsaida a 1\nentrada b abc\nfim\n',
          expectedStdout:
            'a: 0\nProdutos: 1\nTotal em estoque: 0\nAceitos: 2\nRejeitados: 2',
        },
        {
          name: 'Quantidades não positivas são rejeitadas',
          stdin: 'entrada x -3\nentrada x 0\nentrada x 4\nfim\n',
          expectedStdout:
            'x: 4\nProdutos: 1\nTotal em estoque: 4\nAceitos: 1\nRejeitados: 2',
        },
        {
          name: 'Nenhum comando',
          stdin: 'fim\n',
          expectedStdout:
            'Produtos: 0\nTotal em estoque: 0\nAceitos: 0\nRejeitados: 0',
          hidden: true,
        },
      ],
    },
  },
]
