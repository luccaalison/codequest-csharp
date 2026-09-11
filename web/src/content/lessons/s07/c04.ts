import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's07c04l01',
    title: 'Dois ponteiros',
    objective: 'Resolver em uma passagem problemas que pareceriam exigir laços aninhados.',
    concept: [
      {
        kind: 'text',
        body:
          'A técnica de **dois ponteiros** mantém dois índices caminhando pelo array e usa a relação entre eles para eliminar possibilidades. Ela transforma muitos problemas `O(n²)` em `O(n)`.',
      },
      {
        kind: 'compare',
        good: `int esquerda = 0, direita = n - 1;

while (esquerda < direita)
{
    int soma = a[esquerda] + a[direita];

    if (soma == alvo) return true;
    if (soma < alvo) esquerda++;
    else             direita--;
}
// O(n)`,
        bad: `for (int i = 0; i < n; i++)
    for (int j = i + 1; j < n; j++)
        if (a[i] + a[j] == alvo)
            return true;
// O(n²)`,
        goodLabel: 'Dois ponteiros, uma passagem',
        badLabel: 'Todos os pares',
      },
      {
        kind: 'text',
        body:
          'O que torna a versão rápida correta é o **array estar ordenado**. Se a soma é pequena demais, só aumentar o menor ajuda; se é grande demais, só diminuir o maior ajuda. Cada passo elimina um candidato com certeza.',
      },
      {
        kind: 'table',
        headers: ['Arranjo dos ponteiros', 'Resolve'],
        rows: [
          ['extremos convergindo', 'par com soma alvo, palíndromo, água entre paredes'],
          ['ambos do início, um mais rápido', 'remover duplicatas, mover zeros'],
          ['um por array', 'intercalar dois arrays ordenados'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A segunda linha é a mais útil no dia a dia: um ponteiro **lê** e outro **escreve**, o que permite filtrar ou compactar um array no lugar, sem alocar nada.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A convergência exige que o movimento de cada ponteiro seja **justificado**. Se você não consegue argumentar por que descartar aquele candidato é seguro, a técnica pode estar pulando a resposta certa.',
      },
    ],
    quiz: [
      {
        id: 's07c04l01q1',
        type: 'single',
        prompt: 'O que torna a busca de par com soma alvo correta em `O(n)`?',
        options: [
          { id: 'a', text: 'O array estar ordenado, o que torna cada descarte seguro.', correct: true },
          { id: 'b', text: 'O array ter tamanho par.' },
          { id: 'c', text: 'Os valores serem positivos.' },
          { id: 'd', text: 'Não haver repetições.' },
        ],
        explanation:
          'Sem ordenação, mover um ponteiro não garante que a resposta não estava do lado descartado.',
      },
      {
        id: 's07c04l01q2',
        type: 'single',
        prompt: 'Qual arranjo permite filtrar um array no lugar?',
        options: [
          { id: 'a', text: 'Um ponteiro lê e outro escreve, ambos do início.', correct: true },
          { id: 'b', text: 'Dois ponteiros nos extremos.' },
          { id: 'c', text: 'Um ponteiro em cada array.' },
          { id: 'd', text: 'Dois ponteiros no mesmo índice.' },
        ],
        explanation:
          'O de escrita avança só quando o elemento é mantido, compactando o resultado sem alocar memória.',
      },
      {
        id: 's07c04l01q3',
        type: 'single',
        prompt: 'Qual é a condição para o movimento de um ponteiro ser válido?',
        options: [
          { id: 'a', text: 'Ser possível argumentar que o candidato descartado não pode ser a resposta.', correct: true },
          { id: 'b', text: 'O ponteiro se mover uma posição por vez.' },
          { id: 'c', text: 'Os ponteiros nunca se cruzarem.' },
          { id: 'd', text: 'O array ter tamanho ímpar.' },
        ],
        explanation:
          'Sem essa justificativa, a passagem única pode simplesmente pular a resposta correta.',
      },
    ],
    challenge: {
      brief:
        'Resolva quatro problemas com dois ponteiros, todos em uma passagem e sem memória extra.',
      requirements: [
        'Complexidade esperada de todos: `O(n)` de tempo, `O(1)` de espaço',
        '`ParComSoma(int[] ordenado, int alvo)` devolve `i,j` dos índices do par, ou `-1,-1`',
        '`EhPalindromo(string texto)` verifica com ponteiros nos extremos',
        '`RemoverDuplicatas(int[] ordenado)` compacta o array no lugar e devolve o novo tamanho',
        '`MoverZerosParaOFim(int[] dados)` move todos os zeros para o fim preservando a ordem dos demais',
        'Nenhum dos quatro usa laço aninhado nem aloca arrays',
        '`RemoverDuplicatas` e `MoverZerosParaOFim` alteram o array recebido',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva ParComSoma, EhPalindromo, RemoverDuplicatas
    // e MoverZerosParaOFim aqui

    static void Main()
    {
        int[] ordenado = { 1, 3, 5, 7, 9, 11 };

        Console.WriteLine($"par soma 12: {ParComSoma(ordenado, 12)}");
        Console.WriteLine($"par soma 4: {ParComSoma(ordenado, 4)}");
        Console.WriteLine($"par soma 100: {ParComSoma(ordenado, 100)}");
        Console.WriteLine($"par soma 20: {ParComSoma(ordenado, 20)}");

        Console.WriteLine($"arara: {EhPalindromo("arara")}");
        Console.WriteLine($"casa: {EhPalindromo("casa")}");
        Console.WriteLine($"vazio: {EhPalindromo("")}");
        Console.WriteLine($"uma letra: {EhPalindromo("a")}");

        int[] comDuplicatas = { 1, 1, 2, 2, 2, 3, 4, 4 };
        int novoTamanho = RemoverDuplicatas(comDuplicatas);
        Console.Write($"sem duplicatas ({novoTamanho}): ");
        for (int i = 0; i < novoTamanho; i++) Console.Write(comDuplicatas[i] + " ");
        Console.WriteLine();

        int[] comZeros = { 0, 1, 0, 3, 12, 0, 5 };
        MoverZerosParaOFim(comZeros);
        Console.WriteLine($"zeros no fim: {string.Join(",", comZeros)}");

        int[] soZeros = { 0, 0, 0 };
        MoverZerosParaOFim(soZeros);
        Console.WriteLine($"so zeros: {string.Join(",", soZeros)}");
    }
}
`,
      solution: `using System;

class Program
{
    static string ParComSoma(int[] ordenado, int alvo)
    {
        int esquerda = 0;
        int direita = ordenado.Length - 1;

        while (esquerda < direita)
        {
            int soma = ordenado[esquerda] + ordenado[direita];

            if (soma == alvo)
            {
                return $"{esquerda},{direita}";
            }

            if (soma < alvo)
            {
                esquerda++;
            }
            else
            {
                direita--;
            }
        }

        return "-1,-1";
    }

    static bool EhPalindromo(string texto)
    {
        int esquerda = 0;
        int direita = texto.Length - 1;

        while (esquerda < direita)
        {
            if (texto[esquerda] != texto[direita])
            {
                return false;
            }

            esquerda++;
            direita--;
        }

        return true;
    }

    static int RemoverDuplicatas(int[] ordenado)
    {
        if (ordenado.Length == 0)
        {
            return 0;
        }

        int escrita = 1;

        for (int leitura = 1; leitura < ordenado.Length; leitura++)
        {
            if (ordenado[leitura] != ordenado[escrita - 1])
            {
                ordenado[escrita] = ordenado[leitura];
                escrita++;
            }
        }

        return escrita;
    }

    static void MoverZerosParaOFim(int[] dados)
    {
        int escrita = 0;

        for (int leitura = 0; leitura < dados.Length; leitura++)
        {
            if (dados[leitura] != 0)
            {
                dados[escrita] = dados[leitura];
                escrita++;
            }
        }

        while (escrita < dados.Length)
        {
            dados[escrita] = 0;
            escrita++;
        }
    }

    static void Main()
    {
        int[] ordenado = { 1, 3, 5, 7, 9, 11 };

        Console.WriteLine($"par soma 12: {ParComSoma(ordenado, 12)}");
        Console.WriteLine($"par soma 4: {ParComSoma(ordenado, 4)}");
        Console.WriteLine($"par soma 100: {ParComSoma(ordenado, 100)}");
        Console.WriteLine($"par soma 20: {ParComSoma(ordenado, 20)}");

        Console.WriteLine($"arara: {EhPalindromo("arara")}");
        Console.WriteLine($"casa: {EhPalindromo("casa")}");
        Console.WriteLine($"vazio: {EhPalindromo("")}");
        Console.WriteLine($"uma letra: {EhPalindromo("a")}");

        int[] comDuplicatas = { 1, 1, 2, 2, 2, 3, 4, 4 };
        int novoTamanho = RemoverDuplicatas(comDuplicatas);
        Console.Write($"sem duplicatas ({novoTamanho}): ");
        for (int i = 0; i < novoTamanho; i++) Console.Write(comDuplicatas[i] + " ");
        Console.WriteLine();

        int[] comZeros = { 0, 1, 0, 3, 12, 0, 5 };
        MoverZerosParaOFim(comZeros);
        Console.WriteLine($"zeros no fim: {string.Join(",", comZeros)}");

        int[] soZeros = { 0, 0, 0 };
        MoverZerosParaOFim(soZeros);
        Console.WriteLine($"so zeros: {string.Join(",", soZeros)}");
    }
}
`,
      hints: [
        'No `RemoverDuplicatas`, compare com `ordenado[escrita - 1]` — o último valor que você decidiu manter.',
        'No `MoverZerosParaOFim`, a primeira passagem compacta os não zeros e a segunda preenche o resto com zero.',
        'Texto vazio e de uma letra são palíndromos: o laço não executa nenhuma vez.',
      ],
      tests: [
        {
          name: 'Os quatro problemas',
          stdin: '',
          expectedStdout:
            'par soma 12: 0,5\npar soma 4: 0,1\npar soma 100: -1,-1\npar soma 20: 4,5\n' +
            'arara: True\ncasa: False\nvazio: True\numa letra: True\n' +
            'sem duplicatas (4): 1 2 3 4 \n' +
            'zeros no fim: 1,3,12,5,0,0,0\nso zeros: 0,0,0',
        },
      ],
    },
  },
  {
    id: 's07c04l02',
    title: 'Janela deslizante de tamanho fixo',
    objective: 'Calcular estatísticas de todas as janelas de tamanho `k` em uma única passagem.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando o problema pede algo sobre "todos os blocos consecutivos de tamanho `k`", a **janela deslizante** evita recalcular tudo a cada posição.',
      },
      {
        kind: 'compare',
        good: `int soma = 0;
for (int i = 0; i < k; i++) soma += a[i];
int melhor = soma;

for (int i = k; i < n; i++)
{
    soma += a[i] - a[i - k];   // entra um, sai um
    if (soma > melhor) melhor = soma;
}
// O(n)`,
        bad: `for (int i = 0; i + k <= n; i++)
{
    int soma = 0;
    for (int j = i; j < i + k; j++)
        soma += a[j];
    ...
}
// O(n × k)`,
        goodLabel: 'Atualiza o que mudou',
        badLabel: 'Recalcula a janela inteira',
      },
      {
        kind: 'text',
        body:
          'A ideia central: entre uma janela e a seguinte, apenas **dois** elementos mudam — um entra pela direita e um sai pela esquerda. Atualizar custa `O(1)` em vez de `O(k)`.',
      },
      {
        kind: 'output',
        code: `a = [2, 5, 1, 8, 3],  k = 3

janela 0..2:  2+5+1 = 8
janela 1..3:  8 + 8 - 2 = 14      <- entrou 8, saiu 2
janela 2..4:  14 + 3 - 5 = 12     <- entrou 3, saiu 5`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A técnica funciona para qualquer estatística que possa ser **atualizada incrementalmente**: soma, média, contagem de um valor. Para máximo e mínimo ela não basta — remover um elemento pode exigir saber qual é o próximo maior, o que precisa de uma estrutura auxiliar.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Trate o caso `k > n` explicitamente: não existe janela nenhuma, e o laço de inicialização acessaria fora do array.',
      },
    ],
    quiz: [
      {
        id: 's07c04l02q1',
        type: 'single',
        prompt: 'Quantos elementos mudam entre uma janela e a seguinte?',
        options: [
          { id: 'a', text: 'Dois: um entra e um sai.', correct: true },
          { id: 'b', code: 'k' },
          { id: 'c', text: 'Um.' },
          { id: 'd', text: 'Depende do tamanho da janela.' },
        ],
        explanation:
          'É exatamente isso que torna a atualização `O(1)` em vez de `O(k)`.',
      },
      {
        id: 's07c04l02q2',
        type: 'single',
        prompt: 'Para qual estatística a janela simples **não** basta?',
        options: [
          { id: 'a', text: 'Máximo da janela.', correct: true },
          { id: 'b', text: 'Soma da janela.' },
          { id: 'c', text: 'Média da janela.' },
          { id: 'd', text: 'Contagem de um valor.' },
        ],
        explanation:
          'Remover o máximo exige saber qual é o próximo maior, o que a soma não guarda. Isso precisa de uma estrutura auxiliar.',
      },
      {
        id: 's07c04l02q3',
        type: 'single',
        prompt: 'O que fazer quando `k` é maior que o tamanho do array?',
        options: [
          { id: 'a', text: 'Tratar explicitamente: não existe nenhuma janela.', correct: true },
          { id: 'b', text: 'Usar o array inteiro como janela.' },
          { id: 'c', text: 'Reduzir `k` para o tamanho do array.' },
          { id: 'd', text: 'Nada: o laço já trata.' },
        ],
        explanation:
          'Sem o tratamento, o laço de inicialização acessa índices que não existem.',
      },
    ],
    challenge: {
      brief:
        'Calcule quatro estatísticas de janelas de tamanho fixo, todas em uma única passagem.',
      requirements: [
        'Complexidade esperada: `O(n)` de tempo, `O(1)` de espaço',
        '`SomaMaxima(int[] dados, int k)` devolve a maior soma de uma janela de tamanho `k`, ou `0` se `k` for inválido',
        '`IndiceDaSomaMaxima(int[] dados, int k)` devolve o índice inicial da primeira janela de soma máxima, ou `-1`',
        '`MediaDeCadaJanela(int[] dados, int k)` devolve as médias inteiras separadas por espaço, ou `nenhuma`',
        '`ContarJanelasAcimaDe(int[] dados, int k, int limite)` conta as janelas com soma maior que o limite',
        '`k` inválido significa menor ou igual a zero, ou maior que o tamanho do array',
        'Nenhuma recalcula a janela inteira a cada posição',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Escreva SomaMaxima, IndiceDaSomaMaxima,
    // MediaDeCadaJanela e ContarJanelasAcimaDe aqui

    static void Main()
    {
        int[] dados = { 2, 5, 1, 8, 3, 9, 4 };

        Console.WriteLine($"soma maxima k=3: {SomaMaxima(dados, 3)}");
        Console.WriteLine($"indice k=3: {IndiceDaSomaMaxima(dados, 3)}");
        Console.WriteLine($"medias k=3: {MediaDeCadaJanela(dados, 3)}");
        Console.WriteLine($"acima de 12 com k=3: {ContarJanelasAcimaDe(dados, 3, 12)}");

        Console.WriteLine($"soma maxima k=1: {SomaMaxima(dados, 1)}");
        Console.WriteLine($"indice k=1: {IndiceDaSomaMaxima(dados, 1)}");
        Console.WriteLine($"soma maxima k=7: {SomaMaxima(dados, 7)}");

        Console.WriteLine($"k invalido zero: {SomaMaxima(dados, 0)}");
        Console.WriteLine($"k invalido grande: {SomaMaxima(dados, 99)}");
        Console.WriteLine($"medias k invalido: {MediaDeCadaJanela(dados, 99)}");
        Console.WriteLine($"indice k invalido: {IndiceDaSomaMaxima(dados, 99)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static bool Invalido(int[] dados, int k)
    {
        return k <= 0 || k > dados.Length;
    }

    static int SomaMaxima(int[] dados, int k)
    {
        if (Invalido(dados, k))
        {
            return 0;
        }

        int soma = 0;

        for (int i = 0; i < k; i++)
        {
            soma += dados[i];
        }

        int melhor = soma;

        for (int i = k; i < dados.Length; i++)
        {
            soma += dados[i] - dados[i - k];

            if (soma > melhor)
            {
                melhor = soma;
            }
        }

        return melhor;
    }

    static int IndiceDaSomaMaxima(int[] dados, int k)
    {
        if (Invalido(dados, k))
        {
            return -1;
        }

        int soma = 0;

        for (int i = 0; i < k; i++)
        {
            soma += dados[i];
        }

        int melhor = soma;
        int indice = 0;

        for (int i = k; i < dados.Length; i++)
        {
            soma += dados[i] - dados[i - k];

            if (soma > melhor)
            {
                melhor = soma;
                indice = i - k + 1;
            }
        }

        return indice;
    }

    static string MediaDeCadaJanela(int[] dados, int k)
    {
        if (Invalido(dados, k))
        {
            return "nenhuma";
        }

        List<int> medias = new List<int>();

        int soma = 0;

        for (int i = 0; i < k; i++)
        {
            soma += dados[i];
        }

        medias.Add(soma / k);

        for (int i = k; i < dados.Length; i++)
        {
            soma += dados[i] - dados[i - k];
            medias.Add(soma / k);
        }

        return string.Join(" ", medias);
    }

    static int ContarJanelasAcimaDe(int[] dados, int k, int limite)
    {
        if (Invalido(dados, k))
        {
            return 0;
        }

        int soma = 0;

        for (int i = 0; i < k; i++)
        {
            soma += dados[i];
        }

        int total = soma > limite ? 1 : 0;

        for (int i = k; i < dados.Length; i++)
        {
            soma += dados[i] - dados[i - k];

            if (soma > limite)
            {
                total++;
            }
        }

        return total;
    }

    static void Main()
    {
        int[] dados = { 2, 5, 1, 8, 3, 9, 4 };

        Console.WriteLine($"soma maxima k=3: {SomaMaxima(dados, 3)}");
        Console.WriteLine($"indice k=3: {IndiceDaSomaMaxima(dados, 3)}");
        Console.WriteLine($"medias k=3: {MediaDeCadaJanela(dados, 3)}");
        Console.WriteLine($"acima de 12 com k=3: {ContarJanelasAcimaDe(dados, 3, 12)}");

        Console.WriteLine($"soma maxima k=1: {SomaMaxima(dados, 1)}");
        Console.WriteLine($"indice k=1: {IndiceDaSomaMaxima(dados, 1)}");
        Console.WriteLine($"soma maxima k=7: {SomaMaxima(dados, 7)}");

        Console.WriteLine($"k invalido zero: {SomaMaxima(dados, 0)}");
        Console.WriteLine($"k invalido grande: {SomaMaxima(dados, 99)}");
        Console.WriteLine($"medias k invalido: {MediaDeCadaJanela(dados, 99)}");
        Console.WriteLine($"indice k invalido: {IndiceDaSomaMaxima(dados, 99)}");
    }
}
`,
      hints: [
        'Um método `Invalido` compartilhado evita repetir a mesma verificação em quatro lugares.',
        'O índice inicial da janela que termina em `i` é `i - k + 1`.',
        'Como o requisito pede a **primeira** janela de soma máxima, use `>` estrito ao atualizar o melhor.',
      ],
      tests: [
        {
          name: 'Janelas de tamanho fixo',
          stdin: '',
          expectedStdout:
            'soma maxima k=3: 20\nindice k=3: 3\nmedias k=3: 2 4 4 6 5\nacima de 12 com k=3: 3\n' +
            'soma maxima k=1: 9\nindice k=1: 5\nsoma maxima k=7: 32\n' +
            'k invalido zero: 0\nk invalido grande: 0\nmedias k invalido: nenhuma\nindice k invalido: -1',
        },
      ],
    },
  },
  {
    id: 's07c04l03',
    title: 'Janela deslizante variável',
    objective: 'Ajustar o tamanho da janela dinamicamente para satisfazer uma condição.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando o tamanho da janela **não é dado** — você procura a maior ou a menor que satisfaz alguma condição —, a técnica se adapta: a direita expande e a esquerda contrai.',
      },
      {
        kind: 'code',
        code: `int esquerda = 0, soma = 0, melhor = 0;

for (int direita = 0; direita < n; direita++)
{
    soma += a[direita];                 // expande

    while (soma > limite)               // contrai enquanto viola
    {
        soma -= a[esquerda];
        esquerda++;
    }

    int tamanho = direita - esquerda + 1;
    if (tamanho > melhor) melhor = tamanho;
}`,
        caption: 'A direita avança sempre; a esquerda só avança para restaurar a condição.',
      },
      {
        kind: 'text',
        body:
          'O custo continua `O(n)` mesmo com dois laços: cada ponteiro avança no máximo `n` vezes no total. Essa análise — **amortizada** — é o que justifica a técnica.',
      },
      {
        kind: 'table',
        headers: ['Objetivo', 'Quando contrair'],
        rows: [
          ['maior janela válida', 'enquanto a condição está **violada**'],
          ['menor janela válida', 'enquanto a condição está **satisfeita**'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A diferença entre procurar a maior e a menor está inteiramente na condição do `while` interno, e em quando você registra o resultado — antes ou depois de contrair.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A técnica exige que a condição seja **monotônica** em relação ao tamanho: expandir só pode piorar, contrair só pode melhorar. Com valores negativos em uma soma, isso deixa de valer e a janela deslizante não se aplica.',
      },
    ],
    quiz: [
      {
        id: 's07c04l03q1',
        type: 'single',
        prompt: 'Por que a técnica é `O(n)` mesmo com dois laços aninhados?',
        options: [
          { id: 'a', text: 'Cada ponteiro avança no máximo `n` vezes no total.', correct: true },
          { id: 'b', text: 'O laço interno roda no máximo duas vezes.' },
          { id: 'c', text: 'Porque a janela tem tamanho fixo.' },
          { id: 'd', text: 'Ela não é `O(n)`.' },
        ],
        explanation:
          'É a análise amortizada: o total de trabalho é limitado, mesmo que uma iteração isolada possa ser cara.',
      },
      {
        id: 's07c04l03q2',
        type: 'single',
        prompt: 'Para achar a **menor** janela válida, quando contrair?',
        options: [
          { id: 'a', text: 'Enquanto a condição está satisfeita.', correct: true },
          { id: 'b', text: 'Enquanto a condição está violada.' },
          { id: 'c', text: 'A cada iteração.' },
          { id: 'd', text: 'Nunca.' },
        ],
        explanation:
          'Contrair enquanto ainda vale espreme a janela até o menor tamanho que ainda satisfaz a condição.',
      },
      {
        id: 's07c04l03q3',
        type: 'single',
        prompt: 'Por que valores negativos quebram a técnica em problemas de soma?',
        options: [
          { id: 'a', text: 'Porque expandir deixa de piorar necessariamente, quebrando a monotonicidade.', correct: true },
          { id: 'b', text: 'Porque a soma pode ficar negativa.' },
          { id: 'c', text: 'Porque o índice fica inválido.' },
          { id: 'd', text: 'Eles não quebram.' },
        ],
        explanation:
          'Com um negativo à frente, expandir pode reduzir a soma — e contrair a esquerda deixa de ser a decisão certa.',
      },
    ],
    challenge: {
      brief:
        'Resolva quatro problemas de janela variável, cada um com uma condição diferente.',
      requirements: [
        'Complexidade esperada: `O(n)` de tempo',
        '`MaiorJanelaComSomaAte(int[] positivos, int limite)` devolve o tamanho da maior janela com soma menor ou igual ao limite',
        '`MenorJanelaComSomaMinima(int[] positivos, int minimo)` devolve o tamanho da menor janela com soma maior ou igual ao mínimo, ou `0` se não existir',
        '`MaiorSemRepetir(int[] dados)` devolve o tamanho da maior janela sem valores repetidos',
        '`ContarJanelasComSomaExata(int[] positivos, int alvo)` conta as janelas com soma exatamente igual ao alvo',
        'Todos assumem valores positivos, exceto `MaiorSemRepetir`',
        'Nenhum usa laço aninhado com reinício do índice',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Escreva MaiorJanelaComSomaAte, MenorJanelaComSomaMinima,
    // MaiorSemRepetir e ContarJanelasComSomaExata aqui

    static void Main()
    {
        int[] positivos = { 2, 1, 5, 1, 3, 2 };

        Console.WriteLine($"maior com soma ate 8: {MaiorJanelaComSomaAte(positivos, 8)}");
        Console.WriteLine($"maior com soma ate 1: {MaiorJanelaComSomaAte(positivos, 1)}");
        Console.WriteLine($"maior com soma ate 100: {MaiorJanelaComSomaAte(positivos, 100)}");
        Console.WriteLine($"maior com soma ate 0: {MaiorJanelaComSomaAte(positivos, 0)}");

        Console.WriteLine($"menor com soma >= 7: {MenorJanelaComSomaMinima(positivos, 7)}");
        Console.WriteLine($"menor com soma >= 5: {MenorJanelaComSomaMinima(positivos, 5)}");
        Console.WriteLine($"menor com soma >= 100: {MenorJanelaComSomaMinima(positivos, 100)}");

        int[] comRepetidos = { 1, 2, 3, 2, 4, 5, 1 };
        Console.WriteLine($"maior sem repetir: {MaiorSemRepetir(comRepetidos)}");
        Console.WriteLine($"todos iguais: {MaiorSemRepetir(new int[] { 7, 7, 7 })}");
        Console.WriteLine($"vazio: {MaiorSemRepetir(new int[0])}");

        Console.WriteLine($"janelas com soma 6: {ContarJanelasComSomaExata(positivos, 6)}");
        Console.WriteLine($"janelas com soma 3: {ContarJanelasComSomaExata(positivos, 3)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static int MaiorJanelaComSomaAte(int[] positivos, int limite)
    {
        int esquerda = 0;
        int soma = 0;
        int melhor = 0;

        for (int direita = 0; direita < positivos.Length; direita++)
        {
            soma += positivos[direita];

            while (soma > limite && esquerda <= direita)
            {
                soma -= positivos[esquerda];
                esquerda++;
            }

            int tamanho = direita - esquerda + 1;

            if (tamanho > melhor)
            {
                melhor = tamanho;
            }
        }

        return melhor;
    }

    static int MenorJanelaComSomaMinima(int[] positivos, int minimo)
    {
        int esquerda = 0;
        int soma = 0;
        int melhor = 0;

        for (int direita = 0; direita < positivos.Length; direita++)
        {
            soma += positivos[direita];

            while (soma >= minimo)
            {
                int tamanho = direita - esquerda + 1;

                if (melhor == 0 || tamanho < melhor)
                {
                    melhor = tamanho;
                }

                soma -= positivos[esquerda];
                esquerda++;
            }
        }

        return melhor;
    }

    static int MaiorSemRepetir(int[] dados)
    {
        HashSet<int> janela = new HashSet<int>();

        int esquerda = 0;
        int melhor = 0;

        for (int direita = 0; direita < dados.Length; direita++)
        {
            while (janela.Contains(dados[direita]))
            {
                janela.Remove(dados[esquerda]);
                esquerda++;
            }

            janela.Add(dados[direita]);

            int tamanho = direita - esquerda + 1;

            if (tamanho > melhor)
            {
                melhor = tamanho;
            }
        }

        return melhor;
    }

    static int ContarJanelasComSomaExata(int[] positivos, int alvo)
    {
        int esquerda = 0;
        int soma = 0;
        int total = 0;

        for (int direita = 0; direita < positivos.Length; direita++)
        {
            soma += positivos[direita];

            while (soma > alvo && esquerda <= direita)
            {
                soma -= positivos[esquerda];
                esquerda++;
            }

            if (soma == alvo)
            {
                total++;
            }
        }

        return total;
    }

    static void Main()
    {
        int[] positivos = { 2, 1, 5, 1, 3, 2 };

        Console.WriteLine($"maior com soma ate 8: {MaiorJanelaComSomaAte(positivos, 8)}");
        Console.WriteLine($"maior com soma ate 1: {MaiorJanelaComSomaAte(positivos, 1)}");
        Console.WriteLine($"maior com soma ate 100: {MaiorJanelaComSomaAte(positivos, 100)}");
        Console.WriteLine($"maior com soma ate 0: {MaiorJanelaComSomaAte(positivos, 0)}");

        Console.WriteLine($"menor com soma >= 7: {MenorJanelaComSomaMinima(positivos, 7)}");
        Console.WriteLine($"menor com soma >= 5: {MenorJanelaComSomaMinima(positivos, 5)}");
        Console.WriteLine($"menor com soma >= 100: {MenorJanelaComSomaMinima(positivos, 100)}");

        int[] comRepetidos = { 1, 2, 3, 2, 4, 5, 1 };
        Console.WriteLine($"maior sem repetir: {MaiorSemRepetir(comRepetidos)}");
        Console.WriteLine($"todos iguais: {MaiorSemRepetir(new int[] { 7, 7, 7 })}");
        Console.WriteLine($"vazio: {MaiorSemRepetir(new int[0])}");

        Console.WriteLine($"janelas com soma 6: {ContarJanelasComSomaExata(positivos, 6)}");
        Console.WriteLine($"janelas com soma 3: {ContarJanelasComSomaExata(positivos, 3)}");
    }
}
`,
      hints: [
        'Na maior janela, registre o tamanho **depois** de contrair; na menor, registre **antes** de contrair.',
        'O `MaiorSemRepetir` usa um conjunto como estado da janela, removendo pela esquerda até o repetido sair.',
        'O `melhor == 0` na menor janela faz o papel de "ainda não encontrei nenhuma".',
      ],
      tests: [
        {
          name: 'Quatro condicoes',
          stdin: '',
          expectedStdout:
            'maior com soma ate 8: 3\nmaior com soma ate 1: 1\nmaior com soma ate 100: 6\n' +
            'maior com soma ate 0: 0\n' +
            'menor com soma >= 7: 3\nmenor com soma >= 5: 1\nmenor com soma >= 100: 0\n' +
            'maior sem repetir: 5\ntodos iguais: 1\nvazio: 0\n' +
            'janelas com soma 6: 3\njanelas com soma 3: 2',
        },
      ],
    },
  },
  {
    id: 's07c04l04',
    title: 'Soma de prefixos',
    objective: 'Responder consultas de soma de faixa em `O(1)` após um pré-processamento linear.',
    concept: [
      {
        kind: 'text',
        body:
          'A **soma de prefixos** é um array auxiliar em que cada posição guarda a soma de tudo até ali. Com ele, a soma de qualquer faixa vira uma subtração.',
      },
      {
        kind: 'code',
        code: `// prefixo[i] = soma de dados[0..i-1]
int[] prefixo = new int[n + 1];

for (int i = 0; i < n; i++)
{
    prefixo[i + 1] = prefixo[i] + dados[i];
}

// soma de dados[a..b] em O(1)
int soma = prefixo[b + 1] - prefixo[a];`,
        caption: 'O tamanho `n + 1` e o deslocamento evitam o caso especial de `a == 0`.',
      },
      {
        kind: 'output',
        code: `dados:    [3,  1,  4,  1,  5]
prefixo: [0, 3,  4,  8,  9, 14]
                 ^           ^
soma de dados[1..3] = prefixo[4] - prefixo[1] = 9 - 3 = 6`,
      },
      {
        kind: 'table',
        headers: ['Estratégia', 'Pré-processamento', 'Por consulta'],
        rows: [
          ['somar direto', 'nenhum', '`O(n)`'],
          ['soma de prefixos', '`O(n)`', '**`O(1)`**'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'É o mesmo raciocínio da lição sobre pré-processamento: com uma consulta a soma direta vence; a partir de poucas consultas o prefixo se paga, e com muitas ele ganha de lavada.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A técnica pressupõe que os dados **não mudam**. Alterar um elemento invalida todo o prefixo a partir dali, exigindo `O(n)` para reconstruir. Para dados que mudam, existem estruturas próprias, como árvores de Fenwick.',
      },
    ],
    quiz: [
      {
        id: 's07c04l04q1',
        type: 'single',
        prompt: 'Como se obtém a soma de `dados[a..b]` com um array de prefixos?',
        options: [
          { id: 'a', code: 'prefixo[b + 1] - prefixo[a]', correct: true },
          { id: 'b', code: 'prefixo[b] - prefixo[a]' },
          { id: 'c', code: 'prefixo[b] - prefixo[a - 1]' },
          { id: 'd', code: 'prefixo[b + 1] + prefixo[a]' },
        ],
        explanation:
          'Com o prefixo deslocado de uma posição, a fórmula funciona inclusive para `a == 0`, sem caso especial.',
      },
      {
        id: 's07c04l04q2',
        type: 'single',
        prompt: 'Por que o array de prefixos tem tamanho `n + 1`?',
        options: [
          { id: 'a', text: 'Para que a posição zero represente a soma vazia, eliminando o caso especial.', correct: true },
          { id: 'b', text: 'Para evitar estouro de índice no fim.' },
          { id: 'c', text: 'Por convenção.' },
          { id: 'd', text: 'Para guardar o total separadamente.' },
        ],
        explanation:
          'Sem esse deslocamento, a consulta com `a == 0` precisaria de um `if` à parte.',
      },
      {
        id: 's07c04l04q3',
        type: 'single',
        prompt: 'O que acontece quando um elemento dos dados muda?',
        options: [
          { id: 'a', text: 'Todo o prefixo a partir dali fica inválido e precisa ser reconstruído.', correct: true },
          { id: 'b', text: 'Apenas uma posição do prefixo muda.' },
          { id: 'c', text: 'O prefixo continua válido.' },
          { id: 'd', text: 'A consulta passa a lançar exceção.' },
        ],
        explanation:
          'É a limitação central da técnica. Dados que mudam pedem estruturas como árvores de Fenwick.',
      },
    ],
    challenge: {
      brief:
        'Construa o array de prefixos e use-o para responder consultas de faixa em tempo constante.',
      requirements: [
        'Complexidade esperada: `O(n)` de construção, `O(1)` por consulta',
        '`ConstruirPrefixos(int[] dados)` devolve o array de prefixos com tamanho `n + 1`',
        '`SomaDaFaixa(int[] prefixo, int a, int b)` devolve a soma de `dados[a..b]`, ou `0` se a faixa for inválida',
        '`MediaDaFaixa(int[] prefixo, int a, int b)` devolve a média inteira da faixa, ou `0` se inválida',
        '`ExisteFaixaComSoma(int[] prefixo, int alvo)` diz se existe alguma faixa com a soma exata',
        'Uma faixa é inválida quando `a > b`, `a` é negativo, ou `b` passa do fim',
        'Nenhuma consulta percorre os dados originais',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva ConstruirPrefixos, SomaDaFaixa,
    // MediaDaFaixa e ExisteFaixaComSoma aqui

    static void Main()
    {
        int[] dados = { 3, 1, 4, 1, 5, 9, 2, 6 };
        int[] prefixo = ConstruirPrefixos(dados);

        Console.WriteLine($"prefixo: {string.Join(",", prefixo)}");

        Console.WriteLine($"soma 0..7: {SomaDaFaixa(prefixo, 0, 7)}");
        Console.WriteLine($"soma 1..3: {SomaDaFaixa(prefixo, 1, 3)}");
        Console.WriteLine($"soma 0..0: {SomaDaFaixa(prefixo, 0, 0)}");
        Console.WriteLine($"soma 5..5: {SomaDaFaixa(prefixo, 5, 5)}");

        Console.WriteLine($"media 0..7: {MediaDaFaixa(prefixo, 0, 7)}");
        Console.WriteLine($"media 1..3: {MediaDaFaixa(prefixo, 1, 3)}");

        Console.WriteLine($"invalida a>b: {SomaDaFaixa(prefixo, 5, 2)}");
        Console.WriteLine($"invalida negativa: {SomaDaFaixa(prefixo, -1, 3)}");
        Console.WriteLine($"invalida alem do fim: {SomaDaFaixa(prefixo, 0, 99)}");
        Console.WriteLine($"media invalida: {MediaDaFaixa(prefixo, 5, 2)}");

        Console.WriteLine($"existe faixa com 15: {ExisteFaixaComSoma(prefixo, 15)}");
        Console.WriteLine($"existe faixa com 31: {ExisteFaixaComSoma(prefixo, 31)}");
        Console.WriteLine($"existe faixa com 100: {ExisteFaixaComSoma(prefixo, 100)}");
    }
}
`,
      solution: `using System;

class Program
{
    static int[] ConstruirPrefixos(int[] dados)
    {
        int[] prefixo = new int[dados.Length + 1];

        for (int i = 0; i < dados.Length; i++)
        {
            prefixo[i + 1] = prefixo[i] + dados[i];
        }

        return prefixo;
    }

    static bool FaixaValida(int[] prefixo, int a, int b)
    {
        return a >= 0 && b < prefixo.Length - 1 && a <= b;
    }

    static int SomaDaFaixa(int[] prefixo, int a, int b)
    {
        if (!FaixaValida(prefixo, a, b))
        {
            return 0;
        }

        return prefixo[b + 1] - prefixo[a];
    }

    static int MediaDaFaixa(int[] prefixo, int a, int b)
    {
        if (!FaixaValida(prefixo, a, b))
        {
            return 0;
        }

        return SomaDaFaixa(prefixo, a, b) / (b - a + 1);
    }

    static bool ExisteFaixaComSoma(int[] prefixo, int alvo)
    {
        for (int a = 0; a < prefixo.Length; a++)
        {
            for (int b = a + 1; b < prefixo.Length; b++)
            {
                if (prefixo[b] - prefixo[a] == alvo)
                {
                    return true;
                }
            }
        }

        return false;
    }

    static void Main()
    {
        int[] dados = { 3, 1, 4, 1, 5, 9, 2, 6 };
        int[] prefixo = ConstruirPrefixos(dados);

        Console.WriteLine($"prefixo: {string.Join(",", prefixo)}");

        Console.WriteLine($"soma 0..7: {SomaDaFaixa(prefixo, 0, 7)}");
        Console.WriteLine($"soma 1..3: {SomaDaFaixa(prefixo, 1, 3)}");
        Console.WriteLine($"soma 0..0: {SomaDaFaixa(prefixo, 0, 0)}");
        Console.WriteLine($"soma 5..5: {SomaDaFaixa(prefixo, 5, 5)}");

        Console.WriteLine($"media 0..7: {MediaDaFaixa(prefixo, 0, 7)}");
        Console.WriteLine($"media 1..3: {MediaDaFaixa(prefixo, 1, 3)}");

        Console.WriteLine($"invalida a>b: {SomaDaFaixa(prefixo, 5, 2)}");
        Console.WriteLine($"invalida negativa: {SomaDaFaixa(prefixo, -1, 3)}");
        Console.WriteLine($"invalida alem do fim: {SomaDaFaixa(prefixo, 0, 99)}");
        Console.WriteLine($"media invalida: {MediaDaFaixa(prefixo, 5, 2)}");

        Console.WriteLine($"existe faixa com 15: {ExisteFaixaComSoma(prefixo, 15)}");
        Console.WriteLine($"existe faixa com 31: {ExisteFaixaComSoma(prefixo, 31)}");
        Console.WriteLine($"existe faixa com 100: {ExisteFaixaComSoma(prefixo, 100)}");
      }
}
`,
      hints: [
        'O tamanho dos dados originais é `prefixo.Length - 1`, o que a validação usa para checar o limite de `b`.',
        'A média divide a soma pelo número de elementos, que é `b - a + 1`.',
        'O `ExisteFaixaComSoma` testa todos os pares de prefixos — é `O(n²)`, mas opera sobre o prefixo, não sobre os dados.',
      ],
      tests: [
        {
          name: 'Consultas de faixa',
          stdin: '',
          expectedStdout:
            'prefixo: 0,3,4,8,9,14,23,25,31\n' +
            'soma 0..7: 31\nsoma 1..3: 6\nsoma 0..0: 3\nsoma 5..5: 9\n' +
            'media 0..7: 3\nmedia 1..3: 2\n' +
            'invalida a>b: 0\ninvalida negativa: 0\ninvalida alem do fim: 0\nmedia invalida: 0\n' +
            'existe faixa com 15: True\nexiste faixa com 31: True\nexiste faixa com 100: False',
        },
      ],
    },
  },
  {
    id: 's07c04l05',
    title: 'Array de diferenças',
    objective: 'Aplicar muitas atualizações de faixa em tempo constante cada, materializando só no fim.',
    concept: [
      {
        kind: 'text',
        body:
          'O **array de diferenças** é o espelho da soma de prefixos: em vez de acelerar consultas de faixa, ele acelera **atualizações** de faixa.',
      },
      {
        kind: 'code',
        code: `// somar valor a dados[a..b] em O(1)
diferenca[a] += valor;
diferenca[b + 1] -= valor;

// no fim, materializar com prefixos
int acumulado = 0;

for (int i = 0; i < n; i++)
{
    acumulado += diferenca[i];
    dados[i] = acumulado;
}`,
        caption: 'Duas escritas por atualização, e uma única passagem no fim para reconstruir.',
      },
      {
        kind: 'output',
        code: `n = 5, somar 10 em [1..3]

diferenca: [0, +10, 0, 0, -10]
acumulado:  0   10  10  10   0
resultado: [0,  10, 10, 10,  0]`,
      },
      {
        kind: 'table',
        headers: ['Estratégia', 'Por atualização', 'Materializar'],
        rows: [
          ['somar direto na faixa', '`O(tamanho da faixa)`', 'nenhum'],
          ['array de diferenças', '**`O(1)`**', '`O(n)` uma vez'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Com `m` atualizações em faixas de tamanho médio `t`, a abordagem direta custa `O(m × t)` e a de diferenças custa `O(m + n)`. Com faixas grandes e muitas atualizações, a diferença é enorme.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O array de diferenças precisa de `n + 1` posições, porque `b + 1` pode ser exatamente `n` quando a faixa vai até o fim. Sem essa posição extra, a última atualização estoura o índice.',
      },
    ],
    quiz: [
      {
        id: 's07c04l05q1',
        type: 'single',
        prompt: 'Quantas escritas custa somar um valor a uma faixa inteira?',
        options: [
          { id: 'a', text: 'Duas, independentemente do tamanho da faixa.', correct: true },
          { id: 'b', text: 'Uma por elemento da faixa.' },
          { id: 'c', text: 'Uma.' },
          { id: 'd', text: 'Depende do valor somado.' },
        ],
        explanation:
          'Uma no início da faixa e outra logo depois do fim, marcando onde o efeito começa e termina.',
      },
      {
        id: 's07c04l05q2',
        type: 'single',
        prompt: 'Como o array final é obtido a partir das diferenças?',
        options: [
          { id: 'a', text: 'Acumulando os valores em uma passagem, como uma soma de prefixos.', correct: true },
          { id: 'b', text: 'Somando cada posição com a anterior duas vezes.' },
          { id: 'c', text: 'Ordenando as diferenças.' },
          { id: 'd', text: 'Multiplicando as posições.' },
        ],
        explanation:
          'A soma acumulada transforma os marcadores de início e fim no efeito real em cada posição.',
      },
      {
        id: 's07c04l05q3',
        type: 'single',
        prompt: 'Por que o array de diferenças tem `n + 1` posições?',
        options: [
          { id: 'a', text: 'Porque `b + 1` pode ser `n` quando a faixa vai até o fim.', correct: true },
          { id: 'b', text: 'Para guardar o total.' },
          { id: 'c', text: 'Por simetria com a soma de prefixos.' },
          { id: 'd', text: 'Não precisa: `n` basta.' },
        ],
        explanation:
          'Sem a posição extra, uma atualização até o último elemento acessaria fora do array.',
      },
    ],
    challenge: {
      brief:
        'Aplique muitas atualizações de faixa em tempo constante cada e compare o custo com a abordagem direta.',
      requirements: [
        'Complexidade esperada: `O(1)` por atualização, `O(n)` para materializar',
        '`AplicarDireto(int[] dados, int a, int b, int valor)` soma o valor em cada posição da faixa, contando as escritas em `escritas`',
        '`AplicarDiferenca(int[] diferenca, int a, int b, int valor)` registra a atualização em duas escritas, contando em `escritas`',
        '`Materializar(int[] diferenca, int n)` devolve o array final acumulando as diferenças',
        'O array de diferenças tem `n + 1` posições',
        'Faixas inválidas são ignoradas por ambos, sem contar escritas',
        'Os dois caminhos produzem exatamente o mesmo array final',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int escritas = 0;

    // Escreva AplicarDireto, AplicarDiferenca e Materializar aqui

    static void Main()
    {
        int n = 10;

        int[,] atualizacoes =
        {
            { 0, 9, 1 },
            { 2, 5, 10 },
            { 4, 4, 100 },
            { 7, 9, 5 },
            { 5, 2, 999 },
        };

        int[] direto = new int[n];
        escritas = 0;

        for (int i = 0; i < atualizacoes.GetLength(0); i++)
        {
            AplicarDireto(direto, atualizacoes[i, 0], atualizacoes[i, 1], atualizacoes[i, 2]);
        }

        int escritasDireto = escritas;

        int[] diferenca = new int[n + 1];
        escritas = 0;

        for (int i = 0; i < atualizacoes.GetLength(0); i++)
        {
            AplicarDiferenca(diferenca, atualizacoes[i, 0], atualizacoes[i, 1], atualizacoes[i, 2]);
        }

        int escritasDiferenca = escritas;
        int[] materializado = Materializar(diferenca, n);

        Console.WriteLine($"direto:        {string.Join(",", direto)}");
        Console.WriteLine($"materializado: {string.Join(",", materializado)}");
        Console.WriteLine($"iguais: {string.Join(",", direto) == string.Join(",", materializado)}");
        Console.WriteLine($"escritas direto: {escritasDireto}");
        Console.WriteLine($"escritas diferenca: {escritasDiferenca}");
    }
}
`,
      solution: `using System;

class Program
{
    static int escritas = 0;

    static bool FaixaValida(int n, int a, int b)
    {
        return a >= 0 && b < n && a <= b;
    }

    static void AplicarDireto(int[] dados, int a, int b, int valor)
    {
        if (!FaixaValida(dados.Length, a, b))
        {
            return;
        }

        for (int i = a; i <= b; i++)
        {
            dados[i] += valor;
            escritas++;
        }
    }

    static void AplicarDiferenca(int[] diferenca, int a, int b, int valor)
    {
        int n = diferenca.Length - 1;

        if (!FaixaValida(n, a, b))
        {
            return;
        }

        diferenca[a] += valor;
        escritas++;

        diferenca[b + 1] -= valor;
        escritas++;
    }

    static int[] Materializar(int[] diferenca, int n)
    {
        int[] resultado = new int[n];
        int acumulado = 0;

        for (int i = 0; i < n; i++)
        {
            acumulado += diferenca[i];
            resultado[i] = acumulado;
        }

        return resultado;
    }

    static void Main()
    {
        int n = 10;

        int[,] atualizacoes =
        {
            { 0, 9, 1 },
            { 2, 5, 10 },
            { 4, 4, 100 },
            { 7, 9, 5 },
            { 5, 2, 999 },
        };

        int[] direto = new int[n];
        escritas = 0;

        for (int i = 0; i < atualizacoes.GetLength(0); i++)
        {
            AplicarDireto(direto, atualizacoes[i, 0], atualizacoes[i, 1], atualizacoes[i, 2]);
        }

        int escritasDireto = escritas;

        int[] diferenca = new int[n + 1];
        escritas = 0;

        for (int i = 0; i < atualizacoes.GetLength(0); i++)
        {
            AplicarDiferenca(diferenca, atualizacoes[i, 0], atualizacoes[i, 1], atualizacoes[i, 2]);
        }

        int escritasDiferenca = escritas;
        int[] materializado = Materializar(diferenca, n);

        Console.WriteLine($"direto:        {string.Join(",", direto)}");
        Console.WriteLine($"materializado: {string.Join(",", materializado)}");
        Console.WriteLine($"iguais: {string.Join(",", direto) == string.Join(",", materializado)}");
        Console.WriteLine($"escritas direto: {escritasDireto}");
        Console.WriteLine($"escritas diferenca: {escritasDiferenca}");
    }
}
`,
      hints: [
        'O tamanho real dos dados é `diferenca.Length - 1`, o que a validação da versão com diferenças usa.',
        'A última atualização da tabela tem `a > b` — ela é inválida e deve ser ignorada pelos dois caminhos.',
        'Cada atualização por diferença custa exatamente duas escritas, não importa o tamanho da faixa.',
      ],
      tests: [
        {
          name: 'Quatro atualizacoes validas',
          stdin: '',
          expectedStdout:
            'direto:        1,1,11,11,111,11,1,6,6,6\n' +
            'materializado: 1,1,11,11,111,11,1,6,6,6\n' +
            'iguais: True\nescritas direto: 18\nescritas diferenca: 8',
        },
      ],
    },
  },
  {
    id: 's07c04l06',
    title: 'Subarray de soma máxima (Kadane)',
    objective: 'Resolver em uma passagem um problema que parece exigir testar todas as faixas.',
    concept: [
      {
        kind: 'text',
        body:
          'Encontrar a faixa contígua de maior soma parece exigir testar todas as `n²` faixas. O **algoritmo de Kadane** resolve em `O(n)` com uma observação simples.',
      },
      {
        kind: 'code',
        code: `int atual = dados[0];
int melhor = dados[0];

for (int i = 1; i < n; i++)
{
    // vale a pena continuar ou recomecar aqui?
    atual = Math.Max(dados[i], atual + dados[i]);

    if (atual > melhor) melhor = atual;
}`,
        caption: 'Uma decisão por elemento: continuar a faixa anterior ou começar uma nova.',
      },
      {
        kind: 'text',
        body:
          'A observação: se a soma acumulada até aqui ficou **negativa**, ela só atrapalha o que vier depois. Descartá-la e recomeçar do elemento atual nunca é pior.',
      },
      {
        kind: 'output',
        code: `dados:  [-2,  1, -3,  4, -1,  2,  1, -5,  4]
atual:   -2   1  -2   4   3   5   6   1   5
melhor:  -2   1   1   4   4   5   6   6   6
                                 ^
                    faixa [3..6] = 4-1+2+1 = 6`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Kadane é um caso de programação dinâmica disfarçado: `atual` é "a melhor soma de uma faixa que **termina** em `i`". Resolver esse subproblema para cada posição resolve o problema inteiro.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Com **todos** os valores negativos, a resposta é o maior deles — não zero. Inicializar `melhor` com zero é o erro clássico: ele devolve `0` para uma entrada em que nenhuma faixa tem soma positiva.',
      },
    ],
    quiz: [
      {
        id: 's07c04l06q1',
        type: 'single',
        prompt: 'Qual é a observação central do algoritmo de Kadane?',
        options: [
          { id: 'a', text: 'Uma soma acumulada negativa só atrapalha o que vier depois.', correct: true },
          { id: 'b', text: 'O maior elemento sempre está na resposta.' },
          { id: 'c', text: 'A faixa ótima começa no início.' },
          { id: 'd', text: 'Faixas de tamanho par são melhores.' },
        ],
        explanation:
          'Descartar um acumulado negativo e recomeçar do elemento atual nunca piora o resultado.',
      },
      {
        id: 's07c04l06q2',
        type: 'single',
        prompt: 'O que a variável `atual` representa?',
        options: [
          { id: 'a', text: 'A melhor soma de uma faixa que termina na posição atual.', correct: true },
          { id: 'b', text: 'A soma de todos os elementos até aqui.' },
          { id: 'c', text: 'O maior elemento visto.' },
          { id: 'd', text: 'O tamanho da faixa atual.' },
        ],
        explanation:
          'É o subproblema da programação dinâmica: resolvê-lo para cada posição resolve o todo.',
      },
      {
        id: 's07c04l06q3',
        type: 'single',
        prompt: 'Qual é o erro clássico na implementação?',
        options: [
          { id: 'a', text: 'Inicializar `melhor` com zero, quebrando o caso de todos negativos.', correct: true },
          { id: 'b', text: 'Começar o laço em zero.' },
          { id: 'c', text: 'Usar `Math.Max`.' },
          { id: 'd', text: 'Não guardar os índices.' },
        ],
        explanation:
          'Com todos negativos, a resposta é o maior deles. Zero significaria escolher a faixa vazia, que o problema não permite.',
      },
    ],
    challenge: {
      brief:
        'Implemente Kadane em três variações: a soma, os índices da faixa, e a versão para produto.',
      requirements: [
        'Complexidade esperada: `O(n)` de tempo, `O(1)` de espaço',
        '`SomaMaxima(int[] dados)` devolve a maior soma de uma faixa contígua não vazia',
        '`FaixaMaxima(int[] dados)` devolve `inicio,fim` da primeira faixa de soma máxima',
        '`SomaMaximaCircular(int[] dados)` considera também faixas que dão a volta pelo fim',
        'Todos funcionam com valores todos negativos, devolvendo o maior elemento',
        'Todos devolvem `0` e `-1,-1` para array vazio',
        'A versão circular usa a identidade: o melhor circular é o total menos a faixa de **menor** soma',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva SomaMaxima, FaixaMaxima e SomaMaximaCircular aqui

    static void Main()
    {
        int[] misto = { -2, 1, -3, 4, -1, 2, 1, -5, 4 };
        int[] todosNegativos = { -5, -2, -8, -1 };
        int[] todosPositivos = { 1, 2, 3, 4 };
        int[] circular = { 5, -3, 5 };

        Console.WriteLine($"misto: {SomaMaxima(misto)}");
        Console.WriteLine($"faixa misto: {FaixaMaxima(misto)}");

        Console.WriteLine($"negativos: {SomaMaxima(todosNegativos)}");
        Console.WriteLine($"faixa negativos: {FaixaMaxima(todosNegativos)}");

        Console.WriteLine($"positivos: {SomaMaxima(todosPositivos)}");
        Console.WriteLine($"faixa positivos: {FaixaMaxima(todosPositivos)}");

        Console.WriteLine($"vazio: {SomaMaxima(new int[0])}");
        Console.WriteLine($"faixa vazio: {FaixaMaxima(new int[0])}");

        Console.WriteLine($"circular normal: {SomaMaximaCircular(misto)}");
        Console.WriteLine($"circular da volta: {SomaMaximaCircular(circular)}");
        Console.WriteLine($"circular negativos: {SomaMaximaCircular(todosNegativos)}");
        Console.WriteLine($"circular positivos: {SomaMaximaCircular(todosPositivos)}");
    }
}
`,
      solution: `using System;

class Program
{
    static int SomaMaxima(int[] dados)
    {
        if (dados.Length == 0)
        {
            return 0;
        }

        int atual = dados[0];
        int melhor = dados[0];

        for (int i = 1; i < dados.Length; i++)
        {
            atual = Math.Max(dados[i], atual + dados[i]);

            if (atual > melhor)
            {
                melhor = atual;
            }
        }

        return melhor;
    }

    static string FaixaMaxima(int[] dados)
    {
        if (dados.Length == 0)
        {
            return "-1,-1";
        }

        int atual = dados[0];
        int melhor = dados[0];
        int inicioAtual = 0;
        int inicio = 0;
        int fim = 0;

        for (int i = 1; i < dados.Length; i++)
        {
            if (dados[i] > atual + dados[i])
            {
                atual = dados[i];
                inicioAtual = i;
            }
            else
            {
                atual = atual + dados[i];
            }

            if (atual > melhor)
            {
                melhor = atual;
                inicio = inicioAtual;
                fim = i;
            }
        }

        return $"{inicio},{fim}";
    }

    static int SomaMinima(int[] dados)
    {
        int atual = dados[0];
        int pior = dados[0];

        for (int i = 1; i < dados.Length; i++)
        {
            atual = Math.Min(dados[i], atual + dados[i]);

            if (atual < pior)
            {
                pior = atual;
            }
        }

        return pior;
    }

    static int SomaMaximaCircular(int[] dados)
    {
        if (dados.Length == 0)
        {
            return 0;
        }

        int normal = SomaMaxima(dados);

        if (normal < 0)
        {
            return normal;
        }

        int total = 0;

        foreach (int valor in dados)
        {
            total += valor;
        }

        int comVolta = total - SomaMinima(dados);

        return Math.Max(normal, comVolta);
    }

    static void Main()
    {
        int[] misto = { -2, 1, -3, 4, -1, 2, 1, -5, 4 };
        int[] todosNegativos = { -5, -2, -8, -1 };
        int[] todosPositivos = { 1, 2, 3, 4 };
        int[] circular = { 5, -3, 5 };

        Console.WriteLine($"misto: {SomaMaxima(misto)}");
        Console.WriteLine($"faixa misto: {FaixaMaxima(misto)}");

        Console.WriteLine($"negativos: {SomaMaxima(todosNegativos)}");
        Console.WriteLine($"faixa negativos: {FaixaMaxima(todosNegativos)}");

        Console.WriteLine($"positivos: {SomaMaxima(todosPositivos)}");
        Console.WriteLine($"faixa positivos: {FaixaMaxima(todosPositivos)}");

        Console.WriteLine($"vazio: {SomaMaxima(new int[0])}");
        Console.WriteLine($"faixa vazio: {FaixaMaxima(new int[0])}");

        Console.WriteLine($"circular normal: {SomaMaximaCircular(misto)}");
        Console.WriteLine($"circular da volta: {SomaMaximaCircular(circular)}");
        Console.WriteLine($"circular negativos: {SomaMaximaCircular(todosNegativos)}");
        Console.WriteLine($"circular positivos: {SomaMaximaCircular(todosPositivos)}");
    }
}
`,
      hints: [
        'Para os índices, registre o início de uma faixa nova sempre que decidir recomeçar.',
        'A versão circular precisa do caso especial de todos negativos: subtrair a faixa mínima deixaria a faixa vazia.',
        '`SomaMinima` é o Kadane com `Math.Min` no lugar de `Math.Max`.',
      ],
      tests: [
        {
          name: 'Tres variacoes',
          stdin: '',
          expectedStdout:
            'misto: 6\nfaixa misto: 3,6\n' +
            'negativos: -1\nfaixa negativos: 3,3\n' +
            'positivos: 10\nfaixa positivos: 0,3\n' +
            'vazio: 0\nfaixa vazio: -1,-1\n' +
            'circular normal: 6\ncircular da volta: 10\n' +
            'circular negativos: -1\ncircular positivos: 10',
        },
      ],
    },
  },
  {
    id: 's07c04l07',
    title: 'Rotação de array',
    objective: 'Girar um array no lugar usando o truque das três inversões.',
    concept: [
      {
        kind: 'text',
        body:
          'Rotacionar um array em `k` posições parece exigir um array auxiliar. Existe uma solução `O(1)` de espaço, e ela é surpreendentemente elegante: **três inversões**.',
      },
      {
        kind: 'output',
        code: `[1, 2, 3, 4, 5],  rotacionar 2 a direita

1. inverte tudo:        [5, 4, 3, 2, 1]
2. inverte os k=2:      [4, 5, 3, 2, 1]
3. inverte o resto:     [4, 5, 1, 2, 3]   <- pronto`,
      },
      {
        kind: 'code',
        code: `static void Rotacionar(int[] a, int k)
{
    int n = a.Length;
    k = ((k % n) + n) % n;      // normaliza negativos e k >= n

    Inverter(a, 0, n - 1);
    Inverter(a, 0, k - 1);
    Inverter(a, k, n - 1);
}`,
        caption: 'A normalização do `k` trata rotações maiores que o array e rotações negativas.',
      },
      {
        kind: 'table',
        headers: ['Abordagem', 'Tempo', 'Espaço'],
        rows: [
          ['array auxiliar', '`O(n)`', '`O(n)`'],
          ['deslocar uma posição `k` vezes', '`O(n × k)`', '`O(1)`'],
          ['**três inversões**', '**`O(n)`**', '**`O(1)`**'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A normalização `((k % n) + n) % n` resolve dois problemas de uma vez: `k` maior que `n` — em que só o resto importa — e `k` negativo, que em C# produziria um resto negativo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Cuidado com `n == 0`: o `k % n` dividiria por zero. Trate o array vazio antes de normalizar.',
      },
    ],
    quiz: [
      {
        id: 's07c04l07q1',
        type: 'single',
        prompt: 'Quais são as três inversões, na ordem?',
        options: [
          { id: 'a', text: 'O array inteiro, os primeiros `k`, e o restante.', correct: true },
          { id: 'b', text: 'Os primeiros `k`, o restante, e o array inteiro.' },
          { id: 'c', text: 'O restante, o array inteiro, e os primeiros `k`.' },
          { id: 'd', text: 'Três vezes o array inteiro.' },
        ],
        explanation:
          'A primeira inversão leva os últimos `k` para o início; as outras duas restauram a ordem interna de cada bloco.',
      },
      {
        id: 's07c04l07q2',
        type: 'single',
        prompt: 'Por que normalizar com `((k % n) + n) % n`?',
        options: [
          { id: 'a', text: 'Para tratar `k` maior que `n` e `k` negativo de uma vez.', correct: true },
          { id: 'b', text: 'Para evitar estouro de inteiro.' },
          { id: 'c', text: 'Para arredondar `k`.' },
          { id: 'd', text: 'Por questão de estilo.' },
        ],
        explanation:
          'Em C# o resto de um negativo é negativo, o que produziria índices inválidos sem a segunda operação.',
      },
      {
        id: 's07c04l07q3',
        type: 'single',
        prompt: 'Qual caso precisa ser tratado antes da normalização?',
        options: [
          { id: 'a', text: 'O array vazio, porque `k % 0` divide por zero.', correct: true },
          { id: 'b', code: 'k == 0' },
          { id: 'c', text: 'Array de um elemento.' },
          { id: 'd', text: 'Nenhum.' },
        ],
        explanation:
          '`DivideByZeroException` no primeiro `%`. É o caso de borda clássico dessa implementação.',
      },
    ],
    challenge: {
      brief:
        'Implemente a rotação pelas três inversões e compare com a versão que usa array auxiliar.',
      requirements: [
        'Complexidade esperada: `O(n)` de tempo, `O(1)` de espaço',
        '`Inverter(int[] dados, int inicio, int fim)` inverte a faixa no lugar',
        '`RotacionarDireita(int[] dados, int k)` usa as três inversões',
        '`RotacionarComAuxiliar(int[] dados, int k)` devolve um array novo rotacionado, para comparação',
        'Os dois normalizam `k` para tratar valores negativos e maiores que o tamanho',
        'Os dois tratam o array vazio sem estourar',
        'A rotação à direita move os elementos do fim para o início',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva Inverter, RotacionarDireita e RotacionarComAuxiliar aqui

    static void Main()
    {
        int[] valores = { 1, 2, 3, 4, 5 };

        int[] a = (int[])valores.Clone();
        RotacionarDireita(a, 2);
        Console.WriteLine($"direita 2: {string.Join(",", a)}");

        int[] b = (int[])valores.Clone();
        RotacionarDireita(b, 0);
        Console.WriteLine($"direita 0: {string.Join(",", b)}");

        int[] c = (int[])valores.Clone();
        RotacionarDireita(c, 5);
        Console.WriteLine($"direita 5: {string.Join(",", c)}");

        int[] d = (int[])valores.Clone();
        RotacionarDireita(d, 7);
        Console.WriteLine($"direita 7: {string.Join(",", d)}");

        int[] e = (int[])valores.Clone();
        RotacionarDireita(e, -1);
        Console.WriteLine($"direita -1: {string.Join(",", e)}");

        int[] vazio = new int[0];
        RotacionarDireita(vazio, 3);
        Console.WriteLine($"vazio: [{string.Join(",", vazio)}]");

        Console.WriteLine($"auxiliar 2: {string.Join(",", RotacionarComAuxiliar(valores, 2))}");
        Console.WriteLine($"auxiliar -1: {string.Join(",", RotacionarComAuxiliar(valores, -1))}");
        Console.WriteLine($"original intacto: {string.Join(",", valores)}");

        int[] f = (int[])valores.Clone();
        RotacionarDireita(f, 2);
        Console.WriteLine($"iguais: {string.Join(",", f) == string.Join(",", RotacionarComAuxiliar(valores, 2))}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Inverter(int[] dados, int inicio, int fim)
    {
        while (inicio < fim)
        {
            int temporario = dados[inicio];
            dados[inicio] = dados[fim];
            dados[fim] = temporario;

            inicio++;
            fim--;
        }
    }

    static int Normalizar(int k, int n)
    {
        return ((k % n) + n) % n;
    }

    static void RotacionarDireita(int[] dados, int k)
    {
        int n = dados.Length;

        if (n == 0)
        {
            return;
        }

        k = Normalizar(k, n);

        Inverter(dados, 0, n - 1);
        Inverter(dados, 0, k - 1);
        Inverter(dados, k, n - 1);
    }

    static int[] RotacionarComAuxiliar(int[] dados, int k)
    {
        int n = dados.Length;
        int[] resultado = new int[n];

        if (n == 0)
        {
            return resultado;
        }

        k = Normalizar(k, n);

        for (int i = 0; i < n; i++)
        {
            resultado[(i + k) % n] = dados[i];
        }

        return resultado;
    }

    static void Main()
    {
        int[] valores = { 1, 2, 3, 4, 5 };

        int[] a = (int[])valores.Clone();
        RotacionarDireita(a, 2);
        Console.WriteLine($"direita 2: {string.Join(",", a)}");

        int[] b = (int[])valores.Clone();
        RotacionarDireita(b, 0);
        Console.WriteLine($"direita 0: {string.Join(",", b)}");

        int[] c = (int[])valores.Clone();
        RotacionarDireita(c, 5);
        Console.WriteLine($"direita 5: {string.Join(",", c)}");

        int[] d = (int[])valores.Clone();
        RotacionarDireita(d, 7);
        Console.WriteLine($"direita 7: {string.Join(",", d)}");

        int[] e = (int[])valores.Clone();
        RotacionarDireita(e, -1);
        Console.WriteLine($"direita -1: {string.Join(",", e)}");

        int[] vazio = new int[0];
        RotacionarDireita(vazio, 3);
        Console.WriteLine($"vazio: [{string.Join(",", vazio)}]");

        Console.WriteLine($"auxiliar 2: {string.Join(",", RotacionarComAuxiliar(valores, 2))}");
        Console.WriteLine($"auxiliar -1: {string.Join(",", RotacionarComAuxiliar(valores, -1))}");
        Console.WriteLine($"original intacto: {string.Join(",", valores)}");

        int[] f = (int[])valores.Clone();
        RotacionarDireita(f, 2);
        Console.WriteLine($"iguais: {string.Join(",", f) == string.Join(",", RotacionarComAuxiliar(valores, 2))}");
    }
}
`,
      hints: [
        'Com `k` normalizado para zero, `Inverter(dados, 0, -1)` não faz nada — o laço nem começa.',
        'Na versão com auxiliar, o elemento da posição `i` vai para `(i + k) % n`.',
        'Rotacionar `-1` à direita equivale a rotacionar `n - 1` — a normalização cuida disso.',
      ],
      tests: [
        {
          name: 'Rotacoes variadas',
          stdin: '',
          expectedStdout:
            'direita 2: 4,5,1,2,3\ndireita 0: 1,2,3,4,5\ndireita 5: 1,2,3,4,5\n' +
            'direita 7: 4,5,1,2,3\ndireita -1: 2,3,4,5,1\nvazio: []\n' +
            'auxiliar 2: 4,5,1,2,3\nauxiliar -1: 2,3,4,5,1\noriginal intacto: 1,2,3,4,5\n' +
            'iguais: True',
        },
      ],
    },
  },
  {
    id: 's07c04l08',
    title: 'Particionamento',
    objective: 'Reorganizar um array em grupos segundo um critério, em uma passagem e sem memória extra.',
    concept: [
      {
        kind: 'text',
        body:
          '**Particionar** é separar os elementos em grupos conforme uma condição. É a operação central do quick sort, e resolve sozinha vários problemas.',
      },
      {
        kind: 'code',
        code: `// esquema de Lomuto: dois grupos
int limite = 0;

for (int i = 0; i < n; i++)
{
    if (Condicao(dados[i]))
    {
        Trocar(dados, i, limite);
        limite++;
    }
}
// dados[0..limite-1] satisfazem; o resto nao`,
        caption: 'Uma passagem, `O(1)` de espaço, e a fronteira sai como resultado.',
      },
      {
        kind: 'text',
        body:
          'Para **três** grupos existe o esquema da "bandeira holandesa": três ponteiros dividem o array em menores, iguais e maiores, também em uma passagem.',
      },
      {
        kind: 'output',
        code: `[2, 0, 2, 1, 1, 0]  particionando por igual a 1

menores | iguais | nao classificados | maiores
[0, 0,    1, 1,                        2, 2]`,
      },
      {
        kind: 'table',
        headers: ['Esquema', 'Grupos', 'Estável'],
        rows: [
          ['Lomuto', '2', 'não'],
          ['bandeira holandesa', '3', 'não'],
          ['com array auxiliar', 'quantos quiser', '**sim**'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Nenhum esquema no lugar é estável: as trocas movem elementos por cima de outros. Se a ordem dentro de cada grupo importa, a versão com array auxiliar é a única opção.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A bandeira holandesa resolve em `O(n)` a ordenação de um array que só tem três valores distintos — algo que nenhum algoritmo por comparação faz melhor que `O(n log n)` no caso geral.',
      },
    ],
    quiz: [
      {
        id: 's07c04l08q1',
        type: 'single',
        prompt: 'O que o esquema de Lomuto devolve além do array reorganizado?',
        options: [
          { id: 'a', text: 'A fronteira entre os dois grupos.', correct: true },
          { id: 'b', text: 'O maior elemento.' },
          { id: 'c', text: 'O número de trocas.' },
          { id: 'd', text: 'Nada além do array.' },
        ],
        explanation:
          'A fronteira é o que o quick sort usa para saber onde partir a recursão.',
      },
      {
        id: 's07c04l08q2',
        type: 'single',
        prompt: 'Por que nenhum esquema no lugar é estável?',
        options: [
          { id: 'a', text: 'Porque as trocas movem elementos por cima de outros.', correct: true },
          { id: 'b', text: 'Porque usam recursão.' },
          { id: 'c', text: 'Porque comparam vizinhos.' },
          { id: 'd', text: 'Eles são estáveis.' },
        ],
        explanation:
          'A troca com um elemento distante inverte a ordem relativa de quem estava entre eles.',
      },
      {
        id: 's07c04l08q3',
        type: 'single',
        prompt: 'O que a bandeira holandesa permite fazer em `O(n)`?',
        options: [
          { id: 'a', text: 'Ordenar um array com apenas três valores distintos.', correct: true },
          { id: 'b', text: 'Ordenar qualquer array.' },
          { id: 'c', text: 'Encontrar o maior elemento.' },
          { id: 'd', text: 'Remover duplicatas.' },
        ],
        explanation:
          'Ela escapa do limite `O(n log n)` pelo mesmo motivo do counting sort: não faz comparações no sentido geral.',
      },
    ],
    challenge: {
      brief:
        'Implemente os três esquemas de particionamento e compare o que cada um preserva.',
      requirements: [
        'Complexidade esperada: `O(n)` de tempo para os três',
        '`ParticionarPares(int[] dados)` move os pares para o início e devolve a fronteira, no lugar',
        '`BandeiraHolandesa(int[] dados, int pivo)` separa em menores, iguais e maiores, no lugar, devolvendo `inicioIguais,fimIguais`',
        '`ParticionarEstavel(int[] dados)` devolve um array novo com os pares primeiro, preservando a ordem dentro de cada grupo',
        'Os dois primeiros usam `O(1)` de espaço; o terceiro usa `O(n)`',
        'Os três funcionam com array vazio',
        'O `Main` mostra que só a versão estável preserva a ordem original dentro dos grupos',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva ParticionarPares, BandeiraHolandesa e ParticionarEstavel aqui

    static void Main()
    {
        int[] valores = { 3, 8, 5, 2, 7, 4, 1, 6 };

        int[] a = (int[])valores.Clone();
        int fronteira = ParticionarPares(a);
        Console.WriteLine($"pares primeiro: {string.Join(",", a)} fronteira={fronteira}");

        int[] b = ParticionarEstavel(valores);
        Console.WriteLine($"estavel: {string.Join(",", b)}");

        Console.WriteLine($"preservou ordem: {string.Join(",", b) == "8,2,4,6,3,5,7,1"}");

        int[] tresValores = { 2, 0, 2, 1, 1, 0, 1, 2 };
        int[] c = (int[])tresValores.Clone();
        string faixa = BandeiraHolandesa(c, 1);
        Console.WriteLine($"bandeira: {string.Join(",", c)} iguais={faixa}");

        int[] semIguais = { 5, 3, 9, 7 };
        int[] d = (int[])semIguais.Clone();
        Console.WriteLine($"sem iguais: {string.Join(",", d)} -> {BandeiraHolandesa(d, 6)} => {string.Join(",", d)}");

        int[] vazio = new int[0];
        Console.WriteLine($"vazio pares: {ParticionarPares(vazio)}");
        Console.WriteLine($"vazio bandeira: {BandeiraHolandesa(vazio, 0)}");
        Console.WriteLine($"vazio estavel: [{string.Join(",", ParticionarEstavel(vazio))}]");
    }
}
`,
      solution: `using System;

class Program
{
    static void Trocar(int[] dados, int a, int b)
    {
        int temporario = dados[a];
        dados[a] = dados[b];
        dados[b] = temporario;
    }

    static int ParticionarPares(int[] dados)
    {
        int limite = 0;

        for (int i = 0; i < dados.Length; i++)
        {
            if (dados[i] % 2 == 0)
            {
                Trocar(dados, i, limite);
                limite++;
            }
        }

        return limite;
    }

    static string BandeiraHolandesa(int[] dados, int pivo)
    {
        int menores = 0;
        int atual = 0;
        int maiores = dados.Length - 1;

        while (atual <= maiores)
        {
            if (dados[atual] < pivo)
            {
                Trocar(dados, atual, menores);
                menores++;
                atual++;
            }
            else if (dados[atual] > pivo)
            {
                Trocar(dados, atual, maiores);
                maiores--;
            }
            else
            {
                atual++;
            }
        }

        return $"{menores},{maiores}";
    }

    static int[] ParticionarEstavel(int[] dados)
    {
        int[] resultado = new int[dados.Length];
        int destino = 0;

        foreach (int valor in dados)
        {
            if (valor % 2 == 0)
            {
                resultado[destino] = valor;
                destino++;
            }
        }

        foreach (int valor in dados)
        {
            if (valor % 2 != 0)
            {
                resultado[destino] = valor;
                destino++;
            }
        }

        return resultado;
    }

    static void Main()
    {
        int[] valores = { 3, 8, 5, 2, 7, 4, 1, 6 };

        int[] a = (int[])valores.Clone();
        int fronteira = ParticionarPares(a);
        Console.WriteLine($"pares primeiro: {string.Join(",", a)} fronteira={fronteira}");

        int[] b = ParticionarEstavel(valores);
        Console.WriteLine($"estavel: {string.Join(",", b)}");

        Console.WriteLine($"preservou ordem: {string.Join(",", b) == "8,2,4,6,3,5,7,1"}");

        int[] tresValores = { 2, 0, 2, 1, 1, 0, 1, 2 };
        int[] c = (int[])tresValores.Clone();
        string faixa = BandeiraHolandesa(c, 1);
        Console.WriteLine($"bandeira: {string.Join(",", c)} iguais={faixa}");

        int[] semIguais = { 5, 3, 9, 7 };
        int[] d = (int[])semIguais.Clone();
        Console.WriteLine($"sem iguais: {string.Join(",", d)} -> {BandeiraHolandesa(d, 6)} => {string.Join(",", d)}");

        int[] vazio = new int[0];
        Console.WriteLine($"vazio pares: {ParticionarPares(vazio)}");
        Console.WriteLine($"vazio bandeira: {BandeiraHolandesa(vazio, 0)}");
        Console.WriteLine($"vazio estavel: [{string.Join(",", ParticionarEstavel(vazio))}]");
    }
}
`,
      hints: [
        'Na bandeira holandesa, ao trocar com a região dos maiores **não** avance o ponteiro atual — o elemento que veio de lá ainda não foi classificado.',
        'A versão estável faz duas passagens: primeiro copia os pares, depois os ímpares.',
        'Quando não há elementos iguais ao pivô, a faixa devolvida fica com o início maior que o fim.',
      ],
      tests: [
        {
          name: 'Tres esquemas',
          stdin: '',
          expectedStdout:
            'pares primeiro: 8,2,4,6,7,5,1,3 fronteira=4\n' +
            'estavel: 8,2,4,6,3,5,7,1\npreservou ordem: True\n' +
            'bandeira: 0,0,1,1,1,2,2,2 iguais=2,4\n' +
            'sem iguais: 5,3,9,7 -> 2,1 => 5,3,7,9\n' +
            'vazio pares: 0\nvazio bandeira: 0,-1\nvazio estavel: []',
        },
      ],
    },
  },
  {
    id: 's07c04l09',
    title: 'Prática: mesclando intervalos',
    objective: 'Resolver um problema clássico combinando ordenação com uma passagem linear.',
    concept: [
      {
        kind: 'text',
        body:
          'Mesclar intervalos que se sobrepõem é um problema que aparece em agendas, alocação de recursos e processamento de faixas. A solução tem dois passos.',
      },
      {
        kind: 'table',
        headers: ['Passo', 'O que faz', 'Custo'],
        rows: [
          ['1', 'ordenar por início', '`O(n log n)`'],
          ['2', 'percorrer mesclando com o último', '`O(n)`'],
        ],
      },
      {
        kind: 'text',
        body:
          'A ordenação é o que torna o segundo passo possível: com os intervalos em ordem de início, basta comparar cada um com o **último mesclado**. Não é preciso olhar para trás além disso.',
      },
      {
        kind: 'output',
        code: `entrada:  [1,3] [8,10] [2,6] [15,18]
ordenado: [1,3] [2,6] [8,10] [15,18]

[1,3]                       -> resultado: [1,3]
[2,6]  sobrepoe (2 <= 3)    -> resultado: [1,6]
[8,10] nao sobrepoe          -> resultado: [1,6] [8,10]
[15,18] nao sobrepoe         -> resultado: [1,6] [8,10] [15,18]`,
      },
      {
        kind: 'code',
        code: `// dois intervalos se sobrepoem quando:
bool sobrepoe = proximo.Inicio <= ultimo.Fim;

// ao mesclar, o fim e o maior dos dois:
ultimo.Fim = Math.Max(ultimo.Fim, proximo.Fim);`,
        caption: 'O `Math.Max` é essencial: o próximo intervalo pode estar inteiramente contido no anterior.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Esquecer o `Math.Max` é o erro clássico. Com `[1,10]` seguido de `[2,3]`, atribuir o fim diretamente encolheria o intervalo mesclado de `[1,10]` para `[1,3]`.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Se intervalos que apenas se **tocam** — `[1,3]` e `[3,5]` — devem ser mesclados ou não é uma decisão de domínio. Use `<=` para mesclar e `<` para manter separados, e deixe a escolha explícita no código.',
      },
    ],
    quiz: [
      {
        id: 's07c04l09q1',
        type: 'single',
        prompt: 'Por que ordenar por início antes de mesclar?',
        options: [
          { id: 'a', text: 'Para que baste comparar cada intervalo com o último mesclado.', correct: true },
          { id: 'b', text: 'Para reduzir o número de intervalos.' },
          { id: 'c', text: 'Para permitir busca binária.' },
          { id: 'd', text: 'Não é necessário ordenar.' },
        ],
        explanation:
          'Sem ordenação, um intervalo poderia se sobrepor a qualquer um dos anteriores, exigindo olhar todos.',
      },
      {
        id: 's07c04l09q2',
        type: 'single',
        prompt: 'Por que usar `Math.Max` ao atualizar o fim?',
        options: [
          { id: 'a', text: 'Porque o próximo intervalo pode estar contido no anterior.', correct: true },
          { id: 'b', text: 'Para evitar valores negativos.' },
          { id: 'c', text: 'Para arredondar o resultado.' },
          { id: 'd', text: 'Não é necessário.' },
        ],
        explanation:
          'Com `[1,10]` seguido de `[2,3]`, atribuir direto encolheria o intervalo mesclado.',
      },
      {
        id: 's07c04l09q3',
        type: 'single',
        prompt: 'Intervalos que apenas se tocam devem ser mesclados?',
        options: [
          { id: 'a', text: 'É uma decisão de domínio: `<=` mescla, `<` mantém separados.', correct: true },
          { id: 'b', text: 'Sempre devem ser mesclados.' },
          { id: 'c', text: 'Nunca devem ser mesclados.' },
          { id: 'd', text: 'Depende do tamanho dos intervalos.' },
        ],
        explanation:
          'Um horário que termina às 10h e outro que começa às 10h podem ou não conflitar, conforme a regra do negócio.',
      },
    ],
    challenge: {
      brief:
        'Mescle intervalos sobrepostos e responda três perguntas relacionadas sobre a cobertura resultante.',
      requirements: [
        'Complexidade esperada: `O(n log n)` de tempo',
        '`Intervalo` é um `readonly record struct` com `Inicio` e `Fim` (`int`)',
        '`Mesclar(Intervalo[] intervalos)` devolve os intervalos mesclados, ordenados por início',
        'Intervalos que apenas se tocam **são** mesclados',
        '`CoberturaTotal(Intervalo[] mesclados)` soma o comprimento de todos os intervalos mesclados',
        '`MaiorLacuna(Intervalo[] mesclados)` devolve a maior distância entre o fim de um e o início do próximo, ou `0`',
        '`Inserir(Intervalo[] mesclados, Intervalo novo)` insere um intervalo e devolve o resultado remesclado',
        'Todos funcionam com entrada vazia',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare o readonly record struct Intervalo aqui

class Program
{
    // Escreva Mesclar, CoberturaTotal, MaiorLacuna e Inserir aqui

    static string Formatar(Intervalo[] lista)
    {
        List<string> partes = new List<string>();

        foreach (Intervalo i in lista)
        {
            partes.Add($"[{i.Inicio},{i.Fim}]");
        }

        return partes.Count == 0 ? "vazio" : string.Join(" ", partes);
    }

    static void Main()
    {
        Intervalo[] entrada =
        {
            new Intervalo(1, 3),
            new Intervalo(8, 10),
            new Intervalo(2, 6),
            new Intervalo(15, 18),
        };

        Intervalo[] mesclados = Mesclar(entrada);
        Console.WriteLine($"mesclados: {Formatar(mesclados)}");
        Console.WriteLine($"cobertura: {CoberturaTotal(mesclados)}");
        Console.WriteLine($"maior lacuna: {MaiorLacuna(mesclados)}");

        Intervalo[] contido = { new Intervalo(1, 10), new Intervalo(2, 3) };
        Console.WriteLine($"contido: {Formatar(Mesclar(contido))}");

        Intervalo[] tocando = { new Intervalo(1, 3), new Intervalo(3, 5) };
        Console.WriteLine($"tocando: {Formatar(Mesclar(tocando))}");

        Intervalo[] separados = { new Intervalo(1, 2), new Intervalo(5, 6) };
        Console.WriteLine($"separados: {Formatar(Mesclar(separados))}");
        Console.WriteLine($"lacuna separados: {MaiorLacuna(Mesclar(separados))}");

        Console.WriteLine($"inserindo [4,9]: {Formatar(Inserir(mesclados, new Intervalo(4, 9)))}");
        Console.WriteLine($"inserindo [20,25]: {Formatar(Inserir(mesclados, new Intervalo(20, 25)))}");

        Intervalo[] vazio = new Intervalo[0];
        Console.WriteLine($"vazio: {Formatar(Mesclar(vazio))}");
        Console.WriteLine($"cobertura vazia: {CoberturaTotal(vazio)}");
        Console.WriteLine($"lacuna vazia: {MaiorLacuna(vazio)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

readonly record struct Intervalo(int Inicio, int Fim);

class Program
{
    static Intervalo[] Mesclar(Intervalo[] intervalos)
    {
        if (intervalos.Length == 0)
        {
            return new Intervalo[0];
        }

        Intervalo[] copia = (Intervalo[])intervalos.Clone();

        Array.Sort(copia, (a, b) =>
        {
            int porInicio = a.Inicio.CompareTo(b.Inicio);

            if (porInicio != 0)
            {
                return porInicio;
            }

            return a.Fim.CompareTo(b.Fim);
        });

        List<Intervalo> resultado = new List<Intervalo>();
        resultado.Add(copia[0]);

        for (int i = 1; i < copia.Length; i++)
        {
            Intervalo ultimo = resultado[resultado.Count - 1];
            Intervalo atual = copia[i];

            if (atual.Inicio <= ultimo.Fim)
            {
                resultado[resultado.Count - 1] = new Intervalo(ultimo.Inicio, Math.Max(ultimo.Fim, atual.Fim));
            }
            else
            {
                resultado.Add(atual);
            }
        }

        return resultado.ToArray();
    }

    static int CoberturaTotal(Intervalo[] mesclados)
    {
        int total = 0;

        foreach (Intervalo i in mesclados)
        {
            total += i.Fim - i.Inicio;
        }

        return total;
    }

    static int MaiorLacuna(Intervalo[] mesclados)
    {
        int maior = 0;

        for (int i = 1; i < mesclados.Length; i++)
        {
            int lacuna = mesclados[i].Inicio - mesclados[i - 1].Fim;

            if (lacuna > maior)
            {
                maior = lacuna;
            }
        }

        return maior;
    }

    static Intervalo[] Inserir(Intervalo[] mesclados, Intervalo novo)
    {
        Intervalo[] juntos = new Intervalo[mesclados.Length + 1];

        for (int i = 0; i < mesclados.Length; i++)
        {
            juntos[i] = mesclados[i];
        }

        juntos[mesclados.Length] = novo;

        return Mesclar(juntos);
    }

    static string Formatar(Intervalo[] lista)
    {
        List<string> partes = new List<string>();

        foreach (Intervalo i in lista)
        {
            partes.Add($"[{i.Inicio},{i.Fim}]");
        }

        return partes.Count == 0 ? "vazio" : string.Join(" ", partes);
    }

    static void Main()
    {
        Intervalo[] entrada =
        {
            new Intervalo(1, 3),
            new Intervalo(8, 10),
            new Intervalo(2, 6),
            new Intervalo(15, 18),
        };

        Intervalo[] mesclados = Mesclar(entrada);
        Console.WriteLine($"mesclados: {Formatar(mesclados)}");
        Console.WriteLine($"cobertura: {CoberturaTotal(mesclados)}");
        Console.WriteLine($"maior lacuna: {MaiorLacuna(mesclados)}");

        Intervalo[] contido = { new Intervalo(1, 10), new Intervalo(2, 3) };
        Console.WriteLine($"contido: {Formatar(Mesclar(contido))}");

        Intervalo[] tocando = { new Intervalo(1, 3), new Intervalo(3, 5) };
        Console.WriteLine($"tocando: {Formatar(Mesclar(tocando))}");

        Intervalo[] separados = { new Intervalo(1, 2), new Intervalo(5, 6) };
        Console.WriteLine($"separados: {Formatar(Mesclar(separados))}");
        Console.WriteLine($"lacuna separados: {MaiorLacuna(Mesclar(separados))}");

        Console.WriteLine($"inserindo [4,9]: {Formatar(Inserir(mesclados, new Intervalo(4, 9)))}");
        Console.WriteLine($"inserindo [20,25]: {Formatar(Inserir(mesclados, new Intervalo(20, 25)))}");

        Intervalo[] vazio = new Intervalo[0];
        Console.WriteLine($"vazio: {Formatar(Mesclar(vazio))}");
        Console.WriteLine($"cobertura vazia: {CoberturaTotal(vazio)}");
        Console.WriteLine($"lacuna vazia: {MaiorLacuna(vazio)}");
    }
}
`,
      hints: [
        'O `Inserir` mais simples é juntar o novo intervalo aos existentes e remesclar tudo.',
        'Como `Intervalo` é imutável, atualizar o último mesclado significa substituí-lo na lista por um novo.',
        'O desempate por fim na ordenação torna o resultado determinístico quando dois intervalos começam juntos.',
      ],
      tests: [
        {
          name: 'Mesclagem completa',
          stdin: '',
          expectedStdout:
            'mesclados: [1,6] [8,10] [15,18]\ncobertura: 10\nmaior lacuna: 5\n' +
            'contido: [1,10]\ntocando: [1,5]\n' +
            'separados: [1,2] [5,6]\nlacuna separados: 3\n' +
            'inserindo [4,9]: [1,10] [15,18]\ninserindo [20,25]: [1,6] [8,10] [15,18] [20,25]\n' +
            'vazio: vazio\ncobertura vazia: 0\nlacuna vazia: 0',
        },
      ],
    },
  },
  {
    id: 's07c04l10',
    title: 'Checkpoint: técnicas de array',
    objective: 'Reconhecer qual técnica de array cada problema pede pelo enunciado.',
    concept: [
      {
        kind: 'text',
        body:
          'As técnicas deste capítulo cobrem famílias inteiras de problemas. O valor prático está em reconhecer **qual delas o enunciado está pedindo**.',
      },
      {
        kind: 'table',
        headers: ['O enunciado menciona', 'Técnica'],
        rows: [
          ['par de elementos, array ordenado', 'dois ponteiros'],
          ['todos os blocos de tamanho `k`', 'janela fixa'],
          ['maior ou menor faixa que satisfaz X', 'janela variável'],
          ['muitas consultas de soma de faixa', 'soma de prefixos'],
          ['muitas atualizações de faixa', 'array de diferenças'],
          ['faixa contígua de soma máxima', 'Kadane'],
          ['reorganizar em grupos', 'particionamento'],
          ['faixas que se sobrepõem', 'ordenar e mesclar'],
        ],
      },
      {
        kind: 'text',
        body:
          'Duas perguntas ajudam a escolher: **o array está ordenado?** e **quantas consultas ou atualizações haverá?**. Elas eliminam a maioria das opções de uma vez.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Quase todas essas técnicas trocam um laço aninhado por uma passagem com estado. O estado — soma, conjunto, ponteiro, acumulado — é o que carrega a informação que o laço interno recalculava.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Confirme as pré-condições antes de aplicar. Dois ponteiros convergentes exigem ordenação; janela deslizante de soma exige valores positivos; soma de prefixos exige dados imutáveis.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Quando nenhuma técnica se encaixa, verifique se o problema não fica fácil **depois de ordenar**. Ordenar custa `O(n log n)` e frequentemente revela a estrutura que faltava.',
      },
    ],
    quiz: [
      {
        id: 's07c04l10q1',
        type: 'single',
        prompt: 'O enunciado pede a maior faixa contígua cuja soma não passa de um limite. Qual técnica?',
        options: [
          { id: 'a', text: 'Janela deslizante variável.', correct: true },
          { id: 'b', text: 'Janela de tamanho fixo.' },
          { id: 'c', text: 'Soma de prefixos.' },
          { id: 'd', text: 'Kadane.' },
        ],
        explanation:
          'O tamanho não é dado e existe uma condição a satisfazer — a assinatura da janela variável.',
      },
      {
        id: 's07c04l10q2',
        type: 'single',
        prompt: 'Quais duas perguntas mais ajudam a escolher a técnica?',
        options: [
          { id: 'a', text: 'O array está ordenado? Quantas consultas ou atualizações haverá?', correct: true },
          { id: 'b', text: 'Qual o tamanho do array? Os valores são inteiros?' },
          { id: 'c', text: 'Há repetições? O array cabe na memória?' },
          { id: 'd', text: 'Quantas linhas tem a solução? Ela usa recursão?' },
        ],
        explanation:
          'A ordenação habilita dois ponteiros e busca binária; o volume de consultas decide se um pré-processamento se paga.',
      },
      {
        id: 's07c04l10q3',
        type: 'single',
        prompt: 'O que quase todas essas técnicas têm em comum?',
        options: [
          { id: 'a', text: 'Trocam um laço aninhado por uma passagem com estado.', correct: true },
          { id: 'b', text: 'Usam recursão.' },
          { id: 'c', text: 'Exigem memória extra.' },
          { id: 'd', text: 'Só funcionam com inteiros.' },
        ],
        explanation:
          'O estado mantido carrega a informação que o laço interno recalculava a cada posição.',
      },
    ],
    challenge: {
      brief:
        'Resolva cinco problemas, cada um exigindo uma técnica diferente deste capítulo, todos com a complexidade indicada.',
      requirements: [
        '`TresSomamZero(int[] dados)` devolve quantos trios distintos somam zero, em `O(n²)`, ordenando e usando dois ponteiros',
        '`MaiorMediaDeK(int[] dados, int k)` devolve a maior média inteira de uma janela de tamanho `k`, em `O(n)`',
        '`ConsultasDeSoma(int[] dados, int[,] faixas)` devolve as somas separadas por espaço, em `O(n + q)`',
        '`MelhorFaixa(int[] dados)` devolve a maior soma contígua, em `O(n)`',
        '`AgruparPorSinal(int[] dados)` reorganiza em negativos, zeros e positivos, em `O(n)` e `O(1)` de espaço',
        'Cada solução usa exatamente a técnica indicada',
        'Todos funcionam com entrada vazia',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Escreva TresSomamZero, MaiorMediaDeK, ConsultasDeSoma,
    // MelhorFaixa e AgruparPorSinal aqui

    static void Main()
    {
        int[] trios = { -1, 0, 1, 2, -1, -4 };
        Console.WriteLine($"trios que somam zero: {TresSomamZero(trios)}");
        Console.WriteLine($"trios vazio: {TresSomamZero(new int[0])}");

        int[] janelas = { 1, 12, -5, -6, 50, 3 };
        Console.WriteLine($"maior media k=4: {MaiorMediaDeK(janelas, 4)}");
        Console.WriteLine($"maior media k=1: {MaiorMediaDeK(janelas, 1)}");
        Console.WriteLine($"maior media k invalido: {MaiorMediaDeK(janelas, 99)}");

        int[] dados = { 3, 1, 4, 1, 5, 9 };
        int[,] faixas = { { 0, 2 }, { 1, 4 }, { 0, 5 }, { 3, 3 } };
        Console.WriteLine($"consultas: {ConsultasDeSoma(dados, faixas)}");

        int[] kadane = { -2, 1, -3, 4, -1, 2, 1, -5, 4 };
        Console.WriteLine($"melhor faixa: {MelhorFaixa(kadane)}");
        Console.WriteLine($"melhor faixa vazia: {MelhorFaixa(new int[0])}");

        int[] sinais = { 3, -1, 0, -5, 2, 0, -3, 7 };
        AgruparPorSinal(sinais);
        Console.WriteLine($"agrupado: {string.Join(",", sinais)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static int TresSomamZero(int[] dados)
    {
        if (dados.Length < 3)
        {
            return 0;
        }

        int[] copia = (int[])dados.Clone();
        Array.Sort(copia);

        int total = 0;

        for (int i = 0; i < copia.Length - 2; i++)
        {
            if (i > 0 && copia[i] == copia[i - 1])
            {
                continue;
            }

            int esquerda = i + 1;
            int direita = copia.Length - 1;

            while (esquerda < direita)
            {
                int soma = copia[i] + copia[esquerda] + copia[direita];

                if (soma == 0)
                {
                    total++;

                    while (esquerda < direita && copia[esquerda] == copia[esquerda + 1])
                    {
                        esquerda++;
                    }

                    while (esquerda < direita && copia[direita] == copia[direita - 1])
                    {
                        direita--;
                    }

                    esquerda++;
                    direita--;
                }
                else if (soma < 0)
                {
                    esquerda++;
                }
                else
                {
                    direita--;
                }
            }
        }

        return total;
    }

    static int MaiorMediaDeK(int[] dados, int k)
    {
        if (k <= 0 || k > dados.Length)
        {
            return 0;
        }

        int soma = 0;

        for (int i = 0; i < k; i++)
        {
            soma += dados[i];
        }

        int melhor = soma;

        for (int i = k; i < dados.Length; i++)
        {
            soma += dados[i] - dados[i - k];

            if (soma > melhor)
            {
                melhor = soma;
            }
        }

        return melhor / k;
    }

    static string ConsultasDeSoma(int[] dados, int[,] faixas)
    {
        int[] prefixo = new int[dados.Length + 1];

        for (int i = 0; i < dados.Length; i++)
        {
            prefixo[i + 1] = prefixo[i] + dados[i];
        }

        List<int> respostas = new List<int>();

        for (int q = 0; q < faixas.GetLength(0); q++)
        {
            int a = faixas[q, 0];
            int b = faixas[q, 1];

            respostas.Add(prefixo[b + 1] - prefixo[a]);
        }

        return respostas.Count == 0 ? "nenhuma" : string.Join(" ", respostas);
    }

    static int MelhorFaixa(int[] dados)
    {
        if (dados.Length == 0)
        {
            return 0;
        }

        int atual = dados[0];
        int melhor = dados[0];

        for (int i = 1; i < dados.Length; i++)
        {
            atual = Math.Max(dados[i], atual + dados[i]);

            if (atual > melhor)
            {
                melhor = atual;
            }
        }

        return melhor;
    }

    static void AgruparPorSinal(int[] dados)
    {
        int negativos = 0;
        int atual = 0;
        int positivos = dados.Length - 1;

        while (atual <= positivos)
        {
            if (dados[atual] < 0)
            {
                int temporario = dados[atual];
                dados[atual] = dados[negativos];
                dados[negativos] = temporario;

                negativos++;
                atual++;
            }
            else if (dados[atual] > 0)
            {
                int temporario = dados[atual];
                dados[atual] = dados[positivos];
                dados[positivos] = temporario;

                positivos--;
            }
            else
            {
                atual++;
            }
        }
    }

    static void Main()
    {
        int[] trios = { -1, 0, 1, 2, -1, -4 };
        Console.WriteLine($"trios que somam zero: {TresSomamZero(trios)}");
        Console.WriteLine($"trios vazio: {TresSomamZero(new int[0])}");

        int[] janelas = { 1, 12, -5, -6, 50, 3 };
        Console.WriteLine($"maior media k=4: {MaiorMediaDeK(janelas, 4)}");
        Console.WriteLine($"maior media k=1: {MaiorMediaDeK(janelas, 1)}");
        Console.WriteLine($"maior media k invalido: {MaiorMediaDeK(janelas, 99)}");

        int[] dados = { 3, 1, 4, 1, 5, 9 };
        int[,] faixas = { { 0, 2 }, { 1, 4 }, { 0, 5 }, { 3, 3 } };
        Console.WriteLine($"consultas: {ConsultasDeSoma(dados, faixas)}");

        int[] kadane = { -2, 1, -3, 4, -1, 2, 1, -5, 4 };
        Console.WriteLine($"melhor faixa: {MelhorFaixa(kadane)}");
        Console.WriteLine($"melhor faixa vazia: {MelhorFaixa(new int[0])}");

        int[] sinais = { 3, -1, 0, -5, 2, 0, -3, 7 };
        AgruparPorSinal(sinais);
        Console.WriteLine($"agrupado: {string.Join(",", sinais)}");
    }
}
`,
      hints: [
        'No `TresSomamZero`, pular valores repetidos no laço externo e após cada acerto evita contar o mesmo trio duas vezes.',
        'O `AgruparPorSinal` é a bandeira holandesa com o pivô sendo o zero.',
        'A média da janela é calculada uma vez só, no fim, a partir da maior soma encontrada.',
      ],
      tests: [
        {
          name: 'Cinco tecnicas',
          stdin: '',
          expectedStdout:
            'trios que somam zero: 2\ntrios vazio: 0\n' +
            'maior media k=4: 12\nmaior media k=1: 50\nmaior media k invalido: 0\n' +
            'consultas: 8 11 23 1\n' +
            'melhor faixa: 6\nmelhor faixa vazia: 0\n' +
            'agrupado: -3,-1,-5,0,0,2,7,3',
        },
      ],
    },
  },
]
