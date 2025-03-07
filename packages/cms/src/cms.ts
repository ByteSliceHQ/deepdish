import { createTypographyResolver } from '@deepdish-cloud/resolvers/typography'
import { configure } from '@deepdish/ui/config'
import { typographySchema } from '@deepdish/ui/schemas'
import { deepdishMiddleware } from './middleware'
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
  const cloudTypographyResolver = createTypographyResolver(
    config.cloudOverrides?.endpoint ?? 'https://api.deepdish.app/content',
    config.secretKey,
    config.projectAlias,
  )

  return await configure({
    contracts: {
      typography: {
        resolver: {
          // TODO: Remove this once the cloud resolver supports keys.
          keys: () => Promise.resolve({ success: false, data: [] }),
          ...cloudTypographyResolver,
        },
        schema: typographySchema,
      },
    },
    logging: {
      enabled: config.loggingEnabled ?? false,
    },
    settings: {
      baseUrl: config.baseUrl,
      draft: config.draft,
    },
  })
}

export { DeepDishProvider, deepdishMiddleware }
