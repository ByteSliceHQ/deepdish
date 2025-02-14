'use client'

import posthog from 'posthog-js'
import {
  usePostHog,
  PostHogProvider as InternalPostHogProvider,
} from 'posthog-js/react'
import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname

      if (searchParams.toString()) {
        url = `${url}?${searchParams.toString()}`
      }

      posthog.capture('$pageview', { $current_url: url })
    }
  }, [pathname, searchParams, posthog])

  return null
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: '/ingest',
      ui_host: 'https://us.posthog.com',
      person_profiles: 'always',
    })
  }, [])

  return (
    <InternalPostHogProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </InternalPostHogProvider>
  )
}
