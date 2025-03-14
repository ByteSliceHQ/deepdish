import { BlogCard } from '@/cms'

export default function Blog() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="container mx-auto">
        <h1 className="my-4 text-2xl text-gray-800">Johnny Pizza Blog</h1>
        <p className="my-4 text-gray-600">
          Check out our cool blog articles and learn more about our pizza!
        </p>
        <div className="flex flex-col gap-4">
          <BlogCard deepdish={{ collection: '*' }} />
        </div>
      </div>
    </div>
  )
}
