import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tone')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tone"!</div>
}
