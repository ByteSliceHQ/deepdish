import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/catalog/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <p>Coming soon!</p>
    </div>
  )
}
