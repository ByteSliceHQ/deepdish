import { clerkMiddleware } from '@clerk/nextjs/server'

import { deepdishMiddleware } from '@deepdish/nextjs'
import { type NextRequest, NextResponse } from 'next/server'
import { createCookie, hasCookie } from './resolver'

const draft = process.env.DEEPDISH_MODE === 'draft'

function noop() {
  return NextResponse.next()
}

async function verify() {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return true
}

function health(request: NextRequest) {
  const response = NextResponse.json({ ok: true })

  if (!hasCookie(request)) {
    createCookie(response)
  }

  return response
}

export default clerkMiddleware((_auth, request) => {
  return deepdishMiddleware(
    {
      draft,
      health,
      verify,
      signIn: noop,
      signOut: noop,
    },
    request,
  )
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
