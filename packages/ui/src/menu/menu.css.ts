import { stylesheet } from './stylesheet'

export const content = stylesheet.style({
  minWidth: '220px',
  backgroundColor: 'white',
  borderRadius: '6px',
  overflow: 'hidden',
  padding: '5px',
  border: '1px solid #e5e7eb',
})

export const item = stylesheet.style({
  display: 'flex',
  padding: '0 5px',
  position: 'relative',
  paddingLeft: '25px',
  outline: 'none',

  // TODO: add support for selectors
  // '&': {
  //   '[data-disabled]': {
  //     color: 'var(--mauve-8)',
  //     pointerEvents: 'none',
  //   },

  //   '[data-highlighted]': {
  //     backgroundColor: 'var(--violet-9)',
  //     color: 'var(--violet-1)',
  //   },
  // }
})

export const label = stylesheet.style({
  paddingLeft: '25px',
  fontSize: '12px',
  lineHeight: '25px',
  color: '#4b5563',
})

// TODO: move into separate dialog styles file
export const overlay = stylesheet.style({
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  position: 'fixed',
  inset: 0,
  animation: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
})

export const dialogContent = stylesheet.style({
  backgroundColor: 'white',
  borderRadius: '6px',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: '25px',
  animation: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',

  '&': {
    ':focus': {
      outline: 'none',
    },
  },
})
