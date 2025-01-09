import {
  type DeepdishMiddlewareConfig,
  deepdishMiddleware,
} from '@deepdish/nextjs'
import { NextResponse } from 'next/server'

// TODO: configure these defaults
const verify = () => true

const client_id = process.env.DEEPDISH_CLOUD_OAUTH_CLIENT_ID || ''
const state = process.env.DEEPDISH_CLOUD_STATE || ''
const redirect_uri = process.env.DEEPDISH_CLOUD_OAUTH_REDIRECT_URI || ''

function signIn(): NextResponse<unknown> {
  const queryParams = new URLSearchParams({
    client_id,
    state,
    redirect_uri,
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

// TODO: Interesting typescript errors due to [INTERNAL] property on NextResponse
const config: DeepdishMiddlewareConfig = {
  verify,
  signIn,
  signOut,
}

export default deepdishMiddleware(config)
