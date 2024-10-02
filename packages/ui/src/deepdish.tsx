/// <reference types="react/experimental" />

import 'server-only'

import type { ValueType } from '@deepdish/config/schemas'
import { getLogger } from '@logtape/logtape'
import { configure, getContract, getDraft } from './config'
import { Menu } from './menu'
import type { DeepDishProps } from './types'

const uiLogger = getLogger(['deepdish', 'ui'])

export async function DeepDish<V>(props: {
  deepdish?: DeepDishProps
  fallback?: V
  render(value?: V): Promise<React.ReactElement>
  type: ValueType
}) {
  if (!props.deepdish) {
    return props.render(props.fallback)
  }

  const logger = uiLogger.with({
    key: props.deepdish.key,
    type: props.type,
  })

  const contractResult = getContract(props.type)
  if (contractResult.failure) {
    logger.warn('Unable to access configured {type} contract for {key}.')
    return props.render(props.fallback)
  }
  const { resolver } = contractResult.data

  const readResult = await resolver.read({
    key: props.deepdish.key,
  })
  if (readResult.failure) {
    switch (readResult.failure.type) {
      case 'READ':
        logger.warn('Unable to read {type} data for {key}: {reason}', {
          reason: readResult.failure.error.message,
        })
        break
      case 'DATA_INVALID':
        logger.warn('Invalid {type} data for {key}: {reason}', {
          reason: readResult.failure.error.message,
        })
        break
    }

    return props.render(props.fallback)
  }

  if (process.env.DEEPDISH_MODE !== 'draft') {
    return props.render(readResult.data as V)
  }

  const draftResult = getDraft()
  if (draftResult.failure) {
    logger.warn('Unable to access configured draft.')
    // TODO: handle missing draft data
    return props.render(readResult.data as V)
  }

  if (!(await draftResult.data.auth())) {
    return props.render(readResult.data as V)
  }

  async function handleUpdate(value: string | null) {
    'use server'

    if (!props.deepdish) {
      return
    }

    const contractResult = getContract(props.type)
    if (contractResult.failure) {
      return
    }

    const { resolver } = contractResult.data

    const writeResult = await resolver.write(
      {
        key: props.deepdish.key,
      },
      value || '',
    )

    if (writeResult.failure) {
      // TODO: log error properly
      console.error('Failed to save content:', writeResult.failure)
      return
    }
  }

  return (
    // TODO: remove string type coercion once we support more resolver types
    <Menu
      deepdishKey={props.deepdish.key}
      value={readResult.data as string}
      onUpdate={handleUpdate}
    >
      {props.render(readResult.data as V)}
    </Menu>
  )
}

export { configure, getContract, getDraft }
