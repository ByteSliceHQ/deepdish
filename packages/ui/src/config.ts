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

type Contract<T extends ValueType> = {
  readonly resolver: Resolver<ValueMap[T]>
}

type Config = {
  contracts: {
    readonly [T in ValueType]?: Contract<T>
  }
}

let config: Config

export function configure(input: Config): void {
  if (config) {
    throw Error('Configuration has already been initialized')
  }

  config = Object.freeze(input)
}

export function getContract<T extends ValueType>(type: T): Maybe<Contract<T>> {
  if (!config) {
    throw Error('Configuration has not been initialized')
  }

  return config.contracts[type]
}
