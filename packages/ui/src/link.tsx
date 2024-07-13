type LinkProps = JSX.IntrinsicElements['a']

export function Link(props: LinkProps) {
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
