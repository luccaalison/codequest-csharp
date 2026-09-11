import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's02c05l01',
    title: 'Linha de caracteres',
    objective: 'Construir uma linha de comprimento variável com `Console.Write`, separando o que repete do que encerra a linha.',
    concept: [
      {
        kind: 'text',
        body:
          'Desenhar no console é o jeito mais direto de **ver** um laço acontecendo. E toda figura começa com a mesma peça: uma linha de comprimento controlado.',
      },
      {
        kind: 'text',
        body:
          'A chave é lembrar da diferença entre `Write` e `WriteLine`: um continua na mesma linha, o outro pula. Um laço de desenho quase sempre usa `Write` no corpo e um `WriteLine` sozinho depois, para fechar a linha.',
      },
      {
        kind: 'code',
        code: `for (int i = 1; i <= 5; i++)
{
    Console.Write('*');   // continua na mesma linha
}

Console.WriteLine();      // fecha a linha`,
      },
      {
        kind: 'output',
        code: `*****`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Trocar o `Write` por `WriteLine` dentro do laço transforma a linha horizontal em uma coluna vertical. É o erro mais frequente do capítulo, e a saída deixa isso óbvio na primeira execução.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Com laço',
          code: `for (int i = 1; i <= n; i++)
{
    Console.Write(c);
}
Console.WriteLine();`,
        },
        right: {
          label: 'Sem laço',
          code: `Console.WriteLine(new string(c, n));`,
        },
        note: 'O atalho existe e é o que se usa na prática, mas o laço é o que se generaliza para todas as outras figuras do capítulo.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A comparação da saída ignora espaços no fim de cada linha, então uma figura com espaços à direita passa nos testes normalmente. Espaços à **esquerda**, por outro lado, fazem parte do desenho e são comparados — é o que permite centralizar figuras.',
      },
    ],
    quiz: [
      {
        id: 's02c05l01q1',
        type: 'single',
        prompt: 'O que este trecho imprime?',
        code: `for (int i = 1; i <= 3; i++)
{
    Console.WriteLine('#');
}`,
        options: [
          { id: 'a', text: 'Três linhas, cada uma com um `#`.', correct: true },
          { id: 'b', text: 'Uma linha com `###`.' },
          { id: 'c', text: 'Uma linha com `#`.' },
          { id: 'd', text: 'Nada.' },
        ],
        explanation:
          '`WriteLine` pula para a linha seguinte depois de escrever. Para manter tudo na mesma linha, o corpo precisa de `Write`.',
      },
      {
        id: 's02c05l01q2',
        type: 'single',
        prompt: 'Por que o `Console.WriteLine()` vazio depois do laço é necessário?',
        options: [
          { id: 'a', text: 'Porque o laço só escreveu caracteres, sem nunca encerrar a linha.', correct: true },
          { id: 'b', text: 'Porque o C# exige uma linha em branco no fim.' },
          { id: 'c', text: 'Para limpar o buffer de saída.' },
          { id: 'd', text: 'Não é necessário: é apenas estilo.' },
        ],
        explanation:
          'Sem ele, a próxima coisa impressa pelo programa continuaria grudada na figura. Cada linha desenhada precisa de um `WriteLine` para terminar.',
      },
      {
        id: 's02c05l01q3',
        type: 'single',
        prompt: 'Uma figura tem espaços sobrando no fim das linhas. Isso quebra a comparação da saída?',
        options: [
          { id: 'a', text: 'Não: espaços no fim de cada linha são ignorados.', correct: true },
          { id: 'b', text: 'Sim, sempre.' },
          { id: 'c', text: 'Só se forem mais de um por linha.' },
          { id: 'd', text: 'Só em figuras com mais de dez linhas.' },
        ],
        explanation:
          'Espaço à direita é invisível e nunca é o assunto de um exercício, então a comparação padrão o descarta. Já o espaço à esquerda é o que centraliza uma pirâmide, e esse é comparado.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e, na linha seguinte, um único caractere. Imprima uma linha com esse caractere repetido `n` vezes, e depois informe o comprimento.',
      requirements: [
        'Linha 1: o caractere repetido `n` vezes, sem espaços entre eles',
        'Linha 2: `Comprimento: n`',
        'Use `Console.Write` dentro do laço e um `Console.WriteLine()` para fechar a linha',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        char c = Console.ReadLine()[0];

        // Escreva n copias de c e feche a linha

        Console.WriteLine($"Comprimento: {n}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        char c = Console.ReadLine()[0];

        for (int i = 1; i <= n; i++)
        {
            Console.Write(c);
        }

        Console.WriteLine();

        Console.WriteLine($"Comprimento: {n}");
    }
}
`,
      hints: [
        'O `Console.WriteLine()` sem argumento é o que encerra a linha da figura.',
        'Se a saída sair em coluna, o corpo do laço está usando `WriteLine` em vez de `Write`.',
      ],
      tests: [
        {
          name: 'Cinco asteriscos',
          stdin: '5\n*\n',
          expectedStdout: '*****\nComprimento: 5',
        },
        {
          name: 'Um caractere só',
          stdin: '1\n#\n',
          expectedStdout: '#\nComprimento: 1',
        },
        {
          name: 'Linha longa',
          stdin: '12\n=\n',
          expectedStdout: '============\nComprimento: 12',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c05l02',
    title: 'Retângulo preenchido',
    objective: 'Usar dois laços aninhados para desenhar uma figura bidimensional, com o externo controlando as linhas.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma linha vira um retângulo quando você repete o laço da linha várias vezes. Essa é a regra geral de todo desenho: o laço **externo** conta as linhas, o **interno** desenha uma linha inteira.',
      },
      {
        kind: 'code',
        code: `for (int linha = 1; linha <= 3; linha++)
{
    for (int coluna = 1; coluna <= 5; coluna++)
    {
        Console.Write('#');
    }

    Console.WriteLine();   // fecha a linha atual
}`,
      },
      {
        kind: 'output',
        code: `#####
#####
#####`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O `Console.WriteLine()` fica **dentro** do laço externo e **fora** do interno. Colocá-lo fora dos dois desenha o retângulo inteiro em uma linha só; colocá-lo dentro do interno desenha uma coluna.',
      },
      {
        kind: 'table',
        headers: ['Onde está o `WriteLine()`', 'Resultado'],
        rows: [
          ['dentro do interno', 'uma coluna de 15 caracteres'],
          ['entre os dois laços', 'o retângulo correto'],
          ['depois dos dois', 'uma única linha de 15 caracteres'],
        ],
      },
      {
        kind: 'text',
        body:
          'Repare que os nomes `linha` e `coluna` dizem mais que `i` e `j`. Em desenho isso importa: metade dos erros vem de trocar os dois papéis, e um nome que descreve o papel torna a troca visível.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O total de caracteres desenhados é `linhas × colunas`. É o mesmo custo quadrático da lição sobre laços aninhados, agora com um resultado que você consegue enxergar na tela.',
      },
    ],
    quiz: [
      {
        id: 's02c05l02q1',
        type: 'single',
        prompt: 'Onde deve ficar o `Console.WriteLine()` que fecha cada linha?',
        options: [
          { id: 'a', text: 'Dentro do laço externo, depois do laço interno.', correct: true },
          { id: 'b', text: 'Dentro do laço interno.' },
          { id: 'c', text: 'Depois dos dois laços.' },
          { id: 'd', text: 'Antes do laço externo.' },
        ],
        explanation:
          'Cada volta do externo desenha uma linha completa, então o fechamento acontece uma vez por volta do externo — depois de o interno ter terminado o seu trabalho.',
      },
      {
        id: 's02c05l02q2',
        type: 'single',
        prompt: 'Quantos caracteres um retângulo de 4 linhas por 7 colunas imprime?',
        options: [
          { id: 'a', code: '28', correct: true },
          { id: 'b', code: '11' },
          { id: 'c', code: '14' },
          { id: 'd', code: '7' },
        ],
        explanation:
          'Laços aninhados multiplicam: `4 × 7 = 28`. As quebras de linha não são contadas como parte do desenho.',
      },
      {
        id: 's02c05l02q3',
        type: 'single',
        prompt: 'O programa imprimiu uma coluna vertical em vez de um retângulo. Qual é a causa mais provável?',
        options: [
          { id: 'a', text: 'O corpo do laço interno usa `WriteLine` em vez de `Write`.', correct: true },
          { id: 'b', text: 'Os dois laços foram trocados de lugar.' },
          { id: 'c', text: 'O número de colunas está errado.' },
          { id: 'd', text: 'Falta uma variável de contagem.' },
        ],
        explanation:
          'Cada caractere passa a ocupar a própria linha. Trocar os laços de lugar transporia a figura, mas ela continuaria retangular.',
      },
    ],
    challenge: {
      brief:
        'Leia dois inteiros maiores ou iguais a 1, `linhas` e `colunas`, e desenhe um retângulo preenchido com o caractere `#`.',
      requirements: [
        'A figura tem exatamente `linhas` linhas, cada uma com `colunas` caracteres `#`',
        'Não há nada além da figura na saída',
        'Use dois `for` aninhados, com o externo controlando as linhas',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int linhas = int.Parse(Console.ReadLine());
        int colunas = int.Parse(Console.ReadLine());

        // Externo: linhas. Interno: colunas. WriteLine entre os dois.
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int linhas = int.Parse(Console.ReadLine());
        int colunas = int.Parse(Console.ReadLine());

        for (int linha = 1; linha <= linhas; linha++)
        {
            for (int coluna = 1; coluna <= colunas; coluna++)
            {
                Console.Write('#');
            }

            Console.WriteLine();
        }
    }
}
`,
      hints: [
        'O laço interno escreve `colunas` caracteres com `Console.Write`.',
        'Assim que o interno termina, um `Console.WriteLine()` fecha a linha — ainda dentro do externo.',
      ],
      tests: [
        {
          name: 'Três por cinco',
          stdin: '3\n5\n',
          expectedStdout: '#####\n#####\n#####',
        },
        {
          name: 'Uma única célula',
          stdin: '1\n1\n',
          expectedStdout: '#',
        },
        {
          name: 'Retângulo largo',
          stdin: '2\n8\n',
          expectedStdout: '########\n########',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c05l03',
    title: 'Retângulo vazado',
    objective: 'Decidir o que desenhar em cada posição a partir de uma condição sobre linha e coluna.',
    concept: [
      {
        kind: 'text',
        body:
          'Até aqui o laço interno escrevia sempre o mesmo caractere. O passo seguinte é escolher o caractere **em função da posição** — e é isso que separa um retângulo cheio de qualquer outra figura.',
      },
      {
        kind: 'text',
        body:
          'Uma posição está na borda quando é a primeira ou a última linha, ou a primeira ou a última coluna. São quatro testes ligados por `||`.',
      },
      {
        kind: 'code',
        code: `bool borda = linha == 1
          || linha == linhas
          || coluna == 1
          || coluna == colunas;

