import { initTRPC } from '@trpc/server'
import { toJsonSchema } from '@valibot/to-json-schema'
import * as v from 'valibot'
import type { Context } from './context'
import * as schemas from './schemas'

const t = initTRPC.context<Context>().create()

const router = t.router
const publicProcedure = t.procedure

export const appRouter = router({
  getCatalog: publicProcedure.output(schemas.Catalog).query(() => {
    // TODO: collate contracts from config
    const typographySchema = toJsonSchema(v.string())

    return {
      schemas: {
        '.txt': typographySchema,
      },
      keys: [
        {
          content: 'Hello World!',
          name: 'home/headline.txt',
          extension: '.txt',
          schema: typographySchema,
        },
      ],
    }
  }),
  getKey: publicProcedure
    .input(
      v.object({
        name: v.string(),
      }),
    )
    .output(schemas.Key)
    .query(({ input }) => {
      // TODO: implement
      return {
        content: 'Hello World!',
        name: 'home/headline.txt',
        extension: '.txt',
        schema: toJsonSchema(v.string()),
      }
    }),
})

export type AppRouter = typeof appRouter
