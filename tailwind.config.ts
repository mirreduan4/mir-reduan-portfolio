import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{css,scss}'
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#050505',
          secondary: '#0A0809',
          burgundy: '#18090D',
          darkred: '#350B10',
        },
        red: {
          accent: '#8B0000',
          cinematic: '#C1121F',
          highlight: '#FF2635',
        },
        vintage: {
          warm: '#C8794A',
        },
        text: {
          primary: '#F3F0EE',
          secondary: '#A8A1A1',
          muted: '#625C5C',
        },
        glass: {
          DEFAULT: 'rgba(255,255,255,0.045)',
          border: 'rgba(255,80,80,0.18)',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'grain': 'grainJitter 0.4s steps(4) infinite',
        'subtle-pulse': 'subtlePulse 4s ease-in-out infinite',
      },
      keyframes: {
        grainJitter: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-2%, 3%)' },
          '50%': { transform: 'translate(3%, -1%)' },
          '75%': { transform: 'translate(-1%, -3%)' },
          '100%': { transform: 'translate(2%, 1%)' },
        },
        subtlePulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
};

export default config;
