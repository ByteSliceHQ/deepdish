import { buildCommand, buildRouteMap } from '@stricli/core'

export const cloudProjectCreate = buildCommand({
  loader: async () => {
    const { createProject } = await import('./implementation')
    return createProject
  },
  parameters: {
    flags: {
      name: {
        brief: 'Project name',
        kind: 'parsed',
        parse: String,
        optional: false,
      },
    },
    positional: {
      kind: 'tuple',
      parameters: [],
    },
  },
  docs: {
    brief: 'Create a new project',
  },
})

export const cloudProjectList = buildCommand({
  loader: async () => {
    const { listProjects } = await import('./implementation')
    return listProjects
  },
  parameters: {
    positional: {
      kind: 'tuple',
      parameters: [],
    },
  },
  docs: {
    brief: 'List all of your projects',
  },
})

export const cloudProjectRoutes = buildRouteMap({
  routes: {
    create: cloudProjectCreate,
    list: cloudProjectList,
  },
  docs: {
    brief: 'Cloud project commands',
  },
})
