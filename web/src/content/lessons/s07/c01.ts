import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's07c01l01',
    title: 'Contando operações',
    objective: 'Medir o custo de um algoritmo contando o que ele faz, em vez de cronometrar.',
    concept: [
      {
        kind: 'text',
        body:
          'Antes de falar de notação, vale entender o que se mede. O custo de um algoritmo é a **quantidade de trabalho** que ele executa — e a forma mais honesta de medir isso é contar operações.',
      },
      {
        kind: 'code',
        code: `int operacoes = 0;

for (int i = 0; i < n; i++)
{
    operacoes++;        // uma comparacao por elemento
    if (dados[i] == alvo) break;
}`,
        caption: 'O contador transforma "parece rápido" em um número.',
      },
      {
        kind: 'table',
        headers: ['Medir por', 'Vantagem', 'Problema'],
        rows: [
          ['cronômetro', 'reflete o mundo real', 'varia por máquina e por execução'],
          ['**contagem**', '**determinística e reproduzível**', 'ignora o custo real de cada operação'],
        ],
      },
      {
        kind: 'text',
        body:
          'A contagem é preferível para **comparar** algoritmos, porque isola a lógica do hardware. Dois programas contando 5.000 e 5.000.000 de operações têm uma diferença que nenhuma máquina rápida esconde.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O que interessa é como a contagem **cresce** com a entrada, não o número em si. Um algoritmo que faz 3n operações e outro que faz 100n são igualmente escaláveis; um que faz n² não é, por menor que seja a constante.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Três cenários costumam ter custos diferentes: melhor caso, caso médio e **pior caso**. A análise padrão usa o pior caso, porque é a única garantia — o resto é sorte.',
      },
    ],
    quiz: [
      {
        id: 's07c01l01q1',
        type: 'single',
        prompt: 'Por que contar operações é melhor que cronometrar para comparar algoritmos?',
        options: [
          { id: 'a', text: 'Porque é determinístico e não varia por máquina.', correct: true },
          { id: 'b', text: 'Porque é mais rápido de executar.' },
          { id: 'c', text: 'Porque reflete melhor o mundo real.' },
          { id: 'd', text: 'Porque usa menos memória.' },
        ],
        explanation:
          'O cronômetro mistura a lógica do algoritmo com a velocidade da máquina, o compilador e a carga do sistema.',
      },
      {
        id: 's07c01l01q2',
        type: 'single',
        prompt: 'O que realmente importa na contagem?',
        options: [
          { id: 'a', text: 'Como ela cresce com o tamanho da entrada.', correct: true },
          { id: 'b', text: 'O número absoluto de operações.' },
          { id: 'c', text: 'A quantidade de linhas de código.' },
          { id: 'd', text: 'O número de variáveis usadas.' },
        ],
        explanation:
          '3n e 100n crescem do mesmo jeito. É n² que muda a categoria do problema.',
      },
      {
        id: 's07c01l01q3',
        type: 'single',
        prompt: 'Qual cenário a análise padrão usa?',
        options: [
          { id: 'a', text: 'O pior caso, porque é a única garantia.', correct: true },
          { id: 'b', text: 'O melhor caso.' },
          { id: 'c', text: 'O caso médio.' },
          { id: 'd', text: 'A média dos três.' },
        ],
        explanation:
          'Melhor caso é sorte e caso médio depende de supor uma distribuição. O pior caso vale sempre.',
      },
    ],
    challenge: {
      brief:
        'Instrumente três algoritmos com contadores e compare quantas operações cada um faz nos três cenários.',
      requirements: [
        '`BuscaLinear(int[] dados, int alvo)` devolve o índice ou `-1`, contando cada comparação em `operacoes`',
        '`SomarTodos(int[] dados)` soma tudo, contando uma operação por elemento',
        '`ParesIguais(int[] dados)` conta pares de índices distintos com valores iguais, contando uma operação por comparação feita',
        '`operacoes` é um campo estático zerado por `Zerar()` antes de cada medição',
        'O `Main` mede o melhor caso, o pior caso e o caso ausente da busca linear',
        'A contagem não usa cronômetro',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int operacoes = 0;

    static void Zerar()
    {
        operacoes = 0;
    }

    // Escreva BuscaLinear, SomarTodos e ParesIguais aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] dados = new int[n];

        for (int i = 0; i < n; i++)
        {
            dados[i] = i;
        }

        Zerar();
        int primeiro = BuscaLinear(dados, dados[0]);
        Console.WriteLine($"melhor caso: achou {primeiro} em {operacoes} operacoes");

        Zerar();
        int ultimo = BuscaLinear(dados, dados[n - 1]);
        Console.WriteLine($"pior caso: achou {ultimo} em {operacoes} operacoes");

        Zerar();
        int ausente = BuscaLinear(dados, -1);
        Console.WriteLine($"ausente: achou {ausente} em {operacoes} operacoes");

        Zerar();
        int soma = SomarTodos(dados);
        Console.WriteLine($"soma: {soma} em {operacoes} operacoes");

        Zerar();
        int pares = ParesIguais(dados);
        Console.WriteLine($"pares iguais: {pares} em {operacoes} operacoes");
    }
}
`,
      solution: `using System;

class Program
{
    static int operacoes = 0;

    static void Zerar()
    {
        operacoes = 0;
    }

    static int BuscaLinear(int[] dados, int alvo)
    {
        for (int i = 0; i < dados.Length; i++)
        {
            operacoes++;

            if (dados[i] == alvo)
            {
                return i;
            }
        }

        return -1;
    }

    static int SomarTodos(int[] dados)
    {
        int soma = 0;

        for (int i = 0; i < dados.Length; i++)
        {
            operacoes++;
            soma += dados[i];
        }

        return soma;
    }

    static int ParesIguais(int[] dados)
    {
        int pares = 0;

        for (int i = 0; i < dados.Length; i++)
        {
            for (int j = i + 1; j < dados.Length; j++)
            {
                operacoes++;

                if (dados[i] == dados[j])
                {
                    pares++;
                }
            }
        }

        return pares;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] dados = new int[n];

        for (int i = 0; i < n; i++)
        {
            dados[i] = i;
        }

        Zerar();
        int primeiro = BuscaLinear(dados, dados[0]);
        Console.WriteLine($"melhor caso: achou {primeiro} em {operacoes} operacoes");

        Zerar();
        int ultimo = BuscaLinear(dados, dados[n - 1]);
        Console.WriteLine($"pior caso: achou {ultimo} em {operacoes} operacoes");

        Zerar();
        int ausente = BuscaLinear(dados, -1);
        Console.WriteLine($"ausente: achou {ausente} em {operacoes} operacoes");

        Zerar();
        int soma = SomarTodos(dados);
        Console.WriteLine($"soma: {soma} em {operacoes} operacoes");

        Zerar();
        int pares = ParesIguais(dados);
        Console.WriteLine($"pares iguais: {pares} em {operacoes} operacoes");
    }
}
`,
      hints: [
        'Incremente o contador **antes** da comparação, para que a operação seja contada mesmo quando ela encerra o laço.',
        'O `ParesIguais` usa `j = i + 1` para não comparar um elemento consigo mesmo nem repetir pares.',
        'Com valores todos distintos, o número de pares iguais é zero — mas as comparações acontecem do mesmo jeito.',
      ],
      tests: [
        {
          name: 'Dez elementos',
          stdin: '10\n',
          expectedStdout:
            'melhor caso: achou 0 em 1 operacoes\npior caso: achou 9 em 10 operacoes\n' +
            'ausente: achou -1 em 10 operacoes\nsoma: 45 em 10 operacoes\n' +
            'pares iguais: 0 em 45 operacoes',
        },
        {
          name: 'Cem elementos',
          stdin: '100\n',
          expectedStdout:
            'melhor caso: achou 0 em 1 operacoes\npior caso: achou 99 em 100 operacoes\n' +
            'ausente: achou -1 em 100 operacoes\nsoma: 4950 em 100 operacoes\n' +
            'pares iguais: 0 em 4950 operacoes',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's07c01l02',
    title: 'Notação Big-O',
    objective: 'Descrever o crescimento de um algoritmo descartando constantes e termos menores.',
    concept: [
      {
        kind: 'text',
        body:
          'A notação **Big-O** descreve como o custo cresce quando a entrada cresce. Ela ignora deliberadamente detalhes que não mudam essa forma de crescimento.',
      },
      {
        kind: 'table',
        headers: ['Contagem real', 'Big-O', 'O que foi descartado'],
        rows: [
          ['`3n + 7`', '`O(n)`', 'a constante 3 e o termo 7'],
          ['`n² + 100n`', '`O(n²)`', 'o termo linear, menor'],
          ['`5`', '`O(1)`', 'a constante'],
          ['`2n log n + n`', '`O(n log n)`', 'a constante e o termo linear'],
        ],
      },
      {
        kind: 'text',
        body:
          'As duas regras são: **descarte constantes multiplicativas** e **mantenha apenas o termo que cresce mais rápido**. Com entrada grande, o termo dominante decide tudo.',
      },
      {
        kind: 'output',
        code: `n = 10        n² = 100        100n = 1.000     <- linear ainda perde
