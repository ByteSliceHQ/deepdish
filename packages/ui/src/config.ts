import type { Resolver } from '@deepdish/resolvers'
import type { LinkValue } from './link'
import type { AudioValue, ImageValue, VideoValue } from './media'
import type { TypographyValue } from './typography'

type Maybe<T> = NonNullable<T> | undefined

export type ValueMap = {
  audio: AudioValue
  image: ImageValue
  link: LinkValue
  typography: TypographyValue
  video: VideoValue
}

export type ValueType = keyof ValueMap

type Config<T extends ValueType> = {
  readonly resolver: Resolver<ValueMap[T]>
}

type ConfigMap = {
  readonly [T in ValueType]?: Config<T>
}

let configMap: ConfigMap

export function configure(map: ConfigMap): void {
  if (configMap) {
    throw Error('Configuration map has already been initialized')
  }

  configMap = Object.freeze(map)
}

export function getConfig<T extends ValueType>(type: T): Maybe<Config<T>> {
  if (!configMap) {
    throw Error('Configuration map has not been initialized')
  }

  return configMap[type]
}
