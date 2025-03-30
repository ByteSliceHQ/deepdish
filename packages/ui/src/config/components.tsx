import type { Schema, Value } from '@deepdish/core/schema'
import { DeepDish } from '../deepdish'
import type { Contracts } from './contract'

type ComponentProps<S extends Schema> = Omit<
  React.ComponentProps<typeof DeepDish<Value<S>>>,
  'contract'
>

type Component<S extends Schema> = React.ComponentType<ComponentProps<S>>

function createComponent<S extends Schema>(contract: string, schema: S) {
  return (props: ComponentProps<S>) => {
    return <DeepDish<Value<typeof schema>> {...props} contract={contract} />
  }
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function createComponents<C extends Contracts>(contracts: C) {
  type ContractComponentKeys<K extends keyof C> =
    | Capitalize<K & string>
    | keyof NonNullable<C[K]['components']>

  type Components = {
    [K in keyof C]: {
      [P in ContractComponentKeys<K>]: Component<C[K]['schema']>
    }
  }

  return Object.fromEntries(
    Object.entries(contracts).map(([contractName, contract]) => {
      type ComponentKeys =
        | Capitalize<typeof contractName>
        | keyof NonNullable<typeof contract.components>

      const contractComponents = {} as Record<
        ComponentKeys,
        Component<typeof contract.schema>
      >

      contractComponents[capitalize(contractName)] = createComponent(
        contractName,
        contract.schema,
      )

      for (const componentName in contract.components) {
        contractComponents[componentName] = createComponent(
          contractName,
          contract.schema,
        )
      }

      return [contractName, contractComponents]
    }),
  ) as Components
}
