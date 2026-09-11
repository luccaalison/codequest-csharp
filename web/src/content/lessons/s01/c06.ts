import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's01c06l01',
    title: 'A estrutura if',
    objective: 'Executar um bloco de código apenas quando uma condição for verdadeira.',
    concept: [
      {
        kind: 'text',
        body:
          'Até agora seus programas executavam todas as linhas, sempre, na mesma ordem. O `if` muda isso: ele guarda um bloco que só roda quando a condição entre parênteses é `true`.',
      },
      {
        kind: 'code',
        code: `int idade = 20;

if (idade >= 18)
{
    Console.WriteLine("Maior de idade");
}

Console.WriteLine("Fim");`,
        caption: 'Se a idade fosse 15, só "Fim" apareceria.',
      },
      {
        kind: 'text',
        body:
          'A condição precisa ser um `bool`. Em C# não existe o conceito de "valor verdadeiro": `if (1)` ou `if (nome)` não compilam, o que elimina uma classe inteira de bugs comuns em outras linguagens.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Com chaves',
          code: `if (ok)
{
    A();
    B();
}
// A e B condicionais`,
        },
        right: {
          label: 'Sem chaves',
          code: `if (ok)
    A();
    B();
// so A e condicional!`,
        },
        note: 'Sem chaves, o if governa apenas a próxima instrução. A indentação engana.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Use chaves sempre, mesmo com uma única linha. Já houve falhas de segurança graves em softwares reais causadas exatamente por esse detalhe.',
      },
    ],
    quiz: [
      {
        id: 's01c06l01q1',
        type: 'single',
        prompt: 'Qual é a saída?',
        code: `int n = 5;
if (n > 10)
{
    Console.WriteLine("grande");
}
Console.WriteLine("pronto");`,
        options: [
          { id: 'a', code: 'pronto', correct: true },
          { id: 'b', code: 'grande\npronto' },
          { id: 'c', code: 'grande' },
          { id: 'd', text: 'Nada é impresso' },
        ],
        explanation:
          'A condição é falsa, então o bloco é pulado. A linha após o `if` não faz parte dele e roda normalmente.',
      },
      {
        id: 's01c06l01q2',
        type: 'single',
        prompt: 'Por que `if (idade = 18)` não compila?',
        options: [
          {
            id: 'a',
            text: 'Porque `=` atribui e produz um `int`, e o `if` exige um `bool`.',
            correct: true,
          },
          { id: 'b', text: 'Porque não se pode atribuir dentro de parênteses.' },
          { id: 'c', text: 'Porque falta um ponto e vírgula.' },
          { id: 'd', text: 'Compila normalmente e sempre é verdadeiro.' },
        ],
        explanation:
          'Em C ou JavaScript isso passaria e viraria um bug silencioso. C# rejeita em tempo de compilação porque exige um `bool` de verdade.',
      },
      {
        id: 's01c06l01q3',
        type: 'single',
        prompt: 'O que este código imprime quando `saldo` vale 10?',
        code: `if (saldo > 100)
    Console.WriteLine("A");
    Console.WriteLine("B");`,
        options: [
          { id: 'a', code: 'B', correct: true },
          { id: 'b', text: 'Nada' },
          { id: 'c', code: 'A\nB' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          'Sem chaves, só a primeira linha pertence ao `if`. A indentação da segunda sugere o contrário, e é exatamente por isso que ela é perigosa.',
      },
    ],
    challenge: {
      brief:
        'Leia a temperatura de um sensor. Sempre imprima o valor lido; se estiver acima de 38 graus, imprima também um alerta.',
      requirements: [
        'Linha 1: `Temperatura: 39.5`',
        'Se acima de 38, linha 2: `ALERTA: temperatura alta`',
        'Se 38 ou menos, imprima apenas a primeira linha',
        'Use `double` e `CultureInfo.InvariantCulture` na leitura',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        double temp = double.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);

        // Sempre imprima, alerte se necessario
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        double temp = double.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);

        Console.WriteLine($"Temperatura: {temp}");

        if (temp > 38)
        {
            Console.WriteLine("ALERTA: temperatura alta");
        }
    }
}
`,
      hints: [
        'A impressão do valor fica fora do `if`, porque acontece sempre.',
        'Cuidado com o limite: "acima de 38" é `> 38`, então 38 exato não alerta.',
      ],
      tests: [
        {
          name: 'Temperatura alta',
          stdin: '39.5\n',
          expectedStdout: 'Temperatura: 39.5\nALERTA: temperatura alta',
        },
        {
          name: 'Temperatura normal',
          stdin: '36.7\n',
          expectedStdout: 'Temperatura: 36.7',
        },
        {
          name: 'Exatamente no limite',
          stdin: '38\n',
          expectedStdout: 'Temperatura: 38',
        },
      ],
    },
  },
  {
    id: 's01c06l02',
    title: 'else: o caminho alternativo',
    objective: 'Garantir que exatamente um de dois caminhos seja executado.',
    concept: [
      {
        kind: 'text',
        body:
          'O `else` cobre o caso contrário. Com `if/else`, um dos dois blocos **sempre** roda, nunca os dois e nunca nenhum.',
      },
      {
        kind: 'code',
        code: `int nota = 6;

if (nota >= 7)
{
    Console.WriteLine("Aprovado");
}
else
{
    Console.WriteLine("Reprovado");
}`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Dois `if` separados não são a mesma coisa que `if/else`. Com `if (x > 0)` seguido de `if (x <= 0)`, você avalia a condição duas vezes e corre o risco de as duas regras deixarem de ser complementares quando o código mudar.',
      },
      {
        kind: 'text',
        body:
          'Quando os dois caminhos só decidem um valor, o operador ternário `condição ? seValor : senaoValor` é mais direto e evita repetir a atribuição.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'if/else',
          code: `string status;
if (nota >= 7)
{
    status = "Aprovado";
}
else
{
    status = "Reprovado";
}`,
        },
        right: {
          label: 'Ternário',
          code: `string status = nota >= 7
    ? "Aprovado"
    : "Reprovado";`,
        },
        note: 'Use o ternário quando os dois lados são valores simples; use if/else quando há mais de uma ação.',
      },
    ],
    quiz: [
      {
        id: 's01c06l02q1',
        type: 'single',
        prompt: 'Quantas linhas este código imprime, para qualquer valor de `n`?',
        code: `if (n % 2 == 0)
    Console.WriteLine("par");
else
    Console.WriteLine("impar");`,
        options: [
          { id: 'a', text: 'Exatamente uma', correct: true },
          { id: 'b', text: 'Zero ou uma' },
          { id: 'c', text: 'Uma ou duas' },
          { id: 'd', text: 'Sempre duas' },
        ],
        explanation:
          'É a garantia do `if/else`: os caminhos são mutuamente exclusivos e cobrem todos os casos.',
      },
      {
        id: 's01c06l02q2',
        type: 'single',
        prompt: 'Qual é o valor de `r` quando `x` vale 4?',
        code: 'int r = x > 10 ? 1 : x > 3 ? 2 : 3;',
        options: [
          { id: 'a', code: '2', correct: true },
          { id: 'b', code: '1' },
          { id: 'c', code: '3' },
          { id: 'd', text: 'Erro de compilação' },
        ],
        explanation:
          'O primeiro teste falha, e o segundo ternário é avaliado: `4 > 3` é verdadeiro, então `2`. Ternários aninhados funcionam, mas passar de dois níveis prejudica a leitura.',
      },
      {
        id: 's01c06l02q3',
        type: 'single',
        prompt: 'Qual é o problema deste código?',
        code: `if (idade >= 18)
    Console.WriteLine("Adulto");
