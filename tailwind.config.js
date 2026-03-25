/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        ink: {
          950: '#0a0908',
          900: '#111009',
          800: '#1a1814',
          700: '#252118',
          600: '#33302c',
          500: '#4a4640',
          400: '#6b6560',
          300: '#8a847c',
          200: '#b5b0a8',
          100: '#e8e4de',
          50:  '#faf9f6',
        },
        blood: {
          700: '#6b0f00',
          600: '#8b2500',
          500: '#a83000',
          400: '#c44010',
          300: '#d9603a',
        },
        verdict: {
          green: '#166534',
          amber: '#b45309',
          red:   '#991b1b',
          blue:  '#1e40af',
          teal:  '#0e7490',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
