import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's01c07l01',
    title: 'Lendo o enunciado como um programador',
    objective: 'Extrair entradas, saídas, regras e casos especiais de um texto em português antes de escrever qualquer linha.',
    concept: [
      {
        kind: 'text',
        body:
          'A parte mais difícil de programar não é a sintaxe: é entender exatamente o que precisa ser feito. Antes de digitar, todo enunciado deve ser destrinchado em quatro perguntas.',
      },
      {
        kind: 'table',
        headers: ['Pergunta', 'O que procurar'],
        rows: [
          ['O que **entra**?', 'quantos valores, em que ordem, de que tipo'],
          ['O que **sai**?', 'quantas linhas, em que formato exato'],
          ['Quais são as **regras**?', 'cálculos, limites, condições'],
          ['Quais são as **exceções**?', 'zero, negativo, vazio, empate, limite'],
        ],
      },
      {
        kind: 'text',
        body:
          'Palavras do enunciado carregam informação técnica. "Até" inclui o limite, "acima de" exclui, "no máximo" é um teto, "pelo menos" é um piso, "cada" sugere repetição, "ou" e "e" viram operadores lógicos.',
      },
      {
        kind: 'code',
        code: `// Enunciado: "Cobre R$ 5 por item. Pedidos com 10 itens
// ou mais tem 20% de desconto. Frete gratis acima de R$ 100."

// Entrada: quantidade de itens (int)
// Saida: subtotal, desconto, frete, total
// Regras: subtotal = 5 * itens
//         desconto = 20% SE itens >= 10   ("ou mais" inclui 10)
//         frete = 0 SE subtotal > 100     ("acima de" exclui 100)
//         senao frete = 15
// Bordas: 0 itens, exatamente 10 itens, subtotal exatamente 100`,
        caption: 'Cinco minutos de tradução economizam meia hora de depuração.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Escreva os casos de borda **antes** de programar. Se você já sabe que precisa testar 0, 10 e o subtotal exato de 100, é muito mais difícil errar o limite.',
      },
    ],
    quiz: [
      {
        id: 's01c07l01q1',
        type: 'single',
        prompt: '"Desconto para pedidos de 10 itens ou mais". Qual condição traduz isso?',
        options: [
          { id: 'a', code: 'itens >= 10', correct: true },
          { id: 'b', code: 'itens > 10' },
          { id: 'c', code: 'itens <= 10' },
          { id: 'd', code: 'itens == 10' },
        ],
        explanation:
          '"Ou mais" inclui o próprio valor. Se fosse "mais de 10 itens", aí sim seria `> 10`.',
      },
      {
        id: 's01c07l01q2',
        type: 'single',
        prompt: '"O bônus é de no máximo R$ 500". O que isso define?',
        options: [
          { id: 'a', text: 'Um teto: o valor calculado nunca pode passar de 500.', correct: true },
          { id: 'b', text: 'Um piso: o valor sempre começa em 500.' },
          { id: 'c', text: 'Um valor fixo de 500.' },
          { id: 'd', text: 'Uma condição de erro quando o valor é 500.' },
        ],
        explanation:
          'Isso normalmente vira um `if (bonus > 500) { bonus = 500; }` ou um `Math.Min(bonus, 500)` depois do cálculo.',
      },
      {
        id: 's01c07l01q3',
        type: 'multiple',
        prompt:
          'Enunciado: "Leia a nota de 3 provas e informe a média. Notas fora de 0 a 10 são inválidas." Quais casos de borda você testaria?',
        options: [
          { id: 'a', text: 'Uma nota exatamente 0 e uma exatamente 10.', correct: true },
          { id: 'b', text: 'Uma nota negativa e uma acima de 10.', correct: true },
          { id: 'c', text: 'Uma média que não dá um número redondo.', correct: true },
          { id: 'd', text: 'Todas as três notas iguais.' },
          { id: 'e', text: 'Notas escritas com letras.', correct: true },
        ],
        explanation:
          'Notas iguais não são um caso especial: o cálculo é o mesmo. Os limites, os valores fora da faixa, a divisão não exata e a entrada não numérica são os que quebram programas.',
      },
    ],
    challenge: {
      brief:
        'Traduza este enunciado: "Uma papelaria cobra R$ 5,00 por item. Pedidos de 10 itens ou mais recebem 20% de desconto. O frete é R$ 15,00, mas fica grátis quando o subtotal passa de R$ 100,00." Leia a quantidade de itens e imprima o extrato.',
      requirements: [
        'Para 25 itens, linha 1: `Subtotal: 125.00`',
        'Linha 2: `Desconto: 25.0000`',
        'Linha 3: `Frete: 0.00`',
        'Linha 4: `Total: 100.0000`',
        'O desconto vale para 10 itens **ou mais**',
        'O frete é grátis quando o subtotal passa de 100, ou seja, acima de 100 e não igual',
        'Use `decimal` para os valores',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int itens = int.Parse(Console.ReadLine());

        // Subtotal, desconto, frete e total
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int itens = int.Parse(Console.ReadLine());

        decimal subtotal = 5.00m * itens;

        decimal desconto = 0.00m;
        if (itens >= 10)
        {
            desconto = subtotal * 0.20m;
        }

        decimal frete = 15.00m;
        if (subtotal > 100.00m)
        {
            frete = 0.00m;
        }

        decimal total = subtotal - desconto + frete;

        Console.WriteLine($"Subtotal: {subtotal}");
        Console.WriteLine($"Desconto: {desconto}");
        Console.WriteLine($"Frete: {frete}");
        Console.WriteLine($"Total: {total}");
    }
}
`,
      hints: [
        'O desconto usa `>= 10` porque o enunciado diz "ou mais".',
        'O frete usa `> 100` porque o enunciado diz "passa de", que exclui o valor exato.',
        'O frete é avaliado sobre o subtotal, não sobre o valor já com desconto.',
      ],
      tests: [
        {
          name: 'Pedido grande com frete grátis',
          stdin: '25\n',
          expectedStdout:
            'Subtotal: 125.00\nDesconto: 25.0000\nFrete: 0.00\nTotal: 100.0000',
        },
        {
          name: 'Exatamente 10 itens ganha desconto',
          stdin: '10\n',
          expectedStdout:
            'Subtotal: 50.00\nDesconto: 10.0000\nFrete: 15.00\nTotal: 55.0000',
        },
        {
          name: 'Nove itens sem desconto',
          stdin: '9\n',
          expectedStdout: 'Subtotal: 45.00\nDesconto: 0.00\nFrete: 15.00\nTotal: 60.00',
        },
        {
          name: 'Subtotal exatamente 100 ainda paga frete',
          stdin: '20\n',
          expectedStdout:
            'Subtotal: 100.00\nDesconto: 20.0000\nFrete: 15.00\nTotal: 95.0000',
        },
      ],
    },
  },
  {
    id: 's01c07l02',
    title: 'O padrão entrada, processamento, saída',
    objective: 'Estruturar todo programa em três blocos claros para reduzir erros e facilitar a depuração.',
    concept: [
      {
        kind: 'text',
        body:
          'Praticamente todo programa de console segue a mesma anatomia. Separar essas três fases visualmente é o hábito de organização com melhor retorno que existe.',
      },
      {
        kind: 'code',
        code: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        // 1. ENTRADA: ler e converter tudo
        int quantidade = int.Parse(Console.ReadLine());
        decimal preco = decimal.Parse(
            Console.ReadLine(), CultureInfo.InvariantCulture);

        // 2. PROCESSAMENTO: calcular e decidir
        decimal subtotal = preco * quantidade;
        decimal desconto = quantidade >= 10 ? subtotal * 0.1m : 0m;
        decimal total = subtotal - desconto;

        // 3. SAIDA: imprimir o resultado
        Console.WriteLine($"Subtotal: {subtotal:F2}");
        Console.WriteLine($"Total: {total:F2}");
    }
}
`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A vantagem prática é a depuração. Se o resultado saiu errado, você sabe exatamente onde olhar: leu errado, calculou errado, ou imprimiu errado. Cada fase é um suspeito isolado.',
      },
      {
        kind: 'text',
        body:
          'Um antipadrão comum é intercalar as três coisas: ler uma linha, imprimir algo, ler outra, calcular, imprimir. Funciona, mas fica impossível enxergar a lógica.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Misturado',
          code: `int a = int.Parse(Console.ReadLine());
Console.WriteLine(a * 2);
int b = int.Parse(Console.ReadLine());
Console.WriteLine(a + b);
Console.WriteLine(b * 2);`,
        },
        right: {
          label: 'Em fases',
          code: `int a = int.Parse(Console.ReadLine());
int b = int.Parse(Console.ReadLine());

int dobroA = a * 2;
int soma = a + b;
int dobroB = b * 2;

Console.WriteLine(dobroA);
Console.WriteLine(soma);
Console.WriteLine(dobroB);`,
        },
      },
      {
        kind: 'text',
        body:
          'Quando o programa cresce, cada fase vira um método próprio. Mas mesmo num programa de 20 linhas, marcar as fases já paga o investimento.',
      },
    ],
    quiz: [
      {
        id: 's01c07l02q1',
        type: 'single',
        prompt: 'Qual é a principal vantagem de separar entrada, processamento e saída?',
        options: [
          {
            id: 'a',
            text: 'Quando algo dá errado, você sabe em qual das três fases procurar.',
            correct: true,
          },
          { id: 'b', text: 'O programa executa mais rápido.' },
          { id: 'c', text: 'Reduz o número de variáveis necessárias.' },
          { id: 'd', text: 'Permite ler mais de uma linha por vez.' },
        ],
        explanation:
          'É uma vantagem de manutenção e depuração, não de desempenho. O código compilado é praticamente o mesmo.',
      },
      {
        id: 's01c07l02q2',
        type: 'single',
        prompt: 'Numa fase de processamento, o que NÃO deveria aparecer?',
        options: [
          { id: 'a', code: 'Console.ReadLine()', correct: true },
          { id: 'b', code: 'if (x > 10) { ... }' },
          { id: 'c', code: 'decimal total = a * b;' },
          { id: 'd', code: 'string s = nome.Trim();' },
        ],
        explanation:
          'Leitura pertence à fase de entrada. Cálculos, decisões e transformações são justamente o conteúdo do processamento.',
      },
      {
        id: 's01c07l02q3',
        type: 'single',
        prompt: 'Seu programa imprime um total errado. Qual é a forma mais rápida de localizar a causa?',
        options: [
          {
            id: 'a',
            text: 'Imprimir as variáveis intermediárias do processamento uma por uma.',
            correct: true,
          },
          { id: 'b', text: 'Reescrever o programa do zero.' },
          { id: 'c', text: 'Trocar todos os `decimal` por `double`.' },
          { id: 'd', text: 'Remover as conversões de entrada.' },
        ],
        explanation:
          'Essa é a técnica mais simples e eficaz que existe. Você vai ver o valor desviar do esperado numa linha específica e o bug estará ali.',
      },
    ],
    challenge: {
      brief:
        'Escreva um conversor de tempo organizado em três fases. Leia um total de segundos e imprima a decomposição em horas, minutos e segundos, além do formato de relógio.',
      requirements: [
        'Linha 1: `Horas: 2`',
        'Linha 2: `Minutos: 46`',
        'Linha 3: `Segundos: 40`',
        'Linha 4: `Relogio: 02:46:40`',
        'Cada componente tem dois dígitos no relógio, com zero à esquerda quando necessário',
        'Organize o código nas três fases com comentários',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        // 1. ENTRADA
        int total = int.Parse(Console.ReadLine());

        // 2. PROCESSAMENTO

        // 3. SAIDA
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        // 1. ENTRADA
        int total = int.Parse(Console.ReadLine());

        // 2. PROCESSAMENTO
        int horas = total / 3600;
        int resto = total % 3600;
        int minutos = resto / 60;
        int segundos = resto % 60;

        // 3. SAIDA
        Console.WriteLine($"Horas: {horas}");
        Console.WriteLine($"Minutos: {minutos}");
        Console.WriteLine($"Segundos: {segundos}");
        Console.WriteLine($"Relogio: {horas:00}:{minutos:00}:{segundos:00}");
    }
}
`,
      hints: [
        'Cada hora tem 3600 segundos: `total / 3600` dá as horas e `total % 3600` o que sobra.',
        'Aplique a mesma dupla `/` e `%` sobre o resto, agora com 60.',
        'O formato `{v:00}` preenche com zero à esquerda quando o número tem um dígito.',
      ],
      tests: [
        {
          name: 'Duas horas e pouco',
          stdin: '10000\n',
          expectedStdout: 'Horas: 2\nMinutos: 46\nSegundos: 40\nRelogio: 02:46:40',
        },
        {
          name: 'Menos de um minuto',
          stdin: '45\n',
          expectedStdout: 'Horas: 0\nMinutos: 0\nSegundos: 45\nRelogio: 00:00:45',
        },
        {
          name: 'Hora exata',
          stdin: '3600\n',
          expectedStdout: 'Horas: 1\nMinutos: 0\nSegundos: 0\nRelogio: 01:00:00',
        },
        {
          name: 'Zero segundos',
          stdin: '0\n',
          expectedStdout: 'Horas: 0\nMinutos: 0\nSegundos: 0\nRelogio: 00:00:00',
        },
      ],
    },
  },
  {
    id: 's01c07l03',
    title: 'Pensando em casos de borda',
    objective: 'Antecipar as entradas que quebram programas e escrever código que as trata de propósito.',
    concept: [
      {
        kind: 'text',
        body:
          'Um caso de borda é uma entrada no limite do que o programa espera. É onde quase todo bug real acontece, porque o caso comum sempre é testado e o extremo raramente.',
      },
      {
        kind: 'table',
        headers: ['Tipo de dado', 'Bordas a testar'],
        rows: [
          ['número', 'zero, negativo, o maior possível, 1'],
          ['divisão', 'divisor zero'],
          ['texto', 'vazio, só espaços, um caractere, muito longo'],
          ['faixa', 'exatamente no limite, um abaixo, um acima'],
          ['contagem', 'nenhum item, exatamente um item'],
          ['empate', 'dois valores iguais no maior ou no menor'],
        ],
      },
      {
        kind: 'code',
        code: `// Media de notas: o caso de borda e "nenhuma nota valida"
