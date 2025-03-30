import {
  CALLBACK_URL,
  type CallbackParams,
  createTemporaryCallbackServer,
} from '@/auth/callback'
import { createClerk, createSignIn } from '@/auth/clerk'
import {
  type Config,
  exchangeCallbackCodeForToken,
  exchangeTokenForTicket,
  getConfig,
} from '@/auth/exchange'
import { generateOAuthState, openAuthorizeUrl } from '@/auth/oauth'
import { createSessionJwt, revokeSession } from '@/auth/session'
import {
  purgeCredentialsFile,
  readCredentialsFile,
  saveCredentialsFile,
} from '@/auth/storage'
import { Failure } from '@/components/failure'
import { Success } from '@/components/success'
import { Warning } from '@/components/warning'
import type { LocalContext } from '@/context'
import { env } from '@/env'
import { withResult } from '@byteslice/result'
import { render } from 'ink'

async function signInAndSaveJwt(
  context: LocalContext,
  config: Config,
  callbackParams: CallbackParams,
) {
  const token = await withResult(
    () =>
      exchangeCallbackCodeForToken(
        env.DEEPDISH_CLOUD_CLI_URL,
        callbackParams.code,
      ),
    (err) =>
      new Error('Failed to exchange callback code for token', {
        cause: err.message,
      }),
  )

  if (token.failure) {
    throw token.failure
  }

  const ticket = await withResult(
    () =>
      exchangeTokenForTicket(env.DEEPDISH_CLOUD_CLI_URL, token.data.idToken),
    (err) =>
      new Error('Failed to exchange ID token code for a sign-in ticket', {
        cause: err.message,
      }),
  )

  if (ticket.failure) {
    throw ticket.failure
  }

  const clerk = await createClerk(config.clerkPublishableKey)

  const signIn = await withResult(
    () => createSignIn(clerk, ticket.data.token),
    (err) =>
      new Error('Failed to create a new sign-in for this device', {
        cause: err.message,
      }),
  )

  if (signIn.failure) {
    throw signIn.failure
  }

  const jwt = await withResult(
    () =>
      createSessionJwt(
        env.DEEPDISH_CLOUD_CLI_URL,
        token.data.idToken,
        signIn.data.createdSessionId,
      ),
    (err) =>
      new Error('Failed to create a session JWT', {
        cause: err.message,
      }),
  )

  if (jwt.failure) {
    throw jwt.failure
  }

  const write = await withResult(
    () => saveCredentialsFile(context, jwt.data, signIn.data.createdSessionId),
    (err) =>
      new Error('Failed to save your credentials to disk', {
        cause: err.message,
      }),
  )

  if (write.failure) {
    throw write.failure
  }
}

export async function login(this: LocalContext): Promise<void> {
  const state = generateOAuthState()

  const config = await withResult(
    () => getConfig(env.DEEPDISH_CLOUD_CLI_URL),
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
    render(<Failure message={result.failure.message} />)
    process.exit(1)
  }

  render(<Success message="Success! You are now logged in." />)
}

export async function logout(this: LocalContext): Promise<void> {
  const credentials = await withResult(
    () => readCredentialsFile(this),
    (err) => err,
  )

  if (credentials.failure) {
    render(
      <Failure message="There was an issue reading your credentials. You are probably already logged out." />,
    )

    process.exit(1)
  }

  const config = await withResult(
    () => getConfig(env.DEEPDISH_CLOUD_CLI_URL),
    (err) => err,
  )

  if (config.failure) {
    throw config.failure
  }

  const revocation = await withResult(
    async () =>
      revokeSession(
        env.DEEPDISH_CLOUD_CLI_URL,
        credentials.data.jwt,
        credentials.data.sessionId,
      ),
    (err) => err,
  )

  if (revocation.failure) {
    render(
      <Warning message="There was an issue revoking your session. You are probably already logged out. Purging credentials file..." />,
    )
  }

  const purge = await withResult(
    async () => purgeCredentialsFile(this),
    (err) => err,
  )

  if (purge.failure) {
    throw purge.failure
  }

  render(<Success message="Success! You are now logged out." />)
}

export async function signup(this: LocalContext): Promise<void> {
  await console.log('cloud signup')
}
