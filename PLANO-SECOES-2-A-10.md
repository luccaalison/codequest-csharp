# Plano para completar as Seções 2 a 10

Documento de trabalho para escrever as 630 lições restantes do CodeQuest C#. Ele parte do que a Seção 1 já provou funcionar e de sondagens reais no engine de execução, não de suposições.

Leia junto com o `README.md`, que descreve o modelo de conteúdo e os blocos disponíveis. Este documento cobre **o que falta, em que ordem, com quais riscos e quando um capítulo está pronto**.

---

## 1. Ponto de partida

| Métrica | Valor |
| --- | --- |
| Lições no mapa curricular | 700 |
| Lições escritas (Seções 1 a 8) | 560 |
| Lições restantes | **140** |
| Capítulos restantes | 14 (2 seções × 7) |
| Linhas de conteúdo escritas | 141.205 |
| Perguntas de quiz escritas | 1.680 |
| Casos de teste escritos | 1.313 |

Todos os títulos de capítulo e lição das seções 2 a 10 **já existem** em `web/src/content/curriculum.ts`. Nada de estrutura precisa ser inventado: o trabalho é preencher, não planejar o currículo. Enquanto uma lição não é escrita, a trilha a mostra como bloqueada e o app funciona normalmente.

### O tamanho real do trabalho

A Seção 1 produziu, em média, **153 linhas por lição** e **1.529 linhas por capítulo**. Projetando linearmente, as seções 2 a 10 somam cerca de **96 mil linhas** de conteúdo. Esse número sobe nas seções de POO e algoritmos, onde o código dos desafios é maior.

Isso significa que o gargalo não é técnico, é de volume. O plano abaixo é otimizado para **um capítulo ser uma unidade fechada de trabalho** (10 lições, ~1.500 linhas, verificável de ponta a ponta), porque é o maior pedaço que cabe confortavelmente em uma sessão sem perder contexto.

---

## 2. O molde que a Seção 1 estabeleceu

Toda lição das seções 2 a 10 deve seguir esta anatomia, que é o que o player espera e o que o verificador cobra:

```
lição
├── id            sSScCClLL, idêntico ao curriculum.ts
├── title         idêntico ao curriculum.ts
├── objective     uma frase: "o que eu sei fazer depois disso"
├── concept       4 a 7 blocos (texto, código, saída, callout, tabela, compare, sideBySide)
├── quiz          3 perguntas de múltipla escolha, cada uma com 4 alternativas e explicação
└── challenge     brief, requirements, starterCode, solution, hints, tests
```

Números que a Seção 1 fixou como padrão de fato:

- **3 perguntas por lição** (210 ÷ 70). Uma sobre o conceito, uma sobre leitura de código, uma sobre a armadilha da lição.
- **2 testes por lição** nas lições comuns, **4 a 5** em checkpoints e bosses. Sempre com pelo menos um caso de borda `hidden: true`.
- **2 dicas por desafio**, da mais vaga para a mais específica.
- **1 callout de armadilha** por lição, sempre no ponto onde o aluno erra na prática.

### Convenções herdadas que continuam valendo

Estas já estão no `README.md` e não devem mudar no meio do caminho:

- Conteúdo em pt-BR, mas **identificadores e saídas de programa sem acento**, para não depender da codificação do console.
- `decimal` para dinheiro, `double` para medidas e médias.
- Leitura de decimais sempre com `CultureInfo.InvariantCulture`.
- **A solução de referência só usa construções já ensinadas até aquele ponto do currículo.** Foi a regra que mais deu trabalho na Seção 1 (o `for` em `s01c04l04` teve que ser reescrito à mão porque laços só chegam na Seção 2) e é a que mais vai doer daqui em diante.

Essa última regra é o motivo pelo qual **a ordem de autoria é praticamente forçada a ser linear**: só é seguro escrever a Seção 5 quando a 4 estiver pronta, porque é ela que define o vocabulário disponível.

---

## 3. O que o engine aguenta (sondado, não suposto)

Antes de planejar, sondei o engine com nove casos que decidem como capítulos inteiros precisam ser escritos. O script fica em `web/scripts/probe-engine.mts` e é auto-verificável: cada sonda declara o resultado que este plano assume.

```bash
npx tsx scripts/probe-engine.mts     # com a API no ar
```

Resultados (todas as nove sondas confirmam as premissas):

| Sonda | Veredito | Consequência para o conteúdo |
| --- | --- | --- |
| Várias classes, construtor primário e `record` no mesmo arquivo | **funciona** | Seção 5 (POO) é viável sem mudar o engine |
| Escrever e ler arquivo com `capabilities: ['fileSystem']` | **funciona** | Seção 9, capítulo de arquivos, é viável |
| Arquivo sobrevive entre execuções | **não** | cada teste roda em diretório novo: **não existe fixture**, toda lição de arquivo escreve antes de ler |
| Recursão infinita | **morre em ~0,5 s** com `Stack overflow.` no stderr | Seções 4 e 7 podem ensinar recursão sem travar o servidor |
| `async Task Main` com `await` | **funciona** | Seção 9 inteira é viável |
| Saída fora de ordem com `comparison: 'tokens'` | **falha** | `tokens` só colapsa espaços, **não reordena** |
| `Activator` / `GetProperty` com `capabilities: ['reflection']` | **funciona** | Seção 8, capítulo de recursos modernos, é viável |
| `new Random(42)` estável entre execuções | **estável** (`67 15 13`) | simulações e sorteios são testáveis com semente fixa |
| 50 milhões de iterações | **203 ms** | há folga enorme no timeout de 5 s para desafios de complexidade |

Três sondas extras, feitas à parte, revelaram problemas concretos:

- **`Debug.Assert` não dispara.** O programa imprimiu `passou reto` em vez de falhar, porque `CSharpParseOptions` não define o símbolo `DEBUG` e `Debug.Assert` é `[Conditional("DEBUG")]`. A lição `s06c03l04` ("Debug.Assert") ensinaria algo que silenciosamente não acontece.
- **Nenhum aviso de nullability é emitido.** `string? s = null; s.Length;` compilou sem warning e explodiu em runtime, porque o engine usa `NullableContextOptions.Annotations`. O capítulo `s08c04` ("Nullability") não consegue demonstrar a análise de fluxo que é justamente o assunto dele.
- **`System.Text.Json` está disponível** e serializa objetos anônimos normalmente. O capítulo `s09c06` (JSON) é viável sem pacotes externos.

### Limites do engine, para consulta rápida

- Timeout padrão **5 s**, máximo 15 s (`SubmissionEvaluator`), configurável por lição via `challenge.timeoutMs`.
- `LanguageVersion.Preview`: todos os recursos modernos de C# estão liberados.
- Referências = framework compartilhado completo. **Sem NuGet.**
- **Um único arquivo de código** por submissão. Várias classes no mesmo arquivo, sim; vários arquivos, não.
- Bloqueios permanentes: `Process`, `Registry`, `Marshal`, `AppDomain`, emissão de IL. Capabilities opcionais: `network`, `fileSystem`, `reflection`.
- Modos de comparação: `trimmed` (padrão), `exact`, `ignoreCase`, `tokens`.

---

## 4. Cinco itens de engine a resolver antes do conteúdo correspondente

Nenhum bloqueia as Seções 2 a 5. Todos bloqueiam algo depois. Vale resolvê-los antes de chegar na seção afetada, não durante.

### E1. Comparação insensível a ordem — **RESOLVIDO** (bloqueava S03 e S09)

**Problema:** não há como testar uma saída cuja ordem não é garantida. `tokens` colapsa espaços mas preserva a ordem, como a sonda provou.

**Onde dói:**
- `s03c03` (Dictionary) e `s03c04` (HashSet): a ordem de enumeração não é garantida pelo contrato dessas coleções. Hoje funcionaria por sorte, e um dia quebraria sem ninguém ter mudado o conteúdo.
- `s09c03` (Paralelismo) inteiro: `Parallel.For` produz ordem imprevisível por definição.

**Solução aplicada:** `OutputComparison.Unordered` existe em `server/CodeQuest.Api/Sandbox/SubmissionEvaluator.cs` — normaliza, quebra em linhas, ordena com `StringComparer.Ordinal` e compara. O valor `'unordered'` está no tipo `OutputComparison` em `web/src/content/types.ts` e no enum de `Contracts.cs`. Sondado de ponta a ponta: aceita qualquer ordem das mesmas linhas e continua rejeitando conteúdo errado ou linha faltando. Em uso nas lições de frequência de `s03c03`.

**Alternativa sem mexer no engine:** exigir que toda lição dessas coleções ordene explicitamente antes de imprimir (`OrderBy(...)`). Funciona, mas obriga a ensinar `OrderBy` antes da hora na Seção 3 e torna o capítulo de paralelismo artificial.

### E2. Definir o símbolo `DEBUG` — **RESOLVIDO**

**Problema:** `Debug.Assert` era compilado fora, então a lição `s06c03l04` não podia funcionar.

**Solução implementada:** `CompilationService.cs` agora encadeia `.WithPreprocessorSymbols("DEBUG")` na construção de `ParseOptions`. Sondado ponta a ponta: `#if DEBUG` compila o ramo correto, asserção verdadeira é invisível e o programa segue, e asserção falsa **encerra o processo** — a mensagem `Assertion failed.` vai para o stderr e o stdout é truncado no ponto da falha. Regressão completa nas 350 lições anteriores ficou verde.

**Consequência para o conteúdo:** uma asserção que falha não é capturável com `catch`. Desafios que usam `Debug.Assert` precisam de asserções que sempre passem; o comportamento de falha é ensinado por bloco de saída, não por teste.

**Alternativa descartada:** reescrever a lição em torno de `Trace.Assert` ou de um helper próprio.

### E3. Nullability configurável por lição — **RESOLVIDO**

**Problema:** o capítulo `s08c04` ensina análise de fluxo de nulos, e o engine desligava exatamente essa análise.

