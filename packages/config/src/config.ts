import type { Result } from '@byteslice/result'
import { getLogger } from '@logtape/logtape'
import type { Contract } from './contract'
import { configureLogging } from './logging'
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

function configured() {
  const message = 'DeepDish has already been configured.'
  logger.warn(message)
  return { failure: new Error(message) }
}

function unconfigured() {
  const message = 'DeepDish has not been configured.'
  logger.error(message)
  return { failure: new Error(message) }
}

export function configure(input: Config): Result<void> {
  if (config) {
    return configured()
  }

  config = Object.freeze(input)

  configureLogging()

  logger.info('DeepDish configured successfully.')
  return { data: undefined }
}

export function getContract<T extends ValueType>(type: T): Result<Contract<T>> {
  if (!config) {
    return unconfigured()
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
    return unconfigured()
  }

  return { data: config.draft }
}
