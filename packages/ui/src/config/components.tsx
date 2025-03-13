import type { Schema } from '@deepdish/core/schema'
import { DeepDish } from '../deepdish'
import type { Contracts } from './contract'

type Schemas<C extends Contracts> = {
  [K in keyof C]: C[K]['schema']
}

type Component<S extends Schema> = React.FC<
  Omit<React.ComponentProps<typeof DeepDish<S>>, 'contract'>
>

type Components<C extends Contracts, S extends Schemas<C>> = {
  [K in keyof S]: Component<S[K]>
}

export function createComponents<C extends Contracts>(contracts: C) {
  const components = {} as Components<C, Schemas<C>>
  for (const key in contracts) {
    type S = C[typeof key]['schema']
    components[key] = (props) => {
      return <DeepDish<S> {...props} contract={contracts[key]} />
    }
  }

  return components
}
