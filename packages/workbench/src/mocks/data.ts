import { extractMetadata, schema, serialize } from '@deepdish/core/schema'

const blogSchema = schema((v, { rich }) =>
  v.object({
    title: v.string(),
    author: v.object({
      name: v.string(),
      email: v.string(),
      bio: rich(v.string()),
    }),
    body: rich(v.string()),
  }),
)

const featureSchema = schema((v) =>
  v.object({ name: v.string(), description: v.string() }),
)

const textSchema = schema((v, { required }) => required(v.string()))

export const catalog = {
  blog: {
    schema: blogSchema,
    serializedSchema: serialize(blogSchema),
    keys: {},
    meta: extractMetadata(blogSchema),
  },
  feature: {
    schema: featureSchema,
    serializedSchema: serialize(blogSchema),
    keys: {
      'home/feature-1': {
        name: 'Feature 1 Name',
        description: 'Feature 1 Description',
      },
      'home/feature-2': {
        name: 'Feature 2 Name',
        description: 'Feature 2 Description',
      },
    },
    meta: extractMetadata(featureSchema),
  },
  text: {
    schema: textSchema,
    serializedSchema: serialize(blogSchema),
    keys: {
      'home/headline': 'Headline',
      'home/sub-headline': 'Sub-Headline',
    },
    meta: extractMetadata(textSchema),
  },
}
