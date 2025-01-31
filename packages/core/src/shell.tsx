'use client'

import { useMode } from './context'

export function Shell(props: {
  children: React.ReactNode
}) {
  // biome-ignore lint/correctness/noUnusedVariables: "mode" state will be utilized in the future
  const mode = useMode()

  return <>{props.children}</>
}
