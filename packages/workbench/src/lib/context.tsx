import { type RefObject, createContext, useContext } from 'react'

export type WorkbenchContext = {
  ref?: RefObject<HTMLElement>
  authDisabled?: boolean
  title?: React.ReactNode
}

export type WorkbenchProviderProps = {
  children: React.ReactNode
  authDisabled?: boolean
  ref?: RefObject<HTMLElement>
  title?: React.ReactNode
}

export const WorkbenchContext = createContext<WorkbenchContext | null>(null)

export function WorkbenchProvider(props: WorkbenchProviderProps) {
  const { children, ...rest } = props

  return (
    <WorkbenchContext.Provider value={rest}>
      {props.children}
    </WorkbenchContext.Provider>
  )
}

export function useShadowRoot() {
  const context = useContext(WorkbenchContext)

  if (!context) {
    throw noContextFound()
  }

  return context.ref?.current
}

export function useAuthDisabled() {
  const context = useContext(WorkbenchContext)

  if (!context) {
    throw noContextFound()
  }

  return context.authDisabled
}

export function useTitle() {
  const context = useContext(WorkbenchContext)

  if (!context) {
    throw noContextFound()
  }

  return context.title
}

function noContextFound() {
  new Error(
    'Workbench context not found. This hook must be used within a `WorkbenchProvider`.',
  )
}
