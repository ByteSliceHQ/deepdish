export type IntrinsicElement = keyof JSX.IntrinsicElements

export type ElementProps<T extends IntrinsicElement> = JSX.IntrinsicElements[T]

export type SetChildren<T, V> = Omit<T, 'children'> & { children?: V }
