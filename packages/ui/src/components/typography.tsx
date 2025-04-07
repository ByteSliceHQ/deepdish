import { type Value, schema } from '@deepdish/core/schema'
import { createContractComponent } from './components'
import type { Component, Render } from './types'

const typography = {
  namespace: 'typography',
  schema: schema((v) => v.string()),
} as const

type TypographySchema = typeof typography.schema

type TypographyValue = Value<TypographySchema>

function createTypographyComponent(
  Component: ReturnType<typeof createContractComponent<TypographySchema>>,
) {
  return function componentFactory<T extends keyof JSX.IntrinsicElements>(
    render: Render<T, TypographyValue>,
  ): Component<T, TypographyValue> {
    return function TypographyComponent(props) {
      return (
        <Component
          deepdish={props.deepdish}
          fallback={props.children}
          render={render.bind(null, props)}
        />
      )
    }
  }
}

export function createTypographyComponents() {
  const createComponent = createTypographyComponent(
    createContractComponent(typography.schema, typography.namespace),
  )

  return {
    Bold: createComponent<'b'>(async (props, value) => {
      return <b {...props}>{value}</b>
    }),
    Code: createComponent<'code'>(async (props, value) => {
      return <code {...props}>{value}</code>
    }),
    Emphasis: createComponent<'em'>(async (props, value) => {
      return <em {...props}>{value}</em>
    }),
    Heading1: createComponent<'h1'>(async (props, value) => {
      return <h1 {...props}>{value}</h1>
    }),
    Heading2: createComponent<'h2'>(async (props, value) => {
      return <h2 {...props}>{value}</h2>
    }),
    Heading3: createComponent<'h3'>(async (props, value) => {
      return <h3 {...props}>{value}</h3>
    }),
    Heading4: createComponent<'h4'>(async (props, value) => {
      return <h4 {...props}>{value}</h4>
    }),
    Heading5: createComponent<'h5'>(async (props, value) => {
      return <h5 {...props}>{value}</h5>
    }),
    Heading6: createComponent<'h6'>(async (props, value) => {
      return <h6 {...props}>{value}</h6>
    }),
    Italic: createComponent<'i'>(async (props, value) => {
      return <i {...props}>{value}</i>
    }),
    Paragraph: createComponent<'p'>(async (props, value) => {
      return <p {...props}>{value}</p>
    }),
    Small: createComponent<'small'>(async (props, value) => {
      return <small {...props}>{value}</small>
    }),
    Strikethrough: createComponent<'s'>(async (props, value) => {
      return <s {...props}>{value}</s>
    }),
    Strong: createComponent<'strong'>(async (props, value) => {
      return <strong {...props}>{value}</strong>
    }),
    Underline: createComponent<'u'>(async (props, value) => {
      return <u {...props}>{value}</u>
    }),
  }
}
