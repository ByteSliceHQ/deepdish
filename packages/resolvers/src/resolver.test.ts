import { afterAll, beforeAll, describe, expect, it } from 'bun:test'
import fs from 'node:fs/promises'
import { z } from 'zod'
import { createJsonResolver } from './json'

const path = './test.json'
const empty = JSON.stringify({})
const schema = z.string()
const key = 'foo'
const value = 'bar'

describe('resolver', () => {
  beforeAll(async () => {
    await fs.writeFile(path, empty)
  })

  afterAll(async () => {
    await fs.unlink(path)
  })

  it('should fail to read if file does not exist', async () => {
    const resolver = createJsonResolver(schema, './does-not-exist.json')

    const result = await resolver.read({ key })
    expect(result.failure).toBeDefined()
    expect(result.failure?.type).toBe('READ')
  })

  it('should fail to read if content is missing', async () => {
    const resolver = createJsonResolver(schema, path)

    const result = await resolver.read({ key })
    expect(result.failure).toBeDefined()
    expect(result.failure?.type).toBe('CONTENT_MISSING')
  })

  it('should fail to read if content is invalid', async () => {
    const resolver = createJsonResolver(schema, path)
    await fs.writeFile(path, JSON.stringify({ [key]: 1 }))

    const result = await resolver.read({ key })
    expect(result.failure).toBeDefined()
    expect(result.failure?.type).toBe('CONTENT_INVALID')
  })

  it('should write to and read from key', async () => {
    const resolver = createJsonResolver(schema, path)
    await fs.writeFile(path, empty)

    const writeResult = await resolver.write({ key }, value)
    expect(writeResult.failure).toBeUndefined()
    if (!writeResult.failure) {
      expect(writeResult.data).toBeUndefined()
    }

    const readResult = await resolver.read({ key })
    expect(readResult.failure).toBeUndefined()
    if (!readResult.failure) {
      expect(readResult.data).toBe(value)
    }
  })
})
