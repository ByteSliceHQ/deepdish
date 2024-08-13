import type { infer as ZodInfer, ZodTypeAny } from 'zod'
import type { Context, Key, Maybe } from './types'

// TODO: support filtering, querying, pagination, etc.
type List = () => Promise<Key[]>

type Read<V> = (context: Context) => Promise<Maybe<V>>

type Write<V> = (context: Context, value: V) => Promise<void>

export type Resolver<V> = {
  list: List
  read: Read<V>
  write: Write<V>
}
export function createResolver<S extends ZodTypeAny>(schema: S) {
  type Value = ZodInfer<S>

  return (
    list: List,
    read: Read<Value>,
    write: Write<Value>,
  ): Resolver<Value> => {
    return {
      list: async () => {
        'use server'

        try {
          const keys = await list()
          // TODO: validate keys
          return keys
        } catch (err) {
          // TODO: handle error
        }
      },
      read: async (context) => {
        try {
          const data = await read(context)
          return schema.parse(data) as Value
        } catch (err) {
          // TODO: handle error
          console.error(err)
        }
      },
      write: async (context, value) => {
        'use server'

        try {
          await write(context, value)
        } catch (err) {
          // TODO: handle error
          console.error(err)
        }
      },
    }
  }
}
