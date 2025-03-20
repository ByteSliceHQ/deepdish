import type { BaseIssue, BaseSchema, InferOutput } from 'valibot'

export type Meta<S extends Schema> = {
  [K in keyof Value<S>]?: {
    rich?: boolean
  }
}

// biome-ignore lint/suspicious/noExplicitAny: generic schema type requires output type of any
export type Schema<S = unknown> = BaseSchema<S, any, BaseIssue<unknown>>

export type Value<S extends Schema> = InferOutput<S>
