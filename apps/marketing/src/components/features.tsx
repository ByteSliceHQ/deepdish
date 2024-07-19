import { Heading2, Paragraph } from '@deepdish/ui/typography'
import {
  CameraIcon,
  CloudArrowUpIcon,
  CodeBracketIcon,
  CursorArrowRaysIcon,
} from '@heroicons/react/20/solid'
import CodeSnippet from './code'

const features = [
  {
    name: 'Next.js framework.',
    description:
      'Build completely custom websites with Next.js without dealing with the complexity of a CMS.',
    icon: CodeBracketIcon,
  },
  {
    name: 'Point and click editing.',
    description:
      'Marketing teams can edit content directly on the website by selecting the content they want to edit.',
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Media packages.',
    description:
      'DeepDish comes with a media package that allows marketing teams to change images and videos on the fly.',
    icon: CameraIcon,
  },
]

const afterDeepDishSnippet = `import { Heading1, Paragraph, Collection } from '@deepdish/ui/typography'
import { getCollection } from '@deepdish/collections'

function HeroBanner() {
  return (
    <div>
      <Heading1 deepdish="hero-heading" className="text-4xl font-semibold" />
      <Paragraph deepdish="hero-description" className="text-lg mt-4" deepdish="hero-description" />
    </div>
  )
}

type Feature = {
  id: string
  name: string
  description: string
}

async function Features() {
  const features = await getCollection<Feature[]>('features')
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
      {features.map((feature) => (
        <div key={feature.id} className="relative pl-9">
          <Paragraph deepdish={feature.name} className="inline font-semibold text-gray-900" />
          <Paragraph deepdish={feature.description} className="inline" />
        </div>
      ))}
    </div>
  )
}
`

export default function Features() {
  return (
    <div className="overflow-hidden bg-background py-24 sm:py-32 border-x border-gray-700">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
          <div className="px-6 md:px-0 lg:pr-4 lg:pt-4">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              <Heading2 className="text-base font-semibold leading-7 text-orange-600">
                Custom websites without the CMS.
              </Heading2>
              <Paragraph className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Let's be honest, integrating a CMS sucks.
              </Paragraph>
              <Paragraph className="mt-6 text-lg leading-8 text-gray-600">
                DeepDish is a component library that enables developers to build
                websites with Next.js while giving marketing teams a clean and
                easy to use interface to edit content.
              </Paragraph>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-orange-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="sm:px-6 lg:px-0">
            <div className="relative isolate overflow-hidden bg-orange-100 p-6 sm:mx-auto sm:max-w-2xl sm:rounded-3xl lg:mx-0 lg:max-w-none">
              <CodeSnippet>{afterDeepDishSnippet}</CodeSnippet>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
