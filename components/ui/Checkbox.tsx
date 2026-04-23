'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CheckboxFieldProps {
  id?: string
  label: string
  description?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

export function CheckboxField({
  id,
  label,
  description,
  checked,
  onCheckedChange,
  disabled,
}: CheckboxFieldProps) {
  const fieldId = id || label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex items-start gap-3">
      <CheckboxPrimitive.Root
        id={fieldId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          'peer h-5 w-5 shrink-0 rounded border-2 border-blush bg-white',
          'transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[state=checked]:bg-rose data-[state=checked]:border-rose',
          'mt-0.5'
        )}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          <Check className="h-3 w-3 text-white stroke-[3]" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <div className="flex-1">
        <label
          htmlFor={fieldId}
          className="text-sm font-medium cursor-pointer select-none"
          style={{ color: 'var(--text-primary)' }}
        >
          {label}
        </label>
        {description && (
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {description}
          </p>
        )}
      </div>
    </div>
  )
}