**Solução implementada:** campo `challenge.nullable?: 'annotations' | 'enabled'` em `web/src/content/types.ts`, propagado por `lib/api.ts`, `ChallengeStep.tsx` e `scripts/check-content.mts` até o `ExecuteRequest`. No backend, o enum `NullableMode` em `Contracts.cs` e `CompilationService.OptionsFor(...)` escolhem o `NullableContextOptions`. O modo entra na chave do cache de compilação — sem isso, o mesmo código compilado nos dois modos devolveria o diagnóstico errado.

**Armadilha encontrada e medida:** o valor óbvio, `NullableContextOptions.Warnings`, **não funciona**. Ele liga os avisos mas desliga as *anotações*, então todo tipo de referência vira "oblivious" e a análise de fluxo não tem o que analisar — medido, um `return null;` de um método `string` fica em silêncio absoluto. O valor certo é `NullableContextOptions.Enable`, que liga as duas coisas. Por isso o modo se chama `enabled`, e não `warnings` como esta ficha propunha antes.

**Diagnósticos confirmados por sonda** (todos como `Warning`, não `Error` — o programa continua compilando e os testes rodam):

| Código | Situação |
| --- | --- |
| CS8600 | `string b = talvez;` — atribuir possível nulo a não-anulável |
| CS8602 | `talvez.Length` — desreferenciar possível nulo |
| CS8603 | `return null;` de um método que devolve `string` |
| CS8604 | passar possível nulo para parâmetro não-anulável |
| CS8618 | campo não-anulável não inicializado no construtor |

**Estreitamento (narrowing) confirmado:** o compilador para de avisar depois de `if (a == null) return;`, dentro de `if (a is not null)`, e — o caso mais interessante para o conteúdo — **depois de uma desreferência**: se `a.Length` não estourou, `a` é tratado como não-nulo daí em diante. `TryGetValue(out string? valor)` também é entendido, e `valor.Length` dentro do `if` não gera aviso.

**Consequência para o conteúdo:** avisos **não reprovam** o teste. O desafio cobra comportamento em tempo de execução; os avisos aparecem no painel de diagnósticos do `ChallengeStep`, que já os exibia. A solução de referência de cada lição do capítulo deve sair **sem avisos**, para que o painel limpo seja o sinal de acerto.

### E4. Decidir a estratégia da Seção 10 — bloqueia S10 inteira

Este é o item mais importante do documento e o único que não tem solução óbvia. Está detalhado na ficha da Seção 10, abaixo, com duas opções e uma recomendação.

### E5. Arquivos de apoio (opcional)

**Problema:** como cada execução tem diretório limpo, toda lição de arquivo precisa escrever antes de ler. Isso é aceitável na maioria dos casos e até pedagogicamente útil, mas impede exercícios do tipo "processe este CSV de 200 linhas".

**Solução, se valer a pena:** um campo `challenge.files?: Array<{ name: string; content: string }>` que o `ProgramRunner` materializa no diretório de trabalho antes de executar. Deixa `s09c05l09` ("Prática: importando CSV") e `s09c07` (ETL) muito mais realistas.

**Prioridade:** baixa. Só faça se a Seção 9 parecer artificial sem isso.

---

## 5. Ordem de execução

A ordem é **linear, 2 → 10**, e isso não é falta de imaginação: é consequência da regra de que a solução de referência só usa construções já ensinadas. Não é possível escrever com segurança a Seção 5 antes da 4, porque é a Seção 4 que define o vocabulário disponível naquele ponto.

O que **pode** ser paralelizado é o trabalho de engine. Recomendo esta sequência:

1. **Agora:** E1 (comparação sem ordem) e E2 (`DEBUG`). São pequenos, e E1 já é necessário na Seção 3.
2. **Agora:** tomar a decisão E4 (estratégia da Seção 10), porque ela pode mudar o escopo do projeto.
3. **Seções 2, 3, 4, 5** em sequência, um capítulo por vez.
4. **Antes da Seção 6:** confirmar E2 funcionando.
5. **Antes da Seção 8:** implementar E3.
6. **Antes da Seção 9:** decidir sobre E5.
7. **Seção 10** por último, seguindo a decisão de E4.

---

## 6. Fichas por seção

Cada ficha diz o que muda em relação à Seção 1, onde estão as armadilhas de teste e quais lições nominalmente precisam de tratamento especial. Os títulos de capítulo citados são os que já estão no `curriculum.ts`.

### Seção 2 — Lógica & Repetição

*Capítulos: while, for, controle de fluxo, padrões numéricos, desenhando com loops, acumuladores e estatísticas, problemas com laços.*

**Novidade técnica:** o primeiro laço do curso. A partir daqui as soluções de referência podem repetir código, o que alivia enormemente a restrição que travou a Seção 1.

**Riscos de teste:**
- **Laço infinito.** O capítulo 1 tem uma lição chamada "Laço infinito: causa e cura". O aluno vai escrever laços infinitos de propósito e por acidente. O timeout de 5 s cobre isso, mas confirme que a mensagem de timeout no `ChallengeStep` é clara o suficiente para ele entender que travou, e não que errou a lógica.
- **`Adivinhe o número`** (`s02c07l04`) depende de aleatoriedade. Use `new Random(42)`: a sonda confirmou que a sequência é estável (`67, 15, 13`). Documente a semente no enunciado, senão o aluno não tem como acertar a saída esperada.
- **Desenho no console** (capítulo 5 inteiro): espaços à direita são invisíveis e destroem a comparação. O modo `trimmed` já apara o fim de cada linha, o que salva pirâmides e losangos. Vale um teste explícito com `exact` em uma lição para o aluno perceber a diferença.

