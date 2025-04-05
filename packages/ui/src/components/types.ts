import type { DeepDishProps } from '../deepdish'

export type Component<
  T extends keyof JSX.IntrinsicElements,
  V,
> = React.ComponentType<
  SetChildren<T, V> & {
    deepdish: DeepDishProps
  }
>

export type Render<T extends keyof JSX.IntrinsicElements, V> = (
  props: JSX.IntrinsicElements[T],
  value?: V,
) => Promise<React.ReactElement>

type SetChildren<T extends keyof JSX.IntrinsicElements, C> = Omit<
  JSX.IntrinsicElements[T],
  'children'
> & { children?: C }
