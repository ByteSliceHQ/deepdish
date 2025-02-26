import { useState } from 'react'
import { catalogOptions } from '@/lib/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { JsonSchemaForm } from '@/components/json-schema-form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/catalog/new')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(catalogOptions())
  },
})

function RouteComponent() {
  const { data } = useSuspenseQuery(catalogOptions())
  const [name, setName] = useState<string>()
  const [extension, setExtension] = useState<string>()

  const schema = extension ? data.schemas[extension] : undefined

  function handleSubmit(content: unknown) {
    console.log('submitted!', content)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex shrink-0 items-center h-[64px] border-b px-4 gap-4">
        <p>Create new key</p>
        <div className="flex">
          <Input
            placeholder="Enter the key name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="max-w-[200px] rounded-tr-none rounded-br-none"
          />
          <Select onValueChange={setExtension} value={extension}>
            <SelectTrigger className="w-[240px] rounded-tl-none rounded-bl-none ml-[-1px]">
              <SelectValue placeholder="Schema" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(data.schemas).map((extensions) => (
                <SelectItem key={extensions} value={extensions}>
                  {extensions}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col overflow-y-auto p-4">
        <div className="max-w-[500px]">
          {schema ? (
            <JsonSchemaForm
              schema={schema}
              content=""
              uniqueId={`new.${extension}`}
              onSubmit={handleSubmit}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
