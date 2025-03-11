import {
  WorkbenchProvider,
  type WorkbenchProviderProps,
  useProcedures,
} from '@/lib/context'
import { RouterProvider } from '@tanstack/react-router'
import { queryClient } from './lib/queries'
import { makeRouter } from './router'

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof makeRouter>
  }
}

export type WorkbenchProps = Omit<WorkbenchProviderProps, 'children'>

function Router() {
  const procedures = useProcedures()
  const router = makeRouter(queryClient, procedures)

  return <RouterProvider router={router} />
}

export function Workbench(props: WorkbenchProps) {
  return (
    <WorkbenchProvider {...props}>
      <Router />
    </WorkbenchProvider>
  )
}
