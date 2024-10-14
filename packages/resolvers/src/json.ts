import { readFile, writeFile } from 'node:fs/promises'
import DataLoader from 'dataloader'
import type { ZodTypeAny } from 'zod'
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

function loadValues(path: string) {
  return async (keys: readonly string[]) => {
    const data = await parseJson(path)
    return keys.map((key) => data[key] ?? undefined)
  }
}

/** Creates a resolver to asynchronously read/write values of a JSON file. */
export function createJsonResolver<S extends ZodTypeAny>(
  schema: S,
  path: string,
) {
  const loader = new DataLoader(loadValues(path))

  return createResolver(schema)(
    async ({ key }) => {
      return await loader.load(key)
    },
    async ({ key }, value) => {
      await updateJson(path, key, value)
    },
  )
}
