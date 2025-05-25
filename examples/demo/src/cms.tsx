import { contentPaths, initContent } from '@/content'
import { schema } from '@deepdish/core/schema'
import { createJsonResolver } from '@deepdish/resolvers/json'
import { createComponents } from '@deepdish/ui/components'
import { createTypographyComponents } from '@deepdish/ui/components/typography'
import { configure } from '@deepdish/ui/config'
import { createContract } from '@deepdish/ui/contract'

const featureSchema = schema((v, utils) =>
  v.object({
    name: v.string(),
    description: utils.meta(v.string(), { rich: true }),
  }),
)

const textSchema = schema((v) => v.string())

const contracts = {
  text: createContract(
    textSchema,
    createJsonResolver(contentPaths.text, textSchema, {
      maxBatchSize: 10,
    }),
  ),
  feature: createContract(
    featureSchema,
    createJsonResolver(contentPaths.feature, featureSchema, {
      maxBatchSize: 10,
    }),
  ),
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

  const components = createComponents(contracts)

  return {
    ...components,
    ...createTypographyComponents(components.Text),
  }
}

export const components = await cms()
