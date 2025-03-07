import 'server-only'

import { type ContentFormat, sanitizeContent } from '../content'
import { DeepDish } from '../deepdish'
import type { TypographyValue } from '../schemas'
import type { ElementProps, IntrinsicElement } from '../types'

type TypographyProps<E extends IntrinsicElement> = ElementProps<E, string> & {
  format?: ContentFormat
}

function renderWithFormatting<E extends IntrinsicElement>(
  props: TypographyProps<E>,
  Element: React.ElementType,
) {
  return async (content: TypographyValue) => {
    const { children, deepdish, format, ...rest } = props

    if (format === 'html' || format === 'markdown') {
      const sanitizedContent = await sanitizeContent(content, format)

      return (
        <Element
          // biome-ignore lint/security/noDangerouslySetInnerHtml: setting the inner HTML here is required
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          {...rest}
        />
      )
    }

    return <Element {...rest}>{content}</Element>
  }
}

export function BlockQuote(props: TypographyProps<'blockquote'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={renderWithFormatting(props, 'blockquote')}
    />
  )
}

export function Bold(props: TypographyProps<'b'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={renderWithFormatting(props, 'b')}
    />
  )
}

export function Div(props: TypographyProps<'div'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={renderWithFormatting(props, 'div')}
    />
  )
}

export function Emphasize(props: TypographyProps<'em'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={renderWithFormatting(props, 'em')}
    />
  )
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
  props: TypographyProps<HeadingType> & { level: HeadingLevel },
) {
  const { level, ...rest } = props

  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={renderWithFormatting(rest, headings[level])}
    />
  )
}

export function Heading1(props: TypographyProps<'h1'>) {
  return <Heading level={1} {...props} />
}

export function Heading2(props: TypographyProps<'h2'>) {
  return <Heading level={2} {...props} />
}

export function Heading3(props: TypographyProps<'h3'>) {
  return <Heading level={3} {...props} />
}

export function Heading4(props: TypographyProps<'h4'>) {
  return <Heading level={4} {...props} />
}

export function Heading5(props: TypographyProps<'h5'>) {
  return <Heading level={5} {...props} />
}

export function Heading6(props: TypographyProps<'h6'>) {
  return <Heading level={6} {...props} />
}

export function Italicize(props: TypographyProps<'i'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={renderWithFormatting(props, 'i')}
    />
  )
}

export function Paragraph(props: TypographyProps<'p'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={renderWithFormatting(props, 'p')}
    />
  )
}

export function Span(props: TypographyProps<'span'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={renderWithFormatting(props, 'span')}
    />
  )
}

export function Strong(props: TypographyProps<'strong'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={renderWithFormatting(props, 'strong')}
    />
  )
}

export function Underline(props: TypographyProps<'u'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={renderWithFormatting(props, 'u')}
    />
  )
}
