import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's01c01l01',
    title: 'C# e .NET: o que é o quê',
    objective:
      'Entender a diferença entre a linguagem C#, o SDK e o runtime .NET, e o que acontece quando você roda um programa.',
    concept: [
      {
        kind: 'text',
        body:
          '**C#** é a linguagem: as palavras e as regras que você escreve. **.NET** é a plataforma que executa o resultado. Os dois são coisas separadas, e confundir isso atrasa muito o aprendizado.',
      },
      {
        kind: 'table',
        headers: ['Peça', 'Papel'],
        rows: [
          ['C#', 'A linguagem em que você escreve. Só texto.'],
          ['Compilador (Roslyn)', 'Traduz seu texto em instruções intermediárias (IL).'],
          ['Runtime (CLR)', 'Executa a IL, cuida da memória e do coletor de lixo.'],
          ['SDK', 'O kit completo: compilador, runtime e a ferramenta `dotnet`.'],
        ],
      },
      {
        kind: 'text',
        body:
          'O caminho é sempre o mesmo: você escreve `Program.cs`, o compilador transforma em IL, e o runtime executa. Se o compilador reclamar, nada roda — o erro aparece antes do programa existir.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Por isso C# tem tantos erros _antes_ de rodar. Isso não é chatice: é o compilador te avisando de bugs enquanto ainda é barato consertar.',
      },
    ],
    quiz: [
      {
        id: 's01c01l01q1',
        type: 'single',
        prompt: 'Qual das afirmações descreve corretamente a relação entre C# e .NET?',
        options: [
          { id: 'a', text: 'C# é a linguagem e .NET é a plataforma que compila e executa o código.', correct: true },
          { id: 'b', text: 'C# e .NET são dois nomes para a mesma coisa.' },
          { id: 'c', text: '.NET é a linguagem e C# é o editor de código.' },
          { id: 'd', text: 'C# só funciona no Windows porque .NET é exclusivo da Microsoft.' },
        ],
        explanation:
          'C# é a linguagem, .NET é a plataforma (compilador, runtime e bibliotecas). E .NET roda em Windows, Linux e macOS.',
      },
      {
        id: 's01c01l01q2',
        type: 'single',
        prompt: 'Se o compilador encontra um erro no seu código, o que acontece?',
        options: [
          { id: 'a', text: 'O programa roda até a linha do erro e depois para.' },
          { id: 'b', text: 'Nada é executado: o programa não chega nem a existir.', correct: true },
          { id: 'c', text: 'O erro é ignorado e o programa roda normalmente.' },
          { id: 'd', text: 'O runtime corrige o erro automaticamente.' },
        ],
        explanation:
          'Erro de compilação impede a geração do programa. Diferente de um erro em tempo de execução, que só aparece quando aquela linha é alcançada.',
      },
      {
        id: 's01c01l01q3',
        type: 'single',
        prompt: 'Qual comando do SDK cria e executa um projeto de console?',
        options: [
          { id: 'a', code: 'csharp build Program.cs' },
          { id: 'b', code: 'dotnet new console\ndotnet run', correct: true },
          { id: 'c', code: 'net compile --run' },
          { id: 'd', code: 'dotnet exec Program.cs' },
        ],
        explanation:
          '`dotnet new console` cria o projeto e `dotnet run` compila e executa em um passo. São os dois comandos que você vai digitar mais vezes na vida.',
      },
    ],
    challenge: {
      brief:
        'Todo programador começa do mesmo lugar. Escreva um programa que imprima exatamente a linha abaixo, sem nada a mais.',
      requirements: ['A saída precisa ser exatamente `Ola, C#!`'],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Escreva seu codigo aqui
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Ola, C#!");
    }
}
`,
      hints: [
        'Use `Console.WriteLine` com o texto entre aspas duplas.',
        'Cuidado com a vírgula e com o ponto de exclamação: a comparação é exata.',
      ],
      tests: [{ name: 'Imprime a saudação', expectedStdout: 'Ola, C#!' }],
    },
  },
  {
    id: 's01c01l02',
    title: 'Anatomia de um programa',
    objective: 'Reconhecer cada parte de um programa de console e saber onde seu código entra.',
    concept: [
      {
        kind: 'text',
        body:
          'Todo programa de console tem a mesma estrutura básica. Vale decorar as quatro camadas, porque elas se repetem em 100% do código que você vai escrever.',
      },
      {
        kind: 'code',
        code: `using System;          // 1. quais bibliotecas eu quero usar

