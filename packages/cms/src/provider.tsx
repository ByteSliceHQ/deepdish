'use client'

import { DeepDishProvider } from '@deepdish/core/context'
import { Workbench } from '@deepdish/workbench'

export function Provider({
  children,
  title,
}: { children: React.ReactNode; title?: string }) {
  return (
    <DeepDishProvider>
      {children}
      <Workbench title={title} />
    </DeepDishProvider>
  )
}
