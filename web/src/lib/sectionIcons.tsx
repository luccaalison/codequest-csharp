import {
  Boxes,
  Brain,
  FunctionSquare,
  Layers,
  Repeat,
  Server,
  Shield,
  Sparkles,
  Wand2,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import type { SectionIcon } from '../content/types'

export const sectionIcons: Record<SectionIcon, LucideIcon> = {
  sparkles: Sparkles,
  repeat: Repeat,
  layers: Layers,
  function: FunctionSquare,
  boxes: Boxes,
  shield: Shield,
  brain: Brain,
  wand: Wand2,
  zap: Zap,
  server: Server,
}
