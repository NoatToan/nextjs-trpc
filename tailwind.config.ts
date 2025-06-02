import { heroui } from '@heroui/theme';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      prefix: 'heroui', // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: 'light', // default theme from the themes object
      defaultExtendTheme: 'light', // default theme to extend on custom themes
      themes: {
        light: {
          layout: {
            radius: {
              small: '0.375rem', // rounded-small
              medium: '0.75rem',
              // input: '0.375rem',  global.css
            },
            fontSize: {
              tiny: '0.625rem',
              small: '0.75rem',
              medium: '1rem',
              large: '1.25rem',
              // tailwind
              // text-xl: 1.25rem - 20px
              // text-2xl: 1.5rem - 24px
            },
            borderWidth: {
              medium: '0.063rem', // Input
            },
          },
          colors: {
            background: '#FFFFFF', // or DEFAULT
            foreground: '#25262B', // text default, not safe to set as primary color 33669A
            default: {
              DEFAULT: '#33669A',
              200: '#CED4DA', // Input border color
            },
            primary: {
              DEFAULT: '#33669A',
              50: '#33669A',
              foreground: '#FFFFFF',
            },
            secondary: {
              DEFAULT: '#5C5F66',
            },
            // TODO: recheck custom and move to global. Tailwind not work

            // @ts-expect-error
            custom: {
              white: '#ffffff',
              728: '#728FB6',
              ced: '#CED4DA',
              336: '#33669A',
              adb: '#ADB5BD',
              252: '#25262B',
              f1f: '#F1F3F5',
              e2e: '#E2E8F0',
              243: '#243D5A',
            },
            danger: {
              DEFAULT: '#F03E3E',
            },
          },
        },
        dark: {
          layout: {},
          colors: {},
        },
      },
    }),
  ],
} satisfies Config;
