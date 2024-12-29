import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github } from 'lucide-react'
import { CodeBlock } from '@/components/code-block'
import Footer from '@/components/footer'
import Header from '@/components/header'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />

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
                  href="https://dashboard.deepdish.app"
                  className="flex items-center"
                >
                  Get started <ArrowRight className="ml-2 h-5 w-5" />
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
              Why use DeepDish?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'React server components',
                  description:
                    'Built on top of RSCs for optimal performance and developer experience.',
                  icon: '🚀',
                },
                {
                  title: 'Next.js integration',
                  description:
                    'Seamless integration with the Next.js app router, leveraging server-side rendering capabilities.',
                  icon: '⚡',
                },
                {
                  title: 'Flexible architecture',
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
              About DeepDish
            </h2>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <p className="text-xl text-gray-300 mb-6">
                We were frustrated with existing CMS systems and wanted to build
                a framework that worked for development and marketing teams
                alike. DeepDish empowers both devs and content creators with a
                modern, flexible data management system.
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Flexible content modeling</li>
                <li>Delightful developer experience</li>
                <li>Intuitive interface for editing content</li>
              </ul>
            </div>
          </div>
        </section>

        <section
          id="code-example"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900"
        >
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Get started with DeepDish
            </h2>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                1. Install DeepDish packages
              </h3>
              <CodeBlock language="bash" code={'npm install @deepdish/ui'} />

              <h3 className="text-xl font-semibold mt-8 mb-4">
                2. Use DeepDish in your app
              </h3>
              <CodeBlock
                language="typescript"
                code={`import { Header1 } from "@deepdish/ui/typography";

export default function Home() {
  return (
    <div>
      <Header1 deepdish={{ key: "title" }}>Default value</Header1>
    </div>
  );
}`}
              />

              <h3 className="text-xl font-semibold mb-4 mt-8">
                3. For a full getting started guide, visit the{' '}
                <Link
                  href="https://github.com/ByteSliceHQ/deepdish"
                  className="text-orange-500"
                >
                  <span className="underline">Github repo</span>
                </Link>
              </h3>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
