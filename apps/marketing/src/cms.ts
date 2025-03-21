import { getBaseUrl } from '@/lib/get-base-url'
import { createComponents } from '@deepdish/ui/components'
import { configure } from '@deepdish/ui/config'
import { createSchema } from '@deepdish/core/schema'
import { cookieResolver } from './resolver'

const textSchema = createSchema((v) => v.string())

const contracts = {
  text: {
    resolver: cookieResolver,
    schema: textSchema,
  },
}

async function cms() {
  await configure({
    contracts,
    logging: {
      enabled: process.env.NODE_ENV === 'development',
    },
    settings: {
      baseUrl: getBaseUrl(),
      draft: process.env.DEEPDISH_MODE === 'draft',
    },
  })

  return createComponents(contracts)
}

const components = await cms()

export const Text = components.text