if (idade < 18)
    Console.WriteLine("Menor");`,
        options: [
          {
            id: 'a',
            text: 'Funciona, mas avalia a condição duas vezes e não deixa a exclusividade explícita para quem lê ou altera o código.',
            correct: true,
          },
          { id: 'b', text: 'Pode imprimir as duas linhas ao mesmo tempo.' },
          { id: 'c', text: 'Não compila porque falta um `else`.' },
          { id: 'd', text: 'Nunca imprime nada.' },
        ],
        explanation:
          'O resultado hoje está certo. O risco é de manutenção: se alguém mudar o primeiro limite para 21 e esquecer o segundo, aparece um intervalo sem tratamento.',
      },
    ],
    challenge: {
      brief:
        'Leia a idade de um candidato e o resultado de sua prova (nota de 0 a 100). Informe se ele está apto, considerando idade de 18 anos ou mais e nota de 60 ou mais. Sempre imprima o motivo da decisão.',
      requirements: [
        'Linha 1: `Apto: True` ou `Apto: False`',
        'Linha 2: `Motivo: aprovado em ambos os criterios`',
        'Se a idade reprovar, o motivo é `idade insuficiente`',
        'Se só a nota reprovar, o motivo é `nota insuficiente`',
        'A idade é verificada antes da nota',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int idade = int.Parse(Console.ReadLine());
        int nota = int.Parse(Console.ReadLine());

        // Decida e explique
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int idade = int.Parse(Console.ReadLine());
        int nota = int.Parse(Console.ReadLine());

        bool apto = idade >= 18 && nota >= 60;

        string motivo;
        if (idade < 18)
        {
            motivo = "idade insuficiente";
        }
        else if (nota < 60)
        {
            motivo = "nota insuficiente";
        }
        else
        {
            motivo = "aprovado em ambos os criterios";
        }

        Console.WriteLine($"Apto: {apto}");
        Console.WriteLine($"Motivo: {motivo}");
    }
}
`,
      hints: [
        'A decisão de aptidão é uma expressão booleana única com `&&`.',
        'O motivo precisa de três caminhos, então uma cadeia `if / else if / else` resolve.',
      ],
      tests: [
        {
          name: 'Aprovado nos dois',
          stdin: '25\n78\n',
          expectedStdout: 'Apto: True\nMotivo: aprovado em ambos os criterios',
        },
        {
          name: 'Idade insuficiente',
          stdin: '16\n90\n',
          expectedStdout: 'Apto: False\nMotivo: idade insuficiente',
        },
        {
          name: 'Nota insuficiente',
          stdin: '30\n45\n',
          expectedStdout: 'Apto: False\nMotivo: nota insuficiente',
        },
      ],
    },
  },
  {
    id: 's01c06l03',
    title: 'else if e múltiplos caminhos',
    objective: 'Escolher entre três ou mais alternativas com uma cadeia de condições ordenada corretamente.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando há mais de dois caminhos, a cadeia `if / else if / else` avalia as condições **de cima para baixo** e para na primeira que der verdadeira. As demais nem são testadas.',
      },
      {
        kind: 'code',
        code: `int nota = 85;

if (nota >= 90)
{
    Console.WriteLine("A");
}
else if (nota >= 80)
{
    Console.WriteLine("B");
}
else if (nota >= 70)
{
    Console.WriteLine("C");
}
else
{
    Console.WriteLine("D");
}`,
        caption: 'Imprime B: a primeira condição verdadeira encerra a cadeia.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A **ordem é tudo**. Se a cadeia começasse por `nota >= 70`, todo aluno com 85 receberia C, porque essa condição também é verdadeira e vem antes. Em faixas numéricas, vá do mais restritivo para o menos restritivo.',
      },
      {
        kind: 'text',
        body:
          'Como a cadeia para na primeira correspondência, você não precisa repetir o limite inferior. Escrever `else if (nota >= 80 && nota < 90)` é redundante: se chegou até aqui, `nota < 90` já é garantido.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Redundante',
          code: `if (n >= 90) ...
else if (n >= 80 && n < 90) ...
else if (n >= 70 && n < 80) ...`,
        },
        right: {
          label: 'Limpo',
          code: `if (n >= 90) ...
else if (n >= 80) ...
else if (n >= 70) ...`,
        },
      },
      {
        kind: 'text',
        body:
          'O `else` final é opcional, mas costuma ser uma boa ideia: ele garante que nenhum caso fique sem tratamento e serve de rede de segurança para valores inesperados.',
      },
    ],
    quiz: [
      {
        id: 's01c06l03q1',
        type: 'single',
        prompt: 'O que imprime para `x = 5`?',
        code: `if (x > 0)
    Console.WriteLine("positivo");
else if (x > 3)
    Console.WriteLine("maior que 3");
else
    Console.WriteLine("outro");`,
        options: [
          { id: 'a', code: 'positivo', correct: true },
          { id: 'b', code: 'maior que 3' },
          { id: 'c', code: 'positivo\nmaior que 3' },
          { id: 'd', code: 'outro' },
        ],
        explanation:
          'A primeira condição já é verdadeira, então a cadeia encerra. O segundo ramo é inalcançável para qualquer valor positivo: um sinal de que a ordem está errada.',
      },
      {
        id: 's01c06l03q2',
        type: 'single',
        prompt: 'Qual cadeia classifica corretamente as faixas de IMC?',
        options: [
          {
            id: 'a',
            code: `if (imc < 18.5) "abaixo"
else if (imc < 25) "normal"
else if (imc < 30) "sobrepeso"
else "obesidade"`,
            correct: true,
          },
          {
            id: 'b',
            code: `if (imc < 30) "sobrepeso"
else if (imc < 25) "normal"
else if (imc < 18.5) "abaixo"
else "obesidade"`,
          },
          {
            id: 'c',
            code: `if (imc > 18.5) "normal"
else if (imc > 25) "sobrepeso"
else "abaixo"`,
          },
          {
            id: 'd',
            code: `if (imc < 18.5) "abaixo"
if (imc < 25) "normal"
if (imc < 30) "sobrepeso"`,
          },
        ],
        explanation:
          'Com `<`, vá do menor para o maior. A B captura tudo abaixo de 30 no primeiro ramo, e a D usa `if` soltos, podendo imprimir múltiplas classificações.',
      },
      {
        id: 's01c06l03q3',
        type: 'single',
        prompt: 'Por que `else if (n >= 80 && n < 90)` é redundante depois de `if (n >= 90)`?',
        options: [
          {
            id: 'a',
            text: 'Porque a cadeia só chega ali se o primeiro teste falhou, e isso já garante que `n < 90`.',
            correct: true,
          },
          { id: 'b', text: 'Porque `&&` não é permitido em `else if`.' },
          { id: 'c', text: 'Porque o compilador remove a segunda comparação automaticamente.' },
          { id: 'd', text: 'Não é redundante, a verificação é necessária.' },
        ],
        explanation:
          'Aproveitar o que a cadeia já garantiu deixa o código mais curto e menos sujeito a inconsistências quando os limites mudam.',
      },
    ],
    challenge: {
      brief:
        'Uma transportadora calcula o frete por faixa de peso: até 1 kg custa R$ 12,00; acima de 1 até 5 kg custa R$ 22,00; acima de 5 até 20 kg custa R$ 48,00; acima de 20 kg custa R$ 95,00. Leia o peso e informe a faixa e o valor.',
      requirements: [
        'Linha 1: `Faixa: media`',
        'Linha 2: `Frete: 48.00`',
        'As faixas se chamam `leve`, `padrao`, `media` e `pesada`, nessa ordem crescente de peso',
        'Use uma cadeia `if / else if / else` sem repetir limites inferiores',
        'Use `decimal` para o valor e `double` para o peso',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        double peso = double.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);

        // Classifique a faixa e defina o frete
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

        string faixa;
        decimal frete;

        if (peso <= 1)
        {
            faixa = "leve";
            frete = 12.00m;
        }
        else if (peso <= 5)
        {
            faixa = "padrao";
            frete = 22.00m;
        }
        else if (peso <= 20)
        {
            faixa = "media";
            frete = 48.00m;
        }
        else
        {
            faixa = "pesada";
            frete = 95.00m;
        }

        Console.WriteLine($"Faixa: {faixa}");
        Console.WriteLine($"Frete: {frete:F2}");
    }
}
`,
      hints: [
        'Como os limites são "até X", use `<=` e vá do menor peso para o maior.',
        'Declare `faixa` e `frete` antes da cadeia e atribua dentro de cada ramo.',
        'O `else` final cobre qualquer peso acima de 20, sem precisar de condição.',
      ],
      tests: [
        {
          name: 'Peso médio',
          stdin: '12.5\n',
          expectedStdout: 'Faixa: media\nFrete: 48.00',
        },
        {
          name: 'Exatamente 1 kg é leve',
          stdin: '1\n',
          expectedStdout: 'Faixa: leve\nFrete: 12.00',
        },
        {
          name: 'Acima do limite',
          stdin: '31\n',
          expectedStdout: 'Faixa: pesada\nFrete: 95.00',
        },
        {
          name: 'Faixa padrão',
          stdin: '4.2\n',
          expectedStdout: 'Faixa: padrao\nFrete: 22.00',
        },
      ],
    },
  },
  {
    id: 's01c06l04',
    title: 'Condições compostas',
    objective: 'Traduzir regras de negócio com múltiplos critérios em condições corretas e legíveis.',
    concept: [
      {
        kind: 'text',
        body:
          'Regras reais combinam critérios. O desafio raramente é a sintaxe: é traduzir o português do enunciado sem inverter um limite ou trocar um E por um OU.',
      },
      {
        kind: 'table',
        headers: ['Enunciado', 'Condição'],
        rows: [
          ['entre 18 e 65 anos', '`idade >= 18 && idade <= 65`'],
          ['fora do horário comercial', '`hora < 8 \\|\\| hora >= 18`'],
          ['nem A nem B', '`!a && !b`'],
          ['pelo menos um dos dois', '`a \\|\\| b`'],
          ['exatamente um dos dois', '`a != b`'],
          ['os dois ou nenhum', '`a == b`'],
        ],
      },
      {
        kind: 'text',
        body:
          'Quando a condição fica longa, dê nome às partes. Uma variável `bool` bem nomeada vale mais que um comentário explicando a expressão.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Difícil de ler',
          code: `if ((h >= 8 && h < 18) &&
    d != 0 && d != 6 &&
    !feriado)
{ ... }`,
        },
        right: {
          label: 'Autoexplicativo',
          code: `bool horarioComercial = h >= 8 && h < 18;
