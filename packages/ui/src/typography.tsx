type TypographyProps = {
  children?: string
  className?: string
}

const headings = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} as const

type Headings = typeof headings

type HeadingProps = {
  level: keyof Headings
}

type TextProps = {
  Component: 'p' | Headings[keyof Headings]
}

export function Heading(props: TypographyProps & HeadingProps) {
  const { level, ...rest } = props
  return <Text Component={headings[level]} {...rest} />
}

export function Paragraph(props: TypographyProps) {
  return <Text Component={'p'} {...props} />
}

function Text(props: TypographyProps & TextProps) {
  const { Component } = props
  return <Component className={props.className}>{props.children}</Component>
}
