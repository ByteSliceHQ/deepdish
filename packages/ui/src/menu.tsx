'use client'

import { useEmitter, useMode } from '@deepdish/core/context'
import {
  Menu as InternalMenu,
  type MenuProps as InternalMenuProps,
} from '@deepdish/menu'

type MenuProps<V> = Omit<InternalMenuProps<V>, 'onRequestEdit'>

export function Menu<V>(props: MenuProps<V>) {
  const mode = useMode()
  const emitter = useEmitter()

  function handleEditRequest() {
    emitter.emit('edit.requested', {
      contract: props.deepdishContract,
      key: props.deepdishKey,
    })
  }

  return (
    <InternalMenu mode={mode} onRequestEdit={handleEditRequest} {...props} />
  )
}
