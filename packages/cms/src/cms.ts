import { createTypographyResolver } from '@deepdish-cloud/resolvers/typography'
import { schema } from '@deepdish/core/schema'
import { createComponents } from '@deepdish/ui/components'
import { configure } from '@deepdish/ui/config'
import { createContract } from '@deepdish/ui/contract'
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

export const deepdish = async (config: DeepDishConfig) => {
  const cloudTypographyResolver = {
    // TODO: Remove this once the cloud resolver supports keys.
    keys: () => Promise.resolve({ success: false, data: [] }),
    ...createTypographyResolver(
      config.cloudOverrides?.endpoint ?? 'https://api.deepdish.app/content',
      config.secretKey,
      config.projectAlias,
    ),
  }

  const contracts = {
    typography: createContract(
      schema((v) => v.string()),
      cloudTypographyResolver,
      {},
    ),
  }

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
