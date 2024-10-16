import { readFile, writeFile } from 'node:fs/promises'
import type { ZodTypeAny } from 'zod'
import { createResolver } from './resolver'

type Key = string
type Path = string

async function parseJson(path: Path) {
  const json = await readFile(path, { encoding: 'utf-8' })
  return JSON.parse(json)
}

function updateJson<V>(path: Path) {
  return async (key: Key, value: V) => {
    const data = await parseJson(path)
    data[key] = value
    return writeFile(path, JSON.stringify(data), { encoding: 'utf-8' })
  }
}

function loadValues(path: Path) {
  return async (keys: readonly Key[]) => {
    const data = await parseJson(path)
    return keys.map((key) => data[key] ?? undefined)
  }
}

/** Creates a resolver to asynchronously read/write values of a JSON file. */
export function createJsonResolver<S extends ZodTypeAny>(
  schema: S,
  path: Path,
) {
  return createResolver(schema)(loadValues(path), updateJson(path))
}
