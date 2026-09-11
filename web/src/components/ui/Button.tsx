import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'success' | 'danger' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-strong [--btn-shadow:#125a9e]',
  success: 'bg-success text-slate-950 hover:brightness-110 [--btn-shadow:#1f9c6a]',
  danger: 'bg-danger text-white hover:brightness-110 [--btn-shadow:#b93a3a]',
  ghost: 'bg-transparent text-ink-muted hover:bg-surface-hover hover:text-ink shadow-none',
  outline:
    'bg-surface text-ink border border-line-strong hover:bg-surface-hover [--btn-shadow:#0a0c10]',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-[15px]',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  icon?: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-bold tracking-wide uppercase',
        'disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none',
        variant !== 'ghost' && 'btn-3d',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </button>
  )
}
