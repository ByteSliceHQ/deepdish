import { contentPaths, initContent } from '@/content'
import { createJsonResolver } from '@deepdish/resolvers/json'
import { createComponents } from '@deepdish/ui/components'
import { configure } from '@deepdish/ui/config'
import { z } from 'zod'

const featureSchema = z.object({
  name: z.string(),
  description: z.string(),
})

const textSchema = z.string()

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

export async function cms() {
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
