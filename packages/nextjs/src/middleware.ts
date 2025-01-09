import {
  type NextMiddleware,
  type NextRequest,
  NextResponse,
} from 'next/server'
import { defaultDeepdishMiddlewareConfig } from './default-config'

export type DeepdishMiddlewareConfig = {
  verify: (request: NextRequest) => boolean | Promise<boolean>
  signIn: (request: NextRequest) => NextResponse | Promise<NextResponse>
  signOut: (request: NextRequest) => NextResponse | Promise<NextResponse>
}

export function deepdishMiddleware(
  config: DeepdishMiddlewareConfig = defaultDeepdishMiddlewareConfig,
): NextMiddleware {
  return async (request) => {
    const { url, method } = request

    if (url.includes('/__deepdish/')) {
      if (url.endsWith('/sign-in') && method === 'GET') {
        return config.signIn(request)
      }

      if (url.endsWith('/sign-out') && method === 'GET') {
        return config.signOut(request)
      }

      if (url.endsWith('/verify') && method === 'POST') {
        const verified = await config.verify(request)
        return NextResponse.json({ signedIn: verified })
      }
    }
  }
}
