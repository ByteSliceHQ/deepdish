import {
  createCloudResolver,
  createContentClient,
} from '@deepdish-cloud/resolvers'
import type { Schema } from '@deepdish/core/schema'
import { createComponents } from '@deepdish/ui/components'
import { configure } from '@deepdish/ui/config'
import { type Contracts, createContract } from '@deepdish/ui/contract'
import { middleware } from './middleware'
import { ProviderContainer as DeepDishProvider } from './provider/container'

export type DeepDishConfig = {
  draft: boolean
  baseUrl: string
  secretKey: string
  projectAlias: string
  loggingEnabled?: boolean
  cloudOverrides?: {
    endpoint?: string
  }
}

type Model = {
  name: string
  schema: Schema
}

export const deepdish = async (config: DeepDishConfig, models: Model[]) => {
  const client = createContentClient(
    config.projectAlias,
    config.secretKey,
    config.cloudOverrides?.endpoint,
  )

  const contracts = models.reduce<Contracts>((acc, { name, schema }) => {
    const resolver = createCloudResolver(client, name, schema)
    acc[name] = createContract(schema, resolver)
    return acc
  }, {})

  await configure({
    contracts,
    logging: {
      enabled: config.loggingEnabled ?? false,
    },
    settings: {
      baseUrl: config.baseUrl,
      draft: config.draft,
    },
  })

  return {
    components: createComponents(contracts),
    middleware: middleware(config),
  }
}

export { DeepDishProvider }
