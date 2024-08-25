import type { Result } from '@deepdish/types/result'

export type Context = {
  key: string
}

type ResolverFailure =
  | { type: 'UNEXPECTED'; cause: Error }
  | { type: 'DATA_MISSING' }
  | { type: 'DATA_INVALID'; cause: Error }
  | { type: 'READ'; cause: Error }
  | { type: 'WRITE'; cause: Error }

export type ResolverResult<T> = Result<T, ResolverFailure>
