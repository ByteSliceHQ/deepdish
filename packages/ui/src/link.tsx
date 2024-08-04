import 'server-only'

import { z } from 'zod'
import { DeepDish } from './deepdish'
import type { ElementProps } from './types'

const linkSchema = z.object({
  destination: z.string().optional(),
  href: z.string().optional(),
  title: z.string().optional(),
})

type LinkValue = z.infer<typeof linkSchema>

export function Link(props: ElementProps<'a', LinkValue, string>) {
  return (
    <DeepDish
      deepdish={props.deepdish}
      fallback={{
        destination: props.children,
        href: props.href,
        title: props.title,
      }}
      render={(content) => {
        return (
          <a {...props} href={content?.href} title={content?.title}>
            {content?.destination}
          </a>
        )
      }}
    />
  )
}
