import { withResult } from '@byteslice/result'
import type { LocalContext } from '@/context'
import { createTemporaryCallbackServer } from '@/auth/callback'
import { makeClerk, createSignIn } from '@/auth/clerk'
import { openAuthorizeUrl, generateOAuthState } from '@/auth/oauth'
import {
  exchangeCallbackCodeForToken,
  getConfig,
  createSessionJwt,
  exchangeTokenForTicket,
} from '@/auth/exchange'

const CALLBACK_PORT = 8765
const BASE_DEEPDISH_CLOUD_URL = 'http://localhost:3000'
const BASE_CALLBACK_URL = `http://localhost:${CALLBACK_PORT}`

export async function login(this: LocalContext): Promise<void> {
  const state = generateOAuthState()

  const config = await withResult(
    () => getConfig(BASE_DEEPDISH_CLOUD_URL),
    (err) => err,
  )

  if (config.failure) {
    throw config.failure
  }

  openAuthorizeUrl({
    authorizeUri: 'https://native-pony-6.clerk.accounts.dev/oauth/authorize',
    clientId: config.data.clientId,
    redirectUri: `${BASE_CALLBACK_URL}/callback`,
    state,
  })

  const callback = await withResult(
    () => createTemporaryCallbackServer(BASE_CALLBACK_URL, CALLBACK_PORT),
    (err) => err,
  )

  if (callback.failure) {
    throw callback.failure
  }

  const token = await withResult(
    () =>
      exchangeCallbackCodeForToken(BASE_DEEPDISH_CLOUD_URL, callback.data.code),
    (err) => err,
  )

  if (token.failure) {
    throw token.failure
  }

  const ticket = await withResult(
    () => exchangeTokenForTicket(BASE_DEEPDISH_CLOUD_URL, token.data.idToken),
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
    BASE_DEEPDISH_CLOUD_URL,
    token.data.idToken,
    signIn.data.createdSessionId,
  )

  console.log('jwt', jwt)
}

// TODO: refactor this, Clerk can do a signup for you
export async function signup(this: LocalContext): Promise<void> {
  await console.log('cloud signup')
}
