import type { ZodTypeAny, z } from 'zod'
import { type ResolverResult, withResult } from './result'

type Context = { key: string }

type Read<T> = (context: Context) => Promise<T>

type Write<T, V> = (context: Context, value: V) => Promise<T>

export type Resolver<V> = {
  read: Read<ResolverResult<V>>
  write: Write<ResolverResult<void>, V>
}

export function createResolver<S extends ZodTypeAny>(schema: S) {
  type Value = z.infer<S>

  return (read: Read<unknown>, write: Write<void, Value>): Resolver<Value> => {
    return {
      async read(context) {
        const readResult = await withResult(read(context), (error) => {
          return { type: 'READ', error }
        })
        if (readResult.failure) {
          return readResult
        }

        const { data } = readResult
        if (!data) {
          return { failure: { type: 'DATA_MISSING' } }
        }

        const parseResult = await withResult(schema.parse(data), (error) => {
          return { type: 'DATA_INVALID', error }
        })
        if (parseResult.failure) {
          return parseResult
        }

        return { data }
      },
      async write(context, value) {
        'use server'

        const writeResult = await withResult(write(context, value), (error) => {
          return { type: 'WRITE', error }
        })
        if (writeResult.failure) {
          return writeResult
        }

        return { data: undefined }
      },
    }
  }
}
