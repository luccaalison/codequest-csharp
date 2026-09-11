/** Reports compiler warnings for each lesson's reference solution. Ad-hoc audit tool. */
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import type { Lesson } from '../src/content/types.ts'

const API = 'http://localhost:5239'
const DIR = fileURLToPath(new URL('../src/content/lessons/', import.meta.url))
const filter = process.argv[2] ?? ''

async function files(dir: string): Promise<string[]> {
  const out: string[] = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, e.name)
    if (e.isDirectory()) out.push(...(await files(full)))
    else if (e.name.endsWith('.ts')) out.push(full)
  }
  return out.sort()
}

const lessons: Lesson[] = []
for (const f of await files(DIR)) {
  const m = (await import(pathToFileURL(f).href)) as { lessons?: Lesson[] }
  if (m.lessons) lessons.push(...m.lessons)
}

let total = 0
for (const l of lessons.filter((l) => l.id.startsWith(filter))) {
  const r = await fetch(`${API}/api/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: l.challenge.solution,
      tests: [{ name: 'x', expectedStdout: '', comparison: 'trimmed', hidden: false }],
      nullable: l.challenge.nullable,
      capabilities: l.challenge.capabilities,
    }),
  })
  const d = (await r.json()) as { diagnostics: Array<{ severity: string; line: number; id: string; message: string }> }
  const warns = d.diagnostics.filter((x) => x.severity === 'Warning')
  if (warns.length > 0) {
    total += warns.length
    console.log(`${l.id}  ${l.title}`)
    for (const w of warns) console.log(`    linha ${w.line}  ${w.id}  ${w.message}`)
  }
}
console.log(total === 0 ? 'Nenhum aviso.' : `${total} aviso(s).`)
