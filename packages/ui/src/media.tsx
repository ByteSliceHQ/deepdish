import 'server-only'

import { z } from 'zod'
import { DeepDish } from './deepdish'
import type { ElementProps } from './types'

const audioSchema = z.object({
  fallback: z.string().optional(),
  source: z.string().optional(),
})

type AudioValue = z.infer<typeof audioSchema>

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

const imageSchema = z.object({
  description: z.string().optional(),
  source: z.string().optional(),
  title: z.string().optional(),
})

type ImageValue = z.infer<typeof imageSchema>

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

const videoSchema = z.object({
  fallback: z.string().optional(),
  source: z.string().optional(),
})

type VideoValue = z.infer<typeof videoSchema>

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
