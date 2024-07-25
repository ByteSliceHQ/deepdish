export type IntrinsicElement = keyof JSX.IntrinsicElements

export type ElementProps<T extends IntrinsicElement> = JSX.IntrinsicElements[T]
