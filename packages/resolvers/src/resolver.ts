import type { Context, Key, Maybe } from './types'

// TODO: support filtering, querying, pagination, etc.
type List = () => Promise<Key[]>

type Read<V> = (context: Context) => Promise<Maybe<V>>

type Write<V> = (context: Context, value: V) => Promise<void>

export type Resolver<V> = {
  list: List
  read: Read<V>
  write: Write<V>
}

export function createResolver<V>(
  list: List,
  read: Read<V>,
  write: Write<V>,
): Resolver<V> {
  return {
    list: async () => {
      'use server'

      try {
        const keys = await list()
        // TODO: validate keys
        return keys
      } catch (err) {
        // TODO: handle error
      }
    },
    read: async (context) => {
      'use server'

      try {
        const data = await read(context)
        // TODO: validate data
        return data
      } catch (err) {
        // TODO: handle error
      }
    },
    write: async (context, value) => {
      'use server'

      try {
        await write(context, value)
      } catch (err) {
        // TODO: handle error
      }
    },
  }
}
