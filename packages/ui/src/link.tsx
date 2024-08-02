import { DeepDish } from './deepdish'
import type { ElementProps } from './types'

type LinkValue = {
  destination?: string
  href?: string
  title?: string
}

export function Link(props: ElementProps<'a', LinkValue, string>) {
  return (
    // @ts-expect-error server component
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
