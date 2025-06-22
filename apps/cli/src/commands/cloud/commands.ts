import { buildRouteMap } from '@stricli/core'
import { cloudAuthRoutes } from './auth/commands'
import { cloudBillingRoutes } from './billing/commands'
import { cloudProjectRoutes } from './project/commands'

export const cloudRoutes = buildRouteMap({
  routes: {
    auth: cloudAuthRoutes,
    billing: cloudBillingRoutes,
    project: cloudProjectRoutes,
  },
  docs: {
    brief: 'Cloud commands',
  },
})
