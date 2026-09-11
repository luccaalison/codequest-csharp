import { cn } from '../../lib/cn'

interface ProgressBarProps {
  value: number
  max: number
  className?: string
  barClassName?: string
  label?: string
}

export function ProgressBar({ value, max, className, barClassName, label }: ProgressBarProps) {
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className={cn('h-2.5 w-full overflow-hidden rounded-full bg-line', className)}
    >
      <div
        className={cn('h-full rounded-full bg-brand transition-[width] duration-500', barClassName)}
        style={{ width: `${ratio * 100}%` }}
      />
    </div>
  )
}

/** Segmented progress used in the lesson header, one pip per step. */
export function StepPips({
  total,
  current,
  className,
}: {
  total: number
  current: number
  className?: string
}) {
  return (
    <div className={cn('flex flex-1 items-center gap-1', className)}>
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={cn(
            'h-2 flex-1 rounded-full transition-colors duration-300',
            index < current ? 'bg-success' : index === current ? 'bg-brand' : 'bg-line',
          )}
        />
      ))}
    </div>
  )
}
