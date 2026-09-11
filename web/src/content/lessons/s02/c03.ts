import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's02c03l01',
    title: 'break: saindo cedo',
    objective: 'Interromper um laço no meio quando a resposta já foi encontrada ou uma condição de parada apareceu.',
    concept: [
      {
        kind: 'text',
        body:
          'Até agora um laço só terminava pela condição do cabeçalho. O `break` abre uma segunda saída: ele encerra o laço **na hora**, no ponto exato em que aparece, sem executar o resto do corpo nem o progresso.',
      },
      {
        kind: 'code',
        code: `for (int i = 1; i <= 10; i++)
{
    if (i == 4)
    {
        break;          // sai do laco imediatamente
    }

    Console.WriteLine(i);
}

Console.WriteLine("depois do laco");`,
      },
      {
        kind: 'output',
        code: `1
2
3
depois do laco`,
      },
      {
        kind: 'text',
        body:
          'O `break` é a ferramenta certa quando o laço tem um limite máximo, mas pode encontrar antes o que procura. Sem ele você teria que continuar percorrendo dados que já não interessam.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O `break` sai **apenas do laço em que está**. Dentro de laços aninhados ele encerra o mais interno e a execução continua no externo — o assunto de uma lição inteira mais adiante neste capítulo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Depois de um `break`, a variável de controle guarda o valor em que a saída aconteceu. Comparar esse valor com o limite do laço diz, sem nenhuma variável extra, se a saída foi antecipada ou natural.',
      },
    ],
    quiz: [
      {
        id: 's02c03l01q1',
        type: 'single',
        prompt: 'O que este trecho imprime?',
        code: `int soma = 0;
for (int i = 1; i <= 5; i++)
{
    if (i == 3) break;
    soma += i;
}
Console.WriteLine(soma);`,
        options: [
          { id: 'a', code: '3', correct: true },
          { id: 'b', code: '6' },
          { id: 'c', code: '15' },
          { id: 'd', code: '10' },
        ],
        explanation:
          'Somam-se apenas 1 e 2. Quando `i` chega a 3 o `break` sai antes da linha `soma += i`, então o próprio 3 não entra.',
      },
      {
        id: 's02c03l01q2',
        type: 'single',
        prompt: 'Qual é a diferença entre `break` e uma condição de parada no cabeçalho?',
        options: [
          { id: 'a', text: 'A condição só é testada entre voltas; o `break` sai de qualquer ponto do corpo.', correct: true },
          { id: 'b', text: 'Nenhuma: são duas formas de escrever a mesma coisa.' },
          { id: 'c', text: 'O `break` só funciona em `while`, nunca em `for`.' },
          { id: 'd', text: 'A condição é mais rápida, porque não precisa de `if`.' },
        ],
        explanation:
          'É por isso que o `break` existe: às vezes a informação que decide a parada só aparece no meio do corpo, depois de ler ou calcular alguma coisa.',
      },
      {
        id: 's02c03l01q3',
        type: 'single',
        prompt: 'Depois de `for (int i = 0; i < n; i++) { ... break; ... }`, como saber se a saída foi antecipada?',
        options: [
          { id: 'a', text: 'Guardando o valor do contador e comparando com `n`: se for menor, saiu cedo.', correct: true },
          { id: 'b', text: 'Perguntando ao próprio `break`, que devolve um `bool`.' },
          { id: 'c', text: 'Não há como saber sem reescrever o laço.' },
          { id: 'd', text: 'Verificando se o laço imprimiu alguma coisa.' },
        ],
        explanation:
          'Um laço que termina naturalmente deixa o contador no valor que fez a condição falhar. Um `break` o deixa antes disso, e essa diferença é informação de graça.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois até `n` valores. Some os valores lidos, mas pare imediatamente ao encontrar um valor negativo — ele não entra na soma. Informe quantos foram lidos, a soma, e se a leitura parou antes do previsto.',
      requirements: [
        'Linha 1: `Lidos: k`, sem contar o valor negativo que interrompeu',
        'Linha 2: `Soma: X`',
        'Linha 3: `Parou cedo: True` ou `Parou cedo: False`',
        'O valor negativo interrompe e não é somado nem contado',
        'Se nenhum negativo aparecer, todos os `n` valores são lidos e `Parou cedo` é `False`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int lidos = 0;
        int soma = 0;

        // Some ate encontrar um negativo

        Console.WriteLine($"Lidos: {lidos}");
        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Parou cedo: {lidos < n}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int lidos = 0;
        int soma = 0;

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());

            if (valor < 0)
            {
                break;
            }

            soma += valor;
            lidos++;
        }

        Console.WriteLine($"Lidos: {lidos}");
        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Parou cedo: {lidos < n}");
    }
}
`,
      hints: [
        'O `break` precisa vir **antes** de somar e contar, senão o valor negativo entra no resultado.',
        'A linha do `Parou cedo` já vem pronta: `lidos < n` só é verdadeiro quando o laço não completou todas as voltas.',
      ],
      tests: [
        {
          name: 'Negativo no meio interrompe',
          stdin: '5\n10\n20\n-1\n30\n40\n',
          expectedStdout: 'Lidos: 2\nSoma: 30\nParou cedo: True',
        },
        {
          name: 'Nenhum negativo',
          stdin: '3\n1\n2\n3\n',
          expectedStdout: 'Lidos: 3\nSoma: 6\nParou cedo: False',
        },
        {
          name: 'Negativo logo no primeiro valor',
          stdin: '2\n-5\n7\n',
          expectedStdout: 'Lidos: 0\nSoma: 0\nParou cedo: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c03l02',
    title: 'continue: pulando uma volta',
    objective: 'Descartar uma iteração sem encerrar o laço, e reconhecer por que `continue` é perigoso dentro de um `while`.',
    concept: [
      {
        kind: 'text',
        body:
          'O `continue` não sai do laço: ele abandona o **restante do corpo** e salta direto para a próxima volta. É a forma de dizer "este item não me interessa, siga em frente".',
      },
      {
        kind: 'code',
        code: `for (int i = 1; i <= 6; i++)
{
    if (i % 2 == 0)
    {
        continue;       // pula os pares
    }

    Console.WriteLine(i);
}`,
      },
      {
        kind: 'output',
        code: `1
3
5`,
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Com continue',
          code: `for (int i = 1; i <= 6; i++)
{
    if (i % 2 == 0) continue;

    Console.WriteLine(i);
}`,
        },
        right: {
          label: 'Com if invertido',
          code: `for (int i = 1; i <= 6; i++)
{
    if (i % 2 != 0)
    {
        Console.WriteLine(i);
    }
}`,
        },
        note: 'Idênticos em resultado. O `continue` ganha quando o corpo é longo e há várias razões para descartar.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Em um `while`, o `continue` pula o resto do corpo — **inclusive o incremento**, se ele estiver lá no fim. O laço trava. Num `for` isso não acontece, porque o progresso está no cabeçalho e roda sempre.',
      },
      {
        kind: 'compare',
        good: `for (int i = 0; i < n; i++)
{
    if (invalido) continue;
    processa();
}`,
        bad: `int i = 0;
while (i < n)
{
    if (invalido) continue;
    processa();
    i++;
}`,
        goodLabel: 'O `for` sempre avança',
        badLabel: 'Trava no primeiro inválido',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Uma sequência de `continue` no topo do corpo funciona como uma lista de filtros: cada um descarta um tipo de caso ruim, e o que sobra abaixo deles é o caminho feliz, sem aninhamento nenhum.',
      },
    ],
    quiz: [
      {
        id: 's02c03l02q1',
        type: 'single',
        prompt: 'Quanto vale `soma` ao final?',
        code: `int soma = 0;
