import { curriculum, sectionById } from './curriculum'
import type { Lesson, LessonLocation, LessonRef, Section } from './types'

/**
 * Every file under `lessons/` that exports a `lessons` array is picked up automatically, so adding
 * a chapter is a matter of dropping in a new file — no registry to update by hand.
 */
const modules = import.meta.glob<{ lessons?: Lesson[] }>('./lessons/**/*.ts', { eager: true })

const lessonById = new Map<string, Lesson>()
for (const module of Object.values(modules)) {
  for (const lesson of module.lessons ?? []) {
    if (lessonById.has(lesson.id)) {
      console.warn(`[conteúdo] lição duplicada: ${lesson.id}`)
    }
    lessonById.set(lesson.id, lesson)
  }
}

/** Flat, ordered walk of the whole program — the basis for prev/next navigation. */
const flatRefs: Array<{ section: Section; chapterIndex: number; ref: LessonRef }> = []
for (const section of curriculum) {
  section.chapters.forEach((chapter, chapterIndex) => {
    for (const ref of chapter.lessons) {
      flatRefs.push({ section, chapterIndex, ref })
    }
  })
}

const positionById = new Map(flatRefs.map((entry, index) => [entry.ref.id, index]))

export function getLesson(lessonId: string): Lesson | undefined {
  return lessonById.get(lessonId)
}

export function isAuthored(lessonId: string): boolean {
  return lessonById.has(lessonId)
}

export function locateLesson(lessonId: string): LessonLocation | undefined {
  const position = positionById.get(lessonId)
  if (position === undefined) return undefined

  const entry = flatRefs[position]
  const section = entry.section
  const chapter = section.chapters[entry.chapterIndex]

  const sectionStart = positionById.get(section.chapters[0].lessons[0].id) ?? 0
  const previous = flatRefs[position - 1]
  const next = flatRefs[position + 1]

  return {
    section,
    chapter,
    ref: entry.ref,
    indexInSection: position - sectionStart,
    indexInChapter: chapter.lessons.findIndex((ref) => ref.id === lessonId),
    // Navigation stays inside the section so finishing one does not silently drop you in the next.
    previousId: previous && previous.section.id === section.id ? previous.ref.id : undefined,
    nextId: next && next.section.id === section.id ? next.ref.id : undefined,
  }
}

export function authoredCount(section: Section): number {
  return section.chapters.reduce(
    (total, chapter) => total + chapter.lessons.filter((ref) => isAuthored(ref.id)).length,
    0,
  )
}

/** First playable lesson of a section that the learner has not completed yet. */
export function nextPlayableLesson(
  section: Section,
  isCompleted: (lessonId: string) => boolean,
): LessonRef | undefined {
  for (const chapter of section.chapters) {
    for (const ref of chapter.lessons) {
      if (isAuthored(ref.id) && !isCompleted(ref.id)) return ref
    }
  }
  return undefined
}

/**
 * Authored lessons are always open. Sequential gating used to force finishing the previous
 * lesson first, which made a lost localStorage a full restart of the trail.
 */
export function isUnlocked(lessonId: string, _isCompleted?: (id: string) => boolean): boolean {
  return isAuthored(lessonId)
}

export { curriculum, sectionById }
export { countLessons, totalLessonCount } from './curriculum'
export type * from './types'
