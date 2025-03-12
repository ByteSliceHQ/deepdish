'use client'

import { Button } from '@/components/ui/button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { Textarea } from '@/components/ui/textarea'
import { ShadowProvider, useShadowRoot } from '@/lib/context'
import { useState } from 'react'

type EditorProps<V> = {
  value?: V
  onUpdate: (value: V) => Promise<void>
}

function Editor<V>(props: EditorProps<V>) {
  if (typeof props.value !== 'string') {
    return null
  }

  return (
    <TypographyEditor
      value={props.value}
      onUpdate={props.onUpdate as (value: string) => Promise<void>}
    />
  )
}

function TypographyEditor(props: EditorProps<string>) {
  const [value, setValue] = useState<string>(props.value || '')
  const [loading, setLoading] = useState<boolean>(false)

  const handleUpdate = async () => {
    try {
      setLoading(true)
      await props.onUpdate(value)
      window.location.reload()
    } catch (err) {
      // TODO: handle this properly
      console.error('Error updating content', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        handleUpdate()
      }}
    >
      <Textarea
        value={value}
        disabled={loading}
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyDown={(e) => {
          // NB: ensures sub menu isn't closed when arrow keys are pressed
          e.stopPropagation()

          if (e.metaKey && e.key === 'Enter') {
            e.preventDefault()
            handleUpdate()
          }
        }}
      />
      <Button size="sm" type="submit" variant="secondary" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </Button>
    </form>
  )
}

export type MenuProps<V> = {
  children: React.ReactNode
  deepdishContract: string
  deepdishKey: string
  mode?: 'view' | 'edit'
  onRequestEdit: () => void
  onUpdate: (value: V) => Promise<void>
  value?: V
  withShadow?: boolean
}

function MenuContent<V>(props: Omit<MenuProps<V>, 'children'>) {
  const shadowRoot = useShadowRoot()

  return (
    <ContextMenuContent className="w-64" portal={shadowRoot}>
      <ContextMenuLabel inset>
        <pre className="text-muted-foreground">{props.deepdishContract}</pre>
      </ContextMenuLabel>
      <ContextMenuLabel inset>
        <pre className="font-bold">{props.deepdishKey}</pre>
      </ContextMenuLabel>
      <ContextMenuSeparator />
      <ContextMenuItem inset onClick={props.onRequestEdit}>
        Edit in Workbench
      </ContextMenuItem>
      {typeof props.value === 'string' ? (
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Quick Edit</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48 py-3 px-4">
            <Editor value={props.value} onUpdate={props.onUpdate} />
          </ContextMenuSubContent>
        </ContextMenuSub>
      ) : null}
    </ContextMenuContent>
  )
}

export function Menu<V>(props: MenuProps<V>) {
  if (props.mode === 'view') {
    return props.children
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
      <ShadowProvider enabled={props.withShadow}>
        <MenuContent {...props} />
      </ShadowProvider>
    </ContextMenu>
  )
}
