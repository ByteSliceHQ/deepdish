import type { Result } from '@deepdish/types/result'

type ResolverFailure =
  | { type: 'DATA_INVALID'; error: Error }
  | { type: 'DATA_MISSING' }
  | { type: 'READ'; error: Error }
  | { type: 'WRITE'; error: Error }

export type ResolverResult<T> = Result<T, ResolverFailure>

function handleException(ex: unknown): Error {
  return ex instanceof Error ? ex : Error('Something went wrong')
}

export async function withResult<T>(
  operation: T | Promise<T>,
  onException: (error: Error) => ResolverFailure,
): Promise<ResolverResult<T>> {
  try {
    return { data: await operation }
  } catch (ex) {
    return { failure: onException(handleException(ex)) }
  }
}
