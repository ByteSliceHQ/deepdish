import { Link } from '@deepdish/ui/link'
import { Heading, Paragraph } from '@deepdish/ui/typography'

export default function Page() {
  return (
    <>
      <Heading level={2}>DeepDish</Heading>
      <Paragraph>
        Headless CMS with&nbsp;
        <Link
          href="https://byteslice.co"
          target="_blank"
          title="ByteSlice Homepage"
        >
          pizza powers
        </Link>
      </Paragraph>
    </>
  )
}
