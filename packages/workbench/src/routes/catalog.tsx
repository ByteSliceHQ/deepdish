import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { catalogOptions } from '@/lib/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'

export const Route = createFileRoute('/catalog')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(catalogOptions())
  },
})

function SearchBar() {
  return (
    <div className="flex items-center gap-2 w-full">
      <Input className="flex-1" placeholder="Find key" />
      <Link to="/catalog/new">
        {({ isActive }) => (
          <Button size="icon" variant={isActive ? 'default' : 'outline'}>
            <PlusIcon />
          </Button>
        )}
      </Link>
    </div>
  )
}

function KeyList() {
  const {
    data: { keys },
  } = useSuspenseQuery(catalogOptions())

  return (
    <div className="h-full flex flex-col border-r border-gray-200">
      <div className="flex items-center h-[64px] border-b px-4">
        <SearchBar />
      </div>
      <div className="flex flex-col flex-1 gap-2 overflow-y-auto p-4">
        {keys.map((key) => (
          <Link key={key.name} to="/catalog/$key" params={{ key: key.name }}>
            {({ isActive }) => (
              <Button
                size="sm"
                className="font-mono w-full justify-start"
                variant={isActive ? 'secondary' : 'ghost'}
              >
                {key.name}
              </Button>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

function RouteComponent() {
  return (
    <div className="flex h-full">
      <KeyList />
      <div className="flex flex-col flex-1 h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
