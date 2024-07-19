import { Header } from '@/components/header'
import { Heading1, Paragraph } from '@deepdish/ui/typography'
import { Code } from 'bright'
import { CircleArrowRight } from 'lucide-react'

const beforeDeepDishSnippet = `function HeroBanner() {
  return (
    <div>
      <h1 className="text-4xl font-semibold">Awesomeness</h1>
      <p className="text-lg mt-4">
        We're awesome and we're here to make you awesome.
      </p>
    </div>
  )
}`

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

export default function Page() {
  return (
    <div className="py-3 container">
      <Header />
      <div className="flex flex-col gap-16 mt-16">
        <div className="flex flex-col gap-4 text-center">
          <Heading1 className="text-6xl text-gray-200 mx-auto">
            Your codebase{' '}
            <span className="italic font-bold text-orange-600">is</span> your
            CMS
          </Heading1>
          <Paragraph className="text-gray-400 max-w-prose mx-auto">
            A complete set of building blocks that turns your normal React
            codebase into a CMS. Turn plain ol' React components into editable
            content that your team can manage.
          </Paragraph>
        </div>

        <div className="flex items-center gap-4 mx-auto">
          <CodeSnippet>{beforeDeepDishSnippet}</CodeSnippet>
          <CircleArrowRight className="text-gray-500" />
          <CodeSnippet>{afterDeepDishSnippet}</CodeSnippet>
        </div>
      </div>
    </div>
  )
}
