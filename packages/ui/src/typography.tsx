type TypographyProps<T> = Omit<T, 'children'> & { children: string }

type BlockQuoteProps = TypographyProps<JSX.IntrinsicElements['blockquote']>

export function BlockQuote(props: BlockQuoteProps) {
  // TODO: preferentially load from CMS
  const content = props.children

  return <blockquote>{content}</blockquote>
}

type BoldProps = TypographyProps<JSX.IntrinsicElements['b']>

export function Bold(props: BoldProps) {
  // TODO: preferentially load from CMS
  const content = props.children

  return <b>{content}</b>
}

type DivProps = TypographyProps<JSX.IntrinsicElements['div']>

export function Div(props: DivProps) {
  // TODO: preferentially load from CMS
  const content = props.children

  return <div>{content}</div>
}

type EmphasizeProps = TypographyProps<JSX.IntrinsicElements['em']>

export function Emphasize(props: EmphasizeProps) {
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

type HeadingProps = TypographyProps<JSX.IntrinsicElements[HeadingType]>

export function Heading(props: HeadingProps & { level: HeadingLevel }) {
  // TODO: preferentially load from CMS
  const content = props.children

  const { level, ...rest } = props
  const Component = headings[level]

  return <Component {...rest}>{content}</Component>
}

export function Heading1(props: HeadingProps) {
  return <Heading level={1} {...props} />
}

export function Heading2(props: HeadingProps) {
  return <Heading level={2} {...props} />
}

export function Heading3(props: HeadingProps) {
  return <Heading level={3} {...props} />
}

export function Heading4(props: HeadingProps) {
  return <Heading level={4} {...props} />
}

export function Heading5(props: HeadingProps) {
  return <Heading level={5} {...props} />
}

export function Heading6(props: HeadingProps) {
  return <Heading level={6} {...props} />
}

type ItalicizeProps = TypographyProps<JSX.IntrinsicElements['i']>

export function Italicize(props: ItalicizeProps) {
  // TODO: preferentially load from CMS
  const content = props.children

  return <i>{content}</i>
}

type ParagraphProps = TypographyProps<JSX.IntrinsicElements['p']>

export function Paragraph(props: ParagraphProps) {
  // TODO: preferentially load from CMS
  const content = props.children

  return <p {...props}>{content}</p>
}

type SpanProps = TypographyProps<JSX.IntrinsicElements['span']>

export function Span(props: SpanProps) {
  // TODO: preferentially load from CMS
  const content = props.children

  return <span>{content}</span>
}

type StrongProps = TypographyProps<JSX.IntrinsicElements['strong']>

export function Strong(props: StrongProps) {
  // TODO: preferentially load from CMS
  const content = props.children

  return <strong>{content}</strong>
}

type UnderlineProps = TypographyProps<JSX.IntrinsicElements['u']>

export function Underline(props: UnderlineProps) {
  // TODO: preferentially load from CMS
  const content = props.children

  return <u>{content}</u>
}
