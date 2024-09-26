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

type Vars = Record<string, string>

class Stylesheet {
  name: string
  vars: Vars = {}
  rules: Rule[] = []

  constructor(name: string, vars?: Vars) {
    this.name = name
    this.vars = vars || {}
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
    const classes = this.rules
      .map((rule) => {
        const { selector, properties, pseudos = {} } = rule

        const plainDeclarations = Object.entries(properties)
          .map(([property, value]) => {
            return `\t${dashify(property)}: ${value};`
          })
          .join('\n')

        const pseudoDeclarations = Object.entries(pseudos)
          .map(([pseudo, properties]) => {
            const nestedDeclarations = Object.entries(properties)
              .map(([property, value]) => {
                return `\t\t${dashify(property)}: ${value};`
              })
              .join('\n')

            return `\t&${pseudo} {\n${nestedDeclarations}\n\t}`
          })
          .join('\n\n')

        return `${selector} {\n${plainDeclarations}\n\n${pseudoDeclarations}\n}`
      })
      .join('\n\n')

    if (Object.keys(this.vars).length) {
      const vars = Object.entries(this.vars)
        .map(([name, value]) => {
          return `\t--${dashify(name)}: ${value};`
        })
        .join('\n')

      return `* {\n${vars}\n}\n\n${classes}`
    }

    return classes
  }

  var(name: string) {
    // TODO: validate whether this is a real variable
    return `var(--${dashify(name)})`
  }
}

export function makeStyleSheet(name: string, vars?: Vars) {
  return new Stylesheet(name, vars)
}

function generateSelector(stylesheetName: string, block: Block) {
  return `.${stylesheetName}-${String(hash(JSON.stringify(block)))}`
}

function makeClassNameFromSelector(selector: string) {
  return selector.substring(1, selector.length)
}
