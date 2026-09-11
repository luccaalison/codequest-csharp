export interface Token {
  text: string
  className?: string
}

const CONTROL_KEYWORDS = new Set([
  'if', 'else', 'for', 'foreach', 'while', 'do', 'switch', 'case', 'default',
  'break', 'continue', 'return', 'goto', 'try', 'catch', 'finally', 'throw',
  'yield', 'await', 'when', 'lock',
])

const KEYWORDS = new Set([
  'abstract', 'as', 'async', 'base', 'checked', 'class', 'const', 'delegate',
  'enum', 'event', 'explicit', 'extern', 'false', 'fixed', 'get', 'global',
  'implicit', 'in', 'init', 'interface', 'internal', 'is', 'namespace', 'new',
  'null', 'operator', 'out', 'override', 'params', 'partial', 'private',
  'protected', 'public', 'readonly', 'record', 'ref', 'required', 'sealed',
  'set', 'sizeof', 'stackalloc', 'static', 'struct', 'this', 'true', 'typeof',
  'unchecked', 'unsafe', 'using', 'var', 'virtual', 'void', 'volatile', 'where',
  'with', 'not', 'and', 'or',
])

const PRIMITIVES = new Set([
  'bool', 'byte', 'char', 'decimal', 'double', 'dynamic', 'float', 'int',
  'long', 'nint', 'nuint', 'object', 'sbyte', 'short', 'string', 'uint',
  'ulong', 'ushort',
])

const PATTERN = new RegExp(
  [
    String.raw`(?<comment>\/\/[^\n]*|\/\*[\s\S]*?\*\/)`,
    String.raw`(?<string>[$@]{0,2}"(?:[^"\\]|\\.|"")*"|'(?:[^'\\]|\\.)*')`,
    String.raw`(?<number>\b\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?[fFdDmMuUlL]{0,2}\b)`,
    String.raw`(?<word>[A-Za-z_]\w*)`,
    String.raw`(?<punct>[{}()[\];,.<>+\-*/%=!&|^~?:]+)`,
  ].join('|'),
  'g',
)

/**
 * Small hand-rolled C# tokenizer used for read-only snippets. Monaco already handles the editor,
 * so this only needs to be good enough for teaching material — and it costs nothing to load.
 */
export function tokenizeCSharp(source: string): Token[] {
  const tokens: Token[] = []
  let lastIndex = 0

  PATTERN.lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = PATTERN.exec(source)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: source.slice(lastIndex, match.index) })
    }

    const groups = match.groups ?? {}
    const text = match[0]

    if (groups.comment) {
      tokens.push({ text, className: 'tok-comment' })
    } else if (groups.string) {
      tokens.push({ text, className: 'tok-string' })
    } else if (groups.number) {
      tokens.push({ text, className: 'tok-number' })
    } else if (groups.word) {
      tokens.push({ text, className: classifyWord(text, source, match.index + text.length) })
    } else {
      tokens.push({ text, className: 'tok-punct' })
    }

    lastIndex = match.index + text.length
  }

  if (lastIndex < source.length) tokens.push({ text: source.slice(lastIndex) })
  return tokens
}

function classifyWord(word: string, source: string, endIndex: number): string | undefined {
  if (CONTROL_KEYWORDS.has(word)) return 'tok-control'
  if (KEYWORDS.has(word) || PRIMITIVES.has(word)) return 'tok-keyword'

  // `Foo(` is a call, `Foo` alone is treated as a type name.
  const rest = source.slice(endIndex)
  if (/^\s*\(/.test(rest)) return 'tok-method'
  if (/^[A-Z]/.test(word)) return 'tok-type'
  return undefined
}
