import { deepdishMiddleware } from '@deepdish/nextjs'
import { type NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = '__deepdish_secret'

const clientId = process.env.DEEPDISH_CLOUD_OAUTH_CLIENT_ID || ''
const state = process.env.DEEPDISH_CLOUD_STATE || ''
const redirectUri = process.env.DEEPDISH_CLOUD_OAUTH_REDIRECT_URI || ''
const secretKey = process.env.DEEPDISH_SECRET_KEY || ''
const projectAlias = process.env.DEEPDISH_PROJECT_ALIAS || ''

const marketingPreview = process.env.NODE_ENV === 'production'

async function verify(request: NextRequest) {
  if (marketingPreview) {
    return true
  }

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

function signIn() {
  if (marketingPreview) {
    return NextResponse.next()
  }

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

function signOut() {
  if (marketingPreview) {
    return NextResponse.next()
  }

  return NextResponse.redirect(
    `${process.env.DEEPDISH_CLOUD_ENDPOINT}/sign-out`,
  )
}

export default deepdishMiddleware({
  verify,
  signIn,
  signOut,
})
