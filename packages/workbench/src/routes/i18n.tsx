import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/i18n')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/i18n"!</div>
}
