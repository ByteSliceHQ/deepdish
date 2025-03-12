import { components } from '@/app/layout'
import type { ComponentProps } from 'react'

const Component = components.text

type TextProps = ComponentProps<typeof Component>

export function Text(props: TextProps) {
  return <Component {...props} />
}
