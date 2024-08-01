import type { ElementProps } from './types'

type LinkValue = {
  href: string
  title: string
}

export function Link(props: ElementProps<'a', LinkValue, string>) {
  // TODO: preferentially load from CMS
  const destination = props.children
  const href = props.href
  const title = props.title

  return (
    <a {...props} href={href} title={title}>
      {destination}
    </a>
  )
}
