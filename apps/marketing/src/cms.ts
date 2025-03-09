import { getBaseUrl } from '@/lib/get-base-url'
import { createComponents } from '@deepdish/ui/components'
import { configure } from '@deepdish/ui/config'
import * as v from 'valibot'
import { cookieResolver } from './resolver'

const textSchema = v.string()

const contracts = {
  text: {
    resolver: cookieResolver,
    schema: textSchema,
  },
}

export async function cms() {
  await configure({
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
