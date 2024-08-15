/// <reference types="react/experimental" />
import 'server-only'

import { type ValueMap, getConfig } from './config'
import type { DeepDishProps } from './types'

export async function DeepDish<V>(props: {
  deepdish?: DeepDishProps
  fallback?: V
  render: (value?: V) => React.ReactNode
  type: keyof ValueMap
}) {
  if (props.deepdish) {
    try {
      const config = getConfig()[props.type]
      if (!config) {
        throw Error(`Missing component configuration: ${props.type}`)
      }

      const { key } = props.deepdish

      if (!key) {
        const keys = await config.resolver.list()

        const filteredKeys = props.deepdish.filter
          ? keys.filter(props.deepdish.filter)
          : keys

        return (
          <>
            {filteredKeys.map(async (key) => {
              const value = await config.resolver.read({ key })

              if (value) {
                return props.render(value as V)
              }
            })}
          </>
        )
      }

      const value = await config.resolver.read({ key })

      if (value) {
        return <>{props.render(value as V)}</>
      }

      // TODO: handle "missing" data
    } catch (err) {
      // TODO: handle error
    }
  }

  return <>{props.render(props.fallback)}</>
}
