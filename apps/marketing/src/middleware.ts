import { clerkMiddleware } from '@clerk/nextjs/server'

import { deepdishMiddleware } from '@deepdish/nextjs'
import { type NextRequest, NextResponse } from 'next/server'
import { createCookie, deleteCookie, hasCookie } from './resolver'

const draft = process.env.DEEPDISH_MODE === 'draft'

async function signIn() {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const response = NextResponse.redirect(process.env.BASE_URL)
  createCookie(response)

  return response
}

async function signOut() {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const response = NextResponse.redirect(process.env.BASE_URL)
  deleteCookie(response)

  return response
}

async function verify(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return hasCookie(request)
}

export default clerkMiddleware((_auth, request) => {
  return deepdishMiddleware(
    {
      draft,
      verify,
      signIn,
      signOut,
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
