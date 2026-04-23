'use client'

import { cn } from '@/lib/utils'

// ── Spinner ────────────────────────────────────────────────────────────────

export function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'h-6 w-6 animate-spin rounded-full border-2 border-cream-300 border-t-rose',
        className
      )}
    />
  )
}

export function PageSpinner() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Spinner className="h-10 w-10" />
    </div>
  )
}

// ── Badge ──────────────────────────────────────────────────────────────────

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-cream-200 text-rose-400',
    success: 'bg-sage-100 text-sage-500',
    warning: 'bg-blush-100 text-blush-400',
    error:   'bg-rose-100 text-rose-400',
    info:    'bg-pink-100 text-pink-400',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}