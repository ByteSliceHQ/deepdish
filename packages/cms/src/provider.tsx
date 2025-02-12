'use client'

import { DeepDishProvider } from '@deepdish/core/context'
import { Workbench } from '@deepdish/workbench'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <DeepDishProvider>
      {children}
      <Workbench />
    </DeepDishProvider>
  )
}
