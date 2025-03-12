import 'server-only'

import { withResult } from '@byteslice/result'
import type { Schema, Value } from '@deepdish/core/schema'
import { Shell } from '@deepdish/core/shell'
import type { Resolver } from '@deepdish/resolvers'
import { getLogger } from '@logtape/logtape'
import { headers } from 'next/headers'
import { getSettings } from './config/config'
import type { Contract } from './config/contract'
import { Menu } from './menu'
import type {
  DeepDishCollectionProps,
  DeepDishElementProps,
  DeepDishProps,
} from './types'

const logger = getLogger(['deepdish', 'ui'])

type Render<S extends Schema> = (
  value?: Value<S>,
) => Promise<React.ReactElement>

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
      logger.error('Unable to verify edit context: {message}', {
        message: error.message,
        settings,
      })

      return new Error(`Unable to verify edit context: ${error.message}`)
    },
  )

  if (response.failure) {
    return false
  }

  return response.data
}

function handleUpdate<V>(
  key: DeepDishElementProps['key'],
  write: Resolver<V>['write'],
) {
  return async (value: V) => {
    'use server'

    const writeResult = await write({ key, headers: await headers() }, value)
    if (writeResult.failure) {
      logger.error('Unable to save content for {key}: {reason}', {
        key,
        error: writeResult.failure,
        reason: writeResult.failure.message,
      })
      return
    }
  }
}

async function DeepDishElement<S extends Schema>(props: {
  contract: Contract<S>
  deepdish: DeepDishElementProps
  fallback?: Value<S>
  inCollection?: boolean
  render: Render<S>
}) {
  const readResult = await props.contract.resolver.read({
    key: props.deepdish.key,
    headers: await headers(),
  })
  if (readResult.failure) {
    switch (readResult.failure.type) {
      case 'READ':
        logger.warn('Unable to read content for {key}: {reason}', {
          key: props.deepdish.key,
          error: readResult.failure.error,
          reason: readResult.failure.error.message,
        })
        break
      case 'CONTENT_INVALID':
        logger.warn('Invalid content for {key}: {reason}', {
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
                deepdishKey={props.deepdish.key}
                value={props.fallback}
                onUpdate={handleUpdate(
                  props.deepdish.key,
                  props.contract.resolver.write,
                )}
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
    return props.render(readResult.data)
  }

  return (
    <Shell deepdishKey={props.deepdish.key}>
      <Menu
        deepdishKey={props.deepdish.key}
        value={readResult.data}
        onUpdate={handleUpdate(
          props.deepdish.key,
          props.contract.resolver.write,
        )}
      >
        {props.render(readResult.data)}
      </Menu>
    </Shell>
  )
}

async function DeepDishCollection<S extends Schema>(props: {
  contract: Contract<S>
  deepdish: DeepDishCollectionProps
  fallback?: Value<S>
  render: Render<S>
}) {
  let keys: string[]

  if (Array.isArray(props.deepdish.collection)) {
    keys = props.deepdish.collection
  } else {
    const keysResult = await props.contract.resolver.keys(
      props.deepdish.collection,
    )

    if (keysResult.failure) {
      switch (keysResult.failure.type) {
        case 'UNSUPPORTED':
          logger.warn(
            'The content resolver for {collection} does not support dynamic collections',
            { collection: props.deepdish.collection },
          )
          break
        case 'KEYS':
          logger.warn('Unable to list keys for {collection}: {reason}', {
            collection: props.deepdish.collection,
            error: keysResult.failure.error,
            reason: keysResult.failure.error.message,
          })
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
        contract={props.contract}
        deepdish={{ ...rest, key }}
        fallback={props.fallback}
        render={props.render}
        inCollection
      />
    )
  })
}

export async function DeepDish<S extends Schema>(props: {
  contract: Contract<S>
  deepdish?: DeepDishProps
  fallback?: Value<S>
  render: Render<S>
}) {
  if (!props.deepdish) {
    return <>{props.render(props.fallback)}</>
  }

  if (props.deepdish.collection !== undefined) {
    return (
      <DeepDishCollection
        contract={props.contract}
        deepdish={props.deepdish}
        fallback={props.fallback}
        render={props.render}
      />
    )
  }

  return (
    <DeepDishElement
      contract={props.contract}
      deepdish={props.deepdish}
      fallback={props.fallback}
      render={props.render}
    />
  )
}

export type { DeepDishProps }
