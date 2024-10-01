import type { VariantProps, cva } from 'class-variance-authority'
import type { Properties, Pseudos } from 'csstype'
import { type ComponentPropsWithoutRef, createElement, forwardRef } from 'react'
import { type Rule, makeRule } from './rule'
import { spaces } from './utils'
import { dashify, hash } from './utils'

/** https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#css_declaration_blocks */
type Block = Properties & {
  /** https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes */
  pseudos?: {
    [key in Pseudos]?: Properties
  }

  /** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting */
  nested?: {
    [key in string]?: Properties
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

  render() {
    const classes = this.rules.map((rule) => rule.render()).join('\n\n')

    if (Object.keys(this.vars).length) {
      const vars = Object.entries(this.vars)
        .map(([name, value]) => {
          return `${spaces(2)}--${dashify(name)}: ${value};`
        })
        .join('\n')

      return `* {\n${vars}\n}\n\n${classes}`
    }

    return classes
  }

  style(block: Block, options?: StyleOptions) {
    const selector = options?.selector || generateSelector(this.name, block)
    const { pseudos, nested, ...properties } = block

    const nestedRules = Object.entries(nested || {}).map(
      ([childSelector, childProperties = {}]) => {
        return makeRule({
          selectors: [childSelector],
          properties: childProperties,
        })
      },
    )

    this.addRule(
      makeRule({
        selectors: [selector],
        properties,
        pseudos,
        nested: nestedRules,
      }),
    )

    return makeClassNameFromSelector(selector)
  }

  var(name: string) {
    if (!this.vars[name]) {
      console.warn(
        `Variable "${name}" is not defined in stylesheet "${this.name}".`,
      )

      return ''
    }

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

// NB: declaration file generation requires all package types to be resolvable
export type { Rule }
