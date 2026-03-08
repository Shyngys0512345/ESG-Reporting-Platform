/** @type {import('tailwindcss').Config} */
module.exports = {
  // Указываем Tailwind, где искать классы для обработки
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Здесь мы создаем нашу дизайн-систему
      colors: {
        'esg-blue': '#2563eb',
        'esg-slate': '#475569',
        'esg-bg': '#f8fafc',
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        'xl': '1rem',
      }
    },
  },
  plugins: [],
};