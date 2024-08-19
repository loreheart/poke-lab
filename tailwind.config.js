import { CUSTOM_COLORS } from './src/config'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: CUSTOM_COLORS,
    },
  },
  plugins: [],
}

