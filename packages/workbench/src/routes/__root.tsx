import { Layout } from '@/components/layout'
import { TooltipProvider } from '@/components/ui/tooltip'
import { queryClient } from '@/lib/queries'
import { QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Layout />
      </TooltipProvider>
    </QueryClientProvider>
  ),
})
