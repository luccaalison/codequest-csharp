import { Link, NavLink, Outlet } from 'react-router-dom'
import { Map, Settings, Terminal } from 'lucide-react'
import { EngineStatus } from './EngineStatus'
import { cn } from '../../lib/cn'

const navItems = [
  { to: '/', label: 'Programa', icon: Map, end: true },
  { to: '/ajustes', label: 'Ajustes', icon: Settings, end: false },
]

export function AppShell() {
  return (
    <div className="min-h-screen bg-canvas">
      <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-white">
              <Terminal className="size-5" />
            </span>
            <span className="hidden text-base font-extrabold tracking-tight sm:block">
              CodeQuest <span className="text-brand">C#</span>
            </span>
          </Link>

          <nav className="flex flex-1 items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition',
                    isActive
                      ? 'bg-surface-raised text-ink'
                      : 'text-ink-faint hover:bg-surface hover:text-ink-muted',
                  )
                }
              >
                <item.icon className="size-4" />
                <span className="hidden md:inline">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <EngineStatus />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}
