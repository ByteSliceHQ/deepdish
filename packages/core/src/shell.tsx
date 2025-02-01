'use client'

import { useMode } from './context'

export function Shell(props: {
  children: React.ReactNode
}) {
  // biome-ignore lint/correctness/noUnusedVariables: "mode" state will soon be utilized
  const mode = useMode()

  return <>{props.children}</>
}
