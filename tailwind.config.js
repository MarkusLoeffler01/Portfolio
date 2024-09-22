/** @type {import('tailwindcss').Config} */
import fluid, { extract} from 'fluid-tailwind'

export default {
  content: {
    files: [
      "./index.html",
      "./src/**/*.{ts,tsx}",
    ],
    extract
  },
  theme: {
    extend: {},
  },
  plugins: [
    fluid
  ],
}

