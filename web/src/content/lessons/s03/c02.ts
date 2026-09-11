import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's03c02l01',
    title: 'Criando uma List',
    objective: 'Usar uma coleção que cresce sob demanda, sem precisar saber o tamanho antes de começar.',
    concept: [
      {
        kind: 'text',
        body:
          'O array resolve o problema de guardar muitos valores, mas exige saber **quantos** antes de criar. A `List<T>` remove essa exigência: ela nasce vazia e cresce conforme você adiciona.',
      },
      {
        kind: 'code',
        code: `using System.Collections.Generic;   // necessario para List

List<int> numeros = new List<int>();

numeros.Add(10);
numeros.Add(20);

Console.WriteLine(numeros.Count);   // 2
Console.WriteLine(numeros[0]);      // 10`,
        caption: 'O `<int>` diz qual tipo a lista guarda. Ela só aceita esse tipo.',
      },
      {
        kind: 'text',
        body:
          'O `<T>` entre os sinais de menor e maior é um **parâmetro de tipo**. `List<int>` guarda inteiros, `List<string>` guarda textos, e o compilador impede a mistura. É o mesmo mecanismo que a Seção 8 aprofunda com o nome de genéricos.',
      },
      {
        kind: 'table',
        headers: ['Operação', 'Array', '`List<T>`'],
        rows: [
          ['criar', '`new int[5]`', '`new List<int>()`'],
          ['quantidade', '`Length`', '**`Count`**'],
          ['acessar por posição', '`v[i]`', '`lista[i]`'],
          ['adicionar', 'impossível', '`Add(x)`'],
          ['tamanho', 'fixo', 'cresce'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A propriedade se chama `Count`, não `Length`. É uma inconsistência do .NET que pega todo mundo: array usa `Length`, `string` usa `Length`, e `List` usa `Count`. O compilador avisa, mas o hábito demora a pegar.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma lista recém-criada tem `Count` igual a 0 — e todo laço escrito com `i < lista.Count` já trata esse caso sem nenhuma condição extra, exatamente como acontecia com arrays vazios.',
      },
      {
        kind: 'text',
        body:
          'O acesso por índice funciona igual ao do array, com a mesma faixa válida de `0` a `Count - 1` e a mesma exceção quando você sai dela.',
      },
    ],
    quiz: [
      {
        id: 's03c02l01q1',
        type: 'single',
        prompt: 'Qual propriedade informa quantos elementos há em uma `List<int>`?',
        options: [
          { id: 'a', code: 'Count', correct: true },
          { id: 'b', code: 'Length' },
          { id: 'c', code: 'Size' },
          { id: 'd', code: 'Capacity' },
        ],
        explanation:
          '`Length` é de array e `string`. `Capacity` existe em `List`, mas informa quantos cabem, não quantos há — assunto de uma lição adiante.',
      },
      {
        id: 's03c02l01q2',
        type: 'single',
        prompt: 'O que acontece ao tentar `List<int> l = new List<int>(); l.Add("oi");`?',
        options: [
          { id: 'a', text: 'Erro de compilação: a lista só aceita `int`.', correct: true },
          { id: 'b', text: 'O texto é convertido para número.' },
          { id: 'c', text: 'Compila e lança exceção em tempo de execução.' },
          { id: 'd', text: 'Funciona: `List` aceita qualquer tipo.' },
        ],
        explanation:
          'O parâmetro de tipo é verificado na compilação. Essa garantia é o principal motivo pelo qual as coleções genéricas substituíram as antigas, que aceitavam qualquer coisa.',
      },
      {
        id: 's03c02l01q3',
        type: 'single',
        prompt: 'Qual é a vantagem central da `List` sobre o array?',
        options: [
          { id: 'a', text: 'Não é preciso saber a quantidade de elementos antes de começar.', correct: true },
          { id: 'b', text: 'O acesso por índice é mais rápido.' },
          { id: 'c', text: 'Ela aceita tipos diferentes na mesma coleção.' },
          { id: 'd', text: 'Ela ocupa menos memória.' },
        ],
        explanation:
          'O acesso por índice tem custo praticamente igual, e a `List` ocupa um pouco **mais** memória, porque reserva espaço sobrando para crescer. O que ela compra é flexibilidade.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` valores, adicionando cada um a uma `List<int>`. Mostre o estado da lista antes e depois, o conteúdo, e o primeiro e o último elemento.',
      requirements: [
        'Linha 1: `Vazia: 0`, com o `Count` da lista recém-criada',
        'Linha 2: `Depois de adicionar: n`',
        'Linha 3: `Itens: 3 1 4 1`, com os elementos separados por espaço',
        'Linha 4: `Primeiro: X`',
        'Linha 5: `Ultimo: Y`',
        'Acesse o último elemento a partir de `Count`, não do `n` lido',
        'A entrada sempre tem pelo menos um valor',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> numeros = new List<int>();

        Console.WriteLine($"Vazia: {numeros.Count}");

        // Adicione os n valores e monte o relatorio
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> numeros = new List<int>();

        Console.WriteLine($"Vazia: {numeros.Count}");

        for (int i = 0; i < n; i++)
        {
            numeros.Add(int.Parse(Console.ReadLine()));
        }

        Console.WriteLine($"Depois de adicionar: {numeros.Count}");

        string itens = "";
        for (int i = 0; i < numeros.Count; i++)
        {
            itens += $"{numeros[i]} ";
        }

        Console.WriteLine($"Itens: {itens}");
        Console.WriteLine($"Primeiro: {numeros[0]}");
        Console.WriteLine($"Ultimo: {numeros[numeros.Count - 1]}");
    }
}
`,
      hints: [
        'A linha do `Vazia` já vem pronta: ela mostra que a lista começa com `Count` igual a 0.',
        'O último elemento é `numeros[numeros.Count - 1]`, a mesma conta do array com outro nome.',
      ],
      tests: [
        {
          name: 'Quatro valores',
          stdin: '4\n3\n1\n4\n1\n',
          expectedStdout: 'Vazia: 0\nDepois de adicionar: 4\nItens: 3 1 4 1\nPrimeiro: 3\nUltimo: 1',
        },
        {
          name: 'Um valor só',
          stdin: '1\n7\n',
          expectedStdout: 'Vazia: 0\nDepois de adicionar: 1\nItens: 7\nPrimeiro: 7\nUltimo: 7',
        },
        {
          name: 'Valores negativos',
          stdin: '3\n-5\n0\n5\n',
          expectedStdout: 'Vazia: 0\nDepois de adicionar: 3\nItens: -5 0 5\nPrimeiro: -5\nUltimo: 5',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c02l02',
    title: 'Add, Insert e AddRange',
    objective: 'Inserir elementos no fim, no meio e em lote, entendendo o deslocamento que uma inserção provoca.',
    concept: [
      {
        kind: 'text',
        body:
          'São três formas de crescer uma lista, e a diferença entre elas é **onde** o novo elemento entra e **quantos** entram de uma vez.',
      },
      {
        kind: 'table',
        headers: ['Método', 'Onde entra', 'Quantos'],
        rows: [
          ['`Add(x)`', 'no fim', 'um'],
          ['`Insert(i, x)`', 'na posição `i`', 'um'],
          ['`AddRange(outra)`', 'no fim', 'todos de uma vez'],
        ],
      },
      {
        kind: 'code',
        code: `List<int> lista = new List<int>();

lista.Add(10);          // 10
lista.Add(30);          // 10 30
lista.Insert(1, 20);    // 10 20 30   <- o 30 andou para a direita

List<int> extras = new List<int> { 40, 50 };
lista.AddRange(extras); // 10 20 30 40 50`,
      },
      {
        kind: 'text',
        body:
          '`Insert` **desloca** todos os elementos a partir daquela posição uma casa para a direita. Inserir no começo de uma lista de mil itens move os mil — é a operação mais cara da `List`, e o capítulo 7 volta a esse custo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A posição válida para `Insert` vai de `0` até `Count`, **inclusive**. Inserir em `Count` é legal e equivale a um `Add`: você está colocando o elemento logo depois do último. É a única operação em que o índice `Count` não é um erro.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`AddRange` copia os **valores** da outra coleção; as duas listas continuam independentes depois disso. Não confunda com a atribuição direta entre listas, que cria um apelido, exatamente como acontecia com arrays.',
      },
      {
        kind: 'text',
        body:
          'A sintaxe `new List<int> { 40, 50 }` cria e preenche em uma linha só, do mesmo jeito que `{ 40, 50 }` fazia com arrays. É conveniente quando os valores são conhecidos na hora de escrever o código.',
      },
    ],
    quiz: [
      {
        id: 's03c02l02q1',
        type: 'single',
        prompt: 'Como fica a lista `{ 1, 2, 3 }` depois de `lista.Insert(1, 99)`?',
        options: [
          { id: 'a', code: '1 99 2 3', correct: true },
          { id: 'b', code: '1 99 3' },
          { id: 'c', code: '99 1 2 3' },
          { id: 'd', code: '1 2 99 3' },
        ],
        explanation:
          '`Insert` não substitui: ele abre espaço. O 99 ocupa a posição 1 e todo o resto anda uma casa para a direita.',
      },
      {
        id: 's03c02l02q2',
        type: 'single',
        prompt: 'Qual é o maior índice aceito por `Insert` em uma lista com 3 elementos?',
        options: [
          { id: 'a', code: '3', correct: true },
          { id: 'b', code: '2' },
          { id: 'c', code: '4' },
          { id: 'd', text: 'Qualquer um: `Insert` não valida o índice.' },
        ],
        explanation:
          'Inserir em `Count` coloca o elemento depois do último, igual a um `Add`. É a exceção à regra de que o índice válido para na posição `Count - 1`.',
      },
      {
        id: 's03c02l02q3',
        type: 'single',
        prompt: 'Por que `Insert(0, x)` é uma operação cara em listas grandes?',
        options: [
          { id: 'a', text: 'Porque todos os elementos precisam ser deslocados uma posição.', correct: true },
          { id: 'b', text: 'Porque a lista precisa ser reordenada.' },
          { id: 'c', text: 'Porque a capacidade sempre dobra.' },
          { id: 'd', text: 'Não é cara: custa o mesmo que `Add`.' },
        ],
        explanation:
          'Inserir no fim mexe em um elemento; inserir no começo mexe em todos. Quando isso é frequente, a estrutura certa é outra — assunto do último capítulo desta seção.',
      },
    ],
    challenge: {
      brief:
        'Monte uma lista em três etapas. Leia `n` valores e adicione ao fim; leia uma posição e um valor e insira nela; leia `m` valores, monte uma segunda lista e acrescente tudo de uma vez. Mostre o estado após cada etapa.',
      requirements: [
        'Linha 1: `Apos Add: ...`, com os `n` primeiros valores',
        'Linha 2: `Apos Insert: ...`',
        'Linha 3: `Apos AddRange: ...`',
        'Linha 4: `Total: t`, com o `Count` final',
        'A ordem da entrada é: `n`, os `n` valores, a posição, o valor a inserir, `m`, os `m` valores',
        'A posição de inserção é sempre válida, e pode ser igual ao `Count` daquele momento',
        'Use `AddRange` na terceira etapa, não um laço de `Add`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> lista = new List<int>();

        // Etapa 1: Add dos n valores

        // Etapa 2: Insert na posicao lida

        // Etapa 3: monte a segunda lista e use AddRange
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> lista = new List<int>();

        for (int i = 0; i < n; i++)
        {
            lista.Add(int.Parse(Console.ReadLine()));
        }

        string passo1 = "";
        for (int i = 0; i < lista.Count; i++)
        {
            passo1 += $"{lista[i]} ";
        }

        Console.WriteLine($"Apos Add: {passo1}");

        int posicao = int.Parse(Console.ReadLine());
        int valor = int.Parse(Console.ReadLine());

        lista.Insert(posicao, valor);

        string passo2 = "";
        for (int i = 0; i < lista.Count; i++)
        {
            passo2 += $"{lista[i]} ";
        }

        Console.WriteLine($"Apos Insert: {passo2}");

        int m = int.Parse(Console.ReadLine());

        List<int> extras = new List<int>();
        for (int i = 0; i < m; i++)
        {
            extras.Add(int.Parse(Console.ReadLine()));
        }

        lista.AddRange(extras);

        string passo3 = "";
        for (int i = 0; i < lista.Count; i++)
        {
            passo3 += $"{lista[i]} ";
        }

        Console.WriteLine($"Apos AddRange: {passo3}");
        Console.WriteLine($"Total: {lista.Count}");
    }
}
`,
      hints: [
        'A posição e o valor da inserção só são lidos **depois** de a primeira linha ter sido impressa.',
        'A segunda lista é uma `List<int>` normal, montada com `Add`. O `AddRange` recebe ela inteira.',
      ],
      tests: [
        {
          name: 'Inserção no meio',
          stdin: '3\n10\n20\n30\n1\n15\n2\n40\n50\n',
          expectedStdout:
            'Apos Add: 10 20 30\nApos Insert: 10 15 20 30\nApos AddRange: 10 15 20 30 40 50\nTotal: 6',
        },
        {
          name: 'Inserção no começo',
          stdin: '1\n5\n0\n1\n1\n9\n',
          expectedStdout:
            'Apos Add: 5\nApos Insert: 1 5\nApos AddRange: 1 5 9\nTotal: 3',
        },
        {
          name: 'Inserção no fim e AddRange vazio',
          stdin: '2\n1\n2\n2\n3\n0\n',
          expectedStdout:
            'Apos Add: 1 2\nApos Insert: 1 2 3\nApos AddRange: 1 2 3\nTotal: 3',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c02l03',
    title: 'Remove, RemoveAt e RemoveAll',
    objective: 'Remover por valor e por posição, sabendo o que cada método devolve e quando ele falha.',
    concept: [
      {
        kind: 'text',
        body:
          'Remover tem duas perguntas diferentes por trás: "tire **este valor**" e "tire **o que está nesta posição**". Os métodos são distintos porque as perguntas são distintas.',
      },
      {
        kind: 'table',
        headers: ['Método', 'Recebe', 'Devolve', 'Se não existir'],
        rows: [
          ['`Remove(x)`', 'o valor', '`bool`', 'devolve `false`'],
          ['`RemoveAt(i)`', 'o índice', 'nada', '**lança exceção**'],
          ['`RemoveAll(...)`', 'uma condição', 'quantos saíram', 'devolve `0`'],
        ],
      },
      {
        kind: 'code',
        code: `List<int> l = new List<int> { 4, 9, 4, 7 };

bool saiu = l.Remove(4);   // true, e a lista vira 9 4 7
                           // so a PRIMEIRA ocorrencia sai

l.RemoveAt(0);             // lista vira 4 7`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`Remove` tira apenas a **primeira** ocorrência. Para tirar todas as cópias de um valor é preciso repetir a chamada — algo que a próxima lição resolve com um laço.',
      },
      {
        kind: 'text',
        body:
          'A assimetria mais importante: `Remove` devolve `false` quando o valor não existe, e segue em frente. `RemoveAt` com índice inválido **derruba o programa**, exatamente como o acesso fora dos limites de um array. Ele precisa da mesma guarda.',
      },
      {
        kind: 'code',
        code: `if (indice >= 0 && indice < lista.Count)
{
    lista.RemoveAt(indice);
}`,
        caption: 'Note o `Count` no lugar do `Length` — a guarda é a mesma ideia.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Existe ainda `RemoveAll`, que apaga tudo que satisfaz uma condição de uma vez: `lista.RemoveAll(x => x < 0)`. Aquele `x => ...` é uma **lambda**, e ela chega na Seção 4 — até lá, o mesmo efeito se obtém com um laço, que é justamente o assunto da lição sobre remover durante o percurso.',
      },
    ],
    quiz: [
      {
        id: 's03c02l03q1',
        type: 'single',
        prompt: 'Como fica `{ 4, 9, 4, 7 }` depois de `Remove(4)`?',
        options: [
          { id: 'a', code: '9 4 7', correct: true },
          { id: 'b', code: '9 7' },
          { id: 'c', code: '4 9 7' },
          { id: 'd', code: '4 9 4 7' },
        ],
        explanation:
          'Só a primeira ocorrência sai. A segunda continua na lista, e uma nova chamada seria necessária para tirá-la.',
      },
      {
        id: 's03c02l03q2',
        type: 'single',
        prompt: 'O que `Remove(99)` devolve quando o 99 não está na lista?',
        options: [
          { id: 'a', code: 'false', correct: true },
          { id: 'b', code: 'true' },
          { id: 'c', code: '-1' },
          { id: 'd', text: 'Lança exceção.' },
        ],
        explanation:
          'Ele avisa que não achou, sem interromper o programa. Quem lança exceção é o `RemoveAt` com índice inválido.',
      },
      {
        id: 's03c02l03q3',
        type: 'single',
        prompt: 'Por que `RemoveAt` precisa de guarda e `Remove` não?',
        options: [
          { id: 'a', text: 'Porque um índice inválido é uma exceção, enquanto um valor ausente é apenas `false`.', correct: true },
          { id: 'b', text: 'Porque `RemoveAt` é mais lento.' },
          { id: 'c', text: 'Porque `Remove` já valida o índice internamente.' },
          { id: 'd', text: 'Os dois precisam de guarda.' },
        ],
        explanation:
          '"Este valor não existe" é uma resposta possível; "esta posição não existe" é um erro de programação. Os dois métodos tratam isso de formas coerentes com essa diferença.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` valores para uma lista. Em seguida leia um valor a remover e um índice a remover. Aplique as duas remoções — a segunda só se o índice for válido no momento — e mostre o estado a cada passo.',
      requirements: [
        'Linha 1: `Inicial: ...`',
        'Linha 2: `Removido: True` ou `False`, com o retorno do `Remove`',
        'Linha 3: `Apos Remove: ...`',
        'Linha 4: `Indice valido: True` ou `False`',
        'Linha 5: `Apos RemoveAt: ...`',
        'Linha 6: `Total: t`',
        'A validade do índice é avaliada **depois** do `Remove`, sobre a lista já encurtada',
        'Com índice inválido, nada é removido e a lista fica igual à linha anterior',
        'O programa não pode encerrar com exceção',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> lista = new List<int>();
        for (int i = 0; i < n; i++)
        {
            lista.Add(int.Parse(Console.ReadLine()));
        }

        int valor = int.Parse(Console.ReadLine());
        int indice = int.Parse(Console.ReadLine());

        // Mostre o inicial, remova por valor, remova por indice com guarda
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> lista = new List<int>();
        for (int i = 0; i < n; i++)
        {
            lista.Add(int.Parse(Console.ReadLine()));
        }

        int valor = int.Parse(Console.ReadLine());
        int indice = int.Parse(Console.ReadLine());

        string inicial = "";
        for (int i = 0; i < lista.Count; i++)
        {
            inicial += $"{lista[i]} ";
        }

        Console.WriteLine($"Inicial: {inicial}");

        bool removido = lista.Remove(valor);
        Console.WriteLine($"Removido: {removido}");

        string aposRemove = "";
        for (int i = 0; i < lista.Count; i++)
        {
            aposRemove += $"{lista[i]} ";
        }

        Console.WriteLine($"Apos Remove: {aposRemove}");

        bool indiceValido = indice >= 0 && indice < lista.Count;
        Console.WriteLine($"Indice valido: {indiceValido}");

        if (indiceValido)
        {
            lista.RemoveAt(indice);
        }

        string aposRemoveAt = "";
        for (int i = 0; i < lista.Count; i++)
        {
            aposRemoveAt += $"{lista[i]} ";
        }

        Console.WriteLine($"Apos RemoveAt: {aposRemoveAt}");
        Console.WriteLine($"Total: {lista.Count}");
    }
}
`,
      hints: [
        'Guarde o retorno do `Remove` em um `bool` antes de imprimir: você precisa dele na linha 2.',
        'A guarda do índice usa `lista.Count` **depois** do `Remove`, porque a lista já encolheu.',
      ],
      tests: [
        {
          name: 'Remove primeira ocorrência e depois por índice',
          stdin: '5\n4\n9\n4\n7\n1\n4\n0\n',
          expectedStdout:
            'Inicial: 4 9 4 7 1\nRemovido: True\nApos Remove: 9 4 7 1\nIndice valido: True\nApos RemoveAt: 4 7 1\nTotal: 3',
        },
        {
          name: 'Valor ausente e índice inválido',
          stdin: '3\n1\n2\n3\n9\n5\n',
          expectedStdout:
            'Inicial: 1 2 3\nRemovido: False\nApos Remove: 1 2 3\nIndice valido: False\nApos RemoveAt: 1 2 3\nTotal: 3',
        },
        {
          name: 'Lista fica vazia após o Remove',
          stdin: '1\n7\n7\n0\n',
          expectedStdout:
            'Inicial: 7\nRemovido: True\nApos Remove:\nIndice valido: False\nApos RemoveAt:\nTotal: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c02l04',
    title: 'Contains e IndexOf',
    objective: 'Perguntar se um valor existe e onde ele está, escolhendo o método que responde exatamente à pergunta feita.',
    concept: [
      {
        kind: 'text',
        body:
          'A `List` oferece os mesmos métodos de busca que você viu em arrays, mais um que os arrays não têm: `Contains`, que responde diretamente com um `bool`.',
      },
      {
        kind: 'table',
        headers: ['Pergunta', 'Método', 'Devolve'],
        rows: [
          ['existe?', '`Contains(x)`', '`bool`'],
          ['onde está a primeira?', '`IndexOf(x)`', 'índice ou `-1`'],
          ['onde está a última?', '`LastIndexOf(x)`', 'índice ou `-1`'],
          ['quantas vezes?', 'laço próprio', '—'],
        ],
      },
      {
        kind: 'compare',
        good: `if (lista.Contains(alvo))
{
    // ...
}`,
        bad: `if (lista.IndexOf(alvo) >= 0)
{
    // ...
}`,
        goodLabel: 'Diz o que você quer saber',
        badLabel: 'Funciona, mas dá uma volta',
      },
      {
        kind: 'text',
        body:
          'Os dois fazem o mesmo trabalho por baixo — percorrem a lista comparando —, mas `Contains` comunica a intenção. Use `IndexOf` quando a **posição** interessa; use `Contains` quando só a existência interessa.',
      },
      {
        kind: 'text',
        body:
          'A combinação de `Contains` com `Remove` resolve o problema da lição anterior: como `Remove` só tira uma ocorrência, um laço enquanto ainda houver o valor tira todas.',
      },
      {
        kind: 'code',
        code: `int removidas = 0;

while (lista.Contains(alvo))
{
    lista.Remove(alvo);
    removidas++;
}`,
        caption: 'O laço termina porque cada volta tira uma ocorrência: o progresso é garantido.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Este laço é correto, mas percorre a lista inteira a cada volta — duas vezes, na verdade, uma no `Contains` e outra no `Remove`. Para muitas ocorrências ele fica caro, e a alternativa eficiente é o percurso de trás para frente da próxima lição.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`Contains` compara por igualdade de valor para os tipos que você usa aqui. Quando a lista guarda objetos criados por você, o significado de "igual" passa a depender de como o tipo define isso — um assunto da Seção 5.',
      },
    ],
    quiz: [
      {
        id: 's03c02l04q1',
        type: 'single',
        prompt: 'Qual é a forma mais direta de perguntar se um valor está na lista?',
        options: [
          { id: 'a', code: 'lista.Contains(alvo)', correct: true },
          { id: 'b', code: 'lista.IndexOf(alvo) >= 0' },
          { id: 'c', code: 'lista.IndexOf(alvo) != 0' },
          { id: 'd', code: 'lista[alvo] != null' },
        ],
        explanation:
          'A segunda funciona, mas responde com um índice que você descarta. A terceira está errada, e a quarta confunde índice com valor.',
      },
      {
        id: 's03c02l04q2',
        type: 'single',
        prompt: 'Por que o laço `while (lista.Contains(alvo)) lista.Remove(alvo);` termina sempre?',
        options: [
          { id: 'a', text: 'Porque cada volta remove uma ocorrência, então a quantidade diminui até zerar.', correct: true },
          { id: 'b', text: 'Porque `Contains` só devolve `true` uma vez.' },
          { id: 'c', text: 'Porque `Remove` remove todas as ocorrências.' },
          { id: 'd', text: 'Ele não termina sempre: pode travar com valores repetidos.' },
        ],
        explanation:
          'É a garantia de progresso da Seção 2 aplicada a uma coleção: a cada volta o estado se aproxima da condição de parada.',
      },
      {
        id: 's03c02l04q3',
        type: 'single',
        prompt: 'Quando `IndexOf` é preferível a `Contains`?',
        options: [
          { id: 'a', text: 'Quando você vai usar a posição do elemento depois.', correct: true },
          { id: 'b', text: 'Quando a lista é grande.' },
          { id: 'c', text: 'Quando o valor pode aparecer mais de uma vez.' },
          { id: 'd', text: 'Nunca: `Contains` sempre substitui.' },
        ],
        explanation:
          'Se você precisa da posição, `Contains` seguido de `IndexOf` faz o mesmo trabalho duas vezes. Um `IndexOf` só, com teste `>= 0`, resolve as duas coisas.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n`, depois `n` valores para uma lista, e por último um `alvo`. Informe se o alvo existe, onde ele aparece pela primeira e pela última vez, e quantas vezes. Depois remova **todas** as ocorrências dele e mostre o que sobrou.',
      requirements: [
        'Linha 1: `Contem: True` ou `False`, usando `Contains`',
        'Linha 2: `Primeira: p`, ou `-1`',
        'Linha 3: `Ultima: u`, ou `-1`',
        'Linha 4: `Ocorrencias: k`',
        'Linha 5: `Apos remover: ...`, com o que restou',
        'Linha 6: `Removidas: k`, igual ao total de ocorrências',
        'As posições precisam ser calculadas **antes** das remoções',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> lista = new List<int>();
        for (int i = 0; i < n; i++)
        {
            lista.Add(int.Parse(Console.ReadLine()));
        }

        int alvo = int.Parse(Console.ReadLine());

        // Consulte primeiro, remova depois
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> lista = new List<int>();
        for (int i = 0; i < n; i++)
        {
            lista.Add(int.Parse(Console.ReadLine()));
        }

        int alvo = int.Parse(Console.ReadLine());

        Console.WriteLine($"Contem: {lista.Contains(alvo)}");
        Console.WriteLine($"Primeira: {lista.IndexOf(alvo)}");
        Console.WriteLine($"Ultima: {lista.LastIndexOf(alvo)}");

        int ocorrencias = 0;
        foreach (int atual in lista)
        {
            if (atual == alvo)
            {
                ocorrencias++;
            }
        }

        Console.WriteLine($"Ocorrencias: {ocorrencias}");

        int removidas = 0;
        while (lista.Contains(alvo))
        {
            lista.Remove(alvo);
            removidas++;
        }

        string restante = "";
        for (int i = 0; i < lista.Count; i++)
        {
            restante += $"{lista[i]} ";
        }

        Console.WriteLine($"Apos remover: {restante}");
        Console.WriteLine($"Removidas: {removidas}");
    }
}
`,
      hints: [
        'As quatro primeiras linhas consultam a lista intacta. Só depois delas o laço de remoção começa.',
        'O laço de remoção é `while (lista.Contains(alvo))`, contando cada `Remove`.',
      ],
      tests: [
        {
          name: 'Três ocorrências espalhadas',
          stdin: '6\n4\n9\n4\n7\n4\n1\n4\n',
          expectedStdout:
            'Contem: True\nPrimeira: 0\nUltima: 4\nOcorrencias: 3\nApos remover: 9 7 1\nRemovidas: 3',
        },
        {
          name: 'Alvo ausente',
          stdin: '6\n4\n9\n4\n7\n4\n1\n5\n',
          expectedStdout:
            'Contem: False\nPrimeira: -1\nUltima: -1\nOcorrencias: 0\nApos remover: 4 9 4 7 4 1\nRemovidas: 0',
        },
        {
          name: 'Lista inteira feita do alvo',
          stdin: '3\n8\n8\n8\n8\n',
          expectedStdout:
            'Contem: True\nPrimeira: 0\nUltima: 2\nOcorrencias: 3\nApos remover:\nRemovidas: 3',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c02l05',
    title: 'Count e capacidade',
    objective: 'Separar quantos elementos existem de quanto espaço está reservado, e entender por que a lista cresce em saltos.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma `List` guarda seus elementos em um array por dentro. Como arrays não crescem, a lista mantém um array **maior que o necessário** e vai preenchendo. Daí a existência de duas propriedades diferentes.',
      },
      {
        kind: 'table',
        headers: ['Propriedade', 'Significa'],
        rows: [
          ['`Count`', 'quantos elementos existem'],
          ['`Capacity`', 'quantos cabem sem realocar'],
        ],
      },
      {
        kind: 'text',
        body:
          'Quando o `Count` alcança a `Capacity`, a lista cria um array do dobro do tamanho, copia tudo e descarta o antigo. Essa é a medição real, feita neste engine:',
      },
      {
        kind: 'output',
        code: `inicio  Count=0  Capacity=0
