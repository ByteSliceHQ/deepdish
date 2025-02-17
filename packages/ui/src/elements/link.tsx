import 'server-only'

import { DeepDish } from '../deepdish'
import type { LinkValue } from '../schemas'
import type { ElementProps } from '../types'

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
      type="link"
    />
  )
}
