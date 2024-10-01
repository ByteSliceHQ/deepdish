import { stylesheet } from './stylesheet'

export const base = stylesheet.style({
  fontSize: stylesheet.var('fontSizeSm'),
  borderRadius: stylesheet.var('radiusMd'),
  cursor: 'pointer',
  outline: 'none',
  transition: '0.1s ease-in-out',
  background: stylesheet.var('slate100'),
  border: 'none',
  color: stylesheet.var('slate800'),
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
