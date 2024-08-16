export type DeepDishProps = {
  key: string
}

export type ElementProps<
  E extends IntrinsicElement,
  C = undefined,
> = SetChildren<JSX.IntrinsicElements[E], C> & {
  deepdish?: DeepDishProps
}

export type IntrinsicElement = keyof JSX.IntrinsicElements

export type Maybe<T> = NonNullable<T> | undefined

type SetChildren<T, C> = Omit<T, 'children'> & { children?: C }
