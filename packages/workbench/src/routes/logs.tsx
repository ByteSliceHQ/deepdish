import { EmptyState } from '@/components/empty-state'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/logs')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-full items-center justify-center">
      <EmptyState label="Logs inspector coming soon!" />
    </div>
  )
}
