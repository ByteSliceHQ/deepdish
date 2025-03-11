import { JsonSchemaForm } from '@/components/json-schema-form'
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
import {
  contractsOptions,
  keyOptions,
  useContracts,
  useKey,
  useUpdateKey,
} from '@/lib/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { MenuIcon } from 'lucide-react'
import { Resizable } from 're-resizable'
import { useState } from 'react'

export const Route = createFileRoute('/catalog/$contract/$key')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      keyOptions(context.procedures, params.contract, params.key),
    )
  },
})

function Inspector(props: {
  content: string
  schema: string
}) {
  const [tab, setTab] = useState<'schema' | 'content'>('schema')

  return (
    <Resizable
      defaultSize={{ width: 300, height: '100%' }}
      maxWidth={600}
      minWidth={100}
      enable={{ top: false, right: false, bottom: true, left: true }}
      className="flex flex-col border-l h-full overflow-y-hidden"
    >
      <div className="flex items-center gap-2 px-4 border-b h-[64px]">
        <Button
          size="sm"
          variant={tab === 'schema' ? 'default' : 'ghost'}
          onClick={() => setTab('schema')}
        >
          Schema
        </Button>
        <Button
          size="sm"
          variant={tab === 'content' ? 'default' : 'ghost'}
          onClick={() => setTab('content')}
        >
          Content
        </Button>
      </div>
      <pre className="text-xs flex-1 flex-col overflow-y-auto bg-gray-50 p-4">
        {tab === 'schema' ? props.schema : props.content}
      </pre>
    </Resizable>
  )
}

function Breadcrumbs() {
  const { contract: currentContract, key } = Route.useParams()
  const { data: contracts } = useContracts()
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
            <pre>{key}</pre>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function RouteComponent() {
  const { contract, key } = Route.useParams()
  const { data } = useKey(contract, key)
  const { mutateAsync: updateKey } = useUpdateKey(contract, key)

  return (
    <div className="flex h-full">
      <div className="flex flex-col flex-1 h-full overflow-y-auto">
        <Breadcrumbs />
        <div className="p-4 flex-1 overflow-y-auto">
          <JsonSchemaForm
            content={data.content}
            schema={data.schema}
            onSubmit={async (data) => {
              if (data) {
                await updateKey(data)
              }
            }}
            uniqueId={data.name}
          />
        </div>
      </div>
      <Inspector
        content={JSON.stringify(data.content, null, 2)}
        schema={JSON.stringify(data.schema, null, 2)}
      />
    </div>
  )
}
