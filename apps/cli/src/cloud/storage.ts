import type { LocalContext } from '@/context'

export async function ensureDirectoryExists(
  context: LocalContext,
  path: string,
) {
  const exists = await context.fsPromise
    .stat(path)
    .then(() => true)
    .catch(() => false)

  if (!exists) {
    await context.fsPromise.mkdir(path, { recursive: true })
  }
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
