import { createJsonResolver } from '@deepdish/resolvers/json'
import { configure } from '@deepdish/ui/config'
import { typographySchema } from '@deepdish/ui/schemas'

let configured = false

export async function cms() {
  if (configured) {
    return
  }

  configured = true

  return await configure({
    contracts: {
      typography: {
        resolver: createJsonResolver(contentPath, typographySchema, {
          maxBatchSize: 10,
        }),
      },
    },
    logging: {
      enabled: process.env.NODE_ENV === 'development',
    },
    settings: {
      baseUrl: process.env.BASE_URL,
      draft: process.env.DEEPDISH_MODE === 'draft',
    },
  })
}
