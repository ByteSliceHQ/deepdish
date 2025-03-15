import { contentPaths, initContent } from '@/content'
import { createJsonResolver } from '@deepdish/resolvers/json'
import { createComponents } from '@deepdish/ui/components'
import { configure } from '@deepdish/ui/config'
import * as v from 'valibot'

const featureSchema = v.object({
  name: v.string(),
  description: v.string(),
})

const textSchema = v.string()

const contracts = {
  text: {
    resolver: createJsonResolver(contentPaths.text, textSchema, {
      maxBatchSize: 10,
    }),
    schema: textSchema,
  },
  feature: {
    resolver: createJsonResolver(contentPaths.feature, featureSchema, {
      maxBatchSize: 10,
    }),
    schema: featureSchema,
  },
}

async function cms() {
  await initContent()

  await configure({
    contracts,
    logging: {
      enabled: process.env.NODE_ENV === 'development',
    },
    settings: {
      baseUrl: process.env.BASE_URL,
      draft: process.env.DEEPDISH_MODE === 'draft',
    },
  })

  return createComponents(contracts)
}

const components = await cms()

export const Feature = components.feature
export const Text = components.text
