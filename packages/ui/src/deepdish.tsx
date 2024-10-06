/// <reference types="react/experimental" />

import 'server-only'

import type { ValueType } from '@deepdish/config/schemas'
import { getLogger } from '@logtape/logtape'
import { configure, getContract, getDraft } from './config'
import { Menu } from './menu'
import type { DeepDishProps } from './types'

const logger = getLogger(['deepdish', 'ui'])

async function canEdit() {
  if (process.env.DEEPDISH_MODE !== 'draft') {
    return false
  }

  const draftResult = getDraft()
  if (draftResult.failure) {
    // TODO: handle missing draft data
    return false
  }

  return await draftResult.data.auth()
}

function getResolver(type: ValueType) {
  const result = getContract(type)
  return result.failure ? null : result.data.resolver
}

function handleUpdate(key: DeepDishProps['key'], type: ValueType) {
  return async (value: string | null) => {
    'use server'

    const resolver = getResolver(type)
    if (!resolver) {
      return
    }

    const writeResult = await resolver.write({ key }, value ?? '')
    if (writeResult.failure) {
      logger.error('Unable to save {type} content for {key}: {reason}', {
        type,
        key,
        reason: writeResult.failure,
      })
      return
    }
  }
}

export async function DeepDish<V>(props: {
  deepdish?: DeepDishProps
  fallback?: V
  render(value?: V): Promise<React.ReactElement>
  type: ValueType
}) {
  if (!props.deepdish) {
    return props.render(props.fallback)
  }

  const resolver = getResolver(props.type)
  if (!resolver) {
    return props.render(props.fallback)
  }

  const readResult = await resolver.read({
    key: props.deepdish.key,
  })
  if (readResult.failure) {
    switch (readResult.failure.type) {
      case 'READ':
        logger.warn('Unable to read {type} content for {key}: {reason}', {
          type: props.type,
          key: props.deepdish.key,
          reason: readResult.failure.error.message,
        })
        break
      case 'CONTENT_INVALID':
        logger.warn('Invalid {type} content for {key}: {reason}', {
          type: props.type,
          key: props.deepdish.key,
          reason: readResult.failure.error.message,
        })
        break
      case 'CONTENT_MISSING':
        if (await canEdit()) {
          return (
            <Menu
              deepdishKey={props.deepdish.key}
              value={props.fallback as string}
              onUpdate={handleUpdate(props.deepdish.key, props.type)}
            >
              {props.render(props.fallback)}
            </Menu>
          )
        }
        break
    }

    return props.render(props.fallback)
  }

  if (!(await canEdit())) {
    return props.render(readResult.data as V)
  }

  return (
    // TODO: remove string type coercion once we support more resolver types
    <Menu
      deepdishKey={props.deepdish.key}
      value={readResult.data as string}
      onUpdate={handleUpdate(props.deepdish.key, props.type)}
    >
      {props.render(readResult.data as V)}
    </Menu>
  )
}

export { configure, getContract, getDraft }
