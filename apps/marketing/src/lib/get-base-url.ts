export function getBaseUrl() {
  switch (process.env.VERCEL_ENV) {
    case 'production':
      return 'https://www.deepdish.app'
    case 'preview':
      return `https://${process.env.VERCEL_BRANCH_URL}`
    case 'development':
      return 'http://localhost:3002'
    default:
      return 'http://localhost:3002'
  }
}
