import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's01c02l01',
    title: 'O que é uma variável',
    objective: 'Declarar, atribuir e reatribuir valores, e entender por que o tipo vem antes do nome.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma variável é um nome para um espaço na memória. Em C# você sempre informa o **tipo** desse espaço, e o compilador passa a vigiar que só valores compatíveis entrem lá.',
      },
      {
        kind: 'code',
        code: `int idade = 30;        // declaracao com valor inicial
idade = 31;            // reatribuicao: sem repetir o tipo

string nome;           // declaracao sem valor
nome = "Ana";          // atribuicao depois

Console.WriteLine(nome);
Console.WriteLine(idade);`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Usar uma variável antes de atribuir qualquer valor é erro de compilação (`CS0165`). C# não assume zero nem string vazia: ele exige que você decida.',
      },
      {
        kind: 'text',
        body:
          'Nomes seguem convenção `camelCase` para variáveis locais: `precoTotal`, `nomeCompleto`, `quantidadeEmEstoque`. Nome bom é nome que dispensa comentário.',
      },
    ],
    quiz: [
      {
        id: 's01c02l01q1',
        type: 'single',
        prompt: 'O que este código imprime?',
        code: `int x = 5;
x = 8;
Console.WriteLine(x);`,
        options: [
          { id: 'a', code: '5' },
          { id: 'b', code: '8', correct: true },
          { id: 'c', code: '5\n8' },
          { id: 'd', text: 'Erro: não se pode reatribuir uma variável' },
        ],
        explanation:
          'A segunda linha substitui o valor. Uma variável guarda um valor por vez, e a reatribuição não repete o tipo.',
      },
      {
        id: 's01c02l01q2',
        type: 'single',
        prompt: 'Por que este código não compila?',
        code: `int total;
Console.WriteLine(total);`,
        options: [
          { id: 'a', text: '`total` foi declarada mas nunca recebeu valor.', correct: true },
          { id: 'b', text: '`int` não pode ser impresso.' },
          { id: 'c', text: 'Falta `using System;`.' },
          { id: 'd', text: 'O nome `total` é reservado.' },
        ],
        explanation:
          'Variáveis locais não têm valor padrão em C#. O compilador bloqueia o uso de uma variável não atribuída, o que evita uma classe inteira de bugs.',
      },
      {
        id: 's01c02l01q3',
        type: 'single',
        prompt: 'Qual declaração segue a convenção do C# para uma variável local?',
        options: [
          { id: 'a', code: 'int quantidadeItens = 3;', correct: true },
          { id: 'b', code: 'int QuantidadeItens = 3;' },
          { id: 'c', code: 'int quantidade_itens = 3;' },
          { id: 'd', code: 'int QUANTIDADEITENS = 3;' },
        ],
        explanation:
          'Variáveis locais usam `camelCase`. `PascalCase` fica reservado para tipos e membros públicos, e sublinhado não é convenção em C#.',
      },
    ],
    challenge: {
      brief:
        'Simule um contador de estoque. Declare a quantidade inicial, aplique duas movimentações e imprima o resultado de cada etapa.',
      requirements: [
        'Comece com 10 unidades e imprima `Inicial: 10`',
        'Entrada de 5 unidades: imprima `Depois da entrada: 15`',
        'Saída de 3 unidades: imprima `Depois da saida: 12`',
        'Use uma única variável, reatribuindo o valor',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int estoque = 10;
        // Imprima o inicial, aplique +5, imprima, aplique -3, imprima
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int estoque = 10;
        Console.WriteLine("Inicial: " + estoque);

        estoque = estoque + 5;
        Console.WriteLine("Depois da entrada: " + estoque);

        estoque = estoque - 3;
        Console.WriteLine("Depois da saida: " + estoque);
    }
}
`,
      hints: [
        '`estoque = estoque + 5;` lê o valor atual, soma e guarda de volta.',
        'Use `+` para juntar o texto com o número na mesma linha.',
      ],
      tests: [
        {
          name: 'Três etapas do estoque',
          expectedStdout: 'Inicial: 10\nDepois da entrada: 15\nDepois da saida: 12',
        },
      ],
    },
  },
  {
    id: 's01c02l02',
    title: 'Números inteiros com int',
    objective: 'Usar int para contagens, conhecer seus limites e saber quando subir para long.',
    concept: [
      {
        kind: 'text',
        body:
          '`int` guarda números inteiros, positivos ou negativos, sem parte decimal. É o tipo padrão para contar coisas: itens, tentativas, índices, idades.',
      },
      {
        kind: 'table',
        headers: ['Tipo', 'Faixa aproximada', 'Quando usar'],
        rows: [
          ['`int`', '-2,1 bilhões a 2,1 bilhões', 'Padrão para qualquer contagem'],
          ['`long`', '-9,2 quintilhões a 9,2 quintilhões', 'IDs grandes, milissegundos, população mundial'],
          ['`short`', '-32.768 a 32.767', 'Raro, só para economizar memória em massa'],
          ['`byte`', '0 a 255', 'Dados binários, cores, arquivos'],
        ],
      },
      {
        kind: 'code',
        code: `int tentativas = 3;
int saldo = -150;
long populacao = 8_100_000_000;   // sublinhado ajuda a ler

