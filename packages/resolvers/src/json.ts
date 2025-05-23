import type { PathLike as Path } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import type { Schema } from '@deepdish/core/schema'
import { type Key, type ResolverOptions, createResolver } from './resolver'

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

function listKeys(path: Path) {
  return async (pattern: string) => {
    const data = await parseJson(path)
    const allKeys = Object.keys(data)

    if (pattern === '*') {
      return allKeys
    }

    return allKeys.filter((key) => key.startsWith(pattern))
  }
}

/** Creates a resolver to asynchronously read/write values of a JSON file. */
export function createJsonResolver<S extends Schema>(
  path: Path,
  schema: S,
  options?: ResolverOptions,
) {
  return createResolver(schema, options)(
    loadValues(path),
    updateJson(path),
    listKeys(path),
  )
}
