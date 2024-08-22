import 'server-only'

import type {
  AudioValue,
  ImageValue,
  VideoValue,
} from '@deepdish/config/schemas'
import { DeepDish } from './deepdish'
import type { ElementProps } from './types'

export function Audio(props: ElementProps<'audio', string>) {
  return (
    <DeepDish<AudioValue>
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
      type="audio"
    />
  )
}

export function Image(props: ElementProps<'img'>) {
  return (
    <DeepDish<ImageValue>
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
      type="image"
    />
  )
}

export function Video(props: ElementProps<'video', string>) {
  return (
    <DeepDish<VideoValue>
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
      type="video"
    />
  )
}
