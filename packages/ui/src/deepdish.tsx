/// <reference types="react/experimental" />

import 'server-only'

import type { ValueType } from '@deepdish/config/schemas'
import { getLogger } from '@logtape/logtape'
import { configure, getContract, getDraft } from './config'
import type { DeepDishProps } from './types'

const uiLogger = getLogger(['deepdish', 'ui'])

export async function DeepDish<V>(props: {
  deepdish?: DeepDishProps
  fallback?: V
  render(value?: V): Promise<React.ReactElement>
  type: ValueType
}) {
  const logger = uiLogger.with({
    key: props.deepdish?.key,
    type: props.type,
  })

  if (!props.deepdish) {
    logger.debug('Rendering fallback {type} content.')
    return props.render(props.fallback)
  }

  const contractResult = getContract(props.type)
  if (contractResult.failure) {
    logger.warn('Unable to access configured {type} contract for {key}.')
    logger.debug('Rendering fallback {type} content for {key}.')
    return props.render(props.fallback)
  }
  const { resolver } = contractResult.data

  const readResult = await resolver.read({
    key: props.deepdish.key,
  })
  if (readResult.failure) {
    switch (readResult.failure.type) {
      case 'DATA_MISSING':
        logger.warn('Missing resolver data for {key}.')
        // TODO: handle missing data
        break
      case 'DATA_INVALID':
        logger.warn('Invalid resolver data for {key}.')
        // TODO: handle invalid data
        break
    }

    logger.debug('Rendering fallback {type} content for {key}.')
    return props.render(props.fallback)
  }

  if (process.env.DEEPDISH_MODE !== 'draft') {
    logger.info('Rendering {type} content for {key}.')
    return props.render(readResult.data as V)
  }

  const draftResult = getDraft()
  if (draftResult.failure) {
    logger.warn('Unable to access configured draft.')
    logger.info('Rendering {type} content for {key}.')
    // TODO: handle missing draft data
    return props.render(readResult.data as V)
  }

  if (!(await draftResult.data.auth())) {
    logger.debug('Not authorized to use draft mode.')
    logger.info('Rendering {type} content for {key}.')
    return props.render(readResult.data as V)
  }

  logger.info('Rendering {type} content for {key} with context menu.')
  // TODO: wrap with context menu
  return props.render(readResult.data as V)
}

export { configure, getContract, getDraft }
