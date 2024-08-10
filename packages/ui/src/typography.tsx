import 'server-only'

import { z } from 'zod'
import { DeepDish } from './deepdish'
import type { ElementProps, IntrinsicElement } from './types'

export const typographySchema = z.string()

export type TypographyValue = z.infer<typeof typographySchema>

type TypographyProps<E extends IntrinsicElement> = ElementProps<E, string>

export function BlockQuote(props: TypographyProps<'blockquote'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={(content) => {
        return <blockquote {...props}>{content}</blockquote>
      }}
      type="typography"
    />
  )
}

export function Bold(props: TypographyProps<'b'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={(content) => {
        return <b {...props}>{content}</b>
      }}
      type="typography"
    />
  )
}

export function Div(props: TypographyProps<'div'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={(content) => {
        return <div {...props}>{content}</div>
      }}
      type="typography"
    />
  )
}

export function Emphasize(props: TypographyProps<'em'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={(content) => {
        return <em {...props}>{content}</em>
      }}
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
  const Component = headings[level]

  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={(content) => {
        return <Component {...rest}>{content}</Component>
      }}
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
      render={(content) => {
        return <i {...props}>{content}</i>
      }}
      type="typography"
    />
  )
}

export function Paragraph(props: TypographyProps<'p'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={(content) => {
        return <p {...props}>{content}</p>
      }}
      type="typography"
    />
  )
}

export function Span(props: TypographyProps<'span'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={(content) => {
        return <span {...props}>{content}</span>
      }}
      type="typography"
    />
  )
}

export function Strong(props: TypographyProps<'strong'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={(content) => {
        return <strong {...props}>{content}</strong>
      }}
      type="typography"
    />
  )
}

export function Underline(props: TypographyProps<'u'>) {
  return (
    <DeepDish<TypographyValue>
      deepdish={props.deepdish}
      fallback={props.children}
      render={(content) => {
        return <u {...props}>{content}</u>
      }}
      type="typography"
    />
  )
}
