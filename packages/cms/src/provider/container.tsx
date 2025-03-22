import { extractMetadata, serialize } from '@deepdish/core/schema'
import { getContracts, getSettings } from '@deepdish/ui/config'
import { Provider } from './provider'

export function ProviderContainer(props: {
  children: React.ReactNode
  title?: React.ReactNode
  authDisabled?: boolean
}) {
  const settings = getSettings()
  const draft = settings.failure ? false : settings.data.draft

  // TODO: error handling
  const procedures = {
    getContracts: async () => {
      'use server'

      const contractsResult = getContracts()

      if (contractsResult.failure) {
        throw contractsResult.failure
      }

      return Object.keys(contractsResult.data)
    },
    getContractKeys: async (name: string) => {
      'use server'

      const contractsResult = getContracts()

      if (contractsResult.failure) {
        throw contractsResult.failure
      }

      const contract = contractsResult.data[name]

      if (!contract) {
        throw new Error(`Contract '${name}' not found.`)
      }

      const keysResult = await contract.resolver.keys('*')

      if (keysResult.failure) {
        throw keysResult.failure
      }

      return keysResult.data
    },
    getContractMeta: async (name: string) => {
      'use server'

      const contractsResult = getContracts()

      if (contractsResult.failure) {
        throw contractsResult.failure
      }

      const contract = contractsResult.data[name]

      if (!contract) {
        throw new Error(`Contract '${name}' not found.`)
      }

      return extractMetadata(contract.schema)
    },
    getContractSchema: async (name: string) => {
      'use server'

      const contractsResult = getContracts()

      if (contractsResult.failure) {
        throw contractsResult.failure
      }

      const contract = contractsResult.data[name]

      if (!contract) {
        throw new Error(`Contract '${name}' not found.`)
      }

      return serialize(contract.schema)
    },
    getKey: async (contractName: string, name: string) => {
      'use server'

      const contractsResult = getContracts()

      if (contractsResult.failure) {
        throw contractsResult.failure
      }

      const contract = contractsResult.data[contractName]

      if (!contract) {
        throw new Error(`Contract '${contractName}' not found.`)
      }

      const readResult = await contract.resolver.read({ key: name })

      let content: unknown

      if (readResult.failure) {
        if (readResult.failure.type !== 'CONTENT_MISSING') {
          throw readResult.failure
        }

        content = null
      } else {
        content = readResult.data
      }

      return {
        content,
        name,
        schema: serialize(contract.schema),
      }
    },
    updateKey: async (contractName: string, name: string, content: unknown) => {
      'use server'

      const contractsResult = getContracts()

      if (contractsResult.failure) {
        throw contractsResult.failure
      }

      const contract = contractsResult.data[contractName]

      if (!contract) {
        throw new Error(`Contract '${contractName}' not found.`)
      }

      const writeResult = await contract.resolver.write({ key: name }, content)

      if (writeResult.failure) {
        throw writeResult.failure
      }
    },
  }

  return (
    <Provider
      draft={draft}
      title={props.title}
      authDisabled={props.authDisabled}
      procedures={procedures}
    >
      {props.children}
    </Provider>
  )
}
