import 'server-only'

import type { DeepDishProps } from './types'

export async function DeepDish<V>(props: {
  deepdish?: DeepDishProps
  fallback?: V
  render: (value?: V) => React.ReactElement
}) {
  if (props.deepdish) {
    try {
      const { key } = props.deepdish
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
