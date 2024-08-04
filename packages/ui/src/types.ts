import type { Resolver } from '@deepdish/resolvers'

export type IntrinsicElement = keyof JSX.IntrinsicElements

type SetChildren<T, C> = Omit<T, 'children'> & { children?: C }

export type ElementProps<
  E extends IntrinsicElement,
  V,
  C = undefined,
> = SetChildren<JSX.IntrinsicElements[E], C> & {
  deepdish?: { key: string; resolver: Resolver<V> }
}
