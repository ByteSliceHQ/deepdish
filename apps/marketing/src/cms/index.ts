import { getBaseUrl } from '@/lib/get-base-url'
import { configure } from '@deepdish/ui/config'
import { typographySchema } from '@deepdish/ui/typography'
import { cookieResolver } from '../resolver'

let configured = false

export async function cms() {
  if (configured) {
    return
  }

  configured = true

  return await configure({
    contracts: {
      typography: {
        resolver: cookieResolver,
        schema: typographySchema,
      },
    },
    logging: {
      enabled: process.env.NODE_ENV === 'development',
    },
    settings: {
      baseUrl: getBaseUrl(),
      draft: process.env.DEEPDISH_MODE === 'draft',
    },
  })
}
