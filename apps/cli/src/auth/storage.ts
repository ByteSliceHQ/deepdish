import type { LocalContext } from '@/context'
import * as v from 'valibot'

const credentialsSchema = v.object({
  jwt: v.string(),
  sessionId: v.string(),
})

async function ensureDirectoryExists(context: LocalContext, path: string) {
  const exists = await context.fsPromise
    .stat(path)
    .then(() => true)
    .catch(() => false)

  if (!exists) {
    await context.fsPromise.mkdir(path, { recursive: true })
  }
}

export function getCredentialsFilePath(context: LocalContext) {
  const directory = getDeepDishDirectory(context)

  return `${directory}/credentials`
}

export function getDeepDishDirectory(context: LocalContext) {
  if (!context.path) {
    throw new Error('No `path` found in context.')
  }

  if (!context.os) {
    throw new Error('No `os` found in context.')
  }

  const home = context.os.homedir()

  return context.path.join(home, '.deepdish')
}

export async function purgeCredentialsFile(context: LocalContext) {
  const filePath = getCredentialsFilePath(context)
  await context.fsPromise.unlink(filePath)
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
