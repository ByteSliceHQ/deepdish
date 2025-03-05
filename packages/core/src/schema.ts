import type { GenericSchema, InferOutput } from 'valibot'

export type Schema = GenericSchema

export type Value<S extends Schema> = InferOutput<S>
