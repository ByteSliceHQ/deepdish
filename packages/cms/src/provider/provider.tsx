'use client'

import { DeepDishProvider } from '@deepdish/core/context'
import { Workbench } from '@deepdish/workbench'

export function Provider(props: {
  children: React.ReactNode
  draft: boolean
  title?: string
}) {
  if (props.draft) {
    return (
      <DeepDishProvider>
        {props.children}
        <Workbench title={props.title} />
      </DeepDishProvider>
    )
  }

  return <DeepDishProvider>{props.children}</DeepDishProvider>
}
