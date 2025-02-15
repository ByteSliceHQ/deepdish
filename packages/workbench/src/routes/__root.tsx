import { createRootRoute } from '@tanstack/react-router'
import { queryClient } from '@/lib/queries'
import { QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Layout } from '@/components/layout'

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Layout />
      </TooltipProvider>
    </QueryClientProvider>
  ),
})
