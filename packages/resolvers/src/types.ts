export type Context = {
  key: string
}

type Success<T> = {
  failure?: never
  data: T
}

type Failure<T> = {
  failure: T
}

type ResolverFailure =
  | { type: 'UNEXPECTED'; cause: Error }
  | { type: 'DATA_MISSING' }
  | { type: 'DATA_INVALID'; cause: Error }
  | { type: 'READ'; cause: Error }
  | { type: 'WRITE'; cause: Error }

export type Result<T> = Success<T> | Failure<ResolverFailure>