Add 1:  Count=1  Capacity=4
Add 4:  Count=4  Capacity=4
Add 5:  Count=5  Capacity=8
Add 8:  Count=8  Capacity=8
Add 9:  Count=9  Capacity=16`,
        caption: 'A capacidade dobra: 0, 4, 8, 16, 32...',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Dobrar em vez de crescer de um em um é o que torna o `Add` barato **em média**. A cópia acontece cada vez menos: entre as posições 8 e 16 há uma única realocação, diluída entre oito inserções.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`Capacity` é detalhe de implementação e nunca deve aparecer na lógica do seu programa. Quem responde "quantos itens tem" é sempre o `Count` — usar `Capacity` para isso dá respostas erradas em quase todos os casos.',
      },
      {
        kind: 'text',
        body:
          '`Clear()` remove todos os elementos e zera o `Count`, mas **não** devolve a capacidade: o espaço reservado continua alocado, pronto para ser reusado. Uma lista limpa está vazia, não é uma lista nova.',
      },
    ],
    quiz: [
      {
        id: 's03c02l05q1',
        type: 'single',
        prompt: 'Qual propriedade responde "quantos elementos há na lista"?',
        options: [
          { id: 'a', code: 'Count', correct: true },
          { id: 'b', code: 'Capacity' },
          { id: 'c', text: 'As duas dão o mesmo valor.' },
          { id: 'd', code: 'Length' },
        ],
        explanation:
          '`Capacity` costuma ser maior que `Count`, porque a lista reserva espaço extra. Usar uma no lugar da outra é fonte de bug silencioso.',
      },
      {
        id: 's03c02l05q2',
        type: 'single',
        prompt: 'Por que a capacidade dobra em vez de crescer de um em um?',
        options: [
          { id: 'a', text: 'Para que as realocações fiquem cada vez mais raras, tornando o `Add` barato em média.', correct: true },
          { id: 'b', text: 'Para economizar memória.' },
          { id: 'c', text: 'Porque arrays só existem em tamanhos de potência de 2.' },
          { id: 'd', text: 'É uma escolha arbitrária, sem efeito prático.' },
        ],
        explanation:
          'Crescer de um em um exigiria copiar a lista inteira a cada inserção — um custo quadrático. Dobrar dilui as cópias e ainda desperdiça, no pior caso, metade do espaço.',
      },
      {
        id: 's03c02l05q3',
        type: 'single',
        prompt: 'Depois de `lista.Clear()`, quanto valem `Count` e `Capacity`?',
        options: [
          { id: 'a', text: '`Count` fica 0; `Capacity` continua como estava.', correct: true },
          { id: 'b', text: 'Os dois ficam 0.' },
          { id: 'c', text: 'Os dois ficam como estavam.' },
          { id: 'd', text: '`Count` fica 0 e `Capacity` volta para 4.' },
        ],
        explanation:
          'Limpar esvazia sem devolver a memória, justamente para que reencher a lista não pague de novo o custo das realocações.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e depois `n` valores. Adicione um por vez, mostrando o `Count` após cada adição. Depois remova o primeiro elemento, limpe a lista e informe o estado final.',
      requirements: [
        'Uma linha por adição, no formato `Add 10 -> Count 1`',
        'Depois: `Apos RemoveAt(0): c`, com o `Count` resultante',
        'Depois: `Apos Clear: 0`',
        'Por último: `Vazia: True`, comparando o `Count` com zero',
        'Use `Count` em todas as linhas, nunca o `n` lido',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> lista = new List<int>();

        // Adicione um por vez, mostrando o Count a cada passo

        // Remova o primeiro, limpe, e relate
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> lista = new List<int>();

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());
            lista.Add(valor);
            Console.WriteLine($"Add {valor} -> Count {lista.Count}");
        }

        lista.RemoveAt(0);
        Console.WriteLine($"Apos RemoveAt(0): {lista.Count}");

        lista.Clear();
        Console.WriteLine($"Apos Clear: {lista.Count}");
        Console.WriteLine($"Vazia: {lista.Count == 0}");
    }
}
`,
      hints: [
        'Imprima o `Count` **depois** do `Add`, para que a primeira linha mostre 1 e não 0.',
        'Como a entrada tem pelo menos um valor, o `RemoveAt(0)` é sempre seguro aqui.',
      ],
      tests: [
        {
          name: 'Cinco adições',
          stdin: '5\n10\n20\n30\n40\n50\n',
          expectedStdout:
            'Add 10 -> Count 1\nAdd 20 -> Count 2\nAdd 30 -> Count 3\nAdd 40 -> Count 4\nAdd 50 -> Count 5\n' +
            'Apos RemoveAt(0): 4\nApos Clear: 0\nVazia: True',
        },
        {
          name: 'Uma adição só',
          stdin: '1\n7\n',
          expectedStdout:
            'Add 7 -> Count 1\nApos RemoveAt(0): 0\nApos Clear: 0\nVazia: True',
        },
        {
          name: 'Valores repetidos e negativos',
          stdin: '3\n-1\n-1\n0\n',
          expectedStdout:
            'Add -1 -> Count 1\nAdd -1 -> Count 2\nAdd 0 -> Count 3\n' +
            'Apos RemoveAt(0): 2\nApos Clear: 0\nVazia: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c02l06',
    title: 'Removendo durante o percurso',
    objective: 'Remover elementos enquanto percorre a coleção, evitando os dois bugs clássicos que isso provoca.',
    concept: [
      {
        kind: 'text',
        body:
          'Remover itens de uma lista enquanto você a percorre é uma das armadilhas mais famosas da programação. Ela tem duas versões, e as duas aparecem no primeiro código que qualquer pessoa escreve.',
      },
      {
        kind: 'text',
        body:
          '**Versão 1: com `foreach`.** O programa nem chega a produzir uma resposta errada — ele quebra.',
      },
      {
        kind: 'code',
        code: `foreach (int x in lista)
{
    if (x < 0) lista.Remove(x);   // explode
}`,
      },
      {
        kind: 'output',
        code: `InvalidOperationException: Collection was modified;
enumeration operation may not execute.`,
        caption: 'A lista percebe que mudou no meio do percurso e recusa continuar.',
      },
      {
        kind: 'text',
        body:
          '**Versão 2: com `for` crescente.** Este é pior, porque não quebra: ele silenciosamente **pula elementos**.',
      },
      {
        kind: 'code',
        code: `// lista: 3 -1 -2 4
// i = 1: remove o -1, a lista vira 3 -2 4
//        o -2 escorregou para a posicao 1
// i = 2: olha o 4, e o -2 nunca foi examinado`,
        caption: 'Cada remoção puxa os elementos seguintes para trás, e o `i++` pula o que veio ocupar a vaga.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A solução é percorrer **de trás para frente**. Remover a posição `i` só desloca o que vem **depois** dela — e o que vem depois já foi visitado. O trecho ainda não examinado fica intacto.',
      },
      {
        kind: 'compare',
        good: `for (int i = lista.Count - 1; i >= 0; i--)
{
    if (lista[i] < 0)
    {
        lista.RemoveAt(i);
    }
}`,
        bad: `for (int i = 0; i < lista.Count; i++)
{
    if (lista[i] < 0)
    {
        lista.RemoveAt(i);
    }
}`,
        goodLabel: 'Remove todos, sempre',
        badLabel: 'Pula negativos consecutivos',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O sintoma característico do laço crescente: ele funciona nos seus testes e falha quando dois itens a remover ficam **lado a lado**. Sempre inclua um caso assim ao testar.',
      },
    ],
    quiz: [
      {
        id: 's03c02l06q1',
        type: 'single',
        prompt: 'O que acontece ao remover de uma lista dentro de um `foreach` sobre ela?',
        options: [
          { id: 'a', text: 'Lança `InvalidOperationException` em tempo de execução.', correct: true },
          { id: 'b', text: 'Funciona normalmente.' },
          { id: 'c', text: 'Alguns elementos são pulados, sem erro.' },
          { id: 'd', text: 'Erro de compilação.' },
        ],
        explanation:
          'A coleção detecta a modificação e interrompe a enumeração. Quem pula elementos em silêncio é o `for` crescente — e por isso ele é o mais perigoso dos dois.',
      },
      {
        id: 's03c02l06q2',
        type: 'single',
        prompt: 'Com a lista `3 -1 -2 4`, quantos negativos um `for` crescente com `RemoveAt` deixa passar?',
        options: [
          { id: 'a', text: 'Um: o `-2` nunca é examinado.', correct: true },
          { id: 'b', text: 'Nenhum: os dois são removidos.' },
          { id: 'c', text: 'Dois: nenhum é removido.' },
          { id: 'd', text: 'O programa lança exceção.' },
        ],
        explanation:
          'Ao remover o `-1` da posição 1, o `-2` escorrega para a posição 1. O `i++` leva o laço para a posição 2, e o `-2` fica na lista.',
      },
      {
        id: 's03c02l06q3',
        type: 'single',
        prompt: 'Por que percorrer de trás para frente resolve o problema?',
        options: [
          { id: 'a', text: 'Porque a remoção só desloca os elementos seguintes, que já foram visitados.', correct: true },
          { id: 'b', text: 'Porque `RemoveAt` funciona diferente em índices altos.' },
          { id: 'c', text: 'Porque o `Count` não muda nesse caso.' },
          { id: 'd', text: 'Porque evita a exceção de modificação.' },
        ],
        explanation:
          'O deslocamento acontece à direita do índice removido. Indo da direita para a esquerda, a parte ainda não examinada nunca é afetada.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` valores para uma lista. Remova **todos** os valores negativos e informe quantos saíram e o que restou. A lista pode ter negativos em posições consecutivas.',
      requirements: [
        'Linha 1: `Original: ...`, antes de qualquer remoção',
        'Linha 2: `Removidos: k`',
        'Linha 3: `Restante: ...`',
        'Linha 4: `Total: t`, com o `Count` final',
        'O valor `0` não é negativo e permanece na lista',
        'Percorra de trás para frente: negativos consecutivos precisam sair todos',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> lista = new List<int>();
        for (int i = 0; i < n; i++)
        {
            lista.Add(int.Parse(Console.ReadLine()));
        }

        // Mostre o original, depois remova os negativos de tras para frente
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> lista = new List<int>();
        for (int i = 0; i < n; i++)
        {
            lista.Add(int.Parse(Console.ReadLine()));
        }

        string original = "";
        for (int i = 0; i < lista.Count; i++)
        {
            original += $"{lista[i]} ";
        }

        Console.WriteLine($"Original: {original}");

        int removidos = 0;

        for (int i = lista.Count - 1; i >= 0; i--)
        {
            if (lista[i] < 0)
            {
                lista.RemoveAt(i);
                removidos++;
            }
        }

        string restante = "";
        for (int i = 0; i < lista.Count; i++)
        {
            restante += $"{lista[i]} ";
        }

        Console.WriteLine($"Removidos: {removidos}");
        Console.WriteLine($"Restante: {restante}");
        Console.WriteLine($"Total: {lista.Count}");
    }
}
`,
      hints: [
        'O cabeçalho do laço de remoção é `for (int i = lista.Count - 1; i >= 0; i--)`.',
        'Monte a linha `Original` antes do laço de remoção: depois dele a informação já não existe.',
      ],
      tests: [
        {
          name: 'Negativos consecutivos',
          stdin: '6\n3\n-1\n-2\n4\n-5\n6\n',
          expectedStdout: 'Original: 3 -1 -2 4 -5 6\nRemovidos: 3\nRestante: 3 4 6\nTotal: 3',
        },
        {
          name: 'Todos negativos',
          stdin: '3\n-1\n-2\n-3\n',
          expectedStdout: 'Original: -1 -2 -3\nRemovidos: 3\nRestante:\nTotal: 0',
        },
        {
          name: 'O zero permanece',
          stdin: '4\n0\n-1\n0\n2\n',
          expectedStdout: 'Original: 0 -1 0 2\nRemovidos: 1\nRestante: 0 0 2\nTotal: 3',
        },
        {
          name: 'Nenhum negativo',
          stdin: '3\n1\n2\n3\n',
          expectedStdout: 'Original: 1 2 3\nRemovidos: 0\nRestante: 1 2 3\nTotal: 3',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c02l07',
    title: 'Ordenando com Sort',
    objective: 'Ordenar uma lista no lugar e preservar a ordem original criando uma cópia independente.',
    concept: [
      {
        kind: 'text',
        body:
          'A `List` traz o `Sort` como **método do próprio objeto**, e não como função separada. É a mesma diferença de escrita que existe entre `Array.Sort(v)` e `lista.Sort()` — o comportamento é o mesmo: ordenação no lugar.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Array: função estática',
          code: `Array.Sort(v);
Array.Reverse(v);`,
        },
        right: {
          label: 'List: método do objeto',
          code: `lista.Sort();
lista.Reverse();`,
        },
        note: 'Os dois alteram a coleção recebida e não devolvem nada.',
      },
      {
        kind: 'text',
        body:
          'Como a ordenação destrói a ordem original, preservá-la exige uma cópia. A `List` oferece um construtor que já faz isso: `new List<int>(outra)` cria uma lista nova com os mesmos valores.',
      },
      {
        kind: 'code',
        code: `List<int> copia = new List<int>(lista);   // copia de verdade
List<int> apelido = lista;                // apenas outro nome

copia.Sort();      // 'lista' continua intacta
apelido.Sort();    // 'lista' foi ordenada junto`,
        caption: 'A distinção entre cópia e apelido continua valendo, agora em listas.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`new List<int>(lista)` copia os valores porque a lista guarda `int`, um tipo por valor. Quando a lista guarda objetos, essa cópia duplica as **referências**, não os objetos — uma distinção que volta na Seção 5.',
      },
      {
        kind: 'text',
        body:
          'Com a lista ordenada, a **mediana** sai de graça: é o elemento central quando a quantidade é ímpar, e a média dos dois centrais quando é par.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          '`lista.Sort()` sem argumentos ordena em ordem crescente natural. Para ordenar por outro critério — decrescente, ou por um campo específico — é preciso passar uma comparação, o que depende de recursos da Seção 4. Até lá, `Sort` seguido de `Reverse` resolve o caso decrescente.',
      },
    ],
    quiz: [
      {
        id: 's03c02l07q1',
        type: 'single',
        prompt: 'Como escrever a ordenação de uma `List<int>` chamada `lista`?',
        options: [
          { id: 'a', code: 'lista.Sort();', correct: true },
          { id: 'b', code: 'List.Sort(lista);' },
          { id: 'c', code: 'lista = lista.Sort();' },
          { id: 'd', code: 'Array.Sort(lista);' },
        ],
        explanation:
          'Em `List` o `Sort` é método de instância. A terceira não compila, porque `Sort` não devolve nada — o mesmo detalhe do `Array.Sort`.',
      },
      {
        id: 's03c02l07q2',
        type: 'single',
        prompt: 'Qual linha cria uma lista independente com o mesmo conteúdo?',
        options: [
          { id: 'a', code: 'var copia = new List<int>(lista);', correct: true },
          { id: 'b', code: 'var copia = lista;' },
          { id: 'c', code: 'var copia = lista.Count;' },
          { id: 'd', code: 'List<int> copia; copia = lista;' },
        ],
        explanation:
          'As alternativas com atribuição direta criam apelidos: ordenar uma ordena a outra. Só o construtor transfere os valores para uma lista nova.',
      },
      {
        id: 's03c02l07q3',
        type: 'single',
        prompt: 'Qual é a mediana de `1, 3, 5, 9`?',
        options: [
          { id: 'a', code: '4.00', correct: true },
          { id: 'b', code: '3.00' },
          { id: 'c', code: '5.00' },
          { id: 'd', code: '4.50' },
        ],
        explanation:
          'Com quantidade par, a mediana é a média dos dois centrais: `(3 + 5) / 2`. Ela pode perfeitamente não ser um dos valores da lista.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e depois `n` valores para uma lista. Faça uma cópia independente, ordene a cópia, inverta a cópia, e mostre que a lista original continuou intacta. Informe também a mediana.',
      requirements: [
        'Linha 1: `Lista: 5 3 9 1`, na ordem lida',
        'Linha 2: `Copia ordenada: 1 3 5 9`',
        'Linha 3: `Copia invertida: 9 5 3 1`',
        'Linha 4: `Lista continua: 5 3 9 1`, provando que a original não mudou',
        'Linha 5: `Mediana: X`, com duas casas decimais',
        'A mediana é calculada sobre a cópia **ordenada**, antes da inversão',
        'Use `new List<int>(lista)` para copiar',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> lista = new List<int>();
        for (int i = 0; i < n; i++)
        {
            lista.Add(int.Parse(Console.ReadLine()));
        }

        // Copie, ordene a copia, calcule a mediana, inverta a copia
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> lista = new List<int>();
        for (int i = 0; i < n; i++)
        {
            lista.Add(int.Parse(Console.ReadLine()));
        }

        string textoLista = "";
        for (int i = 0; i < lista.Count; i++)
        {
            textoLista += $"{lista[i]} ";
        }

        List<int> copia = new List<int>(lista);
        copia.Sort();

        string ordenada = "";
        for (int i = 0; i < copia.Count; i++)
        {
            ordenada += $"{copia[i]} ";
        }

        double mediana = copia.Count % 2 == 1
            ? copia[copia.Count / 2]
            : (copia[copia.Count / 2 - 1] + copia[copia.Count / 2]) / 2.0;

        copia.Reverse();

        string invertida = "";
        for (int i = 0; i < copia.Count; i++)
        {
            invertida += $"{copia[i]} ";
        }

        Console.WriteLine($"Lista: {textoLista}");
        Console.WriteLine($"Copia ordenada: {ordenada}");
        Console.WriteLine($"Copia invertida: {invertida}");
        Console.WriteLine($"Lista continua: {textoLista}");
        Console.WriteLine($"Mediana: {mediana:F2}");
    }
}
`,
      hints: [
        'A ordem das operações é: copiar, ordenar, montar a linha ordenada, calcular a mediana, inverter, montar a linha invertida.',
        'A divisão da mediana par usa `2.0`: com `2` o resultado sairia truncado.',
      ],
      tests: [
        {
          name: 'Quantidade par',
          stdin: '4\n5\n3\n9\n1\n',
          expectedStdout:
            'Lista: 5 3 9 1\nCopia ordenada: 1 3 5 9\nCopia invertida: 9 5 3 1\nLista continua: 5 3 9 1\nMediana: 4.00',
        },
        {
          name: 'Quantidade ímpar',
          stdin: '5\n5\n3\n9\n1\n7\n',
          expectedStdout:
            'Lista: 5 3 9 1 7\nCopia ordenada: 1 3 5 7 9\nCopia invertida: 9 7 5 3 1\nLista continua: 5 3 9 1 7\nMediana: 5.00',
        },
        {
          name: 'Um valor só',
          stdin: '1\n7\n',
          expectedStdout:
            'Lista: 7\nCopia ordenada: 7\nCopia invertida: 7\nLista continua: 7\nMediana: 7.00',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c02l08',
    title: 'Convertendo array e List',
    objective: 'Transitar entre array e `List`, escolhendo a estrutura conforme a etapa do problema.',
    concept: [
      {
        kind: 'text',
        body:
          'Array e `List` guardam a mesma coisa com contratos diferentes, e converter entre os dois é rotina: você recebe um array de uma API, precisa adicionar itens, e devolve um array de novo.',
      },
      {
        kind: 'table',
        headers: ['De', 'Para', 'Como'],
        rows: [
          ['`int[]`', '`List<int>`', '`new List<int>(array)`'],
          ['`List<int>`', '`int[]`', '`lista.ToArray()`'],
          ['`int[]`', 'fim de uma lista', '`lista.AddRange(array)`'],
        ],
      },
      {
        kind: 'code',
        code: `int[] entrada = { 1, 2, 3 };

List<int> lista = new List<int>(entrada);
lista.Add(4);
lista.Add(5);

int[] saida = lista.ToArray();   // 1 2 3 4 5`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'As duas conversões **copiam** os dados. `ToArray` devolve um array novo, então alterar a lista depois não afeta o array já gerado, e vice-versa. É o oposto do que acontece numa atribuição direta.',
      },
      {
        kind: 'text',
        body:
          'A escolha entre os dois é sobre o que o problema exige. Se a quantidade é conhecida e fixa, o array basta e ocupa menos memória. Se ela muda durante o processamento, a `List` evita o trabalho manual de realocar e copiar.',
      },
      {
        kind: 'compare',
        good: `List<int> lista = new List<int>(entrada);
lista.Add(4);
int[] saida = lista.ToArray();`,
        bad: `int[] maior = new int[entrada.Length + 1];
Array.Copy(entrada, maior, entrada.Length);
maior[entrada.Length] = 4;`,
        goodLabel: 'Deixa a List fazer o trabalho',
        badLabel: 'Realocação na mão',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Converter tem custo: `ToArray` percorre e copia tudo. Fazer isso dentro de um laço transforma uma operação barata em quadrática. Converta nas bordas do processamento — na entrada e na saída —, nunca no meio.',
      },
    ],
    quiz: [
      {
        id: 's03c02l08q1',
        type: 'single',
        prompt: 'Como transformar um `int[]` em `List<int>`?',
        options: [
          { id: 'a', code: 'new List<int>(array)', correct: true },
          { id: 'b', code: 'array.ToList()' },
          { id: 'c', code: '(List<int>)array' },
          { id: 'd', code: 'new List<int>[array]' },
        ],
        explanation:
          'O construtor aceita qualquer coleção do mesmo tipo. Existe também um `ToList()`, mas ele vem do LINQ e chega só na Seção 4.',
      },
      {
        id: 's03c02l08q2',
        type: 'single',
        prompt: 'Depois de `int[] saida = lista.ToArray();`, alterar a lista muda o `saida`?',
        options: [
          { id: 'a', text: 'Não: `ToArray` produziu um array independente.', correct: true },
          { id: 'b', text: 'Sim: os dois apontam para os mesmos dados.' },
          { id: 'c', text: 'Só se a lista crescer.' },
          { id: 'd', text: 'Só se a lista encolher.' },
        ],
        explanation:
          '`ToArray` copia os valores para um array novo. Isso é diferente de uma atribuição entre variáveis do mesmo tipo, que criaria um apelido.',
      },
      {
        id: 's03c02l08q3',
        type: 'single',
        prompt: 'Onde converter entre array e `List` em um programa?',
        options: [
          { id: 'a', text: 'Nas bordas: ao receber a entrada e ao produzir a saída.', correct: true },
          { id: 'b', text: 'A cada volta do laço principal.' },
          { id: 'c', text: 'Sempre que a coleção for consultada.' },
          { id: 'd', text: 'Nunca: converter é sempre errado.' },
        ],
        explanation:
          'Cada conversão copia a coleção inteira. Uma conversão por execução é irrelevante; uma por iteração multiplica o custo pelo tamanho dos dados.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` valores para dentro de um **array**. Converta para `List`, acrescente `m` valores adicionais, e converta de volta para array. Mostre cada etapa.',
      requirements: [
        'Linha 1: `Array inicial: ...`',
        'Linha 2: `Lista: ...`, logo após a conversão',
        'Linha 3: `Apos adicionar: ...`',
        'Linha 4: `Array final: ...`',
        'Linha 5: `Tamanho inicial: t`',
        'Linha 6: `Tamanho final: u`',
        'Linha 7: `Sao o mesmo array: False`, usando `ReferenceEquals`',
        'A ordem da entrada é: `n`, os `n` valores, `m`, os `m` valores',
        'Use `new List<int>(array)` e `ToArray()`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] entrada = new int[n];
        for (int i = 0; i < entrada.Length; i++)
        {
            entrada[i] = int.Parse(Console.ReadLine());
        }

        // Converta para List, acrescente m valores, converta de volta
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] entrada = new int[n];
        for (int i = 0; i < entrada.Length; i++)
        {
            entrada[i] = int.Parse(Console.ReadLine());
        }

        string textoEntrada = "";
        for (int i = 0; i < entrada.Length; i++)
        {
            textoEntrada += $"{entrada[i]} ";
        }

        List<int> lista = new List<int>(entrada);

        string textoLista = "";
        for (int i = 0; i < lista.Count; i++)
        {
            textoLista += $"{lista[i]} ";
        }

        int m = int.Parse(Console.ReadLine());
        for (int i = 0; i < m; i++)
        {
            lista.Add(int.Parse(Console.ReadLine()));
        }

        string textoDepois = "";
        for (int i = 0; i < lista.Count; i++)
        {
            textoDepois += $"{lista[i]} ";
        }

        int[] saida = lista.ToArray();

        string textoSaida = "";
        for (int i = 0; i < saida.Length; i++)
        {
            textoSaida += $"{saida[i]} ";
        }

        Console.WriteLine($"Array inicial: {textoEntrada}");
        Console.WriteLine($"Lista: {textoLista}");
        Console.WriteLine($"Apos adicionar: {textoDepois}");
        Console.WriteLine($"Array final: {textoSaida}");
        Console.WriteLine($"Tamanho inicial: {entrada.Length}");
        Console.WriteLine($"Tamanho final: {saida.Length}");
        Console.WriteLine($"Sao o mesmo array: {ReferenceEquals(entrada, saida)}");
    }
}
`,
      hints: [
        'A linha `Lista` precisa ser montada logo após a conversão, antes de qualquer `Add`.',
        'O `m` e os valores extras só são lidos depois de a lista já existir.',
      ],
      tests: [
        {
          name: 'Três viram cinco',
          stdin: '3\n1\n2\n3\n2\n4\n5\n',
          expectedStdout:
            'Array inicial: 1 2 3\nLista: 1 2 3\nApos adicionar: 1 2 3 4 5\nArray final: 1 2 3 4 5\n' +
            'Tamanho inicial: 3\nTamanho final: 5\nSao o mesmo array: False',
        },
        {
          name: 'Nenhum valor acrescentado',
          stdin: '1\n9\n0\n',
          expectedStdout:
            'Array inicial: 9\nLista: 9\nApos adicionar: 9\nArray final: 9\n' +
            'Tamanho inicial: 1\nTamanho final: 1\nSao o mesmo array: False',
        },
        {
          name: 'Array de entrada vazio',
          stdin: '0\n2\n7\n8\n',
          expectedStdout:
            'Array inicial:\nLista:\nApos adicionar: 7 8\nArray final: 7 8\n' +
            'Tamanho inicial: 0\nTamanho final: 2\nSao o mesmo array: False',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c02l09',
    title: 'Prática: lista de tarefas',
    objective: 'Interpretar comandos de texto para manipular uma `List<string>`, validando cada operação antes de executá-la.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma lista de tarefas é o exemplo mais direto de coleção que cresce e encolhe conforme o uso. E como os comandos vêm de fora, ela exerce ao mesmo tempo o outro tema desta lição: **validar antes de agir**.',
      },
      {
        kind: 'text',
        body:
          'Cada linha de entrada tem um verbo e um argumento, separados pelo primeiro espaço. Recortar isso usa duas ferramentas da Seção 1: `IndexOf` para achar o separador e `Substring` para dividir.',
      },
      {
        kind: 'code',
        code: `int espaco = linha.IndexOf(' ');