**Convenção a adotar:** nas lições de desenho, sempre mostrar a saída esperada em um bloco `output`, porque descrever uma pirâmide em texto não funciona.

### Seção 3 — Coleções & Estruturas de Dados

*Capítulos: arrays, `List<T>`, `Dictionary`, conjuntos/filas/pilhas, matrizes, tuplas, escolhendo a estrutura certa.*

**Novidade técnica:** primeira seção que depende de **E1 (comparação sem ordem)**. Não comece o capítulo 3 antes de resolver isso.

**Riscos de teste:**
- **Ordem de enumeração de `Dictionary` e `HashSet` não é contratual.** Na prática, hoje, a enumeração de um `Dictionary` sem remoções segue a ordem de inserção — mas isso é detalhe de implementação, não garantia. Escrever 20 lições apoiadas nisso é construir sobre areia. Use `unordered` (E1) ou ordene explicitamente.
- **`Prática: campo minado`** (`s03c05l09`) precisa de grid determinístico. Ou receba o campo via `stdin`, ou use `Random` com semente fixa.
- **Índice fora dos limites** vira `IndexOutOfRangeException`. O `CodeQuest.Runner` já traduz isso para mensagem em português, então é um bom material didático: vale uma lição que provoca o erro de propósito.

**Convenção a adotar:** quando a lição imprime uma coleção, o enunciado deve dizer **em que ordem**. "Imprima os pares" é ambíguo; "imprima os pares em ordem alfabética de chave" é testável.

### Seção 4 — Métodos & Estilo Funcional

*Capítulos: métodos, assinaturas avançadas, recursão, delegates e lambdas, LINQ essencial, LINQ avançado, compondo soluções.*

**Novidade técnica:** métodos próprios, o que muda o `starterCode`. Até aqui ele era sempre `class Program { static void Main() { } }`. Daqui em diante o esqueleto deve incluir a assinatura do método que o aluno precisa preencher, senão o teste não tem como chamá-lo.

**Riscos de teste:**
- **Recursão infinita** derruba o processo com `Stack overflow.` em ~0,5 s (sondado). Não trava o servidor, mas o stderr é enorme e repetitivo. Confirme que o `ChallengeStep` corta essa saída de forma legível — é o erro mais provável do capítulo 3.
- **`Fibonacci recursivo e seu custo`** (`s04c03l04`) é uma lição sobre lentidão. Com 50 milhões de operações em 200 ms de folga, `fib(35)` roda rápido demais para o aluno sentir o problema. Escolha um `n` que realmente demore (por volta de 40 a 45) ou faça a lição contar chamadas em vez de medir tempo.
- **Execução diferida do LINQ** (`s04c06l07`) é conceitual e difícil de testar por saída. Uma boa saída é o aluno imprimir dentro de um `Where` para ver *quando* o predicado roda — o resultado é uma sequência de linhas perfeitamente determinística.

**Convenção a adotar:** a partir daqui, `starterCode` inclui a assinatura exata que os testes esperam, e `requirements` diz explicitamente "não mude a assinatura de `X`".

### Seção 5 — Programação Orientada a Objetos

*Capítulos: classes e objetos, encapsulamento, herança, polimorfismo, interfaces, tipos de valor e records, modelando domínios.*

**Novidade técnica:** a sonda confirmou que classes abstratas, construtores primários, `record` e igualdade estrutural funcionam no mesmo arquivo. Nada de engine é necessário.

**Riscos de teste:**
- **Volume de código.** É a seção onde `starterCode` e `solution` ficam maiores. Espere capítulos de 2.000+ linhas. Considere reduzir a 2 testes por lição para compensar.
- **Testar desenho de classes por saída de console é indireto.** "Encapsulamento correto" não aparece no stdout. A saída honesta é fazer o `Main` exercitar a classe de fora: tentar atribuir valor inválido e imprimir a mensagem de validação, por exemplo. Formule os `requirements` em termos de comportamento observável, nunca "use uma propriedade privada".
- **`Prática: sobrescrevendo ToString`** (`s05c01l09`) é ótima justamente porque `ToString` é observável. Use lições assim como âncora do capítulo.

**Convenção a adotar:** todo desafio de POO tem um `Main` que serve de "banco de testes" e já vem escrito no `starterCode`. O aluno preenche as classes; o `Main` fica intacto. Isso torna a saída determinística e deixa claro o contrato.

### Seção 6 — Erros, Testes & Qualidade

*Capítulos: exceções, falhando de forma robusta, depuração, testes, código legível, refatoração, princípios de design.*

**Novidade técnica:** depende de **E2 (`DEBUG` definido)** para a lição `s06c03l04`.

