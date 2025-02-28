import { toJsonSchema } from '@valibot/to-json-schema'
import * as v from 'valibot'

const Blog = v.object({
  title: v.string(),
  overview: v.string(),
  author: v.object({
    name: v.string(),
    email: v.string(),
  }),
  content: v.string(),
  published: v.boolean(),
  views: v.number(),
})

const Feature = v.object({
  name: v.string(),
  description: v.string(),
})

const Typography = v.string()

export const blogSchema = toJsonSchema(Blog)
export const featureSchema = toJsonSchema(Feature)
export const typographySchema = toJsonSchema(Typography)

export const catalog = {
  schemas: {
    '.blog': blogSchema,
    '.feature': featureSchema,
    '.txt': typographySchema,
  },
  keys: [
    {
      name: 'home/headline.txt',
      content: 'Headline',
      extension: '.txt',
      schema: typographySchema,
    },
    {
      name: 'home/sub-headline.txt',
      content: 'Sub-headline',
      extension: '.txt',
      schema: typographySchema,
    },
    {
      name: 'home/about.txt',
      content: 'About',
      extension: '.txt',
      schema: typographySchema,
    },
    {
      name: 'features/feature-1.feature',
      content: v.parse(Feature, {
        name: 'Feature 1 Name',
        description: 'Feature 1 Description',
      }),
      extension: '.feature',
      schema: featureSchema,
    },
    {
      name: 'blogs/blog-1.blog',
      content: v.parse(Blog, {
        title: 'Blog 1 Title',
        overview: 'Blog 1 Overview',
        author: {
          name: 'Blog 1 Author Name',
          email: 'blog1@example.com',
        },
        content: 'Blog 1 Content',
        published: true,
        views: 100,
      }),
      extension: '.blog',
      schema: blogSchema,
    },
  ],
}
