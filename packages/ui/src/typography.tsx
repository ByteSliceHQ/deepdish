type TypographyProps = {
  children?: string
}

const headings = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} as const

type HeadingProps = {
  level: keyof typeof headings
}

export function Heading(props: TypographyProps & HeadingProps) {
  const Element = headings[props.level]

  return <Element>{props.children}</Element>
}

export function Paragraph(props: TypographyProps) {
  return <p>{props.children}</p>
}
