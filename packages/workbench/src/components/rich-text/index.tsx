import { RichTextProvider } from './context'
import { Input } from './input'

export function RichText(props: {
  description?: React.ReactNode
  content: string
  uniqueId: string
  onChange: (content: string) => void
}) {
  return (
    <RichTextProvider onChange={props.onChange} id={props.uniqueId}>
      <Input content={props.content} />
    </RichTextProvider>
  )
}
