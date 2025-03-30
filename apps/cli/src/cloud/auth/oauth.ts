import open from 'open'

type AuthorizeUrlOptions = {
  authorizeUri: string
  clientId: string
  redirectUri: string
  state: string
}

export function generateOAuthState(length = 32) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  const array = new Uint8Array(length)
  crypto.getRandomValues(array)

  let result = ''

  for (const byte of array) {
    result += characters[byte % characters.length]
  }

  return result
}

export function openAuthorizeUrl(options: AuthorizeUrlOptions) {
  const searchParams = new URLSearchParams({
    client_id: options.clientId,
    redirect_uri: options.redirectUri,
    response_type: 'code',
    scope: 'openid profile email',
    state: options.state,
  })

  open(`${options.authorizeUri}?${searchParams}`)
}
