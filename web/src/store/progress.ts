import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface LessonProgress {
  completed: boolean
  attempts: number
  /** Fewest wrong answers ever recorded for this lesson. */
  bestMistakes: number
  lastCompletedAt?: string
  /** Draft code kept so a learner can leave a challenge and come back. */
  draft?: string
}

/** Stand-in for "never finished cleanly". A finite value survives JSON persistence. */
const NO_CLEAN_RUN = 999

interface ProgressState {
  lessons: Record<string, LessonProgress>

  startAttempt: (lessonId: string) => void
  saveDraft: (lessonId: string, draft: string) => void
  completeLesson: (lessonId: string, payload: { mistakes: number }) => void
  resetProgress: () => void
}

function blankLesson(): LessonProgress {
  return { completed: false, attempts: 0, bestMistakes: NO_CLEAN_RUN }
}

/**
 * Tracks only what a learner actually needs: which lessons are done, how many tries each took,
 * and the code draft in progress. There are no lives, no XP and no timers — nothing here can
 * block someone from studying.
 */
export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      lessons: {},

      startAttempt: (lessonId) =>
        set((state) => {
          const existing = state.lessons[lessonId] ?? blankLesson()
          return {
            lessons: {
              ...state.lessons,
              [lessonId]: { ...existing, attempts: existing.attempts + 1 },
            },
          }
        }),

      saveDraft: (lessonId, draft) =>
        set((state) => {
          const existing = state.lessons[lessonId] ?? blankLesson()
          return {
            lessons: { ...state.lessons, [lessonId]: { ...existing, draft } },
          }
        }),

      completeLesson: (lessonId, { mistakes }) =>
        set((state) => {
          const existing = state.lessons[lessonId]
          return {
            lessons: {
              ...state.lessons,
              [lessonId]: {
                attempts: existing?.attempts ?? 1,
                completed: true,
                bestMistakes: Math.min(existing?.bestMistakes ?? NO_CLEAN_RUN, mistakes),
                lastCompletedAt: new Date().toISOString(),
                draft: existing?.draft,
              },
            },
          }
        }),

      resetProgress: () => set({ lessons: {} }),
    }),
    {
      name: 'codequest-csharp-progress',
      // Bumped when the gamification fields were dropped. Completed lessons are worth keeping,
      // so v1 payloads are carried over with everything else discarded.
      version: 2,
      migrate: (persisted) => {
        const lessons = (persisted as { lessons?: Record<string, LessonProgress> })?.lessons
        return { lessons: lessons ?? {} } as ProgressState
      },
      partialize: (state) => ({ lessons: state.lessons }),
    },
  ),
)
