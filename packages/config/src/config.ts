import type { Result } from '@byteslice/result'
import { getLogger } from '@logtape/logtape'
import type { Contract } from './contract'
import type { ValueType } from './schemas'

const logger = getLogger(['deepdish', 'config'])

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
  logger.error(message)
  return { failure: new Error(message) }
}

export function configure(input: Config): Result<void> {
  if (config) {
    return failure('Configuration has already been initialized.')
  }

  config = Object.freeze(input)

  return { data: undefined }
}

export function getContract<T extends ValueType>(type: T): Result<Contract<T>> {
  if (!config) {
    return failure('Configuration has not been initialized.')
  }

  const contract = config.contracts[type]
  if (!contract) {
    logger.error('Missing {type} contract.', { type })
    return { failure: new Error(`Missing '${type}' contract`) }
  }

  return { data: contract }
}

export function getDraft(): Result<Config['draft']> {
  if (!config) {
    return failure('Configuration has not been initialized.')
  }

  return { data: config.draft }
}
