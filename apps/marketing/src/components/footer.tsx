import { Heading2 } from '@deepdish/ui/elements'

export default function Footer() {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="bg-background border border-gray-700 rounded-b-xl "
    >
      <Heading2 id="footer-heading" className="sr-only">
        Footer
      </Heading2>
      <div className="mx-auto max-w-7xl py-3 px-4">
        <p className="mt-8 text-sm leading-5 text-gray-600 md:order-1 md:mt-0">
          DeepDish is a product of{' '}
          <a href="https://byteslice.co/" className="text-orange-600">
            ByteSlice
          </a>
          , LLC © 2024
        </p>
      </div>
    </footer>
  )
}
