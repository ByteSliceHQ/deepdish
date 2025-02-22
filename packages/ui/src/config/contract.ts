import type { Resolver } from '@deepdish/resolvers'
import type { ZodTypeAny, z } from 'zod'

export type Schema = ZodTypeAny

type Value<S extends Schema> = z.infer<S>

export type Contract<S extends Schema> = Readonly<{
  resolver: Resolver<Value<S>>
  schema: S
}>

export type Contracts = Readonly<{
  [key in string]?: Contract<Schema>
}>
