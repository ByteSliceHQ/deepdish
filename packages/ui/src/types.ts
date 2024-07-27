import type { Resolver } from '@deepdish/resolvers'

export type IntrinsicElement = keyof JSX.IntrinsicElements

type ElementProps<E extends IntrinsicElement> = JSX.IntrinsicElements[E]

type SetChildren<T, C> = Omit<T, 'children'> & { children?: C }

export type DeepDishProp<V> = {
  key: string
  resolver: Resolver<V>
}

export type DeepDish<
  E extends IntrinsicElement,
  V,
  C = undefined,
> = SetChildren<ElementProps<E>, C> & { deepdish?: DeepDishProp<V> }
