import { components } from '@/cms'

const { Feature, Paragraph, Text } = components

export default function Demo() {
  return (
    <div className="flex flex-col px-8 py-6 gap-4">
      <div className="flex flex-col gap-1 max-w-prose">
        <Paragraph deepdish={{ key: 'headline' }} className="text-xl font-bold">
          DeepDish Demo
        </Paragraph>
        <Paragraph deepdish={{ key: 'sub-headline' }}>
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
            deepdish={{ key: 'parent' }}
            fallback="This is a parent element."
            render={async (parent) => {
              return (
                <>
                  <h1>{parent}</h1>
                  <Text
                    deepdish={{ key: 'child' }}
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
            }}
            fallback="This is a static collection."
            render={async (value) => <p>{value}</p>}
          />
        </div>
        <div>
          <p className="font-bold">Dynamic collection</p>
          <Text
            deepdish={{ collection: '*' }}
            fallback="This is a dynamic collection."
            render={async (value) => <p>{value}</p>}
          />
        </div>
      </div>
      <div>
        <p className="font-bold">Custom elements</p>
        <Feature
          deepdish={{ key: 'features/feature-1' }}
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
      </div>
    </div>
  )
}
