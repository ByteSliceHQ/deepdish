import {
  CALLBACK_URL,
  type CallbackParams,
  createTemporaryCallbackServer,
} from '@/auth/callback'
import { createSignIn, makeClerk } from '@/auth/clerk'
import {
  type Config,
  createSessionJwt,
  exchangeCallbackCodeForToken,
  exchangeTokenForTicket,
  getConfig,
} from '@/auth/exchange'
import { generateOAuthState, openAuthorizeUrl } from '@/auth/oauth'
import { writeJwt } from '@/auth/storage'
import type { LocalContext } from '@/context'
import { env } from '@/env'
import { withResult } from '@byteslice/result'

async function signInAndSaveJwt(
  ctx: LocalContext,
  config: Config,
  callbackParams: CallbackParams,
) {
  const token = await withResult(
    () =>
      exchangeCallbackCodeForToken(
        env.BASE_DEEPDISH_CLOUD_URL,
        callbackParams.code,
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

  const clerk = await makeClerk(config.clerkPublishableKey)

  const signIn = await withResult(
    () => createSignIn(clerk, ticket.data.token),
    (err) => err,
  )

  if (signIn.failure) {
    throw signIn.failure
  }

  const jwt = await withResult(
    () =>
      createSessionJwt(
        env.BASE_DEEPDISH_CLOUD_URL,
        token.data.idToken,
        signIn.data.createdSessionId,
      ),
    (err) => err,
  )

  if (jwt.failure) {
    throw jwt.failure
  }

  const write = await withResult(
    () => writeJwt(ctx, jwt.data),
    (err) => err,
  )

  if (write.failure) {
    throw write.failure
  }
}

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
    redirectUri: CALLBACK_URL,
    state,
  })

  const result = await withResult(
    () =>
      createTemporaryCallbackServer(async (callbackParams) => {
        if (callbackParams.state !== state) {
          throw new Error('Invalid state.')
        }

        await signInAndSaveJwt(this, config.data, callbackParams)
      }),
    (err) => err,
  )

  if (result.failure) {
    throw result.failure
  }

  console.log('Success! You are now logged in.')
}

// TODO: refactor this, Clerk can do a signup for you
export async function signup(this: LocalContext): Promise<void> {
  await console.log('cloud signup')
}
