import { type Editor, useEditor } from '@tiptap/react'
import { createContext, useContext } from 'react'
import { extensions } from './extensions'

const RichTextContext = createContext<{
  editor: Editor
  id: string
} | null>(null)

export function RichTextProvider(props: {
  children: React.ReactNode
  id: string
  onChange: (content: string) => void
}) {
  const editor = useEditor({
    extensions,
    onUpdate: ({ editor }) => {
      props.onChange?.(editor.getHTML())
    },
    immediatelyRender: true,
  })

  return (
    <RichTextContext.Provider value={{ editor, id: props.id }}>
      {props.children}
    </RichTextContext.Provider>
  )
}

export function useRichText() {
  const context = useContext(RichTextContext)

  if (!context) {
    throw new Error(
      'Rich-text context not found. This hook must be used within a `RichTextProvider`.',
    )
  }

  return context
}
