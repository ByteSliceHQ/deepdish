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

type HeadingProps = JSX.IntrinsicElements[HeadingType] & {
  level: HeadingLevel
}

export function Heading(props: HeadingProps) {
  // TODO: preferentially load from CMS
  const content = props.children

  const { level, ...rest } = props
  const Component = headings[level]

  return <Component {...rest}>{content}</Component>
}

type ParagraphProps = JSX.IntrinsicElements['p']

export function Paragraph(props: ParagraphProps) {
  // TODO: preferentially load from CMS
  const content = props.children

  return <p {...props}>{content}</p>
}
