import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DeepDish CMS',
}

type Props = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <body>{props.children}</body>
    </html>
  )
}