**Riscos de teste:**
- **O capítulo 4 é sobre testes, e o engine não tem framework de teste.** Sem xUnit, sem `[Fact]`, sem `Assert.Equal`. A saída viável e honesta: o aluno escreve o próprio micro-arcabouço — um helper `static void Verificar(string nome, bool condicao)` que imprime `PASS nome` ou `FAIL nome` — e os testes da lição comparam o relatório. Isso ensina Arrange/Act/Assert de verdade, e como bônus mostra que um framework de teste não é mágica. As lições "Anatomia de um teste", "Arrange, Act, Assert" e "Testes parametrizados" ficam naturais nesse formato; "O que cobertura mede (e o que não)" fica conceitual, com desafio adjacente.
- **Capítulos 5, 6 e 7 são sobre qualidade de código, não sobre comportamento.** Refatoração correta, por definição, não muda a saída. Duas estratégias que funcionam: (a) o `starterCode` traz código feio *com um bug*, e refatorar revela o bug; (b) o desafio pede a versão refatorada e os testes garantem que o comportamento não mudou, com o quiz cobrando o *porquê* da refatoração. A opção (a) é muito mais engajante e deve ser a preferida.
- **Exceções são testáveis com facilidade**, porque o `CodeQuest.Runner` traduz a exceção e o exit code muda. Um teste pode esperar a mensagem tratada no stdout.

**Convenção a adotar:** em lições de refatoração, o `starterCode` é código ruim *que funciona*, e os `requirements` incluem "a saída deve continuar idêntica". O aprendizado está no quiz e no callout, não na saída.

### Seção 7 — Algoritmos & Resolução de Problemas

*Capítulos: complexidade, busca, ordenação, técnicas de array, strings e algoritmos, backtracking e DP, grafos e árvores.*

**Novidade técnica:** nenhuma. É a seção mais pesada em raciocínio e a mais leve em recursos de linguagem — tudo que ela precisa já foi ensinado nas seções 2 a 4.

**Riscos de teste:**
- **A folga de desempenho é enorme** (50 milhões de iterações em 203 ms), então entradas grandes são viáveis. Isso é uma oportunidade: dá para escrever um teste que só passa com a solução eficiente.
- **Correção medida:** a versão anterior desta ficha afirmava que "uma busca linear em 10 milhões de elementos contra busca binária é a diferença entre estourar e não estourar o timeout". **É falso** — medido, esse caso roda em 9 ms. Os limiares reais, usados nas lições escritas, são: 5 milhões de elementos × 20.000 consultas (linear ≈ 16,8 s contra binária ≈ 1 ms) e 50.000 elementos para reprovar ordenação O(n²).
- **Prefira contar operações a cronometrar.** A contagem é determinística e o tempo não; o capítulo 1 conta comparações e chamadas em vez de medir milissegundos.
- **A recursão morre em ~24.000 chamadas aninhadas** (medido: 15.000 passa, 30.000 estoura com `Repeated 24085 times`), e um estouro de pilha **não é capturável** — derruba o processo. Consequência para o capítulo 7: DFS recursivo só em grafos comprovadamente rasos; grafos grandes exigem `Stack<int>` explícita, e ciclo em grafo dirigido grande se detecta por Kahn, não por recursão.
- **Gerar entradas grandes via `stdin` é impraticável** (o `expectedStdout` do teste viraria um monstro). Faça o programa *gerar* a entrada com `Random(semente)` ou por fórmula, e imprimir só o resultado agregado.
- **Backtracking pode explodir.** N-Rainhas para n=8 é instantâneo; para n=13 não termina. Fixe o n nos `requirements`.
- **Permutações e subconjuntos** têm ordem de geração dependente da implementação. Ou fixe a ordem no enunciado ("em ordem lexicográfica"), ou use `unordered` (E1), ou peça apenas a contagem.

**Convenção a adotar:** todo desafio de algoritmo declara explicitamente a complexidade esperada nos `requirements`, e pelo menos um teste é grande o suficiente para reprovar a solução ingênua.

### Seção 8 — C# Avançado & Moderno

*Capítulos: genéricos, extensões e APIs fluentes, pattern matching, nullability, iteradores e sequências, memória e desempenho, recursos modernos.*

**Novidade técnica:** depende de **E3 (nullability em modo `enabled`)** para o capítulo 4 — **já resolvido**. O capítulo 7 usa `reflection`, já sondado e funcional.

**Riscos de teste:**
- **O capítulo 4 depende de E3**, agora implementado: cada lição de nullability declara `nullable: 'enabled'` no desafio. Sem isso as 10 lições viram teoria sem demonstração — o aluno lê que o compilador avisa, roda o código, e nenhum aviso aparece.
- **`Span<T>` e desempenho** (capítulo 6) são sobre custo, não sobre resultado. `Stopwatch` em um sandbox compartilhado dá números instáveis. Prefira desafios de *correção* usando `Span` (fatiar sem alocar) e deixe a medição para blocos `output` no conceito, com números que você mediu e fixou no texto.
- **Sequências infinitas com `yield`** (`s08c05l05`) travam se o aluno esquecer o `Take`. É um erro didático excelente e o timeout cobre — mas escreva a dica antecipando isso.
- **Boxing e unboxing** (`s08c06l02`) é observável via `object o = 42;` e comparação de referências. Testável.

