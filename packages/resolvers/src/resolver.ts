import type { Context, Maybe } from './types'

type Read<Value> = (context: Context) => Promise<Maybe<Value>>

type Write<Value> = (context: Context, value: Value) => Promise<void>

export type Resolver<Value> = {
  read: Read<Value>
  write: Write<Value>
}

export function createResolver<Value>(
  read: Read<Value>,
  write: Write<Value>,
): Resolver<Value> {
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
