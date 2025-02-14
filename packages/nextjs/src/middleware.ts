import { type NextRequest, NextResponse } from 'next/server'

import { getCss } from '@deepdish/workbench/css'

export type DeepdishMiddlewareConfig = {
  draft: boolean
  health?: (request: NextRequest) => NextResponse | Promise<NextResponse>
  verify: (request: NextRequest) => boolean | Promise<boolean>
  signIn: (request: NextRequest) => NextResponse | Promise<NextResponse>
  signOut: (request: NextRequest) => NextResponse | Promise<NextResponse>
}

function defaultHealthCheck() {
  return NextResponse.json({ status: 'ok' })
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
