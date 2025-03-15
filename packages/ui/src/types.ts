type Key = string

type Contract = string

type Pattern = string

type Collection = Pattern | Key[]

export type DeepDishCollectionProps = {
  collection: Collection
  contract: Contract
}

export type DeepDishElementProps = {
  collection?: never
  contract: Contract
  key: Key
}

export type DeepDishProps = DeepDishElementProps | DeepDishCollectionProps
