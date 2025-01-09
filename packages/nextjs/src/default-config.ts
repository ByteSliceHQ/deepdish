import { NextResponse } from 'next/server'
import type { DeepdishMiddlewareConfig } from './middleware'

// TODO: configure these defaults
const verify = () => true

function signIn(): NextResponse<unknown> {
  const queryParams = new URLSearchParams({
    // client_id: 'ySKP6VdKAVybfChw',
    client_id: 'aUsw8GkUPJbUEHj9',
    // TODO: encode state properly
    state: 'http://localhost:4000',
    // redirect_uri: 'https://dashboard.deepdish.app/oauth/callback',
    redirect_uri: 'http://localhost:3000/oauth/callback',
    response_type: 'code',
    scope: 'profile',
  })

  return NextResponse.redirect(
    // `https://clerk.deepdish.app/oauth/authorize?${queryParams.toString()}`,
    `https://native-pony-6.clerk.accounts.dev/oauth/authorize?${queryParams.toString()}`,
  )
}

function signOut(): NextResponse<unknown> {
  return NextResponse.redirect(
    'https://native-pony-6.clerk.accounts.dev/sign-out',
  )
}

export const defaultDeepdishMiddlewareConfig: DeepdishMiddlewareConfig = {
  verify,
  signIn,
  signOut,
}
