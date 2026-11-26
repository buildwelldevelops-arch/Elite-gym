/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        navy: {
          950: '#07101f',
          900: '#0b192c',
          850: '#0f2139',
          800: '#152b4a',
          700: '#1e3a5f',
        },
        sky: {
          vibrant: '#0284c7',
          electric: '#0ea5e9',
          light: '#e0f2fe',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', '"Space Grotesk"', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      },
      boxShadow: {
        'blue-sm': '0 2px 8px -1px rgba(37, 99, 235, 0.2)',
        'blue-md': '0 8px 25px -4px rgba(37, 99, 235, 0.28)',
        'blue-lg': '0 14px 35px -6px rgba(37, 99, 235, 0.38)',
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.06)',
        'card': '0 10px 30px -4px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 16px 36px -4px rgba(37, 99, 235, 0.15)',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.97)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        }
      },
      animation: {
        pulseSlow: 'pulseSlow 3s ease-in-out infinite',
        fadeIn: 'fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }
    },
  },
  plugins: [],
}
