import type { ZodTypeAny, z } from 'zod'
import type { Context, Result } from './types'

type Read<T> = (context: Context) => Promise<T>

type Write<T, V> = (context: Context, value: V) => Promise<T>

export type Resolver<V> = {
  read: Read<Result<V>>
  write: Write<Result<void>, V>
}

function handleException(ex: unknown): Error {
  return ex instanceof Error ? ex : Error('Something went wrong')
}

export function createResolver<S extends ZodTypeAny>(schema: S) {
  type Value = z.infer<S>

  return (read: Read<unknown>, write: Write<void, Value>): Resolver<Value> => {
    return {
      async read(context) {
        try {
          const data = await read(context)
          schema.parse(data)

          return { data }
        } catch (ex) {
          return { error: handleException(ex) }
        }
      },
      async write(context, value) {
        'use server'

        try {
          await write(context, value)
          return { data: undefined }
        } catch (ex) {
          return { error: handleException(ex) }
        }
      },
    }
  }
}
