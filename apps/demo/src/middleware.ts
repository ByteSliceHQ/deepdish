import { deepdishMiddleware } from '@deepdish/nextjs'
import { NextResponse } from 'next/server'

let signedIn = false

async function signIn() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  signedIn = true

  return NextResponse.redirect(process.env.BASE_URL)
}

async function signOut() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  signedIn = false

  return NextResponse.redirect(process.env.BASE_URL)
}

async function verify() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return signedIn
}

export default deepdishMiddleware({
  signIn,
  signOut,
  verify,
})
