'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import api, { getErrorMessage } from '@/lib/api'
import { API } from '@/lib/constants'
import type { Step1Data } from '@/lib/types'
import toast from 'react-hot-toast'

const schema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters').max(150),
  email:    z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100),
})

type FormData = z.infer<typeof schema>

interface Props {
  defaultValues?: Step1Data
  onSuccess: (data: Step1Data) => void
}

export function Step1Basic({ defaultValues, onSuccess }: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? { name: '', email: '', password: '' },
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await api.post(API.auth.registerStep(1), data)
      onSuccess(data)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 animate-fade-in">
      <Input
        label="Full Name"
        placeholder="e.g. Priya Sharma"
        required
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        required
        error={errors.email?.message}
        hint="We'll send a verification link to this email"
        {...register('email')}
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Minimum 8 characters"
          required
          error={errors.password?.message}
          {...register('password')}
        />
        <button
          type="button"
          onClick={() => setShowPassword(v => !v)}
          className="absolute right-3 top-8 text-blush hover:text-rose transition-colors"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      <Button type="submit" className="w-full" loading={loading}>
        Continue
      </Button>
    </form>
  )
}