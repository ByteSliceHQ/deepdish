import { Box, Text } from 'ink'

export function Failure(props: { message: string }) {
  return (
    <Box flexDirection="column">
      <Text color="red">{props.message}</Text>
      <Text>
        If this issue persists, send us an email at help@byteslice.co, and we
        can help you out.
      </Text>
    </Box>
  )
}
