import { Link } from '@deepdish/ui/link'
import { Heading } from '@deepdish/ui/typography'

export default function Page() {
  return (
    <>
      <Heading level={2}>Page</Heading>
      <Link
        href="https://byteslice.co"
        target="_blank"
        title="ByteSlice Homepage"
      >
        ByteSlice
      </Link>
    </>
  )
}
