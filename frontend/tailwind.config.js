/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#e3f0f7',
        'background': '#08151c',
        'lighter-bg': '#0f1b22',
        'primary': '#73b3d9',
        'secondary': '#0f2938',
        'accent': '#479ccd',
      }
    },
  },
  plugins: [],
}

