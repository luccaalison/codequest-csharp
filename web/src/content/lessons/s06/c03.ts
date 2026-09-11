import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's06c03l01',
    title: 'Lendo um stack trace',
    objective: 'Extrair de um rastro de pilha o caminho que levou ao erro e o ponto em que ele nasceu.',
    concept: [
      {
        kind: 'text',
        body:
          'O **stack trace** é a lista dos métodos que estavam em execução no momento do erro. Ele responde à pergunta "como o programa chegou até aqui?".',
      },
      {
        kind: 'output',
        code: `System.InvalidOperationException: erro no nivel 3
   at Program.Nivel3()      <- onde estourou
   at Program.Nivel2()      <- quem chamou Nivel3
   at Program.Nivel1()      <- quem chamou Nivel2
   at Program.Main()        <- o comeco de tudo`,
        caption: 'Lê-se de cima para baixo: o topo é a causa, o fim é a origem da chamada.',
      },
      {
        kind: 'table',
        headers: ['Linha', 'O que responde'],
        rows: [
          ['primeira (tipo e mensagem)', 'o que aconteceu'],
          ['primeiro `at`', '**onde** aconteceu'],
          ['`at` seguintes', 'como se chegou lá'],
          ['último `at`', 'a origem da chamada'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A primeira linha `at` é quase sempre onde você deve olhar primeiro. Mas se ela apontar para código da biblioteca padrão, desça até encontrar o **primeiro método seu** — é ali que o erro foi provocado.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um rastro só é confiável se ninguém o destruiu no caminho. Um `throw e;` em vez de `throw;` — o erro da lição 8 do capítulo 1 — corta tudo que estava acima e faz a causa real desaparecer.',
      },
      {
        kind: 'text',
        body:
          'Em compilações com informação de depuração, cada linha ganha também o arquivo e o número da linha. Sem essa informação, sobram os nomes dos métodos — que já bastam para localizar o problema.',
      },
    ],
    quiz: [
      {
        id: 's06c03l01q1',
        type: 'single',
        prompt: 'O que a primeira linha `at` de um stack trace indica?',
        options: [
          { id: 'a', text: 'O método onde a exceção foi lançada.', correct: true },
          { id: 'b', code: 'Main' },
          { id: 'c', text: 'O método que capturou a exceção.' },
          { id: 'd', text: 'O método mais lento.' },
        ],
        explanation:
          'O rastro é impresso do mais profundo para o mais raso. O topo é o ponto exato da falha.',
      },
      {
        id: 's06c03l01q2',
        type: 'single',
        prompt: 'O primeiro `at` aponta para código da biblioteca padrão. O que fazer?',
        options: [
          { id: 'a', text: 'Descer até o primeiro método do seu próprio código.', correct: true },
          { id: 'b', text: 'Ignorar o rastro inteiro.' },
          { id: 'c', text: 'Reportar um bug na biblioteca.' },
          { id: 'd', text: 'Olhar apenas a última linha.' },
        ],
        explanation:
          'A biblioteca estourou porque recebeu algo inválido do seu código. O seu método mais profundo é quem passou esse algo.',
      },
      {
        id: 's06c03l01q3',
        type: 'single',
        prompt: 'O que pode tornar um stack trace enganoso?',
        options: [
          { id: 'a', text: 'Um `throw e;` que reiniciou o rastro em um ponto intermediário.', correct: true },
          { id: 'b', text: 'Um `finally` no caminho.' },
          { id: 'c', text: 'Um `using` no caminho.' },
          { id: 'd', text: 'Muitos níveis de chamada.' },
        ],
        explanation:
          'O rastro passa a começar no relançamento, e tudo que aconteceu antes é perdido — inclusive a causa real.',
      },
    ],
    challenge: {
      brief:
        'Provoque um erro no fundo de uma cadeia de chamadas e extraia do rastro as informações que ele oferece.',
      requirements: [
        '`Calcular(int n)` lança `DivideByZeroException` quando `n` é zero, dividindo `10` por `n`',
        '`Preparar(int n)` chama `Calcular`; `Iniciar(int n)` chama `Preparar`',
        '`Diagnosticar(int n)` captura a exceção e imprime o relatório',
        'O relatório traz `tipo: X`, `mensagem: Y`, `origem: Z` com o nome do método do topo do rastro, e `profundidade: N` com a quantidade de linhas `at`',
        'Extraia o nome do método do topo cortando o prefixo `   at ` e o sufixo `()`',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva Calcular, Preparar, Iniciar e Diagnosticar aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Diagnosticar(n);
        Console.WriteLine("---");
        Diagnosticar(2);
    }
}
`,
      solution: `using System;

class Program
{
    static int Calcular(int n)
    {
        return 10 / n;
    }

    static int Preparar(int n)
    {
        return Calcular(n);
    }

    static int Iniciar(int n)
    {
        return Preparar(n);
    }

    static void Diagnosticar(int n)
    {
        try
        {
            int resultado = Iniciar(n);
            Console.WriteLine($"sem erro: {resultado}");
        }
        catch (Exception e)
        {
            string rastro = e.StackTrace ?? "";
            string[] linhas = rastro.Split('\\n');

            int profundidade = 0;

            foreach (string linha in linhas)
            {
                if (linha.Trim().StartsWith("at "))
                {
                    profundidade++;
                }
            }

            string topo = linhas[0].Trim();
            topo = topo.Substring("at ".Length);
            topo = topo.Substring(0, topo.IndexOf('('));

            Console.WriteLine($"tipo: {e.GetType().Name}");
            Console.WriteLine($"mensagem: {e.Message}");
            Console.WriteLine($"origem: {topo}");
            Console.WriteLine($"profundidade: {profundidade}");
        }
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Diagnosticar(n);
        Console.WriteLine("---");
        Diagnosticar(2);
    }
}
`,
      hints: [
        'O rastro vem como uma única string: separe por quebra de linha e use `Trim()` em cada pedaço.',
        'A primeira linha já é o topo — ela começa com `at ` depois do `Trim()`.',
        'Para contar a profundidade, conte quantas linhas começam com `at ` depois de aparadas.',
      ],
      tests: [
        {
          name: 'Divisao por zero',
          stdin: '0\n',
          expectedStdout:
            'tipo: DivideByZeroException\nmensagem: Attempted to divide by zero.\n' +
            'origem: Program.Calcular\nprofundidade: 4\n---\nsem erro: 5',
        },
        {
          name: 'Divisor valido',
          stdin: '5\n',
          expectedStdout: 'sem erro: 2\n---\nsem erro: 5',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c03l02',
    title: 'Interpretando a mensagem de erro',
    objective: 'Tirar da mensagem de uma exceção a informação que aponta para a causa.',
    concept: [
      {
        kind: 'text',
        body:
          'A mensagem costuma ser lida às pressas e descartada. Mas ela quase sempre contém o dado exato que resolve o problema — inclusive o valor que causou a falha.',
      },
      {
        kind: 'table',
        headers: ['Mensagem', 'O que ela revela'],
        rows: [
          ["The input string 'abc' was not in a correct format.", '**qual** texto falhou'],
          ["Value cannot be null. (Parameter 'nome')", '**qual** parâmetro estava nulo'],
          ['Index was outside the bounds of the array.', 'houve acesso fora do limite'],
          ['Attempted to divide by zero.', 'o divisor era zero'],
          ['Nullable object must have a value.', 'leu `.Value` de um nullable vazio'],
        ],
      },
      {
        kind: 'text',
        body:
          'As duas primeiras são as mais úteis: elas trazem **o valor concreto**. Saber que o texto era `abc` ou que o parâmetro era `nome` costuma encurtar a investigação de horas para minutos.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Ao lançar as suas exceções, siga esse padrão: inclua o valor recebido e o que era esperado. "idade invalida" desperdiça a oportunidade que "idade -5 deve estar entre 0 e 120" aproveita.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Cuidado com dados sensíveis. Uma mensagem que inclui senha, token ou dado pessoal acaba em arquivos de log e em telas de erro. Inclua o **formato** esperado, não o conteúdo recebido, quando o dado for sigiloso.',
      },
      {
        kind: 'text',
        body:
          'Quando a mensagem não basta, a `InnerException` costuma ter a resposta. Uma falha de camada alta frequentemente embrulha a causa técnica real.',
      },
    ],
    quiz: [
      {
        id: 's06c03l02q1',
        type: 'single',
        prompt: 'O que torna uma mensagem de erro especialmente útil?',
        options: [
          { id: 'a', text: 'Conter o valor concreto que causou a falha.', correct: true },
          { id: 'b', text: 'Ser curta.' },
          { id: 'c', text: 'Nomear a classe onde ocorreu.' },
          { id: 'd', text: 'Incluir a data e a hora.' },
        ],
        explanation:
          'Saber que o texto problemático era exatamente `abc` elimina toda a etapa de descobrir qual entrada quebrou.',
      },
      {
        id: 's06c03l02q2',
        type: 'single',
        prompt: 'Quando **não** incluir o valor recebido na mensagem?',
        options: [
          { id: 'a', text: 'Quando o dado é sensível, como senha ou token.', correct: true },
          { id: 'b', text: 'Quando o valor é longo.' },
          { id: 'c', text: 'Quando o valor é numérico.' },
          { id: 'd', text: 'Sempre inclua.' },
        ],
        explanation:
          'Mensagens vão parar em logs e telas. Nesses casos, descreva o formato esperado em vez do conteúdo recebido.',
      },
      {
        id: 's06c03l02q3',
        type: 'single',
        prompt: 'A mensagem não explica o problema. Onde olhar em seguida?',
        options: [
          { id: 'a', text: 'Na `InnerException`, que costuma ter a causa técnica.', correct: true },
          { id: 'b', text: 'No tipo da exceção apenas.' },
          { id: 'c', text: 'Na última linha do stack trace.' },
          { id: 'd', text: 'Não há mais informação disponível.' },
        ],
        explanation:
          'Uma exceção de camada alta costuma embrulhar a original. A externa diz o que falhou; a interna, por quê.',
      },
    ],
    challenge: {
      brief:
        'Escreva um diagnosticador que extrai de cada exceção a informação mais útil que ela oferece, incluindo a causa interna quando houver.',
      requirements: [
        '`Diagnosticar(Action acao)` executa a ação e devolve a descrição do que aconteceu',
        'Sem erro devolve `sem erro`',
        'Com erro devolve `Tipo: mensagem`',
        'Havendo `InnerException`, acrescenta ` <- TipoInterno: mensagem interna`',
        '`Provocar(int caso)` produz cada situação: `1` conversão inválida, `2` argumento nulo, `3` nullable vazio, `4` exceção embrulhada',
        'O caso `4` embrulha uma `FormatException` com a mensagem `causa raiz` dentro de uma `InvalidOperationException` com a mensagem `falha na camada alta`',
        'Qualquer outro caso não provoca erro',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva Provocar e Diagnosticar aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 1; i <= n; i++)
        {
            int caso = i;
            Console.WriteLine($"{caso}: {Diagnosticar(() => Provocar(caso))}");
        }

        Console.WriteLine($"9: {Diagnosticar(() => Provocar(9))}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Provocar(int caso)
    {
        if (caso == 1)
        {
            int.Parse("abc");
        }
        else if (caso == 2)
        {
            string nome = null;
            ArgumentNullException.ThrowIfNull(nome);
        }
        else if (caso == 3)
        {
            int? vazio = null;
            int valor = vazio.Value;
        }
        else if (caso == 4)
        {
            try
            {
                throw new FormatException("causa raiz");
            }
            catch (Exception interna)
            {
                throw new InvalidOperationException("falha na camada alta", interna);
            }
        }
    }

    static string Diagnosticar(Action acao)
    {
        try
        {
            acao();
            return "sem erro";
        }
        catch (Exception e)
        {
            string descricao = $"{e.GetType().Name}: {e.Message}";

            if (e.InnerException != null)
            {
                descricao += $" <- {e.InnerException.GetType().Name}: {e.InnerException.Message}";
            }

            return descricao;
        }
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        for (int i = 1; i <= n; i++)
        {
            int caso = i;
            Console.WriteLine($"{caso}: {Diagnosticar(() => Provocar(caso))}");
        }

        Console.WriteLine($"9: {Diagnosticar(() => Provocar(9))}");
    }
}
`,
      hints: [
        'Monte a descrição base primeiro e só acrescente a parte da causa interna se ela existir.',
        'No caso 4, o embrulho acontece dentro do próprio `Provocar`: capture a interna e lance a externa passando-a.',
      ],
      tests: [
        {
          name: 'Os quatro casos',
          stdin: '4\n',
          expectedStdout:
            "1: FormatException: The input string 'abc' was not in a correct format.\n" +
            "2: ArgumentNullException: Value cannot be null. (Parameter 'nome')\n" +
            '3: InvalidOperationException: Nullable object must have a value.\n' +
            '4: InvalidOperationException: falha na camada alta <- FormatException: causa raiz\n' +
            '9: sem erro',
        },
        {
          name: 'Apenas os dois primeiros',
          stdin: '2\n',
          expectedStdout:
            "1: FormatException: The input string 'abc' was not in a correct format.\n" +
            "2: ArgumentNullException: Value cannot be null. (Parameter 'nome')\n" +
            '9: sem erro',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c03l03',
    title: 'Console como ferramenta de diagnóstico',
    objective: 'Usar impressões estratégicas para revelar o estado do programa no ponto certo.',
    concept: [
      {
        kind: 'text',
        body:
          'Sem um depurador à mão, imprimir continua sendo a técnica mais rápida. O que separa uma investigação eficiente de uma perda de tempo é **onde** e **o que** imprimir.',
      },
      {
        kind: 'compare',
        good: `Console.WriteLine($"[soma] i={i} valor={v} acc={acc}");`,
        bad: `Console.WriteLine("aqui");
Console.WriteLine(v);
Console.WriteLine("passou");`,
        goodLabel: 'Rótulo, contexto e valores',
        badLabel: 'Impressões sem identidade',
      },
      {
        kind: 'table',
        headers: ['Imprima', 'Para descobrir'],
        rows: [
          ['valores de entrada do método', 'se o problema veio de fora'],
          ['estado a cada iteração', 'em que passo a coisa desanda'],
          ['antes e depois de uma alteração', 'se ela fez o que devia'],
          ['a condição de um `if`', 'por que o ramo errado foi tomado'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Imprima o **valor**, não a confirmação de que o código passou ali. "Chegou aqui" só prova que a linha executou; `i=3 total=0` mostra o problema.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Impressões de diagnóstico esquecidas no código são um problema real: elas poluem a saída, vazam informação e confundem quem for ler depois. Remova-as ao terminar, ou use um mecanismo que possa ser desligado.',
      },
      {
        kind: 'text',
        body:
          'O passo seguinte é registrar em vez de imprimir: um método `Log` próprio, que pode ser desligado com uma variável, dá o mesmo resultado sem sujar a saída definitiva.',
      },
    ],
    quiz: [
      {
        id: 's06c03l03q1',
        type: 'single',
        prompt: 'O que uma impressão de diagnóstico deve conter?',
        options: [
          { id: 'a', text: 'Um rótulo e os valores relevantes naquele ponto.', correct: true },
          { id: 'b', text: 'Apenas a confirmação de que a linha executou.' },
          { id: 'c', text: 'O stack trace completo.' },
          { id: 'd', text: 'A hora exata.' },
        ],
        explanation:
          'Sem rótulo, várias impressões viram uma lista de números sem dono. Sem valores, elas não dizem nada sobre o estado.',
      },
      {
        id: 's06c03l03q2',
        type: 'single',
        prompt: 'Onde imprimir para descobrir em que passo um laço desanda?',
        options: [
          { id: 'a', text: 'A cada iteração, com o índice e o acumulador.', correct: true },
          { id: 'b', text: 'Apenas antes do laço.' },
          { id: 'c', text: 'Apenas depois do laço.' },
          { id: 'd', text: 'Dentro do `catch`.' },
        ],
        explanation:
          'O valor final só diz que está errado. A sequência mostra exatamente em qual passo ele passou a divergir.',
      },
      {
        id: 's06c03l03q3',
        type: 'single',
        prompt: 'Qual o risco de deixar impressões de diagnóstico no código?',
        options: [
          { id: 'a', text: 'Poluem a saída, podem vazar informação e confundem quem lê depois.', correct: true },
          { id: 'b', text: 'Deixam o programa lento demais para rodar.' },
          { id: 'c', text: 'Impedem a compilação.' },
          { id: 'd', text: 'Não há risco.' },
        ],
        explanation:
          'Um mecanismo que pode ser desligado resolve os três problemas de uma vez.',
      },
    ],
    challenge: {
      brief:
        'Implemente um mecanismo de registro que pode ser ligado e desligado, e use-o para revelar o estado de um cálculo que está errado.',
      requirements: [
        '`Log(string rotulo, string dados)` imprime `[rotulo] dados` apenas quando `registrando` é `true`',
        '`registrando` é um campo estático que o `Main` controla',
        '`Media(List<int> valores)` calcula a média inteira, registrando `entrada` com a quantidade, cada passo como `passo` com `i`, `valor` e `soma`, e `saida` com a soma e a média',
        'Uma lista vazia devolve `0` e registra `entrada` com `n=0` e `saida` com `soma=0 media=0`',
        'O formato de cada registro é exatamente o mostrado nos testes',
        'Com o registro desligado, a saída tem apenas o resultado',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static bool registrando = false;

    // Escreva Log e Media aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> valores = new List<int>();

        for (int i = 0; i < n; i++)
        {
            valores.Add(int.Parse(Console.ReadLine()));
        }

        Console.WriteLine("--- sem registro ---");
        Console.WriteLine($"media: {Media(valores)}");

        Console.WriteLine("--- com registro ---");
        registrando = true;
        Console.WriteLine($"media: {Media(valores)}");

        Console.WriteLine("--- lista vazia ---");
        Console.WriteLine($"media: {Media(new List<int>())}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static bool registrando = false;

    static void Log(string rotulo, string dados)
    {
        if (!registrando)
        {
            return;
        }

        Console.WriteLine($"[{rotulo}] {dados}");
    }

    static int Media(List<int> valores)
    {
        Log("entrada", $"n={valores.Count}");

        int soma = 0;

        for (int i = 0; i < valores.Count; i++)
        {
            soma += valores[i];
            Log("passo", $"i={i} valor={valores[i]} soma={soma}");
        }

        int media = valores.Count == 0 ? 0 : soma / valores.Count;

        Log("saida", $"soma={soma} media={media}");

        return media;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> valores = new List<int>();

        for (int i = 0; i < n; i++)
        {
            valores.Add(int.Parse(Console.ReadLine()));
        }

        Console.WriteLine("--- sem registro ---");
        Console.WriteLine($"media: {Media(valores)}");

        Console.WriteLine("--- com registro ---");
        registrando = true;
        Console.WriteLine($"media: {Media(valores)}");

        Console.WriteLine("--- lista vazia ---");
        Console.WriteLine($"media: {Media(new List<int>())}");
    }
}
`,
      hints: [
        'O `Log` sai cedo com uma guard clause quando o registro está desligado.',
        'A verificação de lista vazia evita a divisão por zero — e o registro de saída acontece nos dois casos.',
      ],
      tests: [
        {
          name: 'Tres valores',
          stdin: '3\n10\n20\n30\n',
          expectedStdout:
            '--- sem registro ---\nmedia: 20\n' +
            '--- com registro ---\n' +
            '[entrada] n=3\n[passo] i=0 valor=10 soma=10\n[passo] i=1 valor=20 soma=30\n' +
            '[passo] i=2 valor=30 soma=60\n[saida] soma=60 media=20\nmedia: 20\n' +
            '--- lista vazia ---\n[entrada] n=0\n[saida] soma=0 media=0\nmedia: 0',
        },
        {
          name: 'Valor unico',
          stdin: '1\n7\n',
          expectedStdout:
            '--- sem registro ---\nmedia: 7\n' +
            '--- com registro ---\n' +
            '[entrada] n=1\n[passo] i=0 valor=7 soma=7\n[saida] soma=7 media=7\nmedia: 7\n' +
            '--- lista vazia ---\n[entrada] n=0\n[saida] soma=0 media=0\nmedia: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c03l04',
    title: 'Debug.Assert',
    objective: 'Declarar no código as suposições que devem ser sempre verdadeiras, e detectar quando deixam de ser.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma **asserção** documenta uma suposição e a verifica. `Debug.Assert(condicao)` não faz nada quando a condição é verdadeira, e interrompe o programa quando ela é falsa.',
      },
      {
        kind: 'code',
        code: `using System.Diagnostics;

static int Media(int soma, int quantidade)
{
    Debug.Assert(quantidade > 0, "quantidade deve ser positiva");

    return soma / quantidade;
}`,
        caption: 'A asserção diz: "se isso for falso, o bug está em quem me chamou".',
      },
      {
        kind: 'output',
        code: `// asserção verdadeira: nada acontece, o programa segue

// asserção falsa:
Process terminated.
Assertion failed.
ESTA assercao falha
   at Program.Main()`,
        caption: 'A falha encerra o processo na hora — é uma parada dura, não uma exceção capturável.',
      },
      {
        kind: 'table',
        headers: ['', 'Asserção', 'Validação de argumento'],
        rows: [
          ['para quem', 'o programador', 'quem chama a API'],
          ['detecta', 'bug interno', 'uso incorreto'],
          ['em produção', '**removida**', 'permanece'],
          ['recuperável', 'não', 'sim, com `catch`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Asserções são compiladas fora em compilações de produção. Nunca coloque **lógica** dentro de uma: `Debug.Assert(Salvar())` faz o `Salvar` desaparecer quando o programa for publicado.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Use asserção para o que **nunca deveria acontecer** — invariantes internas, pós-condições, estados impossíveis. Para o que pode acontecer com entrada real, use validação e exceção.',
      },
    ],
    quiz: [
      {
        id: 's06c03l04q1',
        type: 'single',
        prompt: 'O que acontece quando uma `Debug.Assert` tem condição verdadeira?',
        options: [
          { id: 'a', text: 'Nada: o programa segue normalmente.', correct: true },
          { id: 'b', text: 'Imprime uma confirmação.' },
          { id: 'c', text: 'Registra em um arquivo.' },
          { id: 'd', text: 'Devolve `true`.' },
        ],
        explanation:
          'Uma asserção só se manifesta quando é violada. No caminho normal ela é invisível.',
      },
      {
        id: 's06c03l04q2',
        type: 'single',
        prompt: 'Por que nunca colocar lógica dentro de uma asserção?',
        options: [
          { id: 'a', text: 'Porque asserções são removidas em compilações de produção, e a lógica sumiria junto.', correct: true },
          { id: 'b', text: 'Porque a condição não pode chamar métodos.' },
          { id: 'c', text: 'Porque deixa o programa lento.' },
          { id: 'd', text: 'Porque não compila.' },
        ],
        explanation:
          'É um bug que só aparece em produção, onde é mais difícil de investigar — a pior categoria possível.',
      },
      {
        id: 's06c03l04q3',
        type: 'single',
        prompt: 'Qual a diferença entre asserção e validação de argumento?',
        options: [
          { id: 'a', text: 'A asserção detecta bug interno e some em produção; a validação protege a API e permanece.', correct: true },
          { id: 'b', text: 'A asserção é mais rápida.' },
          { id: 'c', text: 'A validação não pode ter mensagem.' },
          { id: 'd', text: 'São equivalentes.' },
        ],
        explanation:
          'Entrada de usuário sempre precisa de validação real. Asserção é conversa entre você e o seu próprio código.',
      },
    ],
    challenge: {
      brief:
        'Use asserções para declarar as invariantes de uma estrutura e validações para proteger a entrada externa, mantendo as duas coisas separadas.',
      requirements: [
        '`Pilha` guarda inteiros em uma lista privada e expõe `Tamanho` de leitura',
        '`Empilhar(int valor)` valida com exceção que a pilha não passe de `10` itens, lançando `InvalidOperationException` com a mensagem `pilha cheia`',
        '`Desempilhar()` valida com exceção que a pilha não esteja vazia, lançando `InvalidOperationException` com a mensagem `pilha vazia`',
        'Os dois métodos usam `Debug.Assert` para verificar a **invariante interna**: o tamanho fica sempre entre `0` e `10`',
        '`Desempilhar` usa `Debug.Assert` como pós-condição, verificando que o tamanho diminuiu em exatamente um',
        'As asserções nunca devem falhar no fluxo do teste',
        'Nenhuma lógica fica dentro de uma asserção',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main` nem o método `Tentar`',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Diagnostics;

// Declare a classe Pilha aqui

class Program
{
    static void Tentar(string rotulo, Action acao)
    {
        try
        {
            acao();
            Console.WriteLine($"{rotulo}: ok");
        }
        catch (Exception e)
        {
            Console.WriteLine($"{rotulo}: {e.GetType().Name} - {e.Message}");
        }
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Pilha p = new Pilha();

        Tentar("desempilhar vazia", () => p.Desempilhar());

        for (int i = 0; i < n; i++)
        {
            p.Empilhar(i);
        }

        Console.WriteLine($"tamanho: {p.Tamanho}");
        Console.WriteLine($"topo removido: {p.Desempilhar()}");
        Console.WriteLine($"tamanho: {p.Tamanho}");

        while (p.Tamanho < 10)
        {
            p.Empilhar(99);
        }

        Console.WriteLine($"cheia: {p.Tamanho}");
        Tentar("empilhar em cheia", () => p.Empilhar(1));
        Console.WriteLine($"tamanho final: {p.Tamanho}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Diagnostics;

class Pilha
{
    private const int Capacidade = 10;

    private List<int> itens = new List<int>();

    public int Tamanho => itens.Count;

    public void Empilhar(int valor)
    {
        if (itens.Count >= Capacidade)
        {
            throw new InvalidOperationException("pilha cheia");
        }

        itens.Add(valor);

        Debug.Assert(itens.Count >= 0 && itens.Count <= Capacidade, "tamanho fora da faixa");
    }

    public int Desempilhar()
    {
        if (itens.Count == 0)
        {
            throw new InvalidOperationException("pilha vazia");
        }

        int antes = itens.Count;
        int valor = itens[itens.Count - 1];
        itens.RemoveAt(itens.Count - 1);

        Debug.Assert(itens.Count == antes - 1, "tamanho deveria ter diminuido em um");
        Debug.Assert(itens.Count >= 0 && itens.Count <= Capacidade, "tamanho fora da faixa");

        return valor;
    }
}

class Program
{
    static void Tentar(string rotulo, Action acao)
    {
        try
        {
            acao();
            Console.WriteLine($"{rotulo}: ok");
        }
        catch (Exception e)
        {
            Console.WriteLine($"{rotulo}: {e.GetType().Name} - {e.Message}");
        }
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Pilha p = new Pilha();

        Tentar("desempilhar vazia", () => p.Desempilhar());

        for (int i = 0; i < n; i++)
        {
            p.Empilhar(i);
        }

        Console.WriteLine($"tamanho: {p.Tamanho}");
        Console.WriteLine($"topo removido: {p.Desempilhar()}");
        Console.WriteLine($"tamanho: {p.Tamanho}");

        while (p.Tamanho < 10)
        {
            p.Empilhar(99);
        }

        Console.WriteLine($"cheia: {p.Tamanho}");
        Tentar("empilhar em cheia", () => p.Empilhar(1));
        Console.WriteLine($"tamanho final: {p.Tamanho}");
    }
}
`,
      hints: [
        'Guarde o tamanho antes de remover para poder verificar a pós-condição depois.',
        'A validação vem primeiro e usa exceção; a asserção vem depois da alteração e verifica o resultado dela.',
      ],
      tests: [
        {
          name: 'Tres itens',
          stdin: '3\n',
          expectedStdout:
            'desempilhar vazia: InvalidOperationException - pilha vazia\n' +
            'tamanho: 3\ntopo removido: 2\ntamanho: 2\ncheia: 10\n' +
            'empilhar em cheia: InvalidOperationException - pilha cheia\ntamanho final: 10',
        },
        {
          name: 'Um item',
          stdin: '1\n',
          expectedStdout:
            'desempilhar vazia: InvalidOperationException - pilha vazia\n' +
            'tamanho: 1\ntopo removido: 0\ntamanho: 0\ncheia: 10\n' +
            'empilhar em cheia: InvalidOperationException - pilha cheia\ntamanho final: 10',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c03l05',
    title: 'Formulando hipóteses',
    objective: 'Investigar um bug com um método, em vez de mudar coisas ao acaso até funcionar.',
    concept: [
      {
        kind: 'text',
        body:
          'Depurar bem é aplicar o método científico. Você tem um sintoma, formula uma explicação possível, e desenha um teste que **distingue** entre ela ser verdadeira ou falsa.',
      },
      {
        kind: 'table',
        headers: ['Passo', 'Pergunta'],
        rows: [
          ['1. observar', 'qual é exatamente o sintoma?'],
          ['2. reproduzir', 'consigo fazer acontecer de novo?'],
          ['3. hipótese', 'o que explicaria isso?'],
          ['4. previsão', 'se for verdade, o que mais eu veria?'],
          ['5. testar', 'a previsão se confirma?'],
        ],
      },
      {
        kind: 'text',
        body:
          'O passo 4 é o que a maioria pula, e é o mais valioso. Uma hipótese que não gera nenhuma previsão testável não ajuda a decidir nada — ela só parece uma explicação.',
      },
      {
        kind: 'compare',
        good: `// Hipotese: a soma ignora o
// ultimo elemento.
// Previsao: com [1,2,3] o
// resultado sera 3, nao 6.
// Teste: rodar com [1,2,3].`,
        bad: `// "Deve ser algo no laco."
// Muda o <= para <
// Nao funcionou.
// Muda de volta.
// Tenta outra coisa.`,
        goodLabel: 'Hipótese com previsão',
        badLabel: 'Tentativa e erro',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Reproduzir de forma confiável vale mais que qualquer palpite. Um bug que você consegue provocar quando quiser está praticamente resolvido; um intermitente pode consumir dias.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Mude **uma coisa por vez**. Alterar três trechos e ver o problema sumir não diz qual deles era a causa — e os outros dois ficam no código como alterações sem motivo.',
      },
    ],
    quiz: [
      {
        id: 's06c03l05q1',
        type: 'single',
        prompt: 'Qual passo da investigação é mais frequentemente pulado?',
        options: [
          { id: 'a', text: 'Fazer uma previsão testável a partir da hipótese.', correct: true },
          { id: 'b', text: 'Observar o sintoma.' },
          { id: 'c', text: 'Corrigir o código.' },
          { id: 'd', text: 'Rodar o programa.' },
        ],
        explanation:
          'Sem previsão, a hipótese não pode ser refutada — e uma explicação irrefutável não guia nenhuma ação.',
      },
      {
        id: 's06c03l05q2',
        type: 'single',
        prompt: 'Por que reproduzir o bug de forma confiável é tão valioso?',
        options: [
          { id: 'a', text: 'Porque permite testar hipóteses sob demanda e confirmar a correção.', correct: true },
          { id: 'b', text: 'Porque acelera a compilação.' },
          { id: 'c', text: 'Porque elimina a necessidade de hipóteses.' },
          { id: 'd', text: 'Porque documenta o erro.' },
        ],
        explanation:
          'Sem reprodução, não há como saber se a alteração resolveu ou se o problema apenas não apareceu desta vez.',
      },
      {
        id: 's06c03l05q3',
        type: 'single',
        prompt: 'Por que alterar apenas uma coisa por vez?',
        options: [
          { id: 'a', text: 'Porque com várias alterações não se sabe qual resolveu.', correct: true },
          { id: 'b', text: 'Porque o compilador não aceita várias mudanças.' },
          { id: 'c', text: 'Para o código ficar menor.' },
          { id: 'd', text: 'Para facilitar o controle de versão.' },
        ],
        explanation:
          'E as alterações que não eram necessárias permanecem no código sem justificativa, virando confusão para o próximo leitor.',
      },
    ],
    challenge: {
      brief:
        'Investigue um cálculo que produz o resultado errado: instrumente, formule a hipótese a partir dos dados e corrija a causa.',
      requirements: [
        '`SomarPares(List<int> valores)` deve somar apenas os números pares da lista',
        'O código entregue tem **um** bug que faz o resultado ficar errado — encontre e corrija',
        '`Investigar(List<int> valores)` imprime `[passo] i=N valor=V par=B soma=S` para cada elemento e devolve a soma',
        '`SomarPares` e `Investigar` devem produzir o mesmo total',
        'A correção deve alterar apenas o que causa o erro',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Este metodo deveria somar apenas os pares, mas devolve o valor errado.
    // Use o Investigar para descobrir onde ele desanda e corrija o bug.
    static int SomarPares(List<int> valores)
    {
        int soma = 0;

        for (int i = 0; i < valores.Count; i++)
        {
            if (valores[i] % 2 == 1)
            {
                soma += valores[i];
            }
        }

        return soma;
    }

    // Escreva Investigar aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> valores = new List<int>();

        for (int i = 0; i < n; i++)
        {
            valores.Add(int.Parse(Console.ReadLine()));
        }

        Console.WriteLine($"soma dos pares: {SomarPares(valores)}");
        Console.WriteLine("--- investigacao ---");
        Console.WriteLine($"total investigado: {Investigar(valores)}");
        Console.WriteLine($"conferem: {SomarPares(valores) == Investigar(valores)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static int SomarPares(List<int> valores)
    {
        int soma = 0;

        for (int i = 0; i < valores.Count; i++)
        {
            if (valores[i] % 2 == 0)
            {
                soma += valores[i];
            }
        }

        return soma;
    }

    static int Investigar(List<int> valores)
    {
        int soma = 0;

        for (int i = 0; i < valores.Count; i++)
        {
            bool par = valores[i] % 2 == 0;

            if (par)
            {
                soma += valores[i];
            }

            Console.WriteLine($"[passo] i={i} valor={valores[i]} par={par} soma={soma}");
        }

        return soma;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> valores = new List<int>();

        for (int i = 0; i < n; i++)
        {
            valores.Add(int.Parse(Console.ReadLine()));
        }

        Console.WriteLine($"soma dos pares: {SomarPares(valores)}");
        Console.WriteLine("--- investigacao ---");
        Console.WriteLine($"total investigado: {Investigar(valores)}");
        Console.WriteLine($"conferem: {SomarPares(valores) == Investigar(valores)}");
    }
}
`,
      hints: [
        'Rode o `Investigar` primeiro e compare a coluna `par` com o que você sabe sobre cada número.',
        'A hipótese que os dados sugerem: a condição está selecionando exatamente o conjunto oposto.',
        'Um número par tem resto `0` na divisão por dois — não resto `1`.',
      ],
      tests: [
        {
          name: 'Mistura de pares e impares',
          stdin: '5\n1\n2\n3\n4\n5\n',
          expectedStdout:
            'soma dos pares: 6\n--- investigacao ---\n' +
            '[passo] i=0 valor=1 par=False soma=0\n[passo] i=1 valor=2 par=True soma=2\n' +
            '[passo] i=2 valor=3 par=False soma=2\n[passo] i=3 valor=4 par=True soma=6\n' +
            '[passo] i=4 valor=5 par=False soma=6\n' +
            'total investigado: 6\n' +
            '[passo] i=0 valor=1 par=False soma=0\n[passo] i=1 valor=2 par=True soma=2\n' +
            '[passo] i=2 valor=3 par=False soma=2\n[passo] i=3 valor=4 par=True soma=6\n' +
            '[passo] i=4 valor=5 par=False soma=6\nconferem: True',
        },
        {
          name: 'So impares',
          stdin: '2\n7\n9\n',
          expectedStdout:
            'soma dos pares: 0\n--- investigacao ---\n' +
            '[passo] i=0 valor=7 par=False soma=0\n[passo] i=1 valor=9 par=False soma=0\n' +
            'total investigado: 0\n' +
            '[passo] i=0 valor=7 par=False soma=0\n[passo] i=1 valor=9 par=False soma=0\nconferem: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c03l06',
    title: 'Bisseção para isolar o bug',
    objective: 'Cortar o espaço de busca pela metade a cada passo, em vez de procurar linha por linha.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando você não faz ideia de onde está o erro, procurar sequencialmente é lento. A **bisseção** encontra o ponto de falha em passos logarítmicos, testando sempre o meio do que sobrou.',
      },
      {
        kind: 'table',
        headers: ['Entradas suspeitas', 'Busca linear', 'Bisseção'],
        rows: [
          ['10', 'até 10 testes', '4 testes'],
          ['100', 'até 100 testes', '**7 testes**'],
          ['1000', 'até 1000 testes', '**10 testes**'],
        ],
      },
      {
        kind: 'text',
        body:
          'É a busca binária da Seção 7 aplicada à investigação. A condição para usá-la é que o problema seja **monotônico**: existe um ponto a partir do qual tudo falha, e antes dele tudo funciona.',
      },
      {
        kind: 'code',
        code: `int inicio = 0, fim = dados.Count;

while (fim - inicio > 1)
{
    int meio = (inicio + fim) / 2;

    if (Falha(dados.GetRange(0, meio)))
        fim = meio;        // o problema esta na primeira metade
    else
        inicio = meio;     // esta na segunda
}`,
        caption: 'A cada iteração, metade das possibilidades é eliminada.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A mesma técnica funciona no histórico de versões: se a versão de hoje falha e a de um mês atrás funciona, testar o meio do intervalo encontra o commit culpado em poucos passos. É o que o `git bisect` faz.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Se a falha depende de **combinação** de entradas — o item 3 só quebra na presença do item 7 —, a bisseção pode apontar para o lugar errado, porque a propriedade deixa de ser monotônica.',
      },
    ],
    quiz: [
      {
        id: 's06c03l06q1',
        type: 'single',
        prompt: 'Quantos testes a bisseção precisa para localizar o problema entre 1000 entradas?',
        options: [
          { id: 'a', text: 'Cerca de 10.', correct: true },
          { id: 'b', text: 'Cerca de 100.' },
          { id: 'c', text: 'Cerca de 500.' },
          { id: 'd', text: 'Até 1000.' },
        ],
        explanation:
          'Cada passo corta o espaço pela metade, então o total é o logaritmo na base dois — cerca de dez passos para mil.',
      },
      {
        id: 's06c03l06q2',
        type: 'single',
        prompt: 'Que propriedade o problema precisa ter para a bisseção funcionar?',
        options: [
          { id: 'a', text: 'Ser monotônico: existe um ponto a partir do qual tudo falha.', correct: true },
          { id: 'b', text: 'Ser reproduzível apenas uma vez.' },
          { id: 'c', text: 'Envolver menos de 100 entradas.' },
          { id: 'd', text: 'Estar em um único método.' },
        ],
        explanation:
          'Sem monotonicidade, o resultado do teste do meio não permite descartar uma das metades com segurança.',
      },
      {
        id: 's06c03l06q3',
        type: 'single',
        prompt: 'Onde mais a bisseção se aplica?',
        options: [
          { id: 'a', text: 'No histórico de versões, para achar o commit que introduziu o bug.', correct: true },
          { id: 'b', text: 'Na ordenação de listas.' },
          { id: 'c', text: 'Na formatação de saída.' },
          { id: 'd', text: 'Apenas em listas de dados.' },
        ],
        explanation:
          'É exatamente o que o `git bisect` automatiza: testar o meio do intervalo de commits até isolar o culpado.',
      },
    ],
    challenge: {
      brief:
        'Localize por bisseção o primeiro item de um lote que faz o processamento falhar, contando quantos testes foram necessários.',
      requirements: [
        '`Processa(List<int> lote)` devolve `false` quando o lote contém algum valor negativo, e `true` caso contrário',
        '`BuscaLinear(List<int> dados)` testa prefixos crescentes e devolve o índice do primeiro item problemático, contando os testes em `testesLineares`',
        '`BuscaBinaria(List<int> dados)` faz a mesma busca por bisseção, contando os testes em `testesBinarios`',
        'As duas devolvem `-1` quando não há item problemático',
        'As duas devolvem sempre o mesmo índice',
        'Os contadores são campos estáticos zerados no início de cada busca',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static int testesLineares = 0;
    static int testesBinarios = 0;

    // Escreva Processa, BuscaLinear e BuscaBinaria aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int posicao = int.Parse(Console.ReadLine());

        List<int> dados = new List<int>();

        for (int i = 0; i < n; i++)
        {
            dados.Add(i == posicao ? -1 : i + 1);
        }

        int linear = BuscaLinear(dados);
        int binaria = BuscaBinaria(dados);

        Console.WriteLine($"linear achou: {linear} em {testesLineares} testes");
        Console.WriteLine($"binaria achou: {binaria} em {testesBinarios} testes");
        Console.WriteLine($"mesmo resultado: {linear == binaria}");

        List<int> limpos = new List<int> { 1, 2, 3, 4 };
        Console.WriteLine($"sem problema linear: {BuscaLinear(limpos)}");
        Console.WriteLine($"sem problema binaria: {BuscaBinaria(limpos)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static int testesLineares = 0;
    static int testesBinarios = 0;

    static bool Processa(List<int> lote)
    {
        foreach (int valor in lote)
        {
            if (valor < 0)
            {
                return false;
            }
        }

        return true;
    }

    static int BuscaLinear(List<int> dados)
    {
        testesLineares = 0;

        for (int tamanho = 1; tamanho <= dados.Count; tamanho++)
        {
            testesLineares++;

            if (!Processa(dados.GetRange(0, tamanho)))
            {
                return tamanho - 1;
            }
        }

        return -1;
    }

    static int BuscaBinaria(List<int> dados)
    {
        testesBinarios = 0;

        testesBinarios++;

        if (Processa(dados))
        {
            return -1;
        }

        int inicio = 0;
        int fim = dados.Count;

        while (fim - inicio > 1)
        {
            int meio = (inicio + fim) / 2;

            testesBinarios++;

            if (!Processa(dados.GetRange(0, meio)))
            {
                fim = meio;
            }
            else
            {
                inicio = meio;
            }
        }

        return fim - 1;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int posicao = int.Parse(Console.ReadLine());

        List<int> dados = new List<int>();

        for (int i = 0; i < n; i++)
        {
            dados.Add(i == posicao ? -1 : i + 1);
        }

        int linear = BuscaLinear(dados);
        int binaria = BuscaBinaria(dados);

        Console.WriteLine($"linear achou: {linear} em {testesLineares} testes");
        Console.WriteLine($"binaria achou: {binaria} em {testesBinarios} testes");
        Console.WriteLine($"mesmo resultado: {linear == binaria}");

        List<int> limpos = new List<int> { 1, 2, 3, 4 };
        Console.WriteLine($"sem problema linear: {BuscaLinear(limpos)}");
        Console.WriteLine($"sem problema binaria: {BuscaBinaria(limpos)}");
    }
}
`,
      hints: [
        '`dados.GetRange(0, tamanho)` devolve o prefixo com os primeiros elementos.',
        'A bisseção começa testando o lote inteiro: se ele passa, não há nada a procurar.',
        'Ao sair do laço, `fim` é o menor tamanho de prefixo que falha — o índice do culpado é `fim - 1`.',
      ],
      tests: [
        {
          name: 'Problema no meio de dezesseis',
          stdin: '16\n9\n',
          expectedStdout:
            'linear achou: 9 em 10 testes\nbinaria achou: 9 em 5 testes\nmesmo resultado: True\n' +
            'sem problema linear: -1\nsem problema binaria: -1',
        },
        {
          name: 'Problema no primeiro item',
          stdin: '8\n0\n',
          expectedStdout:
            'linear achou: 0 em 1 testes\nbinaria achou: 0 em 4 testes\nmesmo resultado: True\n' +
            'sem problema linear: -1\nsem problema binaria: -1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c03l07',
    title: 'Explicando o código em voz alta',
    objective: 'Usar a explicação linha a linha como técnica para encontrar a suposição errada.',
    concept: [
      {
        kind: 'text',
        body:
          'A técnica tem um nome curioso — **depuração do patinho de borracha** — e funciona: explicar o código em voz alta, linha por linha, para alguém que não vai responder nada.',
      },
      {
        kind: 'text',
        body:
          'O motivo de funcionar é que ler e explicar são atividades diferentes. Ao ler, o cérebro reconhece o padrão que ele **espera** encontrar. Ao explicar, ele é obrigado a percorrer o que está realmente escrito.',
      },
      {
        kind: 'table',
        headers: ['Etapa da explicação', 'O que costuma revelar'],
        rows: [
          ['"este laço vai de 0 até..."', 'limites errados'],
          ['"aqui eu já tenho..."', 'suposição não garantida'],
          ['"então isso sempre será..."', 'o caso em que não é'],
          ['"e se chegar vazio?"', 'o caso de borda esquecido'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O momento decisivo costuma ser aquele em que você para no meio de uma frase. "Aqui a lista já está ordenada, então... espera." Essa hesitação é o bug se apresentando.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Explicar o que o código **deveria** fazer não serve — é preciso descrever o que ele **faz**. A diferença entre as duas descrições é exatamente onde mora o defeito.',
      },
      {
        kind: 'text',
        body:
          'Uma variação escrita é comentar cada trecho com o estado esperado naquele ponto. Se um comentário e o código discordarem, um dos dois está errado — e a discussão vale a pena.',
      },
    ],
    quiz: [
      {
        id: 's06c03l07q1',
        type: 'single',
        prompt: 'Por que explicar o código em voz alta ajuda a encontrar bugs?',
        options: [
          { id: 'a', text: 'Porque explicar obriga a percorrer o que está escrito, não o que se espera ler.', correct: true },
          { id: 'b', text: 'Porque falar em voz alta melhora a memória.' },
          { id: 'c', text: 'Porque o ouvinte identifica o erro.' },
          { id: 'd', text: 'Porque força a reler mais devagar apenas.' },
        ],
        explanation:
          'A leitura silenciosa reconhece padrões esperados. A explicação exige verbalizar cada passo real.',
      },
      {
        id: 's06c03l07q2',
        type: 'single',
        prompt: 'Qual é o sinal de que a explicação encontrou algo?',
        options: [
          { id: 'a', text: 'Você para no meio de uma frase.', correct: true },
          { id: 'b', text: 'A explicação fica longa.' },
          { id: 'c', text: 'O ouvinte faz uma pergunta.' },
          { id: 'd', text: 'Você chega ao fim do método.' },
        ],
        explanation:
          'A hesitação marca o ponto em que a suposição que você carregava não se sustenta no código real.',
      },
      {
        id: 's06c03l07q3',
        type: 'single',
        prompt: 'O que **não** deve ser explicado?',
        options: [
          { id: 'a', text: 'O que o código deveria fazer.', correct: true },
          { id: 'b', text: 'O que cada linha faz.' },
          { id: 'c', text: 'O estado das variáveis.' },
          { id: 'd', text: 'As condições dos `if`.' },
        ],
        explanation:
          'Explicar a intenção reproduz a mesma suposição que gerou o bug. Só descrever o comportamento real revela a diferença.',
      },
    ],
    challenge: {
      brief:
        'Um método de busca do maior valor está errado. Documente o estado esperado em cada ponto, descubra onde código e comentário discordam, e corrija.',
      requirements: [
        '`Maior(List<int> valores)` devolve o maior valor da lista, ou `int.MinValue` para lista vazia',
        'O código entregue tem **um** bug: encontre e corrija',
        '`Explicar(List<int> valores)` percorre a lista imprimindo `[i=N] valor=V candidato=C mudou=B` a cada passo e devolve o maior',
        '`mudou` indica se o candidato foi substituído naquele passo',
        'Os dois métodos devolvem sempre o mesmo resultado',
        'A busca funciona também quando todos os valores são negativos',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Este metodo deveria devolver o maior valor da lista.
    // Ele funciona com numeros positivos e falha com negativos. Descubra por que.
    static int Maior(List<int> valores)
    {
        int candidato = 0;

        foreach (int valor in valores)
        {
            if (valor > candidato)
            {
                candidato = valor;
            }
        }

        return candidato;
    }

    // Escreva Explicar aqui

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> valores = new List<int>();

        for (int i = 0; i < n; i++)
        {
            valores.Add(int.Parse(Console.ReadLine()));
        }

        Console.WriteLine($"maior: {Maior(valores)}");
        Console.WriteLine("--- explicacao ---");
        Console.WriteLine($"explicado: {Explicar(valores)}");

        List<int> negativos = new List<int> { -10, -3, -7 };
        Console.WriteLine($"so negativos: {Maior(negativos)}");
        Console.WriteLine($"lista vazia: {Maior(new List<int>())}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static int Maior(List<int> valores)
    {
        // estado esperado: sem nenhum candidato ainda,
        // qualquer valor real precisa vencer o inicial
        int candidato = int.MinValue;

        foreach (int valor in valores)
        {
            if (valor > candidato)
            {
                candidato = valor;
            }
        }

        return candidato;
    }

    static int Explicar(List<int> valores)
    {
        int candidato = int.MinValue;

        for (int i = 0; i < valores.Count; i++)
        {
            bool mudou = valores[i] > candidato;

            if (mudou)
            {
                candidato = valores[i];
            }

            Console.WriteLine($"[i={i}] valor={valores[i]} candidato={candidato} mudou={mudou}");
        }

        return candidato;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> valores = new List<int>();

        for (int i = 0; i < n; i++)
        {
            valores.Add(int.Parse(Console.ReadLine()));
        }

        Console.WriteLine($"maior: {Maior(valores)}");
        Console.WriteLine("--- explicacao ---");
        Console.WriteLine($"explicado: {Explicar(valores)}");

        List<int> negativos = new List<int> { -10, -3, -7 };
        Console.WriteLine($"so negativos: {Maior(negativos)}");
        Console.WriteLine($"lista vazia: {Maior(new List<int>())}");
    }
}
`,
      hints: [
        'Explique a primeira linha em voz alta: "começo o candidato em zero, supondo que..." — e complete a frase.',
        'A suposição escondida é que existe algum valor maior que zero na lista.',
        'O valor inicial precisa ser menor que qualquer valor possível: `int.MinValue`.',
      ],
      tests: [
        {
          name: 'Valores positivos e negativos',
          stdin: '4\n3\n-8\n10\n-2\n',
          expectedStdout:
            'maior: 10\n--- explicacao ---\n' +
            '[i=0] valor=3 candidato=3 mudou=True\n[i=1] valor=-8 candidato=3 mudou=False\n' +
            '[i=2] valor=10 candidato=10 mudou=True\n[i=3] valor=-2 candidato=10 mudou=False\n' +
            'explicado: 10\nso negativos: -3\nlista vazia: -2147483648',
        },
        {
          name: 'Todos negativos',
          stdin: '3\n-5\n-1\n-9\n',
          expectedStdout:
            'maior: -1\n--- explicacao ---\n' +
            '[i=0] valor=-5 candidato=-5 mudou=True\n[i=1] valor=-1 candidato=-1 mudou=True\n' +
            '[i=2] valor=-9 candidato=-1 mudou=False\n' +
            'explicado: -1\nso negativos: -3\nlista vazia: -2147483648',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c03l08',
    title: 'Erros de off-by-one',
    objective: 'Reconhecer e evitar a família de erros que erra por exatamente uma unidade.',
    concept: [
      {
        kind: 'text',
        body:
          'O erro **off-by-one** — errar por um — é provavelmente o bug mais comum da programação. Ele nasce da confusão entre contar elementos e contar posições.',
      },
      {
        kind: 'table',
        headers: ['Escrito', 'Percorre', 'Problema'],
        rows: [
          ['`for (i = 0; i < n; i++)`', '`0..n-1`', '**correto**'],
          ['`for (i = 0; i <= n; i++)`', '`0..n`', 'estoura no fim'],
          ['`for (i = 1; i < n; i++)`', '`1..n-1`', 'pula o primeiro'],
          ['`for (i = 0; i < n - 1; i++)`', '`0..n-2`', 'pula o último'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A causa raiz é que os índices começam em zero mas as contagens começam em um. Um array de 5 elementos tem índices de 0 a 4 — e `array[5]` é sempre um erro.',
      },
      {
        kind: 'text',
        body:
          'A técnica mais confiável para conferir é testar mentalmente com os **casos extremos**: zero elementos, um elemento, dois elementos. Quase todo off-by-one aparece em um desses três.',
      },
      {
        kind: 'compare',
        good: `// comparar vizinhos
for (int i = 0; i < n - 1; i++)
{
    Comparar(a[i], a[i + 1]);
}
// para em n-2, e o par
// (n-2, n-1) e o ultimo`,
        bad: `for (int i = 0; i < n; i++)
{
    Comparar(a[i], a[i + 1]);
}
// na ultima volta acessa a[n]`,
        goodLabel: 'Limite ajustado ao acesso',
        badLabel: 'Limite ignora o `i + 1`',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Preste atenção especial quando o corpo do laço acessa `i + 1` ou `i - 1`. O limite precisa ser ajustado ao **maior índice realmente acessado**, não ao índice da variável de controle.',
      },
    ],
    quiz: [
      {
        id: 's06c03l08q1',
        type: 'single',
        prompt: 'Qual é a causa raiz dos erros de off-by-one?',
        options: [
          { id: 'a', text: 'Índices começam em zero, mas contagens começam em um.', correct: true },
          { id: 'b', text: 'Laços `for` são confusos.' },
          { id: 'c', text: 'A linguagem não verifica limites.' },
          { id: 'd', text: 'Arrays têm tamanho fixo.' },
        ],
        explanation:
          'A distância entre "o quinto elemento" e "o elemento de índice 5" é exatamente o erro que se comete.',
      },
      {
        id: 's06c03l08q2',
        type: 'single',
        prompt: 'Qual é a técnica mais confiável para conferir limites de laço?',
        options: [
          { id: 'a', text: 'Testar mentalmente com zero, um e dois elementos.', correct: true },
          { id: 'b', text: 'Rodar com uma lista grande.' },
          { id: 'c', text: 'Contar as linhas do laço.' },
          { id: 'd', text: 'Usar `foreach` sempre.' },
        ],
        explanation:
          'Os casos extremos revelam quase todos os off-by-one. Uma lista grande com o erro no fim pode até parecer funcionar.',
      },
      {
        id: 's06c03l08q3',
        type: 'single',
        prompt: 'O corpo do laço acessa `a[i + 1]`. Qual deve ser o limite?',
        options: [
          { id: 'a', code: 'i < n - 1', correct: true },
          { id: 'b', code: 'i < n' },
          { id: 'c', code: 'i <= n' },
          { id: 'd', code: 'i < n + 1' },
        ],
        explanation:
          'O limite acompanha o maior índice acessado. Com `i + 1` no corpo, o `i` precisa parar uma posição antes.',
      },
    ],
    challenge: {
      brief:
        'Corrija três laços com erros de off-by-one, cada um errando de uma forma diferente.',
      requirements: [
        '`Somar(int[] valores)` deve somar todos os elementos — o código entregue pula um',
        '`Reverter(int[] valores)` deve devolver os elementos em ordem inversa, separados por espaço — o código entregue erra o limite',
        '`ParesVizinhos(int[] valores)` deve contar quantos pares de vizinhos têm soma par — o código entregue estoura',
        'Os três funcionam com array vazio, de um elemento e de dois elementos',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // BUG 1: este metodo nao soma todos os elementos
    static int Somar(int[] valores)
    {
        int soma = 0;

        for (int i = 0; i < valores.Length - 1; i++)
        {
            soma += valores[i];
        }

        return soma;
    }

    // BUG 2: este metodo erra o limite ao percorrer de tras para frente
    static string Reverter(int[] valores)
    {
        string resultado = "";

        for (int i = valores.Length; i > 0; i--)
        {
            resultado += valores[i - 1];

            if (i > 1)
            {
                resultado += " ";
            }
        }

        return resultado;
    }

    // BUG 3: este metodo acessa uma posicao alem do fim
    static int ParesVizinhos(int[] valores)
    {
        int total = 0;

        for (int i = 0; i < valores.Length; i++)
        {
            if ((valores[i] + valores[i + 1]) % 2 == 0)
            {
                total++;
            }
        }

        return total;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] valores = new int[n];

        for (int i = 0; i < n; i++)
        {
            valores[i] = int.Parse(Console.ReadLine());
        }

        Console.WriteLine($"soma: {Somar(valores)}");
        Console.WriteLine($"revertido: {Reverter(valores)}");
        Console.WriteLine($"pares vizinhos: {ParesVizinhos(valores)}");

        int[] vazio = new int[0];
        int[] um = { 42 };
        int[] dois = { 1, 3 };

        Console.WriteLine($"vazio: {Somar(vazio)} | '{Reverter(vazio)}' | {ParesVizinhos(vazio)}");
        Console.WriteLine($"um: {Somar(um)} | '{Reverter(um)}' | {ParesVizinhos(um)}");
        Console.WriteLine($"dois: {Somar(dois)} | '{Reverter(dois)}' | {ParesVizinhos(dois)}");
    }
}
`,
      solution: `using System;

class Program
{
    static int Somar(int[] valores)
    {
        int soma = 0;

        for (int i = 0; i < valores.Length; i++)
        {
            soma += valores[i];
        }

        return soma;
    }

    static string Reverter(int[] valores)
    {
        string resultado = "";

        for (int i = valores.Length; i > 0; i--)
        {
            resultado += valores[i - 1];

            if (i > 1)
            {
                resultado += " ";
            }
        }

        return resultado;
    }

    static int ParesVizinhos(int[] valores)
    {
        int total = 0;

        for (int i = 0; i < valores.Length - 1; i++)
        {
            if ((valores[i] + valores[i + 1]) % 2 == 0)
            {
                total++;
            }
        }

        return total;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] valores = new int[n];

        for (int i = 0; i < n; i++)
        {
            valores[i] = int.Parse(Console.ReadLine());
        }

        Console.WriteLine($"soma: {Somar(valores)}");
        Console.WriteLine($"revertido: {Reverter(valores)}");
        Console.WriteLine($"pares vizinhos: {ParesVizinhos(valores)}");

        int[] vazio = new int[0];
        int[] um = { 42 };
        int[] dois = { 1, 3 };

        Console.WriteLine($"vazio: {Somar(vazio)} | '{Reverter(vazio)}' | {ParesVizinhos(vazio)}");
        Console.WriteLine($"um: {Somar(um)} | '{Reverter(um)}' | {ParesVizinhos(um)}");
        Console.WriteLine($"dois: {Somar(dois)} | '{Reverter(dois)}' | {ParesVizinhos(dois)}");
    }
}
`,
      hints: [
        'No `Somar`, o `- 1` no limite faz o último elemento nunca ser somado.',
        'O `Reverter` está correto: ele usa `i - 1` no acesso, então começar em `Length` é adequado. Confira antes de mudar.',
        'No `ParesVizinhos`, o corpo acessa `i + 1`, então o limite precisa parar uma posição antes.',
      ],
      tests: [
        {
          name: 'Cinco valores',
          stdin: '5\n2\n4\n1\n3\n5\n',
          expectedStdout:
            'soma: 15\nrevertido: 5 3 1 4 2\npares vizinhos: 3\n' +
            "vazio: 0 | '' | 0\num: 42 | '42' | 0\ndois: 4 | '3 1' | 1",
        },
        {
          name: 'Dois valores',
          stdin: '2\n7\n8\n',
          expectedStdout:
            'soma: 15\nrevertido: 8 7\npares vizinhos: 0\n' +
            "vazio: 0 | '' | 0\num: 42 | '42' | 0\ndois: 4 | '3 1' | 1",
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c03l09',
    title: 'Prática: caçando um bug de estado',
    objective: 'Encontrar um defeito que só aparece depois de uma sequência de operações.',
    concept: [
      {
        kind: 'text',
        body:
          'Os bugs mais difíceis não estão em uma linha errada — estão em um **estado** que foi ficando inconsistente ao longo de várias operações.',
      },
      {
        kind: 'table',
        headers: ['Sintoma', 'Sugere'],
        rows: [
          ['falha só na segunda chamada', 'estado não reiniciado'],
          ['funciona isolado, falha em sequência', 'resíduo de operação anterior'],
          ['resultado depende da ordem', 'estado compartilhado'],
          ['erro cresce a cada repetição', 'acumulador nunca zerado'],
        ],
      },
      {
        kind: 'text',
        body:
          'A técnica central é verificar a **invariante** do objeto depois de cada operação. Se existe uma relação que deve ser sempre verdadeira — o total é a soma dos itens, por exemplo —, testá-la a cada passo aponta a operação culpada.',
      },
      {
        kind: 'code',
        code: `// invariante: Total sempre igual a soma dos itens
static bool Coerente(Carrinho c)
{
    int soma = 0;
    foreach (var i in c.Itens) soma += i.Valor;
    return soma == c.Total;
}`,
        caption: 'Chame isso depois de cada operação e o passo que quebra a coerência se revela.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Estado duplicado é a origem mais comum desse tipo de bug. Guardar o total **e** os itens obriga as duas coisas a permanecerem sincronizadas — e uma operação que esquece de atualizar uma delas quebra tudo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A melhor correção geralmente não é consertar a operação esquecida: é **eliminar a duplicação**, calculando o total a partir dos itens. Um estado que não existe não pode ficar dessincronizado.',
      },
    ],
    quiz: [
      {
        id: 's06c03l09q1',
        type: 'single',
        prompt: 'Um método funciona isolado mas falha quando chamado em sequência. O que isso sugere?',
        options: [
          { id: 'a', text: 'Resíduo de estado da operação anterior.', correct: true },
          { id: 'b', text: 'Erro de sintaxe.' },
          { id: 'c', text: 'Problema de desempenho.' },
          { id: 'd', text: 'Falta de validação de argumento.' },
        ],
        explanation:
          'Algo que deveria ter sido reiniciado permaneceu, e a segunda execução começa de um ponto inesperado.',
      },
      {
        id: 's06c03l09q2',
        type: 'single',
        prompt: 'Como localizar a operação que corrompeu o estado?',
        options: [
          { id: 'a', text: 'Verificando a invariante do objeto depois de cada operação.', correct: true },
          { id: 'b', text: 'Lendo o stack trace.' },
          { id: 'c', text: 'Testando com entrada maior.' },
          { id: 'd', text: 'Removendo métodos até funcionar.' },
        ],
        explanation:
          'A primeira operação que deixa a invariante falsa é a culpada, mesmo que o sintoma só apareça muito depois.',
      },
      {
        id: 's06c03l09q3',
        type: 'single',
        prompt: 'Qual é a melhor correção para estado duplicado dessincronizado?',
        options: [
          { id: 'a', text: 'Eliminar a duplicação, calculando o valor derivado a partir da fonte.', correct: true },
          { id: 'b', text: 'Corrigir a operação que esqueceu de atualizar.' },
          { id: 'c', text: 'Sincronizar os dois no fim de cada método.' },
          { id: 'd', text: 'Adicionar uma asserção.' },
        ],
        explanation:
          'Corrigir a operação resolve este caso; eliminar a duplicação impede que o problema volte na próxima operação nova.',
      },
    ],
    challenge: {
      brief:
        'Um carrinho mantém um total em cache que sai de sincronia. Encontre a operação culpada com uma verificação de invariante e corrija a causa.',
      requirements: [
        '`Carrinho` guarda valores em uma lista privada',
        '`Adicionar(int valor)`, `Remover(int valor)` e `Limpar()` alteram o conteúdo',
        '`Total` devolve a soma dos valores',
        '`Quantidade` devolve a quantidade de itens',
        'O código entregue guarda o total em um campo que sai de sincronia — corrija de forma que a dessincronia se torne impossível',
        '`Coerente()` verifica que o `Total` bate com a soma dos itens, e deve devolver `true` depois de toda operação',
        '`Remover` de um valor ausente não altera nada e devolve `false`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Carrinho
{
    private List<int> valores = new List<int>();
    private int total = 0;

    public int Total => total;

    public int Quantidade => valores.Count;

    public void Adicionar(int valor)
    {
        valores.Add(valor);
        total += valor;
    }

    public bool Remover(int valor)
    {
        // BUG: alguma coisa aqui deixa o total fora de sincronia
        return valores.Remove(valor);
    }

    public void Limpar()
    {
        valores.Clear();
    }

    public bool Coerente()
    {
        int soma = 0;

        foreach (int v in valores)
        {
            soma += v;
        }

        return soma == Total;
    }
}

class Program
{
    static void Passo(Carrinho c, string acao)
    {
        Console.WriteLine($"{acao}: total={c.Total} qtd={c.Quantidade} coerente={c.Coerente()}");
    }

    static void Main()
    {
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());

        Carrinho c = new Carrinho();

        Passo(c, "inicio");

        c.Adicionar(a);
        Passo(c, "adicionar a");

        c.Adicionar(b);
        Passo(c, "adicionar b");

        Console.WriteLine($"removeu a: {c.Remover(a)}");
        Passo(c, "remover a");

        Console.WriteLine($"removeu ausente: {c.Remover(99999)}");
        Passo(c, "remover ausente");

        c.Limpar();
        Passo(c, "limpar");

        c.Adicionar(b);
        Passo(c, "adicionar de novo");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Carrinho
{
    private List<int> valores = new List<int>();

    public int Total
    {
        get
        {
            int soma = 0;

            foreach (int v in valores)
            {
                soma += v;
            }

            return soma;
        }
    }

    public int Quantidade => valores.Count;

    public void Adicionar(int valor)
    {
        valores.Add(valor);
    }

    public bool Remover(int valor)
    {
        return valores.Remove(valor);
    }

    public void Limpar()
    {
        valores.Clear();
    }

    public bool Coerente()
    {
        int soma = 0;

        foreach (int v in valores)
        {
            soma += v;
        }

        return soma == Total;
    }
}

class Program
{
    static void Passo(Carrinho c, string acao)
    {
        Console.WriteLine($"{acao}: total={c.Total} qtd={c.Quantidade} coerente={c.Coerente()}");
    }

    static void Main()
    {
        int a = int.Parse(Console.ReadLine());
        int b = int.Parse(Console.ReadLine());

        Carrinho c = new Carrinho();

        Passo(c, "inicio");

        c.Adicionar(a);
        Passo(c, "adicionar a");

        c.Adicionar(b);
        Passo(c, "adicionar b");

        Console.WriteLine($"removeu a: {c.Remover(a)}");
        Passo(c, "remover a");

        Console.WriteLine($"removeu ausente: {c.Remover(99999)}");
        Passo(c, "remover ausente");

        c.Limpar();
        Passo(c, "limpar");

        c.Adicionar(b);
        Passo(c, "adicionar de novo");
    }
}
`,
      hints: [
        'Rode o programa antes de corrigir: o `coerente=False` aparece exatamente depois da operação culpada.',
        'Duas operações esquecem de atualizar o total: `Remover` e `Limpar`.',
        'Em vez de corrigir as duas, elimine o campo `total` e calcule a soma sob demanda — assim nenhuma operação futura pode dessincronizar.',
      ],
      tests: [
        {
          name: 'Dois valores distintos',
          stdin: '10\n25\n',
          expectedStdout:
            'inicio: total=0 qtd=0 coerente=True\n' +
            'adicionar a: total=10 qtd=1 coerente=True\n' +
            'adicionar b: total=35 qtd=2 coerente=True\n' +
            'removeu a: True\nremover a: total=25 qtd=1 coerente=True\n' +
            'removeu ausente: False\nremover ausente: total=25 qtd=1 coerente=True\n' +
            'limpar: total=0 qtd=0 coerente=True\n' +
            'adicionar de novo: total=25 qtd=1 coerente=True',
        },
        {
          name: 'Valores pequenos',
          stdin: '1\n2\n',
          expectedStdout:
            'inicio: total=0 qtd=0 coerente=True\n' +
            'adicionar a: total=1 qtd=1 coerente=True\n' +
            'adicionar b: total=3 qtd=2 coerente=True\n' +
            'removeu a: True\nremover a: total=2 qtd=1 coerente=True\n' +
            'removeu ausente: False\nremover ausente: total=2 qtd=1 coerente=True\n' +
            'limpar: total=0 qtd=0 coerente=True\n' +
            'adicionar de novo: total=2 qtd=1 coerente=True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c03l10',
    title: 'Checkpoint: depuração',
    objective: 'Aplicar o processo completo de investigação a um programa com defeitos de naturezas diferentes.',
    concept: [
      {
        kind: 'text',
        body:
          'Depurar é um processo, não um talento. Este checkpoint percorre o roteiro inteiro em um programa com mais de um defeito.',
      },
      {
        kind: 'table',
        headers: ['Etapa', 'Ferramenta do capítulo'],
        rows: [
          ['o que aconteceu', 'tipo e mensagem da exceção'],
          ['onde aconteceu', 'stack trace'],
          ['com quais valores', 'impressão de diagnóstico'],
          ['a partir de quando', 'bisseção'],
          ['por que eu achei que funcionava', 'explicar em voz alta'],
          ['o que sempre deveria valer', 'asserção e invariante'],
        ],
      },
      {
        kind: 'text',
        body:
          'A armadilha final: parar na primeira correção que faz o sintoma sumir. Um sintoma que desaparece não prova que a causa foi removida — só que ela deixou de se manifestar naquele teste.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Ao terminar, faça a pergunta que evita o retrabalho: **por que esse bug passou?** Se faltou um teste, escreva-o. Se o desenho permitia o erro, mude o desenho. Corrigir a causa vale mais que corrigir a instância.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Cuidado com correções que apenas escondem: um `try` em volta do trecho que estoura, um `?.` que silencia um nulo impossível, um limite ajustado no chute. Todos fazem o sintoma sumir sem tocar na causa.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Antes de corrigir, escreva o teste que **reproduz** o bug. Assim você sabe que a correção funcionou, e o teste continua ali impedindo que ele volte.',
      },
    ],
    quiz: [
      {
        id: 's06c03l10q1',
        type: 'single',
        prompt: 'Por que o sintoma sumir não prova que o bug foi corrigido?',
        options: [
          { id: 'a', text: 'Porque a causa pode continuar lá, apenas sem se manifestar naquele teste.', correct: true },
          { id: 'b', text: 'Porque sintomas sempre voltam.' },
          { id: 'c', text: 'Porque o compilador não verifica isso.' },
          { id: 'd', text: 'O sintoma sumir prova sim.' },
        ],
        explanation:
          'Alterar um limite no chute pode acertar o caso testado e continuar errado nos demais.',
      },
      {
        id: 's06c03l10q2',
        type: 'multiple',
        prompt: 'Quais destas são correções que apenas escondem o problema?',
        options: [
          { id: 'a', text: 'Um `try` em volta do trecho que estoura.', correct: true },
          { id: 'b', text: 'Um `?.` que silencia um nulo que não deveria existir.', correct: true },
          { id: 'c', text: 'Um limite ajustado sem entender por quê.', correct: true },
          { id: 'd', text: 'Eliminar o estado duplicado que causava a dessincronia.' },
        ],
        explanation:
          'A última é uma correção de causa: ela torna a classe de erro impossível, em vez de suprimir o sintoma.',
      },
      {
        id: 's06c03l10q3',
        type: 'single',
        prompt: 'Qual pergunta evita que o mesmo tipo de bug volte?',
        options: [
          { id: 'a', text: 'Por que esse bug passou?', correct: true },
          { id: 'b', text: 'Quem escreveu esse código?' },
          { id: 'c', text: 'Quanto tempo levou para achar?' },
          { id: 'd', text: 'Existe outro jeito de escrever isso?' },
        ],
        explanation:
          'A resposta aponta para o teste que faltava ou para o desenho que permitia o erro — os dois são correções duradouras.',
      },
    ],
    challenge: {
      brief:
        'Um sistema de notas tem três defeitos de naturezas diferentes. Instrumente, encontre cada um e corrija a causa de todos.',
      requirements: [
        '`Boletim` guarda notas em uma lista privada e o nome do aluno',
        '`Adicionar(int nota)` aceita apenas notas de `0` a `10`, devolvendo `false` para as demais sem alterar nada',
        '`Media` devolve a média inteira das notas, ou `0` quando não há notas',
        '`Maior` devolve a maior nota, ou `-1` quando não há notas',
        '`Aprovado` é verdadeiro quando a média é maior ou igual a `6`',
        '`Coerente()` verifica que a quantidade guardada bate com a lista e que todas as notas estão na faixa válida',
        'O código entregue tem **três** bugs: uma validação invertida, um off-by-one e um estado duplicado — corrija os três',
        '`Coerente()` deve devolver `true` depois de toda operação',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Boletim
{
    private List<int> notas = new List<int>();
    private int quantidade = 0;

    public string Aluno { get; }

    public Boletim(string aluno)
    {
        Aluno = aluno;
    }

    public int Quantidade => quantidade;

    // BUG 1: a validacao esta invertida
    public bool Adicionar(int nota)
    {
        if (nota < 0 || nota > 10)
        {
            notas.Add(nota);
            quantidade++;
            return true;
        }

        return false;
    }

    public int Media
    {
        get
        {
            if (notas.Count == 0)
            {
                return 0;
            }

            int soma = 0;

            // BUG 2: este laco nao percorre todas as notas
            for (int i = 0; i < notas.Count - 1; i++)
            {
                soma += notas[i];
            }

            return soma / notas.Count;
        }
    }

    public int Maior
    {
        get
        {
            if (notas.Count == 0)
            {
                return -1;
            }

            int maior = notas[0];

            foreach (int n in notas)
            {
                if (n > maior)
                {
                    maior = n;
                }
            }

            return maior;
        }
    }

    public bool Aprovado => Media >= 6;

    public bool Coerente()
    {
        if (Quantidade != notas.Count)
        {
            return false;
        }

        foreach (int n in notas)
        {
            if (n < 0 || n > 10)
            {
                return false;
            }
        }

        return true;
    }
}

class Program
{
    static void Passo(Boletim b, string acao)
    {
        Console.WriteLine($"{acao}: qtd={b.Quantidade} media={b.Media} maior={b.Maior} aprovado={b.Aprovado} coerente={b.Coerente()}");
    }

    static void Main()
    {
        string aluno = Console.ReadLine();
        int n = int.Parse(Console.ReadLine());

        Boletim b = new Boletim(aluno);

        Passo(b, "inicio");

        for (int i = 0; i < n; i++)
        {
            int nota = int.Parse(Console.ReadLine());
            Console.WriteLine($"adicionar {nota}: {b.Adicionar(nota)}");
            Passo(b, $"apos {nota}");
        }

        Console.WriteLine($"adicionar 99: {b.Adicionar(99)}");
        Console.WriteLine($"adicionar -1: {b.Adicionar(-1)}");
        Passo(b, "apos invalidas");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Boletim
{
    private List<int> notas = new List<int>();

    public string Aluno { get; }

    public Boletim(string aluno)
    {
        Aluno = aluno;
    }

    public int Quantidade => notas.Count;

    public bool Adicionar(int nota)
    {
        if (nota < 0 || nota > 10)
        {
            return false;
        }

        notas.Add(nota);
        return true;
    }

    public int Media
    {
        get
        {
            if (notas.Count == 0)
            {
                return 0;
            }

            int soma = 0;

            for (int i = 0; i < notas.Count; i++)
            {
                soma += notas[i];
            }

            return soma / notas.Count;
        }
    }

    public int Maior
    {
        get
        {
            if (notas.Count == 0)
            {
                return -1;
            }

            int maior = notas[0];

            foreach (int n in notas)
            {
                if (n > maior)
                {
                    maior = n;
                }
            }

            return maior;
        }
    }

    public bool Aprovado => Media >= 6;

    public bool Coerente()
    {
        if (Quantidade != notas.Count)
        {
            return false;
        }

        foreach (int n in notas)
        {
            if (n < 0 || n > 10)
            {
                return false;
            }
        }

        return true;
    }
}

class Program
{
    static void Passo(Boletim b, string acao)
    {
        Console.WriteLine($"{acao}: qtd={b.Quantidade} media={b.Media} maior={b.Maior} aprovado={b.Aprovado} coerente={b.Coerente()}");
    }

    static void Main()
    {
        string aluno = Console.ReadLine();
        int n = int.Parse(Console.ReadLine());

        Boletim b = new Boletim(aluno);

        Passo(b, "inicio");

        for (int i = 0; i < n; i++)
        {
            int nota = int.Parse(Console.ReadLine());
            Console.WriteLine($"adicionar {nota}: {b.Adicionar(nota)}");
            Passo(b, $"apos {nota}");
        }

        Console.WriteLine($"adicionar 99: {b.Adicionar(99)}");
        Console.WriteLine($"adicionar -1: {b.Adicionar(-1)}");
        Passo(b, "apos invalidas");
    }
}
`,
      hints: [
        'O bug 1 aceita exatamente o conjunto errado: a condição está certa, o que está trocado é o que acontece dentro dela.',
        'O bug 2 soma um elemento a menos mas divide pelo total — a média sai menor que a real.',
        'O bug 3 é o campo `quantidade`: elimine-o e derive a quantidade da própria lista, como na lição anterior.',
      ],
      tests: [
        {
          name: 'Tres notas aprovadas',
          stdin: 'Ana\n3\n8\n6\n10\n',
          expectedStdout:
            'inicio: qtd=0 media=0 maior=-1 aprovado=False coerente=True\n' +
            'adicionar 8: True\napos 8: qtd=1 media=8 maior=8 aprovado=True coerente=True\n' +
            'adicionar 6: True\napos 6: qtd=2 media=7 maior=8 aprovado=True coerente=True\n' +
            'adicionar 10: True\napos 10: qtd=3 media=8 maior=10 aprovado=True coerente=True\n' +
            'adicionar 99: False\nadicionar -1: False\n' +
            'apos invalidas: qtd=3 media=8 maior=10 aprovado=True coerente=True',
        },
        {
          name: 'Notas baixas',
          stdin: 'Bruno\n2\n4\n5\n',
          expectedStdout:
            'inicio: qtd=0 media=0 maior=-1 aprovado=False coerente=True\n' +
            'adicionar 4: True\napos 4: qtd=1 media=4 maior=4 aprovado=False coerente=True\n' +
            'adicionar 5: True\napos 5: qtd=2 media=4 maior=5 aprovado=False coerente=True\n' +
            'adicionar 99: False\nadicionar -1: False\n' +
            'apos invalidas: qtd=2 media=4 maior=5 aprovado=False coerente=True',
          hidden: true,
        },
      ],
    },
  },
]
