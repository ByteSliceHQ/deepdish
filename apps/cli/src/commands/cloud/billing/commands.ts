import { buildCommand, buildRouteMap } from '@stricli/core'

export const cloudBillingOpen = buildCommand({
  loader: async () => {
    const { openBillingPage } = await import('./implementation')
    return openBillingPage
  },
  parameters: {
    positional: {
      kind: 'tuple',
      parameters: [],
    },
  },
  docs: {
    brief: 'Open the billing page',
  },
})

export const cloudBillingRoutes = buildRouteMap({
  routes: {
    open: cloudBillingOpen,
  },
  docs: {
    brief: 'Cloud billing commands',
  },
})
