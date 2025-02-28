import * as v from 'valibot'

export const Catalog = v.object({
  schemas: v.record(v.string(), v.any()),
  keys: v.lazy(() => v.array(Key)),
})

export const Key = v.object({
  content: v.any(),
  extension: v.string(),
  name: v.string(),
  schema: v.any(),
})
