import { stylesheet } from '../stylesheet'

export const workbenchButton = stylesheet.style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  fontSize: '12px',
  padding: '4px 8px',
  borderRadius: '9999px',
  transition: 'background-color 0.2s',

  pseudos: {
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    ':active': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
})
