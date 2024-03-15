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
      'Pret': ['Pretendard'],
      'Outfit': ['Outfit']
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
            DEFAULT: '#F3F3F3',
            1: '#FFFFFF',
          },
          bg: {
            DEFAULT: '#D9D9D9',
          },
          button: {
            DEFAULT: '#4882ED',
            low: '#888888',
          }
        },
        light_before: {
          text: {
            DEFAULT: '#212529',
            1: '#CED4DA',
            2: '#868E96',
            3: '#495057',
          },
          primary: {
            DEFAULT: '#FFFFFF',
            1: '#F3F3F3',
          },
          bg: {
            DEFAULT: '#D9D9D9',
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
            DEFAULT: '#20202C',
            1: '#333238',
          },
          bg: {
            DEFAULT: '#18181A',
          },
          button: {
            DEFAULT: '#5F85DB',
            low: '#FFFFFF',
          }
        },
        dark_before: {
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