int quantidade = 0;
int soma = 0;

// ... leitura ...

if (quantidade == 0)
{
    Console.WriteLine("Sem notas validas");
}
else
{
    Console.WriteLine($"Media: {(double)soma / quantidade:F2}");
}`,
        caption: 'Sem a guarda, a divisão por zero produziria NaN ou uma exceção.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Com `int`, dividir por zero lança `DivideByZeroException`. Com `double`, o resultado é `NaN` ou `Infinity`, sem erro nenhum — o que é pior, porque o valor absurdo se espalha silenciosamente pelo resto do cálculo.',
      },
      {
        kind: 'text',
        body:
          'A técnica prática: para cada valor que entra no programa, pergunte "e se fosse zero? e se fosse negativo? e se fosse vazio?". Se a resposta for "aí quebra", você achou um caso a tratar.',
      },
    ],
    quiz: [
      {
        id: 's01c07l03q1',
        type: 'single',
        prompt: 'O que `Console.WriteLine(5.0 / 0)` imprime?',
        options: [
          { id: 'a', code: 'Infinity', correct: true },
          { id: 'b', code: '0' },
          { id: 'c', text: 'Lança DivideByZeroException' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          'Ponto flutuante tem representação para infinito, então não há exceção. Só a divisão **inteira** por zero lança.',
      },
      {
        id: 's01c07l03q2',
        type: 'multiple',
        prompt:
          'Programa: "leia um nome e imprima a inicial em maiúscula". Quais casos de borda importam?',
        options: [
          { id: 'a', text: 'Nome vazio.', correct: true },
          { id: 'b', text: 'Nome com espaços no início.', correct: true },
          { id: 'c', text: 'Nome de um único caractere.', correct: true },
          { id: 'd', text: 'Nome já em maiúsculas.' },
          { id: 'e', text: 'Nome começando com número.', correct: true },
        ],
        explanation:
          'Nome já em maiúsculas não é uma borda: `ToUpper` de uma maiúscula devolve a mesma letra. Os outros quatro alteram ou quebram o comportamento.',
      },
      {
        id: 's01c07l03q3',
        type: 'single',
        prompt: 'Por que `Infinity` num cálculo é mais perigoso que uma exceção?',
        options: [
          {
            id: 'a',
            text: 'Porque o programa continua rodando e propaga o valor absurdo para todo o resto do resultado.',
            correct: true,
          },
          { id: 'b', text: 'Porque consome mais memória.' },
          { id: 'c', text: 'Porque impede a impressão de qualquer valor depois dele.' },
          { id: 'd', text: 'Não é mais perigoso, é equivalente.' },
        ],
        explanation:
          'Falhar cedo e alto é uma virtude. Um erro que não interrompe nada acaba salvo no banco de dados e descoberto semanas depois.',
      },
    ],
    challenge: {
      brief:
        'Calcule a média de três notas lidas como texto, tolerando entradas inválidas. Trate explicitamente o caso em que nenhuma nota é válida, e considere inválida também qualquer nota fora da faixa de 0 a 10.',
      requirements: [
        'Linha 1: `Validas: 2`',
        'Linha 2: `Media: 7.25`',
        'Quando nenhuma nota é válida, imprima `Validas: 0` e `Media: sem dados`',
        'A média usa duas casas decimais e divisão real',
        'Notas fora de 0 a 10 e textos não numéricos são inválidos',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        int validas = 0;
        double soma = 0;

        // Leia tres notas, valide faixa e formato
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        int validas = 0;
        double soma = 0;

        string l1 = Console.ReadLine();
        string l2 = Console.ReadLine();
        string l3 = Console.ReadLine();

        if (double.TryParse(l1, NumberStyles.Float, CultureInfo.InvariantCulture, out double n1)
            && n1 >= 0 && n1 <= 10)
        {
            validas++;
            soma += n1;
        }

        if (double.TryParse(l2, NumberStyles.Float, CultureInfo.InvariantCulture, out double n2)
            && n2 >= 0 && n2 <= 10)
        {
            validas++;
            soma += n2;
        }

        if (double.TryParse(l3, NumberStyles.Float, CultureInfo.InvariantCulture, out double n3)
            && n3 >= 0 && n3 <= 10)
        {
            validas++;
            soma += n3;
        }

        Console.WriteLine($"Validas: {validas}");

        if (validas == 0)
        {
            Console.WriteLine("Media: sem dados");
        }
        else
        {
            Console.WriteLine($"Media: {soma / validas:F2}");
        }
    }
}
`,
      hints: [
        'Combine o `TryParse` com a checagem de faixa numa única condição usando `&&`.',
        'O curto-circuito garante que a faixa só é testada quando a conversão deu certo.',
        'A guarda `validas == 0` precisa vir antes da divisão, senão o resultado seria `NaN`.',
      ],
      tests: [
        {
          name: 'Uma nota fora da faixa',
          stdin: '8.5\n11\n6\n',
          expectedStdout: 'Validas: 2\nMedia: 7.25',
        },
        {
          name: 'Nenhuma nota válida',
          stdin: 'abc\n-3\n\n',
          expectedStdout: 'Validas: 0\nMedia: sem dados',
        },
        {
          name: 'Todas válidas nos limites',
          stdin: '0\n10\n5\n',
          expectedStdout: 'Validas: 3\nMedia: 5.00',
        },
      ],
    },
  },
  {
    id: 's01c07l04',
    title: 'Conversor de unidades',
    objective: 'Resolver um problema com múltiplos modos de operação escolhidos pela entrada.',
    concept: [
      {
        kind: 'text',
        body:
          'Um conversor é o primeiro problema em que o programa precisa **escolher o cálculo** com base na entrada. É um degrau importante: a lógica passa a ser sobre o próprio comportamento do programa.',
      },
      {
        kind: 'code',
        code: `string de = "km";
string para = "milhas";
double valor = 10;

double resultado = (de, para) switch
{
    ("km", "milhas") => valor * 0.621371,
    ("milhas", "km") => valor / 0.621371,
    _ => valor,
};

Console.WriteLine(resultado);`,
        caption: 'Um switch sobre uma tupla trata pares de valores de uma vez.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A sintaxe `(a, b) switch { (x, y) => ... }` avalia dois valores juntos. É extremamente útil quando a decisão depende de uma combinação, como origem e destino de uma conversão.',
      },
      {
        kind: 'text',
        body:
          'Uma alternativa que escala melhor: converter tudo para uma **unidade base** e depois para o destino. Com N unidades, isso exige 2N fórmulas em vez de N² pares.',
      },
      {
        kind: 'code',
        code: `// Tudo passa por metros
double emMetros = de switch
{
    "km" => valor * 1000,
    "cm" => valor / 100,
    _ => valor,          // ja em metros
};

double final = para switch
{
    "km" => emMetros / 1000,
    "cm" => emMetros * 100,
    _ => emMetros,
};`,
        caption: 'A estratégia da unidade base é a que sistemas reais usam.',
      },
    ],
    quiz: [
      {
        id: 's01c07l04q1',
        type: 'single',
        prompt: 'Com 5 unidades diferentes, quantas fórmulas a estratégia de unidade base exige?',
        options: [
          { id: 'a', text: '10, sendo 5 para entrar na base e 5 para sair', correct: true },
          { id: 'b', text: '25, uma para cada par possível' },
          { id: 'c', text: '5, uma por unidade' },
          { id: 'd', text: '20, excluindo as conversões de uma unidade para ela mesma' },
        ],
        explanation:
          'A abordagem por pares exigiria 20 fórmulas (5×4). Com base intermediária, o crescimento é linear em vez de quadrático.',
      },
      {
        id: 's01c07l04q2',
        type: 'single',
        prompt: 'O que faz `(de, para) switch { ("km", "m") => ... }`?',
        options: [
          {
            id: 'a',
            text: 'Avalia as duas variáveis juntas e casa quando ambas correspondem ao par.',
            correct: true,
          },
          { id: 'b', text: 'Testa se `de` é igual a `para`.' },
          { id: 'c', text: 'Concatena as duas strings antes de comparar.' },
          { id: 'd', text: 'Avalia só a primeira variável e ignora a segunda.' },
        ],
        explanation:
          'É um padrão de tupla. As duas posições precisam casar para o braço ser escolhido.',
      },
      {
        id: 's01c07l04q3',
        type: 'single',
        prompt: 'Por que converter para uma unidade base pode introduzir imprecisão com `double`?',
        options: [
          {
            id: 'a',
            text: 'Porque são duas operações de ponto flutuante em vez de uma, e cada uma pode arredondar.',
            correct: true,
          },
          { id: 'b', text: 'Porque `double` não suporta multiplicação por 1000.' },
          { id: 'c', text: 'Porque a unidade base precisa ser sempre um número inteiro.' },
          { id: 'd', text: 'Não introduz imprecisão nenhuma.' },
        ],
        explanation:
          'É um trade-off real: você troca um pouco de precisão por muito menos código. Para medidas físicas o erro é irrelevante; para dinheiro, use `decimal`.',
      },
    ],
    challenge: {
      brief:
        'Escreva um conversor de distância. Leia o valor, a unidade de origem e a unidade de destino (`km`, `m`, `cm` ou `mi`). Use metros como unidade base e imprima o resultado com 4 casas decimais.',
      requirements: [
        'Linha 1: `Em metros: 5000.0000`',
        'Linha 2: `Resultado: 3.1069`',
        'As unidades aceitas são `km`, `m`, `cm` e `mi`',
        'Uma milha equivale a 1609.344 metros',
        'Unidade desconhecida imprime apenas `Erro: unidade invalida`',
        'Use switch de expressão e a estratégia de unidade base',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        double valor = double.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        string de = Console.ReadLine();
        string para = Console.ReadLine();

        // Converta via metros
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        double valor = double.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        string de = Console.ReadLine();
        string para = Console.ReadLine();

        double paraMetro = de switch
        {
            "km" => 1000,
            "m" => 1,
            "cm" => 0.01,
            "mi" => 1609.344,
            _ => 0,
        };

        double doMetro = para switch
        {
            "km" => 1000,
            "m" => 1,
            "cm" => 0.01,
            "mi" => 1609.344,
            _ => 0,
        };

        if (paraMetro == 0 || doMetro == 0)
        {
            Console.WriteLine("Erro: unidade invalida");
        }
        else
        {
            double metros = valor * paraMetro;
            double resultado = metros / doMetro;

            Console.WriteLine($"Em metros: {metros:F4}");
            Console.WriteLine($"Resultado: {resultado:F4}");
        }
    }
}
`,
      hints: [
        'Em vez de fórmulas, guarde o **fator** de cada unidade em relação ao metro.',
        'Multiplicar pelo fator de origem leva para metros; dividir pelo fator de destino leva ao resultado.',
        'Use o fator `0` como marcador de unidade desconhecida e verifique antes de dividir.',
      ],
      tests: [
        {
          name: 'Quilômetros para milhas',
          stdin: '5\nkm\nmi\n',
          expectedStdout: 'Em metros: 5000.0000\nResultado: 3.1069',
        },
        {
          name: 'Centímetros para metros',
          stdin: '250\ncm\nm\n',
          expectedStdout: 'Em metros: 2.5000\nResultado: 2.5000',
        },
        {
          name: 'Milhas para quilômetros',
          stdin: '1\nmi\nkm\n',
          expectedStdout: 'Em metros: 1609.3440\nResultado: 1.6093',
        },
        {
          name: 'Unidade desconhecida',
          stdin: '10\nkm\njardas\n',
          expectedStdout: 'Erro: unidade invalida',
        },
      ],
    },
  },
  {
    id: 's01c07l05',
    title: 'Boletim escolar',
    objective: 'Combinar médias ponderadas, faixas de conceito e regras de aprovação num só programa.',
    concept: [
      {
        kind: 'text',
        body:
          'Um boletim é um problema clássico porque junta três coisas que aparecem em todo sistema real: média ponderada, classificação por faixa, e uma regra de decisão com exceção.',
      },
      {
        kind: 'text',
        body:
          'Média **ponderada** não é a soma dividida pela quantidade: cada nota tem um peso, e o divisor é a soma dos pesos.',
      },
      {
        kind: 'code',
        code: `double p1 = 6.0, p2 = 8.0, trabalho = 9.0;
int peso1 = 3, peso2 = 4, peso3 = 3;

double media =
    (p1 * peso1 + p2 * peso2 + trabalho * peso3)
    / (peso1 + peso2 + peso3);

Console.WriteLine($"{media:F2}");   // 7.70`,
        caption: 'Os parênteses no numerador e no denominador são obrigatórios.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Se os pesos forem `int` e as notas também, a divisão inteira arruína o resultado. Garanta que ao menos um lado seja `double`, seja pelo tipo das notas ou por um cast explícito.',
      },
      {
        kind: 'text',
        body:
          'A regra de aprovação costuma ter uma exceção do tipo "reprovado por falta, independente da nota". Essas exceções são guardas: elas vêm antes do cálculo de conceito.',
      },
      {
        kind: 'code',
        code: `if (frequencia < 75)
{
    Console.WriteLine("Reprovado por falta");
}
else if (media >= 7)
{
    Console.WriteLine("Aprovado");
}
else if (media >= 5)
{
    Console.WriteLine("Recuperacao");
}
else
{
    Console.WriteLine("Reprovado");
}`,
      },
    ],
    quiz: [
      {
        id: 's01c07l05q1',
        type: 'single',
        prompt: 'Notas 6 e 10, com pesos 1 e 3. Qual é a média ponderada?',
        options: [
          { id: 'a', code: '9', correct: true },
          { id: 'b', code: '8' },
          { id: 'c', code: '4' },
          { id: 'd', code: '16' },
        ],
        explanation:
          '`(6*1 + 10*3) / (1+3)` é `36 / 4`, que dá `9`. A média simples seria 8: o peso maior puxa o resultado para a nota 10.',
      },
      {
        id: 's01c07l05q2',
        type: 'single',
        prompt: 'Qual é o erro em `double m = n1 * 2 + n2 * 3 / 5;` para uma ponderação de pesos 2 e 3?',
        options: [
          {
            id: 'a',
            text: 'Falta parênteses: só `n2 * 3` está sendo dividido por 5, não o numerador inteiro.',
            correct: true,
          },
          { id: 'b', text: 'Os pesos deveriam ser somados antes de multiplicar.' },
          { id: 'c', text: 'Faltou converter `m` para `double`.' },
          { id: 'd', text: 'Nenhum erro, a expressão está correta.' },
        ],
        explanation:
          'A divisão tem prioridade sobre a soma. O correto é `(n1 * 2 + n2 * 3) / 5.0`, com o `.0` garantindo divisão real.',
      },
      {
        id: 's01c07l05q3',
        type: 'single',
        prompt: 'Por que a verificação de frequência deve vir antes da faixa de média?',
        options: [
          {
            id: 'a',
            text: 'Porque é uma regra que sobrepõe todas as outras: reprova independentemente da nota.',
            correct: true,
          },
          { id: 'b', text: 'Porque a frequência é sempre um número inteiro.' },
          { id: 'c', text: 'Porque o cálculo da média depende da frequência.' },
          { id: 'd', text: 'A ordem não importa neste caso.' },
        ],
        explanation:
          'Regras que sobrepõem outras são guardas e vêm primeiro. Se viesse depois, um aluno com média 9 e 50% de presença seria aprovado.',
      },
    ],
    challenge: {
      brief:
        'Monte um boletim. Leia três notas (P1 peso 3, P2 peso 4, trabalho peso 3) e a frequência em porcentagem. Calcule a média ponderada, o conceito e a situação, respeitando a regra de frequência mínima de 75%.',
      requirements: [
        'Linha 1: `Media: 7.70`',
        'Linha 2: `Conceito: B`',
        'Linha 3: `Situacao: Aprovado`',
        'Conceitos: 9 ou mais A, 7 ou mais B, 5 ou mais C, abaixo disso D',
        'Situação: frequência abaixo de 75 é `Reprovado por falta`; média 7 ou mais é `Aprovado`; média 5 ou mais é `Recuperacao`; senão `Reprovado`',
        'O conceito é calculado sempre, mesmo em reprovação por falta',
        'A média tem duas casas decimais',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        double p1 = double.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        double p2 = double.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        double trabalho = double.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        int frequencia = int.Parse(Console.ReadLine());

        // Media ponderada, conceito e situacao
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        double p1 = double.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        double p2 = double.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        double trabalho = double.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        int frequencia = int.Parse(Console.ReadLine());

        double media = (p1 * 3 + p2 * 4 + trabalho * 3) / 10.0;

        string conceito = media switch
        {
            >= 9 => "A",
            >= 7 => "B",
            >= 5 => "C",
            _ => "D",
        };

        string situacao;
        if (frequencia < 75)
        {
            situacao = "Reprovado por falta";
        }
        else if (media >= 7)
        {
            situacao = "Aprovado";
        }
        else if (media >= 5)
        {
            situacao = "Recuperacao";
        }
        else
        {
            situacao = "Reprovado";
        }

        Console.WriteLine($"Media: {media:F2}");
        Console.WriteLine($"Conceito: {conceito}");
        Console.WriteLine($"Situacao: {situacao}");
    }
}
`,
      hints: [
        'A soma dos pesos é 10, então o divisor é `10.0` para garantir divisão real.',
        'O conceito cabe num switch de padrões relacionais em ordem decrescente.',
        'A frequência é a primeira guarda da situação, antes de qualquer faixa de média.',
      ],
      tests: [
        {
          name: 'Aprovado com conceito B',
          stdin: '6\n8\n9\n90\n',
          expectedStdout: 'Media: 7.70\nConceito: B\nSituacao: Aprovado',
        },
        {
          name: 'Nota alta mas reprovado por falta',
          stdin: '10\n10\n10\n60\n',
          expectedStdout: 'Media: 10.00\nConceito: A\nSituacao: Reprovado por falta',
        },
        {
          name: 'Recuperação',
          stdin: '5\n6\n7\n80\n',
          expectedStdout: 'Media: 6.00\nConceito: C\nSituacao: Recuperacao',
        },
        {
          name: 'Reprovado por nota',
          stdin: '2\n3\n4\n100\n',
          expectedStdout: 'Media: 3.00\nConceito: D\nSituacao: Reprovado',
        },
        {
          name: 'Frequência exatamente 75 é suficiente',
          stdin: '7\n7\n7\n75\n',
          expectedStdout: 'Media: 7.00\nConceito: B\nSituacao: Aprovado',
        },
      ],
    },
  },
  {
    id: 's01c07l06',
    title: 'Simulador de troco',
    objective: 'Decompor um valor em unidades usando divisão inteira e resto de forma encadeada.',
    concept: [
      {
        kind: 'text',
        body:
          'Dar troco com o menor número de cédulas é um problema de decomposição: você vai da maior unidade para a menor, pegando quantas cabem e passando o resto adiante.',
      },
      {
        kind: 'code',
        code: `int restante = 187;   // em reais

