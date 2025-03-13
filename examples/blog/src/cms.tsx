import fs from 'node:fs/promises'
import { getBaseUrl } from '@deepdish/cms/vercel'
import { createJsonResolver } from '@deepdish/resolvers/json'
import { createComponents } from '@deepdish/ui/components'
import { configure } from '@deepdish/ui/config'
import type { IntrinsicElement, SetChildren } from '@deepdish/ui/deepdish'
import * as v from 'valibot'
import Link from 'next/link'
import { truncate } from '@/utils'

// TODO: get local data dir to work
export const contentPaths = {
  blog: '/tmp/deepdish_blog_blog.json',
  text: '/tmp/deepdish_blog_text.json',
} as const

async function initContent() {
  for (const path of Object.values(contentPaths)) {
    const exists = await fs
      .stat(path)
      .then(() => true)
      .catch(() => false)

    if (!exists) {
      await fs.writeFile(path, JSON.stringify({}))
    }
  }
}

const blogSchema = v.object({
  title: v.string(),
  author: v.object({
    name: v.string(),
    email: v.string(),
  }),
  body: v.string(),
  slug: v.string(),
})

const textSchema = v.string()

const contracts = {
  blog: {
    resolver: createJsonResolver(contentPaths.blog, blogSchema, {
      maxBatchSize: 10,
    }),
    schema: blogSchema,
  },
  text: {
    resolver: createJsonResolver(contentPaths.text, textSchema, {
      maxBatchSize: 10,
    }),
    schema: textSchema,
  },
}

async function cms() {
  await initContent()

  await configure({
    contracts,
    logging: {
      enabled: process.env.NODE_ENV === 'development',
    },
    settings: {
      baseUrl: getBaseUrl({}),
      draft: true,
    },
  })

  return createComponents(contracts)
}

const components = await cms()

const Blog = components.blog
const Text = components.text

type DeepDishWithoutContract =
  | {
      key: string
      collection?: never
    }
  | {
      collection: string
    }

type ElementProps<E extends IntrinsicElement, C = undefined> = SetChildren<
  JSX.IntrinsicElements[E],
  C
> & {
  deepdish: DeepDishWithoutContract
}

type ParagraphProps<E extends IntrinsicElement> = ElementProps<E, string>

export function Paragraph(props: ParagraphProps<'p'>) {
  return (
    <Text
      deepdish={{
        ...props.deepdish,
        contract: 'text',
      }}
      fallback={props.children}
      render={async (content) => {
        return <p {...props}>{content}</p>
      }}
    />
  )
}

export function BlogCard(props: {
  deepdish: DeepDishWithoutContract
}) {
  return (
    <Blog
      deepdish={{
        ...props.deepdish,
        contract: 'blog',
      }}
      render={async (content) => {
        if (!content) {
          return <div>Blog Card Placeholder</div>
        }

        return (
          <div className="flex flex-col gap-2 pl-4 border-l-2 border-red-500">
            <h1 className="text-xl text-gray-800 font-bold">{content.title}</h1>
            <p className="text-sm text-gray-600 italic">
              Written by {content.author.name}
            </p>
            <p className="text-gray-500">{truncate(content.body, 100)}</p>
            <Link
              className="text-red-500 hover:text-red-400"
              href={`/blog/${content.slug}`}
            >
              Read article
            </Link>
          </div>
        )
      }}
    />
  )
}

export function BlogPost(props: {
  deepdish: DeepDishWithoutContract
}) {
  return (
    <Blog
      deepdish={{
        ...props.deepdish,
        contract: 'blog',
      }}
      render={async (content) => {
        if (!content) {
          return <div>Blog Article Placeholder</div>
        }

        return (
          <div className="container mx-auto">
            <h1 className="my-4 text-2xl text-gray-800 font-bold">
              {content.title}
            </h1>
            <p className="my-4 text-gray-600">
              Written by {content.author.name}
            </p>
            <p className="my-4 text-gray-500">{content.body}</p>
          </div>
        )
      }}
    />
  )
}
