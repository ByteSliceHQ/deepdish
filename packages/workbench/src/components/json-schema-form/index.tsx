import type { JSONSchema7 } from 'json-schema'
import { useEffect, useRef, useState } from 'react'
import { DynamicForm } from './dynamic-form'
import { SimpleNumberForm, SimpleTextForm } from './simple-form'

export type Content = object | string | number | boolean | null | undefined

export function JsonSchemaForm(props: {
  content: unknown
  onSubmit: (content: Content) => Promise<void>
  schema: JSONSchema7
  uniqueId: string
}) {
  const initialUniqueId = useRef<string>(props.uniqueId)
  const [shouldRender, setShouldRender] = useState<boolean>(false)

  // NB: ensure component fully re-renders when uniqueId changes
  useEffect(() => {
    if (initialUniqueId.current !== props.uniqueId) {
      initialUniqueId.current = props.uniqueId
      setShouldRender(false)
    }
  }, [props.uniqueId])

  useEffect(() => {
    if (!shouldRender) {
      setShouldRender(true)
    }
  }, [shouldRender])

  if (!shouldRender) {
    return null
  }

  if (props.schema.type === 'string') {
    return (
      <SimpleTextForm
        uniqueId={props.uniqueId}
        content={props.content as string}
        onSubmit={props.onSubmit}
      />
    )
  }

  if (props.schema.type === 'number') {
    return (
      <SimpleNumberForm
        uniqueId={props.uniqueId}
        content={props.content as number}
        onSubmit={props.onSubmit}
      />
    )
  }

  if (props.schema.type === 'object' && props.schema.properties) {
    return <DynamicForm {...props} />
  }

  // TODO: better unsupported styling
  return <div>Unsupported schema type</div>
}
