import 'server-only'

import { type ConfigType, getConfig } from './config'
import type { DeepDishProps } from './types'

export async function DeepDish<V>(props: {
  deepdish?: DeepDishProps
  fallback?: V
  render: (value?: V) => React.ReactElement
  type: ConfigType
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
