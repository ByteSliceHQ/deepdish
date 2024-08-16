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

type Config<K extends keyof ValueMap> = {
  readonly resolver: Resolver<ValueMap[K]>
}

type ConfigMap = {
  readonly [K in keyof ValueMap]?: Config<K>
}

let configMap: ConfigMap

export function configure(map: ConfigMap): void {
  if (configMap) {
    throw Error('Configuration map has already been initialized')
  }

  configMap = Object.freeze(map)
}

export function getConfig<K extends keyof ValueMap>(type: K): Maybe<Config<K>> {
  if (!configMap) {
    throw Error('Configuration map has not been initialized')
  }

  return configMap[type]
}
