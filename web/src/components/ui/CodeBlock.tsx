import { useMemo, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { tokenizeCSharp } from '../../lib/highlight'
import { cn } from '../../lib/cn'

interface CodeBlockProps {
  code: string
  caption?: string
  /** `output` styles the block as console output instead of source code. */
  variant?: 'code' | 'output'
  copyable?: boolean
  className?: string
}

export function CodeBlock({
  code,
  caption,
  variant = 'code',
  copyable = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const tokens = useMemo(
    () => (variant === 'code' ? tokenizeCSharp(code) : null),
    [code, variant],
  )

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      // Clipboard permission denied; the learner can still select the text manually.
    }
  }

  return (
    <figure className={cn('group relative', className)}>
      <pre
        className={cn(
          'code-scroll overflow-x-auto rounded-xl border p-4 font-mono text-[13px] leading-relaxed',
          variant === 'code'
            ? 'border-line bg-[#0d1117] text-ink'
            : 'border-line/70 bg-black/40 text-emerald-200',
        )}
      >
        <code>
          {tokens
            ? tokens.map((token, index) =>
                token.className ? (
                  <span key={index} className={token.className}>
                    {token.text}
                  </span>
                ) : (
                  token.text
                ),
              )
            : code}
        </code>
      </pre>

      {copyable && (
        <button
          type="button"
          onClick={copy}
          aria-label="Copiar código"
          className="absolute top-2.5 right-2.5 rounded-lg border border-line bg-surface/90 p-1.5 text-ink-faint opacity-0 transition hover:text-ink focus-visible:opacity-100 group-hover:opacity-100"
        >
          {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
        </button>
      )}

      {caption && (
        <figcaption className="mt-2 text-xs text-ink-faint">{caption}</figcaption>
      )}
    </figure>
  )
}
