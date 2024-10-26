import { afterAll, beforeAll, describe, expect, it } from 'bun:test'
import fs from 'node:fs/promises'
import { z } from 'zod'
import { createJsonResolver } from './json'

describe('resolver', () => {
  const path = './test.json'
  const schema = z.string()
  const key = 'foo'
  const value = 'bar'

  beforeAll(async () => {
    await fs.writeFile(path, '{}')
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

  it('should read key and return value', async () => {
    const resolver = createJsonResolver(schema, path)
    await fs.writeFile(path, JSON.stringify({ [key]: value }))

    const result = await resolver.read({ key })
    expect(result.failure).toBeUndefined()
    if (!result.failure) {
      expect(result.data).toBe(value)
    }
  })
})
