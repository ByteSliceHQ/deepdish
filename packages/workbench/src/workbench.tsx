import { getDraft } from '@deepdish/ui/config'
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

  const authenticated = await draftResult.data.auth()

  return (
    <Client
      authenticated={authenticated}
      signInButton={props.signInButton}
      signOutButton={props.signOutButton}
    />
  )
}
