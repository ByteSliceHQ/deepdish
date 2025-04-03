import { createAdminClient } from '@/cloud/clients'
import { readActiveProjectFile } from '@/cloud/project'
import { Failure } from '@/components/failure'
import { Success } from '@/components/success'
import type { LocalContext } from '@/context'
import { withResult } from '@byteslice/result'
import { Box, Text, render } from 'ink'

export async function createKey(this: LocalContext) {
  const client = await createAdminClient(this)

  const activeProject = await withResult(
    () => readActiveProjectFile(this),
    (err) => err,
  )

  if (activeProject.failure) {
    render(
      <Failure message="You must have an active project in order to create a key." />,
    )
    this.process.exit(1)
  }

  const result = await withResult(
    () => client.projects.createKey.mutate({ projectId: activeProject.data }),
    (err) => err,
  )

  if (result.failure) {
    render(<Failure message={result.failure.message} />)
    this.process.exit(1)
  }

  render(
    <Box flexDirection="column">
      <Success
        message={`Successfully created a key in your active project! Copy the following key to your clipboard. You won't be able to see it again.`}
      />
      <Text>{result.data.key}</Text>
    </Box>,
  )
}
