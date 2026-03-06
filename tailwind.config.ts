import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1C1C1E',
          light: '#2D2D2F',
          50: '#F5F0EB',
        },
        accent: {
          DEFAULT: '#C9A96E',
          dark: '#A88A50',
          light: '#E8D5B0',
          50: '#FAF5EC',
        },
        cream: '#F5F0EB',
        dark: '#1C1C1E',
        muted: '#8A8A8A',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
