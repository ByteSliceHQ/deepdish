import type { Schema, Value } from '@deepdish/core/schema'
import { DeepDish } from '../deepdish'
import type { Contracts, Render } from './contract'

type DeepDishProps<S extends Schema> = React.ComponentProps<
  typeof DeepDish<Value<S>>
>

type ContractComponent<S extends Schema> = React.ComponentType<
  Omit<DeepDishProps<S>, 'contract'>
>

type ElementComponent<
  S extends Schema,
  E extends HTMLElement,
> = React.ComponentType<
  Pick<DeepDishProps<S>, 'deepdish'> & React.HTMLAttributes<E>
>

function createContractComponent<S extends Schema>(
  schema: S,
  contract: string,
): ContractComponent<S> {
  return (props) => {
    return <DeepDish<Value<typeof schema>> {...props} contract={contract} />
  }
}

function createElementComponent<S extends Schema, E extends HTMLElement>(
  Component: ContractComponent<S>,
  render: Render<S, E>,
): ElementComponent<S, E> {
  return (props) => {
    const { deepdish, children, ...rest } = props

    return (
      <Component
        deepdish={deepdish}
        fallback={children}
        render={render.bind(null, rest)}
      />
    )
  }
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function createComponents<C extends Contracts>(contracts: C) {
  type ContractComponents = {
    [K in keyof C as Capitalize<K & string>]: ContractComponent<C[K]['schema']>
  }

  type ElementComponents = {
    [K in keyof C]: {
      [E in keyof NonNullable<C[K]['components']>]: ElementComponent<
        C[K]['schema'],
        HTMLElement
      >
    }
  }

  const contractComponents = Object.fromEntries(
    Object.entries(contracts).map(([name, contract]) => [
      capitalize(name),
      createContractComponent(contract.schema, name),
    ]),
  )

  const elementComponents = Object.fromEntries(
    Object.entries(contracts).map(([contractName, contract]) => [
      contractName,
      contract.components
        ? Object.fromEntries(
            Object.entries(contract.components).map(([name, render]) => [
              name,
              createElementComponent(
                contractComponents[capitalize(contractName)],
                render,
              ),
            ]),
          )
        : {},
    ]),
  )

  return {
    ...contractComponents,
    ...elementComponents,
  } as ContractComponents & ElementComponents
}
