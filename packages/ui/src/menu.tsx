'use client'

import { useMode } from '@deepdish/core/context'
import { Menu as InternalMenu, type MenuProps } from '@deepdish/menu'

export function Menu<V>(props: MenuProps<V>) {
  const mode = useMode()

  return <InternalMenu mode={mode} {...props} />
}
