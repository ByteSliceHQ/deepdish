import { getBaseUrl } from '@/lib/get-base-url'
import { deepdish } from '@deepdish/cms'
import { cookieResolver } from '../resolver'

let configured = false

console.log('base url', getBaseUrl())

export async function cms() {
  if (configured) {
    return
  }

  configured = true

  return await deepdish({
    contracts: {
      typography: {
        resolver: cookieResolver,
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
