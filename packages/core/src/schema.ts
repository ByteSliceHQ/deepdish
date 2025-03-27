import { toJsonSchema } from '@valibot/to-json-schema'
import type { JSONSchema7 } from 'json-schema'
import type { GenericSchema, InferOutput } from 'valibot'
import * as v from 'valibot'

type SchemaUtils = {
  meta: typeof meta
  required: typeof required
  rich: typeof rich
}

export type Meta = {
  required?: boolean
  rich?: boolean
}

// biome-ignore lint/suspicious/noExplicitAny: value can be any type
export type Schema<V = any> = GenericSchema<V>

export type Value<S extends Schema> = InferOutput<S>

export function extractMetadata<S extends Schema>(
  valibotSchema: S,
): Record<string, Meta> {
  const result: Record<string, Meta> = {}
  const root = 'root'
  const delimiter = '.'

  function traverse(schema: Schema, path: string[] = [root]) {
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
      const entries = schema.entries as Record<string, Schema>

      for (const [key, value] of Object.entries(entries)) {
        traverse(value, [...path, key])
      }
    }

    if ('metadata' in schema && schema.metadata) {
      result[path.join(delimiter)] = schema.metadata
    }
  }

  traverse(valibotSchema)
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

export function serialize<S extends Schema>(
  schema: S,
  errorMode?: 'ignore' | 'throw' | 'warn',
): JSONSchema7 {
  return toJsonSchema(schema, { errorMode: errorMode ?? 'ignore' })
}

export function schema<T>(
  buildSchema: (valibot: typeof v, utils: SchemaUtils) => GenericSchema<T>,
) {
  return buildSchema(v, { meta, required, rich })
}
