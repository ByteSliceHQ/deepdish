import { DeepDishLogo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
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
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="#features"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Github
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/ByteSliceHQ/deepdish"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl leading-normal font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-500 text-transparent bg-clip-text">
              A data management framework for Next.js
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              DeepDish is an alternative to traditional CMS systems. Start your
              project and start managing data with React server components.
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                asChild
                size="lg"
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Link
                  href="https://github.com/ByteSliceHQ/deepdish"
                  className="flex items-center"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-gray-300 border-gray-600 hover:bg-gray-700"
              >
                <Link
                  href="https://github.com/ByteSliceHQ/deepdish"
                  className="flex items-center"
                >
                  <Github className="mr-2 h-5 w-5" /> View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-orange-500/10 opacity-30" />
          <div className="container mx-auto relative z-10">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Why Choose DeepDish?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'React Server Components',
                  description:
                    'Built on cutting-edge React technology for optimal performance and developer experience.',
                  icon: '🚀',
                },
                {
                  title: 'Next.js Integration',
                  description:
                    'Seamless integration with Next.js apps, leveraging server-side rendering capabilities.',
                  icon: '⚡',
                },
                {
                  title: 'Flexible Architecture',
                  description:
                    'Adaptable to various content structures and management needs.',
                  icon: '🔧',
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              About DeepDish CMS
            </h2>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <p className="text-xl text-gray-300 mb-6">
                DeepDish CMS is built to empower developers and content creators
                with a modern, flexible content management system. Our focus on
                React server components and Next.js integration provides a solid
                foundation for building scalable and performant web
                applications.
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Optimized for React and Next.js projects</li>
                <li>Built with performance and scalability in mind</li>
                <li>Flexible content modeling</li>
                <li>Developer-friendly API</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} DeepDish CMS. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
