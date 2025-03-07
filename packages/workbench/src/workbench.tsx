import { routeTree } from '@/generated/routeTree.gen'
import { WorkbenchProvider } from '@/lib/context'
import {
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from '@tanstack/react-router'
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export type WorkbenchProps = {
  title?: React.ReactNode
  authDisabled?: boolean
}

const memoryHistory = createMemoryHistory({
  initialEntries: ['/'],
})

const router = createRouter({
  routeTree,
  history: memoryHistory,
})

export function Workbench(props: WorkbenchProps) {
  return (
    <WorkbenchProvider {...props}>
      <RouterProvider router={router} />
    </WorkbenchProvider>
  )
}
