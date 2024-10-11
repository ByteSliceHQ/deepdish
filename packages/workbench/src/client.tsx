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
  onSignIn: () => Promise<void>
  onSignOut: () => Promise<void>
}

export function Client(props: ClientProps) {
  return (
    <Scope
      tag="deepdish-workbench"
      stylesheet={stylesheet.render()}
      config={{ dsd: 'emulated' }}
    >
      <WorkbenchProvider
        authenticated={props.authenticated}
        onSignIn={props.onSignIn}
        onSignOut={props.onSignOut}
      >
        <Toolbar />
      </WorkbenchProvider>
    </Scope>
  )
}
