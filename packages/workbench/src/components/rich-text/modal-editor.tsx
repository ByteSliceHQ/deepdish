import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { EditorContent, useEditor } from '@tiptap/react'
import { useEffect, useState } from 'react'
import { useRichText } from './context'
import { extensions } from './extensions'
import { FormattingControls } from './formatting-controls'

export function ModalEditor(props: {
  children: React.ReactNode
  description?: React.ReactNode
  onOpenChange: (open: boolean) => void
  onSave: (content: string) => void
  open: boolean
}) {
  const [focused, setFocused] = useState(false)
  const [dirty, setDirty] = useState(false)
  const { editor: originalEditor } = useRichText()

  const modalEditor = useEditor({
    extensions,
    immediatelyRender: true,
    onUpdate: ({ editor }) => {
      setDirty(editor.getHTML() !== originalEditor.getHTML())
    },
  })

  function handleCancel() {
    props.onOpenChange(false)
  }

  function handleSave() {
    props.onSave(modalEditor.getHTML())
  }

  useEffect(() => {
    if (!props.open) {
      return
    }

    modalEditor.commands.setContent(originalEditor.getHTML())
  }, [props.open, originalEditor, modalEditor])

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="min-w-[96%] h-[96%] flex flex-col">
        <DialogHeader>
          <DialogTitle>Editing</DialogTitle>
          {props.description ? (
            <DialogDescription asChild>{props.description}</DialogDescription>
          ) : null}
        </DialogHeader>
        <div
          className={cn(
            'flex flex-col flex-1 min-h-[200px] w-full items-center editor border border-input rounded-md overflow-hidden shadow-xs transition-[color,box-shadow]',
            focused && 'ring-4 ring-ring/10 outline-1 outline-ring/50',
          )}
        >
          <EditorContent
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            editor={modalEditor}
            className="[&>div[contenteditable=true]]:py-4 [&>[contenteditable=true]]:px-5 [&>[contenteditable=true]]:w-full w-full text-sm flex flex-1 overflow-y-auto"
          />
          <div className="border-t py-2 px-3 w-full">
            <FormattingControls editor={modalEditor} />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button size="sm" onClick={handleSave} disabled={!dirty}>
            Save & return
          </Button>
          <Button variant="secondary" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
