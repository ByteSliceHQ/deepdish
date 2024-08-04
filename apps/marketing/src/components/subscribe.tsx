import { Heading2, Paragraph } from '@deepdish/ui/typography'
import { Button } from './ui/button'
import { Link } from '@deepdish/ui/link'

export default function Subscribe() {
  return (
    <div className="bg-background py-16 sm:py-24 lg:py-32 border-x border-gray-700">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="max-w-xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:col-span-7">
          <Heading2 className="inline sm:block lg:inline xl:block">
            Join the waitlist.
          </Heading2>
          <Paragraph className="inline sm:block lg:inline xl:block">
            We're actively building. Stay tuned!
          </Paragraph>
        </div>
        <form className="w-full max-w-md lg:col-span-5 lg:pt-2">
          <div className="flex gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              autoComplete="email"
              className="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900/10 placeholder:text-gray-900/75 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
            <Button className="w-1/2" type="submit">
              Join waitlist
            </Button>
          </div>
          <Link
            href="/privacy"
            className="mt-4 text-sm leading-6 text-gray-600"
          >
            We care about your data. Read our privacy policy.
          </Link>
        </form>
      </div>
    </div>
  )
}
