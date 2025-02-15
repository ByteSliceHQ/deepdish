import { EmptyState } from '@/components/empty-state'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/i18n')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-full items-center justify-center">
      <EmptyState label="Internationalization coming soon!" />
    </div>
  )
}
