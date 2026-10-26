import type {Config} from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {DEFAULT: 'hsl(350 82% 46%)', foreground: '#FFFFFF'},
        border: 'hsl(var(--border))',
        input: 'hsl(var(--border))',
        ring: 'hsl(var(--primary))',
        canvas: 'hsl(var(--canvas))',
        'code-surface': 'hsl(var(--code-surface))',
        'code-foreground': 'hsl(var(--code-foreground))',
        main: 'hsl(var(--primary))',
        'dark-main': '#47b6b2',
        black: '#111111',
        gray: '#d3d3d3',
        'light-gray': '#efefef',
        'dark-gray': '#898989',
        blue: '#5676d3',
        'light-blue': '#eff3ff',
        red: '#ff0000',
        'light-red': '#fbc9c9',
        'dark-red': '#be0000',
        green: '#00ff32',
        'light-green': '#aeffbe',
        yellow: '#FFFF00',
        'light-yellow': '#ffffc9',
        brown: '#964B00',
        'light-brown': '#edd6bf',
        highlight: '#fdf5e1',
      },
      fontSize: {
        md: '14px',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 6px)',
      },
    },
  },
  darkMode: ['class'],
  plugins: [animate],
};

export default config;
