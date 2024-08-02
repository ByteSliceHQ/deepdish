import type { DeepDishProps } from './types'

export async function DeepDish<V>(props: {
  deepdish?: DeepDishProps<V>
  fallback?: V
  render: (value?: V) => React.ReactNode
}) {
  if (props.deepdish) {
    try {
      const { key, resolver } = props.deepdish
      const value = await resolver.read({ key })

      if (value) {
        return props.render(value)
      }

      // TODO: handle "missing" data
    } catch (err) {
      // TODO: handle error
    }
  }

  return props.render(props.fallback)
}
