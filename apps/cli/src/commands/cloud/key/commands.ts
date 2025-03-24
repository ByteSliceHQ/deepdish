import { buildCommand, buildRouteMap } from '@stricli/core'

export const cloudKeyCreate = buildCommand({
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
    brief: 'Create a new API key',
  },
})

export const cloudKeyList = buildCommand({
  loader: async () => {
    const { listKeys } = await import('./implementation')
    return listKeys
  },
  parameters: {
    positional: {
      kind: 'tuple',
      parameters: [],
    },
  },
  docs: {
    brief: 'List all API keys',
  },
})

export const cloudKeyRoutes = buildRouteMap({
  routes: {
    create: cloudKeyCreate,
    list: cloudKeyList,
  },
  docs: {
    brief: 'Cloud API key commands',
  },
})
