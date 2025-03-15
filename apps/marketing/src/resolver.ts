import { type Context, createResolver } from '@deepdish/resolvers'
import type { NextRequest, NextResponse } from 'next/server'
import * as v from 'valibot'

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

function deriveKey(ctx: Context) {
  const { headers } = ctx

  if (!headers) {
    return ctx.key
  }

  const cookie = headers.get('cookie')

  if (!cookie) {
    return ctx.key
  }

  const value = getResolverCookie(cookie)

  return `${ctx.key}-${value}`
}

async function listKeys(pattern: string) {
  const allKeys = Array.from(data.keys())

  if (pattern === '*') {
    return allKeys
  }

  return allKeys.filter((key) => key.startsWith(pattern))
}

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

export const cookieResolver = createResolver(v.string(), {
  deriveKey,
})(loadValues, updateValues, listKeys)
