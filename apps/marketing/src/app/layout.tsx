import '@/styles/globals.css'
import { cms } from '@/cms'
import { AppLayout } from '@/components/app-layout'
import { DeepDishProvider } from '@deepdish/cms'
import { GeistMono } from 'geist/font/mono'
import { PostHogProvider } from '@/posthog'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'Manage content directly on your pages',
  description:
    'DeepDish lets you build Next.js apps without integrating a CMS.',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://deepdish.app',
    title: 'DeepDish',
    description: 'Build Next.js apps without integrating a CMS.',
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
            <PostHogProvider>
              <AppLayout>{children}</AppLayout>
            </PostHogProvider>
          </DeepDishProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
