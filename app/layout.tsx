import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/hooks/useAuth'
import { Navbar } from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'TNEA Counselling Predictor',
  description: 'Predict your TNEA college chances with AI-powered insights. Find Dream, Target and Safe colleges based on your cutoff score.',
  keywords: 'TNEA, counselling, predictor, Tamil Nadu, engineering, college',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-pattern min-h-screen">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: '0.625rem',
                fontSize: '0.875rem',
                fontFamily: 'DM Sans, sans-serif',
              },
              success: {
                iconTheme: { primary: '#8BBD6E', secondary: '#fff' },
              },
              error: {
                iconTheme: { primary: '#E07878', secondary: '#fff' },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}