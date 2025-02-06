import {
  type NextMiddleware,
  type NextRequest,
  NextResponse,
} from 'next/server'

export type DeepdishMiddlewareConfig = {
  draft: boolean
  verify: (request: NextRequest) => boolean | Promise<boolean>
  signIn: (request: NextRequest) => NextResponse | Promise<NextResponse>
  signOut: (request: NextRequest) => NextResponse | Promise<NextResponse>
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

    return NextResponse.next()
  }
}
