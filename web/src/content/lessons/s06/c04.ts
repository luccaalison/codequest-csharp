import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's06c04l01',
    title: 'Por que testar',
    objective: 'Entender o que um teste automatizado entrega que a verificação manual não entrega.',
    concept: [
      {
        kind: 'text',
        body:
          'Todo mundo testa: você roda o programa e confere a saída. A diferença de um teste **automatizado** é que ele continua conferindo, de graça, todas as vezes seguintes.',
      },
      {
        kind: 'table',
        headers: ['', 'Teste manual', 'Teste automatizado'],
        rows: [
          ['custo da primeira vez', 'baixo', 'médio'],
          ['custo da centésima vez', 'alto', '**quase zero**'],
          ['detecta regressão', 'só se você lembrar de conferir', '**sempre**'],
          ['documenta o esperado', 'não', '**sim**'],
        ],
      },
      {
        kind: 'text',
        body:
          'A linha mais importante é a terceira. Uma **regressão** é algo que funcionava e parou de funcionar por causa de uma mudança em outro lugar — e é exatamente o que ninguém pensa em conferir de novo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O ganho real dos testes não é encontrar bugs; é dar **coragem para mudar o código**. Sem eles, cada refatoração é uma aposta, e o resultado é código que ninguém ousa melhorar.',
      },
      {
        kind: 'text',
        body:
          'Neste capítulo você vai escrever o próprio arcabouço de testes: um método que compara o esperado com o obtido e relata. Frameworks reais fazem muito mais, mas o núcleo é exatamente isso.',
      },
      {
        kind: 'code',
        code: `static void Verificar(string nome, bool condicao)
{
    Console.WriteLine(condicao ? $"PASS {nome}" : $"FAIL {nome}");
}`,
        caption: 'Um framework de teste não é mágica. Começa aqui.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um teste que nunca falha não testa nada. Ao escrever um, quebre o código de propósito uma vez para confirmar que o teste **detecta** o problema. Um teste sempre verde pode estar verificando a coisa errada.',
      },
    ],
    quiz: [
      {
        id: 's06c04l01q1',
        type: 'single',
        prompt: 'O que é uma regressão?',
        options: [
          { id: 'a', text: 'Algo que funcionava e parou por causa de uma mudança em outro lugar.', correct: true },
          { id: 'b', text: 'Um bug que nunca foi corrigido.' },
          { id: 'c', text: 'Um teste que falha na primeira execução.' },
          { id: 'd', text: 'Código que ficou mais lento.' },
        ],
        explanation:
          'É o tipo de falha que a conferência manual não pega, porque ninguém pensa em reconferir o que já estava certo.',
      },
      {
        id: 's06c04l01q2',
        type: 'single',
        prompt: 'Qual é o principal ganho de ter testes?',
        options: [
          { id: 'a', text: 'Coragem para mudar o código sem medo de quebrar algo.', correct: true },
          { id: 'b', text: 'Encontrar todos os bugs.' },
          { id: 'c', text: 'Deixar o programa mais rápido.' },
          { id: 'd', text: 'Substituir a documentação.' },
        ],
        explanation:
          'Sem rede de segurança, o código tende a apodrecer: ninguém quer arriscar melhorar o que está funcionando.',
      },
      {
        id: 's06c04l01q3',
        type: 'single',
        prompt: 'Como confirmar que um teste realmente testa algo?',
        options: [
          { id: 'a', text: 'Quebrando o código de propósito e vendo se o teste falha.', correct: true },
          { id: 'b', text: 'Rodando duas vezes.' },
          { id: 'c', text: 'Verificando que ele passa.' },
          { id: 'd', text: 'Medindo quanto tempo ele leva.' },
        ],
        explanation:
          'Um teste que passa mesmo com o código quebrado está verificando outra coisa — ou nada.',
      },
    ],
    challenge: {
      brief:
        'Construa o núcleo de um arcabouço de testes e use-o para verificar uma função, provando que ele detecta o erro quando existe.',
      requirements: [
        '`Verificar(string nome, bool condicao)` imprime `PASS nome` ou `FAIL nome` e atualiza os contadores',
        '`passou` e `falhou` são campos estáticos com as contagens',
        '`Relatorio()` imprime `N passaram, M falharam` e, em outra linha, `resultado: verde` ou `resultado: vermelho`',
        '`Dobro(int n)` devolve o dobro; `DobroQuebrado(int n)` devolve `n * 2` apenas para valores positivos, e `0` para os demais',
        'O `Main` roda a mesma bateria contra as duas versões',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int passou = 0;
    static int falhou = 0;

    // Escreva Verificar, Relatorio, Dobro e DobroQuebrado aqui

    static void Main()
    {
        int valor = int.Parse(Console.ReadLine());

        Console.WriteLine("--- versao correta ---");
        Verificar("dobro de positivo", Dobro(valor) == valor * 2);
        Verificar("dobro de zero", Dobro(0) == 0);
        Verificar("dobro de negativo", Dobro(-3) == -6);
        Relatorio();

        passou = 0;
        falhou = 0;

        Console.WriteLine("--- versao quebrada ---");
        Verificar("dobro de positivo", DobroQuebrado(valor) == valor * 2);
        Verificar("dobro de zero", DobroQuebrado(0) == 0);
        Verificar("dobro de negativo", DobroQuebrado(-3) == -6);
        Relatorio();
    }
}
`,
      solution: `using System;

class Program
{
    static int passou = 0;
    static int falhou = 0;

    static void Verificar(string nome, bool condicao)
    {
        if (condicao)
        {
            passou++;
            Console.WriteLine($"PASS {nome}");
        }
        else
        {
            falhou++;
            Console.WriteLine($"FAIL {nome}");
        }
    }

    static void Relatorio()
    {
        Console.WriteLine($"{passou} passaram, {falhou} falharam");
        Console.WriteLine(falhou == 0 ? "resultado: verde" : "resultado: vermelho");
    }

    static int Dobro(int n)
    {
        return n * 2;
    }

    static int DobroQuebrado(int n)
    {
        if (n > 0)
        {
            return n * 2;
        }

        return 0;
    }

    static void Main()
    {
        int valor = int.Parse(Console.ReadLine());

        Console.WriteLine("--- versao correta ---");
        Verificar("dobro de positivo", Dobro(valor) == valor * 2);
        Verificar("dobro de zero", Dobro(0) == 0);
        Verificar("dobro de negativo", Dobro(-3) == -6);
        Relatorio();

        passou = 0;
        falhou = 0;

        Console.WriteLine("--- versao quebrada ---");
        Verificar("dobro de positivo", DobroQuebrado(valor) == valor * 2);
        Verificar("dobro de zero", DobroQuebrado(0) == 0);
        Verificar("dobro de negativo", DobroQuebrado(-3) == -6);
        Relatorio();
    }
}
`,
      hints: [
        'O `Verificar` faz duas coisas: incrementa o contador certo e imprime a linha correspondente.',
        'Repare que o teste de zero passa nas duas versões — é o teste de negativo que expõe o defeito.',
      ],
      tests: [
        {
          name: 'Valor positivo',
          stdin: '5\n',
          expectedStdout:
            '--- versao correta ---\nPASS dobro de positivo\nPASS dobro de zero\nPASS dobro de negativo\n' +
            '3 passaram, 0 falharam\nresultado: verde\n' +
            '--- versao quebrada ---\nPASS dobro de positivo\nPASS dobro de zero\nFAIL dobro de negativo\n' +
            '2 passaram, 1 falharam\nresultado: vermelho',
        },
        {
          name: 'Valor negativo na entrada',
          stdin: '-4\n',
          expectedStdout:
            '--- versao correta ---\nPASS dobro de positivo\nPASS dobro de zero\nPASS dobro de negativo\n' +
            '3 passaram, 0 falharam\nresultado: verde\n' +
            '--- versao quebrada ---\nFAIL dobro de positivo\nPASS dobro de zero\nFAIL dobro de negativo\n' +
            '1 passaram, 2 falharam\nresultado: vermelho',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c04l02',
    title: 'Anatomia de um teste',
    objective: 'Reconhecer as partes que todo teste tem, e o que faz um deles ser bom.',
    concept: [
      {
        kind: 'text',
        body:
          'Todo teste, em qualquer framework, tem as mesmas quatro partes. Reconhecê-las torna fácil escrever testes em qualquer ferramenta.',
      },
      {
        kind: 'table',
        headers: ['Parte', 'Responde'],
        rows: [
          ['**nome**', 'o que está sendo verificado'],
          ['**preparação**', 'de que estado eu preciso'],
          ['**ação**', 'o que estou exercitando'],
          ['**verificação**', 'o que deveria ter acontecido'],
        ],
      },
      {
        kind: 'code',
        code: `// nome
Verificar("saque reduz o saldo",
    // preparacao
    () => { var c = new Conta(100);
    // acao
            c.Sacar(30);
    // verificacao
            return c.Saldo == 70; });`,
      },
      {
        kind: 'text',
        body:
          'O nome merece mais atenção do que costuma receber. Quando um teste falha, o nome dele é a primeira coisa — às vezes a única — que você lê. Ele deve descrever o **comportamento esperado**, não o método chamado.',
      },
      {
        kind: 'compare',
        good: `"saque reduz o saldo"
"saque acima do saldo e recusado"
"deposito negativo e rejeitado"`,
        bad: `"teste1"
"testa Sacar"
"testa o metodo"`,
        goodLabel: 'Descreve o comportamento',
        badLabel: 'Descreve o código',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um bom conjunto de nomes de teste funciona como especificação: lendo só a lista de nomes, dá para entender o que a classe faz — sem abrir a implementação.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um teste deve verificar **um** comportamento. Quando ele falha, você precisa saber imediatamente o que quebrou; um teste que confere cinco coisas só informa que uma das cinco deu errado.',
      },
    ],
    quiz: [
      {
        id: 's06c04l02q1',
        type: 'single',
        prompt: 'O nome de um teste deve descrever o quê?',
        options: [
          { id: 'a', text: 'O comportamento esperado.', correct: true },
          { id: 'b', text: 'O método que está sendo chamado.' },
          { id: 'c', text: 'O número do teste.' },
          { id: 'd', text: 'A classe testada.' },
        ],
        explanation:
          'Quando o teste falha, o nome costuma ser a única informação visível. "testa Sacar" não diz o que deveria ter acontecido.',
      },
      {
        id: 's06c04l02q2',
        type: 'single',
        prompt: 'Por que um teste deve verificar apenas um comportamento?',
        options: [
          { id: 'a', text: 'Para que a falha aponte imediatamente o que quebrou.', correct: true },
          { id: 'b', text: 'Para o teste rodar mais rápido.' },
          { id: 'c', text: 'Porque frameworks não permitem mais de um.' },
          { id: 'd', text: 'Para reduzir o número de linhas.' },
        ],
        explanation:
          'Um teste que confere cinco coisas transforma "falhou" em uma investigação, em vez de uma resposta.',
      },
      {
        id: 's06c04l02q3',
        type: 'single',
        prompt: 'Que papel um bom conjunto de nomes de teste cumpre?',
        options: [
          { id: 'a', text: 'Funciona como especificação do que a classe faz.', correct: true },
          { id: 'b', text: 'Substitui os comentários do código.' },
          { id: 'c', text: 'Determina a ordem de execução.' },
          { id: 'd', text: 'Mede a cobertura.' },
        ],
        explanation:
          'Ler a lista de nomes deveria explicar o comportamento da classe sem exigir a leitura da implementação.',
      },
    ],
    challenge: {
      brief:
        'Escreva uma bateria de testes com nomes que descrevem comportamentos, exercitando uma classe de conta.',
      requirements: [
        '`Conta` recebe o saldo inicial, com `Saldo` de leitura',
        '`Depositar(int valor)` soma apenas valores positivos e devolve se conseguiu',
        '`Sacar(int valor)` subtrai apenas valores positivos que cabem no saldo, e devolve se conseguiu',
        '`Verificar(string nome, bool condicao)` imprime `PASS nome` ou `FAIL nome` e conta',
        '`Relatorio()` imprime `N/M testes passaram`',
        'Escreva exatamente seis testes, com os nomes e na ordem que os testes da lição esperam',
        'Cada teste verifica um único comportamento',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare a classe Conta aqui

class Program
{
    static int passou = 0;
    static int total = 0;

    // Escreva Verificar, Relatorio e RodarTestes aqui
    // Os seis testes, nesta ordem e com estes nomes:
    //   "deposito positivo aumenta o saldo"
    //   "deposito negativo e rejeitado"
    //   "saque valido reduz o saldo"
    //   "saque acima do saldo e recusado"
    //   "saque acima do saldo nao altera o saldo"
    //   "saque de valor zero e recusado"

    static void Main()
    {
        int inicial = int.Parse(Console.ReadLine());

        RodarTestes(inicial);
        Relatorio();
    }
}
`,
      solution: `using System;

class Conta
{
    public int Saldo { get; private set; }

    public Conta(int saldoInicial)
    {
        Saldo = saldoInicial;
    }

    public bool Depositar(int valor)
    {
        if (valor <= 0)
        {
            return false;
        }

        Saldo += valor;
        return true;
    }

    public bool Sacar(int valor)
    {
        if (valor <= 0 || valor > Saldo)
        {
            return false;
        }

        Saldo -= valor;
        return true;
    }
}

class Program
{
    static int passou = 0;
    static int total = 0;

    static void Verificar(string nome, bool condicao)
    {
        total++;

        if (condicao)
        {
            passou++;
            Console.WriteLine($"PASS {nome}");
        }
        else
        {
            Console.WriteLine($"FAIL {nome}");
        }
    }

    static void Relatorio()
    {
        Console.WriteLine($"{passou}/{total} testes passaram");
    }

    static void RodarTestes(int inicial)
    {
        Conta c1 = new Conta(inicial);
        c1.Depositar(50);
        Verificar("deposito positivo aumenta o saldo", c1.Saldo == inicial + 50);

        Conta c2 = new Conta(inicial);
        bool aceitou = c2.Depositar(-10);
        Verificar("deposito negativo e rejeitado", !aceitou);

        Conta c3 = new Conta(inicial);
        c3.Sacar(inicial);
        Verificar("saque valido reduz o saldo", c3.Saldo == 0);

        Conta c4 = new Conta(inicial);
        bool sacou = c4.Sacar(inicial + 1);
        Verificar("saque acima do saldo e recusado", !sacou);

        Conta c5 = new Conta(inicial);
        c5.Sacar(inicial + 1);
        Verificar("saque acima do saldo nao altera o saldo", c5.Saldo == inicial);

        Conta c6 = new Conta(inicial);
        bool zero = c6.Sacar(0);
        Verificar("saque de valor zero e recusado", !zero);
    }

    static void Main()
    {
        int inicial = int.Parse(Console.ReadLine());

        RodarTestes(inicial);
        Relatorio();
    }
}
`,
      hints: [
        'Cada teste cria a sua própria conta: um teste nunca deve depender do estado deixado por outro.',
        'Os testes 4 e 5 exercitam a mesma ação, mas verificam coisas diferentes — o retorno e o efeito colateral.',
      ],
      tests: [
        {
          name: 'Saldo inicial de cem',
          stdin: '100\n',
          expectedStdout:
            'PASS deposito positivo aumenta o saldo\nPASS deposito negativo e rejeitado\n' +
            'PASS saque valido reduz o saldo\nPASS saque acima do saldo e recusado\n' +
            'PASS saque acima do saldo nao altera o saldo\nPASS saque de valor zero e recusado\n' +
            '6/6 testes passaram',
        },
        {
          name: 'Saldo inicial zerado',
          stdin: '0\n',
          expectedStdout:
            'PASS deposito positivo aumenta o saldo\nPASS deposito negativo e rejeitado\n' +
            'PASS saque valido reduz o saldo\nPASS saque acima do saldo e recusado\n' +
            'PASS saque acima do saldo nao altera o saldo\nPASS saque de valor zero e recusado\n' +
            '6/6 testes passaram',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c04l03',
    title: 'Arrange, Act, Assert',
    objective: 'Estruturar cada teste em três blocos visualmente separados.',
    concept: [
      {
        kind: 'text',
        body:
          'O padrão **AAA** organiza o corpo de um teste em três blocos: preparar o cenário, executar a ação, verificar o resultado. Nessa ordem, sem misturar.',
      },
      {
        kind: 'code',
        code: `// Arrange - preparar
Conta conta = new Conta(100);

// Act - executar
bool resultado = conta.Sacar(30);

// Assert - verificar
Verificar("saque reduz saldo", conta.Saldo == 70);`,
        caption: 'Uma linha em branco entre os blocos já é suficiente para marcar a estrutura.',
      },
      {
        kind: 'compare',
        good: `Conta c = new Conta(100);

bool ok = c.Sacar(30);

Verificar("saque", c.Saldo == 70);`,
        bad: `Conta c = new Conta(100);
Verificar("criou", c.Saldo == 100);
c.Sacar(30);
Verificar("sacou", c.Saldo == 70);
c.Depositar(10);
Verificar("depositou", c.Saldo == 80);`,
        goodLabel: 'AAA: uma ação, uma verificação',
        badLabel: 'Ações e verificações intercaladas',
      },
      {
        kind: 'text',
        body:
          'O bloco de **ação** deve ter idealmente uma linha só. Se ele precisa de várias, ou o teste está exercitando coisas demais, ou a API testada está exigindo passos demais para um uso simples.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A dificuldade de escrever o Arrange é um sinal de projeto. Se preparar o cenário exige dez linhas e cinco objetos, a classe testada provavelmente tem dependências demais — o teste está reclamando do desenho.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Verificar no meio do bloco de ação embaralha causa e efeito. Quando o teste falha, fica impossível saber se o problema é a segunda ação ou a primeira verificação.',
      },
    ],
    quiz: [
      {
        id: 's06c04l03q1',
        type: 'single',
        prompt: 'Quais são os três blocos do padrão AAA?',
        options: [
          { id: 'a', text: 'Preparar o cenário, executar a ação, verificar o resultado.', correct: true },
          { id: 'b', text: 'Analisar, Alterar, Aprovar.' },
          { id: 'c', text: 'Antes, Ação, Após.' },
          { id: 'd', text: 'Arranjar, Ajustar, Avaliar.' },
        ],
        explanation:
          'Arrange, Act, Assert. A ordem é fixa e a separação visual é o que torna o teste legível.',
      },
      {
        id: 's06c04l03q2',
        type: 'single',
        prompt: 'Quantas linhas o bloco de ação deve ter idealmente?',
        options: [
          { id: 'a', text: 'Uma.', correct: true },
          { id: 'b', text: 'Três a cinco.' },
          { id: 'c', text: 'Quantas forem necessárias.' },
          { id: 'd', text: 'A mesma quantidade do Arrange.' },
        ],
        explanation:
          'Um teste exercita um comportamento, e um comportamento normalmente é uma chamada. Mais que isso é sinal de teste inchado ou API difícil.',
      },
      {
        id: 's06c04l03q3',
        type: 'single',
        prompt: 'O que um Arrange muito longo indica?',
        options: [
          { id: 'a', text: 'Que a classe testada tem dependências demais.', correct: true },
          { id: 'b', text: 'Que o teste está bem completo.' },
          { id: 'c', text: 'Que faltam asserções.' },
          { id: 'd', text: 'Que o teste é lento.' },
        ],
        explanation:
          'A dificuldade de testar é uma medida direta da qualidade do desenho. O teste está apontando um problema real na classe.',
      },
    ],
    challenge: {
      brief:
        'Escreva testes no formato AAA para um carrinho de compras, com os três blocos claramente separados.',
      requirements: [
        '`Carrinho` guarda pares de nome e preço, com `Quantidade` e `Total` de leitura',
        '`Adicionar(string nome, int preco)` acrescenta apenas com nome não vazio e preço positivo, devolvendo se conseguiu',
        '`Remover(string nome)` remove a primeira ocorrência e devolve se conseguiu',
        '`Limpar()` esvazia o carrinho',
        'Escreva exatamente cinco testes no formato AAA, com os nomes e a ordem esperados pelos testes da lição',
        'Cada teste tem apenas uma linha de ação',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare a classe Carrinho aqui

class Program
{
    static int passou = 0;
    static int total = 0;

    // Escreva Verificar, Relatorio e RodarTestes aqui
    // Os cinco testes, nesta ordem e com estes nomes:
    //   "item valido entra no carrinho"
    //   "item com preco zero e rejeitado"
    //   "item sem nome e rejeitado"
    //   "remover item existente reduz o total"
    //   "limpar esvazia o carrinho"

    static void Main()
    {
        int preco = int.Parse(Console.ReadLine());

        RodarTestes(preco);
        Relatorio();
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Carrinho
{
    private List<string> nomes = new List<string>();
    private List<int> precos = new List<int>();

    public int Quantidade => nomes.Count;

    public int Total
    {
        get
        {
            int soma = 0;

            foreach (int p in precos)
            {
                soma += p;
            }

            return soma;
        }
    }

    public bool Adicionar(string nome, int preco)
    {
        if (string.IsNullOrWhiteSpace(nome) || preco <= 0)
        {
            return false;
        }

        nomes.Add(nome);
        precos.Add(preco);
        return true;
    }

    public bool Remover(string nome)
    {
        int indice = nomes.IndexOf(nome);

        if (indice < 0)
        {
            return false;
        }

        nomes.RemoveAt(indice);
        precos.RemoveAt(indice);
        return true;
    }

    public void Limpar()
    {
        nomes.Clear();
        precos.Clear();
    }
}

class Program
{
    static int passou = 0;
    static int total = 0;

    static void Verificar(string nome, bool condicao)
    {
        total++;

        if (condicao)
        {
            passou++;
            Console.WriteLine($"PASS {nome}");
        }
        else
        {
            Console.WriteLine($"FAIL {nome}");
        }
    }

    static void Relatorio()
    {
        Console.WriteLine($"{passou}/{total} testes passaram");
    }

    static void RodarTestes(int preco)
    {
        // Arrange
        Carrinho c1 = new Carrinho();

        // Act
        c1.Adicionar("caneta", preco);

        // Assert
        Verificar("item valido entra no carrinho", c1.Quantidade == 1 && c1.Total == preco);

        // Arrange
        Carrinho c2 = new Carrinho();

        // Act
        bool aceitouZero = c2.Adicionar("caneta", 0);

        // Assert
        Verificar("item com preco zero e rejeitado", !aceitouZero && c2.Quantidade == 0);

        // Arrange
        Carrinho c3 = new Carrinho();

        // Act
        bool aceitouSemNome = c3.Adicionar("  ", preco);

        // Assert
        Verificar("item sem nome e rejeitado", !aceitouSemNome && c3.Quantidade == 0);

        // Arrange
        Carrinho c4 = new Carrinho();
        c4.Adicionar("caneta", preco);
        c4.Adicionar("caderno", preco * 2);

        // Act
        c4.Remover("caneta");

        // Assert
        Verificar("remover item existente reduz o total", c4.Total == preco * 2);

        // Arrange
        Carrinho c5 = new Carrinho();
        c5.Adicionar("caneta", preco);
        c5.Adicionar("caderno", preco);

        // Act
        c5.Limpar();

        // Assert
        Verificar("limpar esvazia o carrinho", c5.Quantidade == 0 && c5.Total == 0);
    }

    static void Main()
    {
        int preco = int.Parse(Console.ReadLine());

        RodarTestes(preco);
        Relatorio();
    }
}
`,
      hints: [
        'A preparação de cada teste pode ter várias linhas — a restrição de uma linha vale só para a ação.',
        'Nos testes 4 e 5, os itens acrescentados fazem parte do Arrange, não da ação sendo testada.',
      ],
      tests: [
        {
          name: 'Preco dez',
          stdin: '10\n',
          expectedStdout:
            'PASS item valido entra no carrinho\nPASS item com preco zero e rejeitado\n' +
            'PASS item sem nome e rejeitado\nPASS remover item existente reduz o total\n' +
            'PASS limpar esvazia o carrinho\n5/5 testes passaram',
        },
        {
          name: 'Preco maior',
          stdin: '250\n',
          expectedStdout:
            'PASS item valido entra no carrinho\nPASS item com preco zero e rejeitado\n' +
            'PASS item sem nome e rejeitado\nPASS remover item existente reduz o total\n' +
            'PASS limpar esvazia o carrinho\n5/5 testes passaram',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c04l04',
    title: 'Escolhendo casos de teste',
    objective: 'Cobrir o comportamento com poucos testes bem escolhidos, em vez de muitos redundantes.',
    concept: [
      {
        kind: 'text',
        body:
          'Não dá para testar todas as entradas possíveis. A saída é agrupar as entradas em **classes de equivalência**: conjuntos que o código trata da mesma forma.',
      },
      {
        kind: 'text',
        body:
          'Se um método classifica idades em criança, adulto e idoso, testar com 5, 6, 7 e 8 anos é redundante — os quatro exercitam exatamente o mesmo caminho.',
      },
      {
        kind: 'table',
        headers: ['Classe', 'Um representante basta'],
        rows: [
          ['criança (0 a 12)', '`7`'],
          ['adulto (13 a 64)', '`30`'],
          ['idoso (65+)', '`70`'],
          ['inválido (negativo)', '`-1`'],
        ],
      },
      {
        kind: 'text',
        body:
          'Depois de escolher um representante de cada classe, acrescente as **fronteiras**: os valores exatamente na divisa entre duas classes. É onde os erros se concentram.',
      },
      {
        kind: 'code',
        code: `// classes:    7, 30, 70, -1
// fronteiras: 0, 12, 13, 64, 65`,
        caption: 'Nove testes cobrem melhor que noventa escolhidos ao acaso.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A pergunta que guia a escolha: "existe alguma entrada que o código trataria de forma **diferente** das que já testei?" Se não, mais um teste não acrescenta informação.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Cuidado com classes de equivalência que só existem na sua cabeça. Se o código tem um `if` que você não conhecia, ele criou uma classe que a sua lista não cobre — por isso ler a implementação ajuda a escolher casos.',
      },
    ],
    quiz: [
      {
        id: 's06c04l04q1',
        type: 'single',
        prompt: 'O que é uma classe de equivalência?',
        options: [
          { id: 'a', text: 'Um conjunto de entradas que o código trata da mesma forma.', correct: true },
          { id: 'b', text: 'Um grupo de testes relacionados.' },
          { id: 'c', text: 'Uma classe que implementa `IEquatable`.' },
          { id: 'd', text: 'O conjunto de todas as entradas válidas.' },
        ],
        explanation:
          'Se duas entradas percorrem o mesmo caminho no código, testar as duas não acrescenta nada sobre a corretude.',
      },
      {
        id: 's06c04l04q2',
        type: 'single',
        prompt: 'Depois de escolher um representante por classe, o que acrescentar?',
        options: [
          { id: 'a', text: 'As fronteiras entre as classes.', correct: true },
          { id: 'b', text: 'Mais representantes da maior classe.' },
          { id: 'c', text: 'Valores aleatórios.' },
          { id: 'd', text: 'Nada mais é necessário.' },
        ],
        explanation:
          'As divisas entre classes são onde as comparações erram por um — a família de bugs mais comum.',
      },
      {
        id: 's06c04l04q3',
        type: 'single',
        prompt: 'Qual pergunta guia a escolha de um novo caso de teste?',
        options: [
          { id: 'a', text: 'Existe entrada que o código trataria diferente das já testadas?', correct: true },
          { id: 'b', text: 'Já tenho testes suficientes?' },
          { id: 'c', text: 'Esse valor é comum na prática?' },
          { id: 'd', text: 'Esse teste roda rápido?' },
        ],
        explanation:
          'Um teste só vale o custo se puder falhar por um motivo que nenhum outro teste detectaria.',
      },
    ],
    challenge: {
      brief:
        'Escolha os casos de teste para uma função de faixa etária cobrindo cada classe e cada fronteira, sem redundância.',
      requirements: [
        '`Faixa(int idade)` devolve `invalida` para negativos, `crianca` de `0` a `12`, `adolescente` de `13` a `17`, `adulto` de `18` a `64` e `idoso` de `65` em diante',
        '`Testar(int idade, string esperado)` verifica e imprime `PASS idade=N` ou `FAIL idade=N esperado=X obtido=Y`',
        'Escreva exatamente onze casos: um representante de cada uma das cinco classes e as seis fronteiras',
        'A ordem dos casos é a mesma dos testes da lição',
        '`Relatorio()` imprime `N/M casos passaram` e `classes cobertas: 5`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int passou = 0;
    static int total = 0;

    // Escreva Faixa, Testar, Relatorio e RodarCasos aqui
    // Os onze casos, nesta ordem:
    //   representantes: -5, 7, 15, 30, 70
    //   fronteiras: 0, 12, 13, 17, 18, 64, 65
    //   (use exatamente estes: -5, 7, 15, 30, 70, 0, 12, 13, 17, 18, 65)

    static void Main()
    {
        RodarCasos();
        Relatorio();
    }
}
`,
      solution: `using System;

class Program
{
    static int passou = 0;
    static int total = 0;

    static string Faixa(int idade)
    {
        if (idade < 0)
        {
            return "invalida";
        }

        if (idade <= 12)
        {
            return "crianca";
        }

        if (idade <= 17)
        {
            return "adolescente";
        }

        if (idade <= 64)
        {
            return "adulto";
        }

        return "idoso";
    }

    static void Testar(int idade, string esperado)
    {
        total++;

        string obtido = Faixa(idade);

        if (obtido == esperado)
        {
            passou++;
            Console.WriteLine($"PASS idade={idade}");
        }
        else
        {
            Console.WriteLine($"FAIL idade={idade} esperado={esperado} obtido={obtido}");
        }
    }

    static void Relatorio()
    {
        Console.WriteLine($"{passou}/{total} casos passaram");
        Console.WriteLine("classes cobertas: 5");
    }

    static void RodarCasos()
    {
        Testar(-5, "invalida");
        Testar(7, "crianca");
        Testar(15, "adolescente");
        Testar(30, "adulto");
        Testar(70, "idoso");

        Testar(0, "crianca");
        Testar(12, "crianca");
        Testar(13, "adolescente");
        Testar(17, "adolescente");
        Testar(18, "adulto");
        Testar(65, "idoso");
    }

    static void Main()
    {
        RodarCasos();
        Relatorio();
    }
}
`,
      hints: [
        'A cadeia de `if` com `<=` só funciona porque cada faixa já descartou as anteriores.',
        'As fronteiras vêm em pares: `12` e `13`, `17` e `18`, `64` e `65` — sempre o último de uma classe e o primeiro da seguinte.',
      ],
      tests: [
        {
          name: 'Todos os casos',
          stdin: '',
          expectedStdout:
            'PASS idade=-5\nPASS idade=7\nPASS idade=15\nPASS idade=30\nPASS idade=70\n' +
            'PASS idade=0\nPASS idade=12\nPASS idade=13\nPASS idade=17\nPASS idade=18\nPASS idade=65\n' +
            '11/11 casos passaram\nclasses cobertas: 5',
        },
      ],
    },
  },
  {
    id: 's06c04l05',
    title: 'Testando casos de borda',
    objective: 'Cobrir os extremos onde a maioria dos defeitos se esconde.',
    concept: [
      {
        kind: 'text',
        body:
          'Um **caso de borda** é uma entrada no limite do que o código consegue tratar. É onde quase todos os bugs moram — e é justamente o que ninguém testa por primeiro.',
      },
      {
        kind: 'table',
        headers: ['Tipo de dado', 'Bordas a testar'],
        rows: [
          ['coleção', 'vazia, um elemento, dois elementos'],
          ['número', 'zero, negativo, máximo, mínimo'],
          ['texto', 'vazio, só espaços, nulo, muito longo'],
          ['índice', 'primeiro, último, além do último'],
          ['divisão', 'divisor zero'],
        ],
      },
      {
        kind: 'text',
        body:
          'A **coleção vazia** merece destaque: ela quebra médias, máximos e acessos ao primeiro elemento. E, diferente do que muita gente imagina, é um caso comum na prática — não uma raridade.',
      },
      {
        kind: 'compare',
        good: `Verificar("vazio", Media(vazia) == 0);
Verificar("um", Media(um) == 5);
Verificar("varios", Media(v) == 3);`,
        bad: `Verificar("caso normal",
    Media(lista) == 3);
// e se a lista chegar vazia?`,
        goodLabel: 'Bordas cobertas',
        badLabel: 'Só o caso feliz',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A sequência **zero, um, muitos** cobre a maioria dos bugs de coleção. Zero pega divisão por zero e acesso inválido; um pega lógica que supõe pares ou vizinhos; muitos pega o caso geral.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Testar a borda exige decidir qual é o comportamento **correto** nela. Média de lista vazia é `0`, é exceção, ou é `null`? Não existe resposta universal — mas existe a obrigação de escolher uma e documentá-la no teste.',
      },
    ],
    quiz: [
      {
        id: 's06c04l05q1',
        type: 'single',
        prompt: 'Qual sequência cobre a maioria dos bugs de coleção?',
        options: [
          { id: 'a', text: 'Zero, um, muitos.', correct: true },
          { id: 'b', text: 'Um, dois, três.' },
          { id: 'c', text: 'Pequena, média, grande.' },
          { id: 'd', text: 'Ordenada e desordenada.' },
        ],
        explanation:
          'Cada uma dessas três exercita uma categoria diferente de suposição errada sobre o tamanho.',
      },
      {
        id: 's06c04l05q2',
        type: 'single',
        prompt: 'Por que a coleção vazia merece atenção especial?',
        options: [
          { id: 'a', text: 'Ela quebra médias, máximos e acessos ao primeiro elemento.', correct: true },
          { id: 'b', text: 'Ela é rara na prática.' },
          { id: 'c', text: 'Ela sempre lança exceção.' },
          { id: 'd', text: 'Ela é difícil de criar no teste.' },
        ],
        explanation:
          'Divisão por zero na média e `lista[0]` inválido são dois bugs que só a lista vazia revela.',
      },
      {
        id: 's06c04l05q3',
        type: 'single',
        prompt: 'O que testar a borda exige antes de escrever o teste?',
        options: [
          { id: 'a', text: 'Decidir qual é o comportamento correto naquela borda.', correct: true },
          { id: 'b', text: 'Medir o desempenho.' },
          { id: 'c', text: 'Escrever a implementação primeiro.' },
          { id: 'd', text: 'Verificar a cobertura.' },
        ],
        explanation:
          'Média de lista vazia pode ser zero ou exceção. O teste é o lugar onde essa decisão fica registrada.',
      },
    ],
    challenge: {
      brief:
        'Escreva uma bateria focada em bordas para funções de estatística, cobrindo listas vazias, unitárias e valores extremos.',
      requirements: [
        '`Media(List<int> v)` devolve a média inteira, ou `0` para lista vazia',
        '`Maior(List<int> v)` devolve o maior valor, ou `int.MinValue` para lista vazia',
        '`Amplitude(List<int> v)` devolve maior menos menor, ou `0` para listas com menos de dois elementos',
        '`Verificar(string nome, bool condicao)` imprime `PASS nome` ou `FAIL nome` e conta',
        'Escreva exatamente nove testes de borda, na ordem e com os nomes esperados pelos testes da lição',
        'As três funções tratam corretamente listas vazias e unitárias',
        '`Relatorio()` imprime `N/M bordas cobertas`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static int passou = 0;
    static int total = 0;

    // Escreva Media, Maior, Amplitude, Verificar, Relatorio e RodarTestes aqui
    // Os nove testes, nesta ordem e com estes nomes:
    //   "media de lista vazia"
    //   "media de um elemento"
    //   "media de varios"
    //   "maior de lista vazia"
    //   "maior de um elemento"
    //   "maior com todos negativos"
    //   "amplitude de lista vazia"
    //   "amplitude de um elemento"
    //   "amplitude de dois elementos"

    static void Main()
    {
        RodarTestes();
        Relatorio();
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static int passou = 0;
    static int total = 0;

    static int Media(List<int> v)
    {
        if (v.Count == 0)
        {
            return 0;
        }

        int soma = 0;

        foreach (int n in v)
        {
            soma += n;
        }

        return soma / v.Count;
    }

    static int Maior(List<int> v)
    {
        if (v.Count == 0)
        {
            return int.MinValue;
        }

        int maior = v[0];

        foreach (int n in v)
        {
            if (n > maior)
            {
                maior = n;
            }
        }

        return maior;
    }

    static int Amplitude(List<int> v)
    {
        if (v.Count < 2)
        {
            return 0;
        }

        int maior = v[0];
        int menor = v[0];

        foreach (int n in v)
        {
            if (n > maior) maior = n;
            if (n < menor) menor = n;
        }

        return maior - menor;
    }

    static void Verificar(string nome, bool condicao)
    {
        total++;

        if (condicao)
        {
            passou++;
            Console.WriteLine($"PASS {nome}");
        }
        else
        {
            Console.WriteLine($"FAIL {nome}");
        }
    }

    static void Relatorio()
    {
        Console.WriteLine($"{passou}/{total} bordas cobertas");
    }

    static void RodarTestes()
    {
        List<int> vazia = new List<int>();
        List<int> um = new List<int> { 5 };
        List<int> varios = new List<int> { 2, 4, 6 };
        List<int> negativos = new List<int> { -10, -3, -7 };
        List<int> dois = new List<int> { 3, 9 };

        Verificar("media de lista vazia", Media(vazia) == 0);
        Verificar("media de um elemento", Media(um) == 5);
        Verificar("media de varios", Media(varios) == 4);

        Verificar("maior de lista vazia", Maior(vazia) == int.MinValue);
        Verificar("maior de um elemento", Maior(um) == 5);
        Verificar("maior com todos negativos", Maior(negativos) == -3);

        Verificar("amplitude de lista vazia", Amplitude(vazia) == 0);
        Verificar("amplitude de um elemento", Amplitude(um) == 0);
        Verificar("amplitude de dois elementos", Amplitude(dois) == 6);
    }

    static void Main()
    {
        RodarTestes();
        Relatorio();
    }
}
`,
      hints: [
        'Cada função precisa de uma guard clause tratando o caso vazio antes de acessar `v[0]`.',
        'A `Amplitude` exige pelo menos dois elementos para fazer sentido — com um só, a amplitude é zero.',
      ],
      tests: [
        {
          name: 'Todas as bordas',
          stdin: '',
          expectedStdout:
            'PASS media de lista vazia\nPASS media de um elemento\nPASS media de varios\n' +
            'PASS maior de lista vazia\nPASS maior de um elemento\nPASS maior com todos negativos\n' +
            'PASS amplitude de lista vazia\nPASS amplitude de um elemento\nPASS amplitude de dois elementos\n' +
            '9/9 bordas cobertas',
        },
      ],
    },
  },
  {
    id: 's06c04l06',
    title: 'Testando exceções',
    objective: 'Verificar que um método falha do jeito certo, e não apenas que ele funciona.',
    concept: [
      {
        kind: 'text',
        body:
          'Um método que lança exceção em certas condições tem esse comportamento como parte do contrato. Testá-lo significa provar que a exceção **acontece** — e que é a do tipo certo.',
      },
      {
        kind: 'code',
        code: `static bool Lanca<T>(Action acao) where T : Exception
{
    try
    {
        acao();
        return false;        // nao lancou: o teste falha
    }
    catch (T)
    {
        return true;         // lancou o tipo esperado
    }
    catch
    {
        return false;        // lancou outro tipo
    }
}`,
        caption: 'Os três caminhos importam: não lançar e lançar errado são falhas diferentes, mas ambas são falhas.',
      },
      {
        kind: 'text',
        body:
          'O `catch` final é essencial. Sem ele, uma exceção de tipo diferente escaparia do helper e derrubaria a bateria inteira — em vez de reprovar apenas aquele teste.',
      },
      {
        kind: 'compare',
        good: `Verificar("saque invalido lanca",
    Lanca<ArgumentException>(
        () => conta.Sacar(-1)));`,
        bad: `try
{
    conta.Sacar(-1);
}
catch { }
// passou? nao passou?`,
        goodLabel: 'Falha é verificada',
        badLabel: 'Exceção engolida sem verificar',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Verificar o **tipo** é o mínimo. Quando a exceção carrega dados — como as customizadas do capítulo 2 —, vale verificar também o conteúdo: o campo que falhou, o valor recebido, o código do erro.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um teste de exceção que envolve várias linhas na ação pode passar pelo motivo errado: a exceção pode ter vindo da linha de preparação, e não da que você queria testar. Deixe apenas a chamada sob teste dentro do bloco.',
      },
    ],
    quiz: [
      {
        id: 's06c04l06q1',
        type: 'single',
        prompt: 'Por que o helper precisa de um `catch` genérico no fim?',
        options: [
          { id: 'a', text: 'Para que uma exceção de outro tipo reprove o teste em vez de derrubar a bateria.', correct: true },
          { id: 'b', text: 'Porque o compilador exige.' },
          { id: 'c', text: 'Para registrar a exceção.' },
          { id: 'd', text: 'Para relançar depois.' },
        ],
        explanation:
          'Sem ele, o tipo inesperado sobe e interrompe todos os testes seguintes — perdendo a informação deles.',
      },
      {
        id: 's06c04l06q2',
        type: 'single',
        prompt: 'O que significa o método **não** lançar quando o teste esperava exceção?',
        options: [
          { id: 'a', text: 'O teste falha: o contrato não foi cumprido.', correct: true },
          { id: 'b', text: 'O teste passa: nada deu errado.' },
          { id: 'c', text: 'O teste é inconclusivo.' },
          { id: 'd', text: 'Depende do tipo esperado.' },
        ],
        explanation:
          'Lançar naquela condição é parte do comportamento esperado. Não lançar é tão defeito quanto lançar o tipo errado.',
      },
      {
        id: 's06c04l06q3',
        type: 'single',
        prompt: 'Além do tipo, o que mais vale verificar em uma exceção?',
        options: [
          { id: 'a', text: 'Os dados que ela carrega, como campo, valor ou código.', correct: true },
          { id: 'b', text: 'O stack trace completo.' },
          { id: 'c', text: 'O tempo até ser lançada.' },
          { id: 'd', text: 'A quantidade de vezes que ocorreu.' },
        ],
        explanation:
          'Uma exceção customizada existe justamente para carregar contexto — e esse contexto faz parte do contrato.',
      },
    ],
    challenge: {
      brief:
        'Escreva um helper genérico de verificação de exceções e use-o para testar o contrato de falha de uma classe.',
      requirements: [
        '`SaqueInvalidoException` é customizada e guarda `Valor` (`int`), com a mensagem `saque invalido: N`',
        '`Cofre` recebe o saldo inicial, com `Saldo` de leitura',
        '`Sacar(int valor)` lança `SaqueInvalidoException` para valores não positivos, `InvalidOperationException` com a mensagem `saldo insuficiente` quando falta saldo, e subtrai caso contrário',
        '`Lanca<T>(Action acao)` devolve `true` só quando a ação lança exatamente o tipo `T`',
        '`Capturar<T>(Action acao)` devolve a exceção capturada do tipo `T`, ou `null`',
        'Escreva exatamente seis testes na ordem e com os nomes esperados pelos testes da lição',
        'Um dos testes verifica o **dado** carregado pela exceção customizada',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

// Declare SaqueInvalidoException e Cofre aqui

class Program
{
    static int passou = 0;
    static int total = 0;

    // Escreva Verificar, Relatorio, Lanca<T>, Capturar<T> e RodarTestes aqui
    // Os seis testes, nesta ordem e com estes nomes:
    //   "saque negativo lanca SaqueInvalido"
    //   "saque zero lanca SaqueInvalido"
    //   "saque acima do saldo lanca InvalidOperation"
    //   "saque valido nao lanca"
    //   "excecao carrega o valor recusado"
    //   "saque valido reduz o saldo"

    static void Main()
    {
        int inicial = int.Parse(Console.ReadLine());

        RodarTestes(inicial);
        Relatorio();
    }
}
`,
      solution: `using System;

class SaqueInvalidoException : Exception
{
    public int Valor { get; }

    public SaqueInvalidoException(int valor)
        : base($"saque invalido: {valor}")
    {
        Valor = valor;
    }
}

class Cofre
{
    public int Saldo { get; private set; }

    public Cofre(int saldoInicial)
    {
        Saldo = saldoInicial;
    }

    public void Sacar(int valor)
    {
        if (valor <= 0)
        {
            throw new SaqueInvalidoException(valor);
        }

        if (valor > Saldo)
        {
            throw new InvalidOperationException("saldo insuficiente");
        }

        Saldo -= valor;
    }
}

class Program
{
    static int passou = 0;
    static int total = 0;

    static void Verificar(string nome, bool condicao)
    {
        total++;

        if (condicao)
        {
            passou++;
            Console.WriteLine($"PASS {nome}");
        }
        else
        {
            Console.WriteLine($"FAIL {nome}");
        }
    }

    static void Relatorio()
    {
        Console.WriteLine($"{passou}/{total} testes passaram");
    }

    static bool Lanca<T>(Action acao) where T : Exception
    {
        try
        {
            acao();
            return false;
        }
        catch (T)
        {
            return true;
        }
        catch
        {
            return false;
        }
    }

    static T Capturar<T>(Action acao) where T : Exception
    {
        try
        {
            acao();
            return null;
        }
        catch (T e)
        {
            return e;
        }
        catch
        {
            return null;
        }
    }

    static void RodarTestes(int inicial)
    {
        Cofre c1 = new Cofre(inicial);
        Verificar("saque negativo lanca SaqueInvalido",
            Lanca<SaqueInvalidoException>(() => c1.Sacar(-5)));

        Cofre c2 = new Cofre(inicial);
        Verificar("saque zero lanca SaqueInvalido",
            Lanca<SaqueInvalidoException>(() => c2.Sacar(0)));

        Cofre c3 = new Cofre(inicial);
        Verificar("saque acima do saldo lanca InvalidOperation",
            Lanca<InvalidOperationException>(() => c3.Sacar(inicial + 1)));

        Cofre c4 = new Cofre(inicial);
        Verificar("saque valido nao lanca",
            !Lanca<Exception>(() => c4.Sacar(inicial)));

        Cofre c5 = new Cofre(inicial);
        SaqueInvalidoException capturada = Capturar<SaqueInvalidoException>(() => c5.Sacar(-42));
        Verificar("excecao carrega o valor recusado",
            capturada != null && capturada.Valor == -42);

        Cofre c6 = new Cofre(inicial);
        c6.Sacar(inicial);
        Verificar("saque valido reduz o saldo", c6.Saldo == 0);
    }

    static void Main()
    {
        int inicial = int.Parse(Console.ReadLine());

        RodarTestes(inicial);
        Relatorio();
    }
}
`,
      hints: [
        'A restrição `where T : Exception` é o que permite usar `T` no `catch`.',
        'No teste "saque valido nao lanca", inverta o resultado do helper com `!`.',
        'O `Capturar` devolve a própria exceção, permitindo verificar as propriedades dela depois.',
      ],
      tests: [
        {
          name: 'Cofre com cem',
          stdin: '100\n',
          expectedStdout:
            'PASS saque negativo lanca SaqueInvalido\nPASS saque zero lanca SaqueInvalido\n' +
            'PASS saque acima do saldo lanca InvalidOperation\nPASS saque valido nao lanca\n' +
            'PASS excecao carrega o valor recusado\nPASS saque valido reduz o saldo\n' +
            '6/6 testes passaram',
        },
        {
          name: 'Cofre com um',
          stdin: '1\n',
          expectedStdout:
            'PASS saque negativo lanca SaqueInvalido\nPASS saque zero lanca SaqueInvalido\n' +
            'PASS saque acima do saldo lanca InvalidOperation\nPASS saque valido nao lanca\n' +
            'PASS excecao carrega o valor recusado\nPASS saque valido reduz o saldo\n' +
            '6/6 testes passaram',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's06c04l07',
    title: 'Testes parametrizados',
    objective: 'Rodar a mesma verificação sobre muitos dados sem repetir o código do teste.',
    concept: [
      {
        kind: 'text',
        body:
          'Quando vários casos verificam a **mesma lógica** com dados diferentes, copiar o teste é desperdício. Um teste parametrizado percorre uma tabela de casos.',
      },
      {
        kind: 'compare',
        good: `var casos = new (int, bool)[]
{
    (2, true), (3, false),
    (0, true), (-4, true)
};

foreach (var (n, esperado) in casos)
{
    Verificar($"par({n})",
        EhPar(n) == esperado);
}`,
        bad: `Verificar("par(2)", EhPar(2) == true);
Verificar("par(3)", EhPar(3) == false);
Verificar("par(0)", EhPar(0) == true);
Verificar("par(-4)", EhPar(-4) == true);`,
        goodLabel: 'Tabela de casos',
        badLabel: 'Quatro cópias da mesma linha',
      },
      {
        kind: 'text',
        body:
          'A tupla da Seção 4 é o formato natural para a tabela: cada linha carrega a entrada e o resultado esperado, e a desconstrução no `foreach` dá nomes aos dois.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O nome do teste deve incluir os **dados do caso**. Um `PASS par(3)` diz exatamente qual linha falhou; um `PASS teste de par` repetido quatro vezes não diz nada quando um deles reprova.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Só parametrize casos que verificam a **mesma** lógica. Empilhar situações diferentes na mesma tabela produz um teste que ninguém entende — e que precisa de `if` internos para funcionar, o que é o sinal de que eram testes distintos.',
      },
      {
        kind: 'text',
        body:
          'Frameworks reais oferecem isso por atributos, como `[Theory]` e `[InlineData]` no xUnit. O mecanismo por trás é exatamente o laço sobre a tabela que você vai escrever.',
      },
    ],
    quiz: [
      {
        id: 's06c04l07q1',
        type: 'single',
        prompt: 'Quando parametrizar um teste?',
        options: [
          { id: 'a', text: 'Quando vários casos verificam a mesma lógica com dados diferentes.', correct: true },
          { id: 'b', text: 'Sempre que houver mais de dois testes.' },
          { id: 'c', text: 'Quando os testes são lentos.' },
          { id: 'd', text: 'Quando o método tem muitos parâmetros.' },
        ],
        explanation:
          'A parametrização elimina repetição. Se a lógica de verificação muda entre os casos, eles não eram o mesmo teste.',
      },
      {
        id: 's06c04l07q2',
        type: 'single',
        prompt: 'Por que incluir os dados do caso no nome do teste?',
        options: [
          { id: 'a', text: 'Para que a falha identifique exatamente qual linha da tabela reprovou.', correct: true },
          { id: 'b', text: 'Para deixar o relatório mais longo.' },
          { id: 'c', text: 'Porque o framework exige.' },
          { id: 'd', text: 'Para ordenar os testes.' },
        ],
        explanation:
          'Sem os dados no nome, todas as linhas produzem a mesma mensagem e a falha vira uma adivinhação.',
      },
      {
        id: 's06c04l07q3',
        type: 'single',
        prompt: 'O que indica que casos diferentes não deveriam estar na mesma tabela?',
        options: [
          { id: 'a', text: 'A necessidade de `if` dentro do laço de verificação.', correct: true },
          { id: 'b', text: 'A tabela ter mais de dez linhas.' },
          { id: 'c', text: 'Os dados serem de tipos diferentes.' },
          { id: 'd', text: 'O teste demorar mais.' },
        ],
        explanation:
          'Um condicional dentro do laço significa que existem duas lógicas de verificação — ou seja, dois testes disfarçados de um.',
      },
    ],
    challenge: {
      brief:
        'Substitua uma sequência de testes repetidos por tabelas de casos parametrizados, mantendo a identificação de cada linha.',
      requirements: [
        '`Classificar(int nota)` devolve `A` para `90` ou mais, `B` de `80` a `89`, `C` de `70` a `79`, `D` de `60` a `69` e `F` abaixo de `60`',
        '`Bissexto(int ano)` devolve se o ano é bissexto: divisível por `4`, exceto múltiplos de `100` que não sejam de `400`',
        '`RodarClassificacao()` percorre uma tabela de tuplas `(nota, esperado)` e imprime `PASS nota=N` ou `FAIL nota=N esperado=X obtido=Y`',
        '`RodarBissexto()` percorre uma tabela `(ano, esperado)` e imprime `PASS ano=N` ou `FAIL ano=N esperado=X obtido=Y`',
        'A tabela de classificação tem exatamente os casos e a ordem que os testes da lição esperam',
        'A tabela de bissexto tem exatamente os casos e a ordem que os testes da lição esperam',
        '`Relatorio()` imprime `N/M casos passaram`',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int passou = 0;
    static int total = 0;

    // Escreva Classificar, Bissexto, Relatorio, RodarClassificacao e RodarBissexto aqui
    //
    // Tabela de classificacao, nesta ordem:
    //   (95,"A") (90,"A") (89,"B") (80,"B") (75,"C") (65,"D") (59,"F") (0,"F")
    //
    // Tabela de bissexto, nesta ordem:
    //   (2024,true) (2023,false) (1900,false) (2000,true) (2100,false) (4,true)

    static void Main()
    {
        Console.WriteLine("--- classificacao ---");
        RodarClassificacao();

        Console.WriteLine("--- bissexto ---");
        RodarBissexto();

        Relatorio();
    }
}
`,
      solution: `using System;

class Program
{
    static int passou = 0;
    static int total = 0;

    static string Classificar(int nota)
    {
        if (nota >= 90) return "A";
        if (nota >= 80) return "B";
        if (nota >= 70) return "C";
        if (nota >= 60) return "D";
        return "F";
    }

    static bool Bissexto(int ano)
    {
        if (ano % 400 == 0) return true;
        if (ano % 100 == 0) return false;
        return ano % 4 == 0;
    }

    static void Relatorio()
    {
        Console.WriteLine($"{passou}/{total} casos passaram");
    }

    static void RodarClassificacao()
    {
        (int nota, string esperado)[] casos =
        {
            (95, "A"), (90, "A"), (89, "B"), (80, "B"),
            (75, "C"), (65, "D"), (59, "F"), (0, "F")
        };

        foreach ((int nota, string esperado) in casos)
        {
            total++;

            string obtido = Classificar(nota);

            if (obtido == esperado)
            {
                passou++;
                Console.WriteLine($"PASS nota={nota}");
            }
            else
            {
                Console.WriteLine($"FAIL nota={nota} esperado={esperado} obtido={obtido}");
            }
        }
    }

    static void RodarBissexto()
    {
        (int ano, bool esperado)[] casos =
        {
            (2024, true), (2023, false), (1900, false),
            (2000, true), (2100, false), (4, true)
        };

        foreach ((int ano, bool esperado) in casos)
        {
            total++;

            bool obtido = Bissexto(ano);

            if (obtido == esperado)
            {
                passou++;
                Console.WriteLine($"PASS ano={ano}");
            }
            else
            {
                Console.WriteLine($"FAIL ano={ano} esperado={esperado} obtido={obtido}");
            }
        }
    }

    static void Main()
    {
        Console.WriteLine("--- classificacao ---");
        RodarClassificacao();

        Console.WriteLine("--- bissexto ---");
        RodarBissexto();

        Relatorio();
    }
}
`,
      hints: [
        'A tabela é um array de tuplas nomeadas: `(int nota, string esperado)[] casos = { ... }`.',
        'A ordem das verificações do `Bissexto` importa: `400` primeiro, depois `100`, e só então `4`.',
      ],
      tests: [
        {
          name: 'Todas as tabelas',
          stdin: '',
          expectedStdout:
            '--- classificacao ---\n' +
            'PASS nota=95\nPASS nota=90\nPASS nota=89\nPASS nota=80\n' +
            'PASS nota=75\nPASS nota=65\nPASS nota=59\nPASS nota=0\n' +
            '--- bissexto ---\n' +
            'PASS ano=2024\nPASS ano=2023\nPASS ano=1900\nPASS ano=2000\n' +
            'PASS ano=2100\nPASS ano=4\n' +
            '14/14 casos passaram',
        },
      ],
    },
  },
  {
    id: 's06c04l08',
    title: 'O que cobertura mede (e o que não)',
    objective: 'Interpretar a métrica de cobertura sem cair na armadilha de tratá-la como meta.',
    concept: [
      {
        kind: 'text',
        body:
          '**Cobertura** é a porcentagem de linhas do código que foram executadas durante os testes. É uma métrica útil — desde que você saiba exatamente o que ela não diz.',
      },
      {
        kind: 'table',
        headers: ['Cobertura diz', 'Cobertura não diz'],
        rows: [
          ['a linha executou', 'o resultado foi verificado'],
          ['o ramo foi visitado', 'as bordas foram testadas'],
          ['**onde não há teste**', 'se os testes são bons'],
        ],
      },
      {
        kind: 'code',
        code: `static int Dividir(int a, int b)
{
    return a / b;
}

// teste:
Dividir(10, 2);        // sem nenhum Verificar!

// cobertura: 100%
// valor do teste: zero`,
        caption: 'Executar não é verificar. Uma linha coberta pode não ter nenhuma asserção sobre ela.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A leitura correta é **negativa**: cobertura baixa aponta com segurança para código sem teste. Cobertura alta não prova nada sobre a qualidade dos testes que existem.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Transformar cobertura em meta corrompe a métrica. Times cobrados por 100% escrevem testes sem asserção, que executam tudo e verificam nada — e o número fica bonito enquanto a segurança real não muda.',
      },
      {
        kind: 'text',
        body:
          'Uma variante mais informativa é a **cobertura de ramos**: ela mede se cada lado de cada `if` foi exercitado. Um teste que só passa pelo caminho verdadeiro cobre a linha, mas não o ramo falso.',
      },
    ],
    quiz: [
      {
        id: 's06c04l08q1',
        type: 'single',
        prompt: 'O que exatamente a cobertura mede?',
        options: [
          { id: 'a', text: 'A porcentagem de linhas executadas durante os testes.', correct: true },
          { id: 'b', text: 'A porcentagem de comportamentos verificados.' },
          { id: 'c', text: 'A qualidade dos testes.' },
          { id: 'd', text: 'A quantidade de bugs encontrados.' },
        ],
        explanation:
          'Executar e verificar são coisas diferentes. Um teste sem nenhuma asserção pode dar 100% de cobertura.',
      },
      {
        id: 's06c04l08q2',
        type: 'single',
        prompt: 'Qual é a leitura correta da métrica?',
        options: [
          { id: 'a', text: 'Negativa: cobertura baixa aponta código sem teste.', correct: true },
          { id: 'b', text: 'Positiva: cobertura alta garante qualidade.' },
          { id: 'c', text: 'Ela deve ser sempre 100%.' },
          { id: 'd', text: 'Ela não tem uso prático.' },
        ],
        explanation:
          'A métrica é confiável para encontrar buracos e não confiável para atestar qualidade.',
      },
      {
        id: 's06c04l08q3',
        type: 'single',
        prompt: 'O que acontece quando cobertura vira meta?',
        options: [
          { id: 'a', text: 'Surgem testes sem asserção, que executam tudo e verificam nada.', correct: true },
          { id: 'b', text: 'A qualidade melhora proporcionalmente.' },
          { id: 'c', text: 'Os testes ficam mais lentos.' },
          { id: 'd', text: 'Nada muda.' },
        ],
        explanation:
          'É o caso clássico de uma medida que deixa de ser boa medida ao virar alvo.',
      },
    ],
    challenge: {
      brief:
        'Meça manualmente a cobertura de ramos de uma função e demonstre que cobertura total de linhas não garante que os testes verifiquem alguma coisa.',
      requirements: [
        '`Desconto(int valor, bool associado)` devolve o valor com desconto: `20` por cento para associados acima de `100`, `10` por cento para associados até `100`, `5` por cento para não associados acima de `100`, e sem desconto nos demais casos',
        '`ramos` é um array de `bool` com quatro posições, marcando qual ramo foi executado',
        '`Desconto` marca a posição correspondente ao ramo tomado, de `0` a `3` na ordem listada acima',
        '`Cobertura()` devolve a porcentagem inteira de ramos visitados',
        '`RodarTestesFracos()` chama `Desconto` para todos os quatro ramos **sem nenhuma verificação**, e mostra que a cobertura chega a 100 por cento',
        '`RodarTestesReais()` verifica os quatro resultados com `Verificar`',
        '`ZerarRamos()` limpa as marcações entre as duas baterias',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static bool[] ramos = new bool[4];
    static int passou = 0;
    static int total = 0;

    // Escreva Desconto, Cobertura, ZerarRamos, Verificar,
    // RodarTestesFracos e RodarTestesReais aqui

    static void Main()
    {
        Console.WriteLine("--- testes sem asercao ---");
        ZerarRamos();
        RodarTestesFracos();
        Console.WriteLine($"cobertura: {Cobertura()}%");
        Console.WriteLine($"verificacoes: {total}");

        Console.WriteLine("--- testes de verdade ---");
        ZerarRamos();
        RodarTestesReais();
        Console.WriteLine($"cobertura: {Cobertura()}%");
        Console.WriteLine($"verificacoes: {total}");
        Console.WriteLine($"passaram: {passou}");
    }
}
`,
      solution: `using System;

class Program
{
    static bool[] ramos = new bool[4];
    static int passou = 0;
    static int total = 0;

    static int Desconto(int valor, bool associado)
    {
        if (associado && valor > 100)
        {
            ramos[0] = true;
            return valor * 80 / 100;
        }

        if (associado)
        {
            ramos[1] = true;
            return valor * 90 / 100;
        }

        if (valor > 100)
        {
            ramos[2] = true;
            return valor * 95 / 100;
        }

        ramos[3] = true;
        return valor;
    }

    static int Cobertura()
    {
        int visitados = 0;

        foreach (bool r in ramos)
        {
            if (r)
            {
                visitados++;
            }
        }

        return visitados * 100 / ramos.Length;
    }

    static void ZerarRamos()
    {
        for (int i = 0; i < ramos.Length; i++)
        {
            ramos[i] = false;
        }
    }

    static void Verificar(string nome, bool condicao)
    {
        total++;

        if (condicao)
        {
            passou++;
            Console.WriteLine($"PASS {nome}");
        }
        else
        {
            Console.WriteLine($"FAIL {nome}");
        }
    }

    static void RodarTestesFracos()
    {
        Desconto(200, true);
        Desconto(50, true);
        Desconto(200, false);
        Desconto(50, false);
    }

    static void RodarTestesReais()
    {
        Verificar("associado acima de 100 tem 20 por cento", Desconto(200, true) == 160);
        Verificar("associado ate 100 tem 10 por cento", Desconto(50, true) == 45);
        Verificar("nao associado acima de 100 tem 5 por cento", Desconto(200, false) == 190);
        Verificar("nao associado ate 100 nao tem desconto", Desconto(50, false) == 50);
    }

    static void Main()
    {
        Console.WriteLine("--- testes sem asercao ---");
        ZerarRamos();
        RodarTestesFracos();
        Console.WriteLine($"cobertura: {Cobertura()}%");
        Console.WriteLine($"verificacoes: {total}");

        Console.WriteLine("--- testes de verdade ---");
        ZerarRamos();
        RodarTestesReais();
        Console.WriteLine($"cobertura: {Cobertura()}%");
        Console.WriteLine($"verificacoes: {total}");
        Console.WriteLine($"passaram: {passou}");
    }
}
`,
      hints: [
        'Cada ramo marca a sua posição no array antes de devolver o valor.',
        'Repare no ponto da lição: as duas baterias chegam a 100 por cento de cobertura, mas só uma verifica alguma coisa.',
      ],
      tests: [
        {
          name: 'As duas baterias',
          stdin: '',
          expectedStdout:
            '--- testes sem asercao ---\ncobertura: 100%\nverificacoes: 0\n' +
            '--- testes de verdade ---\n' +
            'PASS associado acima de 100 tem 20 por cento\n' +
            'PASS associado ate 100 tem 10 por cento\n' +
            'PASS nao associado acima de 100 tem 5 por cento\n' +
            'PASS nao associado ate 100 nao tem desconto\n' +
            'cobertura: 100%\nverificacoes: 4\npassaram: 4',
        },
      ],
    },
  },
  {
    id: 's06c04l09',
    title: 'Prática: primeiro o teste',
    objective: 'Escrever o teste antes da implementação e deixar que ele guie o desenho.',
    concept: [
      {
        kind: 'text',
        body:
          'Escrever o teste primeiro inverte a ordem habitual e muda o resultado. O ciclo tem três passos, sempre nesta sequência.',
      },
      {
        kind: 'table',
        headers: ['Passo', 'Estado', 'O que fazer'],
        rows: [
          ['1. vermelho', 'o teste falha', 'escrever o teste do comportamento desejado'],
          ['2. verde', 'o teste passa', 'escrever o **mínimo** que faz passar'],
          ['3. refatorar', 'continua passando', 'melhorar o código com rede de segurança'],
        ],
      },
      {
        kind: 'text',
        body:
          'O passo 1 tem uma função que costuma passar despercebida: ver o teste **falhar** prova que ele é capaz de falhar. Um teste que já nasce verde pode estar verificando a coisa errada.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O maior efeito não é sobre os testes, é sobre o **desenho**. Ao escrever o teste primeiro, você usa a API antes de implementá-la — e uma assinatura desconfortável de chamar é corrigida antes de existir código dependendo dela.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '"O mínimo que faz passar" é literal. A tentação de já implementar o caso geral no passo 2 tira do ciclo a proteção que ele oferece: cada linha de código passa a existir porque um teste a exigiu.',
      },
      {
        kind: 'text',
        body:
          'Não é obrigatório usar essa ordem sempre. Mas ela é especialmente valiosa quando o comportamento é bem definido e as regras são muitas — exatamente o caso do desafio a seguir.',
      },
    ],
    quiz: [
      {
        id: 's06c04l09q1',
        type: 'single',
        prompt: 'Por que é importante ver o teste falhar antes de implementar?',
        options: [
          { id: 'a', text: 'Porque isso prova que o teste é capaz de falhar.', correct: true },
          { id: 'b', text: 'Porque o framework exige.' },
          { id: 'c', text: 'Para medir o tempo de execução.' },
          { id: 'd', text: 'Para gerar o relatório inicial.' },
        ],
        explanation:
          'Um teste que nasce verde pode estar verificando outra coisa. A falha inicial é a validação do próprio teste.',
      },
      {
        id: 's06c04l09q2',
        type: 'single',
        prompt: 'Qual é o maior efeito de escrever o teste primeiro?',
        options: [
          { id: 'a', text: 'Melhora o desenho da API, porque você a usa antes de implementá-la.', correct: true },
          { id: 'b', text: 'Aumenta a cobertura.' },
          { id: 'c', text: 'Reduz o número de bugs pela metade.' },
          { id: 'd', text: 'Acelera o desenvolvimento.' },
        ],
        explanation:
          'O teste é o primeiro cliente da API. Um chamado desconfortável de escrever é corrigido enquanto ainda é barato.',
      },
      {
        id: 's06c04l09q3',
        type: 'single',
        prompt: 'O que significa "o mínimo que faz passar"?',
        options: [
          { id: 'a', text: 'Literalmente o mínimo — nada de já implementar o caso geral.', correct: true },
          { id: 'b', text: 'A implementação mais eficiente.' },
          { id: 'c', text: 'A implementação mais curta em linhas.' },
          { id: 'd', text: 'A implementação completa, mas sem otimizações.' },
        ],
        explanation:
          'Cada linha existe porque um teste a exigiu. Antecipar o caso geral produz código sem teste que o cubra.',
      },
    ],
    challenge: {
      brief:
        'Aplique o ciclo completo em um conversor de números romanos: os testes já estão escritos e falhando, e cabe a você fazê-los passar.',
      requirements: [
        '`ParaRomano(int n)` converte um inteiro de `1` a `3999` em algarismos romanos',
        'Valores fora dessa faixa lançam `ArgumentOutOfRangeException`',
        'A conversão usa a tabela de valores de `1000` a `1`, incluindo os subtrativos `900`, `400`, `90`, `40`, `9` e `4`',
        '`RodarTestes()` percorre a tabela de casos e imprime `PASS N=R` ou `FAIL N esperado=R obtido=X`',
        'A tabela de casos é exatamente a que os testes da lição esperam, na mesma ordem',
        '`Relatorio()` imprime `N/M convertidos` e `ciclo: verde` quando tudo passa',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    static int passou = 0;
    static int total = 0;

    // Escreva ParaRomano, Verificar, Relatorio e RodarTestes aqui
    //
    // Tabela de casos, nesta ordem:
    //   (1,"I") (4,"IV") (9,"IX") (14,"XIV") (40,"XL") (90,"XC")
    //   (400,"CD") (900,"CM") (1994,"MCMXCIV") (3999,"MMMCMXCIX")

    static void Main()
    {
        RodarTestes();
        Relatorio();

        try
        {
            ParaRomano(0);
        }
        catch (ArgumentOutOfRangeException)
        {
            Console.WriteLine("fora da faixa: recusado");
        }

        try
        {
            ParaRomano(4000);
        }
        catch (ArgumentOutOfRangeException)
        {
            Console.WriteLine("acima do limite: recusado");
        }
    }
}
`,
      solution: `using System;

class Program
{
    static int passou = 0;
    static int total = 0;

    static string ParaRomano(int n)
    {
        if (n < 1 || n > 3999)
        {
            throw new ArgumentOutOfRangeException(nameof(n), "fora da faixa de 1 a 3999");
        }

        int[] valores = { 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 };
        string[] simbolos = { "M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I" };

        string resultado = "";
        int restante = n;

        for (int i = 0; i < valores.Length; i++)
        {
            while (restante >= valores[i])
            {
                resultado += simbolos[i];
                restante -= valores[i];
            }
        }

        return resultado;
    }

    static void Verificar(int numero, string esperado)
    {
        total++;

        string obtido = ParaRomano(numero);

        if (obtido == esperado)
        {
            passou++;
            Console.WriteLine($"PASS {numero}={esperado}");
        }
        else
        {
            Console.WriteLine($"FAIL {numero} esperado={esperado} obtido={obtido}");
        }
    }

    static void Relatorio()
    {
        Console.WriteLine($"{passou}/{total} convertidos");

        if (passou == total)
        {
            Console.WriteLine("ciclo: verde");
        }
    }

    static void RodarTestes()
    {
        (int numero, string esperado)[] casos =
        {
            (1, "I"), (4, "IV"), (9, "IX"), (14, "XIV"), (40, "XL"),
            (90, "XC"), (400, "CD"), (900, "CM"),
            (1994, "MCMXCIV"), (3999, "MMMCMXCIX")
        };

        foreach ((int numero, string esperado) in casos)
        {
            Verificar(numero, esperado);
        }
    }

    static void Main()
    {
        RodarTestes();
        Relatorio();

        try
        {
            ParaRomano(0);
        }
        catch (ArgumentOutOfRangeException)
        {
            Console.WriteLine("fora da faixa: recusado");
        }

        try
        {
            ParaRomano(4000);
        }
        catch (ArgumentOutOfRangeException)
        {
            Console.WriteLine("acima do limite: recusado");
        }
    }
}
`,
      hints: [
        'Os dois arrays andam juntos: o de valores em ordem decrescente e o de símbolos correspondentes.',
        'Incluir os subtrativos na tabela — `900` como `CM`, `4` como `IV` — evita qualquer caso especial no laço.',
        'O `while` interno repete o mesmo símbolo enquanto couber, como em `MMM` para três mil.',
      ],
      tests: [
        {
          name: 'Todos os casos',
          stdin: '',
          expectedStdout:
            'PASS 1=I\nPASS 4=IV\nPASS 9=IX\nPASS 14=XIV\nPASS 40=XL\n' +
            'PASS 90=XC\nPASS 400=CD\nPASS 900=CM\n' +
            'PASS 1994=MCMXCIV\nPASS 3999=MMMCMXCIX\n' +
            '10/10 convertidos\nciclo: verde\n' +
            'fora da faixa: recusado\nacima do limite: recusado',
        },
      ],
    },
  },
  {
    id: 's06c04l10',
    title: 'Checkpoint: testes',
    objective: 'Montar uma bateria completa que cobre comportamento, bordas, exceções e casos parametrizados.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma bateria completa combina os quatro tipos de teste do capítulo. Cada um cobre uma categoria de defeito que os outros não pegam.',
      },
      {
        kind: 'table',
        headers: ['Tipo de teste', 'Pega'],
        rows: [
          ['comportamento normal', 'a lógica principal errada'],
          ['casos de borda', 'suposições sobre tamanho e limite'],
          ['exceções', 'contrato de falha não cumprido'],
          ['parametrizado', 'regras que variam com o dado'],
        ],
      },
      {
        kind: 'text',
        body:
          'A ordem de escrita que costuma funcionar melhor: comece pelo caso normal, para fixar o comportamento; depois as bordas, que revelam suposições; e só então as exceções, que dependem do contrato já estar claro.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um teste bom é **independente**: ele cria o próprio cenário e não depende da ordem de execução. Testes que compartilham estado passam isolados e falham em conjunto — o pior tipo de falha para investigar.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Testes também são código, e código apodrece. Um teste que ninguém entende ou que falha de vez em quando é pior que teste nenhum: ele consome atenção e ensina o time a ignorar o vermelho.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Ao encontrar um bug em produção, escreva primeiro o teste que o reproduz. Ele confirma a correção e passa a impedir que aquele defeito específico volte.',
      },
    ],
    quiz: [
      {
        id: 's06c04l10q1',
        type: 'single',
        prompt: 'O que torna um teste independente?',
        options: [
          { id: 'a', text: 'Ele cria o próprio cenário e não depende da ordem de execução.', correct: true },
          { id: 'b', text: 'Ele roda em menos de um segundo.' },
          { id: 'c', text: 'Ele tem apenas uma asserção.' },
          { id: 'd', text: 'Ele não usa nenhuma classe externa.' },
        ],
        explanation:
          'Estado compartilhado produz testes que passam sozinhos e falham em conjunto — ou o contrário, o que é ainda pior.',
      },
      {
        id: 's06c04l10q2',
        type: 'single',
        prompt: 'Por que um teste instável é pior que nenhum teste?',
        options: [
          { id: 'a', text: 'Ele consome atenção e ensina o time a ignorar o vermelho.', correct: true },
          { id: 'b', text: 'Ele deixa a compilação mais lenta.' },
          { id: 'c', text: 'Ele reduz a cobertura.' },
          { id: 'd', text: 'Ele não é pior.' },
        ],
        explanation:
          'Quando falhar vira rotina, a falha real passa despercebida no meio do ruído.',
      },
      {
        id: 's06c04l10q3',
        type: 'single',
        prompt: 'Ao encontrar um bug em produção, o que fazer primeiro?',
        options: [
          { id: 'a', text: 'Escrever o teste que reproduz o bug.', correct: true },
          { id: 'b', text: 'Corrigir o código imediatamente.' },
          { id: 'c', text: 'Aumentar a cobertura da área.' },
          { id: 'd', text: 'Refatorar o método envolvido.' },
        ],
        explanation:
          'O teste confirma que a correção funcionou e impede que aquele defeito volte em uma mudança futura.',
      },
    ],
    challenge: {
      brief:
        'Escreva a bateria completa de uma classe de agenda, combinando testes de comportamento, borda, exceção e parametrizados.',
      requirements: [
        '`Agenda` guarda compromissos por hora (`int`, de `0` a `23`), com no máximo um por hora',
        '`Marcar(int hora, string titulo)` lança `ArgumentOutOfRangeException` para hora fora da faixa, `ArgumentException` para título em branco, e `InvalidOperationException` com a mensagem `horario ocupado` quando já existe compromisso',
        '`Cancelar(int hora)` devolve se havia algo para cancelar',
        '`Ocupada(int hora)` diz se a hora tem compromisso',
        '`Quantidade` e `PrimeiraLivre` (a menor hora livre, ou `-1` se todas ocupadas) são de leitura',
        '`Lanca<T>(Action)` verifica o tipo lançado; `Verificar(string, bool)` conta e relata',
        'A bateria tem quatro blocos, nesta ordem: comportamento, bordas, exceções e parametrizado',
        'Os nomes e a ordem dos testes são exatamente os esperados pelos testes da lição',
        'Cada teste cria a própria agenda',
        'Nenhuma exceção pode escapar do programa',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

// Declare a classe Agenda aqui

class Program
{
    static int passou = 0;
    static int total = 0;

    // Escreva Verificar, Lanca<T>, Relatorio e os quatro blocos de teste aqui
    //
    // Bloco 1 - comportamento:
    //   "marcar aumenta a quantidade"
    //   "marcar torna a hora ocupada"
    //   "cancelar libera a hora"
    //   "cancelar hora livre devolve false"
    //
    // Bloco 2 - bordas:
    //   "agenda nova tem quantidade zero"
    //   "primeira livre de agenda nova e zero"
    //   "hora 0 e valida"
    //   "hora 23 e valida"
    //   "agenda cheia nao tem hora livre"
    //
    // Bloco 3 - excecoes:
    //   "hora negativa lanca"
    //   "hora 24 lanca"
    //   "titulo em branco lanca"
    //   "hora ocupada lanca"
    //
    // Bloco 4 - parametrizado, com a tabela:
    //   (0,true) (12,true) (23,true) (-1,false) (24,false) (100,false)

    static void Main()
    {
        RodarComportamento();
        RodarBordas();
        RodarExcecoes();
        RodarParametrizado();
        Relatorio();
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Agenda
{
    private Dictionary<int, string> compromissos = new Dictionary<int, string>();

    public int Quantidade => compromissos.Count;

    public int PrimeiraLivre
    {
        get
        {
            for (int hora = 0; hora < 24; hora++)
            {
                if (!compromissos.ContainsKey(hora))
                {
                    return hora;
                }
            }

            return -1;
        }
    }

    public void Marcar(int hora, string titulo)
    {
        if (hora < 0 || hora > 23)
        {
            throw new ArgumentOutOfRangeException(nameof(hora), "hora deve estar entre 0 e 23");
        }

        if (string.IsNullOrWhiteSpace(titulo))
        {
            throw new ArgumentException("titulo em branco", nameof(titulo));
        }

        if (compromissos.ContainsKey(hora))
        {
            throw new InvalidOperationException("horario ocupado");
        }

        compromissos[hora] = titulo;
    }

    public bool Cancelar(int hora)
    {
        return compromissos.Remove(hora);
    }

    public bool Ocupada(int hora)
    {
        return compromissos.ContainsKey(hora);
    }
}

class Program
{
    static int passou = 0;
    static int total = 0;

    static void Verificar(string nome, bool condicao)
    {
        total++;

        if (condicao)
        {
            passou++;
            Console.WriteLine($"PASS {nome}");
        }
        else
        {
            Console.WriteLine($"FAIL {nome}");
        }
    }

    static bool Lanca<T>(Action acao) where T : Exception
    {
        try
        {
            acao();
            return false;
        }
        catch (T)
        {
            return true;
        }
        catch
        {
            return false;
        }
    }

    static void Relatorio()
    {
        Console.WriteLine($"{passou}/{total} testes passaram");
        Console.WriteLine(passou == total ? "bateria: verde" : "bateria: vermelha");
    }

    static void RodarComportamento()
    {
        Console.WriteLine("--- comportamento ---");

        Agenda a1 = new Agenda();
        a1.Marcar(10, "reuniao");
        Verificar("marcar aumenta a quantidade", a1.Quantidade == 1);

        Agenda a2 = new Agenda();
        a2.Marcar(10, "reuniao");
        Verificar("marcar torna a hora ocupada", a2.Ocupada(10));

        Agenda a3 = new Agenda();
        a3.Marcar(10, "reuniao");
        a3.Cancelar(10);
        Verificar("cancelar libera a hora", !a3.Ocupada(10) && a3.Quantidade == 0);

        Agenda a4 = new Agenda();
        Verificar("cancelar hora livre devolve false", !a4.Cancelar(10));
    }

    static void RodarBordas()
    {
        Console.WriteLine("--- bordas ---");

        Agenda a1 = new Agenda();
        Verificar("agenda nova tem quantidade zero", a1.Quantidade == 0);

        Agenda a2 = new Agenda();
        Verificar("primeira livre de agenda nova e zero", a2.PrimeiraLivre == 0);

        Agenda a3 = new Agenda();
        a3.Marcar(0, "cedo");
        Verificar("hora 0 e valida", a3.Ocupada(0));

        Agenda a4 = new Agenda();
        a4.Marcar(23, "tarde");
        Verificar("hora 23 e valida", a4.Ocupada(23));

        Agenda a5 = new Agenda();

        for (int hora = 0; hora < 24; hora++)
        {
            a5.Marcar(hora, "ocupado");
        }

        Verificar("agenda cheia nao tem hora livre", a5.PrimeiraLivre == -1);
    }

    static void RodarExcecoes()
    {
        Console.WriteLine("--- excecoes ---");

        Agenda a1 = new Agenda();
        Verificar("hora negativa lanca",
            Lanca<ArgumentOutOfRangeException>(() => a1.Marcar(-1, "x")));

        Agenda a2 = new Agenda();
        Verificar("hora 24 lanca",
            Lanca<ArgumentOutOfRangeException>(() => a2.Marcar(24, "x")));

        Agenda a3 = new Agenda();
        Verificar("titulo em branco lanca",
            Lanca<ArgumentException>(() => a3.Marcar(10, "   ")));

        Agenda a4 = new Agenda();
        a4.Marcar(10, "primeira");
        Verificar("hora ocupada lanca",
            Lanca<InvalidOperationException>(() => a4.Marcar(10, "segunda")));
    }

    static void RodarParametrizado()
    {
        Console.WriteLine("--- parametrizado ---");

        (int hora, bool valida)[] casos =
        {
            (0, true), (12, true), (23, true),
            (-1, false), (24, false), (100, false)
        };

        foreach ((int hora, bool valida) in casos)
        {
            Agenda a = new Agenda();

            bool aceitou = !Lanca<ArgumentOutOfRangeException>(() => a.Marcar(hora, "teste"));

            Verificar($"hora={hora} valida={valida}", aceitou == valida);
        }
    }

    static void Main()
    {
        RodarComportamento();
        RodarBordas();
        RodarExcecoes();
        RodarParametrizado();
        Relatorio();
    }
}
`,
      hints: [
        'O `PrimeiraLivre` percorre de `0` a `23` e devolve a primeira hora sem compromisso.',
        'No bloco parametrizado, `!Lanca<...>` transforma "não lançou" em "aceitou".',
        'A ordem das validações no `Marcar` define qual exceção aparece: faixa, depois título, depois ocupação.',
      ],
      tests: [
        {
          name: 'Bateria completa',
          stdin: '',
          expectedStdout:
            '--- comportamento ---\n' +
            'PASS marcar aumenta a quantidade\nPASS marcar torna a hora ocupada\n' +
            'PASS cancelar libera a hora\nPASS cancelar hora livre devolve false\n' +
            '--- bordas ---\n' +
            'PASS agenda nova tem quantidade zero\nPASS primeira livre de agenda nova e zero\n' +
            'PASS hora 0 e valida\nPASS hora 23 e valida\nPASS agenda cheia nao tem hora livre\n' +
            '--- excecoes ---\n' +
            'PASS hora negativa lanca\nPASS hora 24 lanca\n' +
            'PASS titulo em branco lanca\nPASS hora ocupada lanca\n' +
            '--- parametrizado ---\n' +
            'PASS hora=0 valida=True\nPASS hora=12 valida=True\nPASS hora=23 valida=True\n' +
            'PASS hora=-1 valida=False\nPASS hora=24 valida=False\nPASS hora=100 valida=False\n' +
            '19/19 testes passaram\nbateria: verde',
        },
      ],
    },
  },
]
