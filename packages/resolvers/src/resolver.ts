type Context = { key: string }

type Read<Value> = (context: Context) => Promise<Value>

type Write<Value> = (context: Context, value: Value) => Promise<boolean>

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
