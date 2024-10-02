import type { Properties, Pseudos } from 'csstype'
import { dashify, spaces } from './utils'

type PseudoSelectors = {
  [key in Pseudos]?: Properties
}

type RuleOptions = {
  selectors: string[]
  properties: Properties
  pseudos?: PseudoSelectors
  nested?: Rule[]
}

export class Rule {
  /** https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#css_rulesets */
  selectors: string[]

  /** https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#css_declarations */
  properties: Properties

  /** https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes */
  pseudos: PseudoSelectors

  /** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting */
  nested: Rule[]

  // TODO: validate selectors
  constructor({ selectors, properties, pseudos, nested }: RuleOptions) {
    this.selectors = selectors
    this.properties = properties
    this.pseudos = pseudos || {}
    this.nested = nested || []
  }

  render(baseIndent = 0): string {
    const classNames = this.selectors.join(',\n')

    const plainDeclarations = Object.entries(this.properties)
      .map(([property, value]) => {
        return `${spaces(baseIndent + 2)}${dashify(property)}: ${value};`
      })
      .join('\n')

    const pseudoDeclarations = Object.entries(this.pseudos)
      .map(([pseudo, properties]) => {
        const nestedDeclarations = Object.entries(properties)
          .map(([property, value]) => {
            return `${spaces(baseIndent + 4)}${dashify(property)}: ${value};`
          })
          .join('\n')

        return `${spaces(baseIndent + 2)}&${pseudo} {\n${nestedDeclarations}\n${spaces(baseIndent + 2)}}`
      })
      .join('\n\n')

    const nestedDeclarations = this.nested
      .map((child) => child.render(baseIndent + 2))
      .join('\n\n')

    const allDeclarations = [
      plainDeclarations,
      pseudoDeclarations,
      nestedDeclarations,
    ]
      .filter((declaration) => declaration.length)
      .join('\n\n')

    return `${spaces(baseIndent)}${classNames} {\n${allDeclarations}\n${spaces(baseIndent)}}`
  }
}

export function makeRule(options: RuleOptions) {
  return new Rule(options)
}
