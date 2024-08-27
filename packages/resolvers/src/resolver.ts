import type { ZodTypeAny, z } from 'zod'
import { type ResolverResult, handleException, withResult } from './result'

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
        try {
          const readResult = await withResult(read(context), 'READ')
          if (readResult.failure) {
            return readResult
          }

          const { data } = readResult
          if (!data) {
            return { failure: { type: 'DATA_MISSING' } }
          }

          const parseResult = await withResult(
            schema.parse(data),
            'DATA_INVALID',
          )
          if (parseResult.failure) {
            return parseResult
          }

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
          const writeResult = await withResult(write(context, value), 'WRITE')
          if (writeResult.failure) {
            return writeResult
          }

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
