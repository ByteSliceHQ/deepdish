import { describe, expect, it } from 'bun:test'
import { makeStylesheet } from './stylesheet'

describe('stylesheet', () => {
  it('should create a stylesheet', () => {
    const stylesheet = makeStylesheet('test')
    expect(stylesheet.rules).toEqual([])
  })

  it('should add a rule to the stylesheet', () => {
    const stylesheet = makeStylesheet('test')

    stylesheet.addRule({
      selector: '.my-class',
      properties: {
        color: 'red',
        fontSize: '16px',
      },
      pseudos: {
        ':hover': {
          color: 'blue',
        },
      },
    })

    expect(stylesheet.rules).toEqual([
      {
        selector: '.my-class',
        properties: {
          color: 'red',
          fontSize: '16px',
        },
        pseudos: {
          ':hover': {
            color: 'blue',
          },
        },
      },
    ])
  })

  it('should add a rule using the style utility', () => {
    const stylesheet = makeStylesheet('test')

    const className = stylesheet.style(
      {
        color: 'red',
        fontSize: '16px',
        '&': {
          ':hover': {
            color: 'blue',
          },
        },
      },
      {
        selector: '.my-class',
      },
    )

    expect(stylesheet.rules).toHaveLength(1)
    expect(className).toBe('my-class')

    expect(stylesheet.toString()).toBe(
      '.my-class {\n\tcolor: red;\n\tfont-size: 16px;\n\n\t&:hover {\n\t\tcolor: blue;\n\t}\n}',
    )
  })

  it('should render the stylesheet as a string', () => {
    const stylesheet = makeStylesheet('test')

    stylesheet.addRule({
      selector: '.my-class',
      properties: {
        color: 'red',
        fontSize: '16px',
      },
    })

    expect(stylesheet.toString()).toBe(
      '.my-class {\n\tcolor: red;\n\tfont-size: 16px;\n\n\n}',
    )
  })

  it('should mount the stylesheet to the document head', () => {
    const stylesheet = makeStylesheet('test')

    stylesheet.addRule({
      selector: '.my-class',
      properties: {
        color: 'red',
        fontSize: '16px',
      },
    })

    stylesheet.mount()

    const style = document.head.querySelector('style')
    expect(style).toBeTruthy()

    if (style) {
      expect(style.textContent).toBe(
        '.my-class {\n\tcolor: red;\n\tfont-size: 16px;\n\n\n}',
      )
    }
  })

  it('should mount the stylesheet to a shadow root', () => {
    const stylesheet = makeStylesheet('test')

    stylesheet.addRule({
      selector: '.my-class',
      properties: {
        color: 'red',
        fontSize: '16px',
      },
    })

    const shadowRoot = document
      .createElement('div')
      .attachShadow({ mode: 'open' })

    stylesheet.mount(shadowRoot)

    const style = shadowRoot.querySelector('style')
    expect(style).toBeTruthy()

    if (style) {
      expect(style.textContent).toBe(
        '.my-class {\n\tcolor: red;\n\tfont-size: 16px;\n\n\n}',
      )
    }
  })
})
