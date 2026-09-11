/**
 * Content verifier.
 *
 * For every authored lesson it checks the structural rules (ids that exist in the curriculum,
 * exactly one correct option per single-choice question, at least one test) and then sends the
 * lesson's own `solution` to the execution API. A lesson whose reference solution does not pass its
 * own tests is a broken lesson, and this is the only way to catch that without clicking through
 * the UI.
 *
 * Usage: npm run check:content            (checks everything)
 *        npm run check:content -- s01     (only ids starting with s01)
 */
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { curriculum } from '../src/content/curriculum.ts'
import type { Lesson } from '../src/content/types.ts'

const API = process.env.CODEQUEST_API ?? 'http://localhost:5239'
const LESSONS_DIR = fileURLToPath(new URL('../src/content/lessons/', import.meta.url))
const filter = process.argv[2]

interface Problem {
  lessonId: string
  detail: string
}

async function findLessonFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await findLessonFiles(full)))
    else if (entry.name.endsWith('.ts')) files.push(full)
  }

  return files.sort()
}

async function loadLessons(): Promise<Lesson[]> {
  const files = await findLessonFiles(LESSONS_DIR)
  const lessons: Lesson[] = []

  for (const file of files) {
    const module = (await import(pathToFileURL(file).href)) as { lessons?: Lesson[] }
    if (!module.lessons) continue
    lessons.push(...module.lessons)
  }

  return lessons
}

function knownLessonIds(): Set<string> {
  return new Set(
    curriculum.flatMap((section) =>
      section.chapters.flatMap((chapter) => chapter.lessons.map((ref) => ref.id)),
    ),
  )
}

function checkStructure(lesson: Lesson, known: Set<string>): Problem[] {
  const problems: Problem[] = []
  const report = (detail: string) => problems.push({ lessonId: lesson.id, detail })

  if (!known.has(lesson.id)) report('o id não existe em curriculum.ts, a lição nunca vai aparecer')
  if (lesson.quiz.length === 0) report('nenhuma pergunta de múltipla escolha')
  if (lesson.challenge.tests.length === 0) report('o desafio não tem casos de teste')
  if (lesson.challenge.solution.trim() === '') report('o desafio não tem solução de referência')
  if (lesson.objective.trim() === '') report('objetivo vazio')
  if (lesson.concept.length === 0) report('nenhum bloco de conceito')

  const seenQuestionIds = new Set<string>()
  for (const question of lesson.quiz) {
    if (seenQuestionIds.has(question.id)) report(`id de pergunta duplicado: ${question.id}`)
    seenQuestionIds.add(question.id)

    const correct = question.options.filter((option) => option.correct)
    if (question.type === 'single' && correct.length !== 1) {
      report(`${question.id}: pergunta de resposta única com ${correct.length} alternativas corretas`)
    }
    if (question.type === 'multiple' && correct.length < 2) {
      report(`${question.id}: pergunta de múltipla resposta precisa de pelo menos 2 corretas`)
    }
    if (question.options.length < 3) report(`${question.id}: menos de 3 alternativas`)
    if (question.explanation.trim() === '') report(`${question.id}: sem explicação`)
  }

  const seenTestNames = new Set<string>()
  for (const test of lesson.challenge.tests) {
    if (seenTestNames.has(test.name)) {
      report(`nome de teste duplicado: "${test.name}" (o front casa resultados por nome)`)
    }
    seenTestNames.add(test.name)
  }

  return problems
}

async function checkSolution(lesson: Lesson): Promise<Problem[]> {
  const response = await fetch(`${API}/api/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: lesson.challenge.solution,
      tests: lesson.challenge.tests.map((test) => ({
        name: test.name,
        stdin: test.stdin,
        expectedStdout: test.expectedStdout,
        comparison: test.comparison ?? 'trimmed',
        hidden: test.hidden ?? false,
      })),
      timeoutMs: lesson.challenge.timeoutMs,
      capabilities: lesson.challenge.capabilities,
      nullable: lesson.challenge.nullable,
    }),
  })

  if (!response.ok) {
    return [{ lessonId: lesson.id, detail: `a API respondeu ${response.status}` }]
  }

  const result = (await response.json()) as {
    success: boolean
    compiled: boolean
    rejectionReason: string | null
    diagnostics: Array<{ severity: string; line: number; id: string; message: string }>
    results: Array<{ name: string; passed: boolean; expected: string; actual: string; stderr: string }>
  }

  if (result.rejectionReason) {
    return [{ lessonId: lesson.id, detail: `solução rejeitada pelo guard: ${result.rejectionReason}` }]
  }

  if (!result.compiled) {
    return result.diagnostics
      .filter((d) => d.severity === 'Error')
      .map((d) => ({
        lessonId: lesson.id,
        detail: `a solução não compila — linha ${d.line} ${d.id}: ${d.message}`,
      }))
  }

  return result.results
    .filter((r) => !r.passed)
    .map((r) => ({
      lessonId: lesson.id,
      detail:
        `a solução falha no teste "${r.name}"\n` +
        `        esperado: ${JSON.stringify(r.expected)}\n` +
        `        obtido:   ${JSON.stringify(r.actual)}` +
        (r.stderr ? `\n        stderr:   ${r.stderr.split('\n')[0]}` : ''),
    }))
}

async function main() {
  const health = await fetch(`${API}/api/health`).catch(() => null)
  if (!health?.ok) {
    console.error(`Não consegui falar com a API em ${API}.`)
    console.error('Suba o backend primeiro: dotnet run --project server/CodeQuest.Api')
    process.exit(1)
  }

  const all = await loadLessons()
  const lessons = filter ? all.filter((lesson) => lesson.id.startsWith(filter)) : all

  if (lessons.length === 0) {
    console.error(filter ? `Nenhuma lição casa com "${filter}".` : 'Nenhuma lição encontrada.')
    process.exit(1)
  }

  const known = knownLessonIds()
  const problems: Problem[] = []
  const duplicates = new Set<string>()
  const seen = new Set<string>()

  for (const lesson of all) {
    if (seen.has(lesson.id)) duplicates.add(lesson.id)
    seen.add(lesson.id)
  }
  for (const id of duplicates) {
    problems.push({ lessonId: id, detail: 'lição duplicada em mais de um arquivo' })
  }

  console.log(`Verificando ${lessons.length} lição(ões) contra ${API}\n`)

  let index = 0
  for (const lesson of lessons) {
    index += 1
    const structural = checkStructure(lesson, known)
    const runtime = structural.some((p) => p.detail.includes('sem solução'))
      ? []
      : await checkSolution(lesson)

    const lessonProblems = [...structural, ...runtime]
    problems.push(...lessonProblems)

    const status = lessonProblems.length === 0 ? 'ok  ' : 'FALHA'
    console.log(
      `  ${String(index).padStart(3)}/${lessons.length}  ${status}  ${lesson.id}  ${lesson.title}`,
    )
    for (const problem of lessonProblems) {
      console.log(`        ${problem.detail}`)
    }
  }

  console.log()
  if (problems.length === 0) {
    console.log(`Tudo certo: ${lessons.length} lição(ões) sem problemas.`)
    return
  }

  console.error(`${problems.length} problema(s) encontrado(s).`)
  process.exit(1)
}

void main()
