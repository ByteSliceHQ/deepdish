import { type Result, withResult } from '@byteslice/result'
import DataLoader, { type BatchLoadFn } from 'dataloader'
import { ZodError, type ZodTypeAny, type z } from 'zod'

export type Key = string

export type Context = { key: Key; headers?: Headers }

type ReadFailure =
  | { type: 'CONTENT_INVALID'; error: Error }
  | { type: 'CONTENT_MISSING' }
  | { type: 'READ'; error: Error }

type KeysFailure = { type: 'UNSUPPORTED' } | { type: 'KEYS'; error: Error }

export type Resolver<V> = {
  keys: (pattern: string) => Promise<Result<Key[], KeysFailure>>
  read: (ctx: Context) => Promise<Result<V, ReadFailure>>
  write: (ctx: Context, value: V) => Promise<Result<void>>
}

export type ResolverOptions = {
  /** If defined, derives a new key from the context that's used before reading and writing. */
  deriveKey?: (ctx: Context) => Promise<string>
  maxBatchSize?: number
}

function handleValidationException(ex: unknown) {
  if (ex instanceof ZodError) {
    const message = [ex.flatten().formErrors].join('; ')
    return new Error(message, { cause: ex })
  }

  return new Error('Unable to validate content.', { cause: ex })
}

export function createResolver<S extends ZodTypeAny>(
  schema: S,
  options?: ResolverOptions,
) {
  type Value = z.infer<S>

  return (
    loadValues: BatchLoadFn<Key, unknown>,
    updateValue: (key: Key, value: Value) => Promise<void>,
    listKeys?: (pattern: string) => Promise<Key[]>,
  ): Resolver<Value> => {
    const loader = new DataLoader(loadValues, {
      maxBatchSize: options?.maxBatchSize,
    })

    return {
      async keys(pattern) {
        if (!listKeys) {
          return { failure: { type: 'UNSUPPORTED' } }
        }

        const keysResult = await withResult<Key[], KeysFailure>(
          () => listKeys(pattern),
          (error) => ({ type: 'KEYS', error }),
        )

        return keysResult
      },
      async read(ctx) {
        const key = options?.deriveKey ? await options.deriveKey(ctx) : ctx.key

        const readResult = await withResult<unknown, ReadFailure>(
          () => loader.load(key),
          (error) => ({ type: 'READ', error }),
        )
        if (readResult.failure) {
          return readResult
        }

        const content = readResult.data
        if (!content) {
          return { failure: { type: 'CONTENT_MISSING' } }
        }

        const validateResult = await withResult<unknown, ReadFailure>(
          () => schema.parse(content),
          (error) => ({ type: 'CONTENT_INVALID', error }),
          { onException: handleValidationException },
        )
        if (validateResult.failure) {
          return validateResult
        }

        return { data: content }
      },
      async write(ctx, value) {
        const key = options?.deriveKey ? await options.deriveKey(ctx) : ctx.key

        const writeResult = await withResult<void>(
          async () => {
            await updateValue(key, value)
            loader.clear(key)
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
