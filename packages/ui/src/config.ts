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

type ConfigMap = {
  readonly [key in keyof ValueMap]?: {
    readonly resolver: Resolver<ValueMap[key]>
  }
}

let configMap: ConfigMap

export function configure(map: ConfigMap): void {
  if (configMap) {
    throw Error('Configuration map has already been initialized')
  }

  configMap = Object.freeze(map)
}

export function getConfig(key: keyof ValueMap): ConfigMap[keyof ConfigMap] {
  if (!configMap) {
    throw Error('Configuration map has not been initialized')
  }

  return configMap[key]
}
