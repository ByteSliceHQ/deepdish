import { Button } from '@/components/ui/button'
import { useProcedures } from '@/lib/context'
import { contractsOptions } from '@/lib/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/catalog/')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      contractsOptions(context.procedures),
    )
  },
})

function RouteComponent() {
  const procedures = useProcedures()
  const { data: contracts } = useSuspenseQuery(contractsOptions(procedures))

  // TODO: improve contracts view
  // TODO: empty state
  return (
    <div className="flex h-full justify-center items-center">
      {contracts.map((contract) => (
        <Link key={contract} to="/catalog/$contract" params={{ contract }}>
          {({ isActive }) => (
            <Button
              size="sm"
              className="font-mono w-full justify-start"
              variant={isActive ? 'secondary' : 'ghost'}
            >
              {contract}
            </Button>
          )}
        </Link>
      ))}
    </div>
  )
}
