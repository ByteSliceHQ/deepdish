import { getBaseUrl } from '@deepdish/cms/vercel'
import { deepdishMiddleware } from '@deepdish/nextjs'
import { type NextRequest, NextResponse } from 'next/server'

let signedIn = false

async function signIn() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  signedIn = true

  return NextResponse.redirect(getBaseUrl({}))
}

async function signOut() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  signedIn = false

  return NextResponse.redirect(getBaseUrl({}))
}

async function verify() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return signedIn
}

export default (request: NextRequest) => {
  return deepdishMiddleware(
    {
      draft: true,
      verify,
      signIn,
      signOut,
    },
    request,
  )
}
