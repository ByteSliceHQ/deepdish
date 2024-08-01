import type { ElementProps } from './types'

type AudioValue = {
  fallback: string
  src: string
}

export function Audio(props: ElementProps<'audio', AudioValue, string>) {
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
  description: string
  src: string
  title: string
}

export function Image(props: ElementProps<'img', ImageValue>) {
  // TODO: preferentially load from CMS
  const description = props.alt
  const src = props.src
  const title = props.title

  return <img {...props} alt={description} src={src} title={title} />
}

type VideoValue = {
  fallback: string
  src: string
}

export function Video(props: ElementProps<'video', VideoValue, string>) {
  // TODO: preferentially load from CMS
  const fallback = props.children
  const src = props.src

  return (
    <video controls {...props} src={src}>
      {fallback}
    </video>
  )
}
