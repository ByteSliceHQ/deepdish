import 'server-only'

import type { Value } from '@deepdish/core/schema'
import * as v from 'valibot'
import { DeepDish } from '../deepdish'
import type { ElementProps } from '../types'

export const audioSchema = v.object({
  fallback: v.optional(v.string()),
  source: v.optional(v.string()),
})

type AudioValue = Value<typeof audioSchema>

export function Audio(props: ElementProps<'audio', string>) {
  return (
    <DeepDish<AudioValue>
      deepdish={props.deepdish}
      fallback={{
        fallback: props.children,
        source: props.src,
      }}
      render={async (content) => {
        return (
          <audio controls {...props} src={content?.source}>
            {content?.fallback}
          </audio>
        )
      }}
    />
  )
}

export const imageSchema = v.object({
  description: v.optional(v.string()),
  source: v.optional(v.string()),
  title: v.optional(v.string()),
})

type ImageValue = Value<typeof imageSchema>

export function Image(props: ElementProps<'img'>) {
  return (
    <DeepDish<ImageValue>
      deepdish={props.deepdish}
      fallback={{
        description: props.alt,
        source: props.src,
        title: props.title,
      }}
      render={async (content) => {
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

export const videoSchema = v.object({
  fallback: v.optional(v.string()),
  source: v.optional(v.string()),
})

type VideoValue = Value<typeof videoSchema>

export function Video(props: ElementProps<'video', string>) {
  return (
    <DeepDish<VideoValue>
      deepdish={props.deepdish}
      fallback={{
        fallback: props.children,
        source: props.src,
      }}
      render={async (content) => {
        return (
          <video controls {...props} src={content?.source}>
            {content?.fallback}
          </video>
        )
      }}
    />
  )
}
