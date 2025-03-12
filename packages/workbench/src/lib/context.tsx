import type { JSONSchema7 } from 'json-schema'
import { createContext, useContext, useState } from 'react'
import { Tailwind } from 'react-shadow-scope'

export type Procedures = {
  getContracts: () => Promise<string[]>
  getContractKeys: (name: string) => Promise<string[]>
  getContractSchema: (name: string) => Promise<JSONSchema7>
  getKey: (
    contract: string,
    name: string,
  ) => Promise<{
    content: unknown
    name: string
    schema: JSONSchema7
  }>
  updateKey: (contract: string, name: string, content: unknown) => Promise<void>
}

export type WorkbenchContext = {
  authDisabled?: boolean
  procedures: Procedures
  title?: React.ReactNode
}

export type WorkbenchProviderProps = {
  children: React.ReactNode
  authDisabled?: boolean
  title?: React.ReactNode
  procedures: Procedures
}

export const WorkbenchContext = createContext<WorkbenchContext | null>(null)

export function WorkbenchProvider(props: WorkbenchProviderProps) {
  const { children, ...rest } = props

  return (
    <WorkbenchContext.Provider value={rest}>
      {props.children}
    </WorkbenchContext.Provider>
  )
}

export type ShadowContext = {
  shadowRoot: HTMLDivElement | null
}

export type ShadowProviderProps = {
  children: React.ReactNode
}

export const ShadowContext = createContext<ShadowContext | null>(null)

export function ShadowProvider(props: { children: React.ReactNode }) {
  const [shadowRoot, setShadowRoot] = useState<HTMLDivElement | null>(null)

  return (
    <Tailwind href="/__deepdish/css/workbench">
      <div ref={setShadowRoot} className="deepdish-shadow">
        <ShadowContext.Provider value={{ shadowRoot }}>
          {props.children}
        </ShadowContext.Provider>
      </div>
    </Tailwind>
  )
}

export function useAuthDisabled() {
  const context = useContext(WorkbenchContext)

  if (!context) {
    throw noContextFound()
  }

  return context.authDisabled
}

export function useProcedures() {
  const context = useContext(WorkbenchContext)

  if (!context) {
    throw noContextFound()
  }

  return context.procedures
}

export function useShadowRoot() {
  const context = useContext(ShadowContext)

  return context?.shadowRoot
}

export function useTitle() {
  const context = useContext(WorkbenchContext)

  if (!context) {
    throw noContextFound()
  }

  return context.title
}

function noContextFound() {
  new Error(
    'Workbench context not found. This hook must be used within a `WorkbenchProvider`.',
  )
}
