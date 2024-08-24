/// <reference types="react/experimental" />

import 'server-only'

import { type ValueType, getContract } from '@deepdish/config'
import type { DeepDishProps } from './types'

export async function DeepDish<V>(props: {
  deepdish?: DeepDishProps
  fallback?: V
  render(value?: V): Promise<React.ReactElement>
  type: ValueType
}) {
  if (!props.deepdish) {
    return props.render(props.fallback)
  }

  try {
    const { key } = props.deepdish
    const contract = getContract(props.type)

    const result = await contract.resolver.read({ key })
    if (result.failure) {
      // TODO: handle "missing" or "invalid" data
      return
    }

    return props.render(result.data as V)
  } catch (ex) {
    // TODO: handle error
  }
}
