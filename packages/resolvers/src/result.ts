import type { Result } from '@deepdish/types/result'

type ResolverFailure =
  | { type: 'UNEXPECTED'; cause: Error }
  | { type: 'DATA_MISSING' }
  | { type: 'DATA_INVALID'; cause: Error }
  | { type: 'READ'; cause: Error }
  | { type: 'WRITE'; cause: Error }

export type ResolverResult<T> = Result<T, ResolverFailure>

export function handleException(ex: unknown): Error {
  return ex instanceof Error ? ex : Error('Something went wrong')
}

export async function withResult<T>(
  input: T | Promise<T>,
  type: ResolverFailure['type'],
): Promise<ResolverResult<T>> {
  try {
    return {
      data: await input,
    }
  } catch (ex) {
    return {
      failure: {
        type,
        cause: handleException(ex),
      },
    }
  }
}
