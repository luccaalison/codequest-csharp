import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's03c07l01',
    title: 'Custo das operações básicas',
    objective: 'Comparar o custo das operações de cada coleção e reconhecer quais dependem do tamanho dos dados.',
    concept: [
      {
        kind: 'text',
        body:
          'Toda coleção deste capítulo faz as mesmas coisas: guardar, buscar, remover. O que muda é **quanto trabalho** cada uma faz — e essa diferença é o que decide qual escolher.',
      },
      {
        kind: 'text',
        body:
          'Há apenas duas categorias que importam aqui. Uma operação **imediata** faz o mesmo trabalho com 10 ou com 10 milhões de itens. Uma operação **linear** faz trabalho proporcional ao tamanho.',
      },
      {
        kind: 'table',
        headers: ['Operação', '`List<T>`', '`Dictionary`', '`HashSet`', '`Queue`/`Stack`'],
        rows: [
          ['acessar por índice', 'imediato', '—', '—', '—'],
          ['buscar por valor', '**linear**', 'imediato', 'imediato', '**linear**'],
          ['adicionar no fim', 'imediato', 'imediato', 'imediato', 'imediato'],
          ['inserir no começo', '**linear**', '—', '—', 'imediato'],
          ['remover do começo', '**linear**', '—', '—', 'imediato'],
          ['manter a ordem', 'sim', 'não', 'não', 'sim'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que nenhuma coleção é boa em tudo. O `Dictionary` busca imediatamente e não tem ordem; a `List` tem ordem e índice mas busca devagar. Escolher é decidir **o que você aceita perder**.',
      },
      {
        kind: 'text',
        body:
          'A diferença prática é enorme e fácil de subestimar. Buscar mil vezes em uma lista de mil itens custa até um milhão de comparações; em um dicionário, custa mil consultas.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Uma operação linear **dentro de um laço** vira quadrática. É a forma mais comum de um programa correto ficar lento demais: cada peça parece barata, e o custo aparece só na multiplicação.',
      },
    ],
    quiz: [
      {
        id: 's03c07l01q1',
        type: 'single',
        prompt: 'Qual operação de `List<T>` tem custo linear?',
        options: [
          { id: 'a', code: 'Contains(x)', correct: true },
          { id: 'b', code: 'lista[5]' },
          { id: 'c', code: 'Add(x)' },
          { id: 'd', code: 'Count' },
        ],
        explanation:
          'Buscar por valor exige comparar item por item. O acesso por índice vai direto, e `Count` é um número guardado.',
      },
      {
        id: 's03c07l01q2',
        type: 'single',
        prompt: 'O que o `Dictionary` perde em troca da busca imediata?',
        options: [
          { id: 'a', text: 'A ordem dos elementos e o acesso por posição.', correct: true },
          { id: 'b', text: 'A capacidade de guardar muitos itens.' },
          { id: 'c', text: 'A possibilidade de remover elementos.' },
          { id: 'd', text: 'Nada: ele é melhor em tudo.' },
        ],
        explanation:
          'Ele organiza os dados pelo cálculo da chave, e essa organização não tem relação com a ordem de inserção nem com posições numeradas.',
      },
      {
        id: 's03c07l01q3',
        type: 'single',
        prompt: 'Por que uma operação linear dentro de um laço é perigosa?',
        options: [
          { id: 'a', text: 'Porque os custos se multiplicam, tornando o total quadrático.', correct: true },
          { id: 'b', text: 'Porque o laço pode não terminar.' },
          { id: 'c', text: 'Porque a coleção pode ser modificada.' },
          { id: 'd', text: 'Não é perigosa se o laço for pequeno.' },
        ],
        explanation:
          'É o mesmo raciocínio de laços aninhados da Seção 2 — só que aqui o segundo laço está escondido dentro de uma chamada que parece uma operação só.',
      },
    ],
    challenge: {
      brief:
        'Compare o custo de buscar em uma `List` e em um `HashSet`. Leia `n` valores distintos e depois `q` alvos. Para cada alvo, conte quantas comparações uma busca linear na lista faria, e registre que o conjunto resolve em uma consulta.',
      requirements: [
        'Uma linha por alvo, no formato `50: encontrado, comparacoes: 5` ou `99: ausente, comparacoes: 6`',
        'A busca na lista compara desde o começo e **para** ao encontrar',
        'Um alvo ausente custa uma comparação por elemento da lista',
        'Depois: `Total de comparacoes: t`',
        'Por último: `Consultas no conjunto: q`, uma por alvo',
        'A ordem da entrada é: `n`, os `n` valores, `q`, e os `q` alvos',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> lista = new List<int>();
        HashSet<int> conjunto = new HashSet<int>();

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());
            lista.Add(valor);
            conjunto.Add(valor);
        }

        int q = int.Parse(Console.ReadLine());
        int totalComparacoes = 0;

        // Para cada alvo: varra a lista contando, e consulte o conjunto

        Console.WriteLine($"Total de comparacoes: {totalComparacoes}");
        Console.WriteLine($"Consultas no conjunto: {q}");
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
        HashSet<int> conjunto = new HashSet<int>();

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());
            lista.Add(valor);
            conjunto.Add(valor);
        }

        int q = int.Parse(Console.ReadLine());
        int totalComparacoes = 0;

        for (int k = 0; k < q; k++)
        {
            int alvo = int.Parse(Console.ReadLine());

            int comparacoes = 0;
            bool achou = false;

            for (int i = 0; i < lista.Count; i++)
            {
                comparacoes++;

                if (lista[i] == alvo)
                {
                    achou = true;
                    break;
                }
            }

            totalComparacoes += comparacoes;

            string estado = achou ? "encontrado" : "ausente";
            Console.WriteLine($"{alvo}: {estado}, comparacoes: {comparacoes}");
        }

        Console.WriteLine($"Total de comparacoes: {totalComparacoes}");
        Console.WriteLine($"Consultas no conjunto: {q}");
    }
}
`,
      hints: [
        'Conte a comparação **antes** de testar a igualdade: a comparação que encontra o valor também conta.',
        'O `break` ao encontrar é o que faz a busca custar menos que o tamanho da lista nos casos favoráveis.',
      ],
      tests: [
        {
          name: 'Um encontrado e um ausente',
          stdin: '6\n10\n20\n30\n40\n50\n60\n2\n50\n99\n',
          expectedStdout:
            '50: encontrado, comparacoes: 5\n99: ausente, comparacoes: 6\n' +
            'Total de comparacoes: 11\nConsultas no conjunto: 2',
        },
        {
          name: 'Melhor caso: primeiro elemento',
          stdin: '3\n1\n2\n3\n1\n1\n',
          expectedStdout:
            '1: encontrado, comparacoes: 1\nTotal de comparacoes: 1\nConsultas no conjunto: 1',
        },
        {
          name: 'Pior caso: todos ausentes',
          stdin: '4\n1\n2\n3\n4\n2\n9\n8\n',
          expectedStdout:
            '9: ausente, comparacoes: 4\n8: ausente, comparacoes: 4\n' +
            'Total de comparacoes: 8\nConsultas no conjunto: 2',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c07l02',
    title: 'Array ou List',
    objective: 'Entender por que a `List` cresce dobrando a capacidade, e quanto isso economiza em relação a crescer de um em um.',
    concept: [
      {
        kind: 'text',
        body:
          'Um array não cresce. Para acrescentar um item, é preciso criar um array maior e copiar tudo. A `List` faz exatamente isso por dentro — mas com uma estratégia que muda tudo.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Crescer de um em um',
          code: `capacidade: 1, 2, 3, 4, 5...
copias: 0+1+2+3+4...

n itens  ->  n(n-1)/2 copias`,
        },
        right: {
          label: 'Dobrar a capacidade',
          code: `capacidade: 1, 2, 4, 8, 16...
copias: 1+2+4+8...

