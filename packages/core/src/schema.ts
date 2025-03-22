import type { BaseIssue, BaseSchema, InferOutput } from 'valibot'
import * as v from 'valibot'

type SchemaUtils = {
  meta: typeof meta
  required: typeof required
  rich: typeof rich
}

type Meta = {
  required?: boolean
  rich?: boolean
}

// biome-ignore lint/suspicious/noExplicitAny: generic schema type requires output type of any
export type Schema<S = unknown> = BaseSchema<S, any, BaseIssue<unknown>>

export type Value<S extends Schema> = InferOutput<S>

export function extractMetadata<S extends Schema>(
  valibotSchema: S,
): Record<string, Meta> | Meta | null {
  const result: Record<string, Meta> = {}
  const root = ''

  let isPrimitive = true

  function traverse(schema: Schema, path: string[] = []) {
    if ('pipe' in schema && Array.isArray(schema.pipe)) {
      for (const pipeItem of schema.pipe) {
        traverse(pipeItem as Schema, path)
      }
    }

    if (
      'entries' in schema &&
      schema.entries &&
      typeof schema.entries === 'object'
    ) {
      isPrimitive = false
      const entries = schema.entries as Record<string, Schema>
      for (const [key, value] of Object.entries(entries)) {
        traverse(value, [...path, key])
      }
    }

    if ('metadata' in schema && schema.metadata) {
      const fullPath = path.join('.')
      result[fullPath] = schema.metadata
    }
  }

  traverse(valibotSchema)

  if (isPrimitive && result[root]) {
    return result[root]
  }

  if (!Object.keys(result).length) {
    return null
  }

  return result
}

export function meta<S extends Schema>(schema: S, meta?: Meta) {
  if (meta) {
    return v.pipe(schema, v.metadata(meta))
  }

  return schema
}

export function required<S extends Schema>(schema: S) {
  return meta(schema, { required: true })
}

export function rich<S extends Schema>(schema: S) {
  return meta(schema, { rich: true })
}

export function schema(
  buildSchema: (valibot: typeof v, utils: SchemaUtils) => Schema,
) {
  return buildSchema(v, { meta, required, rich })
}
