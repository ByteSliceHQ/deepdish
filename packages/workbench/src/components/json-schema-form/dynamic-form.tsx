import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Meta } from '@deepdish/core/schema'
import type { JSONSchema7, JSONSchema7Definition } from 'json-schema'
import { useEffect, useMemo } from 'react'
import {
  type Control,
  Controller,
  type FieldValues,
  type UseFormRegister,
  useForm,
} from 'react-hook-form'
import type { Content } from '.'
import { RichText } from '../rich-text'

function renderFields(
  uniqueId: string,
  properties: Record<string, JSONSchema7Definition>,
  register: UseFormRegister<FieldValues>,
  control: Control<FieldValues>,
  parentKey: string,
  meta: Record<string, Meta>,
) {
  return Object.entries(properties).map(([key, subSchema]) => {
    if (typeof subSchema === 'boolean') {
      return null
    }

    const fieldName = parentKey ? `${parentKey}.${key}` : key

    if (subSchema.type === 'object' && subSchema.properties) {
      return (
        <Fieldset title={subSchema.title || key} key={fieldName}>
          <Description description={subSchema.description} />
          {renderFields(
            uniqueId,
            subSchema.properties,
            register,
            control,
            fieldName,
            meta,
          )}
        </Fieldset>
      )
    }

    if (subSchema.type === 'string') {
      const rich = meta[fieldName]?.rich ?? false

      return (
        <Field
          key={fieldName}
          fieldName={fieldName}
          label={subSchema.title || key}
          description={subSchema.description}
        >
          <Controller
            name={fieldName}
            control={control}
            render={({ field: { onChange, value } }) => {
              if (rich) {
                return (
                  <RichText
                    content={value || ''}
                    uniqueId={fieldName}
                    onChange={onChange}
                  />
                )
              }

              return (
                <Input id={fieldName} value={value || ''} onChange={onChange} />
              )
            }}
          />
        </Field>
      )
    }

    if (subSchema.type === 'number' || subSchema.type === 'integer') {
      return (
        <Field
          key={fieldName}
          fieldName={fieldName}
          label={subSchema.title || key}
          description={subSchema.description}
        >
          <Input
            id={fieldName}
            type="number"
            {...register(fieldName, { valueAsNumber: true })}
          />
        </Field>
      )
    }

    if (subSchema.type === 'boolean') {
      return (
        <Field
          key={fieldName}
          fieldName={fieldName}
          label={subSchema.title || key}
          description={subSchema.description}
        >
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
        </Field>
      )
    }

    return (
      <Field
        key={fieldName}
        fieldName={fieldName}
        label={subSchema.title || key}
        description={subSchema.description}
      >
        <div className="max-w-prose text-sm">
          The{' '}
          <pre className="inline bg-gray-50 px-1 py-0.5 rounded">
            {subSchema.type}
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
      </Field>
    )
  })
}

function getDefaultValues(
  schema: JSONSchema7,
  content: unknown,
  rootKey: string,
): FieldValues {
  const schemaAndContentAreCompatible =
    schema.type === 'object' &&
    schema.properties &&
    typeof content === 'object' &&
    content !== null

  if (schemaAndContentAreCompatible) {
    return {
      [rootKey]: content,
    }
  }

  // TODO: adjust warning for null content
  console.warn('Received malformed schema or content:', {
    schema,
    content,
  })

  return {}
}

function Description(props: { description?: string | null }) {
  if (!props.description) {
    return null
  }

  return <p className="text-gray-500 text-sm">{props.description}</p>
}

function Field(props: {
  children: React.ReactNode
  fieldName: string
  label: string
  description?: string | null
}) {
  return (
    <div className="space-y-1">
      <Label className="capitalize text-sm" htmlFor={props.fieldName}>
        {props.label}
      </Label>
      {props.children}
      <Description description={props.description} />
    </div>
  )
}

function Fieldset(props: {
  children: React.ReactNode
  title: string
}) {
  return (
    <fieldset className="border space-y-1 p-4 rounded">
      <legend className="capitalize text-sm font-medium leading-none">
        {props.title}
      </legend>
      {props.children}
    </fieldset>
  )
}

export function DynamicForm(props: {
  content: unknown
  contentRootKey: string
  onSubmit: (content: Content) => void
  schema: JSONSchema7
  meta: Record<string, Meta>
  uniqueId: string
}) {
  const defaultValues: FieldValues = useMemo(() => {
    return getDefaultValues(props.schema, props.content, props.contentRootKey)
  }, [props.schema, props.content, props.contentRootKey])

  // TODO: validation, error states, etc.
  const form = useForm({
    defaultValues,
  })

  useEffect(() => {
    form.reset(defaultValues)
  }, [form, defaultValues])

  function handleSubmit(content: Record<typeof props.contentRootKey, Content>) {
    const value = content[props.contentRootKey]
    props.onSubmit(value)
  }

  if (props.schema.type === 'object' && props.schema.properties) {
    return (
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {renderFields(
          props.uniqueId,
          props.schema.properties,
          form.register,
          form.control,
          props.contentRootKey,
          props.meta,
        )}
        <Button
          variant="default"
          type="submit"
          loading={form.formState.isSubmitting}
          size="sm"
        >
          {form.formState.isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </form>
    )
  }

  // TODO: better unsupported styling
  return <div>Unsupported schema type</div>
}
