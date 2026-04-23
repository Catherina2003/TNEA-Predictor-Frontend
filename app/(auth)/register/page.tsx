'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Mail } from 'lucide-react'
import { WizardProgress } from '@/components/auth/WizardProgress'
import { Step1Basic } from '@/components/auth/Step1Basic'
import { Step2Academic } from '@/components/auth/Step2Academic'
import { Step3SpecialCategories } from '@/components/auth/Step3SpecialCategories'
import { Step4Marks } from '@/components/auth/Step4Marks'
import { Step5Preferences } from '@/components/auth/Step5Preferences'
import { Step6Rank } from '@/components/auth/Step6Rank'
import { Button } from '@/components/ui/Button'
import { useWizard } from '@/hooks/useWizard'

export default function RegisterPage() {
  const [done, setDone] = useState(false)
  const {
    currentStep, data,
    nextStep, prevStep, goToStep,
    saveStep1, saveStep2, saveStep3, saveStep4, saveStep5, saveStep6,
    reset,
  } = useWizard()

  // ── Success screen ───────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="auth-card p-10 text-center animate-fade-in">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sage-100">
            <CheckCircle2 className="h-10 w-10 text-sage" />
          </div>

          <h1 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Registration Complete!
          </h1>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            Welcome to TNEA Counselling Predictor.
          </p>

          <div className="flex items-center gap-3 rounded-xl border border-blush-200 bg-blush-100 p-4 text-left mb-8">
            <Mail className="h-5 w-5 shrink-0 text-blush-400" />
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Check your email
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                We've sent a verification link to{' '}
                <strong>{data.step1?.email}</strong>.
                Click the link to activate your account before logging in.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/login" className="block">
              <Button className="w-full">Go to Login</Button>
            </Link>
            <Link href="/predict" className="block">
              <Button variant="ghost" className="w-full">
                Explore Predictions as Guest
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-xs" style={{ color: 'var(--text-muted)' }}>
            Didn't receive the email? Check spam or{' '}
            <button
              onClick={() => { reset(); setDone(false) }}
              className="underline hover:text-rose transition-colors"
            >
              register again
            </button>
          </p>
        </div>
      </div>
    )
  }

  // ── Wizard ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold gradient-text">Create Your Account</h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-rose hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Card */}
        <div className="auth-card p-8">
          <WizardProgress
            currentStep={currentStep}
            completedStep={data.completedStep}
            onStepClick={goToStep}
          />

          {/* Step forms */}
          {currentStep === 1 && (
            <Step1Basic
              defaultValues={data.step1}
              onSuccess={(d) => { saveStep1(d); nextStep() }}
            />
          )}
          {currentStep === 2 && (
            <Step2Academic
              defaultValues={data.step2}
              onSuccess={(d) => { saveStep2(d); nextStep() }}
              onBack={prevStep}
            />
          )}
          {currentStep === 3 && (
            <Step3SpecialCategories
              defaultValues={data.step3}
              onSuccess={(d) => { saveStep3(d); nextStep() }}
              onBack={prevStep}
            />
          )}
          {currentStep === 4 && (
            <Step4Marks
              defaultValues={data.step4}
              step2Data={data.step2}
              onSuccess={(d) => { saveStep4(d); nextStep() }}
              onBack={prevStep}
            />
          )}
          {currentStep === 5 && (
            <Step5Preferences
              defaultValues={data.step5}
              onSuccess={(d) => { saveStep5(d); nextStep() }}
              onBack={prevStep}
            />
          )}
          {currentStep === 6 && (
            <Step6Rank
              defaultValues={data.step6}
              onSuccess={(d) => {
                saveStep6(d)
                reset()
                setDone(true)
              }}
              onBack={prevStep}
            />
          )}
        </div>
      </div>
    </div>
  )
}