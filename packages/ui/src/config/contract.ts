import type { Schema, Value } from '@deepdish/core/schema'
import type { Resolver } from '@deepdish/resolvers'

export type Contract<S extends Schema> = {
  resolver: Resolver<Value<S>>
  schema: S
}

export type Contracts = Record<string, Contract<Schema>>
