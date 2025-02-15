import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="flex flex-col h-full justify-center items-center gap-1">
      <h1 className="text-xl text-gray-800">
        Welcome to the DeepDish Workbench
      </h1>
      <p className="text-gray-700">Cool stuff, huh?</p>
    </div>
  )
}
