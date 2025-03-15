import { Feature, Text } from '@/cms'

export default function Demo() {
  return (
    <div className="flex flex-col px-8 py-6 gap-4">
      <div className="flex flex-col gap-1 max-w-prose">
        <Text
          deepdish={{ key: 'headline', contract: 'text' }}
          fallback="DeepDish Demo"
          render={async (value) => <p className="text-xl font-bold">{value}</p>}
        />
        <Text
          deepdish={{ key: 'sub-headline', contract: 'text' }}
          fallback="DeepDish is an alternative to traditional CMS systems. The code looks
          like normal React, but every element is editable. First, log in with
          the Workbench below. Then, simply right-click on elements and edit the
          text."
          render={async (value) => <p>{value}</p>}
        />
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
          <Text
            deepdish={{
              collection: ['collection-1', 'collection-2'],
              contract: 'text',
            }}
            fallback="This is a static collection."
            render={async (value) => <p>{value}</p>}
          />
        </div>
        <div>
          <p className="font-bold">Dynamic collection</p>
          <Text
            deepdish={{ collection: '*', contract: 'text' }}
            fallback="This is a dynamic collection."
            render={async (value) => <p>{value}</p>}
          />
        </div>
      </div>
      <div>
        <p className="font-bold">Custom elements</p>
        <Feature
          deepdish={{ key: 'features/feature-1', contract: 'feature' }}
        />
      </div>
    </div>
  )
}
