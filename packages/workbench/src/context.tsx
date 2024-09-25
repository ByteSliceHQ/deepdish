import { useContext, createContext } from 'react'

type WorkbenchContext = {
  authenticated: boolean
}

type WorkbenchProviderProps = {
  authenticated: boolean
  children: React.ReactNode
}

export const WorkbenchContext = createContext<WorkbenchContext | null>(null)

export function WorkbenchProvider(props: WorkbenchProviderProps) {
  console.log('workbench provider:', props.authenticated)

  return (
    <WorkbenchContext.Provider value={{ authenticated: props.authenticated }}>
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
