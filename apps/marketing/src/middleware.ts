import {
  type DeepdishMiddlewareConfig,
  deepdishMiddleware,
} from '@deepdish/nextjs'
import { type NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = '__deepdish_secret'

const clientId = process.env.DEEPDISH_CLOUD_OAUTH_CLIENT_ID || ''
const state = process.env.DEEPDISH_CLOUD_STATE || ''
const redirectUri = process.env.DEEPDISH_CLOUD_OAUTH_REDIRECT_URI || ''
const secretKey = process.env.DEEPDISH_SECRET_KEY || ''
const projectAlias = process.env.DEEPDISH_PROJECT_ALIAS || ''

async function verify(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME)

  if (!cookie) {
    return false
  }

  const response = await fetch(
    `${process.env.DEEPDISH_CLOUD_ENDPOINT}/oauth/userinfo`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cookie.value}`,
        'X-DEEPDISH-SECRET-KEY': secretKey,
        'X-DEEPDISH-PROJECT-ALIAS': projectAlias,
      },
    },
  )

  return response.status === 200
}

function signIn(): NextResponse<unknown> {
  const queryParams = new URLSearchParams({
    client_id: clientId,
    state,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'profile',
  })

  return NextResponse.redirect(
    `${process.env.DEEPDISH_CLOUD_ENDPOINT}/oauth/authorize?${queryParams.toString()}`,
  )
}

function signOut(): NextResponse<unknown> {
  return NextResponse.redirect(
    `${process.env.DEEPDISH_CLOUD_ENDPOINT}/sign-out`,
  )
}

const config: DeepdishMiddlewareConfig = {
  verify,
  signIn,
  signOut,
}

export default deepdishMiddleware(config)
