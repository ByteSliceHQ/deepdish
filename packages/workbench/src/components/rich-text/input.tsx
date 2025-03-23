import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BubbleMenu, EditorContent } from '@tiptap/react'
import { FullscreenIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useRichText } from './context'
import { FormattingControls } from './formatting-controls'
import { ModalEditor } from './modal-editor'

export function Input(props: {
  content: string
  description?: React.ReactNode
}) {
  const mountedId = useRef<string | null>(null)
  const [focused, setFocused] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const { editor, id } = useRichText()

  useEffect(() => {
    if (!props.content) {
      return
    }

    if (!mountedId.current || mountedId.current !== id) {
      editor?.commands.setContent(props.content)
      mountedId.current = id
      return
    }
  }, [id, props.content, editor])

  function handleSave(content: string) {
    editor.commands.setContent(content)
    setModalOpen(false)
  }

  return (
    <div className="flex gap-2 items-center">
      <div
        className={cn(
          'flex-1 items-center editor border border-input rounded-md overflow-hidden shadow-xs transition-[color,box-shadow]',
          focused && 'ring-4 ring-ring/10 outline-1 outline-ring/50',
        )}
      >
        <EditorContent
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          editor={editor}
          className="[&>div[contenteditable=true]]:py-2 [&>[contenteditable=true]]:px-3 [&>[contenteditable=true]]:flex-1 text-sm max-h-[200px] overflow-y-auto"
        />
        <BubbleMenu editor={editor}>
          <div className="px-3 py-2 bg-white rounded-md overflow-x-auto border">
            <FormattingControls editor={editor} />
          </div>
        </BubbleMenu>
      </div>
      <ModalEditor
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleSave}
      >
        <Button size="icon" variant="ghost" className="ml-auto">
          <FullscreenIcon />
        </Button>
      </ModalEditor>
    </div>
  )
}
