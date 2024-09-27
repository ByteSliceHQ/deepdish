'use client'

import { createContext, useContext } from 'react'

type AuthButton = React.FunctionComponent<{ children: JSX.Element }>

export type WorkbenchContext = {
  authenticated: boolean
  signInButton: AuthButton
  signOutButton: AuthButton
}

export type WorkbenchProviderProps = {
  authenticated: boolean
  children: React.ReactNode
  signInButton: AuthButton
  signOutButton: AuthButton
}

export const WorkbenchContext = createContext<WorkbenchContext | null>(null)

export function WorkbenchProvider(props: WorkbenchProviderProps) {
  return (
    <WorkbenchContext.Provider
      value={{
        authenticated: props.authenticated,
        signInButton: props.signInButton,
        signOutButton: props.signOutButton,
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
