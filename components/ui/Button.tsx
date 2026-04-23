'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary — rose brand colour
        primary:
          'bg-rose text-white shadow-button hover:bg-rose-400 active:bg-rose-500',
        // Secondary — blush outlined
        secondary:
          'border-2 border-blush bg-white text-rose hover:bg-blush-100 active:bg-blush-200',
        // Ghost — transparent
        ghost:
          'bg-transparent text-rose hover:bg-rose-100 active:bg-rose-200',
        // Outline — cream border
        outline:
          'border border-cream-400 bg-white hover:bg-cream-100',
        // Destructive
        destructive:
          'bg-rose-400 text-white hover:bg-rose-500',
        // Link
        link:
          'text-rose underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm:      'h-8  px-3 text-xs',
        default: 'h-10 px-5 text-sm',
        lg:      'h-12 px-8 text-base',
        icon:    'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }