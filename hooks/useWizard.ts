'use client'

import { useState, useCallback, useEffect } from 'react'
import type { WizardData, Step1Data, Step2Data, Step3Data, Step4Data, Step5Data, Step6Data } from '@/lib/types'

const STORAGE_KEY = 'tnea_wizard_data'

const initialState: WizardData = {
  completedStep: 0,
}

// ── Hook ───────────────────────────────────────────────────────────────────

export function useWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<WizardData>(initialState)
  const [isLoading, setIsLoading] = useState(false)

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed: WizardData = JSON.parse(stored)
        setData(parsed)
        // Resume from the next incomplete step
        const resumeStep = Math.min(parsed.completedStep + 1, 6)
        setCurrentStep(resumeStep)
      }
    } catch {
      // Corrupted storage — start fresh
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  // Persist to localStorage whenever data changes
  const persist = useCallback((updated: WizardData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
      // Storage full — continue without persistence
    }
    setData(updated)
  }, [])

  // ── Step navigation ──────────────────────────────────────────────────────

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(1, Math.min(6, step)))
  }, [])

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 6))
  }, [])

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }, [])

  // ── Step data setters ────────────────────────────────────────────────────

  const saveStep1 = useCallback((step1: Step1Data) => {
    const updated = { ...data, step1, completedStep: Math.max(data.completedStep, 1) }
    persist(updated)
  }, [data, persist])

  const saveStep2 = useCallback((step2: Step2Data) => {
    const updated = { ...data, step2, completedStep: Math.max(data.completedStep, 2) }
    persist(updated)
  }, [data, persist])

  const saveStep3 = useCallback((step3: Step3Data) => {
    const updated = { ...data, step3, completedStep: Math.max(data.completedStep, 3) }
    persist(updated)
  }, [data, persist])

  const saveStep4 = useCallback((step4: Step4Data) => {
    const updated = { ...data, step4, completedStep: Math.max(data.completedStep, 4) }
    persist(updated)
  }, [data, persist])

  const saveStep5 = useCallback((step5: Step5Data) => {
    const updated = { ...data, step5, completedStep: Math.max(data.completedStep, 5) }
    persist(updated)
  }, [data, persist])

  const saveStep6 = useCallback((step6: Step6Data) => {
    const updated = { ...data, step6, completedStep: 6 }
    persist(updated)
  }, [data, persist])

  // ── Reset ────────────────────────────────────────────────────────────────

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setData(initialState)
    setCurrentStep(1)
  }, [])

  return {
    currentStep,
    data,
    isLoading,
    setIsLoading,
    goToStep,
    nextStep,
    prevStep,
    saveStep1,
    saveStep2,
    saveStep3,
    saveStep4,
    saveStep5,
    saveStep6,
    reset,
  }
}