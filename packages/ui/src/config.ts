import type { Resolver } from '@deepdish/resolvers'
import type { LinkValue } from './link'
import type { AudioValue, ImageValue, VideoValue } from './media'
import type { TypographyValue } from './typography'

type Config = {
  audio?: {
    resolver: Resolver<AudioValue>
  }
  image?: {
    resolver: Resolver<ImageValue>
  }
  link?: {
    resolver: Resolver<LinkValue>
  }
  typography?: {
    resolver: Resolver<TypographyValue>
  }
  video?: {
    resolver: Resolver<VideoValue>
  }
}

export type ConfigType = keyof Config

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
