'use client'

import { useMode } from '@deepdish/core/context'
import * as ContextMenu from '@radix-ui/react-context-menu'
import { ChevronRight } from 'lucide-react'
import { Scope } from 'react-shadow-scope'
import type { DeepDishElement2Props, DeepDishElementProps } from '../types'
import { Editor } from './editor'
import * as styles from './menu.css'
import { stylesheet } from './stylesheet'
import { Button } from './button'

type MenuProps<V> = {
  children: React.ReactNode
  onUpdate: (value: V) => Promise<void>
  deepdish: DeepDishElementProps
  value?: V
}

function SubMenuChevron() {
  return <ChevronRight size="1rem" />
}

export function Menu<V>(props: MenuProps<V>) {
  const mode = useMode()

  if (mode === 'view') {
    return props.children
  }

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger data-state="open">
        {props.children}
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <Scope stylesheet={stylesheet.render()}>
          <ContextMenu.Content className={styles.content}>
            <ContextMenu.Label className={styles.label}>
              <pre className={styles.key}>{props.deepdish.key}</pre>
            </ContextMenu.Label>

            <ContextMenu.Sub>
              <ContextMenu.SubTrigger className={styles.item}>
                Quick edit
                <div className={styles.rightSlot}>
                  <SubMenuChevron />
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

type Menu2Props<V> = {
  children: React.ReactNode
  onUpdate: (key: string, value: V) => Promise<void>
  deepdish: DeepDishElement2Props
  value?: V
}

export function Menu2<V>(props: Menu2Props<V>) {
  const mode = useMode()

  if (mode === 'view') {
    return props.children
  }

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger data-state="open">
        {props.children}
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <Scope stylesheet={stylesheet.render()}>
          <ContextMenu.Content className={styles.content}>
            <ContextMenu.Label className={styles.label}>
              <pre className={styles.key}>{props.deepdish.key}</pre>
            </ContextMenu.Label>

            <Button
              onClick={() => {
                if (props.value) {
                  props.onUpdate(props.deepdish.key, props.value)
                }
              }}
            >
              Update me!
            </Button>
          </ContextMenu.Content>
        </Scope>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}
