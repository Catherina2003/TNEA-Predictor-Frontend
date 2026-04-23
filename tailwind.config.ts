import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── TNEA Brand Palette ─────────────────────────────────────────────
        cream: {
          DEFAULT: '#EDE8C8',
          50:  '#FAFAF0',
          100: '#F5F2DC',
          200: '#EDE8C8',
          300: '#E0D8A8',
          400: '#CFC480',
        },
        blush: {
          DEFAULT: '#E8A882',
          100: '#F8EAE0',
          200: '#F0C8B0',
          300: '#E8A882',
          400: '#DC8860',
        },
        rose: {
          DEFAULT: '#E07878',
          100: '#FAEAEA',
          200: '#F0B8B8',
          300: '#E07878',
          400: '#CC5555',
          500: '#B83333',
        },
        pink: {
          DEFAULT: '#D4698A',
          100: '#F5D8E2',
          200: '#E8A8BC',
          300: '#D4698A',
          400: '#C04470',
        },
        sage: {
          DEFAULT: '#8BBD6E',
          100: '#D4E8C8',
          200: '#B8D8A0',
          300: '#8BBD6E',
          400: '#6A9E50',
          500: '#4E7A38',
        },
        // ── Semantic ───────────────────────────────────────────────────────
        brand: {
          primary:   '#E07878',   // rose — main CTA
          secondary: '#D4698A',   // pink — hover
          accent:    '#E8A882',   // blush — borders, secondary elements
          bg:        '#EDE8C8',   // cream — page background
          success:   '#8BBD6E',   // sage — success states
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.625rem',
        md: '0.5rem',
        sm: '0.375rem',
      },
      boxShadow: {
        card:   '0 2px 16px 0 rgba(208, 120, 120, 0.08)',
        input:  '0 1px 4px 0 rgba(208, 120, 120, 0.06)',
        button: '0 2px 8px 0 rgba(208, 120, 120, 0.25)',
      },
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%':   { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in':  'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
      },
    },
  },
  plugins: [],
}

export default config