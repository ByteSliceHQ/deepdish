import type { LocalContext } from '@/context'

export async function createKey(this: LocalContext): Promise<void> {
  await console.log('cloud create key')
}

export async function listKeys(this: LocalContext): Promise<void> {
  await console.log('cloud list keys')
}
