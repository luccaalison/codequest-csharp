import { AlertTriangle, Lightbulb, Sparkles, ThumbsDown, ThumbsUp } from 'lucide-react'
import type { ConceptBlock, Lesson } from '../../content/types'
import { CodeBlock } from '../ui/CodeBlock'
import { Inline, RichText } from '../ui/RichText'
import { cn } from '../../lib/cn'

const calloutStyles = {
  tip: { icon: Lightbulb, className: 'border-brand/35 bg-brand/8', iconClass: 'text-brand' },
  warn: { icon: AlertTriangle, className: 'border-warn/35 bg-warn/8', iconClass: 'text-warn' },
  insight: {
    icon: Sparkles,
    className: 'border-violet-500/35 bg-violet-500/8',
    iconClass: 'text-violet-400',
  },
} as const

/** `dense` renders for the narrow reference rail: single column, smaller type. */
function Block({ block, dense }: { block: ConceptBlock; dense: boolean }) {
  const pairGrid = dense ? 'grid gap-3' : 'grid gap-3 sm:grid-cols-2'

  switch (block.kind) {
    case 'text':
      return <RichText body={block.body} className={dense ? 'text-sm' : 'text-[15px]'} />

    case 'code':
      return <CodeBlock code={block.code} caption={block.caption} copyable={!dense} />

    case 'output':
      return (
        <CodeBlock
          code={block.code}
          caption={block.caption ?? 'Saída no console'}
          variant="output"
          copyable={false}
        />
      )

    case 'callout': {
      const style = calloutStyles[block.tone]
      return (
        <div className={cn('flex gap-3 rounded-xl border p-4', style.className)}>
          <style.icon className={cn('mt-0.5 size-4.5 shrink-0', style.iconClass)} />
          <RichText body={block.body} className="text-sm" />
        </div>
      )
    }

    case 'compare':
      return (
        <div className={pairGrid}>
          <div className="rounded-xl border border-success/30 bg-success/5 p-3">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-success">
              <ThumbsUp className="size-3.5" />
              {block.goodLabel ?? 'Faça assim'}
            </p>
            <CodeBlock code={block.good} copyable={false} className="[&_pre]:border-0 [&_pre]:bg-transparent [&_pre]:p-0" />
          </div>
          <div className="rounded-xl border border-danger/30 bg-danger/5 p-3">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-danger">
              <ThumbsDown className="size-3.5" />
              {block.badLabel ?? 'Evite'}
            </p>
            <CodeBlock code={block.bad} copyable={false} className="[&_pre]:border-0 [&_pre]:bg-transparent [&_pre]:p-0" />
          </div>
        </div>
      )

    case 'sideBySide':
      return (
        <div>
          <div className={pairGrid}>
            {[block.left, block.right].map((side) => (
              <div key={side.label} className="rounded-xl border border-line bg-surface-raised/40 p-3">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-faint">
                  {side.label}
                </p>
                <CodeBlock
                  code={side.code}
                  copyable={false}
                  className="[&_pre]:border-0 [&_pre]:bg-transparent [&_pre]:p-0"
                />
              </div>
            ))}
          </div>
          {block.note && (
            <p className="mt-2 text-sm text-ink-muted">
              <Inline text={block.note} />
            </p>
          )}
        </div>
      )

    case 'table':
      return (
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-raised text-xs uppercase tracking-wider text-ink-faint">
              <tr>
                {block.headers.map((header) => (
                  <th key={header} className="px-3 py-2.5 font-bold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-line">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-3 py-2.5 align-top text-ink-muted">
                      <RichText body={cell} className="space-y-1" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

function ConceptBlocks({ lesson, dense = false }: { lesson: Lesson; dense?: boolean }) {
  return (
    <div className={dense ? 'space-y-4' : 'space-y-5'}>
      {lesson.concept.map((block, index) => (
        <Block key={index} block={block} dense={dense} />
      ))}
    </div>
  )
}

/** The full-width theory step, shown once before the questions start. */
export function ConceptStep({ lesson }: { lesson: Lesson }) {
  return (
    <article className="animate-rise space-y-5">
      <header>
        <p className="text-xs font-bold uppercase tracking-widest text-brand">Conceito</p>
        <h1 className="mt-1.5 text-2xl font-extrabold tracking-tight text-ink">{lesson.title}</h1>
        <p className="mt-2 text-sm text-ink-muted">{lesson.objective}</p>
      </header>

      <ConceptBlocks lesson={lesson} />
    </article>
  )
}

/**
 * The same theory kept permanently on screen while the learner answers questions and writes code,
 * so no one has to leave the exercise to re-read the explanation.
 */
export function ConceptAside({ lesson }: { lesson: Lesson }) {
  return (
    <>
      {/* Wide screens: a sticky rail with its own scrollbar. */}
      <aside className="hidden lg:block">
        {/* Leaves room for the sticky header above and the fixed action bar below. */}
        <div className="panel sticky top-20 flex max-h-[calc(100vh-11rem)] flex-col">
          <header className="shrink-0 border-b border-line px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand">Conceito</p>
            <h2 className="mt-1 text-sm font-bold leading-snug text-ink">{lesson.title}</h2>
          </header>
          <div className="code-scroll min-h-0 flex-1 overflow-y-auto px-4 py-4">
            <ConceptBlocks lesson={lesson} dense />
          </div>
        </div>
      </aside>

      {/* Narrow screens: collapsed by default so it never pushes the question off screen. */}
      <details className="panel group lg:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-sm font-bold text-ink [&::-webkit-details-marker]:hidden [&::marker]:content-['']">
          <span>
            <span className="text-brand">Conceito</span> · {lesson.title}
          </span>
          <span className="text-xs font-semibold text-ink-faint group-open:hidden">Abrir</span>
          <span className="hidden text-xs font-semibold text-ink-faint group-open:inline">
            Fechar
          </span>
        </summary>
        <div className="border-t border-line px-4 py-4">
          <ConceptBlocks lesson={lesson} dense />
        </div>
      </details>
    </>
  )
}
