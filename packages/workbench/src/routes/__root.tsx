import { Layout } from '@/components/layout'
import { TooltipProvider } from '@/components/ui/tooltip'
import { queryClient } from '@/lib/queries'
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRouteWithContext } from '@tanstack/react-router'

export interface RouteContext {
  queryClient: QueryClient
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
