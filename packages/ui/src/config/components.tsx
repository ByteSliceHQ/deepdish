import type { Schema, Value } from '@deepdish/core/schema'
import { DeepDish } from '../deepdish'
import type { Contracts } from './contract'

type Schemas<C extends Contracts> = {
  [K in keyof C]: C[K]['schema']
}

type ComponentProps<S extends Schema> = Omit<
  React.ComponentProps<typeof DeepDish<Value<S>>>,
  'contract'
>

type Component<S extends Schema> = React.ComponentType<ComponentProps<S>>

type Components<C extends Contracts, S extends Schemas<C>> = {
  [K in keyof S]: Component<S[K]>
}

function createComponent<S extends Schema>(contract: string, schema: S) {
  return (props: ComponentProps<S>) => {
    return <DeepDish<Value<typeof schema>> {...props} contract={contract} />
  }
}

export function createComponents<C extends Contracts>(contracts: C) {
  const components = {} as Components<C, Schemas<C>>
  for (const name in contracts) {
    components[name] = createComponent(name, contracts[name].schema)
  }

  return components
}
