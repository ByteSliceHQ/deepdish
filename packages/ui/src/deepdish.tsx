import type { DeepDishProps } from './types'

export async function DeepDish<V>(props: {
  deepdish?: DeepDishProps<V>
  render: (value: V | null) => React.ReactNode
}) {
  if (!props.deepdish) {
    return props.render(null)
  }

  const { key, resolver } = props.deepdish
  const value = await resolver.read({ key })

  return props.render(value)
}
