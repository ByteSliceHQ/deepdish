import 'server-only'

import { withResult } from '@byteslice/result'
import { Shell } from '@deepdish/core/shell'
import { getLogger } from '@logtape/logtape'
import { headers } from 'next/headers'
import { getContract, getSettings } from './config/config'
import { Menu } from './menu'
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

function getResolver(contract: DeepDishProps['contract']) {
  const result = getContract(contract)
  return result.failure ? null : result.data.resolver
}

function handleUpdate(
  contract: DeepDishProps['contract'],
  key: DeepDishElementProps['key'],
) {
  // TODO: type of `value` should be based on data contract
  return async (value: string | null) => {
    'use server'

    const resolver = getResolver(contract)
    if (!resolver) {
      logger.error(
        'Unable to save {contract} content for {key}: missing resolver.',
        { contract, key },
      )
      return
    }

    // TODO: handle `value` "fallback" based on data contract
    const writeResult = await resolver.write(
      { key, headers: await headers() },
      value ?? '',
    )
    if (writeResult.failure) {
      logger.error('Unable to save {contract} content for {key}: {reason}', {
        contract,
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
}) {
  const resolver = getResolver(props.deepdish.contract)
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
        logger.warn('Unable to read {contract} content for {key}: {reason}', {
          contract: props.deepdish.contract,
          key: props.deepdish.key,
          error: readResult.failure.error,
          reason: readResult.failure.error.message,
        })
        break
      case 'CONTENT_INVALID':
        logger.warn('Invalid {contract} content for {key}: {reason}', {
          contract: props.deepdish.contract,
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
                onUpdate={handleUpdate(
                  props.deepdish.contract,
                  props.deepdish.key,
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
    return props.render(readResult.data as V)
  }

  return (
    <Shell deepdishKey={props.deepdish.key}>
      <Menu
        deepdish={props.deepdish}
        // TODO: remove string type coercion once we support more resolver types
        value={readResult.data as string}
        onUpdate={handleUpdate(props.deepdish.contract, props.deepdish.key)}
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
}) {
  const resolver = getResolver(props.deepdish.contract)
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
            'The {contract} content resolver does not support dynamic collections',
            { contract: props.deepdish.contract },
          )
          break
        case 'KEYS':
          logger.warn(
            'Unable to list keys for {contract} content for {collection}: {reason}',
            {
              contract: props.deepdish.contract,
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
        inCollection
      />
    )
  })
}

export async function DeepDish<V>(props: {
  deepdish?: DeepDishProps
  fallback?: V
  render(value?: V): Promise<React.ReactElement>
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
      />
    )
  }

  return (
    <DeepDishElement
      deepdish={props.deepdish}
      fallback={props.fallback}
      render={props.render}
    />
  )
}
