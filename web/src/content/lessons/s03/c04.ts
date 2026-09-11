import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's03c04l01',
    title: 'HashSet e unicidade',
    objective: 'Guardar valores sem repetição e testar pertinência imediatamente, usando o retorno do `Add` como informação.',
    concept: [
      {
        kind: 'text',
        body:
          'Um `HashSet<T>` é um `Dictionary` sem os valores: só as chaves. Ele responde a uma pergunta só — **"este item já está aqui?"** — e responde imediatamente, sem percorrer nada.',
      },
      {
        kind: 'code',
        code: `HashSet<int> vistos = new HashSet<int>();

bool novo = vistos.Add(3);    // true  -> entrou
bool repetido = vistos.Add(3); // false -> ja estava

Console.WriteLine(vistos.Count);        // 1
Console.WriteLine(vistos.Contains(3));  // True`,
        caption: 'O `Add` nunca falha nem duplica: ele apenas informa se houve novidade.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O retorno do `Add` é a peça mais útil do tipo. Ele detecta duplicata **e** registra o item na mesma operação — sem precisar de um `Contains` antes, que faria a busca duas vezes.',
      },
      {
        kind: 'table',
        headers: ['Coleção', 'Aceita repetido', 'Tem ordem', 'Buscar por valor'],
        rows: [
          ['`List<T>`', 'sim', 'sim', 'percorre tudo'],
          ['`HashSet<T>`', '**não**', '**não**', 'imediato'],
          ['`Dictionary`', 'chave não', 'não', 'imediato'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um `HashSet` **não tem ordem** e **não tem índice**: não existe `conjunto[0]`. Se você precisa da posição dos itens ou da ordem em que entraram, o `HashSet` sozinho não serve — a próxima lição sobre duplicados mostra como combinar os dois.',
      },
      {
        kind: 'text',
        body:
          'Como a ordem de enumeração não é garantida, produzir saída determinística exige o mesmo recurso do `Dictionary`: copiar para uma `List` e ordenar.',
      },
      {
        kind: 'code',
        code: `List<int> ordenados = new List<int>(vistos);
ordenados.Sort();`,
      },
    ],
    quiz: [
      {
        id: 's03c04l01q1',
        type: 'single',
        prompt: 'O que `conjunto.Add(3)` devolve quando o 3 já está no conjunto?',
        options: [
          { id: 'a', code: 'false', correct: true },
          { id: 'b', code: 'true' },
          { id: 'c', text: 'Lança exceção.' },
          { id: 'd', text: 'Nada: `Add` não devolve valor.' },
        ],
        explanation:
          'Diferente do `Add` de `Dictionary`, que recusa chave repetida com exceção, o do `HashSet` apenas informa que não houve novidade. Nada quebra.',
      },
      {
        id: 's03c04l01q2',
        type: 'single',
        prompt: 'Por que usar o retorno do `Add` em vez de `Contains` seguido de `Add`?',
        options: [
          { id: 'a', text: 'Porque resolve detecção e inserção em uma única operação.', correct: true },
          { id: 'b', text: 'Porque `Contains` não funciona em `HashSet`.' },
          { id: 'c', text: 'Porque `Contains` pode lançar exceção.' },
          { id: 'd', text: 'São equivalentes em custo.' },
        ],
        explanation:
          'É o mesmo raciocínio do `TryGetValue` contra `ContainsKey` mais indexador: uma busca em vez de duas, dizendo exatamente o que você quer saber.',
      },
      {
        id: 's03c04l01q3',
        type: 'single',
        prompt: 'O que `conjunto[0]` faz em um `HashSet<int>`?',
        options: [
          { id: 'a', text: 'Não compila: `HashSet` não tem indexador.', correct: true },
          { id: 'b', text: 'Devolve o primeiro item inserido.' },
          { id: 'c', text: 'Devolve o menor valor.' },
          { id: 'd', text: 'Lança exceção em tempo de execução.' },
        ],
        explanation:
          'Um conjunto não tem posições. Ele sabe se um item pertence, e mais nada — e é essa renúncia que torna a consulta tão rápida.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` valores. Guarde-os em um `HashSet`, contando quantos eram novos e quantos eram repetidos. Liste os valores distintos em ordem crescente.',
      requirements: [
        'Linha 1: `Valores: 1 3 4 5`, em ordem crescente',
        'Linha 2: `Distintos: d`',
        'Linha 3: `Duplicados: r`',
        'Linha 4: `Total lido: n`',
        '`d` mais `r` tem que dar `n`',
        'Use o retorno do `Add` para contar os duplicados, sem `Contains`',
        'A ordem crescente precisa ser produzida explicitamente',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        HashSet<int> conjunto = new HashSet<int>();
        int duplicados = 0;

        // Use o retorno do Add para contar as repeticoes

        // Copie para uma List, ordene, e imprima
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

        HashSet<int> conjunto = new HashSet<int>();
        int duplicados = 0;

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());

            if (!conjunto.Add(valor))
            {
                duplicados++;
            }
        }

        List<int> ordenados = new List<int>(conjunto);
        ordenados.Sort();

        string valores = "";
        for (int i = 0; i < ordenados.Count; i++)
        {
            valores += $"{ordenados[i]} ";
        }

        Console.WriteLine($"Valores: {valores}");
        Console.WriteLine($"Distintos: {conjunto.Count}");
        Console.WriteLine($"Duplicados: {duplicados}");
        Console.WriteLine($"Total lido: {n}");
    }
}
`,
      hints: [
        'O `!` na frente do `Add` inverte o teste: o corpo do `if` roda quando o valor já estava lá.',
        'A cópia ordenada é `new List<int>(conjunto)` seguida de `Sort()`.',
      ],
      tests: [
        {
          name: 'Com repetições',
          stdin: '6\n3\n1\n4\n1\n5\n3\n',
          expectedStdout: 'Valores: 1 3 4 5\nDistintos: 4\nDuplicados: 2\nTotal lido: 6',
        },
        {
          name: 'Nenhuma repetição',
          stdin: '3\n10\n20\n30\n',
          expectedStdout: 'Valores: 10 20 30\nDistintos: 3\nDuplicados: 0\nTotal lido: 3',
        },
        {
          name: 'Todos iguais',
          stdin: '4\n7\n7\n7\n7\n',
          expectedStdout: 'Valores: 7\nDistintos: 1\nDuplicados: 3\nTotal lido: 4',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c04l02',
    title: 'União, interseção e diferença',
    objective: 'Combinar dois conjuntos com as operações da teoria dos conjuntos, protegendo os originais das mutações.',
    concept: [
      {
        kind: 'text',
        body:
          'O `HashSet` traz as operações clássicas de conjuntos como métodos. Todas elas têm uma característica em comum e perigosa: **modificam o conjunto que as recebe**.',
      },
      {
        kind: 'table',
        headers: ['Método', 'Resultado em `a`', 'Notação'],
        rows: [
          ['`a.UnionWith(b)`', 'tudo que está em `a` ou em `b`', 'A ∪ B'],
          ['`a.IntersectWith(b)`', 'só o que está nos dois', 'A ∩ B'],
          ['`a.ExceptWith(b)`', 'o que está em `a` e não em `b`', 'A − B'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Os nomes terminam em `With` justamente porque alteram o receptor. `a.UnionWith(b)` não devolve um conjunto novo: ele **transforma o `a`**. Chamar duas dessas em sequência sobre o mesmo conjunto dá resultados que não têm nada a ver com o esperado.',
      },
      {
        kind: 'code',
        code: `// para preservar a e b, opere sempre sobre copias
HashSet<int> uniao = new HashSet<int>(a);
uniao.UnionWith(b);

HashSet<int> intersecao = new HashSet<int>(a);
intersecao.IntersectWith(b);

HashSet<int> soEmA = new HashSet<int>(a);
soEmA.ExceptWith(b);`,
        caption: 'Uma cópia por operação: é o mesmo cuidado do `Array.Sort` e do `List.Sort`.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Conjuntos',
          code: `A = { 1, 2, 3, 4 }
B = {       3, 4, 5 }`,
        },
        right: {
          label: 'Resultados',
          code: `A uniao B      = 1 2 3 4 5
A intersec. B  = 3 4
A menos B      = 1 2
B menos A      = 5`,
        },
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A diferença não é simétrica: `A − B` e `B − A` são coisas distintas. União e interseção, por outro lado, dão o mesmo resultado nos dois sentidos — e essa assimetria é a fonte de erro mais comum ao usar essas operações.',
      },
    ],
    quiz: [
      {
        id: 's03c04l02q1',
        type: 'single',
        prompt: 'O que `a.IntersectWith(b)` faz?',
        options: [
          { id: 'a', text: 'Deixa em `a` apenas os elementos que também estão em `b`.', correct: true },
          { id: 'b', text: 'Devolve um conjunto novo com os elementos comuns.' },
          { id: 'c', text: 'Deixa em `b` apenas os elementos comuns.' },
          { id: 'd', text: 'Devolve `true` se há elementos comuns.' },
        ],
        explanation:
          'O sufixo `With` indica mutação do receptor. Se você precisa preservar o `a`, opere sobre uma cópia.',
      },
      {
        id: 's03c04l02q2',
        type: 'single',
        prompt: 'Com `A = {1,2,3}` e `B = {3,4}`, quanto vale `B − A`?',
        options: [
          { id: 'a', code: '{ 4 }', correct: true },
          { id: 'b', code: '{ 1, 2 }' },
          { id: 'c', code: '{ 1, 2, 4 }' },
          { id: 'd', code: '{ 3 }' },
        ],
        explanation:
          '`B − A` guarda o que está em `B` e não em `A`. A resposta `{1, 2}` seria `A − B` — a diferença não é simétrica.',
      },
      {
        id: 's03c04l02q3',
        type: 'single',
        prompt: 'Por que operar sobre cópias em vez dos conjuntos originais?',
        options: [
          { id: 'a', text: 'Porque cada operação destrói o receptor, e os originais ainda serão usados.', correct: true },
          { id: 'b', text: 'Porque os métodos não funcionam no original.' },
          { id: 'c', text: 'Por questão de desempenho.' },
          { id: 'd', text: 'Não é necessário: os métodos não alteram nada.' },
        ],
        explanation:
          'É o mesmo padrão do `Sort`: quando a operação é in-place e você precisa do estado anterior, a cópia é obrigatória.',
      },
    ],
    challenge: {
      brief:
        'Leia dois conjuntos de inteiros e produza os quatro resultados clássicos: união, interseção, o que só está no primeiro, e o que só está no segundo. Todos em ordem crescente.',
      requirements: [
        'Linha 1: `Uniao: ...`',
        'Linha 2: `Intersecao: ...`',
        'Linha 3: `A menos B: ...`',
        'Linha 4: `B menos A: ...`',
        'Todos os resultados em ordem crescente, com os valores separados por espaço',
        'A ordem da entrada é: `n`, os `n` valores de A, `m`, os `m` valores de B',
        'Valores repetidos na entrada entram no conjunto uma vez só',
        'Um resultado vazio produz apenas o rótulo',
        'Opere sobre cópias: os conjuntos originais são necessários nas quatro linhas',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        HashSet<int> a = new HashSet<int>();
        for (int i = 0; i < n; i++)
        {
            a.Add(int.Parse(Console.ReadLine()));
        }

        int m = int.Parse(Console.ReadLine());
        HashSet<int> b = new HashSet<int>();
        for (int i = 0; i < m; i++)
        {
            b.Add(int.Parse(Console.ReadLine()));
        }

        // Uma copia por operacao, depois ordene cada resultado
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
        HashSet<int> a = new HashSet<int>();
        for (int i = 0; i < n; i++)
        {
            a.Add(int.Parse(Console.ReadLine()));
        }

        int m = int.Parse(Console.ReadLine());
        HashSet<int> b = new HashSet<int>();
        for (int i = 0; i < m; i++)
        {
            b.Add(int.Parse(Console.ReadLine()));
        }

        HashSet<int> uniao = new HashSet<int>(a);
        uniao.UnionWith(b);

        HashSet<int> intersecao = new HashSet<int>(a);
        intersecao.IntersectWith(b);

        HashSet<int> soEmA = new HashSet<int>(a);
        soEmA.ExceptWith(b);

        HashSet<int> soEmB = new HashSet<int>(b);
        soEmB.ExceptWith(a);

        List<int> ordenadaUniao = new List<int>(uniao);
        ordenadaUniao.Sort();
        string textoUniao = "";
        for (int i = 0; i < ordenadaUniao.Count; i++)
        {
            textoUniao += $"{ordenadaUniao[i]} ";
        }

        List<int> ordenadaIntersecao = new List<int>(intersecao);
        ordenadaIntersecao.Sort();
        string textoIntersecao = "";
        for (int i = 0; i < ordenadaIntersecao.Count; i++)
        {
            textoIntersecao += $"{ordenadaIntersecao[i]} ";
        }

        List<int> ordenadaSoEmA = new List<int>(soEmA);
        ordenadaSoEmA.Sort();
        string textoSoEmA = "";
        for (int i = 0; i < ordenadaSoEmA.Count; i++)
        {
            textoSoEmA += $"{ordenadaSoEmA[i]} ";
        }

        List<int> ordenadaSoEmB = new List<int>(soEmB);
        ordenadaSoEmB.Sort();
        string textoSoEmB = "";
        for (int i = 0; i < ordenadaSoEmB.Count; i++)
        {
            textoSoEmB += $"{ordenadaSoEmB[i]} ";
        }

        Console.WriteLine($"Uniao: {textoUniao}");
        Console.WriteLine($"Intersecao: {textoIntersecao}");
        Console.WriteLine($"A menos B: {textoSoEmA}");
        Console.WriteLine($"B menos A: {textoSoEmB}");
    }
}
`,
      hints: [
        'Cada resultado precisa da sua própria cópia: `new HashSet<int>(a)` antes de cada operação.',
        'Para `B menos A`, a cópia é de `b` e o argumento é `a` — a diferença não é simétrica.',
      ],
      tests: [
        {
          name: 'Conjuntos com parte em comum',
          stdin: '4\n1\n2\n3\n4\n3\n3\n4\n5\n',
          expectedStdout:
            'Uniao: 1 2 3 4 5\nIntersecao: 3 4\nA menos B: 1 2\nB menos A: 5',
        },
        {
          name: 'Conjuntos disjuntos',
          stdin: '2\n1\n2\n2\n3\n4\n',
          expectedStdout:
            'Uniao: 1 2 3 4\nIntersecao:\nA menos B: 1 2\nB menos A: 3 4',
        },
        {
          name: 'Conjuntos iguais',
          stdin: '2\n1\n2\n2\n1\n2\n',
          expectedStdout:
            'Uniao: 1 2\nIntersecao: 1 2\nA menos B:\nB menos A:',
        },
        {
          name: 'Repetidos na entrada contam uma vez',
          stdin: '4\n5\n5\n5\n5\n1\n5\n',
          expectedStdout:
            'Uniao: 5\nIntersecao: 5\nA menos B:\nB menos A:',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c04l03',
    title: 'Removendo duplicados',
    objective: 'Eliminar repetições **preservando a ordem original**, combinando `HashSet` para memória e `List` para sequência.',
    concept: [
      {
        kind: 'text',
        body:
          'Jogar tudo em um `HashSet` remove duplicados — e destrói a ordem junto. Quando a ordem de aparecimento importa, a solução usa **as duas** coleções, cada uma para o que ela faz bem.',
      },
      {
        kind: 'code',
        code: `HashSet<int> vistos = new HashSet<int>();   // memoria
List<int> resultado = new List<int>();      // ordem

foreach (int valor in entrada)
{
    if (vistos.Add(valor))      // true = primeira vez
    {
        resultado.Add(valor);
    }
}`,
        caption: 'O conjunto decide, a lista registra. Cada um faz o que o outro não faz.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Só HashSet',
          code: `3 1 3 4 1 5 3
      |
      v
1 3 4 5   (ordem perdida)`,
        },
        right: {
          label: 'HashSet + List',
          code: `3 1 3 4 1 5 3
      |
      v
3 1 4 5   (ordem preservada)`,
        },
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que o `Add` do conjunto faz dois trabalhos na mesma linha: decide se o valor é novo **e** o registra para as próximas voltas. Sem esse retorno, seriam duas operações e duas buscas.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A alternativa sem `HashSet` — testar `resultado.Contains(valor)` a cada item — funciona, mas percorre a lista inteira a cada teste. Com mil itens são até um milhão de comparações, contra mil consultas imediatas. É a mesma escolha que o último capítulo desta seção formaliza.',
      },
      {
        kind: 'text',
        body:
          'Este par — um conjunto para "já vi isso?" e uma lista para "em que ordem?" — é um dos padrões mais reaproveitados que existem. Ele aparece em deduplicação de logs, em detecção de ciclos e em qualquer varredura que não pode repetir trabalho.',
      },
    ],
    quiz: [
      {
        id: 's03c04l03q1',
        type: 'single',
        prompt: 'Removendo duplicados de `3 1 3 4 1 5 3` preservando a ordem, qual é o resultado?',
        options: [
          { id: 'a', code: '3 1 4 5', correct: true },
          { id: 'b', code: '1 3 4 5' },
          { id: 'c', code: '3 1 3 4 5' },
          { id: 'd', code: '5 4 1 3' },
        ],
        explanation:
          'Cada valor fica na posição da sua **primeira** aparição. A alternativa `1 3 4 5` é o que sai de um `HashSet` ordenado, e perde a informação de ordem.',
      },
      {
        id: 's03c04l03q2',
        type: 'single',
        prompt: 'Por que o `HashSet` é melhor que `resultado.Contains(valor)` nesse padrão?',
        options: [
          { id: 'a', text: 'Porque a consulta é imediata, enquanto `Contains` em lista percorre tudo.', correct: true },
          { id: 'b', text: 'Porque `Contains` não existe em `List`.' },
          { id: 'c', text: 'Porque `HashSet` preserva a ordem.' },
          { id: 'd', text: 'São equivalentes.' },
        ],
        explanation:
          'Os dois dão o mesmo resultado. A diferença é de custo, e ela cresce com o tamanho da entrada: linear contra quadrático.',
      },
      {
        id: 's03c04l03q3',
        type: 'single',
        prompt: 'Qual papel cada coleção cumpre nesse padrão?',
        options: [
          { id: 'a', text: 'O conjunto lembra o que já apareceu; a lista guarda a ordem.', correct: true },
          { id: 'b', text: 'O conjunto guarda a ordem; a lista lembra o que apareceu.' },
          { id: 'c', text: 'Os dois guardam o mesmo, para redundância.' },
          { id: 'd', text: 'A lista é opcional.' },
        ],
        explanation:
          'Cada estrutura faz exatamente aquilo que a outra não sabe fazer: o conjunto não tem ordem, e a lista não tem busca rápida.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` e depois `n` valores. Remova as repetições **preservando a ordem da primeira aparição** de cada valor, e informe quantos foram descartados.',
      requirements: [
        'Linha 1: `Original: ...`, na ordem lida',
        'Linha 2: `Sem duplicados: ...`, na ordem da primeira aparição',
        'Linha 3: `Removidos: r`',
        'Linha 4: `Distintos: d`',
        '`r` mais `d` tem que dar `n`',
        'Use um `HashSet` para a memória e uma `List` para a ordem',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        HashSet<int> vistos = new HashSet<int>();
        List<int> resultado = new List<int>();
        string original = "";
        int removidos = 0;

        // Leia, registre a ordem original, e guarde so as primeiras aparicoes

        Console.WriteLine($"Original: {original}");
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

        HashSet<int> vistos = new HashSet<int>();
        List<int> resultado = new List<int>();
        string original = "";
        int removidos = 0;

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());
            original += $"{valor} ";

            if (vistos.Add(valor))
            {
                resultado.Add(valor);
            }
            else
            {
                removidos++;
            }
        }

        string semDuplicados = "";
        for (int i = 0; i < resultado.Count; i++)
        {
            semDuplicados += $"{resultado[i]} ";
        }

        Console.WriteLine($"Original: {original}");
        Console.WriteLine($"Sem duplicados: {semDuplicados}");
        Console.WriteLine($"Removidos: {removidos}");
        Console.WriteLine($"Distintos: {resultado.Count}");
    }
}
`,
      hints: [
        'A linha `Original` pode ser montada no mesmo laço da leitura, antes de qualquer filtro.',
        '`if (vistos.Add(valor))` já é o teste completo: verdadeiro significa "primeira vez".',
      ],
      tests: [
        {
          name: 'Repetições espalhadas',
          stdin: '7\n3\n1\n3\n4\n1\n5\n3\n',
          expectedStdout:
            'Original: 3 1 3 4 1 5 3\nSem duplicados: 3 1 4 5\nRemovidos: 3\nDistintos: 4',
        },
        {
          name: 'Nenhuma repetição',
          stdin: '3\n10\n20\n30\n',
          expectedStdout:
            'Original: 10 20 30\nSem duplicados: 10 20 30\nRemovidos: 0\nDistintos: 3',
        },
        {
          name: 'Todos iguais',
          stdin: '4\n7\n7\n7\n7\n',
          expectedStdout:
            'Original: 7 7 7 7\nSem duplicados: 7\nRemovidos: 3\nDistintos: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c04l04',
    title: 'Queue: primeiro a entrar, primeiro a sair',
    objective: 'Modelar uma fila de espera com `Queue<T>`, tratando o caso de retirar de uma fila vazia.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma `Queue<T>` é uma fila no sentido literal: quem chega primeiro é atendido primeiro. A sigla é **FIFO**, de *first in, first out*.',
      },
      {
        kind: 'table',
        headers: ['Método', 'Faz', 'Em fila vazia'],
        rows: [
          ['`Enqueue(x)`', 'entra no fim', '—'],
          ['`Dequeue()`', 'sai do começo e devolve', '**lança exceção**'],
          ['`Peek()`', 'olha o começo sem tirar', '**lança exceção**'],
          ['`Count`', 'quantos esperam', '`0`'],
        ],
      },
      {
        kind: 'code',
        code: `Queue<string> fila = new Queue<string>();

fila.Enqueue("Ana");
fila.Enqueue("Bruno");

Console.WriteLine(fila.Dequeue());   // Ana  (a primeira que chegou)
Console.WriteLine(fila.Peek());      // Bruno (sem tirar da fila)
Console.WriteLine(fila.Count);       // 1`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`Dequeue` em fila vazia lança `InvalidOperationException` com a mensagem `Queue empty.`. Diferente do `Remove` de dicionário, aqui não há retorno de fracasso: a guarda `if (fila.Count > 0)` é obrigatória.',
      },
      {
        kind: 'code',
        code: `if (fila.Count > 0)
{
    Console.WriteLine($"Atendido: {fila.Dequeue()}");
}
else
{
    Console.WriteLine("Fila vazia");
}`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma `List` conseguiria imitar uma fila com `Add` e `RemoveAt(0)` — mas `RemoveAt(0)` desloca todos os elementos a cada retirada. A `Queue` faz a mesma operação sem deslocar nada, e é por isso que ela existe.',
      },
      {
        kind: 'text',
        body:
          'Percorrer uma fila com `foreach` a lê **da frente para o fundo**, na ordem de atendimento, e não retira ninguém. É a forma segura de mostrar quem ainda está esperando.',
      },
    ],
    quiz: [
      {
        id: 's03c04l04q1',
        type: 'single',
        prompt: 'Depois de `Enqueue("A")`, `Enqueue("B")` e `Enqueue("C")`, o que `Dequeue()` devolve?',
        options: [
          { id: 'a', code: 'A', correct: true },
          { id: 'b', code: 'C' },
          { id: 'c', code: 'B' },
          { id: 'd', text: 'Depende da implementação.' },
        ],
        explanation:
          'FIFO: o primeiro a entrar é o primeiro a sair. Quem devolveria `C` seria uma pilha.',
      },
      {
        id: 's03c04l04q2',
        type: 'single',
        prompt: 'O que acontece ao chamar `Dequeue()` em uma fila vazia?',
        options: [
          { id: 'a', text: 'Lança `InvalidOperationException`.', correct: true },
          { id: 'b', text: 'Devolve `null`.' },
          { id: 'c', text: 'Devolve o valor padrão do tipo.' },
          { id: 'd', text: 'Não faz nada.' },
        ],
        explanation:
          'Não há valor para devolver, e a `Queue` não tem uma variante `Try` na forma clássica. A guarda por `Count` antes da chamada é a proteção padrão.',
      },
      {
        id: 's03c04l04q3',
        type: 'single',
        prompt: 'Por que usar `Queue` em vez de `List` com `RemoveAt(0)`?',
        options: [
          { id: 'a', text: 'Porque `RemoveAt(0)` desloca todos os elementos a cada retirada.', correct: true },
          { id: 'b', text: 'Porque `List` não permite remover do começo.' },
          { id: 'c', text: 'Porque `Queue` mantém os itens ordenados.' },
          { id: 'd', text: 'Porque `List` não tem `Count`.' },
        ],
        explanation:
          'As duas produzem o mesmo comportamento. A diferença é de custo: uma retirada da `Queue` mexe em um elemento, e da `List` mexe em todos os que sobraram.',
      },
    ],
    challenge: {
      brief:
        'Simule uma fila de atendimento por comandos. Leia linhas até a palavra `fim`. `chega <nome>` coloca alguém no fim da fila; `atende` retira e anuncia quem estava na frente. Qualquer outra linha é ignorada.',
      requirements: [
        'Cada atendimento imprime `Atendido: Ana`',
        'Um `atende` com a fila vazia imprime `Fila vazia` e não conta como atendimento',
        'Depois: `Restantes: r`, quantos continuam na fila',
        'Depois: `Atendidos: a`',
        'Por último: `Ignorados: g`',
        'Um `chega` sem nome é ignorado',
        'O programa não pode encerrar com exceção',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Queue<string> fila = new Queue<string>();

        int atendidos = 0;
        int ignorados = 0;

        string linha = Console.ReadLine();

        // chega <nome> entra no fim; atende retira do comeco

        Console.WriteLine($"Restantes: {fila.Count}");
        Console.WriteLine($"Atendidos: {atendidos}");
        Console.WriteLine($"Ignorados: {ignorados}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Queue<string> fila = new Queue<string>();

        int atendidos = 0;
        int ignorados = 0;

        string linha = Console.ReadLine();

        while (linha != "fim")
        {
            int espaco = linha.IndexOf(' ');
            string verbo = espaco >= 0 ? linha.Substring(0, espaco) : linha;
            string argumento = espaco >= 0 ? linha.Substring(espaco + 1) : "";

            if (verbo == "chega" && argumento.Length > 0)
            {
                fila.Enqueue(argumento);
            }
            else if (verbo == "atende" && argumento.Length == 0)
            {
                if (fila.Count > 0)
                {
                    Console.WriteLine($"Atendido: {fila.Dequeue()}");
                    atendidos++;
                }
                else
                {
                    Console.WriteLine("Fila vazia");
                }
            }
            else
            {
                ignorados++;
            }

            linha = Console.ReadLine();
        }

        Console.WriteLine($"Restantes: {fila.Count}");
        Console.WriteLine($"Atendidos: {atendidos}");
        Console.WriteLine($"Ignorados: {ignorados}");
    }
}
`,
      hints: [
        'O recorte da linha é o mesmo da lista de tarefas: `IndexOf(\' \')` e dois `Substring`.',
        'A guarda `if (fila.Count > 0)` precisa vir antes de todo `Dequeue`.',
      ],
      tests: [
        {
          name: 'Fila esvaziada até o fim',
          stdin: 'chega Ana\nchega Bruno\natende\nchega Carla\natende\nxyz\natende\natende\nfim\n',
          expectedStdout:
            'Atendido: Ana\nAtendido: Bruno\nAtendido: Carla\nFila vazia\nRestantes: 0\nAtendidos: 3\nIgnorados: 1',
        },
        {
          name: 'Ninguém foi atendido',
          stdin: 'chega X\nfim\n',
          expectedStdout: 'Restantes: 1\nAtendidos: 0\nIgnorados: 0',
        },
        {
          name: 'Atender fila vazia não quebra',
          stdin: 'atende\nfim\n',
          expectedStdout: 'Fila vazia\nRestantes: 0\nAtendidos: 0\nIgnorados: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c04l05',
    title: 'Stack: último a entrar, primeiro a sair',
    objective: 'Usar `Stack<T>` para inverter uma sequência e modelar situações em que a ordem de saída é a inversa da entrada.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma `Stack<T>` é uma pilha: você empilha por cima e retira por cima. O último a entrar é o primeiro a sair — **LIFO**, de *last in, first out*.',
      },
      {
        kind: 'table',
        headers: ['Método', 'Faz', 'Em pilha vazia'],
        rows: [
          ['`Push(x)`', 'coloca no topo', '—'],
          ['`Pop()`', 'tira do topo e devolve', '**lança exceção**'],
          ['`Peek()`', 'olha o topo sem tirar', '**lança exceção**'],
          ['`Count`', 'quantos há', '`0`'],
        ],
      },
      {
        kind: 'code',
        code: `Stack<int> pilha = new Stack<int>();

pilha.Push(1);
pilha.Push(2);
pilha.Push(3);

Console.WriteLine(pilha.Peek());   // 3  (o topo)
Console.WriteLine(pilha.Pop());    // 3
Console.WriteLine(pilha.Pop());    // 2`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Empilhar tudo e desempilhar tudo **inverte** a sequência. Essa é a aplicação mais simples da pilha, e a que explica por que ela aparece em conversão de bases, em texto invertido e em desfazer operações.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Queue: mantém a ordem',
          code: `entra:  A B C
sai:    A B C`,
        },
        right: {
          label: 'Stack: inverte',
          code: `entra:  A B C
sai:    C B A`,
        },
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          '`Pop` e `Peek` em pilha vazia lançam `InvalidOperationException` com a mensagem `Stack empty.` — o mesmo cuidado da `Queue`. A guarda por `Count` é obrigatória nas duas.',
      },
      {
        kind: 'text',
        body:
          'Percorrer uma pilha com `foreach` a lê **do topo para a base**, ou seja, na ordem em que os itens sairiam — e sem retirar nenhum.',
      },
    ],
    quiz: [
      {
        id: 's03c04l05q1',
        type: 'single',
        prompt: 'Depois de `Push(1)`, `Push(2)` e `Push(3)`, o que `Pop()` devolve?',
        options: [
          { id: 'a', code: '3', correct: true },
          { id: 'b', code: '1' },
          { id: 'c', code: '2' },
          { id: 'd', text: 'Depende da implementação.' },
        ],
        explanation:
          'LIFO: o último a entrar sai primeiro. Quem devolveria `1` seria uma fila.',
      },
      {
        id: 's03c04l05q2',
        type: 'single',
        prompt: 'O que acontece ao empilhar `A B C` e desempilhar tudo?',
        options: [
          { id: 'a', text: 'Sai `C B A`: a sequência é invertida.', correct: true },
          { id: 'b', text: 'Sai `A B C`: a ordem é preservada.' },
          { id: 'c', text: 'Sai apenas `C`.' },
          { id: 'd', text: 'A ordem é imprevisível.' },
        ],
        explanation:
          'É a propriedade central da pilha, e a razão de ela ser a escolha natural para inverter qualquer sequência.',
      },
      {
        id: 's03c04l05q3',
        type: 'single',
        prompt: 'Qual é a diferença entre `Peek` e `Pop`?',
        options: [
          { id: 'a', text: '`Peek` só olha o topo; `Pop` olha e retira.', correct: true },
          { id: 'b', text: '`Peek` olha a base; `Pop` olha o topo.' },
          { id: 'c', text: '`Peek` não lança exceção em pilha vazia.' },
          { id: 'd', text: 'São sinônimos.' },
        ],
        explanation:
          'Os dois lançam exceção em pilha vazia. A diferença é o efeito colateral: um consulta, o outro consome.',
      },
    ],
    challenge: {
      brief:
        'Leia um inteiro `n` maior ou igual a 1 e depois `n` valores. Empilhe cada um, mostrando o topo após cada empilhamento. Depois desempilhe tudo, mostrando cada valor que sai, e confirme que a pilha ficou vazia.',
      requirements: [
        'Uma linha por empilhamento, no formato `Push 1 -> topo 1`',
        'Uma linha por desempilhamento, no formato `Pop: 3`',
        'Os valores saem na ordem inversa da entrada',
        'Por último: `Vazia: True`',
        'Use `Peek` para mostrar o topo e `Pop` para retirar',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Stack<int> pilha = new Stack<int>();

        // Empilhe mostrando o topo, depois desempilhe tudo

        Console.WriteLine($"Vazia: {pilha.Count == 0}");
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

        Stack<int> pilha = new Stack<int>();

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());
            pilha.Push(valor);
            Console.WriteLine($"Push {valor} -> topo {pilha.Peek()}");
        }

        while (pilha.Count > 0)
        {
            Console.WriteLine($"Pop: {pilha.Pop()}");
        }

        Console.WriteLine($"Vazia: {pilha.Count == 0}");
    }
}
`,
      hints: [
        'Logo depois de um `Push`, o `Peek` devolve exatamente o valor que acabou de entrar.',
        'O laço de esvaziamento é `while (pilha.Count > 0)`: ele para sozinho e nunca chama `Pop` em pilha vazia.',
      ],
      tests: [
        {
          name: 'Três valores',
          stdin: '3\n1\n2\n3\n',
          expectedStdout:
            'Push 1 -> topo 1\nPush 2 -> topo 2\nPush 3 -> topo 3\nPop: 3\nPop: 2\nPop: 1\nVazia: True',
        },
        {
          name: 'Um valor só',
          stdin: '1\n7\n',
          expectedStdout: 'Push 7 -> topo 7\nPop: 7\nVazia: True',
        },
        {
          name: 'Valores repetidos e negativos',
          stdin: '4\n-1\n-1\n0\n5\n',
          expectedStdout:
            'Push -1 -> topo -1\nPush -1 -> topo -1\nPush 0 -> topo 0\nPush 5 -> topo 5\n' +
            'Pop: 5\nPop: 0\nPop: -1\nPop: -1\nVazia: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c04l06',
    title: 'Balanceamento de parênteses',
    objective: 'Validar aninhamento de delimitadores com uma pilha, o algoritmo que todo compilador executa.',
    concept: [
      {
        kind: 'text',
        body:
          'Verificar se `(a[b]{c})` está bem formado é o problema que **define** o uso de pilha. E a razão é simples: quando um delimitador fecha, ele tem que casar com o **último** que abriu — que é exatamente o que uma pilha entrega.',
      },
      {
        kind: 'code',
        code: `if (c == '(' || c == '[' || c == '{')
{
    pilha.Push(c);
}
else if (c == ')' || c == ']' || c == '}')
{
    char esperado = c == ')' ? '(' : c == ']' ? '[' : '{';

    if (pilha.Count == 0 || pilha.Pop() != esperado)
    {
        posicaoErro = i;
        break;
    }
}`,
        caption: 'Abre: empilha. Fecha: desempilha e confere.',
      },
      {
        kind: 'text',
        body:
          'Existem **dois** tipos de falha, e um programa correto distingue os dois. O fechamento errado acontece em uma posição identificável. A abertura sem fechamento só é descoberta no fim do texto, quando sobra algo na pilha.',
      },
      {
        kind: 'table',
        headers: ['Texto', 'Falha', 'Onde'],
        rows: [
          ['`(a[b]{c})`', 'nenhuma', '—'],
          ['`(a[b)]`', 'fecha com o errado', 'posição 4'],
          ['`((`', 'nunca fecha', 'só no fim'],
          ['`)`', 'fecha sem abrir', 'posição 0'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O teste `pilha.Count == 0` precisa vir **antes** do `Pop`, ligado por `||`. Um fechamento sem nenhuma abertura pendente encontraria a pilha vazia, e o `Pop` lançaria exceção — o curto-circuito é o que evita isso.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A altura máxima que a pilha atinge é a **profundidade de aninhamento** do texto. É a mesma medida que editores usam para colorir níveis de parênteses, e a que denuncia expressões aninhadas demais para serem lidas.',
      },
      {
        kind: 'text',
        body:
          'Uma `List` conseguiria fazer o mesmo trabalho, usando sempre o último índice. A `Stack` apenas diz explicitamente que é isso que está acontecendo — e impede acessar qualquer outra posição por engano.',
      },
    ],
    quiz: [
      {
        id: 's03c04l06q1',
        type: 'single',
        prompt: 'Por que uma pilha é a estrutura certa para este problema?',
        options: [
          { id: 'a', text: 'Porque um fechamento sempre casa com a abertura mais recente ainda aberta.', correct: true },
          { id: 'b', text: 'Porque pilhas são mais rápidas que listas.' },
          { id: 'c', text: 'Porque o texto é lido de trás para frente.' },
          { id: 'd', text: 'Porque pilhas ordenam automaticamente.' },
        ],
        explanation:
          'O aninhamento é uma estrutura "último a abrir, primeiro a fechar" — a definição de LIFO. Uma fila daria a resposta errada em qualquer texto aninhado.',
      },
      {
        id: 's03c04l06q2',
        type: 'single',
        prompt: 'Em `(a[b)]`, em que posição está o erro?',
        options: [
          { id: 'a', code: '4', correct: true },
          { id: 'b', code: '5' },
          { id: 'c', code: '2' },
          { id: 'd', text: 'Não há erro.' },
        ],
        explanation:
          'Na posição 4 há um `)`, mas a abertura mais recente é o `[` da posição 2. O erro é detectado no fechamento, não na abertura.',
      },
      {
        id: 's03c04l06q3',
        type: 'single',
        prompt: 'O texto `((` termina com a pilha contendo dois itens. Como reportar isso?',
        options: [
          { id: 'a', text: 'Como desbalanceado, sem posição de erro: a falha é a ausência de fechamento.', correct: true },
          { id: 'b', text: 'Como erro na posição 1.' },
          { id: 'c', text: 'Como balanceado: não houve fechamento errado.' },
          { id: 'd', text: 'O programa deveria lançar exceção.' },
        ],
        explanation:
          'Não existe um caractere culpado: o problema é o que **não** apareceu. Por isso a checagem final de `pilha.Count` é uma verificação separada da varredura.',
      },
    ],
    challenge: {
      brief:
        'Leia uma linha de texto e verifique se os delimitadores `()`, `[]` e `{}` estão corretamente balanceados e aninhados. Caracteres que não são delimitadores são ignorados.',
      requirements: [
        'Linha 1: `Balanceado: True` ou `False`',
        'Linha 2: `Posicao do erro: p`, o índice do primeiro fechamento inválido, ou `-1`',
        'Linha 3: `Profundidade maxima: k`, a maior altura que a pilha atingiu',
        'Um fechamento que não casa com a última abertura é erro naquela posição',
        'Um fechamento sem nenhuma abertura pendente é erro naquela posição',
        'Aberturas que nunca fecham deixam `Posicao do erro` em `-1`, mas `Balanceado` em `False`',
        'A varredura para no primeiro erro de posição',
        'O programa não pode encerrar com exceção',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        string texto = Console.ReadLine();

        Stack<char> pilha = new Stack<char>();
        int posicaoErro = -1;
        int profundidadeMaxima = 0;

        // Abre: empilha. Fecha: confere com o topo.

        bool balanceado = posicaoErro == -1 && pilha.Count == 0;

        Console.WriteLine($"Balanceado: {balanceado}");
        Console.WriteLine($"Posicao do erro: {posicaoErro}");
        Console.WriteLine($"Profundidade maxima: {profundidadeMaxima}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        string texto = Console.ReadLine();

        Stack<char> pilha = new Stack<char>();
        int posicaoErro = -1;
        int profundidadeMaxima = 0;

        for (int i = 0; i < texto.Length; i++)
        {
            char c = texto[i];

            if (c == '(' || c == '[' || c == '{')
            {
                pilha.Push(c);

                if (pilha.Count > profundidadeMaxima)
                {
                    profundidadeMaxima = pilha.Count;
                }
            }
            else if (c == ')' || c == ']' || c == '}')
            {
                char esperado = c == ')' ? '(' : c == ']' ? '[' : '{';

                if (pilha.Count == 0 || pilha.Pop() != esperado)
                {
                    posicaoErro = i;
                    break;
                }
            }
        }

        bool balanceado = posicaoErro == -1 && pilha.Count == 0;

        Console.WriteLine($"Balanceado: {balanceado}");
        Console.WriteLine($"Posicao do erro: {posicaoErro}");
        Console.WriteLine($"Profundidade maxima: {profundidadeMaxima}");
    }
}
`,
      hints: [
        'A profundidade máxima é atualizada logo depois de cada `Push`, comparando `pilha.Count` com o recorde.',
        'A condição `pilha.Count == 0 || pilha.Pop() != esperado` depende do curto-circuito: sem ele o `Pop` quebraria em pilha vazia.',
      ],
      tests: [
        {
          name: 'Aninhamento correto',
          stdin: '(a[b]{c})\n',
          expectedStdout: 'Balanceado: True\nPosicao do erro: -1\nProfundidade maxima: 2',
        },
        {
          name: 'Fecha com o delimitador errado',
          stdin: '(a[b)]\n',
          expectedStdout: 'Balanceado: False\nPosicao do erro: 4\nProfundidade maxima: 2',
        },
        {
          name: 'Aberturas sem fechamento',
          stdin: '((\n',
          expectedStdout: 'Balanceado: False\nPosicao do erro: -1\nProfundidade maxima: 2',
        },
        {
          name: 'Fechamento sem abertura',
          stdin: ')\n',
          expectedStdout: 'Balanceado: False\nPosicao do erro: 0\nProfundidade maxima: 0',
        },
        {
          name: 'Texto sem delimitadores',
          stdin: 'abc\n',
          expectedStdout: 'Balanceado: True\nPosicao do erro: -1\nProfundidade maxima: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c04l07',
    title: 'Avaliando expressão posfixa',
    objective: 'Executar uma expressão em notação polonesa inversa com uma pilha de operandos.',
    concept: [
      {
        kind: 'text',
        body:
          'Na notação **posfixa**, o operador vem depois dos operandos: `3 4 +` em vez de `3 + 4`. Ela parece estranha até você perceber que ela dispensa parênteses e regras de precedência **por completo**.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Infixa',
          code: `5 + (1 + 2) * 4 - 3`,
        },
        right: {
          label: 'Posfixa',
          code: `5 1 2 + 4 * + 3 -`,
        },
        note: 'A ordem das operações já está codificada na posição dos tokens.',
      },
      {
        kind: 'text',
        body:
          'O algoritmo cabe em duas regras. Se o token é número, empilhe. Se é operador, desempilhe **dois**, aplique, e empilhe o resultado. No fim, o único valor da pilha é a resposta.',
      },
      {
        kind: 'code',
        code: `int b = pilha.Pop();    // o SEGUNDO operando sai primeiro
int a = pilha.Pop();

int resultado = token switch
{
    "+" => a + b,
    "-" => a - b,
    "*" => a * b,
    _   => a / b,
};

pilha.Push(resultado);`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A ordem dos dois `Pop` é decisiva para as operações não comutativas. Em `17 3 -`, o `3` foi empilhado por último e sai primeiro — então ele é o **segundo** operando. Inverter isso daria `3 - 17` em vez de `17 - 3`.',
      },
      {
        kind: 'table',
        headers: ['Token', 'Ação', 'Pilha depois'],
        rows: [
          ['`5`', 'empilha', '`5`'],
          ['`1`', 'empilha', '`5 1`'],
          ['`2`', 'empilha', '`5 1 2`'],
          ['`+`', '`1 + 2 = 3`', '`5 3`'],
          ['`4`', 'empilha', '`5 3 4`'],
          ['`*`', '`3 * 4 = 12`', '`5 12`'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'É assim que máquinas virtuais executam código de verdade. A JVM e o runtime do .NET são máquinas de pilha: `IL_0001: add` desempilha dois valores e empilha a soma, exatamente como aqui.',
      },
    ],
    quiz: [
      {
        id: 's03c04l07q1',
        type: 'single',
        prompt: 'Quanto vale a expressão posfixa `5 1 2 + 4 * +`?',
        options: [
          { id: 'a', code: '17', correct: true },
          { id: 'b', code: '32' },
          { id: 'c', code: '13' },
          { id: 'd', code: '24' },
        ],
        explanation:
          '`1 + 2` dá 3, `3 * 4` dá 12, e `5 + 12` dá 17. Equivale à expressão infixa `5 + (1 + 2) * 4`.',
      },
      {
        id: 's03c04l07q2',
        type: 'single',
        prompt: 'Em `17 3 -`, qual `Pop` devolve o 17?',
        options: [
          { id: 'a', text: 'O segundo: o 3 foi empilhado por último e sai primeiro.', correct: true },
          { id: 'b', text: 'O primeiro.' },
          { id: 'c', text: 'Depende da implementação da pilha.' },
          { id: 'd', text: 'Nenhum: subtração usa `Peek`.' },
        ],
        explanation:
          'Como a pilha é LIFO, o primeiro `Pop` traz o operando da direita. Guardar isso em uma variável chamada `b` e o segundo em `a` deixa a expressão `a - b` sair naturalmente correta.',
      },
      {
        id: 's03c04l07q3',
        type: 'single',
        prompt: 'Por que a notação posfixa dispensa parênteses?',
        options: [
          { id: 'a', text: 'Porque a ordem de avaliação já está determinada pela posição dos tokens.', correct: true },
          { id: 'b', text: 'Porque ela só aceita duas operações.' },
          { id: 'c', text: 'Porque ela avalia da direita para a esquerda.' },
          { id: 'd', text: 'Ela não dispensa: os parênteses são opcionais.' },
        ],
        explanation:
          'Cada operador age sobre os dois valores imediatamente disponíveis na pilha. Não há ambiguidade a resolver, então não há o que agrupar.',
      },
    ],
    challenge: {
      brief:
        'Leia uma expressão em notação posfixa, com tokens separados por espaço. Avalie-a com uma pilha, mostrando cada operação realizada, e informe o resultado final.',
      requirements: [
        'Uma linha por operação, no formato `1 + 2 = 3`, com os operandos na ordem correta',
        'A última linha é `Resultado: X`',
        'Os operadores são `+`, `-`, `*` e `/`',
        'A divisão é inteira',
        'A expressão é sempre válida e pode ser apenas um número, sem nenhuma operação',
        'Números negativos não aparecem na entrada',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        string expressao = Console.ReadLine();

        Stack<int> pilha = new Stack<int>();

        // Numero: empilha. Operador: desempilha dois, aplica, empilha.

        Console.WriteLine($"Resultado: {pilha.Pop()}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        string expressao = Console.ReadLine();

        Stack<int> pilha = new Stack<int>();

        foreach (string token in expressao.Split(' '))
        {
            if (token.Length == 0)
            {
                continue;
            }

            if (int.TryParse(token, out int numero))
            {
                pilha.Push(numero);
            }
            else
            {
                int b = pilha.Pop();
                int a = pilha.Pop();

                int resultado = token switch
                {
                    "+" => a + b,
                    "-" => a - b,
                    "*" => a * b,
                    _ => a / b,
                };

                Console.WriteLine($"{a} {token} {b} = {resultado}");
                pilha.Push(resultado);
            }
        }

        Console.WriteLine($"Resultado: {pilha.Pop()}");
    }
}
`,
      hints: [
        'Use `int.TryParse` para distinguir número de operador: o que não converte é operador.',
        'O primeiro `Pop` é o operando da **direita**. Guarde-o em `b` e o segundo em `a`, e escreva as contas como `a op b`.',
      ],
      tests: [
        {
          name: 'Expressão com quatro operações',
          stdin: '5 1 2 + 4 * + 3 -\n',
          expectedStdout:
            '1 + 2 = 3\n3 * 4 = 12\n5 + 12 = 17\n17 - 3 = 14\nResultado: 14',
        },
        {
          name: 'Soma simples',
          stdin: '3 4 +\n',
          expectedStdout: '3 + 4 = 7\nResultado: 7',
        },
        {
          name: 'Divisão inteira',
          stdin: '10 2 /\n',
          expectedStdout: '10 / 2 = 5\nResultado: 5',
        },
        {
          name: 'Só um número, nenhuma operação',
          stdin: '7\n',
          expectedStdout: 'Resultado: 7',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c04l08',
    title: 'Simulando atendimento',
    objective: 'Usar duas filas para implementar prioridade, decidindo de qual atender a cada chamada.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma única `Queue` atende estritamente por ordem de chegada. Quando existem categorias com prioridades diferentes — atendimento preferencial, pedidos urgentes, alertas críticos —, a solução mais simples é **uma fila por categoria**.',
      },
      {
        kind: 'code',
        code: `if (prioridade.Count > 0)
{
    Console.WriteLine($"Chamado: {prioridade.Dequeue()} (prioridade)");
}
else if (normal.Count > 0)
{
    Console.WriteLine($"Chamado: {normal.Dequeue()} (normal)");
}
else
{
    Console.WriteLine("Ninguem na fila");
}`,
        caption: 'A ordem dos testes **é** a política de prioridade.',
      },
      {
        kind: 'text',
        body:
          'Dentro de cada fila, a ordem de chegada continua sendo respeitada. O que a prioridade muda é apenas qual fila é consultada primeiro — e isso é o suficiente para produzir o comportamento esperado.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Uma pessoa preferencial que chega **depois** de todo mundo ainda é chamada antes, porque a fila dela é consultada primeiro. Esse é o comportamento correto, e ele sai de graça da estrutura, sem nenhuma lógica de reordenação.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Esta política pode deixar a fila normal esperando indefinidamente se a preferencial nunca esvaziar. É um problema real, chamado *starvation*, e sistemas de produção o resolvem alternando as filas de tempos em tempos.',
      },
      {
        kind: 'text',
        body:
          'A alternativa seria uma única fila ordenada por prioridade, que o .NET oferece como `PriorityQueue`. Para duas categorias, porém, duas filas simples são mais claras e mais rápidas.',
      },
    ],
    quiz: [
      {
        id: 's03c04l08q1',
        type: 'single',
        prompt: 'Uma pessoa preferencial chega por último. Quando ela é chamada?',
        options: [
          { id: 'a', text: 'Na próxima chamada, antes de toda a fila normal.', correct: true },
          { id: 'b', text: 'Depois de todos que chegaram antes dela.' },
          { id: 'c', text: 'Ela é intercalada com a fila normal.' },
          { id: 'd', text: 'Depende do tamanho das filas.' },
        ],
        explanation:
          'A fila preferencial é sempre consultada primeiro. A ordem de chegada só vale **dentro** de cada fila, nunca entre elas.',
      },
      {
        id: 's03c04l08q2',
        type: 'single',
        prompt: 'Onde está codificada a política de prioridade neste programa?',
        options: [
          { id: 'a', text: 'Na ordem dos testes `if / else if` da chamada.', correct: true },
          { id: 'b', text: 'Na ordem em que as filas foram declaradas.' },
          { id: 'c', text: 'No tipo `Queue`, que já prioriza automaticamente.' },
          { id: 'd', text: 'Na ordem de chegada das pessoas.' },
        ],
        explanation:
          'Trocar os dois ramos de lugar inverte a política inteira, sem mudar mais nenhuma linha. É o mesmo princípio de ordem dos testes do FizzBuzz e da régua.',
      },
      {
        id: 's03c04l08q3',
        type: 'single',
        prompt: 'Qual é o risco desta política de prioridade estrita?',
        options: [
          { id: 'a', text: 'A fila normal pode nunca ser atendida se a preferencial não esvaziar.', correct: true },
          { id: 'b', text: 'As filas podem se misturar.' },
          { id: 'c', text: 'A ordem de chegada dentro de cada fila se perde.' },
          { id: 'd', text: 'Não há risco.' },
        ],
        explanation:
          'É a chamada inanição. Sistemas reais alternam as filas periodicamente, ou promovem quem espera há muito tempo, justamente para evitá-la.',
      },
    ],
    challenge: {
      brief:
        'Simule um atendimento com duas filas. Leia linhas até a palavra `fim`. `normal <nome>` e `prioridade <nome>` colocam alguém na fila correspondente; `chamar` atende a próxima pessoa, sempre esvaziando a fila de prioridade antes da normal. Qualquer outra linha é ignorada.',
      requirements: [
        'Cada chamada imprime `Chamado: Maria (prioridade)` ou `Chamado: Ana (normal)`',
        'Um `chamar` com as duas filas vazias imprime `Ninguem na fila` e não conta como atendimento',
        'Depois: `Restantes: r`, somando as duas filas',
        'Depois: `Atendidos: a`',
        'Por último: `Ignorados: g`',
        'A fila de prioridade é sempre consultada primeiro, mesmo que a pessoa tenha chegado depois',
        'Um `normal` ou `prioridade` sem nome é ignorado',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Queue<string> normal = new Queue<string>();
        Queue<string> prioridade = new Queue<string>();

        int atendidos = 0;
        int ignorados = 0;

        string linha = Console.ReadLine();

        // A ordem dos testes no "chamar" define a prioridade

        Console.WriteLine($"Restantes: {prioridade.Count + normal.Count}");
        Console.WriteLine($"Atendidos: {atendidos}");
        Console.WriteLine($"Ignorados: {ignorados}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Queue<string> normal = new Queue<string>();
        Queue<string> prioridade = new Queue<string>();

        int atendidos = 0;
        int ignorados = 0;

        string linha = Console.ReadLine();

        while (linha != "fim")
        {
            int espaco = linha.IndexOf(' ');
            string verbo = espaco >= 0 ? linha.Substring(0, espaco) : linha;
            string argumento = espaco >= 0 ? linha.Substring(espaco + 1) : "";

            if (verbo == "normal" && argumento.Length > 0)
            {
                normal.Enqueue(argumento);
            }
            else if (verbo == "prioridade" && argumento.Length > 0)
            {
                prioridade.Enqueue(argumento);
            }
            else if (verbo == "chamar" && argumento.Length == 0)
            {
                if (prioridade.Count > 0)
                {
                    Console.WriteLine($"Chamado: {prioridade.Dequeue()} (prioridade)");
                    atendidos++;
                }
                else if (normal.Count > 0)
                {
                    Console.WriteLine($"Chamado: {normal.Dequeue()} (normal)");
                    atendidos++;
                }
                else
                {
                    Console.WriteLine("Ninguem na fila");
                }
            }
            else
            {
                ignorados++;
            }

            linha = Console.ReadLine();
        }

        Console.WriteLine($"Restantes: {prioridade.Count + normal.Count}");
        Console.WriteLine($"Atendidos: {atendidos}");
        Console.WriteLine($"Ignorados: {ignorados}");
    }
}
`,
      hints: [
        'São duas `Queue` independentes. Só o `chamar` precisa decidir entre elas.',
        'O `Ninguem na fila` fica no `else` final, alcançado só quando as duas estão vazias.',
      ],
      tests: [
        {
          name: 'Prioridade atendida primeiro',
          stdin: 'normal Ana\nprioridade Maria\nnormal Bruno\nchamar\nchamar\nchamar\nchamar\nfim\n',
          expectedStdout:
            'Chamado: Maria (prioridade)\nChamado: Ana (normal)\nChamado: Bruno (normal)\nNinguem na fila\n' +
            'Restantes: 0\nAtendidos: 3\nIgnorados: 0',
        },
        {
          name: 'Preferencial que chega depois fura a fila',
          stdin: 'normal Ana\nchamar\nnormal Bruno\nprioridade Maria\nchamar\nfim\n',
          expectedStdout:
            'Chamado: Ana (normal)\nChamado: Maria (prioridade)\nRestantes: 1\nAtendidos: 2\nIgnorados: 0',
        },
        {
          name: 'Chamar com tudo vazio e comando inválido',
          stdin: 'chamar\nxyz\nfim\n',
          expectedStdout:
            'Ninguem na fila\nRestantes: 0\nAtendidos: 0\nIgnorados: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c04l09',
    title: 'Prática: histórico de navegação',
    objective: 'Coordenar duas pilhas para implementar voltar e avançar, e entender por que navegar limpa o avanço.',
    concept: [
      {
        kind: 'text',
        body:
          'O histórico de um navegador é o exemplo mais reconhecível de **duas pilhas cooperando**. Uma guarda o passado, a outra o futuro, e a página atual fica fora das duas.',
      },
      {
        kind: 'table',
        headers: ['Comando', 'Vai para a pilha', 'Vem da pilha'],
        rows: [
          ['`ir`', 'atual → **voltar**', 'nenhuma (página nova)'],
          ['`voltar`', 'atual → **avançar**', '**voltar**'],
          ['`avancar`', 'atual → **voltar**', '**avançar**'],
        ],
      },
      {
        kind: 'code',
        code: `// voltar
avancar.Push(atual);
atual = voltar.Pop();

// avancar
voltar.Push(atual);
atual = avancar.Pop();`,
        caption: 'Os dois comandos são espelhos exatos um do outro.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A regra que parece arbitrária mas não é: **navegar para uma página nova limpa a pilha de avanço**. Você voltou três páginas e clicou num link diferente — aquele futuro deixou de existir, e mantê-lo levaria a um histórico impossível.',
      },
      {
        kind: 'code',
        code: `// ir para uma pagina nova
voltar.Push(atual);
atual = novaPagina;
avancar.Clear();      // o futuro anterior foi descartado`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Os dois comandos precisam de guarda por `Count`: voltar da primeira página ou avançar sem ter voltado são situações normais, não erros. Sem a guarda, o `Pop` derruba o programa em uso perfeitamente corriqueiro.',
      },
      {
        kind: 'text',
        body:
          'O tamanho de cada pilha responde diretamente ao que a interface precisa saber: `voltar.Count` diz se o botão de voltar deve estar ativo, e `avancar.Count` faz o mesmo pelo outro.',
      },
    ],
    quiz: [
      {
        id: 's03c04l09q1',
        type: 'single',
        prompt: 'Por que ir para uma página nova limpa a pilha de avanço?',
        options: [
          { id: 'a', text: 'Porque o futuro que existia foi substituído por um caminho diferente.', correct: true },
          { id: 'b', text: 'Para economizar memória.' },
          { id: 'c', text: 'Porque `Push` não funciona com a pilha de avanço cheia.' },
          { id: 'd', text: 'Não limpa: as duas pilhas são independentes.' },
        ],
        explanation:
          'Se você voltou de C para A e navegou para D, o "avançar para C" deixou de fazer sentido — não há caminho de D para C. Manter a pilha produziria um histórico incoerente.',
      },
      {
        id: 's03c04l09q2',
        type: 'single',
        prompt: 'No comando `voltar`, para onde vai a página atual?',
        options: [
          { id: 'a', text: 'Para a pilha de avanço.', correct: true },
          { id: 'b', text: 'Para a pilha de voltar.' },
          { id: 'c', text: 'É descartada.' },
          { id: 'd', text: 'Fica onde está.' },
        ],
        explanation:
          'Ela vira o "futuro" que você pode retomar com um avançar. Empilhá-la no lado errado faria o voltar repetir a mesma página indefinidamente.',
      },
      {
        id: 's03c04l09q3',
        type: 'single',
        prompt: 'Por que os comandos precisam de guarda por `Count`?',
        options: [
          { id: 'a', text: 'Porque voltar da primeira página é uso normal, e `Pop` em pilha vazia lança exceção.', correct: true },
          { id: 'b', text: 'Porque `Count` pode ficar negativo.' },
          { id: 'c', text: 'Porque as pilhas têm tamanho máximo.' },
          { id: 'd', text: 'Não precisam: `Pop` devolve `null` em pilha vazia.' },
        ],
        explanation:
          'Nenhuma pilha tem uma variante `Try` clássica. A guarda é a única proteção, e a situação que ela cobre acontece na primeira interação de qualquer usuário.',
      },
    ],
    challenge: {
      brief:
        'Implemente o histórico de um navegador. A página inicial é `inicio`. Leia comandos até a palavra `fim`: `ir <pagina>` navega para uma página nova, `voltar` retrocede e `avancar` refaz. Informe a página atual após cada comando bem-sucedido.',
      requirements: [
        'Cada comando bem-sucedido imprime `Atual: b`, com a página em que você ficou',
        'Um `voltar` sem histórico imprime `Nao ha para onde voltar`',
        'Um `avancar` sem futuro imprime `Nao ha para onde avancar`',
        'Qualquer outro comando imprime `Comando invalido`',
        'Navegar com `ir` descarta todo o avanço acumulado',
        'Depois: `Pagina atual: p`',
        'Depois: `Historico: h`, o tamanho da pilha de voltar',
        'Por último: `Avancos disponiveis: a`',
        'O programa não pode encerrar com exceção',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Stack<string> voltar = new Stack<string>();
        Stack<string> avancar = new Stack<string>();
        string atual = "inicio";

        string linha = Console.ReadLine();

        // ir: empilha o atual em voltar e limpa o avancar
        // voltar e avancar: espelhos um do outro

        Console.WriteLine($"Pagina atual: {atual}");
        Console.WriteLine($"Historico: {voltar.Count}");
        Console.WriteLine($"Avancos disponiveis: {avancar.Count}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Stack<string> voltar = new Stack<string>();
        Stack<string> avancar = new Stack<string>();
        string atual = "inicio";

        string linha = Console.ReadLine();

        while (linha != "fim")
        {
            int espaco = linha.IndexOf(' ');
            string verbo = espaco >= 0 ? linha.Substring(0, espaco) : linha;
            string argumento = espaco >= 0 ? linha.Substring(espaco + 1) : "";

            if (verbo == "ir" && argumento.Length > 0)
            {
                voltar.Push(atual);
                atual = argumento;
                avancar.Clear();
                Console.WriteLine($"Atual: {atual}");
            }
            else if (verbo == "voltar" && argumento.Length == 0)
            {
                if (voltar.Count > 0)
                {
                    avancar.Push(atual);
                    atual = voltar.Pop();
                    Console.WriteLine($"Atual: {atual}");
                }
                else
                {
                    Console.WriteLine("Nao ha para onde voltar");
                }
            }
            else if (verbo == "avancar" && argumento.Length == 0)
            {
                if (avancar.Count > 0)
                {
                    voltar.Push(atual);
                    atual = avancar.Pop();
                    Console.WriteLine($"Atual: {atual}");
                }
                else
                {
                    Console.WriteLine("Nao ha para onde avancar");
                }
            }
            else
            {
                Console.WriteLine("Comando invalido");
            }

            linha = Console.ReadLine();
        }

        Console.WriteLine($"Pagina atual: {atual}");
        Console.WriteLine($"Historico: {voltar.Count}");
        Console.WriteLine($"Avancos disponiveis: {avancar.Count}");
    }
}
`,
      hints: [
        'Os corpos de `voltar` e `avancar` são idênticos com as duas pilhas trocadas de papel.',
        'O `avancar.Clear()` vem depois de atualizar a página atual, dentro do ramo do `ir`.',
      ],
      tests: [
        {
          name: 'Navegação com volta, avanço e descarte',
          stdin: 'ir a\nir b\nir c\nvoltar\nvoltar\navancar\nir d\navancar\nfim\n',
          expectedStdout:
            'Atual: a\nAtual: b\nAtual: c\nAtual: b\nAtual: a\nAtual: b\nAtual: d\nNao ha para onde avancar\n' +
            'Pagina atual: d\nHistorico: 3\nAvancos disponiveis: 0',
        },
        {
          name: 'Voltar sem histórico',
          stdin: 'voltar\nfim\n',
          expectedStdout:
            'Nao ha para onde voltar\nPagina atual: inicio\nHistorico: 0\nAvancos disponiveis: 0',
        },
        {
          name: 'Comando desconhecido',
          stdin: 'ir a\nxyz\nfim\n',
          expectedStdout:
            'Atual: a\nComando invalido\nPagina atual: a\nHistorico: 1\nAvancos disponiveis: 0',
        },
        {
          name: 'Voltar deixa um avanço disponível',
          stdin: 'ir x\nvoltar\nfim\n',
          expectedStdout:
            'Atual: x\nAtual: inicio\nPagina atual: inicio\nHistorico: 0\nAvancos disponiveis: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c04l10',
    title: 'Checkpoint: escolhendo a coleção',
    objective: 'Combinar `HashSet`, `Queue` e `Stack` no mesmo programa, cada um cobrindo a responsabilidade que só ele resolve bem.',
    concept: [
      {
        kind: 'text',
        body:
          'Este checkpoint monta um processador de tarefas em que **três** coleções convivem, e nenhuma delas poderia substituir as outras sem piorar o programa.',
      },
      {
        kind: 'table',
        headers: ['Coleção', 'Responsabilidade', 'Por que ela'],
        rows: [
          ['`HashSet`', 'lembrar o que já foi registrado', 'detecta duplicata imediatamente'],
          ['`Queue`', 'ordem de processamento', 'primeiro registrado, primeiro processado'],
          ['`Stack`', 'histórico do que foi feito', 'o último processado é o mais relevante'],
        ],
      },
      {
        kind: 'text',
        body:
          'Repare que o `HashSet` guarda **todos** os ids já vistos, inclusive os já processados. Ele é a memória permanente do sistema, enquanto a fila só guarda o que ainda falta fazer.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Um id sai da fila quando é processado, mas **não** sai do conjunto de vistos. Por isso registrar de novo um id já concluído continua sendo duplicata — que é o comportamento correto para um sistema que não deve refazer trabalho.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A saída lista a fila da frente para o fundo e a pilha do topo para a base. Essas são exatamente as ordens que o `foreach` de cada uma produz — mas cada uma pelo motivo dela, e trocá-las inverteria o significado do relatório.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Monte em três etapas, rodando os testes a cada uma: primeiro só o `registrar` com deduplicação; depois o `processar`; e por último o `ultimo` e o relatório. Três coleções de uma vez é mais estado do que se consegue depurar de cabeça.',
      },
    ],
    quiz: [
      {
        id: 's03c04l10q1',
        type: 'single',
        prompt: 'Um id já processado é registrado de novo. O que deve acontecer?',
        options: [
          { id: 'a', text: 'Contar como duplicata: o conjunto de vistos não esquece.', correct: true },
          { id: 'b', text: 'Entrar na fila de novo.' },
          { id: 'c', text: 'Substituir o registro anterior.' },
          { id: 'd', text: 'Ser rejeitado com erro.' },
        ],
        explanation:
          'A fila guarda o que **falta** fazer; o conjunto guarda o que **já apareceu**. Um id processado saiu da primeira e permaneceu no segundo, e é isso que evita retrabalho.',
      },
      {
        id: 's03c04l10q2',
        type: 'single',
        prompt: 'Por que a fila e a pilha não podem trocar de papel aqui?',
        options: [
          { id: 'a', text: 'Processar deve seguir a ordem de registro, e o histórico interessa do mais recente para o mais antigo.', correct: true },
          { id: 'b', text: 'Porque `Queue` não aceita `string`.' },
          { id: 'c', text: 'Porque a pilha não tem `Count`.' },
          { id: 'd', text: 'Podem trocar: o resultado é o mesmo.' },
        ],
        explanation:
          'São duas ordens opostas e as duas são intencionais. Trocá-las processaria a tarefa mais recente primeiro e mostraria o histórico ao contrário.',
      },
      {
        id: 's03c04l10q3',
        type: 'single',
        prompt: 'Qual coleção o `foreach` percorre do mais recente para o mais antigo?',
        options: [
          { id: 'a', code: 'Stack', correct: true },
          { id: 'b', code: 'Queue' },
          { id: 'c', code: 'HashSet' },
          { id: 'd', text: 'Todas, na mesma ordem.' },
        ],
        explanation:
          'A pilha enumera do topo para a base, que é a ordem em que os itens sairiam. A fila enumera da frente para o fundo, e o conjunto não tem ordem garantida.',
      },
    ],
    challenge: {
      brief:
        'Processe um lote de tarefas. Leia comandos até a palavra `fim`. `registrar <id>` coloca uma tarefa nova na fila, ignorando ids já vistos; `processar` retira a próxima da fila e a empilha no histórico; `ultimo` mostra a última tarefa concluída. Qualquer outra linha é ignorada.',
      requirements: [
        'Um `processar` com a fila vazia imprime `Fila vazia`',
        'Um `ultimo` sem nada concluído imprime `Nenhum processado`; caso contrário, `Ultimo processado: B`',
        'Depois: `Fila: ...`, da frente para o fundo',
        'Depois: `Pilha: ...`, do topo para a base',
        'Depois: `Registrados: r`, contando só os ids novos',
        'Depois: `Duplicados: d`',
        'Depois: `Pendentes: p` e `Processados: c`',
        'Por último: `Ignorados: g`',
        'Um id já processado continua contando como duplicata se registrado de novo',
        'Um `registrar` sem id é ignorado',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        HashSet<string> vistos = new HashSet<string>();
        Queue<string> fila = new Queue<string>();
        Stack<string> processados = new Stack<string>();

        int registrados = 0;
        int duplicados = 0;
        int ignorados = 0;

        string linha = Console.ReadLine();

        // registrar: HashSet decide, Queue guarda a ordem
        // processar: Queue -> Stack
        // ultimo: Peek na Stack

        // Monte as linhas da fila e da pilha com foreach
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        HashSet<string> vistos = new HashSet<string>();
        Queue<string> fila = new Queue<string>();
        Stack<string> processados = new Stack<string>();

        int registrados = 0;
        int duplicados = 0;
        int ignorados = 0;

        string linha = Console.ReadLine();

        while (linha != "fim")
        {
            int espaco = linha.IndexOf(' ');
            string verbo = espaco >= 0 ? linha.Substring(0, espaco) : linha;
            string argumento = espaco >= 0 ? linha.Substring(espaco + 1) : "";

            if (verbo == "registrar" && argumento.Length > 0)
            {
                if (vistos.Add(argumento))
                {
                    fila.Enqueue(argumento);
                    registrados++;
                }
                else
                {
                    duplicados++;
                }
            }
            else if (verbo == "processar" && argumento.Length == 0)
            {
                if (fila.Count > 0)
                {
                    processados.Push(fila.Dequeue());
                }
                else
                {
                    Console.WriteLine("Fila vazia");
                }
            }
            else if (verbo == "ultimo" && argumento.Length == 0)
            {
                if (processados.Count > 0)
                {
                    Console.WriteLine($"Ultimo processado: {processados.Peek()}");
                }
                else
                {
                    Console.WriteLine("Nenhum processado");
                }
            }
            else
            {
                ignorados++;
            }

            linha = Console.ReadLine();
        }

        string textoFila = "";
        foreach (string item in fila)
        {
            textoFila += $"{item} ";
        }

        string textoPilha = "";
        foreach (string item in processados)
        {
            textoPilha += $"{item} ";
        }

        Console.WriteLine($"Fila: {textoFila}");
        Console.WriteLine($"Pilha: {textoPilha}");
        Console.WriteLine($"Registrados: {registrados}");
        Console.WriteLine($"Duplicados: {duplicados}");
        Console.WriteLine($"Pendentes: {fila.Count}");
        Console.WriteLine($"Processados: {processados.Count}");
        Console.WriteLine($"Ignorados: {ignorados}");
    }
}
`,
      hints: [
        'O `vistos.Add(argumento)` já decide entre registrar e contar duplicata, em uma operação só.',
        'O `foreach` de cada coleção já produz a ordem pedida: a fila da frente para o fundo, a pilha do topo para a base.',
      ],
      tests: [
        {
          name: 'Registro, duplicata e processamento',
          stdin: 'registrar A\nregistrar B\nregistrar A\nprocessar\nregistrar C\nprocessar\nultimo\nfim\n',
          expectedStdout:
            'Ultimo processado: B\nFila: C\nPilha: B A\nRegistrados: 3\nDuplicados: 1\n' +
            'Pendentes: 1\nProcessados: 2\nIgnorados: 0',
        },
        {
          name: 'Nada registrado',
          stdin: 'processar\nxyz\nultimo\nfim\n',
          expectedStdout:
            'Fila vazia\nNenhum processado\nFila:\nPilha:\nRegistrados: 0\nDuplicados: 0\n' +
            'Pendentes: 0\nProcessados: 0\nIgnorados: 1',
        },
        {
          name: 'Id já processado ainda é duplicata',
          stdin: 'registrar A\nprocessar\nregistrar A\nfim\n',
          expectedStdout:
            'Fila:\nPilha: A\nRegistrados: 1\nDuplicados: 1\n' +
            'Pendentes: 0\nProcessados: 1\nIgnorados: 0',
        },
        {
          name: 'Um registro pendente',
          stdin: 'registrar X\nfim\n',
          expectedStdout:
            'Fila: X\nPilha:\nRegistrados: 1\nDuplicados: 0\n' +
            'Pendentes: 1\nProcessados: 0\nIgnorados: 0',
          hidden: true,
        },
      ],
    },
  },
]
