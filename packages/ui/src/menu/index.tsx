'use client'

import * as ContextMenu from '@radix-ui/react-context-menu'
import * as Dialog from '@radix-ui/react-dialog'
import { Scope } from 'react-shadow-scope'
import { Editor } from './editor'
import * as styles from './menu.css'
import { stylesheet } from './stylesheet'

type MenuProps = {
  children: React.ReactNode
  onUpdate: (value: string | null) => Promise<void>
  deepdishKey: string
  // TODO: this should be typed to the resolver schema
  value?: string | null
}

// TODO: split this component into menu and dialog
export function Menu(props: MenuProps) {
  return (
    <Dialog.Root>
      <ContextMenu.Root>
        <ContextMenu.Trigger data-state="open">
          {props.children}
        </ContextMenu.Trigger>
        <ContextMenu.Portal>
          <Scope stylesheet={stylesheet.toString()}>
            <ContextMenu.Content className={styles.content}>
              <ContextMenu.Label className={styles.label}>
                {props.deepdishKey}
              </ContextMenu.Label>
              <ContextMenu.Item className={styles.item}>
                <Dialog.Trigger asChild>
                  <button type="button">Edit</button>
                </Dialog.Trigger>
              </ContextMenu.Item>
            </ContextMenu.Content>
          </Scope>
        </ContextMenu.Portal>
      </ContextMenu.Root>
      <Dialog.Portal>
        <Scope stylesheet={stylesheet.toString()}>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Description>Content Editor</Dialog.Description>
          <Dialog.Content className={styles.dialogContent}>
            {/* TODO: include deepdish key in here */}
            <Dialog.Title>{props.deepdishKey}</Dialog.Title>
            <div>
              <Editor value={props.value} onUpdate={props.onUpdate} />
            </div>
            <Dialog.Close asChild>
              <button type="button" aria-label="Close">
                close
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Scope>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
