import 'server-only'

import { type ValueMap, getConfig } from './config'
import type { DeepDishProps } from './types'

export async function DeepDish<V>(props: {
  deepdish?: DeepDishProps
  fallback?: V
  render: (value?: V) => React.ReactElement
  type: keyof ValueMap
}) {
  if (props.deepdish) {
    try {
      const config = getConfig()[props.type]
      if (!config) {
        throw Error(`Missing component configuration: ${props.type}`)
      }

      const { key } = props.deepdish
      const value = await config.resolver.read({ key })
      if (value) {
        return props.render(value as V)
      }

      // TODO: handle "missing" data
    } catch (err) {
      // TODO: handle error
    }
  }

  return props.render(props.fallback)
}

export async function Collection<V>(props: {
  deepdish?: Omit<DeepDishProps<V>, 'key'>
  render: (value?: V) => React.ReactElement
}) {
  if (props.deepdish) {
    try {
      const { resolver } = props.deepdish
      const keys = await resolver.list()

      return (
        <>
          {keys.map(async (key) => {
            return (
              <DeepDish
                key={key.key}
                deepdish={{
                  key: key.key,
                  resolver,
                }}
                render={props.render}
              />
            )
          })}
        </>
      )
    } catch (err) {
      // TODO: handle error
    }
  }

  return null
}
