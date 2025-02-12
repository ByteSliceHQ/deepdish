import { deepdish } from '@deepdish/cms'
import { cookieResolver } from '../resolver'
import { getBaseUrl } from '@/lib/getBaseUrl'

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
