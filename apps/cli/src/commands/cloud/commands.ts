import { buildRouteMap } from '@stricli/core'
import { cloudAuthRoutes } from './auth/commands'
import { cloudBillingRoutes } from './billing/commands'
import { cloudKeyRoutes } from './key/commands'

export const cloudRoutes = buildRouteMap({
  routes: {
    auth: cloudAuthRoutes,
    billing: cloudBillingRoutes,
    key: cloudKeyRoutes,
  },
  docs: {
    brief: 'Cloud commands',
  },
})
