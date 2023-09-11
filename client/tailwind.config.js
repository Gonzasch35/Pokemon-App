/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      colors: {
        'principal': '#F9F5EB',
        'secundario': '#EA5455',
        'secundario-oscuro': '#bb5555',
        'terciario': '#E4DCCF',
        'cuarto': '#002B5B',
      }
    },
  },
  plugins: [],
}

