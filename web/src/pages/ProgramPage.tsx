import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, BookOpen, Lock } from 'lucide-react'
import {
  authoredCount,
  countLessons,
  curriculum,
  nextPlayableLesson,
  totalLessonCount,
} from '../content'
import type { Section } from '../content/types'
import { useProgress } from '../store/progress'
import { accents } from '../lib/accents'
import { sectionIcons } from '../lib/sectionIcons'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/ProgressBar'
import { cn } from '../lib/cn'

function useCompletedLookup() {
  const lessons = useProgress((state) => state.lessons)
  return (lessonId: string) => lessons[lessonId]?.completed === true
}

function SectionCard({
  section,
  isCompleted,
  isCurrent,
}: {
  section: Section
  isCompleted: (lessonId: string) => boolean
  isCurrent: boolean
}) {
  const navigate = useNavigate()
  const accent = accents[section.accent]
  const Icon = sectionIcons[section.icon]

  const total = countLessons(section)
  const available = authoredCount(section)
  const done = section.chapters
    .flatMap((chapter) => chapter.lessons)
    .filter((ref) => isCompleted(ref.id)).length
  const next = nextPlayableLesson(section, isCompleted)

  return (
    <article
      className={cn(
        'panel p-5 transition-colors',
        isCurrent ? cn('ring-2', accent.ring) : 'hover:border-line-strong',
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'flex size-12 shrink-0 items-center justify-center rounded-xl',
            accent.wash,
            accent.text,
          )}
        >
          <Icon className="size-6" />
        </div>

        <div className="min-w-0 flex-1">
          <p className={cn('text-xs font-bold uppercase tracking-wider', accent.text)}>
            Seção {section.index}
          </p>
          <h3 className="mt-1 text-xl font-extrabold tracking-tight text-ink">{section.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{section.description}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {next ? (
              <Button
                size="sm"
                variant={isCurrent ? 'primary' : 'outline'}
                onClick={() => navigate(`/licao/${next.id}`)}
              >
                {done > 0 ? 'Continuar' : 'Começar'}
              </Button>
            ) : available === 0 ? (
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-raised px-3 py-2 text-xs font-semibold text-ink-faint">
                <Lock className="size-3.5" />
                Conteúdo em produção
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-success/40 bg-success/10 px-3 py-2 text-xs font-bold text-success">
                Seção concluída
              </span>
            )}

            <Link
              to={`/secao/${section.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-faint transition hover:text-ink"
            >
              <BookOpen className="size-3.5" />
              Ver trilha
              <ArrowRight className="size-3.5" />
            </Link>

            <div className="ml-auto flex items-center gap-3">
              <ProgressBar
                className="w-28"
                barClassName={cn('bg-current', accent.text)}
                value={done}
                max={total}
                label={`Progresso da seção ${section.index}`}
              />
              <span className="font-mono text-xs whitespace-nowrap text-ink-faint tabular-nums">
                {done}/{total}
              </span>
            </div>
          </div>

          {available > 0 && available < total && (
            <p className="mt-3 text-[11px] text-ink-faint">
              {available} de {total} lições já escritas nesta seção.
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

export function ProgramPage() {
  const isCompleted = useCompletedLookup()
  const currentSection = curriculum.find((section) => nextPlayableLesson(section, isCompleted))

  const completedTotal = curriculum
    .flatMap((section) => section.chapters.flatMap((chapter) => chapter.lessons))
    .filter((ref) => isCompleted(ref.id)).length

  return (
    <div className="space-y-6">
      <header className="panel p-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">
          Trilha completa de C# e .NET
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
          Dez seções, {curriculum.reduce((total, s) => total + s.chapters.length, 0)} capítulos e{' '}
          {totalLessonCount} lições. Cada lição tem teoria curta, perguntas de múltipla escolha e um
          desafio de código que roda de verdade no .NET.
        </p>
        <div className="mt-5 flex items-center gap-4">
          <ProgressBar
            className="max-w-md"
            value={completedTotal}
            max={totalLessonCount}
            label="Progresso geral"
          />
          <span className="font-mono text-xs text-ink-faint tabular-nums">
            {completedTotal}/{totalLessonCount}
          </span>
        </div>
      </header>

      <div className="space-y-4">
        {curriculum.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            isCompleted={isCompleted}
            isCurrent={section.id === currentSection?.id}
          />
        ))}
      </div>
    </div>
  )
}