for (int i = 1; i <= 5; i++)
{
    if (i == 3) continue;
    soma += i;
}`,
        options: [
          { id: 'a', code: '12', correct: true },
          { id: 'b', code: '15' },
          { id: 'c', code: '3' },
          { id: 'd', code: '6' },
        ],
        explanation:
          'O laço percorre 1 a 5 normalmente, pulando apenas a soma do 3: 1 + 2 + 4 + 5 = 12. Com `break` no lugar do `continue` o resultado seria 3.',
      },
      {
        id: 's02c03l02q2',
        type: 'single',
        prompt: 'Por que este `while` trava?',
        code: `int i = 0;
while (i < 5)
{
    if (i == 2) continue;
    Console.WriteLine(i);
    i++;
}`,
        options: [
          { id: 'a', text: 'Quando `i` é 2, o `continue` pula o `i++` e a condição volta a testar o mesmo 2.', correct: true },
          { id: 'b', text: 'Porque `continue` não é permitido em `while`.' },
          { id: 'c', text: 'Porque `i` deveria começar em 1.' },
          { id: 'd', text: 'Ele não trava: imprime 0, 1, 3 e 4.' },
        ],
        explanation:
          'O `continue` volta para o teste da condição, não para o fim do corpo. Como o incremento estava depois dele, o progresso deixa de acontecer.',
      },
      {
        id: 's02c03l02q3',
        type: 'single',
        prompt: 'Qual é a diferença essencial entre `break` e `continue`?',
        options: [
          { id: 'a', text: '`break` encerra o laço; `continue` encerra apenas a volta atual.', correct: true },
          { id: 'b', text: '`break` funciona em `for` e `continue` em `while`.' },
          { id: 'c', text: '`continue` também pula a condição de parada.' },
          { id: 'd', text: '`break` pode aparecer fora de um laço, `continue` não.' },
        ],
        explanation:
          'Um abandona o laço inteiro, o outro abandona uma iteração. Confundir os dois é o erro mais comum de quem está aprendendo controle de fluxo.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` valores. Some apenas os valores não negativos, ignorando os negativos com `continue`. Informe quantos foram ignorados, quantos entraram na soma e o total.',
      requirements: [
        'Linha 1: `Ignorados: k`',
        'Linha 2: `Somados: m`',
        'Linha 3: `Soma: X`',
        'O valor `0` é não negativo e entra na soma',
        'Todos os `n` valores são lidos: nenhum negativo interrompe o laço',
        'Use `continue` para descartar os negativos',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int ignorados = 0;
        int somados = 0;
        int soma = 0;

        // Pule os negativos e some o resto

        Console.WriteLine($"Ignorados: {ignorados}");
        Console.WriteLine($"Somados: {somados}");
        Console.WriteLine($"Soma: {soma}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int ignorados = 0;
        int somados = 0;
        int soma = 0;

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());

            if (valor < 0)
            {
                ignorados++;
                continue;
            }

            somados++;
            soma += valor;
        }

        Console.WriteLine($"Ignorados: {ignorados}");
        Console.WriteLine($"Somados: {somados}");
        Console.WriteLine($"Soma: {soma}");
    }
}
`,
      hints: [
        'Conte o descarte **antes** do `continue`: depois dele nenhuma linha do corpo executa.',
        'Como o progresso está no cabeçalho do `for`, o `continue` é seguro aqui.',
      ],
      tests: [
        {
          name: 'Negativos espalhados',
          stdin: '5\n10\n-3\n20\n-7\n5\n',
          expectedStdout: 'Ignorados: 2\nSomados: 3\nSoma: 35',
        },
        {
          name: 'O zero entra na soma',
          stdin: '3\n0\n2\n-1\n',
          expectedStdout: 'Ignorados: 1\nSomados: 2\nSoma: 2',
        },
        {
          name: 'Todos negativos',
          stdin: '2\n-1\n-2\n',
          expectedStdout: 'Ignorados: 2\nSomados: 0\nSoma: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c03l03',
    title: 'return antecipado',
    objective: 'Encerrar o programa inteiro a partir de qualquer ponto, inclusive de dentro de um laço.',
    concept: [
      {
        kind: 'text',
        body:
          'O `return` dentro de `Main` encerra o programa na hora. Diferente do `break`, que sai de um laço, ele abandona **tudo**: o laço, os laços que o contêm, e as linhas que viriam depois.',
      },
      {
        kind: 'code',
        code: `for (int i = 0; i < n; i++)
{
    int valor = int.Parse(Console.ReadLine());

    if (valor == 0)
    {
        Console.WriteLine("Valor invalido");
        return;                        // fim do programa
    }
}

