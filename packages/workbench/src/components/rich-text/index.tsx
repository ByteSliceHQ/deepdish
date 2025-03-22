import { cn } from '@/lib/utils'
import { Color } from '@tiptap/extension-color'
import { ListItem } from '@tiptap/extension-list-item'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextStyle } from '@tiptap/extension-text-style'
import { Typography } from '@tiptap/extension-typography'
import { Underline } from '@tiptap/extension-underline'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { useEffect, useRef, useState } from 'react'
import { FormattingControls } from './formatting-controls'

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  Underline,
  Typography,
  Placeholder.configure({
    placeholder: 'Enter some text here...',
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
    },
    orderedList: {
      keepMarks: true,
    },
  }),
]

export function RichText(props: {
  content: string
  uniqueId: string
  onChange?: (content: string) => void
}) {
  const mountedId = useRef<string | null>(null)
  const [focused, setFocused] = useState(false)

  const editor = useEditor({
    extensions,
    onUpdate: ({ editor }) => {
      props.onChange?.(editor.getHTML())
    },
    immediatelyRender: true,
  })

  useEffect(() => {
    if (!props.content) {
      return
    }

    if (!mountedId.current || mountedId.current !== props.uniqueId) {
      editor?.commands.setContent(props.content)
      mountedId.current = props.uniqueId
      return
    }
  }, [props.uniqueId, props.content, editor])

  return (
    <div
      className={cn(
        'editor border border-input rounded-md overflow-hidden shadow-xs transition-[color,box-shadow]',
        focused && 'ring-4 ring-ring/10 outline-1 outline-ring/50',
      )}
    >
      <EditorContent
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        editor={editor}
        className="[&>div]:py-2 [&>div]:px-3 text-sm"
      />
      <BubbleMenu editor={editor}>
        <FormattingControls editor={editor} />
      </BubbleMenu>
    </div>
  )
}
