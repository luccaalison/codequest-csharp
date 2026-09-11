import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's07c03l01',
    title: 'Bubble sort',
    objective: 'Entender o algoritmo de ordenação mais simples e por que ele quase nunca é usado.',
    concept: [
      {
        kind: 'text',
        body:
          'O **bubble sort** compara elementos vizinhos e troca os que estão fora de ordem. A cada passagem, o maior elemento restante "flutua" até a sua posição final.',
      },
      {
        kind: 'code',
        code: `for (int i = 0; i < n - 1; i++)
{
    for (int j = 0; j < n - 1 - i; j++)
    {
        if (dados[j] > dados[j + 1])
        {
            Trocar(dados, j, j + 1);
        }
    }
}`,
        caption: 'O `- i` no limite interno é o que evita reprocessar a parte já ordenada no fim.',
      },
      {
        kind: 'output',
        code: `[5, 2, 9, 1]
passagem 1: [2, 5, 1, 9]   <- 9 chegou ao fim
passagem 2: [2, 1, 5, 9]   <- 5 chegou
passagem 3: [1, 2, 5, 9]   <- pronto`,
      },
      {
        kind: 'table',
        headers: ['Aspecto', 'Valor'],
        rows: [
          ['tempo, pior caso', '`O(n²)`'],
          ['tempo, melhor caso', '`O(n)` com otimização'],
          ['espaço', '`O(1)`'],
          ['estável', '**sim**'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A otimização que salva o melhor caso: se uma passagem inteira não fizer nenhuma troca, os dados já estão ordenados e dá para parar. Isso torna o bubble sort `O(n)` em entrada já ordenada — a única situação em que ele é competitivo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Na prática o bubble sort quase nunca é a escolha certa. Ele existe no currículo por ser fácil de entender e por deixar visível o que ordenar significa — não por ser útil.',
      },
    ],
    quiz: [
      {
        id: 's07c03l01q1',
        type: 'single',
        prompt: 'O que acontece a cada passagem do bubble sort?',
        options: [
          { id: 'a', text: 'O maior elemento restante chega à sua posição final.', correct: true },
          { id: 'b', text: 'O menor elemento vai para o início.' },
          { id: 'c', text: 'O array é dividido ao meio.' },
          { id: 'd', text: 'Um elemento é escolhido como pivô.' },
        ],
        explanation:
          'É por isso que o limite do laço interno pode encolher: o fim do array já está definitivamente ordenado.',
      },
      {
        id: 's07c03l01q2',
        type: 'single',
        prompt: 'Qual otimização torna o melhor caso `O(n)`?',
        options: [
          { id: 'a', text: 'Parar quando uma passagem não fizer nenhuma troca.', correct: true },
          { id: 'b', text: 'Reduzir o limite do laço interno.' },
          { id: 'c', text: 'Começar pelo fim do array.' },
          { id: 'd', text: 'Usar recursão.' },
        ],
        explanation:
          'Sem trocas, o array já está ordenado. Uma única passagem confirma isso e o algoritmo pode encerrar.',
      },
      {
        id: 's07c03l01q3',
        type: 'single',
        prompt: 'Por que o bubble sort continua no currículo?',
        options: [
          { id: 'a', text: 'Por ser fácil de entender e deixar visível o que ordenar significa.', correct: true },
          { id: 'b', text: 'Por ser o mais rápido em arrays pequenos.' },
          { id: 'c', text: 'Por ser usado nas bibliotecas padrão.' },
          { id: 'd', text: 'Por usar menos memória que os outros.' },
        ],
        explanation:
          'É um algoritmo didático. Na prática ele é superado por praticamente qualquer alternativa.',
      },
    ],
    challenge: {
      brief:
        'Implemente as duas versões do bubble sort e compare o custo de cada uma nos três cenários de entrada.',
      requirements: [
        'Complexidade esperada: `O(n²)` no pior caso, `O(1)` de espaço',
        '`BubbleSimples(int[] dados)` faz todas as passagens sempre',
        '`BubbleOtimizado(int[] dados)` para quando uma passagem não faz nenhuma troca',
        'Os dois contam comparações em `comparacoes` e trocas em `trocas`',
        'Os dois ordenam no lugar, sem alocar arrays novos',
        '`Medir(string nome, Action<int[]> ordenar, int[] original)` clona, zera os contadores, ordena e imprime `nome: C comparacoes, T trocas`',
        'O `Main` testa entrada ordenada, invertida e embaralhada',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int comparacoes = 0;
    static int trocas = 0;

    // Escreva BubbleSimples, BubbleOtimizado e Medir aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] ordenado = new int[n];
        int[] invertido = new int[n];
        int[] embaralhado = new int[n];

        for (int i = 0; i < n; i++)
        {
            ordenado[i] = i;
            invertido[i] = n - 1 - i;
            embaralhado[i] = (i * 7 + 3) % n;
        }

        Console.WriteLine("--- ja ordenado ---");
        Medir("simples", BubbleSimples, ordenado);
        Medir("otimizado", BubbleOtimizado, ordenado);

        Console.WriteLine("--- invertido ---");
        Medir("simples", BubbleSimples, invertido);
        Medir("otimizado", BubbleOtimizado, invertido);

        Console.WriteLine("--- embaralhado ---");
        Medir("simples", BubbleSimples, embaralhado);
        Medir("otimizado", BubbleOtimizado, embaralhado);

        int[] conferencia = (int[])embaralhado.Clone();
        BubbleOtimizado(conferencia);
        Console.WriteLine($"resultado: {string.Join(",", conferencia)}");
    }
}
`,
      solution: `using System;

class Program
{
    static int comparacoes = 0;
    static int trocas = 0;

    static void Trocar(int[] dados, int a, int b)
    {
        int temporario = dados[a];
        dados[a] = dados[b];
        dados[b] = temporario;
        trocas++;
    }

    static void BubbleSimples(int[] dados)
    {
        for (int i = 0; i < dados.Length - 1; i++)
        {
            for (int j = 0; j < dados.Length - 1 - i; j++)
            {
                comparacoes++;

                if (dados[j] > dados[j + 1])
                {
                    Trocar(dados, j, j + 1);
                }
            }
        }
    }

    static void BubbleOtimizado(int[] dados)
    {
        for (int i = 0; i < dados.Length - 1; i++)
        {
            bool houveTroca = false;

            for (int j = 0; j < dados.Length - 1 - i; j++)
            {
                comparacoes++;

                if (dados[j] > dados[j + 1])
                {
                    Trocar(dados, j, j + 1);
                    houveTroca = true;
                }
            }

            if (!houveTroca)
            {
                return;
            }
        }
    }

    static void Medir(string nome, Action<int[]> ordenar, int[] original)
    {
        int[] copia = (int[])original.Clone();

        comparacoes = 0;
        trocas = 0;

        ordenar(copia);

        Console.WriteLine($"{nome}: {comparacoes} comparacoes, {trocas} trocas");
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] ordenado = new int[n];
        int[] invertido = new int[n];
        int[] embaralhado = new int[n];

        for (int i = 0; i < n; i++)
        {
            ordenado[i] = i;
            invertido[i] = n - 1 - i;
            embaralhado[i] = (i * 7 + 3) % n;
        }

        Console.WriteLine("--- ja ordenado ---");
        Medir("simples", BubbleSimples, ordenado);
        Medir("otimizado", BubbleOtimizado, ordenado);

        Console.WriteLine("--- invertido ---");
        Medir("simples", BubbleSimples, invertido);
        Medir("otimizado", BubbleOtimizado, invertido);

        Console.WriteLine("--- embaralhado ---");
        Medir("simples", BubbleSimples, embaralhado);
        Medir("otimizado", BubbleOtimizado, embaralhado);

        int[] conferencia = (int[])embaralhado.Clone();
        BubbleOtimizado(conferencia);
        Console.WriteLine($"resultado: {string.Join(",", conferencia)}");
    }
}
`,
      hints: [
        'O `Medir` clona o array antes de ordenar, para que cada medição comece do mesmo estado.',
        'A otimização precisa de uma variável por passagem, zerada no início de cada volta externa.',
        'Com entrada já ordenada, o otimizado faz uma passagem só — `n - 1` comparações e nenhuma troca.',
      ],
      tests: [
        {
          name: 'Dez elementos',
          stdin: '10\n',
          expectedStdout:
            '--- ja ordenado ---\nsimples: 45 comparacoes, 0 trocas\notimizado: 9 comparacoes, 0 trocas\n' +
            '--- invertido ---\nsimples: 45 comparacoes, 45 trocas\notimizado: 45 comparacoes, 45 trocas\n' +
            '--- embaralhado ---\nsimples: 45 comparacoes, 15 trocas\notimizado: 39 comparacoes, 15 trocas\n' +
            'resultado: 0,1,2,3,4,5,6,7,8,9',
        },
        {
          name: 'Seis elementos',
          stdin: '6\n',
          expectedStdout:
            '--- ja ordenado ---\nsimples: 15 comparacoes, 0 trocas\notimizado: 5 comparacoes, 0 trocas\n' +
            '--- invertido ---\nsimples: 15 comparacoes, 15 trocas\notimizado: 15 comparacoes, 15 trocas\n' +
            '--- embaralhado ---\nsimples: 15 comparacoes, 9 trocas\notimizado: 14 comparacoes, 9 trocas\n' +
            'resultado: 0,1,2,3,4,5',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's07c03l02',
    title: 'Selection sort',
    objective: 'Ordenar minimizando o número de trocas, mesmo mantendo o custo quadrático em comparações.',
    concept: [
      {
        kind: 'text',
        body:
          'O **selection sort** procura o menor elemento restante e o coloca na posição certa. A cada volta, uma posição fica definitivamente resolvida.',
      },
      {
        kind: 'code',
        code: `for (int i = 0; i < n - 1; i++)
{
    int menor = i;

    for (int j = i + 1; j < n; j++)
    {
        if (dados[j] < dados[menor]) menor = j;
    }

    if (menor != i) Trocar(dados, i, menor);
}`,
        caption: 'Uma única troca por volta, no máximo.',
      },
      {
        kind: 'table',
        headers: ['', 'Bubble', 'Selection'],
        rows: [
          ['comparações', '`O(n²)`', '`O(n²)`'],
          ['trocas, pior caso', '`O(n²)`', '**`O(n)`**'],
          ['melhor caso', '`O(n)` otimizado', '`O(n²)` sempre'],
          ['estável', 'sim', '**não**'],
        ],
      },
      {
        kind: 'text',
        body:
          'A vantagem do selection sort é fazer no máximo `n - 1` trocas. Quando mover um elemento é caro — registros grandes, escrita em disco, memória flash —, isso importa mais que o número de comparações.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O selection sort não tem melhor caso: mesmo com o array já ordenado, ele faz todas as comparações. É previsível e insensível à entrada, o que às vezes é uma virtude.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Ele **não é estável**: a troca com um elemento distante pode inverter a ordem relativa de valores iguais. Isso o desqualifica quando a ordem anterior carrega informação — assunto de uma lição adiante.',
      },
    ],
    quiz: [
      {
        id: 's07c03l02q1',
        type: 'single',
        prompt: 'Quantas trocas o selection sort faz no pior caso?',
        options: [
          { id: 'a', code: 'O(n)', correct: true },
          { id: 'b', code: 'O(n²)' },
          { id: 'c', code: 'O(log n)' },
          { id: 'd', code: 'O(1)' },
        ],
        explanation:
          'Uma troca por volta, no máximo, e são `n - 1` voltas. É a sua principal vantagem sobre o bubble sort.',
      },
      {
        id: 's07c03l02q2',
        type: 'single',
        prompt: 'Quando o baixo número de trocas importa mais que as comparações?',
        options: [
          { id: 'a', text: 'Quando mover um elemento é caro, como registros grandes ou escrita em disco.', correct: true },
          { id: 'b', text: 'Quando o array é pequeno.' },
          { id: 'c', text: 'Quando os dados já estão ordenados.' },
          { id: 'd', text: 'Nunca importa.' },
        ],
        explanation:
          'Comparar é barato quando os dados estão na memória; escrever pode ser ordens de grandeza mais caro.',
      },
      {
        id: 's07c03l02q3',
        type: 'single',
        prompt: 'Por que o selection sort não é estável?',
        options: [
          { id: 'a', text: 'Porque a troca com um elemento distante pode inverter a ordem de valores iguais.', correct: true },
          { id: 'b', text: 'Porque ele compara vizinhos.' },
          { id: 'c', text: 'Porque usa recursão.' },
          { id: 'd', text: 'Ele é estável.' },
        ],
        explanation:
          'O elemento trocado para longe passa por cima de valores iguais que estavam antes dele.',
      },
    ],
    challenge: {
      brief:
        'Implemente o selection sort e comprove, contando, que ele faz muito menos trocas que o bubble sort.',
      requirements: [
        'Complexidade esperada: `O(n²)` comparações, `O(n)` trocas, `O(1)` de espaço',
        '`SelectionSort(int[] dados)` ordena no lugar procurando o menor restante',
        '`BubbleSort(int[] dados)` ordena no lugar trocando vizinhos, para comparação',
        'Os dois contam comparações e trocas',
        'O selection só troca quando o menor encontrado não é a própria posição',
        '`Medir(string nome, Action<int[]> ordenar, int[] original)` clona, zera, ordena e relata',
        'O `Main` mostra também que o selection sort não tem melhor caso',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int comparacoes = 0;
    static int trocas = 0;

    // Escreva SelectionSort, BubbleSort e Medir aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] invertido = new int[n];
        int[] ordenado = new int[n];

        for (int i = 0; i < n; i++)
        {
            invertido[i] = n - 1 - i;
            ordenado[i] = i;
        }

        Console.WriteLine("--- invertido ---");
        Medir("selection", SelectionSort, invertido);
        Medir("bubble", BubbleSort, invertido);

        Console.WriteLine("--- ja ordenado ---");
        Medir("selection", SelectionSort, ordenado);
        Medir("bubble", BubbleSort, ordenado);

        int[] conferencia = (int[])invertido.Clone();
        SelectionSort(conferencia);
        Console.WriteLine($"resultado: {string.Join(",", conferencia)}");
    }
}
`,
      solution: `using System;

class Program
{
    static int comparacoes = 0;
    static int trocas = 0;

    static void Trocar(int[] dados, int a, int b)
    {
        int temporario = dados[a];
        dados[a] = dados[b];
        dados[b] = temporario;
        trocas++;
    }

    static void SelectionSort(int[] dados)
    {
        for (int i = 0; i < dados.Length - 1; i++)
        {
            int menor = i;

            for (int j = i + 1; j < dados.Length; j++)
            {
                comparacoes++;

                if (dados[j] < dados[menor])
                {
                    menor = j;
                }
            }

            if (menor != i)
            {
                Trocar(dados, i, menor);
            }
        }
    }

    static void BubbleSort(int[] dados)
    {
        for (int i = 0; i < dados.Length - 1; i++)
        {
            for (int j = 0; j < dados.Length - 1 - i; j++)
            {
                comparacoes++;

                if (dados[j] > dados[j + 1])
                {
                    Trocar(dados, j, j + 1);
                }
            }
        }
    }

    static void Medir(string nome, Action<int[]> ordenar, int[] original)
    {
        int[] copia = (int[])original.Clone();

        comparacoes = 0;
        trocas = 0;

        ordenar(copia);

        Console.WriteLine($"{nome}: {comparacoes} comparacoes, {trocas} trocas");
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] invertido = new int[n];
        int[] ordenado = new int[n];

        for (int i = 0; i < n; i++)
        {
            invertido[i] = n - 1 - i;
            ordenado[i] = i;
        }

        Console.WriteLine("--- invertido ---");
        Medir("selection", SelectionSort, invertido);
        Medir("bubble", BubbleSort, invertido);

        Console.WriteLine("--- ja ordenado ---");
        Medir("selection", SelectionSort, ordenado);
        Medir("bubble", BubbleSort, ordenado);

        int[] conferencia = (int[])invertido.Clone();
        SelectionSort(conferencia);
        Console.WriteLine($"resultado: {string.Join(",", conferencia)}");
    }
}
`,
      hints: [
        'O selection guarda o **índice** do menor, não o valor — é o índice que a troca precisa.',
        'A verificação `menor != i` evita trocar um elemento com ele mesmo, o que contaria uma troca inútil.',
        'Com o array já ordenado, o selection faz todas as comparações e zero trocas.',
      ],
      tests: [
        {
          name: 'Dez elementos',
          stdin: '10\n',
          expectedStdout:
            '--- invertido ---\nselection: 45 comparacoes, 5 trocas\nbubble: 45 comparacoes, 45 trocas\n' +
            '--- ja ordenado ---\nselection: 45 comparacoes, 0 trocas\nbubble: 45 comparacoes, 0 trocas\n' +
            'resultado: 0,1,2,3,4,5,6,7,8,9',
        },
        {
          name: 'Sete elementos',
          stdin: '7\n',
          expectedStdout:
            '--- invertido ---\nselection: 21 comparacoes, 3 trocas\nbubble: 21 comparacoes, 21 trocas\n' +
            '--- ja ordenado ---\nselection: 21 comparacoes, 0 trocas\nbubble: 21 comparacoes, 0 trocas\n' +
            'resultado: 0,1,2,3,4,5,6',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's07c03l03',
    title: 'Insertion sort',
    objective: 'Ordenar inserindo cada elemento na posição certa, e entender por que ele vence em dados quase ordenados.',
    concept: [
      {
        kind: 'text',
        body:
          'O **insertion sort** funciona como ordenar cartas na mão: pega o próximo elemento e o desloca para trás até encontrar o lugar dele entre os já ordenados.',
      },
      {
        kind: 'code',
        code: `for (int i = 1; i < n; i++)
{
    int atual = dados[i];
    int j = i - 1;

    while (j >= 0 && dados[j] > atual)
    {
        dados[j + 1] = dados[j];    // desloca
        j--;
    }

    dados[j + 1] = atual;           // insere
}`,
        caption: 'Deslocar é mais barato que trocar: uma escrita por posição em vez de três.',
      },
      {
        kind: 'table',
        headers: ['Cenário', 'Custo'],
        rows: [
          ['já ordenado', '**`O(n)`**'],
          ['quase ordenado', '**quase `O(n)`**'],
          ['embaralhado', '`O(n²)`'],
          ['invertido', '`O(n²)`, o pior caso'],
        ],
      },
      {
        kind: 'text',
        body:
          'A primeira linha é o que torna o insertion sort especial: em dados **quase ordenados**, ele é praticamente linear. Cada elemento se desloca poucas posições, e o laço interno quase não roda.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'É por isso que bibliotecas reais usam insertion sort para partições pequenas dentro de algoritmos maiores. Abaixo de umas dezenas de elementos, a simplicidade dele vence a sobrecarga de dividir e conquistar.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A condição do laço interno precisa ser `dados[j] > atual`, com o `>` estrito. Usar `>=` faria elementos iguais se deslocarem uns sobre os outros, destruindo a estabilidade sem nenhum ganho.',
      },
    ],
    quiz: [
      {
        id: 's07c03l03q1',
        type: 'single',
        prompt: 'Qual é o custo do insertion sort em dados já ordenados?',
        options: [
          { id: 'a', code: 'O(n)', correct: true },
          { id: 'b', code: 'O(n²)' },
          { id: 'c', code: 'O(n log n)' },
          { id: 'd', code: 'O(log n)' },
        ],
        explanation:
          'O laço interno não executa nenhuma vez, porque cada elemento já está maior que o anterior.',
      },
      {
        id: 's07c03l03q2',
        type: 'single',
        prompt: 'Por que bibliotecas usam insertion sort para partições pequenas?',
        options: [
          { id: 'a', text: 'Porque abaixo de algumas dezenas ele vence a sobrecarga de dividir e conquistar.', correct: true },
          { id: 'b', text: 'Porque ele é estável.' },
          { id: 'c', text: 'Porque ele usa menos memória.' },
          { id: 'd', text: 'Porque ele é recursivo.' },
        ],
        explanation:
          'A constante do insertion é muito baixa. É a otimização de "trocar de algoritmo abaixo de certo tamanho" na prática.',
      },
      {
        id: 's07c03l03q3',
        type: 'single',
        prompt: 'Por que a condição usa `>` e não `>=`?',
        options: [
          { id: 'a', text: 'Para preservar a estabilidade, sem deslocar elementos iguais.', correct: true },
          { id: 'b', text: 'Para evitar índice negativo.' },
          { id: 'c', text: 'Para ser mais rápido.' },
          { id: 'd', text: 'É indiferente.' },
        ],
        explanation:
          'Com `>=`, um elemento passaria por cima de um igual, invertendo a ordem relativa original.',
      },
    ],
    challenge: {
      brief:
        'Implemente o insertion sort e comprove que ele é praticamente linear em dados quase ordenados.',
      requirements: [
        'Complexidade esperada: `O(n²)` no pior caso, `O(n)` no melhor, `O(1)` de espaço',
        '`InsertionSort(int[] dados)` ordena no lugar deslocando elementos',
        '`comparacoes` conta cada teste da condição do laço interno',
        '`deslocamentos` conta cada escrita de deslocamento',
        'A condição usa `>` estrito, preservando a estabilidade',
        '`Medir(string nome, int[] original)` clona, zera, ordena e imprime `nome: C comparacoes, D deslocamentos`',
        'O `Main` compara entrada ordenada, quase ordenada, embaralhada e invertida',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int comparacoes = 0;
    static int deslocamentos = 0;

    // Escreva InsertionSort e Medir aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] ordenado = new int[n];
        int[] quaseOrdenado = new int[n];
        int[] embaralhado = new int[n];
        int[] invertido = new int[n];

        for (int i = 0; i < n; i++)
        {
            ordenado[i] = i;
            quaseOrdenado[i] = i;
            embaralhado[i] = (i * 7 + 3) % n;
            invertido[i] = n - 1 - i;
        }

        // troca so os dois ultimos: quase ordenado
        int guardado = quaseOrdenado[n - 1];
        quaseOrdenado[n - 1] = quaseOrdenado[n - 2];
        quaseOrdenado[n - 2] = guardado;

        Medir("ordenado", ordenado);
        Medir("quase ordenado", quaseOrdenado);
        Medir("embaralhado", embaralhado);
        Medir("invertido", invertido);

        int[] conferencia = (int[])embaralhado.Clone();
        InsertionSort(conferencia);
        Console.WriteLine($"resultado: {string.Join(",", conferencia)}");
    }
}
`,
      solution: `using System;

class Program
{
    static int comparacoes = 0;
    static int deslocamentos = 0;

    static void InsertionSort(int[] dados)
    {
        for (int i = 1; i < dados.Length; i++)
        {
            int atual = dados[i];
            int j = i - 1;

            while (true)
            {
                if (j < 0)
                {
                    break;
                }

                comparacoes++;

                if (dados[j] <= atual)
                {
                    break;
                }

                dados[j + 1] = dados[j];
                deslocamentos++;
                j--;
            }

            dados[j + 1] = atual;
        }
    }

    static void Medir(string nome, int[] original)
    {
        int[] copia = (int[])original.Clone();

        comparacoes = 0;
        deslocamentos = 0;

        InsertionSort(copia);

        Console.WriteLine($"{nome}: {comparacoes} comparacoes, {deslocamentos} deslocamentos");
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] ordenado = new int[n];
        int[] quaseOrdenado = new int[n];
        int[] embaralhado = new int[n];
        int[] invertido = new int[n];

        for (int i = 0; i < n; i++)
        {
            ordenado[i] = i;
            quaseOrdenado[i] = i;
            embaralhado[i] = (i * 7 + 3) % n;
            invertido[i] = n - 1 - i;
        }

        int guardado = quaseOrdenado[n - 1];
        quaseOrdenado[n - 1] = quaseOrdenado[n - 2];
        quaseOrdenado[n - 2] = guardado;

        Medir("ordenado", ordenado);
        Medir("quase ordenado", quaseOrdenado);
        Medir("embaralhado", embaralhado);
        Medir("invertido", invertido);

        int[] conferencia = (int[])embaralhado.Clone();
        InsertionSort(conferencia);
        Console.WriteLine($"resultado: {string.Join(",", conferencia)}");
    }
}
`,
      hints: [
        'Separe o teste `j < 0` da comparação de valores, para que só a segunda conte como comparação.',
        'O `while (true)` com duas saídas deixa explícito qual condição é contada.',
        'Com o array já ordenado, cada volta faz exatamente uma comparação e nenhum deslocamento.',
      ],
      tests: [
        {
          name: 'Dez elementos',
          stdin: '10\n',
          expectedStdout:
            'ordenado: 9 comparacoes, 0 deslocamentos\n' +
            'quase ordenado: 10 comparacoes, 1 deslocamentos\n' +
            'embaralhado: 23 comparacoes, 15 deslocamentos\n' +
            'invertido: 45 comparacoes, 45 deslocamentos\n' +
            'resultado: 0,1,2,3,4,5,6,7,8,9',
        },
        {
          name: 'Oito elementos',
          stdin: '8\n',
          expectedStdout:
            'ordenado: 7 comparacoes, 0 deslocamentos\n' +
            'quase ordenado: 8 comparacoes, 1 deslocamentos\n' +
            'embaralhado: 16 comparacoes, 12 deslocamentos\n' +
            'invertido: 28 comparacoes, 28 deslocamentos\n' +
            'resultado: 0,1,2,3,4,5,6,7',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's07c03l04',
    title: 'Merge sort',
    objective: 'Ordenar em `O(n log n)` dividindo, ordenando as metades e intercalando.',
    concept: [
      {
        kind: 'text',
        body:
          'O **merge sort** aplica dividir e conquistar: parte o array ao meio, ordena cada metade recursivamente, e depois **intercala** as duas metades ordenadas em uma só.',
      },
      {
        kind: 'code',
        code: `static void Ordenar(int[] dados, int inicio, int fim)
{
    if (inicio >= fim) return;          // um elemento ja esta ordenado

    int meio = inicio + (fim - inicio) / 2;

    Ordenar(dados, inicio, meio);
    Ordenar(dados, meio + 1, fim);
    Intercalar(dados, inicio, meio, fim);
}`,
      },
      {
        kind: 'text',
        body:
          'A intercalação é a parte que faz o trabalho: com duas metades já ordenadas, basta comparar os primeiros elementos de cada uma e ir tomando o menor. Cada elemento é examinado uma vez por nível.',
      },
      {
        kind: 'output',
        code: `        [5, 2, 9, 1]
       /            \\
   [5, 2]          [9, 1]
   /    \\          /    \\
 [5]    [2]      [9]    [1]
   \\    /          \\    /
   [2, 5]          [1, 9]
       \\            /
        [1, 2, 5, 9]`,
        caption: 'São `log n` níveis, e cada nível custa `O(n)` — daí o `O(n log n)`.',
      },
      {
        kind: 'table',
        headers: ['Aspecto', 'Valor'],
        rows: [
          ['tempo', '`O(n log n)` **sempre**'],
          ['espaço', '`O(n)` — precisa de array auxiliar'],
          ['estável', '**sim**'],
          ['profundidade da recursão', '`O(log n)`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O merge sort é `O(n log n)` no melhor, no médio e no pior caso — não existe entrada que o degrade. Essa previsibilidade é o que o torna a escolha padrão quando o pior caso importa.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O preço é a memória: a intercalação precisa de espaço auxiliar `O(n)`. Existem versões no lugar, mas são bem mais complicadas e mais lentas na prática.',
      },
    ],
    quiz: [
      {
        id: 's07c03l04q1',
        type: 'single',
        prompt: 'Por que o merge sort é `O(n log n)`?',
        options: [
          { id: 'a', text: 'São `log n` níveis de divisão, e cada nível custa `O(n)` para intercalar.', correct: true },
          { id: 'b', text: 'Porque usa recursão.' },
          { id: 'c', text: 'Porque divide ao meio.' },
          { id: 'd', text: 'Porque compara vizinhos.' },
        ],
        explanation:
          'A altura da árvore vezes o trabalho por nível dá a complexidade total.',
      },
      {
        id: 's07c03l04q2',
        type: 'single',
        prompt: 'Qual é o preço do merge sort?',
        options: [
          { id: 'a', text: 'Espaço auxiliar `O(n)` para a intercalação.', correct: true },
          { id: 'b', text: 'Ser instável.' },
          { id: 'c', text: 'Ter pior caso `O(n²)`.' },
          { id: 'd', text: 'Não funcionar com repetições.' },
        ],
        explanation:
          'Versões no lugar existem, mas são consideravelmente mais complexas e mais lentas na prática.',
      },
      {
        id: 's07c03l04q3',
        type: 'single',
        prompt: 'O que torna o merge sort previsível?',
        options: [
          { id: 'a', text: 'Ele é `O(n log n)` no melhor, no médio e no pior caso.', correct: true },
          { id: 'b', text: 'Ele nunca faz trocas.' },
          { id: 'c', text: 'Ele não usa comparações.' },
          { id: 'd', text: 'Ele detecta entradas ordenadas.' },
        ],
        explanation:
          'Nenhuma entrada o degrada, ao contrário do quick sort. É por isso que ele é a escolha quando o pior caso importa.',
      },
    ],
    challenge: {
      brief:
        'Implemente o merge sort e prove, em 50.000 elementos, que ele termina onde um algoritmo quadrático não terminaria.',
      requirements: [
        'Complexidade esperada: `O(n log n)` de tempo, `O(n)` de espaço',
        '`MergeSort(int[] dados)` ordena o array inteiro',
        '`Ordenar(int[] dados, int[] auxiliar, int inicio, int fim)` é a parte recursiva',
        '`Intercalar(int[] dados, int[] auxiliar, int inicio, int meio, int fim)` funde duas metades ordenadas',
        'A intercalação preserva a estabilidade usando `<=` ao escolher da metade esquerda',
        'O array auxiliar é alocado **uma vez só**, não a cada chamada',
        'O `Main` ordena 50.000 elementos embaralhados — um algoritmo `O(n²)` não terminaria a tempo',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva MergeSort, Ordenar e Intercalar aqui

    static void Main()
    {
        int[] pequeno = { 5, 2, 9, 1, 7, 3 };
        MergeSort(pequeno);
        Console.WriteLine($"pequeno: {string.Join(",", pequeno)}");

        int[] vazio = new int[0];
        MergeSort(vazio);
        Console.WriteLine($"vazio: [{string.Join(",", vazio)}]");

        int[] um = { 42 };
        MergeSort(um);
        Console.WriteLine($"um: {string.Join(",", um)}");

        int[] repetidos = { 3, 1, 3, 1, 3 };
        MergeSort(repetidos);
        Console.WriteLine($"repetidos: {string.Join(",", repetidos)}");

        // escala real: 50.000 elementos
        int n = 50_000;
        int[] grande = new int[n];
        for (int i = 0; i < n; i++) grande[i] = (i * 31 + 17) % n;

        MergeSort(grande);

        bool ordenado = true;
        long soma = 0;

        for (int i = 0; i < n; i++)
        {
            soma += grande[i];
            if (i > 0 && grande[i - 1] > grande[i]) ordenado = false;
        }

        Console.WriteLine($"grande ordenado: {ordenado}");
        Console.WriteLine($"primeiro: {grande[0]} ultimo: {grande[n - 1]}");
        Console.WriteLine($"soma: {soma}");
    }
}
`,
      solution: `using System;

class Program
{
    static void MergeSort(int[] dados)
    {
        if (dados.Length <= 1)
        {
            return;
        }

        int[] auxiliar = new int[dados.Length];
        Ordenar(dados, auxiliar, 0, dados.Length - 1);
    }

    static void Ordenar(int[] dados, int[] auxiliar, int inicio, int fim)
    {
        if (inicio >= fim)
        {
            return;
        }

        int meio = inicio + (fim - inicio) / 2;

        Ordenar(dados, auxiliar, inicio, meio);
        Ordenar(dados, auxiliar, meio + 1, fim);
        Intercalar(dados, auxiliar, inicio, meio, fim);
    }

    static void Intercalar(int[] dados, int[] auxiliar, int inicio, int meio, int fim)
    {
        for (int i = inicio; i <= fim; i++)
        {
            auxiliar[i] = dados[i];
        }

        int esquerda = inicio;
        int direita = meio + 1;
        int destino = inicio;

        while (esquerda <= meio && direita <= fim)
        {
            if (auxiliar[esquerda] <= auxiliar[direita])
            {
                dados[destino] = auxiliar[esquerda];
                esquerda++;
            }
            else
            {
                dados[destino] = auxiliar[direita];
                direita++;
            }

            destino++;
        }

        while (esquerda <= meio)
        {
            dados[destino] = auxiliar[esquerda];
            esquerda++;
            destino++;
        }

        while (direita <= fim)
        {
            dados[destino] = auxiliar[direita];
            direita++;
            destino++;
        }
    }

    static void Main()
    {
        int[] pequeno = { 5, 2, 9, 1, 7, 3 };
        MergeSort(pequeno);
        Console.WriteLine($"pequeno: {string.Join(",", pequeno)}");

        int[] vazio = new int[0];
        MergeSort(vazio);
        Console.WriteLine($"vazio: [{string.Join(",", vazio)}]");

        int[] um = { 42 };
        MergeSort(um);
        Console.WriteLine($"um: {string.Join(",", um)}");

        int[] repetidos = { 3, 1, 3, 1, 3 };
        MergeSort(repetidos);
        Console.WriteLine($"repetidos: {string.Join(",", repetidos)}");

        int n = 50_000;
        int[] grande = new int[n];
        for (int i = 0; i < n; i++) grande[i] = (i * 31 + 17) % n;

        MergeSort(grande);

        bool ordenado = true;
        long soma = 0;

        for (int i = 0; i < n; i++)
        {
            soma += grande[i];
            if (i > 0 && grande[i - 1] > grande[i]) ordenado = false;
        }

        Console.WriteLine($"grande ordenado: {ordenado}");
        Console.WriteLine($"primeiro: {grande[0]} ultimo: {grande[n - 1]}");
        Console.WriteLine($"soma: {soma}");
      }
}
`,
      hints: [
        'A intercalação copia a faixa para o auxiliar e depois escreve de volta no array original, na ordem certa.',
        'Os dois `while` finais esvaziam a metade que sobrou — apenas uma delas terá elementos restantes.',
        'Alocar o auxiliar dentro de `Intercalar` funcionaria, mas alocaria `O(n log n)` vezes; aloque uma vez em `MergeSort`.',
      ],
      tests: [
        {
          name: 'Pequenos e escala real',
          stdin: '',
          expectedStdout:
            'pequeno: 1,2,3,5,7,9\nvazio: []\num: 42\nrepetidos: 1,1,3,3,3\n' +
            'grande ordenado: True\nprimeiro: 0 ultimo: 49999\nsoma: 1249975000',
        },
      ],
    },
  },
  {
    id: 's07c03l05',
    title: 'Quick sort',
    objective: 'Ordenar particionando em torno de um pivô, e entender por que a escolha do pivô decide tudo.',
    concept: [
      {
        kind: 'text',
        body:
          'O **quick sort** escolhe um elemento como **pivô**, reorganiza o array de modo que os menores fiquem à esquerda e os maiores à direita, e repete recursivamente em cada lado.',
      },
      {
        kind: 'code',
        code: `static void Ordenar(int[] dados, int inicio, int fim)
{
    if (inicio >= fim) return;

    int p = Particionar(dados, inicio, fim);

    Ordenar(dados, inicio, p - 1);
    Ordenar(dados, p + 1, fim);
}`,
        caption: 'Depois de particionar, o pivô já está na posição final — ele não entra nas chamadas seguintes.',
      },
      {
        kind: 'table',
        headers: ['Caso', 'Partição', 'Complexidade'],
        rows: [
          ['pivô sempre no meio', 'duas metades', '`O(n log n)`'],
          ['pivô aleatório', 'equilibrada em média', '`O(n log n)` esperado'],
          ['**pivô sempre no extremo**', 'uma parte vazia', '**`O(n²)`**'],
        ],
      },
      {
        kind: 'text',
        body:
          'A última linha é a armadilha clássica: usar o **último elemento** como pivô em um array **já ordenado** produz o pior caso. Cada partição separa um único elemento, a recursão fica com profundidade `n`, e o algoritmo degrada.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Nesse cenário a profundidade da recursão também vira `n` — e com dezenas de milhares de elementos isso **estoura a pilha** antes mesmo de o tempo acabar. O sintoma é um encerramento abrupto, não uma demora.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A defesa padrão é a **mediana de três**: comparar o primeiro, o do meio e o último, e usar o valor intermediário como pivô. Custa três comparações e elimina o pior caso das entradas ordenadas e quase ordenadas.',
      },
      {
        kind: 'text',
        body:
          'Em troca do risco, o quick sort ordena **no lugar** e tem constantes menores que o merge sort — o que o torna, na prática, o mais rápido dos algoritmos de comparação na média.',
      },
    ],
    quiz: [
      {
        id: 's07c03l05q1',
        type: 'single',
        prompt: 'O que causa o pior caso do quick sort?',
        options: [
          { id: 'a', text: 'Um pivô que sempre cai em um extremo, deixando uma partição vazia.', correct: true },
          { id: 'b', text: 'Elementos repetidos.' },
          { id: 'c', text: 'Arrays muito grandes.' },
          { id: 'd', text: 'A recursão dupla.' },
        ],
        explanation:
          'Cada partição separa um elemento só, a profundidade vira `n` e o custo total vira `O(n²)`.',
      },
      {
        id: 's07c03l05q2',
        type: 'single',
        prompt: 'Qual é o risco adicional do pior caso com muitos elementos?',
        options: [
          { id: 'a', text: 'A profundidade da recursão estoura a pilha.', correct: true },
          { id: 'b', text: 'O array é corrompido.' },
          { id: 'c', text: 'O resultado sai desordenado.' },
          { id: 'd', text: 'Não há risco adicional.' },
        ],
        explanation:
          'O sintoma é um encerramento abrupto do processo, não uma demora — e isso confunde o diagnóstico.',
      },
      {
        id: 's07c03l05q3',
        type: 'single',
        prompt: 'O que é a mediana de três?',
        options: [
          { id: 'a', text: 'Usar como pivô o valor intermediário entre o primeiro, o do meio e o último.', correct: true },
          { id: 'b', text: 'Dividir o array em três partes.' },
          { id: 'c', text: 'Fazer três partições por vez.' },
          { id: 'd', text: 'Usar a média dos três primeiros.' },
        ],
        explanation:
          'Custa três comparações e elimina o pior caso nas entradas ordenadas e quase ordenadas, que são as mais comuns.',
      },
    ],
    challenge: {
      brief:
        'Implemente o quick sort com dois esquemas de pivô e comprove que a escolha muda a profundidade da recursão drasticamente.',
      requirements: [
        'Complexidade esperada: `O(n log n)` em média, `O(n²)` no pior caso, `O(log n)` de pilha em média',
        '`QuickSortUltimo(int[] dados)` usa sempre o último elemento como pivô',
        '`QuickSortMediana(int[] dados)` usa a mediana de três, movendo-a para o fim antes de particionar',
        '`Particionar(int[] dados, int inicio, int fim)` usa o esquema de Lomuto com o pivô em `dados[fim]`',
        '`profundidadeMaxima` registra a maior profundidade de recursão atingida',
        'Os dois ordenam no lugar, sem array auxiliar',
        'O `Main` compara os dois em entrada embaralhada e em entrada já ordenada',
        'O tamanho é pequeno o bastante para o pior caso não estourar a pilha',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int profundidadeMaxima = 0;

    // Escreva QuickSortUltimo, QuickSortMediana, Particionar
    // e os métodos recursivos aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] embaralhado = new int[n];
        int[] ordenado = new int[n];

        for (int i = 0; i < n; i++)
        {
            embaralhado[i] = (i * 31 + 17) % n;
            ordenado[i] = i;
        }

        int[] copia = (int[])embaralhado.Clone();
        profundidadeMaxima = 0;
        QuickSortUltimo(copia);
        Console.WriteLine($"ultimo em embaralhado: profundidade {profundidadeMaxima}");

        copia = (int[])ordenado.Clone();
        profundidadeMaxima = 0;
        QuickSortUltimo(copia);
        Console.WriteLine($"ultimo em ordenado: profundidade {profundidadeMaxima}");

        copia = (int[])embaralhado.Clone();
        profundidadeMaxima = 0;
        QuickSortMediana(copia);
        Console.WriteLine($"mediana em embaralhado: profundidade {profundidadeMaxima}");

        copia = (int[])ordenado.Clone();
        profundidadeMaxima = 0;
        QuickSortMediana(copia);
        Console.WriteLine($"mediana em ordenado: profundidade {profundidadeMaxima}");

        int[] conferencia = (int[])embaralhado.Clone();
        QuickSortMediana(conferencia);

        bool certo = true;
        for (int i = 1; i < n; i++) if (conferencia[i - 1] > conferencia[i]) certo = false;

        Console.WriteLine($"ordenado corretamente: {certo}");
        Console.WriteLine($"primeiros: {string.Join(",", conferencia[0], conferencia[1], conferencia[2])}");
    }
}
`,
      solution: `using System;

class Program
{
    static int profundidadeMaxima = 0;

    static void Trocar(int[] dados, int a, int b)
    {
        int temporario = dados[a];
        dados[a] = dados[b];
        dados[b] = temporario;
    }

    static int Particionar(int[] dados, int inicio, int fim)
    {
        int pivo = dados[fim];
        int limite = inicio;

        for (int i = inicio; i < fim; i++)
        {
            if (dados[i] <= pivo)
            {
                Trocar(dados, i, limite);
                limite++;
            }
        }

        Trocar(dados, limite, fim);
        return limite;
    }

    static void EscolherMediana(int[] dados, int inicio, int fim)
    {
        int meio = inicio + (fim - inicio) / 2;

        if (dados[inicio] > dados[meio])
        {
            Trocar(dados, inicio, meio);
        }

        if (dados[inicio] > dados[fim])
        {
            Trocar(dados, inicio, fim);
        }

        if (dados[meio] > dados[fim])
        {
            Trocar(dados, meio, fim);
        }

        Trocar(dados, meio, fim);
    }

    static void OrdenarUltimo(int[] dados, int inicio, int fim, int profundidade)
    {
        if (profundidade > profundidadeMaxima)
        {
            profundidadeMaxima = profundidade;
        }

        if (inicio >= fim)
        {
            return;
        }

        int p = Particionar(dados, inicio, fim);

        OrdenarUltimo(dados, inicio, p - 1, profundidade + 1);
        OrdenarUltimo(dados, p + 1, fim, profundidade + 1);
    }

    static void OrdenarMediana(int[] dados, int inicio, int fim, int profundidade)
    {
        if (profundidade > profundidadeMaxima)
        {
            profundidadeMaxima = profundidade;
        }

        if (inicio >= fim)
        {
            return;
        }

        EscolherMediana(dados, inicio, fim);

        int p = Particionar(dados, inicio, fim);

        OrdenarMediana(dados, inicio, p - 1, profundidade + 1);
        OrdenarMediana(dados, p + 1, fim, profundidade + 1);
    }

    static void QuickSortUltimo(int[] dados)
    {
        if (dados.Length <= 1)
        {
            return;
        }

        OrdenarUltimo(dados, 0, dados.Length - 1, 1);
    }

    static void QuickSortMediana(int[] dados)
    {
        if (dados.Length <= 1)
        {
            return;
        }

        OrdenarMediana(dados, 0, dados.Length - 1, 1);
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] embaralhado = new int[n];
        int[] ordenado = new int[n];

        for (int i = 0; i < n; i++)
        {
            embaralhado[i] = (i * 31 + 17) % n;
            ordenado[i] = i;
        }

        int[] copia = (int[])embaralhado.Clone();
        profundidadeMaxima = 0;
        QuickSortUltimo(copia);
        Console.WriteLine($"ultimo em embaralhado: profundidade {profundidadeMaxima}");

        copia = (int[])ordenado.Clone();
        profundidadeMaxima = 0;
        QuickSortUltimo(copia);
        Console.WriteLine($"ultimo em ordenado: profundidade {profundidadeMaxima}");

        copia = (int[])embaralhado.Clone();
        profundidadeMaxima = 0;
        QuickSortMediana(copia);
        Console.WriteLine($"mediana em embaralhado: profundidade {profundidadeMaxima}");

        copia = (int[])ordenado.Clone();
        profundidadeMaxima = 0;
        QuickSortMediana(copia);
        Console.WriteLine($"mediana em ordenado: profundidade {profundidadeMaxima}");

        int[] conferencia = (int[])embaralhado.Clone();
        QuickSortMediana(conferencia);

        bool certo = true;
        for (int i = 1; i < n; i++) if (conferencia[i - 1] > conferencia[i]) certo = false;

        Console.WriteLine($"ordenado corretamente: {certo}");
        Console.WriteLine($"primeiros: {string.Join(",", conferencia[0], conferencia[1], conferencia[2])}");
    }
}
`,
      hints: [
        'O esquema de Lomuto mantém um `limite` que marca o fim da região dos menores, e no fim coloca o pivô ali.',
        'A mediana de três ordena os três candidatos com trocas e depois move o do meio para o fim, onde o `Particionar` espera o pivô.',
        'Registre a profundidade na primeira linha do método recursivo, antes da condição de parada.',
      ],
      tests: [
        {
          name: 'Duzentos elementos',
          stdin: '200\n',
          expectedStdout:
            'ultimo em embaralhado: profundidade 15\nultimo em ordenado: profundidade 200\n' +
            'mediana em embaralhado: profundidade 11\nmediana em ordenado: profundidade 8\n' +
            'ordenado corretamente: True\nprimeiros: 0,1,2',
        },
        {
          name: 'Cem elementos',
          stdin: '100\n',
          expectedStdout:
            'ultimo em embaralhado: profundidade 13\nultimo em ordenado: profundidade 100\n' +
            'mediana em embaralhado: profundidade 11\nmediana em ordenado: profundidade 7\n' +
            'ordenado corretamente: True\nprimeiros: 0,1,2',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's07c03l06',
    title: 'Counting sort',
    objective: 'Ordenar em tempo linear quando os valores vêm de uma faixa pequena e conhecida.',
    concept: [
      {
        kind: 'text',
        body:
          'Existe um limite teórico: nenhum algoritmo baseado em **comparações** pode ser melhor que `O(n log n)`. O counting sort escapa desse limite porque não compara nada — ele conta.',
      },
      {
        kind: 'code',
        code: `int[] contagem = new int[maior + 1];

