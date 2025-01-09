import type { Result } from '@byteslice/result'
import { getLogger } from '@logtape/logtape'
import type { ValueType } from '../schemas'
import type { Contract } from './contract'
import { configureLogging } from './logging'

const logger = getLogger(['deepdish', 'config'])

export type Config = {
  baseUrl: string
  contracts: {
    readonly [T in ValueType]?: Contract<T>
  }
}

let config: Config

function configured() {
  const message = 'DeepDish has already been configured.'
  logger.warn(message)
  return { failure: new Error(message) }
}

function notConfigured() {
  const message = 'DeepDish has not been configured.'
  console.error(message)
  return { failure: new Error(message) }
}

export async function configure(input: Config): Promise<Result<void>> {
  if (config) {
    return configured()
  }

  config = Object.freeze(input)

  await configureLogging()

  logger.info('DeepDish configured successfully.')
  return { data: undefined }
}

export function getContract<T extends ValueType>(type: T): Result<Contract<T>> {
  if (!config) {
    return notConfigured()
  }

  const contract = config.contracts[type]
  if (!contract) {
    logger.error('Missing {type} contract.', { type })
    return { failure: new Error(`Missing '${type}' contract.`) }
  }

  return { data: contract }
}

export function getBaseUrl(): Result<string> {
  if (!config) {
    return notConfigured()
  }

  return { data: config.baseUrl }
}
