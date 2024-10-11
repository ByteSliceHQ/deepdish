import { describe, expect, it } from 'bun:test'
import dedent from 'dedent'
import { makeRule } from './rule'
import { makeStyleSheet } from './stylesheet'

describe('stylesheet', () => {
  it('should create a stylesheet', () => {
    const stylesheet = makeStyleSheet('test')
    expect(stylesheet.rules).toEqual([])
  })

  it('should add a rule using the style utility', () => {
    const stylesheet = makeStyleSheet('test')

    const className = stylesheet.style(
      {
        color: 'red',
        fontSize: '16px',
        pseudos: {
          ':hover': {
            color: 'blue',
          },
        },
        nested: {
          '&[data-test="foo"]': {
            color: 'green',
          },
        },
      },
      {
        selector: '.my-class',
      },
    )

    expect(stylesheet.rules).toHaveLength(1)
    expect(className).toBe('my-class')

    expect(stylesheet.render()).toBe(
      dedent(/* CSS */ `
        .my-class {
          color: red;
          font-size: 16px;

          &:hover {
            color: blue;
          }

          &[data-test="foo"] {
            color: green;
          }
        }
      `),
    )
  })

  it('should render the stylesheet as a string with global rules', () => {
    const stylesheet = makeStyleSheet('test', {
      vars: {
        globalTestVariable: 'red',
      },
      keyframes: {
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
    })

    stylesheet.addRule(
      makeRule({
        selectors: ['.my-class'],
        properties: {
          color: 'red',
          fontSize: '16px',
        },
        pseudos: {},
        nested: [],
      }),
    )

    expect(stylesheet.render()).toBe(
      dedent(/* CSS */ `
        * {
          --global-test-variable: red;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .my-class {
          color: red;
          font-size: 16px;
        }
      `),
    )
  })
})
