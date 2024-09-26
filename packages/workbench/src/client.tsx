'use client'

import { type CustomIntrinsicElement, Scope } from 'react-shadow-scope'
import { WorkbenchProvider, type WorkbenchProviderProps } from './context'
import { stylesheet } from './stylesheet'
import { Toolbar } from './toolbar'

declare global {
  namespace ReactShadowScope {
    interface CustomElements {
      'deepdish-workbench': CustomIntrinsicElement
    }
  }
}

type ClientProps = {
  authenticated: boolean
  signInButton: WorkbenchProviderProps['signInButton']
  signOutButton: WorkbenchProviderProps['signOutButton']
}

// TODO: use Workbench provider to reduce prop drilling
export function Client(props: ClientProps) {
  return (
    <Scope
      tag="deepdish-workbench"
      stylesheet={stylesheet.toString()}
      config={{ dsd: 'emulated' }}
    >
      <WorkbenchProvider
        authenticated={props.authenticated}
        signInButton={props.signInButton}
        signOutButton={props.signOutButton}
      >
        <Toolbar />
      </WorkbenchProvider>
    </Scope>
  )
}
