import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's07c07l01',
    title: 'Representando um grafo',
    objective: 'Guardar vértices e arestas em memória e responder perguntas básicas sobre a estrutura.',
    concept: [
      {
        kind: 'text',
        body:
          'Um **grafo** é um conjunto de **vértices** ligados por **arestas**. Quase toda relação entre coisas vira um grafo: amizades, ruas entre cidades, dependências entre tarefas, links entre páginas.',
      },
      {
        kind: 'text',
        body:
          'Os vértices são numerados de `0` a `n-1`. Assim o grafo cabe em arrays comuns e o índice do vértice é o índice do array — sem dicionários, sem objetos.',
      },
      {
        kind: 'text',
        body: 'Existem duas representações clássicas, e a escolha muda a complexidade de tudo que vem depois.',
      },
      {
        kind: 'table',
        headers: ['', 'Lista de adjacência', 'Matriz de adjacência'],
        rows: [
          ['memória', 'O(V + A)', 'O(V²)'],
          ['percorrer vizinhos de v', 'O(grau de v)', 'O(V)'],
          ['perguntar "a e b são vizinhos?"', 'O(grau de a)', 'O(1)'],
          ['bom para', 'grafos esparsos (o caso comum)', 'grafos densos e testes de aresta'],
        ],
      },
      {
        kind: 'text',
        body:
          'A **lista de adjacência** é um array de listas: `grafo[v]` guarda os vizinhos de `v`. É o padrão para quase tudo, porque grafos reais têm muito menos arestas do que V².',
      },
      {
        kind: 'code',
        code: `static List<int>[] CriarGrafo(int vertices)
{
    var grafo = new List<int>[vertices];

    for (int i = 0; i < vertices; i++)
    {
        grafo[i] = new List<int>();
    }

    return grafo;
}

static void Conectar(List<int>[] grafo, int a, int b)
{
    grafo[a].Add(b);
    grafo[b].Add(a);
}`,
        caption: 'Duas linhas em Conectar: a aresta é não dirigida, então ela aparece dos dois lados.',
      },
      {
        kind: 'code',
        code: `var grafo = CriarGrafo(5);
Conectar(grafo, 0, 1);
Conectar(grafo, 0, 2);
Conectar(grafo, 1, 3);
Conectar(grafo, 3, 4);

for (int v = 0; v < grafo.Length; v++)
{
    Console.WriteLine($"{v}: {string.Join(" ", grafo[v])}");
}`,
      },
      {
        kind: 'output',
        code: `0: 1 2
1: 0 3
2: 0
3: 1 4
4: 3`,
        caption: 'Cada aresta aparece duas vezes: 0-1 está na lista do 0 e na lista do 1.',
      },
      {
        kind: 'text',
        body:
          'A **matriz de adjacência** é um `bool[V, V]`: `matriz[a, b]` diz se existe aresta de `a` para `b`. Responde "são vizinhos?" instantaneamente, mas gasta V² de memória mesmo quando o grafo tem três arestas.',
      },
      {
        kind: 'code',
        code: `bool[,] matriz = new bool[4, 4];

matriz[0, 1] = true;
matriz[1, 0] = true;
matriz[1, 2] = true;
matriz[2, 1] = true;

for (int i = 0; i < 4; i++)
{
    var linha = new List<string>();

    for (int j = 0; j < 4; j++)
    {
        linha.Add(matriz[i, j] ? "1" : "0");
    }

    Console.WriteLine(string.Join(" ", linha));
}`,
      },
      {
        kind: 'output',
        code: `0 1 0 0
1 0 1 0
0 1 0 0
0 0 0 0`,
        caption: 'A matriz de um grafo não dirigido é simétrica: matriz[i, j] == matriz[j, i].',
      },
      {
        kind: 'compare',
        good: `var grafo = new List<int>[1000000];
for (int i = 0; i < 1000000; i++)
{
    grafo[i] = new List<int>();
}
// memoria: proporcional ao numero de arestas`,
        bad: `bool[,] matriz = new bool[1000000, 1000000];
// 10^12 celulas: nao cabe em memoria alguma`,
        goodLabel: 'Lista de adjacência: escala',
        badLabel: 'Matriz: estoura em grafos grandes',
      },
      {
        kind: 'text',
        body:
          'Num grafo **dirigido** a aresta tem sentido: seguir de `a` para `b` não implica poder voltar. A diferença no código é só uma linha — `Conectar` vira `Apontar` e adiciona a aresta num lado só.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Não dirigido',
          code: `static void Conectar(List<int>[] g, int a, int b)
{
    g[a].Add(b);
    g[b].Add(a);
}`,
        },
        right: {
          label: 'Dirigido',
          code: `static void Apontar(List<int>[] g, int de, int para)
{
    g[de].Add(para);
}`,
        },
        note: 'Todo algoritmo desta seção funciona nos dois casos; só a construção muda.',
      },
      {
        kind: 'text',
        body:
          'O **grau** de um vértice é quantas arestas saem dele — em lista de adjacência, `grafo[v].Count`. Num grafo não dirigido, a soma de todos os graus é o dobro do número de arestas, porque cada aresta foi contada nas duas pontas.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Metade da dificuldade de um problema de grafos é perceber que ele **é** um problema de grafos. "Qual o menor número de trocas até chegar nesse estado?" é caminho mínimo; "essas peças podem ser montadas nessa ordem?" é ordenação topológica.',
      },
    ],
    quiz: [
      {
        id: 's07c07l01q1',
        type: 'single',
        prompt: 'Um grafo tem 100.000 vértices e 300.000 arestas. Qual representação escolher?',
        options: [
          { id: 'a', text: 'Lista de adjacência: a matriz precisaria de 10 bilhões de células', correct: true },
          { id: 'b', text: 'Matriz de adjacência: responde "são vizinhos?" em O(1)' },
          { id: 'c', text: 'Tanto faz, as duas ocupam a mesma memória' },
          { id: 'd', text: 'Nenhuma das duas: esse grafo é grande demais' },
        ],
        explanation:
          'A matriz é O(V²) — 100.000² = 10¹⁰ células. A lista é O(V + A) = 400.000 entradas. Grafos reais são esparsos, e por isso a lista é o padrão.',
      },
      {
        id: 's07c07l01q2',
        type: 'single',
        prompt: 'Depois deste código, qual o valor de `grafo[2].Count`?',
        code: `var grafo = CriarGrafo(4);
Conectar(grafo, 0, 2);
Conectar(grafo, 1, 2);
Conectar(grafo, 2, 3);`,
        options: [
          { id: 'a', text: '3', correct: true },
          { id: 'b', text: '1' },
          { id: 'c', text: '2' },
          { id: 'd', text: '6' },
        ],
        explanation:
          '`Conectar` adiciona a aresta nos dois lados. O vértice 2 aparece nas três chamadas, então recebe três vizinhos: 0, 1 e 3.',
      },
      {
        id: 's07c07l01q3',
        type: 'single',
        prompt: 'Num grafo não dirigido, a soma de `grafo[v].Count` para todo `v` vale 14. Quantas arestas o grafo tem?',
        options: [
          { id: 'a', text: '7', correct: true },
          { id: 'b', text: '14' },
          { id: 'c', text: '28' },
          { id: 'd', text: 'Depende do número de vértices' },
        ],
        explanation:
          'Cada aresta é contada uma vez em cada ponta, então a soma dos graus é sempre o dobro do número de arestas: 14 / 2 = 7.',
      },
    ],
    challenge: {
      brief:
        'Monte uma rede de contatos como lista de adjacência e responda perguntas sobre a estrutura: grau de cada pessoa, total de arestas, quem tem mais conexões, se duas pessoas se conhecem e quem está isolado.',
      requirements: [
        'Use `List<int>[]` como representação — nada de matriz.',
        '`ContarArestas` deve rodar em O(V + A), somando os graus e dividindo por 2.',
        '`SaoVizinhos(g, a, b)` responde se existe aresta entre `a` e `b`.',
        '`MaisConectado` devolve o vértice de maior grau; empate resolve pelo menor índice.',
        'Quando não houver vértices isolados, imprima `nenhum` no lugar da lista.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static List<int>[] CriarGrafo(int vertices)
    {
        // TODO: crie o array e inicialize cada posicao com uma lista vazia
        return null;
    }

    static void Conectar(List<int>[] grafo, int a, int b)
    {
        // TODO: aresta nao dirigida entra dos dois lados
    }

    static bool SaoVizinhos(List<int>[] grafo, int a, int b)
    {
        // TODO
        return false;
    }

    static int ContarArestas(List<int>[] grafo)
    {
        // TODO: some os graus e divida por 2
        return 0;
    }

    static int MaisConectado(List<int>[] grafo)
    {
        // TODO
        return 0;
    }

    static List<int> Isolados(List<int>[] grafo)
    {
        // TODO: vertices com grau 0
        return new List<int>();
    }

    static string Formatar(List<int> valores)
    {
        return valores.Count == 0 ? "nenhum" : string.Join(",", valores);
    }

    static void Main()
    {
        var rede = CriarGrafo(7);
        Conectar(rede, 0, 1);
        Conectar(rede, 0, 2);
        Conectar(rede, 1, 2);
        Conectar(rede, 1, 3);
        Conectar(rede, 3, 4);
        Conectar(rede, 5, 6);

        for (int v = 0; v < rede.Length; v++)
        {
            Console.WriteLine($"grau {v}: {rede[v].Count}");
        }

        Console.WriteLine($"arestas: {ContarArestas(rede)}");
        Console.WriteLine($"mais conectado: {MaisConectado(rede)}");
        Console.WriteLine($"0 e 2 vizinhos: {SaoVizinhos(rede, 0, 2)}");
        Console.WriteLine($"0 e 3 vizinhos: {SaoVizinhos(rede, 0, 3)}");
        Console.WriteLine($"isolados: {Formatar(Isolados(rede))}");

        var vazio = CriarGrafo(3);
        Console.WriteLine($"vazio arestas: {ContarArestas(vazio)}");
        Console.WriteLine($"vazio isolados: {Formatar(Isolados(vazio))}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static List<int>[] CriarGrafo(int vertices)
    {
        var grafo = new List<int>[vertices];

        for (int i = 0; i < vertices; i++)
        {
            grafo[i] = new List<int>();
        }

        return grafo;
    }

    static void Conectar(List<int>[] grafo, int a, int b)
    {
        grafo[a].Add(b);
        grafo[b].Add(a);
    }

    static bool SaoVizinhos(List<int>[] grafo, int a, int b)
    {
        return grafo[a].Contains(b);
    }

    static int ContarArestas(List<int>[] grafo)
    {
        int pontas = 0;

        for (int v = 0; v < grafo.Length; v++)
        {
            pontas += grafo[v].Count;
        }

        return pontas / 2;
    }

    static int MaisConectado(List<int>[] grafo)
    {
        int melhor = 0;

        for (int v = 1; v < grafo.Length; v++)
        {
            if (grafo[v].Count > grafo[melhor].Count)
            {
                melhor = v;
            }
        }

        return melhor;
    }

    static List<int> Isolados(List<int>[] grafo)
    {
        var lista = new List<int>();

        for (int v = 0; v < grafo.Length; v++)
        {
            if (grafo[v].Count == 0)
            {
                lista.Add(v);
            }
        }

        return lista;
    }

    static string Formatar(List<int> valores)
    {
        return valores.Count == 0 ? "nenhum" : string.Join(",", valores);
    }

    static void Main()
    {
        var rede = CriarGrafo(7);
        Conectar(rede, 0, 1);
        Conectar(rede, 0, 2);
        Conectar(rede, 1, 2);
        Conectar(rede, 1, 3);
        Conectar(rede, 3, 4);
        Conectar(rede, 5, 6);

        for (int v = 0; v < rede.Length; v++)
        {
            Console.WriteLine($"grau {v}: {rede[v].Count}");
        }

        Console.WriteLine($"arestas: {ContarArestas(rede)}");
        Console.WriteLine($"mais conectado: {MaisConectado(rede)}");
        Console.WriteLine($"0 e 2 vizinhos: {SaoVizinhos(rede, 0, 2)}");
        Console.WriteLine($"0 e 3 vizinhos: {SaoVizinhos(rede, 0, 3)}");
        Console.WriteLine($"isolados: {Formatar(Isolados(rede))}");

        var vazio = CriarGrafo(3);
        Console.WriteLine($"vazio arestas: {ContarArestas(vazio)}");
        Console.WriteLine($"vazio isolados: {Formatar(Isolados(vazio))}");
    }
}`,
      hints: [
        '`new List<int>[n]` cria o array, mas cada posição começa como `null`. É preciso um laço para criar as listas.',
        'A soma dos graus conta cada aresta duas vezes, uma em cada ponta. Por isso a divisão por 2.',
        'Comece `MaisConectado` supondo que o vértice 0 é o melhor e só troque quando encontrar um grau estritamente maior — assim o empate fica com o menor índice.',
      ],
      tests: [
        {
          name: 'Rede de contatos',
          expectedStdout:
            'grau 0: 2\ngrau 1: 3\ngrau 2: 2\ngrau 3: 2\ngrau 4: 1\ngrau 5: 1\ngrau 6: 1\n' +
            'arestas: 6\nmais conectado: 1\n0 e 2 vizinhos: True\n0 e 3 vizinhos: False\nisolados: nenhum\n' +
            'vazio arestas: 0\nvazio isolados: 0,1,2',
        },
      ],
    },
  },

  {
    id: 's07c07l02',
    title: 'Busca em largura (BFS)',
    objective: 'Percorrer um grafo por camadas e obter a distância mínima em número de arestas.',
    concept: [
      {
        kind: 'text',
        body:
          'A **busca em largura** visita o grafo em camadas: primeiro a origem, depois todos os vizinhos dela, depois os vizinhos dos vizinhos. É o algoritmo mais útil de toda a teoria de grafos, e cabe em vinte linhas.',
      },
      {
        kind: 'text',
        body:
          'A estrutura que produz esse comportamento é a **fila** (`Queue<int>`): o primeiro que entra é o primeiro que sai, então nada da camada 2 é processado antes de a camada 1 acabar.',
      },
      {
        kind: 'code',
        code: `static int[] DistanciasPorLargura(List<int>[] grafo, int origem)
{
    var distancia = new int[grafo.Length];

    for (int i = 0; i < distancia.Length; i++)
    {
        distancia[i] = -1;
    }

    var fila = new Queue<int>();
    distancia[origem] = 0;
    fila.Enqueue(origem);

    while (fila.Count > 0)
    {
        int atual = fila.Dequeue();

        foreach (int vizinho in grafo[atual])
        {
            if (distancia[vizinho] == -1)
            {
                distancia[vizinho] = distancia[atual] + 1;
                fila.Enqueue(vizinho);
            }
        }
    }

    return distancia;
}`,
        caption: 'O array de distâncias faz dois trabalhos: guarda a resposta e marca quem já foi visitado.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O `-1` inicial é a peça central. Ele significa "ainda não visitado" **e** "inalcançável" ao mesmo tempo — se o vértice nunca for descoberto, o `-1` permanece e vira a resposta correta.',
      },
      {
        kind: 'text',
        body: 'Rodando sobre um grafo pequeno, dá para ver as camadas se formando:',
      },
      {
        kind: 'code',
        code: `var g = CriarGrafo(7);
Conectar(g, 0, 1);
Conectar(g, 0, 2);
Conectar(g, 1, 3);
Conectar(g, 2, 4);
Conectar(g, 3, 5);
Conectar(g, 5, 6);

int[] d = DistanciasPorLargura(g, 0);

for (int v = 0; v < d.Length; v++)
{
    Console.WriteLine($"dist {v}: {d[v]}");
}`,
      },
      {
        kind: 'output',
        code: `dist 0: 0
dist 1: 1
dist 2: 1
dist 3: 2
dist 4: 2
dist 5: 3
dist 6: 4`,
        caption: 'Camada 0: {0}. Camada 1: {1, 2}. Camada 2: {3, 4}. E assim por diante.',
      },
      {
        kind: 'text',
        body:
          'A garantia que faz o BFS valer a pena: **a primeira vez que um vértice é descoberto já é pelo caminho mais curto**. Como as camadas são processadas em ordem, ao chegar em `v` pela primeira vez não existe rota mais curta ainda por descobrir.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Marque o vértice **ao enfileirar**, não ao desenfileirar. Se marcar só na saída da fila, o mesmo vértice entra várias vezes e o custo explode — num grafo denso vira O(V²) ou pior.',
      },
      {
        kind: 'compare',
        good: `if (distancia[vizinho] == -1)
{
    distancia[vizinho] = distancia[atual] + 1;
    fila.Enqueue(vizinho);
}`,
        bad: `fila.Enqueue(vizinho);
// marcar so depois, no Dequeue:
// o mesmo vertice entra na fila
// uma vez por aresta que chega nele`,
        goodLabel: 'Marca ao enfileirar',
        badLabel: 'Marca ao desenfileirar',
      },
      {
        kind: 'text',
        body:
          'O custo é **O(V + A)**: cada vértice entra na fila no máximo uma vez, e a lista de vizinhos de cada um é percorrida uma vez só. Um grafo com 300 mil vértices roda em milissegundos.',
      },
      {
        kind: 'table',
        headers: ['Pergunta', 'Como o BFS responde'],
        rows: [
          ['Quantos passos de A até B?', '`distancia[B]`'],
          ['B é alcançável a partir de A?', '`distancia[B] != -1`'],
          ['Qual o vértice mais distante de A?', 'o de maior `distancia`, ignorando os `-1`'],
          ['Quantos vértices A não alcança?', 'quantos `-1` sobraram'],
        ],
      },
    ],
    quiz: [
      {
        id: 's07c07l02q1',
        type: 'single',
        prompt: 'Por que o BFS usa fila e não pilha?',
        options: [
          {
            id: 'a',
            text: 'A fila processa a camada k inteira antes da camada k+1, que é o que garante a distância mínima',
            correct: true,
          },
          { id: 'b', text: 'A fila é mais rápida que a pilha em C#' },
          { id: 'c', text: 'A pilha não permite guardar inteiros' },
          { id: 'd', text: 'Tanto faz: os dois dão o mesmo resultado' },
        ],
        explanation:
          'Trocar a fila por pilha transforma o BFS em DFS: continua percorrendo o grafo inteiro, mas os valores em `distancia` deixam de ser mínimos.',
      },
      {
        id: 's07c07l02q2',
        type: 'single',
        prompt: 'O que significa `distancia[7] == -1` ao final do BFS a partir do vértice 0?',
        options: [
          { id: 'a', text: 'Não existe caminho do vértice 0 até o vértice 7', correct: true },
          { id: 'b', text: 'O vértice 7 está a uma aresta de distância' },
          { id: 'c', text: 'O grafo tem um ciclo' },
          { id: 'd', text: 'O vértice 7 não existe no grafo' },
        ],
        explanation:
          'O `-1` só sobrevive em vértices que a busca nunca alcançou. Contar quantos `-1` restaram é a forma mais barata de medir o alcance de uma origem.',
      },
      {
        id: 's07c07l02q3',
        type: 'single',
        prompt: 'Qual a complexidade do BFS em lista de adjacência?',
        options: [
          { id: 'a', text: 'O(V + A)', correct: true },
          { id: 'b', text: 'O(V²)' },
          { id: 'c', text: 'O(A log V)' },
          { id: 'd', text: 'O(V · A)' },
        ],
        explanation:
          'Cada vértice entra na fila uma vez (O(V)) e cada lista de vizinhos é percorrida uma vez (O(A) no total). Em matriz de adjacência seria O(V²), porque percorrer os vizinhos de um vértice custa V.',
      },
    ],
    challenge: {
      brief:
        'Implemente o BFS e use-o para medir o alcance de uma origem: a distância até cada vértice, o vértice mais distante, quantos ficam inalcançáveis e a ordem de visita.',
      requirements: [
        '`DistanciasPorLargura` e `OrdemDeVisita` devem rodar em O(V + A), usando `Queue<int>`.',
        'Vértices inalcançáveis ficam com distância `-1`.',
        'Em `MaisLonge`, ignore os `-1` e resolva empates pelo menor índice.',
        'Um teste roda sobre 300.000 vértices: nada de percorrer o grafo inteiro por vértice.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static List<int>[] CriarGrafo(int n)
    {
        var g = new List<int>[n];

        for (int i = 0; i < n; i++)
        {
            g[i] = new List<int>();
        }

        return g;
    }

    static void Conectar(List<int>[] g, int a, int b)
    {
        g[a].Add(b);
        g[b].Add(a);
    }

    static int[] DistanciasPorLargura(List<int>[] grafo, int origem)
    {
        // TODO: fila, array de distancias iniciado com -1
        return new int[grafo.Length];
    }

    static List<int> OrdemDeVisita(List<int>[] grafo, int origem)
    {
        // TODO: mesma varredura, guardando a ordem em que os vertices saem da fila
        return new List<int>();
    }

    static int MaisLonge(int[] distancia)
    {
        // TODO: maior distancia diferente de -1
        return 0;
    }

    static int Inalcancaveis(int[] distancia)
    {
        // TODO
        return 0;
    }

    static void Main()
    {
        var g = CriarGrafo(7);
        Conectar(g, 0, 1);
        Conectar(g, 0, 2);
        Conectar(g, 1, 3);
        Conectar(g, 2, 4);
        Conectar(g, 3, 5);
        Conectar(g, 5, 6);

        Console.WriteLine($"ordem: {string.Join(" ", OrdemDeVisita(g, 0))}");
        int[] d = DistanciasPorLargura(g, 0);
        Console.WriteLine($"dists: {string.Join(",", d)}");

        var h = CriarGrafo(6);
        Conectar(h, 0, 1);
        Conectar(h, 1, 2);
        Conectar(h, 3, 4);

        int[] dh = DistanciasPorLargura(h, 0);
        Console.WriteLine($"desconexo: {string.Join(",", dh)}");
        Console.WriteLine($"mais longe: {MaisLonge(dh)} a {dh[MaisLonge(dh)]}");
        Console.WriteLine($"inalcancaveis: {Inalcancaveis(dh)}");

        int n = 300000;
        var corrente = CriarGrafo(n);

        for (int i = 0; i + 1 < n; i++)
        {
            Conectar(corrente, i, i + 1);
        }

        int[] dc = DistanciasPorLargura(corrente, 0);
        long soma = 0;

        foreach (int x in dc)
        {
            soma += x;
        }

        Console.WriteLine($"corrente dist final: {dc[n - 1]}");
        Console.WriteLine($"corrente soma: {soma}");

        var estrela = CriarGrafo(n);

        for (int i = 1; i < n; i++)
        {
            Conectar(estrela, 0, i);
        }

        int[] de = DistanciasPorLargura(estrela, 0);
        long somaEstrela = 0;

        foreach (int x in de)
        {
            somaEstrela += x;
        }

        Console.WriteLine($"estrela soma: {somaEstrela}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static List<int>[] CriarGrafo(int n)
    {
        var g = new List<int>[n];

        for (int i = 0; i < n; i++)
        {
            g[i] = new List<int>();
        }

        return g;
    }

    static void Conectar(List<int>[] g, int a, int b)
    {
        g[a].Add(b);
        g[b].Add(a);
    }

    static int[] DistanciasPorLargura(List<int>[] grafo, int origem)
    {
        var distancia = new int[grafo.Length];

        for (int i = 0; i < distancia.Length; i++)
        {
            distancia[i] = -1;
        }

        var fila = new Queue<int>();
        distancia[origem] = 0;
        fila.Enqueue(origem);

        while (fila.Count > 0)
        {
            int atual = fila.Dequeue();

            foreach (int vizinho in grafo[atual])
            {
                if (distancia[vizinho] == -1)
                {
                    distancia[vizinho] = distancia[atual] + 1;
                    fila.Enqueue(vizinho);
                }
            }
        }

        return distancia;
    }

    static List<int> OrdemDeVisita(List<int>[] grafo, int origem)
    {
        var visitado = new bool[grafo.Length];
        var ordem = new List<int>();
        var fila = new Queue<int>();

        visitado[origem] = true;
        fila.Enqueue(origem);

        while (fila.Count > 0)
        {
            int atual = fila.Dequeue();
            ordem.Add(atual);

            foreach (int vizinho in grafo[atual])
            {
                if (!visitado[vizinho])
                {
                    visitado[vizinho] = true;
                    fila.Enqueue(vizinho);
                }
            }
        }

        return ordem;
    }

    static int MaisLonge(int[] distancia)
    {
        int melhor = 0;

        for (int v = 1; v < distancia.Length; v++)
        {
            if (distancia[v] > distancia[melhor])
            {
                melhor = v;
            }
        }

        return melhor;
    }

    static int Inalcancaveis(int[] distancia)
    {
        int total = 0;

        foreach (int x in distancia)
        {
            if (x == -1)
            {
                total++;
            }
        }

        return total;
    }

    static void Main()
    {
        var g = CriarGrafo(7);
        Conectar(g, 0, 1);
        Conectar(g, 0, 2);
        Conectar(g, 1, 3);
        Conectar(g, 2, 4);
        Conectar(g, 3, 5);
        Conectar(g, 5, 6);

        Console.WriteLine($"ordem: {string.Join(" ", OrdemDeVisita(g, 0))}");
        int[] d = DistanciasPorLargura(g, 0);
        Console.WriteLine($"dists: {string.Join(",", d)}");

        var h = CriarGrafo(6);
        Conectar(h, 0, 1);
        Conectar(h, 1, 2);
        Conectar(h, 3, 4);

        int[] dh = DistanciasPorLargura(h, 0);
        Console.WriteLine($"desconexo: {string.Join(",", dh)}");
        Console.WriteLine($"mais longe: {MaisLonge(dh)} a {dh[MaisLonge(dh)]}");
        Console.WriteLine($"inalcancaveis: {Inalcancaveis(dh)}");

        int n = 300000;
        var corrente = CriarGrafo(n);

        for (int i = 0; i + 1 < n; i++)
        {
            Conectar(corrente, i, i + 1);
        }

        int[] dc = DistanciasPorLargura(corrente, 0);
        long soma = 0;

        foreach (int x in dc)
        {
            soma += x;
        }

        Console.WriteLine($"corrente dist final: {dc[n - 1]}");
        Console.WriteLine($"corrente soma: {soma}");

        var estrela = CriarGrafo(n);

        for (int i = 1; i < n; i++)
        {
            Conectar(estrela, 0, i);
        }

        int[] de = DistanciasPorLargura(estrela, 0);
        long somaEstrela = 0;

        foreach (int x in de)
        {
            somaEstrela += x;
        }

        Console.WriteLine($"estrela soma: {somaEstrela}");
    }
}`,
      hints: [
        'Preencha o array de distâncias com `-1` antes de começar. Ele é ao mesmo tempo a resposta e a marcação de visitado.',
        'Em `MaisLonge`, `-1` nunca vence uma distância real porque toda distância válida é `>= 0` — a comparação simples já ignora os inalcançáveis.',
        'A soma das distâncias na corrente é 0 + 1 + 2 + ... + (n-1). Use `long`: em 300.000 vértices o resultado passa de 4 bilhões.',
      ],
      tests: [
        {
          name: 'Camadas e alcance',
          expectedStdout:
            'ordem: 0 1 2 3 4 5 6\ndists: 0,1,1,2,2,3,4\n' +
            'desconexo: 0,1,2,-1,-1,-1\nmais longe: 2 a 2\ninalcancaveis: 3\n' +
            'corrente dist final: 299999\ncorrente soma: 44999850000\nestrela soma: 299999',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's07c07l03',
    title: 'Busca em profundidade (DFS)',
    objective: 'Percorrer um grafo indo fundo antes de voltar, na versão recursiva e na versão com pilha explícita.',
    concept: [
      {
        kind: 'text',
        body:
          'A **busca em profundidade** faz o oposto do BFS: ao encontrar um vizinho novo, ela vai atrás dele imediatamente e só volta quando aquele ramo se esgota. É o algoritmo natural para perguntas de estrutura — "há ciclo?", "quais partes estão conectadas?", "qual a ordem das dependências?".',
      },
      {
        kind: 'text',
        body: 'A versão recursiva é curta porque a pilha de chamadas do C# faz o trabalho de lembrar onde voltar.',
      },
      {
        kind: 'code',
        code: `static void VisitarEmProfundidade(List<int>[] grafo, int atual, bool[] visitado, List<int> ordem)
{
    visitado[atual] = true;
    ordem.Add(atual);

    foreach (int vizinho in grafo[atual])
    {
        if (!visitado[vizinho])
        {
            VisitarEmProfundidade(grafo, vizinho, visitado, ordem);
        }
    }
}`,
      },
      {
        kind: 'code',
        code: `var g = CriarGrafo(7);
Conectar(g, 0, 1);
Conectar(g, 0, 2);
Conectar(g, 1, 3);
Conectar(g, 2, 4);
Conectar(g, 3, 5);
Conectar(g, 5, 6);

var ordem = new List<int>();
VisitarEmProfundidade(g, 0, new bool[7], ordem);
Console.WriteLine(string.Join(" ", ordem));`,
      },
      {
        kind: 'output',
        code: `0 1 3 5 6 2 4`,
        caption: 'O DFS desce 0 → 1 → 3 → 5 → 6 até o fim antes de sequer olhar o vértice 2.',
      },
      {
        kind: 'text',
        body:
          'Compare com o BFS no mesmo grafo, que produz `0 1 2 3 4 5 6`. Mesmo grafo, mesma origem, mesmo custo O(V + A) — o que muda é **a ordem**, e com ela o tipo de pergunta que cada um responde bem.',
      },
      {
        kind: 'table',
        headers: ['', 'BFS', 'DFS'],
        rows: [
          ['estrutura', 'fila', 'pilha (ou recursão)'],
          ['ordem', 'por camadas', 'ramo até o fim'],
          ['distância mínima em arestas', 'sim', 'não'],
          ['bom para', 'caminho mais curto, alcance', 'ciclos, componentes, ordem topológica'],
          ['memória no pior caso', 'largura do grafo', 'profundidade do grafo'],
        ],
      },
      {
        kind: 'text',
        body:
          'A mesma travessia sai com uma **pilha explícita** (`Stack<int>`). Fica mais longa, mas não depende da pilha de chamadas — e isso importa mais do que parece.',
      },
      {
        kind: 'code',
        code: `static List<int> ProfundidadeComPilha(List<int>[] grafo, int origem)
{
    var visitado = new bool[grafo.Length];
    var ordem = new List<int>();
    var pilha = new Stack<int>();

    pilha.Push(origem);

    while (pilha.Count > 0)
    {
        int atual = pilha.Pop();

        if (visitado[atual])
        {
            continue;
        }

        visitado[atual] = true;
        ordem.Add(atual);

        for (int i = grafo[atual].Count - 1; i >= 0; i--)
        {
            int vizinho = grafo[atual][i];

            if (!visitado[vizinho])
            {
                pilha.Push(vizinho);
            }
        }
    }

    return ordem;
}`,
        caption: 'O laço percorre os vizinhos de trás para frente: empilhados em ordem inversa, saem na ordem original.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Duas diferenças em relação ao BFS: aqui a marcação acontece **ao desempilhar**, não ao empilhar (por isso o `if (visitado[atual]) continue;`), e a inversão do laço é o que faz a ordem bater com a da versão recursiva.',
      },
      {
        kind: 'text',
        body:
          'Por que se dar ao trabalho da pilha explícita? Porque **a pilha de chamadas tem um teto**. Neste ambiente, a recursão morre por volta de 24 mil chamadas aninhadas — e um estouro de pilha não é uma exceção capturável: o processo inteiro é derrubado.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um grafo em corrente com 200 mil vértices tem profundidade 200 mil. O DFS recursivo estoura a pilha; o DFS com `Stack<int>` percorre os mesmos 200 mil sem esforço, porque a pilha vive no heap.',
      },
      {
        kind: 'compare',
        good: `// grafo grande ou profundidade desconhecida
var ordem = ProfundidadeComPilha(grafo, 0);`,
        bad: `// corrente de 200.000 vertices:
// 200.000 chamadas aninhadas
VisitarEmProfundidade(grafo, 0, visitado, ordem);
// Stack overflow. Processo encerrado.`,
        goodLabel: 'Pilha explícita: sem teto prático',
        badLabel: 'Recursão: teto por volta de 24 mil',
      },
      {
        kind: 'text',
        body:
          'A recursão continua sendo a escolha certa quando a profundidade é comprovadamente pequena — uma árvore balanceada de um milhão de nós tem profundidade 20. O critério não é o tamanho do grafo, é a **profundidade** dele.',
      },
    ],
    quiz: [
      {
        id: 's07c07l03q1',
        type: 'single',
        prompt: 'Trocar a `Queue` de um BFS por uma `Stack`, mantendo o resto igual, produz o quê?',
        options: [
          { id: 'a', text: 'Um DFS: percorre os mesmos vértices, mas as distâncias deixam de ser mínimas', correct: true },
          { id: 'b', text: 'Exatamente o mesmo resultado' },
          { id: 'c', text: 'Um laço infinito' },
          { id: 'd', text: 'Um erro de compilação' },
        ],
        explanation:
          'Fila e pilha oferecem a mesma interface conceitual — a diferença é qual elemento sai primeiro. É isso que separa BFS de DFS, e é por isso que só o BFS dá caminho mínimo em arestas.',
      },
      {
        id: 's07c07l03q2',
        type: 'single',
        prompt: 'Por que o DFS com pilha percorre os vizinhos de trás para frente ao empilhar?',
        options: [
          { id: 'a', text: 'Para que a ordem de visita coincida com a da versão recursiva', correct: true },
          { id: 'b', text: 'Porque `Stack<int>` não aceita `foreach`' },
          { id: 'c', text: 'Para evitar visitar o mesmo vértice duas vezes' },
          { id: 'd', text: 'Por desempenho: iterar de trás para frente é mais rápido' },
        ],
        explanation:
          'A pilha inverte a ordem de saída. Empilhando na ordem inversa, a inversão é desfeita e o primeiro vizinho da lista é o primeiro visitado — igual à recursão. Sem isso o resultado ainda é um DFS válido, só que em outra ordem.',
      },
      {
        id: 's07c07l03q3',
        type: 'single',
        prompt: 'Você precisa percorrer um grafo em corrente com 500.000 vértices. Qual versão do DFS usar?',
        options: [
          { id: 'a', text: 'Com pilha explícita: a recursão estouraria em uma profundidade dessas', correct: true },
          { id: 'b', text: 'Recursiva: é mais curta e o compilador otimiza a recursão' },
          { id: 'c', text: 'Qualquer uma; o estouro de pilha pode ser capturado com try/catch' },
          { id: 'd', text: 'Nenhuma: DFS não funciona em grafos grandes' },
        ],
        explanation:
          'A profundidade da corrente é 500.000 chamadas aninhadas, muito acima do teto de ~24 mil. E `StackOverflowException` não é capturável em .NET: o processo é encerrado sem chance de tratamento.',
      },
    ],
    challenge: {
      brief:
        'Implemente o DFS nas duas formas — recursiva e com pilha explícita — e mostre que produzem a mesma ordem. Depois use a versão com pilha para percorrer uma corrente de 200.000 vértices, que a recursiva não aguentaria.',
      requirements: [
        '`VisitarEmProfundidade` é recursiva e recebe o array de visitados por parâmetro.',
        '`ProfundidadeComPilha` usa `Stack<int>`, marca ao desempilhar e empilha os vizinhos em ordem inversa.',
        'As duas devem produzir exatamente a mesma ordem de visita.',
        '`ProfundidadeMaxima` devolve o nível mais fundo alcançado a partir da origem (a origem está no nível 0).',
        'O teste da corrente tem 200.000 vértices: só a versão com pilha sobrevive.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static List<int>[] CriarGrafo(int n)
    {
        var g = new List<int>[n];

        for (int i = 0; i < n; i++)
        {
            g[i] = new List<int>();
        }

        return g;
    }

    static void Conectar(List<int>[] g, int a, int b)
    {
        g[a].Add(b);
        g[b].Add(a);
    }

    static void VisitarEmProfundidade(List<int>[] grafo, int atual, bool[] visitado, List<int> ordem)
    {
        // TODO: marque, registre e desca em cada vizinho nao visitado
    }

    static List<int> ProfundidadeComPilha(List<int>[] grafo, int origem)
    {
        // TODO: Stack<int>, marcando ao desempilhar
        return new List<int>();
    }

    static int ProfundidadeMaxima(List<int>[] grafo, int atual, bool[] visitado, int nivel)
    {
        // TODO: maior nivel alcancado a partir daqui
        return 0;
    }

    static void Main()
    {
        var m = CriarGrafo(9);
        Conectar(m, 0, 1);
        Conectar(m, 0, 3);
        Conectar(m, 1, 2);
        Conectar(m, 3, 4);
        Conectar(m, 4, 5);
        Conectar(m, 5, 6);
        Conectar(m, 7, 8);

        var ordem = new List<int>();
        VisitarEmProfundidade(m, 0, new bool[9], ordem);
        Console.WriteLine($"recursivo: {string.Join(" ", ordem)}");
        Console.WriteLine($"com pilha: {string.Join(" ", ProfundidadeComPilha(m, 0))}");
        Console.WriteLine($"alcancados: {ordem.Count}");
        Console.WriteLine($"profundidade: {ProfundidadeMaxima(m, 0, new bool[9], 0)}");

        var outro = new List<int>();
        VisitarEmProfundidade(m, 7, new bool[9], outro);
        Console.WriteLine($"ordem de 7: {string.Join(" ", outro)}");

        int n = 200000;
        var corrente = CriarGrafo(n);

        for (int i = 0; i + 1 < n; i++)
        {
            Conectar(corrente, i, i + 1);
        }

        var op = ProfundidadeComPilha(corrente, 0);
        Console.WriteLine($"corrente visitados: {op.Count}");
        Console.WriteLine($"corrente ultimo: {op[op.Count - 1]}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static List<int>[] CriarGrafo(int n)
    {
        var g = new List<int>[n];

        for (int i = 0; i < n; i++)
        {
            g[i] = new List<int>();
        }

        return g;
    }

    static void Conectar(List<int>[] g, int a, int b)
    {
        g[a].Add(b);
        g[b].Add(a);
    }

    static void VisitarEmProfundidade(List<int>[] grafo, int atual, bool[] visitado, List<int> ordem)
    {
        visitado[atual] = true;
        ordem.Add(atual);

        foreach (int vizinho in grafo[atual])
        {
            if (!visitado[vizinho])
            {
                VisitarEmProfundidade(grafo, vizinho, visitado, ordem);
            }
        }
    }

    static List<int> ProfundidadeComPilha(List<int>[] grafo, int origem)
    {
        var visitado = new bool[grafo.Length];
        var ordem = new List<int>();
        var pilha = new Stack<int>();

        pilha.Push(origem);

        while (pilha.Count > 0)
        {
            int atual = pilha.Pop();

            if (visitado[atual])
            {
                continue;
            }

            visitado[atual] = true;
            ordem.Add(atual);

            for (int i = grafo[atual].Count - 1; i >= 0; i--)
            {
                int vizinho = grafo[atual][i];

                if (!visitado[vizinho])
                {
                    pilha.Push(vizinho);
                }
            }
        }

        return ordem;
    }

    static int ProfundidadeMaxima(List<int>[] grafo, int atual, bool[] visitado, int nivel)
    {
        visitado[atual] = true;
        int maior = nivel;

        foreach (int vizinho in grafo[atual])
        {
            if (!visitado[vizinho])
            {
                int candidato = ProfundidadeMaxima(grafo, vizinho, visitado, nivel + 1);

                if (candidato > maior)
                {
                    maior = candidato;
                }
            }
        }

        return maior;
    }

    static void Main()
    {
        var m = CriarGrafo(9);
        Conectar(m, 0, 1);
        Conectar(m, 0, 3);
        Conectar(m, 1, 2);
        Conectar(m, 3, 4);
        Conectar(m, 4, 5);
        Conectar(m, 5, 6);
        Conectar(m, 7, 8);

        var ordem = new List<int>();
        VisitarEmProfundidade(m, 0, new bool[9], ordem);
        Console.WriteLine($"recursivo: {string.Join(" ", ordem)}");
        Console.WriteLine($"com pilha: {string.Join(" ", ProfundidadeComPilha(m, 0))}");
        Console.WriteLine($"alcancados: {ordem.Count}");
        Console.WriteLine($"profundidade: {ProfundidadeMaxima(m, 0, new bool[9], 0)}");

        var outro = new List<int>();
        VisitarEmProfundidade(m, 7, new bool[9], outro);
        Console.WriteLine($"ordem de 7: {string.Join(" ", outro)}");

        int n = 200000;
        var corrente = CriarGrafo(n);

        for (int i = 0; i + 1 < n; i++)
        {
            Conectar(corrente, i, i + 1);
        }

        var op = ProfundidadeComPilha(corrente, 0);
        Console.WriteLine($"corrente visitados: {op.Count}");
        Console.WriteLine($"corrente ultimo: {op[op.Count - 1]}");
    }
}`,
      hints: [
        'Na versão recursiva, marque `visitado[atual] = true` como primeira linha — antes de olhar qualquer vizinho.',
        'Na versão com pilha, o `if (visitado[atual]) continue;` logo depois do `Pop` é obrigatório: o mesmo vértice pode ter sido empilhado por dois caminhos diferentes.',
        '`ProfundidadeMaxima` devolve `nivel` quando não há para onde descer e, caso contrário, o maior valor entre os ramos.',
      ],
      tests: [
        {
          name: 'Duas formas de descer',
          expectedStdout:
            'recursivo: 0 1 2 3 4 5 6\ncom pilha: 0 1 2 3 4 5 6\nalcancados: 7\nprofundidade: 4\n' +
            'ordem de 7: 7 8\n' +
            'corrente visitados: 200000\ncorrente ultimo: 199999',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's07c07l04',
    title: 'Caminho mínimo em grade',
    objective: 'Aplicar BFS a uma grade com obstáculos e reconstruir o caminho encontrado.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma grade de células é um grafo disfarçado: cada célula livre é um vértice, e cada par de células vizinhas é uma aresta. Não é preciso construir listas de adjacência — os vizinhos são calculados na hora.',
      },
      {
        kind: 'code',
        code: `static readonly int[] dl = { -1, 1, 0, 0 };
static readonly int[] dc = { 0, 0, -1, 1 };

// vizinhos de (linha, coluna):
// (linha + dl[d], coluna + dc[d]) para d de 0 a 3`,
        caption: 'Cima, baixo, esquerda, direita. Para permitir diagonais bastariam mais quatro pares.',
      },
      {
        kind: 'text',
        body:
          'O BFS é idêntico ao de grafos, trocando `foreach (int vizinho in grafo[atual])` por um laço nas quatro direções — com dois testes a mais: não sair da grade e não atravessar parede.',
      },
      {
        kind: 'code',
        code: `static int[,] DistanciasNaGrade(string[] grade, int linhaOrigem, int colunaOrigem)
{
    int linhas = grade.Length;
    int colunas = grade[0].Length;
    var distancia = new int[linhas, colunas];

    for (int i = 0; i < linhas; i++)
    {
        for (int j = 0; j < colunas; j++)
        {
            distancia[i, j] = -1;
        }
    }

    var fila = new Queue<(int Linha, int Coluna)>();
    distancia[linhaOrigem, colunaOrigem] = 0;
    fila.Enqueue((linhaOrigem, colunaOrigem));

    while (fila.Count > 0)
    {
        var atual = fila.Dequeue();

        for (int d = 0; d < 4; d++)
        {
            int nl = atual.Linha + dl[d];
            int nc = atual.Coluna + dc[d];

            if (nl < 0 || nl >= linhas || nc < 0 || nc >= colunas) continue;
            if (grade[nl][nc] == '#') continue;
            if (distancia[nl, nc] != -1) continue;

            distancia[nl, nc] = distancia[atual.Linha, atual.Coluna] + 1;
            fila.Enqueue((nl, nc));
        }
    }

    return distancia;
}`,
        caption: 'A ordem dos três `continue` importa: testar os limites antes de indexar a grade evita estourar o array.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O teste de limites precisa vir **antes** do teste de parede. Invertendo a ordem, `grade[nl][nc]` é avaliado com índice inválido e o programa morre com `IndexOutOfRangeException`.',
      },
      {
        kind: 'text',
        body: 'Sobre uma grade pequena, o resultado mostra a onda se espalhando a partir do canto:',
      },
      {
        kind: 'code',
        code: `string[] mapa =
{
    "S..#....",
    ".#.#.##.",
    ".#...#..",
    ".####.#.",
    "......#D",
};

int[,] d = DistanciasNaGrade(mapa, 0, 0);
Console.WriteLine($"passos ate o destino: {d[4, 7]}");`,
      },
      {
        kind: 'output',
        code: `  0  1  2  .  8  9 10 11
  1  .  3  .  7  .  . 12
  2  .  4  5  6  . 14 13
  3  .  .  .  . 10  . 14
  4  5  6  7  8  9  . 15`,
        caption:
          'Cada célula guarda a distância até a origem; o ponto marca parede ou célula inalcançável. O destino está a 15 passos.',
      },
      {
        kind: 'text',
        body:
          'O array de distâncias guarda mais do que o número de passos: ele permite **reconstruir o caminho** sem armazenar nada a mais. Partindo do destino, o passo anterior é qualquer vizinho cuja distância seja exatamente uma unidade menor.',
      },
      {
        kind: 'code',
        code: `static List<string> Caminho(int[,] distancia, int linhaDestino, int colunaDestino)
{
    var passos = new List<string>();

    if (distancia[linhaDestino, colunaDestino] == -1)
    {
        return passos;
    }

    int l = linhaDestino;
    int c = colunaDestino;

    while (distancia[l, c] > 0)
    {
        passos.Add($"({l},{c})");

        for (int d = 0; d < 4; d++)
        {
            int nl = l + dl[d];
            int nc = c + dc[d];

            if (nl < 0 || nl >= distancia.GetLength(0)) continue;
            if (nc < 0 || nc >= distancia.GetLength(1)) continue;

            if (distancia[nl, nc] == distancia[l, c] - 1)
            {
                l = nl;
                c = nc;
                break;
            }
        }
    }

    passos.Add($"({l},{c})");
    passos.Reverse();
    return passos;
}`,
        caption: 'Caminhar para trás sempre chega à origem, porque toda distância k > 0 tem um vizinho com distância k-1.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Pode haver vários caminhos mínimos; este devolve um deles, determinado pela ordem em que as direções são testadas. Quando o enunciado exige um caminho específico, fixe essa ordem — é ela que define a resposta.',
      },
      {
        kind: 'text',
        body:
          'O custo é **O(linhas × colunas)**: cada célula entra na fila no máximo uma vez. Uma grade de 1000×1000 são um milhão de células, o que roda numa fração de segundo.',
      },
    ],
    quiz: [
      {
        id: 's07c07l04q1',
        type: 'single',
        prompt: 'Por que o teste de limites da grade tem que vir antes do teste de parede?',
        options: [
          { id: 'a', text: 'Porque `grade[nl][nc]` com índice fora do intervalo lança exceção', correct: true },
          { id: 'b', text: 'Porque paredes fora da grade contam como células livres' },
          { id: 'c', text: 'Por desempenho: o teste de limites é mais barato' },
          { id: 'd', text: 'Não importa: `&&` avalia tudo de qualquer forma' },
        ],
        explanation:
          'É uma questão de correção, não de estilo. Ler a grade numa posição inválida derruba o programa com `IndexOutOfRangeException` antes que qualquer outra verificação aconteça.',
      },
      {
        id: 's07c07l04q2',
        type: 'single',
        prompt: 'Como a reconstrução do caminho sabe qual vizinho foi o passo anterior?',
        options: [
          { id: 'a', text: 'É o vizinho cuja distância é exatamente uma unidade menor que a atual', correct: true },
          { id: 'b', text: 'É o vizinho que aparece primeiro na grade' },
          { id: 'c', text: 'É preciso guardar um array de predecessores durante o BFS' },
          { id: 'd', text: 'É o vizinho mais próximo do destino em linha reta' },
        ],
        explanation:
          'O array de distâncias já contém a informação. Um array de predecessores também funciona e é obrigatório quando as arestas têm pesos diferentes — mas em grade uniforme a distância basta.',
      },
      {
        id: 's07c07l04q3',
        type: 'single',
        prompt: 'Uma grade 1000×1000 tem 400.000 células livres. Qual o custo do BFS?',
        options: [
          { id: 'a', text: 'O(linhas × colunas): cada célula entra na fila no máximo uma vez', correct: true },
          { id: 'b', text: 'O((linhas × colunas)²), porque cada célula olha todas as outras' },
          { id: 'c', text: 'O(4^(linhas × colunas)), como um backtracking' },
          { id: 'd', text: 'Depende do número de paredes: quanto mais paredes, mais caro' },
        ],
        explanation:
          'A marcação em `distancia` impede revisitas, então o trabalho total é uma passada pela grade com quatro testes por célula. Mais paredes deixam o BFS mais **rápido**, não mais lento.',
      },
    ],
    challenge: {
      brief:
        'Um robô de armazém precisa ir da posição inicial até a doca. Calcule o número mínimo de passos, reconstrua o trajeto e conte quantas células ele consegue alcançar. Trate corretamente o caso sem rota.',
      requirements: [
        'Movimento em quatro direções, na ordem cima, baixo, esquerda, direita — a ordem define o caminho devolvido.',
        '`#` é parede; qualquer outro caractere é livre.',
        'Células inalcançáveis ficam com `-1`; sem rota, `Caminho` devolve lista vazia e o programa imprime `sem rota`.',
        'O caminho é impresso da origem para o destino, no formato `(linha,coluna)` separado por espaços.',
        'Um teste roda numa grade 1001×1001: a solução deve ser O(linhas × colunas).',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static readonly int[] dl = { -1, 1, 0, 0 };
    static readonly int[] dc = { 0, 0, -1, 1 };

    static int[,] DistanciasNaGrade(string[] grade, int linhaOrigem, int colunaOrigem)
    {
        // TODO: BFS na grade, -1 para inalcancavel
        return new int[grade.Length, grade[0].Length];
    }

    static List<string> Caminho(int[,] distancia, int linhaDestino, int colunaDestino)
    {
        // TODO: ande para tras seguindo distancias decrescentes
        return new List<string>();
    }

    static int Alcancaveis(int[,] distancia)
    {
        // TODO: quantas celulas tem distancia diferente de -1
        return 0;
    }

    static void Main()
    {
        string[] mapa =
        {
            "S..#....",
            ".#.#.##.",
            ".#...#..",
            ".####.#.",
            "......#D",
        };

        int[,] d = DistanciasNaGrade(mapa, 0, 0);
        Console.WriteLine($"passos: {d[4, 7]}");
        Console.WriteLine($"alcancaveis: {Alcancaveis(d)}");
        Console.WriteLine($"caminho: {string.Join(" ", Caminho(d, 4, 7))}");

        string[] bloqueado = { "S.#.", "..#.", "..#D" };
        int[,] db = DistanciasNaGrade(bloqueado, 0, 0);
        Console.WriteLine($"bloqueado: {db[2, 3]}");
        Console.WriteLine($"bloqueado caminho: {(Caminho(db, 2, 3).Count == 0 ? "sem rota" : "ok")}");
        Console.WriteLine($"bloqueado alcancaveis: {Alcancaveis(db)}");

        int n = 1001;
        var grande = new string[n];

        for (int i = 0; i < n; i++)
        {
            var buffer = new char[n];

            for (int j = 0; j < n; j++)
            {
                buffer[j] = (i % 2 == 1 && j % 7 != 3) ? '#' : '.';
            }

            grande[i] = new string(buffer);
        }

        int[,] dg = DistanciasNaGrade(grande, 0, 0);
        Console.WriteLine($"grande canto: {dg[n - 1, n - 1]}");
        Console.WriteLine($"grande alcancaveis: {Alcancaveis(dg)}");
        Console.WriteLine($"grande passos do caminho: {Caminho(dg, n - 1, n - 1).Count}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static readonly int[] dl = { -1, 1, 0, 0 };
    static readonly int[] dc = { 0, 0, -1, 1 };

    static int[,] DistanciasNaGrade(string[] grade, int linhaOrigem, int colunaOrigem)
    {
        int linhas = grade.Length;
        int colunas = grade[0].Length;
        var distancia = new int[linhas, colunas];

        for (int i = 0; i < linhas; i++)
        {
            for (int j = 0; j < colunas; j++)
            {
                distancia[i, j] = -1;
            }
        }

        var fila = new Queue<(int Linha, int Coluna)>();
        distancia[linhaOrigem, colunaOrigem] = 0;
        fila.Enqueue((linhaOrigem, colunaOrigem));

        while (fila.Count > 0)
        {
            var atual = fila.Dequeue();

            for (int d = 0; d < 4; d++)
            {
                int nl = atual.Linha + dl[d];
                int nc = atual.Coluna + dc[d];

                if (nl < 0 || nl >= linhas || nc < 0 || nc >= colunas)
                {
                    continue;
                }

                if (grade[nl][nc] == '#')
                {
                    continue;
                }

                if (distancia[nl, nc] != -1)
                {
                    continue;
                }

                distancia[nl, nc] = distancia[atual.Linha, atual.Coluna] + 1;
                fila.Enqueue((nl, nc));
            }
        }

        return distancia;
    }

    static List<string> Caminho(int[,] distancia, int linhaDestino, int colunaDestino)
    {
        var passos = new List<string>();

        if (distancia[linhaDestino, colunaDestino] == -1)
        {
            return passos;
        }

        int l = linhaDestino;
        int c = colunaDestino;

        while (distancia[l, c] > 0)
        {
            passos.Add($"({l},{c})");

            for (int d = 0; d < 4; d++)
            {
                int nl = l + dl[d];
                int nc = c + dc[d];

                if (nl < 0 || nl >= distancia.GetLength(0))
                {
                    continue;
                }

                if (nc < 0 || nc >= distancia.GetLength(1))
                {
                    continue;
                }

                if (distancia[nl, nc] == distancia[l, c] - 1)
                {
                    l = nl;
                    c = nc;
                    break;
                }
            }
        }

        passos.Add($"({l},{c})");
        passos.Reverse();
        return passos;
    }

    static int Alcancaveis(int[,] distancia)
    {
        int total = 0;

        for (int i = 0; i < distancia.GetLength(0); i++)
        {
            for (int j = 0; j < distancia.GetLength(1); j++)
            {
                if (distancia[i, j] != -1)
                {
                    total++;
                }
            }
        }

        return total;
    }

    static void Main()
    {
        string[] mapa =
        {
            "S..#....",
            ".#.#.##.",
            ".#...#..",
            ".####.#.",
            "......#D",
        };

        int[,] d = DistanciasNaGrade(mapa, 0, 0);
        Console.WriteLine($"passos: {d[4, 7]}");
        Console.WriteLine($"alcancaveis: {Alcancaveis(d)}");
        Console.WriteLine($"caminho: {string.Join(" ", Caminho(d, 4, 7))}");

        string[] bloqueado = { "S.#.", "..#.", "..#D" };
        int[,] db = DistanciasNaGrade(bloqueado, 0, 0);
        Console.WriteLine($"bloqueado: {db[2, 3]}");
        Console.WriteLine($"bloqueado caminho: {(Caminho(db, 2, 3).Count == 0 ? "sem rota" : "ok")}");
        Console.WriteLine($"bloqueado alcancaveis: {Alcancaveis(db)}");

        int n = 1001;
        var grande = new string[n];

        for (int i = 0; i < n; i++)
        {
            var buffer = new char[n];

            for (int j = 0; j < n; j++)
            {
                buffer[j] = (i % 2 == 1 && j % 7 != 3) ? '#' : '.';
            }

            grande[i] = new string(buffer);
        }

        int[,] dg = DistanciasNaGrade(grande, 0, 0);
        Console.WriteLine($"grande canto: {dg[n - 1, n - 1]}");
        Console.WriteLine($"grande alcancaveis: {Alcancaveis(dg)}");
        Console.WriteLine($"grande passos do caminho: {Caminho(dg, n - 1, n - 1).Count}");
    }
}`,
      hints: [
        'Uma tupla `(int Linha, int Coluna)` na fila evita ter que codificar a posição num único inteiro.',
        'Os três `continue` — fora da grade, parede, já visitado — precisam estar nessa ordem.',
        'O caminho é construído do destino para a origem, então termine com `passos.Reverse()`.',
      ],
      tests: [
        {
          name: 'Rota no armazém',
          expectedStdout:
            'passos: 15\nalcancaveis: 27\n' +
            'caminho: (0,0) (0,1) (0,2) (1,2) (2,2) (2,3) (2,4) (1,4) (0,4) (0,5) (0,6) (0,7) (1,7) (2,7) (3,7) (4,7)\n' +
            'bloqueado: -1\nbloqueado caminho: sem rota\nbloqueado alcancaveis: 6\n' +
            'grande canto: 2000\ngrande alcancaveis: 573001\ngrande passos do caminho: 2001',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's07c07l05',
    title: 'Componentes conexos',
    objective: 'Separar um grafo em grupos isolados e medir cada um deles.',
    concept: [
      {
        kind: 'text',
        body:
          'Nem todo grafo é uma peça só. Um **componente conexo** é um grupo de vértices em que todos se alcançam entre si, e que não alcança ninguém de fora. Um grafo com quatro ilhas tem quatro componentes.',
      },
      {
        kind: 'text',
        body:
          'O algoritmo é uma casca em volta do BFS: percorra os vértices em ordem; ao encontrar um que ainda não foi rotulado, dispare uma busca a partir dele e marque tudo que ela alcança com o mesmo rótulo. Depois incremente o rótulo e siga.',
      },
      {
        kind: 'code',
        code: `static int[] RotularComponentes(List<int>[] grafo)
{
    var rotulo = new int[grafo.Length];

    for (int i = 0; i < rotulo.Length; i++)
    {
        rotulo[i] = -1;
    }

    int atual = 0;

    for (int inicio = 0; inicio < grafo.Length; inicio++)
    {
        if (rotulo[inicio] != -1)
        {
            continue;
        }

        var fila = new Queue<int>();
        rotulo[inicio] = atual;
        fila.Enqueue(inicio);

        while (fila.Count > 0)
        {
            int v = fila.Dequeue();

            foreach (int vizinho in grafo[v])
            {
                if (rotulo[vizinho] == -1)
                {
                    rotulo[vizinho] = atual;
                    fila.Enqueue(vizinho);
                }
            }
        }

        atual++;
    }

    return rotulo;
}`,
        caption: 'O laço externo garante que nenhum vértice fique de fora, inclusive os isolados.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Parece um laço dentro de outro, mas **não é O(V²)**. O `continue` faz o laço externo pular tudo que já foi rotulado, então cada vértice é processado uma única vez no total. O custo é O(V + A).',
      },
      {
        kind: 'code',
        code: `var g = CriarGrafo(9);
Conectar(g, 0, 1);
Conectar(g, 1, 2);
Conectar(g, 3, 4);
Conectar(g, 5, 6);
Conectar(g, 6, 7);
Conectar(g, 7, 5);

Console.WriteLine(string.Join(",", RotularComponentes(g)));`,
      },
      {
        kind: 'output',
        code: `0,0,0,1,1,2,2,2,3`,
        caption:
          'Quatro componentes: {0,1,2}, {3,4}, {5,6,7} e o vértice isolado 8, que forma um componente sozinho.',
      },
      {
        kind: 'text',
        body:
          'Com os rótulos em mãos, medir os componentes é uma passada simples. O número de componentes é o maior rótulo mais um, e os tamanhos saem de uma contagem por rótulo.',
      },
      {
        kind: 'code',
        code: `static int[] TamanhosDosComponentes(int[] rotulo, int quantidade)
{
    var tamanho = new int[quantidade];

    foreach (int r in rotulo)
    {
        tamanho[r]++;
    }

    return tamanho;
}`,
      },
      {
        kind: 'table',
        headers: ['Pergunta', 'Resposta a partir dos rótulos'],
        rows: [
          ['O grafo é conexo?', 'a quantidade de componentes é 1'],
          ['`a` e `b` estão conectados?', '`rotulo[a] == rotulo[b]`, em O(1)'],
          ['Qual o maior grupo?', 'o índice de maior valor em `tamanho`'],
          ['Quantos vértices isolados?', 'quantos componentes têm tamanho 1'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Depois de rotular uma vez, responder "estes dois estão conectados?" custa O(1) para qualquer par. Sem os rótulos, cada pergunta exigiria um BFS novo — a diferença entre um pré-processamento e milhões de buscas.',
      },
      {
        kind: 'text',
        body:
          'O BFS pode ser trocado por DFS sem qualquer mudança no resultado: os rótulos são os mesmos, só a ordem interna de visita muda. Para componentes, use o que for mais conveniente — só evite o DFS recursivo em grafos profundos.',
      },
      {
        kind: 'compare',
        good: `int[] rotulo = RotularComponentes(grafo);
// uma passada, O(V + A)

for (int i = 0; i < consultas.Length; i++)
{
    bool juntos = rotulo[a[i]] == rotulo[b[i]];
}`,
        bad: `for (int i = 0; i < consultas.Length; i++)
{
    // um BFS completo por consulta
    int[] d = DistanciasPorLargura(grafo, a[i]);
    bool juntos = d[b[i]] != -1;
}`,
        goodLabel: 'Rotular uma vez, consultar em O(1)',
        badLabel: 'Um BFS por consulta',
      },
    ],
    quiz: [
      {
        id: 's07c07l05q1',
        type: 'single',
        prompt: 'Um grafo com 6 vértices e nenhuma aresta tem quantos componentes conexos?',
        options: [
          { id: 'a', text: '6: cada vértice isolado é um componente', correct: true },
          { id: 'b', text: '0: sem arestas não há componentes' },
          { id: 'c', text: '1: todos formam um grupo vazio' },
          { id: 'd', text: 'Indefinido' },
        ],
        explanation:
          'Um componente é um grupo maximal de vértices que se alcançam. Sem arestas, cada vértice só alcança a si mesmo, e o laço externo dispara uma busca para cada um.',
      },
      {
        id: 's07c07l05q2',
        type: 'single',
        prompt: 'Por que `RotularComponentes` é O(V + A) apesar do laço dentro de laço?',
        options: [
          {
            id: 'a',
            text: 'O `continue` pula vértices já rotulados, então cada um é processado uma vez só no total',
            correct: true,
          },
          { id: 'b', text: 'Porque a fila do BFS é sempre pequena' },
          { id: 'c', text: 'Não é: na verdade é O(V²)' },
          { id: 'd', text: 'Porque o laço externo para no primeiro componente encontrado' },
        ],
        explanation:
          'Somando todos os BFS, cada vértice entra numa fila exatamente uma vez e cada lista de vizinhos é lida uma vez. O laço externo só percorre V posições verificando o rótulo.',
      },
      {
        id: 's07c07l05q3',
        type: 'single',
        prompt: 'Você precisa responder 1 milhão de perguntas "a e b estão conectados?" no mesmo grafo. Qual abordagem?',
        options: [
          { id: 'a', text: 'Rotular uma vez em O(V + A) e comparar rótulos em O(1) por pergunta', correct: true },
          { id: 'b', text: 'Um BFS a partir de `a` para cada pergunta' },
          { id: 'c', text: 'Uma matriz de adjacência, que responde em O(1)' },
          { id: 'd', text: 'Ordenar os vértices e usar busca binária' },
        ],
        explanation:
          'A matriz responde "existe aresta direta?", que é outra pergunta — conexão pode passar por vários vértices. Um BFS por consulta seria 10⁶ travessias do grafo inteiro.',
      },
    ],
    challenge: {
      brief:
        'Uma rede de servidores ficou fragmentada. Rotule os componentes, informe quantos são, o tamanho de cada um, qual o maior e responda se dois servidores conseguem se comunicar.',
      requirements: [
        '`RotularComponentes` roda em O(V + A) e devolve o rótulo de cada vértice, começando em 0.',
        'Os rótulos são atribuídos na ordem em que os componentes são descobertos, varrendo os vértices de 0 para cima.',
        '`MaiorComponente` devolve o rótulo do maior grupo; empate resolve pelo menor rótulo.',
        '`Conectados` responde em O(1), usando os rótulos já calculados.',
        'Um teste roda sobre 300.000 vértices formando 60.000 componentes.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static List<int>[] CriarGrafo(int n)
    {
        var g = new List<int>[n];

        for (int i = 0; i < n; i++)
        {
            g[i] = new List<int>();
        }

        return g;
    }

    static void Conectar(List<int>[] g, int a, int b)
    {
        g[a].Add(b);
        g[b].Add(a);
    }

    static int[] RotularComponentes(List<int>[] grafo)
    {
        // TODO: laco externo + BFS interno
        return new int[grafo.Length];
    }

    static int QuantosComponentes(int[] rotulo)
    {
        // TODO: maior rotulo + 1
        return 0;
    }

    static int[] TamanhosDosComponentes(int[] rotulo, int quantidade)
    {
        // TODO
        return new int[quantidade];
    }

    static int MaiorComponente(int[] tamanho)
    {
        // TODO
        return 0;
    }

    static bool Conectados(int[] rotulo, int a, int b)
    {
        // TODO: O(1)
        return false;
    }

    static void Main()
    {
        var g = CriarGrafo(9);
        Conectar(g, 0, 1);
        Conectar(g, 1, 2);
        Conectar(g, 3, 4);
        Conectar(g, 5, 6);
        Conectar(g, 6, 7);
        Conectar(g, 7, 5);

        int[] rotulo = RotularComponentes(g);
        int quantidade = QuantosComponentes(rotulo);
        int[] tamanhos = TamanhosDosComponentes(rotulo, quantidade);
        int maior = MaiorComponente(tamanhos);

        Console.WriteLine($"rotulos: {string.Join(",", rotulo)}");
        Console.WriteLine($"componentes: {quantidade}");
        Console.WriteLine($"tamanhos: {string.Join(",", tamanhos)}");
        Console.WriteLine($"maior: {maior} com {tamanhos[maior]}");
        Console.WriteLine($"0 e 2 conectados: {Conectados(rotulo, 0, 2)}");
        Console.WriteLine($"0 e 5 conectados: {Conectados(rotulo, 0, 5)}");
        Console.WriteLine($"8 e 8 conectados: {Conectados(rotulo, 8, 8)}");

        var arvore = CriarGrafo(5);
        Conectar(arvore, 0, 1);
        Conectar(arvore, 0, 2);
        Conectar(arvore, 1, 3);
        Conectar(arvore, 1, 4);
        Console.WriteLine($"arvore componentes: {QuantosComponentes(RotularComponentes(arvore))}");

        int n = 300000;
        var grande = CriarGrafo(n);

        for (int i = 0; i < n; i++)
        {
            if (i % 5 != 4 && i + 1 < n)
            {
                Conectar(grande, i, i + 1);
            }
        }

        int[] rg = RotularComponentes(grande);
        int qg = QuantosComponentes(rg);
        int[] tg = TamanhosDosComponentes(rg, qg);

        Console.WriteLine($"grande componentes: {qg}");
        Console.WriteLine($"grande maior tamanho: {tg[MaiorComponente(tg)]}");
        Console.WriteLine($"grande 0 e 4 conectados: {Conectados(rg, 0, 4)}");
        Console.WriteLine($"grande 4 e 5 conectados: {Conectados(rg, 4, 5)}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static List<int>[] CriarGrafo(int n)
    {
        var g = new List<int>[n];

        for (int i = 0; i < n; i++)
        {
            g[i] = new List<int>();
        }

        return g;
    }

    static void Conectar(List<int>[] g, int a, int b)
    {
        g[a].Add(b);
        g[b].Add(a);
    }

    static int[] RotularComponentes(List<int>[] grafo)
    {
        var rotulo = new int[grafo.Length];

        for (int i = 0; i < rotulo.Length; i++)
        {
            rotulo[i] = -1;
        }

        int atual = 0;

        for (int inicio = 0; inicio < grafo.Length; inicio++)
        {
            if (rotulo[inicio] != -1)
            {
                continue;
            }

            var fila = new Queue<int>();
            rotulo[inicio] = atual;
            fila.Enqueue(inicio);

            while (fila.Count > 0)
            {
                int v = fila.Dequeue();

                foreach (int vizinho in grafo[v])
                {
                    if (rotulo[vizinho] == -1)
                    {
                        rotulo[vizinho] = atual;
                        fila.Enqueue(vizinho);
                    }
                }
            }

            atual++;
        }

        return rotulo;
    }

    static int QuantosComponentes(int[] rotulo)
    {
        int maior = 0;

        foreach (int r in rotulo)
        {
            if (r + 1 > maior)
            {
                maior = r + 1;
            }
        }

        return maior;
    }

    static int[] TamanhosDosComponentes(int[] rotulo, int quantidade)
    {
        var tamanho = new int[quantidade];

        foreach (int r in rotulo)
        {
            tamanho[r]++;
        }

        return tamanho;
    }

    static int MaiorComponente(int[] tamanho)
    {
        int melhor = 0;

        for (int i = 1; i < tamanho.Length; i++)
        {
            if (tamanho[i] > tamanho[melhor])
            {
                melhor = i;
            }
        }

        return melhor;
    }

    static bool Conectados(int[] rotulo, int a, int b)
    {
        return rotulo[a] == rotulo[b];
    }

    static void Main()
    {
        var g = CriarGrafo(9);
        Conectar(g, 0, 1);
        Conectar(g, 1, 2);
        Conectar(g, 3, 4);
        Conectar(g, 5, 6);
        Conectar(g, 6, 7);
        Conectar(g, 7, 5);

        int[] rotulo = RotularComponentes(g);
        int quantidade = QuantosComponentes(rotulo);
        int[] tamanhos = TamanhosDosComponentes(rotulo, quantidade);
        int maior = MaiorComponente(tamanhos);

        Console.WriteLine($"rotulos: {string.Join(",", rotulo)}");
        Console.WriteLine($"componentes: {quantidade}");
        Console.WriteLine($"tamanhos: {string.Join(",", tamanhos)}");
        Console.WriteLine($"maior: {maior} com {tamanhos[maior]}");
        Console.WriteLine($"0 e 2 conectados: {Conectados(rotulo, 0, 2)}");
        Console.WriteLine($"0 e 5 conectados: {Conectados(rotulo, 0, 5)}");
        Console.WriteLine($"8 e 8 conectados: {Conectados(rotulo, 8, 8)}");

        var arvore = CriarGrafo(5);
        Conectar(arvore, 0, 1);
        Conectar(arvore, 0, 2);
        Conectar(arvore, 1, 3);
        Conectar(arvore, 1, 4);
        Console.WriteLine($"arvore componentes: {QuantosComponentes(RotularComponentes(arvore))}");

        int n = 300000;
        var grande = CriarGrafo(n);

        for (int i = 0; i < n; i++)
        {
            if (i % 5 != 4 && i + 1 < n)
            {
                Conectar(grande, i, i + 1);
            }
        }

        int[] rg = RotularComponentes(grande);
        int qg = QuantosComponentes(rg);
        int[] tg = TamanhosDosComponentes(rg, qg);

        Console.WriteLine($"grande componentes: {qg}");
        Console.WriteLine($"grande maior tamanho: {tg[MaiorComponente(tg)]}");
        Console.WriteLine($"grande 0 e 4 conectados: {Conectados(rg, 0, 4)}");
        Console.WriteLine($"grande 4 e 5 conectados: {Conectados(rg, 4, 5)}");
    }
}`,
      hints: [
        'O array de rótulos começa todo em `-1` e faz o papel de "visitado": se `rotulo[v] != -1`, o vértice já pertence a algum componente.',
        'Só incremente o contador de rótulo **depois** que o BFS terminar — todos os vértices daquela busca compartilham o mesmo número.',
        '`Conectados` não precisa percorrer nada: os rótulos já contêm a resposta.',
      ],
      tests: [
        {
          name: 'Rede fragmentada',
          expectedStdout:
            'rotulos: 0,0,0,1,1,2,2,2,3\ncomponentes: 4\ntamanhos: 3,2,3,1\nmaior: 0 com 3\n' +
            '0 e 2 conectados: True\n0 e 5 conectados: False\n8 e 8 conectados: True\n' +
            'arvore componentes: 1\n' +
            'grande componentes: 60000\ngrande maior tamanho: 5\n' +
            'grande 0 e 4 conectados: True\ngrande 4 e 5 conectados: False',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's07c07l06',
    title: 'Detectando ciclos',
    objective: 'Descobrir se um grafo tem ciclo, com técnicas distintas para o caso não dirigido e o dirigido.',
    concept: [
      {
        kind: 'text',
        body:
          'Um **ciclo** é um caminho que sai de um vértice e volta a ele sem repetir arestas. Detectar ciclos responde perguntas práticas: "essa lista de dependências é resolvível?", "esse grafo é uma árvore?", "há referência circular nessa configuração?".',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Grafo dirigido e não dirigido pedem algoritmos **diferentes**. Aplicar a receita do não dirigido num grafo dirigido dá resultado errado, e é um dos erros mais comuns em problemas de grafos.',
      },
      {
        kind: 'text',
        body:
          'No caso **não dirigido**, a intuição é: durante uma travessia, se você encontra um vizinho já visitado que não é de onde você veio, existe uma segunda rota até ele — ou seja, um ciclo.',
      },
      {
        kind: 'code',
        code: `static bool TemCicloNaoDirigido(List<int>[] grafo)
{
    var pai = new int[grafo.Length];
    var visitado = new bool[grafo.Length];

    for (int inicio = 0; inicio < grafo.Length; inicio++)
    {
        if (visitado[inicio])
        {
            continue;
        }

        var fila = new Queue<int>();
        visitado[inicio] = true;
        pai[inicio] = -1;
        fila.Enqueue(inicio);

        while (fila.Count > 0)
        {
            int atual = fila.Dequeue();

            foreach (int vizinho in grafo[atual])
            {
                if (!visitado[vizinho])
                {
                    visitado[vizinho] = true;
                    pai[vizinho] = atual;
                    fila.Enqueue(vizinho);
                }
                else if (vizinho != pai[atual])
                {
                    return true;
                }
            }
        }
    }

    return false;
}`,
        caption: 'O laço externo cobre grafos desconexos: o ciclo pode estar em qualquer componente.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O `pai` existe por um motivo específico: numa lista de adjacência a aresta `a-b` aparece dos dois lados, então ao processar `b` você **sempre** reencontra `a` como visitado. Sem excluir o pai, todo grafo com uma aresta pareceria ter ciclo.',
      },
      {
        kind: 'text',
        body:
          'No caso **dirigido**, a regra do pai não funciona: `a → b` não implica `b → a`, e reencontrar um vértice visitado é perfeitamente normal. O que caracteriza ciclo aqui é reencontrar um vértice **que ainda está aberto na travessia atual**.',
      },
      {
        kind: 'text',
        body: 'Isso pede três estados por vértice, não dois — a técnica clássica das três cores:',
      },
      {
        kind: 'table',
        headers: ['Cor', 'Significado', 'O que fazer ao encontrar'],
        rows: [
          ['branco', 'ainda não visitado', 'descer nele'],
          ['cinza', 'aberto: está no caminho atual', '**ciclo encontrado**'],
          ['preto', 'fechado: já explorado por completo', 'ignorar'],
        ],
      },
      {
        kind: 'code',
        code: `const int Branco = 0, Cinza = 1, Preto = 2;

static bool TemCicloDirigido(List<int>[] grafo, int atual, int[] cor)
{
    cor[atual] = Cinza;

    foreach (int vizinho in grafo[atual])
    {
        if (cor[vizinho] == Cinza)
        {
            return true;
        }

        if (cor[vizinho] == Branco && TemCicloDirigido(grafo, vizinho, cor))
        {
            return true;
        }
    }

    cor[atual] = Preto;
    return false;
}`,
        caption: 'O vértice vira preto só na saída da recursão, quando todos os seus descendentes já foram fechados.',
      },
      {
        kind: 'compare',
        good: `// dirigido: cinza significa
// "esta no caminho atual"
if (cor[vizinho] == Cinza)
{
    return true;
}`,
        bad: `// dirigido com a regra do nao dirigido:
// acusa ciclo em 0->1, 0->2, 1->2
if (visitado[vizinho] && vizinho != pai[atual])
{
    return true;
}`,
        goodLabel: 'Três cores',
        badLabel: 'Regra do pai num grafo dirigido',
      },
      {
        kind: 'text',
        body:
          'O grafo `0→1, 0→2, 1→2` mostra a diferença. Ele não tem ciclo nenhum — é um losango. A regra do pai acusaria ciclo ao reencontrar o 2; a regra das cores vê que o 2 já está **preto** e segue em frente.',
      },
      {
        kind: 'text',
        body:
          'Um resultado útil aparece de graça: num grafo não dirigido **conexo**, ausência de ciclo significa que ele é uma **árvore** — e uma árvore com V vértices tem exatamente V-1 arestas. Contar arestas é um teste barato antes de rodar qualquer travessia.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A versão dirigida aqui é recursiva, e por isso vale só para grafos de profundidade moderada. Em grafos grandes, prefira detectar o ciclo pela ordenação topológica — a próxima lição mostra como, sem recursão nenhuma.',
      },
    ],
    quiz: [
      {
        id: 's07c07l06q1',
        type: 'single',
        prompt: 'Por que a detecção em grafo não dirigido precisa ignorar o vértice pai?',
        options: [
          {
            id: 'a',
            text: 'A aresta aparece nas duas listas de adjacência, então o pai é sempre reencontrado como visitado',
            correct: true,
          },
          { id: 'b', text: 'Para não visitar o mesmo vértice duas vezes' },
          { id: 'c', text: 'Por desempenho: evita uma comparação' },
          { id: 'd', text: 'Não precisa; o `pai` é opcional' },
        ],
        explanation:
          'Sem essa exclusão, até um grafo com uma única aresta `0-1` reportaria ciclo: ao processar 1, o vizinho 0 já está marcado.',
      },
      {
        id: 's07c07l06q2',
        type: 'single',
        prompt: 'No algoritmo das três cores, encontrar um vizinho **preto** significa o quê?',
        options: [
          { id: 'a', text: 'Ele já foi totalmente explorado; não há ciclo por ali', correct: true },
          { id: 'b', text: 'Há um ciclo' },
          { id: 'c', text: 'Ele ainda não foi visitado' },
          { id: 'd', text: 'O grafo é desconexo' },
        ],
        explanation:
          'Preto quer dizer que a recursão daquele vértice já retornou. Se houvesse ciclo passando por ele, teria sido detectado enquanto ele estava cinza.',
      },
      {
        id: 's07c07l06q3',
        type: 'single',
        prompt: 'Este grafo dirigido tem ciclo?',
        code: `Apontar(g, 0, 1);
Apontar(g, 1, 2);
Apontar(g, 0, 2);`,
        options: [
          { id: 'a', text: 'Não: nenhum caminho volta a um vértice já aberto', correct: true },
          { id: 'b', text: 'Sim: o vértice 2 é alcançado por dois caminhos' },
          { id: 'c', text: 'Sim: 0 → 1 → 2 → 0' },
          { id: 'd', text: 'Depende da ordem de inserção das arestas' },
        ],
        explanation:
          'Dois caminhos até o mesmo destino não formam ciclo num grafo dirigido — nada retorna a 0. É exatamente o caso em que a regra do pai daria falso positivo.',
      },
    ],
    challenge: {
      brief:
        'Implemente as duas detecções de ciclo — a do grafo não dirigido, com a regra do pai, e a do dirigido, com as três cores — e aplique-as a grafos que mostram a diferença entre elas.',
      requirements: [
        '`TemCicloNaoDirigido` usa BFS com array de pais e cobre grafos desconexos.',
        '`TemCicloDirigido` usa as três cores e também parte de todo vértice ainda branco.',
        '`EhArvore` responde se o grafo não dirigido é conexo e sem ciclo.',
        'As duas funções rodam em O(V + A).',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    const int Branco = 0;
    const int Cinza = 1;
    const int Preto = 2;

    static List<int>[] CriarGrafo(int n)
    {
        var g = new List<int>[n];

        for (int i = 0; i < n; i++)
        {
            g[i] = new List<int>();
        }

        return g;
    }

    static void Conectar(List<int>[] g, int a, int b)
    {
        g[a].Add(b);
        g[b].Add(a);
    }

    static void Apontar(List<int>[] g, int de, int para)
    {
        g[de].Add(para);
    }

    static bool TemCicloNaoDirigido(List<int>[] grafo)
    {
        // TODO: BFS com array de pais
        return false;
    }

    static bool TemCicloDirigido(List<int>[] grafo, int atual, int[] cor)
    {
        // TODO: tres cores
        return false;
    }

    static bool TemCicloDirigido(List<int>[] grafo)
    {
        // TODO: dispare a partir de todo vertice branco
        return false;
    }

    static bool EhArvore(List<int>[] grafo)
    {
        // TODO: conexo e sem ciclo
        return false;
    }

    static void Main()
    {
        var g = CriarGrafo(9);
        Conectar(g, 0, 1);
        Conectar(g, 1, 2);
        Conectar(g, 3, 4);
        Conectar(g, 5, 6);
        Conectar(g, 6, 7);
        Conectar(g, 7, 5);
        Console.WriteLine($"desconexo com ciclo: {TemCicloNaoDirigido(g)}");
        Console.WriteLine($"desconexo eh arvore: {EhArvore(g)}");

        var arvore = CriarGrafo(5);
        Conectar(arvore, 0, 1);
        Conectar(arvore, 0, 2);
        Conectar(arvore, 1, 3);
        Conectar(arvore, 1, 4);
        Console.WriteLine($"arvore com ciclo: {TemCicloNaoDirigido(arvore)}");
        Console.WriteLine($"arvore eh arvore: {EhArvore(arvore)}");

        var quadrado = CriarGrafo(4);
        Conectar(quadrado, 0, 1);
        Conectar(quadrado, 1, 2);
        Conectar(quadrado, 2, 3);
        Conectar(quadrado, 3, 0);
        Console.WriteLine($"quadrado com ciclo: {TemCicloNaoDirigido(quadrado)}");

        var losango = CriarGrafo(6);
        Apontar(losango, 0, 1);
        Apontar(losango, 1, 2);
        Apontar(losango, 0, 2);
        Apontar(losango, 3, 4);
        Apontar(losango, 4, 5);
        Console.WriteLine($"losango dirigido com ciclo: {TemCicloDirigido(losango)}");

        var circular = CriarGrafo(4);
        Apontar(circular, 0, 1);
        Apontar(circular, 1, 2);
        Apontar(circular, 2, 0);
        Apontar(circular, 2, 3);
        Console.WriteLine($"circular com ciclo: {TemCicloDirigido(circular)}");

        var cadeia = CriarGrafo(1000);

        for (int i = 0; i + 1 < 1000; i++)
        {
            Apontar(cadeia, i, i + 1);
        }

        Console.WriteLine($"cadeia com ciclo: {TemCicloDirigido(cadeia)}");
        Apontar(cadeia, 999, 0);
        Console.WriteLine($"cadeia fechada com ciclo: {TemCicloDirigido(cadeia)}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    const int Branco = 0;
    const int Cinza = 1;
    const int Preto = 2;

    static List<int>[] CriarGrafo(int n)
    {
        var g = new List<int>[n];

        for (int i = 0; i < n; i++)
        {
            g[i] = new List<int>();
        }

        return g;
    }

    static void Conectar(List<int>[] g, int a, int b)
    {
        g[a].Add(b);
        g[b].Add(a);
    }

    static void Apontar(List<int>[] g, int de, int para)
    {
        g[de].Add(para);
    }

    static bool TemCicloNaoDirigido(List<int>[] grafo)
    {
        var pai = new int[grafo.Length];
        var visitado = new bool[grafo.Length];

        for (int inicio = 0; inicio < grafo.Length; inicio++)
        {
            if (visitado[inicio])
            {
                continue;
            }

            var fila = new Queue<int>();
            visitado[inicio] = true;
            pai[inicio] = -1;
            fila.Enqueue(inicio);

            while (fila.Count > 0)
            {
                int atual = fila.Dequeue();

                foreach (int vizinho in grafo[atual])
                {
                    if (!visitado[vizinho])
                    {
                        visitado[vizinho] = true;
                        pai[vizinho] = atual;
                        fila.Enqueue(vizinho);
                    }
                    else if (vizinho != pai[atual])
                    {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    static bool TemCicloDirigido(List<int>[] grafo, int atual, int[] cor)
    {
        cor[atual] = Cinza;

        foreach (int vizinho in grafo[atual])
        {
            if (cor[vizinho] == Cinza)
            {
                return true;
            }

            if (cor[vizinho] == Branco && TemCicloDirigido(grafo, vizinho, cor))
            {
                return true;
            }
        }

        cor[atual] = Preto;
        return false;
    }

    static bool TemCicloDirigido(List<int>[] grafo)
    {
        var cor = new int[grafo.Length];

        for (int v = 0; v < grafo.Length; v++)
        {
            if (cor[v] == Branco && TemCicloDirigido(grafo, v, cor))
            {
                return true;
            }
        }

        return false;
    }

    static bool EhArvore(List<int>[] grafo)
    {
        if (TemCicloNaoDirigido(grafo))
        {
            return false;
        }

        var visitado = new bool[grafo.Length];
        var fila = new Queue<int>();
        visitado[0] = true;
        fila.Enqueue(0);
        int alcancados = 1;

        while (fila.Count > 0)
        {
            int atual = fila.Dequeue();

            foreach (int vizinho in grafo[atual])
            {
                if (!visitado[vizinho])
                {
                    visitado[vizinho] = true;
                    alcancados++;
                    fila.Enqueue(vizinho);
                }
            }
        }

        return alcancados == grafo.Length;
    }

    static void Main()
    {
        var g = CriarGrafo(9);
        Conectar(g, 0, 1);
        Conectar(g, 1, 2);
        Conectar(g, 3, 4);
        Conectar(g, 5, 6);
        Conectar(g, 6, 7);
        Conectar(g, 7, 5);
        Console.WriteLine($"desconexo com ciclo: {TemCicloNaoDirigido(g)}");
        Console.WriteLine($"desconexo eh arvore: {EhArvore(g)}");

        var arvore = CriarGrafo(5);
        Conectar(arvore, 0, 1);
        Conectar(arvore, 0, 2);
        Conectar(arvore, 1, 3);
        Conectar(arvore, 1, 4);
        Console.WriteLine($"arvore com ciclo: {TemCicloNaoDirigido(arvore)}");
        Console.WriteLine($"arvore eh arvore: {EhArvore(arvore)}");

        var quadrado = CriarGrafo(4);
        Conectar(quadrado, 0, 1);
        Conectar(quadrado, 1, 2);
        Conectar(quadrado, 2, 3);
        Conectar(quadrado, 3, 0);
        Console.WriteLine($"quadrado com ciclo: {TemCicloNaoDirigido(quadrado)}");

        var losango = CriarGrafo(6);
        Apontar(losango, 0, 1);
        Apontar(losango, 1, 2);
        Apontar(losango, 0, 2);
        Apontar(losango, 3, 4);
        Apontar(losango, 4, 5);
        Console.WriteLine($"losango dirigido com ciclo: {TemCicloDirigido(losango)}");

        var circular = CriarGrafo(4);
        Apontar(circular, 0, 1);
        Apontar(circular, 1, 2);
        Apontar(circular, 2, 0);
        Apontar(circular, 2, 3);
        Console.WriteLine($"circular com ciclo: {TemCicloDirigido(circular)}");

        var cadeia = CriarGrafo(1000);

        for (int i = 0; i + 1 < 1000; i++)
        {
            Apontar(cadeia, i, i + 1);
        }

        Console.WriteLine($"cadeia com ciclo: {TemCicloDirigido(cadeia)}");
        Apontar(cadeia, 999, 0);
        Console.WriteLine($"cadeia fechada com ciclo: {TemCicloDirigido(cadeia)}");
    }
}`,
      hints: [
        'Guarde `pai[inicio] = -1` para a raiz de cada componente: ela não veio de lugar nenhum, e nenhum vizinho vale `-1`.',
        'Na versão dirigida, `cor[atual] = Preto` fica **depois** do `foreach`. Pintar de preto cedo demais faz a detecção falhar.',
        '`EhArvore` são duas condições: sem ciclo e todos os vértices alcançáveis a partir do 0.',
      ],
      tests: [
        {
          name: 'Ciclos dirigidos e não dirigidos',
          expectedStdout:
            'desconexo com ciclo: True\ndesconexo eh arvore: False\n' +
            'arvore com ciclo: False\narvore eh arvore: True\n' +
            'quadrado com ciclo: True\n' +
            'losango dirigido com ciclo: False\ncircular com ciclo: True\n' +
            'cadeia com ciclo: False\ncadeia fechada com ciclo: True',
        },
      ],
    },
  },

  {
    id: 's07c07l07',
    title: 'Ordenação topológica',
    objective: 'Ordenar tarefas respeitando dependências e detectar quando a ordem é impossível.',
    concept: [
      {
        kind: 'text',
        body:
          'Dada uma lista de tarefas em que algumas dependem de outras, a **ordenação topológica** produz uma sequência em que toda tarefa aparece depois de tudo de que ela depende. É o que um gerenciador de pacotes, um sistema de build e um planejador de projeto fazem por dentro.',
      },
      {
        kind: 'text',
        body:
          'O grafo é dirigido: uma aresta `a → b` significa "`a` precisa vir antes de `b`". Só existe ordem se o grafo **não tiver ciclo** — um DAG, grafo dirigido acíclico.',
      },
      {
        kind: 'text',
        body:
          'O **algoritmo de Kahn** parte de uma ideia simples: quem não depende de ninguém pode ser feito agora. O **grau de entrada** de um vértice é quantas arestas chegam nele; grau de entrada zero significa "liberado".',
      },
      {
        kind: 'code',
        code: `static List<int> OrdemTopologica(List<int>[] grafo)
{
    var grauEntrada = new int[grafo.Length];

    for (int v = 0; v < grafo.Length; v++)
    {
        foreach (int destino in grafo[v])
        {
            grauEntrada[destino]++;
        }
    }

    var fila = new Queue<int>();

    for (int v = 0; v < grafo.Length; v++)
    {
        if (grauEntrada[v] == 0)
        {
            fila.Enqueue(v);
        }
    }

    var ordem = new List<int>();

    while (fila.Count > 0)
    {
        int atual = fila.Dequeue();
        ordem.Add(atual);

        foreach (int destino in grafo[atual])
        {
            grauEntrada[destino]--;

            if (grauEntrada[destino] == 0)
            {
                fila.Enqueue(destino);
            }
        }
    }

    return ordem;
}`,
        caption: 'Concluir uma tarefa "remove" as arestas que saem dela, o que pode liberar as seguintes.',
      },
      {
        kind: 'text',
        body:
          'A detecção de ciclo vem junto, sem esforço extra: se ao final `ordem.Count` for menor que o número de vértices, os que ficaram de fora estão presos num ciclo, esperando uns pelos outros para sempre.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Este é o jeito de detectar ciclo em grafos dirigidos grandes. Kahn é iterativo — sem recursão, sem risco de estourar a pilha — e devolve a ordem junto com a resposta.',
      },
      {
        kind: 'code',
        code: `var tarefas = CriarGrafo(7);
Apontar(tarefas, 0, 2);
Apontar(tarefas, 1, 2);
Apontar(tarefas, 2, 3);
Apontar(tarefas, 2, 4);
Apontar(tarefas, 3, 5);
Apontar(tarefas, 4, 5);
Apontar(tarefas, 5, 6);

var ordem = OrdemTopologica(tarefas);
Console.WriteLine(string.Join(" ", ordem));
Console.WriteLine($"completa: {ordem.Count == 7}");`,
      },
      {
        kind: 'output',
        code: `0 1 2 3 4 5 6
completa: True`,
        caption: '0 e 1 começam liberados; o 2 só entra na fila quando as duas dependências dele são concluídas.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A ordem topológica **não é única**. Aqui `1 0 2 4 3 5 6` também seria válida. O resultado depende da ordem em que os vértices entram na fila, então enunciados precisam fixar esse critério — neste, os vértices liberados no início entram em ordem crescente de índice.',
      },
      {
        kind: 'text',
        body: 'Num grafo com ciclo, a fila esvazia antes da hora e a lista sai incompleta:',
      },
      {
        kind: 'code',
        code: `var c = CriarGrafo(4);
Apontar(c, 0, 1);
Apontar(c, 1, 2);
Apontar(c, 2, 0);
Apontar(c, 2, 3);

var ordem = OrdemTopologica(c);
Console.WriteLine($"tamanho: {ordem.Count}");`,
      },
      {
        kind: 'output',
        code: `tamanho: 0`,
        caption: 'Todos os vértices do ciclo têm grau de entrada 1: nenhum começa liberado, e a fila nasce vazia.',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Resultado de Kahn'],
        rows: [
          ['DAG', 'lista com todos os V vértices'],
          ['grafo com ciclo', 'lista incompleta; os ausentes estão no ciclo ou dependem dele'],
          ['sem arestas', 'todos os vértices em ordem crescente'],
        ],
      },
      {
        kind: 'text',
        body:
          'O custo é **O(V + A)**: uma passada para calcular os graus de entrada, e depois cada vértice sai da fila uma vez e cada aresta é decrementada uma vez.',
      },
    ],
    quiz: [
      {
        id: 's07c07l07q1',
        type: 'single',
        prompt: 'O que significa a lista devolvida por Kahn ter menos elementos que o número de vértices?',
        options: [
          { id: 'a', text: 'O grafo tem ciclo, e os vértices ausentes estão presos nele ou dependem dele', correct: true },
          { id: 'b', text: 'O grafo é desconexo' },
          { id: 'c', text: 'Houve erro no cálculo dos graus de entrada' },
          { id: 'd', text: 'Alguns vértices não têm arestas' },
        ],
        explanation:
          'Vértices num ciclo nunca chegam a grau de entrada zero: cada um espera outro do mesmo ciclo. É a detecção de ciclo mais barata para grafos dirigidos grandes.',
      },
      {
        id: 's07c07l07q2',
        type: 'single',
        prompt: 'Um grafo dirigido tem 5 vértices e nenhuma aresta. Qual a ordem topológica?',
        options: [
          { id: 'a', text: '`0 1 2 3 4`: todos começam com grau de entrada zero', correct: true },
          { id: 'b', text: 'Lista vazia: sem arestas não há ordem' },
          { id: 'c', text: 'Apenas o vértice 0' },
          { id: 'd', text: 'Erro: o grafo precisa ser conexo' },
        ],
        explanation:
          'Todos entram na fila de saída, em ordem crescente. Qualquer permutação seria válida — a ordem crescente é consequência de como a fila é preenchida.',
      },
      {
        id: 's07c07l07q3',
        type: 'single',
        prompt: 'Por que Kahn é preferível à detecção recursiva de ciclo em grafos dirigidos grandes?',
        options: [
          { id: 'a', text: 'É iterativo: não depende da pilha de chamadas e não estoura em grafos profundos', correct: true },
          { id: 'b', text: 'Tem complexidade menor que O(V + A)' },
          { id: 'c', text: 'Funciona também em grafos não dirigidos' },
          { id: 'd', text: 'Usa menos memória que o array de cores' },
        ],
        explanation:
          'As duas são O(V + A). A diferença prática é a pilha: uma cadeia de 200.000 dependências derruba a versão recursiva e não incomoda Kahn.',
      },
    ],
    challenge: {
      brief:
        'Um sistema de build precisa decidir a ordem de compilação dos módulos. Implemente a ordenação topológica de Kahn, informe a ordem quando ela existir e detecte a dependência circular quando não existir.',
      requirements: [
        'Use o algoritmo de Kahn com `Queue<int>`, em O(V + A) — nada de recursão.',
        'Os vértices inicialmente liberados entram na fila em ordem crescente de índice.',
        'Quando a ordem for impossível, imprima `impossivel` e a quantidade de módulos presos.',
        '`Bloqueados` devolve os vértices que não entraram na ordem, em ordem crescente.',
        'Um teste roda sobre 200.000 módulos em cadeia.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static List<int>[] CriarGrafo(int n)
    {
        var g = new List<int>[n];

        for (int i = 0; i < n; i++)
        {
            g[i] = new List<int>();
        }

        return g;
    }

    static void Apontar(List<int>[] g, int de, int para)
    {
        g[de].Add(para);
    }

    static int[] GrausDeEntrada(List<int>[] grafo)
    {
        // TODO
        return new int[grafo.Length];
    }

    static List<int> OrdemTopologica(List<int>[] grafo)
    {
        // TODO: algoritmo de Kahn
        return new List<int>();
    }

    static List<int> Bloqueados(List<int>[] grafo, List<int> ordem)
    {
        // TODO: vertices que ficaram de fora, em ordem crescente
        return new List<int>();
    }

    static string Descrever(List<int>[] grafo, List<int> ordem)
    {
        if (ordem.Count == grafo.Length)
        {
            return string.Join(" ", ordem);
        }

        return $"impossivel ({Bloqueados(grafo, ordem).Count} presos)";
    }

    static void Main()
    {
        var build = CriarGrafo(7);
        Apontar(build, 0, 2);
        Apontar(build, 1, 2);
        Apontar(build, 2, 3);
        Apontar(build, 2, 4);
        Apontar(build, 3, 5);
        Apontar(build, 4, 5);
        Apontar(build, 5, 6);

        var ordem = OrdemTopologica(build);
        Console.WriteLine($"graus: {string.Join(",", GrausDeEntrada(build))}");
        Console.WriteLine($"build: {Descrever(build, ordem)}");

        var solto = CriarGrafo(4);
        Console.WriteLine($"solto: {Descrever(solto, OrdemTopologica(solto))}");

        var circular = CriarGrafo(5);
        Apontar(circular, 0, 1);
        Apontar(circular, 1, 2);
        Apontar(circular, 2, 0);
        Apontar(circular, 2, 3);
        Apontar(circular, 4, 3);

        var oc = OrdemTopologica(circular);
        Console.WriteLine($"circular: {Descrever(circular, oc)}");
        Console.WriteLine($"circular bloqueados: {string.Join(",", Bloqueados(circular, oc))}");
        Console.WriteLine($"circular resolvidos: {string.Join(",", oc)}");

        int n = 200000;
        var cadeia = CriarGrafo(n);

        for (int i = 0; i + 1 < n; i++)
        {
            Apontar(cadeia, i, i + 1);
        }

        var og = OrdemTopologica(cadeia);
        Console.WriteLine($"cadeia tamanho: {og.Count}");
        Console.WriteLine($"cadeia extremos: {og[0]} {og[og.Count - 1]}");

        Apontar(cadeia, n - 1, 0);
        var oq = OrdemTopologica(cadeia);
        Console.WriteLine($"cadeia fechada: {oq.Count}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static List<int>[] CriarGrafo(int n)
    {
        var g = new List<int>[n];

        for (int i = 0; i < n; i++)
        {
            g[i] = new List<int>();
        }

        return g;
    }

    static void Apontar(List<int>[] g, int de, int para)
    {
        g[de].Add(para);
    }

    static int[] GrausDeEntrada(List<int>[] grafo)
    {
        var grau = new int[grafo.Length];

        for (int v = 0; v < grafo.Length; v++)
        {
            foreach (int destino in grafo[v])
            {
                grau[destino]++;
            }
        }

        return grau;
    }

    static List<int> OrdemTopologica(List<int>[] grafo)
    {
        int[] grauEntrada = GrausDeEntrada(grafo);
        var fila = new Queue<int>();

        for (int v = 0; v < grafo.Length; v++)
        {
            if (grauEntrada[v] == 0)
            {
                fila.Enqueue(v);
            }
        }

        var ordem = new List<int>();

        while (fila.Count > 0)
        {
            int atual = fila.Dequeue();
            ordem.Add(atual);

            foreach (int destino in grafo[atual])
            {
                grauEntrada[destino]--;

                if (grauEntrada[destino] == 0)
                {
                    fila.Enqueue(destino);
                }
            }
        }

        return ordem;
    }

    static List<int> Bloqueados(List<int>[] grafo, List<int> ordem)
    {
        var saiu = new bool[grafo.Length];

        foreach (int v in ordem)
        {
            saiu[v] = true;
        }

        var lista = new List<int>();

        for (int v = 0; v < grafo.Length; v++)
        {
            if (!saiu[v])
            {
                lista.Add(v);
            }
        }

        return lista;
    }

    static string Descrever(List<int>[] grafo, List<int> ordem)
    {
        if (ordem.Count == grafo.Length)
        {
            return string.Join(" ", ordem);
        }

        return $"impossivel ({Bloqueados(grafo, ordem).Count} presos)";
    }

    static void Main()
    {
        var build = CriarGrafo(7);
        Apontar(build, 0, 2);
        Apontar(build, 1, 2);
        Apontar(build, 2, 3);
        Apontar(build, 2, 4);
        Apontar(build, 3, 5);
        Apontar(build, 4, 5);
        Apontar(build, 5, 6);

        var ordem = OrdemTopologica(build);
        Console.WriteLine($"graus: {string.Join(",", GrausDeEntrada(build))}");
        Console.WriteLine($"build: {Descrever(build, ordem)}");

        var solto = CriarGrafo(4);
        Console.WriteLine($"solto: {Descrever(solto, OrdemTopologica(solto))}");

        var circular = CriarGrafo(5);
        Apontar(circular, 0, 1);
        Apontar(circular, 1, 2);
        Apontar(circular, 2, 0);
        Apontar(circular, 2, 3);
        Apontar(circular, 4, 3);

        var oc = OrdemTopologica(circular);
        Console.WriteLine($"circular: {Descrever(circular, oc)}");
        Console.WriteLine($"circular bloqueados: {string.Join(",", Bloqueados(circular, oc))}");
        Console.WriteLine($"circular resolvidos: {string.Join(",", oc)}");

        int n = 200000;
        var cadeia = CriarGrafo(n);

        for (int i = 0; i + 1 < n; i++)
        {
            Apontar(cadeia, i, i + 1);
        }

        var og = OrdemTopologica(cadeia);
        Console.WriteLine($"cadeia tamanho: {og.Count}");
        Console.WriteLine($"cadeia extremos: {og[0]} {og[og.Count - 1]}");

        Apontar(cadeia, n - 1, 0);
        var oq = OrdemTopologica(cadeia);
        Console.WriteLine($"cadeia fechada: {oq.Count}");
    }
}`,
      hints: [
        'O grau de entrada de `b` é quantas vezes `b` aparece como destino em todas as listas de adjacência.',
        'Preencha a fila inicial percorrendo os vértices de 0 para cima: isso já garante o critério de desempate exigido.',
        'Em `Bloqueados`, marque num `bool[]` quem saiu na ordem e depois varra os vértices de 0 a V-1 recolhendo os não marcados.',
      ],
      tests: [
        {
          name: 'Ordem de build',
          expectedStdout:
            'graus: 0,0,2,1,1,2,1\nbuild: 0 1 2 3 4 5 6\n' +
            'solto: 0 1 2 3\n' +
            'circular: impossivel (4 presos)\ncircular bloqueados: 0,1,2,3\ncircular resolvidos: 4\n' +
            'cadeia tamanho: 200000\ncadeia extremos: 0 199999\ncadeia fechada: 0',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's07c07l08',
    title: 'Árvore binária de busca',
    objective: 'Construir e consultar uma BST, entendendo por que a altura decide o desempenho.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma **árvore binária de busca** guarda valores com uma regra única: tudo à esquerda de um nó é menor que ele, tudo à direita é maior. Essa invariante transforma cada comparação num descarte de metade do que sobrou.',
      },
      {
        kind: 'code',
        code: `class No
{
    public int Valor;
    public No Esquerda;
    public No Direita;

    public No(int valor)
    {
        Valor = valor;
    }
}`,
        caption: 'Um nó é um valor e dois ponteiros. `null` marca a ausência de filho.',
      },
      {
        kind: 'text',
        body:
          'A busca desce comparando: menor vai à esquerda, maior vai à direita, igual encontrou. É a busca binária da lição de busca, agora em ponteiros em vez de índices.',
      },
      {
        kind: 'code',
        code: `static bool Contem(No raiz, int valor)
{
    No atual = raiz;

    while (atual != null)
    {
        if (valor == atual.Valor)
        {
            return true;
        }

        atual = valor < atual.Valor ? atual.Esquerda : atual.Direita;
    }

    return false;
}`,
      },
      {
        kind: 'text',
        body:
          'A inserção segue exatamente o mesmo caminho da busca e, ao encontrar o `null` onde o valor estaria, cria o nó ali. Valores repetidos são ignorados.',
      },
      {
        kind: 'code',
        code: `static No Inserir(No raiz, int valor)
{
    if (raiz == null)
    {
        return new No(valor);
    }

    No atual = raiz;

    while (true)
    {
        if (valor < atual.Valor)
        {
            if (atual.Esquerda == null)
            {
                atual.Esquerda = new No(valor);
                return raiz;
            }

            atual = atual.Esquerda;
        }
        else if (valor > atual.Valor)
        {
            if (atual.Direita == null)
            {
                atual.Direita = new No(valor);
                return raiz;
            }

            atual = atual.Direita;
        }
        else
        {
            return raiz;
        }
    }
}`,
        caption: 'Versão iterativa: funciona com qualquer altura, mesmo numa árvore degenerada de 200 mil níveis.',
      },
      {
        kind: 'text',
        body:
          'O percurso **em ordem** — esquerda, nó, direita — visita os valores em ordem crescente. É a propriedade que faz da BST uma estrutura ordenada, não apenas um conjunto.',
      },
      {
        kind: 'code',
        code: `static void EmOrdem(No no, List<int> saida)
{
    if (no == null)
    {
        return;
    }

    EmOrdem(no.Esquerda, saida);
    saida.Add(no.Valor);
    EmOrdem(no.Direita, saida);
}`,
      },
      {
        kind: 'code',
        code: `No raiz = null;

foreach (int v in new[] { 50, 30, 70, 20, 40, 60, 80, 35 })
{
    raiz = Inserir(raiz, v);
}

var saida = new List<int>();
EmOrdem(raiz, saida);
Console.WriteLine(string.Join(" ", saida));
Console.WriteLine($"altura: {Altura(raiz)}");`,
      },
      {
        kind: 'output',
        code: `20 30 35 40 50 60 70 80
altura: 3`,
        caption: 'A árvore nunca foi ordenada explicitamente: a ordem é consequência da invariante.',
      },
      {
        kind: 'text',
        body:
          'Tudo depende da **altura**. Numa árvore equilibrada a altura é próxima de log₂(n), e busca e inserção custam O(log n). Mas a BST não se equilibra sozinha.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Inserir valores **já ordenados** produz o pior caso: cada novo valor é maior que todos, então a árvore vira uma lista encadeada de altura n-1. Busca e inserção degradam para O(n), e o percurso recursivo estoura a pilha.',
      },
      {
        kind: 'compare',
        good: `// insercao em ordem aleatoria
// 200.000 valores -> altura 40
// busca: ~40 comparacoes`,
        bad: `// insercao 1, 2, 3, 4, ...
// 200.000 valores -> altura 199.999
// busca: ate 200.000 comparacoes
// EmOrdem recursivo: stack overflow`,
        goodLabel: 'Ordem aleatória',
        badLabel: 'Ordem crescente',
      },
      {
        kind: 'table',
        headers: ['Operação', 'Árvore equilibrada', 'Árvore degenerada'],
        rows: [
          ['`Contem`', 'O(log n)', 'O(n)'],
          ['`Inserir`', 'O(log n)', 'O(n)'],
          ['`Minimo` / `Maximo`', 'O(log n)', 'O(n)'],
          ['`EmOrdem`', 'O(n)', 'O(n), mas estoura a pilha'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'É esse problema que as árvores balanceadas — AVL, rubro-negra — resolvem, reorganizando a estrutura a cada inserção para manter a altura em O(log n). `SortedSet<T>` e `SortedDictionary<K,V>` do .NET são exatamente isso, prontos para uso.',
      },
    ],
    quiz: [
      {
        id: 's07c07l08q1',
        type: 'single',
        prompt: 'Qual percurso de uma BST devolve os valores em ordem crescente?',
        options: [
          { id: 'a', text: 'Em ordem: esquerda, nó, direita', correct: true },
          { id: 'b', text: 'Pré-ordem: nó, esquerda, direita' },
          { id: 'c', text: 'Pós-ordem: esquerda, direita, nó' },
          { id: 'd', text: 'Por nível, usando fila' },
        ],
        explanation:
          'A invariante garante que tudo à esquerda é menor e tudo à direita é maior. Visitar nessa ordem produz a sequência ordenada; os outros percursos têm outros usos.',
      },
      {
        id: 's07c07l08q2',
        type: 'single',
        prompt: 'Inserindo 1, 2, 3, ..., 1000 nessa ordem numa BST, qual a altura resultante?',
        options: [
          { id: 'a', text: '999: cada valor vira o filho direito do anterior', correct: true },
          { id: 'b', text: 'Cerca de 10, próximo de log₂(1000)' },
          { id: 'c', text: '500' },
          { id: 'd', text: '1: todos ficam na raiz' },
        ],
        explanation:
          'Cada valor é maior que todos os anteriores, então desce sempre pela direita. A árvore vira uma lista encadeada — o pior caso da BST.',
      },
      {
        id: 's07c07l08q3',
        type: 'single',
        prompt: 'Por que a inserção iterativa é preferível à recursiva neste ambiente?',
        options: [
          { id: 'a', text: 'Numa árvore degenerada a recursão desce n níveis e estoura a pilha', correct: true },
          { id: 'b', text: 'A recursiva não consegue criar nós novos' },
          { id: 'c', text: 'A iterativa tem complexidade menor' },
          { id: 'd', text: 'A recursiva não mantém a invariante da BST' },
        ],
        explanation:
          'As duas são O(altura). A diferença é que a iterativa não consome pilha de chamadas, e a altura pode chegar a n quando os dados entram ordenados.',
      },
    ],
    challenge: {
      brief:
        'Implemente uma árvore binária de busca com inserção iterativa, consulta, mínimo, máximo, altura, contagem e percurso em ordem. Depois carregue 200.000 valores aleatórios e verifique que a saída em ordem está ordenada.',
      requirements: [
        '`Inserir` é iterativa e ignora valores repetidos.',
        '`Contem`, `Minimo` e `Maximo` são iterativos e custam O(altura).',
        '`Altura` de uma árvore vazia é `-1`; de um único nó, `0`.',
        'O teste grande usa `new Random(7)` e `Next(1000000)` — a mesma semente produz sempre a mesma árvore.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class No
{
    public int Valor;
    public No Esquerda;
    public No Direita;

    public No(int valor)
    {
        Valor = valor;
    }
}

class Program
{
    static No Inserir(No raiz, int valor)
    {
        // TODO: desca ate o null e crie o no ali; repetidos nao entram
        return raiz;
    }

    static bool Contem(No raiz, int valor)
    {
        // TODO
        return false;
    }

    static int Altura(No no)
    {
        // TODO: vazia = -1
        return -1;
    }

    static int Contar(No no)
    {
        // TODO
        return 0;
    }

    static void EmOrdem(No no, List<int> saida)
    {
        // TODO: esquerda, no, direita
    }

    static int Minimo(No raiz)
    {
        // TODO: sempre a esquerda
        return 0;
    }

    static int Maximo(No raiz)
    {
        // TODO: sempre a direita
        return 0;
    }

    static void Main()
    {
        No raiz = null;

        foreach (int v in new[] { 50, 30, 70, 20, 40, 60, 80, 35 })
        {
            raiz = Inserir(raiz, v);
        }

        var saida = new List<int>();
        EmOrdem(raiz, saida);
        Console.WriteLine($"em ordem: {string.Join(" ", saida)}");
        Console.WriteLine($"altura: {Altura(raiz)}");
        Console.WriteLine($"nos: {Contar(raiz)}");
        Console.WriteLine($"contem 40: {Contem(raiz, 40)}");
        Console.WriteLine($"contem 45: {Contem(raiz, 45)}");
        Console.WriteLine($"minimo: {Minimo(raiz)} maximo: {Maximo(raiz)}");

        raiz = Inserir(raiz, 30);
        Console.WriteLine($"apos repetido: {Contar(raiz)}");

        No degenerada = null;

        for (int v = 1; v <= 10; v++)
        {
            degenerada = Inserir(degenerada, v);
        }

        Console.WriteLine($"degenerada altura: {Altura(degenerada)}");
        Console.WriteLine($"vazia altura: {Altura(null)}");

        var sorteio = new Random(7);
        No grande = null;

        for (int i = 0; i < 200000; i++)
        {
            grande = Inserir(grande, sorteio.Next(1000000));
        }

        Console.WriteLine($"grande nos: {Contar(grande)}");
        Console.WriteLine($"grande altura: {Altura(grande)}");
        Console.WriteLine($"grande minimo: {Minimo(grande)} maximo: {Maximo(grande)}");

        var lista = new List<int>();
        EmOrdem(grande, lista);
        bool ordenada = true;

        for (int i = 1; i < lista.Count; i++)
        {
            if (lista[i - 1] >= lista[i])
            {
                ordenada = false;
            }
        }

        long soma = 0;

        foreach (int x in lista)
        {
            soma += x;
        }

        Console.WriteLine($"grande ordenada: {ordenada}");
        Console.WriteLine($"grande soma: {soma}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class No
{
    public int Valor;
    public No Esquerda;
    public No Direita;

    public No(int valor)
    {
        Valor = valor;
    }
}

class Program
{
    static No Inserir(No raiz, int valor)
    {
        if (raiz == null)
        {
            return new No(valor);
        }

        No atual = raiz;

        while (true)
        {
            if (valor < atual.Valor)
            {
                if (atual.Esquerda == null)
                {
                    atual.Esquerda = new No(valor);
                    return raiz;
                }

                atual = atual.Esquerda;
            }
            else if (valor > atual.Valor)
            {
                if (atual.Direita == null)
                {
                    atual.Direita = new No(valor);
                    return raiz;
                }

                atual = atual.Direita;
            }
            else
            {
                return raiz;
            }
        }
    }

    static bool Contem(No raiz, int valor)
    {
        No atual = raiz;

        while (atual != null)
        {
            if (valor == atual.Valor)
            {
                return true;
            }

            atual = valor < atual.Valor ? atual.Esquerda : atual.Direita;
        }

        return false;
    }

    static int Altura(No no)
    {
        if (no == null)
        {
            return -1;
        }

        int esquerda = Altura(no.Esquerda);
        int direita = Altura(no.Direita);

        return 1 + (esquerda > direita ? esquerda : direita);
    }

    static int Contar(No no)
    {
        if (no == null)
        {
            return 0;
        }

        return 1 + Contar(no.Esquerda) + Contar(no.Direita);
    }

    static void EmOrdem(No no, List<int> saida)
    {
        if (no == null)
        {
            return;
        }

        EmOrdem(no.Esquerda, saida);
        saida.Add(no.Valor);
        EmOrdem(no.Direita, saida);
    }

    static int Minimo(No raiz)
    {
        No atual = raiz;

        while (atual.Esquerda != null)
        {
            atual = atual.Esquerda;
        }

        return atual.Valor;
    }

    static int Maximo(No raiz)
    {
        No atual = raiz;

        while (atual.Direita != null)
        {
            atual = atual.Direita;
        }

        return atual.Valor;
    }

    static void Main()
    {
        No raiz = null;

        foreach (int v in new[] { 50, 30, 70, 20, 40, 60, 80, 35 })
        {
            raiz = Inserir(raiz, v);
        }

        var saida = new List<int>();
        EmOrdem(raiz, saida);
        Console.WriteLine($"em ordem: {string.Join(" ", saida)}");
        Console.WriteLine($"altura: {Altura(raiz)}");
        Console.WriteLine($"nos: {Contar(raiz)}");
        Console.WriteLine($"contem 40: {Contem(raiz, 40)}");
        Console.WriteLine($"contem 45: {Contem(raiz, 45)}");
        Console.WriteLine($"minimo: {Minimo(raiz)} maximo: {Maximo(raiz)}");

        raiz = Inserir(raiz, 30);
        Console.WriteLine($"apos repetido: {Contar(raiz)}");

        No degenerada = null;

        for (int v = 1; v <= 10; v++)
        {
            degenerada = Inserir(degenerada, v);
        }

        Console.WriteLine($"degenerada altura: {Altura(degenerada)}");
        Console.WriteLine($"vazia altura: {Altura(null)}");

        var sorteio = new Random(7);
        No grande = null;

        for (int i = 0; i < 200000; i++)
        {
            grande = Inserir(grande, sorteio.Next(1000000));
        }

        Console.WriteLine($"grande nos: {Contar(grande)}");
        Console.WriteLine($"grande altura: {Altura(grande)}");
        Console.WriteLine($"grande minimo: {Minimo(grande)} maximo: {Maximo(grande)}");

        var lista = new List<int>();
        EmOrdem(grande, lista);
        bool ordenada = true;

        for (int i = 1; i < lista.Count; i++)
        {
            if (lista[i - 1] >= lista[i])
            {
                ordenada = false;
            }
        }

        long soma = 0;

        foreach (int x in lista)
        {
            soma += x;
        }

        Console.WriteLine($"grande ordenada: {ordenada}");
        Console.WriteLine($"grande soma: {soma}");
    }
}`,
      hints: [
        'Em `Inserir`, o caso `raiz == null` cria a raiz; nos demais, o laço desce até achar o `null` do lado certo.',
        'O caso `valor == atual.Valor` deve retornar sem inserir nada — é assim que os repetidos são descartados.',
        '`Altura` de folha é 0, então a árvore vazia precisa valer `-1` para que `1 + max(...)` dê o resultado certo.',
        'A contagem final é menor que 200.000: com valores até 1.000.000, muitos sorteios repetem.',
      ],
      tests: [
        {
          name: 'BST completa',
          expectedStdout:
            'em ordem: 20 30 35 40 50 60 70 80\naltura: 3\nnos: 8\n' +
            'contem 40: True\ncontem 45: False\nminimo: 20 maximo: 80\napos repetido: 8\n' +
            'degenerada altura: 9\nvazia altura: -1\n' +
            'grande nos: 181195\ngrande altura: 40\ngrande minimo: 8 maximo: 999999\n' +
            'grande ordenada: True\ngrande soma: 90287094740',
        },
      ],
      timeoutMs: 10000,
    },
  },

  {
    id: 's07c07l09',
    title: 'Prática: percursos de árvore',
    objective: 'Dominar os quatro percursos de árvore binária e usá-los para medir e transformar a estrutura.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma árvore binária não precisa de classe: dois arrays bastam. `esquerda[i]` e `direita[i]` guardam os índices dos filhos do nó `i`, e `-1` faz o papel de `null`. É mais fácil de escrever num teste e mais rápido de percorrer.',
      },
      {
        kind: 'code',
        code: `//        0
//      1   2
//     3 4   5
//    6       7
int[] esquerda = { 1, 3, -1, 6, -1, -1, -1, -1 };
int[] direita  = { 2, 4,  5, -1, -1,  7, -1, -1 };`,
        caption: 'O nó 0 tem filhos 1 e 2; o nó 2 só tem filho direito, o 5.',
      },
      {
        kind: 'text',
        body:
          'Os três percursos em profundidade diferem em **um detalhe**: onde o nó é registrado em relação às chamadas nos filhos.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Pré-ordem',
          code: `saida.Add(no);
PreOrdem(esquerda[no]);
PreOrdem(direita[no]);`,
        },
        right: {
          label: 'Pós-ordem',
          code: `PosOrdem(esquerda[no]);
PosOrdem(direita[no]);
saida.Add(no);`,
        },
        note: 'Em ordem coloca o `Add` entre as duas chamadas. As três visitam os mesmos nós, com o mesmo custo O(n).',
      },
      {
        kind: 'code',
        code: `static void EmOrdem(int[] esquerda, int[] direita, int no, List<int> saida)
{
    if (no == -1)
    {
        return;
    }

    EmOrdem(esquerda, direita, esquerda[no], saida);
    saida.Add(no);
    EmOrdem(esquerda, direita, direita[no], saida);
}`,
      },
      {
        kind: 'output',
        code: `pre: 0 1 3 6 4 2 5 7
em:  6 3 1 4 0 2 5 7
pos: 6 3 4 1 7 5 2 0`,
        caption: 'A raiz aparece em primeiro na pré-ordem, no meio na ordem, e sempre por último na pós-ordem.',
      },
      {
        kind: 'table',
        headers: ['Percurso', 'Quando usar'],
        rows: [
          ['pré-ordem', 'copiar ou serializar a árvore: a raiz vem antes dos filhos'],
          ['em ordem', 'ler uma BST em ordem crescente'],
          ['pós-ordem', 'liberar ou calcular de baixo para cima: os filhos vêm antes do pai'],
          ['por nível', 'processar camada a camada, ou achar o nó mais raso'],
        ],
      },
      {
        kind: 'text',
        body:
          'O quarto percurso é **por nível**, e ele não é recursivo — é o BFS aplicado a uma árvore, com a mesma fila de sempre.',
      },
      {
        kind: 'code',
        code: `static List<int> PorNivel(int[] esquerda, int[] direita, int raiz)
{
    var saida = new List<int>();

    if (raiz == -1)
    {
        return saida;
    }

    var fila = new Queue<int>();
    fila.Enqueue(raiz);

    while (fila.Count > 0)
    {
        int no = fila.Dequeue();
        saida.Add(no);

        if (esquerda[no] != -1) fila.Enqueue(esquerda[no]);
        if (direita[no] != -1) fila.Enqueue(direita[no]);
    }

    return saida;
}`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma árvore é um grafo sem ciclos, então não precisa de array de visitados: cada nó tem exatamente um pai, e a fila nunca reencontra alguém que já passou.',
      },
      {
        kind: 'text',
        body:
          'Medidas da árvore saem de percursos com um pequeno acúmulo. Altura e contagem de folhas são as mais usadas, e as duas seguem o mesmo formato recursivo: caso base no `-1`, combinação dos dois lados.',
      },
      {
        kind: 'code',
        code: `static int ContarFolhas(int[] esquerda, int[] direita, int no)
{
    if (no == -1)
    {
        return 0;
    }

    if (esquerda[no] == -1 && direita[no] == -1)
    {
        return 1;
    }

    return ContarFolhas(esquerda, direita, esquerda[no])
         + ContarFolhas(esquerda, direita, direita[no]);
}`,
        caption: 'São dois casos base: nó inexistente conta 0, folha conta 1.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Espelhar uma árvore é uma pós-ordem em que o "trabalho" é trocar os dois filhos. Como a troca acontece depois das chamadas recursivas, cada subárvore já está espelhada quando o pai inverte os ponteiros.',
      },
    ],
    quiz: [
      {
        id: 's07c07l09q1',
        type: 'single',
        prompt: 'Em qual percurso a raiz é sempre o último nó visitado?',
        options: [
          { id: 'a', text: 'Pós-ordem', correct: true },
          { id: 'b', text: 'Pré-ordem' },
          { id: 'c', text: 'Em ordem' },
          { id: 'd', text: 'Por nível' },
        ],
        explanation:
          'Na pós-ordem o nó só é registrado depois das duas subárvores. Por isso ela é a escolha para operações que precisam dos filhos já processados — liberar memória, somar de baixo para cima, espelhar.',
      },
      {
        id: 's07c07l09q2',
        type: 'single',
        prompt: 'Por que o percurso por nível não precisa de array de visitados?',
        options: [
          { id: 'a', text: 'Numa árvore cada nó tem exatamente um pai, então nada é alcançado duas vezes', correct: true },
          { id: 'b', text: 'Porque a fila remove duplicatas automaticamente' },
          { id: 'c', text: 'Porque árvores são sempre pequenas' },
          { id: 'd', text: 'Precisa sim; omitir causa laço infinito' },
        ],
        explanation:
          'A marcação existe para impedir voltar por um ciclo. Árvores não têm ciclos, e é por isso que o mesmo BFS fica mais curto aqui do que num grafo qualquer.',
      },
      {
        id: 's07c07l09q3',
        type: 'single',
        prompt: 'Qual é a altura de uma árvore com um único nó, na convenção usada aqui?',
        options: [
          { id: 'a', text: '0', correct: true },
          { id: 'b', text: '1' },
          { id: 'c', text: '-1' },
          { id: 'd', text: 'Indefinida' },
        ],
        explanation:
          'A altura conta arestas até a folha mais distante: um nó sozinho não tem nenhuma. O `-1` fica reservado para a árvore vazia, para que `1 + max(esquerda, direita)` produza 0 nas folhas.',
      },
    ],
    challenge: {
      brief:
        'Implemente os quatro percursos sobre a representação em arrays, meça altura e folhas, e espelhe a árvore invertendo os filhos de cada nó.',
      requirements: [
        'Use a representação `int[] esquerda` / `int[] direita`, com `-1` no lugar de `null`.',
        'Os três percursos em profundidade são recursivos; o por nível usa `Queue<int>`.',
        'Altura da árvore vazia é `-1`; de uma folha, `0`.',
        '`Espelhar` troca os filhos de cada nó e devolve quantos nós foram alterados.',
        'O último teste usa uma árvore completa de 8191 nós — profundidade 12, segura para recursão.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void PreOrdem(int[] esquerda, int[] direita, int no, List<int> saida)
    {
        // TODO: no, esquerda, direita
    }

    static void EmOrdem(int[] esquerda, int[] direita, int no, List<int> saida)
    {
        // TODO: esquerda, no, direita
    }

    static void PosOrdem(int[] esquerda, int[] direita, int no, List<int> saida)
    {
        // TODO: esquerda, direita, no
    }

    static List<int> PorNivel(int[] esquerda, int[] direita, int raiz)
    {
        // TODO: BFS com fila
        return new List<int>();
    }

    static int Altura(int[] esquerda, int[] direita, int no)
    {
        // TODO: vazia = -1
        return -1;
    }

    static int ContarFolhas(int[] esquerda, int[] direita, int no)
    {
        // TODO
        return 0;
    }

    static int Espelhar(int[] esquerda, int[] direita, int no)
    {
        // TODO: pos-ordem trocando os filhos; devolve quantos nos foram trocados
        return 0;
    }

    static string Percorrer(int[] esquerda, int[] direita, int raiz, string modo)
    {
        var saida = new List<int>();

        if (modo == "pre") PreOrdem(esquerda, direita, raiz, saida);
        if (modo == "em") EmOrdem(esquerda, direita, raiz, saida);
        if (modo == "pos") PosOrdem(esquerda, direita, raiz, saida);

        return string.Join(" ", saida);
    }

    static void Main()
    {
        int[] esquerda = { 1, 3, -1, 6, -1, -1, -1, -1 };
        int[] direita = { 2, 4, 5, -1, -1, 7, -1, -1 };

        Console.WriteLine($"pre: {Percorrer(esquerda, direita, 0, "pre")}");
        Console.WriteLine($"em: {Percorrer(esquerda, direita, 0, "em")}");
        Console.WriteLine($"pos: {Percorrer(esquerda, direita, 0, "pos")}");
        Console.WriteLine($"nivel: {string.Join(" ", PorNivel(esquerda, direita, 0))}");
        Console.WriteLine($"altura: {Altura(esquerda, direita, 0)}");
        Console.WriteLine($"folhas: {ContarFolhas(esquerda, direita, 0)}");

        int trocas = Espelhar(esquerda, direita, 0);
        Console.WriteLine($"trocas: {trocas}");
        Console.WriteLine($"espelhado pre: {Percorrer(esquerda, direita, 0, "pre")}");
        Console.WriteLine($"espelhado nivel: {string.Join(" ", PorNivel(esquerda, direita, 0))}");

        int[] folha = { -1 };
        int[] folhaDireita = { -1 };
        Console.WriteLine($"folha altura: {Altura(folha, folhaDireita, 0)}");
        Console.WriteLine($"folha folhas: {ContarFolhas(folha, folhaDireita, 0)}");
        Console.WriteLine($"vazia altura: {Altura(folha, folhaDireita, -1)}");
        Console.WriteLine($"vazia nivel vazio: {PorNivel(folha, folhaDireita, -1).Count == 0}");

        int n = 8191;
        var ec = new int[n];
        var dc = new int[n];

        for (int i = 0; i < n; i++)
        {
            ec[i] = 2 * i + 1 < n ? 2 * i + 1 : -1;
            dc[i] = 2 * i + 2 < n ? 2 * i + 2 : -1;
        }

        Console.WriteLine($"completa altura: {Altura(ec, dc, 0)}");
        Console.WriteLine($"completa folhas: {ContarFolhas(ec, dc, 0)}");

        var nivelCompleta = PorNivel(ec, dc, 0);
        Console.WriteLine($"completa nivel ok: {nivelCompleta.Count == n}");
        Console.WriteLine($"completa extremos: {nivelCompleta[0]} {nivelCompleta[n - 1]}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void PreOrdem(int[] esquerda, int[] direita, int no, List<int> saida)
    {
        if (no == -1)
        {
            return;
        }

        saida.Add(no);
        PreOrdem(esquerda, direita, esquerda[no], saida);
        PreOrdem(esquerda, direita, direita[no], saida);
    }

    static void EmOrdem(int[] esquerda, int[] direita, int no, List<int> saida)
    {
        if (no == -1)
        {
            return;
        }

        EmOrdem(esquerda, direita, esquerda[no], saida);
        saida.Add(no);
        EmOrdem(esquerda, direita, direita[no], saida);
    }

    static void PosOrdem(int[] esquerda, int[] direita, int no, List<int> saida)
    {
        if (no == -1)
        {
            return;
        }

        PosOrdem(esquerda, direita, esquerda[no], saida);
        PosOrdem(esquerda, direita, direita[no], saida);
        saida.Add(no);
    }

    static List<int> PorNivel(int[] esquerda, int[] direita, int raiz)
    {
        var saida = new List<int>();

        if (raiz == -1)
        {
            return saida;
        }

        var fila = new Queue<int>();
        fila.Enqueue(raiz);

        while (fila.Count > 0)
        {
            int no = fila.Dequeue();
            saida.Add(no);

            if (esquerda[no] != -1)
            {
                fila.Enqueue(esquerda[no]);
            }

            if (direita[no] != -1)
            {
                fila.Enqueue(direita[no]);
            }
        }

        return saida;
    }

    static int Altura(int[] esquerda, int[] direita, int no)
    {
        if (no == -1)
        {
            return -1;
        }

        int e = Altura(esquerda, direita, esquerda[no]);
        int d = Altura(esquerda, direita, direita[no]);

        return 1 + (e > d ? e : d);
    }

    static int ContarFolhas(int[] esquerda, int[] direita, int no)
    {
        if (no == -1)
        {
            return 0;
        }

        if (esquerda[no] == -1 && direita[no] == -1)
        {
            return 1;
        }

        return ContarFolhas(esquerda, direita, esquerda[no])
             + ContarFolhas(esquerda, direita, direita[no]);
    }

    static int Espelhar(int[] esquerda, int[] direita, int no)
    {
        if (no == -1)
        {
            return 0;
        }

        int trocados = Espelhar(esquerda, direita, esquerda[no])
                     + Espelhar(esquerda, direita, direita[no]);

        int guarda = esquerda[no];
        esquerda[no] = direita[no];
        direita[no] = guarda;

        return trocados + 1;
    }

    static string Percorrer(int[] esquerda, int[] direita, int raiz, string modo)
    {
        var saida = new List<int>();

        if (modo == "pre")
        {
            PreOrdem(esquerda, direita, raiz, saida);
        }

        if (modo == "em")
        {
            EmOrdem(esquerda, direita, raiz, saida);
        }

        if (modo == "pos")
        {
            PosOrdem(esquerda, direita, raiz, saida);
        }

        return string.Join(" ", saida);
    }

    static void Main()
    {
        int[] esquerda = { 1, 3, -1, 6, -1, -1, -1, -1 };
        int[] direita = { 2, 4, 5, -1, -1, 7, -1, -1 };

        Console.WriteLine($"pre: {Percorrer(esquerda, direita, 0, "pre")}");
        Console.WriteLine($"em: {Percorrer(esquerda, direita, 0, "em")}");
        Console.WriteLine($"pos: {Percorrer(esquerda, direita, 0, "pos")}");
        Console.WriteLine($"nivel: {string.Join(" ", PorNivel(esquerda, direita, 0))}");
        Console.WriteLine($"altura: {Altura(esquerda, direita, 0)}");
        Console.WriteLine($"folhas: {ContarFolhas(esquerda, direita, 0)}");

        int trocas = Espelhar(esquerda, direita, 0);
        Console.WriteLine($"trocas: {trocas}");
        Console.WriteLine($"espelhado pre: {Percorrer(esquerda, direita, 0, "pre")}");
        Console.WriteLine($"espelhado nivel: {string.Join(" ", PorNivel(esquerda, direita, 0))}");

        int[] folha = { -1 };
        int[] folhaDireita = { -1 };
        Console.WriteLine($"folha altura: {Altura(folha, folhaDireita, 0)}");
        Console.WriteLine($"folha folhas: {ContarFolhas(folha, folhaDireita, 0)}");
        Console.WriteLine($"vazia altura: {Altura(folha, folhaDireita, -1)}");
        Console.WriteLine($"vazia nivel vazio: {PorNivel(folha, folhaDireita, -1).Count == 0}");

        int n = 8191;
        var ec = new int[n];
        var dc = new int[n];

        for (int i = 0; i < n; i++)
        {
            ec[i] = 2 * i + 1 < n ? 2 * i + 1 : -1;
            dc[i] = 2 * i + 2 < n ? 2 * i + 2 : -1;
        }

        Console.WriteLine($"completa altura: {Altura(ec, dc, 0)}");
        Console.WriteLine($"completa folhas: {ContarFolhas(ec, dc, 0)}");

        var nivelCompleta = PorNivel(ec, dc, 0);
        Console.WriteLine($"completa nivel ok: {nivelCompleta.Count == n}");
        Console.WriteLine($"completa extremos: {nivelCompleta[0]} {nivelCompleta[n - 1]}");
    }
}`,
      hints: [
        'Os três percursos em profundidade têm o mesmo esqueleto; o que muda é a posição do `saida.Add(no)`.',
        'Em `Espelhar`, faça as chamadas recursivas **antes** da troca. Trocando primeiro, você desceria nas subárvores já invertidas — o resultado ainda seria correto aqui, mas a contagem fica mais fácil de acompanhar na ordem certa.',
        'Uma árvore completa com 8191 nós tem 4096 folhas: 8191 = 2¹³ - 1, e as folhas são metade mais uma.',
      ],
      tests: [
        {
          name: 'Quatro percursos e espelho',
          expectedStdout:
            'pre: 0 1 3 6 4 2 5 7\nem: 6 3 1 4 0 2 5 7\npos: 6 3 4 1 7 5 2 0\nnivel: 0 1 2 3 4 5 6 7\n' +
            'altura: 3\nfolhas: 3\n' +
            'trocas: 8\nespelhado pre: 0 2 5 7 1 4 3 6\nespelhado nivel: 0 2 1 5 4 3 7 6\n' +
            'folha altura: 0\nfolha folhas: 1\nvazia altura: -1\nvazia nivel vazio: True\n' +
            'completa altura: 12\ncompleta folhas: 4096\ncompleta nivel ok: True\ncompleta extremos: 0 8190',
        },
      ],
    },
  },

  {
    id: 's07c07l10',
    title: 'Boss: rotas de entrega',
    objective:
      'Fechar a seção com o algoritmo de Dijkstra: caminho de menor custo num grafo com pesos, rota reconstruída e comparação com o BFS.',
    concept: [
      {
        kind: 'text',
        body:
          'O BFS encontra o caminho com **menos arestas**. Mas numa malha de entregas as arestas não são iguais: um trecho pode custar 1 e outro 50. Menos trechos não significa mais barato.',
      },
      {
        kind: 'text',
        body:
          'Quando as arestas têm **peso**, o algoritmo é o de **Dijkstra**. A ideia é a mesma do BFS — expandir a partir do mais próximo — mas "mais próximo" passa a significar menor custo acumulado, não menor número de saltos.',
      },
      {
        kind: 'compare',
        good: `// Dijkstra: sempre expande
// o vertice de menor custo conhecido
var fila = new PriorityQueue<int, long>();`,
        bad: `// BFS num grafo com pesos:
// expande por numero de arestas
// e devolve rotas mais caras
var fila = new Queue<int>();`,
        goodLabel: 'Fila de prioridade',
        badLabel: 'Fila comum',
      },
      {
        kind: 'text',
        body:
          'A estrutura que muda tudo é a `PriorityQueue<TElemento, TPrioridade>`: `Dequeue` sempre devolve o elemento de menor prioridade. É a fila do BFS, ordenada por custo.',
      },
      {
        kind: 'code',
        code: `static (long[] Custo, int[] Anterior) MenoresCustos(List<(int Destino, int Custo)>[] rede, int origem)
{
    var custo = new long[rede.Length];
    var anterior = new int[rede.Length];

    for (int i = 0; i < rede.Length; i++)
    {
        custo[i] = long.MaxValue;
        anterior[i] = -1;
    }

    var fila = new PriorityQueue<int, long>();
    custo[origem] = 0;
    fila.Enqueue(origem, 0);

    while (fila.TryDequeue(out int atual, out long custoAtual))
    {
        if (custoAtual > custo[atual])
        {
            continue;
        }

        foreach (var aresta in rede[atual])
        {
            long candidato = custoAtual + aresta.Custo;

            if (candidato < custo[aresta.Destino])
            {
                custo[aresta.Destino] = candidato;
                anterior[aresta.Destino] = atual;
                fila.Enqueue(aresta.Destino, candidato);
            }
        }
    }

    return (custo, anterior);
}`,
        caption: 'O `anterior` guarda de onde viemos, e é o que permite reconstruir a rota depois.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A linha `if (custoAtual > custo[atual]) continue;` é a peça que muitos esquecem. Um vértice pode entrar na fila várias vezes, uma por melhoria encontrada; essa comparação descarta as entradas obsoletas em O(1), sem precisar remover nada da fila.',
      },
      {
        kind: 'text',
        body:
          'Aqui `long.MaxValue` faz o papel do `-1` do BFS: significa "ainda inalcançável". Usar `long` no custo — e não `int` — evita que `custoAtual + aresta.Custo` estoure ao somar sobre um valor sentinela alto.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Dijkstra exige pesos **não negativos**. Com uma aresta de peso negativo a garantia se quebra: um vértice já fechado poderia ficar mais barato depois. Nesses casos o algoritmo é outro — Bellman-Ford.',
      },
      {
        kind: 'text',
        body: 'A diferença entre "menos saltos" e "mais barato" aparece num exemplo pequeno:',
      },
      {
        kind: 'output',
        code: `custo ate 1: 3   (rota 0 -> 2 -> 1, dois saltos)
saltos ate 1: 1  (aresta direta 0 -> 1, custo 4)`,
        caption: 'A aresta direta 0→1 custa 4; o desvio por 2 custa 1 + 2 = 3. Menos saltos, mais caro.',
      },
      {
        kind: 'text',
        body:
          'A reconstrução da rota é igual à da grade: siga o array `anterior` a partir do destino até chegar em `-1`, e inverta.',
      },
      {
        kind: 'code',
        code: `static List<int> Rota(int[] anterior, long[] custo, int destino)
{
    var rota = new List<int>();

    if (custo[destino] == long.MaxValue)
    {
        return rota;
    }

    int atual = destino;

    while (atual != -1)
    {
        rota.Add(atual);
        atual = anterior[atual];
    }

    rota.Reverse();
    return rota;
}`,
      },
      {
        kind: 'table',
        headers: ['Algoritmo', 'Arestas', 'Custo', 'Responde'],
        rows: [
          ['BFS', 'sem peso (ou peso igual)', 'O(V + A)', 'menor número de arestas'],
          ['Dijkstra', 'pesos não negativos', 'O((V + A) log V)', 'menor custo total'],
          ['Bellman-Ford', 'pesos podem ser negativos', 'O(V · A)', 'menor custo total'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Quando todas as arestas têm o mesmo peso, Dijkstra e BFS dão a mesma resposta — e aí o BFS ganha, por ser mais simples e mais rápido. Escolher o algoritmo mais fraco que resolve o problema é uma decisão de engenharia, não uma limitação.',
      },
    ],
    quiz: [
      {
        id: 's07c07l10q1',
        type: 'single',
        prompt: 'Por que o BFS não serve para caminho mínimo num grafo com pesos?',
        options: [
          { id: 'a', text: 'Ele minimiza o número de arestas, não a soma dos pesos', correct: true },
          { id: 'b', text: 'Porque a fila não aceita números grandes' },
          { id: 'c', text: 'Porque o BFS não funciona em grafos dirigidos' },
          { id: 'd', text: 'Serve sim, desde que o grafo seja conexo' },
        ],
        explanation:
          'Um caminho de dois trechos baratos pode custar menos que um trecho caro. Só quando todos os pesos são iguais é que as duas respostas coincidem.',
      },
      {
        id: 's07c07l10q2',
        type: 'single',
        prompt: 'Para que serve `if (custoAtual > custo[atual]) continue;` no laço de Dijkstra?',
        options: [
          {
            id: 'a',
            text: 'Descarta entradas obsoletas da fila, deixadas por melhorias posteriores no custo do vértice',
            correct: true,
          },
          { id: 'b', text: 'Detecta pesos negativos' },
          { id: 'c', text: 'Impede que o grafo tenha ciclos' },
          { id: 'd', text: 'É apenas uma otimização opcional sem efeito no resultado' },
        ],
        explanation:
          'Sem remover elementos da fila, um vértice melhorado entra de novo e a entrada antiga continua lá. Reprocessá-la não muda o resultado final, mas desperdiça trabalho — a comparação corta isso em O(1).',
      },
      {
        id: 's07c07l10q3',
        type: 'single',
        prompt: 'O que acontece com Dijkstra num grafo com uma aresta de peso negativo?',
        options: [
          { id: 'a', text: 'Pode devolver custos errados: um vértice já fechado poderia ficar mais barato depois', correct: true },
          { id: 'b', text: 'Entra em laço infinito sempre' },
          { id: 'c', text: 'Funciona normalmente' },
          { id: 'd', text: 'Lança uma exceção' },
        ],
        explanation:
          'A correção do algoritmo depende de que expandir o vértice mais barato o feche em definitivo. Uma aresta negativa pode baratear um vértice já processado, e nada volta atrás. Para esse caso existe Bellman-Ford.',
      },
    ],
    challenge: {
      brief:
        'Uma transportadora precisa planejar rotas a partir do centro de distribuição. Implemente Dijkstra com fila de prioridade, reconstrua a rota até um hub, identifique os inalcançáveis e mostre onde o caminho mais barato difere do caminho com menos saltos.',
      requirements: [
        'Use `PriorityQueue<int, long>` — a solução deve ser O((V + A) log V).',
        'Custos em `long`, com `long.MaxValue` marcando inalcançável.',
        '`Rota` devolve lista vazia quando não há caminho; o programa imprime `sem rota`.',
        '`SaltosMinimos` é um BFS comum, para comparar com o resultado ponderado.',
        'Empates de custo em `MaisCaro` resolvem pelo menor índice.',
        'Um teste roda sobre 200.000 hubs: uma varredura O(V²) não terminaria a tempo.',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static List<(int Destino, int Custo)>[] CriarRede(int n)
    {
        var rede = new List<(int Destino, int Custo)>[n];

        for (int i = 0; i < n; i++)
        {
            rede[i] = new List<(int, int)>();
        }

        return rede;
    }

    static void Ligar(List<(int Destino, int Custo)>[] rede, int de, int para, int custo)
    {
        rede[de].Add((para, custo));
        rede[para].Add((de, custo));
    }

    static (long[] Custo, int[] Anterior) MenoresCustos(List<(int Destino, int Custo)>[] rede, int origem)
    {
        // TODO: Dijkstra com PriorityQueue<int, long>
        return (new long[rede.Length], new int[rede.Length]);
    }

    static List<int> Rota(int[] anterior, long[] custo, int destino)
    {
        // TODO: siga anterior ate -1 e inverta
        return new List<int>();
    }

    static int[] SaltosMinimos(List<(int Destino, int Custo)>[] rede, int origem)
    {
        // TODO: BFS ignorando os pesos, -1 para inalcancavel
        return new int[rede.Length];
    }

    static int Inalcancaveis(long[] custo)
    {
        // TODO
        return 0;
    }

    static int MaisCaro(long[] custo)
    {
        // TODO: hub alcancavel de maior custo
        return 0;
    }

    static string Descrever(long valor)
    {
        return valor == long.MaxValue ? "inalcancavel" : valor.ToString();
    }

    static void Main()
    {
        var rede = CriarRede(8);
        Ligar(rede, 0, 1, 4);
        Ligar(rede, 0, 2, 1);
        Ligar(rede, 2, 1, 2);
        Ligar(rede, 1, 3, 5);
        Ligar(rede, 2, 3, 8);
        Ligar(rede, 3, 4, 3);
        Ligar(rede, 4, 5, 1);
        Ligar(rede, 6, 7, 2);

        var (custo, anterior) = MenoresCustos(rede, 0);

        for (int v = 0; v < rede.Length; v++)
        {
            Console.WriteLine($"custo {v}: {Descrever(custo[v])}");
        }

        Console.WriteLine($"rota ate 5: {string.Join(" -> ", Rota(anterior, custo, 5))}");
        Console.WriteLine($"rota ate 7: {(Rota(anterior, custo, 7).Count == 0 ? "sem rota" : "ok")}");

        int[] saltos = SaltosMinimos(rede, 0);
        Console.WriteLine($"saltos: {string.Join(",", saltos)}");
        Console.WriteLine($"ate 1 custo {custo[1]} em {saltos[1]} saltos");
        Console.WriteLine($"inalcancaveis: {Inalcancaveis(custo)}");
        Console.WriteLine($"mais caro: {MaisCaro(custo)} por {custo[MaisCaro(custo)]}");

        int n = 200000;
        var grande = CriarRede(n);

        for (int i = 0; i + 1 < n; i++)
        {
            Ligar(grande, i, i + 1, 1 + i % 9);
        }

        for (int i = 0; i + 100 < n; i += 100)
        {
            Ligar(grande, i, i + 100, 50);
        }

        var (cg, ag) = MenoresCustos(grande, 0);
        long somaGrande = 0;

        foreach (long x in cg)
        {
            somaGrande += x;
        }

        Console.WriteLine($"grande custo final: {cg[n - 1]}");
        Console.WriteLine($"grande soma: {somaGrande}");
        Console.WriteLine($"grande rota tamanho: {Rota(ag, cg, n - 1).Count}");
        Console.WriteLine($"grande inalcancaveis: {Inalcancaveis(cg)}");
    }
}`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static List<(int Destino, int Custo)>[] CriarRede(int n)
    {
        var rede = new List<(int Destino, int Custo)>[n];

        for (int i = 0; i < n; i++)
        {
            rede[i] = new List<(int, int)>();
        }

        return rede;
    }

    static void Ligar(List<(int Destino, int Custo)>[] rede, int de, int para, int custo)
    {
        rede[de].Add((para, custo));
        rede[para].Add((de, custo));
    }

    static (long[] Custo, int[] Anterior) MenoresCustos(List<(int Destino, int Custo)>[] rede, int origem)
    {
        var custo = new long[rede.Length];
        var anterior = new int[rede.Length];

        for (int i = 0; i < rede.Length; i++)
        {
            custo[i] = long.MaxValue;
            anterior[i] = -1;
        }

        var fila = new PriorityQueue<int, long>();
        custo[origem] = 0;
        fila.Enqueue(origem, 0);

        while (fila.TryDequeue(out int atual, out long custoAtual))
        {
            if (custoAtual > custo[atual])
            {
                continue;
            }

            foreach (var aresta in rede[atual])
            {
                long candidato = custoAtual + aresta.Custo;

                if (candidato < custo[aresta.Destino])
                {
                    custo[aresta.Destino] = candidato;
                    anterior[aresta.Destino] = atual;
                    fila.Enqueue(aresta.Destino, candidato);
                }
            }
        }

        return (custo, anterior);
    }

    static List<int> Rota(int[] anterior, long[] custo, int destino)
    {
        var rota = new List<int>();

        if (custo[destino] == long.MaxValue)
        {
            return rota;
        }

        int atual = destino;

        while (atual != -1)
        {
            rota.Add(atual);
            atual = anterior[atual];
        }

        rota.Reverse();
        return rota;
    }

    static int[] SaltosMinimos(List<(int Destino, int Custo)>[] rede, int origem)
    {
        var saltos = new int[rede.Length];

        for (int i = 0; i < saltos.Length; i++)
        {
            saltos[i] = -1;
        }

        var fila = new Queue<int>();
        saltos[origem] = 0;
        fila.Enqueue(origem);

        while (fila.Count > 0)
        {
            int atual = fila.Dequeue();

            foreach (var aresta in rede[atual])
            {
                if (saltos[aresta.Destino] == -1)
                {
                    saltos[aresta.Destino] = saltos[atual] + 1;
                    fila.Enqueue(aresta.Destino);
                }
            }
        }

        return saltos;
    }

    static int Inalcancaveis(long[] custo)
    {
        int total = 0;

        foreach (long x in custo)
        {
            if (x == long.MaxValue)
            {
                total++;
            }
        }

        return total;
    }

    static int MaisCaro(long[] custo)
    {
        int melhor = -1;
        long maior = -1;

        for (int v = 0; v < custo.Length; v++)
        {
            if (custo[v] == long.MaxValue)
            {
                continue;
            }

            if (custo[v] > maior)
            {
                maior = custo[v];
                melhor = v;
            }
        }

        return melhor;
    }

    static string Descrever(long valor)
    {
        return valor == long.MaxValue ? "inalcancavel" : valor.ToString();
    }

    static void Main()
    {
        var rede = CriarRede(8);
        Ligar(rede, 0, 1, 4);
        Ligar(rede, 0, 2, 1);
        Ligar(rede, 2, 1, 2);
        Ligar(rede, 1, 3, 5);
        Ligar(rede, 2, 3, 8);
        Ligar(rede, 3, 4, 3);
        Ligar(rede, 4, 5, 1);
        Ligar(rede, 6, 7, 2);

        var (custo, anterior) = MenoresCustos(rede, 0);

        for (int v = 0; v < rede.Length; v++)
        {
            Console.WriteLine($"custo {v}: {Descrever(custo[v])}");
        }

        Console.WriteLine($"rota ate 5: {string.Join(" -> ", Rota(anterior, custo, 5))}");
        Console.WriteLine($"rota ate 7: {(Rota(anterior, custo, 7).Count == 0 ? "sem rota" : "ok")}");

        int[] saltos = SaltosMinimos(rede, 0);
        Console.WriteLine($"saltos: {string.Join(",", saltos)}");
        Console.WriteLine($"ate 1 custo {custo[1]} em {saltos[1]} saltos");
        Console.WriteLine($"inalcancaveis: {Inalcancaveis(custo)}");
        Console.WriteLine($"mais caro: {MaisCaro(custo)} por {custo[MaisCaro(custo)]}");

        int n = 200000;
        var grande = CriarRede(n);

        for (int i = 0; i + 1 < n; i++)
        {
            Ligar(grande, i, i + 1, 1 + i % 9);
        }

        for (int i = 0; i + 100 < n; i += 100)
        {
            Ligar(grande, i, i + 100, 50);
        }

        var (cg, ag) = MenoresCustos(grande, 0);
        long somaGrande = 0;

        foreach (long x in cg)
        {
            somaGrande += x;
        }

        Console.WriteLine($"grande custo final: {cg[n - 1]}");
        Console.WriteLine($"grande soma: {somaGrande}");
        Console.WriteLine($"grande rota tamanho: {Rota(ag, cg, n - 1).Count}");
        Console.WriteLine($"grande inalcancaveis: {Inalcancaveis(cg)}");
    }
}`,
      hints: [
        '`fila.TryDequeue(out int atual, out long custoAtual)` devolve o elemento e a prioridade de uma vez, e já serve como condição do `while`.',
        'Nunca reduza `custo[v]` sem enfileirar `v` de novo: a fila precisa saber que aquele vértice ficou mais barato.',
        'Some sempre a partir de `custoAtual`, não de `custo[atual]` — são iguais quando a entrada é válida, e usar a variável local deixa claro que a entrada obsoleta já foi descartada.',
        'A soma dos custos em 200.000 hubs passa de 10 bilhões: `int` não comporta.',
      ],
      tests: [
        {
          name: 'Malha de entregas',
          expectedStdout:
            'custo 0: 0\ncusto 1: 3\ncusto 2: 1\ncusto 3: 8\ncusto 4: 11\ncusto 5: 12\n' +
            'custo 6: inalcancavel\ncusto 7: inalcancavel\n' +
            'rota ate 5: 0 -> 2 -> 1 -> 3 -> 4 -> 5\nrota ate 7: sem rota\n' +
            'saltos: 0,1,1,2,3,4,-1,-1\nate 1 custo 3 em 1 saltos\n' +
            'inalcancaveis: 2\nmais caro: 5 por 12\n' +
            'grande custo final: 100445\ngrande soma: 10024707172\n' +
            'grande rota tamanho: 2099\ngrande inalcancaveis: 0',
        },
      ],
      timeoutMs: 15000,
    },
  },
]
