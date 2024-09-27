/// <reference types="react/experimental" />

import 'server-only'

import type { ValueType } from '@deepdish/config/schemas'
import { getLogger } from '@logtape/logtape'
import { configure, getContract, getDraft } from './config'
import type { DeepDishProps } from './types'

const logger = getLogger(['deepdish', 'ui'])

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
  const { key } = props.deepdish
  const readResult = await resolver.read({ key })

  if (readResult.failure) {
    switch (readResult.failure.type) {
      case 'DATA_MISSING':
        logger.warn('Missing resolver data for {key} key.', { key })
        // TODO: handle missing data
        break
      case 'DATA_INVALID':
        logger.warn('Invalid resolver data for {key} key.', { key })
        // TODO: handle invalid data
        break
    }

    return props.render(props.fallback)
  }

  if (process.env.DEEPDISH_MODE !== 'draft') {
    return props.render(readResult.data as V)
  }

  const draftResult = getDraft()
  if (draftResult.failure) {
    // TODO: handle missing draft data
    return props.render(readResult.data as V)
  }

  if (!(await draftResult.data.auth())) {
    return props.render(readResult.data as V)
  }

  // TODO: wrap with context menu
  return props.render(readResult.data as V)
}

export { configure, getContract, getDraft }
