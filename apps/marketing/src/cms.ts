import { getBaseUrl } from '@/lib/get-base-url'
import { schema } from '@deepdish/core/schema'
import { createComponents } from '@deepdish/ui/components'
import { configure } from '@deepdish/ui/config'
import { createContract } from '@deepdish/ui/contract'
import { cookieResolver } from './resolver'

const textSchema = schema((v) => v.string())

const contracts = {
  text: createContract(textSchema, cookieResolver),
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
