import { createTRPCMsw } from '@vafanassieff/msw-trpc'
import type { AppRouter } from '@deepdish/trpc/server'
import { TRPC_ENDPOINT } from '@deepdish/trpc/constants'
import { httpLink } from '@vafanassieff/msw-trpc'

export const trpcMsw = createTRPCMsw<AppRouter>({
  links: [
    httpLink({
      url: TRPC_ENDPOINT,
      headers() {
        return {
          'Content-Type': 'application/json',
        }
      },
    }),
  ],
})
