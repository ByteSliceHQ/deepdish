import { stylesheet } from './stylesheet'

export const base = stylesheet.style({
  background: stylesheet.var('slate100'),
  color: stylesheet.var('slate800'),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: stylesheet.var('fontSizeSm'),
  borderRadius: stylesheet.var('radiusMd'),
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  transition: '0.1s ease-in-out',
  padding: `${stylesheet.var('spacingSm')} ${stylesheet.var('spacingMd')}`,

  pseudos: {
    ':hover': {
      background: stylesheet.var('slate200'),
    },
    ':active': {
      background: stylesheet.var('slate300'),
    },
  },
})

export const loading = stylesheet.style({
  marginRight: stylesheet.var('spacingSm'),
})

export const loader = stylesheet.style({
  height: '1rem',
  width: '1rem',
  marginRight: stylesheet.var('spacingSm'),
  animation: 'spin 1s linear infinite',
})
