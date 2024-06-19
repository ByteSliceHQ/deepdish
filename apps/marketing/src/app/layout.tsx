import '../globals.css'

import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
          'min-h-screen bg-background font-sans antialiased dark',
          fontSans.variable,
        )}
      >
        {props.children}
      </body>
    </html>
  )
}
