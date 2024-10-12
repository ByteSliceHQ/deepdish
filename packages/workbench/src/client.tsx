'use client'

import { useEffect, useRef } from 'react'
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
  onAuthorize: (token: string) => Promise<void>
  onSignIn: () => Promise<void>
  onSignOut: () => Promise<void>
  onInit: () => Promise<string>
}

export function Client(props: ClientProps) {
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) {
      return
    }

    mounted.current = true

    props.onInit().then((token) => {
      props.onAuthorize(token)
    })
  }, [props.onInit, props.onAuthorize])

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
