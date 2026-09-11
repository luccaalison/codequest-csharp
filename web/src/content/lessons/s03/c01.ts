import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's03c01l01',
    title: 'Declarando um array',
    objective: 'Criar uma coleção de tamanho fixo sob um único nome, entendendo os valores padrão e o índice do último elemento.',
    concept: [
      {
        kind: 'text',
        body:
          'Na Seção 2 você guardou uma janela móvel em duas variáveis e concluiu que uma janela de 30 seria impraticável. O **array** resolve isso: muitos valores do mesmo tipo, sob um nome só, acessados por posição.',
      },
      {
        kind: 'code',
        code: `int[] numeros = new int[5];   // 5 posicoes, todas zeradas

numeros[0] = 10;              // primeira posicao
numeros[4] = 50;              // ultima posicao

Console.WriteLine(numeros.Length);   // 5`,
        caption: 'O tipo é `int[]`: "array de int". O tamanho vai entre colchetes no `new`.',
      },
      {
        kind: 'text',
        body:
          'Um array nasce **preenchido** com o valor padrão do seu tipo. Isso é diferente de uma variável comum, que o compilador obriga você a inicializar antes de usar.',
      },
      {
        kind: 'table',
        headers: ['Tipo', 'Valor padrão'],
        rows: [
          ['`int`, `long`', '`0`'],
          ['`double`, `decimal`', '`0`'],
          ['`bool`', '`false`'],
          ['`char`', '`\\0`'],
          ['`string`', '`null`'],
        ],
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Tamanho definido em tempo de execução',
          code: `int n = int.Parse(Console.ReadLine());
int[] valores = new int[n];`,
        },
        right: {
          label: 'Valores conhecidos na hora de escrever',
          code: `int[] valores = { 3, 1, 4, 1, 5 };
// o tamanho vem da lista: 5`,
        },
        note: 'As duas formas produzem o mesmo tipo. A da esquerda é a que você vai usar ao ler dados.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O tamanho é **fixo** depois do `new`. Não existe "adicionar mais um" em um array: para crescer, é preciso criar outro maior e copiar. A coleção que cresce sozinha é a `List<T>`, do próximo capítulo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Como os índices começam em 0, o último é sempre `Length - 1`. Escrever `numeros[numeros.Length]` é o erro mais comum de quem está começando, e ele derruba o programa — assunto da próxima lição.',
      },
    ],
    quiz: [
      {
        id: 's03c01l01q1',
        type: 'single',
        prompt: 'Qual é o maior índice válido de `new int[5]`?',
        options: [
          { id: 'a', code: '4', correct: true },
          { id: 'b', code: '5' },
          { id: 'c', code: '6' },
          { id: 'd', text: 'Depende do que foi guardado nele.' },
        ],
        explanation:
          'São 5 posições numeradas de 0 a 4. O `Length` é 5, e o último índice é sempre `Length - 1`.',
      },
      {
        id: 's03c01l01q2',
        type: 'single',
        prompt: 'O que contém `new bool[3]` logo depois de criado?',
        options: [
          { id: 'a', text: 'Três `false`.', correct: true },
          { id: 'b', text: 'Três `true`.' },
          { id: 'c', text: 'Lixo de memória.' },
          { id: 'd', text: 'Nada: é preciso preencher antes de usar.' },
        ],
        explanation:
          'Todo array nasce preenchido com o valor padrão do tipo. Para `bool` isso é `false`; para os numéricos, `0`.',
      },
      {
        id: 's03c01l01q3',
        type: 'single',
        prompt: 'Como aumentar um array de 5 para 6 posições?',
        options: [
          { id: 'a', text: 'Não dá: é preciso criar um array novo e copiar o conteúdo.', correct: true },
          { id: 'b', text: 'Atribuindo `6` ao `Length`.' },
          { id: 'c', text: 'Chamando `Add` no array.' },
          { id: 'd', text: 'Atribuindo um valor à posição 5.' },
        ],
        explanation:
          'O tamanho de um array é definido no `new` e nunca muda. `Length` é somente leitura, e não existe `Add`. É exatamente essa limitação que a `List<T>` remove.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e depois um `valor`. Crie um array de `n` inteiros, mostre o conteúdo padrão, guarde o `valor` na **última** posição e mostre o conteúdo de novo.',
      requirements: [
        'Linha 1: `Tamanho: n`, usando a propriedade `Length`',
        'Linha 2: `Padrao: 0 0 0 0`, com os elementos separados por espaço',
        'Linha 3: `Alterado: 0 0 0 9`, depois de gravar o valor na última posição',
        'Linha 4: `Ultimo indice: i`',
        'Descubra o último índice a partir de `Length`, não do `n` lido',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int valor = int.Parse(Console.ReadLine());

        int[] numeros = new int[n];

        // Mostre o padrao, grave o valor no fim, mostre de novo
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int valor = int.Parse(Console.ReadLine());

        int[] numeros = new int[n];

        Console.WriteLine($"Tamanho: {numeros.Length}");

        string padrao = "";
        for (int i = 0; i < numeros.Length; i++)
        {
            padrao += $"{numeros[i]} ";
        }

        Console.WriteLine($"Padrao: {padrao}");

        numeros[numeros.Length - 1] = valor;

        string alterado = "";
        for (int i = 0; i < numeros.Length; i++)
        {
            alterado += $"{numeros[i]} ";
        }

        Console.WriteLine($"Alterado: {alterado}");
        Console.WriteLine($"Ultimo indice: {numeros.Length - 1}");
    }
}
`,
      hints: [
        'Monte cada linha acumulando em uma `string`, como você fez nos painéis da Seção 2.',
        'A última posição é `numeros[numeros.Length - 1]`.',
      ],
      tests: [
        {
          name: 'Quatro posições',
          stdin: '4\n9\n',
          expectedStdout: 'Tamanho: 4\nPadrao: 0 0 0 0\nAlterado: 0 0 0 9\nUltimo indice: 3',
        },
        {
          name: 'Uma posição só',
          stdin: '1\n5\n',
          expectedStdout: 'Tamanho: 1\nPadrao: 0\nAlterado: 5\nUltimo indice: 0',
        },
        {
          name: 'Valor negativo',
          stdin: '3\n-2\n',
          expectedStdout: 'Tamanho: 3\nPadrao: 0 0 0\nAlterado: 0 0 -2\nUltimo indice: 2',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c01l02',
    title: 'Índices e limites',
    objective: 'Reconhecer a faixa válida de índices e proteger o acesso antes de ele derrubar o programa.',
    concept: [
      {
        kind: 'text',
        body:
          'Acessar uma posição que não existe não devolve um valor estranho: **derruba o programa**. É um dos poucos erros do C# que só aparecem quando o código já está rodando.',
      },
      {
        kind: 'code',
        code: `int[] a = new int[3];
Console.WriteLine("antes");
Console.WriteLine(a[5]);      // explode aqui
Console.WriteLine("depois");  // nunca executa`,
      },
      {
        kind: 'output',
        code: `antes
[erro em tempo de execução] IndexOutOfRangeException: Index was outside the bounds of the array.
Dica: você acessou uma posição que não existe. Índices válidos vão de 0 até Length - 1.`,
        caption: 'A linha "antes" saiu; a partir da falha, nada mais roda.',
      },
      {
        kind: 'text',
        body:
          'A faixa válida é sempre `0` até `Length - 1`. Qualquer índice negativo ou maior ou igual a `Length` é inválido, e a guarda que protege os dois casos é uma condição composta.',
      },
      {
        kind: 'code',
        code: `if (indice >= 0 && indice < valores.Length)
{
    Console.WriteLine(valores[indice]);
}
else
{
    Console.WriteLine("fora dos limites");
}`,
        caption: 'Sempre as duas pontas: nem só o limite de cima, nem só o de baixo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A comparação de cima é `<` e nunca `<=`. Usar `indice <= valores.Length` deixa passar exatamente o índice que não existe — o erro de um a mais, agora com consequência de exceção em vez de resposta errada.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O `&&` faz curto-circuito, então a ordem protege: se você escrever `valores[indice] > 0 && indice < valores.Length`, o acesso acontece **antes** do teste e o programa quebra. A guarda vem sempre primeiro.',
      },
      {
        kind: 'table',
        headers: ['`indice`', 'Array de tamanho 4', 'Resultado'],
        rows: [
          ['`0`', 'válido', 'primeiro elemento'],
          ['`3`', 'válido', 'último elemento'],
          ['`4`', 'inválido', 'exceção'],
          ['`-1`', 'inválido', 'exceção'],
        ],
      },
    ],
    quiz: [
      {
        id: 's03c01l02q1',
        type: 'single',
        prompt: 'Qual guarda protege corretamente o acesso a `v[i]`?',
        options: [
          { id: 'a', code: 'i >= 0 && i < v.Length', correct: true },
          { id: 'b', code: 'i >= 0 && i <= v.Length' },
          { id: 'c', code: 'i > 0 && i < v.Length' },
          { id: 'd', code: 'i < v.Length' },
        ],
        explanation:
          'A alternativa com `<=` libera o índice `Length`, que não existe. A com `> 0` bloqueia o índice 0, que é válido. A última esquece os negativos.',
      },
      {
        id: 's03c01l02q2',
        type: 'single',
        prompt: 'O que acontece com o programa depois de um `IndexOutOfRangeException` não tratado?',
        options: [
          { id: 'a', text: 'Ele encerra na hora; as linhas seguintes não executam.', correct: true },
          { id: 'b', text: 'Ele continua, usando `0` como valor.' },
          { id: 'c', text: 'Ele continua, pulando só aquela linha.' },
          { id: 'd', text: 'Ele nem chega a compilar.' },
        ],
        explanation:
          'O que já foi impresso permanece na saída, mas a execução para no ponto da falha. Como é erro de tempo de execução, a compilação passa normalmente.',
      },
      {
        id: 's03c01l02q3',
        type: 'single',
        prompt: 'Por que a guarda precisa vir antes do acesso na mesma condição?',
        options: [
          { id: 'a', text: 'Porque o `&&` avalia da esquerda para a direita e para no primeiro `false`.', correct: true },
          { id: 'b', text: 'Porque o C# reordena condições automaticamente.' },
          { id: 'c', text: 'Por questão de legibilidade apenas.' },
          { id: 'd', text: 'Não precisa: a ordem é indiferente.' },
        ],
        explanation:
          'É o curto-circuito que você viu na Seção 1, agora protegendo contra uma exceção em vez de contra uma divisão por zero. Com a ordem invertida, o acesso inválido acontece antes de o teste ter chance de barrá-lo.',
      },
    ],
    challenge: {
      brief:
        'Crie um array de `n` inteiros em que a posição `i` guarda o valor `i * 10`. Depois leia `q` consultas, cada uma um índice, e responda com o valor guardado ou com um aviso, sem deixar o programa quebrar.',
      requirements: [
        'A primeira linha da entrada é `n`, e a segunda é `q`',
        'Cada consulta gera uma linha `3 -> 30` quando o índice é válido',
        'Índices inválidos geram `4 -> fora dos limites`',
        'Índices negativos também são inválidos',
        'Depois das consultas: `Validos: v` e `Invalidos: i`',
        'O programa não pode encerrar com exceção em nenhum caso',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int q = int.Parse(Console.ReadLine());

        int[] valores = new int[n];

        // Preencha valores[i] com i * 10

        int validos = 0;
        int invalidos = 0;

        // Responda as q consultas, sempre com guarda

        Console.WriteLine($"Validos: {validos}");
        Console.WriteLine($"Invalidos: {invalidos}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int q = int.Parse(Console.ReadLine());

        int[] valores = new int[n];

        for (int i = 0; i < valores.Length; i++)
        {
            valores[i] = i * 10;
        }

        int validos = 0;
        int invalidos = 0;

        for (int k = 0; k < q; k++)
        {
            int indice = int.Parse(Console.ReadLine());

            if (indice >= 0 && indice < valores.Length)
            {
                Console.WriteLine($"{indice} -> {valores[indice]}");
                validos++;
            }
            else
            {
                Console.WriteLine($"{indice} -> fora dos limites");
                invalidos++;
            }
        }

        Console.WriteLine($"Validos: {validos}");
        Console.WriteLine($"Invalidos: {invalidos}");
    }
}
`,
      hints: [
        'São dois laços independentes: um preenche o array, o outro responde as consultas.',
        'A guarda é `indice >= 0 && indice < valores.Length`, e o acesso só acontece dentro dela.',
      ],
      tests: [
        {
          name: 'Consultas válidas e inválidas',
          stdin: '4\n4\n0\n3\n4\n-1\n',
          expectedStdout:
            '0 -> 0\n3 -> 30\n4 -> fora dos limites\n-1 -> fora dos limites\nValidos: 2\nInvalidos: 2',
        },
        {
          name: 'Array de uma posição',
          stdin: '1\n2\n0\n1\n',
          expectedStdout: '0 -> 0\n1 -> fora dos limites\nValidos: 1\nInvalidos: 1',
        },
        {
          name: 'Último índice válido e vizinhos',
          stdin: '5\n3\n4\n5\n-3\n',
          expectedStdout:
            '4 -> 40\n5 -> fora dos limites\n-3 -> fora dos limites\nValidos: 1\nInvalidos: 2',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c01l03',
    title: 'Length e percursos',
    objective: 'Percorrer um array nos dois sentidos usando `Length` como limite, em vez de repetir o tamanho à mão.',
    concept: [
      {
        kind: 'text',
        body:
          'Todo array carrega o próprio tamanho em `Length`. Usar essa propriedade em vez de repetir o número no código é o que faz o laço continuar correto quando o tamanho muda.',
      },
      {
        kind: 'compare',
        good: `for (int i = 0; i < v.Length; i++)
{
    Console.Write(v[i] + " ");
}`,
        bad: `for (int i = 0; i < 5; i++)
{
    Console.Write(v[i] + " ");
}`,
        goodLabel: 'Vale para qualquer tamanho',
        badLabel: 'Quebra se o array não tiver 5',
      },
      {
        kind: 'text',
        body:
          'O percurso de trás para frente é o mesmo laço decrescente da Seção 2, com os limites do array: começa em `Length - 1` e vai até `0`, inclusive.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Do início ao fim',
          code: `for (int i = 0; i < v.Length; i++)
{
    // v[i]
}`,
        },
        right: {
          label: 'Do fim ao início',
          code: `for (int i = v.Length - 1; i >= 0; i--)
{
    // v[i]
}`,
        },
        note: 'As três peças invertem juntas: início, condição e passo — como na contagem regressiva.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`Length` é uma **propriedade**, não um método: escreve-se `v.Length`, sem parênteses. Em `string` o nome é o mesmo, mas em `List<T>` a propriedade equivalente se chama `Count` — uma inconsistência do .NET que confunde todo mundo no começo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um array de tamanho 0 é perfeitamente válido. O laço simplesmente não roda, e todo código escrito com `i < v.Length` já trata esse caso sem nenhuma condição extra.',
      },
    ],
    quiz: [
      {
        id: 's03c01l03q1',
        type: 'single',
        prompt: 'Qual laço percorre um array de trás para frente sem estourar os limites?',
        options: [
          { id: 'a', code: 'for (int i = v.Length - 1; i >= 0; i--)', correct: true },
          { id: 'b', code: 'for (int i = v.Length; i >= 0; i--)' },
          { id: 'c', code: 'for (int i = v.Length - 1; i > 0; i--)' },
          { id: 'd', code: 'for (int i = v.Length; i > 0; i--)' },
        ],
        explanation:
          'A segunda começa em um índice inexistente. A terceira nunca chega ao elemento 0. A quarta também começa fora dos limites.',
      },
      {
        id: 's03c01l03q2',
        type: 'single',
        prompt: 'Por que usar `v.Length` em vez do número que você digitou no `new`?',
        options: [
          { id: 'a', text: 'Porque o laço continua correto se o tamanho mudar, sem edições em dois lugares.', correct: true },
          { id: 'b', text: 'Porque `Length` é mais rápido.' },
          { id: 'c', text: 'Porque números literais não são permitidos em condições.' },
          { id: 'd', text: 'É indiferente.' },
        ],
        explanation:
          'Repetir o tamanho cria duas fontes de verdade que podem discordar. `Length` sempre reflete o array de verdade, inclusive quando ele vem de uma entrada.',
      },
      {
        id: 's03c01l03q3',
        type: 'single',
        prompt: 'Quantas voltas dá `for (int i = 0; i < v.Length; i++)` num array de tamanho 0?',
        options: [
          { id: 'a', code: '0', correct: true },
          { id: 'b', code: '1' },
          { id: 'c', text: 'Lança exceção.' },
          { id: 'd', text: 'Laço infinito.' },
        ],
        explanation:
          'A condição `0 < 0` já é falsa. Arrays vazios são válidos e não precisam de tratamento especial em laços escritos assim.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` valores para dentro de um array. Mostre o conteúdo do início ao fim, depois do fim ao início, e informe a soma e o tamanho.',
      requirements: [
        'Linha 1: `Direto: 3 1 4 1 5`, com os elementos separados por espaço',
        'Linha 2: `Inverso: 5 1 4 1 3`',
        'Linha 3: `Soma: X`',
        'Linha 4: `Tamanho: t`, vindo de `Length`',
        'Com `n` igual a 0, as duas listas saem vazias, a soma é `0` e o tamanho é `0`',
        'Use `v.Length` nos laços, não o `n` lido',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] v = new int[n];

        // Preencha o array lendo n valores

        string direto = "";
        string inverso = "";
        int soma = 0;

        // Percorra nos dois sentidos e acumule a soma

        Console.WriteLine($"Direto: {direto}");
        Console.WriteLine($"Inverso: {inverso}");
        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Tamanho: {v.Length}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] v = new int[n];

        for (int i = 0; i < v.Length; i++)
        {
            v[i] = int.Parse(Console.ReadLine());
        }

        string direto = "";
        string inverso = "";
        int soma = 0;

        for (int i = 0; i < v.Length; i++)
        {
            direto += $"{v[i]} ";
            soma += v[i];
        }

        for (int i = v.Length - 1; i >= 0; i--)
        {
            inverso += $"{v[i]} ";
        }

        Console.WriteLine($"Direto: {direto}");
        Console.WriteLine($"Inverso: {inverso}");
        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Tamanho: {v.Length}");
    }
}
`,
      hints: [
        'O laço direto pode montar a lista e acumular a soma ao mesmo tempo.',
        'O laço inverso começa em `v.Length - 1` e a condição é `i >= 0`.',
      ],
      tests: [
        {
          name: 'Cinco valores',
          stdin: '5\n3\n1\n4\n1\n5\n',
          expectedStdout: 'Direto: 3 1 4 1 5\nInverso: 5 1 4 1 3\nSoma: 14\nTamanho: 5',
        },
        {
          name: 'Um valor só',
          stdin: '1\n7\n',
          expectedStdout: 'Direto: 7\nInverso: 7\nSoma: 7\nTamanho: 1',
        },
        {
          name: 'Array vazio',
          stdin: '0\n',
          expectedStdout: 'Direto:\nInverso:\nSoma: 0\nTamanho: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c01l04',
    title: 'foreach',
    objective: 'Percorrer uma coleção sem índice, e reconhecer quando o `foreach` não serve.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando o índice não interessa — só os valores —, o `foreach` diz isso diretamente. Ele elimina o contador, a condição e o incremento, que são exatamente as três peças onde moram os erros de limite.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'for: precisa do índice',
          code: `for (int i = 0; i < v.Length; i++)
{
    soma += v[i];
}`,
        },
        right: {
          label: 'foreach: só os valores',
          code: `foreach (int atual in v)
{
    soma += atual;
}`,
        },
        note: 'O mesmo resultado, sem nenhuma chance de estourar os limites.',
      },
      {
        kind: 'text',
        body:
          'A variável do `foreach` é uma **cópia** do elemento. Atribuir a ela não altera o array — na verdade o compilador nem deixa: a variável de iteração é somente leitura.',
      },
      {
        kind: 'compare',
        good: `for (int i = 0; i < v.Length; i++)
{
    v[i] = v[i] * 2;
}`,
        bad: `foreach (int atual in v)
{
    atual = atual * 2;   // nao compila
}`,
        goodLabel: 'Para modificar, use `for`',
        badLabel: '`foreach` é só leitura',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Escolha'],
        rows: [
          ['só ler os valores', '`foreach`'],
          ['precisar da posição', '`for`'],
          ['modificar os elementos', '`for`'],
          ['percorrer de trás para frente', '`for`'],
          ['comparar com o elemento vizinho', '`for`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O `foreach` funciona igual em array, `List`, `Dictionary` e em todas as coleções que ainda vêm nesta seção. É a única forma de percurso que não muda quando você troca a estrutura de dados.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Modificar a **coleção** durante um `foreach` — adicionar ou remover itens — lança exceção em `List` e `Dictionary`. Arrays não têm esse problema porque não mudam de tamanho, mas o hábito de não mexer enquanto percorre vale para todas.',
      },
    ],
    quiz: [
      {
        id: 's03c01l04q1',
        type: 'single',
        prompt: 'O que acontece com o array depois deste trecho?',
        code: `int[] v = { 1, 2, 3 };
