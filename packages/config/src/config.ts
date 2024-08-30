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

export function configure(input: Config): ConfigResult<void> {
  if (config) {
    const error = new Error('Configuration has already been initialized')
    console.error(error.message)
    return { failure: error }
  }

  config = Object.freeze(input)
  return { data: undefined }
}

export function getContract<T extends ValueType>(
  type: T,
): ConfigResult<Contract<T>> {
  if (!config) {
    const error = new Error('Configuration has not been initialized')
    console.error(error.message)
    return { failure: error }
  }

  const contract = config.contracts[type]
  if (!contract) {
    const error = new Error(`Missing contract: ${type}`)
    console.error(error.message)
    return { failure: error }
  }

  return { data: contract }
}
