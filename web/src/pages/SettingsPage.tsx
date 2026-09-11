import { useState } from 'react'
import { AlertTriangle, Trash2 } from 'lucide-react'
import { curriculum, totalLessonCount } from '../content'
import { authoredCount } from '../content'
import { useProgress } from '../store/progress'
import { Button } from '../components/ui/Button'

export function SettingsPage() {
  const resetProgress = useProgress((state) => state.resetProgress)
  const lessons = useProgress((state) => state.lessons)
  const [confirming, setConfirming] = useState(false)

  const completed = Object.values(lessons).filter((entry) => entry.completed).length
  const authored = curriculum.reduce((total, section) => total + authoredCount(section), 0)

  return (
    <div className="max-w-2xl space-y-6">
      <header className="panel p-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">Ajustes</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Seu progresso fica salvo apenas neste navegador, em <code className="font-mono">localStorage</code>.
        </p>
      </header>

      <section className="panel p-5">
        <h2 className="mb-4 text-sm font-bold text-ink">Estado do curso</h2>
        <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
          {[
            ['Lições no mapa', totalLessonCount],
            ['Lições já escritas', authored],
            ['Lições concluídas', completed],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-line bg-surface-raised p-3">
              <dt className="text-[11px] text-ink-faint">{label}</dt>
              <dd className="mt-1 text-lg font-extrabold text-ink tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="panel border-danger/30 p-5">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-danger">
          <AlertTriangle className="size-4" />
          Zona de risco
        </h2>
        <p className="mb-4 text-sm text-ink-muted">
          Apagar o progresso remove todas as lições concluídas e os rascunhos de código salvos. Não
          tem volta.
        </p>

        {confirming ? (
          <div className="flex gap-2.5">
            <Button
              variant="danger"
              size="sm"
              icon={<Trash2 className="size-3.5" />}
              onClick={() => {
                resetProgress()
                setConfirming(false)
              }}
            >
              Confirmar
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>
              Cancelar
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            icon={<Trash2 className="size-3.5" />}
            onClick={() => setConfirming(true)}
          >
            Apagar progresso
          </Button>
        )}
      </section>
    </div>
  )
}
