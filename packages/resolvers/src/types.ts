export type Context = {
  key: string
}

export type Maybe<T> = NonNullable<T> | undefined

type Success<T> = {
  error?: never
  data: T
}

type Failure = {
  error: Error
}

export type Result<T> = Success<T> | Failure
