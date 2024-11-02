import type { PathLike as Path } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import type { ZodTypeAny } from 'zod'
import { createResolver, type ResolverOptions } from './resolver'

type Key = string

async function parseJson(path: Path) {
  const json = await readFile(path, { encoding: 'utf-8' })
  return JSON.parse(json)
}

function updateJson<V>(path: Path) {
  return async (key: Key, value: V) => {
    const data = await parseJson(path)
    data[key] = value
    await writeFile(path, JSON.stringify(data), { encoding: 'utf-8' })
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
  path: Path,
  schema: S,
  options?: ResolverOptions,
) {
  return createResolver(schema, options)(loadValues(path), updateJson(path))
}
