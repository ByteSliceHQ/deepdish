import type { Resolver } from '@deepdish/resolvers'
import type { ValueMap, ValueType } from './schemas'

export type Contract<T extends ValueType> = {
  readonly resolver: Resolver<ValueMap[T]>
}
