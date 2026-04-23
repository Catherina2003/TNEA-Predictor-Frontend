'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import api, { getErrorMessage } from '@/lib/api'
import { API } from '@/lib/constants'
import toast from 'react-hot-toast'

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
})
type FormData = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [sentEmail, setSentEmail] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await api.post(API.auth.forgotPassword, { email: data.email })
      setSentEmail(data.email)
      setSent(true)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="auth-card p-10 text-center max-w-md w-full animate-fade-in">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sage-100">
            <CheckCircle2 className="h-10 w-10 text-sage" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Reset Link Sent
          </h1>
          <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
            If an account exists for <strong>{sentEmail}</strong>, you'll receive a password reset link shortly.
          </p>
          <p className="text-xs mb-8" style={{ color: 'var(--text-muted)' }}>
            Check your spam folder if you don't see it. The link expires in 1 hour.
          </p>
          <Link href="/login">
            <Button className="w-full">Back to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold gradient-text">Forgot Password</h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <div className="auth-card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              required
              error={errors.email?.message}
              {...register('email')}
            />
            <Button type="submit" className="w-full" loading={loading}>
              <Mail className="h-4 w-4" />
              Send Reset Link
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-rose hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}