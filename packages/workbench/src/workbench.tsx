import { withResult } from '@byteslice/result'
import { getDraft } from '@deepdish/ui/config'
import { Client } from './client'

async function handleSignIn() {
  'use server'

  const draftResult = getDraft()
  if (draftResult.failure) {
    // TODO: handle failure case
    return
  }

  await draftResult.data.onSignIn()
}

async function handleSignOut() {
  'use server'

  const draftResult = getDraft()
  if (draftResult.failure) {
    // TODO: handle failure case
    return
  }

  await draftResult.data.onSignOut()
}

export async function Workbench() {
  const draftResult = getDraft()
  if (draftResult.failure) {
    // TODO: handle failure case
    return null
  }

  const authResult = await withResult(
    draftResult.data.auth,
    (err) => new Error(`Failed to authenticate: ${err.message}`),
  )
  if (authResult.failure) {
    // TODO: handle failure case
    return null
  }

  return (
    <Client
      authenticated={authResult.data}
      onSignIn={handleSignIn}
      onSignOut={handleSignOut}
    />
  )
}
