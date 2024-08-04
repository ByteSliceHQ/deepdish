import { Code } from 'bright'

type CodeSnippetProps = Readonly<{
  children: React.ReactNode
}>

export default function CodeSnippet(props: CodeSnippetProps) {
  return (
    <Code
      lang="tsx"
      lineNumbers
      theme="github-dark"
      className="border border-gray-700 rounded-md text-xs overflow-wrap max-w-full"
    >
      {props.children}
    </Code>
  )
}
