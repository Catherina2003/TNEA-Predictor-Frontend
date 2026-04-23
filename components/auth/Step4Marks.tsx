'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import api, { getErrorMessage } from '@/lib/api'
import { API } from '@/lib/constants'
import type { Step4Data, Step2Data, VocationalGroup } from '@/lib/types'
import toast from 'react-hot-toast'

const marksField = z
  .preprocess(
    val => (val === '' ? undefined : Number(val)),
    z.number({ required_error: 'Required', invalid_type_error: 'Enter a number' })
      .min(0, 'Cannot be negative')
      .max(100, 'Maximum is 100')
  )

const schema = z.object({
  maths:    marksField,
  subject1: marksField,
  subject2: marksField,
})

type FormData = z.infer<typeof schema>

interface Props {
  defaultValues?: Step4Data
  step2Data?: Step2Data
  onSuccess: (data: Step4Data) => void
  onBack: () => void
}

export function Step4Marks({ defaultValues, step2Data, onSuccess, onBack }: Props) {
  const [loading, setLoading] = useState(false)
  const [subjectLabels, setSubjectLabels] = useState({
    subject1: 'Physics',
    subject2: 'Chemistry',
  })
  const [cutoffPreview, setCutoffPreview] = useState<number | null>(null)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      maths:    defaultValues?.maths ?? ('' as unknown as number),
      subject1: defaultValues?.subject1 ?? ('' as unknown as number),
      subject2: defaultValues?.subject2 ?? ('' as unknown as number),
    },
  })

  const maths    = watch('maths')
  const subject1 = watch('subject1')
  const subject2 = watch('subject2')

  // Load vocational group subject names if vocational stream
  useEffect(() => {
    if (step2Data?.stream !== 'VOCATIONAL' || !step2Data.vocationalGroupName) return
    api.get<VocationalGroup[]>(API.reference.vocationalGroups)
      .then(r => {
        const group = r.data.find(g => g.name === step2Data.vocationalGroupName)
        if (group) {
          setSubjectLabels({ subject1: group.subject1Name, subject2: group.subject2Name })
        }
      })
      .catch(() => {})
  }, [step2Data])

  // Live cutoff calculation
  useEffect(() => {
    const m  = Number(maths)
    const s1 = Number(subject1)
    const s2 = Number(subject2)
    if (!isNaN(m) && !isNaN(s1) && !isNaN(s2) && m >= 0 && s1 >= 0 && s2 >= 0) {
      setCutoffPreview(Math.round((m + s1 / 2 + s2 / 2) * 100) / 100)
    } else {
      setCutoffPreview(null)
    }
  }, [maths, subject1, subject2])

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await api.post(API.auth.registerStep(4), data)
      onSuccess({ maths: data.maths, subject1: data.subject1, subject2: data.subject2 })
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 animate-fade-in">
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        Enter your 12th standard marks out of 100 for each subject.
      </p>

      <Input
        label="Maths"
        type="number"
        step="0.01"
        min="0"
        max="100"
        placeholder="e.g. 95"
        required
        error={errors.maths?.message}
        {...register('maths')}
      />

      <Input
        label={subjectLabels.subject1}
        type="number"
        step="0.01"
        min="0"
        max="100"
        placeholder="e.g. 88"
        required
        error={errors.subject1?.message}
        {...register('subject1')}
      />

      <Input
        label={subjectLabels.subject2}
        type="number"
        step="0.01"
        min="0"
        max="100"
        placeholder="e.g. 91"
        required
        error={errors.subject2?.message}
        {...register('subject2')}
      />

      {/* Live cutoff preview */}
      {cutoffPreview !== null && (
        <div className="rounded-xl border border-sage-100 bg-sage-100 p-4 animate-fade-in">
          <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
            Your TNEA Cutoff Score
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold" style={{ color: '#4E7A38' }}>
              {cutoffPreview}
            </span>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>/ 200</span>
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Formula: Maths + ({subjectLabels.subject1}/2) + ({subjectLabels.subject2}/2)
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button type="submit" className="flex-1" loading={loading}>
          Continue
        </Button>
      </div>
    </form>
  )
}