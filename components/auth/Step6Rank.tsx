'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Info } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import api, { getErrorMessage } from '@/lib/api'
import { API } from '@/lib/constants'
import type { Step6Data } from '@/lib/types'
import toast from 'react-hot-toast'

const schema = z.object({
  tneaRank: z.preprocess(
    val => (val === '' || val === null || val === undefined ? null : Number(val)),
    z.number().int().positive('Rank must be a positive number').nullable()
  ),
})

type FormData = z.infer<typeof schema>

interface Props {
  defaultValues?: Step6Data
  onSuccess: (data: Step6Data) => void
  onBack: () => void
}

export function Step6Rank({ defaultValues, onSuccess, onBack }: Props) {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      tneaRank: defaultValues?.tneaRank ?? null,
    },
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await api.post(API.auth.registerStep(6), { tneaRank: data.tneaRank })
      onSuccess({ tneaRank: data.tneaRank })
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 animate-fade-in">

      {/* Info banner */}
      <div className="flex gap-3 rounded-xl border border-blush-200 bg-blush-100 p-4">
        <Info className="h-5 w-5 shrink-0 text-blush-400 mt-0.5" />
        <div>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            TNEA Rank List is typically released in June
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            You can skip this now and enter your rank later from your profile dashboard once the rank list is released. Entering your rank enables exact round eligibility instead of an estimate.
          </p>
        </div>
      </div>

      <Input
        label="TNEA Rank (Optional)"
        type="number"
        min="1"
        placeholder="e.g. 12500 — leave blank if not yet released"
        error={errors.tneaRank?.message}
        hint="Enter only if the official TNEA rank list has been released"
        {...register('tneaRank')}
      />

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button type="submit" className="flex-1" loading={loading}>
          Complete Registration
        </Button>
      </div>
    </form>
  )
}