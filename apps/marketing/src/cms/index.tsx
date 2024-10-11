import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createTypographyResolver } from '@deepdish-cloud/resolvers/typography'
import { typographySchema } from '@deepdish/config/schemas'
import { createJsonResolver } from '@deepdish/resolvers/json'
import { configure } from '@deepdish/ui/config'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const jsonPath = path.resolve(__dirname, './data.json')

const DEEPDISH_COOKIE_NAME = '__deepdish_secret'

function extractDeepdishCookie(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie') || ''
  const cookies = cookieHeader.split('; ')

  const cookie = cookies.find((cookie) =>
    cookie.startsWith('__deepdish_secret='),
  )

  if (!cookie) {
    return null
  }

  return cookie.split('=')[1]
}

type Config = {
  contentUrl: string
  oauthClientId: string
  oauthRedirectUrl: string
  oauthUrl: string
  secretKey: string
}

export function cms(config: Config) {
  const jsonResolver = createJsonResolver(typographySchema, jsonPath)

  const cloudTypographyResolver = createTypographyResolver(
    config.contentUrl,
    config.secretKey,
  )

  configure({
    contracts: {
      typography: {
        resolver:
          process.env.DEEPDISH_RESOLVER === 'cloud'
            ? cloudTypographyResolver
            : jsonResolver,
      },
    },
    draft: {
      auth: async () => {
        const request = new NextRequest('https://dashboard.deepdish.app', {
          headers: headers(),
        })

        const secret = extractDeepdishCookie(request)

        if (!secret) {
          return false
        }

        const response = await fetch(`${config.oauthUrl}/oauth/userinfo`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${secret}`,
            'X-DEEPDISH-SECRET-KEY': config.secretKey,
          },
        })

        return response.status === 200
      },
      onSignIn: async () => {
        const origin = headers().get('origin')

        if (!origin) {
          // TODO: what to do here?
          return
        }

        const queryParams = new URLSearchParams({
          client_id: config.oauthClientId,
          state: origin,
          redirect_uri: config.oauthRedirectUrl,
          response_type: 'code',
          scope: 'profile',
        })

        await redirect(
          `${process.env.CLERK_URL}/oauth/authorize?${queryParams}`,
        )
      },
      onSignOut: async () => {
        const cookie = cookies().get(DEEPDISH_COOKIE_NAME)

        if (!cookie) {
          // TODO: what to do here?
          return
        }

        const response = await fetch(`${config.oauthUrl}/oauth/revoke`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${cookie.value}`,
          },
        })

        if (!response.ok) {
          console.error('Failed to revoke access token:', response.status)
        }

        await cookies().delete(DEEPDISH_COOKIE_NAME)
      },
    },
  })
}