int notas100 = restante / 100;
restante = restante % 100;      // 87

int notas50 = restante / 50;
restante = restante % 50;       // 37

int notas20 = restante / 20;
restante = restante % 20;       // 17

Console.WriteLine($"{notas100} de 100, {notas50} de 50, {notas20} de 20");
// 1 de 100, 1 de 50, 0 de 20`,
        caption: 'Sempre a mesma dupla: / para a quantidade, % para o que sobra.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Ir da maior para a menor unidade é um **algoritmo guloso**, e para o sistema monetário brasileiro ele sempre dá o resultado ótimo. Curiosamente, isso não vale para qualquer conjunto de moedas: com moedas de 1, 3 e 4, o guloso falha ao trocar 6.',
      },
      {
        kind: 'text',
        body:
          'Para trabalhar com centavos, o truque é converter tudo para a menor unidade inteira antes de decompor. Isso elimina qualquer imprecisão de ponto flutuante.',
      },
      {
        kind: 'code',
        code: `decimal valor = 12.75m;
int centavos = (int)(valor * 100);   // 1275

int moedas25 = centavos / 25;
centavos = centavos % 25;

Console.WriteLine($"{moedas25} moedas de 25 centavos");`,
      },
    ],
    quiz: [
      {
        id: 's01c07l06q1',
        type: 'single',
        prompt: 'Decompondo 187 em notas de 100, 50, 20, 10, 5, 2 e 1, quantas cédulas no total?',
        options: [
          { id: 'a', code: '6', correct: true },
          { id: 'b', code: '5' },
          { id: 'c', code: '7' },
          { id: 'd', code: '4' },
        ],
        explanation:
          'Uma de 100, uma de 50, uma de 20, uma de 10, uma de 5 e uma de 2: total 6. A soma é 187 e nenhuma cédula pode ser trocada por menos.',
      },
      {
        id: 's01c07l06q2',
        type: 'single',
        prompt: 'Por que converter reais para centavos antes de decompor?',
        options: [
          {
            id: 'a',
            text: 'Para trabalhar só com inteiros e eliminar qualquer imprecisão de fração.',
            correct: true,
          },
          { id: 'b', text: 'Porque `decimal` não suporta o operador `%`.' },
          { id: 'c', text: 'Para o valor caber num `int`.' },
          { id: 'd', text: 'Porque a divisão inteira só funciona com valores acima de 100.' },
        ],
        explanation:
          'É a mesma razão pela qual sistemas financeiros armazenam valores em centavos inteiros. `decimal` suporta `%` normalmente, mas inteiros são mais simples de decompor.',
      },
      {
        id: 's01c07l06q3',
        type: 'single',
        prompt: 'Qual é o problema de decompor da menor unidade para a maior?',
        options: [
          {
            id: 'a',
            text: 'Você usaria um número enorme de cédulas pequenas e nunca chegaria às grandes.',
            correct: true,
          },
          { id: 'b', text: 'O resultado daria negativo.' },
          { id: 'c', text: 'A divisão inteira não funcionaria.' },
          { id: 'd', text: 'Nenhum problema, o resultado é o mesmo.' },
        ],
        explanation:
          'Trocar 187 começando por notas de 1 usaria 187 cédulas e não sobraria nada. A ordem decrescente é o que torna o algoritmo guloso correto aqui.',
      },
    ],
    challenge: {
      brief:
        'Um caixa precisa dar troco com o menor número de cédulas e moedas. Leia o valor pago e o valor da compra, e liste o troco em notas de 100, 50, 20, 10, 5 e 2 reais, e moedas de 1 real, 50, 25, 10, 5 e 1 centavo.',
      requirements: [
        'Se o valor pago for menor que a compra, imprima apenas `Erro: valor insuficiente`',
        'Linha 1: `Troco: 37.65`',
        'Depois, uma linha por unidade usada, no formato `1x nota de 20` ou `2x moeda de 25 centavos`',
        'Unidades com quantidade zero não aparecem',
        'Notas são de 100, 50, 20, 10, 5 e 2 reais; moedas de 1 real, 50, 25, 10, 5 e 1 centavo',
        'A moeda de 1 real aparece como `1x moeda de 1 real`',
        'Trabalhe em centavos inteiros para evitar imprecisão',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        decimal pago = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        decimal compra = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);

        // Valide, converta para centavos e decomponha
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        decimal pago = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        decimal compra = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);

        if (pago < compra)
        {
            Console.WriteLine("Erro: valor insuficiente");
            return;
        }

        decimal troco = pago - compra;
        int centavos = (int)(troco * 100);

        Console.WriteLine($"Troco: {troco:F2}");

        int[] valores = { 10000, 5000, 2000, 1000, 500, 200, 100, 50, 25, 10, 5, 1 };
        string[] nomes =
        {
            "nota de 100",
            "nota de 50",
            "nota de 20",
            "nota de 10",
            "nota de 5",
            "nota de 2",
            "moeda de 1 real",
            "moeda de 50 centavos",
            "moeda de 25 centavos",
            "moeda de 10 centavos",
            "moeda de 5 centavos",
            "moeda de 1 centavo",
        };

        for (int i = 0; i < valores.Length; i++)
        {
            int quantidade = centavos / valores[i];
            centavos = centavos % valores[i];

            if (quantidade > 0)
            {
                Console.WriteLine($"{quantidade}x {nomes[i]}");
            }
        }
    }
}
`,
      hints: [
        'Converta o troco para centavos com `(int)(troco * 100)` e trabalhe só com inteiros.',
        'Repita a dupla `/` e `%` para cada unidade, da maior para a menor.',
        'Guardar os valores e os nomes em dois arrays paralelos evita repetir doze blocos quase idênticos.',
        'Use `return;` para encerrar cedo quando o valor pago for insuficiente.',
      ],
      tests: [
        {
          name: 'Troco de 37.65',
          stdin: '100.00\n62.35\n',
          expectedStdout:
            'Troco: 37.65\n1x nota de 20\n1x nota de 10\n1x nota de 5\n1x nota de 2\n1x moeda de 50 centavos\n1x moeda de 10 centavos\n1x moeda de 5 centavos',
        },
        {
          name: 'Troco exato zero',
          stdin: '50.00\n50.00\n',
          expectedStdout: 'Troco: 0.00',
        },
        {
          name: 'Valor insuficiente',
          stdin: '20.00\n35.90\n',
          expectedStdout: 'Erro: valor insuficiente',
        },
        {
          name: 'Troco de um centavo',
          stdin: '10.00\n9.99\n',
          expectedStdout: 'Troco: 0.01\n1x moeda de 1 centavo',
        },
      ],
    },
  },
  {
    id: 's01c07l07',
    title: 'Validador de senha',
    objective: 'Verificar múltiplos critérios sobre um texto e produzir um diagnóstico útil.',
    concept: [
      {
        kind: 'text',
        body:
          'Validar senha é um problema de inspeção de caracteres. Você precisa saber se existe **pelo menos um** de cada categoria, e a técnica é acumular flags booleanas percorrendo o texto.',
      },
      {
        kind: 'code',
        code: `string senha = Console.ReadLine();

