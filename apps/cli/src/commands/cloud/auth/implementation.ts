import type { LocalContext } from '@/context'

export async function login(this: LocalContext): Promise<void> {
  await console.log('cloud login')
}

export async function signup(this: LocalContext): Promise<void> {
  await console.log('cloud signup')
}
