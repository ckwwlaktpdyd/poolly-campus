/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'coral': {
          300: '#FFA07A',
          400: '#FF7F50',
          500: '#FF6347',
        }
      }
    },
  },
  plugins: [],
};
