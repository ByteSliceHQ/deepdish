import { type Result, withResult } from '@byteslice/result'
import DataLoader, { type BatchLoadFn } from 'dataloader'
import { ZodError, type ZodTypeAny, type z } from 'zod'

type Context = { key: string }

type ReadFailure =
  | { type: 'CONTENT_INVALID'; error: Error }
  | { type: 'CONTENT_MISSING' }
  | { type: 'READ'; error: Error }

export type Resolver<V> = {
  read: (ctx: Context) => Promise<Result<V, ReadFailure>>
  write: (ctx: Context, value: V) => Promise<Result<void>>
}

export type ResolverOptions = {
  maxBatchSize?: number
}

function formatValidationError(error: ZodError) {
  const message = [error.flatten().formErrors].join('; ')
  return new Error(message, { cause: error })
}

function validateContent<S extends ZodTypeAny>(schema: S, content: unknown) {
  return withResult<unknown, ReadFailure>(
    () => schema.parse(content),
    (error) => ({ type: 'CONTENT_INVALID', error }),
    {
      onException(ex) {
        if (ex instanceof ZodError) {
          return formatValidationError(ex)
        }

        return new Error('Unable to validate content.', { cause: ex })
      },
    },
  )
}

export function createResolver<S extends ZodTypeAny>(
  schema: S,
  options?: ResolverOptions,
) {
  type Key = string
  type Value = z.infer<S>

  return (
    loadValues: BatchLoadFn<Key, unknown>,
    updateValue: (key: Key, value: Value) => Promise<void>,
  ): Resolver<Value> => {
    const loader = new DataLoader(loadValues, {
      maxBatchSize: options?.maxBatchSize,
    })

    return {
      async read(ctx) {
        const readResult = await withResult<unknown, ReadFailure>(
          () => loader.load(ctx.key),
          (error) => ({ type: 'READ', error }),
        )
        if (readResult.failure) {
          return readResult
        }

        const content = readResult.data
        if (!content) {
          return { failure: { type: 'CONTENT_MISSING' } }
        }

        const validateResult = await validateContent(schema, content)
        if (validateResult.failure) {
          return validateResult
        }

        return { data: content }
      },
      async write(ctx, value) {
        const writeResult = await withResult<void>(
          async () => {
            await updateValue(ctx.key, value)
            loader.clear(ctx.key)
          },
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
