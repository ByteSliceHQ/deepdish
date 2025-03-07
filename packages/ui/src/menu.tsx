'use client'

import { Menu as InternalMenu, type MenuProps } from '@deepdish/menu'
import { useMode } from '@deepdish/core/context'

export function Menu<V>(props: MenuProps<V>) {
  const mode = useMode()

  return <InternalMenu mode={mode} {...props} />
}
