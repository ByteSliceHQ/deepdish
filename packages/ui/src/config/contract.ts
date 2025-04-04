import type { Schema, Value } from '@deepdish/core/schema'
import type { Resolver } from '@deepdish/resolvers'

export type Contract<S extends Schema = Schema> = {
  schema: S
  resolver: Resolver<Value<S>>
}

export type Contracts = Record<string, Contract>

export function createContract<S extends Schema>(
  schema: S,
  resolver: Resolver<Value<S>>,
): Contract<S> {
  return {
    schema,
    resolver,
  }
}
