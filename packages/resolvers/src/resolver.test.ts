import { afterAll, beforeAll, describe, expect, it } from 'bun:test'
import fs from 'node:fs/promises'
import { z } from 'zod'
import { createJsonResolver } from './json'
import { createResolver } from './resolver'

const path = './test.json'
const empty = JSON.stringify({})
const schema = z.string()
const key = 'foo'
const value = 'bar'
const error = new Error('uh-oh')

describe('resolver', () => {
  beforeAll(async () => {
    await fs.writeFile(path, empty)
  })

  afterAll(async () => {
    await fs.unlink(path)
  })

  it('should fail to read if source does not exist', async () => {
    const resolver = createJsonResolver('./does-not-exist.json', schema)

    const result = await resolver.read({ key })
    expect(result.failure).toBeDefined()
    expect(result.failure?.type).toBe('READ')
  })

  it('should fail to read if source is invalid', async () => {
    const resolver = createJsonResolver(path, schema)
    await fs.writeFile(path, 'invalid')

    const result = await resolver.read({ key })
    expect(result.failure).toBeDefined()
    expect(result.failure?.type).toBe('READ')
  })

  it('should fail to read if load fails', async () => {
    const resolver = createResolver(schema)(
      () => Promise.reject(error),
      () => Promise.resolve(),
    )

    const readResult = await resolver.read({ key })
    expect(readResult.failure).toBeDefined()
    expect(readResult.failure?.type).toBe('READ')
  })

  it('should fail to read if content is missing', async () => {
    const resolver = createJsonResolver(path, schema)

    const result = await resolver.read({ key })
    expect(result.failure).toBeDefined()
    expect(result.failure?.type).toBe('CONTENT_MISSING')
  })

  it('should fail to read if content is invalid', async () => {
    const resolver = createJsonResolver(path, schema)
    await fs.writeFile(path, JSON.stringify({ [key]: 1 }))

    const result = await resolver.read({ key })
    expect(result.failure).toBeDefined()
    expect(result.failure?.type).toBe('CONTENT_INVALID')
  })

  it('should fail to write if update fails', async () => {
    const resolver = createResolver(schema)(
      () => Promise.resolve([]),
      () => Promise.reject(error),
    )

    const writeResult = await resolver.write({ key }, value)
    expect(writeResult.failure).toBe(error)
  })

  it('should write to and read from key', async () => {
    const resolver = createJsonResolver(path, schema, { maxBatchSize: 1 })
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
