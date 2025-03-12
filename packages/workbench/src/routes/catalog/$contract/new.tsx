import { JsonSchemaForm } from '@/components/json-schema-form'
import { SaveKeyToast } from '@/components/toasts/save-key'
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
import { Input } from '@/components/ui/input'
import {
  contractSchemaOptions,
  contractsOptions,
  useContracts,
  useContractSchema,
  useCreateKey,
} from '@/lib/queries'
import { withResult } from '@byteslice/result'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { MenuIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

type NewKeySearch = {
  key?: string
}

export const Route = createFileRoute('/catalog/$contract/new')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(contractsOptions(context.procedures)),
      context.queryClient.ensureQueryData(
        contractSchemaOptions(context.procedures, params.contract),
      ),
    ])
  },
  validateSearch: (search): NewKeySearch => ({
    key: search.key ? String(search.key) : undefined,
  }),
})

function Breadcrumbs(props: {
  keyName: string
  onKeyNameChange: (name: string) => void
}) {
  const { contract: currentContract } = Route.useParams()
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
                      to: '/catalog/$contract/new',
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
            <Input
              value={props.keyName}
              onChange={(e) => props.onKeyNameChange(e.currentTarget.value)}
              placeholder="Enter key name here"
              className="font-mono"
            />
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function RouteComponent() {
  const { contract: currentContract } = Route.useParams()
  const { key: defaultKeyName = '' } = Route.useSearch()
  const { data: schema } = useContractSchema(currentContract)
  const [keyName, setKeyName] = useState(defaultKeyName)
  const { mutateAsync: createKey } = useCreateKey(currentContract)

  async function handleSubmit(content: unknown) {
    if (!keyName) {
      toast.error('Key name is required')
      return
    }

    const result = await withResult(
      () => createKey({ content, keyName }),
      (err) => err,
    )

    if (result.failure) {
      toast.error(<SaveKeyToast message="Failed to create" keyName={keyName} />)
      return
    }

    toast.success(
      <SaveKeyToast message="Successfully created" keyName={keyName} />,
    )
  }

  return (
    <div className="h-full flex flex-col">
      <Breadcrumbs keyName={keyName} onKeyNameChange={setKeyName} />
      <div className="p-4 flex-1 overflow-y-auto">
        <JsonSchemaForm
          uniqueId={`${currentContract}-new`}
          content={null}
          schema={schema}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
