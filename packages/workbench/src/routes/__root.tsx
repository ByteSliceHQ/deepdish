import { Layout } from '@/components/layout'
import { Toaster } from '@/components/ui/sonner'
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
        <Toaster />
        <Layout />
      </TooltipProvider>
    </QueryClientProvider>
  ),
})
