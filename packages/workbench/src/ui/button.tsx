import { cva } from 'class-variance-authority'
import { stylesheet } from '../stylesheet'
import * as styles from './button.css'

export const Button = stylesheet.element(
  'button',
  cva(styles.base, {
    variants: {
      intent: {
        primary: styles.primary,
        secondary: styles.secondary,
      },
      size: {
        small: styles.small,
        medium: styles.medium,
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  }),
)
