import type { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  ListIcon,
  ListOrderedIcon,
  TextQuoteIcon,
} from 'lucide-react'

export function FormattingControls(props: { editor: Editor }) {
  return (
    <div className="flex items-center gap-1 px-3 py-2 bg-white rounded-md border overflow-x-auto">
      <Button
        onClick={() => props.editor.chain().focus().toggleBold().run()}
        disabled={!props.editor.can().chain().focus().toggleBold().run()}
        variant={props.editor.isActive('bold') ? 'secondary' : 'ghost'}
      >
        <BoldIcon className="size-4" />
      </Button>
      <Button
        onClick={() => props.editor.chain().focus().toggleItalic().run()}
        disabled={!props.editor.can().chain().focus().toggleItalic().run()}
        variant={props.editor.isActive('italic') ? 'secondary' : 'ghost'}
      >
        <ItalicIcon className="size-4" />
      </Button>
      <Button
        onClick={() => props.editor.chain().focus().toggleStrike().run()}
        disabled={!props.editor.can().chain().focus().toggleStrike().run()}
        variant={props.editor.isActive('strike') ? 'secondary' : 'ghost'}
      >
        <StrikethroughIcon className="size-4" />
      </Button>
      <Button
        onClick={() => props.editor.chain().focus().toggleCode().run()}
        disabled={!props.editor.can().chain().focus().toggleCode().run()}
        variant={props.editor.isActive('code') ? 'secondary' : 'ghost'}
      >
        <CodeIcon className="size-4" />
      </Button>
      <Button
        onClick={() =>
          props.editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        variant={
          props.editor.isActive('heading', { level: 1 }) ? 'secondary' : 'ghost'
        }
      >
        <Heading1Icon className="size-4" />
      </Button>
      <Button
        onClick={() =>
          props.editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        variant={
          props.editor.isActive('heading', { level: 2 }) ? 'secondary' : 'ghost'
        }
      >
        <Heading2Icon className="size-4" />
      </Button>
      <Button
        onClick={() =>
          props.editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        variant={
          props.editor.isActive('heading', { level: 3 }) ? 'secondary' : 'ghost'
        }
      >
        <Heading3Icon className="size-4" />
      </Button>
      <Button
        onClick={() =>
          props.editor.chain().focus().toggleHeading({ level: 4 }).run()
        }
        variant={
          props.editor.isActive('heading', { level: 4 }) ? 'secondary' : 'ghost'
        }
      >
        <Heading4Icon className="size-4" />
      </Button>
      <Button
        onClick={() => props.editor.chain().focus().toggleBulletList().run()}
        variant={props.editor.isActive('bulletList') ? 'secondary' : 'ghost'}
      >
        <ListIcon className="size-4" />
      </Button>
      <Button
        onClick={() => props.editor.chain().focus().toggleOrderedList().run()}
        variant={props.editor.isActive('orderedList') ? 'secondary' : 'ghost'}
      >
        <ListOrderedIcon className="size-4" />
      </Button>
      <Button
        onClick={() => props.editor.chain().focus().toggleCodeBlock().run()}
        variant={props.editor.isActive('codeBlock') ? 'secondary' : 'ghost'}
      >
        <CodeIcon className="size-4" />
      </Button>
      <Button
        onClick={() => props.editor.chain().focus().toggleBlockquote().run()}
        variant={props.editor.isActive('blockquote') ? 'secondary' : 'ghost'}
      >
        <TextQuoteIcon className="size-4" />
      </Button>
    </div>
  )
}
