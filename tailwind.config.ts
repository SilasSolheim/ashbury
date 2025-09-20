import type { Config } from 'tailwindcss'

const to = (v: string) => `oklch(var(${v}) / <alpha-value>)`

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: to('--background'),
        foreground: to('--foreground'),
        card: to('--card'),
        'card-foreground': to('--card-foreground'),
        popover: to('--popover'),
        'popover-foreground': to('--popover-foreground'),
        primary: to('--primary'),
        'primary-foreground': to('--primary-foreground'),
        secondary: to('--secondary'),
        'secondary-foreground': to('--secondary-foreground'),
        muted: to('--muted'),
        'muted-foreground': to('--muted-foreground'),
        accent: to('--accent'),
        'accent-foreground': to('--accent-foreground'),
        destructive: to('--destructive'),
        'destructive-foreground': to('--destructive-foreground'),
        border: to('--border'),
        input: to('--input'),
        ring: to('--ring'),
        nc: '#0C1F1E',
        moss: '#2F5E4E',
        parchment: '#F4F1EA',
        ink: '#1D232A',
        amber: '#E1A73B',
        oxide: '#5A6B73'
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        md: 'var(--radius)',
        lg: `calc(var(--radius) * 1.5)`,
        xl: `calc(var(--radius) * 2)`,
        '2xl': `calc(var(--radius) * 3)`
      }
    }
  },
  plugins: []
} satisfies Config
