import type { Resolver } from '@deepdish/resolvers'
import type { LinkValue } from './link'
import type { AudioValue, ImageValue, VideoValue } from './media'
import type { TypographyValue } from './typography'

type ValueMap = {
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

export function getContract<T extends ValueType>(type: T): Contract<T> {
  if (!config) {
    throw Error('Configuration has not been initialized')
  }

  const contract = config.contracts[type]
  if (!contract) {
    throw Error(`Missing "${type}" contract`)
  }

  return contract
}
