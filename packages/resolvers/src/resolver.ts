import { type Result, withResult } from '@byteslice/result'
import { ZodError, type ZodTypeAny, type z } from 'zod'

type Context = { key: string }

type Read<T> = (context: Context) => Promise<T>

type ReadFailure =
  | { type: 'CONTENT_INVALID'; error: Error }
  | { type: 'CONTENT_MISSING' }
  | { type: 'READ'; error: Error }

type Write<T, V> = (context: Context, value: V) => Promise<T>

export type Resolver<V> = {
  read: Read<Result<V, ReadFailure>>
  write: Write<Result<void>, V>
}

function formatValidationError(error: ZodError) {
  const message = [error.flatten().formErrors].join('; ')
  return new Error(message)
}

function validateContent(schema: ZodTypeAny, content: unknown) {
  return withResult<unknown, ReadFailure>(
    () => schema.parse(content),
    (error) => ({ type: 'CONTENT_INVALID', error }),
    {
      onException(ex) {
        if (ex instanceof ZodError) {
          return formatValidationError(ex)
        }

        return new Error('Unable to validate content.')
      },
    },
  )
}

export function createResolver<S extends ZodTypeAny>(schema: S) {
  type Value = z.infer<S>

  return (read: Read<unknown>, write: Write<void, Value>): Resolver<Value> => {
    return {
      async read(context) {
        const readResult = await withResult<unknown, ReadFailure>(
          () => read(context),
          (error) => ({ type: 'READ', error }),
        )
        if (readResult.failure) {
          return readResult
        }

        const { data } = readResult
        if (!data) {
          return { failure: { type: 'CONTENT_MISSING' } }
        }

        const parseResult = await validateContent(schema, data)
        if (parseResult.failure) {
          return parseResult
        }

        return { data }
      },
      async write(context, value) {
        const writeResult = await withResult<void>(
          () => write(context, value),
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
