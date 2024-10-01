import { describe, expect, it } from 'bun:test'
import dedent from 'dedent'
import { makeRule } from './rule'

describe('rule', () => {
  it('should correctly serialize a rule', () => {
    const rule = makeRule({
      selectors: ['.parent'],
      properties: {
        color: 'red',
        fontSize: '16px',
      },
      pseudos: {
        ':hover': {
          color: 'blue',
        },
      },
      nested: [
        makeRule({
          selectors: ['.child-a'],
          properties: {
            color: 'green',
          },
          pseudos: {
            ':hover': {
              color: 'blue',
            },
          },
        }),
        makeRule({
          selectors: ['&[data-test="foo"]'],
          properties: {
            color: 'blue',
          },
        }),
      ],
    })

    expect(rule.render()).toBe(
      dedent(/* CSS */ `
        .parent {
          color: red;
          font-size: 16px;

          &:hover {
            color: blue;
          }

          .child-a {
            color: green;

            &:hover {
              color: blue;
            }
          }

          &[data-test="foo"] {
            color: blue;
          }
        }
      `),
    )
  })

  it('should correctly serialize a rule with multiple selectors', () => {
    const rule = makeRule({
      selectors: ['.a', '.b'],
      properties: {
        color: 'red',
      },
    })

    expect(rule.render()).toBe(
      dedent(/* CSS */ `
        .a,
        .b {
          color: red;
        }
      `),
    )
  })
})
