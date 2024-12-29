import type React from 'react'
import { Prism, type SyntaxHighlighterProps } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const SyntaxHighlighter =
  Prism as unknown as typeof React.Component<SyntaxHighlighterProps>

interface CodeBlockProps {
  language: string
  code: string
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
