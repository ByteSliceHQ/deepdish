import { type Result, withResult } from '@byteslice/result'
import type { ZodTypeAny, z } from 'zod'

type Context = { key: string }

type Read<T> = (context: Context) => Promise<T>

type ReadFailure =
  | { type: 'DATA_INVALID'; error: Error }
  | { type: 'DATA_MISSING' }
  | { type: 'READ'; error: Error }

type Write<T, V> = (context: Context, value: V) => Promise<T>

export type Resolver<V> = {
  read: Read<Result<V, ReadFailure>>
  write: Write<Result<void>, V>
}

export function createResolver<S extends ZodTypeAny>(schema: S) {
  type Value = z.infer<S>

  return (read: Read<unknown>, write: Write<void, Value>): Resolver<Value> => {
    return {
      async read(context) {
        const readResult = await withResult<unknown, ReadFailure>(
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

        const parseResult = await withResult<unknown, ReadFailure>(
          schema.parse(data),
          (error) => ({ type: 'DATA_INVALID', error }),
        )
        if (parseResult.failure) {
          return parseResult
        }

        return { data }
      },
      async write(context, value) {
        const writeResult = await withResult<void>(
          write(context, value),
          (error) => error,
        )

        if (writeResult.failure) {
          return writeResult
        }

        return { data: undefined }
      },
    }
  }
}
