import type { infer as ZodInfer, ZodTypeAny } from 'zod'
import type { Context, Maybe, Result } from './types'

type Read<T> = (context: Context) => Promise<T>

type Write<T, V> = (context: Context, value: V) => Promise<T>

export type Resolver<V> = {
  read: Read<Result<V>>
  write: Write<Result<void>, V>
}

export function createResolver<S extends ZodTypeAny>(schema: S) {
  type Value = ZodInfer<S>

  return (
    read: Read<Maybe<Value>>,
    write: Write<void, Value>,
  ): Resolver<Value> => {
    return {
      read: async (context) => {
        try {
          const data = await read(context)
          schema.parse(data)

          return { data }
        } catch (err) {
          const error =
            err instanceof Error ? err : Error('Something went wrong')

          return { error }
        }
      },
      write: async (context, value) => {
        'use server'

        try {
          await write(context, value)
          return { data: undefined }
        } catch (err) {
          const error =
            err instanceof Error ? err : Error('Something went wrong')

          return { error }
        }
      },
    }
  }
}
