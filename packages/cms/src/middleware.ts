import { type NextRequest, NextResponse } from 'next/server'
import { deepdishMiddleware as middleware } from '@deepdish/nextjs'
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

async function verify(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return true
}

export const deepdishMiddleware = (
  config: DeepDishConfig,
  request: NextRequest,
  response?: NextResponse,
) =>
  middleware(
    {
      draft: config.draft,
      verify,
      signIn,
      signOut,
    },
    request,
    response,
  )