n itens  ->  menos de n copias`,
        },
      },
      {
        kind: 'table',
        headers: ['`n`', 'Um a um', 'Dobrando'],
        rows: [
          ['`10`', '45', '15'],
          ['`100`', '4.950', '127'],
          ['`1.000`', '499.500', '1.023'],
          ['`10.000`', '~50 milhões', '~16 mil'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Dobrar faz as realocações ficarem cada vez mais raras: entre a capacidade 512 e a 1024 há uma única cópia, diluída entre 512 inserções. É por isso que se diz que o `Add` custa "praticamente nada" **em média**, mesmo tendo picos caros.',
      },
      {
        kind: 'text',
        body:
          'O preço disso é memória: uma lista com 513 itens reserva espaço para 1024. No pior caso, quase metade do espaço fica sobrando — uma troca que vale a pena em quase toda situação.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O array continua ganhando quando a quantidade é **conhecida e fixa**: ele não desperdiça espaço nem paga por realocações que nunca vão acontecer. Usar `List` para algo que sempre terá exatamente 3 elementos é gastar à toa.',
      },
      {
        kind: 'text',
        body:
          'Quando você sabe o tamanho final de antemão mas ainda quer uma `List`, dá para reservar a capacidade na criação — e assim ter as duas coisas: nenhuma realocação e a flexibilidade da lista.',
      },
    ],
    quiz: [
      {
        id: 's03c07l02q1',
        type: 'single',
        prompt: 'Quantas cópias de elemento são feitas ao inserir 100 itens crescendo de um em um?',
        options: [
          { id: 'a', code: '4950', correct: true },
          { id: 'b', code: '100' },
          { id: 'c', code: '127' },
          { id: 'd', code: '200' },
        ],
        explanation:
          'É o somatório `0 + 1 + ... + 99`, ou `n(n-1)/2`. O mesmo somatório do capítulo de laços da Seção 2, agora medindo desperdício.',
      },
      {
        id: 's03c07l02q2',
        type: 'single',
        prompt: 'Por que dobrar a capacidade torna o `Add` barato em média?',
        options: [
          { id: 'a', text: 'Porque as realocações ficam cada vez mais espaçadas, diluindo o custo.', correct: true },
          { id: 'b', text: 'Porque a cópia passa a ser instantânea.' },
          { id: 'c', text: 'Porque a lista deixa de copiar.' },
          { id: 'd', text: 'Porque o array interno vira um dicionário.' },
        ],
        explanation:
          'As cópias continuam existindo e ficam cada vez maiores — mas acontecem tão raramente que o custo por inserção, somado e dividido, fica constante.',
      },
      {
        id: 's03c07l02q3',
        type: 'single',
        prompt: 'Quando um array simples ainda é a melhor escolha?',
        options: [
          { id: 'a', text: 'Quando a quantidade de elementos é conhecida e não muda.', correct: true },
          { id: 'b', text: 'Quando há muitos elementos.' },
          { id: 'c', text: 'Quando é preciso buscar por valor.' },
          { id: 'd', text: 'Nunca: a `List` é sempre melhor.' },
        ],
        explanation:
          'Sem crescimento não há realocação a evitar, e o array não reserva espaço sobrando. É uma escolha de precisão, não de capacidade.',
      },
    ],
    challenge: {
      brief:
        'Simule as duas estratégias de crescimento para `n` inserções e conte quantas cópias de elemento cada uma faz. Na primeira, a capacidade cresce de um em um; na segunda, ela começa em 1 e dobra sempre que fica cheia.',
      requirements: [
        'Linha 1: `Um a um: c copias`',
        'Linha 2: `Dobrando: c copias`',
        'Linha 3: `Economia: e`, a diferença entre as duas',
        'Na estratégia um a um, inserir o item `k` copia os `k - 1` já existentes',
        'Na estratégia de dobrar, a cópia só acontece quando a quantidade alcança a capacidade, e copia todos os itens atuais',
        'Conte com laços, não pelas fórmulas',
      ],
      starterCode: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int umAUm = 0;
        int dobrando = 0;

        // Estrategia 1: cada insercao copia tudo que ja existe

        // Estrategia 2: capacidade comeca em 1 e dobra quando enche

        Console.WriteLine($"Um a um: {umAUm} copias");
        Console.WriteLine($"Dobrando: {dobrando} copias");
        Console.WriteLine($"Economia: {umAUm - dobrando}");
    }
}
`,
      solution: `using System;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int umAUm = 0;

        for (int k = 0; k < n; k++)
        {
            umAUm += k;
        }

        int dobrando = 0;
        int capacidade = 1;
        int quantidade = 0;

        for (int k = 0; k < n; k++)
        {
            if (quantidade == capacidade)
            {
                dobrando += quantidade;
                capacidade = capacidade * 2;
            }

            quantidade++;
        }

        Console.WriteLine($"Um a um: {umAUm} copias");
        Console.WriteLine($"Dobrando: {dobrando} copias");
        Console.WriteLine($"Economia: {umAUm - dobrando}");
    }
}
`,
      hints: [
        'Na primeira estratégia, a inserção de índice `k` copia exatamente `k` elementos — some `k` a cada volta.',
        'Na segunda, cheque se a quantidade alcançou a capacidade **antes** de inserir; se sim, copie tudo e dobre a capacidade.',
      ],
      tests: [
        {
          name: 'Dez inserções',
          stdin: '10\n',
          expectedStdout: 'Um a um: 45 copias\nDobrando: 15 copias\nEconomia: 30',
        },
        {
          name: 'Cem inserções: a diferença explode',
          stdin: '100\n',
          expectedStdout: 'Um a um: 4950 copias\nDobrando: 127 copias\nEconomia: 4823',
        },
        {
          name: 'Uma inserção não copia nada',
          stdin: '1\n',
          expectedStdout: 'Um a um: 0 copias\nDobrando: 0 copias\nEconomia: 0',
        },
        {
          name: 'Nenhuma inserção',
          stdin: '0\n',
          expectedStdout: 'Um a um: 0 copias\nDobrando: 0 copias\nEconomia: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c07l03',
    title: 'List ou Dictionary',
    objective: 'Decidir entre percorrer e indexar, medindo o custo da busca por chave nas duas estruturas.',
    concept: [
      {
        kind: 'text',
        body:
          'As duas guardam os mesmos dados e dão as mesmas respostas. A diferença aparece na pergunta "qual é o item cuja chave é X?" — e ela é grande o bastante para decidir a arquitetura de um programa.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'List: percorre',
          code: `foreach (var item in lista)
{
    if (item.Nome == alvo)
        return item.Preco;
}`,
        },
        right: {
          label: 'Dictionary: calcula',
          code: `if (precos.TryGetValue(alvo, out int p))
{
    return p;
}`,
        },
      },
      {
        kind: 'table',
        headers: ['Critério', '`List`', '`Dictionary`'],
        rows: [
          ['busca por chave', 'linear', '**imediata**'],
          ['ordem preservada', '**sim**', 'não'],
          ['acesso por posição', '**sim**', 'não'],
          ['chaves repetidas', '**sim**', 'não'],
          ['memória por item', '**menor**', 'maior'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A regra prática: se o programa busca **por chave** com frequência, use `Dictionary`. Se ele percorre tudo, mantém ordem, ou precisa de posições, use `List`. Quando precisa dos dois, é comum manter as duas estruturas com os mesmos dados.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Com poucos itens, a lista pode até ser mais rápida: percorrer cinco elementos custa menos que calcular um código de espalhamento. A vantagem do dicionário só compensa a partir de algumas dezenas de itens — e cresce sem parar depois disso.',
      },
      {
        kind: 'text',
        body:
          'O que nunca muda é o **resultado**: as duas estruturas encontram exatamente o mesmo item. Trocar uma pela outra é uma decisão de desempenho e de expressividade, nunca de correção.',
      },
    ],
    quiz: [
      {
        id: 's03c07l03q1',
        type: 'single',
        prompt: 'Quando a `List` continua sendo a escolha certa mesmo havendo buscas?',
        options: [
          { id: 'a', text: 'Quando a ordem importa, ou quando há poucos itens.', correct: true },
          { id: 'b', text: 'Quando as chaves são texto.' },
          { id: 'c', text: 'Quando os valores são numéricos.' },
          { id: 'd', text: 'Nunca: dicionário sempre vence com buscas.' },
        ],
        explanation:
          'O dicionário abre mão da ordem, e com poucos itens a busca linear é curta. A escolha pesa a frequência das buscas contra o que mais o programa precisa.',
      },
      {
        id: 's03c07l03q2',
        type: 'single',
        prompt: 'Qual capacidade a `List` tem e o `Dictionary` não?',
        options: [
          { id: 'a', text: 'Guardar chaves repetidas e manter a ordem de inserção.', correct: true },
          { id: 'b', text: 'Guardar valores de tipos diferentes.' },
          { id: 'c', text: 'Crescer conforme necessário.' },
          { id: 'd', text: 'Ser percorrida com `foreach`.' },
        ],
        explanation:
          'As duas crescem e são percorríveis. Chave única e ausência de ordem são exatamente o que o dicionário troca pela busca imediata.',
      },
      {
        id: 's03c07l03q3',
        type: 'single',
        prompt: 'Trocar uma `List` por um `Dictionary` pode mudar o resultado do programa?',
        options: [
          { id: 'a', text: 'Só se o programa dependia da ordem ou de chaves repetidas.', correct: true },
          { id: 'b', text: 'Nunca: o resultado é sempre idêntico.' },
          { id: 'c', text: 'Sempre: os valores são organizados de outra forma.' },
          { id: 'd', text: 'Só se as chaves forem numéricas.' },
        ],
        explanation:
          'A busca encontra o mesmo item nas duas. O que se perde é a ordem e a possibilidade de repetição — e é aí que um programa que dependia disso quebra.',
      },
    ],
    challenge: {
      brief:
        'Compare as duas estruturas na mesma carga de trabalho. Leia `n` produtos com nome e preço, guarde-os em uma `List` de tuplas **e** em um `Dictionary`, e responda `q` consultas por nome contando as comparações da busca linear.',
      requirements: [
        'Uma linha por consulta, no formato `Teclado: 150, comparacoes: 1` ou `Fone: nao encontrado, comparacoes: 3`',
        'A busca na lista compara desde o começo e para ao encontrar',
        'Depois: `Total de comparacoes: t`',
        'Depois: `Consultas no dicionario: q`',
        'Por último: `Resultados iguais: True`, confirmando que as duas estruturas deram as mesmas respostas',
        'A ordem da entrada é: `n`, os `n` pares nome/preço, `q`, e os `q` nomes consultados',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<(string Nome, int Preco)> lista = new List<(string Nome, int Preco)>();
        Dictionary<string, int> precos = new Dictionary<string, int>();

        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int preco = int.Parse(Console.ReadLine());
            lista.Add((nome, preco));
            precos[nome] = preco;
        }

        int q = int.Parse(Console.ReadLine());
        int totalComparacoes = 0;
        bool iguais = true;

        // Busque nas duas estruturas e compare os resultados

        Console.WriteLine($"Total de comparacoes: {totalComparacoes}");
        Console.WriteLine($"Consultas no dicionario: {q}");
        Console.WriteLine($"Resultados iguais: {iguais}");
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

        List<(string Nome, int Preco)> lista = new List<(string Nome, int Preco)>();
        Dictionary<string, int> precos = new Dictionary<string, int>();

        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            int preco = int.Parse(Console.ReadLine());
            lista.Add((nome, preco));
            precos[nome] = preco;
        }

        int q = int.Parse(Console.ReadLine());
        int totalComparacoes = 0;
        bool iguais = true;

        for (int k = 0; k < q; k++)
        {
            string alvo = Console.ReadLine();

            int comparacoes = 0;
            bool achouNaLista = false;
            int precoNaLista = 0;

            for (int i = 0; i < lista.Count; i++)
            {
                comparacoes++;

                if (lista[i].Nome == alvo)
                {
                    achouNaLista = true;
                    precoNaLista = lista[i].Preco;
                    break;
                }
            }

            totalComparacoes += comparacoes;

            bool achouNoDicionario = precos.TryGetValue(alvo, out int precoNoDicionario);

            if (achouNaLista != achouNoDicionario || precoNaLista != precoNoDicionario)
            {
                iguais = false;
            }

            if (achouNaLista)
            {
                Console.WriteLine($"{alvo}: {precoNaLista}, comparacoes: {comparacoes}");
            }
            else
            {
                Console.WriteLine($"{alvo}: nao encontrado, comparacoes: {comparacoes}");
            }
        }

        Console.WriteLine($"Total de comparacoes: {totalComparacoes}");
        Console.WriteLine($"Consultas no dicionario: {q}");
        Console.WriteLine($"Resultados iguais: {iguais}");
    }
}
`,
      hints: [
        'A busca na lista compara `lista[i].Nome` com o alvo, contando cada comparação antes do teste.',
        'A comparação dos resultados checa duas coisas: se as duas estruturas concordam sobre ter encontrado, e se o preço bate.',
      ],
      tests: [
        {
          name: 'Consulta encontrada e ausente',
          stdin: '3\nTeclado\n150\nMouse\n80\nMonitor\n500\n2\nTeclado\nFone\n',
          expectedStdout:
            'Teclado: 150, comparacoes: 1\nFone: nao encontrado, comparacoes: 3\n' +
            'Total de comparacoes: 4\nConsultas no dicionario: 2\nResultados iguais: True',
        },
        {
          name: 'Último item é o pior caso',
          stdin: '3\nA\n1\nB\n2\nC\n3\n1\nC\n',
          expectedStdout:
            'C: 3, comparacoes: 3\nTotal de comparacoes: 3\nConsultas no dicionario: 1\nResultados iguais: True',
        },
        {
          name: 'Preço zero não é ausência',
          stdin: '1\nGratis\n0\n1\nGratis\n',
          expectedStdout:
            'Gratis: 0, comparacoes: 1\nTotal de comparacoes: 1\nConsultas no dicionario: 1\nResultados iguais: True',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c07l04',
    title: 'HashSet ou List',
    objective: 'Medir a diferença entre `List.Contains` e `HashSet.Add` na deduplicação, e reconhecer quando ela não compensa.',
    concept: [
      {
        kind: 'text',
        body:
          'Remover duplicados com uma `List` funciona: para cada valor, você pergunta se ele já está lá. O problema é que essa pergunta custa uma varredura, e ela acontece uma vez por item.',
      },
      {
        kind: 'compare',
        good: `if (vistos.Add(valor))
{
    resultado.Add(valor);
}`,
        bad: `if (!resultado.Contains(valor))
{
    resultado.Add(valor);
}`,
        goodLabel: 'Uma operação imediata por item',
        badLabel: 'Uma varredura por item',
      },
      {
        kind: 'text',
        body:
          'O custo da versão com `List` depende de **quantos valores distintos** existem, porque a lista de resultado só cresce quando aparece um valor novo. Com poucos distintos, a varredura é curta.',
      },
      {
        kind: 'table',
        headers: ['Entrada', 'Comparações com `List`', 'Operações com `HashSet`'],
        rows: [
          ['1.000 valores, 1.000 distintos', '~500 mil', '1.000'],
          ['1.000 valores, 10 distintos', '~10 mil', '1.000'],
          ['4 valores, 1 distinto', '3', '4'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A última linha da tabela é honesta e vale registrar: em entradas minúsculas a `List` chega a fazer **menos** operações. A vantagem do `HashSet` não é ser sempre menor — é não crescer junto com os dados.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O caso ruim da `List` é o mais comum na prática: muitos valores e quase todos distintos. É exatamente o cenário de deduplicar registros, e é onde o custo passa de linear para quadrático.',
      },
      {
        kind: 'text',
        body:
          'Vale lembrar que o `HashSet` sozinho **perde a ordem**. O padrão do capítulo 4 — conjunto para lembrar, lista para ordenar — é o que dá as duas coisas ao mesmo tempo.',
      },
    ],
    quiz: [
      {
        id: 's03c07l04q1',
        type: 'single',
        prompt: 'O custo da deduplicação com `List.Contains` depende de quê?',
        options: [
          { id: 'a', text: 'Da quantidade de valores distintos, que é o tamanho da lista de resultado.', correct: true },
          { id: 'b', text: 'Apenas da quantidade total de valores lidos.' },
          { id: 'c', text: 'Do maior valor da entrada.' },
          { id: 'd', text: 'Da ordem dos valores.' },
        ],
        explanation:
          'A varredura percorre o que já foi aceito, e só valores novos entram lá. Por isso uma entrada com poucos distintos fica barata mesmo sendo longa.',
      },
      {
        id: 's03c07l04q2',
        type: 'single',
        prompt: 'Em que situação a versão com `List` faz menos operações que a com `HashSet`?',
        options: [
          { id: 'a', text: 'Em entradas muito pequenas com poucos valores distintos.', correct: true },
          { id: 'b', text: 'Em entradas grandes com muitos distintos.' },
          { id: 'c', text: 'Nunca.' },
          { id: 'd', text: 'Sempre que os valores forem numéricos.' },
        ],
        explanation:
          'Com quatro valores todos iguais, a lista faz 3 comparações e o conjunto faz 4 inserções. É um empate irrelevante — e o ponto é que ele desaparece assim que os dados crescem.',
      },
      {
        id: 's03c07l04q3',
        type: 'single',
        prompt: 'O que o `HashSet` sozinho não resolve na deduplicação?',
        options: [
          { id: 'a', text: 'Preservar a ordem de primeira aparição.', correct: true },
          { id: 'b', text: 'Detectar valores repetidos.' },
          { id: 'c', text: 'Contar quantos distintos há.' },
          { id: 'd', text: 'Aceitar valores negativos.' },
        ],
        explanation:
          'A ordem exige uma `List` acompanhando. É por isso que a solução completa usa as duas estruturas, cada uma no que ela é boa.',
      },
    ],
    challenge: {
      brief:
        'Deduplique a mesma entrada das duas formas e conte o trabalho de cada uma. Leia `n` valores e remova as repetições preservando a ordem, medindo as comparações da versão com `List` e as operações da versão com `HashSet`.',
      requirements: [
        'Linha 1: `Distintos: d`',
        'Linha 2: `Comparacoes com List: c`',
        'Linha 3: `Operacoes com HashSet: o`',
        'Na versão com `List`, cada valor é comparado com os já aceitos, parando ao encontrar igual',
        'Na versão com `HashSet`, cada valor custa exatamente uma operação',
        'As duas versões precisam produzir o mesmo conjunto de distintos',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] entrada = new int[n];
        for (int i = 0; i < n; i++)
        {
            entrada[i] = int.Parse(Console.ReadLine());
        }

        List<int> comLista = new List<int>();
        int comparacoes = 0;

        // Versao com List: varra os ja aceitos contando comparacoes

        HashSet<int> comConjunto = new HashSet<int>();
        int operacoes = 0;

        // Versao com HashSet: uma operacao por valor

        Console.WriteLine($"Distintos: {comLista.Count}");
        Console.WriteLine($"Comparacoes com List: {comparacoes}");
        Console.WriteLine($"Operacoes com HashSet: {operacoes}");
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
        for (int i = 0; i < n; i++)
        {
            entrada[i] = int.Parse(Console.ReadLine());
        }

        List<int> comLista = new List<int>();
        int comparacoes = 0;

        foreach (int valor in entrada)
        {
            bool achou = false;

            for (int i = 0; i < comLista.Count; i++)
            {
                comparacoes++;

                if (comLista[i] == valor)
                {
                    achou = true;
                    break;
                }
            }

            if (!achou)
            {
                comLista.Add(valor);
            }
        }

        HashSet<int> comConjunto = new HashSet<int>();
        int operacoes = 0;

        foreach (int valor in entrada)
        {
            comConjunto.Add(valor);
            operacoes++;
        }

        Console.WriteLine($"Distintos: {comLista.Count}");
        Console.WriteLine($"Comparacoes com List: {comparacoes}");
        Console.WriteLine($"Operacoes com HashSet: {operacoes}");
    }
}
`,
      hints: [
        'Na versão com lista, o contador de comparações sobe uma vez por elemento examinado, incluindo o que deu igual.',
        'A varredura do primeiro valor não faz nenhuma comparação: a lista de aceitos ainda está vazia.',
      ],
      tests: [
        {
          name: 'Repetições espalhadas',
          stdin: '7\n3\n1\n3\n4\n1\n5\n3\n',
          expectedStdout:
            'Distintos: 4\nComparacoes com List: 10\nOperacoes com HashSet: 7',
        },
        {
          name: 'Todos distintos: o pior caso da lista',
          stdin: '4\n1\n2\n3\n4\n',
          expectedStdout:
            'Distintos: 4\nComparacoes com List: 6\nOperacoes com HashSet: 4',
        },
        {
          name: 'Todos iguais: aqui a lista faz menos trabalho',
          stdin: '4\n7\n7\n7\n7\n',
          expectedStdout:
            'Distintos: 1\nComparacoes com List: 3\nOperacoes com HashSet: 4',
        },
        {
          name: 'Um valor só',
          stdin: '1\n9\n',
          expectedStdout:
            'Distintos: 1\nComparacoes com List: 0\nOperacoes com HashSet: 1',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c07l05',
    title: 'Quando usar Queue',
    objective: 'Medir o custo de imitar uma fila com `List` e entender por que a `Queue` existe.',
    concept: [
      {
        kind: 'text',
        body:
          'Uma `List` consegue se comportar como fila: `Add` no fim e `RemoveAt(0)` no começo. O resultado é correto — e o custo é péssimo, por um motivo específico.',
      },
      {
        kind: 'code',
        code: `lista.RemoveAt(0);

// todos os elementos seguintes andam
// uma posicao para tras: Count - 1 deslocamentos`,
        caption: 'Remover do começo obriga a reorganizar tudo que vem depois.',
      },
      {
        kind: 'text',
        body:
          'Esvaziar uma `List` pelo começo custa `n-1 + n-2 + ... + 1` deslocamentos — o mesmo somatório de sempre, agora medindo trabalho desperdiçado. Uma `Queue` faz isso com **zero** deslocamentos.',
      },
      {
        kind: 'table',
        headers: ['Itens', 'Deslocamentos com `List`', 'Com `Queue`'],
        rows: [
          ['`10`', '45', '0'],
          ['`100`', '4.950', '0'],
          ['`1.000`', '499.500', '0'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A `Queue` consegue isso guardando **onde** a fila começa, em vez de mover os dados. Retirar apenas avança esse marcador. É a mesma ideia de uma fila real: quando o primeiro sai, ninguém precisa dar um passo à frente.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O sintoma desse problema é característico: o programa funciona rápido nos testes com 10 itens e trava com 10 mil. Cada operação parece barata, e o custo total só aparece na multiplicação.',
      },
      {
        kind: 'text',
        body:
          'A troca é que a `Queue` não tem acesso por índice nem busca eficiente. Se você precisa perguntar "quem é o quinto da fila?", ela não serve — e aí uma `List` com dois índices de controle costuma ser a resposta.',
      },
    ],
    quiz: [
      {
        id: 's03c07l05q1',
        type: 'single',
        prompt: 'Quantos deslocamentos custa esvaziar uma `List` de 10 itens pelo começo?',
        options: [
          { id: 'a', code: '45', correct: true },
          { id: 'b', code: '10' },
          { id: 'c', code: '0' },
          { id: 'd', code: '100' },
        ],
        explanation:
          'A primeira remoção desloca 9, a segunda 8, e assim por diante: `9 + 8 + ... + 1 = 45`. A última remoção não desloca ninguém.',
      },
      {
        id: 's03c07l05q2',
        type: 'single',
        prompt: 'Como a `Queue` remove do começo sem deslocar nada?',
        options: [
          { id: 'a', text: 'Ela guarda onde a fila começa e apenas avança esse marcador.', correct: true },
          { id: 'b', text: 'Ela copia os dados para um array novo.' },
          { id: 'c', text: 'Ela mantém os itens ordenados.' },
          { id: 'd', text: 'Ela remove do fim em vez do começo.' },
        ],
        explanation:
          'Os dados ficam onde estão; muda apenas a noção de onde a fila começa. É por isso que a operação custa o mesmo com 10 ou com 10 milhões de itens.',
      },
      {
        id: 's03c07l05q3',
        type: 'single',
        prompt: 'O que a `Queue` não oferece?',
        options: [
          { id: 'a', text: 'Acesso por índice e busca eficiente.', correct: true },
          { id: 'b', text: 'Remoção do começo.' },
          { id: 'c', text: 'Inserção no fim.' },
          { id: 'd', text: 'Percurso com `foreach`.' },
        ],
        explanation:
          'Ela é especializada nas duas pontas. Perguntar "quem é o quinto?" ou "fulano está na fila?" exige percorrer, o que anula boa parte da vantagem.',
      },
    ],
    challenge: {
      brief:
        'Compare o custo de esvaziar uma coleção pelo começo. Leia `n` valores, guarde-os em uma `List` e em uma `Queue`, e esvazie as duas contando quantos deslocamentos de elemento cada uma exige.',
      requirements: [
        'Linha 1: `Ordem de saida: 1 2 3 4 5`, na ordem em que os itens saem',
        'Linha 2: `Deslocamentos com List: d`',
        'Linha 3: `Deslocamentos com Queue: 0`',
        'Cada `RemoveAt(0)` desloca todos os elementos que restam depois dele',
        'As duas coleções precisam produzir a mesma ordem de saída',
        'Conte com laços, não pela fórmula',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        List<int> lista = new List<int>();
        Queue<int> fila = new Queue<int>();

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());
            lista.Add(valor);
            fila.Enqueue(valor);
        }

        int deslocamentos = 0;
        string ordem = "";

        // Esvazie a lista pelo comeco, contando os deslocamentos

        // Esvazie a fila: zero deslocamentos

        Console.WriteLine($"Ordem de saida: {ordem}");
        Console.WriteLine($"Deslocamentos com List: {deslocamentos}");
        Console.WriteLine($"Deslocamentos com Queue: 0");
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
        Queue<int> fila = new Queue<int>();

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());
            lista.Add(valor);
            fila.Enqueue(valor);
        }

        int deslocamentos = 0;
        string ordem = "";

        while (lista.Count > 0)
        {
            deslocamentos += lista.Count - 1;
            lista.RemoveAt(0);
        }

        while (fila.Count > 0)
        {
            ordem += $"{fila.Dequeue()} ";
        }

        Console.WriteLine($"Ordem de saida: {ordem}");
        Console.WriteLine($"Deslocamentos com List: {deslocamentos}");
        Console.WriteLine($"Deslocamentos com Queue: 0");
    }
}
`,
      hints: [
        'Some `lista.Count - 1` **antes** de remover: é quantos elementos vão andar uma posição para trás.',
        'A ordem de saída pode ser montada esvaziando a fila, que produz exatamente a mesma sequência da lista.',
      ],
      tests: [
        {
          name: 'Cinco itens',
          stdin: '5\n1\n2\n3\n4\n5\n',
          expectedStdout:
            'Ordem de saida: 1 2 3 4 5\nDeslocamentos com List: 10\nDeslocamentos com Queue: 0',
        },
        {
          name: 'Dez itens',
          stdin: '10\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n',
          expectedStdout:
            'Ordem de saida: 1 2 3 4 5 6 7 8 9 10\nDeslocamentos com List: 45\nDeslocamentos com Queue: 0',
        },
        {
          name: 'Um item não desloca nada',
          stdin: '1\n7\n',
          expectedStdout:
            'Ordem de saida: 7\nDeslocamentos com List: 0\nDeslocamentos com Queue: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c07l06',
    title: 'Quando usar Stack',
    objective: 'Reconhecer que a `List` também faz LIFO com eficiência, e por que a `Stack` ainda vale a pena.',
    concept: [
      {
        kind: 'text',
        body:
          'A lição anterior mostrou que imitar uma fila com `List` é caro. Com uma **pilha**, a história é outra — e a diferença explica muito sobre como escolher estruturas.',
      },
      {
        kind: 'sideBySide',
        left: {
          label: 'Fila com List: caro',
          code: `lista.RemoveAt(0);

// desloca Count - 1 elementos`,
        },
        right: {
          label: 'Pilha com List: barato',
          code: `lista.RemoveAt(lista.Count - 1);

// nao desloca ninguem`,
        },
        note: 'Remover do fim não tem nada depois para deslocar.',
      },
      {
        kind: 'text',
        body:
          'Ou seja: uma `List` com `Add` e `RemoveAt(Count - 1)` é uma pilha **tão eficiente quanto** a `Stack`. Se a escolha fosse só desempenho, a `Stack` não precisaria existir.',
      },
      {
        kind: 'table',
        headers: ['Uso', '`List` imitando', '`Queue`/`Stack`'],
        rows: [
          ['fila (FIFO)', '**quadrático**', 'imediato'],
          ['pilha (LIFO)', 'imediato', 'imediato'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O que a `Stack` compra é **intenção e restrição**. Ela declara no tipo que aquilo é uma pilha, e torna impossível alguém acessar o meio por índice ou remover do começo — operações que quebrariam a lógica do algoritmo.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Escolher pela eficiência quando ela é igual é o erro de foco aqui. Entre duas opções igualmente rápidas, vence a que comunica melhor — e a que impede usos errados.',
      },
      {
        kind: 'text',
        body:
          'A regra que resume o capítulo: use a estrutura especializada quando ela for **mais rápida** ou quando ela for **mais clara**. Para filas, os dois motivos valem. Para pilhas, só o segundo — e ele já basta.',
      },
    ],
    quiz: [
      {
        id: 's03c07l06q1',
        type: 'single',
        prompt: 'Quantos deslocamentos custa `lista.RemoveAt(lista.Count - 1)`?',
        options: [
          { id: 'a', code: '0', correct: true },
          { id: 'b', code: 'Count - 1' },
          { id: 'c', code: 'Count' },
          { id: 'd', code: '1' },
        ],
        explanation:
          'Não há nenhum elemento depois do último para deslocar. É exatamente o oposto de `RemoveAt(0)`, que move tudo.',
      },
      {
        id: 's03c07l06q2',
        type: 'single',
        prompt: 'Se a `List` é igualmente eficiente para LIFO, por que usar `Stack`?',
        options: [
          { id: 'a', text: 'Porque ela declara a intenção e impede operações que quebrariam a lógica.', correct: true },
          { id: 'b', text: 'Porque ela é mais rápida.' },
          { id: 'c', text: 'Porque ela ocupa menos memória.' },
          { id: 'd', text: 'Porque a `List` não tem `RemoveAt`.' },
        ],
        explanation:
          'Um tipo que só oferece `Push`, `Pop` e `Peek` torna impossível alguém acessar o meio da pilha — um erro que uma `List` permitiria em silêncio.',
      },
      {
        id: 's03c07l06q3',
        type: 'single',
        prompt: 'Para qual uso a `List` tem custo quadrático?',
        options: [
          { id: 'a', text: 'Fila: remover repetidamente do começo.', correct: true },
          { id: 'b', text: 'Pilha: remover repetidamente do fim.' },
          { id: 'c', text: 'Percorrer todos os elementos.' },
          { id: 'd', text: 'Adicionar no fim.' },
        ],
        explanation:
          'Cada remoção do começo desloca o resto, e isso acontece uma vez por elemento. As outras três operações não deslocam nada.',
      },
    ],
    challenge: {
      brief:
        'Compare `Stack` e `List` no uso LIFO. Leia `n` valores, empilhe nas duas estruturas e esvazie as duas, confirmando que produzem a mesma ordem. Conte os deslocamentos da `List` usada como pilha e, para contraste, quantos ela faria se fosse usada como fila.',
      requirements: [
        'Linha 1: `Saida com Stack: 3 2 1`',
        'Linha 2: `Saida com List: 3 2 1`',
        'Linha 3: `Resultados iguais: True`',
        'Linha 4: `Deslocamentos como pilha: 0`',
        'Linha 5: `Deslocamentos como fila: d`, quantos custaria remover sempre do começo',
        'Na `List` usada como pilha, remova sempre de `Count - 1`',
        'Conte os deslocamentos com laços, não pela fórmula',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Stack<int> pilha = new Stack<int>();
        List<int> lista = new List<int>();

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());
            pilha.Push(valor);
            lista.Add(valor);
        }

        // Esvazie a pilha e a lista pelo fim, contando deslocamentos

        // Calcule tambem quanto custaria esvaziar pelo comeco
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
        List<int> lista = new List<int>();

        for (int i = 0; i < n; i++)
        {
            int valor = int.Parse(Console.ReadLine());
            pilha.Push(valor);
            lista.Add(valor);
        }

        int comoFila = 0;
        for (int restantes = n; restantes > 0; restantes--)
        {
            comoFila += restantes - 1;
        }

        string saidaPilha = "";
        while (pilha.Count > 0)
        {
            saidaPilha += $"{pilha.Pop()} ";
        }

        string saidaLista = "";
        int comoPilha = 0;
        while (lista.Count > 0)
        {
            saidaLista += $"{lista[lista.Count - 1]} ";
            comoPilha += lista.Count - 1 - (lista.Count - 1);
            lista.RemoveAt(lista.Count - 1);
        }

        Console.WriteLine($"Saida com Stack: {saidaPilha}");
        Console.WriteLine($"Saida com List: {saidaLista}");
        Console.WriteLine($"Resultados iguais: {saidaPilha == saidaLista}");
        Console.WriteLine($"Deslocamentos como pilha: {comoPilha}");
        Console.WriteLine($"Deslocamentos como fila: {comoFila}");
    }
}
`,
      hints: [
        'Na `List`, leia `lista[lista.Count - 1]` antes de remover: `RemoveAt` não devolve o valor.',
        'Remover a posição `Count - 1` desloca `Count - 1 - (Count - 1)` elementos, ou seja, zero — e é isso que o contador registra.',
      ],
      tests: [
        {
          name: 'Três valores',
          stdin: '3\n1\n2\n3\n',
          expectedStdout:
            'Saida com Stack: 3 2 1\nSaida com List: 3 2 1\nResultados iguais: True\n' +
            'Deslocamentos como pilha: 0\nDeslocamentos como fila: 3',
        },
        {
          name: 'Cinco valores',
          stdin: '5\n1\n2\n3\n4\n5\n',
          expectedStdout:
            'Saida com Stack: 5 4 3 2 1\nSaida com List: 5 4 3 2 1\nResultados iguais: True\n' +
            'Deslocamentos como pilha: 0\nDeslocamentos como fila: 10',
        },
        {
          name: 'Um valor só',
          stdin: '1\n7\n',
          expectedStdout:
            'Saida com Stack: 7\nSaida com List: 7\nResultados iguais: True\n' +
            'Deslocamentos como pilha: 0\nDeslocamentos como fila: 0',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c07l07',
    title: 'Memória contra velocidade',
    objective: 'Trocar memória por tempo guardando resultados já calculados, e medir quanto trabalho isso economiza.',
    concept: [
      {
        kind: 'text',
        body:
          'A troca fundamental de estruturas de dados é sempre a mesma: **gastar memória para ganhar tempo**. Um `Dictionary` ocupa mais que uma `List` e busca imediatamente; um índice de banco ocupa disco e acelera consultas.',
      },
      {
        kind: 'text',
        body:
          'A forma mais direta dessa troca é o **cache**: guardar o resultado de um cálculo caro para não repeti-lo. Se a mesma pergunta é feita duas vezes, a segunda sai de graça.',
      },
      {
        kind: 'code',
        code: `if (cache.TryGetValue(n, out int guardado))
{
    return guardado;          // reaproveita
}

