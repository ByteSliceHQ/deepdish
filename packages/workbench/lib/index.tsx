'use client'

import '../src/index.css'
import { Workbench as InternalWorkbench } from '@/components/workbench'
import { useRef } from 'react'
import { Tailwind } from 'react-shadow-scope'

export function Workbench({ title }: { title?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <Tailwind href="/__deepdish/css">
      <div ref={ref} className="deepdish-shadow">
        <InternalWorkbench ref={ref} title={title} />
      </div>
    </Tailwind>
  )
}
