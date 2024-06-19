import { Heading1, Heading3, Code, Paragraph } from '@deepdish/ui/text'

export default function Page() {
  return (
    <>
      <Heading1>DeepDish</Heading1>
      <Heading3>A headless CMS with pizza powers.</Heading3>
      <Paragraph>
        Complete set of building blocks needed to turn your React code into a
        CMS.
      </Paragraph>
      <Code>
        {`
          import { Heading1, Code, Paragraph } from '@deepdish/ui/text'

          export default function Page() {
            return (
              <>
                <Heading1>DeepDish</Heading1>
                <Paragraph>A headless CMS with pizza powers.</Paragraph>
              </>
            )
          }
        `}
      </Code>
    </>
  )
}
