type AudioProps = JSX.IntrinsicElements['audio']

export function Audio(props: AudioProps) {
  // TODO: preferentially load from CMS
  const fallback = props.children
  const src = props.src

  return (
    <audio controls {...props} src={src}>
      {fallback}
    </audio>
  )
}

type ImageProps = JSX.IntrinsicElements['img']

export function Image(props: ImageProps) {
  // TODO: preferentially load from CMS
  const description = props.alt
  const src = props.src
  const title = props.title

  return <img {...props} alt={description} src={src} title={title} />
}

type VideoProps = JSX.IntrinsicElements['video']

export function Video(props: VideoProps) {
  // TODO: preferentially load from CMS
  const fallback = props.children
  const src = props.src

  return (
    <video controls {...props} src={src}>
      {fallback}
    </video>
  )
}
