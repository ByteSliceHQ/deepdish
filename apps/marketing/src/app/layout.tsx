import '@/styles/globals.css'
import { AppLayout } from '@/components/app-layout'
import { DeepDishProvider } from '@deepdish/core/context'
import { Workbench } from '@deepdish/workbench'
import { GeistMono } from 'geist/font/mono'

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

function WorkbenchLabel() {
  return (
    <div className="fixed bottom-14 left-0 right-0 z-50 text-center">
      <p className="text-xs">An example of the DeepDish Workbench toolbar!</p>
    </div>
  )
}

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
            <WorkbenchLabel />
            <Workbench />
          </DeepDishProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
