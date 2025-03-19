import { contentPaths, initContent } from '@/content'
import { createJsonResolver } from '@deepdish/resolvers/json'
import { createComponents } from '@deepdish/ui/components'
import { configure } from '@deepdish/ui/config'
import { createContract, type Contracts } from '@deepdish/ui/contract'
import type { DeepDishProps } from '@deepdish/ui/deepdish'
import * as v from 'valibot'

const featureSchema = v.object({
  name: v.string(),
  description: v.string(),
})

const textSchema = v.string()

const featureResolver = createJsonResolver(
  contentPaths.feature,
  featureSchema,
  {
    maxBatchSize: 10,
  },
)

const contracts = {
  text: {
    resolver: createJsonResolver(contentPaths.text, textSchema, {
      maxBatchSize: 10,
    }),
    schema: textSchema,
  },
  feature: createContract(featureSchema, featureResolver, {
    name: {
      rich: true,
    },
  }),
} as unknown as Contracts

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

export const Text = components.text

export function Feature(props: {
  deepdish: DeepDishProps
}) {
  const Component = components.feature

  return (
    <Component
      deepdish={props.deepdish}
      render={async (value) => {
        return (
          <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm inline-block">
            <h1 className="text-xl text-gray-800 font-bold">
              {value?.name ?? 'Feature Name'}
            </h1>
            <p className="text-gray-500">
              {value?.description ?? 'Feature Description'}
            </p>
          </div>
        )
      }}
    />
  )
}
