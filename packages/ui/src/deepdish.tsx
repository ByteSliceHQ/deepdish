/// <reference types="react/experimental" />

import 'server-only'

import { getLogger } from '@logtape/logtape'
import { getContract, getDraft } from './config/config'
import { Menu } from './menu'
import type { ValueType } from './schemas'
import type {
  DeepDishCollectionProps,
  DeepDishElementProps,
  DeepDishProps,
} from './types'

const logger = getLogger(['deepdish', 'ui'])

async function canEdit() {
  if (process.env.DEEPDISH_MODE !== 'draft') {
    return false
  }

  const draftResult = getDraft()
  if (draftResult.failure) {
    return false
  }

  return await draftResult.data.auth()
}

function getResolver(type: ValueType) {
  const result = getContract(type)
  return result.failure ? null : result.data.resolver
}

function handleUpdate(type: ValueType, key: DeepDishElementProps['key']) {
  // TODO: type of `value` should be based on data contract
  return async (value: string | null) => {
    'use server'

    const resolver = getResolver(type)
    if (!resolver) {
      logger.error(
        'Unable to save {type} content for {key}: missing resolver.',
        { type, key },
      )
      return
    }

    // TODO: handle `value` "fallback" based on data contract
    const writeResult = await resolver.write({ key }, value ?? '')
    if (writeResult.failure) {
      logger.error('Unable to save {type} content for {key}: {reason}', {
        type,
        key,
        error: writeResult.failure,
        reason: writeResult.failure.message,
      })
      return
    }
  }
}

async function DeepDishElement<V>(props: {
  deepdish: DeepDishElementProps
  fallback?: V
  render(value?: V): Promise<React.ReactElement>
  type: ValueType
}) {
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
          error: readResult.failure.error,
          reason: readResult.failure.error.message,
        })
        break
      case 'CONTENT_INVALID':
        logger.warn('Invalid {type} content for {key}: {reason}', {
          type: props.type,
          key: props.deepdish.key,
          error: readResult.failure.error,
          reason: readResult.failure.error.message,
        })
        break
      case 'CONTENT_MISSING':
        if (await canEdit()) {
          return (
            <Menu
              deepdish={props.deepdish}
              value={props.fallback as string}
              onUpdate={handleUpdate(props.type, props.deepdish.key)}
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
      deepdish={props.deepdish}
      value={readResult.data as string}
      onUpdate={handleUpdate(props.type, props.deepdish.key)}
    >
      {props.render(readResult.data as V)}
    </Menu>
  )
}

async function DeepDishCollection<V>(props: {
  deepdish: DeepDishCollectionProps
  fallback?: V
  render(value?: V): Promise<React.ReactElement>
  type: ValueType
}) {
  return props.deepdish.keys.map((key) => (
    <DeepDishElement
      key={key}
      deepdish={{ ...props.deepdish, key }}
      fallback={props.fallback}
      render={props.render}
      type={props.type}
      // TODO: inCollection={true}
    />
  ))
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

  // TODO: support no explicit keys and a filter function instead
  if (props.deepdish.keys) {
    return (
      <DeepDishCollection
        deepdish={{ ...props.deepdish, keys: props.deepdish.keys }}
        fallback={props.fallback}
        render={props.render}
        type={props.type}
      />
    )
  }

  if (!props.deepdish.key) {
    return props.render(props.fallback)
  }

  return (
    <DeepDishElement
      // TODO: cleaner way to instruct TypeScript that `key` is indeed defined here
      deepdish={{
        ...props.deepdish,
        key: props.deepdish.key,
      }}
      fallback={props.fallback}
      render={props.render}
      type={props.type}
    />
  )
}
