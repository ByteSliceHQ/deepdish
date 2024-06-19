import { Button } from '@/components/ui/button'
import { DeepDishLogo } from './logo'

export function Header() {
  return (
    <header className="flex items-center justify-between mx-auto py-3 px-4 border border-gray-700 rounded-xl">
      <div className="flex items-center">
        <DeepDishLogo />
        <h1 className="text-lg font-semibold ml-4">DeepDish</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="link">Docs</Button>
        <Button variant="link">Enterprise</Button>
        <Button variant="link">Templates</Button>
        <Button variant="link">Demo</Button>
        <Button variant="link">Changelog</Button>
        <Button className="ml-6" size="sm">
          Launch
        </Button>
      </div>
    </header>
  )
}
