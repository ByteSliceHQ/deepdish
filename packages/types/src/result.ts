type Success<T> = {
  failure?: never
  data: T
}

type Failure<T> = {
  failure: T
}

export type Result<S, F> = Success<S> | Failure<F>
