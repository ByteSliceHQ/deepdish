import { Text } from 'ink'

export function Success(props: { message: string }) {
  return <Text color="green">{props.message}</Text>
}
