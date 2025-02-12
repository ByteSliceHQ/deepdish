import { createContext, type RefObject, useContext } from 'react'

export type WorkbenchContext = {
  ref?: RefObject<HTMLElement>
}

export type WorkbenchProviderProps = {
  children: React.ReactNode
  ref?: RefObject<HTMLElement>
}

export const WorkbenchContext = createContext<WorkbenchContext | null>(null)

export function WorkbenchProvider(props: {
  children: React.ReactNode
  ref?: RefObject<HTMLElement>
}) {
  return (
    <WorkbenchContext.Provider value={props}>
      {props.children}
    </WorkbenchContext.Provider>
  )
}

export function useShadowRoot() {
  const context = useContext(WorkbenchContext)

  if (!context) {
    throw new Error(
      'Workbench context not found. This hook must be used within a `WorkbenchProvider`.',
    )
  }

  return context.ref?.current
}
