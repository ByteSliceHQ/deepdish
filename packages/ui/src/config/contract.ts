import type { Schema, Value } from '@deepdish/core/schema'
import type { Resolver } from '@deepdish/resolvers'

type Component<S extends Schema> = (value: Value<S>) => JSX.Element

export type Contract<S extends Schema = Schema, K extends string = string> = {
  schema: S
  resolver: Resolver<Value<S>>
  components: Record<K, Component<S>>
}

export type Contracts = Record<string, Contract>

export function createContract<S extends Schema, K extends string>(
  schema: S,
  resolver: Resolver<Value<S>>,
  components: Record<K, Component<S>>,
): Contract<S, K> {
  return {
    schema,
    resolver,
    components,
  }
}
