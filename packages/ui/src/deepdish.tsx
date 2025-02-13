import 'server-only'

import { withResult } from '@byteslice/result'
import { Shell } from '@deepdish/core/shell'
import { getLogger } from '@logtape/logtape'
import { headers } from 'next/headers'
import { getContract, getSettings } from './config/config'
import { Menu } from './menu'
import type { ValueType } from './schemas'
import type {
  DeepDishCollectionProps,
  DeepDishElementProps,
  DeepDishProps,
} from './types'

const logger = getLogger(['deepdish', 'ui'])

async function canEdit() {
  const settingsResult = getSettings()
  if (settingsResult.failure) {
    return false
  }
  const settings = settingsResult.data

  if (!settings.draft) {
    return false
  }

  const response = await withResult(
    async () => {
      const res = await fetch(`${settings.baseUrl}/__deepdish/verify`, {
        headers: new Headers(await headers()),
      })

      const body = await res.json()
      return body.signedIn
    },
    (error) => {
      logger.error('Verifying edit context failed', { error, settings })
      return new Error(`Verifying edit context failed: ${error.message}`)
    },
  )

  if (response.failure) {
    return false
  }

  return response.data
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
    const writeResult = await resolver.write(
      { key, headers: await headers() },
      value ?? '',
    )
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
    headers: await headers(),
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
            <Shell deepdishKey={props.deepdish.key}>
              <Menu
                deepdish={props.deepdish}
                value={props.fallback as string}
                onUpdate={handleUpdate(props.type, props.deepdish.key)}
              >
                {props.render(props.fallback)}
              </Menu>
            </Shell>
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
    <Shell deepdishKey={props.deepdish.key}>
      {/* // TODO: remove string type coercion once we support more resolver types */}
      <Menu
        deepdish={props.deepdish}
        value={readResult.data as string}
        onUpdate={handleUpdate(props.type, props.deepdish.key)}
      >
        {props.render(readResult.data as V)}
      </Menu>
    </Shell>
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
            'The {type} content resolver does not support dynamic collections',
            {
              type: props.type,
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
    return <>{props.render(props.fallback)}</>
  }

  if (props.deepdish.collection !== undefined) {
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
