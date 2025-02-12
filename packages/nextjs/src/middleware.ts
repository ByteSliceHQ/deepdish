import {
  type NextMiddleware,
  type NextRequest,
  NextResponse,
} from 'next/server'

import { getCss } from '@deepdish/workbench/css'

export type DeepdishMiddlewareConfig = {
  draft: boolean
  verify: (request: NextRequest) => boolean | Promise<boolean>
  signIn: (request: NextRequest) => NextResponse | Promise<NextResponse>
  signOut: (request: NextRequest) => NextResponse | Promise<NextResponse>
  hooks?: {
    afterVerify?: (request: NextRequest, response: NextResponse) => void
  }
}

export function deepdishMiddleware(
  config: DeepdishMiddlewareConfig,
): NextMiddleware {
  return async (request) => {
    if (!config.draft) {
      return NextResponse.next()
    }

    const { url, method } = request

    if (url.includes('/__deepdish/') && method === 'GET') {
      if (url.endsWith('/css')) {
        const css = getCss()

        const response = new NextResponse(css)
        response.headers.set('Content-Type', 'text/css')

        return response
      }

      if (url.endsWith('/sign-in')) {
        return config.signIn(request)
      }

      if (url.endsWith('/sign-out')) {
        return config.signOut(request)
      }

      if (url.endsWith('/verify')) {
        const verified = await config.verify(request)
        const response = NextResponse.json({ signedIn: verified })

        if (config.hooks?.afterVerify) {
          config.hooks.afterVerify(request, response)
        }

        return response
      }
    }

    return NextResponse.next()
  }
}
