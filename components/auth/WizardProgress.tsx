'use client'

import { Check } from 'lucide-react'
import { WIZARD_STEPS } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface WizardProgressProps {
  currentStep: number
  completedStep: number
  onStepClick: (step: number) => void
}

export function WizardProgress({ currentStep, completedStep, onStepClick }: WizardProgressProps) {
  return (
    <div className="w-full">
      {/* Desktop — horizontal stepper */}
      <div className="hidden lg:flex items-center w-full mb-8">
        {WIZARD_STEPS.map((s, idx) => {
          const isCompleted = completedStep >= s.step
          const isActive    = currentStep === s.step
          const isClickable = completedStep >= s.step - 1

          return (
            <div key={s.step} className="flex items-center flex-1 last:flex-none">
              {/* Step circle */}
              <button
                onClick={() => isClickable && onStepClick(s.step)}
                disabled={!isClickable}
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                  'text-sm font-semibold transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-rose-200 focus:ring-offset-2',
                  isCompleted && !isActive && 'bg-rose text-white shadow-button',
                  isActive    && 'bg-rose text-white shadow-button ring-4 ring-rose-100',
                  !isCompleted && !isActive && 'bg-cream-200 text-cream-400',
                  !isClickable && 'cursor-not-allowed',
                  isClickable && !isActive && 'hover:shadow-button cursor-pointer',
                )}
                title={s.label}
              >
                {isCompleted && !isActive ? (
                  <Check className="h-4 w-4 stroke-[3]" />
                ) : (
                  s.step
                )}
              </button>

              {/* Connector line */}
              {idx < WIZARD_STEPS.length - 1 && (
                <div className={cn(
                  'flex-1 h-0.5 mx-2 transition-all duration-300',
                  completedStep >= s.step ? 'bg-rose' : 'bg-cream-300'
                )} />
              )}
            </div>
          )
        })}
      </div>

      {/* Current step label — desktop */}
      <div className="hidden lg:flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            {WIZARD_STEPS[currentStep - 1]?.label}
          </h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {WIZARD_STEPS[currentStep - 1]?.description}
          </p>
        </div>
        <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
          Step {currentStep} of {WIZARD_STEPS.length}
        </span>
      </div>

      {/* Mobile — compact progress */}
      <div className="lg:hidden mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              {WIZARD_STEPS[currentStep - 1]?.label}
            </h2>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {WIZARD_STEPS[currentStep - 1]?.description}
            </p>
          </div>
          <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
            {currentStep} / {WIZARD_STEPS.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 w-full rounded-full bg-cream-300">
          <div
            className="h-1.5 rounded-full bg-rose transition-all duration-500"
            style={{ width: `${(currentStep / WIZARD_STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}