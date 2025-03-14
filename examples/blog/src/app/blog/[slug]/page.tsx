import { BlogPost } from '@/cms'

export default async function BlogArticle({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div className="h-full overflow-y-auto">
      <div className="container mx-auto mt-8">
        <BlogPost deepdish={{ key: slug }} />
      </div>
    </div>
  )
}
