// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
export function hash(str: string) {
  let hash = 0
  let i = str.length

  while (i--) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }

  return Math.abs(hash)
}

// https://github.com/jonschlinkert/dashify
export function dashify(value: string, condense?: boolean) {
  return value
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\W/g, (m) => (/[À-ž]/.test(m) ? m : '-'))
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, (m) => (condense ? '-' : m))
    .toLowerCase()
}
