import fs from 'node:fs/promises'

export const contentPath = '/tmp/deepdish.json'

export async function initContent() {
  const exists = await fs
    .stat(contentPath)
    .then(() => true)
    .catch(() => false)

  if (!exists) {
    await fs.writeFile(contentPath, JSON.stringify({}))
  }
}
