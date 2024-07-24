export function Audio(props: ElementProps<'audio'>) {
  // TODO: preferentially load from CMS
  const fallback = props.children
  const src = props.src

  return (
    <audio controls {...props} src={src}>
      {fallback}
    </audio>
  )
}

export function Image(props: ElementProps<'img'>) {
  // TODO: preferentially load from CMS
  const description = props.alt
  const src = props.src
  const title = props.title

  return <img {...props} alt={description} src={src} title={title} />
}

export function Video(props: ElementProps<'video'>) {
  // TODO: preferentially load from CMS
  const fallback = props.children
  const src = props.src

  return (
    <video controls {...props} src={src}>
      {fallback}
    </video>
  )
}
