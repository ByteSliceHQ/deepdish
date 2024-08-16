export type Context = {
  key: string
}

type Success<T> = {
  error?: never
  data: T
}

type Failure = {
  error: Error
}

export type Result<T> = Success<T> | Failure
