import { Heading1, Paragraph } from '@deepdish/ui/typography'
import { Button } from './ui/button'

export default function Hero() {
  return (
    <div className="bg-background border-gray-700 border-x">
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-3xl py-24">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              <Paragraph>We are actively building. Stay tuned!</Paragraph>
            </div>
          </div>
          <div className="text-center">
            <Heading1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your codebase is your CMS
            </Heading1>
            <Paragraph className="mt-6 text-lg leading-8 text-gray-600">
              A complete set of building blocks that turns your normal React
              codebase into a CMS. Turn plain ol' React components into editable
              content that your team can manage.
            </Paragraph>
            {/* <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button variant="default">Get started</Button>
              <Button variant="link">Learn more</Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
