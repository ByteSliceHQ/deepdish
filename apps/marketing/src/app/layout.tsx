import '../globals.css'

import { cms } from '@/cms'
import { cn } from '@/lib/utils'
import { ClerkProvider, SignInButton, SignOutButton } from '@clerk/nextjs'
import { Workbench as DeepDishWorkbench } from '@deepdish/workbench'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

cms(process.env.DEEPDISH_URL, process.env.DEEPDISH_SECRET_KEY)

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
        <ClerkProvider>
          {props.children}
          <Workbench />
        </ClerkProvider>
      </body>
    </html>
  )
}

function Workbench() {
  return (
    <DeepDishWorkbench
      signInButton={SignInButton}
      signOutButton={SignOutButton}
    />
  )
}
