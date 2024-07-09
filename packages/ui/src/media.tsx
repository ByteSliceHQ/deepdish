type MediaProps = {
  src?: string
}

export function Audio(props: MediaProps) {
  return <audio controls muted src={props.src} />
}

type ImageProps = {
  alt?: string
}

export function Image(props: MediaProps & ImageProps) {
  return <img src={props.src} alt={props.alt} />
}

export function Video(props: MediaProps) {
  return <video controls muted src={props.src} />
}
