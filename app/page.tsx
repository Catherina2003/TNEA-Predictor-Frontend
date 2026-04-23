import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { BarChart2, BookOpen, Shield, Zap, GraduationCap, TrendingUp } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #E07878, transparent)' }} />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #8BBD6E, transparent)' }} />

        <div className="container-page relative">
          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blush-200 bg-white px-4 py-1.5 text-sm shadow-sm">
              <span className="h-2 w-2 rounded-full bg-sage animate-pulse" />
              <span style={{ color: 'var(--text-secondary)' }}>
                AI-powered predictions for TNEA 2026
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl font-bold leading-tight lg:text-6xl mb-6"
              style={{ color: 'var(--text-primary)' }}>
              Know Your{' '}
              <span className="gradient-text">College Chances</span>
              {' '}Before Counselling Day
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed mb-10"
              style={{ color: 'var(--text-secondary)' }}>
              Enter your 12th marks, community and preferred departments.
              Our AI analyzes 10+ years of TNEA cutoff data to predict your
              Dream, Target and Safe colleges — with round-by-round eligibility.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/predict">
                <Button size="lg" className="min-w-48">
                  <BarChart2 className="h-5 w-5" />
                  Predict My Colleges
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary" size="lg" className="min-w-48">
                  <GraduationCap className="h-5 w-5" />
                  Create Free Account
                </Button>
              </Link>
            </div>

            <p className="mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>
              Free for all students · No login required to predict
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <section className="border-y border-cream-300 bg-white py-8">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: '417+', label: 'Colleges covered' },
              { value: '10+',  label: 'Years of cutoff data' },
              { value: '38',   label: 'Tamil Nadu districts' },
              { value: '100%', label: 'Free to use' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-page">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Everything You Need for TNEA Counselling
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              From cutoff calculation to AI-powered college predictions
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <BarChart2 className="h-6 w-6" />,
                title: 'AI College Predictions',
                description: 'Gemini AI analyzes your cutoff against 10+ years of TNEA data to predict your chances at every college.',
                color: 'bg-rose-100 text-rose',
              },
              {
                icon: <TrendingUp className="h-6 w-6" />,
                title: 'Dream / Target / Safe Tiers',
                description: 'Colleges classified into three tiers using cutoff trends, NIRF rankings and placement data.',
                color: 'bg-sage-100 text-sage-500',
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: 'Reservation-Aware',
                description: 'Predictions factor in your community, govt school quota, DA, ex-servicemen and sports categories.',
                color: 'bg-blush-100 text-blush-400',
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: 'Round Eligibility',
                description: 'Know exactly which counselling round you qualify for — Special, Rounds 1–4, or Supplementary.',
                color: 'bg-pink-100 text-pink',
              },
              {
                icon: <BookOpen className="h-6 w-6" />,
                title: 'Complete TNEA Guide',
                description: 'Step-by-step counselling guide covering choice filling, allotment stages and strategy tips.',
                color: 'bg-rose-100 text-rose',
              },
              {
                icon: <GraduationCap className="h-6 w-6" />,
                title: 'College Intelligence',
                description: 'NIRF rankings, placement stats, infrastructure summaries and department reputation — all in one place.',
                color: 'bg-sage-100 text-sage-500',
              },
            ].map((feature) => (
              <div key={feature.title} className="card hover:shadow-button transition-shadow duration-300">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-2xl p-10 text-center"
            style={{ background: 'linear-gradient(135deg, #E07878 0%, #D4698A 100%)' }}>
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-white mb-4">
                Ready to Plan Your Engineering Future?
              </h2>
              <p className="text-white/80 mb-8 text-lg max-w-xl mx-auto">
                Join thousands of Tamil Nadu students making informed counselling decisions.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/predict">
                  <Button size="lg" className="bg-white text-rose hover:bg-cream-100 min-w-44">
                    Start Predicting Free
                  </Button>
                </Link>
                <Link href="/guide">
                  <Button variant="ghost" size="lg" className="text-white hover:bg-white/10 min-w-44">
                    Read TNEA Guide
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-cream-300 bg-white py-8">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © 2026 TNEA Predictor. For informational purposes only.
          </p>
          <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
            Predictions are AI estimates based on historical data. Actual allotments depend on TNEA rank list.
          </p>
        </div>
      </footer>

    </div>
  )
}