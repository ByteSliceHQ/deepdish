import { describe, expect, it } from 'bun:test'
import { extractMetadata, schema } from './schema'

describe('extractMetadata', () => {
  it('should extract metadata from a simple schema', () => {
    const simpleSchema = schema((v, { meta }) =>
      meta(v.string(), { rich: true }),
    )

    const result = extractMetadata(simpleSchema)
    expect(result).toEqual({
      root: { rich: true },
    })
  })

  it('should extract metadata from nested object schemas', () => {
    const nestedSchema = schema((v, { required, rich }) => {
      return v.object({
        name: required(v.string()),
        details: v.object({
          age: required(v.number()),
          bio: rich(v.string()),
        }),
      })
    })

    const result = extractMetadata(nestedSchema)
    expect(result).toEqual({
      'root.name': { required: true },
      'root.details.age': { required: true },
      'root.details.bio': { rich: true },
    })
  })

  it('should handle schemas without metadata', () => {
    const objectSchemaWithoutMetadata = schema((v) =>
      v.object({
        name: v.string(),
        age: v.number(),
      }),
    )

    expect(extractMetadata(objectSchemaWithoutMetadata)).toBeEmptyObject()

    const stringSchemaWithoutMetadata = schema((v) => v.string())
    expect(extractMetadata(stringSchemaWithoutMetadata)).toBeEmptyObject()

    const arraySchemaWithoutMetadata = schema((v) => v.array(v.string()))
    expect(extractMetadata(arraySchemaWithoutMetadata)).toBeEmptyObject()
  })
})
