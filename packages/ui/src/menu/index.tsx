'use client'

import * as ContextMenu from '@radix-ui/react-context-menu'
import { ChevronRightIcon } from '@radix-ui/react-icons'
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

export function Menu(props: MenuProps) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger data-state="open">
        {props.children}
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <Scope stylesheet={stylesheet.render()}>
          <ContextMenu.Content className={styles.content}>
            <ContextMenu.Label className={styles.label}>
              <pre className={styles.key}>{props.deepdishKey}</pre>
            </ContextMenu.Label>

            <ContextMenu.Sub>
              <ContextMenu.SubTrigger className={styles.item}>
                Quick edit
                <div className={styles.rightSlot}>
                  <ChevronRightIcon />
                </div>
              </ContextMenu.SubTrigger>
              <ContextMenu.Portal>
                <Scope stylesheet={stylesheet.render()}>
                  <ContextMenu.SubContent
                    className={styles.content}
                    sideOffset={2}
                    alignOffset={-5}
                  >
                    <Editor value={props.value} onUpdate={props.onUpdate} />
                  </ContextMenu.SubContent>
                </Scope>
              </ContextMenu.Portal>
            </ContextMenu.Sub>
          </ContextMenu.Content>
        </Scope>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}
