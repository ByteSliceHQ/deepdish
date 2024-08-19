/// <reference types="react/experimental" />

import 'server-only'

import { type ValueType, getContract } from './config'
import type { DeepDishProps } from './types'

export async function DeepDish<V>(props: {
  deepdish?: DeepDishProps
  fallback?: V
  render(value?: V): React.ReactElement
  type: ValueType
}) {
  if (props.deepdish) {
    try {
      const contract = getContract(props.type)
      if (!contract) {
        throw Error(`Missing configuration for "${props.type}" contract`)
      }

      const { key } = props.deepdish
      const value = await contract.resolver.read({ key })
      if (value.error) {
        // TODO: handle "missing" or "invalid" data
        return
      }

      return props.render(value.data as V)
    } catch (ex) {
      // TODO: handle error
    }
  }

  return props.render(props.fallback)
}
