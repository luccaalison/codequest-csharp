import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's07c06l01',
    title: 'Divisão e conquista',
    objective: 'Resolver um problema quebrando-o em subproblemas menores do mesmo tipo.',
    concept: [
      {
        kind: 'text',
        body:
          '**Dividir e conquistar** tem três passos: dividir o problema em partes menores do mesmo tipo, resolver cada parte, e combinar as soluções.',
      },
      {
        kind: 'table',
        headers: ['Passo', 'No merge sort'],
        rows: [
          ['dividir', 'partir o array ao meio'],
          ['conquistar', 'ordenar cada metade recursivamente'],
          ['combinar', 'intercalar as duas metades'],
        ],
      },
      {
        kind: 'code',
        code: `static long Potencia(long baseValor, int expoente)
{
    if (expoente == 0) return 1;

    long metade = Potencia(baseValor, expoente / 2);

    if (expoente % 2 == 0) return metade * metade;

    return metade * metade * baseValor;
}`,
        caption: 'Potência em `O(log n)`: o expoente cai pela metade a cada chamada.',
      },
      {
        kind: 'text',
        body:
          'O ganho aparece quando dividir **elimina trabalho**. A potência ingênua faz `n` multiplicações; a versão por divisão faz `log n`, porque calcula a metade uma vez e a reaproveita.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A combinação é onde mora o custo. Se combinar duas metades custa `O(n)` e a altura é `log n`, o total é `O(n log n)` — a assinatura do merge sort. Se combinar custa `O(1)`, o total é `O(n)`.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Toda recursão precisa de um **caso base** alcançável. Em divisão e conquista, isso significa garantir que o subproblema realmente encolhe — dividir por dois um valor que já é zero não encolhe nada.',
      },
    ],
    quiz: [
      {
        id: 's07c06l01q1',
        type: 'single',
        prompt: 'Quais são os três passos de dividir e conquistar?',
        options: [
          { id: 'a', text: 'Dividir, conquistar e combinar.', correct: true },
          { id: 'b', text: 'Ordenar, buscar e devolver.' },
          { id: 'c', text: 'Iniciar, iterar e finalizar.' },
          { id: 'd', text: 'Dividir, testar e repetir.' },
        ],
        explanation:
          'A combinação é o passo que a maioria esquece, e é justamente onde costuma estar o custo.',
      },
      {
        id: 's07c06l01q2',
        type: 'single',
        prompt: 'Por que a potência por divisão é `O(log n)`?',
        options: [
          { id: 'a', text: 'Porque o expoente cai pela metade a cada chamada.', correct: true },
          { id: 'b', text: 'Porque usa multiplicação em vez de soma.' },
          { id: 'c', text: 'Porque não usa laço.' },
          { id: 'd', text: 'Porque guarda resultados anteriores.' },
        ],
        explanation:
          'Cada nível reduz o expoente à metade, então a altura da recursão é logarítmica.',
      },
      {
        id: 's07c06l01q3',
        type: 'single',
        prompt: 'Onde costuma estar o custo em um algoritmo de divisão e conquista?',
        options: [
          { id: 'a', text: 'Na combinação das soluções parciais.', correct: true },
          { id: 'b', text: 'Na divisão.' },
          { id: 'c', text: 'No caso base.' },
          { id: 'd', text: 'Na chamada recursiva.' },
        ],
        explanation:
          'Combinar em `O(n)` com altura `log n` dá `O(n log n)`; combinar em `O(1)` dá `O(n)`.',
      },
    ],
    challenge: {
      brief:
        'Implemente quatro algoritmos por divisão e conquista, contando as chamadas de cada um.',
      requirements: [
        'Complexidade esperada indicada em cada método',
        '`Potencia(long baseValor, int expoente)` calcula em `O(log n)`, contando as chamadas em `chamadas`',
        '`PotenciaIngenua(long baseValor, int expoente)` multiplica em laço, para comparação',
        '`MaiorPorDivisao(int[] dados, int inicio, int fim)` encontra o maior dividindo ao meio, em `O(n)`',
        '`ContarInversoes(int[] dados)` conta os pares fora de ordem em `O(n log n)`, adaptando o merge sort',
        'Uma inversão é um par `i < j` com `dados[i] > dados[j]`',
        'O `ContarInversoes` não altera o array recebido',
        'Todos tratam entrada vazia ou expoente zero',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int chamadas = 0;

    // Escreva Potencia, PotenciaIngenua, MaiorPorDivisao e ContarInversoes aqui

    static void Main()
    {
        chamadas = 0;
        Console.WriteLine($"2^10 = {Potencia(2, 10)} em {chamadas} chamadas");

        chamadas = 0;
        Console.WriteLine($"2^20 = {Potencia(2, 20)} em {chamadas} chamadas");

        chamadas = 0;
        Console.WriteLine($"3^0 = {Potencia(3, 0)} em {chamadas} chamadas");

        Console.WriteLine($"ingenua 2^10 = {PotenciaIngenua(2, 10)}");
        Console.WriteLine($"conferem: {Potencia(2, 20) == PotenciaIngenua(2, 20)}");

        int[] valores = { 3, 8, 1, 9, 4, 7, 2 };
        Console.WriteLine($"maior: {MaiorPorDivisao(valores, 0, valores.Length - 1)}");

        int[] um = { 42 };
        Console.WriteLine($"maior de um: {MaiorPorDivisao(um, 0, 0)}");

        Console.WriteLine($"inversoes de 1,2,3: {ContarInversoes(new int[] { 1, 2, 3 })}");
        Console.WriteLine($"inversoes de 3,2,1: {ContarInversoes(new int[] { 3, 2, 1 })}");
        Console.WriteLine($"inversoes de 2,4,1,3,5: {ContarInversoes(new int[] { 2, 4, 1, 3, 5 })}");
        Console.WriteLine($"inversoes de vazio: {ContarInversoes(new int[0])}");

        int[] intacto = { 5, 1, 3 };
        ContarInversoes(intacto);
        Console.WriteLine($"array intacto: {string.Join(",", intacto)}");
    }
}
`,
      solution: `using System;

class Program
{
    static int chamadas = 0;

    static long Potencia(long baseValor, int expoente)
    {
        chamadas++;

        if (expoente == 0)
        {
            return 1;
        }

        long metade = Potencia(baseValor, expoente / 2);

        if (expoente % 2 == 0)
        {
            return metade * metade;
        }

        return metade * metade * baseValor;
    }

    static long PotenciaIngenua(long baseValor, int expoente)
    {
        long resultado = 1;

        for (int i = 0; i < expoente; i++)
        {
            resultado *= baseValor;
        }

        return resultado;
    }

    static int MaiorPorDivisao(int[] dados, int inicio, int fim)
    {
        if (inicio == fim)
        {
            return dados[inicio];
        }

        int meio = inicio + (fim - inicio) / 2;

        int esquerda = MaiorPorDivisao(dados, inicio, meio);
        int direita = MaiorPorDivisao(dados, meio + 1, fim);

        return Math.Max(esquerda, direita);
    }

    static long ContarInversoes(int[] dados)
    {
        if (dados.Length <= 1)
        {
            return 0;
        }

        int[] copia = (int[])dados.Clone();
        int[] auxiliar = new int[copia.Length];

        return ContarEOrdenar(copia, auxiliar, 0, copia.Length - 1);
    }

    static long ContarEOrdenar(int[] dados, int[] auxiliar, int inicio, int fim)
    {
        if (inicio >= fim)
        {
            return 0;
        }

        int meio = inicio + (fim - inicio) / 2;

        long total = ContarEOrdenar(dados, auxiliar, inicio, meio);
        total += ContarEOrdenar(dados, auxiliar, meio + 1, fim);

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
                total += meio - esquerda + 1;
            }
        }

        return total;
    }

    static void Main()
    {
        chamadas = 0;
        Console.WriteLine($"2^10 = {Potencia(2, 10)} em {chamadas} chamadas");

        chamadas = 0;
        Console.WriteLine($"2^20 = {Potencia(2, 20)} em {chamadas} chamadas");

        chamadas = 0;
        Console.WriteLine($"3^0 = {Potencia(3, 0)} em {chamadas} chamadas");

        Console.WriteLine($"ingenua 2^10 = {PotenciaIngenua(2, 10)}");
        Console.WriteLine($"conferem: {Potencia(2, 20) == PotenciaIngenua(2, 20)}");

        int[] valores = { 3, 8, 1, 9, 4, 7, 2 };
        Console.WriteLine($"maior: {MaiorPorDivisao(valores, 0, valores.Length - 1)}");

        int[] um = { 42 };
        Console.WriteLine($"maior de um: {MaiorPorDivisao(um, 0, 0)}");

        Console.WriteLine($"inversoes de 1,2,3: {ContarInversoes(new int[] { 1, 2, 3 })}");
        Console.WriteLine($"inversoes de 3,2,1: {ContarInversoes(new int[] { 3, 2, 1 })}");
        Console.WriteLine($"inversoes de 2,4,1,3,5: {ContarInversoes(new int[] { 2, 4, 1, 3, 5 })}");
        Console.WriteLine($"inversoes de vazio: {ContarInversoes(new int[0])}");

        int[] intacto = { 5, 1, 3 };
        ContarInversoes(intacto);
        Console.WriteLine($"array intacto: {string.Join(",", intacto)}");
    }
}
`,
      hints: [
        'Na contagem de inversões, quando um elemento da direita é escolhido, todos os restantes da esquerda formam inversão com ele.',
        'O número de restantes da esquerda é `meio - esquerda + 1`.',
        'Clonar o array antes de ordenar preserva o original, como o requisito pede.',
      ],
      tests: [
        {
          name: 'Quatro algoritmos',
          stdin: '',
          expectedStdout:
            '2^10 = 1024 em 5 chamadas\n2^20 = 1048576 em 6 chamadas\n3^0 = 1 em 1 chamadas\n' +
            'ingenua 2^10 = 1024\nconferem: True\n' +
            'maior: 9\nmaior de um: 42\n' +
            'inversoes de 1,2,3: 0\ninversoes de 3,2,1: 3\ninversoes de 2,4,1,3,5: 3\n' +
            'inversoes de vazio: 0\narray intacto: 5,1,3',
        },
      ],
    },
  },
  {
    id: 's07c06l02',
    title: 'Gerando subconjuntos',
    objective: 'Enumerar todas as combinações possíveis de um conjunto, com backtracking e com bits.',
    concept: [
      {
        kind: 'text',
        body:
          'Um conjunto de `n` elementos tem `2ⁿ` subconjuntos, porque cada elemento pode estar dentro ou fora. Essa observação leva às duas formas de gerá-los.',
      },
      {
        kind: 'table',
        headers: ['Técnica', 'Ideia', 'Limite prático'],
        rows: [
          ['backtracking', 'para cada elemento: incluir ou não', 'qualquer `n`'],
          ['máscara de bits', 'cada número de `0` a `2ⁿ-1` é um subconjunto', '`n` até 30'],
        ],
      },
      {
        kind: 'code',
        code: `static void Gerar(int[] dados, int i, List<int> atual, List<string> saida)
{
    if (i == dados.Length)
    {
        saida.Add(string.Join(",", atual));
        return;
    }

    Gerar(dados, i + 1, atual, saida);           // sem o elemento

    atual.Add(dados[i]);
    Gerar(dados, i + 1, atual, saida);           // com o elemento
    atual.RemoveAt(atual.Count - 1);             // desfaz
}`,
        caption: 'A última linha é o **backtrack**: desfazer a escolha antes de voltar.',
      },
      {
        kind: 'text',
        body:
          'A versão com bits é mais curta: o bit `j` do número `mascara` diz se o elemento `j` está no subconjunto. Percorrer de `0` a `2ⁿ-1` gera todos.',
      },
      {
        kind: 'code',
        code: `for (int mascara = 0; mascara < (1 << n); mascara++)
{
    for (int j = 0; j < n; j++)
    {
        if ((mascara & (1 << j)) != 0) atual.Add(dados[j]);
    }
}`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Esquecer o backtrack é o erro clássico: sem o `RemoveAt`, as escolhas se acumulam e todos os ramos seguintes ficam contaminados. O sintoma é uma saída com subconjuntos grandes demais.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '`2ⁿ` cresce rápido: com `n = 20` são um milhão de subconjuntos, com `n = 30` são um bilhão. A geração completa só é viável até cerca de 25 elementos.',
      },
    ],
    quiz: [
      {
        id: 's07c06l02q1',
        type: 'single',
        prompt: 'Quantos subconjuntos tem um conjunto de `n` elementos?',
        options: [
          { id: 'a', code: '2ⁿ', correct: true },
          { id: 'b', code: 'n²' },
          { id: 'c', code: 'n!' },
          { id: 'd', code: 'n × (n-1) / 2' },
        ],
        explanation:
          'Cada elemento tem duas possibilidades independentes: estar dentro ou fora.',
      },
      {
        id: 's07c06l02q2',
        type: 'single',
        prompt: 'O que acontece se você esquecer o backtrack?',
        options: [
          { id: 'a', text: 'As escolhas se acumulam e contaminam os ramos seguintes.', correct: true },
          { id: 'b', text: 'A recursão nunca termina.' },
          { id: 'c', text: 'Alguns subconjuntos ficam faltando.' },
          { id: 'd', text: 'Nada muda.' },
        ],
        explanation:
          'O sintoma é uma saída com subconjuntos maiores do que deveriam, incluindo elementos de ramos anteriores.',
      },
      {
        id: 's07c06l02q3',
        type: 'single',
        prompt: 'Até que tamanho a geração completa de subconjuntos é viável?',
        options: [
          { id: 'a', text: 'Cerca de 25 elementos.', correct: true },
          { id: 'b', text: 'Cerca de 100 elementos.' },
          { id: 'c', text: 'Cerca de 1000 elementos.' },
          { id: 'd', text: 'Qualquer tamanho.' },
        ],
        explanation:
          'Com 30 elementos já são mais de um bilhão de subconjuntos — inviável de enumerar.',
      },
    ],
    challenge: {
      brief:
        'Gere subconjuntos pelas duas técnicas, em ordem fixa, e resolva um problema de seleção com eles.',
      requirements: [
        'Complexidade esperada: `O(2ⁿ × n)` de tempo',
        '`PorBacktracking(int[] dados)` devolve todos os subconjuntos separados por `|`, na ordem em que o backtracking os produz **incluindo o elemento primeiro**',
        '`PorMascara(int[] dados)` devolve todos na ordem crescente da máscara, de `0` a `2ⁿ-1`',
        'Um subconjunto vazio é representado por `{}`; os demais pelos elementos separados por vírgula',
        '`ExisteSubconjuntoComSoma(int[] dados, int alvo)` diz se existe subconjunto com a soma exata',
        '`MaiorSomaAte(int[] dados, int limite)` devolve a maior soma de subconjunto que não passa do limite',
        'Os dois geradores produzem a mesma **quantidade** de subconjuntos',
        'Todos funcionam com array vazio',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Escreva PorBacktracking, PorMascara,
    // ExisteSubconjuntoComSoma e MaiorSomaAte aqui

    static void Main()
    {
        int[] dados = { 1, 2, 3 };

        Console.WriteLine($"backtracking: {PorBacktracking(dados)}");
        Console.WriteLine($"mascara: {PorMascara(dados)}");

        Console.WriteLine($"vazio backtracking: {PorBacktracking(new int[0])}");
        Console.WriteLine($"vazio mascara: {PorMascara(new int[0])}");

        int[] maior = { 3, 34, 4, 12, 5, 2 };

        Console.WriteLine($"soma 9: {ExisteSubconjuntoComSoma(maior, 9)}");
        Console.WriteLine($"soma 30: {ExisteSubconjuntoComSoma(maior, 30)}");
        Console.WriteLine($"soma 0: {ExisteSubconjuntoComSoma(maior, 0)}");

        Console.WriteLine($"maior ate 10: {MaiorSomaAte(maior, 10)}");
        Console.WriteLine($"maior ate 100: {MaiorSomaAte(maior, 100)}");
        Console.WriteLine($"maior ate 0: {MaiorSomaAte(maior, 0)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static string Formatar(List<int> atual)
    {
        if (atual.Count == 0)
        {
            return "{}";
        }

        return string.Join(",", atual);
    }

    static void Gerar(int[] dados, int i, List<int> atual, List<string> saida)
    {
        if (i == dados.Length)
        {
            saida.Add(Formatar(atual));
            return;
        }

        atual.Add(dados[i]);
        Gerar(dados, i + 1, atual, saida);
        atual.RemoveAt(atual.Count - 1);

        Gerar(dados, i + 1, atual, saida);
    }

    static string PorBacktracking(int[] dados)
    {
        List<string> saida = new List<string>();
        Gerar(dados, 0, new List<int>(), saida);

        return string.Join("|", saida);
    }

    static string PorMascara(int[] dados)
    {
        List<string> saida = new List<string>();
        int total = 1 << dados.Length;

        for (int mascara = 0; mascara < total; mascara++)
        {
            List<int> atual = new List<int>();

            for (int j = 0; j < dados.Length; j++)
            {
                if ((mascara & (1 << j)) != 0)
                {
                    atual.Add(dados[j]);
                }
            }

            saida.Add(Formatar(atual));
        }

        return string.Join("|", saida);
    }

    static bool ExisteSubconjuntoComSoma(int[] dados, int alvo)
    {
        int total = 1 << dados.Length;

        for (int mascara = 0; mascara < total; mascara++)
        {
            int soma = 0;

            for (int j = 0; j < dados.Length; j++)
            {
                if ((mascara & (1 << j)) != 0)
                {
                    soma += dados[j];
                }
            }

            if (soma == alvo)
            {
                return true;
            }
        }

        return false;
    }

    static int MaiorSomaAte(int[] dados, int limite)
    {
        int total = 1 << dados.Length;
        int melhor = 0;

        for (int mascara = 0; mascara < total; mascara++)
        {
            int soma = 0;

            for (int j = 0; j < dados.Length; j++)
            {
                if ((mascara & (1 << j)) != 0)
                {
                    soma += dados[j];
                }
            }

            if (soma <= limite && soma > melhor)
            {
                melhor = soma;
            }
        }

        return melhor;
    }

    static void Main()
    {
        int[] dados = { 1, 2, 3 };

        Console.WriteLine($"backtracking: {PorBacktracking(dados)}");
        Console.WriteLine($"mascara: {PorMascara(dados)}");

        Console.WriteLine($"vazio backtracking: {PorBacktracking(new int[0])}");
        Console.WriteLine($"vazio mascara: {PorMascara(new int[0])}");

        int[] maior = { 3, 34, 4, 12, 5, 2 };

        Console.WriteLine($"soma 9: {ExisteSubconjuntoComSoma(maior, 9)}");
        Console.WriteLine($"soma 30: {ExisteSubconjuntoComSoma(maior, 30)}");
        Console.WriteLine($"soma 0: {ExisteSubconjuntoComSoma(maior, 0)}");

        Console.WriteLine($"maior ate 10: {MaiorSomaAte(maior, 10)}");
        Console.WriteLine($"maior ate 100: {MaiorSomaAte(maior, 100)}");
        Console.WriteLine($"maior ate 0: {MaiorSomaAte(maior, 0)}");
    }
}
`,
      hints: [
        'O requisito pede o ramo "com o elemento" primeiro, então acrescente antes de chamar recursivamente.',
        '`1 << n` é `2ⁿ`, e `mascara & (1 << j)` testa se o bit `j` está ligado.',
        'A soma zero sempre existe: o subconjunto vazio.',
      ],
      tests: [
        {
          name: 'Geracao e selecao',
          stdin: '',
          expectedStdout:
            'backtracking: 1,2,3|1,2|1,3|1|2,3|2|3|{}\n' +
            'mascara: {}|1|2|1,2|3|1,3|2,3|1,2,3\n' +
            'vazio backtracking: {}\nvazio mascara: {}\n' +
            'soma 9: True\nsoma 30: False\nsoma 0: True\n' +
            'maior ate 10: 10\nmaior ate 100: 60\nmaior ate 0: 0',
        },
      ],
    },
  },
  {
    id: 's07c06l03',
    title: 'Gerando permutações',
    objective: 'Enumerar todas as ordenações possíveis, controlando a ordem de geração.',
    concept: [
      {
        kind: 'text',
        body:
          'Um conjunto de `n` elementos tem `n!` permutações. O crescimento é ainda mais violento que o dos subconjuntos: com `n = 10` já são mais de três milhões.',
      },
      {
        kind: 'output',
        code: `n = 5    ->        120
n = 10   ->  3.628.800
n = 13   ->  6.227.020.800     <- inviavel`,
      },
      {
        kind: 'code',
        code: `static void Permutar(int[] dados, int inicio, List<string> saida)
{
    if (inicio == dados.Length)
    {
        saida.Add(string.Join("", dados));
        return;
    }

    for (int i = inicio; i < dados.Length; i++)
    {
        Trocar(dados, inicio, i);
        Permutar(dados, inicio + 1, saida);
        Trocar(dados, inicio, i);        // desfaz
    }
}`,
        caption: 'A troca escolhe quem ocupa a posição atual; a segunda troca desfaz a escolha.',
      },
      {
        kind: 'text',
        body:
          'A **ordem de geração** depende da implementação. A versão por troca não produz ordem lexicográfica; para isso é preciso escolher os elementos em ordem crescente, marcando os já usados.',
      },
      {
        kind: 'table',
        headers: ['Abordagem', 'Ordem produzida', 'Custo extra'],
        rows: [
          ['troca no lugar', 'depende da implementação', 'nenhum'],
          ['com array de usados', '**lexicográfica**', '`O(n)` de espaço'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Ao comparar sua saída com uma esperada, a ordem importa. Um enunciado que pede permutações precisa **fixar a ordem** — ou pedir apenas a contagem, que não depende da implementação.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Com elementos repetidos, a geração produz duplicatas. Ordenar a entrada e pular valores iguais ao anterior no mesmo nível elimina as repetições sem gerar e descartar.',
      },
    ],
    quiz: [
      {
        id: 's07c06l03q1',
        type: 'single',
        prompt: 'Quantas permutações tem um conjunto de 10 elementos?',
        options: [
          { id: 'a', text: 'Mais de três milhões.', correct: true },
          { id: 'b', text: 'Mil.' },
          { id: 'c', text: 'Cem.' },
          { id: 'd', text: 'Mais de um bilhão.' },
        ],
        explanation:
          '10! é 3.628.800. Com 13 elementos passa de seis bilhões, e a enumeração deixa de ser viável.',
      },
      {
        id: 's07c06l03q2',
        type: 'single',
        prompt: 'Como gerar permutações em ordem lexicográfica?',
        options: [
          { id: 'a', text: 'Escolhendo os elementos em ordem crescente, com um array de usados.', correct: true },
          { id: 'b', text: 'Trocando elementos no lugar.' },
          { id: 'c', text: 'Ordenando a saída no fim.' },
          { id: 'd', text: 'Não é possível controlar a ordem.' },
        ],
        explanation:
          'A versão por troca embaralha a ordem relativa; a versão com usados preserva a sequência crescente.',
      },
      {
        id: 's07c06l03q3',
        type: 'single',
        prompt: 'Como evitar permutações duplicadas com elementos repetidos?',
        options: [
          { id: 'a', text: 'Ordenar a entrada e pular valores iguais ao anterior no mesmo nível.', correct: true },
          { id: 'b', text: 'Gerar tudo e remover duplicatas depois.' },
          { id: 'c', text: 'Usar um conjunto para a saída.' },
          { id: 'd', text: 'Não é possível.' },
        ],
        explanation:
          'As duas alternativas funcionam, mas gastam tempo gerando o que será descartado. Pular na origem é mais eficiente.',
      },
    ],
    challenge: {
      brief:
        'Gere permutações em ordem lexicográfica, conte-as, e trate o caso de elementos repetidos.',
      requirements: [
        'Complexidade esperada: `O(n! × n)` de tempo',
        '`Fatorial(int n)` devolve `n!` para `n` de `0` a `12`',
        '`PermutacoesLexicograficas(char[] letras)` devolve todas em ordem lexicográfica, separadas por `|`',
        'A geração usa um array de usados e escolhe as letras em ordem crescente',
        '`PermutacoesSemRepetir(char[] letras)` gera sem duplicatas quando há letras repetidas',
        '`ContarPermutacoes(int n)` devolve a quantidade sem gerá-las',
        'A entrada de `PermutacoesLexicograficas` já vem ordenada',
        'Ambas funcionam com array vazio, devolvendo uma permutação vazia',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Escreva Fatorial, PermutacoesLexicograficas,
    // PermutacoesSemRepetir e ContarPermutacoes aqui

    static void Main()
    {
        Console.WriteLine($"0! = {Fatorial(0)}");
        Console.WriteLine($"5! = {Fatorial(5)}");
        Console.WriteLine($"10! = {Fatorial(10)}");
        Console.WriteLine($"12! = {Fatorial(12)}");

        char[] tres = { 'a', 'b', 'c' };
        Console.WriteLine($"lexicografica: {PermutacoesLexicograficas(tres)}");

        char[] duas = { 'x', 'y' };
        Console.WriteLine($"duas: {PermutacoesLexicograficas(duas)}");

        char[] vazio = new char[0];
        Console.WriteLine($"vazio: '{PermutacoesLexicograficas(vazio)}'");

        char[] repetidas = { 'a', 'a', 'b' };
        Console.WriteLine($"com repetidas: {PermutacoesLexicograficas(repetidas)}");
        Console.WriteLine($"sem repetir: {PermutacoesSemRepetir(repetidas)}");

        Console.WriteLine($"contagem de 3: {ContarPermutacoes(3)}");
        Console.WriteLine($"contagem de 8: {ContarPermutacoes(8)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Text;

class Program
{
    static long Fatorial(int n)
    {
        long resultado = 1;

        for (int i = 2; i <= n; i++)
        {
            resultado *= i;
        }

        return resultado;
    }

    static void Gerar(char[] letras, bool[] usado, StringBuilder atual, List<string> saida, bool pularRepetidas)
    {
        if (atual.Length == letras.Length)
        {
            saida.Add(atual.ToString());
            return;
        }

        for (int i = 0; i < letras.Length; i++)
        {
            if (usado[i])
            {
                continue;
            }

            if (pularRepetidas && i > 0 && letras[i] == letras[i - 1] && !usado[i - 1])
            {
                continue;
            }

            usado[i] = true;
            atual.Append(letras[i]);

            Gerar(letras, usado, atual, saida, pularRepetidas);

            atual.Remove(atual.Length - 1, 1);
            usado[i] = false;
        }
    }

    static string PermutacoesLexicograficas(char[] letras)
    {
        List<string> saida = new List<string>();
        Gerar(letras, new bool[letras.Length], new StringBuilder(), saida, false);

        return string.Join("|", saida);
    }

    static string PermutacoesSemRepetir(char[] letras)
    {
        char[] copia = (char[])letras.Clone();
        Array.Sort(copia);

        List<string> saida = new List<string>();
        Gerar(copia, new bool[copia.Length], new StringBuilder(), saida, true);

        return string.Join("|", saida);
    }

    static long ContarPermutacoes(int n)
    {
        return Fatorial(n);
    }

    static void Main()
    {
        Console.WriteLine($"0! = {Fatorial(0)}");
        Console.WriteLine($"5! = {Fatorial(5)}");
        Console.WriteLine($"10! = {Fatorial(10)}");
        Console.WriteLine($"12! = {Fatorial(12)}");

        char[] tres = { 'a', 'b', 'c' };
        Console.WriteLine($"lexicografica: {PermutacoesLexicograficas(tres)}");

        char[] duas = { 'x', 'y' };
        Console.WriteLine($"duas: {PermutacoesLexicograficas(duas)}");

        char[] vazio = new char[0];
        Console.WriteLine($"vazio: '{PermutacoesLexicograficas(vazio)}'");

        char[] repetidas = { 'a', 'a', 'b' };
        Console.WriteLine($"com repetidas: {PermutacoesLexicograficas(repetidas)}");
        Console.WriteLine($"sem repetir: {PermutacoesSemRepetir(repetidas)}");

        Console.WriteLine($"contagem de 3: {ContarPermutacoes(3)}");
        Console.WriteLine($"contagem de 8: {ContarPermutacoes(8)}");
    }
}
`,
      hints: [
        'Um único método de geração com um sinalizador atende aos dois requisitos.',
        'A condição para pular repetidas é: a letra é igual à anterior **e** a anterior não está em uso neste ramo.',
        'Com array vazio, a condição de parada dispara imediatamente e a saída é uma única string vazia.',
      ],
      tests: [
        {
          name: 'Permutacoes em ordem',
          stdin: '',
          expectedStdout:
            '0! = 1\n5! = 120\n10! = 3628800\n12! = 479001600\n' +
            'lexicografica: abc|acb|bac|bca|cab|cba\n' +
            'duas: xy|yx\n' +
            "vazio: ''\n" +
            'com repetidas: aab|aba|aab|aba|baa|baa\n' +
            'sem repetir: aab|aba|baa\n' +
            'contagem de 3: 6\ncontagem de 8: 40320',
        },
      ],
    },
  },
  {
    id: 's07c06l04',
    title: 'N-Rainhas',
    objective: 'Podar a busca cedo, evitando explorar ramos que já se sabe inválidos.',
    concept: [
      {
        kind: 'text',
        body:
          'O problema das **N rainhas** pede posicionar `n` rainhas em um tabuleiro `n × n` sem que nenhuma ataque outra. É o exemplo canônico de **poda** em backtracking.',
      },
      {
        kind: 'text',
        body:
          'A primeira decisão de modelagem já poda muito: como duas rainhas não podem dividir uma linha, basta decidir **uma coluna por linha**. Isso reduz o espaço de `C(n², n)` para `nⁿ`.',
      },
      {
        kind: 'code',
        code: `static void Resolver(int n, int linha, int[] coluna, ref int solucoes)
{
    if (linha == n) { solucoes++; return; }

    for (int c = 0; c < n; c++)
    {
        if (Seguro(coluna, linha, c))       // poda: nem tenta se ja ataca
        {
            coluna[linha] = c;
            Resolver(n, linha + 1, coluna, ref solucoes);
        }
    }
}`,
        caption: 'A verificação **antes** da chamada recursiva é o que corta a árvore de busca.',
      },
      {
        kind: 'table',
        headers: ['n', 'Soluções', 'Chamadas com poda'],
        rows: [
          ['4', '2', '~60'],
          ['6', '4', '~400'],
          ['8', '**92**', '~2.000'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Sem poda, `n = 8` exigiria explorar `8⁸` = mais de 16 milhões de posições. Com poda, cerca de dois mil. A poda não muda a classe do algoritmo, mas muda o que é viável na prática.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O crescimento continua explosivo. Com `n = 8` é instantâneo, com `n = 12` já demora, e a partir daí fica inviável. Qualquer exercício com N rainhas precisa **fixar o `n`**.',
      },
    ],
    quiz: [
      {
        id: 's07c06l04q1',
        type: 'single',
        prompt: 'Qual decisão de modelagem já poda o espaço de busca?',
        options: [
          { id: 'a', text: 'Decidir apenas uma coluna por linha.', correct: true },
          { id: 'b', text: 'Usar um tabuleiro bidimensional.' },
          { id: 'c', text: 'Começar pelo centro.' },
          { id: 'd', text: 'Ordenar as posições.' },
        ],
        explanation:
          'Como duas rainhas não podem dividir uma linha, testar posições na mesma linha é desperdício garantido.',
      },
      {
        id: 's07c06l04q2',
        type: 'single',
        prompt: 'Onde a verificação de segurança deve acontecer?',
        options: [
          { id: 'a', text: 'Antes da chamada recursiva, para não explorar o ramo.', correct: true },
          { id: 'b', text: 'Depois da chamada, para desfazer.' },
          { id: 'c', text: 'No caso base.' },
          { id: 'd', text: 'No fim de tudo.' },
        ],
        explanation:
          'Verificar depois significa ter explorado o ramo inteiro à toa — a poda deixa de existir.',
      },
      {
        id: 's07c06l04q3',
        type: 'single',
        prompt: 'Quantas soluções existem para `n = 8`?',
        options: [
          { id: 'a', code: '92', correct: true },
          { id: 'b', code: '8' },
          { id: 'c', code: '64' },
          { id: 'd', code: '256' },
        ],
        explanation:
          'São 92 arranjos válidos, encontrados em cerca de dois mil passos com poda.',
      },
    ],
    challenge: {
      brief:
        'Resolva as N rainhas com poda, para `n` fixo em 8, e compare o custo com e sem a verificação antecipada.',
      requirements: [
        'Complexidade esperada: exponencial, com poda reduzindo drasticamente as chamadas',
        'O `n` é fixado em `8` pelo `Main` — a solução não precisa funcionar para valores maiores',
        '`Seguro(int[] coluna, int linha, int c)` verifica coluna e as duas diagonais contra as rainhas já postas',
        '`ContarComPoda(int n)` conta as soluções verificando **antes** de descer, registrando as chamadas em `chamadasComPoda`',
        '`ContarSemPoda(int n)` posiciona sem verificar e só valida no fim, registrando em `chamadasSemPoda`',
        '`PrimeiraSolucao(int n)` devolve as colunas da primeira solução encontrada, separadas por vírgula',
        'Duas rainhas estão na mesma diagonal quando a diferença de linhas é igual à diferença de colunas',
        'As duas contagens devolvem o mesmo número de soluções',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int chamadasComPoda = 0;
    static int chamadasSemPoda = 0;

    // Escreva Seguro, ContarComPoda, ContarSemPoda e PrimeiraSolucao aqui

    static void Main()
    {
        int n = 8;

        chamadasComPoda = 0;
        int comPoda = ContarComPoda(n);

        chamadasSemPoda = 0;
        int semPoda = ContarSemPoda(6);

        Console.WriteLine($"n=8 solucoes com poda: {comPoda}");
        Console.WriteLine($"n=8 chamadas com poda: {chamadasComPoda}");
        Console.WriteLine($"n=6 solucoes sem poda: {semPoda}");
        Console.WriteLine($"n=6 chamadas sem poda: {chamadasSemPoda}");

        chamadasComPoda = 0;
        Console.WriteLine($"n=6 com poda: {ContarComPoda(6)} em {chamadasComPoda} chamadas");

        Console.WriteLine($"n=4: {ContarComPoda(4)}");
        Console.WriteLine($"n=1: {ContarComPoda(1)}");
        Console.WriteLine($"n=2: {ContarComPoda(2)}");
        Console.WriteLine($"n=3: {ContarComPoda(3)}");

        Console.WriteLine($"primeira de 8: {PrimeiraSolucao(8)}");
        Console.WriteLine($"primeira de 4: {PrimeiraSolucao(4)}");
    }
}
`,
      solution: `using System;

class Program
{
    static int chamadasComPoda = 0;
    static int chamadasSemPoda = 0;

    static bool Seguro(int[] coluna, int linha, int c)
    {
        for (int anterior = 0; anterior < linha; anterior++)
        {
            if (coluna[anterior] == c)
            {
                return false;
            }

            if (linha - anterior == Math.Abs(c - coluna[anterior]))
            {
                return false;
            }
        }

        return true;
    }

    static void ResolverComPoda(int n, int linha, int[] coluna, ref int solucoes)
    {
        chamadasComPoda++;

        if (linha == n)
        {
            solucoes++;
            return;
        }

        for (int c = 0; c < n; c++)
        {
            if (Seguro(coluna, linha, c))
            {
                coluna[linha] = c;
                ResolverComPoda(n, linha + 1, coluna, ref solucoes);
            }
        }
    }

    static int ContarComPoda(int n)
    {
        int solucoes = 0;
        ResolverComPoda(n, 0, new int[n], ref solucoes);

        return solucoes;
    }

    static bool TudoSeguro(int[] coluna, int n)
    {
        for (int linha = 1; linha < n; linha++)
        {
            if (!Seguro(coluna, linha, coluna[linha]))
            {
                return false;
            }
        }

        return true;
    }

    static void ResolverSemPoda(int n, int linha, int[] coluna, ref int solucoes)
    {
        chamadasSemPoda++;

        if (linha == n)
        {
            if (TudoSeguro(coluna, n))
            {
                solucoes++;
            }

            return;
        }

        for (int c = 0; c < n; c++)
        {
            coluna[linha] = c;
            ResolverSemPoda(n, linha + 1, coluna, ref solucoes);
        }
    }

    static int ContarSemPoda(int n)
    {
        int solucoes = 0;
        ResolverSemPoda(n, 0, new int[n], ref solucoes);

        return solucoes;
    }

    static bool BuscarPrimeira(int n, int linha, int[] coluna)
    {
        if (linha == n)
        {
            return true;
        }

        for (int c = 0; c < n; c++)
        {
            if (Seguro(coluna, linha, c))
            {
                coluna[linha] = c;

                if (BuscarPrimeira(n, linha + 1, coluna))
                {
                    return true;
                }
            }
        }

        return false;
    }

    static string PrimeiraSolucao(int n)
    {
        int[] coluna = new int[n];

        if (!BuscarPrimeira(n, 0, coluna))
        {
            return "nenhuma";
        }

        return string.Join(",", coluna);
    }

    static void Main()
    {
        int n = 8;

        chamadasComPoda = 0;
        int comPoda = ContarComPoda(n);

        chamadasSemPoda = 0;
        int semPoda = ContarSemPoda(6);

        Console.WriteLine($"n=8 solucoes com poda: {comPoda}");
        Console.WriteLine($"n=8 chamadas com poda: {chamadasComPoda}");
        Console.WriteLine($"n=6 solucoes sem poda: {semPoda}");
        Console.WriteLine($"n=6 chamadas sem poda: {chamadasSemPoda}");

        chamadasComPoda = 0;
        Console.WriteLine($"n=6 com poda: {ContarComPoda(6)} em {chamadasComPoda} chamadas");

        Console.WriteLine($"n=4: {ContarComPoda(4)}");
        Console.WriteLine($"n=1: {ContarComPoda(1)}");
        Console.WriteLine($"n=2: {ContarComPoda(2)}");
        Console.WriteLine($"n=3: {ContarComPoda(3)}");

        Console.WriteLine($"primeira de 8: {PrimeiraSolucao(8)}");
        Console.WriteLine($"primeira de 4: {PrimeiraSolucao(4)}");
    }
}
`,
      hints: [
        'A diagonal é detectada por `linha - anterior == Math.Abs(c - coluna[anterior])`.',
        'A versão sem poda só valida no caso base, e por isso explora `nⁿ` posições.',
        'A busca pela primeira solução devolve `true` assim que chega ao caso base, cortando o resto.',
      ],
      tests: [
        {
          name: 'Rainhas com e sem poda',
          stdin: '',
          expectedStdout:
            'n=8 solucoes com poda: 92\nn=8 chamadas com poda: 2057\n' +
            'n=6 solucoes sem poda: 4\nn=6 chamadas sem poda: 55987\n' +
            'n=6 com poda: 4 em 153 chamadas\n' +
            'n=4: 2\nn=1: 1\nn=2: 0\nn=3: 0\n' +
            'primeira de 8: 0,4,7,5,2,6,1,3\nprimeira de 4: 1,3,0,2',
        },
      ],
    },
  },
  {
    id: 's07c06l05',
    title: 'Resolvendo um labirinto',
    objective: 'Explorar um espaço bidimensional com backtracking, marcando e desmarcando o caminho.',
    concept: [
      {
        kind: 'text',
        body:
          'Encontrar um caminho em um labirinto é backtracking em duas dimensões: em cada posição, tente cada direção; se nenhuma levar ao destino, volte.',
      },
      {
        kind: 'code',
        code: `static bool Buscar(char[,] mapa, bool[,] visitado, int l, int c)
{
    if (ForaOuBloqueado(mapa, visitado, l, c)) return false;
    if (mapa[l, c] == 'S') return true;              // chegou

    visitado[l, c] = true;                            // marca

    if (Buscar(mapa, visitado, l - 1, c)) return true;
    if (Buscar(mapa, visitado, l + 1, c)) return true;
    if (Buscar(mapa, visitado, l, c - 1)) return true;
    if (Buscar(mapa, visitado, l, c + 1)) return true;

    visitado[l, c] = false;                           // desmarca
    return false;
}`,
        caption: 'Marcar antes e desmarcar depois é o backtrack aplicado a posições.',
      },
      {
        kind: 'text',
        body:
          'A marcação de visitados é o que impede o algoritmo de andar em círculos. Sem ela, ir e voltar entre duas células livres é um laço infinito garantido.',
      },
      {
        kind: 'table',
        headers: ['Objetivo', 'Desmarcar ao voltar?'],
        rows: [
          ['saber **se** existe caminho', 'não — visitado é definitivo'],
          ['encontrar **um** caminho', 'sim — a célula pode servir a outro caminho'],
          ['contar **todos** os caminhos', '**sim** — obrigatório'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A primeira linha é uma otimização importante: para apenas responder "existe caminho?", uma célula já visitada nunca precisa ser reexaminada. Isso transforma a busca de exponencial em `O(linhas × colunas)`.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A verificação de limites precisa vir **antes** de qualquer acesso ao mapa. Testar `mapa[l, c]` com `l` negativo estoura, e a ordem das condições no `if` é o que evita isso.',
      },
    ],
    quiz: [
      {
        id: 's07c06l05q1',
        type: 'single',
        prompt: 'Por que marcar as células visitadas?',
        options: [
          { id: 'a', text: 'Para impedir que a busca ande em círculos.', correct: true },
          { id: 'b', text: 'Para contar os passos.' },
          { id: 'c', text: 'Para desenhar o caminho.' },
          { id: 'd', text: 'Para economizar memória.' },
        ],
        explanation:
          'Sem marcação, ir e voltar entre duas células livres é um laço infinito garantido.',
      },
      {
        id: 's07c06l05q2',
        type: 'single',
        prompt: 'Quando **não** desmarcar ao voltar?',
        options: [
          { id: 'a', text: 'Quando basta saber se existe caminho.', correct: true },
          { id: 'b', text: 'Quando o labirinto é pequeno.' },
          { id: 'c', text: 'Quando se quer contar caminhos.' },
          { id: 'd', text: 'Sempre se deve desmarcar.' },
        ],
        explanation:
          'Manter a marcação torna a busca `O(linhas × colunas)` em vez de exponencial.',
      },
      {
        id: 's07c06l05q3',
        type: 'single',
        prompt: 'Por que a verificação de limites vem primeiro?',
        options: [
          { id: 'a', text: 'Porque acessar o mapa com índice inválido estoura.', correct: true },
          { id: 'b', text: 'Por questão de estilo.' },
          { id: 'c', text: 'Para ser mais rápido.' },
          { id: 'd', text: 'A ordem não importa.' },
        ],
        explanation:
          'A avaliação em curto-circuito do `||` é o que garante que o acesso só acontece se os índices forem válidos.',
      },
    ],
    challenge: {
      brief:
        'Resolva um labirinto de três formas: existência de caminho, caminho concreto e contagem de todos os caminhos.',
      requirements: [
        'Complexidade esperada de `ExisteCaminho`: `O(linhas × colunas)`',
        'O mapa usa `.` para livre, `#` para parede, `E` para entrada e `S` para saída',
        '`ExisteCaminho(char[,] mapa)` diz se há caminho da entrada à saída, sem desmarcar',
        '`ComprimentoDoCaminho(char[,] mapa)` devolve o número de células do primeiro caminho encontrado, ou `-1`',
        '`ContarCaminhos(char[,] mapa)` conta todos os caminhos simples da entrada à saída, desmarcando ao voltar',
        'A ordem de tentativa é sempre cima, baixo, esquerda, direita',
        'Nenhum caminho passa duas vezes pela mesma célula',
        'Todos tratam mapas sem entrada ou sem saída',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva ExisteCaminho, ComprimentoDoCaminho e ContarCaminhos aqui

    static char[,] Montar(string[] linhas)
    {
        char[,] mapa = new char[linhas.Length, linhas[0].Length];

        for (int l = 0; l < linhas.Length; l++)
        {
            for (int c = 0; c < linhas[0].Length; c++)
            {
                mapa[l, c] = linhas[l][c];
            }
        }

        return mapa;
    }

    static void Main()
    {
        char[,] simples = Montar(new[]
        {
            "E..",
            ".#.",
            "..S",
        });

        Console.WriteLine($"simples existe: {ExisteCaminho(simples)}");
        Console.WriteLine($"simples comprimento: {ComprimentoDoCaminho(simples)}");
        Console.WriteLine($"simples caminhos: {ContarCaminhos(simples)}");

        char[,] bloqueado = Montar(new[]
        {
            "E#.",
            "##.",
            "..S",
        });

        Console.WriteLine($"bloqueado existe: {ExisteCaminho(bloqueado)}");
        Console.WriteLine($"bloqueado comprimento: {ComprimentoDoCaminho(bloqueado)}");
        Console.WriteLine($"bloqueado caminhos: {ContarCaminhos(bloqueado)}");

        char[,] corredor = Montar(new[]
        {
            "E.S",
        });

        Console.WriteLine($"corredor existe: {ExisteCaminho(corredor)}");
        Console.WriteLine($"corredor comprimento: {ComprimentoDoCaminho(corredor)}");
        Console.WriteLine($"corredor caminhos: {ContarCaminhos(corredor)}");

        char[,] semSaida = Montar(new[]
        {
            "E..",
            "...",
        });

        Console.WriteLine($"sem saida existe: {ExisteCaminho(semSaida)}");
        Console.WriteLine($"sem saida comprimento: {ComprimentoDoCaminho(semSaida)}");
    }
}
`,
      solution: `using System;

class Program
{
    static bool Invalido(char[,] mapa, bool[,] visitado, int l, int c)
    {
        if (l < 0 || l >= mapa.GetLength(0) || c < 0 || c >= mapa.GetLength(1))
        {
            return true;
        }

        if (mapa[l, c] == '#')
        {
            return true;
        }

        return visitado[l, c];
    }

    static bool AcharEntrada(char[,] mapa, out int linha, out int coluna)
    {
        for (int l = 0; l < mapa.GetLength(0); l++)
        {
            for (int c = 0; c < mapa.GetLength(1); c++)
            {
                if (mapa[l, c] == 'E')
                {
                    linha = l;
                    coluna = c;
                    return true;
                }
            }
        }

        linha = -1;
        coluna = -1;
        return false;
    }

    static bool Buscar(char[,] mapa, bool[,] visitado, int l, int c)
    {
        if (Invalido(mapa, visitado, l, c))
        {
            return false;
        }

        if (mapa[l, c] == 'S')
        {
            return true;
        }

        visitado[l, c] = true;

        if (Buscar(mapa, visitado, l - 1, c)) return true;
        if (Buscar(mapa, visitado, l + 1, c)) return true;
        if (Buscar(mapa, visitado, l, c - 1)) return true;
        if (Buscar(mapa, visitado, l, c + 1)) return true;

        return false;
    }

    static bool ExisteCaminho(char[,] mapa)
    {
        if (!AcharEntrada(mapa, out int linha, out int coluna))
        {
            return false;
        }

        bool[,] visitado = new bool[mapa.GetLength(0), mapa.GetLength(1)];

        return Buscar(mapa, visitado, linha, coluna);
    }

    static int melhorComprimento = -1;

    static bool BuscarComComprimento(char[,] mapa, bool[,] visitado, int l, int c, int passos)
    {
        if (Invalido(mapa, visitado, l, c))
        {
            return false;
        }

        if (mapa[l, c] == 'S')
        {
            melhorComprimento = passos + 1;
            return true;
        }

        visitado[l, c] = true;

        if (BuscarComComprimento(mapa, visitado, l - 1, c, passos + 1)) return true;
        if (BuscarComComprimento(mapa, visitado, l + 1, c, passos + 1)) return true;
        if (BuscarComComprimento(mapa, visitado, l, c - 1, passos + 1)) return true;
        if (BuscarComComprimento(mapa, visitado, l, c + 1, passos + 1)) return true;

        visitado[l, c] = false;
        return false;
    }

    static int ComprimentoDoCaminho(char[,] mapa)
    {
        if (!AcharEntrada(mapa, out int linha, out int coluna))
        {
            return -1;
        }

        melhorComprimento = -1;
        bool[,] visitado = new bool[mapa.GetLength(0), mapa.GetLength(1)];

        if (!BuscarComComprimento(mapa, visitado, linha, coluna, 0))
        {
            return -1;
        }

        return melhorComprimento;
    }

    static int ContarTodos(char[,] mapa, bool[,] visitado, int l, int c)
    {
        if (Invalido(mapa, visitado, l, c))
        {
            return 0;
        }

        if (mapa[l, c] == 'S')
        {
            return 1;
        }

        visitado[l, c] = true;

        int total = 0;

        total += ContarTodos(mapa, visitado, l - 1, c);
        total += ContarTodos(mapa, visitado, l + 1, c);
        total += ContarTodos(mapa, visitado, l, c - 1);
        total += ContarTodos(mapa, visitado, l, c + 1);

        visitado[l, c] = false;

        return total;
    }

    static int ContarCaminhos(char[,] mapa)
    {
        if (!AcharEntrada(mapa, out int linha, out int coluna))
        {
            return 0;
        }

        bool[,] visitado = new bool[mapa.GetLength(0), mapa.GetLength(1)];

        return ContarTodos(mapa, visitado, linha, coluna);
    }

    static char[,] Montar(string[] linhas)
    {
        char[,] mapa = new char[linhas.Length, linhas[0].Length];

        for (int l = 0; l < linhas.Length; l++)
        {
            for (int c = 0; c < linhas[0].Length; c++)
            {
                mapa[l, c] = linhas[l][c];
            }
        }

        return mapa;
    }

    static void Main()
    {
        char[,] simples = Montar(new[]
        {
            "E..",
            ".#.",
            "..S",
        });

        Console.WriteLine($"simples existe: {ExisteCaminho(simples)}");
        Console.WriteLine($"simples comprimento: {ComprimentoDoCaminho(simples)}");
        Console.WriteLine($"simples caminhos: {ContarCaminhos(simples)}");

        char[,] bloqueado = Montar(new[]
        {
            "E#.",
            "##.",
            "..S",
        });

        Console.WriteLine($"bloqueado existe: {ExisteCaminho(bloqueado)}");
        Console.WriteLine($"bloqueado comprimento: {ComprimentoDoCaminho(bloqueado)}");
        Console.WriteLine($"bloqueado caminhos: {ContarCaminhos(bloqueado)}");

        char[,] corredor = Montar(new[]
        {
            "E.S",
        });

        Console.WriteLine($"corredor existe: {ExisteCaminho(corredor)}");
        Console.WriteLine($"corredor comprimento: {ComprimentoDoCaminho(corredor)}");
        Console.WriteLine($"corredor caminhos: {ContarCaminhos(corredor)}");

        char[,] semSaida = Montar(new[]
        {
            "E..",
            "...",
        });

        Console.WriteLine($"sem saida existe: {ExisteCaminho(semSaida)}");
        Console.WriteLine($"sem saida comprimento: {ComprimentoDoCaminho(semSaida)}");
    }
}
`,
      hints: [
        'Um método `Invalido` compartilhado concentra as três condições: fora do mapa, parede, ou já visitado.',
        'O `ExisteCaminho` **não** desmarca, o que o torna linear no tamanho do mapa.',
        'O `ContarCaminhos` desmarca sempre, porque a mesma célula pode fazer parte de vários caminhos distintos.',
      ],
      tests: [
        {
          name: 'Tres labirintos',
          stdin: '',
          expectedStdout:
            'simples existe: True\nsimples comprimento: 5\nsimples caminhos: 2\n' +
            'bloqueado existe: False\nbloqueado comprimento: -1\nbloqueado caminhos: 0\n' +
            'corredor existe: True\ncorredor comprimento: 3\ncorredor caminhos: 1\n' +
            'sem saida existe: False\nsem saida comprimento: -1',
        },
      ],
    },
  },
  {
    id: 's07c06l06',
    title: 'Memoização',
    objective: 'Eliminar o recálculo de subproblemas guardando os resultados já obtidos.',
    concept: [
      {
        kind: 'text',
        body:
          '**Memoização** é guardar o resultado de cada subproblema na primeira vez que ele é resolvido. Toda chamada seguinte com a mesma entrada devolve o valor guardado.',
      },
      {
        kind: 'compare',
        good: `static long Fib(int n, Dictionary<int,long> memo)
{
    if (n <= 1) return n;

    if (memo.TryGetValue(n, out long v)) return v;

    long r = Fib(n-1, memo) + Fib(n-2, memo);
    memo[n] = r;

    return r;
}
// O(n)`,
        bad: `static long Fib(int n)
{
    if (n <= 1) return n;

    return Fib(n-1) + Fib(n-2);
}
// O(2ⁿ)`,
        goodLabel: 'Com memo',
        badLabel: 'Recalculando tudo',
      },
      {
        kind: 'output',
        code: `fib(30) ingenuo:  2.692.537 chamadas
fib(30) com memo:        59 chamadas
fib(80) com memo:   instantaneo (seria inviavel sem memo)`,
      },
      {
        kind: 'text',
        body:
          'A transformação é dramática porque o número de subproblemas **distintos** é pequeno. O Fibonacci de `n` tem apenas `n` subproblemas; a versão ingênua resolve cada um incontáveis vezes.',
      },
      {
        kind: 'table',
        headers: ['Condição para memoizar', 'Significa'],
        rows: [
          ['subproblemas se repetem', 'há o que economizar'],
          ['a função é **pura**', 'a mesma entrada dá sempre a mesma saída'],
          ['a entrada é representável como chave', 'dá para guardar em dicionário ou array'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Memoizar uma função com efeitos colaterais quebra o programa: a segunda chamada devolve o valor guardado **sem executar o efeito**. Só funções puras podem ser memoizadas com segurança.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Quando a entrada é um inteiro em faixa conhecida, um array é melhor que dicionário: acesso mais rápido e sem espalhamento. Use um valor sentinela — `-1`, por exemplo — para marcar "ainda não calculado".',
      },
    ],
    quiz: [
      {
        id: 's07c06l06q1',
        type: 'single',
        prompt: 'Por que a memoização transforma `O(2ⁿ)` em `O(n)` no Fibonacci?',
        options: [
          { id: 'a', text: 'Porque existem apenas `n` subproblemas distintos.', correct: true },
          { id: 'b', text: 'Porque elimina a recursão.' },
          { id: 'c', text: 'Porque usa menos memória.' },
          { id: 'd', text: 'Porque evita a soma.' },
        ],
        explanation:
          'A versão ingênua resolve cada um desses `n` subproblemas um número exponencial de vezes.',
      },
      {
        id: 's07c06l06q2',
        type: 'single',
        prompt: 'Qual função **não** pode ser memoizada com segurança?',
        options: [
          { id: 'a', text: 'Uma que tem efeitos colaterais.', correct: true },
          { id: 'b', text: 'Uma recursiva.' },
          { id: 'c', text: 'Uma que devolve `long`.' },
          { id: 'd', text: 'Uma com dois parâmetros.' },
        ],
        explanation:
          'A segunda chamada devolveria o valor guardado sem executar o efeito, mudando o comportamento do programa.',
      },
      {
        id: 's07c06l06q3',
        type: 'single',
        prompt: 'Quando usar array em vez de dicionário para o memo?',
        options: [
          { id: 'a', text: 'Quando a entrada é um inteiro em faixa conhecida.', correct: true },
          { id: 'b', text: 'Quando há muitos subproblemas.' },
          { id: 'c', text: 'Quando a função é recursiva.' },
          { id: 'd', text: 'Nunca.' },
        ],
        explanation:
          'O acesso por índice é mais rápido e não passa por espalhamento. Um sentinela marca o que ainda não foi calculado.',
      },
    ],
    challenge: {
      brief:
        'Compare versões ingênuas e memoizadas de três funções recursivas, contando as chamadas de cada uma.',
      requirements: [
        'Complexidade esperada: `O(n)` com memoização, exponencial sem',
        '`FibIngenuo(int n)` calcula sem memo, contando chamadas em `chamadasIngenuo`',
        '`FibComMemo(int n, long[] memo)` usa um array com `-1` como sentinela, contando em `chamadasComMemo`',
        '`ContarEscadas(int degraus, long[] memo)` conta de quantas formas subir uma escada dando passos de 1 ou 2 degraus',
        '`Combinacoes(int n, int k, long[,] memo)` calcula o binomial com memoização em matriz',
        'O memo é alocado uma vez e passado nas chamadas',
        '`Combinacoes` usa `-1` como sentinela e trata os casos base `k == 0` e `k == n`',
        'Todos funcionam com entrada zero',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int chamadasIngenuo = 0;
    static int chamadasComMemo = 0;

    // Escreva FibIngenuo, FibComMemo, ContarEscadas e Combinacoes aqui

    static long[] NovoMemo(int tamanho)
    {
        long[] memo = new long[tamanho + 1];
        for (int i = 0; i <= tamanho; i++) memo[i] = -1;
        return memo;
    }

    static long[,] NovaMatriz(int linhas, int colunas)
    {
        long[,] memo = new long[linhas + 1, colunas + 1];
        for (int i = 0; i <= linhas; i++)
            for (int j = 0; j <= colunas; j++)
                memo[i, j] = -1;
        return memo;
    }

    static void Main()
    {
        chamadasIngenuo = 0;
        Console.WriteLine($"fib(20) ingenuo: {FibIngenuo(20)} em {chamadasIngenuo} chamadas");

        chamadasIngenuo = 0;
        Console.WriteLine($"fib(30) ingenuo: {FibIngenuo(30)} em {chamadasIngenuo} chamadas");

        chamadasComMemo = 0;
        Console.WriteLine($"fib(30) com memo: {FibComMemo(30, NovoMemo(30))} em {chamadasComMemo} chamadas");

        chamadasComMemo = 0;
        Console.WriteLine($"fib(80) com memo: {FibComMemo(80, NovoMemo(80))} em {chamadasComMemo} chamadas");

        chamadasComMemo = 0;
        Console.WriteLine($"fib(0): {FibComMemo(0, NovoMemo(0))}");

        Console.WriteLine($"escadas de 1: {ContarEscadas(1, NovoMemo(1))}");
        Console.WriteLine($"escadas de 5: {ContarEscadas(5, NovoMemo(5))}");
        Console.WriteLine($"escadas de 30: {ContarEscadas(30, NovoMemo(30))}");
        Console.WriteLine($"escadas de 0: {ContarEscadas(0, NovoMemo(0))}");

        Console.WriteLine($"C(5,2): {Combinacoes(5, 2, NovaMatriz(5, 2))}");
        Console.WriteLine($"C(30,15): {Combinacoes(30, 15, NovaMatriz(30, 15))}");
        Console.WriteLine($"C(10,0): {Combinacoes(10, 0, NovaMatriz(10, 0))}");
        Console.WriteLine($"C(10,10): {Combinacoes(10, 10, NovaMatriz(10, 10))}");
    }
}
`,
      solution: `using System;

class Program
{
    static int chamadasIngenuo = 0;
    static int chamadasComMemo = 0;

    static long FibIngenuo(int n)
    {
        chamadasIngenuo++;

        if (n <= 1)
        {
            return n;
        }

        return FibIngenuo(n - 1) + FibIngenuo(n - 2);
    }

    static long FibComMemo(int n, long[] memo)
    {
        chamadasComMemo++;

        if (n <= 1)
        {
            return n;
        }

        if (memo[n] != -1)
        {
            return memo[n];
        }

        memo[n] = FibComMemo(n - 1, memo) + FibComMemo(n - 2, memo);

        return memo[n];
    }

    static long ContarEscadas(int degraus, long[] memo)
    {
        if (degraus < 0)
        {
            return 0;
        }

        if (degraus <= 1)
        {
            return 1;
        }

        if (memo[degraus] != -1)
        {
            return memo[degraus];
        }

        memo[degraus] = ContarEscadas(degraus - 1, memo) + ContarEscadas(degraus - 2, memo);

        return memo[degraus];
    }

    static long Combinacoes(int n, int k, long[,] memo)
    {
        if (k == 0 || k == n)
        {
            return 1;
        }

        if (memo[n, k] != -1)
        {
            return memo[n, k];
        }

        memo[n, k] = Combinacoes(n - 1, k - 1, memo) + Combinacoes(n - 1, k, memo);

        return memo[n, k];
    }

    static long[] NovoMemo(int tamanho)
    {
        long[] memo = new long[tamanho + 1];
        for (int i = 0; i <= tamanho; i++) memo[i] = -1;
        return memo;
    }

    static long[,] NovaMatriz(int linhas, int colunas)
    {
        long[,] memo = new long[linhas + 1, colunas + 1];
        for (int i = 0; i <= linhas; i++)
            for (int j = 0; j <= colunas; j++)
                memo[i, j] = -1;
        return memo;
    }

    static void Main()
    {
        chamadasIngenuo = 0;
        Console.WriteLine($"fib(20) ingenuo: {FibIngenuo(20)} em {chamadasIngenuo} chamadas");

        chamadasIngenuo = 0;
        Console.WriteLine($"fib(30) ingenuo: {FibIngenuo(30)} em {chamadasIngenuo} chamadas");

        chamadasComMemo = 0;
        Console.WriteLine($"fib(30) com memo: {FibComMemo(30, NovoMemo(30))} em {chamadasComMemo} chamadas");

        chamadasComMemo = 0;
        Console.WriteLine($"fib(80) com memo: {FibComMemo(80, NovoMemo(80))} em {chamadasComMemo} chamadas");

        chamadasComMemo = 0;
        Console.WriteLine($"fib(0): {FibComMemo(0, NovoMemo(0))}");

        Console.WriteLine($"escadas de 1: {ContarEscadas(1, NovoMemo(1))}");
        Console.WriteLine($"escadas de 5: {ContarEscadas(5, NovoMemo(5))}");
        Console.WriteLine($"escadas de 30: {ContarEscadas(30, NovoMemo(30))}");
        Console.WriteLine($"escadas de 0: {ContarEscadas(0, NovoMemo(0))}");

        Console.WriteLine($"C(5,2): {Combinacoes(5, 2, NovaMatriz(5, 2))}");
        Console.WriteLine($"C(30,15): {Combinacoes(30, 15, NovaMatriz(30, 15))}");
        Console.WriteLine($"C(10,0): {Combinacoes(10, 0, NovaMatriz(10, 0))}");
        Console.WriteLine($"C(10,10): {Combinacoes(10, 10, NovaMatriz(10, 10))}");
    }
}
`,
      hints: [
        'A verificação do memo vem **depois** do caso base e **antes** do cálculo.',
        'As escadas seguem exatamente a recorrência de Fibonacci, com casos base diferentes.',
        'O binomial usa a relação de Pascal: `C(n,k) = C(n-1,k-1) + C(n-1,k)`.',
      ],
      tests: [
        {
          name: 'Ingenuo contra memoizado',
          stdin: '',
          expectedStdout:
            'fib(20) ingenuo: 6765 em 21891 chamadas\n' +
            'fib(30) ingenuo: 832040 em 2692537 chamadas\n' +
            'fib(30) com memo: 832040 em 59 chamadas\n' +
            'fib(80) com memo: 23416728348467685 em 159 chamadas\n' +
            'fib(0): 0\n' +
            'escadas de 1: 1\nescadas de 5: 8\nescadas de 30: 1346269\nescadas de 0: 1\n' +
            'C(5,2): 10\nC(30,15): 155117520\nC(10,0): 1\nC(10,10): 1',
        },
      ],
    },
  },
  {
    id: 's07c06l07',
    title: 'Programação dinâmica ascendente',
    objective: 'Resolver os subproblemas do menor para o maior, eliminando a recursão.',
    concept: [
      {
        kind: 'text',
        body:
          'A memoização é **descendente**: começa no problema grande e desce. A programação dinâmica **ascendente** inverte: começa nos casos base e sobe, preenchendo uma tabela.',
      },
      {
        kind: 'compare',
        good: `long[] dp = new long[n + 1];
dp[0] = 0;
dp[1] = 1;

for (int i = 2; i <= n; i++)
{
    dp[i] = dp[i-1] + dp[i-2];
}

return dp[n];`,
        bad: `// descendente: recursao + memo
long Fib(int n, long[] memo)
{
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    memo[n] = Fib(n-1, memo) + Fib(n-2, memo);
    return memo[n];
}`,
        goodLabel: 'Ascendente: laço',
        badLabel: 'Descendente: recursão',
      },
      {
        kind: 'table',
        headers: ['', 'Descendente', 'Ascendente'],
        rows: [
          ['forma', 'recursão + memo', 'laço + tabela'],
          ['calcula', 'só o necessário', 'tudo até `n`'],
          ['risco de pilha', '**sim**', 'não'],
          ['fácil de otimizar espaço', 'não', '**sim**'],
        ],
      },
      {
        kind: 'text',
        body:
          'A vantagem prática mais importante é a ausência de pilha: uma recursão de profundidade 50.000 estoura, enquanto um laço de 50.000 iterações não tem problema nenhum.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A versão ascendente permite a otimização de espaço que a descendente não permite. Se `dp[i]` só depende de `dp[i-1]` e `dp[i-2]`, duas variáveis substituem a tabela inteira — `O(1)` de espaço.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A ascendente calcula **tudo**, mesmo o que não seria alcançado. Quando o espaço de estados é enorme e apenas uma fração é atingível, a descendente com memo pode ser bem mais rápida.',
      },
    ],
    quiz: [
      {
        id: 's07c06l07q1',
        type: 'single',
        prompt: 'Qual é a diferença fundamental entre as duas abordagens?',
        options: [
          { id: 'a', text: 'A descendente começa no problema grande; a ascendente começa nos casos base.', correct: true },
          { id: 'b', text: 'A ascendente é sempre mais rápida.' },
          { id: 'c', text: 'A descendente não usa memória.' },
          { id: 'd', text: 'Só a ascendente resolve DP.' },
        ],
        explanation:
          'São dois caminhos para o mesmo resultado, com propriedades práticas diferentes.',
      },
      {
        id: 's07c06l07q2',
        type: 'single',
        prompt: 'Qual é a principal vantagem prática da ascendente?',
        options: [
          { id: 'a', text: 'Não há risco de estouro de pilha.', correct: true },
          { id: 'b', text: 'Usa menos memória sempre.' },
          { id: 'c', text: 'É mais fácil de escrever.' },
          { id: 'd', text: 'Calcula menos subproblemas.' },
        ],
        explanation:
          'Um laço de 50.000 iterações é trivial; uma recursão de 50.000 níveis estoura a pilha.',
      },
      {
        id: 's07c06l07q3',
        type: 'single',
        prompt: 'Quando a descendente com memo é preferível?',
        options: [
          { id: 'a', text: 'Quando o espaço de estados é enorme e só uma fração é alcançável.', correct: true },
          { id: 'b', text: 'Quando `n` é pequeno.' },
          { id: 'c', text: 'Quando há muitos casos base.' },
          { id: 'd', text: 'Nunca.' },
        ],
        explanation:
          'A ascendente preenche a tabela inteira, inclusive estados que nunca seriam visitados.',
      },
    ],
    challenge: {
      brief:
        'Resolva os mesmos problemas de forma ascendente, incluindo a otimização de espaço que ela permite.',
      requirements: [
        'Complexidade esperada: `O(n)` de tempo',
        '`FibComTabela(int n)` usa uma tabela de tamanho `n + 1`, com espaço `O(n)`',
        '`FibComDuasVariaveis(int n)` usa espaço `O(1)`',
        '`EscadasComTabela(int degraus)` conta as formas de subir dando passos de 1, 2 ou 3 degraus',
        '`MaiorSubsequenciaCrescente(int[] dados)` devolve o comprimento da maior subsequência crescente, em `O(n²)`',
        'A subsequência não precisa ser contígua',
        'Todas as versões são iterativas, sem recursão',
        'As duas versões do Fibonacci devolvem sempre o mesmo valor',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva FibComTabela, FibComDuasVariaveis,
    // EscadasComTabela e MaiorSubsequenciaCrescente aqui

    static void Main()
    {
        int[] valores = { 0, 1, 10, 50, 80 };

        foreach (int n in valores)
        {
            long tabela = FibComTabela(n);
            long duas = FibComDuasVariaveis(n);

            Console.WriteLine($"fib({n}): tabela={tabela} duas={duas} iguais={tabela == duas}");
        }

        Console.WriteLine($"escadas 1,2,3 de 0: {EscadasComTabela(0)}");
        Console.WriteLine($"escadas 1,2,3 de 3: {EscadasComTabela(3)}");
        Console.WriteLine($"escadas 1,2,3 de 10: {EscadasComTabela(10)}");
        Console.WriteLine($"escadas 1,2,3 de 30: {EscadasComTabela(30)}");

        Console.WriteLine($"crescente de 10,9,2,5,3,7,101,18: {MaiorSubsequenciaCrescente(new int[] { 10, 9, 2, 5, 3, 7, 101, 18 })}");
        Console.WriteLine($"crescente de 1,2,3: {MaiorSubsequenciaCrescente(new int[] { 1, 2, 3 })}");
        Console.WriteLine($"crescente de 3,2,1: {MaiorSubsequenciaCrescente(new int[] { 3, 2, 1 })}");
        Console.WriteLine($"crescente de vazio: {MaiorSubsequenciaCrescente(new int[0])}");
        Console.WriteLine($"crescente de 7: {MaiorSubsequenciaCrescente(new int[] { 7 })}");
    }
}
`,
      solution: `using System;

class Program
{
    static long FibComTabela(int n)
    {
        if (n <= 1)
        {
            return n;
        }

        long[] dp = new long[n + 1];
        dp[0] = 0;
        dp[1] = 1;

        for (int i = 2; i <= n; i++)
        {
            dp[i] = dp[i - 1] + dp[i - 2];
        }

        return dp[n];
    }

    static long FibComDuasVariaveis(int n)
    {
        if (n <= 1)
        {
            return n;
        }

        long anterior = 0;
        long atual = 1;

        for (int i = 2; i <= n; i++)
        {
            long proximo = anterior + atual;
            anterior = atual;
            atual = proximo;
        }

        return atual;
    }

    static long EscadasComTabela(int degraus)
    {
        if (degraus == 0)
        {
            return 1;
        }

        long[] dp = new long[degraus + 1];
        dp[0] = 1;

        for (int i = 1; i <= degraus; i++)
        {
            dp[i] = dp[i - 1];

            if (i >= 2)
            {
                dp[i] += dp[i - 2];
            }

            if (i >= 3)
            {
                dp[i] += dp[i - 3];
            }
        }

        return dp[degraus];
    }

    static int MaiorSubsequenciaCrescente(int[] dados)
    {
        if (dados.Length == 0)
        {
            return 0;
        }

        int[] dp = new int[dados.Length];
        int melhor = 1;

        for (int i = 0; i < dados.Length; i++)
        {
            dp[i] = 1;

            for (int j = 0; j < i; j++)
            {
                if (dados[j] < dados[i] && dp[j] + 1 > dp[i])
                {
                    dp[i] = dp[j] + 1;
                }
            }

            if (dp[i] > melhor)
            {
                melhor = dp[i];
            }
        }

        return melhor;
    }

    static void Main()
    {
        int[] valores = { 0, 1, 10, 50, 80 };

        foreach (int n in valores)
        {
            long tabela = FibComTabela(n);
            long duas = FibComDuasVariaveis(n);

            Console.WriteLine($"fib({n}): tabela={tabela} duas={duas} iguais={tabela == duas}");
        }

        Console.WriteLine($"escadas 1,2,3 de 0: {EscadasComTabela(0)}");
        Console.WriteLine($"escadas 1,2,3 de 3: {EscadasComTabela(3)}");
        Console.WriteLine($"escadas 1,2,3 de 10: {EscadasComTabela(10)}");
        Console.WriteLine($"escadas 1,2,3 de 30: {EscadasComTabela(30)}");

        Console.WriteLine($"crescente de 10,9,2,5,3,7,101,18: {MaiorSubsequenciaCrescente(new int[] { 10, 9, 2, 5, 3, 7, 101, 18 })}");
        Console.WriteLine($"crescente de 1,2,3: {MaiorSubsequenciaCrescente(new int[] { 1, 2, 3 })}");
        Console.WriteLine($"crescente de 3,2,1: {MaiorSubsequenciaCrescente(new int[] { 3, 2, 1 })}");
        Console.WriteLine($"crescente de vazio: {MaiorSubsequenciaCrescente(new int[0])}");
        Console.WriteLine($"crescente de 7: {MaiorSubsequenciaCrescente(new int[] { 7 })}");
      }
}
`,
      hints: [
        'Nas escadas, os `if` de limite evitam acessar índices negativos nos primeiros degraus.',
        'Na subsequência crescente, `dp[i]` é o comprimento da maior subsequência que **termina** em `i`.',
        'A resposta final é o maior valor da tabela, não `dp[n-1]` — a melhor subsequência pode terminar em qualquer posição.',
      ],
      tests: [
        {
          name: 'DP ascendente',
          stdin: '',
          expectedStdout:
            'fib(0): tabela=0 duas=0 iguais=True\n' +
            'fib(1): tabela=1 duas=1 iguais=True\n' +
            'fib(10): tabela=55 duas=55 iguais=True\n' +
            'fib(50): tabela=12586269025 duas=12586269025 iguais=True\n' +
            'fib(80): tabela=23416728348467685 duas=23416728348467685 iguais=True\n' +
            'escadas 1,2,3 de 0: 1\nescadas 1,2,3 de 3: 4\nescadas 1,2,3 de 10: 274\n' +
            'escadas 1,2,3 de 30: 53798080\n' +
            'crescente de 10,9,2,5,3,7,101,18: 4\ncrescente de 1,2,3: 3\n' +
            'crescente de 3,2,1: 1\ncrescente de vazio: 0\ncrescente de 7: 1',
        },
      ],
    },
  },
  {
    id: 's07c06l08',
    title: 'Problema da mochila',
    objective: 'Resolver o problema de otimização mais clássico da programação dinâmica.',
    concept: [
      {
        kind: 'text',
        body:
          'Na **mochila 0/1**, cada item tem peso e valor, a mochila tem capacidade limitada, e cada item pode ser levado **uma vez ou nenhuma**. O objetivo é maximizar o valor.',
      },
      {
        kind: 'code',
        code: `// dp[i, c] = melhor valor usando os i primeiros itens com capacidade c
for (int i = 1; i <= n; i++)
{
    for (int c = 0; c <= capacidade; c++)
    {
        dp[i, c] = dp[i - 1, c];                    // nao levar

        if (peso[i - 1] <= c)
        {
            int levando = dp[i - 1, c - peso[i - 1]] + valor[i - 1];
            dp[i, c] = Math.Max(dp[i, c], levando);  // levar
        }
    }
}`,
        caption: 'Duas escolhas por item e por capacidade: levar ou não levar.',
      },
      {
        kind: 'table',
        headers: ['Aspecto', 'Valor'],
        rows: [
          ['tempo', '`O(n × capacidade)`'],
          ['espaço', '`O(n × capacidade)`, ou `O(capacidade)` otimizado'],
          ['abordagem gulosa', '**não funciona** para 0/1'],
        ],
      },
      {
        kind: 'text',
        body:
          'A última linha merece atenção: pegar sempre o item de melhor relação valor por peso **não** dá a resposta ótima na mochila 0/1. Ela funciona apenas na variante fracionária, em que dá para levar parte de um item.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A otimização de espaço usa uma única linha percorrida **de trás para frente**. A ordem inversa garante que `dp[c - peso]` ainda contém o valor da linha anterior, que é exatamente o que a recorrência exige.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A complexidade `O(n × capacidade)` é **pseudopolinomial**: ela depende do valor numérico da capacidade, não do tamanho da entrada. Com capacidade de um bilhão, a tabela é inviável mesmo com poucos itens.',
      },
    ],
    quiz: [
      {
        id: 's07c06l08q1',
        type: 'single',
        prompt: 'A abordagem gulosa por melhor relação valor-peso resolve a mochila 0/1?',
        options: [
          { id: 'a', text: 'Não: ela só funciona na variante fracionária.', correct: true },
          { id: 'b', text: 'Sim, sempre.' },
          { id: 'c', text: 'Sim, se os pesos forem inteiros.' },
          { id: 'd', text: 'Sim, se a capacidade for grande.' },
        ],
        explanation:
          'Na versão 0/1 o item precisa entrar inteiro, e a melhor combinação pode não incluir o de melhor razão.',
      },
      {
        id: 's07c06l08q2',
        type: 'single',
        prompt: 'Por que a otimização de espaço percorre a capacidade de trás para frente?',
        options: [
          { id: 'a', text: 'Para que `dp[c - peso]` ainda contenha o valor da linha anterior.', correct: true },
          { id: 'b', text: 'Para evitar índice negativo.' },
          { id: 'c', text: 'Por questão de desempenho.' },
          { id: 'd', text: 'A ordem não importa.' },
        ],
        explanation:
          'De frente para trás, a posição já teria sido atualizada nesta iteração, permitindo usar o item duas vezes.',
      },
      {
        id: 's07c06l08q3',
        type: 'single',
        prompt: 'O que significa a complexidade ser pseudopolinomial?',
        options: [
          { id: 'a', text: 'Ela depende do valor numérico da capacidade, não do tamanho da entrada.', correct: true },
          { id: 'b', text: 'Ela é aproximada.' },
          { id: 'c', text: 'Ela vale só no caso médio.' },
          { id: 'd', text: 'Ela é polinomial de grau alto.' },
        ],
        explanation:
          'Com poucos itens mas capacidade de um bilhão, a tabela seria inviável — apesar da entrada ser minúscula.',
      },
    ],
    challenge: {
      brief:
        'Resolva a mochila 0/1 em duas versões, recupere os itens escolhidos, e mostre por que a abordagem gulosa falha.',
      requirements: [
        'Complexidade esperada: `O(n × capacidade)` de tempo',
        '`MochilaComMatriz(int[] pesos, int[] valores, int capacidade)` devolve o melhor valor, com espaço `O(n × capacidade)`',
        '`MochilaComLinha(int[] pesos, int[] valores, int capacidade)` devolve o mesmo com espaço `O(capacidade)`',
        '`ItensEscolhidos(int[] pesos, int[] valores, int capacidade)` devolve os índices dos itens da solução ótima, em ordem crescente, ou `nenhum`',
        '`GulosoPorRazao(int[] pesos, int[] valores, int capacidade)` implementa a heurística gulosa, para comparação',
        'A versão com uma linha percorre a capacidade de trás para frente',
        'A recuperação dos itens percorre a matriz de trás para frente comparando com a linha anterior',
        'As duas versões exatas devolvem sempre o mesmo valor',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Escreva MochilaComMatriz, MochilaComLinha,
    // ItensEscolhidos e GulosoPorRazao aqui

    static void Main()
    {
        int[] pesos = { 10, 20, 30 };
        int[] valores = { 60, 100, 120 };
        int capacidade = 50;

        int comMatriz = MochilaComMatriz(pesos, valores, capacidade);
        int comLinha = MochilaComLinha(pesos, valores, capacidade);

        Console.WriteLine($"otimo com matriz: {comMatriz}");
        Console.WriteLine($"otimo com linha: {comLinha}");
        Console.WriteLine($"iguais: {comMatriz == comLinha}");
        Console.WriteLine($"itens: {ItensEscolhidos(pesos, valores, capacidade)}");
        Console.WriteLine($"guloso: {GulosoPorRazao(pesos, valores, capacidade)}");

        // caso em que o guloso erra
        int[] pesos2 = { 3, 4, 5 };
        int[] valores2 = { 30, 50, 60 };

        Console.WriteLine($"otimo 2: {MochilaComMatriz(pesos2, valores2, 8)}");
        Console.WriteLine($"guloso 2: {GulosoPorRazao(pesos2, valores2, 8)}");
        Console.WriteLine($"itens 2: {ItensEscolhidos(pesos2, valores2, 8)}");

        Console.WriteLine($"capacidade zero: {MochilaComMatriz(pesos, valores, 0)}");
        Console.WriteLine($"itens capacidade zero: {ItensEscolhidos(pesos, valores, 0)}");
        Console.WriteLine($"sem itens: {MochilaComMatriz(new int[0], new int[0], 10)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static int MochilaComMatriz(int[] pesos, int[] valores, int capacidade)
    {
        int n = pesos.Length;
        int[,] dp = new int[n + 1, capacidade + 1];

        for (int i = 1; i <= n; i++)
        {
            for (int c = 0; c <= capacidade; c++)
            {
                dp[i, c] = dp[i - 1, c];

                if (pesos[i - 1] <= c)
                {
                    int levando = dp[i - 1, c - pesos[i - 1]] + valores[i - 1];

                    if (levando > dp[i, c])
                    {
                        dp[i, c] = levando;
                    }
                }
            }
        }

        return dp[n, capacidade];
    }

    static int MochilaComLinha(int[] pesos, int[] valores, int capacidade)
    {
        int[] dp = new int[capacidade + 1];

        for (int i = 0; i < pesos.Length; i++)
        {
            for (int c = capacidade; c >= pesos[i]; c--)
            {
                int levando = dp[c - pesos[i]] + valores[i];

                if (levando > dp[c])
                {
                    dp[c] = levando;
                }
            }
        }

        return dp[capacidade];
    }

    static string ItensEscolhidos(int[] pesos, int[] valores, int capacidade)
    {
        int n = pesos.Length;
        int[,] dp = new int[n + 1, capacidade + 1];

        for (int i = 1; i <= n; i++)
        {
            for (int c = 0; c <= capacidade; c++)
            {
                dp[i, c] = dp[i - 1, c];

                if (pesos[i - 1] <= c)
                {
                    int levando = dp[i - 1, c - pesos[i - 1]] + valores[i - 1];

                    if (levando > dp[i, c])
                    {
                        dp[i, c] = levando;
                    }
                }
            }
        }

        List<int> escolhidos = new List<int>();

        int capacidadeAtual = capacidade;

        for (int i = n; i > 0; i--)
        {
            if (dp[i, capacidadeAtual] != dp[i - 1, capacidadeAtual])
            {
                escolhidos.Add(i - 1);
                capacidadeAtual -= pesos[i - 1];
            }
        }

        if (escolhidos.Count == 0)
        {
            return "nenhum";
        }

        escolhidos.Reverse();

        return string.Join(",", escolhidos);
    }

    static int GulosoPorRazao(int[] pesos, int[] valores, int capacidade)
    {
        int n = pesos.Length;
        int[] ordem = new int[n];

        for (int i = 0; i < n; i++)
        {
            ordem[i] = i;
        }

        Array.Sort(ordem, (a, b) =>
        {
            double razaoA = (double)valores[a] / pesos[a];
            double razaoB = (double)valores[b] / pesos[b];

            return razaoB.CompareTo(razaoA);
        });

        int restante = capacidade;
        int total = 0;

        foreach (int i in ordem)
        {
            if (pesos[i] <= restante)
            {
                restante -= pesos[i];
                total += valores[i];
            }
        }

        return total;
    }

    static void Main()
    {
        int[] pesos = { 10, 20, 30 };
        int[] valores = { 60, 100, 120 };
        int capacidade = 50;

        int comMatriz = MochilaComMatriz(pesos, valores, capacidade);
        int comLinha = MochilaComLinha(pesos, valores, capacidade);

        Console.WriteLine($"otimo com matriz: {comMatriz}");
        Console.WriteLine($"otimo com linha: {comLinha}");
        Console.WriteLine($"iguais: {comMatriz == comLinha}");
        Console.WriteLine($"itens: {ItensEscolhidos(pesos, valores, capacidade)}");
        Console.WriteLine($"guloso: {GulosoPorRazao(pesos, valores, capacidade)}");

        int[] pesos2 = { 3, 4, 5 };
        int[] valores2 = { 30, 50, 60 };

        Console.WriteLine($"otimo 2: {MochilaComMatriz(pesos2, valores2, 8)}");
        Console.WriteLine($"guloso 2: {GulosoPorRazao(pesos2, valores2, 8)}");
        Console.WriteLine($"itens 2: {ItensEscolhidos(pesos2, valores2, 8)}");

        Console.WriteLine($"capacidade zero: {MochilaComMatriz(pesos, valores, 0)}");
        Console.WriteLine($"itens capacidade zero: {ItensEscolhidos(pesos, valores, 0)}");
        Console.WriteLine($"sem itens: {MochilaComMatriz(new int[0], new int[0], 10)}");
    }
}
`,
      hints: [
        'Na recuperação, o item `i` foi levado se `dp[i, c]` for diferente de `dp[i-1, c]`.',
        'Ao confirmar que um item foi levado, reduza a capacidade pelo peso dele antes de continuar.',
        'A lista sai de trás para frente, então inverta antes de formatar.',
      ],
      tests: [
        {
          name: 'Mochila e guloso',
          stdin: '',
          expectedStdout:
            'otimo com matriz: 220\notimo com linha: 220\niguais: True\n' +
            'itens: 1,2\nguloso: 160\n' +
            'otimo 2: 90\nguloso 2: 80\nitens 2: 0,2\n' +
            'capacidade zero: 0\nitens capacidade zero: nenhum\nsem itens: 0',
        },
      ],
    },
  },
  {
    id: 's07c06l09',
    title: 'Prática: troco mínimo',
    objective: 'Resolver um problema de otimização com DP e reconhecer quando a solução gulosa falha.',
    concept: [
      {
        kind: 'text',
        body:
          'Dar troco com o **menor número de moedas** parece simples: pegue sempre a maior moeda que couber. Essa heurística funciona para o sistema de moedas usual — e falha para outros.',
      },
      {
        kind: 'output',
        code: `moedas [1, 3, 4],  troco 6

guloso:  4 + 1 + 1     =  3 moedas
otimo:   3 + 3         =  2 moedas`,
      },
      {
        kind: 'text',
        body:
          'A solução exata é DP ascendente: `dp[v]` é o menor número de moedas para formar o valor `v`. Cada valor é resolvido tentando todas as moedas.',
      },
      {
        kind: 'code',
        code: `int[] dp = new int[valor + 1];
Array.Fill(dp, int.MaxValue);
dp[0] = 0;

for (int v = 1; v <= valor; v++)
{
    foreach (int moeda in moedas)
    {
        if (moeda <= v && dp[v - moeda] != int.MaxValue)
        {
            dp[v] = Math.Min(dp[v], dp[v - moeda] + 1);
        }
    }
}`,
        caption: 'A verificação contra o sentinela evita somar `1` a um valor impossível.',
      },
      {
        kind: 'table',
        headers: ['Abordagem', 'Custo', 'Sempre ótima?'],
        rows: [
          ['gulosa', '`O(n)`', '**não**'],
          ['DP', '`O(valor × moedas)`', '**sim**'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O sentinela `int.MaxValue` exige cuidado: somar `1` a ele estoura e vira um número negativo, que passaria no `Math.Min` e corromperia a tabela. A verificação antes da soma é obrigatória.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um sistema de moedas em que o guloso sempre acerta chama-se **canônico**. O sistema brasileiro é canônico; conjuntos arbitrários de moedas frequentemente não são.',
      },
    ],
    quiz: [
      {
        id: 's07c06l09q1',
        type: 'single',
        prompt: 'Por que a solução gulosa falha com moedas `[1, 3, 4]` e troco `6`?',
        options: [
          { id: 'a', text: 'Pegar o 4 primeiro obriga a completar com dois de 1, somando três moedas.', correct: true },
          { id: 'b', text: 'Porque 6 não é divisível por 4.' },
          { id: 'c', text: 'Porque falta a moeda de 2.' },
          { id: 'd', text: 'Ela não falha.' },
        ],
        explanation:
          'Dois de 3 resolvem com duas moedas, mas o guloso nunca considera essa combinação.',
      },
      {
        id: 's07c06l09q2',
        type: 'single',
        prompt: 'Por que verificar o sentinela antes de somar?',
        options: [
          { id: 'a', text: 'Porque somar `1` a `int.MaxValue` estoura e vira negativo.', correct: true },
          { id: 'b', text: 'Para acelerar o laço.' },
          { id: 'c', text: 'Para evitar índice inválido.' },
          { id: 'd', text: 'Não é necessário.' },
        ],
        explanation:
          'O valor negativo passaria no `Math.Min` e corromperia toda a tabela a partir dali.',
      },
      {
        id: 's07c06l09q3',
        type: 'single',
        prompt: 'O que é um sistema de moedas canônico?',
        options: [
          { id: 'a', text: 'Um em que a estratégia gulosa sempre dá a solução ótima.', correct: true },
          { id: 'b', text: 'Um com moedas em potências de dois.' },
          { id: 'c', text: 'Um com exatamente cinco moedas.' },
          { id: 'd', text: 'Um sem a moeda de 1.' },
        ],
        explanation:
          'O sistema brasileiro é canônico; conjuntos arbitrários frequentemente não são.',
      },
    ],
    challenge: {
      brief:
        'Resolva o troco mínimo com DP, recupere as moedas usadas, e demonstre um caso em que o guloso erra.',
      requirements: [
        'Complexidade esperada: `O(valor × moedas)` de tempo',
        '`TrocoMinimo(int[] moedas, int valor)` devolve o menor número de moedas, ou `-1` se impossível',
        '`MoedasUsadas(int[] moedas, int valor)` devolve as moedas da solução ótima em ordem crescente, ou `impossivel`',
        '`TrocoGuloso(int[] moedas, int valor)` implementa a heurística, ou `-1` se ela não conseguir',
        '`ContarFormas(int[] moedas, int valor)` conta de quantas formas distintas o valor pode ser formado',
        'Combinações com as mesmas moedas em ordem diferente contam como uma só',
        'O sentinela é verificado antes de qualquer soma',
        'Todos tratam valor zero',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Escreva TrocoMinimo, MoedasUsadas, TrocoGuloso e ContarFormas aqui

    static void Main()
    {
        int[] brasileiro = { 1, 5, 10, 25, 50 };
        int[] problematico = { 1, 3, 4 };
        int[] semUm = { 5, 10 };

        Console.WriteLine($"brasileiro 63 dp: {TrocoMinimo(brasileiro, 63)}");
        Console.WriteLine($"brasileiro 63 guloso: {TrocoGuloso(brasileiro, 63)}");
        Console.WriteLine($"brasileiro 63 moedas: {MoedasUsadas(brasileiro, 63)}");

        Console.WriteLine($"problematico 6 dp: {TrocoMinimo(problematico, 6)}");
        Console.WriteLine($"problematico 6 guloso: {TrocoGuloso(problematico, 6)}");
        Console.WriteLine($"problematico 6 moedas: {MoedasUsadas(problematico, 6)}");

        Console.WriteLine($"sem um, valor 3: {TrocoMinimo(semUm, 3)}");
        Console.WriteLine($"sem um, valor 3 moedas: {MoedasUsadas(semUm, 3)}");
        Console.WriteLine($"sem um, valor 15: {TrocoMinimo(semUm, 15)}");

        Console.WriteLine($"valor zero: {TrocoMinimo(brasileiro, 0)}");
        Console.WriteLine($"valor zero moedas: {MoedasUsadas(brasileiro, 0)}");

        Console.WriteLine($"formas de 5 com 1,2,5: {ContarFormas(new int[] { 1, 2, 5 }, 5)}");
        Console.WriteLine($"formas de 4 com 1,2,3: {ContarFormas(new int[] { 1, 2, 3 }, 4)}");
        Console.WriteLine($"formas de 0: {ContarFormas(brasileiro, 0)}");
        Console.WriteLine($"formas de 3 com 5,10: {ContarFormas(semUm, 3)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static int TrocoMinimo(int[] moedas, int valor)
    {
        int[] dp = new int[valor + 1];

        for (int v = 1; v <= valor; v++)
        {
            dp[v] = int.MaxValue;
        }

        for (int v = 1; v <= valor; v++)
        {
            foreach (int moeda in moedas)
            {
                if (moeda <= v && dp[v - moeda] != int.MaxValue)
                {
                    int candidato = dp[v - moeda] + 1;

                    if (candidato < dp[v])
                    {
                        dp[v] = candidato;
                    }
                }
            }
        }

        return dp[valor] == int.MaxValue ? -1 : dp[valor];
    }

    static string MoedasUsadas(int[] moedas, int valor)
    {
        int[] dp = new int[valor + 1];
        int[] escolha = new int[valor + 1];

        for (int v = 1; v <= valor; v++)
        {
            dp[v] = int.MaxValue;
            escolha[v] = -1;
        }

        for (int v = 1; v <= valor; v++)
        {
            foreach (int moeda in moedas)
            {
                if (moeda <= v && dp[v - moeda] != int.MaxValue)
                {
                    int candidato = dp[v - moeda] + 1;

                    if (candidato < dp[v])
                    {
                        dp[v] = candidato;
                        escolha[v] = moeda;
                    }
                }
            }
        }

        if (dp[valor] == int.MaxValue)
        {
            return "impossivel";
        }

        if (valor == 0)
        {
            return "nenhuma";
        }

        List<int> usadas = new List<int>();
        int atual = valor;

        while (atual > 0)
        {
            usadas.Add(escolha[atual]);
            atual -= escolha[atual];
        }

        usadas.Sort();

        return string.Join(",", usadas);
    }

    static int TrocoGuloso(int[] moedas, int valor)
    {
        int[] ordenadas = (int[])moedas.Clone();
        Array.Sort(ordenadas);
        Array.Reverse(ordenadas);

        int restante = valor;
        int total = 0;

        foreach (int moeda in ordenadas)
        {
            while (moeda <= restante)
            {
                restante -= moeda;
                total++;
            }
        }

        return restante == 0 ? total : -1;
    }

    static long ContarFormas(int[] moedas, int valor)
    {
        long[] dp = new long[valor + 1];
        dp[0] = 1;

        foreach (int moeda in moedas)
        {
            for (int v = moeda; v <= valor; v++)
            {
                dp[v] += dp[v - moeda];
            }
        }

        return dp[valor];
    }

    static void Main()
    {
        int[] brasileiro = { 1, 5, 10, 25, 50 };
        int[] problematico = { 1, 3, 4 };
        int[] semUm = { 5, 10 };

        Console.WriteLine($"brasileiro 63 dp: {TrocoMinimo(brasileiro, 63)}");
        Console.WriteLine($"brasileiro 63 guloso: {TrocoGuloso(brasileiro, 63)}");
        Console.WriteLine($"brasileiro 63 moedas: {MoedasUsadas(brasileiro, 63)}");

        Console.WriteLine($"problematico 6 dp: {TrocoMinimo(problematico, 6)}");
        Console.WriteLine($"problematico 6 guloso: {TrocoGuloso(problematico, 6)}");
        Console.WriteLine($"problematico 6 moedas: {MoedasUsadas(problematico, 6)}");

        Console.WriteLine($"sem um, valor 3: {TrocoMinimo(semUm, 3)}");
        Console.WriteLine($"sem um, valor 3 moedas: {MoedasUsadas(semUm, 3)}");
        Console.WriteLine($"sem um, valor 15: {TrocoMinimo(semUm, 15)}");

        Console.WriteLine($"valor zero: {TrocoMinimo(brasileiro, 0)}");
        Console.WriteLine($"valor zero moedas: {MoedasUsadas(brasileiro, 0)}");

        Console.WriteLine($"formas de 5 com 1,2,5: {ContarFormas(new int[] { 1, 2, 5 }, 5)}");
        Console.WriteLine($"formas de 4 com 1,2,3: {ContarFormas(new int[] { 1, 2, 3 }, 4)}");
        Console.WriteLine($"formas de 0: {ContarFormas(brasileiro, 0)}");
        Console.WriteLine($"formas de 3 com 5,10: {ContarFormas(semUm, 3)}");
    }
}
`,
      hints: [
        'Guardar qual moeda produziu o melhor resultado em cada valor permite reconstruir a solução.',
        'No `ContarFormas`, o laço externo é sobre as **moedas** — é isso que evita contar a mesma combinação em ordens diferentes.',
        'Inverter os laços do `ContarFormas` contaria permutações em vez de combinações.',
      ],
      tests: [
        {
          name: 'Troco com DP e guloso',
          stdin: '',
          expectedStdout:
            'brasileiro 63 dp: 5\nbrasileiro 63 guloso: 5\nbrasileiro 63 moedas: 1,1,1,10,50\n' +
            'problematico 6 dp: 2\nproblematico 6 guloso: 3\nproblematico 6 moedas: 3,3\n' +
            'sem um, valor 3: -1\nsem um, valor 3 moedas: impossivel\nsem um, valor 15: 2\n' +
            'valor zero: 0\nvalor zero moedas: nenhuma\n' +
            'formas de 5 com 1,2,5: 4\nformas de 4 com 1,2,3: 4\nformas de 0: 1\nformas de 3 com 5,10: 0',
        },
      ],
    },
  },
  {
    id: 's07c06l10',
    title: 'Checkpoint: exploração e DP',
    objective: 'Escolher entre backtracking, memoização e DP ascendente conforme a estrutura do problema.',
    concept: [
      {
        kind: 'text',
        body:
          'Backtracking e programação dinâmica resolvem problemas parecidos por caminhos diferentes. A escolha depende de duas propriedades do problema.',
      },
      {
        kind: 'table',
        headers: ['Pergunta', 'Se sim'],
        rows: [
          ['os subproblemas se **repetem**?', 'memoização ou DP'],
          ['a solução ótima usa soluções ótimas dos subproblemas?', 'DP se aplica'],
          ['preciso de **todas** as soluções?', 'backtracking'],
          ['o espaço de estados é enorme mas esparso?', 'memoização'],
          ['preciso do valor ótimo apenas?', 'DP ascendente'],
        ],
      },
      {
        kind: 'text',
        body:
          'A segunda linha tem nome: **subestrutura ótima**. Sem ela, DP não se aplica — e o problema pode exigir explorar combinações que a decomposição não captura.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O caminho natural de desenvolvimento é: escrever a recursão ingênua, confirmar que ela está correta, acrescentar memoização, e — se valer a pena — converter para ascendente. Cada passo preserva a correção do anterior.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Nem todo problema exponencial vira polinomial com DP. Gerar todas as permutações continua `O(n!)` com ou sem memo, porque **não há subproblemas repetidos** — cada permutação é única.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Ao formular a recorrência, comece definindo o que `dp[i]` **significa** em uma frase. Se você não consegue escrever essa frase, ainda não entendeu o subproblema — e o código não vai sair.',
      },
    ],
    quiz: [
      {
        id: 's07c06l10q1',
        type: 'single',
        prompt: 'O que é subestrutura ótima?',
        options: [
          { id: 'a', text: 'A solução ótima do problema usa soluções ótimas dos subproblemas.', correct: true },
          { id: 'b', text: 'O problema tem poucos subproblemas.' },
          { id: 'c', text: 'Os subproblemas são independentes.' },
          { id: 'd', text: 'A recursão tem profundidade limitada.' },
        ],
        explanation:
          'Sem essa propriedade, decompor o problema não leva à resposta certa, e DP não se aplica.',
      },
      {
        id: 's07c06l10q2',
        type: 'single',
        prompt: 'Por que memoizar a geração de permutações não ajuda?',
        options: [
          { id: 'a', text: 'Porque não há subproblemas repetidos — cada permutação é única.', correct: true },
          { id: 'b', text: 'Porque a recursão é profunda demais.' },
          { id: 'c', text: 'Porque a entrada é um array.' },
          { id: 'd', text: 'Memoizar ajuda.' },
        ],
        explanation:
          'Memoização economiza recálculo. Sem repetição, não há o que economizar.',
      },
      {
        id: 's07c06l10q3',
        type: 'single',
        prompt: 'Qual é o caminho natural de desenvolvimento de uma solução de DP?',
        options: [
          { id: 'a', text: 'Recursão ingênua, memoização, e então ascendente se valer a pena.', correct: true },
          { id: 'b', text: 'Direto para a versão ascendente otimizada.' },
          { id: 'c', text: 'Guloso primeiro, DP depois.' },
          { id: 'd', text: 'Tabela primeiro, recorrência depois.' },
        ],
        explanation:
          'Cada passo preserva a correção do anterior, o que torna os erros muito mais fáceis de localizar.',
      },
    ],
    challenge: {
      brief:
        'Resolva quatro problemas escolhendo a técnica adequada a cada um, e justifique a escolha pela saída.',
      requirements: [
        '`Escolher(bool repetem, bool subestruturaOtima, bool precisaTodas)` devolve `backtracking`, `dp` ou `forca bruta`',
        'Precisando de todas as soluções, a resposta é `backtracking`',
        'Havendo repetição e subestrutura ótima, a resposta é `dp`',
        'Nos demais casos, `forca bruta`',
        '`CaminhosNaGrade(int linhas, int colunas)` conta os caminhos do canto superior esquerdo ao inferior direito, andando só para baixo e para a direita, com DP',
        '`MaiorSubsequenciaComum(string a, string b)` devolve o comprimento da maior subsequência comum, com DP',
        '`ParticoesIguais(int[] dados)` diz se o array pode ser dividido em dois grupos de soma igual',
        '`TodasAsCombinacoes(int[] dados, int tamanho)` devolve todas as combinações de tamanho fixo, em ordem crescente de índices, separadas por `|`',
        'Cada solução usa exatamente a técnica indicada pelo seu tipo de problema',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Escreva Escolher, CaminhosNaGrade, MaiorSubsequenciaComum,
    // ParticoesIguais e TodasAsCombinacoes aqui

    static void Main()
    {
        Console.WriteLine($"repetem+otima: {Escolher(true, true, false)}");
        Console.WriteLine($"precisa todas: {Escolher(true, true, true)}");
        Console.WriteLine($"sem repeticao: {Escolher(false, true, false)}");
        Console.WriteLine($"sem subestrutura: {Escolher(true, false, false)}");

        Console.WriteLine($"caminhos 3x3: {CaminhosNaGrade(3, 3)}");
        Console.WriteLine($"caminhos 1x1: {CaminhosNaGrade(1, 1)}");
        Console.WriteLine($"caminhos 3x7: {CaminhosNaGrade(3, 7)}");
        Console.WriteLine($"caminhos 10x10: {CaminhosNaGrade(10, 10)}");

        Console.WriteLine($"lcs abcde/ace: {MaiorSubsequenciaComum("abcde", "ace")}");
        Console.WriteLine($"lcs abc/abc: {MaiorSubsequenciaComum("abc", "abc")}");
        Console.WriteLine($"lcs abc/def: {MaiorSubsequenciaComum("abc", "def")}");
        Console.WriteLine($"lcs vazio: {MaiorSubsequenciaComum("", "abc")}");

        Console.WriteLine($"particoes 1,5,11,5: {ParticoesIguais(new int[] { 1, 5, 11, 5 })}");
        Console.WriteLine($"particoes 1,2,3,5: {ParticoesIguais(new int[] { 1, 2, 3, 5 })}");
        Console.WriteLine($"particoes vazio: {ParticoesIguais(new int[0])}");

        Console.WriteLine($"combinacoes de 4 tomadas 2: {TodasAsCombinacoes(new int[] { 1, 2, 3, 4 }, 2)}");
        Console.WriteLine($"combinacoes de 3 tomadas 3: {TodasAsCombinacoes(new int[] { 1, 2, 3 }, 3)}");
        Console.WriteLine($"combinacoes de 3 tomadas 0: {TodasAsCombinacoes(new int[] { 1, 2, 3 }, 0)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static string Escolher(bool repetem, bool subestruturaOtima, bool precisaTodas)
    {
        if (precisaTodas)
        {
            return "backtracking";
        }

        if (repetem && subestruturaOtima)
        {
            return "dp";
        }

        return "forca bruta";
    }

    static long CaminhosNaGrade(int linhas, int colunas)
    {
        long[,] dp = new long[linhas, colunas];

        for (int l = 0; l < linhas; l++)
        {
            for (int c = 0; c < colunas; c++)
            {
                if (l == 0 || c == 0)
                {
                    dp[l, c] = 1;
                }
                else
                {
                    dp[l, c] = dp[l - 1, c] + dp[l, c - 1];
                }
            }
        }

        return dp[linhas - 1, colunas - 1];
    }

    static int MaiorSubsequenciaComum(string a, string b)
    {
        int[,] dp = new int[a.Length + 1, b.Length + 1];

        for (int i = 1; i <= a.Length; i++)
        {
            for (int j = 1; j <= b.Length; j++)
            {
                if (a[i - 1] == b[j - 1])
                {
                    dp[i, j] = dp[i - 1, j - 1] + 1;
                }
                else
                {
                    dp[i, j] = Math.Max(dp[i - 1, j], dp[i, j - 1]);
                }
            }
        }

        return dp[a.Length, b.Length];
    }

    static bool ParticoesIguais(int[] dados)
    {
        int total = 0;

        foreach (int valor in dados)
        {
            total += valor;
        }

        if (total % 2 != 0)
        {
            return false;
        }

        int alvo = total / 2;
        bool[] dp = new bool[alvo + 1];
        dp[0] = true;

        foreach (int valor in dados)
        {
            for (int v = alvo; v >= valor; v--)
            {
                if (dp[v - valor])
                {
                    dp[v] = true;
                }
            }
        }

        return dp[alvo];
    }

    static void GerarCombinacoes(int[] dados, int tamanho, int inicio, List<int> atual, List<string> saida)
    {
        if (atual.Count == tamanho)
        {
            saida.Add(atual.Count == 0 ? "{}" : string.Join(",", atual));
            return;
        }

        for (int i = inicio; i < dados.Length; i++)
        {
            atual.Add(dados[i]);
            GerarCombinacoes(dados, tamanho, i + 1, atual, saida);
            atual.RemoveAt(atual.Count - 1);
        }
    }

    static string TodasAsCombinacoes(int[] dados, int tamanho)
    {
        List<string> saida = new List<string>();
        GerarCombinacoes(dados, tamanho, 0, new List<int>(), saida);

        return string.Join("|", saida);
    }

    static void Main()
    {
        Console.WriteLine($"repetem+otima: {Escolher(true, true, false)}");
        Console.WriteLine($"precisa todas: {Escolher(true, true, true)}");
        Console.WriteLine($"sem repeticao: {Escolher(false, true, false)}");
        Console.WriteLine($"sem subestrutura: {Escolher(true, false, false)}");

        Console.WriteLine($"caminhos 3x3: {CaminhosNaGrade(3, 3)}");
        Console.WriteLine($"caminhos 1x1: {CaminhosNaGrade(1, 1)}");
        Console.WriteLine($"caminhos 3x7: {CaminhosNaGrade(3, 7)}");
        Console.WriteLine($"caminhos 10x10: {CaminhosNaGrade(10, 10)}");

        Console.WriteLine($"lcs abcde/ace: {MaiorSubsequenciaComum("abcde", "ace")}");
        Console.WriteLine($"lcs abc/abc: {MaiorSubsequenciaComum("abc", "abc")}");
        Console.WriteLine($"lcs abc/def: {MaiorSubsequenciaComum("abc", "def")}");
        Console.WriteLine($"lcs vazio: {MaiorSubsequenciaComum("", "abc")}");

        Console.WriteLine($"particoes 1,5,11,5: {ParticoesIguais(new int[] { 1, 5, 11, 5 })}");
        Console.WriteLine($"particoes 1,2,3,5: {ParticoesIguais(new int[] { 1, 2, 3, 5 })}");
        Console.WriteLine($"particoes vazio: {ParticoesIguais(new int[0])}");

        Console.WriteLine($"combinacoes de 4 tomadas 2: {TodasAsCombinacoes(new int[] { 1, 2, 3, 4 }, 2)}");
        Console.WriteLine($"combinacoes de 3 tomadas 3: {TodasAsCombinacoes(new int[] { 1, 2, 3 }, 3)}");
        Console.WriteLine($"combinacoes de 3 tomadas 0: {TodasAsCombinacoes(new int[] { 1, 2, 3 }, 0)}");
    }
}
`,
      hints: [
        'O `ParticoesIguais` é a mochila disfarçada: procure um subconjunto que some metade do total.',
        'A primeira linha e a primeira coluna da grade têm exatamente um caminho cada.',
        'As combinações usam `i + 1` na chamada recursiva, o que garante índices crescentes e evita repetições.',
      ],
      tests: [
        {
          name: 'Quatro tecnicas',
          stdin: '',
          expectedStdout:
            'repetem+otima: dp\nprecisa todas: backtracking\nsem repeticao: forca bruta\n' +
            'sem subestrutura: forca bruta\n' +
            'caminhos 3x3: 6\ncaminhos 1x1: 1\ncaminhos 3x7: 28\ncaminhos 10x10: 48620\n' +
            'lcs abcde/ace: 3\nlcs abc/abc: 3\nlcs abc/def: 0\nlcs vazio: 0\n' +
            'particoes 1,5,11,5: True\nparticoes 1,2,3,5: False\nparticoes vazio: True\n' +
            'combinacoes de 4 tomadas 2: 1,2|1,3|1,4|2,3|2,4|3,4\n' +
            'combinacoes de 3 tomadas 3: 1,2,3\ncombinacoes de 3 tomadas 0: {}',
        },
      ],
    },
  },
]
