import fs from 'node:fs/promises'

export const contentPaths = {
  feature: '/tmp/deepdish_feature.json',
  text: '/tmp/deepdish_text.json',
} as const

export async function initContent() {
  for (const path of Object.values(contentPaths)) {
    const exists = await fs
      .stat(path)
      .then(() => true)
      .catch(() => false)

    if (!exists) {
      await fs.writeFile(path, JSON.stringify({}))
    }
  }
}
