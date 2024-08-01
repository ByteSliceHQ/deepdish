import { DeepDish } from './deepdish'
import type { ElementProps } from './types'

type AudioValue = {
  fallback?: string
  src?: string
}

export function Audio(props: ElementProps<'audio', AudioValue, string>) {
  return (
    // @ts-expect-error Server Component
    <DeepDish
      deepdish={props.deepdish}
      fallback={{
        fallback: props.children,
        src: props.src,
      }}
      render={(content) => {
        return (
          <audio controls {...props} src={content?.src}>
            {content?.fallback}
          </audio>
        )
      }}
    />
  )
}

type ImageValue = {
  description?: string
  src?: string
  title?: string
}

export function Image(props: ElementProps<'img', ImageValue>) {
  return (
    // @ts-expect-error Server Component
    <DeepDish
      deepdish={props.deepdish}
      fallback={{
        description: props.alt,
        src: props.src,
        title: props.title,
      }}
      render={(content) => {
        return (
          <img
            {...props}
            alt={content?.description}
            src={content?.src}
            title={content?.title}
          />
        )
      }}
    />
  )
}

type VideoValue = {
  fallback?: string
  src?: string
}

export function Video(props: ElementProps<'video', VideoValue, string>) {
  return (
    // @ts-expect-error Server Component
    <DeepDish
      deepdish={props.deepdish}
      fallback={{
        fallback: props.children,
        src: props.src,
      }}
      render={(content) => {
        return (
          <video controls {...props} src={content?.src}>
            {content?.fallback}
          </video>
        )
      }}
    />
  )
}