bool temMaiuscula = false;
bool temMinuscula = false;
bool temDigito = false;

foreach (char c in senha)
{
    if (char.IsUpper(c)) temMaiuscula = true;
    if (char.IsLower(c)) temMinuscula = true;
    if (char.IsDigit(c)) temDigito = true;
}

Console.WriteLine($"{temMaiuscula} {temMinuscula} {temDigito}");`,
        caption: 'Uma passada pelo texto, uma flag por critério.',
      },
      {
        kind: 'table',
        headers: ['Método', 'Verdadeiro para'],
        rows: [
          ['`char.IsUpper(c)`', 'A a Z maiúsculo'],
          ['`char.IsLower(c)`', 'a a z minúsculo'],
          ['`char.IsDigit(c)`', '0 a 9'],
          ['`char.IsLetter(c)`', 'qualquer letra'],
          ['`char.IsLetterOrDigit(c)`', 'letra ou dígito'],
          ['`char.IsWhiteSpace(c)`', 'espaço, tab, quebra de linha'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Para detectar um símbolo, a forma mais robusta é a negação: `!char.IsLetterOrDigit(c)`. Listar todos os símbolos possíveis é impraticável e sempre deixa algum de fora.',
      },
      {
        kind: 'text',
        body:
          'Uma senha que só diz "inválida" é frustrante. Bons validadores acumulam **quais** critérios falharam e reportam todos de uma vez, em vez de parar no primeiro.',
      },
    ],
    quiz: [
      {
        id: 's01c07l07q1',
        type: 'single',
        prompt: 'Como detectar se um caractere é um símbolo (nem letra nem dígito)?',
        options: [
          { id: 'a', code: '!char.IsLetterOrDigit(c)', correct: true },
          { id: 'b', code: 'char.IsSymbol(c)' },
          { id: 'c', code: 'c == \'!\' || c == \'@\' || c == \'#\'' },
          { id: 'd', code: '!char.IsLetter(c)' },
        ],
        explanation:
          'A negação cobre tudo. `char.IsSymbol` existe mas tem semântica Unicode restrita e não considera `!` ou `@` como símbolos.',
      },
      {
        id: 's01c07l07q2',
        type: 'single',
        prompt: 'Por que usar flags acumuladas em vez de checar dentro do loop e sair?',
        options: [
          {
            id: 'a',
            text: 'Porque uma única passada permite avaliar todos os critérios e reportar todas as falhas.',
            correct: true,
          },
          { id: 'b', text: 'Porque `foreach` não permite `break`.' },
          { id: 'c', text: 'Porque flags booleanas são mais rápidas que comparações.' },
          { id: 'd', text: 'Porque não é possível saber o tamanho da senha dentro do loop.' },
        ],
        explanation:
          'É uma questão de qualidade do diagnóstico. Sair no primeiro problema esconde os outros e faz o usuário tentar várias vezes.',
      },
      {
        id: 's01c07l07q3',
        type: 'single',
        prompt: 'Quantos critérios `"SENHA123"` cumpre entre maiúscula, minúscula, dígito e símbolo?',
        options: [
          { id: 'a', code: '2', correct: true },
          { id: 'b', code: '3' },
          { id: 'c', code: '4' },
          { id: 'd', code: '1' },
        ],
        explanation:
          'Tem maiúsculas e dígitos, mas nenhuma minúscula e nenhum símbolo. Comprimento não estava entre os critérios listados.',
      },
    ],
    challenge: {
      brief:
        'Valide uma senha contra quatro critérios: pelo menos 8 caracteres, pelo menos uma letra maiúscula, pelo menos um dígito e pelo menos um símbolo. Reporte a força e liste todos os critérios que falharam.',
      requirements: [
        'Linha 1: `Forca: 3/4`, contando quantos critérios passaram',
        'Depois, uma linha por critério que falhou, na ordem: `Falta: 8 caracteres`, `Falta: letra maiuscula`, `Falta: digito`, `Falta: simbolo`',
        'Quando todos passarem, imprima `Forca: 4/4` e depois `Senha valida`',
        'Símbolo é qualquer caractere que não seja letra nem dígito',
        'Use uma única passada com `foreach` e flags booleanas',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        string senha = Console.ReadLine();

        // Acumule flags e reporte todas as falhas
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        string senha = Console.ReadLine();

        bool temMaiuscula = false;
        bool temDigito = false;
        bool temSimbolo = false;

        foreach (char c in senha)
        {
            if (char.IsUpper(c))
            {
                temMaiuscula = true;
            }
            else if (char.IsDigit(c))
            {
                temDigito = true;
            }
            else if (!char.IsLetterOrDigit(c))
            {
                temSimbolo = true;
            }
        }

        bool tamanhoOk = senha.Length >= 8;

        int forca = 0;
        if (tamanhoOk) forca++;
        if (temMaiuscula) forca++;
        if (temDigito) forca++;
        if (temSimbolo) forca++;

        Console.WriteLine($"Forca: {forca}/4");

        if (forca == 4)
        {
            Console.WriteLine("Senha valida");
        }
        else
        {
            if (!tamanhoOk)
            {
                Console.WriteLine("Falta: 8 caracteres");
            }
            if (!temMaiuscula)
            {
                Console.WriteLine("Falta: letra maiuscula");
            }
            if (!temDigito)
            {
                Console.WriteLine("Falta: digito");
            }
            if (!temSimbolo)
            {
                Console.WriteLine("Falta: simbolo");
            }
        }
    }
}
`,
      hints: [
        'Um `char` maiúsculo nunca é dígito nem símbolo, então `else if` encadeado funciona e é mais eficiente.',
        'O tamanho é verificado fora do loop, direto em `senha.Length`.',
        'Cada relatório de falha é um `if` independente, sem `else`, para que todos apareçam.',
      ],
      tests: [
        {
          name: 'Senha média',
          stdin: 'Senha123\n',
          expectedStdout: 'Forca: 3/4\nFalta: simbolo',
        },
        {
          name: 'Senha fraca com três falhas',
          stdin: 'abc123\n',
          expectedStdout:
            'Forca: 1/4\nFalta: 8 caracteres\nFalta: letra maiuscula\nFalta: simbolo',
        },
        {
          name: 'Senha completa',
          stdin: 'Senha123!\n',
          expectedStdout: 'Forca: 4/4\nSenha valida',
        },
        {
          name: 'Só minúsculas curtas',
          stdin: 'abc\n',
          expectedStdout:
            'Forca: 0/4\nFalta: 8 caracteres\nFalta: letra maiuscula\nFalta: digito\nFalta: simbolo',
        },
      ],
    },
  },
  {
    id: 's01c07l08',
    title: 'Calculadora de IMC',
    objective: 'Aplicar uma fórmula com potência, classificar o resultado e apresentar uma recomendação.',
    concept: [
      {
        kind: 'text',
        body:
          'O índice de massa corporal é peso dividido pela altura ao quadrado. É um exercício excelente porque envolve potência, faixas de classificação, e a diferença entre calcular e interpretar.',
      },
      {
        kind: 'code',
        code: `double peso = 72.5;
double altura = 1.75;

double imc = peso / (altura * altura);
Console.WriteLine($"IMC: {imc:F2}");   // IMC: 23.67

// Alternativa com Math.Pow
double imc2 = peso / Math.Pow(altura, 2);`,
        caption: 'Para expoente 2, multiplicar é mais rápido e mais legível que Math.Pow.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Os parênteses em `peso / (altura * altura)` são obrigatórios. Sem eles, `peso / altura * altura` divide e depois multiplica, devolvendo simplesmente o peso.',
      },
      {
        kind: 'table',
        headers: ['IMC', 'Classificação'],
        rows: [
          ['abaixo de 18.5', 'Abaixo do peso'],
          ['18.5 a 24.9', 'Peso normal'],
          ['25.0 a 29.9', 'Sobrepeso'],
          ['30.0 a 34.9', 'Obesidade grau 1'],
          ['35.0 a 39.9', 'Obesidade grau 2'],
          ['40.0 ou mais', 'Obesidade grau 3'],
        ],
      },
      {
        kind: 'text',
        body:
          'Um detalhe de modelagem: as faixas oficiais usam `24.9` como limite, mas um IMC de `24.95` não cai em nenhuma faixa se você escrever `<= 24.9`. O correto é usar `< 25`.',
      },
      {
        kind: 'code',
        code: `string classe = imc switch
{
    < 18.5 => "Abaixo do peso",
    < 25 => "Peso normal",
    < 30 => "Sobrepeso",
    < 35 => "Obesidade grau 1",
    < 40 => "Obesidade grau 2",
    _ => "Obesidade grau 3",
};`,
        caption: 'Usar o limite exclusivo do próximo intervalo elimina buracos.',
      },
    ],
    quiz: [
      {
        id: 's01c07l08q1',
        type: 'single',
        prompt: 'Qual expressão calcula corretamente o IMC?',
        options: [
          { id: 'a', code: 'peso / (altura * altura)', correct: true },
          { id: 'b', code: 'peso / altura * altura' },
          { id: 'c', code: 'peso / altura ^ 2' },
          { id: 'd', code: '(peso / altura) * 2' },
        ],
        explanation:
          'A B devolve o próprio peso por causa da ordem de avaliação, e em C# o `^` é OU exclusivo bit a bit, não potência.',
      },
      {
        id: 's01c07l08q2',
        type: 'single',
        prompt: 'Por que usar `< 25` em vez de `<= 24.9` para o limite de peso normal?',
        options: [
          {
            id: 'a',
            text: 'Porque valores como 24.95 ficariam fora de todas as faixas com `<= 24.9`.',
            correct: true,
          },
          { id: 'b', text: 'Porque `<=` não funciona com `double`.' },
          { id: 'c', text: 'Porque 24.9 não é representável em ponto flutuante.' },
          { id: 'd', text: 'Não há diferença prática entre os dois.' },
        ],
        explanation:
          'Faixas com valores contínuos devem usar o limite exclusivo do intervalo seguinte. É a única forma de não deixar buracos.',
      },
      {
        id: 's01c07l08q3',
        type: 'single',
        prompt: 'Um usuário digita a altura em centímetros (175) em vez de metros. Qual é o IMC resultante para 70 kg?',
        options: [
          { id: 'a', text: 'Aproximadamente 0.002, um valor absurdo', correct: true },
          { id: 'b', text: 'Aproximadamente 22.9, o valor correto' },
          { id: 'c', text: 'Uma exceção de divisão' },
          { id: 'd', text: 'Aproximadamente 2286' },
        ],
        explanation:
          '`70 / (175 * 175)` dá cerca de 0.0023. Nenhum erro é lançado, e é por isso que validar a **plausibilidade** da entrada, não só o formato, importa tanto.',
      },
    ],
    challenge: {
      brief:
        'Calcule o IMC a partir do peso em quilos e da altura em metros. Classifique o resultado, informe se está na faixa saudável, e valide que a altura está entre 0.5 e 2.5 metros para pegar quem digitou centímetros.',
      requirements: [
        'Altura fora de 0.5 a 2.5 imprime apenas `Erro: altura implausivel`',
        'Linha 1: `IMC: 23.67`',
        'Linha 2: `Classificacao: Peso normal`',
        'Linha 3: `Saudavel: True`',
        'Classificações: abaixo de 18.5 `Abaixo do peso`, abaixo de 25 `Peso normal`, abaixo de 30 `Sobrepeso`, abaixo de 35 `Obesidade grau 1`, abaixo de 40 `Obesidade grau 2`, senão `Obesidade grau 3`',
        'Saudável é a faixa de peso normal',
        'O IMC tem duas casas decimais',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        double peso = double.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        double altura = double.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);

        // Valide a altura, calcule e classifique
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        double peso = double.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        double altura = double.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);

        if (altura < 0.5 || altura > 2.5)
        {
            Console.WriteLine("Erro: altura implausivel");
            return;
        }

        double imc = peso / (altura * altura);

        string classificacao = imc switch
        {
            < 18.5 => "Abaixo do peso",
            < 25 => "Peso normal",
            < 30 => "Sobrepeso",
            < 35 => "Obesidade grau 1",
            < 40 => "Obesidade grau 2",
            _ => "Obesidade grau 3",
        };

        bool saudavel = imc >= 18.5 && imc < 25;

        Console.WriteLine($"IMC: {imc:F2}");
        Console.WriteLine($"Classificacao: {classificacao}");
        Console.WriteLine($"Saudavel: {saudavel}");
    }
}
`,
      hints: [
        'A guarda de altura vem antes de qualquer cálculo, e `return;` encerra o programa ali.',
        'Não esqueça os parênteses em `(altura * altura)`.',
        'A faixa saudável coincide com "Peso normal", então você pode derivá-la de uma comparação direta.',
      ],
      tests: [
        {
          name: 'Peso normal',
          stdin: '72.5\n1.75\n',
          expectedStdout: 'IMC: 23.67\nClassificacao: Peso normal\nSaudavel: True',
        },
        {
          name: 'Altura em centímetros é rejeitada',
          stdin: '70\n175\n',
          expectedStdout: 'Erro: altura implausivel',
        },
        {
          name: 'Sobrepeso',
          stdin: '85\n1.70\n',
          expectedStdout: 'IMC: 29.41\nClassificacao: Sobrepeso\nSaudavel: False',
        },
        {
          name: 'Abaixo do peso',
          stdin: '48\n1.72\n',
          expectedStdout: 'IMC: 16.22\nClassificacao: Abaixo do peso\nSaudavel: False',
        },
        {
          name: 'Obesidade grau 3',
          stdin: '130\n1.65\n',
          expectedStdout: 'IMC: 47.75\nClassificacao: Obesidade grau 3\nSaudavel: False',
        },
      ],
    },
  },
  {
    id: 's01c07l09',
    title: 'Prática: cadastro com validação',
    objective: 'Integrar leitura, validação, normalização e relatório num único programa robusto.',
    concept: [
      {
        kind: 'text',
        body:
          'Um formulário de cadastro é o exercício que mais se aproxima de código de produção nesta seção. Ele exige validar campos de tipos diferentes, normalizar texto, e reportar tudo que está errado de uma vez.',
      },
      {
        kind: 'text',
        body:
          'A arquitetura que funciona tem três estágios: ler tudo em cru, validar campo por campo acumulando erros, e só produzir a saída no final.',
      },
      {
        kind: 'code',
        code: `// 1. Ler cru
