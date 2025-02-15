import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/catalog')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/catalog"!</div>
}
