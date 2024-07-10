/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxHeight: {
        '1/4': '25%',
      }
    },
  },
  plugins: [
    daisyui,
  ],
}
