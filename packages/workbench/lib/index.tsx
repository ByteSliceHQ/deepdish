'use client'

import '../src/index.css'
import { Menu as InternalMenu, type MenuProps } from '@/components/menu'
import { ShadowProvider } from '@/lib/context'
import {
  Workbench as InternalWorkbench,
  type WorkbenchProps as InternalWorkbenchProps,
} from '@/workbench'

type WorkbenchProps = Omit<InternalWorkbenchProps, 'ref'>

export function Workbench(props: WorkbenchProps) {
  return (
    <ShadowProvider>
      <InternalWorkbench {...props} />
    </ShadowProvider>
  )
}

export function Menu<V>(props: MenuProps<V>) {
  return <InternalMenu {...props} />
}
