/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF5623',
          dark: '#FF5214',
          light: '#FF8A5C',
          100: '#16191C',
          200: '#1D2125',
          250: '#212529',
          300: '#262A2E',
          600: '#44484C',
          800: '#5D6165',
          1000: '#777A80',
          1100: '#898C92',
          1200: '#BFC2C8',
          5000: '#E4E6E8'
        },
        background: {
          DEFAULT: 'rgb(10 12 13)',
          card: '#0F0F0F',
          'gradient-left': 'rgba(48, 7, 255, 0.29)',
          'gradient-middle': 'rgba(209, 40, 150, 0.2713)',
          'gradient-right': 'rgba(255, 86, 35, 0.25)',
          'hover-light': 'rgba(255, 255, 255, 0.08)',
          'green-500': '#6BFFAC'
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#8E8E93',
          muted: '#636366',
          neutral: 'rgb(137 140 146)',
          'primary-100': '#16191C',
          'alpha-50': 'rgba(255, 255, 255, 0.5)'
        },
        border: {
          DEFAULT: '#2C2C2E',
          focus: '#FF6B2C',
          'primary-100': '#303438'
        },
        success: '#10B981',
        error: '#EE0D37',
        'error-bg': '#EE0D3714'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'border-glow': 'border-glow 2s ease-in-out',
        'placeholder-cycle': 'fade 8s ease-in-out infinite',
        progress: 'progress 2s ease-in-out infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'spin-slow': 'spin 4s linear infinite'
      },
      keyframes: {
        'border-glow': {
          '0%': { boxShadow: '0 0 0 0 rgba(255, 107, 44, 0.7)' },
          '50%': { boxShadow: '0 0 30px 5px rgba(255, 107, 44, 0.4)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255, 107, 44, 0)' }
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        fade: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' }
        },
        progress: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      }
    }
  },
  plugins: []
};