foreach (int x in v)
{
    x = x * 10;
}`,
        options: [
          { id: 'a', text: 'Não compila: a variável do `foreach` é somente leitura.', correct: true },
          { id: 'b', text: 'O array vira `{ 10, 20, 30 }`.' },
          { id: 'c', text: 'O array continua `{ 1, 2, 3 }`, sem erro.' },
          { id: 'd', text: 'Lança exceção em tempo de execução.' },
        ],
        explanation:
          'O compilador impede a atribuição justamente para você não achar que modificou algo. Para alterar os elementos, o caminho é o `for` com índice.',
      },
      {
        id: 's03c01l04q2',
        type: 'multiple',
        prompt: 'Em quais situações o `foreach` **não** resolve?',
        options: [
          { id: 'a', text: 'Você precisa saber em que posição o valor está.', correct: true },
          { id: 'b', text: 'Você precisa alterar os elementos.', correct: true },
          { id: 'c', text: 'Você precisa percorrer do fim para o começo.', correct: true },
          { id: 'd', text: 'Você só quer somar todos os valores.' },
        ],
        explanation:
          'Somar é o caso ideal do `foreach`. Posição, modificação e ordem inversa exigem o índice, e portanto o `for`.',
      },
      {
        id: 's03c01l04q3',
        type: 'single',
        prompt: 'Qual é a principal vantagem prática do `foreach` sobre o `for`?',
        options: [
          { id: 'a', text: 'Elimina o índice, e com ele toda a classe de erros de limite.', correct: true },
          { id: 'b', text: 'É significativamente mais rápido.' },
          { id: 'c', text: 'Permite modificar a coleção com segurança.' },
          { id: 'd', text: 'Funciona com arrays de tamanho fixo apenas.' },
        ],
        explanation:
          'Sem contador não há como errar o `<` ou o `<=`, nem começar em 1 por engano. O desempenho é praticamente o mesmo.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e depois `n` valores para dentro de um array. Usando `foreach`, calcule a soma, o maior valor e quantos são pares.',
      requirements: [
        'Linha 1: `Soma: X`',
        'Linha 2: `Maior: M`',
        'Linha 3: `Pares: p`',
        'Valores negativos são válidos, e `-4` conta como par',
        'Use `foreach` para percorrer o array no cálculo',
        'Não inicialize o maior com zero',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] v = new int[n];
        for (int i = 0; i < v.Length; i++)
        {
            v[i] = int.Parse(Console.ReadLine());
        }

        int soma = 0;
        int maior = int.MinValue;
        int pares = 0;

        // Um unico foreach alimenta os tres resultados

        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Maior: {maior}");
        Console.WriteLine($"Pares: {pares}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] v = new int[n];
        for (int i = 0; i < v.Length; i++)
        {
            v[i] = int.Parse(Console.ReadLine());
        }

        int soma = 0;
        int maior = int.MinValue;
        int pares = 0;

        foreach (int atual in v)
        {
            soma += atual;

            if (atual > maior)
            {
                maior = atual;
            }

            if (atual % 2 == 0)
            {
                pares++;
            }
        }

        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Maior: {maior}");
        Console.WriteLine($"Pares: {pares}");
    }
}
`,
      hints: [
        'O laço de leitura precisa do índice, então continua sendo `for`. Só o cálculo vira `foreach`.',
        '`int.MinValue` como valor inicial faz o máximo funcionar mesmo com todos os valores negativos.',
      ],
      tests: [
        {
          name: 'Valores variados',
          stdin: '5\n3\n1\n4\n1\n5\n',
          expectedStdout: 'Soma: 14\nMaior: 5\nPares: 1',
        },
        {
          name: 'Todos negativos',
          stdin: '4\n-2\n-4\n-6\n-1\n',
          expectedStdout: 'Soma: -13\nMaior: -1\nPares: 3',
        },
        {
          name: 'Um valor negativo par',
          stdin: '1\n-8\n',
          expectedStdout: 'Soma: -8\nMaior: -8\nPares: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c01l05',
    title: 'Preenchendo a partir da entrada',
    objective: 'Guardar os dados lidos para poder percorrê-los mais de uma vez — o que a Seção 2 não permitia.',
    concept: [
      {
        kind: 'text',
        body:
          'Este é o momento em que o array paga o próprio custo. Na Seção 2, cada valor lido era processado e descartado; qualquer cálculo que dependesse de todos os dados de uma vez ficava fora de alcance.',
      },
      {
        kind: 'text',
        body:
          'O exemplo canônico é **quantos valores estão acima da média**. A média só existe depois do último dado, e nesse ponto os dados já teriam ido embora. Com um array, basta percorrer de novo.',
      },
      {
        kind: 'code',
        code: `// 1a passada: guardar
for (int i = 0; i < v.Length; i++)
{
    v[i] = int.Parse(Console.ReadLine());
    soma += v[i];
}

double media = (double)soma / v.Length;

// 2a passada: comparar com um resultado da 1a
foreach (int x in v)
{
    if (x > media) acima++;
}`,
        caption: 'Duas passadas sobre os mesmos dados: impossível sem armazená-los.',
      },
      {
        kind: 'table',
        headers: ['Cálculo', 'Passadas', 'Precisa de array?'],
        rows: [
          ['soma, média', '1', 'não'],
          ['máximo, mínimo', '1', 'não'],
          ['acima da média', '2', '**sim**'],
          ['mediana', '2 (com ordenação)', '**sim**'],
          ['inverter a ordem', '2', '**sim**'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A troca é sempre a mesma: guardar dados custa memória e compra a possibilidade de revisitá-los. Para mil valores isso é irrelevante; para dez bilhões, a passada única volta a ser a única opção viável.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Compare o `int` do array com a média em `double` diretamente: `x > media` funciona porque o `int` é convertido para `double` antes da comparação. Converter a média para `int` antes de comparar truncaria o valor e mudaria a resposta.',
      },
      {
        kind: 'text',
        body:
          'A comparação é estrita: um valor **igual** à média não está acima dela. Com os dados `5, 5, 5` a média é 5 e a resposta correta é zero — um caso de borda que vale sempre testar.',
      },
    ],
    quiz: [
      {
        id: 's03c01l05q1',
        type: 'single',
        prompt: 'Por que "quantos valores estão acima da média" exige guardar os dados?',
        options: [
          { id: 'a', text: 'Porque a média só é conhecida depois do último valor, quando os anteriores já passaram.', correct: true },
          { id: 'b', text: 'Porque a média precisa de `double`.' },
          { id: 'c', text: 'Porque a comparação é estrita.' },
          { id: 'd', text: 'Não exige: dá para resolver em uma passada.' },
        ],
        explanation:
          'É um cálculo de duas passadas: a primeira produz a média, a segunda a usa. Sem armazenamento, a segunda passada não tem sobre o que passar.',
      },
      {
        id: 's03c01l05q2',
        type: 'single',
        prompt: 'Com os valores `5, 5, 5`, quantos estão acima da média?',
        options: [
          { id: 'a', code: '0', correct: true },
          { id: 'b', code: '3' },
          { id: 'c', code: '1' },
          { id: 'd', code: '2' },
        ],
        explanation:
          'A média é 5, e nenhum valor é **maior** que 5. Trocar a comparação por `>=` daria 3 — por isso o enunciado precisa dizer se a igualdade conta.',
      },
      {
        id: 's03c01l05q3',
        type: 'multiple',
        prompt: 'Quais cálculos podem ser feitos em uma única passada, sem array?',
        options: [
          { id: 'a', text: 'A soma dos valores.', correct: true },
          { id: 'b', text: 'O maior valor.', correct: true },
          { id: 'c', text: 'A mediana.' },
          { id: 'd', text: 'A quantidade de valores pares.', correct: true },
        ],
        explanation:
          'A mediana exige ordenar, e ordenar exige ter todos os valores ao mesmo tempo. Os outros três dependem apenas do que já foi visto até cada ponto.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` valores. Calcule a média e informe quantos valores estão estritamente acima dela e quantos estão abaixo ou são iguais.',
      requirements: [
        'Linha 1: `Soma: X`',
        'Linha 2: `Media: Y`, com duas casas decimais',
        'Linha 3: `Acima da media: a`, contando só os estritamente maiores',
        'Linha 4: `Abaixo ou igual: b`',
        '`a` mais `b` tem que dar exatamente `n`',
        'Com `n` igual a 0, a média é `0.00` e as duas contagens são `0`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] v = new int[n];
        int soma = 0;

        // 1a passada: ler e somar

        double media = 0.0;

        // 2a passada: contar os que passam da media

        int acima = 0;

        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Media: {media:F2}");
        Console.WriteLine($"Acima da media: {acima}");
        Console.WriteLine($"Abaixo ou igual: {n - acima}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] v = new int[n];
        int soma = 0;

        for (int i = 0; i < v.Length; i++)
        {
            v[i] = int.Parse(Console.ReadLine());
            soma += v[i];
        }

        double media = v.Length > 0 ? (double)soma / v.Length : 0.0;

        int acima = 0;

        foreach (int atual in v)
        {
            if (atual > media)
            {
                acima++;
            }
        }

        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Media: {media:F2}");
        Console.WriteLine($"Acima da media: {acima}");
        Console.WriteLine($"Abaixo ou igual: {n - acima}");
    }
}
`,
      hints: [
        'A leitura e a soma cabem no mesmo laço. Só a contagem precisa esperar a média ficar pronta.',
        'A comparação é `atual > media`, com o `int` sendo convertido para `double` automaticamente.',
      ],
      tests: [
        {
          name: 'Série crescente',
          stdin: '5\n10\n20\n30\n40\n50\n',
          expectedStdout: 'Soma: 150\nMedia: 30.00\nAcima da media: 2\nAbaixo ou igual: 3',
        },
        {
          name: 'Média fracionária',
          stdin: '4\n1\n2\n3\n4\n',
          expectedStdout: 'Soma: 10\nMedia: 2.50\nAcima da media: 2\nAbaixo ou igual: 2',
        },
        {
          name: 'Todos iguais: ninguém acima',
          stdin: '3\n5\n5\n5\n',
          expectedStdout: 'Soma: 15\nMedia: 5.00\nAcima da media: 0\nAbaixo ou igual: 3',
        },
        {
          name: 'Nenhum valor',
          stdin: '0\n',
          expectedStdout: 'Soma: 0\nMedia: 0.00\nAcima da media: 0\nAbaixo ou igual: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c01l06',
    title: 'Copiando arrays',
    objective: 'Distinguir copiar a referência de copiar o conteúdo, e entender por que duas variáveis podem apontar para o mesmo array.',
    concept: [
      {
        kind: 'text',
        body:
          'Esta é a lição mais importante do capítulo, e a que gera os bugs mais difíceis de enxergar. Um array é um **tipo por referência**: a variável não guarda os dados, guarda o endereço onde eles estão.',
      },
      {
        kind: 'code',
        code: `int[] original = { 1, 2, 3 };
int[] apelido = original;      // NAO copia os dados

apelido[0] = 999;

Console.WriteLine(original[0]);   // 999`,
        caption: 'Uma atribuição entre arrays cria um segundo nome para o mesmo array.',
      },
      {
        kind: 'text',
        body:
          'É a diferença entre os tipos que você já usava e os que começam agora. Um `int` é copiado por valor: atribuir cria um valor independente. Um array é copiado por referência: atribuir cria um apelido.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'int: cópia independente',
          code: `int a = 1;
int b = a;
b = 999;
// a continua 1`,
        },
        right: {
          label: 'int[]: mesmo array',
          code: `int[] a = { 1 };
int[] b = a;
b[0] = 999;
// a[0] virou 999`,
        },
      },
      {
        kind: 'text',
        body:
          'Para obter dados independentes é preciso criar um array novo e **transferir o conteúdo**. `Array.Copy` faz isso, e um laço manual faz exatamente a mesma coisa.',
      },
      {
        kind: 'code',
        code: `int[] copia = new int[original.Length];
Array.Copy(original, copia, original.Length);

// equivalente, na mao:
for (int i = 0; i < original.Length; i++)
{
    copia[i] = original[i];
}`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O sintoma clássico: você guarda "o array antes da mudança" em outra variável, modifica o original, e descobre que a cópia mudou junto. Não havia cópia nenhuma — havia dois nomes para a mesma coisa.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '`ReferenceEquals(a, b)` responde "são o mesmo objeto?". Para arrays, o `==` faz a mesma comparação de identidade. Já para `string` o `==` é sobrecarregado e compara o **conteúdo** — uma exceção que costuma confundir.',
      },
    ],
    quiz: [
      {
        id: 's03c01l06q1',
        type: 'single',
        prompt: 'O que este trecho imprime?',
        code: `int[] a = { 1, 2, 3 };
int[] b = a;
b[1] = 50;
Console.WriteLine(a[1]);`,
        options: [
          { id: 'a', code: '50', correct: true },
          { id: 'b', code: '2' },
          { id: 'c', code: '0' },
          { id: 'd', text: 'Erro de compilação.' },
        ],
        explanation:
          '`b = a` copiou o endereço, não os dados. As duas variáveis são nomes para o mesmo array, então a alteração aparece pelos dois lados.',
      },
      {
        id: 's03c01l06q2',
        type: 'single',
        prompt: 'Como obter um array com o mesmo conteúdo, mas independente do original?',
        options: [
          { id: 'a', text: 'Criar um array novo do mesmo tamanho e transferir elemento por elemento.', correct: true },
          { id: 'b', text: 'Atribuir com `=`.' },
          { id: 'c', text: 'Declarar o novo array como `readonly`.' },
          { id: 'd', text: 'Usar `new` sem tamanho.' },
        ],
        explanation:
          'É o que `Array.Copy` faz por baixo. A atribuição simples nunca duplica dados de um tipo por referência.',
      },
      {
        id: 's03c01l06q3',
        type: 'single',
        prompt: 'Qual afirmação sobre tipos por valor e por referência está correta?',
        options: [
          { id: 'a', text: 'Atribuir um `int` copia o valor; atribuir um `int[]` copia o endereço.', correct: true },
          { id: 'b', text: 'Os dois copiam o valor.' },
          { id: 'c', text: 'Os dois copiam o endereço.' },
          { id: 'd', text: 'Depende do tamanho do array.' },
        ],
        explanation:
          'Essa distinção percorre o resto do curso. Toda coleção que ainda vem nesta seção é tipo por referência, e vale a mesma regra.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e depois `n` valores. Crie um **apelido** do array (atribuição simples) e uma **cópia** de verdade. Altere a primeira posição pelo apelido e mostre o efeito nos três.',
      requirements: [
        'Grave `999` na primeira posição, usando a variável do apelido',
        'Linha 1: `Original: ...`, com os elementos separados por espaço',
        'Linha 2: `Apelido: ...`',
        'Linha 3: `Copia: ...`',
        'Linha 4: `Apelido e o mesmo: True`',
        'Linha 5: `Copia e o mesmo: False`',
        'Use `ReferenceEquals` para as duas últimas linhas',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] original = new int[n];
        for (int i = 0; i < original.Length; i++)
        {
            original[i] = int.Parse(Console.ReadLine());
        }

        // Um apelido e uma copia de verdade

        // Altere a posicao 0 pelo apelido e mostre os tres
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] original = new int[n];
        for (int i = 0; i < original.Length; i++)
        {
            original[i] = int.Parse(Console.ReadLine());
        }

        int[] apelido = original;

        int[] copia = new int[original.Length];
        Array.Copy(original, copia, original.Length);

        apelido[0] = 999;

        string textoOriginal = "";
        string textoApelido = "";
        string textoCopia = "";

        for (int i = 0; i < original.Length; i++)
        {
            textoOriginal += $"{original[i]} ";
            textoApelido += $"{apelido[i]} ";
            textoCopia += $"{copia[i]} ";
        }

        Console.WriteLine($"Original: {textoOriginal}");
        Console.WriteLine($"Apelido: {textoApelido}");
        Console.WriteLine($"Copia: {textoCopia}");
        Console.WriteLine($"Apelido e o mesmo: {ReferenceEquals(original, apelido)}");
        Console.WriteLine($"Copia e o mesmo: {ReferenceEquals(original, copia)}");
    }
}
`,
      hints: [
        'O apelido é só `int[] apelido = original;`. A cópia precisa de um `new` antes do `Array.Copy`.',
        'A cópia tem que ser feita **antes** de alterar a posição 0, senão ela já nasce com o valor novo.',
      ],
      tests: [
        {
          name: 'Três valores',
          stdin: '3\n1\n2\n3\n',
          expectedStdout:
            'Original: 999 2 3\nApelido: 999 2 3\nCopia: 1 2 3\nApelido e o mesmo: True\nCopia e o mesmo: False',
        },
        {
          name: 'Uma posição só',
          stdin: '1\n5\n',
          expectedStdout:
            'Original: 999\nApelido: 999\nCopia: 5\nApelido e o mesmo: True\nCopia e o mesmo: False',
        },
        {
          name: 'Valores negativos',
          stdin: '4\n-1\n-2\n-3\n-4\n',
          expectedStdout:
            'Original: 999 -2 -3 -4\nApelido: 999 -2 -3 -4\nCopia: -1 -2 -3 -4\nApelido e o mesmo: True\nCopia e o mesmo: False',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c01l07',
    title: 'Array.Sort e Array.Reverse',
    objective: 'Ordenar e inverter um array, entendendo que as duas operações modificam o array original no lugar.',
    concept: [
      {
        kind: 'text',
        body:
          '`Array.Sort` coloca os elementos em ordem crescente e `Array.Reverse` inverte a ordem atual. As duas operam **no lugar**: elas não devolvem um array novo, elas alteram o que receberam.',
      },
      {
        kind: 'code',
        code: `int[] v = { 5, 3, 9, 1 };

Array.Sort(v);      // v virou { 1, 3, 5, 9 }
Array.Reverse(v);   // v virou { 9, 5, 3, 1 }`,
        caption: 'Repare que nada é atribuído: o array recebido é o que muda.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Escrever `v = Array.Sort(v);` não compila, porque `Sort` não devolve nada. E como o array é modificado no lugar, **a ordem original é perdida** — se você ainda precisa dela, faça uma cópia antes, com o que aprendeu na lição anterior.',
      },
      {
        kind: 'text',
        body:
          'Depois de ordenar, duas informações ficam disponíveis de graça: o menor valor está na primeira posição e o maior na última. Isso substitui os laços de máximo e mínimo da Seção 2.',
      },
      {
        kind: 'table',
        headers: ['Depois de `Array.Sort(v)`', 'Vale'],
        rows: [
          ['`v[0]`', 'o menor valor'],
          ['`v[v.Length - 1]`', 'o maior valor'],
          ['`v[v.Length / 2]`', 'a mediana, quando `Length` é ímpar'],
          ['elementos iguais', 'ficam lado a lado'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Ordenar custa mais que uma passada simples: o algoritmo por trás do `Sort` faz da ordem de `n · log n` comparações, contra `n` de um laço de máximo. Para achar só o maior valor, o laço continua sendo a escolha certa — ordenar para isso é usar um trator para plantar um vaso.',
      },
      {
        kind: 'text',
        body:
          'Inverter um array ordenado é o jeito mais direto de obter ordem decrescente. Existem formas de pedir ao `Sort` que ordene ao contrário, mas elas dependem de recursos que só chegam na Seção 4.',
      },
    ],
    quiz: [
      {
        id: 's03c01l07q1',
        type: 'single',
        prompt: 'O que `Array.Sort(v)` devolve?',
        options: [
          { id: 'a', text: 'Nada: ele altera o próprio `v`.', correct: true },
          { id: 'b', text: 'Um array novo, ordenado.' },
          { id: 'c', text: 'A quantidade de trocas feitas.' },
          { id: 'd', text: 'Um `bool` indicando sucesso.' },
        ],
        explanation:
          'Por isso `v = Array.Sort(v)` não compila. A operação é in-place, e é também por isso que a ordem original se perde.',
      },
      {
        id: 's03c01l07q2',
        type: 'single',
        prompt: 'Depois de `Array.Sort(v)` em `{ 5, 3, 9, 1 }`, quanto vale `v[v.Length - 1]`?',
        options: [
          { id: 'a', code: '9', correct: true },
          { id: 'b', code: '1' },
          { id: 'c', code: '5' },
          { id: 'd', code: '3' },
        ],
        explanation:
          'Ordenado, o array vira `{ 1, 3, 5, 9 }`. A última posição guarda o maior valor, e a primeira, o menor.',
      },
      {
        id: 's03c01l07q3',
        type: 'single',
        prompt: 'Você só precisa do maior valor de um array. Ordenar é uma boa ideia?',
        options: [
          { id: 'a', text: 'Não: uma passada simples encontra o máximo com muito menos trabalho.', correct: true },
          { id: 'b', text: 'Sim: é sempre mais rápido que um laço.' },
          { id: 'c', text: 'Sim, desde que o array tenha menos de 100 elementos.' },
          { id: 'd', text: 'Tanto faz: o custo é o mesmo.' },
        ],
        explanation:
          'Ordenar reorganiza tudo para responder a uma pergunta que precisa de uma passada. E ainda destrói a ordem original, que pode ser informação.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e depois `n` valores. Mostre o array como foi lido, depois em ordem crescente, depois em ordem decrescente, e informe o menor e o maior valor.',
      requirements: [
        'Linha 1: `Original: 5 3 9 1`, na ordem em que os valores foram lidos',
        'Linha 2: `Crescente: 1 3 5 9`',
        'Linha 3: `Decrescente: 9 5 3 1`',
        'Linha 4: `Menor: X`',
        'Linha 5: `Maior: Y`',
        'Obtenha o menor e o maior a partir das posições do array ordenado, sem laço de comparação',
        'Imprima a linha `Original` antes de ordenar: o `Sort` destrói a ordem',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] v = new int[n];
        for (int i = 0; i < v.Length; i++)
        {
            v[i] = int.Parse(Console.ReadLine());
        }

        // Mostre o original, ordene, mostre, inverta, mostre
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] v = new int[n];
        for (int i = 0; i < v.Length; i++)
        {
            v[i] = int.Parse(Console.ReadLine());
        }

        string original = "";
        for (int i = 0; i < v.Length; i++)
        {
            original += $"{v[i]} ";
        }

        Console.WriteLine($"Original: {original}");

        Array.Sort(v);

        string crescente = "";
        for (int i = 0; i < v.Length; i++)
        {
            crescente += $"{v[i]} ";
        }

        Console.WriteLine($"Crescente: {crescente}");

        Array.Reverse(v);

        string decrescente = "";
        for (int i = 0; i < v.Length; i++)
        {
            decrescente += $"{v[i]} ";
        }

        Console.WriteLine($"Decrescente: {decrescente}");
        Console.WriteLine($"Menor: {v[v.Length - 1]}");
        Console.WriteLine($"Maior: {v[0]}");
    }
}
`,
      hints: [
        'A ordem das operações é: montar a linha original, `Sort`, montar a crescente, `Reverse`, montar a decrescente.',
        'Depois do `Reverse` o array está em ordem decrescente, então o maior está em `v[0]` e o menor no fim.',
      ],
      tests: [
        {
          name: 'Quatro valores fora de ordem',
          stdin: '4\n5\n3\n9\n1\n',
          expectedStdout:
            'Original: 5 3 9 1\nCrescente: 1 3 5 9\nDecrescente: 9 5 3 1\nMenor: 1\nMaior: 9',
        },
        {
          name: 'Com valores repetidos',
          stdin: '5\n2\n2\n1\n3\n1\n',
          expectedStdout:
            'Original: 2 2 1 3 1\nCrescente: 1 1 2 2 3\nDecrescente: 3 2 2 1 1\nMenor: 1\nMaior: 3',
        },
        {
          name: 'Um valor só',
          stdin: '1\n7\n',
          expectedStdout:
            'Original: 7\nCrescente: 7\nDecrescente: 7\nMenor: 7\nMaior: 7',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c01l08',
    title: 'Buscando com Array.IndexOf',
    objective: 'Localizar um valor com os métodos prontos da biblioteca e reconhecer o que eles não respondem.',
    concept: [
      {
        kind: 'text',
        body:
          'Na Seção 2 você escreveu a busca linear à mão. `Array.IndexOf` faz exatamente isso, e usa a mesma convenção que você adotou: **`-1` significa não encontrado**.',
      },
      {
        kind: 'code',
        code: `int[] v = { 4, 9, 4, 7 };

Array.IndexOf(v, 4);     // 0  -> primeira ocorrencia
Array.LastIndexOf(v, 4); // 2  -> ultima ocorrencia
Array.IndexOf(v, 5);     // -1 -> nao existe`,
      },
      {
        kind: 'table',
        headers: ['Pergunta', 'Como responder'],
        rows: [
          ['onde está a primeira?', '`Array.IndexOf`'],
          ['onde está a última?', '`Array.LastIndexOf`'],
          ['existe?', '`Array.IndexOf(...) >= 0`'],
          ['quantas vezes aparece?', 'laço próprio'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Testar `if (Array.IndexOf(v, alvo))` não compila: o retorno é um `int`, não um `bool`. E testar `!= 0` está errado — o índice `0` é uma resposta válida e significa "achei na primeira posição". A comparação certa é `>= 0`.',
      },
      {
        kind: 'text',
        body:
          'Não existe um `Array.CountOf`. Contar ocorrências continua sendo um laço seu — e é o mesmo laço da Seção 2, agora sobre um array em vez de sobre a entrada.',
      },
      {
        kind: 'code',
        code: `int ocorrencias = 0;

foreach (int atual in v)
{
    if (atual == alvo) ocorrencias++;
}`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '`IndexOf` percorre o array do começo ao fim, comparando um por um: é `n` comparações no pior caso, exatamente a busca linear que você já conhece. Em um array **ordenado** existe uma busca muito melhor, a binária, que a Seção 7 apresenta.',
      },
    ],
    quiz: [
      {
        id: 's03c01l08q1',
        type: 'single',
        prompt: 'Quanto vale `Array.IndexOf(v, 8)` quando o 8 não está no array?',
        options: [
          { id: 'a', code: '-1', correct: true },
          { id: 'b', code: '0' },
          { id: 'c', text: 'O `Length` do array.' },
          { id: 'd', text: 'Lança exceção.' },
        ],
        explanation:
          'É a mesma convenção do `IndexOf` de `string` e da busca que você escreveu na Seção 2: um valor impossível como posição real.',
      },
      {
        id: 's03c01l08q2',
        type: 'single',
        prompt: 'Qual é a forma correta de testar se um valor existe no array?',
        options: [
          { id: 'a', code: 'Array.IndexOf(v, alvo) >= 0', correct: true },
          { id: 'b', code: 'Array.IndexOf(v, alvo) != 0' },
          { id: 'c', code: 'Array.IndexOf(v, alvo)' },
          { id: 'd', code: 'Array.IndexOf(v, alvo) > 0' },
        ],
        explanation:
          'As duas com `0` excluem por engano a primeira posição, que é uma resposta legítima. A terceira nem compila, porque `int` não é `bool`.',
      },
      {
        id: 's03c01l08q3',
        type: 'single',
        prompt: 'Como descobrir quantas vezes um valor aparece no array?',
        options: [
          { id: 'a', text: 'Com um laço próprio contando as igualdades.', correct: true },
          { id: 'b', text: 'Com `Array.CountOf`.' },
          { id: 'c', text: 'Subtraindo `IndexOf` de `LastIndexOf`.' },
          { id: 'd', text: 'Com `Array.IndexOf` chamado duas vezes.' },
        ],
        explanation:
          'A diferença entre a primeira e a última posição não é a contagem: em `4 9 4`, ela daria 2, mas o 4 aparece 2 vezes por coincidência — em `4 9 9 9 4` daria 4, e a resposta certa continua sendo 2.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1, depois `n` valores, e por último um `alvo`. Informe a primeira e a última posição do alvo, quantas vezes ele aparece, e se ele foi encontrado.',
      requirements: [
        'Linha 1: `Primeira: p`, ou `-1` se o alvo não existir',
        'Linha 2: `Ultima: u`, ou `-1`',
        'Linha 3: `Ocorrencias: k`',
        'Linha 4: `Encontrado: True` ou `Encontrado: False`',
        'Use `Array.IndexOf` e `Array.LastIndexOf` para as posições',
        'Conte as ocorrências com um laço próprio',
        'O teste de existência usa `>= 0`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] v = new int[n];
        for (int i = 0; i < v.Length; i++)
        {
            v[i] = int.Parse(Console.ReadLine());
        }

        int alvo = int.Parse(Console.ReadLine());

        // Posicoes pelos metodos prontos, contagem por laco
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] v = new int[n];
        for (int i = 0; i < v.Length; i++)
        {
            v[i] = int.Parse(Console.ReadLine());
        }

        int alvo = int.Parse(Console.ReadLine());

        int primeira = Array.IndexOf(v, alvo);
        int ultima = Array.LastIndexOf(v, alvo);

        int ocorrencias = 0;
        foreach (int atual in v)
        {
            if (atual == alvo)
            {
                ocorrencias++;
            }
        }

        Console.WriteLine($"Primeira: {primeira}");
        Console.WriteLine($"Ultima: {ultima}");
        Console.WriteLine($"Ocorrencias: {ocorrencias}");
        Console.WriteLine($"Encontrado: {primeira >= 0}");
    }
}
`,
      hints: [
        'O alvo é lido **depois** de todos os valores, na última linha da entrada.',
        'A linha de `Encontrado` sai direto de `primeira >= 0`, sem precisar de `if`.',
      ],
      tests: [
        {
          name: 'Três ocorrências',
          stdin: '6\n4\n9\n4\n7\n4\n1\n4\n',
          expectedStdout: 'Primeira: 0\nUltima: 4\nOcorrencias: 3\nEncontrado: True',
        },
        {
          name: 'Alvo ausente',
          stdin: '6\n4\n9\n4\n7\n4\n1\n5\n',
          expectedStdout: 'Primeira: -1\nUltima: -1\nOcorrencias: 0\nEncontrado: False',
        },
        {
          name: 'Uma ocorrência no fim',
          stdin: '3\n1\n2\n3\n3\n',
          expectedStdout: 'Primeira: 2\nUltima: 2\nOcorrencias: 1\nEncontrado: True',
        },
        {
          name: 'Array de um elemento',
          stdin: '1\n3\n3\n',
          expectedStdout: 'Primeira: 0\nUltima: 0\nOcorrencias: 1\nEncontrado: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c01l09',
    title: 'Prática: notas da turma',
    objective: 'Combinar as duas passadas, a classificação por faixa e os extremos em um relatório completo de turma.',
    concept: [
      {
        kind: 'text',
        body:
          'Um boletim de turma junta tudo que o capítulo ofereceu: guardar os dados, calcular um agregado, e depois voltar aos dados para compará-los com esse agregado.',
      },
      {
        kind: 'table',
        headers: ['Resultado', 'Passada', 'Depende de'],
        rows: [
          ['soma e média', '1ª', 'nada'],
          ['aprovados e reprovados', '1ª', 'um limite fixo'],
          ['maior e menor', '1ª', 'nada'],
          ['acima da média', '**2ª**', 'a média já calculada'],
        ],
      },
      {
        kind: 'text',
        body:
          'Repare que só uma das perguntas exige a segunda passada. As outras três poderiam ter sido resolvidas na Seção 2, uma a uma, conforme os dados chegavam.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Dois limites diferentes convivem aqui, e confundi-los é o erro típico. **Aprovado** usa um limite fixo com `>=` (a nota 6 aprova). **Acima da média** usa um limite calculado com `>` estrito (a nota igual à média não está acima dela).',
      },
      {
        kind: 'code',
        code: `if (nota >= 6) aprovados++;      // limite fixo, inclusivo
else           reprovados++;

if (nota > media) acimaMedia++;  // limite calculado, estrito`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma verificação barata: `aprovados + reprovados` tem que dar o total de notas. Já `acimaMedia` não tem nenhuma relação com esse par — uma turma pode ter 4 aprovados e 3 acima da média sem contradição nenhuma.',
      },
      {
        kind: 'text',
        body:
          'Com notas todas iguais, a média é essa nota e ninguém fica acima dela. É o caso de borda mais fácil de esquecer, e o que mais rápido revela uma comparação trocada por `>=`.',
      },
    ],
    quiz: [
      {
        id: 's03c01l09q1',
        type: 'single',
        prompt: 'Notas `7, 4, 9, 6, 3, 8`. Quantos alunos estão acima da média?',
        options: [
          { id: 'a', code: '3', correct: true },
          { id: 'b', code: '4' },
          { id: 'c', code: '2' },
          { id: 'd', code: '6' },
        ],
        explanation:
          'A soma é 37 e a média é 6,17. As notas maiores que isso são 7, 9 e 8. A nota 6 aprova, mas está abaixo da média.',
      },
      {
        id: 's03c01l09q2',
        type: 'single',
        prompt: 'Numa turma em que todos tiraram 5, quantos estão acima da média?',
        options: [
          { id: 'a', code: '0', correct: true },
          { id: 'b', text: 'Todos.' },
          { id: 'c', text: 'Metade.' },
          { id: 'd', text: 'A média é indefinida nesse caso.' },
        ],
        explanation:
          'A média é 5 e nenhuma nota é **maior** que 5. Se o seu programa responder "todos", a comparação está usando `>=` em vez de `>`.',
      },
      {
        id: 's03c01l09q3',
        type: 'single',
        prompt: 'Qual invariante sempre vale neste relatório?',
        options: [
          { id: 'a', code: 'aprovados + reprovados == quantidade', correct: true },
          { id: 'b', code: 'acimaMedia == aprovados' },
          { id: 'c', code: 'acimaMedia <= reprovados' },
          { id: 'd', code: 'maior - menor == media' },
        ],
        explanation:
          'Toda nota é aprovada ou reprovada, sem terceira opção. As contagens por média são independentes do critério de aprovação e não têm relação fixa com ele.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e depois `n` notas inteiras de 0 a 10. Gere o boletim da turma: média, aprovados, reprovados, maior nota, menor nota e quantos alunos ficaram acima da média.',
      requirements: [
        'Linha 1: `Media: X`, com duas casas decimais',
        'Linha 2: `Aprovados: a`, contando as notas **maiores ou iguais a 6**',
        'Linha 3: `Reprovados: r`',
        'Linha 4: `Maior: M`',
        'Linha 5: `Menor: m`',
        'Linha 6: `Acima da media: k`, contando só as **estritamente maiores** que a média',
        '`a` mais `r` tem que dar `n`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] notas = new int[n];
        int soma = 0;

        // 1a passada: ler, somar

        double media = 0.0;

        int aprovados = 0;
        int reprovados = 0;
        int maior = int.MinValue;
        int menor = int.MaxValue;
        int acimaMedia = 0;

        // Classifique, ache os extremos, e conte os acima da media

        Console.WriteLine($"Media: {media:F2}");
        Console.WriteLine($"Aprovados: {aprovados}");
        Console.WriteLine($"Reprovados: {reprovados}");
        Console.WriteLine($"Maior: {maior}");
        Console.WriteLine($"Menor: {menor}");
        Console.WriteLine($"Acima da media: {acimaMedia}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] notas = new int[n];
        int soma = 0;

        for (int i = 0; i < notas.Length; i++)
        {
            notas[i] = int.Parse(Console.ReadLine());
            soma += notas[i];
        }

        double media = (double)soma / notas.Length;

        int aprovados = 0;
        int reprovados = 0;
        int maior = int.MinValue;
        int menor = int.MaxValue;
        int acimaMedia = 0;

        foreach (int nota in notas)
        {
            if (nota >= 6)
            {
                aprovados++;
            }
            else
            {
                reprovados++;
            }

            if (nota > maior)
            {
                maior = nota;
            }

            if (nota < menor)
            {
                menor = nota;
            }

            if (nota > media)
            {
                acimaMedia++;
            }
        }

        Console.WriteLine($"Media: {media:F2}");
        Console.WriteLine($"Aprovados: {aprovados}");
        Console.WriteLine($"Reprovados: {reprovados}");
        Console.WriteLine($"Maior: {maior}");
        Console.WriteLine($"Menor: {menor}");
        Console.WriteLine($"Acima da media: {acimaMedia}");
    }
}
`,
      hints: [
        'A média precisa estar pronta antes do laço de classificação, então a leitura é um laço separado.',
        'Aprovação usa `>= 6`; acima da média usa `> media`. Os dois operadores são diferentes de propósito.',
      ],
      tests: [
        {
          name: 'Turma variada',
          stdin: '6\n7\n4\n9\n6\n3\n8\n',
          expectedStdout:
            'Media: 6.17\nAprovados: 4\nReprovados: 2\nMaior: 9\nMenor: 3\nAcima da media: 3',
        },
        {
          name: 'Todos exatamente na média de corte',
          stdin: '4\n6\n6\n6\n6\n',
          expectedStdout:
            'Media: 6.00\nAprovados: 4\nReprovados: 0\nMaior: 6\nMenor: 6\nAcima da media: 0',
        },
        {
          name: 'Turma inteira reprovada',
          stdin: '3\n5\n5\n5\n',
          expectedStdout:
            'Media: 5.00\nAprovados: 0\nReprovados: 3\nMaior: 5\nMenor: 5\nAcima da media: 0',
        },
        {
          name: 'Um aluno só',
          stdin: '1\n10\n',
          expectedStdout:
            'Media: 10.00\nAprovados: 1\nReprovados: 0\nMaior: 10\nMenor: 10\nAcima da media: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c01l10',
    title: 'Checkpoint: arrays',
    objective: 'Produzir um dossiê estatístico preservando a ordem original, o que exige cópia, ordenação e busca nos dois arrays.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint só é resolvível com o que a lição de cópia ensinou. Ele pede resultados que dependem da **ordem original** e resultados que dependem da **ordem crescente** — e `Array.Sort` destrói a primeira para produzir a segunda.',
      },
      {
        kind: 'code',
        code: `int[] ordenado = new int[original.Length];
Array.Copy(original, ordenado, original.Length);
Array.Sort(ordenado);

// agora os dois existem ao mesmo tempo`,
        caption: 'Copiar antes de ordenar é o passo que torna o resto possível.',
      },
      {
        kind: 'table',
        headers: ['Resultado', 'Qual array'],
        rows: [
          ['posição do alvo como foi digitado', 'original'],
          ['posição do alvo em ordem crescente', 'ordenado'],
          ['mediana', 'ordenado'],
          ['amplitude', 'ordenado (primeiro e último)'],
          ['média e ocorrências', 'qualquer um'],
        ],
      },
      {
        kind: 'text',
        body:
          'A **mediana** é o valor do meio de uma sequência ordenada. Com um número ímpar de elementos ela é o elemento central; com um número par, é a média dos dois centrais — e por isso o resultado pode ter casas decimais mesmo com dados inteiros.',
      },
      {
        kind: 'code',
        code: `double mediana = ordenado.Length % 2 == 1
    ? ordenado[ordenado.Length / 2]
    : (ordenado[ordenado.Length / 2 - 1]
     + ordenado[ordenado.Length / 2]) / 2.0;`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A divisão da mediana par usa `2.0` e não `2`. Com dois inteiros, `(1 + 3) / 2` daria `2` por sorte, mas `(1 + 2) / 2` daria `1` em vez de `1.5` — a divisão inteira de sempre, agora escondida dentro de uma fórmula.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Resolva uma linha por vez, rodando os testes a cada uma. Este é o tipo de programa em que uma cópia esquecida contamina quatro resultados ao mesmo tempo e o erro fica impossível de localizar.',
      },
    ],
    quiz: [
      {
        id: 's03c01l10q1',
        type: 'single',
        prompt: 'Por que é preciso copiar o array antes de ordená-lo?',
        options: [
          { id: 'a', text: 'Porque `Array.Sort` altera o array recebido, e a ordem original ainda é necessária.', correct: true },
          { id: 'b', text: 'Porque `Array.Sort` não funciona no array original.' },
          { id: 'c', text: 'Por questão de desempenho.' },
          { id: 'd', text: 'Não é preciso: o `Sort` devolve um array novo.' },
        ],
        explanation:
          'A ordenação é in-place. Sem a cópia, a posição do alvo "como foi digitado" deixa de existir no momento em que o `Sort` roda.',
      },
      {
        id: 's03c01l10q2',
        type: 'single',
        prompt: 'Qual é a mediana de `10, 20, 30, 40`?',
        options: [
          { id: 'a', code: '25.00', correct: true },
          { id: 'b', code: '20.00' },
          { id: 'c', code: '30.00' },
          { id: 'd', code: '25' },
        ],
        explanation:
          'Com quantidade par, a mediana é a média dos dois valores centrais: `(20 + 30) / 2`. Ela não precisa ser um dos valores presentes.',
      },
      {
        id: 's03c01l10q3',
        type: 'single',
        prompt: 'Em `7 2 9 4 4`, procurando o 4: qual a posição no original e no ordenado?',
        options: [
          { id: 'a', text: '3 no original e 1 no ordenado.', correct: true },
          { id: 'b', text: '1 nos dois.' },
          { id: 'c', text: '3 nos dois.' },
          { id: 'd', text: '4 no original e 2 no ordenado.' },
        ],
        explanation:
          'No original o primeiro 4 está no índice 3. Ordenado, o array vira `2 4 4 7 9` e o primeiro 4 passa para o índice 1. É a demonstração de que os dois arrays precisam coexistir.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1, depois `n` valores, e por último um `alvo`. Produza um dossiê com o array na ordem original e em ordem crescente, a média, a mediana, a amplitude, a posição do alvo nos dois arrays e quantas vezes ele aparece.',
      requirements: [
        'Linha 1: `Original: 7 2 9 4 4`, na ordem lida',
        'Linha 2: `Ordenado: 2 4 4 7 9`',
        'Linha 3: `Media: X`, com duas casas decimais',
        'Linha 4: `Mediana: Y`, com duas casas decimais',
        'Linha 5: `Amplitude: a`, a diferença entre o maior e o menor',
        'Linha 6: `Alvo no original: p`, ou `-1` se não existir',
        'Linha 7: `Alvo no ordenado: q`, ou `-1`',
        'Linha 8: `Ocorrencias: k`',
        'Com quantidade par, a mediana é a média dos dois valores centrais',
        'Copie o array antes de ordenar: as duas ordens são necessárias',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] original = new int[n];
        int soma = 0;

        for (int i = 0; i < original.Length; i++)
        {
            original[i] = int.Parse(Console.ReadLine());
            soma += original[i];
        }

        int alvo = int.Parse(Console.ReadLine());

        // Copie antes de ordenar

        int[] ordenado = new int[original.Length];

        // Monte as duas listas, calcule as estatisticas e busque nos dois
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] original = new int[n];
        int soma = 0;

        for (int i = 0; i < original.Length; i++)
        {
            original[i] = int.Parse(Console.ReadLine());
            soma += original[i];
        }

        int alvo = int.Parse(Console.ReadLine());

        int[] ordenado = new int[original.Length];
        Array.Copy(original, ordenado, original.Length);
        Array.Sort(ordenado);

        string textoOriginal = "";
        string textoOrdenado = "";

        for (int i = 0; i < original.Length; i++)
        {
            textoOriginal += $"{original[i]} ";
            textoOrdenado += $"{ordenado[i]} ";
        }

        double media = (double)soma / original.Length;

        double mediana = ordenado.Length % 2 == 1
            ? ordenado[ordenado.Length / 2]
            : (ordenado[ordenado.Length / 2 - 1] + ordenado[ordenado.Length / 2]) / 2.0;

        int amplitude = ordenado[ordenado.Length - 1] - ordenado[0];

        int ocorrencias = 0;
        foreach (int atual in original)
        {
            if (atual == alvo)
            {
                ocorrencias++;
            }
        }

        Console.WriteLine($"Original: {textoOriginal}");
        Console.WriteLine($"Ordenado: {textoOrdenado}");
        Console.WriteLine($"Media: {media:F2}");
        Console.WriteLine($"Mediana: {mediana:F2}");
        Console.WriteLine($"Amplitude: {amplitude}");
        Console.WriteLine($"Alvo no original: {Array.IndexOf(original, alvo)}");
        Console.WriteLine($"Alvo no ordenado: {Array.IndexOf(ordenado, alvo)}");
        Console.WriteLine($"Ocorrencias: {ocorrencias}");
    }
}
`,
      hints: [
        'A ordem é: copiar, ordenar, e só então montar as duas linhas de texto — as duas versões precisam existir ao mesmo tempo.',
        'Depois de ordenar, a amplitude é `ordenado[Length - 1] - ordenado[0]`, sem nenhum laço.',
      ],
      tests: [
        {
          name: 'Quantidade ímpar com repetição',
          stdin: '5\n7\n2\n9\n4\n4\n4\n',
          expectedStdout:
            'Original: 7 2 9 4 4\nOrdenado: 2 4 4 7 9\nMedia: 5.20\nMediana: 4.00\nAmplitude: 7\n' +
            'Alvo no original: 3\nAlvo no ordenado: 1\nOcorrencias: 2',
        },
        {
          name: 'Quantidade par: mediana entre dois valores',
          stdin: '4\n10\n20\n30\n40\n30\n',
          expectedStdout:
            'Original: 10 20 30 40\nOrdenado: 10 20 30 40\nMedia: 25.00\nMediana: 25.00\nAmplitude: 30\n' +
            'Alvo no original: 2\nAlvo no ordenado: 2\nOcorrencias: 1',
        },
        {
          name: 'Posições diferentes nos dois arrays',
          stdin: '6\n3\n1\n3\n1\n3\n1\n3\n',
          expectedStdout:
            'Original: 3 1 3 1 3 1\nOrdenado: 1 1 1 3 3 3\nMedia: 2.00\nMediana: 2.00\nAmplitude: 2\n' +
            'Alvo no original: 0\nAlvo no ordenado: 3\nOcorrencias: 3',
        },
        {
          name: 'Alvo ausente num array de um elemento',
          stdin: '1\n5\n9\n',
          expectedStdout:
            'Original: 5\nOrdenado: 5\nMedia: 5.00\nMediana: 5.00\nAmplitude: 0\n' +
            'Alvo no original: -1\nAlvo no ordenado: -1\nOcorrencias: 0',
          hidden: true,
        },
      ],
    },
  },
]
