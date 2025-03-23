import type { LocalContext } from '@/context'

export async function openBillingPage(this: LocalContext): Promise<void> {
  await console.log('cloud open billing')
}
