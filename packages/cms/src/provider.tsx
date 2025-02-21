'use client'

import { DeepDishProvider } from '@deepdish/core/context'

export function Provider(props: {
  children: React.ReactNode
  draft: boolean
  title?: React.ReactNode
  authDisabled?: boolean
}) {
  if (props.draft) {
    return <DeepDishProvider>{props.children}</DeepDishProvider>
  }

  return <DeepDishProvider>{props.children}</DeepDishProvider>
}
