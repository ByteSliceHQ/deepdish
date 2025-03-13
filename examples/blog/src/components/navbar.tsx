import Link from 'next/link'

export function Navbar() {
  return (
    <div className="py-4 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        <div className="bg-red-500 text-white text-center text-sm font-bold py-2 px-3 rounded-full shadow-sm">
          Johnny Pizza
        </div>
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
        </div>
      </div>
    </div>
  )
}
