/// <reference types="react/experimental" />

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
      if (value.error) {
        // TODO: handle "missing" or "invalid" data
        return
      }

      return props.render(value.data as V)
    } catch (err) {
      // TODO: handle error
    }
  }

  return props.render(props.fallback)
}
