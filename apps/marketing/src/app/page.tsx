import Features from '@/components/features'
import Footer from '@/components/footer'
import { Header } from '@/components/header'
import Hero from '@/components/hero'
import Subscribe from '@/components/subscribe'
import { Code } from 'bright'

const beforeDeepDishSnippet = `function HeroBanner() {
  return (
    <div>
      <h1 className="text-4xl font-semibold">Awesomeness</h1>
      <p className="text-lg mt-4">
        We're awesome and we're here to make you awesome.
      </p>
    </div>
  )
}

`

const afterDeepDishSnippet = `import { Heading1, Paragraph } from '@deepdish/ui/typography'

function HeroBanner() {
  return (
    <div>
      <Heading1 className="text-4xl font-semibold">Awesomeness</Heading1>
      <Paragraph className="text-lg mt-4">
        We're awesome and we're here to make you awesome.
      </Paragraph>
    </div>
  )
}`

type CodeSnippetProps = Readonly<{
  children: React.ReactNode
}>

function CodeSnippet(props: CodeSnippetProps) {
  return (
    <Code
      lang="tsx"
      lineNumbers
      theme="github-dark"
      className="border border-gray-700 rounded-md text-xs"
    >
      {props.children}
    </Code>
  )
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className="py-3 container">
      <Header />
      <Hero />
      <Features />
      <Subscribe />
      <Footer />
      {/* <div className="flex flex-col gap-16 mt-16">
        <div className="flex items-center gap-4 mx-auto">
          <CodeSnippet>{beforeDeepDishSnippet}</CodeSnippet>
          <CircleArrowRight className="text-gray-500" />
          <CodeSnippet>{afterDeepDishSnippet}</CodeSnippet>
        </div>
      </div> */}
    </div>
  )
}
