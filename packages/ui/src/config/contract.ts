import type { Resolver } from '@deepdish/resolvers'
import type { ZodTypeAny, z } from 'zod'

export type Schema = ZodTypeAny

export type Value<S extends Schema> = z.infer<S>

export type Contract<S extends Schema> = {
  resolver: Resolver<Value<S>>
  schema: S
}

export type Contracts = Record<string, Contract<Schema>>
