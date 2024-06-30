type LinkProps = {
  children?: string
  href?: string
}

export function Link(props: LinkProps) {
  return <a href={props.href}>{props.children}</a>
}
