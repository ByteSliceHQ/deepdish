import type { Schema, Value } from '@deepdish/core/schema'
import type { Contracts } from '../config/contract'
import { DeepDish } from '../deepdish'

type ContractComponent<S extends Schema> = React.ComponentType<
  Omit<React.ComponentProps<typeof DeepDish<Value<S>>>, 'contract'>
>

export function createContractComponent<S extends Schema>(
  schema: S,
  contract: string,
): ContractComponent<S> {
  return function ContractComponent(props) {
    return <DeepDish<Value<typeof schema>> {...props} contract={contract} />
  }
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function createComponents<C extends Contracts>(contracts: C) {
  type ContractComponents = {
    [P in keyof C as Capitalize<P & string>]: ContractComponent<C[P]['schema']>
  }

  return Object.fromEntries(
    Object.entries(contracts).map(([name, contract]) => [
      capitalize(name),
      createContractComponent(contract.schema, name),
    ]),
  ) as ContractComponents
}
