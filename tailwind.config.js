/** @type {import('tailwindcss').Config} */
import fluid, { extract} from 'fluid-tailwind'

export default {
  content: {
    files: [
      "./index.html",
      "./src/**/*.{ts,tsx}",
    ],
    extract
  },
  theme: {
    extend: {
      colors: {
        base: '#080810',
        surface: '#0f0f1a',
        'surface-2': '#161628',
        accent: '#6c63ff',
        'accent-2': '#00d4ff',
        'accent-3': '#ff2d6b',
        muted: '#8888aa',
        'text-primary': '#f0eeff',
        'text-secondary': '#a8a8c8',
      },
      fontFamily: {
        pacifico: ['Pacifico', 'cursive'],
        roboto: ['Roboto', 'sans-serif'],
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px 0px rgba(108,99,255,0.4)' },
          '50%': { boxShadow: '0 0 40px 8px rgba(108,99,255,0.7)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(108,99,255,0.3), transparent)',
      },
    },
  },
  plugins: [
    fluid
  ],
}

