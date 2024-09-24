import type { VariantProps, cva } from 'class-variance-authority'
import type { Properties, Pseudos } from 'csstype'
import { type ComponentPropsWithoutRef, createElement, forwardRef } from 'react'
import { dashify, hash } from './utils'

/** https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#css_rulesets */
type Rule = {
  selector: string
  properties: Properties

  /** https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes */
  pseudos?: {
    [key in Pseudos]?: Properties
  }
}

/** https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#css_declaration_blocks */
type Block = Properties & {
  /** https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes */
  '&'?: {
    [key in Pseudos]?: Properties
  }
}

type StyleOptions = {
  selector: string
}

class Stylesheet {
  name: string
  rules: Rule[] = []

  constructor(name: string) {
    this.name = name
  }

  addRule(rule: Rule) {
    this.rules.push(rule)
  }

  element<
    T extends keyof JSX.IntrinsicElements,
    V extends ReturnType<typeof cva>,
  >(type: T, variants: V) {
    type Variants = VariantProps<V>
    type Props = ComponentPropsWithoutRef<T> & Variants

    return forwardRef<T, Props>((props, ref) => {
      const { className, ...rest } = props

      const forwardedProps = {
        ...rest,
        className: variants(rest as Variants),
        ref,
      }

      return createElement(type, forwardedProps)
    })
  }

  mount(root: HTMLElement | ShadowRoot = document.head) {
    const style = document.createElement('style')
    style.textContent = this.toString()

    root.appendChild(style)
  }

  style(block: Block, options?: StyleOptions) {
    const selector = options?.selector || generateSelector(this.name, block)
    const { '&': pseudos, ...properties } = block

    this.addRule({
      selector,
      properties,
      pseudos,
    })

    return makeClassNameFromSelector(selector)
  }

  toString() {
    return this.rules
      .map((rule) => {
        const { selector, properties, pseudos = {} } = rule

        const plainDeclarations = Object.entries(properties)
          .map(([property, value]) => {
            return `\t${dashify(property)}: ${value};`
          })
          .join('\n')

        const psuedoDeclarations = Object.entries(pseudos).map(
          ([pseudo, properties]) => {
            const nestedDeclarations = Object.entries(properties)
              .map(([property, value]) => {
                return `\t\t${dashify(property)}: ${value};`
              })
              .join('\n')

            return `\t&${pseudo} {\n${nestedDeclarations}\n\t}`
          },
        )

        return `${selector} {\n${plainDeclarations}\n\n${psuedoDeclarations}\n}`
      })
      .join('\n\n')
  }
}

export function makeStylesheet(name: string) {
  return new Stylesheet(name)
}

function generateSelector(stylesheetName: string, block: Block) {
  return `.${stylesheetName}-${String(hash(JSON.stringify(block)))}`
}

function makeClassNameFromSelector(selector: string) {
  return selector.substring(1, selector.length)
}
