import { useEffect, useState } from 'react'
import { Server } from 'lucide-react'
import { checkHealth } from '../../lib/api'
import { cn } from '../../lib/cn'

/**
 * Compact header badge for the C# execution service. Challenges are unplayable while it is down,
 * so the state is worth showing on every screen instead of only at submit time.
 */
export function EngineStatus({ className }: { className?: string }) {
  const [online, setOnline] = useState<boolean | null>(null)

  useEffect(() => {
    let active = true
    const probe = () => checkHealth().then((ok) => active && setOnline(ok))
    probe()
    const timer = setInterval(probe, 20_000)
    return () => {
      active = false
      clearInterval(timer)
    }
  }, [])

  const label =
    online === null
      ? 'Verificando compilador'
      : online
        ? 'Compilador online'
        : 'Compilador offline'

  return (
    <div
      className={cn(
        'flex shrink-0 items-center gap-2 rounded-lg border px-2.5 py-1.5',
        online === false
          ? 'border-danger/40 bg-danger/10 text-danger'
          : 'border-line bg-surface-raised text-ink-muted',
        className,
      )}
      title={
        online === false
          ? 'Rode `dotnet run` em server/CodeQuest.Api para executar os desafios.'
          : 'Seu código compila e roda de verdade no .NET.'
      }
    >
      <Server
        className={cn(
          'size-4',
          online === null ? 'text-ink-faint' : online ? 'text-success' : 'text-danger',
        )}
      />
      <span className="hidden text-xs font-semibold sm:inline">{label}</span>
    </div>
  )
}
