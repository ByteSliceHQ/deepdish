import type { Result } from '@byteslice/result'
import type { Schema } from '@deepdish/core/schema'
import { getLogger } from '@logtape/logtape'
import type { Contract, Contracts } from './contract'
import { configureLogging } from './logging'

const logger = getLogger(['deepdish', 'config'])

type Logging = Readonly<{
  enabled: boolean
}>

type Settings = Readonly<{
  baseUrl: string
  draft: boolean
}>

export type Config = Readonly<{
  contracts: Contracts
  logging: Logging
  settings: Settings
}>

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

  await configureLogging(config.logging.enabled)

  logger.info('DeepDish configured successfully.')
  return { data: undefined }
}

export function getContract(name: string): Result<Contract<Schema>> {
  if (!config) {
    return notConfigured()
  }

  const contract = config.contracts[name]
  if (!contract) {
    logger.error('Missing {name} contract.', { name })
    return { failure: new Error(`Missing '${name}' contract.`) }
  }

  return { data: contract }
}

export function getContracts(): Result<Contracts> {
  if (!config) {
    return notConfigured()
  }

  return { data: config.contracts }
}

export function getSettings(): Result<Settings> {
  if (!config) {
    return notConfigured()
  }

  return { data: config.settings }
}
