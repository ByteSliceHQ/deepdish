'use client'

import { useMode } from '@deepdish/core/context'

export function Shell(props: {
  children: React.ReactNode
}) {
  const mode = useMode()

  return (
    <div
      style={{
        border: mode === 'edit' ? '2px solid yellow' : 'none',
      }}
    >
      {props.children}
    </div>
  )
}