Console.WriteLine("Todos validos");   // nunca roda apos o return`,
      },
      {
        kind: 'table',
        headers: ['Instrução', 'Encerra'],
        rows: [
          ['`continue`', 'a volta atual'],
          ['`break`', 'o laço mais interno'],
          ['`return`', 'o método inteiro — em `Main`, o programa'],
        ],
      },
      {
        kind: 'text',
        body:
          'O padrão que isso habilita é a **saída de erro antecipada**: assim que uma condição impede a continuação, você reporta e sai, em vez de aninhar todo o resto do programa dentro de um `else`.',
      },
      {
        kind: 'compare',
        good: `if (n <= 0)
{
    Console.WriteLine("Invalido");
    return;
}

// caminho feliz, sem aninhamento`,
        bad: `if (n <= 0)
{
    Console.WriteLine("Invalido");
}
else
{
    // caminho feliz, um nivel mais fundo
}`,
        goodLabel: 'Saída antecipada',
        badLabel: 'Aninhamento crescente',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Todo `return` antecipado precisa imprimir o que o problema espera **antes** de sair. Uma saída silenciosa produz um programa que termina sem erro e sem resposta, o que é bem mais difícil de diagnosticar do que uma exceção.',
      },
    ],
    quiz: [
      {
        id: 's02c03l03q1',
        type: 'single',
        prompt: 'Qual instrução sai de dois laços aninhados de uma vez?',
        options: [
          { id: 'a', code: 'return', correct: true },
          { id: 'b', code: 'break' },
          { id: 'c', code: 'continue' },
          { id: 'd', text: 'Dois `break` seguidos.' },
        ],
        explanation:
          'O `break` sai de um nível por vez, e dois `break` seguidos não funcionam porque o segundo nunca é alcançado. O `return` abandona o método inteiro, independentemente da profundidade.',
      },
      {
        id: 's02c03l03q2',
        type: 'single',
        prompt: 'O que este programa imprime com a entrada 5, 3, 0, 8?',
        code: `for (int i = 0; i < 4; i++)
{
    int v = int.Parse(Console.ReadLine());
    if (v == 0)
    {
        Console.WriteLine("zero");
        return;
    }
    Console.WriteLine(v);
}
Console.WriteLine("fim");`,
        options: [
          { id: 'a', text: '`5`, `3`, `zero`', correct: true },
          { id: 'b', text: '`5`, `3`, `zero`, `8`, `fim`' },
          { id: 'c', text: '`5`, `3`, `zero`, `fim`' },
          { id: 'd', text: '`zero`' },
        ],
        explanation:
          'O `return` encerra o programa antes de ler o 8 e antes da linha `fim`. Com `break` no lugar dele, o `fim` seria impresso.',
      },
      {
        id: 's02c03l03q3',
        type: 'single',
        prompt: 'Qual é a principal vantagem da saída antecipada sobre o `else`?',
        options: [
          { id: 'a', text: 'O caminho principal fica sem aninhamento e mais fácil de ler.', correct: true },
          { id: 'b', text: 'Ela executa mais rápido.' },
          { id: 'c', text: 'Ela dispensa a validação das entradas.' },
          { id: 'd', text: 'Ela impede que o programa lance exceções.' },
        ],
        explanation:
          'Cada validação tratada e encerrada no topo remove um nível de indentação do resto. Com quatro ou cinco validações, a diferença de legibilidade é enorme.',
      },
    ],
    challenge: {
      brief:
        'Leia um `limite`, um inteiro `n`, e depois `n` valores. Acumule os valores em ordem. No instante em que a soma passar do limite, informe qual valor causou o estouro e encerre o programa. Se a soma nunca passar, informe o total e que ficou dentro do limite.',
      requirements: [
        'Ao estourar: uma única linha `Estourou em: X`, com o valor que causou o estouro',
        'Sem estourar: linha 1 `Total: X` e linha 2 `Dentro do limite`',
        '"Passar do limite" exclui o valor exato: uma soma igual ao limite ainda está dentro',
        'Use `return` para encerrar assim que o estouro for detectado',
        'Se `n` for 0, a soma é `0` e o programa fica dentro do limite',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int limite = int.Parse(Console.ReadLine());
        int n = int.Parse(Console.ReadLine());

        int soma = 0;

        // Acumule e saia antecipadamente ao estourar

        Console.WriteLine($"Total: {soma}");
        Console.WriteLine("Dentro do limite");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int limite = int.Parse(Console.ReadLine());
        int n = int.Parse(Console.ReadLine());

        int soma = 0;

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());
            soma += valor;

            if (soma > limite)
            {
                Console.WriteLine($"Estourou em: {valor}");
                return;
            }
        }

        Console.WriteLine($"Total: {soma}");
        Console.WriteLine("Dentro do limite");
    }
}
`,
      hints: [
        'Some primeiro, teste depois: o estouro é uma propriedade da soma já atualizada.',
        'Imprima a mensagem antes do `return`. Sair sem imprimir deixa o programa mudo.',
      ],
      tests: [
        {
          name: 'Estoura no terceiro valor',
          stdin: '50\n5\n10\n20\n30\n40\n50\n',
          expectedStdout: 'Estourou em: 30',
        },
        {
          name: 'Fica dentro do limite',
          stdin: '100\n3\n10\n20\n30\n',
          expectedStdout: 'Total: 60\nDentro do limite',
        },
        {
          name: 'Soma exatamente igual ao limite ainda está dentro',
          stdin: '60\n3\n10\n20\n30\n',
          expectedStdout: 'Total: 60\nDentro do limite',
        },
        {
          name: 'Nenhum valor para ler',
          stdin: '10\n0\n',
          expectedStdout: 'Total: 0\nDentro do limite',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c03l04',
    title: 'Laços aninhados',
    objective: 'Coordenar dois contadores em que o interno depende do externo, gerando estruturas triangulares.',
    concept: [
      {
        kind: 'text',
        body:
          'Você já viu laços aninhados na tabuada, onde o interno ia sempre de 1 a 10. O passo seguinte é o interno **depender** do externo — e é isso que gera triângulos, combinações e comparações de pares.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Retangular: n × n',
          code: `for (int i = 1; i <= n; i++)
{
    for (int j = 1; j <= n; j++)
    {
        // n * n voltas
    }
}`,
        },
        right: {
          label: 'Triangular: j até i',
          code: `for (int i = 1; i <= n; i++)
{
    for (int j = 1; j <= i; j++)
    {
        // n * (n + 1) / 2 voltas
    }
}`,
        },
        note: 'A diferença é um único caractere no limite do laço interno, e o total de trabalho cai quase pela metade.',
      },
      {
        kind: 'code',
        code: `for (int i = 1; i <= 3; i++)
{
    for (int j = 1; j <= i; j++)
    {
        Console.WriteLine($"{i} {j}");
    }
}`,
      },
      {
        kind: 'output',
        code: `1 1
