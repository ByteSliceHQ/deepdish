import 'server-only'

import type { TypographyValue } from '@deepdish/config/schemas'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import rehypeParse from 'rehype-parse'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { DeepDish } from './deepdish'
import type { ElementProps, IntrinsicElement } from './types'

type ContentFormat = 'plain' | 'markdown' | 'html'

type TypographyProps<E extends IntrinsicElement> = ElementProps<E, string> & {
  format?: ContentFormat
}

function renderWithFormat<E extends IntrinsicElement>(
  props: TypographyProps<E>,
  Element: React.ElementType,
) {
  return async (content: string) => {
    const { format, children, ...rest } = props

    if (format === 'html') {
      const output = await unified()
        .use(rehypeParse)
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .process(content)

      return (
        <Element
          // biome-ignore lint/security/noDangerouslySetInnerHtml: setting the inner HTML here is required
          dangerouslySetInnerHTML={{ __html: output.toString() }}
          {...rest}
        />
      )
    }

    if (format === 'markdown') {
      const output = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .process(content)

      return (
        <Element
          // biome-ignore lint/security/noDangerouslySetInnerHtml: setting the inner HTML here is required
          dangerouslySetInnerHTML={{ __html: output.toString() }}
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
      render={renderWithFormat(props, 'blockquote')}
      type="typography"
    />
  )
}

export function Bold(props: TypographyProps<'b'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={renderWithFormat(props, 'b')}
      type="typography"
    />
  )
}

export function Div(props: TypographyProps<'div'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={renderWithFormat(props, 'div')}
      type="typography"
    />
  )
}

export function Emphasize(props: TypographyProps<'em'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={renderWithFormat(props, 'em')}
      type="typography"
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
      render={renderWithFormat(rest, headings[level])}
      type="typography"
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
      render={renderWithFormat(props, 'i')}
      type="typography"
    />
  )
}

// TODO: with format HTML, don't pass in childen
export function Paragraph(props: TypographyProps<'p'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={renderWithFormat(props, 'p')}
      type="typography"
    />
  )
}

export function Span(props: TypographyProps<'span'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={renderWithFormat(props, 'span')}
      type="typography"
    />
  )
}

export function Strong(props: TypographyProps<'strong'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={renderWithFormat(props, 'strong')}
      type="typography"
    />
  )
}

export function Underline(props: TypographyProps<'u'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={renderWithFormat(props, 'u')}
      type="typography"
    />
  )
}
