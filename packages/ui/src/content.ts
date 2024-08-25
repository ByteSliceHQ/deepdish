import rehypeParse from 'rehype-parse'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export type ContentFormat = 'plain' | 'markdown' | 'html'

export async function sanitizeContent(content: string, format: ContentFormat) {
  if (format === 'html') {
    const output = await unified()
      .use(rehypeParse)
      .use(rehypeSanitize, {
        attributes: {
          '*': ['className'],
        },
      })
      .use(rehypeStringify)
      .process(content)

    return output.toString()
  }

  if (format === 'markdown') {
    const output = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .process(content)

    return output.toString()
  }

  return content
}
