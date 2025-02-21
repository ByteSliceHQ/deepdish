import { routeTree } from '@/generated/routeTree.gen'
import { createMemoryHistory, createRouter } from '@tanstack/react-router'
import { queryClient } from './lib/queries'

const memoryHistory = createMemoryHistory({
  initialEntries: ['/'],
})

export const router = createRouter({
  routeTree,
  history: memoryHistory,
  context: {
    queryClient,
  },
})
