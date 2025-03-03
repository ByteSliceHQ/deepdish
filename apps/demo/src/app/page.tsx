import { Feature } from '@/feature'
import { Paragraph } from '@deepdish/ui/typography'
import { components } from './layout'

const Text = components.text

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
            render={async (value) => {
              return (
                <>
                  <h1>{value}</h1>
                  <Text
                    deepdish={{ key: 'child', contract: 'text' }}
                    fallback="This is a child element."
                    render={async (value) => {
                      return <p>{value}</p>
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
        <Feature deepdish={{ key: 'feature/feature-1', contract: 'feature' }} />
      </div>
    </div>
  )
}
