import { readFile, writeFile } from 'node:fs/promises'
import { createResolver } from './resolver'

async function parseJSON(path: string) {
  const json = await readFile(path, { encoding: 'utf-8' })
  return JSON.parse(json)
}

async function updateJSON<Value>(path: string, key: string, value: Value) {
  const data = await parseJSON(path)
  data[key] = value
  return writeFile(path, JSON.stringify(data), { encoding: 'utf-8' })
}

/** Creates a resolver to asynchronously read/write string values of a JSON file. */
export function createTextResolver(path: string) {
  return createResolver<string>(
    async ({ key }) => {
      const data = await parseJSON(path)
      return data[key]
    },
    async ({ key }, value) => {
      await updateJSON<string>(path, key, value)
    },
  )
}
