import { type Contracts, getSettings } from '@deepdish/ui/config'
import { toJsonSchema } from '@valibot/to-json-schema'
import { Provider } from './provider'

export function ProviderContainer(props: {
  contracts: Contracts
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

      return Object.keys(props.contracts)
    },
    getContractKeys: async (name: string) => {
      'use server'

      const contract = props.contracts[name]

      if (!contract) {
        throw new Error(`Contract '${name}' not found.`)
      }

      const keysResult = await contract.resolver.keys('*')

      if (keysResult.failure) {
        throw keysResult.failure
      }

      return keysResult.data
    },
    getKey: async (contractName: string, name: string) => {
      'use server'

      const contract = props.contracts[contractName]

      if (!contract) {
        throw new Error(`Contract '${contractName}' not found.`)
      }

      const readResult = await contract.resolver.read({ key: name })

      if (readResult.failure) {
        throw readResult.failure
      }

      return {
        content: readResult.data,
        name,
        schema: toJsonSchema(contract.schema),
      }
    },
    updateKey: async (contractName: string, name: string, content: unknown) => {
      'use server'

      const contract = props.contracts[contractName]

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
