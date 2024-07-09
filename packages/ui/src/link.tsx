type LinkProps = {
  children?: string
  className?: string
  href?: string
}

export function Link(props: LinkProps) {
  return (
    <a href={props.href} className={props.className}>
      {props.children}
    </a>
  )
}
