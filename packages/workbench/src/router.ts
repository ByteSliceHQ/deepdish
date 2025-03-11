import { routeTree } from '@/generated/routeTree.gen'
import type { QueryClient } from '@tanstack/react-query'
import { createMemoryHistory, createRouter } from '@tanstack/react-router'
import type { Procedures } from './lib/context'

const memoryHistory = createMemoryHistory({
  initialEntries: ['/'],
})

export function makeRouter(queryClient: QueryClient, procedures: Procedures) {
  return createRouter({
    routeTree,
    history: memoryHistory,
    context: {
      queryClient,
      procedures,
    },
  })
}
