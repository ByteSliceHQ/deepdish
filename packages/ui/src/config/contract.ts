import type { Schema, Value } from '@deepdish/core/schema'
import type { Resolver } from '@deepdish/resolvers'

export type Render<S extends Schema, E extends HTMLElement> = (
  props: React.HTMLAttributes<E>,
  value?: Value<S>,
) => Promise<React.ReactElement>

export type Contract<
  S extends Schema = Schema,
  K extends string = string,
  E extends HTMLElement = HTMLElement,
> = {
  schema: S
  resolver: Resolver<Value<S>>
  components: Record<K, Render<S, E>>
}

export type Contracts = Record<string, Contract>

export function createContract<
  S extends Schema,
  K extends string,
  E extends HTMLElement,
>(
  schema: S,
  resolver: Resolver<Value<S>>,
  components: Record<K, Render<S, E>>,
): Contract<S, K> {
  return {
    schema,
    resolver,
    components,
  }
}
