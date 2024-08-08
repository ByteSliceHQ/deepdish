import 'server-only'

import type { DeepDishProps } from './types'

export async function DeepDish<V>(props: {
  deepdish?: DeepDishProps<V>
  fallback?: V
  render: (value?: V) => React.ReactElement
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

export async function Collection<V>(props: {
  deepdish?: Omit<DeepDishProps<V>, 'key'>
  render: (value?: V) => React.ReactElement
}) {
  if (props.deepdish) {
    try {
      const { resolver } = props.deepdish
      const keys = await resolver.list()

      return (
        <>
          {keys.map(async (key) => {
            return (
              <DeepDish
                key={key.key}
                deepdish={{
                  key: key.key,
                  resolver,
                }}
                render={props.render}
              />
            )
          })}
        </>
      )
    } catch (err) {
      // TODO: handle error
    }
  }

  return null
}
