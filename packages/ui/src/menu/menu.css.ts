import { stylesheet } from './stylesheet'

export const content = stylesheet.style({
  minWidth: '220px',
  backgroundColor: 'white',
  borderRadius: '6px',
  overflow: 'hidden',
  padding: '5px',
  border: '1px solid #e5e7eb',

  nested: {
    '&[data-state="open"]': {
      animation: 'enter 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    },
    '&[data-state="closed"]': {
      animation: 'exit 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    },
  },
})

export const item = stylesheet.style({
  display: 'flex',
  alignItems: 'center',
  padding: `${stylesheet.var('spacingXs')} ${stylesheet.var('spacingSm')}`,
  position: 'relative',
  paddingLeft: '25px',
  outline: 'none',
  color: stylesheet.var('slate600'),
  borderRadius: stylesheet.var('radiusSm'),
  fontSize: stylesheet.var('fontSizeSm'),
  cursor: 'default',

  nested: {
    '&[data-highlighted]': {
      backgroundColor: stylesheet.var('slate100'),
      color: stylesheet.var('slate700'),
    },

    '&[data-state="open"]:not([data-highlighted], [data-disabled])': {
      backgroundColor: stylesheet.var('slate100'),
      color: stylesheet.var('slate700'),
    },
  },
})

export const key = stylesheet.style({
  margin: `${stylesheet.var('spacingSm')} 0`,
  padding: 0,
})

export const label = stylesheet.style({
  paddingLeft: '25px',
  fontSize: '12px',
  lineHeight: '25px',
  color: '#4b5563',
})

export const rightSlot = stylesheet.style({
  marginLeft: 'auto',
  color: stylesheet.var('slate600'),
  display: 'flex',
})
