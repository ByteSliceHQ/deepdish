'use client'

import '../src/index.css'
import {
  Workbench as InternalWorkbench,
  type WorkbenchProps as InternalWorkbenchProps,
} from '@/components/workbench'
import { useRef } from 'react'
import { Tailwind } from 'react-shadow-scope'

type WorkbenchProps = Omit<InternalWorkbenchProps, 'ref'>

export function Workbench(props: WorkbenchProps) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <Tailwind href="/__deepdish/css">
      <div ref={ref} className="deepdish-shadow">
        <InternalWorkbench
          ref={ref}
          title={props.title}
          authDisabled={props.authDisabled}
        />
      </div>
    </Tailwind>
  )
}
