type IntrinsicElement = keyof JSX.IntrinsicElements

type ElementProps<T extends IntrinsicElement> = JSX.IntrinsicElements[T]
