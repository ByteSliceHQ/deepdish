import type { DeepDishProps } from './types'

export async function DeepDish<V>(props: {
  deepdish?: DeepDishProps<V>
  fallback?: V
  render: (value?: V) => React.ReactNode
}) {
  if (props.deepdish) {
    const { key, resolver } = props.deepdish
    const value = await resolver.read({ key })

    if (value) {
      return props.render(value)
    }
  }

  return props.render(props.fallback)
}