**Convenção a adotar:** quando a lição é sobre desempenho, o número vai no conceito (medido e fixado por você) e o desafio cobra correção. Nunca teste tempo.

**Descobertas do ambiente, medidas ao escrever a seção:**
- `unsafe` e `stackalloc` estão **desativados** no sandbox. O capítulo 6 trata `Span<T>` sem eles, o que não custou nada — `AsSpan` e `ArrayPool<T>` cobrem tudo o que a seção precisa.
- `GC.GetTotalAllocatedBytes(true)` funciona e é a forma reprodutível de medir custo. **Compare com booleano**, nunca imprima o número de bytes: ele varia com a versão do runtime.
- Reflexão exige a capability `reflection` no desafio. Os três desafios do capítulo 7 que a usam a declaram.
- Um `
` dentro de um literal C# escrito num template literal do TypeScript vira **quebra de linha real** e não compila. Use `Environment.NewLine` ou escape duplo.

### Seção 9 — Assíncrono, Concorrência & Dados

*Capítulos: fundamentos de async, controlando a execução, paralelismo, concorrência segura, arquivos e streams, JSON e serialização, integrando dados.*

**Novidade técnica:** `async Task Main` funciona (sondado). `System.Text.Json` está disponível (sondado). Arquivos funcionam com `capabilities: ['fileSystem']` (sondado).

**Riscos de teste:**
- **O capítulo 3 (paralelismo) exige E1.** Não há como testar `Parallel.For` sem comparação insensível a ordem, como a sonda demonstrou. Sem E1, esse capítulo precisa que toda saída seja coletada e ordenada antes de imprimir, o que esconde justamente o que a lição quer mostrar.
- **Não existe fixture de arquivo** (sondado): cada teste roda em diretório novo. Toda lição do capítulo 5 escreve o arquivo e depois o lê. É até didático — "programa que gera e consome seu próprio arquivo" — mas impede exercícios com dados pré-existentes. Se isso incomodar, implemente E5.
- **`Task.Delay` conta contra o timeout de 5 s.** Delays devem ser de 50 a 200 ms, nunca segundos. Vale um `timeoutMs` maior nas lições de cancelamento e retentativa com backoff.
- **`Task.WhenAny` e corrida** (`s09c01l09`) são inerentemente não determinísticos. Force o resultado: uma task com `Delay(10)` e outra com `Delay(500)` sempre resolve a mesma primeiro, com margem confortável.
- **Condição de corrida** (`s09c04l01`) é uma lição que *precisa* de resultado errado para ensinar. Um contador incrementado por 10 mil tasks sem `lock` dá um número menor que 10 mil — mas *qual* número é imprevisível. Teste a propriedade, não o valor: peça ao aluno imprimir `soma < esperado` (um `bool`), o que é determinístico na prática.
- **"Consumindo uma API simulada"** (`s09c07l04`) deve ser simulada em memória. Não conceda a capability `network`: um sandbox de aprendizado não deve fazer chamadas externas, e o teste ficaria dependente de rede.

**Convenção a adotar:** nenhuma lição desta seção depende de tempo real de parede para passar. Onde a concorrência é o assunto, teste uma *propriedade* verificável (ordenação, invariante, comparação booleana), nunca um valor exato produzido por escalonamento.

**Margem mínima medida:** quando o teste depende da **ordem de conclusão** de tarefas, o espaçamento entre os `Task.Delay` precisa ser de **pelo menos 40 ms**. Com 15 ms a ordem é correta em execução isolada mas falha de forma intermitente sob a carga de uma compilação nova — verificado em `s09c01l04`, que reprovou 1 vez em 3 com 15 ms e passou 5 de 5 com 40 ms. Ordem de conclusão é uma propriedade legítima de testar; o espaçamento é que precisa ser folgado.

**Condição de corrida confirmada:** 100 tarefas × 1000 incrementos sem `lock` dá resultado menor que 100.000 em 3 de 3 execuções. O teste da lição `s09c04l01` pode afirmar `soma != esperado` com segurança.

### Seção 10 — .NET na Prática

*Capítulos: anatomia de uma aplicação, injeção de dependência, Minimal APIs, persistência, arquitetura, qualidade em produção, projeto final.*

**Esta seção é o único problema estrutural do projeto e precisa de uma decisão antes de qualquer linha de conteúdo.**

O engine executa **um arquivo, sem NuGet, sem servidor web, sem banco de dados**. A Seção 10, como está no currículo, pressupõe as três coisas: `csproj` e pacotes (capítulo 1), Minimal APIs (capítulo 3), EF Core e migrations (capítulo 4), testes de integração e OpenAPI (capítulo 6).

#### Opção A — Ensinar por simulação em um arquivo (recomendada)

Manter o engine como está e reescrever os desafios para que o aluno **construa uma versão mínima do conceito** em vez de usar o framework. Não é um contorno: é frequentemente melhor pedagogia, porque quem já implementou um contêiner de DI de 30 linhas entende `AddScoped` para sempre.

Como cada capítulo se traduz:

