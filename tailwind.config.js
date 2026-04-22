/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: {
            DEFAULT: '#FFC501',
            light: '#FFE27A',
            dark: '#E0A800',
          },
          black: '#0B0B0C',
          dark: '#111113',
          offwhite: '#FBFAF9',
        },
      },
      fontFamily: {
        display: ['"League Spartan"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
