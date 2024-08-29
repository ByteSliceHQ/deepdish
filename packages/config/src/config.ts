import type { Resolver } from '@deepdish/resolvers'
import type { ConfigResult } from './result'
import type {
  AudioValue,
  ImageValue,
  LinkValue,
  TypographyValue,
  VideoValue,
} from './schemas'

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
    throw new Error('Configuration has already been initialized')
  }

  config = Object.freeze(input)
}

export function getContract<T extends ValueType>(type: T): Contract<T> {
  if (!config) {
    throw new Error('Configuration has not been initialized')
  }

  const contract = config.contracts[type]
  if (!contract) {
    throw new Error(`Missing "${type}" contract`)
  }

  return contract
}