int resultado = CalculoCaro(n);
cache[n] = resultado;         // guarda para a proxima
return resultado;`,
        caption: 'O padrão vale para qualquer cálculo determinístico e repetido.',
      },
      {
        kind: 'table',
        headers: ['Consultas', 'Valores distintos', 'Sem cache', 'Com cache'],
        rows: [
          ['`6`', '`3`', '6 cálculos', '3 cálculos'],
          ['`1.000`', '`10`', '1.000 cálculos', '10 cálculos'],
          ['`1.000`', '`1.000`', '1.000 cálculos', '1.000 cálculos'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A última linha da tabela é o caso em que o cache **não ajuda**: sem repetição não há o que reaproveitar, e ele vira só memória gasta. Cache só compensa quando as mesmas perguntas voltam.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O cache só é correto para cálculos **determinísticos**: a mesma entrada tem que produzir sempre a mesma saída. Guardar o resultado de algo que depende do relógio, de aleatoriedade ou de dados que mudam produz respostas obsoletas.',
      },
      {
        kind: 'text',
        body:
          'Aplicado a chamadas que se repetem dentro de um algoritmo, esse padrão tem nome próprio — memoização — e é o que transforma um Fibonacci recursivo inviável em instantâneo. A Seção 7 volta a ele com esse nome.',
      },
    ],
    quiz: [
      {
        id: 's03c07l07q1',
        type: 'single',
        prompt: 'Quando um cache **não** traz ganho?',
        options: [
          { id: 'a', text: 'Quando as consultas nunca se repetem.', correct: true },
          { id: 'b', text: 'Quando há muitas consultas.' },
          { id: 'c', text: 'Quando o cálculo é rápido de fazer.' },
          { id: 'd', text: 'Quando os valores são grandes.' },
        ],
        explanation:
          'Sem repetição, cada consulta é a primeira, e o cache só acumula entradas que nunca serão lidas. O ganho vem exclusivamente do reaproveitamento.',
      },
      {
        id: 's03c07l07q2',
        type: 'single',
        prompt: 'Com 6 consultas sobre 3 valores distintos, quantos cálculos o cache economiza?',
        options: [
          { id: 'a', code: '3', correct: true },
          { id: 'b', code: '6' },
          { id: 'c', code: '0' },
          { id: 'd', code: '2' },
        ],
        explanation:
          'São 3 cálculos reais e 3 reaproveitamentos. O número de cálculos com cache é sempre a quantidade de valores distintos.',
      },
      {
        id: 's03c07l07q3',
        type: 'single',
        prompt: 'Que propriedade o cálculo precisa ter para poder ser guardado em cache?',
        options: [
          { id: 'a', text: 'Ser determinístico: a mesma entrada sempre produz a mesma saída.', correct: true },
          { id: 'b', text: 'Ser rápido.' },
          { id: 'c', text: 'Devolver números.' },
          { id: 'd', text: 'Receber um único argumento.' },
        ],
        explanation:
          'Guardar o resultado de algo que muda com o tempo faz o programa responder com um valor obsoleto — e esse é o tipo de bug que só aparece em produção.',
      },
    ],
    challenge: {
      brief:
        'Meça o ganho de um cache. Leia `q` valores, possivelmente repetidos, e para cada um informe quantos divisores ele tem. Use um dicionário como cache e conte quantos cálculos foram realmente feitos.',
      requirements: [
        'Uma linha por consulta, no formato `12 -> 6 divisores`, na ordem lida',
        'Depois: `Calculos sem cache: q`, um por consulta',
        'Depois: `Calculos com cache: c`, um por valor distinto',
        'Depois: `Entradas no cache: e`',
        'Por último: `Reaproveitamentos: r`',
        'Os divisores incluem 1 e o próprio número',
        'Os valores da entrada são maiores ou iguais a 1',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int q = int.Parse(Console.ReadLine());

        Dictionary<int, int> cache = new Dictionary<int, int>();
        int calculos = 0;
        int reaproveitamentos = 0;

        // Consulte o cache antes de calcular

        Console.WriteLine($"Calculos sem cache: {q}");
        Console.WriteLine($"Calculos com cache: {calculos}");
        Console.WriteLine($"Entradas no cache: {cache.Count}");
        Console.WriteLine($"Reaproveitamentos: {reaproveitamentos}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int q = int.Parse(Console.ReadLine());

        Dictionary<int, int> cache = new Dictionary<int, int>();
        int calculos = 0;
        int reaproveitamentos = 0;

        for (int k = 0; k < q; k++)
        {
            int n = int.Parse(Console.ReadLine());

            int divisores;

            if (cache.TryGetValue(n, out int guardado))
            {
                divisores = guardado;
                reaproveitamentos++;
            }
            else
            {
                divisores = 0;

                for (int d = 1; d <= n; d++)
                {
                    if (n % d == 0)
                    {
                        divisores++;
                    }
                }

                cache[n] = divisores;
                calculos++;
            }

            Console.WriteLine($"{n} -> {divisores} divisores");
        }

        Console.WriteLine($"Calculos sem cache: {q}");
        Console.WriteLine($"Calculos com cache: {calculos}");
        Console.WriteLine($"Entradas no cache: {cache.Count}");
        Console.WriteLine($"Reaproveitamentos: {reaproveitamentos}");
    }
}
`,
      hints: [
        'A consulta ao cache vem **antes** do cálculo: só o ramo do `else` conta como cálculo realizado.',
        'O número de entradas no cache é sempre igual ao número de cálculos feitos.',
      ],
      tests: [
        {
          name: 'Consultas com repetição',
          stdin: '6\n12\n18\n12\n30\n18\n12\n',
          expectedStdout:
            '12 -> 6 divisores\n18 -> 6 divisores\n12 -> 6 divisores\n30 -> 8 divisores\n' +
            '18 -> 6 divisores\n12 -> 6 divisores\n' +
            'Calculos sem cache: 6\nCalculos com cache: 3\nEntradas no cache: 3\nReaproveitamentos: 3',
        },
        {
          name: 'Nenhuma repetição: o cache não ajuda',
          stdin: '3\n4\n9\n25\n',
          expectedStdout:
            '4 -> 3 divisores\n9 -> 3 divisores\n25 -> 3 divisores\n' +
            'Calculos sem cache: 3\nCalculos com cache: 3\nEntradas no cache: 3\nReaproveitamentos: 0',
        },
        {
          name: 'Sempre o mesmo valor: ganho máximo',
          stdin: '4\n6\n6\n6\n6\n',
          expectedStdout:
            '6 -> 4 divisores\n6 -> 4 divisores\n6 -> 4 divisores\n6 -> 4 divisores\n' +
            'Calculos sem cache: 4\nCalculos com cache: 1\nEntradas no cache: 1\nReaproveitamentos: 3',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c07l08',
    title: 'Refatorando com a estrutura certa',
    objective: 'Substituir um algoritmo quadrático por um linear trocando a estrutura de dados, sem mudar o resultado.',
    concept: [
      {
        kind: 'text',
        body:
          'Encontrar valores repetidos é o exemplo perfeito de refatoração por estrutura. A versão ingênua compara cada item com todos os anteriores; a versão certa usa um conjunto — e produz **exatamente** o mesmo resultado.',
      },
      {
        kind: 'compare',
        good: `foreach (int v in entrada)
{
    if (!vistos.Add(v))
    {
        // repetido
    }
}`,
        bad: `for (int i = 0; i < n; i++)
    for (int j = 0; j < i; j++)
        if (entrada[i] == entrada[j])
        {
            // repetido
        }`,
        goodLabel: 'Uma passada',
        badLabel: 'Laço aninhado',
      },
      {
        kind: 'table',
        headers: ['`n`', 'Comparações ingênuas', 'Operações com conjunto'],
        rows: [
          ['`100`', 'até 4.950', '100'],
          ['`1.000`', 'até 499.500', '1.000'],
          ['`10.000`', 'até ~50 milhões', '10.000'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'O ponto central: a refatoração **não muda o resultado**, só o custo. Quem lê a saída não percebe diferença nenhuma; quem roda com dez mil registros percebe muito.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O sinal de alerta a memorizar: um laço aninhado sobre a **mesma** coleção quase sempre pode virar uma passada com dicionário ou conjunto. Sempre que enxergar esse padrão, vale perguntar o que o laço interno está procurando — e se um conjunto não responderia direto.',
      },
      {
        kind: 'text',
        body:
          'A troca é a de sempre: o conjunto ocupa memória proporcional aos valores distintos. Trocar 50 milhões de comparações por 10 mil operações e alguns kilobytes é um negócio que quase nunca se recusa.',
      },
    ],
    quiz: [
      {
        id: 's03c07l08q1',
        type: 'single',
        prompt: 'O que muda ao trocar o laço aninhado por um `HashSet`?',
        options: [
          { id: 'a', text: 'Só o custo: o resultado é idêntico.', correct: true },
          { id: 'b', text: 'A ordem dos duplicados encontrados.' },
          { id: 'c', text: 'Quais valores são considerados duplicados.' },
          { id: 'd', text: 'Nada: as duas versões custam igual.' },
        ],
        explanation:
          'As duas percorrem os dados na mesma ordem e detectam a repetição no mesmo ponto. A diferença está inteiramente em quanto trabalho cada uma faz para chegar lá.',
      },
      {
        id: 's03c07l08q2',
        type: 'single',
        prompt: 'Qual padrão de código sugere que uma refatoração por estrutura é possível?',
        options: [
          { id: 'a', text: 'Um laço aninhado percorrendo a mesma coleção.', correct: true },
          { id: 'b', text: 'Um laço com `break`.' },
          { id: 'c', text: 'Um `foreach` sobre um dicionário.' },
          { id: 'd', text: 'Uma condição composta com `&&`.' },
        ],
        explanation:
          'O laço interno está respondendo a uma pergunta de pertinência ou de busca — exatamente o que conjunto e dicionário respondem sem percorrer.',
      },
      {
        id: 's03c07l08q3',
        type: 'single',
        prompt: 'Qual é o custo da refatoração?',
        options: [
          { id: 'a', text: 'Memória proporcional à quantidade de valores distintos.', correct: true },
          { id: 'b', text: 'Perda de precisão no resultado.' },
          { id: 'c', text: 'Código significativamente mais longo.' },
          { id: 'd', text: 'Nenhum: é vantagem pura.' },
        ],
        explanation:
          'O conjunto precisa guardar o que já viu. Em quase todo caso prático, essa memória é irrelevante perto do tempo economizado — mas ela existe.',
      },
    ],
    challenge: {
      brief:
        'Encontre os valores repetidos de uma sequência das duas formas e compare o trabalho. Leia `n` valores e reporte cada valor que aparece mais de uma vez, na ordem em que a repetição é detectada, contando as comparações da versão ingênua e as operações da versão com `HashSet`.',
      requirements: [
        'Linha 1: `Duplicados: 3 1`, cada valor repetido aparecendo **uma vez só**, na ordem da primeira detecção',
        'Linha 2: `Comparacoes ingenuas: c`',
        'Linha 3: `Operacoes com HashSet: o`',
        'A versão ingênua compara o item `i` com os anteriores, parando ao encontrar igual',
        'A versão com `HashSet` custa exatamente uma operação por valor lido',
        'Sem nenhuma repetição, a primeira linha sai apenas com o rótulo',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        int[] entrada = new int[n];
        for (int i = 0; i < n; i++)
        {
            entrada[i] = int.Parse(Console.ReadLine());
        }

        int comparacoes = 0;

        // Versao ingenua: laco aninhado, so para contar as comparacoes

        HashSet<int> vistos = new HashSet<int>();
        HashSet<int> reportados = new HashSet<int>();
        List<int> duplicados = new List<int>();
        int operacoes = 0;

        // Versao refatorada: uma passada com HashSet
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
        for (int i = 0; i < n; i++)
        {
            entrada[i] = int.Parse(Console.ReadLine());
        }

        int comparacoes = 0;

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                comparacoes++;

                if (entrada[i] == entrada[j])
                {
                    break;
                }
            }
        }

        HashSet<int> vistos = new HashSet<int>();
        HashSet<int> reportados = new HashSet<int>();
        List<int> duplicados = new List<int>();
        int operacoes = 0;

        foreach (int valor in entrada)
        {
            operacoes++;

            if (!vistos.Add(valor))
            {
                if (reportados.Add(valor))
                {
                    duplicados.Add(valor);
                }
            }
        }

        string texto = "";
        for (int i = 0; i < duplicados.Count; i++)
        {
            texto += $"{duplicados[i]} ";
        }

        Console.WriteLine($"Duplicados: {texto}");
        Console.WriteLine($"Comparacoes ingenuas: {comparacoes}");
        Console.WriteLine($"Operacoes com HashSet: {operacoes}");
    }
}
`,
      hints: [
        'O `break` da versão ingênua é o que faz um valor repetido custar menos comparações que um valor novo.',
        'São dois conjuntos na versão refatorada: um lembra o que já apareceu, o outro impede reportar o mesmo duplicado duas vezes.',
      ],
      tests: [
        {
          name: 'Repetições espalhadas',
          stdin: '7\n3\n1\n3\n4\n1\n5\n3\n',
          expectedStdout:
            'Duplicados: 3 1\nComparacoes ingenuas: 13\nOperacoes com HashSet: 7',
        },
        {
          name: 'Nenhuma repetição',
          stdin: '4\n1\n2\n3\n4\n',
          expectedStdout:
            'Duplicados:\nComparacoes ingenuas: 6\nOperacoes com HashSet: 4',
        },
        {
          name: 'Todos iguais',
          stdin: '4\n7\n7\n7\n7\n',
          expectedStdout:
            'Duplicados: 7\nComparacoes ingenuas: 3\nOperacoes com HashSet: 4',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c07l09',
    title: 'Prática: carrinho de compras',
    objective: 'Combinar catálogo, carrinho e validação em um sistema que só aceita operações consistentes.',
    concept: [
      {
        kind: 'text',
        body:
          'Um carrinho de compras usa **dois dicionários com papéis diferentes**: o catálogo, que é lido e nunca muda, e o carrinho, que é o estado que os comandos alteram.',
      },
      {
        kind: 'table',
        headers: ['Estrutura', 'Papel', 'Muda?'],
        rows: [
          ['`Dictionary<string,int> precos`', 'catálogo de produtos', 'não'],
          ['`Dictionary<string,int> carrinho`', 'quantidade por produto', 'sim'],
        ],
      },
      {
        kind: 'text',
        body:
          'A validação tem duas camadas, e a ordem entre elas importa. Primeiro: **o produto existe no catálogo?** Só depois: **a operação faz sentido para o estado atual do carrinho?**',
      },
      {
        kind: 'code',
        code: `if (!precos.ContainsKey(produto))
{
    rejeitados++;              // nem existe
}
else if (verbo == "remove"
    && (!carrinho.TryGetValue(produto, out int atual)
        || atual < quantidade))
{
    rejeitados++;              // existe, mas nao ha quanto tirar
}`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Diferente do controle de estoque, aqui um item que chega a quantidade zero é **removido** do carrinho. A diferença é de domínio: um produto esgotado continua cadastrado, mas um item que você tirou do carrinho simplesmente não está mais lá.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O subtotal de cada item é quantidade vezes preço, e o total é a soma dos subtotais. Somar as quantidades e multiplicar pelo preço de um produto qualquer é um erro que só aparece quando há mais de um produto no carrinho.',
      },
      {
        kind: 'text',
        body:
          'O relatório sai ordenado por nome de produto, o que exige a mesma técnica de sempre: copiar as chaves para uma `List` e ordená-la antes de percorrer.',
      },
    ],
    quiz: [
      {
        id: 's03c07l09q1',
        type: 'single',
        prompt: 'Por que checar o catálogo antes de checar o carrinho?',
        options: [
          { id: 'a', text: 'Porque um produto inexistente não pode ser adicionado nem removido, seja qual for o estado do carrinho.', correct: true },
          { id: 'b', text: 'Porque o catálogo é maior.' },
          { id: 'c', text: 'Porque o carrinho pode estar vazio.' },
          { id: 'd', text: 'A ordem é indiferente.' },
        ],
        explanation:
          'É a validação mais geral, e ela dispensa qualquer outra. Testar o carrinho primeiro faria um produto inexistente ser rejeitado pelo motivo errado.',
      },
      {
        id: 's03c07l09q2',
        type: 'single',
        prompt: 'O que acontece quando a quantidade de um item chega a zero?',
        options: [
          { id: 'a', text: 'O item sai do carrinho.', correct: true },
          { id: 'b', text: 'Ele permanece com quantidade zero.' },
          { id: 'c', text: 'O carrinho inteiro é limpo.' },
          { id: 'd', text: 'A operação é rejeitada.' },
        ],
        explanation:
          'Um carrinho lista o que você vai levar. Zero unidades de um produto significa que ele não está no carrinho — diferente de um estoque, em que o produto cadastrado continua existindo.',
      },
      {
        id: 's03c07l09q3',
        type: 'single',
        prompt: 'Como se calcula o total do carrinho?',
        options: [
          { id: 'a', text: 'Somando, para cada produto, a quantidade vezes o preço dele.', correct: true },
          { id: 'b', text: 'Somando as quantidades e multiplicando pelo preço médio.' },
          { id: 'c', text: 'Somando os preços do catálogo.' },
          { id: 'd', text: 'Multiplicando o total de itens pelo maior preço.' },
        ],
        explanation:
          'Cada produto tem o seu preço, então o subtotal precisa ser calculado por produto. As alternativas só dariam o mesmo resultado se todos os preços fossem iguais.',
      },
    ],
    challenge: {
      brief:
        'Implemente um carrinho de compras. Leia `n` produtos do catálogo, cada um em duas linhas com nome e preço, e depois comandos até a palavra `fim`. `add <produto> <qtd>` acrescenta ao carrinho e `remove <produto> <qtd>` retira. Produza o extrato ordenado por nome de produto.',
      requirements: [
        'Uma linha por produto no carrinho, no formato `Teclado: 3 x 150 = 450`, em ordem alfabética',
        'Depois: `Itens distintos: d`',
        'Depois: `Quantidade total: q`',
        'Depois: `Total: t`',
        'Depois: `Aceitos: a`',
        'Por último: `Rejeitados: r`',
        'A quantidade precisa ser um inteiro **maior que zero**',
        'Produtos fora do catálogo são rejeitados',
        'Um `remove` de produto ausente no carrinho, ou em quantidade maior que a existente, é rejeitado',
        'Um item que chega a quantidade zero sai do carrinho',
        'Linhas que não têm exatamente três partes são rejeitadas',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, int> precos = new Dictionary<string, int>();
        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            precos[nome] = int.Parse(Console.ReadLine());
        }

        Dictionary<string, int> carrinho = new Dictionary<string, int>();
        int aceitos = 0;
        int rejeitados = 0;

        string linha = Console.ReadLine();

        // Valide o formato, o catalogo, e so entao o estado do carrinho

        // Extrato ordenado por nome de produto
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

        Dictionary<string, int> precos = new Dictionary<string, int>();
        for (int i = 0; i < n; i++)
        {
            string nome = Console.ReadLine();
            precos[nome] = int.Parse(Console.ReadLine());
        }

        Dictionary<string, int> carrinho = new Dictionary<string, int>();
        int aceitos = 0;
        int rejeitados = 0;

        string linha = Console.ReadLine();

        while (linha != "fim")
        {
            string[] partes = linha.Split(' ');

            if (partes.Length != 3)
            {
                rejeitados++;
                linha = Console.ReadLine();
                continue;
            }

            string verbo = partes[0];
            string produto = partes[1];

            if (!int.TryParse(partes[2], out int quantidade) || quantidade <= 0)
            {
                rejeitados++;
                linha = Console.ReadLine();
                continue;
            }

            if (!precos.ContainsKey(produto))
            {
                rejeitados++;
            }
            else if (verbo == "add")
            {
                if (carrinho.TryGetValue(produto, out int atual))
                {
                    carrinho[produto] = atual + quantidade;
                }
                else
                {
                    carrinho[produto] = quantidade;
                }

                aceitos++;
            }
            else if (verbo == "remove"
                && carrinho.TryGetValue(produto, out int disponivel)
                && disponivel >= quantidade)
            {
                if (disponivel == quantidade)
                {
                    carrinho.Remove(produto);
                }
                else
                {
                    carrinho[produto] = disponivel - quantidade;
                }

                aceitos++;
            }
            else
            {
                rejeitados++;
            }

            linha = Console.ReadLine();
        }

        List<string> nomes = new List<string>(carrinho.Keys);
        nomes.Sort();

        int quantidadeTotal = 0;
        int total = 0;

        foreach (string nome in nomes)
        {
            int quantidade = carrinho[nome];
            int preco = precos[nome];
            int subtotal = quantidade * preco;

            Console.WriteLine($"{nome}: {quantidade} x {preco} = {subtotal}");

            quantidadeTotal += quantidade;
            total += subtotal;
        }

        Console.WriteLine($"Itens distintos: {carrinho.Count}");
        Console.WriteLine($"Quantidade total: {quantidadeTotal}");
        Console.WriteLine($"Total: {total}");
        Console.WriteLine($"Aceitos: {aceitos}");
        Console.WriteLine($"Rejeitados: {rejeitados}");
    }
}
`,
      hints: [
        'A checagem do catálogo é um `if` isolado antes dos ramos de `add` e `remove`: ela vale para os dois.',
        'No `remove`, compare `disponivel` com `quantidade` para decidir entre remover a entrada e apenas reduzi-la.',
      ],
      tests: [
        {
          name: 'Adições, remoção total e rejeições',
          stdin: '3\nTeclado\n150\nMouse\n80\nMonitor\n500\nadd Teclado 2\nadd Mouse 1\nadd Teclado 1\nremove Mouse 1\nadd Fone 1\nremove Teclado 5\nfim\n',
          expectedStdout:
            'Teclado: 3 x 150 = 450\nItens distintos: 1\nQuantidade total: 3\nTotal: 450\n' +
            'Aceitos: 4\nRejeitados: 2',
        },
        {
          name: 'Extrato ordenado por nome',
          stdin: '2\nZeta\n10\nAlfa\n20\nadd Zeta 1\nadd Alfa 2\nfim\n',
          expectedStdout:
            'Alfa: 2 x 20 = 40\nZeta: 1 x 10 = 10\nItens distintos: 2\nQuantidade total: 3\nTotal: 50\n' +
            'Aceitos: 2\nRejeitados: 0',
        },
        {
          name: 'Remover de carrinho vazio é rejeitado',
          stdin: '1\nItem\n10\nremove Item 1\nfim\n',
          expectedStdout:
            'Itens distintos: 0\nQuantidade total: 0\nTotal: 0\nAceitos: 0\nRejeitados: 1',
        },
        {
          name: 'Quantidade não positiva e linha malformada',
          stdin: '1\nItem\n10\nadd Item 0\nadd Item\nadd Item 2\nfim\n',
          expectedStdout:
            'Item: 2 x 10 = 20\nItens distintos: 1\nQuantidade total: 2\nTotal: 20\n' +
            'Aceitos: 1\nRejeitados: 2',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's03c07l10',
    title: 'Boss: agenda de contatos',
    objective: 'Integrar toda a Seção 3 em um sistema com dicionários aninhados, listas ordenadas e conjuntos de unicidade.',
    concept: [
      {
        kind: 'text',
        body:
          'Este é o desafio final da Seção 3. Ele usa **quatro** estruturas ao mesmo tempo, e cada uma foi escolhida por um motivo diferente — reconhecer esses motivos é o exercício.',
      },
      {
        kind: 'table',
        headers: ['Estrutura', 'Guarda', 'Escolhida porque'],
        rows: [
          ['`Dictionary<string, List<string>>`', 'telefones por contato', 'vários valores por chave, com ordem'],
          ['`Dictionary<string, HashSet<string>>`', 'grupos por contato', 'vários valores por chave, sem repetir'],
          ['`HashSet<string>`', 'todos os grupos existentes', 'só a contagem de distintos importa'],
          ['`List<string>` de chaves', 'ordem do relatório', 'o dicionário não tem ordem'],
        ],
      },
      {
        kind: 'text',
        body:
          'A diferença entre `List` e `HashSet` como valor é deliberada. Telefones têm **ordem** — o primeiro cadastrado é o principal — e a unicidade é verificada na mão. Grupos não têm ordem e a unicidade é a regra, então o conjunto resolve as duas coisas.',
      },
      {
        kind: 'code',
        code: `// telefone: ordem importa, unicidade na mao
if (telefones[nome].Contains(numero))
{
    rejeitados++;
}
else
{
    telefones[nome].Add(numero);
}

// grupo: o proprio Add decide
if (!grupos[nome].Add(grupo))
{
    rejeitados++;
}`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Um `grupo` para um contato que não existe precisa ser rejeitado. Sem essa checagem, o comando criaria um contato sem telefone nenhum, e o relatório passaria a listar gente que nunca foi cadastrada.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Repare que os telefones saem na ordem de cadastro e os grupos em ordem alfabética. Nos dois casos a ordem é uma decisão de projeto, e não um acidente: uma vem da `List`, a outra é produzida explicitamente antes de imprimir.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Monte em quatro etapas, rodando os testes a cada uma: primeiro o `add` com deduplicação de telefone; depois o `grupo`; depois o `buscar`; e por último o relatório ordenado. Quatro estruturas de uma vez é mais estado do que se depura de cabeça.',
      },
    ],
    quiz: [
      {
        id: 's03c07l10q1',
        type: 'single',
        prompt: 'Por que os telefones usam `List` e os grupos usam `HashSet`?',
        options: [
          { id: 'a', text: 'Telefones têm ordem de cadastro; grupos não têm ordem e não podem repetir.', correct: true },
          { id: 'b', text: 'Porque telefones são números e grupos são texto.' },
          { id: 'c', text: 'Porque um contato tem mais telefones que grupos.' },
          { id: 'd', text: 'É indiferente: os dois funcionariam igual.' },
        ],
        explanation:
          'A escolha reflete o que cada coleção precisa garantir. Trocar as duas faria os telefones perderem a ordem e os grupos aceitarem duplicatas.',
      },
      {
        id: 's03c07l10q2',
        type: 'single',
        prompt: 'O que deve acontecer com `grupo Fantasma trabalho` quando `Fantasma` não existe?',
        options: [
          { id: 'a', text: 'Ser rejeitado, sem criar o contato.', correct: true },
          { id: 'b', text: 'Criar o contato sem telefones.' },
          { id: 'c', text: 'Criar o contato com telefone vazio.' },
          { id: 'd', text: 'Encerrar o programa com erro.' },
        ],
        explanation:
          'Um contato nasce de um `add` com telefone. Deixar o `grupo` criá-lo produziria entradas fantasma no relatório final — literalmente.',
      },
      {
        id: 's03c07l10q3',
        type: 'single',
        prompt: 'Por que a lista de contatos do relatório precisa ser ordenada explicitamente?',
        options: [
          { id: 'a', text: 'Porque a ordem de enumeração de um dicionário não é garantida.', correct: true },
          { id: 'b', text: 'Porque os contatos foram cadastrados fora de ordem.' },
          { id: 'c', text: 'Porque `List` não mantém ordem.' },
          { id: 'd', text: 'Não precisa: o dicionário já sai ordenado.' },
        ],
        explanation:
          'É a mesma regra do capítulo 3: uma saída determinística nunca pode depender da ordem de enumeração de dicionário ou conjunto.',
      },
    ],
    challenge: {
      brief:
        'Implemente uma agenda de contatos. Leia comandos até a palavra `fim`. `add <nome> <telefone>` cadastra um telefone para o contato, criando-o se necessário; `grupo <nome> <grupo>` associa um contato existente a um grupo; `buscar <nome>` mostra os telefones e grupos do contato. Ao final, gere o relatório completo.',
      requirements: [
        'Um `buscar` de contato existente imprime `Ana: 111 333 | grupos: familia trabalho`, com os telefones na ordem de cadastro e os grupos em ordem alfabética',
        'Um `buscar` de contato inexistente imprime `Carlos: nao encontrado`',
        'Depois dos comandos, uma linha por contato em ordem alfabética: `Ana -> telefones: 2, grupos: 2`',
        'Depois: `Contatos: c`, `Telefones: t` somando todos, `Grupos distintos: g` contando os grupos diferentes de toda a agenda',
        'Depois: `Aceitos: a`, contando apenas `add` e `grupo` bem-sucedidos',
        'Por último: `Rejeitados: r`',
        'Um telefone já cadastrado para o mesmo contato é rejeitado',
        'Um grupo já associado ao mesmo contato é rejeitado',
        'Um `grupo` para contato inexistente é rejeitado e não cria o contato',
        'Linhas que não têm exatamente três partes, ou duas no caso do `buscar`, são rejeitadas',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Dictionary<string, List<string>> telefones =
            new Dictionary<string, List<string>>();
        Dictionary<string, HashSet<string>> grupos =
            new Dictionary<string, HashSet<string>>();
        HashSet<string> todosGrupos = new HashSet<string>();

        int aceitos = 0;
        int rejeitados = 0;

        string linha = Console.ReadLine();

        // add cria ou acrescenta; grupo exige contato existente; buscar consulta

        // Relatorio ordenado por nome de contato
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Dictionary<string, List<string>> telefones =
            new Dictionary<string, List<string>>();
        Dictionary<string, HashSet<string>> grupos =
            new Dictionary<string, HashSet<string>>();
        HashSet<string> todosGrupos = new HashSet<string>();

        int aceitos = 0;
        int rejeitados = 0;

        string linha = Console.ReadLine();

        while (linha != "fim")
        {
            string[] partes = linha.Split(' ');

            if (partes.Length == 3 && partes[0] == "add")
            {
                string nome = partes[1];
                string numero = partes[2];

                if (!telefones.TryGetValue(nome, out List<string> lista))
                {
                    lista = new List<string>();
                    telefones[nome] = lista;
                }

                if (lista.Contains(numero))
                {
                    rejeitados++;
                }
                else
                {
                    lista.Add(numero);
                    aceitos++;
                }
            }
            else if (partes.Length == 3 && partes[0] == "grupo")
            {
                string nome = partes[1];
                string grupo = partes[2];

                if (!telefones.ContainsKey(nome))
                {
                    rejeitados++;
                }
                else
                {
                    if (!grupos.TryGetValue(nome, out HashSet<string> conjunto))
                    {
                        conjunto = new HashSet<string>();
                        grupos[nome] = conjunto;
                    }

                    if (conjunto.Add(grupo))
                    {
                        todosGrupos.Add(grupo);
                        aceitos++;
                    }
                    else
                    {
                        rejeitados++;
                    }
                }
            }
            else if (partes.Length == 2 && partes[0] == "buscar")
            {
                string nome = partes[1];

                if (telefones.TryGetValue(nome, out List<string> lista))
                {
                    string numeros = "";
                    for (int i = 0; i < lista.Count; i++)
                    {
                        numeros += $"{lista[i]} ";
                    }

                    List<string> ordenados = new List<string>();
                    if (grupos.TryGetValue(nome, out HashSet<string> conjunto))
                    {
                        ordenados = new List<string>(conjunto);
                        ordenados.Sort();
                    }

                    string textoGrupos = "";
                    for (int i = 0; i < ordenados.Count; i++)
                    {
                        textoGrupos += $"{ordenados[i]} ";
                    }

                    Console.WriteLine($"{nome}: {numeros}| grupos: {textoGrupos}");
                }
                else
                {
                    Console.WriteLine($"{nome}: nao encontrado");
                }
            }
            else
            {
                rejeitados++;
            }

            linha = Console.ReadLine();
        }

        List<string> nomes = new List<string>(telefones.Keys);
        nomes.Sort();

        int totalTelefones = 0;

        foreach (string nome in nomes)
        {
            int quantosGrupos = 0;
            if (grupos.TryGetValue(nome, out HashSet<string> conjunto))
            {
                quantosGrupos = conjunto.Count;
            }

            Console.WriteLine($"{nome} -> telefones: {telefones[nome].Count}, grupos: {quantosGrupos}");
            totalTelefones += telefones[nome].Count;
        }

        Console.WriteLine($"Contatos: {telefones.Count}");
        Console.WriteLine($"Telefones: {totalTelefones}");
        Console.WriteLine($"Grupos distintos: {todosGrupos.Count}");
        Console.WriteLine($"Aceitos: {aceitos}");
        Console.WriteLine($"Rejeitados: {rejeitados}");
    }
}
`,
      hints: [
        'O padrão "pegue ou crie" aparece duas vezes: uma para a `List` de telefones, outra para o `HashSet` de grupos.',
        'No `buscar`, os telefones saem na ordem da lista, mas os grupos precisam ser copiados para uma `List` e ordenados antes.',
        'O `todosGrupos` só recebe o grupo quando a associação é aceita: um grupo repetido para o mesmo contato não muda a contagem geral.',
      ],
      tests: [
        {
          name: 'Agenda com buscas e rejeições',
          stdin: 'add Ana 111\nadd Bruno 222\nadd Ana 333\nadd Ana 111\ngrupo Ana trabalho\ngrupo Ana familia\ngrupo Bruno trabalho\nbuscar Ana\nbuscar Carlos\nxyz\nfim\n',
          expectedStdout:
            'Ana: 111 333 | grupos: familia trabalho\nCarlos: nao encontrado\n' +
            'Ana -> telefones: 2, grupos: 2\nBruno -> telefones: 1, grupos: 1\n' +
            'Contatos: 2\nTelefones: 3\nGrupos distintos: 2\nAceitos: 6\nRejeitados: 2',
        },
        {
          name: 'Contato sem grupos',
          stdin: 'add Solo 999\nbuscar Solo\nfim\n',
          expectedStdout:
            'Solo: 999 | grupos:\nSolo -> telefones: 1, grupos: 0\n' +
            'Contatos: 1\nTelefones: 1\nGrupos distintos: 0\nAceitos: 1\nRejeitados: 0',
        },
        {
          name: 'Mesmo grupo em contatos diferentes conta uma vez',
          stdin: 'add A 1\nadd B 2\ngrupo A time\ngrupo B time\nfim\n',
          expectedStdout:
            'A -> telefones: 1, grupos: 1\nB -> telefones: 1, grupos: 1\n' +
            'Contatos: 2\nTelefones: 2\nGrupos distintos: 1\nAceitos: 4\nRejeitados: 0',
        },
        {
          name: 'Grupo para contato inexistente não cria nada',
          stdin: 'grupo Fantasma x\nfim\n',
          expectedStdout:
            'Contatos: 0\nTelefones: 0\nGrupos distintos: 0\nAceitos: 0\nRejeitados: 1',
          hidden: true,
        },
      ],
    },
  },
]
