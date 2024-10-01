import { cva } from 'class-variance-authority'
import { base } from './button.css'
import { stylesheet } from './stylesheet'

export const Button = stylesheet.element('button', cva(base))
