import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { X } from 'lucide-react'
import { getLesson, isAuthored, locateLesson } from '../content'
import type { Lesson, LessonLocation } from '../content/types'
import { useProgress } from '../store/progress'
import { ConceptAside, ConceptStep } from '../components/lesson/ConceptStep'
import { QuizStep, isAnswerCorrect } from '../components/lesson/QuizStep'
import { ChallengeStep } from '../components/lesson/ChallengeStep'
import { LessonComplete } from '../components/lesson/LessonComplete'
import { Button } from '../components/ui/Button'
import { StepPips } from '../components/ui/ProgressBar'
import { accents } from '../lib/accents'
import { cn } from '../lib/cn'

type Verdict = 'correct' | 'wrong' | null

function MissingLesson() {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-xl font-bold text-ink">Esta lição ainda não está escrita</h1>
      <p className="mt-2 text-sm text-ink-muted">
        O nó já existe no mapa do curso, mas o conteúdo está em produção. As lições da Seção 1 estão
        completas e jogáveis.
      </p>
      <Link to="/" className="mt-6 inline-block text-sm font-semibold text-brand hover:underline">
        Voltar para o programa
      </Link>
    </div>
  )
}

function LessonRunner({ lesson, location }: { lesson: Lesson; location: LessonLocation }) {
  const navigate = useNavigate()

  const completeLesson = useProgress((state) => state.completeLesson)
  const startAttempt = useProgress((state) => state.startAttempt)
  const saveDraft = useProgress((state) => state.saveDraft)
  const savedDraft = useProgress((state) => state.lessons[lesson.id]?.draft)

  const [stepIndex, setStepIndex] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [verdict, setVerdict] = useState<Verdict>(null)
  const [mistakes, setMistakes] = useState(0)
  const [challengeSolved, setChallengeSolved] = useState(false)
  const [finished, setFinished] = useState(false)
  const [code, setCode] = useState(
    savedDraft && savedDraft.trim() !== '' ? savedDraft : lesson.challenge.starterCode,
  )

  // Moving to another lesson reuses this component, so every piece of per-attempt state resets.
  useEffect(() => {
    setStepIndex(0)
    setSelected([])
    setVerdict(null)
    setMistakes(0)
    setChallengeSolved(false)
    setFinished(false)
    startAttempt(lesson.id)
    window.scrollTo({ top: 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id])

  const steps = useMemo(
    () => ['concept', ...lesson.quiz.map((question) => question.id), 'challenge'],
    [lesson],
  )

  const accent = accents[location.section.accent]
  const currentStep = steps[stepIndex]
  const quizIndex = stepIndex - 1
  const question =
    currentStep !== 'concept' && currentStep !== 'challenge' ? lesson.quiz[quizIndex] : null

  const exit = () => navigate(`/secao/${location.section.id}`)

  const handleCodeChange = (next: string) => {
    setCode(next)
    saveDraft(lesson.id, next)
  }

  const checkAnswer = () => {
    if (!question) return
    const correct = isAnswerCorrect(question, selected)
    setVerdict(correct ? 'correct' : 'wrong')
    if (!correct) setMistakes((count) => count + 1)
  }

  const advance = () => {
    setSelected([])
    setVerdict(null)
    setStepIndex((index) => index + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const finish = () => {
    completeLesson(lesson.id, { mistakes })
    setFinished(true)
    window.scrollTo({ top: 0 })
  }

  const goToNextLesson = () => {
    if (location.nextId && isAuthored(location.nextId)) navigate(`/licao/${location.nextId}`)
    else exit()
  }

  const footerHint =
    currentStep === 'concept'
      ? 'Leia com calma. A teoria continua visível durante os exercícios.'
      : currentStep === 'challenge'
        ? challengeSolved
          ? 'Desafio resolvido. Conclua a lição.'
          : 'Escreva o código e clique em Verificar.'
        : verdict === null
          ? 'Escolha sua resposta. O conceito está do lado esquerdo.'
          : verdict === 'correct'
            ? 'Boa! Siga em frente.'
            : 'Leia a explicação antes de continuar.'

  // Only the theory step and the completion screen are single column; everything else keeps the
  // concept rail on the left.
  const wide = !finished && currentStep !== 'concept'

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-md">
        <div
          className={cn(
            'mx-auto flex h-16 items-center gap-4 px-4 sm:px-6',
            wide ? 'max-w-7xl' : 'max-w-3xl',
          )}
        >
          <button
            type="button"
            onClick={exit}
            aria-label="Sair da lição"
            className="rounded-lg p-1.5 text-ink-faint transition hover:bg-surface-hover hover:text-ink"
          >
            <X className="size-5" />
          </button>

          <div className="min-w-0 flex-1">
            <p className="mb-1.5 truncate text-[11px] font-semibold text-ink-faint">
              Seção {location.section.index} <span className="text-line-strong">·</span>{' '}
              {location.chapter.title} <span className="text-line-strong">·</span> lição{' '}
              {location.indexInChapter + 1}
            </p>
            <StepPips total={steps.length} current={finished ? steps.length : stepIndex} />
          </div>
        </div>
      </header>

      <div
        className={cn(
          'mx-auto px-4 py-8 sm:px-6',
          wide ? 'max-w-7xl' : 'max-w-3xl',
        )}
      >
        {finished ? (
          <LessonComplete
            lesson={lesson}
            location={location}
            mistakes={mistakes}
            onNext={goToNextLesson}
          />
        ) : currentStep === 'concept' ? (
          <ConceptStep lesson={lesson} />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[22rem_minmax(0,1fr)]">
            <ConceptAside lesson={lesson} />

            <div className="min-w-0">
              {currentStep === 'challenge' ? (
                <ChallengeStep
                  challenge={lesson.challenge}
                  code={code}
                  onCodeChange={handleCodeChange}
                  solved={challengeSolved}
                  onSolved={() => setChallengeSolved(true)}
                />
              ) : question ? (
                <QuizStep
                  question={question}
                  questionNumber={quizIndex + 1}
                  questionCount={lesson.quiz.length}
                  verdict={verdict}
                  selected={selected}
                  onSelectedChange={setSelected}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>

      {!finished && (
        <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur-md">
          <div
            className={cn(
              'mx-auto flex items-center justify-between gap-4 px-4 py-4 sm:px-6',
              wide ? 'max-w-7xl' : 'max-w-3xl',
            )}
          >
            <p className="hidden text-xs text-ink-faint sm:block">{footerHint}</p>

            {currentStep === 'concept' && (
              <Button size="lg" className={cn(accent.solid, 'ml-auto')} onClick={advance}>
                Vamos praticar
              </Button>
            )}

            {question && verdict === null && (
              <Button size="lg" className="ml-auto" disabled={selected.length === 0} onClick={checkAnswer}>
                Verificar
              </Button>
            )}

            {question && verdict !== null && (
              <Button
                size="lg"
                variant={verdict === 'correct' ? 'success' : 'primary'}
                className="ml-auto"
                onClick={advance}
              >
                Continuar
              </Button>
            )}

            {currentStep === 'challenge' && (
              <Button
                size="lg"
                variant="success"
                className="ml-auto"
                disabled={!challengeSolved}
                onClick={finish}
              >
                Concluir lição
              </Button>
            )}
          </div>
        </footer>
      )}
    </>
  )
}

export function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const lesson = lessonId ? getLesson(lessonId) : undefined
  const location = lessonId ? locateLesson(lessonId) : undefined

  return (
    <div className="min-h-screen bg-canvas pb-32">
      {lesson && location ? (
        // Keying by id restarts the runner cleanly when navigating between lessons.
        <LessonRunner key={lesson.id} lesson={lesson} location={location} />
      ) : (
        <MissingLesson />
      )}
    </div>
  )
}
