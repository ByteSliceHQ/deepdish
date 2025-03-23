import { Color } from '@tiptap/extension-color'
import { ListItem } from '@tiptap/extension-list-item'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextStyle } from '@tiptap/extension-text-style'
import { Typography } from '@tiptap/extension-typography'
import { Underline } from '@tiptap/extension-underline'
import { StarterKit } from '@tiptap/starter-kit'

export const extensions = [
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
