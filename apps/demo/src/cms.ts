import { contentPath, initContent } from '@/content'
import { createJsonResolver } from '@deepdish/resolvers/json'
import { configure } from '@deepdish/ui/config'
import { typographySchema } from '@deepdish/ui/typography'
import { z } from 'zod'

const blogSchema = z.object({
  title: z.string(),
  body: z.string(),
})

export async function cms() {
  await initContent()

  await configure({
    contracts: {
      typography: {
        resolver: createJsonResolver(contentPath, typographySchema, {
          maxBatchSize: 10,
        }),
        schema: typographySchema,
      },
      blog: {
        resolver: createJsonResolver(contentPath, blogSchema, {
          maxBatchSize: 10,
        }),
        schema: blogSchema,
      },
    },
    logging: {
      enabled: process.env.NODE_ENV === 'development',
    },
    settings: {
      baseUrl: process.env.BASE_URL,
      draft: process.env.DEEPDISH_MODE === 'draft',
    },
  })
}
