import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import aspectRatio from '@tailwindcss/aspect-ratio'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        // Palet warna format Bootstrap
        primary: {
          DEFAULT: '#0d6efd',
          50: '#f0f7ff',
          100: '#cfe2ff',
          200: '#9ec5fe',
          300: '#6ea8fe',
          400: '#3d8bfd',
          500: '#0d6efd',
          600: '#0b5ed7',
          700: '#0a58ca',
          800: '#084298',
          900: '#052c65'
        },
        secondary: {
          DEFAULT: '#6c757d',
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#5c636a',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
          white: '#f8f9fa',
          black: '#212529'
        },
        'secondary-white': '#f8f9fa',
        'secondary-black': '#212529',
        warning: {
          DEFAULT: '#ffc107',
          100: '#fff3cd',
          500: '#ffc107',
          600: '#ffca2c',
          700: '#664d03'
        },
        danger: {
          DEFAULT: '#dc3545',
          100: '#f8d7da',
          500: '#dc3545',
          600: '#bb2d3b',
          700: '#842029'
        },
        info: {
          DEFAULT: '#0dcaf0',
          100: '#cff4fc',
          500: '#0dcaf0',
          600: '#31d2f2',
          700: '#055160'
        },
        success: {
          DEFAULT: '#198754',
          100: '#d1e7dd',
          500: '#198754',
          600: '#157347',
          700: '#0f5132'
        }
      }
    }
  },
  plugins: [
    forms,
    typography,
    aspectRatio
  ]
}
