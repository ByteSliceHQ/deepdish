import { getDraft } from '@deepdish/ui/config'
import { withResult } from '@byteslice/result'
import { Client } from './client'

type WorkbenchProps = {
  signInButton: React.FunctionComponent
  signOutButton: React.FunctionComponent
}

export async function Workbench(props: WorkbenchProps) {
  const draftResult = getDraft()
  if (draftResult.failure) {
    // TODO: handle failure case
    return null
  }

  const authResult = await withResult(
    draftResult.data.auth(),
    (err) => new Error(`Failed to authenticate: ${err.message}`),
  )
  if (authResult.failure) {
    // TODO: handle failure case
    return null
  }

  return (
    <Client
      authenticated={authResult.data}
      signInButton={props.signInButton}
      signOutButton={props.signOutButton}
    />
  )
}
