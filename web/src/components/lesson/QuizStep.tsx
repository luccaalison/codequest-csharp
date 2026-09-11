import { Check, X } from 'lucide-react'
import type { QuizQuestion } from '../../content/types'
import { CodeBlock } from '../ui/CodeBlock'
import { Inline, RichText } from '../ui/RichText'
import { cn } from '../../lib/cn'

interface QuizStepProps {
  question: QuizQuestion
  questionNumber: number
  questionCount: number
  /** Set once the learner has locked in an answer for this question. */
  verdict: 'correct' | 'wrong' | null
  selected: string[]
  onSelectedChange: (selected: string[]) => void
}

export function QuizStep({
  question,
  questionNumber,
  questionCount,
  verdict,
  selected,
  onSelectedChange,
}: QuizStepProps) {
  const locked = verdict !== null
  const isMultiple = question.type === 'multiple'

  function toggle(optionId: string) {
    if (locked) return
    if (isMultiple) {
      onSelectedChange(
        selected.includes(optionId)
          ? selected.filter((id) => id !== optionId)
          : [...selected, optionId],
      )
    } else {
      onSelectedChange([optionId])
    }
  }

  return (
    <div className="animate-rise space-y-5">
      <header>
        <p className="text-xs font-bold uppercase tracking-widest text-brand">
          Pergunta {questionNumber} de {questionCount}
        </p>
        <h2 className="mt-1.5 text-xl leading-snug font-bold text-ink">
          <Inline text={question.prompt} />
        </h2>
        {isMultiple && (
          <p className="mt-1.5 text-xs text-ink-faint">
            Marque todas as alternativas corretas.
          </p>
        )}
      </header>

      {question.code && <CodeBlock code={question.code} />}

      <ul className="space-y-2.5">
        {question.options.map((option) => {
          const isSelected = selected.includes(option.id)
          const showAsCorrect = locked && option.correct === true
          const showAsWrong = locked && isSelected && option.correct !== true

          return (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => toggle(option.id)}
                disabled={locked}
                aria-pressed={isSelected}
                className={cn(
                  'flex w-full items-start gap-3 rounded-xl border-2 p-3.5 text-left transition',
                  'disabled:cursor-default',
                  showAsCorrect
                    ? 'border-success bg-success/10'
                    : showAsWrong
                      ? 'border-danger bg-danger/10'
                      : isSelected
                        ? 'border-brand bg-brand/10'
                        : 'border-line bg-surface hover:border-line-strong hover:bg-surface-hover',
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 flex size-5 shrink-0 items-center justify-center border-2 text-[11px] font-bold',
                    isMultiple ? 'rounded-md' : 'rounded-full',
                    showAsCorrect
                      ? 'border-success bg-success text-slate-950'
                      : showAsWrong
                        ? 'border-danger bg-danger text-white'
                        : isSelected
                          ? 'border-brand bg-brand text-white'
                          : 'border-line-strong text-transparent',
                  )}
                >
                  {showAsWrong ? (
                    <X className="size-3" strokeWidth={3} />
                  ) : (
                    <Check className="size-3" strokeWidth={3} />
                  )}
                </span>

                <span className="min-w-0 flex-1">
                  {option.text && (
                    <span className="text-sm text-ink">
                      <Inline text={option.text} />
                    </span>
                  )}
                  {option.code && (
                    <CodeBlock
                      code={option.code}
                      copyable={false}
                      className={cn(option.text && 'mt-2')}
                    />
                  )}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {locked && (
        <div
          className={cn(
            'animate-rise rounded-xl border p-4',
            verdict === 'correct'
              ? 'border-success/40 bg-success/8'
              : 'border-danger/40 bg-danger/8',
          )}
        >
          <p
            className={cn(
              'mb-1.5 flex items-center gap-2 text-sm font-bold',
              verdict === 'correct' ? 'text-success' : 'text-danger',
            )}
          >
            {verdict === 'correct' ? (
              <>
                <Check className="size-4" strokeWidth={3} /> Isso mesmo!
              </>
            ) : (
              <>
                <X className="size-4" strokeWidth={3} /> Ainda não
              </>
            )}
          </p>
          <RichText body={question.explanation} className="text-sm" />
        </div>
      )}
    </div>
  )
}

export function isAnswerCorrect(question: QuizQuestion, selected: string[]): boolean {
  const correctIds = question.options.filter((option) => option.correct).map((option) => option.id)
  if (selected.length !== correctIds.length) return false
  return correctIds.every((id) => selected.includes(id))
}
