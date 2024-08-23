export type Context = {
  key: string
}

type Success<T> = {
  error?: never
  data: T
}

type ResolverError =
  | { type: 'UNKNOWN'; error: Error }
  | { type: 'DATA_MISSING' }
  | { type: 'DATA_INVALID'; error: Error }
  | { type: 'READ'; error: Error }
  | { type: 'WRITE'; error: Error }

type Failure = {
  error: ResolverError
}

export type Result<T> = Success<T> | Failure