2 1
2 2
3 1
3 2
3 3`,
      },
      {
        kind: 'text',
        body:
          'Para `n = 3` são 1 + 2 + 3 = 6 voltas — exatamente o somatório de 1 a `n`. Essa forma triangular aparece sempre que você precisa comparar cada item com os que vêm depois dele, sem repetir pares.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A variável do laço interno precisa ser reinicializada a cada volta do externo — e é isso que o cabeçalho do `for` faz sozinho. Declarar `j` **antes** do laço externo e não reiniciá-lo faz o interno rodar só na primeira volta.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um laço interno com `j = i` em vez de `j = 1` gera a mesma forma triangular pelo outro lado, e é a base do padrão "comparar cada par uma única vez" que aparece em ordenação e em detecção de duplicatas.',
      },
    ],
    quiz: [
      {
        id: 's02c03l04q1',
        type: 'single',
        prompt: 'Quantas vezes o corpo mais interno executa com `n = 4`?',
        code: `for (int i = 1; i <= n; i++)
{
    for (int j = 1; j <= i; j++)
    {
        // corpo
    }
}`,
        options: [
          { id: 'a', code: '10', correct: true },
          { id: 'b', code: '16' },
          { id: 'c', code: '8' },
          { id: 'd', code: '4' },
        ],
        explanation:
          'São 1 + 2 + 3 + 4 = 10 voltas, o somatório de 1 a `n`. A versão retangular daria 16.',
      },
      {
        id: 's02c03l04q2',
        type: 'single',
        prompt: 'Por que declarar `int j = 1;` antes do laço externo quebra o padrão triangular?',
        options: [
          { id: 'a', text: 'Porque `j` fica com o valor da volta anterior e o laço interno não roda de novo.', correct: true },
          { id: 'b', text: 'Porque o C# não permite usar uma variável externa no laço interno.' },
          { id: 'c', text: 'Porque `j` precisa ser `long` nesse caso.' },
          { id: 'd', text: 'Não quebra: o resultado é o mesmo.' },
        ],
        explanation:
          'Na segunda volta do externo, `j` já vale mais que o limite, então a condição do interno é falsa de saída. A preparação no cabeçalho existe justamente para reiniciar a cada entrada.',
      },
      {
        id: 's02c03l04q3',
        type: 'single',
        prompt: 'Qual laço interno gera exatamente os pares em que o segundo valor nunca é menor que o primeiro?',
        options: [
          { id: 'a', code: 'for (int j = i; j <= n; j++)', correct: true },
          { id: 'b', code: 'for (int j = 1; j <= i; j++)' },
          { id: 'c', code: 'for (int j = 1; j <= n; j++)' },
          { id: 'd', code: 'for (int j = n; j >= i; j--)' },
        ],
        explanation:
          'Começar em `i` e ir até `n` produz `(1,1), (1,2), ... (2,2), (2,3)...` — cada par uma vez só, sem inversões. É o formato usado para comparar todos os pares de uma coleção.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e imprima todos os pares `i j` em que `i` vai de 1 a `n` e `j` vai de 1 até `i`. Termine informando quantos pares foram gerados.',
      requirements: [
        'Cada par sai como `2 1`, com os dois números separados por um espaço',
        'Os pares saem em ordem: todos do `i = 1`, depois todos do `i = 2`, e assim por diante',
        'A última linha é `Total: k`',
        'Para `n` igual a 0 a saída é apenas `Total: 0`',
        'Deixe o laço contar o total; não use a fórmula',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int total = 0;

        // Externo de 1 a n, interno de 1 ate i

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

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= i; j++)
            {
                Console.WriteLine($"{i} {j}");
                total++;
            }
        }

        Console.WriteLine($"Total: {total}");
    }
}
`,
      hints: [
        'O limite do laço interno é `i`, não `n`. Essa é a única diferença para a forma retangular.',
        'O contador `total` fica fora dos dois laços, para sobreviver às duas.',
      ],
      tests: [
        {
          name: 'Triângulo de 3',
          stdin: '3\n',
          expectedStdout: '1 1\n2 1\n2 2\n3 1\n3 2\n3 3\nTotal: 6',
        },
        {
          name: 'Um par só',
          stdin: '1\n',
          expectedStdout: '1 1\nTotal: 1',
        },
        {
          name: 'Nenhum par',
          stdin: '0\n',
          expectedStdout: 'Total: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c03l05',
    title: 'Saindo de laços aninhados',
    objective: 'Abandonar dois laços de uma vez, escolhendo entre `return` e uma variável de controle.',
    concept: [
      {
        kind: 'text',
        body:
          'Um `break` dentro de dois laços aninhados sai apenas do interno. A execução continua no externo, que começa a próxima volta como se nada tivesse acontecido — e essa é a origem de muitos resultados errados difíceis de enxergar.',
      },
      {
        kind: 'code',
        code: `for (int i = 1; i <= 3; i++)
{
    for (int j = 1; j <= 3; j++)
    {
        if (j == 2) break;      // sai so do laco de j

        Console.WriteLine($"{i} {j}");
    }
}`,
      },
      {
        kind: 'output',
        code: `1 1
2 1
3 1`,
      },
      {
        kind: 'text',
        body:
          'Existem duas saídas limpas para sair dos dois de uma vez. Quando o resultado já está pronto, o `return` é a mais direta. Quando o programa ainda precisa continuar depois, uma variável de controle passa o recado para o laço externo.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'return: encerra tudo',
          code: `for (int i = 1; i <= n; i++)
{
    for (int j = 1; j <= n; j++)
    {
        if (achou)
        {
            Console.WriteLine("ok");
            return;
        }
    }
}`,
        },
        right: {
          label: 'variável: avisa o externo',
          code: `bool parar = false;

for (int i = 1; i <= n && !parar; i++)
{
    for (int j = 1; j <= n; j++)
    {
        if (achou)
        {
            parar = true;
            break;
        }
    }
}`,
        },
        note: 'O `return` é mais curto; a variável é a única opção quando ainda há trabalho depois dos laços.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Dois `break` seguidos não resolvem nada: o segundo é código inalcançável e o compilador avisa. Cada `break` precisa ser executado em um nível diferente, e é exatamente isso que a variável de controle organiza.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Se a busca é a única coisa que o programa faz, prefira o `return`. Ele elimina a variável extra e deixa impossível esquecer de testá-la na condição do laço externo — o esquecimento mais comum da alternativa.',
      },
    ],
    quiz: [
      {
        id: 's02c03l05q1',
        type: 'single',
        prompt: 'Quantas linhas o trecho da lição imprime, com o `break` quando `j == 2`?',
        options: [
          { id: 'a', text: 'Três: uma por volta do laço externo.', correct: true },
          { id: 'b', text: 'Uma: o `break` encerra tudo.' },
          { id: 'c', text: 'Nove: o `break` não tem efeito.' },
          { id: 'd', text: 'Nenhuma.' },
        ],
        explanation:
          'O `break` corta o laço interno logo na segunda volta, mas o externo continua normalmente. Cada uma das três voltas externas imprime exatamente uma linha.',
      },
      {
        id: 's02c03l05q2',
        type: 'single',
        prompt: 'Por que `break; break;` não sai de dois laços?',
        options: [
          { id: 'a', text: 'O segundo nunca é alcançado: o primeiro já transferiu a execução para fora do laço interno.', correct: true },
          { id: 'b', text: 'Porque `break` só pode aparecer uma vez por método.' },
          { id: 'c', text: 'Porque falta um ponto e vírgula entre eles.' },
          { id: 'd', text: 'Funciona: é a forma idiomática em C#.' },
        ],
        explanation:
          'A primeira instrução já desvia o fluxo. O compilador inclusive reporta a segunda como código inalcançável.',
      },
      {
        id: 's02c03l05q3',
        type: 'single',
        prompt: 'Quando a variável de controle é preferível ao `return`?',
        options: [
          { id: 'a', text: 'Quando o programa ainda precisa executar algo depois dos laços.', correct: true },
          { id: 'b', text: 'Quando os laços são mais de dois.' },
          { id: 'c', text: 'Quando a busca pode não encontrar nada.' },
          { id: 'd', text: 'Sempre: `return` dentro de laço é má prática.' },
        ],
        explanation:
          'O `return` encerra o método, então tudo que viria depois é perdido. Se há um relatório final, um resumo ou outra etapa, a variável é a única forma de sair dos laços mantendo o programa vivo.',
      },
    ],
    challenge: {
      brief:
        'Leia dois inteiros, `n` e `alvo`. Procure o primeiro par `i x j`, com `i` e `j` entre 1 e `n`, cujo produto seja exatamente `alvo`. Varra na ordem natural — todo `j` de cada `i`, do menor `i` para o maior. Informe o par encontrado ou que não existe nenhum.',
      requirements: [
        'Ao encontrar: uma única linha `Encontrado: 2 x 6`',
        'Sem encontrar: uma única linha `Nenhum`',
        'O primeiro par na ordem de varredura é o que vale, e a busca para nele',
        'Saia dos dois laços de uma vez, sem continuar procurando depois de achar',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int alvo = int.Parse(Console.ReadLine());

        // Varra os pares e saia dos dois lacos ao encontrar

        Console.WriteLine("Nenhum");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int alvo = int.Parse(Console.ReadLine());

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                if (i * j == alvo)
                {
                    Console.WriteLine($"Encontrado: {i} x {j}");
                    return;
                }
            }
        }

        Console.WriteLine("Nenhum");
    }
}
`,
      hints: [
        'O `Console.WriteLine("Nenhum")` já está no lugar certo: ele só é alcançado se os laços terminarem sem achar nada.',
        'Um `return` logo depois de imprimir o par resolve a saída dos dois laços de uma vez.',
      ],
      tests: [
        {
          name: 'Encontra no meio da varredura',
          stdin: '6\n12\n',
          expectedStdout: 'Encontrado: 2 x 6',
        },
        {
          name: 'Nenhum par multiplica até o alvo',
          stdin: '6\n13\n',
          expectedStdout: 'Nenhum',
        },
        {
          name: 'Encontra no primeiro par testado',
          stdin: '5\n1\n',
          expectedStdout: 'Encontrado: 1 x 1',
        },
        {
          name: 'Faixa mínima sem solução',
          stdin: '1\n2\n',
          expectedStdout: 'Nenhum',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c03l06',
    title: 'Variáveis de flag',
    objective: 'Registrar em um `bool` que algo aconteceu durante o laço, e reconhecer o valor inicial correto para cada tipo de pergunta.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma **flag** é um `bool` que responde a uma pergunta sobre o laço inteiro: "achou?", "tem algum inválido?", "todos passaram?". Ela é declarada antes, alterada dentro, e lida depois.',
      },
      {
        kind: 'text',
        body:
          'O valor inicial não é escolha de gosto — ele é a resposta correta para o caso de **nenhum dado**. E isso muda conforme a pergunta.',
      },
      {
        kind: 'table',
        headers: ['Pergunta', 'Início', 'Dentro do laço', 'Sem dados'],
        rows: [
          ['existe algum X?', '`false`', 'vira `true` ao achar', '`false`'],
          ['todos são X?', '`true`', 'vira `false` ao falhar', '`true`'],
        ],
      },
      {
        kind: 'code',
        code: `bool temNegativo = false;      // ate provar o contrario, nao tem
bool todosPares = true;        // ate provar o contrario, todos sao

