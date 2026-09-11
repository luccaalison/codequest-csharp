import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's07c02l01',
    title: 'Busca linear',
    objective: 'Dominar a busca mais simples e saber exatamente quando ela é a escolha certa.',
    concept: [
      {
        kind: 'text',
        body:
          'A busca linear percorre os elementos um a um até encontrar o alvo. É `O(n)`, funciona em qualquer coleção e não exige nada dos dados.',
      },
      {
        kind: 'code',
        code: `static int Buscar(int[] dados, int alvo)
{
    for (int i = 0; i < dados.Length; i++)
    {
        if (dados[i] == alvo) return i;
    }

    return -1;
}`,
        caption: 'Devolver o **índice** é mais útil que devolver `true`: quem chama pode acessar o elemento.',
      },
      {
        kind: 'table',
        headers: ['Caso', 'Comparações'],
        rows: [
          ['alvo na primeira posição', '1'],
          ['alvo no meio', '~n/2'],
          ['alvo na última posição', 'n'],
          ['alvo ausente', '**n**'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O caso ausente custa o mesmo que o pior caso presente. Isso importa quando a maioria das buscas não encontra nada — um cenário comum em validações e filtros.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A busca linear é a escolha certa mais vezes do que parece: dados desordenados, coleções pequenas, ou uma única consulta. Ordenar para poder usar busca binária custa `O(n log n)`, o que só se paga com muitas consultas.',
      },
      {
        kind: 'text',
        body:
          'Uma variação útil devolve **todas** as posições em vez da primeira. O custo passa a ser sempre `n`, porque não há como parar antes de examinar tudo.',
      },
    ],
    quiz: [
      {
        id: 's07c02l01q1',
        type: 'single',
        prompt: 'Quantas comparações a busca linear faz quando o alvo está ausente?',
        options: [
          { id: 'a', text: 'n — todas.', correct: true },
          { id: 'b', text: 'n/2 em média.' },
          { id: 'c', code: '1' },
          { id: 'd', code: 'log n' },
        ],
        explanation:
          'Sem encontrar, não há como parar antes do fim. É o mesmo custo do pior caso presente.',
      },
      {
        id: 's07c02l01q2',
        type: 'single',
        prompt: 'Quando a busca linear é a escolha certa?',
        options: [
          { id: 'a', text: 'Dados desordenados, coleções pequenas, ou consulta única.', correct: true },
          { id: 'b', text: 'Sempre que os dados couberem na memória.' },
          { id: 'c', text: 'Apenas em arrays.' },
          { id: 'd', text: 'Nunca: a binária é sempre melhor.' },
        ],
        explanation:
          'Ordenar custa `O(n log n)`. Para uma consulta só, a passagem linear é mais barata que o pré-processamento.',
      },
      {
        id: 's07c02l01q3',
        type: 'single',
        prompt: 'Por que devolver o índice em vez de `true`?',
        options: [
          { id: 'a', text: 'Porque quem chama pode acessar ou alterar o elemento encontrado.', correct: true },
          { id: 'b', text: 'Porque é mais rápido.' },
          { id: 'c', text: 'Porque `bool` não pode ser retornado.' },
          { id: 'd', text: 'Por convenção apenas.' },
        ],
        explanation:
          'O índice carrega mais informação e permite `-1` como "não encontrado", que o `bool` não distingue de posição.',
      },
    ],
    challenge: {
      brief:
        'Implemente as quatro variações da busca linear, todas em `O(n)`, contando as comparações de cada uma.',
      requirements: [
        'Complexidade esperada de todas: `O(n)` de tempo',
        '`Primeira(int[] dados, int alvo)` devolve o primeiro índice ou `-1`',
        '`Ultima(int[] dados, int alvo)` devolve o último índice ou `-1`',
        '`Contar(int[] dados, int alvo)` devolve quantas vezes o alvo aparece',
        '`Todas(int[] dados, int alvo)` devolve os índices separados por espaço, ou `nenhuma`',
        'Cada método conta as próprias comparações em `comparacoes`',
        '`Primeira` para assim que encontra; `Ultima` percorre de trás para frente e também para ao encontrar',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static int comparacoes = 0;

    // Escreva Primeira, Ultima, Contar e Todas aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int alvo = int.Parse(Console.ReadLine());

        int[] dados = new int[n];
        for (int i = 0; i < n; i++) dados[i] = i % 4;

        comparacoes = 0;
        Console.WriteLine($"primeira: {Primeira(dados, alvo)} em {comparacoes} comparacoes");

        comparacoes = 0;
        Console.WriteLine($"ultima: {Ultima(dados, alvo)} em {comparacoes} comparacoes");

        comparacoes = 0;
        Console.WriteLine($"contar: {Contar(dados, alvo)} em {comparacoes} comparacoes");

        comparacoes = 0;
        Console.WriteLine($"todas: {Todas(dados, alvo)} em {comparacoes} comparacoes");

        comparacoes = 0;
        Console.WriteLine($"ausente: {Primeira(dados, 999)} em {comparacoes} comparacoes");

        comparacoes = 0;
        Console.WriteLine($"todas ausente: {Todas(dados, 999)} em {comparacoes} comparacoes");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static int comparacoes = 0;

    static int Primeira(int[] dados, int alvo)
    {
        for (int i = 0; i < dados.Length; i++)
        {
            comparacoes++;

            if (dados[i] == alvo)
            {
                return i;
            }
        }

        return -1;
    }

    static int Ultima(int[] dados, int alvo)
    {
        for (int i = dados.Length - 1; i >= 0; i--)
        {
            comparacoes++;

            if (dados[i] == alvo)
            {
                return i;
            }
        }

        return -1;
    }

    static int Contar(int[] dados, int alvo)
    {
        int total = 0;

        for (int i = 0; i < dados.Length; i++)
        {
            comparacoes++;

            if (dados[i] == alvo)
            {
                total++;
            }
        }

        return total;
    }

    static string Todas(int[] dados, int alvo)
    {
        List<int> indices = new List<int>();

        for (int i = 0; i < dados.Length; i++)
        {
            comparacoes++;

            if (dados[i] == alvo)
            {
                indices.Add(i);
            }
        }

        if (indices.Count == 0)
        {
            return "nenhuma";
        }

        return string.Join(" ", indices);
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int alvo = int.Parse(Console.ReadLine());

        int[] dados = new int[n];
        for (int i = 0; i < n; i++) dados[i] = i % 4;

        comparacoes = 0;
        Console.WriteLine($"primeira: {Primeira(dados, alvo)} em {comparacoes} comparacoes");

        comparacoes = 0;
        Console.WriteLine($"ultima: {Ultima(dados, alvo)} em {comparacoes} comparacoes");

        comparacoes = 0;
        Console.WriteLine($"contar: {Contar(dados, alvo)} em {comparacoes} comparacoes");

        comparacoes = 0;
        Console.WriteLine($"todas: {Todas(dados, alvo)} em {comparacoes} comparacoes");

        comparacoes = 0;
        Console.WriteLine($"ausente: {Primeira(dados, 999)} em {comparacoes} comparacoes");

        comparacoes = 0;
        Console.WriteLine($"todas ausente: {Todas(dados, 999)} em {comparacoes} comparacoes");
    }
}
`,
      hints: [
        'O `Ultima` percorre de `Length - 1` até `0`, decrementando.',
        '`Contar` e `Todas` sempre fazem `n` comparações: não há como parar antes de ver tudo.',
        'Os dados são `i % 4`, então cada valor de `0` a `3` aparece várias vezes.',
      ],
      tests: [
        {
          name: 'Doze elementos buscando 1',
          stdin: '12\n1\n',
          expectedStdout:
            'primeira: 1 em 2 comparacoes\nultima: 9 em 3 comparacoes\n' +
            'contar: 3 em 12 comparacoes\ntodas: 1 5 9 em 12 comparacoes\n' +
            'ausente: -1 em 12 comparacoes\ntodas ausente: nenhuma em 12 comparacoes',
        },
        {
          name: 'Oito elementos buscando 3',
          stdin: '8\n3\n',
          expectedStdout:
            'primeira: 3 em 4 comparacoes\nultima: 7 em 1 comparacoes\n' +
            'contar: 2 em 8 comparacoes\ntodas: 3 7 em 8 comparacoes\n' +
            'ausente: -1 em 8 comparacoes\ntodas ausente: nenhuma em 8 comparacoes',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's07c02l02',
    title: 'Busca com sentinela',
    objective: 'Eliminar uma das duas comparações do laço colocando o alvo no fim.',
    concept: [
      {
        kind: 'text',
        body:
          'O laço da busca linear faz **duas** comparações por volta: uma para testar o limite do índice e outra para testar o valor. A técnica da **sentinela** elimina a primeira.',
      },
      {
        kind: 'compare',
        good: `int ultimo = dados[n - 1];
dados[n - 1] = alvo;      // sentinela

int i = 0;
while (dados[i] != alvo) i++;

dados[n - 1] = ultimo;    // restaura`,
        bad: `int i = 0;
while (i < n && dados[i] != alvo)
{
    i++;
}
// duas comparacoes por volta`,
        goodLabel: 'Uma comparação por volta',
        badLabel: 'Limite testado toda vez',
      },
      {
        kind: 'text',
        body:
          'A ideia é garantir que o alvo **sempre** será encontrado, colocando-o na última posição. O laço não precisa mais verificar se passou do fim, porque é impossível passar.',
      },
      {
        kind: 'text',
        body:
          'Depois do laço, uma única verificação decide o resultado: se `i` for a última posição e o valor original ali não for o alvo, então o alvo não existia.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A complexidade continua `O(n)` — a sentinela corta a **constante**, não a classe. É um exemplo concreto de otimização que Big-O não enxerga, e que ainda assim pode valer em código muito quente.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A técnica **modifica o array** temporariamente. Isso a torna inadequada para coleções somente de leitura, e perigosa em código concorrente — outra thread lendo durante a busca veria um valor falso.',
      },
    ],
    quiz: [
      {
        id: 's07c02l02q1',
        type: 'single',
        prompt: 'O que a sentinela elimina do laço?',
        options: [
          { id: 'a', text: 'A comparação que testa o limite do índice.', correct: true },
          { id: 'b', text: 'A comparação com o valor alvo.' },
          { id: 'c', text: 'O incremento do índice.' },
          { id: 'd', text: 'A necessidade de percorrer o array.' },
        ],
        explanation:
          'Como o alvo está garantido no fim, o laço não pode passar do array — o teste de limite fica desnecessário.',
      },
      {
        id: 's07c02l02q2',
        type: 'single',
        prompt: 'A sentinela muda a complexidade da busca?',
        options: [
          { id: 'a', text: 'Não: continua `O(n)`, apenas com constante menor.', correct: true },
          { id: 'b', text: 'Sim: vira `O(log n)`.' },
          { id: 'c', text: 'Sim: vira `O(1)`.' },
          { id: 'd', text: 'Sim: vira `O(n/2)`.' },
        ],
        explanation:
          'Cortar pela metade o número de comparações não muda a classe — é uma otimização que Big-O não enxerga.',
      },
      {
        id: 's07c02l02q3',
        type: 'single',
        prompt: 'Qual é a principal desvantagem da técnica?',
        options: [
          { id: 'a', text: 'Ela modifica o array temporariamente.', correct: true },
          { id: 'b', text: 'Ela exige dados ordenados.' },
          { id: 'c', text: 'Ela usa memória extra proporcional a n.' },
          { id: 'd', text: 'Ela não encontra o último elemento.' },
        ],
        explanation:
          'Isso a inviabiliza para coleções somente de leitura e a torna insegura com acesso concorrente.',
      },
    ],
    challenge: {
      brief:
        'Implemente a busca com sentinela e compare o número de comparações com a versão comum.',
      requirements: [
        'Complexidade esperada de ambas: `O(n)` de tempo, `O(1)` de espaço',
        '`BuscaComum(int[] dados, int alvo)` conta **duas** comparações por volta do laço: o teste de limite e o de valor',
        '`BuscaSentinela(int[] dados, int alvo)` conta **uma** comparação por volta',
        'A sentinela salva o último elemento, escreve o alvo, busca, e restaura o valor original',
        'Depois do laço, ela devolve `-1` quando parou na última posição e o valor salvo não era o alvo',
        'As duas devolvem o mesmo índice em todos os casos',
        'O array deve ficar intacto depois da busca com sentinela',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int comparacoes = 0;

    // Escreva BuscaComum e BuscaSentinela aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int alvo = int.Parse(Console.ReadLine());

        int[] dados = new int[n];
        for (int i = 0; i < n; i++) dados[i] = i * 2;

        comparacoes = 0;
        int comum = BuscaComum(dados, alvo);
        int compComum = comparacoes;

        comparacoes = 0;
        int sentinela = BuscaSentinela(dados, alvo);
        int compSentinela = comparacoes;

        Console.WriteLine($"comum: {comum} em {compComum} comparacoes");
        Console.WriteLine($"sentinela: {sentinela} em {compSentinela} comparacoes");
        Console.WriteLine($"mesmo resultado: {comum == sentinela}");

        comparacoes = 0;
        int ausenteComum = BuscaComum(dados, 999);
        int compAusenteComum = comparacoes;

        comparacoes = 0;
        int ausenteSentinela = BuscaSentinela(dados, 999);
        int compAusenteSentinela = comparacoes;

        Console.WriteLine($"ausente comum: {ausenteComum} em {compAusenteComum} comparacoes");
        Console.WriteLine($"ausente sentinela: {ausenteSentinela} em {compAusenteSentinela} comparacoes");

        Console.WriteLine($"ultimo elemento: {BuscaSentinela(dados, dados[n - 1])}");
        Console.WriteLine($"array intacto: {string.Join(",", dados)}");
    }
}
`,
      solution: `using System;

class Program
{
    static int comparacoes = 0;

    static int BuscaComum(int[] dados, int alvo)
    {
        int i = 0;

        while (true)
        {
            comparacoes++;

            if (i >= dados.Length)
            {
                return -1;
            }

            comparacoes++;

            if (dados[i] == alvo)
            {
                return i;
            }

            i++;
        }
    }

    static int BuscaSentinela(int[] dados, int alvo)
    {
        int ultimoIndice = dados.Length - 1;
        int salvo = dados[ultimoIndice];

        dados[ultimoIndice] = alvo;

        int i = 0;

        while (true)
        {
            comparacoes++;

            if (dados[i] == alvo)
            {
                break;
            }

            i++;
        }

        dados[ultimoIndice] = salvo;

        if (i == ultimoIndice && salvo != alvo)
        {
            return -1;
        }

        return i;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int alvo = int.Parse(Console.ReadLine());

        int[] dados = new int[n];
        for (int i = 0; i < n; i++) dados[i] = i * 2;

        comparacoes = 0;
        int comum = BuscaComum(dados, alvo);
        int compComum = comparacoes;

        comparacoes = 0;
        int sentinela = BuscaSentinela(dados, alvo);
        int compSentinela = comparacoes;

        Console.WriteLine($"comum: {comum} em {compComum} comparacoes");
        Console.WriteLine($"sentinela: {sentinela} em {compSentinela} comparacoes");
        Console.WriteLine($"mesmo resultado: {comum == sentinela}");

        comparacoes = 0;
        int ausenteComum = BuscaComum(dados, 999);
        int compAusenteComum = comparacoes;

        comparacoes = 0;
        int ausenteSentinela = BuscaSentinela(dados, 999);
        int compAusenteSentinela = comparacoes;

        Console.WriteLine($"ausente comum: {ausenteComum} em {compAusenteComum} comparacoes");
        Console.WriteLine($"ausente sentinela: {ausenteSentinela} em {compAusenteSentinela} comparacoes");

        Console.WriteLine($"ultimo elemento: {BuscaSentinela(dados, dados[n - 1])}");
        Console.WriteLine($"array intacto: {string.Join(",", dados)}");
    }
}
`,
      hints: [
        'O `BuscaComum` usa `while (true)` com duas saídas, para deixar as duas comparações explícitas e contáveis.',
        'A restauração precisa acontecer **antes** da verificação final, senão o valor salvo já teria sido perdido.',
        'O caso do último elemento é o que testa a verificação final: ele é encontrado de verdade, não pela sentinela.',
      ],
      tests: [
        {
          name: 'Dez elementos buscando 8',
          stdin: '10\n8\n',
          expectedStdout:
            'comum: 4 em 10 comparacoes\nsentinela: 4 em 5 comparacoes\nmesmo resultado: True\n' +
            'ausente comum: -1 em 21 comparacoes\nausente sentinela: -1 em 10 comparacoes\n' +
            'ultimo elemento: 9\narray intacto: 0,2,4,6,8,10,12,14,16,18',
        },
        {
          name: 'Seis elementos buscando 0',
          stdin: '6\n0\n',
          expectedStdout:
            'comum: 0 em 2 comparacoes\nsentinela: 0 em 1 comparacoes\nmesmo resultado: True\n' +
            'ausente comum: -1 em 13 comparacoes\nausente sentinela: -1 em 6 comparacoes\n' +
            'ultimo elemento: 5\narray intacto: 0,2,4,6,8,10',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's07c02l03',
    title: 'Busca binária',
    objective: 'Implementar a busca que corta o espaço pela metade e sentir a diferença em escala real.',
    concept: [
      {
        kind: 'text',
        body:
          'A busca binária exige dados **ordenados** e, em troca, encontra qualquer elemento em `O(log n)`. Ela compara com o meio e descarta metade a cada passo.',
      },
      {
        kind: 'code',
        code: `static int Buscar(int[] dados, int alvo)
{
    int inicio = 0;
    int fim = dados.Length - 1;

    while (inicio <= fim)
    {
        int meio = inicio + (fim - inicio) / 2;

        if (dados[meio] == alvo) return meio;

        if (dados[meio] < alvo) inicio = meio + 1;
        else                    fim = meio - 1;
    }

    return -1;
}`,
        caption: 'Três decisões: achou, está à direita, está à esquerda.',
      },
      {
        kind: 'table',
        headers: ['n', 'Linear (pior caso)', 'Binária'],
        rows: [
          ['1.000', '1.000', '10'],
          ['1.000.000', '1.000.000', '20'],
          ['5.000.000', '5.000.000', '**23**'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Em uma escala real, a diferença deixa de ser acadêmica. Vinte mil consultas em cinco milhões de elementos levam **milissegundos** com busca binária e mais de quinze segundos com busca linear.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Escreva `inicio + (fim - inicio) / 2` e não `(inicio + fim) / 2`. A segunda forma pode estourar o `int` quando os dois índices são grandes — um bug que sobreviveu anos em bibliotecas famosas.',
      },
      {
        kind: 'text',
        body:
          'O `while (inicio <= fim)` com o `=` é essencial: sem ele, o caso em que sobra um único elemento nunca é examinado, e a busca falha exatamente quando o alvo está lá.',
      },
    ],
    quiz: [
      {
        id: 's07c02l03q1',
        type: 'single',
        prompt: 'Por que usar `inicio + (fim - inicio) / 2`?',
        options: [
          { id: 'a', text: 'Porque `(inicio + fim)` pode estourar o `int` com índices grandes.', correct: true },
          { id: 'b', text: 'Porque é mais rápido.' },
          { id: 'c', text: 'Porque arredonda diferente.' },
          { id: 'd', text: 'É apenas questão de estilo.' },
        ],
        explanation:
          'É um bug histórico famoso, que passou despercebido por anos em bibliotecas amplamente usadas.',
      },
      {
        id: 's07c02l03q2',
        type: 'single',
        prompt: 'O que acontece se o laço usar `while (inicio < fim)` sem o `=`?',
        options: [
          { id: 'a', text: 'O caso de um único elemento restante nunca é examinado.', correct: true },
          { id: 'b', text: 'O laço nunca termina.' },
          { id: 'c', text: 'A busca fica mais lenta.' },
          { id: 'd', text: 'Nada muda.' },
        ],
        explanation:
          'A busca falha exatamente quando o alvo é o último elemento a ser considerado.',
      },
      {
        id: 's07c02l03q3',
        type: 'single',
        prompt: 'Quantos passos a busca binária faz em 5 milhões de elementos?',
        options: [
          { id: 'a', text: 'Cerca de 23.', correct: true },
          { id: 'b', text: 'Cerca de 2.500.' },
          { id: 'c', text: 'Cerca de 5.000.' },
          { id: 'd', text: 'Cerca de 2.500.000.' },
        ],
        explanation:
          'É quantas vezes dá para dividir cinco milhões por dois até chegar a um.',
      },
    ],
    challenge: {
      brief:
        'Implemente a busca binária e prove, em escala real, que a versão linear não terminaria a tempo.',
      requirements: [
        'Complexidade esperada: `O(log n)` por consulta, `O(1)` de espaço',
        '`BuscaBinaria(int[] dados, int alvo)` devolve o índice ou `-1`',
        'O cálculo do meio usa `inicio + (fim - inicio) / 2`',
        'O laço usa `inicio <= fim`',
        'O `Main` gera 5.000.000 de elementos ordenados e faz 20.000 consultas',
        'Uma solução com busca linear **não termina** dentro do limite de tempo',
        'A soma dos índices encontrados é impressa ao final',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva BuscaBinaria aqui

    static void Main()
    {
        int n = 5_000_000;
        int consultas = 20_000;

        int[] dados = new int[n];
        for (int i = 0; i < n; i++) dados[i] = i * 3;

        // casos pequenos primeiro
        int[] pequeno = { 1, 3, 5, 7, 9, 11 };
        Console.WriteLine($"acha 1: {BuscaBinaria(pequeno, 1)}");
        Console.WriteLine($"acha 11: {BuscaBinaria(pequeno, 11)}");
        Console.WriteLine($"acha 7: {BuscaBinaria(pequeno, 7)}");
        Console.WriteLine($"ausente: {BuscaBinaria(pequeno, 4)}");
        Console.WriteLine($"vazio: {BuscaBinaria(new int[0], 1)}");
        Console.WriteLine($"unico presente: {BuscaBinaria(new int[] { 42 }, 42)}");
        Console.WriteLine($"unico ausente: {BuscaBinaria(new int[] { 42 }, 7)}");

        // escala real: 20.000 consultas em 5.000.000 de elementos
        long soma = 0;
        int encontrados = 0;

        for (int q = 0; q < consultas; q++)
        {
            int alvo = (q * 7919 % n) * 3;
            int indice = BuscaBinaria(dados, alvo);

            if (indice >= 0)
            {
                soma += indice;
                encontrados++;
            }
        }

        Console.WriteLine($"consultas: {consultas}");
        Console.WriteLine($"encontrados: {encontrados}");
        Console.WriteLine($"soma dos indices: {soma}");
    }
}
`,
      solution: `using System;

class Program
{
    static int BuscaBinaria(int[] dados, int alvo)
    {
        int inicio = 0;
        int fim = dados.Length - 1;

        while (inicio <= fim)
        {
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

    static void Main()
    {
        int n = 5_000_000;
        int consultas = 20_000;

        int[] dados = new int[n];
        for (int i = 0; i < n; i++) dados[i] = i * 3;

        int[] pequeno = { 1, 3, 5, 7, 9, 11 };
        Console.WriteLine($"acha 1: {BuscaBinaria(pequeno, 1)}");
        Console.WriteLine($"acha 11: {BuscaBinaria(pequeno, 11)}");
        Console.WriteLine($"acha 7: {BuscaBinaria(pequeno, 7)}");
        Console.WriteLine($"ausente: {BuscaBinaria(pequeno, 4)}");
        Console.WriteLine($"vazio: {BuscaBinaria(new int[0], 1)}");
        Console.WriteLine($"unico presente: {BuscaBinaria(new int[] { 42 }, 42)}");
        Console.WriteLine($"unico ausente: {BuscaBinaria(new int[] { 42 }, 7)}");

        long soma = 0;
        int encontrados = 0;

        for (int q = 0; q < consultas; q++)
        {
            int alvo = (q * 7919 % n) * 3;
            int indice = BuscaBinaria(dados, alvo);

            if (indice >= 0)
            {
                soma += indice;
                encontrados++;
            }
        }

        Console.WriteLine($"consultas: {consultas}");
        Console.WriteLine($"encontrados: {encontrados}");
        Console.WriteLine($"soma dos indices: {soma}");
    }
}
`,
      hints: [
        'Com o array vazio, `fim` vale `-1` e o laço nem começa — o `-1` sai naturalmente.',
        'Os dados são `i * 3`, então o alvo `(q * 7919 % n) * 3` sempre existe e está na posição `q * 7919 % n`.',
        'Se a sua solução demorar, confira se você não está percorrendo o array em vez de dividi-lo.',
      ],
      tests: [
        {
          name: 'Escala real',
          stdin: '',
          expectedStdout:
            'acha 1: 0\nacha 11: 5\nacha 7: 3\nausente: -1\nvazio: -1\n' +
            'unico presente: 0\nunico ausente: -1\n' +
            'consultas: 20000\nencontrados: 20000\nsoma dos indices: 49650810000',
        },
      ],
    },
  },
  {
    id: 's07c02l04',
    title: 'Cuidados com os limites',
    objective: 'Escrever os limites da busca binária de forma que ela sempre termine e sempre acerte.',
    concept: [
      {
        kind: 'text',
        body:
          'A busca binária tem poucas linhas e muitas formas de errar. Quase todos os bugs estão nos **limites**: como o intervalo é fechado, como ele encolhe, e quando o laço para.',
      },
      {
        kind: 'table',
        headers: ['Decisão', 'Escolha segura', 'Erro comum'],
        rows: [
          ['`fim` inicial', '`Length - 1`', '`Length` — acessa fora'],
          ['condição do laço', '`inicio <= fim`', '`inicio < fim` — perde o último'],
          ['descartando à esquerda', '`inicio = meio + 1`', '`inicio = meio` — laço infinito'],
          ['descartando à direita', '`fim = meio - 1`', '`fim = meio` — laço infinito'],
        ],
      },
      {
        kind: 'text',
        body:
          'A regra que evita o laço infinito: o intervalo precisa **encolher de verdade** a cada volta. Se `meio` pode continuar dentro do novo intervalo, existe um caso em que nada muda e o laço nunca termina.',
      },
      {
        kind: 'output',
        code: `inicio=0, fim=1, alvo maior que dados[0]
meio = 0 + (1-0)/2 = 0
inicio = meio     -> inicio continua 0, fim continua 1
                  -> proxima volta identica: laco infinito`,
        caption: 'Com dois elementos, `meio` é sempre o primeiro — e `inicio = meio` não sai do lugar.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Teste sempre com **zero, um e dois** elementos. O caso de dois é onde o laço infinito aparece, e o de um é onde o `<=` faltando se manifesta. Arrays grandes escondem os dois.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um laço infinito não dá erro: ele consome o tempo até o limite de execução e é encerrado de fora. O sintoma é "o programa travou", que não aponta para a linha errada.',
      },
    ],
    quiz: [
      {
        id: 's07c02l04q1',
        type: 'single',
        prompt: 'Por que `inicio = meio` causa laço infinito?',
        options: [
          { id: 'a', text: 'Porque o intervalo pode não encolher, repetindo a mesma volta.', correct: true },
          { id: 'b', text: 'Porque `meio` pode ser negativo.' },
          { id: 'c', text: 'Porque acessa fora do array.' },
          { id: 'd', text: 'Não causa laço infinito.' },
        ],
        explanation:
          'Com dois elementos, `meio` é o primeiro; manter `inicio = meio` reproduz exatamente o estado anterior.',
      },
      {
        id: 's07c02l04q2',
        type: 'single',
        prompt: 'Com quais tamanhos testar uma busca binária?',
        options: [
          { id: 'a', text: 'Zero, um e dois elementos.', correct: true },
          { id: 'b', text: 'Apenas com arrays grandes.' },
          { id: 'c', text: 'Com potências de dois.' },
          { id: 'd', text: 'Com tamanhos ímpares.' },
        ],
        explanation:
          'É onde os bugs de limite se manifestam. Arrays grandes escondem exatamente esses casos.',
      },
      {
        id: 's07c02l04q3',
        type: 'single',
        prompt: 'Qual é o sintoma de um laço infinito neste ambiente?',
        options: [
          { id: 'a', text: 'O programa consome o tempo limite e é encerrado de fora.', correct: true },
          { id: 'b', text: 'Uma exceção de índice.' },
          { id: 'c', text: 'Um estouro de pilha.' },
          { id: 'd', text: 'Um resultado errado.' },
        ],
        explanation:
          'Não há mensagem apontando a linha — o diagnóstico depende de você reconhecer o padrão.',
      },
    ],
    challenge: {
      brief:
        'Implemente uma busca binária correta e prove que ela sobrevive a todos os casos de borda que quebram as versões erradas.',
      requirements: [
        'Complexidade esperada: `O(log n)` de tempo, `O(1)` de espaço',
        '`Buscar(int[] dados, int alvo)` devolve o índice ou `-1`',
        '`iteracoes` conta as voltas do laço e é zerado antes de cada busca',
        '`Testar(int[] dados, int alvo, string rotulo)` imprime `rotulo: indice em N iteracoes`',
        'A busca funciona com array vazio, de um e de dois elementos',
        'A busca encontra corretamente o primeiro e o último elemento',
        'Nenhum caso pode exceder `Length` iterações — se exceder, há laço infinito',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int iteracoes = 0;

    // Escreva Buscar e Testar aqui

    static void Main()
    {
        Testar(new int[0], 5, "vazio");
        Testar(new int[] { 5 }, 5, "um presente");
        Testar(new int[] { 5 }, 9, "um ausente");
        Testar(new int[] { 5, 9 }, 5, "dois primeiro");
        Testar(new int[] { 5, 9 }, 9, "dois ultimo");
        Testar(new int[] { 5, 9 }, 7, "dois ausente meio");
        Testar(new int[] { 5, 9 }, 1, "dois ausente antes");
        Testar(new int[] { 5, 9 }, 20, "dois ausente depois");

        int[] tres = { 1, 2, 3 };
        Testar(tres, 1, "tres primeiro");
        Testar(tres, 2, "tres meio");
        Testar(tres, 3, "tres ultimo");

        int[] grande = new int[1000];
        for (int i = 0; i < 1000; i++) grande[i] = i;

        Testar(grande, 0, "mil primeiro");
        Testar(grande, 999, "mil ultimo");
        Testar(grande, 1000, "mil ausente");
    }
}
`,
      solution: `using System;

class Program
{
    static int iteracoes = 0;

    static int Buscar(int[] dados, int alvo)
    {
        int inicio = 0;
        int fim = dados.Length - 1;

        while (inicio <= fim)
        {
            iteracoes++;

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

    static void Testar(int[] dados, int alvo, string rotulo)
    {
        iteracoes = 0;
        int indice = Buscar(dados, alvo);
        Console.WriteLine($"{rotulo}: {indice} em {iteracoes} iteracoes");
    }

    static void Main()
    {
        Testar(new int[0], 5, "vazio");
        Testar(new int[] { 5 }, 5, "um presente");
        Testar(new int[] { 5 }, 9, "um ausente");
        Testar(new int[] { 5, 9 }, 5, "dois primeiro");
        Testar(new int[] { 5, 9 }, 9, "dois ultimo");
        Testar(new int[] { 5, 9 }, 7, "dois ausente meio");
        Testar(new int[] { 5, 9 }, 1, "dois ausente antes");
        Testar(new int[] { 5, 9 }, 20, "dois ausente depois");

        int[] tres = { 1, 2, 3 };
        Testar(tres, 1, "tres primeiro");
        Testar(tres, 2, "tres meio");
        Testar(tres, 3, "tres ultimo");

        int[] grande = new int[1000];
        for (int i = 0; i < 1000; i++) grande[i] = i;

        Testar(grande, 0, "mil primeiro");
        Testar(grande, 999, "mil ultimo");
        Testar(grande, 1000, "mil ausente");
    }
}
`,
      hints: [
        'Conte a iteração logo no início do corpo do laço, antes de calcular o meio.',
        'Com o array vazio, `fim` vale `-1`, a condição já é falsa e o contador fica em zero.',
        'Nenhum caso deve passar de 10 iterações no array de mil — se passar, o intervalo não está encolhendo.',
      ],
      tests: [
        {
          name: 'Todos os limites',
          stdin: '',
          expectedStdout:
            'vazio: -1 em 0 iteracoes\num presente: 0 em 1 iteracoes\num ausente: -1 em 1 iteracoes\n' +
            'dois primeiro: 0 em 1 iteracoes\ndois ultimo: 1 em 2 iteracoes\n' +
            'dois ausente meio: -1 em 2 iteracoes\ndois ausente antes: -1 em 1 iteracoes\n' +
            'dois ausente depois: -1 em 2 iteracoes\n' +
            'tres primeiro: 0 em 2 iteracoes\ntres meio: 1 em 1 iteracoes\ntres ultimo: 2 em 2 iteracoes\n' +
            'mil primeiro: 0 em 9 iteracoes\nmil ultimo: 999 em 10 iteracoes\nmil ausente: -1 em 10 iteracoes',
        },
      ],
    },
  },
  {
    id: 's07c02l05',
    title: 'Primeira e última ocorrência',
    objective: 'Adaptar a busca binária para encontrar os extremos de um bloco de valores repetidos.',
    concept: [
      {
        kind: 'text',
        body:
          'Com valores repetidos, a busca binária comum encontra **alguma** ocorrência, não necessariamente a primeira. Encontrar o extremo exige continuar buscando depois de achar.',
      },
      {
        kind: 'code',
        code: `static int Primeira(int[] dados, int alvo)
{
    int inicio = 0, fim = dados.Length - 1, achado = -1;

    while (inicio <= fim)
    {
        int meio = inicio + (fim - inicio) / 2;

        if (dados[meio] == alvo)
        {
            achado = meio;
            fim = meio - 1;        // continua procurando a esquerda
        }
        else if (dados[meio] < alvo) inicio = meio + 1;
        else                         fim = meio - 1;
    }

    return achado;
}`,
        caption: 'Ao encontrar, guarde o índice e **não pare** — reduza o intervalo na direção do extremo desejado.',
      },
      {
        kind: 'text',
        body:
          'Para a **última** ocorrência, a única mudança é a direção: ao encontrar, faça `inicio = meio + 1` para continuar procurando à direita.',
      },
      {
        kind: 'table',
        headers: ['Objetivo', 'Ao encontrar'],
        rows: [
          ['qualquer ocorrência', '`return meio`'],
          ['primeira ocorrência', '`fim = meio - 1`'],
          ['última ocorrência', '`inicio = meio + 1`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Com as duas versões, contar ocorrências fica `O(log n)`: `ultima - primeira + 1`. A contagem linear seria `O(n)` — uma diferença enorme quando o bloco repetido é grande.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A variável `achado` precisa ser atualizada a cada acerto, não apenas no primeiro. Como o intervalo continua encolhendo, uma ocorrência melhor pode aparecer depois — e é ela que deve prevalecer.',
      },
    ],
    quiz: [
      {
        id: 's07c02l05q1',
        type: 'single',
        prompt: 'Ao encontrar o alvo, o que fazer para achar a **primeira** ocorrência?',
        options: [
          { id: 'a', text: 'Guardar o índice e continuar buscando à esquerda.', correct: true },
          { id: 'b', text: 'Devolver o índice imediatamente.' },
          { id: 'c', text: 'Continuar buscando à direita.' },
          { id: 'd', text: 'Percorrer linearmente para trás.' },
        ],
        explanation:
          'Reduzir `fim` para `meio - 1` mantém a busca binária e converge para o extremo esquerdo.',
      },
      {
        id: 's07c02l05q2',
        type: 'single',
        prompt: 'Como contar ocorrências em `O(log n)`?',
        options: [
          { id: 'a', code: 'ultima - primeira + 1', correct: true },
          { id: 'b', text: 'Percorrendo o bloco encontrado.' },
          { id: 'c', text: 'Não é possível.' },
          { id: 'd', code: 'ultima - primeira' },
        ],
        explanation:
          'Duas buscas binárias dão os extremos, e a subtração dá o tamanho do bloco sem percorrê-lo.',
      },
      {
        id: 's07c02l05q3',
        type: 'single',
        prompt: 'Por que atualizar `achado` a cada acerto?',
        options: [
          { id: 'a', text: 'Porque uma ocorrência melhor pode aparecer nas voltas seguintes.', correct: true },
          { id: 'b', text: 'Para evitar laço infinito.' },
          { id: 'c', text: 'Para contar as iterações.' },
          { id: 'd', text: 'Não é necessário atualizar.' },
        ],
        explanation:
          'A busca continua encolhendo o intervalo, e cada novo acerto está mais próximo do extremo procurado.',
      },
    ],
    challenge: {
      brief:
        'Implemente as buscas pelos dois extremos e use-as para contar ocorrências sem percorrer o bloco.',
      requirements: [
        'Complexidade esperada de cada busca: `O(log n)` de tempo, `O(1)` de espaço',
        '`Primeira(int[] dados, int alvo)` devolve o menor índice do alvo, ou `-1`',
        '`Ultima(int[] dados, int alvo)` devolve o maior índice do alvo, ou `-1`',
        '`Contar(int[] dados, int alvo)` devolve a quantidade usando apenas as duas buscas, sem percorrer o bloco',
        '`Contar` devolve `0` quando o alvo está ausente',
        'Os dados de teste têm blocos grandes de valores repetidos',
        'Nenhuma das três percorre o array linearmente',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva Primeira, Ultima e Contar aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        // cada valor v aparece exatamente v+1 vezes, em ordem
        int[] dados = new int[n];
        int indice = 0;
        int valor = 0;

        while (indice < n)
        {
            for (int k = 0; k <= valor && indice < n; k++)
            {
                dados[indice] = valor;
                indice++;
            }
            valor++;
        }

        Console.WriteLine($"dados: {string.Join(",", dados)}");

        for (int v = 0; v < 4; v++)
        {
            Console.WriteLine($"valor {v}: primeira={Primeira(dados, v)} ultima={Ultima(dados, v)} total={Contar(dados, v)}");
        }

        Console.WriteLine($"ausente: primeira={Primeira(dados, 99)} ultima={Ultima(dados, 99)} total={Contar(dados, 99)}");
        Console.WriteLine($"vazio: {Contar(new int[0], 1)}");

        int[] todosIguais = { 7, 7, 7, 7, 7 };
        Console.WriteLine($"todos iguais: primeira={Primeira(todosIguais, 7)} ultima={Ultima(todosIguais, 7)} total={Contar(todosIguais, 7)}");
    }
}
`,
      solution: `using System;

class Program
{
    static int Primeira(int[] dados, int alvo)
    {
        int inicio = 0;
        int fim = dados.Length - 1;
        int achado = -1;

        while (inicio <= fim)
        {
            int meio = inicio + (fim - inicio) / 2;

            if (dados[meio] == alvo)
            {
                achado = meio;
                fim = meio - 1;
            }
            else if (dados[meio] < alvo)
            {
                inicio = meio + 1;
            }
            else
            {
                fim = meio - 1;
            }
        }

        return achado;
    }

    static int Ultima(int[] dados, int alvo)
    {
        int inicio = 0;
        int fim = dados.Length - 1;
        int achado = -1;

        while (inicio <= fim)
        {
            int meio = inicio + (fim - inicio) / 2;

            if (dados[meio] == alvo)
            {
                achado = meio;
                inicio = meio + 1;
            }
            else if (dados[meio] < alvo)
            {
                inicio = meio + 1;
            }
            else
            {
                fim = meio - 1;
            }
        }

        return achado;
    }

    static int Contar(int[] dados, int alvo)
    {
        int primeira = Primeira(dados, alvo);

        if (primeira < 0)
        {
            return 0;
        }

        return Ultima(dados, alvo) - primeira + 1;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] dados = new int[n];
        int indice = 0;
        int valor = 0;

        while (indice < n)
        {
            for (int k = 0; k <= valor && indice < n; k++)
            {
                dados[indice] = valor;
                indice++;
            }
            valor++;
        }

        Console.WriteLine($"dados: {string.Join(",", dados)}");

        for (int v = 0; v < 4; v++)
        {
            Console.WriteLine($"valor {v}: primeira={Primeira(dados, v)} ultima={Ultima(dados, v)} total={Contar(dados, v)}");
        }

        Console.WriteLine($"ausente: primeira={Primeira(dados, 99)} ultima={Ultima(dados, 99)} total={Contar(dados, 99)}");
        Console.WriteLine($"vazio: {Contar(new int[0], 1)}");

        int[] todosIguais = { 7, 7, 7, 7, 7 };
        Console.WriteLine($"todos iguais: primeira={Primeira(todosIguais, 7)} ultima={Ultima(todosIguais, 7)} total={Contar(todosIguais, 7)}");
    }
}
`,
      hints: [
        'As duas buscas são idênticas, exceto pelo que fazem no ramo do acerto.',
        'O `Contar` chama `Primeira` primeiro: se ela devolver `-1`, nem vale chamar a outra.',
        'Os dados são gerados de forma que o valor `v` aparece `v+1` vezes — o valor `3` ocupa quatro posições.',
      ],
      tests: [
        {
          name: 'Quinze elementos',
          stdin: '15\n',
          expectedStdout:
            'dados: 0,1,1,2,2,2,3,3,3,3,4,4,4,4,4\n' +
            'valor 0: primeira=0 ultima=0 total=1\n' +
            'valor 1: primeira=1 ultima=2 total=2\n' +
            'valor 2: primeira=3 ultima=5 total=3\n' +
            'valor 3: primeira=6 ultima=9 total=4\n' +
            'ausente: primeira=-1 ultima=-1 total=0\nvazio: 0\n' +
            'todos iguais: primeira=0 ultima=4 total=5',
        },
        {
          name: 'Dez elementos',
          stdin: '10\n',
          expectedStdout:
            'dados: 0,1,1,2,2,2,3,3,3,3\n' +
            'valor 0: primeira=0 ultima=0 total=1\n' +
            'valor 1: primeira=1 ultima=2 total=2\n' +
            'valor 2: primeira=3 ultima=5 total=3\n' +
            'valor 3: primeira=6 ultima=9 total=4\n' +
            'ausente: primeira=-1 ultima=-1 total=0\nvazio: 0\n' +
            'todos iguais: primeira=0 ultima=4 total=5',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's07c02l06',
    title: 'Busca binária na resposta',
    objective: 'Aplicar busca binária sobre o espaço de respostas possíveis, e não sobre um array.',
    concept: [
      {
        kind: 'text',
        body:
          'Esta é a aplicação mais poderosa da técnica: quando a resposta é um número dentro de uma faixa conhecida e existe uma forma de **verificar** se um candidato serve, dá para buscá-la binariamente.',
      },
      {
        kind: 'table',
        headers: ['Requisito', 'Significado'],
        rows: [
          ['faixa conhecida', 'você sabe o menor e o maior valor possíveis'],
          ['verificação barata', 'testar um candidato custa pouco'],
          ['**monotonicidade**', 'se `x` serve, todo valor maior também serve'],
        ],
      },
      {
        kind: 'text',
        body:
          'A monotonicidade é o que torna a busca válida. Ela divide a faixa em duas partes contíguas — a que não serve e a que serve —, e o objetivo passa a ser encontrar a fronteira.',
      },
      {
        kind: 'output',
        code: `candidatos:  1   2   3   4   5   6   7   8
serve?      nao nao nao  SIM SIM SIM SIM SIM
                        ^
                        a fronteira e a resposta`,
      },
      {
        kind: 'code',
        code: `int inicio = 1, fim = maximo, resposta = -1;

while (inicio <= fim)
{
    int meio = inicio + (fim - inicio) / 2;

    if (Serve(meio)) { resposta = meio; fim = meio - 1; }   // tenta menor
    else               inicio = meio + 1;
}`,
        caption: 'Idêntico à busca da primeira ocorrência — o array virou a função `Serve`.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A pergunta que revela a oportunidade é: **"dado um candidato, consigo verificar rapidamente se ele serve?"**. Se a resposta for sim, você troca uma busca `O(n)` sobre a faixa por `O(log n)` verificações.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Sem monotonicidade a técnica falha silenciosamente. Se valores isolados servem e outros não, a busca converge para um ponto arbitrário — e o resultado parece plausível.',
      },
    ],
    quiz: [
      {
        id: 's07c02l06q1',
        type: 'single',
        prompt: 'Qual propriedade torna a busca binária na resposta válida?',
        options: [
          { id: 'a', text: 'Monotonicidade: se um valor serve, todos os maiores também servem.', correct: true },
          { id: 'b', text: 'Os candidatos serem inteiros.' },
          { id: 'c', text: 'A faixa ser pequena.' },
          { id: 'd', text: 'A verificação ser exata.' },
        ],
        explanation:
          'Ela garante que a faixa se divide em duas partes contíguas, e que existe uma única fronteira a encontrar.',
      },
      {
        id: 's07c02l06q2',
        type: 'single',
        prompt: 'Qual pergunta revela a oportunidade de usar a técnica?',
        options: [
          { id: 'a', text: 'Dado um candidato, consigo verificar rapidamente se ele serve?', correct: true },
          { id: 'b', text: 'Os dados estão ordenados?' },
          { id: 'c', text: 'A faixa cabe na memória?' },
          { id: 'd', text: 'Existe uma fórmula fechada?' },
        ],
        explanation:
          'Verificar é quase sempre mais fácil que calcular diretamente — e é tudo que a busca binária precisa.',
      },
      {
        id: 's07c02l06q3',
        type: 'single',
        prompt: 'O que acontece se a propriedade não for monotônica?',
        options: [
          { id: 'a', text: 'A busca converge para um ponto arbitrário e o erro passa despercebido.', correct: true },
          { id: 'b', text: 'A busca entra em laço infinito.' },
          { id: 'c', text: 'A busca lança exceção.' },
          { id: 'd', text: 'A busca fica mais lenta.' },
        ],
        explanation:
          'É a pior forma de falha: o resultado parece plausível e nada indica que a premissa foi violada.',
      },
    ],
    challenge: {
      brief:
        'Resolva três problemas encontrando a resposta por busca binária sobre a faixa de valores possíveis.',
      requirements: [
        'Complexidade esperada de cada solução: `O(n log M)`, com `M` sendo o tamanho da faixa',
        '`RaizInteira(long n)` devolve o maior inteiro cujo quadrado não passa de `n`',
        '`MenorCapacidade(int[] pesos, int dias)` devolve a menor capacidade diária que permite transportar todos os pesos, em ordem, em no máximo `dias` dias',
        '`DiasNecessarios(int[] pesos, int capacidade)` é a verificação auxiliar da segunda',
        '`MenorDivisor(int[] valores, int limite)` devolve o menor divisor tal que a soma das divisões arredondadas para cima não passe de `limite`',
        'Nenhuma das três testa todos os candidatos linearmente',
        'A busca de `MenorCapacidade` começa no maior peso individual',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva RaizInteira, DiasNecessarios, MenorCapacidade e MenorDivisor aqui

    static void Main()
    {
        Console.WriteLine($"raiz de 0: {RaizInteira(0)}");
        Console.WriteLine($"raiz de 16: {RaizInteira(16)}");
        Console.WriteLine($"raiz de 17: {RaizInteira(17)}");
        Console.WriteLine($"raiz de 99: {RaizInteira(99)}");
        Console.WriteLine($"raiz de 1000000000000: {RaizInteira(1000000000000)}");

        int[] pesos = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        Console.WriteLine($"capacidade em 5 dias: {MenorCapacidade(pesos, 5)}");
        Console.WriteLine($"capacidade em 1 dia: {MenorCapacidade(pesos, 1)}");
        Console.WriteLine($"capacidade em 10 dias: {MenorCapacidade(pesos, 10)}");
        Console.WriteLine($"dias com capacidade 15: {DiasNecessarios(pesos, 15)}");

        int[] valores = { 1, 2, 5, 9 };

        Console.WriteLine($"divisor com limite 6: {MenorDivisor(valores, 6)}");
        Console.WriteLine($"divisor com limite 17: {MenorDivisor(valores, 17)}");
        Console.WriteLine($"divisor com limite 4: {MenorDivisor(valores, 4)}");
    }
}
`,
      solution: `using System;

class Program
{
    static long RaizInteira(long n)
    {
        long inicio = 0;
        long fim = 2000000;
        long resposta = 0;

        while (inicio <= fim)
        {
            long meio = inicio + (fim - inicio) / 2;

            if (meio * meio <= n)
            {
                resposta = meio;
                inicio = meio + 1;
            }
            else
            {
                fim = meio - 1;
            }
        }

        return resposta;
    }

    static int DiasNecessarios(int[] pesos, int capacidade)
    {
        int dias = 1;
        int carga = 0;

        foreach (int peso in pesos)
        {
            if (carga + peso > capacidade)
            {
                dias++;
                carga = 0;
            }

            carga += peso;
        }

        return dias;
    }

    static int MenorCapacidade(int[] pesos, int dias)
    {
        int inicio = 0;
        int fim = 0;

        foreach (int peso in pesos)
        {
            if (peso > inicio)
            {
                inicio = peso;
            }

            fim += peso;
        }

        int resposta = fim;

        while (inicio <= fim)
        {
            int meio = inicio + (fim - inicio) / 2;

            if (DiasNecessarios(pesos, meio) <= dias)
            {
                resposta = meio;
                fim = meio - 1;
            }
            else
            {
                inicio = meio + 1;
            }
        }

        return resposta;
    }

    static int MenorDivisor(int[] valores, int limite)
    {
        int inicio = 1;
        int fim = 0;

        foreach (int valor in valores)
        {
            if (valor > fim)
            {
                fim = valor;
            }
        }

        int resposta = fim;

        while (inicio <= fim)
        {
            int meio = inicio + (fim - inicio) / 2;

            int soma = 0;

            foreach (int valor in valores)
            {
                soma += (valor + meio - 1) / meio;
            }

            if (soma <= limite)
            {
                resposta = meio;
                fim = meio - 1;
            }
            else
            {
                inicio = meio + 1;
            }
        }

        return resposta;
    }

    static void Main()
    {
        Console.WriteLine($"raiz de 0: {RaizInteira(0)}");
        Console.WriteLine($"raiz de 16: {RaizInteira(16)}");
        Console.WriteLine($"raiz de 17: {RaizInteira(17)}");
        Console.WriteLine($"raiz de 99: {RaizInteira(99)}");
        Console.WriteLine($"raiz de 1000000000000: {RaizInteira(1000000000000)}");

        int[] pesos = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        Console.WriteLine($"capacidade em 5 dias: {MenorCapacidade(pesos, 5)}");
        Console.WriteLine($"capacidade em 1 dia: {MenorCapacidade(pesos, 1)}");
        Console.WriteLine($"capacidade em 10 dias: {MenorCapacidade(pesos, 10)}");
        Console.WriteLine($"dias com capacidade 15: {DiasNecessarios(pesos, 15)}");

        int[] valores = { 1, 2, 5, 9 };

        Console.WriteLine($"divisor com limite 6: {MenorDivisor(valores, 6)}");
        Console.WriteLine($"divisor com limite 17: {MenorDivisor(valores, 17)}");
        Console.WriteLine($"divisor com limite 4: {MenorDivisor(valores, 4)}");
    }
}
`,
      hints: [
        'A `RaizInteira` busca o **maior** valor que serve, então ao acertar ela move `inicio`, não `fim`.',
        'A divisão arredondada para cima sem ponto flutuante é `(valor + divisor - 1) / divisor`.',
        'A capacidade mínima nunca pode ser menor que o maior peso individual — ele precisa caber sozinho em um dia.',
      ],
      tests: [
        {
          name: 'Os tres problemas',
          stdin: '',
          expectedStdout:
            'raiz de 0: 0\nraiz de 16: 4\nraiz de 17: 4\nraiz de 99: 9\n' +
            'raiz de 1000000000000: 1000000\n' +
            'capacidade em 5 dias: 15\ncapacidade em 1 dia: 55\ncapacidade em 10 dias: 10\n' +
            'dias com capacidade 15: 5\n' +
            'divisor com limite 6: 5\ndivisor com limite 17: 1\ndivisor com limite 4: 9',
        },
      ],
    },
  },
  {
    id: 's07c02l07',
    title: 'Busca em matriz ordenada',
    objective: 'Explorar a ordenação em duas dimensões para buscar sem percorrer a matriz inteira.',
    concept: [
      {
        kind: 'text',
        body:
          'Em uma matriz onde cada linha cresce da esquerda para a direita e cada coluna cresce de cima para baixo, existe uma estratégia elegante que encontra qualquer valor em `O(linhas + colunas)`.',
      },
      {
        kind: 'text',
        body:
          'O truque é começar por um **canto especial**: o superior direito. Dali, cada comparação elimina uma linha inteira ou uma coluna inteira.',
      },
      {
        kind: 'output',
        code: `      1   4   7  11
      2   5   8  12
      3   6   9  16
     10  13  14  17

comeco em 11 (canto superior direito)
alvo = 5:  11 > 5  -> descarta a coluna do 11
            7 > 5  -> descarta a coluna do 7
            4 < 5  -> desce uma linha
            5 = 5  -> achou`,
      },
      {
        kind: 'table',
        headers: ['Comparação no canto', 'Ação', 'Elimina'],
        rows: [
          ['valor > alvo', 'vá para a esquerda', 'a coluna inteira'],
          ['valor < alvo', 'desça uma linha', 'a linha inteira'],
          ['valor = alvo', 'achou', '—'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O canto superior direito funciona porque é o **maior da sua linha e o menor da sua coluna**. Isso torna cada comparação conclusiva: só existe uma direção possível a descartar. O canto inferior esquerdo tem a mesma propriedade invertida e também serve.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Os cantos superior esquerdo e inferior direito **não** servem. No superior esquerdo, um valor menor que o alvo permite ir para a direita ou para baixo — a comparação não decide nada, e a busca vira exploração.',
      },
      {
        kind: 'text',
        body:
          'Quando a matriz é ordenada de forma **totalmente** linear — cada linha começando onde a anterior terminou —, dá para tratá-la como um array único e usar busca binária comum em `O(log(m×n))`.',
      },
    ],
    quiz: [
      {
        id: 's07c02l07q1',
        type: 'single',
        prompt: 'Por que começar pelo canto superior direito?',
        options: [
          { id: 'a', text: 'Porque ele é o maior da linha e o menor da coluna, tornando cada comparação conclusiva.', correct: true },
          { id: 'b', text: 'Porque é o maior valor da matriz.' },
          { id: 'c', text: 'Porque é o mais rápido de acessar.' },
          { id: 'd', text: 'Por convenção apenas.' },
        ],
        explanation:
          'Essa dupla propriedade garante que só existe uma direção a descartar em cada comparação.',
      },
      {
        id: 's07c02l07q2',
        type: 'single',
        prompt: 'Qual é a complexidade dessa busca em uma matriz `m × n`?',
        options: [
          { id: 'a', code: 'O(m + n)', correct: true },
          { id: 'b', code: 'O(m × n)' },
          { id: 'c', code: 'O(log(m × n))' },
          { id: 'd', code: 'O(m log n)' },
        ],
        explanation:
          'Cada passo desce uma linha ou anda uma coluna, então o total de passos é no máximo `m + n`.',
      },
      {
        id: 's07c02l07q3',
        type: 'single',
        prompt: 'Por que o canto superior esquerdo não serve como ponto de partida?',
        options: [
          { id: 'a', text: 'Porque um valor menor que o alvo permite duas direções, e a comparação não decide nada.', correct: true },
          { id: 'b', text: 'Porque ele é sempre o menor valor.' },
          { id: 'c', text: 'Porque o índice zero é especial.' },
          { id: 'd', text: 'Ele serve normalmente.' },
        ],
        explanation:
          'Sem uma direção única a descartar, a busca deixa de ser eliminação e vira exploração de toda a matriz.',
      },
    ],
    challenge: {
      brief:
        'Implemente as duas buscas em matriz: a do canto, para ordenação por linha e coluna, e a binária, para ordenação totalmente linear.',
      requirements: [
        'Complexidade esperada de `BuscarPorCanto`: `O(m + n)`',
        'Complexidade esperada de `BuscarLinearizada`: `O(log(m × n))`',
        '`BuscarPorCanto(int[,] matriz, int alvo)` devolve `linha,coluna` ou `-1,-1`, começando pelo canto superior direito',
        '`BuscarLinearizada(int[,] matriz, int alvo)` trata a matriz como um array único ordenado',
        '`passos` conta os movimentos de `BuscarPorCanto` e é zerado antes de cada busca',
        'A conversão de índice linear para matriz usa `linha = indice / colunas` e `coluna = indice % colunas`',
        'Nenhuma das duas percorre a matriz inteira',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int passos = 0;

    // Escreva BuscarPorCanto e BuscarLinearizada aqui

    static void Main()
    {
        int[,] porLinhaEColuna =
        {
            {  1,  4,  7, 11 },
            {  2,  5,  8, 12 },
            {  3,  6,  9, 16 },
            { 10, 13, 14, 17 },
        };

        int[] alvos = { 1, 5, 17, 16, 15 };

        foreach (int alvo in alvos)
        {
            passos = 0;
            string posicao = BuscarPorCanto(porLinhaEColuna, alvo);
            Console.WriteLine($"canto {alvo}: {posicao} em {passos} passos");
        }

        int[,] linearizada =
        {
            {  1,  3,  5,  7 },
            {  9, 11, 13, 15 },
            { 17, 19, 21, 23 },
        };

        int[] outros = { 1, 13, 23, 12 };

        foreach (int alvo in outros)
        {
            Console.WriteLine($"linearizada {alvo}: {BuscarLinearizada(linearizada, alvo)}");
        }
    }
}
`,
      solution: `using System;

class Program
{
    static int passos = 0;

    static string BuscarPorCanto(int[,] matriz, int alvo)
    {
        int linhas = matriz.GetLength(0);
        int colunas = matriz.GetLength(1);

        int linha = 0;
        int coluna = colunas - 1;

        while (linha < linhas && coluna >= 0)
        {
            passos++;

            int atual = matriz[linha, coluna];

            if (atual == alvo)
            {
                return $"{linha},{coluna}";
            }

            if (atual > alvo)
            {
                coluna--;
            }
            else
            {
                linha++;
            }
        }

        return "-1,-1";
    }

    static string BuscarLinearizada(int[,] matriz, int alvo)
    {
        int linhas = matriz.GetLength(0);
        int colunas = matriz.GetLength(1);

        int inicio = 0;
        int fim = linhas * colunas - 1;

        while (inicio <= fim)
        {
            int meio = inicio + (fim - inicio) / 2;

            int linha = meio / colunas;
            int coluna = meio % colunas;

            int atual = matriz[linha, coluna];

            if (atual == alvo)
            {
                return $"{linha},{coluna}";
            }

            if (atual < alvo)
            {
                inicio = meio + 1;
            }
            else
            {
                fim = meio - 1;
            }
        }

        return "-1,-1";
    }

    static void Main()
    {
        int[,] porLinhaEColuna =
        {
            {  1,  4,  7, 11 },
            {  2,  5,  8, 12 },
            {  3,  6,  9, 16 },
            { 10, 13, 14, 17 },
        };

        int[] alvos = { 1, 5, 17, 16, 15 };

        foreach (int alvo in alvos)
        {
            passos = 0;
            string posicao = BuscarPorCanto(porLinhaEColuna, alvo);
            Console.WriteLine($"canto {alvo}: {posicao} em {passos} passos");
        }

        int[,] linearizada =
        {
            {  1,  3,  5,  7 },
            {  9, 11, 13, 15 },
            { 17, 19, 21, 23 },
        };

        int[] outros = { 1, 13, 23, 12 };

        foreach (int alvo in outros)
        {
            Console.WriteLine($"linearizada {alvo}: {BuscarLinearizada(linearizada, alvo)}");
        }
    }
}
`,
      hints: [
        'O laço da busca por canto termina quando a linha passa do fim ou a coluna fica negativa.',
        '`matriz.GetLength(0)` dá as linhas e `GetLength(1)` dá as colunas.',
        'Na linearizada, o índice `meio` é convertido para linha e coluna antes de acessar a matriz.',
      ],
      tests: [
        {
          name: 'As duas buscas',
          stdin: '',
          expectedStdout:
            'canto 1: 0,0 em 4 passos\ncanto 5: 1,1 em 4 passos\ncanto 17: 3,3 em 4 passos\n' +
            'canto 16: 2,3 em 3 passos\ncanto 15: -1,-1 em 5 passos\n' +
            'linearizada 1: 0,0\nlinearizada 13: 1,2\nlinearizada 23: 2,3\nlinearizada 12: -1,-1',
        },
      ],
    },
  },
  {
    id: 's07c02l08',
    title: 'Erros clássicos de busca binária',
    objective: 'Reconhecer e corrigir os quatro defeitos que mais aparecem em implementações de busca binária.',
    concept: [
      {
        kind: 'text',
        body:
          'A busca binária é famosa por ser difícil de escrever certo. Um estudo clássico apontou que a maioria das implementações publicadas em livros tinha bugs — e eles se repetem.',
      },
      {
        kind: 'table',
        headers: ['#', 'Erro', 'Sintoma'],
        rows: [
          ['1', '`(inicio + fim) / 2`', 'estouro com índices grandes'],
          ['2', '`inicio < fim`', 'não encontra o último candidato'],
          ['3', '`inicio = meio`', 'laço infinito'],
          ['4', 'dados não ordenados', 'resultado errado sem aviso'],
        ],
      },
      {
        kind: 'text',
        body:
          'O erro 4 é o mais insidioso porque **não é um bug do algoritmo** — é uma pré-condição violada. A busca funciona perfeitamente e devolve uma resposta errada, sem nada indicar o problema.',
      },
      {
        kind: 'compare',
        good: `int meio = inicio + (fim - inicio) / 2;

while (inicio <= fim)

inicio = meio + 1;
fim = meio - 1;`,
        bad: `int meio = (inicio + fim) / 2;

while (inicio < fim)

inicio = meio;
fim = meio;`,
        goodLabel: 'As quatro decisões certas',
        badLabel: 'As quatro armadilhas',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma defesa barata contra o erro 4 é uma asserção: verificar a ordenação custa `O(n)` e anula o ganho da busca, mas em desenvolvimento ela transforma um resultado silenciosamente errado em uma falha imediata.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Em C#, prefira `Array.BinarySearch` para o caso comum. Ela já está correta e testada; escrever a sua só se justifica quando você precisa de uma variação, como as buscas por extremo da lição 5.',
      },
    ],
    quiz: [
      {
        id: 's07c02l08q1',
        type: 'single',
        prompt: 'Qual erro produz resultado errado sem nenhum aviso?',
        options: [
          { id: 'a', text: 'Buscar em dados não ordenados.', correct: true },
          { id: 'b', text: 'Usar `(inicio + fim) / 2`.' },
          { id: 'c', text: 'Usar `inicio < fim`.' },
          { id: 'd', text: 'Usar `inicio = meio`.' },
        ],
        explanation:
          'É uma pré-condição violada, não um bug do algoritmo. A busca funciona e a resposta simplesmente não vale.',
      },
      {
        id: 's07c02l08q2',
        type: 'single',
        prompt: 'Como se defender do erro de dados não ordenados durante o desenvolvimento?',
        options: [
          { id: 'a', text: 'Com uma asserção que verifica a ordenação.', correct: true },
          { id: 'b', text: 'Ordenando dentro da própria busca.' },
          { id: 'c', text: 'Usando busca linear.' },
          { id: 'd', text: 'Não há defesa possível.' },
        ],
        explanation:
          'A verificação é `O(n)` e anularia o ganho em produção, mas em desenvolvimento troca um erro silencioso por uma falha imediata.',
      },
      {
        id: 's07c02l08q3',
        type: 'single',
        prompt: 'Quando escrever a própria busca binária se justifica?',
        options: [
          { id: 'a', text: 'Quando é preciso uma variação, como buscar o primeiro ou o último de um bloco.', correct: true },
          { id: 'b', text: 'Sempre: a da biblioteca é lenta.' },
          { id: 'c', text: 'Quando os dados são inteiros.' },
          { id: 'd', text: 'Nunca.' },
        ],
        explanation:
          'Para o caso comum, `Array.BinarySearch` já está correta e testada. As variações é que exigem código próprio.',
      },
    ],
    challenge: {
      brief:
        'Encontre e corrija os quatro erros clássicos em quatro implementações defeituosas de busca binária.',
      requirements: [
        'Complexidade esperada de todas as versões corrigidas: `O(log n)`',
        '`BuscaCorrigida1` corrige o cálculo do meio para evitar estouro',
        '`BuscaCorrigida2` corrige a condição do laço para não perder o último candidato',
        '`BuscaCorrigida3` corrige a atualização dos limites para o intervalo encolher sempre',
        '`BuscaCorrigida4` acrescenta uma verificação que devolve `-2` quando os dados não estão ordenados',
        '`EstaOrdenado(int[] dados)` verifica a ordenação em `O(n)`',
        'As quatro devolvem o índice do alvo ou `-1` quando ele está ausente',
        'Nenhuma entra em laço infinito com dois elementos',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // ERRO 1: estouro no calculo do meio
    // static int BuscaCorrigida1(int[] dados, int alvo)
    // {
    //     int inicio = 0, fim = dados.Length - 1;
    //     while (inicio <= fim)
    //     {
    //         int meio = (inicio + fim) / 2;      // <- aqui
    //         ...
    //     }
    // }
    //
    // ERRO 2: perde o ultimo candidato
    //     while (inicio < fim)                    // <- aqui
    //
    // ERRO 3: laco infinito
    //     if (dados[meio] < alvo) inicio = meio;  // <- aqui
    //     else                    fim = meio;     // <- e aqui
    //
    // ERRO 4: dados nao ordenados passam sem aviso
    //     (falta verificar a pre-condicao)
    //
    // Escreva EstaOrdenado e as quatro versoes corrigidas.

    static void Main()
    {
        int[] dados = { 1, 3, 5, 7, 9, 11, 13 };
        int[] desordenado = { 5, 1, 9, 3 };

        int[] alvos = { 1, 7, 13, 8 };

        foreach (int alvo in alvos)
        {
            Console.WriteLine($"v1 {alvo}: {BuscaCorrigida1(dados, alvo)}");
        }

        foreach (int alvo in alvos)
        {
            Console.WriteLine($"v2 {alvo}: {BuscaCorrigida2(dados, alvo)}");
        }

        foreach (int alvo in alvos)
        {
            Console.WriteLine($"v3 {alvo}: {BuscaCorrigida3(dados, alvo)}");
        }

        Console.WriteLine($"v3 dois elementos: {BuscaCorrigida3(new int[] { 1, 2 }, 2)}");

        Console.WriteLine($"v4 ordenado: {BuscaCorrigida4(dados, 7)}");
        Console.WriteLine($"v4 desordenado: {BuscaCorrigida4(desordenado, 9)}");
        Console.WriteLine($"esta ordenado: {EstaOrdenado(dados)} / {EstaOrdenado(desordenado)}");
        Console.WriteLine($"vazio ordenado: {EstaOrdenado(new int[0])}");
    }
}
`,
      solution: `using System;

class Program
{
    static bool EstaOrdenado(int[] dados)
    {
        for (int i = 1; i < dados.Length; i++)
        {
            if (dados[i - 1] > dados[i])
            {
                return false;
            }
        }

        return true;
    }

    static int BuscaCorrigida1(int[] dados, int alvo)
    {
        int inicio = 0;
        int fim = dados.Length - 1;

        while (inicio <= fim)
        {
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

    static int BuscaCorrigida2(int[] dados, int alvo)
    {
        int inicio = 0;
        int fim = dados.Length - 1;

        while (inicio <= fim)
        {
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

    static int BuscaCorrigida3(int[] dados, int alvo)
    {
        int inicio = 0;
        int fim = dados.Length - 1;

        while (inicio <= fim)
        {
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

    static int BuscaCorrigida4(int[] dados, int alvo)
    {
        if (!EstaOrdenado(dados))
        {
            return -2;
        }

        return BuscaCorrigida1(dados, alvo);
    }

    static void Main()
    {
        int[] dados = { 1, 3, 5, 7, 9, 11, 13 };
        int[] desordenado = { 5, 1, 9, 3 };

        int[] alvos = { 1, 7, 13, 8 };

        foreach (int alvo in alvos)
        {
            Console.WriteLine($"v1 {alvo}: {BuscaCorrigida1(dados, alvo)}");
        }

        foreach (int alvo in alvos)
        {
            Console.WriteLine($"v2 {alvo}: {BuscaCorrigida2(dados, alvo)}");
        }

        foreach (int alvo in alvos)
        {
            Console.WriteLine($"v3 {alvo}: {BuscaCorrigida3(dados, alvo)}");
        }

        Console.WriteLine($"v3 dois elementos: {BuscaCorrigida3(new int[] { 1, 2 }, 2)}");

        Console.WriteLine($"v4 ordenado: {BuscaCorrigida4(dados, 7)}");
        Console.WriteLine($"v4 desordenado: {BuscaCorrigida4(desordenado, 9)}");
        Console.WriteLine($"esta ordenado: {EstaOrdenado(dados)} / {EstaOrdenado(desordenado)}");
        Console.WriteLine($"vazio ordenado: {EstaOrdenado(new int[0])}");
    }
}
`,
      hints: [
        'As quatro versões corrigidas convergem para a mesma implementação — cada uma partia de um defeito diferente.',
        'O `EstaOrdenado` compara cada elemento com o anterior, então o array vazio e o de um elemento são ordenados por vacuidade.',
        'A `BuscaCorrigida4` pode delegar para a primeira depois de validar a pré-condição.',
      ],
      tests: [
        {
          name: 'Os quatro erros corrigidos',
          stdin: '',
          expectedStdout:
            'v1 1: 0\nv1 7: 3\nv1 13: 6\nv1 8: -1\n' +
            'v2 1: 0\nv2 7: 3\nv2 13: 6\nv2 8: -1\n' +
            'v3 1: 0\nv3 7: 3\nv3 13: 6\nv3 8: -1\n' +
            'v3 dois elementos: 1\n' +
            'v4 ordenado: 3\nv4 desordenado: -2\n' +
            'esta ordenado: True / False\nvazio ordenado: True',
        },
      ],
    },
  },
  {
    id: 's07c02l09',
    title: 'Prática: encontrando o ponto de virada',
    objective: 'Localizar a fronteira entre duas regiões usando busca binária sobre uma condição.',
    concept: [
      {
        kind: 'text',
        body:
          'Muitos problemas se resumem a encontrar **onde uma propriedade muda**. Se a mudança acontece uma vez só, a busca binária localiza a fronteira em `O(log n)`.',
      },
      {
        kind: 'output',
        code: `indice:   0    1    2    3    4    5    6    7
valor:    2    4    7    9   12   15   19   23
> 10?    nao  nao  nao  nao  SIM  SIM  SIM  SIM
                             ^
                     ponto de virada: indice 4`,
      },
      {
        kind: 'table',
        headers: ['Problema', 'Condição'],
        rows: [
          ['primeiro maior que x', '`dados[i] > x`'],
          ['ponto de rotação de array girado', '`dados[i] > dados[ultimo]`'],
          ['pico em array em montanha', '`dados[i] > dados[i+1]`'],
          ['primeira versão com bug', '`VersaoTemBug(i)`'],
        ],
      },
      {
        kind: 'text',
        body:
          'O array **girado** é um caso clássico: um array ordenado que foi rotacionado, como `[4,5,6,7,0,1,2]`. O ponto de virada é onde o valor cai, e encontrá-lo permite buscar binariamente na metade certa.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A estrutura é sempre a mesma da busca pela primeira ocorrência: ao encontrar um índice que satisfaz a condição, guarde-o e continue procurando à esquerda por um ainda melhor.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Confirme que a condição realmente muda **uma vez só**. Se ela alterna várias vezes ao longo do array, a busca binária encontra alguma fronteira, mas não necessariamente a primeira — e o resultado parece correto.',
      },
    ],
    quiz: [
      {
        id: 's07c02l09q1',
        type: 'single',
        prompt: 'Qual é a estrutura de uma busca por ponto de virada?',
        options: [
          { id: 'a', text: 'Ao satisfazer a condição, guardar o índice e continuar à esquerda.', correct: true },
          { id: 'b', text: 'Percorrer até a condição mudar.' },
          { id: 'c', text: 'Comparar cada elemento com o próximo.' },
          { id: 'd', text: 'Ordenar antes de buscar.' },
        ],
        explanation:
          'É exatamente a busca pela primeira ocorrência, com a igualdade trocada por uma condição qualquer.',
      },
      {
        id: 's07c02l09q2',
        type: 'single',
        prompt: 'O que é um array girado?',
        options: [
          { id: 'a', text: 'Um array ordenado que foi rotacionado, como `[4,5,6,7,0,1,2]`.', correct: true },
          { id: 'b', text: 'Um array em ordem decrescente.' },
          { id: 'c', text: 'Um array com elementos repetidos.' },
          { id: 'd', text: 'Um array bidimensional.' },
        ],
        explanation:
          'A ordem local se mantém, mas existe um único ponto onde o valor cai — e é ele que a busca localiza.',
      },
      {
        id: 's07c02l09q3',
        type: 'single',
        prompt: 'O que é preciso confirmar antes de usar a técnica?',
        options: [
          { id: 'a', text: 'Que a condição muda uma única vez ao longo do array.', correct: true },
          { id: 'b', text: 'Que o array tem tamanho par.' },
          { id: 'c', text: 'Que os valores são positivos.' },
          { id: 'd', text: 'Que não há repetições.' },
        ],
        explanation:
          'Com múltiplas alternâncias, a busca encontra alguma fronteira — provavelmente não a que você queria.',
      },
    ],
    challenge: {
      brief:
        'Resolva quatro problemas de fronteira, todos com busca binária sobre uma condição.',
      requirements: [
        'Complexidade esperada de todas: `O(log n)` de tempo, `O(1)` de espaço',
        '`PrimeiroMaiorQue(int[] dados, int x)` devolve o índice do primeiro valor maior que `x`, ou `-1`',
        '`PontoDeRotacao(int[] girado)` devolve o índice do menor elemento de um array girado',
        '`IndiceDoPico(int[] montanha)` devolve o índice do maior valor de um array que sobe e depois desce',
        '`PrimeiraVersaoComBug(int total, int primeiraRuim)` simula a busca pela primeira versão defeituosa, contando as verificações em `verificacoes`',
        'Nenhuma percorre o array linearmente',
        'O array girado pode não estar girado — o ponto de rotação é `0` nesse caso',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int verificacoes = 0;

    // Escreva PrimeiroMaiorQue, PontoDeRotacao, IndiceDoPico
    // e PrimeiraVersaoComBug aqui

    static void Main()
    {
        int[] crescente = { 2, 4, 7, 9, 12, 15, 19, 23 };

        Console.WriteLine($"primeiro > 10: {PrimeiroMaiorQue(crescente, 10)}");
        Console.WriteLine($"primeiro > 1: {PrimeiroMaiorQue(crescente, 1)}");
        Console.WriteLine($"primeiro > 23: {PrimeiroMaiorQue(crescente, 23)}");
        Console.WriteLine($"primeiro > 22: {PrimeiroMaiorQue(crescente, 22)}");

        Console.WriteLine($"rotacao de 4,5,6,7,0,1,2: {PontoDeRotacao(new int[] { 4, 5, 6, 7, 0, 1, 2 })}");
        Console.WriteLine($"rotacao de 0,1,2,3: {PontoDeRotacao(new int[] { 0, 1, 2, 3 })}");
        Console.WriteLine($"rotacao de 2,0,1: {PontoDeRotacao(new int[] { 2, 0, 1 })}");
        Console.WriteLine($"rotacao de um: {PontoDeRotacao(new int[] { 5 })}");

        Console.WriteLine($"pico de 1,3,7,4,2: {IndiceDoPico(new int[] { 1, 3, 7, 4, 2 })}");
        Console.WriteLine($"pico de 1,9: {IndiceDoPico(new int[] { 1, 9 })}");
        Console.WriteLine($"pico de 9,1: {IndiceDoPico(new int[] { 9, 1 })}");

        verificacoes = 0;
        int versao = PrimeiraVersaoComBug(1000, 731);
        Console.WriteLine($"primeira versao ruim: {versao} em {verificacoes} verificacoes");
    }
}
`,
      solution: `using System;

class Program
{
    static int verificacoes = 0;

    static int PrimeiroMaiorQue(int[] dados, int x)
    {
        int inicio = 0;
        int fim = dados.Length - 1;
        int achado = -1;

        while (inicio <= fim)
        {
            int meio = inicio + (fim - inicio) / 2;

            if (dados[meio] > x)
            {
                achado = meio;
                fim = meio - 1;
            }
            else
            {
                inicio = meio + 1;
            }
        }

        return achado;
    }

    static int PontoDeRotacao(int[] girado)
    {
        int inicio = 0;
        int fim = girado.Length - 1;

        while (inicio < fim)
        {
            int meio = inicio + (fim - inicio) / 2;

            if (girado[meio] > girado[fim])
            {
                inicio = meio + 1;
            }
            else
            {
                fim = meio;
            }
        }

        return inicio;
    }

    static int IndiceDoPico(int[] montanha)
    {
        int inicio = 0;
        int fim = montanha.Length - 1;

        while (inicio < fim)
        {
            int meio = inicio + (fim - inicio) / 2;

            if (montanha[meio] < montanha[meio + 1])
            {
                inicio = meio + 1;
            }
            else
            {
                fim = meio;
            }
        }

        return inicio;
    }

    static int PrimeiraVersaoComBug(int total, int primeiraRuim)
    {
        int inicio = 1;
        int fim = total;
        int achado = -1;

        while (inicio <= fim)
        {
            int meio = inicio + (fim - inicio) / 2;

            verificacoes++;

            if (meio >= primeiraRuim)
            {
                achado = meio;
                fim = meio - 1;
            }
            else
            {
                inicio = meio + 1;
            }
        }

        return achado;
    }

    static void Main()
    {
        int[] crescente = { 2, 4, 7, 9, 12, 15, 19, 23 };

        Console.WriteLine($"primeiro > 10: {PrimeiroMaiorQue(crescente, 10)}");
        Console.WriteLine($"primeiro > 1: {PrimeiroMaiorQue(crescente, 1)}");
        Console.WriteLine($"primeiro > 23: {PrimeiroMaiorQue(crescente, 23)}");
        Console.WriteLine($"primeiro > 22: {PrimeiroMaiorQue(crescente, 22)}");

        Console.WriteLine($"rotacao de 4,5,6,7,0,1,2: {PontoDeRotacao(new int[] { 4, 5, 6, 7, 0, 1, 2 })}");
        Console.WriteLine($"rotacao de 0,1,2,3: {PontoDeRotacao(new int[] { 0, 1, 2, 3 })}");
        Console.WriteLine($"rotacao de 2,0,1: {PontoDeRotacao(new int[] { 2, 0, 1 })}");
        Console.WriteLine($"rotacao de um: {PontoDeRotacao(new int[] { 5 })}");

        Console.WriteLine($"pico de 1,3,7,4,2: {IndiceDoPico(new int[] { 1, 3, 7, 4, 2 })}");
        Console.WriteLine($"pico de 1,9: {IndiceDoPico(new int[] { 1, 9 })}");
        Console.WriteLine($"pico de 9,1: {IndiceDoPico(new int[] { 9, 1 })}");

        verificacoes = 0;
        int versao = PrimeiraVersaoComBug(1000, 731);
        Console.WriteLine($"primeira versao ruim: {versao} em {verificacoes} verificacoes");
    }
}
`,
      hints: [
        'O `PontoDeRotacao` e o `IndiceDoPico` usam `inicio < fim` e convergem sem precisar de variável `achado`.',
        'No array girado, comparar com `girado[fim]` decide de que lado está o menor elemento.',
        'No pico, comparar `montanha[meio]` com o vizinho da direita diz se você está subindo ou descendo.',
      ],
      tests: [
        {
          name: 'Os quatro problemas',
          stdin: '',
          expectedStdout:
            'primeiro > 10: 4\nprimeiro > 1: 0\nprimeiro > 23: -1\nprimeiro > 22: 7\n' +
            'rotacao de 4,5,6,7,0,1,2: 4\nrotacao de 0,1,2,3: 0\nrotacao de 2,0,1: 1\n' +
            'rotacao de um: 0\n' +
            'pico de 1,3,7,4,2: 2\npico de 1,9: 1\npico de 9,1: 0\n' +
            'primeira versao ruim: 731 em 10 verificacoes',
        },
      ],
    },
  },
  {
    id: 's07c02l10',
    title: 'Checkpoint: busca',
    objective: 'Escolher a técnica de busca certa para cada situação e justificar a decisão pelo custo.',
    concept: [
      {
        kind: 'text',
        body:
          'Buscar é a operação mais frequente em programação. A escolha da técnica depende de três coisas: a ordenação dos dados, a quantidade de consultas e a estrutura disponível.',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Técnica', 'Custo'],
        rows: [
          ['desordenado, uma consulta', 'busca linear', '`O(n)`'],
          ['desordenado, muitas consultas', 'construir `HashSet`', '`O(n)` + `O(1)` cada'],
          ['ordenado', 'busca binária', '`O(log n)`'],
          ['ordenado com repetições', 'busca por extremo', '`O(log n)`'],
          ['resposta numérica verificável', 'busca na resposta', '`O(log M)` verificações'],
          ['matriz ordenada em duas direções', 'caminhada pelo canto', '`O(m + n)`'],
        ],
      },
      {
        kind: 'text',
        body:
          'A segunda linha é a mais esquecida: quando há muitas consultas em dados desordenados, construir um índice costuma vencer tanto a busca linear repetida quanto ordenar para usar busca binária.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O dicionário vence a busca binária em consultas — `O(1)` contra `O(log n)` — mas perde em tudo que envolve **ordem**: menor, maior, faixa, vizinho mais próximo. A estrutura certa depende das perguntas que você vai fazer.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Não esqueça o custo de construção. Um `HashSet` custa `O(n)` para montar e `O(n)` de memória. Para três consultas em mil elementos, a busca linear simples ainda vence.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Escreva a conta antes de decidir: `construção + consultas × custo por consulta`. Ela responde a dúvida mais rápido do que qualquer intuição sobre qual técnica "é mais rápida".',
      },
    ],
    quiz: [
      {
        id: 's07c02l10q1',
        type: 'single',
        prompt: 'Muitas consultas em dados desordenados. Qual a melhor estratégia?',
        options: [
          { id: 'a', text: 'Construir um `HashSet` e consultar em `O(1)`.', correct: true },
          { id: 'b', text: 'Busca linear repetida.' },
          { id: 'c', text: 'Ordenar e usar busca binária.' },
          { id: 'd', text: 'Busca na resposta.' },
        ],
        explanation:
          'Custa `O(n)` para montar e `O(1)` por consulta — melhor que o `O(n log n)` de ordenar, quando a ordem não importa.',
      },
      {
        id: 's07c02l10q2',
        type: 'single',
        prompt: 'Em que o dicionário perde para a busca binária?',
        options: [
          { id: 'a', text: 'Em tudo que envolve ordem: menor, maior, faixa, vizinho mais próximo.', correct: true },
          { id: 'b', text: 'Na velocidade de consulta.' },
          { id: 'c', text: 'No consumo de memória.' },
          { id: 'd', text: 'Não perde em nada.' },
        ],
        explanation:
          'O dicionário responde "existe?" muito bem e "qual é o próximo maior?" nada bem, porque não guarda ordem.',
      },
      {
        id: 's07c02l10q3',
        type: 'single',
        prompt: 'Qual conta resolve a escolha entre estratégias?',
        options: [
          { id: 'a', code: 'construção + consultas × custo por consulta', correct: true },
          { id: 'b', code: 'n × log n' },
          { id: 'c', text: 'A média dos custos.' },
          { id: 'd', text: 'O custo da pior consulta.' },
        ],
        explanation:
          'Ela mostra exatamente o ponto em que o pré-processamento passa a se pagar.',
      },
    ],
    challenge: {
      brief:
        'Construa um buscador que escolhe a estratégia certa conforme a situação e relata o custo total de cada uma.',
      requirements: [
        '`CustoLinear(int n, int consultas)` devolve `n * consultas`',
        '`CustoConjunto(int n, int consultas)` devolve `n + consultas`',
        '`CustoOrdenarEBuscar(int n, int consultas)` devolve `n * Log2(n) + consultas * Log2(n)`',
        '`Escolher(int n, int consultas, bool precisaOrdem)` devolve o nome da estratégia mais barata',
        'Precisando de ordem, o conjunto é descartado mesmo sendo mais barato',
        'Empates ficam com a estratégia mais simples, na ordem `linear`, `conjunto`, `ordenar+binaria`',
        '`BuscarComEstrategia(int[] dados, int alvo, string estrategia)` executa a busca escolhida e devolve o índice na ordem **original**, ou `-1`',
        'A estratégia `ordenar+binaria` não pode alterar o array recebido',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Escreva Log2, CustoLinear, CustoConjunto, CustoOrdenarEBuscar,
    // Escolher e BuscarComEstrategia aqui

    static void Main()
    {
        int[] cenarios = { 1, 10, 1000, 100000 };
        int n = 1000;

        foreach (int consultas in cenarios)
        {
            long linear = CustoLinear(n, consultas);
            long conjunto = CustoConjunto(n, consultas);
            long ordenada = CustoOrdenarEBuscar(n, consultas);
            string escolha = Escolher(n, consultas, false);
            string comOrdem = Escolher(n, consultas, true);

            Console.WriteLine($"{consultas} consultas: linear={linear} conjunto={conjunto} ordenada={ordenada}");
            Console.WriteLine($"  escolha={escolha} | com ordem={comOrdem}");
        }

        int[] dados = { 50, 10, 90, 30, 70 };

        Console.WriteLine($"linear acha 90: {BuscarComEstrategia(dados, 90, "linear")}");
        Console.WriteLine($"conjunto acha 90: {BuscarComEstrategia(dados, 90, "conjunto")}");
        Console.WriteLine($"ordenada acha 90: {BuscarComEstrategia(dados, 90, "ordenar+binaria")}");
        Console.WriteLine($"ausente: {BuscarComEstrategia(dados, 99, "ordenar+binaria")}");
        Console.WriteLine($"array intacto: {string.Join(",", dados)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static long Log2(long n)
    {
        long passos = 0;

        while (n > 0)
        {
            passos++;
            n = n / 2;
        }

        return passos;
    }

    static long CustoLinear(int n, int consultas)
    {
        return (long)n * consultas;
    }

    static long CustoConjunto(int n, int consultas)
    {
        return (long)n + consultas;
    }

    static long CustoOrdenarEBuscar(int n, int consultas)
    {
        long passos = Log2(n);
        return (long)n * passos + (long)consultas * passos;
    }

    static string Escolher(int n, int consultas, bool precisaOrdem)
    {
        long linear = CustoLinear(n, consultas);
        long ordenada = CustoOrdenarEBuscar(n, consultas);

        if (precisaOrdem)
        {
            return linear <= ordenada ? "linear" : "ordenar+binaria";
        }

        long conjunto = CustoConjunto(n, consultas);

        if (linear <= conjunto && linear <= ordenada)
        {
            return "linear";
        }

        if (conjunto <= ordenada)
        {
            return "conjunto";
        }

        return "ordenar+binaria";
    }

    static int BuscarComEstrategia(int[] dados, int alvo, string estrategia)
    {
        if (estrategia == "conjunto")
        {
            Dictionary<int, int> indices = new Dictionary<int, int>();

            for (int i = 0; i < dados.Length; i++)
            {
                if (!indices.ContainsKey(dados[i]))
                {
                    indices[dados[i]] = i;
                }
            }

            if (indices.TryGetValue(alvo, out int achado))
            {
                return achado;
            }

            return -1;
        }

        if (estrategia == "ordenar+binaria")
        {
            int[] copia = (int[])dados.Clone();
            Array.Sort(copia);

            int inicio = 0;
            int fim = copia.Length - 1;
            bool existe = false;

            while (inicio <= fim)
            {
                int meio = inicio + (fim - inicio) / 2;

                if (copia[meio] == alvo)
                {
                    existe = true;
                    break;
                }

                if (copia[meio] < alvo)
                {
                    inicio = meio + 1;
                }
                else
                {
                    fim = meio - 1;
                }
            }

            if (!existe)
            {
                return -1;
            }

            for (int i = 0; i < dados.Length; i++)
            {
                if (dados[i] == alvo)
                {
                    return i;
                }
            }

            return -1;
        }

        for (int i = 0; i < dados.Length; i++)
        {
            if (dados[i] == alvo)
            {
                return i;
            }
        }

        return -1;
    }

    static void Main()
    {
        int[] cenarios = { 1, 10, 1000, 100000 };
        int n = 1000;

        foreach (int consultas in cenarios)
        {
            long linear = CustoLinear(n, consultas);
            long conjunto = CustoConjunto(n, consultas);
            long ordenada = CustoOrdenarEBuscar(n, consultas);
            string escolha = Escolher(n, consultas, false);
            string comOrdem = Escolher(n, consultas, true);

            Console.WriteLine($"{consultas} consultas: linear={linear} conjunto={conjunto} ordenada={ordenada}");
            Console.WriteLine($"  escolha={escolha} | com ordem={comOrdem}");
        }

        int[] dados = { 50, 10, 90, 30, 70 };

        Console.WriteLine($"linear acha 90: {BuscarComEstrategia(dados, 90, "linear")}");
        Console.WriteLine($"conjunto acha 90: {BuscarComEstrategia(dados, 90, "conjunto")}");
        Console.WriteLine($"ordenada acha 90: {BuscarComEstrategia(dados, 90, "ordenar+binaria")}");
        Console.WriteLine($"ausente: {BuscarComEstrategia(dados, 99, "ordenar+binaria")}");
        Console.WriteLine($"array intacto: {string.Join(",", dados)}");
    }
}
`,
      hints: [
        'O `Escolher` compara os três custos e aplica os empates na ordem pedida usando `<=`.',
        'A estratégia `ordenar+binaria` clona o array antes de ordenar, para não destruir a ordem original.',
        'Como o índice pedido é o da ordem original, a versão ordenada precisa localizar o valor no array original depois de confirmar que ele existe.',
      ],
      tests: [
        {
          name: 'Cenarios de consulta',
          stdin: '',
          expectedStdout:
            '1 consultas: linear=1000 conjunto=1001 ordenada=10010\n' +
            '  escolha=linear | com ordem=linear\n' +
            '10 consultas: linear=10000 conjunto=1010 ordenada=10100\n' +
            '  escolha=conjunto | com ordem=linear\n' +
            '1000 consultas: linear=1000000 conjunto=2000 ordenada=20000\n' +
            '  escolha=conjunto | com ordem=ordenar+binaria\n' +
            '100000 consultas: linear=100000000 conjunto=101000 ordenada=1010000\n' +
            '  escolha=conjunto | com ordem=ordenar+binaria\n' +
            'linear acha 90: 2\nconjunto acha 90: 2\nordenada acha 90: 2\n' +
            'ausente: -1\narray intacto: 50,10,90,30,70',
        },
      ],
    },
  },
]
