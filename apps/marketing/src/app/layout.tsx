import '../globals.css'

import { cms } from '@/cms'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

cms(process.env.DEEPDISH_URL, process.env.DEEPDISH_SECRET_KEY)

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: {
    template: '%s - DeepDish',
    default:
      'DeepDish - A developer-first, open-source content management system',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={clsx(
        'min-h-screen bg-background font-sans antialiased',
        fontSans.variable,
      )}
    >
      <body className="text-gray-950 antialiased">{children}</body>
    </html>
  )
}