for (int i = 0; i < n; i++)
{
    int v = int.Parse(Console.ReadLine());

    if (v < 0) temNegativo = true;
    if (v % 2 != 0) todosPares = false;
}`,
        caption: 'As duas flags começam em valores opostos porque perguntam coisas opostas.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '"Todos os elementos de um conjunto vazio são pares" é verdade — não existe contraexemplo. Isso se chama verdade vacuosa, e é por isso que a flag de "todos" começa em `true`. Parece estranho, mas é o único valor que mantém a lógica consistente.',
      },
      {
        kind: 'compare',
        good: `if (achou)
{
    Console.WriteLine("sim");
}`,
        bad: `if (achou == true)
{
    Console.WriteLine("sim");
}`,
        goodLabel: 'A flag já é a condição',
        badLabel: 'Comparação redundante',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Uma flag só deve mudar em **uma** direção dentro do laço. Se um `else` a devolve ao valor original, ela deixa de responder "aconteceu alguma vez?" e passa a responder "aconteceu na última volta?" — que quase nunca é a pergunta.',
      },
    ],
    quiz: [
      {
        id: 's02c03l06q1',
        type: 'single',
        prompt: 'Você quer saber se **algum** valor lido é maior que 100. Como inicializar a flag?',
        options: [
          { id: 'a', code: 'bool temGrande = false;', correct: true },
          { id: 'b', code: 'bool temGrande = true;' },
          { id: 'c', text: 'Com o primeiro valor lido.' },
          { id: 'd', text: 'Tanto faz: o laço define o valor.' },
        ],
        explanation:
          'Sem nenhum dado, a resposta correta para "existe algum" é `false`. A flag só sobe quando um contraexemplo aparece.',
      },
      {
        id: 's02c03l06q2',
        type: 'single',
        prompt: 'Qual é o problema deste laço, que deveria dizer se algum valor é negativo?',
        code: `bool temNegativo = false;
for (int i = 0; i < n; i++)
{
    int v = int.Parse(Console.ReadLine());
    if (v < 0) temNegativo = true;
    else temNegativo = false;
}`,
        options: [
          { id: 'a', text: 'O `else` apaga o resultado: a flag acaba refletindo só o último valor.', correct: true },
          { id: 'b', text: 'A flag deveria começar em `true`.' },
          { id: 'c', text: 'Falta um `break` depois de `temNegativo = true`.' },
          { id: 'd', text: 'Está correto.' },
        ],
        explanation:
          'Com a entrada `-5, 3`, a flag sobe e depois é derrubada, e o programa responde que não há negativo. Uma flag de "existe algum" nunca volta atrás.',
      },
      {
        id: 's02c03l06q3',
        type: 'single',
        prompt: 'Sem nenhum valor lido, o que uma flag `todosPositivos` deve responder?',
        options: [
          { id: 'a', code: 'true', correct: true },
          { id: 'b', code: 'false' },
          { id: 'c', text: 'O programa deveria avisar que a resposta é indefinida.' },
          { id: 'd', text: 'Depende de como o laço foi escrito.' },
        ],
        explanation:
          'Não existe nenhum valor que viole a regra, então a afirmação é verdadeira por vacuidade. É o mesmo raciocínio que faz uma soma vazia valer 0 e um produto vazio valer 1.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` valores. Responda a duas perguntas sobre o conjunto inteiro: todos os valores são positivos, e existe pelo menos um valor par?',
      requirements: [
        'Linha 1: `Todos positivos: True` ou `Todos positivos: False`',
        'Linha 2: `Tem par: True` ou `Tem par: False`',
        'O valor `0` não é positivo',
        'Um valor negativo par, como `-4`, conta como par',
        'Com `n` igual a 0, a resposta é `Todos positivos: True` e `Tem par: False`',
        'Leia todos os `n` valores: nenhuma resposta interrompe a leitura',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        bool todosPositivos = true;
        bool temPar = false;

        // Atualize cada flag na direcao certa, uma vez so

        Console.WriteLine($"Todos positivos: {todosPositivos}");
        Console.WriteLine($"Tem par: {temPar}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        bool todosPositivos = true;
        bool temPar = false;

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());

            if (valor <= 0)
            {
                todosPositivos = false;
            }

            if (valor % 2 == 0)
            {
                temPar = true;
            }
        }

        Console.WriteLine($"Todos positivos: {todosPositivos}");
        Console.WriteLine($"Tem par: {temPar}");
    }
}
`,
      hints: [
        'Cada flag muda em uma direção só. Nenhum `else` devolve o valor original.',
        'Os dois valores iniciais já vêm no `starterCode`, e eles são exatamente as respostas para o caso de zero valores.',
      ],
      tests: [
        {
          name: 'Positivos com um par',
          stdin: '4\n3\n5\n8\n1\n',
          expectedStdout: 'Todos positivos: True\nTem par: True',
        },
        {
          name: 'Todos ímpares',
          stdin: '3\n3\n5\n7\n',
          expectedStdout: 'Todos positivos: True\nTem par: False',
        },
        {
          name: 'Zero não é positivo',
          stdin: '2\n0\n3\n',
          expectedStdout: 'Todos positivos: False\nTem par: True',
        },
        {
          name: 'Conjunto vazio: verdade vacuosa',
          stdin: '0\n',
          expectedStdout: 'Todos positivos: True\nTem par: False',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c03l07',
    title: 'O padrão busca-e-para',
    objective: 'Implementar uma busca linear que encontra a primeira ocorrência, para de imediato e reporta a ausência corretamente.',
    concept: [
      {
        kind: 'text',
        body:
          'A busca linear é o algoritmo mais reaproveitado que existe: percorrer os dados até achar o que se procura. Ele tem três partes obrigatórias, e esquecer qualquer uma delas produz um bug característico.',
      },
      {
        kind: 'table',
        headers: ['Parte', 'Se faltar'],
        rows: [
          ['guardar onde achou', 'o programa sabe que achou, mas não onde'],
          ['parar ao achar', 'a resposta vira a **última** ocorrência, não a primeira'],
          ['valor para "não achou"', 'o programa reporta uma posição inventada'],
        ],
      },
      {
        kind: 'code',
        code: `int posicao = 0;              // 0 = nao encontrado

