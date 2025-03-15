'use client'

import { useEmitter, useMode } from '@deepdish/core/context'
import {
  Menu as InternalMenu,
  type MenuProps as InternalMenuProps,
} from '@deepdish/menu'
import { useRouter } from 'next/navigation'

type MenuProps<V> = Omit<InternalMenuProps<V>, 'onRequestEdit'>

export function Menu<V>(props: MenuProps<V>) {
  const mode = useMode()
  const emitter = useEmitter()
  const router = useRouter()

  function handleEditRequest() {
    emitter.emit('edit.requested', {
      contract: props.deepdishContract,
      key: props.deepdishKey,
    })
  }

  async function handleUpdate(value: V) {
    await props.onUpdate(value)
    router.refresh()
  }

  return (
    <InternalMenu
      {...props}
      mode={mode}
      onRequestEdit={handleEditRequest}
      onUpdate={handleUpdate}
    />
  )
}
