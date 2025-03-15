import { getBaseUrl } from '@/lib/get-base-url'
import { configure } from '@deepdish/ui/config'
import * as v from 'valibot'
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
        schema: v.string(),
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
