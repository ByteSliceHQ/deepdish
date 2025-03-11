'use client'

import '../src/index.css'
import { ShadowProvider } from '@/lib/context'
import {
  Workbench as InternalWorkbench,
  type WorkbenchProps,
} from '@/workbench'

export type { WorkbenchProps }

export function Workbench(props: WorkbenchProps) {
  return (
    <ShadowProvider>
      <InternalWorkbench {...props} />
    </ShadowProvider>
  )
}
