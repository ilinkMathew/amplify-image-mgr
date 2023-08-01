/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text-color': 'var(--text-color)',
        'background': 'var(--background-color)',
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'accent-color': 'var(--accent-color)',
      }
    },
  },
  plugins: [],
}
