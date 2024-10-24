import '../globals.css'

import { cn } from '@/lib/utils'
import { cloudConfig } from '@deepdish-cloud/config'
import { configure } from '@deepdish/ui/config'
import { init } from '@deepdish-cloud/config/client'
import { Workbench } from '@deepdish/workbench'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

configure(
  cloudConfig({
    contentUrl: process.env.DEEPDISH_URL,
    oauthClientId: process.env.CLERK_OAUTH_CLIENT_ID,
    oauthRedirectUrl: process.env.CLERK_OAUTH_REDIRECT_URL,
    oauthUrl: process.env.DEEPDISH_OAUTH_URL,
    secretKey: process.env.DEEPDISH_SECRET_KEY,
    projectAlias: process.env.DEEPDISH_PROJECT_ALIAS,
  }),
)

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'DeepDish CMS',
}

type Props = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        {props.children}
        <Workbench onInit={init} />
      </body>
    </html>
  )
}
