import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { isAuthored, isUnlocked, sectionById } from '../content'
import type { Chapter, Section } from '../content/types'
import { useProgress } from '../store/progress'
import { accents } from '../lib/accents'
import { sectionIcons } from '../lib/sectionIcons'
import { LessonNode, PathConnector, type NodeState } from '../components/path/LessonNode'
import { ProgressBar } from '../components/ui/ProgressBar'
import { cn } from '../lib/cn'

/** Horizontal offsets, in pixels, that give the trail its snake shape. */
const OFFSETS = [0, 44, 70, 44, 0, -44, -70, -44]

function offsetAt(index: number) {
  return OFFSETS[index % OFFSETS.length]
}

function ChapterBlock({
  section,
  chapter,
  chapterNumber,
  states,
  onVisible,
}: {
  section: Section
  chapter: Chapter
  chapterNumber: number
  states: Map<string, NodeState>
  onVisible: (chapterId: string) => void
}) {
  const accent = accents[section.accent]
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onVisible(chapter.id)
      },
      { rootMargin: '-96px 0px -60% 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [chapter.id, onVisible])

  return (
    <section ref={ref} aria-labelledby={`${chapter.id}-title`} className="pb-4">
      <div className="mb-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-line" />
        <div className="text-center">
          <p className={cn('text-[11px] font-bold uppercase tracking-widest', accent.text)}>
            Capítulo {chapterNumber}
          </p>
          <h2 id={`${chapter.id}-title`} className="text-base font-bold text-ink">
            {chapter.title}
          </h2>
        </div>
        <span className="h-px flex-1 bg-line" />
      </div>

      <p className="mx-auto mb-8 max-w-sm text-center text-xs leading-relaxed text-ink-faint">
        {chapter.summary}
      </p>

      <div className="flex flex-col items-center">
        {chapter.lessons.map((ref_, index) => (
          <div key={ref_.id} className="flex flex-col items-center">
            <LessonNode
              lessonId={ref_.id}
              title={ref_.title}
              kind={ref_.kind}
              state={states.get(ref_.id) ?? 'planned'}
              accent={accent}
              offset={offsetAt(index)}
            />
            {index < chapter.lessons.length - 1 && (
              <PathConnector from={offsetAt(index)} to={offsetAt(index + 1)} />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export function SectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>()
  const section = sectionId ? sectionById.get(sectionId) : undefined
  const lessons = useProgress((state) => state.lessons)
  const [visibleChapterId, setVisibleChapterId] = useState<string | null>(null)

  const isCompleted = (lessonId: string) => lessons[lessonId]?.completed === true

  const states = useMemo(() => {
    const map = new Map<string, NodeState>()
    if (!section) return map

    let currentAssigned = false
    for (const chapter of section.chapters) {
      for (const ref of chapter.lessons) {
        if (!isAuthored(ref.id)) {
          map.set(ref.id, 'planned')
          continue
        }
        if (isCompleted(ref.id)) {
          map.set(ref.id, 'completed')
          continue
        }
        if (!isUnlocked(ref.id, isCompleted)) {
          map.set(ref.id, 'locked')
          continue
        }
        // The first unlocked, unfinished lesson is where the learner should go next.
        map.set(ref.id, currentAssigned ? 'available' : 'current')
        currentAssigned = true
      }
    }
    return map
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, lessons])

  if (!section) {
    return (
      <div className="panel p-8 text-center">
        <p className="text-ink-muted">Seção não encontrada.</p>
        <Link to="/" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
          Voltar para o programa
        </Link>
      </div>
    )
  }

  const accent = accents[section.accent]
  const Icon = sectionIcons[section.icon]
  const allLessons = section.chapters.flatMap((chapter) => chapter.lessons)
  const doneCount = allLessons.filter((ref) => isCompleted(ref.id)).length

  const activeChapterIndex = Math.max(
    0,
    section.chapters.findIndex((chapter) => chapter.id === visibleChapterId),
  )
  const activeChapter = section.chapters[activeChapterIndex]
  const activeChapterDone = activeChapter.lessons.filter((ref) => isCompleted(ref.id)).length

  return (
    <div className="mx-auto max-w-2xl">
      <div className="sticky top-16 z-30 -mx-1 bg-canvas/90 px-1 pt-4 pb-3 backdrop-blur-md">
        <div className={cn('panel-raised p-4', 'ring-1', accent.ring)}>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="rounded-lg p-1.5 text-ink-faint transition hover:bg-surface-hover hover:text-ink"
              aria-label="Voltar para o programa"
            >
              <ChevronLeft className="size-5" />
            </Link>

            <div className={cn('flex size-9 items-center justify-center rounded-lg', accent.wash, accent.text)}>
              <Icon className="size-4.5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold text-ink-faint">
                Programa <span className="text-line-strong">·</span> Seção {section.index}{' '}
                <span className="text-line-strong">·</span> Capítulo {activeChapterIndex + 1}
              </p>
              <h1 className="truncate text-base font-extrabold tracking-tight text-ink">
                {activeChapter.title}
              </h1>
            </div>

            <span className="font-mono text-xs text-ink-faint tabular-nums">
              {activeChapterDone}/{activeChapter.lessons.length}
            </span>
          </div>

          <ProgressBar
            className="mt-3 h-2"
            barClassName={cn('bg-current', accent.text)}
            value={activeChapterDone}
            max={activeChapter.lessons.length}
            label={`Progresso do capítulo ${activeChapterIndex + 1}`}
          />
        </div>
      </div>

      <div className="mt-4 mb-10 text-center">
        <p className={cn('text-xs font-bold uppercase tracking-widest', accent.text)}>
          Seção {section.index}
        </p>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-ink">{section.title}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">{section.tagline}</p>
        <p className="mt-3 font-mono text-xs text-ink-faint tabular-nums">
          {doneCount}/{allLessons.length} lições concluídas
        </p>
      </div>

      {section.chapters.map((chapter, index) => (
        <ChapterBlock
          key={chapter.id}
          section={section}
          chapter={chapter}
          chapterNumber={index + 1}
          states={states}
          onVisible={setVisibleChapterId}
        />
      ))}
    </div>
  )
}
