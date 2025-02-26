import { RichText } from '@/components/rich-text'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { JSONSchema7, JSONSchema7Definition } from 'json-schema'
import { useEffect, useMemo, useState } from 'react'
import {
  type Control,
  Controller,
  type FieldValues,
  type UseFormRegister,
  useForm,
} from 'react-hook-form'

type Content = object | string | number | boolean | null | undefined

function renderFields(
  uniqueId: string,
  properties: Record<string, JSONSchema7Definition>,
  register: UseFormRegister<FieldValues>,
  control: Control<FieldValues>,
  parentKey?: string,
) {
  return Object.entries(properties).map(([key, subschema]) => {
    if (typeof subschema === 'boolean') {
      return null
    }

    const fieldName = parentKey ? `${parentKey}.${key}` : key

    if (subschema.type === 'object' && subschema.properties) {
      return (
        <fieldset key={fieldName} className="border space-y-1 p-4 rounded">
          <legend className="capitalize text-sm font-medium leading-none">
            {subschema.title || key}
          </legend>
          {subschema.description && (
            <p className="text-gray-500 text-sm">{subschema.description}</p>
          )}
          {renderFields(
            uniqueId,
            subschema.properties,
            register,
            control,
            fieldName,
          )}
        </fieldset>
      )
    }

    if (subschema.type === 'string') {
      return (
        <div key={fieldName} className="space-y-1">
          <Label className="capitalize text-sm" htmlFor={fieldName}>
            {subschema.title || key}
          </Label>
          <Controller
            name={fieldName}
            control={control}
            render={({ field: { onChange, value } }) => (
              <RichText
                uniqueId={uniqueId}
                content={value}
                onChange={onChange}
              />
            )}
          />
          {subschema.description && (
            <p className="text-gray-500 text-sm">{subschema.description}</p>
          )}
        </div>
      )
    }

    if (subschema.type === 'number' || subschema.type === 'integer') {
      return (
        <div key={fieldName} className="space-y-1">
          <Label className="capitalize text-sm" htmlFor="">
            {subschema.title || key}
          </Label>
          <Input
            id={fieldName}
            type="number"
            {...register(fieldName, { valueAsNumber: true })}
          />
          {subschema.description && (
            <p className="text-gray-500 text-sm">{subschema.description}</p>
          )}
        </div>
      )
    }

    if (subschema.type === 'boolean') {
      return (
        <div key={fieldName} className="items-center space-x-1">
          <Label className="capitalize text-sm" htmlFor={fieldName}>
            {subschema.title || key}
          </Label>
          <Controller
            name={fieldName}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                id={fieldName}
                checked={value}
                onCheckedChange={onChange}
              />
            )}
          />
          {subschema.description && (
            <p className="text-gray-500 text-sm">{subschema.description}</p>
          )}
        </div>
      )
    }

    // TODO: improve unsupported styling
    return (
      <div key={fieldName} className="space-y-1">
        <Label className="text-sm capitalize">{subschema.title || key}</Label>
        <div className="max-w-prose text-sm">
          The{' '}
          <pre className="inline bg-gray-50 px-1 py-0.5 rounded">
            {subschema.type}
          </pre>{' '}
          type is not supported.{' '}
          <a
            href="https://github.com/byteslicehq/deepdish/issues"
            target="_blank"
            rel="noreferrer"
          >
            Please drop an issue, and we'll see if we can add support for it.
          </a>
        </div>
        {subschema.description && (
          <p className="text-gray-500 text-sm">{subschema.description}</p>
        )}
      </div>
    )
  })
}

function getDefaultValues(schema: JSONSchema7, content: Content): FieldValues {
  const schemaAndContentAreCompatible =
    schema.type === 'object' &&
    schema.properties &&
    typeof content === 'object' &&
    content !== null

  if (schemaAndContentAreCompatible) {
    return content
  }

  console.warn('Received malformed schema or content:', {
    schema,
    content,
  })

  return {}
}

function DynamicForm(props: {
  content: Content
  onSubmit: (content: Content) => void
  schema: JSONSchema7
  uniqueId: string
}) {
  const defaultValues: FieldValues = useMemo(() => {
    return getDefaultValues(props.schema, props.content)
  }, [props.schema, props.content])

  // TODO: validation, error states, etc.
  const form = useForm({
    defaultValues,
  })

  useEffect(() => {
    form.reset(defaultValues)
  }, [form, defaultValues])

  if (props.schema.type === 'object' && props.schema.properties) {
    return (
      <form onSubmit={form.handleSubmit(props.onSubmit)} className="space-y-4">
        {renderFields(
          props.uniqueId,
          props.schema.properties,
          form.register,
          form.control,
        )}
        <Button variant="default">Submit</Button>
      </form>
    )
  }

  return (
    <form onSubmit={form.handleSubmit(props.onSubmit)}>
      <div>Unsupported schema type</div>
      <Button variant="default">Submit</Button>
    </form>
  )
}

function SimpleTextForm(props: {
  content: string
  onSubmit: (content: Content) => void
  uniqueId: string
}) {
  const [value, setValue] = useState<string | undefined>(props.content)

  // NB: ensure the `RichText` component unmounts when the `uniqueId` changes.
  useEffect(() => {
    if (props.uniqueId) {
      setValue(undefined)
    }
  }, [props.uniqueId])

  useEffect(() => {
    if (value === undefined) {
      setValue(props.content)
    }
  }, [value, props.content])

  if (value === undefined) {
    return null
  }

  return (
    <div className="space-y-4">
      <RichText uniqueId={props.uniqueId} content={value} onChange={setValue} />
      <Button
        type="submit"
        variant="default"
        onClick={() => props.onSubmit(value)}
      >
        Submit
      </Button>
    </div>
  )
}

function SimpleNumberForm(props: {
  content: number
  onSubmit: (content: Content) => void
  uniqueId: string
}) {
  const [value, setValue] = useState<number | undefined>(props.content)

  useEffect(() => {
    setValue(props.content)
  }, [props.content])

  return (
    <div className="space-y-4">
      <Input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <Button
        type="submit"
        variant="default"
        onClick={() => props.onSubmit(value)}
      >
        Submit
      </Button>
    </div>
  )
}

export function JsonSchemaForm(props: {
  content: Content
  onSubmit: (content: Content) => void
  schema: JSONSchema7
  uniqueId: string
}) {
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
