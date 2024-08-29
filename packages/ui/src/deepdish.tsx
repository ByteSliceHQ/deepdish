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
    const contractResult = getContract(props.type)
    if (contractResult.failure) {
      return props.render(props.fallback)
    }

    const { resolver } = contractResult.data
    const result = await resolver.read({
      key: props.deepdish.key,
    })
    if (result.failure) {
      switch (result.failure.type) {
        case 'DATA_MISSING':
          // TODO: handle missing data
          break
        case 'DATA_INVALID':
          // TODO: handle invalid data
          break
      }
      return props.render(props.fallback)
    }

    return props.render(result.data as V)
  } catch (ex) {
    // TODO: handle exception
  }
}