bool diaDeSemana = d != 0 && d != 6;
bool aberto = horarioComercial
    && diaDeSemana && !feriado;

if (aberto) { ... }`,
        },
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Quando uma condição tem mais de três operadores lógicos, quase sempre existe um conceito de negócio sem nome escondido ali. Nomear esse conceito melhora o código e o entendimento do problema.',
      },
    ],
    quiz: [
      {
        id: 's01c06l04q1',
        type: 'single',
        prompt: 'Qual condição significa "exatamente um dos dois é verdadeiro"?',
        options: [
          { id: 'a', code: 'a != b', correct: true },
          { id: 'b', code: 'a && b' },
          { id: 'c', code: 'a || b' },
          { id: 'd', code: '!a && !b' },
        ],
        explanation:
          'Com dois `bool`, "diferentes" é exatamente o OU exclusivo. C# também aceita `a ^ b` com o mesmo significado.',
      },
      {
        id: 's01c06l04q2',
        type: 'single',
        prompt:
          'Regra: desconto para quem é assinante e comprou acima de R$ 200, ou para qualquer compra acima de R$ 500. Qual expressão está certa?',
        options: [
          {
            id: 'a',
            code: '(assinante && valor > 200) || valor > 500',
            correct: true,
          },
          { id: 'b', code: 'assinante && (valor > 200 || valor > 500)' },
          { id: 'c', code: 'assinante || valor > 200 || valor > 500' },
          { id: 'd', code: 'assinante && valor > 200 && valor > 500' },
        ],
        explanation:
          'A B exige ser assinante nos dois casos e a C dá desconto para qualquer assinante. Os parênteses aqui são o que separa as duas regras.',
      },
      {
        id: 's01c06l04q3',
        type: 'single',
        prompt: 'Qual é a negação de `hora >= 8 && hora < 18`?',
        options: [
          { id: 'a', code: 'hora < 8 || hora >= 18', correct: true },
          { id: 'b', code: 'hora < 8 && hora >= 18' },
          { id: 'c', code: 'hora <= 8 || hora > 18' },
          { id: 'd', code: 'hora > 8 || hora < 18' },
        ],
        explanation:
          'Negar um E vira OU, e cada comparação se inverte incluindo os limites: `>=` vira `<` e `<` vira `>=`.',
      },
    ],
    challenge: {
      brief:
        'Uma loja está aberta de segunda a sábado, das 9h às 19h, exceto em feriados, quando fecha. Leia o dia da semana (0 = domingo até 6 = sábado), a hora e se é feriado (`sim` ou `nao`), e informe se a loja está aberta e o motivo quando estiver fechada.',
      requirements: [
        'Linha 1: `Aberta: False`',
        'Linha 2: `Motivo: feriado`',
        'Quando aberta, o motivo é `dentro do horario`',
        'Os motivos possíveis de fechamento são `feriado`, `domingo` e `fora do horario`, verificados nessa ordem',
        'O horário aberto é das 9h às 19h, incluindo 9 e excluindo 19',
        'Nomeie as condições em variáveis `bool`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int dia = int.Parse(Console.ReadLine());
        int hora = int.Parse(Console.ReadLine());
        bool feriado = Console.ReadLine() == "sim";

        // Componha as condicoes e decida
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int dia = int.Parse(Console.ReadLine());
        int hora = int.Parse(Console.ReadLine());
        bool feriado = Console.ReadLine() == "sim";

        bool horarioOk = hora >= 9 && hora < 19;
        bool diaOk = dia != 0;
        bool aberta = diaOk && horarioOk && !feriado;

        string motivo;
        if (feriado)
        {
            motivo = "feriado";
        }
        else if (!diaOk)
        {
            motivo = "domingo";
        }
        else if (!horarioOk)
        {
            motivo = "fora do horario";
        }
        else
        {
            motivo = "dentro do horario";
        }

        Console.WriteLine($"Aberta: {aberta}");
        Console.WriteLine($"Motivo: {motivo}");
    }
}
`,
      hints: [
        'Isole `horarioOk` e `diaOk` em variáveis antes de combinar tudo em `aberta`.',
        'Domingo é o dia 0, então "não é domingo" é `dia != 0`.',
        'A ordem dos motivos importa: feriado é verificado primeiro, mesmo num domingo.',
      ],
      tests: [
        {
          name: 'Feriado em dia útil',
          stdin: '3\n14\nsim\n',
          expectedStdout: 'Aberta: False\nMotivo: feriado',
        },
        {
          name: 'Terça no horário',
          stdin: '2\n9\nnao\n',
          expectedStdout: 'Aberta: True\nMotivo: dentro do horario',
        },
        {
          name: 'Domingo comum',
          stdin: '0\n12\nnao\n',
          expectedStdout: 'Aberta: False\nMotivo: domingo',
        },
        {
          name: 'Sábado às 19h',
          stdin: '6\n19\nnao\n',
          expectedStdout: 'Aberta: False\nMotivo: fora do horario',
        },
      ],
    },
  },
  {
    id: 's01c06l05',
    title: 'if aninhado (e como evitar)',
    objective: 'Reconhecer quando o aninhamento é necessário e aplicar cláusulas de guarda para achatar o código.',
    concept: [
      {
        kind: 'text',
        body:
          'Um `if` dentro de outro é aninhamento. Ele é legítimo quando a segunda pergunta só faz sentido depois da primeira, mas vira um problema rápido: cada nível empurra o código para a direita e dobra os caminhos possíveis.',
      },
      {
        kind: 'code',
        code: `if (usuarioExiste)
{
    if (senhaCorreta)
    {
        if (contaAtiva)
        {
            Console.WriteLine("Bem-vindo");
        }
        else
        {
            Console.WriteLine("Conta inativa");
        }
    }
    else
    {
        Console.WriteLine("Senha invalida");
    }
}
else
{
    Console.WriteLine("Usuario nao encontrado");
}`,
        caption: 'Funciona, mas a lógica principal está no ponto mais profundo e mais difícil de achar.',
      },
      {
        kind: 'text',
        body:
          'A técnica que resolve isso se chama **cláusula de guarda**: trate os casos de saída primeiro e deixe o caminho feliz no nível zero de indentação.',
      },
      {
        kind: 'code',
        code: `if (!usuarioExiste)
{
    Console.WriteLine("Usuario nao encontrado");
}
else if (!senhaCorreta)
{
    Console.WriteLine("Senha invalida");
}
else if (!contaAtiva)
{
    Console.WriteLine("Conta inativa");
}
else
{
    Console.WriteLine("Bem-vindo");
}`,
        caption: 'Mesma lógica, uma cadeia plana e uma condição por linha.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'A regra prática: se você chegou ao terceiro nível de indentação dentro de condicionais, provavelmente há uma cadeia plana escondida ali. Vale reescrever.',
      },
      {
        kind: 'text',
        body:
          'Também vale lembrar que um `if` aninhado com `&&` no lugar do aninhamento é a mesma coisa: `if (a) { if (b) { X } }` é equivalente a `if (a && b) { X }` quando não há `else`.',
      },
    ],
    quiz: [
      {
        id: 's01c06l05q1',
        type: 'single',
        prompt: 'Qual código é equivalente a `if (a) { if (b) { Faz(); } }`?',
        options: [
          { id: 'a', code: 'if (a && b) { Faz(); }', correct: true },
          { id: 'b', code: 'if (a || b) { Faz(); }' },
          { id: 'c', code: 'if (a) { Faz(); } if (b) { Faz(); }' },
          { id: 'd', code: 'if (!a && !b) { Faz(); }' },
        ],
        explanation:
          'Sem `else` em nenhum nível, o aninhamento é literalmente um E. Achatar assim reduz a indentação sem mudar o comportamento.',
      },
      {
        id: 's01c06l05q2',
        type: 'single',
        prompt: 'O que é uma cláusula de guarda?',
        options: [
          {
            id: 'a',
            text: 'Tratar os casos inválidos ou de saída no começo, deixando o fluxo principal sem aninhamento.',
            correct: true,
          },
          { id: 'b', text: 'Um `if` que protege o programa contra exceções.' },
          { id: 'c', text: 'Uma condição que sempre é verdadeira, usada para documentar.' },
          { id: 'd', text: 'Um bloco `else` obrigatório no fim de toda cadeia.' },
        ],
        explanation:
          'É uma técnica de organização, não um recurso da linguagem. O efeito é código mais raso e mais fácil de seguir.',
      },
      {
        id: 's01c06l05q3',
        type: 'single',
        prompt: 'Quando o aninhamento é realmente necessário?',
        options: [
          {
            id: 'a',
            text: 'Quando cada nível tem seu próprio `else` com ações diferentes, ou quando a segunda verificação só é segura depois da primeira.',
            correct: true,
          },
          { id: 'b', text: 'Sempre que houver mais de uma condição.' },
          { id: 'c', text: 'Nunca: todo aninhamento pode ser removido.' },
          { id: 'd', text: 'Apenas quando as condições envolvem tipos diferentes.' },
        ],
        explanation:
          'Nem todo aninhamento é ruim. O problema é o aninhamento acidental, que existe só porque ninguém reorganizou os casos.',
      },
    ],
    challenge: {
      brief:
        'Um caixa eletrônico valida um saque em etapas: o cartão precisa estar ativo, a senha correta, o valor precisa ser múltiplo de 10 e o saldo suficiente. Escreva a validação como uma cadeia plana, retornando a primeira falha encontrada nessa ordem.',
      requirements: [
        'Entrada: senha digitada, valor do saque, saldo, e `sim`/`nao` para cartão ativo',
        'Sucesso imprime duas linhas: `Saque autorizado` e `Novo saldo: 700.00`',
        'A senha correta é `1234`',
        'Falhas imprimem uma única linha: `Erro: cartao inativo`, `Erro: senha incorreta`, `Erro: valor deve ser multiplo de 10` ou `Erro: saldo insuficiente`',
        'Verifique nessa exata ordem e use uma cadeia `if / else if`, sem aninhar',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        string senha = Console.ReadLine();
        int valor = int.Parse(Console.ReadLine());
        decimal saldo = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        bool ativo = Console.ReadLine() == "sim";

        // Valide em cadeia plana
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        string senha = Console.ReadLine();
        int valor = int.Parse(Console.ReadLine());
        decimal saldo = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        bool ativo = Console.ReadLine() == "sim";

        if (!ativo)
        {
            Console.WriteLine("Erro: cartao inativo");
        }
        else if (senha != "1234")
        {
            Console.WriteLine("Erro: senha incorreta");
        }
        else if (valor % 10 != 0)
        {
            Console.WriteLine("Erro: valor deve ser multiplo de 10");
        }
        else if (valor > saldo)
        {
            Console.WriteLine("Erro: saldo insuficiente");
        }
        else
        {
            Console.WriteLine("Saque autorizado");
            Console.WriteLine($"Novo saldo: {saldo - valor:F2}");
        }
    }
}
`,
      hints: [
        'Cada guarda testa a **falha** e imprime o erro, então as condições vêm negadas.',
        'Múltiplo de 10 se verifica com `valor % 10 != 0`.',
        'O caminho de sucesso fica no `else` final, sem nenhum aninhamento.',
      ],
      tests: [
        {
          name: 'Saque válido',
          stdin: '1234\n300\n1000.00\nsim\n',
          expectedStdout: 'Saque autorizado\nNovo saldo: 700.00',
        },
        {
          name: 'Cartão inativo tem prioridade',
          stdin: '9999\n300\n1000.00\nnao\n',
          expectedStdout: 'Erro: cartao inativo',
        },
        {
          name: 'Senha errada',
          stdin: '0000\n300\n1000.00\nsim\n',
          expectedStdout: 'Erro: senha incorreta',
        },
        {
          name: 'Valor não múltiplo de 10',
          stdin: '1234\n255\n1000.00\nsim\n',
          expectedStdout: 'Erro: valor deve ser multiplo de 10',
        },
        {
          name: 'Saldo insuficiente',
          stdin: '1234\n2000\n1000.00\nsim\n',
          expectedStdout: 'Erro: saldo insuficiente',
        },
      ],
    },
  },
  {
    id: 's01c06l06',
    title: 'switch clássico',
    objective: 'Comparar uma expressão contra vários valores fixos com switch, case e break.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando você compara **a mesma variável** contra vários valores exatos, o `switch` expressa isso melhor que uma cadeia de `if`.',
      },
      {
        kind: 'code',
        code: `int dia = 3;

switch (dia)
{
    case 1:
        Console.WriteLine("Domingo");
        break;
    case 2:
        Console.WriteLine("Segunda");
        break;
    case 3:
        Console.WriteLine("Terca");
        break;
    default:
        Console.WriteLine("Outro dia");
        break;
}`,
      },
      {
        kind: 'text',
        body:
          'O `break` é obrigatório ao fim de cada `case` com código. Sem ele o compilador reclama, o que evita o famoso bug de "cair" no case seguinte por esquecimento.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Cases vazios em sequência **são** permitidos e agrupam valores. Escrever `case 6: case 7:` seguido de um único bloco trata os dois valores da mesma forma.',
      },
      {
        kind: 'code',
        code: `switch (dia)
{
    case 1:
    case 7:
        Console.WriteLine("Fim de semana");
        break;
    default:
        Console.WriteLine("Dia util");
        break;
}`,
      },
      {
        kind: 'table',
        headers: ['Situação', 'Prefira'],
        rows: [
          ['comparar contra valores exatos', '`switch`'],
          ['faixas numéricas', '`if / else if` ou padrões relacionais'],
          ['condições com variáveis diferentes', '`if / else if`'],
          ['muitos valores agrupados', '`switch` com cases empilhados'],
        ],
      },
    ],
    quiz: [
      {
        id: 's01c06l06q1',
        type: 'single',
        prompt: 'O que acontece se você esquecer o `break` num `case` que tem código?',
        options: [
          { id: 'a', text: 'Erro de compilação.', correct: true },
          { id: 'b', text: 'O programa cai silenciosamente no case seguinte.' },
          { id: 'c', text: 'O switch inteiro é ignorado.' },
          { id: 'd', text: 'Nada, o `break` é opcional em C#.' },
        ],
        explanation:
          'C# proíbe o fall-through implícito, diferente de C e JavaScript. É um erro de compilação, não um bug em produção.',
      },
      {
        id: 's01c06l06q2',
        type: 'single',
        prompt: 'Para que serve o `default`?',
        options: [
          {
            id: 'a',
            text: 'Tratar qualquer valor que não casou com nenhum `case`.',
            correct: true,
          },
          { id: 'b', text: 'Definir o valor inicial da variável avaliada.' },
          { id: 'c', text: 'Executar sempre, antes dos cases.' },
          { id: 'd', text: 'Marcar qual case tem prioridade.' },
        ],
        explanation:
          'É o equivalente ao `else` final. Ele é opcional, mas incluí-lo evita que valores inesperados passem sem tratamento.',
      },
      {
        id: 's01c06l06q3',
        type: 'single',
        prompt: 'Qual situação NÃO é adequada para um `switch` clássico?',
        options: [
          { id: 'a', text: 'Classificar uma nota em faixas como 0-59, 60-79 e 80-100.', correct: true },
          { id: 'b', text: 'Traduzir um código de status (1, 2, 3) em texto.' },
          { id: 'c', text: 'Agrupar dias de fim de semana.' },
          { id: 'd', text: 'Escolher uma ação a partir de um comando digitado.' },
        ],
        explanation:
          'Faixas pedem comparações, não igualdade. Um `switch` clássico exigiria um case por número, o que é impraticável.',
      },
    ],
    challenge: {
      brief:
        'Leia um comando de menu (`novo`, `abrir`, `salvar`, `sair`) e imprima a descrição da ação. Comandos desconhecidos recebem uma mensagem padrão. Trate `abrir` e `salvar` com a mesma mensagem de acesso a disco, além da mensagem específica.',
      requirements: [
        'Para `novo`: `Acao: criando documento`',
        'Para `abrir`: `Acao: acessando disco` seguido de `Detalhe: abrindo`',
        'Para `salvar`: `Acao: acessando disco` seguido de `Detalhe: salvando`',
        'Para `sair`: `Acao: encerrando`',
        'Para qualquer outro: `Acao: comando desconhecido`',
        'Use `switch` com `case` e `break`',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        string comando = Console.ReadLine();

        // Escolha a acao com switch
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        string comando = Console.ReadLine();

        switch (comando)
        {
            case "novo":
                Console.WriteLine("Acao: criando documento");
                break;
            case "abrir":
                Console.WriteLine("Acao: acessando disco");
                Console.WriteLine("Detalhe: abrindo");
                break;
            case "salvar":
                Console.WriteLine("Acao: acessando disco");
                Console.WriteLine("Detalhe: salvando");
                break;
            case "sair":
                Console.WriteLine("Acao: encerrando");
                break;
            default:
                Console.WriteLine("Acao: comando desconhecido");
                break;
        }
    }
}
`,
      hints: [
        'Um `switch` funciona com `string`, não só com números.',
        'Cada `case` pode ter mais de uma linha de código antes do `break`.',
      ],
      tests: [
        {
          name: 'Comando novo',
          stdin: 'novo\n',
          expectedStdout: 'Acao: criando documento',
        },
        {
          name: 'Comando abrir',
          stdin: 'abrir\n',
          expectedStdout: 'Acao: acessando disco\nDetalhe: abrindo',
        },
        {
          name: 'Comando salvar',
          stdin: 'salvar\n',
          expectedStdout: 'Acao: acessando disco\nDetalhe: salvando',
        },
        {
          name: 'Comando inválido',
          stdin: 'imprimir\n',
          expectedStdout: 'Acao: comando desconhecido',
        },
      ],
    },
  },
  {
    id: 's01c06l07',
    title: 'switch como expressão',
    objective: 'Usar a forma moderna do switch para produzir um valor em uma única expressão.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando o `switch` existe só para escolher um **valor**, a forma de expressão é muito mais enxuta. Ela usa `=>` em vez de `case` e `break`, e devolve um resultado direto.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'switch clássico',
          code: `string nome;
switch (dia)
{
    case 1:
        nome = "Domingo";
        break;
    case 2:
        nome = "Segunda";
        break;
    default:
        nome = "Invalido";
        break;
}`,
        },
        right: {
          label: 'switch de expressão',
          code: `string nome = dia switch
{
    1 => "Domingo",
    2 => "Segunda",
    _ => "Invalido",
};`,
        },
      },
      {
        kind: 'text',
        body:
          'Três diferenças de sintaxe: a variável vem **antes** da palavra `switch`, os braços são separados por vírgula, e o `_` (descarte) faz o papel do `default`.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O switch de expressão precisa ser **exaustivo**. Se você omitir o `_` e algum valor não casar, o programa lança `SwitchExpressionException` em tempo de execução. Na prática, sempre inclua o `_`.',
      },
      {
        kind: 'text',
        body: 'Vários valores podem compartilhar um braço usando `or`, o que substitui os cases empilhados:',
      },
      {
        kind: 'code',
        code: `string tipo = dia switch
{
    1 or 7 => "Fim de semana",
    2 or 3 or 4 or 5 or 6 => "Dia util",
    _ => "Invalido",
};

Console.WriteLine(tipo);`,
      },
    ],
    quiz: [
      {
        id: 's01c06l07q1',
        type: 'single',
        prompt: 'Qual é a sintaxe correta de um switch de expressão?',
        options: [
          { id: 'a', code: 'string s = x switch { 1 => "um", _ => "outro" };', correct: true },
          { id: 'b', code: 'string s = switch (x) { 1 => "um", _ => "outro" };' },
          { id: 'c', code: 'string s = x switch { case 1: "um"; default: "outro"; };' },
          { id: 'd', code: 'string s = switch x { 1 -> "um", _ -> "outro" };' },
        ],
        explanation:
          'A variável vem antes da palavra `switch`, os braços usam `=>` e são separados por vírgula. Não há `case` nem `break`.',
      },
      {
        id: 's01c06l07q2',
        type: 'single',
        prompt: 'O que o `_` representa num switch de expressão?',
        options: [
          { id: 'a', text: 'O caso padrão, que casa com qualquer valor restante.', correct: true },
          { id: 'b', text: 'Um valor nulo.' },
          { id: 'c', text: 'O valor original da variável avaliada.' },
          { id: 'd', text: 'Um marcador de fim de lista, sem efeito.' },
        ],
        explanation:
          'É o padrão de descarte. Ele deve vir por último, porque casa com tudo e tornaria os braços seguintes inalcançáveis.',
      },
      {
        id: 's01c06l07q3',
        type: 'single',
        prompt: 'O que acontece se nenhum braço casar e não houver `_`?',
        options: [
          { id: 'a', code: 'SwitchExpressionException em tempo de execução', correct: true },
          { id: 'b', text: 'A expressão devolve o valor padrão do tipo.' },
          { id: 'c', text: 'Erro de compilação garantido.' },
          { id: 'd', text: 'A expressão devolve null.' },
        ],
        explanation:
          'O compilador emite um aviso de não exaustividade, mas quem lança o erro é o runtime. Incluir o `_` resolve os dois problemas.',
      },
    ],
    challenge: {
      brief:
        'Um sistema de RPG converte o código de classe do personagem em nome e atributo principal. Leia o código (`1` guerreiro, `2` mago, `3` arqueiro, `4` clérigo) e imprima o resultado usando switch de expressão.',
      requirements: [
        'Linha 1: `Classe: Mago`',
        'Linha 2: `Atributo: Inteligencia`',
        'Linha 3: `Usa magia: True`',
        'Guerreiro usa Força, Mago Inteligência, Arqueiro Destreza, Clérigo Sabedoria',
        'Magos e clérigos usam magia',
        'Código desconhecido produz `Desconhecida`, `Nenhum` e `False`',
        'Use switch de expressão nas três decisões',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int codigo = int.Parse(Console.ReadLine());

        // Use switch de expressao para as tres saidas
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int codigo = int.Parse(Console.ReadLine());

        string classe = codigo switch
        {
            1 => "Guerreiro",
            2 => "Mago",
            3 => "Arqueiro",
            4 => "Clerigo",
            _ => "Desconhecida",
        };

        string atributo = codigo switch
        {
            1 => "Forca",
            2 => "Inteligencia",
            3 => "Destreza",
            4 => "Sabedoria",
            _ => "Nenhum",
        };

        bool magia = codigo switch
        {
            2 or 4 => true,
            _ => false,
        };

        Console.WriteLine($"Classe: {classe}");
        Console.WriteLine($"Atributo: {atributo}");
        Console.WriteLine($"Usa magia: {magia}");
    }
}
`,
      hints: [
        'Três switches de expressão separados são mais legíveis que um só devolvendo texto composto.',
        'Para magia, agrupe os códigos 2 e 4 com `2 or 4 => true`.',
        'Não esqueça o braço `_` em cada switch.',
      ],
      tests: [
        {
          name: 'Mago',
          stdin: '2\n',
          expectedStdout: 'Classe: Mago\nAtributo: Inteligencia\nUsa magia: True',
        },
        {
          name: 'Guerreiro',
          stdin: '1\n',
          expectedStdout: 'Classe: Guerreiro\nAtributo: Forca\nUsa magia: False',
        },
        {
          name: 'Clérigo',
          stdin: '4\n',
          expectedStdout: 'Classe: Clerigo\nAtributo: Sabedoria\nUsa magia: True',
        },
        {
          name: 'Código inválido',
          stdin: '9\n',
          expectedStdout: 'Classe: Desconhecida\nAtributo: Nenhum\nUsa magia: False',
        },
      ],
    },
  },
  {
    id: 's01c06l08',
    title: 'Padrões relacionais em switch',
    objective: 'Usar comparações e combinações dentro de um switch para tratar faixas de valores.',
    concept: [
      {
        kind: 'text',
        body:
          'O `switch` moderno não se limita a igualdade. Com padrões relacionais você escreve `> 100`, `<= 0` e combina com `and`, `or` e `not`, cobrindo faixas de forma muito legível.',
      },
      {
        kind: 'code',
        code: `int nota = 85;