n = 100       n² = 10.000     100n = 10.000    <- empate
n = 1.000     n² = 1.000.000  100n = 100.000   <- quadratico ja perdeu feio`,
        caption: 'A constante 100 importa para entradas pequenas e deixa de importar para sempre.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Big-O é um limite **superior** de crescimento. Dizer que um algoritmo é `O(n²)` não afirma que ele sempre faz n² operações — afirma que ele não cresce mais rápido que isso.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Constantes descartadas ainda existem no mundo real. Para entradas pequenas, um `O(n²)` com constante minúscula pode ser mais rápido que um `O(n log n)` com constante grande — é por isso que bibliotecas trocam de algoritmo abaixo de certo tamanho.',
      },
    ],
    quiz: [
      {
        id: 's07c01l02q1',
        type: 'single',
        prompt: 'Qual é o Big-O de `n² + 100n + 500`?',
        options: [
          { id: 'a', code: 'O(n²)', correct: true },
          { id: 'b', code: 'O(n² + 100n)' },
          { id: 'c', code: 'O(n)' },
          { id: 'd', code: 'O(500)' },
        ],
        explanation:
          'Mantém-se apenas o termo dominante. Para n grande, `n²` supera qualquer múltiplo de `n`.',
      },
      {
        id: 's07c01l02q2',
        type: 'single',
        prompt: 'O que Big-O afirma exatamente?',
        options: [
          { id: 'a', text: 'Um limite superior de crescimento.', correct: true },
          { id: 'b', text: 'O número exato de operações.' },
          { id: 'c', text: 'O tempo em milissegundos.' },
          { id: 'd', text: 'O melhor caso do algoritmo.' },
        ],
        explanation:
          '`O(n²)` diz que o custo não cresce mais rápido que `n²`, não que ele seja exatamente `n²`.',
      },
      {
        id: 's07c01l02q3',
        type: 'single',
        prompt: 'Por que bibliotecas trocam de algoritmo para entradas pequenas?',
        options: [
          { id: 'a', text: 'Porque as constantes descartadas ainda importam nessa escala.', correct: true },
          { id: 'b', text: 'Porque Big-O está errado.' },
          { id: 'c', text: 'Para economizar memória.' },
          { id: 'd', text: 'Por compatibilidade.' },
        ],
        explanation:
          'Um `O(n²)` simples pode vencer um `O(n log n)` com muita sobrecarga quando n é pequeno.',
      },
    ],
    challenge: {
      brief:
        'Meça a contagem real de quatro algoritmos e confirme que ela acompanha a classe Big-O prevista quando a entrada dobra.',
      requirements: [
        '`Constante(int[] dados)` devolve o primeiro elemento, contando `1` operação',
        '`Linear(int[] dados)` percorre tudo uma vez, contando `n` operações',
        '`LinearDuasVezes(int[] dados)` percorre duas vezes, contando `2n` operações',
        '`Quadratico(int[] dados)` faz um laço aninhado completo, contando `n²` operações',
        '`Medir(string nome, Func<int[], int> algoritmo, int[] dados)` zera o contador, executa e imprime `nome: N operacoes`',
        'O `Main` mede com `n` e depois com `2n`, mostrando o fator de crescimento de cada um',
        'O fator é impresso como `nome cresceu Nx`, com divisão inteira',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int operacoes = 0;

    // Escreva Constante, Linear, LinearDuasVezes, Quadratico e Medir aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] pequeno = new int[n];
        int[] grande = new int[n * 2];

        for (int i = 0; i < pequeno.Length; i++) pequeno[i] = i;
        for (int i = 0; i < grande.Length; i++) grande[i] = i;

        Console.WriteLine($"--- n = {n} ---");
        int c1 = Medir("constante", Constante, pequeno);
        int l1 = Medir("linear", Linear, pequeno);
        int d1 = Medir("linear x2", LinearDuasVezes, pequeno);
        int q1 = Medir("quadratico", Quadratico, pequeno);

        Console.WriteLine($"--- n = {n * 2} ---");
        int c2 = Medir("constante", Constante, grande);
        int l2 = Medir("linear", Linear, grande);
        int d2 = Medir("linear x2", LinearDuasVezes, grande);
        int q2 = Medir("quadratico", Quadratico, grande);

        Console.WriteLine("--- crescimento ---");
        Console.WriteLine($"constante cresceu {c2 / c1}x");
        Console.WriteLine($"linear cresceu {l2 / l1}x");
        Console.WriteLine($"linear x2 cresceu {d2 / d1}x");
        Console.WriteLine($"quadratico cresceu {q2 / q1}x");
    }
}
`,
      solution: `using System;

class Program
{
    static int operacoes = 0;

    static int Constante(int[] dados)
    {
        operacoes++;
        return dados[0];
    }

    static int Linear(int[] dados)
    {
        int soma = 0;

        for (int i = 0; i < dados.Length; i++)
        {
            operacoes++;
            soma += dados[i];
        }

        return soma;
    }

    static int LinearDuasVezes(int[] dados)
    {
        int soma = 0;

        for (int i = 0; i < dados.Length; i++)
        {
            operacoes++;
            soma += dados[i];
        }

        for (int i = 0; i < dados.Length; i++)
        {
            operacoes++;
            soma += dados[i];
        }

        return soma;
    }

    static int Quadratico(int[] dados)
    {
        int total = 0;

        for (int i = 0; i < dados.Length; i++)
        {
            for (int j = 0; j < dados.Length; j++)
            {
                operacoes++;
                total += dados[i] + dados[j];
            }
        }

        return total;
    }

    static int Medir(string nome, Func<int[], int> algoritmo, int[] dados)
    {
        operacoes = 0;
        algoritmo(dados);
        Console.WriteLine($"{nome}: {operacoes} operacoes");
        return operacoes;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] pequeno = new int[n];
        int[] grande = new int[n * 2];

        for (int i = 0; i < pequeno.Length; i++) pequeno[i] = i;
        for (int i = 0; i < grande.Length; i++) grande[i] = i;

        Console.WriteLine($"--- n = {n} ---");
        int c1 = Medir("constante", Constante, pequeno);
        int l1 = Medir("linear", Linear, pequeno);
        int d1 = Medir("linear x2", LinearDuasVezes, pequeno);
        int q1 = Medir("quadratico", Quadratico, pequeno);

        Console.WriteLine($"--- n = {n * 2} ---");
        int c2 = Medir("constante", Constante, grande);
        int l2 = Medir("linear", Linear, grande);
        int d2 = Medir("linear x2", LinearDuasVezes, grande);
        int q2 = Medir("quadratico", Quadratico, grande);

        Console.WriteLine("--- crescimento ---");
        Console.WriteLine($"constante cresceu {c2 / c1}x");
        Console.WriteLine($"linear cresceu {l2 / l1}x");
        Console.WriteLine($"linear x2 cresceu {d2 / d1}x");
        Console.WriteLine($"quadratico cresceu {q2 / q1}x");
    }
}
`,
      hints: [
        'O `Medir` recebe o algoritmo como `Func<int[], int>` — o delegate da Seção 4.',
        'Repare no resultado: dobrar a entrada dobra o linear e **quadruplica** o quadrático.',
        'O `linear x2` faz o dobro de operações do `linear`, mas cresce no mesmo fator — é o que Big-O captura.',
      ],
      tests: [
        {
          name: 'Entrada de dez',
          stdin: '10\n',
          expectedStdout:
            '--- n = 10 ---\nconstante: 1 operacoes\nlinear: 10 operacoes\n' +
            'linear x2: 20 operacoes\nquadratico: 100 operacoes\n' +
            '--- n = 20 ---\nconstante: 1 operacoes\nlinear: 20 operacoes\n' +
            'linear x2: 40 operacoes\nquadratico: 400 operacoes\n' +
            '--- crescimento ---\nconstante cresceu 1x\nlinear cresceu 2x\n' +
            'linear x2 cresceu 2x\nquadratico cresceu 4x',
        },
        {
          name: 'Entrada de cinquenta',
          stdin: '50\n',
          expectedStdout:
            '--- n = 50 ---\nconstante: 1 operacoes\nlinear: 50 operacoes\n' +
            'linear x2: 100 operacoes\nquadratico: 2500 operacoes\n' +
            '--- n = 100 ---\nconstante: 1 operacoes\nlinear: 100 operacoes\n' +
            'linear x2: 200 operacoes\nquadratico: 10000 operacoes\n' +
            '--- crescimento ---\nconstante cresceu 1x\nlinear cresceu 2x\n' +
            'linear x2 cresceu 2x\nquadratico cresceu 4x',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's07c01l03',
    title: 'O(1), O(n) e O(n²)',
    objective: 'Reconhecer as três classes mais comuns pelo formato do código.',
    concept: [
      {
        kind: 'text',
        body:
          'Essas três cobrem a maioria do código do dia a dia, e cada uma tem uma assinatura visual que dá para reconhecer de imediato.',
      },
      {
        kind: 'table',
        headers: ['Classe', 'Formato', 'Exemplo'],
        rows: [
          ['`O(1)`', 'nenhum laço sobre a entrada', 'acessar `array[i]`, `dicionario[chave]`'],
          ['`O(n)`', 'um laço sobre a entrada', 'somar, buscar linearmente, contar'],
          ['`O(n²)`', 'laço aninhado sobre a entrada', 'comparar todos os pares'],
        ],
      },
      {
        kind: 'code',
        code: `// O(1) - nao depende do tamanho
int primeiro = dados[0];

// O(n) - uma passagem
foreach (int x in dados) soma += x;

// O(n²) - cada elemento contra cada elemento
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        Comparar(dados[i], dados[j]);`,
      },
      {
        kind: 'text',
        body:
          'O acesso a `Dictionary` e `HashSet` ser `O(1)` é o que torna essas coleções tão valiosas: elas transformam uma busca `O(n)` em uma consulta de custo constante, e frequentemente um algoritmo `O(n²)` em `O(n)`.',
      },
      {
        kind: 'compare',
        good: `var vistos = new HashSet<int>();

foreach (int x in dados)
{
    if (vistos.Contains(x)) return true;
    vistos.Add(x);
}
// O(n)`,
        bad: `for (int i = 0; i < n; i++)
    for (int j = i + 1; j < n; j++)
        if (dados[i] == dados[j])
            return true;
// O(n²)`,
        goodLabel: 'Conjunto: uma passagem',
        badLabel: 'Todos contra todos',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Trocar `O(n²)` por `O(n)` normalmente custa memória: o `HashSet` guarda até n elementos. Essa troca entre tempo e espaço é uma das decisões mais recorrentes em algoritmos.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Nem todo laço aninhado é `O(n²)`. Se o laço interno percorre uma coleção **de tamanho fixo**, ou se o total de iterações internas somadas é proporcional a n, o algoritmo continua linear.',
      },
    ],
    quiz: [
      {
        id: 's07c01l03q1',
        type: 'single',
        prompt: 'Qual é a complexidade de consultar um `Dictionary` por chave?',
        options: [
          { id: 'a', code: 'O(1)', correct: true },
          { id: 'b', code: 'O(n)' },
          { id: 'c', code: 'O(log n)' },
          { id: 'd', code: 'O(n²)' },
        ],
        explanation:
          'O custo não depende de quantos itens existem — é o que permite trocar buscas lineares por consultas diretas.',
      },
      {
        id: 's07c01l03q2',
        type: 'single',
        prompt: 'O que custa a troca de `O(n²)` por `O(n)` usando um `HashSet`?',
        options: [
          { id: 'a', text: 'Memória: o conjunto guarda até n elementos.', correct: true },
          { id: 'b', text: 'Nada: é ganho puro.' },
          { id: 'c', text: 'Precisão do resultado.' },
          { id: 'd', text: 'A ordem dos elementos originais.' },
        ],
        explanation:
          'É a troca clássica entre tempo e espaço, e quase sempre vale a pena quando n é grande.',
      },
      {
        id: 's07c01l03q3',
        type: 'single',
        prompt: 'Um laço aninhado é sempre `O(n²)`?',
        options: [
          { id: 'a', text: 'Não: se o laço interno é de tamanho fixo, continua linear.', correct: true },
          { id: 'b', text: 'Sim, sempre.' },
          { id: 'c', text: 'Só quando os dois usam a mesma variável.' },
          { id: 'd', text: 'Só em arrays.' },
        ],
        explanation:
          'O que importa é o total de iterações em função de n, não o número de laços escritos.',
      },
    ],
    challenge: {
      brief:
        'Implemente a mesma pergunta de três formas com complexidades diferentes e compare as contagens.',
      requirements: [
        'A pergunta é: existem elementos repetidos no array?',
        '`TemRepetidoQuadratico(int[] dados)` compara todos os pares, contando cada comparação',
        '`TemRepetidoComConjunto(int[] dados)` usa um `HashSet<int>`, contando uma operação por elemento visitado',
        '`PrimeiroElemento(int[] dados)` devolve `dados[0]` contando `1` operação, representando `O(1)`',
        'Os três devolvem o resultado correto',
        '`operacoes` é zerado antes de cada medição',
        'O `Main` mede com um array sem repetição e com outro que repete no fim',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static int operacoes = 0;

    // Escreva PrimeiroElemento, TemRepetidoQuadratico e TemRepetidoComConjunto aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] semRepeticao = new int[n];
        for (int i = 0; i < n; i++) semRepeticao[i] = i;

        int[] comRepeticao = new int[n];
        for (int i = 0; i < n; i++) comRepeticao[i] = i;
        comRepeticao[n - 1] = 0;

        operacoes = 0;
        int primeiro = PrimeiroElemento(semRepeticao);
        Console.WriteLine($"O(1): {primeiro} em {operacoes} operacoes");

        operacoes = 0;
        bool q1 = TemRepetidoQuadratico(semRepeticao);
        Console.WriteLine($"quadratico sem repetir: {q1} em {operacoes} operacoes");

        operacoes = 0;
        bool c1 = TemRepetidoComConjunto(semRepeticao);
        Console.WriteLine($"conjunto sem repetir: {c1} em {operacoes} operacoes");

        operacoes = 0;
        bool q2 = TemRepetidoQuadratico(comRepeticao);
        Console.WriteLine($"quadratico com repeticao: {q2} em {operacoes} operacoes");

        operacoes = 0;
        bool c2 = TemRepetidoComConjunto(comRepeticao);
        Console.WriteLine($"conjunto com repeticao: {c2} em {operacoes} operacoes");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static int operacoes = 0;

    static int PrimeiroElemento(int[] dados)
    {
        operacoes++;
        return dados[0];
    }

    static bool TemRepetidoQuadratico(int[] dados)
    {
        for (int i = 0; i < dados.Length; i++)
        {
            for (int j = i + 1; j < dados.Length; j++)
            {
                operacoes++;

                if (dados[i] == dados[j])
                {
                    return true;
                }
            }
        }

        return false;
    }

    static bool TemRepetidoComConjunto(int[] dados)
    {
        HashSet<int> vistos = new HashSet<int>();

        foreach (int valor in dados)
        {
            operacoes++;

            if (vistos.Contains(valor))
            {
                return true;
            }

            vistos.Add(valor);
        }

        return false;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] semRepeticao = new int[n];
        for (int i = 0; i < n; i++) semRepeticao[i] = i;

        int[] comRepeticao = new int[n];
        for (int i = 0; i < n; i++) comRepeticao[i] = i;
        comRepeticao[n - 1] = 0;

        operacoes = 0;
        int primeiro = PrimeiroElemento(semRepeticao);
        Console.WriteLine($"O(1): {primeiro} em {operacoes} operacoes");

        operacoes = 0;
        bool q1 = TemRepetidoQuadratico(semRepeticao);
        Console.WriteLine($"quadratico sem repetir: {q1} em {operacoes} operacoes");

        operacoes = 0;
        bool c1 = TemRepetidoComConjunto(semRepeticao);
        Console.WriteLine($"conjunto sem repetir: {c1} em {operacoes} operacoes");

        operacoes = 0;
        bool q2 = TemRepetidoQuadratico(comRepeticao);
        Console.WriteLine($"quadratico com repeticao: {q2} em {operacoes} operacoes");

        operacoes = 0;
        bool c2 = TemRepetidoComConjunto(comRepeticao);
        Console.WriteLine($"conjunto com repeticao: {c2} em {operacoes} operacoes");
    }
}
`,
      hints: [
        'O array com repetição tem o `0` duplicado: uma vez na posição `0` e outra na última.',
        'O quadrático encontra essa repetição só quando `i` chega a `0` e `j` chega ao fim — ou seja, na primeira passagem completa do laço interno.',
        'O conjunto encontra a repetição na última posição, tendo visitado todos os elementos.',
      ],
      tests: [
        {
          name: 'Dez elementos',
          stdin: '10\n',
          expectedStdout:
            'O(1): 0 em 1 operacoes\nquadratico sem repetir: False em 45 operacoes\n' +
            'conjunto sem repetir: False em 10 operacoes\n' +
            'quadratico com repeticao: True em 9 operacoes\n' +
            'conjunto com repeticao: True em 10 operacoes',
        },
        {
          name: 'Cem elementos',
          stdin: '100\n',
          expectedStdout:
            'O(1): 0 em 1 operacoes\nquadratico sem repetir: False em 4950 operacoes\n' +
            'conjunto sem repetir: False em 100 operacoes\n' +
            'quadratico com repeticao: True em 99 operacoes\n' +
            'conjunto com repeticao: True em 100 operacoes',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's07c01l04',
    title: 'O(log n)',
    objective: 'Reconhecer a classe que torna viável trabalhar com entradas enormes.',
    concept: [
      {
        kind: 'text',
        body:
          'Um algoritmo é `O(log n)` quando **descarta uma fração constante** da entrada a cada passo. O caso mais comum é cortar pela metade.',
      },
      {
        kind: 'output',
        code: `n = 1.000              ~10 passos
n = 1.000.000          ~20 passos
n = 1.000.000.000      ~30 passos`,
        caption: 'Multiplicar a entrada por mil acrescenta dez passos. É por isso que `O(log n)` parece mágica.',
      },
      {
        kind: 'text',
        body:
          'O logaritmo aqui é de **base 2**, porque cada passo divide por dois. Quantas vezes dá para dividir um milhão por dois até chegar em um? Cerca de vinte.',
      },
      {
        kind: 'table',
        headers: ['Classe', 'n = 1.000.000', 'Comentário'],
        rows: [
          ['`O(1)`', '1', 'imediato'],
          ['`O(log n)`', '~20', '**praticamente imediato**'],
          ['`O(n)`', '1.000.000', 'viável'],
          ['`O(n log n)`', '~20.000.000', 'viável'],
          ['`O(n²)`', '1.000.000.000.000', 'inviável'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A base do logaritmo não aparece na notação porque mudar de base só multiplica por uma constante — e constantes são descartadas. `O(log₂ n)` e `O(log₁₀ n)` são a mesma classe.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A busca binária exige dados **ordenados**. Ordenar custa `O(n log n)`, então buscar uma única vez em dados desordenados é mais barato linearmente. A ordenação se paga quando há muitas consultas.',
      },
    ],
    quiz: [
      {
        id: 's07c01l04q1',
        type: 'single',
        prompt: 'O que caracteriza um algoritmo `O(log n)`?',
        options: [
          { id: 'a', text: 'Ele descarta uma fração constante da entrada a cada passo.', correct: true },
          { id: 'b', text: 'Ele percorre a entrada uma vez.' },
          { id: 'c', text: 'Ele usa recursão.' },
          { id: 'd', text: 'Ele acessa a entrada por índice.' },
        ],
        explanation:
          'Cortar pela metade é o caso mais comum, mas descartar um terço a cada passo também dá `O(log n)`.',
      },
      {
        id: 's07c01l04q2',
        type: 'single',
        prompt: 'Por que a base do logaritmo não aparece na notação?',
        options: [
          { id: 'a', text: 'Porque mudar de base só multiplica por uma constante, e constantes são descartadas.', correct: true },
          { id: 'b', text: 'Porque a base é sempre 2.' },
          { id: 'c', text: 'Porque a base não afeta o resultado.' },
          { id: 'd', text: 'Por convenção de escrita apenas.' },
        ],
        explanation:
          '`log₁₀ n` é `log₂ n` dividido por uma constante — a mesma classe de crescimento.',
      },
      {
        id: 's07c01l04q3',
        type: 'single',
        prompt: 'Quando a ordenação prévia se paga para permitir busca binária?',
        options: [
          { id: 'a', text: 'Quando há muitas consultas sobre os mesmos dados.', correct: true },
          { id: 'b', text: 'Sempre.' },
          { id: 'c', text: 'Quando os dados são pequenos.' },
          { id: 'd', text: 'Nunca: buscar linearmente é sempre melhor.' },
        ],
        explanation:
          'Uma consulta só não compensa o custo `O(n log n)` da ordenação. Milhares de consultas compensam de longe.',
      },
    ],
    challenge: {
      brief:
        'Compare a contagem de passos de uma busca linear e de uma binária conforme a entrada cresce dez vezes.',
      requirements: [
        '`BuscaLinear(int[] dados, int alvo)` devolve o índice ou `-1`, contando cada comparação',
        '`BuscaBinaria(int[] dados, int alvo)` devolve o índice ou `-1`, contando cada iteração do laço',
        'A busca binária usa `meio = inicio + (fim - inicio) / 2`',
        'Os dados estão ordenados: `dados[i] = i * 2`',
        '`Medir(int n)` cria o array, busca o **último** elemento com as duas técnicas e imprime as contagens',
        'A saída de cada medição é `n=N linear=A binaria=B`',
        'O `Main` mede com `n`, `n*10` e `n*100`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int operacoes = 0;

    // Escreva BuscaLinear, BuscaBinaria e Medir aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Medir(n);
        Medir(n * 10);
        Medir(n * 100);
    }
}
`,
      solution: `using System;

class Program
{
    static int operacoes = 0;

    static int BuscaLinear(int[] dados, int alvo)
    {
        for (int i = 0; i < dados.Length; i++)
        {
            operacoes++;

            if (dados[i] == alvo)
            {
                return i;
            }
        }

        return -1;
    }

    static int BuscaBinaria(int[] dados, int alvo)
    {
        int inicio = 0;
        int fim = dados.Length - 1;

        while (inicio <= fim)
        {
            operacoes++;

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

    static void Medir(int n)
    {
        int[] dados = new int[n];

        for (int i = 0; i < n; i++)
        {
            dados[i] = i * 2;
        }

        int alvo = dados[n - 1];

        operacoes = 0;
        BuscaLinear(dados, alvo);
        int linear = operacoes;

        operacoes = 0;
        BuscaBinaria(dados, alvo);
        int binaria = operacoes;

        Console.WriteLine($"n={n} linear={linear} binaria={binaria}");
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Medir(n);
        Medir(n * 10);
        Medir(n * 100);
    }
}
`,
      hints: [
        'O alvo é o último elemento, então a busca linear sempre percorre o array inteiro — o pior caso.',
        'Conte uma operação por **iteração** do laço da busca binária, não por comparação individual.',
        'Repare no resultado: multiplicar a entrada por 100 multiplica o linear por 100 e acrescenta cerca de 7 ao binário.',
      ],
      tests: [
        {
          name: 'Comecando em cem',
          stdin: '100\n',
          expectedStdout:
            'n=100 linear=100 binaria=7\nn=1000 linear=1000 binaria=10\n' +
            'n=10000 linear=10000 binaria=14',
        },
        {
          name: 'Comecando em dez',
          stdin: '10\n',
          expectedStdout:
            'n=10 linear=10 binaria=4\nn=100 linear=100 binaria=7\n' +
            'n=1000 linear=1000 binaria=10',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's07c01l05',
    title: 'Comparando dois algoritmos',
    objective: 'Decidir entre duas soluções olhando a classe de crescimento e a escala do problema real.',
    concept: [
      {
        kind: 'text',
        body:
          'Comparar algoritmos não é só olhar quem tem o Big-O menor. A decisão envolve a **escala esperada**, as constantes envolvidas e o custo de memória.',
      },
      {
        kind: 'table',
        headers: ['Pergunta', 'Por quê'],
        rows: [
          ['qual a classe de cada um?', 'define o comportamento em escala'],
          ['qual o n esperado?', 'para n pequeno, a classe importa pouco'],
          ['quanto custa a memória extra?', 'a troca tempo-espaço tem limite'],
          ['os dados chegam ordenados?', 'muda o que é possível'],
          ['quantas consultas serão feitas?', 'define se um pré-processamento se paga'],
        ],
      },
      {
        kind: 'text',
        body:
          'A última pergunta é a que mais muda decisões na prática. Um pré-processamento caro — ordenar, indexar, construir um dicionário — se dilui quando muitas consultas o aproveitam.',
      },
      {
        kind: 'output',
        code: `1 consulta:        linear O(n)          vence
100 consultas:     ordenar + binaria     empata
1.000.000:         ordenar + binaria     vence de longe`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Custo total é `pré-processamento + consultas × custo por consulta`. Escrever essa conta explicitamente costuma resolver a dúvida mais rápido que qualquer intuição.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Não otimize sem saber a escala. Trocar um `O(n²)` claro por um `O(n log n)` complicado, quando n nunca passa de 50, é acrescentar risco de bug sem ganho mensurável.',
      },
    ],
    quiz: [
      {
        id: 's07c01l05q1',
        type: 'single',
        prompt: 'Qual pergunta mais muda a decisão entre linear e "ordenar + binária"?',
        options: [
          { id: 'a', text: 'Quantas consultas serão feitas sobre os mesmos dados.', correct: true },
          { id: 'b', text: 'Se os dados são inteiros ou textos.' },
          { id: 'c', text: 'Se o código será testado.' },
          { id: 'd', text: 'Quantas linhas cada solução tem.' },
        ],
        explanation:
          'O pré-processamento é um custo fixo que se dilui entre as consultas que o aproveitam.',
      },
      {
        id: 's07c01l05q2',
        type: 'single',
        prompt: 'Como se calcula o custo total de uma estratégia com pré-processamento?',
        options: [
          { id: 'a', text: 'Pré-processamento mais consultas vezes o custo por consulta.', correct: true },
          { id: 'b', text: 'Apenas o custo por consulta.' },
          { id: 'c', text: 'A média entre os dois.' },
          { id: 'd', text: 'O maior dos dois.' },
        ],
        explanation:
          'Escrever a conta explicitamente mostra o ponto exato em que uma estratégia passa a vencer a outra.',
      },
      {
        id: 's07c01l05q3',
        type: 'single',
        prompt: 'Quando **não** vale trocar `O(n²)` por `O(n log n)`?',
        options: [
          { id: 'a', text: 'Quando n nunca passa de algumas dezenas.', correct: true },
          { id: 'b', text: 'Quando o código já está em produção.' },
          { id: 'c', text: 'Quando não há testes.' },
          { id: 'd', text: 'Sempre vale a pena.' },
        ],
        explanation:
          'Nessa escala o ganho é imperceptível, e a solução mais complexa só acrescenta risco de bug.',
      },
    ],
    challenge: {
      brief:
        'Compare o custo total de duas estratégias de consulta e descubra a partir de quantas consultas a segunda passa a vencer.',
      requirements: [
        '`CustoLinear(int n, int consultas)` devolve `n * consultas`',
        '`CustoOrdenarMaisBinaria(int n, int consultas)` devolve `CustoOrdenacao(n) + consultas * PassosBinaria(n)`',
        '`CustoOrdenacao(int n)` devolve `n * PassosBinaria(n)`, representando `O(n log n)`',
        '`PassosBinaria(int n)` conta quantas divisões por dois são necessárias até chegar a zero',
        '`PontoDeVirada(int n)` devolve a menor quantidade de consultas em que a segunda estratégia custa **menos** que a primeira, ou `-1` se não houver até `1000000`',
        'O `Main` compara as duas estratégias em três volumes de consulta',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva PassosBinaria, CustoOrdenacao, CustoLinear,
    // CustoOrdenarMaisBinaria e PontoDeVirada aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Console.WriteLine($"passos binaria: {PassosBinaria(n)}");
        Console.WriteLine($"custo ordenacao: {CustoOrdenacao(n)}");

        int[] volumes = { 1, 10, 1000 };

        foreach (int consultas in volumes)
        {
            long linear = CustoLinear(n, consultas);
            long binaria = CustoOrdenarMaisBinaria(n, consultas);
            string vencedor = linear <= binaria ? "linear" : "binaria";

            Console.WriteLine($"{consultas} consultas: linear={linear} binaria={binaria} vence={vencedor}");
        }

        Console.WriteLine($"ponto de virada: {PontoDeVirada(n)}");
    }
}
`,
      solution: `using System;

class Program
{
    static int PassosBinaria(int n)
    {
        int passos = 0;

        while (n > 0)
        {
            passos++;
            n = n / 2;
        }

        return passos;
    }

    static long CustoOrdenacao(int n)
    {
        return (long)n * PassosBinaria(n);
    }

    static long CustoLinear(int n, int consultas)
    {
        return (long)n * consultas;
    }

    static long CustoOrdenarMaisBinaria(int n, int consultas)
    {
        return CustoOrdenacao(n) + (long)consultas * PassosBinaria(n);
    }

    static int PontoDeVirada(int n)
    {
        for (int consultas = 1; consultas <= 1000000; consultas++)
        {
            if (CustoOrdenarMaisBinaria(n, consultas) < CustoLinear(n, consultas))
            {
                return consultas;
            }
        }

        return -1;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Console.WriteLine($"passos binaria: {PassosBinaria(n)}");
        Console.WriteLine($"custo ordenacao: {CustoOrdenacao(n)}");

        int[] volumes = { 1, 10, 1000 };

        foreach (int consultas in volumes)
        {
            long linear = CustoLinear(n, consultas);
            long binaria = CustoOrdenarMaisBinaria(n, consultas);
            string vencedor = linear <= binaria ? "linear" : "binaria";

            Console.WriteLine($"{consultas} consultas: linear={linear} binaria={binaria} vence={vencedor}");
        }

        Console.WriteLine($"ponto de virada: {PontoDeVirada(n)}");
    }
}
`,
      hints: [
        'O `PassosBinaria` divide por dois até zerar, contando quantas divisões foram feitas.',
        'Use `long` nos custos: `n * consultas` estoura um `int` com facilidade.',
        'O ponto de virada é encontrado por tentativa crescente — o primeiro volume em que a segunda estratégia fica mais barata.',
      ],
      tests: [
        {
          name: 'Mil elementos',
          stdin: '1000\n',
          expectedStdout:
            'passos binaria: 10\ncusto ordenacao: 10000\n' +
            '1 consultas: linear=1000 binaria=10010 vence=linear\n' +
            '10 consultas: linear=10000 binaria=10100 vence=linear\n' +
            '1000 consultas: linear=1000000 binaria=20000 vence=binaria\n' +
            'ponto de virada: 11',
        },
        {
          name: 'Cem elementos',
          stdin: '100\n',
          expectedStdout:
            'passos binaria: 7\ncusto ordenacao: 700\n' +
            '1 consultas: linear=100 binaria=707 vence=linear\n' +
            '10 consultas: linear=1000 binaria=770 vence=binaria\n' +
            '1000 consultas: linear=100000 binaria=7700 vence=binaria\n' +
            'ponto de virada: 8',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's07c01l06',
    title: 'Complexidade de espaço',
    objective: 'Medir a memória extra que um algoritmo consome, além do tempo.',
    concept: [
      {
        kind: 'text',
        body:
          'Tempo não é o único recurso. A **complexidade de espaço** mede a memória **extra** que o algoritmo aloca — sem contar a entrada, que já existia.',
      },
      {
        kind: 'table',
        headers: ['Espaço', 'O que aloca', 'Exemplo'],
        rows: [
          ['`O(1)`', 'algumas variáveis', 'somar, buscar, trocar no lugar'],
          ['`O(n)`', 'uma cópia da entrada', 'conjunto de vistos, array auxiliar'],
          ['`O(log n)`', 'a pilha de recursão', 'busca binária recursiva'],
          ['`O(n²)`', 'uma matriz', 'tabela de distâncias entre pares'],
        ],
      },
      {
        kind: 'text',
        body:
          'Algoritmos que trabalham **no lugar** — alterando a própria entrada sem criar estruturas novas — são `O(1)` de espaço. É o que torna a inversão de um array ou o quick sort atraentes quando a memória aperta.',
      },
      {
        kind: 'compare',
        good: `// no lugar: O(1) de espaco
for (int i = 0; i < n / 2; i++)
{
    int t = a[i];
    a[i] = a[n - 1 - i];
    a[n - 1 - i] = t;
}`,
        bad: `// com copia: O(n) de espaco
int[] invertido = new int[n];

for (int i = 0; i < n; i++)
    invertido[i] = a[n - 1 - i];`,
        goodLabel: 'Sem memória extra',
        badLabel: 'Aloca outro array inteiro',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A **pilha de recursão** conta como espaço. Uma função recursiva com profundidade n usa `O(n)` de memória mesmo sem alocar nada explicitamente — e, neste ambiente, estoura por volta de 24 mil níveis.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A troca entre tempo e espaço aparece nos dois sentidos: gastar memória para ganhar tempo (memoização, índices) ou gastar tempo para poupar memória (recalcular em vez de guardar). Nenhum dos lados é sempre certo.',
      },
    ],
    quiz: [
      {
        id: 's07c01l06q1',
        type: 'single',
        prompt: 'O que a complexidade de espaço mede?',
        options: [
          { id: 'a', text: 'A memória extra alocada, sem contar a entrada.', correct: true },
          { id: 'b', text: 'O tamanho total da memória usada.' },
          { id: 'c', text: 'O número de variáveis declaradas.' },
          { id: 'd', text: 'O tamanho do código.' },
        ],
        explanation:
          'A entrada já existia antes do algoritmo, então ela não entra na conta do que ele consome.',
      },
      {
        id: 's07c01l06q2',
        type: 'single',
        prompt: 'Uma função recursiva com profundidade n usa quanto de espaço?',
        options: [
          { id: 'a', code: 'O(n)', correct: true },
          { id: 'b', code: 'O(1)' },
          { id: 'c', code: 'O(log n)' },
          { id: 'd', text: 'Nenhum, se não alocar nada.' },
        ],
        explanation:
          'Cada chamada pendente ocupa um quadro na pilha. É memória real, e é o que causa o estouro de pilha.',
      },
      {
        id: 's07c01l06q3',
        type: 'single',
        prompt: 'O que significa um algoritmo trabalhar "no lugar"?',
        options: [
          { id: 'a', text: 'Ele altera a própria entrada sem criar estruturas novas.', correct: true },
          { id: 'b', text: 'Ele roda em um único método.' },
          { id: 'c', text: 'Ele não usa recursão.' },
          { id: 'd', text: 'Ele devolve o resultado imediatamente.' },
        ],
        explanation:
          'Isso o torna `O(1)` de espaço, ao custo de destruir o conteúdo original da entrada.',
      },
    ],
    challenge: {
      brief:
        'Implemente a mesma operação com e sem memória extra, medindo quantas posições cada versão aloca.',
      requirements: [
        '`alocadas` é um campo estático que soma o tamanho de cada array criado pelos algoritmos',
        '`InverterNoLugar(int[] dados)` inverte o array recebido, sem alocar nada',
        '`InverterComCopia(int[] dados)` devolve um array novo invertido, somando o tamanho em `alocadas`',
        '`SomaUnicosComConjunto(int[] dados)` soma os valores distintos usando um `HashSet<int>`, somando o tamanho final do conjunto em `alocadas`',
        '`SomaUnicosNoLugar(int[] dados)` faz o mesmo comparando cada elemento com os anteriores, sem alocar nada',
        'As duas versões de cada par produzem o mesmo resultado',
        '`alocadas` é zerado antes de cada medição',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static int alocadas = 0;

    // Escreva InverterNoLugar, InverterComCopia,
    // SomaUnicosComConjunto e SomaUnicosNoLugar aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] original = new int[n];
        for (int i = 0; i < n; i++) original[i] = i % 5;

        int[] paraInverter = (int[])original.Clone();

        alocadas = 0;
        InverterNoLugar(paraInverter);
        Console.WriteLine($"no lugar: {string.Join(",", paraInverter)} alocou {alocadas}");

        alocadas = 0;
        int[] copia = InverterComCopia(original);
        Console.WriteLine($"com copia: {string.Join(",", copia)} alocou {alocadas}");
        Console.WriteLine($"original intacto: {string.Join(",", original)}");

        alocadas = 0;
        int comConjunto = SomaUnicosComConjunto(original);
        Console.WriteLine($"unicos com conjunto: {comConjunto} alocou {alocadas}");

        alocadas = 0;
        int semExtra = SomaUnicosNoLugar(original);
        Console.WriteLine($"unicos sem extra: {semExtra} alocou {alocadas}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static int alocadas = 0;

    static void InverterNoLugar(int[] dados)
    {
        for (int i = 0; i < dados.Length / 2; i++)
        {
            int temporario = dados[i];
            dados[i] = dados[dados.Length - 1 - i];
            dados[dados.Length - 1 - i] = temporario;
        }
    }

    static int[] InverterComCopia(int[] dados)
    {
        int[] invertido = new int[dados.Length];
        alocadas += dados.Length;

        for (int i = 0; i < dados.Length; i++)
        {
            invertido[i] = dados[dados.Length - 1 - i];
        }

        return invertido;
    }

    static int SomaUnicosComConjunto(int[] dados)
    {
        HashSet<int> vistos = new HashSet<int>();

        foreach (int valor in dados)
        {
            vistos.Add(valor);
        }

        alocadas += vistos.Count;

        int soma = 0;

        foreach (int valor in vistos)
        {
            soma += valor;
        }

        return soma;
    }

    static int SomaUnicosNoLugar(int[] dados)
    {
        int soma = 0;

        for (int i = 0; i < dados.Length; i++)
        {
            bool jaApareceu = false;

            for (int j = 0; j < i; j++)
            {
                if (dados[j] == dados[i])
                {
                    jaApareceu = true;
                    break;
                }
            }

            if (!jaApareceu)
            {
                soma += dados[i];
            }
        }

        return soma;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] original = new int[n];
        for (int i = 0; i < n; i++) original[i] = i % 5;

        int[] paraInverter = (int[])original.Clone();

        alocadas = 0;
        InverterNoLugar(paraInverter);
        Console.WriteLine($"no lugar: {string.Join(",", paraInverter)} alocou {alocadas}");

        alocadas = 0;
        int[] copia = InverterComCopia(original);
        Console.WriteLine($"com copia: {string.Join(",", copia)} alocou {alocadas}");
        Console.WriteLine($"original intacto: {string.Join(",", original)}");

        alocadas = 0;
        int comConjunto = SomaUnicosComConjunto(original);
        Console.WriteLine($"unicos com conjunto: {comConjunto} alocou {alocadas}");

        alocadas = 0;
        int semExtra = SomaUnicosNoLugar(original);
        Console.WriteLine($"unicos sem extra: {semExtra} alocou {alocadas}");
    }
}
`,
      hints: [
        'A inversão no lugar troca os extremos e caminha para o centro — o laço vai só até a metade.',
        'A versão sem memória extra paga em tempo: ela é `O(n²)` porque compara cada elemento com todos os anteriores.',
        'Some ao contador o tamanho da estrutura no momento em que ela é criada ou preenchida.',
      ],
      tests: [
        {
          name: 'Oito elementos',
          stdin: '8\n',
          expectedStdout:
            'no lugar: 2,1,0,4,3,2,1,0 alocou 0\n' +
            'com copia: 2,1,0,4,3,2,1,0 alocou 8\n' +
            'original intacto: 0,1,2,3,4,0,1,2\n' +
            'unicos com conjunto: 10 alocou 5\n' +
            'unicos sem extra: 10 alocou 0',
        },
        {
          name: 'Cinco elementos',
          stdin: '5\n',
          expectedStdout:
            'no lugar: 4,3,2,1,0 alocou 0\n' +
            'com copia: 4,3,2,1,0 alocou 5\n' +
            'original intacto: 0,1,2,3,4\n' +
            'unicos com conjunto: 10 alocou 5\n' +
            'unicos sem extra: 10 alocou 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's07c01l07',
    title: 'Analisando laços',
    objective: 'Determinar a complexidade de um trecho olhando a estrutura dos seus laços.',
    concept: [
      {
        kind: 'text',
        body:
          'A maioria das análises se resolve com três regras sobre laços. Elas cobrem quase todo código iterativo que você vai encontrar.',
      },
      {
        kind: 'table',
        headers: ['Estrutura', 'Regra', 'Resultado'],
        rows: [
          ['laços em sequência', '**some**', '`O(n) + O(n)` = `O(n)`'],
          ['laços aninhados', '**multiplique**', '`O(n) × O(n)` = `O(n²)`'],
          ['laço que divide o índice', 'logarítmico', '`O(log n)`'],
        ],
      },
      {
        kind: 'code',
        code: `// aninhado, mas o interno depende de i
for (int i = 0; i < n; i++)
    for (int j = i; j < n; j++)
        operacoes++;

// total = n + (n-1) + ... + 1 = n(n+1)/2  ->  O(n²)`,
        caption: 'Mesmo com o laço interno encurtando, a soma continua quadrática.',
      },
      {
        kind: 'text',
        body:
          'O caso acima confunde muita gente: o laço interno roda menos a cada volta, mas a **soma** dos seus tamanhos ainda é proporcional a n². Descartar a constante `1/2` deixa `O(n²)`.',
      },
      {
        kind: 'compare',
        good: `for (int i = 0; i < n; i++)
    for (int j = 0; j < 10; j++)
        operacoes++;

// 10n  ->  O(n)`,
        bad: `for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        operacoes++;

// n²  ->  O(n²)`,
        goodLabel: 'Interno de tamanho fixo',
        badLabel: 'Interno proporcional a n',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A pergunta certa para um laço aninhado não é "quantos laços existem?" e sim **"quantas vezes o corpo mais interno executa, no total?"**. Essa contagem é a resposta.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Cuidado com chamadas escondidas dentro do laço. Um `lista.Contains(x)` dentro de um `for` sobre n elementos é `O(n²)`, mesmo o código tendo um laço só — o custo do `Contains` é linear.',
      },
    ],
    quiz: [
      {
        id: 's07c01l07q1',
        type: 'single',
        prompt: 'Dois laços `O(n)` em sequência resultam em quê?',
        options: [
          { id: 'a', code: 'O(n)', correct: true },
          { id: 'b', code: 'O(n²)' },
          { id: 'c', code: 'O(2n²)' },
          { id: 'd', code: 'O(log n)' },
        ],
        explanation:
          'Laços em sequência somam: `2n` descarta a constante e vira `O(n)`. Só o aninhamento multiplica.',
      },
      {
        id: 's07c01l07q2',
        type: 'single',
        prompt: 'Um laço interno que começa em `i` em vez de `0` muda a classe?',
        options: [
          { id: 'a', text: 'Não: a soma continua proporcional a n², só muda a constante.', correct: true },
          { id: 'b', text: 'Sim: vira `O(n)`.' },
          { id: 'c', text: 'Sim: vira `O(n log n)`.' },
          { id: 'd', text: 'Depende do valor de n.' },
        ],
        explanation:
          'A soma `n + (n-1) + ... + 1` é `n(n+1)/2`. Descartada a constante `1/2`, sobra `O(n²)`.',
      },
      {
        id: 's07c01l07q3',
        type: 'single',
        prompt: 'Por que um `lista.Contains(x)` dentro de um laço pode ser `O(n²)`?',
        options: [
          { id: 'a', text: 'Porque o `Contains` de uma lista é linear, e ele roda n vezes.', correct: true },
          { id: 'b', text: 'Porque o `Contains` aloca memória.' },
          { id: 'c', text: 'Porque ele usa recursão.' },
          { id: 'd', text: 'Ele não é `O(n²)`.' },
        ],
        explanation:
          'O custo das chamadas conta na análise. Trocar a lista por um `HashSet` derruba isso para `O(n)`.',
      },
    ],
    challenge: {
      brief:
        'Meça a contagem de cinco estruturas de laço e confirme a classe de cada uma pelo crescimento observado.',
      requirements: [
        '`Sequenciais(int n)` roda dois laços de `n` em sequência',
        '`Aninhados(int n)` roda dois laços de `n` aninhados',
        '`Triangular(int n)` roda um laço aninhado em que o interno começa em `i`',
        '`InternoFixo(int n)` roda um laço de `n` com um interno de `10`',
        '`Dividindo(int n)` roda um laço que divide o índice por dois a cada volta',
        'Cada método devolve a contagem de execuções do corpo mais interno',
        '`Comparar(string nome, Func<int, int> f, int n)` imprime `nome: N -> A, 2N -> B (cresceu Cx)` com divisão inteira',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva Sequenciais, Aninhados, Triangular, InternoFixo,
    // Dividindo e Comparar aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Comparar("sequenciais", Sequenciais, n);
        Comparar("aninhados", Aninhados, n);
        Comparar("triangular", Triangular, n);
        Comparar("interno fixo", InternoFixo, n);
        Comparar("dividindo", Dividindo, n);
    }
}
`,
      solution: `using System;

class Program
{
    static int Sequenciais(int n)
    {
        int operacoes = 0;

        for (int i = 0; i < n; i++)
        {
            operacoes++;
        }

        for (int i = 0; i < n; i++)
        {
            operacoes++;
        }

        return operacoes;
    }

    static int Aninhados(int n)
    {
        int operacoes = 0;

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                operacoes++;
            }
        }

        return operacoes;
    }

    static int Triangular(int n)
    {
        int operacoes = 0;

        for (int i = 0; i < n; i++)
        {
            for (int j = i; j < n; j++)
            {
                operacoes++;
            }
        }

        return operacoes;
    }

    static int InternoFixo(int n)
    {
        int operacoes = 0;

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < 10; j++)
            {
                operacoes++;
            }
        }

        return operacoes;
    }

    static int Dividindo(int n)
    {
        int operacoes = 0;

        for (int i = n; i > 0; i = i / 2)
        {
            operacoes++;
        }

        return operacoes;
    }

    static void Comparar(string nome, Func<int, int> f, int n)
    {
        int pequeno = f(n);
        int grande = f(n * 2);

        Console.WriteLine($"{nome}: {n} -> {pequeno}, {n * 2} -> {grande} (cresceu {grande / pequeno}x)");
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Comparar("sequenciais", Sequenciais, n);
        Comparar("aninhados", Aninhados, n);
        Comparar("triangular", Triangular, n);
        Comparar("interno fixo", InternoFixo, n);
        Comparar("dividindo", Dividindo, n);
    }
}
`,
      hints: [
        'O `Triangular` cresce quase 4x quando a entrada dobra — a mesma classe do aninhado, com constante menor.',
        'O `Dividindo` usa `i = i / 2` no incremento do `for`.',
        'A divisão inteira do fator arredonda para baixo, então o triangular pode aparecer como `3x` em vez de `4x`.',
      ],
      tests: [
        {
          name: 'Entrada de dez',
          stdin: '10\n',
          expectedStdout:
            'sequenciais: 10 -> 20, 20 -> 40 (cresceu 2x)\n' +
            'aninhados: 10 -> 100, 20 -> 400 (cresceu 4x)\n' +
            'triangular: 10 -> 55, 20 -> 210 (cresceu 3x)\n' +
            'interno fixo: 10 -> 100, 20 -> 200 (cresceu 2x)\n' +
            'dividindo: 10 -> 4, 20 -> 5 (cresceu 1x)',
        },
        {
          name: 'Entrada de cem',
          stdin: '100\n',
          expectedStdout:
            'sequenciais: 100 -> 200, 200 -> 400 (cresceu 2x)\n' +
            'aninhados: 100 -> 10000, 200 -> 40000 (cresceu 4x)\n' +
            'triangular: 100 -> 5050, 200 -> 20100 (cresceu 3x)\n' +
            'interno fixo: 100 -> 1000, 200 -> 2000 (cresceu 2x)\n' +
            'dividindo: 100 -> 7, 200 -> 8 (cresceu 1x)',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's07c01l08',
    title: 'Analisando recursão',
    objective: 'Determinar o custo de uma função recursiva pela árvore de chamadas que ela gera.',
    concept: [
      {
        kind: 'text',
        body:
          'A complexidade de uma recursão é o **número total de chamadas** que ela faz. Visualizar a árvore de chamadas responde a pergunta.',
      },
      {
        kind: 'table',
        headers: ['Padrão', 'Árvore', 'Complexidade'],
        rows: [
          ['uma chamada, n-1', 'linha reta de altura n', '`O(n)`'],
          ['uma chamada, n/2', 'linha reta de altura log n', '`O(log n)`'],
          ['duas chamadas, n-1', 'árvore binária de altura n', '**`O(2ⁿ)`**'],
          ['duas chamadas, n/2', 'árvore binária de altura log n', '`O(n)`'],
          ['duas chamadas, n/2 + trabalho n', 'como acima, com n por nível', '`O(n log n)`'],
        ],
      },
      {
        kind: 'output',
        code: `fib(5)
├── fib(4)
│   ├── fib(3)
│   │   ├── fib(2)  <- recalculado
│   │   └── fib(1)
│   └── fib(2)      <- recalculado
└── fib(3)          <- a subarvore inteira de novo`,
        caption: 'A terceira linha da tabela: cada nível dobra o número de chamadas.',
      },
      {
        kind: 'text',
        body:
          'O Fibonacci ingênuo é o exemplo canônico de `O(2ⁿ)`. Ele recalcula as mesmas subárvores incontáveis vezes — e é exatamente esse desperdício que a memoização elimina.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Compare as linhas 3 e 4 da tabela: duas chamadas recursivas dão `O(2ⁿ)` quando o problema encolhe de **um**, e `O(n)` quando ele encolhe pela **metade**. O que decide não é o número de chamadas, é quanto o problema diminui.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Não esqueça o espaço: a profundidade da recursão é memória de pilha. Uma recursão `O(n)` em tempo e profundidade n também é `O(n)` em espaço — e aqui estoura por volta de 24 mil níveis.',
      },
    ],
    quiz: [
      {
        id: 's07c01l08q1',
        type: 'single',
        prompt: 'Qual é a complexidade de uma recursão com duas chamadas que reduzem n em 1?',
        options: [
          { id: 'a', code: 'O(2ⁿ)', correct: true },
          { id: 'b', code: 'O(n)' },
          { id: 'c', code: 'O(n²)' },
          { id: 'd', code: 'O(n log n)' },
        ],
        explanation:
          'Cada nível dobra o número de chamadas e a altura é n, então o total é exponencial.',
      },
      {
        id: 's07c01l08q2',
        type: 'single',
        prompt: 'E com duas chamadas que reduzem n pela metade?',
        options: [
          { id: 'a', code: 'O(n)', correct: true },
          { id: 'b', code: 'O(2ⁿ)' },
          { id: 'c', code: 'O(log n)' },
          { id: 'd', code: 'O(n²)' },
        ],
        explanation:
          'A altura vira `log n`, e `2^(log n)` é `n`. É por isso que dividir e conquistar funciona tão bem.',
      },
      {
        id: 's07c01l08q3',
        type: 'single',
        prompt: 'O que determina se uma recursão com duas chamadas é exponencial ou linear?',
        options: [
          { id: 'a', text: 'Quanto o problema diminui a cada chamada.', correct: true },
          { id: 'b', text: 'O número de chamadas recursivas.' },
          { id: 'c', text: 'O tipo de retorno.' },
          { id: 'd', text: 'O uso de memoização.' },
        ],
        explanation:
          'Encolher de um dá altura n; encolher pela metade dá altura log n — e a altura é o expoente.',
      },
    ],
    challenge: {
      brief:
        'Instrumente quatro recursões diferentes e confirme, pela contagem de chamadas, a classe de crescimento de cada uma.',
      requirements: [
        '`chamadas` é um campo estático zerado antes de cada medição',
        '`Linear(int n)` faz uma chamada com `n - 1` até chegar a zero',
        '`Logaritmica(int n)` faz uma chamada com `n / 2` até chegar a zero',
        '`Exponencial(int n)` faz duas chamadas com `n - 1`, parando em `n <= 1`',
        '`DivideEConquista(int n)` faz duas chamadas com `n / 2`, parando em `n <= 1`',
        'Cada método conta a própria chamada ao entrar',
        '`Medir(string nome, Action<int> f, int n)` zera, executa e imprime `nome(N): C chamadas`',
        'O `Main` mede as quatro com valores seguros para não estourar a pilha',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int chamadas = 0;

    // Escreva Linear, Logaritmica, Exponencial, DivideEConquista e Medir aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Medir("linear", Linear, n);
        Medir("linear", Linear, n * 2);

        Medir("logaritmica", Logaritmica, n);
        Medir("logaritmica", Logaritmica, n * 2);

        Medir("exponencial", Exponencial, 10);
        Medir("exponencial", Exponencial, 11);
        Medir("exponencial", Exponencial, 20);

        Medir("divide e conquista", DivideEConquista, 64);
        Medir("divide e conquista", DivideEConquista, 128);
    }
}
`,
      solution: `using System;

class Program
{
    static int chamadas = 0;

    static void Linear(int n)
    {
        chamadas++;

        if (n <= 0)
        {
            return;
        }

        Linear(n - 1);
    }

    static void Logaritmica(int n)
    {
        chamadas++;

        if (n <= 0)
        {
            return;
        }

        Logaritmica(n / 2);
    }

    static void Exponencial(int n)
    {
        chamadas++;

        if (n <= 1)
        {
            return;
        }

        Exponencial(n - 1);
        Exponencial(n - 1);
    }

    static void DivideEConquista(int n)
    {
        chamadas++;

        if (n <= 1)
        {
            return;
        }

        DivideEConquista(n / 2);
        DivideEConquista(n / 2);
    }

    static void Medir(string nome, Action<int> f, int n)
    {
        chamadas = 0;
        f(n);
        Console.WriteLine($"{nome}({n}): {chamadas} chamadas");
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Medir("linear", Linear, n);
        Medir("linear", Linear, n * 2);

        Medir("logaritmica", Logaritmica, n);
        Medir("logaritmica", Logaritmica, n * 2);

        Medir("exponencial", Exponencial, 10);
        Medir("exponencial", Exponencial, 11);
        Medir("exponencial", Exponencial, 20);

        Medir("divide e conquista", DivideEConquista, 64);
        Medir("divide e conquista", DivideEConquista, 128);
    }
}
`,
      hints: [
        'Conte a chamada na primeira linha do método, antes de qualquer verificação de parada.',
        'O `Exponencial` de 10 para 11 praticamente dobra a contagem — é a assinatura de `O(2ⁿ)`.',
        'O `DivideEConquista` de 64 para 128 apenas dobra, apesar de também fazer duas chamadas.',
      ],
      tests: [
        {
          name: 'Base cem',
          stdin: '100\n',
          expectedStdout:
            'linear(100): 101 chamadas\nlinear(200): 201 chamadas\n' +
            'logaritmica(100): 8 chamadas\nlogaritmica(200): 9 chamadas\n' +
            'exponencial(10): 1023 chamadas\nexponencial(11): 2047 chamadas\n' +
            'exponencial(20): 1048575 chamadas\n' +
            'divide e conquista(64): 127 chamadas\ndivide e conquista(128): 255 chamadas',
        },
        {
          name: 'Base dez',
          stdin: '10\n',
          expectedStdout:
            'linear(10): 11 chamadas\nlinear(20): 21 chamadas\n' +
            'logaritmica(10): 5 chamadas\nlogaritmica(20): 6 chamadas\n' +
            'exponencial(10): 1023 chamadas\nexponencial(11): 2047 chamadas\n' +
            'exponencial(20): 1048575 chamadas\n' +
            'divide e conquista(64): 127 chamadas\ndivide e conquista(128): 255 chamadas',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's07c01l09',
    title: 'Prática: estimando antes de rodar',
    objective: 'Prever se uma solução cabe no orçamento de tempo antes de escrevê-la.',
    concept: [
      {
        kind: 'text',
        body:
          'A habilidade prática que a complexidade entrega é esta: olhar o tamanho da entrada e **decidir de antemão** qual classe de solução é viável.',
      },
      {
        kind: 'table',
        headers: ['n até', 'Classe viável', 'Técnica típica'],
        rows: [
          ['10', '`O(n!)`', 'permutações'],
          ['25', '`O(2ⁿ)`', 'subconjuntos, backtracking'],
          ['5.000', '`O(n²)`', 'laço aninhado'],
          ['1.000.000', '`O(n log n)`', 'ordenar, dividir e conquistar'],
          ['100.000.000', '`O(n)`', 'uma passagem'],
        ],
      },
      {
        kind: 'text',
        body:
          'A regra de bolso usada em competição: um computador moderno faz da ordem de **10⁸ operações simples por segundo** em código gerenciado. Divida o orçamento de tempo por isso e você tem o teto de operações.',
      },
      {
        kind: 'output',
        code: `Orcamento: 1 segundo   ->  ~100.000.000 operacoes

n = 100.000, solucao O(n²)  ->  10.000.000.000  -> 100x acima: nao cabe
n = 100.000, solucao O(n log n) ->    1.700.000  -> cabe folgado`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A estimativa não precisa ser precisa — precisa acertar a **ordem de grandeza**. Errar por 2x não muda a decisão; errar por 1000x muda tudo, e é exatamente o que a análise evita.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A constante varia muito entre operações. Aritmética com inteiros é barata; alocar objetos, comparar strings e acessar dicionários custam bem mais. Uma solução `O(n)` com constante alta pode perder para uma `O(n log n)` enxuta.',
      },
    ],
    quiz: [
      {
        id: 's07c01l09q1',
        type: 'single',
        prompt: 'Qual é a regra de bolso para operações por segundo?',
        options: [
          { id: 'a', text: 'Da ordem de 10⁸ operações simples.', correct: true },
          { id: 'b', text: 'Da ordem de 10³.' },
          { id: 'c', text: 'Da ordem de 10¹².' },
          { id: 'd', text: 'Não existe estimativa possível.' },
        ],
        explanation:
          'É uma aproximação grosseira, mas suficiente para decidir entre classes de solução.',
      },
      {
        id: 's07c01l09q2',
        type: 'single',
        prompt: 'Para `n = 100.000`, uma solução `O(n²)` é viável em um segundo?',
        options: [
          { id: 'a', text: 'Não: seriam 10¹⁰ operações, cem vezes acima do orçamento.', correct: true },
          { id: 'b', text: 'Sim, com folga.' },
          { id: 'c', text: 'Sim, no limite.' },
          { id: 'd', text: 'Depende da linguagem.' },
        ],
        explanation:
          '100.000² é 10¹⁰. Com 10⁸ por segundo, isso levaria cerca de cem segundos.',
      },
      {
        id: 's07c01l09q3',
        type: 'single',
        prompt: 'Qual precisão a estimativa precisa ter?',
        options: [
          { id: 'a', text: 'Acertar a ordem de grandeza.', correct: true },
          { id: 'b', text: 'Errar no máximo 10 por cento.' },
          { id: 'c', text: 'Ser exata.' },
          { id: 'd', text: 'Não precisa de precisão nenhuma.' },
        ],
        explanation:
          'Errar por 2x não muda a decisão; a análise existe para evitar erros de 1000x.',
      },
    ],
    challenge: {
      brief:
        'Escreva um estimador que decide, para cada combinação de tamanho e classe, se a solução cabe no orçamento.',
      requirements: [
        '`Operacoes(string classe, long n)` devolve a contagem estimada: `1` para `O(1)`, `log` para `O(log n)`, `n` para `O(n)`, `n*log` para `O(n log n)`, `n*n` para `O(n^2)`, `2^n` para `O(2^n)`',
        '`Log2(long n)` conta as divisões por dois até chegar a zero',
        'Para `O(2^n)` com `n` acima de `62`, devolva `long.MaxValue` para evitar estouro',
        '`Cabe(string classe, long n, long orcamento)` diz se a estimativa fica dentro do orçamento',
        '`MaiorNViavel(string classe, long orcamento)` devolve o maior `n` de `1` a `100000` que ainda cabe, ou `0` se nenhum couber',
        'O `Main` avalia cada classe contra o orçamento informado',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva Log2, Operacoes, Cabe e MaiorNViavel aqui

    static void Main()
    {
        long n = long.Parse(Console.ReadLine());
        long orcamento = long.Parse(Console.ReadLine());

        string[] classes = { "O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n^2)", "O(2^n)" };

        Console.WriteLine($"--- n = {n}, orcamento = {orcamento} ---");

        foreach (string classe in classes)
        {
            long ops = Operacoes(classe, n);
            string veredito = Cabe(classe, n, orcamento) ? "cabe" : "nao cabe";
            Console.WriteLine($"{classe}: {ops} operacoes -> {veredito}");
        }

        Console.WriteLine("--- maior n viavel ---");

        foreach (string classe in classes)
        {
            Console.WriteLine($"{classe}: {MaiorNViavel(classe, orcamento)}");
        }
    }
}
`,
      solution: `using System;

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

    static long Operacoes(string classe, long n)
    {
        if (classe == "O(1)")
        {
            return 1;
        }

        if (classe == "O(log n)")
        {
            return Log2(n);
        }

        if (classe == "O(n)")
        {
            return n;
        }

        if (classe == "O(n log n)")
        {
            return n * Log2(n);
        }

        if (classe == "O(n^2)")
        {
            return n * n;
        }

        if (classe == "O(2^n)")
        {
            if (n > 62)
            {
                return long.MaxValue;
            }

            long total = 1;

            for (long i = 0; i < n; i++)
            {
                total = total * 2;
            }

            return total;
        }

        return 0;
    }

    static bool Cabe(string classe, long n, long orcamento)
    {
        return Operacoes(classe, n) <= orcamento;
    }

    static long MaiorNViavel(string classe, long orcamento)
    {
        long maior = 0;

        for (long n = 1; n <= 100000; n++)
        {
            if (Cabe(classe, n, orcamento))
            {
                maior = n;
            }
            else
            {
                break;
            }
        }

        return maior;
    }

    static void Main()
    {
        long n = long.Parse(Console.ReadLine());
        long orcamento = long.Parse(Console.ReadLine());

        string[] classes = { "O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n^2)", "O(2^n)" };

        Console.WriteLine($"--- n = {n}, orcamento = {orcamento} ---");

        foreach (string classe in classes)
        {
            long ops = Operacoes(classe, n);
            string veredito = Cabe(classe, n, orcamento) ? "cabe" : "nao cabe";
            Console.WriteLine($"{classe}: {ops} operacoes -> {veredito}");
        }

        Console.WriteLine("--- maior n viavel ---");

        foreach (string classe in classes)
        {
            Console.WriteLine($"{classe}: {MaiorNViavel(classe, orcamento)}");
        }
    }
}
`,
      hints: [
        'O `MaiorNViavel` para no primeiro `n` que não cabe, porque todas as classes crescem com `n`.',
        'Para `O(1)`, o maior `n` viável é sempre o limite da busca — o custo nunca cresce.',
        'Use `long` em toda a conta: `n * n` com `n = 100000` já passa de dez bilhões.',
      ],
      tests: [
        {
          name: 'Orcamento de cem milhoes',
          stdin: '1000\n100000000\n',
          expectedStdout:
            '--- n = 1000, orcamento = 100000000 ---\n' +
            'O(1): 1 operacoes -> cabe\nO(log n): 10 operacoes -> cabe\n' +
            'O(n): 1000 operacoes -> cabe\nO(n log n): 10000 operacoes -> cabe\n' +
            'O(n^2): 1000000 operacoes -> cabe\nO(2^n): 9223372036854775807 operacoes -> nao cabe\n' +
            '--- maior n viavel ---\n' +
            'O(1): 100000\nO(log n): 100000\nO(n): 100000\nO(n log n): 100000\n' +
            'O(n^2): 10000\nO(2^n): 26',
        },
        {
          name: 'Orcamento de mil',
          stdin: '100\n1000\n',
          expectedStdout:
            '--- n = 100, orcamento = 1000 ---\n' +
            'O(1): 1 operacoes -> cabe\nO(log n): 7 operacoes -> cabe\n' +
            'O(n): 100 operacoes -> cabe\nO(n log n): 700 operacoes -> cabe\n' +
            'O(n^2): 10000 operacoes -> nao cabe\nO(2^n): 9223372036854775807 operacoes -> nao cabe\n' +
            '--- maior n viavel ---\n' +
            'O(1): 100000\nO(log n): 100000\nO(n): 1000\nO(n log n): 127\n' +
            'O(n^2): 31\nO(2^n): 9',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's07c01l10',
    title: 'Checkpoint: complexidade',
    objective: 'Analisar código desconhecido e nomear a complexidade de tempo e de espaço.',
    concept: [
      {
        kind: 'text',
        body:
          'Analisar um trecho é um procedimento, não um talento. Aplicado na ordem certa, ele resolve praticamente qualquer código iterativo ou recursivo.',
      },
      {
        kind: 'table',
        headers: ['Passo', 'Pergunta'],
        rows: [
          ['1', 'o que é o `n` aqui?'],
          ['2', 'quantas vezes o corpo mais interno executa?'],
          ['3', 'as chamadas de método escondem custo?'],
          ['4', 'qual é o termo dominante?'],
          ['5', 'quanta memória extra é alocada?'],
        ],
      },
      {
        kind: 'text',
        body:
          'O passo 1 é o mais esquecido. Em um método que recebe uma lista de textos, o `n` pode ser a quantidade de textos, o comprimento de cada um, ou os dois — e a resposta muda a análise inteira.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Quando existem duas dimensões, nomeie as duas: um laço sobre `n` textos de comprimento `m` é `O(n × m)`, não `O(n²)`. Chamar tudo de `n` esconde qual dimensão realmente domina o custo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O passo 3 é onde a maioria erra. `lista.Contains`, `lista.Remove(item)`, `string` concatenada dentro de laço e `Insert(0, x)` são todos lineares — e viram quadráticos quando usados dentro de um laço.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Na dúvida, instrumente e meça. Um contador confirma a análise em segundos e revela custos escondidos que a leitura não pegou.',
      },
    ],
    quiz: [
      {
        id: 's07c01l10q1',
        type: 'single',
        prompt: 'Qual é o primeiro passo de uma análise de complexidade?',
        options: [
          { id: 'a', text: 'Definir o que é o `n` naquele contexto.', correct: true },
          { id: 'b', text: 'Contar os laços.' },
          { id: 'c', text: 'Medir o tempo de execução.' },
          { id: 'd', text: 'Verificar a memória.' },
        ],
        explanation:
          'Sem saber qual grandeza cresce, todo o resto da análise fica sem referência.',
      },
      {
        id: 's07c01l10q2',
        type: 'single',
        prompt: 'Um laço sobre `n` textos de comprimento `m` que examina cada caractere é de que classe?',
        options: [
          { id: 'a', code: 'O(n × m)', correct: true },
          { id: 'b', code: 'O(n²)' },
          { id: 'c', code: 'O(n)' },
          { id: 'd', code: 'O(m²)' },
        ],
        explanation:
          'São duas dimensões independentes. Chamar as duas de `n` esconde qual delas domina o custo real.',
      },
      {
        id: 's07c01l10q3',
        type: 'multiple',
        prompt: 'Quais destas operações escondem custo linear?',
        options: [
          { id: 'a', code: 'lista.Contains(x)', correct: true },
          { id: 'b', code: 'lista.Remove(item)', correct: true },
          { id: 'c', code: 'lista.Insert(0, x)', correct: true },
          { id: 'd', code: 'dicionario[chave]' },
        ],
        explanation:
          'As três primeiras percorrem ou deslocam a lista. A consulta ao dicionário é de custo constante.',
      },
    ],
    challenge: {
      brief:
        'Analise e instrumente cinco trechos desconhecidos, confirmando a classe de cada um pelo crescimento medido.',
      requirements: [
        '`TrechoA(string[] textos)` conta os caracteres de todos os textos — `O(n × m)`',
        '`TrechoB(int[] dados)` usa `lista.Contains` dentro de um laço para contar distintos — `O(n²)`',
        '`TrechoC(int[] dados)` faz o mesmo com `HashSet` — `O(n)`',
        '`TrechoD(int n)` percorre dividindo por dois dentro de um laço de `n` — `O(n log n)`',
        '`TrechoE(int[] dados)` devolve o último elemento — `O(1)`',
        'Cada trecho conta as próprias operações no campo `operacoes`',
        '`Medir(string nome, Func<int> f)` zera, executa e imprime `nome: R em N operacoes`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static int operacoes = 0;

    // Escreva TrechoA, TrechoB, TrechoC, TrechoD, TrechoE e Medir aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        string[] textos = new string[n];
        for (int i = 0; i < n; i++) textos[i] = new string('x', 4);

        int[] dados = new int[n];
        for (int i = 0; i < n; i++) dados[i] = i % (n / 2 + 1);

        Medir("A texto n x m", () => TrechoA(textos));
        Medir("B contains", () => TrechoB(dados));
        Medir("C conjunto", () => TrechoC(dados));
        Medir("D n log n", () => TrechoD(n));
        Medir("E constante", () => TrechoE(dados));
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static int operacoes = 0;

    static int TrechoA(string[] textos)
    {
        int total = 0;

        foreach (string texto in textos)
        {
            foreach (char c in texto)
            {
                operacoes++;
                total++;
            }
        }

        return total;
    }

    static int TrechoB(int[] dados)
    {
        List<int> vistos = new List<int>();

        foreach (int valor in dados)
        {
            bool achou = false;

            foreach (int visto in vistos)
            {
                operacoes++;

                if (visto == valor)
                {
                    achou = true;
                    break;
                }
            }

            if (!achou)
            {
                vistos.Add(valor);
            }
        }

        return vistos.Count;
    }

    static int TrechoC(int[] dados)
    {
        HashSet<int> vistos = new HashSet<int>();

        foreach (int valor in dados)
        {
            operacoes++;
            vistos.Add(valor);
        }

        return vistos.Count;
    }

    static int TrechoD(int n)
    {
        int total = 0;

        for (int i = 0; i < n; i++)
        {
            for (int j = n; j > 0; j = j / 2)
            {
                operacoes++;
                total++;
            }
        }

        return total;
    }

    static int TrechoE(int[] dados)
    {
        operacoes++;
        return dados[dados.Length - 1];
    }

    static void Medir(string nome, Func<int> f)
    {
        operacoes = 0;
        int resultado = f();
        Console.WriteLine($"{nome}: {resultado} em {operacoes} operacoes");
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        string[] textos = new string[n];
        for (int i = 0; i < n; i++) textos[i] = new string('x', 4);

        int[] dados = new int[n];
        for (int i = 0; i < n; i++) dados[i] = i % (n / 2 + 1);

        Medir("A texto n x m", () => TrechoA(textos));
        Medir("B contains", () => TrechoB(dados));
        Medir("C conjunto", () => TrechoC(dados));
        Medir("D n log n", () => TrechoD(n));
        Medir("E constante", () => TrechoE(dados));
    }
}
`,
      hints: [
        'No `TrechoB`, conte cada comparação do laço interno de busca — é ele que faz o custo ser quadrático.',
        'O `TrechoD` tem um laço interno que divide por dois, então cada volta externa custa `log n`.',
        'Os dados têm repetição proposital: `i % (n / 2 + 1)` faz a segunda metade repetir a primeira.',
      ],
      tests: [
        {
          name: 'Dez elementos',
          stdin: '10\n',
          expectedStdout:
            'A texto n x m: 40 em 40 operacoes\nB contains: 6 em 25 operacoes\n' +
            'C conjunto: 6 em 10 operacoes\nD n log n: 40 em 40 operacoes\n' +
            'E constante: 3 em 1 operacoes',
        },
        {
          name: 'Vinte elementos',
          stdin: '20\n',
          expectedStdout:
            'A texto n x m: 80 em 80 operacoes\nB contains: 11 em 100 operacoes\n' +
            'C conjunto: 11 em 20 operacoes\nD n log n: 100 em 100 operacoes\n' +
            'E constante: 8 em 1 operacoes',
          hidden: true,
        },
      ],
    },
  },
]
