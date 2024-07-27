import type { DeepDish } from './types'

type AudioValue = {
  src: string
}

export function Audio(props: DeepDish<'audio', AudioValue, string>) {
  // TODO: preferentially load from CMS
  const fallback = props.children
  const src = props.src

  return (
    <audio controls {...props} src={src}>
      {fallback}
    </audio>
  )
}

type ImageValue = {
  alt: string
  src: string
  title: string
}

export function Image(props: DeepDish<'img', ImageValue>) {
  // TODO: preferentially load from CMS
  const description = props.alt
  const src = props.src
  const title = props.title

  return <img {...props} alt={description} src={src} title={title} />
}

type VideoValue = {
  src: string
}

export function Video(props: DeepDish<'video', VideoValue, string>) {
  // TODO: preferentially load from CMS
  const fallback = props.children
  const src = props.src

  return (
    <video controls {...props} src={src}>
      {fallback}
    </video>
  )
}