foreach (int valor in dados) contagem[valor]++;   // conta

int destino = 0;

for (int valor = 0; valor <= maior; valor++)
{
    for (int k = 0; k < contagem[valor]; k++)
    {
        dados[destino] = valor;                    // reconstroi
        destino++;
    }
}`,
        caption: 'Duas passagens: uma para contar, outra para reconstruir em ordem.',
      },
      {
        kind: 'table',
        headers: ['Aspecto', 'Valor'],
        rows: [
          ['tempo', '`O(n + k)`, com `k` = faixa de valores'],
          ['espaço', '`O(k)`'],
          ['comparações', '**nenhuma**'],
          ['funciona com', 'inteiros em faixa conhecida'],
        ],
      },
      {
        kind: 'text',
        body:
          'O `k` é o que decide se vale a pena. Ordenar um milhão de idades — faixa de 0 a 120 — é lindo. Ordenar mil valores espalhados entre zero e um bilhão alocaria um array de um bilhão de posições.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A regra prática: o counting sort compensa quando `k` é da ordem de `n` ou menor. Com `k` muito maior que `n`, o custo de alocar e percorrer a faixa domina tudo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A versão simples acima **perde a identidade** dos elementos: ela reconstrói valores, não move objetos. Para ordenar registros mantendo a estabilidade, é preciso a versão com somas acumuladas, que calcula a posição final de cada elemento.',
      },
    ],
    quiz: [
      {
        id: 's07c03l06q1',
        type: 'single',
        prompt: 'Por que o counting sort escapa do limite `O(n log n)`?',
        options: [
          { id: 'a', text: 'Porque ele não usa comparações.', correct: true },
          { id: 'b', text: 'Porque ele usa mais memória.' },
          { id: 'c', text: 'Porque ele é recursivo.' },
          { id: 'd', text: 'Ele não escapa do limite.' },
        ],
        explanation:
          'O limite vale para algoritmos baseados em comparação. O counting sort usa o valor como índice.',
      },
      {
        id: 's07c03l06q2',
        type: 'single',
        prompt: 'Quando o counting sort compensa?',
        options: [
          { id: 'a', text: 'Quando a faixa de valores é da ordem de `n` ou menor.', correct: true },
          { id: 'b', text: 'Quando os dados já estão quase ordenados.' },
          { id: 'c', text: 'Quando há muitos valores repetidos.' },
          { id: 'd', text: 'Sempre.' },
        ],
        explanation:
          'Com faixa muito maior que `n`, alocar e percorrer o array de contagem domina o custo total.',
      },
      {
        id: 's07c03l06q3',
        type: 'single',
        prompt: 'O que a versão simples não preserva?',
        options: [
          { id: 'a', text: 'A identidade dos elementos — ela reconstrói valores, não move objetos.', correct: true },
          { id: 'b', text: 'A ordem crescente.' },
          { id: 'c', text: 'O tamanho do array.' },
          { id: 'd', text: 'Os valores repetidos.' },
        ],
        explanation:
          'Para ordenar registros mantendo estabilidade é preciso a versão com somas acumuladas.',
      },
    ],
    challenge: {
      brief:
        'Implemente as duas versões do counting sort e comprove que só a segunda preserva a ordem original de elementos equivalentes.',
      requirements: [
        'Complexidade esperada: `O(n + k)` de tempo, `O(k)` de espaço',
        '`CountingSimples(int[] dados, int maior)` reconstrói o array a partir das contagens',
        '`CountingEstavel(string[] rotulos, int[] chaves, int maior)` devolve os rótulos ordenados pela chave, preservando a ordem original entre chaves iguais',
        'A versão estável usa somas acumuladas e percorre a entrada **de trás para frente**',
        '`Faixa(int[] dados)` devolve o maior valor, ou `-1` para array vazio',
        'Nenhuma das duas usa comparação entre elementos para decidir a ordem',
        'As duas funcionam com array vazio',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva Faixa, CountingSimples e CountingEstavel aqui

    static void Main()
    {
        int[] valores = { 4, 2, 7, 2, 0, 4, 7, 1 };

        Console.WriteLine($"faixa: {Faixa(valores)}");

        int[] copia = (int[])valores.Clone();
        CountingSimples(copia, Faixa(valores));
        Console.WriteLine($"simples: {string.Join(",", copia)}");

        int[] vazio = new int[0];
        Console.WriteLine($"faixa vazia: {Faixa(vazio)}");
        CountingSimples(vazio, 0);
        Console.WriteLine($"vazio: [{string.Join(",", vazio)}]");

        // estabilidade: rotulos com a mesma chave devem manter a ordem original
        string[] rotulos = { "a1", "b2", "c1", "d0", "e2", "f1" };
        int[] chaves = { 1, 2, 1, 0, 2, 1 };

        string[] estavel = CountingEstavel(rotulos, chaves, 2);
        Console.WriteLine($"estavel: {string.Join(",", estavel)}");

        string[] vazioEstavel = CountingEstavel(new string[0], new int[0], 0);
        Console.WriteLine($"estavel vazio: [{string.Join(",", vazioEstavel)}]");
    }
}
`,
      solution: `using System;

class Program
{
    static int Faixa(int[] dados)
    {
        if (dados.Length == 0)
        {
            return -1;
        }

        int maior = dados[0];

        foreach (int valor in dados)
        {
            if (valor > maior)
            {
                maior = valor;
            }
        }

        return maior;
    }

    static void CountingSimples(int[] dados, int maior)
    {
        if (dados.Length == 0)
        {
            return;
        }

        int[] contagem = new int[maior + 1];

        foreach (int valor in dados)
        {
            contagem[valor]++;
        }

        int destino = 0;

        for (int valor = 0; valor <= maior; valor++)
        {
            for (int k = 0; k < contagem[valor]; k++)
            {
                dados[destino] = valor;
                destino++;
            }
        }
    }

    static string[] CountingEstavel(string[] rotulos, int[] chaves, int maior)
    {
        string[] saida = new string[rotulos.Length];

        if (rotulos.Length == 0)
        {
            return saida;
        }

        int[] contagem = new int[maior + 1];

        foreach (int chave in chaves)
        {
            contagem[chave]++;
        }

        for (int valor = 1; valor <= maior; valor++)
        {
            contagem[valor] += contagem[valor - 1];
        }

        for (int i = rotulos.Length - 1; i >= 0; i--)
        {
            int chave = chaves[i];
            contagem[chave]--;
            saida[contagem[chave]] = rotulos[i];
        }

        return saida;
    }

    static void Main()
    {
        int[] valores = { 4, 2, 7, 2, 0, 4, 7, 1 };

        Console.WriteLine($"faixa: {Faixa(valores)}");

        int[] copia = (int[])valores.Clone();
        CountingSimples(copia, Faixa(valores));
        Console.WriteLine($"simples: {string.Join(",", copia)}");

        int[] vazio = new int[0];
        Console.WriteLine($"faixa vazia: {Faixa(vazio)}");
        CountingSimples(vazio, 0);
        Console.WriteLine($"vazio: [{string.Join(",", vazio)}]");

        string[] rotulos = { "a1", "b2", "c1", "d0", "e2", "f1" };
        int[] chaves = { 1, 2, 1, 0, 2, 1 };

        string[] estavel = CountingEstavel(rotulos, chaves, 2);
        Console.WriteLine($"estavel: {string.Join(",", estavel)}");

        string[] vazioEstavel = CountingEstavel(new string[0], new int[0], 0);
        Console.WriteLine($"estavel vazio: [{string.Join(",", vazioEstavel)}]");
    }
}
`,
      hints: [
        'A soma acumulada transforma "quantos têm esta chave" em "onde termina o bloco desta chave".',
        'Percorrer de trás para frente é o que garante a estabilidade: o último elemento de uma chave vai para a última posição do bloco dela.',
        'Decremente a contagem **antes** de usá-la como índice, porque ela aponta para o fim do bloco.',
      ],
      tests: [
        {
          name: 'Simples e estavel',
          stdin: '',
          expectedStdout:
            'faixa: 7\nsimples: 0,1,2,2,4,4,7,7\nfaixa vazia: -1\nvazio: []\n' +
            'estavel: d0,a1,c1,f1,b2,e2\nestavel vazio: []',
        },
      ],
    },
  },
  {
    id: 's07c03l07',
    title: 'Estabilidade',
    objective: 'Entender quando preservar a ordem relativa de elementos equivalentes importa.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma ordenação é **estável** quando elementos com a mesma chave mantêm entre si a ordem que tinham antes. Parece um detalhe até você precisar ordenar por dois critérios.',
      },
      {
        kind: 'output',
        code: `entrada (ja ordenada por nome):
  Ana/TI   Bruno/RH   Carla/TI   Diego/RH

ordenando por setor, ESTAVEL:
  Bruno/RH   Diego/RH   Ana/TI   Carla/TI     <- nomes ainda em ordem

ordenando por setor, INSTAVEL:
  Diego/RH   Bruno/RH   Carla/TI   Ana/TI     <- ordem dos nomes perdida`,
      },
      {
        kind: 'text',
        body:
          'A consequência prática é enorme: com um algoritmo estável, ordenar **por nome** e depois **por setor** produz "agrupado por setor, e dentro de cada setor em ordem de nome". Sem estabilidade, o segundo critério destrói o primeiro.',
      },
      {
        kind: 'table',
        headers: ['Algoritmo', 'Estável'],
        rows: [
          ['bubble sort', 'sim'],
          ['insertion sort', 'sim'],
          ['merge sort', '**sim**'],
          ['counting sort com acumulada', 'sim'],
          ['selection sort', '**não**'],
          ['quick sort', '**não**'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Em C#, `Array.Sort` e `List.Sort` **não são estáveis** — usam uma variação de quick sort. Já `OrderBy` do LINQ **é estável**. Trocar um pelo outro por questão de desempenho pode mudar o resultado silenciosamente.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A alternativa a depender de estabilidade é escrever um comparador que já considera todos os critérios, com desempate explícito. Fica mais verboso e mais claro — e funciona com qualquer algoritmo.',
      },
    ],
    quiz: [
      {
        id: 's07c03l07q1',
        type: 'single',
        prompt: 'O que uma ordenação estável preserva?',
        options: [
          { id: 'a', text: 'A ordem relativa entre elementos de mesma chave.', correct: true },
          { id: 'b', text: 'A ordem original de todos os elementos.' },
          { id: 'c', text: 'O tamanho do array.' },
          { id: 'd', text: 'A posição do primeiro elemento.' },
        ],
        explanation:
          'Elementos com chaves diferentes são reordenados normalmente; só os empatados mantêm a ordem anterior.',
      },
      {
        id: 's07c03l07q2',
        type: 'single',
        prompt: 'Em C#, qual das opções é estável?',
        options: [
          { id: 'a', code: 'OrderBy', correct: true },
          { id: 'b', code: 'Array.Sort' },
          { id: 'c', code: 'List.Sort' },
          { id: 'd', text: 'Todas são estáveis.' },
        ],
        explanation:
          '`Array.Sort` e `List.Sort` usam uma variação de quick sort, que não é estável. Só o LINQ garante estabilidade.',
      },
      {
        id: 's07c03l07q3',
        type: 'single',
        prompt: 'Qual é a alternativa a depender de estabilidade?',
        options: [
          { id: 'a', text: 'Escrever um comparador com todos os critérios de desempate explícitos.', correct: true },
          { id: 'b', text: 'Ordenar duas vezes.' },
          { id: 'c', text: 'Usar sempre merge sort.' },
          { id: 'd', text: 'Não há alternativa.' },
        ],
        explanation:
          'É mais verboso, mas funciona com qualquer algoritmo e deixa a intenção visível no código.',
      },
    ],
    challenge: {
      brief:
        'Demonstre a diferença entre um algoritmo estável e um instável ordenando os mesmos dados por uma chave secundária.',
      requirements: [
        'Complexidade esperada: `O(n²)` para os dois algoritmos didáticos',
        '`InsertionEstavel(string[] rotulos, int[] chaves)` ordena pelos valores de `chaves`, preservando a ordem original entre iguais',
        '`SelectionInstavel(string[] rotulos, int[] chaves)` ordena pelas mesmas chaves usando selection sort',
        'Os dois reordenam os dois arrays em conjunto, mantendo o rótulo junto da sua chave',
        '`ComparadorCompleto(string[] rotulos, int[] chaves)` ordena por chave e, em empate, pelo rótulo em ordem alfabética',
        'O `ComparadorCompleto` produz o mesmo resultado independentemente da estabilidade do algoritmo usado',
        'Os três ordenam no lugar',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva InsertionEstavel, SelectionInstavel e ComparadorCompleto aqui

    static void Main()
    {
        // ja em ordem alfabetica de rotulo
        string[] baseRotulos = { "Ana", "Bruno", "Carla", "Diego", "Elena" };
        int[] baseChaves = { 2, 1, 2, 1, 3 };

        string[] r1 = (string[])baseRotulos.Clone();
        int[] c1 = (int[])baseChaves.Clone();
        InsertionEstavel(r1, c1);
        Console.WriteLine($"estavel: {string.Join(",", r1)}");
        Console.WriteLine($"chaves:  {string.Join(",", c1)}");

        string[] r2 = (string[])baseRotulos.Clone();
        int[] c2 = (int[])baseChaves.Clone();
        SelectionInstavel(r2, c2);
        Console.WriteLine($"instavel: {string.Join(",", r2)}");
        Console.WriteLine($"chaves:   {string.Join(",", c2)}");

        Console.WriteLine($"mesmo resultado: {string.Join(",", r1) == string.Join(",", r2)}");

        string[] r3 = (string[])baseRotulos.Clone();
        int[] c3 = (int[])baseChaves.Clone();
        ComparadorCompleto(r3, c3);
        Console.WriteLine($"comparador: {string.Join(",", r3)}");

        // partindo de ordem embaralhada, o comparador completo da o mesmo resultado
        string[] r4 = { "Elena", "Carla", "Ana", "Diego", "Bruno" };
        int[] c4 = { 3, 2, 2, 1, 1 };
        ComparadorCompleto(r4, c4);
        Console.WriteLine($"comparador embaralhado: {string.Join(",", r4)}");
        Console.WriteLine($"determinístico: {string.Join(",", r3) == string.Join(",", r4)}");
    }
}
`,
      solution: `using System;

class Program
{
    static void InsertionEstavel(string[] rotulos, int[] chaves)
    {
        for (int i = 1; i < chaves.Length; i++)
        {
            int chaveAtual = chaves[i];
            string rotuloAtual = rotulos[i];
            int j = i - 1;

            while (j >= 0 && chaves[j] > chaveAtual)
            {
                chaves[j + 1] = chaves[j];
                rotulos[j + 1] = rotulos[j];
                j--;
            }

            chaves[j + 1] = chaveAtual;
            rotulos[j + 1] = rotuloAtual;
        }
    }

    static void Trocar(string[] rotulos, int[] chaves, int a, int b)
    {
        int chaveTemporaria = chaves[a];
        chaves[a] = chaves[b];
        chaves[b] = chaveTemporaria;

        string rotuloTemporario = rotulos[a];
        rotulos[a] = rotulos[b];
        rotulos[b] = rotuloTemporario;
    }

    static void SelectionInstavel(string[] rotulos, int[] chaves)
    {
        for (int i = 0; i < chaves.Length - 1; i++)
        {
            int menor = i;

            for (int j = i + 1; j < chaves.Length; j++)
            {
                if (chaves[j] < chaves[menor])
                {
                    menor = j;
                }
            }

            if (menor != i)
            {
                Trocar(rotulos, chaves, i, menor);
            }
        }
    }

    static void ComparadorCompleto(string[] rotulos, int[] chaves)
    {
        for (int i = 0; i < chaves.Length - 1; i++)
        {
            int melhor = i;

            for (int j = i + 1; j < chaves.Length; j++)
            {
                bool menorChave = chaves[j] < chaves[melhor];
                bool empateComRotuloMenor =
                    chaves[j] == chaves[melhor] &&
                    string.CompareOrdinal(rotulos[j], rotulos[melhor]) < 0;

                if (menorChave || empateComRotuloMenor)
                {
                    melhor = j;
                }
            }

            if (melhor != i)
            {
                Trocar(rotulos, chaves, i, melhor);
            }
        }
    }

    static void Main()
    {
        string[] baseRotulos = { "Ana", "Bruno", "Carla", "Diego", "Elena" };
        int[] baseChaves = { 2, 1, 2, 1, 3 };

        string[] r1 = (string[])baseRotulos.Clone();
        int[] c1 = (int[])baseChaves.Clone();
        InsertionEstavel(r1, c1);
        Console.WriteLine($"estavel: {string.Join(",", r1)}");
        Console.WriteLine($"chaves:  {string.Join(",", c1)}");

        string[] r2 = (string[])baseRotulos.Clone();
        int[] c2 = (int[])baseChaves.Clone();
        SelectionInstavel(r2, c2);
        Console.WriteLine($"instavel: {string.Join(",", r2)}");
        Console.WriteLine($"chaves:   {string.Join(",", c2)}");

        Console.WriteLine($"mesmo resultado: {string.Join(",", r1) == string.Join(",", r2)}");

        string[] r3 = (string[])baseRotulos.Clone();
        int[] c3 = (int[])baseChaves.Clone();
        ComparadorCompleto(r3, c3);
        Console.WriteLine($"comparador: {string.Join(",", r3)}");

        string[] r4 = { "Elena", "Carla", "Ana", "Diego", "Bruno" };
        int[] c4 = { 3, 2, 2, 1, 1 };
        ComparadorCompleto(r4, c4);
        Console.WriteLine($"comparador embaralhado: {string.Join(",", r4)}");
        Console.WriteLine($"determinístico: {string.Join(",", r3) == string.Join(",", r4)}");
    }
}
`,
      hints: [
        'Os dois arrays precisam ser movidos juntos: toda troca ou deslocamento acontece nos dois.',
        'O `ComparadorCompleto` é um selection sort cuja comparação inclui o desempate por rótulo.',
        '`string.CompareOrdinal` devolve negativo quando o primeiro texto vem antes.',
      ],
      tests: [
        {
          name: 'Estavel contra instavel',
          stdin: '',
          expectedStdout:
            'estavel: Bruno,Diego,Ana,Carla,Elena\nchaves:  1,1,2,2,3\n' +
            'instavel: Bruno,Diego,Carla,Ana,Elena\nchaves:   1,1,2,2,3\n' +
            'mesmo resultado: False\n' +
            'comparador: Bruno,Diego,Ana,Carla,Elena\n' +
            'comparador embaralhado: Bruno,Diego,Ana,Carla,Elena\n' +
            'determinístico: True',
        },
      ],
    },
  },
  {
    id: 's07c03l08',
    title: 'Ordenando objetos por critério',
    objective: 'Ordenar tipos próprios por qualquer critério, com desempates encadeados.',
    concept: [
      {
        kind: 'text',
        body:
          'Ordenar objetos exige dizer **como comparar**. C# oferece três caminhos, e a escolha depende de o critério ser único e óbvio ou variável.',
      },
      {
        kind: 'table',
        headers: ['Caminho', 'Quando', 'Como'],
        rows: [
          ['`IComparable<T>`', 'existe uma ordem natural', '`lista.Sort()`'],
          ['`Comparison<T>`', 'o critério varia', '`lista.Sort((a, b) => ...)`'],
          ['LINQ', 'critério variável e estabilidade', '`OrderBy(...).ThenBy(...)`'],
        ],
      },
      {
        kind: 'code',
        code: `// desempate encadeado com Comparison
lista.Sort((a, b) =>
{
    int porSetor = a.Setor.CompareTo(b.Setor);
    if (porSetor != 0) return porSetor;

    return a.Nome.CompareTo(b.Nome);
});`,
        caption: 'O padrão é sempre o mesmo: compare, e só passe ao próximo critério se der zero.',
      },
      {
        kind: 'text',
        body:
          'Para ordem **decrescente** em um critério, basta inverter os operandos: `b.Salario.CompareTo(a.Salario)`. Isso permite misturar direções — crescente por setor e decrescente por salário, por exemplo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O `OrderBy(...).ThenBy(...)` do LINQ expressa desempates de forma muito mais legível, e é estável de brinde. O custo é alocar uma nova sequência em vez de ordenar no lugar.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um comparador precisa ser **consistente**: se `a < b` e `b < c`, então `a < c`. Comparadores contraditórios fazem `Array.Sort` lançar `InvalidOperationException` — ou, pior, produzir resultado arbitrário.',
      },
    ],
    quiz: [
      {
        id: 's07c03l08q1',
        type: 'single',
        prompt: 'Qual é o padrão de um desempate encadeado?',
        options: [
          { id: 'a', text: 'Comparar, e só passar ao próximo critério se o resultado for zero.', correct: true },
          { id: 'b', text: 'Somar os resultados das comparações.' },
          { id: 'c', text: 'Comparar todos e usar o maior.' },
          { id: 'd', text: 'Ordenar uma vez por critério.' },
        ],
        explanation:
          'Zero significa empate no critério atual, e só então o próximo tem a palavra.',
      },
      {
        id: 's07c03l08q2',
        type: 'single',
        prompt: 'Como inverter a direção de um critério?',
        options: [
          { id: 'a', text: 'Trocando a ordem dos operandos na comparação.', correct: true },
          { id: 'b', text: 'Multiplicando o resultado por zero.' },
          { id: 'c', text: 'Ordenando e invertendo o array depois.' },
          { id: 'd', text: 'Não é possível em um comparador.' },
        ],
        explanation:
          '`b.CompareTo(a)` inverte aquele critério sem afetar os demais — o que permite misturar direções.',
      },
      {
        id: 's07c03l08q3',
        type: 'single',
        prompt: 'O que acontece com um comparador inconsistente?',
        options: [
          { id: 'a', text: '`Array.Sort` pode lançar exceção ou produzir resultado arbitrário.', correct: true },
          { id: 'b', text: 'A ordenação fica mais lenta.' },
          { id: 'c', text: 'O compilador recusa.' },
          { id: 'd', text: 'Nada muda.' },
        ],
        explanation:
          'Os algoritmos assumem transitividade. Sem ela, o comportamento deixa de ser definido.',
      },
    ],
    challenge: {
      brief:
        'Ordene funcionários por critérios encadeados, com direções misturadas, usando um comparador próprio.',
      requirements: [
        'Complexidade esperada: `O(n log n)` usando `Array.Sort` com comparador',
        '`Funcionario` recebe nome, setor e salário (`int`), com `ToString()` devolvendo `nome/setor/salario`',
        '`PorSetorDepoisNome(Funcionario[] lista)` ordena por setor crescente e, em empate, por nome crescente',
        '`PorSalarioDecrescente(Funcionario[] lista)` ordena por salário decrescente e, em empate, por nome crescente',
        '`PorSetorDepoisSalarioDecrescente(Funcionario[] lista)` mistura as direções: setor crescente, salário decrescente, nome crescente',
        'Os três usam `Array.Sort` com um `Comparison<Funcionario>`',
        'Cada ordenação recebe uma cópia, deixando o array original intacto',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Funcionario aqui

class Program
{
    // Escreva PorSetorDepoisNome, PorSalarioDecrescente
    // e PorSetorDepoisSalarioDecrescente aqui

    static void Main()
    {
        Funcionario[] original =
        {
            new Funcionario("Carla", "TI", 5000),
            new Funcionario("Ana", "RH", 4000),
            new Funcionario("Bruno", "TI", 7000),
            new Funcionario("Diego", "RH", 4000),
            new Funcionario("Elena", "TI", 5000),
        };

        Funcionario[] a = (Funcionario[])original.Clone();
        PorSetorDepoisNome(a);
        Console.WriteLine("--- setor, nome ---");
        foreach (Funcionario f in a) Console.WriteLine(f);

        Funcionario[] b = (Funcionario[])original.Clone();
        PorSalarioDecrescente(b);
        Console.WriteLine("--- salario desc, nome ---");
        foreach (Funcionario f in b) Console.WriteLine(f);

        Funcionario[] c = (Funcionario[])original.Clone();
        PorSetorDepoisSalarioDecrescente(c);
        Console.WriteLine("--- setor, salario desc, nome ---");
        foreach (Funcionario f in c) Console.WriteLine(f);

        Console.WriteLine($"original intacto: {original[0]}");
    }
}
`,
      solution: `using System;

class Funcionario
{
    public string Nome { get; }
    public string Setor { get; }
    public int Salario { get; }

    public Funcionario(string nome, string setor, int salario)
    {
        Nome = nome;
        Setor = setor;
        Salario = salario;
    }

    public override string ToString()
    {
        return $"{Nome}/{Setor}/{Salario}";
    }
}

class Program
{
    static void PorSetorDepoisNome(Funcionario[] lista)
    {
        Array.Sort(lista, (a, b) =>
        {
            int porSetor = string.CompareOrdinal(a.Setor, b.Setor);

            if (porSetor != 0)
            {
                return porSetor;
            }

            return string.CompareOrdinal(a.Nome, b.Nome);
        });
    }

    static void PorSalarioDecrescente(Funcionario[] lista)
    {
        Array.Sort(lista, (a, b) =>
        {
            int porSalario = b.Salario.CompareTo(a.Salario);

            if (porSalario != 0)
            {
                return porSalario;
            }

            return string.CompareOrdinal(a.Nome, b.Nome);
        });
    }

    static void PorSetorDepoisSalarioDecrescente(Funcionario[] lista)
    {
        Array.Sort(lista, (a, b) =>
        {
            int porSetor = string.CompareOrdinal(a.Setor, b.Setor);

            if (porSetor != 0)
            {
                return porSetor;
            }

            int porSalario = b.Salario.CompareTo(a.Salario);

            if (porSalario != 0)
            {
                return porSalario;
            }

            return string.CompareOrdinal(a.Nome, b.Nome);
        });
    }

    static void Main()
    {
        Funcionario[] original =
        {
            new Funcionario("Carla", "TI", 5000),
            new Funcionario("Ana", "RH", 4000),
            new Funcionario("Bruno", "TI", 7000),
            new Funcionario("Diego", "RH", 4000),
            new Funcionario("Elena", "TI", 5000),
        };

        Funcionario[] a = (Funcionario[])original.Clone();
        PorSetorDepoisNome(a);
        Console.WriteLine("--- setor, nome ---");
        foreach (Funcionario f in a) Console.WriteLine(f);

        Funcionario[] b = (Funcionario[])original.Clone();
        PorSalarioDecrescente(b);
        Console.WriteLine("--- salario desc, nome ---");
        foreach (Funcionario f in b) Console.WriteLine(f);

        Funcionario[] c = (Funcionario[])original.Clone();
        PorSetorDepoisSalarioDecrescente(c);
        Console.WriteLine("--- setor, salario desc, nome ---");
        foreach (Funcionario f in c) Console.WriteLine(f);

        Console.WriteLine($"original intacto: {original[0]}");
    }
}
`,
      hints: [
        '`string.CompareOrdinal` evita depender da cultura do sistema, mantendo o resultado determinístico.',
        'Para decrescente, escreva `b.Salario.CompareTo(a.Salario)` — os operandos invertidos.',
        'O desempate final por nome garante que não sobra nenhum empate real, tornando a saída única.',
      ],
      tests: [
        {
          name: 'Tres ordenacoes',
          stdin: '',
          expectedStdout:
            '--- setor, nome ---\nAna/RH/4000\nDiego/RH/4000\nBruno/TI/7000\nCarla/TI/5000\nElena/TI/5000\n' +
            '--- salario desc, nome ---\nBruno/TI/7000\nCarla/TI/5000\nElena/TI/5000\nAna/RH/4000\nDiego/RH/4000\n' +
            '--- setor, salario desc, nome ---\nAna/RH/4000\nDiego/RH/4000\nBruno/TI/7000\nCarla/TI/5000\nElena/TI/5000\n' +
            'original intacto: Carla/TI/5000',
        },
      ],
    },
  },
  {
    id: 's07c03l09',
    title: 'Prática: comparadores customizados',
    objective: 'Construir comparadores que expressam regras de ordenação de domínio.',
    concept: [
      {
        kind: 'text',
        body:
          'Ordenações reais raramente são "por um campo". Elas expressam regras de negócio: prioridade primeiro, vencidos antes dos demais, ativos antes dos inativos, e assim por diante.',
      },
      {
        kind: 'code',
        code: `// urgentes primeiro, depois por prazo, depois por titulo
Array.Sort(tarefas, (a, b) =>
{
    if (a.Urgente != b.Urgente) return a.Urgente ? -1 : 1;

    int porPrazo = a.Prazo.CompareTo(b.Prazo);
    if (porPrazo != 0) return porPrazo;

    return string.CompareOrdinal(a.Titulo, b.Titulo);
});`,
        caption: 'Booleanos viram critério com um condicional explícito: `true` primeiro significa devolver `-1`.',
      },
      {
        kind: 'table',
        headers: ['Regra', 'Como escrever'],
        rows: [
          ['`true` primeiro', '`a.X != b.X ? (a.X ? -1 : 1) : 0`'],
          ['decrescente', '`b.X.CompareTo(a.X)`'],
          ['nulos por último', '`a == null ? 1 : b == null ? -1 : ...`'],
          ['ordem customizada', 'mapear para um índice e comparar'],
        ],
      },
      {
        kind: 'text',
        body:
          'A última linha resolve o caso de uma ordem que não é alfabética nem numérica — como `alta`, `media`, `baixa`. Mapeie cada valor para uma posição e compare as posições.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um comparador longo é um bom candidato a método nomeado. `PorUrgenciaEPrazo` diz muito mais no ponto de uso que uma lambda de doze linhas embutida na chamada.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Cuidado com nulos: um comparador que faz `a.Nome.CompareTo(...)` estoura no primeiro elemento nulo. Decida a posição dos nulos explicitamente, antes de qualquer comparação de conteúdo.',
      },
    ],
    quiz: [
      {
        id: 's07c03l09q1',
        type: 'single',
        prompt: 'Como fazer `true` vir antes de `false` em um comparador?',
        options: [
          { id: 'a', text: 'Devolver `-1` quando o primeiro for `true` e eles diferirem.', correct: true },
          { id: 'b', code: 'a.X.CompareTo(b.X)' },
          { id: 'c', text: 'Converter para inteiro e somar.' },
          { id: 'd', text: 'Não é possível ordenar booleanos.' },
        ],
        explanation:
          'Negativo significa "vem antes". O `CompareTo` de `bool` colocaria `false` primeiro, porque `false < true`.',
      },
      {
        id: 's07c03l09q2',
        type: 'single',
        prompt: 'Como ordenar por uma sequência customizada como `alta`, `media`, `baixa`?',
        options: [
          { id: 'a', text: 'Mapear cada valor para um índice e comparar os índices.', correct: true },
          { id: 'b', text: 'Ordenar alfabeticamente.' },
          { id: 'c', text: 'Usar o comprimento do texto.' },
          { id: 'd', text: 'Não é possível.' },
        ],
        explanation:
          'O índice traduz a ordem semântica para uma ordem numérica, que o comparador sabe usar.',
      },
      {
        id: 's07c03l09q3',
        type: 'single',
        prompt: 'Onde tratar os nulos em um comparador?',
        options: [
          { id: 'a', text: 'Antes de qualquer comparação de conteúdo.', correct: true },
          { id: 'b', text: 'No fim, como último desempate.' },
          { id: 'c', text: 'Fora do comparador, filtrando antes.' },
          { id: 'd', text: 'Não é preciso tratar.' },
        ],
        explanation:
          'Qualquer acesso a membro de um nulo estoura. A decisão sobre a posição deles precisa vir primeiro.',
      },
    ],
    challenge: {
      brief:
        'Escreva comparadores que expressam quatro regras de ordenação de domínio, incluindo booleanos, ordem customizada e nulos.',
      requirements: [
        'Complexidade esperada: `O(n log n)`',
        '`Tarefa` recebe título (pode ser nulo), prioridade (`alta`, `media`, `baixa`), prazo (`int`) e concluída (`bool`)',
        '`Tarefa.ToString()` devolve `titulo/prioridade/prazo/concluida`, usando `sem titulo` quando o título é nulo',
        '`IndiceDePrioridade(string prioridade)` mapeia `alta` para `0`, `media` para `1`, `baixa` para `2`, e qualquer outra para `3`',
        '`PorPrioridade(Tarefa[] lista)` ordena pela ordem customizada de prioridade, depois por prazo crescente',
        '`PendentesPrimeiro(Tarefa[] lista)` coloca as não concluídas antes, depois ordena por prazo crescente',
        '`PorTituloComNulosNoFim(Tarefa[] lista)` ordena por título alfabético, com os nulos no fim',
        'Nenhum comparador estoura com título nulo',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Tarefa aqui

class Program
{
    // Escreva IndiceDePrioridade, PorPrioridade,
    // PendentesPrimeiro e PorTituloComNulosNoFim aqui

    static void Main()
    {
        Tarefa[] original =
        {
            new Tarefa("Revisar", "media", 5, false),
            new Tarefa(null, "alta", 3, true),
            new Tarefa("Deploy", "alta", 1, false),
            new Tarefa("Backup", "baixa", 2, true),
            new Tarefa(null, "media", 4, false),
        };

        Tarefa[] a = (Tarefa[])original.Clone();
        PorPrioridade(a);
        Console.WriteLine("--- por prioridade ---");
        foreach (Tarefa t in a) Console.WriteLine(t);

        Tarefa[] b = (Tarefa[])original.Clone();
        PendentesPrimeiro(b);
        Console.WriteLine("--- pendentes primeiro ---");
        foreach (Tarefa t in b) Console.WriteLine(t);

        Tarefa[] c = (Tarefa[])original.Clone();
        PorTituloComNulosNoFim(c);
        Console.WriteLine("--- titulo, nulos no fim ---");
        foreach (Tarefa t in c) Console.WriteLine(t);

        Console.WriteLine($"indice de alta: {IndiceDePrioridade("alta")}");
        Console.WriteLine($"indice de urgente: {IndiceDePrioridade("urgente")}");
    }
}
`,
      solution: `using System;

class Tarefa
{
    public string Titulo { get; }
    public string Prioridade { get; }
    public int Prazo { get; }
    public bool Concluida { get; }

    public Tarefa(string titulo, string prioridade, int prazo, bool concluida)
    {
        Titulo = titulo;
        Prioridade = prioridade;
        Prazo = prazo;
        Concluida = concluida;
    }

    public override string ToString()
    {
        string texto = Titulo ?? "sem titulo";
        return $"{texto}/{Prioridade}/{Prazo}/{Concluida}";
    }
}

class Program
{
    static int IndiceDePrioridade(string prioridade)
    {
        if (prioridade == "alta") return 0;
        if (prioridade == "media") return 1;
        if (prioridade == "baixa") return 2;
        return 3;
    }

    static void PorPrioridade(Tarefa[] lista)
    {
        Array.Sort(lista, (a, b) =>
        {
            int porPrioridade = IndiceDePrioridade(a.Prioridade).CompareTo(IndiceDePrioridade(b.Prioridade));

            if (porPrioridade != 0)
            {
                return porPrioridade;
            }

            return a.Prazo.CompareTo(b.Prazo);
        });
    }

    static void PendentesPrimeiro(Tarefa[] lista)
    {
        Array.Sort(lista, (a, b) =>
        {
            if (a.Concluida != b.Concluida)
            {
                return a.Concluida ? 1 : -1;
            }

            return a.Prazo.CompareTo(b.Prazo);
        });
    }

    static void PorTituloComNulosNoFim(Tarefa[] lista)
    {
        Array.Sort(lista, (a, b) =>
        {
            if (a.Titulo == null && b.Titulo == null)
            {
                return a.Prazo.CompareTo(b.Prazo);
            }

            if (a.Titulo == null)
            {
                return 1;
            }

            if (b.Titulo == null)
            {
                return -1;
            }

            return string.CompareOrdinal(a.Titulo, b.Titulo);
        });
    }

    static void Main()
    {
        Tarefa[] original =
        {
            new Tarefa("Revisar", "media", 5, false),
            new Tarefa(null, "alta", 3, true),
            new Tarefa("Deploy", "alta", 1, false),
            new Tarefa("Backup", "baixa", 2, true),
            new Tarefa(null, "media", 4, false),
        };

        Tarefa[] a = (Tarefa[])original.Clone();
        PorPrioridade(a);
        Console.WriteLine("--- por prioridade ---");
        foreach (Tarefa t in a) Console.WriteLine(t);

        Tarefa[] b = (Tarefa[])original.Clone();
        PendentesPrimeiro(b);
        Console.WriteLine("--- pendentes primeiro ---");
        foreach (Tarefa t in b) Console.WriteLine(t);

        Tarefa[] c = (Tarefa[])original.Clone();
        PorTituloComNulosNoFim(c);
        Console.WriteLine("--- titulo, nulos no fim ---");
        foreach (Tarefa t in c) Console.WriteLine(t);

        Console.WriteLine($"indice de alta: {IndiceDePrioridade("alta")}");
        Console.WriteLine($"indice de urgente: {IndiceDePrioridade("urgente")}");
    }
}
`,
      hints: [
        'Para pendentes primeiro, `a.Concluida ? 1 : -1` coloca as concluídas no fim.',
        'O caso de dois nulos precisa de um critério próprio, senão a ordem entre eles fica indefinida.',
        'O `?? "sem titulo"` no `ToString` evita repetir a verificação de nulo na impressão.',
      ],
      tests: [
        {
          name: 'Quatro criterios',
          stdin: '',
          expectedStdout:
            '--- por prioridade ---\n' +
            'Deploy/alta/1/False\nsem titulo/alta/3/True\nsem titulo/media/4/False\n' +
            'Revisar/media/5/False\nBackup/baixa/2/True\n' +
            '--- pendentes primeiro ---\n' +
            'Deploy/alta/1/False\nsem titulo/media/4/False\nRevisar/media/5/False\n' +
            'Backup/baixa/2/True\nsem titulo/alta/3/True\n' +
            '--- titulo, nulos no fim ---\n' +
            'Backup/baixa/2/True\nDeploy/alta/1/False\nRevisar/media/5/False\n' +
            'sem titulo/alta/3/True\nsem titulo/media/4/False\n' +
            'indice de alta: 0\nindice de urgente: 3',
        },
      ],
    },
  },
  {
    id: 's07c03l10',
    title: 'Checkpoint: ordenação',
    objective: 'Escolher o algoritmo de ordenação certo e justificar a decisão pelas propriedades dele.',
    concept: [
      {
        kind: 'text',
        body:
          'Na prática você quase sempre usa a ordenação da biblioteca. Conhecer os algoritmos serve para **escolher** entre as opções disponíveis e para entender o que acontece quando algo dá errado.',
      },
      {
        kind: 'table',
        headers: ['Algoritmo', 'Tempo', 'Espaço', 'Estável', 'Quando'],
        rows: [
          ['insertion', '`O(n²)` / `O(n)`', '`O(1)`', 'sim', 'poucos elementos, quase ordenado'],
          ['merge', '`O(n log n)`', '`O(n)`', 'sim', 'pior caso importa, precisa estabilidade'],
          ['quick', '`O(n log n)` médio', '`O(log n)`', 'não', 'caso geral, memória apertada'],
          ['counting', '`O(n + k)`', '`O(k)`', 'sim', 'inteiros em faixa pequena'],
        ],
      },
      {
        kind: 'text',
        body:
          'Bibliotecas reais combinam vários: o `Array.Sort` do .NET usa introsort — quick sort que troca para heap sort quando a recursão fica profunda demais, e para insertion sort em partições pequenas.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Essa combinação resolve exatamente as fraquezas que você viu: o heap sort elimina o pior caso `O(n²)` do quick, e o insertion aproveita a constante baixa nas partições pequenas.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A pergunta que mais decide na prática não é "qual é o mais rápido" e sim **"eu preciso de estabilidade?"**. Se precisa, `OrderBy`; se não, `Array.Sort` — e a diferença de desempenho quase nunca é o fator decisivo.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Antes de escrever a sua própria ordenação, confirme que a da biblioteca não serve. Escrever a sua se justifica para aprender, para critérios impossíveis de expressar em comparador, ou para estruturas fora do comum.',
      },
    ],
    quiz: [
      {
        id: 's07c03l10q1',
        type: 'single',
        prompt: 'O que é o introsort usado pelo `Array.Sort`?',
        options: [
          { id: 'a', text: 'Quick sort que troca para heap sort em recursão profunda e insertion em partições pequenas.', correct: true },
          { id: 'b', text: 'Uma versão paralela do merge sort.' },
          { id: 'c', text: 'Um counting sort adaptativo.' },
          { id: 'd', text: 'Um bubble sort otimizado.' },
        ],
        explanation:
          'A combinação corrige as fraquezas específicas do quick sort sem abrir mão das vantagens dele.',
      },
      {
        id: 's07c03l10q2',
        type: 'single',
        prompt: 'Qual pergunta mais decide a escolha na prática?',
        options: [
          { id: 'a', text: 'Eu preciso de estabilidade?', correct: true },
          { id: 'b', text: 'Qual é o mais rápido?' },
          { id: 'c', text: 'Qual usa menos memória?' },
          { id: 'd', text: 'Qual tem menos linhas?' },
        ],
        explanation:
          'A estabilidade muda o resultado; a diferença de desempenho entre as opções da biblioteca raramente é decisiva.',
      },
      {
        id: 's07c03l10q3',
        type: 'multiple',
        prompt: 'Quando escrever a própria ordenação se justifica?',
        options: [
          { id: 'a', text: 'Para aprender como funciona.', correct: true },
          { id: 'b', text: 'Para critérios impossíveis de expressar em comparador.', correct: true },
          { id: 'c', text: 'Para estruturas de dados fora do comum.', correct: true },
          { id: 'd', text: 'Para ganhar desempenho no caso geral.' },
        ],
        explanation:
          'Superar a ordenação da biblioteca no caso geral é improvável — ela é fruto de décadas de otimização.',
      },
    ],
    challenge: {
      brief:
        'Construa um seletor que escolhe o algoritmo de ordenação apropriado para cada situação e o executa.',
      requirements: [
        '`Escolher(int n, int faixa, bool quaseOrdenado, bool precisaEstavel)` devolve o nome do algoritmo',
        'Até `20` elementos, ou quase ordenado, devolve `insertion`',
        'Faixa de valores até `2 * n` devolve `counting`',
        'Precisando de estabilidade devolve `merge`',
        'Nos demais casos devolve `quick`',
        'As regras são avaliadas exatamente nessa ordem',
        '`Ordenar(int[] dados, string algoritmo)` executa o algoritmo escolhido e devolve o array ordenado',
        '`insertion`, `merge` e `quick` são implementados; `counting` usa a faixa dos próprios dados',
        'Todos produzem o mesmo resultado ordenado',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva Escolher, Ordenar e os quatro algoritmos aqui

    static void Main()
    {
        Console.WriteLine($"pequeno: {Escolher(15, 1000, false, false)}");
        Console.WriteLine($"quase ordenado: {Escolher(5000, 100000, true, false)}");
        Console.WriteLine($"faixa pequena: {Escolher(1000, 500, false, false)}");
        Console.WriteLine($"precisa estavel: {Escolher(1000, 100000, false, true)}");
        Console.WriteLine($"caso geral: {Escolher(1000, 100000, false, false)}");

        int[] dados = { 5, 3, 8, 1, 9, 2, 7, 4, 6, 0 };
        string[] algoritmos = { "insertion", "merge", "quick", "counting" };

        foreach (string algoritmo in algoritmos)
        {
            int[] copia = (int[])dados.Clone();
            int[] saida = Ordenar(copia, algoritmo);
            Console.WriteLine($"{algoritmo}: {string.Join(",", saida)}");
        }

        int[] vazio = new int[0];
        Console.WriteLine($"vazio merge: [{string.Join(",", Ordenar(vazio, "merge"))}]");

        int[] repetidos = { 3, 1, 3, 1, 3 };
        Console.WriteLine($"repetidos counting: {string.Join(",", Ordenar(repetidos, "counting"))}");
    }
}
`,
      solution: `using System;

class Program
{
    static string Escolher(int n, int faixa, bool quaseOrdenado, bool precisaEstavel)
    {
        if (n <= 20 || quaseOrdenado)
        {
            return "insertion";
        }

        if (faixa <= 2 * n)
        {
            return "counting";
        }

        if (precisaEstavel)
        {
            return "merge";
        }

        return "quick";
    }

    static int[] Ordenar(int[] dados, string algoritmo)
    {
        if (algoritmo == "insertion")
        {
            Insertion(dados);
            return dados;
        }

        if (algoritmo == "merge")
        {
            Merge(dados);
            return dados;
        }

        if (algoritmo == "counting")
        {
            Counting(dados);
            return dados;
        }

        Quick(dados, 0, dados.Length - 1);
        return dados;
    }

    static void Insertion(int[] dados)
    {
        for (int i = 1; i < dados.Length; i++)
        {
            int atual = dados[i];
            int j = i - 1;

            while (j >= 0 && dados[j] > atual)
            {
                dados[j + 1] = dados[j];
                j--;
            }

            dados[j + 1] = atual;
        }
    }

    static void Merge(int[] dados)
    {
        if (dados.Length <= 1)
        {
            return;
        }

        int[] auxiliar = new int[dados.Length];
        MergeOrdenar(dados, auxiliar, 0, dados.Length - 1);
    }

    static void MergeOrdenar(int[] dados, int[] auxiliar, int inicio, int fim)
    {
        if (inicio >= fim)
        {
            return;
        }

        int meio = inicio + (fim - inicio) / 2;

        MergeOrdenar(dados, auxiliar, inicio, meio);
        MergeOrdenar(dados, auxiliar, meio + 1, fim);

        for (int i = inicio; i <= fim; i++)
        {
            auxiliar[i] = dados[i];
        }

        int esquerda = inicio;
        int direita = meio + 1;

        for (int destino = inicio; destino <= fim; destino++)
        {
            if (esquerda > meio)
            {
                dados[destino] = auxiliar[direita];
                direita++;
            }
            else if (direita > fim)
            {
                dados[destino] = auxiliar[esquerda];
                esquerda++;
            }
            else if (auxiliar[esquerda] <= auxiliar[direita])
            {
                dados[destino] = auxiliar[esquerda];
                esquerda++;
            }
            else
            {
                dados[destino] = auxiliar[direita];
                direita++;
            }
        }
    }

    static void Counting(int[] dados)
    {
        if (dados.Length == 0)
        {
            return;
        }

        int maior = dados[0];
        int menor = dados[0];

        foreach (int valor in dados)
        {
            if (valor > maior) maior = valor;
            if (valor < menor) menor = valor;
        }

        int[] contagem = new int[maior - menor + 1];

        foreach (int valor in dados)
        {
            contagem[valor - menor]++;
        }

        int destino = 0;

        for (int i = 0; i < contagem.Length; i++)
        {
            for (int k = 0; k < contagem[i]; k++)
            {
                dados[destino] = i + menor;
                destino++;
            }
        }
    }

    static void Quick(int[] dados, int inicio, int fim)
    {
        if (inicio >= fim)
        {
            return;
        }

        int pivo = dados[fim];
        int limite = inicio;

        for (int i = inicio; i < fim; i++)
        {
            if (dados[i] <= pivo)
            {
                int temporario = dados[i];
                dados[i] = dados[limite];
                dados[limite] = temporario;
                limite++;
            }
        }

        int guardado = dados[limite];
        dados[limite] = dados[fim];
        dados[fim] = guardado;

        Quick(dados, inicio, limite - 1);
        Quick(dados, limite + 1, fim);
    }

    static void Main()
    {
        Console.WriteLine($"pequeno: {Escolher(15, 1000, false, false)}");
        Console.WriteLine($"quase ordenado: {Escolher(5000, 100000, true, false)}");
        Console.WriteLine($"faixa pequena: {Escolher(1000, 500, false, false)}");
        Console.WriteLine($"precisa estavel: {Escolher(1000, 100000, false, true)}");
        Console.WriteLine($"caso geral: {Escolher(1000, 100000, false, false)}");

        int[] dados = { 5, 3, 8, 1, 9, 2, 7, 4, 6, 0 };
        string[] algoritmos = { "insertion", "merge", "quick", "counting" };

        foreach (string algoritmo in algoritmos)
        {
            int[] copia = (int[])dados.Clone();
            int[] saida = Ordenar(copia, algoritmo);
            Console.WriteLine($"{algoritmo}: {string.Join(",", saida)}");
        }

        int[] vazio = new int[0];
        Console.WriteLine($"vazio merge: [{string.Join(",", Ordenar(vazio, "merge"))}]");

        int[] repetidos = { 3, 1, 3, 1, 3 };
        Console.WriteLine($"repetidos counting: {string.Join(",", Ordenar(repetidos, "counting"))}");
    }
}
`,
      hints: [
        'A ordem de avaliação das regras é a mesma da lista de requisitos — a primeira que casar decide.',
        'O counting desta versão desloca pelo menor valor, o que o faz funcionar também com negativos.',
        'A intercalação em uma única passagem trata os dois casos de esgotamento junto com a comparação normal.',
      ],
      tests: [
        {
          name: 'Selecao e execucao',
          stdin: '',
          expectedStdout:
            'pequeno: insertion\nquase ordenado: insertion\nfaixa pequena: counting\n' +
            'precisa estavel: merge\ncaso geral: quick\n' +
            'insertion: 0,1,2,3,4,5,6,7,8,9\nmerge: 0,1,2,3,4,5,6,7,8,9\n' +
            'quick: 0,1,2,3,4,5,6,7,8,9\ncounting: 0,1,2,3,4,5,6,7,8,9\n' +
            'vazio merge: []\nrepetidos counting: 1,1,3,3,3',
        },
      ],
    },
  },
]
