'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { GraduationCap, LogOut, User, BookOpen, BarChart2 } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const { user, logout, loading } = useAuth()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logout()
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cream-300 bg-white/80 backdrop-blur-sm">
      <nav className="container-page flex h-16 items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose shadow-button">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-display text-lg font-semibold leading-none" style={{ color: 'var(--text-primary)' }}>
              TNEA
            </span>
            <span className="block text-xs font-medium leading-none" style={{ color: 'var(--text-muted)' }}>
              Predictor
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/predict"
            className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-rose"
            style={{ color: 'var(--text-secondary)' }}
          >
            <BarChart2 className="h-4 w-4" />
            Predict
          </Link>
          <Link
            href="/guide"
            className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-rose"
            style={{ color: 'var(--text-secondary)' }}
          >
            <BookOpen className="h-4 w-4" />
            Guide
          </Link>
        </div>

        {/* Auth actions */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-8 w-24 animate-pulse rounded-lg bg-cream-200" />
          ) : user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleLogout}
                loading={loggingOut}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}