for (int i = 1; i <= n; i++)
{
    int valor = int.Parse(Console.ReadLine());

    if (valor == alvo)
    {
        posicao = i;
        break;                // sem isso, sobrescreve com a ultima
    }
}`,
        caption: 'Posições começam em 1 aqui, o que libera o 0 para significar ausência.',
      },
      {
        kind: 'text',
        body:
          'O valor que representa "não encontrado" precisa ser **impossível** como resposta legítima. Com posições em base 1, o `0` serve. Com posições em base 0, o convencional é `-1` — que é justamente o que `IndexOf` devolve.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Sem o `break`, cada ocorrência sobrescreve a anterior e o resultado é a **última** posição. O código continua compilando e passando em qualquer teste com uma ocorrência só — o bug só aparece quando há duas.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A busca que para cedo custa, em média, metade das comparações de uma busca completa. E quando o item não existe, ela custa exatamente o mesmo: percorre tudo. É por isso que o pior caso de uma busca linear é sempre o item ausente.',
      },
    ],
    quiz: [
      {
        id: 's02c03l07q1',
        type: 'single',
        prompt: 'Uma busca sem `break` sobre os valores 4, 9, 4, 7 procurando o 4 devolve qual posição?',
        options: [
          { id: 'a', text: 'A terceira: a última ocorrência sobrescreveu a primeira.', correct: true },
          { id: 'b', text: 'A primeira: o `break` é apenas uma otimização.' },
          { id: 'c', text: 'Zero: sem `break` a busca falha.' },
          { id: 'd', text: 'As duas posições, separadas por vírgula.' },
        ],
        explanation:
          'Cada ocorrência executa `posicao = i` de novo. Sem a parada, a variável guarda a última atribuição, não a primeira.',
      },
      {
        id: 's02c03l07q2',
        type: 'single',
        prompt: 'Por que `-1` é o valor tradicional para "não encontrado" em buscas por índice?',
        options: [
          { id: 'a', text: 'Porque nenhum índice válido é negativo, então não há ambiguidade.', correct: true },
          { id: 'b', text: 'Porque `-1` é mais rápido de comparar que `0`.' },
          { id: 'c', text: 'Porque o C# exige esse valor.' },
          { id: 'd', text: 'Porque `-1` representa o último elemento.' },
        ],
        explanation:
          'Com índices começando em 0, o próprio 0 é uma resposta legítima. `-1` é impossível como posição real, e por isso `IndexOf` e várias outras APIs o adotam.',
      },
      {
        id: 's02c03l07q3',
        type: 'single',
        prompt: 'Em qual situação a busca linear faz o número máximo de comparações?',
        options: [
          { id: 'a', text: 'Quando o item procurado não existe.', correct: true },
          { id: 'b', text: 'Quando o item está na primeira posição.' },
          { id: 'c', text: 'Quando o item aparece várias vezes.' },
          { id: 'd', text: 'Quando os dados estão ordenados.' },
        ],
        explanation:
          'A ausência é o único caso em que não há como parar cedo: é preciso examinar tudo para concluir que não está lá. O item na última posição empata com esse pior caso.',
      },
    ],
    challenge: {
      brief:
        'Leia um `alvo`, um inteiro `n`, e depois até `n` valores. Informe em que posição (contando de 1) o alvo aparece pela primeira vez, e quantas comparações foram necessárias. Pare de ler assim que encontrar.',
      requirements: [
        'Linha 1: `Posicao: p`, com `p` começando em 1',
        'Linha 2: `Comparacoes: c`',
        'Se o alvo não aparecer, `p` é `0` e `c` é igual a `n`',
        'A busca para na primeira ocorrência: uma segunda ocorrência não altera a resposta',
        'Cada valor examinado conta uma comparação, inclusive o que deu certo',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int alvo = int.Parse(Console.ReadLine());
        int n = int.Parse(Console.ReadLine());

        int posicao = 0;
        int comparacoes = 0;

        // Busque, conte e pare na primeira ocorrencia

        Console.WriteLine($"Posicao: {posicao}");
        Console.WriteLine($"Comparacoes: {comparacoes}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int alvo = int.Parse(Console.ReadLine());
        int n = int.Parse(Console.ReadLine());

        int posicao = 0;
        int comparacoes = 0;

        for (int i = 1; i <= n; i++)
        {
            int valor = int.Parse(Console.ReadLine());
            comparacoes++;

            if (valor == alvo)
            {
                posicao = i;
                break;
            }
        }

        Console.WriteLine($"Posicao: {posicao}");
        Console.WriteLine($"Comparacoes: {comparacoes}");
    }
}
`,
      hints: [
        'Comece o contador do `for` em 1: assim o próprio `i` já é a posição a reportar.',
        'Incremente `comparacoes` logo após ler o valor, antes do `if`. A comparação que deu certo também conta.',
      ],
      tests: [
        {
          name: 'Duas ocorrências, vale a primeira',
          stdin: '7\n5\n3\n9\n7\n4\n7\n',
          expectedStdout: 'Posicao: 3\nComparacoes: 3',
        },
        {
          name: 'Ausente: percorre tudo',
          stdin: '5\n3\n1\n2\n3\n',
          expectedStdout: 'Posicao: 0\nComparacoes: 3',
        },
        {
          name: 'Acerta na primeira comparação',
          stdin: '1\n1\n1\n',
          expectedStdout: 'Posicao: 1\nComparacoes: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c03l08',
    title: 'Custo de laços aninhados',
    objective: 'Estimar quanto trabalho um laço faz e perceber por que aninhar multiplica esse custo.',
    concept: [
      {
        kind: 'text',
        body:
          'Cada nível de aninhamento **multiplica** o trabalho. Um laço simples sobre `n` itens faz `n` operações; dois aninhados fazem `n × n`; três fazem `n × n × n`. A conta é simples, e as consequências são enormes.',
      },
      {
        kind: 'table',
        headers: ['`n`', 'Simples', 'Aninhado (`n²`)', 'Triplo (`n³`)'],
        rows: [
          ['`10`', '10', '100', '1.000'],
          ['`100`', '100', '10.000', '1.000.000'],
          ['`1.000`', '1.000', '1.000.000', '1.000.000.000'],
          ['`10.000`', '10.000', '100.000.000', 'inviável'],
        ],
      },
      {
        kind: 'text',
        body:
          'O que essa tabela mostra: dobrar a entrada de um laço simples dobra o tempo, mas dobra o tempo **quatro vezes** em um laço duplo. É a diferença entre um programa que aguenta crescer e outro que trava no primeiro dado real.',
      },
      {
        kind: 'code',
        code: `// Triangular: metade do trabalho do retangular
int operacoes = 0;

for (int i = 1; i <= n; i++)
{
    for (int j = 1; j <= i; j++)
    {
        operacoes++;
    }
}
// n = 100  ->  5.050 em vez de 10.000`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A forma triangular economiza quase metade, mas continua crescendo ao quadrado: `5.050` para `n = 100` vira `500.500` para `n = 1.000`. Cortar pela metade um crescimento quadrático não o transforma em linear — só adia o problema.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um laço aninhado escondido é fácil de criar sem perceber. Uma busca dentro de um laço é um laço duplo, mesmo que o segundo `for` esteja em outro lugar do código. Conte os laços que rodam por item, não os que aparecem juntos na tela.',
      },
      {
        kind: 'text',
        body:
          'Este é o primeiro contato com o assunto que a Seção 7 trata a fundo. Por enquanto basta o reflexo: ao ver dois laços aninhados sobre a mesma entrada, pensar "isso é quadrático" e perguntar se dá para evitar.',
      },
    ],
    quiz: [
      {
        id: 's02c03l08q1',
        type: 'single',
        prompt: 'Um laço duplo sobre `n = 1.000` faz quantas operações?',
        options: [
          { id: 'a', text: 'Um milhão.', correct: true },
          { id: 'b', text: 'Duas mil.' },
          { id: 'c', text: 'Mil.' },
          { id: 'd', text: 'Um bilhão.' },
        ],
        explanation:
          '`1.000 × 1.000 = 1.000.000`. Aninhar multiplica; não soma. Essa confusão é a origem de muitas estimativas de desempenho erradas por ordens de grandeza.',
      },
      {
        id: 's02c03l08q2',
        type: 'single',
        prompt: 'Se `n` dobra, o tempo de um laço duplo aumenta quantas vezes?',
        options: [
          { id: 'a', code: '4', correct: true },
          { id: 'b', code: '2' },
          { id: 'c', code: '8' },
          { id: 'd', text: 'Não muda.' },
        ],
        explanation:
          'O custo é proporcional a `n²`, então dobrar `n` multiplica o custo por `2² = 4`. Num laço triplo o fator seria 8.',
      },
      {
        id: 's02c03l08q3',
        type: 'single',
        prompt: 'A forma triangular resolve o problema de custo do laço duplo?',
        options: [
          { id: 'a', text: 'Não: ela corta o trabalho quase pela metade, mas o crescimento continua quadrático.', correct: true },
          { id: 'b', text: 'Sim: ela torna o laço linear.' },
          { id: 'c', text: 'Sim, desde que `n` seja menor que 1.000.' },
          { id: 'd', text: 'Não: ela na verdade aumenta o custo.' },
        ],
        explanation:
          '`n(n + 1) / 2` continua dominado pelo termo `n²`. Uma constante dividindo não muda a forma da curva, só a desloca.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e conte, executando os laços de verdade, quantas voltas cada uma das três formas dá: um laço simples de 1 a `n`, um laço duplo de `n` por `n`, e um laço triangular em que o interno vai só até `i`.',
      requirements: [
        'Linha 1: `Simples: X`',
        'Linha 2: `Aninhado: Y`',
        'Linha 3: `Triangular: Z`',
        'Conte com contadores dentro dos laços; não use as fórmulas',
        'Para `n` igual a 0 as três contagens são `0`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int simples = 0;
        int aninhado = 0;
        int triangular = 0;

        // Tres lacos, tres contadores

        Console.WriteLine($"Simples: {simples}");
        Console.WriteLine($"Aninhado: {aninhado}");
        Console.WriteLine($"Triangular: {triangular}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int simples = 0;
        int aninhado = 0;
        int triangular = 0;

        for (int i = 1; i <= n; i++)
        {
            simples++;
        }

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                aninhado++;
            }
        }

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= i; j++)
            {
                triangular++;
            }
        }

        Console.WriteLine($"Simples: {simples}");
        Console.WriteLine($"Aninhado: {aninhado}");
        Console.WriteLine($"Triangular: {triangular}");
    }
}
`,
      hints: [
        'São três laços independentes, cada um com o seu contador. Não tente combiná-los.',
        'A única diferença entre o aninhado e o triangular é o limite do laço interno: `n` contra `i`.',
      ],
      tests: [
        {
          name: 'Entrada pequena',
          stdin: '5\n',
          expectedStdout: 'Simples: 5\nAninhado: 25\nTriangular: 15',
        },
        {
          name: 'Cem itens: a diferença fica visível',
          stdin: '100\n',
          expectedStdout: 'Simples: 100\nAninhado: 10000\nTriangular: 5050',
        },
        {
          name: 'Um item: as três formas empatam',
          stdin: '1\n',
          expectedStdout: 'Simples: 1\nAninhado: 1\nTriangular: 1',
        },
        {
          name: 'Entrada vazia',
          stdin: '0\n',
          expectedStdout: 'Simples: 0\nAninhado: 0\nTriangular: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c03l09',
    title: 'Prática: primeira ocorrência',
    objective: 'Percorrer uma string caractere a caractere para localizar a primeira e a última ocorrência de um símbolo.',
    concept: [
      {
        kind: 'text',
        body:
          'Você já sabe que `IndexOf` encontra a primeira ocorrência de um caractere. Esta prática pede a mesma coisa **na mão**, porque o laço que você vai escrever aqui é o mesmo que resolve dezenas de problemas em que não existe um método pronto.',
      },
      {
        kind: 'code',
        code: `string texto = "banana";

