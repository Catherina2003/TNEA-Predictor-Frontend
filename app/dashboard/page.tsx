'use client'

import { useAuth } from '@/hooks/useAuth'
import { PageSpinner } from '@/components/ui/Spinner'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { BarChart2, BookOpen, User, LogOut } from 'lucide-react'

export default function DashboardPage() {
  const { user, logout, loading } = useAuth()

  if (loading) return <PageSpinner />

  return (
    <div className="container-page py-12">
      <div className="max-w-4xl mx-auto">

        {/* Welcome header */}
        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Welcome, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            {user?.email}
          </p>
        </div>

        {/* Quick actions */}
        <div className="grid gap-5 md:grid-cols-3 mb-10">
          {[
            {
              icon: <BarChart2 className="h-6 w-6" />,
              title: 'Predict Colleges',
              description: 'Run a new prediction with your marks',
              href: '/predict',
              color: 'bg-rose-100 text-rose',
            },
            {
              icon: <BookOpen className="h-6 w-6" />,
              title: 'TNEA Guide',
              description: 'Complete counselling guide and FAQs',
              href: '/guide',
              color: 'bg-sage-100 text-sage-500',
            },
            {
              icon: <User className="h-6 w-6" />,
              title: 'My Profile',
              description: 'Update marks, rank and preferences',
              href: '/profile',
              color: 'bg-blush-100 text-blush-400',
            },
          ].map((card) => (
            <Link key={card.title} href={card.href}>
              <div className="card hover:shadow-button transition-all duration-200 cursor-pointer h-full">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}>
                  {card.icon}
                </div>
                <h3 className="font-display text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {card.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming soon notice */}
        <div className="card text-center py-10">
          <p className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
            Saved Colleges & PDF Export
          </p>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            Your saved college list and personalised PDF download will appear here once you run predictions.
          </p>
          <Link href="/predict">
            <Button>Run My First Prediction</Button>
          </Link>
        </div>

        {/* Logout */}
        <div className="mt-8 text-center">
          <Button variant="ghost" onClick={logout} className="gap-2 text-sm">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}