import { type Result, withResult } from '@byteslice/result'
import type { ZodTypeAny, z } from 'zod'

type Context = { key: string }

type Read<T> = (context: Context) => Promise<T>

type Write<T, V> = (context: Context, value: V) => Promise<T>

type ResolverFailure =
  | { type: 'DATA_INVALID'; error: Error }
  | { type: 'DATA_MISSING' }
  | { type: 'READ'; error: Error }
  | { type: 'WRITE'; error: Error }

export type Resolver<V> = {
  read: Read<Result<V, ResolverFailure>>
  write: Write<Result<void, ResolverFailure>, V>
}

export function createResolver<S extends ZodTypeAny>(schema: S) {
  type Value = z.infer<S>

  return (read: Read<unknown>, write: Write<void, Value>): Resolver<Value> => {
    return {
      async read(context) {
        const readResult = await withResult<unknown, ResolverFailure>(
          read(context),
          (error) => ({ type: 'READ', error }),
        )
        if (readResult.failure) {
          return readResult
        }

        const { data } = readResult
        if (!data) {
          return { failure: { type: 'DATA_MISSING' } }
        }

        const parseResult = await withResult<unknown, ResolverFailure>(
          schema.parse(data),
          (error) => ({ type: 'DATA_INVALID', error }),
        )
        if (parseResult.failure) {
          return parseResult
        }

        return { data }
      },
      async write(context, value) {
        const writeResult = await withResult<void, ResolverFailure>(
          write(context, value),
          (error) => ({ type: 'WRITE', error }),
        )

        if (writeResult.failure) {
          return writeResult
        }

        return { data: undefined }
      },
    }
  }
}
