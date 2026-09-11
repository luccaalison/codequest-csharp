import { useEffect, useMemo, useState } from 'react'
import Editor, { type Monaco } from '@monaco-editor/react'
import {
  AlertCircle,
  Check,
  ChevronDown,
  Eye,
  Lightbulb,
  Loader2,
  Play,
  RotateCcw,
  TerminalSquare,
  X,
} from 'lucide-react'
import type { Challenge } from '../../content/types'
import { execute, toExecutePayload, type ExecuteResult } from '../../lib/api'
import { Button } from '../ui/Button'
import { CodeBlock } from '../ui/CodeBlock'
import { RichText } from '../ui/RichText'
import { cn } from '../../lib/cn'

const EDITOR_THEME = 'codequest-dark'

function defineTheme(monaco: Monaco) {
  monaco.editor.defineTheme(EDITOR_THEME, {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '5f6b7a', fontStyle: 'italic' },
      { token: 'keyword', foreground: '63b6ff' },
      { token: 'string', foreground: 'f0a86a' },
      { token: 'number', foreground: 'ffd479' },
      { token: 'type', foreground: '4ee0b8' },
      { token: 'identifier', foreground: 'e8edf5' },
    ],
    colors: {
      'editor.background': '#0d1117',
      'editor.lineHighlightBackground': '#161b24',
      'editorLineNumber.foreground': '#3a4453',
      'editorLineNumber.activeForeground': '#9aa7b8',
      'editorGutter.background': '#0d1117',
      'editorIndentGuide.background1': '#1c2431',
      'editorCursor.foreground': '#3b9dfb',
      'editor.selectionBackground': '#1d4c78',
    },
  })
}

interface ChallengeStepProps {
  challenge: Challenge
  code: string
  onCodeChange: (code: string) => void
  solved: boolean
  onSolved: () => void
}

