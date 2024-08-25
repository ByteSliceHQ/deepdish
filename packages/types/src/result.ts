type Success<T> = {
  failure?: never
  data: T
}

type FailureCase = {
  type: string
}

type Failure<T extends FailureCase> = {
  failure: T
}

export type Result<S, F extends FailureCase> = Success<S> | Failure<F>
