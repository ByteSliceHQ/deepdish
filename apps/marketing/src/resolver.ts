import { type Context, createResolver } from '@deepdish/resolvers'
import { typographySchema } from '@deepdish/ui/schemas'
import { headers } from 'next/headers'
import type { NextRequest, NextResponse } from 'next/server'

const data = new Map<string, string>()
const resolverCookie = '__deepdish_resolver'

async function loadValues(keys: readonly string[]) {
  return keys.map((key) => data.get(key) ?? undefined)
}

async function updateValues(key: string, value: string) {
  await data.set(key, value)
}

function getResolverCookie(cookie: string) {
  const values = cookie.split(';')

  const resolverCookie = values.find((value) =>
    value.trim().startsWith('__deepdish_resolver='),
  )

  if (!resolverCookie) {
    return null
  }

  return resolverCookie.split('=')[1]
}

// function deriveKey(ctx: Context) {
//   return ctx.key
// }

export function createCookie(response: NextResponse) {
  response.cookies.set(resolverCookie, Math.random().toString(36).slice(2))
}

export function deleteCookie(response: NextResponse) {
  response.cookies.delete(resolverCookie)
}

export function hasCookie(request: NextRequest) {
  const cookie = request.cookies.get(resolverCookie)
  return cookie !== undefined
}

export const cookieResolver = createResolver(typographySchema, {
  // deriveKey,
})(loadValues, updateValues)
