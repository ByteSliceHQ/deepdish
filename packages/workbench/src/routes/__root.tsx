import { Layout } from '@/components/layout'
import { TooltipProvider } from '@/components/ui/tooltip'
import type { Procedures } from '@/lib/context'
import { queryClient } from '@/lib/queries'
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRouteWithContext } from '@tanstack/react-router'

export interface RouteContext {
  queryClient: QueryClient
  procedures: Procedures
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Layout />
      </TooltipProvider>
    </QueryClientProvider>
  ),
})
