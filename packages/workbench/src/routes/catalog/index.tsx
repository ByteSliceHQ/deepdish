import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/catalog/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col flex-1 gap-2 h-full items-center py-16">
      <h1 className="font-bold text-xl text-gray-800">Content Catalog</h1>
      <p className="text-gray-600 max-w-[400px] text-center">
        Get started by selecting an existing key from the list on the left. Or,
        you can <Link to="/catalog/new">create a new key</Link>.
      </p>
    </div>
  )
}
