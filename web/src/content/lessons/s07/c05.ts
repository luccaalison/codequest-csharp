import type { Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 's07c05l01',
    title: 'Contagem de caracteres',
    objective: 'Usar um array de contagem para responder perguntas sobre texto em tempo linear.',
    concept: [
      {
        kind: 'text',
        body:
          'Muitos problemas de texto se resolvem com uma **tabela de frequência**: um array em que cada posição conta quantas vezes um caractere apareceu.',
      },
      {
        kind: 'code',
        code: `int[] contagem = new int[26];

foreach (char c in texto)
{
    if (c >= 'a' && c <= 'z') contagem[c - 'a']++;
}`,
        caption: 'O truque é `c - \'a\'`: a subtração de caracteres devolve a distância entre eles no alfabeto.',
      },
      {
        kind: 'table',
        headers: ['Estrutura', 'Quando', 'Custo'],
        rows: [
          ['`int[26]`', 'apenas letras minúsculas', '`O(1)` de espaço'],
          ['`int[128]`', 'ASCII completo', '`O(1)` de espaço'],
          ['`Dictionary<char,int>`', 'Unicode, alfabeto desconhecido', '`O(k)` de espaço'],
        ],
      },
      {
        kind: 'text',
        body:
          'O array fixo é preferível quando o alfabeto é conhecido: ele é mais rápido, não aloca por chave, e o índice é calculado diretamente em vez de passar por espalhamento.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Com a tabela pronta, várias perguntas viram uma passagem sobre 26 posições: qual o caractere mais frequente, quais aparecem uma vez só, quantos são distintos. O custo é `O(n + 26)`, ou seja, `O(n)`.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Em C#, um `char` é uma unidade UTF-16. Caracteres fora do plano básico — emojis, por exemplo — ocupam **dois** `char`, e percorrer por `char` os quebra ao meio. Para texto restrito ao alfabeto latino isso não aparece.',
      },
    ],
    quiz: [
      {
        id: 's07c05l01q1',
        type: 'single',
        prompt: 'O que `c - \'a\'` produz?',
        options: [
          { id: 'a', text: 'A distância do caractere até a letra `a`, servindo como índice.', correct: true },
          { id: 'b', text: 'O código ASCII do caractere.' },
          { id: 'c', text: 'A letra minúscula correspondente.' },
          { id: 'd', text: 'Um erro de compilação.' },
        ],
        explanation:
          'Caracteres são números por baixo, então a subtração dá a posição relativa no alfabeto.',
      },
      {
        id: 's07c05l01q2',
        type: 'single',
        prompt: 'Quando preferir `int[26]` a `Dictionary<char,int>`?',
        options: [
          { id: 'a', text: 'Quando o alfabeto é conhecido e restrito.', correct: true },
          { id: 'b', text: 'Quando o texto é muito longo.' },
          { id: 'c', text: 'Quando há muitos caracteres distintos.' },
          { id: 'd', text: 'Sempre.' },
        ],
        explanation:
          'O array é mais rápido e não aloca por chave, mas só funciona se você souber quais caracteres esperar.',
      },
      {
        id: 's07c05l01q3',
        type: 'single',
        prompt: 'O que um `char` representa em C#?',
        options: [
          { id: 'a', text: 'Uma unidade UTF-16, o que pode partir caracteres fora do plano básico.', correct: true },
          { id: 'b', text: 'Sempre um caractere completo.' },
          { id: 'c', text: 'Um byte.' },
          { id: 'd', text: 'Um ponto de código Unicode completo.' },
        ],
        explanation:
          'Emojis e alguns símbolos ocupam dois `char`, e percorrer por `char` os quebra ao meio.',
      },
    ],
    challenge: {
      brief:
        'Construa uma tabela de frequência e responda cinco perguntas sobre o texto em tempo linear.',
      requirements: [
        'Complexidade esperada: `O(n)` de tempo, `O(1)` de espaço',
        '`Contar(string texto)` devolve um `int[26]` com a frequência de cada letra minúscula, ignorando o resto',
        '`MaisFrequente(int[] contagem)` devolve a letra mais frequente, ou `-` se nenhuma apareceu; empates ficam com a primeira do alfabeto',
        '`Distintas(int[] contagem)` conta quantas letras diferentes apareceram',
        '`UnicasEmOrdem(int[] contagem)` devolve as letras que aparecem exatamente uma vez, em ordem alfabética, ou `nenhuma`',
        '`TodasAsLetras(int[] contagem)` diz se todas as 26 letras apareceram ao menos uma vez',
        'Nenhum método percorre o texto mais de uma vez',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Text;

class Program
{
    // Escreva Contar, MaisFrequente, Distintas,
    // UnicasEmOrdem e TodasAsLetras aqui

    static void Main()
    {
        string texto = Console.ReadLine();

        int[] contagem = Contar(texto);

        Console.WriteLine($"mais frequente: {MaisFrequente(contagem)}");
        Console.WriteLine($"distintas: {Distintas(contagem)}");
        Console.WriteLine($"unicas: {UnicasEmOrdem(contagem)}");
        Console.WriteLine($"pangrama: {TodasAsLetras(contagem)}");

        int[] vazio = Contar("");
        Console.WriteLine($"vazio mais frequente: {MaisFrequente(vazio)}");
        Console.WriteLine($"vazio distintas: {Distintas(vazio)}");
        Console.WriteLine($"vazio unicas: {UnicasEmOrdem(vazio)}");

        int[] pangrama = Contar("abcdefghijklmnopqrstuvwxyz");
        Console.WriteLine($"pangrama real: {TodasAsLetras(pangrama)}");
        Console.WriteLine($"pangrama unicas: {UnicasEmOrdem(pangrama).Length}");
    }
}
`,
      solution: `using System;
using System.Text;

class Program
{
    static int[] Contar(string texto)
    {
        int[] contagem = new int[26];

        foreach (char c in texto)
        {
            if (c >= 'a' && c <= 'z')
            {
                contagem[c - 'a']++;
            }
        }

        return contagem;
    }

    static char MaisFrequente(int[] contagem)
    {
        int melhor = -1;
        int indice = -1;

        for (int i = 0; i < contagem.Length; i++)
        {
            if (contagem[i] > melhor)
            {
                melhor = contagem[i];
                indice = i;
            }
        }

        if (melhor <= 0)
        {
            return '-';
        }

        return (char)('a' + indice);
    }

    static int Distintas(int[] contagem)
    {
        int total = 0;

        foreach (int quantidade in contagem)
        {
            if (quantidade > 0)
            {
                total++;
            }
        }

        return total;
    }

    static string UnicasEmOrdem(int[] contagem)
    {
        StringBuilder saida = new StringBuilder();

        for (int i = 0; i < contagem.Length; i++)
        {
            if (contagem[i] == 1)
            {
                saida.Append((char)('a' + i));
            }
        }

        if (saida.Length == 0)
        {
            return "nenhuma";
        }

        return saida.ToString();
    }

    static bool TodasAsLetras(int[] contagem)
    {
        foreach (int quantidade in contagem)
        {
            if (quantidade == 0)
            {
                return false;
            }
        }

        return true;
    }

    static void Main()
    {
        string texto = Console.ReadLine();

        int[] contagem = Contar(texto);

        Console.WriteLine($"mais frequente: {MaisFrequente(contagem)}");
        Console.WriteLine($"distintas: {Distintas(contagem)}");
        Console.WriteLine($"unicas: {UnicasEmOrdem(contagem)}");
        Console.WriteLine($"pangrama: {TodasAsLetras(contagem)}");

        int[] vazio = Contar("");
        Console.WriteLine($"vazio mais frequente: {MaisFrequente(vazio)}");
        Console.WriteLine($"vazio distintas: {Distintas(vazio)}");
        Console.WriteLine($"vazio unicas: {UnicasEmOrdem(vazio)}");

        int[] pangrama = Contar("abcdefghijklmnopqrstuvwxyz");
        Console.WriteLine($"pangrama real: {TodasAsLetras(pangrama)}");
        Console.WriteLine($"pangrama unicas: {UnicasEmOrdem(pangrama).Length}");
    }
}
`,
      hints: [
        '`(char)(\'a\' + indice)` faz o caminho inverso: de índice para letra.',
        'Use `>` estrito em `MaisFrequente` para que empates fiquem com a primeira letra do alfabeto.',
        'O `StringBuilder` evita concatenar strings dentro do laço, o que seria `O(n²)`.',
      ],
      tests: [
        {
          name: 'Frase comum',
          stdin: 'programacao em csharp\n',
          expectedStdout:
            'mais frequente: a\ndistintas: 10\nunicas: eghs\npangrama: False\n' +
            'vazio mais frequente: -\nvazio distintas: 0\nvazio unicas: nenhuma\n' +
            'pangrama real: True\npangrama unicas: 26',
        },
        {
          name: 'Texto curto',
          stdin: 'abc\n',
          expectedStdout:
            'mais frequente: a\ndistintas: 3\nunicas: abc\npangrama: False\n' +
            'vazio mais frequente: -\nvazio distintas: 0\nvazio unicas: nenhuma\n' +
            'pangrama real: True\npangrama unicas: 26',
          hidden: true,
        },
      ],
    },
  },
  {
    id: 's07c05l02',
    title: 'Anagramas',
    objective: 'Decidir se dois textos usam exatamente as mesmas letras, e agrupar palavras equivalentes.',
    concept: [
      {
        kind: 'text',
        body:
          'Duas palavras são **anagramas** quando usam as mesmas letras nas mesmas quantidades. Existem duas soluções clássicas, com custos diferentes.',
      },
      {
        kind: 'table',
        headers: ['Abordagem', 'Custo', 'Vantagem'],
        rows: [
          ['ordenar as duas e comparar', '`O(n log n)`', 'simples, funciona com qualquer alfabeto'],
          ['**tabela de contagem**', '**`O(n)`**', 'mais rápida, alfabeto conhecido'],
        ],
      },
      {
        kind: 'code',
        code: `// contagem: incrementa pelo primeiro, decrementa pelo segundo
int[] contagem = new int[26];

foreach (char c in a) contagem[c - 'a']++;
foreach (char c in b) contagem[c - 'a']--;

// se sobrou qualquer diferente de zero, nao sao anagramas
foreach (int v in contagem) if (v != 0) return false;`,
        caption: 'Uma única tabela, incrementando por um lado e decrementando pelo outro.',
      },
      {
        kind: 'text',
        body:
          'Para **agrupar** anagramas, a chave ordenada funciona muito bem: `ordenar("amor")` e `ordenar("roma")` dão a mesma string, que serve de chave em um dicionário.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A chave ordenada transforma o problema de agrupamento em uma única passagem com dicionário: `O(n × m log m)` para `n` palavras de comprimento `m` — muito melhor que comparar todos os pares.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A verificação de comprimento diferente deve vir primeiro. Sem ela, `"aab"` e `"aabb"` passariam pela tabela com uma diferença que existe, mas o atalho evita percorrer os dois textos à toa.',
      },
    ],
    quiz: [
      {
        id: 's07c05l02q1',
        type: 'single',
        prompt: 'Qual é o custo da verificação por tabela de contagem?',
        options: [
          { id: 'a', code: 'O(n)', correct: true },
          { id: 'b', code: 'O(n log n)' },
          { id: 'c', code: 'O(n²)' },
          { id: 'd', code: 'O(1)' },
        ],
        explanation:
          'Uma passagem por cada texto mais uma passagem fixa de 26 posições.',
      },
      {
        id: 's07c05l02q2',
        type: 'single',
        prompt: 'Como agrupar anagramas eficientemente?',
        options: [
          { id: 'a', text: 'Usando a palavra com as letras ordenadas como chave de um dicionário.', correct: true },
          { id: 'b', text: 'Comparando todos os pares.' },
          { id: 'c', text: 'Ordenando a lista de palavras.' },
          { id: 'd', text: 'Contando o comprimento de cada uma.' },
        ],
        explanation:
          'Anagramas produzem exatamente a mesma chave ordenada, então uma passagem agrupa tudo.',
      },
      {
        id: 's07c05l02q3',
        type: 'single',
        prompt: 'Por que verificar o comprimento primeiro?',
        options: [
          { id: 'a', text: 'Porque é um atalho barato que evita percorrer os dois textos.', correct: true },
          { id: 'b', text: 'Porque a tabela falharia sem isso.' },
          { id: 'c', text: 'Porque o índice ficaria inválido.' },
          { id: 'd', text: 'Não é necessário.' },
        ],
        explanation:
          'A tabela detectaria a diferença de qualquer forma, mas comprimentos diferentes já respondem em `O(1)`.',
      },
    ],
    challenge: {
      brief:
        'Implemente as duas verificações de anagrama e um agrupador que junta palavras equivalentes.',
      requirements: [
        'Complexidade esperada de `SaoAnagramasPorContagem`: `O(n)`',
        'Complexidade esperada de `SaoAnagramasPorOrdenacao`: `O(n log n)`',
        '`SaoAnagramasPorContagem(string a, string b)` usa uma única tabela de 26 posições',
        '`SaoAnagramasPorOrdenacao(string a, string b)` ordena os caracteres e compara',
        '`ChaveOrdenada(string palavra)` devolve a palavra com as letras em ordem',
        '`Agrupar(string[] palavras)` devolve os grupos separados por `|`, com as palavras de cada grupo separadas por espaço',
        'Os grupos saem na ordem em que a primeira palavra de cada um apareceu',
        'As duas verificações concordam em todos os casos',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Escreva SaoAnagramasPorContagem, SaoAnagramasPorOrdenacao,
    // ChaveOrdenada e Agrupar aqui

    static void Main()
    {
        string[,] pares =
        {
            { "amor", "roma" },
            { "listen", "silent" },
            { "casa", "saco" },
            { "abc", "abcd" },
            { "", "" },
        };

        for (int i = 0; i < pares.GetLength(0); i++)
        {
            string a = pares[i, 0];
            string b = pares[i, 1];

            bool porContagem = SaoAnagramasPorContagem(a, b);
            bool porOrdenacao = SaoAnagramasPorOrdenacao(a, b);

            Console.WriteLine($"'{a}' e '{b}': contagem={porContagem} ordenacao={porOrdenacao} concordam={porContagem == porOrdenacao}");
        }

        Console.WriteLine($"chave de amor: {ChaveOrdenada("amor")}");
        Console.WriteLine($"chave de roma: {ChaveOrdenada("roma")}");

        string[] palavras = { "amor", "roma", "casa", "mora", "saca", "boi" };
        Console.WriteLine($"grupos: {Agrupar(palavras)}");
        Console.WriteLine($"grupos vazio: {Agrupar(new string[0])}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static bool SaoAnagramasPorContagem(string a, string b)
    {
        if (a.Length != b.Length)
        {
            return false;
        }

        int[] contagem = new int[26];

        foreach (char c in a)
        {
            contagem[c - 'a']++;
        }

        foreach (char c in b)
        {
            contagem[c - 'a']--;
        }

        foreach (int valor in contagem)
        {
            if (valor != 0)
            {
                return false;
            }
        }

        return true;
    }

    static string ChaveOrdenada(string palavra)
    {
        char[] letras = palavra.ToCharArray();
        Array.Sort(letras);
        return new string(letras);
    }

    static bool SaoAnagramasPorOrdenacao(string a, string b)
    {
        if (a.Length != b.Length)
        {
            return false;
        }

        return ChaveOrdenada(a) == ChaveOrdenada(b);
    }

    static string Agrupar(string[] palavras)
    {
        Dictionary<string, List<string>> grupos = new Dictionary<string, List<string>>();
        List<string> ordem = new List<string>();

        foreach (string palavra in palavras)
        {
            string chave = ChaveOrdenada(palavra);

            if (!grupos.ContainsKey(chave))
            {
                grupos[chave] = new List<string>();
                ordem.Add(chave);
            }

            grupos[chave].Add(palavra);
        }

        if (ordem.Count == 0)
        {
            return "nenhum";
        }

        List<string> partes = new List<string>();

        foreach (string chave in ordem)
        {
            partes.Add(string.Join(" ", grupos[chave]));
        }

        return string.Join("|", partes);
    }

    static void Main()
    {
        string[,] pares =
        {
            { "amor", "roma" },
            { "listen", "silent" },
            { "casa", "saco" },
            { "abc", "abcd" },
            { "", "" },
        };

        for (int i = 0; i < pares.GetLength(0); i++)
        {
            string a = pares[i, 0];
            string b = pares[i, 1];

            bool porContagem = SaoAnagramasPorContagem(a, b);
            bool porOrdenacao = SaoAnagramasPorOrdenacao(a, b);

            Console.WriteLine($"'{a}' e '{b}': contagem={porContagem} ordenacao={porOrdenacao} concordam={porContagem == porOrdenacao}");
        }

        Console.WriteLine($"chave de amor: {ChaveOrdenada("amor")}");
        Console.WriteLine($"chave de roma: {ChaveOrdenada("roma")}");

        string[] palavras = { "amor", "roma", "casa", "mora", "saca", "boi" };
        Console.WriteLine($"grupos: {Agrupar(palavras)}");
        Console.WriteLine($"grupos vazio: {Agrupar(new string[0])}");
    }
}
`,
      hints: [
        'Uma lista separada de chaves preserva a ordem de aparição, que o dicionário sozinho não garante.',
        '`new string(letras)` reconstrói a string a partir do array de caracteres ordenado.',
        'Duas strings vazias são anagramas: a tabela fica toda zerada.',
      ],
      tests: [
        {
          name: 'Pares e agrupamento',
          stdin: '',
          expectedStdout:
            "'amor' e 'roma': contagem=True ordenacao=True concordam=True\n" +
            "'listen' e 'silent': contagem=True ordenacao=True concordam=True\n" +
            "'casa' e 'saco': contagem=False ordenacao=False concordam=True\n" +
            "'abc' e 'abcd': contagem=False ordenacao=False concordam=True\n" +
            "'' e '': contagem=True ordenacao=True concordam=True\n" +
            'chave de amor: amor\nchave de roma: amor\n' +
            'grupos: amor roma mora|casa saca|boi\ngrupos vazio: nenhum',
        },
      ],
    },
  },
  {
    id: 's07c05l03',
    title: 'Palíndromos',
    objective: 'Verificar e construir palíndromos, com e sem normalização do texto.',
    concept: [
      {
        kind: 'text',
        body:
          'Um **palíndromo** lê-se igual nos dois sentidos. A verificação com dois ponteiros é `O(n)` e `O(1)` de espaço — melhor que inverter e comparar, que aloca uma cópia.',
      },
      {
        kind: 'compare',
        good: `int e = 0, d = texto.Length - 1;

while (e < d)
{
    if (texto[e] != texto[d]) return false;
    e++;
    d--;
}

return true;`,
        bad: `char[] letras = texto.ToCharArray();
Array.Reverse(letras);

return texto == new string(letras);
// O(n) de espaco`,
        goodLabel: 'Dois ponteiros, sem alocar',
        badLabel: 'Inverte e compara',
      },
      {
        kind: 'text',
        body:
          'Na prática costuma ser preciso **normalizar** antes: ignorar espaços, pontuação e maiúsculas. A normalização pode ser feita durante a própria varredura, pulando o que não interessa.',
      },
      {
        kind: 'output',
        code: `"A grama e amarga"  ->  normalizado "agramaeamarga"  ->  palindromo`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Pular os caracteres irrelevantes dentro do laço mantém o espaço em `O(1)`. Criar uma string normalizada é mais legível, mas aloca uma cópia — a escolha depende do que importa mais no seu contexto.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Ao pular caracteres, verifique os limites a cada avanço. Um texto composto só de pontuação faz os dois ponteiros correrem até se cruzarem, e sem a verificação isso vira acesso fora do array.',
      },
    ],
    quiz: [
      {
        id: 's07c05l03q1',
        type: 'single',
        prompt: 'Por que dois ponteiros é melhor que inverter e comparar?',
        options: [
          { id: 'a', text: 'Não aloca memória extra, mantendo o espaço em `O(1)`.', correct: true },
          { id: 'b', text: 'É assintoticamente mais rápido.' },
          { id: 'c', text: 'Funciona com mais alfabetos.' },
          { id: 'd', text: 'É mais legível.' },
        ],
        explanation:
          'Os dois são `O(n)` em tempo; a diferença está no espaço e na saída antecipada no primeiro caractere diferente.',
      },
      {
        id: 's07c05l03q2',
        type: 'single',
        prompt: 'Como normalizar mantendo `O(1)` de espaço?',
        options: [
          { id: 'a', text: 'Pulando os caracteres irrelevantes durante a própria varredura.', correct: true },
          { id: 'b', text: 'Criando uma string normalizada antes.' },
          { id: 'c', text: 'Usando expressão regular.' },
          { id: 'd', text: 'Não é possível.' },
        ],
        explanation:
          'Criar a string normalizada é mais legível, mas aloca uma cópia do texto inteiro.',
      },
      {
        id: 's07c05l03q3',
        type: 'single',
        prompt: 'Qual cuidado é necessário ao pular caracteres?',
        options: [
          { id: 'a', text: 'Verificar os limites a cada avanço dos ponteiros.', correct: true },
          { id: 'b', text: 'Contar quantos foram pulados.' },
          { id: 'c', text: 'Guardar as posições puladas.' },
          { id: 'd', text: 'Nenhum.' },
        ],
        explanation:
          'Um texto só de pontuação faz os ponteiros correrem além dos limites sem a verificação.',
      },
    ],
    challenge: {
      brief:
        'Implemente três variações de palíndromo, incluindo normalização e verificação com uma remoção permitida.',
      requirements: [
        'Complexidade esperada: `O(n)` de tempo, `O(1)` de espaço',
        '`EhPalindromoSimples(string texto)` compara os caracteres exatamente como estão',
        '`EhPalindromoNormalizado(string texto)` ignora tudo que não for letra ou dígito, e trata maiúsculas como minúsculas',
        '`EhQuasePalindromo(string texto)` diz se o texto vira palíndromo removendo **no máximo um** caractere',
        '`MaiorPrefixoPalindromo(string texto)` devolve o comprimento do maior prefixo que é palíndromo',
        'A normalização acontece durante a varredura, sem criar string nova',
        'Todos funcionam com texto vazio, devolvendo o resultado adequado',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva EhPalindromoSimples, EhPalindromoNormalizado,
    // EhQuasePalindromo e MaiorPrefixoPalindromo aqui

    static void Main()
    {
        string[] textos = { "arara", "casa", "", "a", "ab" };

        foreach (string t in textos)
        {
            Console.WriteLine($"'{t}' simples: {EhPalindromoSimples(t)}");
        }

        string[] comRuido = { "A grama e amarga", "Ana, a bala!", "isto nao e" };

        foreach (string t in comRuido)
        {
            Console.WriteLine($"'{t}' normalizado: {EhPalindromoNormalizado(t)}");
        }

        string[] quase = { "arara", "araras", "abca", "abcd", "aba" };

        foreach (string t in quase)
        {
            Console.WriteLine($"'{t}' quase: {EhQuasePalindromo(t)}");
        }

        Console.WriteLine($"prefixo de aabaxyz: {MaiorPrefixoPalindromo("aabaxyz")}");
        Console.WriteLine($"prefixo de abc: {MaiorPrefixoPalindromo("abc")}");
        Console.WriteLine($"prefixo de arara: {MaiorPrefixoPalindromo("arara")}");
        Console.WriteLine($"prefixo de vazio: {MaiorPrefixoPalindromo("")}");
    }
}
`,
      solution: `using System;

class Program
{
    static bool EhPalindromoSimples(string texto)
    {
        int esquerda = 0;
        int direita = texto.Length - 1;

        while (esquerda < direita)
        {
            if (texto[esquerda] != texto[direita])
            {
                return false;
            }

            esquerda++;
            direita--;
        }

        return true;
    }

    static bool Relevante(char c)
    {
        return char.IsLetterOrDigit(c);
    }

    static bool EhPalindromoNormalizado(string texto)
    {
        int esquerda = 0;
        int direita = texto.Length - 1;

        while (esquerda < direita)
        {
            while (esquerda < direita && !Relevante(texto[esquerda]))
            {
                esquerda++;
            }

            while (esquerda < direita && !Relevante(texto[direita]))
            {
                direita--;
            }

            if (esquerda >= direita)
            {
                return true;
            }

            if (char.ToLower(texto[esquerda]) != char.ToLower(texto[direita]))
            {
                return false;
            }

            esquerda++;
            direita--;
        }

        return true;
    }

    static bool FaixaEhPalindromo(string texto, int esquerda, int direita)
    {
        while (esquerda < direita)
        {
            if (texto[esquerda] != texto[direita])
            {
                return false;
            }

            esquerda++;
            direita--;
        }

        return true;
    }

    static bool EhQuasePalindromo(string texto)
    {
        int esquerda = 0;
        int direita = texto.Length - 1;

        while (esquerda < direita)
        {
            if (texto[esquerda] != texto[direita])
            {
                return FaixaEhPalindromo(texto, esquerda + 1, direita)
                    || FaixaEhPalindromo(texto, esquerda, direita - 1);
            }

            esquerda++;
            direita--;
        }

        return true;
    }

    static int MaiorPrefixoPalindromo(string texto)
    {
        for (int tamanho = texto.Length; tamanho > 0; tamanho--)
        {
            if (FaixaEhPalindromo(texto, 0, tamanho - 1))
            {
                return tamanho;
            }
        }

        return 0;
    }

    static void Main()
    {
        string[] textos = { "arara", "casa", "", "a", "ab" };

        foreach (string t in textos)
        {
            Console.WriteLine($"'{t}' simples: {EhPalindromoSimples(t)}");
        }

        string[] comRuido = { "A grama e amarga", "Ana, a bala!", "isto nao e" };

        foreach (string t in comRuido)
        {
            Console.WriteLine($"'{t}' normalizado: {EhPalindromoNormalizado(t)}");
        }

        string[] quase = { "arara", "araras", "abca", "abcd", "aba" };

        foreach (string t in quase)
        {
            Console.WriteLine($"'{t}' quase: {EhQuasePalindromo(t)}");
        }

        Console.WriteLine($"prefixo de aabaxyz: {MaiorPrefixoPalindromo("aabaxyz")}");
        Console.WriteLine($"prefixo de abc: {MaiorPrefixoPalindromo("abc")}");
        Console.WriteLine($"prefixo de arara: {MaiorPrefixoPalindromo("arara")}");
        Console.WriteLine($"prefixo de vazio: {MaiorPrefixoPalindromo("")}");
      }
}
`,
      hints: [
        'O `EhQuasePalindromo` só precisa decidir no **primeiro** desencontro: tentar pular o da esquerda ou o da direita.',
        'Um método auxiliar que verifica uma faixa é reaproveitado pelas duas últimas funções.',
        'O prefixo maior é testado primeiro, então o primeiro que der certo já é a resposta.',
      ],
      tests: [
        {
          name: 'Tres variacoes',
          stdin: '',
          expectedStdout:
            "'arara' simples: True\n'casa' simples: False\n'' simples: True\n" +
            "'a' simples: True\n'ab' simples: False\n" +
            "'A grama e amarga' normalizado: True\n'Ana, a bala!' normalizado: False\n" +
            "'isto nao e' normalizado: False\n" +
            "'arara' quase: True\n'araras' quase: True\n'abca' quase: True\n" +
            "'abcd' quase: False\n'aba' quase: True\n" +
            'prefixo de aabaxyz: 2\nprefixo de abc: 1\nprefixo de arara: 5\nprefixo de vazio: 0',
        },
      ],
    },
  },
  {
    id: 's07c05l04',
    title: 'Substring mais longa sem repetição',
    objective: 'Aplicar janela deslizante em texto, mantendo o estado das posições já vistas.',
    concept: [
      {
        kind: 'text',
        body:
          'Encontrar a maior faixa de texto sem caracteres repetidos é a aplicação canônica da janela deslizante variável — e tem um refinamento que vale conhecer.',
      },
      {
        kind: 'code',
        code: `int[] ultimaPosicao = new int[128];
for (int i = 0; i < 128; i++) ultimaPosicao[i] = -1;

int esquerda = 0, melhor = 0;

for (int direita = 0; direita < n; direita++)
{
    char c = texto[direita];

    if (ultimaPosicao[c] >= esquerda)
    {
        esquerda = ultimaPosicao[c] + 1;    // salto direto
    }

    ultimaPosicao[c] = direita;
    melhor = Math.Max(melhor, direita - esquerda + 1);
}`,
        caption: 'Guardar a **última posição** de cada caractere permite pular a esquerda de uma vez.',
      },
      {
        kind: 'text',
        body:
          'A versão com conjunto contrai a esquerda um passo por vez. A versão com posições **salta** direto para depois da ocorrência anterior — mesma complexidade, menos trabalho na prática.',
      },
      {
        kind: 'output',
        code: `"abcabcbb"

direita=0 'a'  janela "a"       melhor=1
direita=3 'a'  visto em 0       esquerda salta para 1
direita=4 'b'  visto em 1       esquerda salta para 2
...
melhor = 3 ("abc")`,
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A condição `ultimaPosicao[c] >= esquerda` é essencial. Sem ela, um caractere visto **antes** da janela atual faria a esquerda **retroceder**, quebrando o algoritmo.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Como o array de posições tem tamanho fixo, o espaço é `O(1)` mesmo que o texto seja enorme. Só o alfabeto define o tamanho, não a entrada.',
      },
    ],
    quiz: [
      {
        id: 's07c05l04q1',
        type: 'single',
        prompt: 'Qual é a vantagem de guardar a última posição em vez de usar um conjunto?',
        options: [
          { id: 'a', text: 'A esquerda salta direto, em vez de contrair um passo por vez.', correct: true },
          { id: 'b', text: 'Reduz a complexidade para `O(log n)`.' },
          { id: 'c', text: 'Permite caracteres Unicode.' },
          { id: 'd', text: 'Usa menos memória.' },
        ],
        explanation:
          'A complexidade é a mesma, mas o salto direto evita as remoções uma a uma do conjunto.',
      },
      {
        id: 's07c05l04q2',
        type: 'single',
        prompt: 'Por que a condição `ultimaPosicao[c] >= esquerda` é essencial?',
        options: [
          { id: 'a', text: 'Para impedir que a esquerda retroceda por um caractere visto antes da janela.', correct: true },
          { id: 'b', text: 'Para evitar índice negativo.' },
          { id: 'c', text: 'Para contar corretamente o tamanho.' },
          { id: 'd', text: 'Não é essencial.' },
        ],
        explanation:
          'Uma ocorrência fora da janela atual é irrelevante — e mover a esquerda para trás quebraria a invariante.',
      },
      {
        id: 's07c05l04q3',
        type: 'single',
        prompt: 'Qual é a complexidade de espaço da solução com array de posições?',
        options: [
          { id: 'a', code: 'O(1)', correct: true },
          { id: 'b', code: 'O(n)' },
          { id: 'c', code: 'O(n log n)' },
          { id: 'd', code: 'O(n²)' },
        ],
        explanation:
          'O tamanho do array depende só do alfabeto, que é fixo — não da entrada.',
      },
    ],
    challenge: {
      brief:
        'Encontre a maior substring sem repetição e três informações relacionadas, todas em uma passagem.',
      requirements: [
        'Complexidade esperada: `O(n)` de tempo, `O(1)` de espaço',
        '`MaiorSemRepetir(string texto)` devolve o comprimento da maior substring sem caracteres repetidos',
        '`TrechoSemRepetir(string texto)` devolve a própria substring, a primeira em caso de empate',
        '`MaiorComAteKDistintos(string texto, int k)` devolve o comprimento da maior substring com no máximo `k` caracteres distintos',
        '`PrimeiroRepetido(string texto)` devolve o primeiro caractere que se repete, ou `-` se não houver',
        'A solução usa um array de últimas posições, não um conjunto',
        'Todos funcionam com texto vazio',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva MaiorSemRepetir, TrechoSemRepetir,
    // MaiorComAteKDistintos e PrimeiroRepetido aqui

    static void Main()
    {
        string[] textos = { "abcabcbb", "bbbbb", "pwwkew", "", "abcdef" };

        foreach (string t in textos)
        {
            Console.WriteLine($"'{t}': tamanho={MaiorSemRepetir(t)} trecho='{TrechoSemRepetir(t)}'");
        }

        Console.WriteLine($"ate 2 distintos em eceba: {MaiorComAteKDistintos("eceba", 2)}");
        Console.WriteLine($"ate 3 distintos em eceba: {MaiorComAteKDistintos("eceba", 3)}");
        Console.WriteLine($"ate 1 distinto em aabbcc: {MaiorComAteKDistintos("aabbcc", 1)}");
        Console.WriteLine($"ate 0 distintos: {MaiorComAteKDistintos("abc", 0)}");

        Console.WriteLine($"primeiro repetido em abcabc: {PrimeiroRepetido("abcabc")}");
        Console.WriteLine($"primeiro repetido em abcdef: {PrimeiroRepetido("abcdef")}");
        Console.WriteLine($"primeiro repetido em aab: {PrimeiroRepetido("aab")}");
    }
}
`,
      solution: `using System;

class Program
{
    static int MaiorSemRepetir(string texto)
    {
        int[] ultimaPosicao = new int[128];

        for (int i = 0; i < ultimaPosicao.Length; i++)
        {
            ultimaPosicao[i] = -1;
        }

        int esquerda = 0;
        int melhor = 0;

        for (int direita = 0; direita < texto.Length; direita++)
        {
            char c = texto[direita];

            if (ultimaPosicao[c] >= esquerda)
            {
                esquerda = ultimaPosicao[c] + 1;
            }

            ultimaPosicao[c] = direita;

            int tamanho = direita - esquerda + 1;

            if (tamanho > melhor)
            {
                melhor = tamanho;
            }
        }

        return melhor;
    }

    static string TrechoSemRepetir(string texto)
    {
        int[] ultimaPosicao = new int[128];

        for (int i = 0; i < ultimaPosicao.Length; i++)
        {
            ultimaPosicao[i] = -1;
        }

        int esquerda = 0;
        int melhor = 0;
        int inicioMelhor = 0;

        for (int direita = 0; direita < texto.Length; direita++)
        {
            char c = texto[direita];

            if (ultimaPosicao[c] >= esquerda)
            {
                esquerda = ultimaPosicao[c] + 1;
            }

            ultimaPosicao[c] = direita;

            int tamanho = direita - esquerda + 1;

            if (tamanho > melhor)
            {
                melhor = tamanho;
                inicioMelhor = esquerda;
            }
        }

        return texto.Substring(inicioMelhor, melhor);
    }

    static int MaiorComAteKDistintos(string texto, int k)
    {
        if (k <= 0)
        {
            return 0;
        }

        int[] contagem = new int[128];
        int distintos = 0;
        int esquerda = 0;
        int melhor = 0;

        for (int direita = 0; direita < texto.Length; direita++)
        {
            char c = texto[direita];

            if (contagem[c] == 0)
            {
                distintos++;
            }

            contagem[c]++;

            while (distintos > k)
            {
                char saindo = texto[esquerda];
                contagem[saindo]--;

                if (contagem[saindo] == 0)
                {
                    distintos--;
                }

                esquerda++;
            }

            int tamanho = direita - esquerda + 1;

            if (tamanho > melhor)
            {
                melhor = tamanho;
            }
        }

        return melhor;
    }

    static char PrimeiroRepetido(string texto)
    {
        bool[] visto = new bool[128];

        foreach (char c in texto)
        {
            if (visto[c])
            {
                return c;
            }

            visto[c] = true;
        }

        return '-';
    }

    static void Main()
    {
        string[] textos = { "abcabcbb", "bbbbb", "pwwkew", "", "abcdef" };

        foreach (string t in textos)
        {
            Console.WriteLine($"'{t}': tamanho={MaiorSemRepetir(t)} trecho='{TrechoSemRepetir(t)}'");
        }

        Console.WriteLine($"ate 2 distintos em eceba: {MaiorComAteKDistintos("eceba", 2)}");
        Console.WriteLine($"ate 3 distintos em eceba: {MaiorComAteKDistintos("eceba", 3)}");
        Console.WriteLine($"ate 1 distinto em aabbcc: {MaiorComAteKDistintos("aabbcc", 1)}");
        Console.WriteLine($"ate 0 distintos: {MaiorComAteKDistintos("abc", 0)}");

        Console.WriteLine($"primeiro repetido em abcabc: {PrimeiroRepetido("abcabc")}");
        Console.WriteLine($"primeiro repetido em abcdef: {PrimeiroRepetido("abcdef")}");
        Console.WriteLine($"primeiro repetido em aab: {PrimeiroRepetido("aab")}");
    }
}
`,
      hints: [
        'O `TrechoSemRepetir` é o mesmo algoritmo guardando também onde a melhor janela começou.',
        'O `MaiorComAteKDistintos` usa contagem em vez de última posição, porque precisa saber quando um caractere sai de vez.',
        'O `PrimeiroRepetido` nem precisa de janela: um array de vistos resolve em uma passagem.',
      ],
      tests: [
        {
          name: 'Janelas em texto',
          stdin: '',
          expectedStdout:
            "'abcabcbb': tamanho=3 trecho='abc'\n'bbbbb': tamanho=1 trecho='b'\n" +
            "'pwwkew': tamanho=3 trecho='wke'\n'': tamanho=0 trecho=''\n" +
            "'abcdef': tamanho=6 trecho='abcdef'\n" +
            'ate 2 distintos em eceba: 3\nate 3 distintos em eceba: 4\n' +
            'ate 1 distinto em aabbcc: 2\nate 0 distintos: 0\n' +
            'primeiro repetido em abcabc: a\nprimeiro repetido em abcdef: -\n' +
            'primeiro repetido em aab: a',
        },
      ],
    },
  },
  {
    id: 's07c05l05',
    title: 'Compressão RLE',
    objective: 'Implementar compressão por contagem de repetições, com atenção ao caso em que ela piora.',
    concept: [
      {
        kind: 'text',
        body:
          'A **codificação por comprimento de sequência** (RLE) substitui repetições consecutivas por um par caractere-contagem. É a compressão mais simples que existe.',
      },
      {
        kind: 'output',
        code: `"aaabbbcccd"  ->  "a3b3c3d1"     10 -> 8 caracteres
"abcdef"      ->  "a1b1c1d1e1f1"  6 -> 12 caracteres  <- piorou!`,
      },
      {
        kind: 'text',
        body:
          'A segunda linha é o ponto importante: sem repetições, a RLE **dobra** o tamanho. Compressores reais verificam isso e devolvem o original quando a compressão não compensa.',
      },
      {
        kind: 'code',
        code: `string comprimido = Comprimir(original);

return comprimido.Length < original.Length
    ? comprimido
    : original;`,
        caption: 'A decisão de usar ou não a compressão faz parte do algoritmo.',
      },
      {
        kind: 'table',
        headers: ['Entrada', 'Resultado', 'Comentário'],
        rows: [
          ['muitas repetições', 'comprime bem', 'imagens simples, dados esparsos'],
          ['sem repetições', 'dobra o tamanho', 'texto natural, dados aleatórios'],
          ['string vazia', 'string vazia', 'caso de borda'],
        ],
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A descompressão fica ambígua se o texto original contiver **dígitos**. `"a12"` seria "a repetido 12 vezes" ou "a, depois 1, depois 2"? Formatos reais resolvem isso com marcadores de escape.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'RLE ainda é usada de verdade — em fax, em bitmaps simples, e como etapa dentro de compressores maiores. A simplicidade dela é a vantagem: comprimir e descomprimir são `O(n)` e triviais de verificar.',
      },
    ],
    quiz: [
      {
        id: 's07c05l05q1',
        type: 'single',
        prompt: 'O que acontece com a RLE em um texto sem repetições?',
        options: [
          { id: 'a', text: 'O resultado dobra de tamanho.', correct: true },
          { id: 'b', text: 'O resultado fica igual.' },
          { id: 'c', text: 'O resultado encolhe pela metade.' },
          { id: 'd', text: 'A compressão falha.' },
        ],
        explanation:
          'Cada caractere vira dois: ele mesmo e a contagem `1`. Por isso a verificação final é parte do algoritmo.',
      },
      {
        id: 's07c05l05q2',
        type: 'single',
        prompt: 'Por que a descompressão fica ambígua com dígitos no texto original?',
        options: [
          { id: 'a', text: 'Não dá para saber se um dígito é contagem ou conteúdo.', correct: true },
          { id: 'b', text: 'Porque dígitos ocupam mais bytes.' },
          { id: 'c', text: 'Porque a contagem pode passar de nove.' },
          { id: 'd', text: 'Não fica ambígua.' },
        ],
        explanation:
          'Formatos reais resolvem com marcadores de escape ou reservando um caractere especial.',
      },
      {
        id: 's07c05l05q3',
        type: 'single',
        prompt: 'Onde a RLE ainda é usada de verdade?',
        options: [
          { id: 'a', text: 'Em fax, bitmaps simples, e como etapa dentro de compressores maiores.', correct: true },
          { id: 'b', text: 'Em nenhum lugar: é apenas didática.' },
          { id: 'c', text: 'Em bancos de dados relacionais.' },
          { id: 'd', text: 'Em criptografia.' },
        ],
        explanation:
          'A simplicidade é a vantagem: comprimir e descomprimir são `O(n)` e fáceis de verificar.',
      },
    ],
    challenge: {
      brief:
        'Implemente compressão e descompressão RLE, com a decisão de quando não vale a pena comprimir.',
      requirements: [
        'Complexidade esperada: `O(n)` de tempo',
        '`Comprimir(string texto)` devolve a codificação, sempre no formato caractere seguido de contagem',
        '`ComprimirSeValer(string texto)` devolve o comprimido apenas se ele for **estritamente menor** que o original',
        '`Descomprimir(string comprimido)` reconstrói o texto original',
        '`TaxaDeCompressao(string texto)` devolve a porcentagem inteira de redução, ou `0` quando não há redução',
        'A descompressão suporta contagens de mais de um dígito',
        'Todos funcionam com texto vazio',
        'Use `StringBuilder` para montar as saídas',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Text;

class Program
{
    // Escreva Comprimir, ComprimirSeValer, Descomprimir e TaxaDeCompressao aqui

    static void Main()
    {
        string[] textos = { "aaabbbcccd", "abcdef", "aaaaaaaaaaaa", "", "a" };

        foreach (string t in textos)
        {
            string comprimido = Comprimir(t);
            string escolhido = ComprimirSeValer(t);
            string voltou = Descomprimir(comprimido);

            Console.WriteLine($"'{t}' -> '{comprimido}' escolhido='{escolhido}' volta='{voltou}' ok={voltou == t}");
        }

        Console.WriteLine($"taxa de aaabbbcccd: {TaxaDeCompressao("aaabbbcccd")}%");
        Console.WriteLine($"taxa de abcdef: {TaxaDeCompressao("abcdef")}%");
        Console.WriteLine($"taxa de aaaaaaaaaaaa: {TaxaDeCompressao("aaaaaaaaaaaa")}%");

        Console.WriteLine($"contagem grande: {Descomprimir("a12b3")}");
    }
}
`,
      solution: `using System;
using System.Text;

class Program
{
    static string Comprimir(string texto)
    {
        if (texto.Length == 0)
        {
            return "";
        }

        StringBuilder saida = new StringBuilder();

        char atual = texto[0];
        int contagem = 1;

        for (int i = 1; i < texto.Length; i++)
        {
            if (texto[i] == atual)
            {
                contagem++;
            }
            else
            {
                saida.Append(atual);
                saida.Append(contagem);

                atual = texto[i];
                contagem = 1;
            }
        }

        saida.Append(atual);
        saida.Append(contagem);

        return saida.ToString();
    }

    static string ComprimirSeValer(string texto)
    {
        string comprimido = Comprimir(texto);

        return comprimido.Length < texto.Length ? comprimido : texto;
    }

    static string Descomprimir(string comprimido)
    {
        StringBuilder saida = new StringBuilder();

        int i = 0;

        while (i < comprimido.Length)
        {
            char caractere = comprimido[i];
            i++;

            int contagem = 0;

            while (i < comprimido.Length && comprimido[i] >= '0' && comprimido[i] <= '9')
            {
                contagem = contagem * 10 + (comprimido[i] - '0');
                i++;
            }

            for (int k = 0; k < contagem; k++)
            {
                saida.Append(caractere);
            }
        }

        return saida.ToString();
    }

    static int TaxaDeCompressao(string texto)
    {
        if (texto.Length == 0)
        {
            return 0;
        }

        string comprimido = Comprimir(texto);

        if (comprimido.Length >= texto.Length)
        {
            return 0;
        }

        return (texto.Length - comprimido.Length) * 100 / texto.Length;
    }

    static void Main()
    {
        string[] textos = { "aaabbbcccd", "abcdef", "aaaaaaaaaaaa", "", "a" };

        foreach (string t in textos)
        {
            string comprimido = Comprimir(t);
            string escolhido = ComprimirSeValer(t);
            string voltou = Descomprimir(comprimido);

            Console.WriteLine($"'{t}' -> '{comprimido}' escolhido='{escolhido}' volta='{voltou}' ok={voltou == t}");
        }

        Console.WriteLine($"taxa de aaabbbcccd: {TaxaDeCompressao("aaabbbcccd")}%");
        Console.WriteLine($"taxa de abcdef: {TaxaDeCompressao("abcdef")}%");
        Console.WriteLine($"taxa de aaaaaaaaaaaa: {TaxaDeCompressao("aaaaaaaaaaaa")}%");

        Console.WriteLine($"contagem grande: {Descomprimir("a12b3")}");
    }
}
`,
      hints: [
        'O último bloco precisa ser escrito depois do laço — ele não tem um caractere diferente para dispará-lo.',
        'A leitura da contagem acumula dígitos com `contagem * 10 + digito`, o que suporta números de qualquer tamanho.',
        'A taxa usa aritmética inteira: multiplique por 100 antes de dividir.',
      ],
      tests: [
        {
          name: 'Compressao e volta',
          stdin: '',
          expectedStdout:
            "'aaabbbcccd' -> 'a3b3c3d1' escolhido='a3b3c3d1' volta='aaabbbcccd' ok=True\n" +
            "'abcdef' -> 'a1b1c1d1e1f1' escolhido='abcdef' volta='abcdef' ok=True\n" +
            "'aaaaaaaaaaaa' -> 'a12' escolhido='a12' volta='aaaaaaaaaaaa' ok=True\n" +
            "'' -> '' escolhido='' volta='' ok=True\n" +
            "'a' -> 'a1' escolhido='a' volta='a' ok=True\n" +
            'taxa de aaabbbcccd: 20%\ntaxa de abcdef: 0%\ntaxa de aaaaaaaaaaaa: 75%\n' +
            'contagem grande: aaaaaaaaaaaabbb',
        },
      ],
    },
  },
  {
    id: 's07c05l06',
    title: 'Cifra de César',
    objective: 'Deslocar caracteres dentro de um alfabeto circular, tratando o transbordo corretamente.',
    concept: [
      {
        kind: 'text',
        body:
          'A **cifra de César** desloca cada letra um número fixo de posições no alfabeto. Ela é trivial de quebrar, mas ensina bem o tratamento de um alfabeto **circular**.',
      },
      {
        kind: 'code',
        code: `char Deslocar(char c, int passo)
{
    if (c < 'a' || c > 'z') return c;      // deixa o resto intacto

    int posicao = c - 'a';
    int nova = ((posicao + passo) % 26 + 26) % 26;

    return (char)('a' + nova);
}`,
        caption: 'A normalização dupla do módulo é o que faz deslocamentos negativos funcionarem.',
      },
      {
        kind: 'output',
        code: `"abc" deslocado 3   ->  "def"
"xyz" deslocado 3   ->  "abc"     <- deu a volta
"abc" deslocado -1  ->  "zab"     <- volta pelo outro lado`,
      },
      {
        kind: 'table',
        headers: ['Operação', 'Deslocamento'],
        rows: [
          ['cifrar', '`+passo`'],
          ['decifrar', '`-passo`'],
          ['quebrar por força bruta', 'testar os 25 deslocamentos'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Quebrar a cifra por força bruta é trivial: são apenas 25 possibilidades. Uma quebra mais elegante usa **análise de frequência** — a letra mais comum do texto cifrado provavelmente corresponde à mais comum do idioma.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A normalização `((x % 26) + 26) % 26` aparece de novo, pelo mesmo motivo da rotação de array: em C# o resto de um número negativo é negativo, o que produziria um índice inválido.',
      },
    ],
    quiz: [
      {
        id: 's07c05l06q1',
        type: 'single',
        prompt: 'Por que a normalização dupla do módulo é necessária?',
        options: [
          { id: 'a', text: 'Porque em C# o resto de um negativo é negativo.', correct: true },
          { id: 'b', text: 'Para evitar estouro de inteiro.' },
          { id: 'c', text: 'Porque 26 não é potência de dois.' },
          { id: 'd', text: 'Não é necessária.' },
        ],
        explanation:
          'É a mesma normalização da rotação de array, e pelo mesmo motivo: transformar o resto negativo em positivo.',
      },
      {
        id: 's07c05l06q2',
        type: 'single',
        prompt: 'Como decifrar um texto cifrado com passo `k`?',
        options: [
          { id: 'a', text: 'Deslocando por `-k`.', correct: true },
          { id: 'b', text: 'Deslocando por `k` de novo.' },
          { id: 'c', text: 'Invertendo o texto.' },
          { id: 'd', text: 'Não é possível sem a chave.' },
        ],
        explanation:
          'A cifra é uma rotação; a rotação inversa desfaz. A chave é apenas o valor do deslocamento.',
      },
      {
        id: 's07c05l06q3',
        type: 'single',
        prompt: 'Qual é a forma elegante de quebrar a cifra sem testar tudo?',
        options: [
          { id: 'a', text: 'Análise de frequência: a letra mais comum do cifrado corresponde à mais comum do idioma.', correct: true },
          { id: 'b', text: 'Ordenar o texto.' },
          { id: 'c', text: 'Contar o comprimento das palavras.' },
          { id: 'd', text: 'Não existe forma.' },
        ],
        explanation:
          'Como a cifra preserva as frequências relativas, a distribuição do texto cifrado revela o deslocamento.',
      },
    ],
    challenge: {
      brief:
        'Implemente a cifra, a decifragem e as duas formas de quebrá-la sem conhecer a chave.',
      requirements: [
        'Complexidade esperada: `O(n)` para cifrar e decifrar',
        '`Cifrar(string texto, int passo)` desloca apenas letras minúsculas, deixando o resto intacto',
        '`Decifrar(string texto, int passo)` desfaz a cifra',
        'Deslocamentos negativos e maiores que 26 funcionam corretamente',
        '`ForcaBruta(string cifrado)` devolve as 25 possibilidades separadas por `|`',
        '`QuebrarPorFrequencia(string cifrado, char maisComumDoIdioma)` devolve o deslocamento mais provável',
        'A análise de frequência assume que a letra mais frequente do cifrado corresponde à informada',
        'Todos funcionam com texto vazio',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Text;

class Program
{
    // Escreva Cifrar, Decifrar, ForcaBruta e QuebrarPorFrequencia aqui

    static void Main()
    {
        string texto = "ataque ao amanhecer";

        string cifrado = Cifrar(texto, 3);
        Console.WriteLine($"cifrado: {cifrado}");
        Console.WriteLine($"decifrado: {Decifrar(cifrado, 3)}");
        Console.WriteLine($"volta ok: {Decifrar(cifrado, 3) == texto}");

        Console.WriteLine($"xyz + 3: {Cifrar("xyz", 3)}");
        Console.WriteLine($"abc - 1: {Cifrar("abc", -1)}");
        Console.WriteLine($"abc + 29: {Cifrar("abc", 29)}");
        Console.WriteLine($"abc + 0: {Cifrar("abc", 0)}");
        Console.WriteLine($"vazio: '{Cifrar("", 5)}'");

        string curto = Cifrar("aaab", 5);
        Console.WriteLine($"curto cifrado: {curto}");
        Console.WriteLine($"quebra por frequencia: {QuebrarPorFrequencia(curto, 'a')}");
        Console.WriteLine($"recuperado: {Decifrar(curto, QuebrarPorFrequencia(curto, 'a'))}");

        string[] opcoes = ForcaBruta(Cifrar("abc", 1)).Split('|');
        Console.WriteLine($"opcoes: {opcoes.Length}");
        Console.WriteLine($"primeira: {opcoes[0]}");
        Console.WriteLine($"ultima: {opcoes[24]}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Text;

class Program
{
    static char Deslocar(char c, int passo)
    {
        if (c < 'a' || c > 'z')
        {
            return c;
        }

        int posicao = c - 'a';
        int nova = ((posicao + passo) % 26 + 26) % 26;

        return (char)('a' + nova);
    }

    static string Cifrar(string texto, int passo)
    {
        StringBuilder saida = new StringBuilder();

        foreach (char c in texto)
        {
            saida.Append(Deslocar(c, passo));
        }

        return saida.ToString();
    }

    static string Decifrar(string texto, int passo)
    {
        return Cifrar(texto, -passo);
    }

    static string ForcaBruta(string cifrado)
    {
        List<string> opcoes = new List<string>();

        for (int passo = 1; passo <= 25; passo++)
        {
            opcoes.Add(Decifrar(cifrado, passo));
        }

        return string.Join("|", opcoes);
    }

    static int QuebrarPorFrequencia(string cifrado, char maisComumDoIdioma)
    {
        int[] contagem = new int[26];

        foreach (char c in cifrado)
        {
            if (c >= 'a' && c <= 'z')
            {
                contagem[c - 'a']++;
            }
        }

        int melhor = -1;
        int indice = 0;

        for (int i = 0; i < 26; i++)
        {
            if (contagem[i] > melhor)
            {
                melhor = contagem[i];
                indice = i;
            }
        }

        if (melhor <= 0)
        {
            return 0;
        }

        int deslocamento = indice - (maisComumDoIdioma - 'a');

        return ((deslocamento % 26) + 26) % 26;
    }

    static void Main()
    {
        string texto = "ataque ao amanhecer";

        string cifrado = Cifrar(texto, 3);
        Console.WriteLine($"cifrado: {cifrado}");
        Console.WriteLine($"decifrado: {Decifrar(cifrado, 3)}");
        Console.WriteLine($"volta ok: {Decifrar(cifrado, 3) == texto}");

        Console.WriteLine($"xyz + 3: {Cifrar("xyz", 3)}");
        Console.WriteLine($"abc - 1: {Cifrar("abc", -1)}");
        Console.WriteLine($"abc + 29: {Cifrar("abc", 29)}");
        Console.WriteLine($"abc + 0: {Cifrar("abc", 0)}");
        Console.WriteLine($"vazio: '{Cifrar("", 5)}'");

        string curto = Cifrar("aaab", 5);
        Console.WriteLine($"curto cifrado: {curto}");
        Console.WriteLine($"quebra por frequencia: {QuebrarPorFrequencia(curto, 'a')}");
        Console.WriteLine($"recuperado: {Decifrar(curto, QuebrarPorFrequencia(curto, 'a'))}");

        string[] opcoes = ForcaBruta(Cifrar("abc", 1)).Split('|');
        Console.WriteLine($"opcoes: {opcoes.Length}");
        Console.WriteLine($"primeira: {opcoes[0]}");
        Console.WriteLine($"ultima: {opcoes[24]}");
    }
}
`,
      hints: [
        '`Decifrar` pode simplesmente chamar `Cifrar` com o passo negativo.',
        'O deslocamento descoberto é a distância entre a letra mais frequente do cifrado e a esperada.',
        'O espaço não é uma letra minúscula, então ele atravessa a cifra intacto.',
      ],
      tests: [
        {
          name: 'Cifra completa',
          stdin: '',
          expectedStdout:
            'cifrado: dwdtxh dr dpdqkhfhu\ndecifrado: ataque ao amanhecer\nvolta ok: True\n' +
            "xyz + 3: abc\nabc - 1: zab\nabc + 29: def\nabc + 0: abc\nvazio: ''\n" +
            'curto cifrado: fffg\nquebra por frequencia: 5\nrecuperado: aaab\n' +
            'opcoes: 25\nprimeira: abc\nultima: cde',
        },
      ],
    },
  },
  {
    id: 's07c05l07',
    title: 'Tokenização',
    objective: 'Quebrar texto em unidades significativas, tratando separadores e casos de borda.',
    concept: [
      {
        kind: 'text',
        body:
          '**Tokenizar** é dividir um texto em pedaços com significado. É o primeiro passo de qualquer processamento de linguagem, de interpretadores a análise de logs.',
      },
      {
        kind: 'table',
        headers: ['Situação', 'Ferramenta'],
        rows: [
          ['separador único e fixo', '`Split(char)`'],
          ['vários separadores', '`Split(char[])`'],
          ['ignorar vazios', '`StringSplitOptions.RemoveEmptyEntries`'],
          ['regras próprias', 'varredura manual'],
        ],
      },
      {
        kind: 'code',
        code: `// separadores multiplos, sem vazios
string[] tokens = texto.Split(
    new[] { ' ', ',', ';' },
    StringSplitOptions.RemoveEmptyEntries);`,
      },
      {
        kind: 'text',
        body:
          'Quando as regras vão além de separadores — números com vários dígitos, operadores de dois caracteres, texto entre aspas —, a varredura manual é o caminho. O padrão é sempre o mesmo: classificar o caractere atual e consumir enquanto ele pertencer ao mesmo token.',
      },
      {
        kind: 'code',
        code: `while (i < texto.Length)
{
    if (char.IsDigit(texto[i]))
    {
        int inicio = i;
        while (i < texto.Length && char.IsDigit(texto[i])) i++;
        tokens.Add(texto.Substring(inicio, i - inicio));
    }
    else if (...) { ... }
    else i++;
}`,
        caption: 'Cada ramo consome o token inteiro, deixando `i` já na posição seguinte.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'O erro clássico da varredura manual é o **laço infinito**: um caractere que não casa com nenhum ramo e não é consumido faz o `while` externo girar para sempre. Garanta que todo caminho avança `i`.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Separadores consecutivos produzem tokens vazios, e isso é decisão de domínio: em um CSV, `a,,b` tem três campos, sendo um vazio; em uma frase, dois espaços seguidos não criam uma palavra vazia.',
      },
    ],
    quiz: [
      {
        id: 's07c05l07q1',
        type: 'single',
        prompt: 'O que `StringSplitOptions.RemoveEmptyEntries` faz?',
        options: [
          { id: 'a', text: 'Descarta os tokens vazios gerados por separadores consecutivos.', correct: true },
          { id: 'b', text: 'Remove espaços do início e do fim de cada token.' },
          { id: 'c', text: 'Remove tokens duplicados.' },
          { id: 'd', text: 'Ignora o separador.' },
        ],
        explanation:
          'É útil em frases e inadequado em CSV, onde um campo vazio é informação.',
      },
      {
        id: 's07c05l07q2',
        type: 'single',
        prompt: 'Qual é o erro clássico da varredura manual?',
        options: [
          { id: 'a', text: 'Um caminho que não avança o índice, causando laço infinito.', correct: true },
          { id: 'b', text: 'Acessar índice negativo.' },
          { id: 'c', text: 'Alocar memória demais.' },
          { id: 'd', text: 'Perder o último token.' },
        ],
        explanation:
          'Todo ramo precisa consumir pelo menos um caractere, inclusive o ramo que ignora o caractere atual.',
      },
      {
        id: 's07c05l07q3',
        type: 'single',
        prompt: 'Tokens vazios devem ser descartados?',
        options: [
          { id: 'a', text: 'Depende do domínio: em CSV são campos válidos, em frases não.', correct: true },
          { id: 'b', text: 'Sempre.' },
          { id: 'c', text: 'Nunca.' },
          { id: 'd', text: 'Só quando o texto é curto.' },
        ],
        explanation:
          'Em `a,,b` o campo do meio existe e está vazio; em `"ola  mundo"` não há palavra entre os espaços.',
      },
    ],
    challenge: {
      brief:
        'Implemente três tokenizadores com regras diferentes, incluindo um com varredura manual.',
      requirements: [
        'Complexidade esperada: `O(n)` de tempo',
        '`PorEspacos(string texto)` devolve as palavras separadas por `|`, descartando vazios',
        '`PorSeparadores(string texto)` divide por espaço, vírgula e ponto e vírgula, **mantendo** os vazios',
        '`Expressao(string texto)` tokeniza uma expressão aritmética por varredura manual',
        'Os tokens da expressão são números de vários dígitos, operadores `+ - * /`, e parênteses',
        'A varredura ignora espaços e nunca entra em laço infinito',
        'Um caractere desconhecido vira o token `?`',
        'Todos devolvem `vazio` para entrada sem tokens',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Escreva PorEspacos, PorSeparadores e Expressao aqui

    static void Main()
    {
        Console.WriteLine($"espacos: {PorEspacos("ola  mundo  cruel")}");
        Console.WriteLine($"espacos vazio: {PorEspacos("   ")}");

        Console.WriteLine($"separadores: {PorSeparadores("a,,b;c d")}");
        Console.WriteLine($"separadores vazio: {PorSeparadores("")}");

        Console.WriteLine($"expressao: {Expressao("12 + 345 * (6 - 7)")}");
        Console.WriteLine($"expressao sem espacos: {Expressao("1+2*3")}");
        Console.WriteLine($"expressao com desconhecido: {Expressao("1 @ 2")}");
        Console.WriteLine($"expressao vazia: {Expressao("   ")}");
        Console.WriteLine($"expressao so numero: {Expressao("42")}");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static string Juntar(List<string> tokens)
    {
        if (tokens.Count == 0)
        {
            return "vazio";
        }

        return string.Join("|", tokens);
    }

    static string PorEspacos(string texto)
    {
        string[] partes = texto.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

        return Juntar(new List<string>(partes));
    }

    static string PorSeparadores(string texto)
    {
        if (texto.Length == 0)
        {
            return "vazio";
        }

        string[] partes = texto.Split(' ', ',', ';');

        return Juntar(new List<string>(partes));
    }

    static string Expressao(string texto)
    {
        List<string> tokens = new List<string>();

        int i = 0;

        while (i < texto.Length)
        {
            char c = texto[i];

            if (c == ' ')
            {
                i++;
            }
            else if (char.IsDigit(c))
            {
                int inicio = i;

                while (i < texto.Length && char.IsDigit(texto[i]))
                {
                    i++;
                }

                tokens.Add(texto.Substring(inicio, i - inicio));
            }
            else if (c == '+' || c == '-' || c == '*' || c == '/')
            {
                tokens.Add(c.ToString());
                i++;
            }
            else if (c == '(' || c == ')')
            {
                tokens.Add(c.ToString());
                i++;
            }
            else
            {
                tokens.Add("?");
                i++;
            }
        }

        return Juntar(tokens);
    }

    static void Main()
    {
        Console.WriteLine($"espacos: {PorEspacos("ola  mundo  cruel")}");
        Console.WriteLine($"espacos vazio: {PorEspacos("   ")}");

        Console.WriteLine($"separadores: {PorSeparadores("a,,b;c d")}");
        Console.WriteLine($"separadores vazio: {PorSeparadores("")}");

        Console.WriteLine($"expressao: {Expressao("12 + 345 * (6 - 7)")}");
        Console.WriteLine($"expressao sem espacos: {Expressao("1+2*3")}");
        Console.WriteLine($"expressao com desconhecido: {Expressao("1 @ 2")}");
        Console.WriteLine($"expressao vazia: {Expressao("   ")}");
        Console.WriteLine($"expressao so numero: {Expressao("42")}");
    }
}
`,
      hints: [
        'O ramo do espaço apenas avança `i` sem produzir token — mas ele **precisa** avançar.',
        'O ramo do número guarda o índice inicial e avança enquanto houver dígitos, montando o token de uma vez.',
        'Um método `Juntar` compartilhado evita repetir o tratamento de lista vazia três vezes.',
      ],
      tests: [
        {
          name: 'Tres tokenizadores',
          stdin: '',
          expectedStdout:
            'espacos: ola|mundo|cruel\nespacos vazio: vazio\n' +
            'separadores: a||b|c|d\nseparadores vazio: vazio\n' +
            'expressao: 12|+|345|*|(|6|-|7|)\nexpressao sem espacos: 1|+|2|*|3\n' +
            'expressao com desconhecido: 1|?|2\nexpressao vazia: vazio\nexpressao so numero: 42',
        },
      ],
    },
  },
  {
    id: 's07c05l08',
    title: 'Distância de edição',
    objective: 'Medir a diferença entre dois textos com programação dinâmica sobre uma matriz.',
    concept: [
      {
        kind: 'text',
        body:
          'A **distância de edição** — ou distância de Levenshtein — é o menor número de operações que transforma um texto em outro. As operações são inserir, remover e substituir um caractere.',
      },
      {
        kind: 'output',
        code: `"gato" -> "rato"    1 operacao  (substituir g por r)
"gato" -> "gatos"   1 operacao  (inserir s)
"casa" -> "caso"    1 operacao  (substituir a por o)
"kitten" -> "sitting"  3 operacoes`,
      },
      {
        kind: 'text',
        body:
          'A solução usa uma matriz em que `dp[i,j]` é a distância entre os primeiros `i` caracteres do primeiro texto e os primeiros `j` do segundo. Cada célula depende de três vizinhas.',
      },
      {
        kind: 'code',
        code: `if (a[i - 1] == b[j - 1])
{
    dp[i, j] = dp[i - 1, j - 1];         // nada a fazer
}
else
{
    dp[i, j] = 1 + Math.Min(
        dp[i - 1, j - 1],                // substituir
        Math.Min(dp[i - 1, j],           // remover
                 dp[i, j - 1]));         // inserir
}`,
        caption: 'Cada vizinha corresponde a uma das três operações possíveis.',
      },
      {
        kind: 'table',
        headers: ['Aspecto', 'Valor'],
        rows: [
          ['tempo', '`O(m × n)`'],
          ['espaço', '`O(m × n)`, ou `O(min(m,n))` otimizado'],
          ['casos base', 'distância até vazio é o comprimento'],
        ],
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'A otimização de espaço vem de cada linha depender só da anterior: guardando **duas linhas** em vez da matriz inteira, o espaço cai para `O(n)`. A resposta continua a mesma.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Os casos base são metade do algoritmo: `dp[i,0] = i` e `dp[0,j] = j`, porque transformar um texto em vazio custa uma remoção por caractere. Esquecê-los produz resultados errados sem erro visível.',
      },
    ],
    quiz: [
      {
        id: 's07c05l08q1',
        type: 'single',
        prompt: 'Quais são as três operações da distância de edição?',
        options: [
          { id: 'a', text: 'Inserir, remover e substituir.', correct: true },
          { id: 'b', text: 'Inserir, remover e trocar de lugar.' },
          { id: 'c', text: 'Comparar, copiar e mover.' },
          { id: 'd', text: 'Adicionar, concatenar e cortar.' },
        ],
        explanation:
          'Cada uma corresponde a uma das três células vizinhas de que a solução depende.',
      },
      {
        id: 's07c05l08q2',
        type: 'single',
        prompt: 'Quais são os casos base?',
        options: [
          { id: 'a', text: 'A distância até o texto vazio é o comprimento do outro.', correct: true },
          { id: 'b', text: 'A distância é sempre zero na diagonal.' },
          { id: 'c', text: 'A primeira linha é toda zero.' },
          { id: 'd', text: 'Não há casos base.' },
        ],
        explanation:
          'Transformar um texto de `n` caracteres em vazio custa `n` remoções.',
      },
      {
        id: 's07c05l08q3',
        type: 'single',
        prompt: 'Como reduzir o espaço para `O(n)`?',
        options: [
          { id: 'a', text: 'Guardando apenas duas linhas, já que cada uma só depende da anterior.', correct: true },
          { id: 'b', text: 'Usando recursão.' },
          { id: 'c', text: 'Comprimindo a matriz.' },
          { id: 'd', text: 'Não é possível.' },
        ],
        explanation:
          'A dependência é sempre entre linhas adjacentes, então as demais podem ser descartadas.',
      },
    ],
    challenge: {
      brief:
        'Implemente a distância de edição em duas versões — matriz completa e duas linhas — e uma variação que só conta substituições.',
      requirements: [
        'Complexidade esperada de tempo: `O(m × n)` para as duas versões',
        '`DistanciaComMatriz(string a, string b)` usa a matriz completa, com espaço `O(m × n)`',
        '`DistanciaComDuasLinhas(string a, string b)` usa espaço `O(n)`',
        '`DistanciaDeHamming(string a, string b)` conta as posições diferentes, ou `-1` se os comprimentos diferirem',
        '`SaoSimilares(string a, string b, int limite)` diz se a distância de edição não passa do limite',
        'As duas versões da distância de edição devolvem sempre o mesmo valor',
        'Todos tratam textos vazios corretamente',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;

class Program
{
    // Escreva DistanciaComMatriz, DistanciaComDuasLinhas,
    // DistanciaDeHamming e SaoSimilares aqui

    static void Main()
    {
        string[,] pares =
        {
            { "gato", "rato" },
            { "gato", "gatos" },
            { "kitten", "sitting" },
            { "", "abc" },
            { "abc", "" },
            { "", "" },
            { "casa", "casa" },
        };

        for (int i = 0; i < pares.GetLength(0); i++)
        {
            string a = pares[i, 0];
            string b = pares[i, 1];

            int comMatriz = DistanciaComMatriz(a, b);
            int comLinhas = DistanciaComDuasLinhas(a, b);

            Console.WriteLine($"'{a}' -> '{b}': matriz={comMatriz} linhas={comLinhas} iguais={comMatriz == comLinhas}");
        }

        Console.WriteLine($"hamming casa/caso: {DistanciaDeHamming("casa", "caso")}");
        Console.WriteLine($"hamming abc/abd: {DistanciaDeHamming("abc", "abd")}");
        Console.WriteLine($"hamming tamanhos diferentes: {DistanciaDeHamming("ab", "abc")}");

        Console.WriteLine($"similares com limite 1: {SaoSimilares("gato", "rato", 1)}");
        Console.WriteLine($"similares com limite 2: {SaoSimilares("kitten", "sitting", 2)}");
        Console.WriteLine($"similares com limite 3: {SaoSimilares("kitten", "sitting", 3)}");
    }
}
`,
      solution: `using System;

class Program
{
    static int DistanciaComMatriz(string a, string b)
    {
        int m = a.Length;
        int n = b.Length;

        int[,] dp = new int[m + 1, n + 1];

        for (int i = 0; i <= m; i++)
        {
            dp[i, 0] = i;
        }

        for (int j = 0; j <= n; j++)
        {
            dp[0, j] = j;
        }

        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                if (a[i - 1] == b[j - 1])
                {
                    dp[i, j] = dp[i - 1, j - 1];
                }
                else
                {
                    int substituir = dp[i - 1, j - 1];
                    int remover = dp[i - 1, j];
                    int inserir = dp[i, j - 1];

                    dp[i, j] = 1 + Math.Min(substituir, Math.Min(remover, inserir));
                }
            }
        }

        return dp[m, n];
    }

    static int DistanciaComDuasLinhas(string a, string b)
    {
        int m = a.Length;
        int n = b.Length;

        int[] anterior = new int[n + 1];
        int[] atual = new int[n + 1];

        for (int j = 0; j <= n; j++)
        {
            anterior[j] = j;
        }

        for (int i = 1; i <= m; i++)
        {
            atual[0] = i;

            for (int j = 1; j <= n; j++)
            {
                if (a[i - 1] == b[j - 1])
                {
                    atual[j] = anterior[j - 1];
                }
                else
                {
                    atual[j] = 1 + Math.Min(anterior[j - 1], Math.Min(anterior[j], atual[j - 1]));
                }
            }

            int[] troca = anterior;
            anterior = atual;
            atual = troca;
        }

        return anterior[n];
    }

    static int DistanciaDeHamming(string a, string b)
    {
        if (a.Length != b.Length)
        {
            return -1;
        }

        int diferentes = 0;

        for (int i = 0; i < a.Length; i++)
        {
            if (a[i] != b[i])
            {
                diferentes++;
            }
        }

        return diferentes;
    }

    static bool SaoSimilares(string a, string b, int limite)
    {
        return DistanciaComDuasLinhas(a, b) <= limite;
    }

    static void Main()
    {
        string[,] pares =
        {
            { "gato", "rato" },
            { "gato", "gatos" },
            { "kitten", "sitting" },
            { "", "abc" },
            { "abc", "" },
            { "", "" },
            { "casa", "casa" },
        };

        for (int i = 0; i < pares.GetLength(0); i++)
        {
            string a = pares[i, 0];
            string b = pares[i, 1];

            int comMatriz = DistanciaComMatriz(a, b);
            int comLinhas = DistanciaComDuasLinhas(a, b);

            Console.WriteLine($"'{a}' -> '{b}': matriz={comMatriz} linhas={comLinhas} iguais={comMatriz == comLinhas}");
        }

        Console.WriteLine($"hamming casa/caso: {DistanciaDeHamming("casa", "caso")}");
        Console.WriteLine($"hamming abc/abd: {DistanciaDeHamming("abc", "abd")}");
        Console.WriteLine($"hamming tamanhos diferentes: {DistanciaDeHamming("ab", "abc")}");

        Console.WriteLine($"similares com limite 1: {SaoSimilares("gato", "rato", 1)}");
        Console.WriteLine($"similares com limite 2: {SaoSimilares("kitten", "sitting", 2)}");
        Console.WriteLine($"similares com limite 3: {SaoSimilares("kitten", "sitting", 3)}");
    }
}
`,
      hints: [
        'Na versão de duas linhas, troque as referências ao fim de cada linha em vez de copiar os valores.',
        'Com `m` igual a zero, o laço externo não roda e a resposta é o caso base da linha anterior.',
        'A distância de Hamming é bem mais simples: ela não permite inserções nem remoções.',
      ],
      tests: [
        {
          name: 'Distancias',
          stdin: '',
          expectedStdout:
            "'gato' -> 'rato': matriz=1 linhas=1 iguais=True\n" +
            "'gato' -> 'gatos': matriz=1 linhas=1 iguais=True\n" +
            "'kitten' -> 'sitting': matriz=3 linhas=3 iguais=True\n" +
            "'' -> 'abc': matriz=3 linhas=3 iguais=True\n" +
            "'abc' -> '': matriz=3 linhas=3 iguais=True\n" +
            "'' -> '': matriz=0 linhas=0 iguais=True\n" +
            "'casa' -> 'casa': matriz=0 linhas=0 iguais=True\n" +
            'hamming casa/caso: 1\nhamming abc/abd: 1\nhamming tamanhos diferentes: -1\n' +
            'similares com limite 1: True\nsimilares com limite 2: False\nsimilares com limite 3: True',
        },
      ],
    },
  },
  {
    id: 's07c05l09',
    title: 'Prática: validador de formatos',
    objective: 'Combinar as técnicas do capítulo para validar formatos estruturados de texto.',
    concept: [
      {
        kind: 'text',
        body:
          'Validar formatos é uma das tarefas mais comuns com texto. A abordagem é sempre a mesma: decompor a regra em verificações simples e aplicá-las em ordem.',
      },
      {
        kind: 'table',
        headers: ['Formato', 'Regras'],
        rows: [
          ['CPF', '11 dígitos, dígitos verificadores corretos'],
          ['e-mail', 'exatamente um `@`, texto antes e depois, ponto no domínio'],
          ['data', 'formato `dd/mm/aaaa`, valores em faixa, mês com dias válidos'],
          ['parênteses', 'balanceados e na ordem certa'],
        ],
      },
      {
        kind: 'text',
        body:
          'A verificação de **parênteses balanceados** é a mais interessante: ela precisa de uma pilha, porque a validade depende da **ordem de fechamento**, não só das quantidades.',
      },
      {
        kind: 'output',
        code: `"(a[b]c)"     valido
"(a[b)c]"     invalido    <- quantidades certas, ordem errada
"((("         invalido    <- sobrou aberto
")("          invalido    <- fechou antes de abrir`,
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Contar aberturas e fechamentos **não basta** — a segunda linha do exemplo tem contagens corretas e é inválida. É a pilha que captura a estrutura aninhada.',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'Ordene as verificações da mais barata para a mais cara: comprimento antes de conteúdo, formato antes de cálculo. Um CPF de três caracteres não precisa passar pelo cálculo dos dígitos verificadores.',
      },
    ],
    quiz: [
      {
        id: 's07c05l09q1',
        type: 'single',
        prompt: 'Por que contar aberturas e fechamentos não basta para validar parênteses?',
        options: [
          { id: 'a', text: 'Porque a ordem de fechamento importa, e a contagem a ignora.', correct: true },
          { id: 'b', text: 'Porque pode haver mais de um tipo de parêntese.' },
          { id: 'c', text: 'Porque a contagem é lenta.' },
          { id: 'd', text: 'A contagem basta.' },
        ],
        explanation:
          '`(a[b)c]` tem as contagens certas e é inválido — só a pilha captura o aninhamento.',
      },
      {
        id: 's07c05l09q2',
        type: 'single',
        prompt: 'Em que ordem aplicar as verificações?',
        options: [
          { id: 'a', text: 'Da mais barata para a mais cara.', correct: true },
          { id: 'b', text: 'Da mais importante para a menos.' },
          { id: 'c', text: 'Na ordem em que aparecem no texto.' },
          { id: 'd', text: 'A ordem não importa.' },
        ],
        explanation:
          'Uma verificação de comprimento em `O(1)` descarta a maioria dos inválidos antes de qualquer cálculo.',
      },
      {
        id: 's07c05l09q3',
        type: 'single',
        prompt: 'Qual estrutura a validação de aninhamento exige?',
        options: [
          { id: 'a', text: 'Uma pilha.', correct: true },
          { id: 'b', text: 'Uma fila.' },
          { id: 'c', text: 'Um dicionário.' },
          { id: 'd', text: 'Um array de contagem.' },
        ],
        explanation:
          'O último aberto precisa ser o primeiro fechado — exatamente o comportamento da pilha.',
      },
    ],
    challenge: {
      brief:
        'Escreva quatro validadores de formato, cada um combinando técnicas diferentes do capítulo.',
      requirements: [
        'Complexidade esperada: `O(n)` de tempo para todos',
        '`ApenasDigitos(string texto)` diz se o texto tem apenas dígitos e não está vazio',
        '`ValidarTelefone(string texto)` aceita exatamente 11 dígitos que não começam por zero',
        '`ValidarEmail(string texto)` exige exatamente um `@`, ao menos um caractere antes, e um ponto depois do `@` que não seja o primeiro nem o último caractere do domínio',
        '`ValidarData(string texto)` aceita `dd/mm/aaaa` com mês de 1 a 12 e dia válido para o mês, considerando anos bissextos',
        '`ParentesesBalanceados(string texto)` valida `()`, `[]` e `{}` aninhados corretamente',
        'As verificações vão da mais barata para a mais cara',
        'Todos rejeitam entrada vazia, exceto onde indicado',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;

class Program
{
    // Escreva ApenasDigitos, ValidarTelefone, ValidarEmail,
    // ValidarData e ParentesesBalanceados aqui

    static void Main()
    {
        string[] telefones = { "81999998888", "01999998888", "8199999888", "8199999888a", "" };

        foreach (string t in telefones)
        {
            Console.WriteLine($"tel '{t}': {ValidarTelefone(t)}");
        }

        string[] emails = { "ana@teste.com", "ana@teste", "@teste.com", "ana@@teste.com", "ana@.com", "ana@teste." };

        foreach (string e in emails)
        {
            Console.WriteLine($"email '{e}': {ValidarEmail(e)}");
        }

        string[] datas = { "29/02/2024", "29/02/2023", "31/04/2024", "31/12/2024", "00/01/2024", "1/1/2024" };

        foreach (string d in datas)
        {
            Console.WriteLine($"data '{d}': {ValidarData(d)}");
        }

        string[] expressoes = { "(a[b]c)", "(a[b)c]", "(((", ")(", "", "{[()]}" };

        foreach (string x in expressoes)
        {
            Console.WriteLine($"parenteses '{x}': {ParentesesBalanceados(x)}");
        }
    }
}
`,
      solution: `using System;
using System.Collections.Generic;

class Program
{
    static bool ApenasDigitos(string texto)
    {
        if (texto.Length == 0)
        {
            return false;
        }

        foreach (char c in texto)
        {
            if (c < '0' || c > '9')
            {
                return false;
            }
        }

        return true;
    }

    static bool ValidarTelefone(string texto)
    {
        if (texto.Length != 11)
        {
            return false;
        }

        if (!ApenasDigitos(texto))
        {
            return false;
        }

        return texto[0] != '0';
    }

    static bool ValidarEmail(string texto)
    {
        if (texto.Length < 3)
        {
            return false;
        }

        int posicaoArroba = -1;
        int quantidadeArrobas = 0;

        for (int i = 0; i < texto.Length; i++)
        {
            if (texto[i] == '@')
            {
                quantidadeArrobas++;
                posicaoArroba = i;
            }
        }

        if (quantidadeArrobas != 1)
        {
            return false;
        }

        if (posicaoArroba == 0 || posicaoArroba == texto.Length - 1)
        {
            return false;
        }

        string dominio = texto.Substring(posicaoArroba + 1);
        int posicaoPonto = dominio.IndexOf('.');

        if (posicaoPonto <= 0 || posicaoPonto == dominio.Length - 1)
        {
            return false;
        }

        return true;
    }

    static bool Bissexto(int ano)
    {
        if (ano % 400 == 0) return true;
        if (ano % 100 == 0) return false;
        return ano % 4 == 0;
    }

    static bool ValidarData(string texto)
    {
        if (texto.Length != 10)
        {
            return false;
        }

        if (texto[2] != '/' || texto[5] != '/')
        {
            return false;
        }

        string diaTexto = texto.Substring(0, 2);
        string mesTexto = texto.Substring(3, 2);
        string anoTexto = texto.Substring(6, 4);

        if (!ApenasDigitos(diaTexto) || !ApenasDigitos(mesTexto) || !ApenasDigitos(anoTexto))
        {
            return false;
        }

        int dia = int.Parse(diaTexto);
        int mes = int.Parse(mesTexto);
        int ano = int.Parse(anoTexto);

        if (mes < 1 || mes > 12 || dia < 1)
        {
            return false;
        }

        int[] diasPorMes = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
        int limite = diasPorMes[mes - 1];

        if (mes == 2 && Bissexto(ano))
        {
            limite = 29;
        }

        return dia <= limite;
    }

    static bool ParentesesBalanceados(string texto)
    {
        Stack<char> pilha = new Stack<char>();

        foreach (char c in texto)
        {
            if (c == '(' || c == '[' || c == '{')
            {
                pilha.Push(c);
            }
            else if (c == ')' || c == ']' || c == '}')
            {
                if (pilha.Count == 0)
                {
                    return false;
                }

                char aberto = pilha.Pop();

                if (c == ')' && aberto != '(') return false;
                if (c == ']' && aberto != '[') return false;
                if (c == '}' && aberto != '{') return false;
            }
        }

        return pilha.Count == 0;
    }

    static void Main()
    {
        string[] telefones = { "81999998888", "01999998888", "8199999888", "8199999888a", "" };

        foreach (string t in telefones)
        {
            Console.WriteLine($"tel '{t}': {ValidarTelefone(t)}");
        }

        string[] emails = { "ana@teste.com", "ana@teste", "@teste.com", "ana@@teste.com", "ana@.com", "ana@teste." };

        foreach (string e in emails)
        {
            Console.WriteLine($"email '{e}': {ValidarEmail(e)}");
        }

        string[] datas = { "29/02/2024", "29/02/2023", "31/04/2024", "31/12/2024", "00/01/2024", "1/1/2024" };

        foreach (string d in datas)
        {
            Console.WriteLine($"data '{d}': {ValidarData(d)}");
        }

        string[] expressoes = { "(a[b]c)", "(a[b)c]", "(((", ")(", "", "{[()]}" };

        foreach (string x in expressoes)
        {
            Console.WriteLine($"parenteses '{x}': {ParentesesBalanceados(x)}");
        }
    }
}
`,
      hints: [
        'A verificação de comprimento vem primeiro em todos os validadores — é `O(1)` e descarta a maioria dos inválidos.',
        'Na data, extrair os três pedaços por posição fixa só é seguro depois de confirmar o comprimento e as barras.',
        'Uma expressão vazia tem parênteses balanceados: a pilha termina vazia.',
      ],
      tests: [
        {
          name: 'Quatro validadores',
          stdin: '',
          expectedStdout:
            "tel '81999998888': True\ntel '01999998888': False\ntel '8199999888': False\n" +
            "tel '8199999888a': False\ntel '': False\n" +
            "email 'ana@teste.com': True\nemail 'ana@teste': False\nemail '@teste.com': False\n" +
            "email 'ana@@teste.com': False\nemail 'ana@.com': False\nemail 'ana@teste.': False\n" +
            "data '29/02/2024': True\ndata '29/02/2023': False\ndata '31/04/2024': False\n" +
            "data '31/12/2024': True\ndata '00/01/2024': False\ndata '1/1/2024': False\n" +
            "parenteses '(a[b]c)': True\nparenteses '(a[b)c]': False\nparenteses '(((': False\n" +
            "parenteses ')(': False\nparenteses '': True\nparenteses '{[()]}': True",
        },
      ],
    },
  },
  {
    id: 's07c05l10',
    title: 'Checkpoint: strings',
    objective: 'Escolher a técnica de texto certa e evitar as armadilhas de desempenho mais comuns.',
    concept: [
      {
        kind: 'text',
        body:
          'Problemas de texto se resolvem quase sempre com as mesmas quatro ferramentas. Reconhecer qual delas o enunciado pede é a metade do trabalho.',
      },
      {
        kind: 'table',
        headers: ['O problema pede', 'Ferramenta'],
        rows: [
          ['comparar composição de letras', 'tabela de frequência'],
          ['verificar simetria', 'dois ponteiros'],
          ['maior trecho com propriedade', 'janela deslizante'],
          ['comparar dois textos inteiros', 'programação dinâmica'],
          ['dividir em unidades', 'tokenização'],
        ],
      },
      {
        kind: 'text',
        body:
          'Além da escolha da técnica, existe uma armadilha de desempenho específica de strings em C#: elas são **imutáveis**, e concatenar dentro de um laço cria uma cópia nova a cada volta.',
      },
      {
        kind: 'compare',
        good: `var saida = new StringBuilder();

foreach (var item in itens)
{
    saida.Append(item);
}

return saida.ToString();
// O(n)`,
        bad: `string saida = "";

foreach (var item in itens)
{
    saida += item;
}

return saida;
// O(n²)`,
        goodLabel: 'StringBuilder',
        badLabel: 'Concatenação em laço',
      },
      {
        kind: 'callout',
        tone: 'warn',
        body:
          'A concatenação em laço é `O(n²)` porque cada `+=` copia a string inteira. Com poucos itens não se percebe; com milhares, o programa parece travar sem motivo aparente.',
      },
      {
        kind: 'callout',
        tone: 'insight',
        body:
          'Outras operações que escondem custo: `Substring` aloca uma cópia, `IndexOf` é `O(n)`, e `Split` aloca um array e todas as strings dele. Nenhuma é gratuita dentro de um laço.',
      },
      {
        kind: 'callout',
        tone: 'tip',
        body:
          'Quando puder, trabalhe com **índices** em vez de criar substrings. Comparar `texto[i]` com `texto[j]` não aloca nada; comparar `texto.Substring(i, k)` aloca duas strings por comparação.',
      },
    ],
    quiz: [
      {
        id: 's07c05l10q1',
        type: 'single',
        prompt: 'Por que concatenar strings em um laço é `O(n²)`?',
        options: [
          { id: 'a', text: 'Porque strings são imutáveis e cada `+=` copia a string inteira.', correct: true },
          { id: 'b', text: 'Porque o laço é aninhado.' },
          { id: 'c', text: 'Porque o coletor de lixo roda a cada volta.' },
          { id: 'd', text: 'Não é `O(n²)`.' },
        ],
        explanation:
          'A cada volta a string cresce e é copiada por inteiro, somando `1 + 2 + ... + n` cópias de caractere.',
      },
      {
        id: 's07c05l10q2',
        type: 'multiple',
        prompt: 'Quais operações de string escondem custo dentro de um laço?',
        options: [
          { id: 'a', code: 'Substring', correct: true },
          { id: 'b', code: 'IndexOf', correct: true },
          { id: 'c', code: 'Split', correct: true },
          { id: 'd', code: 'texto[i]' },
        ],
        explanation:
          'O acesso por índice é `O(1)` e não aloca. As outras três alocam, percorrem, ou as duas coisas.',
      },
      {
        id: 's07c05l10q3',
        type: 'single',
        prompt: 'Qual é a alternativa a criar substrings para comparar trechos?',
        options: [
          { id: 'a', text: 'Trabalhar com índices, comparando caractere a caractere.', correct: true },
          { id: 'b', text: 'Converter para array de bytes.' },
          { id: 'c', text: 'Usar `StringBuilder`.' },
          { id: 'd', text: 'Ordenar o texto antes.' },
        ],
        explanation:
          'Comparar por índice não aloca nada, enquanto cada `Substring` cria uma cópia do trecho.',
      },
    ],
    challenge: {
      brief:
        'Resolva cinco problemas de texto, cada um com a técnica adequada, e sem nenhuma armadilha de desempenho.',
      requirements: [
        'Complexidade esperada indicada em cada método',
        '`Normalizar(string texto)` devolve apenas as letras minúsculas, em `O(n)`, usando `StringBuilder`',
        '`EhAnagramaDeSiInvertido(string texto)` diz se o texto normalizado é palíndromo, em `O(n)`',
        '`MaiorPalavra(string frase)` devolve a palavra mais longa, a primeira em caso de empate, em `O(n)`',
        '`ContarOcorrencias(string texto, string padrao)` conta as ocorrências, inclusive sobrepostas, comparando **por índice** sem criar substrings',
        '`InverterPalavras(string frase)` inverte a ordem das palavras, em `O(n)`, sem concatenar em laço',
        'Nenhum método concatena strings dentro de um laço',
        'Todos funcionam com entrada vazia',
        'Não altere o método `Main`',
      ],
      starterCode: `using System;
using System.Collections.Generic;
using System.Text;

class Program
{
    // Escreva Normalizar, EhAnagramaDeSiInvertido, MaiorPalavra,
    // ContarOcorrencias e InverterPalavras aqui

    static void Main()
    {
        Console.WriteLine($"normalizar: '{Normalizar("A Grama, e Amarga!")}'");
        Console.WriteLine($"normalizar vazio: '{Normalizar("")}'");

        Console.WriteLine($"palindromo: {EhAnagramaDeSiInvertido("A grama e amarga")}");
        Console.WriteLine($"nao palindromo: {EhAnagramaDeSiInvertido("isto nao e")}");
        Console.WriteLine($"vazio: {EhAnagramaDeSiInvertido("")}");

        Console.WriteLine($"maior palavra: {MaiorPalavra("o rato roeu a roupa do rei")}");
        Console.WriteLine($"empate: {MaiorPalavra("abc def gh")}");
        Console.WriteLine($"vazio: '{MaiorPalavra("")}'");

        Console.WriteLine($"ocorrencias de aa em aaaa: {ContarOcorrencias("aaaa", "aa")}");
        Console.WriteLine($"ocorrencias de ab em abab: {ContarOcorrencias("abab", "ab")}");
        Console.WriteLine($"ocorrencias de xyz: {ContarOcorrencias("abab", "xyz")}");
        Console.WriteLine($"padrao vazio: {ContarOcorrencias("abc", "")}");
        Console.WriteLine($"padrao maior: {ContarOcorrencias("ab", "abc")}");

        Console.WriteLine($"inverter: '{InverterPalavras("o rato roeu a roupa")}'");
        Console.WriteLine($"inverter uma: '{InverterPalavras("sozinha")}'");
        Console.WriteLine($"inverter vazio: '{InverterPalavras("")}'");
    }
}
`,
      solution: `using System;
using System.Collections.Generic;
using System.Text;

class Program
{
    static string Normalizar(string texto)
    {
        StringBuilder saida = new StringBuilder();

        foreach (char c in texto)
        {
            if (char.IsLetter(c))
            {
                saida.Append(char.ToLower(c));
            }
        }

        return saida.ToString();
    }

    static bool EhAnagramaDeSiInvertido(string texto)
    {
        string limpo = Normalizar(texto);

        int esquerda = 0;
        int direita = limpo.Length - 1;

        while (esquerda < direita)
        {
            if (limpo[esquerda] != limpo[direita])
            {
                return false;
            }

            esquerda++;
            direita--;
        }

        return true;
    }

    static string MaiorPalavra(string frase)
    {
        int melhorInicio = 0;
        int melhorTamanho = 0;

        int i = 0;

        while (i < frase.Length)
        {
            while (i < frase.Length && frase[i] == ' ')
            {
                i++;
            }

            int inicio = i;

            while (i < frase.Length && frase[i] != ' ')
            {
                i++;
            }

            int tamanho = i - inicio;

            if (tamanho > melhorTamanho)
            {
                melhorTamanho = tamanho;
                melhorInicio = inicio;
            }
        }

        if (melhorTamanho == 0)
        {
            return "";
        }

        return frase.Substring(melhorInicio, melhorTamanho);
    }

    static int ContarOcorrencias(string texto, string padrao)
    {
        if (padrao.Length == 0 || padrao.Length > texto.Length)
        {
            return 0;
        }

        int total = 0;

        for (int i = 0; i + padrao.Length <= texto.Length; i++)
        {
            bool casou = true;

            for (int j = 0; j < padrao.Length; j++)
            {
                if (texto[i + j] != padrao[j])
                {
                    casou = false;
                    break;
                }
            }

            if (casou)
            {
                total++;
            }
        }

        return total;
    }

    static string InverterPalavras(string frase)
    {
        string[] palavras = frase.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

        Array.Reverse(palavras);

        return string.Join(" ", palavras);
    }

    static void Main()
    {
        Console.WriteLine($"normalizar: '{Normalizar("A Grama, e Amarga!")}'");
        Console.WriteLine($"normalizar vazio: '{Normalizar("")}'");

        Console.WriteLine($"palindromo: {EhAnagramaDeSiInvertido("A grama e amarga")}");
        Console.WriteLine($"nao palindromo: {EhAnagramaDeSiInvertido("isto nao e")}");
        Console.WriteLine($"vazio: {EhAnagramaDeSiInvertido("")}");

        Console.WriteLine($"maior palavra: {MaiorPalavra("o rato roeu a roupa do rei")}");
        Console.WriteLine($"empate: {MaiorPalavra("abc def gh")}");
        Console.WriteLine($"vazio: '{MaiorPalavra("")}'");

        Console.WriteLine($"ocorrencias de aa em aaaa: {ContarOcorrencias("aaaa", "aa")}");
        Console.WriteLine($"ocorrencias de ab em abab: {ContarOcorrencias("abab", "ab")}");
        Console.WriteLine($"ocorrencias de xyz: {ContarOcorrencias("abab", "xyz")}");
        Console.WriteLine($"padrao vazio: {ContarOcorrencias("abc", "")}");
        Console.WriteLine($"padrao maior: {ContarOcorrencias("ab", "abc")}");

        Console.WriteLine($"inverter: '{InverterPalavras("o rato roeu a roupa")}'");
        Console.WriteLine($"inverter uma: '{InverterPalavras("sozinha")}'");
        Console.WriteLine($"inverter vazio: '{InverterPalavras("")}'");
    }
}
`,
      hints: [
        'O `MaiorPalavra` guarda início e tamanho, criando a substring uma única vez no fim.',
        'O `ContarOcorrencias` compara caractere a caractere por índice, sem alocar nada.',
        'O `InverterPalavras` usa `string.Join`, que monta o resultado de uma vez em vez de concatenar em laço.',
      ],
      tests: [
        {
          name: 'Cinco problemas de texto',
          stdin: '',
          expectedStdout:
            "normalizar: 'agramaeamarga'\nnormalizar vazio: ''\n" +
            'palindromo: True\nnao palindromo: False\nvazio: True\n' +
            "maior palavra: roupa\nempate: abc\nvazio: ''\n" +
            'ocorrencias de aa em aaaa: 3\nocorrencias de ab em abab: 2\nocorrencias de xyz: 0\n' +
            'padrao vazio: 0\npadrao maior: 0\n' +
            "inverter: 'roupa a roeu rato o'\ninverter uma: 'sozinha'\ninverter vazio: ''",
        },
      ],
    },
  },
]
