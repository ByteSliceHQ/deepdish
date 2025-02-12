import { configure } from '@deepdish/ui/config'
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
