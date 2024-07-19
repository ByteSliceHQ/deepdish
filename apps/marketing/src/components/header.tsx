import { Heading1 } from '@deepdish/ui/typography'
import { DeepDishLogo } from './logo'
import { Heading1 } from '@deepdish/ui/typography'

export function Header() {
  return (
    <header className="flex items-center justify-between mx-auto py-3 px-4 border border-gray-700 rounded-t-xl">
      <div className="flex items-center">
        <DeepDishLogo />
        <Heading1 className="text-lg font-semibold ml-4">DeepDish</Heading1>
      </div>
      <div className="flex items-center gap-2">
        {/* <Button variant="link" disabled>Docs</Button>
        <Button variant="link">Enterprise</Button>
        <Button variant="link">Templates</Button>
        <Button variant="link">Demo</Button>
        <Button variant="link">Changelog</Button>
        <Button className="ml-6" size="sm">
          Launch
        </Button> */}
      </div>
    </header>
  )
}
