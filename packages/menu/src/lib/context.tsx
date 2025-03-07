import { useState, useContext, createContext } from 'react'
import { Tailwind } from 'react-shadow-scope'

export type ShadowContext = {
  shadowRoot: HTMLDivElement | null
}

export const ShadowContext = createContext<ShadowContext | null>(null)

export function ShadowProvider(props: {
  children: React.ReactNode
  enabled?: boolean
}) {
  const [shadowRoot, setShadowRoot] = useState<HTMLDivElement | null>(null)

  if (!props.enabled) {
    return props.children
  }

  return (
    <Tailwind href="/__deepdish/css">
      <div ref={setShadowRoot} className="deepdish-shadow">
        <ShadowContext.Provider value={{ shadowRoot }}>
          {props.children}
        </ShadowContext.Provider>
      </div>
    </Tailwind>
  )
}

export function useShadowRoot() {
  const context = useContext(ShadowContext)

  return context?.shadowRoot
}