for (int i = 0; i < texto.Length; i++)
{
    Console.WriteLine($"{i}: {texto[i]}");
}`,
        caption: 'O indexador `texto[i]` devolve um `char`, e a faixa válida vai de 0 a `Length - 1`.',
      },
      {
        kind: 'text',
        body:
          'A primeira e a última ocorrência podem sair do mesmo laço, sem `break` nenhum, com uma pequena assimetria: a primeira só é registrada **se ainda não houver uma**, enquanto a última é sobrescrita sempre.',
      },
      {
        kind: 'code',
        code: `int primeira = -1;
int ultima = -1;

for (int i = 0; i < texto.Length; i++)
{
    if (texto[i] == alvo)
    {
        if (primeira == -1) primeira = i;   // so a primeira vez
        ultima = i;                         // toda vez
    }
}`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A guarda `if (primeira == -1)` faz o papel que o `break` faria em uma busca simples: garante que a primeira atribuição seja a definitiva. A diferença é que aqui o laço precisa continuar, porque ainda falta descobrir a última.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`texto[texto.Length]` sempre estoura, porque o último índice válido é `Length - 1`. Numa string de 6 caracteres os índices vão de 0 a 5. A condição do laço tem que ser `<` e nunca `<=`.',
      },
    ],
    quiz: [
      {
        id: 's02c03l09q1',
        type: 'single',
        prompt: 'Em `"programacao"`, em que índice está o primeiro `a`?',
        options: [
          { id: 'a', code: '5', correct: true },
          { id: 'b', code: '6' },
          { id: 'c', code: '4' },
          { id: 'd', code: '1' },
        ],
        explanation:
          'Contando de zero: `p`(0) `r`(1) `o`(2) `g`(3) `r`(4) `a`(5). Contar a partir de 1 é o erro clássico aqui, e daria 6.',
      },
      {
        id: 's02c03l09q2',
        type: 'single',
        prompt: 'Por que a última ocorrência não precisa de guarda, mas a primeira precisa?',
        options: [
          { id: 'a', text: 'Sobrescrever sempre deixa a última; a primeira precisa ser protegida da sobrescrita.', correct: true },
          { id: 'b', text: 'Porque a última é calculada de trás para frente.' },
          { id: 'c', text: 'Porque `ultima` é sempre maior que `primeira`.' },
          { id: 'd', text: 'As duas precisam de guarda; o exemplo está errado.' },
        ],
        explanation:
          'É a mesma assimetria da busca com `break`: quem quer o primeiro precisa parar de atribuir, quem quer o último precisa continuar atribuindo.',
      },
      {
        id: 's02c03l09q3',
        type: 'single',
        prompt: 'Qual é o maior índice válido de uma string com 6 caracteres?',
        options: [
          { id: 'a', code: '5', correct: true },
          { id: 'b', code: '6' },
          { id: 'c', code: '7' },
          { id: 'd', text: 'Depende do conteúdo.' },
        ],
        explanation:
          'Índices vão de 0 a `Length - 1`. Usar `Length` como índice lança `IndexOutOfRangeException`, e é o erro mais comum ao percorrer texto na mão.',
      },
    ],
    challenge: {
      brief:
        'Leia uma linha de texto e, na linha seguinte, um único caractere. Informe o índice da primeira e da última ocorrência desse caractere no texto, e quantas vezes ele aparece.',
      requirements: [
        'Linha 1: `Primeira: i`, com o índice contando de 0',
        'Linha 2: `Ultima: j`',
        'Linha 3: `Ocorrencias: k`',
        'Se o caractere não aparecer, os dois índices são `-1` e a contagem é `0`',
        'A comparação diferencia maiúsculas de minúsculas',
        'Percorra o texto com um `for`; não use `IndexOf` nem `LastIndexOf`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        string texto = Console.ReadLine();
        char alvo = Console.ReadLine()[0];

        int primeira = -1;
        int ultima = -1;
        int ocorrencias = 0;

        // Percorra o texto uma vez so

        Console.WriteLine($"Primeira: {primeira}");
        Console.WriteLine($"Ultima: {ultima}");
        Console.WriteLine($"Ocorrencias: {ocorrencias}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        string texto = Console.ReadLine();
        char alvo = Console.ReadLine()[0];

        int primeira = -1;
        int ultima = -1;
        int ocorrencias = 0;

        for (int i = 0; i < texto.Length; i++)
        {
            if (texto[i] == alvo)
            {
                if (primeira == -1)
                {
                    primeira = i;
                }

                ultima = i;
                ocorrencias++;
            }
        }

        Console.WriteLine($"Primeira: {primeira}");
        Console.WriteLine($"Ultima: {ultima}");
        Console.WriteLine($"Ocorrencias: {ocorrencias}");
    }
}
`,
      hints: [
        'Um único laço resolve os três resultados. Não escreva três laços separados.',
        'A guarda `if (primeira == -1)` é o que impede a primeira posição de ser sobrescrita.',
      ],
      tests: [
        {
          name: 'Três ocorrências espalhadas',
          stdin: 'programacao\na\n',
          expectedStdout: 'Primeira: 5\nUltima: 9\nOcorrencias: 3',
        },
        {
          name: 'Caractere ausente',
          stdin: 'banana\nz\n',
          expectedStdout: 'Primeira: -1\nUltima: -1\nOcorrencias: 0',
        },
        {
          name: 'Uma ocorrência só, no começo',
          stdin: 'abc\na\n',
          expectedStdout: 'Primeira: 0\nUltima: 0\nOcorrencias: 1',
        },
        {
          name: 'Todas as posições batem',
          stdin: 'aaa\na\n',
          expectedStdout: 'Primeira: 0\nUltima: 2\nOcorrencias: 3',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's02c03l10',
    title: 'Checkpoint: controlando o fluxo',
    objective: 'Combinar `break`, `continue`, flags e busca em um processador de lote com regras de descarte e de parada.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint monta um processador de pedidos em que as três instruções de controle aparecem no mesmo laço, cada uma com um papel distinto — e a ordem em que elas são testadas muda o resultado.',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Instrução', 'Efeito'],
        rows: [
          ['código de parada', '`break`', 'encerra o lote'],
          ['quantidade inválida', '`continue`', 'descarta só este pedido'],
          ['primeiro pedido grande', 'guarda + guarda-condição', 'registra uma vez só'],
          ['parada aconteceu?', 'flag', 'informa no relatório'],
        ],
      },
      {
        kind: 'text',
        body:
          'A ordem dos testes é parte da especificação, não detalhe de implementação. O código de parada é verificado **antes** da quantidade, então um pedido de parada encerra o lote mesmo que sua quantidade fosse inválida.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O registro do primeiro pedido grande precisa de uma guarda, exatamente como na prática anterior. Sem ela, cada novo pedido grande sobrescreve o anterior e o relatório informa o **último** — um bug que só aparece quando o lote tem dois.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Comece pelo laço que só lê e conta. Depois acrescente o `continue`, depois o `break`, depois a busca. Quatro regras de uma vez em um laço só é a receita para um erro que você não consegue localizar.',
      },
    ],
    quiz: [
      {
        id: 's02c03l10q1',
        type: 'single',
        prompt: 'Um pedido tem código de parada **e** quantidade inválida. O que deve acontecer, se a parada é testada primeiro?',
        options: [
          { id: 'a', text: 'O lote encerra, e o pedido não é contado como descartado.', correct: true },
          { id: 'b', text: 'O pedido é descartado e o lote continua.' },
          { id: 'c', text: 'O pedido é contado nas duas estatísticas.' },
          { id: 'd', text: 'O programa deve reportar erro.' },
        ],
        explanation:
          'A primeira regra que casa é a que vale. Por isso a ordem dos testes precisa estar no enunciado: ela é observável no resultado.',
      },
      {
        id: 's02c03l10q2',
        type: 'single',
        prompt: 'Qual instrução mantém o laço vivo mas descarta o item atual?',
        options: [
          { id: 'a', code: 'continue', correct: true },
          { id: 'b', code: 'break' },
          { id: 'c', code: 'return' },
          { id: 'd', text: 'Um `if` vazio.' },
        ],
        explanation:
          '`continue` abandona apenas a volta corrente. `break` encerraria o lote inteiro e `return` encerraria o programa antes do relatório.',
      },
      {
        id: 's02c03l10q3',
        type: 'single',
        prompt: 'Por que a flag de parada é necessária, se o `break` já encerrou o laço?',
        options: [
          { id: 'a', text: 'Porque depois do laço não há como saber se ele terminou naturalmente ou foi interrompido.', correct: true },
          { id: 'b', text: 'Porque o `break` não funciona sem uma flag.' },
          { id: 'c', text: 'Porque a flag acelera a saída do laço.' },
          { id: 'd', text: 'Ela não é necessária: dá para inferir pela quantidade total.' },
        ],
        explanation:
          'O `break` não deixa rastro. Aqui o contador do `for` não serve como pista, porque o `continue` também faz o laço avançar sem processar — então a flag é a única informação confiável.',
      },
    ],
    challenge: {
      brief:
        'Processe um lote de pedidos. Leia um inteiro `n` e depois até `n` pedidos, cada um em duas linhas: o código e a quantidade. O código `PARAR` encerra o lote imediatamente e não é um pedido (sua linha de quantidade nem chega a ser lida). Pedidos com quantidade menor ou igual a zero são descartados. Gere o relatório do lote.',
      requirements: [
        'Linha 1: `Processados: p`',
        'Linha 2: `Ignorados: d`',
        'Linha 3: `Quantidade total: t`',
        'Linha 4: `Primeiro grande: C3`, com o código do primeiro pedido de quantidade 100 ou mais, ou `nenhum`',
        'Linha 5: `Parou cedo: True` ou `Parou cedo: False`',
        'O código `PARAR` é verificado antes da quantidade, e não conta como processado nem como ignorado',
        '"100 ou mais" inclui o valor 100',
        'Só o **primeiro** pedido grande é registrado',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int processados = 0;
        int ignorados = 0;
        int total = 0;
        string primeiroGrande = "nenhum";
        bool parou = false;

        // Le o codigo, depois a quantidade. PARAR encerra o lote.

        Console.WriteLine($"Processados: {processados}");
        Console.WriteLine($"Ignorados: {ignorados}");
        Console.WriteLine($"Quantidade total: {total}");
        Console.WriteLine($"Primeiro grande: {primeiroGrande}");
        Console.WriteLine($"Parou cedo: {parou}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int processados = 0;
        int ignorados = 0;
        int total = 0;
        string primeiroGrande = "nenhum";
        bool parou = false;

        for (int i = 0; i < n; i++)
        {
            string codigo = Console.ReadLine();

            if (codigo == "PARAR")
            {
                parou = true;
                break;
            }

            int quantidade = int.Parse(Console.ReadLine());

            if (quantidade <= 0)
            {
                ignorados++;
                continue;
            }

            processados++;
            total += quantidade;

            if (quantidade >= 100 && primeiroGrande == "nenhum")
            {
                primeiroGrande = codigo;
            }
        }

        Console.WriteLine($"Processados: {processados}");
        Console.WriteLine($"Ignorados: {ignorados}");
        Console.WriteLine($"Quantidade total: {total}");
        Console.WriteLine($"Primeiro grande: {primeiroGrande}");
        Console.WriteLine($"Parou cedo: {parou}");
    }
}
`,
      hints: [
        'Leia o código, teste o `PARAR`, e só então leia a quantidade. Ler as duas linhas de uma vez faz o lote consumir uma linha a mais do que deveria.',
        'A condição `primeiroGrande == "nenhum"` é a guarda que impede o segundo pedido grande de sobrescrever o primeiro.',
      ],
      tests: [
        {
          name: 'Lote com descarte, destaque e parada',
          stdin: '6\nA1\n5\nB2\n0\nC3\n120\nPARAR\nD4\n7\nE5\n9\n',
          expectedStdout:
            'Processados: 2\nIgnorados: 1\nQuantidade total: 125\nPrimeiro grande: C3\nParou cedo: True',
        },
        {
          name: 'Lote completo sem nada de especial',
          stdin: '3\nA\n10\nB\n20\nC\n30\n',
          expectedStdout:
            'Processados: 3\nIgnorados: 0\nQuantidade total: 60\nPrimeiro grande: nenhum\nParou cedo: False',
        },
        {
          name: 'Dois pedidos grandes: vale o primeiro',
          stdin: '2\nX\n100\nY\n100\n',
          expectedStdout:
            'Processados: 2\nIgnorados: 0\nQuantidade total: 200\nPrimeiro grande: X\nParou cedo: False',
        },
        {
          name: 'Negativo e zero são ambos descartados',
          stdin: '4\nA\n-5\nB\n0\nC\n50\nD\n60\n',
          expectedStdout:
            'Processados: 2\nIgnorados: 2\nQuantidade total: 110\nPrimeiro grande: nenhum\nParou cedo: False',
        },
        {
          name: 'Parada no primeiro pedido',
          stdin: '1\nPARAR\n',
          expectedStdout:
            'Processados: 0\nIgnorados: 0\nQuantidade total: 0\nPrimeiro grande: nenhum\nParou cedo: True',
          hidden: true,
        },
      ],
    },
  },
]
