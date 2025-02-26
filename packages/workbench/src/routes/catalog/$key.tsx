import { JsonSchemaForm } from '@/components/json-schema-form'
import { Button } from '@/components/ui/button'
import { keyOptions } from '@/lib/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Resizable } from 're-resizable'
import { useState } from 'react'

export const Route = createFileRoute('/catalog/$key')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(keyOptions(params.key))
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

function RouteComponent() {
  const { key } = Route.useParams()
  const { data } = useSuspenseQuery(keyOptions(key))

  // TODO: 404 state

  return (
    <div className="flex h-full">
      <div className="flex flex-col flex-1 h-full overflow-y-auto">
        <div className="flex items-center px-4 text-sm border-b h-[64px]">
          <pre className="font-bold">{key}</pre>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <JsonSchemaForm
            content={data.content}
            schema={data.schema}
            onSubmit={(data) => {
              console.log(data)
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
