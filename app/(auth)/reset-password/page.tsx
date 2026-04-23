'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import api, { getErrorMessage } from '@/lib/api'
import { API } from '@/lib/constants'
import toast from 'react-hot-toast'

const schema = z.object({
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirm:     z.string(),
}).refine(d => d.newPassword === d.confirm, {
  message: 'Passwords do not match',
  path: ['confirm'],
})
type FormData = z.infer<typeof schema>

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const [loading, setLoading]         = useState(false)
  const [done, setDone]               = useState(false)
  const [showPass, setShowPass]       = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    if (!token) { toast.error('Invalid reset link — no token found'); return }
    setLoading(true)
    try {
      await api.post(API.auth.resetPassword, { token, newPassword: data.newPassword })
      setDone(true)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="auth-card p-10 text-center max-w-md w-full animate-fade-in">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sage-100">
            <CheckCircle2 className="h-10 w-10 text-sage" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Password Reset!
          </h1>
          <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
            Your password has been updated successfully. You can now login with your new password.
          </p>
          <Link href="/login">
            <Button className="w-full">Login Now</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold gradient-text">Reset Password</h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            Enter your new password below
          </p>
        </div>

        <div className="auth-card p-8">
          {!token && (
            <div className="mb-4 rounded-lg bg-rose-100 border border-rose-200 p-3 text-sm text-rose">
              Invalid or missing reset token. Please request a new reset link.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="relative">
              <Input
                label="New Password"
                type={showPass ? 'text' : 'password'}
                placeholder="Minimum 8 characters"
                required
                error={errors.newPassword?.message}
                {...register('newPassword')}
              />
              <button type="button" onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-8 text-blush hover:text-rose transition-colors" tabIndex={-1}>
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="relative">
              <Input
                label="Confirm Password"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Re-enter new password"
                required
                error={errors.confirm?.message}
                {...register('confirm')}
              />
              <button type="button" onClick={() => setShowConfirm(v => !v)}
                className="absolute right-3 top-8 text-blush hover:text-rose transition-colors" tabIndex={-1}>
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <Button type="submit" className="w-full" loading={loading} disabled={!token}>
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}