import { readFile, readdir, writeFile } from 'node:fs/promises'
import type { ZodTypeAny } from 'zod'
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

async function parseJson(path: string) {
  const json = await readFile(path, { encoding: 'utf-8' })
  return JSON.parse(json)
}

async function updateJson<V>(path: string, key: string, value: V) {
  const data = await parseJson(path)
  data[key] = value
  return writeFile(path, JSON.stringify(data), { encoding: 'utf-8' })
}

/** Creates a resolver to asynchronously read/write values of a JSON file. */
export function createJsonResolver<S extends ZodTypeAny>(
  schema: S,
  path: string,
) {
  return createResolver(schema)(
    async () => {
      const keys = await readDirectory(path)
      return keys
    },
    async ({ key }) => {
      const data = await parseJson(path)
      return data[key]
    },
    async ({ key }, value) => {
      'use server'

      await updateJson<string>(path, key, value)
    },
  )
}