string conceito = nota switch
{
    >= 90 => "A",
    >= 80 => "B",
    >= 70 => "C",
    >= 60 => "D",
    _ => "F",
};

Console.WriteLine(conceito);   // B`,
        caption: 'Como no if/else, a ordem importa: o primeiro padrão que casar ganha.',
      },
      {
        kind: 'text',
        body: 'Para intervalos fechados, combine dois padrões relacionais com `and`:',
      },
      {
        kind: 'code',
        code: `string faixa = idade switch
{
    < 0 => "invalida",
    <= 12 => "crianca",
    >= 13 and <= 17 => "adolescente",
    >= 18 and <= 59 => "adulto",
    _ => "idoso",
};`,
      },
      {
        kind: 'table',
        headers: ['Padrão', 'Significado'],
        rows: [
          ['`> 100`', 'maior que 100'],
          ['`>= 1 and <= 9`', 'entre 1 e 9 inclusive'],
          ['`1 or 2 or 3`', 'um desses três valores'],
          ['`not 0`', 'qualquer coisa diferente de zero'],
          ['`_`', 'qualquer valor'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Para classificar faixas, o switch de padrões costuma ganhar do `if / else if`: fica mais curto, alinhado, e o compilador avisa quando um braço é inalcançável porque um padrão anterior já o cobria.',
      },
    ],
    quiz: [
      {
        id: 's01c06l08q1',
        type: 'single',
        prompt: 'Qual é o resultado para `n = 50`?',
        code: `string s = n switch
{
    > 100 => "alto",
    > 10 => "medio",
    _ => "baixo",
};`,
        options: [
          { id: 'a', code: 'medio', correct: true },
          { id: 'b', code: 'alto' },
          { id: 'c', code: 'baixo' },
          { id: 'd', text: 'SwitchExpressionException' },
        ],
        explanation:
          'O primeiro padrão falha e o segundo casa. Como no `if / else if`, a avaliação é de cima para baixo e para na primeira correspondência.',
      },
      {
        id: 's01c06l08q2',
        type: 'single',
        prompt: 'Como escrever o padrão para "entre 18 e 65, inclusive"?',
        options: [
          { id: 'a', code: '>= 18 and <= 65', correct: true },
          { id: 'b', code: '>= 18 && <= 65' },
          { id: 'c', code: '18..65' },
          { id: 'd', code: 'between 18 and 65' },
        ],
        explanation:
          'Dentro de padrões usa-se `and`, `or` e `not`, não os operadores `&&` e `||`. São gramáticas diferentes.',
      },
      {
        id: 's01c06l08q3',
        type: 'single',
        prompt: 'Por que este switch gera um aviso do compilador?',
        code: `string s = n switch
{
    > 10 => "a",
    > 100 => "b",
    _ => "c",
};`,
        options: [
          {
            id: 'a',
            text: 'Porque o braço `> 100` é inalcançável: todo valor maior que 100 já casou com `> 10`.',
            correct: true,
          },
          { id: 'b', text: 'Porque falta um padrão para valores negativos.' },
          { id: 'c', text: 'Porque `_` deveria vir primeiro.' },
          { id: 'd', text: 'Porque os braços devem estar em ordem crescente.' },
        ],
        explanation:
          'Esse aviso é um dos grandes benefícios do switch de padrões: o `if / else if` equivalente compilaria em silêncio com o mesmo bug.',
      },
    ],
    challenge: {
      brief:
        'Uma operadora classifica a velocidade de conexão em Mbps e define a prioridade de suporte. Leia a velocidade e produza a classificação e a prioridade usando padrões relacionais.',
      requirements: [
        'Velocidade negativa: `Plano: invalido` e `Prioridade: 0`',
        'Até 10: `Plano: basico` e `Prioridade: 3`',
        'De 11 a 100: `Plano: intermediario` e `Prioridade: 2`',
        'De 101 a 500: `Plano: avancado` e `Prioridade: 1`',
        'Acima de 500: `Plano: empresarial` e `Prioridade: 1`',
        'Linha 3: `Fibra: True` quando a velocidade passa de 100',
        'Use switch de expressão com padrões relacionais',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int mbps = int.Parse(Console.ReadLine());

        // Classifique com padroes relacionais
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int mbps = int.Parse(Console.ReadLine());

        string plano = mbps switch
        {
            < 0 => "invalido",
            <= 10 => "basico",
            <= 100 => "intermediario",
            <= 500 => "avancado",
            _ => "empresarial",
        };

        int prioridade = mbps switch
        {
            < 0 => 0,
            <= 10 => 3,
            <= 100 => 2,
            _ => 1,
        };

        bool fibra = mbps > 100;

        Console.WriteLine($"Plano: {plano}");
        Console.WriteLine($"Prioridade: {prioridade}");
        Console.WriteLine($"Fibra: {fibra}");
    }
}
`,
      hints: [
        'Comece pelo padrão `< 0` para capturar o inválido antes de qualquer faixa.',
        'Com os braços em ordem crescente, basta o limite superior de cada faixa: `<= 10`, `<= 100`, `<= 500`.',
        'A verificação de fibra é uma comparação simples, não precisa de switch.',
      ],
      tests: [
        {
          name: 'Plano intermediário',
          stdin: '60\n',
          expectedStdout: 'Plano: intermediario\nPrioridade: 2\nFibra: False',
        },
        {
          name: 'Plano avançado',
          stdin: '300\n',
          expectedStdout: 'Plano: avancado\nPrioridade: 1\nFibra: True',
        },
        {
          name: 'Velocidade inválida',
          stdin: '-5\n',
          expectedStdout: 'Plano: invalido\nPrioridade: 0\nFibra: False',
        },
        {
          name: 'Limite do básico',
          stdin: '10\n',
          expectedStdout: 'Plano: basico\nPrioridade: 3\nFibra: False',
        },
        {
          name: 'Empresarial',
          stdin: '1000\n',
          expectedStdout: 'Plano: empresarial\nPrioridade: 1\nFibra: True',
        },
      ],
    },
  },
  {
    id: 's01c06l09',
    title: 'Prática: classificador de faixas',
    objective: 'Escolher entre if/else e switch de padrões conforme o problema, e acertar todos os limites.',
    concept: [
      {
        kind: 'text',
        body:
          'Classificar em faixas parece trivial e é onde mais aparecem bugs. A causa quase sempre é a mesma: um limite tratado duas vezes ou nenhuma.',
      },
      {
        kind: 'text',
        body:
          'Antes de escrever código, desenhe a régua. Se o enunciado diz "até 10", "de 11 a 20" e "acima de 20", os limites são 10 e 20, e cada valor precisa cair em exatamente uma faixa.',
      },
      {
        kind: 'table',
        headers: ['Enunciado', 'Limite', 'Inclui?'],
        rows: [
          ['até 10', '`<= 10`', 'sim'],
          ['menos de 10', '`< 10`', 'não'],
          ['a partir de 10', '`>= 10`', 'sim'],
          ['acima de 10', '`> 10`', 'não'],
          ['entre 10 e 20', '`>= 10 and <= 20`', 'ambos'],
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Sempre teste os **valores de fronteira**. Se as faixas quebram em 10, teste 9, 10 e 11. Se um desses três cai na faixa errada, o bug apareceria em produção justo no caso mais comum.',
      },
      {
        kind: 'text',
        body:
          'Sobre a escolha da estrutura: valores exatos pedem `switch`, faixas pedem `switch` de padrões relacionais ou `if / else if`, e condições envolvendo variáveis diferentes pedem `if`.',
      },
    ],
    quiz: [
      {
        id: 's01c06l09q1',
        type: 'single',
        prompt: 'As faixas são "até 100" e "acima de 100". Onde o valor 100 cai?',
        options: [
          { id: 'a', text: 'Na primeira faixa, porque "até" inclui o limite.', correct: true },
          { id: 'b', text: 'Na segunda faixa.' },
          { id: 'c', text: 'Em nenhuma, é preciso uma terceira faixa.' },
          { id: 'd', text: 'Nas duas, e o programa deve escolher a primeira.' },
        ],
        explanation:
          '"Até X" inclui X (`<= 100`) e "acima de X" exclui (`> 100`). Juntas, cobrem todos os valores sem sobreposição.',
      },
      {
        id: 's01c06l09q2',
        type: 'single',
        prompt: 'Que bug existe nestas faixas?',
        code: `if (n < 10) "A";
else if (n > 10) "B";
else if (n > 20) "C";`,
        options: [
          {
            id: 'a',
            text: 'O valor 10 não é tratado por nenhum ramo, e o ramo C nunca é alcançado.',
            correct: true,
          },
          { id: 'b', text: 'Apenas o ramo C nunca é alcançado.' },
          { id: 'c', text: 'Apenas o valor 10 fica sem tratamento.' },
          { id: 'd', text: 'Nenhum bug: as faixas estão corretas.' },
        ],
        explanation:
          'São dois problemas ao mesmo tempo. Um `else` final teria revelado o buraco no 10, e a ordem crescente teria revelado o ramo morto.',
      },
      {
        id: 's01c06l09q3',
        type: 'single',
        prompt: 'Qual estrutura é mais adequada para converter um código de estado (`AC`, `SP`, `RJ`) em nome?',
        options: [
          { id: 'a', code: 'switch de expressão com valores exatos', correct: true },
          { id: 'b', code: 'switch com padrões relacionais' },
          { id: 'c', code: 'cadeia de if com Contains' },
          { id: 'd', code: 'operador ternário aninhado' },
        ],
        explanation:
          'São valores exatos e muitos deles: o switch de expressão é a forma mais curta e o compilador ainda verifica a exaustividade.',
      },
    ],
    challenge: {
      brief:
        'Uma academia calcula o desconto na mensalidade pela idade e pelo tempo de contrato. Leia a idade e os meses de contrato e produza a categoria etária, o desconto por idade e o desconto extra por fidelidade, além do total.',
      requirements: [
        'Categorias: até 12 `infantil`, 13 a 17 `juvenil`, 18 a 59 `adulto`, 60 ou mais `senior`',
        'Desconto por idade: infantil 30, juvenil 20, adulto 0, senior 40 (em pontos percentuais)',
        'Fidelidade: 12 meses ou mais soma 10, 24 ou mais soma 15 (não acumulam entre si)',
        'Linha 1: `Categoria: senior`',
        'Linha 2: `Desconto idade: 40`',
        'Linha 3: `Desconto fidelidade: 15`',
        'Linha 4: `Total: 55`',
        'O total é limitado a 50 quando a soma passa disso, exceto para senior, que pode chegar a 55',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int idade = int.Parse(Console.ReadLine());
        int meses = int.Parse(Console.ReadLine());

        // Classifique e calcule os descontos
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int idade = int.Parse(Console.ReadLine());
        int meses = int.Parse(Console.ReadLine());

        string categoria = idade switch
        {
            <= 12 => "infantil",
            <= 17 => "juvenil",
            <= 59 => "adulto",
            _ => "senior",
        };

        int descontoIdade = categoria switch
        {
            "infantil" => 30,
            "juvenil" => 20,
            "adulto" => 0,
            _ => 40,
        };

        int descontoFidelidade = meses switch
        {
            >= 24 => 15,
            >= 12 => 10,
            _ => 0,
        };

        int total = descontoIdade + descontoFidelidade;
        int teto = categoria == "senior" ? 55 : 50;
        if (total > teto)
        {
            total = teto;
        }

        Console.WriteLine($"Categoria: {categoria}");
        Console.WriteLine($"Desconto idade: {descontoIdade}");
        Console.WriteLine($"Desconto fidelidade: {descontoFidelidade}");
        Console.WriteLine($"Total: {total}");
    }
}
`,
      hints: [
        'Classifique a idade primeiro e depois derive o desconto a partir da categoria, evitando repetir os limites.',
        'Na fidelidade, teste `>= 24` antes de `>= 12`, senão o braço de 24 nunca é alcançado.',
        'O teto muda conforme a categoria, então calcule-o com um ternário antes de aplicar o limite.',
      ],
      tests: [
        {
          name: 'Senior fiel',
          stdin: '65\n30\n',
          expectedStdout:
            'Categoria: senior\nDesconto idade: 40\nDesconto fidelidade: 15\nTotal: 55',
        },
        {
          name: 'Infantil com um ano',
          stdin: '10\n12\n',
          expectedStdout:
            'Categoria: infantil\nDesconto idade: 30\nDesconto fidelidade: 10\nTotal: 40',
        },
        {
          name: 'Adulto sem fidelidade',
          stdin: '35\n3\n',
          expectedStdout:
            'Categoria: adulto\nDesconto idade: 0\nDesconto fidelidade: 0\nTotal: 0',
        },
        {
          name: 'Juvenil no limite',
          stdin: '17\n24\n',
          expectedStdout:
            'Categoria: juvenil\nDesconto idade: 20\nDesconto fidelidade: 15\nTotal: 35',
        },
      ],
    },
  },
  {
    id: 's01c06l10',
    title: 'Checkpoint: fluxo condicional',
    objective: 'Construir uma decisão de negócio completa combinando guardas, faixas e switch.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint fecha o capítulo de decisões. O que você aprendeu aqui é o que separa um programa que apenas calcula de um programa que **decide**.',
      },
      {
        kind: 'table',
        headers: ['Problema', 'Estrutura'],
        rows: [
          ['uma coisa acontece ou não', '`if`'],
          ['dois caminhos exclusivos', '`if / else`'],
          ['escolher um valor entre dois', 'ternário `? :`'],
          ['faixas numéricas', '`switch` com padrões ou `if / else if`'],
          ['valores exatos', '`switch`'],
          ['validar antes de agir', 'cláusulas de guarda'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A revisão final de qualquer lógica condicional é sempre a mesma: os limites estão certos? Todos os casos estão cobertos? Existe algum ramo inalcançável? Essas três perguntas pegam a grande maioria dos defeitos.',
      },
    ],
    quiz: [
      {
        id: 's01c06l10q1',
        type: 'single',
        prompt: 'Qual é a saída para `n = 0`?',
        code: `string r = n switch
{
    < 0 => "negativo",
    0 => "zero",
    <= 10 => "pequeno",
    _ => "grande",
};
Console.WriteLine(r);`,
        options: [
          { id: 'a', code: 'zero', correct: true },
          { id: 'b', code: 'pequeno' },
          { id: 'c', code: 'negativo' },
          { id: 'd', code: 'grande' },
        ],
        explanation:
          'O padrão de valor exato `0` vem antes de `<= 10` e casa primeiro. Se estivesse depois, nunca seria alcançado e o compilador avisaria.',
      },
      {
        id: 's01c06l10q2',
        type: 'multiple',
        prompt: 'Marque as afirmações verdadeiras.',
        options: [
          { id: 'a', text: 'Numa cadeia `if / else if`, só um ramo executa.', correct: true },
          { id: 'b', text: 'O switch de expressão precisa do `_` para ser exaustivo na prática.', correct: true },
          { id: 'c', text: 'Esquecer o `break` num `case` com código é erro de compilação em C#.', correct: true },
          { id: 'd', text: 'Um `if` sem chaves governa todas as linhas indentadas abaixo dele.' },
          { id: 'e', text: 'Dentro de padrões, `&&` funciona igual a `and`.' },
        ],
        explanation:
          'Sem chaves o `if` governa apenas a próxima instrução, e padrões usam `and` / `or` / `not`, não os operadores lógicos.',
      },
      {
        id: 's01c06l10q3',
        type: 'single',
        prompt:
          'Você precisa validar quatro pré-condições antes de processar um pedido, cada uma com sua mensagem de erro. Qual é a melhor forma?',
        options: [
          {
            id: 'a',
            text: 'Uma cadeia plana de guardas `if / else if`, testando cada falha em ordem de prioridade.',
            correct: true,
          },
          { id: 'b', text: 'Quatro `if` aninhados, um dentro do outro.' },
          { id: 'c', text: 'Um `switch` sobre a concatenação das quatro condições.' },
          { id: 'd', text: 'Uma única condição com quatro `&&` e uma mensagem genérica.' },
        ],
        explanation:
          'A cadeia plana mantém a indentação baixa e cada mensagem ao lado de sua condição. A opção D perde a informação de qual regra falhou.',
      },
    ],
    challenge: {
      brief:
        'Monte o motor de decisão de um empréstimo. Leia a renda mensal, o valor solicitado, o score de crédito e se o cliente já tem dívida ativa (`sim`/`nao`). Recuse por guardas em ordem, e quando aprovar, calcule a taxa pela faixa de score.',
      requirements: [
        'Recuse com `Recusado: divida ativa` se houver dívida',
        'Recuse com `Recusado: score baixo` se o score for menor que 500',
        'Recuse com `Recusado: valor acima do limite` se o solicitado passar de 10 vezes a renda',
        'Aprovado imprime 3 linhas: `Aprovado`, `Taxa: 1.90`, `Parcela estimada: 1520.00`',
        'Taxa por score: menos de 650 é 2.90, de 650 a 799 é 1.90, 800 ou mais é 1.20',
        'A parcela estimada é o valor solicitado dividido por 24, com 2 casas',
        'Verifique as recusas na ordem indicada e use switch de padrões para a taxa',
      ],
      starterCode: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        decimal renda = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        decimal solicitado = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        int score = int.Parse(Console.ReadLine());
        bool dividaAtiva = Console.ReadLine() == "sim";

        // Guardas em ordem, depois a taxa por faixa
    }
}
`,
      solution: `using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        decimal renda = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        decimal solicitado = decimal.Parse(Console.ReadLine(), CultureInfo.InvariantCulture);
        int score = int.Parse(Console.ReadLine());
        bool dividaAtiva = Console.ReadLine() == "sim";

        if (dividaAtiva)
        {
            Console.WriteLine("Recusado: divida ativa");
        }
        else if (score < 500)
        {
            Console.WriteLine("Recusado: score baixo");
        }
        else if (solicitado > renda * 10)
        {
            Console.WriteLine("Recusado: valor acima do limite");
        }
        else
        {
            decimal taxa = score switch
            {
                < 650 => 2.90m,
                < 800 => 1.90m,
                _ => 1.20m,
            };

            decimal parcela = solicitado / 24;

            Console.WriteLine("Aprovado");
            Console.WriteLine($"Taxa: {taxa:F2}");
            Console.WriteLine($"Parcela estimada: {parcela:F2}");
        }
    }
}
`,
      hints: [
        'Cada recusa é uma guarda que imprime e encerra aquele caminho; o `else` final concentra a aprovação.',
        'No switch da taxa, `< 650` e `< 800` em ordem crescente já delimitam as três faixas.',
        'Use `{parcela:F2}` para formatar a divisão, sem arredondar o valor antes.',
      ],
      tests: [
        {
          name: 'Aprovado com score médio',
          stdin: '8000.00\n36480.00\n700\nnao\n',
          expectedStdout: 'Aprovado\nTaxa: 1.90\nParcela estimada: 1520.00',
        },
        {
          name: 'Dívida tem prioridade sobre score',
          stdin: '8000.00\n1000.00\n300\nsim\n',
          expectedStdout: 'Recusado: divida ativa',
        },
        {
          name: 'Score baixo',
          stdin: '8000.00\n1000.00\n480\nnao\n',
          expectedStdout: 'Recusado: score baixo',
        },
        {
          name: 'Valor acima do limite',
          stdin: '3000.00\n40000.00\n820\nnao\n',
          expectedStdout: 'Recusado: valor acima do limite',
        },
        {
          name: 'Melhor faixa de score',
          stdin: '10000.00\n24000.00\n850\nnao\n',
          expectedStdout: 'Aprovado\nTaxa: 1.20\nParcela estimada: 1000.00',
        },
      ],
    },
  },
]
