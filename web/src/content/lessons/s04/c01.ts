import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's04c01l01',
    title: 'Criando seu primeiro método',
    objective: 'Dar nome a um pedaço de lógica e executá-lo quantas vezes quiser, sem repetir o código.',
    concept: [
      {
        kind: 'text',
        body:
          'Até agora todo o seu código morava dentro do `Main`. Um **método** é um pedaço de lógica com nome próprio: você o escreve uma vez e o executa quantas vezes precisar, de onde precisar.',
      },
      {
        kind: 'code',
        code: `class Program
{
    static void Cabecalho()      // declaracao: o que o metodo faz
    {
        Console.WriteLine("=====");
        Console.WriteLine("MENU");
        Console.WriteLine("=====");
    }

    static void Main()
    {
        Cabecalho();             // chamada: executa o metodo
        Cabecalho();             // de novo, sem duplicar o codigo
    }
}`,
        caption: 'O método fica **ao lado** do `Main`, dentro da classe — nunca dentro dele.',
      },
      {
        kind: 'table',
        headers: ['Parte', 'No exemplo', 'Significa'],
        rows: [
          ['`static`', '`static`', 'pertence à classe, não a um objeto'],
          ['tipo de retorno', '`void`', 'não devolve nada'],
          ['nome', '`Cabecalho`', 'como você o chama'],
          ['parênteses', '`()`', 'sem parâmetros'],
          ['corpo', '`{ ... }`', 'o que ele faz'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O `Main` sempre foi um método — você o escreve desde a primeira lição. A novidade não é o conceito, é você passar a criar os seus.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Declarar um método **dentro** do `Main` não compila da forma que você espera. Métodos são irmãos do `Main`, não filhos: eles ficam depois da chave que fecha o `Main`, ainda dentro da classe.',
      },
      {
        kind: 'text',
        body:
          'A partir desta seção, o `starterCode` dos desafios já traz a **assinatura** que os testes esperam. Preencher o corpo é a sua parte; mudar o nome ou os parâmetros quebra o exercício.',
      },
    ],
    quiz: [
      {
        id: 's04c01l01q1',
        type: 'single',
        prompt: 'Onde um método deve ser declarado?',
        options: [
          { id: 'a', text: 'Dentro da classe, ao lado do `Main`.', correct: true },
          { id: 'b', text: 'Dentro do `Main`.' },
          { id: 'c', text: 'Fora da classe, no topo do arquivo.' },
          { id: 'd', text: 'Depois da chave que fecha a classe.' },
        ],
        explanation:
          'O `Main` e os seus métodos são membros da mesma classe. Colocá-lo dentro do `Main` faz o compilador tratá-lo como outra coisa, e colocá-lo fora da classe não compila.',
      },
      {
        id: 's04c01l01q2',
        type: 'single',
        prompt: 'O que `void` significa na assinatura de um método?',
        options: [
          { id: 'a', text: 'Que ele não devolve nenhum valor.', correct: true },
          { id: 'b', text: 'Que ele não recebe parâmetros.' },
          { id: 'c', text: 'Que ele não pode ser chamado duas vezes.' },
          { id: 'd', text: 'Que ele não imprime nada.' },
        ],
        explanation:
          'Retorno e parâmetros são coisas independentes: um método `void` pode receber vários parâmetros. O que `void` diz é que não há resultado para quem chamou.',
      },
      {
        id: 's04c01l01q3',
        type: 'single',
        prompt: 'Qual é a principal vantagem de extrair um trecho para um método?',
        options: [
          { id: 'a', text: 'O trecho ganha um nome e passa a ser reutilizável sem duplicação.', correct: true },
          { id: 'b', text: 'O programa fica mais rápido.' },
          { id: 'c', text: 'O código ocupa menos memória.' },
          { id: 'd', text: 'O compilador verifica mais erros.' },
        ],
        explanation:
          'A chamada tem um custo pequeno, então velocidade não é o motivo. O ganho é de organização: um nome no lugar de dez linhas, e uma única cópia da lógica.',
      },
    ],
    challenge: {
      brief:
        'Escreva um método `Cabecalho` que imprime um cabeçalho de três linhas. Leia um inteiro `n` e chame o método `n` vezes, informando ao final quantos cabeçalhos foram impressos.',
      requirements: [
        'O método `Cabecalho` imprime exatamente três linhas: `=====`, `MENU` e `=====`',
        'A última linha da saída é `Cabecalhos: n`',
        'Com `n` igual a 0, sai apenas a linha final',
        'Não mude a assinatura de `Cabecalho`',
        'Toda a impressão do cabeçalho acontece dentro do método, não no `Main`',
      ],
      starterCode: `using System;

class Program
{
    static void Cabecalho()
    {
        // Imprima as tres linhas do cabecalho
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        // Chame o metodo n vezes

        Console.WriteLine($"Cabecalhos: {n}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Cabecalho()
    {
        Console.WriteLine("=====");
        Console.WriteLine("MENU");
        Console.WriteLine("=====");
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            Cabecalho();
        }

        Console.WriteLine($"Cabecalhos: {n}");
    }
}
`,
      hints: [
        'A chamada é só o nome seguido de parênteses: `Cabecalho();`.',
        'O laço que repete a chamada fica no `Main`; o método não sabe quantas vezes será chamado.',
      ],
      tests: [
        {
          name: 'Dois cabeçalhos',
          stdin: '2\n',
          expectedStdout: '=====\nMENU\n=====\n=====\nMENU\n=====\nCabecalhos: 2',
        },
        {
          name: 'Um cabeçalho',
          stdin: '1\n',
          expectedStdout: '=====\nMENU\n=====\nCabecalhos: 1',
        },
        {
          name: 'Nenhum cabeçalho',
          stdin: '0\n',
          expectedStdout: 'Cabecalhos: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c01l02',
    title: 'Parâmetros',
    objective: 'Passar dados para um método, tornando-o útil em situações diferentes.',
    concept: [
      {
        kind: 'text',
        body:
          'Um método sem parâmetros faz sempre exatamente a mesma coisa. **Parâmetros** são o que o tornam geral: a mesma lógica, aplicada a dados diferentes a cada chamada.',
      },
      {
        kind: 'code',
        code: `static void Linha(char simbolo, int tamanho)
{
    for (int i = 0; i < tamanho; i++)
    {
        Console.Write(simbolo);
    }

    Console.WriteLine();
}

// chamadas:
Linha('*', 3);    // ***
Linha('=', 5);    // =====`,
      },
      {
        kind: 'text',
        body:
          'Vale distinguir dois termos que costumam ser confundidos. O **parâmetro** é a variável declarada na assinatura; o **argumento** é o valor que você passa na chamada.',
      },
      {
        kind: 'table',
        headers: ['Na assinatura', 'Na chamada', 'Nome'],
        rows: [
          ['`char simbolo`', '—', 'parâmetro'],
          ['—', "`'*'`", 'argumento'],
          ['`int tamanho`', '—', 'parâmetro'],
          ['—', '`3`', 'argumento'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Os argumentos são associados **por posição**: o primeiro valor vai para o primeiro parâmetro. Trocar a ordem na chamada não gera erro se os tipos coincidirem — é a mesma armadilha da desconstrução de tuplas.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um parâmetro é uma **cópia** para os tipos por valor, como `int` e `char`. Alterá-lo dentro do método não afeta a variável de quem chamou — para isso existe o `ref`, que chega no próximo capítulo.',
      },
      {
        kind: 'text',
        body:
          'Quantos parâmetros são demais? A resposta prática é: quando você começa a errar a ordem. Três ou quatro costuma ser o limite confortável, e passar disso é sinal de que os dados deveriam viajar juntos em uma tupla ou em um tipo próprio.',
      },
    ],
    quiz: [
      {
        id: 's04c01l02q1',
        type: 'single',
        prompt: 'Qual é a diferença entre parâmetro e argumento?',
        options: [
          { id: 'a', text: 'Parâmetro é a variável da assinatura; argumento é o valor passado na chamada.', correct: true },
          { id: 'b', text: 'São sinônimos.' },
          { id: 'c', text: 'Parâmetro é de entrada; argumento é de saída.' },
          { id: 'd', text: 'Parâmetro é opcional; argumento é obrigatório.' },
        ],
        explanation:
          'A distinção importa ao ler mensagens de erro do compilador, que usam os dois termos com precisão.',
      },
      {
        id: 's04c01l02q2',
        type: 'single',
        prompt: 'O que acontece ao alterar um parâmetro `int` dentro do método?',
        options: [
          { id: 'a', text: 'Só a cópia local muda; a variável de quem chamou continua igual.', correct: true },
          { id: 'b', text: 'A variável de quem chamou também muda.' },
          { id: 'c', text: 'Erro de compilação: parâmetros são somente leitura.' },
          { id: 'd', text: 'Depende do valor.' },
        ],
        explanation:
          'Tipos por valor são copiados na passagem. Para que a alteração escape do método, é preciso `ref` ou `out` — ou devolver o novo valor.',
      },
      {
        id: 's04c01l02q3',
        type: 'single',
        prompt: 'Como os argumentos são associados aos parâmetros?',
        options: [
          { id: 'a', text: 'Por posição, na ordem em que aparecem.', correct: true },
          { id: 'b', text: 'Por nome do parâmetro.' },
          { id: 'c', text: 'Por tipo, em qualquer ordem.' },
          { id: 'd', text: 'Por ordem alfabética.' },
        ],
        explanation:
          'A associação por posição é o padrão. Existe também a forma por nome, que o próximo capítulo apresenta como argumentos nomeados.',
      },
    ],
    challenge: {
      brief:
        'Escreva um método `Linha` que recebe um caractere e um comprimento, e imprime uma linha com esse caractere repetido. Leia `n` pedidos, cada um em duas linhas — o caractere e o comprimento — e desenhe cada um.',
      requirements: [
        'O método `Linha` recebe um `char` e um `int`, nessa ordem',
        'Cada pedido produz uma linha com o caractere repetido o número de vezes indicado',
        'A última linha da saída é `Linhas: n`',
        'Um comprimento 0 produz uma linha vazia',
        'Não mude a assinatura de `Linha`',
        'O laço que desenha a linha fica dentro do método',
      ],
      starterCode: `using System;

class Program
{
    static void Linha(char simbolo, int tamanho)
    {
        // Escreva o simbolo tamanho vezes e feche a linha
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            char simbolo = Console.ReadLine()[0];
            int tamanho = int.Parse(Console.ReadLine());

            // Chame o metodo
        }

        Console.WriteLine($"Linhas: {n}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Linha(char simbolo, int tamanho)
    {
        for (int i = 0; i < tamanho; i++)
        {
            Console.Write(simbolo);
        }

        Console.WriteLine();
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            char simbolo = Console.ReadLine()[0];
            int tamanho = int.Parse(Console.ReadLine());

            Linha(simbolo, tamanho);
        }

        Console.WriteLine($"Linhas: {n}");
    }
}
`,
      hints: [
        'A chamada passa os dois argumentos na ordem da assinatura: `Linha(simbolo, tamanho);`.',
        'O `Console.WriteLine()` sem argumento, no fim do método, é o que encerra a linha desenhada.',
      ],
      tests: [
        {
          name: 'Três linhas diferentes',
          stdin: '3\n*\n3\n=\n5\n-\n2\n',
          expectedStdout: '***\n=====\n--\nLinhas: 3',
        },
        {
          name: 'Comprimento zero produz linha vazia',
          stdin: '2\n#\n0\n#\n4\n',
          expectedStdout: '\n####\nLinhas: 2',
        },
        {
          name: 'Uma linha só',
          stdin: '1\n@\n1\n',
          expectedStdout: '@\nLinhas: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c01l03',
    title: 'Valor de retorno',
    objective: 'Fazer um método devolver um resultado, para que quem chamou possa usá-lo em uma expressão.',
    concept: [
      {
        kind: 'text',
        body:
          'Um método que **devolve** um valor pode ser usado dentro de expressões: atribuído a variáveis, somado, comparado, passado como argumento para outro método. É a diferença entre calcular e apenas fazer.',
      },
      {
        kind: 'code',
        code: `static int SomaAte(int n)     // devolve um int
{
    int soma = 0;

    for (int i = 1; i <= n; i++)
    {
        soma += i;
    }

    return soma;              // entrega o resultado
}

int total = SomaAte(5) + SomaAte(10);   // 15 + 55`,
        caption: 'O tipo antes do nome é o que o método devolve.',
      },
      {
        kind: 'text',
        body:
          'O `return` faz duas coisas ao mesmo tempo: entrega o valor e **encerra o método na hora**. É o mesmo `return` que você usou na Seção 2 para sair do `Main` mais cedo, agora com um valor junto.',
      },
      {
        kind: 'compare',
        good: `static int Dobro(int n)
{
    return n * 2;
}

int x = Dobro(5);`,
        bad: `static void Dobro(int n)
{
    Console.WriteLine(n * 2);
}

int x = Dobro(5);   // nao compila`,
        goodLabel: 'Devolve: dá para usar',
        badLabel: 'Imprime: não dá para usar',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Todo caminho do método precisa devolver alguma coisa. Se um `if` devolve e o outro não, o compilador reclama com "nem todos os caminhos de código retornam um valor" — e ele está certo: existe um caminho sem resposta.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um método que **calcula e devolve** é muito mais reutilizável que um que calcula e imprime. Quem chama decide o que fazer com o valor: imprimir, somar, guardar. Essa separação é o assunto de uma lição inteira mais adiante neste capítulo.',
      },
    ],
    quiz: [
      {
        id: 's04c01l03q1',
        type: 'single',
        prompt: 'O que o `return` faz além de entregar o valor?',
        options: [
          { id: 'a', text: 'Encerra o método imediatamente.', correct: true },
          { id: 'b', text: 'Imprime o valor no console.' },
          { id: 'c', text: 'Reinicia o método.' },
          { id: 'd', text: 'Nada além disso.' },
        ],
        explanation:
          'Qualquer linha depois de um `return` alcançado não executa. É a mesma semântica de saída antecipada que você já usava no `Main`.',
      },
      {
        id: 's04c01l03q2',
        type: 'single',
        prompt: 'Por que `int x = Imprimir(5);` não compila, se `Imprimir` é `void`?',
        options: [
          { id: 'a', text: 'Porque um método `void` não produz valor para atribuir.', correct: true },
          { id: 'b', text: 'Porque `void` só aceita `string`.' },
          { id: 'c', text: 'Porque falta um `return` no método.' },
          { id: 'd', text: 'Porque `x` deveria ser `var`.' },
        ],
        explanation:
          'A chamada de um método `void` é uma instrução, não uma expressão. Não há nada do lado direito da atribuição.',
      },
      {
        id: 's04c01l03q3',
        type: 'single',
        prompt: 'O que o compilador diz sobre este método?',
        code: `static int Sinal(int n)
{
    if (n > 0) return 1;
    if (n < 0) return -1;
}`,
        options: [
          { id: 'a', text: 'Que nem todos os caminhos retornam um valor: falta o caso `n == 0`.', correct: true },
          { id: 'b', text: 'Que há `return` demais.' },
          { id: 'c', text: 'Nada: o código compila.' },
          { id: 'd', text: 'Que `-1` não é um `int` válido.' },
        ],
        explanation:
          'Com `n` igual a 0, os dois `if` são falsos e a execução chega ao fim do método sem devolver nada. O compilador detecta isso antes de o programa rodar.',
      },
    ],
    challenge: {
      brief:
        'Escreva um método `SomaAte` que recebe um inteiro `n` e devolve a soma de todos os números de 1 até `n`. Leia `q` valores e informe o resultado de cada um, além do total acumulado.',
      requirements: [
        'O método `SomaAte` recebe um `int` e devolve um `int`',
        'Uma linha por consulta, no formato `SomaAte(5) = 15`',
        'A última linha é `Total: t`, somando todos os resultados',
        'Para `n` menor ou igual a 0, o método devolve `0`',
        'Não mude a assinatura de `SomaAte`',
        'O método não imprime nada: quem imprime é o `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int SomaAte(int n)
    {
        // Some de 1 ate n e devolva o resultado
        return 0;
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int total = 0;

        for (int i = 0; i < q; i++)
        {
            int n = int.Parse(Console.ReadLine());

            // Chame o metodo, imprima e acumule
        }

        Console.WriteLine($"Total: {total}");
    }
}
`,
      solution: `using System;

class Program
{
    static int SomaAte(int n)
    {
        int soma = 0;

        for (int i = 1; i <= n; i++)
        {
            soma += i;
        }

        return soma;
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int total = 0;

        for (int i = 0; i < q; i++)
        {
            int n = int.Parse(Console.ReadLine());

            int resultado = SomaAte(n);
            Console.WriteLine($"SomaAte({n}) = {resultado}");
            total += resultado;
        }

        Console.WriteLine($"Total: {total}");
    }
}
`,
      hints: [
        'Guarde o retorno em uma variável: você precisa dele para imprimir **e** para acumular.',
        'Com `n` menor ou igual a 0 o laço não roda, e o acumulador zerado já é a resposta correta.',
      ],
      tests: [
        {
          name: 'Duas consultas',
          stdin: '2\n5\n10\n',
          expectedStdout: 'SomaAte(5) = 15\nSomaAte(10) = 55\nTotal: 70',
        },
        {
          name: 'Zero e negativo devolvem zero',
          stdin: '2\n0\n-3\n',
          expectedStdout: 'SomaAte(0) = 0\nSomaAte(-3) = 0\nTotal: 0',
        },
        {
          name: 'Uma consulta',
          stdin: '1\n1\n',
          expectedStdout: 'SomaAte(1) = 1\nTotal: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c01l04',
    title: 'Métodos void',
    objective: 'Escolher entre devolver um valor e produzir um efeito, e reconhecer quando cada um é o certo.',
    concept: [
      {
        kind: 'text',
        body:
          'Um método `void` existe pelo seu **efeito**: imprimir, gravar, alterar algo. Um método com retorno existe pelo seu **valor**. A distinção parece sutil e organiza programas inteiros.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Devolve valor',
          code: `static string Formatar(int codigo, string nome)
{
    return $"{codigo:D3} - {nome}";
}`,
        },
        right: {
          label: 'Produz efeito',
          code: `static void Registrar(string linha)
{
    Console.WriteLine($"> {linha}");
}`,
        },
        note: 'Um responde uma pergunta; o outro executa uma ação.',
      },
      {
        kind: 'table',
        headers: ['Sinal de que deve ser', 'Exemplo'],
        rows: [
          ['com retorno', 'calcular, converter, formatar, decidir'],
          ['`void`', 'imprimir, salvar, notificar, limpar'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um método com retorno é fácil de testar: chame e compare o resultado. Um método `void` só pode ser verificado pelos efeitos que deixou. É por isso que a lógica de negócio deve ficar em métodos que devolvem, e o `void` fica na borda que fala com o mundo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O pior dos dois mundos é um método `void` que também calcula algo importante e joga o resultado no console. Quem quiser reaproveitar esse cálculo terá que copiar o código — e é assim que a mesma regra passa a existir em três lugares diferentes.',
      },
      {
        kind: 'text',
        body:
          'Um `void` pode usar `return;` sozinho, sem valor, para encerrar mais cedo. É exatamente o `return` de saída antecipada que você já conhece da Seção 2.',
      },
    ],
    quiz: [
      {
        id: 's04c01l04q1',
        type: 'single',
        prompt: 'Qual método deveria ter retorno em vez de ser `void`?',
        options: [
          { id: 'a', text: 'Um que calcula o preço final com desconto.', correct: true },
          { id: 'b', text: 'Um que imprime o cabeçalho do relatório.' },
          { id: 'c', text: 'Um que limpa a tela.' },
          { id: 'd', text: 'Um que grava uma linha de log.' },
        ],
        explanation:
          'Cálculos produzem valores que outros lugares podem querer usar. As outras três são ações cujo resultado é o próprio efeito.',
      },
      {
        id: 's04c01l04q2',
        type: 'single',
        prompt: 'Por que um método com retorno é mais fácil de testar?',
        options: [
          { id: 'a', text: 'Porque basta chamar e comparar o valor devolvido.', correct: true },
          { id: 'b', text: 'Porque ele executa mais rápido.' },
          { id: 'c', text: 'Porque ele não pode ter erros.' },
          { id: 'd', text: 'Porque ele aceita menos parâmetros.' },
        ],
        explanation:
          'Verificar um `void` exige observar o mundo em volta — o que foi impresso, o que foi gravado. O valor devolvido está ali, pronto para comparar.',
      },
      {
        id: 's04c01l04q3',
        type: 'single',
        prompt: 'O que `return;` sozinho faz em um método `void`?',
        options: [
          { id: 'a', text: 'Encerra o método naquele ponto.', correct: true },
          { id: 'b', text: 'Não compila: `void` não aceita `return`.' },
          { id: 'c', text: 'Devolve `null`.' },
          { id: 'd', text: 'Devolve `0`.' },
        ],
        explanation:
          'É a saída antecipada da Seção 2, aplicada a um método qualquer em vez de ao `Main`. Sem valor, porque não há o que devolver.',
      },
    ],
    challenge: {
      brief:
        'Escreva dois métodos com papéis diferentes: `Formatar`, que devolve o texto de uma linha de catálogo, e `Registrar`, que imprime uma linha já formatada com um prefixo. Leia `n` itens e processe cada um usando os dois.',
      requirements: [
        '`Formatar` recebe um `int` e uma `string` e devolve uma `string` no formato `001 - Teclado`, com o código em três dígitos',
        '`Registrar` recebe uma `string` e imprime `> ` seguido dela',
        'A última linha da saída é `Registros: n`',
        'Não mude as assinaturas de `Formatar` nem de `Registrar`',
        '`Formatar` não imprime nada, e `Registrar` não formata nada',
      ],
      starterCode: `using System;

class Program
{
    static string Formatar(int codigo, string nome)
    {
        // Devolva o texto no formato "001 - Teclado"
        return "";
    }

    static void Registrar(string linha)
    {
        // Imprima a linha com o prefixo "> "
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            int codigo = int.Parse(Console.ReadLine());
            string nome = Console.ReadLine();

            // Formate e registre
        }

        Console.WriteLine($"Registros: {n}");
    }
}
`,
      solution: `using System;

class Program
{
    static string Formatar(int codigo, string nome)
    {
        return $"{codigo:D3} - {nome}";
    }

    static void Registrar(string linha)
    {
        Console.WriteLine($"> {linha}");
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 0; i < n; i++)
        {
            int codigo = int.Parse(Console.ReadLine());
            string nome = Console.ReadLine();

            Registrar(Formatar(codigo, nome));
        }

        Console.WriteLine($"Registros: {n}");
    }
}
`,
      hints: [
        'O `D3` do formato preenche o código com zeros à esquerda até três dígitos, como na Seção 2.',
        'Como `Formatar` devolve uma `string`, ela pode ser passada direto para `Registrar` sem variável intermediária.',
      ],
      tests: [
        {
          name: 'Dois itens',
          stdin: '2\n1\nTeclado\n2\nMouse\n',
          expectedStdout: '> 001 - Teclado\n> 002 - Mouse\nRegistros: 2',
        },
        {
          name: 'Código com três dígitos',
          stdin: '1\n742\nMonitor\n',
          expectedStdout: '> 742 - Monitor\nRegistros: 1',
        },
        {
          name: 'Nenhum item',
          stdin: '0\n',
          expectedStdout: 'Registros: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c01l05',
    title: 'Métodos chamando métodos',
    objective: 'Compor métodos pequenos para resolver um problema maior, cada um cuidando de uma parte.',
    concept: [
      {
        kind: 'text',
        body:
          'Um método pode chamar outro, e é aí que a divisão do problema começa a valer a pena. Um método sabe decidir se um número é primo; outro usa essa decisão para contar quantos primos há em uma faixa.',
      },
      {
        kind: 'code',
        code: `static bool EhPrimo(int n)
{
    if (n < 2) return false;

    for (int d = 2; d * d <= n; d++)
    {
        if (n % d == 0) return false;
    }

    return true;
}

static int ContarPrimos(int inicio, int fim)
{
    int total = 0;

    for (int i = inicio; i <= fim; i++)
    {
        if (EhPrimo(i)) total++;    // reaproveita a decisao
    }

    return total;
}`,
        caption: 'Cada método faz uma coisa; o de cima usa o de baixo sem saber como ele funciona.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que `ContarPrimos` não sabe **como** a primalidade é decidida — e não precisa saber. Se um dia você trocar o algoritmo de `EhPrimo` por um mais rápido, nada mais no programa muda. Isso é o principal ganho de dividir em métodos.',
      },
      {
        kind: 'text',
        body:
          'Os `return false` antecipados de `EhPrimo` são o padrão de saída antecipada da Seção 2, agora dentro de um método que devolve valor. Assim que a resposta é conhecida, não há motivo para continuar.',
      },
      {
        kind: 'compare',
        good: `if (n < 2) return false;

for (int d = 2; d * d <= n; d++)
{
    if (n % d == 0) return false;
}

return true;`,
        bad: `bool primo = n >= 2;

for (int d = 2; d * d <= n; d++)
{
    if (n % d == 0) primo = false;
}

return primo;`,
        goodLabel: 'Sai assim que decide',
        badLabel: 'Continua testando à toa',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A ordem de declaração dos métodos **não** importa: `ContarPrimos` pode aparecer antes de `EhPrimo` no arquivo e funcionar normalmente. O compilador lê a classe inteira antes de resolver as chamadas.',
      },
      {
        kind: 'text',
        body:
          'A mesma decisão pode ser reaproveitada em vários lugares. Aqui `EhPrimo` serve tanto para contar quanto para listar — e o dia em que a definição de primo mudar, ela muda em um lugar só.',
      },
    ],
    quiz: [
      {
        id: 's04c01l05q1',
        type: 'single',
        prompt: 'Um método pode chamar outro declarado depois dele no arquivo?',
        options: [
          { id: 'a', text: 'Sim: a ordem de declaração não importa.', correct: true },
          { id: 'b', text: 'Não: só métodos declarados antes.' },
          { id: 'c', text: 'Só se estiverem em classes diferentes.' },
          { id: 'd', text: 'Só se o método chamado for `void`.' },
        ],
        explanation:
          'O compilador conhece todos os membros da classe antes de compilar os corpos. Isso é diferente de linguagens que exigem declaração prévia.',
      },
      {
        id: 's04c01l05q2',
        type: 'single',
        prompt: 'Qual é a principal vantagem de `ContarPrimos` chamar `EhPrimo` em vez de repetir a lógica?',
        options: [
          { id: 'a', text: 'A regra existe em um lugar só, então mudá-la afeta todo o programa de uma vez.', correct: true },
          { id: 'b', text: 'O programa fica mais rápido.' },
          { id: 'c', text: 'O compilador otimiza melhor.' },
          { id: 'd', text: 'Usa menos memória.' },
        ],
        explanation:
          'Lógica duplicada envelhece mal: uma cópia é corrigida e a outra não. Um método com nome é a única cópia que existe.',
      },
      {
        id: 's04c01l05q3',
        type: 'single',
        prompt: 'Por que `if (n < 2) return false;` vem antes do laço?',
        options: [
          { id: 'a', text: 'Porque 0, 1 e negativos não são primos, e o laço não os detectaria.', correct: true },
          { id: 'b', text: 'Por questão de desempenho apenas.' },
          { id: 'c', text: 'Porque o laço lançaria exceção.' },
          { id: 'd', text: 'Não precisa vir antes.' },
        ],
        explanation:
          'Para `n = 1`, a condição `2 * 2 <= 1` já é falsa e o laço dá zero voltas, então o método devolveria `true`. É o mesmo caso de borda da Seção 2.',
      },
    ],
    challenge: {
      brief:
        'Escreva `EhPrimo`, que decide se um número é primo, e `ContarPrimos`, que usa o primeiro para contar quantos primos há em uma faixa. Leia `inicio` e `fim` e informe a contagem e a lista.',
      requirements: [
        '`EhPrimo` recebe um `int` e devolve um `bool`',
        '`ContarPrimos` recebe dois `int` e devolve um `int`, chamando `EhPrimo`',
        'Linha 1: `Primos entre 1 e 20: 8`, usando os valores lidos',
        'Linha 2: `Lista: 2 3 5 7 11 13 17 19`, com os primos separados por espaço',
        'Números menores que 2 não são primos',
        'Não mude as assinaturas de `EhPrimo` nem de `ContarPrimos`',
        'Sem nenhum primo na faixa, a segunda linha sai apenas com o rótulo',
      ],
      starterCode: `using System;

class Program
{
    static bool EhPrimo(int n)
    {
        // Decida se n e primo
        return false;
    }

    static int ContarPrimos(int inicio, int fim)
    {
        // Use EhPrimo para contar na faixa
        return 0;
    }

    static void Main()
    {
        int inicio = int.Parse(Console.ReadLine());
        int fim = int.Parse(Console.ReadLine());

        Console.WriteLine($"Primos entre {inicio} e {fim}: {ContarPrimos(inicio, fim)}");

        // Monte a lista usando EhPrimo tambem
    }
}
`,
      solution: `using System;

class Program
{
    static bool EhPrimo(int n)
    {
        if (n < 2)
        {
            return false;
        }

        for (int d = 2; d * d <= n; d++)
        {
            if (n % d == 0)
            {
                return false;
            }
        }

        return true;
    }

    static int ContarPrimos(int inicio, int fim)
    {
        int total = 0;

        for (int i = inicio; i <= fim; i++)
        {
            if (EhPrimo(i))
            {
                total++;
            }
        }

        return total;
    }

    static void Main()
    {
        int inicio = int.Parse(Console.ReadLine());
        int fim = int.Parse(Console.ReadLine());

        Console.WriteLine($"Primos entre {inicio} e {fim}: {ContarPrimos(inicio, fim)}");

        string lista = "";

        for (int i = inicio; i <= fim; i++)
        {
            if (EhPrimo(i))
            {
                lista += $"{i} ";
            }
        }

        Console.WriteLine($"Lista: {lista}");
    }
}
`,
      hints: [
        'O `EhPrimo` é usado em dois lugares: dentro de `ContarPrimos` e no laço que monta a lista.',
        'O teste de divisores vai enquanto `d * d <= n`, como no capítulo de padrões numéricos da Seção 2.',
      ],
      tests: [
        {
          name: 'Faixa de 1 a 20',
          stdin: '1\n20\n',
          expectedStdout: 'Primos entre 1 e 20: 8\nLista: 2 3 5 7 11 13 17 19',
        },
        {
          name: 'Faixa sem primos',
          stdin: '8\n10\n',
          expectedStdout: 'Primos entre 8 e 10: 0\nLista:',
        },
        {
          name: 'Faixa com um primo só',
          stdin: '2\n2\n',
          expectedStdout: 'Primos entre 2 e 2: 1\nLista: 2',
        },
        {
          name: 'O 1 não é primo',
          stdin: '1\n1\n',
          expectedStdout: 'Primos entre 1 e 1: 0\nLista:',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c01l06',
    title: 'Escolhendo bons nomes',
    objective: 'Nomear métodos de forma que a chamada se leia como uma frase, sem precisar abrir o corpo.',
    concept: [
      {
        kind: 'text',
        body:
          'Um bom nome de método torna a **chamada** legível. Quem lê `if (EhPrimo(n))` entende tudo; quem lê `if (Verificar(n))` precisa abrir o método para saber o que foi verificado — e o que `true` significa.',
      },
      {
        kind: 'table',
        headers: ['O método...', 'Nome no formato', 'Exemplo'],
        rows: [
          ['faz uma ação', 'verbo no infinitivo', '`Calcular`, `Salvar`, `Imprimir`'],
          ['devolve `bool`', 'pergunta', '`EhPar`, `TemSaldo`, `PodeEditar`'],
          ['devolve um valor', 'substantivo ou verbo', '`Total`, `Media`, `Formatar`'],
          ['converte', '`De`/`Para`', '`ParaTexto`, `DeJson`'],
        ],
      },
      {
        kind: 'compare',
        good: `if (EhPositivo(saldo)) { }
decimal total = CalcularTotal(itens);
Registrar(linha);`,
        bad: `if (Check(saldo)) { }
decimal total = Processar(itens);
Fazer(linha);`,
        goodLabel: 'A chamada se explica',
        badLabel: 'Precisa abrir o método',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Nomes genéricos como `Processar`, `Fazer`, `Executar` e `Tratar` são um sintoma, não um estilo: eles aparecem quando o método faz coisas demais para caber em um nome. Se você não consegue nomear, provavelmente não é um método só.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Para métodos que devolvem `bool`, a forma de pergunta resolve uma ambiguidade real. `Valido(x)` deixa dúvida sobre o que `false` significa; `EhValido(x)` não deixa nenhuma.',
      },
      {
        kind: 'text',
        body:
          'Em C#, métodos usam maiúscula inicial e cada palavra começa com maiúscula. É a mesma convenção de propriedades e de elementos nomeados de tupla — e ela distingue visualmente um método de uma variável local.',
      },
    ],
    quiz: [
      {
        id: 's04c01l06q1',
        type: 'single',
        prompt: 'Qual é o melhor nome para um método que devolve `true` quando o estoque acabou?',
        options: [
          { id: 'a', code: 'EstaEsgotado', correct: true },
          { id: 'b', code: 'Estoque' },
          { id: 'c', code: 'VerificarEstoque' },
          { id: 'd', code: 'Processar' },
        ],
        explanation:
          'A forma de pergunta deixa claro o que `true` significa. `VerificarEstoque` é um verbo, e verbo sugere ação, não resposta.',
      },
      {
        id: 's04c01l06q2',
        type: 'single',
        prompt: 'O que o nome `Processar` costuma indicar?',
        options: [
          { id: 'a', text: 'Que o método faz coisas demais para caber em um nome específico.', correct: true },
          { id: 'b', text: 'Que o método é performático.' },
          { id: 'c', text: 'Que o método é privado.' },
          { id: 'd', text: 'Que o método é `void`.' },
        ],
        explanation:
          'A dificuldade de nomear é um sinal de projeto, não de vocabulário. Quando um método tem uma responsabilidade só, o nome costuma aparecer sozinho.',
      },
      {
        id: 's04c01l06q3',
        type: 'single',
        prompt: 'Qual é a convenção de C# para nomes de método?',
        options: [
          { id: 'a', text: 'Maiúscula inicial, com cada palavra começando em maiúscula.', correct: true },
          { id: 'b', text: 'Minúscula inicial, com cada palavra em maiúscula.' },
          { id: 'c', text: 'Tudo em minúsculas, separado por underscore.' },
          { id: 'd', text: 'Tudo em maiúsculas.' },
        ],
        explanation:
          'É a mesma convenção de propriedades e de elementos de tupla. Variáveis locais e parâmetros usam minúscula inicial, e essa diferença ajuda a ler o código.',
      },
    ],
    challenge: {
      brief:
        'Escreva três métodos bem nomeados: `EhPar` e `EhPositivo`, que respondem perguntas, e `Classificar`, que devolve uma descrição do número. Leia `q` valores e classifique cada um.',
      requirements: [
        '`EhPar` e `EhPositivo` recebem um `int` e devolvem um `bool`',
        '`Classificar` recebe um `int` e devolve uma `string`',
        'Uma linha por valor, no formato `8 -> positivo par`',
        'O valor `0` é classificado apenas como `zero`',
        'Os demais combinam `positivo` ou `negativo` com `par` ou `impar`',
        'A última linha é `Pares: k`, contando os valores pares, incluindo o zero',
        '`Classificar` deve usar `EhPar` e `EhPositivo`, sem repetir os testes',
        'Não mude as assinaturas dos três métodos',
      ],
      starterCode: `using System;

class Program
{
    static bool EhPar(int n)
    {
        return false;
    }

    static bool EhPositivo(int n)
    {
        return false;
    }

    static string Classificar(int n)
    {
        // Use EhPar e EhPositivo. O zero tem tratamento proprio.
        return "";
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int pares = 0;

        for (int i = 0; i < q; i++)
        {
            int n = int.Parse(Console.ReadLine());

            // Classifique e conte os pares
        }

        Console.WriteLine($"Pares: {pares}");
    }
}
`,
      solution: `using System;

class Program
{
    static bool EhPar(int n)
    {
        return n % 2 == 0;
    }

    static bool EhPositivo(int n)
    {
        return n > 0;
    }

    static string Classificar(int n)
    {
        if (n == 0)
        {
            return "zero";
        }

        string sinal = EhPositivo(n) ? "positivo" : "negativo";
        string paridade = EhPar(n) ? "par" : "impar";

        return $"{sinal} {paridade}";
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int pares = 0;

        for (int i = 0; i < q; i++)
        {
            int n = int.Parse(Console.ReadLine());

            Console.WriteLine($"{n} -> {Classificar(n)}");

            if (EhPar(n))
            {
                pares++;
            }
        }

        Console.WriteLine($"Pares: {pares}");
    }
}
`,
      hints: [
        '`EhPar` precisa usar `% 2 == 0`, que funciona também com negativos — `% 2 == 1` falharia para `-3`.',
        'O `Classificar` trata o zero primeiro e devolve; o resto do método só lida com valores não nulos.',
      ],
      tests: [
        {
          name: 'Positivo, negativo e zero',
          stdin: '3\n8\n-3\n0\n',
          expectedStdout:
            '8 -> positivo par\n-3 -> negativo impar\n0 -> zero\nPares: 2',
        },
        {
          name: 'Negativo par e positivo ímpar',
          stdin: '2\n-4\n7\n',
          expectedStdout: '-4 -> negativo par\n7 -> positivo impar\nPares: 1',
        },
        {
          name: 'Um valor só',
          stdin: '1\n1\n',
          expectedStdout: '1 -> positivo impar\nPares: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c01l07',
    title: 'Uma responsabilidade por método',
    objective: 'Separar cálculo de apresentação, para que cada parte possa mudar e ser reaproveitada sozinha.',
    concept: [
      {
        kind: 'text',
        body:
          'A regra mais útil sobre métodos: cada um deve ter **um motivo para mudar**. Um método que calcula um total e o imprime tem dois — a regra de negócio e o formato da saída — e vai ser editado toda vez que qualquer um dos dois mudar.',
      },
      {
        kind: 'compare',
        good: `static decimal Subtotal(int qtd, decimal preco)
{
    return qtd * preco;
}

static string Formatar(string nome, decimal valor)
{
    return $"{nome}: R$ {valor:F2}";
}`,
        bad: `static void MostrarSubtotal(
    string nome, int qtd, decimal preco)
{
    decimal total = qtd * preco;
    Console.WriteLine($"{nome}: R$ {total:F2}");
}`,
        goodLabel: 'Duas peças reaproveitáveis',
        badLabel: 'Só serve para imprimir',
      },
      {
        kind: 'text',
        body:
          'Com as duas separadas, o subtotal pode ser somado a um total geral, comparado com um limite, ou gravado em um arquivo. Com elas juntas, a única coisa possível é imprimir — e qualquer outro uso exige copiar a multiplicação para outro lugar.',
      },
      {
        kind: 'table',
        headers: ['Camada', 'Responsabilidade', 'Muda quando'],
        rows: [
          ['`Subtotal`', 'a regra de cálculo', 'a regra de negócio muda'],
          ['`Formatar`', 'como o valor aparece', 'o layout muda'],
          ['`Main`', 'a ordem das coisas', 'o fluxo muda'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O teste prático é fazer a pergunta em voz alta: "o que este método faz?". Se a resposta precisa de um "e" — "calcula o total **e** imprime" —, provavelmente são dois métodos.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Separar demais também custa. Um método de uma linha que é chamado de um lugar só, com um nome que apenas repete o corpo, adiciona indireção sem trazer nada. A regra é sobre responsabilidades diferentes, não sobre tamanho.',
      },
      {
        kind: 'text',
        body:
          'Valores monetários seguem a convenção do curso: `decimal` para o dinheiro, `F2` na exibição, e a leitura com `CultureInfo.InvariantCulture`.',
      },
    ],
    quiz: [
      {
        id: 's04c01l07q1',
        type: 'single',
        prompt: 'Qual é o sinal de que um método tem responsabilidades demais?',
        options: [
          { id: 'a', text: 'A descrição do que ele faz precisa de um "e".', correct: true },
          { id: 'b', text: 'Ele tem mais de dez linhas.' },
          { id: 'c', text: 'Ele recebe mais de dois parâmetros.' },
          { id: 'd', text: 'Ele devolve um valor.' },
        ],
        explanation:
          'Tamanho e quantidade de parâmetros são indícios fracos. O que importa é quantos motivos independentes existem para editar aquele código.',
      },
      {
        id: 's04c01l07q2',
        type: 'single',
        prompt: 'O que se ganha separando cálculo de apresentação?',
        options: [
          { id: 'a', text: 'O cálculo passa a ser reaproveitável em contextos que não imprimem.', correct: true },
          { id: 'b', text: 'O programa executa mais rápido.' },
          { id: 'c', text: 'O compilador gera menos código.' },
          { id: 'd', text: 'Os parâmetros ficam opcionais.' },
        ],
        explanation:
          'Somar, comparar, gravar, exportar: tudo isso precisa do valor, e nada disso precisa do texto formatado. Juntos, o valor fica inacessível.',
      },
      {
        id: 's04c01l07q3',
        type: 'single',
        prompt: 'Quando separar em métodos deixa de compensar?',
        options: [
          { id: 'a', text: 'Quando o método novo é chamado de um lugar só e o nome apenas repete o corpo.', correct: true },
          { id: 'b', text: 'Quando o método tem menos de cinco linhas.' },
          { id: 'c', text: 'Quando o método é `void`.' },
          { id: 'd', text: 'Nunca: separar sempre compensa.' },
        ],
        explanation:
          'Indireção tem custo de leitura. Ela se paga quando dá nome a um conceito ou elimina duplicação — não quando apenas move uma linha para outro lugar.',
      },
    ],
    challenge: {
      brief:
        'Escreva `Subtotal`, que calcula o valor de um item, e `Formatar`, que monta a linha de exibição. Leia `n` itens, cada um em três linhas — nome, quantidade e preço unitário — e produza o extrato com o total.',
      requirements: [
        '`Subtotal` recebe um `int` e um `decimal`, e devolve um `decimal`',
        '`Formatar` recebe uma `string` e um `decimal`, e devolve uma `string` no formato `Teclado: R$ 300.00`',
        'Uma linha por item, e a última linha é `Total: R$ 380.00`',
        'Todos os valores com duas casas decimais',
        'Leia os preços com `CultureInfo.InvariantCulture`',
        '`Subtotal` não formata nada, e `Formatar` não calcula nada',
        'Não mude as assinaturas dos dois métodos',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static decimal Subtotal(int quantidade, decimal preco)
    {
        return 0m;
    }

    static string Formatar(string nome, decimal valor)
    {
        return "";
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        decimal total = 0m;

        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int quantidade = int.Parse(Console.ReadLine());
            decimal preco = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);

            // Calcule, formate, imprima e acumule
        }

        Console.WriteLine(Formatar("Total", total));
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static decimal Subtotal(int quantidade, decimal preco)
    {
        return quantidade * preco;
    }

    static string Formatar(string nome, decimal valor)
    {
        return $"{nome}: R$ {valor:F2}";
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        decimal total = 0m;

        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int quantidade = int.Parse(Console.ReadLine());
            decimal preco = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);

            decimal valor = Subtotal(quantidade, preco);
            Console.WriteLine(Formatar(nome, valor));
            total += valor;
        }

        Console.WriteLine(Formatar("Total", total));
    }
}
`,
      hints: [
        'A linha do total já vem pronta no `starterCode`: ela reaproveita o mesmo `Formatar` dos itens.',
        'Guarde o retorno de `Subtotal` em uma variável — ele é usado para imprimir e para acumular.',
      ],
      tests: [
        {
          name: 'Dois itens',
          stdin: '2\nTeclado\n2\n150.00\nMouse\n1\n80.00\n',
          expectedStdout: 'Teclado: R$ 300.00\nMouse: R$ 80.00\nTotal: R$ 380.00',
        },
        {
          name: 'Preço com centavos',
          stdin: '1\nItem\n3\n9.90\n',
          expectedStdout: 'Item: R$ 29.70\nTotal: R$ 29.70',
        },
        {
          name: 'Nenhum item',
          stdin: '0\n',
          expectedStdout: 'Total: R$ 0.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c01l08',
    title: 'Extraindo método de um bloco grande',
    objective: 'Identificar um trecho coeso dentro de um bloco longo, dar nome a ele e substituí-lo por uma chamada.',
    concept: [
      {
        kind: 'text',
        body:
          'Extrair método é a refatoração mais comum que existe. Você não projeta os métodos antes: você escreve o código, percebe que um pedaço tem identidade própria, e o promove a método.',
      },
      {
        kind: 'text',
        body:
          'O processo tem quatro passos, e eles funcionam quase sempre na mesma ordem:',
      },
      {
        kind: 'table',
        headers: ['Passo', 'Pergunta'],
        rows: [
          ['1. delimitar', 'quais linhas formam uma unidade?'],
          ['2. nomear', 'que nome descreve o que elas fazem?'],
          ['3. identificar entradas', 'de quais variáveis externas elas dependem?'],
          ['4. identificar a saída', 'qual valor o resto do código precisa?'],
        ],
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Antes: tudo no Main',
          code: `int soma = a + b + c;
double media = soma / 3.0;

string situacao;
if (media >= 6)
    situacao = "APROVADO";
else
    situacao = "REPROVADO";`,
        },
        right: {
          label: 'Depois: dois métodos',
          code: `double media = Media(a, b, c);
string situacao = Situacao(media);`,
        },
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'As variáveis que o trecho **lê** viram parâmetros; a variável que ele **produz** vira o retorno. Se ele produz duas, ou vira uma tupla, ou provavelmente são dois métodos — e essa costuma ser a resposta certa.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Uma extração bem feita **não muda a saída do programa**. É por isso que ela é segura: se os testes passavam antes e continuam passando depois, a refatoração está correta. Se o resultado mudou, algo foi movido junto por engano.',
      },
      {
        kind: 'text',
        body:
          'O `Main` que sobra depois disso vira uma sequência de chamadas com nomes descritivos — praticamente uma descrição em português do que o programa faz. Esse é o objetivo.',
      },
    ],
    quiz: [
      {
        id: 's04c01l08q1',
        type: 'single',
        prompt: 'Ao extrair um trecho para um método, o que vira parâmetro?',
        options: [
          { id: 'a', text: 'As variáveis externas que o trecho lê.', correct: true },
          { id: 'b', text: 'Todas as variáveis do método original.' },
          { id: 'c', text: 'Apenas as variáveis alteradas.' },
          { id: 'd', text: 'Nenhuma: o método acessa tudo diretamente.' },
        ],
        explanation:
          'O trecho precisa receber tudo de que depende. Variáveis criadas e usadas só dentro dele permanecem locais ao método novo.',
      },
      {
        id: 's04c01l08q2',
        type: 'single',
        prompt: 'Como saber se uma extração foi feita corretamente?',
        options: [
          { id: 'a', text: 'A saída do programa continua exatamente a mesma.', correct: true },
          { id: 'b', text: 'O programa fica mais rápido.' },
          { id: 'c', text: 'O `Main` fica com menos de dez linhas.' },
          { id: 'd', text: 'O método novo tem um parâmetro só.' },
        ],
        explanation:
          'Extrair método é uma refatoração: ela muda a estrutura sem mudar o comportamento. Uma saída diferente significa que algo foi alterado além da organização.',
      },
      {
        id: 's04c01l08q3',
        type: 'single',
        prompt: 'O trecho que você quer extrair produz dois valores necessários depois. O que fazer?',
        options: [
          { id: 'a', text: 'Devolver uma tupla, ou reconsiderar se não são dois métodos.', correct: true },
          { id: 'b', text: 'Desistir da extração.' },
          { id: 'c', text: 'Imprimir os dois dentro do método.' },
          { id: 'd', text: 'Devolver o primeiro e recalcular o segundo.' },
        ],
        explanation:
          'A tupla resolve, e é o que a Seção 3 preparou. Mas dois resultados independentes costumam ser sinal de duas responsabilidades misturadas.',
      },
    ],
    challenge: {
      brief:
        'Um boletim escolar precisa ser reorganizado em métodos. Escreva `Media`, que calcula a média de três notas, e `Situacao`, que decide entre aprovado e reprovado. Leia `n` alunos, cada um em quatro linhas — nome e três notas — e produza o boletim.',
      requirements: [
        '`Media` recebe três `int` e devolve um `double`',
        '`Situacao` recebe um `double` e devolve `APROVADO` ou `REPROVADO`',
        'A média a partir de 6,0 aprova; abaixo disso reprova',
        'Uma linha por aluno, no formato `Ana: media 7.00 - APROVADO`, com duas casas decimais',
        'Depois: `Aprovados: a` e `Reprovados: r`',
        '`Situacao` recebe a média **sem arredondamento**, não o texto já formatado',
        'Não mude as assinaturas dos dois métodos',
      ],
      starterCode: `using System;

class Program
{
    static double Media(int a, int b, int c)
    {
        return 0.0;
    }

    static string Situacao(double media)
    {
        return "";
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int aprovados = 0;
        int reprovados = 0;

        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int a = int.Parse(Console.ReadLine());
            int b = int.Parse(Console.ReadLine());
            int c = int.Parse(Console.ReadLine());

            // Calcule a media, decida a situacao, imprima e conte
        }

        Console.WriteLine($"Aprovados: {aprovados}");
        Console.WriteLine($"Reprovados: {reprovados}");
    }
}
`,
      solution: `using System;

class Program
{
    static double Media(int a, int b, int c)
    {
        return (a + b + c) / 3.0;
    }

    static string Situacao(double media)
    {
        return media >= 6.0 ? "APROVADO" : "REPROVADO";
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int aprovados = 0;
        int reprovados = 0;

        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int a = int.Parse(Console.ReadLine());
            int b = int.Parse(Console.ReadLine());
            int c = int.Parse(Console.ReadLine());

            double media = Media(a, b, c);
            string situacao = Situacao(media);

            Console.WriteLine($"{nome}: media {media:F2} - {situacao}");

            if (situacao == "APROVADO")
            {
                aprovados++;
            }
            else
            {
                reprovados++;
            }
        }

        Console.WriteLine($"Aprovados: {aprovados}");
        Console.WriteLine($"Reprovados: {reprovados}");
    }
}
`,
      hints: [
        'A divisão por `3.0` é o que evita a divisão inteira: com `3` a média sairia truncada.',
        'A `Situacao` decide sobre a média cheia. Uma média de 5,67 exibida como `5.67` continua reprovando.',
      ],
      tests: [
        {
          name: 'Um aprovado e um reprovado',
          stdin: '2\nAna\n7\n7\n7\nBruno\n4\n5\n4\n',
          expectedStdout:
            'Ana: media 7.00 - APROVADO\nBruno: media 4.33 - REPROVADO\nAprovados: 1\nReprovados: 1',
        },
        {
          name: 'Média exatamente no limite aprova',
          stdin: '1\nCarla\n6\n6\n6\n',
          expectedStdout: 'Carla: media 6.00 - APROVADO\nAprovados: 1\nReprovados: 0',
        },
        {
          name: 'Média logo abaixo do limite',
          stdin: '1\nDiego\n5\n6\n6\n',
          expectedStdout: 'Diego: media 5.67 - REPROVADO\nAprovados: 0\nReprovados: 1',
        },
        {
          name: 'Nota máxima',
          stdin: '1\nSolo\n10\n10\n10\n',
          expectedStdout: 'Solo: media 10.00 - APROVADO\nAprovados: 1\nReprovados: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c01l09',
    title: 'Prática: biblioteca de utilidades',
    objective: 'Construir métodos pequenos e genéricos que se apoiam uns nos outros, como uma caixa de ferramentas.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma biblioteca de utilidades é um conjunto de métodos pequenos, sem contexto de negócio, que servem em qualquer programa. `Maximo`, `Minimo` e `Clamp` são os exemplos mais universais.',
      },
      {
        kind: 'code',
        code: `static int Maximo(int a, int b)
{
    return a > b ? a : b;
}

static int Minimo(int a, int b)
{
    return a < b ? a : b;
}

static int Clamp(int valor, int min, int max)
{
    return Maximo(min, Minimo(valor, max));
}`,
        caption: '`Clamp` não repete nenhuma comparação: ele compõe os dois anteriores.',
      },
      {
        kind: 'text',
        body:
          'A composição de `Clamp` merece atenção. `Minimo(valor, max)` corta o excesso por cima; `Maximo(min, ...)` levanta o que ficou abaixo do piso. Duas chamadas em sequência resolvem os dois limites.',
      },
      {
        kind: 'table',
        headers: ['`valor`', 'Faixa', '`Minimo(valor, max)`', '`Clamp`'],
        rows: [
          ['`15`', '`[0, 10]`', '`10`', '`10`'],
          ['`5`', '`[0, 10]`', '`5`', '`5`'],
          ['`-2`', '`[0, 10]`', '`-2`', '`0`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Métodos utilitários são os mais fáceis de testar do programa inteiro: eles não dependem de nada externo, não têm estado, e a mesma entrada sempre produz a mesma saída. Toda lógica que puder assumir essa forma fica mais simples de verificar.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A ordem das chamadas em `Clamp` importa quando o mínimo é maior que o máximo — uma faixa inválida. Nesse caso o resultado passa a ser o `min`, o que é uma escolha, não uma verdade. Utilitários devem documentar o que fazem em entradas absurdas.',
      },
      {
        kind: 'text',
        body:
          'O .NET já traz `Math.Max`, `Math.Min` e `Math.Clamp` prontos. Escrevê-los aqui é sobre entender a composição — na prática, os da biblioteca padrão são a escolha certa.',
      },
    ],
    quiz: [
      {
        id: 's04c01l09q1',
        type: 'single',
        prompt: 'Quanto vale `Clamp(-2, 0, 10)`?',
        options: [
          { id: 'a', code: '0', correct: true },
          { id: 'b', code: '-2' },
          { id: 'c', code: '10' },
          { id: 'd', code: '2' },
        ],
        explanation:
          '`Minimo(-2, 10)` devolve `-2`, e `Maximo(0, -2)` levanta para `0`. O valor é puxado para o limite mais próximo da faixa.',
      },
      {
        id: 's04c01l09q2',
        type: 'single',
        prompt: 'Por que `Clamp` chama `Maximo` e `Minimo` em vez de escrever as comparações?',
        options: [
          { id: 'a', text: 'Porque a lógica de comparação já existe e não precisa ser duplicada.', correct: true },
          { id: 'b', text: 'Porque é mais rápido.' },
          { id: 'c', text: 'Porque ternários não podem ser aninhados.' },
          { id: 'd', text: 'Porque `Clamp` não pode ter `if`.' },
        ],
        explanation:
          'É a mesma razão de `ContarPrimos` chamar `EhPrimo`: a regra vive em um lugar só, e a composição comunica melhor a intenção.',
      },
      {
        id: 's04c01l09q3',
        type: 'single',
        prompt: 'Por que métodos utilitários são fáceis de testar?',
        options: [
          { id: 'a', text: 'Porque não dependem de estado externo: a mesma entrada dá sempre a mesma saída.', correct: true },
          { id: 'b', text: 'Porque são curtos.' },
          { id: 'c', text: 'Porque devolvem `int`.' },
          { id: 'd', text: 'Porque não têm parâmetros.' },
        ],
        explanation:
          'Sem dependências externas, testar é chamar e comparar. Métodos que leem o relógio, o console ou um arquivo exigem preparar o ambiente antes.',
      },
    ],
    challenge: {
      brief:
        'Monte uma pequena biblioteca com quatro métodos: `Maximo`, `Minimo`, `Clamp` e `NoIntervalo`. Leia `q` consultas, cada uma em três linhas — valor, mínimo e máximo — e aplique os utilitários.',
      requirements: [
        '`Maximo` e `Minimo` recebem dois `int` e devolvem um `int`',
        '`Clamp` recebe três `int` e devolve um `int`, usando `Maximo` e `Minimo`',
        '`NoIntervalo` recebe três `int` e devolve um `bool`',
        'Uma linha por consulta, no formato `15 em [0,10] -> clamp 10, dentro False`',
        'Um valor igual ao mínimo ou ao máximo está dentro do intervalo',
        'A última linha é `Ajustados: k`, contando as consultas em que o `Clamp` mudou o valor',
        'Não mude as assinaturas dos quatro métodos',
      ],
      starterCode: `using System;

class Program
{
    static int Maximo(int a, int b)
    {
        return 0;
    }

    static int Minimo(int a, int b)
    {
        return 0;
    }

    static int Clamp(int valor, int min, int max)
    {
        // Componha Maximo e Minimo
        return 0;
    }

    static bool NoIntervalo(int valor, int min, int max)
    {
        return false;
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int ajustados = 0;

        for (int i = 0; i < q; i++)
        {
            int valor = int.Parse(Console.ReadLine());
            int min = int.Parse(Console.ReadLine());
            int max = int.Parse(Console.ReadLine());

            // Aplique os utilitarios e conte os ajustes
        }

        Console.WriteLine($"Ajustados: {ajustados}");
    }
}
`,
      solution: `using System;

class Program
{
    static int Maximo(int a, int b)
    {
        return a > b ? a : b;
    }

    static int Minimo(int a, int b)
    {
        return a < b ? a : b;
    }

    static int Clamp(int valor, int min, int max)
    {
        return Maximo(min, Minimo(valor, max));
    }

    static bool NoIntervalo(int valor, int min, int max)
    {
        return valor >= min && valor <= max;
    }

    static void Main()
    {
        int q = int.Parse(Console.ReadLine());
        int ajustados = 0;

        for (int i = 0; i < q; i++)
        {
            int valor = int.Parse(Console.ReadLine());
            int min = int.Parse(Console.ReadLine());
            int max = int.Parse(Console.ReadLine());

            int limitado = Clamp(valor, min, max);
            bool dentro = NoIntervalo(valor, min, max);

            Console.WriteLine($"{valor} em [{min},{max}] -> clamp {limitado}, dentro {dentro}");

            if (limitado != valor)
            {
                ajustados++;
            }
        }

        Console.WriteLine($"Ajustados: {ajustados}");
    }
}
`,
      hints: [
        '`Clamp` é `Maximo(min, Minimo(valor, max))` — a chamada interna corta o excesso, a externa levanta o que faltou.',
        'Um valor foi ajustado quando o resultado do `Clamp` é diferente do valor original.',
      ],
      tests: [
        {
          name: 'Acima, dentro e abaixo',
          stdin: '3\n15\n0\n10\n5\n0\n10\n-2\n0\n10\n',
          expectedStdout:
            '15 em [0,10] -> clamp 10, dentro False\n5 em [0,10] -> clamp 5, dentro True\n' +
            '-2 em [0,10] -> clamp 0, dentro False\nAjustados: 2',
        },
        {
          name: 'Valores exatamente nos limites',
          stdin: '2\n0\n0\n10\n10\n0\n10\n',
          expectedStdout:
            '0 em [0,10] -> clamp 0, dentro True\n10 em [0,10] -> clamp 10, dentro True\nAjustados: 0',
        },
        {
          name: 'Faixa de um valor só',
          stdin: '1\n7\n7\n7\n',
          expectedStdout: '7 em [7,7] -> clamp 7, dentro True\nAjustados: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's04c01l10',
    title: 'Checkpoint: métodos',
    objective: 'Decompor uma análise de texto em métodos que se apoiam uns nos outros, cada um com uma responsabilidade.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint pede quatro métodos que formam uma cadeia: um normaliza o texto, dois analisam o texto normalizado, e o quarto usa um dos anteriores para responder uma pergunta.',
      },
      {
        kind: 'table',
        headers: ['Método', 'Devolve', 'Depende de'],
        rows: [
          ['`Normalizar`', 'texto sem espaços, em minúsculas', 'nada'],
          ['`ContarVogais`', 'quantidade de vogais', 'nada'],
          ['`Inverter`', 'texto de trás para frente', 'nada'],
          ['`EhPalindromo`', '`bool`', '`Normalizar` e `Inverter`'],
        ],
      },
      {
        kind: 'code',
        code: `static bool EhPalindromo(string texto)
{
    string limpo = Normalizar(texto);
    return limpo == Inverter(limpo);
}`,
        caption: 'Um método de duas linhas que só existe porque os outros dois existem.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que `EhPalindromo` não sabe comparar nada caractere a caractere — ele delega tudo. Essa é a forma final da decomposição: o método de mais alto nível é o mais curto e o mais legível do programa.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Normalizar **antes** de qualquer análise é o que faz `Ame a ema` ser reconhecido como palíndromo. Sem isso, os espaços e a maiúscula quebram a comparação, e o método responderia `false` a um palíndromo legítimo.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Escreva e teste um método por vez, começando por `Normalizar`. Os outros três dependem dele estar certo, e um erro ali contamina todas as respostas de uma vez.',
      },
    ],
    quiz: [
      {
        id: 's04c01l10q1',
        type: 'single',
        prompt: 'Por que `EhPalindromo` normaliza antes de comparar?',
        options: [
          { id: 'a', text: 'Para que espaços e maiúsculas não impeçam o reconhecimento.', correct: true },
          { id: 'b', text: 'Para deixar a comparação mais rápida.' },
          { id: 'c', text: 'Porque `Inverter` só aceita minúsculas.' },
          { id: 'd', text: 'Para reduzir o uso de memória.' },
        ],
        explanation:
          '`Ame a ema` invertido literalmente é `ame a emA` com a maiúscula no lugar errado. A normalização remove as diferenças que não interessam à pergunta.',
      },
      {
        id: 's04c01l10q2',
        type: 'single',
        prompt: 'Quantas vogais tem o texto `Ame a ema` depois de normalizado?',
        options: [
          { id: 'a', code: '5', correct: true },
          { id: 'b', code: '4' },
          { id: 'c', code: '3' },
          { id: 'd', code: '7' },
        ],
        explanation:
          'Normalizado ele vira `ameaema`: as vogais são `a`, `e`, `a`, `e`, `a`. Os espaços saíram e não contam.',
      },
      {
        id: 's04c01l10q3',
        type: 'single',
        prompt: 'O que caracteriza um método de alto nível bem decomposto?',
        options: [
          { id: 'a', text: 'Ele é curto e delega o trabalho para métodos com nomes descritivos.', correct: true },
          { id: 'b', text: 'Ele tem muitos parâmetros.' },
          { id: 'c', text: 'Ele faz todo o trabalho sozinho para evitar chamadas.' },
          { id: 'd', text: 'Ele é `void`.' },
        ],
        explanation:
          'Um método de alto nível descreve a estratégia; os de baixo nível executam os detalhes. Quando isso funciona, o de cima se lê quase como texto.',
      },
    ],
    challenge: {
      brief:
        'Analise textos com quatro métodos encadeados: `Normalizar` remove espaços e converte para minúsculas, `ContarVogais` conta as vogais, `Inverter` devolve o texto de trás para frente, e `EhPalindromo` usa os outros para decidir. Leia `n` textos e produza o relatório de cada um.',
      requirements: [
        '`Normalizar` recebe e devolve uma `string`, removendo espaços e passando para minúsculas',
        '`ContarVogais` recebe uma `string` e devolve um `int`, contando `a`, `e`, `i`, `o` e `u`',
        '`Inverter` recebe e devolve uma `string`',
        '`EhPalindromo` recebe uma `string` e devolve um `bool`, usando `Normalizar` e `Inverter`',
        'Uma linha por texto, no formato `arara -> normalizado: arara, vogais: 3, invertido: arara, palindromo: True`',
        'As vogais e a inversão são calculadas sobre o texto **normalizado**',
        'A última linha é `Palindromos: k`',
        'Não mude as assinaturas dos quatro métodos',
      ],
      starterCode: `using System;

class Program
{
    static string Normalizar(string texto)
    {
        // Minusculas e sem espacos
        return "";
    }

    static int ContarVogais(string texto)
    {
        return 0;
    }

    static string Inverter(string texto)
    {
        return "";
    }

    static bool EhPalindromo(string texto)
    {
        // Use Normalizar e Inverter
        return false;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int palindromos = 0;

        for (int i = 0; i < n; i++)
        {
            string texto = Console.ReadLine();

            // Monte a linha do relatorio e conte os palindromos
        }

        Console.WriteLine($"Palindromos: {palindromos}");
    }
}
`,
      solution: `using System;

class Program
{
    static string Normalizar(string texto)
    {
        string resultado = "";

        foreach (char c in texto.ToLower())
        {
            if (c != ' ')
            {
                resultado += c;
            }
        }

        return resultado;
    }

    static int ContarVogais(string texto)
    {
        int total = 0;

        foreach (char c in texto)
        {
            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
            {
                total++;
            }
        }

        return total;
    }

    static string Inverter(string texto)
    {
        string resultado = "";

        for (int i = texto.Length - 1; i >= 0; i--)
        {
            resultado += texto[i];
        }

        return resultado;
    }

    static bool EhPalindromo(string texto)
    {
        string limpo = Normalizar(texto);
        return limpo == Inverter(limpo);
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int palindromos = 0;

        for (int i = 0; i < n; i++)
        {
            string texto = Console.ReadLine();

            string limpo = Normalizar(texto);
            bool palindromo = EhPalindromo(texto);

            Console.WriteLine(
                $"{texto} -> normalizado: {limpo}, vogais: {ContarVogais(limpo)}, " +
                $"invertido: {Inverter(limpo)}, palindromo: {palindromo}");

            if (palindromo)
            {
                palindromos++;
            }
        }

        Console.WriteLine($"Palindromos: {palindromos}");
    }
}
`,
      hints: [
        'O `Normalizar` pode percorrer `texto.ToLower()` e montar uma `string` nova pulando os espaços.',
        'O `Inverter` é o laço decrescente da Seção 2 concatenando caractere a caractere.',
      ],
      tests: [
        {
          name: 'Palíndromos com e sem espaço',
          stdin: '3\narara\nAme a ema\nteste\n',
          expectedStdout:
            'arara -> normalizado: arara, vogais: 3, invertido: arara, palindromo: True\n' +
            'Ame a ema -> normalizado: ameaema, vogais: 5, invertido: ameaema, palindromo: True\n' +
            'teste -> normalizado: teste, vogais: 2, invertido: etset, palindromo: False\n' +
            'Palindromos: 2',
        },
        {
          name: 'Texto sem palíndromo',
          stdin: '1\nabc\n',
          expectedStdout:
            'abc -> normalizado: abc, vogais: 1, invertido: cba, palindromo: False\nPalindromos: 0',
        },
        {
          name: 'Espaços e maiúsculas somem na normalização',
          stdin: '2\nA A\nxyz\n',
          expectedStdout:
            'A A -> normalizado: aa, vogais: 2, invertido: aa, palindromo: True\n' +
            'xyz -> normalizado: xyz, vogais: 0, invertido: zyx, palindromo: False\n' +
            'Palindromos: 1',
          hidden: true,
        },
      ],
    },
  },
]
