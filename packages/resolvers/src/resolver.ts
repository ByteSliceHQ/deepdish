type Read<Context, Value> = (context: Context) => Promise<Value>

type Write<Context, Value> = (
  context: Context,
  value: Value,
) => Promise<boolean>

type Resolver<Context, Value> = {
  read: Read<Context, Value>
  write: Write<Context, Value>
}

export function createResolver<Context, Value>(
  read: Read<Context, Value>,
  write: Write<Context, Value>,
): Resolver<Context, Value> {
  return { read, write }
}
