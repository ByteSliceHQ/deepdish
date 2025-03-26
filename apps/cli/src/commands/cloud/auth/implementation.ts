import { createTemporaryCallbackServer, getCallbackUrl } from '@/auth/callback'
import { createSignIn, makeClerk } from '@/auth/clerk'
import {
  createSessionJwt,
  exchangeCallbackCodeForToken,
  exchangeTokenForTicket,
  getConfig,
} from '@/auth/exchange'
import { generateOAuthState, openAuthorizeUrl } from '@/auth/oauth'
import { writeJwt } from '@/auth/storage'
import type { LocalContext } from '@/context'
import { withResult } from '@byteslice/result'
import { env } from '@/env'

// TODO: test errors
// TODO: add formatted console logging
export async function login(this: LocalContext): Promise<void> {
  const state = generateOAuthState()

  const config = await withResult(
    () => getConfig(env.BASE_DEEPDISH_CLOUD_URL),
    (err) => err,
  )

  if (config.failure) {
    throw config.failure
  }

  openAuthorizeUrl({
    authorizeUri: env.OAUTH_AUTHORIZE_URL,
    clientId: config.data.clientId,
    redirectUri: `${getCallbackUrl()}/callback`,
    state,
  })

  // TODO: move all logic into `createTemporaryCallbackServer` so that we can show
  // failure HTML if any of the operations fail
  const callback = await withResult(
    () => createTemporaryCallbackServer(),
    (err) => err,
  )

  if (callback.failure) {
    throw callback.failure
  }

  if (callback.data.state !== state) {
    throw new Error('Invalid state.')
  }

  const token = await withResult(
    () =>
      exchangeCallbackCodeForToken(
        env.BASE_DEEPDISH_CLOUD_URL,
        callback.data.code,
      ),
    (err) => err,
  )

  if (token.failure) {
    throw token.failure
  }

  const ticket = await withResult(
    () =>
      exchangeTokenForTicket(env.BASE_DEEPDISH_CLOUD_URL, token.data.idToken),
    (err) => err,
  )

  if (ticket.failure) {
    throw ticket.failure
  }

  const clerk = await makeClerk(config.data.clerkPublishableKey)

  const signIn = await withResult(
    () => createSignIn(clerk, ticket.data.token),
    (err) => err,
  )

  if (signIn.failure) {
    throw signIn.failure
  }

  const jwt = await createSessionJwt(
    env.BASE_DEEPDISH_CLOUD_URL,
    token.data.idToken,
    signIn.data.createdSessionId,
  )

  const write = await withResult(
    () => writeJwt(this, jwt),
    (err) => err,
  )

  if (write.failure) {
    throw write.failure
  }

  console.log('Success! You are now logged in.')
}

// TODO: refactor this, Clerk can do a signup for you
export async function signup(this: LocalContext): Promise<void> {
  await console.log('cloud signup')
}
