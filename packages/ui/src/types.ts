type Collection = string | string[]

export type DeepDishCollectionProps = {
  collection: Collection
}

export type DeepDishElementProps = {
  collection?: never
  key: string
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
