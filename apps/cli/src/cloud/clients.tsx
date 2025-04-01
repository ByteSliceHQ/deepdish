import { readCredentialsFile } from '@/cloud/auth/credentials'
import { Failure } from '@/components/failure'
import type { LocalContext } from '@/context'
import { env } from '@/env'
import { withResult } from '@byteslice/result'
import { createClient } from '@deepdish-cloud/clients/admin'
import { render } from 'ink'

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
