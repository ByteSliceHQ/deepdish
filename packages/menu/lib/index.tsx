'use client'

import '../src/index.css'
import { Menu as InternalMenu, type MenuProps } from '@/menu'

export function Menu<V>(props: MenuProps<V>) {
  return <InternalMenu withShadow {...props} />
}
