import { Paragraph } from '@/cms'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-prose text-center flex flex-col gap-4">
        <Paragraph
          deepdish={{ key: 'home/headline' }}
          className="text-xl text-gray-800 font-bold"
        >
          Welcome to Johnny Pizza
        </Paragraph>
        <Paragraph
          deepdish={{ key: 'home/sub-headline' }}
          className="text-gray-600"
        >
          We pride ourselves on our pizza. We use only the freshest ingredients
          and our team of expert chefs to create the best pizza in town.
        </Paragraph>
        <Link href="/blog">Check out our blog!</Link>
      </div>
    </div>
  )
}
