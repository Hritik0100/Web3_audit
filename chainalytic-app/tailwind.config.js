// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0C10',
        foreground: '#ffffff',
        primary: '#2D9CDB',
        secondary: '#8E44AD',
        accent: '#00D4FF',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(45, 156, 219, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(45, 156, 219, 0.8), 0 0 40px rgba(45, 156, 219, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}