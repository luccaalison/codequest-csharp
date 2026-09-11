import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's04c06l01',
    title: 'GroupBy',
    objective: 'Agrupar elementos por uma chave e agregar cada grupo, substituindo o dicionário de listas por uma consulta.',
    concept: [
      {
        kind: 'text',
        body:
          'Na Seção 3 você agrupou dados com um `Dictionary<string, List<T>>` e o padrão "pegue ou crie". O `GroupBy` faz isso em uma linha, e devolve uma sequência de grupos.',
      },
      {
        kind: 'code',
        code: `var porRegiao = vendas.GroupBy(v => v.Regiao);

foreach (var grupo in porRegiao)
{
    Console.WriteLine($"{grupo.Key}: {grupo.Count()} vendas");
}`,
        caption: 'Cada grupo tem uma `Key` e é ele próprio uma sequência dos elementos daquele grupo.',
      },
      {
        kind: 'text',
        body:
          'Um grupo é ao mesmo tempo uma chave e uma coleção. Isso significa que todos os operadores que você já conhece funcionam **dentro** dele: `Count`, `Sum`, `Max`, `OrderBy`.',
      },
      {
        kind: 'code',
        code: `var resumo = vendas
    .GroupBy(v => v.Regiao)
    .Select(g => new
    {
        Regiao = g.Key,
        Total = g.Sum(v => v.Valor),
        Maior = g.Max(v => v.Valor)
    })
    .OrderBy(r => r.Regiao);`,
        caption: 'Agrupar, agregar cada grupo, e ordenar o resultado.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A **ordem dos grupos** não é garantida por contrato, exatamente como a enumeração de um `Dictionary`. Se a saída precisa ser estável, ordene explicitamente pela chave — como você fazia na Seção 3.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A vantagem sobre o dicionário de listas não é só a brevidade: é que o agrupamento vira uma **expressão**, e pode ser encadeado com filtros e ordenações sem variáveis intermediárias.',
      },
      {
        kind: 'text',
        body:
          'O `new { ... }` do exemplo cria um **tipo anônimo** — um objeto com propriedades nomeadas, sem declarar uma classe. Ele é conveniente dentro de uma consulta, e uma tupla nomeada resolve o mesmo caso.',
      },
    ],
    quiz: [
      {
        id: 's04c06l01q1',
        type: 'single',
        prompt: 'O que cada elemento devolvido por `GroupBy` contém?',
        options: [
          { id: 'a', text: 'Uma `Key` e a coleção dos elementos daquele grupo.', correct: true },
          { id: 'b', text: 'Apenas a chave.' },
          { id: 'c', text: 'Apenas a contagem.' },
          { id: 'd', text: 'Um par com o primeiro e o último elemento.' },
        ],
        explanation:
          'O grupo é enumerável, então dá para aplicar qualquer agregador nele — é isso que permite calcular totais por grupo em uma linha.',
      },
      {
        id: 's04c06l01q2',
        type: 'single',
        prompt: 'A ordem dos grupos devolvidos é garantida?',
        options: [
          { id: 'a', text: 'Não: se a saída precisa ser estável, ordene pela chave.', correct: true },
          { id: 'b', text: 'Sim: sempre alfabética.' },
          { id: 'c', text: 'Sim: sempre a ordem de primeira aparição.' },
          { id: 'd', text: 'Sim: sempre por tamanho do grupo.' },
        ],
        explanation:
          'É a mesma regra do `Dictionary` da Seção 3: a ordem pode coincidir com a de aparição na prática, mas isso não é contrato.',
      },
      {
        id: 's04c06l01q3',
        type: 'single',
        prompt: 'Qual é a vantagem de `GroupBy` sobre o dicionário de listas?',
        options: [
          { id: 'a', text: 'O agrupamento vira uma expressão encadeável, sem estrutura intermediária.', correct: true },
          { id: 'b', text: 'É mais rápido.' },
          { id: 'c', text: 'Permite chaves repetidas.' },
          { id: 'd', text: 'Garante a ordem dos grupos.' },
        ],
        explanation:
          'O dicionário exige criar, preencher e depois percorrer. O `GroupBy` produz o resultado diretamente, e ele pode continuar sendo transformado na mesma cadeia.',
      },
    ],
    challenge: {
      brief:
        'Agrupe vendas por região com `GroupBy` e produza um resumo com contagem, total e maior venda de cada grupo.',
      requirements: [
        'Declare um `record Venda(string Vendedor, string Regiao, int Valor)` fora da classe',
        'Leia `n` vendas, cada uma em três linhas',
        'Uma linha por região, no formato `Sul: 2 vendas, total 800, maior 500`',
        'As regiões saem em ordem alfabética',
        'Depois: `Regioes: k`',
        'Por último: `Maior grupo: nome (q)`, a região com mais vendas e a quantidade',
        'Em empate na quantidade, vale a região alfabeticamente menor',
        'A entrada sempre tem pelo menos uma venda',
        'Use `GroupBy`, sem dicionários',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

record Venda(string Vendedor, string Regiao, int Valor);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Venda> vendas = new List<Venda>();
        for (int i = 0; i < n; i++)
        {
            string vendedor = Console.ReadLine();
            string regiao = Console.ReadLine();
            int valor = int.Parse(Console.ReadLine());
            vendas.Add(new Venda(vendedor, regiao, valor));
        }

        // Agrupe por regiao e agregue cada grupo
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Venda(string Vendedor, string Regiao, int Valor);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Venda> vendas = new List<Venda>();
        for (int i = 0; i < n; i++)
        {
            string vendedor = Console.ReadLine();
            string regiao = Console.ReadLine();
            int valor = int.Parse(Console.ReadLine());
            vendas.Add(new Venda(vendedor, regiao, valor));
        }

        var grupos = vendas.GroupBy(v => v.Regiao).OrderBy(g => g.Key).ToList();

        foreach (var grupo in grupos)
        {
            Console.WriteLine(
                $"{grupo.Key}: {grupo.Count()} vendas, total {grupo.Sum(v => v.Valor)}, " +
                $"maior {grupo.Max(v => v.Valor)}");
        }

        Console.WriteLine($"Regioes: {grupos.Count}");

        var maiorGrupo = grupos.OrderByDescending(g => g.Count()).ThenBy(g => g.Key).First();

        Console.WriteLine($"Maior grupo: {maiorGrupo.Key} ({maiorGrupo.Count()})");
    }
}
`,
      hints: [
        'Materialize os grupos com `ToList()`: eles são percorridos várias vezes.',
        'O maior grupo ordena por contagem decrescente e desempata por chave com `ThenBy`.',
      ],
      tests: [
        {
          name: 'Três regiões',
          stdin: '5\nAna\nSul\n300\nBruno\nNorte\n150\nCarla\nSul\n500\nDiego\nLeste\n80\nAna\nNorte\n250\n',
          expectedStdout:
            'Leste: 1 vendas, total 80, maior 80\nNorte: 2 vendas, total 400, maior 250\n' +
            'Sul: 2 vendas, total 800, maior 500\nRegioes: 3\nMaior grupo: Norte (2)',
        },
        {
          name: 'Uma região só',
          stdin: '2\nX\nUnica\n100\nY\nUnica\n200\n',
          expectedStdout:
            'Unica: 2 vendas, total 300, maior 200\nRegioes: 1\nMaior grupo: Unica (2)',
        },
        {
          name: 'Uma venda por região',
          stdin: '2\nA\nZeta\n10\nB\nAlfa\n20\n',
          expectedStdout:
            'Alfa: 1 vendas, total 20, maior 20\nZeta: 1 vendas, total 10, maior 10\n' +
            'Regioes: 2\nMaior grupo: Alfa (1)',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c06l02',
    title: 'Join',
    objective: 'Cruzar duas coleções por uma chave comum, combinando informações que estavam separadas.',
    concept: [
      {
        kind: 'text',
        body:
          'Dados costumam vir separados: uma lista de pedidos com o código do cliente, e outra lista com os dados de cada cliente. O `Join` combina as duas pela chave comum.',
      },
      {
        kind: 'code',
        code: `var resultado = pedidos.Join(
    clientes,                    // a outra colecao
    p => p.ClienteId,            // chave do lado esquerdo
    c => c.Id,                   // chave do lado direito
    (p, c) => $"{c.Nome}: {p.Valor}");   // o que produzir com o par`,
        caption: 'Quatro argumentos: a coleção, as duas chaves, e como combinar.',
      },
      {
        kind: 'text',
        body:
          'A ordem dos argumentos é sempre essa, e vale memorizar: **coleção, chave de fora, chave de dentro, resultado**. Trocar as duas chaves de lugar é o erro mais comum, e produz uma sequência vazia em vez de um erro.',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Resultado'],
        rows: [
          ['chave existe nos dois lados', 'entra no resultado'],
          ['chave só à esquerda', '**descartada**'],
          ['chave só à direita', '**descartada**'],
          ['chave repetida à direita', 'uma linha por combinação'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O `Join` é uma junção **interna**: elementos sem correspondência do outro lado desaparecem silenciosamente. Um pedido cujo cliente foi apagado some do relatório, sem nenhum aviso — o que pode esconder um problema nos dados.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Quando você precisa manter os elementos sem correspondência, o caminho é `GroupJoin` combinado com `DefaultIfEmpty`, o equivalente a um `LEFT JOIN` de SQL. É um recurso avançado e raramente necessário em código de aplicação.',
      },
      {
        kind: 'text',
        body:
          'Uma alternativa mais simples para o mesmo problema: construir um `Dictionary` a partir de uma das coleções e consultá-lo durante a projeção da outra. É mais verboso e às vezes mais claro.',
      },
    ],
    quiz: [
      {
        id: 's04c06l02q1',
        type: 'single',
        prompt: 'Qual é a ordem dos argumentos de `Join`?',
        options: [
          { id: 'a', text: 'Coleção, chave externa, chave interna, resultado.', correct: true },
          { id: 'b', text: 'Coleção, resultado, chave externa, chave interna.' },
          { id: 'c', text: 'Chave externa, chave interna, coleção, resultado.' },
          { id: 'd', text: 'A ordem é livre.' },
        ],
        explanation:
          'A primeira chave é sempre da coleção sobre a qual você chamou o `Join`. Inverter as duas produz uma sequência vazia, sem erro de compilação.',
      },
      {
        id: 's04c06l02q2',
        type: 'single',
        prompt: 'O que acontece com um pedido cujo cliente não existe na outra lista?',
        options: [
          { id: 'a', text: 'Ele é descartado silenciosamente.', correct: true },
          { id: 'b', text: 'Ele aparece com o nome vazio.' },
          { id: 'c', text: 'Lança exceção.' },
          { id: 'd', text: 'Ele aparece com `null` no lugar do cliente.' },
        ],
        explanation:
          '`Join` é uma junção interna: só o que casa dos dois lados entra. É por isso que uma soma pode dar menos do que se espera sem nenhum sinal de erro.',
      },
      {
        id: 's04c06l02q3',
        type: 'single',
        prompt: 'O que acontece se a chave aparecer duas vezes na coleção da direita?',
        options: [
          { id: 'a', text: 'Uma linha é produzida para cada combinação.', correct: true },
          { id: 'b', text: 'Apenas a primeira é usada.' },
          { id: 'c', text: 'Lança exceção por ambiguidade.' },
          { id: 'd', text: 'A linha é descartada.' },
        ],
        explanation:
          'O `Join` produz o produto das correspondências. Chaves duplicadas onde se esperava unicidade são uma fonte clássica de resultados inflados.',
      },
    ],
    challenge: {
      brief:
        'Cruze uma lista de pedidos com uma lista de clientes usando `Join`, e detecte os pedidos que ficaram órfãos.',
      requirements: [
        'Declare `record Cliente(int Id, string Nome)` e `record Pedido(int ClienteId, int Valor)` fora da classe',
        'Leia `c` clientes, cada um em duas linhas, e depois `p` pedidos, cada um em duas linhas',
        'Uma linha por pedido cruzado, no formato `Ana: 150`, na ordem em que os pedidos foram lidos',
        'Depois: `Cruzados: k`',
        'Depois: `Orfaos: o`, os pedidos cujo cliente não existe',
        'Por último: `Valor cruzado: X`, somando só os pedidos que casaram',
        'Use `Join` para o cruzamento',
        'Os órfãos podem ser detectados comparando as contagens',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

record Cliente(int Id, string Nome);
record Pedido(int ClienteId, int Valor);

class Program
{
    static void Main()
    {
        int c = int.Parse(Console.ReadLine());

        List<Cliente> clientes = new List<Cliente>();
        for (int i = 0; i < c; i++)
        {
            int id = int.Parse(Console.ReadLine());
            string nome = Console.ReadLine();
            clientes.Add(new Cliente(id, nome));
        }

        int p = int.Parse(Console.ReadLine());

        List<Pedido> pedidos = new List<Pedido>();
        for (int i = 0; i < p; i++)
        {
            int clienteId = int.Parse(Console.ReadLine());
            int valor = int.Parse(Console.ReadLine());
            pedidos.Add(new Pedido(clienteId, valor));
        }

        // Cruze com Join e detecte os orfaos
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Cliente(int Id, string Nome);
record Pedido(int ClienteId, int Valor);

class Program
{
    static void Main()
    {
        int c = int.Parse(Console.ReadLine());

        List<Cliente> clientes = new List<Cliente>();
        for (int i = 0; i < c; i++)
        {
            int id = int.Parse(Console.ReadLine());
            string nome = Console.ReadLine();
            clientes.Add(new Cliente(id, nome));
        }

        int p = int.Parse(Console.ReadLine());

        List<Pedido> pedidos = new List<Pedido>();
        for (int i = 0; i < p; i++)
        {
            int clienteId = int.Parse(Console.ReadLine());
            int valor = int.Parse(Console.ReadLine());
            pedidos.Add(new Pedido(clienteId, valor));
        }

        var cruzados = pedidos.Join(
            clientes,
            pedido => pedido.ClienteId,
            cliente => cliente.Id,
            (pedido, cliente) => new { cliente.Nome, pedido.Valor }).ToList();

        foreach (var item in cruzados)
        {
            Console.WriteLine($"{item.Nome}: {item.Valor}");
        }

        Console.WriteLine($"Cruzados: {cruzados.Count}");
        Console.WriteLine($"Orfaos: {pedidos.Count - cruzados.Count}");
        Console.WriteLine($"Valor cruzado: {cruzados.Sum(x => x.Valor)}");
    }
}
`,
      hints: [
        'A primeira lambda de chave extrai do **pedido**, porque foi nele que o `Join` foi chamado.',
        'Os órfãos são a diferença entre o total de pedidos e o total cruzado — supondo ids de cliente únicos.',
      ],
      tests: [
        {
          name: 'Um pedido órfão',
          stdin: '2\n1\nAna\n2\nBruno\n4\n1\n150\n2\n80\n1\n200\n9\n500\n',
          expectedStdout:
            'Ana: 150\nBruno: 80\nAna: 200\nCruzados: 3\nOrfaos: 1\nValor cruzado: 430',
        },
        {
          name: 'Todos cruzam',
          stdin: '1\n5\nSolo\n2\n5\n10\n5\n20\n',
          expectedStdout:
            'Solo: 10\nSolo: 20\nCruzados: 2\nOrfaos: 0\nValor cruzado: 30',
        },
        {
          name: 'Nenhum cruza',
          stdin: '1\n1\nX\n2\n7\n100\n8\n200\n',
          expectedStdout: 'Cruzados: 0\nOrfaos: 2\nValor cruzado: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c06l03',
    title: 'SelectMany',
    objective: 'Achatar uma coleção de coleções em uma sequência única, com um operador em vez de dois laços.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando cada elemento contém uma coleção — um pedido com vários itens, uma turma com vários alunos —, `Select` produz uma sequência **de coleções**. O `SelectMany` produz uma sequência dos elementos internos.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Select: aninha',
          code: `pedidos.Select(p => p.Itens)

// sequencia de listas:
// [ [a, b], [c], [d, e] ]`,
        },
        right: {
          label: 'SelectMany: achata',
          code: `pedidos.SelectMany(p => p.Itens)

// sequencia de itens:
// [ a, b, c, d, e ]`,
        },
      },
      {
        kind: 'text',
        body:
          'Depois de achatar, todos os operadores que você conhece voltam a funcionar diretamente sobre os elementos internos — contar, somar, filtrar, agrupar.',
      },
      {
        kind: 'code',
        code: `int totalItens = pedidos.SelectMany(p => p.Itens).Count();

var produtosDistintos = pedidos
    .SelectMany(p => p.Itens)
    .Select(i => i.Produto)
    .Distinct();`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O `SelectMany` substitui exatamente o par de laços aninhados: o externo percorrendo os pedidos, o interno percorrendo os itens. Sempre que você escrever esse par só para juntar tudo, o operador resolve em uma linha.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Uma coleção interna vazia simplesmente não contribui com nada — não gera erro nem um elemento nulo. É o comportamento certo, mas significa que um pedido sem itens desaparece do resultado achatado.',
      },
      {
        kind: 'text',
        body:
          'Existe uma sobrecarga que também dá acesso ao elemento externo: `SelectMany(p => p.Itens, (p, i) => ...)`. Ela é útil quando o resultado precisa combinar dados dos dois níveis.',
      },
    ],
    quiz: [
      {
        id: 's04c06l03q1',
        type: 'single',
        prompt: 'Qual é a diferença entre `Select(p => p.Itens)` e `SelectMany(p => p.Itens)`?',
        options: [
          { id: 'a', text: 'O primeiro devolve uma sequência de listas; o segundo, uma sequência de itens.', correct: true },
          { id: 'b', text: 'São equivalentes.' },
          { id: 'c', text: 'O segundo remove duplicatas.' },
          { id: 'd', text: 'O segundo ordena os itens.' },
        ],
        explanation:
          'O `SelectMany` concatena todas as coleções internas em uma só. É a diferença entre uma lista de listas e uma lista simples.',
      },
      {
        id: 's04c06l03q2',
        type: 'single',
        prompt: 'O que `SelectMany` substitui no código imperativo?',
        options: [
          { id: 'a', text: 'Um par de laços aninhados que junta todos os elementos internos.', correct: true },
          { id: 'b', text: 'Um laço com `if`.' },
          { id: 'c', text: 'Uma ordenação.' },
          { id: 'd', text: 'Um dicionário.' },
        ],
        explanation:
          'O laço externo percorre a coleção de fora, o interno a de dentro, e tudo vai para uma lista única. É exatamente o que o operador faz.',
      },
      {
        id: 's04c06l03q3',
        type: 'single',
        prompt: 'O que acontece com um elemento cuja coleção interna está vazia?',
        options: [
          { id: 'a', text: 'Ele não contribui com nada para o resultado.', correct: true },
          { id: 'b', text: 'Ele contribui com um elemento nulo.' },
          { id: 'c', text: 'Lança exceção.' },
          { id: 'd', text: 'Ele é contado como um elemento vazio.' },
        ],
        explanation:
          'Concatenar uma coleção vazia não acrescenta nada. É o comportamento correto, mas vale lembrar que o pedido em si some do resultado achatado.',
      },
    ],
    challenge: {
      brief:
        'Achate uma coleção de pedidos com itens usando `SelectMany`, e produza estatísticas sobre os itens individuais.',
      requirements: [
        'Declare um `record Item(string Produto, int Quantidade)` fora da classe',
        'Leia `n` pedidos; cada pedido começa com a quantidade de itens, seguida dos itens em duas linhas cada',
        'Linha 1: `Total de itens: k`, contando os itens de todos os pedidos',
        'Linha 2: `Quantidade total: q`, somando as quantidades',
        'Linha 3: `Produtos distintos: a b c`, em ordem alfabética',
        'Linha 4: `Pedidos vazios: v`',
        'Linha 5: `Item mais pedido: nome (q)`, o produto com a maior quantidade somada',
        'Em empate, vale o produto alfabeticamente menor',
        'A entrada sempre tem pelo menos um item no total',
        'Use `SelectMany`, sem laços aninhados de processamento',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

record Item(string Produto, int Quantidade);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<List<Item>> pedidos = new List<List<Item>>();

        for (int i = 0; i < n; i++)
        {
            int q = int.Parse(Console.ReadLine());
            List<Item> itens = new List<Item>();

            for (int j = 0; j < q; j++)
            {
                string produto = Console.ReadLine();
                int quantidade = int.Parse(Console.ReadLine());
                itens.Add(new Item(produto, quantidade));
            }

            pedidos.Add(itens);
        }

        // Achate com SelectMany e agregue
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Item(string Produto, int Quantidade);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<List<Item>> pedidos = new List<List<Item>>();

        for (int i = 0; i < n; i++)
        {
            int q = int.Parse(Console.ReadLine());
            List<Item> itens = new List<Item>();

            for (int j = 0; j < q; j++)
            {
                string produto = Console.ReadLine();
                int quantidade = int.Parse(Console.ReadLine());
                itens.Add(new Item(produto, quantidade));
            }

            pedidos.Add(itens);
        }

        var todos = pedidos.SelectMany(p => p).ToList();

        Console.WriteLine($"Total de itens: {todos.Count}");
        Console.WriteLine($"Quantidade total: {todos.Sum(i => i.Quantidade)}");

        var distintos = todos.Select(i => i.Produto).Distinct().OrderBy(p => p);
        Console.WriteLine($"Produtos distintos: {string.Join(" ", distintos)}");

        Console.WriteLine($"Pedidos vazios: {pedidos.Count(p => p.Count == 0)}");

        var maisPedido = todos
            .GroupBy(i => i.Produto)
            .OrderByDescending(g => g.Sum(i => i.Quantidade))
            .ThenBy(g => g.Key)
            .First();

        Console.WriteLine($"Item mais pedido: {maisPedido.Key} ({maisPedido.Sum(i => i.Quantidade)})");
    }
}
`,
      hints: [
        'Como cada pedido já **é** uma lista, o `SelectMany` recebe a identidade: `SelectMany(p => p)`.',
        'Os pedidos vazios precisam ser contados na coleção externa: depois de achatar, eles não existem mais.',
      ],
      tests: [
        {
          name: 'Três pedidos, um vazio',
          stdin: '3\n2\nTeclado\n1\nMouse\n2\n0\n2\nMouse\n3\nMonitor\n1\n',
          expectedStdout:
            'Total de itens: 4\nQuantidade total: 7\nProdutos distintos: Monitor Mouse Teclado\n' +
            'Pedidos vazios: 1\nItem mais pedido: Mouse (5)',
        },
        {
          name: 'Um pedido com um item',
          stdin: '1\n1\nSolo\n5\n',
          expectedStdout:
            'Total de itens: 1\nQuantidade total: 5\nProdutos distintos: Solo\n' +
            'Pedidos vazios: 0\nItem mais pedido: Solo (5)',
        },
        {
          name: 'Empate resolvido alfabeticamente',
          stdin: '2\n1\nZeta\n3\n1\nAlfa\n3\n',
          expectedStdout:
            'Total de itens: 2\nQuantidade total: 6\nProdutos distintos: Alfa Zeta\n' +
            'Pedidos vazios: 0\nItem mais pedido: Alfa (3)',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c06l04',
    title: 'Distinct e DistinctBy',
    objective: 'Remover duplicatas por valor completo ou por um campo específico.',
    concept: [
      {
        kind: 'text',
        body:
          'O `Distinct` remove elementos repetidos de uma sequência. Para tipos simples e `record`, ele funciona direto, porque os dois comparam por **conteúdo**.',
      },
      {
        kind: 'code',
        code: `var valoresUnicos = numeros.Distinct();
var nomesUnicos = pessoas.Select(p => p.Nome).Distinct();

// remove pessoas com a MESMA idade, mantendo a primeira de cada
var umaPorIdade = pessoas.DistinctBy(p => p.Idade);`,
      },
      {
        kind: 'table',
        headers: ['Operador', 'Compara por', 'Mantém'],
        rows: [
          ['`Distinct()`', 'o elemento inteiro', 'a primeira ocorrência'],
          ['`DistinctBy(chave)`', 'só a chave extraída', 'a primeira de cada chave'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O `DistinctBy` resolve um problema que o `Distinct` não alcança: manter o **elemento inteiro**, mas considerar duplicata quem repete apenas um campo. Sem ele, seria preciso agrupar e pegar o primeiro de cada grupo.',
      },
      {
        kind: 'text',
        body:
          'A ordem é preservada: o resultado mantém a sequência da primeira aparição de cada valor. É o mesmo comportamento do par `HashSet` + `List` que você escreveu na Seção 3 — agora em um operador.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Para `record` e tipos simples, a comparação por conteúdo é automática. Para **classes** comuns, `Distinct` compara por identidade, e dois objetos com os mesmos dados são considerados diferentes. A Seção 5 explica como mudar isso.',
      },
      {
        kind: 'text',
        body:
          'Por baixo, `Distinct` usa um conjunto para lembrar o que já viu — exatamente a técnica da Seção 3, com o mesmo custo e a mesma vantagem sobre a busca linear.',
      },
    ],
    quiz: [
      {
        id: 's04c06l04q1',
        type: 'single',
        prompt: 'Qual elemento `DistinctBy` mantém quando duas pessoas têm a mesma idade?',
        options: [
          { id: 'a', text: 'A primeira que aparece na sequência.', correct: true },
          { id: 'b', text: 'A última.' },
          { id: 'c', text: 'Uma qualquer, sem garantia.' },
          { id: 'd', text: 'Nenhuma: as duas são removidas.' },
        ],
        explanation:
          'A primeira ocorrência de cada chave permanece, e a ordem original é preservada — como no padrão `HashSet` + `List` da Seção 3.',
      },
      {
        id: 's04c06l04q2',
        type: 'single',
        prompt: 'Por que `Distinct` funciona direto com `record`?',
        options: [
          { id: 'a', text: 'Porque `record` compara por conteúdo automaticamente.', correct: true },
          { id: 'b', text: 'Porque `record` é sempre único.' },
          { id: 'c', text: 'Porque `record` é ordenado.' },
          { id: 'd', text: 'Porque `Distinct` ignora o tipo.' },
        ],
        explanation:
          'A igualdade estrutural é um dos recursos que o `record` gera de graça, e é justamente o que `Distinct` precisa para comparar elementos.',
      },
      {
        id: 's04c06l04q3',
        type: 'single',
        prompt: 'Quando usar `DistinctBy` em vez de `Distinct`?',
        options: [
          { id: 'a', text: 'Quando a duplicata é definida por um campo, mas você quer o elemento inteiro.', correct: true },
          { id: 'b', text: 'Quando a coleção é grande.' },
          { id: 'c', text: 'Quando os elementos são `record`.' },
          { id: 'd', text: 'Quando a ordem importa.' },
        ],
        explanation:
          '`Select(p => p.Idade).Distinct()` daria só as idades. `DistinctBy(p => p.Idade)` dá as pessoas, uma por idade.',
      },
    ],
    challenge: {
      brief:
        'Remova duplicatas de uma lista de registros de duas formas: por registro completo e por um campo específico.',
      requirements: [
        'Declare um `record Pessoa(string Nome, int Idade, string Cidade)` fora da classe',
        'Leia `n` pessoas, cada uma em três linhas',
        'Linha 1: `Total: n`',
        'Linha 2: `Registros unicos: k`, usando `Distinct` sobre os registros completos',
        'Linha 3: `Nomes distintos: a b c`, em ordem alfabética',
        'Linha 4: `Uma por cidade: nome1 nome2`, os nomes da primeira pessoa de cada cidade, na ordem de aparição',
        'Linha 5: `Cidades: c`',
        'Linha 6: `Duplicatas exatas: d`',
        'Use `Distinct` e `DistinctBy`',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

record Pessoa(string Nome, int Idade, string Cidade);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Pessoa> pessoas = new List<Pessoa>();
        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int idade = int.Parse(Console.ReadLine());
            string cidade = Console.ReadLine();
            pessoas.Add(new Pessoa(nome, idade, cidade));
        }

        // Aplique Distinct e DistinctBy
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Pessoa(string Nome, int Idade, string Cidade);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Pessoa> pessoas = new List<Pessoa>();
        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int idade = int.Parse(Console.ReadLine());
            string cidade = Console.ReadLine();
            pessoas.Add(new Pessoa(nome, idade, cidade));
        }

        int unicos = pessoas.Distinct().Count();

        Console.WriteLine($"Total: {n}");
        Console.WriteLine($"Registros unicos: {unicos}");

        var nomes = pessoas.Select(p => p.Nome).Distinct().OrderBy(x => x);
        Console.WriteLine($"Nomes distintos: {string.Join(" ", nomes)}");

        var porCidade = pessoas.DistinctBy(p => p.Cidade).Select(p => p.Nome);
        Console.WriteLine($"Uma por cidade: {string.Join(" ", porCidade)}");

        Console.WriteLine($"Cidades: {pessoas.Select(p => p.Cidade).Distinct().Count()}");
        Console.WriteLine($"Duplicatas exatas: {n - unicos}");
    }
}
`,
      hints: [
        '`Distinct()` sobre os registros funciona porque `record` compara por conteúdo.',
        '`DistinctBy(p => p.Cidade)` mantém a pessoa inteira — o `Select` do nome vem depois.',
      ],
      tests: [
        {
          name: 'Com duplicata exata',
          stdin: '4\nAna\n30\nSP\nBruno\n25\nRJ\nAna\n30\nSP\nCarla\n30\nSP\n',
          expectedStdout:
            'Total: 4\nRegistros unicos: 3\nNomes distintos: Ana Bruno Carla\n' +
            'Uma por cidade: Ana Bruno\nCidades: 2\nDuplicatas exatas: 1',
        },
        {
          name: 'Sem duplicatas',
          stdin: '2\nX\n20\nA\nY\n30\nB\n',
          expectedStdout:
            'Total: 2\nRegistros unicos: 2\nNomes distintos: X Y\n' +
            'Uma por cidade: X Y\nCidades: 2\nDuplicatas exatas: 0',
        },
        {
          name: 'Todos iguais',
          stdin: '3\nZ\n1\nC\nZ\n1\nC\nZ\n1\nC\n',
          expectedStdout:
            'Total: 3\nRegistros unicos: 1\nNomes distintos: Z\n' +
            'Uma por cidade: Z\nCidades: 1\nDuplicatas exatas: 2',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c06l05',
    title: 'Aggregate',
    objective: 'Reduzir uma sequência a um valor com uma combinação customizada, o operador mais geral do LINQ.',
    concept: [
      {
        kind: 'text',
        body:
          'O `Aggregate` é o `Reduzir` que você escreveu no capítulo 4, agora como operador LINQ. Ele percorre a sequência combinando cada elemento com o acumulado.',
      },
      {
        kind: 'code',
        code: `int soma = numeros.Aggregate(0, (acc, x) => acc + x);
int produto = numeros.Aggregate(1, (acc, x) => acc * x);

string frase = palavras.Aggregate("", (acc, p) => acc + p + " ");`,
        caption: 'Valor inicial e função de combinação — exatamente o padrão do capítulo 4.',
      },
      {
        kind: 'text',
        body:
          'Todos os agregadores que você já usa são casos particulares dele. `Sum` é `Aggregate` com soma, `Count` é `Aggregate` com incremento, `Max` é `Aggregate` com comparação.',
      },
      {
        kind: 'compare',
        good: `numeros.Sum()`,
        bad: `numeros.Aggregate(0, (a, x) => a + x)`,
        goodLabel: 'Direto e claro',
        badLabel: 'Correto e desnecessário',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A regra é usar o operador específico quando ele existe, e recorrer ao `Aggregate` só para combinações que não têm nome próprio — como calcular o MDC de uma lista inteira, ou concatenar com um separador condicional.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Existe uma sobrecarga **sem valor inicial**, que usa o primeiro elemento como semente. Ela lança exceção em sequência vazia — e por isso a versão com valor inicial explícito é quase sempre a escolha mais segura.',
      },
      {
        kind: 'text',
        body:
          'Como o acumulado pode ser de um tipo diferente dos elementos, o `Aggregate` também serve para construir estruturas: montar um dicionário de contagens, ou uma string formatada a partir de uma lista de registros.',
      },
    ],
    quiz: [
      {
        id: 's04c06l05q1',
        type: 'single',
        prompt: 'Por que preferir `Sum()` a `Aggregate(0, (a, x) => a + x)`?',
        options: [
          { id: 'a', text: 'Porque o operador específico diz a intenção diretamente.', correct: true },
          { id: 'b', text: 'Porque `Aggregate` está obsoleto.' },
          { id: 'c', text: 'Porque `Aggregate` dá resultado diferente.' },
          { id: 'd', text: 'Porque `Sum` aceita mais tipos.' },
        ],
        explanation:
          'Os dois produzem o mesmo número. Quem lê `Sum` entende na hora; quem lê o `Aggregate` precisa decifrar a lambda para chegar à mesma conclusão.',
      },
      {
        id: 's04c06l05q2',
        type: 'single',
        prompt: 'O que a sobrecarga de `Aggregate` sem valor inicial faz em uma sequência vazia?',
        options: [
          { id: 'a', text: 'Lança exceção.', correct: true },
          { id: 'b', text: 'Devolve `0`.' },
          { id: 'c', text: 'Devolve `null`.' },
          { id: 'd', text: 'Devolve o valor padrão do tipo.' },
        ],
        explanation:
          'Sem valor inicial, ela usa o primeiro elemento como semente — e não há primeiro elemento. A versão com inicial explícito não tem esse problema.',
      },
      {
        id: 's04c06l05q3',
        type: 'single',
        prompt: 'Quando `Aggregate` é a escolha certa?',
        options: [
          { id: 'a', text: 'Quando a combinação não tem um operador específico.', correct: true },
          { id: 'b', text: 'Sempre que houver uma soma.' },
          { id: 'c', text: 'Quando a sequência é grande.' },
          { id: 'd', text: 'Quando o resultado é numérico.' },
        ],
        explanation:
          'Ele é o operador de último recurso, e é isso que o torna poderoso: qualquer redução cabe nele, inclusive as que ninguém previu.',
      },
    ],
    challenge: {
      brief:
        'Use `Aggregate` para reduções que não têm operador próprio: MDC de uma lista, concatenação com separador, e uma contagem condicional.',
      requirements: [
        'Leia `n` valores positivos para uma `List<int>`',
        'Linha 1: `Soma: X`, usando `Sum`',
        'Linha 2: `Produto: Y`, usando `Aggregate`',
        'Linha 3: `MDC: Z`, o máximo divisor comum de todos, usando `Aggregate`',
        'Linha 4: `Concatenado: 1-2-3`, com os valores separados por hífen, usando `Aggregate`',
        'Linha 5: `Maior: M`, usando `Aggregate` com comparação',
        'Linha 6: `Pares: p`, contando os pares com `Aggregate`',
        'A entrada sempre tem pelo menos um valor',
        'Use valor inicial explícito em todos os `Aggregate`',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static int Mdc(int a, int b)
    {
        while (b != 0)
        {
            int resto = a % b;
            a = b;
            b = resto;
        }

        return a;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> numeros = new List<int>();
        for (int i = 0; i < n; i++)
        {
            numeros.Add(int.Parse(Console.ReadLine()));
        }

        // Seis reducoes, quatro delas com Aggregate
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static int Mdc(int a, int b)
    {
        while (b != 0)
        {
            int resto = a % b;
            a = b;
            b = resto;
        }

        return a;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> numeros = new List<int>();
        for (int i = 0; i < n; i++)
        {
            numeros.Add(int.Parse(Console.ReadLine()));
        }

        Console.WriteLine($"Soma: {numeros.Sum()}");
        Console.WriteLine($"Produto: {numeros.Aggregate(1, (acc, x) => acc * x)}");
        Console.WriteLine($"MDC: {numeros.Aggregate(0, (acc, x) => Mdc(acc, x))}");

        string concatenado = numeros.Aggregate("", (acc, x) => acc == "" ? x.ToString() : acc + "-" + x);
        Console.WriteLine($"Concatenado: {concatenado}");

        Console.WriteLine($"Maior: {numeros.Aggregate(int.MinValue, (acc, x) => x > acc ? x : acc)}");
        Console.WriteLine($"Pares: {numeros.Aggregate(0, (acc, x) => x % 2 == 0 ? acc + 1 : acc)}");
    }
}
`,
      hints: [
        'O MDC começa em `0`, porque o MDC de zero com qualquer número é o próprio número.',
        'Na concatenação, o acumulado vazio indica o primeiro elemento — que entra sem separador na frente.',
      ],
      tests: [
        {
          name: 'Quatro valores',
          stdin: '4\n12\n18\n24\n30\n',
          expectedStdout:
            'Soma: 84\nProduto: 155520\nMDC: 6\nConcatenado: 12-18-24-30\nMaior: 30\nPares: 4',
        },
        {
          name: 'Primos entre si',
          stdin: '3\n7\n5\n3\n',
          expectedStdout:
            'Soma: 15\nProduto: 105\nMDC: 1\nConcatenado: 7-5-3\nMaior: 7\nPares: 0',
        },
        {
          name: 'Um valor só',
          stdin: '1\n9\n',
          expectedStdout:
            'Soma: 9\nProduto: 9\nMDC: 9\nConcatenado: 9\nMaior: 9\nPares: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c06l06',
    title: 'Zip e Chunk',
    objective: 'Combinar duas sequências elemento a elemento e dividir uma sequência em blocos de tamanho fixo.',
    concept: [
      {
        kind: 'text',
        body:
          'Dois operadores resolvem problemas de forma que apareceriam como laços chatos: `Zip` combina duas sequências par a par, e `Chunk` corta uma sequência em blocos.',
      },
      {
        kind: 'code',
        code: `var nomes = new[] { "Ana", "Bruno", "Carla" };
var notas = new[] { 8, 6, 9 };

var pares = nomes.Zip(notas, (n, nota) => $"{n}: {nota}");
// Ana: 8, Bruno: 6, Carla: 9`,
        caption: 'O `Zip` percorre as duas ao mesmo tempo, combinando os elementos de mesma posição.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O `Zip` para na **menor** das duas sequências. Se uma tem 5 elementos e a outra 3, o resultado tem 3 — e os dois elementos extras são descartados silenciosamente, sem nenhum aviso.',
      },
      {
        kind: 'code',
        code: `var blocos = numeros.Chunk(3);

foreach (int[] bloco in blocos)
{
    Console.WriteLine(string.Join(",", bloco));
}
// 1,2,3
// 4,5
`,
        caption: 'O `Chunk` devolve arrays; o último pode ser menor que o tamanho pedido.',
      },
      {
        kind: 'table',
        headers: ['Operador', 'Entrada', 'Saída'],
        rows: [
          ['`Zip`', 'duas sequências', 'uma, do tamanho da menor'],
          ['`Chunk(n)`', 'uma sequência', 'blocos de até `n` elementos'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O `Chunk` é a ferramenta certa para processar em lotes: enviar 100 registros por requisição, gravar de mil em mil, ou paginar sem calcular índices. O último bloco incompleto é tratado sozinho.',
      },
      {
        kind: 'text',
        body:
          'Uma sequência vazia produz zero blocos, e um `Chunk` com tamanho maior que a coleção produz um bloco só, com tudo dentro. Nenhum dos dois é erro.',
      },
    ],
    quiz: [
      {
        id: 's04c06l06q1',
        type: 'single',
        prompt: 'Quantos elementos `Zip` produz quando as sequências têm 5 e 3 elementos?',
        options: [
          { id: 'a', code: '3', correct: true },
          { id: 'b', code: '5' },
          { id: 'c', code: '8' },
          { id: 'd', text: 'Lança exceção por tamanhos diferentes.' },
        ],
        explanation:
          'Ele para na menor. Os dois elementos extras da sequência maior são descartados sem aviso — o que pode esconder um desalinhamento nos dados.',
      },
      {
        id: 's04c06l06q2',
        type: 'single',
        prompt: 'O que acontece com o último bloco de `Chunk(3)` em uma coleção de 5 elementos?',
        options: [
          { id: 'a', text: 'Ele tem 2 elementos.', correct: true },
          { id: 'b', text: 'Ele é descartado.' },
          { id: 'c', text: 'Ele é completado com zeros.' },
          { id: 'd', text: 'Lança exceção.' },
        ],
        explanation:
          'O último bloco leva o que sobrou. É o comportamento desejado para processamento em lotes: nenhum dado é perdido.',
      },
      {
        id: 's04c06l06q3',
        type: 'single',
        prompt: 'Para que serve `Chunk` na prática?',
        options: [
          { id: 'a', text: 'Processar em lotes: enviar, gravar ou exibir de N em N.', correct: true },
          { id: 'b', text: 'Ordenar a coleção.' },
          { id: 'c', text: 'Remover duplicatas.' },
          { id: 'd', text: 'Combinar duas coleções.' },
        ],
        explanation:
          'Muitas APIs impõem limite por requisição, e bancos de dados gravam melhor em lotes. O `Chunk` resolve isso sem aritmética de índices.',
      },
    ],
    challenge: {
      brief:
        'Combine duas listas com `Zip` e divida o resultado em blocos com `Chunk`, tratando o caso de listas de tamanhos diferentes.',
      requirements: [
        'Leia `a` nomes, depois `b` notas, e por último o tamanho do bloco',
        'Linha 1: `Pares: k`, quantos pares o `Zip` produziu',
        'Linha 2: `Descartados: d`, elementos da lista maior que ficaram de fora',
        'Uma linha por bloco, no formato `Bloco 1: Ana:8 Bruno:6`',
        'Depois: `Blocos: q`',
        'Por último: `Media geral: X` com duas casas, ou `Media geral: indefinida` se não houver pares',
        'A média usa apenas as notas que entraram em algum par',
        'Use `Zip` e `Chunk`',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int a = int.Parse(Console.ReadLine());

        List<string> nomes = new List<string>();
        for (int i = 0; i < a; i++)
        {
            nomes.Add(Console.ReadLine());
        }

        int b = int.Parse(Console.ReadLine());

        List<int> notas = new List<int>();
        for (int i = 0; i < b; i++)
        {
            notas.Add(int.Parse(Console.ReadLine()));
        }

        int tamanho = int.Parse(Console.ReadLine());

        // Combine com Zip e divida com Chunk
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int a = int.Parse(Console.ReadLine());

        List<string> nomes = new List<string>();
        for (int i = 0; i < a; i++)
        {
            nomes.Add(Console.ReadLine());
        }

        int b = int.Parse(Console.ReadLine());

        List<int> notas = new List<int>();
        for (int i = 0; i < b; i++)
        {
            notas.Add(int.Parse(Console.ReadLine()));
        }

        int tamanho = int.Parse(Console.ReadLine());

        var pares = nomes.Zip(notas, (nome, nota) => $"{nome}:{nota}").ToList();

        Console.WriteLine($"Pares: {pares.Count}");
        Console.WriteLine($"Descartados: {a + b - pares.Count * 2}");

        var blocos = pares.Chunk(tamanho).ToList();

        for (int i = 0; i < blocos.Count; i++)
        {
            Console.WriteLine($"Bloco {i + 1}: {string.Join(" ", blocos[i])}");
        }

        Console.WriteLine($"Blocos: {blocos.Count}");

        var usadas = notas.Take(pares.Count);

        if (usadas.Any())
        {
            Console.WriteLine($"Media geral: {usadas.Average():F2}");
        }
        else
        {
            Console.WriteLine("Media geral: indefinida");
        }
    }
}
`,
      hints: [
        'Os descartados são o total das duas listas menos o dobro dos pares formados.',
        'A média usa `Take(pares.Count)` sobre as notas, para considerar só as que foram efetivamente pareadas.',
      ],
      tests: [
        {
          name: 'Listas de mesmo tamanho',
          stdin: '3\nAna\nBruno\nCarla\n3\n8\n6\n9\n2\n',
          expectedStdout:
            'Pares: 3\nDescartados: 0\nBloco 1: Ana:8 Bruno:6\nBloco 2: Carla:9\nBlocos: 2\n' +
            'Media geral: 7.67',
        },
        {
          name: 'Lista de nomes maior',
          stdin: '4\nA\nB\nC\nD\n2\n10\n20\n5\n',
          expectedStdout:
            'Pares: 2\nDescartados: 2\nBloco 1: A:10 B:20\nBlocos: 1\nMedia geral: 15.00',
        },
        {
          name: 'Nenhuma nota',
          stdin: '2\nX\nY\n0\n3\n',
          expectedStdout:
            'Pares: 0\nDescartados: 2\nBlocos: 0\nMedia geral: indefinida',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c06l07',
    title: 'Execução diferida',
    objective: 'Entender que uma consulta LINQ só executa quando enumerada, e as consequências práticas disso.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma consulta LINQ não é um resultado: é um **plano**. Nada acontece no momento em que você a escreve — a execução só começa quando alguém percorre a sequência.',
      },
      {
        kind: 'code',
        code: `var q = numeros.Where(x =>
{
    Console.WriteLine($"testando {x}");
    return x > 1;
});

Console.WriteLine("consulta montada");   // nada foi testado ainda

foreach (var x in q) { }                 // agora sim`,
      },
      {
        kind: 'output',
        code: `consulta montada
testando 1
testando 2
testando 3`,
        caption: 'A mensagem aparece **antes** de qualquer teste: a consulta estava só guardada.',
      },
      {
        kind: 'text',
        body:
          'Isso tem três consequências práticas, e todas surpreendem quem não conhece o mecanismo.',
      },
      {
        kind: 'table',
        headers: ['Consequência', 'Efeito'],
        rows: [
          ['reexecução', 'cada `foreach` roda a consulta de novo'],
          ['dados vivos', 'mudanças na fonte aparecem na próxima execução'],
          ['streaming', 'os elementos fluem um a um pela cadeia'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Percorrer a mesma consulta duas vezes executa o filtro duas vezes. Se ele for caro — ou tiver efeito colateral —, isso é um problema real. A solução é materializar com `ToList()` e reutilizar a lista.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O terceiro efeito é o mais elegante: em `numeros.Where(...).Take(2)`, o filtro para assim que encontra o segundo aprovado. A cadeia não processa a coleção inteira em cada etapa — cada elemento atravessa o pipeline sozinho.',
      },
      {
        kind: 'text',
        body:
          'Operadores que devolvem sequência são diferidos: `Where`, `Select`, `OrderBy`. Os que devolvem um valor executam na hora: `Count`, `Sum`, `First`, `ToList`. Essa é a linha divisória.',
      },
    ],
    quiz: [
      {
        id: 's04c06l07q1',
        type: 'single',
        prompt: 'Quando o predicado de um `Where` é executado?',
        options: [
          { id: 'a', text: 'Quando a sequência é percorrida.', correct: true },
          { id: 'b', text: 'No momento em que a consulta é escrita.' },
          { id: 'c', text: 'Uma vez para toda a coleção, ao montar.' },
          { id: 'd', text: 'Quando a variável é declarada.' },
        ],
        explanation:
          'A consulta é um plano guardado. Sem alguém enumerando, nenhum elemento é testado.',
      },
      {
        id: 's04c06l07q2',
        type: 'single',
        prompt: 'O que acontece ao percorrer a mesma consulta duas vezes?',
        options: [
          { id: 'a', text: 'Ela é executada duas vezes, do início.', correct: true },
          { id: 'b', text: 'A segunda vez usa um cache.' },
          { id: 'c', text: 'A segunda vez devolve uma sequência vazia.' },
          { id: 'd', text: 'Lança exceção.' },
        ],
        explanation:
          'É o efeito que mais surpreende. Quando o custo importa, `ToList()` materializa o resultado e as próximas leituras são gratuitas.',
      },
      {
        id: 's04c06l07q3',
        type: 'multiple',
        prompt: 'Quais operadores executam imediatamente?',
        options: [
          { id: 'a', code: 'Count()', correct: true },
          { id: 'b', code: 'ToList()', correct: true },
          { id: 'c', code: 'First()', correct: true },
          { id: 'd', code: 'Where()' },
        ],
        explanation:
          '`Where` devolve outra sequência, então continua diferido. Os que produzem um valor concreto precisam percorrer os dados na hora.',
      },
    ],
    challenge: {
      brief:
        'Demonstre a execução diferida imprimindo dentro do predicado, e mostre a diferença entre reutilizar a consulta e materializá-la.',
      requirements: [
        'Leia `n` valores para uma `List<int>` e depois um `limite`',
        'Linha 1: `Montando consulta`',
        'Monte um `Where` cujo predicado imprime `testando X` para cada elemento avaliado',
        'Linha seguinte: `Consulta montada`, antes de qualquer teste aparecer',
        'Depois: `Primeira leitura:` seguida dos testes e de `Aprovados: k`',
        'Depois: `Segunda leitura:` seguida dos testes de novo e de `Aprovados: k`',
        'Depois: `Materializando com ToList:` seguida dos testes uma última vez',
        'Depois: `Da lista: k` duas vezes, sem novos testes entre elas',
        'O predicado aprova os valores maiores que o limite',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> numeros = new List<int>();
        for (int i = 0; i < n; i++)
        {
            numeros.Add(int.Parse(Console.ReadLine()));
        }

        int limite = int.Parse(Console.ReadLine());

        Console.WriteLine("Montando consulta");

        // Monte a consulta com um predicado que imprime

        Console.WriteLine("Consulta montada");

        // Duas leituras da consulta, depois a materializacao
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> numeros = new List<int>();
        for (int i = 0; i < n; i++)
        {
            numeros.Add(int.Parse(Console.ReadLine()));
        }

        int limite = int.Parse(Console.ReadLine());

        Console.WriteLine("Montando consulta");

        var consulta = numeros.Where(x =>
        {
            Console.WriteLine($"testando {x}");
            return x > limite;
        });

        Console.WriteLine("Consulta montada");

        Console.WriteLine("Primeira leitura:");
        Console.WriteLine($"Aprovados: {consulta.Count()}");

        Console.WriteLine("Segunda leitura:");
        Console.WriteLine($"Aprovados: {consulta.Count()}");

        Console.WriteLine("Materializando com ToList:");
        var lista = consulta.ToList();

        Console.WriteLine($"Da lista: {lista.Count}");
        Console.WriteLine($"Da lista: {lista.Count}");
    }
}
`,
      hints: [
        'A lambda do `Where` pode ter corpo com chaves: imprima e depois faça o `return`.',
        'Depois do `ToList()`, ler a lista não dispara mais nenhum teste — é isso que a saída precisa mostrar.',
      ],
      tests: [
        {
          name: 'Três valores',
          stdin: '3\n1\n2\n3\n1\n',
          expectedStdout:
            'Montando consulta\nConsulta montada\nPrimeira leitura:\ntestando 1\ntestando 2\ntestando 3\n' +
            'Aprovados: 2\nSegunda leitura:\ntestando 1\ntestando 2\ntestando 3\nAprovados: 2\n' +
            'Materializando com ToList:\ntestando 1\ntestando 2\ntestando 3\nDa lista: 2\nDa lista: 2',
        },
        {
          name: 'Nenhum aprovado',
          stdin: '2\n1\n2\n10\n',
          expectedStdout:
            'Montando consulta\nConsulta montada\nPrimeira leitura:\ntestando 1\ntestando 2\n' +
            'Aprovados: 0\nSegunda leitura:\ntestando 1\ntestando 2\nAprovados: 0\n' +
            'Materializando com ToList:\ntestando 1\ntestando 2\nDa lista: 0\nDa lista: 0',
        },
        {
          name: 'Um valor só',
          stdin: '1\n5\n0\n',
          expectedStdout:
            'Montando consulta\nConsulta montada\nPrimeira leitura:\ntestando 5\nAprovados: 1\n' +
            'Segunda leitura:\ntestando 5\nAprovados: 1\nMaterializando com ToList:\ntestando 5\n' +
            'Da lista: 1\nDa lista: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c06l08',
    title: 'Sintaxe de consulta',
    objective: 'Ler e escrever LINQ na sintaxe declarativa, reconhecendo sua equivalência com os métodos.',
    concept: [
      {
        kind: 'text',
        body:
          'O C# tem uma segunda forma de escrever LINQ, parecida com SQL. Ela é traduzida pelo compilador para as mesmas chamadas de método — são duas escritas para exatamente o mesmo código.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Sintaxe de método',
          code: `pessoas
    .Where(p => p.Idade >= 18)
    .OrderBy(p => p.Nome)
    .Select(p => p.Nome)`,
        },
        right: {
          label: 'Sintaxe de consulta',
          code: `from p in pessoas
where p.Idade >= 18
orderby p.Nome
select p.Nome`,
        },
      },
      {
        kind: 'text',
        body:
          'A ordem das cláusulas é fixa e sempre começa com `from` e termina com `select` ou `group`. Repare que ela é a ordem lógica da consulta, e não a ordem do SQL — que coloca o `select` primeiro.',
      },
      {
        kind: 'table',
        headers: ['Cláusula', 'Equivale a'],
        rows: [
          ['`from x in fonte`', 'a coleção de origem'],
          ['`where`', '`.Where(...)`'],
          ['`orderby x`, `orderby x descending`', '`.OrderBy`, `.OrderByDescending`'],
          ['`select`', '`.Select(...)`'],
          ['`group x by chave`', '`.GroupBy(...)`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Nem todos os operadores têm cláusula: `Count`, `Sum`, `Take` e vários outros só existem como método. Por isso é comum ver as duas sintaxes juntas, com a consulta entre parênteses e um método no fim.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A sintaxe de consulta brilha em consultas com **múltiplas fontes** e junções, onde a de método fica cheia de lambdas aninhadas. Para uma cadeia simples de dois ou três operadores, a de método costuma ser mais direta.',
      },
      {
        kind: 'text',
        body:
          'A cláusula `let` permite nomear um valor intermediário dentro da consulta — algo que na sintaxe de método exigiria um `Select` extra só para carregar o cálculo adiante.',
      },
    ],
    quiz: [
      {
        id: 's04c06l08q1',
        type: 'single',
        prompt: 'Com que cláusula uma consulta LINQ sempre começa?',
        options: [
          { id: 'a', code: 'from', correct: true },
          { id: 'b', code: 'select' },
          { id: 'c', code: 'where' },
          { id: 'd', code: 'orderby' },
        ],
        explanation:
          'Diferente do SQL, aqui a fonte vem primeiro. Isso permite ao compilador conhecer o tipo dos elementos antes de qualquer outra cláusula.',
      },
      {
        id: 's04c06l08q2',
        type: 'single',
        prompt: 'Qual é a diferença de desempenho entre as duas sintaxes?',
        options: [
          { id: 'a', text: 'Nenhuma: uma é traduzida para a outra na compilação.', correct: true },
          { id: 'b', text: 'A de consulta é mais rápida.' },
          { id: 'c', text: 'A de método é mais rápida.' },
          { id: 'd', text: 'Depende do tamanho da coleção.' },
        ],
        explanation:
          'O compilador converte a sintaxe de consulta nas mesmas chamadas de método. A escolha é puramente de legibilidade.',
      },
      {
        id: 's04c06l08q3',
        type: 'single',
        prompt: 'Por que é comum ver as duas sintaxes misturadas?',
        options: [
          { id: 'a', text: 'Porque operadores como `Count` e `Take` não têm cláusula equivalente.', correct: true },
          { id: 'b', text: 'Por preferência de estilo apenas.' },
          { id: 'c', text: 'Porque a sintaxe de consulta é incompleta em C#.' },
          { id: 'd', text: 'Para melhorar o desempenho.' },
        ],
        explanation:
          'A sintaxe de consulta cobre as cláusulas principais. Para o resto, envolve-se a consulta em parênteses e chama-se o método normalmente.',
      },
    ],
    challenge: {
      brief:
        'Escreva a mesma consulta nas duas sintaxes e mostre que os resultados são idênticos.',
      requirements: [
        'Declare um `record Aluno(string Nome, int Idade, int Nota)` fora da classe',
        'Leia `n` alunos, cada um em três linhas',
        'Linha 1: `Metodo: nome1 nome2`, com os nomes dos alunos de 18 anos ou mais e nota maior ou igual a 6, em ordem alfabética',
        'Linha 2: `Consulta: nome1 nome2`, a mesma coisa escrita com `from`, `where`, `orderby` e `select`',
        'Linha 3: `Iguais: True`',
        'Linha 4: `Aprovados: k`',
        'Linha 5: `Media dos aprovados: X` com duas casas, ou `indefinida`',
        'A segunda consulta precisa usar a sintaxe de consulta, não a de método',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

record Aluno(string Nome, int Idade, int Nota);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Aluno> alunos = new List<Aluno>();
        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int idade = int.Parse(Console.ReadLine());
            int nota = int.Parse(Console.ReadLine());
            alunos.Add(new Aluno(nome, idade, nota));
        }

        // A mesma consulta nas duas sintaxes
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Aluno(string Nome, int Idade, int Nota);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Aluno> alunos = new List<Aluno>();
        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int idade = int.Parse(Console.ReadLine());
            int nota = int.Parse(Console.ReadLine());
            alunos.Add(new Aluno(nome, idade, nota));
        }

        var porMetodo = alunos
            .Where(a => a.Idade >= 18 && a.Nota >= 6)
            .OrderBy(a => a.Nome)
            .Select(a => a.Nome)
            .ToList();

        var porConsulta = (from a in alunos
                           where a.Idade >= 18 && a.Nota >= 6
                           orderby a.Nome
                           select a.Nome).ToList();

        Console.WriteLine($"Metodo: {string.Join(" ", porMetodo)}");
        Console.WriteLine($"Consulta: {string.Join(" ", porConsulta)}");
        Console.WriteLine($"Iguais: {porMetodo.SequenceEqual(porConsulta)}");
        Console.WriteLine($"Aprovados: {porMetodo.Count}");

        var notas = alunos.Where(a => a.Idade >= 18 && a.Nota >= 6).Select(a => a.Nota);

        if (notas.Any())
        {
            Console.WriteLine($"Media dos aprovados: {notas.Average():F2}");
        }
        else
        {
            Console.WriteLine("Media dos aprovados: indefinida");
        }
    }
}
`,
      hints: [
        'A sintaxe de consulta precisa de parênteses em volta para receber o `.ToList()` no fim.',
        '`SequenceEqual` compara duas sequências elemento a elemento — é a forma direta de provar que deram o mesmo resultado.',
      ],
      tests: [
        {
          name: 'Alguns aprovados',
          stdin: '4\nCarla\n20\n8\nAna\n17\n9\nBruno\n19\n5\nDiego\n22\n7\n',
          expectedStdout:
            'Metodo: Carla Diego\nConsulta: Carla Diego\nIguais: True\nAprovados: 2\n' +
            'Media dos aprovados: 7.50',
        },
        {
          name: 'Nenhum aprovado',
          stdin: '2\nX\n15\n9\nY\n30\n3\n',
          expectedStdout:
            'Metodo:\nConsulta:\nIguais: True\nAprovados: 0\nMedia dos aprovados: indefinida',
        },
        {
          name: 'Todos aprovados',
          stdin: '2\nZeca\n18\n6\nAna\n40\n10\n',
          expectedStdout:
            'Metodo: Ana Zeca\nConsulta: Ana Zeca\nIguais: True\nAprovados: 2\n' +
            'Media dos aprovados: 8.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c06l09',
    title: 'Prática: relatório agrupado',
    objective: 'Produzir um relatório com múltiplos níveis de agregação, combinando os operadores avançados.',
    concept: [
      {
        kind: 'text',
        body:
          'Um relatório real tem mais de um nível: totais por grupo, o melhor de cada grupo, e uma linha de fechamento com o consolidado. Cada nível é uma consulta sobre o resultado do anterior.',
      },
      {
        kind: 'code',
        code: `var porCategoria = vendas
    .GroupBy(v => v.Categoria)
    .Select(g => new
    {
        Categoria = g.Key,
        Total = g.Sum(v => v.Valor),
        Melhor = g.MaxBy(v => v.Valor).Vendedor
    })
    .OrderByDescending(x => x.Total)
    .ToList();`,
        caption: 'Agrupar, agregar, ordenar, materializar — o esqueleto de qualquer relatório.',
      },
      {
        kind: 'text',
        body:
          'Materializar com `ToList()` no fim é importante aqui: o resultado é percorrido várias vezes — para imprimir as linhas, para calcular o consolidado, e para achar o destaque geral.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Sem o `ToList()`, cada uso reexecutaria o agrupamento inteiro. Em um relatório com quatro leituras, isso significa agrupar quatro vezes os mesmos dados — o efeito da execução diferida trabalhando contra você.',
      },
      {
        kind: 'table',
        headers: ['Nível', 'Operador'],
        rows: [
          ['grupos', '`GroupBy`'],
          ['agregado por grupo', '`Sum`, `Count`, `MaxBy` dentro do grupo'],
          ['ordem do relatório', '`OrderByDescending` + `ThenBy`'],
          ['consolidado', '`Sum` sobre os grupos'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A soma dos totais por grupo tem que bater com a soma de todas as vendas. É a mesma invariante do agrupamento da Seção 3, e continua sendo a verificação mais barata de que nada se perdeu.',
      },
      {
        kind: 'text',
        body:
          'Ordenar por total decrescente e desempatar por nome de categoria garante saída estável — algo que a ordem natural do `GroupBy` não oferece.',
      },
    ],
    quiz: [
      {
        id: 's04c06l09q1',
        type: 'single',
        prompt: 'Por que materializar o resultado do agrupamento com `ToList()`?',
        options: [
          { id: 'a', text: 'Porque ele é percorrido várias vezes, e sem isso o agrupamento reexecuta a cada uso.', correct: true },
          { id: 'b', text: 'Porque `GroupBy` não pode ser percorrido diretamente.' },
          { id: 'c', text: 'Para ordenar o resultado.' },
          { id: 'd', text: 'Para remover grupos vazios.' },
        ],
        explanation:
          'É a consequência prática da execução diferida. Um relatório costuma ler o mesmo resultado três ou quatro vezes.',
      },
      {
        id: 's04c06l09q2',
        type: 'single',
        prompt: 'Que invariante confirma que o agrupamento não perdeu dados?',
        options: [
          { id: 'a', text: 'A soma dos totais por grupo é igual à soma de todos os registros.', correct: true },
          { id: 'b', text: 'O número de grupos é igual ao número de registros.' },
          { id: 'c', text: 'Todos os grupos têm o mesmo tamanho.' },
          { id: 'd', text: 'O maior grupo tem mais da metade dos registros.' },
        ],
        explanation:
          'Agrupar redistribui, não cria nem destrói. Se os dois totais discordam, algum registro caiu no grupo errado ou foi ignorado.',
      },
      {
        id: 's04c06l09q3',
        type: 'single',
        prompt: 'Por que ordenar o relatório explicitamente?',
        options: [
          { id: 'a', text: 'Porque a ordem dos grupos do `GroupBy` não é garantida.', correct: true },
          { id: 'b', text: 'Porque `GroupBy` ordena ao contrário.' },
          { id: 'c', text: 'Para melhorar o desempenho.' },
          { id: 'd', text: 'Porque os grupos vêm sempre em ordem aleatória.' },
        ],
        explanation:
          'Na prática ela costuma seguir a primeira aparição, mas isso não é contrato — a mesma situação do `Dictionary` na Seção 3.',
      },
    ],
    challenge: {
      brief:
        'Produza um relatório de vendas agrupado por categoria, com total, quantidade e melhor vendedor de cada grupo, mais uma linha de consolidado.',
      requirements: [
        'Declare um `record Venda(string Vendedor, string Categoria, int Valor)` fora da classe',
        'Leia `n` vendas, cada uma em três linhas',
        'Uma linha por categoria, no formato `Eletronicos: 3 vendas, total 800, melhor Ana (500)`',
        'As categorias saem em ordem decrescente de total, desempatando por nome crescente',
        'Depois: `Categorias: k`',
        'Depois: `Total geral: X`',
        'Depois: `Categoria lider: nome`',
        'Por último: `Confere: True`, comparando a soma dos grupos com a soma de todas as vendas',
        'Em empate de valor dentro de um grupo, o melhor vendedor é o do primeiro registro lido',
        'A entrada sempre tem pelo menos uma venda',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

record Venda(string Vendedor, string Categoria, int Valor);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Venda> vendas = new List<Venda>();
        for (int i = 0; i < n; i++)
        {
            string vendedor = Console.ReadLine();
            string categoria = Console.ReadLine();
            int valor = int.Parse(Console.ReadLine());
            vendas.Add(new Venda(vendedor, categoria, valor));
        }

        // Agrupe, agregue, ordene, e monte o relatorio
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Venda(string Vendedor, string Categoria, int Valor);

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<Venda> vendas = new List<Venda>();
        for (int i = 0; i < n; i++)
        {
            string vendedor = Console.ReadLine();
            string categoria = Console.ReadLine();
            int valor = int.Parse(Console.ReadLine());
            vendas.Add(new Venda(vendedor, categoria, valor));
        }

        var relatorio = vendas
            .GroupBy(v => v.Categoria)
            .Select(g => new
            {
                Categoria = g.Key,
                Quantidade = g.Count(),
                Total = g.Sum(v => v.Valor),
                Melhor = g.MaxBy(v => v.Valor)
            })
            .OrderByDescending(x => x.Total)
            .ThenBy(x => x.Categoria)
            .ToList();

        foreach (var linha in relatorio)
        {
            Console.WriteLine(
                $"{linha.Categoria}: {linha.Quantidade} vendas, total {linha.Total}, " +
                $"melhor {linha.Melhor.Vendedor} ({linha.Melhor.Valor})");
        }

        int totalGeral = relatorio.Sum(x => x.Total);

        Console.WriteLine($"Categorias: {relatorio.Count}");
        Console.WriteLine($"Total geral: {totalGeral}");
        Console.WriteLine($"Categoria lider: {relatorio.First().Categoria}");
        Console.WriteLine($"Confere: {totalGeral == vendas.Sum(v => v.Valor)}");
    }
}
`,
      hints: [
        'O `MaxBy` dentro do grupo devolve a venda inteira, então o vendedor e o valor saem do mesmo objeto.',
        'Depois de ordenar, a categoria líder é simplesmente o `First()` do relatório.',
      ],
      tests: [
        {
          name: 'Duas categorias',
          stdin: '5\nAna\nEletronicos\n500\nBruno\nLivros\n80\nCarla\nEletronicos\n200\nDiego\nLivros\n120\nAna\nEletronicos\n100\n',
          expectedStdout:
            'Eletronicos: 3 vendas, total 800, melhor Ana (500)\nLivros: 2 vendas, total 200, melhor Diego (120)\n' +
            'Categorias: 2\nTotal geral: 1000\nCategoria lider: Eletronicos\nConfere: True',
        },
        {
          name: 'Empate no total desempatado por nome',
          stdin: '2\nX\nZeta\n100\nY\nAlfa\n100\n',
          expectedStdout:
            'Alfa: 1 vendas, total 100, melhor Y (100)\nZeta: 1 vendas, total 100, melhor X (100)\n' +
            'Categorias: 2\nTotal geral: 200\nCategoria lider: Alfa\nConfere: True',
        },
        {
          name: 'Uma venda só',
          stdin: '1\nSolo\nUnica\n42\n',
          expectedStdout:
            'Unica: 1 vendas, total 42, melhor Solo (42)\nCategorias: 1\nTotal geral: 42\n' +
            'Categoria lider: Unica\nConfere: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c06l10',
    title: 'Checkpoint: LINQ avançado',
    objective: 'Combinar agrupamento, junção, achatamento e agregação em uma análise de dados relacionados.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint junta duas fontes de dados relacionadas e produz uma análise que exige quase todos os operadores avançados do capítulo.',
      },
      {
        kind: 'table',
        headers: ['Pergunta', 'Operadores'],
        rows: [
          ['quanto cada cliente gastou', '`Join` + `GroupBy` + `Sum`'],
          ['quais produtos foram vendidos', '`Select` + `Distinct` + `OrderBy`'],
          ['quem é o maior cliente', '`MaxBy` sobre os grupos'],
          ['pedidos sem cliente válido', 'contagem por diferença'],
        ],
      },
      {
        kind: 'text',
        body:
          'A ordem das operações é o que dá certo ou errado. Cruzar antes de agrupar é essencial: agrupar primeiro por `ClienteId` e depois tentar juntar os nomes complicaria a consulta sem necessidade.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O `Join` descarta silenciosamente os pedidos órfãos, então o total gasto pode não bater com a soma de todos os pedidos. Reportar essa diferença é o que transforma um bug silencioso em uma informação do relatório.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare como o pipeline se lê de cima para baixo como uma frase: junte pedidos com clientes, agrupe por cliente, some os valores, ordene pelo total. É essa legibilidade que justifica o LINQ sobre os laços equivalentes.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Construa uma etapa por vez, imprimindo o resultado intermediário. Uma consulta com `Join`, `GroupBy` e `Select` aninhados é densa demais para depurar de uma vez — e o erro mais comum é trocar as chaves do `Join`, que produz um resultado vazio sem nenhum aviso.',
      },
    ],
    quiz: [
      {
        id: 's04c06l10q1',
        type: 'single',
        prompt: 'Por que cruzar antes de agrupar?',
        options: [
          { id: 'a', text: 'Porque assim o agrupamento já pode usar o nome do cliente como chave.', correct: true },
          { id: 'b', text: 'Porque `GroupBy` não funciona depois de `Join`.' },
          { id: 'c', text: 'Por questão de desempenho apenas.' },
          { id: 'd', text: 'A ordem é indiferente.' },
        ],
        explanation:
          'Agrupar por id exigiria uma segunda consulta só para traduzir ids em nomes. Cruzar primeiro deixa todos os dados disponíveis para o agrupamento.',
      },
      {
        id: 's04c06l10q2',
        type: 'single',
        prompt: 'Por que o total cruzado pode ser menor que a soma de todos os pedidos?',
        options: [
          { id: 'a', text: 'Porque o `Join` descarta pedidos cujo cliente não existe.', correct: true },
          { id: 'b', text: 'Porque `Sum` ignora valores negativos.' },
          { id: 'c', text: 'Porque `GroupBy` perde elementos.' },
          { id: 'd', text: 'Isso nunca acontece.' },
        ],
        explanation:
          'A junção interna exige correspondência dos dois lados. Um pedido com id de cliente inexistente some do resultado sem nenhum sinal.',
      },
      {
        id: 's04c06l10q3',
        type: 'single',
        prompt: 'Qual é o erro mais comum ao escrever um `Join`?',
        options: [
          { id: 'a', text: 'Trocar as duas lambdas de chave, o que produz um resultado vazio.', correct: true },
          { id: 'b', text: 'Esquecer o `ToList`.' },
          { id: 'c', text: 'Usar `GroupBy` antes.' },
          { id: 'd', text: 'Ordenar antes de cruzar.' },
        ],
        explanation:
          'A troca compila normalmente, porque os tipos costumam coincidir. O sintoma é uma sequência vazia, sem exceção nem aviso.',
      },
    ],
    challenge: {
      brief:
        'Analise pedidos e clientes de duas fontes relacionadas, produzindo um relatório por cliente e um consolidado que reporta os pedidos órfãos.',
      requirements: [
        'Declare `record Cliente(int Id, string Nome, string Cidade)` e `record Pedido(int ClienteId, string Produto, int Valor)` fora da classe',
        'Leia `c` clientes, cada um em três linhas, e depois `p` pedidos, cada um em três linhas',
        'Uma linha por cliente com pedidos, no formato `Ana (SP): 2 pedidos, total 350, maior 200`',
        'Os clientes saem em ordem decrescente de total, desempatando por nome crescente',
        'Clientes sem nenhum pedido não aparecem no relatório',
        'Depois: `Clientes com pedidos: k`',
        'Depois: `Produtos vendidos: a b c`, em ordem alfabética e sem repetição',
        'Depois: `Total cruzado: X`',
        'Depois: `Pedidos orfaos: o`',
        'Por último: `Melhor cliente: nome`, ou `Melhor cliente: nenhum` se nada cruzou',
        'Use `Join`, `GroupBy` e os agregadores, sem laços de processamento',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

record Cliente(int Id, string Nome, string Cidade);
record Pedido(int ClienteId, string Produto, int Valor);

class Program
{
    static void Main()
    {
        int c = int.Parse(Console.ReadLine());

        List<Cliente> clientes = new List<Cliente>();
        for (int i = 0; i < c; i++)
        {
            int id = int.Parse(Console.ReadLine());
            string nome = Console.ReadLine();
            string cidade = Console.ReadLine();
            clientes.Add(new Cliente(id, nome, cidade));
        }

        int p = int.Parse(Console.ReadLine());

        List<Pedido> pedidos = new List<Pedido>();
        for (int i = 0; i < p; i++)
        {
            int clienteId = int.Parse(Console.ReadLine());
            string produto = Console.ReadLine();
            int valor = int.Parse(Console.ReadLine());
            pedidos.Add(new Pedido(clienteId, produto, valor));
        }

        // Cruze, agrupe, agregue e reporte
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Linq;

record Cliente(int Id, string Nome, string Cidade);
record Pedido(int ClienteId, string Produto, int Valor);

class Program
{
    static void Main()
    {
        int c = int.Parse(Console.ReadLine());

        List<Cliente> clientes = new List<Cliente>();
        for (int i = 0; i < c; i++)
        {
            int id = int.Parse(Console.ReadLine());
            string nome = Console.ReadLine();
            string cidade = Console.ReadLine();
            clientes.Add(new Cliente(id, nome, cidade));
        }

        int p = int.Parse(Console.ReadLine());

        List<Pedido> pedidos = new List<Pedido>();
        for (int i = 0; i < p; i++)
        {
            int clienteId = int.Parse(Console.ReadLine());
            string produto = Console.ReadLine();
            int valor = int.Parse(Console.ReadLine());
            pedidos.Add(new Pedido(clienteId, produto, valor));
        }

        var cruzados = pedidos.Join(
            clientes,
            pedido => pedido.ClienteId,
            cliente => cliente.Id,
            (pedido, cliente) => new { cliente.Nome, cliente.Cidade, pedido.Produto, pedido.Valor })
            .ToList();

        var relatorio = cruzados
            .GroupBy(x => new { x.Nome, x.Cidade })
            .Select(g => new
            {
                g.Key.Nome,
                g.Key.Cidade,
                Quantidade = g.Count(),
                Total = g.Sum(x => x.Valor),
                Maior = g.Max(x => x.Valor)
            })
            .OrderByDescending(x => x.Total)
            .ThenBy(x => x.Nome)
            .ToList();

        foreach (var linha in relatorio)
        {
            Console.WriteLine(
                $"{linha.Nome} ({linha.Cidade}): {linha.Quantidade} pedidos, " +
                $"total {linha.Total}, maior {linha.Maior}");
        }

        Console.WriteLine($"Clientes com pedidos: {relatorio.Count}");

        var produtos = cruzados.Select(x => x.Produto).Distinct().OrderBy(x => x);
        Console.WriteLine($"Produtos vendidos: {string.Join(" ", produtos)}");

        Console.WriteLine($"Total cruzado: {cruzados.Sum(x => x.Valor)}");
        Console.WriteLine($"Pedidos orfaos: {pedidos.Count - cruzados.Count}");

        if (relatorio.Any())
        {
            Console.WriteLine($"Melhor cliente: {relatorio.First().Nome}");
        }
        else
        {
            Console.WriteLine("Melhor cliente: nenhum");
        }
    }
}
`,
      hints: [
        'Agrupe por um objeto anônimo com nome e cidade: assim os dois campos ficam disponíveis na chave.',
        'Materialize o resultado do `Join` com `ToList()` — ele é usado no agrupamento, na lista de produtos e no total.',
      ],
      tests: [
        {
          name: 'Dois clientes e um pedido órfão',
          stdin: '2\n1\nAna\nSP\n2\nBruno\nRJ\n4\n1\nTeclado\n200\n2\nMouse\n80\n1\nMouse\n150\n9\nMonitor\n500\n',
          expectedStdout:
            'Ana (SP): 2 pedidos, total 350, maior 200\nBruno (RJ): 1 pedidos, total 80, maior 80\n' +
            'Clientes com pedidos: 2\nProdutos vendidos: Mouse Teclado\nTotal cruzado: 430\n' +
            'Pedidos orfaos: 1\nMelhor cliente: Ana',
        },
        {
          name: 'Cliente sem pedidos não aparece',
          stdin: '2\n1\nAtivo\nSP\n2\nInativo\nRJ\n1\n1\nItem\n100\n',
          expectedStdout:
            'Ativo (SP): 1 pedidos, total 100, maior 100\nClientes com pedidos: 1\n' +
            'Produtos vendidos: Item\nTotal cruzado: 100\nPedidos orfaos: 0\nMelhor cliente: Ativo',
        },
        {
          name: 'Nenhum pedido cruza',
          stdin: '1\n1\nX\nSP\n2\n7\nA\n50\n8\nB\n60\n',
          expectedStdout:
            'Clientes com pedidos: 0\nProdutos vendidos:\nTotal cruzado: 0\n' +
            'Pedidos orfaos: 2\nMelhor cliente: nenhum',
        },
        {
          name: 'Empate no total desempatado por nome',
          stdin: '2\n1\nZeca\nSP\n2\nAna\nRJ\n2\n1\nA\n100\n2\nB\n100\n',
          expectedStdout:
            'Ana (RJ): 1 pedidos, total 100, maior 100\nZeca (SP): 1 pedidos, total 100, maior 100\n' +
            'Clientes com pedidos: 2\nProdutos vendidos: A B\nTotal cruzado: 200\n' +
            'Pedidos orfaos: 0\nMelhor cliente: Ana',
          hidden: true,
        },
      ],
    },
  },
]
