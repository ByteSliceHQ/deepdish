import 'server-only'

import { DeepDish } from '../deepdish'
import type { ElementProps } from '../types'
import type { LinkValue } from '../schemas'

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
