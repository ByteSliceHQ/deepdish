import { readdir, readFile, writeFile } from 'node:fs/promises'
import { createResolver } from './resolver'
import type { Key } from './types'

async function readDirectory(path: string): Promise<Key[]> {
  const files = await readdir(path)

  return files.map((file) => {
    return {
      key: file,
      display: file,
    }
  })
}

async function parseJSON(path: string) {
  const json = await readFile(path, { encoding: 'utf-8' })
  return JSON.parse(json)
}

async function updateJSON<V>(path: string, key: string, value: V) {
  const data = await parseJSON(path)
  data[key] = value
  return writeFile(path, JSON.stringify(data), { encoding: 'utf-8' })
}

/** Creates a resolver to asynchronously read/write string values of a JSON file. */
export function createTextResolver(path: string) {
  return createResolver<string>(
    async () => {
      'use server'

      const keys = await readDirectory(path)
      return keys
    },
    async ({ key }) => {
      'use server'

      const data = await parseJSON(path)
      return data[key]
    },
    async ({ key }, value) => {
      'use server'

      await updateJSON<string>(path, key, value)
    },
  )
}