string verbo = espaco >= 0 ? linha.Substring(0, espaco) : linha;
string argumento = espaco >= 0 ? linha.Substring(espaco + 1) : "";`,
        caption: 'Sem espaço nenhum, a linha inteira é o verbo e o argumento fica vazio.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Cortar no **primeiro** espaço, e não em todos, é o que permite que a tarefa tenha várias palavras. `Split(\' \')` quebraria "Comprar pao" em dois pedaços e perderia metade do texto.',
      },
      {
        kind: 'table',
        headers: ['Comando', 'Efeito', 'Rejeitado quando'],
        rows: [
          ['`add <texto>`', 'acrescenta ao fim', 'o texto está vazio'],
          ['`feito <i>`', 'remove a posição `i`', '`i` não é número ou está fora'],
          ['qualquer outro', 'nada', 'sempre'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A validade do índice muda a cada comando, porque a lista encolhe. Um `feito 2` que era válido no começo pode deixar de ser depois de duas remoções — a guarda tem que consultar o `Count` **no momento**, nunca um valor guardado antes.',
      },
      {
        kind: 'text',
        body:
          'Este é o primeiro programa da seção que guarda `string` em vez de `int`. A `List<string>` funciona exatamente igual: só o parâmetro de tipo muda.',
      },
    ],
    quiz: [
      {
        id: 's03c02l09q1',
        type: 'single',
        prompt: 'Por que cortar a linha no primeiro espaço em vez de usar `Split`?',
        options: [
          { id: 'a', text: 'Porque a tarefa pode ter várias palavras, e o `Split` a quebraria em pedaços.', correct: true },
          { id: 'b', text: 'Porque `Split` não funciona com espaço.' },
          { id: 'c', text: 'Porque `Split` é mais lento.' },
          { id: 'd', text: 'São equivalentes: qualquer um serve.' },
        ],
        explanation:
          '`"add Comprar pao".Split(\' \')` produz três pedaços. O corte no primeiro espaço separa exatamente o verbo do resto, seja qual for o tamanho do resto.',
      },
      {
        id: 's03c02l09q2',
        type: 'single',
        prompt: 'Um `feito 2` era válido no início da execução. Ele continua válido depois de duas remoções?',
        options: [
          { id: 'a', text: 'Não necessariamente: a lista encolheu e o `Count` mudou.', correct: true },
          { id: 'b', text: 'Sim: índices válidos continuam válidos.' },
          { id: 'c', text: 'Sim, desde que nada tenha sido adicionado.' },
          { id: 'd', text: 'Depende do conteúdo das tarefas.' },
        ],
        explanation:
          'Com três tarefas, o índice 2 existe. Depois de duas remoções sobra uma, e o único índice válido é 0. A guarda precisa ser reavaliada a cada comando.',
      },
      {
        id: 's03c02l09q3',
        type: 'multiple',
        prompt: 'Quais linhas devem ser rejeitadas por este programa?',
        options: [
          { id: 'a', text: '`add` sozinho, sem texto.', correct: true },
          { id: 'b', text: '`feito abc`', correct: true },
          { id: 'c', text: '`remover 1`', correct: true },
          { id: 'd', text: '`add Comprar pao`' },
        ],
        explanation:
          'Uma tarefa vazia não é tarefa, `abc` não converte para índice, e `remover` não é um verbo conhecido. Só a última é um comando válido.',
      },
    ],
    challenge: {
      brief:
        'Implemente uma lista de tarefas por comandos. Leia linhas até a palavra `fim`. `add <texto>` acrescenta uma tarefa; `feito <indice>` conclui a tarefa naquela posição, contando de 0; qualquer outra linha é ignorada. Ao final, informe as estatísticas e as tarefas pendentes.',
      requirements: [
        'Linha 1: `Adicionadas: a`',
        'Linha 2: `Concluidas: c`',
        'Linha 3: `Ignoradas: g`',
        'Linha 4: `Pendentes: p`',
        'Depois, uma linha por tarefa pendente, no formato `1. Comprar pao`, numerando a partir de 1',
        'Um `add` sem texto é ignorado',
        'Um `feito` com índice não numérico ou fora dos limites atuais é ignorado',
        'Verbos desconhecidos são ignorados',
        'Sem tarefas pendentes, nenhuma linha numerada é impressa',
        'O programa não pode encerrar com exceção',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<string> tarefas = new List<string>();

        int adicionadas = 0;
        int concluidas = 0;
        int ignoradas = 0;

        string linha = Console.ReadLine();

        // Interprete os comandos ate a palavra "fim"

        Console.WriteLine($"Adicionadas: {adicionadas}");
        Console.WriteLine($"Concluidas: {concluidas}");
        Console.WriteLine($"Ignoradas: {ignoradas}");
        Console.WriteLine($"Pendentes: {tarefas.Count}");

        // Liste as pendentes, numerando a partir de 1
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<string> tarefas = new List<string>();

        int adicionadas = 0;
        int concluidas = 0;
        int ignoradas = 0;

        string linha = Console.ReadLine();

        while (linha != "fim")
        {
            int espaco = linha.IndexOf(' ');
            string verbo = espaco >= 0 ? linha.Substring(0, espaco) : linha;
            string argumento = espaco >= 0 ? linha.Substring(espaco + 1) : "";

            if (verbo == "add" && argumento.Length > 0)
            {
                tarefas.Add(argumento);
                adicionadas++;
            }
            else if (verbo == "feito"
                && int.TryParse(argumento, out int indice)
                && indice >= 0
                && indice < tarefas.Count)
            {
                tarefas.RemoveAt(indice);
                concluidas++;
            }
            else
            {
                ignoradas++;
            }

            linha = Console.ReadLine();
        }

        Console.WriteLine($"Adicionadas: {adicionadas}");
        Console.WriteLine($"Concluidas: {concluidas}");
        Console.WriteLine($"Ignoradas: {ignoradas}");
        Console.WriteLine($"Pendentes: {tarefas.Count}");

        for (int i = 0; i < tarefas.Count; i++)
        {
            Console.WriteLine($"{i + 1}. {tarefas[i]}");
        }
    }
}
`,
      hints: [
        'O `int.TryParse` e a checagem de limites entram na mesma condição do `feito`, ligados por `&&` — o curto-circuito garante a ordem segura.',
        'A numeração da listagem final começa em 1, mas o índice do `feito` começa em 0. São contagens diferentes de propósito.',
      ],
      tests: [
        {
          name: 'Comandos válidos e inválidos misturados',
          stdin: 'add Comprar pao\nadd Lavar roupa\nadd Estudar C#\nfeito 1\nadd Pagar conta\nfeito 9\nxyz\nfim\n',
          expectedStdout:
            'Adicionadas: 4\nConcluidas: 1\nIgnoradas: 2\nPendentes: 3\n1. Comprar pao\n2. Estudar C#\n3. Pagar conta',
        },
        {
          name: 'Uma tarefa só',
          stdin: 'add Unica\nfim\n',
          expectedStdout: 'Adicionadas: 1\nConcluidas: 0\nIgnoradas: 0\nPendentes: 1\n1. Unica',
        },
        {
          name: 'add vazio e feito não numérico',
          stdin: 'add\nadd A\nfeito abc\nfeito 0\nfim\n',
          expectedStdout: 'Adicionadas: 1\nConcluidas: 1\nIgnoradas: 2\nPendentes: 0',
        },
        {
          name: 'Nenhum comando',
          stdin: 'fim\n',
          expectedStdout: 'Adicionadas: 0\nConcluidas: 0\nIgnoradas: 0\nPendentes: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c02l10',
    title: 'Checkpoint: listas',
    objective: 'Filtrar, ordenar e consultar uma lista em sequência, preservando o estado necessário a cada etapa.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint encadeia as quatro operações centrais do capítulo em uma ordem que importa: mostrar o original, **filtrar** removendo de trás para frente, **ordenar** o que sobrou, e **consultar** o resultado.',
      },
      {
        kind: 'table',
        headers: ['Etapa', 'Operação', 'Cuidado'],
        rows: [
          ['1', 'montar a linha original', 'antes de qualquer remoção'],
          ['2', 'remover abaixo do mínimo', 'percurso de trás para frente'],
          ['3', 'ordenar o que restou', '`Sort` altera no lugar'],
          ['4', 'somar, buscar, contar', 'sobre a lista já filtrada'],
        ],
      },
      {
        kind: 'text',
        body:
          'A ordem entre filtrar e ordenar é livre — o resultado é o mesmo —, mas filtrar primeiro é mais barato: ordenar uma lista menor custa menos que ordenar tudo e depois jogar fora metade.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A posição do alvo é pedida sobre a lista **filtrada e ordenada**, não sobre a original. Um valor que existia na entrada pode ter sido removido pelo filtro, e nesse caso a resposta correta é `-1`.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Resolva uma linha por vez, rodando os testes a cada uma. Os casos que quebram programas aqui são a lista que fica **vazia** depois do filtro — média com divisão por zero — e o alvo que some no meio do caminho.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que nenhuma etapa precisou de um array. A `List` cobre tudo que o capítulo 1 fazia, e ainda cresce e encolhe. O último capítulo desta seção volta a essa comparação para mostrar quando o array ainda vale a pena.',
      },
    ],
    quiz: [
      {
        id: 's03c02l10q1',
        type: 'single',
        prompt: 'Por que é preferível filtrar antes de ordenar?',
        options: [
          { id: 'a', text: 'Porque ordenar uma lista menor custa menos.', correct: true },
          { id: 'b', text: 'Porque ordenar antes daria um resultado diferente.' },
          { id: 'c', text: 'Porque `Sort` não funciona em listas com valores a remover.' },
          { id: 'd', text: 'Porque a remoção só funciona em listas desordenadas.' },
        ],
        explanation:
          'O resultado final é idêntico nas duas ordens. A diferença é de custo: ordenar é a operação mais cara da sequência, então vale aplicá-la ao menor conjunto possível.',
      },
      {
        id: 's03c02l10q2',
        type: 'single',
        prompt: 'O alvo existia na lista original, mas foi removido pelo filtro. Qual deve ser a posição informada?',
        options: [
          { id: 'a', code: '-1', correct: true },
          { id: 'b', text: 'A posição que ele tinha na lista original.' },
          { id: 'c', code: '0' },
          { id: 'd', text: 'O programa deveria reportar erro.' },
        ],
        explanation:
          'A consulta é feita sobre a lista final. Se o valor não está lá, `IndexOf` devolve `-1`, e essa é a resposta honesta.',
      },
      {
        id: 's03c02l10q3',
        type: 'single',
        prompt: 'Qual é o caso de borda mais perigoso deste programa?',
        options: [
          { id: 'a', text: 'O filtro remover todos os elementos, deixando a média sem denominador.', correct: true },
          { id: 'b', text: 'Todos os valores serem iguais.' },
          { id: 'c', text: 'O alvo aparecer mais de uma vez.' },
          { id: 'd', text: 'A lista já vir ordenada.' },
        ],
        explanation:
          'Com a lista vazia, `soma / Count` divide por zero. Valores repetidos e listas já ordenadas não exigem nenhum tratamento especial.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n`, depois `n` valores para uma lista, depois um `minimo` e por último um `alvo`. Remova da lista todos os valores **menores** que o mínimo, ordene o que sobrou, e produza o relatório do resultado.',
      requirements: [
        'Linha 1: `Original: ...`, na ordem lida',
        'Linha 2: `Removidos: k`',
        'Linha 3: `Restante ordenado: ...`',
        'Linha 4: `Count: c`',
        'Linha 5: `Soma: s`',
        'Linha 6: `Media: m`, com duas casas decimais, ou `0.00` se nada restou',
        'Linha 7: `Contem: True` ou `False`, sobre a lista final',
        'Linha 8: `Posicao: p`, o índice do alvo na lista final, ou `-1`',
        'Um valor **igual** ao mínimo permanece na lista',
        'Remova percorrendo de trás para frente',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> lista = new List<int>();
        for (int i = 0; i < n; i++)
        {
            lista.Add(int.Parse(Console.ReadLine()));
        }

        int minimo = int.Parse(Console.ReadLine());
        int alvo = int.Parse(Console.ReadLine());

        // 1. linha original  2. filtrar  3. ordenar  4. consultar
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> lista = new List<int>();
        for (int i = 0; i < n; i++)
        {
            lista.Add(int.Parse(Console.ReadLine()));
        }

        int minimo = int.Parse(Console.ReadLine());
        int alvo = int.Parse(Console.ReadLine());

        string original = "";
        for (int i = 0; i < lista.Count; i++)
        {
            original += $"{lista[i]} ";
        }

        int removidos = 0;

        for (int i = lista.Count - 1; i >= 0; i--)
        {
            if (lista[i] < minimo)
            {
                lista.RemoveAt(i);
                removidos++;
            }
        }

        lista.Sort();

        string restante = "";
        int soma = 0;

        for (int i = 0; i < lista.Count; i++)
        {
            restante += $"{lista[i]} ";
            soma += lista[i];
        }

        double media = lista.Count > 0 ? (double)soma / lista.Count : 0.0;

        Console.WriteLine($"Original: {original}");
        Console.WriteLine($"Removidos: {removidos}");
        Console.WriteLine($"Restante ordenado: {restante}");
        Console.WriteLine($"Count: {lista.Count}");
        Console.WriteLine($"Soma: {soma}");
        Console.WriteLine($"Media: {media:F2}");
        Console.WriteLine($"Contem: {lista.Contains(alvo)}");
        Console.WriteLine($"Posicao: {lista.IndexOf(alvo)}");
    }
}
`,
      hints: [
        'A linha `Original` precisa ser montada antes do filtro; depois dele a ordem de entrada já não existe.',
        'A guarda `lista.Count > 0` na média é o que impede a divisão por zero quando o filtro leva tudo.',
      ],
      tests: [
        {
          name: 'Filtro remove parte da lista',
          stdin: '6\n12\n5\n30\n8\n20\n3\n10\n20\n',
          expectedStdout:
            'Original: 12 5 30 8 20 3\nRemovidos: 3\nRestante ordenado: 12 20 30\nCount: 3\n' +
            'Soma: 62\nMedia: 20.67\nContem: True\nPosicao: 1',
        },
        {
          name: 'Filtro remove tudo',
          stdin: '3\n1\n2\n3\n10\n5\n',
          expectedStdout:
            'Original: 1 2 3\nRemovidos: 3\nRestante ordenado:\nCount: 0\n' +
            'Soma: 0\nMedia: 0.00\nContem: False\nPosicao: -1',
        },
        {
          name: 'Valor igual ao mínimo permanece',
          stdin: '4\n10\n10\n10\n10\n10\n10\n',
          expectedStdout:
            'Original: 10 10 10 10\nRemovidos: 0\nRestante ordenado: 10 10 10 10\nCount: 4\n' +
            'Soma: 40\nMedia: 10.00\nContem: True\nPosicao: 0',
        },
        {
          name: 'Um valor só, nada removido',
          stdin: '1\n5\n1\n5\n',
          expectedStdout:
            'Original: 5\nRemovidos: 0\nRestante ordenado: 5\nCount: 1\n' +
            'Soma: 5\nMedia: 5.00\nContem: True\nPosicao: 0',
          hidden: true,
        },
      ],
    },
  },
]
