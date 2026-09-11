import { Link } from 'react-router-dom'
import { Check, Crown, Dumbbell, Flag, Lock, Star } from 'lucide-react'
import type { LessonKind } from '../../content/types'
import type { AccentTokens } from '../../lib/accents'
import { cn } from '../../lib/cn'

export type NodeState = 'completed' | 'current' | 'available' | 'locked' | 'planned'

const HEXAGON = 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)'

const kindIcons: Record<LessonKind, typeof Star> = {
  lesson: Star,
  practice: Dumbbell,
  checkpoint: Flag,
  boss: Crown,
}

interface LessonNodeProps {
  lessonId: string
  title: string
  kind: LessonKind
  state: NodeState
  accent: AccentTokens
  offset: number
}

export function LessonNode({
  lessonId,
  title,
  kind,
  state,
  accent,
  offset,
}: LessonNodeProps) {
  const Icon = state === 'completed' ? Check : state === 'locked' || state === 'planned' ? Lock : kindIcons[kind]
  const interactive = state === 'completed' || state === 'current' || state === 'available'
  const isBoss = kind === 'boss'

  const label =
    state === 'planned'
      ? `${title} — conteúdo em produção`
      : state === 'locked'
        ? `${title} — conclua a lição anterior`
        : title

  const node = (
    <span
      style={{ clipPath: HEXAGON }}
      className={cn(
        'flex items-center justify-center transition-all duration-200',
        isBoss ? 'size-[74px]' : 'size-[62px]',
        state === 'completed' && cn(accent.solid, 'shadow-lg'),
        state === 'current' && cn(accent.solid, 'shadow-xl'),
        state === 'available' && 'bg-surface-raised text-ink-muted',
        (state === 'locked' || state === 'planned') && 'bg-surface text-ink-faint/60',
        interactive && 'group-hover:scale-105 group-active:scale-95',
      )}
    >
      <Icon className={cn(isBoss ? 'size-8' : 'size-6')} strokeWidth={2.5} />
    </span>
  )

  const shell = (
    <span
      className={cn(
        'relative flex flex-col items-center',
        state === 'current' && 'animate-pop',
      )}
    >
      {state === 'current' && (
        <span
          aria-hidden
          className={cn(
            'absolute -inset-1.5 rounded-full opacity-30 blur-md',
            accent.solid.split(' ')[0],
          )}
        />
      )}
      {node}
    </span>
  )

  if (!interactive) {
    return (
      <div
        className="group relative flex flex-col items-center"
        style={{ transform: `translateX(${offset}px)` }}
        title={label}
        aria-label={label}
      >
        {shell}
      </div>
    )
  }

  return (
    <div
      className="group relative flex flex-col items-center"
      style={{ transform: `translateX(${offset}px)` }}
    >
      <Link to={`/licao/${lessonId}`} aria-label={label} className="rounded-full">
        {shell}
      </Link>

      <span
        className={cn(
          'pointer-events-none absolute top-full z-20 mt-2 w-max max-w-[15rem] rounded-lg border border-line',
          'bg-surface-raised px-2.5 py-1.5 text-center text-xs font-semibold text-ink opacity-0 shadow-xl',
          'transition-opacity duration-150 group-hover:opacity-100',
        )}
      >
        {title}
      </span>
    </div>
  )
}

/** Dotted connector drawn between two consecutive nodes on the winding path. */
export function PathConnector({ from, to }: { from: number; to: number }) {
  return (
    <div aria-hidden className="flex flex-col items-center gap-2 py-2">
      {[0.25, 0.5, 0.75].map((t) => (
        <span
          key={t}
          className="size-1.5 rounded-full bg-line-strong"
          style={{ transform: `translateX(${from + (to - from) * t}px)` }}
        />
      ))}
    </div>
  )
}
