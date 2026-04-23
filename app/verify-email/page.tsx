'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import api from '@/lib/api'
import { API } from '@/lib/constants'

type Status = 'loading' | 'success' | 'error'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus]   = useState<Status>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('No verification token found in the URL. Please use the link from your email.')
      return
    }

    api.get<{ message: string }>(`${API.auth.verify}?token=${token}`)
      .then(r => {
        setStatus('success')
        setMessage(r.data.message)
      })
      .catch(err => {
        setStatus('error')
        setMessage(
          err.response?.data?.message ||
          'This verification link is invalid or has already been used.'
        )
      })
  }, [token])

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="auth-card p-10 text-center max-w-md w-full animate-fade-in">

        {status === 'loading' && (
          <>
            <Loader2 className="h-14 w-14 animate-spin text-rose mx-auto mb-6" />
            <h1 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Verifying your email...
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Please wait a moment.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sage-100">
              <CheckCircle2 className="h-10 w-10 text-sage" />
            </div>
            <h1 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Email Verified!
            </h1>
            <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
              {message}
            </p>
            <Link href="/login">
              <Button className="w-full">Login to Your Account</Button>
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-100">
              <XCircle className="h-10 w-10 text-rose" />
            </div>
            <h1 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Verification Failed
            </h1>
            <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
              {message}
            </p>
            <div className="space-y-3">
              <Link href="/login">
                <Button className="w-full">Go to Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary" className="w-full">Register Again</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}