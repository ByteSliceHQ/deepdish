import 'server-only'

import type { Value } from '@deepdish/core/schema'
import * as v from 'valibot'
import { DeepDish } from '../deepdish'
import type { ElementProps } from '../types'

export const linkSchema = v.object({
  destination: v.optional(v.string()),
  href: v.optional(v.string()),
  title: v.optional(v.string()),
})

type LinkValue = Value<typeof linkSchema>

export function Link(props: ElementProps<'a', string>) {
  return (
    <DeepDish<LinkValue>
      deepdish={props.deepdish}
      fallback={{
        destination: props.children,
        href: props.href,
        title: props.title,
      }}
      render={async (content) => {
        return (
          <a {...props} href={content?.href} title={content?.title}>
            {content?.destination}
          </a>
        )
      }}
    />
  )
}
