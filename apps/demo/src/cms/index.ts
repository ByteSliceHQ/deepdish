import fs from 'node:fs/promises'
import { createJsonResolver } from '@deepdish/resolvers/json'
import { configure } from '@deepdish/ui/config'
import { typographySchema } from '@deepdish/ui/schemas'

let configured = false

const contentPath = '/tmp/deepdish.json'

async function init() {
  const exists = await fs
    .stat(contentPath)
    .then(() => true)
    .catch(() => false)

  if (!exists) {
    await fs.writeFile(contentPath, JSON.stringify({}))
  }
}

export async function cms() {
  if (configured) {
    return
  }

  configured = true
  await init()

  return await configure({
    baseUrl: process.env.BASE_URL,
    contracts: {
      typography: {
        resolver: createJsonResolver(contentPath, typographySchema, {
          maxBatchSize: 10,
        }),
      },
    },
  })
}