- **Injeção de dependência:** o aluno implementa um contêiner com `Dictionary<Type, Func<object>>` e três ciclos de vida. É um dos melhores exercícios possíveis sobre o assunto.
- **Minimal APIs:** o aluno implementa um roteador — um dicionário de `"GET /produtos"` para handlers — e um driver lê linhas de requisição do `stdin` e imprime status e corpo. Rotas, verbos, parâmetros, códigos de status e validação ficam todos testáveis com precisão.
- **Persistência:** um repositório em memória com rastreamento de mudanças e um `SaveChanges` que aplica o lote. Ensina unidade de trabalho de verdade; migrations viram conteúdo conceitual.
- **Arquitetura e camadas:** funciona bem sem framework, porque é sobre organização e dependências. Um arquivo com namespaces separados demonstra o ponto.
- **Qualidade em produção:** health checks, validação de configuração na inicialização e tratamento global de erros são todos implementáveis como funções puras testáveis.
- **Projeto final:** um sistema completo em um arquivo, construído incrementalmente pelos 10 nós do capítulo. Ambicioso, mas viável.

Os `csproj`, `appsettings`, comandos da CLI e OpenAPI, que não têm como rodar, viram **conteúdo de conceito rico** (blocos de código, tabelas, callouts) com desafio adjacente testável.

**Custo:** zero de engenharia, alto de criatividade na autoria.

#### Opção B — Estender o engine para projetos reais

Suportar múltiplos arquivos, referências NuGet, `dotnet test` com xUnit e um servidor de teste in-process.

**Custo:** é praticamente um segundo produto. Compilação passa a ser build de projeto, o cache por hash de código não serve mais, o tempo de execução sai de 200 ms para dezenas de segundos, a superfície de segurança cresce muito e o `check:content` fica lento demais para rodar em todas as lições.

**Benefício:** fidelidade total ao trabalho real, e a Seção 6 capítulo 4 (testes) também ganharia xUnit de verdade.

#### Recomendação

**Opção A**, com uma ressalva honesta: registre no conteúdo que a Seção 10 ensina os *conceitos* com implementações mínimas, e aponte a documentação oficial para o passo seguinte. Um aluno que chega ao fim dela sabe *por que* `AddScoped` existe e o que ele faz por dentro; vai precisar de um tutorial de ASP.NET Core para escrever a primeira API de produção. Essa é uma troca aceitável e deve ser dita ao aluno, não escondida.

Se a Opção B for escolhida, ela deve ser tratada como um projeto próprio, planejado depois que as Seções 2 a 9 estiverem completas — não como pré-requisito da Seção 10.

---

## 7. O loop de autoria de um capítulo

Este é o processo que funcionou nos sete capítulos da Seção 1. Um capítulo por vez, do começo ao fim, sem pular etapa.

1. **Ler os 10 títulos** do capítulo em `curriculum.ts`. Eles são o contrato; não mude títulos sem mudar o currículo.
2. **Listar o vocabulário disponível**: tudo que foi ensinado até o capítulo anterior. Escreva essa lista antes de codar — é o que impede o erro do `for` prematuro que aconteceu na Seção 1.
3. **Definir o arco do capítulo**: lições 1 a 8 introduzem um conceito cada, a 9 é `Prática:` (aplicação combinada), a 10 é `Checkpoint:` (ou `Boss:` no último capítulo da seção) e integra tudo.
4. **Criar o arquivo stub** `web/src/content/lessons/sNN/cNN.ts` com o import, o `export const lessons: Lesson[] = [` e um marcador `// <<APPEND>>` no fim.
5. **Escrever de 2 a 3 lições por vez**, substituindo o marcador. Escrever as 10 de uma vez estoura o limite da ferramenta de escrita e o arquivo sai truncado — foi um erro real na Seção 1.
6. **Calcular a saída esperada à mão e desconfiar do resultado.** Metade dos bugs da Seção 1 foram valores esperados errados: precisão de `decimal` que acumula escala na multiplicação, `P1` que gera `8.3 %` com espaço na cultura invariante, arredondamento de `16.22` contra `16.23`, empate de receita que muda quem é o destaque. **Nunca confie na aritmética feita de cabeça.**
7. **Rodar o verificador só do capítulo**: `npm run check:content -- sNNcNN`. Ele aceita prefixo de id, então dá para verificar um capítulo em segundos em vez de esperar as 70+ lições.
8. **Corrigir e repetir** até verde. Quando a solução de referência falha no próprio teste, o problema é quase sempre o valor esperado, não a solução.
9. **Rodar `npm run typecheck`.** O verificador de conteúdo não checa tipos. Os erros de `kind` de bloco inválido só aparecem aqui.
10. **Abrir 2 ou 3 lições no navegador.** O verificador não vê layout. Confira que o conceito na coluna esquerda não tem código largo demais e que os blocos `compare` e `sideBySide` estão legíveis na versão compacta.

### Comandos do dia a dia

```bash
npm run dev                          # API + frontend
npm run check:content -- s02c01      # verifica um capítulo
npm run check:content -- s02         # verifica uma seção
npm run check:content                # verifica tudo
npm run typecheck                    # tipos do TypeScript
npx tsx scripts/probe-engine.mts     # premissas do engine continuam válidas?
```

