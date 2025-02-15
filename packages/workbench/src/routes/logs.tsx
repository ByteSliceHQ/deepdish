import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/logs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/logs"!</div>
}
