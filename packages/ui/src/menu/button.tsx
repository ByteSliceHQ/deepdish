import { cva } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'
import type { ComponentProps } from 'react'
import * as styles from './button.css'
import { stylesheet } from './stylesheet'

export const BaseButton = stylesheet.element(
  'button',
  cva(styles.base, {
    variants: {
      loading: {
        true: styles.loading,
      },
    },
  }),
)

type ButtonProps = ComponentProps<typeof BaseButton>

export function Button(props: ButtonProps) {
  const { loading, ...rest } = props

  return (
    <BaseButton {...rest}>
      {loading && <LoaderCircle className={styles.loader} />}
      {props.children}
    </BaseButton>
  )
}
