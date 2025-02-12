import Link from 'next/link'

export function Footer() {
  return (
    <footer className="pt-4 border-t border-gray-200 pb-16">
      <div className="container mx-auto flex justify-between items-center gap-y-4 sm:gap-y-0 flex-col-reverse	sm:flex-row">
        <p className="text-gray-400">
          Built by{' '}
          <Link className="text-orange-500" href="https://byteslice.co">
            ByteSlice
          </Link>
          . All rights reserved. &copy; {new Date().getFullYear()} DeepDish.
        </p>
        <div className="flex space-x-6">
          <Link
            href="/privacy"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}
