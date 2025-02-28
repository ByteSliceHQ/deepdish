import { TRPC_ENDPOINT } from '@deepdish/trpc/constants'
import { appRouter } from '@deepdish/trpc/server'
import { getConfig } from '@deepdish/ui/config'
import { getCss } from '@deepdish/workbench/css'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { type NextRequest, NextResponse } from 'next/server'

export type DeepdishMiddlewareConfig = {
  draft: boolean
  health?: (request: NextRequest) => NextResponse | Promise<NextResponse>
  verify: (request: NextRequest) => boolean | Promise<boolean>
  signIn: (request: NextRequest) => NextResponse | Promise<NextResponse>
  signOut: (request: NextRequest) => NextResponse | Promise<NextResponse>
}

function defaultHealthCheck() {
  return NextResponse.json({ ok: true })
}

export async function deepdishMiddleware(
  config: DeepdishMiddlewareConfig,
  request: NextRequest,
  response?: NextResponse,
) {
  if (!config.draft) {
    return response ?? NextResponse.next()
  }

  const { url, method } = request

  if (url.includes(TRPC_ENDPOINT)) {
    return fetchRequestHandler({
      endpoint: TRPC_ENDPOINT,
      req: request,
      router: appRouter,
      createContext: () => ({
        getConfig: () => {
          const config = getConfig()

          if (config.failure) {
            throw config.failure
          }

          return config.data
        },
      }),
    })
  }

  if (url.includes('/__deepdish/') && method === 'GET') {
    if (url.endsWith('/css')) {
      const css = getCss()

      const response = new NextResponse(css)
      response.headers.set('Content-Type', 'text/css')

      return response
    }

    if (url.endsWith('/health')) {
      if (config.health) {
        return config.health(request)
      }

      return defaultHealthCheck()
    }

    if (url.endsWith('/sign-in')) {
      return config.signIn(request)
    }

    if (url.endsWith('/sign-out')) {
      return config.signOut(request)
    }

    if (url.endsWith('/verify')) {
      const verified = await config.verify(request)
      return NextResponse.json({ signedIn: verified })
    }
  }

  return response ?? NextResponse.next()
}
