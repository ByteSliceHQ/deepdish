import type { Meta, Schema, Value } from '@deepdish/core/schema'
import type { Resolver } from '@deepdish/resolvers'

export type Contract<S extends Schema> = {
  resolver: Resolver<Value<S>>
  schema: S
  meta?: Meta<S>
}

export type Contracts = Record<string, Contract<Schema>>

export function createContract<S extends Schema>(
  schema: S,
  resolver: Resolver<Value<S>>,
  meta?: Meta<S>,
): Contract<S> {
  return {
    resolver,
    schema,
    meta,
  }
}
