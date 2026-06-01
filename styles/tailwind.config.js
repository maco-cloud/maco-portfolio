/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.html', './js/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        luxury: {
          gold: '#C9A962',
          'gold-light': '#E8D5A3',
          champagne: '#F5F0E8',
          ink: '#141414',
        },
      },
      letterSpacing: {
        luxury: '0.28em',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        slideUp: 'slideUp 0.7s ease-out forwards',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
};
