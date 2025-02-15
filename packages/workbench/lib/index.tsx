'use client'

import '../src/index.css'
import {
  type WorkbenchProps as InternalWorkbenchProps,
  Shadow,
} from '@/workbench'

type WorkbenchProps = Omit<InternalWorkbenchProps, 'ref'>

export function Workbench(props: WorkbenchProps) {
  return <Shadow {...props} />
}
