/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: {
            DEFAULT: '#F5C518',
            light: '#FFF2B8',
            dark: '#E6A800',
          },
          black: '#111111',
          dark: '#191818',
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
