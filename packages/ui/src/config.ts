import type { Resolver } from '@deepdish/resolvers'
import type { LinkValue } from './link'
import type { AudioValue, ImageValue, VideoValue } from './media'
import type { TypographyValue } from './typography'

export type ValueMap = {
  audio: AudioValue
  image: ImageValue
  link: LinkValue
  typography: TypographyValue
  video: VideoValue
}

type Config = {
  [key in keyof ValueMap]?: {
    resolver: Resolver<ValueMap[key]>
  }
}

let config: Config

export function makeConfig(input: Config): void {
  if (config) {
    throw Error('Configuration has already been initialized')
  }

  config = Object.freeze(input)
}

export function getConfig(): Config {
  if (!config) {
    throw Error('Configuration has not been initialized')
  }

  return config
}