---

## 8. Definição de pronto

### Um capítulo está pronto quando

- As 10 lições existem, com ids que casam exatamente com o `curriculum.ts`.
- Cada lição tem objetivo, 4 a 7 blocos de conceito, 3 perguntas de quiz com explicação e um desafio com 2 dicas.
- Cada desafio tem pelo menos 2 testes, um deles `hidden: true` cobrindo caso de borda.
- Nenhuma solução de referência usa construção não ensinada até ali.
- `npm run check:content -- sNNcNN` passa.
- `npm run typecheck` passa.
- Pelo menos duas lições foram abertas no navegador e o conceito lateral está legível.

### Uma seção está pronta quando

- Os 7 capítulos estão prontos.
- O `Boss:` do capítulo 7 integra os assuntos dos 7 capítulos, não só do último.
- `npm run check:content -- sNN` passa inteiro.
- A trilha da seção foi percorrida no navegador do primeiro ao último nó, confirmando desbloqueio progressivo.
- `npm run build` passa.

---

## 9. Esforço e faseamento

Estimativa em capítulos, a unidade natural de trabalho. Cada capítulo é ~1.500 linhas, 10 lições, 30 perguntas e ~20 testes.

| Fase | Escopo | Capítulos | Observação |
| --- | --- | --- | --- |
| 0 | Engine: E1 + E2, decisão de E4 | — | pequeno, desbloqueia S3 e S6 |
| 1 | Seção 2 (Lógica & Repetição) | 7 | menor risco, alto ganho: libera o vocabulário de laços |
| 2 | Seção 3 (Coleções) | 7 | precisa de E1 |
| 3 | Seção 4 (Métodos & LINQ) | 7 | muda a convenção de `starterCode` |
| 4 | Seção 5 (POO) | 7 | capítulos maiores; considere 2 testes por lição |
| 5 | Seção 6 (Erros & Qualidade) | 7 | precisa de E2; capítulo de testes exige formato próprio |
| 6 | Seção 7 (Algoritmos) | 7 | mais denso em raciocínio, mais leve em linguagem |
| 7 | Engine: E3 | — | **resolvido** |
| 8 | Seção 8 (C# Avançado) | 7 | **concluída** |
| 9 | Engine: E5 se necessário | — | avaliar ao chegar |
| 10 | Seção 9 (Async & Dados) | 7 | precisa de E1; muito cuidado com determinismo |
| 11 | Seção 10 (.NET na Prática) | 7 | conforme a decisão de E4 |

Total: **63 capítulos** de conteúdo mais três intervenções pequenas de engine.

Ordem de valor entregue: a Seção 2 é a de maior retorno imediato, porque laços destravam quase todo o resto do currículo e porque é a continuação natural para quem terminou a Seção 1. Se o objetivo for ter algo jogável e coerente rápido, **Seções 2, 3 e 4 já formam um curso completo de fundamentos a LINQ** — 280 lições, que é mais do que muitos cursos pagos entregam.

---

## 10. Riscos e mitigações

**O risco dominante é aritmética errada no `expectedStdout`.** Foi a causa de praticamente todos os retrabalhos da Seção 1. Mitigação: o `check:content` já pega 100% desses casos, então o hábito certo é rodá-lo por capítulo, cedo e sempre, em vez de escrever 10 lições e verificar no fim.

**Vocabulário adiantado.** Usar um recurso ainda não ensinado passa no verificador (o código compila e os testes passam) e só é percebido por revisão humana. Mitigação: a etapa 2 do loop de autoria, escrever a lista de vocabulário disponível antes de começar o capítulo.

**Não determinismo.** Coleções sem ordem garantida, paralelismo, aleatoriedade e tempo. Mitigação: E1 no engine, semente fixa em `Random`, e a regra de testar propriedades em vez de valores nas lições de concorrência.

**Deriva de qualidade ao longo de 630 lições.** As primeiras lições de uma sessão tendem a ser mais ricas que as últimas. Mitigação: a definição de pronto acima, aplicada por capítulo, e os números do molde (3 perguntas, 2 testes, 2 dicas, 1 callout de armadilha) como piso não negociável.

**Arquivos grandes.** Capítulos da Seção 5 podem passar de 2.000 linhas, o que dificulta edição. Mitigação: escrever em lotes de 2 a 3 lições e usar o marcador `// <<APPEND>>`.

**Seção 10 fora do alcance do engine.** É o único risco de escopo, e o item E4 existe para resolvê-lo por decisão explícita em vez de descoberta no meio do caminho.

---

## 11. Decisões pendentes

Três decisões mudam o plano e devem ser tomadas antes da Fase 1:

1. **Estratégia da Seção 10** — simulação em um arquivo (Opção A, recomendada) ou estender o engine para projetos reais (Opção B).
2. **Comparação insensível a ordem (E1)** — implementar no engine, ou exigir ordenação explícita em todo o conteúdo de coleções e paralelismo.
3. **Ritmo de entrega** — uma seção por vez até a 10, ou parar na Seção 4 e ter um curso de fundamentos completo em 280 lições antes de decidir se continua.

