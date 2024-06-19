// TODO: support all relevant HTML elements for typography
type TypographyElements = {
  p: HTMLParagraphElement
  h1: HTMLHeadingElement
  h2: HTMLHeadingElement
  h3: HTMLHeadingElement
  h4: HTMLHeadingElement
  pre: HTMLPreElement
}

// TODO: support all necessary typography props
type TextProps = Readonly<{
  as?: keyof TypographyElements
  className?: string
  children: React.ReactNode
}>

export function Text(props: TextProps) {
  const Component = props.as || 'p'

  return <Component className={props.className}>{props.children}</Component>
}

export function Paragraph(props: Omit<TextProps, 'as'>) {
  return <Text as="p" {...props} />
}

export function Heading1(props: Omit<TextProps, 'as'>) {
  return <Text as="h1" {...props} />
}

export function Heading2(props: Omit<TextProps, 'as'>) {
  return <Text as="h2" {...props} />
}

export function Heading3(props: Omit<TextProps, 'as'>) {
  return <Text as="h3" {...props} />
}

export function Heading4(props: Omit<TextProps, 'as'>) {
  return <Text as="h4" {...props} />
}

export function Code(props: Omit<TextProps, 'as'>) {
  return <Text as="pre" {...props} />
}
