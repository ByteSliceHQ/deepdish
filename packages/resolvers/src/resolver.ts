import type { ZodTypeAny, z } from 'zod'
import type { ResolverResult } from './result'

type Context = { key: string }

type Read<T> = (context: Context) => Promise<T>

type Write<T, V> = (context: Context, value: V) => Promise<T>

export type Resolver<V> = {
  read: Read<ResolverResult<V>>
  write: Write<ResolverResult<void>, V>
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
          return {
            failure: {
              type: 'UNEXPECTED',
              cause: handleException(ex),
            },
          }
        }
      },
      async write(context, value) {
        'use server'

        try {
          await write(context, value)
          return { data: undefined }
        } catch (ex) {
          return {
            failure: {
              type: 'UNEXPECTED',
              cause: handleException(ex),
            },
          }
        }
      },
    }
  }
}
