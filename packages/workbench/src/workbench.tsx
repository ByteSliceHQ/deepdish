import { WorkbenchProvider } from '@/lib/context'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export type WorkbenchProps = {
  title?: React.ReactNode
  authDisabled?: boolean
}

export function Workbench(props: WorkbenchProps) {
  return (
    <WorkbenchProvider {...props}>
      <RouterProvider router={router} />
    </WorkbenchProvider>
  )
}
