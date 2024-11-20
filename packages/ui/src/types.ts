// TODO: keys should be optional and should support filtering
export type DeepDishCollectionProps = {
  keys: string[]
}

export type DeepDishElementProps = {
  key: string
}

export type DeepDishProps = {
  key?: string
  keys?: string[]
}

export type ElementProps<
  E extends IntrinsicElement,
  C = undefined,
> = SetChildren<JSX.IntrinsicElements[E], C> & {
  deepdish?: DeepDishProps
}

export type IntrinsicElement = keyof JSX.IntrinsicElements

type SetChildren<T, C> = Omit<T, 'children'> & { children?: C }