string nome = Console.ReadLine();
string linhaIdade = Console.ReadLine();

// 2. Validar acumulando
int erros = 0;
string primeiroErro = "";

if (string.IsNullOrWhiteSpace(nome))
{
    erros++;
    if (primeiroErro == "") primeiroErro = "nome vazio";
}

if (!int.TryParse(linhaIdade, out int idade) || idade < 18)
{
    erros++;
    if (primeiroErro == "") primeiroErro = "idade invalida";
}

// 3. Reportar
Console.WriteLine(erros == 0 ? "OK" : primeiroErro);`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Note o padrão `!int.TryParse(...) || idade < 18`. O curto-circuito do `||` garante que a segunda comparação só é avaliada quando a conversão funcionou, e o resultado combina formato e regra de negócio numa condição só.',
      },
      {
        kind: 'text',
        body:
          'Nunca misture validação com saída. Se você imprime no meio da validação, fica impossível decidir depois que o cadastro deve ser rejeitado por inteiro.',
      },
    ],
    quiz: [
      {
        id: 's01c07l09q1',
        type: 'single',
        prompt: 'Por que `!int.TryParse(s, out int n) || n < 18` é seguro mesmo quando `s` é `"abc"`?',
        options: [
          {
            id: 'a',
            text: 'Porque o `||` faz curto-circuito: com o lado esquerdo verdadeiro, `n < 18` não é avaliado.',
            correct: true,
          },
          { id: 'b', text: 'Porque `TryParse` devolve 18 quando falha.' },
          { id: 'c', text: 'Porque a comparação com `n` inválido devolve false.' },
          { id: 'd', text: 'Não é seguro, pode lançar exceção.' },
        ],
        explanation:
          'Na verdade `n` valeria `0`, e `0 < 18` seria verdadeiro de qualquer forma — mas o curto-circuito é o que torna o padrão confiável em geral.',
      },
      {
        id: 's01c07l09q2',
        type: 'single',
        prompt: 'Qual é a vantagem de acumular erros em vez de sair no primeiro?',
        options: [
          {
            id: 'a',
            text: 'O usuário corrige tudo de uma vez, em vez de descobrir um problema por tentativa.',
            correct: true,
          },
          { id: 'b', text: 'O programa executa mais rápido.' },
          { id: 'c', text: 'Evita o uso de variáveis booleanas.' },
          { id: 'd', text: 'Permite ler menos linhas da entrada.' },
        ],
        explanation:
          'É uma decisão de experiência do usuário que se traduz em estrutura de código. É por isso que formulários web destacam todos os campos errados ao mesmo tempo.',
      },
      {
        id: 's01c07l09q3',
        type: 'multiple',
        prompt: 'Quais validações fazem sentido para um campo de e-mail simples?',
        options: [
          { id: 'a', text: 'Não estar vazio.', correct: true },
          { id: 'b', text: 'Conter exatamente uma arroba.', correct: true },
          { id: 'c', text: 'Ter um ponto depois da arroba.', correct: true },
          { id: 'd', text: 'Ter no máximo 10 caracteres.' },
          { id: 'e', text: 'Não conter espaços.', correct: true },
        ],
        explanation:
          'Um limite de 10 caracteres rejeitaria e-mails perfeitamente válidos. Validação deve barrar o inválido sem barrar o válido.',
      },
    ],
    challenge: {
      brief:
        'Valide um cadastro de 4 linhas: nome, idade, e-mail e telefone. Reporte todos os problemas encontrados; se estiver tudo certo, imprima o registro normalizado.',
      requirements: [
        'Nome inválido se estiver vazio ou com menos de 3 caracteres após aparar: `Erro: nome invalido`',
        'Idade inválida se não for inteiro ou estiver fora de 18 a 120: `Erro: idade invalida`',
        'E-mail inválido se não tiver arroba ou não tiver ponto depois dela: `Erro: email invalido`',
        'Telefone inválido se não tiver 10 ou 11 dígitos após remover a formatação: `Erro: telefone invalido`',
        'Os erros são reportados na ordem acima, um por linha, todos de uma vez',
        'Sem erros, imprima `Nome: Ana Silva`, `Idade: 28`, `Email: ana@empresa.com`, `Telefone: 11987654321`',
        'O nome sai aparado, o e-mail em minúsculas, o telefone só com dígitos',
        'Remova parênteses, espaços, pontos e hifens do telefone',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        string linhaIdade = Console.ReadLine();
        string email = Console.ReadLine();
        string telefone = Console.ReadLine();

        // Valide os quatro campos, acumule erros, depois reporte
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        string nome = Console.ReadLine();
        string linhaIdade = Console.ReadLine();
        string email = Console.ReadLine();
        string telefone = Console.ReadLine();

        string nomeLimpo = nome.Trim();
        bool nomeOk = nomeLimpo.Length >= 3;

        bool idadeOk = int.TryParse(linhaIdade, out int idade) && idade >= 18 && idade <= 120;

        string emailLimpo = email.Trim().ToLower();
        int arroba = emailLimpo.IndexOf('@');
        bool emailOk = arroba > 0 && emailLimpo.IndexOf('.', arroba) > arroba;

        string telLimpo = telefone
            .Replace("(", "")
            .Replace(")", "")
            .Replace(" ", "")
            .Replace("-", "")
            .Replace(".", "");
        bool telefoneOk = telLimpo.Length == 10 || telLimpo.Length == 11;

        if (nomeOk && idadeOk && emailOk && telefoneOk)
        {
            Console.WriteLine($"Nome: {nomeLimpo}");
            Console.WriteLine($"Idade: {idade}");
            Console.WriteLine($"Email: {emailLimpo}");
            Console.WriteLine($"Telefone: {telLimpo}");
        }
        else
        {
            if (!nomeOk)
            {
                Console.WriteLine("Erro: nome invalido");
            }
            if (!idadeOk)
            {
                Console.WriteLine("Erro: idade invalida");
            }
            if (!emailOk)
            {
                Console.WriteLine("Erro: email invalido");
            }
            if (!telefoneOk)
            {
                Console.WriteLine("Erro: telefone invalido");
            }
        }
    }
}
`,
      hints: [
        'Normalize cada campo primeiro, depois valide o valor normalizado.',
        'Para o ponto depois da arroba, use a sobrecarga `IndexOf(\'.\', arroba)`, que começa a busca a partir de um índice.',
        '`arroba > 0` já garante que existe arroba e que ela não é o primeiro caractere.',
        'Cada relatório de erro é um `if` independente, para que todos apareçam.',
      ],
      tests: [
        {
          name: 'Cadastro válido',
          stdin: '  Ana Silva \n28\nAna@Empresa.com\n(11) 98765-4321\n',
          expectedStdout:
            'Nome: Ana Silva\nIdade: 28\nEmail: ana@empresa.com\nTelefone: 11987654321',
        },
        {
          name: 'Todos os campos inválidos',
          stdin: 'Jo\n15\nsemarroba\n123\n',
          expectedStdout:
            'Erro: nome invalido\nErro: idade invalida\nErro: email invalido\nErro: telefone invalido',
        },
        {
          name: 'Apenas e-mail sem ponto no domínio',
          stdin: 'Bruno Costa\n41\nbruno@empresa\n1134567890\n',
          expectedStdout: 'Erro: email invalido',
        },
        {
          name: 'Idade acima do limite',
          stdin: 'Maria Souza\n130\nmaria@web.com.br\n21955551234\n',
          expectedStdout: 'Erro: idade invalida',
        },
      ],
    },
  },
  {
    id: 's01c07l10',
    title: 'Boss: relatório de vendas',
    objective: 'Resolver um problema completo de ponta a ponta, com parsing, agregação, regras de negócio e formatação.',
    concept: [
      {
        kind: 'text',
        body:
          'Este é o desafio final da Seção 1. Ele reúne tudo: leitura de dados delimitados, conversão com validação, cálculo agregado, decisão por faixa, e formatação de saída.',
      },
      {
        kind: 'text',
        body:
          'Antes de programar, faça o que você aprendeu na primeira lição deste capítulo: liste as entradas, as saídas, as regras e as bordas. Um problema deste tamanho pune quem começa a digitar sem plano.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Estratégia recomendada: resolva uma linha de saída por vez, rodando os testes a cada passo. Tentar acertar cinco linhas de uma vez transforma qualquer erro num mistério.',
      },
      {
        kind: 'table',
        headers: ['Ferramenta da seção', 'Uso aqui'],
        rows: [
          ['`Split`', 'quebrar cada registro em campos'],
          ['`decimal.TryParse`', 'converter valores com validação'],
          ['`+=`', 'acumular o total'],
          ['`switch` de padrões', 'faixa de comissão'],
          ['`{v:F2}`', 'formatar dinheiro'],
          ['guardas', 'tratar registros malformados'],
        ],
      },
      {
        kind: 'text',
        body:
          'Uma última dica de ouro: quando um teste falha, compare a saída obtida com a esperada caractere por caractere. Na maioria das vezes o cálculo está certo e o problema é um espaço, um acento ou uma casa decimal.',
      },
    ],
    quiz: [
      {
        id: 's01c07l10q1',
        type: 'single',
        prompt: 'Você tem 3 linhas no formato `produto;quantidade;preco`. Qual é a melhor forma de somar o faturamento?',
        options: [
          {
            id: 'a',
            text: 'Para cada linha, dar `Split`, converter quantidade e preço, e acumular o produto num total com `+=`.',
            correct: true,
          },
          { id: 'b', text: 'Concatenar as três linhas e somar os números que aparecerem.' },
          { id: 'c', text: 'Somar as quantidades e multiplicar pelo primeiro preço.' },
          { id: 'd', text: 'Usar `Replace` para trocar os pontos e vírgulas por operadores.' },
        ],
        explanation:
          'A C só funcionaria se todos os preços fossem iguais. Acumular o subtotal de cada linha é o padrão correto para qualquer agregação.',
      },
      {
        id: 's01c07l10q2',
        type: 'multiple',
        prompt: 'Num relatório de vendas lido de texto, quais bordas você trataria?',
        options: [
          { id: 'a', text: 'Uma linha com número de campos diferente do esperado.', correct: true },
          { id: 'b', text: 'Quantidade zero ou negativa.', correct: true },
          { id: 'c', text: 'Preço não numérico.', correct: true },
          { id: 'd', text: 'Nenhum registro válido, tornando a média indefinida.', correct: true },
          { id: 'e', text: 'Dois produtos com o mesmo nome.' },
        ],
        explanation:
          'Nomes repetidos não são um problema para o total. Os outros quatro casos ou quebram o programa ou produzem números sem sentido.',
      },
      {
        id: 's01c07l10q3',
        type: 'single',
        prompt: 'Qual é a melhor abordagem quando você não consegue fazer um problema grande funcionar?',
        options: [
          {
            id: 'a',
            text: 'Reduzir o escopo: fazer só a primeira linha da saída funcionar, e ir somando as demais.',
            correct: true,
          },
          { id: 'b', text: 'Reescrever tudo do zero com outra estrutura.' },
          { id: 'c', text: 'Trocar todos os tipos numéricos e ver se resolve.' },
          { id: 'd', text: 'Remover as validações para simplificar.' },
        ],
        explanation:
          'Dividir para conquistar vale tanto para o algoritmo quanto para o processo de resolvê-lo. Cada pedaço que funciona reduz o espaço onde o bug pode estar.',
      },
    ],
    challenge: {
      brief:
        'Gere o relatório de fechamento de um vendedor. A primeira linha traz o nome. As três seguintes traz vendas no formato `produto;quantidade;preco`. Calcule o faturamento, identifique o produto de maior receita, aplique a faixa de comissão e informe se a meta de R$ 5.000,00 foi batida. Registros com quantidade não positiva ou preço inválido devem ser ignorados e contabilizados como descartados.',
      requirements: [
        'Linha 1: `Vendedor: Marina`',
        'Linha 2: `Registros validos: 2`',
        'Linha 3: `Descartados: 1`',
        'Linha 4: `Faturamento: 7150.00`',
        'Linha 5: `Destaque: Notebook`',
        'Linha 6: `Comissao: 715.00`',
        'Linha 7: `Meta batida: True`',
        'Comissão: faturamento abaixo de 2000 rende 3%, abaixo de 5000 rende 6%, de 5000 em diante rende 10%',
        'A meta é batida quando o faturamento é 5000 ou mais',
        'Destaque é o produto com a maior receita (quantidade vezes preço); em caso de empate, o primeiro',
        'Sem nenhum registro válido, o faturamento é `0.00`, o destaque é `nenhum` e a comissão é `0.00`',
        'Use `CultureInfo.InvariantCulture` e formate os valores com 2 casas',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        string vendedor = Console.ReadLine();

        decimal faturamento = 0m;
        int validos = 0;
        int descartados = 0;
        string destaque = "nenhum";
        decimal maiorReceita = 0m;

        // Processe as tres vendas e monte o relatorio
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        string vendedor = Console.ReadLine();

        decimal faturamento = 0m;
        int validos = 0;
        int descartados = 0;
        string destaque = "nenhum";
        decimal maiorReceita = 0m;

        for (int i = 0; i < 3; i++)
        {
            string linha = Console.ReadLine();
            string[] campos = linha.Split(';', StringSplitOptions.TrimEntries);

            if (campos.Length != 3)
            {
                descartados++;
                continue;
            }

            bool qtdOk = int.TryParse(campos[1], out int quantidade) && quantidade > 0;
            bool precoOk = decimal.TryParse(
                campos[2],
                NumberStyles.Number,
                CultureInfo.InvariantCulture,
                out decimal preco);

            if (!qtdOk || !precoOk)
            {
                descartados++;
                continue;
            }

            decimal receita = preco * quantidade;
            faturamento += receita;
            validos++;

            if (receita > maiorReceita)
            {
                maiorReceita = receita;
                destaque = campos[0];
            }
        }

        decimal comissao = faturamento switch
        {
            < 2000m => faturamento * 0.03m,
            < 5000m => faturamento * 0.06m,
            _ => faturamento * 0.10m,
        };

        bool metaBatida = faturamento >= 5000m;

        Console.WriteLine($"Vendedor: {vendedor}");
        Console.WriteLine($"Registros validos: {validos}");
        Console.WriteLine($"Descartados: {descartados}");
        Console.WriteLine($"Faturamento: {faturamento:F2}");
        Console.WriteLine($"Destaque: {destaque}");
        Console.WriteLine($"Comissao: {comissao:F2}");
        Console.WriteLine($"Meta batida: {metaBatida}");
    }
}
`,
      hints: [
        'Um `for` de 0 a 2 lê as três vendas, e `continue` pula para a próxima quando o registro é descartado.',
        'Combine `TryParse` com a regra de negócio: `int.TryParse(...) && quantidade > 0`.',
        'Para o destaque, guarde a maior receita vista até agora e só troque quando a nova for **estritamente** maior, garantindo que o empate fique com o primeiro.',
        'A comissão sai de um switch de padrões sobre o faturamento, com os limites em ordem crescente.',
      ],
      tests: [
        {
          name: 'Fechamento com um descarte',
          stdin:
            'Marina\nNotebook;2;3200.00\nMouse;0;90.00\nMonitor;3;250.00\n',
          expectedStdout:
            'Vendedor: Marina\nRegistros validos: 2\nDescartados: 1\nFaturamento: 7150.00\nDestaque: Notebook\nComissao: 715.00\nMeta batida: True',
        },
        {
          name: 'Todos válidos abaixo da meta',
          stdin: 'Caio\nCabo;5;29.90\nAdaptador;2;80.00\nHub;1;150.00\n',
          expectedStdout:
            'Vendedor: Caio\nRegistros validos: 3\nDescartados: 0\nFaturamento: 459.50\nDestaque: Adaptador\nComissao: 13.79\nMeta batida: False',
        },
        {
          name: 'Nenhum registro válido',
          stdin: 'Ana\nItem;abc;10.00\nOutro;-1;20.00\nIncompleto;5\n',
          expectedStdout:
            'Vendedor: Ana\nRegistros validos: 0\nDescartados: 3\nFaturamento: 0.00\nDestaque: nenhum\nComissao: 0.00\nMeta batida: False',
        },
        {
          name: 'Faixa intermediária de comissão',
          stdin: 'Bruno\nTeclado;10;150.00\nMousepad;20;35.00\nSuporte;5;120.00\n',
          expectedStdout:
            'Vendedor: Bruno\nRegistros validos: 3\nDescartados: 0\nFaturamento: 2800.00\nDestaque: Teclado\nComissao: 168.00\nMeta batida: False',
        },
      ],
    },
  },
]
