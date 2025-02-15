'use client'

import '../src/index.css'
import {
  Shadow,
  type WorkbenchProps as InternalWorkbenchProps,
} from '@/workbench'

type WorkbenchProps = Omit<InternalWorkbenchProps, 'ref'>

export function Workbench(props: WorkbenchProps) {
  return <Shadow {...props} />
}
