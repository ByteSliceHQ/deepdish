type MediaProps = {
  className?: string
  src?: string
}

export function Audio(props: MediaProps) {
  return <audio className={props.className} controls muted src={props.src} />
}

type ImageProps = {
  alt?: string
}

export function Image(props: MediaProps & ImageProps) {
  return <img className={props.className} src={props.src} alt={props.alt} />
}

export function Video(props: MediaProps) {
  return <video className={props.className} controls muted src={props.src} />
}
