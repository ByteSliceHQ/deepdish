import type { LocalContext } from '@/context'

export function getJwtDirectory(context: LocalContext) {
  if (!context.path) {
    throw new Error('No `path` found in context.')
  }

  if (!context.os) {
    throw new Error('No `os` found in context.')
  }

  const home = context.os.homedir()

  return context.path.join(home, '.deepdish')
}

export function getJwtFilePath(context: LocalContext) {
  const directory = getJwtDirectory(context)

  return `${directory}/jwt`
}

export async function readJwt(context: LocalContext) {
  const path = getJwtFilePath(context)

  return await context.fsPromise.readFile(path, 'utf8')
}

export async function writeJwt(context: LocalContext, jwt: string) {
  const directory = getJwtDirectory(context)
  const filePath = getJwtFilePath(context)

  const exists = await context.fsPromise
    .stat(filePath)
    .then(() => true)
    .catch(() => false)

  if (!exists) {
    await context.fsPromise.mkdir(directory, { recursive: true })
  }

  await context.fsPromise.writeFile(filePath, jwt)
}
