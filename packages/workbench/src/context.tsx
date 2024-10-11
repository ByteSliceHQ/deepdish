'use client'

import { createContext, useContext } from 'react'

export type WorkbenchContext = {
  authenticated: boolean
  onSignIn: () => Promise<void>
  onSignOut: () => Promise<void>
}

export type WorkbenchProviderProps = {
  authenticated: boolean
  children: React.ReactNode
  onSignIn: () => Promise<void>
  onSignOut: () => Promise<void>
}

export const WorkbenchContext = createContext<WorkbenchContext | null>(null)

export function WorkbenchProvider(props: WorkbenchProviderProps) {
  return (
    <WorkbenchContext.Provider
      value={{
        authenticated: props.authenticated,
        onSignIn: props.onSignIn,
        onSignOut: props.onSignOut,
      }}
    >
      {props.children}
    </WorkbenchContext.Provider>
  )
}

export function useWorkbench() {
  const context = useContext(WorkbenchContext)

  if (!context) {
    throw new Error(
      'The `useWorkbench` hook must be used within a `WorkbenchProvider`. Please ensure the `WorkbenchProvider` is rendered sufficiently high in the component tree.',
    )
  }

  return context
}
