'use client'

import { withResult } from '@byteslice/result'
import { useEffect, useRef, useState } from 'react'
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

async function authenticate() {
  const verification = await withResult(
    async () => {
      const response = await fetch('/__deepdish/verify', {
        method: 'POST',
      })

      const body = await response.json()
      return body.signedIn
    },
    (error) => new Error('Authentication failed.', { cause: error }),
  )

  if (verification.failure) {
    return false
  }

  return verification.data
}

export function Client() {
  const [authenticated, setAuthenticated] = useState(false)
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) {
      return
    }

    mounted.current = true
    authenticate().then(setAuthenticated)
  }, [])

  async function handleSignIn() {
    window.location.assign('/__deepdish/sign-in')
  }

  async function handleSignOut() {
    window.location.assign('/__deepdish/sign-out')
  }

  return (
    <Scope
      tag="deepdish-workbench"
      stylesheet={stylesheet.render()}
      config={{ dsd: 'emulated' }}
    >
      <WorkbenchProvider
        authenticated={authenticated}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      >
        <Toolbar />
      </WorkbenchProvider>
    </Scope>
  )
}
