type Context = { key: string }

// TODO: enhance error return type
type Read<Value> = (context: Context) => Promise<Value | null>

// TODO: enhance error return type
type Write<Value> = (
  context: Context,
  value: Value,
) => Promise<undefined | null>

export type Resolver<Value> = {
  read: Read<Value>
  write: Write<Value>
}

export function createResolver<Value>(
  read: Read<Value>,
  write: Write<Value>,
): Resolver<Value> {
  return { read, write }
}
