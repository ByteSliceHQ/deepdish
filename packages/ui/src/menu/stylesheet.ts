import { makeStyleSheet } from '@deepdish/stylesheet'

export const stylesheet = makeStyleSheet('deepdish-menu', {
  // https://tailwindcss.com/docs/customizing-colors
  slate50: '#f8fafc',
  slate100: '#f1f5f9',
  slate200: '#e2e8f0',
  slate300: '#cbd5e1',
  slate400: '#94a3b8',
  slate500: '#64748b',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1e293b',
  slate900: '#0f172a',
  slate950: '#09142b',

  // https://tailwindcss.com/docs/font-size
  fontSizeXs: '0.75rem',
  fontSizeSm: '0.875rem',
  fontSizeBase: '1rem',
  fontSizeLg: '1.125rem',
  fontSizeXl: '1.25rem',

  // https://tailwindcss.com/docs/border-radius
  radiusSm: '0.125rem',
  radiusMd: '0.375rem',
  radiusLg: '0.5rem',
  radiusFull: '9999px',

  spacingXs: '0.25rem',
  spacingSm: '0.5rem',
  spacingMd: '1rem',
  spacingLg: '1.5rem',
  spacingXl: '2rem',
  spacing2xl: '2.5rem',
  spacing3xl: '3rem',
  spacing4xl: '4rem',
  spacing5xl: '5rem',
})
