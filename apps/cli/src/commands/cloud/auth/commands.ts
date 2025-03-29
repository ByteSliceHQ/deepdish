import { buildCommand, buildRouteMap } from '@stricli/core'

export const cloudAuthLogin = buildCommand({
  loader: async () => {
    const { login } = await import('./implementation')
    return login
  },
  parameters: {
    positional: {
      kind: 'tuple',
      parameters: [],
    },
  },
  docs: {
    brief: 'Log in with an existing account',
  },
})

export const cloudAuthLogout = buildCommand({
  loader: async () => {
    const { logout } = await import('./implementation')
    return logout
  },
  parameters: {
    positional: {
      kind: 'tuple',
      parameters: [],
    },
  },
  docs: {
    brief: 'Log out of an existing account',
  },
})

export const cloudAuthSignup = buildCommand({
  loader: async () => {
    const { signup } = await import('./implementation')
    return signup
  },
  parameters: {
    positional: {
      kind: 'tuple',
      parameters: [],
    },
  },
  docs: {
    brief: 'Create a new account',
  },
})

export const cloudAuthRoutes = buildRouteMap({
  routes: {
    login: cloudAuthLogin,
    logout: cloudAuthLogout,
    signup: cloudAuthSignup,
  },
  docs: {
    brief: 'Cloud auth commands',
  },
})
