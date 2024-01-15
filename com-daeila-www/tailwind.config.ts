import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'silver-rust': {
        '50': '#f8f8f8',
        '100': '#f1efef',
        '200': '#e6e3e2',
        '300': '#ccc5c4',
        '400': '#bab0af',
        '500': '#a09593',
        '600': '#887c7a',
        '700': '#716664',
        '800': '#5f5655',
        '900': '#524b4a',
        '950': '#2a2625',
    },
    }
  },
  plugins: [],
}
export default config