Console.Write(borda ? '#' : ' ');`,
      },
      {
        kind: 'output',
        code: `######
#    #
#    #
######`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Os quatro testes se sobrepõem nos cantos, e isso é uma vantagem: com `||`, uma posição que satisfaz dois deles continua sendo borda. Não é preciso nenhum tratamento especial para os cantos.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Com apenas uma linha ou uma coluna, as condições de primeira e de última coincidem e a figura sai toda preenchida. Isso está correto: um retângulo de altura 1 não tem interior.',
      },
      {
        kind: 'text',
        body:
          'Os espaços do miolo ficam **entre** dois `#`, então nunca são espaços finais de linha. É por isso que esta figura sobrevive à comparação sem nenhum cuidado extra — algo que nem toda figura tem.',
      },
    ],
    quiz: [
      {
        id: 's02c05l03q1',
        type: 'single',
        prompt: 'Por que os quatro testes de borda são ligados por `||` e não por `&&`?',
        options: [
          { id: 'a', text: 'Basta uma das condições ser verdadeira para a posição estar na borda.', correct: true },
          { id: 'b', text: 'Porque `&&` não funciona com quatro operandos.' },
          { id: 'c', text: 'Porque `||` é mais rápido.' },
          { id: 'd', text: 'Deveria ser `&&`: o exemplo está errado.' },
        ],
        explanation:
          'Com `&&`, só os cantos seriam borda — as quatro condições só valem juntas nas quatro esquinas de uma figura mínima. A borda é a união, não a interseção.',
      },
      {
        id: 's02c05l03q2',
        type: 'single',
        prompt: 'Como fica um retângulo vazado de 1 linha por 5 colunas?',
        options: [
          { id: 'a', text: 'Uma linha com cinco `#`.', correct: true },
          { id: 'b', text: 'Uma linha com `#   #`.' },
          { id: 'c', text: 'Uma linha em branco.' },
          { id: 'd', text: 'O programa deveria recusar essa entrada.' },
        ],
        explanation:
          'Com uma linha só, `linha == 1` e `linha == linhas` são ambas verdadeiras em toda posição. Não há interior a vazar.',
      },
      {
        id: 's02c05l03q3',
        type: 'single',
        prompt: 'Os espaços do miolo quebram a comparação da saída?',
        options: [
          { id: 'a', text: 'Não: eles ficam entre dois `#`, então não são espaços finais.', correct: true },
          { id: 'b', text: 'Sim: todo espaço é removido antes de comparar.' },
          { id: 'c', text: 'Sim, a menos que se use `Console.Write` em vez de `WriteLine`.' },
          { id: 'd', text: 'Só se a figura tiver mais de 10 colunas.' },
        ],
        explanation:
          'Só o fim de cada linha é aparado. A borda direita protege os espaços do interior, e é por isso que esta figura é mais fácil de acertar que uma pirâmide.',
      },
    ],
    challenge: {
      brief:
        'Leia dois inteiros maiores ou iguais a 1, `linhas` e `colunas`, e desenhe um retângulo vazado: `#` na borda e espaço no interior.',
      requirements: [
        'A figura tem exatamente `linhas` linhas de `colunas` caracteres',
        'Posições na primeira ou última linha, e na primeira ou última coluna, recebem `#`',
        'Todas as outras recebem um espaço',
        'Com `linhas` ou `colunas` igual a 1 ou 2, a figura sai toda preenchida',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int linhas = int.Parse(Console.ReadLine());
        int colunas = int.Parse(Console.ReadLine());

        // Decida por posicao: borda recebe '#', miolo recebe ' '
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int linhas = int.Parse(Console.ReadLine());
        int colunas = int.Parse(Console.ReadLine());

        for (int linha = 1; linha <= linhas; linha++)
        {
            for (int coluna = 1; coluna <= colunas; coluna++)
            {
                bool borda = linha == 1
                    || linha == linhas
                    || coluna == 1
                    || coluna == colunas;

                Console.Write(borda ? '#' : ' ');
            }

            Console.WriteLine();
        }
    }
}
`,
      hints: [
        'A condição de borda é uma cadeia de quatro comparações ligadas por `||`.',
        'Um ternário resolve a escolha do caractere em uma linha: `borda ? \'#\' : \' \'`.',
      ],
      tests: [
        {
          name: 'Quatro por seis',
          stdin: '4\n6\n',
          expectedStdout: '######\n#    #\n#    #\n######',
        },
        {
          name: 'Quadrado mínimo com interior',
          stdin: '3\n3\n',
          expectedStdout: '###\n# #\n###',
        },
        {
          name: 'Altura 1: sem interior',
          stdin: '1\n5\n',
          expectedStdout: '#####',
        },
        {
          name: 'Altura 2: as duas linhas são borda',
          stdin: '2\n4\n',
          expectedStdout: '####\n####',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c05l04',
    title: 'Triângulo alinhado à esquerda',
    objective: 'Fazer o laço interno depender do externo para produzir linhas de comprimento crescente.',
    concept: [
      {
        kind: 'text',
        body:
          'Um triângulo é um retângulo em que o comprimento de cada linha depende do número da linha. A mudança no código é mínima: o limite do laço interno deixa de ser uma constante e passa a ser a variável do externo.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Retângulo',
          code: `for (int l = 1; l <= n; l++)
{
    for (int c = 1; c <= n; c++)
        Console.Write('*');
    Console.WriteLine();
}`,
        },
        right: {
          label: 'Triângulo',
          code: `for (int l = 1; l <= n; l++)
{
    for (int c = 1; c <= l; c++)
        Console.Write('*');
    Console.WriteLine();
}`,
        },
        note: 'Um `n` vira `l`, e a figura muda completamente.',
      },
      {
        kind: 'output',
        code: `*
**
***
****`,
      },
      {
        kind: 'text',
        body:
          'É a mesma forma triangular da lição sobre custo de laços aninhados, agora visível. O total de símbolos é `1 + 2 + ... + n`, o somatório que você já calculou no capítulo anterior.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Trocar o limite do interno para `n - l + 1` inverte o triângulo, produzindo linhas decrescentes. Toda a família de figuras deste capítulo sai de variações nesse único limite.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Se a figura sair como um retângulo, o limite do interno continua sendo `n`. Se sair como uma coluna de um símbolo, o interno está usando `1` como limite. O erro quase sempre está nessa expressão, não no resto do código.',
      },
    ],
    quiz: [
      {
        id: 's02c05l04q1',
        type: 'single',
        prompt: 'Quantos símbolos tem um triângulo alinhado à esquerda com 5 linhas?',
        options: [
          { id: 'a', code: '15', correct: true },
          { id: 'b', code: '25' },
          { id: 'c', code: '5' },
          { id: 'd', code: '10' },
        ],
        explanation:
          'É o somatório `1 + 2 + 3 + 4 + 5 = 15`, ou `n(n + 1) / 2`. Um retângulo de mesmo lado teria 25.',
      },
      {
        id: 's02c05l04q2',
        type: 'single',
        prompt: 'Qual limite do laço interno produz um triângulo **invertido**, começando com a linha mais longa?',
        options: [
          { id: 'a', code: 'c <= n - l + 1', correct: true },
          { id: 'b', code: 'c <= l' },
          { id: 'c', code: 'c <= n' },
          { id: 'd', code: 'c >= l' },
        ],
        explanation:
          'Com `l = 1` o limite vale `n`, e ele decresce até 1 na última linha. A alternativa `c >= l` produziria um laço que não roda ou não termina, dependendo dos valores.',
      },
      {
        id: 's02c05l04q3',
        type: 'single',
        prompt: 'A figura saiu como um retângulo cheio. Qual é a causa?',
        options: [
          { id: 'a', text: 'O limite do laço interno ficou `n` em vez de `l`.', correct: true },
          { id: 'b', text: 'O `WriteLine` está no lugar errado.' },
          { id: 'c', text: 'O laço externo começa em 0.' },
          { id: 'd', text: 'O caractere desenhado está errado.' },
        ],
        explanation:
          'É o sintoma característico: linhas de comprimento constante significam que o interno não depende do externo.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e desenhe um triângulo de asteriscos alinhado à esquerda, com 1 asterisco na primeira linha e `n` na última. Informe o total de asteriscos usados.',
      requirements: [
        'A linha `i` tem exatamente `i` asteriscos',
        'A figura tem `n` linhas',
        'Depois da figura, imprima `Total: k` com a quantidade de asteriscos',
        'Conte com um contador dentro do laço, não pela fórmula',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int total = 0;

        // O limite do laco interno depende da linha atual

        Console.WriteLine($"Total: {total}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int total = 0;

        for (int linha = 1; linha <= n; linha++)
        {
            for (int coluna = 1; coluna <= linha; coluna++)
            {
                Console.Write('*');
                total++;
            }

            Console.WriteLine();
        }

        Console.WriteLine($"Total: {total}");
    }
}
`,
      hints: [
        'O cabeçalho do laço interno é `for (int coluna = 1; coluna <= linha; coluna++)`.',
        'Incremente `total` no mesmo lugar em que o asterisco é escrito.',
      ],
      tests: [
        {
          name: 'Quatro linhas',
          stdin: '4\n',
          expectedStdout: '*\n**\n***\n****\nTotal: 10',
        },
        {
          name: 'Uma linha só',
          stdin: '1\n',
          expectedStdout: '*\nTotal: 1',
        },
        {
          name: 'Seis linhas',
          stdin: '6\n',
          expectedStdout: '*\n**\n***\n****\n*****\n******\nTotal: 21',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c05l05',
    title: 'Pirâmide centralizada',
    objective: 'Combinar dois laços internos por linha — um de espaços e um de símbolos — para centralizar uma figura.',
    concept: [
      {
        kind: 'text',
        body:
          'Centralizar é empurrar cada linha para a direita com espaços. Cada linha da pirâmide passa a ter **duas** partes, desenhadas por dois laços internos em sequência.',
      },
      {
        kind: 'table',
        headers: ['Linha `i`', 'Espaços', 'Asteriscos', 'Largura'],
        rows: [
          ['`1`', '`n - 1`', '`1`', '`n`'],
          ['`2`', '`n - 2`', '`3`', '`n + 1`'],
          ['`i`', '`n - i`', '`2i - 1`', '`n + i - 1`'],
          ['`n`', '`0`', '`2n - 1`', '`2n - 1`'],
        ],
      },
      {
        kind: 'code',
        code: `for (int i = 1; i <= n; i++)
{
    for (int e = 1; e <= n - i; e++)      // recuo
    {
        Console.Write(' ');
    }

    for (int a = 1; a <= 2 * i - 1; a++)  // simbolos
    {
        Console.Write('*');
    }

    Console.WriteLine();
}`,
      },
      {
        kind: 'output',
        code: `   *
  ***
 *****
*******`,
      },
      {
        kind: 'text',
        body:
          'As duas fórmulas valem a pena memorizar: **`n - i` espaços** e **`2i - 1` símbolos**. A segunda garante que toda linha tenha um número ímpar de símbolos, que é o que permite existir um centro.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Os espaços aqui são à **esquerda**, e esses são comparados caractere a caractere. Um espaço a mais ou a menos no recuo desalinha a figura e reprova o teste — diferente dos espaços à direita, que são ignorados.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A ordem dos dois laços internos importa: espaços primeiro, símbolos depois. Invertê-los produz uma figura alinhada à esquerda com espaços sobrando à direita — que, por serem aparados, some sem deixar rastro e viram um triângulo comum.',
      },
    ],
    quiz: [
      {
        id: 's02c05l05q1',
        type: 'single',
        prompt: 'Quantos asteriscos tem a quarta linha de uma pirâmide?',
        options: [
          { id: 'a', code: '7', correct: true },
          { id: 'b', code: '4' },
          { id: 'c', code: '8' },
          { id: 'd', code: '3' },
        ],
        explanation:
          '`2i - 1` com `i = 4` dá 7. A sequência é sempre 1, 3, 5, 7 — só números ímpares, para que exista um símbolo central.',
      },
      {
        id: 's02c05l05q2',
        type: 'single',
        prompt: 'Qual é a largura total de uma pirâmide de `n` linhas?',
        options: [
          { id: 'a', code: '2n - 1', correct: true },
          { id: 'b', code: 'n', },
          { id: 'c', code: '2n', },
          { id: 'd', code: 'n + 1' },
        ],
        explanation:
          'A largura é a da linha mais larga, a última, que tem `2n - 1` símbolos e nenhum recuo.',
      },
      {
        id: 's02c05l05q3',
        type: 'single',
        prompt: 'Por que os espaços à esquerda precisam estar exatamente certos, se os da direita são ignorados?',
        options: [
          { id: 'a', text: 'Porque o recuo é o que posiciona a figura, e faz parte do desenho.', correct: true },
          { id: 'b', text: 'Porque o C# trata espaços à esquerda de forma especial.' },
          { id: 'c', text: 'Porque a comparação é feita de trás para frente.' },
          { id: 'd', text: 'Eles também são ignorados: o alinhamento não importa.' },
        ],
        explanation:
          'Um espaço à direita não muda nada visualmente; um espaço à esquerda desloca a linha inteira. A comparação só descarta o que não é informação.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e desenhe uma pirâmide centralizada de asteriscos com `n` linhas. A linha `i` tem `n - i` espaços de recuo seguidos de `2i - 1` asteriscos.',
      requirements: [
        'A primeira linha tem 1 asterisco e a última tem `2n - 1`',
        'O recuo da linha `i` é de exatamente `n - i` espaços',
        'A última linha começa na coluna 1, sem recuo',
        'Não imprima nada além da figura',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        // Por linha: primeiro o recuo, depois os asteriscos
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 1; i <= n; i++)
        {
            for (int e = 1; e <= n - i; e++)
            {
                Console.Write(' ');
            }

            for (int a = 1; a <= 2 * i - 1; a++)
            {
                Console.Write('*');
            }

            Console.WriteLine();
        }
    }
}
`,
      hints: [
        'São dois laços internos em sequência, dentro do mesmo laço externo: espaços, depois asteriscos.',
        'O `Console.WriteLine()` vem depois dos dois, fechando a linha.',
      ],
      tests: [
        {
          name: 'Pirâmide de quatro linhas',
          stdin: '4\n',
          expectedStdout: '   *\n  ***\n *****\n*******',
        },
        {
          name: 'Recuo comparado caractere a caractere',
          stdin: '4\n',
          expectedStdout: '   *\n  ***\n *****\n*******\n',
          comparison: 'exact',
        },
        {
          name: 'Uma linha só, sem recuo',
          stdin: '1\n',
          expectedStdout: '*',
        },
        {
          name: 'Pirâmide de seis linhas',
          stdin: '6\n',
          expectedStdout: '     *\n    ***\n   *****\n  *******\n *********\n***********',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c05l06',
    title: 'Losango',
    objective: 'Compor uma figura de duas metades encadeando dois laços externos com direções opostas.',
    concept: [
      {
        kind: 'text',
        body:
          'Um losango é uma pirâmide seguida da mesma pirâmide de cabeça para baixo. A solução não é um laço novo: são **dois laços externos em sequência**, cada um desenhando metade da figura.',
      },
      {
        kind: 'code',
        code: `// metade de cima: 1 ate n
for (int i = 1; i <= n; i++)
{
    // n - i espacos, 2i - 1 asteriscos
}

// metade de baixo: n - 1 ate 1
for (int i = n - 1; i >= 1; i--)
{
    // as mesmas duas formulas
}`,
        caption: 'As fórmulas são idênticas; só a direção do contador muda.',
      },
      {
        kind: 'output',
        code: `  *
 ***
*****
 ***
  *`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O segundo laço começa em `n - 1`, não em `n`. Começar em `n` desenharia a linha mais larga duas vezes, e o losango sairia com uma barriga no meio.',
      },
      {
        kind: 'text',
        body:
          'A altura total é `2n - 1`: `n` linhas subindo e `n - 1` descendo. Com `n = 1` o segundo laço não roda, e a figura é um único asterisco — o que está correto.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Decompor uma figura complexa em partes já resolvidas é a estratégia geral deste capítulo. O losango não exigiu nenhuma ideia nova: exigiu reconhecer que ele já era duas coisas que você sabia fazer.',
      },
    ],
    quiz: [
      {
        id: 's02c05l06q1',
        type: 'single',
        prompt: 'Qual é a altura total de um losango com `n = 5`?',
        options: [
          { id: 'a', code: '9', correct: true },
          { id: 'b', code: '10' },
          { id: 'c', code: '5' },
          { id: 'd', code: '11' },
        ],
        explanation:
          '`2n - 1` dá 9: cinco linhas subindo e quatro descendo. A linha mais larga é compartilhada pelas duas metades.',
      },
      {
        id: 's02c05l06q2',
        type: 'single',
        prompt: 'Por que o laço de baixo começa em `n - 1`?',
        options: [
          { id: 'a', text: 'Porque a linha mais larga já foi desenhada pelo laço de cima.', correct: true },
          { id: 'b', text: 'Porque um `for` decrescente não pode começar em `n`.' },
          { id: 'c', text: 'Para que a figura fique com altura par.' },
          { id: 'd', text: 'É indiferente: começar em `n` dá o mesmo resultado.' },
        ],
        explanation:
          'O laço de cima terminou em `i = n`, que é a linha do meio. Repeti-la duplicaria a linha mais larga.',
      },
      {
        id: 's02c05l06q3',
        type: 'single',
        prompt: 'Como fica um losango com `n = 1`?',
        options: [
          { id: 'a', text: 'Um único asterisco, porque o segundo laço não roda.', correct: true },
          { id: 'b', text: 'Duas linhas com um asterisco cada.' },
          { id: 'c', text: 'Uma linha vazia.' },
          { id: 'd', text: 'O programa entra em laço infinito.' },
        ],
        explanation:
          'O segundo laço começa em `0` e a condição `0 >= 1` já é falsa. É o comportamento correto: a altura `2 × 1 - 1` é 1.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e desenhe um losango de asteriscos com `n` linhas na metade de cima. Depois da figura, informe a altura total.',
      requirements: [
        'A metade de cima vai da linha de 1 asterisco até a de `2n - 1`',
        'A metade de baixo repete as linhas anteriores em ordem inversa, sem repetir a linha mais larga',
        'O recuo de cada linha é o mesmo da pirâmide: `n - i` espaços',
        'Depois da figura, imprima `Altura: h`',
        'Com `n` igual a 1 a figura é um único asterisco e a altura é 1',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        // Laco de subida: i de 1 a n

        // Laco de descida: i de n - 1 a 1

        Console.WriteLine($"Altura: {2 * n - 1}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 1; i <= n; i++)
        {
            for (int e = 1; e <= n - i; e++)
            {
                Console.Write(' ');
            }

            for (int a = 1; a <= 2 * i - 1; a++)
            {
                Console.Write('*');
            }

            Console.WriteLine();
        }

        for (int i = n - 1; i >= 1; i--)
        {
            for (int e = 1; e <= n - i; e++)
            {
                Console.Write(' ');
            }

            for (int a = 1; a <= 2 * i - 1; a++)
            {
                Console.Write('*');
            }

            Console.WriteLine();
        }

        Console.WriteLine($"Altura: {2 * n - 1}");
    }
}
`,
      hints: [
        'O corpo dos dois laços externos é idêntico. A diferença está só no cabeçalho: um sobe, o outro desce.',
        'O laço de descida vai de `n - 1` até 1, com `i--`.',
      ],
      tests: [
        {
          name: 'Losango de três',
          stdin: '3\n',
          expectedStdout: '  *\n ***\n*****\n ***\n  *\nAltura: 5',
        },
        {
          name: 'Losango de quatro',
          stdin: '4\n',
          expectedStdout: '   *\n  ***\n *****\n*******\n *****\n  ***\n   *\nAltura: 7',
        },
        {
          name: 'Losango mínimo',
          stdin: '1\n',
          expectedStdout: '*\nAltura: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c05l07',
    title: 'Tabuleiro alternado',
    objective: 'Alternar dois símbolos a partir da paridade da soma das coordenadas.',
    concept: [
      {
        kind: 'text',
        body:
          'Um tabuleiro de xadrez alterna cores em duas direções ao mesmo tempo. A regra que produz esse padrão é surpreendentemente curta: olhe a **paridade da soma** da linha com a coluna.',
      },
      {
        kind: 'code',
        code: `for (int linha = 0; linha < n; linha++)
{
    for (int coluna = 0; coluna < n; coluna++)
    {
        Console.Write((linha + coluna) % 2 == 0 ? '#' : '.');
    }

    Console.WriteLine();
}`,
        caption: 'Aqui os contadores começam em 0, porque a fórmula depende da paridade e o 0 é par.',
      },
      {
        kind: 'output',
        code: `#.#.
.#.#
#.#.
.#.#`,
      },
      {
        kind: 'text',
        body:
          'Por que funciona: andar uma coluna para o lado muda a paridade da soma, e andar uma linha para baixo também. Duas casas vizinhas nunca têm a mesma paridade, e é exatamente essa a definição de um tabuleiro.',
      },
      {
        kind: 'table',
        headers: ['Linha', 'Coluna', 'Soma', 'Símbolo'],
        rows: [
          ['`0`', '`0`', '`0`', '`#`'],
          ['`0`', '`1`', '`1`', '`.`'],
          ['`1`', '`0`', '`1`', '`.`'],
          ['`1`', '`1`', '`2`', '`#`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Se os contadores começarem em 1 em vez de 0, o tabuleiro sai invertido: a primeira casa vira `.` em vez de `#`. A figura continua sendo um tabuleiro válido, mas não é a esperada. O início do contador faz parte da especificação.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Em um tabuleiro `n × n`, as casas escuras são `n² / 2` arredondado para cima. Com `n` par as duas cores empatam; com `n` ímpar a cor do canto ganha por uma casa.',
      },
    ],
    quiz: [
      {
        id: 's02c05l07q1',
        type: 'single',
        prompt: 'Qual condição produz o padrão alternado de tabuleiro?',
        options: [
          { id: 'a', code: '(linha + coluna) % 2 == 0', correct: true },
          { id: 'b', code: 'linha % 2 == 0' },
          { id: 'c', code: 'coluna % 2 == 0' },
          { id: 'd', code: 'linha % 2 == coluna % 2 && linha % 2 == 0' },
        ],
        explanation:
          'Testar só a linha produz faixas horizontais; só a coluna, faixas verticais. É a soma que faz o padrão alternar nas duas direções.',
      },
      {
        id: 's02c05l07q2',
        type: 'single',
        prompt: 'Quantas casas `#` tem um tabuleiro 5 por 5 que começa com `#` no canto?',
        options: [
          { id: 'a', code: '13', correct: true },
          { id: 'b', code: '12' },
          { id: 'c', code: '25' },
          { id: 'd', text: 'Metade exata: 12,5.' },
        ],
        explanation:
          'São 25 casas no total. Com lado ímpar não há empate, e a cor do canto fica com uma casa a mais: 13 contra 12.',
      },
      {
        id: 's02c05l07q3',
        type: 'single',
        prompt: 'O tabuleiro saiu com o canto errado. Qual é a causa mais provável?',
        options: [
          { id: 'a', text: 'Os contadores começam em 1 em vez de 0, invertendo a paridade.', correct: true },
          { id: 'b', text: 'O `WriteLine` está no laço errado.' },
          { id: 'c', text: 'Os dois símbolos foram trocados no ternário.', },
          { id: 'd', text: 'O laço interno usa `<=` em vez de `<`.' },
        ],
        explanation:
          'Trocar os símbolos no ternário também inverteria a figura, mas mudar o início do contador é o erro mais comum, porque acontece por hábito das outras lições do capítulo.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e desenhe um tabuleiro `n` por `n` alternando `#` e `.`, com `#` na casa do canto superior esquerdo. Informe quantas casas `#` a figura tem.',
      requirements: [
        'A casa da primeira linha e primeira coluna é `#`',
        'Casas vizinhas na horizontal ou na vertical nunca têm o mesmo símbolo',
        'Depois da figura, imprima `Escuras: k` com a quantidade de `#`',
        'Conte com um contador dentro do laço, não pela fórmula',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int escuras = 0;

        // Comece os contadores em 0 e olhe a paridade da soma

        Console.WriteLine($"Escuras: {escuras}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int escuras = 0;

        for (int linha = 0; linha < n; linha++)
        {
            for (int coluna = 0; coluna < n; coluna++)
            {
                if ((linha + coluna) % 2 == 0)
                {
                    Console.Write('#');
                    escuras++;
                }
                else
                {
                    Console.Write('.');
                }
            }

            Console.WriteLine();
        }

        Console.WriteLine($"Escuras: {escuras}");
    }
}
`,
      hints: [
        'Comece os dois contadores em 0 e use a condição `< n`, para que a soma na primeira casa seja 0.',
        'Um `if / else` funciona melhor que um ternário aqui, porque o ramo do `#` também precisa contar.',
      ],
      tests: [
        {
          name: 'Tabuleiro par',
          stdin: '4\n',
          expectedStdout: '#.#.\n.#.#\n#.#.\n.#.#\nEscuras: 8',
        },
        {
          name: 'Tabuleiro ímpar: o canto ganha',
          stdin: '5\n',
          expectedStdout: '#.#.#\n.#.#.\n#.#.#\n.#.#.\n#.#.#\nEscuras: 13',
        },
        {
          name: 'Três por três',
          stdin: '3\n',
          expectedStdout: '#.#\n.#.\n#.#\nEscuras: 5',
        },
        {
          name: 'Uma casa só',
          stdin: '1\n',
          expectedStdout: '#\nEscuras: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c05l08',
    title: 'Histograma de barras',
    objective: 'Transformar dados lidos em uma figura, com o comprimento de cada barra vindo do próprio valor.',
    concept: [
      {
        kind: 'text',
        body:
          'Até aqui o comprimento das linhas vinha de uma fórmula. Num histograma ele vem dos **dados**: cada valor lido vira uma barra do tamanho correspondente. É a primeira figura deste capítulo cujo formato não é conhecido antes de rodar.',
      },
      {
        kind: 'code',
        code: `for (int i = 0; i < n; i++)
{
    int valor = int.Parse(Console.ReadLine());

    Console.Write($"{valor}: ");

    for (int b = 1; b <= valor; b++)
    {
        Console.Write('#');
    }

    Console.WriteLine();
}`,
      },
      {
        kind: 'output',
        code: `3: ###
5: #####
1: #`,
      },
      {
        kind: 'text',
        body:
          'O rótulo antes da barra faz o histograma ser legível sem contar blocos. E como ele é escrito com `Write`, a barra continua na mesma linha.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um valor zero produz uma barra vazia, e a linha fica sendo só o rótulo. Isso é correto e vale testar: uma barra de comprimento zero é informação, não é um caso de erro.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O espaço depois dos dois-pontos vira espaço no fim da linha quando o valor é zero — e espaços finais são aparados na comparação. Por isso a linha esperada para o valor 0 é `0:`, sem espaço nenhum depois.',
      },
      {
        kind: 'text',
        body:
          'Valores muito grandes estouram a largura do console e a figura perde a utilidade. Programas reais escalam a barra dividindo pelo maior valor — uma técnica que exige conhecer o máximo antes de desenhar, e por isso guardar todos os dados. Guardar dados é o assunto da próxima seção.',
      },
    ],
    quiz: [
      {
        id: 's02c05l08q1',
        type: 'single',
        prompt: 'Como deve ficar a linha de um valor `0` em um histograma?',
        options: [
          { id: 'a', text: 'Apenas o rótulo, sem nenhum bloco.', correct: true },
          { id: 'b', text: 'Um bloco, como comprimento mínimo.' },
          { id: 'c', text: 'A linha deve ser omitida.' },
          { id: 'd', text: 'O programa deve reportar erro.' },
        ],
        explanation:
          'O laço da barra não dá nenhuma volta, e a linha fica só com o rótulo. Omitir a linha esconderia a informação de que aquele item existe e vale zero.',
      },
      {
        id: 's02c05l08q2',
        type: 'single',
        prompt: 'Por que o rótulo usa `Console.Write` e não `Console.WriteLine`?',
        options: [
          { id: 'a', text: 'Para que a barra fique na mesma linha do rótulo.', correct: true },
          { id: 'b', text: 'Porque `WriteLine` não aceita interpolação.' },
          { id: 'c', text: 'Por questão de desempenho.' },
          { id: 'd', text: 'Porque o rótulo é numérico.' },
        ],
        explanation:
          'É a mesma regra de todo o capítulo: só se encerra a linha quando ela está completa, e aqui ela só fica completa depois da barra.',
      },
      {
        id: 's02c05l08q3',
        type: 'single',
        prompt: 'Por que escalar as barras exigiria guardar os valores?',
        options: [
          { id: 'a', text: 'Porque a escala depende do maior valor, que só é conhecido depois de ler todos.', correct: true },
          { id: 'b', text: 'Porque a divisão exige `double`.' },
          { id: 'c', text: 'Porque `Console.Write` não aceita valores calculados.' },
          { id: 'd', text: 'Não exigiria: dá para escalar com o valor atual.' },
        ],
        explanation:
          'Desenhar a primeira barra já exigiria conhecer o máximo, que só aparece talvez na última linha. Ler duas vezes não é opção quando a entrada é um fluxo — daí a necessidade de armazenar.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` valores maiores ou iguais a zero. Desenhe um histograma horizontal em que cada valor vira uma barra de `#` do seu tamanho, precedida pelo próprio valor. Informe o total de blocos desenhados.',
      requirements: [
        'Cada linha tem o formato `5: #####`, com o valor, dois-pontos, um espaço e a barra',
        'Um valor `0` produz uma linha com apenas `0:`',
        'A última linha é `Total de blocos: k`',
        'Conte os blocos desenhados, não os valores lidos',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int blocos = 0;

        // Uma barra por valor lido

        Console.WriteLine($"Total de blocos: {blocos}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int blocos = 0;

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());

            Console.Write($"{valor}: ");

            for (int b = 1; b <= valor; b++)
            {
                Console.Write('#');
                blocos++;
            }

            Console.WriteLine();
        }

        Console.WriteLine($"Total de blocos: {blocos}");
    }
}
`,
      hints: [
        'O rótulo `$"{valor}: "` é escrito com `Write`, antes do laço da barra.',
        'O contador `blocos` sobe junto com cada `#` desenhado.',
      ],
      tests: [
        {
          name: 'Três barras',
          stdin: '3\n3\n5\n1\n',
          expectedStdout: '3: ###\n5: #####\n1: #\nTotal de blocos: 9',
        },
        {
          name: 'Barra de comprimento zero',
          stdin: '2\n0\n4\n',
          expectedStdout: '0:\n4: ####\nTotal de blocos: 4',
        },
        {
          name: 'Uma barra longa',
          stdin: '1\n10\n',
          expectedStdout: '10: ##########\nTotal de blocos: 10',
        },
        {
          name: 'Nenhum valor',
          stdin: '0\n',
          expectedStdout: 'Total de blocos: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c05l09',
    title: 'Prática: régua numerada',
    objective: 'Escolher entre três símbolos por posição, com a ordem dos testes decidindo o resultado.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma régua marca posições em três níveis: marcas grandes a cada 10 unidades, marcas médias a cada 5, e traços simples no resto. É a primeira figura do capítulo em que a decisão tem três saídas em vez de duas.',
      },
      {
        kind: 'code',
        code: `for (int i = 0; i <= n; i++)
{
    if (i % 10 == 0)      Console.Write('|');
    else if (i % 5 == 0)  Console.Write('+');
    else                  Console.Write('.');
}

Console.WriteLine();`,
      },
      {
        kind: 'output',
        code: `|....+....|....+....|`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A ordem dos testes é o ponto inteiro desta lição. Todo múltiplo de 10 também é múltiplo de 5, então testar o 5 primeiro faria as marcas grandes desaparecerem — a posição 10 sairia como `+`.',
      },
      {
        kind: 'text',
        body:
          'A regra geral: em uma cadeia de `else if`, o teste **mais específico** vem primeiro. Múltiplo de 10 é um caso particular de múltiplo de 5, então ele tem prioridade.',
      },
      {
        kind: 'compare',
        good: `if (i % 10 == 0)      '|';
else if (i % 5 == 0)  '+';
else                  '.';`,
        bad: `if (i % 5 == 0)       '+';
else if (i % 10 == 0) '|';
else                  '.';`,
        goodLabel: 'Marcas grandes aparecem',
        badLabel: 'Nenhum `|` é impresso',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A régua tem `n + 1` posições, não `n`, porque começa no zero. Confundir o comprimento com a quantidade de marcas é a versão desta lição do erro de um a mais.',
      },
    ],
    quiz: [
      {
        id: 's02c05l09q1',
        type: 'single',
        prompt: 'O que acontece se o teste de múltiplo de 5 vier antes do de múltiplo de 10?',
        options: [
          { id: 'a', text: 'Nenhuma marca grande aparece: a posição 10 vira `+`.', correct: true },
          { id: 'b', text: 'Nada muda.' },
          { id: 'c', text: 'Nenhuma marca média aparece.' },
          { id: 'd', text: 'O programa não compila.' },
        ],
        explanation:
          'Como `10 % 5 == 0`, o primeiro teste captura todas as posições que deveriam ser grandes. O `else if` seguinte nunca é alcançado para elas.',
      },
      {
        id: 's02c05l09q2',
        type: 'single',
        prompt: 'Quantas posições tem uma régua de comprimento 20, contando a partir do zero?',
        options: [
          { id: 'a', code: '21', correct: true },
          { id: 'b', code: '20' },
          { id: 'c', code: '19' },
          { id: 'd', code: '22' },
        ],
        explanation:
          'A faixa `0` a `20` inclusive tem `20 - 0 + 1` posições. É a mesma fórmula da lição sobre condição de parada.',
      },
      {
        id: 's02c05l09q3',
        type: 'single',
        prompt: 'Qual é a regra geral para ordenar uma cadeia de `else if`?',
        options: [
          { id: 'a', text: 'O teste mais específico vem primeiro.', correct: true },
          { id: 'b', text: 'O teste mais barato de calcular vem primeiro.' },
          { id: 'c', text: 'A ordem alfabética das condições.' },
          { id: 'd', text: 'A ordem é indiferente em qualquer cadeia.' },
        ],
        explanation:
          'Quando as condições se sobrepõem, a primeira que casar é a que vale. A mais específica precisa ter a chance de casar antes da mais geral engoli-la.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a zero e desenhe uma régua horizontal cobrindo as posições de 0 até `n`. Posições múltiplas de 10 recebem `|`, múltiplas de 5 recebem `+`, e as demais recebem `.`. Informe quantas marcas de cada tipo saíram.',
      requirements: [
        'Linha 1: a régua inteira, em uma única linha de `n + 1` caracteres',
        'Linha 2: `Marcas grandes: g`, contando as posições múltiplas de 10',
        'Linha 3: `Marcas medias: m`, contando as múltiplas de 5 que não são múltiplas de 10',
        'Linha 4: `Total: t`, com o número de posições',
        'A posição 0 é múltipla de 10 e recebe `|`',
        'Teste o múltiplo de 10 antes do múltiplo de 5',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int grandes = 0;
        int medias = 0;

        // Do mais especifico para o mais geral

        Console.WriteLine();
        Console.WriteLine($"Marcas grandes: {grandes}");
        Console.WriteLine($"Marcas medias: {medias}");
        Console.WriteLine($"Total: {n + 1}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int grandes = 0;
        int medias = 0;

        for (int i = 0; i <= n; i++)
        {
            if (i % 10 == 0)
            {
                Console.Write('|');
                grandes++;
            }
            else if (i % 5 == 0)
            {
                Console.Write('+');
                medias++;
            }
            else
            {
                Console.Write('.');
            }
        }

        Console.WriteLine();
        Console.WriteLine($"Marcas grandes: {grandes}");
        Console.WriteLine($"Marcas medias: {medias}");
        Console.WriteLine($"Total: {n + 1}");
    }
}
`,
      hints: [
        'O laço vai de 0 a `n` **inclusive**, então a condição é `i <= n`.',
        'O `Console.WriteLine()` que fecha a régua já está no `starterCode`, logo depois do laço.',
      ],
      tests: [
        {
          name: 'Régua de vinte',
          stdin: '20\n',
          expectedStdout: '|....+....|....+....|\nMarcas grandes: 3\nMarcas medias: 2\nTotal: 21',
        },
        {
          name: 'Régua que para antes de fechar a dezena',
          stdin: '9\n',
          expectedStdout: '|....+....\nMarcas grandes: 1\nMarcas medias: 1\nTotal: 10',
        },
        {
          name: 'Régua que termina numa marca média',
          stdin: '5\n',
          expectedStdout: '|....+\nMarcas grandes: 1\nMarcas medias: 1\nTotal: 6',
        },
        {
          name: 'Régua de uma posição só',
          stdin: '0\n',
          expectedStdout: '|\nMarcas grandes: 1\nMarcas medias: 0\nTotal: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c05l10',
    title: 'Checkpoint: laços aninhados',
    objective: 'Compor uma figura de várias partes, coordenando bordas, recuo e conteúdo centralizado na mesma saída.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint pede uma pirâmide dentro de uma moldura. Nada aqui é novo: é a moldura da lição 3 com o miolo da lição 5, mais a aritmética que faz as duas coisas se encaixarem.',
      },
      {
        kind: 'output',
        code: `#########
#   *   #
#  ***  #
# ***** #
#########`,
      },
      {
        kind: 'text',
        body:
          'A conta que decide tudo é a largura. A pirâmide de `n` linhas ocupa `2n - 1` colunas; somando um espaço de folga de cada lado e uma borda de cada lado, a largura total fica em `2n + 3`.',
      },
      {
        kind: 'table',
        headers: ['`n`', 'Pirâmide', 'Largura total', 'Altura total'],
        rows: [
          ['`1`', '`1`', '`5`', '`3`'],
          ['`2`', '`3`', '`7`', '`4`'],
          ['`3`', '`5`', '`9`', '`5`'],
          ['`4`', '`7`', '`11`', '`6`'],
        ],
      },
      {
        kind: 'text',
        body:
          'Cada linha do miolo tem cinco pedaços na ordem: borda, recuo, asteriscos, recuo, borda. Os dois recuos são iguais e valem `n - i + 1` — um a mais que o recuo da pirâmide solta, por causa da folga.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Comece desenhando só a moldura vazia e confira a largura. Depois acrescente a pirâmide dentro. Tentar acertar as cinco partes de uma vez é a receita para uma figura desalinhada por um caractere que você não consegue localizar.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O recuo da direita não pode ser omitido só porque espaços finais são aparados: a borda direita vem depois dele. Sem esse recuo, a moldura fica torta e a comparação reprova.',
      },
    ],
    quiz: [
      {
        id: 's02c05l10q1',
        type: 'single',
        prompt: 'Qual é a largura total da moldura para `n = 4`?',
        options: [
          { id: 'a', code: '11', correct: true },
          { id: 'b', code: '9' },
          { id: 'c', code: '7' },
          { id: 'd', code: '13' },
        ],
        explanation:
          'A pirâmide ocupa `2 × 4 - 1 = 7`, mais um espaço de folga e uma borda de cada lado: `7 + 2 + 2 = 11`, ou seja `2n + 3`.',
      },
      {
        id: 's02c05l10q2',
        type: 'single',
        prompt: 'Quantas linhas tem a figura completa?',
        options: [
          { id: 'a', code: 'n + 2', correct: true },
          { id: 'b', code: 'n', },
          { id: 'c', code: '2n - 1' },
          { id: 'd', code: 'n + 1' },
        ],
        explanation:
          'São as `n` linhas da pirâmide mais a linha de topo e a de base da moldura.',
      },
      {
        id: 's02c05l10q3',
        type: 'single',
        prompt: 'Por que o recuo à direita precisa ser desenhado, se espaços finais são ignorados?',
        options: [
          { id: 'a', text: 'Porque a borda direita vem depois dele, então esses espaços não são finais.', correct: true },
          { id: 'b', text: 'Porque a comparação usada aqui é a exata.' },
          { id: 'c', text: 'Porque `Console.Write` não permite pular caracteres.' },
          { id: 'd', text: 'Ele não precisa: pode ser omitido.' },
        ],
        explanation:
          'Só é aparado o que está depois do último caractere não branco da linha. Com a borda fechando a linha, todo espaço anterior a ela é conteúdo.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e desenhe uma pirâmide de `n` linhas dentro de uma moldura de `#`, com um espaço de folga entre a pirâmide e a borda de cada lado. Depois da figura, informe largura, altura e total de asteriscos.',
      requirements: [
        'A primeira e a última linha são feitas só de `#`, com `2n + 3` caracteres',
        'Cada linha do miolo é: `#`, recuo, asteriscos, recuo, `#`',
        'O recuo de cada lado na linha `i` é de `n - i + 1` espaços',
        'A linha `i` do miolo tem `2i - 1` asteriscos',
        'Depois da figura: `Largura: l`, `Altura: a` e `Estrelas: e`',
        'Conte os asteriscos com um contador, não pela fórmula',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int largura = 2 * n + 3;
        int estrelas = 0;

        // 1. linha de topo, largura cheia de '#'
        // 2. n linhas de miolo: borda, recuo, asteriscos, recuo, borda
        // 3. linha de base, igual ao topo

        Console.WriteLine($"Largura: {largura}");
        Console.WriteLine($"Altura: {n + 2}");
        Console.WriteLine($"Estrelas: {estrelas}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int largura = 2 * n + 3;
        int estrelas = 0;

        for (int c = 1; c <= largura; c++)
        {
            Console.Write('#');
        }

        Console.WriteLine();

        for (int i = 1; i <= n; i++)
        {
            Console.Write('#');

            for (int e = 1; e <= n - i + 1; e++)
            {
                Console.Write(' ');
            }

            for (int a = 1; a <= 2 * i - 1; a++)
            {
                Console.Write('*');
                estrelas++;
            }

            for (int e = 1; e <= n - i + 1; e++)
            {
                Console.Write(' ');
            }

            Console.Write('#');
            Console.WriteLine();
        }

        for (int c = 1; c <= largura; c++)
        {
            Console.Write('#');
        }

        Console.WriteLine();

        Console.WriteLine($"Largura: {largura}");
        Console.WriteLine($"Altura: {n + 2}");
        Console.WriteLine($"Estrelas: {estrelas}");
    }
}
`,
      hints: [
        'A linha de topo e a de base são idênticas: um laço simples de `largura` caracteres `#`.',
        'Cada linha do miolo tem cinco escritas em sequência. Confira somando: `1 + (n - i + 1) + (2i - 1) + (n - i + 1) + 1` sempre dá `2n + 3`.',
      ],
      tests: [
        {
          name: 'Moldura de três',
          stdin: '3\n',
          expectedStdout:
            '#########\n#   *   #\n#  ***  #\n# ***** #\n#########\nLargura: 9\nAltura: 5\nEstrelas: 9',
        },
        {
          name: 'Moldura mínima',
          stdin: '1\n',
          expectedStdout: '#####\n# * #\n#####\nLargura: 5\nAltura: 3\nEstrelas: 1',
        },
        {
          name: 'Moldura de dois',
          stdin: '2\n',
          expectedStdout:
            '#######\n#  *  #\n# *** #\n#######\nLargura: 7\nAltura: 4\nEstrelas: 4',
        },
        {
          name: 'Moldura de quatro',
          stdin: '4\n',
          expectedStdout:
            '###########\n#    *    #\n#   ***   #\n#  *****  #\n# ******* #\n###########\nLargura: 11\nAltura: 6\nEstrelas: 16',
          hidden: true,
        },
      ],
    },
  },
]
