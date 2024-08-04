import 'server-only'

import { DeepDish } from './deepdish'
import type { ElementProps } from './types'

type AudioValue = {
  fallback?: string
  source?: string
}

export function Audio(props: ElementProps<'audio', AudioValue, string>) {
  return (
    <DeepDish
      deepdish={props.deepdish}
      fallback={{
        fallback: props.children,
        source: props.src,
      }}
      render={(content) => {
        return (
          <audio controls {...props} src={content?.source}>
            {content?.fallback}
          </audio>
        )
      }}
    />
  )
}

type ImageValue = {
  description?: string
  source?: string
  title?: string
}

export function Image(props: ElementProps<'img', ImageValue>) {
  return (
    <DeepDish
      deepdish={props.deepdish}
      fallback={{
        description: props.alt,
        source: props.src,
        title: props.title,
      }}
      render={(content) => {
        return (
          <img
            {...props}
            alt={content?.description}
            src={content?.source}
            title={content?.title}
          />
        )
      }}
    />
  )
}

type VideoValue = {
  fallback?: string
  source?: string
}

export function Video(props: ElementProps<'video', VideoValue, string>) {
  return (
    <DeepDish
      deepdish={props.deepdish}
      fallback={{
        fallback: props.children,
        source: props.src,
      }}
      render={(content) => {
        return (
          <video controls {...props} src={content?.source}>
            {content?.fallback}
          </video>
        )
      }}
    />
  )
}
