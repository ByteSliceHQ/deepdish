import type { DeepDishProps } from './types'

export async function DeepDish<V>(props: {
  deepdish: DeepDishProps<V>
  render: (value: V) => React.ReactNode
}) {
  const { key, resolver } = props.deepdish
  const value = await resolver.read({ key })

  if (value === null) {
    return null
  }

  return props.render(value)
}
