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

type Render<V> = (value?: V) => Promise<React.ReactElement>

const logger = getLogger(['deepdish', 'ui'])

async function canEdit() {
  const settingsResult = getSettings()

  logger.debug('Checking edit mode settings', {
    hasSettings: !settingsResult.failure,
    hasError: !!settingsResult.failure,
  })
  if (settingsResult.failure) {
    return false
  }

  const settings = settingsResult.data
  logger.debug('Edit mode configuration', {
    draftMode: settings.draft,
    baseUrl: settings.baseUrl,
  })

  if (!settings.draft) {
    return false
  }

  logger.debug(
    'DeepDish: Draft mode enabled, proceeding with edit verification',
  )

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

  logger.debug('Edit verification complete', {
    isVerified: !response.failure ? response.data : false,
    hasError: !!response.failure,
  })

  if (response.failure) {
    return false
  }

  return response.data
}

function getResolver(contract: string) {
  const result = getContract(contract)
  logger.debug('Contract resolver lookup', {
    contract,
    hasResolver: !result.failure,
    error: result.failure?.message,
  })
  return result.failure ? null : result.data.resolver
}

function handleUpdate<V>(contract: string, key: DeepDishElementProps['key']) {
  return async (value: V) => {
    'use server'

    logger.debug('Handling content update', {
      contract,
      key,
      valueType: typeof value,
    })

    const resolver = getResolver(contract)
    if (!resolver) {
      logger.error(
        'Unable to save {contract} content for {key}: missing resolver.',
        { contract, key },
      )
      return
    }

    const writeResult = await resolver.write(
      { key, headers: await headers() },
      value,
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

    logger.debug('Content update successful', {
      contract,
      key,
    })
  }
}

async function DeepDishElement<V>(props: {
  contract: string
  deepdish: DeepDishElementProps
  fallback?: V
  inCollection?: boolean
  render: Render<V>
}) {
  logger.debug('Rendering DeepDish element', {
    contract: props.contract,
    key: props.deepdish.key,
    hasFallback: props.fallback !== undefined,
    inCollection: props.inCollection,
  })

  const resolver = getResolver(props.contract)

  logger.debug('Initializing content resolver', {
    contractName: props.contract,
    hasResolver: !!resolver,
  })

  if (!resolver) {
    return props.render(props.fallback)
  }

  logger.debug('Content resolver initialized, fetching content', {
    key: props.deepdish.key,
  })

  const readResult = await resolver.read({
    key: props.deepdish.key,
    headers: await headers(),
  })

  logger.debug('Content fetch result', {
    key: props.deepdish.key,
    hasContent: !readResult.failure,
    errorType: readResult.failure?.type,
  })
  if (readResult.failure) {
    switch (readResult.failure.type) {
      case 'READ':
        logger.warn('Unable to read {contract} content for {key}: {reason}', {
          contract: props.contract,
          key: props.deepdish.key,
          error: readResult.failure.error,
          reason: readResult.failure.error.message,
        })
        break
      case 'CONTENT_INVALID':
        logger.warn('Invalid {contract} content for {key}: {reason}', {
          contract: props.contract,
          key: props.deepdish.key,
          error: readResult.failure.error,
          reason: readResult.failure.error.message,
        })
        break
      case 'CONTENT_MISSING':
        logger.debug('Content not found, checking edit permissions', {
          key: props.deepdish.key,
        })
        if (await canEdit()) {
          logger.debug('Edit permissions granted, rendering editable content', {
            key: props.deepdish.key,
          })
          return (
            <Shell deepdishKey={props.deepdish.key}>
              <Menu
                deepdishContract={props.contract}
                deepdishKey={props.deepdish.key}
                value={props.fallback}
                onUpdate={handleUpdate(props.contract, props.deepdish.key)}
              >
                {props.render(props.fallback)}
              </Menu>
            </Shell>
          )
        }
        logger.debug('Edit permissions denied, rendering fallback', {
          key: props.deepdish.key,
        })
        break
    }

    return props.render(props.fallback)
  }

  logger.debug('Content loaded successfully', {
    key: props.deepdish.key,
    hasContent: !!readResult.data,
  })

  if (!(await canEdit())) {
    return props.render(readResult.data)
  }

  logger.debug('Rendering component in edit mode', {
    key: props.deepdish.key,
    contract: props.contract,
  })

  return (
    <Shell deepdishKey={props.deepdish.key}>
      <Menu
        deepdishContract={props.contract}
        deepdishKey={props.deepdish.key}
        value={readResult.data}
        onUpdate={handleUpdate(props.contract, props.deepdish.key)}
      >
        {props.render(readResult.data)}
      </Menu>
    </Shell>
  )
}

async function DeepDishCollection<V>(props: {
  contract: string
  deepdish: DeepDishCollectionProps
  fallback?: V
  render: Render<V>
}) {
  logger.debug('Rendering DeepDish collection', {
    contract: props.contract,
    collection: props.deepdish.collection,
    hasFallback: props.fallback !== undefined,
  })

  const resolver = getResolver(props.contract)
  if (!resolver) {
    logger.debug('No resolver found for collection, rendering fallback', {
      contract: props.contract,
    })
    return props.render(props.fallback)
  }

  let keys: string[]

  if (Array.isArray(props.deepdish.collection)) {
    keys = props.deepdish.collection
    logger.debug('Using static collection keys', {
      contract: props.contract,
      keyCount: keys.length,
    })
  } else {
    logger.debug('Fetching dynamic collection keys', {
      contract: props.contract,
      collection: props.deepdish.collection,
    })
    const keysResult = await resolver.keys(props.deepdish.collection)

    if (keysResult.failure) {
      switch (keysResult.failure.type) {
        case 'UNSUPPORTED':
          logger.warn(
            'The {contract} content resolver does not support dynamic collections',
            { contract: props.contract },
          )
          break
        case 'KEYS':
          logger.warn(
            'Unable to list keys for {contract} content for {collection}: {reason}',
            {
              contract: props.contract,
              collection: props.deepdish.collection,
              error: keysResult.failure.error,
              reason: keysResult.failure.error.message,
            },
          )
          break
      }

      logger.debug('Collection keys fetch failed, rendering fallback', {
        contract: props.contract,
        errorType: keysResult.failure.type,
      })
      return props.render(props.fallback)
    }

    keys = keysResult.data
    logger.debug('Collection keys fetched successfully', {
      contract: props.contract,
      keyCount: keys.length,
    })
  }

  logger.debug('Rendering collection items', {
    contract: props.contract,
    itemCount: keys.length,
  })
  return keys.map((key) => {
    const { collection, ...rest } = props.deepdish

    return (
      <DeepDishElement
        contract={props.contract}
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
  contract: string
  deepdish?: DeepDishProps
  fallback?: V
  render: Render<V>
}) {
  logger.debug('Rendering DeepDish component', {
    contract: props.contract,
    hasDeepDishProps: !!props.deepdish,
    hasFallback: props.fallback !== undefined,
  })

  if (!props.deepdish) {
    logger.debug('No DeepDish props provided, rendering without wrapper', {
      contract: props.contract,
    })
    return <>{props.render(props.fallback)}</>
  }

  if (props.deepdish.collection !== undefined) {
    logger.debug('Rendering as collection', {
      contract: props.contract,
      collection: props.deepdish.collection,
    })
    return (
      <DeepDishCollection
        contract={props.contract}
        deepdish={props.deepdish}
        fallback={props.fallback}
        render={props.render}
      />
    )
  }

  logger.debug('Rendering as single element', {
    contract: props.contract,
    key: props.deepdish.key,
  })
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
