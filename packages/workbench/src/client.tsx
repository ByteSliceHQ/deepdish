'use client'

import { type CustomIntrinsicElement, Scope } from 'react-shadow-scope'
import { WorkbenchProvider } from './context'
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
  signInButton: React.FunctionComponent
  signOutButton: React.FunctionComponent
}

// TODO: use Workbench provider to reduce prop drilling
export function Client(props: ClientProps) {
  return (
    <Scope
      tag="deepdish-workbench"
      stylesheet={stylesheet.toString()}
      config={{ dsd: 'emulated' }}
    >
      <WorkbenchProvider authenticated={props.authenticated}>
        <Toolbar
          signInButton={props.signInButton}
          signOutButton={props.signOutButton}
        />
      </WorkbenchProvider>
    </Scope>
  )
}
