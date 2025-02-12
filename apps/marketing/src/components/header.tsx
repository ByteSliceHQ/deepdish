import { Github } from 'lucide-react'
import Link from 'next/link'
import { Logo } from './logo'

export function Header() {
  return (
    <header className="py-4 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center gap-x-1">
            <Logo className="h-12 w-12" fill="#F87348" />
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
                className="text-zinc-700 hover:text-zinc-900 transition-colors"
              >
                <Github className="h-6 w-6" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
