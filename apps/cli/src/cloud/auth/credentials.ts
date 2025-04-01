import type { LocalContext } from '@/context'
import { ensureDirectoryExists, getDeepDishDirectory } from '@/cloud/storage'
import * as v from 'valibot'

const credentialsSchema = v.object({
  jwt: v.string(),
  sessionId: v.string(),
})

export function getCredentialsFilePath(context: LocalContext) {
  const directory = getDeepDishDirectory(context)

  return `${directory}/credentials`
}

export async function purgeCredentialsFile(context: LocalContext) {
  const filePath = getCredentialsFilePath(context)

  const exists = await context.fsPromise
    .stat(filePath)
    .then(() => true)
    .catch(() => false)

  if (exists) {
    await context.fsPromise.unlink(filePath)
  }
}

export async function readCredentialsFile(context: LocalContext) {
  const filePath = getCredentialsFilePath(context)
  const content = await context.fsPromise.readFile(filePath, 'utf8')

  return v.parse(credentialsSchema, JSON.parse(content))
}

export async function saveCredentialsFile(
  context: LocalContext,
  token: string,
  sessionId: string,
) {
  const filePath = getCredentialsFilePath(context)
  await ensureDirectoryExists(context, getDeepDishDirectory(context))

  await context.fsPromise.writeFile(
    filePath,
    JSON.stringify({
      jwt: token,
      sessionId,
    }),
  )
}
