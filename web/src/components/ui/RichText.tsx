import { Fragment, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|_[^_]+_)/g

/**
 * Renders the small markdown subset used across lesson content: inline code, bold and italics.
 * Content is authored in this repository, so a full markdown parser would be dead weight.
 */
export function Inline({ text }: { text: string }): ReactNode {
  const parts = text.split(INLINE).filter((part) => part !== '')

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
          return (
            <code
              key={index}
              className="rounded-md border border-line bg-surface-raised px-1.5 py-0.5 font-mono text-[0.86em] text-sky-300"
            >
              {part.slice(1, -1)}
            </code>
          )
        }

        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="font-semibold text-ink">
              {part.slice(2, -2)}
            </strong>
          )
        }

        if (part.startsWith('_') && part.endsWith('_') && part.length > 2) {
          return (
            <em key={index} className="italic text-ink-muted">
              {part.slice(1, -1)}
            </em>
          )
        }

        return <Fragment key={index}>{part}</Fragment>
      })}
    </>
  )
}

/**
 * Block-level renderer: blank-line separated paragraphs, `- ` bullets and `1. ` numbered lists.
 */
export function RichText({ body, className }: { body: string; className?: string }) {
  const blocks = body.trim().split(/\n\s*\n/)

  return (
    <div className={cn('space-y-3 leading-relaxed text-ink-muted', className)}>
      {blocks.map((block, index) => {
        const lines = block.split('\n').map((line) => line.trim())

        if (lines.every((line) => line.startsWith('- '))) {
          return (
            <ul key={index} className="space-y-1.5 pl-1">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex} className="flex gap-2.5">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-ink-faint" />
                  <span>
                    <Inline text={line.slice(2)} />
                  </span>
                </li>
              ))}
            </ul>
          )
        }

        if (lines.every((line) => /^\d+\.\s/.test(line))) {
          return (
            <ol key={index} className="space-y-1.5">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex} className="flex gap-2.5">
                  <span className="mt-0.5 font-mono text-xs text-ink-faint">{lineIndex + 1}.</span>
                  <span>
                    <Inline text={line.replace(/^\d+\.\s/, '')} />
                  </span>
                </li>
              ))}
            </ol>
          )
        }

        return (
          <p key={index}>
            <Inline text={block.replace(/\n/g, ' ')} />
          </p>
        )
      })}
    </div>
  )
}