class Program           // 2. um tipo, que agrupa o codigo
{
    static void Main()  // 3. o ponto de entrada: onde a execucao comeca
    {
        Console.WriteLine("Ola!");  // 4. instrucoes, executadas de cima para baixo
    }
}`,
      },
      {
        kind: 'table',
        headers: ['Parte', 'Para que serve'],
        rows: [
          ['`using System;`', 'Dá acesso a tipos como `Console` sem escrever o nome completo.'],
          ['`class Program`', 'Uma caixa que agrupa código. Todo código em C# vive dentro de um tipo.'],
          ['`static void Main()`', 'O método que o runtime chama primeiro. Sem ele, nada roda.'],
          ['Corpo do `Main`', 'Suas instruções, executadas em ordem, de cima para baixo.'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'O nome `Main` é obrigatório e sensível a maiúsculas. `main` minúsculo não é ponto de entrada, e o compilador vai dizer que não encontrou um.',
      },
    ],
    quiz: [
      {
        id: 's01c01l02q1',
        type: 'single',
        prompt: 'Qual parte do programa o runtime executa primeiro?',
        options: [
          { id: 'a', text: 'A linha `using System;`' },
          { id: 'b', text: 'A declaração `class Program`' },
          { id: 'c', text: 'O método `Main`', correct: true },
          { id: 'd', text: 'A última linha do arquivo' },
        ],
        explanation:
          '`using` e `class` são declarações, não instruções executáveis. A execução sempre começa no `Main`.',
      },
      {
        id: 's01c01l02q2',
        type: 'single',
        prompt: 'O que este programa imprime?',
        code: `class Program
{
    static void Main()
    {
        Console.WriteLine("A");
        Console.WriteLine("B");
    }
}`,
        options: [
          { id: 'a', code: 'A\nB', correct: true },
          { id: 'b', code: 'B\nA' },
          { id: 'c', code: 'AB' },
          { id: 'd', text: 'Nada, porque falta `using System;`' },
        ],
        explanation:
          'As instruções rodam de cima para baixo, e cada `WriteLine` termina a linha. O `using System;` é opcional em projetos modernos porque o SDK já inclui os usings mais comuns.',
      },
      {
        id: 's01c01l02q3',
        type: 'single',
        prompt: 'Por que este código não compila?',
        code: `class Program
{
    Console.WriteLine("Ola!");
}`,
        options: [
          { id: 'a', text: 'Falta ponto e vírgula.' },
          { id: 'b', text: 'A instrução está solta na classe, fora de qualquer método.', correct: true },
          { id: 'c', text: 'O texto precisa estar entre aspas simples.' },
          { id: 'd', text: '`Console` só funciona dentro de um `if`.' },
        ],
        explanation:
          'Instruções executáveis precisam morar dentro de um método. Direto no corpo da classe só podem existir declarações, como campos e métodos.',
      },
    ],
    challenge: {
      brief:
        'O programa abaixo está com a estrutura quebrada. Reorganize para que ele compile e imprima as três linhas, na ordem.',
      requirements: [
        'A saída deve ser `Nome`, `Idade` e `Cidade`, cada uma em sua própria linha',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Imprima Nome, Idade e Cidade, um por linha
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Nome");
        Console.WriteLine("Idade");
        Console.WriteLine("Cidade");
    }
}
`,
      hints: [
        'Cada `Console.WriteLine` já pula a linha por conta própria.',
        'A ordem das instruções é a ordem da saída.',
      ],
      tests: [{ name: 'Três linhas na ordem', expectedStdout: 'Nome\nIdade\nCidade' }],
    },
  },
  {
    id: 's01c01l03',
    title: 'Escrevendo na tela com Console.WriteLine',
    objective: 'Imprimir textos, números e expressões no console e entender o que pode ir dentro dos parênteses.',
    concept: [
      {
        kind: 'text',
        body:
          '`Console.WriteLine` recebe um valor, converte em texto e imprime seguido de uma quebra de linha. O valor pode ser um texto literal, um número, ou o resultado de uma conta.',
      },
      {
        kind: 'code',
        code: `Console.WriteLine("Texto entre aspas");
Console.WriteLine(42);
Console.WriteLine(2 + 3);
Console.WriteLine(true);
Console.WriteLine();          // linha em branco`,
      },
      {
        kind: 'output',
        code: `Texto entre aspas
42
5
True`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Repare em `2 + 3`: sem aspas, C# calcula e imprime `5`. Com aspas, `"2 + 3"` é só texto e sai exatamente assim. Aspas mudam completamente o significado.',
      },
    ],
    quiz: [
      {
        id: 's01c01l03q1',
        type: 'single',
        prompt: 'O que aparece na tela?',
        code: 'Console.WriteLine("10 + 5");',
        options: [
          { id: 'a', code: '15' },
          { id: 'b', code: '10 + 5', correct: true },
          { id: 'c', text: 'Erro de compilação' },
          { id: 'd', code: '"10 + 5"' },
        ],
        explanation:
          'O que está entre aspas é tratado como texto puro. C# não calcula nada dentro de uma string literal.',
      },
      {
        id: 's01c01l03q2',
        type: 'single',
        prompt: 'Qual chamada imprime o número 7?',
        options: [
          { id: 'a', code: 'Console.WriteLine(3 + 4);', correct: true },
          { id: 'b', code: 'Console.WriteLine("3 + 4");' },
          { id: 'c', code: 'Console.WriteLine(3, 4);' },
          { id: 'd', code: 'Console.WriteLine 7;' },
        ],
        explanation:
          '`3 + 4` é uma expressão: C# avalia primeiro e imprime o resultado. A opção com aspas imprime o texto, e a última não tem parênteses.',
      },
      {
        id: 's01c01l03q3',
        type: 'single',
        prompt: 'Quantas linhas este código produz?',
        code: `Console.WriteLine("A");
Console.WriteLine();
Console.WriteLine("B");`,
        options: [
          { id: 'a', text: 'Duas' },
          { id: 'b', text: 'Três, sendo a do meio em branco', correct: true },
          { id: 'c', text: 'Uma só' },
          { id: 'd', text: 'Erro: `WriteLine` sempre precisa de um argumento' },
        ],
        explanation:
          '`Console.WriteLine()` sem argumento é válido e serve exatamente para imprimir uma linha vazia.',
      },
    ],
    challenge: {
      brief:
        'Monte um recibo simples. Você precisa imprimir o cabeçalho, uma linha em branco, e o total já calculado a partir de uma expressão.',
      requirements: [
        'Primeira linha: `RECIBO`',
        'Segunda linha: vazia',
        'Terceira linha: o resultado de `120 + 45 + 35` (não escreva o número final na mão)',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Cabecalho, linha em branco, e o total calculado
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("RECIBO");
        Console.WriteLine();
        Console.WriteLine(120 + 45 + 35);
    }
}
`,
      hints: [
        '`Console.WriteLine()` sem argumento imprime a linha vazia.',
        'Passe a expressão `120 + 45 + 35` sem aspas para que C# some.',
      ],
      tests: [{ name: 'Recibo com total calculado', expectedStdout: 'RECIBO\n\n200' }],
    },
  },
  {
    id: 's01c01l04',
    title: 'Comentários e código legível',
    objective: 'Usar comentários para explicar intenção, e reconhecer quando um comentário é ruído.',
    concept: [
      {
        kind: 'text',
        body:
          'Comentários são texto que o compilador ignora. Existem para o próximo ser humano que ler o código — que na maioria das vezes é você, três meses depois.',
      },
      {
        kind: 'code',
        code: `// comentario de uma linha

/* comentario
   de varias linhas */

Console.WriteLine("Rodo normalmente"); // pode vir depois de codigo`,
      },
      {
        kind: 'compare',
        goodLabel: 'Explica o porquê',
        badLabel: 'Repete o código',
        good: `// A taxa e cobrada em dobro no primeiro mes por exigencia do contrato
decimal taxa = valorBase * 2;`,
        bad: `// multiplica valorBase por 2
decimal taxa = valorBase * 2;`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A regra prática: o código já diz **o que** acontece. Um bom comentário diz **por que** acontece. Se você sentir a necessidade de explicar o que a linha faz, muitas vezes o problema é o nome da variável, não a falta de comentário.',
      },
    ],
    quiz: [
      {
        id: 's01c01l04q1',
        type: 'single',
        prompt: 'O que este programa imprime?',
        code: `Console.WriteLine("um");
// Console.WriteLine("dois");
Console.WriteLine("tres");`,
        options: [
          { id: 'a', code: 'um\ntres', correct: true },
          { id: 'b', code: 'um\ndois\ntres' },
          { id: 'c', code: 'um' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          'A segunda linha está comentada, então o compilador a ignora por completo. Comentar código é a forma mais rápida de desativar algo temporariamente.',
      },
      {
        id: 's01c01l04q2',
        type: 'single',
        prompt: 'Qual comentário agrega mais valor?',
        options: [
          {
            id: 'a',
            code: '// Arredonda para cima porque o cliente cobra fracao de hora como hora cheia\nint horas = (int)Math.Ceiling(minutos / 60.0);',
            correct: true,
          },
          { id: 'b', code: '// declara a variavel horas\nint horas = 0;' },
          { id: 'c', code: '// fim do metodo\n}' },
          { id: 'd', code: '// soma\ntotal = a + b;' },
        ],
        explanation:
          'O primeiro explica uma regra de negócio que o código não pode expressar sozinho. Os outros apenas narram o que já está visível.',
      },
      {
        id: 's01c01l04q3',
        type: 'multiple',
        prompt: 'Quais afirmações sobre comentários em C# são verdadeiras?',
        options: [
          { id: 'a', text: 'Comentários não afetam o programa compilado.', correct: true },
          { id: 'b', text: '`/* */` pode ocupar várias linhas.', correct: true },
          { id: 'c', text: 'Comentários deixam o programa mais lento.' },
          { id: 'd', text: 'Um comentário pode vir na mesma linha, depois do código.', correct: true },
        ],
        explanation:
          'O compilador descarta comentários, então não existe custo em tempo de execução. E sim, `//` no fim da linha e `/* */` multilinha são ambos válidos.',
      },
    ],
    challenge: {
      brief:
        'O programa abaixo tem uma linha desativada por comentário e uma instrução faltando. Faça a saída ficar exatamente com as três etapas, na ordem.',
      requirements: ['A saída deve ser `Passo 1`, `Passo 2` e `Passo 3`, cada um em uma linha'],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Passo 1");
        // Console.WriteLine("Passo 2");
        Console.WriteLine("Passo 3");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Passo 1");
        Console.WriteLine("Passo 2");
        Console.WriteLine("Passo 3");
    }
}
`,
      hints: ['Basta remover as duas barras do começo da linha comentada.'],
      tests: [{ name: 'Três passos', expectedStdout: 'Passo 1\nPasso 2\nPasso 3' }],
    },
  },
  {
    id: 's01c01l05',
    title: 'Blocos, chaves e ponto e vírgula',
    objective: 'Entender a pontuação da linguagem: onde vai ponto e vírgula, onde vão chaves, e por que a indentação importa.',
    concept: [
      {
        kind: 'text',
        body:
          'C# usa duas marcas de pontuação para estruturar tudo: o **ponto e vírgula** termina uma instrução, e as **chaves** agrupam instruções em um bloco.',
      },
      {
        kind: 'code',
        code: `class Program              // abre um bloco de tipo
{
    static void Main()     // abre um bloco de metodo
    {
        int idade = 30;    // instrucao: termina com ;
        Console.WriteLine(idade);
    }                      // fecha o bloco do metodo
}                          // fecha o bloco do tipo`,
      },
      {
        kind: 'table',
        headers: ['Termina com `;`', 'Termina com `}`'],
        rows: [
          ['Declaração de variável', 'Corpo de classe'],
          ['Chamada de método', 'Corpo de método'],
          ['Atribuição', 'Corpo de `if`, `for`, `while`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A indentação **não** muda o significado do código em C# (diferente de Python). Mas código mal indentado esconde bugs de blocos, então trate a indentação como obrigatória mesmo que o compilador não reclame.',
      },
    ],
    quiz: [
      {
        id: 's01c01l05q1',
        type: 'single',
        prompt: 'Onde está o erro?',
        code: `class Program
{
    static void Main()
    {
        Console.WriteLine("Ola")
    }
}`,
        options: [
          { id: 'a', text: 'Falta o ponto e vírgula depois de `WriteLine("Ola")`.', correct: true },
          { id: 'b', text: 'Falta uma chave de fechamento.' },
          { id: 'c', text: 'O texto deveria estar em aspas simples.' },
          { id: 'd', text: 'Não há erro.' },
        ],
        explanation:
          'Toda instrução precisa terminar com `;`. Esse é de longe o erro de compilação mais comum de quem está começando.',
      },
      {
        id: 's01c01l05q2',
        type: 'single',
        prompt: 'Quantas chaves de fechamento faltam neste código?',
        code: `class Program
{
    static void Main()
    {
        Console.WriteLine("A");`,
        options: [
          { id: 'a', text: 'Uma' },
          { id: 'b', text: 'Duas', correct: true },
          { id: 'c', text: 'Três' },
          { id: 'd', text: 'Nenhuma' },
        ],
        explanation:
          'Dois blocos foram abertos: o da classe e o do método. Cada `{` precisa do seu `}`.',
      },
      {
        id: 's01c01l05q3',
        type: 'single',
        prompt: 'Este código compila?',
        code: `class Program { static void Main() { Console.WriteLine("Ola"); } }`,
        options: [
          { id: 'a', text: 'Sim, a indentação é só para leitura humana.', correct: true },
          { id: 'b', text: 'Não, cada bloco precisa estar em sua própria linha.' },
          { id: 'c', text: 'Não, falta a linha `using System;`.' },
          { id: 'd', text: 'Só compila se remover os espaços.' },
        ],
        explanation:
          'Compila perfeitamente. Espaços e quebras de linha são ignorados pelo compilador — o que importa é a pontuação. Ainda assim, ninguém quer manter código assim.',
      },
    ],
    challenge: {
      brief:
        'O código abaixo está sem a pontuação correta e não compila. Conserte para que ele imprima as duas linhas.',
      requirements: ['A saída deve ser `Inicio` e depois `Fim`'],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Inicio")
        Console.WriteLine("Fim")
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Inicio");
        Console.WriteLine("Fim");
    }
}
`,
      hints: [
        'Faltam dois pontos e vírgula.',
        'Também faltam as chaves que fecham o método e a classe.',
      ],
      tests: [{ name: 'Compila e imprime', expectedStdout: 'Inicio\nFim' }],
    },
  },
  {
    id: 's01c01l06',
    title: 'Lendo um erro de compilação',
    objective: 'Interpretar a mensagem do compilador para achar a causa em vez de adivinhar.',
    concept: [
      {
        kind: 'text',
        body:
          'Um erro de compilação tem sempre quatro informações: o **arquivo**, a **linha**, um **código** como `CS1002`, e a **mensagem**. Aprender a ler isso economiza horas.',
      },
      {
        kind: 'output',
        code: `Program.cs(6,35): error CS1002: ; expected`,
        caption: 'Arquivo Program.cs, linha 6, coluna 35, erro CS1002',
      },
      {
        kind: 'table',
        headers: ['Código', 'O que costuma ser'],
        rows: [
          ['`CS1002`', 'Falta ponto e vírgula.'],
          ['`CS0103`', 'Nome não existe: erro de digitação ou variável não declarada.'],
          ['`CS0029`', 'Tipos incompatíveis na atribuição.'],
          ['`CS1061`', 'O tipo não tem esse método ou propriedade.'],
          ['`CS5001`', 'O programa não tem um `Main` adequado.'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Sempre conserte o **primeiro** erro da lista e compile de novo. Um erro no começo do arquivo confunde o compilador e gera dezenas de erros falsos depois dele.',
      },
    ],
    quiz: [
      {
        id: 's01c01l06q1',
        type: 'single',
        prompt: 'O compilador diz `CS0103: The name "mensagem" does not exist in the current context`. Qual é a causa mais provável?',
        options: [
          { id: 'a', text: 'A variável `mensagem` não foi declarada, ou o nome está escrito diferente.', correct: true },
          { id: 'b', text: 'Falta um ponto e vírgula na linha anterior.' },
          { id: 'c', text: 'O tipo da variável é grande demais.' },
          { id: 'd', text: 'O arquivo está com codificação errada.' },
        ],
        explanation:
          'CS0103 significa que o compilador não conhece esse nome. Quase sempre é digitação (`Mensagem` contra `mensagem`) ou declaração esquecida.',
      },
      {
        id: 's01c01l06q2',
        type: 'single',
        prompt: 'Você recebeu 14 erros de compilação. Qual é a melhor estratégia?',
        options: [
          { id: 'a', text: 'Corrigir o primeiro da lista e compilar de novo.', correct: true },
          { id: 'b', text: 'Corrigir o último, porque é o mais recente.' },
          { id: 'c', text: 'Apagar o arquivo e começar de novo.' },
          { id: 'd', text: 'Corrigir todos de uma vez antes de compilar.' },
        ],
        explanation:
          'Erros em cascata são comuns: uma chave faltando no topo desalinha todo o resto. O primeiro erro é o único em que você pode confiar plenamente.',
      },
      {
        id: 's01c01l06q3',
        type: 'single',
        prompt: 'Qual erro este código vai gerar?',
        code: `class Program
{
    static void Main()
    {
        Console.WritLine("Ola");
    }
}`,
        options: [
          { id: 'a', text: '`CS1061`: `Console` não tem um método chamado `WritLine`.', correct: true },
          { id: 'b', text: '`CS1002`: falta ponto e vírgula.' },
          { id: 'c', text: 'Nenhum: C# corrige nomes parecidos.' },
          { id: 'd', text: '`CS0029`: tipos incompatíveis.' },
        ],
        explanation:
          '`WritLine` está escrito errado. O compilador encontra o tipo `Console`, mas não um membro com esse nome — daí o CS1061.',
      },
    ],
    challenge: {
      brief:
        'Este programa tem três erros diferentes. Use as mensagens do compilador (clique em Verificar para vê-las) e conserte todos.',
      requirements: ['A saída deve ser `Total: 30`'],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int valor = 10
        int outro = 20;
        Console.WritLine("Total: " + (valor + outr));
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int valor = 10;
        int outro = 20;
        Console.WriteLine("Total: " + (valor + outro));
    }
}
`,
      hints: [
        'Um dos erros é pontuação: procure a instrução sem `;`.',
        '`WritLine` está com um `e` faltando.',
        '`outr` não existe: a variável se chama `outro`.',
      ],
      tests: [{ name: 'Total correto', expectedStdout: 'Total: 30' }],
    },
  },
  {
    id: 's01c01l07',
    title: 'Write vs WriteLine',
    objective: 'Controlar exatamente onde a saída quebra a linha.',
    concept: [
      {
        kind: 'text',
        body:
          '`Console.Write` imprime e deixa o cursor onde parou. `Console.WriteLine` imprime e pula para a linha seguinte. A diferença aparece quando você monta uma linha em pedaços.',
      },
      {
        kind: 'code',
        code: `Console.Write("Nome: ");
Console.Write("Ana");
Console.WriteLine();
Console.WriteLine("Proxima linha");`,
      },
      {
        kind: 'output',
        code: `Nome: Ana
Proxima linha`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '`Write` é essencial quando você pede algo ao usuário: `Console.Write("Digite seu nome: ")` deixa o cursor na mesma linha, do lado do texto, como um prompt de verdade.',
      },
    ],
    quiz: [
      {
        id: 's01c01l07q1',
        type: 'single',
        prompt: 'Qual é a saída?',
        code: `Console.Write("A");
Console.Write("B");
Console.Write("C");`,
        options: [
          { id: 'a', code: 'ABC', correct: true },
          { id: 'b', code: 'A\nB\nC' },
          { id: 'c', code: 'A B C' },
          { id: 'd', text: 'Erro: `Write` só aceita uma chamada por programa' },
        ],
        explanation: '`Write` não quebra linha, então os três pedaços ficam colados na mesma linha.',
      },
      {
        id: 's01c01l07q2',
        type: 'single',
        prompt: 'Quantas linhas de saída este código gera?',
        code: `Console.WriteLine("1");
Console.Write("2");
Console.Write("3");
Console.WriteLine("4");`,
        options: [
          { id: 'a', text: 'Duas: `1` e `234`', correct: true },
          { id: 'b', text: 'Quatro' },
          { id: 'c', text: 'Uma: `1234`' },
          { id: 'd', text: 'Três' },
        ],
        explanation:
          'O primeiro `WriteLine` fecha a linha `1`. Depois `2` e `3` se acumulam, e o `WriteLine("4")` fecha a segunda linha com `234`.',
      },
      {
        id: 's01c01l07q3',
        type: 'single',
        prompt: 'Você quer o prompt `Idade: ` com o cursor logo ao lado, esperando digitação. Qual usar?',
        options: [
          { id: 'a', code: 'Console.Write("Idade: ");', correct: true },
          { id: 'b', code: 'Console.WriteLine("Idade: ");' },
          { id: 'c', code: 'Console.WriteLine("Idade: \\n");' },
          { id: 'd', code: 'Console.Prompt("Idade: ");' },
        ],
        explanation:
          '`Write` mantém o cursor na mesma linha, que é exatamente o comportamento de um prompt. `Console.Prompt` não existe.',
      },
    ],
    challenge: {
      brief:
        'Monte uma linha de etiqueta em pedaços. Use `Write` para as partes e apenas um `WriteLine` no final.',
      requirements: [
        'A saída deve ser uma única linha: `Produto: Teclado | Preco: 199`',
        'Use `Console.Write` pelo menos duas vezes',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Monte a linha em pedacos com Write e feche com WriteLine
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        Console.Write("Produto: Teclado");
        Console.Write(" | ");
        Console.Write("Preco: ");
        Console.WriteLine(199);
    }
}
`,
      hints: [
        'Repare nos espaços em volta da barra vertical: eles fazem parte da saída.',
        'O último pedaço pode ser um `WriteLine` para fechar a linha.',
      ],
      tests: [
        { name: 'Etiqueta em uma linha', expectedStdout: 'Produto: Teclado | Preco: 199' },
      ],
    },
  },
  {
    id: 's01c01l08',
    title: 'Sequências de escape',
    objective: 'Inserir quebras de linha, tabulações e aspas dentro de uma string.',
    concept: [
      {
        kind: 'text',
        body:
          'Dentro de aspas, a barra invertida ativa um significado especial. Isso resolve o problema de colocar caracteres que a própria sintaxe já usa, como a aspa dupla.',
      },
      {
        kind: 'table',
        headers: ['Sequência', 'Resultado'],
        rows: [
          ['`\\n`', 'Quebra de linha'],
          ['`\\t`', 'Tabulação'],
          ['`\\"`', 'Uma aspa dupla literal'],
          ['`\\\\`', 'Uma barra invertida literal'],
        ],
      },
      {
        kind: 'code',
        code: String.raw`Console.WriteLine("Linha 1\nLinha 2");
Console.WriteLine("Nome\tIdade");
Console.WriteLine("Ela disse \"oi\"");
Console.WriteLine("C:\\temp\\dados");`,
      },
      {
        kind: 'output',
        code: `Linha 1
Linha 2
Nome	Idade
Ela disse "oi"
C:\\temp\\dados`,
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Para caminhos de arquivo, uma string verbatim é mais legível: `@"C:\\temp\\dados"` desliga os escapes, então cada barra é só uma barra.',
      },
    ],
    quiz: [
      {
        id: 's01c01l08q1',
        type: 'single',
        prompt: 'Quantas linhas esta única instrução imprime?',
        code: String.raw`Console.WriteLine("a\nb\nc");`,
        options: [
          { id: 'a', text: 'Uma' },
          { id: 'b', text: 'Três', correct: true },
          { id: 'c', text: 'Duas' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          'Cada `\\n` é uma quebra de linha dentro do próprio texto, e o `WriteLine` ainda adiciona a quebra final.',
      },
      {
        id: 's01c01l08q2',
        type: 'single',
        prompt: 'Como imprimir exatamente `Ele falou "sim"`?',
        options: [
          { id: 'a', code: String.raw`Console.WriteLine("Ele falou \"sim\"");`, correct: true },
          { id: 'b', code: `Console.WriteLine("Ele falou "sim"");` },
          { id: 'c', code: `Console.WriteLine('Ele falou "sim"');` },
          { id: 'd', code: String.raw`Console.WriteLine("Ele falou \\"sim\\"");` },
        ],
        explanation:
          'Aspas dentro de uma string precisam de `\\"`. A segunda opção fecha a string cedo demais, e aspas simples em C# são para um único `char`, não para texto.',
      },
      {
        id: 's01c01l08q3',
        type: 'single',
        prompt: 'Qual é a saída?',
        code: String.raw`Console.WriteLine("A\\B");`,
        options: [
          { id: 'a', code: 'A\\B', correct: true },
          { id: 'b', code: 'A\nB' },
          { id: 'c', code: 'AB' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          '`\\\\` é a sequência que representa uma barra invertida literal. Uma barra sozinha antes de `B` seria um escape inválido.',
      },
    ],
    challenge: {
      brief:
        'Imprima uma tabela pequena usando uma única chamada de `Console.WriteLine`, com tabulação entre as colunas e quebra de linha entre as linhas.',
      requirements: [
        'Use apenas **uma** chamada de `Console.WriteLine`',
        'Primeira linha: `Produto` e `Preco` separados por tabulação',
        'Segunda linha: `Mouse` e `89` separados por tabulação',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Uma unica chamada, com \t entre colunas e \n entre linhas
    }
}
`,
      solution: String.raw`using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Produto\tPreco\nMouse\t89");
    }
}
`,
      hints: [
        'A estrutura é: coluna, `\\t`, coluna, `\\n`, coluna, `\\t`, coluna.',
        'Tudo cabe dentro de um único par de aspas.',
      ],
      tests: [
        { name: 'Tabela com tabulação', expectedStdout: 'Produto\tPreco\nMouse\t89' },
      ],
    },
  },
  {
    id: 's01c01l09',
    title: 'Prática: cartão de visitas',
    objective: 'Juntar Write, WriteLine e sequências de escape para produzir uma saída formatada exata.',
    concept: [
      {
        kind: 'text',
        body:
          'Nesta lição não há conceito novo. O objetivo é treinar precisão: reproduzir uma saída exatamente como pedida é uma habilidade que você vai usar em toda tarefa com testes automatizados.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Quando um teste falha por causa da saída, compare caractere por caractere. Espaço a mais no fim da linha costuma ser perdoado, mas espaço a mais no meio não.',
      },
    ],
    quiz: [
      {
        id: 's01c01l09q1',
        type: 'single',
        prompt: 'Qual código produz a moldura `+---+` seguida de `| X |` e `+---+`?',
        options: [
          { id: 'a', code: String.raw`Console.WriteLine("+---+\n| X |\n+---+");`, correct: true },
          { id: 'b', code: String.raw`Console.Write("+---+\t| X |\t+---+");` },
          { id: 'c', code: `Console.WriteLine("+---+ | X | +---+");` },
          { id: 'd', code: String.raw`Console.WriteLine("+---+\\n| X |\\n+---+");` },
        ],
        explanation:
          'Só `\\n` quebra linha. `\\t` tabula na mesma linha, e `\\\\n` imprime a barra seguida da letra n.',
      },
      {
        id: 's01c01l09q2',
        type: 'single',
        prompt: 'A saída esperada é `Ana Silva` mas seu programa imprime `Ana  Silva`. Qual é o problema?',
        options: [
          { id: 'a', text: 'Um espaço extra entre as palavras.', correct: true },
          { id: 'b', text: 'Faltou `WriteLine` no final.' },
          { id: 'c', text: 'O nome precisa estar em maiúsculas.' },
          { id: 'd', text: 'Falta ponto e vírgula.' },
        ],
        explanation:
          'Espaços dentro da linha fazem parte do texto comparado. Dois espaços seguidos são um caractere a mais e o teste falha.',
      },
      {
        id: 's01c01l09q3',
        type: 'single',
        prompt: 'Você usou `Console.Write` em todas as linhas e a saída ficou tudo colado. Qual correção é mais direta?',
        options: [
          { id: 'a', text: 'Trocar por `WriteLine`, ou adicionar `\\n` ao final de cada texto.', correct: true },
          { id: 'b', text: 'Adicionar `\\t` no início de cada texto.' },
          { id: 'c', text: 'Colocar cada `Write` em um método separado.' },
          { id: 'd', text: 'Nada: o console decide sozinho onde quebrar.' },
        ],
        explanation:
          '`WriteLine` adiciona a quebra automaticamente. `Write` só quebra se você mesmo incluir `\\n` no texto.',
      },
    ],
    challenge: {
      brief:
        'Produza este cartão de visitas exatamente como mostrado, incluindo as bordas e a tabulação na linha do contato.',
      requirements: [
        'Linha 1: `=============`',
        'Linha 2: `Ana Silva`',
        'Linha 3: `Desenvolvedora C#`',
        'Linha 4: `email` e `ana@dev.br` separados por uma tabulação',
        'Linha 5: `=============`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Reproduza o cartao linha por linha
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("=============");
        Console.WriteLine("Ana Silva");
        Console.WriteLine("Desenvolvedora C#");
        Console.WriteLine("email\tana@dev.br");
        Console.WriteLine("=============");
    }
}
`,
      hints: [
        'A borda tem exatamente 13 sinais de igual.',
        'Na linha do email, use `\\t` e não espaços.',
      ],
      tests: [
        {
          name: 'Cartão completo',
          expectedStdout:
            '=============\nAna Silva\nDesenvolvedora C#\nemail\tana@dev.br\n=============',
        },
      ],
    },
  },
  {
    id: 's01c01l10',
    title: 'Checkpoint: seu primeiro programa',
    objective: 'Provar que você domina estrutura, saída, comentários e escapes antes de seguir para variáveis.',
    concept: [
      {
        kind: 'text',
        body:
          'Checkpoint de capítulo: sem teoria nova. O desafio combina tudo que apareceu em Primeiros passos, e os testes são mais exigentes.',
      },
      {
        kind: 'table',
        headers: ['Você aprendeu', 'Onde usa'],
        rows: [
          ['Estrutura `class` + `Main`', 'Todo programa'],
          ['`Console.WriteLine` e `Console.Write`', 'Toda saída'],
          ['Comentários', 'Explicar intenção'],
          ['`;` e `{}`', 'Pontuação da linguagem'],
          ['`\\n`, `\\t`, `\\"`', 'Formatar texto'],
          ['Ler erros `CSxxxx`', 'Depurar antes de rodar'],
        ],
      },
    ],
    quiz: [
      {
        id: 's01c01l10q1',
        type: 'single',
        prompt: 'Qual destes programas compila e imprime `ok`?',
        options: [
          {
            id: 'a',
            code: `class Program
{
    static void Main()
    {
        Console.WriteLine("ok");
    }
}`,
            correct: true,
          },
          {
            id: 'b',
            code: `class Program
{
    static void Main()
    {
        Console.WriteLine("ok")
    }
}`,
          },
          {
            id: 'c',
            code: `class Program
{
    Console.WriteLine("ok");
}`,
          },
          {
            id: 'd',
            code: `class Program
{
    static void main()
    {
        Console.WriteLine("ok");
    }
}`,
          },
        ],
        explanation:
          'A opção B esquece o `;`, a C tem instrução solta na classe, e a D usa `main` minúsculo, que não é ponto de entrada.',
      },
      {
        id: 's01c01l10q2',
        type: 'multiple',
        prompt: 'Quais afirmações são verdadeiras?',
        options: [
          { id: 'a', text: '`Console.Write` não pula linha.', correct: true },
          { id: 'b', text: 'Comentários são removidos na compilação.', correct: true },
          { id: 'c', text: 'A indentação altera o significado do código em C#.' },
          { id: 'd', text: '`\\t` insere uma tabulação.', correct: true },
        ],
        explanation:
          'Somente a afirmação sobre indentação é falsa: em C# ela é puramente estética, ao contrário de linguagens como Python.',
      },
      {
        id: 's01c01l10q3',
        type: 'single',
        prompt: 'Qual é a saída deste programa?',
        code: `class Program
{
    static void Main()
    {
        Console.Write("1");
        // Console.Write("2");
        Console.WriteLine("3");
        Console.WriteLine(1 + 2);
    }
}`,
        options: [
          { id: 'a', code: '13\n3', correct: true },
          { id: 'b', code: '123\n3' },
          { id: 'c', code: '13\n12' },
          { id: 'd', code: '1\n3\n3' },
        ],
        explanation:
          'A linha do `2` está comentada. `Write("1")` e `WriteLine("3")` formam a linha `13`, e `1 + 2` é calculado e imprime `3`.',
      },
    ],
    challenge: {
      brief:
        'Monte o menu de um programa de terminal. Ele deve ter um título com moldura, três opções numeradas e um prompt final na mesma linha do cursor.',
      requirements: [
        'Linha 1: `--- MENU ---`',
        'Linhas 2 a 4: `1) Cadastrar`, `2) Listar`, `3) Sair`',
        'Linha 5: `Escolha: ` **sem** quebra de linha no final',
        'Não use nenhuma sequência `\\n` — resolva com as chamadas certas',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Titulo, opcoes e prompt final sem quebra de linha
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("--- MENU ---");
        Console.WriteLine("1) Cadastrar");
        Console.WriteLine("2) Listar");
        Console.WriteLine("3) Sair");
        Console.Write("Escolha: ");
    }
}
`,
      hints: [
        'As quatro primeiras linhas pedem `WriteLine`.',
        'A última linha precisa manter o cursor no lugar: use `Write`.',
        'O prompt termina com dois pontos e um espaço.',
      ],
      tests: [
        {
          name: 'Menu completo',
          expectedStdout: '--- MENU ---\n1) Cadastrar\n2) Listar\n3) Sair\nEscolha:',
        },
      ],
    },
  },
]
