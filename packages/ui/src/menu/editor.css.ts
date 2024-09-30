import { stylesheet } from './stylesheet'

export const wrapper = stylesheet.style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
})

// TODO: global variables
export const textarea = stylesheet.style({
  padding: '6px 8px',
  border: '1px solid #cbd5e1',
  borderRadius: '4px',
  lineHeight: '1',
  fontSize: '13px',
})
