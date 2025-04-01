import type { LocalContext } from '@/context'
import { ensureDirectoryExists, getDeepDishDirectory } from './storage'

export function getProjectFilePath(context: LocalContext) {
  const directory = getDeepDishDirectory(context)

  return `${directory}/project`
}

export async function readActiveProjectFile(context: LocalContext) {
  const filePath = getProjectFilePath(context)
  const content = await context.fsPromise.readFile(filePath, 'utf8')

  return Number(content)
}

export async function purgeActiveProjectFile(context: LocalContext) {
  const filePath = getProjectFilePath(context)

  const exists = await context.fsPromise
    .stat(filePath)
    .then(() => true)
    .catch(() => false)

  if (exists) {
    await context.fsPromise.unlink(filePath)
  }
}

export async function saveActiveProjectFile(
  context: LocalContext,
  projectId: number,
) {
  const filePath = getProjectFilePath(context)
  await ensureDirectoryExists(context, getDeepDishDirectory(context))

  await context.fsPromise.writeFile(filePath, String(projectId))
}
