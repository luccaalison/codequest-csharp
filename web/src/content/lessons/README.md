# Conteúdo das lições

Cada arquivo aqui exporta `lessons: Lesson[]` e é carregado automaticamente por
`src/content/index.ts` via `import.meta.glob`. Para adicionar um capítulo, crie
`sXX/cYY.ts` e exporte o array — não existe registro manual para atualizar.

Convenções:

- Os `id` devem casar exatamente com os gerados em `src/content/curriculum.ts`
  (`sXXcYYlZZ`), senão a lição não aparece na trilha.
- `expectedStdout` é comparado com a saída real após remover espaços no fim de
  cada linha e linhas vazias nas bordas (`comparison: 'trimmed'`, o padrão).
- `solution` precisa passar em todos os testes: ela é a referência usada para
  validar o capítulo pelo script `npm run check:content`.
- XP sugerido: 10 para `lesson`, 12 para `practice`, 20 para `checkpoint` e 40
  para `boss`.
