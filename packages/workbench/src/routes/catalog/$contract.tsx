import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { contractKeysOptions, useContractKeys } from '@/lib/queries'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'

export const Route = createFileRoute('/catalog/$contract')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      contractKeysOptions(context.procedures, params.contract),
    )
  },
})

// TODO: empty state
function KeyList() {
  const params = Route.useParams()
  const { data: keys } = useContractKeys(params.contract)

  return (
    <div className="h-full flex flex-col border-r border-gray-200">
      <div className="flex items-center h-[64px] border-b px-4">
        <SearchBar />
      </div>
      <div className="flex flex-col flex-1 gap-2 overflow-y-auto p-4">
        {keys.map((key) => (
          <Link
            key={key}
            to="/catalog/$contract/$key"
            params={{ contract: params.contract, key }}
          >
            {({ isActive }) => (
              <Button
                size="sm"
                className="font-mono w-full justify-start"
                variant={isActive ? 'secondary' : 'ghost'}
              >
                {key}
              </Button>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

function SearchBar() {
  const { contract: currentContract } = Route.useParams()

  return (
    <div className="flex items-center gap-2 w-full">
      <Input className="flex-1" placeholder="Find key" />
      <Link to="/catalog/$contract/new" params={{ contract: currentContract }}>
        {({ isActive }) => (
          <Button size="icon" variant={isActive ? 'default' : 'outline'}>
            <PlusIcon />
          </Button>
        )}
      </Link>
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
