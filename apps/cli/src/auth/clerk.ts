import clerk from '@clerk/clerk-js/headless/index.js'

const Clerk = clerk.Clerk

export async function createClerk(publishableKey: string) {
  const clerk = new Clerk(publishableKey)

  await clerk.load({
    standardBrowser: false,
  })

  return clerk
}

export async function createSignIn(clerk: clerk.Clerk, ticket: string) {
  const signIn = await clerk.client?.signIn.create({
    ticket,
    strategy: 'ticket',
  })

  if (!signIn || !signIn.createdSessionId) {
    throw new Error('Failed to sign in.')
  }

  return {
    createdSessionId: signIn.createdSessionId,
  }
}
