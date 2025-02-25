import { EmptyState } from '@/components/empty-state'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/catalog')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-full items-center justify-center">
      <EmptyState label="Content catalog coming soon!" />
    </div>
  )
}
