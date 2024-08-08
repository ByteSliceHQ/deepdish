import type { infer as ZodInfer, ZodTypeAny } from 'zod'
import type { Context, Maybe } from './types'

type Read<V> = (context: Context) => Promise<Maybe<V>>

type Write<V> = (context: Context, value: V) => Promise<void>

export type Resolver<V> = {
  read: Read<V>
  write: Write<V>
}

export function createResolver<S extends ZodTypeAny>(schema: S) {
  type Value = ZodInfer<S>

  return (read: Read<Value>, write: Write<Value>): Resolver<Value> => {
    return {
      read: async (context) => {
        'use server'

        try {
          const data = await read(context)
          return schema.parse(data) as Value
        } catch (err) {
          // TODO: handle error
        }
      },
      write: async (context, value) => {
        'use server'

        try {
          await write(context, value)
        } catch (err) {
          // TODO: handle error
        }
      },
    }
  }
}
