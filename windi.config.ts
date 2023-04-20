import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  extract: {
    include: [
      'index.html',
      'src/**/*.{html,jsx,tsx,ts}',
    ],
    exclude: [
      'node_modules/**/*',
      '.git/**/*',
    ],
  },
  theme: {
    extend: {
      colors: {
        'gray-33': '#333333',
      },
      boxShadow: {
        card: '0 1px 10px rgb(0 0 0 / 25%)',
        outside: '0 0 12px rgb(0 0 0 / 0.25)'
      }
    }
  }
})