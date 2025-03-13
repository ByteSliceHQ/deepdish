import { delay } from '@/lib/utils'
import { catalog } from './data'

export const procedures = {
  getContracts: async () => {
    await delay(100)

    return Object.keys(catalog)
  },
  getContractKeys: async (name: string) => {
    await delay(100)

    if (!(name in catalog)) {
      throw new Error(`Contract '${name}' not found.`)
    }

    return Object.keys(catalog[name as keyof typeof catalog].keys)
  },
  getContractSchema: async (name: string) => {
    await delay(100)

    if (!(name in catalog)) {
      throw new Error(`Contract '${name}' not found.`)
    }

    return catalog[name as keyof typeof catalog].serializedSchema
  },
  getKey: async (contract: string, name: string) => {
    await delay(100)

    if (!(contract in catalog)) {
      throw new Error(`Contract '${contract}' not found.`)
    }

    const keys = catalog[contract as keyof typeof catalog].keys

    if (!(name in keys)) {
      throw new Error(`Key '${name}' not found.`)
    }

    const content = keys[name as keyof typeof keys]

    return {
      content,
      name,
      schema: catalog[contract as keyof typeof catalog].serializedSchema,
    }
  },
  updateKey: async (contract: string, name: string, content: unknown) => {
    await delay(100)

    if (!(contract in catalog)) {
      throw new Error(`Contract '${contract}' not found.`)
    }

    catalog[contract as keyof typeof catalog].keys = {
      ...catalog[contract as keyof typeof catalog].keys,
      [name]: content,
    }
  },
}
