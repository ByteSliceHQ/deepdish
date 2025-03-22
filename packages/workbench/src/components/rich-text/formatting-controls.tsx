import { Button } from '@/components/ui/button'
import type { Editor } from '@tiptap/react'
import {
  BoldIcon,
  BracesIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  StrikethroughIcon,
  TextQuoteIcon,
} from 'lucide-react'

function FormatButton(props: {
  active?: boolean
  children: React.ReactNode
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <Button
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
      variant={props.active ? 'secondary' : 'ghost'}
    >
      {props.children}
    </Button>
  )
}

export function FormattingControls(props: { editor: Editor }) {
  return (
    <div className="flex items-center gap-1 px-3 py-2 bg-white rounded-md border overflow-x-auto">
      <FormatButton
        active={props.editor.isActive('bold')}
        onClick={() => props.editor.chain().focus().toggleBold().run()}
        disabled={!props.editor.can().chain().focus().toggleBold().run()}
      >
        <BoldIcon className="size-4" />
      </FormatButton>
      <FormatButton
        active={props.editor.isActive('italic')}
        onClick={() => props.editor.chain().focus().toggleItalic().run()}
        disabled={!props.editor.can().chain().focus().toggleItalic().run()}
      >
        <ItalicIcon className="size-4" />
      </FormatButton>
      <FormatButton
        active={props.editor.isActive('strike')}
        onClick={() => props.editor.chain().focus().toggleStrike().run()}
        disabled={!props.editor.can().chain().focus().toggleStrike().run()}
      >
        <StrikethroughIcon className="size-4" />
      </FormatButton>
      <FormatButton
        active={props.editor.isActive('code')}
        onClick={() => props.editor.chain().focus().toggleCode().run()}
        disabled={!props.editor.can().chain().focus().toggleCode().run()}
      >
        <CodeIcon className="size-4" />
      </FormatButton>
      <FormatButton
        active={props.editor.isActive('heading', { level: 1 })}
        onClick={() =>
          props.editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1Icon className="size-4" />
      </FormatButton>
      <FormatButton
        active={props.editor.isActive('heading', { level: 2 })}
        onClick={() =>
          props.editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2Icon className="size-4" />
      </FormatButton>
      <FormatButton
        active={props.editor.isActive('heading', { level: 3 })}
        onClick={() =>
          props.editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3Icon className="size-4" />
      </FormatButton>
      <FormatButton
        active={props.editor.isActive('heading', { level: 4 })}
        onClick={() =>
          props.editor.chain().focus().toggleHeading({ level: 4 }).run()
        }
      >
        <Heading4Icon className="size-4" />
      </FormatButton>
      <FormatButton
        active={props.editor.isActive('bulletList')}
        onClick={() => props.editor.chain().focus().toggleBulletList().run()}
      >
        <ListIcon className="size-4" />
      </FormatButton>
      <FormatButton
        active={props.editor.isActive('orderedList')}
        onClick={() => props.editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrderedIcon className="size-4" />
      </FormatButton>
      <FormatButton
        active={props.editor.isActive('codeBlock')}
        onClick={() => props.editor.chain().focus().toggleCodeBlock().run()}
      >
        <BracesIcon className="size-4" />
      </FormatButton>
      <FormatButton
        active={props.editor.isActive('blockquote')}
        onClick={() => props.editor.chain().focus().toggleBlockquote().run()}
      >
        <TextQuoteIcon className="size-4" />
      </FormatButton>
    </div>
  )
}
