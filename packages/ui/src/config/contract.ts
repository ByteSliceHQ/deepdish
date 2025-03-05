import type { Resolver } from '@deepdish/resolvers'
import type * as v from 'valibot'

export type Schema = v.GenericSchema

export type Value<S extends Schema> = v.InferOutput<S>

export type Contract<S extends Schema> = {
  resolver: Resolver<Value<S>>
  schema: S
}

export type Contracts = Record<string, Contract<Schema>>
