'use client'

import { useEmitter, useMode } from '@deepdish/core/context'
import {
  Menu as InternalMenu,
  type MenuProps as InternalMenuProps,
} from '@deepdish/menu'

type MenuProps<V> = Omit<InternalMenuProps<V>, 'onEdit'>

export function Menu<V>(props: MenuProps<V>) {
  const mode = useMode()
  const emitter = useEmitter()

  function handleEdit() {
    emitter.emit('edit', {
      contract: props.deepdishContract,
      key: props.deepdishKey,
    })
  }

  return <InternalMenu mode={mode} onEdit={handleEdit} {...props} />
}
