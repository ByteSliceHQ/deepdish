type TypographyProps<T> = Omit<T, 'children'> & { children: string }

type ElementProps<T extends keyof JSX.IntrinsicElements> = TypographyProps<
  JSX.IntrinsicElements[T]
>

export function BlockQuote(props: ElementProps<'blockquote'>) {
  // TODO: preferentially load from CMS
  const content = props.children

  return <blockquote>{content}</blockquote>
}

export function Bold(props: ElementProps<'b'>) {
  // TODO: preferentially load from CMS
  const content = props.children

  return <b>{content}</b>
}

export function Div(props: ElementProps<'div'>) {
  // TODO: preferentially load from CMS
  const content = props.children

  return <div>{content}</div>
}

export function Emphasize(props: ElementProps<'em'>) {
  // TODO: preferentially load from CMS
  const content = props.children

  return <em>{content}</em>
}

const headings = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} as const

type HeadingLevel = keyof typeof headings

type HeadingType = (typeof headings)[HeadingLevel]

export function Heading(
  props: ElementProps<HeadingType> & { level: HeadingLevel },
) {
  // TODO: preferentially load from CMS
  const content = props.children

  const { level, ...rest } = props
  const Component = headings[level]

  return <Component {...rest}>{content}</Component>
}

export function Heading1(props: ElementProps<'h1'>) {
  return <Heading level={1} {...props} />
}

export function Heading2(props: ElementProps<'h2'>) {
  return <Heading level={2} {...props} />
}

export function Heading3(props: ElementProps<'h3'>) {
  return <Heading level={3} {...props} />
}

export function Heading4(props: ElementProps<'h4'>) {
  return <Heading level={4} {...props} />
}

export function Heading5(props: ElementProps<'h5'>) {
  return <Heading level={5} {...props} />
}

export function Heading6(props: ElementProps<'h6'>) {
  return <Heading level={6} {...props} />
}

export function Italicize(props: ElementProps<'i'>) {
  // TODO: preferentially load from CMS
  const content = props.children

  return <i>{content}</i>
}

export function Paragraph(props: ElementProps<'p'>) {
  // TODO: preferentially load from CMS
  const content = props.children

  return <p {...props}>{content}</p>
}

export function Span(props: ElementProps<'span'>) {
  // TODO: preferentially load from CMS
  const content = props.children

  return <span>{content}</span>
}

export function Strong(props: ElementProps<'strong'>) {
  // TODO: preferentially load from CMS
  const content = props.children

  return <strong>{content}</strong>
}

export function Underline(props: ElementProps<'u'>) {
  // TODO: preferentially load from CMS
  const content = props.children

  return <u>{content}</u>
}
