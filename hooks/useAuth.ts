'use client'

import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import api, { getErrorMessage } from '@/lib/api'
import { API } from '@/lib/constants'
import type { AuthUser } from '@/lib/types'

// ── Context ────────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  refresh: async () => {},
})

// ── Provider ───────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // On mount — check if JWT cookie exists and is valid
  const refresh = useCallback(async () => {
    try {
      const { data } = await api.get<AuthUser>(API.auth.me)
      setUser(data)
    } catch {
      // 401 — no valid cookie, user is guest
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await api.post<AuthUser>(API.auth.login, { email, password })
    setUser(data)
    router.push('/dashboard')
  }, [router])

  const logout = useCallback(async () => {
    try {
      await api.post(API.auth.logout)
    } finally {
      setUser(null)
      router.push('/')
    }
  }, [router])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

// ── Hook ───────────────────────────────────────────────────────────────────

export function useAuth() {
  return useContext(AuthContext)
}