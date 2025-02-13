import { Button } from '@/components/ui/button'
import { Waitlist } from '@clerk/nextjs'
import { Heading1, Paragraph } from '@deepdish/ui/typography'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex-grow">
      <section className="pt-16 pb-24 sm:pt-24 sm:pb-32 border-b border-gray-200 bg-textured">
        <div className="container mx-auto text-left sm:text-center max-w-xl">
          <Heading1
            deepdish={{ key: 'home/headline' }}
            className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-500 text-transparent bg-clip-text"
          >
            Manage content directly on your pages
          </Heading1>
          <Paragraph
            deepdish={{ key: 'home/sub-headline' }}
            className="text-xl text-gray-800 mb-10 max-w-2xl mx-auto"
          >
            DeepDish lets you build Next.js apps without integrating a CMS.
          </Paragraph>
          <div className="flex justify-start sm:justify-center space-x-0 sm:space-x-4 flex-wrap space-y-4 sm:space-y-0">
            <Button
              asChild
              size="lg"
              className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto"
            >
              <Link href="#waitlist" className="flex items-center">
                Join the waitlist <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="flex justify-center space-x-2 mt-8 items-center">
            <Image src="/byteslice.svg" width={24} height={24} alt="" />
            <p className="text-gray-400 text-xs">
              Built by the team at <a href="https://byteslice.co">ByteSlice</a>
            </p>
          </div>
        </div>
      </section>

      <section className="mt-[-120px] py-12 px-6 sm:px-10 lg:px-12 ">
        <div className="border w-full lg:max-w-4xl mx-auto rounded-xl aspect-w-16 aspect-h-12 sm:aspect-h-10 lg:aspect-h-8 shadow-xl bg-white">
          <video
            title="DeepDish demo"
            className="rounded-xl w-full object-fill"
            autoPlay
            loop
            playsInline
            muted
          >
            <source src="/deepdish-demo.mp4" type="video/mp4" />
            <track kind="captions" srcLang="en" label="English" default />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section
        className="py-16 sm:py-24 border-y border-gray-200 bg-textured"
        id="waitlist"
      >
        <div className="container mx-auto text-left sm:text-center max-w-xl">
          <div className="mx-auto text-center">
            <Waitlist
              appearance={{
                elements: {
                  logoBox: 'hidden',
                  rootBox: 'mx-auto',
                },
              }}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
