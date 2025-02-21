'use client'

import { createTRPCClient, httpLink } from '@trpc/client'
import { TRPC_ENDPOINT } from './constants'
import type { AppRouter } from './server'

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpLink({
      url: TRPC_ENDPOINT,
    }),
  ],
})
