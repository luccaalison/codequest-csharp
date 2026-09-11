import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's06c05l01',
    title: 'Nomes que explicam',
    objective: 'Escolher nomes que dispensem o comentário e revelem a intenção do código.',
    concept: [
      {
        kind: 'text',
        body:
          'Nomear é a atividade mais frequente da programação e a que mais afeta a legibilidade. Um bom nome responde à pergunta que o leitor faria sobre aquele valor.',
      },
      {
        kind: 'compare',
        good: `int diasAteVencimento = 30;
decimal totalComImpostos = ...;
bool clienteInadimplente = ...;

if (clienteInadimplente) { }`,
        bad: `int d = 30;
decimal t = ...;
bool flag = ...;

if (flag) { }`,
        goodLabel: 'O nome carrega a informação',
        badLabel: 'A informação está fora do código',
      },
      {
        kind: 'table',
        headers: ['Tipo de valor', 'Padrão de nome', 'Exemplo'],
        rows: [
          ['booleano', 'pergunta ou afirmação', '`estaAtivo`, `temSaldo`'],
          ['coleção', 'plural', '`clientes`, `pedidos`'],
          ['contador', 'começa com `total` ou `quantidade`', '`totalAprovados`'],
          ['método que devolve', 'substantivo ou pergunta', '`Saldo()`, `PodeSacar()`'],
          ['método que age', 'verbo no imperativo', '`Salvar()`, `Cancelar()`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O comprimento certo depende do **escopo**. Um `i` em um laço de três linhas é claro; um `i` que atravessa cinquenta linhas não é. Quanto maior a distância entre a declaração e o uso, mais o nome precisa explicar.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Nomes que mentem são piores que nomes vagos. Uma variável chamada `lista` que guarda um dicionário, ou um `Salvar()` que também envia e-mail, ensinam o leitor a desconfiar de todos os outros nomes.',
      },
      {
        kind: 'text',
        body:
          'A prova prática: se um nome precisa de um comentário ao lado explicando o que ele significa, o comentário está indicando o nome que deveria ter sido usado.',
      },
    ],
    quiz: [
      {
        id: 's06c05l01q1',
        type: 'single',
        prompt: 'De que depende o comprimento adequado de um nome?',
        options: [
          { id: 'a', text: 'Do escopo: quanto maior a distância entre declaração e uso, mais explicativo.', correct: true },
          { id: 'b', text: 'Do tipo da variável.' },
          { id: 'c', text: 'Da convenção da equipe apenas.' },
          { id: 'd', text: 'Deve ser sempre o mais curto possível.' },
        ],
        explanation:
          'Um `i` em três linhas é claro. O mesmo `i` cinquenta linhas depois exige rolar a tela para lembrar o que é.',
      },
      {
        id: 's06c05l01q2',
        type: 'single',
        prompt: 'Por que um nome que mente é pior que um nome vago?',
        options: [
          { id: 'a', text: 'Porque ensina o leitor a desconfiar de todos os outros nomes.', correct: true },
          { id: 'b', text: 'Porque não compila.' },
          { id: 'c', text: 'Porque ocupa mais espaço.' },
          { id: 'd', text: 'Porque dificulta a busca no arquivo.' },
        ],
        explanation:
          'Um nome vago não informa; um nome errado desinforma, e o leitor passa a precisar verificar tudo.',
      },
      {
        id: 's06c05l01q3',
        type: 'single',
        prompt: 'O que indica um comentário explicando o significado de uma variável?',
        options: [
          { id: 'a', text: 'O nome que a variável deveria ter.', correct: true },
          { id: 'b', text: 'Que o código está bem documentado.' },
          { id: 'c', text: 'Que a variável é complexa.' },
          { id: 'd', text: 'Que falta um teste.' },
        ],
        explanation:
          'O comentário costuma conter exatamente as palavras que resolveriam o problema se estivessem no nome.',
      },
    ],
    challenge: {
      brief:
        'Renomeie tudo em um método ilegível. Ao dar nomes verdadeiros, um dos cálculos vai revelar que faz o contrário do que o nome sugere.',
      requirements: [
        '`CalcularFrete(decimal peso, decimal distancia, bool urgente)` devolve o valor do frete',
        'A base é `peso` vezes `2` mais `distancia` vezes `0.5`',
        'Entrega urgente **acrescenta** 50 por cento ao total',
        'O código entregue tem um bug: apesar do nome, o cálculo do urgente aplica um desconto — corrija',
        'Todas as variáveis e parâmetros têm nomes que explicam o que guardam',
        'Nenhum nome de uma letra é usado, exceto índices de laço curtos',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Este metodo funciona, mas ninguem entende o que ele faz.
    // Renomeie tudo. Ao dar nomes verdadeiros, um dos calculos vai
    // revelar que faz o oposto do que o nome promete.
    static decimal Calc(decimal p, decimal d, bool u)
    {
        decimal x = p * 2;
        decimal y = d * 0.5m;
        decimal z = x + y;

        if (u)
        {
            z = z * 0.5m;
        }

        return z;
    }

    static void Main()
    {
        decimal peso = decimal.Parse(Console.ReadLine());
        decimal distancia = decimal.Parse(Console.ReadLine());

        Console.WriteLine($"normal: {CalcularFrete(peso, distancia, false):F2}");
        Console.WriteLine($"urgente: {CalcularFrete(peso, distancia, true):F2}");
        Console.WriteLine($"urgente custa mais: {CalcularFrete(peso, distancia, true) > CalcularFrete(peso, distancia, false)}");
        Console.WriteLine($"peso zero normal: {CalcularFrete(0, distancia, false):F2}");
        Console.WriteLine($"tudo zero: {CalcularFrete(0, 0, true):F2}");
    }
}
`,
      solution: `using System;

class Program
{
    static decimal CalcularFrete(decimal peso, decimal distancia, bool urgente)
    {
        decimal custoPorPeso = peso * 2;
        decimal custoPorDistancia = distancia * 0.5m;
        decimal total = custoPorPeso + custoPorDistancia;

        if (urgente)
        {
            total = total * 1.5m;
        }

        return total;
    }

    static void Main()
    {
        decimal peso = decimal.Parse(Console.ReadLine());
        decimal distancia = decimal.Parse(Console.ReadLine());

        Console.WriteLine($"normal: {CalcularFrete(peso, distancia, false):F2}");
        Console.WriteLine($"urgente: {CalcularFrete(peso, distancia, true):F2}");
        Console.WriteLine($"urgente custa mais: {CalcularFrete(peso, distancia, true) > CalcularFrete(peso, distancia, false)}");
        Console.WriteLine($"peso zero normal: {CalcularFrete(0, distancia, false):F2}");
        Console.WriteLine($"tudo zero: {CalcularFrete(0, 0, true):F2}");
    }
}
`,
      hints: [
        'Comece pelo nome do método e dos parâmetros: `p`, `d` e `u` viram `peso`, `distancia` e `urgente`.',
        'Ao renomear `z = z * 0.5m` para `total = total * 0.5m` dentro do `if (urgente)`, a frase fica absurda: urgente cobrando metade.',
        'Acrescentar 50 por cento é multiplicar por `1.5m`.',
      ],
      tests: [
        {
          name: 'Peso e distancia medios',
          stdin: '10\n100\n',
          expectedStdout:
            'normal: 70.00\nurgente: 105.00\nurgente custa mais: True\n' +
            'peso zero normal: 50.00\ntudo zero: 0.00',
        },
        {
          name: 'Valores pequenos',
          stdin: '1\n10\n',
          expectedStdout:
            'normal: 7.00\nurgente: 10.50\nurgente custa mais: True\n' +
            'peso zero normal: 5.00\ntudo zero: 0.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c05l02',
    title: 'Funções curtas',
    objective: 'Quebrar um método longo em partes com nome, cada uma fazendo uma coisa.',
    concept: [
      {
        kind: 'text',
        body:
          'Um método longo é difícil de entender porque exige manter muitas coisas na cabeça ao mesmo tempo. Quebrá-lo em partes nomeadas transfere esse esforço para os nomes.',
      },
      {
        kind: 'compare',
        good: `static Relatorio Gerar(Pedido p)
{
    var itens = Validar(p);
    var total = Somar(itens);
    var imposto = Tributar(total);

    return Montar(total, imposto);
}`,
        bad: `static Relatorio Gerar(Pedido p)
{
    // 40 linhas validando
    // 20 linhas somando
    // 15 linhas calculando imposto
    // 25 linhas montando
}`,
        goodLabel: 'O corpo lê como um resumo',
        badLabel: 'Cem linhas de detalhe',
      },
      {
        kind: 'text',
        body:
          'O sinal mais confiável de que um método faz coisas demais são os **comentários de seção** dentro dele. Cada `// agora valida` marca exatamente onde um método novo deveria começar — e o comentário vira o nome dele.',
      },
      {
        kind: 'table',
        headers: ['Sintoma', 'Sugere'],
        rows: [
          ['comentários dividindo o corpo', 'extrair cada seção'],
          ['muitas variáveis locais', 'o método guarda estado demais'],
          ['aninhamento profundo', 'extrair os blocos internos'],
          ['difícil de nomear', 'o método faz mais de uma coisa'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A última linha é o melhor teste. Se você não consegue dar ao método um nome que descreva tudo que ele faz **sem usar "e"**, ele deveria ser mais de um método.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Não persiga um número mágico de linhas. Extrair demais produz uma cadeia de métodos de uma linha cada, em que seguir o fluxo exige pular por dez arquivos. O critério é coesão, não tamanho.',
      },
    ],
    quiz: [
      {
        id: 's06c05l02q1',
        type: 'single',
        prompt: 'Qual é o sinal mais confiável de que um método faz coisas demais?',
        options: [
          { id: 'a', text: 'Comentários de seção dividindo o corpo.', correct: true },
          { id: 'b', text: 'Ter mais de 20 linhas.' },
          { id: 'c', text: 'Ter mais de dois parâmetros.' },
          { id: 'd', text: 'Devolver `void`.' },
        ],
        explanation:
          'Cada comentário de seção marca uma responsabilidade separada — e já vem com o nome do método que deveria existir.',
      },
      {
        id: 's06c05l02q2',
        type: 'single',
        prompt: 'Qual é o melhor teste para saber se um método deveria ser dividido?',
        options: [
          { id: 'a', text: 'Não conseguir nomeá-lo sem usar "e".', correct: true },
          { id: 'b', text: 'Contar as linhas.' },
          { id: 'c', text: 'Verificar quantas variáveis ele tem.' },
          { id: 'd', text: 'Medir quanto tempo ele leva.' },
        ],
        explanation:
          '"Validar e somar e formatar" descreve três métodos. O "e" é a fronteira entre responsabilidades.',
      },
      {
        id: 's06c05l02q3',
        type: 'single',
        prompt: 'Qual é o risco de extrair demais?',
        options: [
          { id: 'a', text: 'Seguir o fluxo passa a exigir pular por muitos métodos minúsculos.', correct: true },
          { id: 'b', text: 'O programa fica mais lento.' },
          { id: 'c', text: 'Aumenta o número de bugs.' },
          { id: 'd', text: 'Não há risco.' },
        ],
        explanation:
          'O critério é coesão. Um método que só existe para envolver uma linha usada em um lugar só costuma atrapalhar.',
      },
    ],
    challenge: {
      brief:
        'Quebre um método longo em partes nomeadas. Ao isolar a seção de estatísticas, um erro escondido no meio do bloco vai aparecer.',
      requirements: [
        '`ProcessarNotas(List<int> notas)` imprime o relatório completo',
        'O relatório tem quatro seções: contagem, média, extremos e situação',
        'Cada seção vira um método próprio com nome descritivo',
        'A média é a soma dividida pela quantidade; lista vazia imprime `media: 0`',
        'Os extremos são a menor e a maior nota; lista vazia imprime `menor: 0` e `maior: 0`',
        'A situação é `aprovado` quando a média é maior ou igual a `6`, senão `reprovado`',
        'O código entregue tem um bug na busca do menor valor — corrija',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Este metodo faz quatro coisas. Quebre-o em quatro metodos nomeados.
    // Ao isolar a secao de extremos, um bug vai ficar evidente.
    static void ProcessarNotas(List<int> notas)
    {
        // contagem
        Console.WriteLine($"quantidade: {notas.Count}");

        // media
        int soma = 0;
        foreach (int n in notas) { soma += n; }
        int media = notas.Count == 0 ? 0 : soma / notas.Count;
        Console.WriteLine($"media: {media}");

        // extremos
        int menor = 0;
        int maior = 0;
        if (notas.Count > 0)
        {
            maior = notas[0];
            foreach (int n in notas) { if (n > maior) { maior = n; } }
            foreach (int n in notas) { if (n < menor) { menor = n; } }
        }
        Console.WriteLine($"menor: {menor}");
        Console.WriteLine($"maior: {maior}");

        // situacao
        Console.WriteLine($"situacao: {(media >= 6 ? "aprovado" : "reprovado")}");
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> notas = new List<int>();

        for (int i = 0; i < n; i++)
        {
            notas.Add(int.Parse(Console.ReadLine()));
        }

        ProcessarNotas(notas);
        Console.WriteLine("---");
        ProcessarNotas(new List<int>());
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void ImprimirContagem(List<int> notas)
    {
        Console.WriteLine($"quantidade: {notas.Count}");
    }

    static int CalcularMedia(List<int> notas)
    {
        if (notas.Count == 0)
        {
            return 0;
        }

        int soma = 0;

        foreach (int nota in notas)
        {
            soma += nota;
        }

        return soma / notas.Count;
    }

    static int MenorNota(List<int> notas)
    {
        if (notas.Count == 0)
        {
            return 0;
        }

        int menor = notas[0];

        foreach (int nota in notas)
        {
            if (nota < menor)
            {
                menor = nota;
            }
        }

        return menor;
    }

    static int MaiorNota(List<int> notas)
    {
        if (notas.Count == 0)
        {
            return 0;
        }

        int maior = notas[0];

        foreach (int nota in notas)
        {
            if (nota > maior)
            {
                maior = nota;
            }
        }

        return maior;
    }

    static void ImprimirExtremos(List<int> notas)
    {
        Console.WriteLine($"menor: {MenorNota(notas)}");
        Console.WriteLine($"maior: {MaiorNota(notas)}");
    }

    static void ImprimirSituacao(int media)
    {
        Console.WriteLine($"situacao: {(media >= 6 ? "aprovado" : "reprovado")}");
    }

    static void ProcessarNotas(List<int> notas)
    {
        ImprimirContagem(notas);

        int media = CalcularMedia(notas);
        Console.WriteLine($"media: {media}");

        ImprimirExtremos(notas);
        ImprimirSituacao(media);
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> notas = new List<int>();

        for (int i = 0; i < n; i++)
        {
            notas.Add(int.Parse(Console.ReadLine()));
        }

        ProcessarNotas(notas);
        Console.WriteLine("---");
        ProcessarNotas(new List<int>());
    }
}
`,
      hints: [
        'Cada comentário de seção do código original é o nome de um método novo.',
        'Ao extrair `MenorNota`, repare que ela começa o candidato em `0` enquanto `MaiorNota` começa em `notas[0]` — só uma das duas está certa.',
        'O menor deve começar no primeiro elemento, igual ao maior.',
      ],
      tests: [
        {
          name: 'Notas todas positivas',
          stdin: '4\n7\n9\n5\n8\n',
          expectedStdout:
            'quantidade: 4\nmedia: 7\nmenor: 5\nmaior: 9\nsituacao: aprovado\n---\n' +
            'quantidade: 0\nmedia: 0\nmenor: 0\nmaior: 0\nsituacao: reprovado',
        },
        {
          name: 'Notas baixas',
          stdin: '3\n3\n4\n2\n',
          expectedStdout:
            'quantidade: 3\nmedia: 3\nmenor: 2\nmaior: 4\nsituacao: reprovado\n---\n' +
            'quantidade: 0\nmedia: 0\nmenor: 0\nmaior: 0\nsituacao: reprovado',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c05l03',
    title: 'Reduzindo aninhamento',
    objective: 'Achatar estruturas profundas, deixando o caminho principal visível.',
    concept: [
      {
        kind: 'text',
        body:
          'Cada nível de aninhamento é um contexto que o leitor precisa carregar. Três níveis já são difíceis; cinco são praticamente ilegíveis.',
      },
      {
        kind: 'table',
        headers: ['Técnica', 'Elimina'],
        rows: [
          ['guard clause', 'o `if` que envolve tudo'],
          ['`continue`', 'o `if` que envolve o corpo do laço'],
          ['extrair método', 'o bloco interno inteiro'],
          ['inverter condição', 'o `else` distante'],
        ],
      },
      {
        kind: 'compare',
        good: `foreach (var p in pedidos)
{
    if (p == null) continue;
    if (!p.Ativo) continue;
    if (p.Total <= 0) continue;

    Processar(p);
}`,
        bad: `foreach (var p in pedidos)
{
    if (p != null)
    {
        if (p.Ativo)
        {
            if (p.Total > 0)
            {
                Processar(p);
            }
        }
    }
}`,
        goodLabel: 'Filtros no topo',
        badLabel: 'Pirâmide de `if`',
      },
      {
        kind: 'text',
        body:
          'O `continue` faz dentro de laços o que a guard clause faz em métodos: descarta o caso que não interessa imediatamente, e o corpo do laço fica no nível zero.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um bom alvo é manter no máximo **dois** níveis dentro de um método. Ao passar disso, quase sempre existe um bloco interno que merece virar um método com nome.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Reduzir aninhamento com condições combinadas por `&&` pode piorar: um `if` com cinco condições encadeadas é tão difícil quanto a pirâmide. Prefira várias saídas separadas, cada uma com um motivo.',
      },
    ],
    quiz: [
      {
        id: 's06c05l03q1',
        type: 'single',
        prompt: 'O que o `continue` faz dentro de um laço?',
        options: [
          { id: 'a', text: 'Descarta o item atual e segue para o próximo, evitando aninhar o corpo.', correct: true },
          { id: 'b', text: 'Encerra o laço.' },
          { id: 'c', text: 'Reinicia o laço do começo.' },
          { id: 'd', text: 'Pula duas iterações.' },
        ],
        explanation:
          'É a guard clause aplicada a laços: o caso indesejado sai cedo e o corpo principal fica sem recuo.',
      },
      {
        id: 's06c05l03q2',
        type: 'single',
        prompt: 'Qual é um bom limite de níveis de aninhamento em um método?',
        options: [
          { id: 'a', text: 'Dois.', correct: true },
          { id: 'b', text: 'Cinco.' },
          { id: 'c', text: 'Um.' },
          { id: 'd', text: 'Não há limite razoável.' },
        ],
        explanation:
          'Passando de dois, quase sempre há um bloco interno que ficaria melhor como método nomeado.',
      },
      {
        id: 's06c05l03q3',
        type: 'single',
        prompt: 'Por que juntar cinco condições com `&&` nem sempre melhora?',
        options: [
          { id: 'a', text: 'Porque um `if` com cinco condições é tão difícil quanto a pirâmide.', correct: true },
          { id: 'b', text: 'Porque `&&` é mais lento.' },
          { id: 'c', text: 'Porque perde o curto-circuito.' },
          { id: 'd', text: 'Porque não compila com mais de três.' },
        ],
        explanation:
          'Saídas separadas mantêm cada motivo de rejeição visível e permitem tratar cada um de forma diferente.',
      },
    ],
    challenge: {
      brief:
        'Ache um processamento com quatro níveis de aninhamento. Ao achatar, o `else` mais distante vai revelar que trata o caso errado.',
      requirements: [
        '`Processar(List<string> entradas)` devolve a quantidade de entradas aceitas e imprime o motivo de cada rejeição',
        'Entrada nula imprime `rejeitado: nula`',
        'Entrada em branco imprime `rejeitado: vazia`',
        'Entrada que não converte para inteiro imprime `rejeitado: nao numerica`',
        'Valor negativo imprime `rejeitado: negativo`',
        'Valor aceito imprime `aceito: N` e conta',
        'O código entregue tem um bug: uma das rejeições reporta o motivo errado — corrija',
        'O método usa no máximo dois níveis de aninhamento',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Quatro niveis de aninhamento. Achate usando continue.
    // Ao fazer isso, um dos motivos de rejeicao vai se revelar trocado.
    static int Processar(List<string> entradas)
    {
        int aceitos = 0;

        foreach (string entrada in entradas)
        {
            if (entrada != null)
            {
                if (entrada.Trim().Length > 0)
                {
                    if (int.TryParse(entrada, out int valor))
                    {
                        if (valor >= 0)
                        {
                            Console.WriteLine($"aceito: {valor}");
                            aceitos++;
                        }
                        else
                        {
                            Console.WriteLine("rejeitado: nao numerica");
                        }
                    }
                    else
                    {
                        Console.WriteLine("rejeitado: negativo");
                    }
                }
                else
                {
                    Console.WriteLine("rejeitado: vazia");
                }
            }
            else
            {
                Console.WriteLine("rejeitado: nula");
            }
        }

        return aceitos;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<string> entradas = new List<string>();

        for (int i = 0; i < n; i++)
        {
            entradas.Add(Console.ReadLine());
        }

        entradas.Add(null);

        Console.WriteLine($"aceitos: {Processar(entradas)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static int Processar(List<string> entradas)
    {
        int aceitos = 0;

        foreach (string entrada in entradas)
        {
            if (entrada == null)
            {
                Console.WriteLine("rejeitado: nula");
                continue;
            }

            if (entrada.Trim().Length == 0)
            {
                Console.WriteLine("rejeitado: vazia");
                continue;
            }

            if (!int.TryParse(entrada, out int valor))
            {
                Console.WriteLine("rejeitado: nao numerica");
                continue;
            }

            if (valor < 0)
            {
                Console.WriteLine("rejeitado: negativo");
                continue;
            }

            Console.WriteLine($"aceito: {valor}");
            aceitos++;
        }

        return aceitos;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<string> entradas = new List<string>();

        for (int i = 0; i < n; i++)
        {
            entradas.Add(Console.ReadLine());
        }

        entradas.Add(null);

        Console.WriteLine($"aceitos: {Processar(entradas)}");
    }
}
`,
      hints: [
        'Cada `if` aninhado vira uma verificação invertida seguida de `continue`.',
        'Repare nos dois `else` mais internos do código original: a mensagem de cada um pertence ao outro.',
        'O `else` do `TryParse` deve dizer `nao numerica`, e o do `valor >= 0` deve dizer `negativo`.',
      ],
      tests: [
        {
          name: 'Entradas variadas',
          stdin: '5\n10\nabc\n-5\n\n20\n',
          expectedStdout:
            'aceito: 10\nrejeitado: nao numerica\nrejeitado: negativo\nrejeitado: vazia\n' +
            'aceito: 20\nrejeitado: nula\naceitos: 2',
        },
        {
          name: 'Todas validas',
          stdin: '2\n1\n0\n',
          expectedStdout:
            'aceito: 1\naceito: 0\nrejeitado: nula\naceitos: 2',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c05l04',
    title: 'Eliminando números mágicos',
    objective: 'Substituir valores literais soltos por constantes com nome.',
    concept: [
      {
        kind: 'text',
        body:
          'Um **número mágico** é um literal no meio do código cujo significado só existe na cabeça de quem escreveu. Ele é difícil de entender e perigoso de alterar.',
      },
      {
        kind: 'compare',
        good: `const int IdadeMinima = 18;
const decimal TaxaJuros = 0.05m;
const int MaxTentativas = 3;

if (idade < IdadeMinima) { }`,
        bad: `if (idade < 18) { }
valor *= 1.05m;
if (tentativas > 3) { }`,
        goodLabel: 'Constante com nome',
        badLabel: 'Literais espalhados',
      },
      {
        kind: 'text',
        body:
          'O perigo real aparece na alteração. Quando o mesmo `18` aparece em sete lugares e apenas cinco deles significam idade mínima, mudar todos quebra o programa — e mudar alguns cria uma inconsistência silenciosa.',
      },
      {
        kind: 'table',
        headers: ['Literal', 'Precisa de nome?'],
        rows: [
          ['`0` e `1` em índices e contadores', 'não'],
          ['`2` em uma divisão pela metade', 'geralmente não'],
          ['qualquer valor de regra de negócio', '**sim**'],
          ['qualquer valor repetido', '**sim**'],
          ['texto usado como chave', '**sim**'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O ganho maior não é a facilidade de alterar — é a **documentação**. `TaxaJurosMensal` explica o que aquele `0.05m` significa sem que ninguém precise perguntar.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Nomear pelo valor não resolve nada: `const int Dezoito = 18` é tão opaco quanto o literal. O nome deve descrever o **significado**, não o conteúdo.',
      },
    ],
    quiz: [
      {
        id: 's06c05l04q1',
        type: 'single',
        prompt: 'Qual é o maior perigo de um número mágico repetido?',
        options: [
          { id: 'a', text: 'Alterar alguns e não todos, criando inconsistência silenciosa.', correct: true },
          { id: 'b', text: 'Consumir mais memória.' },
          { id: 'c', text: 'Deixar o código mais lento.' },
          { id: 'd', text: 'Impedir a compilação.' },
        ],
        explanation:
          'Uma busca por `18` também encontra os que significam outra coisa, e distinguir depende de ler cada caso.',
      },
      {
        id: 's06c05l04q2',
        type: 'single',
        prompt: 'Qual literal normalmente **não** precisa de nome?',
        options: [
          { id: 'a', text: 'O `0` de um índice inicial.', correct: true },
          { id: 'b', text: 'A taxa de juros.' },
          { id: 'c', text: 'O limite de tentativas.' },
          { id: 'd', text: 'A idade mínima.' },
        ],
        explanation:
          'Índices e incrementos são idiomáticos: `0` e `1` ali já significam exatamente o que aparentam.',
      },
      {
        id: 's06c05l04q3',
        type: 'single',
        prompt: 'Por que `const int Dezoito = 18` não resolve o problema?',
        options: [
          { id: 'a', text: 'Porque o nome descreve o valor, não o significado.', correct: true },
          { id: 'b', text: 'Porque constantes não podem ser numéricas.' },
          { id: 'c', text: 'Porque o nome é muito curto.' },
          { id: 'd', text: 'Ele resolve.' },
        ],
        explanation:
          'Se o valor mudar para 21, o nome passa a mentir — e o leitor continua sem saber o que ele representa.',
      },
    ],
    challenge: {
      brief:
        'Extraia constantes nomeadas de um cálculo cheio de literais. Ao nomeá-los, dois valores iguais vão se revelar conceitos diferentes — e um deles está errado.',
      requirements: [
        '`CalcularSalario(decimal bruto, int dependentes, int anosCasa)` devolve o salário líquido',
        'O desconto de INSS é 11 por cento do bruto',
        'Cada dependente abate `200` da base de imposto',
        'O imposto é 15 por cento da base após o abatimento, nunca negativo',
        'Quem tem `5` anos de casa ou mais recebe um bônus de 10 por cento do bruto',
        'Todos os valores de regra de negócio são constantes nomeadas',
        'O código entregue usa o mesmo literal para dois conceitos distintos, e um deles está com o valor errado — corrija',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Cheio de numeros magicos. Extraia constantes com nomes que digam
    // o que cada valor significa. Dois literais iguais representam
    // conceitos diferentes, e um deles esta com o valor errado.
    static decimal CalcularSalario(decimal bruto, int dependentes, int anosCasa)
    {
        decimal inss = bruto * 0.11m;
        decimal baseImposto = bruto - inss - dependentes * 200;

        if (baseImposto < 0)
        {
            baseImposto = 0;
        }

        decimal imposto = baseImposto * 0.11m;

        decimal liquido = bruto - inss - imposto;

        if (anosCasa >= 5)
        {
            liquido += bruto * 0.1m;
        }

        return liquido;
    }

    static void Main()
    {
        decimal bruto = decimal.Parse(Console.ReadLine());
        int dependentes = int.Parse(Console.ReadLine());
        int anos = int.Parse(Console.ReadLine());

        Console.WriteLine($"liquido: {CalcularSalario(bruto, dependentes, anos):F2}");
        Console.WriteLine($"sem dependentes: {CalcularSalario(bruto, 0, anos):F2}");
        Console.WriteLine($"com bonus: {CalcularSalario(bruto, dependentes, 10):F2}");
        Console.WriteLine($"sem bonus: {CalcularSalario(bruto, dependentes, 1):F2}");
        Console.WriteLine($"muitos dependentes: {CalcularSalario(bruto, 100, 0):F2}");
    }
}
`,
      solution: `using System;

class Program
{
    const decimal AliquotaInss = 0.11m;
    const decimal AliquotaImposto = 0.15m;
    const decimal AbatimentoPorDependente = 200m;
    const int AnosParaBonus = 5;
    const decimal PercentualBonus = 0.1m;

    static decimal CalcularSalario(decimal bruto, int dependentes, int anosCasa)
    {
        decimal inss = bruto * AliquotaInss;
        decimal baseImposto = bruto - inss - dependentes * AbatimentoPorDependente;

        if (baseImposto < 0)
        {
            baseImposto = 0;
        }

        decimal imposto = baseImposto * AliquotaImposto;

        decimal liquido = bruto - inss - imposto;

        if (anosCasa >= AnosParaBonus)
        {
            liquido += bruto * PercentualBonus;
        }

        return liquido;
    }

    static void Main()
    {
        decimal bruto = decimal.Parse(Console.ReadLine());
        int dependentes = int.Parse(Console.ReadLine());
        int anos = int.Parse(Console.ReadLine());

        Console.WriteLine($"liquido: {CalcularSalario(bruto, dependentes, anos):F2}");
        Console.WriteLine($"sem dependentes: {CalcularSalario(bruto, 0, anos):F2}");
        Console.WriteLine($"com bonus: {CalcularSalario(bruto, dependentes, 10):F2}");
        Console.WriteLine($"sem bonus: {CalcularSalario(bruto, dependentes, 1):F2}");
        Console.WriteLine($"muitos dependentes: {CalcularSalario(bruto, 100, 0):F2}");
    }
}
`,
      hints: [
        'O `0.11m` aparece duas vezes, mas uma é alíquota de INSS e a outra deveria ser a de imposto.',
        'Ao criar `AliquotaInss` e `AliquotaImposto` separadas, fica claro que a segunda deveria valer `0.15m`.',
        'Constantes ficam no nível da classe, antes dos métodos.',
      ],
      tests: [
        {
          name: 'Salario com dependentes',
          stdin: '5000\n2\n3\n',
          expectedStdout:
            'liquido: 3842.50\nsem dependentes: 3782.50\ncom bonus: 4342.50\n' +
            'sem bonus: 3842.50\nmuitos dependentes: 4450.00',
        },
        {
          name: 'Salario menor',
          stdin: '2000\n1\n6\n',
          expectedStdout:
            'liquido: 1743.00\nsem dependentes: 1713.00\ncom bonus: 1743.00\n' +
            'sem bonus: 1543.00\nmuitos dependentes: 1780.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c05l05',
    title: 'Comentários que valem a pena',
    objective: 'Distinguir o comentário que acrescenta informação do que apenas repete o código.',
    concept: [
      {
        kind: 'text',
        body:
          'A regra que resolve a maioria dos casos: o código diz **o que** acontece; o comentário diz **por que**. Comentário que explica o "o quê" está competindo com o código — e vai perder.',
      },
      {
        kind: 'compare',
        good: `// A API externa rejeita mais de
// 100 itens por chamada, entao
// enviamos em blocos.
EnviarEmBlocos(itens, 100);`,
        bad: `// incrementa o contador
contador++;

// verifica se e maior que zero
if (valor > 0)`,
        goodLabel: 'Explica o porquê',
        badLabel: 'Repete o código em português',
      },
      {
        kind: 'table',
        headers: ['Vale a pena comentar', 'Não vale'],
        rows: [
          ['a razão de uma decisão estranha', 'o que a linha faz'],
          ['uma restrição externa', 'o nome da variável'],
          ['um caso especial não óbvio', 'código autoexplicativo'],
          ['uma referência a documento ou regra', 'o óbvio'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O maior problema de comentários é que eles **não são verificados**. O código muda, o comentário fica, e um dia o comentário está mentindo. Um comentário desatualizado é pior que nenhum.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Antes de escrever um comentário explicativo, tente eliminar a necessidade dele: um nome melhor, um método extraído, uma constante nomeada. O comentário é a última opção, não a primeira.',
      },
      {
        kind: 'text',
        body:
          'Uma exceção clara: documentação pública de API, com `///`, tem outro propósito. Ela descreve o contrato para quem vai usar sem ler a implementação — e aí descrever o "o quê" é exatamente o trabalho.',
      },
    ],
    quiz: [
      {
        id: 's06c05l05q1',
        type: 'single',
        prompt: 'O que um bom comentário deve explicar?',
        options: [
          { id: 'a', text: 'Por que o código faz aquilo.', correct: true },
          { id: 'b', text: 'O que cada linha faz.' },
          { id: 'c', text: 'Quem escreveu e quando.' },
          { id: 'd', text: 'Qual o tipo das variáveis.' },
        ],
        explanation:
          'O "o quê" já está no código, e melhor escrito. O "porquê" é a informação que se perde sem comentário.',
      },
      {
        id: 's06c05l05q2',
        type: 'single',
        prompt: 'Por que um comentário desatualizado é pior que nenhum?',
        options: [
          { id: 'a', text: 'Porque ele mente, e ninguém o verifica.', correct: true },
          { id: 'b', text: 'Porque ocupa espaço.' },
          { id: 'c', text: 'Porque atrasa a compilação.' },
          { id: 'd', text: 'Porque confunde o depurador.' },
        ],
        explanation:
          'O compilador verifica o código, não o comentário. Um comentário errado é aceito para sempre.',
      },
      {
        id: 's06c05l05q3',
        type: 'single',
        prompt: 'O que tentar antes de escrever um comentário explicativo?',
        options: [
          { id: 'a', text: 'Melhorar o nome, extrair um método ou nomear uma constante.', correct: true },
          { id: 'b', text: 'Escrever um teste.' },
          { id: 'c', text: 'Simplificar o algoritmo.' },
          { id: 'd', text: 'Perguntar a um colega.' },
        ],
        explanation:
          'Código que se explica sozinho não pode ficar desatualizado em relação a si mesmo.',
      },
    ],
    challenge: {
      brief:
        'Limpe os comentários de um método: remova os redundantes, mantenha os que explicam o porquê, e descubra o comentário que está mentindo.',
      requirements: [
        '`AplicarDesconto(decimal valor, int quantidade, bool primeiraCompra)` devolve o valor final',
        'Compras de `10` unidades ou mais recebem 15 por cento de desconto',
        'Primeira compra recebe `20` de desconto fixo, aplicado depois do percentual',
        'O valor final nunca é negativo',
        'Comentários que apenas repetem o código são removidos',
        'O comentário que explica a razão do limite de quantidade é mantido',
        'Um dos comentários descreve um comportamento que o código não tem — o código está certo e o comentário mente; remova-o',
        'A saída deve continuar idêntica à do código original',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static decimal AplicarDesconto(decimal valor, int quantidade, bool primeiraCompra)
    {
        // declara a variavel final
        decimal final = valor;

        // verifica se a quantidade e maior ou igual a 10
        if (quantidade >= 10)
        {
            // O limite de 10 unidades veio da politica comercial de 2023:
            // abaixo disso a margem nao cobre o custo de envio.
            final = final * 0.85m;
        }

        // aplica 30 de desconto na primeira compra
        if (primeiraCompra)
        {
            final = final - 20;
        }

        // se for menor que zero, zera
        if (final < 0)
        {
            final = 0;
        }

        // retorna o valor final
        return final;
    }

    static void Main()
    {
        decimal valor = decimal.Parse(Console.ReadLine());
        int quantidade = int.Parse(Console.ReadLine());

        Console.WriteLine($"normal: {AplicarDesconto(valor, quantidade, false):F2}");
        Console.WriteLine($"primeira compra: {AplicarDesconto(valor, quantidade, true):F2}");
        Console.WriteLine($"atacado: {AplicarDesconto(valor, 10, false):F2}");
        Console.WriteLine($"atacado primeira: {AplicarDesconto(valor, 10, true):F2}");
        Console.WriteLine($"valor baixo: {AplicarDesconto(5, 1, true):F2}");
    }
}
`,
      solution: `using System;

class Program
{
    static decimal AplicarDesconto(decimal valor, int quantidade, bool primeiraCompra)
    {
        decimal final = valor;

        if (quantidade >= 10)
        {
            // O limite de 10 unidades veio da politica comercial de 2023:
            // abaixo disso a margem nao cobre o custo de envio.
            final = final * 0.85m;
        }

        if (primeiraCompra)
        {
            final = final - 20;
        }

        if (final < 0)
        {
            final = 0;
        }

        return final;
    }

    static void Main()
    {
        decimal valor = decimal.Parse(Console.ReadLine());
        int quantidade = int.Parse(Console.ReadLine());

        Console.WriteLine($"normal: {AplicarDesconto(valor, quantidade, false):F2}");
        Console.WriteLine($"primeira compra: {AplicarDesconto(valor, quantidade, true):F2}");
        Console.WriteLine($"atacado: {AplicarDesconto(valor, 10, false):F2}");
        Console.WriteLine($"atacado primeira: {AplicarDesconto(valor, 10, true):F2}");
        Console.WriteLine($"valor baixo: {AplicarDesconto(5, 1, true):F2}");
    }
}
`,
      hints: [
        'O comentário sobre a política comercial de 2023 é o único que carrega informação que o código não tem.',
        'O comentário que diz "aplica 30 de desconto" contradiz o código, que subtrai `20` — o código está correto.',
        'O comportamento não muda: esta refatoração mexe apenas nos comentários.',
      ],
      tests: [
        {
          name: 'Compra comum',
          stdin: '100\n5\n',
          expectedStdout:
            'normal: 100.00\nprimeira compra: 80.00\natacado: 85.00\n' +
            'atacado primeira: 65.00\nvalor baixo: 0.00',
        },
        {
          name: 'Valor maior',
          stdin: '200\n12\n',
          expectedStdout:
            'normal: 170.00\nprimeira compra: 150.00\natacado: 170.00\n' +
            'atacado primeira: 150.00\nvalor baixo: 0.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c05l06',
    title: 'Retorno antecipado',
    objective: 'Sair do método assim que a resposta é conhecida, em vez de acumular a decisão em uma variável.',
    concept: [
      {
        kind: 'text',
        body:
          'O **retorno antecipado** devolve o resultado no momento em que ele fica determinado. Isso elimina a variável de resultado e o caminho que ela precisa percorrer até o fim.',
      },
      {
        kind: 'compare',
        good: `foreach (var item in itens)
{
    if (item.Id == alvo)
        return item;
}

return null;`,
        bad: `Item achado = null;

foreach (var item in itens)
{
    if (item.Id == alvo && achado == null)
        achado = item;
}

return achado;`,
        goodLabel: 'Sai quando encontra',
        badLabel: 'Continua o laço à toa',
      },
      {
        kind: 'text',
        body:
          'Além de mais claro, é mais eficiente: a versão com retorno antecipado para de percorrer assim que encontra, enquanto a outra visita a coleção inteira mesmo já tendo a resposta.',
      },
      {
        kind: 'table',
        headers: ['Padrão', 'Substituir por'],
        rows: [
          ['variável de resultado atualizada uma vez', 'retorno direto'],
          ['flag booleana que controla o laço', '`return` de dentro do laço'],
          ['`if`/`else` que só atribuem', 'dois `return`'],
          ['variável usada só na última linha', 'devolver a expressão'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Existe uma antiga recomendação de "uma única saída por método". Ela fazia sentido em linguagens sem gerenciamento automático de recursos; em C#, com `using` e `finally`, ela só produz aninhamento desnecessário.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Retornos antecipados demais em um método longo dificultam ver todos os caminhos de saída. O problema aí não é o retorno — é o método ser longo demais.',
      },
    ],
    quiz: [
      {
        id: 's06c05l06q1',
        type: 'single',
        prompt: 'Além da clareza, qual é a vantagem do retorno antecipado em uma busca?',
        options: [
          { id: 'a', text: 'Para de percorrer assim que encontra.', correct: true },
          { id: 'b', text: 'Usa menos memória.' },
          { id: 'c', text: 'Evita exceções.' },
          { id: 'd', text: 'Permite ordenar a coleção.' },
        ],
        explanation:
          'A versão com variável acumuladora percorre tudo mesmo já tendo a resposta na primeira posição.',
      },
      {
        id: 's06c05l06q2',
        type: 'single',
        prompt: 'Por que a regra de "uma única saída por método" perdeu força?',
        options: [
          { id: 'a', text: 'Porque `using` e `finally` já garantem a limpeza em qualquer saída.', correct: true },
          { id: 'b', text: 'Porque os compiladores ficaram mais rápidos.' },
          { id: 'c', text: 'Porque métodos ficaram maiores.' },
          { id: 'd', text: 'Ela não perdeu força.' },
        ],
        explanation:
          'A regra existia para garantir a liberação de recursos. Com o descarte automático, ela só acrescenta aninhamento.',
      },
      {
        id: 's06c05l06q3',
        type: 'single',
        prompt: 'Muitos retornos em um método dificultam a leitura. Qual é o problema real?',
        options: [
          { id: 'a', text: 'O método ser longo demais.', correct: true },
          { id: 'b', text: 'O uso de `return`.' },
          { id: 'c', text: 'A falta de uma variável de resultado.' },
          { id: 'd', text: 'A ausência de `else`.' },
        ],
        explanation:
          'Em um método curto, cinco retornos são visíveis de uma vez. Em um de cem linhas, nada é visível de uma vez.',
      },
    ],
    challenge: {
      brief:
        'Substitua variáveis acumuladoras por retornos diretos. Ao remover a flag de controle, um caso que ela mascarava vai aparecer.',
      requirements: [
        '`PrimeiroNegativo(List<int> valores)` devolve o índice do primeiro valor negativo, ou `-1` se não houver',
        '`TodosPositivos(List<int> valores)` devolve se todos os valores são maiores que zero; lista vazia devolve `true`',
        '`Classificar(int nota)` devolve `A`, `B`, `C` ou `F` conforme a nota, usando retornos diretos',
        'Nenhum dos três usa variável acumuladora nem flag de controle',
        'O código entregue tem um bug: `PrimeiroNegativo` devolve o índice do **último** negativo — corrija',
        'Todos param de percorrer assim que a resposta é conhecida',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // BUG: apesar do nome, este metodo devolve o indice do ULTIMO negativo.
    // Ao trocar a variavel acumuladora por retorno antecipado, o bug some sozinho.
    static int PrimeiroNegativo(List<int> valores)
    {
        int achado = -1;

        for (int i = 0; i < valores.Count; i++)
        {
            if (valores[i] < 0)
            {
                achado = i;
            }
        }

        return achado;
    }

    // Reescreva com retorno antecipado
    static bool TodosPositivos(List<int> valores)
    {
        bool todos = true;

        foreach (int valor in valores)
        {
            if (valor <= 0)
            {
                todos = false;
            }
        }

        return todos;
    }

    // Reescreva com retornos diretos
    static string Classificar(int nota)
    {
        string resultado;

        if (nota >= 90)
        {
            resultado = "A";
        }
        else
        {
            if (nota >= 80)
            {
                resultado = "B";
            }
            else
            {
                if (nota >= 70)
                {
                    resultado = "C";
                }
                else
                {
                    resultado = "F";
                }
            }
        }

        return resultado;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> valores = new List<int>();

        for (int i = 0; i < n; i++)
        {
            valores.Add(int.Parse(Console.ReadLine()));
        }

        Console.WriteLine($"primeiro negativo: {PrimeiroNegativo(valores)}");
        Console.WriteLine($"todos positivos: {TodosPositivos(valores)}");
        Console.WriteLine($"lista vazia positivos: {TodosPositivos(new List<int>())}");
        Console.WriteLine($"sem negativos: {PrimeiroNegativo(new List<int> { 1, 2, 3 })}");
        Console.WriteLine($"nota 95: {Classificar(95)}");
        Console.WriteLine($"nota 85: {Classificar(85)}");
        Console.WriteLine($"nota 75: {Classificar(75)}");
        Console.WriteLine($"nota 50: {Classificar(50)}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static int PrimeiroNegativo(List<int> valores)
    {
        for (int i = 0; i < valores.Count; i++)
        {
            if (valores[i] < 0)
            {
                return i;
            }
        }

        return -1;
    }

    static bool TodosPositivos(List<int> valores)
    {
        foreach (int valor in valores)
        {
            if (valor <= 0)
            {
                return false;
            }
        }

        return true;
    }

    static string Classificar(int nota)
    {
        if (nota >= 90) return "A";
        if (nota >= 80) return "B";
        if (nota >= 70) return "C";
        return "F";
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> valores = new List<int>();

        for (int i = 0; i < n; i++)
        {
            valores.Add(int.Parse(Console.ReadLine()));
        }

        Console.WriteLine($"primeiro negativo: {PrimeiroNegativo(valores)}");
        Console.WriteLine($"todos positivos: {TodosPositivos(valores)}");
        Console.WriteLine($"lista vazia positivos: {TodosPositivos(new List<int>())}");
        Console.WriteLine($"sem negativos: {PrimeiroNegativo(new List<int> { 1, 2, 3 })}");
        Console.WriteLine($"nota 95: {Classificar(95)}");
        Console.WriteLine($"nota 85: {Classificar(85)}");
        Console.WriteLine($"nota 75: {Classificar(75)}");
        Console.WriteLine($"nota 50: {Classificar(50)}");
      }
}
`,
      hints: [
        'No `PrimeiroNegativo`, trocar `achado = i` por `return i` já corrige o bug: o primeiro encontrado sai imediatamente.',
        'O `TodosPositivos` inverte a lógica: encontrou um que falha, devolve `false` na hora.',
        'A cadeia de `if` do `Classificar` fica plana porque cada `return` já descarta os casos anteriores.',
      ],
      tests: [
        {
          name: 'Com dois negativos',
          stdin: '5\n3\n-1\n7\n-9\n2\n',
          expectedStdout:
            'primeiro negativo: 1\ntodos positivos: False\nlista vazia positivos: True\n' +
            'sem negativos: -1\nnota 95: A\nnota 85: B\nnota 75: C\nnota 50: F',
        },
        {
          name: 'Todos positivos',
          stdin: '3\n1\n2\n3\n',
          expectedStdout:
            'primeiro negativo: -1\ntodos positivos: True\nlista vazia positivos: True\n' +
            'sem negativos: -1\nnota 95: A\nnota 85: B\nnota 75: C\nnota 50: F',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c05l07',
    title: 'DRY sem exagero',
    objective: 'Eliminar duplicação real sem criar abstrações forçadas entre coisas apenas parecidas.',
    concept: [
      {
        kind: 'text',
        body:
          'DRY quer dizer *don\'t repeat yourself* — não se repita. É um bom princípio, e um dos mais mal aplicados: nem todo código parecido é duplicação.',
      },
      {
        kind: 'table',
        headers: ['', 'Duplicação real', 'Coincidência'],
        rows: [
          ['o código é igual', 'sim', 'sim'],
          ['muda pelo mesmo motivo', '**sim**', 'não'],
          ['unificar ajuda', 'sim', '**não**'],
        ],
      },
      {
        kind: 'text',
        body:
          'A pergunta decisiva é a do meio: **esses dois trechos mudariam pelo mesmo motivo?** Duas validações que hoje são idênticas mas pertencem a regras de negócio diferentes vão divergir — e unificá-las cria um método cheio de condicionais.',
      },
      {
        kind: 'compare',
        good: `// mesma regra, um lugar so
static bool CpfValido(string cpf)
{
    return cpf?.Length == 11;
}`,
        bad: `// duas regras diferentes que
// hoje sao iguais por acaso
static bool Valido(string v, bool ehCpf)
{
    if (ehCpf) return v?.Length == 11;
    return v?.Length == 11;
}`,
        goodLabel: 'Unificar o que é a mesma regra',
        badLabel: 'Unificar por parecença',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma abstração errada custa mais caro que duplicação. Duplicação é visível e fácil de resolver depois; uma abstração errada esconde a diferença e cria dependências entre partes que deveriam evoluir separadas.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O sinal de que a unificação foi forçada é o **parâmetro booleano de modo**. Um `bool ehCpf` que escolhe o comportamento indica que ali eram dois métodos.',
      },
      {
        kind: 'text',
        body:
          'A regra prática mais usada é esperar a terceira ocorrência. Duas parecenças ainda podem ser coincidência; três repetições costumam indicar um padrão real.',
      },
    ],
    quiz: [
      {
        id: 's06c05l07q1',
        type: 'single',
        prompt: 'Qual pergunta distingue duplicação real de coincidência?',
        options: [
          { id: 'a', text: 'Esses trechos mudariam pelo mesmo motivo?', correct: true },
          { id: 'b', text: 'Eles têm o mesmo número de linhas?' },
          { id: 'c', text: 'Eles estão no mesmo arquivo?' },
          { id: 'd', text: 'Eles são chamados com a mesma frequência?' },
        ],
        explanation:
          'Código igual que muda por motivos diferentes vai divergir. Unificar apenas adia e complica essa divergência.',
      },
      {
        id: 's06c05l07q2',
        type: 'single',
        prompt: 'Por que uma abstração errada custa mais que duplicação?',
        options: [
          { id: 'a', text: 'Porque ela esconde a diferença e acopla partes que deveriam evoluir separadas.', correct: true },
          { id: 'b', text: 'Porque ela ocupa mais memória.' },
          { id: 'c', text: 'Porque ela é mais difícil de compilar.' },
          { id: 'd', text: 'Ela não custa mais.' },
        ],
        explanation:
          'Duplicação é um problema visível com solução conhecida. Uma abstração errada precisa ser desfeita antes de qualquer coisa poder mudar.',
      },
      {
        id: 's06c05l07q3',
        type: 'single',
        prompt: 'Qual é o sinal de que uma unificação foi forçada?',
        options: [
          { id: 'a', text: 'Um parâmetro booleano que escolhe o comportamento.', correct: true },
          { id: 'b', text: 'O método ter mais de dez linhas.' },
          { id: 'c', text: 'O método ser estático.' },
          { id: 'd', text: 'O método ser chamado de dois lugares.' },
        ],
        explanation:
          'Um `bool modo` significa que existem dois comportamentos convivendo à força dentro de um método só.',
      },
    ],
    challenge: {
      brief:
        'Elimine a duplicação verdadeira de um código e resista a unificar o que só parece igual — porque uma das regras vai mudar.',
      requirements: [
        '`FormatarMoeda(decimal valor)` devolve `R$ X.XX`',
        '`TotalPedido(List<decimal> itens)` e `TotalOrcamento(List<decimal> itens)` somam a lista — esta soma é duplicação real e deve virar um método único',
        '`ValidarCpf(string valor)` aceita textos com exatamente `11` caracteres numéricos',
        '`ValidarTelefone(string valor)` aceita textos com exatamente `11` caracteres numéricos',
        'As duas validações **não** devem ser unificadas: elas mudam por motivos diferentes',
        'O `Main` demonstra a divergência aplicando ao telefone uma regra nova que o CPF não tem: recusar telefone que comece por `0`',
        'Nenhum método recebe parâmetro booleano de modo',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Escreva Somar, FormatarMoeda, TotalPedido, TotalOrcamento,
    // ValidarCpf e ValidarTelefone aqui.
    //
    // TotalPedido e TotalOrcamento repetem a MESMA soma: unifique.
    // ValidarCpf e ValidarTelefone parecem iguais, mas mudam por
    // motivos diferentes: mantenha separados.
    // O telefone tem uma regra a mais: nao pode comecar por 0.

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<decimal> itens = new List<decimal>();

        for (int i = 0; i < n; i++)
        {
            itens.Add(decimal.Parse(Console.ReadLine()));
        }

        Console.WriteLine($"pedido: {FormatarMoeda(TotalPedido(itens))}");
        Console.WriteLine($"orcamento: {FormatarMoeda(TotalOrcamento(itens))}");
        Console.WriteLine($"vazio: {FormatarMoeda(TotalPedido(new List<decimal>()))}");

        Console.WriteLine($"cpf 12345678901: {ValidarCpf("12345678901")}");
        Console.WriteLine($"cpf 01234567890: {ValidarCpf("01234567890")}");
        Console.WriteLine($"cpf curto: {ValidarCpf("123")}");
        Console.WriteLine($"cpf nulo: {ValidarCpf(null)}");

        Console.WriteLine($"tel 12345678901: {ValidarTelefone("12345678901")}");
        Console.WriteLine($"tel 01234567890: {ValidarTelefone("01234567890")}");
        Console.WriteLine($"tel com letra: {ValidarTelefone("1234567890a")}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    const int TamanhoCpf = 11;
    const int TamanhoTelefone = 11;

    static decimal Somar(List<decimal> itens)
    {
        decimal total = 0;

        foreach (decimal item in itens)
        {
            total += item;
        }

        return total;
    }

    static string FormatarMoeda(decimal valor)
    {
        return $"R$ {valor:F2}";
    }

    static decimal TotalPedido(List<decimal> itens)
    {
        return Somar(itens);
    }

    static decimal TotalOrcamento(List<decimal> itens)
    {
        return Somar(itens);
    }

    static bool SoDigitos(string valor)
    {
        foreach (char c in valor)
        {
            if (c < '0' || c > '9')
            {
                return false;
            }
        }

        return true;
    }

    static bool ValidarCpf(string valor)
    {
        if (valor == null || valor.Length != TamanhoCpf)
        {
            return false;
        }

        return SoDigitos(valor);
    }

    static bool ValidarTelefone(string valor)
    {
        if (valor == null || valor.Length != TamanhoTelefone)
        {
            return false;
        }

        if (!SoDigitos(valor))
        {
            return false;
        }

        return valor[0] != '0';
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<decimal> itens = new List<decimal>();

        for (int i = 0; i < n; i++)
        {
            itens.Add(decimal.Parse(Console.ReadLine()));
        }

        Console.WriteLine($"pedido: {FormatarMoeda(TotalPedido(itens))}");
        Console.WriteLine($"orcamento: {FormatarMoeda(TotalOrcamento(itens))}");
        Console.WriteLine($"vazio: {FormatarMoeda(TotalPedido(new List<decimal>()))}");

        Console.WriteLine($"cpf 12345678901: {ValidarCpf("12345678901")}");
        Console.WriteLine($"cpf 01234567890: {ValidarCpf("01234567890")}");
        Console.WriteLine($"cpf curto: {ValidarCpf("123")}");
        Console.WriteLine($"cpf nulo: {ValidarCpf(null)}");

        Console.WriteLine($"tel 12345678901: {ValidarTelefone("12345678901")}");
        Console.WriteLine($"tel 01234567890: {ValidarTelefone("01234567890")}");
        Console.WriteLine($"tel com letra: {ValidarTelefone("1234567890a")}");
    }
}
`,
      hints: [
        '`Somar` é a duplicação real: os dois totais chamam o mesmo método.',
        '`SoDigitos` é um utilitário genuíno — ele não decide regra de negócio nenhuma, só responde uma pergunta sobre o texto.',
        'As duas validações compartilham `SoDigitos` mas mantêm as próprias regras: o telefone tem uma verificação a mais.',
      ],
      tests: [
        {
          name: 'Tres itens',
          stdin: '3\n10.50\n20.00\n5.25\n',
          expectedStdout:
            'pedido: R$ 35.75\norcamento: R$ 35.75\nvazio: R$ 0.00\n' +
            'cpf 12345678901: True\ncpf 01234567890: True\ncpf curto: False\ncpf nulo: False\n' +
            'tel 12345678901: True\ntel 01234567890: False\ntel com letra: False',
        },
        {
          name: 'Um item',
          stdin: '1\n99.99\n',
          expectedStdout:
            'pedido: R$ 99.99\norcamento: R$ 99.99\nvazio: R$ 0.00\n' +
            'cpf 12345678901: True\ncpf 01234567890: True\ncpf curto: False\ncpf nulo: False\n' +
            'tel 12345678901: True\ntel 01234567890: False\ntel com letra: False',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c05l08',
    title: 'Convenções do .NET',
    objective: 'Escrever código que parece escrito pela mesma pessoa que escreveu a biblioteca padrão.',
    concept: [
      {
        kind: 'text',
        body:
          'Convenções não deixam o código mais correto — deixam-no **previsível**. Quem lê consegue inferir a natureza de um identificador só pela forma dele.',
      },
      {
        kind: 'table',
        headers: ['Elemento', 'Convenção', 'Exemplo'],
        rows: [
          ['classe, método, propriedade', '`PascalCase`', '`ContaCorrente`, `Sacar`'],
          ['parâmetro, variável local', '`camelCase`', '`valorTotal`'],
          ['campo privado', '`camelCase`', '`saldo`'],
          ['constante', '`PascalCase`', '`TaxaMaxima`'],
          ['interface', '`I` + `PascalCase`', '`IExportador`'],
          ['booleano', 'prefixo `Eh`, `Tem`, `Esta`', '`EstaAtivo`'],
        ],
      },
      {
        kind: 'text',
        body:
          'A regra que mais surpreende quem vem de outras linguagens: métodos e propriedades são `PascalCase`, com maiúscula. Em C# a minúscula inicial em um membro público destoa imediatamente.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Chaves em linha própria é a convenção mais visível do C#, e ela vem do estilo da própria Microsoft. Não é melhor nem pior que a alternativa — é a que o ecossistema espera.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A pior escolha é a inconsistência. Um projeto que mistura dois estilos obriga quem lê a decidir, a cada arquivo, qual convenção está valendo — o que é pior que qualquer uma das duas.',
      },
      {
        kind: 'text',
        body:
          'Ao entrar em um projeto existente, siga o estilo dele mesmo que você prefira outro. Consistência local vale mais que preferência pessoal.',
      },
    ],
    quiz: [
      {
        id: 's06c05l08q1',
        type: 'single',
        prompt: 'Qual é a convenção para nomes de métodos públicos em C#?',
        options: [
          { id: 'a', code: 'PascalCase', correct: true },
          { id: 'b', code: 'camelCase' },
          { id: 'c', code: 'snake_case' },
          { id: 'd', text: 'Tudo em maiúsculas.' },
        ],
        explanation:
          'É o que diferencia visualmente C# de Java e JavaScript, que usam `camelCase` em membros.',
      },
      {
        id: 's06c05l08q2',
        type: 'single',
        prompt: 'Qual é a pior escolha em relação a convenções?',
        options: [
          { id: 'a', text: 'Misturar dois estilos no mesmo projeto.', correct: true },
          { id: 'b', text: 'Usar `camelCase` em tudo.' },
          { id: 'c', text: 'Usar `PascalCase` em tudo.' },
          { id: 'd', text: 'Seguir o estilo de outra linguagem.' },
        ],
        explanation:
          'Qualquer convenção aplicada consistentemente é legível. A mistura obriga a decidir a cada arquivo.',
      },
      {
        id: 's06c05l08q3',
        type: 'single',
        prompt: 'Ao entrar em um projeto com estilo diferente do seu, o que fazer?',
        options: [
          { id: 'a', text: 'Seguir o estilo do projeto.', correct: true },
          { id: 'b', text: 'Usar o seu estilo nos arquivos novos.' },
          { id: 'c', text: 'Converter o projeto inteiro.' },
          { id: 'd', text: 'Misturar conforme o caso.' },
        ],
        explanation:
          'Consistência local vale mais que preferência pessoal — inclusive quando a preferência é a convenção oficial.',
      },
    ],
    challenge: {
      brief:
        'Converta uma classe escrita com convenções de outra linguagem para o estilo do .NET, sem alterar o comportamento.',
      requirements: [
        '`ContaBancaria` segue as convenções do .NET em todos os identificadores',
        'Classes, métodos, propriedades e constantes em `PascalCase`',
        'Parâmetros, variáveis locais e campos privados em `camelCase`',
        'A interface se chama `IMovimentavel` e declara `Depositar` e `Sacar`',
        'A propriedade booleana se chama `EstaAtiva`',
        'A constante de limite se chama `LimiteMaximo`',
        'A saída deve continuar idêntica à do código original',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Este codigo funciona, mas foi escrito com convencoes de outra linguagem.
// Converta para o estilo do .NET sem mudar o comportamento.

interface movimentavel
{
    bool depositar(decimal Valor);
    bool sacar(decimal Valor);
}

class conta_bancaria : movimentavel
{
    private const decimal LIMITE_MAXIMO = 10000;

    private decimal Saldo_atual;
    private bool ativa;

    public conta_bancaria(decimal saldo_inicial)
    {
        Saldo_atual = saldo_inicial;
        ativa = true;
    }

    public decimal saldo { get { return Saldo_atual; } }

    public bool esta_ativa { get { return ativa; } }

    public bool depositar(decimal Valor)
    {
        if (Valor <= 0 || !ativa) { return false; }
        if (Saldo_atual + Valor > LIMITE_MAXIMO) { return false; }
        Saldo_atual += Valor;
        return true;
    }

    public bool sacar(decimal Valor)
    {
        if (Valor <= 0 || !ativa || Valor > Saldo_atual) { return false; }
        Saldo_atual -= Valor;
        return true;
    }

    public void encerrar() { ativa = false; }
}

class Program
{
    static void Main()
    {
        decimal inicial = decimal.Parse(Console.ReadLine());

        ContaBancaria conta = new ContaBancaria(inicial);

        Console.WriteLine($"saldo: {conta.Saldo:F2}");
        Console.WriteLine($"ativa: {conta.EstaAtiva}");
        Console.WriteLine($"deposito 100: {conta.Depositar(100)}");
        Console.WriteLine($"deposito -5: {conta.Depositar(-5)}");
        Console.WriteLine($"deposito enorme: {conta.Depositar(99999)}");
        Console.WriteLine($"saque 50: {conta.Sacar(50)}");
        Console.WriteLine($"saque grande: {conta.Sacar(99999)}");
        Console.WriteLine($"saldo: {conta.Saldo:F2}");

        conta.Encerrar();

        Console.WriteLine($"ativa: {conta.EstaAtiva}");
        Console.WriteLine($"deposito apos encerrar: {conta.Depositar(10)}");

        IMovimentavel movimentavel = conta;
        Console.WriteLine($"pela interface: {movimentavel.Sacar(10)}");
    }
}
`,
      solution: `using System;

interface IMovimentavel
{
    bool Depositar(decimal valor);
    bool Sacar(decimal valor);
}

class ContaBancaria : IMovimentavel
{
    private const decimal LimiteMaximo = 10000;

    private decimal saldoAtual;
    private bool ativa;

    public ContaBancaria(decimal saldoInicial)
    {
        saldoAtual = saldoInicial;
        ativa = true;
    }

    public decimal Saldo => saldoAtual;

    public bool EstaAtiva => ativa;

    public bool Depositar(decimal valor)
    {
        if (valor <= 0 || !ativa)
        {
            return false;
        }

        if (saldoAtual + valor > LimiteMaximo)
        {
            return false;
        }

        saldoAtual += valor;
        return true;
    }

    public bool Sacar(decimal valor)
    {
        if (valor <= 0 || !ativa || valor > saldoAtual)
        {
            return false;
        }

        saldoAtual -= valor;
        return true;
    }

    public void Encerrar()
    {
        ativa = false;
    }
}

class Program
{
    static void Main()
    {
        decimal inicial = decimal.Parse(Console.ReadLine());

        ContaBancaria conta = new ContaBancaria(inicial);

        Console.WriteLine($"saldo: {conta.Saldo:F2}");
        Console.WriteLine($"ativa: {conta.EstaAtiva}");
        Console.WriteLine($"deposito 100: {conta.Depositar(100)}");
        Console.WriteLine($"deposito -5: {conta.Depositar(-5)}");
        Console.WriteLine($"deposito enorme: {conta.Depositar(99999)}");
        Console.WriteLine($"saque 50: {conta.Sacar(50)}");
        Console.WriteLine($"saque grande: {conta.Sacar(99999)}");
        Console.WriteLine($"saldo: {conta.Saldo:F2}");

        conta.Encerrar();

        Console.WriteLine($"ativa: {conta.EstaAtiva}");
        Console.WriteLine($"deposito apos encerrar: {conta.Depositar(10)}");

        IMovimentavel movimentavel = conta;
        Console.WriteLine($"pela interface: {movimentavel.Sacar(10)}");
    }
}
`,
      hints: [
        'O `Main` já usa os nomes novos: ele é a especificação de como cada identificador deve se chamar.',
        'Constantes em C# usam `PascalCase`, não `MAIUSCULAS_COM_UNDERLINE` como em C.',
        'As propriedades de leitura ficam mais limpas com a forma de seta: `public decimal Saldo => saldoAtual;`.',
      ],
      tests: [
        {
          name: 'Conta com saldo inicial',
          stdin: '500\n',
          expectedStdout:
            'saldo: 500.00\nativa: True\ndeposito 100: True\ndeposito -5: False\n' +
            'deposito enorme: False\nsaque 50: True\nsaque grande: False\nsaldo: 550.00\n' +
            'ativa: False\ndeposito apos encerrar: False\npela interface: False',
        },
        {
          name: 'Conta zerada',
          stdin: '0\n',
          expectedStdout:
            'saldo: 0.00\nativa: True\ndeposito 100: True\ndeposito -5: False\n' +
            'deposito enorme: False\nsaque 50: True\nsaque grande: False\nsaldo: 50.00\n' +
            'ativa: False\ndeposito apos encerrar: False\npela interface: False',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c05l09',
    title: 'Prática: limpando um método bagunçado',
    objective: 'Aplicar todas as técnicas do capítulo em uma única limpeza, sem alterar o comportamento.',
    concept: [
      {
        kind: 'text',
        body:
          'Esta prática junta tudo: nomes, extração, aninhamento, constantes, comentários e retorno antecipado. A ordem em que se aplica cada técnica importa.',
      },
      {
        kind: 'table',
        headers: ['Ordem', 'Técnica', 'Por que nesta posição'],
        rows: [
          ['1', 'renomear', 'você precisa entender antes de mexer'],
          ['2', 'extrair constantes', 'revela conceitos escondidos'],
          ['3', 'achatar aninhamento', 'expõe a estrutura real'],
          ['4', 'extrair métodos', 'agora as seções estão visíveis'],
          ['5', 'limpar comentários', 'muitos ficaram redundantes'],
        ],
      },
      {
        kind: 'text',
        body:
          'Renomear vem primeiro porque é a alteração mais segura e a que mais ensina sobre o código. Ao dar nome às coisas, você descobre o que elas realmente são — e às vezes descobre que uma delas está errada.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Rode o programa entre cada passo. Uma limpeza de cinco técnicas aplicadas de uma vez, se quebrar, não diz qual delas quebrou — exatamente o problema de mudar várias coisas ao mesmo tempo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A regra desta prática é a saída permanecer **idêntica**. Se ela mudar, a limpeza introduziu um defeito — ou revelou um que já existia, e vale saber qual dos dois foi.',
      },
    ],
    quiz: [
      {
        id: 's06c05l09q1',
        type: 'single',
        prompt: 'Por que renomear é o primeiro passo de uma limpeza?',
        options: [
          { id: 'a', text: 'É a alteração mais segura e a que mais ensina sobre o código.', correct: true },
          { id: 'b', text: 'É a mais rápida de fazer.' },
          { id: 'c', text: 'É a que o compilador verifica melhor.' },
          { id: 'd', text: 'É a menos importante.' },
        ],
        explanation:
          'Dar nome às coisas obriga a entendê-las — e é impossível reestruturar com segurança o que não se entende.',
      },
      {
        id: 's06c05l09q2',
        type: 'single',
        prompt: 'Por que rodar o programa entre cada passo?',
        options: [
          { id: 'a', text: 'Para saber qual técnica quebrou o comportamento, se algo quebrar.', correct: true },
          { id: 'b', text: 'Para medir o desempenho.' },
          { id: 'c', text: 'Para atualizar a cobertura.' },
          { id: 'd', text: 'Não é necessário.' },
        ],
        explanation:
          'É a mesma disciplina de mudar uma coisa por vez, aplicada à refatoração.',
      },
      {
        id: 's06c05l09q3',
        type: 'single',
        prompt: 'A saída mudou depois da limpeza. O que isso significa?',
        options: [
          { id: 'a', text: 'Ou a limpeza introduziu um defeito, ou revelou um que já existia.', correct: true },
          { id: 'b', text: 'Que a limpeza deu certo.' },
          { id: 'c', text: 'Que o código estava certo antes.' },
          { id: 'd', text: 'Que faltam testes.' },
        ],
        explanation:
          'As duas possibilidades exigem investigação, e distinguir entre elas é parte do trabalho.',
      },
    ],
    challenge: {
      brief:
        'Limpe um método de processamento de pedidos aplicando as cinco técnicas na ordem, mantendo a saída idêntica.',
      requirements: [
        '`ProcessarPedido(decimal valor, int quantidade, string cupom, bool clienteVip)` devolve a descrição do resultado',
        'Pedido com valor não positivo ou quantidade não positiva devolve `invalido`',
        'Quantidade de `10` ou mais dá 10 por cento de desconto',
        'Cupom `PROMO` dá `50` de desconto fixo; qualquer outro cupom não vale nada',
        'Cliente VIP dá mais 5 por cento de desconto sobre o valor já descontado',
        'O total nunca fica negativo',
        'O resultado é `ok: R$ X.XX` com o total final',
        'Todos os valores de regra são constantes nomeadas, o aninhamento tem no máximo dois níveis, e cada etapa do cálculo é um método com nome',
        'A saída deve continuar idêntica à do código original',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Bagunca completa. Aplique, nesta ordem: renomear, extrair constantes,
    // achatar aninhamento, extrair metodos, limpar comentarios.
    // A saida precisa continuar identica.
    static string ProcessarPedido(decimal v, int q, string c, bool vip)
    {
        // resultado
        string r;

        // verifica se e valido
        if (v > 0)
        {
            if (q > 0)
            {
                // calcula o total
                decimal t = v * q;

                // desconto por quantidade
                if (q >= 10)
                {
                    t = t - t * 0.1m;
                }

                // cupom
                if (c == "PROMO")
                {
                    t = t - 50;
                }

                // vip
                if (vip)
                {
                    t = t - t * 0.05m;
                }

                // nao pode ser negativo
                if (t < 0)
                {
                    t = 0;
                }

                r = $"ok: R$ {t:F2}";
            }
            else
            {
                r = "invalido";
            }
        }
        else
        {
            r = "invalido";
        }

        // retorna
        return r;
    }

    static void Main()
    {
        decimal valor = decimal.Parse(Console.ReadLine());
        int quantidade = int.Parse(Console.ReadLine());

        Console.WriteLine($"simples: {ProcessarPedido(valor, quantidade, "", false)}");
        Console.WriteLine($"atacado: {ProcessarPedido(valor, 10, "", false)}");
        Console.WriteLine($"com cupom: {ProcessarPedido(valor, quantidade, "PROMO", false)}");
        Console.WriteLine($"cupom invalido: {ProcessarPedido(valor, quantidade, "XYZ", false)}");
        Console.WriteLine($"vip: {ProcessarPedido(valor, quantidade, "", true)}");
        Console.WriteLine($"tudo junto: {ProcessarPedido(valor, 10, "PROMO", true)}");
        Console.WriteLine($"valor zero: {ProcessarPedido(0, quantidade, "", false)}");
        Console.WriteLine($"quantidade zero: {ProcessarPedido(valor, 0, "", false)}");
        Console.WriteLine($"cupom maior que total: {ProcessarPedido(1, 1, "PROMO", false)}");
    }
}
`,
      solution: `using System;

class Program
{
    const int QuantidadeParaAtacado = 10;
    const decimal DescontoAtacado = 0.1m;
    const decimal DescontoVip = 0.05m;
    const decimal ValorCupom = 50m;
    const string CupomValido = "PROMO";

    static decimal AplicarDescontoQuantidade(decimal total, int quantidade)
    {
        if (quantidade < QuantidadeParaAtacado)
        {
            return total;
        }

        return total - total * DescontoAtacado;
    }

    static decimal AplicarCupom(decimal total, string cupom)
    {
        if (cupom != CupomValido)
        {
            return total;
        }

        return total - ValorCupom;
    }

    static decimal AplicarDescontoVip(decimal total, bool clienteVip)
    {
        if (!clienteVip)
        {
            return total;
        }

        return total - total * DescontoVip;
    }

    static decimal NuncaNegativo(decimal total)
    {
        return total < 0 ? 0 : total;
    }

    static string ProcessarPedido(decimal valor, int quantidade, string cupom, bool clienteVip)
    {
        if (valor <= 0 || quantidade <= 0)
        {
            return "invalido";
        }

        decimal total = valor * quantidade;

        total = AplicarDescontoQuantidade(total, quantidade);
        total = AplicarCupom(total, cupom);
        total = AplicarDescontoVip(total, clienteVip);
        total = NuncaNegativo(total);

        return $"ok: R$ {total:F2}";
    }

    static void Main()
    {
        decimal valor = decimal.Parse(Console.ReadLine());
        int quantidade = int.Parse(Console.ReadLine());

        Console.WriteLine($"simples: {ProcessarPedido(valor, quantidade, "", false)}");
        Console.WriteLine($"atacado: {ProcessarPedido(valor, 10, "", false)}");
        Console.WriteLine($"com cupom: {ProcessarPedido(valor, quantidade, "PROMO", false)}");
        Console.WriteLine($"cupom invalido: {ProcessarPedido(valor, quantidade, "XYZ", false)}");
        Console.WriteLine($"vip: {ProcessarPedido(valor, quantidade, "", true)}");
        Console.WriteLine($"tudo junto: {ProcessarPedido(valor, 10, "PROMO", true)}");
        Console.WriteLine($"valor zero: {ProcessarPedido(0, quantidade, "", false)}");
        Console.WriteLine($"quantidade zero: {ProcessarPedido(valor, 0, "", false)}");
        Console.WriteLine($"cupom maior que total: {ProcessarPedido(1, 1, "PROMO", false)}");
    }
}
`,
      hints: [
        'As duas validações do início viram uma única guard clause com `||`.',
        'Cada etapa de desconto vira um método que recebe o total e devolve o novo total.',
        'A ordem dos descontos precisa ser preservada: quantidade, cupom, VIP, e só então o piso zero.',
      ],
      tests: [
        {
          name: 'Valor e quantidade medios',
          stdin: '100\n3\n',
          expectedStdout:
            'simples: ok: R$ 300.00\natacado: ok: R$ 900.00\ncom cupom: ok: R$ 250.00\n' +
            'cupom invalido: ok: R$ 300.00\nvip: ok: R$ 285.00\ntudo junto: ok: R$ 807.50\n' +
            'valor zero: invalido\nquantidade zero: invalido\ncupom maior que total: ok: R$ 0.00',
        },
        {
          name: 'Valores menores',
          stdin: '20\n2\n',
          expectedStdout:
            'simples: ok: R$ 40.00\natacado: ok: R$ 180.00\ncom cupom: ok: R$ 0.00\n' +
            'cupom invalido: ok: R$ 40.00\nvip: ok: R$ 38.00\ntudo junto: ok: R$ 123.50\n' +
            'valor zero: invalido\nquantidade zero: invalido\ncupom maior que total: ok: R$ 0.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c05l10',
    title: 'Checkpoint: legibilidade',
    objective: 'Avaliar código pela facilidade de leitura e aplicar as correções que mais rendem.',
    concept: [
      {
        kind: 'text',
        body:
          'Código é lido muito mais vezes do que é escrito. Otimizar para a leitura é otimizar para o custo real de manter um sistema.',
      },
      {
        kind: 'table',
        headers: ['Pergunta de revisão', 'Se a resposta for não'],
        rows: [
          ['os nomes explicam o conteúdo?', 'renomear'],
          ['cada método faz uma coisa?', 'extrair'],
          ['o aninhamento passa de dois níveis?', 'achatar'],
          ['há literais sem explicação?', 'nomear constantes'],
          ['os comentários dizem o porquê?', 'remover ou reescrever'],
          ['a duplicação muda pelo mesmo motivo?', 'unificar — ou deixar'],
        ],
      },
      {
        kind: 'text',
        body:
          'Nem toda melhoria vale o mesmo. Renomear e achatar aninhamento costumam render mais que qualquer outra coisa, porque atacam o esforço de compreensão diretamente.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A melhor medida de legibilidade é o tempo que alguém leva para responder uma pergunta sobre o código. Se descobrir onde o preço é calculado leva dez minutos, o problema não é de estilo — é estrutural.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Legibilidade não é gosto pessoal, mas também não é lei. O objetivo é o próximo leitor entender rápido — e discussões sobre estilo que não afetam isso consomem tempo sem produzir nada.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Ao terminar um método, releia-o como se fosse a primeira vez. Se você precisar parar para lembrar o que uma variável guarda, o próximo leitor vai parar também.',
      },
    ],
    quiz: [
      {
        id: 's06c05l10q1',
        type: 'single',
        prompt: 'Quais melhorias costumam render mais?',
        options: [
          { id: 'a', text: 'Renomear e achatar aninhamento.', correct: true },
          { id: 'b', text: 'Padronizar chaves e espaçamento.' },
          { id: 'c', text: 'Reordenar os métodos do arquivo.' },
          { id: 'd', text: 'Adicionar mais comentários.' },
        ],
        explanation:
          'As duas atacam diretamente o esforço de compreensão. Formatação importa, mas rende muito menos.',
      },
      {
        id: 's06c05l10q2',
        type: 'single',
        prompt: 'Qual é a melhor medida prática de legibilidade?',
        options: [
          { id: 'a', text: 'O tempo que alguém leva para responder uma pergunta sobre o código.', correct: true },
          { id: 'b', text: 'O número de linhas por método.' },
          { id: 'c', text: 'A quantidade de comentários.' },
          { id: 'd', text: 'A cobertura de testes.' },
        ],
        explanation:
          'É uma medida direta do que importa, e ela revela problemas estruturais que métricas de estilo não capturam.',
      },
      {
        id: 's06c05l10q3',
        type: 'single',
        prompt: 'Quando uma discussão sobre estilo não vale o tempo?',
        options: [
          { id: 'a', text: 'Quando a escolha não afeta o entendimento do próximo leitor.', correct: true },
          { id: 'b', text: 'Sempre: estilo é irrelevante.' },
          { id: 'c', text: 'Quando o projeto é pequeno.' },
          { id: 'd', text: 'Quando há prazo apertado.' },
        ],
        explanation:
          'O critério é sempre o mesmo: alguém entende mais rápido por causa disso? Se não, é preferência.',
      },
    ],
    challenge: {
      brief:
        'Faça a revisão completa de um relatório de vendas ilegível, aplicando todas as técnicas do capítulo e preservando a saída.',
      requirements: [
        '`GerarRelatorio(List<string> registros)` processa linhas no formato `produto:quantidade:preco`',
        'Linha com formato inválido é contada como erro e imprime `erro na linha N`',
        'Quantidade ou preço não numéricos contam como erro',
        'Quantidade acima de `1000` imprime `quantidade suspeita na linha N` e é ignorada',
        'Cada linha válida imprime `produto x quantidade = R$ X.XX`',
        'Ao final, imprime `total: R$ X.XX`, `validos: N` e `erros: N`',
        'O código está com nomes ruins, aninhamento profundo, literais soltos e comentários redundantes — limpe tudo',
        'A saída deve continuar idêntica à do código original',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Revise este metodo aplicando tudo do capitulo.
    // A saida precisa continuar exatamente igual.
    static void GerarRelatorio(List<string> r)
    {
        // total
        decimal t = 0;
        // validos
        int v = 0;
        // erros
        int e = 0;

        for (int i = 0; i < r.Count; i++)
        {
            // divide a linha
            string[] p = r[i].Split(':');

            if (p.Length == 3)
            {
                if (int.TryParse(p[1], out int q))
                {
                    if (decimal.TryParse(p[2], out decimal pr))
                    {
                        if (q <= 1000)
                        {
                            decimal s = q * pr;
                            t += s;
                            v++;
                            Console.WriteLine($"{p[0]} x {q} = R$ {s:F2}");
                        }
                        else
                        {
                            Console.WriteLine($"quantidade suspeita na linha {i + 1}");
                        }
                    }
                    else
                    {
                        e++;
                        Console.WriteLine($"erro na linha {i + 1}");
                    }
                }
                else
                {
                    e++;
                    Console.WriteLine($"erro na linha {i + 1}");
                }
            }
            else
            {
                e++;
                Console.WriteLine($"erro na linha {i + 1}");
            }
        }

        // imprime o resumo
        Console.WriteLine($"total: R$ {t:F2}");
        Console.WriteLine($"validos: {v}");
        Console.WriteLine($"erros: {e}");
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<string> registros = new List<string>();

        for (int i = 0; i < n; i++)
        {
            registros.Add(Console.ReadLine());
        }

        GerarRelatorio(registros);
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    const int CamposPorRegistro = 3;
    const int QuantidadeMaxima = 1000;

    static void GerarRelatorio(List<string> registros)
    {
        decimal total = 0;
        int validos = 0;
        int erros = 0;

        for (int indice = 0; indice < registros.Count; indice++)
        {
            int numeroDaLinha = indice + 1;
            string[] campos = registros[indice].Split(':');

            if (campos.Length != CamposPorRegistro)
            {
                erros++;
                Console.WriteLine($"erro na linha {numeroDaLinha}");
                continue;
            }

            if (!int.TryParse(campos[1], out int quantidade))
            {
                erros++;
                Console.WriteLine($"erro na linha {numeroDaLinha}");
                continue;
            }

            if (!decimal.TryParse(campos[2], out decimal preco))
            {
                erros++;
                Console.WriteLine($"erro na linha {numeroDaLinha}");
                continue;
            }

            if (quantidade > QuantidadeMaxima)
            {
                Console.WriteLine($"quantidade suspeita na linha {numeroDaLinha}");
                continue;
            }

            decimal subtotal = quantidade * preco;
            total += subtotal;
            validos++;

            Console.WriteLine($"{campos[0]} x {quantidade} = R$ {subtotal:F2}");
        }

        Console.WriteLine($"total: R$ {total:F2}");
        Console.WriteLine($"validos: {validos}");
        Console.WriteLine($"erros: {erros}");
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<string> registros = new List<string>();

        for (int i = 0; i < n; i++)
        {
            registros.Add(Console.ReadLine());
        }

        GerarRelatorio(registros);
    }
}
`,
      hints: [
        'Os quatro níveis de aninhamento viram quatro verificações invertidas com `continue`.',
        'Repare que a quantidade suspeita **não** conta como erro — o comportamento original precisa ser preservado exatamente.',
        'Guardar `numeroDaLinha` em uma variável evita repetir `i + 1` em quatro lugares.',
      ],
      tests: [
        {
          name: 'Registros variados',
          stdin: '5\ncaneta:10:2.50\nsemcampos\ncaderno:abc:15.00\nmochila:5:80.00\nlote:5000:1.00\n',
          expectedStdout:
            'caneta x 10 = R$ 25.00\nerro na linha 2\nerro na linha 3\n' +
            'mochila x 5 = R$ 400.00\nquantidade suspeita na linha 5\n' +
            'total: R$ 425.00\nvalidos: 2\nerros: 2',
        },
        {
          name: 'Todos validos',
          stdin: '2\nlivro:2:40.00\nlapis:3:1.50\n',
          expectedStdout:
            'livro x 2 = R$ 80.00\nlapis x 3 = R$ 4.50\n' +
            'total: R$ 84.50\nvalidos: 2\nerros: 0',
          hidden: true,
        },
      ],
    },
  },
]
