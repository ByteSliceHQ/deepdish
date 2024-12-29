import '@/styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DeepDish CMS - Next-Gen Content Management for React',
  description:
    'A flexible and powerful content management system built on React server components, designed for the modern web.',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://deepdish.app',
    title: 'DeepDish CMS - Next-Gen Content Management for React',
    description:
      'A flexible and powerful content management system built on React server components, designed for the modern web.',
    images: [
      {
        url: 'https://deepdish.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DeepDish Logo',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
