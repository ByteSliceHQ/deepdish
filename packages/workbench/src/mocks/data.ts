import { toJsonSchema } from '@valibot/to-json-schema'
import * as v from 'valibot'

const blogSchema = v.object({
  title: v.string(),
  author: v.object({
    name: v.string(),
    email: v.string(),
  }),
  body: v.string(),
})

const featureSchema = v.object({ name: v.string(), description: v.string() })

const textSchema = v.string()

export const catalog = {
  blog: {
    schema: blogSchema,
    serializedSchema: toJsonSchema(blogSchema, {
      errorMode: 'ignore',
    }),
    keys: {},
  },
  feature: {
    schema: featureSchema,
    serializedSchema: toJsonSchema(featureSchema, {
      errorMode: 'ignore',
    }),
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
  },
  text: {
    schema: textSchema,
    serializedSchema: toJsonSchema(textSchema, {
      errorMode: 'ignore',
    }),
    keys: {
      'home/headline': 'Headline',
      'home/sub-headline': 'Sub-Headline',
    },
  },
}
