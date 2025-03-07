'use client'

import { Button } from '@/components/ui/button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { Textarea } from '@/components/ui/textarea'
import { ShadowProvider, useShadowRoot } from '@/lib/context'
import { useMode } from '@deepdish/core/context'
import { useState } from 'react'

type EditorProps<V> = {
  value?: V
  onUpdate: (value: V) => Promise<void>
}

// TODO: direct "complex" content editing to workbench
function Editor<V>(props: EditorProps<V>) {
  if (typeof props.value !== 'string') {
    return <>Under Construction</>
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
  deepdishKey: string
  onUpdate: (value: V) => Promise<void>
  value?: V
  withShadow?: boolean
}

function MenuContent<V>(props: Omit<MenuProps<V>, 'children'>) {
  const shadowRoot = useShadowRoot()

  return (
    <ContextMenuContent className="w-64" portal={shadowRoot}>
      <ContextMenuLabel>
        <pre>{props.deepdishKey}</pre>
      </ContextMenuLabel>
      <ContextMenuSub>
        <ContextMenuSubTrigger inset>Quick edit</ContextMenuSubTrigger>
        <ContextMenuSubContent className="w-48 py-3 px-4">
          <Editor value={props.value} onUpdate={props.onUpdate} />
        </ContextMenuSubContent>
      </ContextMenuSub>
    </ContextMenuContent>
  )
}

export function Menu<V>(props: MenuProps<V>) {
  const mode = useMode()

  if (mode === 'view') {
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
