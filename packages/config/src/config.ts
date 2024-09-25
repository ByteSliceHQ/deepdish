import type { Result } from '@byteslice/result'
import type { Contract } from './contract'
import type { ValueType } from './schemas'

type Config = {
  contracts: {
    readonly [T in ValueType]?: Contract<T>
  }
  draft: {
    auth: () => boolean | Promise<boolean>
  }
}

let config: Config

function failure(message: string) {
  console.error(message)
  return { failure: new Error(message) }
}

export function configure(input: Config): Result<void> {
  if (config) {
    return failure('Configuration has already been initialized')
  }

  config = Object.freeze(input)

  return { data: undefined }
}

export function getContract<T extends ValueType>(type: T): Result<Contract<T>> {
  if (!config) {
    return failure('Configuration has not been initialized')
  }

  const contract = config.contracts[type]
  if (!contract) {
    return failure(`Missing contract: ${type}`)
  }

  return { data: contract }
}

export function getDraft(): Result<Config['draft']> {
  if (!config) {
    const error = new Error('Configuration has not been initialized')
    console.error(error.message)
    return { failure: error }
  }

  return { data: config.draft }
}
