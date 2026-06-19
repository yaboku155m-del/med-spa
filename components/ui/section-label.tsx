import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  align?: 'left' | 'center'
}

/** Uppercase champagne eyebrow label used above section headlines. */
export function SectionLabel({
  children,
  className,
  align = 'center',
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3',
        align === 'center' ? 'justify-center' : 'justify-start',
        className,
      )}
    >
      <span className="h-px w-12 bg-accent" aria-hidden="true" />
      <span className="text-lg font-medium uppercase tracking-[0.22em] text-accent">
        {children}
      </span>
      <span className="h-px w-12 bg-accent" aria-hidden="true" />
    </div>
  )
}
