import { cva } from 'class-variance-authority'
import { stylesheet } from '../stylesheet'
import * as styles from './button.css'

export const Button = stylesheet.element(
  'button',
  cva(styles.workbenchButton, {
    variants: {},
    defaultVariants: {},
  }),
)
