import { useRef, type RefObject } from 'react'
import {
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from '@tanstack/react-router'
import { WorkbenchProvider } from '@/lib/context'
import { routeTree } from '@/generated/routeTree.gen'
import { Tailwind } from 'react-shadow-scope'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export type WorkbenchProps = {
  ref?: RefObject<HTMLElement>
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

export function Shadow(props: WorkbenchProps) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <Tailwind href="/__deepdish/css">
      <div ref={ref} className="deepdish-shadow">
        <WorkbenchProvider
          ref={ref}
          title={props.title}
          authDisabled={props.authDisabled}
        >
          <RouterProvider router={router} />
        </WorkbenchProvider>
      </div>
    </Tailwind>
  )
}

export function Workbench(props: WorkbenchProps) {
  return (
    <WorkbenchProvider {...props}>
      <RouterProvider router={router} />
    </WorkbenchProvider>
  )
}
