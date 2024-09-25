import { expect, test } from 'bun:test'

import { dashify, hash } from './utils'

test('hash', () => {
  const a = hash('hello')
  const b = hash('world')

  expect(a).toBeNumber()
  expect(b).toBeNumber()
  expect(a).not.toEqual(b)
})

test('dashify', () => {
  expect(dashify('backgroundColor')).toEqual('background-color')
  expect(dashify(' backgroundColor ')).toEqual('background-color')
})
