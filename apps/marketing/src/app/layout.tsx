import '@/styles/globals.css'
import { AppLayout } from '@/components/app-layout'
import { DeepDishProvider } from '@deepdish/cms'
import { GeistMono } from 'geist/font/mono'
import { cms } from '@/cms'

import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'The data management framework for Next.js',
  description:
    "Build Next.js apps where you don't worry about integrating a CMS.",
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://deepdish.app',
    title: 'DeepDish',
    description:
      "Build Next.js apps where you don't worry about integrating a CMS.",
    images: [
      {
        url: 'https://deepdish.app/og-image.png',
        width: 400,
        height: 200,
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
          <DeepDishProvider title="DeepDish Example Workbench">
            <AppLayout>{children}</AppLayout>
          </DeepDishProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
