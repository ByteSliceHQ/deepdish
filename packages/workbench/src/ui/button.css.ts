import { stylesheet } from '../stylesheet'

export const base = stylesheet.style({
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  transition: '0.1s ease-in-out',
})

export const primary = stylesheet.style({
  background: stylesheet.var('slate100'),
  color: stylesheet.var('slate700'),

  pseudos: {
    ':hover': {
      background: stylesheet.var('slate200'),
    },
    ':active': {
      background: stylesheet.var('slate300'),
    },
  },
})

export const secondary = stylesheet.style({
  background: 'white',
  color: 'gray',

  pseudos: {
    ':hover': {
      background: 'red',
    },
  },
})

export const small = stylesheet.style({
  fontSize: stylesheet.var('fontSizeXs'),
  padding: '4px 6px',
})

export const medium = stylesheet.style({
  fontSize: stylesheet.var('fontSizeSm'),
  padding: '8px 12px',
})
