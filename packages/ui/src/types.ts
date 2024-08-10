export type DeepDishProps = { key: string }

export type ElementProps<
  E extends IntrinsicElement,
  C = undefined,
> = SetChildren<JSX.IntrinsicElements[E], C> & {
  deepdish?: DeepDishProps
}

export type ElementType = 'audio' | 'image' | 'link' | 'typography' | 'video'

export type IntrinsicElement = keyof JSX.IntrinsicElements

type SetChildren<T, C> = Omit<T, 'children'> & { children?: C }
