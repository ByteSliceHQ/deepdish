import { stylesheet } from './stylesheet'

export const wrapper = stylesheet.style({
  display: 'flex',
  flexDirection: 'column',
  gap: stylesheet.var('spacingSm'),
  padding: stylesheet.var('spacingXs'),
})

export const textarea = stylesheet.style({
  padding: `${stylesheet.var('spacingSm')} ${stylesheet.var('spacingMd')}`,
  border: `1px solid ${stylesheet.var('slate300')}`,
  borderRadius: stylesheet.var('radiusMd'),
  lineHeight: '1',
  fontSize: stylesheet.var('fontSizeSm'),

  pseudos: {
    ':focus': {
      outline: 'none',
      borderColor: stylesheet.var('slate600'),
      boxShadow: `0 0 0 2px ${stylesheet.var('slate200')}`,
    },
  },
})
