import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center gap-x-2">
            <Image
              src="/deepdish-logo-color.png"
              alt="DeepDish Logo"
              width={40}
              height={40}
              className="text-red-500"
            />
            <span className="text-2xl leading-normal font-bold bg-gradient-to-r from-red-400 to-orange-500 text-transparent bg-clip-text">
              DeepDish
            </span>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="https://github.com/ByteSliceHQ/deepdish"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Docs
              </Link>
            </li>
            <li>
              <Link
                href="https://dashboard.deepdish.app"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
