import { initTRPC } from '@trpc/server'
import { toJsonSchema } from '@valibot/to-json-schema'
import * as v from 'valibot'
import * as schemas from './schemas'

const t = initTRPC.create()

const router = t.router
const publicProcedure = t.procedure

export const appRouter = router({
  getCatalog: publicProcedure.output(schemas.Catalog).query(() => {
    // TODO: implement
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
  // TODO: deprecate
  greeting: publicProcedure
    .input(
      v.object({
        name: v.string(),
      }),
    )
    .query(({ input }) => {
      return {
        text: `hello ${input?.name ?? 'world'}`,
      }
    }),
})

export type AppRouter = typeof appRouter
