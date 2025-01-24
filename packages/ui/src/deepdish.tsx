import 'server-only'

import { getLogger } from '@logtape/logtape'
import { headers } from 'next/headers'
import { getBaseUrl, getContract } from './config/config'
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

  const baseUrl = getBaseUrl()

  if (baseUrl.failure) {
    return false
  }

  const response = await fetch(`${baseUrl.data}/__deepdish/verify`, {
    headers: await headers(),
  })

  if (response.ok) {
    const body = await response.json()
    return body.signedIn
  }

  return false
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
  inCollection?: boolean
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
  const resolver = getResolver(props.type)
  if (!resolver) {
    return props.render(props.fallback)
  }

  let keys: string[]

  if (Array.isArray(props.deepdish.collection)) {
    keys = props.deepdish.collection
  } else {
    const keysResult = await resolver.keys(props.deepdish.collection)

    if (keysResult.failure) {
      switch (keysResult.failure.type) {
        case 'UNSUPPORTED':
          logger.warn(
            'The {type} resolvers does not support dynamic collections.',
            {
              type: props.type,
              collection: props.deepdish.collection,
            },
          )
          break
        case 'KEYS':
          logger.warn(
            'Unable to list keys for {type} content for {collection}: {reason}',
            {
              type: props.type,
              collection: props.deepdish.collection,
              error: keysResult.failure.error,
              reason: keysResult.failure.error.message,
            },
          )
          break
      }

      return props.render(props.fallback)
    }

    keys = keysResult.data
  }

  return keys.map((key) => {
    const { collection, ...rest } = props.deepdish

    return (
      <DeepDishElement
        key={key}
        deepdish={{ ...rest, key }}
        fallback={props.fallback}
        render={props.render}
        type={props.type}
        inCollection
      />
    )
  })
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

  if (props.deepdish.collection != null) {
    return (
      <DeepDishCollection
        deepdish={props.deepdish}
        fallback={props.fallback}
        render={props.render}
        type={props.type}
      />
    )
  }

  return (
    <DeepDishElement
      deepdish={props.deepdish}
      fallback={props.fallback}
      render={props.render}
      type={props.type}
    />
  )
}
