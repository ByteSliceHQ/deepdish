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
        // TODO: don't use public variable
        // TODO: clerk domain environment variable
        await redirect(
          `https://native-pony-6.clerk.accounts.dev/oauth/authorize?client_id=aUsw8GkUPJbUEHj9&state=${process.env.NEXT_PUBLIC_DEEPDISH_DRAFT_URL}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F%2foauth%2Fcallback&response_type=code&scope=profile`,
        )
      },
      onSignOut: async () => {
        const cookie = cookies().get('__deepdish_secret')

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

        await cookies().delete('__deepdish_secret')
      },
    },
  })
}
