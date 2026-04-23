'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { CheckboxField } from '@/components/ui/Checkbox'
import { SelectField } from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import api, { getErrorMessage } from '@/lib/api'
import { API, DA_TYPE_OPTIONS } from '@/lib/constants'
import type { Step3Data } from '@/lib/types'
import toast from 'react-hot-toast'

const schema = z.object({
  isFirstGenGraduate: z.boolean(),
  isDifferentlyAbled: z.boolean(),
  daType:             z.string().nullable().optional(),
  isExServicemenWard: z.boolean(),
  isEminentSports:    z.boolean(),
  sportsAchievement:  z.string().nullable().optional(),
}).refine(data => {
  if (data.isDifferentlyAbled && !data.daType) return false
  return true
}, { message: 'Disability type is required', path: ['daType'] })
.refine(data => {
  if (data.isEminentSports && (!data.sportsAchievement || data.sportsAchievement.trim().length < 10)) return false
  return true
}, { message: 'Please describe your sports achievement (min 10 characters)', path: ['sportsAchievement'] })

type FormData = z.infer<typeof schema>

interface Props {
  defaultValues?: Step3Data
  onSuccess: (data: Step3Data) => void
  onBack: () => void
}

export function Step3SpecialCategories({ defaultValues, onSuccess, onBack }: Props) {
  const [loading, setLoading] = useState(false)

  const { handleSubmit, control, watch, register, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      isFirstGenGraduate: defaultValues?.isFirstGenGraduate ?? false,
      isDifferentlyAbled: defaultValues?.isDifferentlyAbled ?? false,
      daType:             defaultValues?.daType ?? null,
      isExServicemenWard: defaultValues?.isExServicemenWard ?? false,
      isEminentSports:    defaultValues?.isEminentSports ?? false,
      sportsAchievement:  defaultValues?.sportsAchievement ?? null,
    },
  })

  const isDifferentlyAbled = watch('isDifferentlyAbled')
  const isEminentSports    = watch('isEminentSports')

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await api.post(API.auth.registerStep(3), {
        isFirstGenGraduate: data.isFirstGenGraduate,
        isDifferentlyAbled: data.isDifferentlyAbled,
        daType:             data.daType ?? null,
        isExServicemenWard: data.isExServicemenWard,
        isEminentSports:    data.isEminentSports,
        sportsAchievement:  data.sportsAchievement ?? null,
      })
      onSuccess(data as Step3Data)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 animate-fade-in">

      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        Select all that apply. These affect your reservation category and quota eligibility.
      </p>

      {/* First Gen Graduate */}
      <div className="rounded-lg border border-cream-300 bg-cream-50 p-4">
        <Controller name="isFirstGenGraduate" control={control} render={({ field }) => (
          <CheckboxField
            label="First Generation Graduate"
            description="Neither parent has completed a graduate degree"
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )} />
      </div>

      {/* Differently Abled */}
      <div className="rounded-lg border border-cream-300 bg-cream-50 p-4 space-y-4">
        <Controller name="isDifferentlyAbled" control={control} render={({ field }) => (
          <CheckboxField
            label="Differently Abled (DA)"
            description="Eligible for special reservation under DA quota"
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )} />

        {isDifferentlyAbled && (
          <Controller name="daType" control={control} render={({ field }) => (
            <SelectField
              label="Disability Type"
              required
              placeholder="Select disability type"
              value={field.value ?? ''}
              onValueChange={field.onChange}
              options={DA_TYPE_OPTIONS}
              error={errors.daType?.message}
            />
          )} />
        )}
      </div>

      {/* Ex-Servicemen Ward */}
      <div className="rounded-lg border border-cream-300 bg-cream-50 p-4">
        <Controller name="isExServicemenWard" control={control} render={({ field }) => (
          <CheckboxField
            label="Ex-Servicemen Ward"
            description="Ward of an ex-serviceman eligible for ESM quota"
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )} />
      </div>

      {/* Eminent Sports */}
      <div className="rounded-lg border border-cream-300 bg-cream-50 p-4 space-y-4">
        <Controller name="isEminentSports" control={control} render={({ field }) => (
          <CheckboxField
            label="Eminent Sports Person"
            description="Eligible for sports quota — achievement details required"
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )} />

        {isEminentSports && (
          <div>
            <label className="form-label">
              Sports Achievement Details <span className="text-rose">*</span>
            </label>
            <textarea
              {...register('sportsAchievement')}
              rows={3}
              placeholder="e.g. State-level gold medalist in 100m sprint, 2024 Tamil Nadu School Games"
              className="w-full rounded-lg border border-cream-400 bg-white px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose transition-all"
            />
            {errors.sportsAchievement && (
              <p className="form-error">{errors.sportsAchievement.message}</p>
            )}
            <p className="form-hint">Used by AI to estimate sports quota chances on college detail pages</p>
          </div>
        )}
      </div>

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