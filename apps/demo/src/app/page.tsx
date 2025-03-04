import { Feature } from '@/feature'
import { Paragraph } from '@deepdish/ui/typography'
import { DeepDish2 } from '@deepdish/ui/deepdish'
import { components } from './layout'
import * as z from 'zod'
import { createJsonResolver } from '@deepdish/resolvers/json'

const Text = components.text

const featureSchema = z.object({
  name: z.string(),
  description: z.string(),
})

const featureResolver = createJsonResolver(
  '/tmp/deepdish_feature.json',
  featureSchema,
  {
    maxBatchSize: 10,
  },
)

export default function Demo() {
  return (
    <div className="flex flex-col px-8 py-6 gap-4">
      <div className="flex flex-col gap-1 max-w-prose">
        <Paragraph
          className="text-xl font-bold"
          deepdish={{ key: 'headline', contract: 'text' }}
        >
          DeepDish Demo
        </Paragraph>
        <Paragraph deepdish={{ key: 'sub-headline', contract: 'text' }}>
          DeepDish is an alternative to traditional CMS systems. The code looks
          like normal React, but every element is editable. First, log in with
          the Workbench below. Then, simply right-click on elements and edit the
          text.
        </Paragraph>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="font-bold">Nested elements</p>
          <Text
            deepdish={{ key: 'parent', contract: 'text' }}
            fallback="This is a parent element."
            render={async (parent) => {
              return (
                <>
                  <h1>{parent}</h1>
                  <Text
                    deepdish={{ key: 'child', contract: 'text' }}
                    fallback="This is a child element."
                    render={async (child) => {
                      return <p>{child}</p>
                    }}
                  />
                </>
              )
            }}
          />
        </div>
        <div>
          <p className="font-bold">Static collection</p>
          <Paragraph
            deepdish={{
              collection: ['collection-1', 'collection-2'],
              contract: 'text',
            }}
          >
            This is a static collection.
          </Paragraph>
        </div>
        <div>
          <p className="font-bold">Dynamic collection</p>
          <Paragraph deepdish={{ collection: '*', contract: 'text' }}>
            This is a dynamic collection.
          </Paragraph>
        </div>
      </div>
      <div>
        <p className="font-bold">Custom elements</p>
        <Feature
          deepdish={{ key: 'features/feature-1', contract: 'feature' }}
        />
        <DeepDish2
          contract={{
            resolver: featureResolver,
            schema: featureSchema,
          }}
          deepdish={{ key: 'features/feature-1' }}
          onWrite={async (
            key: string,
            value: z.infer<typeof featureSchema>,
          ) => {
            'use server'

            console.log('[server] I am writing!', {
              key,
              value,
            })

            await featureResolver.write({ key }, value)
          }}
          render={(value) => (
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm inline-block">
              <h1 className="text-xl text-gray-800 font-bold">{value.name}</h1>
              <p className="text-gray-500">{value.description}</p>
            </div>
          )}
        />
      </div>
    </div>
  )
}