export function ChallengeStep({
  challenge,
  code,
  onCodeChange,
  solved,
  onSolved,
}: ChallengeStepProps) {
  const [running, setRunning] = useState<'none' | 'run' | 'verify'>('none')
  const [result, setResult] = useState<ExecuteResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [revealedHints, setRevealedHints] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [failedAttempts, setFailedAttempts] = useState(0)

  const visibleTests = useMemo(
    () => challenge.tests.filter((test) => !test.hidden),
    [challenge.tests],
  )
  const hiddenCount = challenge.tests.length - visibleTests.length

  useEffect(() => {
    setResult(null)
    setError(null)
    setRevealedHints(0)
    setShowSolution(false)
    setFailedAttempts(0)
  }, [challenge])

  async function run(mode: 'run' | 'verify') {
    setRunning(mode)
    setError(null)
    try {
      const payload =
        mode === 'verify'
          ? toExecutePayload(code, challenge.tests, {
              timeoutMs: challenge.timeoutMs,
              capabilities: challenge.capabilities,
              nullable: challenge.nullable,
            })
          : {
              code,
              stdin: visibleTests[0]?.stdin,
              timeoutMs: challenge.timeoutMs,
              capabilities: challenge.capabilities,
              nullable: challenge.nullable,
            }

      const response = await execute(payload)
      setResult(response)

      if (mode === 'verify') {
        if (response.success) onSolved()
        else setFailedAttempts((count) => count + 1)
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : String(caught))
      setResult(null)
    } finally {
      setRunning('none')
    }
  }

  const busy = running !== 'none'
  const errors = result?.diagnostics.filter((d) => d.severity === 'Error') ?? []
  const warnings = result?.diagnostics.filter((d) => d.severity === 'Warning') ?? []

  return (
    <div className="animate-rise space-y-5">
      <header>
        <p className="text-xs font-bold uppercase tracking-widest text-warn">Desafio técnico</p>
        <h2 className="mt-1.5 text-xl font-extrabold tracking-tight text-ink">Escreva o código</h2>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="space-y-4">
          <div className="panel p-4">
            <RichText body={challenge.brief} className="text-sm" />

            {challenge.requirements && challenge.requirements.length > 0 && (
              <ul className="mt-4 space-y-2 border-t border-line pt-4">
                {challenge.requirements.map((requirement, index) => (
                  <li key={index} className="flex gap-2.5 text-sm text-ink-muted">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-warn" />
                    <RichText body={requirement} className="space-y-1" />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="panel p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
              <TerminalSquare className="size-4 text-ink-faint" />
              Casos de teste
            </h3>
            <ul className="space-y-2.5">
              {visibleTests.map((test) => {
                const testResult = result?.results.find((r) => r.name === test.name)
                return (
                  <li
                    key={test.name}
                    className="rounded-lg border border-line bg-surface-raised p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-ink">{test.name}</span>
                      {testResult && (
                        <span
                          className={cn(
                            'flex items-center gap-1 text-[11px] font-bold',
                            testResult.passed ? 'text-success' : 'text-danger',
                          )}
                        >
                          {testResult.passed ? (
                            <Check className="size-3.5" strokeWidth={3} />
                          ) : (
                            <X className="size-3.5" strokeWidth={3} />
                          )}
                          {testResult.durationMs} ms
                        </span>
                      )}
                    </div>

                    {test.stdin && (
                      <p className="mt-2 font-mono text-[11px] text-ink-faint">
                        entrada: <span className="text-ink-muted">{test.stdin.replace(/\n/g, ' ⏎ ')}</span>
                      </p>
                    )}
                    <p className="mt-1 font-mono text-[11px] text-ink-faint">
                      esperado:{' '}
                      <span className="text-ink-muted">
                        {test.expectedStdout.replace(/\n/g, ' ⏎ ')}
                      </span>
                    </p>
                    {testResult && !testResult.passed && (
                      <p className="mt-1 font-mono text-[11px] text-danger">
                        obtido: {testResult.actual.trim().replace(/\n/g, ' ⏎ ') || '(vazio)'}
                      </p>
                    )}
                  </li>
                )
              })}
            </ul>
            {hiddenCount > 0 && (
              <p className="mt-3 text-[11px] text-ink-faint">
                + {hiddenCount} caso{hiddenCount > 1 ? 's' : ''} oculto
                {hiddenCount > 1 ? 's' : ''} que também precisa
                {hiddenCount > 1 ? 'm' : ''} passar.
              </p>
            )}
          </div>

          {challenge.hints.length > 0 && (
            <div className="panel p-4">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
                <Lightbulb className="size-4 text-warn" />
                Dicas
              </h3>
              <ul className="space-y-2.5">
                {challenge.hints.slice(0, revealedHints).map((hint, index) => (
                  <li key={index} className="rounded-lg border border-warn/25 bg-warn/5 p-3">
                    <RichText body={hint} className="text-sm" />
                  </li>
                ))}
              </ul>
              {revealedHints < challenge.hints.length && (
                <button
                  type="button"
                  onClick={() => setRevealedHints((count) => count + 1)}
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-line py-2 text-xs font-semibold text-ink-muted transition hover:bg-surface-hover hover:text-ink"
                >
                  <ChevronDown className="size-3.5" />
                  Ver dica {revealedHints + 1} de {challenge.hints.length}
                </button>
              )}
            </div>
          )}

          {(solved || failedAttempts >= 3) && (
            <div className="panel p-4">
              {showSolution ? (
                <>
                  <h3 className="mb-3 text-sm font-bold text-ink">Uma solução possível</h3>
                  <CodeBlock code={challenge.solution} />
                  <p className="mt-2 text-[11px] text-ink-faint">
                    Existem outras formas corretas. Compare com a sua e veja o que mudaria.
                  </p>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowSolution(true)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-line py-2 text-xs font-semibold text-ink-muted transition hover:bg-surface-hover hover:text-ink"
                >
                  <Eye className="size-3.5" />
                  Ver uma solução possível
                </button>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="overflow-hidden rounded-xl border border-line">
            <div className="flex items-center justify-between border-b border-line bg-surface-raised px-3 py-2">
              <span className="font-mono text-[11px] text-ink-faint">Program.cs</span>
              <button
                type="button"
                onClick={() => onCodeChange(challenge.starterCode)}
                className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-faint transition hover:text-ink"
              >
                <RotateCcw className="size-3" />
                Reiniciar
              </button>
            </div>
            <Editor
              height="380px"
              language="csharp"
              theme={EDITOR_THEME}
              value={code}
              beforeMount={defineTheme}
              onChange={(value) => onCodeChange(value ?? '')}
              options={{
                fontSize: 13.5,
                fontFamily: "'JetBrains Mono', monospace",
                fontLigatures: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                tabSize: 4,
                renderLineHighlight: 'line',
                padding: { top: 14, bottom: 14 },
                smoothScrolling: true,
                automaticLayout: true,
                bracketPairColorization: { enabled: true },
              }}
            />
          </div>

          <div className="flex gap-2.5">
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              disabled={busy}
              onClick={() => run('run')}
              icon={
                running === 'run' ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Play className="size-4" />
                )
              }
            >
              Executar
            </Button>
            <Button
              variant={solved ? 'success' : 'primary'}
              size="md"
              className="flex-1"
              disabled={busy}
              onClick={() => run('verify')}
              icon={
                running === 'verify' ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Check className="size-4" />
                )
              }
            >
              Verificar
            </Button>
          </div>

          {error && (
            <div className="flex gap-2.5 rounded-xl border border-danger/40 bg-danger/8 p-3.5">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-danger" />
              <p className="text-sm text-ink-muted">{error}</p>
            </div>
          )}

          {result?.rejectionReason && (
            <div className="flex gap-2.5 rounded-xl border border-warn/40 bg-warn/8 p-3.5">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-warn" />
              <p className="text-sm text-ink-muted">{result.rejectionReason}</p>
            </div>
          )}

          {errors.length > 0 && (
            <div className="rounded-xl border border-danger/40 bg-danger/8 p-3.5">
              <p className="mb-2 text-sm font-bold text-danger">
                O código não compilou ({errors.length} erro{errors.length > 1 ? 's' : ''})
              </p>
              <ul className="space-y-1.5">
                {errors.map((diagnostic, index) => (
                  <li key={index} className="font-mono text-xs text-ink-muted">
                    <span className="text-danger">linha {diagnostic.line}</span>{' '}
                    <span className="text-ink-faint">{diagnostic.id}</span> {diagnostic.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result?.compiled && (
            <div className="panel p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-bold text-ink">
                  {result.success ? (
                    <span className="text-success">Todos os testes passaram</span>
                  ) : (
                    <>
                      {result.passedCount} de {result.totalCount} testes passaram
                    </>
                  )}
                </p>
                <span className="font-mono text-[11px] text-ink-faint">
                  compilou em {result.compileMs} ms
                </span>
              </div>

              {result.results.map((testResult, index) => (
                <div key={index} className="border-t border-line py-2.5 first:border-0 first:pt-0">
                  <div className="flex items-center gap-2">
                    {testResult.passed ? (
                      <Check className="size-3.5 shrink-0 text-success" strokeWidth={3} />
                    ) : (
                      <X className="size-3.5 shrink-0 text-danger" strokeWidth={3} />
                    )}
                    <span className="text-xs font-semibold text-ink">{testResult.name}</span>
                    {testResult.hidden && (
                      <span className="rounded bg-surface-hover px-1.5 py-0.5 text-[10px] text-ink-faint">
                        oculto
                      </span>
                    )}
                  </div>

                  {!testResult.hidden && (testResult.actual || testResult.stderr) && (
                    <pre className="code-scroll mt-2 max-h-40 overflow-auto rounded-lg bg-black/40 p-2.5 font-mono text-[11px] whitespace-pre-wrap text-ink-muted">
                      {testResult.actual}
                      {testResult.stderr && (
                        <span className="text-danger">{testResult.stderr}</span>
                      )}
                    </pre>
                  )}
                </div>
              ))}

              {warnings.length > 0 && (
                <details className="mt-2 border-t border-line pt-2.5">
                  <summary className="cursor-pointer text-[11px] font-semibold text-warn">
                    {warnings.length} aviso{warnings.length > 1 ? 's' : ''} do compilador
                  </summary>
                  <ul className="mt-1.5 space-y-1">
                    {warnings.map((diagnostic, index) => (
                      <li key={index} className="font-mono text-[11px] text-ink-faint">
                        linha {diagnostic.line}: {diagnostic.message}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
