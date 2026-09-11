/** How a lesson node behaves on the path. */
export type LessonKind =
  /** Regular teach + quiz + challenge node. */
  | 'lesson'
  /** Extra reps on a concept already taught, quiz-light and challenge-heavy. */
  | 'practice'
  /** End-of-chapter checkpoint: no new theory, harder challenge. */
  | 'checkpoint'
  /** End-of-section project. */
  | 'boss'

export interface LessonRef {
  id: string
  title: string
  kind: LessonKind
}

export interface Chapter {
  id: string
  title: string
  summary: string
  lessons: LessonRef[]
}

export interface Section {
  id: string
  index: number
  title: string
  tagline: string
  description: string
  /** Tailwind-friendly accent used by cards, path nodes and progress bars. */
  accent: SectionAccent
  icon: SectionIcon
  chapters: Chapter[]
}

export type SectionAccent =
  | 'sky'
  | 'violet'
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'cyan'
  | 'orange'
  | 'indigo'
  | 'teal'
  | 'fuchsia'

export type SectionIcon =
  | 'sparkles'
  | 'repeat'
  | 'layers'
  | 'function'
  | 'boxes'
  | 'shield'
  | 'brain'
  | 'wand'
  | 'zap'
  | 'server'

/* ------------------------------------------------------------------ *
 * Lesson content
 * ------------------------------------------------------------------ */

export type ConceptBlock =
  | { kind: 'text'; body: string }
  | { kind: 'code'; code: string; caption?: string }
  | { kind: 'callout'; tone: 'tip' | 'warn' | 'insight'; body: string }
  | { kind: 'output'; code: string; caption?: string }
  | {
      kind: 'compare'
      good: string
      bad: string
      goodLabel?: string
      badLabel?: string
    }
  /**
   * Two neutral alternatives side by side. Unlike `compare`, neither side is framed as wrong —
   * use it for "two ways to write the same thing" or "before and after a refactor".
   */
  | {
      kind: 'sideBySide'
      left: { label: string; code: string }
      right: { label: string; code: string }
      note?: string
    }
  | { kind: 'table'; headers: string[]; rows: string[][] }

export interface QuizOption {
  id: string
  /** Inline text. Supports the light markdown subset (bold, `code`, italics). */
  text?: string
  /** Rendered as a highlighted C# block instead of inline text. */
  code?: string
  correct?: boolean
}

export interface QuizQuestion {
  id: string
  /** `single` accepts one option, `multiple` requires every correct option. */
  type: 'single' | 'multiple'
  prompt: string
  /** Optional snippet the question refers to. */
  code?: string
  options: QuizOption[]
  explanation: string
}

export type OutputComparison = 'trimmed' | 'exact' | 'ignoreCase' | 'tokens' | 'unordered'

export type NullableMode = 'annotations' | 'enabled'

export interface ChallengeTest {
  name: string
  stdin?: string
  expectedStdout: string
  comparison?: OutputComparison
  /** Hidden cases still run, but the learner only sees pass/fail. */
  hidden?: boolean
}

export interface Challenge {
  brief: string
  requirements?: string[]
  starterCode: string
  solution: string
  hints: string[]
  tests: ChallengeTest[]
  /** Opt-in sandbox escape hatches: `fileSystem`, `network`, `reflection`. */
  capabilities?: string[]
  /**
   * How hard the compiler pushes back on nullable reference types. `annotations` (the default)
   * accepts `string?` without emitting warnings; `enabled` turns on the full flow analysis, which
   * the nullability chapter of section 8 needs in order to demonstrate what it teaches.
   */
  nullable?: NullableMode
  timeoutMs?: number
}

export interface Lesson {
  id: string
  title: string
  /** One sentence answering "what will I be able to do after this?". */
  objective: string
  concept: ConceptBlock[]
  quiz: QuizQuestion[]
  challenge: Challenge
}

/* ------------------------------------------------------------------ *
 * Derived views used by the UI
 * ------------------------------------------------------------------ */

export interface LessonLocation {
  section: Section
  chapter: Chapter
  ref: LessonRef
  /** Zero-based position inside the whole section. */
  indexInSection: number
  /** Zero-based position inside the chapter. */
  indexInChapter: number
  previousId?: string
  nextId?: string
}
