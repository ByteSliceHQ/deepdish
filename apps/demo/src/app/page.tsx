import { Paragraph } from '@deepdish/ui/typography'

export default function Demo() {
  return (
    <div className="flex flex-col px-8 py-6 gap-4">
      <div className="flex flex-col gap-1 max-w-prose">
        <Paragraph
          className="text-xl font-bold text-gray-900"
          deepdish={{ key: 'headline' }}
        >
          DeepDish Demo
        </Paragraph>
        <Paragraph className="text-gray-700" deepdish={{ key: 'sub-headline' }}>
          DeepDish is an alternative to traditional CMS systems. The code looks
          like normal React, but every element is editable. First, log in with
          the Workbench below. Then, simply right-click on elements and edit the
          text.
        </Paragraph>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-gray-900 font-bold">Simple element</p>
          <Paragraph className="text-gray-700" deepdish={{ key: 'element' }}>
            This is a simple element.
          </Paragraph>
        </div>
        <div>
          <p className="text-gray-900 font-bold">Static collection</p>
          <Paragraph
            className="text-gray-700"
            deepdish={{ collection: ['collection-1', 'collection-2'] }}
          >
            This is a static collection.
          </Paragraph>
        </div>
        <div>
          <p className="text-gray-900 font-bold">Dynamic collection</p>
          <p className="text-gray-700">Coming soon!</p>
        </div>
      </div>
    </div>
  )
}
