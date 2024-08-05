import type { Context, Maybe } from './types'

type Read<V> = (context: Context) => Promise<Maybe<V>>

type Write<V> = (context: Context, value: V) => Promise<void>

export type Resolver<V> = {
  read: Read<V>
  write: Write<V>
}

export function createResolver<V>(read: Read<V>, write: Write<V>): Resolver<V> {
  return {
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
