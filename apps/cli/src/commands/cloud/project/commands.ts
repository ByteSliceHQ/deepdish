import { buildCommand, buildRouteMap } from '@stricli/core'
import { cloudProjectKeyRoutes } from './key/commands'

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

export const cloudProjectSelect = buildCommand({
  loader: async () => {
    const { selectProject } = await import('./implementation')
    return selectProject
  },
  parameters: {
    positional: {
      kind: 'tuple',
      parameters: [],
    },
  },
  docs: {
    brief: 'Select a project to be your active one',
  },
})

export const cloudProjectRoutes = buildRouteMap({
  routes: {
    create: cloudProjectCreate,
    key: cloudProjectKeyRoutes,
    list: cloudProjectList,
    select: cloudProjectSelect,
  },
  docs: {
    brief: 'Cloud project commands',
  },
})
