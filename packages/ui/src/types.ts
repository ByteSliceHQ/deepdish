import type { Resolver } from '@deepdish/resolvers'

export type IntrinsicElement = keyof JSX.IntrinsicElements

type SetChildren<T, C> = Omit<T, 'children'> & { children?: C }

export type DeepDishProps<V> = { key: string; resolver: Resolver<V> }

export type ElementProps<
  E extends IntrinsicElement,
  V,
  C = undefined,
> = SetChildren<JSX.IntrinsicElements[E], C> & {
  deepdish?: DeepDishProps<V>
}