Console.WriteLine(int.MaxValue);  // 2147483647`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Na dúvida, use `int`. Trocar por `short` para economizar memória é uma otimização que quase nunca importa e sempre atrapalha a leitura.',
      },
    ],
    quiz: [
      {
        id: 's01c02l02q1',
        type: 'single',
        prompt: 'Qual destas declarações não compila?',
        options: [
          { id: 'a', code: 'int a = 2.5;', correct: true },
          { id: 'b', code: 'int b = -40;' },
          { id: 'c', code: 'int c = 0;' },
          { id: 'd', code: 'int d = 1_000_000;' },
        ],
        explanation:
          '`2.5` é um `double`, e C# não converte para `int` automaticamente porque haveria perda de informação. Isso gera o erro `CS0266`.',
      },
      {
        id: 's01c02l02q2',
        type: 'single',
        prompt: 'Você precisa guardar a quantidade de milissegundos desde 1970. Qual tipo escolher?',
        options: [
          { id: 'a', code: 'int' },
          { id: 'b', code: 'long', correct: true },
          { id: 'c', code: 'short' },
          { id: 'd', code: 'byte' },
        ],
        explanation:
          'Esse número passa de 1,7 trilhão, muito acima do limite de `int` (cerca de 2,1 bilhões). É o caso clássico de precisar de `long`.',
      },
      {
        id: 's01c02l02q3',
        type: 'single',
        prompt: 'O que acontece aqui?',
        code: `int grande = int.MaxValue;
grande = grande + 1;
Console.WriteLine(grande);`,
        options: [
          { id: 'a', text: 'Imprime um número negativo: o valor dá a volta.', correct: true },
          { id: 'b', text: 'Imprime `2147483648`.' },
          { id: 'c', text: 'Erro de compilação.' },
          { id: 'd', text: 'O programa trava.' },
        ],
        explanation:
          'Por padrão, C# não verifica estouro em aritmética de inteiros: o valor dá a volta e vira `int.MinValue`. Estouro silencioso é um bug clássico.',
      },
    ],
    challenge: {
      brief:
        'Um cinema tem 12 fileiras com 18 assentos cada. Foram vendidos 173 ingressos. Calcule e imprima a capacidade, os vendidos e as vagas restantes.',
      requirements: [
        'Linha 1: `Capacidade: 216`',
        'Linha 2: `Vendidos: 173`',
        'Linha 3: `Restam: 43`',
        'A capacidade deve ser **calculada** a partir de fileiras e assentos, não escrita direto',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int fileiras = 12;
        int assentosPorFileira = 18;
        int vendidos = 173;

        // Calcule a capacidade e as vagas restantes
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int fileiras = 12;
        int assentosPorFileira = 18;
        int vendidos = 173;

        int capacidade = fileiras * assentosPorFileira;
        int restam = capacidade - vendidos;

        Console.WriteLine("Capacidade: " + capacidade);
        Console.WriteLine("Vendidos: " + vendidos);
        Console.WriteLine("Restam: " + restam);
    }
}
`,
      hints: [
        'Capacidade é fileiras multiplicado por assentos por fileira.',
        'Guarde os resultados em variáveis novas antes de imprimir: fica mais legível.',
      ],
      tests: [
        {
          name: 'Ocupação do cinema',
          expectedStdout: 'Capacidade: 216\nVendidos: 173\nRestam: 43',
        },
      ],
    },
  },
  {
    id: 's01c02l03',
    title: 'Números reais: double e decimal',
    objective: 'Escolher entre double e decimal com base no problema, e evitar erros de arredondamento em dinheiro.',
    concept: [
      {
        kind: 'text',
        body:
          'Para números com parte fracionária existem dois candidatos, e a escolha errada causa bugs difíceis de achar. `double` é rápido e aproximado. `decimal` é exato em base 10 e mais lento.',
      },
      {
        kind: 'code',
        code: `double medida = 1.75;        // sem sufixo, literal decimal e double
decimal preco = 199.90m;     // o m e obrigatorio para decimal
float leve = 2.5f;           // raro, precisao ainda menor

