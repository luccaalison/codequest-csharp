# CodeQuest C#

Jogo de aprendizado de C# e .NET no estilo Duolingo. Cada lição tem três etapas: **conceito** explicado com exemplos, **quiz** de múltipla escolha, e um **desafio técnico** onde o código do aluno é compilado e executado de verdade contra uma bateria de testes.

Inspirado na estrutura da [journey de C# do Coddy](https://coddy.tech/journeys/csharp), mas com 10 seções em vez de 3 e foco explícito em resolução de problemas.

Não há vidas, XP, níveis nem ranking: nada limita quantas tentativas o aluno faz nem cria pressa. A partir da primeira pergunta o **conceito fica fixo na coluna esquerda**, então dá para reler a teoria sem sair do exercício.

## O que já está pronto

| Parte | Estado |
| --- | --- |
| Engine de execução de C# (Roslyn + sandbox) | funcional |
| Player de lição (conceito → quiz → desafio) | funcional |
| Conceito fixo ao lado das perguntas e do desafio | funcional |
| Mapa curricular | 10 seções, 70 capítulos, 700 lições |
| Conteúdo autorado | **Seções 1 a 8 completas (560 lições)** |
| Verificador automático de conteúdo | funcional |

As seções 9 e 10 já têm todos os títulos de capítulo e lição definidos em `web/src/content/curriculum.ts`. A trilha exibe as lições ainda não autoradas como bloqueadas, então o app funciona normalmente enquanto o conteúdo é escrito.

Para escrever as 140 lições restantes, siga o [plano das seções 2 a 10](PLANO-SECOES-2-A-10.md): ele traz o loop de autoria por capítulo, as armadilhas específicas de cada seção e as correções de engine que precisam vir antes de certos capítulos.

## Requisitos

- [.NET SDK 10](https://dotnet.microsoft.com/download) (ou superior)
- [Node.js 20](https://nodejs.org/) (ou superior)
- [Git](https://git-scm.com/downloads)

Verifique com `dotnet --version`, `node --version` e `git --version`.

## Baixando o projeto

```bash
git clone https://github.com/luccaalison/codequest-csharp.git
cd codequest-csharp
```

## Rodando

```bash
npm install          # dependências do orquestrador
npm run setup        # instala o frontend e compila o backend
npm run dev          # sobe API (:5239) e frontend (:5173) juntos
```

Abra <http://localhost:5173>.

O frontend precisa da API no ar para os desafios de código funcionarem. O quiz e o conteúdo funcionam offline, e a interface avisa quando a API está inacessível.

### Scripts disponíveis

| Comando | O que faz |
| --- | --- |
| `npm run dev` | API e frontend em paralelo, com hot reload |
| `npm run dev:api` | só a API, em `http://localhost:5239` |
| `npm run dev:web` | só o frontend, em `http://localhost:5173` |
| `npm run build` | build de produção do frontend e do backend |
| `npm run typecheck` | checagem de tipos do TypeScript |
| `npm run check:content` | roda a solução de cada lição contra os próprios testes |
| `npm run check:content -- s02c01` | verifica só uma seção ou um capítulo (aceita prefixo de id) |
| `npx tsx scripts/probe-engine.mts` | confirma que o engine ainda atende às premissas do plano de conteúdo |

## Arquitetura

```
Code_skill/
├── server/
│   ├── CodeQuest.Api/          # Minimal API: compila e executa código do aluno
│   │   ├── Program.cs          # endpoints /api/health e /api/execute
│   │   ├── Contracts.cs        # DTOs de request/response
│   │   └── Sandbox/
│   │       ├── SecurityGuard.cs        # denylist sintática (Process, Registry, etc.)
│   │       ├── CompilationService.cs   # Roslyn: código → assembly, com cache
│   │       ├── ProgramRunner.cs        # execução em processo filho com timeout
│   │       └── SubmissionEvaluator.cs  # orquestra guard → compile → testes
│   └── CodeQuest.Runner/       # host isolado que roda o assembly do aluno
└── web/
    ├── src/
    │   ├── content/
    │   │   ├── types.ts        # modelo de conteúdo (seção, capítulo, lição, desafio)
    │   │   ├── curriculum.ts   # mapa das 10 seções / 70 capítulos / 700 lições
    │   │   ├── index.ts        # registro automático via import.meta.glob
    │   │   └── lessons/s01/    # conteúdo autorado (c01.ts … c07.ts)
    │   ├── components/lesson/  # ConceptStep/ConceptAside, QuizStep, ChallengeStep, LessonComplete
    │   ├── pages/              # Programa, Seção, Lição, Ajustes
    │   ├── store/progress.ts   # lições concluídas e rascunhos (persistido em localStorage)
    │   └── lib/api.ts          # cliente da API de execução
    └── scripts/check-content.mts   # verificador automático de conteúdo
```

### Como o código do aluno é executado

O caminho de uma submissão é deliberadamente paranoico:

1. **SecurityGuard** faz análise sintática com Roslyn e rejeita construções perigosas (`Process`, `Registry`, `System.Reflection.Emit`, acesso a rede, entre outras) antes de qualquer compilação. Lições avançadas podem liberar capacidades específicas.
2. **CompilationService** compila com Roslyn para um assembly em disco, com cache por hash do código. Erros e avisos voltam como diagnósticos com linha e coluna, exibidos no editor.
3. **ProgramRunner** lança o `CodeQuest.Runner` em um processo filho separado, com timeout, saída limitada e stdin controlado. Cada caso de teste roda em seu próprio processo.
4. **CodeQuest.Runner** carrega o assembly do aluno e chama o entry point dentro de um `try/catch`, traduzindo exceções em mensagens em português. Isso também evita que o Windows Error Reporting sequestre o processo e cause travamentos de vários segundos.
5. **SubmissionEvaluator** compara a saída com o esperado usando o modo de comparação da lição (`Trimmed`, `Exact`, `IgnoreCase` ou `Tokens`) e agrega o resultado.

A API tem rate limiting no endpoint `/api/execute` e CORS restrito às origens de desenvolvimento.

## Escrevendo conteúdo

Cada capítulo é um arquivo em `web/src/content/lessons/sNN/cNN.ts` que exporta um array `lessons`. Não existe registro para atualizar: `content/index.ts` descobre os arquivos automaticamente com `import.meta.glob`.

Uma lição tem esta forma:

```ts
{
  id: 's01c03l01',              // sSS + cCC + lLL, precisa casar com o curriculum
  title: 'Operadores aritméticos',
  objective: 'O que o aluno sai sabendo fazer.',
  concept: [ /* blocos de conteúdo */ ],
  quiz: [ /* perguntas de múltipla escolha */ ],
  challenge: { /* desafio de código com testes */ },
}
```

### Blocos de conceito

| `kind` | Uso |
| --- | --- |
| `text` | parágrafo com markdown leve (`` `code` ``, `**negrito**`, `*itálico*`) |
| `code` | trecho de C# com destaque de sintaxe e `caption` opcional |
| `output` | saída de console esperada |
| `callout` | destaque com `tone: 'tip' \| 'warn' \| 'insight'` |
| `compare` | lado a lado "faça assim / evite" (`good` / `bad`) |
| `sideBySide` | duas alternativas neutras (`left` / `right` / `note`) |
| `table` | tabela com `headers` e `rows` |

Cada bloco é renderizado duas vezes: em largura total na etapa de conceito e em versão compacta na coluna lateral que acompanha o quiz e o desafio. Na lateral, `compare` e `sideBySide` viram uma única coluna, então evite linhas de código muito longas.

### Desafios

```ts
challenge: {
  brief: 'O enunciado do problema.',
  requirements: ['Cada linha esperada na saída', 'Cada regra de negócio'],
  starterCode: '...',   // código inicial no editor
  solution: '...',      // solução de referência, validada pelo checker
  hints: ['Do mais vago para o mais específico'],
  tests: [
    { name: 'Caso principal', stdin: '8\n5\n', expectedStdout: 'Soma: 13' },
    { name: 'Caso de borda', stdin: '0\n0\n', expectedStdout: 'Soma: 0', hidden: true },
  ],
}
```

### Sempre rode o verificador

```bash
npm run check:content
```

Ele compila e executa a `solution` de **cada** lição contra os próprios `tests`, com a API no ar. Se a solução de referência não passa nos testes, o aluno também não vai passar. Na prática ele pega exatamente os erros que mais aparecem ao escrever conteúdo:

- saída esperada com um valor calculado errado na mão
- precisão de `decimal` diferente do previsto (a escala se acumula na multiplicação)
- formatação dependente de cultura (`P1` gera `18.0 %` com espaço na cultura invariante)
- limites de faixa trocados entre `>` e `>=`

O verificador **não** checa tipos do TypeScript. Rode `npm run typecheck` também.

### Convenções do conteúdo em português

- Todo o conteúdo é em pt-BR, mas identificadores e saídas de programa ficam sem acento, para evitar problemas de codificação no console.
- Valores monetários usam `decimal`; medidas e médias usam `double`.
- Leitura de decimais sempre passa `CultureInfo.InvariantCulture`.
- Soluções de referência usam apenas construções já ensinadas até aquele ponto do currículo.

## Currículo

| Seção | Tema |
| --- | --- |
| 1 | Fundamentos — sintaxe, tipos, operadores, entrada, decisões |
| 2 | Lógica & Repetição — loops, padrões numéricos, raciocínio iterativo |
| 3 | Coleções — arrays, listas, dicionários, busca e ordenação |
| 4 | Métodos & Modularização — decompor problemas, parâmetros, recursão |
| 5 | Orientação a Objetos — classes, encapsulamento, herança, polimorfismo |
| 6 | Tipos Avançados — genéricos, interfaces, records, nullable |
| 7 | LINQ & Dados — consultas, projeções, agregações |
| 8 | Erros & Robustez — exceções, validação, testes, depuração |
| 9 | Assíncrono & Arquivos — async/await, IO, serialização |
| 10 | Projetos & Algoritmos — problemas completos e complexidade |

Cada seção tem 7 capítulos de 10 lições, com práticas ao longo do caminho, um checkpoint no fim de cada capítulo e um boss no fim da seção.
