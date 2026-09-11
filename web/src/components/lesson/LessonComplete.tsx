import { Link } from 'react-router-dom'
import { CheckCircle2, PartyPopper, Target } from 'lucide-react'
import type { Lesson, LessonLocation } from '../../content/types'
import { isAuthored } from '../../content'
import { Button } from '../ui/Button'

function Metric({
  icon,
  value,
  label,
  tone,
}: {
  icon: React.ReactNode
  value: string
  label: string
  tone: string
}) {
  return (
    <div className="panel-raised flex-1 p-4 text-center">
      <span className={tone}>{icon}</span>
      <p className="mt-1.5 text-xl font-extrabold text-ink tabular-nums">{value}</p>
      <p className="text-[11px] text-ink-faint">{label}</p>
    </div>
  )
}

export function LessonComplete({
  lesson,
  location,
  mistakes,
  onNext,
}: {
  lesson: Lesson
  location: LessonLocation
  mistakes: number
  onNext: () => void
}) {
  const accuracy =
    lesson.quiz.length > 0
      ? Math.round(((lesson.quiz.length - mistakes) / lesson.quiz.length) * 100)
      : 100

  const nextIsPlayable = location.nextId !== undefined && isAuthored(location.nextId)

  return (
    <div className="animate-rise mx-auto max-w-lg py-8 text-center">
      <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-2xl bg-success/15 text-success">
        <PartyPopper className="size-10" />
      </div>

      <h1 className="text-2xl font-extrabold tracking-tight text-ink">Lição concluída!</h1>
      <p className="mt-2 text-sm text-ink-muted">{lesson.title}</p>

      <div className="mt-7 flex gap-3">
        <Metric
          icon={<Target className="mx-auto size-5" />}
          value={`${accuracy}%`}
          label="Acerto no quiz"
          tone="text-brand"
        />
        <Metric
          icon={<CheckCircle2 className="mx-auto size-5" />}
          value="OK"
          label="Desafio aprovado nos testes"
          tone="text-success"
        />
      </div>

      {mistakes === 0 && (
        <p className="mt-4 text-xs font-semibold text-success">
          Lição perfeita: nenhum erro no quiz.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-2.5">
        {nextIsPlayable ? (
          <Button size="lg" onClick={onNext}>
            Próxima lição
          </Button>
        ) : (
          <Button size="lg" variant="success" onClick={onNext}>
            Voltar para a trilha
          </Button>
        )}
        <Link
          to={`/secao/${location.section.id}`}
          className="text-xs font-semibold text-ink-faint transition hover:text-ink"
        >
          Ver a trilha da seção
        </Link>
      </div>
    </div>
  )
}
