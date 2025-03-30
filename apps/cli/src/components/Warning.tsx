import { Text } from 'ink'

export function Warning(props: { message: string }) {
  return <Text color="yellow">{props.message}</Text>
}
