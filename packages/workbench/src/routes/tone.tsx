import { EmptyState } from '@/components/empty-state'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tone')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-full items-center justify-center">
      <EmptyState label="Tone guide coming soon!" />
    </div>
  )
}
