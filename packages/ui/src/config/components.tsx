import { DeepDish } from '../deepdish'
import type { Contracts, Schema, Value } from './contract'

type Schemas<C extends Contracts> = {
  [K in keyof C]: C[K]['schema']
}

type Component<S extends Schema> = React.FC<
  React.ComponentProps<typeof DeepDish<Value<S>>>
>

type Components<C extends Contracts, S extends Schemas<C>> = {
  [K in keyof S]: Component<S[K]>
}

export function createComponents<C extends Contracts>(contracts: C) {
  const components = {} as Components<C, Schemas<C>>
  for (const key in contracts) {
    type V = Value<C[typeof key]['schema']>
    components[key] = DeepDish<V>
  }

  return components
}
