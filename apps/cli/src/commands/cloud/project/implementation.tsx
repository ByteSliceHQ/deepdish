import { createAdminClient } from '@/cloud/clients'
import { Failure } from '@/components/failure'
import { Success } from '@/components/success'
import { Table } from '@/components/table'
import type { LocalContext } from '@/context'
import { withResult } from '@byteslice/result'
import { Text, render } from 'ink'
import Spinner from 'ink-spinner'

type Flags = {
  name: string
}

export async function createProject(
  this: LocalContext,
  flags: Flags,
): Promise<void> {
  const client = await createAdminClient(this)

  render(
    <Text>
      <Text color="green">
        <Spinner type="dots" />
      </Text>{' '}
      Creating project...
    </Text>,
  )

  const project = await withResult(
    () => client.projects.create.mutate({ name: flags.name }),
    (err) => err,
  )

  if (project.failure) {
    if (project.failure.message === 'CONFLICT') {
      render(<Text>You already have a project named "{flags.name}".</Text>)
    } else {
      render(<Failure message={project.failure.message} />)
    }

    this.process.exit(1)
  }

  render(<Success message="Success!" />)
}

export async function listProjects(this: LocalContext) {
  const client = await createAdminClient(this)

  const projects = await withResult(
    () => client.projects.list.query(),
    (err) => err,
  )

  if (projects.failure) {
    render(<Failure message={projects.failure.message} />)
    this.process.exit(1)
  }

  render(
    <Table keys={['name', 'id', 'alias', 'createdAt']} data={projects.data} />,
  )
}