Console.WriteLine(0.1 + 0.2);            // 0.30000000000000004
Console.WriteLine(0.1m + 0.2m);          // 0.3`,
      },
      {
        kind: 'table',
        headers: ['Tipo', 'Precisão', 'Use para'],
        rows: [
          ['`double`', '~15 dígitos, base 2', 'Medidas físicas, gráficos, estatística, ciência'],
          ['`decimal`', '~28 dígitos, base 10', 'Dinheiro, impostos, qualquer valor financeiro'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`0.1 + 0.2` não dá exatamente `0.3` em `double` porque frações decimais não têm representação exata em binário. Em cálculo de dinheiro, esse resto viaja pelo sistema e vira diferença de centavos no fechamento.',
      },
    ],
    quiz: [
      {
        id: 's01c02l03q1',
        type: 'single',
        prompt: 'Você está calculando o total de um carrinho de compras. Qual tipo usar?',
        options: [
          { id: 'a', code: 'decimal', correct: true },
          { id: 'b', code: 'double' },
          { id: 'c', code: 'float' },
          { id: 'd', code: 'int' },
        ],
        explanation:
          'Dinheiro pede `decimal`: base 10 e exato para valores monetários. `double` acumula erro de arredondamento a cada operação.',
      },
      {
        id: 's01c02l03q2',
        type: 'single',
        prompt: 'Por que este código não compila?',
        code: 'decimal preco = 49.90;',
        options: [
          { id: 'a', text: 'Falta o sufixo `m`: o literal é interpretado como `double`.', correct: true },
          { id: 'b', text: '`decimal` não aceita casas decimais.' },
          { id: 'c', text: 'O separador deveria ser vírgula.' },
          { id: 'd', text: '`decimal` precisa ser declarado com `var`.' },
        ],
        explanation:
          'Sem sufixo, `49.90` é `double`, e C# não converte `double` para `decimal` implicitamente. O correto é `49.90m`.',
      },
      {
        id: 's01c02l03q3',
        type: 'single',
        prompt: 'O que este código imprime?',
        code: 'Console.WriteLine(10.0 / 4);',
        options: [
          { id: 'a', code: '2.5', correct: true },
          { id: 'b', code: '2' },
          { id: 'c', code: '3' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          'Como `10.0` é `double`, o `4` é promovido para `double` e a divisão é real. Se fosse `10 / 4`, ambos inteiros, o resultado seria `2`.',
      },
    ],
    challenge: {
      brief:
        'Calcule o total de uma compra com desconto. Use `decimal` porque o valor é dinheiro.',
      requirements: [
        'Preço unitário `89.90m`, quantidade `3`, desconto de `20.00m` no total',
        'Linha 1: `Subtotal: 269.70`',
        'Linha 2: `Desconto: 20.00`',
        'Linha 3: `Total: 249.70`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        decimal precoUnitario = 89.90m;
        int quantidade = 3;
        decimal desconto = 20.00m;

        // Calcule subtotal e total
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        decimal precoUnitario = 89.90m;
        int quantidade = 3;
        decimal desconto = 20.00m;

        decimal subtotal = precoUnitario * quantidade;
        decimal total = subtotal - desconto;

        Console.WriteLine("Subtotal: " + subtotal);
        Console.WriteLine("Desconto: " + desconto);
        Console.WriteLine("Total: " + total);
    }
}
`,
      hints: [
        'Multiplicar `decimal` por `int` funciona e o resultado continua `decimal`.',
        'O `decimal` preserva as casas decimais do literal, então `89.90m * 3` imprime `269.70`.',
      ],
      tests: [
        {
          name: 'Compra com desconto',
          expectedStdout: 'Subtotal: 269.70\nDesconto: 20.00\nTotal: 249.70',
        },
      ],
    },
  },
  {
    id: 's01c02l04',
    title: 'Verdadeiro ou falso com bool',
    objective: 'Guardar respostas de sim ou não em variáveis e usá-las como condição.',
    concept: [
      {
        kind: 'text',
        body:
          '`bool` só tem dois valores: `true` e `false`. Parece pouco, mas é o tipo que dirige todas as decisões de um programa.',
      },
      {
        kind: 'code',
        code: `bool ativo = true;
bool bloqueado = false;

int idade = 20;
bool maiorDeIdade = idade >= 18;   // comparacoes produzem bool

Console.WriteLine(maiorDeIdade);   // True`,
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Nomeie `bool` como uma afirmação que pode ser verdadeira: `estaAtivo`, `temEstoque`, `foiPago`. Assim `if (temEstoque)` se lê como uma frase.',
      },
      {
        kind: 'compare',
        goodLabel: 'Direto',
        badLabel: 'Redundante',
        good: `if (temEstoque)
{
    Console.WriteLine("Disponivel");
}`,
        bad: `if (temEstoque == true)
{
    Console.WriteLine("Disponivel");
}`,
      },
    ],
    quiz: [
      {
        id: 's01c02l04q1',
        type: 'single',
        prompt: 'O que este código imprime?',
        code: `int nota = 7;
bool aprovado = nota >= 6;
Console.WriteLine(aprovado);`,
        options: [
          { id: 'a', code: 'True', correct: true },
          { id: 'b', code: 'true' },
          { id: 'c', code: '7' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          'A comparação `7 >= 6` produz `true`, e ao converter para texto o C# imprime `True` com inicial maiúscula.',
      },
      {
        id: 's01c02l04q2',
        type: 'single',
        prompt: 'Qual atribuição está incorreta em C#?',
        options: [
          { id: 'a', code: 'bool ok = 1;', correct: true },
          { id: 'b', code: 'bool ok = true;' },
          { id: 'c', code: 'bool ok = 5 > 3;' },
          { id: 'd', code: 'bool ok = false;' },
        ],
        explanation:
          'Diferente de C ou JavaScript, C# não trata número como booleano. `1` não é `true`, e a conversão nem existe.',
      },
      {
        id: 's01c02l04q3',
        type: 'single',
        prompt: 'Qual nome de variável booleana é mais claro?',
        options: [
          { id: 'a', code: 'bool temSaldoSuficiente = saldo >= valor;', correct: true },
          { id: 'b', code: 'bool saldo2 = saldo >= valor;' },
          { id: 'c', code: 'bool x = saldo >= valor;' },
          { id: 'd', code: 'bool verificacao = saldo >= valor;' },
        ],
        explanation:
          'O nome deve descrever a afirmação sendo testada. `verificacao` não diz o que foi verificado nem o que significa `true`.',
      },
    ],
    challenge: {
      brief:
        'Um sistema decide se um pedido pode ser enviado. Calcule três condições em variáveis `bool` e imprima cada uma.',
      requirements: [
        'Dados: `estoque = 4`, `quantidadePedida = 4`, `pagamentoConfirmado = true`, `enderecoValido = false`',
        'Linha 1: `Tem estoque: True`',
        'Linha 2: `Pronto para pagar: True`',
        'Linha 3: `Pode enviar: False`',
        '`Pode enviar` só é verdadeiro se houver estoque, pagamento confirmado **e** endereço válido',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int estoque = 4;
        int quantidadePedida = 4;
        bool pagamentoConfirmado = true;
        bool enderecoValido = false;

        // Calcule as tres condicoes em variaveis bool
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int estoque = 4;
        int quantidadePedida = 4;
        bool pagamentoConfirmado = true;
        bool enderecoValido = false;

        bool temEstoque = estoque >= quantidadePedida;
        bool prontoParaPagar = pagamentoConfirmado;
        bool podeEnviar = temEstoque && pagamentoConfirmado && enderecoValido;

        Console.WriteLine("Tem estoque: " + temEstoque);
        Console.WriteLine("Pronto para pagar: " + prontoParaPagar);
        Console.WriteLine("Pode enviar: " + podeEnviar);
    }
}
`,
      hints: [
        '`estoque >= quantidadePedida` já devolve um `bool`.',
        'Combine as três condições com `&&`, que exige todas verdadeiras.',
      ],
      tests: [
        {
          name: 'Decisão de envio',
          expectedStdout: 'Tem estoque: True\nPronto para pagar: True\nPode enviar: False',
        },
      ],
    },
  },
  {
    id: 's01c02l05',
    title: 'Um único caractere com char',
    objective: 'Distinguir char de string e usar aspas simples corretamente.',
    concept: [
      {
        kind: 'text',
        body:
          '`char` guarda exatamente **um** caractere e usa aspas simples. `string` guarda zero ou mais e usa aspas duplas. Trocar as aspas é erro de compilação, não detalhe de estilo.',
      },
      {
        kind: 'code',
        code: `char inicial = 'A';
char separador = ';';
string nome = "Ana";

Console.WriteLine(nome[0]);        // A, e um char
Console.WriteLine(nome.Length);    // 3`,
      },
      {
        kind: 'table',
        headers: ['Escrita', 'Tipo', 'Válido?'],
        rows: [
          ['`char c = 65;`', '`char`', 'Sim, imprime `A` (código Unicode)'],
          ['`char c = "A";`', '—', 'Não: aspas duplas produzem `string`'],
          ['`string s = "A";`', '`string`', 'Sim'],
          ['`char c = "AB";`', '—', 'Não: `char` é um único caractere'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Indexar uma string devolve `char`: `nome[0]` é `A`, não `"A"`. Isso importa quando você começa a comparar ou somar caracteres.',
      },
    ],
    quiz: [
      {
        id: 's01c02l05q1',
        type: 'single',
        prompt: 'Qual linha não compila?',
        options: [
          { id: 'a', code: "char letra = \"B\";", correct: true },
          { id: 'b', code: "char letra = 'B';" },
          { id: 'c', code: 'string letra = "B";' },
          { id: 'd', code: "char letra = 'B';\nstring texto = letra.ToString();" },
        ],
        explanation:
          'Aspas duplas criam uma `string`, e uma `string` não cabe em um `char`. Para um caractere, use aspas simples.',
      },
      {
        id: 's01c02l05q2',
        type: 'single',
        prompt: 'O que imprime?',
        code: `string palavra = "casa";
Console.WriteLine(palavra[2]);`,
        options: [
          { id: 'a', code: 's', correct: true },
          { id: 'b', code: 'a' },
          { id: 'c', code: 'as' },
          { id: 'd', text: 'Erro: índice fora dos limites' },
        ],
        explanation:
          'Índices começam em 0: `c`=0, `a`=1, `s`=2, `a`=3. Então a posição 2 é `s`.',
      },
      {
        id: 's01c02l05q3',
        type: 'single',
        prompt: 'Qual é a saída?',
        code: `char c = 'a';
Console.WriteLine((int)c);`,
        options: [
          { id: 'a', code: '97', correct: true },
          { id: 'b', code: 'a' },
          { id: 'c', code: '0' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          'Um `char` é internamente um código numérico Unicode. A letra `a` minúscula é 97, e `A` maiúscula é 65.',
      },
    ],
    challenge: {
      brief:
        'Extraia as iniciais de um nome completo. Você recebe o nome e o sobrenome em variáveis e deve montar as iniciais separadas por ponto.',
      requirements: [
        'Dados: `nome = "Mariana"` e `sobrenome = "Costa"`',
        'Saída: `M.C.`',
        'As letras devem ser **extraídas** das strings, não digitadas na mão',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        string nome = "Mariana";
        string sobrenome = "Costa";

        // Extraia a primeira letra de cada um e monte as iniciais
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        string nome = "Mariana";
        string sobrenome = "Costa";

        char inicialNome = nome[0];
        char inicialSobrenome = sobrenome[0];

        Console.WriteLine(inicialNome + "." + inicialSobrenome + ".");
    }
}
`,
      hints: [
        '`nome[0]` devolve o primeiro caractere.',
        'Ao juntar `char` com `string` usando `+`, o resultado é `string`.',
      ],
      tests: [{ name: 'Iniciais montadas', expectedStdout: 'M.C.' }],
    },
  },
  {
    id: 's01c02l06',
    title: 'Texto com string',
    objective: 'Trabalhar com strings, entender que elas são imutáveis e conhecer string.Empty e null.',
    concept: [
      {
        kind: 'text',
        body:
          '`string` guarda texto de qualquer tamanho. O detalhe mais importante: strings em C# são **imutáveis**. Nenhum método altera a string original — todos devolvem uma nova.',
      },
      {
        kind: 'code',
        code: `string nome = "ana";
string maiusculo = nome.ToUpper();

Console.WriteLine(nome);        // ana, inalterada
Console.WriteLine(maiusculo);   // ANA`,
      },
      {
        kind: 'table',
        headers: ['Valor', 'Significado'],
        rows: [
          ['`"texto"`', 'Uma string com conteúdo'],
          ['`""` ou `string.Empty`', 'String vazia: existe, tem zero caracteres'],
          ['`null`', 'Nenhuma string: a variável não aponta para nada'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Vazio e `null` são coisas diferentes. `"".Length` é `0`, mas `null.Length` lança `NullReferenceException`. Use `string.IsNullOrEmpty(valor)` para cobrir os dois casos de uma vez.',
      },
    ],
    quiz: [
      {
        id: 's01c02l06q1',
        type: 'single',
        prompt: 'O que este código imprime?',
        code: `string s = "abc";
s.ToUpper();
Console.WriteLine(s);`,
        options: [
          { id: 'a', code: 'abc', correct: true },
          { id: 'b', code: 'ABC' },
          { id: 'c', text: 'Nada' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          'Strings são imutáveis: `ToUpper()` devolve uma nova string, que aqui foi descartada. Para usar o resultado é preciso guardá-lo: `s = s.ToUpper();`.',
      },
      {
        id: 's01c02l06q2',
        type: 'single',
        prompt: 'Qual expressão avalia como `true`?',
        code: `string a = "";
string b = null;`,
        options: [
          { id: 'a', code: 'string.IsNullOrEmpty(a) && string.IsNullOrEmpty(b)', correct: true },
          { id: 'b', code: 'a == b' },
          { id: 'c', code: 'a.Length == b.Length' },
          { id: 'd', code: 'b.Length == 0' },
        ],
        explanation:
          '`IsNullOrEmpty` cobre os dois casos com segurança. As opções C e D acessam `b.Length` e lançariam `NullReferenceException`.',
      },
      {
        id: 's01c02l06q3',
        type: 'single',
        prompt: 'O que imprime?',
        code: `string frase = "bom dia";
Console.WriteLine(frase.Length);`,
        options: [
          { id: 'a', code: '7', correct: true },
          { id: 'b', code: '6' },
          { id: 'c', code: '8' },
          { id: 'd', code: '2' },
        ],
        explanation:
          'O espaço conta como caractere: `b`, `o`, `m`, espaço, `d`, `i`, `a` são 7.',
      },
    ],
    challenge: {
      brief:
        'Normalize o cadastro de um usuário. A partir de um nome com formatação inconsistente, produza a versão em maiúsculas e informe o tamanho.',
      requirements: [
        'Dado: `entrada = "  joana ribeiro  "`',
        'Linha 1: `Normalizado: JOANA RIBEIRO`',
        'Linha 2: `Tamanho: 13`',
        'Remova os espaços das pontas antes de contar',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        string entrada = "  joana ribeiro  ";

        // Remova os espacos das pontas, deixe em maiusculas e conte
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        string entrada = "  joana ribeiro  ";

        string limpo = entrada.Trim();
        string normalizado = limpo.ToUpper();

        Console.WriteLine("Normalizado: " + normalizado);
        Console.WriteLine("Tamanho: " + normalizado.Length);
    }
}
`,
      hints: [
        '`Trim()` remove espaços do início e do fim.',
        'Como os métodos devolvem uma nova string, guarde o resultado em outra variável.',
        'Conte o tamanho **depois** de remover os espaços.',
      ],
      tests: [
        {
          name: 'Nome normalizado',
          expectedStdout: 'Normalizado: JOANA RIBEIRO\nTamanho: 13',
        },
      ],
    },
  },
  {
    id: 's01c02l07',
    title: 'var e inferência de tipo',
    objective: 'Usar var onde ele melhora a leitura e reconhecer onde ele piora.',
    concept: [
      {
        kind: 'text',
        body:
          '`var` não significa que a variável não tem tipo. Significa que o **compilador descobre o tipo** a partir do valor atribuído. O tipo continua fixo e verificado.',
      },
      {
        kind: 'code',
        code: `var idade = 30;            // int
var preco = 19.90m;        // decimal
var nome = "Ana";          // string
var ativo = true;          // bool

idade = "trinta";          // ERRO: idade e int para sempre`,
      },
      {
        kind: 'compare',
        goodLabel: 'var ajuda',
        badLabel: 'var esconde',
        good: `var itens = new Dictionary<string, List<int>>();`,
        bad: `var resultado = Calcular();`,
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Regra prática: use `var` quando o tipo já está óbvio do lado direito. Escreva o tipo explícito quando ele vem de uma chamada de método cujo retorno não é evidente.',
      },
    ],
    quiz: [
      {
        id: 's01c02l07q1',
        type: 'single',
        prompt: 'Qual é o tipo de `x`?',
        code: 'var x = 10 / 4;',
        options: [
          { id: 'a', code: 'int', correct: true },
          { id: 'b', code: 'double' },
          { id: 'c', code: 'decimal' },
          { id: 'd', text: 'Depende do valor em tempo de execução' },
        ],
        explanation:
          'Os dois operandos são `int`, então a divisão é inteira e o resultado é `int` com valor `2`. `var` só copia o tipo da expressão.',
      },
      {
        id: 's01c02l07q2',
        type: 'single',
        prompt: 'Por que esta linha não compila?',
        code: 'var total;',
        options: [
          { id: 'a', text: '`var` exige um valor inicial para o compilador inferir o tipo.', correct: true },
          { id: 'b', text: '`var` só funciona com números.' },
          { id: 'c', text: 'Falta o ponto e vírgula.' },
          { id: 'd', text: '`total` é uma palavra reservada.' },
        ],
        explanation:
          'Sem valor atribuído não há nada de onde inferir. `var` e declaração sem inicialização são incompatíveis por definição.',
      },
      {
        id: 's01c02l07q3',
        type: 'single',
        prompt: 'Qual afirmação sobre `var` é verdadeira?',
        options: [
          { id: 'a', text: 'O tipo é decidido em tempo de compilação e não muda depois.', correct: true },
          { id: 'b', text: 'A variável pode receber valores de tipos diferentes ao longo do programa.' },
          { id: 'c', text: '`var` deixa o programa mais lento.' },
          { id: 'd', text: '`var` é o mesmo que `dynamic`.' },
        ],
        explanation:
          '`var` é açúcar sintático: o código compilado é idêntico ao da versão com tipo explícito. `dynamic`, esse sim, adia a verificação para a execução.',
      },
    ],
    challenge: {
      brief:
        'Reescreva o cálculo abaixo usando `var` em todas as declarações onde o tipo é óbvio, mantendo exatamente a mesma saída.',
      requirements: [
        'Dados: 3 diárias a `250.00m` cada, com taxa de `45.50m`',
        'Linha 1: `Diarias: 750.00`',
        'Linha 2: `Total: 795.50`',
        'Use `var` nas declarações',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        var noites = 3;
        var valorDiaria = 250.00m;
        var taxa = 45.50m;

        // Calcule o valor das diarias e o total
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        var noites = 3;
        var valorDiaria = 250.00m;
        var taxa = 45.50m;

        var diarias = valorDiaria * noites;
        var total = diarias + taxa;

        Console.WriteLine("Diarias: " + diarias);
        Console.WriteLine("Total: " + total);
    }
}
`,
      hints: [
        '`decimal * int` continua `decimal`, então `var` infere `decimal`.',
        'A soma de dois `decimal` preserva as duas casas decimais.',
      ],
      tests: [
        { name: 'Hospedagem com taxa', expectedStdout: 'Diarias: 750.00\nTotal: 795.50' },
      ],
    },
  },
  {
    id: 's01c02l08',
    title: 'Constantes com const',
    objective: 'Eliminar números mágicos declarando valores fixos com nome.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma `const` é um valor que nunca muda, resolvido em tempo de compilação. Serve para dar nome a números e textos que aparecem soltos no código.',
      },
      {
        kind: 'compare',
        goodLabel: 'Com nome',
        badLabel: 'Número mágico',
        good: `const decimal AliquotaIss = 0.05m;
var imposto = valor * AliquotaIss;`,
        bad: `var imposto = valor * 0.05m;`,
      },
      {
        kind: 'code',
        code: `const int MinutosPorHora = 60;
const string Versao = "1.4.2";

// MinutosPorHora = 61;   // ERRO: nao se atribui a uma const`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O ganho não é performance, é manutenção. Quando a alíquota mudar, você altera um lugar. E quando alguém ler `valor * 0.05m` em seis meses, ninguém vai saber o que era esse `0.05`.',
      },
    ],
    quiz: [
      {
        id: 's01c02l08q1',
        type: 'single',
        prompt: 'Qual linha não compila?',
        code: `const int Limite = 100;`,
        options: [
          { id: 'a', code: 'Limite = 200;', correct: true },
          { id: 'b', code: 'int dobro = Limite * 2;' },
          { id: 'c', code: 'Console.WriteLine(Limite);' },
          { id: 'd', code: 'bool passou = 150 > Limite;' },
        ],
        explanation:
          'Uma `const` é somente leitura por definição. Qualquer atribuição depois da declaração é erro de compilação.',
      },
      {
        id: 's01c02l08q2',
        type: 'single',
        prompt: 'Por que esta declaração não é válida?',
        code: 'const int Agora = DateTime.Now.Year;',
        options: [
          { id: 'a', text: 'Uma `const` precisa de um valor conhecido em tempo de compilação.', correct: true },
          { id: 'b', text: '`const` não aceita `int`.' },
          { id: 'c', text: 'Falta o sufixo do tipo.' },
          { id: 'd', text: 'Constantes precisam começar com letra minúscula.' },
        ],
        explanation:
          '`DateTime.Now.Year` só é conhecido ao rodar. Para valores fixados na inicialização mas calculados em execução, use `readonly` em um campo.',
      },
      {
        id: 's01c02l08q3',
        type: 'single',
        prompt: 'Qual é o principal benefício de trocar `0.21m` por `const decimal AliquotaIva = 0.21m;`?',
        options: [
          { id: 'a', text: 'O código explica a intenção e a mudança acontece em um único lugar.', correct: true },
          { id: 'b', text: 'O programa executa mais rápido.' },
          { id: 'c', text: 'O valor passa a ocupar menos memória.' },
          { id: 'd', text: 'Evita erros de arredondamento.' },
        ],
        explanation:
          'É uma questão de legibilidade e manutenção. O código gerado é praticamente o mesmo.',
      },
    ],
    challenge: {
      brief:
        'Converta uma duração em segundos para horas, minutos e segundos. Use constantes com nome em vez dos números 60 e 3600 soltos.',
      requirements: [
        'Dado: `totalSegundos = 7385`',
        'Declare pelo menos uma `const`',
        'Linha 1: `Horas: 2`',
        'Linha 2: `Minutos: 3`',
        'Linha 3: `Segundos: 5`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        const int SegundosPorMinuto = 60;
        const int SegundosPorHora = 3600;
        int totalSegundos = 7385;

        // Quebre em horas, minutos e segundos
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        const int SegundosPorMinuto = 60;
        const int SegundosPorHora = 3600;
        int totalSegundos = 7385;

        int horas = totalSegundos / SegundosPorHora;
        int resto = totalSegundos % SegundosPorHora;
        int minutos = resto / SegundosPorMinuto;
        int segundos = resto % SegundosPorMinuto;

        Console.WriteLine("Horas: " + horas);
        Console.WriteLine("Minutos: " + minutos);
        Console.WriteLine("Segundos: " + segundos);
    }
}
`,
      hints: [
        'Divisão inteira `/` dá a parte cheia, e `%` dá o resto.',
        'Depois de extrair as horas, trabalhe com o resto para achar os minutos.',
      ],
      tests: [
        { name: 'Conversão de 7385 segundos', expectedStdout: 'Horas: 2\nMinutos: 3\nSegundos: 5' },
      ],
    },
  },
  {
    id: 's01c02l09',
    title: 'Prática: ficha de personagem',
    objective: 'Escolher o tipo adequado para cada dado de um problema real e montar uma saída formatada.',
    concept: [
      {
        kind: 'text',
        body:
          'Escolher tipos é uma decisão de modelagem, não burocracia. Cada dado tem uma natureza: contagem, medida, dinheiro, sim ou não, texto, caractere.',
      },
      {
        kind: 'table',
        headers: ['Dado', 'Tipo natural', 'Por quê'],
        rows: [
          ['Nível do personagem', '`int`', 'Contagem, sem fração'],
          ['Vida atual', '`int`', 'Pontos inteiros'],
          ['Altura em metros', '`double`', 'Medida física, precisão aproximada basta'],
          ['Ouro acumulado', '`decimal`', 'Valor monetário'],
          ['Está vivo', '`bool`', 'Sim ou não'],
          ['Classe (`M`, `G`, `A`)', '`char`', 'Um único caractere'],
        ],
      },
    ],
    quiz: [
      {
        id: 's01c02l09q1',
        type: 'single',
        prompt: 'Qual tipo é o mais adequado para a quantidade de poções no inventário?',
        options: [
          { id: 'a', code: 'int', correct: true },
          { id: 'b', code: 'double' },
          { id: 'c', code: 'decimal' },
          { id: 'd', code: 'string' },
        ],
        explanation:
          'Contagem de itens é inteira: não existe meia poção. `int` é a escolha padrão para contagens.',
      },
      {
        id: 's01c02l09q2',
        type: 'single',
        prompt: 'O personagem tem `1.82` metros. Qual declaração está correta?',
        options: [
          { id: 'a', code: 'double altura = 1.82;', correct: true },
          { id: 'b', code: 'int altura = 1.82;' },
          { id: 'c', code: 'decimal altura = 1.82;' },
          { id: 'd', code: "char altura = '1.82';" },
        ],
        explanation:
          '`int` não aceita fração, `decimal` exigiria o sufixo `m`, e `char` guarda um caractere só. Para medida física, `double` é o natural.',
      },
      {
        id: 's01c02l09q3',
        type: 'multiple',
        prompt: 'Quais escolhas de tipo estão adequadas?',
        options: [
          { id: 'a', text: '`bool estaVivo` para indicar se o personagem sobreviveu.', correct: true },
          { id: 'b', text: '`decimal ouro` para a moeda do jogo.', correct: true },
          { id: 'c', text: '`string nivel` para o nível numérico do personagem.' },
          { id: 'd', text: "`char classe` para guardar `'G'` de Guerreiro.", correct: true },
        ],
        explanation:
          'Guardar número como `string` impede contas e comparações numéricas. Nível é contagem, então `int`.',
      },
    ],
    challenge: {
      brief:
        'Monte a ficha de um personagem. Os valores já estão definidos: sua tarefa é escolher os tipos e produzir a saída exata.',
      requirements: [
        'Nome `Kaela`, classe `G`, nível `7`, vida `120`, altura `1.68`, ouro `340.50`, viva `true`',
        'Saída em 4 linhas, no formato mostrado nas dicas',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // Declare cada dado com o tipo adequado e imprima a ficha
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        string nome = "Kaela";
        char classe = 'G';
        int nivel = 7;
        int vida = 120;
        double altura = 1.68;
        decimal ouro = 340.50m;
        bool viva = true;

        Console.WriteLine("Personagem: " + nome + " [" + classe + "]");
        Console.WriteLine("Nivel " + nivel + " | Vida " + vida);
        Console.WriteLine("Altura: " + altura + "m | Ouro: " + ouro);
        Console.WriteLine("Viva: " + viva);
    }
}
`,
      hints: [
        'Linha 1: `Personagem: Kaela [G]`',
        'Linha 2: `Nivel 7 | Vida 120`',
        'Linha 3: `Altura: 1.68m | Ouro: 340.50`',
        'Linha 4: `Viva: True`',
      ],
      tests: [
        {
          name: 'Ficha completa',
          expectedStdout:
            'Personagem: Kaela [G]\nNivel 7 | Vida 120\nAltura: 1.68m | Ouro: 340.50\nViva: True',
        },
      ],
    },
  },
  {
    id: 's01c02l10',
    title: 'Checkpoint: escolhendo tipos',
    objective: 'Consolidar tipos, declarações, const e inferência antes de partir para operadores.',
    concept: [
      {
        kind: 'text',
        body:
          'Checkpoint de capítulo. A partir daqui, todo problema começa com a mesma pergunta: qual é a natureza de cada dado, e qual tipo representa isso melhor?',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Escolha'],
        rows: [
          ['Contar, indexar, numerar', '`int`'],
          ['Números muito grandes', '`long`'],
          ['Medida física ou científica', '`double`'],
          ['Dinheiro, imposto, taxa', '`decimal` (com sufixo `m`)'],
          ['Sim ou não', '`bool`'],
          ['Um caractere', '`char` (aspas simples)'],
          ['Texto', '`string` (aspas duplas)'],
          ['Valor fixo com nome', '`const`'],
        ],
      },
    ],
    quiz: [
      {
        id: 's01c02l10q1',
        type: 'single',
        prompt: 'Quantos erros de compilação existem neste bloco?',
        code: `int a = 2.5;
decimal b = 10.0;
char c = "x";
bool d = 1;
string e = "ok";`,
        options: [
          { id: 'a', text: 'Quatro', correct: true },
          { id: 'b', text: 'Dois' },
          { id: 'c', text: 'Três' },
          { id: 'd', text: 'Cinco' },
        ],
        explanation:
          '`int a = 2.5` (fração em inteiro), `decimal b = 10.0` (falta `m`), `char c = "x"` (aspas duplas) e `bool d = 1` (número não é booleano). Só a última linha está correta.',
      },
      {
        id: 's01c02l10q2',
        type: 'single',
        prompt: 'Qual é a saída?',
        code: `const int Fator = 3;
var valor = 7;
var resultado = valor * Fator;
Console.WriteLine(resultado);`,
        options: [
          { id: 'a', code: '21', correct: true },
          { id: 'b', code: '73' },
          { id: 'c', text: 'Erro: não se pode multiplicar por uma `const`' },
          { id: 'd', text: 'Erro: `var` não aceita multiplicação' },
        ],
        explanation:
          'Uma `const` pode ser lida livremente, apenas não pode ser reatribuída. `var` infere `int`, e `7 * 3` é `21`.',
      },
      {
        id: 's01c02l10q3',
        type: 'single',
        prompt: 'Você precisa somar valores de nota fiscal e o total tem que fechar exatamente ao centavo. Qual combinação escolher?',
        options: [
          { id: 'a', text: '`decimal` com literais terminados em `m`', correct: true },
          { id: 'b', text: '`double` com arredondamento no final' },
          { id: 'c', text: '`float` para economizar memória' },
          { id: 'd', text: '`int` guardando o valor em centavos e convertendo na saída' },
        ],
        explanation:
          'A opção D até funciona na prática, mas `decimal` foi criado exatamente para isso e mantém o código legível. `double` e `float` acumulam erro de base 2.',
      },
    ],
    challenge: {
      brief:
        'Feche o caixa de uma cafeteria. Você recebe as quantidades vendidas e os preços, e precisa produzir o resumo com a taxa de serviço aplicada.',
      requirements: [
        '12 cafés a `7.50m` e 5 bolos a `12.00m`',
        'Taxa de serviço de 10% sobre o subtotal, declarada como `const`',
        'Linha 1: `Cafes: 90.00`',
        'Linha 2: `Bolos: 60.00`',
        'Linha 3: `Subtotal: 150.00`',
        'Linha 4: `Servico: 15.0000`',
        'Linha 5: `Total: 165.0000`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        const decimal TaxaServico = 0.10m;

        int qtdCafes = 12;
        decimal precoCafe = 7.50m;
        int qtdBolos = 5;
        decimal precoBolo = 12.00m;

        // Calcule cada linha do fechamento
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        const decimal TaxaServico = 0.10m;

        int qtdCafes = 12;
        decimal precoCafe = 7.50m;
        int qtdBolos = 5;
        decimal precoBolo = 12.00m;

        decimal totalCafes = qtdCafes * precoCafe;
        decimal totalBolos = qtdBolos * precoBolo;
        decimal subtotal = totalCafes + totalBolos;
        decimal servico = subtotal * TaxaServico;
        decimal total = subtotal + servico;

        Console.WriteLine("Cafes: " + totalCafes);
        Console.WriteLine("Bolos: " + totalBolos);
        Console.WriteLine("Subtotal: " + subtotal);
        Console.WriteLine("Servico: " + servico);
        Console.WriteLine("Total: " + total);
    }
}
`,
      hints: [
        'Multiplique quantidade por preço para cada item.',
        'A taxa é `subtotal * TaxaServico`.',
        'Atenção a um detalhe de `decimal`: as casas decimais **somam** na multiplicação. `150.00m` (2 casas) vezes `0.10m` (2 casas) dá `15.0000` com 4 casas, e essa escala é preservada na soma final.',
      ],
      tests: [
        {
          name: 'Fechamento do caixa',
          expectedStdout:
            'Cafes: 90.00\nBolos: 60.00\nSubtotal: 150.00\nServico: 15.0000\nTotal: 165.0000',
        },
      ],
    },
  },
]
