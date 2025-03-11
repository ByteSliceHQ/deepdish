import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useProcedures } from '@/lib/context'
import { contractKeysOptions, contractsOptions } from '@/lib/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { MenuIcon } from 'lucide-react'

export const Route = createFileRoute('/catalog/$contract/')({
  component: RouteComponent,
  beforeLoad: async ({ context, params }) => {
    const keys = await context.queryClient.ensureQueryData(
      contractKeysOptions(context.procedures, params.contract),
    )

    if (keys.length) {
      throw redirect({
        to: '/catalog/$contract/$key',
        params: { contract: params.contract, key: keys[0] },
      })
    }
  },
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      contractKeysOptions(context.procedures, params.contract),
    )
  },
})

function Breadcrumbs() {
  const { contract: currentContract } = Route.useParams()
  const procedures = useProcedures()
  const { data: contracts } = useSuspenseQuery(contractsOptions(procedures))
  const navigate = useNavigate()

  return (
    <Breadcrumb className="px-4 h-[64px] flex items-center border-b">
      <BreadcrumbList>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MenuIcon />
                <pre>{currentContract}</pre>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {contracts.map((contract) => (
                <DropdownMenuCheckboxItem
                  key={contract}
                  checked={contract === currentContract}
                  onCheckedChange={() =>
                    navigate({
                      to: '/catalog/$contract',
                      params: { contract },
                    })
                  }
                >
                  <pre>{contract}</pre>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <i className="text-muted-foreground">Select a key</i>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function RouteComponent() {
  // TODO: create key component
  return (
    <div className="flex flex-col h-full">
      <Breadcrumbs />
    </div>
  )
}
