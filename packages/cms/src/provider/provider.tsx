'use client'

import { DeepDishProvider } from '@deepdish/core/context'
import { Workbench, type WorkbenchProps } from '@deepdish/workbench'

type Procedures = WorkbenchProps['procedures']

export function Provider(props: {
  children: React.ReactNode
  draft: boolean
  title?: React.ReactNode
  authDisabled?: boolean
  procedures: Procedures
}) {
  if (props.draft) {
    return (
      <DeepDishProvider>
        {props.children}
        <Workbench
          title={props.title}
          authDisabled={props.authDisabled}
          procedures={props.procedures}
        />
      </DeepDishProvider>
    )
  }

  return <DeepDishProvider>{props.children}</DeepDishProvider>
}
