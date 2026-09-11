import type { ChallengeTest, NullableMode, OutputComparison } from '../content/types'

export interface ExecutePayload {
  code: string
  tests?: Array<{
    name: string
    stdin?: string
    expectedStdout: string
    comparison?: OutputComparison
    hidden?: boolean
  }>
  stdin?: string
  timeoutMs?: number
  capabilities?: string[]
  nullable?: NullableMode
}

export interface CompilerDiagnostic {
  id: string
  severity: 'Error' | 'Warning'
  message: string
  line: number
  column: number
  endLine: number
  endColumn: number
}

export interface TestResult {
  name: string
  passed: boolean
  hidden: boolean
  stdin: string | null
  expected: string
  actual: string
  stderr: string
  exitCode: number
  timedOut: boolean
  truncated: boolean
  durationMs: number
}

export interface ExecuteResult {
  success: boolean
  compiled: boolean
  rejectionReason: string | null
  diagnostics: CompilerDiagnostic[]
  results: TestResult[]
  passedCount: number
  totalCount: number
  compileMs: number
  totalMs: number
}

export class ApiUnavailableError extends Error {
  constructor() {
    super(
      'Não consegui falar com o serviço de execução. Verifique se a API está rodando ' +
        '(dotnet run em server/CodeQuest.Api) e tente de novo.',
    )
    this.name = 'ApiUnavailableError'
  }
}

const BASE = import.meta.env.VITE_API_BASE ?? ''

export async function execute(payload: ExecutePayload): Promise<ExecuteResult> {
  let response: Response
  try {
    response = await fetch(`${BASE}/api/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new ApiUnavailableError()
  }

  if (response.status === 429) {
    throw new Error('Muitas execuções ao mesmo tempo. Aguarde um instante e rode novamente.')
  }

  if (!response.ok) {
    throw new Error(`O serviço de execução respondeu ${response.status}.`)
  }

  return (await response.json()) as ExecuteResult
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${BASE}/api/health`)
    return response.ok
  } catch {
    return false
  }
}

export function toExecutePayload(
  code: string,
  tests: ChallengeTest[],
  options: { timeoutMs?: number; capabilities?: string[]; nullable?: NullableMode } = {},
): ExecutePayload {
  return {
    code,
    tests: tests.map((test) => ({
      name: test.name,
      stdin: test.stdin,
      expectedStdout: test.expectedStdout,
      comparison: test.comparison ?? 'trimmed',
      hidden: test.hidden ?? false,
    })),
    timeoutMs: options.timeoutMs,
    capabilities: options.capabilities,
    nullable: options.nullable,
  }
}
