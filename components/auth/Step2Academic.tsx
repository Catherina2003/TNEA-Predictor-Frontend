'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import { SelectField } from '@/components/ui/Select'
import { CheckboxField } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'
import api, { getErrorMessage } from '@/lib/api'
import { API, COMMUNITY_OPTIONS, SCHOOL_BOARD_OPTIONS, STREAM_OPTIONS, SCHOOL_TYPE_OPTIONS, GOVT_SCHOOL_TYPE_OPTIONS } from '@/lib/constants'
import type { Step2Data, VocationalGroup } from '@/lib/types'
import toast from 'react-hot-toast'

const schema = z.object({
  community:           z.enum(['OC','BC','BCM','MBC','SC','SCA','ST'], { required_error: 'Community is required' }),
  schoolBoard:         z.enum(['State','CBSE','ICSE'], { required_error: 'School board is required' }),
  stream:              z.enum(['ACADEMIC','VOCATIONAL'], { required_error: 'Stream is required' }),
  vocationalGroupName: z.string().nullable().optional(),
  schoolType:          z.enum(['Govt','Private'], { required_error: 'School type is required' }),
  govtSchoolType:      z.string().nullable().optional(),
  studiedClass6To12:   z.boolean().nullable().optional(),
}).refine(data => {
  if (data.stream === 'VOCATIONAL' && !data.vocationalGroupName) return false
  return true
}, { message: 'Vocational group is required for vocational stream', path: ['vocationalGroupName'] })
.refine(data => {
  if (data.schoolType === 'Govt' && !data.govtSchoolType) return false
  return true
}, { message: 'Government school type is required', path: ['govtSchoolType'] })

type FormData = z.infer<typeof schema>

interface Props {
  defaultValues?: Step2Data
  sessionId?: string
  onSuccess: (data: Step2Data) => void
  onBack: () => void
}

export function Step2Academic({ defaultValues, onSuccess, onBack }: Props) {
  const [loading, setLoading] = useState(false)
  const [vocationalGroups, setVocationalGroups] = useState<VocationalGroup[]>([])
  const [loadingGroups, setLoadingGroups] = useState(false)

  const { handleSubmit, control, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      community:           defaultValues?.community ?? undefined,
      schoolBoard:         defaultValues?.schoolBoard ?? undefined,
      stream:              defaultValues?.stream ?? 'ACADEMIC',
      vocationalGroupName: defaultValues?.vocationalGroupName ?? null,
      schoolType:          defaultValues?.schoolType ?? undefined,
      govtSchoolType:      defaultValues?.govtSchoolType ?? null,
      studiedClass6To12:   defaultValues?.studiedClass6To12 ?? null,
    },
  })

  const stream     = watch('stream')
  const schoolType = watch('schoolType')
  const isVocational = stream === 'VOCATIONAL'
  const isGovt       = schoolType === 'Govt'

  // Load vocational groups when vocational stream is selected
  useEffect(() => {
    if (!isVocational || vocationalGroups.length > 0) return
    setLoadingGroups(true)
    api.get<VocationalGroup[]>(API.reference.vocationalGroups)
      .then(r => setVocationalGroups(r.data))
      .catch(() => toast.error('Failed to load vocational groups'))
      .finally(() => setLoadingGroups(false))
  }, [isVocational, vocationalGroups.length])

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await api.post(API.auth.registerStep(2), {
        community:           data.community,
        schoolBoard:         data.schoolBoard,
        stream:              data.stream,
        vocationalGroupName: data.vocationalGroupName ?? null,
        schoolType:          data.schoolType,
        govtSchoolType:      data.govtSchoolType ?? null,
        studiedClass6To12:   data.studiedClass6To12 ?? null,
      })
      onSuccess(data as Step2Data)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 animate-fade-in">
      {/* Community */}
      <Controller name="community" control={control} render={({ field }) => (
        <SelectField
          label="Community"
          required
          placeholder="Select your community"
          value={field.value}
          onValueChange={field.onChange}
          options={COMMUNITY_OPTIONS}
          error={errors.community?.message}
        />
      )} />

      {/* School Board */}
      <Controller name="schoolBoard" control={control} render={({ field }) => (
        <SelectField
          label="School Board"
          required
          placeholder="Select your school board"
          value={field.value}
          onValueChange={field.onChange}
          options={SCHOOL_BOARD_OPTIONS}
          error={errors.schoolBoard?.message}
        />
      )} />

      {/* Stream */}
      <Controller name="stream" control={control} render={({ field }) => (
        <SelectField
          label="Stream"
          required
          placeholder="Select your stream"
          value={field.value}
          onValueChange={field.onChange}
          options={STREAM_OPTIONS}
          error={errors.stream?.message}
        />
      )} />

      {/* Vocational Group — conditional */}
      {isVocational && (
        <Controller name="vocationalGroupName" control={control} render={({ field }) => (
          <SelectField
            label="Vocational Group"
            required
            placeholder={loadingGroups ? 'Loading groups...' : 'Select your vocational group'}
            value={field.value ?? ''}
            onValueChange={field.onChange}
            options={vocationalGroups.map(g => ({ value: g.name, label: g.name }))}
            error={errors.vocationalGroupName?.message}
            disabled={loadingGroups}
            hint="Select the group matching your 11th & 12th vocational subjects"
          />
        )} />
      )}

      {/* School Type */}
      <Controller name="schoolType" control={control} render={({ field }) => (
        <SelectField
          label="School Type"
          required
          placeholder="Select school type"
          value={field.value}
          onValueChange={field.onChange}
          options={SCHOOL_TYPE_OPTIONS}
          error={errors.schoolType?.message}
        />
      )} />

      {/* Govt School Type — conditional */}
      {isGovt && (
        <>
          <Controller name="govtSchoolType" control={control} render={({ field }) => (
            <SelectField
              label="Government School Type"
              required
              placeholder="Select govt school type"
              value={field.value ?? ''}
              onValueChange={field.onChange}
              options={GOVT_SCHOOL_TYPE_OPTIONS}
              error={errors.govtSchoolType?.message}
              hint="Required for 7.5% government school quota eligibility"
            />
          )} />

          {/* Studied class 6–12 checkbox */}
          <div className="rounded-lg border border-blush-200 bg-blush-100 p-4">
            <Controller name="studiedClass6To12" control={control} render={({ field }) => (
              <CheckboxField
                label="I studied from Class 6 to 12 in this government school"
                description="Self-declaration required for 7.5% quota. A disclaimer applies."
                checked={field.value ?? false}
                onCheckedChange={field.onChange}
              />
            )} />
          </div>
        </>
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