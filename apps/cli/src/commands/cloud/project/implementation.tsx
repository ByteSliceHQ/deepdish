import { createAdminClient } from '@/cloud/clients'
import { readActiveProjectFile, saveActiveProjectFile } from '@/cloud/project'
import { Failure } from '@/components/failure'
import { Success } from '@/components/success'
import { Table } from '@/components/table'
import { Warning } from '@/components/warning'
import type { LocalContext } from '@/context'
import { withResult } from '@byteslice/result'
import { Text, render } from 'ink'
import Spinner from 'ink-spinner'
import SelectInput from 'ink-select-input'

export async function createProject(
  this: LocalContext,
  flags: {
    name: string
  },
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

  const save = await withResult(
    () => saveActiveProjectFile(this, project.data.id),
    (err) => err,
  )

  if (save.failure) {
    render(<Warning message="Failed to make this your active project." />)
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

  const activeProject = await withResult(
    () => readActiveProjectFile(this),
    (err) => err,
  )

  const activeProjectId = activeProject.failure ? null : activeProject.data

  const data = projects.data.map((project) => ({
    ...project,
    active: project.id === activeProjectId,
  }))

  render(
    <Table keys={['active', 'name', 'id', 'alias', 'createdAt']} data={data} />,
  )
}

export async function selectProject(this: LocalContext) {
  const client = await createAdminClient(this)

  const projects = await withResult(
    () => client.projects.list.query(),
    (err) => err,
  )

  if (projects.failure) {
    render(<Failure message={projects.failure.message} />)
    this.process.exit(1)
  }

  const items = projects.data.map((project) => ({
    label: project.name,
    value: project.id,
  }))

  const handleSelect = async (item: { label: string; value: number }) => {
    await saveActiveProjectFile(this, item.value)

    const save = await withResult(
      () => saveActiveProjectFile(this, item.value),
      (err) => err,
    )

    if (save.failure) {
      render(<Warning message="Failed to make this your active project." />)
    }

    render(<Success message={`${item.label} is now your active project.`} />)
  }

  render(<SelectInput items={items} onSelect={handleSelect} />)
}
