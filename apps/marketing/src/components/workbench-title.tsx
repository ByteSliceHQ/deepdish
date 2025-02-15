import { InfoIcon } from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function WorkbenchTitle() {
  return (
    <div className="flex items-center gap-2">
      <p className="text-xs">Try editing this page's content!</p>
      <Tooltip>
        <TooltipTrigger asChild>
          <InfoIcon className="h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent className="bg-white">
          <p>
            Enter edit mode by clicking the button on the right. Then
            right-click on an element to edit its content.
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
