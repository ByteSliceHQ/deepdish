type Key = string

type Pattern = string

type Collection = Pattern | Key[]

export type DeepDishCollectionProps = {
  collection: Collection
}

export type DeepDishElementProps = {
  collection?: never
  key: Key
}

export type DeepDishProps = DeepDishElementProps | DeepDishCollectionProps
