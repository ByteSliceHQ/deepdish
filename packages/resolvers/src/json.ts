import { readFile, writeFile } from 'node:fs/promises'
import { createResolver } from './resolver'

async function parseJson(path: string) {
  const json = await readFile(path, { encoding: 'utf-8' })
  return JSON.parse(json)
}

async function updateJson<V>(path: string, key: string, value: V) {
  const data = await parseJson(path)
  data[key] = value
  return writeFile(path, JSON.stringify(data), { encoding: 'utf-8' })
}

/** Creates a resolver to asynchronously read/write string values of a JSON file. */
export function createTextResolver(path: string) {
  return createResolver<string>(
    async ({ key }) => {
      'use server'

      const data = await parseJson(path)
      return data[key]
    },
    async ({ key }, value) => {
      'use server'

      await updateJson<string>(path, key, value)
    },
  )
}
