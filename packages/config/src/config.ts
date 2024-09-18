import type { Result } from '@byteslice/result'
import type { Contract } from './contract'
import type { ValueType } from './schemas'

type Config = {
  contracts: {
    readonly [T in ValueType]?: Contract<T>
  }
}

let config: Config

export function configure(input: Config): Result<void> {
  if (config) {
    const error = new Error('Configuration has already been initialized')
    console.error(error.message)
    return { failure: error }
  }

  config = Object.freeze(input)

  return { data: undefined }
}

export function getContract<T extends ValueType>(type: T): Result<Contract<T>> {
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
