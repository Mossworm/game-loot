import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'Toss': ['Toss Product Sans'],
      'Pret': ['Pretendard']
    },
    extend: {
      colors: {
        light: {
          text: {
            DEFAULT: '#212529',
            1: '#CED4DA',
            2: '#868E96',
            3: '#495057',
          },
          primary: {
            DEFAULT: '#FFFFFF',
            1: '#f4f4f4',
          },
          bg: {
            DEFAULT: '#F5F6F8',
          },
          button: {
            DEFAULT: '#4882ED',
          }
        },
        dark: {
          text: {
            DEFAULT: '#ECECEC',
            1: '#D9D9D9',
            2: '#ACACAC',
            3: '#595959',
          },
          primary: {
            DEFAULT: '#18181A',
            1: '#2C2C34',
          },
          bg: {
            DEFAULT: '#1f1f1f',
          },
          button: {
            DEFAULT: '#3182F7',
          }
        },
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
