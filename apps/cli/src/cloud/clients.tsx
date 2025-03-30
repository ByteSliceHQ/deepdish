import { withResult } from '@byteslice/result'
import { createClient } from '@deepdish-cloud/clients/admin'
import { readCredentialsFile } from '@/auth/storage'
import type { LocalContext } from '@/context'
import { render } from 'ink'
import { Failure } from '@/components/Failure'
import { env } from '@/env'

export async function createAdminClient(context: LocalContext) {
  const credentials = await withResult(
    () => readCredentialsFile(context),
    (err) => err,
  )

  if (credentials.failure) {
    render(<Failure message="Please log in or create an account first." />)
    context.process.exit(1)
  }

  return createClient(env.DEEPDISH_CLOUD_ADMIN_URL, credentials.data.jwt)
}
