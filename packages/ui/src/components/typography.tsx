import { type Value, schema } from '@deepdish/core/schema'
import type { createContractComponent } from './components'
import type { Component, Render } from './types'

const typography = {
  namespace: 'typography',
  schema: schema((v) => v.string()),
} as const

type TypographySchema = typeof typography.schema

type TypographyValue = Value<TypographySchema>

function createTypographyComponent<T extends keyof JSX.IntrinsicElements>(
  Component: ReturnType<typeof createContractComponent<TypographySchema>>,
) {
  return function componentFactory(
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
