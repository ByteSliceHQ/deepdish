/// <reference types="react/experimental" />

import 'server-only'

import { getContract } from '@deepdish/config'
import type { ValueType } from '@deepdish/config/schemas'
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

  const contractResult = getContract(props.type)
  if (contractResult.failure) {
    return props.render(props.fallback)
  }

  const { resolver } = contractResult.data
  const readResult = await resolver.read({
    key: props.deepdish.key,
  })
  if (readResult.failure) {
    switch (readResult.failure.type) {
      case 'DATA_MISSING':
        // TODO: handle missing data
        break
      case 'DATA_INVALID':
        // TODO: handle invalid data
        break
    }
    return props.render(props.fallback)
  }

  return props.render(readResult.data as V)
}
