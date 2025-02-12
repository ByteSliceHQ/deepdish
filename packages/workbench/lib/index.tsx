'use client'

import '../src/index.css'
import { Workbench as InternalWorkbench } from '@/components/workbench'
import { useRef } from 'react'
import { Tailwind } from 'react-shadow-scope'

export function Workbench() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <Tailwind href="/__deepdish/css" ref={ref}>
      <InternalWorkbench ref={ref} />
    </Tailwind>
  )
}
