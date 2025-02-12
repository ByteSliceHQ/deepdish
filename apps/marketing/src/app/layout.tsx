import '@/styles/globals.css'
import { AppLayout } from '@/components/app-layout'
import { DeepDishProvider } from '@deepdish/core/context'
import { Workbench } from '@deepdish/workbench'
import { GeistMono } from 'geist/font/mono'
import { cms } from '@/cms'

import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'DeepDish - A data management framework for Next.js',
  description: 'DeepDish is an alternative to traditional CMS systems.',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://deepdish.app',
    title: 'DeepDish - A data management framework for Next.js',
    description: 'DeepDish is an alternative to traditional CMS systems.',
    images: [
      {
        url: 'https://deepdish.app/og-image.png',
        width: 500,
        height: 500,
        alt: 'DeepDish Logo',
      },
    ],
  },
}

await cms()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body className={`${GeistMono.className} antialiased`}>
          <DeepDishProvider>
            <AppLayout>{children}</AppLayout>
            <Workbench title="DeepDish Example Workbench" />
          </DeepDishProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
