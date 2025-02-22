type Key = string

type Contract = string

type Pattern = string

type Collection = Pattern | Key[]

export type DeepDishCollectionProps = {
  collection: Collection
  contract: Contract
}

export type DeepDishElementProps = {
  collection?: never
  contract: Contract
  key: Key
}

export type DeepDishProps = DeepDishElementProps | DeepDishCollectionProps

export type ElementProps<
  E extends IntrinsicElement,
  C = undefined,
> = SetChildren<JSX.IntrinsicElements[E], C> & {
  deepdish?: DeepDishProps
}

export type IntrinsicElement = keyof JSX.IntrinsicElements

type SetChildren<T, C> = Omit<T, 'children'> & { children?: C }
