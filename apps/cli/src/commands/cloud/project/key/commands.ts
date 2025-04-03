import { buildCommand, buildRouteMap } from '@stricli/core'

export const cloudProjectKeyCreate = buildCommand({
  loader: async () => {
    const { createKey } = await import('./implementation')
    return createKey
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

export const cloudProjectKeyRoutes = buildRouteMap({
  routes: {
    create: cloudProjectKeyCreate,
  },
  docs: {
    brief: 'Cloud project commands',
  },
})
