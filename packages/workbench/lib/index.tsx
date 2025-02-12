'use client'

import '../src/index.css'
import { useRef } from 'react'
import { Tailwind } from 'react-shadow-scope'
import { Workbench as InternalWorkbench } from '@/components/workbench'

export function Workbench() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <Tailwind href="/__deepdish/css" ref={ref}>
      <InternalWorkbench ref={ref} />
    </Tailwind>
  )
}
