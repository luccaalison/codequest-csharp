import type { SectionAccent } from '../content/types'

export interface AccentTokens {
  /** Solid fill for primary buttons and completed path nodes. */
  solid: string
  /** Text color for section labels. */
  text: string
  /** Subtle background wash for cards and badges. */
  wash: string
  /** Border used when a card is the active section. */
  ring: string
  /** Raw hex, for inline gradients and SVG strokes. */
  hex: string
}

export const accents: Record<SectionAccent, AccentTokens> = {
  sky: {
    solid: 'bg-sky-500 hover:bg-sky-400 text-slate-950',
    text: 'text-sky-400',
    wash: 'bg-sky-500/10',
    ring: 'ring-sky-500/60',
    hex: '#38bdf8',
  },
  violet: {
    solid: 'bg-violet-500 hover:bg-violet-400 text-white',
    text: 'text-violet-400',
    wash: 'bg-violet-500/10',
    ring: 'ring-violet-500/60',
    hex: '#a78bfa',
  },
  emerald: {
    solid: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950',
    text: 'text-emerald-400',
    wash: 'bg-emerald-500/10',
    ring: 'ring-emerald-500/60',
    hex: '#34d399',
  },
  amber: {
    solid: 'bg-amber-500 hover:bg-amber-400 text-slate-950',
    text: 'text-amber-400',
    wash: 'bg-amber-500/10',
    ring: 'ring-amber-500/60',
    hex: '#fbbf24',
  },
  rose: {
    solid: 'bg-rose-500 hover:bg-rose-400 text-white',
    text: 'text-rose-400',
    wash: 'bg-rose-500/10',
    ring: 'ring-rose-500/60',
    hex: '#fb7185',
  },
  cyan: {
    solid: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950',
    text: 'text-cyan-400',
    wash: 'bg-cyan-500/10',
    ring: 'ring-cyan-500/60',
    hex: '#22d3ee',
  },
  orange: {
    solid: 'bg-orange-500 hover:bg-orange-400 text-slate-950',
    text: 'text-orange-400',
    wash: 'bg-orange-500/10',
    ring: 'ring-orange-500/60',
    hex: '#fb923c',
  },
  indigo: {
    solid: 'bg-indigo-500 hover:bg-indigo-400 text-white',
    text: 'text-indigo-400',
    wash: 'bg-indigo-500/10',
    ring: 'ring-indigo-500/60',
    hex: '#818cf8',
  },
  teal: {
    solid: 'bg-teal-500 hover:bg-teal-400 text-slate-950',
    text: 'text-teal-400',
    wash: 'bg-teal-500/10',
    ring: 'ring-teal-500/60',
    hex: '#2dd4bf',
  },
  fuchsia: {
    solid: 'bg-fuchsia-500 hover:bg-fuchsia-400 text-white',
    text: 'text-fuchsia-400',
    wash: 'bg-fuchsia-500/10',
    ring: 'ring-fuchsia-500/60',
    hex: '#e879f9',
  },
}
