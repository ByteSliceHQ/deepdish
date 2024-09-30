import { cva } from 'class-variance-authority'
import { stylesheet } from './stylesheet'

// TODO: variants
export const Button = stylesheet.element(
  'button',
  cva(
    stylesheet.style({
      fontSize: '12px',
      borderRadius: '4px',
      cursor: 'pointer',
      outline: 'none',
      transition: '0.1s ease-in-out',
      background: '#f1f5f9',
      border: '1px solid #cbd5e1',
    }),
  ),
)
