import { Link } from '@deepdish/ui/link'
import { Audio, Image, Video } from '@deepdish/ui/media'
import { Heading, Span } from '@deepdish/ui/typography'

export default function Page() {
  return (
    <>
      <Heading level={2}>DeepDish</Heading>
      <Span>Headless CMS with&nbsp;</Span>
      <Link
        href="https://byteslice.co"
        target="_blank"
        title="ByteSlice Homepage"
      >
        pizza powers
      </Link>
      <div>
        <Image
          alt="Neon sign hanging outside of a pizza parlor"
          src="https://images.unsplash.com/photo-1546724867-3b2dabdbc5b0?h=300"
          title="Pizza parlor sign"
        />
      </div>
      <div>
        <Audio src="https://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg">
          Pizza induced laughter
        </Audio>
      </div>
      <div>
        <Video
          height={250}
          src="https://videos.pexels.com/video-files/3752507/3752507-hd_1920_1080_24fps.mp4"
        >
          Deliciously cheesy stock footage of pepperoni pizza
        </Video>
      </div>
    </>
  )
}
