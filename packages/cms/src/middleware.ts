import { deepdishMiddleware } from '@deepdish/nextjs'
import { type NextRequest, NextResponse } from 'next/server'
import type { DeepDishConfig } from './cms'

async function signIn() {
  await new Promise((resolve) => setTimeout(resolve, 50))

  const response = NextResponse.redirect('/')
  return response
}

async function signOut() {
  await new Promise((resolve) => setTimeout(resolve, 50))

  const response = NextResponse.redirect('/')
  return response
}

async function verify(_request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return true
}

export function middleware(config: DeepDishConfig) {
  return (request: NextRequest, response?: NextResponse) => {
    return deepdishMiddleware(
      {
        draft: config.draft,
        verify,
        signIn,
        signOut,
      },
      request,
      response,
    )
  }
}
